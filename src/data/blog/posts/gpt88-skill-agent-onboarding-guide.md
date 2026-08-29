---
title: GPT88 Skill 完整指南：作用、安装使用方法与适用场景
description: GPT88 Skill 是一套面向 Agent 的 GPT88 接入工作流，覆盖 OpenAI SDK、Cursor、Codex、Claude Code、Cline、账号登录、API Key、模型发现、价格查询、用量管理和安全排障。本文解释它的作用、使用方式与场景。
date: 2026-08-29
category: 开发工具
tags: [GPT88 Skill, Agent Skill, GPT88 API, OpenAI SDK, Cursor, Codex, Claude Code, API Key]
readTime: 14
relatedPath: /docs/quickstart/
relatedTitle: GPT88 快速开始
---

如果你使用过 Agent 或 Coding Agent，可能已经见过 `SKILL.md` 这种文件。它不是普通的产品说明，也不是一个只能执行单条命令的脚本，而是给 Agent 提供的一套可发现、可加载、可复用的工作方法。

GPT88 Skill 就是这样一套面向 GPT88 的接入与运维能力。它帮助 Agent 或开发者完成：

- 把 OpenAI SDK、Cursor、Codex、Claude Code、Cline 等客户端接入 GPT88；
- 区分 GPT88 账号控制面和模型推理 API；
- 安全地创建、验证和使用 API Key；
- 查询当前可用模型、价格、分组和倍率；
- 处理 GPT88 TUI、Desktop 或自定义客户端的登录授权；
- 查询账号、用量、订阅和配额信息；
- 接入图片、视频等长时间运行的媒体任务；
- 按状态码和故障类型进行可恢复排障。

