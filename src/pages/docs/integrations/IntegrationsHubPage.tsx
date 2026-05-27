import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'

const CHAT_APPS = [
  {
    title: 'ChatBox',
    href: '/docs/integrations/chat/chatbox',
    desc: '最适合普通聊天用户的 OpenAI 兼容接入指南。',
  },
  {
    title: 'Cherry Studio',
    href: '/docs/integrations/chat/cherry-studio',
    desc: '适合多模型管理、提示词模板和知识库工作流。',
  },
  {
    title: 'AnythingLLM',
    href: '/docs/integrations/chat/anythingllm',
    desc: '适合团队知识库、文档问答和 Agent 工作流。',
  },
]

const DEV_TOOLS = [
  {
    title: 'Claude Code',
    href: '/docs/integrations/dev/claude-code',
    desc: 'Claude 风格工具接入、OAuth、插件与账号切换教程。',
  },
  {
    title: 'Cursor',
    href: '/docs/integrations/dev/cursor',
    desc: '编辑器里的 OpenAI 兼容模型接入与常见配置。',
  },
  {
    title: 'Cline',
    href: '/docs/integrations/dev/cline',
    desc: 'VS Code Agent 工具接入与模型切换指南。',
  },
  {
    title: 'Gemini CLI',
    href: '/docs/integrations/dev/gemini-cli',
    desc: 'Google 风格 CLI 和图片模型接入说明。',
  },
  {
    title: 'Codex CLI',
    href: '/docs/integrations/dev/codex-cli',
    desc: 'Codex CLI 通过 gpt88.cc 连接模型和工具的完整流程。',
  },
  {
    title: 'CC-Switch',
    href: '/docs/integrations/dev/cc-switch',
    desc: '中转站路由切换、OAuth 与插件能力的使用说明。',
  },
]

const PLATFORMS = [
  {
    title: 'Dify',
    href: '/docs/integrations/platforms/dify',
    desc: '把 gpt88.cc 接入 Dify 工作流、应用和知识库。',
  },
  {
    title: '沉浸式翻译',
    href: '/docs/integrations/platforms/immersive-translate',
    desc: '浏览器翻译扩展接入与模型配置指南。',
  },
]

function CardGrid({
  items,
}: {
  items: { title: string; href: string; desc: string }[]
}) {
  return (
    <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map(item => (
        <Link
          key={item.href}
          to={item.href}
          className="tech-card tech-card-hover group flex flex-col rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-violet-500/40 hover:bg-violet-500/[0.06]"
        >
          <h3 className="text-base font-semibold text-ink-50 group-hover:text-violet-200">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-ink-300">{item.desc}</p>
          <span className="mt-4 text-sm font-medium text-violet-300">查看教程</span>
        </Link>
      ))}
    </div>
  )
}

export default function IntegrationsHubPage() {
  return (
    <DocPage
      path="/docs/integrations"
      title="集成指南"
      description="按聊天应用、开发工具、应用平台分类的接入教程总入口。"
      headings={[
        { id: 'chat-apps', text: '聊天应用', level: 2 },
        { id: 'dev-tools', text: '开发工具', level: 2 },
        { id: 'platforms', text: '应用平台', level: 2 },
        { id: 'references', text: '扩展阅读', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <p>
        这一页是集成指南总入口。每篇教程都按“准备工作、逐步配置、验证方式、常见问题、排障清单”组织，
        适合直接照着配置，也适合把链接发给团队成员。
      </p>
      <p>
        如果你不确定该从哪里开始：普通聊天先看 ChatBox，开发工具先看 Codex CLI 或 Claude Code，
        平台应用先看 Dify。OpenAI 兼容工具通常使用 <code>https://gpt88.cc/v1</code>，
        Claude 风格工具通常使用 <code>https://gpt88.cc</code>。
      </p>

      <h2 id="chat-apps">聊天应用</h2>
      <CardGrid items={CHAT_APPS} />

      <h2 id="dev-tools">开发工具</h2>
      <CardGrid items={DEV_TOOLS} />

      <h2 id="platforms">应用平台</h2>
      <CardGrid items={PLATFORMS} />

      <h2 id="references">扩展阅读</h2>
      <Callout tone="tip" title="Codex 外部实践指南">
        <p>
          如果你在做 Codex 接入、CLI 使用、工作流配置或团队协作，可以额外参考{' '}
          <a href="https://github.com/freestylefly/CodexGuide" target="_blank" rel="noreferrer">
            freestylefly/CodexGuide
          </a>
          。它是外部实践资料，不是 gpt88.cc 官方文档。
        </p>
      </Callout>

      <h2 id="next">下一步</h2>
      <ul>
        <li>
          先看 <Link to="/docs/integrations/chat/chatbox">ChatBox 集成</Link>。
        </li>
        <li>
          再看 <Link to="/docs/guides/complete-integration">完整接入手册</Link>。
        </li>
        <li>
          如果你用的是开发工具，去看对应的 CLI / IDE 教程。
        </li>
      </ul>
    </DocPage>
  )
}
