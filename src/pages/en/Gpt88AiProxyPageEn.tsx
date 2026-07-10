import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const QUICK_CONFIG = `OpenAI-compatible Base URL:
https://gpt88.cc/v1

Claude / Anthropic-compatible Base URL:
https://gpt88.cc

Google / Gemini image generation Base URL:
https://china.claudecoder.me

Overseas direct:
https://test1122.up.railway.app/v1

Overseas CDN:
https://ai.orbitlink.me/v1`

const CURL_EXAMPLE = `export GPT88_API_KEY="sk-your-gpt88-api-key"

curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5-2-chat-latest",
    "messages": [
      {"role": "user", "content": "Introduce the gpt88 AI relay in one sentence"}
    ]
  }'`

const COST_MINDSET = `Traditional points-based relay:
top up → convert to virtual credits / points → apply multipliers → manually reverse real cost

gpt88.cc:
1 RMB topped up = 1 RMB balance
real model usage deducts from real RMB balance
no daily multiplier math, no virtual quota game`

export default function Gpt88AiProxyPageEn() {
  return (
    <DocPage
      path="/docs/guides/gpt88-ai-proxy"
      title="gpt88 AI Relay: Unified API Access for OpenAI, Claude, and Gemini"
      description="gpt88 is a unified AI relay and large-model gateway for developers, covering OpenAI-compatible APIs, Claude-compatible routing, Gemini image generation, domestic routes, overseas routes, and transparent RMB-based billing."
      headings={[
        { id: 'intro', text: 'What the gpt88 AI relay is', level: 2 },
        { id: 'why', text: 'Why teams use an AI relay', level: 2 },
        { id: 'features', text: 'Core capabilities', level: 2 },
        { id: 'base-url', text: 'Base URL selection', level: 2 },
        { id: 'quickstart', text: 'Minimal request example', level: 2 },
        { id: 'tools', text: 'Which tools it fits', level: 2 },
        { id: 'pricing', text: 'Token power billing mindset', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="info" title="One-line summary">
        <p>
          The gpt88 AI relay is a unified large-model gateway. Point your client at gpt88.cc, keep the right
          protocol style, and reduce the maintenance burden of many vendor APIs.
        </p>
      </Callout>

      <h2 id="intro">What the gpt88 AI relay is</h2>
      <p>
        gpt88.cc acts as an AI relay and unified gateway for developers and teams. The goal is not to force a
        brand-new protocol. The goal is to normalize the most common access patterns into a more stable entry point.
      </p>

      <h2 id="why">Why teams use an AI relay</h2>
      <p>
        When a team uses GPT, Claude, Gemini, DeepSeek, Qwen, image models, and video models together, the
        vendor endpoints, auth styles, error formats, model naming, and network routes often differ. A relay
        reduces that integration sprawl.
      </p>
      <ul>
        <li>Use a consistent gateway for many model vendors.</li>
        <li>Choose domestic or overseas routing by environment.</li>
        <li>Reuse one setup pattern across SDKs, desktop tools, and workflow systems.</li>
      </ul>

      <h2 id="features">Core capabilities</h2>
      <ul>
        <li>OpenAI-compatible routing at <code>https://gpt88.cc/v1</code>.</li>
        <li>Claude / Anthropic-compatible routing at <code>https://gpt88.cc</code>.</li>
        <li>Gemini image generation through the dedicated image route.</li>
        <li><Link to={localizePath('/models/', 'en')}>Model navigation</Link> across chat, image, video, and audio categories.</li>
        <li>Integration docs for ChatBox, Cherry Studio, Claude Code, Codex CLI, Cursor, Cline, Dify, and more.</li>
      </ul>

      <h2 id="base-url">Base URL selection</h2>
      <p>
        The most common integration mistake is the wrong Base URL. OpenAI-style clients usually require
        <code>/v1</code>. Claude-style clients usually do not.
      </p>
      <CodeBlock lang="text" filename="base-url-map" code={QUICK_CONFIG} />

      <h2 id="quickstart">Minimal request example</h2>
      <p>Use cURL first to confirm that the relay path, key, and model are valid.</p>
      <CodeBlock lang="bash" filename="gpt88-ai-proxy-smoke-test.sh" code={CURL_EXAMPLE} />
      <p>
        For full SDK examples, continue with <Link to={localizePath('/docs/sdk/python/', 'en')}>Python SDK</Link>,{' '}
        <Link to={localizePath('/docs/sdk/nodejs/', 'en')}>Node.js SDK</Link>, and{' '}
        <Link to={localizePath('/docs/sdk/curl/', 'en')}>cURL</Link>.
      </p>

      <h2 id="tools">Which tools it fits</h2>
      <ul>
        <li>OpenAI SDK, cURL, Cursor, and Cline through <code>https://gpt88.cc/v1</code>.</li>
        <li>Claude Code and Anthropic-style SDKs through <code>https://gpt88.cc</code>.</li>
        <li>Gemini / NanoBanana image flows through the dedicated Gemini image API route.</li>
        <li>Workflow systems such as Dify through the OpenAI-compatible provider path.</li>
      </ul>

      <h2 id="pricing">Token power billing mindset</h2>
      <Callout tone="tip" title="Not a traditional points board">
        <p>
          Many users arrive expecting multiplier math. gpt88.cc is better understood as transparent token-power
          billing: use what you use, and deduct real cost from real RMB balance.
        </p>
      </Callout>
      <CodeBlock lang="text" filename="token-power" code={COST_MINDSET} />

      <h2 id="next">Next steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/quickstart/', 'en')}>Quickstart</Link> for the first real request.</li>
        <li><Link to={localizePath('/docs/guides/complete-integration/', 'en')}>Complete Integration Guide</Link> for end-to-end setup.</li>
        <li><Link to={localizePath('/docs/integrations/', 'en')}>Integration Guides</Link> for tool-specific setup.</li>
        <li><Link to={localizePath('/docs/auth/', 'en')}>Auth & Billing</Link> for balance and usage behavior.</li>
      </ul>
    </DocPage>
  )
}
