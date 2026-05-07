'use client';

/**
 * Lightweight TradingView widget — public free embed (s3.tradingview.com/tv.js).
 *
 * Why this instead of the standalone charting_library bundle:
 * - Zero local hosting (no /charting_library/ assets to ship)
 * - Smaller runtime (one ~200KB script vs the full library)
 * - OANDA / COINBASE / BINANCE feeds straight from TradingView (smooth, free)
 *
 * Trade-off: no broker order panel inside the chart — order entry happens in
 * the surrounding terminal panels. This matches the suimfx layout the user
 * requested.
 */
import { useEffect, useRef, memo } from 'react';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { useTradingStore } from '@/stores/tradingStore';
import { useUIStore } from '@/stores/uiStore';
import { toTradingViewSymbol } from '@/lib/tradingViewSymbols';

// Single in-flight loader — avoids dropping multiple <script> tags on every
// component mount (Strict Mode + dynamic imports can cause that).
let _tvScriptLoadPromise: Promise<void> | null = null;
function loadTradingViewScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if ((window as any).TradingView?.widget) return Promise.resolve();
  if (_tvScriptLoadPromise) return _tvScriptLoadPromise;
  _tvScriptLoadPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      _tvScriptLoadPromise = null; // allow retry on transient network failure
      reject(new Error('Failed to load TradingView tv.js'));
    };
    document.head.appendChild(script);
  });
  return _tvScriptLoadPromise;
}

let _containerCounter = 0;
function nextContainerId() {
  _containerCounter += 1;
  return `pt_tv_chart_${_containerCounter}`;
}

function LightweightChartInner() {
  const containerIdRef = useRef<string>(nextContainerId());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const selectedSymbol = useTradingStore((s) => s.selectedSymbol);
  const theme = useUIStore((s) => s.theme);

  const onTradingTerminal = Boolean(pathname?.startsWith('/trading/terminal'));
  const isDark = theme !== 'light';
  const interval = onTradingTerminal ? '5' : '15';
  const symbol = selectedSymbol || 'XAUUSD';

  useEffect(() => {
    let cancelled = false;
    const containerId = containerIdRef.current;

    const createWidget = () => {
      if (cancelled) return;
      const TV = (window as any).TradingView;
      const host = document.getElementById(containerId);
      if (!TV?.widget || !host) return;

      // Reset host — TV's widget mounts an <iframe> inside the inner div, so
      // recreating on theme/symbol change requires a clean slate.
      host.innerHTML = '';
      const inner = document.createElement('div');
      inner.id = `${containerId}_inner`;
      inner.style.height = '100%';
      inner.style.width = '100%';
      host.appendChild(inner);

      const tvSymbol = toTradingViewSymbol(symbol);
      const themeName = isDark ? 'dark' : 'light';
      const chartBg = isDark ? '#0a0a0a' : '#ffffff';

      try {
        // eslint-disable-next-line no-new
        new TV.widget({
          autosize: true,
          symbol: tvSymbol,
          interval,
          timezone: 'Etc/UTC',
          theme: themeName,
          style: '1', // candles
          locale: 'en',
          toolbar_bg: chartBg,
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          hide_side_toolbar: false,
          save_image: false,
          container_id: `${containerId}_inner`,
          backgroundColor: chartBg,
          withdateranges: true,
          allow_symbol_change: false,
          // Right-side buttons cleaned up — `details` was the symbol-info /
          // notepad icon and `show_popup_button` was the open-in-new-window
          // icon. Both clutter the chart edge for the user's terminal layout.
          details: false,
          hotlist: false,
          calendar: false,
          show_popup_button: false,
          studies: [],
          studies_overrides: {},
          overrides: {
            'mainSeriesProperties.showPriceLine': true,
            'mainSeriesProperties.highLowAvgPrice.highLowPriceLinesVisible': true,
            'scalesProperties.showSeriesLastValue': true,
            'scalesProperties.showStudyLastValue': true,
            'paneProperties.legendProperties.showLegend': true,
            'paneProperties.legendProperties.showSeriesTitle': true,
            'paneProperties.legendProperties.showSeriesOHLC': true,
            'paneProperties.legendProperties.showBarChange': true,
          },
        });
      } catch (err) {
        // Widget construction failures are non-fatal — the host stays empty
        // and the surrounding terminal still works.
        // eslint-disable-next-line no-console
        console.error('[LightweightChart] widget create failed:', err);
      }
    };

    loadTradingViewScript()
      .then(createWidget)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('[LightweightChart] script load failed:', err);
      });

    return () => {
      cancelled = true;
      const host = document.getElementById(containerId);
      if (host) host.innerHTML = '';
    };
  }, [symbol, interval, isDark]);

  const surface = isDark ? 'bg-[#0a0a0a]' : 'bg-bg-base';

  return (
    <div
      ref={wrapperRef}
      className={clsx('w-full h-full min-h-[200px] min-w-0', surface)}
      data-tv-chart-root
    >
      <div
        id={containerIdRef.current}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default memo(LightweightChartInner);
