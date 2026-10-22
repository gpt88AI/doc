> **GPT88 使用说明**
> 模型名、版本、默认值和平台入口可能随客户端版本变化，请按 GPT88 当前模型目录和客户端显示核对。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

## Codex Windows 手动安装指南

> **别漏了密钥配置**
> 完成接入需要两个文件：config.toml 设置模型与服务地址，auth.json 填写 GPT88 API Key。下文“编辑 auth.json”是必做步骤；只复制 TOML 配置仍无法认证。

### 重要前置提醒

## 重要前置提醒

若当前已打开 Codex 桌面客户端，请点击右下角 `Exit` 完全关闭桌面版，再执行以下全部配置操作。

### 文档概述

## 文档概述

本文档面向 Windows 系统用户，提供 Codex 命令行完整手动安装、本地配置、连通校验全流程操作指引。

关联配套技术文档：

- [Codex Windows 一键安装教程（推荐新手）](/docs/integrations/dev/codex-cli/)
- [Codex Windows 桌面版安装教程（可选）](/docs/guides/gpt88-library/codex-windows-desktop-install/)
- [Codex Windows 桌面版配置](/docs/guides/gpt88-library/codex-windows-desktop-config/)
- [Codex Mac / Linux 手动安装教程](/docs/guides/gpt88-library/codex-mac-linux/)
- [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/)
- [Windows PowerShell 权限修复教程](/docs/guides/gpt88-library/windows-powershell-policy/)
- [常见报错问题](/docs/guides/gpt88-library/faq-errors/)

### 一、安装前置准备

## 一、安装前置准备

### 资源准备

安装前请提前获取 Codex 运行所需 Base URL 与 API Key，详细获取指引参考文档： [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/)

### 安全规范

API Key 为私密身份凭证，仅允许填写至本地私有配置文件，禁止发送至公开群聊、共享文档或截图对外泄露。

### 二、前置依赖：安装 Node.js

## 二、前置依赖：安装 Node.js

Codex 运行依赖 Node.js 运行时环境，未安装环境请按以下步骤操作：

