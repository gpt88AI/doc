import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeTabs } from '../../../components/ui/CodeTabs'
import { Callout } from '../../../components/ui/Callout'
import { EndpointBadge } from '../../../components/ui/EndpointBadge'
import { FieldTable, type FieldRow } from '../../../components/ui/FieldTable'

const TEXT_TO_IMAGE_TABS = [
  {
    label: 'cURL',
    lang: 'bash',
    code: `export API_KEY="YOUR_GPT88_API_KEY"
export BASE_URL="https://china.claudecoder.me"
export MODEL="NanoBanana2"

curl -s -X POST \\
  "$BASE_URL/v1beta/models/$MODEL:generateContent" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [{
      "parts": [{
        "text": "月光下的竹林小径"
      }]
    }],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"],
      "imageConfig": {
        "aspectRatio": "1:1",
        "imageSize": "1K"
      }
    }
  }' > response.json

jq -r '.. | objects | (.inlineData?.data // .inline_data?.data)? | select(.)' response.json \\
  | head -n 1 \\
  | base64 -d > output.png`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import base64
import requests

api_key = "YOUR_GPT88_API_KEY"
base_url = "https://china.claudecoder.me"
model = "NanoBanana2"

resp = requests.post(
    f"{base_url}/v1beta/models/{model}:generateContent",
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    },
    json={
        "contents": [{
            "parts": [{"text": "月光下的竹林小径"}],
        }],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"],
            "imageConfig": {
                "aspectRatio": "1:1",
                "imageSize": "1K",
            },
        },
    },
)
data = resp.json()
resp.raise_for_status()

for part in data["candidates"][0]["content"]["parts"]:
    inline = part.get("inlineData") or part.get("inline_data")
    if inline and inline.get("data"):
        open("output.png", "wb").write(base64.b64decode(inline["data"]))
        break`,
  },
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import fs from "node:fs";

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://china.claudecoder.me";
const MODEL = "NanoBanana2";

const resp = await fetch(\`\${BASE_URL}/v1beta/models/\${MODEL}:generateContent\`, {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contents: [{
      parts: [{ text: "月光下的竹林小径" }],
    }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: "1K",
      },
    },
  }),
});

const json = await resp.json();
if (!resp.ok) throw new Error(JSON.stringify(json, null, 2));

const part = json.candidates?.[0]?.content?.parts?.find(
  p => p.inlineData?.data || p.inline_data?.data
);
const b64 = part?.inlineData?.data ?? part?.inline_data?.data;
fs.writeFileSync("output.png", Buffer.from(b64, "base64"));`,
  },
]

const IMAGE_TO_IMAGE_TABS = [
  {
    label: 'cURL',
    lang: 'bash',
    code: `export API_KEY="YOUR_GPT88_API_KEY"
export BASE_URL="https://china.claudecoder.me"
export MODEL="NanoBanana2"

curl -s -X POST \\
  "$BASE_URL/v1beta/models/$MODEL:generateContent" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [{
      "parts": [
        {
          "text": "保留参考图主体，将背景改成月光下的竹林小径"
        },
        {
          "fileData": {
            "mimeType": "image/png",
            "fileUri": "https://example.com/reference.png"
          }
        }
      ]
    }],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"],
      "imageConfig": {
        "aspectRatio": "1:1",
        "imageSize": "1K"
      }
    }
  }' > response.json`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import requests

resp = requests.post(
    "https://china.claudecoder.me/v1beta/models/NanoBanana2:generateContent",
    headers={
        "Authorization": "Bearer YOUR_GPT88_API_KEY",
        "Content-Type": "application/json",
    },
    json={
        "contents": [{
            "parts": [
                {"text": "保留参考图主体，将背景改成月光下的竹林小径"},
                {
                    "fileData": {
                        "mimeType": "image/png",
                        "fileUri": "https://example.com/reference.png",
                    },
                },
            ],
        }],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"],
            "imageConfig": {
                "aspectRatio": "1:1",
                "imageSize": "1K",
            },
        },
    },
)
print(resp.json())`,
  },
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `const resp = await fetch("https://china.claudecoder.me/v1beta/models/NanoBanana2:generateContent", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.GPT88_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contents: [{
      parts: [
        { text: "保留参考图主体，将背景改成月光下的竹林小径" },
        {
          fileData: {
            mimeType: "image/png",
            fileUri: "https://example.com/reference.png",
          },
        },
      ],
    }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: "1K",
      },
    },
  }),
});

