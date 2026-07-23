import { CodeBlock } from '../ui/CodeBlock'
import type { SeoIntentKey } from './SeoIntentMeta'

type SeoIntentContent = {
  problem: string
  config: string
  errors: string[]
  pricing: string
}

const CTA_CAMPAIGN = 'seo_quickstart_2026q3'

const CONTENT: Record<SeoIntentKey, SeoIntentContent> = {
  'openai-sdk': {
    problem: '已有 OpenAI SDK 的项目通常不需要重写业务逻辑，只需要替换 base_url、API Key 和实际可用的模型名。',
    config: 'OPENAI_API_KEY=sk-替换为你创建的Key\nOPENAI_BASE_URL=https://api.gpt88.cc/v1\nOPENAI_MODEL=gpt-5.6-sol',
    errors: ['401：检查 Bearer API Key 格式，不要使用网页登录密码。', '404：确认 base_url 只到 /v1，SDK 会自动拼接资源路径。', '400 model_not_found：从当前模型目录复制精确模型名。', '429：降低并发并按响应提示退避，不要无限重试。'],
    pricing: 'GPT88 新站使用人民币余额。模型、分组倍率和输入输出用量会影响实际扣费，固定套餐或单价以控制台当前页面为准。',
  },
  python: {
    problem: 'Python 接入最容易出错的是 base_url、环境变量、模型名和流式响应读取方式。下面的配置使用 OpenAI 官方 SDK。',
    config: 'python -m pip install --upgrade openai\nexport OPENAI_API_KEY=sk-替换为你创建的Key\nexport OPENAI_BASE_URL=https://api.gpt88.cc/v1\nexport OPENAI_MODEL=gpt-5.6-sol',
    errors: ['ModuleNotFoundError：确认当前虚拟环境已安装 openai。', '401：检查 Key 是否为空、带空格或被错误环境变量覆盖。', '404：base_url 使用 /v1，不要把 /chat/completions 重复写入。', '流式没有文字：读取 chunk.choices[0].delta.content。'],
    pricing: '请求按人民币余额结算，不同模型和分组可能有不同倍率；输入、输出、图片和视频请求以控制台实时计费规则为准。',
  },
  nodejs: {
    problem: 'Node.js 项目需要在服务端设置 baseURL 和环境变量。API Key 不应进入浏览器打包产物或公开仓库。',
    config: 'npm install openai\nexport OPENAI_API_KEY=sk-替换为你创建的Key\nexport OPENAI_BASE_URL=https://api.gpt88.cc/v1\nexport OPENAI_MODEL=gpt-5.6-sol',
    errors: ['401：确认请求头使用 Bearer Key 且没有多余换行。', 'ECONNREFUSED：检查服务器到 api.gpt88.cc:443 的 DNS、TLS 和代理。', '404：baseURL 只保留 /v1，让 SDK 拼接资源路径。', '超时：先用短 prompt 验证链路，再调整 timeout。'],
    pricing: 'GPT88 部分按人民币余额、模型、分组倍率和输入输出用量扣费；不要用第三方公开报价推算账户实际消耗。',
  },
  'claude-code': {
    problem: 'Claude Code 需要区分模型调用和 OAuth 插件能力。模型调用至少需要 OpenAI 兼容地址、API Key 和模型名。',
    config: 'export OPENAI_API_KEY=sk-替换为你创建的Key\nexport OPENAI_BASE_URL=https://api.gpt88.cc/v1\nexport OPENAI_MODEL=gpt-5.6-sol',
    errors: ['变量缺失：在启动 Claude Code 的同一个 shell 中检查环境变量。', '401：重新复制 API Key，不要填网页登录密码。', '404 model：从 GPT88 模型目录复制可用模型名。', '工具调用失败：先用纯文本请求验证端点，再确认客户端版本和协议支持。'],
    pricing: 'Claude Code 的多轮上下文会增加输入用量。GPT88 按人民币余额和当前模型/分组倍率结算，最终以使用记录为准。',
  },
  cursor: {
    problem: 'Cursor 的提供商配置和网页登录是两件事。OpenAI Compatible 配置至少需要 API Base URL、API Key 和模型名。',
    config: 'API Base URL: https://api.gpt88.cc/v1\nAPI Key: sk-替换为你创建的Key\nModel: gpt-5.6-sol',
    errors: ['保存后未授权：完全重启 Cursor 并确认没有旧环境变量覆盖。', '404：Base URL 只到 /v1，不要填写 /chat/completions。', '模型为空：先用 cURL 验证模型，再检查 Cursor 的自定义模型支持。', '不要把 Key 放进网页前端代码。'],
    pricing: 'Cursor 订阅和 GPT88 API 用量是两笔账。GPT88 按人民币余额、模型和分组倍率扣费，以控制台使用记录为准。',
  },
  cline: {
    problem: 'Cline 的 Provider、Base URL、Model ID 和 API Key 必须同时匹配。建议先发一个短问题，再开启长上下文和工具。',
    config: 'Provider: OpenAI Compatible\nBase URL: https://api.gpt88.cc/v1\nAPI Key: sk-替换为你创建的Key\nModel ID: gpt-5.6-sol',
    errors: ['401：确认粘贴的是 API Key，不是账户密码或带空格的文本。', '404：检查 Base URL 是否只有 https://api.gpt88.cc/v1。', 'model_not_found：Model ID 必须与模型目录完全一致。', '工具任务失败：先关闭自动批准，用短文本验证后再逐项开启工具。'],
    pricing: 'Cline 不改变 GPT88 的计费规则。请求按人民币余额、模型、分组倍率及输入输出用量结算，长上下文和工具循环会增加消耗。',
  },
  'model-price-comparison': {
    problem: '比较 GPT、Claude、Gemini 时不能只看一个每次请求价格。输入/输出单位、上下文档位、图片或视频计费项都可能不同。',
    config: 'provider: GPT / Claude / Gemini\nmodel: 从当前模型目录复制\ninput_tokens: 统一测试长度\noutput_tokens: 统一 max_tokens',
    errors: ['不要把官方厂商标价直接当成 GPT88 实际扣费。', '忽略输出 token 会低估长回答成本。', '图片和视频请求应使用独立单位比较。', '至少固定 prompt 并记录多次请求的 p50/p90 消耗。'],
    pricing: 'GPT88 新站使用人民币余额，1 元就是账户内 1 元余额。发布价格比较前必须从同一日期的官方价格页和 GPT88 控制台取数，避免写入过期数字。',
  },
  'legacy-migration': {
    problem: '旧站入口、Agent 控制台和 API 端点不是同一个地址。迁移应先确认账户入口，再创建 API Key 并完成一次成功请求。',
    config: '账户入口: https://agent.gpt88.cc\nAPI 端点: https://api.gpt88.cc/v1\n认证头: Authorization: Bearer <API_KEY>',
    errors: ['登录成功但没有 Key：API Key 需要在 Agent API Keys 页面单独创建。', '401：不要把旧站密码当作 API Key。', '404：程序端使用 api.gpt88.cc/v1，不要请求 agent.gpt88.cc。', '余额或模型不一致：以新站当前账户和使用记录为准。'],
    pricing: '迁移不会自动承诺旧站套餐或余额继承。新站按人民币余额结算，实际扣费受模型、分组倍率和输入输出用量影响。',
  },
  'first-request-failed': {
    problem: 'API Key 创建成功不等于链路验证完成。第一次失败通常来自错误主机、认证头、模型名、余额或客户端解析。',
    config: 'export OPENAI_API_KEY=sk-替换为你创建的Key\nexport OPENAI_BASE_URL=https://api.gpt88.cc/v1\nexport OPENAI_MODEL=gpt-5.6-sol',
    errors: ['401：重新复制 Key，确认 Bearer 后有空格且 Key 未撤销。', '404：主机为 api.gpt88.cc，路径为 /v1/chat/completions。', '400 model_not_found：从当前模型目录复制模型名和分组。', '429：降低并发并退避，不要连续创建大量 Key。', '超时：先用 cURL 验证 DNS、TLS 和代理。'],
    pricing: '成功请求才按当前模型、分组和用量结算。GPT88 使用人民币余额，排障时应记录一次成功请求的模型、用量和余额变化作为成本基线。',
  },
  'openai-compatible-errors': {
    problem: 'OpenAI 兼容只保证请求形状相近，不代表所有模型支持相同参数或工具协议。排障应先读取 HTTP 状态、错误 code 和 request_id。',
    config: 'Base URL: https://api.gpt88.cc/v1\nHeader: Authorization: Bearer <API_KEY>\nPath: /chat/completions\nModel: 从当前模型目录复制',
    errors: ['400 invalid_request_error：检查 JSON、必填字段和模型支持的参数。', '401 authentication_error：检查 Key 和 Bearer 格式。', '404：检查 /v1 前缀、资源路径和模型精确名称。', '429：降低并发并设置最大重试次数。', '500/502/503：保存 request_id、时间和模型后再提交最小复现。'],
    pricing: '成功请求按人民币余额、模型、分组倍率和输入输出用量结算；图片与视频可能使用独立计费项，不要仅按 HTTP 状态自行推算扣费。',
  },
}

