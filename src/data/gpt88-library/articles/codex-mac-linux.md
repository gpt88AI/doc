> **GPT88 使用说明**
> 模型名、版本、默认值和平台入口可能随客户端版本变化，请按 GPT88 当前模型目录和客户端显示核对。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## Codex macOS / Linux 手动安装指南

> **别漏了密钥配置**
> 完成接入需要两个文件：config.toml 设置模型与服务地址，auth.json 填写 GPT88 API Key。下文“编辑 auth.json”是必做步骤；只复制 TOML 配置仍无法认证。

## 文档概述

本安装教程适用于 macOS、Linux 操作系统，同时支持 Windows WSL / Linux 终端用户，完整覆盖 Codex 客户端手动安装、配置文件编写、连通校验全流程。

关联配套技术文档：

- [Codex Windows 一键安装教程（推荐新手）](/docs/integrations/dev/codex-cli/)
~~~bash
node -v
npm -v
~~~

~~~powershell
node --version
npm --version
~~~

### 安装 Node.js 并准备 API Key

## 一、安装前置准备

### 资源准备

安装前请提前获取 Codex 运行所需 Base URL 与 API Key，详细获取指引参考文档： [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/)

## 二、前置依赖：安装 Node.js

Codex 运行依赖 Node.js 运行时环境，未安装环境请执行以下操作：

