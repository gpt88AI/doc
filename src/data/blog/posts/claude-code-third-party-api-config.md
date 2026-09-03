---
title: Claude Code 配置第三方 API 完整教程：以 GPT88 为例
description: 从安装 Claude Code 到接入 GPT88 等第三方兼容网关，详解 Base URL、API Key、模型名称、持久化配置、连通性验证与常见报错排查。
date: 2026-09-03
category: 开发工具
tags: [Claude Code, 第三方 API, GPT88, Anthropic API, Agent, AI 编程, API Key]
readTime: 12
relatedPath: /docs/blog/gpt88-skill-agent-onboarding-guide/
relatedTitle: GPT88 Skill 完整指南：作用、安装使用方法与适用场景
---

Claude Code 默认连接 Anthropic 的服务。如果你希望使用 GPT88、LiteLLM、自建网关或其它兼容服务，就需要把 Claude Code 的请求地址和认证方式切换到第三方 API。

这件事看起来只是设置两个环境变量，但真正容易出错的地方包括：Base URL 层级不对、认证变量混用、模型 ID 写错、把 OpenAI 兼容地址直接拿来给 Claude Code 使用，以及旧登录状态覆盖了新的 API 配置。

本文以 GPT88 为例，整理一套从零开始的配置方法，同时说明这套方法对其它第三方 Anthropic 兼容网关如何迁移。

## 一、先理解 Claude Code 的配置模型

Claude Code 使用的是 Anthropic Messages API 风格。接入第三方服务时，第三方网关需要能够理解 Claude Code 发出的 Anthropic 格式请求，至少要正确处理认证、模型、消息、工具调用和流式响应等能力。

最关键的三个配置项是：

| 配置项 | 作用 | GPT88 示例 |
| --- | --- | --- |
| `ANTHROPIC_BASE_URL` | Claude Code 请求发送到哪里 | `https://api.gpt88.cc` |
| `ANTHROPIC_API_KEY` | 标准 API Key 变量 | GPT88 API Key |
| `ANTHROPIC_AUTH_TOKEN` | 以 Authorization Token 方式认证 | GPT88 API Key |

Claude Code 官方文档也使用 `ANTHROPIC_BASE_URL` 配置 LLM Gateway。对于静态密钥，可以使用 `ANTHROPIC_AUTH_TOKEN`；如果需要动态轮换密钥，还可以使用 `apiKeyHelper`。citeturn0search0

### 不要混淆两种 API 兼容方式

GPT88 同时提供 OpenAI 兼容 API，但 Claude Code 不是 OpenAI SDK 客户端：

```text
OpenAI 兼容客户端：OPENAI_BASE_URL + OPENAI_API_KEY
Claude Code：       ANTHROPIC_BASE_URL + ANTHROPIC_API_KEY / AUTH_TOKEN
```

如果你在 Cursor、Cline、Python OpenAI SDK 中接入 GPT88，通常使用 `https://api.gpt88.cc/v1`；但配置 Claude Code 时，应使用能提供 Anthropic Messages 兼容入口的第三方地址。不要机械地把 `/v1` 拼到所有客户端上。

## 二、准备工作

开始前准备好：

- 已安装 Claude Code；
- 一个可用的第三方 API Key；
- 第三方服务提供的 Anthropic 兼容 Base URL；
- 第三方服务允许 Claude Code 使用的模型 ID；
- 一个用于测试的代码仓库或空目录。

以 GPT88 为例，建议先在 GPT88 控制台创建一个专用 API Key，并为不同客户端分别使用不同密钥。不要把账户登录 Token、网页登录 Cookie、刷新 Token 或设备授权码当成推理 API Key。

GPT88 的 OpenAI 兼容 API 默认地址是 `https://api.gpt88.cc/v1`，而 Claude Code 的具体 Anthropic 兼容入口应以 GPT88 当前提供的 Claude Code 接入说明为准。如果第三方服务只提供 OpenAI Chat Completions 兼容接口，Claude Code 不能直接使用，除非中间还有一个 Anthropic 协议转换层。

