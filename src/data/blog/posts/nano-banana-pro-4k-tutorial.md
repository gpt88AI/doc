---
title: Nano Banana Pro 使用教程：如何生成 4K 高分辨率图像【完整指南】
description: 手把手教你使用 Nano Banana Pro 生成 4K 高清图像。从环境配置到参数设置，从提示词优化到成本控制，含完整 Python 代码示例和常见问题解决方案。
date: 2026-01-08
category: Gemini专题
tags: [Nano Banana Pro, 4K图片生成, Gemini 3 Pro Image, AI绘图教程, 高分辨率图像]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: GPT88 图片生成 API
---

Nano Banana Pro 是 Google 基于 Gemini 3 Pro 架构推出的图像生成模型，它解决了 AI 绘图领域长期存在的分辨率瓶颈问题。在此之前，DALL-E 3 最高支持 1792×1024 像素，Midjourney V6 止步于 1024×1024——这意味着生成的图片只能用于网页展示，无法满足印刷海报、商业广告、高清壁纸等专业场景的需求。

Nano Banana Pro 将这一上限提升到了 4096×4096 像素（约 1600 万像素），同时在文字渲染准确率上达到 94%，远超同类模型。根据 [Google 官方文档](https://ai.google.dev/gemini-api/docs/image-generation)，该模型支持 1K、2K、4K 三种分辨率输出，并提供 10 种宽高比选择，覆盖从社交媒体到商业印刷的全部场景。

本教程将从零开始，手把手教你如何使用 Nano Banana Pro 生成 4K 高分辨率图像。内容涵盖环境配置、参数设置、提示词优化、成本控制等核心环节，并附带完整的 Python 代码示例和常见问题解决方案。无论你是刚接触 AI 绘图的新手，还是希望提升输出质量的开发者，都能从中获得可直接落地的实践指导。

## Nano Banana Pro 4K 能力概述

Nano Banana Pro（官方名称 Gemini 3 Pro Image）采用了与 Gemini 3 对话模型相同的多模态架构，但针对图像生成进行了专门优化。与传统的扩散模型不同，它在生成图像前会进行"推理"——分析提示词中的逻辑关系、空间布局、物理规律，然后再输出最终结果。这种**推理引导的图像合成**（Reasoning-Guided Image Synthesis）是它能够准确渲染文字、保持角色一致性的核心原因。

从技术指标来看，Nano Banana Pro 在多个维度上超越了同类模型。分辨率方面，它支持 1K（1024×1024）、2K（2048×2048）、4K（4096×4096）三档输出，4K 模式的像素总量是 1K 的 16 倍。文字生成方面，它的准确率达到 94-96%，能够清晰渲染标题、标语、甚至段落级文本，这在 AI 绘图领域是里程碑式的突破。角色一致性方面，它支持混合最多 14 张参考图像，并能在多次生成中保持最多 5 个人物的面部特征一致。

4K 分辨率对实际应用的意义在于扩展了 AI 图像的使用边界。1K 图片在放大到 A4 纸张时就会出现明显的像素化，而 4K 图片可以支持 A1 甚至更大幅面的印刷输出。在电商产品图、营销海报、视频封面等场景，4K 意味着无需后期放大处理就能直接用于最终交付。根据 fal.ai 平台的测试数据，4K 输出在边缘锐度、细节层次、噪点控制上都显著优于低分辨率版本。

## 环境准备与 API 配置

在开始生成 4K 图像之前，需要完成开发环境的配置和 API 密钥的获取。整个过程大约需要 10-15 分钟。

**第一步：安装 Python 环境**

Nano Banana Pro 的官方 SDK 要求 Python 3.11 或更高版本。你可以通过以下命令检查当前版本：

    hljs bash复制python --version

如果版本低于 3.11，建议使用 pyenv 或 conda 安装新版本，避免影响系统原有的 Python 环境。

**第二步：安装依赖库**

Google 在 2025 年推出了新版 SDK `google-genai`，取代了旧版的 `google-generativeai`。新版 SDK 的 API 设计更简洁，并原生支持 4K 分辨率参数。安装命令如下：

    hljs bash复制pip install google-genai pillow

其中 `pillow` 用于处理生成的图片文件。如果你需要将图片保存为特定格式或进行后处理，这个库是必需的。

**第三步：获取 API 密钥**

访问 [Google AI Studio](https://aistudio.google.com/)，使用 Google 账号登录后，在左侧菜单选择「Get API Key」，然后点击「Create API Key」生成新密钥。密钥格式类似 `AIzaSy...`，共 39 个字符。

需要注意的是，Nano Banana Pro 的 4K 生成功能需要按量付费的 Blaze 定价计划。免费层级（Free tier）可以使用 1K 分辨率，但 4K 选项会被静默忽略。你可以在 Google Cloud Console 中升级到 Blaze 计划，升级后按实际用量计费，不生成图片就不产生费用。

**第四步：配置环境变量**

为了安全起见，建议将 API 密钥存储在环境变量中，而不是硬编码在代码里：

    hljs bash复制export GOOGLE_API_KEY="your-api-key-here"

在 Python 代码中，可以通过 `os.environ.get("GOOGLE_API_KEY")` 读取这个变量。这样即使代码被分享或上传到版本控制系统，也不会泄露密钥。

## 4K 图像生成完整代码教程

完成环境配置后，就可以开始生成 4K 图像了。以下是一个完整的代码示例，包含参数配置、API 调用、结果处理三个环节。

    hljs python复制import os
    from google import genai
    from google.genai import types
    from PIL import Image

    # 初始化客户端
    api_key = os.environ.get("GOOGLE_API_KEY")
    client = genai.Client(api_key=api_key)

    # 定义提示词
    prompt = """
    A majestic snow leopard standing on a rocky mountain peak at golden hour,
    photorealistic style, dramatic lighting with warm sunset colors,
    intricate fur details, piercing blue-green eyes,
    professional wildlife photography, 4K ultra high definition
    """

    # 配置 4K 生成参数
    config = types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE'],
        image_config=types.ImageConfig(
            aspect_ratio="16:9",    # 宽高比
            image_size="4K"         # 分辨率，必须使用大写 K
        )
    )

    # 调用 API 生成图像
    response = client.models.generate_content(
        model="gemini-3-pro-image-preview",
        contents=prompt,
        config=config
    )

    # 处理返回结果
    for part in response.parts:
        if part.text is not None:
            print(f"模型描述: {part.text}")
        elif image := part.as_image():
            image.save("snow_leopard_4k.png")
            print(f"图片已保存，尺寸: {image.size}")

运行这段代码后，你会在当前目录得到一个名为 `snow_leopard_4k.png` 的文件。使用 16:9 宽高比时，实际分辨率通常为 4096×2304 或 5632×3072 像素，文件大小在 15-25MB 之间。生成时间约为 15-20 秒，比 1K 模式的 10 秒稍长，这是因为 4K 需要更多的计算资源。

代码中有几个关键点需要特别注意。首先，`response_modalities` 必须包含 `'IMAGE'` 才能返回图片数据，如果只设置 `['TEXT']` 则只会返回文字描述而没有图片。其次，`image_size` 参数的值必须是大写的 `"4K"`，小写的 `"4k"` 会被静默忽略，导致输出 1K 分辨率的图片。最后，`model` 参数必须使用 `gemini-3-pro-image-preview`，这是目前唯一支持 4K 输出的模型，`gemini-2.5-flash-image`（Nano Banana 基础版）最高只支持 1K。

## imageSize 参数深度解析

`imageSize` 是控制输出分辨率的核心参数，但它的行为有一些容易踩坑的细节。理解这些细节可以避免"设置了 4K 但输出还是 1K"的常见问题。

**参数值与实际输出**

根据 [Google API 文档](https://ai.google.dev/gemini-api/docs/image-generation)，`imageSize` 接受三个值：

| 参数值 | 理论分辨率 | 实际输出范围     | Token 消耗 |
|--------|------------|------------------|------------|
| `"1K"` | 1024×1024  | 1024×1024        | 1120       |
| `"2K"` | 2048×2048  | 2048×2048        | 1120       |
| `"4K"` | 4096×4096  | 4096×4096 或更高 | 2000       |

实际输出分辨率还会受宽高比影响。例如，设置 `imageSize="4K"` 和 `aspect_ratio="16:9"` 时，输出可能是 4096×2304（保持总像素量接近 4K 基准）或 5632×3072（保持短边为 4K 级别）。两种情况都属于"4K 级别"输出。

**大小写敏感性**

这是最常见的踩坑点：`imageSize` 的值对大小写敏感，必须使用大写的 `"K"`。以下是不同写法的实际效果：

-   `"4K"` - 正确，输出 4K 分辨率
-   `"4k"` - 错误，静默降级为 1K
-   `"4096"` - 错误，参数无效
-   `"ultra"` - 错误，参数无效

如果你的代码设置了 4K 但输出图片尺寸只有 1024 像素左右，首先检查参数拼写是否正确。

**模型兼容性**

不是所有 Gemini 图像模型都支持 `imageSize` 参数：

-   `gemini-3-pro-image-preview` - 支持 1K/2K/4K
-   `gemini-2.5-flash-image` - 仅支持 1K，其他值被忽略
-   `imagen-3.0-generate-001` - 不使用此参数，有独立的分辨率设置

如果你使用的是 Flash 模型但想生成高分辨率图片，需要切换到 Pro 模型。Flash 模型的优势是速度快、成本低，适合快速迭代提示词；Pro 模型支持更高分辨率和更复杂的推理，适合最终输出。

**与 aspect_ratio 的配合**

`imageSize` 和 `aspect_ratio` 是两个独立的参数，可以自由组合。常用的组合包括：

    hljs python复制# 正方形 4K - 适合社交媒体头像、商品主图
    image_config=types.ImageConfig(aspect_ratio="1:1", image_size="4K")

    # 横版 4K - 适合视频封面、横幅广告
    image_config=types.ImageConfig(aspect_ratio="16:9", image_size="4K")

    # 竖版 4K - 适合手机壁纸、竖版海报
    image_config=types.ImageConfig(aspect_ratio="9:16", image_size="4K")

    # 超宽 4K - 适合电影海报、全景图
    image_config=types.ImageConfig(aspect_ratio="21:9", image_size="4K")

## 提示词工程：高质量 4K 图像的秘诀

4K 分辨率只是基础，要获得真正出色的图像效果，提示词的质量同样关键。Nano Banana Pro 的推理架构对提示词的理解方式与传统扩散模型有本质区别——它更像是在"理解一份设计简报"而非"匹配关键词标签"。

**从关键词堆砌到场景描述**

传统的 AI 绘图提示词往往是一堆标签的堆砌，例如"cat, cute, 4k, realistic, professional"。这种写法在 Stable Diffusion 等模型上有效，但在 Nano Banana Pro 上反而会降低效果。根据 Google 官方提示词指南，更好的做法是用自然语言描述完整的场景：

> "A fluffy orange tabby cat lounging on a vintage velvet armchair, warm afternoon sunlight streaming through sheer curtains, soft bokeh effect in the background, professional pet photography style"

这种描述方式让模型能够理解物体之间的空间关系（猫在椅子上）、光线条件（下午阳光）、视觉风格（专业宠物摄影），从而生成更协调的画面。

**提示词的黄金结构**

经过大量测试，以下结构能够稳定产出高质量结果：

1.  **主体**：具体描述对象，包括外观特征
2.  **环境**：场景设定，包括位置和周围元素
3.  **光线**：时间、光源方向、光线性质
4.  **风格**：整体美学，如摄影风格、艺术流派
5.  **技术参数**：分辨率、景深、镜头类型等

以产品摄影为例的完整提示词：

``` blog-inline-code
主体: A minimalist ceramic coffee mug with a matte white finish
环境: placed on a light oak wood table with soft shadows
光线: studio lighting from the upper left, creating subtle highlights on the rim
风格: commercial product photography, clean and professional
技术: shallow depth of field (f/2.8), 4K resolution, no reflections on the surface
```

**文字渲染的技巧**

Nano Banana Pro 的文字渲染能力是其核心优势之一。要获得清晰准确的文字，需要注意以下几点：

-   将需要渲染的文字用引号括起来，例如 `a poster with the text "SUMMER SALE 2025"`
-   明确指定文字的位置，例如 `centered at the top` 或 `in the bottom right corner`
-   限制单张图片中的文字元素数量，3-5 个为宜
-   使用标准字体描述，例如 `bold sans-serif font` 或 `elegant script typography`

**提示词长度的平衡**

根据 开发者指南的测试，30 词以内的提示词通常能获得更好的构图准确性。过长的提示词可能导致模型"迷失"在细节中，反而影响整体效果。建议的做法是：先用简洁提示词生成基础版本，然后通过对话式编辑（conversational editing）逐步调整细节，而不是一次性塞入所有要求。

## 4K vs 2K vs 1K 效果对比测试

分辨率的选择需要在质量、成本、速度之间权衡。为了直观展示三种分辨率的差异，我们使用同一提示词进行了对比测试。测试提示词为："A detailed macro shot of a butterfly wing with iridescent scales, nature photography"。

**视觉质量对比**

| 对比维度 | 1K (1024×1024) | 2K (2048×2048) | 4K (4096×4096) |
|----------|----------------|----------------|----------------|
| 边缘锐度 | 可见锯齿       | 基本平滑       | 完全平滑       |
| 细节层次 | 粗糙纹理       | 清晰纹理       | 微观细节可见   |
| 色彩过渡 | 轻微色带       | 自然过渡       | 无损过渡       |
| 放大表现 | 200% 即模糊    | 400% 可用      | 800% 仍清晰    |

在蝴蝶翅膀这个测试案例中，1K 图像只能看到大致的色彩分布，鳞片纹理呈现为模糊的色块；2K 图像可以看到单个鳞片的轮廓，但边缘不够锐利；4K 图像则能清晰呈现每个鳞片的微观结构，包括表面的细小纹路和光线折射产生的彩虹色效果。

**性能指标对比**

| 指标       | 1K     | 2K     | 4K      |
|------------|--------|--------|---------|
| 生成时间   | \~10秒 | \~12秒 | 15-20秒 |
| 文件大小   | 1-3MB  | 4-8MB  | 15-25MB |
| 官方价格   | $0.134 | $0.134 | $0.24   |
| Token 消耗 | 1120   | 1120   | 2000    |

从数据可以看出，2K 和 1K 在价格上完全相同，但 2K 的像素数是 1K 的 4 倍。这意味着在不追求极致 4K 的场景下，2K 是性价比最高的选择——用相同的成本获得 4 倍的像素量。只有在需要打印输出或超高清展示的场景，4K 的额外成本才值得投入。

**场景选择建议**

根据最终用途选择合适的分辨率：

-   **社交媒体配图**（微博、微信朋友圈）：1K 足够，平台会压缩图片
-   **文章插图、PPT 配图**：2K 性价比最优
-   **电商产品主图**：2K 或 4K，取决于是否需要放大查看细节
-   **印刷海报、展板**：必须 4K，确保打印质量
-   **4K/8K 显示器壁纸**：必须 4K，匹配屏幕分辨率

<img src="/docs/blog/zh/nano-banana-pro-4k-tutorial/img/content-img-1.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="Nano Banana Pro 1K vs 2K vs 4K 分辨率效果对比" />

## 成本分析与优化策略

4K 图像生成的成本是很多开发者关心的问题。根据 [Google 官方定价](https://ai.google.dev/gemini-api/docs/pricing)，单张 4K 图片的价格为 $0.24，如果每月生成 1000 张，成本将达到 $240。对于个人开发者和小型项目来说，这是一笔不小的开支。

**官方定价结构**

| 分辨率 | 实时 API  | Batch API (50% 折扣) |
|--------|-----------|----------------------|
| 1K     | $0.134/张 | $0.067/张            |
| 2K     | $0.134/张 | $0.067/张            |
| 4K     | $0.24/张  | $0.12/张             |

**策略一：分辨率分级工作流**

将工作流分为三个阶段，不同阶段使用不同分辨率：

1.  **创意探索阶段**：使用 1K 快速生成多个版本，测试不同提示词的效果
2.  **效果确认阶段**：选定方向后用 2K 预览最终效果
3.  **正式输出阶段**：确认满意后用 4K 生成最终成品

这种策略可以将总体成本降低 50-70%。假设一张最终图片需要经过 10 次迭代，传统做法全程使用 4K 需要 $2.4，而分级策略（8 次 1K + 1 次 2K + 1 次 4K）只需要 $1.45。

**策略二：批量处理 Batch API**

如果你的需求对时效性要求不高（可以接受 24 小时内完成），Batch API 是降低成本的利器。它的价格是实时 API 的 50%，4K 图片只需 $0.12/张。适合电商产品图批量生成、营销素材库建设等场景。

**策略三：使用 API 中转服务**

对于成本敏感的场景，[GPT88.ai](https://gpt88.cc) 提供 Nano Banana Pro 的中转服务，4K 生成价格为 $0.05/次（官方价格的 21%）。以生成 1000 张 4K 图片为例，官方成本 $240，中转服务仅需 $50，节省 $190。该服务采用按次计费模式，不按 token 消耗，成本更可预测。需要说明的是，中转服务依赖第三方稳定性，适合成本优先且能接受这一条件的场景；对数据安全有严格要求的企业建议使用官方 API。

**成本核对表**

以月生成 500 张 4K 图片为例，先用当前价格和订单规则建模：

| 方案           | 单价来源         | 月成本算法              | 需要额外核对               |
|----------------|------------------|-------------------------|----------------------------|
| 官方实时 API   | 官方定价页       | 500 × 当前4K单价        | 账号tier、失败计费         |
| 官方 Batch API | 官方Batch定价    | 500 × 当前Batch单价     | 交付延迟、批处理限制       |
| GPT88.ai 中转  | 当前控制台和订单 | 成功/失败请求按日志核算 | 模型覆盖、4K支持、重试扣费 |

## 国内开发者 4K 使用方案

国内开发者直连 Google API 可能面临网络不稳定、支付困难、延迟较高等问题。以下是几种经过验证的解决方案。

**方案一：API 中转服务**

[GPT88.ai](https://gpt88.cc) 提供 Nano Banana Pro 的国内优化服务，特点包括：

-   **接入验证**：注册后核对当前Banana系列模型、4K参数和接口格式
-   **付款核对**：以注册页、控制台和订单为准，不写死支付和起充规则
-   **质量验证**：用自己的10-50条真实提示词比较官方路线和网关路线
-   **账单透明度**：重点检查失败、超时、内容拦截和重试是否扣费

完整调用示例：

    hljs python复制import requests
    import base64

    API_KEY = "sk-YOUR_GPT88_KEY"  # 从 GPT88.ai 获取
    API_URL = "https://gpt88.cc/v1"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "contents": [{
            "parts": [{"text": "一只可爱的柴犬在樱花树下，日式插画风格，4K高清"}]
        }],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {
                "aspectRatio": "16:9",
                "imageSize": "4K"
            }
        }
    }

    response = requests.post(API_URL, headers=headers, json=payload, timeout=180)
    result = response.json()

    image_data = result["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]
    with open("shiba_4k.png", "wb") as f:
        f.write(base64.b64decode(image_data))

    print("4K 图片已保存")

你可以在 [images.GPT88.ai](https://gpt88.cc) 在线体验 4K 生成效果，无需编写代码即可直观感受输出质量。

**方案二：自建代理**

技术能力较强的开发者可以使用 Cloudflare Worker 或 Vercel 搭建反向代理。这种方式免费但需要自行维护，稳定性取决于部署质量。基本原理是将请求转发到 Google API 端点，规避直连网络问题。

**方案三：Vertex AI**

对于企业用户，Google Cloud 的 Vertex AI 提供更稳定的服务和 SLA 保障。需要创建 Google Cloud 项目、启用 Vertex AI API、配置服务账号，门槛较高但适合对稳定性有严格要求的生产环境。

**方案选择建议**

| 用户类型   | 推荐方案           | 理由                 |
|------------|--------------------|----------------------|
| 个人开发者 | API 中转服务       | 成本低、上手快       |
| 小型团队   | API 中转服务       | 性价比优，支持支付宝 |
| 技术爱好者 | 自建代理           | 免费、可控           |
| 企业用户   | Vertex AI 官方服务 | SLA 保障、合规性     |

## 常见问题与错误排查

在使用 Nano Banana Pro 生成 4K 图像的过程中，开发者经常会遇到一些技术问题。以下是最常见的错误及其解决方案。

**问题一：设置了 4K 但输出仍是 1K**

这是最常见的问题，通常由以下原因导致：

1.  **大小写错误**：使用了小写的 `"4k"` 而非大写的 `"4K"`
2.  **模型不支持**：使用了 `gemini-2.5-flash-image` 而非 `gemini-3-pro-image-preview`
3.  **账户限制**：Free tier 账户无法使用 4K，需要升级到 Blaze 计划

排查步骤：首先检查 `image_size` 参数的拼写，然后确认模型名称，最后在 Google Cloud Console 检查账户类型。

**问题二：503 "Model is overloaded" 错误**

4K 生成比低分辨率更容易触发这个错误，因为需要更多计算资源。根据 [Google 开发者论坛](https://discuss.ai.google.dev/)的反馈，这是高峰期的已知问题。

解决方案是实现指数退避重试：

    hljs python复制import time

    def generate_with_retry(client, prompt, config, max_retries=5):
        for attempt in range(max_retries):
            try:
                response = client.models.generate_content(
                    model="gemini-3-pro-image-preview",
                    contents=prompt,
                    config=config
                )
                return response
            except Exception as e:
                if "503" in str(e) or "overloaded" in str(e).lower():
                    wait_time = (2 ** attempt) + (attempt * 0.5)
                    print(f"模型过载，{wait_time:.1f}秒后重试 ({attempt + 1}/{max_retries})")
                    time.sleep(wait_time)
                else:
                    raise e
        raise Exception("达到最大重试次数")

**问题三：请求超时**

4K 生成通常需要 15-20 秒，复杂场景可能达到 30 秒以上。默认的超时设置可能不够。

解决方案：将超时时间设置为 180 秒（3 分钟），为复杂请求留足余量：

    hljs python复制# 使用 requests 库时
    response = requests.post(url, headers=headers, json=payload, timeout=180)

    # 使用官方 SDK 时，超时通常在客户端初始化时配置

**问题四：图片下载后分辨率变低**

有些开发者发现 API 返回的图片是 4K，但下载保存后分辨率变低了。这通常是因为：

1.  **网页预览压缩**：浏览器预览会压缩大图，应直接查看原文件
2.  **保存格式问题**：使用 JPEG 格式且压缩率过高
3.  **代码处理问题**：图片经过了中间处理被降采样

建议直接将 API 返回的 base64 数据写入文件，不经过中间处理：

    hljs python复制with open("output.png", "wb") as f:
        f.write(base64.b64decode(image_data))

**问题五：内容被安全过滤拒绝**

Nano Banana Pro 有严格的内容安全过滤，某些提示词可能被拒绝。常见的触发场景包括：涉及真实人物、医疗/法律建议、可能产生误导的内容等。

解决方案：调整提示词，避免使用敏感描述；使用虚构场景替代真实场景；对于必要的内容，考虑使用其他合规的生成方案。

**错误代码速查表**

| 错误代码 | 含义           | 解决方案                    |
|----------|----------------|-----------------------------|
| 400      | 请求参数错误   | 检查 JSON 格式和参数值      |
| 401      | API Key 无效   | 重新生成 API Key            |
| 403      | 权限不足       | 检查账户类型和 API 启用状态 |
| 429      | 请求频率超限   | 降低请求频率或升级配额      |
| 500      | 服务器内部错误 | 等待几秒后重试              |
| 503      | 服务过载       | 使用指数退避重试            |

## 进阶技巧与最佳实践

掌握基础的 4K 生成后，以下进阶技巧可以帮助你进一步提升输出质量和效率。

**技巧一：两步工作流优化成本**

先用 1K 快速生成多个变体，选择最满意的一个，然后用相同提示词生成 4K 版本。由于模型有一定随机性，4K 版本不会与 1K 完全相同，但整体风格和构图会保持一致。这种方法可以在不牺牲最终质量的前提下将迭代成本降低 80%。

**技巧二：利用思考模式提升复杂场景质量**

Nano Banana Pro 支持"思考模式"（thinking），让模型在生成前进行更深入的推理。对于复杂的信息图表、技术图解等场景特别有用：

    hljs python复制config = types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE'],
        image_config=types.ImageConfig(
            aspect_ratio="16:9",
            image_size="4K"
        ),
        thinking_config=types.ThinkingConfig(
            include_thoughts=True
        )
    )

启用思考模式后，模型会先输出推理过程，然后生成更精确的图像。代价是生成时间会增加 30-50%。

**技巧三：参考图像保持角色一致性**

如果你需要在多张图片中保持同一角色的外观一致，可以使用参考图像功能。Nano Banana Pro 支持最多 14 张参考图，并能保持最多 5 个人物的面部一致性：

    hljs python复制contents = [
        types.Part.from_image(types.Image.from_file("reference_character.png")),
        types.Part.from_text("The same character in a different scene, walking in a park at sunset")
    ]

这个功能对于漫画创作、品牌吉祥物系列图、产品代言人形象等场景非常有价值。

**技巧四：输出格式选择**

Nano Banana Pro 支持 PNG、JPEG、WebP 三种输出格式：

-   **PNG**：无损压缩，适合文字渲染、UI 设计、需要透明背景的场景
-   **JPEG**：有损压缩，文件更小，适合照片类图像
-   **WebP**：现代格式，兼顾质量和大小，适合网页使用

对于 4K 图像，PNG 文件可能达到 20MB 以上，而 JPEG 可以压缩到 5MB 左右。根据使用场景选择合适的格式。

**技巧五：批量生成的并发控制**

如果需要批量生成大量 4K 图片，建议控制并发数量，避免触发 429 限流错误：

    hljs python复制import asyncio
    from concurrent.futures import ThreadPoolExecutor

    async def batch_generate(prompts, max_concurrent=3):
        semaphore = asyncio.Semaphore(max_concurrent)

        async def generate_one(prompt):
            async with semaphore:
                # 调用生成函数
                return await generate_4k(prompt)

        tasks = [generate_one(p) for p in prompts]
        return await asyncio.gather(*tasks)

对于 Free tier 账户，建议并发数不超过 2；Blaze 账户可以适当提高到 5-10。

<img src="/docs/blog/zh/nano-banana-pro-4k-tutorial/img/content-img-2.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="Nano Banana Pro 4K 生成完整工作流程图" />

## 总结

Nano Banana Pro 的 4K 生成能力为 AI 图像生成开辟了新的应用空间——从社交媒体配图扩展到印刷海报、商业广告、高清展示等专业场景。本教程覆盖了从入门到进阶的完整知识体系：

**核心要点回顾**：

1.  **环境配置**：Python 3.11+、`google-genai` SDK、Blaze 计划账户
2.  **关键参数**：`image_size="4K"`（必须大写）、`model="gemini-3-pro-image-preview"`
3.  **提示词技巧**：自然语言描述优于关键词堆砌，控制在 30 词以内效果更稳定
4.  **成本优化**：分辨率分级工作流可节省 50-70% 成本，Batch API 半价
5.  **国内方案**：[GPT88.ai](https://gpt88.cc) 中转服务 $0.05/次，支持支付宝
6.  **错误处理**：503 错误使用指数退避重试，超时设置 180 秒

从实际应用角度，2K 是大多数场景下性价比最高的选择——与 1K 同价但像素量翻 4 倍。只有在需要打印输出或超高清展示时，4K 的额外投入才真正物有所值。

对于希望快速上手的读者，建议从本文的完整代码示例开始，先用 1K 验证提示词效果，确认满意后再切换到目标分辨率。如果成本是主要考量因素，分辨率分级工作流和 API 中转服务可以显著降低总体开支。

更多 Nano Banana Pro 使用技巧，可以参考我们的相关教程：

-   [Nano Banana Pro 提示词优化指南](/docs/blog/nano-banana-pro-prompts-guide)
-   [Nano Banana Pro API 完整文档解析](/docs/blog/nano-banana-pro-4k-tutorial)
-   [Nano Banana Pro 与 FLUX.2 对比评测](/en/docs/blog/gemini-3-pro-image-preview-comparison-guide)
