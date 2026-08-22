---
title: OTC 撮合 Agent 中，8 类职责到底应该由谁负责？
description: 以“我要用 5 万人民币买 USDT，优先支付宝，找响应最快的商家”为例，拆解 Agent Harness 中的意图理解、Skill、Tool Router、规则引擎、RAG、风控、解释和订单锁定边界。
date: 2026-08-22
category: 技术教程
tags: [AI Agent, Agent Harness, OTC 撮合, P2P, Skill, Tool Router, RAG, 订单状态机]
readTime: 12
relatedPath: /docs/blog/why-session-is-not-memory/
relatedTitle: 为什么 Session 不应该等同于 Memory？
---

在 OTC 或 P2P 撮合系统里，最容易出现的架构问题不是模型能力不够，而是职责边界没有划清。

当用户说：

> 我要用 5 万人民币买 USDT，优先支付宝，找响应最快的商家。

表面上看，这只是一个自然语言查询；实际上，它包含了意图识别、结构化解析、广告查询、余额校验、KYC 判断、排序解释和订单状态迁移等多个不同性质的动作。

如果把这些事情都交给 LLM，系统会变得不可审计、不可复现，也无法安全地处理“锁定订单”这样的副作用操作。正确做法是让 LLM 负责理解和提出计划，让 Skill 负责业务流程，让 Tool 负责访问事实，让规则引擎负责硬约束，让订单状态机负责最终写入。

这篇文章用一个具体订单，把 Harness 中每一层应该负责什么拆开说明。

## 先给结论：8 个问题的责任分配

| 用户需求 | 主要负责者 | LLM 是否可以参与 | 最终事实来源 |
| --- | --- | --- | --- |
| 识别用户想买 USDT | Agent Planner / 意图解析器 | 可以，负责理解自然语言 | 结构化 Intent |
| 解析金额 50,000 | 参数解析器 + 金额校验规则 | 可以提取，但不能自行放行 | 规范化订单参数 |
| 解析支付方式支付宝 | 参数解析器 + 支付方式词典 | 可以识别同义词 | 支付方式枚举和账户能力 |
| 查找 Maker 广告 | OTC Match Skill + Tool Router | 可以选择调用哪个 Skill | 广告服务返回的实时数据 |
| 检查 Maker 余额 | 余额查询 Tool + 风控/资格规则 | 不应凭记忆判断 | 资金账户或托管系统 |
| 判断用户是否完成 KYC | KYC Tool + 合规规则引擎 | 不应仅靠对话内容判断 | KYC/AML 系统 |
| 解释为什么推荐某个 Maker | Planner + 解释生成器 | 可以生成自然语言解释 | 已记录的排序特征和规则命中 |
| 锁定订单 | Order Skill + 订单状态机 + 原子锁定 Tool | 不能直接执行 | 订单、库存和锁定服务 |

最重要的一句话是：

> LLM 可以理解请求、生成计划和解释结果，但不能凭语言生成事实，也不能绕过领域工具直接改变交易状态。

## 一、先区分四种不同的工作

这个请求至少包含四种工作，它们不应该放进同一个“Agent 思考”函数里。

### 1. 理解：用户想做什么

“买 USDT”“5 万人民币”“优先支付宝”“响应最快”是自然语言表达。系统需要把它们转成结构化意图：

```json
{
  "intent": "buy_crypto",
  "asset": "USDT",
  "fiat_currency": "CNY",
  "fiat_amount": 50000,
  "payment_method_preference": ["alipay"],
  "ranking_preference": "fastest_response",
  "requires_quote": true
}
```

这是理解工作，可以由 LLM 或专门的 Intent Parser 完成。但结果必须经过 Schema 校验，不能因为模型输出了一个看起来合理的 JSON，就直接进入交易流程。

### 2. 查询：系统当前有什么事实

