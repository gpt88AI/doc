---
title: Google Gemini API 免费层限制完全指南（2026年1月更新）：速率限制、配额变化与最佳实践
description: 全面解析 2026 年 Gemini API 免费层的 RPM/TPM/RPD 限制，分析 2025 年 12 月配额削减的具体影响，提供 429 错误处理、多模态 Token 计算、地区访问方案与升级决策指南，含各模型免费层对比表与代码示例。
date: 2026-01-20
category: API开发
tags: [Gemini API, 免费层, API限制, Google AI, 开发指南]
readTime: 18
relatedPath: /docs/api/list-models/
relatedTitle: 模型列表
---

Google Gemini API 是目前市场上唯一提供真正免费层的主流大语言模型 API 服务。与 OpenAI 和 Anthropic 不同，开发者可以在无需绑定信用卡的情况下获得持续的 API 访问权限，这使其成为学习 AI 开发和构建原型的理想选择。然而，2025 年 12 月 Google 对免费层配额进行了大幅削减，许多开发者在毫无预警的情况下开始频繁遇到 429 错误。本文将详细解析当前免费层的所有限制、12 月配额变化的具体影响，以及如何在有限配额下高效构建应用。

## 2026 年 1 月 Gemini API 免费层限制详解

**核心答案：** 当前 Gemini API 免费层提供 5-15 RPM（每分钟请求数）、250,000 TPM（每分钟 Token 数）和 100-1,000 RPD（每日请求数），具体取决于所使用的模型。所有限制在太平洋时间午夜重置。

