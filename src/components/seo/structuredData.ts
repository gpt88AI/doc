const SITE_URL = 'https://doc.gpt88.cc'
type StructuredLocale = 'zh' | 'en'

function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path
  if (path === '/') return `${SITE_URL}/`
  const clean = path.split(/[?#]/)[0]
  const suffix = path.slice(clean.length)
  const normalized = clean.endsWith('/') ? clean : `${clean}/`
  return `${SITE_URL}${normalized}${suffix}`
}

export function docStructuredData(
  title: string,
  description: string,
  path: string,
  locale: StructuredLocale = 'zh',
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    inLanguage: locale === 'en' ? 'en' : 'zh-CN',
    url: absoluteUrl(path),
    publisher: {
      '@type': 'Organization',
      name: 'gpt88.cc',
      url: 'https://gpt88.cc',
      sameAs: ['https://x.com/webstarchina', 'https://t.me/+CtlYILkGaY1jYzBl'],
    },
  }
}

export function websiteStructuredData(locale: StructuredLocale = 'zh', path = '/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: locale === 'en' ? 'gpt88.cc API Docs' : 'gpt88.cc API 文档',
    url: absoluteUrl(path),
    inLanguage: locale === 'en' ? 'en' : 'zh-CN',
    publisher: {
      '@type': 'Organization',
      name: 'gpt88.cc',
      url: 'https://gpt88.cc',
      sameAs: ['https://x.com/webstarchina', 'https://t.me/+CtlYILkGaY1jYzBl'],
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}${locale === 'en' ? '/en' : ''}/models/?query={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function modelStructuredData({
  name,
  description,
  path,
  provider,
  category,
  modelId,
  locale = 'zh',
}: {
  name: string
  description: string
  path: string
  provider: string
  category: string
  modelId: string
  locale?: StructuredLocale
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    inLanguage: locale === 'en' ? 'en' : 'zh-CN',
    applicationCategory: `${category.toUpperCase()} AI Model`,
    url: absoluteUrl(path),
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    softwareVersion: modelId,
    offers: {
      '@type': 'Offer',
      url: 'https://gpt88.cc',
      priceCurrency: 'CNY',
    },
    sameAs: ['https://x.com/webstarchina', 'https://t.me/+CtlYILkGaY1jYzBl'],
  }
}
