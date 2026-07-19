import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const publicDir = path.join(root, 'public')
const SITE_URL = 'https://doc.gpt88.cc'
const LOCALE_PREFIXES = new Set([
  'en',
  'zh-tw',
  'es',
  'pt-br',
  'fr',
  'de',
  'ar',
  'ja',
  'id',
  'ru',
  'ko',
  'vi',
])

function normalizeRoute(route) {
  if (route === '/') return '/'
  return route.endsWith('/') ? route : `${route}/`
}

function routeToFile(route) {
  if (route === '/') return path.join(distDir, 'index.html')
  return path.join(distDir, route.replace(/^\//, ''), 'index.html')
}

function readFile(file) {
  return fs.readFileSync(file, 'utf8')
}

function hasNoindex(html) {
  return /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*\bnoindex\b/i.test(html)
}

function hasIncompleteSsr(html) {
  return (
    html.includes('Switched to client rendering because the server rendering aborted') ||
    />Loading\.\.\.<\/div>/.test(html)
  )
}

function readMetaContent(html, name) {
  const pattern = new RegExp(`<meta\\b[^>]*name=["']${name}["'][^>]*content=["']([^"']+)["']`, 'i')
  return html.match(pattern)?.[1]?.trim() || ''
}

function readCanonicalUrl(html) {
  const match = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
  if (!match) return null
  try {
    const url = new URL(match[1], SITE_URL)
    return url.origin === SITE_URL ? url : null
  } catch {
    return null
  }
}

function readCanonicalRoute(html) {
  const url = readCanonicalUrl(html)
  return url ? normalizeRoute(url.pathname || '/') : ''
}

function parseJsonLd(html) {
  const documents = []
  const errors = []
  const pattern = /<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi
  for (const match of html.matchAll(pattern)) {
    try {
      documents.push(JSON.parse(match[1]))
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error))
    }
  }
  return { documents, errors }
}

function jsonLdNodes(documents) {
  return documents.flatMap(document => {
    if (Array.isArray(document)) return jsonLdNodes(document)
    if (!document || typeof document !== 'object') return []
    return Array.isArray(document['@graph']) ? document['@graph'] : [document]
  })
}

function hasSchemaType(node, expectedType) {
  const types = Array.isArray(node?.['@type']) ? node['@type'] : [node?.['@type']]
  return types.includes(expectedType)
}

function containsSchemaType(value, expectedType) {
  if (Array.isArray(value)) return value.some(item => containsSchemaType(item, expectedType))
  if (!value || typeof value !== 'object') return false
  return (
    hasSchemaType(value, expectedType) ||
    Object.values(value).some(item => containsSchemaType(item, expectedType))
  )
}

function splitLocalizedRoute(route) {
  const segments = route.split('/').filter(Boolean)
  const prefix = LOCALE_PREFIXES.has(segments[0]) ? segments.shift() : ''
  return { prefix, segments }
}

function isModelDetailRoute(route) {
  const { segments } = splitLocalizedRoute(route)
  return segments.length === 2 && segments[0] === 'models'
}

function isCoreDocRoute(route) {
  const { segments } = splitLocalizedRoute(route)
  return (
    segments.length === 2 &&
    segments[0] === 'docs' &&
    ['overview', 'auth', 'faq'].includes(segments[1])
  )
}

function expectedBreadcrumbParent(route) {
  const { prefix } = splitLocalizedRoute(route)
  if (isModelDetailRoute(route)) {
    return normalizeRoute(`${prefix ? `/${prefix}` : ''}/models`)
  }
  return prefix ? `/${prefix}/` : '/'
}

function decodeHtmlText(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, decimal) => String.fromCodePoint(Number.parseInt(decimal, 10)))
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&#x27;', "'")
}

function normalizeText(value) {
  return value.replace(/\s+/g, ' ').trim()
}

function readSsrBodyText(html) {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html
  return normalizeText(decodeHtmlText(
    body
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<\/?(?:address|article|aside|blockquote|div|footer|header|li|main|nav|ol|p|section|table|td|th|tr|ul)\b[^>]*>/gi, ' ')
      .replace(/<[^>]+>/g, ''),
  ))
}

function parseSitemapRoutes(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => normalizeRoute(new URL(match[1]).pathname || '/'))
}

function parsePrerenderRoutes(json) {
  const manifest = JSON.parse(json)
  if (!Array.isArray(manifest.routes)) return []
  return [...new Set(manifest.routes.map(normalizeRoute))]
}