本文根据 [Osub/sub2api 仓库中的 GPT88 Skill](https://github.com/Osub/sub2api/blob/main/skills/gpt88/SKILL.md)整理，并结合 GPT88 文档站的接入习惯重新编排。具体字段、端点、模型、价格、配额和兼容性可能随版本变化，实际使用时应以当前 GPT88 控制台、模型目录和客户端说明为准。

## 一、GPT88 Skill 是什么？

可以把 GPT88 Skill 理解为一份“Agent 接入 GPT88 的操作协议”。它告诉 Agent：

1. GPT88 有哪些服务入口；
2. 不同凭证分别用于什么地方；
3. 如何发现实时模型和价格，而不是硬编码旧值；
4. 如何配置不同客户端；
5. 哪些操作可以直接读取，哪些操作必须先获得确认；
6. 如何在失败后定位问题并安全恢复。

它解决的不是“如何发一条请求”这么简单的问题，而是把完整接入链路标准化：

```text
识别用户目标
  → 选择账号登录或 API Key 路径
  → 确认服务入口
  → 获取并验证凭证
  → 查询实时模型目录
  → 配置目标客户端
  → 先跑最小请求
  → 再启用工具、图片、视频和自动化
```

## 二、GPT88 Skill 有哪些作用？

### 1. 统一 GPT88 服务入口

GPT88 不是只有一个 URL。Skill 将账号控制面和模型推理 API 分开：

| 服务 | 默认地址 | 用途 |
| --- | --- | --- |
| GPT88 账号与控制面 | `https://agent.gpt88.cc` | 登录、设备授权、账号、API Key、用量、订阅和目录 |
| GPT88 OpenAI 兼容 API | `https://api.gpt88.cc/v1` | 模型列表、聊天、Responses、图片、视频等推理请求 |
| API Origin | `https://api.gpt88.cc` | 查询公开模型目录或构造 API 根地址 |

一个常见错误是把账号控制面地址填到 OpenAI SDK 的 `base_url` 中，或者把完整的 `/chat/completions` 路径填成 Base URL。正确做法是让 SDK 或客户端自己追加资源路径：

```text
Base URL: https://api.gpt88.cc/v1
SDK 追加: /models 或 /chat/completions
```

不要重复写成：

```text
https://api.gpt88.cc/v1/v1/chat/completions
```

### 2. 分离账号凭证和推理凭证

GPT88 Skill 最重要的安全设计之一，是明确区分两种凭证：

| 凭证 | 用途 | 不应该做什么 |
| --- | --- | --- |
| `GPT88_API_KEY` | 调用模型网关和 `/v1/*` 推理接口 | 不用于账号登录、设备授权或支付 |
| `GPT88_ACCESS_TOKEN` | 账号、目录、用量、订阅和设备授权 | 不当作模型 API Key 调用 `/models` |

以下内容都不能直接当作 `GPT88_API_KEY`：

- GPT88 网页密码；
- OAuth 或会话 JWT；
- Refresh Token；
- 设备授权中的 `device_code`；
- 浏览器 Cookie；
- 其它平台的 API Key。

这一区分很关键。账号 Token 证明“你是谁或你是否登录”，API Key 证明“这个请求是否可以进入模型推理网关”。两者的作用域、生命周期和泄露后果不同。

### 3. 让模型、价格和可用性保持实时

Skill 不建议把模型列表和价格写死在文档或脚本里，而是要求先查询实时目录，再选择模型：

```bash
curl -sS --max-redirs 0 \
  "https://api.gpt88.cc/api/v1/model-square/public"
```

对于某个具体 API Key 能使用的模型，可以查询：

```bash
curl -sS --max-redirs 0 \
  "https://api.gpt88.cc/v1/models" \
  -H "Authorization: Bearer $GPT88_API_KEY"
```

这样可以避免三个问题：

- 复制旧文章中的失效模型名；
- 把官方模型名称错误地推断成 GPT88 模型 ID；
- 误以为模型存在就代表当前账号一定有权限。

模型列表、价格、分组倍率、配额和可用能力都可能变化。看到模型 ID 后，仍需要通过一次最小请求验证聊天、工具、视觉、流式或媒体能力是否真的开放。

### 4. 适配不同客户端

GPT88 Skill 将客户端分成两类：

#### 外部客户端和 SDK

包括：

- OpenAI Python / Node.js SDK；
- Cursor；
- Codex；
- Cline；
- Claude Code；
- 其它 OpenAI 或 Anthropic 兼容客户端。

这些客户端通常需要真实的推理 API Key：

```bash
export OPENAI_BASE_URL="https://api.gpt88.cc/v1"
export OPENAI_API_KEY="$GPT88_API_KEY"
export GPT88_MODEL="从实时模型列表复制的模型 ID"
```

#### GPT88 原生产品

GPT88 TUI、Desktop 或 Harness 如果支持原生登录，优先使用产品内置的登录流程，不要让用户手动复制云端密钥。

```text
原生 GPT88 产品 → 账号登录
通用 SDK / 第三方客户端 → GPT88_API_KEY
```

这种区分可以减少云端密钥暴露，也避免把“登录态”和“BYOK 自带 Key”混成一套配置。

### 5. 提供安全的账号和密钥管理流程

GPT88 Skill 不仅描述如何读取 Key，还规定了修改操作的确认边界：

- 查询账号、模型、用量和订阅等只读操作，可以在凭证已提供时执行；
- 创建、更新、删除、撤销、限额调整和兑换等操作，需要在执行前确认；
- 创建 Key 后只显示掩码，不能把包含完整密钥的原始 JSON 打印到终端或日志；
- 充值、支付、提现等操作由用户在浏览器中完成，不通过 Agent 处理卡片或钱包秘密。

这是把“能调用 API”提升为“可以安全运维 API”。

## 三、如何使用 GPT88 Skill？

GPT88 Skill 适合被支持 Skill 的 Agent、Coding Harness 或内部自动化工作流加载。使用时可以按下面的顺序操作。

### 第一步：明确你要接入的对象

先回答三个问题：

1. 你要接入的是 GPT88 原生 TUI/Desktop，还是外部客户端？
2. 你需要账号登录，还是已经有 GPT88 API Key？
3. 你只需要文本请求，还是需要工具、视觉、图片、视频或长任务？

不同答案对应的路径不同：

| 目标 | 推荐起点 |
| --- | --- |
| 使用 GPT88 原生 TUI/Desktop | 产品内置登录 |
| OpenAI SDK / Cursor / Cline / Codex | GPT88 API Key + OpenAI 兼容 Base URL |
| Claude Code | 按当前版本使用 Anthropic 兼容环境变量 |
| 自动化或自定义客户端登录 | 设备授权流程 |
| 图片或视频 | 先验证文本，再查实时媒体能力 |

### 第二步：准备凭证

通常的 API Key 路径是：

1. 登录 [GPT88 控制台](https://agent.gpt88.cc/)；
2. 进入 API Keys 页面；
3. 为目标应用创建独立 Key；
4. 将 Key 保存到环境变量或 Secret Manager；
5. 不在聊天、截图、日志或代码仓库中暴露完整值。

示例：

```bash
export GPT88_API_KEY="YOUR_GPT88_API_KEY"
```

不要在文章或脚本里猜测 API Key 前缀。不同部署的生成前缀可能不同，应该把它当作不透明的秘密值处理。

### 第三步：先验证 API Key

配置客户端前，先用模型列表验证 Key：

```bash
curl -sS --fail-with-body --max-redirs 0 \
  "https://api.gpt88.cc/v1/models" \
  -H "Authorization: Bearer $GPT88_API_KEY"
```

这里使用 `--max-redirs 0`，是为了避免凭证被意外转发到非预期的重定向目标。除本地开发外，API 请求应使用 HTTPS。

如果模型列表请求正常，再从返回数据中复制准确的 `id`，不要自己拼模型别名。

### 第四步：配置 OpenAI 兼容客户端

以 OpenAI SDK 为例：

```bash
export OPENAI_BASE_URL="https://api.gpt88.cc/v1"
export OPENAI_API_KEY="$GPT88_API_KEY"
export GPT88_MODEL="YOUR_AVAILABLE_MODEL_ID"
```

先发一条短文本请求：

```bash
curl -sS --max-redirs 0 \
  "$OPENAI_BASE_URL/chat/completions" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "'"$GPT88_MODEL"'",
    "messages": [{
      "role": "user",
      "content": "Reply with: connection ok"
    }],
    "max_tokens": 16
  }'
```

文本请求成功后，再逐步增加：

1. 流式输出；
2. 工具调用；
3. 图片输入；
4. 长上下文；
5. 异步图片或视频任务。

一次只增加一个变量，出现问题时才知道是哪一层不兼容。

### 第五步：配置 Claude Code、Codex 和 Cline

不同客户端的环境变量名称可能随版本变化，不要默认同时设置所有变量。

Claude Code 常见配置形态是：

```bash
export ANTHROPIC_BASE_URL="https://api.gpt88.cc/v1"
export ANTHROPIC_AUTH_TOKEN="$GPT88_API_KEY"
```

旧版本可能使用 `ANTHROPIC_API_KEY`，应以已安装版本的说明为准。

Codex、Cursor、Cline 等 OpenAI 兼容客户端通常使用：

```bash
export OPENAI_BASE_URL="https://api.gpt88.cc/v1"
export OPENAI_API_KEY="$GPT88_API_KEY"
```

如果 Codex 使用自己的 Provider 配置，则重点检查 `model_provider`、Provider 定义、Base URL、协议字段和模型 ID 是否互相匹配。出现 CLI 找不到、配置未生效或桌面端与终端表现不一致时，可参考 [Codex 工具恢复指南](/docs/guides/codex-tool-recovery/) 和 [Codex 国内接入指南](/docs/blog/codex-china-access-gpt88-guide/)。

## 四、设备授权流程适合什么场景？

设备授权适合需要自定义客户端、自动化登录或不方便直接把账号登录逻辑嵌入应用的场景。

基本流程是：

```text
客户端请求设备授权
  → 服务端返回 user_code 和 device_code
  → 用户在浏览器打开验证地址并批准
  → 客户端轮询授权状态
  → approved 后安全保存账号 Token
```

启动设备流程的示例：

```bash
curl -sS --max-redirs 0 -X POST \
  "https://agent.gpt88.cc/api/v1/auth/device/start" \
  -H 'Content-Type: application/json' \
  -d '{}'
```

响应通常包含：

```json
{
  "device_code": "<private>",
  "user_code": "ABCD2345",
  "verification_uri": "https://agent.gpt88.cc/auth/device",
  "verification_uri_complete": "https://agent.gpt88.cc/auth/device?code=ABCD2345",
  "expires_in": 600,
  "interval": 2
}
```

对用户只展示验证地址和 `user_code`，不要展示或记录 `device_code`。轮询必须遵守服务端返回的 `interval`，不要高频请求。

设备授权可能返回账号 Token、Base URL 或模型信息，但不保证一定返回推理 API Key。如果没有 `api_key`，仍需要从 GPT88 控制台创建 Key，不能把账号 JWT 直接发给模型网关。

如果设备码过期、已经消费或收到无效码错误，应重新开始一轮授权，不要重复使用旧 `device_code`。

## 五、如何查询账号、用量和订阅？

账号相关接口使用账号控制面和 `GPT88_ACCESS_TOKEN`：

```bash
export GPT88_ACCOUNT_BASE="https://agent.gpt88.cc"
export GPT88_ACCESS_TOKEN="YOUR_GPT88_ACCESS_TOKEN"
export AUTH_HEADER="Authorization: Bearer $GPT88_ACCESS_TOKEN"

curl -sS --max-redirs 0 "$GPT88_ACCOUNT_BASE/api/v1/auth/me" -H "$AUTH_HEADER"
curl -sS --max-redirs 0 "$GPT88_ACCOUNT_BASE/api/v1/user/profile" -H "$AUTH_HEADER"
curl -sS --max-redirs 0 "$GPT88_ACCOUNT_BASE/api/v1/usage/stats" -H "$AUTH_HEADER"
curl -sS --max-redirs 0 "$GPT88_ACCOUNT_BASE/api/v1/subscriptions/summary" -H "$AUTH_HEADER"
```

常见的只读资源包括：

- `GET /api/v1/keys`：查看用户 Key 列表，响应可能包含敏感字段；
- `GET /api/v1/groups/available`：查看可用分组；
- `GET /api/v1/groups/rates`：查看分组倍率；
- `GET /api/v1/key-catalog`：查看 Key 可见模型，不返回 Key 秘密；
- `GET /api/v1/usage`：查看用量；
- `GET /api/v1/usage/errors`：定位失败请求；
- `GET /api/v1/usage/stats`：查看用量统计；
- `GET /api/v1/subscriptions/summary`：查看订阅概览。

创建、删除、撤销 Key、调整配额、兑换或转移等属于写操作。执行前应明确目标、参数和影响，获得确认后只执行一次，并进行只读验证。

## 六、图片、视频和异步任务怎么接入？

GPT88 Skill 建议遵循“文本优先”的顺序：

```text
文本请求成功
  → 确认模型目录中的媒体能力
  → 选择精确的媒体端点和参数
  → 保存任务 ID
  → 轮询状态或下载结果
  → 查询用量并避免重复提交
```

可能出现的 OpenAI 兼容媒体路由包括：

- `POST /v1/images/generations`；
- `POST /v1/images/edits`；
- 异步图片任务创建接口；
- `GET /v1/images/tasks/{task_id}`；
- 视频创建、状态和内容接口。

具体端点和参数必须以当前模型能力为准。异步任务即使轮询失败，也可能已经产生费用，因此应保存 `task_id`，先查询任务状态和用量记录，不要直接重复提交。

## 七、GPT88 Skill 适合哪些场景？

### 场景一：团队统一接入多个 AI 客户端

如果团队同时使用 OpenAI SDK、Cursor、Codex、Claude Code 和 Cline，可以用 GPT88 Skill 统一约定：

- API Base URL；
- API Key 保存方式；
- 模型发现方式；
- 最小请求验收；
- 错误码处理；
- 密钥轮换和撤销流程。

这样每个开发者不必从旧文章里复制一套可能失效的配置。

### 场景二：Coding Agent 的自动化接入

Coding Harness 可以调用 GPT88 Skill，让 Agent 在修改项目配置前先完成：

1. 判断用户要的是官方登录还是 BYOK；
2. 检查 API Host 和 Base URL；
3. 从实时目录选择模型；
4. 运行只读模型列表请求；
5. 发一条短文本 smoke test；
6. 只有验证通过后，才继续工具调用或代码任务。

### 场景三：企业内部模型目录和成本控制

企业可以使用账号控制面查询模型、分组、倍率、配额和用量，再根据任务的质量、延迟和成本偏好选择模型。这样模型选型不会停留在静态表格，而是基于当前账号实际可见能力。

### 场景四：自定义客户端设备授权

需要做内部 TUI、桌面客户端或自动化工具时，设备授权可以把“用户在浏览器登录”和“客户端获得授权结果”分离开。客户端只保存必要的账号凭证，不要求用户把密码交给脚本。

### 场景五：图片、视频和长任务工作流

当 Agent 需要发起图片或视频任务时，Skill 提供了更稳妥的顺序：先验证文本链路，再确认实时媒体能力，保存任务 ID，处理轮询失败和重复提交风险，并把最终费用核对纳入流程。

## 八、常见错误与排查方法

| 错误 | 优先检查 |
| --- | --- |
| `401` / `API_KEY_REQUIRED` | API Host、`/v1` 位置、Bearer 语法，确认使用的是推理 API Key |
| `403` | Key 是否激活、过期、分组受限，或账号 Token 权限不足 |
| `404` | 是否将账号地址误用为 API 地址，是否重复添加 `/v1` 或完整 endpoint |
| `400` / `model_not_found` | 查询实时模型列表，复制准确的 `id`，检查模型参数和工具能力 |
| `402` / 余额或配额错误 | 查看账号余额、Key 限额和分组；支付流程在浏览器完成 |
| `429` | 降低并发，使用有限次数的指数退避，不要循环创建新 Key |
| `5xx` / 超时 | 记录时间、状态码、模型和 request ID；按客户端策略有限重试 |
| 设备授权过期 | 重新开始授权，不重复使用旧设备码 |
| 桌面端与终端表现不一致 | 检查进程环境、PATH、配置文件位置和客户端登录态 |

排障时应保留这些非敏感证据：

- 请求时间和时区；
- 客户端与 Skill 版本；
- API Host；
- 模型 ID；
- HTTP 状态码；
- request ID；
- 重试次数；
- 是否使用账号登录或 API Key。

不要记录完整的 API Key、Access Token、Refresh Token、密码、设备码或包含密钥字段的原始 JSON。

## 九、安全使用清单

使用 GPT88 Skill 或把它交给 Agent 前，建议完成以下检查：

- [ ] 账号控制面和推理 API 使用不同 Host；
- [ ] API Base URL 中 `/v1` 只出现一次；
- [ ] SDK 只使用推理 API Key；
- [ ] 账号 Token 只用于账号和目录接口；
- [ ] 凭证保存在环境变量或 Secret Manager；
- [ ] HTTP 重定向被拒绝或明确限制；
- [ ] 外部请求使用 HTTPS；
- [ ] 日志只保留掩码和非敏感诊断信息；
- [ ] 模型来自实时目录，不硬编码过期列表；
- [ ] 文本 smoke test 通过后再启用高级能力；
- [ ] 写 Key、删 Key、改配额、兑换和转移前获得确认；
- [ ] 图片和视频异步任务保存任务 ID；
- [ ] 第三方客户端和 Package 的源码、权限、许可证和卸载方式经过检查。

## 十、最后的最短成功路径

如果你只想把 GPT88 接入一个外部客户端，可以按这个顺序：

```text
1. 登录 GPT88 控制台并创建 API Key
2. 设置 GPT88_API_KEY
3. 使用 https://api.gpt88.cc/v1
4. 调用 GET /models 验证 Key
5. 从返回结果复制模型 ID
6. 发一条短文本请求
7. 再配置 Cursor、Codex、Claude Code 或 Cline
8. 最后才启用工具、图片、视频和自动化
```

如果你是在 GPT88 原生 TUI/Desktop 中使用，则优先走内置账号登录，不要为了测试而创建新的 API Key。

## 总结

GPT88 Skill 的核心价值，是把“接入 GPT88”从一组零散环境变量和命令，提升为一套有边界、有验证、有恢复路径的 Agent 工作流：

```text
服务入口分离
  + 账号凭证与推理 Key 分离
  + 实时模型和价格发现
  + 客户端配置适配
  + 安全写操作确认
  + 可观察的错误排查
```

对个人用户，它可以减少复制旧配置和猜模型名的问题；对团队，它可以统一 SDK、Coding Agent 和自定义客户端的接入方式；对 Agent Harness，它可以把账号、模型、计费、权限、媒体任务和故障恢复纳入同一条可审计链路。

真正稳定的 GPT88 接入，不是把更多工具一次性装上，而是先确认 Host、凭证、模型和最小请求都正确，再逐层增加工具调用、视觉、长上下文、图片、视频和自动化能力。

本文整理自 [Osub/sub2api 的 GPT88 Skill](https://github.com/Osub/sub2api/blob/main/skills/gpt88/SKILL.md)。Skill 中的端点、字段、产品名称、模型、价格、配额和兼容性可能随仓库与服务版本更新；使用前请以 [GPT88 控制台](https://agent.gpt88.cc/)、[GPT88 文档站](https://doc.gpt88.cc/) 和当前客户端说明为准。本文不代表 GPT88 对第三方客户端或 Package 的官方背书。
