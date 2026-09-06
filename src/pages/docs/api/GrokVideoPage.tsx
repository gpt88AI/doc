import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { CodeTabs } from '../../../components/ui/CodeTabs'
import { EndpointBadge } from '../../../components/ui/EndpointBadge'
import { FieldTable, type FieldRow } from '../../../components/ui/FieldTable'
import { buildAgentActivationUrl } from '../../../lib/activationLinks'
import { localizePath, useLocale } from '../../../lib/locale'

const MODEL_ROWS: FieldRow[] = [
  { name: 'id', type: 'string', required: true, description: <>模型 ID，例如 <code>grok-image-video</code>。</> },
  { name: 'object', type: 'string', required: true, description: <>固定为 <code>"model"</code>。</> },
  { name: 'created', type: 'integer', description: <>模型上架时间戳，Unix 秒。</> },
  { name: 'owned_by', type: 'string', description: <>模型归属 provider，例如 <code>xai</code>。</> },
  { name: 'capabilities', type: 'string[]', description: <>支持能力，例如 <code>video</code> / <code>image</code> / <code>streaming</code>。</> },
  { name: 'modalities', type: 'string[]', description: <>支持模态，例如 <code>video</code>、<code>image</code>。</> },
]

const REQUEST_ROWS: FieldRow[] = [
  { name: 'model', type: 'string', required: true, description: <>模型 ID，例如 <code>grok-image-video</code> 或 <code>grok-video-1.5</code>。</> },
  { name: 'prompt', type: 'string', required: true, description: <>视频提示词。</> },
  { name: 'seconds', type: 'integer', description: <>视频秒数，默认建议 <code>4</code>。</> },
  { name: 'aspect_ratio', type: 'string', description: <>画幅比例，默认建议 <code>16:9</code>。</> },
  { name: 'resolution', type: 'string', description: <>清晰度，建议 <code>720p</code> 或 <code>480p</code>。</> },
  { name: 'image_urls', type: 'array<string>', description: <>参考图 URL 或 base64 data URL 列表。</> },
  { name: 'images', type: 'array<string>', description: <>兼容字段，含义与 <code>image_urls</code> 相同。不要和 <code>image_urls</code> 同时传。</> },
  { name: 'input_reference', type: 'object | string', description: <>单参考图字段，可传 <code>{'{ "image_url": "..." }'}</code>。</> },
  { name: 'reference_images', type: 'array<string>', description: <>多参考图字段。不要和 <code>input_reference</code> 同时传。</> },
]

const TASK_RESPONSE_ROWS: FieldRow[] = [
  { name: 'id', type: 'string', required: true, description: <>任务唯一 ID。</> },
  { name: 'request_id', type: 'string', required: true, description: <>上游请求 ID。兼容字段；优先保存 <code>id</code> 作为 OpenAI 兼容接口的查询 ID。</> },
  { name: 'task_id', type: 'string', description: <>旧版任务接口可能返回的任务 ID；新格式不一定在顶层返回。</> },
  { name: 'object', type: 'string', required: true, description: <>固定为 <code>"video"</code>。</> },
  { name: 'model', type: 'string', required: true, description: <>实际使用的模型 ID。</> },
  { name: 'status', type: 'string', required: true, description: <>任务状态，例如 <code>queued</code>。</> },
  { name: 'progress', type: 'integer | string', required: true, description: <>任务进度，常见为百分比字符串。</> },
  { name: 'created_at', type: 'integer', description: <>创建时间戳，Unix 秒。</> },
]

