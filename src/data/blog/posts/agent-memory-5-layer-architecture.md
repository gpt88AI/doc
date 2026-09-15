---
title: Agent Memory 五层架构：让 Agent 真正记住并持续学习
description: 整理《Agent Memory - The 5-Layer Playbook》的核心框架，解释 Working、Episodic、Semantic、Procedural 与 Forgetting 五层记忆如何协作，以及为什么记忆是 Agent 的工程瓶颈。
date: 2026-09-15
category: 开发工具
tags: [Agent Memory, AI Agent, CoALA, Episodic Memory, Semantic Memory, Procedural Memory, Forgetting]
readTime: 15
relatedPath: /docs/blog/agent-memory-implementation-patterns/
relatedTitle: Agent Memory 实现：JSONL、SQLite、YAML 与完整执行循环
---

一个 Agent 能不能“记住”，不是把聊天记录全部塞回上下文这么简单。真正可用的记忆系统要回答四个问题：什么应该留在当前上下文，什么应该保存为经历，什么应该沉淀为事实，什么应该升级为可复用的方法；同时还要知道什么时候删除、过期或撤销旧信息。

本文根据《Agent Memory — The 5-Layer Playbook》整理。原文是一份独立编写的技术 playbook，不代表 Anthropic、Mem0、Snowflake、LangChain 或其它被提及项目的官方立场。文中数字和实验结论保留为来源中的主张，不能直接当作所有 Agent 都能复现的保证。

## 一、先看完整架构

![Agent Memory 五层架构图](/docs/blog/zh/agent-memory-5-layer-architecture/img/architecture.png)

从用户输入开始，信息先进入 Working Memory。执行产生的任务、工具调用、错误和结果进入 Episodic Memory；经过验证的稳定事实进入 Semantic Memory；反复出现并且已经验证过的做法才进入 Procedural Memory。Forgetting Engine 负责过期、淘汰、冲突处理和版本回退，检索路径则把真正相关的记忆重新带回 Working Memory。

这套分层的关键不是“多建几个数据库”，而是给不同信息设置不同的生命周期、写入门槛、检索方式和权限。

## 二、为什么长上下文不能代替记忆

把完整历史放入每次请求会产生三类问题：

1. 成本随历史长度增长，当前任务真正需要的内容反而被稀释。
2. 旧决定、临时猜测和错误结果会与新事实混在一起。
3. Agent 可能看见数据，却不知道哪些内容可以信任、哪些内容已经过期。

长上下文解决的是“暂时能看见多少”，记忆系统解决的是“什么值得留下、如何再次找到、何时不再相信”。因此，记忆不是上下文窗口的简单扩容，而是一套数据生命周期系统。

## 三、Layer 1：Working Memory

Working Memory 是当前任务的工作区，通常对应模型本轮可见的上下文。它应该包含：

- 当前用户目标和约束；
- 最近几轮对话中仍然有效的事实；
- 当前计划、已完成步骤和待处理步骤；
- 当前任务需要的工具结果；
- 与本轮决策直接相关的少量长期记忆。

它不应该成为所有历史的垃圾桶。可以把上下文组织成四个区域：任务目标、状态摘要、最近事件、按需检索的记忆。

### 上下文溢出时怎么处理

当 token 预算接近上限，优先保留最近的用户约束、未完成任务和最终决定。被截断前，先把以下内容写入更合适的存储：

- 已确认的用户偏好或项目事实；
- 工具调用的结果、错误和解决方式；
- 已经做出的决定及其原因；
- 仍然需要后续跟进的事项。

不要把模型的原始思维草稿当作长期记忆。应保存可验证的结论、证据位置和下一步，而不是未经整理的中间推理。

## 四、Layer 2：Episodic Memory

Episodic Memory 保存“发生过什么”，它更像带时间戳的事件日志，而不是事实百科。适合记录：

- 任务目标和最终结果；
- 使用过的工具、参数和返回状态；
- 错误、排查过程和解决方案；
- 用户明确的反馈与修改要求；
- 一次决策的上下文和结果。

一个事件至少应该有 `id`、`timestamp`、`task`、`outcome`、`tools`、`errors`、`tags` 和 `source`。`source` 用来追溯它来自哪次对话、哪个文件或哪个外部系统。

### Episodic Memory 不应该保存什么

- 原始内部推理或隐藏思维链；
- 可以从源文件重新读取的大段原文；
- 没有验证的猜测；
- 每次执行都会变化的临时状态；
- 没有访问控制的敏感数据副本。

事件记录可以帮助 Agent 找到“类似任务当时怎么解决”，但它不能自动证明旧方案今天仍然适用。检索结果应该带上时间、结果状态和置信度。

### TTL 是必要的

