import { createContext, useContext } from 'react'
import indexableEnglishModels from '../data/indexableEnglishModels.json'
import { EN_BLOG_SLUGS } from '../data/blog'

export const SUPPORTED_LOCALES = [
  'zh',
  'en',
  'zh-TW',
  'es',
  'pt-BR',
  'fr',
  'de',
  'ar',
  'ja',
  'id',
  'ru',
  'ko',
  'vi',
  'hi',
  'bn',
  'ur',
  'ta',
  'ne',
  'si',
] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export type LocaleConfig = {
  code: Locale
  pathPrefix: string
  hrefLang: string
  nativeName: string
  shortName: string
  direction: 'ltr' | 'rtl'
}

export const LOCALE_CONFIG: Record<Locale, LocaleConfig> = {
  zh: { code: 'zh', pathPrefix: '', hrefLang: 'zh-CN', nativeName: '简体中文', shortName: '中文', direction: 'ltr' },
  en: { code: 'en', pathPrefix: '/en', hrefLang: 'en', nativeName: 'English', shortName: 'EN', direction: 'ltr' },
  'zh-TW': { code: 'zh-TW', pathPrefix: '/zh-tw', hrefLang: 'zh-TW', nativeName: '繁體中文', shortName: '繁中', direction: 'ltr' },
  es: { code: 'es', pathPrefix: '/es', hrefLang: 'es', nativeName: 'Español', shortName: 'ES', direction: 'ltr' },
  'pt-BR': { code: 'pt-BR', pathPrefix: '/pt-br', hrefLang: 'pt-BR', nativeName: 'Português (Brasil)', shortName: 'PT-BR', direction: 'ltr' },
  fr: { code: 'fr', pathPrefix: '/fr', hrefLang: 'fr', nativeName: 'Français', shortName: 'FR', direction: 'ltr' },
  de: { code: 'de', pathPrefix: '/de', hrefLang: 'de', nativeName: 'Deutsch', shortName: 'DE', direction: 'ltr' },
  ar: { code: 'ar', pathPrefix: '/ar', hrefLang: 'ar', nativeName: 'العربية', shortName: 'AR', direction: 'rtl' },
  ja: { code: 'ja', pathPrefix: '/ja', hrefLang: 'ja', nativeName: '日本語', shortName: 'JA', direction: 'ltr' },
  id: { code: 'id', pathPrefix: '/id', hrefLang: 'id', nativeName: 'Bahasa Indonesia', shortName: 'ID', direction: 'ltr' },
  ru: { code: 'ru', pathPrefix: '/ru', hrefLang: 'ru', nativeName: 'Русский', shortName: 'RU', direction: 'ltr' },
  ko: { code: 'ko', pathPrefix: '/ko', hrefLang: 'ko', nativeName: '한국어', shortName: 'KO', direction: 'ltr' },
  vi: { code: 'vi', pathPrefix: '/vi', hrefLang: 'vi', nativeName: 'Tiếng Việt', shortName: 'VI', direction: 'ltr' },
  hi: { code: 'hi', pathPrefix: '/hi', hrefLang: 'hi', nativeName: 'हिन्दी', shortName: 'HI', direction: 'ltr' },
  bn: { code: 'bn', pathPrefix: '/bn', hrefLang: 'bn', nativeName: 'বাংলা', shortName: 'BN', direction: 'ltr' },
  ur: { code: 'ur', pathPrefix: '/ur', hrefLang: 'ur', nativeName: 'اردو', shortName: 'UR', direction: 'rtl' },
  ta: { code: 'ta', pathPrefix: '/ta', hrefLang: 'ta', nativeName: 'தமிழ்', shortName: 'TA', direction: 'ltr' },
  ne: { code: 'ne', pathPrefix: '/ne', hrefLang: 'ne', nativeName: 'नेपाली', shortName: 'NE', direction: 'ltr' },
  si: { code: 'si', pathPrefix: '/si', hrefLang: 'si', nativeName: 'සිංහල', shortName: 'SI', direction: 'ltr' },
}

