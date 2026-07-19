import { createContext, useContext } from 'react'
import indexableEnglishModels from '../data/indexableEnglishModels.json'

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
}

type LocaleContextValue = {
  locale: Locale
}

const LocaleContext = createContext<LocaleContextValue>({ locale: 'zh' })

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
  '/docs/guides/complete-integration/',
  '/docs/guides/codex-plugins-oauth/',
  '/docs/guides/agent-image-studio/',
  '/docs/guides/gpt-image-2-service-notice/',
  '/docs/guides/agent-image-quality-crop-guide/',
  '/docs/guides/codex-tool-recovery/',
])

export const CORE_TRANSLATED_BASE_PATHS = new Set([
  '/',
  '/docs/overview/',
  '/docs/quickstart/',
  '/docs/auth/',
  '/docs/faq/',
])

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