## 三、最快配置方法：当前终端临时生效

在 macOS 或 Linux 的终端中执行：

```bash
export ANTHROPIC_BASE_URL="https://你的-第三方-Anthropic兼容地址"
export ANTHROPIC_AUTH_TOKEN="你的第三方 API Key"
```

然后在同一个终端启动 Claude Code：

```bash
claude
```

如果第三方网关明确要求 `ANTHROPIC_API_KEY`，也可以这样配置：

```bash
export ANTHROPIC_BASE_URL="https://你的-第三方-Anthropic兼容地址"
export ANTHROPIC_API_KEY="你的第三方 API Key"
```

通常只选一种认证变量即可。为了避免旧值产生覆盖或歧义，可以先清理当前 Shell 中可能残留的变量：

```bash
unset ANTHROPIC_API_KEY
unset ANTHROPIC_AUTH_TOKEN
unset ANTHROPIC_BASE_URL
```

再写入目标配置。

### GPT88 配置示例

如果 GPT88 为 Claude Code 提供了 Anthropic 兼容入口，配置形式如下：

```bash
export ANTHROPIC_BASE_URL="https://你的-GPT88-Claude兼容地址"
export ANTHROPIC_AUTH_TOKEN="你的 GPT88 API Key"
```

这里的地址必须使用 GPT88 官方为 Claude Code 或 Anthropic Messages 协议提供的入口。不要仅凭 OpenAI 兼容地址自行猜测路径，也不要把 API Key 写进文章、截图、Git 仓库或公开日志。

## 四、桌面客户端如何配置

这里要先区分两个产品：**Claude Desktop** 和 **Claude Code 的桌面工作区**。它们名称相近，但配置方式和能力边界不同。

### 情况 A：你说的是 Claude Desktop

Claude Desktop 是桌面聊天与 MCP 客户端，不是 Claude Code 的图形化外壳。它默认使用 Anthropic 账号或官方 API 配置，不能因为设置了 Claude Code 的 `ANTHROPIC_BASE_URL` 就自动切换到任意第三方网关。

如果第三方服务提供了明确的 Claude Desktop 兼容方案，应按该服务给出的桌面端配置入口操作。不要直接把 GPT88 的 OpenAI 兼容地址填入 Claude Desktop，也不要把 Claude Code 的配置文件复制到 Claude Desktop 的配置目录后期待它自动生效。

如果目标是让 Claude Desktop 通过 GPT88 使用模型，先确认：

1. GPT88 是否提供 Claude Desktop 可用的 Anthropic 协议入口；
2. Claude Desktop 当前版本是否允许自定义 API Base URL；
3. 该入口是否支持桌面端需要的模型、流式输出和工具调用。

如果第三方只提供 OpenAI 兼容的 `/v1/chat/completions`，它不能直接作为 Claude Desktop 或 Claude Code 的 Base URL。此时需要协议转换层，或改用支持 OpenAI 兼容接口的客户端。

### 情况 B：你说的是 Claude Code 的桌面应用或桌面工作区

Claude Code 的桌面入口本质上仍然需要启动 Claude Code 运行时。最稳妥的方式是先在系统层配置环境变量，再从同一个用户环境启动桌面应用或桌面工作区。

macOS/Linux 可以在终端中执行：

```bash
export ANTHROPIC_BASE_URL="https://你的-第三方-Anthropic兼容地址"
export ANTHROPIC_AUTH_TOKEN="你的第三方 API Key"
open -a "Claude Code"
```

如果桌面应用没有继承从终端启动的环境变量，说明它是由系统图形界面启动的，环境变量没有进入应用进程。此时可以：

