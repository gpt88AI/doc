---
title: Imagen 4 vs Nano Banana：2026 年 Imagen 退役前该选哪条路线
description: 用当前模型 ID、Firebase 与 Gemini API 退役日期、工作负载、价格边界和同提示词测试，判断 Imagen 4、Nano Banana 2 与 Nano Banana Pro 该怎么选。
date: 2026-06-21
category: Gemini专题
tags: [Imagen 4, Nano Banana 2, Nano Banana Pro, Gemini 图像, AI 图像模型]
readTime: 8
relatedPath: /docs/api/images/
relatedTitle: GPT88 图片生成 API
---

新做 Google 图像项目时，不要把 Imagen 4 和 Nano Banana 当成一场永远有效的质量比赛。2026 年的安全路线是：先用 Nano Banana 2 做默认测试；如果文字、复杂排版、参考图一致性、4K 成片或审稿成本很高，再把 Nano Banana Pro 加进测试；Imagen 4 只适合作为旧流程、短期对照或已经核验入口状态的例外。

| 路线            | 当前角色                           | 先用它的条件                                                                    | 先不要用它的条件                                            |
|-----------------|------------------------------------|---------------------------------------------------------------------------------|-------------------------------------------------------------|
| Nano Banana 2   | 当前 Google 图像工作的默认测试路线 | 需要快速出多版、做编辑、跑草稿、控制成本，且允许少量重试。                      | 同一组提示词在文字、排版、参考图或 4K 审稿上连续失败。      |
| Nano Banana Pro | 高精度和高审稿成本的升级路线       | 图里有密集文字、复杂布局、品牌参考、多人/多物一致性、本地化文字或最终 4K 交付。 | Nano Banana 2 已经用可接受重试次数通过同一组提示词。        |
| Imagen 4        | 退役窗口里的旧流程或短期例外       | 旧代码、旧评测或特定写实任务仍依赖 Imagen，并且入口状态已核验。                 | 新项目、新 SDK 示例、新提示词库或无法确认具体入口退役日期。 |

停止规则也要写在前面：不要因为某个样张更好看就切换生产路线。先把公开名称映射到当前模型 ID，再按 Firebase、Gemini API、Vertex、AI Studio 或包装服务的具体入口核验状态，最后用同一组提示词比较可接受输出成本。

这一步尤其适合团队评审：把“看起来更好”拆成可复查的三件事，分别是入口今天是否仍然可用、同一组提示词在目标尺寸和语言里能否稳定复现、以及失败重试后总成本是否还能接受。只要其中一项没有记录，模型选择就还停留在观感层面，不应该进入新项目默认配置；这也是迁移前最容易漏掉的风险。

## 先把名字映射到当前模型 ID

“Nano Banana”在中文讨论里很方便，但写代码、算价格和判断退役时不能只写这个简称。当前需要分成两条路线：Nano Banana 2 对应 Gemini API 中的 gemini-3.1-flash-image；Nano Banana Pro 对应 gemini-3-pro-image；Imagen 4 则是另一组 Imagen 端点，包括 imagen-4.0-generate-001、imagen-4.0-fast-generate-001 和 imagen-4.0-ultra-generate-001。

<img src="/docs/blog/zh/nano-banana-pro-vs-nano-banana-2-vs-imagen-4/img/model-id-map-20260621.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="Nano Banana 2、Nano Banana Pro 和 Imagen 4 的模型 ID 与生命周期映射" />

这个映射要先于任何质量判断。很多旧教程、provider 面板或复制来的代码还会出现 gemini-3-pro-image-preview、gemini-3.1-flash-image-preview，或者 Imagen 专属的生成方法。遇到这些字符串时，先把它们当作迁移问题，而不是把报错或输出差异直接解释成模型能力差异。

| 中文常见说法     | 当前要核验的 ID                        | 归属                  | 实际用途                                                   |
|------------------|----------------------------------------|-----------------------|------------------------------------------------------------|
| Nano Banana 2    | gemini-3.1-flash-image                 | Gemini API 当前模型行 | 大多数新 Google 图像生成和编辑工作的第一条测试路线。       |
| Nano Banana Pro  | gemini-3-pro-image                     | Gemini API 当前模型行 | 文字、复杂布局、参考图、事实上下文和高价值成片的升级路线。 |
| Imagen 4         | imagen-4.0-generate-001 / fast / ultra | Imagen 端点族         | 只适合旧流程、短期对照和已核验入口状态的例外。             |
| preview 旧字符串 | 带 preview 的旧 ID                     | 迁移清理              | 不要作为新项目默认，除非你的入口今天仍明确要求。           |

