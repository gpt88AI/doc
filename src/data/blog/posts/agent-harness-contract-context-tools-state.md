---
title: Agent Harness 的执行基础设施：任务契约、上下文地图、工具网关与持久状态
description: 深入整理 Harness Engineering 指南前半部分，说明如何把模糊请求变成任务契约，并用渐进式上下文、受控工具和 durable state 支撑长任务 Agent。
date: 2026-10-30
category: AI Agent
tags: [AI Agent, Harness Engineering, 任务契约, Context Engineering, Tool Gateway, Agent Memory]
readTime: 14
---

> 本文是 [Agent Harness 总览](/docs/blog/harness-engineering-from-model-to-reliable-agent/) 的执行层专题，依据 [0xkichiro 分享的视频](https://x.com/0xkichiro/status/2115474764672225585/video/1)及其引用的公开 [Harness Engineering 指南](https://x.com/LunarResearcher/status/2096570562625655088)整理。视频没有可公开核验的逐字字幕，本文使用的是引用文章的章节和公开结构化正文。

## 1. 先写任务契约，再让 Agent 行动

“改善 onboarding”可以作为人类之间的口头意图，却不足以支撑自主执行。Harness 应该先把它编译成任务契约，至少回答五个问题：

```yaml
objective: 要产生什么结果
scope: 哪些文件、服务或流程在范围内
constraints: 什么不能改变
acceptance: 什么证据证明完成
approval_required: 哪些动作必须人工确认
```

契约会改变 Agent 的优化目标。没有契约时，它倾向于生成看起来合理的活动；有契约时，它可以围绕“让环境达到可验证结果”来选择动作。

一个更完整的示例：

```yaml
objective: 修复结算页重复应用优惠券
scope:
  - checkout validation
  - focused regression test
constraints:
  - 保留现有优惠券优先级
  - 不修改支付供应商逻辑
acceptance:
  - 定向测试通过
  - 集成测试通过
  - 变更回执列出未验证的生产依赖
approval_required:
  - 部署到 staging
```

契约不是一段更长的系统提示词。它应该能被工具、检查和审批流程读取。

## 2. 给 Agent 地图，而不是把整个仓库塞进上下文

把完整仓库、所有文档和全部历史对话一次性放进上下文，表面上是“提供更多信息”，实际上容易造成上下文洪水。Agent 需要的不是最大上下文，而是每个 token 尽可能高的信号密度。

更好的做法是先提供项目地图，再按任务检索细节：

```text
任务
  → 项目地图
      → 相关子系统
          → 精确文件
              → 局部规则与测试
```

上下文编译器需要判断：

- 哪些信息始终需要加载；
- 哪些资料可以在需要时检索；
- 哪些信息已经过期；
- 哪些内容可以摘要；
- 哪些内容必须保留原文。

这也是 Context Engineering 和“把 README 复制进 prompt”的区别：前者管理信息的进入时机、粒度和新鲜度，后者只是扩大输入。

## 3. 工具网关比工具数量更重要

给 Agent 二十个工具，不会自动让它更强，只会增加二十种犯错路径。每个工具都应该有清晰契约：输入类型、前置条件、影响范围、成功证据和失败行为。

一个工具网关至少可以承担这些职责：

| 网关能力 | 作用 |
| --- | --- |
| 工具筛选 | 隐藏当前任务无关的工具 |
| 参数校验 | 在执行前拒绝非法输入 |
| 路径与域名限制 | 避免越界读取或请求 |
| 超时控制 | 防止单个动作占满整个运行 |
| 幂等重试 | 避免外部动作重复发生 |
| 输出规范化 | 把不同工具结果变成统一结构 |
| 风险确认 | 对发送、删除、部署等动作增加审批 |
| 证据返回 | 返回可检查的结果，而不是单纯 `success` |

```text
模型提出动作
      ↓
工具网关检查参数、权限、预算和前置条件
      ↓
工具修改环境
      ↓
传感器或检查器返回证据
```

模型可以决定意图，但网关应该决定动作是否达到执行条件。

## 4. 把大脑、双手和历史拆开

脆弱 Agent 往往把推理、工具调用、文件内容、决定、错误和旧观察全部堆进一个不断变长的 transcript。更稳定的设计把系统拆成三部分：

```text
BRAIN
计划、推理、选择下一步

HANDS
在受限沙箱里执行工具

HISTORY
保存事实、决定、进度和失败教训
```

模型不需要每一个原始事件，而需要当前真正相关的状态；沙箱不需要理解完整目标，只需要安全执行一个边界明确的动作；历史层不需要推理，只需要在上下文消失后保留发生过什么。

这种分离让长任务更容易暂停、恢复和审计，也允许替换其中一层而不重写整个系统。

## 5. 对话历史不是可靠记忆

对话是事件流，不是执行状态。真正有用的记忆应该被编译成显式状态，至少分成四类：

```yaml
facts:
  - 已确认的环境事实
decisions:
  - 做过的选择及其原因
progress:
  - 已完成、进行中、阻塞和待办
lessons:
  - 失败后应该改变的未来行为
```

原始 transcript 仍然应该保留，用于审计；执行时则使用经过整理的 durable state。这样下一次运行无需重新播放几十页对话，也不必赌模型能否从噪声中找到关键决定。

## 6. 一个适合落地的 Harness 数据结构

```ts
type TaskContract = {
  objective: string
  scope: string[]
  constraints: string[]
  acceptance: string[]
  approvalRequired: string[]
}

type RunState = {
  facts: string[]
  decisions: Array<{ decision: string; reason: string }>
  progress: { completed: string[]; remaining: string[]; blocked: string[] }
  lessons: string[]
  checkpoints: Array<{ id: string; at: string; evidence: string[] }>
}
```

关键不在于类型名，而在于这些字段必须被工具和验证流程真正消费。只把它们放在 prompt 里，仍然无法防止 Agent 忘记或违反约束。

## 7. 如何接入统一模型接口

在 GPT88 或其他统一模型接口之上，推荐把一次执行拆成：

1. `plan`：模型读取任务契约和项目地图，提出计划；
2. `authorize`：网关验证工具、路径、预算和审批状态；
3. `act`：执行单个可审计动作；
4. `observe`：读取工具结果和环境变化；
5. `checkpoint`：写入事实、决定、进度和证据；
6. `verify`：调用测试、编译器、查询或人工审核；
7. `continue / repair / escalate`：根据证据继续、修复或升级。

模型服务可以更换，任务契约、状态结构、工具网关和验证器应该保持稳定。这样上下文窗口变化或模型升级时，系统仍然有明确的执行边界。

## 来源与边界

- [视频原帖](https://x.com/0xkichiro/status/2115474764672225585/video/1)
- [原帖正文](https://x.com/0xkichiro/status/2115474764672225585)
- [引用的 Harness Engineering 指南](https://x.com/LunarResearcher/status/2096570562625655088)
- 本文示例代码和 YAML 是编辑整理，用于表达结构，不是原文逐字代码，也不是某个现成 SDK 的官方接口。