- 使用应用本身提供的 Environment、Provider 或 Gateway 配置入口；
- 使用系统钥匙串或 Secret Manager，再通过 `apiKeyHelper` 动态读取；
- 为桌面应用创建受保护的启动器，并限制启动器文件权限；
- 先用终端版 Claude Code 验证协议和密钥，再迁移到桌面入口。

Windows 桌面应用也可能不会自动读取刚刚在 PowerShell 当前窗口设置的变量。设置用户级环境变量后，需要完全退出并重新打开 Claude Code：

```powershell
[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://你的-第三方-Anthropic兼容地址", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "你的第三方 API Key", "User")
```

桌面端验证建议从低风险任务开始：

```text
请只读取当前项目目录并输出目录树，不要写入文件，不要执行删除、提交或部署操作。
```

然后查看第三方网关日志，确认请求确实到达目标地址。桌面端如果仍然显示官方账号或官方用量，优先检查应用是否继承环境变量、是否存在旧登录状态，以及当前桌面产品是否允许自定义网关。

### 桌面端配置的关键限制

- 桌面 UI 中能登录账号，不代表它支持自定义 API Base URL；
- Claude Code 的环境变量不一定会自动传给由 Dock、开始菜单或启动器打开的应用；
- 第三方 API Key 不应放进截图、同步盘、桌面配置备份或公开仓库；
- MCP Server 的配置与模型 API 配置是两件事，配置 MCP 不等于切换模型供应商；
- 如果桌面端没有明确的 Provider/Gateway 设置，终端版通常是最容易验证的路径。

### 情况 C：桌面 UI 中确实出现了 Provider / Gateway 菜单

部分版本、企业环境或第三方封装可能会显示类似下面的入口：

```text
Settings
  → Developer
  → Provider / Gateway / Environment
  → Custom Provider
```

如果你的界面确实有这些选项，可以按下面的方式填写：

| UI 字段 | 填写内容 |
| --- | --- |
| Provider Type | `Anthropic Compatible`，如果有该选项 |
| Base URL | GPT88 当前提供的 Anthropic 兼容入口 |
| API Key | GPT88 推理 API Key |
| Model | GPT88 模型目录返回的准确模型 ID |

保存后建议完全退出并重新打开桌面客户端，再新建会话测试。不要把以下地址直接当作 Claude Code 的地址，除非 GPT88 当前文档明确说明它兼容 Anthropic Messages：

```text
https://api.gpt88.cc/v1
```

这个地址通常是 GPT88 的 OpenAI 兼容 API 入口，适合 OpenAI SDK、Cursor、Cline 等客户端。Claude Code 需要 Anthropic Messages 兼容入口；两者的协议、请求路径和工具调用格式并不相同。

### 如何判断 UI 配置是否真的生效

不要只看设置页面显示了“已连接”。在桌面端新建会话后，先发送一条只读指令：

```text
请只读取当前项目目录并输出目录树。
不要修改文件，不要执行删除、提交、推送或部署操作。
```

再到 GPT88 网关的请求日志中核对：

- 请求时间是否对应刚才的会话；
- 请求是否到达 GPT88，而不是官方 Anthropic 服务；
- 模型 ID 是否是你选择的第三方模型；
- 状态码是否为成功；
- 工具调用和流式响应是否正常。

如果桌面端仍然显示官方账号、官方用量或官方模型，通常说明 UI 配置没有被当前 Claude Code 运行时采用。此时优先回到终端版验证环境变量，再检查桌面应用是否支持自定义 Provider，而不是继续修改 MCP 配置。

### 桌面客户端里的 MCP 配置不是模型 API 配置

在 Claude Desktop 中，`Settings → Extensions` 或 MCP 配置主要用于添加本地工具和外部服务，例如文件、浏览器、数据库或其它 MCP Server。它不会自动把模型请求切换到 GPT88。

可以这样区分：

```text
模型 API 配置：决定“由哪个模型供应商处理对话”
MCP 配置：     决定“模型可以调用哪些外部工具”
```

