import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'

/**
 * 文档：快速开始
 *
 * 目标：访客打开后 5 分钟内能跑通一次成功的请求。
 * 因此结构必须线性、命令必须可直接复制、一定要给出预期返回片段。
 *
 * Human msg-20260509-jwfia3 + msg-20260509-qoz7ey 确认：
 * base_url 默认 https://gpt88.cc/v1；china.claudecoder.me 与 world.claudecoder.me
 * 是等价端点，文档示例使用默认端点，并在「可选服务端点」段落把三者一起列出。
 *
 * Human 历史决策：站内主推模型口径已切到 Claude/GPT 系列，
 * 文档默认示例需与产品导向一致；长尾模型仍保留于模型导航，不作为默认示例。
 *
 * 注意：M2 任务会扩展更全的 SDK 章节（Python / Node 完整示例 + 错误处理）。
 */

const CURL_REQ = `curl https://gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-opus-4-7",
    "stream": false,
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "用一句话介绍 gpt88.cc"}
    ]
  }'`

const CURL_RESP = `{
  "id": "chatcmpl-xxxxxxxx",
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

const PY = `from openai import OpenAI

client = OpenAI(
    base_url="https://gpt88.cc/v1",
    api_key="YOUR_GPT88_API_KEY",
)

resp = client.chat.completions.create(
    model="claude-opus-4-7",
    messages=[
        {"role": "user", "content": "用一句话介绍 gpt88.cc"},
    ],
)

print(resp.choices[0].message.content)`

const NODE = `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://gpt88.cc/v1",
  apiKey: process.env.GPT88_API_KEY,
});

const resp = await client.chat.completions.create({
  model: "claude-opus-4-7",
  messages: [{ role: "user", content: "用一句话介绍 gpt88.cc" }],
});

console.log(resp.choices[0].message.content);`

export default function QuickstartPage() {
  return (
    <DocPage
      path="/docs/quickstart"
      title="快速开始"
      description="5 分钟内完成第一次 gpt88.cc 模型调用。无需改造已有 OpenAI 代码，只需替换 base_url 与 API Key。"
      headings={[
        { id: 'prereq', text: '准备 API Key', level: 2 },
        { id: 'endpoints', text: '可选服务端点', level: 2 },
        { id: 'curl', text: '使用 cURL 发送请求', level: 2 },
        { id: 'sdk', text: '使用官方 SDK', level: 2 },
        { id: 'python', text: 'Python', level: 3 },
        { id: 'node', text: 'Node.js', level: 3 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <h2 id="prereq">准备 API Key</h2>
      {/*
       * Human msg-20260509-jwfia3 要求文档明确引导用户到 gpt88.cc 控制台获取 API Key。
       * 在「准备 API Key」段落开头加一段引导，让首次到达本页的读者立刻知道
       * 应该去哪个域名注册、在控制台哪一页创建 Key，再回来粘贴使用。
       */}
      <p>
        请前往{' '}
        <a
          href="https://gpt88.cc"
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 hover:text-violet-200"
        >
          https://gpt88.cc
        </a>{' '}
        控制台注册并创建 API Key，再回到本页把它粘贴到下面的环境变量里使用。
      </p>
      <ol>
        <li>
          登录{' '}
          <a
            href="https://gpt88.cc"
            target="_blank"
            rel="noreferrer"
            className="text-violet-300 hover:text-violet-200"
          >
            gpt88.cc
          </a>{' '}
          控制台，前往「API Keys」页面创建一把新的密钥；
        </li>
        <li>
          把它注入本地环境变量，避免泄露到代码仓库：
        </li>
      </ol>
      <CodeBlock
        lang="bash"
        code={`export GPT88_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx`}
      />
      <p>
        提示：所有调用都通过统一域名 <code>gpt88.cc</code>，端口 443，HTTPS。
      </p>

      {/*
       * Human msg-20260509-jwfia3 + msg-20260509-qoz7ey 确认：
       * 三个端点完全等价，文档默认使用 https://gpt88.cc/v1；
       * china.claudecoder.me 服务于中国大陆访问，
       * world.claudecoder.me 服务于海外访问。
       */}
      <h2 id="endpoints">可选服务端点</h2>
      <p>
        gpt88.cc 提供三个完全等价的服务端点，挑选一个最适合你网络环境的即可，
        本文档默认使用 <code>https://gpt88.cc/v1</code>。
      </p>
      <ul>
        <li>
          <code>https://gpt88.cc/v1</code>{' '}
          <span className="text-ink-400">— 默认端点，全球可达。</span>
        </li>
        <li>
          <code>https://china.claudecoder.me/v1</code>{' '}
          <span className="text-ink-400">— 中国大陆优先线路。</span>
        </li>
        <li>
          <code>https://world.claudecoder.me/v1</code>{' '}
          <span className="text-ink-400">— 海外优先线路。</span>
        </li>
      </ul>
      <p>
        三个端点完全等价：<strong>API Key、模型、协议、字段都一致</strong>，
        只是接入网络不同。如需切换，只要把 <code>base_url</code>（或 cURL URL 前缀）
        改成对应域名即可，<strong>无需重新生成 API Key</strong>。
      </p>

      <h2 id="curl">使用 cURL 发送请求</h2>
      <p>下面这条命令会向 <code>claude-opus-4-7</code> 发起一次非流式 chat completion：</p>
      <CodeBlock lang="bash" code={CURL_REQ} />

      <p>预期返回（精简示意，字段顺序可能略有不同）：</p>
      <CodeBlock lang="json" code={CURL_RESP} />

      <h2 id="sdk">使用官方 SDK</h2>
      <p>
        gpt88.cc 完全兼容 OpenAI 协议。任何支持 OpenAI 的官方/社区 SDK，
        只要把 <code>base_url</code> 指向 <code>https://gpt88.cc/v1</code> 即可使用。
      </p>

      <h3 id="python">Python</h3>
      <CodeBlock lang="python" filename="main.py" code={PY} />

      <h3 id="node">Node.js</h3>
      <CodeBlock lang="typescript" filename="index.ts" code={NODE} />

      <h2 id="next">下一步</h2>
      {/*
       * 站内深链统一使用 react-router-dom 的 <Link>，避免在 BrowserRouter
       * 下走整页刷新；并且即使部署环境没有 SPA rewrite，
       * 通过 Link 跳转也不会触发服务端 404（因为只走前端路由）。
       * 这里三条都是站内绝对路径，全部从 <a href> 改为 <Link to>。
       */}
      <ul>
        <li>查看完整的 <Link to="/docs/api/chat-completions">Chat Completions 接口字段</Link>；</li>
        <li>浏览 <Link to="/models">模型导航</Link>，挑选最适合你场景的模型；</li>
        <li>了解 <Link to="/docs/api/errors">错误码</Link>，让你的客户端在异常情况下更稳健。</li>
        <li>
          把当前配置导出给 Claude Code、Cursor、Python SDK 等工具：
          <Link to="/docs/guides/config-export">配置文件导出</Link>。
        </li>
        <li>
          阅读通用教程，理解 Claude / OpenAI 兼容接入方式：
          <Link to="/docs/guides/gpt88-tutorial">通用教程</Link>。
        </li>
      </ul>
    </DocPage>
  )
}
