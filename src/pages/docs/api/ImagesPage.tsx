import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeTabs } from '../../../components/ui/CodeTabs'
import { EndpointBadge } from '../../../components/ui/EndpointBadge'
import { FieldTable, type FieldRow } from '../../../components/ui/FieldTable'
import { useLocale } from '../../../lib/locale'
import ImagesPageEn from '../../en/ImagesPageEn'

const GEMINI_UPLOAD_TABS = [
  {
    label: 'cURL',
    lang: 'bash',
    code: `export API_KEY="YOUR_GPT88_API_KEY"
export BASE_URL="https://img.gpt88.cc"
export MODEL="gemini-3.1-flash-image"

# 先把本地参考图上传成可复用文件
curl -s -X POST "$BASE_URL/upload/v1/files" \\
  -H "x-goog-api-key: $API_KEY" \\
  -F "file=@reference.png" \\
  -F "mimeType=image/png" > upload.json

FILE_URI=$(jq -r '.file.uri // .uri // .name' upload.json)

jq -n --arg file_uri "$FILE_URI" '{
  contents: [{
    parts: [
      { text: "Keep the main subject, change the background to a moonlit bamboo path" },
      {
        fileData: {
          mimeType: "image/png",
          fileUri: $file_uri
        }
      }
    ]
  }],
  generationConfig: {
    responseModalities: ["TEXT", "IMAGE"],
    responseFormat: {
      image: {
        aspectRatio: "1:1",
        imageSize: "1K"
      }
    }
  }
}' > request.json

curl -s -X POST \\
  "$BASE_URL/v1/models/$MODEL:generateContent" \\
  -H "x-goog-api-key: $API_KEY" \\
  -H "Content-Type: application/json" \\
  --data-binary @request.json > response.json`,
  },
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import fs from "node:fs";

async function uploadReferenceImage(filePath: string) {
  const form = new FormData();
  form.append("file", new Blob([fs.readFileSync(filePath)]), "reference.png");
  form.append("mimeType", "image/png");

  const res = await fetch("https://img.gpt88.cc/upload/v1/files", {
    method: "POST",
    headers: {
      "x-goog-api-key": process.env.GPT88_API_KEY!,
    },
    body: form,
  });

  const json = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(json, null, 2));
  return json.file?.uri ?? json.uri ?? json.name;
}

const fileUri = await uploadReferenceImage("reference.png");

const res = await fetch("https://img.gpt88.cc/v1/models/gemini-3.1-flash-image:generateContent", {
  method: "POST",
  headers: {
    "x-goog-api-key": process.env.GPT88_API_KEY!,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contents: [{
      parts: [
        { text: "Keep the main subject, change the background to a moonlit bamboo path" },
        {
          fileData: {
            mimeType: "image/png",
            fileUri,
          },
        },
      ],
    }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
      responseFormat: {
        image: {
          aspectRatio: "1:1",
          imageSize: "1K",
        },
      },
    },
  }),
});

console.log(await res.json());`,
  },
]

const OPENAI_GENERATE_TABS = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import OpenAI from "openai";
import fs from "node:fs";

const client = new OpenAI({
  apiKey: process.env.GPT88_API_KEY,
  baseURL: "https://img.gpt88.cc",
});

const result = await client.images.generate({
  model: "gpt-image-2",
  prompt: "A children's book drawing of a veterinarian using a stethoscope to listen to the heartbeat of a baby otter.",
  size: "1024x1024",
  quality: "high",
});

const imageBase64 = result.data[0].b64_json;
fs.writeFileSync("otter.png", Buffer.from(imageBase64, "base64"));`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `from openai import OpenAI
import base64

client = OpenAI(
    api_key="YOUR_GPT88_API_KEY",
    base_url="https://img.gpt88.cc",
)

result = client.images.generate(
    model="gpt-image-2",
    prompt="A children's book drawing of a veterinarian using a stethoscope to listen to the heartbeat of a baby otter.",
    size="1024x1024",
    quality="high",
)

image_base64 = result.data[0].b64_json
with open("otter.png", "wb") as f:
    f.write(base64.b64decode(image_base64))`,
  },
  {
    label: 'cURL',
    lang: 'bash',
    code: `curl -s https://img.gpt88.cc/v1/images/generations \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-image-2",
    "prompt": "A children's book drawing of a veterinarian using a stethoscope to listen to the heartbeat of a baby otter.",
    "size": "1024x1024",
    "quality": "high"
  }' > response.json

jq -r '.data[0].b64_json' response.json | base64 -d > otter.png`,
  },
]

