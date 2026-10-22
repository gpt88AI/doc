> **GPT88 使用说明**
> 模型名、版本、默认值和平台入口可能随客户端版本变化，请按 GPT88 当前模型目录和客户端显示核对。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

从一次可验收的小改动开始，把 Codex 用进日常开发，再把反复使用的步骤整理成 Skill。本栏目按「读懂项目 → 开发与修复 → 审查交付 → 固化流程」组织，适合已经完成接入、希望真正用起来的开发者和网站维护者。

这里的练习以你自己的项目为上下文。每篇都提供可以复制到 Codex 对话中的提示词、操作步骤与验收清单；示例中的页面名称、文件路径和分支名称需要按实际项目替换。

## 先选一条学习路线

| 你的情况 | 建议路线 | 完成后应得到什么 |
| --- | --- | --- |
| 第一次用 Codex 处理项目 | 项目上手 → 功能开发 → 代码审查 | 一次能说明改动、验证结果的小功能交付 |
| 已有项目遇到故障 | Bug 修复 → 代码审查 | 可重复的复现步骤、根因与回归证据 |
| 每次都要重复交代要求 | AGENTS.md → Skills 入门 → Skill 模板 | 项目约定和可重复调用的工作流程 |

## 第一阶段：读懂项目，再动手

- [01 · 项目上手](/docs/guides/gpt88-library/codex-project-onboarding/)：选择项目目录、确认工具链、完成第一次小修改。
- [02 · 功能开发实战](/docs/guides/gpt88-library/codex-feature-workflow/)：用订单筛选练习把需求、边界状态和验收连起来。
第一次练习建议选择一个范围清楚的功能，例如增加列表筛选或修正空状态文案。开始前保存已有工作，并让 Codex 先看 README、项目约定和相关文件。目标是能看懂它改了什么，也知道如何判断改动是否有效。

## 第二阶段：修复问题，检查交付

- [03 · Bug 修复实战](/docs/guides/gpt88-library/codex-debugging-workflow/)：提供复现步骤、定位根因、做最小修复并回归。
- [04 · 代码审查实战](/docs/guides/gpt88-library/codex-review-workflow/)：根据真实改动找问题，给出文件位置、影响与验证方法。
把「完成」写成具体行为。例如搜索词清空后恢复列表、筛选变化后回到第一页、没有结果时显示提示。检查应使用项目真实存在的命令，并辅以实际操作；没有执行的检查需要明确记录。

## 第三阶段：把经验保存下来

- [05 · 用 AGENTS.md 固化项目约定](/docs/guides/gpt88-library/codex-project-instructions/)：约定代码风格、真实检查命令和交付标准。
- [06 · 创建你的第一个 Skill](/docs/guides/gpt88-library/codex-skills-quickstart/)：从目录、SKILL.md 到发现与调用，完整跑通一次。
- [07 · 三个可复制的 Skill 模板](/docs/guides/gpt88-library/codex-skill-recipes/)：Bug 排查、代码审查、发布说明，按项目修改后复用。
| 工具 | 适合保存的内容 | 示例 |
| --- | --- | --- |
| 一次性提示词 | 本次任务的目标、上下文和验收条件 | 为订单列表增加状态筛选 |
| AGENTS.md | 对这个项目持续适用的工作约定 | 使用既有组件；交付时列出实际验证结果 |
| Skill | 某类任务重复执行的步骤与输出格式 | 每次审查都检查边界条件并给出证据 |

Skill 中可以包含说明、参考资料和辅助脚本。先从一个简短、单一用途的 SKILL.md 开始，确认它在合适的任务中被调用，再按实际需要补充资源。

## 可以直接复制的任务骨架

把方括号中的内容替换为自己的需求，发送到已经打开项目的 Codex 对话中。路径、约束和验收越具体，越容易判断结果是否达到预期。

~~~text
目标：请在当前项目完成 [一个具体功能或修复]。
上下文：[相关页面、文件、复现步骤或已有实现]。
约束：[沿用的组件、接口约定、性能要求及本次改动范围]。
验收：[列出用户操作及应出现的结果，包括空值或失败情况]。

先阅读相关项目约定和代码，再完成实现。
发现会影响实现的关键缺失信息时，先说明问题。
运行项目已有且与改动相关的检查，并复验上面的操作步骤。
最后说明改动、验证结果，以及尚未验证的事项和原因。
~~~

## 一次练习的完成标准

- 能用一句话说明这次解决了什么问题。
- 能指出相关改动文件，并理解主要变化。
- 正常输入、空输入和失败路径都有明确的预期结果。
- 实际运行的检查有结果；没有运行的检查有原因。
- 如果把流程整理成 Skill，能用一个真实任务验证它的输出。
## 安装和接入文档

尚未安装或接入的用户，可先按系统完成下面的文档，再回来练习。本站 API 接入与官方账户登录是不同的配置路径，请选择与你实际使用方式对应的教程。

- [Windows 手动安装](/docs/guides/gpt88-library/codex-windows-manual/)
- [macOS / Linux 手动安装](/docs/guides/gpt88-library/codex-mac-linux/)
- [Windows 桌面端配置](/docs/guides/gpt88-library/codex-windows-desktop-config/)
- [子智能体数量配置](/docs/guides/gpt88-library/codex-subagent-concurrency/)
## 官方参考

- [OpenAI：Quickstart](https://learn.chatgpt.com/docs/quickstart)
- [OpenAI：Prompting](https://learn.chatgpt.com/docs/prompting)
- [OpenAI：Build skills](https://learn.chatgpt.com/docs/build-skills)
内容核对日期：2026-10-19。客户端入口与可用功能以当前版本为准；实战方法和示例可按项目工具链调整。
