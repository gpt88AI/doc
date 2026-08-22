---
title: 为什么 Session 不应该等同于 Memory？
description: 从 Agent Harness、RAG 和 OTC 交易系统出发，解释 Session、Working Memory、Episodic Memory、Semantic Memory、Compliance Memory 与订单事实的边界，以及如何设计可恢复、可审计的 Agent 上下文系统。
date: 2026-08-22
category: 技术教程
tags: [AI Agent, Agent Harness, Session, Memory, RAG, OTC 撮合, 订单状态机]
readTime: 14
relatedPath: /docs/blog/why-agent-skills-and-tools-should-be-separated/
relatedTitle: 为什么 Agent 要把 Skill 和 Tool 分成两个能力层？
---

在开发 Agent 时，`Session` 和 `Memory` 经常被混在一起使用。

有人把整段聊天记录称为 Memory；有人把用户偏好、工具结果和订单状态都塞进一个向量数据库；还有人直接把 Session 表当成 Agent 的长期记忆。简单 Demo 里，这些做法可能暂时能工作，但一旦 Agent 需要长时间运行、跨会话恢复、处理敏感数据或参与真实交易，问题就会集中出现：

- 旧的事实覆盖了新的事实；
- 检索到了过期订单状态；
- Agent 重启后不知道自己执行到哪一步；
- 用户偏好和合规信息混在一起；
- 审计人员无法还原一次决策是如何产生的；
- 向量检索结果被误当成实时数据库事实。

因此，`Session` 不应该等同于 `Memory`。

更准确的理解是：

> Session 是一次 Agent 运行过程的可恢复记录；Memory 是为了未来任务而整理、筛选和提供的上下文。

两者有关联，但目标、生命周期、数据结构和一致性要求都不同。

## 先看结论：Session 记录发生过什么，Memory 决定以后提供什么

可以先用一张表建立边界：

| 维度 | Session | Memory |
| --- | --- | --- |
| 核心问题 | 这次 Agent 运行发生了什么？ | 以后执行任务时，哪些信息值得带上？ |
| 主要形态 | 有序事件日志、运行状态、Checkpoint | 结构化事实、用户偏好、知识索引、摘要 |
| 时间范围 | 一次会话或一次任务的生命周期 | 可以跨会话、跨任务长期存在 |
| 写入方式 | 按顺序追加，强调不可变和可回放 | 提取、更新、合并、过期和删除 |
| 一致性要求 | 必须能够还原运行过程 | 允许经过整理，但不能伪造事实 |
| 典型内容 | 用户消息、Tool 调用、Tool 结果、错误、审批 | 偏好、历史摘要、业务知识、合规标签 |
| 是否可直接作为订单事实 | 不能单独承担 | 不能单独承担 |
| 适合的存储 | Event Log、JSONL、关系库 | 关系库、KV、向量库、搜索索引 |

用一句更短的话概括：

```text
Session = 运行轨迹
Memory  = 上下文投影
```

Session 是“发生过的记录”，Memory 是“面向未来的视图”。

## Session 到底是什么？

在 Agent Harness 中，一次 Session 通常对应一个持续的 Agent 运行上下文。它不只是聊天窗口，而是一次可以被驱动、暂停、恢复和检查的执行单元。

一个典型 Session 可能包含：

```text
Session Created
  ↓
Turn Started
  ↓
User Message
  ↓
Agent Step Started
  ↓
Model Request
  ↓
Assistant Message / Tool Call
  ↓
Tool Execution
  ↓
Tool Result
  ↓
Approval Request
  ↓
Approval Decision
  ↓
Next Step
  ↓
Turn Ended
```

这些记录有几个共同特点。

### 1. 有明确的顺序

Agent 先调用了哪个 Tool，哪个 Tool 先返回，用户什么时候确认，都会影响后续行为。因此 Session 不能只是无序的文档集合。

### 2. 需要支持回放

如果一次任务失败，开发者应该能够回答：

```text
模型收到了什么上下文？
模型提出了什么 Tool 调用？
Tool 收到了什么参数？
Tool 返回了什么结果？
用户是否确认过？
失败发生在哪一步？
```

这要求 Session 保留足够的运行事实，而不是只保存最终答案。

### 3. 需要支持恢复

Agent 可能因为以下原因暂停：

- 等待用户回答；
- 等待人工审核；
- Tool 超时；
- 外部服务暂时不可用；
- 进程崩溃；
- 预算或上下文达到限制。

