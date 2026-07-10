import { useEffect } from 'react'
import { isTranslatedPath, localizePath, useLocale } from '../../lib/locale'

const SITE_URL = 'https://doc.gpt88.cc'

type SeoProps = {
  title: string
  description?: string
  path?: string
  type?: 'website' | 'article'
  noindex?: boolean
  structuredData?: Record<string, unknown>
}

function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path
  if (path === '/') return `${SITE_URL}/`
  const clean = path.split(/[?#]/)[0]
  const suffix = path.slice(clean.length)
  const normalized = clean.endsWith('/') ? clean : `${clean}/`
  return `${SITE_URL}${normalized}${suffix}`
}

function setMeta(attribute: 'name' | 'property', key: string, content?: string) {
  if (!content) return
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"][data-gpt88-seo="true"]`,
  )
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    element.setAttribute('data-gpt88-seo', 'true')
    document.head.appendChild(element)
  }
  element.content = content
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"][data-gpt88-seo="true"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    link.setAttribute('data-gpt88-seo', 'true')
    document.head.appendChild(link)
  }
  link.href = url
}

function setAlternateLinks(entries: Array<{ hrefLang: string; href: string }>) {
  const selector = 'link[rel="alternate"][data-gpt88-seo="true"]'
  document.head.querySelectorAll(selector).forEach(node => node.remove())
  entries.forEach(entry => {
    const link = document.createElement('link')
    link.rel = 'alternate'
    link.hreflang = entry.hrefLang
    link.href = entry.href
    link.setAttribute('data-gpt88-seo', 'true')
    document.head.appendChild(link)
  })
}

function setStructuredData(data?: Record<string, unknown>) {
  const id = 'gpt88-jsonld'
  let script = document.getElementById(id) as HTMLScriptElement | null
  if (!data) {
    script?.remove()
    return
  }
  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.text = JSON.stringify(data)
}

export function Seo({
  title,
  description,
  path = '/',
  type = 'website',
  noindex = false,
  structuredData,
}: SeoProps) {
  const { locale } = useLocale()
  const siteName = locale === 'en' ? 'gpt88.cc API Docs' : 'gpt88.cc API 文档'
  const defaultDescription =
    locale === 'en'
      ? 'gpt88.cc is a unified API gateway with OpenAI-compatible access and one-click multi-model integration. The docs cover quickstart, API reference, SDK examples, and the model catalog.'
      : 'gpt88.cc 是统一 API 网关，OpenAI 兼容接口，多模型一键接入。开发者文档包含快速开始、API Reference、SDK 示例与模型导航。'
  const resolvedDescription = description ?? defaultDescription
  const fullTitle = title.includes('gpt88.cc') ? title : `${title} · ${siteName}`
  const translated = isTranslatedPath(locale, path)
  const localizedUrl = absoluteUrl(localizePath(path, locale))
  const zhUrl = absoluteUrl(localizePath(path, 'zh'))
  const enUrl = absoluteUrl(localizePath(path, 'en'))
  const url = locale === 'en' && !translated ? zhUrl : localizedUrl
  const robots = noindex || (locale === 'en' && !translated) ? 'noindex,follow' : 'index,follow'

  useEffect(() => {
    document.title = fullTitle
    document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN'
    setCanonical(url)
    setAlternateLinks([
      { hrefLang: 'zh-CN', href: zhUrl },
      { hrefLang: 'en', href: enUrl },
      { hrefLang: 'x-default', href: zhUrl },
    ])
    setMeta('name', 'description', resolvedDescription)
    setMeta('name', 'robots', robots)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', resolvedDescription)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:site_name', siteName)
    setMeta('name', 'twitter:card', 'summary')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', resolvedDescription)
    setStructuredData(structuredData)
  }, [enUrl, fullTitle, locale, resolvedDescription, robots, siteName, structuredData, type, url, zhUrl])

  if (typeof document === 'undefined') {
    return (
      <>
        <title>{fullTitle}</title>
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="zh-CN" href={zhUrl} />
        <link rel="alternate" hrefLang="en" href={enUrl} />
        <link rel="alternate" hrefLang="x-default" href={zhUrl} />
        <meta name="description" content={resolvedDescription} />
        <meta name="robots" content={robots} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={resolvedDescription} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={siteName} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={resolvedDescription} />
        {structuredData ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        ) : null}
      </>
    )
  }

  return null
}
