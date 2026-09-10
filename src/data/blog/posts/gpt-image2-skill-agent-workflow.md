---
title: GPT-Image2-Skill：把图片提示词库接入 Codex 和 Claude Code
description: 介绍 GPT-Image2-Skill 的 Agent Skill 与 CLI 工作流，说明如何从案例搜索、生成图片、编辑参考图到反推提示词，并梳理接入时的权限和配置边界。
date: 2026-09-10
category: 开发工具
tags: [GPT-Image2-Skill, GPT Image, Codex, Claude Code, Agent Skill, CLI]
readTime: 10
relatedPath: /docs/blog/gpt-image-prompt-toolbox-overview/
relatedTitle: GPT Image 提示词工具箱：六个开源项目的完整地图
---

如果每次生图都要手工翻案例、复制 Prompt、替换变量，再切换到图片工具执行，提示词库很快就会变成新的操作负担。`wuyoscar/GPT-Image2-Skill` 的方向是把图片案例和生图能力接入 Agent 工作流。

## 它提供什么

项目包含图片案例、Agent Skill 和 CLI，覆盖几类常见操作：

- 根据文字描述生成图片；
- 使用参考图进行编辑；
- 组合多张参考图；
- 使用 Mask 做局部重绘；
- 从参考图分析并生成候选 Prompt；
- 将图片任务接入 Codex、Claude Code 等 Agent 工作流。

它的重点不是替代图片模型，而是减少“找案例、写指令、执行、继续修改”之间的手工切换。

## 一个 Agent 生图流程

```text
描述目标
  → Agent 判断任务类型
  → 查找相近案例
  → 生成候选 Prompt
  → 替换主体和约束
  → 调用图片模型
  → 检查结果
  → 继续编辑或结束
```

用户不必一开始就写完整 Prompt，只需要提供任务、主体、场景和限制。Agent 可以先给出候选方向，再由用户确认。

## 图片反推 Prompt 的价值

当手里已经有一张喜欢的参考图时，视觉模型可以帮助拆解：

- 主体和背景；
- 构图和镜头；
- 光线、材质和色彩；
- 风格和后期效果；
- 文字区域和版式；
- 可继续修改的生成指令。

反推结果不能被当作原始 Prompt 的准确恢复。它更像一份“如何接近这个画面”的结构化描述，仍然需要根据自己的主体和模型重新调整。

## 接入 Agent 时的边界

Skill 安装前应检查：

- 当前 Agent 是否已经存在相同能力；
- Skill 的安装范围是项目级还是用户级；
- CLI 需要哪些依赖和环境变量；
- 图片和 Prompt 是否会被发送到外部模型服务；
- 输出目录和生成文件是否包含敏感内容。

不要因为 README 提供了安装命令，就自动覆盖已有 Skill、修改全局配置或创建 API Key 文件。凭据应保存在受控环境中，不应写入 Prompt、日志或 Git 仓库。

## 什么时候值得使用

它适合：

- 已经有固定的图片生产任务；
- 经常使用参考图编辑；
- 需要连续生成一组相关视觉；
- 想让 Agent 参与 Prompt 搜索和修改；
- 不想在多个工具之间反复复制内容。

如果只是偶尔生成一张图片，直接使用模型界面可能更简单。Skill 的价值在重复任务和工作流整合中才会体现。

## 总结

GPT-Image2-Skill 可以被理解为图片模型之上的 Agent 操作层：它把案例检索、Prompt 改写、图片生成和编辑串成一条流程。具体安装方式、模型支持和 CLI 参数会随仓库变化，请以 [当前项目 README](https://github.com/wuyoscar/GPT-Image2-Skill) 为准。