如果 Session 只保存聊天文本，就很难知道应该从哪一步继续执行。可恢复 Agent 需要保存步骤边界、工具调用、结果和必要的 Checkpoint。

### 4. Session 中会有“过程性噪声”

一次 Agent 运行中可能出现：

- 模型的中间思考结果；
- 被拒绝的 Tool 调用；
- 重试请求；
- 临时错误；
- 用户改口；
- 被覆盖的草稿参数；
- 超过上下文限制后产生的压缩记录。

这些内容对回放和诊断很重要，但不一定适合作为未来每次任务的长期记忆。

## Memory 到底是什么？

Memory 不是“把所有过去内容保存下来”，而是对过去内容进行有目的的提取和组织。

例如，用户在三次交易中都使用支付宝，这可能被提取为一个偏好：

```json
{
  "user_id": "user_123",
  "preference": "payment_method",
  "value": "alipay",
  "confidence": 0.92,
  "source": "confirmed_trade_history",
  "updated_at": "2026-08-22T08:00:00Z"
}
```

它不需要把三次完整对话都重新塞进每一次 Prompt。Memory 的价值在于把过去的内容转化为未来任务可用的上下文。

但这种提取必须遵守几个原则：

- 明确来源；
- 记录更新时间；
- 区分事实和推测；
- 支持纠正和删除；
- 设置过期策略；
- 服从用户和租户权限；
- 不把敏感数据无条件暴露给模型。

## 一个可用的 Memory 分层

在 Agent 应用中，建议至少区分以下几层 Memory。

```text
Working Memory
  当前任务正在使用的临时变量

Session Context
  当前会话中已经确认的上下文

Episodic Memory
  用户过去发生过的事件和行为摘要

Semantic Memory
  业务规则、术语、政策和知识库内容

Compliance Memory
  KYC、AML、风控标签和人工审核历史

Domain State
  订单、余额、托管和库存等实时业务事实
```

其中最后一类虽然常常被口头称作“记忆”，但它实际上更接近领域状态，不应该与普通 Memory 混在一起。

## Working Memory：当前任务的临时状态

Working Memory 只服务于当前任务，例如：

```json
{
  "task": "create_taker_order",
  "side": "buy",
  "asset": "USDT",
  "fiat_currency": "CNY",
  "fiat_amount": 50000,
  "payment_methods": ["alipay"],
  "max_response_time_seconds": 30,
  "current_step": "matching",
  "selected_ad_id": null
}
```

它应该容易更新、容易清理，也不应该被误认为长期事实。

例如用户先说“我想买 5,000 USDT”，后来改成“改成 3,000 USDT”。Working Memory 应该更新为 3,000，而 Session 仍然保留用户前后两次消息，方便回放用户是如何修改意图的。

## Episodic Memory：过去发生过什么

Episodic Memory 保存的是用户过去的事件和行为摘要，例如：

- 用户过去完成过多少笔交易；
- 用户通常选择哪类支付方式；
- 用户曾经取消过哪些订单；
- 用户是否经常请求人工审核；
- 用户与某个 Maker 是否有历史合作。

它适合回答：

```text
这个用户过去做过什么？
过去的行为是否能帮助理解当前偏好？
某个推荐是否基于真实历史？
```

但 Episodic Memory 不应该直接替代实时查询。例如“用户上周完成过一笔交易”是历史事件，“用户当前是否完成 KYC”则必须查询当前合规服务。

## Semantic Memory：知识和规则

Semantic Memory 更接近 RAG 知识库，保存：

- 产品文档；
- 业务术语；
- 订单规则；
- 支付规则；
- 风控政策；
- 错误码解释；
- 操作手册；
- 常见问题。

它适合回答：

```text
这类订单应该怎么处理？
某个状态是什么意思？
平台规则要求什么条件？
某个错误码通常对应什么原因？
```

Semantic Memory 的内容可以通过向量检索、关键词检索和 Rerank 获取，但检索结果只能作为知识依据，不能直接修改订单状态或授予资金权限。

## Compliance Memory：合规上下文

金融、支付和 OTC 场景还需要单独考虑 Compliance Memory：

```text
KYC 状态
AML 风险等级
账户限制
人工审核结论
风控规则命中记录
限制解除时间
所需补充材料
```

这部分信息通常比普通用户偏好更敏感，也更不适合直接进入通用向量库。

推荐的做法是：

