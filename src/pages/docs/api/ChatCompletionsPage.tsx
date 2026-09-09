import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { CodeTabs } from '../../../components/ui/CodeTabs'
import { Callout } from '../../../components/ui/Callout'
import { EndpointBadge } from '../../../components/ui/EndpointBadge'
import { FieldTable, type FieldRow } from '../../../components/ui/FieldTable'
import { buildAgentActivationUrl } from '../../../lib/activationLinks'
import { useLocale } from '../../../lib/locale'
import { getApiCopy } from '../../../lib/apiLocaleCopy'
import ChatCompletionsPageEn from '../../en/ChatCompletionsPageEn'

const CHAT_UI_COPY: Record<string, Record<string, string>> = {
  zh: { endpoint: '端点与认证', request: '请求体', message: 'Message 对象', example: '基础调用示例', response: '响应示例', responseFields: '响应字段', streaming: '流式响应', tools: '使用 tools / function calling', errors: '错误处理', pricing: '价格、限速、SLA 不在文档中固化', requestBody: '请求体为 JSON，常用字段如下：', simple: '下面是一次最简单的非流式调用：' },
  hi: { endpoint: 'एंडपॉइंट और प्रमाणीकरण', request: 'रिक्वेस्ट बॉडी', message: 'Message ऑब्जेक्ट', example: 'मूल कॉल उदाहरण', response: 'रिस्पॉन्स उदाहरण', responseFields: 'रिस्पॉन्स फ़ील्ड', streaming: 'स्ट्रीमिंग प्रतिक्रिया', tools: 'tools / function calling का उपयोग', errors: 'त्रुटि प्रबंधन', pricing: 'कीमत, दर सीमा और SLA दस्तावेज़ में स्थिर नहीं हैं', requestBody: 'रिक्वेस्ट बॉडी JSON है; सामान्य फ़ील्ड नीचे हैं:', simple: 'यह सबसे सरल non-streaming कॉल है:' },
  bn: { endpoint: 'এন্ডপয়েন্ট ও প্রমাণীকরণ', request: 'রিকোয়েস্ট বডি', message: 'Message অবজেক্ট', example: 'মৌলিক কলের উদাহরণ', response: 'রেসপন্সের উদাহরণ', responseFields: 'রেসপন্স ফিল্ড', streaming: 'স্ট্রিমিং প্রতিক্রিয়া', tools: 'tools / function calling ব্যবহার', errors: 'ত্রুটি পরিচালনা', pricing: 'মূল্য, rate limit ও SLA ডকুমেন্টে স্থির নয়', requestBody: 'রিকোয়েস্ট বডি JSON; সাধারণ ফিল্ডগুলো নিচে দেওয়া হলো:', simple: 'এটি সবচেয়ে সহজ non-streaming কল:' },
  ur: { endpoint: 'اینڈ پوائنٹ اور تصدیق', request: 'درخواست کا جسم', message: 'Message آبجیکٹ', example: 'بنیادی کال کی مثال', response: 'جواب کی مثال', responseFields: 'جواب کے فیلڈز', streaming: 'اسٹریمنگ جواب', tools: 'tools / function calling کا استعمال', errors: 'غلطی کا انتظام', pricing: 'قیمت، rate limit اور SLA دستاویز میں مستقل نہیں ہیں', requestBody: 'درخواست کا جسم JSON ہے؛ عام فیلڈز یہ ہیں:', simple: 'یہ سب سے آسان non-streaming کال ہے:' },
  ta: { endpoint: 'Endpoint மற்றும் அங்கீகாரம்', request: 'கோரிக்கை உடல்', message: 'Message பொருள்', example: 'அடிப்படை அழைப்பு எடுத்துக்காட்டு', response: 'பதில் எடுத்துக்காட்டு', responseFields: 'பதில் புலங்கள்', streaming: 'ஸ்ட்ரீமிங் பதில்', tools: 'tools / function calling பயன்பாடு', errors: 'பிழை கையாளல்', pricing: 'விலை, rate limit மற்றும் SLA ஆவணத்தில் நிலையாக இல்லை', requestBody: 'கோரிக்கை உடல் JSON; பொதுவான புலங்கள் கீழே:', simple: 'இது மிக எளிய non-streaming அழைப்பு:' },
  ne: { endpoint: 'एन्डपोइन्ट र प्रमाणीकरण', request: 'रिक्वेस्ट बडी', message: 'Message वस्तु', example: 'आधारभूत कलको उदाहरण', response: 'प्रतिक्रियाको उदाहरण', responseFields: 'प्रतिक्रिया फिल्ड', streaming: 'स्ट्रिमिङ प्रतिक्रिया', tools: 'tools / function calling प्रयोग', errors: 'त्रुटि व्यवस्थापन', pricing: 'मूल्य, rate limit र SLA कागजातमा स्थिर छैनन्', requestBody: 'रिक्वेस्ट बडी JSON हो; सामान्य फिल्डहरू:', simple: 'यो सबैभन्दा सरल non-streaming कल हो:' },
  si: { endpoint: 'Endpoint සහ සත්‍යාපනය', request: 'ඉල්ලීම් ශරීරය', message: 'Message වස්තුව', example: 'මූලික ඇමතුම් උදාහරණය', response: 'ප්‍රතිචාර උදාහරණය', responseFields: 'ප්‍රතිචාර ක්ෂේත්‍ර', streaming: 'ප්‍රවාහ ප්‍රතිචාරය', tools: 'tools / function calling භාවිතය', errors: 'දෝෂ හැසිරවීම', pricing: 'මිල, rate limit සහ SLA ලේඛනයේ ස්ථිර කර නැත', requestBody: 'ඉල්ලීම් ශරීරය JSON වේ; පොදු ක්ෂේත්‍ර පහත දැක්වේ:', simple: 'මෙය සරලම non-streaming ඇමතුමයි:' },
}

