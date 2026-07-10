import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeTabs } from '../../components/ui/CodeTabs'
import { EndpointBadge } from '../../components/ui/EndpointBadge'
import { FieldTable, type FieldRow } from '../../components/ui/FieldTable'
import { localizePath } from '../../lib/locale'

const GEMINI_UPLOAD_TABS = [
  {
    label: 'cURL',
    lang: 'bash',
    code: `export API_KEY="YOUR_GPT88_API_KEY"
export BASE_URL="https://china.claudecoder.me"
export MODEL="gemini-3.1-flash-image"

# Upload the reference image first
curl -s -X POST "$BASE_URL/upload/v1/files" \\
  -H "x-goog-api-key: $API_KEY" \\
  -F "file=@reference.png" \\
  -F "mimeType=image/png" > upload.json

FILE_URI=$(jq -r '.file.uri // .uri // .name' upload.json)

curl -s -X POST \\
  "$BASE_URL/v1/models/$MODEL:generateContent" \\
  -H "x-goog-api-key: $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"contents\\": [{
      \\"parts\\": [
        { \\"text\\": \\"Keep the main subject, change the background to a moonlit bamboo path\\" },
        {
          \\"fileData\\": {
            \\"mimeType\\": \\"image/png\\",
            \\"fileUri\\": \\"$FILE_URI\\"
          }
        }
      ]
    }],
    \\"generationConfig\\": {
      \\"responseModalities\\": [\\"TEXT\\", \\"IMAGE\\"],
      \\"responseFormat\\": {
        \\"image\\": {
          \\"aspectRatio\\": \\"1:1\\",
          \\"imageSize\\": \\"1K\\"
        }
      }
    }
  }" > response.json`,
  },
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import fs from "node:fs";

async function uploadReferenceImage(filePath: string) {
  const form = new FormData();
  form.append("file", new Blob([fs.readFileSync(filePath)]), "reference.png");
  form.append("mimeType", "image/png");

  const res = await fetch("https://china.claudecoder.me/upload/v1/files", {
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

const res = await fetch("https://china.claudecoder.me/v1/models/gemini-3.1-flash-image:generateContent", {
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
  baseURL: "https://china.claudecoder.me/v1",
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
    base_url="https://china.claudecoder.me/v1",
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
    code: `curl -s https://china.claudecoder.me/v1/images/generations \\
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
    base_url="https://china.claudecoder.me/v1",
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
  baseURL: "https://china.claudecoder.me/v1",
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
export BASE_URL="https://china.claudecoder.me"
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
const BASE_URL = "https://china.claudecoder.me";
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
  { name: 'model', type: 'string', required: true, description: <>Official GPT Image model, such as <code>gpt-image-2</code>.</> },
  { name: 'prompt', type: 'string', required: true, description: <>Instruction for image generation or editing.</> },
  { name: 'size', type: 'string', description: <>Pixel dimensions such as <code>1024x1024</code>, <code>1536x1024</code>, or <code>1024x1536</code>. <code>gpt-image-2</code> also supports more valid resolutions and <code>auto</code>.</> },
  { name: 'quality', type: 'string', description: <><code>low</code>, <code>medium</code>, <code>high</code>, or <code>auto</code>.</> },
  { name: 'background', type: 'string', description: <>Official docs support <code>opaque</code> or <code>auto</code>. <code>gpt-image-2</code> currently does not support <code>transparent</code>.</> },
  { name: 'output_format', type: 'string', description: <>PNG by default. JPEG and WebP are also supported.</> },
  { name: 'output_compression', type: 'integer', description: <>Available for JPEG / WebP, range 0-100.</> },
  { name: 'n', type: 'integer', description: <>Generate multiple images in one request. Default is 1.</> },
  { name: 'image', type: 'file | file[]', description: <>Input image(s) for the edit endpoint <code>/v1/images/edits</code>.</> },
  { name: 'mask', type: 'file', description: <>Optional mask for localized editing. Only the masked region is changed.</> },
]

const GEMINI_FIELDS: FieldRow[] = [
  { name: 'contents', type: 'array<Content>', required: true, description: <>Gemini <code>generateContent</code> input.</> },
  { name: 'contents[].parts[].text', type: 'string', required: true, description: <>Prompt text.</> },
  { name: 'contents[].parts[].inlineData', type: 'object', description: <>Reference images can be passed inline as base64 with <code>mimeType</code> and <code>data</code>.</> },
  { name: 'contents[].parts[].fileData', type: 'object', description: <>Reference images can also be passed by uploaded <code>fileUri</code>.</> },
  { name: 'generationConfig.responseModalities', type: 'string[]', description: <>Common values are <code>["IMAGE"]</code> or <code>["TEXT", "IMAGE"]</code>.</> },
  { name: 'generationConfig.responseFormat.image.aspectRatio', type: 'string', description: <>Official aspect-ratio enums such as <code>1:1</code>, <code>16:9</code>, <code>9:16</code>, <code>4:3</code>, or <code>3:4</code>.</> },
  { name: 'generationConfig.responseFormat.image.imageSize', type: 'string', description: <>Some Gemini 3 image models support <code>1K</code>, <code>2K</code>, and <code>4K</code>.</> },
]

export default function ImagesPageEn() {
  return (
    <DocPage
      path="/docs/api/images"
      title="Image Generation API"
      description="Separate documentation for the OpenAI image API and the Gemini generateContent image API, with corrected model IDs, parameter names, endpoints, and response shapes."
      headings={[
        { id: 'overview', text: 'Understand the two API families first', level: 2 },
        { id: 'openai', text: 'OpenAI official image API', level: 2 },
        { id: 'openai-edit', text: 'OpenAI image editing', level: 2 },
        { id: 'gemini', text: 'Gemini official image API', level: 2 },
        { id: 'gemini-edit', text: 'Gemini image-to-image and editing', level: 2 },
        { id: 'fields', text: 'Field reference', level: 2 },
        { id: 'compat', text: 'gpt88.cc compatibility notes', level: 2 },
      ]}
    >
      <h2 id="overview">Understand the two API families first</h2>
      <p>
        The most common documentation mistake is mixing OpenAI image parameters with Gemini image parameters.
        These official APIs are not interchangeable. Their endpoints, field names, model IDs, and response
        structures differ.
      </p>
      <ul>
        <li>OpenAI official image API uses <code>/v1/images/generations</code> and <code>/v1/images/edits</code>.</li>
        <li>Gemini official image API uses <code>/v1/models/{'{model}'}:generateContent</code>.</li>
        <li>OpenAI commonly uses <code>prompt</code>, <code>size</code>, <code>quality</code>, and <code>background</code>.</li>
        <li>Gemini commonly uses <code>contents</code>, <code>parts</code>, <code>responseModalities</code>, and <code>responseFormat.image</code>.</li>
      </ul>

      <Callout tone="warn" title="Do not mix official model IDs with platform aliases">
        <p>
          In Google documentation, Nano Banana 2 maps to <code>gemini-3.1-flash-image</code>, and Nano Banana
          Pro maps to <code>gemini-3-pro-image</code>. If you see names such as <code>NanoBanana2</code> inside
          the gpt88.cc console, treat them as platform aliases rather than Google’s official model IDs.
        </p>
      </Callout>

      <h2 id="openai">OpenAI official image API</h2>
      <EndpointBadge method="POST" path="https://china.claudecoder.me/v1/images/generations" />
      <p>
        Use the OpenAI image API for direct text-to-image generation. The official API distinguishes clearly
        between <code>generations</code> and <code>edits</code>.
      </p>
      <CodeTabs tabs={OPENAI_GENERATE_TABS} />

      <Callout tone="info" title="OpenAI response shape">
        <p>
          Generated image data is usually returned in <code>data[0].b64_json</code>. Default output is PNG,
          while JPEG and WebP can be requested with optional <code>output_compression</code>.
        </p>
      </Callout>

      <h2 id="openai-edit">OpenAI image editing</h2>
      <EndpointBadge method="POST" path="https://china.claudecoder.me/v1/images/edits" />
      <p>
        The official edit endpoint supports editing existing images, generating from references, and localized
        edits with masks. Do not rewrite this as Gemini-style <code>contents.parts.fileData</code>, because
        that belongs to a different API family.
      </p>
      <CodeTabs tabs={OPENAI_EDIT_TABS} />

      <h2 id="gemini">Gemini official image API</h2>
      <EndpointBadge method="POST" path="https://china.claudecoder.me/v1/models/gemini-3.1-flash-image:generateContent" />
      <p>
        Gemini image generation uses <code>generateContent</code>. In current Google documentation, Nano
        Banana 2 maps to <code>gemini-3.1-flash-image</code>, while Nano Banana Pro maps to
        <code>gemini-3-pro-image</code>. Gemini documentation describes output using
        <code>responseFormat.image.aspectRatio</code> and <code>responseFormat.image.imageSize</code>.
      </p>
      <CodeTabs tabs={GEMINI_TEXT_TABS} />

      <Callout tone="info" title="Gemini response shape">
        <p>
          Gemini usually returns the image base64 at
          <code>candidates[].content.parts[].inlineData.data</code>. Google also states that generated images
          include SynthID watermarking.
        </p>
      </Callout>

      <h2 id="gemini-edit">Gemini image-to-image and editing</h2>
      <p>
        For Gemini image-to-image flows, the more reliable official pattern is: upload the image first, then
        call <code>generateContent</code>. Do not document public image URLs as the primary input path here.
        Upload the file first, then pass the returned <code>fileData.fileUri</code>.
      </p>
      <CodeTabs tabs={GEMINI_UPLOAD_TABS} />

      <h2 id="fields">Field reference</h2>
      <h3>OpenAI image API</h3>
      <FieldTable rows={OPENAI_FIELDS} />
      <h3 className="mt-8">Gemini image API</h3>
      <FieldTable rows={GEMINI_FIELDS} />

      <Callout tone="warn" title="Do not mix ratio values with pixel dimensions">
        <p>
          In OpenAI, <code>size</code> is a pixel dimension such as <code>1024x1024</code>. In Gemini,
          <code>aspectRatio</code> is a ratio enum such as <code>1:1</code> or <code>16:9</code>. This is one
          of the most common causes of 400-series request errors.
        </p>
      </Callout>

      <h2 id="compat">gpt88.cc compatibility notes</h2>
      <ul>
        <li>If you are using an OpenAI-compatible image model such as <code>gpt-image-2</code>, prefer <code>/v1/images/generations</code> and <code>/v1/images/edits</code>.</li>
        <li>If you are using a Google / Gemini image model, prefer <code>/v1/models/{'{model}'}:generateContent</code>.</li>
        <li>If the console shows a platform alias such as <code>NanoBanana2</code>, use the console model list as the source of truth, then map it to the relevant official API family.</li>
        <li>For more entries, see <Link to={localizePath('/models/', 'en')}>Models</Link> and the <Link to={localizePath('/docs/guides/codex-gpt-image-2-skill/', 'en')}>Codex gpt-image-2 Skill guide</Link>.</li>
      </ul>
    </DocPage>
  )
}
