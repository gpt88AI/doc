---
title: 从 Skill 到订单：Agent Harness 如何加载能力、调用工具并结构化交易数据
description: 以 OTC 交易为例，逐步解释 Skill 如何加载、Tool 如何定义、Agent 如何调用 Tool，以及订单数据如何从自然语言变成可审计的结构化对象。
date: 2026-08-28
category: 技术教程
tags: [AI Agent, Agent Harness, Skill, Tool Calling, OTC 撮合, 订单状态机, TypeScript, P2P]
readTime: 12
relatedPath: /docs/blog/otc-agent-harness-responsibility-boundaries/
relatedTitle: OTC 撮合 Agent 中，8 类职责到底应该由谁负责？
---

很多人第一次学习 Agent Harness 时，会把注意力放在模型和 Prompt 上：模型能不能理解用户、能不能调用函数、能不能生成一段看起来合理的答案。

但一个真正可扩展的 Agent 系统，必须先回答四个工程问题：

1. Skill 如何加载？
2. Tool 如何定义？
3. Agent 如何调用 Tool？
4. 订单数据如何结构化？

这四个问题，正好对应了“能力声明、动作接口、运行时编排、领域数据模型”四个层次。

本文以一个最小的 OTC 交易场景为例：

> 我要用 5 万人民币买 USDT，优先支付宝，找响应最快的商家。

我们不接入真实资金，也不讨论具体支付渠道实现，只关注如何把这句话安全地变成一个可继续执行、可校验、可审计的 Agent 任务。

## 一、先看完整数据流

一条最小的 Agent 交易链路可以表示为：

```text
用户自然语言
    ↓
Agent 识别意图
    ↓
加载 otc-trading Skill
    ↓
生成结构化 Taker Intent
    ↓
Planner 选择下一步动作
    ↓
Tool Router 校验 Tool、参数、权限和幂等键
    ↓
调用订单、撮合、风控等领域 Tool
    ↓
领域服务返回可信事实
    ↓
Agent 继续规划、询问用户或进入人工审核
```

可以把四个核心对象理解成：

| 对象 | 作用 | 是否直接修改交易事实 |
| --- | --- | --- |
| Skill | 说明一类任务应该如何处理 | 否 |
| Tool | 暴露一个受控的查询或动作接口 | 可能 |
| Agent | 理解用户目标并决定下一步 | 不应该直接修改 |
| Domain Service | 执行订单、余额、风控和撮合逻辑 | 是 |

最重要的边界是：

> Agent 可以提出动作，Tool 可以请求动作，领域服务才负责验证并执行交易状态变化。

## 二、Skill 如何加载？

### 1. Skill 不是一段隐藏 Prompt

在一个成熟的 Harness 中，Skill 应该被当作一种可发现、可加载、可替换的能力资源，而不是把全部交易规则硬编码在 Agent 的系统 Prompt 里。

一个最小的 `otc-trading` Skill 可以包含：

```text
otc-trading/
├── SKILL.md
├── examples/
│   ├── buy-usdt.md
│   └── sell-usdt.md
├── policies/
│   └── confirmation.md
└── schemas/
    └── taker-intent.json
```

其中：

- `SKILL.md` 描述任务边界、术语和流程；
- `examples/` 提供典型输入和期望行为；
- `policies/` 说明确认、拒绝和人工审核条件；
- `schemas/` 定义结构化输入输出。

### 2. Skill Manifest

为了让 Harness 能够发现 Skill，可以使用一个 Manifest 描述它：

```json
{
  "name": "otc-trading",
  "version": "1.0.0",
  "description": "识别和编排 OTC P2P 交易流程",
  "triggers": [
    "买币",
    "卖币",
    "查找商家",
    "查询 OTC 订单"
  ],
  "tools": [
    "create_taker_order",
    "search_maker_ads",
    "get_order_status",
    "reserve_match"
  ],
  "permissions": [
    "trade.read",
    "trade.write"
  ]
}
```

