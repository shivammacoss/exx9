'use client'

import { Button } from "@/landing/components/ui/button"
import { Download, Check, Star } from "lucide-react"

const features = [
  "Advanced charting tools",
  "Algorithmic trading capability",
  "Multi-asset functionality",
  "Secure encrypted execution",
]

export function PlatformSection() {
  return (
    <section className="section-pad bg-emerald-50/40">
      <div className="section-container">
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-sm border border-border/60 p-6 sm:p-10 lg:p-14">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">Platform</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
              MetaTrader 5 <span className="brand-gradient-text">Platform Accessibility</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Download institutional trading technology for desktop, web, and mobile environments.
            </p>

            {/* Features List */}
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">4.1 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">650,000+ Installations</span>
              </div>
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 rounded-full w-full sm:w-auto shadow-lg shadow-emerald-500/30">
              <Download className="w-5 h-5 mr-2" />
              Download Now
            </Button>
          </div>

          {/* Right Content - App Preview */}
          <div className="relative">
            <div className="absolute -inset-6 brand-gradient opacity-20 blur-3xl rounded-[3rem]" />
            <div className="relative bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-emerald-100">
              {/* Desktop App Preview */}
              <div className="bg-foreground rounded-xl overflow-hidden">
                {/* Title Bar */}
                <div className="bg-foreground/90 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center text-sm text-white/60">VXNESS Trading Platform</div>
                </div>
                
                {/* App Content */}
                <div className="bg-gray-900 p-4">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="col-span-2 bg-gray-800 rounded-lg p-3">
                      {/* Chart Area */}
                      <div className="h-32 relative">
                        <svg className="w-full h-full" viewBox="0 0 200 80">
                          <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0,60 L20,55 L40,58 L60,40 L80,42 L100,30 L120,35 L140,20 L160,25 L180,15 L200,20"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                          />
                          <path
                            d="M0,60 L20,55 L40,58 L60,40 L80,42 L100,30 L120,35 L140,20 L160,25 L180,15 L200,20 L200,80 L0,80 Z"
                            fill="url(#chartGradient)"
                          />
                        </svg>
                        <div className="absolute top-2 left-2 text-xs text-white/60">EUR/USD</div>
                        <div className="absolute top-2 right-2 text-xs text-green-400">+0.15%</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-gray-800 rounded-lg p-2 text-xs text-white/80">
                        <div className="text-white/50 mb-1">Balance</div>
                        <div className="font-semibold">$124,532</div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-2 text-xs text-white/80">
                        <div className="text-white/50 mb-1">Equity</div>
                        <div className="font-semibold">$127,891</div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-2 text-xs text-white/80">
                        <div className="text-white/50 mb-1">Margin</div>
                        <div className="font-semibold">12.4%</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Row */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-green-500 text-white text-xs font-semibold py-2 rounded">BUY</button>
                    <button className="flex-1 bg-red-500 text-white text-xs font-semibold py-2 rounded">SELL</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-border/60 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 brand-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">MT5</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">MetaTrader 5</div>
                <div className="text-xs text-muted-foreground">Desktop • Web • Mobile</div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