```text
合规系统保存权威状态
  ↓
Agent 通过受控 Tool 查询摘要
  ↓
Tool 按权限返回最小必要信息
  ↓
Agent 根据结果决定询问、拒绝或转人工
```

例如 Agent 只需要知道：

```json
{
  "kyc_status": "verified",
  "trade_limit_status": "within_limit",
  "risk_decision": "review_required"
}
```

它不一定需要看到完整身份证号、银行卡号或内部风控模型的全部特征。

## Domain State：实时业务事实不是普通 Memory

这是最容易出错的地方。

下面这些数据不能只放在 Session 或向量库中：

```text
订单当前状态
Maker 当前可用余额
Reservation 是否仍然有效
托管资产是否已锁定
用户当前 KYC 状态
支付是否已经确认
订单是否已经过期
```

这些内容应该来自：

```text
订单数据库
账本或资金服务
托管服务
合规服务
状态机
事件流
```

原因很简单：这些信息会快速变化，并且具有强一致性、权限和审计要求。向量检索可以找“订单过期规则”，但不能可靠地回答“订单 123 当前是否已经过期”。

## 为什么 Session 不能直接当 Memory？

### 原因一：生命周期不同

Session 通常围绕一次会话或一次任务组织；Memory 可以跨越多次 Session。

```text
Session A：用户第一次询价
Session B：用户确认报价
Session C：用户查询历史订单

Episodic Memory：提取三次 Session 中稳定且有用的历史信息
```

如果直接把 Session 当长期 Memory，所有临时对话、错误尝试和过期信息都会污染未来任务。

### 原因二：更新语义不同

Session 适合追加：

```text
append(user/message)
append(tool/call)
append(tool/result)
append(approval/decision)
```

Memory 需要更新和合并：

```text
用户偏好从银行卡转账变为支付宝
用户撤回了此前保存的偏好
规则文档进入新版本
风险标签到期
```

如果把 Memory 设计成简单的 Session 追加日志，查询时就必须自己推导“当前有效值”，数据会越来越难维护。

### 原因三：Session 需要保留被否定的内容

用户可能先说：

```text
我想买 5,000 USDT。
```

随后改口：

```text
改成 3,000 USDT。
```

Session 必须保留这两条消息，因为它们是运行过程的一部分。Memory 则不应该把 5,000 和 3,000 同时当成当前目标，而应该提取“当前确认金额为 3,000”。

### 原因四：Session 包含大量不适合检索的过程噪声

一次 Agent 运行中可能会产生几十次 Tool 调用和重试。如果把全部过程日志直接向量化，检索很容易命中：

- 旧的失败参数；
- 已过期的 Tool 结果；
- 被用户否定的方案；
- 临时错误信息；
- 与当前任务无关的调试文本。

这会让 RAG 召回看似相关、实际却不能作为决策依据的内容。

### 原因五：敏感数据的访问范围不同

Session 可能包含用户输入、支付凭证、内部错误、审核信息和 Tool 参数。不同角色不应该读取同样的全部内容。

Memory 需要经过筛选和权限投影：

```text
用户侧 Agent：读取订单状态摘要和公开政策
Maker 侧 Agent：读取与自己广告相关的订单摘要
风控 Agent：读取风险信号和审核记录
客服 Agent：读取可对用户解释的状态和政策
```

把完整 Session 当成 Memory，容易造成跨角色信息泄露。

### 原因六：恢复要求和检索要求不同

恢复需要知道“最后一个已确认的执行边界”；检索需要知道“哪些内容与当前问题最相关”。

这是两个不同的查询目标：

```text
恢复查询：找到最后一个一致的 Checkpoint
知识查询：找到最相关、已生效、当前用户有权限访问的文档
历史查询：找到用户过去的相关行为
状态查询：读取订单服务的当前状态
```

如果所有查询都指向同一个 Memory，很难同时满足可靠恢复和高质量检索。

## Session 与 Memory 的正确关系

不是“Session 和 Memory 二选一”，而是：

```text
Session Event Log
  ↓ 提取、压缩、分类、脱敏
Memory Projections
  ├── Working Memory
  ├── Episodic Memory
  ├── Semantic Index
  └── Compliance Summary
```

Session 是源记录，Memory 是面向不同用途的投影。

这种关系类似数据库中的：

```text
事件日志 → 物化视图
```

