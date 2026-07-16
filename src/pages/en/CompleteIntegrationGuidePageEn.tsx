import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const FIVE_STEP_FLOW = `1. Sign in to the gpt88.cc console
2. Create one API key and store the full value immediately
3. Choose the protocol style: OpenAI compatible / Claude compatible / native Gemini image API
4. Fill in Base URL, API key, and default model in your tool
5. Send one minimal request, then verify usage and billing in the console`

const BASE_URL_RULES = `OpenAI-compatible tools
  Base URL: https://api.gpt88.cc
  Typical tools: OpenAI SDK, Codex CLI, Cursor, OpenCode, cURL

Claude / Anthropic-compatible tools
  Base URL: https://api.gpt88.cc
  Typical tools: Claude Code, Anthropic SDK, OpenClaw

Google / Gemini image generation
  Base URL: https://img.gpt88.cc
  Endpoint: /v1beta/models/{MODEL}:generateContent

Use the standard API URL for normal APIs and the media URL for image/video requests; protocol differences are handled by endpoint paths and request formats`

const CURL_SMOKE_TEST = `export GPT88_API_KEY="sk-your-gpt88-api-key"

curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-haiku-4-5-20251001",
    "messages": [
      {"role": "user", "content": "Introduce gpt88.cc in one sentence"}
    ]
  }'`

const OPENAI_ENV = `export OPENAI_API_KEY="$GPT88_API_KEY"
export OPENAI_BASE_URL="https://api.gpt88.cc"`

const CLAUDE_ENV = `export ANTHROPIC_AUTH_TOKEN="$GPT88_API_KEY"
export ANTHROPIC_BASE_URL="https://api.gpt88.cc"
export ANTHROPIC_API_KEY="$GPT88_API_KEY"`

const CODEX_CONFIG = `model_provider = "OpenAI"
model = "gpt-5.5"
review_model = "gpt-5.5"
model_reasoning_effort = "high"

[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.gpt88.cc"
wire_api = "responses"
requires_openai_auth = true`

const CLAUDE_CODE_CONFIG = `{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.gpt88.cc",
    "ANTHROPIC_AUTH_TOKEN": "your gpt88.cc API key",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0"
  }
}`

const USAGE_CHECKLIST = `When one request looks too expensive, check in this order:

1. Model choice: did you use a more expensive model than intended?
2. Input tokens: long chats, code context, and tool results inflate prompts quickly
3. Output tokens: longer responses cost more
4. API type: image, audio, and video are not always pure token billing
5. API key: did one client or script loop unexpectedly?
6. request_id: always keep it if support needs to investigate`

const TROUBLESHOOTING = `401 invalid_api_key
  Check Bearer auth format, key completeness, and whether it is a real gpt88.cc key.

403 permission_denied
  The current key does not have access to the model or endpoint.

429 rate_limit_exceeded
  Lower concurrency and retry according to Retry-After or retry_after_seconds.

429 insufficient_quota
  Balance or quota is exhausted.

404 model_not_found
  The model name is wrong or unavailable. Refresh with GET /v1/models.

413 payload_too_large
  Reduce payload size, shorten message history, or compress the image.

503 service_unavailable / upstream_error
  Retry with backoff or switch model / route if necessary.

Slow requests
  Separate network latency, model latency, long context, and slow first-token delay.`