const OPENAI_EDIT_TABS = [
  {
    label: 'Python',
    lang: 'python',
    code: `import base64
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_GPT88_API_KEY",
    base_url="https://img.gpt88.cc",
)

prompt = """
Generate a photorealistic image of a gift basket on a white background
labeled 'Relax & Unwind' with a ribbon and handwriting-like font,
containing all the items in the reference pictures.
"""

result = client.images.edit(
    model="gpt-image-2",
    image=[
        open("body-lotion.png", "rb"),
        open("soap.png", "rb"),
        open("bath-bomb.png", "rb"),
        open("incense-kit.png", "rb"),
    ],
    prompt=prompt,
    size="1536x1024",
    quality="high",
)

image_base64 = result.data[0].b64_json
with open("gift-basket.png", "wb") as f:
    f.write(base64.b64decode(image_base64))`,
  },
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import OpenAI from "openai";
import fs from "node:fs";

const client = new OpenAI({
  apiKey: process.env.GPT88_API_KEY,
  baseURL: "https://img.gpt88.cc",
});

const result = await client.images.edit({
  model: "gpt-image-2",
  image: [
    fs.createReadStream("body-lotion.png"),
    fs.createReadStream("soap.png"),
    fs.createReadStream("bath-bomb.png"),
    fs.createReadStream("incense-kit.png"),
  ],
  prompt: "Generate a photorealistic image of a gift basket on a white background labeled 'Relax & Unwind' with a ribbon and handwriting-like font, containing all the items in the reference pictures.",
  size: "1536x1024",
  quality: "high",
});

const imageBase64 = result.data[0].b64_json;
fs.writeFileSync("gift-basket.png", Buffer.from(imageBase64, "base64"));`,
  },
]

const GEMINI_TEXT_TABS = [
  {
    label: 'cURL',
    lang: 'bash',
    code: `export API_KEY="YOUR_GPT88_API_KEY"
export BASE_URL="https://img.gpt88.cc"
export MODEL="gemini-3.1-flash-image"

curl -s -X POST \\
  "$BASE_URL/v1/models/$MODEL:generateContent" \\
  -H "x-goog-api-key: $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [{
      "parts": [
        { "text": "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme" }
      ]
    }],
    "generationConfig": {
      "responseModalities": ["IMAGE"],
      "responseFormat": {
        "image": {
          "aspectRatio": "16:9",
          "imageSize": "2K"
        }
      }
    }
  }' > response.json

jq -r '.. | objects | .inlineData?.data? | select(.)' response.json | head -n 1 | base64 -d > output.png`,
  },
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import fs from "node:fs";

const API_KEY = process.env.GPT88_API_KEY;
const BASE_URL = "https://img.gpt88.cc";
const MODEL = "gemini-3.1-flash-image";

const res = await fetch(\`\${BASE_URL}/v1/models/\${MODEL}:generateContent\`, {
  method: "POST",
  headers: {
    "x-goog-api-key": API_KEY!,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contents: [{
      parts: [{ text: "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme" }],
    }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      responseFormat: {
        image: {
          aspectRatio: "16:9",
          imageSize: "2K",
        },
      },
    },
  }),
});

const json = await res.json();
if (!res.ok) throw new Error(JSON.stringify(json, null, 2));

const part = json.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData?.data);
fs.writeFileSync("output.png", Buffer.from(part.inlineData.data, "base64"));`,
  },
]

const OPENAI_FIELDS: FieldRow[] = [
  { name: 'model', type: 'string', required: true, description: <>官方 GPT Image 模型，例如 <code>gpt-image-2</code>。</> },
  { name: 'prompt', type: 'string', required: true, description: <>图片生成或编辑指令。</> },
  { name: 'size', type: 'string', description: <>像素尺寸，例如 <code>1024x1024</code>、<code>1536x1024</code>、<code>1024x1536</code>，<code>gpt-image-2</code> 还支持更多合法分辨率与 <code>auto</code>。</> },
  { name: 'quality', type: 'string', description: <><code>low</code>、<code>medium</code>、<code>high</code> 或 <code>auto</code>。</> },
  { name: 'background', type: 'string', description: <>官方文档支持 <code>opaque</code> 或 <code>auto</code>；<code>gpt-image-2</code> 当前不支持 <code>transparent</code>。</> },
  { name: 'output_format', type: 'string', description: <>默认返回 PNG，也可请求 JPEG 或 WebP。</> },
  { name: 'output_compression', type: 'integer', description: <>JPEG / WebP 时可用，范围 0-100。</> },
  { name: 'n', type: 'integer', description: <>一次请求生成多张图，默认 1。</> },
  { name: 'image', type: 'file | file[]', description: <>编辑接口输入图片，使用 <code>/v1/images/edits</code>。</> },
  { name: 'mask', type: 'file', description: <>局部编辑可选遮罩图，仅编辑被 mask 指定的区域。</> },
]