function parseInternalPageLinks(html) {
  const routes = []
  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
    const href = match[1]
    let url
    try {
      url = new URL(href, 'https://doc.gpt88.cc')
    } catch {
      continue
    }
    if (url.origin !== 'https://doc.gpt88.cc') continue
    if (path.extname(url.pathname) || url.pathname.startsWith('/assets/')) continue
    routes.push(normalizeRoute(url.pathname || '/'))
  }
  return routes
}

function decodeHtmlAttribute(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
}

function parseAgentActivationLinks(html) {
  const urls = []
  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
    let url
    try {
      url = new URL(decodeHtmlAttribute(match[1]), 'https://doc.gpt88.cc')
    } catch {
      continue
    }
    if (url.origin === 'https://agent.gpt88.cc') urls.push(url)
  }
  return urls
}

function parseNavRoutes(source) {
  const paths = [...source.matchAll(/path:\s*'([^']+)'/g)].map(match => match[1])
  const hrefs = [...source.matchAll(/href:\s*'([^']+)'/g)].map(match => match[1])
  return [...new Set([...paths, ...hrefs].map(normalizeRoute))]
}

function parseCatalogNames(source) {
  return [...source.matchAll(/canonical_name:\s*'([^']+)'/g)].map(match => match[1])
}

function parseCatalogBlockNames(source, startMarker) {
  const start = source.indexOf(startMarker)
  if (start === -1) return []

  const assignment = source.indexOf('=', start)
  if (assignment === -1) return []

  const arrayStart = source.indexOf('[', assignment)
  if (arrayStart === -1) return []

  let depth = 0
  let end = -1
  for (let i = arrayStart; i < source.length; i += 1) {
    const char = source[i]
    if (char === '[') depth += 1
    if (char === ']') {
      depth -= 1
      if (depth === 0) {
        end = i
        break
      }
    }
  }

  if (end === -1) return []
  return parseCatalogNames(source.slice(arrayStart, end + 1))
}

