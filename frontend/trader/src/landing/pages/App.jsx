'use client'

import { Navbar } from "@/landing/components/navbar"
import { HeroSection } from "@/landing/components/hero-section"
import { MarketAccessSection } from "@/landing/components/market-access-section"
import { PricingTableSection } from "@/landing/components/pricing-table-section"
import { EconomicCalendarSection } from "@/landing/components/economic-calendar-section"
import { PipCalculatorSection } from "@/landing/components/pip-calculator-section"
import { StepsSection } from "@/landing/components/steps-section"
import { PlatformSection } from "@/landing/components/platform-section"
import { CapitalSection } from "@/landing/components/capital-section"
import { PartnershipSection } from "@/landing/components/partnership-section"
import { FeaturesSection } from "@/landing/components/features-section"
import { SocialTradingSection } from "@/landing/components/social-trading-section"
import { AwardsSection } from "@/landing/components/awards-section"
import { SupportSection } from "@/landing/components/support-section"
import { MobileAppSection } from "@/landing/components/mobile-app-section"
import { Footer } from "@/landing/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MarketAccessSection />
      <PricingTableSection />
      <EconomicCalendarSection />
      <PipCalculatorSection />
      <StepsSection />
      <PlatformSection />
      <CapitalSection />
      <PartnershipSection />
      <FeaturesSection />
      <SocialTradingSection />
      <AwardsSection />
      <SupportSection />
      <MobileAppSection />
      <Footer />
    </main>
  )
}