type LocaleContextValue = {
  locale: Locale
}

const LocaleContext = createContext<LocaleContextValue>({ locale: 'zh' })

const ENGLISH_DOCUMENT_PATHS = [
  '/docs/api/grok-video/',
  '/docs/changelog/',
  '/docs/guides/agent-foundations/',
  '/docs/guides/agent-interview-project/',
  '/docs/guides/agent-job-map/',
  '/docs/guides/agent-production/',
  '/docs/guides/agent-rag/',
  '/docs/guides/agent-tools-mcp/',
  '/docs/guides/ai-video-storyboard-guide/',
  '/docs/guides/claude-code-compaction-error/',
  '/docs/guides/claude-distillation-model-security/',
  '/docs/guides/codex-chatgpt-phone-verification/',
  '/docs/guides/codex-frontend-taste-skill/',
  '/docs/guides/codex-gpt-image-2-skill/',
  '/docs/guides/codex-gpt55-system-overview/',
  '/docs/guides/codex-project-factory-delivery/',
  '/docs/guides/codex-skills-context-engineering/',
  '/docs/guides/codex-windows-powershell7-timeout/',
  '/docs/guides/ecc-agent-harness/',
  '/docs/guides/ecommerce-tools-special/',
  '/docs/guides/giffgaff-sim-guide/',
  '/docs/guides/gpt88-docs-map/',
  '/docs/guides/gpt88-migration/',
  '/docs/guides/kimi-k3-guide/',
  '/docs/guides/loop-engineering-harness/',
  '/docs/guides/us-virtual-card-guide/',
  '/docs/guides/video-creator-tools-workflow/',
  '/docs/guides/video-generation-skills-ai-video-director/',
  '/docs/guides/video-generation-skills-brand-ad-cg/',
  '/docs/guides/video-generation-skills-complex-action-storyboard/',
  '/docs/guides/video-generation-skills-ecommerce/',
  '/docs/guides/video-generation-skills-i2v-prompt/',
  '/docs/guides/video-generation-skills-install/',
  '/docs/guides/video-generation-skills-overview/',
  '/docs/guides/video-generation-skills-product-cg/',
  '/docs/guides/video-generation-skills-prompt-director/',
  '/docs/guides/video-generation-skills-scene-consistency/',
  '/docs/guides/video-generation-skills-tvc-playbook/',
  '/docs/guides/video-generation-skills-white-background-scaling/',
  '/docs/guides/workrally-ai-generation/',
  '/docs/guides/workrally-canvas-guide/',
  '/docs/guides/workrally-common-pitfalls/',
  '/docs/guides/workrally-overview/',
  '/docs/guides/workrally-shot-workflow/',
  '/docs/guides/workrally-upload-assets/',
  '/docs/guides/zero-downtime-release/',
  '/docs/sdk/openai-sdk/',
  '/docs/guides/model-price-comparison/',
  '/docs/guides/api-key-first-request-failed/',
  '/docs/guides/config-export/',
] as const

