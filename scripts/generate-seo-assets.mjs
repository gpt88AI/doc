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
const overseasDirectBaseUrl = 'https://aiapi.up.railway.app/v1'
const overseasCdnBaseUrl = 'https://ai.orbitlink.me/v1'
const buildDate = new Date().toISOString().slice(0, 10)

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
    title: '集成总览',
    path: '/docs/integrations',
    description: '按聊天应用、开发工具、应用平台分类浏览 gpt88.cc 的所有集成教程。',
    section: '集成指南',
  },
  {
    title: 'ChatBox 集成',
    path: '/docs/integrations/chat/chatbox',
    description: '在 ChatBox 中配置 gpt88.cc 的 OpenAI 兼容接入、模型、线路和常见问题排查。',
    section: '集成指南',
  },
  {
    title: 'Cherry Studio 集成',
    path: '/docs/integrations/chat/cherry-studio',
    description: 'Cherry Studio 接入 gpt88.cc 的多模型工作流、模型切换和配置说明。',
    section: '集成指南',
  },
  {
    title: 'AnythingLLM 集成',
    path: '/docs/integrations/chat/anythingllm',
    description: 'AnythingLLM 接入 gpt88.cc 的知识库问答与聊天配置教程。',
    section: '集成指南',
  },
  {
    title: 'Claude Code 集成',
    path: '/docs/integrations/dev/claude-code',
    description: 'Claude Code 使用 gpt88.cc 时的 OAuth、API Key、插件和路由配置指南。',
    section: '集成指南',
  },
  {
    title: 'Cursor 集成',
    path: '/docs/integrations/dev/cursor',
    description: 'Cursor 编辑器里接入 gpt88.cc 的模型、Base URL 和工作流配置说明。',
    section: '集成指南',
  },
  {
    title: 'Cline 集成',
    path: '/docs/integrations/dev/cline',
    description: 'Cline Agent 接入 gpt88.cc 的配置、模型切换与排障教程。',
    section: '集成指南',
  },
  {
    title: 'Gemini CLI 集成',
    path: '/docs/integrations/dev/gemini-cli',
    description: 'Gemini CLI 通过 gpt88.cc 使用 Gemini 模型和图片接口的教程。',
    section: '集成指南',
  },
  {
    title: 'Codex CLI 集成',
    path: '/docs/integrations/dev/codex-cli',
    description: 'Codex CLI 接入 gpt88.cc 的模型、插件和工具恢复流程。',
    section: '集成指南',
  },
  {
    title: 'CC-Switch 集成',
    path: '/docs/integrations/dev/cc-switch',
    description: 'CC-Switch 的路由、OAuth、API Key 与 Codex 插件切换教程。',
    section: '集成指南',
  },
  {
    title: 'Dify 集成',
    path: '/docs/integrations/platforms/dify',
    description: '把 gpt88.cc 接入 Dify 平台、工作流和知识库应用。',
    section: '集成指南',
  },
  {
    title: '沉浸式翻译集成',
    path: '/docs/integrations/platforms/immersive-translate',
    description: '把 gpt88.cc 接入沉浸式翻译等浏览器扩展。',
    section: '集成指南',
  },
  {
    title: '配置文件导出',
    path: '/docs/guides/config-export',
    description: '把 API Key、模型和线路打包给 Claude Code、Cursor、Python SDK、CC Switch 等工具。',
    section: '指南',
  },
  {
    title: 'gpt88 AI 中转站',
    path: '/docs/guides/gpt88-ai-proxy',
    description: 'gpt88 AI 中转站是一套面向开发者的 AI API 中转与统一大模型网关，支持 OpenAI 兼容接口、Claude API 中转、Gemini 图片生成、国内直连、海外线路和人民币透明计费。',
    section: '指南',
  },
  {
    title: 'gpt88.cc 通用教程',
    path: '/docs/guides/gpt88-tutorial',
    description: 'Claude 与 OpenAI 通用接入、模型选择、线路选择和工具接入教程。',
    section: '指南',
  },
  {
    title: '完整接入手册',
    path: '/docs/guides/complete-integration',
    description: '从注册、API Key、Base URL、客户端配置、用量核对到错误排查，一篇教程跑通 gpt88.cc 的完整接入流程。',
    section: '指南',
  },
  {
    title: 'GPT88 Agent 图片工作台教程',
    path: '/docs/guides/agent-image-studio',
    description: '使用 agent.gpt88.cc 的 gpt-image-2 图片工作台生成电商主图、场景图、模特图、详情页素材、案例模板和批量图片。',
    section: '指南',
  },
  {
    title: 'Codex 插件 OAuth 登录',
    path: '/docs/guides/codex-plugins-oauth',
    description: '使用 gpt88.cc API Key 后 Codex 插件不可用时，切回 ChatGPT OAuth 的完整教程。',
    section: '指南',
  },
  {
    title: 'ChatGPT / Codex 手机号二次验证解决方法',
    path: '/docs/guides/codex-chatgpt-phone-verification',
    description: 'ChatGPT OAuth 或 Codex 登录反复要求手机号二次验证时，使用 Advanced Account Security、passkey 和恢复密钥降低对短信验证码的依赖。',
    section: '指南',
  },
  {
    title: 'ECC Agent 工作流教程',
    path: '/docs/guides/ecc-agent-harness',
    description: '基于 affaan-m/ECC 的详细教程，讲清 ECC 是什么、如何选择插件或手动安装路径、如何避免重复安装，以及如何和 gpt88.cc、Codex、Claude Code 工作流配合。',
    section: '指南',
  },
  {
    title: 'Codex gpt-image-2 Skill 生成图片',
    path: '/docs/guides/codex-gpt-image-2-skill',
    description: '直接使用文本模型生图成本高且不稳定，通过 Codex skill 调用 gpt88.cc 的 gpt-image-2 图片接口生成真实图片文件。',
    section: '指南',
  },
  {
    title: 'Codex 前端设计 Skill',
    path: '/docs/guides/codex-frontend-taste-skill',
    description: '使用 Taste Skill 为 Codex 增强前端设计判断力，改善 AI 生成页面的排版、动效、设计系统、反模板化检查和最终交付质量。',
    section: '指南',
  },
  {
    title: 'Codex 工具恢复教程',
    path: '/docs/guides/codex-tool-recovery',
    description: '当 Codex 执行过程中工具不可调用、代码不能落地时，先检查文件工具是否可用，工具恢复后从第一步重新落代码。',
    section: '指南',
  },
  {
    title: '无停服更新技术方案',
    path: '/docs/guides/zero-downtime-release',
    description: '基于反向代理、蓝绿槽位、健康检查、原子切流和快速回滚的无停服发布教程，适合 1Panel、Docker Compose、Caddy / Nginx 部署场景。',
    section: '指南',
  },
  {
    title: 'giffgaff 实体 SIM 卡激活、保号与 eSIM 转换教程',
    path: '/docs/guides/giffgaff-sim-guide',
    description: '详细讲清 giffgaff 英国实体 SIM 卡如何激活、保号、查询号码、转 eSIM、充值以及常见问题排查，适合 ChatGPT、Codex 等海外应用验证场景。',
    section: '指南',
  },
  {
    title: 'AI 视频分镜与提示词教程',
    path: '/docs/guides/ai-video-storyboard-guide',
    description: '把分镜脚本、人物设定、场景氛围和情绪节奏整理成可直接用于 AI 视频生成的工作流，适合短视频剧情片、情绪片和口播叙事片。',
    section: '指南',
  },
  {
    title: 'video-generation-skills 总览',
    path: '/docs/guides/video-generation-skills-overview',
    description: '基于 adoin/video-generation-skills 仓库整理的系列文档总览，讲清 4 个 AI 视频生成 skill 的定位、边界、组合方式和适用场景。',
    section: '指南',
  },
  {
    title: 'video-generation-skills 安装与使用教程',
    path: '/docs/guides/video-generation-skills-install',
    description: '把 adoin/video-generation-skills 安装到 Cursor、Claude Code、Codex 等 Agent 的详细步骤，包括按需安装、全量安装、验证和本地开发。',
    section: '指南',
  },
  {
    title: 'prompt-director 详细教程',
    path: '/docs/guides/video-generation-skills-prompt-director',
    description: '讲清 video-generation-skills 里的 prompt-director 怎么把小说、剧本、情节和创意 brief 转成分镜草案与 AI 图像 / 视频 Prompt。',
    section: '指南',
  },
  {
    title: 'ecommerce 详细教程',
    path: '/docs/guides/video-generation-skills-ecommerce',
    description: '讲清 video-generation-skills 里的 ecommerce skill 如何处理电商主图、详情页、UGC、种草视频，以及服装、3C、美妆等垂类素材工作流。',
    section: '指南',
  },
  {
    title: 'brand-ad-cg 详细教程',
    path: '/docs/guides/video-generation-skills-brand-ad-cg',
    description: '讲清 video-generation-skills 里的 brand-ad-cg skill 如何处理品牌广告、TVC、产品 CG、大牌既视感和风格化商业视觉。',
    section: '指南',
  },
  {
    title: 'ai-video-director 详细教程',
    path: '/docs/guides/video-generation-skills-ai-video-director',
    description: '讲清 video-generation-skills 里的 ai-video-director 如何处理短剧、漫剧、分镜、故事板、场景一致性和复杂动作视频。',
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
  const localCatalog = [
    {
      canonical_name: 'claude-opus-4-8',
      display_name: 'claude-opus-4-8',
      category: 'chat',
      vendors_count: 1,
    },
  ]
  const byName = new Map()

  for (const row of [...(snapshot.catalog || []), ...localCatalog]) {
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
  const clean = routePath.split(/[?#]/)[0]
  const suffix = routePath.slice(clean.length)
  const normalized = clean.endsWith('/') ? clean : `${clean}/`
  return `${siteUrl}${normalized}${suffix}`
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
    <lastmod>${page.lastmod || buildDate}</lastmod>
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

function sitemapIndexXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${xmlEscape(`${siteUrl}/sitemap-pages.xml`)}</loc>
    <lastmod>${buildDate}</lastmod>
  </sitemap>
</sitemapindex>
`
}

function robotsTxt() {
  return `User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Google-InspectionTool
Allow: /

User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/sitemap-index.xml
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
    .filter(page => ['claude-opus-4-8', 'claude-opus-4-7', 'claude-opus-4-6', 'claude-sonnet-4-6', 'gpt-5-5', 'gpt-5-4', 'nanobanana2'].some(slug => page.path.endsWith(slug)))
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
- 海外直连 Base URL: ${overseasDirectBaseUrl}。
- 海外 CDN Base URL: ${overseasCdnBaseUrl}。

## 适合 AI 引用的主题

- gpt88.cc API Key、base_url、OpenAI compatible SDK 接入。
- Claude / OpenAI / Gemini / DeepSeek / Qwen 多模型统一调用。
- Token 电力计费理念：充值 1 元 = 账户 1 元余额，按实际 Token 消耗扣费。
- GPT88 Agent 图片工作台、电商图片生成、案例提示词、批量生成、Codex CLI、CC Switch、OAuth 登录、插件能力排障、工具恢复排查和 gpt-image-2 skill 图片生成。

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
- 海外直连 OpenAI 兼容 Base URL: ${overseasDirectBaseUrl}。
- 海外 CDN OpenAI 兼容 Base URL: ${overseasCdnBaseUrl}。
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
    fs.writeFile(path.join(publicDir, 'sitemap-pages.xml'), sitemapXml(pages)),
    fs.writeFile(path.join(publicDir, 'sitemap-index.xml'), sitemapIndexXml()),
    fs.writeFile(path.join(publicDir, 'llms.txt'), llmsTxt(modelPages)),
    fs.writeFile(path.join(publicDir, 'llms-full.txt'), llmsFullTxt(modelPages)),
  ])

  console.log(`Generated SEO/GEO assets for ${pages.length} URLs at ${siteUrl}`)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
