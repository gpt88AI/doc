import { Children, isValidElement, type ReactNode } from 'react'
import { LOCALE_CONFIG, localizePath } from '../../lib/locale'
import type { Locale } from '../../lib/locale'

const SITE_URL = 'https://doc.gpt88.cc'
type StructuredLocale = Locale

export type StructuredFaqEntry = {
  question: string
  answer: string
}

const BLOCK_TEXT_ELEMENTS = new Set([
  'address',
  'article',
  'aside',
  'blockquote',
  'div',
  'footer',
  'header',
  'li',
  'main',
  'nav',
  'ol',
  'p',
  'section',
  'table',
  'td',
  'th',
  'tr',
  'ul',
])

function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path
  if (path === '/') return `${SITE_URL}/`
  const clean = path.split(/[?#]/)[0]
  const suffix = path.slice(clean.length)
  const normalized = clean.endsWith('/') ? clean : `${clean}/`
  return `${SITE_URL}${normalized}${suffix}`
}

function breadcrumbList({
  pageUrl,
  pageName,
  parentUrl,
  parentName,
}: {
  pageUrl: string
  pageName: string
  parentUrl: string
  parentName: string
}) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: parentName,
        item: parentUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageName,
        item: pageUrl,
      },
    ],
  }
}

/** Convert the same React answer rendered in the FAQ body into Schema.org plain text. */
export function reactNodeToPlainText(node: ReactNode) {
  function read(value: ReactNode): string {
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value)
    }
    if (isValidElement<{ children?: ReactNode }>(value)) {
      let content = ''
      Children.forEach(value.props.children, child => {
        content += read(child)
      })
      const blockBoundary = typeof value.type === 'string' && BLOCK_TEXT_ELEMENTS.has(value.type)
      return blockBoundary ? `${content} ` : content
    }
    return ''
  }

  let text = ''
  Children.forEach(node, child => {
    text += read(child)
  })
  return text.replace(/\s+/g, ' ').trim()
}

export function docStructuredData(
  title: string,
  description: string,
  path: string,
  locale: StructuredLocale = 'zh',
  faqEntries: StructuredFaqEntry[] = [],
) {
  const pageUrl = absoluteUrl(localizePath(path, locale))
  const docsHomeUrl = absoluteUrl(localizePath('/', locale))
  const breadcrumb = breadcrumbList({
    pageUrl,
    pageName: title,
    parentUrl: docsHomeUrl,
    parentName: locale === 'zh' ? 'gpt88.cc API 文档' : 'gpt88.cc API Docs',
  })
  const article = {
    '@type': 'TechArticle',
    '@id': `${pageUrl}#article`,
    headline: title,
    description,
    inLanguage: LOCALE_CONFIG[locale].hrefLang,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    breadcrumb: { '@id': breadcrumb['@id'] },
    publisher: {
      '@type': 'Organization',
      name: 'gpt88.cc',
      url: 'https://gpt88.cc',
      sameAs: ['https://x.com/webstarchina', 'https://t.me/+CtlYILkGaY1jYzBl'],
    },
  }
  const faqPage = faqEntries.length > 0
    ? {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        url: pageUrl,
        inLanguage: LOCALE_CONFIG[locale].hrefLang,
        breadcrumb: { '@id': breadcrumb['@id'] },
        mainEntity: faqEntries.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
      }
    : null

  return {
    '@context': 'https://schema.org',
    '@graph': [article, breadcrumb, ...(faqPage ? [faqPage] : [])],
  }
}

export function websiteStructuredData(locale: StructuredLocale = 'zh', path = '/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: locale === 'zh' ? 'gpt88.cc API 文档' : `gpt88.cc API Docs · ${LOCALE_CONFIG[locale].nativeName}`,
    url: absoluteUrl(localizePath(path, locale)),
    inLanguage: LOCALE_CONFIG[locale].hrefLang,
    publisher: {
      '@type': 'Organization',
      name: 'gpt88.cc',
      url: 'https://gpt88.cc',
      sameAs: ['https://x.com/webstarchina', 'https://t.me/+CtlYILkGaY1jYzBl'],
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}${localizePath('/models/', locale)}?query={search_term_string}`,
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
  collectionName,
}: {
  name: string
  description: string
  path: string
  provider: string
  category: string
  modelId: string
  locale?: StructuredLocale
  collectionName: string
}) {
  const pageUrl = absoluteUrl(localizePath(path, locale))
  const modelsUrl = absoluteUrl(localizePath('/models/', locale))
  const breadcrumb = breadcrumbList({
    pageUrl,
    pageName: name,
    parentUrl: modelsUrl,
    parentName: collectionName,
  })
  const application = {
    '@type': 'SoftwareApplication',
    '@id': `${pageUrl}#software-application`,
    name,
    description,
    inLanguage: LOCALE_CONFIG[locale].hrefLang,
    applicationCategory: `${category.toUpperCase()} AI Model`,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    breadcrumb: { '@id': breadcrumb['@id'] },
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    softwareVersion: modelId,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [application, breadcrumb],
  }
}
