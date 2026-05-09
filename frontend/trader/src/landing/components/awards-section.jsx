'use client'

import { Award, Trophy, Star, Medal } from "lucide-react"

const awards = [
  {
    year: "2024",
    title: "Most Transparent Copy Trading Platform",
    icon: Trophy,
  },
  {
    year: "2024",
    title: "Best Trader-Built Tools — FinTech India",
    icon: Award,
  },
  {
    year: "2024",
    title: "Top Broker Integration Platform",
    icon: Star,
  },
  {
    year: "2024",
    title: "Fastest Growing Trading Community — India",
    icon: Medal,
  },
]

export function AwardsSection() {
  return (
    <section className="relative section-pad bg-gradient-to-b from-emerald-50/30 to-background overflow-hidden">
      <div className="relative section-container">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="eyebrow mb-5">● Recognition</span>
          <h2 className="display-h2 text-foreground mt-5">
            Don't take our word for it. <br className="hidden sm:block" />
            <span className="brand-gradient-text">The industry already has.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {awards.map((award, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-6 border border-border hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 brand-gradient rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <award.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-xs font-semibold text-emerald-700 tracking-wider mb-1.5">{award.year}</div>
              <div className="text-base font-semibold text-foreground leading-snug">{award.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