因此，即使 MCP Server 已经安装成功，也不能据此判断 GPT88 API 已经接入。两部分需要分别配置、分别验证。

## 五、让配置永久生效

临时 `export` 只对当前终端窗口有效。macOS 默认使用 zsh，可以将配置放入 `~/.zshrc`：

```bash
export ANTHROPIC_BASE_URL="https://你的-第三方-Anthropic兼容地址"
export ANTHROPIC_AUTH_TOKEN="你的第三方 API Key"
```

保存后重新加载：

```bash
source ~/.zshrc
```

Linux 用户如果使用 Bash，可以放入 `~/.bashrc`：

```bash
export ANTHROPIC_BASE_URL="https://你的-第三方-Anthropic兼容地址"
export ANTHROPIC_AUTH_TOKEN="你的第三方 API Key"
```

Windows PowerShell 可以在当前会话中设置：

```powershell
$env:ANTHROPIC_BASE_URL = "https://你的-第三方-Anthropic兼容地址"
$env:ANTHROPIC_AUTH_TOKEN = "你的第三方 API Key"
```

如果希望持久化到用户环境变量：

```powershell
[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://你的-第三方-Anthropic兼容地址", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "你的第三方 API Key", "User")
```

设置后需要重新打开 PowerShell 或终端窗口。

## 六、模型名称怎么配置

第三方网关中的模型名不一定等于 Anthropic 官网模型名。应该使用第三方 `/models` 或模型目录返回的准确 ID，不要凭记忆添加别名。

如果第三方服务支持 Claude Code 的模型环境变量，可以按其文档设置对应模型，例如：

```bash
export ANTHROPIC_MODEL="复制第三方模型目录中的模型 ID"
```

也有一些网关不要求客户端设置模型，而是在服务端完成默认模型或路由。此时不要额外添加未经支持的变量，先用默认配置完成连通性测试。

模型选择建议：

| 任务 | 选择思路 |
| --- | --- |
| 了解仓库、写计划 | 优先上下文和推理能力 |
| 普通改文件、补测试 | 选择速度和成本平衡的模型 |
| 深层 Bug、复杂重构 | 选择更强推理模型 |
| 高风险生产改动 | 使用独立模型审查，并保留人工确认 |

## 七、配置后如何验证

### 1. 先确认变量已生效，但不要泄露完整密钥

macOS/Linux：

```bash
printf 'BASE_URL=%s\n' "$ANTHROPIC_BASE_URL"
printf 'KEY_PREFIX=%s...\n' "${ANTHROPIC_AUTH_TOKEN:0:6}"
```

PowerShell：

```powershell
Write-Output "BASE_URL=$env:ANTHROPIC_BASE_URL"
Write-Output "KEY_PREFIX=$($env:ANTHROPIC_AUTH_TOKEN.Substring(0, 6))..."
```

如果密钥长度不足以安全显示前缀，就不要输出它。验证配置时只显示掩码信息。

### 2. 先做低风险请求

先让 Claude Code 执行一个只读任务：

```text
请只读取当前项目的目录结构，不要修改任何文件。最后告诉我你使用的模型和发现的主要目录。
```

如果请求成功，再让它执行：

```text
请创建一个临时说明文件，写入“Claude Code third-party API connection ok”，然后运行 git diff 检查变更。不要提交或推送。
```

验证重点不是“终端出现了回复”，而是确认：

- 请求确实经过第三方 Base URL；
- 模型 ID 被服务端接受；
- 工具调用和文件读取正常；
- 流式响应没有中断；
- 没有意外访问或修改不该触碰的目录。

### 3. 用网关日志确认

如果第三方平台有请求日志，检查请求时间、模型、状态码和用量。排查时不要直接把包含 Authorization Header 的完整日志贴到公开 Issue 或聊天中。

## 八、常见报错与排查顺序

### `401 Unauthorized` 或 `invalid api key`

常见原因：

