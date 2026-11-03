---
title: 10 个 AI 教育与交互学习项目：从虚拟实验到可视化教材
description: 整理洛克船长分享的 10 个 AI 教育和交互学习项目，覆盖中小学实验、GCSE 科学课程、AI 可视化课件与词汇学习，并标注链接、开源状态和数据口径边界。
date: 2026-11-03
category: AI 教育
tags: [AI 教育, 交互学习, 虚拟实验, 开源项目, 可视化教材]
readTime: 11
---

[![10 个教育项目介绍视频预览](https://pbs.twimg.com/amplify_video_thumb/2116383004993961984/img/ztyJEDaJlQHtqdre.jpg)](https://x.com/slashui/status/2116383058735554610)

> **来源与口径**：本文按洛克船长（[@slashui](https://x.com/slashui)）2026 年 10 月 31 日发布的 [X 帖](https://x.com/slashui/status/2116383058735554610)整理。原帖把项目分为中国中小学教育、国外中学科学课程和通用可视化学习三组。下文对项目能力的概述以原帖介绍为主；少数仓库元数据和链接状态在 2026 年 11 月 3 日复核。项目功能、课程数量和许可可能继续变化，具体使用前请以项目方当前页面和许可证为准。

这 10 个项目有一个共同方向：把知识从“读定义和看插图”转成可以操作的实验、可视化模型、分步课程或有反馈的练习。它们并不都使用生成式 AI，也不都已经确认开源；更适合把这份清单看作不同学习交互形态的入口。

## 一、中国中小学教育

### 1. WeduLab：六学科交互式实验室

[WeduLab](https://wedulab.com/?lang=en) 面向物理、化学、生物、数学、地理和历史等学科。原帖介绍它提供 37 个交互式虚拟实验室，举例包括浮力、电路、牛顿定律和化学制氧气。学生可以通过改变条件、观察现象来理解知识点。

原帖称网站可免费体验，但作者注明暂未确认是否开源。因此适合先作为在线教学演示来了解，不应仅凭“免费使用”推断代码或课程素材可以下载、修改或商用。

### 2. Tongjiang Lab：3D 物理化学实验

[铜匠实验室](https://lab.tongjiang.app) 将中学物理和化学概念做成可操作的 3D 实验。它强调让学生调整条件并观察结果，帮助理解课本插图难以表达的空间关系和因果变化。

原帖提供了[在线实验室](http://lab.tongjiang.app)和 [GitHub 仓库](https://github.com/smithjohn78390/tongjiang-lab)。博客已有一篇更详细的[铜匠实验室介绍](/docs/blog/tongjiang-lab-interactive-3d-science-lessons/)，包括课程目录、离线使用方式和授权边界。

### 3. Wrong Notebook：AI 错题整理与复习

[Wrong Notebook](https://github.com/margrop/wrong-notebook) 面向错题复习：原帖提到拍照识题、AI 解答、知识点分类、举一反三、组卷打印和学习掌握度跟踪。它尝试把“收集错题”延伸到“整理知识点并安排后续练习”。

GitHub 当前仓库简介也列出这些功能，仓库 API 标注 MIT 许可证。涉及拍照和学生学习记录时，使用者仍需查看实际部署方式、数据存储位置和隐私政策；开源代码本身不能代替这些核查。

### 4. cn-math-taxonomy：知识图谱与前置诊断

[cn-math-taxonomy](https://github.com/xiaoyang111222/cn-math-taxonomy) 将知识点、先修关系和诊断题组织成学习路径，帮助发现一道题答错前可能缺失的基础概念。原帖提到数学有 828 个知识点和 1,366 条先修关系，并列出在线体验站 [math.pansgo.com](https://math.pansgo.com)。

这个数字与仓库当前简介不一致：截至 2026 年 11 月 3 日，GitHub 仓库简介列出数学、英语和初中物理等合计 1,644 个知识点、2,403 条先修边及 6,723 道题。两组数字的覆盖范围和更新时间不同，不应混作同一统计口径。博客另有[项目结构和自适应诊断介绍](/docs/blog/cn-math-taxonomy-adaptive-diagnosis/)，可查看数据模型、学科范围和审核边界。

## 二、国外中学科学课程

原帖中的后三个科学课程项目都由互动页面承载知识点。它们更像是按课程目标组织的数字教材，而不是单个实验模拟器。

### 5. Dinosaurs to Birds：从恐龙到鸟类

[Dinosaurs to Birds](https://iamtechartist.com/dinosaurs-to-birds/) 通过六节互动课程讲解鸟类演化。原帖称课程使用化石证据和 3D 内容，引导学生观察、预测和尝试，逐步理解演化过程。

这类主题的关键不只是模型是否精细，还包括证据和结论之间的关系是否说清楚。教学者可以把交互页面作为讨论材料，并与课程教材或可靠的古生物资料交叉核对。

### 6. Breathing and Respiration：呼吸与细胞呼吸

[Breathing and Respiration](https://iamtechartist.com/breathing-and-respiration/) 面向英国 GCSE 和初中生物课程，原帖介绍其主题从呼吸、气体交换延伸到血液循环和细胞呼吸，并配有交互演示、练习和检测题。

适合用来把器官、气体传输和细胞层面的过程串成一条学习路径。教师仍可根据课程要求选择模块，避免学生把相邻但不同层级的“呼吸”概念混为一谈。

### 7. Every Joule：可视化能量物理

[Every Joule](https://iamtechartist.com/every-joule/) 聚焦 GCSE 能量主题，原帖列举动能、重力势能、弹性势能、功率、效率和能量守恒。它通过交互实验呈现能量变化，帮助学生理解公式里的量分别代表什么。

能量主题尤其适合让学生改变质量、高度、速度或摩擦等条件，再比较不同状态下的能量。做课堂演示时，可以先让学生预测变化，再操作模型验证，而不只是播放结果。

## 三、AI 与通用可视化学习

### 8. Teachable Figures：生成可交互教学图形

[Teachable Figures](https://ywedai.github.io/teachable-figures/) 是一个面向教学内容创作的 Agent Skill，原帖称它可以生成 2D/3D 交互课件，并用“预测、尝试、解释”的方式组织学习。示例主题包括 Transformer、人体解剖、火箭和机械齿轮；对应 [GitHub 仓库](https://github.com/ywEdAi/teachable-figures)提供项目源文件。

“Agent Skill”意味着它主要帮助 Agent 按一套流程产出教学图形，并不表示生成结果已经经过学科审校。复用仓库或生成内容前，应检查当前仓库中的许可证；本次核验时 GitHub API 没有识别到许可证字段，不能据此认定其代码、示例和产物可任意再分发。

### 9. Sael：把模型工作过程做成动画

原帖把 Sael 描述为 AI 工作原理可视化：从消息传输、Token 化，到 GPU 计算、模型推理和逐 Token 生成回答。这样的过程图有助于初学者建立直觉，理解“发出一句话”背后包含多个计算步骤。

原帖没有附上可访问的演示地址或代码仓库，作者也把演示链接标为待补充。因此目前可确认的是帖子中的项目描述，不能据此核实 Sael 的具体实现、开放程度或演示效果。

### 10. Word Atlas（词光）：带间隔复习的词汇图谱

[Word Atlas（词光）](https://github.com/designfuchen/word-atlas) 面向雅思词汇学习。原帖介绍其包含 7,298 个核心词，配有插画、例句和英美发音，并用 FSRS 安排间隔复习；原帖称其免费、无需注册，也支持手机浏览器。

GitHub 当前仓库简介仍写有 7,298 个词、英美音频和 FSRS。仓库 API 没有识别到顶层许可证字段，所以代码、插画、词库和音频的授权范围仍应分别查看仓库文件及资源来源，不要把“免费使用”直接等同于“可以自由复制”。

## 怎么把这份清单用于教学

选择项目时，可以先从教学目标出发，而不是从“是否用了 AI”出发：

1. **要看变量和现象的关系**：优先试虚拟实验，如 WeduLab、Tongjiang Lab 或 Every Joule。
2. **要补先修概念**：查看 cn-math-taxonomy 一类知识关系和前置诊断工具，再由教师核对路径是否符合课程要求。
3. **要按一门课程循序讲解**：可参考 Dinosaurs to Birds 或 Breathing and Respiration 的分节组织。
4. **要让学生解释一个复杂系统**：试试 Teachable Figures 一类创作工具，但将生成内容作为初稿，并安排事实审核。
5. **要形成日常复习习惯**：考察 Word Atlas 或错题本的复习调度，同时确认学生数据如何保存和删除。

实际试用时，建议围绕一个具体知识点走完“提出预测、操作模型、说明结果、完成检测”的完整过程。交互越丰富，并不自动代表学习效果越好；能否得到正确反馈、是否符合课程目标、能否帮助学生说出原因，才是更重要的评价标准。

## 关于“开源”与授权

这份清单不是 10 个都已确认开源的软件目录。原帖本身指出 WeduLab 的开放状态未确认，也没有为 Sael 提供代码链接。对部分其他仓库，本次 GitHub API 没有检测出顶层许可证字段。在线免费、公开网页、GitHub 可访问和开源许可证是不同概念。

若要将代码或教学素材用于课程、商业产品或二次分发，请逐项核对代码、图片、音频、数据集和第三方库的许可证及署名要求；如果没有明确许可证，先联系项目维护者取得许可。

## 参考来源

- 洛克船长（[@slashui](https://x.com/slashui)）：[X 帖《最近关注的 10 个 AI 教育开源项目》](https://x.com/slashui/status/2116383058735554610)，发布于 2026 年 10 月 31 日。
- [WeduLab 在线实验室](https://wedulab.com/?lang=en)
- [Tongjiang Lab 项目仓库](https://github.com/smithjohn78390/tongjiang-lab)
- [Wrong Notebook 项目仓库](https://github.com/margrop/wrong-notebook)
- [cn-math-taxonomy 项目仓库](https://github.com/xiaoyang111222/cn-math-taxonomy)
- [Dinosaurs to Birds 课程](https://iamtechartist.com/dinosaurs-to-birds/)、[Breathing and Respiration 课程](https://iamtechartist.com/breathing-and-respiration/)和 [Every Joule 课程](https://iamtechartist.com/every-joule/)
- [Teachable Figures 项目仓库](https://github.com/ywEdAi/teachable-figures)
- [Word Atlas 项目仓库](https://github.com/designfuchen/word-atlas)
