---
title: Gemini API 速率限制完全指南：RPM、TPM、429 错误处理与 Tier 升级（2026）
description: 深入解析 Gemini API 的 RPM、TPM、RPD、IPM 四种速率限制机制，包含 2026 年 1 月最新配额数据、Free Tier 与 Paid Tier 完整对比、429 错误处理代码示例、生产环境最佳实践。
date: 2026-01-22
category: API开发
tags: [Gemini API, Rate Limits, RPM TPM, 429错误, API配额]
readTime: 18
relatedPath: /docs/api/errors/
relatedTitle: 错误码参考
---

你的 Gemini API 应用运行正常，突然间开始频繁返回 429 错误。检查代码没有问题，检查网络也没有问题，但请求就是被拒绝。这种情况在使用 Google Gemini API 的开发者中非常普遍，尤其是在 2025 年 12 月 Google 大幅收紧免费配额之后。问题的根源在于速率限制（Rate Limits）——一个很多开发者只有在触发时才会注意到的机制。

理解 Gemini API 的速率限制不仅能帮你避免 429 错误，更能让你合理规划 API 使用、优化成本、并在生产环境中构建弹性架构。本指南将系统性地解释 RPM、TPM、RPD、IPM 四种限制机制，提供 2026 年 1 月最新的配额数据，并给出从错误处理到架构设计的完整解决方案。

## 速率限制基础概念：RPM、TPM、RPD、IPM 是什么

Gemini API 的速率限制是 Google 为了保护服务稳定性和公平分配资源而设置的访问控制机制。不同于简单的"每天 X 次"限制，Gemini 采用了多维度的限制体系，理解这些概念是有效使用 API 的基础。

**RPM（Requests Per Minute）** 是每分钟请求次数限制，这是最直观的指标。无论你的请求内容多长或多短，每次 API 调用都计为 1 次请求。如果你的 RPM 限制是 15，那么每分钟最多只能发起 15 次 API 调用，超过就会触发 429 错误。

**TPM（Tokens Per Minute）** 是每分钟处理的 token 数量限制，这个指标更加细腻。Token 是语言模型处理文本的基本单位，对于英文大约 4 个字符等于 1 个 token，中文通常 1 个汉字占 2-3 个 token。TPM 限制意味着即使你的请求次数没超，但如果单次请求的内容太长（输入+输出 token 总和太大），同样会被限制。实际开发中，TPM 往往比 RPM 更容易触发，因为一次包含长文档的请求可能消耗数万 token。

**RPD（Requests Per Day）** 是每日请求总数限制，这是一个较长周期的约束。对于 Free Tier 用户，RPD 通常是 1500 次，意味着即使你严格控制每分钟的请求频率，一天下来的总量也不能超过这个上限。

**IPM（Images Per Minute）** 是图片生成频率限制，专门针对 Gemini 的图片生成功能（如 gemini-2.5-flash 的图片生成能力）。由于图片生成比文本生成消耗更多计算资源，Google 对此设置了独立的限制维度。

这四种限制是同时生效的关系，任何一个触发都会导致请求被拒绝。在实际应用中，开发者需要同时监控这四个指标，而不仅仅是其中一个。

## Free Tier 完整限制表：2026 年 1 月最新数据

