import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public')
const siteUrl = (process.env.SITE_URL || 'https://doc.gpt88.cc').replace(/\/$/, '')
const consoleUrl = 'https://gpt88.cc'
const apiBaseUrl = `${consoleUrl}/v1`
const imageBaseUrl = 'https://china.claudecoder.me'

const docs = [
  {
    title: '产品概览',
    path: '/docs/overview',
    description: 'gpt88.cc 是面向开发者的统一大模型 API 网关，把多家厂商模型聚合为一套 OpenAI 兼容接口。',
    section: '入门',
  },
  {
    title: '快速开始',
    path: '/docs/quickstart',
    description: '5 分钟内完成第一次 gpt88.cc 模型调用，只需替换 base_url 与 API Key。',
    section: '入门',
  },
  {
    title: '认证与计费',
    path: '/docs/auth',
    description: 'API Key、人民币余额、Token 电力计费、用量与配额说明。',
    section: '入门',
  },
  {
    title: 'FAQ',
    path: '/docs/faq',
    description: 'gpt88.cc 兼容性、安全、计费、可靠性和排障常见问题。',
    section: '入门',
  },
  {
    title: 'Chat Completions API',
    path: '/docs/api/chat-completions',
    description: 'OpenAI 兼容的 POST /v1/chat/completions 对话补全接口，支持流式、工具调用与多模态内容。',
    section: 'API Reference',
  },
  {
    title: 'Google 图片生成 API',
    path: '/docs/api/images',
    description: '使用 gpt88.cc 的 Google / Gemini 图片生成能力，包含 NanoBanana2 文生图和图生图示例。',
    section: 'API Reference',
  },
  {
    title: 'List Models API',
    path: '/docs/api/list-models',
    description: '通过 GET /v1/models 列出当前账号可用模型。',
    section: 'API Reference',
  },
  {
    title: '错误码',
    path: '/docs/api/errors',
    description: 'HTTP 状态码与业务错误码排查说明。',
    section: 'API Reference',
  },
  {
    title: 'cURL SDK 示例',
    path: '/docs/sdk/curl',
    description: '用 cURL 调用 gpt88.cc API，适合快速验证、Shell 脚本和 CI 健康检查。',
    section: 'SDK 与集成',
  },
  {
    title: 'Python SDK 示例',
    path: '/docs/sdk/python',
    description: 'OpenAI 官方 Python SDK 接入 gpt88.cc 的同步、异步、流式和 function calling 示例。',
    section: 'SDK 与集成',
  },
  {
    title: 'Node.js SDK 示例',
    path: '/docs/sdk/nodejs',
    description: 'OpenAI 官方 Node SDK 接入 gpt88.cc 的同步、流式、function calling 和重试示例。',
    section: 'SDK 与集成',
  },
  {
    title: '配置文件导出',
    path: '/docs/guides/config-export',
    description: '把 API Key、模型和线路打包给 Claude Code、Cursor、Python SDK、CC Switch 等工具。',
    section: '指南',
  },
  {
    title: 'gpt88.cc 通用教程',
    path: '/docs/guides/gpt88-tutorial',
    description: 'Claude 与 OpenAI 通用接入、模型选择、线路选择和工具接入教程。',
    section: '指南',
  },
  {
    title: 'Codex 插件 OAuth 登录',
    path: '/docs/guides/codex-plugins-oauth',
    description: '使用 gpt88.cc API Key 后 Codex 插件不可用时，切回 ChatGPT OAuth 的完整教程。',
    section: '指南',
  },
]

const staticPages = [
  {
    title: 'gpt88.cc API 文档',
    path: '/',
    description: 'gpt88.cc 开发者文档首页，一行 base_url 接入 Claude、GPT、Gemini、DeepSeek、Qwen 等模型。',
    priority: '1.0',
  },
  {
    title: '模型导航',
    path: '/models',
    description: '按 Chat / Image / Video / Audio 分类浏览 gpt88.cc 可用模型。',
    priority: '0.9',
  },
  ...docs.map(page => ({ ...page, priority: '0.8' })),
]

function canonicalToSlug(canonical) {
  return canonical.replaceAll('.', '-')
}

