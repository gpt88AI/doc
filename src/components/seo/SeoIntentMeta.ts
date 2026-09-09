export type SeoIntentKey =
  | 'openai-sdk'
  | 'python'
  | 'nodejs'
  | 'claude-code'
  | 'cursor'
  | 'cline'
  | 'model-price-comparison'
  | 'legacy-migration'
  | 'first-request-failed'
  | 'openai-compatible-errors'

export function seoIntentHeadings(intent: SeoIntentKey) {
  return [
    { id: `${intent}-problem`, text: '问题是什么', level: 2 as const },
    { id: `${intent}-config`, text: '最短可用配置', level: 2 as const },
    { id: `${intent}-examples`, text: '完整示例（curl / Python / Node.js）', level: 2 as const },
    { id: `${intent}-errors`, text: '常见错误', level: 2 as const },
    { id: `${intent}-pricing`, text: '价格和计费说明', level: 2 as const },
    { id: `${intent}-cta`, text: '立即创建 API Key', level: 2 as const },
  ]
}

export function seoIntentHeadingsEn(intent: SeoIntentKey) {
  return [
    { id: `${intent}-problem`, text: 'What problem does this solve?', level: 2 as const },
    { id: `${intent}-config`, text: 'Shortest working configuration', level: 2 as const },
    { id: `${intent}-examples`, text: 'Complete examples (curl / Python / Node.js)', level: 2 as const },
    { id: `${intent}-errors`, text: 'Common errors', level: 2 as const },
    { id: `${intent}-pricing`, text: 'Pricing and billing notes', level: 2 as const },
    { id: `${intent}-cta`, text: 'Create an API key', level: 2 as const },
  ]
}
