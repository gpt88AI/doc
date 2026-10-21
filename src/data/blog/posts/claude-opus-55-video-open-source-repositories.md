---
title: Claude Opus 5.5 代码视频项目导览：8 个 GitHub 仓库怎么选
description: 根据 Kin 的 X 帖子和 8 个 GitHub 仓库 README，比较 Opus 5.5 视频提示词库、代码动画 Skill、完整 MV 工程与角色动画模板，并说明运行依赖、素材授权和选择方法。
date: 2026-10-21
category: AI设计与创作
tags: [Claude Opus 5.5, AI视频, 代码生成动画, GitHub仓库, 提示词, FFmpeg]
readTime: 12
relatedPath: /docs/blog/claude-code-five-code-animation-video-skills/
relatedTitle: Claude Code 视频与代码动画 Skill 实践
---

2026 年 10 月 21 日，Kin（X 账号 [@KinGao476942](https://x.com/KinGao476942)）分享了 8 个与 Claude Opus 5.5 代码视频相关的 GitHub 仓库，涵盖案例与提示词目录、可调用的导演 Skill、完整音乐视频源码、动态图形风格集合和角色动画起步包。

这 8 个仓库解决的问题并不相同。有的适合找灵感，有的可以直接启动一个创作流程，有的更适合拆读完整渲染工程。本文根据[原帖](https://x.com/KinGao476942/status/2112729924943634602)及各仓库当前 README 整理用途和边界。原帖里的 Star 数是发布时的约数，会随时间变化，不能当作当前排名或质量证明。

## 8 个项目，各自适合什么

| 项目 | 类型 | 适合用来做什么 |
| --- | --- | --- |
| [awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos) | 案例与提示词目录 | 从大量创作者案例和提示词中找方向，比较动效、解释视频、3D 场景与交互作品。README 列出 703 条提示词，其中 418 条有在线重制预览，并尽可能链接原作者帖子；并非每个案例都公开了完整提示词。 |
| [lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) | 多风格影片 Skill | 通过导演、技术和风格指南，让支持 Skill 的编码 Agent 根据主题制作短片。README 当前列出 51 种风格，含样片和可复用风格说明；项目明确针对 Claude 调优，其他模型不保证效果。 |
| [pdoom-video](https://github.com/mexicat/pdoom-video) | 完整音乐视频工程 | 研究一支歌词卡拉 OK MV 如何用 TypeScript、Three.js、Bun、Vite 和无头 Chrome 逐帧绘制，再由 FFmpeg 编码。项目提供 1080p60 和原生 4K 渲染路径；4K 流程对 GPU、内存和渲染时间要求较高。 |
| [PDoomVideo](https://github.com/JohnHeibel/PDoomVideo) | 另一套同名歌曲 MV 源码 | 与上一项对应同一首《I'm Upping My P(doom)》，但制作实现不同：README 介绍 Opus 5.5 在 Claude Code 中生成分章节动画，通过 p5.js、p5.brush、Chrome 和 FFmpeg 渲染。适合比较创作指令、场景组织和渲染器设计，不应误认为是同一份工程的镜像。 |
| [mg-styles-15](https://github.com/Vincentwei1021/mg-styles-15) | 动态设计样片与源码合集 | 对比 15 种动态图形风格。每种风格提供约 10 秒影片、提示词、风格说明和源码；仓库还展示逐帧画面、音频合成和审片流程。 |
| [ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase) | 手绘角色动画模板 | 从 p5.js 与 p5.brush 起步，使用 Clawd 角色、31 种情绪表现、动画指南和逐帧渲染脚本做角色短片。适合想改角色、表情和镜头的人；没有独立 GPU 时，水彩笔触可能显著拖慢渲染。 |
| [awesome-claude-5-5-videos](https://github.com/athemeroy/awesome-claude-5-5-videos) | 有来源的多模型视频案例库 | 按模型和原始来源查案例，README 的 2026-10-11 快照列出 424 条来源帖子，其中 Opus 301 条；同时包括 Sonnet、Haiku，以及明确标记为创作者自报的 Fable 案例。它不只是 Opus 视频清单，还提供研究方法、数据文件和提示词模板。 |
| [opus-video-prompts](https://github.com/joeseesun/opus-video-prompts) | 中文提示词与案例索引 | README 列出 18 份提示词、54 个公开案例和 9 种技术路线，并说明代码动画通常通过浏览器逐帧渲染后用 FFmpeg 合成；写实画面也可能需要调用外部视频模型。适合中文读者快速试验，但使用提示词时仍要保留作者出处。 |

## 根据目标选择入口

### 想先找点子

从 `awesome-opus5-5-videos` 的分类或 `awesome-claude-5-5-videos` 的来源目录开始。前者集中在 Opus 5.5 代码视频和提示词；后者把 Opus、Sonnet、Haiku 与创作者报告的 Fable 分开标记，还提供来源和采样记录。查看单个案例时，先点到创作者原帖，确认模型归属和输入条件；收藏库里的归类不能代替原始制作记录。

### 想让 Agent 帮忙做一支短片

查看 `lemo-opuscar`。它把导演规则、渲染方法和具体风格拆开，包含安装方式与不同风格的样片。运行前要确认目标客户端支持对应 Skill，准备 Node.js、FFmpeg 和 Python 等依赖，并预留一次提问或先看分镜的时间。仓库说明一支影片可能需要几十分钟和较多模型调用；“装上就能做”并不代表零成本或无需人工验收。

### 想读懂完整代码生成链路

`pdoom-video` 与 `PDoomVideo` 都围绕同一首歌，但实现和资料组织各有侧重。前者以 Three.js 时间线和确定性帧渲染为核心，并附带歌词对齐、音频分析及 4K 输出说明；后者更直接展示 Agent 生成的章节文件、动画指南和渲染命令。两个项目都不是轻量模板：需要安装浏览器、编码器和项目依赖，完整高分辨率输出可能占用大量计算资源。

### 想要可以改造的起步素材

`mg-styles-15` 适合观察不同动效风格如何共享一条渲染与音频管线；`ClaudeAnimationBase` 则更聚焦角色表演、笔刷风格和镜头节奏。前者有 15 个可对照的完整风格样片，后者将表情、角色和动画规则做成复用底座。选择时看你要做的是图形设计还是角色动画，不必只按 Star 数排序。

## 代码能复用，不代表所有素材都能随意复用

检查授权时，要把程序代码、提示词、影片、歌曲、歌词、字体、样本和图片分开看：

- `lemo-opuscar` README 分别说明代码与文档采用 MIT，样片和静帧采用 CC BY 4.0，并要求署名。
- `pdoom-video` 的代码采用 MIT，但 README 明确歌曲和歌词属于各自作者，不包含在代码许可内。
- `mg-styles-15` 声明项目代码、提示词、文档和项目影片采用 MIT，同时注明第三方样本、字体和其他文件继续适用各自许可。
- `awesome-opus5-5-videos` 为案例附作者原帖链接，并说明预览和提示词来自创作者；不要把仓库的代码许可自动套用到案例作品。
- `opus-video-prompts` 当前根目录 `LICENSE` 路径没有公开许可文件响应；这不能推导所有提示词都可自由再发布。遇到具体案例，应先看原作者授权和平台规则。

实际改编前，打开对应仓库当下的 README、LICENSE 和单项素材说明。短片中使用的歌曲、歌词、照片、地图、字体与提示词可能各有权利人；仓库整体的代码许可不能替它们统一授权。

## 一条更稳妥的试做流程

1. **先写清交付物**：目标时长、画幅、帧率、风格、旁白和音乐来源，以及最终需要可编辑源码还是只要成片。
2. **选择合适的基底**：提示词库用于构思，Skill 用于执行方法，工程样例用于理解渲染架构，动画模板用于改角色与动作。
3. **核对模型和工具链**：确认客户端、模型、Node/Python、浏览器、FFmpeg、GPU 等要求；依赖与版本以项目当前说明为准。
4. **先跑短样片**：先做几秒或一段关键镜头，检查画面节奏、字形、声音同步和运行时间，再决定是否渲完整片。
5. **核对来源与成片**：逐项确认提示词、素材与音乐许可，标注作者和改动；检查最终 MP4，而不是只根据 README 截图判断完成质量。

代码生成视频的优势是画面可编程、修改可复现、源码便于拆解。它也把一部分成本转移到逐帧渲染、视觉调试、音频制作和人工审片上。选对仓库的标准不是它的列表最长，而是它提供的素材和工程深度是否匹配这次创作任务。

## 来源

- 原帖：[Kin：8 个 Claude Opus 5.5 视频 GitHub 仓库](https://x.com/KinGao476942/status/2112729924943634602)
- [Awesome Opus 5.5 Videos](https://github.com/yihui-dev/awesome-opus5-5-videos)
- [Lemo-Opuscar](https://github.com/lemomo-ai/lemo-opuscar)
- [P(doom) video](https://github.com/mexicat/pdoom-video)
- [PDoomVideo](https://github.com/JohnHeibel/PDoomVideo)
- [15 Motion Design Styles](https://github.com/Vincentwei1021/mg-styles-15)
- [Claude Animation Base](https://github.com/JohnHeibel/ClaudeAnimationBase)
- [Awesome Claude 5.5 Videos](https://github.com/athemeroy/awesome-claude-5-5-videos)
- [Opus 5.5 Video Prompts](https://github.com/joeseesun/opus-video-prompts)
