> **GPT88 使用说明**
> 配置界面、客户端字段和连通性检查以 GPT88 当前接入文档为准。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## Gemini 4 Argon 配置教程：Codex、Cherry Studio 与 API

GPT88已上线 gemini-4-argon，通过「Gemini」分组令牌调用。聊天可使用 Cherry Studio；编程可使用 Codex，本站提供 Responses 工具调用兼容。下面分别说明令牌、地址、密钥、客户端和程序接入。模型 ID 必须填写 gemini-4-argon，不带空格或隐藏字符。

## 1. 适合在哪里使用

- 日常聊天：Cherry Studio 等支持 Gemini 或 OpenAI Chat Completions 的客户端。编程工具：Codex 配置本站 Responses 接口，可读取项目、调用工具、修改和验证代码，具体操作仍受客户端权限和你的授权控制。
- 程序接入：自己的网页、后端、脚本、知识库或业务工具。使用下方文本请求示例完成连通，再按业务需要加入其他功能。
Google 将 Argon 定位为旗舰推理模型，重点面向复杂软件工程、数学与科学问题、多步骤 Agent。使用时提供明确目标、材料和输出格式；小任务也可对比轻量模型的速度与费用。

[Google 官方 Gemini 4 Argon 模型说明](https://ai.google.dev/gemini-api/docs/models/gemini-4-argon)

> **先从文本接入开始**
> 本站已验证文本及本页列出的工具调用通路。官方模型能力和本站各上游线路的支持范围可能不同；图片、文件、搜索等功能仍需分别验证。Argon 输出为文本，不用于生成图片、视频或语音。

## 2. 准备令牌和三个配置项

1. 登录GPT88控制台，进入「令牌管理」，创建或编辑令牌，选择「Gemini」分组，确认令牌和账号额度可用。
1. 复制完整 API Key，填写到客户端的 API 密钥栏。密钥不是登录密码，不要填写示例占位符，也不要在客户端输入框添加 Bearer 前缀。
1. 模型：gemini-4-argon；Cherry Studio 的 New API 地址：https://api.gpt88.cc；程序调用的 OpenAI 兼容 Base URL：https://api.gpt88.cc/v1。
[令牌创建与分组说明](/docs/guides/gpt88-library/token-api-config/)

[查看当前模型价格与分组倍率](https://api.gpt88.cc/pricing)

## 3. Codex 配置与工具使用

Codex 使用 /v1/responses，与 Cherry Studio 的聊天协议不同。本站已为 gemini-4-argon 接入 Responses 的函数工具、自定义文本工具、工具结果回传及流式事件。首次切换请新建本地会话，先验证读取项目，之后再处理修改代码等任务。

先完全退出 Codex。Windows 默认配置目录为 %USERPROFILE%\.codex，macOS / Linux 为 ~/.codex；设置了 CODEX_HOME 时使用对应目录。备份原 config.toml，保留已有 MCP、沙箱和其他设置，只合并以下模型及服务商字段，不要重复添加同名表。

~~~toml
model = "gemini-4-argon"
model_provider = "juapi"
model_reasoning_effort = "high"
cli_auth_credentials_store = "file"
web_search = "disabled"

[model_providers.juapi]
name = "GPT88"
base_url = "https://api.gpt88.cc"
wire_api = "responses"
requires_openai_auth = true
supports_websockets = false

[desktop]
localeOverride = "zh-CN"
~~~

> **默认使用中文界面**
> Codex 桌面端默认界面语言设为简体中文：在 config.toml 的 [desktop] 下加入 localeOverride = "zh-CN"。配置示例已包含此项；[desktop] 与 [model_providers.*] 是并列配置节，不要把 localeOverride 写入服务商配置节。已有 [desktop] 时在该节内修改原值，不要重复创建。保存后完全退出并重新打开 Codex。

API Key 必须另行填写。按本页第2节创建「Gemini」分组令牌，把完整GPT88令牌替换下方 sk-YOUR_API_KEY，保存到同目录的 auth.json。不要填账号密码、会员登录 token 或示例占位符。文件名不能是 auth.json.txt；旧登录凭据留在私人备份中，不要混进此 API Key 示例。

~~~json
{"OPENAI_API_KEY": "sk-YOUR_API_KEY"}
~~~

使用 CC Switch 等工具管理配置时，在 Codex 服务商中填写本站 Base URL、自己的 Gemini 分组 API Key 和模型名，并保留上方 Responses、HTTP/SSE 配置。由工具保存、启用后，无需再次手动覆盖配置文件。

保存后完全退出并重启 Codex，在自己的项目目录新建本地会话，确认模型是 gemini-4-argon。先用下面只读任务验证工具调用；能看到工具执行与文件分析结果后，再根据需要授权修改代码。不要用云端任务验证这份本地 API 配置。

~~~text
只读取当前项目，列出主要文件，并说明技术栈。不要修改文件，也不要安装依赖。
~~~

推荐思考等级 low、medium、high。high 适合复杂任务，low 可用于简单任务；Codex 的 xhigh/max 在本站兼容层按 high 处理，并不增加 Argon 的原生档位。不要继续给 Argon 设置旧式 thinkingBudget。

已兼容 Codex 的函数工具、自定义文本工具、命名空间及动态工具声明。自定义工具的 grammar 作为模型描述约束处理，不等同于上游严格语法采样；工具输入仍由客户端校验后执行。

> **当前支持范围**
> 当前提供 HTTP/SSE 对话和本地工具回合；示例关闭 WebSocket 及 OpenAI 内置网页搜索。Gemini 自带搜索不等于 OpenAI web_search。服务端 previous_response_id、conversation、远端加密 compaction 和其他未适配内置工具不在本教程支持范围。遇到旧会话或压缩状态不兼容时，保留任务摘要并新建会话，不要删除全部聊天记录。

Anthropic Messages 兼容接口也已通过文本工具回合验证，适合允许填写自定义模型和地址的客户端；这不代表 Claude Code 的所有专有功能都与 Gemini 等价。普通聊天、Codex 和 API 示例请分别选择对应协议。

## 4. Cherry Studio 配置

1. 打开 Cherry Studio，进入「设置 → 模型服务」，找到「New API」。若当前版本没有 New API，先更新到支持该服务商的版本。
1. API 地址填写 https://api.gpt88.cc，API 密钥填写刚复制的本站令牌。New API 配置使用根地址，不添加 /v1、/v1beta 或完整请求路径。
1. 获取模型列表，添加 gemini-4-argon；如果列表中暂时没有该模型，手动添加同名模型 ID。
1. 若当前版本显示协议或端点选项，Cherry Studio 使用 Gemini 或 OpenAI Chat Completions。没有此选项时先保持 New API 默认配置，完成文本验证。Codex 使用另一套 Responses 配置，见第3节。
1. 保存配置，启用服务商，回到聊天页新建助手或会话，在模型选择器中选 gemini-4-argon，发送一条短消息。
~~~text
请用中文说明这段代码的作用，并指出可能的边界问题：

def average(values):
    return sum(values) / len(values)
~~~

> **地址规则不要混用**
> Cherry Studio 的 New API 栏填 https://api.gpt88.cc，客户端会按模型协议补路径；OpenAI SDK或下面的程序示例使用 https://api.gpt88.cc/v1。不要填成 /v1/v1，也不要把 /chat/completions 写进客户端 Base URL。

[Cherry Studio 官方 New API 配置说明](https://docs.cherryai.com.cn/pre-basic/providers/newapi)

## 5. OpenAI 兼容 API：Chat Completions

请求地址：https://api.gpt88.cc/v1/chat/completions。使用本站令牌作为 Bearer；下方 sk-YOUR_API_KEY 是占位符，替换为自己的完整令牌。

~~~bash
curl "https://api.gpt88.cc/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-YOUR_API_KEY" \
  -d '{"model": "gemini-4-argon", "messages": [{"role": "user", "content": "请用中文简要介绍你的能力。"}], "stream": false}'
~~~

~~~powershell
$apiKey = Read-Host "输入本站 API Key" -AsSecureString
$plainKey = [System.Net.NetworkCredential]::new("", $apiKey).Password
try {
  $body = @{
    model = "gemini-4-argon"
    messages = @(@{role = "user"; content = "请用中文简要介绍你的能力。"})
    stream = $false
  } | ConvertTo-Json -Depth 6
  $result = Invoke-RestMethod -Method Post -Uri "https://api.gpt88.cc/v1/chat/completions" `
    -Headers @{Authorization = "Bearer $plainKey"} -ContentType "application/json; charset=utf-8" `
    -Body ([System.Text.Encoding]::UTF8.GetBytes($body))
  $result.choices[0].message.content
} finally {
  Remove-Variable plainKey, apiKey -ErrorAction SilentlyContinue
}
~~~

Python 示例仅需 requests：在终端执行 python -m pip install requests，再把下面代码保存为 argon_chat.py，运行 python argon_chat.py，按提示输入自己的令牌。

~~~python
import getpass
import requests

api_key = getpass.getpass("本站 API Key: ")
response = requests.post(
    "https://api.gpt88.cc/v1/chat/completions",
    headers={"Authorization": f"Bearer {api_key}"},
    json={
        "model": "gemini-4-argon",
        "messages": [{"role": "user", "content": "请用中文简要介绍你的能力。"}],
        "stream": False,
    },
    timeout=(10, 180),
)
response.raise_for_status()
result = response.json()
print(result["choices"][0]["message"].get("content", ""))

~~~

示例先使用默认输出预算，返回通常位于 choices[0].message.content。如自行设置 max_tokens 或原生 maxOutputTokens，它限制本次输出，不是上下文容量；思考 token 也可能占用这份预算。上限过小可能截断回复或耗尽预算后没有正文，请按任务设置并留意实际计费。

## 6. Gemini 原生 API

支持 Gemini 原生接口的程序可请求 https://api.gpt88.cc/v1beta/models/gemini-4-argon:generateContent，密钥放在 x-goog-api-key 请求头。原生请求体与 Chat Completions 不同，请不要直接混用。

~~~bash
curl "https://api.gpt88.cc/v1beta/models/gemini-4-argon:generateContent" \
  -H "Content-Type: application/json" \
  -H "x-goog-api-key: sk-YOUR_API_KEY" \
  -d '{"contents": [{"role": "user", "parts": [{"text": "请用中文简要介绍你的能力。"}]}]}'
~~~

回复在 candidates[0].content.parts 中；客户端应检查错误、finishReason 和 usageMetadata，仅合并含 text 且 thought 不为 true 的部分作为最终回答。thought=true 的思考摘要需单独处理。不要把本站 API Key 填到 Google AI Studio；它使用 Google 自己的身份认证。

## 7. 配置后排查

- 找不到模型：手动添加准确 ID gemini-4-argon，去掉复制带入的隐藏字符，确认令牌选择「Gemini」分组。Codex 同时检查 model_provider 指向保存了本站 Base URL 的服务商。
- 401：检查密钥是否完整、令牌是否有效、API 地址是否属于本网站。不要混用另一站密钥或 Google 官方密钥。
- 403：检查账号/令牌权限、IP限制与所选分组。
- 404 或模型不支持：核对接口路径与协议，避免重复 /v1，确认令牌是 Gemini 分组，保留错误时间与请求 ID 供客服核查。
- Codex 能聊天却工具失败：确认使用 wire_api="responses" 和本站地址，完全重启后新建会话；保留报错时间、request_id 与接口路径供客服定位，不要提交完整密钥。
- 429：检查账号余额、令牌额度与当前上游容量，按错误提示稍后重试，避免连续高频重发。
- 文本成功而工具/文件功能失败：先回到本教程最小文本请求，再逐项添加功能；提供脱敏错误和请求 ID，不要提交完整密钥或私有材料。
接入核验：两站已完成 Gemini 原生、Chat Completions、Anthropic Messages 的工具回合测试，并验证 Responses 的函数工具、自定义文本工具、流式终态及结果回传。测试覆盖上述兼容流程；不承诺所有客户端插件、内置工具或旧会话状态都能直接迁移。

更新于2026年10月14日。界面字段以所用客户端版本为准，模型可用范围与价格以当前模型广场和令牌权限为准。