如果只在 Google 图像路线内部比较 Flash 和 Pro，可以继续看 [Nano Banana 2 vs Nano Banana Pro](/docs/blog/gemini-3-pro-image-vs-gemini-3-1-flash-image)。这里的问题更复杂，因为 Imagen 4 的退役日期、迁移方式和价格边界会改变决策。

## 退役日期必须按入口分开看

Imagen 4 已经是退役窗口里的路线，难点在于官方入口给出的日期并不完全一致。2026 年 6 月 21 日核验时，Firebase AI Logic 的 Imagen migration 页面写明所有 Imagen 模型在 2026 年 6 月 24 日关闭；Firebase supported models 页面也重复了同样警告，并要求迁移到 Gemini Image，也就是 Nano Banana 路线。

Gemini API 的文档给出的是另一组日期。Gemini API image generation guide、Imagen guide、pricing 页面和 deprecations 页面都把 Imagen 4 端点的关闭时间列为 2026 年 8 月 17 日，并且在 deprecations 页面把 gemini-3.1-flash-image 作为 Imagen 4 端点的推荐替代。

| 你正在用的入口                           | 日期应该怎么写                           | 该做什么                                                        |
|------------------------------------------|------------------------------------------|-----------------------------------------------------------------|
| Firebase AI Logic                        | 把 2026-06-24 当作紧急迁移边界。         | 立即把 Imagen 依赖转到 Nano Banana 路线，并复查 Firebase 示例。 |
| Gemini Developer API 的 Imagen 端点      | 把 2026-08-17 写成 Gemini API 端点日期。 | 现在开始迁移计划，不要把它写成所有入口通用日期。                |
| Vertex、AI Studio、Gemini App 或包装服务 | 不能直接套用上面任一日期。               | 查具体入口的当前文档，再决定是否继续保留 Imagen。               |

这就是为什么“Imagen 4 vs Nano Banana”不能只回答谁画得更真实。Imagen 4 也许仍能作为短期对照或旧流程维护对象，但新代码、新提示词库、新客户流程和新评测基线不应该从 Imagen 4 开始。

## 多数新工作先试 Nano Banana 2

Nano Banana 2 是默认测试路线，不是因为它永远“便宜且弱”，而是因为大多数图像工作本来就需要迭代。社媒图、商品场景草稿、内部 campaign 板、图像编辑、目录刷新、提示词调试和批量变体，通常先看能否快速到达可接受输出，而不是一开始就买最高精度。

| 工作信号             | 为什么先试 Nano Banana 2                                     |
|----------------------|--------------------------------------------------------------|
| 预期会出很多版本     | 重试和变体本来就是流程的一部分，速度和单次成本会累积。       |
| 只是内部评审或草稿   | 小问题可以重跑或人工微调，不一定需要 Pro 的第一版质量。      |
| 文字很少或没有文字   | Pro 的文字和布局优势可能不会改变最终接受率。                 |
| 参考图只需要大体一致 | 概念图、 mood board 和早期方案往往不需要像最终广告那样严格。 |
| 4K 不是风险核心      | 支持高分辨率不等于每个 4K 项目都必须先上 Pro。               |

这里真正要算的是“可接受输出成本”。如果 Nano Banana 2 两次就过审，它可能比 Pro 更适合生产；如果它连续五次都要人工修字、修布局或修参考图，那么看似低价的路线会因为返工变贵。

## 什么时候升级到 Nano Banana Pro

Nano Banana Pro 是高失败成本路线。Google 对 Gemini 3 Pro Image / Nano Banana Pro 的介绍强调更强的推理、文字渲染、多语言与本地化、参考控制、创意控制以及 2K/4K 输出。这些优势不是奖杯，而是当失败代价高时才有意义的工具。

<img src="/docs/blog/zh/nano-banana-pro-vs-nano-banana-2-vs-imagen-4/img/workload-matrix-20260621.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="Google 图像任务中 Nano Banana 2、Nano Banana Pro 和 Imagen 4 的工作负载矩阵" />

