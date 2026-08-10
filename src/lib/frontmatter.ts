export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  readTime?: number
  relatedPath?: string
  relatedTitle?: string
}

const SCALAR_FIELDS = new Set([
  'title',
  'description',
  'date',
  'category',
  'readTime',
  'relatedPath',
  'relatedTitle',
])

/**
 * 极简 YAML frontmatter 解析器。
 * 只覆盖本仓库博客文件使用的字段，不做完整 YAML 支持：
 * - 标量字段直接 `key: value`
 * - tags 支持逗号分隔或 YAML 数组两种写法
 */
export function parseFrontmatter(source: string): {
  meta: BlogFrontmatter
  body: string
} {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) {
    throw new Error('Frontmatter block missing: expected content starting with ---')
  }
  const raw = match[1]
  const body = source.slice(match[0].length)
  const values: Record<string, string> = {}

  for (const line of raw.split(/\r?\n/)) {
    const field = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/)
    if (!field) continue
    values[field[1]] = field[2].trim()
  }

  const parseTags = (value: string | undefined): string[] => {
    if (!value) return []
    if (value.startsWith('[') && value.endsWith(']')) {
      return value
        .slice(1, -1)
        .split(',')
        .map(tag => tag.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    }
    return value
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean)
  }

  const meta: BlogFrontmatter = {
    title: values.title ?? '',
    description: values.description ?? '',
    date: values.date ?? '',
    category: values.category ?? '技术教程',
    tags: parseTags(values.tags),
  }

  for (const field of SCALAR_FIELDS) {
    if (field === 'tags') continue
    if (values[field]) {
      if (field === 'readTime') {
        const parsed = Number(values[field])
        if (Number.isFinite(parsed)) meta.readTime = parsed
      } else {
        ;(meta as unknown as Record<string, string>)[field] = values[field]
      }
    }
  }

  return { meta, body }
}
