---
title: AI Studio 的 Nano Banana 额度怎么看？先分清 5 个入口
description: 讲解 Nano Banana 在 Gemini 应用、AI Studio 浏览器、Gemini Developer API、Vertex AI 与第三方 credits 五个入口的独立额度，按 RPM、TPM、RPD、IPM 四类指标排查 429 与配额问题，附 30 秒确认方法。
date: 2026-05-03
category: API开发
tags: [Nano Banana, AI Studio, Gemini API, 图片生成额度, 速率限制]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: 图片生成 API
---

Nano Banana 没有适用于所有 AI Studio 用户的固定张数。本文说明如何区分 Gemini 应用、AI Studio 浏览器、Gemini API 项目、Vertex AI 与第三方 credits，并按 RPM、TPM、RPD、IPM 找到正确处理方式。

**AI Studio 并不存在一个适用于所有人的 Nano Banana 固定张数。** 真正的数字取决于你使用的是 Gemini 应用、AI Studio 浏览器工作区、Gemini Developer API 项目、Vertex AI，还是第三方封装服务。它们的套餐、项目、模型、计费和限额彼此独立。

如果你在代码中调用 Gemini API，最可靠的数字来自登录后的 [AI Studio 项目速率限制页](https://aistudio.google.com/rate-limit)：确认当前项目、实际模型与用量层级，再看是 RPM、TPM、RPD 还是 IPM。网页里只出现"达到上限"，却没有项目、模型或 quota metric 时，不能直接套用某张网上流传的配额表。

## 先用 30 秒确认：你的额度由谁管理

中文用户常把"额度""配额""速率限制"和"图片生成上限"当成一件事。排障时最好反过来：先找入口，再找管理这个入口的页面。

| 你在哪里生成图片 | 额度归谁管理 | 当前数字到哪里看 | 不要误判为 |
| --- | --- | --- | --- |
| Gemini 网页或移动应用 | Gemini 应用账号与订阅方案 | 产品内提示、设置中的"使用限额"、Gemini 应用帮助 | Gemini API 项目配额 |
| AI Studio 浏览器工作区 | 浏览器功能状态，以及当前所选 API 项目的限制 | 先看界面原文，再核对所选项目的速率限制页 | 所有 AI Studio 用户共享的固定张数 |
| Gemini Developer API | 项目、模型、用量层级和具体 quota metric | AI Studio 的项目速率限制页与 API 错误详情 | 每个 API key 各有一份额度 |
| Vertex AI | Google Cloud 项目、区域、配额、IAM 与结算 | Cloud Console 和 Vertex AI 配额页面 | 用来绕过 AI Studio 限额的"无限通道" |
| 第三方工具或封装 API | 服务商余额、订阅、队列、模型别名与上游合同 | 该服务的账单、用量记录和支持渠道 | Google 项目的原始额度 |

这张表最重要的一点是：**同一个 Google 账号不等于同一个额度池，同一个产品名也不等于同一套限制。** Gemini 应用里不能继续生成图片，不证明 Gemini API 项目已耗尽；第三方界面显示一笔 credits 余额，也不能反推出 Google 项目的 IPM 或 RPD。

## AI Studio 浏览器提示，为什么不能直接等同于 API 配额

AI Studio 既是浏览器里的实验工作区，也是查看 Gemini Developer API 项目与速率限制的入口。因此，"我在 AI Studio 看到限制"至少有两种可能：浏览器功能给出了产品层提示，或者实际请求触发了项目级 API 限制。

判断两者的最短路径是：

1. 保留界面或错误响应的完整原文，不只截取"rate limit"几个字。
2. 确认当前选中的项目，以及 API key 是否属于这个项目。
3. 记录实际模型 ID、失败时间和时区。
4. 打开项目的速率限制页，看是否有某个维度达到当前值。
5. 如果是 API 响应，再保存状态码、错误体、quota metric 和 `retryDelay`。

只有界面提示、没有项目证据时，先按浏览器问题处理。可以刷新状态、缩小为一次受控重试，并核对 AI Studio 官方"达到速率限制"排查说明。若代码明确返回 `429 RESOURCE_EXHAUSTED`，才进入 API 限流分支。

## API 项目要看四种指标，而不是问"每天几张"

Google 当前的 [Gemini API 速率限制文档](https://ai.google.dev/gemini-api/docs/rate-limits?hl=zh-cn) 把常见限制拆成 RPM、输入 TPM、RPD；能生成图片的 Nano Banana 模型还可能使用 IPM。任何一个维度超限，都可能让请求失败。

| 指标 | 它在回答什么 | 常见现象 | 第一动作 |
| --- | --- | --- | --- |
| RPM | 一分钟发了多少请求 | 突发并发时集中失败 | 降并发、入队、指数退避并加入随机抖动 |
| 输入 TPM | 一分钟提交了多少输入 token | 长提示、多图输入或大上下文更容易失败 | 缩短输入、拆分任务、复用可缓存内容 |
| RPD | 一个 API 日内累计多少请求 | 持续运行后当日用尽 | 做日预算并等待 API 日额度重置，必要时申请更高限制 |
| IPM | 一分钟生成了多少图片 | 文本请求正常，图片任务在高峰期受限 | 为图片单独排队，压低并发，避免重试放大 |

Gemini Developer API 的限制按**项目**计算，不按 API key 计算。同一项目里再建一个 key，并不会复制一份额度。若确有稳定业务量，正确做法是记录负载、排队与失败率，在当前项目内优化调用或申请提高限制，而不是轮换 key。

截至 2026 年 7 月 20 日，官方文档说明 API 的 RPD 在**太平洋时间午夜**重置。这个规则只属于 Gemini Developer API 的每日请求维度，不能推到 Gemini 应用、Vertex AI 或第三方 credits。太平洋时区还涉及季节性时差，因此不宜把它永久换算成一个固定的北京时间。

## 一个 429 示例：先认指标，再决定要不要等

假设一个图片队列在 14:06 连续失败，返回 `429 RESOURCE_EXHAUSTED`。你只知道"今天生成了几百张"，仍不足以判断原因。

先补齐这组证据：

- 入口：Gemini Developer API，而不是 Gemini 应用；
- 项目：API key 所属的实际项目；
- 模型：请求体中的完整 model ID；
- 指标：错误详情里的 quota metric；
- 时间：失败时间、时区和是否集中在一分钟内；
- 响应：状态码、错误体、`retryDelay` 与 request ID；
- 面板：同一时刻 AI Studio 显示的项目层级和当前限制。

若指标是 RPM，等到"明天"既慢也没必要，应该削峰与退避；若是 RPD，worker 紧密重试只会制造更多失败；若是 IPM，则应把图片任务从文本请求中拆出来单独排队。需要代码级重试、幂等和日志方案时，可参考 Gemini 图片生成 429 修复的相关资料。

## Gemini 应用不再适合用固定的每日张数表回答

Gemini 应用是消费者产品。它的限制由账号、订阅方案、功能开放状态和当前容量共同决定，不是 AI Studio 项目里的 RPM 或 IPM。

在 2026 年 7 月 20 日核对的 [Gemini 应用用量限额帮助页](https://support.google.com/gemini/answer/16275805?hl=zh-Hans) 中，Nano Banana 2 图片生成和 Nano Banana Pro 图片重做出现在功能可用性列表里；页面同时说明，用量限额可能随测试、实验、开放情况和系统负载调整。当前页面没有给出可安全复用的"各套餐每天固定多少张"图片表。

因此，想知道自己的剩余额度，应以产品内状态为准：进入 Gemini 应用的设置与"使用限额"，并阅读达到限额后的刷新提示。不要把历史截图、论坛数字或旧文章当作当前账号的保证；页面没有公开一个固定数字，也不等于无限使用。

消费者订阅和 API 项目计费也是两件事。购买 Google AI 套餐，可能改变 Gemini 应用里的功能或优先级，但不会自动提高另一个 Gemini API 项目的配额。

## 免费、价格和额度必须分别核对

"Nano Banana 是否免费"不能替代"我的项目还能调用多少次"。至少要分三步：

1. **模型是否可用**：看当前模型文档和账号/项目入口。
2. **免费层或付费层是否支持**：看同一天的官方价格页对应模型行。
3. **当前项目还有多少配额**：看登录后的 AI Studio 项目速率限制页。

截至 2026 年 7 月 20 日，官方 [Gemini Developer API 价格页](https://ai.google.dev/gemini-api/docs/pricing?hl=zh-cn) 中，`gemini-3.1-flash-image`、`gemini-3.1-flash-lite-image`、`gemini-3-pro-image` 和 `gemini-2.5-flash-image` 的标准 API 行都将免费层标为不可用。这是一个带日期的 **API 价格页快照**，不是 Gemini 应用或第三方工具"全部付费"的结论，也不说明某个未登录项目的实时 RPM、RPD 或 IPM。

计费同样不等于无限。付费状态可能改变模型资格和用量层级，但项目、模型、支出、安全与实际容量限制仍然存在。Google 也明确说明，公布的速率限制不保证实际容量，预览或实验模型往往更严格。若你的核心问题是 API 免费层资格，可参考 Gemini API 免费层与项目边界的说明。

## Vertex AI 什么时候是正确入口

Vertex AI 的价值在于把生成式 AI 纳入 Google Cloud 的项目、区域、IAM、日志、结算、治理和配额申请流程。它适合已经需要这些生产控制的团队，但它不是"换个入口就无限生成"的办法。

准备迁移前，应重新核对目标模型在 Vertex AI 的可用性、项目与区域、身份权限、配额名称、成本和支持流程。不要把 AI Studio 的项目数字复制成 Vertex AI 的承诺，也不要为了逃避消费者应用的用量提示而盲目增加 Cloud 复杂度。需要比较两条官方开发路线时，可参考 AI Studio 与 Vertex AI 的选择说明。

地区可用性也是独立检查项，应以 Google 当前官方页面和实际账号状态为准。本文不推断特定地区一定可用，也不把更改地区、账号位置或项目区域当作扩容办法。

## 第三方 credits 为什么不能换算成 Google 配额

第三方工具可能使用"credits""点数""张数"或订阅余额。这些单位由服务商自己的价格、队列、模型别名、失败退款与上游合同定义。即使界面写着 Nano Banana，也不能据此判断 Google AI Studio 项目的 RPM、IPM 或 RPD。

排查第三方限制时，应向该服务确认：实际模型别名、一次成功输出如何扣费、失败是否扣费、余额是否过期、并发和队列规则、上游 429 是否透传。不要把第三方 credits 当成 Google 配额，也不要把购买更多 credits 描述成提高 Google 项目限额。

## 提交配额申请或支持工单前，先准备这份记录

一份可复现的记录比"我今天大概生成了很多张"更容易得到有效处理：

- 使用入口和页面或 API；
- 账号套餐，或项目与用量层级；
- 完整模型 ID；
- RPM、TPM、RPD、IPM 或其他明确 quota metric；
- 失败时间与时区；
- 状态码、错误体、`retryDelay` 和 request ID；
- AI Studio 或 Cloud Console 当前显示值；
- 一分钟与一天的真实请求量、并发和失败率；
- 已采取的限流、排队、缓存和退避措施。

记录里不要公开 API key、项目 ID、账单信息或账号标识。对外求助时使用脱敏后的结构化数据即可。

## 常见问题

### AI Studio 的 Nano Banana 每天能生成多少张图片？

没有适用于所有用户的固定张数。先确认是 AI Studio 浏览器提示还是 Gemini API 项目限制；API 数字应登录 AI Studio 后按当前项目、模型和用量层级查看。未检查你的登录项目，就不应给出一个保证数字。

### Gemini 应用的 Nano Banana 图片上限是多少？

以 Gemini 应用内的"使用限额"、达到限额后的刷新提示和当前 Google Help 为准。当前帮助页说明限额会随测试、开放情况与容量变化，不应继续使用旧的固定日上限表。

### 新建一个 API key 能增加图片额度吗？

不能。Gemini Developer API 的速率限制按项目而不是按 key 应用。同一项目新增或轮换 key，不会产生新的配额池。

### RPD 是什么时候重置？

Gemini Developer API 当前文档写的是太平洋时间午夜。这个结论仅适用于 API 的 RPD，不能用于推断 Gemini 应用、Vertex AI 或第三方 credits 的刷新时间。

### 开通计费后为什么还会返回 429？

因为计费只影响部分资格、层级或支出路径，不会移除 RPM、TPM、RPD、IPM、模型容量与安全控制。查看错误中的 quota metric 和 AI Studio 当前项目页面，才能确定是哪一项耗尽。

### 可以通过 Vertex AI、换地区或第三方工具绕过额度吗？

不应这样理解。Vertex AI 有独立的 Cloud 项目与配额合同；地区可用性是独立条件；第三方工具有自己的 credits 和队列。它们都不是对原 Google 项目额度的扩充或绕过。

### 最快的排查顺序是什么？

按"入口 → 账号或项目 → 模型 → 指标 → 当前面板 → 对应动作"执行。只要其中一项不清楚，就先补证据，不要先猜张数、重置时间或付费状态。
