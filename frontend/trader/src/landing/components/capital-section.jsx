'use client'

import { Shield, Clock, BarChart3, Check } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Risk Control",
    description: "Define a maximum drawdown per strategy. If a copied trader hits your limit, exx9 automatically stops copying and protects your capital.",
    bullets: ["Per-strategy stop-loss", "Auto-halt on breach", "Capital protection"],
  },
  {
    icon: Clock,
    title: "Withdraw Anytime",
    description: "No lock-ins. Ever. Request a withdrawal and it processes in 24–48 hours — directly to your bank account.",
    bullets: ["Zero lock-in periods", "24–48h to bank", "No exit fees"],
  },
  {
    icon: BarChart3,
    title: "Real-Time Portfolio View",
    description: "Open trades, closed trades, P&L, copied strategies, earnings — all in one dashboard. Updated live, every second.",
    bullets: ["Live P&L tracking", "Per-strategy breakdown", "1-second refresh"],
  },
]

export function CapitalSection() {
  return (
    <section className="relative section-pad bg-background overflow-hidden">
      <div className="pointer-events-none absolute -right-40 top-1/3 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.06] blur-3xl" />

      <div className="relative section-container">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow mb-5">● Capital Management</span>
            <h2 className="display-h2 text-foreground mt-5 mb-3">
              Your money. Your rules. <span className="brand-gradient-text">Always.</span>
            </h2>
            <p className="text-base font-medium text-emerald-700 mb-5">
              Streamlined Capital Management Operations
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Set stop-loss limits per strategy. Pause or stop copying anytime with one click.
              Withdraw whenever you want — no lock-in periods, no exit fees, no drama.
            </p>
          </div>

          {/* Right - Feature cards */}
          <div className="space-y-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white border border-border rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all duration-300"
              >
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl brand-gradient flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.bullets.map((b) => (
                        <span key={b} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                          <Check className="w-3 h-3" />
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
