import assert from 'node:assert/strict'
import test from 'node:test'

import {
  parseInboundAcquisition,
  relayAcquisitionToAgentUrl,
} from '../src/lib/activationAttribution.ts'

const activationUrl = 'https://agent.gpt88.cc/keys?utm_source=docs&utm_medium=referral&utm_campaign=activation_quickstart&utm_content=model_gpt-5-6-sol_openai_api&intent=openai_api&lang=en'

test('keeps static attribution when no external campaign is present', () => {
  assert.equal(parseInboundAcquisition('?utm_source=docs&utm_campaign=internal'), null)
  assert.equal(relayAcquisitionToAgentUrl(activationUrl, null), activationUrl)
})

test('relays allowlisted external UTM fields while retaining the activation placement', () => {
  const acquisition = parseInboundAcquisition(
    '?utm_source=GitHub&utm_medium=community&utm_campaign=intl_api_en_v1&utm_term=openai_api&utm_content=readme_cta&email=secret@example.com&gclid=private-token',
  )
  assert.deepEqual(acquisition, {
    source: 'github',
    medium: 'community',
    campaign: 'intl_api_en_v1',
    term: 'openai_api',
    content: 'readme_cta',
  })

  const relayed = new URL(relayAcquisitionToAgentUrl(activationUrl, acquisition))
  assert.equal(relayed.pathname, '/keys')
  assert.equal(relayed.searchParams.get('utm_source'), 'github')
  assert.equal(relayed.searchParams.get('utm_medium'), 'community')
  assert.equal(relayed.searchParams.get('utm_campaign'), 'intl_api_en_v1')
  assert.equal(relayed.searchParams.get('utm_term'), 'openai_api')
  assert.equal(relayed.searchParams.get('utm_content'), 'readme_cta--via--model_gpt-5-6-sol_openai_api')
  assert.equal(relayed.searchParams.get('intent'), 'openai_api')
  assert.equal(relayed.searchParams.get('lang'), 'en')
  assert.equal(relayed.searchParams.has('email'), false)
  assert.equal(relayed.searchParams.has('gclid'), false)
})

test('uses campaign medium and removes the static campaign when upstream omits both', () => {
  const acquisition = parseInboundAcquisition('?utm_source=telegram')
  const relayed = new URL(relayAcquisitionToAgentUrl(activationUrl, acquisition))
  assert.equal(relayed.searchParams.get('utm_medium'), 'campaign')
  assert.equal(relayed.searchParams.has('utm_campaign'), false)
  assert.equal(relayed.searchParams.get('utm_content'), 'model_gpt-5-6-sol_openai_api')
})

test('rejects sensitive or malformed source values', () => {
  assert.equal(parseInboundAcquisition('?utm_source=secret@example.com'), null)
  assert.equal(parseInboundAcquisition('?utm_source=https://github.com/team'), null)
  assert.equal(parseInboundAcquisition('?utm_source=sk-abcdefghijklmnopqrstuvwxyz'), null)
  assert.equal(parseInboundAcquisition('?utm_source=1234567890123456'), null)
  assert.equal(parseInboundAcquisition('?utm_source=mozilla/5.0'), null)
  assert.equal(parseInboundAcquisition('?utm_source=curl/8.0'), null)
  assert.equal(parseInboundAcquisition('?utm_source=postmanruntime/7.0'), null)
})

test('is idempotent when the same campaign is applied more than once', () => {
  const acquisition = parseInboundAcquisition('?utm_source=x&utm_medium=social&utm_campaign=intl_api_en_v1&utm_content=post_a')
  const once = relayAcquisitionToAgentUrl(activationUrl, acquisition)
  const twice = relayAcquisitionToAgentUrl(once, acquisition)
  assert.equal(twice, once)
})

test('does not mutate non-Agent destinations', () => {
  const href = 'https://gpt88.cc/pricing?utm_source=legacy_site'
  const acquisition = parseInboundAcquisition('?utm_source=github')
  assert.equal(relayAcquisitionToAgentUrl(href, acquisition), href)
})

test('preserves acquisition on non-CTA Agent discovery links', () => {
  const acquisition = parseInboundAcquisition('?utm_source=github&utm_medium=community&utm_campaign=intl_api_en_v1')
  const relayed = new URL(relayAcquisitionToAgentUrl('https://agent.gpt88.cc/model-square', acquisition))
  assert.equal(relayed.pathname, '/model-square')
  assert.equal(relayed.searchParams.get('utm_source'), 'github')
  assert.equal(relayed.searchParams.get('utm_campaign'), 'intl_api_en_v1')
})

test('caps merged content at the backend dimension limit', () => {
  const longContent = 'campaign-creative-'.repeat(12).slice(0, 190)
  const acquisition = parseInboundAcquisition(`?utm_source=x&utm_content=${longContent}`)
  const relayed = new URL(relayAcquisitionToAgentUrl(activationUrl, acquisition))
  assert.equal(relayed.searchParams.get('utm_content')?.length, 200)
  assert.match(relayed.searchParams.get('utm_content') || '', /--via--model_gpt-5-6-sol_openai_api$/)
})