function main() {
  const sitemapRoutes = parseSitemapRoutes(readFile(path.join(publicDir, 'sitemap.xml')))
  const prerenderRoutes = parsePrerenderRoutes(readFile(path.join(publicDir, 'prerender-routes.json')))
  const sitemapSet = new Set(sitemapRoutes)
  const prerenderSet = new Set(prerenderRoutes)
  const navRoutes = parseNavRoutes(readFile(path.join(root, 'src/data/nav.ts')))
  const seoSource = readFile(path.join(root, 'scripts/generate-seo-assets.mjs'))
  const modelsSource = readFile(path.join(root, 'src/data/models.ts'))
  const modelsPageSource = readFile(path.join(root, 'src/pages/ModelsPage.tsx'))
  const structuredDataSource = readFile(path.join(root, 'src/components/seo/structuredData.ts'))
  const indexableEnglishModelSlugs = JSON.parse(
    readFile(path.join(root, 'src/data/indexableEnglishModels.json')),
  )

  const modelSearchContractFailures = []
  if (!/useSearchParams\(\)/.test(modelsPageSource)) {
    modelSearchContractFailures.push('ModelsPage does not read the query string')
  }
  if (!/name="query"/.test(modelsPageSource)) {
    modelSearchContractFailures.push('ModelsPage search form does not expose the query field')
  }
  if (!/searchActive\s*\?\s*nonFeatured/.test(modelsPageSource)) {
    modelSearchContractFailures.push('URL searches are not scoped across every model category')
  }
  if (!/setSearchParams\(nextParams,\s*\{\s*replace:\s*true\s*\}\)/.test(modelsPageSource)) {
    modelSearchContractFailures.push('Model search does not keep a shareable URL without history spam')
  }
  if (!/\?query=\{search_term_string\}/.test(structuredDataSource)) {
    modelSearchContractFailures.push('WebSite SearchAction does not target the model query route')
  }

  const missingDistRoutes = sitemapRoutes.filter(route => !fs.existsSync(routeToFile(route)))
  const missingPrerenderRoutes = prerenderRoutes.filter(route => !fs.existsSync(routeToFile(route)))
  const indexableEnglishModelRoutes = indexableEnglishModelSlugs.map(slug => `/models/${slug}/`)
  const englishModelRoutes = new Set(sitemapRoutes.filter(route => /^\/en\/models\/[^/]+\/$/.test(route)))
  const englishModelRoutePaths = indexableEnglishModelRoutes.map(route => `/en${route}`)
  const llmsIndex = readFile(path.join(publicDir, 'llms.txt'))
  const llmsFullIndex = readFile(path.join(publicDir, 'llms-full.txt'))
  const englishModelsMissingFromLlms = englishModelRoutePaths.filter(route => {
    const absolute = `https://doc.gpt88.cc${route}`
    return !llmsIndex.includes(absolute) || !llmsFullIndex.includes(absolute)
  })
  const missingEnglishModelRoutes = englishModelRoutePaths.filter(route => !englishModelRoutes.has(route))
  const unexpectedEnglishModelRoutes = [...englishModelRoutes]
    .filter(route => !englishModelRoutePaths.includes(route))
  const missingEnglishModelDistRoutes = indexableEnglishModelRoutes
    .map(route => `/en${route}`)
    .filter(route => !fs.existsSync(routeToFile(route)))
  const englishModelNoindexRoutes = indexableEnglishModelRoutes
    .map(route => `/en${route}`)
    .filter(route => {
      const file = routeToFile(route)
      return fs.existsSync(file) && hasNoindex(readFile(file))
    })
  const englishModelCjkRoutes = indexableEnglishModelRoutes
    .map(route => `/en${route}`)
    .filter(route => {
      const file = routeToFile(route)
      return fs.existsSync(file) && /\p{Script=Han}/u.test(readFile(file))
    })
  const englishModelCatalogRoute = '/en/models/'
  const englishModelCatalogFile = routeToFile(englishModelCatalogRoute)
  const englishModelCatalogHasCjk = fs.existsSync(englishModelCatalogFile) &&
    /\p{Script=Han}/u.test(readFile(englishModelCatalogFile))
  const localizedCorePrefixes = ['zh-tw', 'es', 'pt-br', 'fr', 'de', 'ar', 'ja', 'id', 'ru', 'ko', 'vi']
  const localizedCoreFallbackRoutes = localizedCorePrefixes.flatMap(prefix => [
    `/${prefix}/docs/auth/`,
    `/${prefix}/docs/faq/`,
  ]).filter(route => {
    const file = routeToFile(route)
    if (!fs.existsSync(file)) return false
    const html = readFile(file)
    return (
      html.includes('Authorization header') ||
      html.includes('Use the model list endpoint to confirm that your API key can access the requested model before sending production traffic.')
    )
  })
  const navMissingFromSitemap = navRoutes.filter(route => route !== '/docs/' && !sitemapSet.has(route))
  const sitemapNoindexRoutes = sitemapRoutes.filter(route => {
    const file = routeToFile(route)
    return fs.existsSync(file) && hasNoindex(readFile(file))
  })
  const incompleteSsrRoutes = prerenderRoutes.filter(route => {
    const file = routeToFile(route)
    return fs.existsSync(file) && hasIncompleteSsr(readFile(file))
  })
  const missingSeoRoutes = []
  const sitemapCanonicalMismatches = []
  const brokenInternalLinks = new Map()
  for (const route of prerenderRoutes) {
    const file = routeToFile(route)
    if (!fs.existsSync(file)) continue
    const html = readFile(file)
    if (!/<title>[^<]+<\/title>/i.test(html) || !readMetaContent(html, 'description') || !readCanonicalRoute(html)) {
      missingSeoRoutes.push(route)
    }
    if (sitemapSet.has(route) && readCanonicalRoute(html) !== route) {
      sitemapCanonicalMismatches.push(`${route} -> ${readCanonicalRoute(html) || '(missing canonical)'}`)
    }
    for (const linkedRoute of parseInternalPageLinks(html)) {
      if (prerenderSet.has(linkedRoute)) continue
      const sources = brokenInternalLinks.get(linkedRoute) || []
      sources.push(route)
      brokenInternalLinks.set(linkedRoute, sources)
    }
  }

  const breadcrumbContractRoutes = sitemapRoutes.filter(route => (
    isModelDetailRoute(route) || isCoreDocRoute(route)
  ))
  const structuredDataFailures = []
  for (const route of breadcrumbContractRoutes) {
    const file = routeToFile(route)
    if (!fs.existsSync(file)) continue
    const html = readFile(file)
    const canonical = readCanonicalUrl(html)
    const { documents, errors } = parseJsonLd(html)
    const nodes = jsonLdNodes(documents)
    const breadcrumbs = nodes.filter(node => hasSchemaType(node, 'BreadcrumbList'))
    const expectedPrimaryType = isModelDetailRoute(route) ? 'SoftwareApplication' : 'TechArticle'
    const primaryNodes = nodes.filter(node => hasSchemaType(node, expectedPrimaryType))

    if (errors.length) {
      structuredDataFailures.push(`${route}: invalid JSON-LD (${errors.join('; ')})`)
      continue
    }
    if (documents.length !== 1) {
      structuredDataFailures.push(`${route}: expected one JSON-LD document, found ${documents.length}`)
    }
    if (documents.some(document => document?.['@context'] !== 'https://schema.org')) {
      structuredDataFailures.push(`${route}: JSON-LD context must be https://schema.org`)
    }
    if (!canonical) {
      structuredDataFailures.push(`${route}: canonical URL missing or outside ${SITE_URL}`)
      continue
    }
    const canonicalHref = `${SITE_URL}${route}`
    if (canonical.href !== canonicalHref) {
      structuredDataFailures.push(`${route}: canonical must be ${canonicalHref}, found ${canonical.href}`)
    }
    if (primaryNodes.length !== 1) {
      structuredDataFailures.push(`${route}: expected one ${expectedPrimaryType}, found ${primaryNodes.length}`)
    } else {
      const primary = primaryNodes[0]
      if (primary.url !== canonicalHref || primary.mainEntityOfPage !== canonicalHref) {
        structuredDataFailures.push(`${route}: ${expectedPrimaryType} URL does not match the self-canonical`)
      }
      if (primary.breadcrumb?.['@id'] !== breadcrumbs[0]?.['@id']) {
        structuredDataFailures.push(`${route}: ${expectedPrimaryType} does not reference its BreadcrumbList`)
      }
    }
    if (breadcrumbs.length !== 1) {
      structuredDataFailures.push(`${route}: expected one BreadcrumbList, found ${breadcrumbs.length}`)
      continue
    }

    const breadcrumb = breadcrumbs[0]
    const items = Array.isArray(breadcrumb.itemListElement) ? breadcrumb.itemListElement : []
    if (items.length < 2) {
      structuredDataFailures.push(`${route}: BreadcrumbList must have at least two items`)
      continue
    }
    const expectedParentUrl = `${SITE_URL}${expectedBreadcrumbParent(route)}`
    if (items[0]?.item !== expectedParentUrl) {
      structuredDataFailures.push(`${route}: first breadcrumb must be ${expectedParentUrl}`)
    }
    if (items.at(-1)?.item !== canonicalHref) {
      structuredDataFailures.push(`${route}: final breadcrumb must equal the self-canonical`)
    }
    items.forEach((item, index) => {
      if (!hasSchemaType(item, 'ListItem')) {
        structuredDataFailures.push(`${route}: breadcrumb ${index + 1} is not a ListItem`)
      }
      if (item?.position !== index + 1) {
        structuredDataFailures.push(`${route}: breadcrumb positions are not sequential`)
      }
      if (typeof item?.name !== 'string' || !item.name.trim()) {
        structuredDataFailures.push(`${route}: breadcrumb ${index + 1} has no name`)
      }
      try {
        const itemUrl = new URL(item?.item)
        const itemRoute = normalizeRoute(itemUrl.pathname || '/')
        if (itemUrl.origin !== SITE_URL || !prerenderSet.has(itemRoute)) {
          structuredDataFailures.push(`${route}: breadcrumb ${index + 1} targets a non-prerendered page`)
        }
      } catch {
        structuredDataFailures.push(`${route}: breadcrumb ${index + 1} has an invalid item URL`)
      }
    })

    const forbiddenTypes = ['Offer', 'AggregateRating', 'Review', 'SearchAction']
      .filter(type => documents.some(document => containsSchemaType(document, type)))
    if (forbiddenTypes.length) {
      structuredDataFailures.push(`${route}: unsupported structured-data types: ${forbiddenTypes.join(', ')}`)
    }
  }

  const faqContractRoutes = sitemapRoutes.filter(route => {
    const { segments } = splitLocalizedRoute(route)
    return segments.length === 2 && segments[0] === 'docs' && segments[1] === 'faq'
  })
  const faqStructuredDataFailures = []
  const faqSchemaRoutes = new Set(['/docs/faq/', '/en/docs/faq/'])
  for (const route of faqContractRoutes) {
    const file = routeToFile(route)
    if (!fs.existsSync(file)) continue
    const html = readFile(file)
    const { documents, errors } = parseJsonLd(html)
    const faqNodes = jsonLdNodes(documents).filter(node => hasSchemaType(node, 'FAQPage'))
    const shouldHaveFaqSchema = faqSchemaRoutes.has(route)

    if (errors.length) {
      faqStructuredDataFailures.push(`${route}: invalid JSON-LD (${errors.join('; ')})`)
      continue
    }
    if (!shouldHaveFaqSchema) {
      if (faqNodes.length) {
        faqStructuredDataFailures.push(`${route}: FAQPage must not describe untranslated or non-rendered questions`)
      }
      continue
    }
    if (faqNodes.length !== 1) {
      faqStructuredDataFailures.push(`${route}: expected one FAQPage, found ${faqNodes.length}`)
      continue
    }

    const canonicalHref = `${SITE_URL}${route}`
    const faq = faqNodes[0]
    if (faq.url !== canonicalHref) {
      faqStructuredDataFailures.push(`${route}: FAQPage URL does not match the self-canonical`)
    }
    const breadcrumb = jsonLdNodes(documents).find(node => hasSchemaType(node, 'BreadcrumbList'))
    if (faq.breadcrumb?.['@id'] !== breadcrumb?.['@id']) {
      faqStructuredDataFailures.push(`${route}: FAQPage does not reference its BreadcrumbList`)
    }
    const questions = Array.isArray(faq.mainEntity) ? faq.mainEntity : []
    const renderedItemCount = [...html.matchAll(/\bdata-faq-item=["']true["']/gi)].length
    if (!questions.length || questions.length !== renderedItemCount) {
      faqStructuredDataFailures.push(
        `${route}: FAQPage has ${questions.length} questions but SSR rendered ${renderedItemCount} FAQ items`,
      )
    }

    const ssrBodyText = readSsrBodyText(html)
    for (const [index, question] of questions.entries()) {
      const answer = question?.acceptedAnswer
      const questionText = typeof question?.name === 'string' ? normalizeText(question.name) : ''
      const answerText = typeof answer?.text === 'string' ? normalizeText(answer.text) : ''
      if (!hasSchemaType(question, 'Question') || !questionText) {
        faqStructuredDataFailures.push(`${route}: FAQ item ${index + 1} is not a named Question`)
      }
      if (!hasSchemaType(answer, 'Answer') || !answerText) {
        faqStructuredDataFailures.push(`${route}: FAQ item ${index + 1} has no accepted Answer text`)
      }
      if (questionText && !ssrBodyText.includes(questionText)) {
        faqStructuredDataFailures.push(`${route}: FAQ question ${index + 1} is absent from SSR body text`)
      }
      if (answerText && !ssrBodyText.includes(answerText)) {
        faqStructuredDataFailures.push(`${route}: FAQ answer ${index + 1} is absent from SSR body text`)
      }
    }
  }

  const activationRouteContracts = [
    { route: '/', locale: 'zh', surface: 'home' },
    { route: '/en/', locale: 'en', surface: 'home' },
    { route: '/pt-br/', locale: 'pt-BR', surface: 'home' },
    { route: '/id/', locale: 'id', surface: 'home' },
    { route: '/docs/quickstart/', locale: 'zh', surface: 'quickstart' },
    { route: '/en/docs/quickstart/', locale: 'en', surface: 'quickstart' },
    { route: '/pt-br/docs/quickstart/', locale: 'pt-BR', surface: 'quickstart' },
    { route: '/id/docs/quickstart/', locale: 'id', surface: 'quickstart' },
  ]
  const activationContractFailures = []
  for (const contract of activationRouteContracts) {
    const file = routeToFile(contract.route)
    if (!fs.existsSync(file)) {
      activationContractFailures.push(`${contract.route}: prerendered file missing`)
      continue
    }

    const html = readFile(file)
    const links = parseAgentActivationLinks(html)
    const invalidCampaignLinks = links.filter(url => (
      url.searchParams.get('utm_source') !== 'docs' ||
      url.searchParams.get('utm_medium') !== 'referral' ||
      url.searchParams.get('utm_campaign') !== 'activation_quickstart' ||
      url.searchParams.get('lang') !== contract.locale
    ))
    if (invalidCampaignLinks.length) {
      activationContractFailures.push(`${contract.route}: ${invalidCampaignLinks.length} Agent links have invalid campaign or locale fields`)
    }

    const requiredLinks = [
      { path: '/keys', intent: 'openai_api', content: `${contract.surface}_task_openai_api` },
      { path: '/keys', intent: 'claude_api', content: `${contract.surface}_task_claude_api` },
      { path: '/image-studio', intent: 'image_api', content: `${contract.surface}_task_image_api` },
      { path: '/register', intent: 'api_access', content: `${contract.surface}_register_api_access` },
      { path: '/keys', intent: 'api_access', content: `${contract.surface}_keys_api_access` },
    ]
    for (const required of requiredLinks) {
      const found = links.some(url => (
        url.pathname === required.path &&
        url.searchParams.get('intent') === required.intent &&
        url.searchParams.get('utm_content') === required.content
      ))
      if (!found) {
        activationContractFailures.push(
          `${contract.route}: missing ${required.path} ${required.intent} (${required.content})`,
        )
      }
    }

    const legacyConsoleLinks = [...html.matchAll(/<a\b[^>]*\bhref=["'](https:\/\/gpt88\.cc\/?)["']/gi)]
    if (legacyConsoleLinks.length) {
      activationContractFailures.push(`${contract.route}: still links the activation CTA to the legacy console root`)
    }
  }

  const localizedFaqActivationContracts = [
    ['zh-tw', 'zh-TW'],
    ['es', 'es'],
    ['pt-br', 'pt-BR'],
    ['fr', 'fr'],
    ['de', 'de'],
    ['ar', 'ar'],
    ['ja', 'ja'],
    ['id', 'id'],
    ['ru', 'ru'],
    ['ko', 'ko'],
    ['vi', 'vi'],
  ].map(([prefix, locale]) => ({
    route: `/${prefix}/docs/faq/`,
    locale,
    links: [{ path: '/keys', intent: 'api_access', content: 'faq_get_key_api_access' }],
  }))
  const highIntentActivationContracts = [
    {
      route: '/docs/faq/',
      locale: 'zh',
      links: [
        { path: '/keys', intent: 'api_access', content: 'faq_get_key_api_access' },
        { path: '/keys', intent: 'api_access', content: 'faq_config_export_api_access' },
      ],
    },
    {
      route: '/en/docs/faq/',
      locale: 'en',
      links: [{ path: '/keys', intent: 'api_access', content: 'faq_get_key_api_access' }],
    },
    ...localizedFaqActivationContracts,
    {
      route: '/docs/sdk/curl/',
      locale: 'zh',
      links: [{ path: '/keys', intent: 'openai_api', content: 'sdk_curl_setup_openai_api' }],
    },
    {
      route: '/en/docs/sdk/curl/',
      locale: 'en',
      links: [{ path: '/keys', intent: 'openai_api', content: 'sdk_curl_setup_openai_api' }],
    },
    {
      route: '/docs/sdk/python/',
      locale: 'zh',
      links: [{ path: '/keys', intent: 'openai_api', content: 'sdk_python_setup_openai_api' }],
    },
    {
      route: '/en/docs/sdk/python/',
      locale: 'en',
      links: [{ path: '/keys', intent: 'openai_api', content: 'sdk_python_setup_openai_api' }],
    },
    {
      route: '/docs/sdk/nodejs/',
      locale: 'zh',
      links: [{ path: '/keys', intent: 'openai_api', content: 'sdk_nodejs_setup_openai_api' }],
    },
    {
      route: '/en/docs/sdk/nodejs/',
      locale: 'en',
      links: [{ path: '/keys', intent: 'openai_api', content: 'sdk_nodejs_setup_openai_api' }],
    },
    {
      route: '/docs/api/chat-completions/',
      locale: 'zh',
      links: [{ path: '/keys', intent: 'openai_api', content: 'api_chat_completions_auth_openai_api' }],
    },
    {
      route: '/en/docs/api/chat-completions/',
      locale: 'en',
      links: [{ path: '/keys', intent: 'openai_api', content: 'api_chat_completions_auth_openai_api' }],
    },
    {
      route: '/docs/api/list-models/',
      locale: 'zh',
      links: [{ path: '/keys', intent: 'openai_api', content: 'api_list_models_auth_openai_api' }],
    },
    {
      route: '/en/docs/api/list-models/',
      locale: 'en',
      links: [{ path: '/keys', intent: 'openai_api', content: 'api_list_models_auth_openai_api' }],
    },
    {
      route: '/docs/api/grok-video/',
      locale: 'zh',
      links: [{ path: '/keys', intent: 'image_api', content: 'api_grok_video_auth_image_api' }],
    },
    {
      route: '/docs/guides/config-export/',
      locale: 'zh',
      links: [
        { path: '/keys', intent: 'api_access', content: 'config_export_entry_api_access' },
        { path: '/keys', intent: 'api_access', content: 'config_export_rotation_api_access' },
        { path: '/keys', intent: 'api_access', content: 'config_export_security_api_access' },
      ],
    },
    {
      route: '/docs/guides/agent-image-studio/',
      locale: 'zh',
      links: [
        { path: '/image-studio', intent: 'image_api', content: 'agent_image_studio_intro_image_api' },
        { path: '/image-studio', intent: 'image_api', content: 'agent_image_studio_related_image_api' },
      ],
    },
    {
      route: '/en/docs/guides/agent-image-studio/',
      locale: 'en',
      links: [
        { path: '/image-studio', intent: 'image_api', content: 'agent_image_studio_intro_image_api' },
        { path: '/image-studio', intent: 'image_api', content: 'agent_image_studio_related_image_api' },
      ],
    },
  ]
  const highIntentActivationFailures = []
  for (const contract of highIntentActivationContracts) {
    const file = routeToFile(contract.route)
    if (!fs.existsSync(file)) {
      highIntentActivationFailures.push(`${contract.route}: prerendered file missing`)
      continue
    }

    const html = readFile(file)
    const links = parseAgentActivationLinks(html)
    const invalidAttributedLinks = links.filter(url => (
      url.searchParams.get('utm_source') !== 'docs' ||
      url.searchParams.get('utm_medium') !== 'referral' ||
      url.searchParams.get('utm_campaign') !== 'activation_quickstart' ||
      url.searchParams.get('lang') !== contract.locale
    ))
    if (invalidAttributedLinks.length) {
      highIntentActivationFailures.push(
        `${contract.route}: ${invalidAttributedLinks.length} Agent links have invalid campaign or locale fields`,
      )
    }

    for (const expected of contract.links) {
      const found = links.some(url => (
        url.pathname === expected.path &&
        url.searchParams.get('intent') === expected.intent &&
        url.searchParams.get('utm_content') === expected.content
      ))
      if (!found) {
        highIntentActivationFailures.push(
          `${contract.route}: missing ${expected.path} ${expected.intent} (${expected.content})`,
        )
      }
    }

    const legacyActivationLinks = [
      ...html.matchAll(/<a\b[^>]*\bhref=["']https:\/\/(?:gpt88\.cc|agent\.gpt88\.cc)\/?["']/gi),
    ]
    if (legacyActivationLinks.length) {
      highIntentActivationFailures.push(
        `${contract.route}: ${legacyActivationLinks.length} activation links still use a legacy site root`,
      )
    }
  }

  const englishModelActivationFailures = []
  for (const route of englishModelRoutePaths) {
    const file = routeToFile(route)
    if (!fs.existsSync(file)) continue
    const links = parseAgentActivationLinks(readFile(file))
    const slug = route.split('/').filter(Boolean).at(-1)
    const expectedIntent = slug.startsWith('claude-') ? 'claude_api' : 'openai_api'
    const expectedContent = `model_${slug}_${expectedIntent}`
    const hasKeyLink = links.some(url => (
      url.pathname === '/keys' &&
      url.searchParams.get('utm_source') === 'docs' &&
      url.searchParams.get('utm_medium') === 'referral' &&
      url.searchParams.get('utm_campaign') === 'activation_quickstart' &&
      url.searchParams.get('utm_content') === expectedContent &&
      url.searchParams.get('intent') === expectedIntent &&
      url.searchParams.get('lang') === 'en'
    ))
    if (!hasKeyLink) {
      englishModelActivationFailures.push(`${route}: missing attributed Agent /keys CTA`)
    }
  }

  const localModelPatches = parseCatalogBlockNames(modelsSource, 'const LOCAL_CATALOG_ROWS')
  const seoLocalPatches = parseCatalogBlockNames(seoSource, 'const localCatalog')
  const missingSeoPatches = localModelPatches.filter(name => !seoLocalPatches.includes(name))

  const failures = []
  if (missingDistRoutes.length) {
    failures.push(`Missing prerendered files for ${missingDistRoutes.length} sitemap routes:\n${missingDistRoutes.join('\n')}`)
  }
  if (missingPrerenderRoutes.length) {
    failures.push(`Missing prerendered files for ${missingPrerenderRoutes.length} valid routes:\n${missingPrerenderRoutes.join('\n')}`)
  }
  if (missingEnglishModelRoutes.length) {
    failures.push(`Missing English model routes in sitemap for ${missingEnglishModelRoutes.length} models:\n${missingEnglishModelRoutes.join('\n')}`)
  }
  if (englishModelsMissingFromLlms.length) {
    failures.push(`English model routes missing from llms indexes:\n${englishModelsMissingFromLlms.join('\n')}`)
  }
  if (unexpectedEnglishModelRoutes.length) {
    failures.push(`Thin English model routes unexpectedly present in sitemap:\n${unexpectedEnglishModelRoutes.join('\n')}`)
  }
  if (missingEnglishModelDistRoutes.length) {
    failures.push(`Missing prerendered English model files for ${missingEnglishModelDistRoutes.length} models:\n${missingEnglishModelDistRoutes.join('\n')}`)
  }
  if (englishModelNoindexRoutes.length) {
    failures.push(`English model routes marked noindex:\n${englishModelNoindexRoutes.join('\n')}`)
  }
  if (englishModelCjkRoutes.length) {
    failures.push(`English model routes containing CJK copy:\n${englishModelCjkRoutes.join('\n')}`)
  }
  if (englishModelCatalogHasCjk) {
    failures.push(`${englishModelCatalogRoute}: English model catalog contains CJK copy`)
  }
  if (localizedCoreFallbackRoutes.length) {
    failures.push(`Localized core routes containing English fallback copy:\n${localizedCoreFallbackRoutes.join('\n')}`)
  }
  if (sitemapNoindexRoutes.length) {
    failures.push('Sitemap routes marked noindex:\n' + sitemapNoindexRoutes.join('\n'))
  }
  if (incompleteSsrRoutes.length) {
    failures.push(
      `Routes with incomplete Suspense SSR (${incompleteSsrRoutes.length}):\n${incompleteSsrRoutes.join('\n')}`,
    )
  }
  if (brokenInternalLinks.size) {
    failures.push(
      `Broken internal page links (${brokenInternalLinks.size}):\n${[...brokenInternalLinks]
        .map(([route, sources]) => `${route} <- ${[...new Set(sources)].slice(0, 3).join(', ')}`)
        .join('\n')}`,
    )
  }
  if (missingSeoRoutes.length) {
    failures.push(`Prerendered routes missing title, description, or canonical (${missingSeoRoutes.length}):\n${missingSeoRoutes.join('\n')}`)
  }
  if (sitemapCanonicalMismatches.length) {
    failures.push(`Sitemap routes with mismatched canonical URLs:\n${sitemapCanonicalMismatches.join('\n')}`)
  }
  if (navMissingFromSitemap.length) {
    failures.push(`Routes present in nav but missing from sitemap:\n${navMissingFromSitemap.join('\n')}`)
  }
  if (missingSeoPatches.length) {
    failures.push(`Local model patch rows missing from SEO generator:\n${missingSeoPatches.join('\n')}`)
  }
  if (activationContractFailures.length) {
    failures.push(`Activation link contract failures:\n${activationContractFailures.join('\n')}`)
  }
  if (highIntentActivationFailures.length) {
    failures.push(`High-intent activation link failures:\n${highIntentActivationFailures.join('\n')}`)
  }
  if (englishModelActivationFailures.length) {
    failures.push(`English model activation link failures:\n${englishModelActivationFailures.join('\n')}`)
  }
  if (modelSearchContractFailures.length) {
    failures.push(`Model search contract failures:\n${modelSearchContractFailures.join('\n')}`)
  }
  if (structuredDataFailures.length) {
    failures.push(`Structured-data breadcrumb failures:\n${structuredDataFailures.join('\n')}`)
  }
  if (faqStructuredDataFailures.length) {
    failures.push(`FAQ structured-data failures:\n${faqStructuredDataFailures.join('\n')}`)
  }

  if (failures.length) {
    console.error(failures.join('\n\n'))
    process.exitCode = 1
    return
  }

  console.log(
    `Static route audit passed: ${sitemapRoutes.length} sitemap routes, ${prerenderRoutes.length} prerender routes, ${navRoutes.length} nav routes, ${localModelPatches.length} local model patches, ${activationRouteContracts.length} activation routes, ${highIntentActivationContracts.length} high-intent activation routes, ${englishModelRoutePaths.length} indexable English model routes, ${breadcrumbContractRoutes.length} breadcrumb contracts, ${faqSchemaRoutes.size} FAQ schema routes, localized core copy, JSON-LD/body parity, internal links and Suspense SSR checked.`,
  )
}

main()
