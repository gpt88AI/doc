const AGENT_ORIGIN = 'https://agent.gpt88.cc'
const CONTENT_RELAY_SEPARATOR = '--via--'

const valueLimits = {
  source: 120,
  medium: 120,
  campaign: 200,
  term: 200,
  content: 200,
} as const

const campaignValuePattern = /^[A-Za-z0-9][A-Za-z0-9_.:/-]*$/
const phoneLikePattern = /^\+?[0-9][0-9() .-]{6,}$/
const ipv4LikePattern = /(?:^|[^0-9])(?:[0-9]{1,3}\.){3}[0-9]{1,3}(?:$|[^0-9])/
const jwtLikePattern = /^[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}$/
const hexTokenPattern = /^[0-9a-f]{16,}$/i
const internalSources = new Set(['agent_site', 'direct', 'docs', 'legacy_site', 'lifecycle'])

export interface AcquisitionRelay {
  source: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
}

function sanitizeCampaignValue(value: string | null, limit: number): string {
  const normalized = (value || '').trim()
  const lower = normalized.toLowerCase()
  if (
    !normalized ||
    normalized.length > limit ||
    !campaignValuePattern.test(normalized) ||
    phoneLikePattern.test(normalized) ||
    ipv4LikePattern.test(normalized) ||
    jwtLikePattern.test(normalized) ||
    hexTokenPattern.test(normalized) ||
    lower.includes('@') ||
    lower.includes('://') ||
    lower.includes('?') ||
    lower.includes('#') ||
    lower.includes('bearer ') ||
    lower.includes('mozilla/') ||
    lower.includes('applewebkit') ||
    lower.includes('chrome/') ||
    lower.includes('safari/') ||
    lower.includes('curl/') ||
    lower.includes('postmanruntime/') ||
    lower.startsWith('sk-') ||
    lower.startsWith('sess-')
  ) {
    return ''
  }
  return lower
}

export function parseInboundAcquisition(search: string): AcquisitionRelay | null {
  const params = new URLSearchParams(search)
  const source = sanitizeCampaignValue(params.get('utm_source'), valueLimits.source)
  if (!source || internalSources.has(source)) return null

  const optionalValue = (key: keyof Omit<AcquisitionRelay, 'source'>) => {
    const value = sanitizeCampaignValue(params.get(`utm_${key}`), valueLimits[key])
    return value || undefined
  }

  return {
    source,
    medium: optionalValue('medium'),
    campaign: optionalValue('campaign'),
    term: optionalValue('term'),
    content: optionalValue('content'),
  }
}

function originalActivationContent(value: string): string {
  const separatorIndex = value.lastIndexOf(CONTENT_RELAY_SEPARATOR)
  return separatorIndex === -1
    ? value
    : value.slice(separatorIndex + CONTENT_RELAY_SEPARATOR.length)
}

export function agentActivationPlacementFromUrl(href: string): string {
  try {
    const url = new URL(href, 'https://doc.gpt88.cc')
    if (url.origin !== AGENT_ORIGIN) return ''
    const intent = sanitizeCampaignValue(url.searchParams.get('intent'), 80)
    if (!intent) return ''
    const content = sanitizeCampaignValue(url.searchParams.get('utm_content'), valueLimits.content)
    return originalActivationContent(content).slice(0, 80)
  } catch {
    return ''
  }
}

function mergedContent(inbound: string | undefined, activation: string): string {
  if (!inbound) return activation
  if (!activation || inbound === activation) return inbound

  const suffix = `${CONTENT_RELAY_SEPARATOR}${activation}`
  const available = valueLimits.content - suffix.length
  if (available <= 0) return activation.slice(0, valueLimits.content)
  return `${inbound.slice(0, available)}${suffix}`
}

export function relayAcquisitionToAgentUrl(
  href: string,
  acquisition: AcquisitionRelay | null,
): string {
  if (!acquisition) return href

  let url: URL
  try {
    url = new URL(href, 'https://doc.gpt88.cc')
  } catch {
    return href
  }
  if (url.origin !== AGENT_ORIGIN) return href

  const activationContent = originalActivationContent(
    sanitizeCampaignValue(url.searchParams.get('utm_content'), valueLimits.content),
  )

  url.searchParams.set('utm_source', acquisition.source)
  url.searchParams.set('utm_medium', acquisition.medium || 'campaign')

  for (const key of ['campaign', 'term'] as const) {
    const value = acquisition[key]
    if (value) url.searchParams.set(`utm_${key}`, value)
    else url.searchParams.delete(`utm_${key}`)
  }

  const content = mergedContent(acquisition.content, activationContent)
  if (content) url.searchParams.set('utm_content', content)
  else url.searchParams.delete('utm_content')

  return url.toString()
}
