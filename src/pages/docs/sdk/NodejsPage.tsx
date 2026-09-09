import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'
import { buildAgentActivationUrl } from '../../../lib/activationLinks'
import { useLocale } from '../../../lib/locale'
import { getSdkCopy } from '../../../lib/sdkLocaleCopy'
import { SeoIntentSections } from '../../../components/seo/SeoIntentSections'
import { seoIntentHeadings } from '../../../components/seo/SeoIntentMeta'
import NodejsPageEn from '../../en/NodejsPageEn'

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
  baseURL: "https://api.gpt88.cc",
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
  baseURL: "https://api.gpt88.cc",
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
  baseURL: "https://api.gpt88.cc",
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

const NODE_BODY_COPY: Record<string, { key: string; browserTitle: string; browser: string; retry: string; edge: string; tip: string }> = {
  zh: { key: '将代码中的 process.env.GPT88_API_KEY 指向你在 Agent API Keys 控制台 API Keys 页面创建的 Key（建议用环境变量而非硬编码）。', browserTitle: '不要在浏览器里直连', browser: 'OpenAI Node SDK 默认 dangerouslyAllowBrowser 是 false，请保留默认值。所有请求应走你自己的 server / Edge route 转发，避免把 API Key 暴露给客户端。', retry: '错误类别与处理建议详见', edge: '在 Edge / serverless 函数中转发流式响应，是 React 应用最常见的接入方式：', tip: '如果 runtime 不是 Edge（例如 Vercel Node Functions），请配置足够长的最大执行时长，并在反向代理层关闭 SSE 缓冲。' },
  hi: { key: 'Code में process.env.GPT88_API_KEY को Agent API Keys console के API Keys page पर बनाए गए Key से जोड़ें (environment variable को hard-code से प्राथमिकता दें)।', browserTitle: 'Browser से direct call न करें', browser: 'OpenAI Node SDK में dangerouslyAllowBrowser default false है; इसे बनाए रखें। सभी requests अपने server / Edge route से forward करें ताकि API Key client को न मिले।', retry: 'Error category और handling देखें', edge: 'Edge / serverless function से streaming response forward करना React app का सामान्य तरीका है:', tip: 'Edge के बजाय Vercel Node Functions हो तो पर्याप्त execution time दें और reverse proxy में SSE buffering बंद करें।' },
  bn: { key: 'Code-এর process.env.GPT88_API_KEY-কে Agent API Keys console-এর API Keys page-এ তৈরি করা Key-এর সঙ্গে যুক্ত করুন (hard-code না করে environment variable ব্যবহার করুন)।', browserTitle: 'Browser থেকে direct call করবেন না', browser: 'OpenAI Node SDK-তে dangerouslyAllowBrowser-এর default false রাখুন। সব request নিজের server / Edge route দিয়ে forward করুন, যাতে client-এ API Key না যায়।', retry: 'Error category ও handling দেখুন', edge: 'Edge / serverless function দিয়ে streaming response forward করা React app-এর সাধারণ পদ্ধতি:', tip: 'Edge নয়, Vercel Node Functions হলে যথেষ্ট execution time দিন এবং reverse proxy-তে SSE buffering বন্ধ করুন।' },
  ur: { key: 'Code میں process.env.GPT88_API_KEY کو Agent API Keys console کے API Keys page پر بنائے گئے Key سے جوڑیں (hard-code کے بجائے environment variable استعمال کریں)۔', browserTitle: 'Browser سے direct call نہ کریں', browser: 'OpenAI Node SDK میں dangerouslyAllowBrowser کا default false رہنے دیں۔ تمام requests اپنے server / Edge route سے forward کریں تاکہ API Key client تک نہ پہنچے۔', retry: 'Error category اور handling دیکھیں', edge: 'Edge / serverless function سے streaming response forward کرنا React app کا عام طریقہ ہے:', tip: 'Edge کے بجائے Vercel Node Functions ہوں تو کافی execution time دیں اور reverse proxy میں SSE buffering بند کریں۔' },
  ta: { key: 'Code-ல் process.env.GPT88_API_KEY-ஐ Agent API Keys console-ன் API Keys page-ல் உருவாக்கிய Key-க்கு இணைக்கவும் (hard-code செய்யாமல் environment variable பயன்படுத்தவும்).', browserTitle: 'Browser-ல் direct call செய்ய வேண்டாம்', browser: 'OpenAI Node SDK-ல் dangerouslyAllowBrowser default false-ஆக இருக்கட்டும். எல்லா requests-ஐ உங்கள் server / Edge route வழியாக forward செய்து API Key client-க்கு செல்லாமல் பாதுகாக்கவும்.', retry: 'Error category மற்றும் handling-ஐ பார்க்கவும்', edge: 'Edge / serverless function மூலம் streaming response-ஐ forward செய்வது React app-களின் பொதுவான முறையாகும்:', tip: 'Edge அல்லாத Vercel Node Functions என்றால் போதுமான execution time அமைத்து reverse proxy-ல் SSE buffering-ஐ முடக்கவும்.' },
  ne: { key: 'Code को process.env.GPT88_API_KEY लाई Agent API Keys console को API Keys page मा बनाइएको Key सँग जोड्नुहोस् (hard-code भन्दा environment variable प्रयोग गर्नुहोस्)।', browserTitle: 'Browser बाट direct call नगर्नुहोस्', browser: 'OpenAI Node SDK को dangerouslyAllowBrowser default false नै राख्नुहोस्। सबै requests आफ्नै server / Edge route बाट forward गरी client मा API Key नपठाउनुहोस्।', retry: 'Error category र handling हेर्नुहोस्', edge: 'Edge / serverless function बाट streaming response forward गर्नु React app को सामान्य integration हो:', tip: 'Edge नभई Vercel Node Functions भए पर्याप्त execution time दिनुहोस् र reverse proxy मा SSE buffering बन्द गर्नुहोस्।' },
  si: { key: 'Code එකේ process.env.GPT88_API_KEY Agent API Keys console හි API Keys page එකේ සාදන ලද Key එකට යොමු කරන්න (hard-code වෙනුවට environment variable භාවිතා කරන්න).', browserTitle: 'Browser එකෙන් direct call නොකරන්න', browser: 'OpenAI Node SDK හි dangerouslyAllowBrowser default false ලෙසම තබන්න. සියලු requests ඔබේ server / Edge route හරහා forward කර API Key client වෙත නොයවන්න.', retry: 'Error category සහ handling බලන්න', edge: 'Edge / serverless function එකකින් streaming response forward කිරීම React app සඳහා සාමාන්‍ය ක්‍රමයකි:', tip: 'Edge නොවන Vercel Node Functions නම් ප්‍රමාණවත් execution time සකසා reverse proxy එකේ SSE buffering අක්‍රීය කරන්න.' },
}

