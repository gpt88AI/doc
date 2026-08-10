---
title: Nano Banana Pro 故障排查大全：每个错误代码的已验证解决方案（2026）
description: 完整的 Nano Banana Pro 错误修复指南，涵盖 429 速率限制、500/502 服务器错误、IMAGE_SAFETY 拦截、空白输出和 API 故障。提供生产级 Python 代码和预防策略。
date: 2026-02-21
category: Gemini专题
tags: [Nano Banana Pro, Gemini API, 错误排查, 图片生成, 速率限制]
readTime: 8
relatedPath: /docs/api/images/
relatedTitle: GPT88 图片生成 API
---

Nano Banana Pro 的错误通常分为五大类：速率限制（Error 429，约影响 70% 的用户）、服务器错误（500/502）、安全过滤拦截（IMAGE_SAFETY）、空白输出以及访问权限问题。大多数 429 错误只需等待 60 秒即可解决，因为 RPM 限制会在每分钟重置；而 IMAGE_SAFETY 错误则需要区分 Layer 1（可配置）和 Layer 2（需要通过提示词工程解决）两种过滤器。本篇故障排查大全涵盖了你可能遇到的每一种错误代码，并提供生产级 Python 代码和预防策略，这些内容在其他指南中难以找到。

## 快速修复表 — 10 秒内定位你的错误

<img src="/docs/blog/zh/nano-banana-pro-troubleshooting/img/content-img-1.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="Nano Banana Pro 错误分布图表，显示 429 错误占所有故障的 70%" />

当你的 Nano Banana Pro 图片生成在项目进行中突然失败时，你最不想做的事情就是读完几千字才找到修复方法。下面的错误查找表将每个常见错误代码映射到其含义和 60 秒快速修复方案，帮助你尽快恢复图片生成。每种错误类型都链接到本指南中更详细的章节，供需要深入理解的用户参考。

