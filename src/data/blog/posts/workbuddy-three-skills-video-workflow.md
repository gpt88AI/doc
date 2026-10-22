---
title: WorkBuddy 怎么剪视频：HyperFrames、ChatCut、VideoGen 的分工与实战流程
description: 整理秋叶大叔的 WorkBuddy 视频制作教程，说明 HyperFrames 动态卡片、ChatCut 口播粗剪和 VideoGen 补充镜头各自适合什么任务，并给出从脚本到成片的四步工作流。
date: 2026-10-22
category: AI 视频
tags: [WorkBuddy, HyperFrames, ChatCut, VideoGen, AI视频, 短视频制作]
readTime: 12
relatedPath: /docs/blog/hyperframes-studio-long-form-video-series-workflow/
relatedTitle: HyperFrames Studio 长视频工作流：从一分钟动效到可持续的知识栏目
---

> 本文根据秋叶大叔于 2026 年 10 月 20 日发布的[《WorkBuddy 怎么剪视频？3 个好用 skill，从 0 做出一条片》](https://mp.weixin.qq.com/s/BoVO0XR4rJ_aqZaaRpqbig)整理。文中的工具分工和演示步骤来自原文；“10 分钟完成”和 Hy3 限免属于作者发布时的个人演示与产品说明，不代表普遍制作耗时或当前价格。HyperFrames 的框架能力和安装要求另以[官方仓库](https://github.com/heygen-com/hyperframes)为准。原文演示图按出现顺序保留。

![原文展示的 WorkBuddy 视频制作工具与流程示意](https://mmbiz.qpic.cn/sz_mmbiz_jpg/HiaWSh70TB1yNGbbKzcweTYN2YZah6jAoU6CLs0YqClZ13G27jGcnnm2iczNMyMZyh0auuLw4HRftZfZzp1S8ttadkdb0PT3vBmumBLpvodIA/640?wx_fmt=jpeg)

## 三个工具，解决三种不同的视频工作

短视频制作常把“剪视频”说成一个动作，实际至少包括图形动效、口播整理和补充画面。秋叶大叔推荐的三种工具正好落在不同环节：HyperFrames 负责把文字和图形排成动态页面，ChatCut 面向已有口播素材做粗剪，VideoGen 则按文字描述生成短画面。

| 工具 | 输入 | 主要产物 | 适合的任务 | 需要留意 |
| --- | --- | --- | --- | --- |
| HyperFrames | 文案、HTML/CSS、图片、视频和动画 | 可渲染的 MP4 动态图文 | 知识卡片、标题动画、产品介绍、文字型科普 | 需要预览和排版；不是传统多轨精剪软件 |
| ChatCut | 已录制的讲话视频或音频 | 口播粗剪、字幕等编辑结果 | 去语气词、整理停顿、直播切片、字幕初稿 | 自动删除可能切坏语气和呼吸，必须复核；连接器和系统支持以当前版本为准 |
| WorkBuddy VideoGen | 一段文字画面描述 | 几秒钟的视频素材 | 口播背景、空镜、人物或场景补充镜头 | 原文把它定位为素材片段生成，不是完整长视频；模型、额度和效果随版本变化 |

这不是三个互相替代的剪辑软件。一个轻量组合可以是：先用 HyperFrames 做信息主线，再用 VideoGen 为一两个重点补充画面；只有在已经录好真人口播时，才加入 ChatCut 清理素材。没有口播素材，就无需为了“凑齐三个工具”强行使用 ChatCut。

## 1. HyperFrames：把脚本变成动态知识卡片

原文将 HyperFrames 用于标题卡、要点卡和结尾卡，让一段文字先变成有动画的页面，再导出为视频。它特别适合文字信息占主导、镜头结构简单的内容，例如把一篇公众号文章压缩成 30 秒知识短片。

HyperFrames 官方项目把自己定位为将 HTML、CSS、媒体素材与可定位动画渲染为 MP4 的开源框架，并提供面向 AI 编程工具的 Skills。官方安装说明给出的 standalone Skills 命令是：

```bash
npx skills add heygen-com/hyperframes
```

官方 README 还列出 Node.js 22+ 和 FFmpeg 等运行要求。上面的命令适用于支持 `skills` 工具链的 Agent 环境；WorkBuddy 的“专家技能连接器”可能有自己的接入方式，应按 WorkBuddy 当前界面和该 Skill 的来源说明安装，不要假定所有客户端都支持同一种安装流程。

一个适合知识卡片的任务描述，可以包含：

```text
把这段文案整理成约 30 秒的知识短片：开场标题卡、3 张要点卡、结尾总结卡。
每张卡只保留一个重点，使用清楚的层级、适合手机阅读的字号和克制的转场。
先生成页面并预览，再渲染 MP4；输出后检查文字是否溢出、动画是否对齐、视频是否完整。
```

原文也提醒了定位边界：HyperFrames 的优势是快速生成动态页面和视频初稿，不等于已经完成节奏、镜头、声音、色彩与叙事都经过精修的商业成片。

## 2. ChatCut：先整理讲话素材，再润色

口播视频最费时间的环节往往不是增加特效，而是反复听“嗯”“那个”、长停顿和重复表达，再切片、校对字幕。原文介绍 ChatCut 用于去除这些片段、搭建粗剪时间轴并辅助加字幕。

原文给出的示例指令可以改写成更易检查的版本：

```text
先为这段口播生成转写和粗剪建议。标出语气词、重复句和超过 2 秒的停顿，
提供建议保留或删除的时间段与理由。不要直接覆盖原文件；我确认后再应用剪辑，
并输出字幕供我检查专有名词和断句。
```

让工具先给时间段和建议，再由人确认，能降低自动剪切误删内容的风险。语气词有时承担强调或自然停顿作用，不应一概删除；字幕也要核对人名、数字、品牌名和专业词。

作者还指出其体验在 Mac 上更顺、Windows 有些功能不稳定。这是原文发布时的兼容性反馈，实际使用前应在自己的系统和当前连接器版本中做小样本验证。原文提到的账号注册、连接步骤也属于第三方服务流程；使用前先确认素材的数据处理方式，尤其不要把客户访谈、内部会议或含个人信息的录音直接交给未审核的服务。

## 3. VideoGen：为关键段落补一条短镜头

原文把 VideoGen 作为 WorkBuddy 内置的视频画面生成能力：用自然语言描述人物、场景、动作、镜头和光线，生成几秒的素材片段，再把它作为 B-roll 插入成片。它适合填补“这段需要画面，但手上没有合适实拍素材”的位置。

提示词可以按下面的结构写：

```text
生成一段约 5 秒的办公室场景：一位职场女性在白色办公室整理文件，
镜头从中景缓慢推进到近景，动作自然、背景简洁、光线柔和。
画面用于知识短片的过场，不添加文字、品牌标识或对白。
```

与其只写“生成一段职场视频”，不如明确主体、动作、场景、镜头运动、时长和用途。生成后还要检查人物动作是否连贯、手部和物件是否变形、镜头是否适合裁切，以及画面是否和整条视频的风格一致。

原文称发布时可选择腾讯混元 Hy3 并限免、不消耗积分。这是作者当时对界面和额度的描述，具体模型是否仍可用、额度如何计算以及结果时长，都应以实际账号当前显示为准。不要把限免当作长期承诺，也不要预先据此估算批量生产成本。

![原文中的 HyperFrames 动态卡片演示](https://mmbiz.qpic.cn/mmbiz_gif/HiaWSh70TB1waibjhxBvLrGEibIicJTLialWgDC7KMh61mKxyxTuQEC1ebngTgaYukNibDl3Fc5E4KEuHs03Iad0zEXEuOS5bWKToSUaiczib4csM2M/640?wx_fmt=gif&from=appmsg)

## 四步做出一条知识短片初稿

原文以一篇公众号推文为例，给出从文案到短视频的串联演示。按工具职责整理后，可以得到下面这条流程：

### 第一步：把主题压成一段短脚本

先确定观众看完需要记住什么，再将脚本压到适合目标时长。约 30 秒的口播通常只容纳少数几个信息点；可以尝试“一个开场问题、三个要点、一句结尾”，并朗读计时，而不是只按字数估算。

如果用模型协助改写，先核对事实、数字和来源，再把定稿文案交给后续工具。脚本写作和视频画面生成是两项不同工作，模型生成内容不能跳过事实检查。

### 第二步：用 HyperFrames 做结构底片

把定稿脚本拆成标题卡、要点卡和结尾卡。每张卡只表达一层信息，统一字号、颜色和边距，再预览页面、检查字幕和动画时序，最后渲染 MP4。

![原文展示的动画卡片视频片段](https://mmbiz.qpic.cn/mmbiz_gif/HiaWSh70TB1yMSDd1NpibkMRMjFsdiapjGUxxmRIMazibQbdUkX4LgNvLqSxWynPicTRGdPs8Vf4ibv8mZ3YugIYjTaYaAR7wicH4Diaz3WlicxoqnMU/640?wx_fmt=gif&from=appmsg)

### 第三步：按需要生成补充画面

先找出纯文字卡片难以解释的段落，只为这些位置生成 VideoGen 镜头。例如需要人物、环境或动作示意时生成一段短片；抽象概念则可以继续用图表或动效表达，不必为了画面丰富而每段都生成视频。

### 第四步：有真人口播时再做清理和字幕

若已录制口播，使用 ChatCut 生成转写和剪辑建议，逐段确认后再应用；字幕完成后校对专名、数字、断句和时间轴。最后把音频、字幕、卡片动画和补充镜头合成，完整播放一次，检查开头吸引力、信息顺序、音画同步、片尾和导出文件。

![原文展示的生成式口播补充镜头](https://mmbiz.qpic.cn/sz_mmbiz_gif/HiaWSh70TB1zyibeKCNxGS0Bp54wHHU41jtlfSia1OKeicny1u4ibq5Aiapm0Q6A0ibJ6HP9zF7MPhThsibsbEneIuCyM4ibx63t8hTrNTf6sKEgRKn8/640?wx_fmt=gif&from=appmsg)

原作者称示例短片总共花了 10 分钟，且没有做二次精剪。这说明轻量流程可以很快生成一个可看的初稿，但不代表所有选题、设备、模型和网络条件都能在同样时间内完成，也不说明成片已经达到精剪质量。实用的评价方式是记录从脚本定稿到首次导出的耗时，同时单独记录校对、返工和最终精修花费。

## 什么时候值得用这套组合

- **公众号文章或知识笔记改短视频：**以 HyperFrames 卡片为主，必要时补一两个生成镜头。
- **已有真人口播但还没剪：**先用 ChatCut 做粗剪建议与字幕，再由创作者确认节奏和保留内容。
- **没有合适实拍的过场画面：**用 VideoGen 生成短素材，作为补充，而不是替代完整脚本和剪辑。
- **需要品牌化、精细节奏或多轨叙事：**把自动生成结果当底稿，继续用熟悉的剪辑工具完成精修和审片。

最短的可行路径不是“装好三个工具”，而是先确定视频类型，再只用解决该环节问题的工具。文字主导的视频从 HyperFrames 开始；口播素材从 ChatCut 开始；缺少具体场景镜头时再试 VideoGen。

## 发布前检查清单

- [ ] 脚本只有一个主旨，数字和事实可回查。
- [ ] 字幕在手机屏幕上可读，没有溢出或遮挡主体。
- [ ] 自动剪辑的删除点已听看确认，重要语气和停顿没有丢失。
- [ ] 生成画面与实际讲述匹配，没有误导性人物、地点或品牌信息。
- [ ] 外部连接器处理素材的方式已确认，敏感内容没有未经评估就上传。
- [ ] 当前模型、额度、系统支持和导出质量已用小样本验证。
- [ ] MP4 从头到尾可正常播放，声音、字幕、转场和片尾均已检查。

## 来源与补充资料

- [秋叶大叔：WorkBuddy 怎么剪视频？3 个好用 skill，从 0 做出一条片](https://mp.weixin.qq.com/s/BoVO0XR4rJ_aqZaaRpqbig)
- [HyperFrames 官方仓库与安装文档](https://github.com/heygen-com/hyperframes)
- [HyperFrames 官方快速开始](https://hyperframes.heygen.com/quickstart)
- [HyperFrames 官方文档](https://hyperframes.heygen.com/introduction)
