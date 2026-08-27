---
title: DeepSeek Harness 架构全解：从 Model + Harness 到插件树、Session Log 与安全管线
description: 整理 Russell 关于 DeepSeek Harness 的架构长文，解释 Agent = Model + Harness、Profile、Cordis 插件生命周期、Turn 与 Step、Session Log、工具审批、Capability Seam、子 Agent 与远程沙箱。
date: 2026-08-27
category: 技术教程
tags: [DeepSeek Harness, Agent Harness, AI Agent, Session Log, Cordis, Capability Seam, 子 Agent]
readTime: 16
relatedPath: /docs/blog/deepseek-harness-complete-guide/
relatedTitle: DeepSeek Harness 进阶玩法
---

很多人评估 Agent 时，会先看模型：参数量、推理能力、代码分数、上下文长度和价格。但 Agent 真正开始工作后，决定结果的不只有模型。谁把网页、文件、终端、权限、日志、状态和失败恢复接起来，谁就决定了模型能不能把一件事做完。

DeepSeek 在介绍 Harness 时给出过一个很关键的公式：

```text
Agent = Model + Harness
```

模型像脑子，Harness 像电脑、办公软件、文件柜、权限制度、操作记录和项目经理。一个模型如果只能回答文字问题，和同一个模型被放进能读文件、运行命令、搜索、分派任务并恢复上下文的环境里，实际能力会差很多。

