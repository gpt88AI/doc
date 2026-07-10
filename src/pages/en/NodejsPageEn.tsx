import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const INSTALL = `npm i openai
# or
pnpm add openai`

const BASIC = `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://gpt88.cc/v1",
  apiKey: process.env.GPT88_API_KEY,
});

const resp = await client.chat.completions.create({
  model: "claude-opus-4-8",
  messages: [
    { role: "system", content: "You are a concise assistant." },
    { role: "user", content: "Introduce gpt88.cc in under 30 words" },
  ],
  temperature: 0.7,
  max_tokens: 1024,
});

console.log(resp.choices[0].message.content);
console.log("usage:", resp.usage?.total_tokens, "tokens");`

const STREAM = `const stream = await client.chat.completions.create({
  model: "claude-opus-4-8",
  stream: true,
  messages: [{ role: "user", content: "Tell a short joke about API gateways" }],
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0].delta.content ?? "");
}
process.stdout.write("\\n");`

const TOOLS = `const tools = [{
  type: "function",
  function: {
    name: "get_weather",
    description: "Get the current weather for a city",
    parameters: {
      type: "object",
      properties: { city: { type: "string" } },
      required: ["city"],
    },
  },
}];

const resp = await client.chat.completions.create({
  model: "claude-opus-4-8",
  messages: [{ role: "user", content: "What's the weather in Shanghai?" }],
  tools,
  tool_choice: "auto",
});

const call = resp.choices[0].message.tool_calls?.[0];
if (call) {
  console.log("model wants:", call.function.name, call.function.arguments);
}`

const RETRY = `import OpenAI, { APIError, RateLimitError } from "openai";

const client = new OpenAI({
  baseURL: "https://gpt88.cc/v1",
  maxRetries: 0,
});

async function callWithRetry(messages, model = "claude-opus-4-8", maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await client.chat.completions.create({ model, messages });
    } catch (err) {
      if (err instanceof RateLimitError) {
        await sleep(2 ** attempt * 1000);
        continue;
      }
      if (err instanceof APIError && err.status >= 500) {
        await sleep(2 ** attempt * 1000);
        continue;
      }
      throw err;
    }
  }
  throw new Error("max retries exceeded");
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));`

const EDGE = `import OpenAI from "openai";

export const runtime = "edge";

const client = new OpenAI({
  baseURL: "https://gpt88.cc/v1",
  apiKey: process.env.GPT88_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = await client.chat.completions.create({
    model: "claude-opus-4-8",
    stream: true,
    messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const delta = chunk.choices[0].delta.content ?? "";
        controller.enqueue(encoder.encode(delta));
      }
      controller.close();
    },
  });

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}`

export default function NodejsPageEn() {
  return (
    <DocPage
      path="/docs/sdk/nodejs"
      title="Node.js Examples"
      description="Use the official OpenAI Node SDK with gpt88.cc. Includes basic calls, streaming, function calling, backoff retries, and a Next.js Edge route example."
      headings={[
        { id: 'install', text: 'Install and configure', level: 2 },
        { id: 'basic', text: 'Basic call', level: 2 },
        { id: 'stream', text: 'Streaming', level: 2 },
        { id: 'tools', text: 'Function calling', level: 2 },
        { id: 'retry', text: 'Backoff retries', level: 2 },
        { id: 'edge', text: 'Next.js Edge / serverless', level: 2 },
      ]}
    >
      <h2 id="install">Install and configure</h2>
      <p className="text-sm text-ink-400">
        Point <code>process.env.GPT88_API_KEY</code> at the key created in the{' '}
        <a href="https://gpt88.cc" target="_blank" rel="noreferrer" className="text-violet-300 hover:text-violet-200">
          gpt88.cc console
        </a>.
      </p>
      <CodeBlock lang="bash" code={INSTALL} />

      <Callout tone="warn" title="Do not call the API directly from the browser">
        <p>
          Keep the default SDK browser safety behavior. Requests should go through your own server or Edge
          route so the API key is never exposed to the client.
        </p>
      </Callout>

      <h2 id="basic">Basic call</h2>
      <CodeBlock lang="typescript" filename="basic.ts" code={BASIC} />

      <h2 id="stream">Streaming</h2>
      <CodeBlock lang="typescript" filename="stream.ts" code={STREAM} />

      <h2 id="tools">Function calling</h2>
      <CodeBlock lang="typescript" filename="tools.ts" code={TOOLS} />

      <h2 id="retry">Backoff retries</h2>
      <CodeBlock lang="typescript" filename="retry.ts" code={RETRY} />
      <p>
        For error categories and retry advice, see{' '}
        <Link to={localizePath('/docs/api/errors/', 'en')}>Error Codes</Link>.
      </p>

      <h2 id="edge">Next.js Edge / serverless</h2>
      <p>A streaming Edge or serverless route is the most common integration shape for React applications.</p>
      <CodeBlock lang="typescript" filename="app/api/chat/route.ts" code={EDGE} />
      <Callout tone="tip">
        <p>
          If your runtime is not Edge, make sure the maximum execution time is long enough for streamed output
          and that your proxy layer does not buffer SSE responses.
        </p>
      </Callout>
    </DocPage>
  )
}
