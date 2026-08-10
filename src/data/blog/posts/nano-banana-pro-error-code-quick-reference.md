---
title: Nano Banana Pro 错误代码速查手册：60秒修复所有API错误（2026）
description: Nano Banana Pro 完整错误代码速查手册，涵盖429、500、503、IMAGE_SAFETY等全部错误码。可重试/不可重试分类、诊断流程图和生产级错误处理代码。
date: 2026-02-22
category: Gemini专题
tags: [Nano Banana Pro, 错误代码, API参考, 速查指南, Gemini API]
readTime: 8
relatedPath: /docs/api/images/
relatedTitle: GPT88 图片生成 API
---

Nano Banana Pro 的所有错误可以分为三大类：客户端错误（400、403、404），可以立即修复；服务端错误（429、500、503、504），需要耐心等待和重试逻辑；以及图像安全相关错误（SAFETY、IMAGE_SAFETY），需要修改提示词。本速查手册涵盖了经 Google AI 官方文档（ai.google.dev，2026年2月）验证的全部8个官方错误代码，包括一行修复方案、可重试/不可重试分类，以及一套30秒诊断流程，完全匹配开发者在生产环境中的实际排查习惯。

## Nano Banana Pro 完整错误代码表

<img src="/docs/blog/zh/nano-banana-pro-error-code-quick-reference/img/content-img-1.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="Nano Banana Pro 错误代码分类图：可重试与不可重试错误及分布数据" />

> **快速解答：** Nano Banana Pro 有8个官方HTTP错误代码（400、403、404、429、500、503、504）以及图像特有错误（SAFETY、IMAGE_SAFETY）。最常见的是429 RESOURCE_EXHAUSTED（约占所有错误的70%），等待60秒即可解决。

下方的错误代码主表只有一个目的：让你在10秒内从错误信息找到修复方案。每个错误代码都包含其官方 Google API 状态、是否应该重试、以及最快的解决路径。与那些用数千字详细讲解每个错误的排错指南不同，本表让你一目了然地获取关键信息，方便收藏此页面，在每次遇到问题时随时查阅。

| HTTP 状态码 | 错误状态            | 可重试？ | 一行修复方案                               | 恢复时间      |
|-------------|---------------------|----------|--------------------------------------------|---------------|
| **400**     | INVALID_ARGUMENT    | 否       | 检查请求体格式和API参数                    | 立即          |
| **400**     | FAILED_PRECONDITION | 否       | 启用计费或切换到支持的区域                 | 立即          |
| **403**     | PERMISSION_DENIED   | 否       | 重新生成API密钥并验证权限                  | 立即          |
| **404**     | NOT_FOUND           | 否       | 验证模型名称和资源路径                     | 立即          |
| **429**     | RESOURCE_EXHAUSTED  | 是       | 等待60秒（RPM）或等到太平洋时间午夜（RPD） | 60秒至24小时  |
| **500**     | INTERNAL            | 是       | 使用指数退避重试，初始等待30秒             | 30秒至5分钟   |
| **503**     | UNAVAILABLE         | 是       | 等待30-120分钟或临时切换模型               | 30分钟至2小时 |
| **504**     | DEADLINE_EXCEEDED   | 是       | 增加超时设置或简化输入内容                 | 立即          |
| **—**       | SAFETY              | 否       | 重写提示词，避免被标记的内容               | 立即          |
| **—**       | IMAGE_SAFETY        | 否       | 生成的图像被标记，尝试不同的描述方式       | 立即          |

可重试与不可重试的区分是这张表传递的最核心概念，因为它直接决定了你的下一步操作。当你看到可重试错误（429、500、503、504）时，正确的做法是等待后重新发送完全相同的请求——你的代码没问题，服务器只是需要时间。当你看到不可重试错误（400、403、404、SAFETY、IMAGE_SAFETY）时，重试相同的请求只会产生相同的失败结果，因此你必须先修改请求内容再重试。这种分类方式是其他速查手册所没有提供的，但它恰恰是开发者在终端面对错误时最需要的可操作信息。