console.log(await resp.json());`,
  },
]

const GEMINI_NATIVE_TABS = [
  {
    label: 'cURL',
    lang: 'bash',
    code: `export API_KEY="YOUR_GPT88_API_KEY"
export BASE_URL="https://china.claudecoder.me"
export MODEL="gemini-3-pro-image-preview"

curl -s -X POST \\
  "$BASE_URL/v1beta/models/$MODEL:generateContent" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [{
      "parts": [{
        "text": "生成一张16:9的赛博朋克城市夜景，霓虹灯，雨夜，电影感，高细节"
      }]
    }],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"],
      "imageConfig": {
        "aspectRatio": "16:9",
        "imageSize": "2K"
      }
    }
  }' > response.json

jq -r '.. | objects | (.inlineData?.data // .inline_data?.data)? | select(.)' response.json \\
  | head -n 1 \\
  | base64 -d > output.png`,
  },
  {
    label: 'macOS base64',
    lang: 'bash',
    code: `jq -r '.. | objects | (.inlineData?.data // .inline_data?.data)? | select(.)' response.json \\
  | head -n 1 \\
  | base64 -D > output.png`,
  },
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import fs from "node:fs";

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://china.claudecoder.me";
const MODEL = "gemini-3-pro-image-preview";

const res = await fetch(\`\${BASE_URL}/v1beta/models/\${MODEL}:generateContent\`, {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contents: [{
      parts: [{
        text: "生成一张1:1的可爱3D图标，白色背景，彩色质感，无文字",
      }],
    }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: "1K",
      },
    },
  }),
});

const json = await res.json();
if (!res.ok) throw new Error(JSON.stringify(json, null, 2));

const part = json.candidates?.[0]?.content?.parts?.find(
  p => p.inlineData?.data || p.inline_data?.data
);

const b64 = part?.inlineData?.data ?? part?.inline_data?.data;
fs.writeFileSync("output.png", Buffer.from(b64, "base64"));
console.log("saved output.png");`,
  },
  {
    label: 'x-goog-api-key',
    lang: 'bash',
    code: `curl -s -X POST \\
  "$BASE_URL/v1beta/models/$MODEL:generateContent" \\
  -H "x-goog-api-key: $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d @payload.json > response.json`,
  },
]

const FIELDS: FieldRow[] = [
  {
    name: 'contents',
    type: 'array<Content>',
    required: true,
    description: <>Gemini generateContent 输入。文生图只需要文本 part；图生图同时传文本 part 和图片 part。</>,
  },
  {
    name: 'contents[].parts[].text',
    type: 'string',
    required: true,
    description: <>生成或编辑图片的文字指令。建议明确主体、风格、比例、细节和限制。</>,
  },
  {
    name: 'contents[].parts[].fileData',
    type: 'object',
    description: <>图生图参考图。包含 <code>mimeType</code> 和 <code>fileUri</code>，图片 URL 需要能被服务端访问。</>,
  },
  {
    name: 'generationConfig.responseModalities',
    type: 'string[]',
    required: true,
    default: '["TEXT", "IMAGE"]',
    description: <>生成图片时需要包含 <code>IMAGE</code>，也可同时返回文本说明。</>,
  },
  {
    name: 'generationConfig.imageConfig.aspectRatio',
    type: 'string',
    default: '1:1',
    description: <>图片比例，例如 <code>1:1</code>、<code>16:9</code>、<code>9:16</code>、<code>4:3</code>、<code>3:4</code>。</>,
  },
  {
    name: 'generationConfig.imageConfig.imageSize',
    type: 'string',
    default: '1K',
    description: <>输出清晰度，使用大写，例如 <code>1K</code>、<code>2K</code>、<code>4K</code>。</>,
  },
]