Google 的 Free Tier 为开发者提供了零成本体验 Gemini API 的机会，但其配额限制在 2025 年 12 月经历了显著收紧。以下是 2026 年 1 月的最新官方数据，来自 [Google AI 开发者文档](https://ai.google.dev/gemini-api/docs/models/gemini)：

| 模型 | RPM | TPM | RPD | IPM |
| --- | --- | --- | --- | --- |
| gemini-2.5-pro | 5 | 250,000 | 100 | - |
| gemini-2.5-flash | 15 | 250,000 | 500 | 10 |
| gemini-2.5-flash-lite | 15 | 250,000 | 1,000 | - |
| gemini-3-pro-preview | ~10 | ~250,000 | ~500 | - |
| gemini-3-flash-preview | ~15 | ~250,000 | ~1,000 | - |

几个关键观察点值得注意。首先，**Gemini 2.5 系列的配额相比此前有显著调整**，gemini-2.5-pro 的 RPM 仅为 5 次，RPD 仅 100 次，这意味着 Pro 模型在 Free Tier 下几乎只能用于极轻量的测试，无法支撑任何实际业务。其次，**Gemini 3 系列已进入 Preview 阶段**，gemini-3-pro-preview 和 gemini-3-flash-preview 提供了与 2.5 系列相近的配额限制，建议开发者提前适配。

> ⚠️ **重要提醒**：Gemini 2.0 系列（包括 gemini-2.5-flash）将于 **2026 年 3 月 3 日正式退役**。如果你的应用仍在使用 2.0 版本，请尽快迁移到 Gemini 2.5 或 3.0 系列。

Free Tier 的适用场景非常明确：**开发测试、概念验证、个人学习项目**。如果你的应用需要每分钟处理超过 10 个请求，或者日请求量超过 1000，那么 Free Tier 很可能无法满足需求，应该考虑升级到付费层级。

值得一提的是，所有 Free Tier 的限制都是按 **Google Cloud 项目**计算的，而不是按 API Key。这意味着即使你创建多个 API Key，它们共享同一个项目的配额上限。如果需要隔离配额，必须创建独立的 Google Cloud 项目。

## Paid Tier 层级对比：Tier 1 到 Tier 3 全解析

当 Free Tier 无法满足需求时，升级到 Paid Tier 是自然的选择。Google 为 Gemini API 设计了三个付费层级，每个层级的配额和解锁条件都不同：

| 层级 | 解锁条件 | gemini-2.5-flash RPM | gemini-2.5-pro RPM | 特点 |
| --- | --- | --- | --- | --- |
| Tier 1 | 绑定付款方式 + $50 消费 | 150-300 | 50-100 | 入门付费，适合小型项目 |
| Tier 2 | $250 累计消费 + 30 天 | 1,000+ | 300+ | 进阶付费，适合中型应用 |
| Tier 3 | $1,000 消费或企业申请 | 4,000+ | 1,000+ | 企业级，可申请更高配额 |

**Tier 1** 是大多数开发者的第一站。只需要在 Google Cloud Console 中绑定有效的付款方式（信用卡或银行账户），然后累计消费达到 $50，系统会自动将你的项目升级到 Tier 1。升级后最明显的变化是 gemini-2.5-flash 的 RPM 从 15 提升到 150-300——这是 **10-20 倍的提升**，基本能支撑中小型应用的需求。同时，RPD 限制被大幅放宽，你不再需要频繁担心每日请求总量的上限。

**Tier 2** 适合已经验证产品市场匹配、开始规模化的应用。当累计消费达到 $250 时自动解锁，配额再次翻倍。对于需要高并发处理的场景（如批量文档分析、实时聊天应用），Tier 2 提供了更大的缓冲空间。

**Tier 3** 是企业级方案，除了累计消费 $1000 外，也可以通过填写[配额申请表单](https://cloud.google.com/docs/quota)主动申请。Tier 3 的特点是配额可以根据业务需求定制，适合有特殊需求的大型企业。

关于升级决策，这里有一个简单的判断框架：如果 429 错误开始影响用户体验，或者你的日请求量稳定超过 Free Tier 的 50%（约 750 次/天），那么是时候考虑升级了。详细的成本与定价分析可以帮助你做出更精确的预算规划。

## 429 错误处理实战：从理解到解决

当你触发速率限制时，Gemini API 会返回 HTTP 429 状态码，错误信息通常包含 `RESOURCE_EXHAUSTED`。理解这个错误的结构是正确处理它的第一步：

```json
{
  "error": {
    "code": 429,
    "message": "You exceeded your current quota, please check your plan and billing details.",
    "status": "RESOURCE_EXHAUSTED",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.RetryInfo",
        "retryDelay": "30s"
      }
    ]
  }
}
```

错误响应中的 `retryDelay` 字段非常重要，它告诉你建议等待多久再重试。但更好的做法是实现**指数退避（Exponential Backoff）**策略，这是处理速率限制的行业标准方案。

以下是 Python 实现的生产级 429 错误处理：

```python
import google.generativeai as genai
import time
import random

def call_gemini_with_retry(prompt, max_retries=5):
    """带指数退避的Gemini API调用"""
    genai.configure(api_key="YOUR_GPT88_API_KEY")
    model = genai.GenerativeModel("gemini-2.5-flash")

    base_delay = 1  # 初始等待1秒
    max_delay = 32  # 最大等待32秒

    for attempt in range(max_retries):
        try:
            response = model.generate_content(prompt)
            return response.text
        except Exception as e:
            error_str = str(e)
            if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
                if attempt == max_retries - 1:
                    raise Exception(f"重试{max_retries}次后仍然失败: {e}")

                # 指数退避 + 随机抖动
                delay = min(base_delay * (2 ** attempt), max_delay)
                jitter = random.uniform(0, delay * 0.1)
                wait_time = delay + jitter

                print(f"触发速率限制，等待{wait_time:.1f}秒后重试（第{attempt + 1}次）")
                time.sleep(wait_time)
            else:
                raise  # 非429错误直接抛出

# 使用示例
result = call_gemini_with_retry("解释量子计算的基本原理")
print(result)
```

JavaScript/Node.js 的实现如下：

```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function callGeminiWithRetry(prompt, maxRetries = 5) {
  const genAI = new GoogleGenerativeAI("YOUR_GPT88_API_KEY");
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const baseDelay = 1000;  // 初始等待1秒
  const maxDelay = 32000;  // 最大等待32秒

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      const errorStr = error.toString();
      if (errorStr.includes("429") || errorStr.includes("RESOURCE_EXHAUSTED")) {
        if (attempt === maxRetries - 1) {
          throw new Error(`重试${maxRetries}次后仍然失败: ${error}`);
        }

        // 指数退避 + 随机抖动
        const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
        const jitter = Math.random() * delay * 0.1;
        const waitTime = delay + jitter;

        console.log(`触发速率限制，等待${(waitTime/1000).toFixed(1)}秒后重试（第${attempt + 1}次）`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else {
        throw error;  // 非429错误直接抛出
      }
    }
  }
}

// 使用示例
callGeminiWithRetry("解释量子计算的基本原理")
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

指数退避的核心逻辑是：第一次失败等待 1 秒，第二次等待 2 秒，第三次等待 4 秒，以此类推直到达到上限。添加随机抖动（jitter）是为了避免多个客户端在同一时刻重试导致的"惊群效应"。

如果你的应用频繁触发 429 错误，除了改进错误处理，更应该检查是否需要升级配额层级或优化请求策略。

## 配额监控与优化：主动管理你的 API 使用

被动等待 429 错误发生再处理是下策，主动监控配额使用才是上策。Gemini API 的响应头中包含了配额状态信息，善用这些信息可以实现预防性限流。

```python
import google.generativeai as genai
import requests

def check_quota_from_response(response_headers):
    """从响应头解析配额信息"""
    quota_info = {
        "remaining_requests": response_headers.get("x-ratelimit-remaining-requests"),
        "remaining_tokens": response_headers.get("x-ratelimit-remaining-tokens"),
        "reset_time": response_headers.get("x-ratelimit-reset")
    }
    return quota_info

class QuotaAwareGeminiClient:
    def __init__(self, api_key, warning_threshold=0.2):
        """
        warning_threshold: 当剩余配额低于此比例时发出警告
        """
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-2.5-flash")
        self.warning_threshold = warning_threshold
        self.last_remaining = None

    def generate(self, prompt):
        response = self.model.generate_content(prompt)

        # 检查是否接近配额上限（模拟，实际需要解析响应头）
        if self.last_remaining and self.last_remaining < self.warning_threshold:
            print(f"警告：配额剩余不足{self.warning_threshold*100}%，建议降低请求频率")

        return response.text

# 客户端限流实现
import time
from collections import deque

class RateLimiter:
    def __init__(self, max_requests_per_minute):
        self.max_rpm = max_requests_per_minute
        self.request_times = deque()

    def wait_if_needed(self):
        """如果即将超出限制，则等待"""
        now = time.time()

        # 清理1分钟前的记录
        while self.request_times and now - self.request_times[0] > 60:
            self.request_times.popleft()

        # 如果已达到限制，等待最早的请求过期
        if len(self.request_times) >= self.max_rpm:
            sleep_time = 60 - (now - self.request_times[0]) + 0.1
            if sleep_time > 0:
                print(f"主动限流：等待{sleep_time:.1f}秒")
                time.sleep(sleep_time)

        self.request_times.append(time.time())

# 使用示例
limiter = RateLimiter(max_requests_per_minute=8)  # 留20%余量

for i in range(20):
    limiter.wait_if_needed()
    print(f"发送请求 {i+1}")
    # 实际调用API...
```

除了代码层面的监控，Google Cloud Console 提供了可视化的配额仪表板。在 Console 中导航到 **APIs & Services > Quotas**，可以看到实时的配额使用情况和历史趋势。建议设置告警规则，当使用量达到 80% 时触发通知，给你足够的缓冲时间来调整策略或申请更高配额。

Token 优化也是降低配额消耗的有效手段。避免发送不必要的长上下文、使用 system prompt 时精简指令、合理设置 `max_output_tokens` 参数都能帮助你在相同配额下完成更多工作。

## 升级决策指南：何时从 Free Tier 迁移到付费

Free Tier 适合探索和学习，但业务增长迟早会触碰它的天花板。判断是否需要升级，可以参考以下信号：

**明确需要升级的信号**：

-   429 错误频率超过总请求的 5%
-   用户反馈"响应太慢"或"经常失败"
-   日均请求量稳定超过 1000 次
-   需要使用 gemini-2.5-pro 但受限于 5 RPM

**可以继续使用 Free Tier 的场景**：

-   个人学习项目，请求量低于 100 次/天
-   内部工具，使用者少于 10 人
-   概念验证阶段，尚未面向用户

升级到 Tier 1 的操作非常简单：

1.  登录 [Google Cloud Console](https://console.cloud.google.com)
2.  进入 **Billing** 页面
3.  添加有效的付款方式（信用卡/银行账户）
4.  在启用了 Gemini API 的项目中产生 $50 消费
5.  系统自动升级，通常在账单结算后生效

升级后立即生效的变化：gemini-2.5-flash 的 RPM 从 15 提升到 150-300，RPD 限制大幅放宽，错误率显著下降。但需要注意，付费后的使用是按实际调用量计费的，务必做好成本监控。

## 生产环境最佳实践：构建弹性 API 调用架构

在生产环境中，仅靠指数退避是不够的。你需要一套完整的弹性架构来应对各种异常情况。以下是经过验证的三层防护策略：

**第一层：熔断器（Circuit Breaker）**

当错误率超过阈值时，熔断器会"断开"，暂停所有请求，避免无效重试消耗配额和加剧服务压力。

```python
import time
from enum import Enum

class CircuitState(Enum):
    CLOSED = "closed"      # 正常状态，允许请求
    OPEN = "open"          # 熔断状态，拒绝所有请求
    HALF_OPEN = "half_open"  # 半开状态，允许少量请求测试

class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=60):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = CircuitState.CLOSED

    def can_execute(self):
        if self.state == CircuitState.CLOSED:
            return True
        elif self.state == CircuitState.OPEN:
            # 检查是否到了恢复时间
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = CircuitState.HALF_OPEN
                return True
            return False
        else:  # HALF_OPEN
            return True

    def record_success(self):
        self.failure_count = 0
        self.state = CircuitState.CLOSED

    def record_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN
            print("熔断器开启：暂停所有请求")
```

**第二层：请求队列与优先级**

并非所有请求都同等重要。通过请求队列区分优先级，确保关键请求在配额紧张时优先处理。

**第三层：降级方案**

当官方 API 持续不可用时，降级到备选方案可以保证业务连续性。对于需要高可用性的场景，可以考虑将 GPT88 统一网关作为备选路径。以 GPT88 为例，统一网关通常不受官方速率限制的约束，延迟相对更低，适合作为关键业务的降级方案。但需要注意：网关更适合开发测试和中小流量场景，大规模生产环境建议直接使用官方企业级方案。具体价格与配额以 [gpt88.cc 控制台](https://gpt88.cc) 为准。

```python
class ResilientGeminiClient:
    def __init__(self, primary_api_key, fallback_base_url=None, fallback_api_key=None):
        self.circuit_breaker = CircuitBreaker()
        self.primary_key = primary_api_key
        self.fallback_url = fallback_base_url
        self.fallback_key = fallback_api_key

    def generate(self, prompt, priority="normal"):
        # 检查熔断器状态
        if not self.circuit_breaker.can_execute():
            if self.fallback_url and priority == "high":
                return self._call_fallback(prompt)
            raise Exception("服务暂时不可用，请稍后重试")

        try:
            result = self._call_primary(prompt)
            self.circuit_breaker.record_success()
            return result
        except Exception as e:
            self.circuit_breaker.record_failure()

            # 高优先级请求尝试降级
            if self.fallback_url and priority == "high":
                print("主服务失败，切换到降级方案")
                return self._call_fallback(prompt)
            raise

    def _call_primary(self, prompt):
        # 调用官方Gemini API
        pass

    def _call_fallback(self, prompt):
        # 调用降级服务
        pass
```

## 常见问题 FAQ

**Q1: RPM 和 TPM 哪个更容易触发？**

通常 **TPM 更容易触发**。因为 RPM 限制的是请求次数，而 TPM 限制的是 token 总量。一次包含长文档的请求可能消耗 10 万 token，而 Free Tier 的 TPM 限制只有 25 万（gemini-2.5-flash），仅 2-3 次这样的请求就会触发限制，远早于 RPM 的 15 次限制。建议在处理长内容时特别注意 TPM 消耗。

**Q2: Free Tier 的限制是每个 API Key 还是每个项目？**

限制是**按 Google Cloud 项目计算**的，不是按 API Key。这意味着在同一个项目中创建多个 API Key 不会增加总配额，它们共享同一个上限。如果需要更多配额，要么升级到付费层级，要么创建多个独立的 Google Cloud 项目（但这可能违反服务条款，不建议）。

**Q3: 超过限制会被封号吗？**

**不会**。触发速率限制只会导致请求被拒绝（返回 429 错误），不会导致 API Key 或账号被封禁。但如果你通过不当手段（如创建大量项目）规避限制，可能会违反 Google 的服务条款。正当使用范围内，超限只是临时拒绝，配额重置后就会恢复。

**Q4: 如何申请更高配额？**

有两种方式：一是通过**增加消费**自动升级 Tier（$50→Tier 1，$250→Tier 2，$1000→Tier 3）；二是在 Google Cloud Console 中提交**配额申请表单**，说明业务需求。企业用户还可以联系 Google 销售团队获取定制方案。Tier 3 用户申请额外配额的通过率较高。

**Q5: 中国用户如何稳定使用 Gemini API？**

中国大陆直接访问 Gemini API 存在网络不稳定的问题，除了使用海外云服务器中转外，GPT88 统一网关是另一个选择。GPT88 提供了国内可直连的中转服务，兼容 OpenAI SDK 格式，切换成本低。网关适合开发测试和对延迟敏感的场景，但需要注意选择可靠的服务商并了解数据处理政策。

**Q6: Batch API 和实时 API 的配额是共享的吗？**

**部分共享**。Batch API 有独立的配额池（通常更高），但某些限制（如每日请求总量）可能与实时 API 共享。使用 Batch API 处理非实时任务是优化配额使用的有效策略，因为 Batch API 的价格通常只有实时 API 的 50%，且配额更宽松。

**Q7: 为什么我没到 RPM 限制就被 429 了？**

可能是触发了 **TPM 或 RPD 限制**，而不是 RPM。429 错误信息不一定明确指出是哪种限制，建议检查：(1) 最近的请求是否包含大量 token；(2) 今日总请求是否接近 RPD 上限；(3) 是否在使用图片生成功能（会触发 IPM 限制）。

**Q8: 从 Free Tier 升级到 Tier 1 需要多久？**

升级是**准实时**的。一旦你的账户满足条件（绑定付款方式 + $50 消费），系统通常在几分钟到几小时内自动升级。如果超过 24 小时仍未升级，可以联系 Google Cloud 支持确认账户状态。

---

Gemini API 的速率限制看似复杂，但理解其设计逻辑后就会发现它是可预测、可管理的。RPM/TPM/RPD/IPM 四种限制各有侧重，Free Tier 适合起步，Paid Tier 支撑增长，而生产环境需要熔断器、队列、降级的三层防护。从本指南出发，你可以构建出既稳定又经济的 Gemini API 应用架构。
