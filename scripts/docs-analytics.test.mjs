import assert from 'node:assert/strict'
import test from 'node:test'

import { agentActivationPlacementFromUrl } from '../src/lib/activationAttribution.ts'
import {
  ANALYTICS_CONSENT_COOKIE_NAME,
  ANALYTICS_CONSENT_STORAGE_KEY,
  consentCookieAttributes,
  getAnalyticsConsent,
  setAnalyticsConsent,
} from '../src/lib/docsConsent.ts'
import {
  buildDocsGrowthEvent,
  DOCS_GROWTH_SURFACE,
  sendDocsGrowthEvent,
} from '../src/lib/docsAnalytics.ts'

function browserDoubles({ gpc = false, protocol = 'https:', hostname = 'doc.gpt88.cc' } = {}) {
  const values = new Map()
  const storage = {
    getItem: key => values.get(key) || null,
    setItem: (key, value) => values.set(key, String(value)),
  }
  const documentObject = { cookie: '' }
  const windowObject = {
    location: { hostname, protocol },
    navigator: { globalPrivacyControl: gpc },
    localStorage: storage,
    dispatchEvent() {},
  }
  return { windowObject, documentObject, storage }
}

test('uses the shared secure parent-domain consent contract', () => {
  const browser = browserDoubles()
  assert.equal(getAnalyticsConsent(browser.windowObject, browser.documentObject), 'unknown')
  assert.equal(setAnalyticsConsent('granted', browser.windowObject, browser.documentObject), true)
  assert.equal(browser.storage.getItem(ANALYTICS_CONSENT_STORAGE_KEY), 'granted')
  assert.match(browser.documentObject.cookie, new RegExp(`${ANALYTICS_CONSENT_COOKIE_NAME}=granted`))
  assert.match(consentCookieAttributes('doc.gpt88.cc', 'https:'), /Domain=\.gpt88\.cc/)
  assert.match(consentCookieAttributes('doc.gpt88.cc', 'https:'), /SameSite=Lax/)
  assert.match(consentCookieAttributes('doc.gpt88.cc', 'https:'), /Secure/)
})

test('global privacy control overrides an existing grant', () => {
  const browser = browserDoubles({ gpc: true })
  browser.documentObject.cookie = `${ANALYTICS_CONSENT_COOKIE_NAME}=granted`
  assert.equal(getAnalyticsConsent(browser.windowObject, browser.documentObject), 'denied')
  assert.equal(setAnalyticsConsent('granted', browser.windowObject, browser.documentObject), false)
})

test('builds only the approved docs page-view dimensions', () => {
  const event = buildDocsGrowthEvent({
    eventID: 'docs-event-1234',
    eventName: 'page_view',
    occurredAt: '2026-07-20T00:00:00.000Z',
    path: '/en/docs/quickstart/?email=secret@example.com',
    sessionID: 'docs-session-1234',
    campaign: 'intl_api_en_v1',
    content: 'curl_readme_body_v1',
    locale: 'en',
  })
  assert.deepEqual(event, {
    event_id: 'docs-event-1234',
    event_name: 'page_view',
    occurred_at: '2026-07-20T00:00:00.000Z',
    path: '/en/docs/quickstart/',
    session_id: 'docs-session-1234',
    first_campaign: 'intl_api_en_v1',
    first_content: 'curl_readme_body_v1',
    locale: 'en',
    properties: {
      surface: DOCS_GROWTH_SURFACE,
    },
  })
  assert.doesNotMatch(JSON.stringify(event), /email|prompt|token|user.?agent|ip_address/i)
})

test('omits unsafe content instead of sending arbitrary campaign text', () => {
  const event = buildDocsGrowthEvent({
    eventID: 'docs-event-content-safe',
    eventName: 'page_view',
    occurredAt: '2026-07-20T00:00:00.000Z',
    path: '/en/docs/quickstart/',
    sessionID: 'docs-session-content-safe',
    campaign: 'intl_api_en_v1',
    content: 'private@example.com',
    locale: 'en',
  })
  assert.ok(event)
  assert.equal('first_content' in event, false)
})

test('derives the original CTA placement and builds the approved click event', () => {
  const href = 'https://agent.gpt88.cc/keys?utm_source=github&utm_content=readme--via--quickstart_task_openai_api&intent=openai_api&lang=en'
  const placement = agentActivationPlacementFromUrl(href)
  assert.equal(placement, 'quickstart_task_openai_api')
  const event = buildDocsGrowthEvent({
    eventID: 'docs-event-5678',
    eventName: 'landing_cta_click',
    occurredAt: '2026-07-20T00:00:01.000Z',
    path: '/en/docs/quickstart/',
    sessionID: 'docs-session-1234',
    campaign: 'intl_api_en_v1',
    content: 'curl_readme_body_v1',
    locale: 'en',
    placement,
    destination: '/keys?email=secret@example.com',
  })
  assert.deepEqual(event?.properties, {
    surface: DOCS_GROWTH_SURFACE,
    placement: 'quickstart_task_openai_api',
    destination: '/keys',
  })
  assert.equal(event?.first_content, 'curl_readme_body_v1')
})

test('does not treat a campaign-relayed Agent navigation as a CTA', () => {
  const href = 'https://agent.gpt88.cc/model-square?utm_source=github&utm_content=ad_a'
  assert.equal(agentActivationPlacementFromUrl(href), '')
})

test('rejects CTA events without a path-form destination', () => {
  const base = {
    eventID: 'docs-event-5678',
    eventName: 'landing_cta_click',
    occurredAt: '2026-07-20T00:00:01.000Z',
    path: '/en/docs/quickstart/',
    sessionID: 'docs-session-1234',
    campaign: 'intl_api_en_v1',
    locale: 'en',
    placement: 'quickstart_task_openai_api',
  }
  assert.equal(buildDocsGrowthEvent(base), null)
  assert.equal(buildDocsGrowthEvent({ ...base, destination: 'https://agent.gpt88.cc/keys' }), null)
})

test('posts one event without credentials or referrer data', async () => {
  const event = buildDocsGrowthEvent({
    eventID: 'docs-event-9012',
    eventName: 'page_view',
    occurredAt: '2026-07-20T00:00:02.000Z',
    path: '/en/',
    sessionID: 'docs-session-1234',
    campaign: 'github_launch',
    locale: 'en',
  })
  assert.ok(event)
  let request
  const sent = await sendDocsGrowthEvent('https://agent.gpt88.cc/api/v1/growth/docs/events', event, async (url, options) => {
    request = { url, options }
    return { ok: true }
  })
  assert.equal(sent, true)
  assert.equal(request.options.credentials, 'omit')
  assert.equal(request.options.referrerPolicy, 'no-referrer')
  assert.equal(request.options.mode, 'cors')
  assert.equal(request.url, 'https://agent.gpt88.cc/api/v1/growth/docs/events')
  assert.deepEqual(JSON.parse(request.options.body), { events: [event] })
  assert.equal(await sendDocsGrowthEvent('', event, async () => { throw new Error('must not run') }), false)
})
