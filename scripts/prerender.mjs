import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const serverDir = path.join(distDir, 'server')
const siteUrl = (process.env.SITE_URL || 'https://doc.gpt88.cc').replace(/\/$/, '')

function routeToFile(routePath) {
  if (routePath === '/') return path.join(distDir, 'index.html')
  return path.join(distDir, routePath.replace(/^\//, ''), 'index.html')
}

function normalizeRoute(routePath) {
  if (routePath === '/') return '/'
  return routePath.endsWith('/') ? routePath : `${routePath}/`
}

function parsePrerenderRoutes(json) {
  const manifest = JSON.parse(json)
  if (!Array.isArray(manifest.routes)) {
    throw new Error('prerender-routes.json must contain a routes array')
  }
  return [...new Set(manifest.routes.map(normalizeRoute))]
}

function extractHead(html) {
  const tags = []
  let body = html
  const patterns = [
    /<title[^>]*>[\s\S]*?<\/title>/gi,
    /<meta\s+[^>]*>/gi,
    /<link\s+rel="canonical"[^>]*>/gi,
    /<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi,
  ]

  for (const pattern of patterns) {
    body = body.replace(pattern, tag => {
      tags.push(tag)
      return ''
    })
  }

  return {
    head: tags.join('\n    '),
    body,
  }
}

function canonicalizeInternalHrefs(html) {
  return html.replace(/href="(\/(?:docs|models)([^"#]*?))(#[^"]*)?"/g, (_match, pathPart, _rest, hash = '') => {
    if (pathPart.endsWith('/')) return `href="${pathPart}${hash}"`
    return `href="${pathPart}/${hash}"`
  })
}

function applyLocaleAttributes(html, route) {
  const prefix = route.split('/')[1]
  const attributes = {
    en: ['en', 'ltr'],
    'zh-tw': ['zh-TW', 'ltr'],
    es: ['es', 'ltr'],
    'pt-br': ['pt-BR', 'ltr'],
    fr: ['fr', 'ltr'],
    de: ['de', 'ltr'],
    ar: ['ar', 'rtl'],
    ja: ['ja', 'ltr'],
    id: ['id', 'ltr'],
    ru: ['ru', 'ltr'],
    ko: ['ko', 'ltr'],
    vi: ['vi', 'ltr'],
  }[prefix] ?? ['zh-CN', 'ltr']
  return html.replace(/<html lang="[^"]*">/i, `<html lang="${attributes[0]}" dir="${attributes[1]}">`)
}

function injectIntoTemplate(template, rendered) {
  const { head, body } = extractHead(rendered)
  let html = template
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/>\n?/i, '\n')
    .replace(/\s*<title>[\s\S]*?<\/title>\n?/i, '\n')

  html = html.replace('</head>', `    ${head}\n  </head>`)
  return canonicalizeInternalHrefs(html.replace('<div id="root"></div>', `<div id="root">${body}</div>`))
}

async function main() {
  const prerenderRoutesPath = path.join(distDir, 'prerender-routes.json')
  const templatePath = path.join(distDir, 'index.html')
  const serverEntryPath = path.join(serverDir, 'main.ssr.js')

  const [prerenderRoutesJson, template] = await Promise.all([
    fs.readFile(prerenderRoutesPath, 'utf8'),
    fs.readFile(templatePath, 'utf8'),
  ])
  const { render } = await import(pathToFileURL(serverEntryPath).href)
  const routes = parsePrerenderRoutes(prerenderRoutesJson)

  for (const route of routes) {
    const html = applyLocaleAttributes(injectIntoTemplate(template, render(route)), route)
    const filePath = routeToFile(route)
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, html)
  }

  await fs.writeFile(path.join(distDir, '404.html'), applyLocaleAttributes(injectIntoTemplate(template, render('/404')), '/404'))

  await fs.rm(serverDir, { recursive: true, force: true })
  console.log(`Prerendered ${routes.length} routes plus 404 for ${siteUrl}`)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
