import { createContext, useContext } from 'react'

export type Locale = 'zh' | 'en'

type LocaleContextValue = {
  locale: Locale
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'zh',
})

const EN_PREFIX = '/en'

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
  '/docs/guides/gpt88-ai-proxy/',
  '/docs/guides/gpt88-tutorial/',
  '/docs/guides/complete-integration/',
  '/docs/guides/codex-plugins-oauth/',
  '/docs/guides/agent-image-studio/',
  '/docs/guides/gpt-image-2-service-notice/',
  '/docs/guides/agent-image-quality-crop-guide/',
  '/docs/guides/codex-tool-recovery/',
])

export function normalizePath(path = '/') {
  const clean = path.split(/[?#]/)[0] || '/'
  if (clean === '/') return '/'
  return clean.endsWith('/') ? clean : `${clean}/`
}

export function stripLocalePrefix(path = '/') {
  const normalized = normalizePath(path)
  if (normalized === `${EN_PREFIX}/`) return '/'
  if (normalized.startsWith(`${EN_PREFIX}/`)) {
    return normalizePath(normalized.slice(EN_PREFIX.length))
  }
  if (normalized === '/zh/') return '/'
  if (normalized.startsWith('/zh/')) {
    return normalizePath(normalized.slice(3))
  }
  return normalized
}

export function localizePath(path: string, locale: Locale) {
  const basePath = stripLocalePrefix(path)
  if (locale === 'zh') return basePath
  if (basePath === '/') return `${EN_PREFIX}/`
  return `${EN_PREFIX}${basePath}`
}

export function isTranslatedPath(locale: Locale, path: string) {
  const basePath = stripLocalePrefix(path)
  if (locale === 'zh') return true
  return EN_TRANSLATED_BASE_PATHS.has(basePath)
}

export function switchLocalePath(path: string, target: Locale) {
  return localizePath(stripLocalePrefix(path), target)
}

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
