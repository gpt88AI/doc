import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'
import { useLocale } from '../../../lib/locale'
import Gpt88AiProxyPageEn from '../../en/Gpt88AiProxyPageEn'

const QUICK_CONFIG = `标准 API Base URL:
https://api.gpt88.cc

图片 / 视频直连 Base URL:
https://img.gpt88.cc

标准 API 使用 /v1/...；Gemini 原生图片使用 /v1beta/...`

const CURL_EXAMPLE = `export GPT88_API_KEY="sk-你的-gpt88-api-key"

curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5-2-chat-latest",
    "messages": [
      {"role": "user", "content": "用一句话介绍 gpt88 AI 中转站"}
    ]
  }'`

const COST_MINDSET = `传统积分盘：
充值 → 换算虚拟额度 / 刀 / 积分 → 模型倍率 → 用户自己反推真实成本

gpt88.cc：
充值 1 元 = 账户 1 元余额
实际扣费（元）= 官方用量（美元）× 所选分组倍率
分组倍率显示在「API 密钥」页面的分组选择处
不同分组对应不同上游线路与稳定性，倍率越低单位用量越便宜`

const TOOL_MAP = `OpenAI SDK / Cursor / Cline / ChatBox / Cherry Studio:
  Base URL: https://api.gpt88.cc

Claude Code / Anthropic SDK:
  Base URL: https://api.gpt88.cc

Gemini 图片生成 / NanoBanana2:
  Base URL: https://img.gpt88.cc
  Endpoint: /v1beta/models/{MODEL}:generateContent`

const CHECKLIST = `接入前检查：

1. 已注册 gpt88.cc 账号
2. 已在控制台创建 API Key
3. 已确认工具属于 OpenAI 兼容还是 Claude 兼容
4. 已复制真实模型 ID
5. 已选择默认线路
6. 已准备一条最小测试请求
7. 已知道用量、价格、限速以控制台为准`

