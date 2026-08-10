import {
  Bot,
  ExternalLink,
  Image,
  KeyRound,
  Terminal,
  UserPlus,
} from 'lucide-react'
import { buildAgentActivationUrl, type ActivationIntent, type AgentDestination } from '../../lib/activationLinks'
import { useLocale } from '../../lib/locale'
import { getLocaleCopy } from '../../lib/localeCopy'

const tasks: Array<{
  intent: Exclude<ActivationIntent, 'api_access'>
  destination: AgentDestination
  label: string
  icon: typeof Terminal
}> = [
  { intent: 'openai_api', destination: 'keys', label: 'OpenAI API', icon: Terminal },
  { intent: 'claude_api', destination: 'keys', label: 'Claude API', icon: Bot },
  { intent: 'image_api', destination: 'image-studio', label: 'Image Studio', icon: Image },
]

export function ActivationQuickStarts({ surface }: { surface: 'home' | 'quickstart' }) {
  const { locale } = useLocale()
  const copy = getLocaleCopy(locale)
  const registerUrl = buildAgentActivationUrl({
    locale,
    surface: `${surface}_register`,
    intent: 'api_access',
    destination: 'register',
  })
  const keysUrl = buildAgentActivationUrl({
    locale,
    surface: `${surface}_keys`,
    intent: 'api_access',
    destination: 'keys',
  })

  return (
    <section
      data-activation-quickstarts={surface}
      aria-labelledby={`activation-quickstarts-${surface}`}
      className="home-activation-shell not-prose w-full p-6 sm:p-8 lg:p-10"
    >
      <div className="flex flex-col gap-1 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <div>
          <div className="home-kicker">Activation paths</div>
          <h2 id={`activation-quickstarts-${surface}`} className="mt-4 text-2xl font-bold tracking-[-0.035em] text-white sm:text-3xl">
            {copy.nav.getStarted}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-300">
            {copy.quickstart.description}
          </p>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs lg:mt-0 lg:justify-end">
          <a
            href={registerUrl}
            data-activation-intent="api_access"
            data-agent-destination="register"
            className="inline-flex items-center gap-1.5 font-semibold text-[#b8f39d] transition-colors hover:text-white"
          >
            <UserPlus className="h-3.5 w-3.5" aria-hidden="true" />
            {copy.nav.getStarted}
          </a>
          <a
            href={keysUrl}
            data-activation-intent="api_access"
            data-agent-destination="keys"
            className="inline-flex items-center gap-1.5 font-semibold text-[#b8f39d] transition-colors hover:text-white"
          >
            <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
            {copy.home.getKey}
          </a>
        </div>
      </div>

      <nav
        aria-label={copy.nav.getStarted}
        className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-white/8 bg-white/8 sm:grid-cols-3"
      >
        {tasks.map(task => {
          const Icon = task.icon
          const href = buildAgentActivationUrl({
            locale,
            surface: `${surface}_task`,
            intent: task.intent,
            destination: task.destination,
          })
          return (
            <a
              key={task.intent}
              href={href}
              data-activation-intent={task.intent}
              data-agent-destination={task.destination}
              className="group inline-flex min-h-16 min-w-0 items-center justify-between gap-3 bg-[#0b0f14] px-4 py-3 text-sm font-semibold text-ink-100 transition-colors hover:bg-[#101710] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#9ee77d]"
            >
              <span className="inline-flex min-w-0 items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-[#9ee77d]" aria-hidden="true" />
                <span className="truncate">{task.label}</span>
              </span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-ink-500 transition-colors group-hover:text-[#9ee77d]" aria-hidden="true" />
            </a>
          )
        })}
      </nav>
    </section>
  )
}
