import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const KEY_ENV = `# macOS / Linux
export GPT88_API_KEY="the full key copied when it was created"

# Windows PowerShell
$env:GPT88_API_KEY="the full key copied when it was created"`

export default function ApiKeyManagementGuidePageEn() {
  const doc = (path: string) => localizePath(path, 'en')
  return (
    <DocPage
      path="/docs/guides/api-key-management"
      title="Create and Manage GPT88 API Keys"
      description="Create, store, verify, and rotate GPT88 API keys, then confirm one request in usage records."
      headings={[
        { id: 'scope', text: 'Know the three entry points', level: 2 },
        { id: 'create', text: 'Create a traceable key', level: 2 },
        { id: 'store', text: 'Store and configure it safely', level: 2 },
        { id: 'verify', text: 'Verify a request', level: 2 },
        { id: 'manage', text: 'Find, revoke, and rotate keys', level: 2 },
        { id: 'troubleshoot', text: 'Troubleshoot common failures', level: 2 },
        { id: 'migration', text: 'Migrate to GPT88', level: 2 },
        { id: 'next', text: 'Related guides', level: 2 },
      ]}
    >
      <Callout tone="info" title="Done when">
        <p>You have created a GPT88 key for one clear purpose, stored it server-side, completed a request, and found that request in GPT88 usage records.</p>
      </Callout>

      <h2 id="scope">Know the three entry points</h2>
      <ul>
        <li><strong>Console:</strong> sign in at <a href="https://agent.gpt88.cc" target="_blank" rel="noreferrer">agent.gpt88.cc</a>.</li>
        <li><strong>Key management:</strong> open <a href="https://agent.gpt88.cc/keys" target="_blank" rel="noreferrer">agent.gpt88.cc/keys</a> after signing in.</li>
        <li><strong>API calls:</strong> use <code>https://api.gpt88.cc</code> as the standard API Base URL. Your console password is not an API key.</li>
      </ul>

      <h2 id="create">Create a traceable key</h2>
      <ol>
        <li>Sign in to the GPT88 console and open API Keys.</li>
        <li>Select Create Key and use a name that identifies its purpose, such as <code>web-prod</code>, <code>codex-dev</code>, or <code>team-reporting</code>. Separate environments and applications so usage can be traced and keys can be revoked independently.</li>
        <li>Review the group, permission, and limit options shown by the current form. Confirm the model's group in the model catalog. Available options and account limits are defined by the live console.</li>
        <li>Copy and store the full key immediately after creation. The list is normally masked and cannot restore the full secret later.</li>
      </ol>
      <Callout tone="warn" title="Keep the full key in a trusted store">
        <p>Do not send it in chats, tickets, screenshots, or email. For support, share the key name or final characters, request time, and Request ID instead.</p>
      </Callout>

      <h2 id="store">Store and configure it safely</h2>
      <p>For local checks, pass the key through an environment variable. In production, use your deployment platform's secret manager.</p>
      <CodeBlock lang="bash" filename="environment" code={KEY_ENV} />
      <ul>
        <li>Read the key on your server. Browser bundles, mobile app packages, and public frontend variables cannot protect a long-lived secret.</li>
        <li>Never commit it to Git. If a key was exposed, revoke it in the console and create a replacement; deleting the file alone does not invalidate the secret.</li>
        <li>Use separate keys for development, test, production, and different applications to limit the impact of a leak or unexpected usage.</li>
      </ul>

      <h2 id="verify">Verify a request</h2>
      <p>Use the GPT88 key and standard API Base URL in your application. Start with a minimal cURL or SDK request from <Link to={doc('/docs/quickstart/')}>Quickstart</Link>, then filter console usage records by time and key name to confirm the model, group, request status, and charge.</p>
      <p>For unavailable models, check the model catalog and your account's available groups. A public listing alone does not prove that a model is enabled for your key.</p>

      <h2 id="manage">Find, revoke, and rotate keys</h2>
      <p>The API Keys list supports searching by name or key and filtering by group and status. Review old test keys periodically. Before revoking an active key, find the services that still use it.</p>
      <ol>
        <li>Create and securely store a replacement key with a clear purpose name.</li>
        <li>Configure it in one service, send a minimal request, and confirm the usage record.</li>
        <li>Update the remaining services and check that each now uses the new key.</li>
        <li>Revoke the old key after it stops receiving requests. Revoke it immediately if it has been exposed.</li>
      </ol>
      <p>For usage investigations, filter by API key, model, group, and time. Give support the time range, key name or final characters, model, and Request ID; never include the full key.</p>

      <h2 id="troubleshoot">Troubleshoot common failures</h2>
      <ul>
        <li><strong><code>401</code> / <code>invalid_api_key</code>:</strong> check that you did not use your console password, that the key is complete, that the current process reads the environment variable, and that the key has not been revoked.</li>
        <li><strong><code>403</code> / permission error:</strong> confirm the model, API, or group is available to the current key and account.</li>
        <li><strong><code>429</code>:</strong> check balance, rate limits, and current account limits. Creating more keys does not bypass account-level limits.</li>
        <li><strong>Terminal works, client fails:</strong> compare the client's Base URL, authentication method, and model field, then confirm that the client actually reads this key.</li>
      </ul>
      <p>Follow the endpoint, authentication header, model, balance, and error-code checks in <Link to={doc('/docs/guides/api-key-first-request-failed/')}>First Request Fails After Creating an API Key</Link>.</p>

      <h2 id="migration">Migrate to GPT88</h2>
      <p>Treat credentials from another platform as credentials for that platform. Do not assume they work with GPT88 or that a website password is an API key. Create a new GPT88 key, then update your client's Base URL, key, and currently available GPT88 model ID.</p>
      <p>Keep the old client configuration available during migration. After the new request succeeds and appears in usage records, revoke the old credential according to its provider's process. For GPT88 account entry points, see the <Link to={doc('/docs/guides/gpt88-migration/')}>GPT88 site migration guide</Link>.</p>

      <h2 id="next">Related guides</h2>
      <ul>
        <li><Link to={doc('/docs/quickstart/')}>Quickstart</Link>: send your first request.</li>
        <li><Link to={doc('/docs/auth/')}>Authentication and billing</Link>: Bearer auth, balance, usage, and group multipliers.</li>
        <li><Link to={doc('/docs/guides/complete-integration/')}>Complete integration guide</Link>: configure SDKs and clients, then review usage.</li>
        <li><Link to={doc('/docs/guides/config-export/')}>Configuration export</Link>: prepare settings for common developer tools.</li>
      </ul>
    </DocPage>
  )
}