经历会过时。临时 API 错误、一次性的环境状态和短期偏好应该有 TTL；稳定的项目决策可以保留更久，但仍要能被新证据 supersede。没有时间信息的事件很快会变成无法判断的新旧混合物。

## 五、Layer 3：Semantic Memory

Semantic Memory 保存“现在认为是什么”，例如：

- 用户偏好和稳定约束；
- 项目、组织、服务和文件等实体；
- 实体之间的关系；
- 已确认的配置、规则和定义。

它可以从简单的 JSON 或 SQLite 开始，也可以进一步使用向量数据库或知识图谱。存储技术不是第一决策，数据模型和写入校验才是。

### 事实要带来源和状态

一条事实最好至少包含：

| 字段 | 作用 |
| --- | --- |
| `subject` | 事实描述的实体 |
| `predicate` | 关系或属性 |
| `object` | 属性值或关联实体 |
| `source` | 来源文件、会话或系统 |
| `observed_at` | 观测时间 |
| `confidence` | 可信度或验证状态 |
| `valid_until` | 过期时间，可为空 |

### 冲突不能靠最后写入覆盖

当“项目使用 PostgreSQL”和“项目使用 SQLite”同时出现时，系统要先判断：是否属于不同环境、是否有时间版本、来源是否可靠、是否是迁移过程，而不是简单地让后写入的值覆盖前一个值。

可行的冲突流程是：发现冲突，保留两条证据，按来源和新鲜度排序，标记待确认，只有在规则明确时才自动归并。无法判定时，应把冲突暴露给 Agent 或人工审核。

## 六、Layer 4：Procedural Memory

Procedural Memory 保存“以后应该怎么做”，通常表现为技能、运行手册、工具编排或可复用方法。它和 Episodic Memory 的边界很重要：一次成功是经历，多次稳定成功并且步骤清晰，才有资格升级为程序。

一个可复用 Skill 至少应包含：

- 名称与触发条件；
- 前置条件和输入；
- 有序步骤与所需工具；
- 成功标准和失败处理；
- 版本、最近使用时间和成功率；
- 适用范围与不适用情况。

原文建议只有在任务重复出现、连续多次成功、步骤足够明确、工具行为可靠时才提升为 Skill。这个门槛可以减少把偶然运气固化成错误流程。

技能同样需要版本化。新版本先以灰度或低风险任务验证，失败时能够回滚到旧版本；“技能文件已经生成”不等于“技能已经可靠”。

## 七、Layer 5：Forgetting Engine

没有遗忘机制的记忆系统会越用越危险。Forgetting Engine 至少处理四种情况：

1. **Expiration**：超过 TTL 的临时信息失效。
2. **Supersession**：新版本事实替代旧版本，但保留历史证据。
3. **Contradiction**：两个来源冲突时标记、隔离并等待解决。
4. **Rollback**：新技能或新规则造成回归时恢复旧版本。

遗忘不一定等于物理删除。对于审计、合规或排错，推荐把数据转入冷存储，保留删除原因、操作者和时间。对于敏感信息，则需要更严格的删除策略。

## 八、五层如何协作

一次典型执行可以这样走：

1. 从用户输入生成任务目标和当前 Working Memory。
2. 用任务标签检索相关的 Episodic、Semantic 和 Procedural Memory。
3. 将经过权限检查和新鲜度检查的结果压缩注入上下文。
4. Agent 执行工具并产生新的事件、事实候选和结果。
5. 只把符合规则的候选写入长期存储。
6. 后台 Forgetting Engine 清理过期内容、标记冲突并统计技能表现。

这里最重要的控制点是“写入门槛”。读取旧信息可以提高效率，但写错一条长期事实会污染后续所有任务。

## 九、数字证据应该怎样读

playbook 引用了 Mem0、Snowflake ontology 研究和其它工程材料中的效果主张，例如 token、延迟、准确率和工具调用次数的变化。这些数字依赖数据集、模型、检索策略、基线、缓存、工具设计和评估口径。

因此，迁移到自己的系统时，应该把它们当作待验证假设：记录 token 使用、检索命中率、事实冲突率、工具调用数、延迟、错误恢复率和人工介入率，再进行对照实验。不要把来源中的百分比改写成产品承诺。

## 结语

五层架构提供的是一套边界：Working Memory 管当前任务，Episodic Memory 管经历，Semantic Memory 管事实，Procedural Memory 管方法，Forgetting Engine 管生命周期。真正可靠的 Agent，不是“记得越多越好”，而是能在正确的时间看到正确的信息，并且知道什么时候不该继续相信旧信息。

下一篇将把这套架构落成 JSONL、SQLite、YAML 和一个完整的 Memory-Aware Agent Loop：

前往 [Agent Memory 实现：JSONL、SQLite、YAML 与完整执行循环](/docs/blog/agent-memory-implementation-patterns/)。
