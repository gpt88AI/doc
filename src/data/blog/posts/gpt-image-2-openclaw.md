---
title: OpenClaw 里使用 GPT Image 2：API Key 和 Codex OAuth 怎么选
description: 在 OpenClaw 中配置 openai/gpt-image-2，先分清 API Key 与 Codex OAuth 的账单、日志与组织归属，再用最小配置验证 provider 路线；附 403、fallback 接管、模型不匹配与透明背景的排查与验收清单。
date: 2026-05-06
category: 技术教程
tags: [GPT Image 2, OpenClaw, OpenAI Codex OAuth, OpenAI API, 图像生成]
readTime: 10
relatedPath: /docs/guides/gpt-image-2-service-notice/
relatedTitle: GPT Image 2 服务说明
---

在 OpenClaw 里，图像模型值应写成 `openai/gpt-image-2`。真正的选择不是把模型名换来换去，而是决定认证路线：生产环境、账单归属、组织控制和可追踪日志优先时，用 `OPENAI_API_KEY`；只是想在已经登录 Codex 的 OpenClaw 个人环境里验证能力时，才考虑 Codex OAuth。

先不要把第一张成功生成的图片当成结论。OpenClaw 可能有 fallback provider，OAuth 资料也可能指向错误账号或过期 profile。最小验收动作是：显式指定 `openai/gpt-image-2`，关闭或标记 fallback，查看 provider 输出或日志，确认认证路线、模型名和返回结果互相一致。

| 路线 | 适合场景 | 验收方式 | 应该切换的信号 |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | 需要生产账单、组织控制、审计日志和团队支持责任 | 日志显示 OpenAI provider 与 `openai/gpt-image-2` | 成本策略、额度或组织政策要求换路 |
| Codex OAuth | 已经在 OpenClaw 中使用 Codex profile，希望少配一把 API Key 做个人验证 | 当前 profile、账号、workspace、provider 输出和无 fallback 测试都能对上 | HTTP 403、profile 过期、workspace 不明或日志不显示 OpenAI route |
| Fallback provider | 作为失败后的备用图像路线，而不是验证 GPT Image 2 的证据 | 输出明确标记非 OpenAI 路线 | 正在排查 OpenAI 路线本身 |

如果 Codex OAuth 返回 HTTP 403，先停下，不要继续改 prompt。检查 OpenClaw 版本、OAuth token、当前账号、workspace、provider 输出和 fallback 配置；生产任务已经等待时，切到 `OPENAI_API_KEY` 往往更容易定位责任边界。若需求是透明背景，当前 `gpt-image-2` 不是正确工具，应改用支持透明输出或后处理的路线。

## 配置 `openai/gpt-image-2`

OpenAI 的模型 ID 是 `gpt-image-2`，OpenClaw 的 provider 形式是 `openai/gpt-image-2`。`openai/` 前缀不是装饰，它告诉 OpenClaw 这次 image request 应该进入 OpenAI provider，而不是进入文本模型、Codex 文本路由或备用图像 provider。

先用最小默认配置，不要在同一次修改里同时换 provider、换模型、换 fallback 和换 prompt。配置越小，后面越容易看出失败属于认证、模型引用、工具能力还是输出参数。

```json
{
  "agents": {
    "defaults": {
      "imageGenerationModel": {
        "primary": "openai/gpt-image-2"
      }
    }
  }
}
```

API Key 路线需要在 OpenClaw 所在环境里设置 `OPENAI_API_KEY`。这条路线的价值不是"看起来更高级"，而是账号、账单、额度、项目、组织和日志都可以回到 OpenAI Platform 侧核对。若通过 GPT88 统一网关接入，把 API Key 换成在 gpt88.cc 控制台获取的 `sk-gpt88-...`，并把 base URL 指向 `https://gpt88.cc/v1`，模型引用保持不变：

```bash
export OPENAI_API_KEY="sk-gpt88-..."
export OPENAI_BASE_URL="https://gpt88.cc/v1"
```

Codex OAuth 路线不要伪造 API Key。它应该通过 OpenClaw 的 OAuth profile 连接当前 OpenAI/Codex 账号，然后仍然使用同一个 `openai/gpt-image-2` 模型引用。这里的风险是 profile 状态更隐性：token 过期、账号切换、workspace 不一致、OpenClaw 版本不匹配，都可能表现成图像调用失败。

| 需要回答的问题 | API Key 路线 | Codex OAuth 路线 |
| --- | --- | --- |
| 请求归谁所有 | `OPENAI_API_KEY` 绑定的 OpenAI 组织或项目 | OpenClaw 当前 OAuth profile 背后的 OpenAI/Codex 账号 |
| 去哪里查额度和账单 | OpenAI Platform 的项目、组织和账单页 | OpenClaw profile 加上背后的账号/workspace 状态 |
| 什么算路线证据 | provider 输出或日志显示 OpenAI 与 `openai/gpt-image-2` | provider 输出显示 OAuth-backed OpenAI 且没有 fallback |

