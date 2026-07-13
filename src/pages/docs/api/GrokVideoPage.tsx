import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { CodeTabs } from '../../../components/ui/CodeTabs'
import { EndpointBadge } from '../../../components/ui/EndpointBadge'
import { FieldTable, type FieldRow } from '../../../components/ui/FieldTable'
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
  { name: 'task_id', type: 'string', required: true, description: <>任务唯一 ID 的别名，建议保存这个字段。</> },
  { name: 'object', type: 'string', required: true, description: <>固定为 <code>"video"</code>。</> },
  { name: 'model', type: 'string', required: true, description: <>实际使用的模型 ID。</> },
  { name: 'status', type: 'string', required: true, description: <>任务状态，例如 <code>queued</code>。</> },
  { name: 'progress', type: 'integer | string', required: true, description: <>任务进度，常见为百分比字符串。</> },
  { name: 'created_at', type: 'integer', description: <>创建时间戳，Unix 秒。</> },
]

const POLL_RESPONSE_ROWS: FieldRow[] = [
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

const CREATE_TASK_CURL = String.raw`curl -X POST "https://img.gpt88.cc/v1/video/generations" \
  -H "Authorization: Bearer <YOUR_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok-image-video",
    "prompt": "A cinematic shot of a red sports car driving through rainy neon streets at night",
    "seconds": 6,
    "aspect_ratio": "16:9",
    "resolution": "720p"
  }'`

const SINGLE_IMAGE_CURL = String.raw`curl -X POST "https://img.gpt88.cc/v1/video/generations" \
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

const MULTI_IMAGE_CURL = String.raw`curl -X POST "https://img.gpt88.cc/v1/video/generations" \
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

const SINGLE_V1_CURL = String.raw`curl -X POST "https://img.gpt88.cc/v1/video/generations" \
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

const JS_EXAMPLE = String.raw`const BASE_URL = 'https://img.gpt88.cc'
const API_KEY = process.env.NEWAPI_API_KEY

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

  const createResponse = await fetch(\`\${BASE_URL}/v1/video/generations\`, {
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

  const taskId = created.task_id || created.id
  if (!taskId) {
    throw new Error(\`No task_id returned: \${JSON.stringify(created)}\`)
  }

  for (let i = 0; i < 60; i += 1) {
    await sleep(5000)

    const pollResponse = await fetch(\`\${BASE_URL}/v1/video/generations/\${taskId}\`, {
      headers: {
        Authorization: \`Bearer \${API_KEY}\`,
      },
    })

    const result = await pollResponse.json()
    if (!pollResponse.ok) {
      throw new Error(\`Video poll failed: \${JSON.stringify(result)}\`)
    }

    const task = result.data
    if (task?.status === 'SUCCESS' && task.result_url) {
      return {
        task_id: task.task_id,
        video_url: task.result_url,
        raw_response: result,
      }
    }

    if (task?.status === 'FAILURE') {
      throw new Error(\`Video generation failed: \${task.fail_reason || JSON.stringify(result)}\`)
    }
  }

  throw new Error(\`Video generation timeout: \${taskId}\`)
}`

export default function GrokVideoPage() {
  const { locale } = useLocale()
  return (
    <DocPage
      path="/docs/api/grok-video/"
      title="Grok Video API 接入文档"
      description="Grok 视频生成 API 的完整接入说明，包括模型列表、创建任务、轮询查询、图生视频参数、错误排查和 JavaScript 示例。"
      headings={[
        { id: 'intro', text: '基础信息', level: 2 },
        { id: 'key', text: '获取 API Key', level: 2 },
        { id: 'models', text: '查询可用模型', level: 2 },
        { id: 'create', text: '创建视频任务', level: 2 },
        { id: 'params', text: '参数建议', level: 2 },
        { id: 'examples', text: '请求示例', level: 2 },
        { id: 'create-response', text: '创建响应', level: 2 },
        { id: 'status', text: '查询任务状态', level: 2 },
        { id: 'js', text: 'JavaScript 示例', level: 2 },
        { id: 'errors', text: '常见错误', level: 2 },
        { id: 'notes', text: '接入注意事项', level: 2 },
      ]}
    >
      <Callout tone="info" title="适合把视频生成接到自己的后端或工作流">
        <p>
          这是一份面向 API 用户的接入文档，目标是让你完成三件事：先查模型，再提交视频任务，最后轮询拿到
          <code>result_url</code>。
        </p>
        <p className="mt-2">
          如果你是从中转站或代理层接入，测试时请把你的请求地址、站内 Key 和本页示例统一替换后，再交给
          <code>Codex</code>、<code>Claude</code> 或你的后端做真实连通性测试。
        </p>
      </Callout>

      <h2 id="intro">基础信息</h2>
      <EndpointBadge method="GET" path="https://img.gpt88.cc/v1/models" />
      <EndpointBadge method="POST" path="https://img.gpt88.cc/v1/video/generations" />
      <EndpointBadge method="GET" path="https://img.gpt88.cc/v1/video/generations/{task_id}" />

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
          创建视频任务不会立即返回最终视频地址。你需要把 <code>task_id</code> 保存起来，再调用查询接口直到
          <code>SUCCESS</code> 或 <code>FAILURE</code>。
        </p>
      </Callout>

      <h2 id="key">获取 API Key</h2>
      <p>
        请在你的控制台创建或复制 API Key。调用时放入请求头：
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
      <EndpointBadge method="POST" path="https://img.gpt88.cc/v1/video/generations" />
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
      <p>创建成功后会返回任务对象。关键字段是 <code>id</code> 或 <code>task_id</code>：</p>
      <CodeBlock lang="json" filename="create-response.json" code={TASK_RESPONSE} />
      <FieldTable rows={TASK_RESPONSE_ROWS} />
      <p>
        客户端建议统一保存：
        <code className="ml-1">task_id = response.task_id || response.id</code>
      </p>

      <h2 id="status">查询任务状态</h2>
      <CodeBlock
        lang="bash"
        filename="poll-task.sh"
        code={String.raw`curl -X GET "https://img.gpt88.cc/v1/video/generations/task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -H "Authorization: Bearer <YOUR_API_KEY>"`}
      />
      <p>典型处理中响应：</p>
      <CodeBlock lang="json" filename="poll-progress.json" code={POLL_PROGRESS} />
      <p>典型成功响应：</p>
      <CodeBlock lang="json" filename="poll-success.json" code={POLL_SUCCESS} />
      <p>典型失败响应：</p>
      <CodeBlock lang="json" filename="poll-failure.json" code={POLL_FAILURE} />
      <FieldTable rows={POLL_RESPONSE_ROWS} />
      <ul>
        <li><code>data.status == "SUCCESS"</code> 且 <code>data.result_url</code> 非空，表示成功。</li>
        <li><code>data.status == "FAILURE"</code>，读取 <code>data.fail_reason</code> 展示给用户。</li>
        <li><code>data.status</code> 为 <code>SUBMITTED</code>、<code>QUEUED</code>、<code>IN_PROGRESS</code>、<code>NOT_START</code> 时，任务还在处理中。</li>
      </ul>
      <Callout tone="warn" title="progress 100% 不等于成功">
        <p>
          <code>progress: "100%"</code> 只表示流程已经结束，不代表一定成功。是否成功必须看
          <code>data.status</code>。
        </p>
      </Callout>
      <Callout tone="info" title="轮询建议">
        <ul className="mt-2 space-y-1">
          <li>轮询间隔：每 5 秒一次。</li>
          <li>最大轮询时长：5 分钟。</li>
          <li>最大轮询次数：60 次。</li>
          <li>成功后尽快下载 <code>data.result_url</code>，因为这个直链大约 1 小时后失效。</li>
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
        <li><strong>轮询超时</strong>：保留 <code>task_id</code>，稍后继续查询。</li>
      </ul>

      <h2 id="notes">接入注意事项</h2>
      <ul>
        <li>不要把模型 ID 写死成单个模型，建议通过 <Link to={localizePath('/docs/api/list-models/', locale)}>GET /v1/models</Link> 动态读取。</li>
        <li>默认推荐使用 <code>grok-image-video</code>。</li>
        <li><code>grok-video-1.5</code> 当前仅用于单参考图生视频。</li>
        <li><code>grok-image-video</code> 文生视频和单图生视频最长 15 秒，多参考图最长 10 秒。</li>
        <li><code>grok-image-video</code> 多参考图最多 7 张；多参考图请求超过 10 秒会自动按 10 秒处理。</li>
        <li><code>grok-video-1.5</code> 只支持单图生视频，最长 15 秒。</li>
        <li>最终视频 URL 在查询接口的 <code>data.result_url</code> 字段中，建议在生成成功后立即下载。</li>
        <li>任务失败时可能会出现 <code>progress: "100%"</code>，这是正常结束状态，请以 <code>data.status</code> 判断结果。</li>
      </ul>
    </DocPage>
  )
}
