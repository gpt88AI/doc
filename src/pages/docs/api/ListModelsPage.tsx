import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { CodeTabs } from '../../../components/ui/CodeTabs'
import { Callout } from '../../../components/ui/Callout'
import { EndpointBadge } from '../../../components/ui/EndpointBadge'
import { FieldTable, type FieldRow } from '../../../components/ui/FieldTable'

/**
 * API Reference: GET /v1/models
 *
 * 这一接口在 gpt88.cc 上有几个差异于 OpenAI 的细节：
 * - 返回列表受账号权限过滤，调用者只能看到自己有权限调用的模型；
 * - 每个 model 对象额外提供 capabilities / context_window / 推荐场景；
 *   这些字段是 gpt88.cc 自己的扩展，与 OpenAI 协议向前兼容。
 *
 * 文档目标：让读者拿到这个接口就能写出"列模型 → 选模型 → 调模型"的循环。
 */

const RESP_FIELDS: FieldRow[] = [
  { name: 'object', type: 'string', required: true, description: <>固定为 <code>"list"</code>。</> },
  {
    name: 'data',
    type: 'array<Model>',
    required: true,
    description: <>当前账号可见的模型列表，元素结构见下表。</>,
  },
]

const MODEL_FIELDS: FieldRow[] = [
  { name: 'id', type: 'string', required: true, description: <>模型 ID，传给 <code>chat/completions</code> 的 <code>model</code> 字段。</> },
  { name: 'object', type: 'string', required: true, description: <>固定为 <code>"model"</code>。</> },
  { name: 'created', type: 'integer', description: <>模型上架时间戳，Unix 秒。</> },
  { name: 'owned_by', type: 'string', description: <>归属 provider，例如 <code>deepseek</code> / <code>anthropic</code>。</> },
  {
    name: 'capabilities',
    type: 'string[]',
    description: (
      <>
        gpt88.cc 扩展。可能值包括 <code>chat</code> / <code>function_calling</code> /
        <code>vision</code> / <code>json_mode</code> / <code>streaming</code>。
      </>
    ),
  },
  {
    name: 'context_window',
    type: 'integer',
    description: <>模型上下文 token 上限。具体值由后端配置下发，可能随模型升级变化。</>,
  },
  {
    name: 'modalities',
    type: 'string[]',
    description: <>支持的模态：<code>text</code> / <code>image</code> / <code>audio</code> / <code>video</code>。</>,
  },
]

const RESPONSE = `{
  "object": "list",
  "data": [
    {
      "id": "deepseek-v4-pro",
      "object": "model",
      "created": 1729000000,
      "owned_by": "deepseek",
      "capabilities": ["chat", "function_calling", "json_mode", "streaming"],
      "context_window": 131072,
      "modalities": ["text"]
    },
    {
      "id": "claude-sonnet-4-6",
      "object": "model",
      "created": 1727000000,
      "owned_by": "anthropic",
      "capabilities": ["chat", "vision", "function_calling", "streaming"],
      "context_window": 200000,
      "modalities": ["text", "image"]
    },
    {
      "id": "qwen3-coder",
      "object": "model",
      "created": 1726000000,
      "owned_by": "alibaba",
      "capabilities": ["chat", "streaming"],
      "context_window": 65536,
      "modalities": ["text"]
    }
  ]
}`

const TABS = [
  {
    label: 'cURL',
    lang: 'bash',
    code: `curl https://gpt88.cc/v1/models \\
  -H "Authorization: Bearer $GPT88_API_KEY"`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `from openai import OpenAI

client = OpenAI(
    base_url="https://gpt88.cc/v1",
    api_key="YOUR_GPT88_API_KEY",
)

models = client.models.list()
for m in models.data:
    print(m.id, m.owned_by)`,
  },
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://gpt88.cc/v1",
  apiKey: process.env.GPT88_API_KEY,
});

const models = await client.models.list();
for (const m of models.data) {
  console.log(m.id, m.owned_by);
}`,
  },
]

export default function ListModelsPage() {
  return (
    <DocPage
      path="/docs/api/list-models"
      title="GET /v1/models"
      description="列出当前账号可调用的全部模型。返回结构在 OpenAI 协议基础上扩展了 capabilities / context_window 等字段。"
      headings={[
        { id: 'endpoint', text: '端点与认证', level: 2 },
        { id: 'example', text: '调用示例', level: 2 },
        { id: 'response', text: '响应示例', level: 2 },
        { id: 'fields', text: '响应字段', level: 2 },
        { id: 'tips', text: '使用建议', level: 2 },
      ]}
    >
      <h2 id="endpoint">端点与认证</h2>
      <EndpointBadge method="GET" path="https://gpt88.cc/v1/models" />
      {/*
       * Human msg-20260509-jwfia3 要求文档明确引导用户到 gpt88.cc 控制台获取 API Key。
       * 在 list-models 鉴权说明里加一处控制台外链，与 ChatCompletionsPage 风格一致。
       */}
      <p>
        请求需携带{' '}
        <code>Authorization: Bearer &lt;API_KEY&gt;</code>，
        其中 Key 由你在{' '}
        <a
          href="https://gpt88.cc"
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 hover:text-violet-200"
        >
          https://gpt88.cc
        </a>{' '}
        控制台「API Keys」页面创建。返回的列表是「该 API Key 当前可调用的模型」，
        权限受控制台分配影响。
      </p>

      <h2 id="example">调用示例</h2>
      <CodeTabs tabs={TABS} />

      <h2 id="response">响应示例</h2>
      <CodeBlock lang="json" filename="200 OK" code={RESPONSE} />

      <h2 id="fields">响应字段</h2>
      <FieldTable rows={RESP_FIELDS} />
      <p>每个 <code>Model</code> 对象的字段：</p>
      <FieldTable rows={MODEL_FIELDS} />

      <Callout tone="info" title="模型清单是动态的">
        <p>
          上架、下架、能力变更都在控制台与网关侧实时进行。建议在你的应用中
          缓存 <code>/v1/models</code> 结果不超过几分钟，并在请求 chat completion 失败、
          错误码为 <code>model_not_found</code> 时刷新缓存。
        </p>
      </Callout>

      <h2 id="tips">使用建议</h2>
      <ul>
        <li>
          <strong>挑选模型</strong>：通过 <code>capabilities</code> 过滤——例如需要
          function calling 的场景只保留 <code>function_calling</code> in capabilities 的模型。
        </li>
        <li>
          <strong>上下文长度</strong>：长文档处理任务用 <code>context_window</code> 排序，
          挑选最合适的，避免超长输入导致 <code>context_length_exceeded</code>。
        </li>
        <li>
          <strong>多模态</strong>：识别 <code>modalities</code> 是否包含
          <code>image</code> / <code>audio</code>，再决定能否传入对应内容。
        </li>
        <li>
          <strong>异常处理</strong>：参考{' '}
          <Link to="/docs/api/errors">错误码</Link>，对
          <code>model_not_found</code> / <code>permission_denied</code> 给出友好提示。
        </li>
      </ul>
    </DocPage>
  )
}