## 先验证路线，再相信图片

先列出或检查 image provider。OpenClaw 的 image generation 能力是 provider-aware 的，所以不要只看最终文件是否生成，要看生成动作由谁接管。

```bash
image_generate action=list
```

再跑一个很小的显式模型测试。测试 prompt 要简单，避免文字渲染、透明背景、复杂编辑、超大尺寸这些会干扰判断的变量。

```bash
image_generate model=openai/gpt-image-2 prompt="A simple product icon on a white desk, no text"
```

看日志时按运营视角读结果：成功但 provider 不是 OpenAI，说明 fallback 生成了图；403 出现在 OAuth 路线，说明先查 profile、账号、workspace 和 token；模型不接受，说明 provider 前缀、OpenClaw 版本或模型访问状态需要重核；透明背景失败，说明参数不受支持，不该继续改 prompt。

| 结果 | 含义 | 下一步 |
| --- | --- | --- |
| 图片成功且日志显示 `openai/gpt-image-2` | 目标路线工作 | 保存配置，再按需恢复带标记的 fallback |
| 图片成功但 provider 不是 OpenAI | fallback 接管 | 标记为非 OpenAI 输出，隔离 OpenAI 路线 |
| Codex OAuth 返回 403 | OAuth profile 或账户路线受阻 | 重新认证、核对 workspace、升级 OpenClaw，必要时切 API Key |
| 模型不支持或找不到 | 当前 provider 没暴露该模型 | 检查 provider 前缀、OpenClaw 文档版本和模型访问 |
| 透明背景失败 | 请求用了不支持的选项 | 去掉透明背景，或用其他模型/后处理 |

## 生产任务优先选 API Key

`OPENAI_API_KEY` 更适合有客户、批量任务、复盘记录或团队责任边界的场景。失败时，你能把 OpenClaw 日志和 OpenAI API 响应放在一起看；成功时，也能把成本、额度和账号归属写进交付记录。

API Key 并不自动代表更便宜，也不代表所有账号都已经可用。它代表更清楚的控制面：谁付费、谁看日志、谁有权限、谁能解释失败。只要图像任务进入生产，这些问题比少配一把 key 更重要。

| 生产要求 | API Key 更清楚的原因 |
| --- | --- |
| 账单归属 | 用量回到 OpenAI API 项目或组织 |
| 支持和排障 | API 响应、OpenClaw 日志和重试记录更容易对齐 |
| 批量生成 | 额度、费用、重试策略有稳定 owner |
| 多人协作 | 中央 API 控制比每个人的 OAuth profile 更容易审计 |
| 合规记录 | 账号、数据和 provider 边界更容易写清楚 |

成本问题应该交给专门的成本页面，而不是塞进 OpenClaw 路线设置。需要比较便宜 API 路线时，可以看 GPT Image 2 的成本与配额资料；这里的任务只是证明 OpenClaw 是否用了你要的路线。

## Codex OAuth 只在 profile 证据充足时使用

Codex OAuth 的吸引力在于轻量：已经在 OpenClaw 里登录 Codex 的用户，可能不想再维护单独的 API Key。做个人验证、低风险实验、临时流程时，这条路线确实省事。

但 OAuth 不是官方免费的 API Key，也不是所有账号天然支持图像路线的保证。它是一个登录 profile。profile 背后是哪一个账号、哪个 workspace、token 是否刷新、OpenClaw 是否把 image route 接到这个 profile，全部都要验证。

| 检查项 | 要看到什么 |
| --- | --- |
| 当前 profile | OpenClaw 指向你预期的 OpenAI/Codex 账号 |
| token 状态 | OAuth 存储和刷新正常，旧凭据已清理 |
| workspace/account | 图像请求没有跑到另一个 workspace |
| provider 输出 | 请求解析到 OpenAI 与 `openai/gpt-image-2` |
| no-fallback 测试 | 备用 provider 不能掩盖 OAuth 失败 |

HTTP 403 出现时，把它当作认证和路线问题。先重新认证，清掉旧 profile，确认 OpenClaw 版本，核对模型访问，再关闭 fallback 重试。如果同样的 403 持续存在，而你又需要稳定交付，切到 `OPENAI_API_KEY` 更务实。

## 处理 403、fallback 和不支持参数

大多数失败可以分成四类：认证、provider 选择、参数不支持、环境未准备好。不要一次改很多设置，否则下一次成功也不能证明到底是哪一步修好了问题。

| 症状 | 第一分支 | 首要检查 | 更好的动作 |
| --- | --- | --- | --- |
| Codex OAuth 403 | 认证/profile | 账号、workspace、token、OpenClaw 版本 | 重新认证并无 fallback 重试 |
| 出图但不是 OpenAI | provider 选择 | fallback note 和 provider 输出 | 关闭 fallback，强制 `model=openai/gpt-image-2` |
| 找不到 `image_generate` | 工具/环境 | 是否配置了图像 provider | 先完成 provider 设置 |
| `openai/gpt-image-2` 不接受 | 模型引用 | provider 前缀和文档版本 | 重新核对模型名与访问状态 |
| 透明背景失败 | 参数不支持 | 请求里的 background 选项 | 移除透明需求或换工作流 |
| 输出慢或不稳定 | 路线/容量 | 额度、fallback、尺寸和质量 | 先证明路线，再判断重试 |