来自开发者论坛和 Google AI Studio 讨论区的社区数据一致显示，约70%的 Nano Banana Pro 错误都是429 RESOURCE_EXHAUSTED，这意味着你遇到的绝大多数错误都是临时性的，会自行恢复。服务端错误（500、502、503合计）约占15%，认证错误（403）约占8%，其余错误（包括IMAGE_SAFETY和超时）占最后的7%。了解这个分布有助于你确定调试优先级——如果你的应用间歇性失败，速率限制几乎可以确定是原因。如需深入了解每个错误代码及其边界情况，请参阅[Nano Banana Pro 完整排错指南](/docs/blog/nano-banana-pro-troubleshooting)。

## 客户端错误——可以立即修复（400、403、404）

> **快速解答：** 客户端错误意味着你的请求有问题，而非 Google 服务器的问题。这些错误不可重试——你必须修复根本原因后请求才能成功。最常见的修复方法是纠正格式错误的JSON、重新生成API密钥和验证模型名称。

4xx范围内的客户端错误是最令人沮丧的，因为它们告诉你代码或配置有问题，但 Gemini API 的错误信息往往不够具体，无法精确定位问题所在。好消息是，这些错误都有确定性的解决方案：一旦你找到并修复了根本原因，错误就会永久消失。与不可预测地时有时无的服务端错误不同，400或403错误会一直持续到你修改代码为止，这反而使得系统化调试更加容易。

**错误400 INVALID_ARGUMENT** 是最常见的客户端错误，通常意味着你的请求体包含格式错误的JSON、无效的参数值或缺少必填字段。Gemini API 对图像生成请求的格式要求特别严格——常见的错误包括使用了已弃用的参数名、发送空的提示词字符串，或指定了无效的图像尺寸。要快速诊断此错误，请将你的请求体与[API集成指南](/en/docs/blog/gemini-4k-image-generation-api)中的示例进行对比，查找结构性差异。一个相关的变体是400 FAILED_PRECONDITION，当你尝试使用所在区域不可用的免费层功能，或项目缺少必要的计费配置时就会出现。

**错误403 PERMISSION_DENIED** 表示你的API密钥不存在、已被撤销，或缺少访问 Nano Banana Pro 模型所需的权限。这个错误经常出现在这样的开发者身上：他们为一个 Google Cloud 项目创建了密钥，却在另一个项目中发起请求；或者将密钥的API访问权限限制为不包含 Generative Language API。最快的修复方法是进入 Google AI Studio 控制台，生成新的API密钥，然后在代码中替换旧密钥。如果你使用的是 Vertex AI 而非直接的 Gemini API，请确保服务账号具有 `aiplatform.endpoints.predict` 权限，且项目中已启用 Vertex AI API。

**错误404 NOT_FOUND** 发生在请求中的资源路径与任何现有模型或端点不匹配时。对于 Nano Banana Pro，最常见的原因是使用了错误的模型标识符——API调用中应该使用的官方模型名称与"Gemini 3 Pro Image Preview"变体相关联，开发者有时会将其与其他 Gemini 模型混淆，或使用早期预览版本中的过时命名。请仔细检查你的端点URL是否遵循 `https://generativelanguage.googleapis.com/v1beta/models/{model-name}:generateContent` 模式，且模型名称与 Google AI Studio 模型选择器中显示的完全一致。

## 服务端错误——何时等待 vs 切换（429、500、503、504）

> **快速解答：** 服务端错误是可重试的——你的代码正确，但服务器当前无法处理你的请求。429错误需要等待60秒，500错误需要指数退避重试，503表示服务过载（等待30-120分钟），504表示请求超时。

服务端错误需要与客户端错误截然不同的排查思路，因为问题存在于 Google 的基础设施上，而非你的代码中。对任何5xx错误的正确应对是实施带有适当退避间隔的重试逻辑，对429错误的正确应对是通过暂停来遵守速率限制。试图通过修改请求参数来"修复"服务端错误只是浪费精力，因为如果服务器处于正常状态，相同的请求原本就会成功。