const STATUS_RESPONSE_ROWS: FieldRow[] = [
  { name: 'id', type: 'string', required: true, description: <>OpenAI 兼容的视频 ID，例如 <code>video_gpt88_v1_...</code>。用于继续查询和下载。</> },
  { name: 'request_id', type: 'string', description: <>上游原始请求 ID。通常不需要自行拼接到 OpenAI 兼容接口中。</> },
  { name: 'object', type: 'string', required: true, description: <>固定为 <code>"video"</code>。</> },
  { name: 'model', type: 'string', required: true, description: <>实际使用的模型 ID。</> },
  { name: 'status', type: 'string', required: true, description: <>状态为 <code>completed</code> 时表示可获取成品；失败通常为 <code>failed</code>。</> },
  { name: 'progress', type: 'integer', description: <>进度百分比，例如 <code>100</code>。</> },
  { name: 'url', type: 'string', description: <>视频内容路径或完整 URL。可能是相对路径。</> },
  { name: 'video_url', type: 'string', description: <>视频内容路径或完整 URL，与 <code>url</code> 类似。</> },
  { name: 'video.url', type: 'string', description: <>嵌套视频对象中的内容路径。</> },
  { name: 'video.duration', type: 'number', description: <>视频时长，单位秒。</> },
]

const LEGACY_POLL_RESPONSE_ROWS: FieldRow[] = [
  { name: 'code', type: 'string', required: true, description: <>通常为 <code>success</code>。</> },
  { name: 'message', type: 'string', required: true, description: <>接口消息。</> },
  { name: 'data.task_id', type: 'string', required: true, description: <>任务 ID。</> },
  { name: 'data.status', type: 'string', required: true, description: <>任务状态：<code>SUBMITTED</code> / <code>QUEUED</code> / <code>IN_PROGRESS</code> / <code>NOT_START</code> / <code>SUCCESS</code> / <code>FAILURE</code>。</> },
  { name: 'data.progress', type: 'string', required: true, description: <>进度字符串，例如 <code>30%</code> 或 <code>100%</code>。</> },
  { name: 'data.result_url', type: 'string', description: <>成功后的临时视频直链。</> },
  { name: 'data.fail_reason', type: 'string', description: <>失败原因。</> },
]

const MODEL_LIST_CURL = String.raw`curl -X GET "https://img.gpt88.cc/v1/models" \
  -H "Authorization: Bearer <YOUR_API_KEY>"`

const CREATE_TASK_CURL = String.raw`curl -X POST "https://img.gpt88.cc/v1/videos/generations" \
  -H "Authorization: Bearer <YOUR_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok-image-video",
    "prompt": "A cinematic shot of a red sports car driving through rainy neon streets at night",
    "seconds": 6,
    "aspect_ratio": "16:9",
    "resolution": "720p"
  }'`

const SINGLE_IMAGE_CURL = String.raw`curl -X POST "https://img.gpt88.cc/v1/videos/generations" \
  -H "Authorization: Bearer <YOUR_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok-image-video",
    "prompt": "Animate the product with a slow rotating camera, soft studio light, premium commercial style",
    "seconds": 6,
    "aspect_ratio": "9:16",
    "resolution": "720p",
    "image_urls": [
      "https://example.com/product.png"
    ]
  }'`

const MULTI_IMAGE_CURL = String.raw`curl -X POST "https://img.gpt88.cc/v1/videos/generations" \
  -H "Authorization: Bearer <YOUR_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok-image-video",
    "prompt": "Create a smooth product showcase video using these references, luxury lighting, clean background",
    "seconds": 10,
    "aspect_ratio": "16:9",
    "resolution": "720p",
    "image_urls": [
      "https://example.com/ref-1.png",
      "https://example.com/ref-2.png"
    ]
  }'`

const SINGLE_V1_CURL = String.raw`curl -X POST "https://img.gpt88.cc/v1/videos/generations" \
  -H "Authorization: Bearer <YOUR_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok-video-1.5",
    "prompt": "Use the reference image as the main subject and create a smooth cinematic motion",
    "seconds": 4,
    "aspect_ratio": "16:9",
    "resolution": "480p",
    "image_urls": [
      "https://example.com/reference.png"
    ]
  }'`

const TASK_RESPONSE = String.raw`{
  "id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "task_id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "object": "video",
  "model": "grok-image-video",
  "status": "queued",
  "progress": 0,
  "created_at": 1780000000
}`