这个 Manifest 解决的是“这个 Skill 是什么、什么时候可能被使用、能使用哪些工具、需要什么权限”，而不是直接执行交易。

### 3. Skill Loader 的职责

一个 Skill Loader 通常需要完成：

```text
发现 Skill
  ↓
校验名称和版本
  ↓
读取 Manifest
  ↓
检查来源和信任级别
  ↓
注册 Skill Provider
  ↓
在 Agent 需要时加载完整内容
  ↓
把 Skill 指令注入当前任务上下文
```

加载和调用应该分开：

```text
Skill Discovery：有哪些 Skill 可用？
Skill Load：加载某个 Skill 的完整内容
Skill Invocation：当前任务是否真的使用这个 Skill？
```

这样做的好处是：所有 Skill 不必在每一次模型请求中全部展开，能够减少上下文浪费，也能根据 Agent 的作用域选择不同的 Skill。

### 4. Skill 的最小边界

当前最小 Skill 只负责：

```text
识别 OTC 交易意图
抽取交易参数
解释交易流程
决定缺哪些参数
说明哪些动作需要确认
```

它暂时不负责：

```text
直接查询余额
直接判断 KYC
直接决定 Maker 是否可成交
直接锁定资产
直接释放托管资金
```

Skill 提供的是“任务方法和边界”，不是“无限权限”。

## 三、Tool 如何定义？

### 1. Tool 是受控动作接口

Tool 是 Agent 可以请求调用的接口。它应该有明确的：

- 名称；
- 输入 Schema；
- 输出 Schema；
- 权限要求；
- 风险级别；
- 超时策略；
- 幂等策略；
- 审计要求。

例如，查询 Maker 广告可以定义为：

```json
{
  "name": "search_maker_ads",
  "description": "查询满足交易条件的 Maker 广告",
  "inputSchema": {
    "type": "object",
    "required": [
      "side",
      "asset",
      "fiat_currency",
      "fiat_amount",
      "payment_methods"
    ],
    "properties": {
      "side": {
        "type": "string",
        "enum": ["buy", "sell"]
      },
      "asset": {
        "type": "string"
      },
      "fiat_currency": {
        "type": "string"
      },
      "fiat_amount": {
        "type": "number",
        "exclusiveMinimum": 0
      },
      "payment_methods": {
        "type": "array",
        "items": { "type": "string" }
      }
    }
  }
}
```

### 2. Tool 需要区分查询和写操作

建议至少分成两类：

```text
Read Tool：查询公开或用户有权限读取的信息
Write Tool：创建订单、修改状态、锁定资源或发起资金动作
```

例如：

| Tool | 类型 | 风险 |
| --- | --- | --- |
| `search_maker_ads` | Read | 低 |
| `get_maker_balance` | Read | 中 |
| `get_user_compliance_status` | Read | 高敏感 |
| `create_taker_order` | Write | 中 |
| `reserve_match` | Write | 高 |
| `release_escrow` | Write | 极高 |

读操作也可能涉及敏感数据，但写操作通常会进一步要求确认、权限、风控和审计。

### 3. Tool 的元数据

可以在 Tool 注册表中保存额外元数据：

```ts
type ToolRiskLevel = 'low' | 'medium' | 'high' | 'critical'

interface ToolMetadata {
  name: string
  riskLevel: ToolRiskLevel
  requiredPermissions: string[]
  idempotent: boolean
  timeoutMs: number
  requiresUserConfirmation: boolean
  requiresHumanReview: boolean
  auditLevel: 'normal' | 'sensitive' | 'financial'
}
```

例如：

```ts
const reserveMatchMetadata: ToolMetadata = {
  name: 'reserve_match',
  riskLevel: 'high',
  requiredPermissions: ['trade.write'],
  idempotent: true,
  timeoutMs: 1500,
  requiresUserConfirmation: true,
  requiresHumanReview: false,
  auditLevel: 'financial',
}
```

这些字段不是装饰信息。Tool Router 可以根据它们决定：是否需要用户确认、是否允许自动重试、是否要写敏感审计日志，以及请求失败后能否安全恢复。

