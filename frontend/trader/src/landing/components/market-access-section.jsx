'use client'

import { TrendingUp, Bitcoin, BarChart3, Fuel, Building2, ArrowRight } from "lucide-react"

const markets = [
  {
    icon: TrendingUp,
    title: "Forex",
    description: "The world's largest market. Trade 50+ currency pairs with tight spreads and instant execution.",
    accent: "from-emerald-500 to-green-500",
    ticker: "EURUSD",
    change: "+0.34%",
    up: true,
  },
  {
    icon: Bitcoin,
    title: "Crypto",
    description: "Bitcoin, Ethereum, and 20+ altcoins. Volatile markets = big opportunities, if you copy the right trader.",
    accent: "from-amber-400 to-emerald-500",
    ticker: "BTCUSD",
    change: "+1.85%",
    up: true,
  },
  {
    icon: BarChart3,
    title: "Indices",
    description: "Trade the S&P 500, NASDAQ, Nifty 50 and more. Diversify beyond single stocks.",
    accent: "from-teal-500 to-emerald-500",
    ticker: "NAS100",
    change: "+0.62%",
    up: true,
  },
  {
    icon: Fuel,
    title: "Commodities",
    description: "Gold, Silver, Oil — assets that move differently than equities. Perfect for portfolio balance.",
    accent: "from-lime-500 to-emerald-500",
    ticker: "XAUUSD",
    change: "-0.12%",
    up: false,
  },
  {
    icon: Building2,
    title: "Stocks",
    description: "Apple, Tesla, TCS, Reliance — copy trade on global and Indian stocks simultaneously.",
    accent: "from-emerald-600 to-teal-500",
    ticker: "TSLA",
    change: "+2.41%",
    up: true,
  },
]

export function MarketAccessSection() {
  return (
    <section className="relative section-pad bg-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-60" />
      <div className="relative section-container">
        <div className="max-w-3xl mb-14">
          <span className="eyebrow mb-5">● Markets</span>
          <h2 className="display-h2 text-foreground mb-5 mt-5">
            Five markets. One login. <br className="hidden sm:block" />
            <span className="brand-gradient-text">Zero confusion.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            We built a platform that doesn't lock you into one market. Trade Forex, Crypto, Indices,
            Commodities, and Stocks — all from a single dashboard, with one account.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((m, i) => (
            <div key={i} className="group relative bg-light-mint border border-mint rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/15 hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className={`pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r ${m.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.accent} flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <m.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold text-muted-foreground tracking-[0.15em]">{m.ticker}</div>
                  <div className={`text-sm font-bold tabular-nums ${m.up ? "text-emerald-600" : "text-rose-500"}`}>{m.change}</div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-emerald-700 transition-colors">{m.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{m.description}</p>

              <div className="inline-flex items-center text-sm font-semibold text-primary">
                Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-emerald-100 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm sm:text-base font-semibold text-foreground">
              All markets. One strategy. <span className="brand-gradient-text">Fully automated.</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