1. 官方下载地址：[https://nodejs.org/en/download](https://nodejs.org/en/download)
1. 推荐下载 LTS 长期支持版本；
1. 安装完成后关闭全部终端窗口，重新打开命令提示符刷新环境变量。

### 三、安装 Codex 命令行工具

## 三、安装 Codex 命令行工具

### 步骤1：打开命令提示符

快捷键 `Win + R`，输入 `cmd`，回车启动 CMD。

### 步骤2：全局安装 Codex CLI

在 CMD 中执行安装命令：

~~~text
npm i -g @openai/codex
~~~

#### 下载加速说明

若安装命令长时间转圈、下载缓慢或超时，可先配置 npm 国内镜像后重试，配套文档： [Node.js / npm 国内镜像配置教程](/docs/guides/gpt88-library/node-npm-mirror/)

### 四、本地配置文件部署

## 四、本地配置文件部署

> **提示**
> 提示：如需使用图形化桌面客户端，可查阅简化配置文档：[Codex Windows 桌面版配置](/docs/guides/gpt88-library/codex-windows-desktop-config/)

### 步骤3：创建 Codex 配置目录

CMD 执行目录创建指令，不存在则自动新建文件夹：

~~~text
if not exist "%USERPROFILE%\.codex" mkdir "%USERPROFILE%\.codex"
~~~

Windows 系统固定配置目录路径：

~~~text
C:\Users\你的用户名\.codex
~~~

### 步骤4：编辑核心配置 config.toml

CMD 执行命令调用记事本打开配置文件，无文件则自动创建：

~~~text
notepad "%USERPROFILE%\.codex\config.toml"
~~~

完整配置模板，复制粘贴至记事本内：

~~~text
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

#### 地址替换说明

1. Codex 的 GPT88 Base URL 使用 `https://api.gpt88.cc`，不要额外添加 `/v1`
1. Codex 的 GPT88 Base URL 使用 `https://api.gpt88.cc`，不要额外添加 `/v1` 后缀；若「令牌选择与 API 配置」页面更新推荐地址，请同步替换此处 `base_url`。 粘贴完成后保存并关闭记事本。
### 步骤5：编辑身份认证文件 auth.json

CMD 执行命令打开认证配置文件：

~~~text
notepad "%USERPROFILE%\.codex\auth.json"
~~~

粘贴下方 JSON 模板，替换占位符为你的真实 GPT88 API Key：

~~~json
{
  "OPENAI_API_KEY": "sk-替换为你在GPT88创建的完整令牌"
}
~~~

将 `把你的 GPT88 API Key 粘贴在这里` 替换为 [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/) 页面生成的完整密钥，保存并关闭记事本。

Windows：%USERPROFILE%\.codex\auth.json；macOS / Linux：~/.codex/auth.json。auth.json 与 config.toml 放在同一配置目录，目录不存在时先创建 .codex；设置了 CODEX_HOME 则使用该目录。Windows 保存类型选“所有文件”、编码 UTF-8，确认文件名不是 auth.json.txt。

本手动文件方案在 config.toml 顶层设置 cli_auth_credentials_store = "file"，并保留服务商下的 requires_openai_auth = true，确保读取同目录 auth.json。若已使用系统钥匙串或 CC Switch 管理凭据，请先备份并在原工具中更新 API Key，不要混用两套密钥来源。

### 五、启动客户端并连通验证

## 五、启动客户端并连通验证

CMD 执行启动命令：

~~~text
codex
~~~

首次启动弹出初始化配置选项时，直接回车使用全部默认参数。

进入 Codex 交互界面后输入测试文本校验连通性：

~~~text
你好
~~~

客户端正常返回对话内容，代表整套安装与配置流程全部生效。

### 六、可选：Codex Windows 桌面客户端

## 六、可选：Codex Windows 桌面客户端

完成命令行配置且 `codex` 命令可正常对话后，再安装桌面端，安装文档： [Codex Windows 桌面版安装教程（可选）](/docs/guides/gpt88-library/codex-windows-desktop-install/)

### 桌面端使用注意事项

配置前已打开桌面版的，需点击右下角 `Exit` 完全退出程序；异常时可通过任务管理器结束 Codex 进程后重新启动，桌面端会自动读取本地 `config.toml`、`auth.json` 配置。

### 七、常见故障排查

## 七、常见故障排查

### 故障1：提示 codex 不是内部或外部命令

故障诱因：Codex 未完整安装、未重启终端刷新环境变量。 处理方案：

1. 关闭当前 CMD，新建终端直接执行启动命令：
~~~text
codex
~~~

1. 报错未解决则重新执行全局安装指令：
~~~text
npm i -g @openai/codex
~~~

### 故障2：401 invalid token 认证失败

故障诱因：API Key 复制不全、首尾存在多余空格、密钥失效。 处理方案：跳转 [令牌选择与 API 配置](/docs/guides/gpt88-library/token-api-config/) 重新复制完整密钥，更新 `auth.json` 文件，彻底关闭 Codex 后重新启动。

### 故障3：Codex 无法连接 GPT88

处理方案：核对 `config.toml` 中 `base_url`，GPT88 的 Codex Base URL 使用 `https://api.gpt88.cc`，不要额外添加 `/v1`，示例：

~~~text
https://api.gpt88.cc
~~~

地址以「令牌选择与 API 配置」页面最新推荐内容为准。

### 八、更多排错指引

## 八、更多排错指引

1. 安装脚本提示 `npm.ps1 cannot be loaded`、禁止运行脚本：查阅 [Windows PowerShell 权限修复教程](/docs/guides/gpt88-library/windows-powershell-policy/)
1. 出现 401、流式报错、VS Code 插件异常：查阅 [常见报错问题](/docs/guides/gpt88-library/faq-errors/)
1. npm 下载缓慢、安装超时：查阅 [Node.js / npm 国内镜像配置教程](/docs/guides/gpt88-library/node-npm-mirror/)