const GEMINI_FIELDS: FieldRow[] = [
  { name: 'contents', type: 'array<Content>', required: true, description: <>Gemini <code>generateContent</code> 输入。</> },
  { name: 'contents[].parts[].text', type: 'string', required: true, description: <>文字提示词。</> },
  { name: 'contents[].parts[].inlineData', type: 'object', description: <>参考图可直接以内联 base64 传入，包含 <code>mimeType</code> 与 <code>data</code>。</> },
  { name: 'contents[].parts[].fileData', type: 'object', description: <>参考图也可用 <code>fileUri</code> 传入，URL 或文件 URI 必须可访问。</> },
  { name: 'generationConfig.responseModalities', type: 'string[]', description: <>常见写法为 <code>["IMAGE"]</code> 或 <code>["TEXT", "IMAGE"]</code>。</> },
  { name: 'generationConfig.responseFormat.image.aspectRatio', type: 'string', description: <>官方比例值，例如 <code>1:1</code>、<code>16:9</code>、<code>9:16</code>、<code>4:3</code>、<code>3:4</code>。</> },
  { name: 'generationConfig.responseFormat.image.imageSize', type: 'string', description: <>部分 Gemini 3 图片模型支持 <code>1K</code>、<code>2K</code>、<code>4K</code>。</> },
]

