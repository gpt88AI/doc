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

function parseSitemapRoutes(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => normalizeRoute(new URL(match[1]).pathname || '/'))
}

function parseNavRoutes(source) {
  const paths = [...source.matchAll(/path:\s*'([^']+)'/g)].map(match => match[1])
  const hrefs = [...source.matchAll(/href:\s*'([^']+)'/g)].map(match => match[1])
  return [...new Set([...paths, ...hrefs].map(normalizeRoute))]
}

function parseLocalCatalogNames(source) {
  return [...source.matchAll(/canonical_name:\s*'([^']+)'/g)].map(match => match[1])
}

function main() {
  const sitemapRoutes = parseSitemapRoutes(readFile(path.join(publicDir, 'sitemap.xml')))
  const sitemapSet = new Set(sitemapRoutes)
  const navRoutes = parseNavRoutes(readFile(path.join(root, 'src/data/nav.ts')))
  const seoSource = readFile(path.join(root, 'scripts/generate-seo-assets.mjs'))
  const modelsSource = readFile(path.join(root, 'src/data/models.ts'))

  const missingDistRoutes = sitemapRoutes.filter(route => !fs.existsSync(routeToFile(route)))
  const navMissingFromSitemap = navRoutes.filter(route => route !== '/docs/' && !sitemapSet.has(route))

  const localModelPatches = ['claude-fable-5', 'claude-opus-4-8'].filter(name =>
    parseLocalCatalogNames(modelsSource).includes(name),
  )
  const missingSeoPatches = localModelPatches.filter(name => !parseLocalCatalogNames(seoSource).includes(name))

  const failures = []
  if (missingDistRoutes.length) {
    failures.push(`Missing prerendered files for ${missingDistRoutes.length} sitemap routes:\n${missingDistRoutes.join('\n')}`)
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
    `Static route audit passed: ${sitemapRoutes.length} sitemap routes, ${navRoutes.length} nav routes, ${localModelPatches.length} local model patches checked.`,
  )
}

main()