本文整理自 Russell 的 X 长文《[Deepseek Harness 一文全看懂](https://x.com/russell3402/status/2092535898034630816?s=46&t=kbycgdkMqGULzFdZ33u7eg)》，将原文里的架构概念重新编排为一份工程化说明。重点不是复述所有术语，而是回答：DeepSeek Harness 到底把 Agent 的哪些部分拆成了可替换组件，这些组件为什么影响安全、可恢复性和企业部署。

## 先看结论：Harness 负责把模型意图变成受控行动

模型本身不会直接打开网页、写文件或运行终端。它输出的是意图，例如：

```text
读取某个文件
搜索一组资料
运行一条命令
把结果写入文档
委派一个子 Agent
```

Harness 接住这份意图后，才会继续处理：

```text
检查工具是否存在
  → 检查当前 Agent 是否有权限
  → 校验参数格式
  → 触发审批或安全策略
  → 调用真实文件系统、Shell、搜索或外部服务
  → 记录工具调用和结果
  → 把结果整理进下一次模型请求
```

一套成熟的 Harness 至少要处理六类问题：

| 问题 | Harness 的职责 |
| --- | --- |
| 上下文 | 给模型准备 System Prompt、历史、工具表和任务状态 |
| 工具 | 暴露文件、Shell、搜索、浏览器、子 Agent 等能力 |
| 权限 | 判断哪些动作需要拒绝、确认或限制范围 |
| 状态 | 记录 Turn、Step、工具调用、Todo 和中断位置 |
| 恢复 | 崩溃、取消或超时后知道发生过什么 |
| 扩展 | 让模型、工具、存储、沙箱、UI 和工作流可替换 |

因此，Harness 不是“模型外面包一层 UI”。它是 Agent 能不能长期运行、被审计、被恢复和被企业安全接纳的关键系统。

## DeepSeek Harness 是产品，也是 Agent 组装框架

DeepSeek Harness 既可以被普通用户当作 Coding Agent 产品使用，也可以被开发者当作 Agent 运行框架理解。

普通用户看到的是：

- Web 界面；
- 文件读取与编辑；
- Shell 命令；
- 搜索和工具调用；
- 会话轨迹；
- 插件和模式。

开发者看到的是另一层：

```text
Profile
  → 插件树
  → 服务 Provider
  → Agent Loop
  → 工具注册表
  → Session Log
  → UI Slot
  → 沙箱与权限策略
```

DeepSeek Harness 当前仍属于快速演进阶段，公开资料中也提示过 Developer Preview 和兼容性变化风险。因此，把它用于生产系统前，应先区分“架构允许这样做”“官方示例展示过这样做”和“已经在稳定生产环境验证”这三件事。

## Profile：一整套 Agent 配方

DeepSeek Harness 的 Profile 可以理解为一份 Agent 配方。它决定这次启动时使用哪个模型、加载哪些插件、开放哪些工具、采用什么存储、是否有 Web UI、是否允许子 Agent，以及采用什么安全策略。

它类似一份工位配置：

```text
模型 Provider
  + 工具集合
  + Session 存储
  + Agent Loop
  + UI 面板
  + 沙箱
  + 审批策略
  + 可选 Overlay
```

这也是 DeepSeek Harness 说 “Everything is a Plugin” 的核心。它不是简单支持安装扩展，而是把模型适配器、工具注册、会话日志、沙箱、上下文压缩、子 Agent、UI 和模式预设都放进插件组合里。

这里要避免一个误解：可插拔不代表系统没有核心契约。DeepSeek Harness 仍然需要基础接口、生命周期和约束，否则插件之间无法协作。“没有必须修改的特权核心”更准确的含义是：开发者可以通过配置和插件提供另一种实现，而不是 Fork 主仓库再改内部代码。

## Cordis：插件生命周期必须能干净卸载

插件系统难的地方不是加载，而是卸载后能不能恢复干净。

一个插件可能注册工具、监听事件、提供服务、修改 UI、挂载主题变量或启动后台任务。如果卸载后这些副作用还残留，Agent 的行为就会变得不可解释：工具还在、事件还触发、UI 还显示，但对应插件已经不存在。

DeepSeek Harness 使用 Cordis 这类插件生命周期机制来管理副作用。可以把插件运行看成：

```text
加载插件
  → 注册服务、工具或 UI
  → 运行期间产生 Effect
  → 停止插件
  → 清理 Effect
  → 回到一致状态
```

这对 Agent 系统很重要。因为 Agent 的工具清单会进入模型请求，如果工具残留或 Schema 过期，模型可能会调用一个已经不可用、权限不明或实现变化的能力。

## Turn 和 Step：一次任务不是一次模型调用

用户说一句话，可以启动一个 Turn；但一个 Turn 内部可能包含多个 Step。每个 Step 都可能经历一次模型请求、一次或多次工具调用、结果回传和下一步判断。

可以用下面的结构理解：

```text
Turn 开始
  Step 1：模型分析任务并读取文件
  Step 2：模型根据文件结果运行测试
  Step 3：模型根据测试失败修改代码
  Step 4：模型再次运行测试并总结
Turn 结束
```

这种拆分让 Agent 可以在一个用户任务中连续行动，但每一步又有清晰边界。边界越清楚，越容易做日志、审批、恢复、计费和调试。

## 为什么每个 Step 都重新组装 Prompt？

DeepSeek Harness 会在每个 Step 重新组装面向模型的请求内容，包括 System Prompt、历史消息、工具 Schema、模型参数和可见状态。

原因很直接：Agent 运行过程中环境会变化。

- 用户可能切换模型；
- 插件可能加载、卸载或注册新工具；
- Agent 可能进入不同模式；
- 权限策略可能改变；
- 子 Agent 可能拥有自己的 Persona 和工具范围；
- 上下文可能被压缩。

每个 Step 重新组装，能保证下一次模型请求反映当前环境。代价是：如果工具表、Prompt 或插件排序变化，模型服务端的 KV Cache 可能从变化点开始失效，延迟和成本也会受到影响。

这也是为什么 Session 中要记录 Request Header：模型当时看到什么工具、什么 System Prompt、什么模型参数，不能只靠事后猜。

## Session Log：唯一事实来源

DeepSeek Harness 架构中一个关键原则是：模型可见的内容必须被记录。

Session Log 不是普通聊天记录，而是一条只追加的事件流。它记录：

- Turn 开始和结束；
- Step 开始和结束；
- 用户消息；
- 模型输出；
- 工具调用和工具结果；
- 审批、拒绝和取消；
- Todo、Steering 消息和模式变化；
- 每次请求的模型、Prompt 和工具 Schema 快照。

这接近 Event Sourcing 的思路：系统不只保存“现在是什么状态”，而是保存“哪些事件一步步造成了现在的状态”。

对 Agent 来说，这条日志可以同时服务多个功能：

| 功能 | 依赖 Session Log 的原因 |
| --- | --- |
| Resume | 重新加载任务并知道历史发生过什么 |
| Fork | 从已经完成的历史边界创建分支 |
| Replay | 重放运行轨迹和工具调用 |
| Trajectory | 在界面中查看每一步模型和工具行为 |
| Telemetry | 统计模型调用、工具调用、错误和成本 |
| Persistence | 保存为 JSONL、SQLite 或其他持久化形式 |

如果 UI、评测系统和恢复系统各自维护一份历史，就很容易互相矛盾。让 Session Log 成为事实来源，可以减少这种分裂。

## Compaction：压缩的是模型视图，不是历史事实

长任务会遇到上下文窗口限制。历史越来越长，请求越来越贵，最终还会超过模型可接收范围。

DeepSeek Harness 的压缩思路可以分成两层：

```text
Raw Log：保存完整事件事实
Surface：决定下一次模型请求看到什么
```

Compaction 插件可以把早期历史总结成摘要，放到模型下一次看到的 Surface 上；但原始 Session Log 仍然保留。也就是说，系统没有把过去发生的事件涂改掉，只是给模型提供一份更短的工作视图。

这一区分很关键。摘要适合降低上下文压力，但不能替代原始审计日志。排查争议、恢复错误或分析模型行为时，仍应回到 Raw Log。

## 崩溃恢复：恢复边界必须明确

Agent 运行中可能在工具调用前、中、后崩溃。DeepSeek Harness 的恢复逻辑会用状态标记帮助模型避免盲目重复有副作用的操作。

例如：

```text
TOOL_NOT_STARTED
TOOL_OUTCOME_UNKNOWN
```

前者表示模型请求已经产生，但工具可能还没开始；后者表示工具调用已记录，但结果未知。对于写文件、发请求、提交表单或调用外部 API 这类有副作用动作，未知状态不能简单重跑。

当前实现也需要说清楚限制：恢复并不等于从半个 Turn 的中间无缝续跑。系统通常会先为未闭合的调用、Step 和 Turn 补上结束记录，再从新的回合继续。

## 工具安全管线：先记录，再执行，再收紧

模型提出 `write_file` 或 `bash` 这类工具调用后，Harness 不应该直接交给操作系统。更稳妥的管线是：

```text
记录 tool/call
  → 校验参数
  → 请求审批
  → 经过 Guard
  → 检查文件或沙箱策略
  → 执行真实动作
  → 记录 tool/result
```

其中有几个设计点特别重要。

### 先记录调用

即使后续审批拒绝或工具失败，也应该记录模型曾经提出过这次操作。否则审计时只能看到“没有执行”，看不到“模型想执行什么”。

### 审批采用 fail-closed

审批系统异常时，默认应该拒绝，而不是为了继续任务自动放行。审批结果也不应被解释成永久权限，一次批准只对应一次具体请求。

### Guard 只能收紧

上游已经拒绝的操作，后续 Guard 不能重新批准。它可以发现更多问题并继续拒绝，也可以保持沉默，但不能把已经被拦下的动作放行。

### 文件操作需要额外策略

文件编辑前可以检查路径是否在允许范围内、文件是否已被读取、当前沙箱是否允许写入、是否触及敏感目录。安全策略不应该散落在 Agent Loop 里，而应进入工具管线和能力接口。

## Capability Seam：上层工具不绑定底层实现

DeepSeek Harness 把一类可替换接口称为 Capability Seam，可以理解为“能力接缝”。一条接缝通常有三个角色：

| 角色 | 作用 |
| --- | --- |
| Service Definition | 定义统一接口 |
| Service Provider | 提供具体实现 |
| Consumer | 使用这项能力，通常是模型可见工具或其他插件 |

以文件系统为例，上层工具可以继续调用同一套 `ctx.fs` 接口；Provider 可以换成本地文件、容器文件系统或远程沙箱。工具名和 Agent Loop 不必跟着改。

这种分层对企业环境很有价值。开发者可以在笔记本上用本地实现，部署时换成权限受限的远程沙箱；Agent 上层逻辑保持一致。

它也带来抽象成本。Service Definition、Provider、Consumer 和策略插件必须遵守同一契约。小项目只有一个固定后端时，不需要为了抽象而抽象。

## 四种模式其实是不同插件组合

DeepSeek Harness 的 Standard、Code、Minimal 和 Creator 模式，不是四套完全独立的 Agent，而是同一内核在不同插件组合下呈现出的工作方式。

| 模式 | 核心特点 | 适合场景 |
| --- | --- | --- |
| Standard | 文件、Shell、搜索、Skills、计划、子 Agent 和 Workflow 等能力较完整 | 日常 Coding Agent 和多工具任务 |
| Code | 通过 `run_code` 入口让模型编排一段 TypeScript 或 Python 工具调用程序 | 批处理、并行只读调用、多步骤自动化 |
| Minimal | 只保留持久 Shell 和文件编辑器等基础能力 | 评测、隔离变量、观察模型纯编程能力 |
| Creator | 在 Standard 基础上增加运行时检查、插件试验和 Preset 编写能力 | Harness 开发、插件创建、模式预设设计 |

Code Mode 不代表安全管线消失。模型写出的程序内部如果调用文件、Shell 或子 Agent，仍应经过权限、沙箱和日志记录。

Creator Mode 也不等于“AI 可以无条件重写自己”。它更准确的定位是 Harness 开发与实验环境，用来检查当前插件树、试验组件组合并生成新的配置。

## 子 Agent 也是可替换 Provider

复杂任务经常需要分工。DeepSeek Harness 没有把子 Agent 固定成一种内部线程，而是通过统一接口让不同 Provider 启动不同类型的子任务。

可能的实现包括：

- 当前进程中的新 Agent；
- 从父任务历史 Fork 出来的 Agent；
- 通过 ACP 启动的外部 Agent；
- Codex 或 Claude Code 子进程；
- 通过 SDK 启动的另一套 DSH 实例。

这里最容易误解的是 Fork。Fork 子 Agent 复制的是父 Session 中已经完整结束的 Turn，不复制还在运行的半截工具调用；它继承的是对话历史，不是权限。子 Agent 知道父任务发生过什么，不代表它自动获得父 Agent 的全部工具授权。

这个边界对企业场景很重要。否则一个被委派的小任务，可能因为继承了过宽权限而触及不该访问的目录、命令或外部系统。

## DSH 能扩展出的四类能力

Russell 原文最后将架构能力落到几个例子。这里重新整理成四类。

### 1. 对话中临时创建工具

在 Creator 或 Cordis 相关示例中，Agent 可以检查当前 Service、事件、工具 Schema 和 UI Slot，然后定义一个临时插件，让它注册新的工具或界面面板。

这不是“模型随便执行代码”。更合理的生命周期是：

```text
检查当前运行环境
  → 定义插件代码和参数
  → 生成不可变 Package
  → 经审批后运行
  → 下一个 Step 重新组装工具表
  → 模型才能调用新工具
```

如果实验失败，停止当前 Run 应该清理工具、监听器和 UI Effect；插件定义和旧版本是否保留，则由生命周期机制决定。

### 2. 多 Agent 工作流

Workflow 工具可以让模型写一段编排脚本，使用 `agent()`、`pipeline()`、`parallel()`、`phase()` 和 `log()` 等能力，把大量独立任务拆给多个子 Agent。

这适合文件审查、调研汇总、批量分析和多阶段复核。需要注意的是，工作流脚本应该只负责排班；真正读文件、查资料和执行动作的仍然是子 Agent，并受到并发数、工具权限和沙箱限制。

### 3. 提醒和跨会话记忆

Schedule Overlay 可以给当前 Session 增加提醒类工具，把到期提醒排成普通 Follow-up Turn。它更像当前项目白板上的定时便签，不是永远在线的云端 Cron 系统。

记忆能力则通常通过 MCP 接入外部 Memory 服务。DeepSeek Harness 负责启动或连接 MCP Server、发现工具并暴露给模型；数据库初始化、数据迁移、模型选择和长期一致性仍属于外部记忆系统。

这一区分和我们之前讨论的 Session 与 Memory 边界一致：Session 是运行事实，Memory 是面向未来的上下文资产。

### 4. Headless、JSON-RPC、ACP 和远程沙箱

DeepSeek Harness 可以不只运行在 Web 界面里。Headless Profile 可以接收一次任务、创建 Session、输出最终结果并退出，适合 CI、Git Hook 或自动化脚本。

JSON-RPC SDK 更适合让 Python 或其他程序控制 Agent 生命周期。ACP 则可以把 DSH 作为可被父 Agent、IDE 或自动化平台驱动的外部 Agent 进程。

远程沙箱类 POC 展示了 Capability Seam 的价值：上层工具名称不变，底层文件系统、Bash、PTY 或 LSP Provider 可以转到远程环境。但这不应被描述成完整云端 Harness；模型调用、Session、日志和 Skills 是否仍留在 Host，需要看具体实现。

## 什么时候应该学习这些底层概念？

如果只是让 DSH 帮你改一个小文件，不需要一开始就理解所有架构术语。但以下场景必须理解 Harness 层：

- 要把 Agent 接入企业数据和内部系统；
- 要开发插件或自定义模式；
- 要审计一次 Agent 为什么做了某个动作；
- 要支持任务恢复、Fork、Replay 或评测；
- 要把本地工具切换到容器或远程沙箱；
- 要让多个 Agent 并行工作并隔离权限；
- 要区分 Session、Memory 和业务事实。

可以用一条判断规则：如果失败后只需要重新问一次，产品层知识就够了；如果失败后要还原“模型看到了什么、调用了什么、谁批准了什么、真实执行了什么”，就必须理解 Harness 架构。

## 给开发者的实践清单

在 DSH 或任何 Agent Harness 上做扩展时，可以用这份清单约束设计：

- 每个工具都要有清晰 Schema、权限和失败语义；
- 有副作用工具先记录调用，再执行；
- 审批异常默认拒绝；
- Guard 只能收紧，不能放宽；
- 文件写入前检查路径、读取历史和沙箱策略；
- 插件卸载后必须清理工具、监听器、UI 和后台任务；
- 每次模型请求记录 Prompt、模型配置和工具 Schema；
- 压缩上下文时保留原始事件日志；
- 子 Agent 继承历史不等于继承权限；
- 远程沙箱替换 Provider 时，上层接口和安全边界都要重新验证。

## 总结

DeepSeek Harness 的重点不只是“又一个 Coding Agent”。它把 Agent 的运行环境拆成可组合、可记录、可替换的组件：Profile 负责配方，Cordis 负责插件生命周期，Turn 和 Step 负责执行边界，Session Log 负责事实来源，工具管线负责安全约束，Capability Seam 负责替换底层实现，子 Agent Provider 负责分工与外部协作。

理解这些概念后，再看 Agent 的能力会更清楚：强模型很重要，但没有可靠 Harness，模型只能给出意图；有了可审计、可恢复、可扩展的 Harness，意图才有机会变成受控行动。

### 来源说明

本文整理自 Russell 的 X 长文《[Deepseek Harness 一文全看懂](https://x.com/russell3402/status/2092535898034630816?s=46&t=kbycgdkMqGULzFdZ33u7eg)》，原帖发布于 2026 年 8 月 26 日，Obsidian 收录于 2026 年 8 月 27 日。文中对 DeepSeek Harness 架构、模式和示例的描述基于原帖与公开资料进行结构化改写；具体 API、插件、Profile 和 POC 状态会随项目更新变化，实践前应以 DeepSeek Harness 当前官方文档和仓库为准。