“有哪些 Maker 广告”“某个 Maker 还有多少可用额度”“用户的 KYC 状态是什么”都不是推理题，而是事实查询。

这些数据可能在广告服务、账户服务、KYC 服务、风控服务或订单服务里。Agent 应该通过 Tool Router 调用工具，而不是从 Session、向量库或模型常识中猜测。

### 3. 决策：哪些候选人符合规则

“是否允许匹配”“哪些广告可以进入候选集”“谁更适合当前用户”是规则和排序问题。

例如：

- 广告资产必须是 USDT；
- 法币必须是 CNY；
- 广告支持支付宝；
- 广告剩余限额必须覆盖 50,000；
- Maker 必须在线或满足响应时效要求；
- Taker 必须完成所需 KYC；
- 风控信号不能超过阈值。

这些硬约束应由规则引擎执行。LLM 可以帮助选择策略或解释排序，但不应成为“余额够不够”和“是否允许交易”的唯一裁判。

### 4. 执行：系统真的发生了变化

“锁定订单”不是返回一段文字，而是一次有副作用的状态变更。它可能同时影响：

- 订单状态；
- Maker 广告剩余额度；
- 资金或库存锁定；
- 超时计时器；
- 风控审计日志；
- IM 通知和后续事件。

这类动作必须通过受控 Tool 和订单状态机完成，并具备幂等键、权限校验、并发控制和失败恢复。

## 二、Harness 中各层的职责

可以把一次 OTC Agent 请求画成下面的链路：

```text
用户消息
   │
   ▼
Session / Event Log
   │
   ▼
Intent Parser ──► 结构化 Intent
   │
   ▼
Planner ──► 选择 OTC Match Skill
   │
   ▼
Skill ──► 编排查询、资格检查、排序和确认
   │
   ▼
Tool Router ──► 广告、余额、KYC、风控、订单工具
   │
   ▼
Rules / Policy ──► 硬约束和资格判断
   │
   ▼
Human-in-loop ──► 高风险动作确认
   │
   ▼
Order State Machine ──► Quote / Reserved / Locked
```

### Session：记录这次运行发生了什么

Session 负责保存本次 Agent 运行的事件轨迹，例如：

- 用户原始消息；
- 模型提取出的 Intent；
- 调用了哪些工具；
- 工具返回了什么；
- 哪些规则命中了；
- 用户是否确认；
- 哪个动作失败或重试。

Session 是恢复、审计和回放的依据，但它不是实时订单数据库，也不是用户长期偏好库。不能因为 Session 中曾经出现过“Maker 余额充足”，就认为当前余额仍然充足。

### Planner：决定下一步做什么

Planner 负责把结构化目标拆成有依赖关系的步骤，例如：

```text
解析请求
  → 获取候选广告
  → 查询实时余额
  → 查询 Taker KYC
  → 执行资格规则
  → 排序候选 Maker
  → 生成报价解释
  → 请求确认
  → 锁定订单
```

Planner 不应该自己实现余额查询、KYC 查询或订单写入。它负责调度，不负责冒充领域服务。

### Skill：承载可复用的业务流程

`otc_match` 可以是一个 Skill。它定义：

- 需要哪些输入；
- 需要经过哪些步骤；
- 哪些工具可以被调用；
- 哪些规则必须先通过；
- 哪些步骤需要用户确认；
- 失败后如何回滚或重新报价。

Skill 的价值是把“买币撮合”从一次临时对话变成可复用、可测试、可观测的业务能力。

Skill 不应该把真实余额写死在提示词里，也不应该把“锁单成功”写成模型可以自行宣布的结论。

### Tool Router：把动作路由到正确的工具

Tool Router 负责根据工具契约选择和调用正确的工具，例如：

```text
search_maker_ads
get_maker_available_balance
get_user_kyc_status
evaluate_otc_risk
create_quote
lock_order
send_im_notification
```

它还应该负责：