/**
 * API Reference: POST /v1/chat/completions
 *
 * 编写原则：
 * - 字段以 OpenAI 协议为基准，仅写 gpt88.cc 实际支持/承诺的部分；
 * - 任何"价格 / 限速 / SLA / 模型可用列表"的具体数值不写死，
 *   显式说明由控制台或后端配置动态下发；
 * - 给出三种调用方式（cURL / Python / Node）+ 流式与非流式两种返回示例。
 */

const REQ_BODY: FieldRow[] = [
  {
    name: 'model',
    type: 'string',
    required: true,
    description: (
      <>
        要调用的模型 ID，例如 <code>claude-opus-4-7</code>。
        可用模型清单通过{' '}
        <Link to="/docs/api/list-models/">GET /v1/models</Link> 实时获取，
        不同账号可见的模型由控制台权限决定。
      </>
    ),
  },
  {
    name: 'messages',
    type: 'array<Message>',
    required: true,
    description: (
      <>
        多轮对话历史，按时间顺序排列。每个元素包含 <code>role</code>
        （<code>system</code> / <code>user</code> / <code>assistant</code> /{' '}
        <code>tool</code>）和 <code>content</code>。
      </>
    ),
  },
  {
    name: 'stream',
    type: 'boolean',
    description: (
      <>
        是否以 SSE 流式返回。设为 <code>true</code> 时，响应是
        <code>text/event-stream</code>，每行 <code>data: {'{...}'}</code>，
        最终以 <code>data: [DONE]</code> 结束。
      </>
    ),
    default: 'false',
  },
  {
    name: 'temperature',
    type: 'number',
    description: (
      <>
        采样温度，范围 <code>0–2</code>，越大越发散。与 <code>top_p</code> 二选一即可。
      </>
    ),
    default: '1',
  },
  {
    name: 'top_p',
    type: 'number',
    description: (
      <>
        核采样阈值，范围 <code>0–1</code>。
      </>
    ),
    default: '1',
  },
  {
    name: 'max_tokens',
    type: 'integer',
    description: (
      <>
        本次生成的最大 token 数。模型自身的上下文上限由具体模型决定，请通过{' '}
        <Link to="/docs/api/list-models/">GET /v1/models</Link> 查看。
      </>
    ),
  },
  {
    name: 'stop',
    type: 'string | string[]',
    description: <>遇到任一字符串时停止生成，最多 4 个。</>,
  },
  {
    name: 'presence_penalty',
    type: 'number',
    description: <>范围 <code>-2.0 – 2.0</code>，正值促进话题多样性。</>,
    default: '0',
  },
  {
    name: 'frequency_penalty',
    type: 'number',
    description: <>范围 <code>-2.0 – 2.0</code>，正值抑制重复词。</>,
    default: '0',
  },
  {
    name: 'response_format',
    type: 'object',
    description: (
      <>
        指定输出结构。常用：
        <code>{'{ "type": "json_object" }'}</code>{' '}
        让模型返回严格的 JSON。是否支持取决于模型，未支持时会原样按文本返回。
      </>
    ),
  },
  {
    name: 'tools',
    type: 'array<Tool>',
    description: (
      <>
        Function calling 工具定义数组。每个 tool 至少包含
        <code>type</code>（目前为 <code>"function"</code>）和{' '}
        <code>function</code>（含 <code>name</code> / <code>description</code> /{' '}
        <code>parameters</code> JSON Schema）。
      </>
    ),
  },
  {
    name: 'tool_choice',
    type: 'string | object',
    description: (
      <>
        控制工具调用：<code>"auto"</code>（默认）/ <code>"none"</code> /
        指定具体 tool 对象。
      </>
    ),
  },
  {
    name: 'user',
    type: 'string',
    description: (
      <>
        终端用户标识，建议透传以便在审计与风控中关联到真实业务用户。
      </>
    ),
  },
]

