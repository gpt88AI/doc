import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{d as n,s as r}from"./Seo-DGocodvz.js";import{t as i}from"./CodeBlock-6HZkGMv-.js";import{c as a,s as o}from"./index-ivPh6OuT.js";var s=e(),c=`1. Sign in to the gpt88.cc console
2. Create one API key and store the full value immediately
3. Choose the protocol style: OpenAI compatible / Claude compatible / native Gemini image API
4. Fill in Base URL, API key, and default model in your tool
5. Send one minimal request, then verify usage and billing in the console`,l=`OpenAI-compatible tools
  Base URL: https://api.gpt88.cc
  Typical tools: OpenAI SDK, Codex CLI, Cursor, OpenCode, cURL

Claude / Anthropic-compatible tools
  Base URL: https://api.gpt88.cc
  Typical tools: Claude Code, Anthropic SDK, OpenClaw

Google / Gemini image generation
  Base URL: https://img.gpt88.cc
  Endpoint: /v1beta/models/{MODEL}:generateContent

Use the standard API URL for normal APIs and the media URL for image/video requests; protocol differences are handled by endpoint paths and request formats`,u=`export GPT88_API_KEY="sk-your-gpt88-api-key"

curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-haiku-4-5-20251001",
    "messages": [
      {"role": "user", "content": "Introduce gpt88.cc in one sentence"}
    ]
  }'`,d=`export OPENAI_API_KEY="$GPT88_API_KEY"
export OPENAI_BASE_URL="https://api.gpt88.cc"`,f=`export ANTHROPIC_AUTH_TOKEN="$GPT88_API_KEY"
export ANTHROPIC_BASE_URL="https://api.gpt88.cc"
export ANTHROPIC_API_KEY="$GPT88_API_KEY"`,p=`model_provider = "OpenAI"
model = "gpt-5.5"
review_model = "gpt-5.5"
model_reasoning_effort = "high"

[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.gpt88.cc"
wire_api = "responses"
requires_openai_auth = true`,m=`{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.gpt88.cc",
    "ANTHROPIC_AUTH_TOKEN": "your gpt88.cc API key",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0"
  }
}`,h=`When one request looks too expensive, check in this order:

1. Model choice: did you use a more expensive model than intended?
2. Input tokens: long chats, code context, and tool results inflate prompts quickly
3. Output tokens: longer responses cost more
4. API type: image, audio, and video are not always pure token billing
5. API key: did one client or script loop unexpectedly?
6. request_id: always keep it if support needs to investigate`,g=`401 invalid_api_key
  Check Bearer auth format, key completeness, and whether it is a real gpt88.cc key.

403 permission_denied
  The current key does not have access to the model or endpoint.

429 rate_limit_exceeded
  Lower concurrency and retry according to Retry-After or retry_after_seconds.

429 insufficient_quota
  Balance or quota is exhausted.

404 model_not_found
  The model name is wrong or unavailable. Refresh with GET /v1/models.

413 payload_too_large
  Reduce payload size, shorten message history, or compress the image.

503 service_unavailable / upstream_error
  Retry with backoff or switch model / route if necessary.

Slow requests
  Separate network latency, model latency, long context, and slow first-token delay.`;function _(){return(0,s.jsxs)(a,{path:`/docs/guides/complete-integration`,title:`Complete Integration Guide`,description:`Run the full gpt88.cc integration path from API key creation and Base URL selection to client setup, usage checks, and troubleshooting.`,headings:[{id:`goal`,text:`What this guide solves`,level:2},{id:`five-steps`,text:`Finish the first integration in 5 steps`,level:2},{id:`base-url`,text:`Base URL rules`,level:2},{id:`clients`,text:`Client-specific setup`,level:2},{id:`codex-cli`,text:`Codex CLI`,level:3},{id:`claude-code`,text:`Claude Code`,level:3},{id:`openai-sdk`,text:`OpenAI SDK / Cursor / OpenCode`,level:3},{id:`usage`,text:`Usage and cost checks`,level:2},{id:`errors`,text:`Common error quick reference`,level:2},{id:`best-practices`,text:`Best practices before production`,level:2},{id:`next`,text:`Next steps`,level:2}],children:[(0,s.jsx)(o,{tone:`info`,title:`Best starting point for first-time or migration users`,children:(0,s.jsx)(`p`,{children:`If you are moving from another relay service, from the official OpenAI or Anthropic APIs, or from tools such as Claude Code, Codex CLI, Cursor, or OpenCode, use this guide to run one end-to-end setup before optimizing anything else.`})}),(0,s.jsx)(`h2`,{id:`goal`,children:`What this guide solves`}),(0,s.jsx)(`p`,{children:`Most failed integrations are not caused by the model itself. They come from mismatched Base URL shape, wrong environment variables, incorrect API key permissions, or missing usage / rate-limit checks. This page connects those steps into one working path: make one request succeed first, then tune the client.`}),(0,s.jsx)(`h2`,{id:`five-steps`,children:`Finish the first integration in 5 steps`}),(0,s.jsx)(i,{lang:`text`,filename:`integration-flow`,code:c}),(0,s.jsx)(`p`,{children:`The fastest validation path is still one minimal cURL request. If cURL succeeds, your key, balance, model, and route are usually fine. If a client still fails, debug the client config next.`}),(0,s.jsx)(i,{lang:`bash`,filename:`smoke-test.sh`,code:u}),(0,s.jsx)(`h2`,{id:`base-url`,children:`Base URL rules`}),(0,s.jsx)(`p`,{children:`Decide based on the client protocol, not only on the model family name.`}),(0,s.jsx)(i,{lang:`text`,filename:`base-url-rules`,code:l}),(0,s.jsx)(`h2`,{id:`clients`,children:`Client-specific setup`}),(0,s.jsxs)(`p`,{children:[`The shortest mental model is simple: OpenAI-style tools usually need `,(0,s.jsx)(`code`,{children:`/v1`}),`; Claude-style tools usually do not.`]}),(0,s.jsx)(`h3`,{id:`codex-cli`,children:`Codex CLI`}),(0,s.jsx)(`p`,{children:`Codex CLI is an OpenAI-style client. Give it a dedicated key and a separate budget where possible.`}),(0,s.jsx)(i,{lang:`toml`,filename:`~/.codex/config.toml`,code:p}),(0,s.jsx)(i,{lang:`bash`,filename:`openai-env`,code:d}),(0,s.jsx)(`h3`,{id:`claude-code`,children:`Claude Code`}),(0,s.jsxs)(`p`,{children:[`Claude Code follows the Anthropic-style path with `,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`}),`. Use`,(0,s.jsx)(`code`,{children:`https://img.gpt88.cc`}),` for image and video requests.`]}),(0,s.jsx)(i,{lang:`json`,filename:`~/.claude/settings.json`,code:m}),(0,s.jsx)(i,{lang:`bash`,filename:`anthropic-env`,code:f}),(0,s.jsx)(`h3`,{id:`openai-sdk`,children:`OpenAI SDK / Cursor / OpenCode`}),(0,s.jsxs)(`p`,{children:[`These clients usually only need two fields changed: `,(0,s.jsx)(`code`,{children:`base_url`}),` and `,(0,s.jsx)(`code`,{children:`api_key`}),`. If the client supports a custom OpenAI provider, choose the OpenAI-compatible option directly.`]}),(0,s.jsxs)(`p`,{children:[`For full runnable examples, continue with`,` `,(0,s.jsx)(t,{to:r(`/docs/sdk/python/`,`en`),children:`Python SDK`}),` and`,` `,(0,s.jsx)(t,{to:r(`/docs/sdk/nodejs/`,`en`),children:`Node.js SDK`}),`.`]}),(0,s.jsx)(`h2`,{id:`usage`,children:`Usage and cost checks`}),(0,s.jsx)(`p`,{children:`After the first working request, go to the console and verify what really happened: which model was used, how many tokens were counted, which API key made the call, and whether the deduction matches your expectation.`}),(0,s.jsx)(i,{lang:`text`,filename:`usage-checklist`,code:h}),(0,s.jsx)(`h2`,{id:`errors`,children:`Common error quick reference`}),(0,s.jsx)(i,{lang:`text`,filename:`error-quick-reference`,code:g}),(0,s.jsxs)(`p`,{children:[`For full HTTP and business error mappings, see`,` `,(0,s.jsx)(t,{to:r(`/docs/api/errors/`,`en`),children:`Error Codes`}),`.`]}),(0,s.jsx)(`h2`,{id:`best-practices`,children:`Best practices before production`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`Use separate API keys for production, staging, and local development.`}),(0,s.jsxs)(`li`,{children:[`Name keys by purpose, such as `,(0,s.jsx)(`code`,{children:`codex-macbook`}),` or `,(0,s.jsx)(`code`,{children:`web-prod`}),`.`]}),(0,s.jsx)(`li`,{children:`Keep keys only in server-side environment variables or secret managers.`}),(0,s.jsx)(`li`,{children:`Set daily limits, concurrency controls, and alerting before production rollout.`}),(0,s.jsxs)(`li`,{children:[`Log `,(0,s.jsx)(`code`,{children:`request_id`}),` server-side for future debugging.`]}),(0,s.jsxs)(`li`,{children:[`Refresh model lists from `,(0,s.jsx)(`code`,{children:`GET /v1/models`}),` instead of hardcoding assumptions forever.`]})]}),(0,s.jsx)(`h2`,{id:`next`,children:`Next steps`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/quickstart/`,`en`),children:`Quickstart`}),` if you only need the shortest path.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/guides/config-export/`,`en`),children:`Config Export`}),` if you want reusable tool configs.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/docs/auth/`,`en`),children:`Auth & Billing`}),` for RMB balance and usage semantics.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(t,{to:r(`/models/`,`en`),children:`Models`}),` if you need model selection next.`]})]})]})}var v=`1. 注册并登录 gpt88.cc 控制台
2. 创建一把 API Key，并立刻保存完整 Key
3. 选择接入风格：OpenAI 兼容 / Claude 兼容 / Gemini 原生图片
4. 按工具填入 Base URL、API Key、默认模型
5. 发一条最小请求，再到控制台核对用量与扣费`,y=`OpenAI 兼容工具
  Base URL: https://api.gpt88.cc
  典型工具: OpenAI SDK、Codex CLI、Cursor、OpenCode、cURL

Claude / Anthropic 兼容工具
  Base URL: https://api.gpt88.cc
  典型工具: Claude Code、Anthropic SDK、OpenClaw

Google / Gemini 图片生成
  Base URL: https://img.gpt88.cc
  Endpoint: /v1beta/models/{MODEL}:generateContent

标准 API 与图片 / 视频直连分别使用以上首页地址，协议差异通过 endpoint 和请求格式处理`,b=`export GPT88_API_KEY="sk-你的-gpt88-api-key"

curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-haiku-4-5-20251001",
    "messages": [
      {"role": "user", "content": "用一句话介绍 gpt88.cc"}
    ]
  }'`,x=`# OpenAI 风格客户端常见环境变量
export OPENAI_API_KEY="$GPT88_API_KEY"
export OPENAI_BASE_URL="https://api.gpt88.cc"`,S=`# Claude / Anthropic 风格客户端常见环境变量
export ANTHROPIC_AUTH_TOKEN="$GPT88_API_KEY"
export ANTHROPIC_BASE_URL="https://api.gpt88.cc"

# 如果客户端读取 ANTHROPIC_API_KEY，也可以同步设置
export ANTHROPIC_API_KEY="$GPT88_API_KEY"`,C=`# ~/.codex/config.toml
model_provider = "OpenAI"
model = "gpt-5.5"
review_model = "gpt-5.5"
model_reasoning_effort = "high"

[model_providers.OpenAI]
name = "OpenAI"
base_url = "https://api.gpt88.cc"
wire_api = "responses"
requires_openai_auth = true`,w=`// ~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.gpt88.cc",
    "ANTHROPIC_AUTH_TOKEN": "你的 gpt88.cc API Key",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0"
  }
}`,T=`排查一次请求为什么贵，按这个顺序看：

1. 看模型：是不是用了更贵的大模型
2. 看输入 Token：长对话、代码上下文、工具结果会快速堆高 prompt
3. 看输出 Token：模型输出越长，成本越高
4. 看接口类型：图片、音频、视频可能不是纯 token 计费
5. 看 API Key：是不是某个客户端或脚本在循环调用
6. 看 request_id：需要客服排查时一定要带上`,E=`401 invalid_api_key
  检查 Authorization 是否带 Bearer、Key 是否完整、是否用了 gpt88.cc 的 Key。

403 permission_denied
  当前 Key 没有该模型或接口权限，到控制台检查模型权限。

429 rate_limit_exceeded
  触发限速或额度保护，降低并发，按 Retry-After 或 retry_after_seconds 重试。

429 insufficient_quota
  余额或额度不足，到控制台充值或调整配额。

404 model_not_found
  模型名拼错或已下架，先调用 GET /v1/models 刷新本地模型列表。

413 payload_too_large
  请求体过大，压缩图片、裁剪历史消息或拆分请求。

503 service_unavailable / upstream_error
  上游拥塞或临时不可用，退避重试，必要时换模型或线路。

请求很慢
  先区分是网络慢、模型慢、上下文太长，还是流式首 token 慢。`;function D({headers:e,rows:t}){return(0,s.jsx)(`div`,{className:`not-prose my-6 overflow-x-auto rounded-lg border border-white/5`,children:(0,s.jsxs)(`table`,{className:`w-full min-w-[44rem] text-left text-sm`,children:[(0,s.jsx)(`thead`,{className:`bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400`,children:(0,s.jsx)(`tr`,{children:e.map(e=>(0,s.jsx)(`th`,{className:`px-4 py-2.5 font-medium`,children:e},e))})}),(0,s.jsx)(`tbody`,{children:t.map((e,t)=>(0,s.jsx)(`tr`,{className:`border-t border-white/5 align-top`+(t%2==1?` bg-white/[0.012]`:``),children:e.map((e,t)=>(0,s.jsx)(`td`,{className:`px-4 py-3 text-[13px] leading-relaxed text-ink-200`,children:e},t))},t))})]})})}function O(){let{locale:e}=n();return e===`en`?(0,s.jsx)(_,{}):(0,s.jsxs)(a,{path:`/docs/guides/complete-integration`,title:`完整接入手册`,description:`从注册、API Key、Base URL、客户端配置、用量核对到错误排查，一篇教程跑通 gpt88.cc 的完整接入流程。`,headings:[{id:`goal`,text:`这篇手册解决什么问题`,level:2},{id:`five-steps`,text:`5 步完成第一次接入`,level:2},{id:`concepts`,text:`先理解 6 个核心概念`,level:2},{id:`base-url`,text:`Base URL 选择规则`,level:2},{id:`clients`,text:`按客户端接入`,level:2},{id:`codex-cli`,text:`Codex CLI`,level:3},{id:`claude-code`,text:`Claude Code`,level:3},{id:`openai-sdk`,text:`OpenAI SDK / Cursor / OpenCode`,level:3},{id:`usage`,text:`用量记录与成本排查`,level:2},{id:`errors`,text:`常见错误速查`,level:2},{id:`best-practices`,text:`上线前最佳实践`,level:2},{id:`next`,text:`下一步`,level:2}],children:[(0,s.jsx)(o,{tone:`info`,title:`适合第一次接入或迁移用户`,children:(0,s.jsx)(`p`,{children:`如果你正在从其他中转站、官方 OpenAI / Anthropic API、Claude Code、Codex CLI、 Cursor 或 OpenCode 迁移到 gpt88.cc，可以先按本文完成一遍端到端接入。`})}),(0,s.jsx)(`h2`,{id:`goal`,children:`这篇手册解决什么问题`}),(0,s.jsxs)(`p`,{children:[`很多接入问题不是模型本身导致的，而是 `,(0,s.jsx)(`strong`,{children:`Base URL 形态`}),`、`,(0,s.jsx)(`strong`,{children:`客户端读取的环境变量`}),`、`,(0,s.jsx)(`strong`,{children:`API Key 权限`}),`、`,(0,s.jsx)(`strong`,{children:`用量与限速配置`}),` 没有对齐。本文把这些问题串成一条路径： 先跑通，再分工具接入，最后学会看用量和排错。`]}),(0,s.jsx)(`h2`,{id:`five-steps`,children:`5 步完成第一次接入`}),(0,s.jsx)(i,{lang:`text`,filename:`integration flow`,code:v}),(0,s.jsx)(`p`,{children:`最快的验证方式是先用 cURL 发一条最小请求。只要 cURL 能通，说明 Key、余额、模型和线路基本可用； 如果某个客户端失败，再回头检查客户端配置。`}),(0,s.jsx)(i,{lang:`bash`,filename:`smoke-test.sh`,code:b}),(0,s.jsx)(`h2`,{id:`concepts`,children:`先理解 6 个核心概念`}),(0,s.jsx)(D,{headers:[`概念`,`你需要知道什么`,`常见误区`],rows:[[(0,s.jsx)(`strong`,{children:`控制台`},`c1`),`创建 API Key、查看余额、管理用量、配置模型权限和线路。`,`不要把控制台登录态当成 API Key，服务端调用仍要 Bearer Token。`],[(0,s.jsx)(`strong`,{children:`API Key`},`c2`),`每个项目、客户端或环境建议单独建 Key，方便停用、限额和查账。`,`不要多个团队共用一把 Key，否则用量和事故很难定位。`],[(0,s.jsx)(`strong`,{children:`Base URL`},`c3`),`标准 API 使用 https://api.gpt88.cc；图片和视频直连使用 https://img.gpt88.cc。OpenAI 与 Claude / Anthropic 还会在路径和请求格式上有所不同。`,`不要为不同协议切换 Base URL，按工具要求选择对应 endpoint 和请求字段。`],[(0,s.jsx)(`strong`,{children:`模型 ID`},`c4`),`请求体里的 model 必须使用当前账号可用的真实模型 ID。`,`凭记忆手打模型名容易 404，建议从模型导航或 /v1/models 复制。`],[(0,s.jsx)(`strong`,{children:`Token 电力`},`c5`),`gpt88.cc 按官方 API 用量乘所选分组倍率计算人民币扣费。`,`请求前查看 API 密钥页面的分组倍率和对应上游线路。`],[(0,s.jsx)(`strong`,{children:`Request ID`},`c6`),`每次请求的唯一标识，排查扣费、延迟、上游错误时非常关键。`,`联系客服只说“报错了”很难定位，最好带时间、模型、Key 后缀和 request_id。`]]}),(0,s.jsx)(`h2`,{id:`base-url`,children:`Base URL 选择规则`}),(0,s.jsx)(`p`,{children:`先判断你的工具原本是 OpenAI 风格，还是 Claude / Anthropic 风格。不要只看模型名字， 要看客户端期待的接口路径。`}),(0,s.jsx)(i,{lang:`text`,filename:`base-url-rules`,code:y}),(0,s.jsx)(`h2`,{id:`clients`,children:`按客户端接入`}),(0,s.jsx)(D,{headers:[`客户端`,`接口风格`,`推荐 Base URL`,`关键配置`],rows:[[`cURL`,`OpenAI 兼容`,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`},`curl`),`最快验证连通性，适合排查 Key 和模型。`],[`OpenAI Python / Node SDK`,`OpenAI 兼容`,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`},`sdk`),`只改 base_url / baseURL 和 api_key。`],[`Codex CLI`,`OpenAI 兼容`,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`},`codex`),`配置 ~/.codex/config.toml 和 ~/.codex/auth.json。`],[`Cursor / OpenCode`,`OpenAI 兼容`,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`},`cursor`),`选择 OpenAI compatible provider，填 gpt88 Key。`],[`Claude Code`,`Claude 兼容`,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`},`claude`),`设置 ANTHROPIC_BASE_URL 和 ANTHROPIC_AUTH_TOKEN。`],[`Gemini 图片生成`,`Gemini 原生`,(0,s.jsx)(`code`,{children:`https://img.gpt88.cc`},`gemini`),`调用 /v1beta/models/:generateContent。`]]}),(0,s.jsx)(`h3`,{id:`codex-cli`,children:`Codex CLI`}),(0,s.jsx)(`p`,{children:`Codex CLI 属于 OpenAI 风格客户端。建议单独创建一把 Key，并给它设置合理限额，避免 Agent 循环调用导致预算失控。`}),(0,s.jsx)(i,{lang:`toml`,filename:`~/.codex/config.toml`,code:C}),(0,s.jsx)(i,{lang:`bash`,filename:`openai env`,code:x}),(0,s.jsx)(`h3`,{id:`claude-code`,children:`Claude Code`}),(0,s.jsxs)(`p`,{children:[`Claude Code 使用 Anthropic 风格接口，Base URL 填写 `,(0,s.jsx)(`code`,{children:`https://api.gpt88.cc`}),`；图片和视频任务请使用`,(0,s.jsx)(`code`,{children:`https://img.gpt88.cc`}),`。 如果你发现它仍然要求 OAuth 登录，先确认是否读到了自定义环境变量。`]}),(0,s.jsx)(i,{lang:`json`,filename:`~/.claude/settings.json`,code:w}),(0,s.jsx)(i,{lang:`bash`,filename:`anthropic env`,code:S}),(0,s.jsx)(`h3`,{id:`openai-sdk`,children:`OpenAI SDK / Cursor / OpenCode`}),(0,s.jsxs)(`p`,{children:[`这些工具通常只需要两个字段：`,(0,s.jsx)(`code`,{children:`base_url`}),` 和 `,(0,s.jsx)(`code`,{children:`api_key`}),`。 如果它们支持自定义 OpenAI provider，就优先选择 OpenAI compatible，而不是写死官方 OpenAI endpoint。`]}),(0,s.jsxs)(`p`,{children:[`更完整的 Python / Node 示例见 `,(0,s.jsx)(t,{to:`/docs/sdk/python/`,children:`Python SDK`}),` 和`,` `,(0,s.jsx)(t,{to:`/docs/sdk/nodejs/`,children:`Node.js SDK`}),`。`]}),(0,s.jsx)(`h2`,{id:`usage`,children:`用量记录与成本排查`}),(0,s.jsx)(`p`,{children:`跑通之后，下一步不是马上上生产，而是去控制台查看这次请求的用量记录： 确认模型、Token、扣费来源、API Key、接口类型是否符合预期。`}),(0,s.jsx)(i,{lang:`text`,filename:`usage checklist`,code:T}),(0,s.jsx)(o,{tone:`tip`,title:`给每个客户端单独建 Key`,children:(0,s.jsx)(`p`,{children:`单独 Key 的好处是非常现实的：某个 IDE 插件、Agent 脚本或服务端任务突然暴增用量时， 你可以立刻停用那一把 Key，而不会影响其他项目。`})}),(0,s.jsx)(`h2`,{id:`errors`,children:`常见错误速查`}),(0,s.jsx)(i,{lang:`text`,filename:`error quick reference`,code:E}),(0,s.jsxs)(`p`,{children:[`完整错误结构、HTTP 状态码和重试策略见 `,(0,s.jsx)(t,{to:`/docs/api/errors/`,children:`错误码`}),`。`]}),(0,s.jsx)(`h2`,{id:`best-practices`,children:`上线前最佳实践`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsx)(`li`,{children:`生产、测试、本地开发分别使用不同 API Key。`}),(0,s.jsxs)(`li`,{children:[`每个 Key 设置用途名称，例如 `,(0,s.jsx)(`code`,{children:`codex-macbook`}),`、`,(0,s.jsx)(`code`,{children:`web-prod`}),`。`]}),(0,s.jsx)(`li`,{children:`服务端使用环境变量或 Secret Manager，不要把 Key 写进前端。`}),(0,s.jsx)(`li`,{children:`上线前设置日限额、并发控制和失败告警。`}),(0,s.jsx)(`li`,{children:`长任务和 Agent 工作流默认开启流式输出，并设置 60-180 秒超时。`}),(0,s.jsxs)(`li`,{children:[`记录 `,(0,s.jsx)(`code`,{children:`request_id`}),`，把它写入服务端日志，方便后续排查。`]}),(0,s.jsxs)(`li`,{children:[`从 `,(0,s.jsx)(`code`,{children:`GET /v1/models`}),` 动态刷新模型列表，避免模型下架后客户端继续请求。`]})]}),(0,s.jsx)(`h2`,{id:`next`,children:`下一步`}),(0,s.jsxs)(`ul`,{children:[(0,s.jsxs)(`li`,{children:[`只想快速跑通：看 `,(0,s.jsx)(t,{to:`/docs/quickstart/`,children:`快速开始`}),`。`]}),(0,s.jsxs)(`li`,{children:[`想把配置导入 Claude Code / Cursor / Codex：看`,` `,(0,s.jsx)(t,{to:`/docs/guides/config-export/`,children:`配置文件导出`}),`。`]}),(0,s.jsxs)(`li`,{children:[`想理解人民币余额和 Token 电力：看 `,(0,s.jsx)(t,{to:`/docs/auth/`,children:`认证与计费`}),`。`]}),(0,s.jsxs)(`li`,{children:[`想挑模型：去 `,(0,s.jsx)(t,{to:`/models/`,children:`模型导航`}),`。`]})]})]})}export{O as default};