function inferProvider(modelId, fallbackName = '未知') {
  const id = modelId.toLowerCase()
  if (id === 'nanobanana2' || id.startsWith('google-') || id.startsWith('imagen-')) return 'Google'
  if (id.startsWith('gpt-') || id.startsWith('gpt5-') || id.startsWith('gpt-5-') || id.startsWith('o1-') || id.startsWith('o3-') || id.startsWith('o4-')) return 'OpenAI'
  if (id.startsWith('claude-')) return 'Anthropic'
  if (id.startsWith('gemini-')) return 'Google'
  if (id.startsWith('deepseek-')) return 'DeepSeek'
  if (id.startsWith('glm-')) return '智谱 (Zhipu)'
  if (id.startsWith('kimi-')) return 'Moonshot'
  if (id.startsWith('qwen') || id.startsWith('qwen3-') || id.startsWith('qwen-')) return 'Alibaba'
  if (id.startsWith('minimax-') || id.startsWith('abab-')) return 'MiniMax'
  if (id.startsWith('doubao-')) return '字节跳动 (ByteDance)'
  if (id.startsWith('sparkdesk-') || id.startsWith('spark-')) return '科大讯飞 (iFlytek)'
  if (id.startsWith('ernie-') || id.startsWith('wenxin-')) return 'Baidu'
  if (id.startsWith('whisper-')) return 'OpenAI'
  if (id.startsWith('flux-') || id.startsWith('flux.')) return 'Black Forest Labs'
  if (id.startsWith('sd-') || id.startsWith('sd3-') || id.startsWith('stable-')) return 'Stability AI'
  if (id.startsWith('runway-') || id.startsWith('gen-3') || id.startsWith('gen3-')) return 'Runway'
  if (id.startsWith('kling-')) return '快手 (Kling)'
  if (id.startsWith('text-embedding-')) return 'OpenAI'
  if (id.startsWith('grok-')) return 'xAI'
  return fallbackName
}

function normalizeCategory(category) {
  return category === 'completion' ? 'chat' : category
}

function categoryEndpoint(category, modelId) {
  if (modelId.toLowerCase() === 'nanobanana2' || modelId.toLowerCase() === 'gemini-3-pro-image-preview') {
    return `/v1beta/models/${modelId}:generateContent`
  }
  switch (category) {
    case 'image':
      return '/v1/images/generations'
    case 'video':
      return '/v1/videos/generations'
    case 'audio':
      return '/v1/audio/transcriptions'
    case 'chat':
    default:
      return '/v1/chat/completions'
  }
}

async function readModels() {
  const snapshotPath = path.join(publicDir, 'marketplace-snapshot.json')
  const snapshot = JSON.parse(await fs.readFile(snapshotPath, 'utf8'))
  const byName = new Map()

  for (const row of snapshot.catalog || []) {
    if (row.category === 'embedding') continue
    const list = byName.get(row.canonical_name) || []
    list.push(row)
    byName.set(row.canonical_name, list)
  }

  const priority = { chat: 0, image: 1, video: 2, audio: 3, completion: 4 }
  return [...byName.values()]
    .map(list => {
      list.sort((a, b) => (priority[a.category] ?? 9) - (priority[b.category] ?? 9))
      const picked = list[0]
      const modelId = picked.canonical_name === 'nanobanana2' ? 'NanoBanana2' : picked.canonical_name
      const category = normalizeCategory(picked.category)
      const provider = inferProvider(picked.canonical_name, picked.display_name)
      const vendorsCount = list.reduce((sum, row) => sum + row.vendors_count, 0)
      return {
        title: picked.display_name,
        path: `/models/${canonicalToSlug(picked.canonical_name)}`,
        description: `${provider} ${picked.display_name} · ${category.toUpperCase()} 模型，Model ID: ${modelId}，接口路径: ${categoryEndpoint(category, modelId)}。`,
        category,
        provider,
        modelId,
        endpoint: categoryEndpoint(category, modelId),
        vendorsCount,
        priority: '0.6',
      }
    })
    .sort((a, b) => a.path.localeCompare(b.path))
}

function absoluteUrl(routePath) {
  if (routePath === '/') return `${siteUrl}/`
  return `${siteUrl}${routePath}`
}