| 失败模式       | 为什么 Pro 可能更划算                                   |
|----------------|---------------------------------------------------------|
| 密集文字出错   | 一个错别字、错位标签或层级混乱就会让整张图作废。        |
| 复杂排版漂移   | 信息图、UI 板、包装、PPT 风格图和菜单图都需要结构稳定。 |
| 参考图身份变形 | 商品形状、材质、人物姿态、品牌轮廓和背景限制需要更稳。  |
| 4K 是最终交付  | 外部评审、客户审稿和精修时间可能比模型差价更贵。        |
| 多语言图中文字 | 翻译、换行、字体和本地排版都容易制造高成本返工。        |

升级也要有证据。不要因为 Pro 这个名字更强就默认上 Pro；也不要因为 Nano Banana 2 单次价格低就忽略返工。先跑同一组提示词，记录每张图的失败原因和清理时间，确认 Pro 确实减少不可接受输出，再把它放进生产默认。

## Imagen 4 只适合作为旧流程或短期例外

Imagen 4 现在应该被当成生命周期受控的分支。它可以继续服务三类情况：旧代码还没迁完、旧评测需要一个短期基线、或某个写实 prompt 在 Imagen 上表现特别稳定而你必须证明 Nano Banana 能不能替代。但这些情况都不是新项目默认路线。

保留 Imagen 4 前，至少检查四件事：

| 检查项       | 通过条件                                                                        |
|--------------|---------------------------------------------------------------------------------|
| 入口状态     | 你正在用的 Firebase、Gemini API、Vertex、AI Studio 或服务商入口今天仍写明可用。 |
| 时间范围     | 工作会在对应关闭日期前结束，或者已经有 Nano Banana 回滚方案。                   |
| 工作负载理由 | Imagen 解决的是一个 Nano Banana 2 或 Pro 暂时没有通过的具体问题。               |
| 迁移包       | prompt、参考图、验收标准、日志和示例都能转到 Nano Banana 路线。                 |

任何一项不通过，都应该把 Imagen 当作迁移材料，而不是下一条增长路线。遇到 preview 旧代码时，可用 [Gemini 3.1 Flash Image preview API](/docs/blog/gemini-3-1-flash-image-preview-api) 做清理参考，不要继续把旧字符串写进新文档或 SDK 示例。

## 迁移时不只是替换模型名

从 Imagen 4 转到 Nano Banana，不是把字符串替换成 gemini-3.1-flash-image 就结束。Gemini API 的迁移方向涉及 generate_content、response parts、图像输出解析、错误日志、重试策略和安全审查。旧 Imagen 请求如果还在使用专属生成方法或专属 response object，必须先改请求形状再比较输出质量。

| 迁移项       | 要做的事                                                              |
|--------------|-----------------------------------------------------------------------|
| 模型 ID      | 把 Imagen 端点换成你决定测试的 Nano Banana 2 或 Pro 当前 ID。         |
| API 方法     | 按目标入口迁移到 Gemini 内容生成方式，而不是保留 Imagen 专属调用。    |
| 响应解析     | 从 Gemini response parts 中取图像结果，不要沿用 Imagen 专属对象假设。 |
| 测试 harness | prompt、参考图、尺寸、语言、验收标准都要在新路线重跑。                |
| 错误日志     | 把退役/访问错误和图像质量拒绝原因分开记录。                           |
| 文档示例     | 删除旧 preview ID 和 Imagen 专属请求片段。                            |

最容易出错的是用旧 Imagen prompt、旧解析器或旧 preview ID 去测试 Nano Banana，然后把失败归因给模型。先把接入形状变成当前路线，再调 prompt，再比较验收率。

## 价格和免费说法必须标注归属

价格信息有用，但不能替代路线判断。2026 年 6 月 21 日核验时，Gemini API pricing 页面列出了 gemini-3.1-flash-image、gemini-3-pro-image 和 Imagen 4 相关的付费图像行；这些行不是 Free Tier 行。它们也不能自动解释 Gemini App、AI Studio、Vertex、Firebase 或包装服务的额度。

| 说法                    | 安全写法                                                         |
|-------------------------|------------------------------------------------------------------|
| 官方 API 价格           | 写明日期、模型 ID、Standard/Batch/Flex 等归属。                  |
| 免费 API                | 不要把 API key 当成免费图像额度；当前图像行不是 Free Tier。      |
| Gemini App 或 AI Studio | 视为另一个入口，不能直接套用 API 价格表。                        |
| 服务商价格              | 只有当前核验过服务商条款、计费、失败扣费和隐私边界，才可单独写。 |
| 哪条最便宜              | 比较可接受输出成本，而不是比较某一张图的单价。                   |

