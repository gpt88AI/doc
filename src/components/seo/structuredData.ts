const SITE_URL = 'https://doc.gpt88.cc'

function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path
  if (path === '/') return `${SITE_URL}/`
  const clean = path.split(/[?#]/)[0]
  const suffix = path.slice(clean.length)
  const normalized = clean.endsWith('/') ? clean : `${clean}/`
  return `${SITE_URL}${normalized}${suffix}`
}

export function docStructuredData(title: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    inLanguage: 'zh-CN',
    url: absoluteUrl(path),
    publisher: {
      '@type': 'Organization',
      name: 'gpt88.cc',
      url: 'https://gpt88.cc',
      sameAs: ['https://x.com/webstarchina', 'https://t.me/+CtlYILkGaY1jYzBl'],
    },
  }
}

export function websiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'gpt88.cc API 文档',
    url: `${SITE_URL}/`,
    inLanguage: 'zh-CN',
    publisher: {
      '@type': 'Organization',
      name: 'gpt88.cc',
      url: 'https://gpt88.cc',
      sameAs: ['https://x.com/webstarchina', 'https://t.me/+CtlYILkGaY1jYzBl'],
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/models/?query={search_term_string}`,
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
}: {
  name: string
  description: string
  path: string
  provider: string
  category: string
  modelId: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
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