export default function ImagesPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <ImagesPageEn />

  return (
    <DocPage
      path="/docs/api/images"
      title="图片生成 API"
      description="按 OpenAI 官方图片 API 与 Gemini 官方 generateContent 图片 API 分开说明，修正模型 ID、参数名、端点与返回结构。"
      headings={[
        { id: 'overview', text: '先分清两套接口', level: 2 },
        { id: 'openai', text: 'OpenAI 官方图片 API', level: 2 },
        { id: 'openai-edit', text: 'OpenAI 图片编辑', level: 2 },
        { id: 'gemini', text: 'Gemini 官方图片 API', level: 2 },
        { id: 'gemini-edit', text: 'Gemini 图生图与编辑', level: 2 },
        { id: 'fields', text: '字段对照', level: 2 },
        { id: 'compat', text: 'gpt88.cc 兼容说明', level: 2 },
      ]}
    >
      <h2 id="overview">先分清两套接口</h2>
      <p>
        图片生成文档最容易写错的地方，是把 OpenAI 的图片接口参数和 Gemini 的图片接口参数混在一起。
        这两套官方接口并不兼容，端点、字段名、模型 ID、返回结构都不同。
      </p>
      <ul>
        <li>OpenAI 官方图片 API：走 <code>/v1/images/generations</code> 与 <code>/v1/images/edits</code>。</li>
        <li>Gemini 官方图片 API：走 <code>/v1/models/{"{model}"}:generateContent</code>。</li>
        <li>OpenAI 常用字段是 <code>prompt</code>、<code>size</code>、<code>quality</code>、<code>background</code>。</li>
        <li>Gemini 常用字段是 <code>contents</code>、<code>parts</code>、<code>responseModalities</code>、<code>responseFormat.image</code>。</li>
      </ul>

      <Callout tone="warn" title="官方模型 ID 与平台别名不要混写">
        <p>
          Google 官方文档中，Nano Banana 2 对应的官方模型 ID 是 <code>gemini-3.1-flash-image</code>，
          Nano Banana Pro 对应 <code>gemini-3-pro-image</code>。如果你在 gpt88.cc 控制台里看到
          <code>NanoBanana2</code> 这类名字，它属于平台别名，不是 Google 官方文档里的标准模型 ID。
        </p>
      </Callout>

      <h2 id="openai">OpenAI 官方图片 API</h2>
      <EndpointBadge method="POST" path="https://img.gpt88.cc/v1/images/generations" />
      <p>
        OpenAI 官方图片接口用于从文本直接生成图片。官方文档当前明确区分
        <code> generations</code>、<code>edits</code>，并说明从 <code>gpt-image-1</code> 之后开始，
        Image API 具备更清晰的生成与编辑分工。
      </p>
      <CodeTabs tabs={OPENAI_GENERATE_TABS} />

      <Callout tone="info" title="OpenAI 返回结构">
        <p>
          Image API 返回的图片数据通常在 <code>data[0].b64_json</code>。默认输出格式是 PNG，
          也可以请求 JPEG 或 WebP；JPEG / WebP 还支持 <code>output_compression</code>。
        </p>
      </Callout>

      <h2 id="openai-edit">OpenAI 图片编辑</h2>
      <EndpointBadge method="POST" path="https://img.gpt88.cc/v1/images/edits" />
      <p>
        OpenAI 官方编辑接口支持三类能力：编辑现有图片、基于参考图生成新图、以及配合 mask 做局部重绘。
        这一段不要再写成 Gemini 风格的 <code>contents.parts.fileData</code>，因为那是另一套接口。
      </p>
      <CodeTabs tabs={OPENAI_EDIT_TABS} />

      <h2 id="gemini">Gemini 官方图片 API</h2>
      <EndpointBadge method="POST" path="https://img.gpt88.cc/v1/models/gemini-3.1-flash-image:generateContent" />
      <p>
        Gemini 官方图片生成走 <code>generateContent</code>。Google 当前官方文档里，Nano Banana 2
        对应 <code>gemini-3.1-flash-image</code>，Nano Banana Pro 对应 <code>gemini-3-pro-image</code>。
        对 Gemini 3 图片模型，官方文档使用 <code>responseFormat.image.aspectRatio</code> 与
        <code>responseFormat.image.imageSize</code> 描述输出尺寸。
      </p>
      <CodeTabs tabs={GEMINI_TEXT_TABS} />

      <Callout tone="info" title="Gemini 返回结构">
        <p>
          Gemini 生成结果通常在 <code>candidates[].content.parts[].inlineData.data</code> 中返回 base64 图片。
          Google 官方文档也明确说明，生成图片会带 SynthID 水印。
        </p>
      </Callout>

      <h2 id="gemini-edit">Gemini 图生图与编辑</h2>
      <p>
        Gemini 图生图按官方口径优先走“上传图片，然后再调用 generateContent”的流程。
        也就是说，参考图不要写成公网图片 URL，而是先上传成文件，再把返回的 file uri 放进 <code>fileData.fileUri</code>。
      </p>
      <CodeTabs tabs={GEMINI_UPLOAD_TABS} />

      <h2 id="fields">字段对照</h2>
      <h3>OpenAI 图片 API</h3>
      <FieldTable rows={OPENAI_FIELDS} />
      <h3 className="mt-8">Gemini 图片 API</h3>
      <FieldTable rows={GEMINI_FIELDS} />

      <Callout tone="warn" title="不要再把比例值和像素值混用">
        <p>
          OpenAI 的 <code>size</code> 是像素尺寸，例如 <code>1024x1024</code>。
          Gemini 的 <code>aspectRatio</code> 是比例值，例如 <code>1:1</code>、<code>16:9</code>。
          这是两套官方文档里最容易混淆、也最容易导致 400 报错的地方。
        </p>
      </Callout>

      <h2 id="compat">gpt88.cc 兼容说明</h2>
      <ul>
        <li>如果你接入的是 OpenAI 兼容图片模型，例如 <code>gpt-image-2</code>，优先使用 <code>/v1/images/generations</code> 和 <code>/v1/images/edits</code>。</li>
        <li>如果你接入的是 Google / Gemini 图片模型，优先使用 <code>/v1/models/{"{model}"}:generateContent</code>。</li>
        <li>如果控制台展示了平台别名，例如 <code>NanoBanana2</code>，请先以控制台的可用模型列表为准，再参考本页理解它映射到哪类官方接口。</li>
        <li>更多模型入口可在 <Link to="/models/">模型导航</Link> 查看，代码工作流可参考 <Link to="/docs/guides/codex-gpt-image-2-skill/">Codex gpt-image-2 Skill</Link>。</li>
      </ul>
    </DocPage>
  )
}