- 参数 Schema 校验；
- 权限和租户隔离；
- 超时与重试；
- 幂等键传递；
- 工具错误标准化；
- 审计日志。

Tool Router 不是简单的函数调用表。对于交易系统，它是 Agent 和真实世界副作用之间的安全边界。

## 三、逐项回答：这 8 个问题到底由谁负责

### 1. 识别用户想买 USDT：Planner 或 Intent Parser

输入是自然语言，输出是结构化意图。可以由 LLM 做初步解析，也可以用轻量分类器和实体抽取器辅助完成。

建议输出至少包含：

```json
{
  "intent": "buy_crypto",
  "asset": "USDT",
  "direction": "taker_buy",
  "confidence": 0.98,
  "source_span": "买 USDT"
}
```

这里的 `confidence` 只能用于决定是否需要澄清，不能替代交易规则。比如模型把“卖出 USDT”识别成“买入 USDT”，必须在后续的 schema、方向和订单预览阶段被拦截。

### 2. 解析金额 50,000：参数解析器加金额规则

LLM 可以从“5 万人民币”提取出 `50000 CNY`，但金额解析必须经过确定性归一化：

- “5 万”转换为 `50000`；
- “人民币”转换为 `CNY`；
- 拒绝负数、零金额和超范围金额；
- 明确是法币金额，还是 USDT 数量；
- 处理小数、千分位和中文数字；
- 根据报价有效期重新计算可购买数量。

如果用户说“用 5 万买 USDT”，`50000` 通常是法币支付金额，而不是 50,000 个 USDT。这个语义不能靠后续猜测，应该在订单预览中明确展示：

```text
支付金额：50,000 CNY
购买资产：USDT
最终数量：以锁定时报价为准
```

金额本身是输入参数，订单服务返回的报价和最终成交数量才是交易事实。

### 3. 解析支付方式支付宝：支付方式词典和账户能力服务

“支付宝”“蚂蚁支付”“支付宝转账”等表达可以先由模型归一化为 `alipay`，但最终是否可用不能只看文本。

至少要检查：

- 当前平台是否支持支付宝；
- 该 Maker 广告是否声明支持支付宝；
- 用户是否具备该支付方式；
- Maker 的收款账户是否处于可用状态；
- 是否存在地域、额度或风控限制。

因此，模型负责识别偏好，支付方式服务负责提供枚举和能力事实，规则引擎负责判断候选广告是否满足条件。

### 4. 查找 Maker 广告：OTC Match Skill 调用广告 Tool

这不是“让模型搜索网页”，而是调用平台自己的广告查询接口。Skill 负责定义查询意图和过滤条件，Tool Router 负责实际调用：

```json
{
  "asset": "USDT",
  "fiat_currency": "CNY",
  "fiat_amount": 50000,
  "payment_methods": ["alipay"],
  "side": "sell",
  "status": "online"
}
```

广告工具应返回结构化字段，例如：

```json
{
  "ad_id": "ad_123",
  "maker_id": "maker_456",
  "price": 7.18,
  "available_amount": 12000,
  "min_amount": 1000,
  "max_amount": 80000,
  "payment_methods": ["alipay"],
  "response_time_p50_seconds": 18,
  "maker_online": true,
  "quote_expires_at": "2026-08-22T12:01:00Z"
}
```

注意：广告列表是动态数据。它可以被缓存用于候选召回，但在报价和锁单前必须重新校验关键字段。

### 5. 检查 Maker 余额：余额 Tool，而不是 RAG 或 Memory

Maker 广告上的可交易额度和 Maker 账户的实时可用余额不是同一个字段。

推荐至少区分：

- 广告声明额度；
- 账户可用余额；
- 已被其他订单锁定的余额；
- 风控冻结金额；
- 本次订单可承诺额度。

余额查询必须调用实时账户或托管服务，并且最好在锁单动作内部再次做原子校验。因为在“查询余额”和“锁定订单”之间，另一个 Taker 可能已经消耗了这部分流动性。

