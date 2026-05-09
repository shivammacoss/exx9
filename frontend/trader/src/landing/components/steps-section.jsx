'use client'

import { UserPlus, Wallet, Users, Zap } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in 2 minutes. No documents. No hassle. Create your free exx9 account with just your email.",
  },
  {
    number: "02",
    icon: Wallet,
    title: "Fund Account",
    description: "Add money via UPI, bank transfer, debit card, or crypto. Minimum ₹500. Your funds are always in your control.",
  },
  {
    number: "03",
    icon: Users,
    title: "Pick a Trader",
    description: "Browse verified strategy providers. Check their win rate, drawdown, returns, and style. Pick one that matches your risk appetite.",
  },
  {
    number: "04",
    icon: Zap,
    title: "Copy on Autopilot",
    description: "Every trade your chosen trader makes is mirrored in your account automatically — in real time. No charts. No analysis. No stress.",
  },
]

export function StepsSection() {
  return (
    <section className="relative section-pad bg-gradient-to-b from-background to-emerald-50/30 overflow-hidden">
      <div className="relative section-container">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="eyebrow mb-5">● Onboarding</span>
          <h2 className="display-h2 text-foreground mt-5 mb-3">
            Up and running in <span className="brand-gradient-text">under 5 minutes.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Get Started in 4 Simple Steps
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="relative z-10 flex flex-col items-center text-center px-2">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-3xl brand-gradient flex items-center justify-center shadow-xl shadow-emerald-500/30">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-9 h-9 bg-white border-2 border-emerald-200 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-[11px] font-bold text-emerald-700 tabular-nums">{step.number}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
