import { parseFrontmatter, type BlogFrontmatter } from '../../lib/frontmatter'

/**
 * 技术博客文章注册表（数据驱动）
 *
 * 每篇文章存一份 markdown：
 * - `posts/<slug>.md`            简体中文
 * - `posts/<locale>/<slug>.md`    其他语言翻译（例如 en、hi、bn）
 *
 * 通过 Vite `import.meta.glob` 在构建期（client + SSR）全量打包，
 * 运行时不发任何网络请求。新文章只需落文件，无需改路由。
 *
 * 路由结构：
 * - `/docs/blog/`             博客入口（分类 + 搜索 + 相关指南）
 * - `/docs/blog/:slug`        单篇文章
 * - `/en/docs/blog/...`       英文版
 * - 缺少目标语言时按 en -> zh 回落，按站点约定走 noindex。
 */

const modules = import.meta.glob('./posts/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export const BLOG_CATEGORIES = [
  '图像生成',
  'AI工具指南',
  'API开发',
  'Gemini专题',
  '模型对比',
  '技术教程',
  '开发工具',
] as const

export type BlogPostMeta = BlogFrontmatter & {
  slug: string
}

export type BlogContent = {
  zh: string
  [locale: string]: string
}

const zhPosts = new Map<string, BlogPostMeta>()
const enPosts = new Map<string, BlogPostMeta>()
const localizedPosts = new Map<string, Map<string, BlogPostMeta>>()
const contentBySlug = new Map<string, BlogContent>()

const LOCALE_DIRS = new Set(['en', 'hi', 'bn', 'ur', 'ta', 'ne', 'si'])

function slugFromPath(filePath: string) {
  const match = filePath.match(/\/posts\/(?:([a-z]{2})\/)?([a-z0-9-]+)\.md$/)
  return match?.[2] ?? ''
}

function localeFromPath(filePath: string) {
  const match = filePath.match(/\/posts\/([a-z]{2})\//)
  return match && LOCALE_DIRS.has(match[1]) ? match[1] : 'zh'
}

for (const [filePath, source] of Object.entries(modules)) {
  const slug = slugFromPath(filePath)
  if (!slug) continue
  const { meta, body } = parseFrontmatter(source)
  const locale = localeFromPath(filePath)
  if (locale !== 'zh') {
    const localizedMeta = { ...meta, slug }
    if (locale === 'en') enPosts.set(slug, localizedMeta)
    const postsForLocale = localizedPosts.get(locale) ?? new Map<string, BlogPostMeta>()
    postsForLocale.set(slug, localizedMeta)
    localizedPosts.set(locale, postsForLocale)
    const existing = contentBySlug.get(slug)
    if (existing) {
      existing[locale] = body
    } else {
      contentBySlug.set(slug, { zh: '', [locale]: body })
    }
  } else {
    zhPosts.set(slug, { ...meta, slug })
    contentBySlug.set(slug, { zh: body })
  }
}

export const BLOG_POSTS: BlogPostMeta[] = [...zhPosts.values()].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug),
)

export function getBlogMeta(slug: string): BlogPostMeta | null {
  return zhPosts.get(slug) ?? null
}

export function getBlogMetaLocalized(slug: string, locale: string): BlogPostMeta | null {
  const localized = localizedPosts.get(locale)?.get(slug)
  if (localized) return localized
  if (locale !== 'zh' && enPosts.has(slug)) return enPosts.get(slug) ?? null
  return zhPosts.get(slug) ?? null
}

export function getBlogContent(slug: string): BlogContent | null {
  return contentBySlug.get(slug) ?? null
}

export function getBlogContentLocalized(slug: string, locale: string): string | null {
  const content = contentBySlug.get(slug)
  if (!content) return null
  return content[locale] || content.en || content.zh || null
}

export const BLOG_SLUGS = BLOG_POSTS.map(post => post.slug)