源事件负责保留事实，投影负责提高未来读取效率。投影出现问题时，可以根据 Session 或领域事件重新构建，而不是把投影当成唯一真相。

## 一个 OTC Agent 的上下文架构

以用户通过 Chatbot 创建 OTC 订单为例，可以这样组织：

```text
用户消息
  ↓
Session Event Log
  ├── user/message
  ├── assistant/message
  ├── tool/call
  ├── tool/result
  └── approval/decision

当前任务
  ↓
Working Memory

用户历史行为
  ↓
Episodic Memory

平台政策和订单规则
  ↓
RAG / Semantic Memory

当前订单、余额、KYC
  ↓
Domain Services

Agent 需要的最小上下文
  ↓
Prompt Context
```

Agent 每一步都应该按需组装上下文，而不是把整个 Session、所有 Memory 和所有数据库结果全部塞进 Prompt。

## 一次订单创建的完整数据流

用户输入：

> 我要用 5 万人民币买 USDT，支持支付宝，优先响应快的商家。

### 第一步：写入 Session

系统先记录用户消息：

```text
user/message
```

此时不要急着把它写进长期 Memory，因为用户还没有确认最终交易参数。

### 第二步：形成 Working Memory

Agent 从消息中解析：

```json
{
  "side": "buy",
  "asset": "USDT",
  "fiat_currency": "CNY",
  "fiat_amount": 50000,
  "payment_methods": ["alipay"],
  "preference": "fast_response"
}
```

### 第三步：查询 Domain State

通过受控 Tool 查询：

```text
get_user_compliance_status
get_trade_limits
search_maker_ads
```

这里返回的是实时数据，不能用旧 Session 或向量库中的内容代替。

### 第四步：查询 Semantic Memory

如果用户询问付款规则、订单超时或争议条件，Agent 调用 RAG Tool 查询政策和来源。

### 第五步：等待确认

Agent 将候选 Maker 的价格、完成率、响应速度和风险标签展示给用户。用户确认后，确认事件写入 Session。

### 第六步：执行副作用动作

Agent 请求：

```text
reserve_match
```

Tool Router 和领域服务再次检查：

```text
权限是否足够
用户是否确认
订单状态是否允许
Maker 余额是否充足
广告是否过期
是否已经被其他订单锁定
幂等 Key 是否重复
```

成功后，领域服务更新订单状态，并写入领域事件。Agent Session 记录 Tool 调用和结果，但不自己伪造订单状态。

## RAG 中最常见的错误：把 Session 全量向量化

全量向量化 Session 看起来很方便：

```text
聊天记录 → Chunk → Embedding → 向量库
```

但真实系统通常需要先做事件分类和投影：

```text
Session Event
  ↓
过滤不适合检索的临时过程
  ↓
提取稳定事实和摘要
  ↓
附加来源、时间、权限和生效信息
  ↓
进入 Episodic 或 Semantic Index
```

### 适合进入 Episodic Memory 的内容

- 用户明确确认的长期偏好；
- 已完成交易的结构化摘要；
- 用户选择过的工作流；
- 用户明确要求保存的上下文。

### 不应直接进入长期 Memory 的内容

- 未确认的草稿参数；
- 临时错误；
- 一次性验证码；
- 完整支付凭证；
- 内部 Token；
- 被用户否定的方案；
- 过期订单状态；
- 只对当前 Tool 调用有意义的中间结果。

## 如何设计 Session 数据结构？

一个最小的 Session Event 可以包含：

```json
{
  "session_id": "session_123",
  "seq": 42,
  "type": "tool/result",
  "time": 1787385600000,
  "data": {
    "tool_name": "search_maker_ads",
    "content": "3 eligible maker ads found",
    "is_error": false
  },
  "correlation_id": "turn_7-step_2-call_9"
}
```

重点不是字段越多越好，而是要满足：

- 顺序可确定；
- 调用和结果可关联；
- 错误可区分；
- 事件可追加；
- 事件可以被回放；
- 事件不会因为 Memory 更新而被覆盖。

## 如何设计 Memory 数据结构？

Memory 适合使用带来源和有效期的结构化记录：

```json
{
  "memory_id": "mem_456",
  "user_id": "user_123",
  "kind": "preference",
  "key": "preferred_payment_method",
  "value": "alipay",
  "confidence": 0.92,
  "source_event_ids": ["session_123:42", "session_130:18"],
  "created_at": "2026-08-01T09:00:00Z",
  "updated_at": "2026-08-22T08:00:00Z",
  "expires_at": null,
  "visibility": "user-agent"
}
```

