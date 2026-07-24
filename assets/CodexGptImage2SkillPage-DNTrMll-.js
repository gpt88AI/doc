import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{t as n}from"./CodeBlock-6HZkGMv-.js";import{c as r,s as i}from"./index-ivPh6OuT.js";var a=e(),o=`问题背景：

1. 直接让文本模型“生成图片”通常只是生成提示词或 SVG/HTML 方案，不是真正调用图片模型
2. 如果硬让高级文本模型反复规划、修图、输出复杂视觉描述，成本会明显高于一次图片接口调用
3. Codex 默认更擅长读写代码、运行命令、整理文件，不会自动把每个“画图”请求路由到 gpt-image-2
4. 用 skill 可以把“图片生成”封装成固定工具流程：补全提示词、调用 gpt88.cc Images API、保存图片、返回文件路径`,s=`~/.codex/skills/
└── gpt-image-2/
    └── SKILL.md`,c=`---
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
- 默认加入 no watermark / no logo / no extra text`,l=`# 建议写入 ~/.zshrc、~/.bashrc，或只在当前终端临时 export
export GPT88_API_KEY="sk-你的-gpt88-api-key"

# 可选：如果你的 skill 使用 OPENAI_API_KEY / OPENAI_BASE_URL 风格
export OPENAI_API_KEY="$GPT88_API_KEY"
export OPENAI_BASE_URL="https://img.gpt88.cc"`,u=`mkdir -p output/imagegen

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

jq -r '.data[0].b64_json' output/imagegen/response.json | base64 -d > output/imagegen/doc-cover.png`,d=`你可以这样对 Codex 说：

使用 gpt-image-2 skill 生成一张“gpt88.cc API 文档站封面”，深色科技风，无文字。

或者：

用 gpt-image-2 skill 生成 3 张社交媒体海报背景，主题是 AI Token 电力，要求无文字、适合后期加标题。`,f=`常见问题：

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
   先用 1024x1024 / n=1 做草图确认，再提高尺寸、质量或批量生成。`;function p(){return(0,a.jsxs)(r,{path:`/docs/guides/codex-gpt-image-2-skill`,title:`Codex 使用 gpt-image-2 Skill 生成图片`,description:`直接使用文本模型生图成本高且不稳定。通过 Codex skill 封装 gpt88.cc 的 gpt-image-2 图片接口，可以让 Codex 用固定流程生成图片并保存到项目目录。`,headings:[{id:`why`,text:`为什么要用 Skill`,level:2},{id:`principle`,text:`实现思路`,level:2},{id:`prepare`,text:`准备 API Key`,level:2},{id:`create-skill`,text:`创建 gpt-image-2 Skill`,level:2},{id:`test`,text:`先用 cURL 验证`,level:2},{id:`use-in-codex`,text:`在 Codex 中使用`,level:2},{id:`best-practices`,text:`提示词与成本建议`,level:2},{id:`troubleshooting`,text:`常见问题排查`,level:2},{id:`next`,text:`下一步`,level:2}],children:[(0,a.jsx)(i,{tone:`tip`,title:`一句话方案`,children:(0,a.jsxs)(`p`,{children:[`不要让文本模型“硬画图”。把图片生成封装成 Codex skill，让 Codex 在需要画图时调用`,(0,a.jsx)(`code`,{children:`gpt-image-2`}),` 图片接口，生成结果保存为真实 PNG 文件。`]})}),(0,a.jsx)(`h2`,{id:`why`,children:`为什么要用 Skill`}),(0,a.jsx)(`p`,{children:`Codex 很适合写代码、改文件、运行命令，但它默认不是图片生成客户端。 当用户说“帮我生成图片”时，如果没有明确工具流程，文本模型往往只能生成提示词、 SVG、HTML/CSS mockup，或者反复描述画面。这类方式既不稳定，也可能因为反复调用高级文本模型而变贵。`}),(0,a.jsx)(n,{lang:`text`,filename:`why skill`,code:o}),(0,a.jsx)(`h2`,{id:`principle`,children:`实现思路`}),(0,a.jsxs)(`p`,{children:[`skill 的作用是把“自然语言画图需求”变成一条稳定的本地执行流程： Codex 先补全提示词，再通过 Bash 调用 gpt88.cc 的图片接口，最后把`,(0,a.jsx)(`code`,{children:`b64_json`}),` 解码成图片文件。`]}),(0,a.jsxs)(`p`,{children:[`推荐统一使用 Base URL `,(0,a.jsx)(`code`,{children:`https://img.gpt88.cc`}),`，图片请求路径为`,(0,a.jsx)(`code`,{children:`/images/generations`}),`。`]}),(0,a.jsx)(`h2`,{id:`prepare`,children:`准备 API Key`}),(0,a.jsxs)(`p`,{children:[`先到`,` `,(0,a.jsx)(`a`,{href:`https://gpt88.cc`,target:`_blank`,rel:`noreferrer`,className:`text-violet-300 hover:text-violet-200`,children:`gpt88.cc 控制台`}),` `,`创建 API Key，然后在本机终端设置环境变量。`]}),(0,a.jsx)(n,{lang:`bash`,filename:`env`,code:l}),(0,a.jsx)(i,{tone:`warn`,title:`不要把 Key 写进仓库`,children:(0,a.jsxs)(`p`,{children:[`教程里的 `,(0,a.jsx)(`code`,{children:`GPT88_API_KEY`}),` 应放在本机环境变量、密钥管理器或 CI Secret 中， 不要提交到 Git 仓库，也不要写进前端代码。`]})}),(0,a.jsx)(`h2`,{id:`create-skill`,children:`创建 gpt-image-2 Skill`}),(0,a.jsxs)(`p`,{children:[`在 Codex 的 skills 目录下创建一个新的 `,(0,a.jsx)(`code`,{children:`gpt-image-2`}),` skill。 目录结构可以保持很小，只有一个 `,(0,a.jsx)(`code`,{children:`SKILL.md`}),` 也能工作。`]}),(0,a.jsx)(n,{lang:`text`,filename:`folder`,code:s}),(0,a.jsxs)(`p`,{children:[`将下面内容保存为 `,(0,a.jsx)(`code`,{children:`~/.codex/skills/gpt-image-2/SKILL.md`}),`：`]}),(0,a.jsx)(n,{lang:`markdown`,filename:`SKILL.md`,code:c}),(0,a.jsx)(`h2`,{id:`test`,children:`先用 cURL 验证`}),(0,a.jsxs)(`p`,{children:[`在真正交给 Codex 自动调用前，建议先手动跑一条最小请求，确认 Key、余额、网络线路和`,(0,a.jsx)(`code`,{children:`jq`}),` / `,(0,a.jsx)(`code`,{children:`base64`}),` 都正常。`]}),(0,a.jsx)(n,{lang:`bash`,filename:`test-gpt-image-2.sh`,code:u}),(0,a.jsx)(`h2`,{id:`use-in-codex`,children:`在 Codex 中使用`}),(0,a.jsxs)(`p`,{children:[`创建 skill 后，重新打开 Codex 或开启新会话。之后你可以直接要求 Codex 使用`,(0,a.jsx)(`code`,{children:`gpt-image-2 skill`}),` 生成图片，并指定主题、风格、尺寸、输出目录。`]}),(0,a.jsx)(n,{lang:`text`,filename:`prompt examples`,code:d}),(0,a.jsxs)(`p`,{children:[`如果你正在做文档站、落地页或产品图，建议明确告诉 Codex： 输出文件保存到 `,(0,a.jsx)(`code`,{children:`output/imagegen/`}),`，不要覆盖旧图，必要时生成`,(0,a.jsx)(`code`,{children:`-v2`}),`、`,(0,a.jsx)(`code`,{children:`-v3`}),` 版本。`]}),(0,a.jsx)(`h2`,{id:`best-practices`,children:`提示词与成本建议`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsxs)(`li`,{children:[`先用 `,(0,a.jsx)(`code`,{children:`1024x1024`}),`、`,(0,a.jsx)(`code`,{children:`n=1`}),` 试方向，确认风格后再批量生成。`]}),(0,a.jsx)(`li`,{children:`默认加上“无文字、无水印、无 logo”，避免图片里出现难以编辑的伪文字。`}),(0,a.jsx)(`li`,{children:`海报背景和 UI 视觉稿要预留标题区，不要让主体占满整张图。`}),(0,a.jsxs)(`li`,{children:[`如果只是要优化提示词，使用文本模型即可；如果要真实图片文件，再调用 `,(0,a.jsx)(`code`,{children:`gpt-image-2`}),`。`]}),(0,a.jsx)(`li`,{children:`批量生成前先让 Codex 输出 prompts 清单，人工确认后再跑，避免一次性烧掉不必要成本。`})]}),(0,a.jsx)(`h2`,{id:`troubleshooting`,children:`常见问题排查`}),(0,a.jsx)(n,{lang:`text`,filename:`troubleshooting`,code:f}),(0,a.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsxs)(`li`,{children:[`查看 `,(0,a.jsx)(t,{to:`/docs/api/images/`,children:`Google 图片生成 API`}),`，了解另一类 Gemini / NanoBanana2 图片接口。`]}),(0,a.jsxs)(`li`,{children:[`到 `,(0,a.jsx)(t,{to:`/models/gpt-image-2/`,children:`gpt-image-2 模型页`}),` 查看模型能力和调用说明。`]}),(0,a.jsxs)(`li`,{children:[`如果你还需要 Codex 插件能力，参考`,` `,(0,a.jsx)(t,{to:`/docs/guides/codex-plugins-oauth/`,children:`Codex 插件与 ChatGPT OAuth 登录`}),`。`]}),(0,a.jsxs)(`li`,{children:[`Codex 入门、CLI 配置和工作流实践可参考`,` `,(0,a.jsx)(`a`,{href:`https://github.com/freestylefly/CodexGuide`,target:`_blank`,rel:`noreferrer`,children:`freestylefly/CodexGuide`}),`。`]})]})]})}export{p as default};