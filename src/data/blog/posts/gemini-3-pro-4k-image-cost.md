---
title: Nano Banana Pro 4K 免费吗？先看 Nano Banana 2、API 价格和积分归属
description: 核对 Nano Banana Pro 与 Nano Banana 2 的官方 4K API 价格与 Free Tier，解释 Gemini Apps 的 1K/2K 下载与第三方积分归属，并用大写的 image_size=4K 确认真 4K 输出。
date: 2026-06-13
category: Gemini专题
tags: [Nano Banana Pro, Nano Banana 2, 4K 图像生成, Gemini API, 免费额度]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: Google 图片生成 API
---

**先说结论：Nano Banana Pro 能通过官方 API 输出 4K，但按 2026 年 7 月 20 日核对的 Standard 价格行，4K 图像输出没有 Free Tier，示例价约为每张 $0.24。**而且 Pro 已经不是唯一能做官方 4K 输出的选择：Nano Banana 2（`gemini-3.1-flash-image`）也支持 4K，Standard 4K 图像输出示例价约为每张 $0.151。

如果你只是想在 Gemini 网页里生成并下载图片，答案又不同。当前 Gemini Apps 帮助页写的是：无 Google AI 计划时下载 1K，有计划时下载 2K；这不是官方 API 的 4K 输出合同。至于网页写的"免费积分"，先查清积分由 Google、你的 API 项目，还是第三方平台发放，再计算能生成多少张。

## 先用 30 秒认清你在哪个入口

中文搜索里常把"免费额度""积分""免费次数"和"API Free Tier"混在一起。它们不是同一个东西。先按实际入口找答案：

| 你正在使用的入口 | 该看什么 | 不能据此推断什么 |
| --- | --- | --- |
| Gemini Apps 网页或 App | 账号计划、当前功能限制、下载文件尺寸 | 不能推断 API 免费层或 4K API 价格 |
| Google AI Studio | 当前账号与项目显示的模型、限制和账单状态 | 不能推断永久免费，也不能替代生产计费核对 |
| Gemini Developer API | 模型 ID、`image_size`、Standard/Batch 等执行通道、项目账单 | 不能推断消费者订阅包含 API 调用 |
| Google Cloud / Vertex AI | 区域、项目、配额、IAM、模型状态和 Cloud 价格 | 不能推断 Gemini Apps 权益 |
| 第三方生成器或 API | 平台自己的积分、模型路线、分辨率、失败扣费、隐私和支持 | 不能把平台积分写成 Google 官方免费额度 |

这篇文章只回答"4K 是否免费、Nano Banana 2 与 Pro 怎么选、免费积分如何换算"三个问题。它不假定任何入口在中国大陆可用，也不提供改区、代付或其他地区规避方案；可用地区、账号资格和付款条件必须以对应官方页面及你自己的账号状态为准。

## 4K API 价格：Nano Banana 2 是 $0.151，Pro 是 $0.24