const CURL = `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"gpt-5.6-sol","messages":[{"role":"user","content":"返回 OK"}],"max_tokens":32}'`

const PYTHON = `import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["OPENAI_API_KEY"],
    base_url=os.getenv("OPENAI_BASE_URL", "https://api.gpt88.cc/v1"),
)
response = client.chat.completions.create(
    model=os.getenv("OPENAI_MODEL", "gpt-5.6-sol"),
    messages=[{"role": "user", "content": "返回 OK"}],
    max_tokens=32,
)
print(response.choices[0].message.content)`

const NODE = `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL ?? "https://api.gpt88.cc/v1",
});
const response = await client.chat.completions.create({
  model: process.env.OPENAI_MODEL ?? "gpt-5.6-sol",
  messages: [{ role: "user", content: "返回 OK" }],
  max_tokens: 32,
});
console.log(response.choices[0].message.content);`

function ctaUrl(utmContent: SeoIntentKey) {
  const url = new URL('https://gpt88.cc/register')
  url.searchParams.set('utm_source', 'docs')
  url.searchParams.set('utm_medium', 'organic')
  url.searchParams.set('utm_campaign', CTA_CAMPAIGN)
  url.searchParams.set('utm_content', utmContent)
  return url.toString()
}

export function SeoIntentSections({ intent }: { intent: SeoIntentKey }) {
  const content = CONTENT[intent]
  return (
    <>
      <h2 id={`${intent}-problem`}>问题是什么</h2>
      <p>{content.problem}</p>

      <h2 id={`${intent}-config`}>最短可用配置</h2>
      <CodeBlock lang="bash" filename=".env" code={content.config} />
      <p>
        API Key 只放在服务端环境变量或密钥管理器中，不要提交到 Git、截图、浏览器前端或公开 issue。
      </p>

      <h2 id={`${intent}-examples`}>完整示例（curl / Python / Node.js）</h2>
      <CodeBlock lang="bash" filename="request.sh" code={CURL} />
      <CodeBlock lang="python" filename="request.py" code={PYTHON} />
      <CodeBlock lang="javascript" filename="request.mjs" code={NODE} />

      <h2 id={`${intent}-errors`}>常见错误</h2>
      <ul>
        {content.errors.map(error => <li key={error}>{error}</li>)}
      </ul>

      <h2 id={`${intent}-pricing`}>价格和计费说明</h2>
      <p>{content.pricing}</p>

      <h2 id={`${intent}-cta`}>立即创建 API Key</h2>
      <div className="not-prose my-6 rounded-xl border border-violet-400/30 bg-violet-400/[0.08] p-5">
        <a
          href={ctaUrl(intent)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg bg-violet-400 px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-violet-300"
        >
          注册 GPT88 并完成第一次 API 请求
        </a>
      </div>
    </>
  )
}
