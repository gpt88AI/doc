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
      <p>
        gpt88.cc uses RMB balance and real token usage instead of a multiplier-based points system.
        In practice, that means users track actual token consumption and actual cost directly.
      </p>
      <ul>
        <li>Top-up 1 RMB = 1 RMB in account balance.</li>
        <li>The model deducts real usage based on current pricing.</li>
        <li>Pricing and quota values are read from the console and may change with upstream vendors.</li>
      </ul>
    </DocPage>
  )
}