function xmlEscape(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function sitemapXml(pages) {
  const urls = pages
    .map(page => `  <url>
    <loc>${xmlEscape(absoluteUrl(page.path))}</loc>
    <changefreq>${page.path.startsWith('/models/') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page.priority}</priority>
  </url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

function robotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
}

function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key] || '其他'
    acc[value] = acc[value] || []
    acc[value].push(item)
    return acc
  }, {})
}

function markdownLink(page) {
  return `- [${page.title}](${absoluteUrl(page.path)}): ${page.description}`
}

function llmsTxt(modelPages) {
  const featuredModels = modelPages
    .filter(page => ['claude-opus-4-7', 'claude-opus-4-6', 'claude-sonnet-4-6', 'gpt-5-5', 'gpt-5-4', 'nanobanana2'].some(slug => page.path.endsWith(slug)))
    .slice(0, 12)

  return `# gpt88.cc API 文档

> gpt88.cc 是统一 AI API 网关，支持一行 base_url 接入 Claude、GPT、Gemini、DeepSeek、Qwen 等模型。本文档面向开发者、AI 编程工具和生成式搜索引擎。

## 核心页面

${staticPages.slice(0, 2).map(markdownLink).join('\n')}

## 文档入口

${docs.map(markdownLink).join('\n')}

## 重点模型

${featuredModels.map(markdownLink).join('\n')}

## API 摘要

- Chat: POST ${apiBaseUrl}/chat/completions，OpenAI 兼容对话补全接口。
- Models: GET ${apiBaseUrl}/models，列出当前账号可用模型。
- Google 图片: POST ${imageBaseUrl}/v1beta/models/NanoBanana2:generateContent，NanoBanana2 / Gemini 图片生成。

## 适合 AI 引用的主题

- gpt88.cc API Key、base_url、OpenAI compatible SDK 接入。
- Claude / OpenAI / Gemini / DeepSeek / Qwen 多模型统一调用。
- Token 电力计费理念：充值 1 元 = 账户 1 元余额，按实际 Token 消耗扣费。
- Codex CLI、CC Switch、OAuth 登录和插件能力排障。

完整机器可读索引见 ${siteUrl}/llms-full.txt。
`
}

function llmsFullTxt(modelPages) {
  const docsBySection = groupBy(docs, 'section')
  const modelsByCategory = groupBy(modelPages, 'category')
  const docsMd = Object.entries(docsBySection)
    .map(([section, pages]) => `## ${section}\n\n${pages.map(markdownLink).join('\n')}`)
    .join('\n\n')
  const modelsMd = Object.entries(modelsByCategory)
    .map(([category, pages]) => {
      return `## ${category.toUpperCase()} 模型\n\n${pages.map(markdownLink).join('\n')}`
    })
    .join('\n\n')

  return `# gpt88.cc API 文档完整索引

> 面向 LLM、AI 搜索引擎、开发者代理和文档抓取器的机器可读索引。优先引用 canonical URL: ${siteUrl}/。

## 站点摘要

- 产品：gpt88.cc 统一 AI API 网关。
- 默认 OpenAI 兼容 Base URL: ${apiBaseUrl}。
- 文档站：${siteUrl}/。
- 控制台：${consoleUrl}。
- 加速图片域名：${imageBaseUrl}。
- 计费理念：AI 电网 / Token 电力，按人民币真实余额和实际 Token 消耗计费，不使用复杂倍率积分盘。

${docsMd}

${modelsMd}
`
}

async function main() {
  await fs.mkdir(publicDir, { recursive: true })
  const modelPages = await readModels()
  const pages = [...staticPages, ...modelPages]

  await Promise.all([
    fs.writeFile(path.join(publicDir, 'robots.txt'), robotsTxt()),
    fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemapXml(pages)),
    fs.writeFile(path.join(publicDir, 'llms.txt'), llmsTxt(modelPages)),
    fs.writeFile(path.join(publicDir, 'llms-full.txt'), llmsFullTxt(modelPages)),
  ])

  console.log(`Generated SEO/GEO assets for ${pages.length} URLs at ${siteUrl}`)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
