'use client'

import { Scale } from 'lucide-react'
import {
  LegalShell,
  LegalSection,
  LegalCallout,
  LegalList,
} from '../_components/LegalShell'

const toc = [
  { id: 'acceptance', title: 'Acceptance of terms' },
  { id: 'eligibility', title: 'Eligibility' },
  { id: 'account', title: 'Your account' },
  { id: 'services', title: 'Description of services' },
  { id: 'orders', title: 'Orders & execution' },
  { id: 'fees', title: 'Fees, spreads & swaps' },
  { id: 'algo-api', title: 'Algo trading & API use' },
  { id: 'copy-trading', title: 'Copy & social trading' },
  { id: 'prohibited', title: 'Prohibited conduct' },
  { id: 'ip', title: 'Intellectual property' },
  { id: 'disclaimer', title: 'Disclaimer & liability' },
  { id: 'termination', title: 'Suspension & termination' },
  { id: 'law', title: 'Governing law' },
  { id: 'changes', title: 'Changes to terms' },
]

export default function TermsOfUsePage() {
  return (
    <LegalShell
      title="Terms of Use"
      description="The agreement between you and exx9 governing access to our website, trading platforms, mobile apps, and APIs."
      updatedAt="March 12, 2026"
      effectiveAt="March 15, 2026"
      version="v3.0"
      icon={Scale}
      toc={toc}
    >
      <LegalCallout tone="warning" title="Please read carefully">
        These Terms form a legally binding agreement. By opening an account or
        using any part of our Services you confirm that you have read,
        understood, and accepted these Terms and our Privacy Policy and Risk
        Disclosure.
      </LegalCallout>

      <LegalSection id="acceptance" num={1} title="Acceptance of terms">
        <p>
          These Terms of Use (&ldquo;Terms&rdquo;) constitute a binding
          agreement between you (&ldquo;Client&rdquo;, &ldquo;you&rdquo;) and
          exx9 (&ldquo;exx9&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;),
          operating under Investment Dealer Licence No. MAK21098161 in St.
          Lucia, with an administrative office at 3 Fitzroy Place, Glasgow,
          United Kingdom.
        </p>
      </LegalSection>

      <LegalSection id="eligibility" num={2} title="Eligibility">
        <p>To open an exx9 account you must:</p>
        <LegalList
          items={[
            'Be at least 18 years old (or the age of majority in your country).',
            'Have the legal capacity to enter into binding contracts.',
            'Not reside in a Restricted Country listed in our Restricted Countries policy.',
            'Provide accurate KYC information and pass identity, sanctions, and PEP screening.',
          ]}
        />
      </LegalSection>

      <LegalSection id="account" num={3} title="Your account">
        <p>
          You are responsible for maintaining the confidentiality of your
          login credentials and for all activity that occurs under your
          account. You must enable two-factor authentication where offered.
          Notify us immediately at{' '}
          <a
            href="mailto:support@exx9.com"
            className="text-primary font-medium hover:underline"
          >
            support@exx9.com
          </a>{' '}
          of any unauthorised access.
        </p>
        <p>
          You may not transfer, sell, or share your account. We reserve the
          right to require re-verification or impose trading limits where we
          have reasonable concerns about account security or compliance.
        </p>
      </LegalSection>

      <LegalSection id="services" num={4} title="Description of services">
        <p>exx9 provides:</p>
        <LegalList
          items={[
            'Trading in Contracts-for-Difference (CFDs) on forex, indices, commodities, metals, and select cryptocurrencies.',
            'Web and mobile trading platforms with real-time charting and order management.',
            'A REST and WebSocket Algo Trading API for systematic strategies.',
            'A strategy editor, backtester, and strategy library for retail users.',
            'Copy trading and PAMM/MAM master-account features.',
            'Multi-method deposits and withdrawals (bank transfer, UPI, and supported crypto).',
          ]}
        />
        <p>
          Available products, leverage limits, and features may vary by
          jurisdiction and account type.
        </p>
      </LegalSection>

      <LegalSection id="orders" num={5} title="Orders & execution">
        <p>
          exx9 operates a B-Book execution model, meaning we may act as
          principal counterparty to your trades. Orders are filled at our
          quoted bid/ask spread, which reflects prevailing market prices plus
          our markup. We aim to provide best execution under normal market
          conditions, but during high-volatility events, news releases, or
          low-liquidity periods, slippage, requotes, gaps, and re-pricing may
          occur.
        </p>
        <p>
          Pending orders (limit, stop, stop-limit) and SL/TP instructions are
          triggered server-side. Execution is not guaranteed and may be
          delayed during market stress.
        </p>
      </LegalSection>

      <LegalSection id="fees" num={6} title="Fees, spreads & swaps">
        <p>
          Trading costs are disclosed in your account dashboard and may
          include:
        </p>
        <LegalList
          items={[
            'The bid/ask spread on each instrument.',
            'Commissions on certain account types.',
            'Overnight financing (swap) charges on positions held past the daily rollover.',
            'Deposit and withdrawal fees imposed by payment processors.',
            'Inactivity fees on accounts dormant for extended periods.',
          ]}
        />
        <p>
          We reserve the right to adjust spreads, swaps, leverage, and
          commissions with prior notice posted to the platform.
        </p>
      </LegalSection>

      <LegalSection id="algo-api" num={7} title="Algo trading & API use">
        <p>
          The exx9 Algo API enables programmatic order placement and market
          data streaming. You agree to:
        </p>
        <LegalList
          items={[
            'Keep your API keys secret and rotate them if exposed.',
            'Respect published rate limits and not abuse the streaming WebSocket.',
            'Not run strategies designed to manipulate prices, exploit latency arbitrage against our pricing, or interfere with platform stability.',
            'Be solely responsible for the behaviour of any automated strategy you deploy, including any losses it causes.',
          ]}
        />
      </LegalSection>

      <LegalSection id="copy-trading" num={8} title="Copy & social trading">
        <p>
          When you follow a signal provider or invest in a PAMM/MAM master
          account, you authorise us to mirror trades automatically into your
          account at the same instruments, sides, and proportional sizing.
          Past performance is not indicative of future results &mdash; signal
          providers and master traders are not guaranteed to be profitable.
          You may unsubscribe at any time, but trades already opened will
          remain in your account until you close them.
        </p>
      </LegalSection>

      <LegalSection id="prohibited" num={9} title="Prohibited conduct">
        <p>You agree not to:</p>
        <LegalList
          items={[
            'Use the Services for money laundering, terrorist financing, or any unlawful purpose.',
            'Misrepresent your identity, source of funds, or jurisdiction of residence.',
            'Engage in market manipulation, spoofing, layering, or quote stuffing.',
            'Exploit pricing errors, latency, or system bugs in bad faith.',
            'Scrape, reverse-engineer, decompile, or attempt to extract our source code or data feeds.',
            'Interfere with the security or integrity of our platform.',
          ]}
        />
        <p>
          Trades resulting from prohibited conduct may be voided and the
          account terminated.
        </p>
      </LegalSection>

      <LegalSection id="ip" num={10} title="Intellectual property">
        <p>
          The exx9 platform, name, logos, charts, indicators, strategy editor,
          backtester, and all related software and content are the property
          of exx9 or our licensors and protected by intellectual-property
          laws. You receive a limited, non-exclusive, non-transferable licence
          to use the Services for personal trading; no other rights are
          granted.
        </p>
      </LegalSection>

      <LegalSection id="disclaimer" num={11} title="Disclaimer & liability">
        <p>
          The Services are provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis. exx9 makes no warranty that the platform
          will be uninterrupted, error-free, or free of third-party
          interference. Information on the platform is for general purposes
          and does not constitute investment advice.
        </p>
        <p>
          To the maximum extent permitted by law, exx9 is not liable for any
          indirect, incidental, special, or consequential losses, including
          loss of profits, arising from your use of the Services. Our
          aggregate liability for any direct loss is capped at the fees paid
          by you to exx9 in the 12 months preceding the event.
        </p>
      </LegalSection>

      <LegalSection
        id="termination"
        num={12}
        title="Suspension & termination"
      >
        <p>
          We may suspend or terminate your account at any time, with or
          without prior notice, if you breach these Terms, fail KYC, are
          flagged in sanctions screening, or pose a risk to other clients or
          the platform. You may close your account at any time after settling
          open positions and outstanding balances.
        </p>
      </LegalSection>

      <LegalSection id="law" num={13} title="Governing law">
        <p>
          These Terms are governed by the laws of St. Lucia, without regard
          to its conflict-of-laws principles. Disputes will be resolved by
          binding arbitration administered in St. Lucia, except where
          mandatory local consumer-protection laws give you the right to
          litigate in your country of residence.
        </p>
      </LegalSection>

      <LegalSection id="changes" num={14} title="Changes to terms">
        <p>
          We may revise these Terms from time to time. The latest version
          will always be available on this page with an updated revision
          date. Material changes will be announced via email or in-platform
          notice at least 14 days in advance. Continued use of the Services
          after the effective date constitutes acceptance of the revised
          Terms.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