## 四、Agent 如何调用 Tool？

### 1. Agent 不应该直接访问数据库

一个不可靠的设计是：模型生成 SQL，Agent 直接执行 SQL，然后把结果返回给用户。

更合理的设计是：

```text
Agent 生成 Tool Call
  ↓
Tool Router 找到注册的 Tool
  ↓
校验输入 Schema
  ↓
检查当前 Agent 的权限
  ↓
检查用户确认和风控条件
  ↓
调用领域服务
  ↓
记录 Tool Call 和结果
  ↓
把结构化结果交回 Agent
```

这样，模型不会直接拥有数据库、余额服务或订单表的任意访问权。

### 2. 从用户输入到 Tool Call

用户输入：

```text
我要用 5 万人民币买 USDT，优先支付宝，找响应最快的商家。
```

Agent 首先生成意图，而不是立刻锁单：

```json
{
  "intent": "create_taker_order",
  "side": "buy",
  "asset": "USDT",
  "fiat_currency": "CNY",
  "fiat_amount": 50000,
  "payment_methods": ["alipay"],
  "preferences": {
    "sort_by": "response_time"
  }
}
```

接着 Planner 可能选择查询广告：

```json
{
  "tool": "search_maker_ads",
  "arguments": {
    "side": "buy",
    "asset": "USDT",
    "fiat_currency": "CNY",
    "fiat_amount": 50000,
    "payment_methods": ["alipay"],
    "sort_preference": "response_time"
  }
}
```

注意：对于买入 USDT 的 Taker，Maker 广告的方向通常是卖出 USDT。这里的用户意图方向和对手方广告方向需要由撮合领域模型明确规范，不能让每个 Prompt 自己解释。

### 3. Tool Router 的职责

Tool Router 至少应该做以下检查：

```text
Tool 是否存在？
当前 Agent 是否可见？
当前用户是否拥有所需权限？
参数是否符合 Schema？
参数是否满足业务约束？
是否需要用户确认？
是否需要人工审核？
是否具有幂等键？
是否超时？
是否需要重试？
```

如果是只读检索，可以直接调用；如果是锁单操作，则应该停在确认节点：

```text
Agent：我找到一个符合条件的 Maker。
价格：7.20 CNY / USDT
数量：5,000 USDT
支付方式：支付宝
预计支付：36,000 CNY

确认后将锁定该报价，是否继续？
```

用户明确确认后，才允许继续提交 `reserve_match`。

### 4. Agent Loop 的最小伪代码

```ts
async function runAgent(input: string) {
  const skill = await skillRegistry.load('otc-trading')
  const intent = await planner.extractIntent(input, skill)

  validateIntent(intent)

  const plan = await planner.next({ intent, skill })

  if (plan.type === 'ask_user') {
    return { type: 'question', content: plan.question }
  }

  if (plan.type === 'tool_call') {
    const result = await toolRouter.execute({
      name: plan.tool,
      arguments: plan.arguments,
      idempotencyKey: plan.idempotencyKey,
    })

    return await planner.continue({ intent, result })
  }

  return plan
}
```

真实系统还需要增加：

- Session Event；
- Checkpoint；
- Tool 超时；
- 错误分类；
- 失败补偿；
- 人工审核；
- 订单状态校验。

## 五、订单数据如何结构化？

### 1. 不要把整句话直接当成订单

原始文本：

```text
我要用 5 万人民币买 USDT，优先支付宝，找响应最快的商家。
```

它不是订单表的一行数据，而是一个包含目标、约束和偏好的用户请求。

建议至少分成三层：

```text
原始输入
  ↓
规范化 Intent
  ↓
可持久化的 Taker Order
```

### 2. Intent 数据

Intent 表示 Agent 当前理解的用户目标：

```ts
interface TakerIntent {
  intent: 'create_taker_order' | 'search_quotes' | 'get_order_status'
  side: 'buy' | 'sell'
  asset: string
  fiatCurrency: string
  fiatAmount?: number
  assetAmount?: number
  paymentMethods: string[]
  preferences: {
    sortBy?: 'price' | 'response_time' | 'completion_rate'
    preferredMakerIds?: string[]
  }
  missingFields: string[]
}
```

