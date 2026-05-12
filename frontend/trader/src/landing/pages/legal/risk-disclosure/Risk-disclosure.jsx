'use client'

import { AlertTriangle } from 'lucide-react'
import {
  LegalShell,
  LegalSection,
  LegalCallout,
  LegalList,
} from '../_components/LegalShell'

const toc = [
  { id: 'summary', title: 'Summary' },
  { id: 'high-risk', title: 'High-risk investment' },
  { id: 'leverage', title: 'Leverage & margin' },
  { id: 'market', title: 'Market & volatility risk' },
  { id: 'liquidity', title: 'Liquidity & slippage' },
  { id: 'gap', title: 'Gap & weekend risk' },
  { id: 'counterparty', title: 'Counterparty (B-Book) risk' },
  { id: 'technology', title: 'Technology & connectivity' },
  { id: 'algo', title: 'Algo & automated trading' },
  { id: 'copy', title: 'Copy trading & PAMM' },
  { id: 'crypto', title: 'Cryptocurrency risk' },
  { id: 'fx', title: 'Currency conversion' },
  { id: 'tax', title: 'Tax responsibility' },
  { id: 'no-advice', title: 'No investment advice' },
  { id: 'acknowledge', title: 'Your acknowledgement' },
]

export default function RiskDisclosurePage() {
  return (
    <LegalShell
      title="Risk Disclosure"
      description="Trading leveraged products is high-risk. Read this notice carefully before you fund your account or place a trade."
      updatedAt="March 12, 2026"
      effectiveAt="March 15, 2026"
      version="v2.0"
      icon={AlertTriangle}
      toc={toc}
    >
      <LegalCallout tone="danger" title="High-risk warning">
        CFDs are complex financial instruments and come with a high risk of
        losing money rapidly due to leverage. Industry data indicates that
        between <strong>74% and 89%</strong> of retail investor accounts lose
        money when trading CFDs. You should consider whether you understand
        how CFDs work and whether you can afford to take the high risk of
        losing your money.
      </LegalCallout>

      <LegalSection id="summary" num={1} title="Summary">
        <p>
          This Risk Disclosure outlines the principal risks associated with
          trading the products available on the exx9 platform &mdash;
          including foreign-exchange (FX) pairs, indices, commodities,
          metals, and cryptocurrency CFDs. It is not exhaustive. Before
          trading you should ensure you fully understand the instruments,
          the leverage applied, and the impact of fees, swaps, and
          financing costs.
        </p>
      </LegalSection>

      <LegalSection id="high-risk" num={2} title="High-risk investment">
        <p>
          CFDs are leveraged derivative products. You can lose <strong>more</strong>
          {' '}than your initial margin deposit on a per-trade basis, and your
          entire account balance over time. Trading is not suitable for
          everyone. If in doubt, seek independent financial advice.
        </p>
      </LegalSection>

      <LegalSection id="leverage" num={3} title="Leverage & margin">
        <p>
          Leverage allows you to control a position that is significantly
          larger than your deposited margin. While leverage magnifies
          potential gains, it equally magnifies losses. Small adverse price
          movements can quickly exhaust your free margin and trigger a
          margin call or automatic stop-out.
        </p>
        <LegalCallout tone="warning" title="Stop-out levels">
          exx9 issues a margin call when your margin level falls to{' '}
          <strong>80%</strong> and begins liquidating the largest losing
          position automatically at <strong>50%</strong>. These levels are
          configurable per account type and shown in your platform settings.
        </LegalCallout>
      </LegalSection>

      <LegalSection id="market" num={4} title="Market & volatility risk">
        <p>
          Prices on financial markets can move sharply due to economic
          releases, central-bank decisions, geopolitical events, or
          unexpected news. Volatility can cause rapid losses and wider
          spreads. There is no guarantee of price stability at any time.
        </p>
      </LegalSection>

      <LegalSection id="liquidity" num={5} title="Liquidity & slippage">
        <p>
          Liquidity can deteriorate around major news events, market opens
          and closes, and weekends. In such conditions your orders may be
          filled at a worse price than requested (slippage), or in extreme
          cases not at all. Stop-loss orders are not guaranteed and may be
          executed at the next available price after the trigger.
        </p>
      </LegalSection>

      <LegalSection id="gap" num={6} title="Gap & weekend risk">
        <p>
          Markets close on weekends and selected holidays. Prices may open
          significantly higher or lower than the prior close (price gaps),
          and pending orders may execute at the post-gap price. Positions
          held over rollover periods are subject to swap charges.
        </p>
      </LegalSection>

      <LegalSection
        id="counterparty"
        num={7}
        title="Counterparty (B-Book) risk"
      >
        <p>
          exx9 operates a B-Book execution model, which means we may act as
          the direct counterparty to your trades rather than passing them to
          an external venue. While this allows tighter spreads and faster
          execution, it introduces counterparty risk: in the unlikely event
          of exx9&rsquo;s insolvency, recovery of your funds may depend on
          local insolvency law and any client-money segregation in force at
          the time.
        </p>
      </LegalSection>

      <LegalSection
        id="technology"
        num={8}
        title="Technology & connectivity"
      >
        <p>
          Trading depends on the internet, your device, and our platform
          infrastructure. We do not guarantee uninterrupted access. Hardware
          failure, network outages, mobile signal loss, or platform
          maintenance windows may prevent you from opening, modifying, or
          closing a position. Where possible, set protective stop-loss
          orders that execute server-side rather than relying on manual
          intervention.
        </p>
      </LegalSection>

      <LegalSection id="algo" num={9} title="Algo & automated trading">
        <p>
          Strategies built in our editor or deployed through the Algo API
          execute autonomously. They may behave unexpectedly under market
          conditions different from those used in backtesting. Backtest
          results are hypothetical and do not represent live trading. You
          remain fully responsible for the outcome of any automated
          strategy, including losses, fees, and any margin obligations it
          generates.
        </p>
      </LegalSection>

      <LegalSection id="copy" num={10} title="Copy trading & PAMM">
        <p>
          Copying a signal provider or investing in a PAMM/MAM master
          account exposes you to the trading decisions of a third party.
          Their past performance is not a reliable indicator of future
          results. Returns can be highly volatile, and you may lose part or
          all of your invested capital. Subscription, performance, and
          management fees apply where disclosed.
        </p>
      </LegalSection>

      <LegalSection id="crypto" num={11} title="Cryptocurrency risk">
        <p>
          Cryptocurrency CFDs reference an underlying digital-asset market
          that is largely unregulated, fragmented, and subject to extreme
          volatility, manipulation, and exchange outages. Prices may move
          24/7 even when the exx9 platform is closed for that instrument.
          Crypto deposits and withdrawals are subject to network confirmation
          times and on-chain risks.
        </p>
      </LegalSection>

      <LegalSection id="fx" num={12} title="Currency conversion">
        <p>
          If your account currency differs from the quote currency of an
          instrument you trade, your profit or loss is converted at our
          prevailing FX rate, which may include a markup. Exchange-rate
          movements alone can produce gains or losses on your account
          equity.
        </p>
      </LegalSection>

      <LegalSection id="tax" num={13} title="Tax responsibility">
        <p>
          You are solely responsible for reporting and paying any tax,
          duty, or levy applicable to your trading activity in your
          country of residence. exx9 does not provide tax advice. Consult a
          qualified tax adviser.
        </p>
      </LegalSection>

      <LegalSection id="no-advice" num={14} title="No investment advice">
        <p>
          exx9 does not offer personal investment advice, asset management,
          or portfolio recommendations. Any educational content, market
          commentary, signals, or examples shown on the platform are for
          informational purposes only and must not be relied upon as
          investment advice.
        </p>
      </LegalSection>

      <LegalSection
        id="acknowledge"
        num={15}
        title="Your acknowledgement"
      >
        <p>By opening and funding an exx9 account you acknowledge that:</p>
        <LegalList
          items={[
            'You have read and understood this Risk Disclosure in full.',
            'You are trading with risk capital you can afford to lose.',
            'You are responsible for your own trading decisions.',
            'You will not hold exx9 liable for losses arising from market risk, leverage, or your own trading choices.',
          ]}
        />
      </LegalSection>
    </LegalShell>
  )
}