export default function CompleteIntegrationGuidePageEn() {
  return (
    <DocPage
      path="/docs/guides/complete-integration"
      title="Complete Integration Guide"
      description="Run the full gpt88.cc integration path from API key creation and Base URL selection to client setup, usage checks, and troubleshooting."
      headings={[
        { id: 'goal', text: 'What this guide solves', level: 2 },
        { id: 'five-steps', text: 'Finish the first integration in 5 steps', level: 2 },
        { id: 'base-url', text: 'Base URL rules', level: 2 },
        { id: 'clients', text: 'Client-specific setup', level: 2 },
        { id: 'codex-cli', text: 'Codex CLI', level: 3 },
        { id: 'claude-code', text: 'Claude Code', level: 3 },
        { id: 'openai-sdk', text: 'OpenAI SDK / Cursor / OpenCode', level: 3 },
        { id: 'usage', text: 'Usage and cost checks', level: 2 },
        { id: 'errors', text: 'Common error quick reference', level: 2 },
        { id: 'best-practices', text: 'Best practices before production', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="info" title="Best starting point for first-time or migration users">
        <p>
          If you are moving from another relay service, from the official OpenAI or Anthropic APIs, or from
          tools such as Claude Code, Codex CLI, Cursor, or OpenCode, use this guide to run one end-to-end setup
          before optimizing anything else.
        </p>
      </Callout>

      <h2 id="goal">What this guide solves</h2>
      <p>
        Most failed integrations are not caused by the model itself. They come from mismatched Base URL shape,
        wrong environment variables, incorrect API key permissions, or missing usage / rate-limit checks. This
        page connects those steps into one working path: make one request succeed first, then tune the client.
      </p>

      <h2 id="five-steps">Finish the first integration in 5 steps</h2>
      <CodeBlock lang="text" filename="integration-flow" code={FIVE_STEP_FLOW} />
      <p>
        The fastest validation path is still one minimal cURL request. If cURL succeeds, your key, balance,
        model, and route are usually fine. If a client still fails, debug the client config next.
      </p>
      <CodeBlock lang="bash" filename="smoke-test.sh" code={CURL_SMOKE_TEST} />

      <h2 id="base-url">Base URL rules</h2>
      <p>Decide based on the client protocol, not only on the model family name.</p>
      <CodeBlock lang="text" filename="base-url-rules" code={BASE_URL_RULES} />

      <h2 id="clients">Client-specific setup</h2>
      <p>The shortest mental model is simple: OpenAI-style tools usually need <code>/v1</code>; Claude-style tools usually do not.</p>

      <h3 id="codex-cli">Codex CLI</h3>
      <p>Codex CLI is an OpenAI-style client. Give it a dedicated key and a separate budget where possible.</p>
      <CodeBlock lang="toml" filename="~/.codex/config.toml" code={CODEX_CONFIG} />
      <CodeBlock lang="bash" filename="openai-env" code={OPENAI_ENV} />

      <h3 id="claude-code">Claude Code</h3>
      <p>
        Claude Code follows the Anthropic-style path with <code>https://api.gpt88.cc</code>. Use
        <code>https://img.gpt88.cc</code> for image and video requests.
      </p>
      <CodeBlock lang="json" filename="~/.claude/settings.json" code={CLAUDE_CODE_CONFIG} />
      <CodeBlock lang="bash" filename="anthropic-env" code={CLAUDE_ENV} />

      <h3 id="openai-sdk">OpenAI SDK / Cursor / OpenCode</h3>
      <p>
        These clients usually only need two fields changed: <code>base_url</code> and <code>api_key</code>. If
        the client supports a custom OpenAI provider, choose the OpenAI-compatible option directly.
      </p>
      <p>
        For full runnable examples, continue with{' '}
        <Link to={localizePath('/docs/sdk/python/', 'en')}>Python SDK</Link> and{' '}
        <Link to={localizePath('/docs/sdk/nodejs/', 'en')}>Node.js SDK</Link>.
      </p>

      <h2 id="usage">Usage and cost checks</h2>
      <p>
        After the first working request, go to the console and verify what really happened: which model was
        used, how many tokens were counted, which API key made the call, and whether the deduction matches your expectation.
      </p>
      <CodeBlock lang="text" filename="usage-checklist" code={USAGE_CHECKLIST} />

      <h2 id="errors">Common error quick reference</h2>
      <CodeBlock lang="text" filename="error-quick-reference" code={TROUBLESHOOTING} />
      <p>
        For full HTTP and business error mappings, see{' '}
        <Link to={localizePath('/docs/api/errors/', 'en')}>Error Codes</Link>.
      </p>

      <h2 id="best-practices">Best practices before production</h2>
      <ul>
        <li>Use separate API keys for production, staging, and local development.</li>
        <li>Name keys by purpose, such as <code>codex-macbook</code> or <code>web-prod</code>.</li>
        <li>Keep keys only in server-side environment variables or secret managers.</li>
        <li>Set daily limits, concurrency controls, and alerting before production rollout.</li>
        <li>Log <code>request_id</code> server-side for future debugging.</li>
        <li>Refresh model lists from <code>GET /v1/models</code> instead of hardcoding assumptions forever.</li>
      </ul>

      <h2 id="next">Next steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/quickstart/', 'en')}>Quickstart</Link> if you only need the shortest path.</li>
        <li><Link to={localizePath('/docs/guides/config-export/', 'en')}>Config Export</Link> if you want reusable tool configs.</li>
        <li><Link to={localizePath('/docs/auth/', 'en')}>Auth & Billing</Link> for RMB balance and usage semantics.</li>
        <li><Link to={localizePath('/models/', 'en')}>Models</Link> if you need model selection next.</li>
      </ul>
    </DocPage>
  )
}
