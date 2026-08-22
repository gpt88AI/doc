---
title: 为什么 Agent 要把 Skill 和 Tool 分成两个能力层？
description: 从 DeepSeek Harness 的插件化设计出发，解释 Skill 与 Tool 的职责边界、Agent Loop 中的协作方式，以及它们在 RAG、OTC 撮合和金融级 Agent 系统中的实践价值。
date: 2026-08-22
category: 技术教程
tags: [AI Agent, Agent Harness, DeepSeek Harness, Skill, Tool, RAG, OTC 撮合]
readTime: 12
relatedPath: /docs/guides/agent/
relatedTitle: Agent 专题
---

很多 Agent 项目刚开始时，都会把所有东西写进一个“大提示词”里：把业务规则、操作步骤、工具说明、错误处理和安全要求全部塞进 System Prompt，然后让模型自己决定下一步怎么做。

这种方式可以很快做出 Demo，但一旦 Agent 进入真实业务，问题会很快暴露出来：规则难以复用，工具权限难以控制，模型容易把“说明文字”误当成“可执行动作”，测试和审计也很难落地。

DeepSeek Harness 的一个重要设计，是把能力拆成不同的插件和层次。其中，`Skill` 与 `Tool` 的分离尤其值得理解：

> Skill 负责告诉 Agent 一类任务应该如何完成；Tool 负责让 Agent 执行一个经过约束的动作。

这不是简单的代码目录划分，而是 Agent Runtime 的职责边界。本文从这个边界出发，解释为什么要拆分、如何协作，以及它对 RAG 和 OTC P2P 撮合系统有什么直接影响。

## 先看结论：Skill 不是 Tool 的长描述

可以先用一张表区分两者：

| 维度 | Skill | Tool |
| --- | --- | --- |
| 核心问题 | 这类任务应该怎么做？ | 现在要执行哪个动作？ |
| 主要内容 | 流程、术语、判断规则、交互方式 | 参数 Schema、权限、执行逻辑、结果 |
| 典型形式 | Markdown 指令、任务模板、领域知识 | 可调用函数、API、数据库操作、外部服务 |
| 是否产生副作用 | 通常没有 | 可能有，尤其是写入和资金操作 |
| 变化频率 | 可以随任务和业务持续调整 | 需要稳定、可测试、可审计 |
| 典型例子 | `otc-trading`、`code-review`、`rag-research` | `search_maker_ads`、`create_taker_order`、`reserve_match` |

一句话概括：

```text
Skill = 任务方法
Tool  = 受控动作
```

如果把两者混在一起，Agent 很容易出现两个极端：要么“知道很多但什么也做不了”，要么“可以调用很多接口但不知道什么时候调用、调用前要检查什么”。

## DeepSeek Harness 为什么适合用插件来表达这层边界？

DeepSeek Harness 的架构强调“一切皆插件”。模型适配器、工具注册表、会话、Agent Loop、权限和 Web 界面，都可以通过插件组合运行时，而不是把所有逻辑写死在一个核心类里。

这种设计带来的关键能力是：

```text
能力可以注册
能力可以替换
能力可以按 Scope 隔离
能力可以通过配置组合
能力可以在卸载时撤销自己的副作用
```

在这个模型里，Skill 和 Tool 分开并不意味着它们互不相关。更准确的关系是：

```text
Skill
  ↓ 描述任务流程、术语和决策边界
Agent Loop
  ↓ 根据上下文选择下一步
Tool Router
  ↓ 校验权限、参数、幂等和执行策略
Tool
  ↓ 调用具体能力
领域服务 / 外部系统
```

Skill 影响 Agent 的“思考和规划”，Tool 负责系统的“执行和约束”。

## Skill 负责什么？

一个好的 Skill 不应该只是“把几段提示词换了个文件名”。它至少应该描述以下内容。

### 1. 什么时候使用这项能力

例如 `otc-trading` Skill 可以声明：

```text
当用户表达买入、卖出、询价、寻找商家、查询 OTC 订单或处理争议的意图时使用。
```

这让 Agent 能够区分：

- 用户是在询问市场概念；
- 用户是在查询自己的订单；
- 用户是在创建一笔真实订单；
- 用户是在请求一个高风险的资金动作。

### 2. 任务要经过哪些步骤

例如创建 Taker 订单，Skill 可以规定：

```text
1. 识别交易方向、资产、法币和金额。
2. 补齐支付方式、价格限制和有效期。
3. 检查用户 KYC 和交易限额。
4. 查询符合硬规则的 Maker 广告。
5. 展示报价和风险信息，等待用户确认。
6. 用户确认后，才允许锁定候选订单。
```

这里描述的是流程，不是某个 API 的实现细节。

### 3. 领域术语和业务判断

Skill 可以告诉 Agent：

- Taker 是主动发起需求的一方；
- Maker 是发布广告和流动性的一方；
- `MATCHED` 表示选出了候选，不等于已经锁定资金；
- `RESERVED` 才代表某个报价已经被暂时占用；
- 支付提交后不能直接假设 Maker 已经收到款；
- 争议订单必须进入人工审核流程。

