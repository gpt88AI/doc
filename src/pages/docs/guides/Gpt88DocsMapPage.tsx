import { Link } from 'react-router-dom'
import {
  BookOpenText,
  Bot,
  Cable,
  Compass,
  Image,
  Layers3,
  Rocket,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'

const PRODUCT_ENTRIES = [
  {
    title: 'gpt88.cc',
    href: 'https://gpt88.cc/',
    external: true,
    icon: Rocket,
    desc: '主控台与文本大模型入口。适合 Claude、GPT、Gemini、DeepSeek、Qwen 等文本模型接入、Key 管理和 API 调试。',
  },
  {
    title: 'agent.gpt88.cc',
    href: 'https://agent.gpt88.cc/',
    external: true,
    icon: Image,
    desc: '图片工作台与生图业务入口。适合海报、电商图、模特图、场景图、批量素材和 GPT-Image-2 工作流。',
  },
  {
    title: 'doc.gpt88.cc',
    href: '/docs/overview/',
    external: false,
    icon: BookOpenText,
    desc: '官方文档入口。适合 API 接入、模型选型、集成配置、教程查阅和排障。',
  },
  {
    title: 'img.gpt88.cc',
    href: 'https://img.gpt88.cc/',
    external: true,
    icon: Sparkles,
    desc: '图片优选加速域名。适合 GPT-Image-2 批量生图、自动化对接和更低延迟的图片请求。',
  },
] as const

const DOC_CATEGORIES = [
  {
    title: '入门与产品认知',
    icon: Compass,
    items: [
      { label: '产品概览', href: '/docs/overview/' },
      { label: '快速开始', href: '/docs/quickstart/' },
      { label: '认证与计费', href: '/docs/auth/' },
      { label: '完整接入手册', href: '/docs/guides/complete-integration/' },
    ],
    desc: '先建立对 gpt88 产品形态、Key、线路、计费和最小调用流程的整体认知。',
  },
  {
    title: 'API 与模型',
    icon: Cable,
    items: [
      { label: 'Chat Completions', href: '/docs/api/chat-completions/' },
      { label: 'Google 图片生成 API', href: '/docs/api/images/' },
      { label: 'Grok 视频 API', href: '/docs/api/grok-video/' },
      { label: '模型导航', href: '/models/' },
      { label: '错误码', href: '/docs/api/errors/' },
    ],
    desc: '适合已经准备开始开发，想直接确认路径、参数、模型 ID 和错误处理方式的用户。',
  },
  {
    title: '客户端与工具接入',
    icon: Wrench,
    items: [
      { label: 'ChatBox', href: '/docs/integrations/chat/chatbox/' },
      { label: 'Claude Code', href: '/docs/integrations/dev/claude-code/' },
      { label: 'Codex CLI', href: '/docs/integrations/dev/codex-cli/' },
      { label: 'CC-Switch', href: '/docs/integrations/dev/cc-switch/' },
    ],
    desc: '适合已经在用聊天客户端、IDE、Agent CLI 或路由工具的用户，按工具选对应教程即可。',
  },
  {
    title: '图片与电商专题',
    icon: Layers3,
    items: [
      { label: 'Agent 图片工作台', href: '/docs/guides/agent-image-studio/' },
      { label: 'GPT-Image-2 生图服务通知', href: '/docs/guides/gpt-image-2-service-notice/' },
      { label: '生图质量与裁剪避坑', href: '/docs/guides/agent-image-quality-crop-guide/' },
      { label: '电商工具专题教程', href: '/docs/guides/ecommerce-tools-special/' },
    ],
    desc: '适合做电商主图、海报、详情页、场景图、批量素材、图生图和高频生图业务的团队。',
  },
  {
    title: 'Codex / Agent 进阶',
    icon: Bot,
    items: [
      { label: 'Codex 插件 OAuth 登录', href: '/docs/guides/codex-plugins-oauth/' },
      { label: 'Codex 工具恢复', href: '/docs/guides/codex-tool-recovery/' },
      { label: 'Codex gpt-image-2 Skill', href: '/docs/guides/codex-gpt-image-2-skill/' },
      { label: 'Codex Skills 与上下文工程', href: '/docs/guides/codex-skills-context-engineering/' },
    ],
    desc: '适合把 AI 从单次对话升级成稳定工程流程的开发者、工作流设计者和团队维护者。',
  },
] as const

function EntryGrid() {
  return (
    <div className="not-prose mt-6 grid gap-4 md:grid-cols-2">
      {PRODUCT_ENTRIES.map(item => {
        const Icon = item.icon
        const cardClassName =
          'group rounded-2xl border border-white/6 bg-white/[0.02] p-5 transition hover:border-violet-400/35 hover:bg-violet-500/[0.05]'

        const content = (
          <>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/12 text-violet-300 ring-1 ring-violet-500/25">
              <Icon className="h-4 w-4" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink-50">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-300">{item.desc}</p>
            <div className="mt-4 text-sm font-medium text-violet-300 group-hover:text-violet-200">
              {item.external ? '打开入口' : '查看页面'}
            </div>
          </>
        )

        return item.external ? (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className={cardClassName}
          >
            {content}
          </a>
        ) : (
          <Link key={item.title} to={item.href} className={cardClassName}>
            {content}
          </Link>
        )
      })}
    </div>
  )
}

function CategoryGrid() {
  return (
    <div className="not-prose mt-6 grid gap-4 xl:grid-cols-2">
      {DOC_CATEGORIES.map(category => {
        const Icon = category.icon
        return (
          <div
            key={category.title}
            className="rounded-2xl border border-white/6 bg-white/[0.02] p-5"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/25">
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-semibold text-ink-50">{category.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink-300">{category.desc}</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-200">
              {category.items.map(item => (
                <li key={item.href}>
                  <Link to={item.href} className="text-violet-300 hover:text-violet-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default function Gpt88DocsMapPage() {
  return (
    <DocPage
      path="/docs/guides/gpt88-docs-map"
      title="gpt88 产品与文档地图"
      description="把 gpt88 的主站、图片工作台、文档站、图片加速域名和主要教程分类整理成一张完整地图，方便新用户快速找到正确入口。"
      headings={[
        { id: 'why', text: '这页解决什么问题', level: 2 },
        { id: 'entries', text: '产品入口总览', level: 2 },
        { id: 'categories', text: '文档分类地图', level: 2 },
        { id: 'read-order', text: '推荐阅读顺序', level: 2 },
        { id: 'community', text: '反馈与更新渠道', level: 2 },
      ]}
    >
      <Callout tone="info" title="适合第一次进入 gpt88 体系的用户">
        <p>
          如果你刚接触 gpt88，最容易遇到的问题不是“不会调接口”，而是“不知道该进哪个站、看哪类文档、用哪条线路”。
          这一页就是把入口和文档结构一次讲清楚，减少来回跳转。
        </p>
      </Callout>

      <h2 id="why">这页解决什么问题</h2>
      <p>
        gpt88 现在同时覆盖文本模型、图片工作台、API 接入、模型导航、Codex / Agent 工具链和电商专题。
        当内容越来越多时，用户最常见的困惑会变成：
      </p>
      <ul>
        <li>我要接文本模型，应该进主站还是进图片工作台？</li>
        <li>我要找 API 文档，是看快速开始、API Reference 还是某个工具教程？</li>
        <li>我是做电商图、批量生图、Agent 工作流，应该从哪一组文档开始？</li>
      </ul>
      <p>
        所以这页不讲单一接口细节，而是给出一份完整的 <strong>产品地图 + 文档地图 + 阅读路径</strong>。
      </p>

      <h2 id="entries">产品入口总览</h2>
      <p>
        可以先把 gpt88 理解成一个入口矩阵：不同站点承担不同职责。先进入正确的站，再看对应文档，会比从搜索结果随机点进某一页更高效。
      </p>
      <EntryGrid />

      <h2 id="categories">文档分类地图</h2>
      <p>
        文档站并不是按“发布时间”组织，而是按“任务类型”组织。你可以直接按自己要做的事，进入对应分类。
      </p>
      <CategoryGrid />

      <h2 id="read-order">推荐阅读顺序</h2>
      <p>如果你不确定从哪开始，建议按下面顺序：</p>
      <ol>
        <li>
          先看 <Link to="/docs/overview/">产品概览</Link>，弄清楚 `gpt88.cc` 和 `agent.gpt88.cc`
          分别做什么。
        </li>
        <li>
          再看 <Link to="/docs/quickstart/">快速开始</Link>，确认 API Key、Base URL、模型和第一条请求。
        </li>
        <li>
          如果你要写代码，继续看 <Link to="/docs/api/chat-completions/">API Reference</Link> 和
          <Link to="/models/">模型导航</Link>。
        </li>
        <li>
          如果你已经在用现成工具，直接跳到 <Link to="/docs/integrations/">集成指南</Link> 按工具找教程。
        </li>
        <li>
          如果你主要做生图、电商和批量素材，直接看
          {' '}<Link to="/docs/guides/agent-image-studio/">Agent 图片工作台</Link> 和
          <Link to="/docs/guides/ecommerce-tools-special/">电商工具专题教程</Link>。
        </li>
      </ol>

      <h2 id="community">反馈与更新渠道</h2>
      <p>
        文档会持续扩充。如果你发现链接失效、模型 ID 过期、示例参数不准确，或者希望新增某个工具教程，可以通过下面渠道反馈：
      </p>
      <ul>
        <li>
          X：<a href="https://x.com/webstarchina" target="_blank" rel="noreferrer">@webstarchina</a>
        </li>
        <li>
          Telegram：<a href="https://t.me/+CtlYILkGaY1jYzBl" target="_blank" rel="noreferrer">gpt88 社区群</a>
        </li>
        <li>
          站内优先阅读 <Link to="/docs/changelog/">更新日志</Link>，查看最近新增模型、教程和文档修复。
        </li>
      </ul>

      <Callout tone="tip" title="使用建议">
        <p>
          新用户不要一开始就陷入“哪个模型最强”或“哪个教程最全”。先找对入口，再跑通一个最小场景，后续再按模型、工具和业务类型逐步细化。
        </p>
      </Callout>
    </DocPage>
  )
}
