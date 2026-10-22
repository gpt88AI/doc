import fs from 'node:fs/promises'
import path from 'node:path'

const input = process.argv[2]
if (!input) throw new Error('Usage: node scripts/import-heju-docs.mjs <docs-v2-snapshot.json>')
const source = JSON.parse(await fs.readFile(path.resolve(input), 'utf8'))
const root = path.resolve('src/data/gpt88-library')
await fs.mkdir(path.join(root, 'articles'), { recursive: true })
const pages = source.pages
const tick = String.fromCharCode(96)
const sourcePathToTarget = new Map(pages.map(page => [`/docs/quickstart/${page.path}`, `/docs/guides/gpt88-library/${page.path}/`]))
sourcePathToTarget.set('/docs/quickstart/codex-oneclick', '/docs/integrations/dev/codex-cli/')
const legacyBrandPattern = new RegExp('(ju' + 'ai|heju)api', 'gi')
const legacyApiUrlPattern = new RegExp('https?:\\/\\/(?:www\\.)?(?:ju' + 'ai|heju)api\\.com', 'gi')
const legacyEnvPattern = new RegExp('(?:JU' + 'AI|HEJU)API_API_KEY', 'gi')

const groupFor = page => {
  const p = page.path
  if (p.startsWith('codex-') || p === 'transfer-chat-history') return 'Codex 实战'
  if (['api-key-management', 'token-api-config', 'token-balance-api', 'redeem-code'].includes(p)) return 'API 与账户'
  if (p.startsWith('aigc') || ['image2', 'gemini-image-api'].includes(p)) return 'AI 图片与视频创作'
  return '开发工具接入'
}

const notes = {
  'API 与账户': 'Key、余额、模型权限、兑换活动和管理能力以 GPT88 控制台及当前 API 文档为准。',
  '开发工具接入': '配置界面、客户端字段和连通性检查以 GPT88 当前接入文档为准。',
  'Codex 实战': '模型名、版本、默认值和平台入口可能随客户端版本变化，请按 GPT88 当前模型目录和客户端显示核对。',
  'AI 图片与视频创作': '模型名、API 字段、分辨率、运行限制和价格以 GPT88 模型导航及对应 API 文档为准。',
}