所以正确流程是：

```text
候选召回时查询余额
   → 生成报价
   → 用户确认
   → lock_order 内部再次校验并原子锁定
```

RAG 可以检索 Maker 的交易规则、历史服务说明或帮助文档，但不能用来判断“现在还剩多少 USDT”。

### 6. 判断用户是否完成 KYC：KYC Tool 加合规策略

KYC 判断属于合规事实和政策执行，不能根据用户说“我已经认证了”来推断。

系统应该查询：

- 当前用户的 KYC 等级；
- 认证状态和有效期；
- 是否需要额外的身份验证；
- 当前交易金额是否触发增强尽调；
- 是否命中 AML、制裁名单或风险黑名单；
- 当前地区和产品是否允许交易。

可以把结果设计为：

```json
{
  "kyc_status": "verified",
  "kyc_level": 2,
  "transaction_limit_cny": 100000,
  "aml_review_required": false,
  "decision": "eligible"
}
```

LLM 可以把 `eligible` 解释成用户能理解的话，但不能更改它。任何“跳过 KYC”“临时放行”的要求都必须进入人工审核或明确的合规流程。

### 7. 解释为什么推荐某个 Maker：排序特征记录加 LLM 解释

“找响应最快的商家”首先是排序目标，不是让模型凭印象推荐。

推荐系统应先生成可审计的排序特征：

```json
{
  "maker_id": "maker_456",
  "eligible": true,
  "score": 0.91,
  "ranking_features": {
    "response_time_p50_seconds": 18,
    "completion_rate_30d": 0.997,
    "payment_method_match": 1,
    "liquidity_coverage": 1,
    "price_rank": 3
  },
  "rules_passed": [
    "supports_alipay",
    "amount_within_limits",
    "maker_balance_sufficient",
    "maker_online"
  ]
}
```

然后由解释生成器把这些事实变成自然语言：

> 推荐 Maker A，是因为其支持支付宝，当前可用额度覆盖 50,000 CNY，近 30 天完成率为 99.7%，历史响应时间中位数约 18 秒。它的价格不是当前最低，因此系统将“响应速度优先”放在价格之前。

解释生成器可以是 LLM，但解释中的数字、规则和排序原因必须来自已记录的决策快照，不能让模型自行编造。

如果推荐结果受到硬规则影响，也要把“为什么没有推荐某个 Maker”记录下来，例如：余额不足、支付方式不匹配、KYC 不满足或风控拦截。

### 8. 锁定订单：Order Skill、状态机和原子 Tool

这是 8 个动作里风险最高的一个。

“锁定订单”至少要包含：

- 重新确认用户授权和订单摘要；
- 检查报价是否过期；
- 检查 Maker 广告是否仍在线；
- 再次检查余额和限额；
- 检查用户 KYC 和风控状态；
- 生成幂等键；
- 原子锁定订单与可用额度；
- 写入审计事件；
- 通知 Taker 和 Maker。

一个简化的状态机可以是：

```text
Draft
  → Quoted
  → AwaitingUserConfirmation
  → Locking
  → Locked
  → PaymentPending
  → Paid
  → Released / Cancelled / Expired
```

LLM 可以发起 `lock_order` 工具调用，但工具必须检查调用上下文中的授权、订单版本、幂等键和权限。只有工具返回成功，Agent 才能向用户说“订单已锁定”。

如果工具调用超时，不能让模型根据“看起来应该成功”继续往下说。正确做法是查询订单状态：

```text
lock_order 超时
   → query_order_status
      ├─ Locked：继续后续流程
      ├─ NotLocked：重新生成幂等请求或回到报价
      └─ Unknown：进入人工处理或延迟重试
```

## 四、哪些内容适合放进 RAG，哪些绝对不应该只靠 RAG

RAG 很有用，但要放在正确的位置。

### 适合进入 RAG 的内容

