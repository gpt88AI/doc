> **GPT88 使用说明**
> 模型名、版本、默认值和平台入口可能随客户端版本变化，请按 GPT88 当前模型目录和客户端显示核对。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## Codex Windows 桌面版配置指南

> **模型配置和密钥都要填写**
> 本页按手动文件方式完成接入：先设置 GPT88 地址，再填写自己的 API Key，最后启动 Codex。API Key 写在 auth.json，不写进模型或上下文参数。

## 文档概述

> **适用范围**
> 本文档适用于已完成 Codex Windows 桌面版安装，但客户端无法正常接入 GPT88 服务的用户，提供桌面端可视化配置、配置文件修改完整操作流程。

### 1. 创建并复制 GPT88 API Key

登录 GPT88 控制台，进入“令牌管理”，创建或选择能访问 gpt-6-astra 的令牌，复制完整 API Key。不要填写账号登录密码、ChatGPT 登录凭证或示例占位符。配置前完全退出 Codex；已有配置先备份，不要删除聊天记录。

[令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/)

### 2. 保存 config.toml：模型与服务地址

按 Win + R，输入 %USERPROFILE%，打开或新建 .codex 文件夹，用记事本编辑其中的 config.toml。设置了 CODEX_HOME 时使用对应目录。新安装可使用下方模板；已有配置请只更新对应项，保留其他设置且不要重复添加。

模型、上下文与 cli_auth_credentials_store 放在任何 [表名] 之前的顶层；base_url、wire_api、requires_openai_auth 放在对应服务商表内。保存为 UTF-8，文件名保持 config.toml。接着完成下一步 auth.json。

~~~toml
cli_auth_credentials_store = "file"
model = "gpt-6-astra"
model_context_window = 872000
model_auto_compact_token_limit = 784800
model_provider = "gpt88"
model_reasoning_effort = "ultra"
approval_policy = "never"
sandbox_mode = "danger-full-access"
service_tier = "fast"
preferred_auth_method = "apikey"
[model_providers.gpt88]
name = "GPT88"
base_url = "https://api.gpt88.cc"
wire_api = "responses"
requires_openai_auth = true
[windows]
sandbox = "unelevated"

[desktop]
localeOverride = "zh-CN"
~~~

> **默认使用中文界面**
> Codex 桌面端默认界面语言设为简体中文：在 config.toml 的 [desktop] 下加入 localeOverride = "zh-CN"。配置示例已包含此项；[desktop] 与 [model_providers.*] 是并列配置节，不要把 localeOverride 写入服务商配置节。已有 [desktop] 时在该节内修改原值，不要重复创建。保存后完全退出并重新打开 Codex。

> **网络优化**
> **网络优化方案：**若全球 CDN 节点访问不稳定，Codex 的 GPT88 Base URL 使用 `https://api.gpt88.cc`，不要额外添加 `/v1`。

### 3. 保存 auth.json：填写 GPT88 密钥

Windows：%USERPROFILE%\.codex\auth.json；macOS / Linux：~/.codex/auth.json。auth.json 与 config.toml 放在同一配置目录，目录不存在时先创建 .codex；设置了 CODEX_HOME 则使用该目录。Windows 保存类型选“所有文件”、编码 UTF-8，确认文件名不是 auth.json.txt。

把下方 OPENAI_API_KEY 的值替换为刚复制的完整 GPT88 令牌，保留英文双引号和 JSON 大括号。示例是占位符，不能直接用于调用。config.toml 用于模型和地址，auth.json 用于密钥；不能只复制模型与上下文三行就跳过认证。

~~~json
{
  "OPENAI_API_KEY": "sk-替换为你在GPT88创建的完整令牌"
}
~~~

> **密钥保存位置**
> 本手动文件方案在 config.toml 顶层设置 cli_auth_credentials_store = "file"，并保留服务商下的 requires_openai_auth = true，确保读取同目录 auth.json。若已使用系统钥匙串或 CC Switch 管理凭据，请先备份并在原工具中更新 API Key，不要混用两套密钥来源。

保存后完全退出并重启 Codex，开启新会话，确认模型为 gpt-6-astra，发送一条简短消息，再到 GPT88 控制台查看是否出现对应调用记录。仍提示登录或 401 时，检查完整令牌、分组权限、base_url、配置目录和凭据存储方式；不要把密钥或 auth.json 发到群里或工单。

[Codex 官方认证说明](https://learn.chatgpt.com/docs/auth)

### 4. 配置生效条件

本配置方案仅适用于 Windows 设备已安装 Codex 桌面版，但客户端无法正常连接 GPT88 的场景。 Codex 桌面端会自动读取本机全局 Codex 配置文件，修改配置文件后必须完全退出客户端并重启，新配置才可加载生效。

### 5. Windows 配置文件路径

**系统统一存放路径：**

~~~text
%USERPROFILE%\.codex\config.toml
~~~

若本地未生成 `.codex` 目录与配置文件，请参考配套安装文档：

- [Codex Windows 手动安装教程](/docs/guides/gpt88-library/codex-windows-manual/)
- [Codex Windows 桌面版安装教程](/docs/guides/gpt88-library/codex-windows-desktop-install/)

### 6. 相关文档

1. **API Key、Base URL 获取与更新：**[令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/)
1. **Codex 桌面端安装故障处理：**[Codex Windows 桌面版安装教程](/docs/guides/gpt88-library/codex-windows-desktop-install/)
1. **401 认证失败、流式传输异常、客户端各类报错：**[常见报错问题](/docs/guides/gpt88-library/faq-errors/)
