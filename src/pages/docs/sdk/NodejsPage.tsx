import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'

/**
 * SDK 示例：Node.js
 *
 * 与 Python 篇结构对齐，但增加了 Edge / serverless 注意点，
 * 因为这是 JavaScript 生态最常踩的坑。
 */

const INSTALL = `npm i openai
# 或
pnpm add openai`

const BASIC = `// basic.ts
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://gpt88.cc/v1",
  apiKey: process.env.GPT88_API_KEY,
});

const resp = await client.chat.completions.create({
  model: "claude-opus-4-7",
  messages: [
    { role: "system", content: "You are a concise assistant." },
    { role: "user", content: "用 30 字介绍 gpt88.cc" },
  ],
  temperature: 0.7,
  max_tokens: 1024,
});

console.log(resp.choices[0].message.content);
console.log("usage:", resp.usage?.total_tokens, "tokens");`

const STREAM = `// stream.ts
const stream = await client.chat.completions.create({
  model: "claude-opus-4-7",
  stream: true,
  messages: [{ role: "user", content: "讲一个关于 API 网关的冷笑话" }],
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0].delta.content ?? "");
}
process.stdout.write("\\n");`

const TOOLS = `// tools.ts
const tools = [{
  type: "function" as const,
  function: {
    name: "get_weather",
    description: "查询某个城市的当前天气",
    parameters: {
      type: "object",
      properties: { city: { type: "string" } },
      required: ["city"],
    },
  },
}];

const resp = await client.chat.completions.create({
  model: "claude-opus-4-7",
  messages: [{ role: "user", content: "上海现在几度？" }],
  tools,
  tool_choice: "auto",
});

const call = resp.choices[0].message.tool_calls?.[0];
if (call) {
  console.log("model wants:", call.function.name, call.function.arguments);
}`

const RETRY = `// retry.ts
import OpenAI, { APIError, RateLimitError } from "openai";

const client = new OpenAI({
  baseURL: "https://gpt88.cc/v1",
  // SDK 默认会做有限重试；这里关掉走我们自己的策略
  maxRetries: 0,
});

async function callWithRetry(
  messages: { role: "user" | "system" | "assistant"; content: string }[],
  model = "claude-opus-4-7",
  maxRetries = 3,
) {
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

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));`

const EDGE = `// app/api/chat/route.ts  (Next.js App Router 示例)
import OpenAI from "openai";

export const runtime = "edge"; // 也可以是 "nodejs"

const client = new OpenAI({
  baseURL: "https://gpt88.cc/v1",
  apiKey: process.env.GPT88_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = await client.chat.completions.create({
    model: "claude-opus-4-7",
    stream: true,
    messages,
  });

  // 直接把 SSE 透传给前端
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

export default function NodejsSdkPage() {
  return (
    <DocPage
      path="/docs/sdk/nodejs"
      title="Node.js 示例"
      description="使用 OpenAI 官方 Node SDK，base_url 指向 gpt88.cc 即可。给出同步、流式、function calling、退避重试与 Next.js Edge 路由模板。"
      headings={[
        { id: 'install', text: '安装与配置', level: 2 },
        { id: 'basic', text: '基础调用', level: 2 },
        { id: 'stream', text: '流式响应', level: 2 },
        { id: 'tools', text: 'function calling', level: 2 },
        { id: 'retry', text: '退避重试', level: 2 },
        { id: 'edge', text: 'Next.js Edge / serverless', level: 2 },
      ]}
    >
      <h2 id="install">安装与配置</h2>
      {/*
       * Human msg-20260509-jwfia3 要求文档明确引导用户到 gpt88.cc 控制台获取 API Key。
       * 在 INSTALL 代码块上方加一行外链提示，与 Python / cURL 页面保持一致语气。
       */}
      <p className="text-sm text-ink-400">
        将代码中的 <code>process.env.GPT88_API_KEY</code> 指向你在{' '}
        <a
          href="https://gpt88.cc"
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 hover:text-violet-200"
        >
          https://gpt88.cc
        </a>{' '}
        控制台「API Keys」页面创建的 Key（建议用环境变量而非硬编码）。
      </p>
      <CodeBlock lang="bash" code={INSTALL} />

      <Callout tone="warn" title="不要在浏览器里直连">
        <p>
          OpenAI Node SDK 默认 <code>dangerouslyAllowBrowser</code> 是 false，
          请保留默认值。所有请求应当走你自己的 server / Edge route 转发，
          避免把 API Key 暴露给客户端。
        </p>
      </Callout>

      <h2 id="basic">基础调用</h2>
      <CodeBlock lang="typescript" filename="basic.ts" code={BASIC} />

      <h2 id="stream">流式响应</h2>
      <CodeBlock lang="typescript" filename="stream.ts" code={STREAM} />

      <h2 id="tools">function calling</h2>
      <CodeBlock lang="typescript" filename="tools.ts" code={TOOLS} />

      <h2 id="retry">退避重试</h2>
      <CodeBlock lang="typescript" filename="retry.ts" code={RETRY} />
      <p>
        错误类别与处理建议详见{' '}
        <Link to="/docs/api/errors">错误码</Link>。
      </p>

      <h2 id="edge">Next.js Edge / serverless</h2>
      <p>
        在 Edge / serverless 函数中转发流式响应，是 React 应用最常见的接入方式：
      </p>
      <CodeBlock
        lang="typescript"
        filename="app/api/chat/route.ts"
        code={EDGE}
      />
      <Callout tone="tip">
        <p>
          如果你的 runtime 不是 Edge（例如 Vercel Node Functions），
          注意配置足够长的最大执行时长（流式响应可能数十秒），
          以及在反向代理层关闭对 SSE 的缓冲。
        </p>
      </Callout>
    </DocPage>
  )
}
