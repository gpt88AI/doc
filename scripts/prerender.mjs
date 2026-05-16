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

function parseSitemap(xml) {
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
  return matches.map(match => {
    const url = new URL(match[1])
    return url.pathname || '/'
  })
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

function injectIntoTemplate(template, rendered) {
  const { head, body } = extractHead(rendered)
  let html = template
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/>\n?/i, '\n')
    .replace(/\s*<title>[\s\S]*?<\/title>\n?/i, '\n')

  html = html.replace('</head>', `    ${head}\n  </head>`)
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

async function main() {
  const sitemapPath = path.join(distDir, 'sitemap.xml')
  const templatePath = path.join(distDir, 'index.html')
  const serverEntryPath = path.join(serverDir, 'main.ssr.js')

  const [sitemap, template] = await Promise.all([
    fs.readFile(sitemapPath, 'utf8'),
    fs.readFile(templatePath, 'utf8'),
  ])
  const { render } = await import(pathToFileURL(serverEntryPath).href)
  const routes = parseSitemap(sitemap)

  for (const route of routes) {
    const html = injectIntoTemplate(template, render(route))
    const filePath = routeToFile(route)
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, html)
  }

  await fs.writeFile(path.join(distDir, '404.html'), injectIntoTemplate(template, render('/404')))

  await fs.rm(serverDir, { recursive: true, force: true })
  console.log(`Prerendered ${routes.length} routes plus 404 for ${siteUrl}`)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