透明背景要硬停。当前 `gpt-image-2` 不支持透明背景输出，继续调整提示词没有意义。需要透明素材时，先用工作路线生成图，再使用支持透明背景的模型或后处理流程。

4K 也不要和路线验证混在一起。OpenClaw 路线验证回答"谁生成了图"，高分辨率验证回答"返回文件是否达到目标尺寸"。尺寸、保存后像素和高分辨率参数属于 GPT Image 2 4K 图像生成资料的范围。

## 路线验收记录

路线验收要把"能生成图片"和"由 OpenAI GPT Image 2 生成"拆成两个结论。第一条结论只说明某个 provider 返回了图，第二条结论必须同时看到模型引用、provider 名、认证 owner 和 fallback 状态。

中文社区常把 Codex OAuth 简写成"免 API Key"，但发布正文不能这样下结论。更准确的说法是：OAuth 可以是一条认证路线，是否能跑 image route 取决于 OpenClaw 版本、账号状态、workspace 和 provider 实现。

如果团队里有人只保存了图片文件，没有保存日志或 provider 输出，这个结果不能进入验收记录。补测时要用小 prompt、关闭 fallback、保留请求时间和 profile 名称，避免把视觉质量评审当成路线证明。

API Key 路线也需要验收。设置了环境变量并不代表 OpenClaw 一定使用它；如果 OpenClaw 的默认模型或 provider 配置仍指向其他路线，图像请求可能不会进入 OpenAI provider。

Codex OAuth 路线的排障顺序应该固定：先确认当前 profile，再确认账号和 workspace，再确认 token 刷新，最后确认 OpenClaw image provider 是否把 `openai/gpt-image-2` 接到这条 OAuth 路线。

## 生产检查清单

交给同事或自动化流程之前，把路线合同写清楚。合同里至少要有模型引用、认证 owner、provider 证据、fallback 策略、失败分支和切换条件。

| 项目 | API Key 路线 | Codex OAuth 路线 |
| --- | --- | --- |
| 模型引用 | `openai/gpt-image-2` | `openai/gpt-image-2` |
| 认证 owner | `OPENAI_API_KEY` 对应的 OpenAI 项目/组织 | OpenAI Codex OAuth profile |
| 路线证明 | provider 输出或日志显示 OpenAI | provider 输出显示 OAuth-backed OpenAI |
| fallback 策略 | 验证时关闭，生产时显式标记 | 验证时关闭，生产时显式标记 |
| 失败分支 | OpenAI API 响应 + OpenClaw 日志 | OAuth profile/账号 + OpenClaw 日志 |
| 切换条件 | 成本、额度、组织策略或 provider 策略 | 403、profile 不稳定、workspace 不明或审计需要 |

保留一个小型 smoke test。它不追求画质，只验证路线健康：不要文字、不要透明背景、不要超大尺寸、不要复杂编辑。smoke test 通过后，再使用相同模型引用和日志设置运行正式图像 prompt。

## 常见问题

### OpenClaw 里模型名应该写什么？

写 `openai/gpt-image-2`。OpenAI 的模型 ID 是 `gpt-image-2`，OpenClaw 需要 provider 前缀来路由到 OpenAI 图像 provider。

### Codex OAuth 等于 GPT Image 2 API 免费吗？

不等于。Codex OAuth 是认证路线，不是官方免费 API 权益。免费的边界以 OpenAI 官方资料为准，不要从认证方式推断免费额度。

### API Key 和 Codex OAuth 应该选哪个？

生产任务优先 `OPENAI_API_KEY`，因为账单、日志、组织控制和支持责任更清楚。Codex OAuth 适合 profile 已通过验证的个人或轻量测试。

### Codex OAuth 为什么会返回 HTTP 403？

把 403 当成认证/profile 分支：检查 OpenClaw 版本、OAuth token、当前账号、workspace、模型访问和 fallback 配置。持续失败时切 API Key。

### 怎么确认不是 fallback 生成的图？

关闭 fallback，显式指定 `model=openai/gpt-image-2`，查看 provider 输出或日志。如果日志显示其他 provider，就不能把图片算作 OpenAI 路线成功。

### GPT Image 2 能直接生成透明背景吗？

当前不要依赖 `gpt-image-2` 做透明背景。需要透明素材时，先生成主体图，再用支持透明背景的模型或后处理步骤。

### OpenClaw 可以做 GPT Image 2 的 4K 输出吗？

先证明 OpenClaw 走了 `openai/gpt-image-2`，再验证尺寸参数和保存后像素。4K 的参数与文件验证应交给专门的高分辨率流程。