Google 当前把 Nano Banana 2 对应到 `gemini-3.1-flash-image`，把 Nano Banana Pro 对应到 `gemini-3-pro-image`。在 [Gemini Developer API 官方价格页](https://ai.google.dev/gemini-api/docs/pricing) 的 Standard 表格中，两条图像输出价格目前都显示为付费，Free Tier 一栏为不可用。

| Standard API 图像输出 | Nano Banana 2 | Nano Banana Pro |
| --- | --- | --- |
| 模型 ID | `gemini-3.1-flash-image` | `gemini-3-pro-image` |
| 0.5K | 约 $0.045/张 | 不支持该档 |
| 1K | 约 $0.067/张 | 约 $0.134/张 |
| 2K | 约 $0.101/张 | 约 $0.134/张 |
| 4K | **约 $0.151/张** | **约 $0.24/张** |
| Standard 图像输出 Free Tier | 未提供 | 未提供 |

这些数字是官方页面给出的图像输出等价示例，不是永久报价，也不是完整项目总成本。输入图片、文本与思考输出、搜索 grounding、重试，以及 Standard、Batch、Flex、Priority 等执行通道可能有不同计费。预算前要重新打开价格页，并确认自己实际调用的模型 ID 和通道。

### 用 100 张 4K 做一个不夸大的预算

只计算 100 个成功返回的 Standard 4K 图像输出，忽略输入和其他费用：

- Nano Banana 2：`100 × $0.151 = $15.10`
- Nano Banana Pro：`100 × $0.24 = $24.00`
- 同样数量的 4K 输出，示例差额为 `$8.90`

这不等于"100 张可交付成品"的成本。生成结果可能需要重试或淘汰，真正适合团队的指标是：

`每张验收成品成本 = 本次任务全部实际账单 ÷ 最终通过验收的图片数`

例如同样返回 100 张图，如果只有 70 张达到文字、人物一致性或品牌要求，就应把全部实付成本除以 70，而不是只比较单次标价。本文没有实测两款模型，因此不会声称某一款一定有更高通过率。

## Nano Banana 2 还是 Pro：先让便宜的路线参加同题测试

[官方图像生成文档](https://ai.google.dev/gemini-api/docs/image-generation)把 Nano Banana 2 定位为兼顾性能、智能、成本和延迟的通用选择，适合速度与高吞吐任务；Nano Banana Pro 更面向复杂指令和专业资产制作。两者都能输出 4K，所以"要 4K"本身不足以证明必须选 Pro。

更稳的决策方法是准备 10–20 个真实任务，用相同输入和验收表分别跑两款模型：

1. **先测 Nano Banana 2。**如果是批量商品背景、社媒素材、简单海报或常规编辑，较低的 4K 示例价值得先验证。
2. **把难题留给 Pro 复测。**复杂中文排版、品牌一致性、多张参考图、信息图或严格构图如果在便宜路线反复失败，再判断 Pro 是否能降低返工。
3. **按验收成本选，不按一次观感选。**记录实际账单、可接受输出数、人工修订时间和平均等待，而不是只收藏最好的一张图。
4. **保留回退策略。**即便 Pro 在难题上更合适，也不意味着所有图片都要走 Pro；可以按任务难度分流。

官方定位只能说明应该先评估什么，不能保证你的中文文字、角色一致性或品牌模板一定成功。

## Gemini Apps 的 1K/2K 下载，不是 4K API 免费额度

截至 2026 年 7 月 20 日，[Gemini Apps 图像帮助页](https://support.google.com/gemini/answer/14286560)明确写明：无 Google AI 计划时下载 1K，有计划时下载 2K。页面也说明功能受支持语言和国家/地区限制。由此能得到的安全结论只有两个：

- Gemini Apps 当前下载规格不能拿来证明你获得了官方 API 4K 输出；
- Google AI 计划提高的是指定消费者产品内的权益，不会自动把 Standard API 图像输出变成免费层。

同一帮助页还区分了 Nano Banana 2 与 Nano Banana Pro：App 中 Nano Banana 2 是常规生成路线，而 Pro 可作为计划用户在需要更多细节时的 redo 选项。这里的"可用""redo"和下载规格仍属于 Gemini Apps，不等于开发者 API 的模型调用、项目配额或账单。

此外，[Gemini Apps 限制说明](https://support.google.com/gemini/answer/16275805)当前使用基于算力的动态限制，并提醒限额可能因容量变化而调整。因此，不应把旧页面、缓存截图或其他语言页面里的固定日次数当成所有账号都适用的承诺。最可靠的数字是你当前账号内的"使用限制"提示；但它仍然只描述该 App 账号，不描述 API 项目。

## "免费积分"到底能换多少张 4K？先找积分所有者

"注册送 100 积分"本身无法换算图片数量。只有下面这些信息同时明确时，计算才有意义：

1. 积分是谁发的：Google 产品权益、API 项目赠金，还是第三方平台点数；
2. 100 积分的计价单位：美元余额、站内点数，还是固定任务次数；
3. 实际调用哪个模型 ID，是否可能动态路由到别的模型；
4. 选择 4K 时一次生成扣多少积分，下载文件是否真达到对应像素尺寸；
5. 失败、内容拦截、超时与重试是否扣费；
6. 积分何时过期，是否自动续费，退款与支持由谁负责；
7. 上传图片如何存储、是否用于训练、能否删除，以及生成内容的使用条款。

换算公式可以很简单：

`可尝试的 4K 次数 = 可用积分 ÷ 每次 4K 扣除积分`

但"可尝试次数"不等于"可交付图片数"。如果平台没有公开模型、分辨率、失败扣费和数据条款，正确答案就是**暂时无法计算**。不要把第三方页面的"免费 4K"反推成 Google 发放了官方 API 免费层，也不要为了几次试用上传客户商品图、真人脸或未发布品牌资产。

## 怎样确认拿到的是真 4K

4K 是输出尺寸合同，不是提示词形容词。按照官方 API 文档，Gemini 3 图像模型通过 `image_size` 请求 1K、2K 或 4K，而且 `K` 必须大写；传入 `4k` 这类小写值会被拒绝。

```json
{
  "model": "gemini-3.1-flash-image",
  "response_format": {
    "type": "image",
    "aspect_ratio": "16:9",
    "image_size": "4K"
  }
}
```

保存后仍要检查实际像素尺寸。4K 并不总是 `4096 × 4096`：长宽比不同，像素组合也不同。例如官方表格当前把 16:9 的 4K 列为 `5504 × 3072`，正方形则是 `4096 × 4096`。因此验证顺序应该是：

1. 记录调用入口、模型 ID、长宽比和 `image_size`；
2. 下载原文件，不用网页预览图判断；
3. 在文件信息或图像工具中检查像素宽高；
4. 判断是否只是第三方把小图上采样到大画布；
5. 保留请求记录和账单，方便处理尺寸或扣费争议。

Google 当前还说明 Gemini API 生成图片包含 SynthID。是否显示肉眼可见的水印由具体入口和当前呈现决定；"看不到水印"不能推出没有 SynthID。

## 通过 GPT88 统一网关接入 4K

如果你需要以国内可直连、账单可控的方式批量调用这些 4K 能力，可以通过 GPT88 统一网关接入。GPT88 充值 1 元 = 账户 1 元余额，实际扣费按官方用量 × 所选分组倍率，并按所选模型与分辨率走对应的官方计费；失败与无图返回按调用记录核对。

```python
import requests

API_KEY = "YOUR_GPT88_API_KEY"  # 在 https://gpt88.cc 控制台获取
API_URL = "https://img.gpt88.cc/v1beta/models/gemini-3-pro-image:generateContent"

payload = {
    "contents": [{
        "parts": [{"text": "生成一张 16:9 的信息图，主题为本周产品销量"}]
    }],
    "generationConfig": {
        "responseModalities": ["IMAGE"],
        "imageConfig": {"imageSize": "4K", "aspectRatio": "16:9"}
    }
}

response = requests.post(
    API_URL,
    headers={"Authorization": f"Bearer {API_KEY}"},
    json=payload,
    timeout=180
)
```

> **透明说明**：官方 API 在功能完整性和稳定性方面仍是首选。GPT88 作为统一网关适合预算有限、需要聚合多家模型或在国内直连的场景；具体价格、模型覆盖、失败计费与 4K 参数以 gpt88.cc 控制台为准。调用后仍按上文步骤核对真实像素尺寸。

## 一张决策清单：你现在该选哪条路

- **只想在网页里偶尔生成：**先看 Gemini Apps 当前账号是否可用、限制提示和下载尺寸；不要预设 4K。
- **要通过 API 批量生成 4K：**先让 Nano Banana 2 跑真实样本，再用 Pro 复测复杂任务；按验收成品成本决定分流。
- **必须处理复杂中文排版或专业资产：**Pro 值得评估，但先设验收标准，不能把官方定位当成功保证。
- **看到第三方免费积分：**先核对发行方、模型、4K 扣点、失败规则、数据条款与支持，再上传低风险素材。
- **涉及中国大陆使用：**单独核对官方支持地区、账号资格和付款条件；本文不据搜索结果推断可用性，也不提供地区规避路径。需要直连不便时的接入方案，可参考 GPT88 统一网关，具体以 gpt88.cc 控制台为准。

## 常见问题

### Nano Banana Pro 的官方 4K API 免费吗？

按 2026 年 7 月 20 日核对的 Standard 价格行，`gemini-3-pro-image` 的图像输出 Free Tier 为不可用，4K 输出示例价约 $0.24/张。价格、模型状态和执行通道会变化，正式预算前必须重查官方页面。

### Nano Banana 2 也能生成 4K 吗？

能。当前官方文档列出 `gemini-3.1-flash-image` 支持 0.5K、1K、2K 和 4K。Standard 4K 图像输出示例价约 $0.151/张，但较低价格不保证所有复杂任务都与 Pro 等效。

### 做 4K 为什么不一定要用 Pro？

因为 Nano Banana 2 和 Pro 都有官方 4K API 输出。Pro 的理由应该来自复杂指令、专业资产和你的同题验收结果，而不是"只有 Pro 才有 4K"这个已经不成立的前提。

### Gemini Apps 订阅后能下载 4K 吗？

当前官方帮助页写的是：有 Google AI 计划下载 2K，无计划下载 1K。它没有为这个 App 下载流程承诺 4K。不要把 API 模型的 4K 能力外推到 Gemini Apps。

### Google AI Pro 或 Ultra 会送免费 API 4K 吗？

消费者订阅权益和 Gemini Developer API 项目计费是不同合同。除非当前官方条款明确写明某项权益覆盖你的 API 项目和图像路线，否则不能据订阅身份推断 Standard API 免费。

### AI Studio 显示可用，是否等于 API 永久免费？

不是。AI Studio 是账号和项目相关的开发测试入口；模型可见、界面能运行、项目赠金和 Standard API Free Tier 是不同事实。以当前项目账单状态与官方价格行为准。

### 第三方"注册送积分"该怎么换算？

先确认每次 4K 扣点、实际模型、失败是否扣点和积分有效期，再用"可用积分 ÷ 单次 4K 扣点"计算尝试次数。任何一个分母未知时，都不能可靠计算能生成多少张。

### Batch 或 Flex 会让 4K 免费吗？

不会。不同执行通道可以改变价格、延迟或调度方式，但不是免费权益。本文列出的 $0.151 与 $0.24 是 Standard 示例，使用其他通道时应读取对应行。

### 提示词里写"4K"就够了吗？

不够。官方 API 要在尺寸字段中使用大写 `4K`，并在下载后检查真实像素。第三方页面还要排除只做上采样、却把结果宣传成原生 4K 的情况。

## 延伸阅读

- [Google 图片生成 API](/docs/api/images/)