const POLL_PROGRESS = String.raw`{
  "code": "success",
  "message": "",
  "data": {
    "task_id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "status": "IN_PROGRESS",
    "progress": "30%",
    "result_url": "",
    "fail_reason": ""
  }
}`

const POLL_SUCCESS = String.raw`{
  "code": "success",
  "message": "",
  "data": {
    "task_id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "status": "SUCCESS",
    "progress": "100%",
    "result_url": "https://example.com/generated-video.mp4",
    "fail_reason": ""
  }
}`

const POLL_FAILURE = String.raw`{
  "code": "success",
  "message": "",
  "data": {
    "task_id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "status": "FAILURE",
    "progress": "100%",
    "result_url": "",
    "fail_reason": "Image URL could not be fetched: Fetching image failed with HTTP status 400 Bad Request."
  }
}`

const STATUS_COMPLETED = String.raw`{
  "id": "video_gpt88_v1_dmlkZW9fYmY2OTEwODkwYmEwNGRjNThiODI4NWMzMTMzN2QwMTI",
  "model": "grok-imagine-video",
  "object": "video",
  "progress": 100,
  "request_id": "video_bf6910890ba04dc58b8285c31337d012",
  "status": "completed",
  "url": "/v1/videos/video_bf6910890ba04dc58b8285c31337d012/content",
  "video": {
    "duration": 6,
    "task_id": "video_bf6910890ba04dc58b8285c31337d012",
    "url": "/v1/videos/video_bf6910890ba04dc58b8285c31337d012/content"
  },
  "video_url": "/v1/videos/video_bf6910890ba04dc58b8285c31337d012/content"
}`

const STATUS_CURL = String.raw`curl --fail-with-body --max-redirs 0 \
  "https://img.gpt88.cc/v1/videos/video_gpt88_v1_dmlkZW9fYmY2OTEwODkwYmEwNGRjNThiODI4NWMzMTMzN2QwMTI" \
  -H "Authorization: Bearer $GPT88_API_KEY"`

const CONTENT_CURL = String.raw`curl --fail-with-body --max-redirs 0 \
  "https://img.gpt88.cc/v1/videos/video_gpt88_v1_dmlkZW9fYmY2OTEwODkwYmEwNGRjNThiODI4NWMzMTMzN2QwMTI/content" \
  -H "Authorization: Bearer $GPT88_API_KEY" \
  -o generated-video.mp4`

const CONTENT_PYTHON = String.raw`import os
from pathlib import Path
import requests

base_url = "https://img.gpt88.cc"
video_id = "video_gpt88_v1_dmlkZW9fYmY2OTEwODkwYmEwNGRjNThiODI4NWMzMTMzN2QwMTI"
headers = {"Authorization": f"Bearer {os.environ['GPT88_API_KEY']}"}

status = requests.get(
    f"{base_url}/v1/videos/{video_id}",
    headers=headers,
    timeout=30,
)
status.raise_for_status()
payload = status.json()

if payload.get("status") != "completed":
    raise RuntimeError(f"video is not ready: {payload}")

content = requests.get(
    f"{base_url}/v1/videos/{video_id}/content",
    headers=headers,
    timeout=120,
)
content.raise_for_status()
Path("generated-video.mp4").write_bytes(content.content)
print("saved generated-video.mp4")`

const CONTENT_NODE = String.raw`import { writeFile } from "node:fs/promises";

const baseUrl = "https://img.gpt88.cc";
const videoId = "video_gpt88_v1_dmlkZW9fYmY2OTEwODkwYmEwNGRjNThiODI4NWMzMTMzN2QwMTI";
const headers = { Authorization: "Bearer " + process.env.GPT88_API_KEY };

const statusResponse = await fetch(baseUrl + "/v1/videos/" + videoId, { headers });
const status = await statusResponse.json();
if (!statusResponse.ok || status.status !== "completed") {
  throw new Error("video is not ready: " + JSON.stringify(status));
}

const contentResponse = await fetch(baseUrl + "/v1/videos/" + videoId + "/content", { headers });
if (!contentResponse.ok) throw new Error("download failed: " + contentResponse.status);
await writeFile("generated-video.mp4", Buffer.from(await contentResponse.arrayBuffer()));
console.log("saved generated-video.mp4");`

