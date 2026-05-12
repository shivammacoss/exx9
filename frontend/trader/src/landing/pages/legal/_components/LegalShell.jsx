'use client'

import Link from 'next/link'
import { Navbar } from '@/landing/components/Navbar'
import { Footer } from '@/landing/components/Footer'
import {
  ChevronRight,
  FileText,
  Mail,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react'

export function LegalShell({
  title,
  description,
  updatedAt = 'March 2026',
  effectiveAt,
  version = 'v1.0',
  icon: Icon = FileText,
  toc = [],
  children,
}) {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* Hero */}
        <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
          <img
            src="/images/banner2.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/65 to-black/40" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/legal" className="hover:text-white transition-colors">
                Legal
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{title}</span>
            </nav>

            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-3xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                  {title}
                </h1>
                {description && (
                  <p className="text-white/80 text-base lg:text-lg max-w-2xl mb-5">
                    {description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {version}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90">
                    Last updated: {updatedAt}
                  </span>
                  {effectiveAt && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90">
                      Effective: {effectiveAt}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[260px_1fr] gap-10">
              {toc.length > 0 && (
                <aside className="hidden lg:block">
                  <div className="sticky top-24">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                      On this page
                    </p>
                    <ul className="space-y-1">
                      {toc.map((item, i) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="block text-sm text-muted-foreground hover:text-primary py-1.5 px-3 -mx-3 rounded-lg hover:bg-primary/5 transition-colors"
                          >
                            <span className="text-xs text-muted-foreground/70 mr-2 tabular-nums">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/15">
                      <ShieldCheck className="w-5 h-5 text-primary mb-2" />
                      <p className="text-xs text-foreground font-semibold mb-1">
                        Need clarification?
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Our compliance team is happy to help.
                      </p>
                      <Link
                        href="/contact"
                        className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1"
                      >
                        Contact us <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </aside>
              )}

              <article className="min-w-0 max-w-3xl">
                {children}

                <div className="mt-12 rounded-2xl border border-border bg-card overflow-hidden">
                  <div className="p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-transparent">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Have questions about this document?
                    </h3>
                    <p className="text-muted-foreground text-sm mb-5">
                      Reach our team — we&apos;ll route you to the right specialist.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <a
                        href="mailto:legal@exx9.com"
                        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border hover:border-primary/30 hover:shadow-sm transition-all"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-sm font-medium text-foreground truncate">
                            legal@exx9.com
                          </p>
                        </div>
                      </a>
                      <a
                        href="https://wa.me/19082280305"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border hover:border-primary/30 hover:shadow-sm transition-all"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">WhatsApp</p>
                          <p className="text-sm font-medium text-foreground truncate">
                            +1 908 228 0305
                          </p>
                        </div>
                      </a>
                      <Link
                        href="/support"
                        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-border hover:border-primary/30 hover:shadow-sm transition-all"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">Help center</p>
                          <p className="text-sm font-medium text-foreground truncate">
                            Browse FAQs
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Risk warning strip */}
        <section className="py-6 bg-foreground border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-white/60 text-xs text-center leading-relaxed">
              <strong className="text-yellow-400">Risk Warning:</strong> CFDs are
              complex instruments and come with a high risk of losing money
              rapidly due to leverage. Between 74&ndash;89% of retail investor
              accounts lose money when trading CFDs. Consider whether you
              understand how CFDs work and whether you can afford the high risk
              of losing your money.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export function LegalSection({ id, num, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 mb-10">
      <div className="flex items-baseline gap-3 mb-4">
        {num != null && (
          <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-md bg-primary/10 text-primary text-xs font-semibold tabular-nums">
            {String(num).padStart(2, '0')}
          </span>
        )}
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
        {children}
      </div>
    </section>
  )
}

export function LegalCallout({ tone = 'info', title, children }) {
  const tones = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    danger: 'bg-red-50 border-red-200 text-red-900',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  }
  return (
    <div className={`rounded-xl border p-5 my-6 ${tones[tone]}`}>
      {title && <p className="font-semibold mb-1.5">{title}</p>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export function LegalList({ items }) {
  return (
    <ul className="space-y-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
