import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'

const HEADER = `Authorization: Bearer $GPT88_API_KEY
Content-Type: application/json
X-Gpt88-User: usr_abc123
Idempotency-Key: 9c4a52a4-2fdd-4b49-9e72-1a7b7b4e3a01`

export default function AuthPageEn() {
  return (
    <DocPage
      path="/docs/auth"
      title="Auth & Billing"
      description="gpt88.cc uses Bearer token authentication. Pricing, rate limits, and quota numbers are managed dynamically in the console."
      headings={[
        { id: 'auth', text: 'Authentication', level: 2 },
        { id: 'headers', text: 'HTTP headers', level: 2 },
        { id: 'security', text: 'Key security', level: 2 },
        { id: 'billing', text: 'Billing model', level: 2 },
      ]}
    >
      <h2 id="auth">Authentication</h2>
      <p>
        All requests use <code>Authorization: Bearer &lt;API_KEY&gt;</code>. Treat the key as a production secret.
      </p>

      <h2 id="headers">HTTP headers</h2>
      <CodeBlock lang="http" code={HEADER} />

      <h2 id="security">Key security</h2>
      <ul>
        <li>Use keys only on the server side.</li>
        <li>Do not commit secrets into source control.</li>
        <li>Rotate keys by creating a new key first, deploying it, then revoking the old one.</li>
      </ul>
      <Callout tone="danger" title="If a key is leaked">
        <p>
          Revoke it immediately in the console, issue a replacement key, and verify logs or repositories for copies.
        </p>
      </Callout>

      <h2 id="billing">Billing model</h2>
      <Callout tone="danger" title="Important: group multipliers determine the deduction">
        <p>
          A multiplier is the RMB amount deducted from your balance for each $1 of official API usage.
          Actual deduction (RMB) = official usage (USD) x the selected group multiplier.
        </p>
        <ul className="list-disc pl-5">
          <li>A 2.0 group multiplier deducts RMB 2.0 for $1 of official usage.</li>
          <li>A 0.5 group multiplier deducts RMB 0.5 for $1 of official usage.</li>
          <li>A lower multiplier means a lower unit cost.</li>
        </ul>
        <p>
          Group multipliers are shown in the group selector on the API Keys page. Groups may use different upstream
          routes and have different stability characteristics, so choose the group that fits your needs.
        </p>
        <p>
          For model and price discovery, browse the{' '}
          <a className="text-cyan-300 hover:text-cyan-200" href="https://agent.gpt88.cc/model-square" target="_blank" rel="noreferrer">Model Square</a>{' '}
          and the{' '}
          <a className="text-cyan-300 hover:text-cyan-200" href="https://gpt88.cc/pricing" target="_blank" rel="noreferrer">website pricing page</a>.
          The currently available models, group multiplier, and final deduction for your account still follow the live console.
        </p>
        <p>Top-ups are 1:1: RMB 1 topped up = 1.00 balance. If the page shows a $ symbol, the actual unit is still RMB.</p>
      </Callout>
      <p>
        gpt88.cc uses RMB balance and official usage multiplied by the selected group multiplier.
        Pricing and group settings are controlled dynamically in the console.
      </p>
      <ul>
        <li>Top-up 1 RMB = 1 RMB in account balance.</li>
        <li>Actual deduction = official usage in USD x the selected group multiplier.</li>
        <li>Lower group multipliers reduce the cost per unit of usage.</li>
        <li>Pricing and quota values are read from the console and may change with upstream vendors.</li>
      </ul>
    </DocPage>
  )
}
