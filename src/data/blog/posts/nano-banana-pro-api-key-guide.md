---
title: Nano Banana Pro API Key 申请与安全接入指南
description: 当前 Nano Banana Pro API key 指南：Google AI Studio auth key、项目与计费、环境变量、后端代理、Gemini 3 Pro Image 调用、429 配额边界和第三方网关验证。
date: 2026-02-01
category: Gemini专题
tags: [Nano Banana Pro, Gemini API, API key, Auth key, 图片生成]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: GPT88 图片生成 API
---

Nano Banana Pro API key 不是一个单独的“图片生成密码”。它绑定到 Google Cloud project，用来决定身份验证、计费、配额和权限边界。2026 年以后，最重要的变化是：Google Gemini API 正在从 standard API key 转向 authorization key，也就是 auth key。

截至 2026-07-08，新的 Google AI Studio API key 默认会创建为 auth key。Google 文档还写明：2026-06-19 起，未加限制的 standard key 会被拒绝；2026-09 起，Gemini API 会拒绝 standard key。旧项目如果还在用 standard key，应该尽快迁移。

| 你要做什么           | 当前建议                                                   |
|----------------------|------------------------------------------------------------|
| 新项目申请 key       | 在 Google AI Studio 创建新的 auth key                      |
| 旧项目继续上线       | 检查 key type，迁移 standard key                           |
| 调用 Nano Banana Pro | 用当前模型 ID `gemini-3-pro-image`，并确认项目可用         |
| 管理密钥             | 放在环境变量或 Secret Manager，不要放进前端或 Git          |
| 处理额度和账单       | 看项目级配额、billing、rate limits，不看 API key 本身      |
| 使用第三方网关       | 只作为付款、兼容接口或路由便利方案，必须验证当前模型和账单 |