| 错误代码                      | 含义                            | 60 秒修复方案                  | 详情                                                                       |
|-------------------------------|---------------------------------|--------------------------------|----------------------------------------------------------------------------|
| **429 RESOURCE_EXHAUSTED**    | 速率限制触发（RPM、RPD 或 TPM） | 等待 60 秒后重试               | [Error 429 深入分析](#error-429--rate-limit-exceeded-the-number-one-error) |
| **500 Internal Server Error** | Google 服务器故障               | 30 秒后使用指数退避重试        | [服务器错误](#error-500-and-502--server-side-failures)                     |
| **502 Bad Gateway**           | Google 基础设施过载             | 等待 2-5 分钟后重试            | [服务器错误](#error-500-and-502--server-side-failures)                     |
| **403 Forbidden**             | API 密钥无效或权限不足          | 验证 API 密钥和计费状态        | [API 错误](#api-specific-errors-for-ai-studio-and-vertex-ai)               |
| **IMAGE_SAFETY**              | 内容过滤器触发                  | 诊断 Layer 1 与 Layer 2 的区别 | [IMAGE_SAFETY 指南](#image_safety--why-your-prompt-gets-blocked)           |
| **空白输出**                  | 生成成功但返回为空              | 简化提示词，降低复杂度         | [空白输出修复](#blank-output-and-timeout-errors)                           |
| **超时**                      | 请求耗时过长                    | 降低分辨率或简化场景           | [超时修复](#blank-output-and-timeout-errors)                               |
| **400 Bad Request**           | 请求格式错误                    | 检查提示词格式和参数           | [API 错误](#api-specific-errors-for-ai-studio-and-vertex-ai)               |

Nano Banana Pro 用户群体中的错误分布呈现出清晰的规律，揭示了故障排查的重点方向。Error 429（RESOURCE_EXHAUSTED）约占所有报告问题的 70%，以压倒性的优势成为最主要的故障模式。服务器错误（500 和 502 合计）约占故障的 15%，完全源自 Google 基础设施，不在你的控制范围内。认证错误（403）约占 8%，其余错误——包括 IMAGE_SAFETY 拦截、空白输出和超时——合计约占报告问题的 7%。了解这一分布有助于你确定优先阅读的章节：如果你正在经历间歇性故障，Error 429 几乎可以确定是你的问题所在。

## Error 429 — 速率限制超出（最常见的错误）

Error 429 RESOURCE_EXHAUSTED 是 Nano Banana Pro 用户遇到的最常见问题，而理解其三维速率限制系统对于修复和预防该错误都至关重要。与只限制每分钟请求数的简单 API 不同，Google 的 Gemini API 同时在三个维度上执行限制：RPM（每分钟请求数）、RPD（每日请求数）和 TPM（每分钟 Token 数）。超出任意一个维度都会触发 429 错误，这意味着即使你认为在其他两个维度上远低于配额，仍然可能触发限制。

免费层和付费层之间的速率限制差异非常大，这也是许多用户感到沮丧的根本原因。下表展示了截至 2026 年 2 月的完整层级结构，已与 Google AI 官方文档（ai.google.dev/rate-limits，2026 年 2 月）进行核实：

| 层级       | 要求                        | RPM      | RPD    | TPM     |
|------------|-----------------------------|----------|--------|---------|
| **免费**   | 符合条件地区的用户          | 5-10     | 100    | 15,000  |
| **Tier 1** | 已关联付费结算账户          | 最高 300 | 10,000 | 100,000 |
| **Tier 2** | 累计消费 $250+，30 天以上   | 更高     | 更高   | 更高    |
| **Tier 3** | 累计消费 $1,000+，30 天以上 | 最高     | 最高   | 最高    |

免费层用户每天最多生成 100 张图片，每分钟不超过约 10 张——对于构建应用或运行批处理的人来说，这些限制极为严格。Tier 1 用户的限制跃升至最高 300 RPM 和 10,000 RPD，每分钟容量提升 30 倍，每日容量提升 100 倍。达到 Tier 2 或 Tier 3 不仅需要消费达到门槛金额，还需要从首次付款起等待 30 天，这意味着你不能简单地预付 $1,000 就立即获得 Tier 3 的限制。Gemini 应用（与 API 不同）有其独立的限制，与订阅层级挂钩：免费账户每天约可生成 2 张图片，Pro 订阅用户（$19.99/月）每天约 100 张，Ultra 订阅用户（$99.99/月）每天最多可生成 1,000 张，且支持更高分辨率。

对于 429 错误，最有效的即时修复方法就是等待。RPM 限制每 60 秒重置，因此暂停一分钟后重试即可解决大多数速率限制错误。RPD 限制在太平洋时间午夜重置，因此如果你已用尽每日配额，需要等到第二天。对于更稳健的解决方案，尤其是在生产应用中，你应该实现带随机抖动的指数退避策略。以下 Python 代码提供了一个处理所有三个维度的生产级重试机制。关于 [Gemini 429 错误修复的详细指南](/en/docs/blog/gemini-image-generation-rate-limit)，请参阅我们的专题文章，其中涵盖了边界情况和高级策略。

    hljs python复制import time
    import random
    import google.generativeai as genai

    def generate_with_retry(prompt, max_retries=5, base_delay=2):
        """Generate image with exponential backoff and jitter."""
        for attempt in range(max_retries):
            try:
                model = genai.GenerativeModel("gemini-2.0-flash-exp")
                response = model.generate_content(prompt)
                return response
            except Exception as e:
                if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
                    delay = base_delay * (2 ** attempt) + random.uniform(0, 1)
                    print(f"Rate limited. Waiting {delay:.1f}s (attempt {attempt + 1}/{max_retries})")
                    time.sleep(delay)
                else:
                    raise e
        raise Exception(f"Failed after {max_retries} retries")

除了重试之外，你还有几种应对持续 429 错误的策略选择。升级层级是最直接的途径：关联计费账户即可立即解锁 Tier 1 限制，RPM 提升 30 倍，RPD 提升 100 倍。如果预算允许，达到 Tier 2 或 Tier 3 后，速率限制对大多数使用场景来说将不再是实际问题。另一种选择是通过 Gemini API 的批处理端点进行异步请求处理，费率显著降低。对于需要可靠、大批量访问而又不想管理层级和配额的用户，第三方 API 服务商如 [GPT88.ai](https://gpt88.cc) 提供 Nano Banana Pro 访问，每张图片约 $0.05 且无速率限制，比官方 1K/2K 分辨率图片 $0.134 的单张成本低约 60%（ai.google.dev/pricing，2026 年 2 月）。关于 [Gemini API 速率限制的完整解析](/en/docs/blog/gemini-api-rate-limits-explained)，我们的速率限制详解指南涵盖了每个层级和维度。

## Error 500 和 502 — 服务器端故障

服务器错误 500 和 502 源自 Google 的基础设施，而非你的代码或提示词中的任何问题，这使得它们既令人沮丧又相对容易处理。500 Internal Server Error 表示 Google 的服务器在处理你的请求时遇到了意外情况，而 502 Bad Gateway 则表示充当网关的服务器从上游服务器收到了无效响应。这两种错误都是同一底层问题的表现：Google 的 Gemini 基础设施正在经历负载、维护或瞬时故障，导致你的请求无法成功完成。

这些错误往往集中出现在高需求时段。2025 年 12 月的假期期间出现了特别严重的峰值，社区报告显示使用量增长了 340%，导致 Google 基础设施不堪重负，广泛的 502 错误持续了大约两周。Vertex AI 上的企业用户在 2026 年 1 月初经历了另一次独立事件，Vertex AI 端点持续返回 429 和 502 错误，Google 确认了这一问题并在 2026 年 1 月 8 日推送了部分修复。重要的结论是，服务器错误本质上是暂时性的——随着 Google 扩展容量或完成维护，它们会自行解决，你的代码应当通过重试逻辑优雅地处理这些错误。

应对服务器错误的正确方式是一种既尊重你的时间又顾及 Google 基础设施的重试策略。与 429 错误不同（你知道原因是速率限制），服务器错误可能在几秒内解决，也可能持续数小时。良好的重试策略采用从 30 秒开始的指数退避，每次尝试翻倍至最大 5 分钟延迟，总共 3-5 次重试后转入备选方案。如果重试用尽，你的应用应该有一个降级路径——将请求排队稍后处理、通知用户暂时不可用，或将请求路由到备用端点。对于生产系统，实现熔断器模式（在检测到多次连续服务器错误后暂时停止发送请求）可以防止你的应用加剧过载状况，并在问题解决后自动恢复。

一个帮助你设定预期的重要区别是 500 错误和 502 错误在恢复时间上的差异。500 错误通常表示特定请求处理失败，可能只需重试相同请求即可解决——问题是瞬时的，且局限于你的特定请求。而 502 错误则暗示更广泛的基础设施问题，上游服务器不可用，恢复可能需要更长时间。在 2025 年 12 月的假期危机期间，502 错误对许多用户持续了长达两周，直到 Google 完成容量扩展。如果你在多个不同的提示词和 API 密钥上都看到持续的 502 错误，问题几乎可以确定出在 Google 那端，最有效的做法是监控 Google Cloud 状态仪表板获取更新，而不是反复重试并在失败请求上消耗自己的速率限制配额。

## IMAGE_SAFETY — 你的提示词为何被拦截

<img src="/docs/blog/zh/nano-banana-pro-troubleshooting/img/content-img-3.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="IMAGE_SAFETY 诊断流程图，展示 Layer 1 与 Layer 2 过滤器差异及其各自的修复方案" />

IMAGE_SAFETY 错误可以说是 Nano Banana Pro 用户遇到的最令人困惑的错误，因为它包含两种根本不同的过滤机制，需要完全不同的解决方案。理解 Layer 1 和 Layer 2 过滤器之间的区别是高效解决 IMAGE_SAFETY 拦截的关键，本节将提供最清晰的诊断框架。更详细的操作指南请参阅我们关于[修复 Nano Banana Pro 策略拦截错误](/en/docs/blog/gemini-api-safety-settings-request-blocked)的文章。

**Layer 1 过滤器**是输入端的内容安全过滤器，在生成开始之前检查你的提示词文本。这些过滤器检查的类别包括 HARASSMENT、HATE_SPEECH、SEXUALLY_EXPLICIT 和 DANGEROUS_CONTENT。关键区别在于，Layer 1 过滤器可以通过 API 的安全设置进行配置。将相关类别的阈值设置为 BLOCK_NONE，即可有效禁用该请求的 Layer 1 过滤。当 Layer 1 过滤器触发时，API 响应会显示 `finishReason` 为 `SAFETY`——这就是你正在处理可配置过滤器的诊断信号。

**Layer 2 过滤器**是输出端的图片安全过滤器，检查的是生成的图片本身，而非你的提示词。这些过滤器检查的类别包括 IMAGE_SAFETY、PROHIBITED_CONTENT、CSAM 和 SPII（敏感个人身份信息）。Layer 2 过滤器不可配置——无法通过任何 API 参数禁用或调整。当 Layer 2 过滤器触发时，`finishReason` 会特别显示 `IMAGE_SAFETY`。绕过 Layer 2 拦截的唯一方法是通过提示词工程：重新措辞你的提示词，避免生成触发输出过滤器的内容。

一旦理解了这一区别，诊断过程就很简单了。首先，检查 API 响应中的 `finishReason` 字段。如果显示 `SAFETY`，说明是 Layer 1 的问题——将安全设置配置为 `BLOCK_NONE` 后重试即可。如果显示 `IMAGE_SAFETY`，说明是 Layer 2 的问题——你需要重新表述提示词。对于无法查看 API 响应的 Gemini 应用用户，一个有效的判断方法是提示词本身是否看起来无害：如果你的提示词描述的是一个完全安全的场景但生成仍然失败，你很可能是在图片部分生成后触发了 Layer 2 过滤器。

Google 在 2026 年 1 月收紧了 IMAGE_SAFETY 策略，导致误报率上升，尤其影响电商使用场景。时尚零售商和服装品牌报告称，内衣、泳装或紧身服装的产品图片现在比策略变更前更容易触发 IMAGE_SAFETY 拦截。对于受此影响的电商商家，有效的提示词工程策略包括在提示词中明确指定"fashion catalog photography"（时尚产品目录摄影）、"professional product photography"（专业产品摄影）和"retail merchandise display"（零售商品展示）。添加关于图片商业性质的上下文——如"for an online store listing"（用于网店商品列表）或"product catalog shot on white background"（白色背景的产品目录照片）——可以帮助模型理解合法意图并减少误报。当仅靠提示词工程无法解决时，可以考虑对敏感产品类别使用替代图片生成模型，或先使用 Nano Banana Pro 生成基础图片，再单独编辑问题区域。

## 空白输出和超时错误

空白输出和超时错误是 Nano Banana Pro 的"静默故障"——你的请求看起来似乎成功了（或者至少没有返回明确的错误代码），但你收到的要么是空响应，要么是请求一直挂起直到超时。这些问题特别令人沮丧，因为没有错误信息来引导你的排查方向，而根本原因从过于复杂的提示词到与服务器错误重叠的基础设施问题都有可能。

空白输出最常见的情况是模型尝试生成图片，但在渲染过程中遇到内部问题，导致无法产出有效输出。最常见的触发因素是提示词复杂度：当一个提示词包含太多同时满足的要求——多个主体、特定文字渲染、精确的空间关系和详细的样式——模型可能会静默失败，而非生成低质量的结果。解决方案是系统性地简化提示词。首先从提示词中移除次要需求，只保留核心主体和动作进行测试。如果简化后的提示词成功生成了图片，再逐个添加需求，以确定哪个元素触发了空白输出。这种二分搜索方法远比反复尝试完整提示词的变体要高效得多。

超时错误发生在图片生成过程超过最大允许时间时，该时间因端点和配置而异。Gemini API 同步请求的默认超时通常为 60 秒，在客户端延长超时无济于事——如果服务器端处理本身耗时过长的话。高分辨率请求（特别是 4K 输出，每张 $0.24）更容易出现超时，因为它们需要更多的计算资源和处理时间。2026 年 1 月的一次显著事件导致了大范围的超时崩溃，特别影响了 4K 分辨率的 API 请求，Google AI Studio 和 Vertex AI 端点的用户均受到波及。

如果你在高分辨率输出时遇到超时，最有效的诊断方法是先降至 2K 分辨率（每张 $0.134）来确认问题是否与分辨率相关。如果相同的提示词在 2K 下成功但在 4K 下失败，对 4K 请求实现异步处理是更好的选择——超时不再是问题，因为请求在后台处理，你通过轮询获取结果而非同步等待。对于即使在低分辨率下也会超时的复杂场景，分步生成技术效果很好：将场景拆分为更简单的组件，先生成背景，再通过单独的请求合成前景元素。这种方法不仅能避免超时，而且通常能产出更好的结果，因为每次生成可以专注于渲染好一个元素，而不是在多个同时进行的需求间做妥协。社区测试表明，单个场景中包含三个以上不同主体的提示词，产生空白输出或超时的概率显著高于聚焦单一主要主体加辅助上下文的提示词。

## Nano Banana Pro 在 Gemini 中不显示

最常见的非错误类困扰之一是根本无法找到或访问 Nano Banana Pro。搜索"Nano Banana Pro not showing"或"Nano Banana Pro not available"的用户遇到此问题主要有三个原因：Workspace 账户限制、地区限制和错误的模型选择。每种情况的解决路径不同，因此确定哪种适用于你的情况是第一步。

Google Workspace 账户（前身为 G Suite）不会自动获得所有 Gemini 功能的访问权限。如果你使用由组织管理的 Workspace 账户登录了 Chrome 或 Gemini 应用，你的管理员可能尚未启用 Gemini Advanced 功能或图片生成能力。修复方法需要你的 Workspace 管理员在 Google 管理控制台中启用相关 Gemini 功能，路径为"应用 \> 其他 Google 服务 \> Gemini"。个人用户无法绕过此限制，你必须通过 IT 部门申请访问权限，或切换到个人 Google 账户进行测试。

地区限制也会影响对 Nano Banana Pro 的访问。尽管 Google 在 2025 年全年和 2026 年初大幅扩展了覆盖范围，部分地区仍然无法在 Gemini 应用中完全使用图片生成功能。如果你所在的地区无法在 Gemini 应用界面中使用 Nano Banana Pro，你仍然可以通过 Google AI Studio（ai.google.dev）或 Vertex AI 的 API 进行访问，这些平台的地区覆盖范围更广。使用 VPN 访问 Gemini 应用违反了 Google 的服务条款，可能导致账户受限。

对于找不到 Nano Banana Pro 的 API 用户，问题通常出在模型选择上。Nano Banana Pro 当前的模型标识符是 `gemini-3-pro-image-preview`（ai.google.dev，2026 年 2 月）。原始的 Nano Banana 模型使用 `gemini-2.5-flash-image`，Google 近期宣布了 Gemini 3.1 Pro Preview，但尚未广泛支持图片生成。如果你使用的是旧版模型标识符、过时的 SDK 版本，或引用了 Gemini 3 发布之前的文档，你的请求可能被路由到不支持图片生成的模型。务必验证你使用的是官方文档中的当前模型 ID，并确保你的 SDK 已更新到支持 Gemini 3 模型系列的最新版本。模型之间的价格差异也值得注意：Nano Banana Pro 生成 1K/2K 图片每张 $0.134，4K 图片每张 $0.24；而更快的 Nano Banana（Flash）模型生成 1K/2K 图片每张 $0.067，4K 图片每张 $0.12（ai.google.dev/pricing，2026 年 2 月）。如果你不需要 Pro 级别的质量，切换到 Flash 模型可以将成本降低一半，同时对大多数使用场景保持良好的质量。

## AI Studio 和 Vertex AI 的 API 专属错误

通过 Google AI Studio 或 Vertex AI 在 Nano Banana Pro 之上构建应用的开发者会遇到一组与身份验证、配额管理和平台特定配置相关的独特错误。这些 API 级别的错误与上文讨论的面向用户的错误不同，因为它们往往与图片生成本身无关——它们是基础设施和配置问题，阻止了你的请求到达模型。关于[完整的 Nano Banana Pro API 集成指南](/en/docs/blog/gemini-4k-image-generation-api)，我们的专题文章从零开始引导你完成整个设置流程。

API 环境中的身份验证失败（403 错误）几乎总是可以追溯到三个原因之一：无效或过期的 API 密钥、未启用计费的项目，或 Vertex AI 上不正确的 IAM 权限。对于 Google AI Studio，请验证你的 API 密钥是从配置了计费的同一项目生成的，且该密钥未被轮换或撤销。对于 Vertex AI，身份验证更为复杂，因为它使用服务账户凭据而非 API 密钥——确保你的服务账户拥有 `aiplatform.endpoints.predict` 权限，且你的应用正确加载了服务账户 JSON 凭据。一个常见错误是将 Google AI Studio 的 API 密钥用于 Vertex AI 端点，反之亦然；这是两个独立的系统，使用不同的身份验证机制。

配额耗尽的表现与速率限制（429 错误）不同。429 错误是暂时性的，等待即可恢复，而配额耗尽意味着你已消耗了当前计费周期的分配预算。在 Google Cloud 控制台的"IAM 和管理 \> 配额"中检查你的配额使用情况，如有需要可申请配额提升。理解计费层级和配额之间的关系很重要：Tier 1（已关联付费结算账户）提供最高 300 RPM，Tier 2（累计消费 $250+，30 天以上）提供更高限制，Tier 3（累计消费 $1,000+，30 天以上）提供最高可用限制（ai.google.dev/rate-limits，2026 年 2 月）。

随着 Google 快速迭代 Gemini API，SDK 版本不兼容正成为越来越常见的错误来源。如果你收到意外的 400 Bad Request 错误或看到关于不支持参数的错误信息，你的 SDK 版本可能已经过时。Gemini API 在主要版本之间经历了重大变更，使用早于当前模型的 SDK 可能会发送格式错误的请求。最常见的 SDK 相关问题包括：使用旧的 `generative-ai` Python 包而非当前的 `google-genai` 包、传递已弃用的参数（如已重命名或删除的 `generation_config` 字段），以及引用已被更新版本取代的模型标识符。务必在依赖管理中明确固定 SDK 版本（例如，在 requirements.txt 中使用 `google-genai>=1.0.0`），在暂存环境中测试最新版本后再升级生产环境，并查看官方 SDK 变更日志了解破坏性变更。如有疑问，创建一个最简测试脚本，使用最简单的提示词发送单个请求，以隔离问题出在 SDK 配置还是你的具体请求参数上。

企业用户需要了解的一个关键区别是 Google AI Studio 和 Vertex AI 之间的错误行为差异。在 2026 年 1 月的事件期间，Vertex AI 遭受的 429 错误比 Google AI Studio 端点更严重且持续时间更长。Vertex AI 请求还通过额外的基础设施层（负载均衡器、IAM 检查、VPC 路由），这可能引入延迟和额外的故障点。如果你正在构建对可靠性要求极高的应用，考虑实现从 Vertex AI 到 Gemini API 直连端点（或反向）的降级策略，以提高整体可用性。

    hljs python复制# Dual-endpoint fallback pattern
    import google.generativeai as genai

    def generate_with_fallback(prompt, primary="vertex", max_retries=3):
        """Try primary endpoint, fall back to secondary on failure."""
        endpoints = {
            "vertex": {"project": "your-project", "location": "us-central1"},
            "ai_studio": {"api_key": "your-api-key"}
        }

        for endpoint_name in [primary, "ai_studio" if primary == "vertex" else "vertex"]:
            for attempt in range(max_retries):
                try:
                    if endpoint_name == "ai_studio":
                        genai.configure(api_key=endpoints["ai_studio"]["api_key"])
                        model = genai.GenerativeModel("gemini-3-pro-image-preview")
                        return model.generate_content(prompt)
                    else:
                        # Vertex AI endpoint logic
                        pass
                except Exception as e:
                    if attempt == max_retries - 1:
                        print(f"{endpoint_name} failed after {max_retries} attempts, trying fallback...")
                        break
                    time.sleep(2 ** attempt)

        raise Exception("All endpoints exhausted")

## 预防策略 — 如何彻底避免错误

<img src="/docs/blog/zh/nano-banana-pro-troubleshooting/img/content-img-2.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="错误预防策略流程图，对比被动响应与主动预防两种方法" />

以上每个章节都聚焦于错误发生后的修复，但最有效的策略是从一开始就防止错误发生。其他故障排查指南通常不涉及主动错误预防，这也是本节存在的意义：将你从被动的故障排查者转变为主动的系统设计者。以下预防策略适用于所有用户——无论你是构建应用的开发者、通过 Gemini 应用生成图片的设计师，还是管理团队 AI 图片生成工作流的企业负责人。

速率限制监控是错误预防的基础。与其等待 429 错误告诉你已触及限制，不如主动跟踪使用量与你所在层级限制的对比。对于 API 用户，Gemini API 的响应头中包含速率限制信息，你可以解析并记录这些信息。构建一个简单的仪表板或告警系统，当任一维度（RPM、RPD 或 TPM）的使用量达到 80% 时发出警告。这种预警机制让你有时间在错误发生前节流请求、切换到批处理模式，或临时将流量路由到备用端点。对于无法访问 API 响应头的 Gemini 应用用户，最简单的监控方法是跟踪每次会话生成的图片数量，并在已知订阅层级阈值以下设置个人限制——免费版每天 2 张，Pro 版（$19.99/月）每天约 100 张，Ultra 版（$99.99/月）每天最多 1,000 张，基于社区报告的数据。

成本预算设置可以防止财务意外和配额耗尽。在 Google Cloud 控制台中，分别在月度预算的 50%、80% 和 100% 处配置计费告警。针对 Gemini API，设置项目级配额，将每日支出限制在你的舒适阈值以下。这在使用较高成本的功能时尤为重要，比如每张 $0.24 的 4K 图片生成——一个失控的脚本生成数千张图片可能导致意外费用。1,000 张 4K 图片的批量成本为 $240，在开发和测试阶段可能迅速累积。计费告警不会自动停止消费，因此需要将其与配额限制配对使用，后者可以强制执行硬性上限。软告警与硬配额上限的组合形成了一道安全网，既能防止渐进式的预算攀升，也能防止失控进程或意外流量激增导致的突发支出。从事生产应用的团队应指派专门的计费管理员，每周审查支出模式，并根据实际使用趋势调整配额，而非设置过于严格或过于宽松的任意限制。

智能请求调度将你的 API 使用均匀分布在时间维度上，避免在突发期间触及 RPM 限制。与其尽可能快地发送 100 个请求并立即触及免费层 5-10 RPM 的限制，不如实现一个请求队列，以固定间隔分发请求。对于批处理任务，将繁重的工作负载安排在非高峰时段（太平洋时间深夜到清晨），此时 Google 基础设施的整体负载较低，可以降低 429 速率限制错误和 500/502 服务器错误的概率。关于[寻找最具性价比的 Nano Banana Pro API 访问方式](/en/docs/blog/cheapest-stable-nano-banana-pro-api)，我们的价格比较指南分析了所有可用选项。第三方服务商如 [GPT88.ai](https://gpt88.cc) 可以充当你架构中的可靠性层——通过拥有自己的请求管理、重试逻辑和多端点故障转移的服务商路由请求，可以在错误到达你的应用之前消除大部分错误类别，每张图片约 $0.05 且无速率限制（文档详见 [docs.GPT88.ai](https://gpt88.cc)）。

## 常见问题

### 429 错误后应该等多久？

对于 RPM（每分钟请求数）限制，等待 60 秒就足够了，因为限制窗口每分钟重置。对于 RPD（每日请求数）限制，你必须等到太平洋时间午夜，届时每日计数器会重置。如果你不确定是哪个维度触发了错误，先等 60 秒——如果错误持续存在，你可能已触及 RPD 限制，需要等到第二天或升级你的计费层级以获得更高限制。

### 不付费能否提高速率限制？

免费层的限制固定在约 5-10 RPM 和 100 RPD。提高限制的唯一途径是关联计费账户（Tier 1），这将限制提升至最高 300 RPM 和 10,000 RPD。进一步提升需要累积消费：Tier 2 需要累计消费 $250+，Tier 3 需要累计消费 $1,000+，每个层级从首次付款起还需要 30 天的等待期（ai.google.dev/rate-limits，2026 年 2 月）。

### 为什么 Nano Banana Pro 会拦截安全的图片？

这几乎总是 Layer 2 IMAGE_SAFETY 过滤器的问题。Layer 2 检查的是生成的图片输出，而非你的提示词文本。即使你的提示词描述的是完全安全的场景，生成的图片也可能包含触发输出过滤器的元素——例如，肤色、姿势或构图被过滤器解读为可能不适当的内容。解决方案是提示词工程：添加关于图片商业或教育性质的明确上下文，精确指定服装细节，避免模型可能以非预期方式解读的模糊描述。

### Error 429 和 Error 503 有什么区别？

Error 429（RESOURCE_EXHAUSTED）意味着你个人已超出分配的速率限制——它与你的 API 密钥和计费层级相关。Error 503（Service Unavailable）意味着 Google 的服务对所有用户暂时不可用或过载。429 的修复方法是等待个人限制重置或升级层级。503 的修复方法是使用指数退避重试，因为它表示服务器端问题，会自行解决。

### 如何无错误地使用 Nano Banana Pro API？

无错误 API 使用的关键是实现三层保护：第一，对所有 API 调用使用带随机抖动的指数退避，以自动处理瞬时错误；第二，监控使用量与层级限制的对比，在触及阈值前节流请求；第三，实现降级策略（备用端点、请求排队或替代服务商），以应对主要端点不可用的情况。本指南中的生产级 Python 代码示例为这三层保护提供了基础。在实践中，实现了全部三层保护的团队报告生产环境中的错误率低于 1%，而仅被动处理错误的应用错误率为 15-30%。前期的工程投入很小——通常只需几个小时——但长期的可靠性改善是巨大的，直接转化为更好的用户体验和更低的运营成本（减少调试时间和浪费的 API 调用）。
