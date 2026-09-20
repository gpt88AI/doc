---
title: Pi Agent 多智能体实战：用 pi-herdr-agents 搭建可监督的 AI 团队
description: 整理畅的科技工坊关于 Pi Agent、pi-herdr-agents、subagent 和 workflow 工作流的视频，并结合公开 GitHub 仓库核对安装、角色、并行执行、Herdr 面板、Git worktree 与审查边界，给出可复用的多智能体工程方法。
date: 2026-09-20
category: 开发工具
tags: [Pi Agent, pi-herdr-agents, Herdr, 多智能体, subagent, workflow, Git worktree, Agent工程]
readTime: 18
relatedPath: /docs/blog/jev-full-tutorial-three-demos/
relatedTitle: Jev 完整实战教程：用快速决策模型驱动浏览器、记忆与预测
---

把多个 AI Agent 放进同一个项目，并不等于拥有了一个可靠的 AI 团队。真正困难的是：谁负责拆题，谁可以修改文件，多个任务怎样并行，子 Agent 的结果如何回到主会话，Git 修改怎样隔离，以及失败后能不能恢复。

YouTube 视频《Pi Agent 多智能体实战：用 pi-herdr-agents 搭建 AI 团队｜subagent 自定义 + workflow 工作流编排｜旅行规划与 3D 赛车开发全流程教程｜附可复用开源配置》围绕这些问题演示 Pi Agent 与 `pi-herdr-agents` 的组合。视频页面公开显示的作者是 **畅的科技工坊**，视频地址为 [YouTube 原视频](https://www.youtube.com/watch?v=y1TXjYlRjBU)。

本文不是视频逐字稿。公开视频的字幕接口在本次整理时无法匿名获取，因此本文将视频标题和公开主题，与仓库 [giuseppecrj/pi-herdr-agents](https://github.com/giuseppecrj/pi-herdr-agents) 的 README、`package.json` 和公开目录交叉核对。视频中的旅行规划和 3D 赛车属于演示主题；下面关于插件能力、命令、角色和 Git 隔离的描述，以仓库当前公开资料为准。

![Pi Agent 多智能体与 workflow 工作流视频封面](/docs/blog/zh/pi-herdr-agents-multi-agent-workflow/img/pi-herdr-agents-video-thumbnail.jpg)

## 一、先看结论：多智能体系统的核心是调度边界

`pi-herdr-agents` 的定位不是“再提供一个聊天机器人”，而是把 Pi 的子 Agent 运行到 Herdr 的独立面板中，并提供一组围绕派发、监督、恢复和工作区管理的能力。

公开仓库给出的核心能力包括：

- 父会话可以异步派发一个或多个 subagent；
- 子 Agent 可以并行执行调查、实现或审查任务；
- 每个子 Agent 作为真实 Pi 进程运行在 Herdr 的独立 surface 中；
- 写入任务可以使用保留的 Git worktree 隔离工作区；
- 结果完成后自动回传父会话，而不是要求父 Agent 不断轮询日志；
- 可使用内置角色，也可以在项目或全局目录定义自定义角色；
- 可以保留一个有策略约束的 specialist，用于连续的多轮任务。

因此，一套可复用的多智能体工作流可以抽象成：

```text
主 Agent 拆解目标
  → scout 收集事实和代码路径
  → worker 在受限范围内实现
  → reviewer 检查结果和风险
  → 主 Agent 汇总证据、运行最终验证并决定交付
```

这里的关键是角色之间的边界。让五个 Agent 同时修改同一个 checkout，通常只会把一个问题变成五个相互覆盖的问题。

## 二、Pi、Herdr 与 pi-herdr-agents 分别负责什么

这三个名字容易混在一起，但职责并不相同。

| 组件 | 主要职责 | 不应被误解成 |
| --- | --- | --- |
| Pi | Agent 运行时、模型调用、工具和会话 | 一个天然会自动分工的团队系统 |
| Herdr | 终端工作区、pane、tab 和进程承载 | Git 版本隔离本身 |
| `pi-herdr-agents` | Pi 子 Agent 的派发、监督、回传和可选 worktree 编排 | 自动替你判断任务依赖的项目经理 |

Herdr 提供可观察的运行表面，插件负责把子 Agent 的生命周期接入父会话。Git worktree 只解决 checkout 隔离；它不自动解决数据库、端口、缓存、云资源或账号权限冲突。仓库 README 也明确提醒，worktree 隔离的是 Git checkout，而不是进程或权限。

## 三、安装路径与环境前提

公开仓库当前版本为 `2.0.2`，包名是 `pi-herdr-agents`，许可证为 MIT。项目要求：

- 已安装支持 package 的 Pi；
- 已安装 Herdr 及其 CLI；
- 从 `HERDR_ENV=1` 的 Herdr 环境中启动 Pi；
- 子 Agent 会继承当前用户的进程和文件权限。

安装插件：

```bash
pi install npm:pi-herdr-agents
```

项目本地安装或只对单次运行启用：

```bash
pi install -l npm:pi-herdr-agents
pi -e npm:pi-herdr-agents
```

启动顺序：

```bash
herdr
pi
```

安装后需要重启 Pi，或者在已有会话中执行 `/reload`。仓库建议在安装任何 Pi package 前先审阅包源码。这个建议很重要：插件本身可以创建进程、访问工作区并调用本地工具，不能因为它是 Agent 扩展就跳过依赖和权限审查。

## 四、从一个 subagent 调用开始

最小的自然语言入口可以是：

```text
Use two scouts in parallel to map the authentication flow, then summarize their findings.
```

也可以直接使用命令派发指定角色：

```text
/subagent scout Analyze the authentication module and report relevant files and risks
```

如果任务需要一个隔离的写入工作区：

```text
/worktree auth-fix Implement the approved authentication fix and run the focused tests
```

从工具角度，父 Agent 可以发起类似下面的两个独立任务：

```typescript
subagent({
  name: "Auth scout",
  agent: "scout",
  model: "<provider>/<fast-tier-id>",
  thinking: "low",
  task: "Map the authentication flow",
});

subagent({
  name: "DB scout",
  agent: "scout",
  model: "<provider>/<fast-tier-id>",
  thinking: "low",
  task: "Map the session schema",
});
```

调用返回 `started` 并不等于任务完成。正确的生命周期是：启动、观察子 Agent 状态、等待完成事件、读取有边界的结果、由父 Agent 继续下一步。父 Agent 不应只看到“已启动”就把整个工作流宣布成功。

## 五、角色设计：scout、worker 和 reviewer

仓库提供 `planner`、`scout`、`worker`、`reviewer`、`visual-tester`、`poteto` 和 `adversarial-reviewer` 等角色。它们不是不同品牌的模型，而是不同的任务边界和运行策略。

### Scout：只收集事实

scout 适合做：

- 查找模块和调用路径；
- 识别配置、测试和依赖关系；
- 标记风险、缺口和待验证假设；
- 输出文件路径、证据和建议，而不是直接修改业务代码。

一个好的 scout 任务应该有明确的范围：

```text
检查登录流程，从路由入口追到 session 写入。
只读取相关文件，不修改代码。
输出调用链、涉及的测试、两个最高风险点和证据路径。
```

### Worker：实现一个垂直切片

worker 应该接收已经澄清的目标、允许修改的文件、验证命令和停止条件。它不应该在没有父 Agent 许可的情况下扩展任务范围，也不应该把未验证的重构顺手塞进同一提交。

### Reviewer：独立检查结果

reviewer 关注行为回归、边界条件、安全风险、测试缺口和证据质量。审查结果应该包含文件和行号、触发条件、影响和最小修复建议，而不是只返回“看起来没问题”。

### Planner 与协调角色

planner 或 `poteto` 这类协调角色适合拆解任务和组织阶段，但仍应遵循父会话的授权边界。协调角色可以提出并行计划，不代表每个子任务都可以并行写入同一个 checkout。

## 六、并行执行的正确拆法

并行不是把所有事情同时启动。只有互不依赖、输入状态稳定、写入范围不冲突的任务，才适合并行。

适合并行：

```text
Scout A：调查认证调用链
Scout B：调查数据库 session schema
Scout C：检查现有测试覆盖
        ↓
主 Agent 汇总三份结果
        ↓
Worker：实施已确认的修改
        ↓
Reviewer：审查改动
```

不适合并行：

- 两个 worker 同时编辑同一个核心模块；
- 一个 Agent 修改 schema，另一个 Agent 同时假定旧 schema 并写业务逻辑；
- 一个 Agent 生成迁移，另一个 Agent 在未确认迁移前修改生产配置；
- 多个 Agent 同时运行会争抢同一端口、缓存目录或测试数据库的集成测试。

可以用下面的规则判断：

| 条件 | 建议 |
| --- | --- |
| 只读调查且目标不同 | 并行 |
| 修改不同文件且没有共享生成物 | 可以并行，但仍需集成审查 |
| 修改同一模块或同一配置 | 串行 |
| 依赖前一步输出 | 等待前一步完成 |
| 触碰真实外部资源 | 单独审批、限流和验证 |

## 七、worktree 解决什么，不能解决什么

对于写入任务，`/worktree <name>` 可以让任务在隔离 checkout 中进行。它适合：

- 让一个 worker 独立完成有边界的功能；
- 保留失败任务的现场，方便恢复；
- 避免多个写入 Agent 直接互相覆盖当前分支；
- 在主 Agent 审阅后再合并或摘取明确提交。

但 worktree 不能自动隔离：

- 同一个远程 API 账号；
- 本机固定端口；
- 共享的 Docker volume；
- 测试数据库和 Redis 实例；
- 用户目录中的凭据、缓存和配置；
- 由脚本写入 checkout 之外的全局文件。

因此，启动写入 Agent 前仍要声明：允许修改哪些路径、能否联网、是否可以提交、是否可以创建迁移、验证使用哪个临时资源，以及失败后如何停止。

## 八、把 workflow 做成可回放的阶段

视频标题中的 workflow 编排，最有价值的理解不是“让 Agent 自己无限循环”，而是把重复工作拆成有输入、有输出、有验收的阶段。

一个适合代码项目的 workflow：

```text
阶段 0：定义目标、范围、禁止事项和完成证据
阶段 1：scout 并行调查代码、依赖、测试和风险
阶段 2：主 Agent 形成实施任务和文件白名单
阶段 3：worker 在隔离 worktree 中实现
阶段 4：运行聚焦测试、静态检查和 diff 检查
阶段 5：reviewer 独立审查
阶段 6：主 Agent 合并、重跑关键验证并输出结果
```

每个阶段都要有明确的停止条件。例如“完成调查”不是“Agent 说已经看过了”，而是至少输出调用链、涉及文件、证据命令和未决问题；“完成实现”不是“代码写进去了”，而是聚焦测试、`git diff --check` 和受影响路径验证都通过。

## 九、自定义 Agent 角色

仓库支持在项目 `.pi/agents/<name>.md` 或全局 Agent 目录定义角色。角色文件可以声明描述、模型、thinking、工具、skills、session mode、是否允许继续派生 Agent，以及是否自动退出。

一个受限 reviewer 的示意：

```markdown
---
description: Reviews a bounded change for concrete correctness and security risks
thinking: high
tools: read, grep
session-mode: standalone
spawning: false
auto-exit: true
---

Review only the requested change. Report concrete findings with file and line
references, exploit conditions, severity, and the smallest safe correction.
Do not modify files.
```

这里的 `spawning: false` 和 `tools` allowlist 很关键：审查角色不应因为上下文不足就继续派生更多 Agent，也不应获得与审查无关的写入工具。自定义角色的名称、来源、能力声明和启动结果都应通过 `/subagent list` 与一次受控 smoke test 验证。

## 十、状态、回传与失败处理

多智能体系统最容易被忽略的是“完成消息”。一个子 Agent 结束后，父会话需要拿到有用的结果，而不是一个泛化的“任务结束”。`pi-herdr-agents` 的公开说明强调，完成结果会作为有边界的结果回传父会话；超长结果会被缩略，但完整结果保留在子会话中。

建议每个子 Agent 使用固定输出结构：

```text
状态：complete | blocked | failed
目标：本次处理了什么
证据：运行过的命令、文件和结果
改动：精确到文件的修改说明
风险：未验证的假设、回滚点和后续动作
建议：父 Agent 下一步应该做什么
```

遇到失败时，父 Agent 不要让另一个子 Agent 盲目重试。先区分：

- 模型或 API 调用失败；
- Herdr pane 或 Pi 进程失败；
- worktree 创建失败；
- 测试环境资源冲突；
- 任务本身缺少输入或权限；
- 子 Agent 已完成，但结果没有正确回传。

不同失败类型的修复路径不同。尤其是“结果未回传”不能通过反复重跑写入任务解决，否则会产生重复提交或重复外部动作。

## 十一、旅行规划和 3D 赛车演示应该怎样看

视频把多智能体系统放进旅行规划和 3D 赛车开发这类更直观的场景，适合帮助观众理解“多个角色共同完成一个目标”的效果。但这类演示不应直接等同于生产级自治系统。

旅行规划可以拆成：目的地和日期澄清、交通搜索、住宿候选、预算汇总、行程冲突检查和最终人工确认。每个子任务都应该返回来源、时间、价格有效期和失败状态；不能因为多个 Agent 都返回了文本，就把未经核验的价格或预订结果当成事实。

3D 赛车开发可以拆成：需求拆分、场景和资产调查、车辆控制实现、赛道逻辑、UI、测试和审查。真正的工程价值在于并行调查和隔离写入，而不是让多个 Agent 同时改同一个场景文件。涉及生成资产、运行编辑器或导出构建时，还要把本机资源、进程、许可证和产物验证纳入 workflow。

这两个场景共同说明：演示负责展示协作形态，生产系统还需要补齐事实来源、权限、回滚、幂等、观测和人工接管。

## 十二、生产使用前的验收清单

### 运行时

- [ ] Pi 从 `HERDR_ENV=1` 的 Herdr 环境启动；
- [ ] 子 Agent 的 pane、进程和完成状态可以观察；
- [ ] 父会话能收到具体完成结果，而不是只有启动确认；
- [ ] stalled、interrupted、failed 和 completed 状态有不同处理路径；
- [ ] 超长结果、日志和完整会话有可追溯位置。

### 任务与权限

- [ ] 每个角色只有完成任务所需的工具；
- [ ] 只读 scout 禁止写入；
- [ ] reviewer 默认不派生更多 Agent；
- [ ] 写入任务有文件范围、worktree 和回滚方案；
- [ ] 发送、发布、付款、删除、上传、登录和权限修改等敏感动作不交给快速循环自动执行。

### Git 与资源

- [ ] 并行 worker 不共享冲突的 checkout；
- [ ] 每个 worktree 的分支和提交归属清楚；
- [ ] 端口、缓存、数据库、Docker volume 和凭据不会因 worktree 而误以为隔离；
- [ ] 合并前检查 `git diff --check`、测试和最终 diff；
- [ ] 失败 worktree 有保留、恢复或清理策略。

### 业务结果

- [ ] 结果包含来源、时间和验证状态；
- [ ] 外部写入动作具备幂等键和回读验证；
- [ ] 低置信度结果进入人工复核；
- [ ] 任务失败不会被包装成“部分成功”；
- [ ] 记录了模型、角色、输入摘要、版本和成本，以便复盘。

## 最后：把 Agent 团队当作一个需要测试的系统

`pi-herdr-agents` 让 Pi 的多智能体编排更容易观察和复用：subagent 负责独立任务，Herdr 提供运行表面，worktree 提供 Git checkout 隔离，角色定义提供权限和行为边界，父会话负责整合证据和最终交付。

它不会自动解决任务依赖、数据真实性、外部副作用或权限设计。最稳妥的用法是从只读 scout 开始，逐步加入单一职责 worker 和 reviewer，把并行限制在无冲突的任务，把所有敏感动作放在明确的审批和回读之后。

## 来源与边界

原始视频：[畅的科技工坊｜Pi Agent 多智能体实战](https://www.youtube.com/watch?v=y1TXjYlRjBU)。视频标题公开提到 `pi-herdr-agents`、subagent 自定义、workflow 编排、旅行规划和 3D 赛车开发。

项目仓库：[giuseppecrj/pi-herdr-agents](https://github.com/giuseppecrj/pi-herdr-agents)。本文使用仓库当前公开的 README、`package.json`、角色目录和安装说明核对插件能力；公开仓库版本为 `2.0.2`，许可证为 MIT。

本文没有把视频演示场景当成独立性能基准，也没有声称旅行规划价格、3D 赛车构建结果或多 Agent 并行效率在所有环境中都可复现。视频字幕在整理时无法通过匿名公开接口取得，因此文中关于视频的内容以公开标题和仓库交叉核对为限；安装、命令和能力边界以项目公开资料为准，生产部署前仍应锁定具体提交并重新审阅。