官方事实请以 Google 的 [API key 文档](https://ai.google.dev/gemini-api/docs/api-key)、[image generation 文档](https://ai.google.dev/gemini-api/docs/image-generation)、[rate limits 文档](https://ai.google.dev/gemini-api/docs/rate-limits) 和 [billing 文档](https://ai.google.dev/gemini-api/docs/billing) 为准。

<img src="/docs/blog/zh/nano-banana-pro-api-key-guide/img/content-img-1.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="官方与第三方API价格对比" />

<img src="/docs/blog/zh/nano-banana-pro-api-key-guide/img/content-img-2.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="API错误处理流程" />

<img src="/docs/blog/zh/nano-banana-pro-api-key-guide/img/codex-explainer-4.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="Nano Banana Pro API 密钥申请与项目集成指南 - codex-explainer-4" />

## 先判断你需要哪种路线

Nano Banana Pro API 接入通常有三条路线。

| 路线                          | 适合谁                                       | 边界                                           |
|-------------------------------|----------------------------------------------|------------------------------------------------|
| Google AI Studio / Gemini API | 个人开发者、原型、直接接入 Gemini API        | key、配额和计费归属于 Google project           |
| Vertex AI / Google Cloud      | 企业、合规、IAM、审计、数据驻留、生产治理    | 使用 Cloud 身份、项目、区域和企业控制          |
| 第三方网关                    | 需要本地支付、兼容接口、多模型路由或备用通道 | 当前价格、模型覆盖、失败计费和日志必须逐项验证 |

如果你的问题是“我怎么拿到官方 key 并安全调用”，从 Google AI Studio 开始。如果问题是“我在国内支付不方便、想用兼容接口测试”，可以把网关作为候选路线，但不要把网关营销页当作官方模型事实。

## Step 1: 在 Google AI Studio 创建 auth key

进入 Google AI Studio 的 API Keys 页面，选择已有 project 或创建新 project，然后创建 key。新的 key 默认是 auth key。auth key 绑定到 Google Cloud service account，权限控制比旧 standard key 更细，也有更快的泄露 key 处理机制。

创建后先记录三件事：

| 信息              | 为什么重要                                                       |
|-------------------|------------------------------------------------------------------|
| project 名称和 ID | quota、billing、日志都属于 project                               |
| key type          | 确认是否为 auth key，避免 2026 年迁移风险                        |
| billing 状态      | Nano Banana Pro 是否可用、是否能生产调用，取决于模型行和项目状态 |

如果 AI Studio 显示你没有权限创建 key，通常是项目权限不足。让管理员授予能够查看 project、创建 API key、启用 Generative Language API、创建 service account 和绑定 service account key 的权限，或者使用一个不受组织限制的新项目。

## Step 2: 迁移旧 standard key

如果你的项目是 2026 年以前创建的，先在 API Keys 页面检查 Key Type。

| 状态                         | 处理                                           |
|------------------------------|------------------------------------------------|
| Auth key                     | 可以继续按当前最佳实践使用                     |
| Standard key 且已加限制      | 尽快计划迁移到 auth key                        |
| Standard key 且 unrestricted | 高风险；2026-06-19 后已进入拒绝风险区          |
| Dormant 或 blocked key       | 重新生成 key，并检查调用服务是否仍在使用旧 key |

迁移方式很直接：

1.  在 AI Studio 创建新的 auth API key。
2.  把后端环境变量更新到新 key。
3.  部署并验证调用成功。
4.  检查日志和账单是否落到正确 project。
5.  禁用旧 key，确认没有流量后再删除。

不要在没有验证新 key 的情况下直接删除旧 key。生产系统应先双写配置或灰度发布，确认调用正常后再关闭旧 key。

## Step 3: 安全保存 key

API key 泄露会消耗项目配额并产生账单风险。最基本的规则是：不要把 key 放到前端、移动端包、公开 Git 仓库、截图、日志、文档示例或工单里。

开发环境可以用环境变量：

    hljs bash复制export GEMINI_API_KEY="your_key_here"

Node.js 或 Python 客户端通常会读取 `GEMINI_API_KEY`。如果你的系统同时配置了 `GOOGLE_API_KEY`，注意官方文档说明：两个变量都存在时，`GOOGLE_API_KEY` 会优先。

生产环境建议：

| 场景     | 建议                                       |
|----------|--------------------------------------------|
| 后端服务 | 环境变量或 Secret Manager                  |
| Web 应用 | 前端只调用你的后端，不暴露 Gemini key      |
| 移动应用 | 后端代理或受控 token，不把 key 编译进 app  |
| 多环境   | dev、staging、prod 分不同 project 和 key   |
| 团队协作 | 用权限系统发放访问，不在聊天工具直接贴 key |

如果怀疑泄露，立即创建新 key、更新应用、禁用旧 key，并审计账单和 API 使用日志。

## Step 4: 调用当前 Nano Banana Pro 模型

新代码不要复制旧的 preview 模型名，也不要使用旧的 image 参数形态。当前 Gemini 3 image 文档使用 Interactions API 示例。Nano Banana Pro 的当前模型 ID 是 `gemini-3-pro-image`。

最小 Node.js 示例：

    hljs ts复制import { GoogleGenAI } from "@google/genai";

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    export async function createProImage(prompt: string) {
      return ai.interactions.create({
        model: "gemini-3-pro-image",
        input: prompt,
        response_format: {
          type: "image",
          aspect_ratio: "16:9",
          image_size: "2K",
        },
      });
    }

这个示例只说明调用形态，不承诺你的项目一定有权限、一定有免费额度、一定支持某个输出尺寸或一定不会触发 429。上线前必须在同一个 project 里核对 model availability、pricing、rate limits 和 billing。

## Step 5: 配额和计费不是 key 本身决定的

Gemini API rate limits 按 project 计算，不按 API key 计算。多个 key 在同一个 project 下，仍然共享同一个配额池。创建更多 key 不能增加容量，反而会让账单和错误排查更混乱。

上线前至少记录：

| 项目         | 需要记录                            |
|--------------|-------------------------------------|
| model ID     | `gemini-3-pro-image` 或其他具体模型 |
| 输出尺寸     | 1K、2K、4K 等                       |
| project ID   | 账单和配额归属                      |
| billing tier | 是否已开启计费，是否有 spend cap    |
| rate limits  | RPM、TPM、RPD、图片相关限制         |
| 失败策略     | 429 时排队、退避、降级还是提示用户  |

如果遇到 429，不要创建更多 key。先看当前 [Gemini 3 Pro Image API 配额指南](/docs/blog/gemini-3-pro-image-api-quota-limits-zh)，确认 project 级限制和使用量。

## 第三方网关怎么纳入评估

第三方网关可能解决本地支付、OpenAI 兼容接口、统一模型路由、日志和备用通道问题。但它不是官方 API key，也不能替代 Google 文档里的模型事实。

接入前必须核对：

| 核对项                            | 为什么重要                           |
|-----------------------------------|--------------------------------------|
| 当前是否支持 `gemini-3-pro-image` | 旧模型名或别名可能已变               |
| 输出尺寸是否可控                  | 1K、2K、4K 成本和质量不同            |
| 失败调用如何计费                  | 超时、拦截、429、无图输出都要看账单  |
| 价格是否来自控制台                | 不用旧文章价格做预算                 |
| 错误返回是否清楚                  | 需要区分余额、上游、限流、模型不可用 |
| 数据是否适合经过网关              | 敏感数据优先官方或企业路线           |

如果网关确实能降低支付和集成摩擦，可以纳入小样本测试。生产前用同一组提示词比较官方路线和网关路线的成功率、输出质量、账单、延迟和支持响应。路线选择可以参考 [Nano Banana Pro API 怎么选](/docs/blog/cheapest-stable-nano-banana-pro-api)。

## 常见错误

### 401 或 403

先确认 key 是否属于当前 project、是否被禁用、是否已迁移到 auth key、是否有权限调用 Gemini API。不要只看 key 字符串是否正确。

### 模型不可用

确认模型 ID 是否为当前官方 ID，并检查你的 project、区域、billing 和模型行。旧 preview 名称不应作为新代码依据。

### 429

这是配额、速率、日限制、图片相关限制或 spend 限制信号。按 project 查，不按 key 查。需要排队、退避、降载或升级项目，而不是复制更多 key。

### 前端请求能否直接带 key

不要。前端 key 可以被用户提取。生产应用应该由后端代理调用 Gemini API，并在后端做鉴权、限流、日志和账单保护。

### Gemini app 订阅是否等于 API 权限

不等于。Gemini app、AI Studio / Gemini API、Vertex AI 是不同路线。订阅、API billing 和 Cloud project 不能混为一谈。

## 发布前检查清单

-   key type 已确认为 auth key，或已有迁移计划。
-   key 存在环境变量或 Secret Manager 中。
-   前端和移动端不直接暴露 Gemini key。
-   project、billing、rate limits、model ID 都已记录。
-   代码使用当前 `gemini-3-pro-image` 和 Interactions API 形态。
-   429、401、403、模型不可用都有清楚错误处理。
-   第三方网关只在通过当前控制台和小样本测试后使用。

Nano Banana Pro API key 的核心不是“拿到一串 key”，而是把 key 放进正确 project、正确计费、正确权限和正确安全边界里。先把官方 auth key 路线跑通，再按你的支付、成本和生产要求决定是否增加网关路线。