1. **官方下载地址：**[https://nodejs.org/en/download](https://nodejs.org/en/download)
1. 推荐下载 LTS 长期支持版本；
1. **安装完成后打开终端，执行校验命令确认环境就绪：**
~~~bash
node -v
npm -v
~~~

~~~powershell
node --version
npm --version
~~~

> **验证通过**
> 终端正常输出版本号，代表 Node.js 与 npm 安装完成。

### 全局安装 Codex CLI

## 三、安装 Codex 命令行工具

### 步骤 2：全局安装 Codex CLI

**在终端执行全局安装指令：**

~~~bash
sudo npm i -g @openai/codex
~~~

> **验证通过**
> 能够进入 Codex 交互界面即代表安装成功；未配置 API Key 时客户端暂时无法正常对话，完成后续配置即可恢复。

### 安装卡顿、sudo 密码不显示，或需要验证安装状态

#### 补充说明

1. 若下载卡顿、长时间无响应，可优先配置 npm 国内镜像后重试，配套文档：[Node.js / npm 国内镜像配置教程](/docs/guides/gpt88-library/node-npm-mirror/)；
1. 执行命令触发密码输入时，终端不会显示输入字符，输入本机登录密码后直接回车即可；
1. **安装完成后执行启动命令验证安装状态：**
~~~bash
codex
~~~

### 创建配置目录并编辑 config.toml

## 四、自定义 Codex 配置文件

### 步骤 3：创建 Codex 配置目录

**macOS / Linux 统一配置目录路径：**`~/.codex` 终端执行创建目录命令：

~~~bash
mkdir -p ~/.codex
~~~

### 步骤 4：编辑核心配置 config.toml

**终端执行命令打开 nano 编辑器：**

~~~bash
nano ~/.codex/config.toml
~~~

**完整配置内容，直接复制粘贴至编辑器内：**

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

[desktop]
localeOverride = "zh-CN"
~~~

> **默认使用中文界面**
> Codex 桌面端默认界面语言设为简体中文：在 config.toml 的 [desktop] 下加入 localeOverride = "zh-CN"。配置示例已包含此项；[desktop] 与 [model_providers.*] 是并列配置节，不要把 localeOverride 写入服务商配置节。已有 [desktop] 时在该节内修改原值，不要重复创建。保存后完全退出并重新打开 Codex。

> **提示**
> **网络补充方案：**若全球 CDN 访问不稳定，仍使用 GPT88 Base URL：`https://api.gpt88.cc` 地址更新规则：Codex 的 GPT88 Base URL 使用 `https://api.gpt88.cc`，不要额外添加 `/v1` 后缀，若「令牌选择与 API 配置」页面更新推荐地址，请同步替换此处 base_url。

### nano 保存退出操作流程

1. 按下 `Ctrl + O` 写入文件；
1. 按下回车键确认文件名；
1. 按下 `Ctrl + X` 退出编辑器。

### 编辑 auth.json

### 安全注意事项

> **安全提醒**
> API Key 属于私密身份凭证，仅允许填写至本地 Codex 私有配置文件，禁止发送至公开群聊、共享文档或截图对外泄露。

### 步骤 5：编辑身份认证文件 auth.json

**终端执行命令打开 nano 编辑器：**

~~~bash
nano ~/.codex/auth.json
~~~

**粘贴下方 JSON 模板，替换占位符为你的真实密钥：**

~~~json
{
  "OPENAI_API_KEY": "sk-替换为你在GPT88创建的完整令牌"
}
~~~

将 `把你的 GPT88 API Key 粘贴在这里` 替换为 [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/) 页面生成的完整 API Key。

### nano 保存退出操作流程

1. 按下 `Ctrl + O` 写入文件；
1. 按下回车键确认文件名；
1. 按下 `Ctrl + X` 退出编辑器。

Windows：%USERPROFILE%\.codex\auth.json；macOS / Linux：~/.codex/auth.json。auth.json 与 config.toml 放在同一配置目录，目录不存在时先创建 .codex；设置了 CODEX_HOME 则使用该目录。Windows 保存类型选“所有文件”、编码 UTF-8，确认文件名不是 auth.json.txt。

本手动文件方案在 config.toml 顶层设置 cli_auth_credentials_store = "file"，并保留服务商下的 requires_openai_auth = true，确保读取同目录 auth.json。若已使用系统钥匙串或 CC Switch 管理凭据，请先备份并在原工具中更新 API Key，不要混用两套密钥来源。

### 启动 Codex 并验证连接

## 五、启动客户端并连通性验证

**终端执行启动命令：**

~~~bash
codex
~~~

~~~powershell
Codex
~~~

首次启动出现初始化配置选项时，直接回车使用全部默认参数。

**进入 Codex 交互界面后输入测试文本：**

~~~text
你好
~~~

> **验证通过**
> 客户端正常返回对话内容，代表安装与配置全部生效。

### 状态排查指令：客户端无法回复时核对当前配置

**若无法正常回复，在 Codex 交互窗口执行状态检测命令：**

~~~text
/status
~~~

核对输出的服务商、Base URL、模型名称是否与 config.toml 配置保持一致。

### 可选：Codex 桌面客户端

## 六、可选：Codex 桌面客户端

**如需图形化桌面版本，完成上述命令行配置后再安装桌面端：** 下载地址：[https://openai.com/zh-Hans-CN/codex/](https://openai.com/zh-Hans-CN/codex/)

> **安全提醒**
> **重要提示：**若配置前已打开过 Codex 桌面端，需完全退出程序后重新启动，桌面端会自动读取本地 `config.toml` 与 `auth.json` 配置。

## 常见问题

### sudo 输入密码时为什么没有字符显示？

## 七、常见故障排查

### 故障1：sudo 输入密码无字符显示

属于终端安全机制正常现象，直接输入本机登录密码后按下回车即可。


### 执行 codex 时提示 command not found

### 故障2：执行 codex 提示 command not found

**故障诱因：**安装未完成、终端环境变量未刷新。 处理方案：

1. **关闭当前终端，新建终端直接执行启动命令：**
~~~bash
codex
~~~

1. **报错未解决则重新执行全局安装指令：**
~~~bash
sudo npm i -g @openai/codex
~~~


### 出现 401 invalid token

### 故障3：401 invalid token 认证失败

**故障诱因：**API Key 复制不全、首尾存在多余空格、密钥失效。 处理方案：跳转 [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/) 重新复制完整密钥，更新 `~/.codex/auth.json` 文件，彻底关闭 Codex 后重新启动。


### Codex 无法连接 GPT88

### 故障4：Codex 无法连接 GPT88

**处理方案：**检查 config.toml 中 base_url 字段，Codex 的 GPT88 Base URL 使用 `https://api.gpt88.cc`，不要额外添加 `/v1`，示例：

~~~text
https://api.gpt88.cc
~~~

若「令牌选择与 API 配置」页面更新官方推荐地址，请以页面最新地址为准修改配置。


## 下一步

- [Codex 一键安装教程](/docs/integrations/dev/codex-cli/)
- [Codex Windows 手动安装教程](/docs/guides/gpt88-library/codex-windows-manual/)
- [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/)