- OTC 交易流程说明；
- 支付方式使用规则；
- 费率、限额和产品政策文档；
- Maker 服务条款和广告描述；
- KYC/AML 流程说明；
- 对用户解释决策的知识库；
- Tool 使用说明和错误码文档。

这些内容通常是半结构化或文档型知识，适合通过检索提供给 Planner 或解释生成器。

### 不应该只靠 RAG 的内容

- 当前 Maker 余额；
- 当前广告在线状态；
- 用户实时 KYC 状态；
- 当前风控结论；
- 当前订单状态；
- 是否已经锁定额度；
- 是否已经收到付款。

这些内容属于动态业务事实，必须通过实时 Tool 或领域服务查询。向量库中的旧数据最多只能作为背景信息，不能替代实时查询。

## 五、一次正确的 Harness 执行过程

下面是一个可落地的最短成功路径。

### 第一步：解析请求，但不执行副作用

Agent 得到结构化 Intent，并检查是否缺少必要字段：资产、法币、金额、支付方式和排序偏好。

验证信号：

```text
支付 50,000 CNY 购买 USDT，支付方式偏好支付宝，排序目标响应速度。
```

如果用户说“买 5 万”，但没有明确币种或法币，Agent 应先澄清，而不是直接搜索广告。

### 第二步：调用撮合 Skill

Planner 选择 `otc_match` Skill。Skill 创建一个带版本号的撮合上下文，记录本次规则版本、报价请求和用户授权范围。

验证信号：

- 已创建 match context；
- 请求参数通过 Schema 校验；
- 没有执行锁单动作。

### 第三步：并行查询候选事实

在不产生副作用的前提下，可以并行调用：

- Maker 广告查询；
- Taker KYC 查询；
- 用户支付方式能力查询；
- 风控预检查。

随后对每个候选 Maker 查询实时余额或可承诺额度。

验证信号：所有数据都有 `as_of` 时间戳、来源和请求 ID。

### 第四步：规则引擎过滤，再进行排序

先执行硬过滤：

```text
支持 USDT
且支持 CNY
且支持支付宝
且金额在广告限额内
且 Maker 可承诺额度足够
且 Taker KYC 合格
且风险检查通过
```

过滤之后，再按照用户偏好排序。响应速度可以作为主要排序特征，价格、完成率、成交量和在线时间作为次级特征。

### 第五步：生成报价和解释

向用户展示：

- Maker 名称或脱敏标识；
- 价格和预计获得数量；
- 支付方式；
- 可用额度；
- 预计响应时间；
- 报价有效期；
- 推荐原因；
- 风险提示。

这里的解释应该引用排序快照，而不是重新让模型“想一遍为什么推荐”。

### 第六步：用户确认后锁单

锁单之前，必须让用户明确看到订单摘要：

```text
你将支付：50,000 CNY
支付方式：支付宝
购买资产：USDT
报价有效期：60 秒
推荐原因：支付宝匹配、额度充足、历史响应时间中位数 18 秒

是否确认锁定此订单？
```

只有明确确认后，Harness 才能调用 `lock_order`。工具内部再次校验实时事实，并用原子操作完成锁定。

## 六、常见的错误架构

### 错误一：让 LLM 直接返回“余额足够”

模型可以生成“余额足够”这句话，但它没有访问当前余额的权限或证据。改法是：余额必须来自 Tool，判断必须来自规则，语言只是最后的表达层。

### 错误二：把广告列表塞进 Prompt 长期复用

广告、价格、在线状态和额度都是动态数据。把上一轮查询结果留在 Session 或 Memory 中，会造成过期匹配。改法是：广告可以缓存用于短时间候选召回，但报价和锁单前必须刷新。

### 错误三：用一个总分取代所有业务规则

如果把 KYC、余额、支付方式、风险和响应速度都压缩成一个 LLM 分数，系统可能为了“响应快”而推荐不合规的 Maker。改法是：先硬过滤，再软排序。