根据 [Google 官方速率限制文档](https://ai.google.dev/gemini-api/docs/rate-limits)，免费层的速率限制按项目级别而非 API Key 级别执行。这意味着在同一个 Google Cloud 项目中创建多个 API Key 并不会增加可用配额，所有 Key 共享同一个配额池。以下是当前各模型的完整限制数据：

| 模型 | RPM（每分钟请求） | TPM（每分钟 Token） | RPD（每日请求） | 适用场景 |
| --- | --- | --- | --- | --- |
| **Gemini 2.5 Pro** | 5 | 250,000 | 100 | 复杂推理任务 |
| **Gemini 2.5 Flash** | 10 | 250,000 | 250 | 平衡性能与速度 |
| **Gemini 2.5 Flash-Lite** | 15 | 250,000 | 1,000 | 高吞吐量场景 |
| **Gemini 3 Flash Preview** | 有免费层 | - | - | 最新功能体验 |
| **Gemini Embeddings** | 100 | - | 1,000 | 向量嵌入 |

理解这些限制的实际含义非常重要。以 Gemini 2.5 Pro 为例，5 RPM 意味着你每 12 秒只能发送一次请求。如果在一分钟内连续发送 6 次请求，第 6 次请求将触发 429 错误。而 100 RPD 的每日限制意味着整个项目在 24 小时内最多只能完成 100 次调用，这对于任何生产级应用来说都是远远不够的。

250,000 TPM 的 Token 限制同时计算输入和输出 Token。考虑到 Gemini 支持高达 100 万 Token 的上下文窗口，一个包含大量历史对话或长文档的请求可能在单次调用中就消耗大量配额。开发者需要在请求大小和频率之间找到平衡点。

## 各 Gemini 模型免费层对比与选择

在选择使用哪个模型时，开发者需要根据具体应用场景权衡能力和限制。Gemini 2.5 系列目前提供三个主要选择，每个都有其独特的定位和适用场景。

| 特性 | Gemini 2.5 Pro | Gemini 2.5 Flash | Gemini 2.5 Flash-Lite |
| --- | --- | --- | --- |
| **上下文窗口** | 100 万 Token | 100 万 Token | 100 万 Token |
| **响应速度** | 较慢 | 快速（274 tokens/秒） | 最快 |
| **推理能力** | 最强 | 强 | 标准 |
| **免费层 RPD** | 100 | 250 | 1,000 |
| **推荐用途** | 代码生成、复杂分析 | 通用对话、内容创作 | 批量处理、高频调用 |

Gemini 2.5 Pro 在推理能力上表现最强，在 Humanity's Last Exam 基准测试中得分 18.8%，领先于其他模型。它特别适合需要深度思考的任务，如代码调试、法律文档分析和复杂的多步骤推理。然而，5 RPM 和 100 RPD 的限制使其在免费层下只适合学习和小规模测试。

Gemini 2.5 Flash 是大多数开发者的最佳选择。它在保持较强能力的同时提供更宽松的配额（10 RPM、250 RPD），响应速度达到 274 tokens/秒，能够支持实时交互场景。在 LMArena 的 Hard Prompts 测试中仅次于 Pro 版本。

Gemini 2.5 Flash-Lite 则是免费层下最实用的选择。1,000 RPD 的每日配额足以支持基础原型开发和学习项目，15 RPM 的限制也更加宽松。虽然推理能力不如 Pro 和 Flash，但对于大多数常规任务来说已经足够。

## 2025 年 12 月配额削减：发生了什么？

**核心答案：** 2025 年 12 月 7 日，Google 在没有提前公告的情况下将免费层配额削减了 50-80%，导致大量正常运行的应用突然开始报错。

这次变化的影响范围超出了许多人的预期。根据多个开发者社区的反馈和 How-To Geek 的报道，最显著的变化发生在 Gemini 2.5 Flash 模型上：

| 模型 | 变化前 RPD | 变化后 RPD | 削减幅度 |
| --- | --- | --- | --- |
| Gemini 2.5 Flash | 约 250 | 20-50 | 80-92% |
| Gemini 2.5 Pro | 约 500 | 100 | 80% |
| 整体免费层 | - | - | 50-80% |

这次调整影响最大的是依赖免费层运行的小型应用和自动化工具。许多开发者在 Home Assistant 等智能家居平台上构建的 AI 集成，以及个人使用的聊天机器人项目，在 12 月初突然开始频繁返回 429 错误。由于 Google 没有提前通知，开发者不得不在应用崩溃后才意识到配额政策的变化。

从 Google 的角度来看，这次调整可能是为了控制免费层的资源消耗并推动开发者向付费层迁移。免费层本质上是为测试和学习设计的，而非生产级使用。然而，突然的变化方式确实给开发者社区带来了困扰。对于需要稳定 API 访问的开发者，升级到付费层或使用 API 统一网关是更可靠的选择。

## Gemini 3 系列的免费层情况

Google 在 2026 年初发布了 Gemini 3 系列，带来了显著的性能提升和新特性。

**Gemini 3 Flash Preview** 是目前免费层可用的最新模型。它提供了 Pro 级别的推理能力，同时保持 Flash 系列的速度优势。在 SWE-bench Verified 基准测试中，Gemini 3 Flash 的代码能力得分达到 78%，甚至超过了 Gemini 3 Pro。该模型支持 100 万 Token 的上下文窗口，能够处理文本、图像、音频、视频和 PDF 等多种输入格式。

**Gemini 3 Pro Preview** 则没有免费 API 配额，只能在 Google AI Studio 的聊天界面中免费体验。API 访问需要付费，定价为输入 $2.00/百万 Token、输出 $12.00/百万 Token。这一定位清晰地将 Pro 版本定义为生产级解决方案，而非免费实验工具。

Gemini 3 系列引入了一个重要的新参数：**thinking_level**。开发者可以通过设置 minimal、low、medium 或 high 来控制模型的内部推理深度，从而在响应质量、延迟和成本之间找到平衡。这个参数替代了之前的 thinking_budget，提供了更直观的控制方式。

| 模型 | 免费层 | 输入价格 | 输出价格 | 特色功能 |
| --- | --- | --- | --- | --- |
| Gemini 3 Flash | ✅ 有 | $0.50/M | $3.00/M | 代码能力强、thinking_level 控制 |
| Gemini 3 Pro | ❌ 无 | $2.00/M | $12.00/M | 最强推理、200K 后价格翻倍 |

## 5 分钟快速入门：获取 API Key 并运行首个请求

开始使用 Gemini API 只需要三个步骤：注册 Google AI Studio 账号、获取 API Key、安装 SDK 并运行代码。整个过程通常可以在 5 分钟内完成。

**第一步：访问 Google AI Studio**

打开 [Google AI Studio](https://aistudio.google.com/) 并使用 Google 账号登录。如果你之前没有使用过该服务，系统会引导你完成初始设置。在左侧边栏中找到 "Get API Key" 选项，点击 "Create API Key" 按钮生成新的密钥。建议将 API Key 保存到安全的位置，因为它只会显示一次。

**第二步：安装 Google Gen AI SDK**

Google 在 2025 年底发布了新版 Gen AI SDK，这是目前官方推荐的库。旧版 SDK 已在 2025 年 11 月 30 日弃用，新版支持 Live API 和 Veo 等最新功能。

```bash
pip install google-genai
```

**第三步：运行第一个请求**

将 API Key 设置为环境变量是最安全的做法。SDK 会自动读取名为 `GEMINI_API_KEY` 的环境变量。

```python
from google import genai

# 方式1：自动读取环境变量 GEMINI_API_KEY
client = genai.Client()

# 方式2：手动传入 API Key（仅用于测试）
# client = genai.Client(api_key="YOUR_GEMINI_API_KEY")

# 发送请求
response = client.models.generate_content(
    model="gemini-2.5-flash",  # 推荐免费层使用 Flash 模型
    contents="用简单的语言解释什么是 API 速率限制"
)

print(response.text)
```

运行成功后，你应该能看到模型对 API 速率限制的解释。如果遇到错误，最常见的原因是 API Key 配置不正确或地区限制问题。

对于需要多轮对话的场景，可以使用 chat 会话：

```python
chat = client.chats.create(model="gemini-2.5-flash")
response = chat.send_message("你好，请介绍一下 Gemini API 的免费层")
print(response.text)

# 继续对话，保持上下文
response = chat.send_message("免费层有哪些限制？")
print(response.text)
```

## 429 错误：原因、诊断与解决方案

**核心答案：** 429 错误表示你的项目已超出速率限制。最常见的原因是 RPM（每分钟请求）超限，解决方法是实现指数退避重试逻辑或切换到限制更宽松的模型。

当你收到 HTTP 429 RESOURCE_EXHAUSTED 错误时，首先需要确定是哪种限制被触发。三种限制的表现模式各不相同：

- **RPM 超限**：错误呈现突发模式，一段时间内集中出现，然后恢复正常
- **TPM 超限**：错误与请求大小相关，长提示词或长响应更容易触发
- **RPD 超限**：错误在一天中逐渐增多，太平洋时间午夜后恢复

根据 [Google Cloud 官方博客](https://cloud.google.com/blog/products/ai-machine-learning/learn-how-to-handle-429-resource-exhaustion-errors-in-your-llms) 的建议，处理 429 错误的标准做法是实现指数退避重试。以下是使用 tenacity 库的推荐实现：

```python
from tenacity import retry, stop_after_attempt, wait_exponential
from google import genai

client = genai.Client()

@retry(
    stop=stop_after_attempt(5),           # 最多重试5次
    wait=wait_exponential(min=1, max=60)  # 指数退避：1s, 2s, 4s, 8s, 16s...
)
def call_gemini_with_retry(prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text

# 使用示例
try:
    result = call_gemini_with_retry("解释量子计算的基本原理")
    print(result)
except Exception as e:
    print(f"多次重试后仍然失败: {e}")
```

除了实现重试逻辑，还有几个实用的优化策略：

1. **切换模型**：如果频繁触发 Gemini 2.5 Pro 的限制，考虑切换到 Flash-Lite，它提供 1,000 RPD 的配额
2. **Token 管理**：减少输入提示词的长度，使用更精简的系统提示
3. **请求合并**：将多个小请求合并为一个批量请求
4. **缓存响应**：对于相同或相似的查询，缓存之前的响应避免重复调用

对于需要更高配额的生产场景，可以考虑升级到付费层（Tier 1 立即获得 300 RPM、1,000 RPD），或使用统一网关服务，通过 GPT88（https://gpt88.cc）这类网关按人民币余额调用，成本可预测，具体配额与价格以控制台为准。

## 多模态输入的 Token 计算与配额消耗

Gemini API 支持文本、图像、音频和视频的多模态输入，但不同类型的输入消耗的 Token 数量差异很大。理解这些计算规则对于规划配额使用至关重要。

**图像输入**的 Token 消耗与分辨率直接相关。一张 1024×1024 像素的标准图像消耗约 1,290 个 Token。更高分辨率的图像会消耗更多 Token，但 Gemini 会自动调整大尺寸图像的大小。在免费层 250,000 TPM 的限制下，理论上每分钟可以处理约 190 张标准图像，但实际上 RPM 限制会先被触发。

**视频输入**的 Token 计算基于采样率。在默认的 1 FPS（每秒一帧）采样率下，每秒视频消耗 258 个 Token。一分钟的视频大约消耗 15,480 个 Token。如果视频包含音频，视频 Token 和音频 Token 会分别计算。免费层用户每天最多可以上传 8 小时的 YouTube 视频，付费用户没有这个限制。

**音频输入**在 Gemini 2.5 Flash 中定价为 $1.00/百万 Token（约相当于 10 小时音频），相比 GPT-4o 的 $10.00/百万 Token 便宜 10 倍。这使 Gemini 在音频处理场景中具有明显的成本优势。

实际应用中的 Token 优化建议：

- 图像处理：在发送前压缩图像，移除不必要的细节
- 视频分析：提取关键帧而非处理完整视频
- 长文档：使用摘要或分块处理，而非一次性输入全部内容

## Gemini vs OpenAI vs Claude：免费层横向对比

在选择 AI API 服务时，免费层的可用性是许多开发者的重要考量因素。以下是三大主流平台的横向对比：

| 特性 | Google Gemini | OpenAI | Anthropic Claude |
| --- | --- | --- | --- |
| **真正的免费 API** | ✅ 有 | ❌ 无（仅一次性额度） | ❌ 无 |
| **上下文窗口** | 100 万 Token | 128K Token | 200K Token |
| **需要信用卡** | 免费层不需要 | API 必须绑卡 | API 必须绑卡 |
| **数据使用** | 免费层数据可能用于训练 | 付费不用于训练 | 付费不用于训练 |
| **中国访问** | 需要绕过限制 | 需要绕过限制 | 需要绕过限制 |

Gemini 的独特优势在于它是唯一提供持续免费 API 访问的主流服务。OpenAI 在新账号创建时提供一次性免费额度（通常 $5-18，90 天有效期），但这本质上是试用而非免费层。Claude 同样没有真正的免费 API 层。

从能力角度看，三者各有所长。Gemini 在多模态处理和上下文长度上领先，GPT-4 在通用能力和生态系统成熟度上占优，Claude 在长文档处理和编码任务上表现出色。对于预算有限的开发者，Gemini 的免费层是最实际的入门选择。

对于需要同时使用多个模型的场景，统一网关平台如 GPT88 提供了统一的接口访问方式，一把 API Key 即可调用 Gemini、GPT-4、Claude 等多种模型，简化了多模型集成的复杂度。具体模型覆盖与价格以 gpt88.cc 控制台为准。

## 地区限制与中国开发者访问方案

Gemini API 免费层在全球 180 多个国家和地区可用，但存在明确的地区限制。根据 Google 的政策，以下地区的用户无法使用免费层：中国大陆、俄罗斯、部分中东国家。此外，为欧盟、英国和瑞士用户提供服务的应用必须使用付费层，以满足数据合规要求。

中国开发者面临的技术障碍是多层面的。DNS 过滤阻止了 generativelanguage.googleapis.com 的解析，深度包检测会阻断到 Google IP 段的 HTTPS 连接，从受限 IP 地址发起的连接会被立即终止。这使得直接访问 Gemini API 在中国大陆几乎不可能。

**VPN 方案**在技术上可行，但存在明显风险。使用 VPN 访问 Gemini 违反了 Google 的服务条款，可能导致账号被封禁。此外，VPN 连接的稳定性和延迟也会影响 API 调用的可靠性，典型延迟在 280-680ms 之间，对于实时应用来说可能无法接受。

**API 网关方案**是更可靠的替代选择。这类服务通过在支持地区部署边缘节点，为受限地区的开发者提供合规的访问通道。以 GPT88（https://gpt88.cc）为例，它提供国内直连与人民币计费，解决了国际支付的障碍，一把 Key 即可接入 Gemini、GPT、Claude 等多家模型。需要注意的是，这类服务适合对稳定性和便捷性有要求的场景；如果你需要官方技术支持或有严格的数据合规要求，应考虑通过合规渠道使用官方服务。具体配额与价格以 gpt88.cc 控制台为准。

## Google AI Studio vs Vertex AI：选择指南

Google 提供两种方式访问 Gemini 模型：Google AI Studio 和 Vertex AI。两者使用相同的底层模型，但在定位、功能和适用场景上有明显区别。

| 特性 | Google AI Studio | Vertex AI |
| --- | --- | --- |
| **定位** | 开发者/原型 | 企业/生产 |
| **免费层** | ✅ 有 | ❌ 无（需要计费） |
| **需要信用卡** | 基础使用不需要 | 必须启用 Cloud Billing |
| **企业安全** | 基础 | 高级（VPC、审计日志等） |
| **SLA 保障** | 无 | 有 |
| **数据合规** | 免费层数据可能用于改进 | 付费数据不用于训练 |
| **迁移成本** | - | 使用统一 SDK，迁移简单 |

**选择 AI Studio 的场景**：学习和实验、构建原型、个人项目、成本敏感的小型应用。AI Studio 提供直观的 Web 界面用于测试提示词，免费层足以支持开发阶段的需求。

**选择 Vertex AI 的场景**：生产级应用部署、需要企业级安全控制（如 VPC Service Controls、Access Transparency）、有数据驻留要求、需要与其他 Google Cloud 服务深度集成。

好消息是，Google 最近统一了两个平台的 SDK。新版 Google Gen AI SDK 同时支持 AI Studio 和 Vertex AI 后端，迁移只需更改初始化参数：

```python
# AI Studio（默认）
client = genai.Client()

# Vertex AI
client = genai.Client(
    vertexai=True,
    project='your-project-id',
    location='us-central1'
)
```

## 免费 vs 付费：何时该升级？

**核心答案：** 当你频繁遇到 429 错误、需要部署生产应用、或需要更高的并发能力时，就是升级到付费层的时机。

免费层适合以下场景：学习 Gemini API 和 AI 开发、构建概念验证原型、个人使用的低频应用、对延迟和可靠性要求不高的项目。在这些场景下，免费层的限制通常是可以接受的。

以下信号表明你应该考虑升级：

1. **频繁的 429 错误**：如果你的应用经常触发配额限制，用户体验会严重受损
2. **需要更高 RPM**：免费层最高 15 RPM，付费 Tier 1 立即提升到 300 RPM
3. **生产部署**：任何面向真实用户的应用都应该使用付费层
4. **数据隐私要求**：免费层的数据可能用于模型改进，付费层不会
5. **需要 SLA 保障**：Vertex AI 提供企业级 SLA，免费层没有

**升级 ROI 计算示例**：

假设你的应用每天需要 500 次 API 调用，每次平均消耗 1,000 Token：

- 免费层：只能支持 100-250 次（取决于模型），超出部分无法完成
- Tier 1 付费层（Gemini 2.5 Flash）：
  - 输入成本：500 × 500 Token × $0.30/M = $0.075/天
  - 输出成本：500 × 500 Token × $2.50/M = $0.625/天
  - 月成本约：$21

对于每天 500 次调用的应用，月成本约 21 美元即可获得稳定的服务。相比之下，如果使用统一网关服务如 GPT88，人民币计费、余额可见，通常能更好地控制预算，且没有官方免费层的配额焦虑。选择哪种方案取决于你对官方支持和数据合规的具体要求，具体价格与配额以 gpt88.cc 控制台为准。

## 常见应用场景的配额规划

不同类型的应用对 API 配额有不同的需求。以下是几个常见场景的配额规划参考：

**聊天机器人**是最常见的应用场景。一个典型的对话轮次包含用户输入（约 100 Token）、系统提示词（约 500 Token）、对话历史（可变）和模型响应（约 500 Token）。假设每轮对话消耗约 1,500 Token：

| 使用强度 | 日对话轮次 | 模型选择 | 免费层可行性 |
| --- | --- | --- | --- |
| 个人使用 | 50-100 | Flash-Lite | ✅ 可行 |
| 小团队 | 200-500 | Flash | ⚠️ 勉强 |
| 生产应用 | 1,000+ | 需付费层 | ❌ 不可行 |

**RAG 应用**（检索增强生成）通常需要更大的 Token 预算，因为要包含检索到的上下文。一个典型的 RAG 查询可能包含 5,000-20,000 Token 的上下文。免费层的 250,000 TPM 理论上支持每分钟 12-50 次 RAG 查询，但 RPM 限制会先触发。建议 RAG 应用使用 Flash-Lite 模型以获得最高的 RPD 配额。

**批量处理**场景（如文档分析、内容生成）建议使用 Google 的 Batch API，它能降低 50% 的成本，且有专门的队列管理机制。免费层也支持 Batch API，但有单独的排队 Token 限制。

**配额使用公式**：

```text
日可用请求数 = min(RPD限制, 24*60*RPM限制, 24*60*TPM限制/平均请求Token)
```

以 Gemini 2.5 Flash 为例：

- RPD = 250
- 24×60×10 RPM = 14,400
- 24×60×250,000/2,000 = 1,800,000（假设每请求 2,000 Token）

实际瓶颈是 RPD 的 250 次限制。

## 常见问题解答

### Gemini API 免费层需要绑定信用卡吗？

不需要。这是 Gemini 相比 OpenAI 和 Claude 的显著优势。你可以直接在 Google AI Studio 创建 API Key 并开始使用，无需提供任何支付信息。只有当你决定升级到付费层时才需要启用 Cloud Billing。不过需要注意，免费层的数据可能被 Google 用于改进服务，如果有隐私顾虑应考虑付费层。

### 免费层的配额什么时候重置？

每日配额（RPD）在太平洋时间午夜（北京时间下午 4 点/夏令时下午 3 点）重置。每分钟配额（RPM/TPM）则是滚动窗口，即从当前时刻往前计算一分钟内的使用量。如果你在下午 3:55 触发了 RPM 限制，只需等待约一分钟即可恢复。

### 创建多个 API Key 能增加配额吗？

不能。速率限制是按 Google Cloud 项目级别执行的，而非按 API Key。在同一个项目中创建多个 Key，所有 Key 共享同一个配额池。如果需要更高配额，唯一的方法是升级到付费层或创建多个独立的 Google Cloud 项目。

### Gemini 3 Pro 有免费层吗？

没有。Gemini 3 Pro Preview 只能通过付费 API 访问，定价为输入 $2.00/百万 Token、输出 $12.00/百万 Token。你可以在 Google AI Studio 的聊天界面免费体验 Gemini 3 Pro，但这不是 API 访问。如果需要最新的免费模型，Gemini 3 Flash Preview 是更好的选择。

### 中国开发者如何使用 Gemini API？

由于地区限制，中国大陆的开发者无法直接访问 Gemini API。可行的方案包括：使用 VPN（有账号封禁风险）、通过统一网关服务（如 GPT88，https://gpt88.cc）访问、或在海外服务器部署应用后调用 API。每种方案都有其利弊，需要根据具体需求和合规要求选择。

### 免费层和付费层的模型能力有区别吗？

没有区别。免费层和付费层访问的是完全相同的模型，能力、响应质量都一样。唯一的区别是配额限制和数据使用政策。付费层提供更高的 RPM/TPM/RPD 限制，且保证数据不会用于训练。

## 总结与下一步

Gemini API 免费层为开发者提供了一个零成本入门 AI 开发的机会，这在当前的大模型市场中是独特的优势。尽管 2025 年 12 月的配额削减使免费层的实用性下降，但对于学习、原型开发和个人项目来说仍然足够。

**核心建议**：

1. **模型选择**：免费层优先使用 Flash-Lite（1,000 RPD），需要更强能力时切换到 Flash
2. **错误处理**：始终实现指数退避重试逻辑，这是处理 429 错误的最佳实践
3. **配额规划**：了解你的应用需求，如果日调用超过 250 次，考虑升级或使用替代方案
4. **升级时机**：生产应用应使用付费层，免费层的稳定性和配额不足以支撑真实用户

如果你正在寻找稳定的 AI API 服务，可以了解一下 [GPT88](https://gpt88.cc)。平台聚合了 Gemini、GPT、Claude 等主流 AI 模型，按人民币余额计费，接入简单（兼容 OpenAI SDK，只需替换 base_url），适合需要稳定访问和成本优化的开发者。具体价格可查阅 [GPT88 文档](https://doc.gpt88.cc)。

**有用的资源链接**：

- [Google 官方速率限制文档](https://ai.google.dev/gemini-api/docs/rate-limits)
- [Google 官方定价页面](https://ai.google.dev/gemini-api/docs/pricing)
- Google Gen AI SDK 文档
- [Google AI Studio](https://aistudio.google.com/)
