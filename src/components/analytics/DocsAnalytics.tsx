import { ShieldCheck, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'
import { agentActivationPlacementFromUrl, parseInboundAcquisition, type AcquisitionRelay } from '../../lib/activationAttribution'
import {
  ANALYTICS_CONSENT_EVENT,
  getAnalyticsConsent,
  isGlobalPrivacyControlEnabled,
  setAnalyticsConsent,
  type AnalyticsConsentState,
} from '../../lib/docsConsent'
import {
  buildDocsGrowthEvent,
  DOCS_GROWTH_ENDPOINT,
  sendDocsGrowthEvent,
  type DocsGrowthEventName,
} from '../../lib/docsAnalytics'
import { localeFromPath } from '../../lib/locale'

function configuredEndpoint(): string {
  const configured = String(import.meta.env.VITE_DOCS_GROWTH_ENDPOINT || '').trim()
  if (configured.toLowerCase() === 'off') return ''
  if (configured) return configured
  return import.meta.env.PROD ? DOCS_GROWTH_ENDPOINT : ''
}

function randomIdentifier(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  const bytes = new Uint8Array(16)
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes)
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('')
  }
  return `${Date.now().toString(36)}-fallback`
}

function subscribeToConsent(onStoreChange: () => void): () => void {
  window.addEventListener(ANALYTICS_CONSENT_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(ANALYTICS_CONSENT_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

function getServerConsent(): AnalyticsConsentState {
  return 'unknown'
}

export function DocsAnalytics() {
  const location = useLocation()
  const endpoint = configuredEndpoint()
  const acquisitionRef = useRef<AcquisitionRelay | null>(null)
  const sessionIDRef = useRef('')
  const lastPageViewRef = useRef('')
  const consent = useSyncExternalStore(subscribeToConsent, getAnalyticsConsent, getServerConsent)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const eventFor = useCallback((
    eventName: DocsGrowthEventName,
    options: { placement?: string; destination?: string } = {},
  ) => {
    if (!sessionIDRef.current) sessionIDRef.current = `docs-${randomIdentifier()}`
    const acquisition = acquisitionRef.current
    return buildDocsGrowthEvent({
      eventID: randomIdentifier(),
      eventName,
      occurredAt: new Date().toISOString(),
      path: location.pathname,
      sessionID: sessionIDRef.current,
      campaign: acquisition?.campaign || acquisition?.source || 'none',
      content: acquisition?.content,
      locale: localeFromPath(location.pathname),
      ...options,
    })
  }, [location.pathname])

  useEffect(() => {
    if (consent === 'denied') {
      acquisitionRef.current = null
      sessionIDRef.current = ''
      lastPageViewRef.current = ''
      return
    }
    const inbound = parseInboundAcquisition(location.search)
    if (inbound && !acquisitionRef.current) acquisitionRef.current = inbound
    if (consent !== 'granted' || !endpoint) return
    const signature = `${location.pathname}|${localeFromPath(location.pathname)}`
    if (signature === lastPageViewRef.current) return
    lastPageViewRef.current = signature
    const event = eventFor('page_view')
    if (event) void sendDocsGrowthEvent(endpoint, event)
  }, [consent, endpoint, eventFor, location.pathname, location.search])

  useEffect(() => {
    if (consent !== 'granted' || !endpoint) return
    const root = document.getElementById('root')
    if (!root) return
    const trackAgentClick = (clickEvent: MouseEvent) => {
      const target = clickEvent.target instanceof Element ? clickEvent.target : null
      const anchor = target?.closest<HTMLAnchorElement>('a[href]')
      if (!anchor) return
      const placement = agentActivationPlacementFromUrl(anchor.href)
      if (!placement) return
      let destination = ''
      try {
        destination = new URL(anchor.href).pathname
      } catch {
        return
      }
      const event = eventFor('landing_cta_click', { placement, destination })
      if (event) void sendDocsGrowthEvent(endpoint, event)
    }
    root.addEventListener('click', trackAgentClick, true)
    return () => root.removeEventListener('click', trackAgentClick, true)
  }, [consent, endpoint, eventFor])

  const locale = localeFromPath(location.pathname)
  const chinese = locale === 'zh' || locale === 'zh-TW'
  const copy = chinese
    ? {
        title: '可选分析设置',
        body: '允许后仅分析文档页面、推广活动和 Agent 入口点击，用于改进文档与接入流程。可选分析事件内容不包含邮箱、提示词、API 密钥、令牌、账号、设备或浏览器标识；网络请求附带的基础技术信息仅用于安全与限流，不用于分析画像。',
        reject: '拒绝',
        allow: '允许可选分析',
        manage: '分析设置',
        close: '关闭',
        gpc: '浏览器已启用 Global Privacy Control，分析保持关闭。',
      }
    : {
        title: 'Optional analytics',
        body: 'If you allow it, we analyze only the documentation page, campaign, and Agent entry click to improve the docs and setup flow. The optional analytics event payload contains no email, prompts, API keys, tokens, account, device, or browser identifiers. Basic request metadata is used only for security and rate limiting, not analytics profiling.',
        reject: 'Reject',
        allow: 'Allow optional analytics',
        manage: 'Analytics settings',
        close: 'Close',
        gpc: 'Global Privacy Control is enabled, so analytics remains off.',
      }
  const showPanel = consent === 'unknown' || settingsOpen
  const gpcEnabled = isGlobalPrivacyControlEnabled()

  const choose = (next: 'granted' | 'denied') => {
    if (!setAnalyticsConsent(next)) return
    setSettingsOpen(false)
  }

  if (!showPanel) {
    return (
      <button
        type="button"
        onClick={() => setSettingsOpen(true)}
        aria-label={copy.manage}
        title={copy.manage}
        className="fixed bottom-4 left-4 z-50 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-ink-900/95 text-ink-300 shadow-lg hover:text-ink-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
      >
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
      </button>
    )
  }

  return (
    <section
      role="dialog"
      aria-labelledby="docs-analytics-title"
      aria-describedby="docs-analytics-description"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-lg border border-white/10 bg-ink-900/98 p-4 text-ink-100 shadow-2xl backdrop-blur sm:bottom-5 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h2 id="docs-analytics-title" className="text-sm font-semibold">{copy.title}</h2>
          <p id="docs-analytics-description" className="mt-1 text-sm leading-6 text-ink-300">
            {gpcEnabled ? copy.gpc : copy.body}
          </p>
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => choose('denied')}
              className="rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-ink-200 hover:bg-white/5"
            >
              {copy.reject}
            </button>
            {!gpcEnabled ? (
              <button
                type="button"
                onClick={() => choose('granted')}
                className="rounded-md bg-violet-500 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-400"
              >
                {copy.allow}
              </button>
            ) : null}
          </div>
        </div>
        {consent !== 'unknown' ? (
          <button
            type="button"
            onClick={() => setSettingsOpen(false)}
            aria-label={copy.close}
            title={copy.close}
            className="shrink-0 rounded-md p-1.5 text-ink-400 hover:bg-white/5 hover:text-ink-100"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </section>
  )
}
