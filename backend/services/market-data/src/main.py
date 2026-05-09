"""Market Data Service — Connects to price feeds, normalizes, distributes via Redis pub/sub and stores in TimescaleDB."""
import asyncio
import json
import logging
import signal
import time
from datetime import datetime, timezone

from packages.common.src.config import get_settings
from packages.common.src.redis_client import (
    CONFIG_INSTRUMENTS_RELOAD_CHANNEL,
    PriceChannel,
    redis_client,
    publish_price,
)
from packages.common.src.kafka_client import close_producer

from .feed_handler import FeedSimulator, INSTRUMENTS
from .alltick_config import usable_alltick_api_key
from .alltick_feed import AllTickFeed
from .bar_aggregator import BarAggregator
from .seed_bars import seed as seed_bars
from .spread_cache import StreamSpreadCache, RELOAD_INTERVAL_SEC
from .store import TickStore

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)-5s [%(name)s] %(message)s")
logger = logging.getLogger("market-data")

try:
    from packages.common.src.instrumentation import init_sentry
    init_sentry("market-data")
except Exception:
    pass

settings = get_settings()

# If the upstream feed stops sending a symbol, Redis keeps a frozen tick; refresh
# with last mid + current admin spread so Spr matches config until live ticks resume.
STALE_TICK_AFTER_SEC = 90.0
STALE_REFRESH_INTERVAL_SEC = 30.0


class HybridFeed:
    """Runs AllTick + Simulator concurrently and multiplexes their tick queues.

    AllTick covers a small set of symbols (limited by plan); the simulator
    covers everything else so all configured instruments still get prices.
    """

    def __init__(self, primary: AllTickFeed, fallback: FeedSimulator):
        self._primary = primary
        self._fallback = fallback
        self._tasks: list[asyncio.Task] = []
        self._running = False

    @property
    def current_prices(self) -> dict:
        merged = dict(self._fallback.current_prices)
        merged.update(self._primary.current_prices)
        return merged

    async def start(self) -> None:
        self._running = True
        self._tasks = [
            asyncio.create_task(self._primary.start(), name="alltick-feed"),
            asyncio.create_task(self._fallback.start(), name="sim-feed"),
        ]
        await asyncio.gather(*self._tasks, return_exceptions=True)

    async def stop(self) -> None:
        self._running = False
        await asyncio.gather(self._primary.stop(), self._fallback.stop(), return_exceptions=True)
        for t in self._tasks:
            t.cancel()
        if self._tasks:
            await asyncio.gather(*self._tasks, return_exceptions=True)
        self._tasks.clear()

    async def get_tick(self):
        # Drain AllTick first (lower latency for live symbols), then simulator.
        t = await self._primary.get_tick()
        if t is not None:
            return t
        return await self._fallback.get_tick()