**错误429 RESOURCE_EXHAUSTED** 值得专门详细讲解，因为根据开发者社区报告，它约占所有 Nano Banana Pro 故障的70%。Gemini API 同时在四个维度上执行速率限制：RPM（每分钟请求数）、TPM（每分钟输入token数）、RPD（每日请求数）和IPM（每分钟图片数，Nano Banana Pro 特有）。超过任何单一维度都会触发429错误。许多开发者忽略的关键细节是，速率限制是按项目计算的，而非按API密钥——在同一个 Google Cloud 项目中创建多个API密钥并不会增加你的配额（Google AI 文档，2026年2月19日验证）。RPD限制在太平洋时间午夜重置，这意味着其他时区的开发者需要据此规划批处理时间窗口。关于全面的速率限制策略和计算方法，请参阅[详细速率限制分析](/docs/blog/nano-banana-pro-rate-limits)。

**错误500 INTERNAL** 表示 Google 服务器内部发生了意外故障，是最难排查的错误，因为它提供的诊断信息极少。社区数据表明这些错误通常在30秒到5分钟内自行恢复，因此指数退避是理想策略。从30秒延迟开始，每次重试将延迟翻倍，添加0-5秒的随机抖动以防止"惊群效应"，最多重试5次后发出告警。如果你在连续多分钟内持续看到500错误，问题可能是更广泛的 Google 基础设施问题，而非你的请求特有的问题，此时检查 Google Cloud 状态仪表板即可确认是否存在活跃的事故。

**错误503 UNAVAILABLE** 是影响第二大的服务端错误，当 Nano Banana Pro 遭遇超出 Google 服务容量的高需求时就会出现。这个错误在模型初始预览发布期间尤为常见，在使用高峰期仍会出现。根据开发者报告，恢复时间通常为30分钟到2小时，严重故障可能持续更久。遇到503错误时，最实际的即时应对是：如果你的应用支持降级逻辑，临时切换到其他模型；或使用后台任务系统将请求加入队列以待重试。503错误通常具有区域性，即使你的主要区域过载，通过不同地理端点路由的请求可能仍然成功。

**错误504 DEADLINE_EXCEEDED** 表示你的请求处理时间超过了服务器的超时阈值。对于图像生成请求，这种情况通常发生在描述复杂场景（包含大量元素的精细场景）的高复杂度提示词上，或系统处于中等负载下处理时间增加时。修复方法很简单：将客户端超时设置增加到至少120秒用于图像生成请求，如果超时持续发生，考虑简化提示词。与表示服务级问题的503错误不同，504错误通常是针对单个请求的。

## 图像生成错误（SAFETY、IMAGE_SAFETY、空白输出）

> **快速解答：** 图像特有错误发生在三个阶段：生成前提示词被拒绝（SAFETY/blockReason）、生成后图像被标记（IMAGE_SAFETY）、以及生成成功但返回空结果（空白输出）。每种情况需要不同的修复方法。

Nano Banana Pro 的安全过滤器通过多层系统运作，在生成管道的不同阶段评估内容，理解是哪一层触发了错误对于选择正确的修复方法至关重要。这三层独立工作——你的提示词可能通过了第一层检查，却在第二层被生成的图像阻止——这就是为什么开发者有时会在使用略有不同的提示词生成类似图像时看到不一致的结果。关于应对安全过滤器的全面指南，请参阅[安全过滤器排错指南](/en/docs/blog/gemini-api-safety-settings-request-blocked)。