export const EN_TRANSLATED_BASE_PATHS = new Set([
  '/',
  '/404/',
  '/docs/overview/',
  '/docs/quickstart/',
  '/docs/auth/',
  '/docs/faq/',
  '/docs/integrations/',
  '/docs/integrations/chat/chatbox/',
  '/docs/integrations/chat/cherry-studio/',
  '/docs/integrations/chat/anythingllm/',
  '/docs/integrations/dev/claude-code/',
  '/docs/integrations/dev/cursor/',
  '/docs/integrations/dev/cline/',
  '/docs/integrations/dev/gemini-cli/',
  '/docs/integrations/dev/codex-cli/',
  '/docs/integrations/dev/cc-switch/',
  '/docs/integrations/platforms/dify/',
  '/docs/integrations/platforms/immersive-translate/',
  '/docs/api/chat-completions/',
  '/docs/api/images/',
  '/docs/api/list-models/',
  '/docs/api/errors/',
  '/docs/sdk/curl/',
  '/docs/sdk/python/',
  '/docs/sdk/nodejs/',
  '/models/',
  ...indexableEnglishModels.map(slug => `/models/${slug}/`),
  '/docs/guides/gpt88-ai-proxy/',
  '/docs/guides/gpt88-tutorial/',
  '/docs/guides/agent/',
  '/docs/guides/complete-integration/',
  '/docs/guides/billing-units/',
  '/docs/guides/kimi-k3-review/',
  '/docs/guides/grok-4-6-review/',
  '/docs/guides/harness-inspector/',
  '/docs/guides/codex-plugins-oauth/',
  '/docs/guides/agent-image-studio/',
  '/docs/guides/gpt-image-2-service-notice/',
  '/docs/guides/async-image-generation-notice/',
  '/docs/guides/async-image-generation-guide/',
  '/docs/guides/agent-image-quality-crop-guide/',
  '/docs/guides/codex-knowledge-work/',
  '/docs/guides/codex-plugins-research-workflow/',
  '/docs/guides/codex-parallel-automation-workflow/',
  '/docs/guides/codex-tool-recovery/',
  '/docs/guides/codex-http-responses-reconnect/',
  '/docs/blog/',
  ...ENGLISH_DOCUMENT_PATHS,
  ...EN_BLOG_SLUGS.map(slug => `/docs/blog/${slug}/`),
])

export const CORE_TRANSLATED_BASE_PATHS = new Set([
  '/',
  '/docs/overview/',
  '/docs/quickstart/',
  '/docs/auth/',
  '/docs/faq/',
])

const SOUTH_ASIAN_BLOG_LOCALES = new Set<Locale>(['hi', 'bn', 'ur', 'ta', 'ne', 'si'])

export function normalizePath(path = '/') {
  const clean = path.split(/[?#]/)[0] || '/'
  if (clean === '/') return '/'
  return clean.endsWith('/') ? clean : `${clean}/`
}

export function stripLocalePrefix(path = '/') {
  const normalized = normalizePath(path)
  for (const config of Object.values(LOCALE_CONFIG)) {
    if (!config.pathPrefix) continue
    if (normalized === `${config.pathPrefix}/`) return '/'
    if (normalized.startsWith(`${config.pathPrefix}/`)) {
      return normalizePath(normalized.slice(config.pathPrefix.length))
    }
  }
  return normalized
}

export function localizePath(path: string, locale: Locale) {
  const basePath = stripLocalePrefix(path)
  const prefix = LOCALE_CONFIG[locale].pathPrefix
  if (!prefix) return basePath
  if (basePath === '/') return `${prefix}/`
  return `${prefix}${basePath}`
}

export function isTranslatedPath(locale: Locale, path: string) {
  const basePath = stripLocalePrefix(path)
  if (locale === 'zh') return true
  if (locale === 'en') return EN_TRANSLATED_BASE_PATHS.has(basePath)
  if (SOUTH_ASIAN_BLOG_LOCALES.has(locale) && (basePath === '/docs/blog/' || basePath.startsWith('/docs/blog/'))) return true
  return CORE_TRANSLATED_BASE_PATHS.has(basePath)
}

export function switchLocalePath(path: string, target: Locale) {
  return localizePath(stripLocalePrefix(path), target)
}

export function localizedContentPath(path: string, locale: Locale) {
  const basePath = stripLocalePrefix(path)
  return localizePath(basePath, isTranslatedPath(locale, basePath) ? locale : 'en')
}

export function localeFromPath(path = '/') {
  const normalized = normalizePath(path)
  return SUPPORTED_LOCALES.find(locale => {
    const prefix = LOCALE_CONFIG[locale].pathPrefix
    return prefix && (normalized === `${prefix}/` || normalized.startsWith(`${prefix}/`))
  }) ?? 'zh'
}

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  return <LocaleContext.Provider value={{ locale }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}
