'use client'

import { Zap, Lightbulb, History, Network } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Copy Trading Engine",
    description: "Millisecond execution. What the trader gets, you get. Same price. Same speed.",
    accent: "from-emerald-400 to-green-500",
  },
  {
    icon: Lightbulb,
    title: "Strategy Library",
    description: "5 hand-picked strategies, each tested across 10 years of real markets. Built by traders who actually run them — pick one and you're trading the same setup we are.",
    accent: "from-amber-400 to-emerald-500",
    badge: "Curated",
  },
  {
    icon: History,
    title: "Backtesting Engine",
    description: "Test any strategy on 10 years of historical data in seconds. Confidence backed by data, not hope.",
    accent: "from-teal-400 to-emerald-500",
  },
  {
    icon: Network,
    title: "Multi-Broker Integration",
    description: "Already have a broker? Connect it. Works with all major Indian & global brokers.",
    accent: "from-lime-400 to-emerald-500",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative section-pad bg-foreground text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dot-grid-dark opacity-50" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative section-container">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="eyebrow-dark mb-5">● Performance</span>
          <h2 className="display-h2 mt-5 mb-3">
            Every feature has one goal: <br className="hidden sm:block" />
            <span className="brand-gradient-text">to make you more money.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70">
            Built for Performance. Built for Growth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/[0.03] border border-white/10 rounded-3xl p-6 hover:bg-white/[0.06] hover:border-emerald-400/40 transition-all duration-300"
            >
              {feature.badge && (
                <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold tracking-wider border border-emerald-400/30">
                  {feature.badge}
                </span>
              )}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.accent} flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