如果问题已经变成 OpenAI 与 Google 路线选择，可以看 [GPT Image 2 vs Nano Banana Pro](/docs/blog/gpt-image-2-vs-nano-banana-pro)。如果仍在 Google 内部做选择，就先把官方价格归属和工作负载证明分开。

## 切换前跑同一组提示词

真正可靠的比较必须让三条路线面对同一组任务。不要只挑一张 Imagen 4 或 Nano Banana Pro 的漂亮样张。把 prompt、参考图、比例、目标尺寸、语言、验收标准和重试次数固定下来，再比较 Nano Banana 2、Nano Banana Pro 和剩余 Imagen 例外。

<img src="/docs/blog/zh/nano-banana-pro-vs-nano-banana-2-vs-imagen-4/img/proof-checklist-20260621.webp" class="blog-content-image cursor-zoom-in transition-opacity group-hover:opacity-90" loading="lazy" alt="公平测试 Nano Banana 2、Nano Banana Pro 和 Imagen 4 的同提示词检查清单" />

至少准备六组 prompt：

| Prompt 组        | 暴露的问题                                                 |
|------------------|------------------------------------------------------------|
| 密集文字板       | 错别字、标点、层级、重复词、中文/多语言换行。              |
| 商品图           | 材质、灯光、身份、一致性和品牌安全细节。                   |
| 参考图编辑       | 是否保留原图对象，同时完成编辑指令。                       |
| 图表或 UI 板     | 布局、分组、标注、视觉顺序和信息密度。                     |
| 4K 主视觉        | 放大细节、瑕疵、裁切余量和最终交付风险。                   |
| 旧 Imagen prompt | 旧流程能否迁移到 Nano Banana，而不是只证明旧模型还能出图。 |

记录每次生成、每次拒绝、每次清理和最终接受原因。Nano Banana 2 通过，就别急着升 Pro；Pro 明显降低拒稿和返工，就升级；Imagen 4 只赢一个窄 prompt 但生命周期检查不过，就把这条结果当作迁移证据，而不是继续开新依赖。

## 常见问题

### Imagen 4 比 Nano Banana 更好吗？

不能作为当前默认结论。Imagen 4 可能在旧写实任务里仍有价值，但新 Google 图像工作通常先试 Nano Banana 2；如果文字、排版、参考图、4K 或审稿成本高，再测 Nano Banana Pro。Imagen 4 还必须先查具体入口是否仍可用。

### Nano Banana 和 Imagen 是同一个东西吗？

不是。Nano Banana 是当前 Gemini 图像路线的读者说法；Nano Banana 2 对应 gemini-3.1-flash-image，Nano Banana Pro 对应 gemini-3-pro-image。Imagen 4 是另一组退役中的 Imagen 端点。

### Imagen 4 的替代模型是什么？

Gemini API deprecations 页面当前把 gemini-3.1-flash-image 列为 Imagen 4 端点替代。实际选择时，先用 Nano Banana 2；如果任务需要更强文字、布局、参考图、事实上下文或 4K 成片，再测试 Nano Banana Pro。

### Imagen 4 到底什么时候退役？

按入口写日期。Firebase AI Logic 当前写 2026 年 6 月 24 日；Gemini API 的 image generation、Imagen、pricing 和 deprecations 页面当前列出 2026 年 8 月 17 日。Vertex、AI Studio、Gemini App 或服务商入口要单独核验。

### Nano Banana Pro 是否一定值得？

不一定。Pro 适合高失败成本工作：密集文字、复杂排版、参考图一致性、多语言图中文字、4K 成片和外部审稿。Nano Banana 2 如果用同一组提示词已经可接受，就仍然是更稳的默认路线。

### Imagen 4 还能继续用到关闭前吗？

只适合受控旧流程：入口当前仍可用，时间范围足够短，输出任务明确，且已有 Nano Banana 迁移包。不要把新 prompt library、客户流程或 SDK 示例建立在 Imagen 4 上。

### Gemini 图像 API 是免费的吗？

不能这样写。当前 Gemini API 图像价格行是付费行，不是 Free Tier。Gemini App、AI Studio、Cloud、provider 的规则可能不同，但必须按各自入口单独核验。

### 第一组测试应该怎么跑？

先跑 Nano Banana 2；如果文本、布局、参考图、4K 或审稿成本暴露失败，再加入 Nano Banana Pro；Imagen 4 只作为旧 prompt 的迁移基线或短期例外，且必须先核验入口状态。

