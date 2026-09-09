import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const SUMMARY = `This guide is about registering and opening your own virtual card,
not receiving a one-time card number from someone else.

Known points from the source material:
1. The card-opening step has no separate opening fee
2. The first funding requirement is 10 USDT-equivalent units
3. The card may support Alipay payments
4. Self-managed cards are usually easier to maintain for recurring verification
5. Check current platform rules before sending funds or using the card`

const PREPARE = `Before starting:
1. A network environment that can reach the registration site
2. An email address you can access
3. A phone suitable for registration and verification
4. Around 10 USDT-equivalent units available
5. A confirmed method for on-chain transfer or top-up
6. A target subscription or service to test`

const FLOW = `1. Open the registration page and wait for it to load completely
2. Register and complete identity or profile checks if requested
3. Open the card page
4. Fund at least the required amount
5. Submit the card request
6. Record card number, expiry, CVV, and billing information securely
7. Bind it to the target service
8. Start with a small verification payment`

const RISKS = `- Page fields and order may change; follow the live page
- Some merchants validate billing address
- A merchant may place a small authorisation hold
- Sending funds on the wrong network can be irreversible
- One-time cards may fail later when a merchant asks for re-verification
- Do not use a virtual card for high-frequency or high-value payments without understanding the provider rules`

export default function UsVirtualCardGuidePageEn() {
  return (
    <DocPage
      path="/docs/guides/us-virtual-card-guide"
      title="Self-Service US Virtual Card Guide"
      description="A practical, risk-aware guide to registering, funding, opening, and maintaining a virtual card for eligible international subscriptions and services."
      headings={[
        { id: 'what', text: 'What this guide solves', level: 2 },
        { id: 'why-self', text: 'Why self-service can be preferable', level: 2 },
        { id: 'prepare', text: 'What to prepare', level: 2 },
        { id: 'open', text: 'Recommended sequence', level: 2 },
        { id: 'topup', text: 'How to think about the initial funding', level: 2 },
        { id: 'bind', text: 'Using the card', level: 2 },
        { id: 'ai', text: 'AI subscription scenarios', level: 2 },
        { id: 'avoid', text: 'Risks and failure points', level: 2 },
        { id: 'faq', text: 'FAQ', level: 2 },
      ]}
    >
      <Callout tone="warn" title="Verify the provider and live rules before sending funds">
        <p>
          This is an informational translation of the source guide, not a guarantee of approval, card
          availability, merchant acceptance, exchange rate, fee, or refund outcome. Never send funds until
          the current provider page, network, address, and terms are verified.
        </p>
      </Callout>

      <h2 id="what">What this guide solves</h2>
      <p>
        A self-managed card can be easier to maintain than a one-time card number when a service later asks
        for a retry, plan change, renewal, or payment-method verification. It also means you own the account,
        funding, and future maintenance responsibilities.
      </p>
      <CodeBlock lang="text" filename="quick-summary" code={SUMMARY} />

      <h2 id="why-self">Why self-service can be preferable</h2>
      <ul>
        <li>You control future top-ups, renewals, and re-binding.</li>
        <li>You retain access to the account when a merchant requests another check.</li>
        <li>A maintained card is more suitable for recurring subscriptions than a disposable number.</li>
        <li>You do not need to find a new card source for every service.</li>
      </ul>

      <h2 id="prepare">What to prepare</h2>
      <CodeBlock lang="text" filename="prepare-checklist" code={PREPARE} />
      <p>
        If you do not want to handle email registration, funding networks, addresses, and verification prompts,
        a self-service flow may not be suitable.
      </p>

      <h2 id="open">Recommended sequence</h2>
      <CodeBlock lang="text" filename="open-flow" code={FLOW} />
      <p>
        Record the billing information exactly as provided by the card platform. Start with a small legitimate
        payment and do not repeatedly retry a declined transaction without checking balance, address, network,
        merchant restrictions, and risk controls.
      </p>

      <h2 id="topup">How to think about the initial funding</h2>
      <p>
        “No opening fee” does not mean “no funds required”. The initial 10-unit requirement may become available
        account or card balance, but the exact treatment, withdrawal rules, fees, and expiry are provider-specific.
        Treat current terms as authoritative.
      </p>
      <Callout tone="warn" title="Confirm the network before a transfer">
        <p>
          If a third-party top-up service is used, confirm the supported network, destination address, memo rules,
          arrival time, refund policy, and dispute path before transferring. A wrong-network transfer may be irreversible.
        </p>
      </Callout>

      <h2 id="bind">Using the card</h2>
      <ul>
        <li>Keep card number, expiry, CVV, billing name, and address consistent with the provider record.</li>
        <li>A small authorisation hold may be a merchant verification rather than a final charge.</li>
        <li>After a decline, check balance, address, network, IP risk, and merchant policy before retrying.</li>
        <li>Follow the provider and merchant terms; do not use the card to evade regional or account controls.</li>
      </ul>

      <h2 id="ai">AI subscription scenarios</h2>
      <p>
        Potential use cases include eligible ChatGPT, Claude, Gemini, SaaS, app-store, and other recurring
        international subscriptions. Acceptance depends on the target service&apos;s current risk policy, billing
        address requirements, network, account type, and payment verification. The card alone does not guarantee success.
      </p>

      <h2 id="avoid">Risks and failure points</h2>
      <CodeBlock lang="text" filename="warning-notes" code={RISKS} />
      <ul>
        <li>Do not confuse self-registration with receiving a ready-made card number.</li>
        <li>Do not confuse no opening fee with zero capital requirement.</li>
        <li>Do not publish card details, recovery material, or provider credentials.</li>
        <li>Do not assume a card accepted today will be accepted by every merchant tomorrow.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <h3>Can I subscribe to ChatGPT or Claude?</h3>
      <p>Possibly, if the provider and merchant permit it. Success depends on current billing, risk, address, and verification rules.</p>
      <h3>Can the initial balance be withdrawn?</h3>
      <p>Only the provider&apos;s current balance and withdrawal rules can answer this. The source material does not establish a universal rule.</p>
      <h3>Is this financial advice?</h3>
      <p>No. Verify the provider, understand digital-asset and payment risks, and use only funds you can afford to lose.</p>
    </DocPage>
  )
}
