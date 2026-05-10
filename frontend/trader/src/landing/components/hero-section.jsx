'use client'

import { Button } from "@/landing/components/ui/button"
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from "lucide-react"
import { OpenAccountDialog } from "@/landing/components/auth-dialogs"

export function HeroSection() {
  return (
    <section className="hero-section relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-white" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          backgroundImage: [
            "radial-gradient(circle at 15% 20%, rgba(16,185,129,0.18), transparent 45%)",
            "radial-gradient(circle at 85% 30%, rgba(132,204,22,0.16), transparent 45%)",
            "radial-gradient(circle at 70% 90%, rgba(4,120,87,0.14), transparent 50%)",
          ].join(','),
        }}
      />
      {/* Subtle grid pattern overlay */}
      <div className="grid-overlay" />

      <div className="section-container relative">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl ring-1 ring-emerald-500/20">
          <img
            src="/images/banner1.png"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />

          {/* Layered overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />
          <div
            className="absolute inset-0 mix-blend-overlay opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 50%, rgba(16,185,129,0.4), transparent 55%)",
            }}
          />

          {/* Floating decorative orbs in hero */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-emerald-500/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-lime-400/25 blur-3xl pointer-events-none" />

          <div className="relative px-6 sm:px-10 lg:px-14 py-14 sm:py-20 lg:py-24 min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex">
            <div className="text-white max-w-2xl my-auto relative">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-white/95">Live now — Real strategies. Real results.</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3rem] font-bold leading-[1.1] tracking-tight">
                Copy Trading,
                <span className="block mt-2">
                  <span className="brand-gradient-text bg-gradient-to-r from-emerald-300 via-lime-300 to-emerald-400 bg-clip-text text-transparent">
                    Finally Done Right.
                  </span>
                </span>
                <span className="block mt-6 sm:mt-7 text-white/85 text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-xl">
                  Stop guessing. Start copying the traders who actually make money.
                  <span className="text-emerald-200 font-semibold"> exx9</span> gives you real strategies, real results — no fluff, no hidden charges.
                </span>
              </h1>

              <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-3">
                <OpenAccountDialog
                  trigger={
                    <Button
                      size="lg"
                      className="pulse-glow group bg-emerald-500 hover:bg-emerald-400 text-white rounded-full px-7 font-semibold shadow-2xl shadow-emerald-500/50 transition-all hover:scale-[1.03]"
                    >
                      Start Free — First Month on Us
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  }
                />
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/15 rounded-full px-6 font-semibold border border-white/30 backdrop-blur-sm"
                >
                  See How It Works →
                </Button>
              </div>

              {/* Trust strip */}
              <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
                {[
                  { icon: Shield,     label: "Regulated",    sub: "Mauritius FSC" },
                  { icon: TrendingUp, label: "10K+ traders", sub: "active monthly" },
                  { icon: Zap,        label: "0.0 spreads",  sub: "from execution" },
                ].map(({ icon: Icon, label, sub }, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-white/8 backdrop-blur-md border border-white/15"
                  >
                    <Icon className="w-4 h-4 mt-0.5 text-emerald-300 flex-shrink-0" />
                    <div className="leading-tight">
                      <div className="text-xs sm:text-sm font-bold text-white">{label}</div>
                      <div className="text-[10px] sm:text-xs text-white/65">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
