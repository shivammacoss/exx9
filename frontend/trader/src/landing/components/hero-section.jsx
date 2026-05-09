'use client'

import { Button } from "@/landing/components/ui/button"
import { ArrowRight } from "lucide-react"
import { OpenAccountDialog } from "@/landing/components/auth-dialogs"

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 bg-gradient-to-b from-emerald-50 via-white to-white">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl">
          <img
            src="/images/banner1.png"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

          <div className="relative px-6 sm:px-10 lg:px-14 py-14 sm:py-20 lg:py-24 min-h-[500px] sm:min-h-[600px] lg:min-h-[680px] flex">
            {/* Left content */}
            <div className="text-white max-w-2xl my-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold leading-[1.15] tracking-tight">
                Copy Trading,
                <span className="brand-gradient-text ml-3">Finally Done Right.</span>
                <span className="block mt-5 sm:mt-6 text-white/85 text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
                  Stop guessing. Start copying the traders who actually make money.
                  exx9 gives you real strategies, real results — no fluff, no hidden charges.
                </span>
              </h1>

              <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-3">
                <OpenAccountDialog
                  trigger={
                    <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-full px-7 font-semibold shadow-2xl shadow-emerald-500/40 hover:scale-[1.02] transition-transform">
                      Start Free — First Month on Us
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  }
                />
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/15 rounded-full px-6 font-semibold border border-white/30">
                  See How It Works →
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