**第一层：提示词安全（finishReason: SAFETY）** 在任何图像生成开始之前运作，评估你的文本提示词是否符合 Google 的内容政策。当此层触发时，你会收到包含 `finishReason: SAFETY` 的响应，`promptFeedback.blockReason` 字段指示提示词被拒绝的原因。SAFETY阻止原因通常在提示词包含露骨暴力、仇恨言论或性暗示内容时激活，但也可能在一些看似无害的边界情况下触发——涉及医疗程序、特定历史事件或特定公众人物的提示词偶尔会产生误报。第一层阻止的修复方法是在保持创意意图的同时，用更中性的语言重新表述提示词。不要描述具体的暴力行为，而是描述情感后果；不要使用真实人物姓名，而是描述角色特征。

**第二层：图像安全（finishReason: IMAGE_SAFETY）** 在图像创建完成后评估生成的图像本身，这意味着 Google 的服务器已经花费了计算资源生成了一张在你看到之前就被丢弃的图像。这一层会捕获通过了提示词过滤器但产生了违反政策的视觉内容的图像——例如，一个要求"历史战争场景"的提示词可能通过了第一层，但生成的图像包含了触发第二层的图形暴力内容。遇到IMAGE_SAFETY错误时，尝试从不同角度描述你的场景，添加"水彩风格"、"极简主义"或"抽象风格"等修饰词来引导产出不那么写实的输出，或减少描述中的细节程度。

**第三层：特殊阻止（BlockedReason.OTHER）** 表示超出标准内容政策的服务条款违规，是三层中最严格的。仅通过提示词工程无法绕过此阻止，因为它通常表示你的内容因反复违反政策而被标记，或属于 Google 明确禁止的类别，无论如何措辞都不可通过。

**空白输出（无错误代码）** 是一种特别令人困惑的失败模式，因为API返回200 OK状态，但图像数组为空或响应包含元数据却没有实际图像数据。从API的角度来看这不算技术错误，所以不会产生错误代码。空白输出最常发生在生成过程遇到内部歧义而无法产出完整图像时——包含矛盾元素的过度复杂提示词、极端抽象的概念，或请求包含大量文字内容的图像是最常见的触发因素。修复方法是逐步简化提示词，一次移除一个元素直到生成成功，然后逐步添加元素以确定是哪个组合导致了空白输出。

## 快速诊断流程——30秒找到修复方案

<img src="/docs/blog/zh/nano-banana-pro-error-code-quick-reference/img/content-img-2.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="Nano Banana Pro API错误快速诊断决策树流程图" />

> **快速解答：** 遇到错误时，首先检查HTTP状态码。4xx表示修复你的代码，429表示等待速率限制重置，5xx表示服务器有问题，非HTTP错误（SAFETY/IMAGE_SAFETY）表示修改你的提示词。

下面的诊断流程匹配了有经验的开发者在生产环境中遇到API错误时的自然排查过程。与按顺序阅读错误文档不同，你从最广泛的分类（HTTP状态码范围）开始，通过两到三个决策步骤缩小到具体的修复方案。这种方法反映了调试在实践中的实际工作方式——你首先确定问题是在你的代码还是在服务器端，然后识别具体的错误类别，最后应用针对性的修复。

**第一步：读取HTTP状态码。** 每个 Nano Banana Pro 错误都返回一个标准HTTP状态码，它立即告诉你错误所属的家族。如果你看到400范围内的状态码，问题在你的请求中，你需要在重试之前做出修改。如果你看到的是429，说明你触发了速率限制，需要等待。如果你看到500范围内的状态码，问题在 Google 端，你的请求没有问题——只需稍后重试。如果你没有看到HTTP错误但收到了空响应或响应体中有SAFETY/IMAGE_SAFETY标记，那么你遇到的是图像特有错误。

**第二步：识别具体错误。** 在每个家族中，使用API响应中的status字段缩小到确切的错误。对于4xx错误，检查是INVALID_ARGUMENT（修复请求体）、PERMISSION_DENIED（修复API密钥）还是NOT_FOUND（修复端点）。对于429，确定你触发的是RPM（等待60秒）、RPD（等到太平洋时间午夜）还是TPM（减小请求大小）。对于5xx错误，检查是INTERNAL（使用退避重试）、UNAVAILABLE（等待30分钟以上）还是DEADLINE_EXCEEDED（增加超时时间）。