Intent 可以暂时存在 Agent 的 Working Memory 中，但不能取代订单记录。

### 3. Taker Order 数据

订单是领域对象，需要比 Intent 更稳定、更严格：

```ts
interface TakerOrder {
  orderId: string
  userId: string
  side: 'buy' | 'sell'
  asset: string
  fiatCurrency: string
  fiatAmount?: number
  assetAmount?: number
  priceLimit?: number
  paymentMethods: string[]
  status:
    | 'CREATED'
    | 'MATCHING'
    | 'MATCHED'
    | 'RESERVED'
    | 'AWAITING_PAYMENT'
    | 'PAYMENT_SUBMITTED'
    | 'COMPLETED'
    | 'CANCELLED'
    | 'EXPIRED'
    | 'DISPUTED'
  expiresAt: string
  version: number
  createdAt: string
  updatedAt: string
}
```

订单数据必须具备：

- 稳定的 `orderId`；
- 明确的用户归属；
- 规范化的币种和金额；
- 受限的状态枚举；
- 过期时间；
- 版本号；
- 创建和更新时间。

### 4. Maker Advertisement 数据

Maker 广告是撮合候选，不是成交订单：

```ts
interface MakerAdvertisement {
  adId: string
  makerId: string
  side: 'buy' | 'sell'
  asset: string
  fiatCurrency: string
  price: number
  minAmount: number
  maxAmount: number
  paymentMethods: string[]
  availableBalance: number
  online: boolean
  completionRate: number
  averageResponseSeconds: number
  disputeRate: number
  riskScore: number
  activeUntil: string
}
```

广告中的 `availableBalance` 适合用于筛选和展示，但真正锁定时仍然必须由余额或 Reservation 服务再次确认。

```text
广告可用余额 ≠ 已锁定余额
查询结果 ≠ 原子 Reservation
撮合候选 ≠ 成交事实
```

### 5. 交易事件数据

订单状态的变化应该产生事件：

```ts
interface OrderEvent {
  eventId: string
  orderId: string
  type:
    | 'order.created'
    | 'order.matched'
    | 'order.reserved'
    | 'payment.submitted'
    | 'order.completed'
    | 'order.cancelled'
    | 'order.disputed'
  fromStatus?: TakerOrder['status']
  toStatus?: TakerOrder['status']
  actorType: 'user' | 'agent' | 'system' | 'human_reviewer'
  actorId?: string
  reason?: string
  occurredAt: string
  metadata?: Record<string, unknown>
}
```

Agent 的对话记录说明“Agent 做了什么”，订单事件说明“业务事实发生了什么”。两者都需要，但不能混为一谈。

## 六、四个层次如何协作？

把前面的内容合在一起，用户请求的处理可以是：

```text
1. Agent 识别“买入 USDT”的意图
2. otc-trading Skill 提供交易流程和安全边界
3. Agent 将“5 万人民币”和“支付宝”规范化
4. Tool Router 校验字段和权限
5. search_maker_ads 查询符合条件的广告
6. 撮合服务执行方向、金额、支付方式和在线状态过滤
7. 评分服务按照价格、速度、完成率和风险进行排序
8. Agent 解释为什么推荐某个 Maker
9. 用户明确确认报价
10. reserve_match Tool 请求锁定
11. 订单服务再次检查余额、版本、过期时间和风控
12. 成功后从 MATCHED 进入 RESERVED
13. 写入 order.reserved 事件
14. 通知 Maker 和 Taker 进入支付流程
```

这里每一层都有自己的职责：

