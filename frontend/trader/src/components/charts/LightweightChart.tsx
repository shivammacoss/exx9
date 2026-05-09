'use client';

import { useMemo, memo } from 'react';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { useTradingStore } from '@/stores/tradingStore';
import { useUIStore } from '@/stores/uiStore';
import { toTradingViewSymbol } from '@/lib/tradingViewSymbols';

/**
 * TradingView "lightweight" chart — classic widgetembed iframe.
 *
 * Why an iframe instead of the script-injected `new TradingView.widget(...)`:
 *   - The script-injection pattern breaks under React StrictMode (double mount):
 *     cleanup removes the host node while TradingView is still touching
 *     iframe.contentWindow → console error + blank chart.
 *   - widgetembed is purely declarative: change the URL, browser swaps the
 *     iframe contents. No global script tag, no widget instances to clean up.
 *   - Same rendering quality, same OANDA / COINBASE / BINANCE feeds.
 *
 * Trade-off: no broker order panel inside the chart — order entry happens in
 * the surrounding terminal panels.
 */
function buildWidgetEmbedUrl(
  symbol: string,
  theme: 'Dark' | 'Light',
  interval: string,
): string {
  const tvSymbol = toTradingViewSymbol(symbol);
  const params = new URLSearchParams({
    frameElementId: 'pt_tradingview_chart',
    symbol: tvSymbol,
    interval,
    hidesidetoolbar: '0',
    hidetoptoolbar: '0',
    symboledit: '0',
    saveimage: '1',
    toolbarbg: theme === 'Dark' ? '131722' : 'f1f3f6',
    studies: '[]',
    hideideas: '1',
    theme,
    style: '1',
    timezone: 'Etc/UTC',
    studies_overrides: '{}',
    overrides: '{}',
    enabled_features: '[]',
    disabled_features: '[]',
    locale: 'en',
    utm_source:
      typeof window !== 'undefined' ? window.location.hostname || 'exx9' : 'exx9',
    utm_medium: 'widget',
    utm_campaign: 'chart',
    utm_term: tvSymbol,
    withdateranges: '1',
  });
  return `https://www.tradingview.com/widgetembed/?${params.toString()}`;
}

function LightweightChartInner() {
  const pathname = usePathname();
  const selectedSymbol = useTradingStore((s) => s.selectedSymbol);
  const theme = useUIStore((s) => s.theme);
  const onTradingTerminal = Boolean(pathname?.startsWith('/trading/terminal'));
  const tvTheme: 'Dark' | 'Light' = theme === 'light' ? 'Light' : 'Dark';
  const interval = onTradingTerminal ? '5' : '15';

  const src = useMemo(
    () => buildWidgetEmbedUrl(selectedSymbol ?? 'EURUSD', tvTheme, interval),
    [selectedSymbol, tvTheme, interval],
  );

  const surface = tvTheme === 'Light' ? 'bg-bg-base' : 'bg-[#0e0e0e]';

  return (
    <div className={clsx('w-full h-full min-h-[200px] min-w-0', surface)} data-tv-chart-root>
      <iframe
        key={src}
        title={`Chart ${selectedSymbol || 'EURUSD'}`}
        src={src}
        className={clsx('h-full w-full min-h-[200px] border-0', surface)}
        allow="clipboard-write; fullscreen"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default memo(LightweightChartInner);
