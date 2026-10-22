> **GPT88 使用说明**
> 模型名、版本、默认值和平台入口可能随客户端版本变化，请按 GPT88 当前模型目录和客户端显示核对。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## Codex 会员与中转 API 来回切换：旧会话 401 处理

从 Codex 会员登录切换回GPT88中转 API 后，如果旧对话反复提示 401、而新对话正常，通常是旧会话仍绑定了原来的服务商或认证状态。本文介绍如何保留对话记录，安全切换到GPT88 API，并处理旧会话的认证缓存。

> **先分清两套身份**
> Codex 会员登录和中转 API Key 是两套凭据：会员使用 ChatGPT 登录会话；中转使用你在GPT88创建的 API Key。不要把会员 OAuth/access token、账号密码或报错截图中的隐藏内容当作中转 API Key。

## 1. 先确认是不是同一类 401

如果错误中同时出现 `401`、`invalid_api_key`，并且 URL 仍是 `api.openai.com`（例如 `wss://api.openai.com/v1/responses`），说明这个旧会话还在走官方 OpenAI 服务或旧凭据，并没有切到中转地址。新对话能用，通常是因为新对话读取了刚保存的服务商配置。

- 如果错误 URL 已经是 https://api.gpt88.cc，则优先检查中转 API Key 是否复制完整、令牌是否有效、令牌分组是否包含当前模型，以及 Base URL 是否为 `https://api.gpt88.cc` 且未重复追加 `/v1`。
- 若错误不是 `invalid_api_key`，或每个新对话也失败，请同时记录错误时间、请求 ID、模型、Base URL 和协议，不能只按旧会话缓存处理。
## 2. 切换前保留对话和配置

先完全退出 Codex CLI、桌面端和 IDE 扩展。备份用户目录下的 `config.toml`、需要保留的 `history.jsonl` 和当前项目说明；Windows 默认目录为 `%USERPROFILE%\.codex`，macOS / Linux 为 `~/.codex`，设置了 `CODEX_HOME` 时以该目录为准。不要复制、上传或发给他人 `auth.json`、钥匙串内容或任何 API Key。

[创建令牌与选择分组](/docs/guides/gpt88-library/token-api-config/)

## 3. 给中转单独建立服务商配置

不要把中转地址和 API Key 覆盖到原来的会员服务商条目。使用独立的 provider ID，例如 `gpt88`，这样旧配置仍可识别，切换时也容易确认当前请求走哪条线路。下面是GPT88的 GPT Responses 示例；API Key 只填你自己的令牌。

~~~toml
model = "gpt-6.1-sol"
model_provider = "gpt88"
cli_auth_credentials_store = "file"

[model_providers.gpt88]
name = "GPT88"
base_url = "https://api.gpt88.cc"
wire_api = "responses"
requires_openai_auth = true

[desktop]
localeOverride = "zh-CN"
~~~

> **默认使用中文界面**
> Codex 桌面端默认界面语言设为简体中文：在 config.toml 的 [desktop] 下加入 localeOverride = "zh-CN"。配置示例已包含此项；[desktop] 与 [model_providers.*] 是并列配置节，不要把 localeOverride 写入服务商配置节。已有 [desktop] 时在该节内修改原值，不要重复创建。保存后完全退出并重新打开 Codex。

如果使用文件凭据存储，再按现有 Codex 版本的登录方式写入自己的中转 API Key；不要手工粘贴会员登录凭据。使用 CLI 时可用 API Key 登录流程，使用桌面端或 IDE 时在“使用 API Key”入口填写。保存后确认当前配置的 provider 是 `gpt88`，Base URL 是 https://api.gpt88.cc，协议是 Responses。

> **两个位置都要生效**
> `config.toml` 负责模型、provider 和地址；`auth.json` 或系统钥匙串负责凭据。只改其中一处，可能仍然沿用旧认证。修改后必须完全退出并重新启动 Codex。

## 4. 会员 ↔ 中转的推荐切换流程

1. 退出当前 Codex 客户端，保存需要保留的文件。
1. 切换到中转 profile/provider，填入自己的GPT88 API Key；不要复用会员 OAuth/access token。
1. 重新启动 Codex，检查当前模型、provider、Base URL 和协议；先新建会话发送一条短消息。
1. 新会话成功后，再从旧对话复制必要的上下文继续工作。旧对话若仍显示官方 URL，不要反复点击“重试”，直接结束该会话并使用新会话。
切回 Codex 会员时，退出中转配置对应的运行实例，恢复官方 provider，使用“使用 ChatGPT 登录”重新认证，再新建会话。会员登录成功后不要继续使用旧的中转会话；两种会话分别保留，避免凭据和服务商状态混用。

## 5. 旧对话必须继续时

先在该会话的模型/服务商选择处重新选择当前中转 provider；如果客户端没有这个入口，关闭该会话后新建会话，把最后一条用户需求和必要上下文复制过去。不要删除整个 `history.jsonl`，也不要为了修复 401 删除所有配置。

- 旧会话可能保存 provider、连接地址或重连状态；只改全局默认值不一定会改写它。
- 修改 `config.toml`、认证方式或登录账号后，完全退出并重新打开客户端，不能只刷新当前页面。
- 请求错误里的 URL 是最快判断依据：看到 `api.openai.com` 代表仍走官方；看到 `https://api.gpt88.cc` 才说明请求已到中转入口。
## 6. 验证顺序

~~~text
1. 新建会话
2. 选择 GPT88 provider 与 gpt-6.1-sol
3. 发送：hi
4. 确认返回成功且无 401
5. 到控制台日志核对模型、分组和请求时间
~~~

普通消息成功后，再测试需要的工具或长上下文功能。验证时只使用自己的测试内容，不要把 API Key、auth.json、账号密码或未脱敏的错误截图发到群里。

## 7. 常见问题

- 新对话正常、旧对话 401：优先判断旧会话仍绑定旧 provider 或旧凭据，按本文第 4、5 节处理。
- 所有对话都 401：检查 API Key 是否完整、令牌状态、分组权限、Base URL 是否为 `https://api.gpt88.cc`、Responses 协议和当前模型。
- 出现 404：通常是地址路径、协议或模型 ID 不匹配；不要把完整 `/v1/responses` 写进 Base URL。
- 出现 429：查看令牌/账号额度和线路状态，保留请求 ID；不要通过反复重试绕过限制。
- 仍无法判断：提交脱敏后的错误文本、时间、请求 ID、模型和 URL 主机名；遮盖 API Key、OAuth token、Cookie、私有代码和完整会话内容。
[Codex 官方认证说明（会员登录与 API Key 的区别）](https://learn.chatgpt.com/docs/auth)

更新于 2026-10-13。界面、模型和 provider 字段可能随客户端版本变化；以当前客户端和网站文档显示为准。
