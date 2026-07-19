export const ANALYTICS_CONSENT_STORAGE_KEY = 'gpt88_analytics_consent_v1'
export const ANALYTICS_CONSENT_COOKIE_NAME = '__Secure-gpt88_consent'
export const ANALYTICS_CONSENT_EVENT = 'gpt88:analytics-consent-changed'

const CONSENT_MAX_AGE_SECONDS = 365 * 24 * 60 * 60

export type AnalyticsConsentState = 'unknown' | 'granted' | 'denied'

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean
  }
}

function normalizeConsent(value: unknown): AnalyticsConsentState {
  return value === 'granted' || value === 'denied' ? value : 'unknown'
}

function consentCookieName(protocol: string): string {
  return protocol === 'https:' ? ANALYTICS_CONSENT_COOKIE_NAME : ANALYTICS_CONSENT_STORAGE_KEY
}

export function consentCookieAttributes(hostname: string, protocol: string): string {
  const normalizedHost = String(hostname || '').toLowerCase().replace(/\.$/, '')
  const sharedDomain = normalizedHost === 'gpt88.cc' || normalizedHost.endsWith('.gpt88.cc')
  return [
    'Path=/',
    `Max-Age=${CONSENT_MAX_AGE_SECONDS}`,
    'SameSite=Lax',
    ...(sharedDomain ? ['Domain=.gpt88.cc'] : []),
    ...(protocol === 'https:' ? ['Secure'] : []),
  ].join('; ')
}

function readConsentCookie(documentObject: Document, protocol: string): AnalyticsConsentState {
  const prefix = `${consentCookieName(protocol)}=`
  const value = String(documentObject.cookie || '')
    .split(';')
    .map(part => part.trim())
    .find(part => part.startsWith(prefix))
    ?.slice(prefix.length)
  return normalizeConsent(value)
}

function readLocalConsent(windowObject: Window): AnalyticsConsentState {
  try {
    return normalizeConsent(windowObject.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY))
  } catch {
    return 'unknown'
  }
}

export function isGlobalPrivacyControlEnabled(
  windowObject: Window | undefined = typeof window === 'undefined' ? undefined : window,
): boolean {
  return windowObject?.navigator.globalPrivacyControl === true
}

export function getAnalyticsConsent(
  windowObject: Window | undefined = typeof window === 'undefined' ? undefined : window,
  documentObject: Document | undefined = typeof document === 'undefined' ? undefined : document,
): AnalyticsConsentState {
  if (!windowObject || !documentObject) return 'unknown'
  if (isGlobalPrivacyControlEnabled(windowObject)) return 'denied'
  const cookieValue = readConsentCookie(documentObject, windowObject.location.protocol)
  return cookieValue === 'unknown' ? readLocalConsent(windowObject) : cookieValue
}

export function setAnalyticsConsent(
  consent: Exclude<AnalyticsConsentState, 'unknown'>,
  windowObject: Window | undefined = typeof window === 'undefined' ? undefined : window,
  documentObject: Document | undefined = typeof document === 'undefined' ? undefined : document,
): boolean {
  if (!windowObject || !documentObject) return false
  if (consent === 'granted' && isGlobalPrivacyControlEnabled(windowObject)) return false
  try {
    windowObject.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent)
  } catch {
    // The shared parent-domain cookie remains the source of truth when storage is blocked.
  }
  documentObject.cookie = `${consentCookieName(windowObject.location.protocol)}=${consent}; ${consentCookieAttributes(windowObject.location.hostname, windowObject.location.protocol)}`
  windowObject.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: { consent } }))
  return true
}
