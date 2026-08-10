---
title: GPT Image 2 怎么生成 4K 图片：尺寸规则、API 代码与验收方法
description: 用 GPT Image 2 请求 3840x2160 或 2160x3840 图片，理解四条尺寸校验规则、高于 2560x1440 的实验性 4K、Image API 与 Responses API 的区别，并验证保存文件和 CDN 成品，含本地校验、解码验尺寸与按层排查代码。
date: 2026-07-22
category: 技术教程
tags: [GPT Image 2, OpenAI API, Image API, 4K 图像生成, AI 图片工作流]
readTime: 13
relatedPath: /docs/api/images/
relatedTitle: 图片生成 API
---

GPT Image 2 可以通过 API 直接请求 `3840x2160` 横图或 `2160x3840` 竖图，但这不等于"任意 4K 尺寸都支持"，也不等于一次返回成功就已经达到生产标准。最容易踩坑的地方有两个：`4096x2160` 虽然也常被叫作 4K，却超过了模型的 `3840px` 长边上限；而所有高于 `2560x1440` 的输出，目前都要按**实验性尺寸**处理。

正确做法是把"4K"拆成三件可以验证的事：请求中的 `size` 是否有效，解码后的原始文件是否真的等于目标像素，CMS 或 CDN 交付的版本有没有被缩放、裁切或重新压缩。提示词里的"高清""4K 质感"只描述画面意图，不能替代 `size` 参数。

如果只想直接生成或编辑图片，用 Image API；如果生图是对话、代理或多工具流程的一步，用 Responses API。`gpt-image-2` 是 API 模型 ID，当前快照是 `gpt-image-2-2026-04-21`；它和 ChatGPT 里的 Images 2.0 是两种产品合同，套餐次数、界面比例和 API 计费不能互相推导。

## 先用四条规则判断尺寸是否合法

GPT Image 2 的自定义 `WIDTHxHEIGHT` 必须同时满足以下条件：

1. 最长一边不超过 `3840px`；
2. 宽和高都能被 `16` 整除；
3. 长边与短边之比不超过 `3:1`；
4. 总像素位于 `655,360` 到 `8,294,400` 之间。

四条缺一不可。常见视频分辨率也不一定能直接照搬：`1920x1080` 的高度 1080 不能被 16 整除，因此不是有效的自定义尺寸；可以按版式需要改成 `1920x1088`，但这已经不是标准 16:9。反过来，`1024x640` 恰好位于最低总像素边界，并且两边都是 16 的倍数，是有效尺寸。

| 尺寸 | 结论 | 关键原因 |
| --- | --- | --- |
| `3840x2160` | 有效，实验性 | 四条规则都通过，且总像素正好达到上限 |
| `2160x3840` | 有效，实验性 | 竖向 4K，仍需验证保存文件 |
| `4096x2160` | 无效 | 长边超过 `3840px` |
| `3840x1200` | 无效 | 比例为 `3.2:1`，超过上限 |
| `3840x1280` | 有效，实验性 | 比例正好 `3:1`，总像素也在范围内 |
| `1920x1080` | 无效 | 1080 不是 16 的倍数 |
| `1024x640` | 有效 | 总像素正好为 `655,360` |

可以在发请求之前先做本地校验。这样批量队列不会把同一个无效尺寸重复提交，也能给编辑或设计同事一个明确原因。

```js
function validateGptImage2Size(width, height) {
  const longEdge = Math.max(width, height);
  const shortEdge = Math.min(width, height);
  const pixels = width * height;

  const checks = {
    edge: longEdge <= 3840,
    multiplesOf16: width % 16 === 0 && height % 16 === 0,
    aspectRatio: longEdge / shortEdge <= 3,
    pixelCount: pixels >= 655_360 && pixels <= 8_294_400,
  };

  return { valid: Object.values(checks).every(Boolean), checks };
}
```

这里的"宽高比"和"像素尺寸"也不能混为一谈。`16:9` 只描述画布形状，`3840x2160` 才是具体像素合同；后期把 `1920x1080` 放大到 `3840x2160`，得到的是放大后的 4K 文件，不是一次 API 原生请求产生的 4K。对外交付时应写清最终像素由哪条路线得到。

## 为什么合法的 4K 仍要标记为实验性

