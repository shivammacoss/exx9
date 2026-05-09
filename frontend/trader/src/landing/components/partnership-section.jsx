'use client'

import { Button } from "@/landing/components/ui/button"
import { BecomePartnerDialog } from "@/landing/components/auth-dialogs"
import { Percent, Users, Banknote, Gift, ArrowRight } from "lucide-react"

const benefits = [
  {
    icon: Users,
    value: "10,000+",
    label: "Active Traders",
  },
  {
    icon: Percent,
    value: "₹100/mo",
    label: "Or Free First Month",
  },
  {
    icon: Gift,
    value: "5",
    label: "Curated Strategies",
  },
  {
    icon: Banknote,
    value: "Top",
    label: "Brokers Connected",
  },
]

export function PartnershipSection() {
  return (
    <section className="py-20 lg:py-28 bg-foreground text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-balance">
            There's a place for you here — whatever your level.
          </h2>
          <p className="text-base font-semibold text-primary mb-5">
            A World of Possibilities — Partner with exx9
          </p>
          <p className="text-base sm:text-lg text-white/70">
            Whether you're a beginner copying your first trade or an experienced trader ready to
            sell your strategy — exx9 is built for both.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 text-center hover:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-3 mx-auto">
                <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold mb-1">{benefit.value}</div>
              <p className="text-xs sm:text-sm text-white/60">{benefit.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <BecomePartnerDialog
            trigger={
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-lg shadow-emerald-500/30">
                Join exx9 Community — It's Free to Start
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            }
          />
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
    </section>
  )
}
