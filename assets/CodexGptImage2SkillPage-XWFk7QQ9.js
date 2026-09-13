import{n as e}from"./ui-Caz9BZV8.js";import{n as t}from"./router-DpHSRQDQ.js";import{d as n}from"./Seo-zhKV3POX.js";import{t as r}from"./CodeBlock-D8kfQ6fq.js";import{c as i,l as a}from"./index-DCJmtdkW.js";var o=e(),s=`---
name: gpt-image-2
description: Generate images, posters, illustrations, UI visuals, and avatars with GPT88.
tools: Bash
---

# GPT Image 2 Generator

Use the GPT88 Images API when the user needs a real image file. Do not pretend that a text model or an
SVG/HTML response is an image-generation result.

Default configuration:
- Model: gpt-image-2
- Base URL: https://img.gpt88.cc
- Endpoint: /v1/images/generations
- size: 1024x1024
- quality: high
- n: 1

Execution:
1. Expand a short prompt into a concrete visual brief
2. Read GPT88_API_KEY from the environment
3. Call the Images API
4. Decode b64_json
5. Save to output/imagegen/
6. Return the final file path`,c=`export GPT88_API_KEY="your-gpt88-api-key"
export OPENAI_API_KEY="$GPT88_API_KEY"
export OPENAI_BASE_URL="https://img.gpt88.cc"`,l=`mkdir -p output/imagegen

curl -s https://img.gpt88.cc/v1/images/generations \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-image-2",
    "prompt": "A dark technology cover for an API documentation site, no text",
    "size": "1024x1024",
    "quality": "high",
    "n": 1
  }' > output/imagegen/response.json

jq -r '.data[0].b64_json' output/imagegen/response.json | base64 -d > output/imagegen/doc-cover.png`,u=`jq: command not found
  Install jq or parse JSON with Node/Python.

base64: invalid option -- d
  On macOS, use base64 -D.

401 Unauthorized
  Check that GPT88_API_KEY exists, is complete, and has available balance.

Empty image
  Inspect response.json for an error body before decoding b64_json.`;function d(){return(0,o.jsxs)(a,{path:`/docs/guides/codex-gpt-image-2-skill`,title:`Create a GPT-Image-2 Skill for Codex`,description:`Create a small Codex skill that routes real image-generation requests to the GPT88 Images API and saves the resulting files locally.`,headings:[{id:`why`,text:`Why use a skill`,level:2},{id:`prepare`,text:`Prepare the API key`,level:2},{id:`create-skill`,text:`Create the skill`,level:2},{id:`test`,text:`Test with cURL`,level:2},{id:`use-in-codex`,text:`Use it in Codex`,level:2},{id:`best-practices`,text:`Prompt and cost practices`,level:2},{id:`troubleshooting`,text:`Troubleshooting`,level:2}],children:[(0,o.jsx)(i,{tone:`info`,title:`A skill turns image generation into a repeatable tool flow`,children:(0,o.jsx)(`p`,{children:`Codex is strong at code, files, and commands, but it will not automatically route every request for a real image file to an image model. A skill makes prompt completion, API calls, file saving, and output reporting explicit.`})}),(0,o.jsx)(`h2`,{id:`why`,children:`Why use a skill`}),(0,o.jsx)(`p`,{children:`Asking a text model to “generate an image” may produce a prompt, SVG, or HTML instead of a real image. A dedicated skill keeps the text model responsible for planning and uses the Images API for the actual bitmap output.`}),(0,o.jsx)(`h2`,{id:`prepare`,children:`Prepare the API key`}),(0,o.jsxs)(`p`,{children:[`Create an API key in the `,(0,o.jsx)(`a`,{href:`https://gpt88.cc`,target:`_blank`,rel:`noreferrer`,children:`GPT88 Console`}),`and keep it in a local environment variable or secret manager. Never commit it or put it in frontend code.`]}),(0,o.jsx)(r,{lang:`bash`,filename:`env`,code:c}),(0,o.jsx)(i,{tone:`warn`,title:`Keep credentials out of the repository`,children:(0,o.jsx)(`p`,{children:`Use local environment variables, a secret manager, or CI secrets. Do not place the key in SKILL.md.`})}),(0,o.jsx)(`h2`,{id:`create-skill`,children:`Create the skill`}),(0,o.jsxs)(`p`,{children:[`Create `,(0,o.jsx)(`code`,{children:`~/.codex/skills/gpt-image-2/SKILL.md`}),`. A single SKILL.md is enough for the basic workflow.`]}),(0,o.jsx)(r,{lang:`markdown`,filename:`SKILL.md`,code:s}),(0,o.jsx)(`h2`,{id:`test`,children:`Test with cURL`}),(0,o.jsx)(`p`,{children:`Run one minimal request before asking Codex to call the skill automatically. This verifies the key, balance, network route, JSON parser, and base64 utility independently.`}),(0,o.jsx)(r,{lang:`bash`,filename:`test-gpt-image-2.sh`,code:l}),(0,o.jsx)(`h2`,{id:`use-in-codex`,children:`Use it in Codex`}),(0,o.jsxs)(`p`,{children:[`Start a new Codex session after creating the skill. Ask Codex to use `,(0,o.jsx)(`code`,{children:`gpt-image-2`}),`, specify the subject, style, size, and output directory, and ask it to preserve older files instead of overwriting them.`]}),(0,o.jsx)(r,{lang:`text`,filename:`prompt examples`,code:`Use the gpt-image-2 skill to create a dark technology cover for the GPT88 API docs, with no text.

Use the gpt-image-2 skill to create three social-media background images about AI token usage. Save them under output/imagegen/ and do not overwrite existing files.`}),(0,o.jsx)(`h2`,{id:`best-practices`,children:`Prompt and cost practices`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsx)(`li`,{children:`Start with 1024x1024 and n=1 to validate direction before batch generation.`}),(0,o.jsx)(`li`,{children:`Describe subject, scene, composition, light, material, and exclusions instead of stacking quality adjectives.`}),(0,o.jsx)(`li`,{children:`For posters and UI visuals, reserve clean space for later copy.`}),(0,o.jsx)(`li`,{children:`Use a text model for prompt refinement; call gpt-image-2 only when a real image is needed.`}),(0,o.jsx)(`li`,{children:`Review a prompt list before starting a costly batch.`})]}),(0,o.jsx)(`h2`,{id:`troubleshooting`,children:`Troubleshooting`}),(0,o.jsx)(r,{lang:`text`,filename:`troubleshooting`,code:u}),(0,o.jsxs)(`p`,{children:[`For the underlying API contract, see the `,(0,o.jsx)(t,{to:`/docs/api/images/`,children:`image generation API guide`}),`. For model capabilities, open the `,(0,o.jsx)(t,{to:`/models/gpt-image-2/`,children:`gpt-image-2 model page`}),`.`]})]})}var f=`问题背景：

1. 直接让文本模型“生成图片”通常只是生成提示词或 SVG/HTML 方案，不是真正调用图片模型
2. 如果硬让高级文本模型反复规划、修图、输出复杂视觉描述，成本会明显高于一次图片接口调用
3. Codex 默认更擅长读写代码、运行命令、整理文件，不会自动把每个“画图”请求路由到 gpt-image-2
4. 用 skill 可以把“图片生成”封装成固定工具流程：补全提示词、调用 gpt88.cc Images API、保存图片、返回文件路径`,p=`~/.codex/skills/
└── gpt-image-2/
    └── SKILL.md`,m=`---
name: gpt-image-2
description: 使用 gpt88.cc 的 gpt-image-2 生成图片、海报、插画、UI 视觉稿和头像
tools: Bash
---

# GPT Image 2 Generator

你是一个图片生成助手。当用户要求生成图片、海报、插画、UI、头像、营销图时，优先使用 gpt88.cc 的 OpenAI Images API，而不是让文本模型假装生成图片。

## 默认配置

- Model: gpt-image-2
- Base URL: https://img.gpt88.cc
- Endpoint: /images/generations
- size: 1024x1024
- quality: high
- n: 1

## 执行流程

1. 如果用户只给了短提示词，先补全成高质量视觉描述
2. 使用环境变量 GPT88_API_KEY 作为 API Key
3. 调用 gpt88.cc 的 /v1/images/generations
4. 从返回的 b64_json 解码图片
5. 保存到当前项目的 output/imagegen/ 目录
6. 返回最终图片文件路径

## Bash 示例

\`\`\`bash
mkdir -p output/imagegen

PROMPT="赛博朋克风格的未来城市夜景，霓虹灯，雨夜，电影感，高细节，无文字，无水印"
OUT="output/imagegen/generated.png"

curl -s https://img.gpt88.cc/v1/images/generations \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d "{
    \\"model\\": \\"gpt-image-2\\",
    \\"prompt\\": \\"$PROMPT\\",
    \\"size\\": \\"1024x1024\\",
    \\"quality\\": \\"high\\",
    \\"n\\": 1
  }" > image_response.json

jq -r '.data[0].b64_json' image_response.json | base64 -d > "$OUT"

echo "图片已生成: $OUT"
\`\`\`

## 提示词规则

- 如果用户没指定风格，自动补全画面主体、场景、构图、光线、质感和限制
- 海报类请求要补充“适合社交媒体传播、层次清晰、留出标题区”
- UI 类请求要补充“现代产品界面、清晰信息层级、真实屏幕截图质感”
- 默认避免图片内文字，除非用户明确要求
- 默认加入 no watermark / no logo / no extra text`,h=`# 建议写入 ~/.zshrc、~/.bashrc，或只在当前终端临时 export
export GPT88_API_KEY="sk-你的-gpt88-api-key"

# 可选：如果你的 skill 使用 OPENAI_API_KEY / OPENAI_BASE_URL 风格
export OPENAI_API_KEY="$GPT88_API_KEY"
export OPENAI_BASE_URL="https://img.gpt88.cc"`,g=`mkdir -p output/imagegen

curl -s https://img.gpt88.cc/v1/images/generations \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-image-2",
    "prompt": "极简风格的 API 文档站封面，深色背景，发光线条，科技感，无文字",
    "size": "1024x1024",
    "quality": "high",
    "n": 1
  }' > output/imagegen/response.json

jq -r '.data[0].b64_json' output/imagegen/response.json | base64 -d > output/imagegen/doc-cover.png`,_=`你可以这样对 Codex 说：

使用 gpt-image-2 skill 生成一张“gpt88.cc API 文档站封面”，深色科技风，无文字。

或者：

用 gpt-image-2 skill 生成 3 张社交媒体海报背景，主题是 AI Token 电力，要求无文字、适合后期加标题。`,v=`常见问题：

1. jq: command not found
   安装 jq，或让 Codex 改用 Node/Python 解析 JSON。

2. base64: invalid option -- d
   macOS 可以把 base64 -d 改成 base64 -D。

3. 返回 401
   检查 GPT88_API_KEY 是否存在、是否复制完整、是否有可用余额。

4. 返回空图片
   先查看 image_response.json，确认是不是错误体；不要直接解码空字符串。

5. 生成位置混乱
   统一要求 skill 保存到 output/imagegen/，不要散落在项目根目录。

6. 成本偏高
   先用 1024x1024 / n=1 做草图确认，再提高尺寸、质量或批量生成。`;function y(){let{locale:e}=n();return e===`zh`?(0,o.jsxs)(a,{path:`/docs/guides/codex-gpt-image-2-skill`,title:`Codex 使用 gpt-image-2 Skill 生成图片`,description:`直接使用文本模型生图成本高且不稳定。通过 Codex skill 封装 gpt88.cc 的 gpt-image-2 图片接口，可以让 Codex 用固定流程生成图片并保存到项目目录。`,headings:[{id:`why`,text:`为什么要用 Skill`,level:2},{id:`principle`,text:`实现思路`,level:2},{id:`prepare`,text:`准备 API Key`,level:2},{id:`create-skill`,text:`创建 gpt-image-2 Skill`,level:2},{id:`test`,text:`先用 cURL 验证`,level:2},{id:`use-in-codex`,text:`在 Codex 中使用`,level:2},{id:`best-practices`,text:`提示词与成本建议`,level:2},{id:`troubleshooting`,text:`常见问题排查`,level:2},{id:`next`,text:`下一步`,level:2}],children:[(0,o.jsx)(i,{tone:`tip`,title:`一句话方案`,children:(0,o.jsxs)(`p`,{children:[`不要让文本模型“硬画图”。把图片生成封装成 Codex skill，让 Codex 在需要画图时调用`,(0,o.jsx)(`code`,{children:`gpt-image-2`}),` 图片接口，生成结果保存为真实 PNG 文件。`]})}),(0,o.jsx)(`h2`,{id:`why`,children:`为什么要用 Skill`}),(0,o.jsx)(`p`,{children:`Codex 很适合写代码、改文件、运行命令，但它默认不是图片生成客户端。 当用户说“帮我生成图片”时，如果没有明确工具流程，文本模型往往只能生成提示词、 SVG、HTML/CSS mockup，或者反复描述画面。这类方式既不稳定，也可能因为反复调用高级文本模型而变贵。`}),(0,o.jsx)(r,{lang:`text`,filename:`why skill`,code:f}),(0,o.jsx)(`h2`,{id:`principle`,children:`实现思路`}),(0,o.jsxs)(`p`,{children:[`skill 的作用是把“自然语言画图需求”变成一条稳定的本地执行流程： Codex 先补全提示词，再通过 Bash 调用 gpt88.cc 的图片接口，最后把`,(0,o.jsx)(`code`,{children:`b64_json`}),` 解码成图片文件。`]}),(0,o.jsxs)(`p`,{children:[`推荐统一使用 Base URL `,(0,o.jsx)(`code`,{children:`https://img.gpt88.cc`}),`，图片请求路径为`,(0,o.jsx)(`code`,{children:`/images/generations`}),`。`]}),(0,o.jsx)(`h2`,{id:`prepare`,children:`准备 API Key`}),(0,o.jsxs)(`p`,{children:[`先到`,` `,(0,o.jsx)(`a`,{href:`https://gpt88.cc`,target:`_blank`,rel:`noreferrer`,className:`text-violet-300 hover:text-violet-200`,children:`gpt88.cc 控制台`}),` `,`创建 API Key，然后在本机终端设置环境变量。`]}),(0,o.jsx)(r,{lang:`bash`,filename:`env`,code:h}),(0,o.jsx)(i,{tone:`warn`,title:`不要把 Key 写进仓库`,children:(0,o.jsxs)(`p`,{children:[`教程里的 `,(0,o.jsx)(`code`,{children:`GPT88_API_KEY`}),` 应放在本机环境变量、密钥管理器或 CI Secret 中， 不要提交到 Git 仓库，也不要写进前端代码。`]})}),(0,o.jsx)(`h2`,{id:`create-skill`,children:`创建 gpt-image-2 Skill`}),(0,o.jsxs)(`p`,{children:[`在 Codex 的 skills 目录下创建一个新的 `,(0,o.jsx)(`code`,{children:`gpt-image-2`}),` skill。 目录结构可以保持很小，只有一个 `,(0,o.jsx)(`code`,{children:`SKILL.md`}),` 也能工作。`]}),(0,o.jsx)(r,{lang:`text`,filename:`folder`,code:p}),(0,o.jsxs)(`p`,{children:[`将下面内容保存为 `,(0,o.jsx)(`code`,{children:`~/.codex/skills/gpt-image-2/SKILL.md`}),`：`]}),(0,o.jsx)(r,{lang:`markdown`,filename:`SKILL.md`,code:m}),(0,o.jsx)(`h2`,{id:`test`,children:`先用 cURL 验证`}),(0,o.jsxs)(`p`,{children:[`在真正交给 Codex 自动调用前，建议先手动跑一条最小请求，确认 Key、余额、网络线路和`,(0,o.jsx)(`code`,{children:`jq`}),` / `,(0,o.jsx)(`code`,{children:`base64`}),` 都正常。`]}),(0,o.jsx)(r,{lang:`bash`,filename:`test-gpt-image-2.sh`,code:g}),(0,o.jsx)(`h2`,{id:`use-in-codex`,children:`在 Codex 中使用`}),(0,o.jsxs)(`p`,{children:[`创建 skill 后，重新打开 Codex 或开启新会话。之后你可以直接要求 Codex 使用`,(0,o.jsx)(`code`,{children:`gpt-image-2 skill`}),` 生成图片，并指定主题、风格、尺寸、输出目录。`]}),(0,o.jsx)(r,{lang:`text`,filename:`prompt examples`,code:_}),(0,o.jsxs)(`p`,{children:[`如果你正在做文档站、落地页或产品图，建议明确告诉 Codex： 输出文件保存到 `,(0,o.jsx)(`code`,{children:`output/imagegen/`}),`，不要覆盖旧图，必要时生成`,(0,o.jsx)(`code`,{children:`-v2`}),`、`,(0,o.jsx)(`code`,{children:`-v3`}),` 版本。`]}),(0,o.jsx)(`h2`,{id:`best-practices`,children:`提示词与成本建议`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsxs)(`li`,{children:[`先用 `,(0,o.jsx)(`code`,{children:`1024x1024`}),`、`,(0,o.jsx)(`code`,{children:`n=1`}),` 试方向，确认风格后再批量生成。`]}),(0,o.jsx)(`li`,{children:`默认加上“无文字、无水印、无 logo”，避免图片里出现难以编辑的伪文字。`}),(0,o.jsx)(`li`,{children:`海报背景和 UI 视觉稿要预留标题区，不要让主体占满整张图。`}),(0,o.jsxs)(`li`,{children:[`如果只是要优化提示词，使用文本模型即可；如果要真实图片文件，再调用 `,(0,o.jsx)(`code`,{children:`gpt-image-2`}),`。`]}),(0,o.jsx)(`li`,{children:`批量生成前先让 Codex 输出 prompts 清单，人工确认后再跑，避免一次性烧掉不必要成本。`})]}),(0,o.jsx)(`h2`,{id:`troubleshooting`,children:`常见问题排查`}),(0,o.jsx)(r,{lang:`text`,filename:`troubleshooting`,code:v}),(0,o.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,o.jsxs)(`ul`,{children:[(0,o.jsxs)(`li`,{children:[`查看 `,(0,o.jsx)(t,{to:`/docs/api/images/`,children:`Google 图片生成 API`}),`，了解另一类 Gemini / NanoBanana2 图片接口。`]}),(0,o.jsxs)(`li`,{children:[`到 `,(0,o.jsx)(t,{to:`/models/gpt-image-2/`,children:`gpt-image-2 模型页`}),` 查看模型能力和调用说明。`]}),(0,o.jsxs)(`li`,{children:[`如果你还需要 Codex 插件能力，参考`,` `,(0,o.jsx)(t,{to:`/docs/guides/codex-plugins-oauth/`,children:`Codex 插件与 ChatGPT OAuth 登录`}),`。`]}),(0,o.jsxs)(`li`,{children:[`Codex 入门、CLI 配置和工作流实践可参考`,` `,(0,o.jsx)(`a`,{href:`https://github.com/freestylefly/CodexGuide`,target:`_blank`,rel:`noreferrer`,children:`freestylefly/CodexGuide`}),`。`]})]})]}):(0,o.jsx)(d,{})}export{y as default};