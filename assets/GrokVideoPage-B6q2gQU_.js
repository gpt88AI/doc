import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n,s as r}from"./Seo-zhKV3POX.js";import{t as i}from"./CodeBlock-D8kfQ6fq.js";import{a,c as o,i as s,l as c,o as l,s as u}from"./index-DCJmtdkW.js";var d=e(),f=[{name:`id`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`模型 ID，例如 `,(0,d.jsx)(`code`,{children:`grok-image-video`}),`。`]})},{name:`object`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`固定为 `,(0,d.jsx)(`code`,{children:`"model"`}),`。`]})},{name:`created`,type:`integer`,description:(0,d.jsx)(d.Fragment,{children:`模型上架时间戳，Unix 秒。`})},{name:`owned_by`,type:`string`,description:(0,d.jsxs)(d.Fragment,{children:[`模型归属 provider，例如 `,(0,d.jsx)(`code`,{children:`xai`}),`。`]})},{name:`capabilities`,type:`string[]`,description:(0,d.jsxs)(d.Fragment,{children:[`支持能力，例如 `,(0,d.jsx)(`code`,{children:`video`}),` / `,(0,d.jsx)(`code`,{children:`image`}),` / `,(0,d.jsx)(`code`,{children:`streaming`}),`。`]})},{name:`modalities`,type:`string[]`,description:(0,d.jsxs)(d.Fragment,{children:[`支持模态，例如 `,(0,d.jsx)(`code`,{children:`video`}),`、`,(0,d.jsx)(`code`,{children:`image`}),`。`]})}],p=[{name:`model`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`模型 ID，例如 `,(0,d.jsx)(`code`,{children:`grok-image-video`}),` 或 `,(0,d.jsx)(`code`,{children:`grok-video-1.5`}),`。`]})},{name:`prompt`,type:`string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`视频提示词。`})},{name:`seconds`,type:`integer`,description:(0,d.jsxs)(d.Fragment,{children:[`视频秒数，默认建议 `,(0,d.jsx)(`code`,{children:`4`}),`。`]})},{name:`aspect_ratio`,type:`string`,description:(0,d.jsxs)(d.Fragment,{children:[`画幅比例，默认建议 `,(0,d.jsx)(`code`,{children:`16:9`}),`。`]})},{name:`resolution`,type:`string`,description:(0,d.jsxs)(d.Fragment,{children:[`清晰度，建议 `,(0,d.jsx)(`code`,{children:`720p`}),` 或 `,(0,d.jsx)(`code`,{children:`480p`}),`。`]})},{name:`image_urls`,type:`array<string>`,description:(0,d.jsx)(d.Fragment,{children:`参考图 URL 或 base64 data URL 列表。`})},{name:`images`,type:`array<string>`,description:(0,d.jsxs)(d.Fragment,{children:[`兼容字段，含义与 `,(0,d.jsx)(`code`,{children:`image_urls`}),` 相同。不要和 `,(0,d.jsx)(`code`,{children:`image_urls`}),` 同时传。`]})},{name:`input_reference`,type:`object | string`,description:(0,d.jsxs)(d.Fragment,{children:[`单参考图字段，可传 `,(0,d.jsx)(`code`,{children:`{ "image_url": "..." }`}),`。`]})},{name:`reference_images`,type:`array<string>`,description:(0,d.jsxs)(d.Fragment,{children:[`多参考图字段。不要和 `,(0,d.jsx)(`code`,{children:`input_reference`}),` 同时传。`]})}],m=[{name:`id`,type:`string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`任务唯一 ID。`})},{name:`request_id`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`上游请求 ID。兼容字段；优先保存 `,(0,d.jsx)(`code`,{children:`id`}),` 作为 OpenAI 兼容接口的查询 ID。`]})},{name:`task_id`,type:`string`,description:(0,d.jsx)(d.Fragment,{children:`旧版任务接口可能返回的任务 ID；新格式不一定在顶层返回。`})},{name:`object`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`固定为 `,(0,d.jsx)(`code`,{children:`"video"`}),`。`]})},{name:`model`,type:`string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`实际使用的模型 ID。`})},{name:`status`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`任务状态，例如 `,(0,d.jsx)(`code`,{children:`queued`}),`。`]})},{name:`progress`,type:`integer | string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`任务进度，常见为百分比字符串。`})},{name:`created_at`,type:`integer`,description:(0,d.jsx)(d.Fragment,{children:`创建时间戳，Unix 秒。`})}],h=[{name:`id`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`OpenAI 兼容的视频 ID，例如 `,(0,d.jsx)(`code`,{children:`video_gpt88_v1_...`}),`。用于继续查询和下载。`]})},{name:`request_id`,type:`string`,description:(0,d.jsx)(d.Fragment,{children:`上游原始请求 ID。通常不需要自行拼接到 OpenAI 兼容接口中。`})},{name:`object`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`固定为 `,(0,d.jsx)(`code`,{children:`"video"`}),`。`]})},{name:`model`,type:`string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`实际使用的模型 ID。`})},{name:`status`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`状态为 `,(0,d.jsx)(`code`,{children:`completed`}),` 时表示可获取成品；失败通常为 `,(0,d.jsx)(`code`,{children:`failed`}),`。`]})},{name:`progress`,type:`integer`,description:(0,d.jsxs)(d.Fragment,{children:[`进度百分比，例如 `,(0,d.jsx)(`code`,{children:`100`}),`。`]})},{name:`url`,type:`string`,description:(0,d.jsx)(d.Fragment,{children:`视频内容路径或完整 URL。可能是相对路径。`})},{name:`video_url`,type:`string`,description:(0,d.jsxs)(d.Fragment,{children:[`视频内容路径或完整 URL，与 `,(0,d.jsx)(`code`,{children:`url`}),` 类似。`]})},{name:`video.url`,type:`string`,description:(0,d.jsx)(d.Fragment,{children:`嵌套视频对象中的内容路径。`})},{name:`video.duration`,type:`number`,description:(0,d.jsx)(d.Fragment,{children:`视频时长，单位秒。`})}],g=[{name:`code`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`通常为 `,(0,d.jsx)(`code`,{children:`success`}),`。`]})},{name:`message`,type:`string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`接口消息。`})},{name:`data.task_id`,type:`string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`任务 ID。`})},{name:`data.status`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`任务状态：`,(0,d.jsx)(`code`,{children:`SUBMITTED`}),` / `,(0,d.jsx)(`code`,{children:`QUEUED`}),` / `,(0,d.jsx)(`code`,{children:`IN_PROGRESS`}),` / `,(0,d.jsx)(`code`,{children:`NOT_START`}),` / `,(0,d.jsx)(`code`,{children:`SUCCESS`}),` / `,(0,d.jsx)(`code`,{children:`FAILURE`}),`。`]})},{name:`data.progress`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`进度字符串，例如 `,(0,d.jsx)(`code`,{children:`30%`}),` 或 `,(0,d.jsx)(`code`,{children:`100%`}),`。`]})},{name:`data.result_url`,type:`string`,description:(0,d.jsx)(d.Fragment,{children:`成功后的临时视频直链。`})},{name:`data.fail_reason`,type:`string`,description:(0,d.jsx)(d.Fragment,{children:`失败原因。`})}],_=String.raw`curl -X GET "https://img.gpt88.cc/v1/models" \
  -H "Authorization: Bearer <YOUR_API_KEY>"`,v=String.raw`curl -X POST "https://img.gpt88.cc/v1/videos/generations" \
  -H "Authorization: Bearer <YOUR_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "grok-image-video",
    "prompt": "A cinematic shot of a red sports car driving through rainy neon streets at night",
    "seconds": 6,
    "aspect_ratio": "16:9",
    "resolution": "720p"
  }'`,y=String.raw`curl -X POST "https://img.gpt88.cc/v1/videos/generations" \
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
  }'`,b=String.raw`curl -X POST "https://img.gpt88.cc/v1/videos/generations" \
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
  }'`,x=String.raw`curl -X POST "https://img.gpt88.cc/v1/videos/generations" \
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
  }'`,S=String.raw`{
  "id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "task_id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "object": "video",
  "model": "grok-image-video",
  "status": "queued",
  "progress": 0,
  "created_at": 1780000000
}`,C=String.raw`{
  "code": "success",
  "message": "",
  "data": {
    "task_id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "status": "IN_PROGRESS",
    "progress": "30%",
    "result_url": "",
    "fail_reason": ""
  }
}`,w=String.raw`{
  "code": "success",
  "message": "",
  "data": {
    "task_id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "status": "SUCCESS",
    "progress": "100%",
    "result_url": "https://example.com/generated-video.mp4",
    "fail_reason": ""
  }
}`,T=String.raw`{
  "code": "success",
  "message": "",
  "data": {
    "task_id": "task_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "status": "FAILURE",
    "progress": "100%",
    "result_url": "",
    "fail_reason": "Image URL could not be fetched: Fetching image failed with HTTP status 400 Bad Request."
  }
}`,E=String.raw`{
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
}`,D=String.raw`curl --fail-with-body --max-redirs 0 \
  "https://img.gpt88.cc/v1/videos/video_gpt88_v1_dmlkZW9fYmY2OTEwODkwYmEwNGRjNThiODI4NWMzMTMzN2QwMTI" \
  -H "Authorization: Bearer $GPT88_API_KEY"`,O=String.raw`curl --fail-with-body --max-redirs 0 \
  "https://img.gpt88.cc/v1/videos/video_gpt88_v1_dmlkZW9fYmY2OTEwODkwYmEwNGRjNThiODI4NWMzMTMzN2QwMTI/content" \
  -H "Authorization: Bearer $GPT88_API_KEY" \
  -o generated-video.mp4`,k=String.raw`import os
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
print("saved generated-video.mp4")`,A=String.raw`import { writeFile } from "node:fs/promises";

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
console.log("saved generated-video.mp4");`,j={zh:{title:`Grok Video API 接入文档`,description:`Grok 视频生成 API 的完整接入说明，包括模型列表、创建任务、状态查询、视频内容下载保存、图生视频参数、错误排查和 JavaScript 示例。`,introTitle:`适合把视频生成接到自己的后端或工作流`,intro:`这是一份面向 API 用户的接入文档，目标是让你完成四件事：先查模型，再提交视频任务，查询最终状态，最后获取并保存视频文件。`,introProxy:`如果你是从中转站或代理层接入，测试时请把你的请求地址、站内 Key 和本页示例统一替换后，再交给`,headings:[`基础信息`,`获取 API Key`,`查询可用模型`,`创建视频任务`,`参数建议`,`请求示例`,`创建响应`,`查询任务状态`,`查询内容并保存视频`,`JavaScript 示例`,`常见错误`,`接入注意事项`]},hi:{title:`Grok Video API integration guide`,description:`Grok video generation API के लिए models, task creation, status polling, content download, image-to-video parameters और JavaScript examples।`,introTitle:`वीडियो generation को अपने backend या workflow से जोड़ें`,intro:`यह API users के लिए integration guide है: model देखें, task submit करें, अंतिम status जाँचें और video file save करें।`,introProxy:`यदि आप proxy layer से जुड़ रहे हैं, तो testing में request URL, site key और examples को अपने setup से बदलकर`,headings:[`Basic information`,`Get an API key`,`List available models`,`Create a video task`,`Parameter guidance`,`Request examples`,`Create response`,`Check task status`,`Fetch and save video content`,`JavaScript example`,`Common errors`,`Integration notes`]},bn:{title:`Grok Video API integration guide`,description:`Grok video generation API-এর model, task creation, status polling, content download, image-to-video parameter এবং JavaScript example।`,introTitle:`ভিডিও generation নিজের backend বা workflow-এ যুক্ত করুন`,intro:`এই API guide-এ model দেখুন, video task জমা দিন, final status যাচাই করুন এবং video file সংরক্ষণ করুন।`,introProxy:`আপনি proxy layer ব্যবহার করলে testing-এর সময় request URL, site key এবং example নিজের setup অনুযায়ী বদলে`,headings:[`মৌলিক তথ্য`,`API key নিন`,`উপলব্ধ model দেখুন`,`Video task তৈরি করুন`,`Parameter পরামর্শ`,`Request example`,`Create response`,`Task status দেখুন`,`Video content নিয়ে সংরক্ষণ করুন`,`JavaScript example`,`সাধারণ error`,`Integration নোট`]},ur:{title:`Grok Video API integration guide`,description:`Grok video generation API کے models، task creation، status polling، content download، image-to-video parameters اور JavaScript examples۔`,introTitle:`ویڈیو generation کو اپنے backend یا workflow سے جوڑیں`,intro:`یہ API guide model دیکھنے، video task submit کرنے، final status جانچنے اور video file محفوظ کرنے کے مراحل بتاتی ہے۔`,introProxy:`اگر آپ proxy layer استعمال کر رہے ہیں تو testing میں request URL، site key اور examples کو اپنے setup کے مطابق بدل کر`,headings:[`بنیادی معلومات`,`API key حاصل کریں`,`دستیاب models دیکھیں`,`Video task بنائیں`,`Parameters کی رہنمائی`,`Request examples`,`Create response`,`Task status دیکھیں`,`Video content حاصل کر کے محفوظ کریں`,`JavaScript example`,`عام errors`,`Integration نوٹس`]},ta:{title:`Grok Video API integration guide`,description:`Grok video generation API-க்கான models, task creation, status polling, content download, image-to-video parameters மற்றும் JavaScript examples.`,introTitle:`Video generation-ஐ உங்கள் backend அல்லது workflow-உடன் இணைக்கவும்`,intro:`இந்த API guide model-ஐப் பார்ப்பது, video task அனுப்புவது, final status சரிபார்ப்பது மற்றும் video file-ஐ சேமிப்பது ஆகியவற்றைக் காட்டுகிறது.`,introProxy:`Proxy layer மூலம் இணைந்தால் testing நேரத்தில் request URL, site key மற்றும் examples-ஐ உங்கள் setup-க்கு மாற்றி`,headings:[`அடிப்படை தகவல்`,`API key பெறுதல்`,`கிடைக்கும் models`,`Video task உருவாக்குதல்`,`Parameter வழிகாட்டி`,`Request examples`,`Create response`,`Task status பார்க்கவும்`,`Video content-ஐப் பெற்று சேமிக்கவும்`,`JavaScript example`,`பொதுவான errors`,`Integration குறிப்புகள்`]},ne:{title:`Grok Video API integration guide`,description:`Grok video generation API का model, task creation, status polling, content download, image-to-video parameter र JavaScript example।`,introTitle:`Video generation लाई आफ्नो backend वा workflow मा जोड्नुहोस्`,intro:`यो API guide ले model हेर्ने, video task पठाउने, final status जाँच्ने र video file बचत गर्ने तरिका बताउँछ।`,introProxy:`Proxy layer बाट जोडिँदा testing मा request URL, site key र examples लाई आफ्नो setup अनुसार बदलेर`,headings:[`आधारभूत जानकारी`,`API key लिनुहोस्`,`उपलब्ध model हेर्नुहोस्`,`Video task बनाउनुहोस्`,`Parameter सुझाव`,`Request example`,`Create response`,`Task status जाँच्नुहोस्`,`Video content लिएर बचत गर्नुहोस्`,`JavaScript example`,`सामान्य error`,`Integration नोट`]},si:{title:`Grok Video API integration guide`,description:`Grok video generation API සඳහා models, task creation, status polling, content download, image-to-video parameters සහ JavaScript examples.`,introTitle:`Video generation ඔබේ backend හෝ workflow එකට සම්බන්ධ කරන්න`,intro:`මෙම API guide එකෙන් model බලන, video task යවන, අවසාන status පරීක්ෂා කරන සහ video file සුරැකීමේ පියවර දක්වයි.`,introProxy:`Proxy layer එකක් භාවිත කරන්නේ නම් testing අවස්ථාවේ request URL, site key සහ examples ඔබේ setup එකට වෙනස් කර`,headings:[`මූලික තොරතුරු`,`API key ලබාගන්න`,`ලබාගත හැකි models`,`Video task සාදන්න`,`Parameter මාර්ගෝපදේශය`,`Request examples`,`Create response`,`Task status බලන්න`,`Video content ලබාගෙන සුරකින්න`,`JavaScript example`,`පොදු errors`,`Integration සටහන්`]}},M=String.raw`const BASE_URL = 'https://img.gpt88.cc'
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
}`;function N(){let{locale:e}=n(),N=j[e]??j.zh,P=u({locale:e,surface:`api_grok_video_auth`,intent:`image_api`,destination:`keys`});return(0,d.jsxs)(c,{path:`/docs/api/grok-video/`,title:N.title,description:N.description,headings:[...[`intro`,`key`,`models`,`create`,`params`,`examples`,`create-response`,`status`,`content`,`js`,`errors`,`notes`].map((e,t)=>({id:e,text:N.headings[t],level:2}))],children:[(0,d.jsxs)(o,{tone:`info`,title:N.introTitle,children:[(0,d.jsx)(`p`,{children:N.intro}),(0,d.jsxs)(`p`,{className:`mt-2`,children:[N.introProxy,(0,d.jsx)(`code`,{children:`Codex`}),`、`,(0,d.jsx)(`code`,{children:`Claude`}),` 或你的后端做真实连通性测试。`]})]}),(0,d.jsx)(`h2`,{id:`intro`,children:`基础信息`}),(0,d.jsx)(s,{method:`GET`,path:`https://img.gpt88.cc/v1/models`}),(0,d.jsx)(s,{method:`POST`,path:`https://img.gpt88.cc/v1/videos/generations`}),(0,d.jsx)(s,{method:`GET`,path:`https://img.gpt88.cc/v1/videos/{id}`}),(0,d.jsx)(s,{method:`GET`,path:`https://img.gpt88.cc/v1/videos/{id}/content`}),(0,d.jsx)(l,{rows:[{name:`Base URL`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`code`,{children:`https://img.gpt88.cc`}),`。`]})},{name:`鉴权方式`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`code`,{children:`Authorization: Bearer <YOUR_API_KEY>`}),`。`]})},{name:`请求格式`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`code`,{children:`application/json`}),`。`]})},{name:`响应格式`,type:`string`,required:!0,description:(0,d.jsx)(d.Fragment,{children:`JSON。`})},{name:`任务类型`,type:`string`,required:!0,description:(0,d.jsxs)(d.Fragment,{children:[`异步任务。创建成功后先返回 `,(0,d.jsx)(`code`,{children:`task_id`}),`，再轮询查询。`]})}]}),(0,d.jsx)(o,{tone:`warn`,title:`异步任务要保存 task_id`,children:(0,d.jsxs)(`p`,{children:[`创建视频任务不会立即返回最终视频地址。你需要保存响应中的 `,(0,d.jsx)(`code`,{children:`id`}),`（或旧格式中的`,(0,d.jsx)(`code`,{children:`task_id`}),`），再查询视频状态直到 `,(0,d.jsx)(`code`,{children:`completed`}),` 或失败状态。`]})}),(0,d.jsx)(`h2`,{id:`key`,children:`获取 API Key`}),(0,d.jsxs)(`p`,{children:[`请在 `,(0,d.jsx)(`a`,{href:P,target:`_blank`,rel:`noreferrer`,children:`Agent API Keys`}),` `,`创建或复制 API Key。调用时放入请求头：`]}),(0,d.jsx)(i,{lang:`bash`,filename:`auth-header`,code:`Authorization: Bearer <YOUR_API_KEY>`}),(0,d.jsx)(`p`,{children:`不要把 API Key 写进前端页面、移动端安装包或公开仓库。推荐只在你的后端服务里转发请求。`}),(0,d.jsx)(`h2`,{id:`models`,children:`查询可用模型`}),(0,d.jsx)(i,{lang:`bash`,filename:`list-models.sh`,code:_}),(0,d.jsx)(l,{rows:f}),(0,d.jsxs)(o,{tone:`info`,title:`当前文档覆盖的模型`,children:[(0,d.jsxs)(`ul`,{className:`mt-2 space-y-1`,children:[(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`grok-image-video`}),`：通用默认模型，支持文生视频、单参考图、多参考图。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`grok-video-1.5`}),`：单参考图预览模型，只支持 1 张参考图。`]})]}),(0,d.jsxs)(`p`,{className:`mt-2`,children:[`如果后续开放更多模型，请优先以 `,(0,d.jsx)(t,{to:r(`/docs/api/list-models/`,e),children:`GET /v1/models`}),` 的实时返回为准。`]})]}),(0,d.jsx)(`h2`,{id:`create`,children:`创建视频任务`}),(0,d.jsx)(`p`,{children:`接口：`}),(0,d.jsx)(s,{method:`POST`,path:`https://img.gpt88.cc/v1/videos/generations`}),(0,d.jsx)(l,{rows:p}),(0,d.jsxs)(o,{tone:`info`,title:`字段兼容规则`,children:[(0,d.jsxs)(`p`,{children:[`统一建议优先使用 `,(0,d.jsx)(`code`,{children:`image_urls`}),`。为了兼容不同 SDK 和上游接入方式，服务端也支持`,(0,d.jsx)(`code`,{children:`images`}),`、`,(0,d.jsx)(`code`,{children:`input_reference`}),` 和 `,(0,d.jsx)(`code`,{children:`reference_images`}),` 这些字段。`]}),(0,d.jsx)(`p`,{className:`mt-2`,children:`但这些字段不要同时混用。对于同一个请求，二选一即可，避免上游把图片解析成重复输入。`})]}),(0,d.jsx)(`h2`,{id:`params`,children:`参数建议`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`seconds`}),`：`,(0,d.jsx)(`code`,{children:`grok-image-video`}),` 的文生视频和单图生视频建议使用 `,(0,d.jsx)(`code`,{children:`4`}),`、`,(0,d.jsx)(`code`,{children:`6`}),`、`,(0,d.jsx)(`code`,{children:`8`}),`、`,(0,d.jsx)(`code`,{children:`10`}),`、`,(0,d.jsx)(`code`,{children:`12`}),`、`,(0,d.jsx)(`code`,{children:`15`}),`；多参考图建议使用 `,(0,d.jsx)(`code`,{children:`4`}),`、`,(0,d.jsx)(`code`,{children:`6`}),`、`,(0,d.jsx)(`code`,{children:`8`}),`、`,(0,d.jsx)(`code`,{children:`10`}),`。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`时长规则`}),`：`,(0,d.jsx)(`code`,{children:`grok-image-video`}),` 文生视频和单图生视频最长支持 `,(0,d.jsx)(`code`,{children:`15s`}),`；多参考图最长支持 `,(0,d.jsx)(`code`,{children:`10s`}),`，超过会自动按 `,(0,d.jsx)(`code`,{children:`10s`}),` 处理。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`aspect_ratio`}),`：`,(0,d.jsx)(`code`,{children:`grok-image-video`}),` 推荐 `,(0,d.jsx)(`code`,{children:`1:1`}),`、`,(0,d.jsx)(`code`,{children:`16:9`}),`、`,(0,d.jsx)(`code`,{children:`9:16`}),`、`,(0,d.jsx)(`code`,{children:`4:3`}),`、`,(0,d.jsx)(`code`,{children:`3:4`}),`、`,(0,d.jsx)(`code`,{children:`3:2`}),`、`,(0,d.jsx)(`code`,{children:`2:3`}),`；`,(0,d.jsx)(`code`,{children:`grok-video-1.5`}),` 仅建议 `,(0,d.jsx)(`code`,{children:`16:9`}),` 或 `,(0,d.jsx)(`code`,{children:`9:16`}),`。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`resolution`}),`：常用 `,(0,d.jsx)(`code`,{children:`720p`}),` 和 `,(0,d.jsx)(`code`,{children:`480p`}),`。如果你做批量素材，可优先低分辨率；如果要封面或主视觉，优先高分辨率。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`图片要求`}),`：参考图最好使用公网可直接访问的 HTTPS 直链，或者完整的 base64 data URL。`]})]}),(0,d.jsx)(a,{tabs:[{label:`cURL`,lang:`bash`,code:v},{label:`说明`,lang:`text`,code:`model: grok-image-video
prompt: 视频提示词
seconds: 秒数
aspect_ratio: 画幅比例
resolution: 清晰度`}]}),(0,d.jsx)(`h2`,{id:`examples`,children:`请求示例`}),(0,d.jsx)(`h3`,{children:`6.1 文生视频`}),(0,d.jsx)(i,{lang:`bash`,filename:`text-to-video.sh`,code:v}),(0,d.jsx)(`h3`,{children:`6.2 单参考图生视频`}),(0,d.jsx)(i,{lang:`bash`,filename:`single-reference-image.sh`,code:y}),(0,d.jsxs)(`p`,{children:[`单参考图场景下，你也可以使用 `,(0,d.jsx)(`code`,{children:`input_reference`}),`，例如：`]}),(0,d.jsx)(i,{lang:`json`,filename:`single-reference-image.json`,code:String.raw`{
  "model": "grok-image-video",
  "prompt": "Animate the product with a slow rotating camera",
  "seconds": 6,
  "aspect_ratio": "9:16",
  "resolution": "720p",
  "input_reference": {
    "image_url": "https://example.com/product.png"
  }
}`}),(0,d.jsx)(`h3`,{children:`6.3 多参考图生视频`}),(0,d.jsx)(i,{lang:`bash`,filename:`multi-reference-image.sh`,code:b}),(0,d.jsxs)(`p`,{children:[`多参考图时，请不要同时传 `,(0,d.jsx)(`code`,{children:`input_reference`}),` 和 `,(0,d.jsx)(`code`,{children:`reference_images`}),`。 如果你要控制单个商品在多个角度之间切换，建议先整理好图片顺序，再提交任务。`]}),(0,d.jsx)(`h3`,{children:`6.4 grok-video-1.5 单图生视频`}),(0,d.jsx)(i,{lang:`bash`,filename:`grok-video-1.5.sh`,code:x}),(0,d.jsx)(o,{tone:`warn`,title:`grok-video-1.5 的约束`,children:(0,d.jsxs)(`p`,{children:[`这个模型当前只支持 `,(0,d.jsx)(`strong`,{children:`1 张参考图`}),`，最长支持 `,(0,d.jsx)(`strong`,{children:`15 秒`}),`。 不要用它提交纯文生视频，也不要传多张参考图。`]})}),(0,d.jsx)(`h2`,{id:`create-response`,children:`创建响应`}),(0,d.jsxs)(`p`,{children:[`创建成功后会返回视频任务对象。关键字段是 `,(0,d.jsx)(`code`,{children:`id`}),`、`,(0,d.jsx)(`code`,{children:`request_id`}),` 和兼容旧格式的 `,(0,d.jsx)(`code`,{children:`task_id`}),`：`]}),(0,d.jsx)(i,{lang:`json`,filename:`create-response.json`,code:S}),(0,d.jsx)(l,{rows:m}),(0,d.jsxs)(`p`,{children:[`OpenAI 兼容响应优先保存：`,(0,d.jsx)(`code`,{className:`ml-1`,children:`video_id = response.id || response.request_id || response.task_id`})]}),(0,d.jsx)(`h2`,{id:`status`,children:`查询任务状态`}),(0,d.jsxs)(`p`,{children:[`推荐使用 OpenAI 兼容的视频资源路径，根据创建响应中的 `,(0,d.jsx)(`code`,{children:`id`}),` 查询。不要把响应里的相对路径直接当成完整 URL； 需要在前面拼接你的 Base URL。`]}),(0,d.jsx)(i,{lang:`bash`,filename:`poll-task.sh`,code:D}),(0,d.jsx)(`p`,{children:`生成中的旧格式响应：`}),(0,d.jsx)(i,{lang:`json`,filename:`poll-progress.json`,code:C}),(0,d.jsx)(`p`,{children:`兼容旧任务接口的成功响应：`}),(0,d.jsx)(i,{lang:`json`,filename:`poll-success-legacy.json`,code:w}),(0,d.jsx)(`p`,{children:`兼容旧任务接口的失败响应：`}),(0,d.jsx)(i,{lang:`json`,filename:`poll-failure-legacy.json`,code:T}),(0,d.jsx)(l,{rows:g}),(0,d.jsx)(`p`,{children:`当前 OpenAI 兼容视频资源的成功响应：`}),(0,d.jsx)(i,{lang:`json`,filename:`video-status-completed.json`,code:E}),(0,d.jsx)(l,{rows:h}),(0,d.jsxs)(`ul`,{children:[(0,d.jsxs)(`li`,{children:[`新格式以顶层 `,(0,d.jsx)(`code`,{children:`status == "completed"`}),` 判断完成；失败时通常为 `,(0,d.jsx)(`code`,{children:`failed`}),`、`,(0,d.jsx)(`code`,{children:`cancelled`}),` 或 `,(0,d.jsx)(`code`,{children:`expired`}),`。`]}),(0,d.jsxs)(`li`,{children:[`旧格式以 `,(0,d.jsx)(`code`,{children:`data.status == "SUCCESS"`}),` 且 `,(0,d.jsx)(`code`,{children:`data.result_url`}),` 非空判断完成。`]}),(0,d.jsxs)(`li`,{children:[`处理中状态可能是 `,(0,d.jsx)(`code`,{children:`queued`}),`、`,(0,d.jsx)(`code`,{children:`in_progress`}),`，或旧格式的 `,(0,d.jsx)(`code`,{children:`SUBMITTED`}),`、`,(0,d.jsx)(`code`,{children:`QUEUED`}),`、`,(0,d.jsx)(`code`,{children:`IN_PROGRESS`}),`、`,(0,d.jsx)(`code`,{children:`NOT_START`}),`。`]})]}),(0,d.jsx)(o,{tone:`warn`,title:`progress 100% 不等于成功`,children:(0,d.jsxs)(`p`,{children:[(0,d.jsx)(`code`,{children:`progress: 100`}),` 或 `,(0,d.jsx)(`code`,{children:`progress: "100%"`}),` 只表示流程已经结束，不代表一定成功。必须同时检查`,(0,d.jsx)(`code`,{children:`status`}),` 或旧格式的 `,(0,d.jsx)(`code`,{children:`data.status`}),`。`]})}),(0,d.jsx)(o,{tone:`info`,title:`轮询建议`,children:(0,d.jsxs)(`ul`,{className:`mt-2 space-y-1`,children:[(0,d.jsx)(`li`,{children:`轮询间隔：每 5 秒一次。`}),(0,d.jsx)(`li`,{children:`最大轮询时长：5 分钟。`}),(0,d.jsx)(`li`,{children:`最大轮询次数：60 次。`}),(0,d.jsx)(`li`,{children:`成功后尽快下载内容；如果响应返回的是临时完整 URL，请在失效前保存。`})]})}),(0,d.jsx)(`h2`,{id:`content`,children:`查询内容并保存视频`}),(0,d.jsxs)(`p`,{children:[`当状态为 `,(0,d.jsx)(`code`,{children:`completed`}),` 后，可以调用内容接口获取视频二进制。内容接口返回的是视频文件流，不是 JSON， 所以需要使用 `,(0,d.jsx)(`code`,{children:`-o`}),`、`,(0,d.jsx)(`code`,{children:`write_bytes`}),` 或 `,(0,d.jsx)(`code`,{children:`writeFile`}),` 保存。`]}),(0,d.jsx)(s,{method:`GET`,path:`https://img.gpt88.cc/v1/videos/{id}/content`}),(0,d.jsxs)(`p`,{children:[`你提供的响应中，`,(0,d.jsx)(`code`,{children:`url`}),`、`,(0,d.jsx)(`code`,{children:`video_url`}),` 和 `,(0,d.jsx)(`code`,{children:`video.url`}),` 都指向同一个内容路径。 若字段是以 `,(0,d.jsx)(`code`,{children:`/v1/`}),` 开头的相对路径，请拼接 `,(0,d.jsx)(`code`,{children:`https://img.gpt88.cc`}),`；更稳定的方式是直接调用`,(0,d.jsxs)(`code`,{children:[`/v1/videos/`,`{id}`,`/content`]}),` 并携带同一个 API Key。`]}),(0,d.jsx)(i,{lang:`bash`,filename:`download-video.sh`,code:O}),(0,d.jsx)(i,{lang:`python`,filename:`download-video.py`,code:k}),(0,d.jsx)(i,{lang:`typescript`,filename:`download-video.mjs`,code:A}),(0,d.jsx)(o,{tone:`info`,title:`保存成功的判断`,children:(0,d.jsxs)(`ul`,{className:`mt-2 space-y-1`,children:[(0,d.jsx)(`li`,{children:`HTTP 请求应返回成功状态，并且响应体是视频二进制，而不是 JSON 错误对象。`}),(0,d.jsxs)(`li`,{children:[`保存后的文件建议使用 `,(0,d.jsx)(`code`,{children:`.mp4`}),` 扩展名；如果服务端返回其他 `,(0,d.jsx)(`code`,{children:`Content-Type`}),`，以响应头为准。`]}),(0,d.jsxs)(`li`,{children:[`不要把 `,(0,d.jsx)(`code`,{children:`video_url`}),` 或完整响应直接写入文件；它们是路径或元数据，真正的视频内容来自 content 接口。`]}),(0,d.jsxs)(`li`,{children:[`下载失败时先重新查询状态，确认仍为 `,(0,d.jsx)(`code`,{children:`completed`}),`，再检查 API Key、视频 ID 和响应中的内容路径。`]})]})}),(0,d.jsx)(`h2`,{id:`js`,children:`JavaScript 示例`}),(0,d.jsx)(i,{lang:`typescript`,filename:`grok-video.ts`,code:M}),(0,d.jsx)(`h2`,{id:`errors`,children:`常见错误`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`401`}),`：API Key 缺失或错误，检查 `,(0,d.jsx)(`code`,{children:`Authorization: Bearer <YOUR_API_KEY>`}),`。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`403`}),`：权限、额度或分组限制，检查账号余额、令牌权限和可用模型。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`400 prompt is required`}),`：`,(0,d.jsx)(`code`,{children:`prompt`}),` 为空。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`400 model field is required`}),`：`,(0,d.jsx)(`code`,{children:`model`}),` 为空或模型 ID 写错。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`400 only supports exactly one reference image`}),`：`,(0,d.jsx)(`code`,{children:`grok-video-1.5`}),` 没有传图或传了多张图。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`图片抓取失败`}),`：图片 URL 无法被服务端访问，换成真实直链或 base64。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`任务 FAILURE`}),`：上游生成失败、图片不可访问或参数不支持，读取 `,(0,d.jsx)(`code`,{children:`data.fail_reason`}),`。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`轮询超时`}),`：保留 `,(0,d.jsx)(`code`,{children:`id`}),` 或 `,(0,d.jsx)(`code`,{children:`request_id`}),`，稍后继续查询，不要重复提交生成任务。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`下载返回 JSON 而不是视频`}),`：检查是否调用了 `,(0,d.jsxs)(`code`,{children:[`/v1/videos/`,`{id}`,`/content`]}),`，并确认请求头带有 API Key。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`strong`,{children:`404 或视频 ID 无效`}),`：优先使用响应里的 `,(0,d.jsx)(`code`,{children:`id`}),` 查询；不要把 `,(0,d.jsx)(`code`,{children:`video.duration`}),` 或 `,(0,d.jsx)(`code`,{children:`task_id`}),` 当作视频 ID。`]})]}),(0,d.jsx)(`h2`,{id:`notes`,children:`接入注意事项`}),(0,d.jsxs)(`ul`,{children:[(0,d.jsxs)(`li`,{children:[`不要把模型 ID 写死成单个模型，建议通过 `,(0,d.jsx)(t,{to:r(`/docs/api/list-models/`,e),children:`GET /v1/models`}),` 动态读取。`]}),(0,d.jsxs)(`li`,{children:[`默认推荐使用 `,(0,d.jsx)(`code`,{children:`grok-image-video`}),`。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`grok-video-1.5`}),` 当前仅用于单参考图生视频。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`grok-image-video`}),` 文生视频和单图生视频最长 15 秒，多参考图最长 10 秒。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`grok-image-video`}),` 多参考图最多 7 张；多参考图请求超过 10 秒会自动按 10 秒处理。`]}),(0,d.jsxs)(`li`,{children:[(0,d.jsx)(`code`,{children:`grok-video-1.5`}),` 只支持单图生视频，最长 15 秒。`]}),(0,d.jsxs)(`li`,{children:[`新格式的最终视频路径通常在 `,(0,d.jsx)(`code`,{children:`url`}),`、`,(0,d.jsx)(`code`,{children:`video_url`}),` 或 `,(0,d.jsx)(`code`,{children:`video.url`}),`；也可以直接调用 `,(0,d.jsxs)(`code`,{children:[`/v1/videos/`,`{id}`,`/content`]}),` 保存。`]}),(0,d.jsxs)(`li`,{children:[`旧格式的最终视频 URL 在 `,(0,d.jsx)(`code`,{children:`data.result_url`}),` 字段中；返回相对路径时先拼接 Base URL。`]}),(0,d.jsxs)(`li`,{children:[`任务失败时可能会出现 `,(0,d.jsx)(`code`,{children:`progress: 100`}),` 或 `,(0,d.jsx)(`code`,{children:`"100%"`}),`，这是正常结束状态，请以状态字段判断结果。`]})]})]})}export{N as default};