class MarketDataService:
    def __init__(self):
        raw_key = (getattr(settings, "ALLTICK_API_KEY", "") or "").strip()
        # Production toggle: when ALLTICK_ONLY=true, refuse to fall back to the
        # simulator for symbols AllTick doesn't cover. Symbols outside the
        # AllTick plan simply get no ticks — preferable to fake prices showing
        # in a real-money UI. Default off so dev/staging keeps coverage.
        alltick_only = str(
            getattr(settings, "ALLTICK_ONLY", "false") or "false"
        ).strip().lower() in ("1", "true", "yes")

        self._tick_count = 0
        self._alltick_watchdog_armed = False
        if usable_alltick_api_key(raw_key):
            alltick = AllTickFeed(raw_key, INSTRUMENTS)
            covered = {s.upper() for s in alltick._select_symbols()}
            if alltick_only:
                self.feed = alltick
                logger.info(
                    "Price feed: AllTick WebSocket only (%d symbols, simulator disabled by ALLTICK_ONLY=true)",
                    len(covered),
                )
            else:
                simulator = FeedSimulator(
                    tick_rate_multiplier=1.0,
                    exclude_symbols=covered,
                )
                self.feed = HybridFeed(alltick, simulator)
                logger.info(
                    "Price feed: AllTick WebSocket (%d symbols) + Simulator (%d symbols)",
                    len(covered),
                    len(INSTRUMENTS) - len(covered),
                )
            self._alltick_watchdog_armed = True
        else:
            if alltick_only:
                raise RuntimeError(
                    "ALLTICK_ONLY=true requires a valid ALLTICK_API_KEY. "
                    "Either set the key or unset ALLTICK_ONLY to use the simulator."
                )
            self.feed = FeedSimulator(tick_rate_multiplier=1.0)
            if raw_key:
                logger.warning(
                    "ALLTICK_API_KEY looks like a placeholder — using simulated feed + Binance crypto"
                )
            else:
                logger.warning(
                    "ALLTICK_API_KEY not set — using simulated forex/indices + Binance crypto"
                )
        self.aggregator = BarAggregator()
        self.store = TickStore()
        self.spread_cache = StreamSpreadCache()
        self.running = True
        self._last_mid: dict[str, float] = {}
        self._last_live_mono: dict[str, float] = {}

    async def start(self):
        logger.info("Starting Market Data Service...")

        signal.signal(signal.SIGINT, lambda *_: setattr(self, "running", False))
        signal.signal(signal.SIGTERM, lambda *_: setattr(self, "running", False))

        await self.store.init()

        await self.spread_cache.reload_if_stale(force=True)
        await self._seed_last_mid_from_redis()

        tasks = [
            asyncio.create_task(self.feed.start()),
            asyncio.create_task(self._process_ticks()),
            asyncio.create_task(self._spread_reload_loop()),
            asyncio.create_task(self._spread_config_subscriber()),
            asyncio.create_task(self._stale_quote_refresher()),
            asyncio.create_task(self.aggregator.run_aggregation_loop()),
            asyncio.create_task(self._auto_seed_bars()),
        ]
        if self._alltick_watchdog_armed:
            tasks.append(asyncio.create_task(self._alltick_fallback_watchdog()))

        await asyncio.gather(*tasks)

    async def _spread_reload_loop(self):
        while self.running:
            await asyncio.sleep(RELOAD_INTERVAL_SEC)
            if self.running:
                await self.spread_cache.reload_if_stale(force=True)

    async def _spread_config_subscriber(self):
        """Reload spread cache when admin saves spreads (same channel as instrument config)."""
        channel = CONFIG_INSTRUMENTS_RELOAD_CHANNEL
        while self.running:
            pubsub = redis_client.pubsub()
            try:
                await pubsub.subscribe(channel)
                while self.running:
                    msg = await pubsub.get_message(
                        ignore_subscribe_messages=True, timeout=1.0
                    )
                    if msg and msg.get("type") == "message":
                        logger.info("Config reload signal — refreshing spread cache")
                        await self.spread_cache.reload_if_stale(force=True)
            except asyncio.CancelledError:
                raise
            except Exception as exc:
                logger.warning("Spread config subscriber error (retrying): %s", exc)
                await asyncio.sleep(2.0)
            finally:
                try:
                    await pubsub.unsubscribe(channel)
                    await pubsub.aclose()
                except Exception:
                    pass

    async def _seed_last_mid_from_redis(self) -> None:
        """Prime last mid from existing tick:* keys so stale-quote refresh can fix spread after restart."""
        try:
            mono = time.monotonic()
            n = 0
            async for key in redis_client.scan_iter(f"{PriceChannel.TICK_PREFIX}*"):
                raw = await redis_client.get(key)
                if not raw:
                    continue
                try:
                    d = json.loads(raw)
                    sym = str(d.get("symbol") or "").strip().upper()
                    if not sym:
                        continue
                    b, a = float(d["bid"]), float(d["ask"])
                except (KeyError, TypeError, ValueError, json.JSONDecodeError):
                    continue
                self._last_mid[sym] = (b + a) / 2.0
                self._last_live_mono[sym] = mono - STALE_TICK_AFTER_SEC - 1.0
                n += 1
            if n:
                logger.info("Seeded last mid from Redis for %d symbols (stale refresh eligible)", n)
        except Exception as exc:
            logger.warning("Seed last_mid from Redis failed: %s", exc)

    async def _stale_quote_refresher(self) -> None:
        while self.running:
            await asyncio.sleep(STALE_REFRESH_INTERVAL_SEC)
            if not self.running:
                break
            await self.spread_cache.reload_if_stale(force=False)
            now = time.monotonic()
            ts_dt = datetime.now(timezone.utc)
            ts = ts_dt.strftime("%Y-%m-%dT%H:%M:%S.") + f"{ts_dt.microsecond // 1000:03d}Z"
            for symbol, mid in list(self._last_mid.items()):
                if now - self._last_live_mono.get(symbol, 0) < STALE_TICK_AFTER_SEC:
                    continue
                try:
                    bid, ask = self.spread_cache.widen(symbol, mid)
                    await publish_price(symbol, bid, ask, ts)
                except Exception as exc:
                    logger.debug("Stale quote refresh failed for %s: %s", symbol, exc)

    async def _process_ticks(self):
        logger.info("Tick processor started")
        while self.running:
            tick = await self.feed.get_tick()
            if tick is None:
                await asyncio.sleep(0.01)
                continue

            symbol = str(tick["symbol"] or "").strip().upper()
            if not symbol:
                continue
            bid = float(tick["bid"])
            ask = float(tick["ask"])
            ts = tick.get("timestamp", datetime.now(timezone.utc).isoformat())

            mid = (bid + ask) / 2.0
            self._last_mid[symbol] = mid
            self._last_live_mono[symbol] = time.monotonic()
            bid, ask = self.spread_cache.widen(symbol, mid)

            await publish_price(symbol, bid, ask, ts)

            await self.store.insert_tick(symbol, bid, ask, ts)

            self.aggregator.update(symbol, bid, ask, ts)
            self._tick_count += 1

    async def _alltick_fallback_watchdog(self) -> None:
        """If the hybrid feed delivers no ticks at all in 55s, drop to a pure
        simulator covering everything (typically means AllTick auth failed AND
        Binance is unreachable).

        Skipped in ALLTICK_ONLY mode — production prefers no ticks over fake
        ticks, and the operator gets a loud error log instead.
        """
        try:
            await asyncio.sleep(55.0)
        except asyncio.CancelledError:
            raise
        if not self.running or self._tick_count > 0:
            return
        if not isinstance(self.feed, HybridFeed):
            logger.error(
                "AllTick delivered no ticks in 55s and ALLTICK_ONLY is set — "
                "no simulator fallback. Check ALLTICK_API_KEY, outbound WSS, "
                "and AllTick service status."
            )
            return
        logger.error(
            "AllTick + simulator delivered no ticks in 55s — check ALLTICK_API_KEY, "
            "outbound HTTPS/WSS, and symbol codes. Falling back to a pure simulator."
        )
        try:
            await self.feed.stop()
        except Exception as exc:
            logger.warning("Stopping hybrid feed: %s", exc)
        self.feed = FeedSimulator(tick_rate_multiplier=1.0)
        asyncio.create_task(self.feed.start())

    async def _auto_seed_bars(self) -> None:
        """Wait for first ticks to arrive, then seed historical bars if Redis is empty."""
        try:
            await asyncio.sleep(30.0)  # give feed time to start delivering ticks
        except asyncio.CancelledError:
            raise
        if not self.running:
            return
        # Check if bars already exist for a common symbol
        sample_count = await redis_client.llen("bars:BTCUSD:5m")
        if sample_count >= 50:
            logger.info("Bars already seeded (%d bars for BTCUSD:5m), skipping auto-seed", sample_count)
            return
        logger.info("Auto-seeding historical bars (first run or bars missing)...")
        try:
            await seed_bars()
        except Exception as exc:
            logger.warning("Auto-seed bars failed: %s", exc)

    async def shutdown(self):
        logger.info("Shutting down Market Data Service...")
        self.running = False
        await self.feed.stop()
        await close_producer()
        await redis_client.close()


async def main():
    service = MarketDataService()
    try:
        await service.start()
    except KeyboardInterrupt:
        await service.shutdown()


if __name__ == "__main__":
    asyncio.run(main())
