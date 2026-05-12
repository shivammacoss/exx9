'use client'

import { Lock } from 'lucide-react'
import {
  LegalShell,
  LegalSection,
  LegalCallout,
  LegalList,
} from '../_components/LegalShell'

const toc = [
  { id: 'overview', title: 'Overview' },
  { id: 'data-we-collect', title: 'Data we collect' },
  { id: 'how-we-use', title: 'How we use your data' },
  { id: 'legal-basis', title: 'Legal basis for processing' },
  { id: 'sharing', title: 'Sharing & disclosure' },
  { id: 'international', title: 'International transfers' },
  { id: 'retention', title: 'Data retention' },
  { id: 'security', title: 'Security' },
  { id: 'your-rights', title: 'Your rights' },
  { id: 'children', title: "Children's privacy" },
  { id: 'changes', title: 'Changes to this policy' },
  { id: 'contact', title: 'Contact us' },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      description="How exx9 collects, uses, stores, and protects your personal information when you use our trading platform, mobile apps, and APIs."
      updatedAt="March 12, 2026"
      effectiveAt="March 15, 2026"
      version="v2.1"
      icon={Lock}
      toc={toc}
    >
      <LegalSection id="overview" num={1} title="Overview">
        <p>
          This Privacy Policy describes how exx9 (&ldquo;exx9&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects,
          processes, and safeguards the personal information of clients,
          prospects, and visitors of our website, trading platforms, mobile
          apps, and APIs (collectively, the &ldquo;Services&rdquo;).
        </p>
        <p>
          exx9 is operated under Investment Dealer Licence No. MAK21098161
          (St. Lucia), with administrative offices in Glasgow, United Kingdom.
          By using our Services you agree to the practices described in this
          Policy.
        </p>
      </LegalSection>

      <LegalSection id="data-we-collect" num={2} title="Data we collect">
        <p>We collect the following categories of personal information:</p>
        <LegalList
          items={[
            <><strong className="text-foreground">Identity data</strong> &mdash; full name, date of birth, nationality, government-issued ID, and selfie verification, collected for Know-Your-Customer (KYC) and Anti-Money-Laundering (AML) compliance.</>,
            <><strong className="text-foreground">Contact data</strong> &mdash; email, phone number, residential address.</>,
            <><strong className="text-foreground">Financial data</strong> &mdash; bank account details, UPI handles, crypto wallet addresses, transaction history, account balances, and source-of-funds declarations.</>,
            <><strong className="text-foreground">Trading data</strong> &mdash; open and historical positions, orders, strategy code submitted to our algo builder, copy-trading subscriptions, and PAMM/MAM allocations.</>,
            <><strong className="text-foreground">Technical data</strong> &mdash; IP address, device identifiers, browser type, operating system, time zone, and access timestamps.</>,
            <><strong className="text-foreground">Usage data</strong> &mdash; pages visited, features used, chart interactions, and aggregate platform telemetry used to improve the product.</>,
          ]}
        />
      </LegalSection>

      <LegalSection id="how-we-use" num={3} title="How we use your data">
        <p>
          We use your personal information for the following purposes:
        </p>
        <LegalList
          items={[
            'Opening, operating, and maintaining your trading account.',
            'Verifying your identity and conducting ongoing KYC / AML / sanctions screening.',
            'Executing your trades, processing deposits and withdrawals, and reconciling balances.',
            'Calculating margin, swap charges, and triggering margin calls or stop-outs where applicable.',
            'Providing customer support, fraud monitoring, and dispute resolution.',
            'Sending you transactional notifications, statements, and (with your consent) marketing communications.',
            'Improving our platform, building new features, and conducting analytics.',
            'Complying with our legal, regulatory, and tax obligations.',
          ]}
        />
      </LegalSection>

      <LegalSection id="legal-basis" num={4} title="Legal basis for processing">
        <p>
          Where the GDPR or analogous laws apply, we process your data on one
          or more of the following bases:
        </p>
        <LegalList
          items={[
            <><strong className="text-foreground">Contract</strong> &mdash; processing is necessary to provide the Services you have signed up for.</>,
            <><strong className="text-foreground">Legal obligation</strong> &mdash; we are required to retain certain records under financial regulation, AML laws, and tax authorities.</>,
            <><strong className="text-foreground">Legitimate interest</strong> &mdash; fraud prevention, platform security, and improving our product.</>,
            <><strong className="text-foreground">Consent</strong> &mdash; for marketing communications and optional cookies; you may withdraw consent at any time.</>,
          ]}
        />
      </LegalSection>

      <LegalSection id="sharing" num={5} title="Sharing & disclosure">
        <p>We do not sell your personal information. We share data only with:</p>
        <LegalList
          items={[
            'Payment processors and banking partners that handle deposits and withdrawals.',
            'KYC, AML, and identity-verification providers.',
            'Cloud and infrastructure providers that host our platform.',
            'Liquidity, market-data, and analytics vendors that power pricing and reporting.',
            'Regulators, law-enforcement authorities, courts, and tax bodies where legally required.',
            'Professional advisers such as auditors, lawyers, and accountants.',
          ]}
        />
        <p>
          All third parties are bound by written contracts requiring
          confidentiality and adequate data-protection safeguards.
        </p>
      </LegalSection>

      <LegalSection id="international" num={6} title="International transfers">
        <p>
          Your data may be transferred to and processed in jurisdictions
          outside your country of residence, including the United Kingdom,
          European Union, India, and the United States. Where required by law
          we rely on Standard Contractual Clauses or equivalent safeguards to
          protect your information.
        </p>
      </LegalSection>

      <LegalSection id="retention" num={7} title="Data retention">
        <p>
          We retain your personal information for as long as your account is
          active and for a minimum of seven (7) years thereafter, in line with
          financial record-keeping obligations. Trading logs, KYC records, and
          transaction histories may be retained longer where required by law
          or in connection with an ongoing dispute or investigation.
        </p>
      </LegalSection>

      <LegalSection id="security" num={8} title="Security">
        <p>
          We protect your data with technical and organisational measures
          including TLS encryption in transit, encryption at rest, role-based
          access controls, multi-factor authentication, network segmentation,
          continuous monitoring, and routine security reviews. No system is
          perfectly secure &mdash; please use a strong, unique password and
          enable two-factor authentication on your account.
        </p>
        <LegalCallout tone="info" title="Found a vulnerability?">
          Please disclose it responsibly to{' '}
          <a href="mailto:security@exx9.com" className="underline font-medium">
            security@exx9.com
          </a>
          . We acknowledge legitimate reports within 48 hours.
        </LegalCallout>
      </LegalSection>

      <LegalSection id="your-rights" num={9} title="Your rights">
        <p>Subject to applicable law, you have the right to:</p>
        <LegalList
          items={[
            'Access the personal information we hold about you.',
            'Request correction of inaccurate or incomplete data.',
            'Request deletion of your data (subject to our legal retention duties).',
            'Object to or restrict certain processing activities.',
            'Withdraw consent for marketing at any time.',
            'Request a portable copy of your data.',
            'Lodge a complaint with your local data-protection authority.',
          ]}
        />
        <p>
          To exercise any of these rights, contact us at{' '}
          <a
            href="mailto:privacy@exx9.com"
            className="text-primary font-medium hover:underline"
          >
            privacy@exx9.com
          </a>
          . We will respond within 30 days.
        </p>
      </LegalSection>

      <LegalSection id="children" num={10} title="Children's privacy">
        <p>
          Our Services are not directed at children under the age of 18 (or
          the age of majority in your jurisdiction). We do not knowingly
          collect personal information from minors. If you believe a minor has
          provided us with data, please contact us so we can delete it.
        </p>
      </LegalSection>

      <LegalSection id="changes" num={11} title="Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. The
          &ldquo;Last updated&rdquo; date at the top reflects the latest
          revision. Material changes will be communicated through email or an
          in-platform notice at least 14 days before they take effect.
        </p>
      </LegalSection>

      <LegalSection id="contact" num={12} title="Contact us">
        <p>
          For privacy-related queries, contact our Data Protection Officer at{' '}
          <a
            href="mailto:privacy@exx9.com"
            className="text-primary font-medium hover:underline"
          >
            privacy@exx9.com
          </a>{' '}
          or write to: exx9, Office 9364hn, 3 Fitzroy Place, Glasgow City
          Centre, UK, G3 7RH.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
