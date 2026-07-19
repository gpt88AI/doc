import { LOCALE_CONFIG, type Locale } from './locale'

export type ActivationIntent = 'openai_api' | 'claude_api' | 'image_api' | 'api_access'
export type AgentDestination = 'register' | 'keys' | 'image-studio'

const AGENT_ORIGIN = 'https://agent.gpt88.cc'

const destinationPaths: Record<AgentDestination, string> = {
  register: '/register',
  keys: '/keys',
  'image-studio': '/image-studio',
}

export function buildAgentActivationUrl(options: {
  locale: Locale
  surface: string
  intent: ActivationIntent
  destination: AgentDestination
}) {
  const url = new URL(destinationPaths[options.destination], AGENT_ORIGIN)
  url.searchParams.set('utm_source', 'docs')
  url.searchParams.set('utm_medium', 'referral')
  url.searchParams.set('utm_campaign', 'activation_quickstart')
  url.searchParams.set('utm_content', `${options.surface}_${options.intent}`)
  url.searchParams.set('intent', options.intent)
  url.searchParams.set('lang', LOCALE_CONFIG[options.locale].code)
  return url.toString()
}
