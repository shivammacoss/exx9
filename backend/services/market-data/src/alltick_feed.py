"""Real-time market data from AllTick WebSocket.

Protocol: cmd_id-based JSON over WebSocket.
- 22000 → heartbeat (client → server, every 10s; server times out at 30s)
- 22001 → heartbeat ack
- 22004 → subscribe to tick stream (single active subscription per connection)
- 22005 → subscription ack
- 22998 → tick push (server → client)

Endpoint (forex + commodities + crypto):
    wss://quote.alltick.co/quote-b-ws-api?token=YOUR_TOKEN

AllTick gives a single ``price`` field per tick (last transaction price). We
treat it as a mid and let the platform's admin-configured spread widen it to
bid/ask in market-data ``main.py``.

Free tier: ~5 products per WS connection, 1 active subscription.
Paid tiers raise these limits.

Docs: https://github.com/alltick/alltick-realtime-forex-crypto-stock-tick-finance-websocket-api
"""

from __future__ import annotations

import asyncio
import contextlib
import json
import logging
import secrets
import urllib.parse
from datetime import datetime, timezone
from typing import Dict, List, Optional

import websockets

logger = logging.getLogger("market-data.alltick")

# Forex / commodities / crypto endpoint. Stocks use a different path
# (`/quote-stock-b-ws-api`) — not used here since the platform doesn't trade
# equities directly.
ALLTICK_WS_BASE = "wss://quote.alltick.co/quote-b-ws-api"

# Heartbeat cadence — server disconnects after 30s of silence.
HEARTBEAT_INTERVAL = 10.0

# AllTick free / trial tier:
#   - Rejects subscriptions of more than ~5 codes ("token level not enough", 603)
#   - Rejects more than 1 concurrent WebSocket connection per token (HTTP 429)
# So we run a SINGLE connection with a capped code count and let the simulator
# cover the remaining symbols. Paid plans can raise both via env vars.
import os as _os
try:
    MAX_CODES_PER_CONNECTION = int(_os.getenv("ALLTICK_MAX_CODES", "5"))
except (TypeError, ValueError):
    MAX_CODES_PER_CONNECTION = 5

# Cmd IDs from the AllTick spec.
CMD_HEARTBEAT_REQ = 22000
CMD_HEARTBEAT_ACK = 22001
CMD_SUBSCRIBE_REQ = 22004
CMD_SUBSCRIBE_ACK = 22005
CMD_TICK_PUSH = 22998

# Platform crypto symbol → AllTick code (AllTick uses USDT pairs, same as
# Infoway / Binance convention).
CRYPTO_ALLTICK_CODES: Dict[str, str] = {
    "BTCUSD": "BTCUSDT",
    "ETHUSD": "ETHUSDT",
    "LTCUSD": "LTCUSDT",
    "XRPUSD": "XRPUSDT",
    "SOLUSD": "SOLUSDT",
}

# Optional aliases when AllTick advertises a different code than our DB symbol.
ALLTICK_SYMBOL_ALIASES: Dict[str, str] = {
    "XTIUSD": "USOIL",
    "WTIUSD": "USOIL",
    "CLUSD": "USOIL",
}


def _build_alltick_to_platform(instruments: Dict[str, dict]) -> Dict[str, str]:
    """Map any AllTick code (incl. crypto USDT, aliases) → platform symbol."""
    m: Dict[str, str] = {}
    for plat in instruments:
        code = CRYPTO_ALLTICK_CODES.get(plat, plat)
        m[code.upper()] = plat
        m[plat.upper()] = plat
    for alt_sym, plat in ALLTICK_SYMBOL_ALIASES.items():
        if plat in instruments:
            m[alt_sym.upper()] = plat
    return m


def _trace() -> str:
    """64-hex-char trace id (AllTick spec: max 64 chars, must be unique)."""
    return secrets.token_hex(16)


def _seq_id() -> int:
    """Best-effort monotonic-ish int — server only echoes back, not strict."""
    return int.from_bytes(secrets.token_bytes(4), "big") & 0x7FFFFFFF