- API Key 粘贴错误或已撤销；
- 把账户 Token 当成推理 API Key；
- `ANTHROPIC_API_KEY` 和 `ANTHROPIC_AUTH_TOKEN` 同时存在且值不同；
- Key 被发送到了错误的 Base URL。

排查：

```bash
env | grep '^ANTHROPIC_' | sed 's/=.*/=<configured>/'
```

确认变量名称、域名和密钥来源，必要时清理后重新设置。不要在命令行历史中直接写真实密钥。

### `404 Not Found`

通常是 Base URL 路径层级错误。可能情况包括：

- 把 OpenAI 的 `/v1` 地址给了 Claude Code；
- Base URL 重复拼接了 `/v1`；
- 把完整的 `/messages` 资源路径填到了 Base URL；
- 第三方服务根本没有 Anthropic 兼容入口。

Base URL 应该指向“协议入口”，由客户端继续拼接资源路径。具体是否包含 `/v1` 只能以第三方文档为准，不能凭感觉添加。

### `model not found` 或 `model is not supported`

第三方网关只接受它模型目录中的准确 ID。调用模型列表或查看控制台，复制完整模型 ID。不要把 `claude-sonnet`、`claude-3-5-sonnet` 等旧别名直接套用到第三方服务。

### 能对话，但工具调用失败

这说明基础文本请求可能兼容，但工具定义、工具结果、流式事件或权限处理不完整。尝试：

- 更新 Claude Code 到较新版本；
- 换一个明确支持 Claude Code 的网关；
- 用只读目录检查测试工具调用；
- 查看第三方网关是否完整支持 Anthropic Messages API 的 tool use；
- 暂时关闭高风险工具，不要为了“跑通”扩大权限。

### 配置了环境变量，Claude Code 仍然走原账号

可能是旧的登录凭据、Shell 配置文件没有加载，或者启动 Claude Code 的方式没有继承当前环境。检查：

```bash
command -v claude
env | grep '^ANTHROPIC_' | sed 's/=.*/=<configured>/'
```

确认是在同一个终端窗口设置变量并启动 `claude`。必要时退出当前会话、关闭终端并重新打开。Claude Code 官方文档说明其默认使用 Anthropic API，同时支持不同认证路径和企业网关配置。citeturn0search2turn0search0

### 请求超时或频繁中断

检查网络、代理、防火墙和第三方网关的流式响应支持。Claude Code 支持标准 `HTTP_PROXY` 和 `HTTPS_PROXY`，但官方文档指出目前不支持 SOCKS 代理，也不支持 `NO_PROXY`。citeturn0search1

## 九、动态 API Key：用 apiKeyHelper 代替明文配置

如果团队需要密钥轮换、按用户分配密钥或从 Vault 读取密钥，可以使用 Claude Code 的 `apiKeyHelper`。

创建一个只输出 API Key 的脚本，例如 `~/bin/get-gpt88-key.sh`：

```bash
#!/usr/bin/env bash
set -euo pipefail

# 示例：从安全的 Secret Manager 读取。
# 不要把真实密钥硬编码到脚本中。
secret_manager read gpt88/claude-code/api-key
```

赋予执行权限：

```bash
chmod 700 ~/bin/get-gpt88-key.sh
```

然后在 Claude Code 设置中配置：

```json
{
  "apiKeyHelper": "~/bin/get-gpt88-key.sh"
}
```

如需设置刷新周期，可以使用：

```bash
export CLAUDE_CODE_API_KEY_HELPER_TTL_MS=3600000
```

`apiKeyHelper` 适合动态凭据，不是为了省略基础配置而必须使用的步骤。官方文档还说明，`apiKeyHelper` 的优先级低于 `ANTHROPIC_AUTH_TOKEN` 或 `ANTHROPIC_API_KEY`；如果同时设置了静态变量，静态变量可能优先。citeturn0search0

## 十、第三方 API 的安全配置原则

