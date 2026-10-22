> **GPT88 使用说明**
> 配置界面、客户端字段和连通性检查以 GPT88 当前接入文档为准。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## DeepSeek Harness 接入教程：DeepSeek 与 GPT

通过GPT88令牌，把 DeepSeek 或 GPT 模型接入 DeepSeek Harness 桌面端 / 本地 Web 界面。本教程按实际设置界面填写：DeepSeek 使用内置 DeepSeek 卡片，GPT 使用“自定义模型 API”。两个模型提供商可以同时保存，按会话切换。

> **先区分两种配置**
> DeepSeek 内置卡片：API 地址填 https://api.gpt88.cc，使用 Anthropic Messages。GPT 自定义提供商：API 地址填 https://api.gpt88.cc/v1，协议选 OpenAI Responses。API地址不是网站文档地址，也不要填写完整 /v1/messages 或 /v1/responses。

## 1. 准备自己的 API Key

登录GPT88控制台，进入“令牌管理”，创建或选择一个有效令牌，并复制完整 API Key。DeepSeek 令牌需要能访问 DeepSeek 分组；GPT 令牌需要能访问 gpt-6-astra / gpt-6-sol 所在分组。若两个分组权限不同，分别创建令牌并填入对应提供商。

[令牌创建、分组与 API 地址说明](/docs/guides/gpt88-library/token-api-config/)

在 Harness 的“API 密钥”输入框粘贴完整令牌，再点击保存。截图里的圆点只是密钥隐藏效果，不能照抄；不要填写账号密码，也不要给密钥加引号或 Bearer 前缀。

## 2. 打开 Harness

已安装 DeepSeek Harness 桌面端：直接打开应用，进入“设置 → 模型”，按下面两套例子配置。桌面端无需为这些设置另外安装 Node.js。

尚未安装桌面端也可以使用官方本地 Web 版。先安装 Node.js 24 LTS，在终端运行下面命令；运行期间保持终端开启，再用浏览器打开 http://127.0.0.1:3080。Windows 可在 PowerShell 执行，macOS / Linux 可在终端执行。

~~~bash
node --version
npx @deepseek-ai/dsh@0.2.0-rc.2 web
~~~

首次执行 npx 会下载官方包，若提示是否安装，确认后等待启动。上述命令固定到本教程核对的官方版本；已安装的桌面端无需重复执行。

[DeepSeek Harness 官方项目与安装说明](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.0-rc.2/README.zh.md)

## 3. 例子一：接入 DeepSeek

打开“设置 → 模型”，找到“DeepSeek（deepseek-official）”卡片，点击“编辑”，展开“自定义设置”。此卡片内置使用 Anthropic Messages，不需要再选择 OpenAI 协议。

- API 密钥：你自己的GPT88 DeepSeek 分组令牌。
- API 地址：https://api.gpt88.cc（按截图填写根地址，不加 /v1）。
- 模型 ID：deepseek-flash；显示名称：DeepSeek-V41-Flash。
> **GPT88模型范围**
> GPT88当前启用的 DeepSeek 线路只配置了 deepseek-flash。本例先添加 Flash；deepseek-v4-pro 要等当前令牌分组确认支持后再添加，不能因截图有该模型就直接使用。

模型 ID 必须和控制台支持列表完全一致，显示名称可以自定义。用“添加模型”补齐需要的条目，不要把显示名称填进模型 ID。点击“保存”后，新建会话，在底部模型选择器选择对应 DeepSeek 模型。

此配置最终请求 https://api.gpt88.cc/v1/messages。Harness 会自动拼接接口路径；不要把 /messages 写进 API 地址。保存后下一次请求读取新设置，已发送过请求的旧会话可能保留旧模型，所以验证时建议开新会话。

## 4. 例子二：接入 GPT

在同一“设置 → 模型”页面点击“添加模型提供商”，切换到“自定义模型 API”，按下面字段填写。DeepSeek 卡片保留，GPT 另外新建一个提供商。

- Provider ID：juapi（小写；若该 ID 已存在则编辑原提供商，或为不同配置选另一个唯一小写 ID）。
- 显示名称：GPT88。
- API 地址：https://api.gpt88.cc/v1。
- API 协议：OpenAI Responses（不要选 OpenAI Chat Completions）。
- API 密钥：你自己的GPT88 GPT 分组令牌。
- 模型目录第一项：ID gpt-6-astra；显示名称 gpt-6-astra。
- 模型目录第二项：ID gpt-6-sol；显示名称 gpt-6-sol。
点击“添加模型”录入上述两项，或使用“获取可用模型”后勾选添加。自动获取失败时可以手动填写已确认可用的 ID。保存 / 创建提供商后，新建会话并在模型选择器中选GPT88下的 GPT 模型。

此配置最终请求 https://api.gpt88.cc/v1/responses。Provider ID 用于保存配置与会话引用，创建后不要随意改名。一个提供商只使用一种 API 协议，不能把 GPT 的 Responses 配置覆盖到内置 DeepSeek 卡片。

## 5. 验证接入

选择刚配置的模型，新建会话发送一条 hi，确认完整收到回复。然后到对应网站控制台“日志”查看同一时间的模型、分组和调用状态。若要用于编程任务，再在自己的测试目录尝试一次读取文件等工具操作；普通问候成功不代表所有工具链均已验证。

能选择推理等级时，可先保持默认或选择 High；模型与上游不支持的推理、图片输入、超长上下文不要强行启用。这里只配置接入，不把 Codex 的 context 参数复制到 Harness，也不填写未经核实的上下文容量。

## 6. 常见问题

- 401 / 403：核对完整 API Key、令牌状态和分组权限；不要把网站登录密码当密钥。
- 404 / 模型不支持：检查 API 地址、协议和模型 ID。GPT 地址带 /v1 且选择 Responses；DeepSeek 按内置卡片填写根地址。模型在网站存在，不代表每个令牌分组都可用。
- 429 / 资源耗尽：查看账号额度、令牌额度与线路状态；不要连续盲目重试。
- 保存后看不到模型：确认已经保存提供商、模型 ID 非空，重新打开模型选择器并新建会话。内置 DeepSeek 的默认目录并不等于本网站可用模型清单；网站令牌分组的实际支持范围优先。
- 普通聊天成功但工具调用失败：保留错误时间、请求 ID 和完整错误说明，联系网站客服核查协议与上游工具兼容；提交前遮盖 API Key 和私有代码。
[官方模型提供商配置说明](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.0-rc.2/docs/user/guide/providers.zh.md)

更新于 2026-10-11。界面截图中的密钥已隐藏；模型与分组可能调整，以当前令牌可用模型为准。
