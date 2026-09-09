import { Link } from 'react-router-dom'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { DocPage } from '../../components/layout/DocPage'

const MODELS = `curl https://api.gpt88.cc/v1/models \\
  -H "Authorization: Bearer $GPT88_API_KEY"`

const CHAT = `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "kimi-k3",
    "stream": false,
    "messages": [{"role": "user", "content": "Describe Kimi K3 in three sentences."}]
  }'`

const CLAUDE = `export ANTHROPIC_BASE_URL=https://api.gpt88.cc
export ANTHROPIC_API_KEY="$GPT88_API_KEY"
export ANTHROPIC_MODEL=kimi-k3
claude`

const CODEX = `# ~/.codex/config.toml
model = "kimi-k3"
model_provider = "gpt88"

[model_providers.gpt88]
name = "gpt88"
base_url = "https://api.gpt88.cc/v1"
env_key = "GPT88_API_KEY"

# shell
export GPT88_API_KEY="your-gpt88-api-key"
codex --model kimi-k3`

export default function KimiK3GuidePageEn() {
  return (
    <DocPage
      path="/docs/guides/kimi-k3-guide"
      title="Kimi K3 Integration Guide: Base URL, Claude Code, and Codex"
      description="Connect Kimi K3 through GPT88, verify the API, configure Claude Code or Codex CLI, and diagnose endpoint and socket errors."
      headings={[
        { id: 'answer', text: 'Short answer', level: 2 },
        { id: 'prerequisites', text: 'Prerequisites', level: 2 },
        { id: 'verify-api', text: 'Verify the API first', level: 2 },
        { id: 'claude-code', text: 'Claude Code configuration', level: 2 },
        { id: 'codex', text: 'Codex CLI configuration', level: 2 },
        { id: 'choose', text: 'Claude Code or Codex', level: 2 },
        { id: 'troubleshoot', text: 'Troubleshoot connection errors', level: 2 },
        { id: 'checklist', text: 'Acceptance checklist', level: 2 },
      ]}
    >
      <Callout tone="tip" title="Shortest successful path">
        <p>
          First verify the API key and model permission with <code>https://api.gpt88.cc</code>. Use the exact
          model ID <code>kimi-k3</code>. Only after cURL succeeds should you configure Claude Code or Codex.
        </p>
      </Callout>

      <h2 id="answer">Short answer</h2>
      <ul>
        <li>OpenAI-compatible SDKs and cURL use <code>https://api.gpt88.cc</code> with <code>/v1/chat/completions</code>.</li>
        <li>Codex providers typically use <code>https://api.gpt88.cc/v1</code>.</li>
        <li>Claude Code uses the Anthropic-compatible endpoint at <code>https://api.gpt88.cc</code>.</li>
        <li>The model ID is exactly <code>kimi-k3</code>.</li>
      </ul>
      <Callout tone="warn" title="Do not duplicate /v1">
        <p>
          A Base URL and a complete endpoint are different settings. Do not turn them into
          <code>https://api.gpt88.cc/v1/v1/chat/completions</code>.
        </p>
      </Callout>

      <h2 id="prerequisites">Prerequisites</h2>
      <ol>
        <li>Create a GPT88 API key and keep it in an environment variable, never in Git or frontend code.</li>
        <li>Confirm balance or available quota and that the key can access <code>kimi-k3</code>.</li>
        <li>Use a client version that supports a custom OpenAI or Anthropic endpoint.</li>
      </ol>
      <CodeBlock lang="bash" filename="terminal" code="export GPT88_API_KEY=your_gpt88_api_key" />

      <h2 id="verify-api">Verify the API first</h2>
      <CodeBlock lang="bash" filename="list-models" code={MODELS} />
      <CodeBlock lang="bash" filename="chat-completions" code={CHAT} />
      <p>
        Success means a JSON response with content under <code>choices[0].message.content</code>. If this fails,
        record the status code and error body before changing client settings. Check the key, balance, model
        permission, and path first.
      </p>
      <p>
        You can also open the <Link to="/models/kimi-k3/">Kimi K3 model page</Link> or the <Link to="/docs/api/errors/">error reference</Link>.
      </p>

      <h2 id="claude-code">Claude Code configuration</h2>
      <CodeBlock lang="bash" filename="claude-code" code={CLAUDE} />
      <p>
        If the client only accepts the official Claude model list, a custom model ID may be rejected. Upgrade
        the client and confirm custom model support, or use an OpenAI-compatible client to isolate the API first.
      </p>
      <Callout tone="info" title="Claude Code and Codex use different protocols">
        <p>
          Do not copy Codex&apos;s <code>/v1</code> setting mechanically into Claude Code. The clients use different
          paths, headers, and request bodies.
        </p>
      </Callout>

      <h2 id="codex">Codex CLI configuration</h2>
      <CodeBlock lang="toml" filename="~/.codex/config.toml" code={CODEX} />
      <p>
        Configuration key names vary by Codex version, but preserve the three values: model <code>kimi-k3</code>,
        provider URL <code>https://api.gpt88.cc/v1</code>, and the GPT88 API key.
      </p>

      <h2 id="choose">Claude Code or Codex</h2>
      <ul>
        <li><strong>Choose Codex:</strong> repository changes, terminal commands, tests, patches, and long coding tasks.</li>
        <li><strong>Choose Claude Code:</strong> an existing Claude workflow with custom model and Anthropic endpoint support.</li>
        <li><strong>Only testing K3:</strong> start with cURL, the Python OpenAI SDK, or ChatBox.</li>
      </ul>

      <h2 id="troubleshoot">Troubleshoot connection errors</h2>
      <ol>
        <li>Run the same <code>/v1/models</code> and <code>/v1/chat/completions</code> requests with the same key.</li>
        <li>Use exactly <code>kimi-k3</code>, not a display name or an arbitrary <code>openai/</code> prefix.</li>
        <li>Check whether the client expects a Base URL or a complete endpoint and avoid duplicate <code>/v1</code>.</li>
        <li>Remove extra spaces, quotes, and newlines from the key; check balance and HTTPS proxy settings.</li>
        <li>If cURL succeeds but the client fails, investigate protocol adaptation, model allowlists, client version, and proxy configuration.</li>
      </ol>
      <Callout tone="danger" title="Do not expose the API key">
        <p>Share status codes and redacted errors only. Never paste or screenshot the complete key.</p>
      </Callout>

      <h2 id="checklist">Acceptance checklist</h2>
      <ul>
        <li>The key is injected through an environment variable.</li>
        <li><code>GET https://api.gpt88.cc/v1/models</code> confirms model access.</li>
        <li>The request model is <code>kimi-k3</code>.</li>
        <li>OpenAI-compatible requests use <code>https://api.gpt88.cc</code>; the Codex provider uses <code>https://api.gpt88.cc/v1</code>.</li>
        <li>A small real-project test records success rate, latency, context behaviour, and actual cost.</li>
      </ul>
    </DocPage>
  )
}