const JS_EXAMPLE = String.raw`const BASE_URL = 'https://img.gpt88.cc'
const API_KEY = process.env.GPT88_API_KEY

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function validateVideoRequest({ model, imageUrls }) {
  if (model === 'grok-video-1.5' && imageUrls.length !== 1) {
    throw new Error('grok-video-1.5 only supports exactly one reference image.')
  }

  if (model === 'grok-image-video' && imageUrls.length > 7) {
    throw new Error('grok-image-video supports at most 7 reference images.')
  }
}

async function createVideo({
  model = 'grok-image-video',
  prompt,
  seconds = 4,
  aspectRatio = '16:9',
  resolution = '720p',
  imageUrls = [],
}) {
  validateVideoRequest({ model, imageUrls })

  const body = {
    model,
    prompt,
    seconds,
    aspect_ratio: aspectRatio,
    resolution,
  }

  if (imageUrls.length > 0) {
    body.image_urls = imageUrls
    if (imageUrls.length >= 2 && Number(body.seconds) > 10) {
      body.seconds = 10
    }
  }

  const createResponse = await fetch(\`\${BASE_URL}/v1/videos/generations\`, {
    method: 'POST',
    headers: {
      Authorization: \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const created = await createResponse.json()
  if (!createResponse.ok) {
    throw new Error(\`Video request failed: \${JSON.stringify(created)}\`)
  }

  const videoId = created.id || created.request_id || created.task_id
  if (!videoId) {
    throw new Error(\`No video id returned: \${JSON.stringify(created)}\`)
  }

  for (let i = 0; i < 60; i += 1) {
    await sleep(5000)

    const pollResponse = await fetch(\`\${BASE_URL}/v1/videos/\${encodeURIComponent(videoId)}\`, {
      headers: {
        Authorization: \`Bearer \${API_KEY}\`,
      },
    })

    const result = await pollResponse.json()
    if (!pollResponse.ok) {
      throw new Error(\`Video poll failed: \${JSON.stringify(result)}\`)
    }

    const status = String(result.status || result.data?.status || '').toLowerCase()
    const completed = ['completed', 'complete', 'done', 'success', 'succeeded'].includes(status)
    if (completed) {
      const contentResponse = await fetch(\`\${BASE_URL}/v1/videos/\${encodeURIComponent(videoId)}/content\`, {
        headers: {
          Authorization: \`Bearer \${API_KEY}\`,
        },
      })
      if (!contentResponse.ok) {
        throw new Error(\`Video download failed: \${contentResponse.status}\`)
      }

      const file = Buffer.from(await contentResponse.arrayBuffer())
      const { writeFile } = await import('node:fs/promises')
      await writeFile(\`generated-\${videoId}.mp4\`, file)
      return {
        video_id: videoId,
        file: \`generated-\${videoId}.mp4\`,
        raw_response: result,
      }
    }

    if (['failed', 'failure', 'cancelled', 'canceled', 'expired'].includes(status)) {
      throw new Error(\`Video generation failed: \${result.error?.message || result.fail_reason || JSON.stringify(result)}\`)
    }
  }

  throw new Error(\`Video generation timeout: \${videoId}\`)
}`