它应该能够回答：

```text
这条 Memory 从哪里来的？
用户是否确认过？
它什么时候更新过？
什么时候过期？
谁可以读取？
如何删除或纠正？
```

## Agent 重启时应该怎么恢复？

恢复流程不应该是“把所有 Memory 重新塞进 Prompt”，而应该是：

```text
读取 Session Log
  ↓
验证事件顺序和完整性
  ↓
找到最后一个一致的 Checkpoint
  ↓
恢复 Agent 的 Working State
  ↓
重新读取实时 Domain State
  ↓
根据当前状态继续规划
```

尤其是交易场景，恢复后必须重新检查：

- Reservation 是否仍然有效；
- Maker 广告是否已过期；
- 订单版本是否发生变化；
- 用户是否已经在其他渠道完成付款；
- 人工审核结果是否已经更新。

不能仅凭上一次 Session 中的 Tool 结果继续执行，因为外部世界可能已经变化。

## 常见错误设计及修正方式

### 错误一：把完整聊天记录作为长期记忆

问题：临时对话、错误尝试和被否定的参数会污染未来任务。

修正：Session 保留完整过程，Memory 只保存经过确认和提取的稳定信息。

### 错误二：把订单状态写入向量库

问题：向量检索不能保证拿到最新状态，也不适合做状态迁移和并发控制。

修正：订单状态由领域数据库和状态机维护，RAG 只提供规则和解释。

### 错误三：把所有 Memory 放进同一个 namespace

问题：用户偏好、合规标签、产品文档和订单状态的访问权限与生命周期完全不同。

修正：按用途和权限拆分 Working、Episodic、Semantic、Compliance 和 Domain State。

### 错误四：Memory 没有来源和时间

问题：系统无法判断这条信息是否可信、是否过期，也无法处理冲突。

修正：为 Memory 保存 source、confidence、updated_at、expires_at 和 visibility。

### 错误五：恢复时只依赖摘要

问题：摘要适合节省上下文，但可能丢失审批、错误和工具调用顺序。

修正：摘要用于快速理解；恢复和审计仍然依赖原始 Session Event 或领域事件。

### 错误六：让 Memory 直接授予权限

问题：历史记录或检索结果不应该改变当前 Tool 的权限。

修正：权限由 Permission Service、Tool Router 和领域服务实时判断，Memory 只能提供上下文。

## 一套可复用的设计检查表

设计 Agent 的 Session 和 Memory 时，可以逐项检查：

```text
[ ] Session 是否能还原一次 Agent 运行过程？
[ ] Tool 调用和结果是否可以关联？
[ ] Agent 是否能从 Checkpoint 恢复？
[ ] 临时草稿和长期偏好是否分开？
[ ] 事实、知识、偏好和合规信息是否分层？
[ ] 实时订单状态是否来自领域服务？
[ ] Memory 是否记录来源和更新时间？
[ ] 是否存在过期和删除机制？
[ ] 不同角色是否只能看到最小必要信息？
[ ] RAG 是否会召回过期或被否定的内容？
[ ] Agent 重启后是否会重新读取外部实时状态？
[ ] 高风险操作是否不依赖 Memory 单独授权？
```

## 写在最后

Session 和 Memory 的区别，本质上是“过程事实”和“未来上下文”的区别：

```text
Session：记录这次 Agent 做过什么。
Working Memory：保存当前任务正在使用什么。
Episodic Memory：总结用户过去发生过什么。
Semantic Memory：检索业务知识和规则。
Compliance Memory：提供受控的合规上下文。
Domain State：维护订单、余额和托管等实时事实。
```

一个可靠的 Agent 不会把所有过去内容都叫作 Memory，也不会把所有状态都塞进 Session。它会让不同数据进入不同的存储和访问路径，再在每一步 Agent Loop 中组装出最小、最新、可验证的上下文。

对于 RAG 和 OTC 撮合系统，这条边界尤其重要：

```text
RAG 可以告诉 Agent 规则是什么；
Session 可以记录 Agent 查询过什么；
Memory 可以帮助理解用户偏好；
但订单服务必须决定订单现在是什么状态。
```

当你能够清楚解释这几层的区别时，Agent 就不再只是一个“把聊天记录加进 Prompt 的机器人”，而开始具备可恢复、可审计、可扩展和进入真实业务的基础。
