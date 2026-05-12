'use client'

import { Cookie } from 'lucide-react'
import {
  LegalShell,
  LegalSection,
  LegalCallout,
  LegalList,
} from '../_components/LegalShell'

const toc = [
  { id: 'overview', title: 'Overview' },
  { id: 'what', title: 'What are cookies?' },
  { id: 'categories', title: 'Categories we use' },
  { id: 'table', title: 'Cookies in detail' },
  { id: 'third-party', title: 'Third-party cookies' },
  { id: 'manage', title: 'Managing your preferences' },
  { id: 'donottrack', title: 'Do Not Track' },
  { id: 'changes', title: 'Changes to this policy' },
  { id: 'contact', title: 'Contact us' },
]

const cookieTable = [
  {
    name: 'exx9_session',
    purpose: 'Maintains your signed-in session and keeps the platform secure.',
    type: 'Essential',
    duration: 'Session',
  },
  {
    name: 'exx9_csrf',
    purpose: 'Protects against cross-site request forgery attacks.',
    type: 'Essential',
    duration: '24 hours',
  },
  {
    name: 'exx9_theme',
    purpose: 'Remembers your chosen light/dark mode and chart preferences.',
    type: 'Preferences',
    duration: '1 year',
  },
  {
    name: 'exx9_locale',
    purpose: 'Stores your selected language and region.',
    type: 'Preferences',
    duration: '1 year',
  },
  {
    name: '_ga / _ga_*',
    purpose: 'Google Analytics — measures aggregate platform usage.',
    type: 'Analytics',
    duration: '2 years',
  },
  {
    name: '_fbp',
    purpose: 'Meta Pixel — measures advertising campaign performance.',
    type: 'Marketing',
    duration: '90 days',
  },
  {
    name: 'intercom-*',
    purpose: 'Powers our in-app support chat and help-center widgets.',
    type: 'Functional',
    duration: '9 months',
  },
]

const typeStyles = {
  Essential: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Preferences: 'bg-blue-100 text-blue-800 border-blue-200',
  Analytics: 'bg-purple-100 text-purple-800 border-purple-200',
  Marketing: 'bg-amber-100 text-amber-800 border-amber-200',
  Functional: 'bg-slate-100 text-slate-800 border-slate-200',
}

export default function CookiePolicyPage() {
  return (
    <LegalShell
      title="Cookie Policy"
      description="How exx9 uses cookies, pixels, and similar technologies on our website and trading platforms, and the choices you have."
      updatedAt="March 12, 2026"
      effectiveAt="March 15, 2026"
      version="v1.2"
      icon={Cookie}
      toc={toc}
    >
      <LegalSection id="overview" num={1} title="Overview">
        <p>
          This Cookie Policy explains how exx9 uses cookies and similar
          technologies (collectively, &ldquo;cookies&rdquo;) when you visit
          our website, log into the trading platform, or interact with our
          mobile apps. It supplements our{' '}
          <a
            href="/legal/privacy-policy"
            className="text-primary font-medium hover:underline"
          >
            Privacy Policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="what" num={2} title="What are cookies?">
        <p>
          Cookies are small text files stored on your device when you visit a
          website. They allow the site to remember your actions and
          preferences over time. We also use related technologies including{' '}
          <strong className="text-foreground">localStorage</strong>,{' '}
          <strong className="text-foreground">sessionStorage</strong>,
          tracking pixels, and SDK identifiers in our mobile apps. The same
          principles in this Policy apply to all of them.
        </p>
      </LegalSection>

      <LegalSection id="categories" num={3} title="Categories we use">
        <p>We group cookies into the following categories:</p>
        <LegalList
          items={[
            <><strong className="text-foreground">Essential</strong> &mdash; required to operate the platform, sign you in, and keep your session secure. These cannot be switched off.</>,
            <><strong className="text-foreground">Preferences</strong> &mdash; remember your settings (theme, language, chart layout) for a better experience.</>,
            <><strong className="text-foreground">Analytics</strong> &mdash; help us understand aggregate usage so we can improve features and performance.</>,
            <><strong className="text-foreground">Marketing</strong> &mdash; measure the effectiveness of our advertising and personalise the offers you see off-platform.</>,
            <><strong className="text-foreground">Functional</strong> &mdash; power third-party features such as live chat support.</>,
          ]}
        />
      </LegalSection>

      <LegalSection id="table" num={4} title="Cookies in detail">
        <p>The principal cookies we set are:</p>
        <div className="not-prose -mx-2 sm:mx-0 overflow-x-auto rounded-xl border border-border bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 text-left">
                <th className="px-4 py-3 font-semibold text-foreground">
                  Cookie
                </th>
                <th className="px-4 py-3 font-semibold text-foreground">
                  Purpose
                </th>
                <th className="px-4 py-3 font-semibold text-foreground">
                  Type
                </th>
                <th className="px-4 py-3 font-semibold text-foreground">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {cookieTable.map((row) => (
                <tr key={row.name} className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs text-foreground whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.purpose}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${typeStyles[row.type]}`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {row.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          The list above shows the most common cookies. Specific cookies in
          use may change as we evolve the platform.
        </p>
      </LegalSection>

      <LegalSection id="third-party" num={5} title="Third-party cookies">
        <p>
          Some cookies are set by trusted third parties acting on our behalf
          &mdash; for example Google Analytics, Meta Pixel, Intercom, and
          Cloudflare. These providers may use the data to combine with
          information they hold about you elsewhere. Where required, we
          obtain your consent before such cookies are set.
        </p>
      </LegalSection>

      <LegalSection
        id="manage"
        num={6}
        title="Managing your preferences"
      >
        <p>You have several ways to control cookies:</p>
        <LegalList
          items={[
            'Use the cookie banner on first visit to accept, reject, or customise non-essential cookies.',
            'Re-open your preferences any time from the cookie-settings link in the footer.',
            'Configure your browser to block or delete cookies (see your browser help pages).',
            'Use private/incognito browsing mode to limit persistent cookies.',
          ]}
        />
        <LegalCallout tone="info" title="Heads up">
          Blocking essential cookies will prevent you from logging into your
          account or trading. Disabling analytics or marketing cookies will
          not stop you from using the platform.
        </LegalCallout>
      </LegalSection>

      <LegalSection id="donottrack" num={7} title="Do Not Track">
        <p>
          Some browsers offer a &ldquo;Do Not Track&rdquo; (DNT) signal.
          Because there is no consistent industry standard for how DNT
          should be interpreted, our platform does not currently respond to
          DNT signals. You can still control cookies via the methods listed
          above.
        </p>
      </LegalSection>

      <LegalSection id="changes" num={8} title="Changes to this policy">
        <p>
          We may update this Cookie Policy to reflect changes in technology,
          regulation, or our cookie usage. The &ldquo;Last updated&rdquo;
          date at the top of this page indicates when revisions take effect.
          Material changes will be highlighted via the cookie banner so you
          can review and update your consent.
        </p>
      </LegalSection>

      <LegalSection id="contact" num={9} title="Contact us">
        <p>
          Questions about this Cookie Policy? Reach our privacy team at{' '}
          <a
            href="mailto:privacy@exx9.com"
            className="text-primary font-medium hover:underline"
          >
            privacy@exx9.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalShell>
  )
}