**第三步：应用针对性修复并验证。** 执行错误代码主表中的一行修复方案，等待适当的间隔，然后重新发送请求。如果应用修复后错误仍然存在，请升级到该错误代码的详细排错章节。对于时有时无的间歇性错误，使用下一节中的生产级错误处理模板来自动处理重试。

## 速率限制与层级对比

> **快速解答：** Nano Banana Pro 的速率限制按项目计算（非按API密钥），同时在4个维度上运作：RPM、TPM、RPD和IPM。免费层极为有限。升级到Tier 1需要绑定计费账户；Tier 2需要累计消费250美元以上且满30天。

了解层级系统对于决定是升级 Google AI Studio 方案还是探索替代API提供商至关重要。经官方 Google AI 文档（ai.google.dev/rate-limits，2026年2月19日更新）验证的速率限制结构表明，免费层与付费层之间的差距是巨大的——Tier 1用户获得的每分钟请求数约为免费用户的30倍。层级要求是累积且有时间门槛的：达到Tier 2需要同时满足累计消费超过250美元并保持活跃计费账户30天，这意味着你不能简单地一次性大额支付来立即获取更高限额。

| 层级       | 要求                     | 关键限制                |
|------------|--------------------------|-------------------------|
| **免费**   | 仅限符合条件的国家       | 极低RPM，约100 RPD      |
| **Tier 1** | 付费计费账户             | 最高300 RPM，10,000 RPD |
| **Tier 2** | 累计消费 \>$250 + 30天   | 更高限制（按项目分配）  |
| **Tier 3** | 累计消费 \>$1,000 + 30天 | 最高限制（按项目分配）  |

速率限制的各维度同时生效，即使你在其他维度远未达到上限，超过任何单一维度都会触发429错误。RPM（每分钟请求数）是批处理应用中最容易触发的限制，因为这类应用会快速连续发送请求。RPD（每日请求数）会捕获那些将请求分散在时间上但总量很大的应用。TPM（每分钟token数）主要影响发送很长提示词的应用。IPM（每分钟图片数）是 Nano Banana Pro 特有的，专门限制图像生成调用次数，与其他维度无关。