接入第三方 API 时，最容易被忽略的是 Claude Code 具有读文件、写文件和执行命令的能力。API 配好只是第一步，权限边界同样重要。

- 不要把 API Key 写入代码仓库、`.env` 提交记录、截图或公开日志；
- 为 Claude Code 创建单独 API Key，按应用分离并设置额度或有效期；
- 生产数据库优先给只读权限，不要给 Agent 直接写权限；
- 不要在不了解命令的情况下使用 `--dangerously-skip-permissions`；
- 高风险操作如删除、迁移、推送和部署设置人工确认；
- 使用 HTTPS，并检查第三方网关是否会记录 Prompt、代码和工具结果；
- 先在测试仓库验证，再接入包含密钥或生产数据的项目；
- 定期撤销不用的 Key，检查异常用量和请求日志。

第三方网关还可能拥有自己的数据留存、日志、模型路由和训练政策。选择服务时，不要只比较模型价格，也要确认代码和 Prompt 的处理方式。

## 十一、推荐的最短成功路径

如果你只想先跑通，按下面顺序操作：

1. 在第三方平台创建专用 API Key。
2. 确认平台提供 Anthropic Messages / Claude Code 兼容 Base URL。
3. 在当前终端设置 `ANTHROPIC_BASE_URL` 和一种认证变量。
4. 启动 `claude`，执行只读目录检查。
5. 查看网关日志，确认请求命中正确地址和模型。
6. 再执行一个小范围、可回滚的文件修改。
7. 运行测试和 `git diff`，确认结果后再考虑持久化配置。

用一句话概括：

```text
先确认协议兼容，再配置地址和密钥，最后用只读任务验证工具链。
```

## 十二、配置验收清单

- [ ] Claude Code 已更新到较新版本；
- [ ] 第三方服务明确支持 Anthropic Messages 或 Claude Code；
- [ ] `ANTHROPIC_BASE_URL` 指向协议入口，而不是完整资源路径；
- [ ] 使用的是推理 API Key，而不是账户登录 Token；
- [ ] `ANTHROPIC_API_KEY` 与 `ANTHROPIC_AUTH_TOKEN` 没有互相冲突；
- [ ] 模型 ID 来自第三方实时目录；
- [ ] 只读测试请求可以成功；
- [ ] 工具调用、流式响应和错误返回经过验证；
- [ ] API Key 没有出现在 Git、日志或截图中；
- [ ] 生产项目使用最小权限和独立密钥；
- [ ] 删除、推送、部署和数据库写入保留人工确认；
- [ ] 已了解第三方服务的数据留存和隐私政策。

## 结语

Claude Code 接入第三方 API 的本质，是把客户端的 Anthropic 协议请求交给一个兼容网关处理。最重要的不是记住某一组永久不变的命令，而是掌握三个判断：

1. 这个服务是否真的兼容 Claude Code，而不只是兼容 OpenAI API？
2. Base URL 是否填在正确的协议层级？
3. API Key、模型、工具权限和数据处理是否都经过验证？

只要按“协议兼容 → 地址认证 → 模型选择 → 低风险验证 → 权限收紧”的顺序配置，GPT88、LiteLLM 和自建网关的接入方式都可以用同一套思路快速完成。

## 官方参考

- [Anthropic：LLM Gateway 配置](https://docs.anthropic.com/en/docs/claude-code/llm-gateway)
- [Anthropic：Claude Code 安装与认证](https://docs.anthropic.com/en/docs/claude-code/getting-started)
- [Anthropic：企业代理配置](https://docs.anthropic.com/en/docs/claude-code/corporate-proxy)
- [GPT88 Skill 完整指南](https://doc.gpt88.cc/docs/blog/gpt88-skill-agent-onboarding-guide/)

本文中的 GPT88 地址、模型和兼容入口应以 GPT88 当前文档和控制台显示为准。第三方 API 的协议支持、模型列表、价格、限额和认证方式可能变化，配置前请先做实时验证。