const FAQ = `Q: gpt88 AI 中转站是不是只能转 OpenAI？
A: 不是。gpt88.cc 面向多模型统一接入，文档示例默认使用 OpenAI 兼容协议，同时也覆盖 Claude / Anthropic 风格、Google / Gemini 图片生成等接入方式。

Q: OpenAI 兼容工具应该填哪个 Base URL？
A: 通常填 https://api.gpt88.cc。

Q: Claude Code 应该填哪个 Base URL？
A: 统一填 https://api.gpt88.cc，接口路径和请求格式按 Claude / Anthropic 兼容要求配置。

Q: 1 元等于多少刀或多少积分？倍率怎么算？
A: 充值 1 元就是账户 1 元余额。实际扣费（元）= 官方用量（美元）× 所选分组倍率；分组倍率在 API 密钥页面的分组选择处查看，具体用量和扣费以控制台为准。

Q: 模型价格、限速和上下文长度能不能写死？
A: 不建议。模型政策、上游能力和账号权限会变化，准确值应以 gpt88.cc 控制台当前配置为准。

Q: 文档中的 Base URL 应该使用哪个？
A: 标准文本、Claude、音频等 API 使用 https://api.gpt88.cc；图片和视频直连使用 https://img.gpt88.cc。其他协议差异通过 endpoint、请求头和请求体字段处理。`

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[46rem] text-left text-sm">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-4 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className={
                'border-t border-white/5 align-top' +
                (i % 2 === 1 ? ' bg-white/[0.012]' : '')
              }
            >
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Gpt88AiProxyPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <Gpt88AiProxyPageEn />

  return (
    <DocPage
      path="/docs/guides/gpt88-ai-proxy"
      title="gpt88 AI 中转站：OpenAI、Claude、Gemini 多模型统一 API 接入指南"
      description="gpt88 AI 中转站是一套面向开发者的 AI API 中转与统一大模型网关，支持 OpenAI 兼容接口、Claude API 中转、Gemini 图片生成、国内直连、海外线路和人民币透明计费。"
      headings={[
        { id: 'intro', text: '什么是 gpt88 AI 中转站', level: 2 },
        { id: 'why', text: '为什么需要 AI API 中转站', level: 2 },
        { id: 'features', text: '核心能力', level: 2 },
        { id: 'base-url', text: 'Base URL 选择', level: 2 },
        { id: 'quickstart', text: '快速接入示例', level: 2 },
        { id: 'tools', text: '适合接入哪些工具', level: 2 },
        { id: 'pricing', text: 'Token 电力计费心智', level: 2 },
        { id: 'seo-questions', text: '搜索常见问题', level: 2 },
        { id: 'best-practices', text: '接入建议', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="info" title="一句话概括">
        <p>
          <strong>gpt88 AI 中转站</strong> 是一个统一大模型 API 网关：开发者把
          <code>base_url</code> 指向 gpt88.cc，就可以用一套 OpenAI 兼容或 Claude
          兼容配置接入多家模型，减少不同厂商 API、线路、鉴权和计费方式带来的维护成本。
        </p>
      </Callout>

      <h2 id="intro">什么是 gpt88 AI 中转站</h2>
      <p>
        gpt88.cc 可以理解为面向开发者和团队的 <strong>AI 中转站</strong>、
        <strong>AI API 中转站</strong> 或 <strong>大模型统一网关</strong>。它的目标不是让你重新学习一套协议，
        而是把常见模型调用方式整理成更稳定的接入入口。
      </p>
      <p>
        对已经使用 OpenAI SDK、Claude Code、Cursor、Cline、ChatBox、Cherry Studio、Dify
        等工具的用户来说，最重要的变化通常只有两件事：替换 <code>base_url</code>，
        以及把 API Key 换成 gpt88.cc 控制台生成的 Key。
      </p>

      <h2 id="why">为什么需要 AI API 中转站</h2>
      <p>
        当团队同时使用 GPT、Claude、Gemini、DeepSeek、Qwen、图片模型和视频模型时，
        每家厂商的 endpoint、鉴权方式、错误格式、模型命名和网络线路都可能不同。
        如果每个项目都单独维护一套接入逻辑，迁移成本会持续上升。
      </p>
      <DocTable
        headers={['痛点', '没有中转站时', '使用 gpt88.cc 后']}
        rows={[
          [
            '多模型切换',
            '每家厂商维护不同 SDK、Endpoint 和鉴权方式',
            '优先使用统一 Base URL 和 model 字段切换模型',
          ],
          [
            '国内访问',
            '网络不稳定、团队成员环境差异大',
            '按线路选择默认入口、图片加速入口或海外入口',
          ],
          [
            '工具接入',
            'ChatBox、Cursor、Claude Code、Dify 各配一遍',
            '按 OpenAI 兼容或 Claude 兼容选择对应教程',
          ],
          [
            '成本理解',
            '积分、倍率、虚拟刀换算复杂',
            '按人民币余额和实际模型消耗理解成本',
          ],
        ]}
      />

      <h2 id="features">核心能力</h2>
      <ul>
        <li><strong>OpenAI API 中转</strong>：支持常见 OpenAI 兼容 SDK 和工具，把 <code>base_url</code> 指向 <code>https://api.gpt88.cc</code>。</li>
        <li><strong>Claude API 中转</strong>：Claude / Anthropic 风格工具也统一使用 <code>https://api.gpt88.cc</code>，按对应 endpoint 发送请求。</li>
        <li><strong>Gemini 图片生成</strong>：Google / Gemini 图片生成、NanoBanana2 等图片模型按专用图片接口接入。</li>
        <li><strong>多模型导航</strong>：通过 <Link to="/models/">模型导航</Link> 浏览 Chat、Image、Video、Audio 分类模型。</li>
        <li><strong>工具集成教程</strong>：提供 ChatBox、Cherry Studio、AnythingLLM、Claude Code、Cursor、Cline、Codex CLI、Dify 等教程。</li>
        <li><strong>透明用量心智</strong>：按官方用量乘分组倍率计算人民币扣费，具体用量、扣费、权限和限速以控制台为准。</li>
      </ul>

      <h2 id="base-url">Base URL 选择</h2>
      <p>
        搜索“gpt88 AI 中转站怎么接入”时，最常见的问题就是 Base URL 填错。
        标准文本与 Claude 兼容工具使用 <code>https://api.gpt88.cc</code>；图片和视频直连使用
        <code>https://img.gpt88.cc</code>。协议差异仍通过 endpoint 路径和请求格式处理。
      </p>
      <CodeBlock lang="text" filename="base-url-map" code={QUICK_CONFIG} />
      <CodeBlock lang="text" filename="tool-map" code={TOOL_MAP} />

      <h2 id="quickstart">快速接入示例</h2>
      <p>
        如果你只想验证 gpt88 AI 中转站是否能调用模型，优先使用 cURL 发一条最小请求。
        cURL 能通以后，再去配置 SDK、桌面客户端或 Agent 工具。
      </p>
      <CodeBlock lang="bash" filename="gpt88-ai-proxy-smoke-test.sh" code={CURL_EXAMPLE} />
      <p>
        更完整的 SDK 示例可以继续看 <Link to="/docs/sdk/python/">Python SDK</Link>、
        <Link to="/docs/sdk/nodejs/">Node.js SDK</Link> 和 <Link to="/docs/sdk/curl/">cURL</Link> 文档。
      </p>

      <h2 id="tools">适合接入哪些工具</h2>
      <DocTable
        headers={['工具 / 场景', '推荐入口', '说明']}
        rows={[
          [
            'OpenAI SDK / cURL / Cursor / Cline',
            <code key="openai">https://api.gpt88.cc</code>,
            '按 OpenAI 兼容协议接入，通常只改 base_url 和 api_key。',
          ],
          [
            'Claude Code / Anthropic SDK',
            <code key="claude">https://api.gpt88.cc</code>,
            '按 Claude / Anthropic 风格接入，Base URL 使用标准 API 地址。',
          ],
          [
            'Gemini 图片 / Image / Video',
            <code key="media">https://img.gpt88.cc</code>,
            '使用图片与多媒体直连地址，并按接口文档填写 /v1 或 /v1beta 路径。',
          ],
          [
            'ChatBox / Cherry Studio / AnythingLLM',
            <Link key="integrations" to="/docs/integrations/">集成指南</Link>,
            '适合桌面聊天、知识库和多模型管理。',
          ],
          [
            'Dify / 工作流平台',
            <Link key="dify" to="/docs/integrations/platforms/dify/">Dify 接入教程</Link>,
            '适合应用、工作流、知识库和 Agent 编排。',
          ],
          [
            'Gemini / NanoBanana2 图片生成',
            <Link key="images" to="/docs/api/images/">Google 图片生成 API</Link>,
            '图片模型使用 Google / Gemini 原生兼容接口，不要套用普通文本模型接口。',
          ],
        ]}
      />

      <h2 id="pricing">Token 电力计费心智</h2>
      <Callout tone="danger" title="重要：分组倍率决定实际扣费">
        <p>
          倍率表示每消耗 $1 官方 API 额度时，从余额扣除的人民币金额。
          实际扣费（元）= 官方用量（美元）× 该分组倍率；倍率 2.0 扣 ¥2.0，倍率 0.5 扣 ¥0.5。
          分组倍率越低，单位用量越便宜。
        </p>
        <p>
          倍率在「API 密钥」页面的分组选择处查看。不同分组对应不同上游线路与稳定性，
          可按需要切换。充值为 1:1 折算，充值 ¥1 = 余额 1.00；页面以 <code>$</code> 符号显示时，实际单位为人民币。
        </p>
        <p>
          查找模型和价格时，可查看
          <a className="text-cyan-300 hover:text-cyan-200" href="https://agent.gpt88.cc/model-square" target="_blank" rel="noreferrer">大模型广场</a>，
          或打开
          <a className="text-cyan-300 hover:text-cyan-200" href="https://gpt88.cc/pricing" target="_blank" rel="noreferrer">官网定价页面</a>。
          账户实际可用模型、分组倍率和最终扣费仍以控制台为准。
        </p>
      </Callout>
      <CodeBlock lang="text" filename="token-power" code={COST_MINDSET} />
      <p>
        你需要关注三个信息：官方用了多少额度、当前 API Key 选择了哪个分组、控制台记录了多少人民币扣费。
        充值余额不是积分，页面的 <code>$</code> 符号也不改变其人民币计价口径。
      </p>

      <h2 id="seo-questions">搜索常见问题</h2>
      <CodeBlock lang="text" filename="gpt88-ai-proxy-faq" code={FAQ} />

      <h2 id="best-practices">接入建议</h2>
      <CodeBlock lang="text" filename="checklist" code={CHECKLIST} />
      <ul>
        <li>第一次接入先用轻量模型跑通，不要一开始就接复杂工作流。</li>
        <li>每个项目或工具单独创建 API Key，便于统计、限额和停用。</li>
        <li>把模型 ID 从 <Link to="/models/">模型导航</Link> 或 <Link to="/docs/api/list-models/">GET /v1/models</Link> 复制，不要凭记忆手写。</li>
        <li>生产环境不要把 API Key 写到前端代码里，应放在服务端或安全配置里。</li>
        <li>遇到 401、404、429、503 时，先看 <Link to="/docs/api/errors/">错误码</Link>，再排查模型名、Base URL、余额和限速。</li>
      </ul>

      <h2 id="next">下一步</h2>
      <ul>
        <li>如果你是第一次接入，先看 <Link to="/docs/quickstart/">快速开始</Link>。</li>
        <li>如果你要迁移完整项目，看 <Link to="/docs/guides/complete-integration/">完整接入手册</Link>。</li>
        <li>如果你要配置具体客户端，看 <Link to="/docs/integrations/">集成指南</Link>。</li>
        <li>如果你要了解认证、余额和扣费，看 <Link to="/docs/auth/">认证与计费</Link>。</li>
      </ul>
    </DocPage>
  )
}
