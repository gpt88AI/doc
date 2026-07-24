import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{d as n,s as r}from"./Seo-DGocodvz.js";import{t as i}from"./CodeBlock-6HZkGMv-.js";import{a,c as o,i as s,o as c,r as l,s as u}from"./index-ivPh6OuT.js";var d=e(),f=[{name:`id`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`模型 ID，例如 `,(0,d.jsx)(`code`,{children:`grok-image-video`}),`。`]})},{name:`object`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`固定为 `,(0,d.jsx)(`code`,{children:`"model"`}),`。`]})},{name:`created`,type:`integer`,description:(0,d.jsx)(d.Fragment,{children:`模型上架时间戳，Unix 秒。`})},{name:`owned_by`,type:`string`,description:(0,d.jsxs)(d.Fragment,{children:[`模型归属 provider，例如 `,(0,d.jsx)(`code`,{children:`xai`}),`。`]})},{name:`capabilities`,type:`string[]`,description:(0,d.jsxs)(d.Fragment,{children:[`支持能力，例如 `,(0,d.jsx)(`code`,{children:`video`}),` / `,(0,d.jsx)(`code`,{children:`image`}),` / `,(0,d.jsx)(`code`,{children:`streaming`}),`。`]})},{name:`modalities`,type:`string[]`,description:(0,d.jsxs)(d.Fragment,{children:[`支持模态，例如 `,(0,d.jsx)(`code`,{children:`video`}),`、`,(0,d.jsx)(`code`,{children:`image`}),`。`]})}],p=[{name:`model`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`模型 ID，例如 `,(0,d.jsx)(`code`,{children:`grok-image-video`}),` 或 `,(0,d.jsx)(`code`,{children:`grok-video-1.5`}),`。`]})},{name:`prompt`,type:`string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`视频提示词。`})},{name:`seconds`,type:`integer`,description:(0,d.jsxs)(d.Fragment,{children:[`视频秒数，默认建议 `,(0,d.jsx)(`code`,{children:`4`}),`。`]})},{name:`aspect_ratio`,type:`string`,description:(0,d.jsxs)(d.Fragment,{children:[`画幅比例，默认建议 `,(0,d.jsx)(`code`,{children:`16:9`}),`。`]})},{name:`resolution`,type:`string`,description:(0,d.jsxs)(d.Fragment,{children:[`清晰度，建议 `,(0,d.jsx)(`code`,{children:`720p`}),` 或 `,(0,d.jsx)(`code`,{children:`480p`}),`。`]})},{name:`image_urls`,type:`array<string>`,description:(0,d.jsx)(d.Fragment,{children:`参考图 URL 或 base64 data URL 列表。`})},{name:`images`,type:`array<string>`,description:(0,d.jsxs)(d.Fragment,{children:[`兼容字段，含义与 `,(0,d.jsx)(`code`,{children:`image_urls`}),` 相同。不要和 `,(0,d.jsx)(`code`,{children:`image_urls`}),` 同时传。`]})},{name:`input_reference`,type:`object | string`,description:(0,d.jsxs)(d.Fragment,{children:[`单参考图字段，可传 `,(0,d.jsx)(`code`,{children:`{ "image_url": "..." }`}),`。`]})},{name:`reference_images`,type:`array<string>`,description:(0,d.jsxs)(d.Fragment,{children:[`多参考图字段。不要和 `,(0,d.jsx)(`code`,{children:`input_reference`}),` 同时传。`]})}],m=[{name:`id`,type:`string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`任务唯一 ID。`})},{name:`task_id`,type:`string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`任务唯一 ID 的别名，建议保存这个字段。`})},{name:`object`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`固定为 `,(0,d.jsx)(`code`,{children:`"video"`}),`。`]})},{name:`model`,type:`string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`实际使用的模型 ID。`})},{name:`status`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`任务状态，例如 `,(0,d.jsx)(`code`,{children:`queued`}),`。`]})},{name:`progress`,type:`integer | string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`任务进度，常见为百分比字符串。`})},{name:`created_at`,type:`integer`,description:(0,d.jsx)(d.Fragment,{children:`创建时间戳，Unix 秒。`})}],h=[{name:`code`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`通常为 `,(0,d.jsx)(`code`,{children:`success`}),`。`]})},{name:`message`,type:`string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`接口消息。`})},{name:`data.task_id`,type:`string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`任务 ID。`})},{name:`data.status`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`任务状态：`,(0,d.jsx)(`code`,{children:`SUBMITTED`}),` / `,(0,d.jsx)(`code`,{children:`QUEUED`}),` / `,(0,d.jsx)(`code`,{children:`IN_PROGRESS`}),` / `,(0,d.jsx)(`code`,{children:`NOT_START`}),` / `,(0,d.jsx)(`code`,{children:`SUCCESS`}),` / `,(0,d.jsx)(`code`,{children:`FAILURE`}),`。`]})},{name:`data.progress`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`进度字符串，例如 `,(0,d.jsx)(`code`,{children:`30%`}),` 或 `,(0,d.jsx)(`code`,{children:`100%`}),`。`]})},{name:`data.result_url`,type:`string`,description:(0,d.jsx)(d.Fragment,{children:`成功后的临时视频直链。`})},{name:`data.fail_reason`,type:`string`,description:(0,d.jsx)(d.Fragment,{children:`失败原因。`})}],g=String.raw`curl -X GET "https://img.gpt88.cc/v1/models" \
  -H "Authorization: Bearer <YOUR_API_KEY>"`,_=String.raw`curl -X POST "https://img.gpt88.cc/v1/video/generations" \
  -H "Authorization: Bearer <YOUR_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok-image-video",
    "prompt": "A cinematic shot of a red sports car driving through rainy neon streets at night",
    "seconds": 6,
    "aspect_ratio": "16:9",
    "resolution": "720p"
  }'`,v=String.raw`curl -X POST "https://img.gpt88.cc/v1/video/generations" \
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
  }'`,y=String.raw`curl -X POST "https://img.gpt88.cc/v1/video/generations" \
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
  }'`,b=String.raw`curl -X POST "https://img.gpt88.cc/v1/video/generations" \
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
  }'`,x=String.raw`{
  "id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "task_id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "object": "video",
  "model": "grok-image-video",
  "status": "queued",
  "progress": 0,
  "created_at": 1780000000
}`,S=String.raw`{
  "code": "success",
  "message": "",
  "data": {
    "task_id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "status": "IN_PROGRESS",
    "progress": "30%",
    "result_url": "",
    "fail_reason": ""
  }
}`,C=String.raw`{
  "code": "success",
  "message": "",
  "data": {
    "task_id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "status": "SUCCESS",
    "progress": "100%",
    "result_url": "https://example.com/generated-video.mp4",
    "fail_reason": ""
  }
}`,w=String.raw`{
  "code": "success",
  "message": "",
  "data": {
    "task_id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "status": "FAILURE",
    "progress": "100%",
    "result_url": "",
    "fail_reason": "Image URL could not be fetched: Fetching image failed with HTTP status 400 Bad Request."
  }
}`,T=String.raw`const BASE_URL = 'https://img.gpt88.cc'
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
}`;function E(){let{locale:e}=n(),E=c({locale:e,surface:`api_grok_video_auth`,intent:`image_api`,destination:`keys`});return(0,d.jsxs)(o,{path:`/docs/api/grok-video/`,title:`Grok Video API 接入文档`,description:`Grok 视频生成 API 的完整接入说明，包括模型列表、创建任务、轮询查询、图生视频参数、错误排查和 JavaScript 示例。`,headings:[{id:`intro`,text:`基础信息`,level:2},{id:`key`,text:`获取 API Key`,level:2},{id:`models`,text:`查询可用模型`,level:2},{id:`create`,text:`创建视频任务`,level:2},{id:`params`,text:`参数建议`,level:2},{id:`examples`,text:`请求示例`,level:2},{id:`create-response`,text:`创建响应`,level:2},{id:`status`,text:`查询任务状态`,level:2},{id:`js`,text:`JavaScript 示例`,level:2},{id:`errors`,text:`常见错误`,level:2},{id:`notes`,text:`接入注意事项`,level:2}],children:[(0,d.jsxs)(u,{tone:`info`,title:`适合把视频生成接到自己的后端或工作流`,children:[(0,d.jsxs)(`p`,{children:[`这是一份面向 API 用户的接入文档，目标是让你完成三件事：先查模型，再提交视频任务，最后轮询拿到`,(0,d.jsx)(`code`,{children:`result_url`}),`。`]}),(0,d.jsxs)(`p`,{className:`mt-2`,children:[`如果你是从中转站或代理层接入，测试时请把你的请求地址、站内 Key 和本页示例统一替换后，再交给`,(0,d.jsx)(`code`,{children:`Codex`}),`、`,(0,d.jsx)(`code`,{children:`Claude`}),` 或你的后端做真实连通性测试。`]})]}),(0,d.jsx)(`h2`,{id:`intro`,children:`基础信息`}),(0,d.jsx)(l,{method:`GET`,path:`https://img.gpt88.cc/v1/models`}),(0,d.jsx)(l,{method:`POST`,path:`https://img.gpt88.cc/v1/video/generations`}),(0,d.jsx)(l,{method:`GET`,path:`https://img.gpt88.cc/v1/video/generations/{task_id}`}),(0,d.jsx)(a,{rows:[{name:`Base URL`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`code`,{children:`https://img.gpt88.cc`}),`。`]})},{name:`鉴权方式`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`code`,{children:`Authorization: Bearer <YOUR_API_KEY>`}),`。`]})},{name:`请求格式`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`code`,{children:`application/json`}),`。`]})},{name:`响应格式`,type:`string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`JSON。`})},{name:`任务类型`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`异步任务。创建成功后先返回 `,(0,d.jsx)(`code`,{children:`task_id`}),`，再轮询查询。`]})}]}),(0,d.jsx)(u,{tone:`warn`,title:`异步任务要保存 task_id`,children:(0,d.jsxs)(`p`,{children:[`创建视频任务不会立即返回最终视频地址。你需要把 `,(0,d.jsx)(`code`,{children:`task_id`}),` 保存起来，再调用查询接口直到`,(0,d.jsx)(`code`,{children:`SUCCESS`}),` 或 `,(0,d.jsx)(`code`,{children:`FAILURE`}),`。`]})}),(0,d.jsx)(`h2`,{id:`key`,children:`获取 API Key`}),(0,d.jsxs)(`p`,{children:[`请在 `,(0,d.jsx)(`a`,{href:E,target:`_blank`,rel:`noreferrer`,children:`Agent API Keys`}),` `,`创建或复制 API Key。调用时放入请求头：`]}),(0,d.jsx)(i,{lang:`bash`,filename:`auth-header`,code:`Authorization: Bearer <YOUR_API_KEY>`}),(0,d.jsx)(`p`,{children:`不要把 API Key 写进前端页面、移动端安装包或公开仓库。推荐只在你的后端服务里转发请求。`}),(0,d.jsx)(`h2`,{id:`models`,children:`查询可用模型`}),(0,d.jsx)(i,{lang:`bash`,filename:`list-models.sh`,code:g}),(0,d.jsx)(a,{rows:f}),(0,d.jsxs)(u,{tone:`info`,title:`当前文档覆盖的模型`,children:[(0,d.jsxs)(`ul`,{className:`mt-2 space-y-1`,children:[(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`grok-image-video`}),`：通用默认模型，支持文生视频、单参考图、多参考图。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`grok-video-1.5`}),`：单参考图预览模型，只支持 1 张参考图。`]})]}),(0,d.jsxs)(`p`,{className:`mt-2`,children:[`如果后续开放更多模型，请优先以 `,(0,d.jsx)(t,{to:r(`/docs/api/list-models/`,e),children:`GET /v1/models`}),` 的实时返回为准。`]})]}),(0,d.jsx)(`h2`,{id:`create`,children:`创建视频任务`}),(0,d.jsx)(`p`,{children:`接口：`}),(0,d.jsx)(l,{method:`POST`,path:`https://img.gpt88.cc/v1/video/generations`}),(0,d.jsx)(a,{rows:p}),(0,d.jsxs)(u,{tone:`info`,title:`字段兼容规则`,children:[(0,d.jsxs)(`p`,{children:[`统一建议优先使用 `,(0,d.jsx)(`code`,{children:`image_urls`}),`。为了兼容不同 SDK 和上游接入方式，服务端也支持`,(0,d.jsx)(`code`,{children:`images`}),`、`,(0,d.jsx)(`code`,{children:`input_reference`}),` 和 `,(0,d.jsx)(`code`,{children:`reference_images`}),` 这些字段。`]}),(0,d.jsx)(`p`,{className:`mt-2`,children:`但这些字段不要同时混用。对于同一个请求，二选一即可，避免上游把图片解析成重复输入。`})]}),(0,d.jsx)(`h2`,{id:`params`,children:`参数建议`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`seconds`}),`：`,(0,d.jsx)(`code`,{children:`grok-image-video`}),` 的文生视频和单图生视频建议使用 `,(0,d.jsx)(`code`,{children:`4`}),`、`,(0,d.jsx)(`code`,{children:`6`}),`、`,(0,d.jsx)(`code`,{children:`8`}),`、`,(0,d.jsx)(`code`,{children:`10`}),`、`,(0,d.jsx)(`code`,{children:`12`}),`、`,(0,d.jsx)(`code`,{children:`15`}),`；多参考图建议使用 `,(0,d.jsx)(`code`,{children:`4`}),`、`,(0,d.jsx)(`code`,{children:`6`}),`、`,(0,d.jsx)(`code`,{children:`8`}),`、`,(0,d.jsx)(`code`,{children:`10`}),`。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`时长规则`}),`：`,(0,d.jsx)(`code`,{children:`grok-image-video`}),` 文生视频和单图生视频最长支持 `,(0,d.jsx)(`code`,{children:`15s`}),`；多参考图最长支持 `,(0,d.jsx)(`code`,{children:`10s`}),`，超过会自动按 `,(0,d.jsx)(`code`,{children:`10s`}),` 处理。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`aspect_ratio`}),`：`,(0,d.jsx)(`code`,{children:`grok-image-video`}),` 推荐 `,(0,d.jsx)(`code`,{children:`1:1`}),`、`,(0,d.jsx)(`code`,{children:`16:9`}),`、`,(0,d.jsx)(`code`,{children:`9:16`}),`、`,(0,d.jsx)(`code`,{children:`4:3`}),`、`,(0,d.jsx)(`code`,{children:`3:4`}),`、`,(0,d.jsx)(`code`,{children:`3:2`}),`、`,(0,d.jsx)(`code`,{children:`2:3`}),`；`,(0,d.jsx)(`code`,{children:`grok-video-1.5`}),` 仅建议 `,(0,d.jsx)(`code`,{children:`16:9`}),` 或 `,(0,d.jsx)(`code`,{children:`9:16`}),`。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`resolution`}),`：常用 `,(0,d.jsx)(`code`,{children:`720p`}),` 和 `,(0,d.jsx)(`code`,{children:`480p`}),`。如果你做批量素材，可优先低分辨率；如果要封面或主视觉，优先高分辨率。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`图片要求`}),`：参考图最好使用公网可直接访问的 HTTPS 直链，或者完整的 base64 data URL。`]})]}),(0,d.jsx)(s,{tabs:[{label:`cURL`,lang:`bash`,code:_},{label:`说明`,lang:`text`,code:`model: grok-image-video
prompt: 视频提示词
seconds: 秒数
aspect_ratio: 画幅比例
resolution: 清晰度`}]}),(0,d.jsx)(`h2`,{id:`examples`,children:`请求示例`}),(0,d.jsx)(`h3`,{children:`6.1 文生视频`}),(0,d.jsx)(i,{lang:`bash`,filename:`text-to-video.sh`,code:_}),(0,d.jsx)(`h3`,{children:`6.2 单参考图生视频`}),(0,d.jsx)(i,{lang:`bash`,filename:`single-reference-image.sh`,code:v}),(0,d.jsxs)(`p`,{children:[`单参考图场景下，你也可以使用 `,(0,d.jsx)(`code`,{children:`input_reference`}),`，例如：`]}),(0,d.jsx)(i,{lang:`json`,filename:`single-reference-image.json`,code:String.raw`{
  "model": "grok-image-video",
  "prompt": "Animate the product with a slow rotating camera",
  "seconds": 6,
  "aspect_ratio": "9:16",
  "resolution": "720p",
  "input_reference": {
    "image_url": "https://example.com/product.png"
  }
}`}),(0,d.jsx)(`h3`,{children:`6.3 多参考图生视频`}),(0,d.jsx)(i,{lang:`bash`,filename:`multi-reference-image.sh`,code:y}),(0,d.jsxs)(`p`,{children:[`多参考图时，请不要同时传 `,(0,d.jsx)(`code`,{children:`input_reference`}),` 和 `,(0,d.jsx)(`code`,{children:`reference_images`}),`。 如果你要控制单个商品在多个角度之间切换，建议先整理好图片顺序，再提交任务。`]}),(0,d.jsx)(`h3`,{children:`6.4 grok-video-1.5 单图生视频`}),(0,d.jsx)(i,{lang:`bash`,filename:`grok-video-1.5.sh`,code:b}),(0,d.jsx)(u,{tone:`warn`,title:`grok-video-1.5 的约束`,children:(0,d.jsxs)(`p`,{children:[`这个模型当前只支持 `,(0,d.jsx)(`strong`,{children:`1 张参考图`}),`，最长支持 `,(0,d.jsx)(`strong`,{children:`15 秒`}),`。 不要用它提交纯文生视频，也不要传多张参考图。`]})}),(0,d.jsx)(`h2`,{id:`create-response`,children:`创建响应`}),(0,d.jsxs)(`p`,{children:[`创建成功后会返回任务对象。关键字段是 `,(0,d.jsx)(`code`,{children:`id`}),` 或 `,(0,d.jsx)(`code`,{children:`task_id`}),`：`]}),(0,d.jsx)(i,{lang:`json`,filename:`create-response.json`,code:x}),(0,d.jsx)(a,{rows:m}),(0,d.jsxs)(`p`,{children:[`客户端建议统一保存：`,(0,d.jsx)(`code`,{className:`ml-1`,children:`task_id = response.task_id || response.id`})]}),(0,d.jsx)(`h2`,{id:`status`,children:`查询任务状态`}),(0,d.jsx)(i,{lang:`bash`,filename:`poll-task.sh`,code:String.raw`curl -X GET "https://img.gpt88.cc/v1/video/generations/task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -H "Authorization: Bearer <YOUR_API_KEY>"`}),(0,d.jsx)(`p`,{children:`典型处理中响应：`}),(0,d.jsx)(i,{lang:`json`,filename:`poll-progress.json`,code:S}),(0,d.jsx)(`p`,{children:`典型成功响应：`}),(0,d.jsx)(i,{lang:`json`,filename:`poll-success.json`,code:C}),(0,d.jsx)(`p`,{children:`典型失败响应：`}),(0,d.jsx)(i,{lang:`json`,filename:`poll-failure.json`,code:w}),(0,d.jsx)(a,{rows:h}),(0,d.jsxs)(`ul`,{children:[(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`data.status == "SUCCESS"`}),` 且 `,(0,d.jsx)(`code`,{children:`data.result_url`}),` 非空，表示成功。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`data.status == "FAILURE"`}),`，读取 `,(0,d.jsx)(`code`,{children:`data.fail_reason`}),` 展示给用户。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`data.status`}),` 为 `,(0,d.jsx)(`code`,{children:`SUBMITTED`}),`、`,(0,d.jsx)(`code`,{children:`QUEUED`}),`、`,(0,d.jsx)(`code`,{children:`IN_PROGRESS`}),`、`,(0,d.jsx)(`code`,{children:`NOT_START`}),` 时，任务还在处理中。`]})]}),(0,d.jsx)(u,{tone:`warn`,title:`progress 100% 不等于成功`,children:(0,d.jsxs)(`p`,{children:[(0,d.jsx)(`code`,{children:`progress: "100%"`}),` 只表示流程已经结束，不代表一定成功。是否成功必须看`,(0,d.jsx)(`code`,{children:`data.status`}),`。`]})}),(0,d.jsx)(u,{tone:`info`,title:`轮询建议`,children:(0,d.jsxs)(`ul`,{className:`mt-2 space-y-1`,children:[(0,d.jsx)(`li`,{children:`轮询间隔：每 5 秒一次。`}),(0,d.jsx)(`li`,{children:`最大轮询时长：5 分钟。`}),(0,d.jsx)(`li`,{children:`最大轮询次数：60 次。`}),(0,d.jsxs)(`li`,{children:[`成功后尽快下载 `,(0,d.jsx)(`code`,{children:`data.result_url`}),`，因为这个直链大约 1 小时后失效。`]})]})}),(0,d.jsx)(`h2`,{id:`js`,children:`JavaScript 示例`}),(0,d.jsx)(i,{lang:`typescript`,filename:`grok-video.ts`,code:T}),(0,d.jsx)(`h2`,{id:`errors`,children:`常见错误`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`401`}),`：API Key 缺失或错误，检查 `,(0,d.jsx)(`code`,{children:`Authorization: Bearer <YOUR_API_KEY>`}),`。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`403`}),`：权限、额度或分组限制，检查账号余额、令牌权限和可用模型。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`400 prompt is required`}),`：`,(0,d.jsx)(`code`,{children:`prompt`}),` 为空。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`400 model field is required`}),`：`,(0,d.jsx)(`code`,{children:`model`}),` 为空或模型 ID 写错。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`400 only supports exactly one reference image`}),`：`,(0,d.jsx)(`code`,{children:`grok-video-1.5`}),` 没有传图或传了多张图。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`图片抓取失败`}),`：图片 URL 无法被服务端访问，换成真实直链或 base64。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`任务 FAILURE`}),`：上游生成失败、图片不可访问或参数不支持，读取 `,(0,d.jsx)(`code`,{children:`data.fail_reason`}),`。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`轮询超时`}),`：保留 `,(0,d.jsx)(`code`,{children:`task_id`}),`，稍后继续查询。`]})]}),(0,d.jsx)(`h2`,{id:`notes`,children:`接入注意事项`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsxs)(`li`,{children:[`不要把模型 ID 写死成单个模型，建议通过 `,(0,d.jsx)(t,{to:r(`/docs/api/list-models/`,e),children:`GET /v1/models`}),` 动态读取。`]}),(0,d.jsxs)(`li`,{children:[`默认推荐使用 `,(0,d.jsx)(`code`,{children:`grok-image-video`}),`。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`grok-video-1.5`}),` 当前仅用于单参考图生视频。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`grok-image-video`}),` 文生视频和单图生视频最长 15 秒，多参考图最长 10 秒。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`grok-image-video`}),` 多参考图最多 7 张；多参考图请求超过 10 秒会自动按 10 秒处理。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`grok-video-1.5`}),` 只支持单图生视频，最长 15 秒。`]}),(0,d.jsxs)(`li`,{children:[`最终视频 URL 在查询接口的 `,(0,d.jsx)(`code`,{children:`data.result_url`}),` 字段中，建议在生成成功后立即下载。`]}),(0,d.jsxs)(`li`,{children:[`任务失败时可能会出现 `,(0,d.jsx)(`code`,{children:`progress: "100%"`}),`，这是正常结束状态，请以 `,(0,d.jsx)(`code`,{children:`data.status`}),` 判断结果。`]})]})]})}export{E as default};