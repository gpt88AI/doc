import { DocPage } from '../../components/layout/DocPage'
import { SeoIntentSections } from '../../components/seo/SeoIntentSections'
import { seoIntentHeadings, seoIntentHeadingsEn, type SeoIntentKey } from '../../components/seo/SeoIntentMeta'
import { useLocale } from '../../lib/locale'

const PAGE_META: Record<SeoIntentKey, { path: string; title: string; description: string }> = {
  'openai-sdk': {
    path: '/docs/sdk/openai-sdk',
    title: 'OpenAI SDK 如何接入 GPT88 API',
    description: '使用 OpenAI 兼容接口接入 GPT88 API，只需替换 base_url、API Key 和模型名。',
  },
  python: {
    path: '/docs/sdk/python',
    title: 'Python 调用 GPT88 API 完整示例',
    description: '用 OpenAI 官方 Python SDK 调用 GPT88 API，包含同步、流式和错误排查示例。',
  },
  nodejs: {
    path: '/docs/sdk/nodejs',
    title: 'Node.js 调用 GPT88 API 完整示例',
    description: '在 Node.js 中使用 OpenAI SDK 调用 GPT88 API，包含环境变量、流式响应和重试。',
  },
  'claude-code': {
    path: '/docs/integrations/dev/claude-code',
    title: 'Claude Code 使用 GPT88 API',
    description: '把 Claude Code 配置为 OpenAI 兼容 API，快速验证 API Key、模型和端点。',
  },
  cursor: {
    path: '/docs/integrations/dev/cursor',
    title: 'Cursor 配置 GPT88 API',
    description: '在 Cursor 中使用 GPT88 的 OpenAI 兼容接口，避免把网页登录密码当作 API Key。',
  },
  cline: {
    path: '/docs/integrations/dev/cline',
    title: 'Cline 配置 OpenAI 兼容 API',
    description: 'Cline 自定义 OpenAI 兼容提供商的配置、最短请求和常见错误排查。',
  },
  'model-price-comparison': {
    path: '/docs/guides/model-price-comparison',
    title: 'GPT、Claude、Gemini API 价格对比',
    description: '用统一口径比较 GPT、Claude、Gemini API 的模型倍率、输入输出成本和实际用量。',
  },
  'legacy-migration': {
    path: '/docs/guides/gpt88-migration',
    title: '旧 gpt88.cc 账户迁移到 Agent',
    description: '从旧 gpt88.cc 入口迁移到 Agent，完成登录、API Key 创建和第一次成功请求。',
  },
  'first-request-failed': {
    path: '/docs/guides/api-key-first-request-failed',
    title: 'API Key 创建后第一次请求失败怎么办',
    description: '按端点、认证头、模型、余额和错误码顺序排查 API Key 创建后的第一次失败。',
  },
  'openai-compatible-errors': {
    path: '/docs/api/errors',
    title: 'OpenAI 兼容接口常见错误排查',
    description: '从 HTTP 状态、错误 code、request_id 和重试策略定位 OpenAI 兼容接口问题。',
  },
}

const PAGE_META_EN: Record<SeoIntentKey, { title: string; description: string }> = {
  'openai-sdk': { title: 'How to connect the OpenAI SDK to the GPT88 API', description: 'Connect to the GPT88 API through the OpenAI-compatible interface by changing the base URL, API key, and model.' },
  python: { title: 'Complete Python examples for the GPT88 API', description: 'Call the GPT88 API with the official OpenAI Python SDK, including sync, streaming, and troubleshooting examples.' },
  nodejs: { title: 'Complete Node.js examples for the GPT88 API', description: 'Use the OpenAI SDK in Node.js with environment variables, streaming responses, and retries.' },
  'claude-code': { title: 'Use the GPT88 API with Claude Code', description: 'Configure Claude Code with an OpenAI-compatible API and verify the key, model, and endpoint.' },
  cursor: { title: 'Configure the GPT88 API in Cursor', description: 'Use GPT88’s OpenAI-compatible endpoint in Cursor without confusing a web login password with an API key.' },
  cline: { title: 'Configure an OpenAI-compatible API in Cline', description: 'Configure a custom OpenAI-compatible provider in Cline and troubleshoot the shortest request.' },
  'model-price-comparison': { title: 'GPT, Claude, and Gemini API price comparison', description: 'Compare model multipliers, input and output costs, and real usage on a consistent basis.' },
  'legacy-migration': { title: 'Migrate an old gpt88.cc account to Agent', description: 'Move from the old gpt88.cc entry point to Agent, create an API key, and make the first successful request.' },
  'first-request-failed': { title: 'What to do when the first API request fails', description: 'Troubleshoot the first request in order: endpoint, authentication header, model, balance, and error code.' },
  'openai-compatible-errors': { title: 'Troubleshoot common OpenAI-compatible API errors', description: 'Use HTTP status, error code, request_id, and retry strategy to locate compatibility API problems.' },
}

export function SeoIntentPage({ intent }: { intent: SeoIntentKey }) {
  const { locale } = useLocale()
  const page = PAGE_META[intent]
  const pageEn = PAGE_META_EN[intent]
  const isChinese = locale === 'zh'
  return (
    <DocPage
      path={page.path}
      title={isChinese ? page.title : pageEn.title}
      description={isChinese ? page.description : pageEn.description}
      headings={isChinese ? seoIntentHeadings(intent) : seoIntentHeadingsEn(intent)}
    >
      <SeoIntentSections intent={intent} />
    </DocPage>
  )
}