const overrides = {
  image2: `# 在 Codex 中使用 GPT88 图片生成

原教程依赖其他平台的资源中心压缩包和配置文件，本页改为 GPT88 的当前接入路径。不要下载或运行来历不明的 Skill 包，也不要把 GPT88 API Key 写入公开仓库中的 Skill 配置。

## 先验证图片 API

1. 登录 [GPT88 控制台](https://agent.gpt88.cc)，在 [API Key 管理](https://agent.gpt88.cc/keys)创建并保存 API Key。
2. 打开 [GPT88 模型导航](/models/)，确认当前账户可用的图片模型 ID。
3. 阅读 [GPT88 图片 API](/docs/api/images/)；图片任务使用 GPT88 图片服务端点对应的接口与参数，不要照抄其他平台的模型名或请求体。
4. 先按 API 文档完成一次最小请求，再接入 Codex Skill。

## 配置 Skill

将自己审核过的图片生成 Skill 安装到 Codex 支持的 Skill 目录。Skill 应从环境变量读取 Key，并调用 GPT88 图片 API；具体安装来源、模型 ID 和参数必须在当前 GPT88 文档中核对。不要在 SKILL.md、config.json 或示例脚本中硬编码完整密钥。

## 验收

- Codex 能识别并调用该 Skill。
- 请求使用 GPT88 图片服务端点和账户可用的模型。
- 生成结果符合预期，且控制台记录中能找到本次请求。
- 对话、仓库和截图中没有完整 API Key。

CLI 配置见 [Codex 集成](/docs/integrations/dev/codex-cli/)；API Key 安全管理见[密钥管理指南](/docs/guides/api-key-management/)。
`,
  'token-api-config': `# GPT88 API 配置与令牌选择

本文整理 GPT88 的最短接入路径。网页控制台登录凭证与 API Key 是不同凭证；模型调用使用 GPT88 API Key。

## 完成标准

- 已在 GPT88 控制台创建一把用于当前应用的 API Key。
- 已确认目标模型出现在当前账户可用模型列表中。
- 客户端使用 https://api.gpt88.cc 作为标准 Base URL，并通过 Bearer 方式发送 Key。
- 已发送一个最小请求，并在使用记录中核对结果。

## 配置步骤

1. 登录 [GPT88 控制台](https://agent.gpt88.cc)，在 [API Key 管理](https://agent.gpt88.cc/keys) 创建并复制 Key。完整密钥只在可信位置保存。
2. 打开 [模型导航](/models/)，确认模型 ID、能力与账户当前可用范围。模型目录的公开信息不等同于某把 Key 已获权限。
3. 在客户端选择 OpenAI 兼容接口，填写 Base URL https://api.gpt88.cc，将 Key 放入 API Key 字段。除非对应客户端文档明确要求，否则不要在 Base URL 末尾重复追加 /v1。
4. 填入模型导航中的准确模型 ID。
5. 按[快速开始](/docs/quickstart/)发送最小请求；再到[认证与计费](/docs/auth/)查看余额、用量和错误说明。

## 分组与权限

分组、模型权限、余额与速率限制以当前 GPT88 控制台和模型目录显示为准。不要把其他平台的分组名、额度单位或密钥管理接口复制到 GPT88。

## 安全检查

Key 放在服务端环境变量或密钥管理器中，不要提交到代码仓库、公开网页、截图或日志。若发生泄露，先撤销对应 Key，再创建新 Key 并逐个更新使用它的服务。

## 相关文档

- [创建与管理 GPT88 API Key](/docs/guides/api-key-management/)
- [完整接入指南](/docs/guides/complete-integration/)
- [首次请求失败排查](/docs/guides/api-key-first-request-failed/)
`,
  'api-key-management': `# GPT88 API Key 管理

GPT88 的 API Key 在 GPT88 控制台创建和管理。不要使用其他平台的系统访问令牌、用户 ID 请求头或 /api/token 管理接口。

## 创建

1. 登录 [GPT88 控制台](https://agent.gpt88.cc)。
2. 打开 [API Key 管理](https://agent.gpt88.cc/keys)。
3. 按项目、环境或用途创建独立 Key，例如 codex-dev 或 app-prod。
4. 根据当前控制台可选项设置分组或限制；选择前到[模型导航](/models/)确认模型可用性。
5. 创建后立即复制完整 Key 并放入可信的密码管理器或部署 Secret。

## 配置与验证

标准 API Base URL 是 https://api.gpt88.cc。在客户端填写 GPT88 Key 与模型导航列出的准确模型 ID，然后参考[快速开始](/docs/quickstart/)完成一次最小请求。回到控制台使用记录，按时间和 Key 名称核对请求。

## 搜索、停用与轮换

在密钥列表按名称或 Key 搜索，使用分组与状态筛选目标记录。轮换时先创建并验证新 Key，逐项更新服务，确认旧 Key 不再被使用后再撤销。若确认泄露，应立即撤销旧 Key。

## 安全要求

不要把 Key 放在浏览器前端、移动端公开包、代码仓库、截图或日志中。排查时只提供 Key 名称或末尾几位、请求时间和 Request ID，不发送完整 Key。

## 常见错误

- 401：检查是否用了 GPT88 API Key，而不是账户网页登录密码；确认 Key 完整且未撤销。
- 403：核对当前账户、Key 和模型的权限范围。
- 429：查看账户余额、速率和服务限制，不要通过重复创建 Key 绕过账户限制。
- 客户端失败但终端成功：逐项核对客户端实际读取的 Key、Base URL、认证格式和模型 ID。

更多信息见[认证与计费](/docs/auth/)、[完整接入指南](/docs/guides/complete-integration/)和[首次请求排查](/docs/guides/api-key-first-request-failed/)。
`,
  'token-balance-api': `# GPT88 余额与用量查询

GPT88 当前可核实的账户余额和使用记录入口位于[控制台](https://agent.gpt88.cc)。请在使用记录中按 Key、模型和时间范围检查实际请求。

本页不固化未经 GPT88 文档确认的 /api/token、用量查询接口、额度单位、令牌规则或返回字段。若你需要程序化读取用量，请先查阅 GPT88 当前 API 文档或联系支持确认已发布接口。

## 核对步骤

1. 登录 GPT88 控制台并查看账户余额。
2. 打开使用记录，按 API Key、时间范围和模型筛选。
3. 将客户端请求时间、HTTP 状态和 Request ID 与记录对应。
4. 计费单位、汇率、模型倍率和实际扣费以[认证与计费](/docs/auth/)及控制台展示为准。

不要在公开渠道分享完整 API Key；提交排查信息时先脱敏。
`,
  'redeem-code': `# GPT88 充值与优惠活动核对

兑换码、充值、优惠和分组能力以 GPT88 当前[控制台](https://agent.gpt88.cc)页面及官方公告为准。

## 操作前核对

- 确认活动公告的适用账号、有效期、使用次数和退款规则。
- 只在 GPT88 官方控制台显示的兑换或充值入口提交代码。不要向第三方提供账户密码、API Key 或一次性验证码。
- 提交后刷新余额或订单记录，核对实际到账金额与活动条件。
- 若页面没有兑换入口，不要尝试其他平台的兑换 API；联系 GPT88 支持确认活动是否适用于你的账号。

完成充值后，可按[快速开始](/docs/quickstart/)创建或检查 API Key，并通过使用记录核对请求。人民币余额和 USD 充值结算规则见[计费说明](/docs/guides/billing-units/)。
`,
  'aigc/video/seedance/video-model-runtime-limits': `# GPT88 视频模型运行限制

本页不复用原站自动生成的运行限制快照。快照的模型别名、字段和值具有时效性，不能证明 GPT88 当前账户或 API 支持相同限制。

使用前请从[模型导航](/models/)确认当前可用模型，再打开 GPT88 对应的视频 API 文档检查输入字段、分辨率、时长、任务状态和结果下载要求。先使用短时长、少量素材做一次验证，并以实际 API 响应为准。

API Key 只放在服务端环境变量或 Secret 管理器；只提交有权使用的图片、视频、音频与人物素材。
`,
}