const MESSAGE_FIELDS: FieldRow[] = [
  {
    name: 'role',
    type: '"system" | "user" | "assistant" | "tool"',
    required: true,
    description: <>消息角色。</>,
  },
  {
    name: 'content',
    type: 'string | array<Part>',
    required: true,
    description: (
      <>
        文本或多模态内容数组。多模态形如{' '}
        <code>{'[{ "type": "text", ... }, { "type": "image_url", ... }]'}</code>，
        是否可用取决于模型本身。
      </>
    ),
  },
  {
    name: 'name',
    type: 'string',
    description: <>可选的角色名，常用于多用户对话场景区分发言者。</>,
  },
  {
    name: 'tool_call_id',
    type: 'string',
    description: (
      <>
        当 <code>role = "tool"</code> 时，标记这条消息是对哪一次 tool 调用的响应。
      </>
    ),
  },
]

const RESP_FIELDS: FieldRow[] = [
  { name: 'id', type: 'string', required: true, description: <>本次补全的唯一 ID，便于排障关联日志。</> },
  { name: 'object', type: 'string', required: true, description: <>固定为 <code>"chat.completion"</code>。</> },
  { name: 'created', type: 'integer', required: true, description: <>响应生成时间，Unix 秒。</> },
  { name: 'model', type: 'string', required: true, description: <>真正承担本次推理的模型 ID（与请求一致或为内部对齐版本）。</> },
  {
    name: 'choices',
    type: 'array<Choice>',
    required: true,
    description: (
      <>
        生成结果数组。每个 choice 含 <code>index</code> /{' '}
        <code>message</code> / <code>finish_reason</code>
        （<code>stop</code> / <code>length</code> / <code>tool_calls</code> / <code>content_filter</code>）。
      </>
    ),
  },
  {
    name: 'usage',
    type: 'object',
    required: true,
    description: (
      <>
        本次调用的 token 统计：<code>prompt_tokens</code> /{' '}
        <code>completion_tokens</code> / <code>total_tokens</code>。
        计费按账号定价规则在控制台展示。
      </>
    ),
  },
]

const REQUEST_BODY = `{
  "model": "claude-opus-4-7",
  "stream": false,
  "temperature": 0.7,
  "max_tokens": 1024,
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "用一句话介绍 gpt88.cc"}
  ]
}`

const RESP_NON_STREAM = `{
  "id": "chatcmpl-9f3a2b8c1d4e5f6a",
  "object": "chat.completion",
  "created": 1730000000,
  "model": "claude-opus-4-7",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "gpt88.cc 是一个统一的大模型 API 网关，OpenAI 兼容协议，多模型一站接入。"
      }
    }
  ],
  "usage": {
    "prompt_tokens": 24,
    "completion_tokens": 28,
    "total_tokens": 52
  }
}`

