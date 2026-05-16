import { useEffect } from 'react'

const SITE_NAME = 'gpt88.cc API 文档'
const SITE_URL = 'https://doc.gpt88.cc'
const DEFAULT_DESCRIPTION =
  'gpt88.cc 是统一 API 网关，OpenAI 兼容接口，多模型一键接入。开发者文档包含快速开始、API Reference、SDK 示例与模型导航。'

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
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
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
  description = DEFAULT_DESCRIPTION,
  path = '/',
  type = 'website',
  noindex = false,
  structuredData,
}: SeoProps) {
  const fullTitle = title.includes('gpt88.cc') ? title : `${title} · ${SITE_NAME}`
  const url = absoluteUrl(path)
  const robots = noindex ? 'noindex,nofollow' : 'index,follow'

  useEffect(() => {
    document.title = fullTitle
    setCanonical(url)
    setMeta('name', 'description', description)
    setMeta('name', 'robots', robots)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('name', 'twitter:card', 'summary')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setStructuredData(structuredData)
  }, [description, fullTitle, robots, structuredData, type, url])

  if (typeof document === 'undefined') {
    return (
      <>
        <title>{fullTitle}</title>
        <link rel="canonical" href={url} />
        <meta name="description" content={description} />
        <meta name="robots" content={robots} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
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