export default function NodejsSdkPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <NodejsPageEn />
  const copy = getSdkCopy(locale, 'nodejs', { title: 'Node.js 调用 GPT88 API 完整示例', description: '在 Node.js 中使用 OpenAI SDK 调用 GPT88 API，包含环境变量、流式响应和重试。', intro: '将 Key 保存在服务端环境变量中，并使用现有 OpenAI-compatible client 发送请求。', sections: { install: '安装与配置', basic: '基础调用', stream: '流式响应', tools: 'function calling', retry: '退避重试', edge: 'Next.js Edge / serverless' } })
  const bodyCopy = NODE_BODY_COPY[locale] ?? NODE_BODY_COPY.zh

  const keyUrl = buildAgentActivationUrl({
    locale,
    surface: 'sdk_nodejs_setup',
    intent: 'openai_api',
    destination: 'keys',
  })

  return (
    <DocPage
      path="/docs/sdk/nodejs"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'install', text: copy.sections.install, level: 2 },
        { id: 'basic', text: copy.sections.basic, level: 2 },
        { id: 'stream', text: copy.sections.stream, level: 2 },
        { id: 'tools', text: copy.sections.tools, level: 2 },
        { id: 'retry', text: copy.sections.retry, level: 2 },
        { id: 'edge', text: copy.sections.edge, level: 2 },
        ...seoIntentHeadings('nodejs'),
      ]}
    >
      <p>{copy.intro}</p>
      <h2 id="install">{copy.sections.install}</h2>
      {/*
       * Human msg-20260509-jwfia3 要求文档明确引导用户到 gpt88.cc 控制台获取 API Key。
       * 在 INSTALL 代码块上方加一行外链提示，与 Python / cURL 页面保持一致语气。
       */}
      <p className="text-sm text-ink-400">
        {bodyCopy.key.replace('process.env.GPT88_API_KEY', '')}<code>process.env.GPT88_API_KEY</code>{' '}
        <a
          href={keyUrl}
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 hover:text-violet-200"
        >
          Agent API Keys
        </a>{' '}
        控制台「API Keys」页面创建的 Key（建议用环境变量而非硬编码）。
      </p>
      <CodeBlock lang="bash" code={INSTALL} />

      <Callout tone="warn" title={bodyCopy.browserTitle}>
        <p>{bodyCopy.browser}</p>
      </Callout>

      <h2 id="basic">{copy.sections.basic}</h2>
      <CodeBlock lang="typescript" filename="basic.ts" code={BASIC} />

      <h2 id="stream">{copy.sections.stream}</h2>
      <CodeBlock lang="typescript" filename="stream.ts" code={STREAM} />

      <h2 id="tools">{copy.sections.tools}</h2>
      <CodeBlock lang="typescript" filename="tools.ts" code={TOOLS} />

      <h2 id="retry">{copy.sections.retry}</h2>
      <CodeBlock lang="typescript" filename="retry.ts" code={RETRY} />
      <p>
        {bodyCopy.retry}{' '}
        <Link to="/docs/api/errors/">错误码</Link>。
      </p>

      <h2 id="edge">{copy.sections.edge}</h2>
      <p>
        {bodyCopy.edge}
      </p>
      <CodeBlock
        lang="typescript"
        filename="app/api/chat/route.ts"
        code={EDGE}
      />
      <Callout tone="tip">
        <p>
          {bodyCopy.tip}
        </p>
      </Callout>
      <SeoIntentSections intent="nodejs" />
    </DocPage>
  )
}