const RESP_STREAM = `data: {"id":"chatcmpl-9f3a","object":"chat.completion.chunk","created":1730000000,"model":"claude-opus-4-7","choices":[{"index":0,"delta":{"role":"assistant","content":""}}]}

data: {"id":"chatcmpl-9f3a","object":"chat.completion.chunk","created":1730000000,"model":"claude-opus-4-7","choices":[{"index":0,"delta":{"content":"gpt88.cc"}}]}

data: {"id":"chatcmpl-9f3a","object":"chat.completion.chunk","created":1730000000,"model":"claude-opus-4-7","choices":[{"index":0,"delta":{"content":" 是一个统一的大模型 API 网关。"}}]}

data: {"id":"chatcmpl-9f3a","object":"chat.completion.chunk","created":1730000000,"model":"claude-opus-4-7","choices":[{"index":0,"finish_reason":"stop","delta":{}}]}

data: [DONE]`

const TABS_BASIC = [
  {
    label: 'cURL',
    lang: 'bash',
    code: `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-opus-4-7",
    "messages": [
      {"role": "user", "content": "用一句话介绍 gpt88.cc"}
    ]
  }'`,
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
    model="claude-opus-4-7",
    messages=[{"role": "user", "content": "用一句话介绍 gpt88.cc"}],
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
  model: "claude-opus-4-7",
  messages: [{ role: "user", content: "用一句话介绍 gpt88.cc" }],
});
console.log(resp.choices[0].message.content);`,
  },
]

const TABS_STREAM = [
  {
    label: 'cURL',
    lang: 'bash',
    code: `curl -N https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-opus-4-7",
    "stream": true,
    "messages": [{"role": "user", "content": "讲一个关于 API 网关的冷笑话"}]
  }'`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `stream = client.chat.completions.create(
    model="claude-opus-4-7",
    stream=True,
    messages=[{"role": "user", "content": "讲一个关于 API 网关的冷笑话"}],
)
for chunk in stream:
    delta = chunk.choices[0].delta.content or ""
    print(delta, end="", flush=True)`,
  },
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `const stream = await client.chat.completions.create({
  model: "claude-opus-4-7",
  stream: true,
  messages: [{ role: "user", content: "讲一个关于 API 网关的冷笑话" }],
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0].delta.content ?? "");
}`,
  },
]

const TABS_TOOLS = [
  {
    label: 'cURL',
    lang: 'bash',
    code: `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-opus-4-7",
    "messages": [{"role": "user", "content": "上海今天天气怎么样？"}],
    "tools": [{
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "查询某地的当前天气",
        "parameters": {
          "type": "object",
          "properties": {
            "city": {"type": "string"}
          },
          "required": ["city"]
        }
      }
    }],
    "tool_choice": "auto"
  }'`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "查询某地的当前天气",
        "parameters": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
        },
    },
}]