这些内容属于“如何理解和组织任务”的知识，不应该散落在每个 Tool 的函数实现里。

### 4. 用户交互和安全边界

Skill 还应该规定什么时候询问用户、什么时候必须确认、什么时候转人工：

```text
查询公开广告：可以直接执行。
创建 Taker 订单：需要确认订单条件。
锁定 Maker 报价：必须明确确认。
确认付款或释放托管：需要二次确认，必要时进入人工审核。
```

这类规则可以帮助 Agent 做出正确的交互决策，但最终的权限控制仍然要在 Tool Router 和领域服务中再次校验。

## Tool 负责什么？

Tool 负责把一个动作暴露成可以被 Agent 调用、被系统验证、被日志记录的接口。

一个交易 Tool 至少要明确：

```text
名称
输入 Schema
输出 Schema
所需权限
风险等级
是否幂等
超时和重试策略
审计级别
失败时的恢复方式
```

例如，一个查询 Maker 广告的 Tool 可以是低风险的只读操作：

```json
{
  "name": "search_maker_ads",
  "description": "Search eligible maker advertisements for a taker request.",
  "parameters": {
    "asset": "string",
    "fiat_currency": "string",
    "amount": "number",
    "payment_methods": "string[]",
    "max_price": "number"
  },
  "metadata": {
    "risk_level": "low",
    "required_permissions": ["trade.read"],
    "idempotent": true,
    "audit_level": "normal"
  }
}
```

而 `reserve_match` 是有副作用的写操作：

```json
{
  "name": "reserve_match",
  "metadata": {
    "risk_level": "high",
    "required_permissions": ["trade.write"],
    "idempotent": true,
    "requires_user_confirmation": true,
    "requires_audit": true
  }
}
```

模型可以提出调用 `reserve_match`，但不能绕过 Tool 的权限、参数、订单状态和并发检查。

## 为什么不把流程直接写进 Tool？

假设我们把完整 OTC 流程都写进一个函数：

```text
trade()
```

这个函数内部同时完成：

- 识别用户参数；
- 查询规则；
- 找 Maker；
- 创建订单；
- 发送 IM；
- 锁定余额；
- 处理超时；
- 释放托管。

看起来调用很简单，但它会带来几个问题。

### 流程无法被 Agent 灵活编排

用户可能只想查询报价，也可能已经有一个订单，只想查看状态。一个大 Tool 很难适配不同入口，Agent 也无法在中途暂停、询问和恢复。

### 权限边界过于粗糙

查询报价和锁定资金被封装在同一个函数里，系统很难针对每个动作单独设置权限和确认策略。

### 失败恢复困难

如果 IM 已经发出，但 Reservation 失败，或者数据库写入成功后进程崩溃，一个大函数很难明确知道应该从哪一步恢复。

### 测试和审计不清晰

交易系统需要知道每一个状态变化是谁、在什么条件下触发的。把所有动作塞进一个函数，会让事件、指标和审计记录变得模糊。

更好的方式是把流程拆开：

```text
Skill：描述 OTC 交易流程
  ↓
get_user_compliance_status
search_maker_ads
create_taker_order
reserve_match
notify_maker
get_order_status
open_dispute
  ↓
领域服务和状态机负责最终一致性
```

## 在 Agent Loop 中，两者如何协作？

一次典型的 OTC 请求可以这样运行：

```text
用户：我想用 5 万人民币买 USDT，支持支付宝，优先响应快的商家。
  ↓
加载 otc-trading Skill
  ↓
解析交易意图和缺失参数
  ↓
调用 get_user_compliance_status
  ↓
调用 search_maker_ads
  ↓
按确定性规则排序候选
  ↓
向用户解释报价、完成率、响应速度和风险标签
  ↓
等待用户明确确认
  ↓
调用 reserve_match
  ↓
更新订单状态并发送事件
```

这里有一个重要的分工：

```text
Skill 决定“当前处于哪类流程、下一步应注意什么”。
Tool Router 决定“这个动作是否有权限、参数是否合法、能否执行”。
领域服务决定“订单状态和资金状态能否发生变化”。
```

这三层不能互相替代。

## Skill、Tool 和 RAG 的关系

RAG 经常被误解成“把知识库内容塞进 Prompt”。在 Agent Runtime 中，更合理的分工是：

```text
Skill：规定需要什么知识、何时查询、如何使用依据。
RAG：从授权知识源找回相关内容和来源。
Tool：把检索动作封装成可校验、可审计的调用。
领域服务：提供订单、余额、KYC 等实时事实。
```

例如，用户问：

> 付款提交后，Maker 多久不响应可以转人工？

Agent 可以加载 OTC Skill，然后调用：

```text
retrieve_otc_policy
```

这个 Tool 返回的不应该只是一段文本，而应该包含：

```json
{
  "answerable": true,
  "confidence": 0.93,
  "policy_version": "2026-08",
  "sources": [
    "payment-timeout-policy#maker-response-timeout"
  ],
  "required_next_action": "human_review_if_timeout"
}
```

