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
      className="not-prose w-full border-y border-white/10 py-5"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          <h2 id={`activation-quickstarts-${surface}`} className="text-base font-semibold text-ink-50">
            {copy.nav.getStarted}
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink-300">
            {copy.quickstart.description}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs sm:mt-0 sm:justify-end">
          <a
            href={registerUrl}
            className="inline-flex items-center gap-1.5 font-semibold text-violet-300 hover:text-violet-200"
          >
            <UserPlus className="h-3.5 w-3.5" aria-hidden="true" />
            {copy.nav.getStarted}
          </a>
          <a
            href={keysUrl}
            className="inline-flex items-center gap-1.5 font-semibold text-cyan-300 hover:text-cyan-200"
          >
            <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
            {copy.home.getKey}
          </a>
        </div>
      </div>

      <nav
        aria-label={copy.nav.getStarted}
        className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3"
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
              className="group inline-flex min-h-11 min-w-0 items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm font-semibold text-ink-100 transition-colors hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              <span className="inline-flex min-w-0 items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-violet-300" aria-hidden="true" />
                <span className="truncate">{task.label}</span>
              </span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-ink-500 transition-colors group-hover:text-violet-300" aria-hidden="true" />
            </a>
          )
        })}
      </nav>
    </section>
  )
}