export default function ImagesPage() {
  return (
    <DocPage
      path="/docs/api/images"
      title="Google 图片生成"
      description="使用 gpt88.cc 的 Google / Gemini 图片生成能力，支持文生图与图生图。"
      headings={[
        { id: 'endpoint', text: '端点与认证', level: 2 },
        { id: 'text-to-image', text: '文生图', level: 2 },
        { id: 'image-to-image', text: '图生图', level: 2 },
        { id: 'gemini-native', text: 'Gemini 原生 generateContent', level: 2 },
        { id: 'fields', text: '请求字段', level: 2 },
        { id: 'tips', text: '使用提醒', level: 2 },
      ]}
    >
      <h2 id="endpoint">端点与认证</h2>
      <EndpointBadge method="POST" path="https://china.claudecoder.me/v1beta/models/NanoBanana2:generateContent" />
      <p>
        请求需携带 <code>Authorization: Bearer &lt;API_KEY&gt;</code>。
        如果还没有 Key，请先到 <a href="https://gpt88.cc" target="_blank" rel="noreferrer">gpt88.cc 控制台</a> 创建。
      </p>
      <Callout tone="info" title="图片接口默认使用加速域名">
        <p>
          Google 图片生成示例默认使用 <code>https://china.claudecoder.me</code>。
          如果你的部署环境在海外，也可以在控制台选择海外全球加速线路后替换 Base URL。
        </p>
      </Callout>

      <h2 id="text-to-image">文生图</h2>
      <p>
        文生图只需要在 <code>contents[].parts[].text</code> 写入提示词，并在
        <code>generationConfig.imageConfig</code> 里设置画幅比例和清晰度。
        下面示例使用 <code>NanoBanana2</code> 走 Google/Gemini <code>generateContent</code>
        生成一张 1:1 图片。
      </p>
      <CodeTabs tabs={TEXT_TO_IMAGE_TABS} />

      <h2 id="image-to-image">图生图</h2>
      <p>
        图生图在 <code>contents[].parts</code> 中同时传入文字指令和参考图。
        参考图应是公网可访问 URL；如果你使用临时签名 URL，请确认有效期足够完成请求。
      </p>
      <CodeTabs tabs={IMAGE_TO_IMAGE_TABS} />

      <h2 id="gemini-native">Gemini 原生 generateContent</h2>
      <p>
        <code>NanoBanana2</code> 与 <code>gemini-3-pro-image-preview</code> 都走 Gemini 原生兼容接口：
        <code>/v1beta/models/{'{model}'}:generateContent</code>。
        如果你使用中国调用线路，可把官方 Gemini 域名替换成 <code>https://china.claudecoder.me</code>。
      </p>
      <CodeTabs tabs={GEMINI_NATIVE_TABS} />
      <Callout tone="info" title="返回图片是 base64">
        <p>
          Gemini 原生响应中的图片通常在 <code>candidates[].content.parts[].inlineData.data</code>。
          取出后用 <code>base64 -d</code> 解码即可；macOS 可使用 <code>base64 -D</code>。
        </p>
      </Callout>

      <h2 id="fields">请求字段</h2>
      <FieldTable rows={FIELDS} />

      <Callout tone="warn" title="aspectRatio 是比例，不是像素尺寸">
        <p>
          对 <code>NanoBanana2</code>，请使用 <code>imageConfig.aspectRatio</code>
          传 <code>"1:1"</code> 这类比例值，不要传 <code>"1024x1024"</code>。
          如果需要控制清晰度，请使用 <code>imageConfig.imageSize</code>。
        </p>
      </Callout>
      <Callout tone="info" title="NanoBanana2 与 Gemini 原生接口的区别">
        <p>
          <code>NanoBanana2</code> 是 Google Gemini 图片生成能力的模型别名，
          也走 <code>/v1beta/models/{'{model}'}:generateContent</code>。
          它和 <code>gemini-3-pro-image-preview</code> 的主要区别是模型 ID 不同。
        </p>
      </Callout>

      <h2 id="tips">使用提醒</h2>
      <ul>
        <li>图生图失败时，优先检查 <code>fileData.fileUri</code> 是否可公网访问，以及 <code>mimeType</code> 是否和图片格式一致。</li>
        <li>多张参考图可以继续往 <code>contents[].parts</code> 里追加多个 <code>fileData</code> part。</li>
        <li>Gemini 原生接口如果返回 <code>401</code>，可把 <code>Authorization: Bearer</code> 改成 <code>x-goog-api-key</code> 重试。</li>
        <li><code>NanoBanana2</code> 与 <code>gemini-3-pro-image-preview</code> 的 <code>aspectRatio</code> 可用 <code>1:1</code>、<code>16:9</code>、<code>9:16</code>、<code>4:3</code>、<code>3:4</code> 等，<code>imageSize</code> 使用 <code>1K</code>、<code>2K</code>、<code>4K</code>。</li>
        <li>更多可用图像模型可在 <Link to="/models">模型导航</Link> 的 Image 分类查看。</li>
      </ul>
    </DocPage>
  )
}
