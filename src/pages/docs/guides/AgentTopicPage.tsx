import { Link } from 'react-router-dom'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { DocPage } from '../../../components/layout/DocPage'
import { useLocale } from '../../../lib/locale'
import AgentTopicPageEn from '../../en/AgentTopicPageEn'

const AGENT_LOOP = `用户目标
   ↓
读取上下文 → 规划下一步 → 调用模型
                         ↓
                 需要工具？──否──→ 返回结果
                     │是
                     ↓
              执行工具并记录结果
                     ↓
                 继续循环
                     ↓
               验证产出并交付`

const TOOL_CALL_REQUEST = `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "YOUR_MODEL_ID",
    "messages": [
      {"role": "user", "content": "检查项目当前发布状态"}
    ],
    "tools": [{
      "type": "function",
      "function": {
        "name": "get_project_status",
        "description": "读取项目当前环境、版本和发布状态",
        "parameters": {
          "type": "object",
          "properties": {},
          "additionalProperties": false
        }
      }
    }],
    "tool_choice": "auto"
  }'`

const AGENT_WRAPPER = `const state = {
  goal,
  messages: [{ role: "user", content: goal }],
  steps: [],
  maxSteps: 8,
}

while (state.steps.length < state.maxSteps) {
  const response = await callModel(state.messages, tools)
  const toolCalls = response.choices?.[0]?.message?.tool_calls ?? []

  if (toolCalls.length === 0) {
    return verifyAndDeliver(response.choices[0].message.content)
  }

  state.messages.push(response.choices[0].message)
  for (const call of toolCalls) {
    const args = JSON.parse(call.function.arguments || "{}")
    const result = await executeAllowedTool(call.function.name, args)
    state.steps.push({ call, result })
    state.messages.push({
      role: "tool",
      tool_call_id: call.id,
      content: JSON.stringify(result),
    })
  }
}

throw new Error("agent step limit reached")`

const TOPIC_CARDS = [
  {
    title: '快速开始',
    href: '/docs/quickstart/',
    desc: '先用一条最小请求验证 API Key、模型、Base URL 和返回结构。',
  },
  {
    title: '核心概念',
    href: '#concepts',
    desc: '理解 Agent、上下文、工具、循环、状态和权限边界之间的关系。',
  },
  {
    title: '开发者 API',
    href: '/docs/api/chat-completions/',
    desc: '使用 tools / function calling、流式响应和多轮消息构建 Agent 回路。',
  },
  {
    title: '开发工具接入',
    href: '/docs/integrations/',
    desc: '按 Claude Code、Codex CLI、Cursor、Cline、Dify 等工具选择接入路径。',
  },
  {
    title: '可观察性与恢复',
    href: '/docs/guides/harness-inspector/',
    desc: '把意图、Session、文件活动、工具调用和交付结果连接成可检查证据。',
  },
  {
    title: '生产化指南',
    href: '/docs/guides/complete-integration/',
    desc: '补齐密钥管理、模型选择、用量核对、失败重试和发布前验收。',
  },
]

const TOOL_CARDS = [
  {
    title: 'Claude Code',
    href: '/docs/integrations/dev/claude-code/',
    desc: '适合终端里的代码 Agent、项目级上下文和 Claude 风格协议接入。',
  },
  {
    title: 'Codex CLI',
    href: '/docs/integrations/dev/codex-cli/',
    desc: '适合以命令行推进代码修改、工具调用、验证和交付。',
  },
  {
    title: 'Cursor / Cline',
    href: '/docs/integrations/dev/cursor/',
    desc: '适合在编辑器内边读代码边规划、修改、运行和复核。',
  },
  {
    title: 'Dify / AnythingLLM',
    href: '/docs/integrations/platforms/dify/',
    desc: '适合把模型接入应用、工作流、知识库和团队服务。',
  },
]

function CardGrid({
  items,
}: {
  items: { title: string; href: string; desc: string }[]
}) {
  return (
    <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map(item => {
        const external = item.href.startsWith('#')
        const className =
          'tech-card tech-card-hover group flex flex-col rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-violet-500/40 hover:bg-violet-500/[0.06]'

        if (external) {
          return (
            <a key={item.href} href={item.href} className={className}>
              <h3 className="text-base font-semibold text-ink-50 group-hover:text-violet-200">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-300">{item.desc}</p>
              <span className="mt-4 text-sm font-medium text-violet-300">查看本页</span>
            </a>
          )
        }

        return (
          <Link key={item.href} to={item.href} className={className}>
            <h3 className="text-base font-semibold text-ink-50 group-hover:text-violet-200">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-300">{item.desc}</p>
            <span className="mt-4 text-sm font-medium text-violet-300">查看专题内容</span>
          </Link>
        )
      })}
    </div>
  )
}

function SimpleTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(header => (
              <th key={header} className="px-4 py-2.5 font-medium">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={`border-t border-white/5 align-top${rowIndex % 2 === 1 ? ' bg-white/[0.012]' : ''}`}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function AgentTopicPage() {
  const { locale } = useLocale()
  if (locale === 'en') return <AgentTopicPageEn />

  return (
    <DocPage
      path="/docs/guides/agent"
      title="Agent 专题：从第一次调用到可恢复的智能工作流"
      description="围绕 gpt88.cc API 和常用开发工具，建立 Agent 的完整学习路径：先跑通一次请求，再理解工具调用、上下文、循环、权限、可观察性和生产化。"
      headings={[
        { id: 'purpose', text: '这个专题解决什么问题', level: 2 },
        { id: 'definition-of-done', text: '看完后的完成标准', level: 2 },
        { id: 'path', text: '推荐学习路径', level: 2 },
        { id: 'concepts', text: 'Agent 的六个核心概念', level: 2 },
        { id: 'shortest-path', text: '最短成功路径：跑通一个工具调用', level: 2 },
        { id: 'tool-loop', text: '工具调用之后，应用要做什么', level: 3 },
        { id: 'wrapper', text: '把调用封装成可恢复循环', level: 2 },
        { id: 'decision', text: '什么时候用哪种接入方式', level: 2 },
        { id: 'tools', text: '按工具选择接入教程', level: 2 },
        { id: 'reliability', text: '可观察性、权限与恢复', level: 2 },
        { id: 'production', text: '生产化验收清单', level: 2 },
        { id: 'troubleshooting', text: '常见问题与排错顺序', level: 2 },
        { id: 'practice', text: '练习任务', level: 2 },
        { id: 'next', text: '下一步阅读', level: 2 },
      ]}
    >
      <Callout tone="info" title="先完成一个小任务，再扩展 Agent 能力">
        <p>
          Agent 不是“给模型加一个更长的 Prompt”这么简单。一个可用的 Agent 至少需要目标、上下文、模型、工具、执行循环、权限边界和验证方式。本文把这些部分按依赖顺序串起来，先让你获得一个可验证结果，再介绍多工具、自动化和生产部署。
        </p>
      </Callout>

      <h2 id="purpose">这个专题解决什么问题</h2>
      <p>
        如果你只看单个模型或单个客户端，很容易遇到三个断点：API 能调用，但不知道如何让模型使用工具；工具能调用，但没有状态、步数和权限边界；任务能完成，但无法解释过程、恢复失败或复用成功配置。
      </p>
      <p>
        这个专题把 GPT88 现有的 API、模型、开发工具和工程实践文档组织成一条 Agent 学习路线。你可以把它当作 Cocode 式的总入口：先快速开始，再进入核心概念、开发者 API、工具接入、可观察性和排错。
      </p>
      <CardGrid items={TOPIC_CARDS} />

      <h2 id="definition-of-done">看完后的完成标准</h2>
      <p>完成本专题的最小标准不是“读完所有页面”，而是你能够独立完成下面这些动作：</p>
      <ul>
        <li>使用 <code>API Key + Base URL + 模型 ID</code> 跑通一次最小请求；</li>
        <li>给模型声明一个工具，并识别返回中的 <code>tool_calls</code>；</li>
        <li>在本地执行允许的工具，把结果以 <code>role: tool</code> 消息回传；</li>
        <li>给 Agent 设置最大步数、超时、允许动作和人工确认边界；</li>
        <li>记录请求 ID、工具输入、工具输出、失败原因和最终交付物；</li>
        <li>能在 401、404、429、超时或工具失败时，从最小故障点恢复。</li>
      </ul>

      <h2 id="path">推荐学习路径</h2>
      <SimpleTable
        headers={['阶段', '你要获得的能力', '推荐入口']}
        rows={[
          ['1. 快速开始', '创建 Key、获取模型、完成第一条请求', <Link key="quickstart" to="/docs/quickstart/">快速开始</Link>],
          ['2. 核心概念', '理解上下文、工具、循环、状态和权限', <a key="concepts" href="#concepts">本文核心概念</a>],
          ['3. API 构建', '使用 tools、流式响应和多轮消息构建 Agent 回路', <Link key="api" to="/docs/api/chat-completions/">Chat Completions API</Link>],
          ['4. 工具接入', '把同一套模型能力接到 CLI、IDE 或应用平台', <Link key="integrations" to="/docs/integrations/">集成指南</Link>],
          ['5. 可观察性', '检查意图、Session、文件活动、工具结果和提交证据', <Link key="harness" to="/docs/guides/harness-inspector/">Harness Inspector</Link>],
          ['6. 生产化', '管理密钥、用量、失败恢复、发布和团队复用', <Link key="complete" to="/docs/guides/complete-integration/">完整接入手册</Link>],
        ]}
      />

      <h2 id="concepts">Agent 的六个核心概念</h2>
      <SimpleTable
        headers={['概念', '它回答的问题', '最低实践']}
        rows={[
          [<strong key="goal">目标 Goal</strong>, '这次任务最终要交付什么？', '把自然语言目标写成可验收的结果和边界。'],
          [<strong key="context">上下文 Context</strong>, '模型可以依据哪些事实工作？', '只提供任务需要的文件、消息、规则和历史结果。'],
          [<strong key="model">模型 Model</strong>, '谁负责规划、判断和生成下一步？', '通过 <Link to="/docs/api/list-models/">模型列表</Link> 确认当前 Key 可用的模型。'],
          [<strong key="tools">工具 Tools</strong>, '模型可以请求哪些外部动作？', '每个工具写清描述、参数 Schema、权限和失败返回。'],
          [<strong key="loop">循环 Loop</strong>, '工具结果返回后是否继续下一步？', '设置最大步数、超时和停止条件，避免无限调用。'],
          [<strong key="verify">验证 Verify</strong>, '如何知道任务真的完成了？', '用测试、差异、结构检查、人工确认或交付清单验收。'],
        ]}
      />
      <CodeBlock lang="text" filename="agent-loop" code={AGENT_LOOP} />
      <p>
        一个重要边界是：模型只能提出工具调用，真正执行工具的是你的应用或客户端。应用必须校验工具名和参数，决定是否允许执行，再把结构化结果回传给模型。不要把“模型说要执行”直接等同于“动作已经执行”。
      </p>

      <h2 id="shortest-path">最短成功路径：跑通一个工具调用</h2>
      <ol>
        <li>
          <strong>准备输入。</strong>创建 API Key，并通过 <Link to="/docs/api/list-models/">GET /v1/models</Link> 选择当前账号可见的模型。验证：你能拿到一个真实可用的模型 ID。
        </li>
        <li>
          <strong>先跑普通请求。</strong>用 <Link to="/docs/quickstart/">快速开始</Link> 的最小示例确认认证、网络和响应结构没有问题。验证：返回 <code>choices[0].message</code>。
        </li>
        <li>
          <strong>声明一个只读工具。</strong>从“读取项目状态”或“查询任务状态”开始，不要一上来就开放删除、发布或支付动作。验证：请求体包含 <code>tools</code> 和清晰的 JSON Schema。
        </li>
        <li>
          <strong>识别工具调用。</strong>检查 <code>choices[0].message.tool_calls</code>，读取工具名、调用 ID 和 JSON 参数。验证：参数能被 JSON 解析并通过本地 Schema 校验。
        </li>
        <li>
          <strong>执行并回传。</strong>由应用执行允许的只读函数，并把结果作为 <code>role: tool</code> 消息放回同一轮消息历史。验证：下一次模型响应能够引用工具结果。
        </li>
        <li>
          <strong>检查最终结果。</strong>不要只检查模型有没有返回文字，还要验证工具结果、最终结论和交付格式。验证：结果能被人或程序复核。
        </li>
      </ol>

      <h3 id="tool-loop">工具调用之后，应用要做什么</h3>
      <CodeBlock lang="bash" filename="tool-calling-request.sh" code={TOOL_CALL_REQUEST} />
      <Callout tone="tip" title="从只读工具开始">
        <p>
          读取文件、查询状态、列出模型、检查测试结果等工具适合用来验证 Agent 回路。写入文件、执行命令、发布部署、发送消息和修改权限都应加入明确的允许列表，并在高风险动作前保留人工确认。
        </p>
      </Callout>

      <h2 id="wrapper">把调用封装成可恢复循环</h2>
      <p>
        原型阶段可以手动处理一次工具调用；进入真实项目后，需要把循环封装成有状态的执行器。至少保存目标、消息历史、每一步工具调用、工具结果、错误、耗时和最终交付物。
      </p>
      <CodeBlock lang="javascript" filename="agent-loop.js" code={AGENT_WRAPPER} />
      <p>这个示例是工作流骨架，不是可以直接复制到生产环境的完整 SDK。生产实现还需要加入：</p>
      <ul>
        <li>参数 Schema 校验和工具白名单；</li>
        <li>超时、重试、指数退避和幂等键；</li>
        <li>敏感数据脱敏、日志保留和终端用户标识；</li>
        <li>最大步骤数、最大成本或资源预算；</li>
        <li>失败后继续、暂停等待人工确认或安全回滚的策略。</li>
      </ul>

      <h2 id="decision">什么时候用哪种接入方式</h2>
      <SimpleTable
        headers={['你的目标', '优先选择', '原因与取舍']}
        rows={[
          ['验证 API 是否可用', <Link key="curl" to="/docs/sdk/curl/">cURL</Link>, '依赖最少、问题边界清晰，适合第一条请求和健康检查。'],
          ['构建自己的 Agent 服务', <Link key="sdk" to="/docs/sdk/python/">Python SDK</Link>, '适合封装状态、工具循环、重试和测试；需要自行设计执行器。'],
          ['在 JavaScript 应用中接入', <Link key="node" to="/docs/sdk/nodejs/">Node.js SDK</Link>, '适合服务端、队列和 Web 应用；注意不要把 API Key 暴露到浏览器。'],
          ['直接使用成熟代码 Agent', <Link key="cli" to="/docs/integrations/dev/codex-cli/">Codex CLI</Link>, '最快获得文件、命令和验证工作流；可控性取决于工具权限和配置。'],
          ['在 IDE 内协作开发', <Link key="cursor" to="/docs/integrations/dev/cursor/">Cursor</Link>, '适合边看代码边修改；需要保留 diff、测试和人工审阅。'],
          ['接入知识库或业务应用', <Link key="dify" to="/docs/integrations/platforms/dify/">Dify</Link>, '适合编排工作流和应用；复杂工具权限仍需在业务层控制。'],
        ]}
      />

      <h2 id="tools">按工具选择接入教程</h2>
      <CardGrid items={TOOL_CARDS} />
      <p>
        如果你还没有决定使用哪个工具，先选择能最快完成一次可验证任务的入口：终端优先 Codex CLI 或 Claude Code，编辑器优先 Cursor 或 Cline，应用编排优先 Dify，纯 API 开发优先 Python 或 Node.js SDK。
      </p>

      <h2 id="reliability">可观察性、权限与恢复</h2>
      <p>
        Agent 的质量不只看最终回答，还要看它是否走了正确的路径。建议为每次任务建立一个可追踪记录，至少包含：任务目标、使用模型、请求 ID、消息摘要、工具名、参数摘要、执行结果、失败原因、人工确认点和最终交付物位置。
      </p>
      <ul>
        <li><Link to="/docs/guides/harness-inspector/">Harness Inspector</Link>：把 Agent 意图、Session、文件活动和 Commit 连接成交付证据链。</li>
        <li><Link to="/docs/guides/codex-tool-recovery/">Codex 工具恢复</Link>：工具不可用时，从文件工具、执行环境和恢复顺序开始排查。</li>
        <li><Link to="/docs/guides/loop-engineering-harness/">Loop Engineering 与 Harness</Link>：把一次任务的成功路径沉淀为可复用循环。</li>
        <li><Link to="/docs/guides/codex-skills-context-engineering/">Skills 与上下文工程</Link>：将规则、上下文、权限和工作记录组合成稳定工作方式。</li>
      </ul>
      <Callout tone="warn" title="高风险动作要有边界">
        <p>
          删除文件、执行不可逆命令、发布版本、发送外部消息、修改权限和支付相关操作不应只依赖模型判断。为这些动作设置明确的工具白名单、参数检查、预览结果和人工确认；无法验证时，宁可暂停任务，也不要自动扩大权限。
        </p>
      </Callout>

      <h2 id="production">生产化验收清单</h2>
      <CodeBlock lang="text" filename="agent-production-checklist.txt" code={`身份与配置
- API Key 放在服务端环境变量或密钥管理器中
- 不在日志、截图、Prompt 或前端代码中输出完整 Key
- 模型 ID、Base URL 和当前账号权限已验证

执行与可靠性
- 工具名和参数经过白名单 / Schema 校验
- 设置最大步骤数、超时、重试和停止条件
- 对写入、发布、发送和删除动作保留人工确认
- 工具执行具备幂等或可安全重试能力

观测与验收
- 记录 request_id、模型、耗时、工具调用和错误摘要
- 最终结果有结构化验收标准，而不是只看自然语言
- 失败任务可以从最近一个安全状态恢复
- 成功的配置、Prompt、工具 Schema 和验收清单已保存

扩展前检查
- 先用少量任务验证质量、耗时、成本和失败率
- 再组合多个工具或执行批量任务
- 模型、价格、限速和响应差异以控制台与实时 API 为准`} />

      <h2 id="troubleshooting">常见问题与排错顺序</h2>
      <SimpleTable
        headers={['现象', '先检查什么', '下一步']}
        rows={[
          ['401 / 认证失败', 'Authorization 头、Key 是否过期、环境变量是否生效', <Link key="auth" to="/docs/auth/">查看认证与计费</Link>],
          ['404 / 模型或路径不存在', 'Base URL、endpoint 路径、模型 ID 和账号可见性', <><Link key="models" to="/docs/api/list-models/">列出模型</Link>，再看 <Link key="errors" to="/docs/api/errors/">错误码</Link></>],
          ['429 / 请求过多', '并发、重试是否叠加、是否缺少退避', '降低并发，使用指数退避，并记录每次重试原因。'],
          ['模型不调用工具', 'tools 描述、参数 Schema、tool_choice 和模型能力', '先用一个只读工具和最短 Prompt 验证，再逐步增加工具。'],
          ['工具调用后循环不继续', '是否回传 assistant tool_calls、tool_call_id 和 role=tool', '对照 Chat Completions API 的 function calling 示例检查消息顺序。'],
          ['任务中途失败或卡住', '最后一个成功步骤、工具超时、上下文长度和资源预算', <Link key="recovery" to="/docs/guides/codex-tool-recovery/">按恢复指南从最小故障点继续</Link>],
        ]}
      />

      <h2 id="practice">练习任务</h2>
      <p>用一个只读的“项目状态检查 Agent”完成下面的练习：</p>
      <ol>
        <li>声明 <code>get_project_status</code> 工具，只返回环境、版本、测试状态和最近一次发布结果。</li>
        <li>让模型根据用户问题决定是否调用工具，不允许直接猜测项目状态。</li>
        <li>模拟一次工具成功返回和一次工具超时，分别验证 Agent 的回答。</li>
        <li>把每一步写入 JSONL 或数据库，包含调用 ID、参数、结果和耗时。</li>
        <li>给任务加上最大 4 步限制，并写出“超过限制后如何暂停和人工接管”。</li>
      </ol>
      <p>验收标准：</p>
      <ul>
        <li>没有工具结果时，Agent 明确说明无法确认，而不是编造状态；</li>
        <li>工具失败时，用户能看到可执行的下一步，而不是无上下文的“请求失败”；</li>
        <li>同一请求可以通过 request ID 和 tool call ID 还原执行过程；</li>
        <li>修改工具描述或模型后，仍能通过同一套验收清单回归。</li>
      </ul>

      <h2 id="next">下一步阅读</h2>
      <ul>
        <li>第一次接入：<Link to="/docs/quickstart/">快速开始</Link> → <Link to="/docs/api/list-models/">模型列表 API</Link> → <Link to="/docs/api/chat-completions/">Chat Completions API</Link>。</li>
        <li>使用成熟工具：<Link to="/docs/integrations/">集成指南</Link>，再进入对应的 Claude Code、Codex CLI、Cursor、Cline 或 Dify 页面。</li>
        <li>构建生产服务：<Link to="/docs/guides/complete-integration/">完整接入手册</Link> → <Link to="/docs/guides/config-export/">配置文件导出</Link> → <Link to="/docs/guides/harness-inspector/">Harness Inspector</Link>。</li>
        <li>处理异步媒体任务：<Link to="/docs/guides/async-image-generation-guide/">异步生图 API 详细教程</Link>，把任务提交、轮询、失败恢复和结果下载纳入 Agent 工作流。</li>
      </ul>
    </DocPage>
  )
}
