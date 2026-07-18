import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const publicDir = path.join(root, 'public')

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

function readCanonicalRoute(html) {
  const match = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
  if (!match) return ''
  try {
    const url = new URL(match[1], 'https://doc.gpt88.cc')
    if (url.origin !== 'https://doc.gpt88.cc') return ''
    return normalizeRoute(url.pathname || '/')
  } catch {
    return ''
  }
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

  const missingDistRoutes = sitemapRoutes.filter(route => !fs.existsSync(routeToFile(route)))
  const missingPrerenderRoutes = prerenderRoutes.filter(route => !fs.existsSync(routeToFile(route)))
  const indexableEnglishModelRoutes = ['/models/kimi-k3/']
  const englishModelRoutes = new Set(sitemapRoutes.filter(route => /^\/en\/models\/[^/]+\/$/.test(route)))
  const englishModelRoutePaths = indexableEnglishModelRoutes.map(route => `/en${route}`)
  const missingEnglishModelRoutes = englishModelRoutePaths.filter(route => !englishModelRoutes.has(route))
  const missingEnglishModelDistRoutes = indexableEnglishModelRoutes
    .map(route => `/en${route}`)
    .filter(route => !fs.existsSync(routeToFile(route)))
  const englishModelNoindexRoutes = indexableEnglishModelRoutes
    .map(route => `/en${route}`)
    .filter(route => {
      const file = routeToFile(route)
      return fs.existsSync(file) && hasNoindex(readFile(file))
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
  if (missingEnglishModelDistRoutes.length) {
    failures.push(`Missing prerendered English model files for ${missingEnglishModelDistRoutes.length} models:\n${missingEnglishModelDistRoutes.join('\n')}`)
  }
  if (englishModelNoindexRoutes.length) {
    failures.push(`English model routes marked noindex:\n${englishModelNoindexRoutes.join('\n')}`)
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

  if (failures.length) {
    console.error(failures.join('\n\n'))
    process.exitCode = 1
    return
  }

  console.log(
    `Static route audit passed: ${sitemapRoutes.length} sitemap routes, ${prerenderRoutes.length} prerender routes, ${navRoutes.length} nav routes, ${localModelPatches.length} local model patches, internal links and Suspense SSR checked.`,
  )
}

main()
