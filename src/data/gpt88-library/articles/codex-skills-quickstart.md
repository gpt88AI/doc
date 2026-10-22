> **GPT88 使用说明**
> 模型名、版本、默认值和平台入口可能随客户端版本变化，请按 GPT88 当前模型目录和客户端显示核对。
>
> [快速开始](/docs/quickstart/) · [模型导航](/models/) · [GPT88 API Key 管理](/docs/guides/api-key-management/)

当你反复让 Codex 检查 Bug、审核改动或整理发布说明时，可以把稳定的步骤写成 Skill。一个 Skill 是包含说明与可选资源的目录；Codex 先了解它的名称和用途，决定使用时再读取完整说明。它不会训练模型，也不能保证每次输出都正确。

本篇带你创建一个项目内可共享的 Skill，显式调用它，并检查自动发现与触发是否正常。项目的通用规范仍放在 [AGENTS.md](/docs/guides/gpt88-library/codex-project-instructions/)，不要把所有工作规则都塞进一个 Skill。

## 第一步：选择保存位置

当前官方文档推荐以下本地发现路径：

| 使用范围 | 保存位置 |
| --- | --- |
| 当前项目共同使用 | 项目根目录/.agents/skills/ |
| 个人跨项目使用 | $HOME/.agents/skills/ |

`$HOME` 表示用户主目录，在 Windows 上通常对应用户配置目录。Codex 会从当前工作目录向上扫描到仓库根目录，读取沿途 `.agents/skills` 中的 Skill。团队可以把项目目录纳入 Git，随代码审阅和更新。

本例使用项目级目录：

~~~text
.agents/
  skills/
    project-brief/
      SKILL.md
~~~

某些既有环境还会出现其他历史或插件管理路径。新建项目 Skill 时按上述官方当前路径开始，不要凭文件夹名字猜测它一定能被当前客户端发现。

## 第二步：写一个最小可用 Skill

在 `SKILL.md` 中复制以下内容。开头的 YAML 必须包含 `name` 和 `description`；正文描述步骤、输出和边界。

~~~md
---
name: project-brief
description: 当用户希望快速了解当前代码仓库的结构、启动方式和主要模块时使用。适合项目入门说明，不用于实现功能或修复代码。
---

# 项目速览

1. 阅读 README、依赖配置、主要入口和顶层目录。
2. 按证据说明项目用途、技术栈和核心模块。
3. 从实际配置提取安装、启动和检查命令，不猜测不存在的脚本。
4. 输出「项目用途」「目录导览」「运行方式」「待确认事项」。
5. 为关键结论引用文件路径；无法确认的信息明确标注。
6. 此流程只做说明，不修改项目文件。
~~~

名称应稳定、容易记忆；描述要先写使用场景，再写不适用范围。`scripts/`、`references/` 和 `assets/` 都是可选目录。先把纯说明版用好，需要固定格式处理或重复计算时再增加脚本。

## 第三步：在对话中显式调用

在 Codex CLI 或 IDE 扩展的输入框运行 `/skills`，或输入 `$` 选择 Skill。也可以直接发送：

~~~text
$project-brief 帮我快速了解当前仓库，尤其说明如何启动和验证。
~~~

这是发给 Codex 的对话内容，不是 PowerShell 或 Bash 命令。完成后，检查它是否引用真实文件、命令是否存在，以及是否按照约定保持只读。

当前官方文档还说明：ChatGPT 桌面端可在侧栏 **Skills** 查看和管理 Skill，在 ChatGPT 输入框用 `@` 选择。CLI、IDE 与桌面界面入口可能不同；按你使用的界面操作，不要把 `$` 当作所有客户端的统一按钮。

## 第四步：验证自然语言触发

Skill 也可能在任务与 `description` 匹配时自动使用。可以在新任务中发送：

~~~text
我刚接手这个仓库，请说明它的目录结构、启动方式和核心模块。
~~~

观察 Codex 是否选择了 `project-brief`。再尝试“请修复登录按钮点击无反应”，确认这个只做项目说明的 Skill 不会抢占修复任务。隐式触发取决于描述、当前上下文和配置，不保证每次发生；需要明确使用时直接点选或提及它。

## 发现失败时怎么排查

- 确认文件名是大写的 `SKILL.md`，且位于一个独立 Skill 文件夹中。
- 确认 YAML 前后都有 `---`，并填写了有效的 `name` 和 `description`。
- 确认启动目录位于目标仓库内，项目 Skill 位于扫描范围内。
- 确认 Skill 没有被配置禁用；相同名称不会自动合并，重复名称可能造成选择混淆。
- Codex 会自动发现 Skill 变化；如果新内容未出现，重启后再测试。
- 如果显式调用有效而自然语言不触发，先改进用途描述，检查是否设置了禁止隐式调用的策略。
也可以在 Codex 对话中使用内置 `$skill-creator` 辅助创建，用 `$skill-installer` 安装额外 Skill。安装第三方内容前，应阅读它的说明和脚本，理解它会访问哪些文件和工具。

## 练习与验收

把项目速览 Skill 加入一个练习仓库，分别进行显式调用、自然语言匹配与无关任务测试。验收时核对输出格式、文件引用、命令真实性和工作范围，再与团队共享。Skill 中不要保存凭证，也不要写成忽略用户约束或自动取得外部发布权限。

接下来可复制 [3 个实战 Skill 模板](/docs/guides/gpt88-library/codex-skill-recipes/)，或把[问题修复流程](/docs/guides/gpt88-library/codex-debugging-workflow/)整理为自己的版本。

## 官方参考

核对日期：2026-10-19。教程路径、元数据与调用方式依据官方当前文档。

- [Build skills](https://learn.chatgpt.com/docs/build-skills)
- [Where Codex loads local skills](https://learn.chatgpt.com/docs/build-skills#where-to-save-skills)
- [How ChatGPT and Codex use skills](https://learn.chatgpt.com/docs/build-skills#how-codex-uses-skills)