| 层 | 负责内容 | 不应负责的内容 |
| --- | --- | --- |
| Skill | 流程、术语、边界、确认策略 | 直接修改余额和订单 |
| Agent / Planner | 意图、参数、下一步计划、解释 | 绕过权限和规则 |
| Tool Router | Tool 发现、Schema、权限、幂等、审计 | 自己发明交易事实 |
| 撮合服务 | 硬规则过滤和候选排序 | 自然语言对话 |
| 订单服务 | 状态机、Reservation、版本和持久化 | 让 LLM 自由修改状态 |
| RAG | 检索规则、流程和政策 | 提供实时余额和 KYC 事实 |

## 七、最小实现的推荐顺序

如果你正在学习 Agent Harness，不要一开始就做完整的 OTC 平台。建议按下面的顺序逐步实现：

### 第一步：只做 Intent Parser

输入一句自然语言，输出：

```json
{
  "side": "buy",
  "asset": "USDT",
  "fiat_currency": "CNY",
  "fiat_amount": 50000,
  "payment_methods": ["alipay"],
  "missing_fields": []
}
```

### 第二步：只做一个只读 Tool

实现：

```text
search_maker_ads
```

先使用固定的 Mock Maker 数据，不接真实撮合服务。

### 第三步：增加 Tool Router

加入：

- Schema 校验；
- Tool 不存在处理；
- 超时处理；
- 调用日志；
- 权限检查。

### 第四步：增加订单对象

将查询结果转成：

```text
TakerIntent → TakerOrder
```

但暂时不实现资金动作。

### 第五步：最后再做 Reservation

只有理解了用户确认、状态机、幂等和并发之后，才实现：

```text
reserve_match
```

## 八、常见错误和排查方法

### 错误一：Skill 写得很详细，但没有 Tool Schema

结果是模型知道“应该查 Maker”，却不知道如何传递金额、币种和支付方式。

解决：为每个动作定义结构化输入和输出。

### 错误二：Tool 能调用，但没有权限和风险元数据

结果是查询广告和释放托管看起来没有区别。

解决：给 Tool 增加风险级别、权限、确认和审计信息。

### 错误三：Agent 直接拼接 SQL 或访问数据库

结果是业务规则、权限和审计被绕开。

解决：所有领域动作通过受控 Tool 进入领域服务。

### 错误四：把 Intent 当成订单

结果是用户一句“我想买”就被误认为已经创建了交易订单。

解决：区分：

```text
用户意图
  ≠
订单创建
  ≠
撮合成功
  ≠
资源锁定
  ≠
支付完成
```

### 错误五：只用文本描述订单状态

结果是模型可能把“已经找到报价”说成“已经成交”。

解决：使用有限状态枚举和状态迁移规则，回答时从订单服务读取当前状态。

## 九、面试时如何回答这四个问题？

可以用下面这段话进行总结：

> Skill 是可发现、可加载的任务能力，负责提供 OTC 流程、术语和操作边界；Tool 是带有输入输出 Schema、权限、风险级别、超时和幂等策略的受控接口；Agent 通过 Planner 生成 Tool Call，再由 Tool Router 做参数、权限、确认和审计检查，最后调用领域服务；订单数据则需要从自然语言 Intent 进一步规范化为 Taker Order、Maker Advertisement 和 Order Event，订单状态、余额和 KYC 等事实由领域服务或合规系统提供，不能由 LLM 或 RAG 自行推断。

这四层分别解决了：

```text
Skill：怎么完成一类任务
Tool：可以执行什么动作
Agent：下一步该做什么
订单模型：业务事实如何可靠保存
```

## 结语

学习 Agent Harness 时，真正重要的不是记住某个框架的 API，而是建立下面这套思维：

```text
自然语言负责表达目标
Skill 负责提供方法
Agent 负责规划
Tool 负责暴露受控能力
Router 负责安全编排
领域服务负责执行事实
订单模型负责保存事实
事件日志负责记录事实
```

当你能把一句“我要用 5 万人民币买 USDT”拆成这些层次，就已经开始具备设计生产级 Agent 的能力。下一步可以在这个最小链路上继续加入 RAG、Maker IM 通知、风控规则和 Human-in-the-loop，逐渐扩展成完整的 OTC Agent Marketplace。
