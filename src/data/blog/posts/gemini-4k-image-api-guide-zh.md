---
title: Gemini 4K 图片 API：当前模型、代码和成本边界
description: 介绍 Gemini 4K 图片生成 API 的正确接入方式：gemini-3-pro-image 当前模型 ID、Interactions API 与 response_format 配置、1K/2K/4K 输出档位、Standard 与 Batch/Flex 成本边界，以及项目级配额与 429 排查清单。
date: 2026-01-20
category: API开发
tags: [Gemini API, 4K图片生成, Nano Banana Pro, Gemini 3 Pro Image, AI图像API]
readTime: 14
relatedPath: /docs/api/images/
relatedTitle: 图片生成 API
---

Gemini 4K 图片 API 现在不应该再按旧的 preview 示例来接入。对开发者来说，当前重点是三件事：使用 `gemini-3-pro-image`，通过 Interactions API 的 `response_format` 控制图片输出，并在预算里区分标准调用、Batch、Flex、Priority 和第三方网关。

截至 2026-07-08，Google 的 Gemini image generation 文档把 Nano Banana Pro 对应到 Gemini 3 Pro Image，模型 ID 是 `gemini-3-pro-image`。官方文档还给出了 4K 输出的 token 档位：4K image output 消耗 2000 image tokens；标准 API 等价价格是每张 `$0.24`，Batch/Flex 等价价格是每张 `$0.12`。这些价格和可用性仍然是波动事实，生产上线前要以 Google 的 [image generation](https://ai.google.dev/gemini-api/docs/image-generation)、[pricing](https://ai.google.dev/gemini-api/docs/pricing)、[rate limits](https://ai.google.dev/gemini-api/docs/rate-limits) 和 [API key](https://ai.google.dev/gemini-api/docs/api-key) 页面为准。

| 你要决定什么 | 当前建议 |
| --- | --- |
| 4K 生产资产 | 优先评估 `gemini-3-pro-image`，确认项目计费和模型可用性 |
| 快速迭代或批量草图 | 先用更低成本模型或 1K/2K 预览，定稿后再升到 4K |
| 接口形态 | 新示例优先用 Interactions API，不复制旧版图像参数 |
| 输出尺寸 | 在 `response_format` 里设置 `type: "image"`、`aspect_ratio`、`image_size` |
| 成本控制 | 区分标准、Batch、Flex、Priority，不把第三方报价当官方价格 |
| 配额排查 | 看 project 级 RPM/TPM/RPD/IPM 和 spend limit，不靠多建 API key |

## 当前模型怎么选

Google 文档现在把 Nano Banana 系列拆成多条路线，不再是一个单一模型。

| 模型 | 当前定位 | 适合场景 |
| --- | --- | --- |
| `gemini-3-pro-image` | Nano Banana Pro / Gemini 3 Pro Image | 复杂指令、专业资产、4K、文字和品牌一致性要求高的任务 |
| `gemini-3.1-flash-image` | Nano Banana 2 / Gemini 3.1 Flash Image | 通用图片生成、编辑、多轮迭代、成本和速度更敏感的任务 |
| `gemini-3.1-flash-lite-image` | Nano Banana 2 Lite | 大规模、低成本、低延迟任务 |
| `gemini-2.5-flash-image` | 旧 Nano Banana 路线 | 旧项目兼容；新项目应评估是否迁移 |

如果这篇文章的目标是"生成 4K 交付图"，核心路线是 `gemini-3-pro-image`。如果目标只是给用户快速看方向，先用更便宜的模型或更低分辨率做预览，通常比一上来全量 4K 更可控。

不要再使用旧 preview 模型名作为新代码依据。旧名称可能仍散落在历史文章、教程或网关别名里，但正式接入文档应以当前官方模型 ID 为准。

## API key 和环境变量

Gemini API key 绑定到 Google Cloud project。计费、配额、日志、权限和限流都要回到 project 维度排查，而不是只看 key 字符串。

开发环境建议使用环境变量：

```bash
export GEMINI_API_KEY="your_key_here"
```

Google 客户端库会读取 `GEMINI_API_KEY` 或 `GOOGLE_API_KEY`。如果两个变量同时存在，官方文档说明 `GOOGLE_API_KEY` 会优先。生产环境不要把 key 写进前端、移动端包、公开仓库、示例截图或日志；用后端代理、环境变量、Secret Manager 或部署平台的 secret 管理。

如果你还没整理 key 类型、迁移和安全边界，先看官方 [API key](https://ai.google.dev/gemini-api/docs/api-key) 文档，再回来接 4K 调用。

## 最小 4K 调用示例

下面示例展示当前 Interactions API 形态。它只说明参数结构，不承诺你的项目一定有权限、一定有免费额度、一定可以立即调用 4K。

```python
from google import genai
import base64

client = genai.Client()

prompt = (
    "为一款高端护肤精华生成 16:9 电商主视觉，"
    "透明玻璃瓶、干净白色背景、柔和产品光、可用于网页首屏。"
)

interaction = client.interactions.create(
    model="gemini-3-pro-image",
    input=prompt,
    response_format={
        "type": "image",
        "aspect_ratio": "16:9",
        "image_size": "4K",
    },
)

if interaction.output_image:
    with open("gemini-4k-product-hero.png", "wb") as f:
        f.write(base64.b64decode(interaction.output_image.data))
```

关键点：

- `model` 使用当前 `gemini-3-pro-image`。
- `response_format.type` 设置为 `image`。
- `image_size` 可以用 `1K`、`2K`、`4K`，具体支持以当前文档和模型行为为准。
- `aspect_ratio` 会影响实际像素尺寸和构图，不等于强制输出你手写的任意像素宽高。
- 如果需要文本和图片混合返回，可以把 `response_format` 写成数组，但生产保存图片时仍要检查实际输出块。

通过 GPT88 统一网关以 Google 兼容接口调用时，base URL 换成 `https://img.gpt88.cc`，API key 使用在 gpt88.cc 控制台获取的 `YOUR_GPT88_API_KEY`，模型 ID 与上面的官方 ID 保持一致。

## 图生图和参考图

4K 生成不只适合文生图，也适合把已有图片作为参考，再让模型重建构图、换背景或生成品牌物料。

```python
from google import genai
import base64

client = genai.Client()

with open("reference.png", "rb") as f:
    reference = base64.b64encode(f.read()).decode("utf-8")

interaction = client.interactions.create(
    model="gemini-3-pro-image",
    input=[
        {
            "type": "text",
            "text": "保留产品瓶身形状和标签，把场景改成高端浴室台面，生成 4K 横版广告图。",
        },
        {
            "type": "image",
            "mime_type": "image/png",
            "data": reference,
        },
    ],
    response_format={
        "type": "image",
        "aspect_ratio": "16:9",
        "image_size": "4K",
    },
)
```

上传参考图前要确认版权和使用权。Gemini 图像生成服务仍然受 Google 的安全和禁止用途政策约束，不要用它生成欺骗、骚扰、侵权或绕过安全限制的内容。

## 4K 输出尺寸怎么理解

"4K"在 Gemini API 里更接近输出档位，不是让你随便填一个 `4096x4096` 的固定尺寸。官方表按不同宽高比列出实际像素和 token 档位。

| 宽高比 | 4K 输出示例 | 适合用途 |
| --- | --- | --- |
| 1:1 | 4096 x 4096 | 方形海报、电商主图、封面素材 |
| 16:9 | 5504 x 3072 | 网页首屏、视频封面、大屏展示 |
| 9:16 | 3072 x 5504 | 竖版海报、短视频封面 |
| 4:5 | 3712 x 4608 | 社交媒体竖版图、电商详情图 |
| 21:9 | 6336 x 2688 | 超宽横幅、沉浸式网页头图 |

实际选择要从交付场景倒推。网页展示不一定需要 4K 原图直出；很多情况下，2K 已经足够，4K 更适合需要裁切、印刷、大屏或保留后期空间的任务。

## 成本边界

按 Google pricing 页面，Gemini 3 Pro Image 的标准 API 里，图片输出按 image tokens 计价。1K/2K 输出等价 `$0.134` 每张，4K 输出等价 `$0.24` 每张。Batch 和 Flex 的 4K 等价价是 `$0.12` 每张。Priority 价格更高，适合对优先级有要求的生产场景。

预算时不要只算输出图：

| 成本项 | 为什么要算 |
| --- | --- |
| 输入文本和参考图 | 文本、图片输入也会计入请求成本 |
| 图片输出尺寸 | 4K 比 1K/2K 消耗更多 image tokens |
| Thinking / text output | Pro 图像模型可能返回文本和推理相关输出，预算要看实际账单 |
| Google Search grounding | 请求可能触发一次或多次搜索查询，按官方计费规则另算 |
| 重试和失败 | 429、超时、内容拦截、无图输出都要按账单记录核对 |
| Batch/Flex/Priority | 调度方式不同，价格、延迟和可用性都不同 |

一个保守的生产流程是：先用 1K 或 2K 做创意确认，定稿后再生成 4K；不需要实时返回的大批量任务放进 Batch 或 Flex；只有真正需要优先返回的任务才评估 Priority。

> 通过 GPT88 统一网关接入时，按官方用量 × 所选分组倍率扣费，具体价格与配额以 gpt88.cc 控制台为准。

## 配额和 429 排查

Gemini API rate limits 通常看 RPM、TPM 和 RPD；图片模型还可能有 IPM 这类图片相关限制。关键点是：这些限制按 project 应用，不按 API key 应用。多创建几个 key 不会自然增加容量。

上线前至少记录这些信息：

| 项目 | 需要记录 |
| --- | --- |
| Project ID | 配额、账单、日志都按 project 查 |
| 模型 ID | `gemini-3-pro-image`、`gemini-3.1-flash-image` 等必须写清楚 |
| 调用方式 | Standard、Batch、Flex、Priority |
| 输出尺寸 | 1K、2K、4K 影响 token 和费用 |
| 主动限流 | 队列、并发上限、重试间隔、降级策略 |
| 花费限制 | Spend-based rate limit 可能触发 429 |

遇到 429 时，先降低并发、做指数退避、把 4K 任务排队，或把非实时任务转为 Batch/Flex。更完整的处理路径可以参考 [Gemini API 免费层限制](/docs/blog/gemini-api-free-tier/) 与 [图片生成 429 排查](/docs/blog/gemini-image-generation-rate-limit/)。

## 网关怎么评估

第三方网关可以解决本地支付、兼容接口、多模型路由、备用通道或日志聚合问题。但它不是 Google 官方 API，也不能替代 Google 文档里的模型、价格、配额和安全政策。

接入前逐项核对：

| 核对项 | 判断标准 |
| --- | --- |
| 当前模型名 | 是否真的支持 `gemini-3-pro-image`，还是只保留旧 preview 别名 |
| 4K 参数 | 是否支持 `image_size` / 输出尺寸控制，实际返回像素是多少 |
| 失败计费 | 超时、429、内容拦截、空输出是否扣费 |
| 账单明细 | 是否能看到每次请求、模型、尺寸、扣费和错误 |
| 数据边界 | 是否适合把用户图片、品牌资产或敏感素材经过网关 |
| 退款和 SLA | 只以当前控制台、服务条款和工单记录为准 |

如果网关确实降低你的支付和集成摩擦，可以小样本测试。不要在文章或产品页里承诺绝对低价、绝对稳定、无限容量或固定失败处理政策，除非当天有可审计证据。GPT88 作为统一网关，其价格与配额以 gpt88.cc 控制台为准；具体某张图的扣费按官方用量与所选分组倍率计算。

## 提示词和交付流程

4K 输出的价值不在于把一句短 prompt 放大，而在于给模型足够清楚的交付背景。

更稳的 prompt 通常包含：

- 交付用途：网页首屏、电商主图、印刷海报、品牌 KV、应用图标。
- 主体和限制：产品形状、人物姿态、Logo 位置、必须保留的文字。
- 画面规格：横版/竖版、近景/全景、是否留文案区域。
- 风格约束：摄影、插画、3D、信息图、材质和灯光。
- 后期需求：是否需要裁切、透明背景、系列一致性。

不要在 prompt 里写"8K 商业级细节"来替代真实的 `image_size` 设置。提示词里的"4K/8K"只是风格语言；API 的输出档位要通过 `response_format` 控制。

如果你要做一组图，建议先固定系统化字段：用途、尺寸、宽高比、参考图、品牌禁区、输出命名、验收标准。这样比每张图临时写一句 prompt 更容易复现。

## 常见问题

### Gemini 4K 图片必须用 Nano Banana Pro 吗？

如果目标是复杂专业资产和 4K 输出，当前应优先评估 `gemini-3-pro-image`。如果只是快速草图、低成本批量图或多轮编辑，可以先评估 `gemini-3.1-flash-image` 或 Lite 路线，再按质量需求升级。

### 旧 preview 模型名还能用吗？

新文章和新代码不要依赖这个旧 preview 名称。它可能出现在历史教程或网关别名里，但正式接入应使用当前官方模型 ID，并在项目里实际试跑。

### 免费层能不能生成 4K？

不要把旧文章里的固定免费额度当成当前事实。Gemini 3 Pro Image pricing 页面显示该模型的 Free Tier 为 Not available。是否能调用、能调用多少、是否需要 billing，要看你的 project、模型和当前 AI Studio 限额。

### `image_size="4K"` 就一定是 4096 x 4096 吗？

不是。1:1 的 4K 档位是 4096 x 4096；16:9、9:16、4:5 等宽高比对应不同实际像素。按官方输出表和你的交付场景选择，而不是在代码里硬写任意像素。

### SynthID 水印能去掉吗？

Google 文档说明生成图片包含 SynthID 水印。不要把"去水印"作为正常开发目标；如果用户关心标识、授权或合规，应在产品说明里透明告知 AI 生成和使用范围。

### 为什么会 429？

429 可能来自 RPM、TPM、RPD、图片相关限制、spend-based limit 或模型临时容量。它是 project 级问题，不是 key 字符串问题。先看 AI Studio 的 active rate limits 和账单，再决定限流、排队、Batch/Flex 或申请提升。

## 上线前检查清单

- 模型 ID 已换成 `gemini-3-pro-image`。
- 新代码使用 Interactions API 和 `response_format`，没有复制旧 image config 示例。
- API key 存放在后端环境变量或 secret 系统中。
- Project ID、billing、rate limits 和 spend limit 已记录。
- 1K/2K/4K 的预算按当前 pricing 页面核对。
- 429、403、模型不可用、空输出都有用户可理解的处理策略。
- 第三方网关只作为候选路线，已经核对当前模型、4K 输出、账单、失败扣费和数据边界。

Gemini 4K 图片 API 的正确用法不是堆叠"高清""最新""低价"关键词，而是把模型、输出档位、预算、配额和安全边界讲清楚。这样页面更符合真实开发者任务，也更不容易因为过度 SEO 或陈旧承诺带来索引和信任风险。
