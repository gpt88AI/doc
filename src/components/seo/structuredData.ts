const SITE_URL = 'https://doc.gpt88.cc'

function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
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
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/models?query={search_term_string}`,
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
  }
}
