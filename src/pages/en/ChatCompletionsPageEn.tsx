import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { CodeTabs } from '../../components/ui/CodeTabs'
import { Callout } from '../../components/ui/Callout'
import { EndpointBadge } from '../../components/ui/EndpointBadge'
import { FieldTable, type FieldRow } from '../../components/ui/FieldTable'
import { localizePath } from '../../lib/locale'

const REQ_BODY: FieldRow[] = [
  {
    name: 'model',
    type: 'string',
    required: true,
    description: (
      <>
        Model ID to call, for example <code>gpt-5.6-sol</code>. Use{' '}
        <Link to={localizePath('/docs/api/list-models/', 'en')}>GET /v1/models</Link> to fetch the
        real-time list available to your key.
      </>
    ),
  },
  {
    name: 'messages',
    type: 'array&lt;Message&gt;',
    required: true,
    description: <>Conversation history in chronological order.</>,
  },
  {
    name: 'stream',
    type: 'boolean',
    default: 'false',
    description: <>When true, the response is returned as Server-Sent Events.</>,
  },
  {
    name: 'temperature',
    type: 'number',
    default: '1',
    description: <>Sampling temperature. Higher values increase randomness.</>,
  },
  {
    name: 'max_tokens',
    type: 'integer',
    description: <>Maximum number of output tokens for this response.</>,
  },
  {
    name: 'response_format',
    type: 'object',
    description: <>Structured output hint, commonly <code>{'{ "type": "json_object" }'}</code>.</>,
  },
  {
    name: 'tools',
    type: 'array&lt;Tool&gt;',
    description: <>Function-calling tool definitions using JSON schema.</>,
  },
]

const REQUEST_BODY = `{
  "model": "gpt-5.6-sol",
  "stream": false,
  "temperature": 0.7,
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Introduce gpt88.cc in one sentence."}
  ]
}`

const RESP_NON_STREAM = `{
  "id": "chatcmpl-9f3a2b8c1d4e5f6a",
  "object": "chat.completion",
  "created": 1730000000,
  "model": "gpt-5.6-sol",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "gpt88.cc is a unified AI API gateway with an OpenAI-compatible interface."
      }
    }
  ],
  "usage": {
    "prompt_tokens": 24,
    "completion_tokens": 20,
    "total_tokens": 44
  }
}`

const TABS = [
  {
    label: 'cURL',
    lang: 'bash',
    code: `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${REQUEST_BODY}'`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `from openai import OpenAI

client = OpenAI(
    base_url="https://api.gpt88.cc",
    api_key="YOUR_GPT88_API_KEY",
)

resp = client.chat.completions.create(
    model="gpt-5.6-sol",
    messages=[{"role": "user", "content": "Introduce gpt88.cc in one sentence."}],
)
print(resp.choices[0].message.content)`,
  },
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.gpt88.cc",
  apiKey: process.env.GPT88_API_KEY,
});

const resp = await client.chat.completions.create({
  model: "gpt-5.6-sol",
  messages: [{ role: "user", content: "Introduce gpt88.cc in one sentence." }],
});`,
  },
]

export default function ChatCompletionsPageEn() {
  return (
    <DocPage
      path="/docs/api/chat-completions"
      title="POST /v1/chat/completions"
      description="OpenAI-compatible chat completions endpoint for text generation, streaming, tool use, and structured output."
      headings={[
        { id: 'endpoint', text: 'Endpoint', level: 2 },
        { id: 'request', text: 'Request body', level: 2 },
        { id: 'example', text: 'Examples', level: 2 },
        { id: 'response', text: 'Response example', level: 2 },
        { id: 'notes', text: 'Notes', level: 2 },
      ]}
    >
      <h2 id="endpoint">Endpoint</h2>
      <EndpointBadge method="POST" path="https://api.gpt88.cc/v1/chat/completions" />
      <p>
        This is the primary OpenAI-compatible text generation endpoint on gpt88.cc.
        Most existing OpenAI SDK integrations can keep the same request shape.
      </p>

      <h2 id="request">Request body</h2>
      <FieldTable rows={REQ_BODY} />
      <CodeBlock lang="json" filename="request body" code={REQUEST_BODY} />

      <h2 id="example">Examples</h2>
      <CodeTabs tabs={TABS} />

      <h2 id="response">Response example</h2>
      <CodeBlock lang="json" filename="200 OK" code={RESP_NON_STREAM} />

      <h2 id="notes">Notes</h2>
      <Callout tone="warn" title="Pricing and limits are not hard-coded here">
        <p>
          Model pricing, rate limits, concurrency, and context availability are controlled dynamically
          in the console and gateway configuration.
        </p>
      </Callout>
      <ul>
        <li>Use <Link to={localizePath('/docs/api/list-models/', 'en')}>GET /v1/models</Link> to refresh available models.</li>
        <li>Use <Link to={localizePath('/docs/api/errors/', 'en')}>Error Codes</Link> for retry and failure handling.</li>
      </ul>
    </DocPage>
  )
}