对于持续触发速率限制且需要更高可用性的开发者，有两条实际路径可选。第一条是升级 Google Cloud 计费层级，绑定支付方式并逐步增加消费以解锁Tier 2和Tier 3限制。第二条是使用第三方API聚合平台，如 [GPT88.ai](https://gpt88.cc)，通过统一端点访问同一个 Nano Banana Pro 模型，提供[高性价比的API访问方案](/en/docs/blog/cheapest-stable-nano-banana-pro-api)，且在高峰时段具有更可预测的可用性。这种方案在 Google 直接API频繁返回503 UNAVAILABLE错误的高需求期间尤为有价值，因为聚合平台通常维护多条路由路径，可以绕开拥堵的区域。

## 生产级错误处理模板

> **快速解答：** 生产级错误处理程序应将错误分为可重试与不可重试两类，对可重试错误实施带抖动的指数退避，并记录每次失败以便监控。以下是可直接复制使用的 Python 和 Node.js 实现。

下面的错误处理代码将本速查手册中的所有经验整合到一个单一的、可用于生产的函数中，你可以直接集成到你的应用中。它使用可重试/不可重试框架对错误进行分类，为每种错误类型应用适当的重试间隔，并包含结构化日志以便你在生产环境中监控错误率。两种实现都处理了大多数示例代码所忽略的边界情况——包括空白输出检测、安全过滤器分类，以及在所有重试耗尽时的优雅降级。

    hljs python复制import time
    import random
    import requests

    class NanoBananaErrorHandler:
        RETRYABLE_CODES = {429, 500, 502, 503, 504}
        NON_RETRYABLE_CODES = {400, 403, 404}

        def __init__(self, api_key, max_retries=5, base_delay=30):
            self.api_key = api_key
            self.max_retries = max_retries
            self.base_delay = base_delay

        def generate_image(self, prompt, **kwargs):
            for attempt in range(self.max_retries):
                try:
                    response = self._make_request(prompt, **kwargs)

                    if response.status_code == 200:
                        data = response.json()
                        # Check for blank output
                        if not self._has_image(data):
                            return {"error": "blank_output",
                                    "fix": "Simplify prompt"}
                        # Check for safety blocks in response
                        safety = self._check_safety(data)
                        if safety:
                            return {"error": safety["type"],
                                    "fix": safety["action"]}
                        return {"success": True, "data": data}

                    if response.status_code in self.NON_RETRYABLE_CODES:
                        return {"error": response.status_code,
                                "retryable": False,
                                "fix": self._get_fix(response.status_code)}

                    if response.status_code in self.RETRYABLE_CODES:
                        delay = self._calculate_delay(attempt,
                                                      response.status_code)
                        time.sleep(delay)
                        continue

                except requests.Timeout:
                    if attempt < self.max_retries - 1:
                        time.sleep(self.base_delay * (2 ** attempt))
                        continue

            return {"error": "max_retries_exceeded",
                    "fix": "Check service status or switch provider"}

        def _calculate_delay(self, attempt, status_code):
            if status_code == 429:
                base = 60  # RPM resets every 60 seconds
            elif status_code == 503:
                base = 300  # 5 min minimum for overloaded
            else:
                base = self.base_delay * (2 ** attempt)
            jitter = random.uniform(0, base * 0.1)
            return base + jitter

        def _get_fix(self, code):
            fixes = {
                400: "Check request body and parameters",
                403: "Regenerate API key, verify permissions",
                404: "Verify model name and endpoint URL",
            }
            return fixes.get(code, "See error documentation")

    hljs javascript复制// Node.js implementation
    class NanoBananaErrorHandler {
      static RETRYABLE = new Set([429, 500, 502, 503, 504]);

      constructor(apiKey, { maxRetries = 5, baseDelay = 30000 } = {}) {
        this.apiKey = apiKey;
        this.maxRetries = maxRetries;
        this.baseDelay = baseDelay;
      }

      async generateImage(prompt, options = {}) {
        for (let attempt = 0; attempt < this.maxRetries; attempt++) {
          try {
            const response = await this.makeRequest(prompt, options);

            if (response.ok) {
              const data = await response.json();
              if (!this.hasImage(data))
                return { error: "blank_output",
                         fix: "Simplify prompt" };
              const safety = this.checkSafety(data);
              if (safety) return safety;
              return { success: true, data };
            }

            if (!NanoBananaErrorHandler.RETRYABLE.has(response.status))
              return { error: response.status, retryable: false,
                       fix: this.getFix(response.status) };

            const delay = this.calcDelay(attempt, response.status);
            await new Promise(r => setTimeout(r, delay));
          } catch (err) {
            if (attempt === this.maxRetries - 1) throw err;
            await new Promise(r =>
              setTimeout(r, this.baseDelay * 2 ** attempt));
          }
        }
        return { error: "max_retries",
                 fix: "Check status or switch provider" };
      }

      calcDelay(attempt, status) {
        const base = status === 429 ? 60000
                   : status === 503 ? 300000
                   : this.baseDelay * 2 ** attempt;
        return base + Math.random() * base * 0.1;
      }
    }

Python 实现采用基于类的方式，将重试逻辑、错误分类和修复建议封装到一个可重用的组件中。`_calculate_delay` 方法根据具体的错误类型调整等待时间——429错误获得固定的60秒延迟，因为RPM限制按此周期重置；而503错误获得更长的5分钟基础延迟，因为服务过载通常需要更多恢复时间。Node.js 实现使用 async/await 语法遵循相同的逻辑。对于需要更高可靠性的应用，可以考虑在主端点持续返回503错误时实现向备用API提供商（如 [GPT88.ai](https://gpt88.cc)）的降级——这种模式在停机直接影响收入的生产系统中尤为有价值。

## 常见问题——Nano Banana Pro 错误排查

> **快速解答：** 以下是关于 Nano Banana Pro 错误最常被问到的问题的直接回答，来源为开发者论坛和 Google AI 文档。

### Nano Banana Pro 的429错误是什么意思？

错误429 RESOURCE_EXHAUSTED 表示你已超过四个速率限制维度之一：RPM（每分钟请求数）、TPM（每分钟token数）、RPD（每日请求数）或IPM（每分钟图片数）。这是最常见的 Nano Banana Pro 错误，根据开发者社区数据约占所有报告故障的70%。修复方法取决于你触发了哪个维度——RPM限制每60秒重置一次，因此短暂暂停通常就能解决问题。RPD限制在太平洋时间午夜重置。速率限制按 Google Cloud 项目计算，而非按API密钥，因此在同一项目内创建额外的密钥不会增加配额（经 Google AI 文档验证，2026年2月）。

### 如何修复 Nano Banana Pro 过载错误？

过载错误对应HTTP 503 UNAVAILABLE，表示 Google 服务器正在经历高需求。这是一个临时的服务端问题，需要的是耐心而非代码修改。根据社区报告，典型的恢复时间在高峰期为30分钟到2小时。在等待期间你的选择包括：如果应用支持，切换到不同的 Gemini 模型变体；使用上面的生产级错误处理模板将失败的请求加入队列自动重试；或通过维护多条访问路径的替代API提供商进行路由，以减少区域性过载的影响。

### 为什么 Nano Banana Pro 总是拦截我的图像？

图像拦截通过两个不同的安全层发生。如果你的提示词在生成前被阻止（finishReason: SAFETY），说明文本内容本身触发了政策违规——用更中性的语言重新表述，同时保持你的创意意图。如果生成的图像在创建后被阻止（finishReason: IMAGE_SAFETY），说明视觉输出违反了政策，即使你的提示词是可接受的——尝试添加"水彩"、"极简主义"或"抽象"等风格修饰词来引导产出不那么写实的输出。持续出现 BlockedReason.OTHER 的阻止表示服务条款级别的限制，无法通过提示词工程来绕过。关于应对每个安全层的详细策略，请参阅[安全过滤器排错指南](/en/docs/blog/gemini-api-safety-settings-request-blocked)。

**Nano Banana Pro 的速率限制是按API密钥还是按项目计算的？**

速率限制按 Google Cloud 项目计算，而非按单个API密钥。这是许多开发者忽略的关键细节——在同一项目内创建多个API密钥不会获得任何额外配额。要真正提高速率限制，你需要升级计费层级（这需要同时满足累计消费门槛和30天等待期），或将请求分配到多个独立的 Google Cloud 项目中，每个项目都有自己的计费账户。

**SAFETY和IMAGE_SAFETY错误有什么区别？**

SAFETY错误（finishReason: SAFETY）在图像生成发生之前的提示词评估阶段触发，意味着你的文本提示词被内容过滤器拒绝了。IMAGE_SAFETY错误（finishReason: IMAGE_SAFETY）在图像生成完成后触发，意味着你的提示词通过了文本过滤器，但生成的图像被视觉内容过滤器标记了。这个区分很重要，因为SAFETY错误是确定性的（相同的提示词总是会被阻止），而IMAGE_SAFETY错误可能是非确定性的（相同的提示词可能产生不同的图像，其中一些通过、一些被标记）。在排查IMAGE_SAFETY时，在判定提示词本身需要修改之前，先用相同的提示词重试2-3次。

<img src="/docs/blog/zh/nano-banana-pro-error-code-quick-reference/img/codex-explainer-4.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="Nano Banana Pro 错误代码速查手册：60秒修复所有API错误（2026） - codex-explainer-4" />