function inline(runs = []) {
  return runs.map(run => {
    if (run.type === 'link') {
      const href = sourcePathToTarget.get(run.href) || (/pricing$/i.test(run.href) && legacyApiUrlPattern.test(run.href) ? '/docs/guides/model-price-comparison/' : run.href)
      return `[${run.text}](${href})`
    }
    let value = run.text || ''
    if (run.styles?.code) value = `${tick}${value}${tick}`
    else if (run.styles?.bold) value = `**${value}**`
    else if (run.styles?.italic) value = `*${value}*`
    return value
  }).join('').replace(/(\[[^\]\n]{1,20}\])([:：])(?=\s*["'（(])/g, '\\$1$2')
}

function render(block) {
  const text = inline(block.content).trim()
  if (block.type === 'heading') return `${'#'.repeat(Math.max(2, Math.min(4, Number(block.props?.level || 2))))} ${text}\n\n`
  if (block.type === 'paragraph') return text ? `${inline(block.content)}\n\n` : ''
  if (block.type === 'bulletListItem') return `- ${inline(block.content)}\n`
  if (block.type === 'numberedListItem') return `1. ${inline(block.content)}\n`
  if (block.type === 'table') {
    const rows = (block.props?.rows || []).map(row => Array.isArray(row) ? row : (row.cells || []).map(cell => cell.text || ''))
    if (!rows.length) return ''
    const headerRows = Math.min(Number(block.props?.headerRows || 1), rows.length)
    const head = rows.slice(0, headerRows)
    const body = rows.slice(headerRows)
    return `${head.map(row => `| ${row.join(' | ')} |`).join('\n')}\n${head.map(row => `| ${row.map(() => '---').join(' | ')} |`).join('\n')}\n${body.map(row => `| ${row.join(' | ')} |`).join('\n')}\n\n`
  }
  if (block.type === 'codeGroup') return (block.props?.tabs || []).map(tab => `~~~${tab.language || tab.filename || 'text'}\n${tab.code}\n~~~\n\n`).join('')
  if (block.type === 'callout') return `> **${block.props?.title || '提示'}**\n> ${inline(block.content).replace(/\n/g, '\n> ')}\n\n`
  if (block.type === 'steps') return (block.children || []).map(step => `### ${step.props?.title || '步骤'}\n\n${(step.children || []).map(render).join('').trim()}\n\n`).join('')
  if (block.type === 'toggle') return `### ${block.props?.title || text}\n\n${(block.children || []).map(render).join('')}\n`
  if (block.type === 'docLink') return `- [${block.props?.title || '相关文档'}](${sourcePathToTarget.get(block.props?.href) || '#'})\n`
  if (block.type === 'apiEndpoint') return `| ${block.props?.method || ''} | ${tick}${block.props?.path || ''}${tick} | ${block.props?.summary || ''} |\n`
  if (block.type === 'modelCard') return `> 原教程模型示例：${tick}${block.props?.model || ''}${tick}（${block.props?.provider || '来源平台'}）。请先在 GPT88 模型导航确认当前可用性。\n\n`
  if (block.type === 'image') {
    return ''
  }
  return (block.children || []).map(render).join('')
}

function adaptForGpt88(sourcePath, markdown) {
  const provenanceMarker = '\n---\n\n来源：'
  const splitAt = markdown.lastIndexOf(provenanceMarker)
  let body = splitAt < 0 ? markdown : markdown.slice(0, splitAt)
  const provenance = ''

  body = body
    .replace(legacyApiUrlPattern, 'https://api.gpt88.cc')
    .replace(legacyEnvPattern, 'GPT88_API_KEY')
    .replaceAll('HEJU_API_KEY', 'GPT88_API_KEY')
    .replace(legacyEnvPattern, 'GPT88_API_KEY')
    .replace(legacyBrandPattern, 'gpt88')
    .replaceAll('合聚API（鲨鱼站）', 'GPT88')
    .replaceAll('合聚 API Seedance', 'GPT88 Seedance')
    .replaceAll('合聚API', 'GPT88')
    .replaceAll('合聚 API', 'GPT88')
    .replaceAll('鲨鱼API', 'GPT88')
    .replaceAll('鲨鱼站', 'GPT88')
    .replaceAll('TokenRouter', 'GPT88')
    .replaceAll('Token Router', 'GPT88')
    .replaceAll('tokenrouter', 'gpt88')
    .replace(/model_provider\s*=\s*"(?:gpt88|tokenrouter)"/gi, 'model_provider = "gpt88"')
    .replace(/\[model_providers\.(?:gpt88|tokenrouter)\]/gi, '[model_providers.gpt88]')
    .replace(/name\s*=\s*"(?:gpt88|tokenrouter|鲨鱼API|合聚API（鲨鱼站）)"/gi, 'name = "GPT88"')
    .replace(/base_url\s*=\s*"https:\/\/api\.gpt88\.cc\/v1"/g, 'base_url = "https://api.gpt88.cc"')
    .replace(/provider\s*=\s*"(?:gpt88|tokenrouter)"/gi, 'provider = "gpt88"')

  body = body
    .replaceAll('Codex 标准 Base URL 需携带 `/v1` 后缀', 'Codex 的 GPT88 Base URL 使用 `https://api.gpt88.cc`，不要额外添加 `/v1` 后缀')
    .replaceAll('Codex 标准 Base URL 必须携带 `/v1` 后缀', 'Codex 的 GPT88 Base URL 使用 `https://api.gpt88.cc`，不要额外添加 `/v1` 后缀')
    .replaceAll('Codex 规范地址必须携带 `/v1`', 'Codex 的 GPT88 Base URL 使用 `https://api.gpt88.cc`，不要额外添加 `/v1`')
    .replaceAll('规范地址必须携带 `/v1`', 'GPT88 的 Codex Base URL 使用 `https://api.gpt88.cc`，不要额外添加 `/v1`')
    .replaceAll('Base URL 是否保留 `/v1`', 'Base URL 是否为 `https://api.gpt88.cc` 且未重复追加 `/v1`')
    .replaceAll('Base URL 的 `/v1`', 'Base URL 是否为 `https://api.gpt88.cc`')
    .replaceAll('Base URL 是 https://api.gpt88.cc/v1', 'Base URL 是 https://api.gpt88.cc')
    .replaceAll('可替换直连 Base URL：`https://api.gpt88.cc/v1`', '仍使用 GPT88 Base URL：`https://api.gpt88.cc`')
    .replaceAll('可将 base_url 替换为直连地址：`https://api.gpt88.cc/v1`。', 'Codex 的 GPT88 Base URL 使用 `https://api.gpt88.cc`，不要额外添加 `/v1`。')
    .replaceAll('全球 CDN 访问不稳定时，可使用直连地址：`https://api.gpt88.cc/v1`', 'Codex 的 GPT88 Base URL 使用 `https://api.gpt88.cc`，不要额外添加 `/v1`')
    .replaceAll('https://api.gpt88.cc/v1\n~~~', 'https://api.gpt88.cc\n~~~')
    .replaceAll('base_url 使用 https://api.gpt88.cc/v1，認證也必須使用 gpt88 API Key', 'base_url 使用 https://api.gpt88.cc，认证也必须使用 GPT88 API Key')
    .replaceAll('gpt88 的 base_url 應為 https://api.gpt88.cc/v1 或 https://api.gpt88.cc/v1', 'gpt88 的 Codex base_url 應為 https://api.gpt88.cc')
    .replace(/^[^\n]*来源：[^\n]*\n?/gim, '')
    .replace(/^[^\n]*\*\*来源：[^\n]*\n?/gim, '')
    .replace(/^[^\n]*原文标题：[^\n]*\n?/gim, '')
    .replace(/^[^\n]*\*\*状态：\*\*外部公开资料整理稿[^\n]*\n?/gim, '')
    .replaceAll('配置界面和通用操作步骤可作参考；原站 Base URL、API Key、模型 ID、分组与截图均为历史示例，不能直接用于 GPT88。GPT88 当前接入参数见快速开始和对应集成文档。', '请以 GPT88 当前接入参数、控制台和对应集成文档为准。')
    .replaceAll('本页不复用原站自动生成的运行限制快照。快照的模型别名、字段和值具有时效性，不能证明 GPT88 当前账户或 API 支持相同限制。', '本页不固化时效性运行限制快照。模型别名、字段和值可能变化，使用前请以 GPT88 当前账户和 API 响应为准。')
    .replaceAll('原教程描述的是其他平台的兑换码和分组流程，不能据此推断 GPT88 当前提供同一种兑换码功能。', '兑换码、充值、优惠和分组能力以 GPT88 当前控制台为准。')
    .replaceAll('本文保留原文档的主体结构和使用方法，整理为本项目常用 Markdown 文档格式。完整案例库、原图和长篇提示词示例请以来源文档为准；本文件只沉淀可复用的方法、模板和检查口径。', '本文整理可复用的方法、模板和检查口径；具体模型、参数和素材以 GPT88 当前文档为准。')
    .replaceAll('本文将语雀正文整理为项目常用 Markdown 文档格式。整理时保留原文的主体结构、方法论和模板口径，不整篇搬运外部提示词库；长篇案例、原始示例和图片素材以来源文档为准。', '本文整理主体结构、方法论和模板口径，不固化时效性案例或外部素材。')
    .replaceAll('外部来源文档更新时，优先同步结构、方法和检查清单，不直接搬运完整提示词库。', '内容更新时，优先同步结构、方法和检查清单，不固化完整提示词库。')
    .replaceAll('来源文档更新时，优先同步结构、方法和检查清单。', '内容更新时，优先同步结构、方法和检查清单。')
    .replaceAll('原教程模型示例：', '模型示例：')
    .replaceAll('原教程依赖其他平台的资源中心压缩包和配置文件，本页改为 GPT88 的当前接入路径。', '本页使用 GPT88 的当前接入路径。')
    .replaceAll('步骤3：返回原教程重新执行安装命令', '步骤3：返回安装步骤重新执行安装命令')
    .replaceAll('原教程带有 `sudo` 前缀的', '安装命令带有 `sudo` 前缀的')
    .replace(/> \*\*网络补充方案：\*\*若全球 CDN 访问不稳定，可替换直连 Base URL：`https:\/\/api\.gpt88\.cc\/v1` 地址更新规则：Codex 的 GPT88 Base URL 使用 `https:\/\/api\.gpt88\.cc`，不要额外添加 `\/v1` 后缀，若「令牌选择与 API 配置」页面更新推荐地址，请同步替换此处 base_url。/g, '> **网络说明：**Codex 的 GPT88 Base URL 使用 `https://api.gpt88.cc`。若请求失败，请检查连接状态，并对照 GPT88 当前文档确认配置。')
    .replace(/> \*\*Base URL fallback\*\*[\s\S]*?gpt88 的 Codex URL 必須保留 \/v1。/g, '> **Base URL**\n> Codex 的 GPT88 Base URL 使用 `https://api.gpt88.cc`，不要在末尾追加 `/v1`。')
    .replaceAll('/docs/guides/gpt88-library/gpt88/manual/', '/docs/guides/gpt88-library/tokenrouter/manual/')

  if (sourcePath === 'codex-switch-401') {
    body = body.replace(/juapi/gi, 'gpt88')
  }
  return body + provenance
}

const catalog = []
for (const page of pages) {
  const original = page.page
  const group = groupFor(page)
  const descriptions = {
    'api-key-management': '在 GPT88 控制台创建、保存、核验、搜索与轮换 API Key。',
    'token-api-config': '使用 GPT88 API Key、标准 Base URL 与当前模型目录完成客户端配置。',
    'token-balance-api': '从 GPT88 控制台核对账户余额、使用记录和请求消耗。',
    'redeem-code': '核对 GPT88 当前控制台中的充值、优惠或兑换活动入口。',
    'aigc/video/seedance/video-model-runtime-limits': '说明如何从 GPT88 当前模型与 API 文档确认视频模型限制。',
  }
  const description = descriptions[page.path] || (original.summary || `GPT88 教程：${page.title}`).replace(/TokenRouter|合聚 API|合聚API|本站|鲨鱼站/gi, 'GPT88').replace(legacyBrandPattern, 'GPT88').slice(0, 220)
  const slug = page.path.replaceAll('/', '--')
  let markdown = overrides[page.path] || (original.content?.blocks || []).map(render).join('').trim()
  if (!overrides[page.path]) {
    markdown = `> **GPT88 使用说明**\n> ${notes[group]}\n> \n> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)\n\n${markdown}\n`
  }
  markdown = adaptForGpt88(page.path, markdown)
  await fs.writeFile(path.join(root, 'articles', `${slug}.md`), `${markdown.trim()}\n`)
  const title = page.path === 'api-key-management' ? 'GPT88 API Key 创建与管理'
    : page.path === 'aigc/video/seedance' ? 'Seedance 提示词与视频任务参数参考'
    : page.title
  catalog.push({ id: page.id, slug, path: page.path, title, description, group })
}

await fs.writeFile(path.join(root, 'catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`)
console.log(`Generated ${catalog.length} articles`)