resp = client.chat.completions.create(
    model="claude-opus-4-7",
    messages=[{"role": "user", "content": "上海今天天气怎么样？"}],
    tools=tools,
    tool_choice="auto",
)
print(resp.choices[0].message)`,
  },
]

export default function ChatCompletionsPage() {
  const { locale } = useLocale()
  if (locale === 'en') return <ChatCompletionsPageEn />
  const copy = getApiCopy(locale, 'chat', { title: 'POST /v1/chat/completions', description: '对话补全主接口。完全兼容 OpenAI 协议，可在流式与非流式之间切换，支持 function calling 与多模态内容。', intro: '这是用于聊天、多模态输入和 tools/function calling 的 OpenAI 兼容接口。' })
  const ui = CHAT_UI_COPY[locale] ?? CHAT_UI_COPY.zh

  const keyUrl = buildAgentActivationUrl({
    locale,
    surface: 'api_chat_completions_auth',
    intent: 'openai_api',
    destination: 'keys',
  })

  return (
    <DocPage
      path="/docs/api/chat-completions"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'endpoint', text: ui.endpoint, level: 2 },
        { id: 'request', text: ui.request, level: 2 },
        { id: 'message', text: ui.message, level: 3 },
        { id: 'example', text: ui.example, level: 2 },
        { id: 'response', text: ui.response, level: 2 },
        { id: 'response-fields', text: ui.responseFields, level: 3 },
        { id: 'streaming', text: ui.streaming, level: 2 },
        { id: 'tools', text: ui.tools, level: 2 },
        { id: 'errors', text: ui.errors, level: 2 },
      ]}
    >
      <p>{copy.intro}</p>
      <h2 id="endpoint">{ui.endpoint}</h2>
      <EndpointBadge method="POST" path="https://api.gpt88.cc/v1/chat/completions" />

      {/*
       * Human msg-20260509-jwfia3 要求文档明确引导用户到 gpt88.cc 控制台获取 API Key。
       * 这里把鉴权说明从"使用你的 gpt88 Key"改写为带控制台外链的版本，
       * 让读者在认证段落直接看到去哪取 Key。
       */}
      <p>
        所有请求需在 HTTP Header 中携带{' '}
        <code>Authorization: Bearer &lt;API_KEY&gt;</code>。请在{' '}
        <a
          href={keyUrl}
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 hover:text-violet-200"
        >
          Agent API Keys
        </a>{' '}
        控制台「API Keys」页面创建一把 Key 后填入。
      </p>

      <Callout tone="warn" title={ui.pricing}>
        <p>
          不同账号、不同模型的单价、速率限制、并发上限和 SLA 都由控制台与后端配置动态下发。
          本页面只描述协议字段；具体数字以 gpt88.cc 控制台为准。
        </p>
      </Callout>

      <h2 id="request">{ui.request}</h2>
      <p>{ui.requestBody}</p>
      <FieldTable rows={REQ_BODY} />

      <h3 id="message">{ui.message}</h3>
      <FieldTable rows={MESSAGE_FIELDS} />

      <h2 id="example">{ui.example}</h2>
      <p>{ui.simple}</p>

      <CodeBlock lang="json" filename="request body" code={REQUEST_BODY} />
      <CodeTabs tabs={TABS_BASIC} />

      <h2 id="response">{ui.response}</h2>
      <p>非流式响应直接返回完整 JSON：</p>
      <CodeBlock lang="json" filename="200 OK" code={RESP_NON_STREAM} />

      <h3 id="response-fields">{ui.responseFields}</h3>
      <FieldTable rows={RESP_FIELDS} />

      <h2 id="streaming">{ui.streaming}</h2>
      <p>
        将 <code>stream</code> 置为 <code>true</code> 后，服务端会以
        <code>text/event-stream</code> 推送增量。每条事件是一行
        <code>data: {'{...}'}</code> JSON，最后以 <code>data: [DONE]</code> 结束。
      </p>

      <CodeTabs tabs={TABS_STREAM} />

      <p>响应片段（精简）：</p>
      <CodeBlock lang="text" filename="event-stream" code={RESP_STREAM} />

      <Callout tone="tip" title="使用 SSE 时记得设置较长的读超时">
        <p>
          流式响应可能持续数十秒。HTTP 客户端如果默认 30s 读超时，
          请显式调高（cURL 加 <code>-N</code> 关闭缓冲，Python <code>requests</code> 设置
          <code>timeout=(5, 300)</code> 等）。
        </p>
      </Callout>

      <h2 id="tools">{ui.tools}</h2>
      <p>
        模型可以根据用户请求决定调用某个工具，并在响应中返回
        <code>tool_calls</code>。在收到调用后，由你的应用执行工具并把结果作为
        <code>role: "tool"</code> 消息回传给模型，再发起下一轮请求。
      </p>
      <CodeTabs tabs={TABS_TOOLS} />

      <h2 id="errors">{ui.errors}</h2>
      <p>
        所有错误均以统一结构返回。HTTP 状态码遵循 OpenAI 协议惯例，
        详细码表请参阅 <Link to="/docs/api/errors/">错误码</Link> 页。
      </p>

      <CodeBlock
        lang="json"
        filename="429 Too Many Requests"
        code={`{
  "error": {
    "type": "rate_limit_error",
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded for model claude-opus-4-7",
    "param": null
  }
}`}
      />
    </DocPage>
  )
}
