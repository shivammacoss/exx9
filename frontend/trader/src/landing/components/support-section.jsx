'use client'

import { MessageCircle, HelpCircle, PlayCircle, Phone } from "lucide-react"

const supportFeatures = [
  {
    icon: MessageCircle,
    title: "24/7 Live Chat",
    description: "Average response: under 3 minutes.",
    accent: "from-emerald-500 to-green-500",
  },
  {
    icon: HelpCircle,
    title: "Help Center",
    description: "100+ step-by-step articles for every feature.",
    accent: "from-teal-500 to-emerald-500",
  },
  {
    icon: PlayCircle,
    title: "Video Tutorials",
    description: "Short, clear videos. No jargon.",
    accent: "from-amber-400 to-emerald-500",
  },
  {
    icon: Phone,
    title: "WhatsApp Support",
    description: "Reply in minutes. Hindi or English.",
    accent: "from-lime-500 to-emerald-500",
  },
]

export function SupportSection() {
  return (
    <section className="relative section-pad bg-background overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-50" />
      <div className="relative section-container">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="eyebrow mb-5">● Support</span>
          <h2 className="display-h2 text-foreground mt-5 mb-3">
            We're real people. <br className="hidden sm:block" />
            And we're <span className="brand-gradient-text">here when you need us.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            No bots. No 3-day email queues. Real traders built this platform, and real humans support it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {supportFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white border border-border rounded-3xl p-6 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.accent} flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