这样，Skill 负责告诉 Agent“这个问题需要查政策”，RAG 负责找依据，Tool 负责安全地返回结构化结果，Agent 再决定是回答用户还是进入人工审核。

但订单当前状态不能依赖 RAG：

```text
政策和流程 → RAG
订单状态 → 交易数据库 / 状态机
资金余额 → 账本或托管服务
KYC 状态 → 合规服务
Agent 过程 → Session Event Log
```

这也是金融级 Agent 和普通知识库问答之间的关键区别。

## 对 OTC 撮合系统有什么直接价值？

### 1. 撮合规则可以逐步演进

Skill 可以更新用户偏好的表达方式和推荐流程；撮合 Tool 和领域服务继续保证价格、金额、余额、支付方式和状态机约束。

### 2. LLM 不会直接成为资金系统的控制面

模型只负责提出计划和调用请求，实际写操作还要经过：

```text
权限检查
参数校验
用户确认
风控规则
订单状态检查
并发锁定
幂等控制
审计记录
```

### 3. Human-in-the-loop 更容易插入

当风控 Tool 返回 `NEEDS_HUMAN_REVIEW` 时，Agent 可以暂停并保存 Checkpoint。人工审核通过后，继续从 `reserve_match` 或下一步流程恢复，而不是重新执行整段交易。

### 4. 同一个 Tool 可以被多个 Skill 复用

未来除了 `otc-trading`，还可以有：

- `maker-operations`：帮助 Maker 管理广告和报价；
- `risk-review`：辅助风控人员查看风险信号；
- `customer-support`：解释订单状态和处理常见问题。

它们可以共享：

```text
get_order_status
get_user_compliance_status
retrieve_otc_policy
open_dispute
```

每个 Skill 关注自己的任务流程，但不会复制底层执行代码。

## 常见错误设计

### 错误一：把 Skill 写成一份超长工具说明

如果 Skill 只罗列每个 API 的参数，却没有任务流程、前置条件和安全边界，Agent 仍然不知道什么时候该调用哪个 Tool。

### 错误二：让 Tool 自己解释所有业务

Tool 的描述可以帮助模型理解用途，但不应该承载完整的用户交互流程和所有业务政策。否则流程会分散到几十个函数里，难以维护。

### 错误三：让 RAG 文档授权高风险动作

知识库中的文本只能提供依据，不能授予权限。即使文档写着“可以释放托管”，也不能替代权限、确认、风控和订单状态检查。

### 错误四：把数据库查询结果写进长期语义记忆

订单状态是实时事实，不应该因为一次对话被写入向量库。否则下一次检索可能拿到过期状态。

### 错误五：用一个大 Tool 包揽整个业务流程

大 Tool 初期看似效率高，但会牺牲可恢复性、可测试性、权限粒度和审计质量。真实交易系统更适合小而明确的动作组合。

## 一个可复用的设计模板

设计一项新的 Agent 能力时，可以按下面的顺序拆分：

### 第一步：写 Skill

先回答：

```text
这项能力解决什么任务？
什么时候触发？
任务有哪些步骤？
需要哪些知识？
哪些步骤需要询问用户？
哪些动作需要确认或人工审核？
```

### 第二步：列出最小 Tool 集合

每个 Tool 只做一件可验证的事情：

```text
查询一个状态
创建一个订单
锁定一个资源
发送一个通知
提交一个审核请求
```

### 第三步：为 Tool 写执行契约

至少定义：

```text
输入和输出 Schema
权限
风险等级
幂等 Key
超时
重试
审计事件
失败补偿
```

### 第四步：把实时事实和知识分开

```text
知识、政策、术语 → RAG
实时状态、余额、订单 → 数据库和领域服务
流程和交互 → Skill
动作执行 → Tool
运行轨迹 → Session Event
```

### 第五步：用失败场景验收

至少测试：

- Tool 超时；
- LLM 返回非法参数；
- 用户重复确认；
- 订单已经被其他人锁定；
- RAG 找不到可靠依据；
- 文档内容包含 Prompt Injection；
- 进程在 Tool 成功后崩溃；
- 人工审核通过后 Agent 恢复执行。

## 写在最后

Skill 和 Tool 的拆分，表面上是模块化设计，深层上是在划分 Agent 系统中的“认知层”和“执行层”：

```text
Skill：让 Agent 理解任务。
RAG：让 Agent 找到依据。
Tool：让 Agent 请求动作。
领域服务：保证动作合法。
状态机：保证业务一致性。
Session：记录过程事实。
人工审核：处理高风险和不确定性。
```

如果你正在准备 Agent Harness、RAG 或 OTC 撮合相关岗位，建议不要只展示一个能聊天的 Demo。更有说服力的作品应该能够说明：

```text
哪些事情交给 LLM；
哪些事情由 Skill 组织；
哪些事情由 Tool 执行；
哪些事情必须由规则和状态机控制；
哪些事情需要用户确认或人工接管。
```

这套边界一旦建立，Agent 才能从“会调用工具的聊天机器人”，逐步变成一个可扩展、可审计、可恢复，并且能够进入真实业务的运行时系统。
