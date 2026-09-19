import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { spawnSync } from 'node:child_process'

const repoRoot = dirname(new URL(import.meta.url).pathname).replace(/\/scripts$/, '')
const postsDir = join(repoRoot, 'src/data/blog/posts')
const metadataPath = process.argv[2] ?? '/tmp/hvoy-guides.json'
const summariesPath = process.argv[3] ?? '/tmp/hvoy-guide-summaries.json'
const session = process.env.HVOY_BROWSER_SESSION ?? 'hvoy-ai-tools'
const shouldScrape = process.argv.includes('--scrape')
const scrapeMissing = process.argv.includes('--scrape-missing')

function toDate(dateText) {
  const match = dateText.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)
  if (!match) throw new Error(`无法解析日期：${dateText}`)
  return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`
}

function slugify(href) {
  const slug = new URL(href).pathname.split('/').filter(Boolean).at(-1) ?? 'guide'
  return `hvoy-${slug}`
}

function categoryFor(item) {
  const text = `${item.title}${item.description}`
  if (/AI (每日简报|热点日报)/.test(item.title)) return '技术教程'
  if (item.category === '站点挑选' || item.category === '科普' || /API|中转站|令牌|Token|配额|成本/.test(text)) {
    return 'API开发'
  }
  if (/图片|图像|视频|提示词|视觉/.test(text)) return '图像生成'
  if (/比较|对比|选型/.test(text)) return '模型对比'
  if (/工具集|工具|Agent|编程|代码|开发|开发者|SaaS|开源|Codex|Claude Code/.test(text)) {
    return '开发工具'
  }
  return '技术教程'
}

function tagsFor(item) {
  const category = categoryFor(item)
  if (category === 'API开发') return ['API', '模型接入', '使用指南']
  if (category === '图像生成') return ['AI图像', '内容生成', '工作流']
  if (category === '模型对比') return ['模型比较', 'AI选型', '效果评估']
  if (category === '开发工具') return ['AI工具', '开发效率', '工程实践']
  return ['AI行业', '趋势观察', '实践方法']
}

function yamlValue(value) {
  return value
    .replace(/\[([^\]]+)\]\((?:https?:\/\/|\/)[^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function splitSummary(text) {
  return yamlValue(text)
    .match(/[^。；]+(?:[。；]|$)/g)?.map(part => part.trim()) ?? []
    .filter(part => part.length >= 8)
    .slice(0, 4)
}

function browserEvalScript() {
  return String.raw`JSON.stringify((()=>{
    const root=document.querySelector('.guide-markdown');
    if(!root) return {summary:'', sections:[]};
    const ignored=/^来源[：:]|本文由禾维 AI|本文由禾维AI|^配套体验[：:]/;
    const summary=[...root.querySelectorAll('p')].map(el=>(el.innerText||'').trim()).find(text=>text && !ignored.test(text) && !/^https?:\/\//.test(text));
    const sections=[...root.querySelectorAll('h2,h3')].map(el=>(el.innerText||'').trim()).filter(Boolean).filter(t=>!ignored.test(t));
    return {summary:summary||'', sections};
  })())`
}

function scrape(url) {
  const run = args => spawnSync('browser-act', ['--session', session, ...args], { encoding: 'utf8' })
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const nav = run(['navigate', url])
    const wait = nav.status === 0 ? run(['wait', 'stable']) : nav
    if (wait.status === 0) {
      const result = run(['eval', browserEvalScript()])
      if (result.status === 0) {
        const line = result.stdout.trim().split('\n').at(-1)
        try {
          return JSON.parse(line)
        } catch {
          // Retry if the browser returned a transient non-JSON payload.
        }
      }
    }
  }
  return { summary: '', sections: [], error: true }
}

function postBody(item, scraped) {
  const summary = yamlValue(scraped.summary || item.description)
  const sentences = splitSummary(summary)
  const sections = scraped.sections.filter(section => !/^今日摘要$/.test(section)).slice(0, 12)
  const focus = sentences.length > 1
    ? sentences.map(sentence => `- ${sentence}。`).join('\n')
    : `- ${summary}`
  const structure = sections.length
    ? sections.map(section => `- ${section}`).join('\n')
    : '- 文章摘要\n- 主题拆解\n- 实践提醒'
  const guidance = item.category === '站点挑选' || item.category === '科普'
    ? [
        '先确认需求、预算、稳定性和可用模型范围，再比较具体方案。',
        '涉及密钥、额度或账单的操作，应先用低风险请求验证，再逐步扩大使用量。',
        '不要只看单次价格；稳定性、支持响应和异常处理同样会影响长期成本。',
      ]
    : [
        '先把文章中的趋势判断与当前业务目标对照，再决定是否需要试用或验证。',
        '涉及模型能力、价格、安全或产品状态的信息，应在实际采用前重新核验。',
        '把值得复用的观点转成小范围实验，并记录成本、效果和失败条件。',
      ]
  return [
    '## 核心摘要',
    '',
    summary,
    '',
    '## 重点拆解',
    '',
    focus,
    '',
    '## 内容结构',
    '',
    structure,
    '',
    '## 阅读建议',
    '',
    guidance.map(line => `- ${line}`).join('\n'),
  ].join('\n')
}

function buildPost(item, scraped) {
  const title = yamlValue(item.title)
  const description = yamlValue(item.description)
  const date = toDate(item.dateText)
  const category = categoryFor(item)
  const tags = tagsFor(item).join(', ')
  const readTime = Number.parseInt(item.readText ?? '', 10)
  return `---\ntitle: ${title}\ndescription: ${description}\ndate: ${date}\ncategory: ${category}\ntags: [${tags}]\nreadTime: ${Number.isFinite(readTime) ? readTime : 3}\n---\n\n${postBody(item, scraped)}\n`
}

async function main() {
  const raw = await readFile(metadataPath, 'utf8')
  const metadata = JSON.parse(raw.trim().split('\n').at(-1))
  let summaries = existsSync(summariesPath)
    ? JSON.parse(await readFile(summariesPath, 'utf8'))
    : {}
  if (shouldScrape || scrapeMissing) {
    const itemsToScrape = shouldScrape
      ? metadata
      : metadata.filter(item => !summaries[item.href]?.summary || summaries[item.href]?.error)
    for (const [index, item] of itemsToScrape.entries()) {
      summaries[item.href] = scrape(item.href)
      if ((index + 1) % 10 === 0) console.error(`scraped ${index + 1}/${itemsToScrape.length}`)
    }
    await writeFile(summariesPath, `${JSON.stringify(summaries, null, 2)}\n`)
  }
  await mkdir(postsDir, { recursive: true })
  for (const item of metadata) {
    const slug = slugify(item.href)
    await writeFile(join(postsDir, `${slug}.md`), buildPost(item, summaries[item.href] ?? {}))
  }
  console.log(`generated ${metadata.length} Hvoy整理 blog posts in ${postsDir}`)
}

await main()
