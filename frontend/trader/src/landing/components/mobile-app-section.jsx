'use client'

import { Button } from "@/landing/components/ui/button"
import { Smartphone, Apple, Play } from "lucide-react"

export function MobileAppSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-primary to-primary/80 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-balance">
              Your entire trading business — in your pocket.
            </h2>
            <p className="text-base font-semibold text-white/90 mb-5">
              exx9 Mobile App — iOS & Android
            </p>
            <p className="text-base sm:text-lg text-white/80 mb-6 max-w-lg mx-auto lg:mx-0">
              Copy trades, manage strategies, track earnings, check live markets, get alerts, and
              withdraw funds — all from your phone.
            </p>

            <ul className="space-y-2 mb-8 text-sm text-white/85 max-w-lg mx-auto lg:mx-0">
              <li className="flex items-start gap-2"><span className="text-white">✓</span> Instant trade notifications with P&amp;L details.</li>
              <li className="flex items-start gap-2"><span className="text-white">✓</span> One-tap copy management — pause or stop anytime.</li>
              <li className="flex items-start gap-2"><span className="text-white">✓</span> Live earnings dashboard — updated every second.</li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90 px-6">
                <Apple className="w-5 h-5 mr-2" />
                Download on App Store
              </Button>
              <Button size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90 px-6">
                <Play className="w-5 h-5 mr-2" />
                Get it on Google Play
              </Button>
            </div>

          </div>

          {/* Right - Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-64 sm:w-72 lg:w-80">
                <div className="bg-foreground rounded-[3rem] p-2 shadow-2xl">
                  <div className="bg-background rounded-[2.5rem] overflow-hidden">
                    <div className="p-6 pt-12">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <div className="text-xs text-muted-foreground">Good Morning</div>
                          <div className="text-lg font-bold text-foreground">John Doe</div>
                        </div>
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">JD</span>
                        </div>
                      </div>

                      <div className="bg-muted rounded-2xl p-4 mb-4">
                        <div className="text-xs text-muted-foreground mb-1">Total Balance</div>
                        <div className="text-2xl font-bold text-foreground">$87,432.50</div>
                        <div className="text-sm text-primary">+$2,340.00 today</div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-muted rounded-xl p-3 text-center">
                          <Smartphone className="w-5 h-5 text-primary mx-auto mb-1" />
                          <div className="text-xs text-muted-foreground">Deposit</div>
                        </div>
                        <div className="bg-muted rounded-xl p-3 text-center">
                          <Smartphone className="w-5 h-5 text-primary mx-auto mb-1" />
                          <div className="text-xs text-muted-foreground">Withdraw</div>
                        </div>
                        <div className="bg-muted rounded-xl p-3 text-center">
                          <Smartphone className="w-5 h-5 text-primary mx-auto mb-1" />
                          <div className="text-xs text-muted-foreground">Trade</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
    </section>
  )
}
