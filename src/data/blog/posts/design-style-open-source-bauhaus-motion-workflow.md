---
title: Design Style 开源项目拆解：用代码生成包豪斯动效、风格图与设计令牌
description: 基于观默的 X 帖子与 Design Style GitHub 仓库，拆解包豪斯一期如何用 Remotion、SVG、共享设计令牌和 NumPy 音频合成制作 15 秒动效与四张风格图。
date: 2026-10-21
category: AI设计与创作
tags: [Design Style, 包豪斯, 代码生成动效, Remotion, SVG, 设计令牌, GPT88]
readTime: 10
relatedPath: /docs/blog/huashu-motion-agent-video-workflow/
relatedTitle: AI Agent 视频工作流：从素材到可编辑动画
---

观默（[@guanmo_ai](https://x.com/guanmo_ai)）在 2026 年 10 月 21 日发布了 [Design Style 项目介绍](https://x.com/guanmo_ai/status/2112699133890806046)：计划每天拆解一种设计风格，每期包括一支 15 秒动效短片、四张风格图，以及色板、字体、版式参数和制作过程。首期主题是包豪斯 Bauhaus；帖子称画面、配乐和音效由代码生成，并公开源码。

作者账号下的 [Design Style 仓库](https://github.com/guanmo-ai/design-style)与帖子内容一致。本文据此结合仓库 README、包豪斯风格指南、制作过程文件和代码目录，拆解它如何把一个视觉风格转成可复用、可检查的创作系统。文中对制作流程的分析来自仓库；关于包豪斯历史的细节以项目指南所列资料为边界，不把项目作者的视觉归纳写成唯一的历史定义。

[![观默的 Design Style 包豪斯动效短片](https://pbs.twimg.com/amplify_video_thumb/2112580197350514688/img/AXFRZeGw3IL9zSbU.jpg)](https://x.com/guanmo_ai/status/2112699133890806046)

## Design Style 是什么

Design Style 是一个面向设计师和 AI 创作的开源设计风格库。仓库把每期作品拆成可学习的风格指南、机器可读的设计令牌、四张源文件可编辑的风格图、短片源码和制作复盘。首期是包豪斯；README 将下一期列为瑞士国际主义风格，后续计划还包括构成主义、装饰艺术、孟菲斯、新粗野主义和 Y2K 等。计划可能调整，应以仓库当前内容为准。

这个项目的重点不只是“用代码做一段视频”，而是让同一套风格约束贯穿短片、图像、网页和提示词。读者可以从[仓库首页](https://github.com/guanmo-ai/design-style)查看说明，在 [001 包豪斯目录](https://github.com/guanmo-ai/design-style/tree/main/styles/001-bauhaus)查看风格指南、令牌、图片、动画和复盘。

## 从风格形容词变成可执行规则

“复古”“几何”“有包豪斯感”是审美方向，不足以约束多个产物的一致性。包豪斯指南把它整理成可执行规则，例如基本形、颜色、字形、非对称平衡和网格粗线，并同时给出怎么做和应避免什么。

首期的指南包含颜色 HEX 值、面积建议、字体、网格与线宽、竖图尺寸和提示词示例。这样设计者不需要每次重新解释“复古几何风”，而可以把规则落到可复用的变量与画面约束中。

这里要区分项目的设计转译与历史事实：仓库作者为这一期选取了红黄蓝、圆方三角等易识别元素，并把它们用于短片和配图。这是一期作品采用的视觉框架，不意味着包豪斯历史只包含这些元素；仓库自己的指南也提醒包豪斯的教学和作品涉及纺织、陶瓷、金属、摄影等多个领域。

## 一份 tokens 贯穿视频、图片和网页

仓库把颜色、字体、线宽等设计值放在 `tokens.ts`、`tokens.css` 和 `tokens.json` 中，供 React/Remotion 短片、图片和网页画廊共同使用。这样做解决了创作流水线中的一个常见问题：海报用一套红色、动画用另一套蓝色、网页又换了字体，最终像是三个风格相近却彼此无关的作品。

包豪斯一期的四张风格图分别是海报、速查卡、应用界面概念和图案生成器。源文件以 SVG 为主，图案也有 Python 脚本；仓库提供 PNG 预览和内嵌字体的 SVG 版本。换言之，“四张图”不只是四个导出的平面文件，源格式还可以用于检查结构、替换令牌和继续修改。

这套方式可以概括成一条关系：

```text
风格研究与规则
        ↓
共享设计令牌
   ↙     ↓      ↘
短片源码  风格图  网页画廊
   ↘     ↓      ↙
      制作检查与发布
```

## 15 秒短片如何变成工程任务

README 把短片规格定义为 15 秒、1920×1080、60fps，也就是 900 帧。节拍设为 120 BPM，每拍 30 帧；章节转场与音效关键帧按帧号对齐。短片由 Remotion/React 组件实现，而不是只把一段文字提示词交给视频模型。

包豪斯一期的过程文档记录了一个具体迭代：v1 以六段短片讲“包豪斯的语法”，收到“没有把包豪斯的各种风格展示出来”的反馈后，作者把 v2 改成九个章节，扩展到色彩、字体、海报、建筑、家具、灯具、纺织和舞台等不同侧面。这比单纯增加动效复杂度更有启发：反馈指出的是内容覆盖问题，修正就应回到叙事结构和选材范围。

音乐与音效也有可读源码。`styles/001-bauhaus/audio/make_music.py` 使用 Python 和 NumPy 合成 15 秒音频素材，并按帧/秒关系把声音事件对齐到动画关键帧；渲染后再由 FFmpeg 处理成片响度和编码。仓库的脚本还会导出关键帧、联系表和节拍时间轴，供作者在发布前检查视觉与声音是否一致。

## 可复用的代码创作流程

如果要做另一个风格系列，可以借鉴项目的制作顺序，而不必照搬包豪斯的视觉规则：

1. **研究并限定范围**：列出时间线、代表性作品、规则和常见误区。把有争议或尚未核实的历史描述单独标注。
2. **定义一套令牌**：将颜色、字体、网格、线宽、间距和运动节拍写成单一数据源。
3. **规划交付规格**：先确定视频尺寸、帧率、时长、章节数和四张图分别解决什么阅读任务。
4. **分别实现视频与图像**：用组件和 SVG 等可编辑格式制作，让素材能够复用令牌，而不是在每个文件里复制一套常量。
5. **做静态与动态检查**：导出关键帧和联系表检查遮挡、节奏、文字和颜色；在目标播放器或网页实际运行，不能只凭一张封面验收。
6. **记录修改依据**：保留 v1、反馈和 v2 的差异，说明改动针对什么问题。
7. **发布可复现材料**：提供源文件、依赖和运行说明，并明确代码、图片、视频、字体各自的许可与署名要求。

仓库 README 列出了本地制作所需的 Node.js、Python、FFmpeg 和依赖安装命令，也提供 `npm run studio`、`npm run render:001` 和 `npm run images:001` 等脚本。网页画廊有独立的构建脚本和文档；初次运行前应查看当前 README 与 [画廊维护说明](https://github.com/guanmo-ai/design-style/blob/main/docs/GALLERY.md)，不要把预览画廊的环境要求和视频渲染环境混为一谈。

## 用 GPT88 辅助生成设计令牌草案

大模型可以帮助把研究笔记整理成结构化的设计简报，但它生成的历史解释和审美判断仍需人工审核。一个实用做法是先让模型输出候选令牌，再由设计者检查色值、字体来源、网格和动态规则，最后把确认后的令牌接入代码。

例如，可以要求模型输出这些字段：

```text
style_name
historical_claims_with_sources
palette: [{name, hex, intended_area, use}]
type: [{role, family, weight, license_source}]
geometry_rules
layout_grid
motion_rules: [{duration_frames, easing, transition}]
avoid
deliverables
```

使用 GPT88 时，先通过[模型列表 API](/docs/api/list-models/)确认当前 API Key 可访问的模型，再按[Chat Completions API](/docs/api/chat-completions/)配置客户端。固定相同输入和输出字段，切换模型生成候选版本，可以比较规则完整度和可执行性；这不是审美质量的客观排名。不要让模型补造史料来源，也不要将 API Key 写进仓库、公开提示词或客户端前端。

项目真实产物仍应由可检查的文件生成：用确认后的令牌驱动 React/Remotion、SVG 和 CSS，再运行渲染、测试和浏览器验收。这样 GPT88 负责协助形成可审阅的草案，代码工具负责稳定地复用参数，人工负责事实、风格和最终交付判断。

## 项目许可与复用边界

仓库 README 表示代码欢迎学习和改造，并要求转发视频和图片注明观默 `@guanmo_ai`；README 还标明 Jost、JetBrains Mono 和 Noto Sans SC 字体采用 SIL Open Font License 1.1。当前仓库目录中没有根目录级 `LICENSE` 文件，因此不要把 README 的友好说明等同于已明确授予商业再分发权。复用代码或素材前，应核对仓库最新许可说明，并在需要时向作者确认；字体许可与项目代码、图片和成片的权利范围也应分开看。

## 常见问题

### Design Style 每期包含哪些内容？

项目 README 将每期拆成 15 秒动效短片、四张风格图、风格指南、设计令牌、制作过程和可复用源码。各期具体内容以仓库实际发布为准。

### Design Style 的短片是不是由文字提示词直接生成？

包豪斯一期仓库提供 Remotion/React 动画组件和 Python/NumPy 音频合成脚本，显示这一期是代码实现并渲染的流程。原帖的“画面、配乐、音效全由代码生成”是作者对项目的描述；这不等于所有未来期数一定采用完全相同的实现方式。

### 如何保证短片、海报和网页的风格一致？

项目把颜色、字体和其他视觉参数放入共享的 `tokens.ts`、`tokens.css` 与 `tokens.json`，供多种产物复用。新增风格时也可以建立令牌数据源，再让组件、图像和页面读取同一份参数。

### 仓库可以直接商用吗？

目前不能仅凭 README 判断所有代码和素材的商用许可。仓库没有根目录级 `LICENSE` 文件；README 的学习与改造说明、视频图片署名要求和字体的 OFL 授权范围应分别理解。商业复用前请查阅最新仓库说明并向作者确认权利范围。

## 来源与延伸阅读

- 原帖：[观默：开源 Design Style，每天拆解一个设计风格](https://x.com/guanmo_ai/status/2112699133890806046)
- 项目源码：[guanmo-ai/design-style](https://github.com/guanmo-ai/design-style)
- 设计指南：[包豪斯 README](https://github.com/guanmo-ai/design-style/blob/main/styles/001-bauhaus/README.md)
- 制作复盘：[包豪斯制作过程](https://github.com/guanmo-ai/design-style/blob/main/styles/001-bauhaus/PROCESS.md)
- 成片：[Design Style · day-01](https://github.com/guanmo-ai/design-style/releases/tag/day-01)
- GPT88：[模型列表 API](/docs/api/list-models/)与[Chat Completions API](/docs/api/chat-completions/)
