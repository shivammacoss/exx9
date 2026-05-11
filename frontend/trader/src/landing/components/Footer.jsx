'use client'

import Link from 'next/link'
import { Twitter, Linkedin, Instagram, Youtube, Send } from "lucide-react"

const footerLinks = {
  platform: {
    title: "Platform",
    links: [
      { label: "Copy Trading", href: "/markets/forex" },
      { label: "Strategy Library", href: "/tools/trading-platform" },
      { label: "Backtesting", href: "/tools/heatmap" },
      { label: "Dashboard", href: "/accounts/types" },
      { label: "Pricing", href: "/accounts/types" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About exx9", href: "/about" },
      { label: "Our Story", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Press Kit", href: "/about" },
      { label: "Blog", href: "/blog" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Help Center", href: "/contact" },
      { label: "WhatsApp", href: "/contact" },
      { label: "Contact", href: "/contact" },
      { label: "Video Tutorials", href: "/blog" },
      { label: "FAQs", href: "/contact" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Terms of Use", href: "/legal/terms-of-use" },
      { label: "Risk Disclosure", href: "/legal/risk-disclosure" },
      { label: "Cookie Policy", href: "/legal" },
    ],
  },
}

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo Column */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <img src="/images/exx9_logo_light.png"
                alt="exx9"
                width={140}
                height={36}
                className="h-9 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm text-white/70 mb-6 max-w-xs">
              Honest trading for real people.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[Twitter, Instagram, Linkedin, Send, Youtube].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-sm text-white/60 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Warning */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-white/60 leading-relaxed text-center">
            <strong className="text-yellow-400">Risk Warning:</strong> Trading involves risk. Capital can be lost. Please trade responsibly.
          </p>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-white/40 text-center">
            © {new Date().getFullYear()} exx9. All rights reserved. <span className="mx-2">|</span> Made in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  )
}
