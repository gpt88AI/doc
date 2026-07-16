import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const PREP_CHECKLIST = `1. Create an API key in the gpt88.cc console
2. Pick one default model for the first successful test
3. Choose the right route
4. Identify whether your tool is OpenAI-style or Claude / Anthropic-style
5. Send one minimal request first`

const OPENAI_EXAMPLE = `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-haiku-4-5-20251001",
    "messages": [
      {"role": "user", "content": "Introduce gpt88.cc in one sentence"}
    ]
  }'`

const PYTHON_EXAMPLE = `from openai import OpenAI

client = OpenAI(
    base_url="https://api.gpt88.cc",
    api_key="YOUR_GPT88_API_KEY",
)

resp = client.chat.completions.create(
    model="claude-haiku-4-5-20251001",
    messages=[{"role": "user", "content": "Introduce gpt88.cc in one sentence"}],
)
print(resp.choices[0].message.content)`

const NODE_EXAMPLE = `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.gpt88.cc",
  apiKey: process.env.GPT88_API_KEY,
});

const resp = await client.chat.completions.create({
  model: "claude-haiku-4-5-20251001",
  messages: [{ role: "user", content: "Introduce gpt88.cc in one sentence" }],
});
console.log(resp.choices[0].message.content);`

const MINDSET = `Standard APIs
  Use the Base URL: https://api.gpt88.cc

Direct image / video APIs
  Use the Base URL: https://img.gpt88.cc

OpenAI / Claude / Anthropic protocol differences
  Keep the selected Base URL and use the endpoint path and request format required by the protocol.`

export default function Gpt88TutorialPageEn() {
  return (
    <DocPage
      path="/docs/guides/gpt88-tutorial"
      title="gpt88.cc General Integration Guide"
      description="A unified introduction to the OpenAI-compatible and Claude-compatible mental model on gpt88.cc: what it is, how to choose routes and models, and how to make the first request succeed."
      headings={[
        { id: 'what-is-gpt88', text: 'What is gpt88.cc', level: 2 },
        { id: 'who-is-this-for', text: 'Who this guide is for', level: 2 },
        { id: 'compat-mindset', text: 'OpenAI and Claude compatibility mindset', level: 2 },
        { id: 'prepare', text: 'What to prepare before starting', level: 2 },
        { id: 'flow', text: 'Step-by-step integration flow', level: 2 },
        { id: 'by-tool', text: 'Integrate by tool type', level: 2 },
        { id: 'tool-curl', text: 'cURL', level: 3 },
        { id: 'tool-python', text: 'Python SDK', level: 3 },
        { id: 'tool-node', text: 'Node.js SDK', level: 3 },
        { id: 'related-docs', text: 'Related docs to read next', level: 2 },
        { id: 'summary', text: 'One-line summary', level: 2 },
      ]}
    >
      <Callout tone="info" title="Goal of this page">
        <p>
          This is not a single-SDK reference page. It is the general onboarding guide that explains how to
          think about gpt88.cc before you dive into tool-specific setup.
        </p>
      </Callout>

      <h2 id="what-is-gpt88">What is gpt88.cc</h2>
      <p>
        gpt88.cc is a unified large-model API gateway for developers. Instead of learning a completely new
        protocol, you usually keep the existing client style and only change the gateway endpoint and key.
      </p>
      <p>From the user side, it solves three common problems:</p>
      <ul>
        <li>Use one entry point for many model vendors.</li>
        <li>Choose the route that fits your network environment.</li>
        <li>Reuse one consistent setup pattern across SDKs, IDEs, and agent tools.</li>
      </ul>

      <h2 id="who-is-this-for">Who this guide is for</h2>
      <ul>
        <li>First-time gpt88.cc users who want a full mental model first.</li>
        <li>Teams already using OpenAI SDKs and looking for a low-friction migration path.</li>
        <li>Users of Claude Code or Anthropic SDKs who want the matching route pattern.</li>
        <li>Teams using mixed tools such as Cursor, Codex CLI, cURL, Python, and Node.js.</li>
      </ul>

      <h2 id="compat-mindset">OpenAI and Claude compatibility mindset</h2>
      <p>
        The most important distinction is not the model brand. It is the protocol expected by the client.
      </p>
      <CodeBlock lang="text" filename="mental-model" code={MINDSET} />

      <h2 id="prepare">What to prepare before starting</h2>
      <CodeBlock lang="text" filename="before-you-start" code={PREP_CHECKLIST} />

      <h2 id="flow">Step-by-step integration flow</h2>
      <ol>
        <li>Create or choose an API key.</li>
        <li>Pick one default model.</li>
        <li>Choose the route.</li>
        <li>Match the route style to the client protocol.</li>
        <li>Send one minimal request.</li>
        <li>Only then expand to your real workflow.</li>
      </ol>

      <h2 id="by-tool">Integrate by tool type</h2>
      <h3 id="tool-curl">cURL</h3>
      <p>Use cURL for the first connectivity proof: network, key validity, and model name correctness.</p>
      <CodeBlock lang="bash" filename="curl-openai-compatible.sh" code={OPENAI_EXAMPLE} />

      <h3 id="tool-python">Python SDK</h3>
      <p>For OpenAI-style Python services, usually the only required change is <code>base_url</code>.</p>
      <CodeBlock lang="python" filename="python-openai-compatible.py" code={PYTHON_EXAMPLE} />

      <h3 id="tool-node">Node.js SDK</h3>
      <p>For server-side JavaScript or TypeScript applications, the pattern is the same: switch <code>baseURL</code> and keep the OpenAI SDK shape.</p>
      <CodeBlock lang="typescript" filename="node-openai-compatible.ts" code={NODE_EXAMPLE} />

      <h2 id="related-docs">Related docs to read next</h2>
      <ul>
        <li><Link to={localizePath('/docs/quickstart/', 'en')}>Quickstart</Link> for the shortest hands-on path.</li>
        <li><Link to={localizePath('/docs/auth/', 'en')}>Auth & Billing</Link> for API keys and RMB balance semantics.</li>
        <li><Link to={localizePath('/docs/guides/config-export/', 'en')}>Config Export</Link> for reusable multi-tool configs.</li>
        <li><Link to={localizePath('/models/', 'en')}>Models</Link> for model selection.</li>
      </ul>

      <h2 id="summary">One-line summary</h2>
      <p>
        Keep the client protocol shape, point it at the correct gpt88.cc route, validate with one minimal
        request, then expand to your real model workflow.
      </p>
    </DocPage>
  )
}
