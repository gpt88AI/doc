---
title: DeepSeek Harness 新手上手指南：安装、工作区、权限与插件
description: 根据 Leaf Yeah 的 DSH 长文和 DeepSeek Harness 当前官方文档，整理安装、模型配置、工作区选择、四种模式、权限、斜杠命令与首次实战，并标出安全和版本边界。
date: 2026-11-09
category: AI工具指南
tags: [DeepSeek Harness, DSH, DeepSeek, AI Agent, 新手教程, 插件安全]
readTime: 12
relatedPath: /docs/blog/deepseek-harness-complete-guide/
relatedTitle: DeepSeek Harness 进阶玩法
---

> 本文整理自 Leaf Yeah!（[@leaf_sanren](https://x.com/leaf_sanren)）的 [DeepSeek Harness 新手长文](https://x.com/i/article/2119771398092759040)及其[原帖](https://x.com/leaf_sanren/status/2119784114232729950)，原文发表于 2026-11-09。安装和工作区部分与 [DeepSeek Harness 官方 README](https://github.com/deepseek-ai/deepseek-harness/blob/master/README.zh.md)、[Web UI 指南](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/index.zh.md)和[安全说明](https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.zh.md)对照整理。原文中的日活、插件数量和排名、费用、跑分与社区趋势均是作者当时引用或记录的数字，不是本文独立核验的基准。

DeepSeek Harness（简称 DSH）是 DeepSeek 的开源 Agent Harness。网页版聊天主要围绕对话，而 Harness 会把模型、文件、工具、命令和插件组合成一个能在指定工作区执行任务的环境。它能帮助 Agent 读写获准访问的文件、运行命令和调用工具，也因此需要更认真地管理工作区、权限和第三方插件。

如果你已经会使用 DSH，本文的四种模式和插件机制可以接着看[进阶指南](/docs/blog/deepseek-harness-complete-guide/)。下面从第一次安装和跑通任务开始。

## 安装后先完成最小闭环

官方仓库当前给出的 Web UI 启动方式是安装 Node.js 后运行：

```bash
npx @deepseek-ai/dsh web
```

本机默认会在 `http://127.0.0.1:3080` 启动 Web UI。首次使用时，按照官方[使用 Web UI 指南](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/index.zh.md)添加并选中一个工作区，再到“设置 → 模型”配置 DeepSeek API Key；需要其他模型服务时，按[模型提供商配置说明](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/providers.zh.md)添加。具体菜单和模型入口会随版本变化。

工作区是 Agent 能读写的项目目录。官方文档说明，新的 Web UI 不会自动选中工作区；需要手动添加并选中。开始前先确认目录里有什么、是否包含密钥或个人文件。别因为 Agent 没找到一份资料，就直接扩大到整个电脑的访问范围。

第一次先做只读任务：

```text
阅读当前工作区的 README 和项目配置，说明项目用途、启动方法和主要目录。
只总结，不修改文件；不确定的地方单独列出。
```

确认回答符合实际后，再尝试一个可检查的小改动：

```text
先提出修改计划，并列出准备读取和修改的文件。
等我确认后再动手。完成后展示 diff，并运行相关检查。
```

这能先确认模型连通、工作区正确、工具调用可用，以及你能检查 Agent 做过的修改。

## 选模式：从标准模式开始

Leaf Yeah 的原文在 2026-11-09 把常见模式归纳为四类。模式名称和可用工具可能随版本或插件组合变化，实际应以当前 DSH 界面为准。

| 原文列出的模式 | 适合的任务 | 使用时注意 |
| --- | --- | --- |
| 标准 | 日常读写文件、搜索、计划和多工具任务 | 不确定时先从这里开始 |
| PTC 代码编排 | 文件多、重复步骤明确的批量任务 | 生成的 TypeScript 也是可执行代码，要先看范围和内容 |
| 极简 | 减少插件干扰、做模型基准测试 | 能力较少，通常不是日常默认项 |
| 创造 | 检查插件组合、开发插件或调整工作台 | 可能触及更广的环境，先用测试目录并审阅计划 |

原文比较了相同笔记整理任务在标准和 PTC 模式下的运行记录，并发现小任务中 PTC 的 Token 消耗反而更高。这只是作者在特定任务、模型和配置下的单次测量，不能推成通用结论。可操作的判断是：重复步骤很多时再试 PTC；文件少、任务简单时先用标准模式。

## 权限：只开放当前任务需要的范围

原文把当时界面中的权限概括成四档：仅查看、工作区内修改、完全权限和实验性的自动授权审查。权限选项会随版本和插件变化。官方安全说明明确指出，DSH 仍处于开发者预览阶段，尚未接受安全审计；沙箱和审批可以降低风险，但不能保证隔离或防止损害。

日常练习先选择范围较小的工作区，并保留操作审批。执行下面这些动作之前要特别留意：访问工作区外文件、运行脚本、安装插件、连接已登录网页、发送消息或更改远程数据。权限开得更宽，不会让 Agent 的判断自动变得可靠。

DeepSeek 官方建议在一次性虚拟机、容器或专用环境中运行，遵循最小权限原则，备份可访问的文件，并在允许运行前检查插件、配置和命令。不要把 DSH 当成处理不可信任务时唯一的安全隔离措施，也不要把敏感凭据交给不必要的模型、插件或网页。

## 斜杠命令：先看当前菜单

原文记录了 `/plan`、`/permission`、`/compact`、`/file`、`/model`、`/goal`、`/feedback` 和 `/export` 等命令。命令由插件注册，随会话加载的插件不同，可用列表可能改变；输入 `/` 后看到的当前菜单才是本机可用命令的依据。

其中几个命令的用途容易理解：`/plan` 让 Agent 先列计划；`/compact` 整理较长对话的上下文；`/model` 切换会话模型；`/export` 导出会话记录。使用前仍应阅读当前界面给出的说明，尤其是会触发文件、权限或持续任务变化的命令。

## 插件：先解决一个具体问题

原文整理了 15 个社区插件，并称其为“必装”。插件生态更新很快，数量、Star 数、维护状态和兼容情况都可能变化；列表不构成官方背书，也不表示每个插件都适合安装。

更稳妥的选择方式是：

1. 先写清楚要解决的问题，例如“需要 Agent 看截图”或“需要查看长对话的上下文占用”。
2. 找到插件的原始仓库，确认发布来源、最近维护、依赖和版本要求。
3. 检查它会读取哪些文件、调用哪些服务、申请哪些权限，以及是否会上传内容。
4. 先在测试工作区安装一个插件，用无敏感信息的小任务验证，再决定是否保留。

插件可以增加视觉、搜索、浏览器操作或自动化能力，也可以读取会话、操作页面和访问外部服务。把它当作第三方程序审查，比只看演示效果更可靠。安装失败或 DSH 更新后不兼容时，先查插件仓库和当前版本说明，不要从不明来源复制安装命令。

## 把一个真实小任务跑通

原文用课程笔记整理作为第一次实战。可以将练习约束成如下步骤：

1. 新建一个不含隐私资料的练习目录，并把几份公开或虚构笔记放进去。
2. 选择并确认该工作区，先要求 DSH 只读取文件、提出整理计划。
3. 检查计划是否覆盖每个文件，是否有目录外访问或其他不必要操作。
4. 确认后让它生成一份学习清单，并保留原始笔记。
5. 打开生成文件核对内容，检查版本控制差异；如有脚本或代码，再运行相应检查。

这个练习检验的是工作区、权限和验收流程，不是比较模型谁更聪明。原文报告的一次完成用时和 Token 数只适用于作者当时的环境，不能作为你的速度或费用预期。

## “养鱼”玩法与外部账号

社区把为 DSH 配置角色、记忆、桌面宠物或外部平台交互，称为“养鱼”。这类玩法会把 Agent 的活动从本地工作区扩展到 QQ、B 站、抖音等外部平台；发布评论、自动发消息或持续轮询都可能带来账号、隐私、平台规则和 API 费用风险。

尝试前先检查插件的读写范围和触发方式，使用专用测试账号，关闭不需要的公开发布功能，并设置调用预算和停止条件。不要给群聊 Agent 超出任务所需的权限，也不要让自动化在未经确认时公开发言、提交表单或处理他人数据。原文提及的“鱼灾”、播放量和花费属于作者引用的社区案例，具体规模和费用没有在本文独立复核。

## 使用前的版本与安全提醒

- DSH 官方仓库将当前项目标为开发者预览，并提示未来会有不兼容变更。
- 官方安全说明指出，DSH 可以执行模型生成的命令、加载第三方插件并访问获准的文件和网络；错误配置或恶意输入可能造成文件损坏或数据泄露。
- 模型服务、搜索服务和其他 API 可能单独计费。软件开源或可安装，不代表模型调用免费。
- 原文中的界面、插件、模式、Token 数、费用和平台案例都有时间与配置边界，操作前请查当前官方文档、插件仓库与自己的账户计费页面。

## 来源

- Leaf Yeah!，[DeepSeek Harness 从入门到精通：4 种模式、8 条指令、15 个必装插件](https://x.com/i/article/2119771398092759040)，发布于 2026-11-09；[原帖](https://x.com/leaf_sanren/status/2119784114232729950)。
- [DeepSeek Harness 官方 README](https://github.com/deepseek-ai/deepseek-harness/blob/master/README.zh.md)与[使用 Web UI 指南](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/index.zh.md)。
- [DeepSeek Harness 官方安全说明](https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.zh.md)。
- [DeepSeek Harness 进阶玩法：Agent Teams、动态工作流与自然语言开发插件](/docs/blog/deepseek-harness-complete-guide/)。
