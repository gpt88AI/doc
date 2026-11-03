---
title: 做科普动画怎么选？9 个 Agent Skill 从图解、结构演示到视频渲染
description: 整理 Haosen 分享的 9 个科普动画与可视化 Skill，比较 Anatomy、Visual Explainer、Knowledge Explainer、Vox、Manim、白板和 HTML 动画项目的交付物、依赖与选型边界。
date: 2026-11-03
category: AI 工作流
tags: [Agent Skill, 科普动画, 技术可视化, Manim, Remotion, 白板动画, AI 教育]
readTime: 13
---

> **来源与口径**：本文整理自 Haosen（[@Haosen9527](https://x.com/Haosen9527)）于 2026 年 11 月 3 日发布的 [X 帖](https://x.com/Haosen9527/status/2117470313546166627)及 [X Article《想做科普动画？这 9 个 Skill 项目，先看用途再选》](https://x.com/i/article/2116765242428428288)。原作者逐项核对了仓库说明和部分代码。文中按各项目的主要交付物重新归纳；具体功能、依赖和模型服务可能随仓库版本变化，使用前应查看当前 README、Skill 文件和许可证。

讲清一个技术原理，有时需要把结构拆开，有时需要演示公式变化，有时要让白板画面跟着旁白逐步出现。Agent Skill 可以帮助组织这些制作步骤，但“安装 Skill”并不意味着会自动得到完整视频：有的主要输出图片或 HTML，有的负责生成分镜和代码，另一些才带有 MP4 渲染流程。

## 先按最终交付物选择

| 项目 | 更适合的内容 | 主要交付物 | 关键依赖或限制 |
| --- | --- | --- | --- |
| Anatomy | 机器结构、工程原理、复杂系统 | 等距 SVG、交互 HTML 或组件 | Node.js；3D 模式仍可能处于 beta；视频需另行录制或渲染 |
| Visual Explainer | 已有文稿需要配图、信息图或关系图 | 静态图片或一组逐步展开的图片 | 图像生成服务和命令行依赖；图片还要另行编排成视频 |
| Knowledge Explainer | 按 Markdown 场景文稿制作讲解片 | Remotion 渲染的 MP4 | 输入须符合项目文稿格式；旁白和字幕需另行安排 |
| Vox Explainer | 有叙事线的科技、历史或社会议题 | 从脚本到配音、动画和合成的解释短片 | 依赖 Atlas Cloud 等外部服务与本地视频工具；费用需按当前服务核对 |
| AI-Animation-Skill | 课堂和技术分享中的逐页演示 | 单页 HTML 演示 | “PPT”指网页演示效果；转视频仍需录屏或渲染 |
| Manim Skill | 数学推导、几何和科学过程 | Manim 场景代码与渲染动画 | 需选择 Manim CE 或 ManimGL，并安装相应运行环境和视频工具 |
| iart Explainer Video Skills | 已确定类型的解释视频或动画图解 | 制作流程、代码示例，配合渲染工具生成视频 | 技能包包含多个模块；MP4 仍需配置 Remotion、配音和渲染环境 |
| Animated Explainer Skills | 扁平插画、多层视差和角色动画 | 自包含 HTML 动画播放器 | MP4 需录屏或另接渲染；配音流程需要外部 TTS 服务 |
| Whiteboard Explainer | 白板培训和流程讲解 | 跟随词级时间戳逐步显现的动画 | 依赖 HyperFrames、Whisper、Python/Pillow，并需准备图像与 TTS 工具 |

如果目标只是给文章配一张解释图，就不必先搭建完整视频流水线。若目标是 3Blue1Brown 风格的数学推导，Manim 的程序化场景更容易控制公式和变换；若重点是读者能拖动观察一个装置，Anatomy 更合适；若已经有口播稿、想输出 MP4，则应优先检查 Knowledge Explainer、Vox 或 iart 的实际渲染链路。

## 1. Anatomy：让结构与机制可以被观察

[Anatomy](https://github.com/wheresryan22/anatomy) 面向精细等距插画和交互式演示，可以用拆解、标注和动作来解释机器或抽象系统。仓库提供火箭发动机、波纹水槽和仪表等示例。

它适合希望读者能拖动、悬停、检查结构的内容。入门时先运行仓库里的 HTML 示例，再为 Agent 描述要解释的机制、关键参数和目标交付格式，例如独立 HTML、SVG 或网页组件。Node.js 是基本依赖；如果要做视频，还需要另外接入录制或渲染、旁白与字幕。

博客已有一篇[Anatomy Skill 的详细介绍](/docs/blog/anatomy-skill-interactive-explanation-video-2026-10/)，包括交互模型、讲解视频和事实核验边界。

## 2. Visual Explainer：把材料转成讲解图

[Visual Explainer Skill](https://github.com/ericblue/visual-explainer-skill) 把主题、文档或 Mermaid 图转换成白板草图、信息图、技术图解和思维导图，也可以生成逐步展开的图片组。

如果已经有文章或口播稿，只缺一张说明概念关系的视觉素材，可以从这里开始。它的主要产物是图片；多帧输出也不等于已经完成视频，还需要按旁白节奏编排、转场和配音。

项目 README 与 Skill 文档中的 Gemini 型号写法可能不一致，接入前应以当前可用 API 和项目最新说明为准。图像生成后的中文、标签和技术关系需要逐项检查。

## 3. Knowledge Explainer：从 Markdown 场景稿渲染 MP4

[Knowledge Explainer](https://github.com/znyupup/knowledge-explainer-skill) 带有 CLI，可以解析有规定结构的 Markdown 场景稿，生成 React 组合并调用 Remotion 输出 MP4。内置版式包括标题、内容卡片、双栏和三角形；双摆、纸张对折和推荐算法等更复杂动画则通过自定义组件实现。

它适合愿意把文稿整理成场景结构，或能让 Agent 协助修改 React 组件的创作者。建议先按 `examples/script.md` 完成一个短样片，再增加定制画面。普通文章不能直接视作现成分镜；配音和字幕仍要另行安排，并准备 Node.js、项目依赖和 FFmpeg 等环境。

## 4. Vox Explainer：从主题推进到拼贴风解释短片

[Vox Explainer](https://github.com/CK42BB/vox-explainer-skill) 围绕编辑拼贴式视觉设计，使用剪贴纸片、纹理、网点和醒目标题，适合有叙事线的历史、社会议题和科技解释。

仓库说明覆盖脚本、旁白、关键帧、动画、音乐和本地合成。流程会先处理旁白时长，再按声音长度规划画面，并用风格参考保持一致。使用前先检查脚本与视觉方向，再进入图像和视频生成；仓库文档中的克隆命令还可能留有用户名占位符，应按实际仓库地址修正。

它依赖外部 Atlas Cloud 服务及 Python、FFmpeg 等本地工具。服务可用性、模型列表和费用都会变化，原文里的预算只能视作当时估算。准备付费生成前应核实当前服务条款和实际输出能力。

## 5. AI-Animation-Skill：生成网页演示动画

[AI-Animation-Skill](https://github.com/Unclecheng-li/AI-Animation-Skill) 把科普文本组织成类似幻灯片的单页 HTML 演示，也可以将已有演示改成流程图风格。

它适合课堂讲解、技术分享和录屏素材。可以先给一小段文本生成网页，再检查内容顺序和模板。项目所说的“PPT”是浏览器中的演示效果，主要交付物仍是 HTML；要交付 MP4，还需要录屏或接入渲染工具。README 与 Skill 对部分模板数量的说法有差异，实际功能以当前文件目录为准。

## 6. Manim Skill：用代码控制数学与科学推导

[Manim Skill](https://github.com/adithya-s-k/manim_skill) 提供面向 Manim Community Edition 和 ManimGL 的两套实践说明，帮助 Agent 编写公式、图形、变换和镜头。

适合数学教师、理工科创作者，以及想精确控制动画时序的人。开始前要选定 Manim 版本，先渲染基础示例；两套框架的导入路径和 API 并不相同，代码不能随意混用。运行环境还需 Python、相应 Manim 引擎和视频编码工具；公式排版可能需要 LaTeX。

Skill 可以协助写场景，但每一步推导为何出现、应停留多久、观众要注意哪个变化，仍需由创作者决定。

## 7. iart Explainer Video Skills：按动画类型组合流程

[iart Explainer Video Skills](https://github.com/iart-ai/explainer-video-skills) 是一个包含多个 Skill 的工具包，README 列出的方向包括通用讲解短片、年度回顾、图表动画、白板动画和等距场景。

它适合已经确定内容类型、希望 Agent 按脚本、分镜、画面、配音字幕和检查步骤推进的人。可从对应模块的 `SKILL.md` 了解限制，再提供主题、受众、时长和交付格式。Skill 包含流程和代码示例，但 MP4 仍需 Remotion 等渲染工具；配音和渲染环境需要单独配置。在线服务与 GitHub 技能包的使用条件也要分开核对。

## 8. Animated Explainer Skills：把扁平插画编排成 HTML 动画

[Animated Explainer Skills](https://github.com/BusyBee3333/animated-explainer-skills) 以扁平插画为视觉方向，提供多层视差、角色动作、图形变换和可拖动进度的播放器，也包含编排方法、文字重叠检查和逐场景配音流程。

可以从 `explainer-studio` 流程或 `scaffold.html` 示例开始。项目的主要交付物是自包含 HTML；要得到 MP4，需要录屏或另接渲染。GSAP 内联脚本会从公共 CDN 下载依赖，配音流程使用 ElevenLabs，需自行准备账号和 API Key。仓库对“频道级质量”的描述是项目目标，不能替代实际成片验收。

## 9. Whiteboard Explainer：让画面跟随旁白逐步出现

[Whiteboard Explainer](https://github.com/brandonvant/claude-skill-whiteboard-explainer) 使用手部照片与遮罩，让插画逐步显现，再通过 Whisper 词级时间戳安排绘制、标签和镜头动作。

它适合白板讲解、培训和流程说明，特别是需要画面跟着口播逐步出现的内容。建议先用一句短旁白和少量图像做一个场景，检查手的位置、图像显现范围和语音节奏，再扩成完整视频。

运行依赖包括 HyperFrames、Python、Whisper 和 Pillow，并需要图像生成与 TTS 工具。服务商和费用由实际选择决定；仓库的质量类描述仍需用实际输出验证。

## 第一次使用，先做一个可验收的短片段

选择工具时，可以先回答三个问题：

1. **观众要看懂什么？** 是物体结构、公式推导、流程因果，还是观点叙事？
2. **最终交付什么？** 图片、交互 HTML，还是带旁白的 MP4？
3. **团队能维护哪些依赖？** 是否有 Node/Python 环境、Remotion/Manim/FFmpeg、图像生成额度、TTS 和外部服务账号？

第一次先挑一个能在短时间讲完的机制，只做一段。提供给 Agent 的需求至少要包括：

```text
主题：解释一次 HTTP 请求如何经过浏览器、DNS、服务器并返回页面
观众：没有网络基础的高中生
目标：看完能按顺序说出请求的四个阶段
时长：60 秒
交付：自包含 HTML 动画，不需要配音
事实约束：不省略 DNS 缓存；每个阶段显示关键输入和输出
验收：在手机宽度可读，暂停和重播正常，画面与说明一致
```

先审核原理和结构，再扩充视觉效果。渲染通过只说明技术流程成功，仍要检查事实是否正确、文字是否可读、旁白和画面是否对应，以及依赖能否在目标环境运行。

## 许可证与服务边界

截至 2026 年 11 月 3 日，GitHub API 对这 9 个仓库均返回 MIT 许可证，且未报告仓库已归档。这是仓库元数据快照，不代表其引用的字体、图片、外部模型、TTS 服务或第三方依赖都自动适用 MIT。商业或再分发使用前，应检查各仓库的 LICENSE、NOTICE 和资源来源。

外部图像、视频、语音服务可能另有账号、费用、数据处理和使用条款。Skill 文档里出现的模型型号、价格或质量目标也可能过期，不应当作当前兼容性、报价或成片质量保证。

## 参考来源

- Haosen（[@Haosen9527](https://x.com/Haosen9527)）：[X 帖《想把一个原理讲成动画，先选哪种做法？》](https://x.com/Haosen9527/status/2117470313546166627)，发布于 2026 年 11 月 3 日。
- [原始 X Article《想做科普动画？这 9 个 Skill 项目，先看用途再选》](https://x.com/i/article/2116765242428428288)。
- [Anatomy](https://github.com/wheresryan22/anatomy)
- [Visual Explainer Skill](https://github.com/ericblue/visual-explainer-skill)
- [Knowledge Explainer](https://github.com/znyupup/knowledge-explainer-skill)
- [Vox Explainer](https://github.com/CK42BB/vox-explainer-skill)
- [AI-Animation-Skill](https://github.com/Unclecheng-li/AI-Animation-Skill)
- [Manim Skill](https://github.com/adithya-s-k/manim_skill)
- [iart Explainer Video Skills](https://github.com/iart-ai/explainer-video-skills)
- [Animated Explainer Skills](https://github.com/BusyBee3333/animated-explainer-skills)
- [Whiteboard Explainer](https://github.com/brandonvant/claude-skill-whiteboard-explainer)