export default function GrokVideoPage() {
  const { locale } = useLocale()
  const keyUrl = buildAgentActivationUrl({
    locale,
    surface: 'api_grok_video_auth',
    intent: 'image_api',
    destination: 'keys',
  })

  return (
    <DocPage
      path="/docs/api/grok-video/"
      title="Grok Video API 接入文档"
      description="Grok 视频生成 API 的完整接入说明，包括模型列表、创建任务、状态查询、视频内容下载保存、图生视频参数、错误排查和 JavaScript 示例。"
      headings={[
        { id: 'intro', text: '基础信息', level: 2 },
        { id: 'key', text: '获取 API Key', level: 2 },
        { id: 'models', text: '查询可用模型', level: 2 },
        { id: 'create', text: '创建视频任务', level: 2 },
        { id: 'params', text: '参数建议', level: 2 },
        { id: 'examples', text: '请求示例', level: 2 },
        { id: 'create-response', text: '创建响应', level: 2 },
        { id: 'status', text: '查询任务状态', level: 2 },
        { id: 'content', text: '查询内容并保存视频', level: 2 },
        { id: 'js', text: 'JavaScript 示例', level: 2 },
        { id: 'errors', text: '常见错误', level: 2 },
        { id: 'notes', text: '接入注意事项', level: 2 },
      ]}
    >
      <Callout tone="info" title="适合把视频生成接到自己的后端或工作流">
        <p>
          这是一份面向 API 用户的接入文档，目标是让你完成四件事：先查模型，再提交视频任务，查询最终状态，最后获取并保存视频文件。
        </p>
        <p className="mt-2">
          如果你是从中转站或代理层接入，测试时请把你的请求地址、站内 Key 和本页示例统一替换后，再交给
          <code>Codex</code>、<code>Claude</code> 或你的后端做真实连通性测试。
        </p>
      </Callout>

      <h2 id="intro">基础信息</h2>
      <EndpointBadge method="GET" path="https://img.gpt88.cc/v1/models" />
      <EndpointBadge method="POST" path="https://img.gpt88.cc/v1/videos/generations" />
      <EndpointBadge method="GET" path="https://img.gpt88.cc/v1/videos/{id}" />
      <EndpointBadge method="GET" path="https://img.gpt88.cc/v1/videos/{id}/content" />

      <FieldTable
        rows={[
          { name: 'Base URL', type: 'string', required: true, description: <><code>https://img.gpt88.cc</code>。</> },
          { name: '鉴权方式', type: 'string', required: true, description: <><code>Authorization: Bearer &lt;YOUR_API_KEY&gt;</code>。</> },
          { name: '请求格式', type: 'string', required: true, description: <><code>application/json</code>。</> },
          { name: '响应格式', type: 'string', required: true, description: <>JSON。</> },
          { name: '任务类型', type: 'string', required: true, description: <>异步任务。创建成功后先返回 <code>task_id</code>，再轮询查询。</> },
        ]}
      />

      <Callout tone="warn" title="异步任务要保存 task_id">
        <p>
          创建视频任务不会立即返回最终视频地址。你需要保存响应中的 <code>id</code>（或旧格式中的
          <code>task_id</code>），再查询视频状态直到 <code>completed</code> 或失败状态。
        </p>
      </Callout>

      <h2 id="key">获取 API Key</h2>
      <p>
        请在 <a href={keyUrl} target="_blank" rel="noreferrer">Agent API Keys</a>{' '}
        创建或复制 API Key。调用时放入请求头：
      </p>
      <CodeBlock lang="bash" filename="auth-header" code={`Authorization: Bearer <YOUR_API_KEY>`} />
      <p>
        不要把 API Key 写进前端页面、移动端安装包或公开仓库。推荐只在你的后端服务里转发请求。
      </p>

      <h2 id="models">查询可用模型</h2>
      <CodeBlock lang="bash" filename="list-models.sh" code={MODEL_LIST_CURL} />
      <FieldTable rows={MODEL_ROWS} />
      <Callout tone="info" title="当前文档覆盖的模型">
        <ul className="mt-2 space-y-1">
          <li><code>grok-image-video</code>：通用默认模型，支持文生视频、单参考图、多参考图。</li>
          <li><code>grok-video-1.5</code>：单参考图预览模型，只支持 1 张参考图。</li>
        </ul>
        <p className="mt-2">
          如果后续开放更多模型，请优先以 <Link to={localizePath('/docs/api/list-models/', locale)}>GET /v1/models</Link> 的实时返回为准。
        </p>
      </Callout>

      <h2 id="create">创建视频任务</h2>
      <p>接口：</p>
      <EndpointBadge method="POST" path="https://img.gpt88.cc/v1/videos/generations" />
      <FieldTable rows={REQUEST_ROWS} />
      <Callout tone="info" title="字段兼容规则">
        <p>
          统一建议优先使用 <code>image_urls</code>。为了兼容不同 SDK 和上游接入方式，服务端也支持
          <code>images</code>、<code>input_reference</code> 和 <code>reference_images</code> 这些字段。
        </p>
        <p className="mt-2">
          但这些字段不要同时混用。对于同一个请求，二选一即可，避免上游把图片解析成重复输入。
        </p>
      </Callout>

      <h2 id="params">参数建议</h2>
      <ul>
        <li>
          <strong>seconds</strong>：<code>grok-image-video</code> 的文生视频和单图生视频建议使用 <code>4</code>、<code>6</code>、<code>8</code>、<code>10</code>、<code>12</code>、<code>15</code>；多参考图建议使用 <code>4</code>、<code>6</code>、<code>8</code>、<code>10</code>。
        </li>
        <li>
          <strong>时长规则</strong>：<code>grok-image-video</code> 文生视频和单图生视频最长支持 <code>15s</code>；多参考图最长支持 <code>10s</code>，超过会自动按 <code>10s</code> 处理。
        </li>
        <li>
          <strong>aspect_ratio</strong>：<code>grok-image-video</code> 推荐 <code>1:1</code>、<code>16:9</code>、<code>9:16</code>、<code>4:3</code>、<code>3:4</code>、<code>3:2</code>、<code>2:3</code>；<code>grok-video-1.5</code> 仅建议 <code>16:9</code> 或 <code>9:16</code>。
        </li>
        <li>
          <strong>resolution</strong>：常用 <code>720p</code> 和 <code>480p</code>。如果你做批量素材，可优先低分辨率；如果要封面或主视觉，优先高分辨率。
        </li>
        <li>
          <strong>图片要求</strong>：参考图最好使用公网可直接访问的 HTTPS 直链，或者完整的 base64 data URL。
        </li>
      </ul>

      <CodeTabs
        tabs={[
          { label: 'cURL', lang: 'bash', code: CREATE_TASK_CURL },
          { label: '说明', lang: 'text', code: 'model: grok-image-video\nprompt: 视频提示词\nseconds: 秒数\naspect_ratio: 画幅比例\nresolution: 清晰度' },
        ]}
      />

      <h2 id="examples">请求示例</h2>
      <h3>6.1 文生视频</h3>
      <CodeBlock lang="bash" filename="text-to-video.sh" code={CREATE_TASK_CURL} />

      <h3>6.2 单参考图生视频</h3>
      <CodeBlock lang="bash" filename="single-reference-image.sh" code={SINGLE_IMAGE_CURL} />
      <p>
        单参考图场景下，你也可以使用 <code>input_reference</code>，例如：
      </p>
      <CodeBlock
        lang="json"
        filename="single-reference-image.json"
        code={String.raw`{
  "model": "grok-image-video",
  "prompt": "Animate the product with a slow rotating camera",
  "seconds": 6,
  "aspect_ratio": "9:16",
  "resolution": "720p",
  "input_reference": {
    "image_url": "https://example.com/product.png"
  }
}`}
      />

      <h3>6.3 多参考图生视频</h3>
      <CodeBlock lang="bash" filename="multi-reference-image.sh" code={MULTI_IMAGE_CURL} />
      <p>
        多参考图时，请不要同时传 <code>input_reference</code> 和 <code>reference_images</code>。
        如果你要控制单个商品在多个角度之间切换，建议先整理好图片顺序，再提交任务。
      </p>

      <h3>6.4 grok-video-1.5 单图生视频</h3>
      <CodeBlock lang="bash" filename="grok-video-1.5.sh" code={SINGLE_V1_CURL} />
      <Callout tone="warn" title="grok-video-1.5 的约束">
        <p>
          这个模型当前只支持 <strong>1 张参考图</strong>，最长支持 <strong>15 秒</strong>。
          不要用它提交纯文生视频，也不要传多张参考图。
        </p>
      </Callout>

      <h2 id="create-response">创建响应</h2>
      <p>创建成功后会返回视频任务对象。关键字段是 <code>id</code>、<code>request_id</code> 和兼容旧格式的 <code>task_id</code>：</p>
      <CodeBlock lang="json" filename="create-response.json" code={TASK_RESPONSE} />
      <FieldTable rows={TASK_RESPONSE_ROWS} />
      <p>
        OpenAI 兼容响应优先保存：
        <code className="ml-1">video_id = response.id || response.request_id || response.task_id</code>
      </p>

      <h2 id="status">查询任务状态</h2>
      <p>
        推荐使用 OpenAI 兼容的视频资源路径，根据创建响应中的 <code>id</code> 查询。不要把响应里的相对路径直接当成完整 URL；
        需要在前面拼接你的 Base URL。
      </p>
      <CodeBlock
        lang="bash"
        filename="poll-task.sh"
        code={STATUS_CURL}
      />
      <p>生成中的旧格式响应：</p>
      <CodeBlock lang="json" filename="poll-progress.json" code={POLL_PROGRESS} />
      <p>兼容旧任务接口的成功响应：</p>
      <CodeBlock lang="json" filename="poll-success-legacy.json" code={POLL_SUCCESS} />
      <p>兼容旧任务接口的失败响应：</p>
      <CodeBlock lang="json" filename="poll-failure-legacy.json" code={POLL_FAILURE} />
      <FieldTable rows={LEGACY_POLL_RESPONSE_ROWS} />
      <p>当前 OpenAI 兼容视频资源的成功响应：</p>
      <CodeBlock lang="json" filename="video-status-completed.json" code={STATUS_COMPLETED} />
      <FieldTable rows={STATUS_RESPONSE_ROWS} />
      <ul>
        <li>新格式以顶层 <code>status == "completed"</code> 判断完成；失败时通常为 <code>failed</code>、<code>cancelled</code> 或 <code>expired</code>。</li>
        <li>旧格式以 <code>data.status == "SUCCESS"</code> 且 <code>data.result_url</code> 非空判断完成。</li>
        <li>处理中状态可能是 <code>queued</code>、<code>in_progress</code>，或旧格式的 <code>SUBMITTED</code>、<code>QUEUED</code>、<code>IN_PROGRESS</code>、<code>NOT_START</code>。</li>
      </ul>
      <Callout tone="warn" title="progress 100% 不等于成功">
        <p>
          <code>progress: 100</code> 或 <code>progress: "100%"</code> 只表示流程已经结束，不代表一定成功。必须同时检查
          <code>status</code> 或旧格式的 <code>data.status</code>。
        </p>
      </Callout>
      <Callout tone="info" title="轮询建议">
        <ul className="mt-2 space-y-1">
          <li>轮询间隔：每 5 秒一次。</li>
          <li>最大轮询时长：5 分钟。</li>
          <li>最大轮询次数：60 次。</li>
          <li>成功后尽快下载内容；如果响应返回的是临时完整 URL，请在失效前保存。</li>
        </ul>
      </Callout>

      <h2 id="content">查询内容并保存视频</h2>
      <p>
        当状态为 <code>completed</code> 后，可以调用内容接口获取视频二进制。内容接口返回的是视频文件流，不是 JSON，
        所以需要使用 <code>-o</code>、<code>write_bytes</code> 或 <code>writeFile</code> 保存。
      </p>
      <EndpointBadge method="GET" path="https://img.gpt88.cc/v1/videos/{id}/content" />
      <p>
        你提供的响应中，<code>url</code>、<code>video_url</code> 和 <code>video.url</code> 都指向同一个内容路径。
        若字段是以 <code>/v1/</code> 开头的相对路径，请拼接 <code>https://img.gpt88.cc</code>；更稳定的方式是直接调用
        <code>/v1/videos/{'{id}'}/content</code> 并携带同一个 API Key。
      </p>
      <CodeBlock lang="bash" filename="download-video.sh" code={CONTENT_CURL} />
      <CodeBlock lang="python" filename="download-video.py" code={CONTENT_PYTHON} />
      <CodeBlock lang="typescript" filename="download-video.mjs" code={CONTENT_NODE} />
      <Callout tone="info" title="保存成功的判断">
        <ul className="mt-2 space-y-1">
          <li>HTTP 请求应返回成功状态，并且响应体是视频二进制，而不是 JSON 错误对象。</li>
          <li>保存后的文件建议使用 <code>.mp4</code> 扩展名；如果服务端返回其他 <code>Content-Type</code>，以响应头为准。</li>
          <li>不要把 <code>video_url</code> 或完整响应直接写入文件；它们是路径或元数据，真正的视频内容来自 content 接口。</li>
          <li>下载失败时先重新查询状态，确认仍为 <code>completed</code>，再检查 API Key、视频 ID 和响应中的内容路径。</li>
        </ul>
      </Callout>

      <h2 id="js">JavaScript 示例</h2>
      <CodeBlock lang="typescript" filename="grok-video.ts" code={JS_EXAMPLE} />

      <h2 id="errors">常见错误</h2>
      <ul>
        <li><strong>401</strong>：API Key 缺失或错误，检查 <code>Authorization: Bearer &lt;YOUR_API_KEY&gt;</code>。</li>
        <li><strong>403</strong>：权限、额度或分组限制，检查账号余额、令牌权限和可用模型。</li>
        <li><strong>400 prompt is required</strong>：<code>prompt</code> 为空。</li>
        <li><strong>400 model field is required</strong>：<code>model</code> 为空或模型 ID 写错。</li>
        <li><strong>400 only supports exactly one reference image</strong>：<code>grok-video-1.5</code> 没有传图或传了多张图。</li>
        <li><strong>图片抓取失败</strong>：图片 URL 无法被服务端访问，换成真实直链或 base64。</li>
        <li><strong>任务 FAILURE</strong>：上游生成失败、图片不可访问或参数不支持，读取 <code>data.fail_reason</code>。</li>
        <li><strong>轮询超时</strong>：保留 <code>id</code> 或 <code>request_id</code>，稍后继续查询，不要重复提交生成任务。</li>
        <li><strong>下载返回 JSON 而不是视频</strong>：检查是否调用了 <code>/v1/videos/{'{id}'}/content</code>，并确认请求头带有 API Key。</li>
        <li><strong>404 或视频 ID 无效</strong>：优先使用响应里的 <code>id</code> 查询；不要把 <code>video.duration</code> 或 <code>task_id</code> 当作视频 ID。</li>
      </ul>

      <h2 id="notes">接入注意事项</h2>
      <ul>
        <li>不要把模型 ID 写死成单个模型，建议通过 <Link to={localizePath('/docs/api/list-models/', locale)}>GET /v1/models</Link> 动态读取。</li>
        <li>默认推荐使用 <code>grok-image-video</code>。</li>
        <li><code>grok-video-1.5</code> 当前仅用于单参考图生视频。</li>
        <li><code>grok-image-video</code> 文生视频和单图生视频最长 15 秒，多参考图最长 10 秒。</li>
        <li><code>grok-image-video</code> 多参考图最多 7 张；多参考图请求超过 10 秒会自动按 10 秒处理。</li>
        <li><code>grok-video-1.5</code> 只支持单图生视频，最长 15 秒。</li>
        <li>新格式的最终视频路径通常在 <code>url</code>、<code>video_url</code> 或 <code>video.url</code>；也可以直接调用 <code>/v1/videos/{'{id}'}/content</code> 保存。</li>
        <li>旧格式的最终视频 URL 在 <code>data.result_url</code> 字段中；返回相对路径时先拼接 Base URL。</li>
        <li>任务失败时可能会出现 <code>progress: 100</code> 或 <code>"100%"</code>，这是正常结束状态，请以状态字段判断结果。</li>
      </ul>
    </DocPage>
  )
}
