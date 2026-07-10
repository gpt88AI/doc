import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const CHAT_APPS = [
  { title: 'ChatBox', href: '/docs/integrations/chat/chatbox/', desc: 'OpenAI-compatible setup for chat users.' },
  { title: 'Cherry Studio', href: '/docs/integrations/chat/cherry-studio/', desc: 'Multi-model desktop workflow and prompt templates.' },
  { title: 'AnythingLLM', href: '/docs/integrations/chat/anythingllm/', desc: 'Knowledge base and team assistant workflow.' },
]

const DEV_TOOLS = [
  { title: 'Claude Code', href: '/docs/integrations/dev/claude-code/', desc: 'Claude-style routing, OAuth, and plugin guidance.' },
  { title: 'Cursor', href: '/docs/integrations/dev/cursor/', desc: 'Editor-based OpenAI-compatible setup.' },
  { title: 'Cline', href: '/docs/integrations/dev/cline/', desc: 'VS Code agent workflow and model switching.' },
  { title: 'Gemini CLI', href: '/docs/integrations/dev/gemini-cli/', desc: 'CLI setup for Gemini-style usage and image models.' },
  { title: 'Codex CLI', href: '/docs/integrations/dev/codex-cli/', desc: 'Connect Codex CLI through gpt88.cc.' },
  { title: 'CC-Switch', href: '/docs/integrations/dev/cc-switch/', desc: 'Routing, OAuth, and plugin switching notes.' },
]

const PLATFORMS = [
  { title: 'Dify', href: '/docs/integrations/platforms/dify/', desc: 'Connect gpt88.cc into Dify apps and workflows.' },
  { title: 'Immersive Translate', href: '/docs/integrations/platforms/immersive-translate/', desc: 'Browser extension setup for translation workflows.' },
]

function CardGrid({ items }: { items: { title: string; href: string; desc: string }[] }) {
  return (
    <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map(item => (
        <Link
          key={item.href}
          to={localizePath(item.href, 'en')}
          className="tech-card tech-card-hover group flex flex-col rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-violet-500/40 hover:bg-violet-500/[0.06]"
        >
          <h3 className="text-base font-semibold text-ink-50 group-hover:text-violet-200">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-300">{item.desc}</p>
          <span className="mt-4 text-sm font-medium text-violet-300">Open guide</span>
        </Link>
      ))}
    </div>
  )
}

export default function IntegrationsHubPageEn() {
  return (
    <DocPage
      path="/docs/integrations"
      title="Integration Guides"
      description="Browse setup guides by chat apps, developer tools, and application platforms."
      headings={[
        { id: 'chat-apps', text: 'Chat Apps', level: 2 },
        { id: 'dev-tools', text: 'Developer Tools', level: 2 },
        { id: 'platforms', text: 'Platforms', level: 2 },
        { id: 'references', text: 'References', level: 2 },
        { id: 'next', text: 'Next Steps', level: 2 },
      ]}
    >
      <p>
        This page is the English entry point for integration guides. Each guide is structured around
        preparation, step-by-step setup, verification, and troubleshooting.
      </p>
      <p>
        If you are unsure where to start: ChatBox is the easiest chat client path, Codex CLI or Claude Code
        are the best developer tool starting points, and Dify is the main platform workflow.
      </p>

      <h2 id="chat-apps">Chat Apps</h2>
      <CardGrid items={CHAT_APPS} />

      <h2 id="dev-tools">Developer Tools</h2>
      <CardGrid items={DEV_TOOLS} />

      <h2 id="platforms">Platforms</h2>
      <CardGrid items={PLATFORMS} />

      <h2 id="references">References</h2>
      <Callout tone="tip" title="External Codex workflow reference">
        <p>
          If you are specifically building Codex workflows, you can also review{' '}
          <a href="https://github.com/freestylefly/CodexGuide" target="_blank" rel="noreferrer">
            freestylefly/CodexGuide
          </a>.
        </p>
      </Callout>

      <h2 id="next">Next Steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/integrations/chat/chatbox/', 'en')}>Start with ChatBox</Link>.</li>
        <li><Link to={localizePath('/docs/guides/complete-integration/', 'en')}>Read the complete integration guide</Link>.</li>
        <li>Then move into the tool-specific guide you actually use.</li>
      </ul>
    </DocPage>
  )
}
