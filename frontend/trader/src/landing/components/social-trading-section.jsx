'use client'

import { Button } from "@/landing/components/ui/button"
import { ArrowRight } from "lucide-react"

const stats = [
  { value: "500+", label: "Strategy Providers" },
  { value: "₹2L+", label: "Earned Monthly" },
  { value: "10K+", label: "Copiers" },
]

export function SocialTradingSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 text-balance">
            Your trading skill is worth money. Start charging for it.
          </h2>
          <p className="text-base font-semibold text-primary">Social Trading Ecosystem</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-border rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-foreground mb-4">If you're a trader</h3>
            <p className="text-muted-foreground leading-relaxed">
              Create your strategy profile, build your follower base, set your monthly fee,
              and start earning from every trader who copies you. We handle payments. You focus on trading.
            </p>
          </div>
          <div className="bg-white border border-border rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-foreground mb-4">If you're just starting</h3>
            <p className="text-muted-foreground leading-relaxed">
              Not a trader yet? Browse verified providers, check their track record, and start
              copying with one click. No charts. No analysis. No stress.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-10">
          {stats.map((s, i) => (
            <div key={i} className="text-center bg-muted/40 border border-border rounded-2xl p-6">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold brand-gradient-text">{s.value}</div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-lg shadow-emerald-500/30">
            Become a Strategy Provider — Apply Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
