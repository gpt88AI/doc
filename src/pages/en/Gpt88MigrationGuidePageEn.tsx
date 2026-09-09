import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const FLOW = `1. Open the legacy site and confirm the migration notice
2. Go to https://agent.gpt88.cc
3. Register a new account or sign in with an existing account
4. Check the account, balance and available entry points
5. Open API Keys and the technical docs only when you are ready to integrate`

const CONSOLE = `Signed in
  ├─ Dashboard /dashboard       account status, balance and shortcuts
  ├─ Purchase /purchase         top up or review subscription options
  ├─ API Keys /keys             create a key and choose a group
  ├─ Model Square /model-square compare public models and groups
  ├─ Usage /usage               inspect requests, usage and charges
  └─ Documentation doc.gpt88.cc configure Codex, Claude Code and other tools`

export default function Gpt88MigrationGuidePageEn() {
  return (
    <DocPage
      path="/docs/guides/gpt88-migration"
      title="Migrate from the legacy gpt88.cc site to Agent"
      description="Move from the legacy gpt88.cc entry point to Agent, then complete sign-in, API key creation and your first successful request."
      headings={[
        { id: 'goal', text: 'The short answer', level: 2 },
        { id: 'flow', text: 'Complete the migration in five steps', level: 2 },
        { id: 'account', text: 'Register or sign in on Agent', level: 2 },
        { id: 'console', text: 'Choose the correct console entry', level: 2 },
        { id: 'map', text: 'Remember the new site map', level: 2 },
        { id: 'checklist', text: 'Migration checklist', level: 2 },
        { id: 'pitfalls', text: 'Common mistakes', level: 2 },
        { id: 'next', text: 'What to read next', level: 2 },
      ]}
    >
      <Callout tone="info" title="This guide solves one problem: moving from the legacy site to the current entry point">
        <p>
          The legacy <code>gpt88.cc</code> site directs users to{' '}
          <a href="https://agent.gpt88.cc/home" target="_blank" rel="noreferrer">agent.gpt88.cc</a>.
          Use the new site for your account, balance and product services. Use the documentation site for technical integration.
        </p>
      </Callout>

      <h2 id="goal">The short answer</h2>
      <p>
        Do not treat “the old site still opens” as proof that it is still the right place for every operation.
        The reliable model is: <strong>the legacy site announces the migration, Agent handles accounts and services, and the docs site handles integration.</strong>
      </p>

      <h2 id="flow">Complete the migration in five steps</h2>
      <CodeBlock lang="text" filename="migration-flow" code={FLOW} />
      <p>
        Confirm the site and account first. Only after that should you troubleshoot models, routes, clients or API keys.
      </p>

      <h2 id="account">Register or sign in on Agent</h2>
      <p>
        New users can register at{' '}
        <a href="https://agent.gpt88.cc/register" target="_blank" rel="noreferrer">agent.gpt88.cc/register</a>.
        Existing users can sign in at{' '}
        <a href="https://agent.gpt88.cc/login" target="_blank" rel="noreferrer">agent.gpt88.cc/login</a>.
      </p>
      <ol>
        <li>Confirm the address bar shows <code>agent.gpt88.cc</code>, not a similar-looking domain.</li>
        <li>Use an inbox you can access for verification and password recovery.</li>
        <li>Read the current terms, privacy notice and supported-region information before continuing.</li>
        <li>After sign-in, verify that the account and balance entry points are visible.</li>
        <li>Never paste passwords, verification codes or complete API keys into public documents or screenshots.</li>
      </ol>
      <Callout tone="warn" title="Current notices and supported regions take priority">
        <p>
          Registration, top-ups and generative AI services may depend on the current supported-region rules and account eligibility.
          Check the current Agent announcement and supported-regions page when an entry point is unavailable.
        </p>
      </Callout>

      <h2 id="console">Choose the correct console entry</h2>
      <CodeBlock lang="text" filename="signed-in-console-flow" code={CONSOLE} />
      <h3>Should you top up or create a key first?</h3>
      <ol>
        <li><strong>Learning the interface:</strong> start with Dashboard, Model Square and Pricing.</li>
        <li><strong>Preparing an API call:</strong> confirm available balance, then create a project-named key in API Keys.</li>
        <li><strong>Preparing Codex:</strong> make one short API request before configuring the local client so account, key and local configuration issues remain distinguishable.</li>
      </ol>
      <p>
        Standard API calls use <code>https://api.gpt88.cc</code>. Image and video workloads use <code>https://img.gpt88.cc</code>.
        The website entry point and the programmatic API endpoint are different things.
      </p>

      <h2 id="map">Remember the new site map</h2>
      <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[42rem] text-left text-sm">
          <thead className="bg-white/[0.04] text-ink-400"><tr><th className="px-4 py-3">Entry</th><th className="px-4 py-3">Purpose</th><th className="px-4 py-3">Use it for</th></tr></thead>
          <tbody>
            {[
              ['agent.gpt88.cc', 'Account and product entry', 'registration, sign-in, balance and image workspace'],
              ['agent.gpt88.cc/keys', 'API key management', 'create and manage keys after sign-in'],
              ['agent.gpt88.cc/model-square', 'Public model directory', 'compare groups, multipliers and model coverage'],
              ['agent.gpt88.cc/pricing', 'Public pricing', 'review public offers and budget estimates'],
              ['doc.gpt88.cc', 'Technical documentation', 'quickstart, APIs, SDKs and integrations'],
              ['api.gpt88.cc', 'Standard API', 'OpenAI- and Claude-style API calls'],
              ['img.gpt88.cc', 'Media API', 'long-running image and video workloads'],
            ].map(row => <tr key={row[0]} className="border-t border-white/10"><td className="px-4 py-3">{row[0]}</td><td className="px-4 py-3">{row[1]}</td><td className="px-4 py-3">{row[2]}</td></tr>)}
          </tbody>
        </table>
      </div>

      <h2 id="checklist">Migration checklist</h2>
      <ul>
        <li>Confirm the correct Agent account and email.</li>
        <li>Locate the balance or billing entry point.</li>
        <li>Use Model Square to check the currently visible model groups.</li>
        <li>Use the Quickstart guide for API integration.</li>
        <li>Open the relevant Codex, Claude Code, Cursor or CC Switch integration guide.</li>
      </ul>

      <h2 id="pitfalls">Common mistakes</h2>
      <ul>
        <li>Continuing to perform account or top-up operations on the legacy site after seeing the migration notice.</li>
        <li>Using <code>agent.gpt88.cc</code> as an API Base URL instead of the documented API host.</li>
        <li>Confusing a web-login password with an API key.</li>
        <li>Creating many keys before confirming the account and first request.</li>
        <li>Assuming a public model group guarantees access for every account or key.</li>
      </ul>

      <h2 id="next">What to read next</h2>
      <ol>
        <li><Link to="/docs/auth/">Authentication and billing</Link></li>
        <li><Link to="/docs/guides/complete-integration/">Complete integration guide</Link></li>
        <li><Link to="/docs/guides/config-export/">Configuration export</Link></li>
        <li><Link to="/docs/integrations/dev/codex-cli/">Codex CLI integration</Link></li>
      </ol>
      <Callout tone="tip" title="Minimum definition of done">
        <p>You can sign in on Agent, locate the account and API entry points, and continue the technical setup from the documentation site.</p>
      </Callout>
    </DocPage>
  )
}