### 错误四：模型说“已锁单”，但工具没有成功

这会直接造成用户和系统状态不一致。改法是：只有订单服务返回 `Locked`，Agent 才能输出成功；超时必须查询状态，而不是猜测。

### 错误五：解释和实际决策不一致

模型可能说“因为价格最低”，但实际排序是“响应最快”。改法是保存 `decision_snapshot`，解释只允许引用快照中的特征和规则。

## 七、推荐的数据契约

为了让不同组件之间不互相越权，建议定义明确的数据契约。

### Intent 契约

```json
{
  "intent_id": "intent_001",
  "type": "buy_crypto",
  "asset": "USDT",
  "fiat_currency": "CNY",
  "fiat_amount": 50000,
  "payment_method": "alipay",
  "ranking_preferences": ["response_time"],
  "confidence": 0.98
}
```

### Decision Snapshot 契约

```json
{
  "decision_id": "decision_001",
  "rule_version": "otc-policy-2026-08-01",
  "generated_at": "2026-08-22T12:00:10Z",
  "selected_maker": "maker_456",
  "ranking_features": {
    "response_time_p50_seconds": 18,
    "completion_rate_30d": 0.997,
    "price_rank": 3,
    "payment_method_match": true
  },
  "rules_passed": [
    "kyc_eligible",
    "balance_sufficient",
    "payment_method_supported"
  ],
  "rules_failed_for_others": {
    "maker_789": ["insufficient_available_balance"]
  }
}
```

### Lock Order 契约

```json
{
  "order_id": "order_001",
  "quote_id": "quote_001",
  "decision_id": "decision_001",
  "expected_version": 3,
  "idempotency_key": "lock:session_001:order_001:v3",
  "user_confirmation": {
    "confirmed": true,
    "confirmed_at": "2026-08-22T12:00:30Z"
  }
}
```

这个契约说明了一个重要原则：锁单动作不应该只接收一段自然语言，而应该接收可校验的订单上下文、版本、授权和幂等信息。

## 八、工程验收清单

在把这个 OTC Agent 放进生产环境前，至少检查以下项目：

- [ ] 自然语言已经转换为明确的 Intent Schema；
- [ ] 金额、币种和交易方向经过确定性校验；
- [ ] 广告、余额、KYC 和风控都通过实时 Tool 查询；
- [ ] RAG 没有被当作实时订单或余额数据库；
- [ ] 规则引擎先过滤硬约束，再执行排序；
- [ ] 推荐解释引用了决策快照；
- [ ] 订单锁定只能在用户明确确认后发生；
- [ ] `lock_order` 具备幂等键和并发版本校验；
- [ ] 工具超时后会查询真实订单状态；
- [ ] 所有关键判断都记录了规则版本、时间戳和数据来源；
- [ ] 高风险或不确定场景能够转人工；
- [ ] Agent 重启后可以从 Session 恢复流程，但会重新读取实时领域事实。

## 最后总结

在这个例子中，最合理的职责分工不是“LLM 负责所有事情”，而是：

```text
LLM / Intent Parser：理解用户说了什么
Planner：决定接下来调用哪条流程
Skill：编排 OTC 撮合业务步骤
Tool Router：访问真实系统并执行受控动作
规则引擎：判断硬约束和资格条件
排序器：根据用户偏好比较合格候选
LLM：把事实和决策快照解释给用户
订单状态机：维护交易状态并完成锁定
Human-in-loop：处理高风险、不确定或需要人工授权的动作
```

如果把这条边界设计好，Agent 才能同时具备自然语言交互能力和交易系统需要的确定性、可审计性与安全性。

> 一个成熟的 OTC Agent，不是会“聊天”的撮合机器人，而是一个由 LLM 驱动理解、由 Skill 组织流程、由 Tool 连接事实、由规则和状态机守住交易边界的系统。