class AllTickFeed:
    """Streams tick-by-tick last prices from AllTick (forex/commodities/crypto).

    Trial / free tier supports a single concurrent WebSocket with at most
    ~5 subscribed codes, so this feed deliberately runs ONE connection. The
    remaining configured instruments stay on the simulator (see HybridFeed).

    To pick which symbols AllTick covers, set ``ALLTICK_SYMBOLS`` to a
    comma-separated list (e.g. ``EURUSD,GBPUSD,USDJPY,XAUUSD,BTCUSD``).
    Otherwise the feed auto-selects the highest-priority instruments
    (forex majors → commodities → indices → crypto) up to MAX_CODES_PER_CONNECTION.
    """

    def __init__(self, api_key: str, instruments: Dict[str, dict]):
        self._api_key = api_key.strip()
        self._instruments = instruments
        self._alltick_to_platform = _build_alltick_to_platform(instruments)

        self._tick_queue: asyncio.Queue = asyncio.Queue(maxsize=50_000)
        self._running = False
        self._tasks: List[asyncio.Task] = []
        self._covered_symbols: set[str] = set()

    @property
    def current_prices(self) -> Dict[str, float]:
        return {}

    @property
    def covered_symbols(self) -> set[str]:
        """Platform symbols this feed actively subscribes to."""
        return set(self._covered_symbols)

    def _select_symbols(self) -> List[str]:
        """Pick which platform symbols to subscribe to (capped by plan limit)."""
        env_list = (_os.getenv("ALLTICK_SYMBOLS") or "").strip()
        if env_list:
            wanted = [s.strip().upper() for s in env_list.split(",") if s.strip()]
            return [s for s in wanted if s in self._instruments][:MAX_CODES_PER_CONNECTION]

        priority = ["forex_major", "commodity", "index", "forex_minor", "crypto"]
        ordered: List[str] = []
        for cat in priority:
            for sym, info in self._instruments.items():
                if info.get("category") == cat and sym not in ordered:
                    ordered.append(sym)
        return ordered[:MAX_CODES_PER_CONNECTION]

    async def start(self) -> None:
        self._running = True

        plat_symbols = self._select_symbols()
        if not plat_symbols:
            logger.error("No instruments configured for AllTick — feed idle")
            return

        codes: List[str] = []
        for plat in plat_symbols:
            info = self._instruments.get(plat) or {}
            if info.get("category") == "crypto":
                code = CRYPTO_ALLTICK_CODES.get(plat)
                if code:
                    codes.append(code)
            else:
                codes.append(plat)

        self._covered_symbols = set(plat_symbols)
        logger.info(
            "AllTick feed starting — covering %d symbols: %s",
            len(plat_symbols),
            ", ".join(plat_symbols),
        )

        self._tasks.append(
            asyncio.create_task(self._run_socket(0, codes), name="alltick-0")
        )
        await asyncio.gather(*self._tasks, return_exceptions=True)

    async def stop(self) -> None:
        self._running = False
        for t in self._tasks:
            t.cancel()
        if self._tasks:
            await asyncio.gather(*self._tasks, return_exceptions=True)
        self._tasks.clear()
        logger.info("AllTick feed stopped")

    async def get_tick(self) -> Optional[dict]:
        try:
            return self._tick_queue.get_nowait()
        except asyncio.QueueEmpty:
            return None

    def _ws_url(self) -> str:
        q = urllib.parse.urlencode({"token": self._api_key})
        return f"{ALLTICK_WS_BASE}?{q}"

    def _enqueue(self, tick: dict) -> None:
        try:
            self._tick_queue.put_nowait(tick)
        except asyncio.QueueFull:
            with contextlib.suppress(asyncio.QueueEmpty):
                self._tick_queue.get_nowait()
            with contextlib.suppress(asyncio.QueueFull):
                self._tick_queue.put_nowait(tick)

    def _platform_symbol(self, raw: str) -> Optional[str]:
        if not raw:
            return None
        return self._alltick_to_platform.get(raw.strip().upper())

    def _emit_tick(self, data: dict) -> None:
        """Convert AllTick 22998 push payload → internal tick dict.

        AllTick fields:
            code:            symbol (e.g. "EURUSD")
            seq:             quote sequence (string)
            tick_time:       milliseconds since epoch (string)
            price:           last transaction price
            volume:          last trade volume (forex: synthetic)
            turnover:        price × volume (omitted for forex/metals/energy)
            trade_direction: 0 unknown / 1 BUY / 2 SELL (unused)

        We treat ``price`` as a mid; downstream ``StreamSpreadCache.widen()``
        applies the platform's configured spread to derive bid/ask.
        """
        symbol = self._platform_symbol(str(data.get("code") or ""))
        if not symbol or symbol not in self._instruments:
            return

        try:
            price = float(data.get("price"))
        except (TypeError, ValueError):
            return
        if price <= 0:
            return

        info = self._instruments[symbol]
        decimals = int(info["decimals"])
        mid_r = round(price, decimals)

        # AllTick tick_time is a string-encoded epoch in ms.
        ts_raw = data.get("tick_time")
        ts_ms: Optional[int] = None
        try:
            if ts_raw is not None:
                ts_ms = int(str(ts_raw))
        except (TypeError, ValueError):
            ts_ms = None
        if ts_ms and ts_ms > 0:
            sec = ts_ms // 1000
            ms = ts_ms % 1000
            dt = datetime.fromtimestamp(sec, tz=timezone.utc)
            timestamp = dt.strftime("%Y-%m-%dT%H:%M:%S.") + f"{ms:03d}Z"
        else:
            now = datetime.now(timezone.utc)
            timestamp = now.strftime("%Y-%m-%dT%H:%M:%S.") + f"{now.microsecond // 1000:03d}Z"

        try:
            volume = int(float(data.get("volume") or 0))
        except (TypeError, ValueError):
            volume = 0

        tick = {
            "symbol": symbol,
            # We pass mid as both bid/ask; main.py recomputes mid and applies
            # admin spread before publishing — same as the Infoway path.
            "bid": mid_r,
            "ask": mid_r,
            "timestamp": timestamp,
            "volume": max(volume, 1),
        }
        self._enqueue(tick)

    async def _heartbeat_loop(self, ws) -> None:
        """Send 22000 every HEARTBEAT_INTERVAL seconds."""
        while self._running:
            await asyncio.sleep(HEARTBEAT_INTERVAL)
            if not self._running:
                break
            try:
                msg = json.dumps(
                    {
                        "cmd_id": CMD_HEARTBEAT_REQ,
                        "seq_id": _seq_id(),
                        "trace": _trace(),
                        "data": {},
                    }
                )
                await ws.send(msg)
            except Exception as exc:
                logger.debug("AllTick heartbeat send failed: %s", exc)
                break

    async def _run_socket(self, idx: int, codes: List[str]) -> None:
        if not codes:
            return
        url = self._ws_url()

        while self._running:
            hb_task: Optional[asyncio.Task] = None
            try:
                logger.info("AllTick [%d] connecting (%d codes)…", idx, len(codes))
                async with websockets.connect(
                    url,
                    ping_interval=20,
                    ping_timeout=25,
                    close_timeout=10,
                ) as ws:
                    sub_msg = json.dumps(
                        {
                            "cmd_id": CMD_SUBSCRIBE_REQ,
                            "seq_id": _seq_id(),
                            "trace": _trace(),
                            "data": {
                                "symbol_list": [{"code": c} for c in codes],
                            },
                        }
                    )
                    await ws.send(sub_msg)
                    logger.info(
                        "AllTick [%d] subscribed to %d codes", idx, len(codes)
                    )

                    hb_task = asyncio.create_task(self._heartbeat_loop(ws))

                    async for raw in ws:
                        if not self._running:
                            break
                        try:
                            msg = json.loads(raw)
                        except json.JSONDecodeError:
                            continue
                        cmd = msg.get("cmd_id")
                        ret = msg.get("ret")
                        if cmd == CMD_TICK_PUSH:
                            self._emit_tick(msg.get("data") or {})
                        elif cmd == CMD_SUBSCRIBE_ACK:
                            if ret and ret != 200:
                                logger.warning(
                                    "AllTick [%d] subscribe rejected: %s",
                                    idx,
                                    msg.get("msg"),
                                )
                        elif cmd == CMD_HEARTBEAT_ACK:
                            pass
                        elif ret and ret != 200:
                            logger.warning(
                                "AllTick [%d] error (check token / plan / symbols): %s",
                                idx,
                                msg,
                            )
            except asyncio.CancelledError:
                break
            except Exception as exc:
                logger.warning(
                    "AllTick [%d] WebSocket error: %s — reconnect in 5s", idx, exc
                )
                await asyncio.sleep(5)
            finally:
                if hb_task:
                    hb_task.cancel()
                    with contextlib.suppress(asyncio.CancelledError):
                        await hb_task

        logger.info("AllTick [%d] task ended", idx)
