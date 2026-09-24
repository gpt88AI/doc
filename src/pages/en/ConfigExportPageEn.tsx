import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { buildAgentActivationUrl } from '../../lib/activationLinks'

const QUICK_FLOW = `1. Create or select an API key in Agent API Keys
2. Open Configuration export
3. Select the key, model, and Base URL
4. Choose a target tool tab
5. Copy the generated config or import it into CC Switch
6. Send one request from the target tool and verify the response`

const BASE_URL_RULES = `Standard API tools and SDKs
  Base URL: https://api.gpt88.cc
  Use the endpoint path, headers, and body fields required by the API.

Direct image and video APIs
  Base URL: https://img.gpt88.cc
  Follow the image or video API reference for /v1 or /v1beta paths.

All tools
  Do not append a second /v1 manually.`

const CURL_EXAMPLE = `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"gpt-5.6-sol","messages":[{"role":"user","content":"Reply with OK"}],"max_tokens":32}'`

export default function ConfigExportPageEn() {
  const keysUrl = buildAgentActivationUrl({
    locale: 'en',
    surface: 'config_export_entry',
    intent: 'api_access',
    destination: 'keys',
  })

  return (
    <DocPage
      path="/docs/guides/config-export"
      title="Configuration Export"
      description="Package an API key, model, and route into a reusable configuration for Claude Code, Cursor, SDKs, CC Switch, and other tools."
      headings={[
        { id: 'purpose', text: 'What this page does', level: 2 },
        { id: 'flow', text: 'Recommended setup flow', level: 2 },
        { id: 'base-urls', text: 'Base URL rules', level: 2 },
        { id: 'tools', text: 'Supported tool patterns', level: 2 },
        { id: 'security', text: 'Security and troubleshooting', level: 2 },
        { id: 'verify', text: 'Verify the generated configuration', level: 2 },
      ]}
    >
      <Callout tone="info" title="Configuration export is a console workflow">
        <p>
          The page packages the values that tools need to call GPT88: an API key, a model, a compatible route,
          and the target tool format. Exact menu labels and available models follow the current
          <a className="ml-1" href={keysUrl} target="_blank" rel="noreferrer">Agent console</a>.
        </p>
      </Callout>

      <h2 id="purpose">What this page does</h2>
      <p>
        Configuration export turns four choices into a copyable or importable tool configuration:
      </p>
      <ul>
        <li>An enabled API key from Agent API Keys.</li>
        <li>A model that is available to that key and target client.</li>
        <li>The correct Base URL for standard, image, or video traffic.</li>
        <li>The tool format, such as Claude Code, Cursor, Python SDK, cURL, or CC Switch.</li>
      </ul>
      <p>
        Use <Link to="/en/docs/quickstart/">Quickstart</Link> for a single manual request. Use this page when the same
        key, model, and route need to be reused across local tools or a team workflow.
      </p>

      <h2 id="flow">Recommended setup flow</h2>
      <ol>{QUICK_FLOW.split('\n').map(step => <li key={step}>{step.replace(/^\d+\. /, '')}</li>)}</ol>
      <CodeBlock lang="text" filename="recommended-order.txt" code={QUICK_FLOW} />

      <h2 id="base-urls">Base URL rules</h2>
      <CodeBlock lang="text" filename="base-url-rules.txt" code={BASE_URL_RULES} />
      <p>
        Keep the Base URL at the protocol boundary. The SDK or tool should append its resource path. For example,
        a chat client normally uses <code>https://api.gpt88.cc/v1</code>, while direct image and video workflows use
        <code>https://img.gpt88.cc</code> according to their API reference.
      </p>

      <h2 id="tools">Supported tool patterns</h2>
      <ul>
        <li><strong>Claude Code:</strong> use the generated Claude-compatible values and keep the API key in the process environment.</li>
        <li><strong>Cursor:</strong> select an OpenAI-compatible provider, then verify the Base URL and exact model ID.</li>
        <li><strong>Python or Node.js:</strong> export the key and Base URL as server-side environment variables.</li>
        <li><strong>cURL:</strong> use a short request as the fastest connectivity check before enabling tools.</li>
        <li><strong>CC Switch:</strong> use the generated import target when the installed version supports it; otherwise copy the import link manually.</li>
      </ul>

      <h2 id="security">Security and troubleshooting</h2>
      <ul>
        <li>Never commit an exported configuration, screenshot, or full API key to a public repository or chat.</li>
        <li>Store keys in environment variables or a secret manager. Disable and rotate a key immediately if it may have leaked.</li>
        <li><strong>401:</strong> check the Bearer header and confirm that the key is enabled.</li>
        <li><strong>404:</strong> check the host, the single <code>/v1</code> prefix, and the exact model ID.</li>
        <li><strong>429:</strong> inspect usage and reduce concurrency before adding bounded exponential backoff.</li>
        <li><strong>Timeout:</strong> validate DNS, TLS, proxy settings, and the shortest request with cURL first.</li>
      </ul>

      <h2 id="verify">Verify the generated configuration</h2>
      <p>Before enabling a long-running agent workflow, send one minimal request and save the result metadata:</p>
      <CodeBlock lang="bash" filename="verify.sh" code={CURL_EXAMPLE} />
      <p>
        Confirm the HTTP status, returned model, request ID, and the usage record in the console. Only then add long
        context, streaming, tool calls, or automated retries.
      </p>
    </DocPage>
  )
}
