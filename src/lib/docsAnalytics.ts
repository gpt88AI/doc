export const DOCS_GROWTH_ENDPOINT = 'https://agent.gpt88.cc/api/v1/growth/docs/events'
export const DOCS_GROWTH_SURFACE = 'docs_public'

const identifierPattern = /^[A-Za-z0-9._:-]{8,200}$/
const categoryPattern = /^[A-Za-z0-9][A-Za-z0-9_.:/-]*$/

export type DocsGrowthEventName = 'page_view' | 'landing_cta_click'

export type DocsGrowthEvent = {
  event_id: string
  event_name: DocsGrowthEventName
  occurred_at: string
  path: string
  session_id: string
  first_campaign: string
  first_content?: string
  locale: string
  properties: Record<string, string>
}

function cleanCategory(value: string, limit: number, fallback = ''): string {
  const normalized = String(value || '').trim().toLowerCase()
  if (!normalized || normalized.length > limit || !categoryPattern.test(normalized)) return fallback
  return normalized
}

export function sanitizeDocsPath(value: string): string {
  const path = String(value || '').split(/[?#]/, 1)[0]
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('\\')) return '/unknown'
  return path.slice(0, 500) || '/'
}

function isPathForm(value: string): boolean {
  const path = String(value || '').split(/[?#]/, 1)[0]
  return path.startsWith('/') && !path.startsWith('//') && !path.includes('\\')
}

export function buildDocsGrowthEvent(input: {
  eventID: string
  eventName: DocsGrowthEventName
  occurredAt: string
  path: string
  sessionID: string
  campaign?: string
  content?: string
  locale: string
  placement?: string
  destination?: string
}): DocsGrowthEvent | null {
  if (!identifierPattern.test(input.eventID) || !identifierPattern.test(input.sessionID) || !input.sessionID.startsWith('docs-')) return null
  const path = sanitizeDocsPath(input.path)
  const locale = cleanCategory(input.locale, 20, 'unknown')
  const campaign = cleanCategory(input.campaign || '', 200, 'none')
  const content = cleanCategory(input.content || '', 200)
  const properties: Record<string, string> = {
    surface: DOCS_GROWTH_SURFACE,
  }

  if (input.eventName === 'landing_cta_click') {
    const placement = cleanCategory(input.placement || '', 80)
    if (!placement || !isPathForm(input.destination || '')) return null
    properties.placement = placement
    properties.destination = sanitizeDocsPath(input.destination || '').slice(0, 100)
  }

  return {
    event_id: input.eventID,
    event_name: input.eventName,
    occurred_at: input.occurredAt,
    path,
    session_id: input.sessionID,
    first_campaign: campaign,
    ...(content ? { first_content: content } : {}),
    locale,
    properties,
  }
}

export async function sendDocsGrowthEvent(
  endpoint: string,
  event: DocsGrowthEvent,
  transport: typeof fetch = globalThis.fetch,
): Promise<boolean> {
  if (!endpoint || typeof transport !== 'function') return false
  try {
    const url = new URL(endpoint)
    if (url.protocol !== 'https:' && url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') return false
    const response = await transport(url.toString(), {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      keepalive: true,
      referrerPolicy: 'no-referrer',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: [event] }),
    })
    return response.ok
  } catch {
    return false
  }
}
