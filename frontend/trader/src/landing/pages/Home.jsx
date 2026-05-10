'use client'

import { Navbar } from "@/landing/components/navbar"
import { HeroSection } from "@/landing/components/hero-section"
import { MarketAccessSection } from "@/landing/components/market-access-section"
import { PricingTableSection } from "@/landing/components/pricing-table-section"
import { EconomicCalendarSection } from "@/landing/components/economic-calendar-section"
import { PipCalculatorSection } from "@/landing/components/pip-calculator-section"
import { StepsSection } from "@/landing/components/steps-section"
import { CapitalSection } from "@/landing/components/capital-section"
import { PartnershipSection } from "@/landing/components/partnership-section"
import { FeaturesSection } from "@/landing/components/features-section"
import { SocialTradingSection } from "@/landing/components/social-trading-section"
import { AwardsSection } from "@/landing/components/awards-section"
import { SupportSection } from "@/landing/components/support-section"
import { MobileAppSection } from "@/landing/components/mobile-app-section"
import { Footer } from "@/landing/components/footer"
import { WaveSeparator } from "@/landing/components/wave-separator"

/**
 * Home — full landing page.
 *
 * Each section is bridged by a wave separator. Variants alternate so the
 * page has visual rhythm without ever feeling flat — `tide` (animated) for
 * marquee transitions, `dual` for depth, `curve` for subtle joins.
 */
export default function Home() {
  return (
    <main className="exx9-landing-page min-h-screen">
      <Navbar />

      <HeroSection />
      <WaveSeparator variant="tide" color="brand" height={120} />

      <MarketAccessSection />
      <WaveSeparator variant="dual" color="mint" height={90} />

      <PricingTableSection />
      <WaveSeparator variant="curve" color="brand" height={100} direction="up" />

      <EconomicCalendarSection />
      <WaveSeparator variant="sharp" color="mint" height={80} />

      <PipCalculatorSection />
      <WaveSeparator variant="tide" color="brand" height={110} />

      <StepsSection />
      <WaveSeparator variant="dual" color="mint" height={90} direction="up" />

      <CapitalSection />
      <WaveSeparator variant="curve" color="brand" height={100} />

      <PartnershipSection />
      <WaveSeparator variant="split" color="brand" height={140} />

      <FeaturesSection />
      <WaveSeparator variant="tide" color="mint" height={110} />

      <SocialTradingSection />
      <WaveSeparator variant="dual" color="brand" height={100} direction="up" />

      <AwardsSection />
      <WaveSeparator variant="sharp" color="mint" height={80} />

      <SupportSection />
      <WaveSeparator variant="curve" color="brand" height={110} />

      <MobileAppSection />
      <WaveSeparator variant="tide" color="dark" height={120} />

      <Footer />
    </main>
  )
}