[OpenAI 图像生成指南](https://developers.openai.com/api/docs/guides/image-generation)把高于 `2560x1440` 的 GPT Image 2 分辨率标为 experimental。这个限定不表示 `3840x2160` 不能请求，而是提醒你不要把参数校验通过当成稳定性保证。

生产验收至少还要看四件事：

- API 是否真正返回最终图片，而不是只拿到中间事件或错误重试；
- 保存后的原始文件是否保持请求宽高和预期格式；
- 图片中的文字、边缘、人物特征和构图是否达到业务要求；
- 上传到 CMS、对象存储或 CDN 后，用户实际访问的版本是否仍满足尺寸合同。

因此，`quality: "high"` 和 4K 也不是同义词。`quality` 可选 `low`、`medium`、`high`、`auto`，默认是 `auto`；它控制渲染投入，不保证文字一定正确、主体一定一致或像素一定保留。探索阶段先用较小尺寸和 `medium` 锁定构图，最终交付再切换到合法 4K，通常比每个草稿都直接跑 4K 更容易控制账单和返工。

## Image API：直接生成 4K 的最短路线

单次文生图或图片编辑优先使用 Image API。模型、尺寸、质量和输出格式都在一次请求中明确给出，返回的图像数据再由应用解码保存。

```js
import OpenAI from "openai";
import { writeFile } from "node:fs/promises";

const openai = new OpenAI();

const result = await openai.images.generate({
  model: "gpt-image-2",
  prompt: [
    "为中文开发者大会生成横向主视觉",
    "深蓝背景，中心是一枚发光的抽象芯片",
    "左侧预留标题区，不要生成任何文字",
  ].join("。"),
  size: "3840x2160",
  quality: "high",
  output_format: "png",
});

const base64 = result.data?.[0]?.b64_json;
if (!base64) throw new Error("响应中没有最终图像数据");

await writeFile("conference-hero.png", Buffer.from(base64, "base64"));
```

GPT Image 模型通过 Image API 返回 base64 编码的数据，而不是一个可以长期依赖的图片 URL。PNG 是默认格式，也可以选择 JPEG 或 WebP；`output_compression` 只用于 JPEG 和 WebP，范围是 `0-100`。如果你改用压缩格式，仍要在解码后检查真实格式和宽高，不能只相信文件扩展名。

编辑请求可以带一张或多张参考图，也可以带蒙版。多图编辑时蒙版作用于第一张输入图；图像与蒙版要保持相同格式和尺寸，蒙版需要 alpha 通道。蒙版形状是引导，不是保证像素级严格贴边。对 `gpt-image-2` 不要添加 `input_fidelity`，其图片输入会自动按高保真路径处理。

> 通过 GPT88 统一网关调用时，把 OpenAI SDK 的 `baseURL` 配置为 `https://gpt88.cc/v1`，并把 API Key 换成在 https://gpt88.cc 控制台创建的 `YOUR_GPT88_API_KEY`。模型 ID `gpt-image-2` 与请求参数不变。

## Responses API：生图属于多步流程时再用

Responses API 适合这样的应用：用户先给商品资料，主线模型整理卖点、决定是否需要图片，然后调用图像工具，最后再输出文案和注意事项。这里的 `model` 是支持图像工具的**主线模型**，图像工具自己管理 GPT Image 模型选择。

```js
import OpenAI from "openai";
import { writeFile } from "node:fs/promises";

const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-5.6",
  input: "生成一张 3840x2160 的新品发布横幅，画面不要出现文字，并给出三条投放注意事项。",
  tools: [{
    type: "image_generation",
    size: "3840x2160",
    quality: "high",
  }],
});

const call = response.output.find(
  (item) => item.type === "image_generation_call"
);
if (!call?.result) throw new Error("没有收到最终图像工具结果");

await writeFile("launch-banner.png", Buffer.from(call.result, "base64"));
```

不要写成 `tools: [{ type: "image_generation", model: "gpt-image-2" }]`。当前官方合同明确区分主线模型和图像工具的模型选择，这个工具参数并不是用来强行指定 `gpt-image-2` 的。Responses API 还会产生主线模型的文本 token 使用量，因此它不是"换一个端点、价格完全不变"的 Image API 替代品。

如果只是 prompt 到图片，Responses API 反而增加了日志和排错层：主线模型可能没有调用工具，工具可能失败，base64 可能没有保存，前端也可能只渲染缩略图。只有在多轮编辑、对话上下文或多工具编排确实能减少用户步骤时，才值得引入它。

## 保存、解码、验尺寸：把 API 成功变成可交付文件

最小验收不能停在 HTTP 200。下面用 `sharp` 读取已经保存的文件，检查格式和像素；如果业务不使用 `sharp`，也可以替换为现有图片元数据工具，关键是检查解码结果而不是文件名。

```js
import sharp from "sharp";

async function assertImage(path, expected) {
  const meta = await sharp(path).metadata();

  if (!meta.width || !meta.height || !meta.format) {
    throw new Error(`无法解码图片元数据: ${path}`);
  }
  if (meta.width !== expected.width || meta.height !== expected.height) {
    throw new Error(
      `尺寸不合格：期望 ${expected.width}x${expected.height}，` +
      `实际 ${meta.width}x${meta.height}`
    );
  }
  if (meta.format !== expected.format) {
    throw new Error(`格式不合格：期望 ${expected.format}，实际 ${meta.format}`);
  }

  return meta;
}

await assertImage("conference-hero.png", {
  width: 3840,
  height: 2160,
  format: "png",
});
```

如果网页还会生成 WebP、`srcset` 或社交分享裁切图，再对最终公开 URL 下载一次并执行相同检查。原图合格但用户看到的版本不合格，问题通常在上传转换、响应式图片选择、CDN 参数或前端容器裁切，不应该靠重写 prompt 修复。

建议为每次生产任务记录：请求 ID、时间、模型 ID、`size`、`quality`、输出格式、原文件路径、原文件宽高、交付 URL 和交付文件宽高。不要记录 API key，也不要把完整用户素材或敏感提示词写进普通日志。

## 原生 4K 还是 2K 后期放大

"最终文件是 4K"与"模型一次生成原生 4K"是两种交付说明。选择哪条路线，取决于返工成本，而不是哪个说法听起来更高级。

| 任务情况 | 更合适的起点 | 验收重点 |
| --- | --- | --- |
| 广告位或大屏明确要求 `3840x2160` 原文件 | Image API 直接请求 4K | 解码后像素必须完全一致 |
| 创意未定，需要快速比较多版构图 | 1K/2K 草稿，定稿后再生成 4K | 不要把草稿放大冒充原生请求 |
| 画面有大量小字、UI 或精细标识 | 先减少图中文字并锁定版式 | 尺寸正确也要人工检查文字 |
| 已有合格 2K 资产，只缺交付像素 | 使用受控放大流程 | 标记为 upscaled，并复核边缘与文字 |
| 4K 请求不稳定或预算不明确 | 小尺寸 smoke test 后再放量 | 先确认访问权限和计费证据 |

放大并不是自动降级方案。有时 2K 母版的主体和文字更稳定，受控放大后的成品反而比反复重抽 4K 更可用；但你必须在资产记录中保留"先生成、后放大"的事实，不能写成模型直接返回了这些最终像素。

## 价格、免费层与账号限制不能从 ChatGPT 套餐推断

GPT Image 2 的官方 API 不是一个固定的"每张 4K 多少钱"合同。按 2026 年 7 月 22 日核对的[官方价格页](https://developers.openai.com/api/docs/pricing#image-generation)，标准价格按每百万 token 计算：图片输入 `$8.00`、缓存图片输入 `$2.00`、图片输出 `$30.00`、文本输入 `$5.00`、缓存文本输入 `$1.25`。Batch 费率更低；编辑请求还要计算输入图片，Responses API 还要计算主线模型用量。

官方指南给出的按张示例集中在 `1024x1024`、`1024x1536` 和 `1536x1024` 等指定尺寸与质量组合，不能外推成一个通用 4K 单价。对 `3840x2160` 的实际预算，应使用当前官方计算器，并以组织账单记录校准。

访问权限同样属于账号合同。API Free usage tier 当前不支持 `gpt-image-2`；[模型页](https://developers.openai.com/api/docs/models/gpt-image-2)列出的 Tier 1-5 速率是 `5 / 20 / 50 / 150 / 250 IPM`，同时还有模型特定 TPM 限制。组织验证可能是前置条件，真正控制你能否调用和能跑多快的是当前组织、项目和 Limits 页面，而不是文章里的数字。

另一方面，[ChatGPT Images 2.0](https://help.openai.com/zh-hans-cn/articles/11084440-chatgpt-images-faq)当前面向所有 ChatGPT 套餐，并可在 Web、iOS 和 Android 使用。这只能说明消费端可访问，不能证明你有免费 API token、能在界面里精确指定 `3840x2160`、拥有 API 的 IPM，或适用 API token 计费。

中文资料里常把早期的"GPT-4o 生图"、ChatGPT 图片功能和 `gpt-image-2` 写成同一个入口。对开发者最安全的识别方式是看请求：Image API 中显式的模型 ID 才是 `gpt-image-2`；ChatGPT 界面中选择比例、要求"4K"或下载图片，不会自动变成 API 的尺寸与计费证据。若通过 GPT88 接入，实际扣费按官方用量 × 所选分组倍率，具体价格与配额以 gpt88.cc 控制台为准。

## 4K 请求失败时，按层排查

### 1. 请求还没发出或直接返回参数错误

先输出四项本地校验结果，不要只记一句"4K failed"。检查是否写成 `4096x2160`、是否有一边不能被 16 整除、比例是否超过 3:1、总像素是否越界。再确认实际请求体中的 `size`，而不是检查 prompt 有没有"4K"。

### 2. 参数合法，但账号没有访问权限

用较小的合法尺寸做一次 smoke test，并检查同一组织与项目的模型访问、验证状态和 Limits 页面。不要根据 ChatGPT 可以生图就判断 API key 一定有权限，也不要在权限不清时直接启动批量 4K 队列。

### 3. API 返回成功，但保存文件尺寸不对

确认读取的是最终 base64，而不是流式过程中的 partial image；检查解码是否完整、文件是否被同名覆盖。随后测量原文件。原文件已不符合请求尺寸时停止交付，并保留请求 ID 供排查。

### 4. 原文件正确，网页或下载版本错误

比较对象存储原件、CDN URL、HTML `srcset` 实际命中的资源和下载文件。最常见的是 CMS 自动生成衍生图、CDN 追加宽度参数或前端下载按钮指向缩略图。

### 5. 像素正确，但视觉质量不合格

这是内容验收，不是尺寸故障。减少图片里的文字数量，明确主体与留白，固定需要保留的参考元素，再决定提高 `quality`、重新编辑，还是回到 2K 母版路线。不要用"尺寸正确"替代人工预览。

## FAQ

### GPT Image 2 支持原生 4K 吗？

可以通过 Image API 请求 `3840x2160` 或 `2160x3840`，并在返回后得到符合该像素合同的原文件；但高于 `2560x1440` 的尺寸目前属于实验性范围，必须解码、测量和人工验图。若最终像素来自后期放大，应明确标记为 upscaled，而不是原生请求。

### 为什么 `4096x2160` 不能直接用？

因为 GPT Image 2 的最长边不能超过 `3840px`。行业里"4K"有多种常见尺寸名称，但 API 只认具体数字和当前校验规则。

### 只在提示词里写"4K 高清"有用吗？

它可以影响画面意图和细节描述，不能控制文件像素。要精确尺寸必须设置 `size`，保存后再读取真实宽高。

### `1920x1080` 为什么也可能报尺寸错误？

自定义宽高都必须是 16 的倍数，而 1080 不能被 16 整除。常见显示分辨率不自动等于有效 API 尺寸。

### Image API 和 Responses API 应该选哪个？

单次生成或编辑用 Image API，链路短且容易验收；多轮对话、代理或多工具编排用 Responses API。Responses 中应选择支持图像工具的主线模型，不要给图像工具硬塞 `model: "gpt-image-2"`。

### GPT Image 2 4K 有固定的官方单张价格吗？

没有一个适用于所有 4K 尺寸、质量和请求形态的固定单价。应按当前图片输入、图片输出、文本输入、质量、编辑输入和主线模型用量估算，并用实际账单校准。

### ChatGPT 免费用户能生图，是否说明 GPT Image 2 API 免费？

不能。ChatGPT Images 是消费端权益，API 有独立的访问层级、组织验证、速率限制和 token 账单。两边都可能使用相关图像能力，但合同不能互换。

### API 返回 200 后还要检查什么？

至少检查 base64 能否完整解码、原始文件的宽高与格式、人工视觉质量，以及 CMS/CDN 最终交付版本。任一层不符合要求，都不能把资产标记为已验收 4K。
