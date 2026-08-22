---
title: 为什么 reserve_match 不能只靠 LLM 决定是否调用？
description: 以 OTC 撮合中的 reserve_match 锁定交易 Tool 为例，解释 LLM 意图判断与交易授权的区别，以及状态机、规则引擎、实时事实、并发控制、幂等和 Human-in-loop 如何共同守住副作用边界。
date: 2026-08-22
category: 技术教程
tags: [AI Agent, Agent Harness, reserve_match, Tool Calling, OTC 撮合, 订单状态机, 风控, Human-in-loop]
readTime: 11
relatedPath: /docs/blog/otc-agent-harness-responsibility-boundaries/
relatedTitle: OTC 撮合 Agent 中，8 类职责到底应该由谁负责？
---

在 OTC 撮合 Agent 中，`reserve_match` 通常代表一个高风险动作：把某个 Taker 和 Maker 的匹配结果临时锁定，并占用广告额度、库存或可交易流动性。

很多 Agent Demo 会这样设计：

```text
用户说“就选这个”
   → LLM 判断用户想锁单
   → LLM 调用 reserve_match
```

这在演示里很顺畅，但在真实交易系统里是不够的。

核心原因是：

> LLM 可以判断“对话上看起来是否应该继续”，但不能单独决定“系统是否有权执行一次不可忽略的交易状态变更”。

`reserve_match` 能否调用，至少需要同时满足用户意图、授权状态、订单版本、报价有效期、余额、KYC、风控、并发和业务规则。LLM 的输出最多是一个候选动作，真正的执行许可必须由确定性的控制层授予。

## 一、先给结论：调用建议不等于执行授权

把 `reserve_match` 的决策拆成三层，会更容易理解：

| 层次 | 要回答的问题 | 主要负责者 | 是否可以由 LLM 单独完成 |
| --- | --- | --- | --- |
| 意图层 | 用户是否表达了锁定意图？ | LLM / Intent Parser | 可以做初步判断 |
| 策略层 | 当前订单是否满足锁定条件？ | Skill + 规则引擎 + 实时 Tool | 不可以 |
| 执行层 | 现在是否能安全、原子、幂等地锁定？ | 订单状态机 + reserve_match 服务 | 不可以 |

因此，正确的架构不是：

```text
LLM → reserve_match
```

而是：

```text
LLM 提议动作
   → Harness 验证上下文
   → Policy / Rules 授权
   → Order State Machine 检查状态
   → reserve_match 原子执行
   → 返回真实结果
```

这里的每一层都可以拒绝动作，即使 LLM 的判断很有把握。

## 二、`reserve_match` 到底改变了什么？

一个看似简单的 Tool 调用，可能改变多个系统事实：

- 订单从 `Quoted` 进入 `Reserved`；
- Maker 广告的可用额度减少；
- 某一部分 USDT 或法币流动性被临时占用；
- 其他 Taker 不能再抢占同一份额度；
- 订单超时计时器开始运行；
- Taker 和 Maker 收到 IM 通知；
- 风控和审计日志记录一次关键交易事件；
- 后续付款、放币或取消流程获得合法前置状态。

这意味着 `reserve_match` 不是普通的查询 Tool，而是一个带副作用的命令。

查询类 Tool 通常回答“现在是什么”；命令类 Tool 会让系统“变成另一个状态”。对命令类 Tool，系统必须关心授权、重复调用、并发、回滚和结果确认。

## 三、LLM 为什么不能独自做最终决定

### 1. LLM 能理解语言，但不拥有交易事实

用户说：

> 就用刚才那个商家，帮我锁了吧。

LLM 可以推断用户很可能在表达确认意图，但它不知道：

- “刚才那个商家”对应哪个 `maker_id` 和 `ad_id`；
- 之前的报价是否已经过期；
- Maker 现在是否仍然在线；
- 可用余额是否仍然足够；
- 该广告是否已经被别的订单锁定；
- 用户是否已经完成当前金额对应的 KYC 要求；
- 用户确认的是哪个具体价格和数量。

这些都是实时领域事实，必须通过 Tool 或领域服务查询。

### 2. 语言确认不一定等于有效授权

“好的”“可以”“就这个”“继续”在对话里可能有很多含义：

- 同意查看报价；
- 同意继续解释；
- 同意支付方式；
- 同意创建订单草稿；
- 同意真正锁定额度。

如果系统没有明确的确认语义和订单摘要，LLM 可能把模糊回应当成锁单授权。

生产系统应把授权绑定到明确的对象和版本：

```text
用户确认锁定：订单 order_001
Maker：maker_456
资产：USDT
支付金额：50,000 CNY
支付方式：支付宝
报价：7.18 CNY / USDT
有效期：截至 12:01:00
```

只有用户明确确认这份摘要，Harness 才能继续申请锁单许可。

### 3. LLM 可能重复调用，副作用却不是天然幂等的

Agent 可能因为以下原因重复发起调用：

- 工具响应超时；
- 网络断开后自动重试；
- Planner 认为没有收到结果；
- 模型输出重复的 Tool Call；
- 用户刷新页面导致请求重放；
- Worker 崩溃后从 Session 恢复。

如果每次调用都重新占用额度，系统可能出现重复锁定、额度被多次扣减或产生多个订单。

因此，`reserve_match` 必须支持幂等键，例如：

```json
{
  "idempotency_key": "reserve:order_001:quote_001:v3"
}
```

相同幂等键的重复请求应该返回同一个锁定结果，而不是再次创建新的锁定。

### 4. LLM 不擅长处理精确的并发竞争

两个 Taker 可能几乎同时选择同一个 Maker 广告：

```text
Taker A 查询：可用 8,000 USDT
Taker B 查询：可用 8,000 USDT
Taker A 请求锁定 5,000 USDT
Taker B 请求锁定 5,000 USDT
```

如果只依赖模型之前看到的余额，两个请求都可能得到“可以锁定”的结论，但实际只有一个请求应该成功。

这是数据库和库存服务的问题，需要原子更新、版本校验、分布式锁或串行化队列，而不是更长的 Prompt。

### 5. LLM 可能把过期上下文当成当前事实

Agent 的 Session 里可能保留了几分钟前的结果：

```text
12:00:01 余额：8,000 USDT
12:00:02 报价：7.18
12:01:20 用户确认锁单
```

即使这段记录完整，它也不能证明 12:01:20 的余额和价格仍然有效。Session 适合恢复流程和审计，但不能替代锁单前的实时校验。

### 6. 合规判断不能由模型自由解释

如果用户的 KYC 状态为 `pending`，模型可能根据对话语气认为“用户应该已经完成认证”。如果用户要求绕过限制，模型也可能生成一个看似合理的解释。

KYC、AML、制裁名单、地区限制和交易限额都应由合规服务与规则引擎决定。LLM 可以解释拒绝原因，但不能改变合规结果。

## 四、`reserve_match` 的正确职责边界

`reserve_match` 自身不应该承担所有业务决策，但也不能只是一个“相信调用方”的薄函数。推荐把职责分成三层。

### Harness 层：决定是否提出调用

Harness 负责：

- 识别用户是否表达明确确认；
- 确认当前操作对应的订单和报价；
- 检查是否需要 Human-in-loop；
- 组织锁单前所需的工具调用；
- 构造带上下文版本的命令。

它可以决定“现在可以申请锁定”，但这仍然只是提出命令。

### Policy 层：决定是否允许调用

Policy 或规则引擎负责：

- 用户是否具有交易权限；
- KYC/AML 是否满足要求；
- Maker 和广告是否符合资格；
- 金额是否在限制内；
- 报价是否仍然有效；
- 风控信号是否通过；
- 是否需要人工审批；
- 当前订单状态是否允许进入 `Reserved`。

它输出的应该是结构化决策，而不是自然语言：

```json
{
  "decision": "allow",
  "policy_version": "otc-reserve-2026-08-01",
  "required_checks": [
    "quote_not_expired",
    "taker_kyc_eligible",
    "maker_balance_sufficient",
    "risk_passed",
    "user_confirmed_exact_quote"
  ],
  "requires_human_review": false
}
```

### Domain 层：决定是否真的成功

订单服务和锁定服务负责：

- 校验订单版本；
- 原子占用额度；
- 防止重复锁定；
- 写入订单状态；
- 发布后续事件；
- 返回真实结果。

只有领域服务返回成功，整个系统才可以认为订单已经进入 `Reserved`。

## 五、推荐的 `reserve_match` 调用前检查链

一个可靠的执行链可以这样设计：

```text
用户确认
   │
   ▼
确认对象和版本
   │
   ▼
刷新报价、广告、余额、KYC、风控
   │
   ▼
执行硬规则
   │
   ▼
检查订单状态和并发版本
   │
   ▼
生成幂等键
   │
   ▼
调用 reserve_match
   │
   ▼
查询并确认真实状态
```

### 1. 确认对象和版本

不能让 Tool 只接收：

```json
{
  "maker_name": "那个最快的商家"
}
```

应该接收明确的业务标识：

```json
{
  "order_id": "order_001",
  "quote_id": "quote_001",
  "ad_id": "ad_123",
  "maker_id": "maker_456",
  "quote_version": 3
}
```

这样系统才能防止用户确认的是旧报价，而 Agent 使用了新广告，或者模型把多个候选 Maker 混淆。

### 2. 刷新动态事实

锁单前至少重新确认：

- 报价未过期；
- 广告仍然有效；
- Maker 仍然满足支付方式要求；
- 可承诺余额足够；
- 用户 KYC 和风控状态没有变化；
- 订单仍然处于可锁定状态。

这些查询可以并行，但锁定动作必须使用刷新后的结果。

### 3. 执行硬规则

硬规则不应该被“整体推荐分数”覆盖。例如：

```text
if quote_expired:
    deny("quote_expired")

if not taker_kyc_eligible:
    deny("kyc_required")

if available_balance < requested_amount:
    deny("insufficient_balance")

if order.status != "Quoted":
    deny("invalid_order_state")
```

只有所有硬规则通过后，才有资格进入锁定动作。

### 4. 检查订单版本和幂等键

订单版本可以防止“读取后被别人修改”的情况：

```json
{
  "expected_order_version": 3,
  "idempotency_key": "reserve:order_001:quote_001:v3"
}
```

如果订单已经从版本 3 变成版本 4，服务应拒绝这次旧请求，而不是默默覆盖新状态。

### 5. 调用并确认真实状态

工具返回不能只看 HTTP 200。需要明确业务结果：

```json
{
  "status": "reserved",
  "order_id": "order_001",
  "reservation_id": "reservation_001",
  "reserved_amount": 6958.22,
  "expires_at": "2026-08-22T12:02:30Z",
  "order_version": 4
}
```

如果网络超时，状态可能是 `unknown`，这时必须查询订单或 reservation 状态，而不是重新让 LLM 猜测。

## 六、一个安全的 Tool 契约示例

可以把 `reserve_match` 设计成如下形式：

```json
{
  "name": "reserve_match",
  "description": "Reserve a validated OTC match for a short period.",
  "input_schema": {
    "type": "object",
    "required": [
      "order_id",
      "quote_id",
      "maker_id",
      "expected_order_version",
      "idempotency_key",
      "authorization_id"
    ],
    "properties": {
      "order_id": { "type": "string" },
      "quote_id": { "type": "string" },
      "maker_id": { "type": "string" },
      "expected_order_version": { "type": "integer" },
      "idempotency_key": { "type": "string" },
      "authorization_id": { "type": "string" }
    }
  }
}
```

其中 `authorization_id` 不应该由模型随意生成。它应该由 Harness 在用户明确确认、策略检查通过后创建，并且绑定到：

- 用户身份；
- 订单 ID；
- 报价版本；
- 确认时间；
- 允许执行的动作；
- 过期时间。

Tool 服务收到调用后仍然要重新检查权限和业务状态。授权令牌不是永久通行证，而是一次有范围、有期限的执行许可。

## 七、Human-in-loop 应该放在哪里？

不是所有订单都必须人工审核，但高风险动作需要明确的升级路径。

例如以下情况可以进入人工审核：

- 交易金额超过阈值；
- KYC 等级与金额不匹配；
- AML 风险信号不确定；
- Maker 账户近期发生异常；
- 报价或余额在锁定前发生变化；
- 工具返回状态不确定；
- 订单经历了多次重试；
- 用户要求修改已经确认的关键字段。

推荐的流程是：

```text
LLM 提议 reserve_match
   → 规则发现高风险
   → 状态进入 PendingReview
   → 人工查看结构化订单摘要和风险原因
   → Approve / Reject / RequestMoreInfo
   → 继续或终止锁定
```

人工审核页面应该看到事实、规则命中和版本信息，而不是只看到一段模型总结。

## 八、失败恢复：调用超时并不代表锁单失败

交易 Tool 最棘手的情况是“请求结果未知”。例如：

```text
客户端发送 reserve_match
   → 服务已经完成锁定
   → 网络连接在返回前断开
```

如果 Agent 认为失败并再次锁定，就会产生重复操作；如果 Agent 认为成功但实际未锁定，后续付款又会进入错误状态。

正确的恢复流程是：

```text
reserve_match timeout
   → 根据 idempotency_key 查询 reservation
      ├─ Reserved：恢复流程，继续通知用户
      ├─ Rejected：展示确定的拒绝原因
      ├─ NotFound：确认是否可以安全重试
      └─ Unknown：进入人工或延迟队列
```

这也是为什么 `Session`、事件日志和领域状态必须分开：Session 能告诉 Agent“我曾经发起过什么”，订单服务才能告诉 Agent“交易现在到底是什么状态”。

## 九、常见错误与改法

### 错误一：把“高置信度”当成“高权限”

模型说 `confidence: 0.99`，只说明它对语言理解有较高把握，不代表余额、KYC、风控或并发条件成立。

改法：把置信度用于澄清策略，不用于跳过领域校验。

### 错误二：使用 `auto_approve=true`

把所有 Tool Call 都设置成自动执行，会让低风险查询和高风险锁定共用一条权限路径。

改法：按照副作用分级：

```text
Read：自动查询
Preview：生成报价和摘要
Confirm：请求用户授权
Write：规则通过后执行
High Risk：需要人工审核或二次确认
```

### 错误三：只在 Agent 层做校验

即使 Harness 已经检查过余额，Tool 服务也必须再次检查。因为在网络延迟期间，事实可能已经变化，或者可能存在绕过 Harness 的其他调用方。

改法：关键约束必须在服务端和状态机中再次强制执行。

### 错误四：将报价、锁定和付款混成一个动作

如果 Agent 一次调用就同时完成报价、锁定、付款和放币，用户无法理解每一步发生了什么，系统也难以恢复。

改法：拆成明确状态和命令：

```text
create_quote
   → user_confirm
   → reserve_match
   → payment_pending
   → mark_paid
   → release_asset
```

### 错误五：工具成功就直接由模型宣布结果

工具返回成功后仍应记录订单事件，并由状态机确认最终状态。模型的回复应该是领域状态的投影，而不是成功状态的来源。

## 十、推荐的调用决策伪代码

```python
def maybe_reserve_match(context):
    intent = parse_intent(context.latest_user_message)

    if not intent.explicit_reservation_request:
        return AskForConfirmation()

    order = order_service.get(context.order_id)
    quote = quote_service.get(context.quote_id)
    user = identity_service.get(context.user_id)

    if not user.confirmed_exact_quote:
        return AskForConfirmation(order, quote)

    facts = refresh_reservation_facts(
        order=order,
        quote=quote,
        maker_id=context.maker_id,
        user_id=context.user_id,
    )

    decision = policy_engine.evaluate(
        action="reserve_match",
        facts=facts,
    )

    if decision.requires_human_review:
        return EscalateToHuman(decision.reasons)

    if not decision.allowed:
        return RefuseReservation(decision.reasons)

    command = {
        "order_id": order.id,
        "quote_id": quote.id,
        "maker_id": context.maker_id,
        "expected_order_version": order.version,
        "idempotency_key": make_idempotency_key(order, quote),
        "authorization_id": authorization_service.issue(decision),
    }

    result = reserve_match(command)

    if result.status == "unknown":
        return RecoverByQueryingReservation(command["idempotency_key"])

    return result
```

这里 LLM 可以参与 `parse_intent`，也可以参与解释和澄清；但 `policy_engine`、`order_service` 和 `reserve_match` 的最终约束不能由模型提示词替代。

## 十一、工程验收清单

在生产环境启用 `reserve_match` 前，至少确认：

- [ ] Tool 已被标记为有副作用的写操作；
- [ ] LLM 只能提出调用，不能绕过 Harness 直接获得执行权限；
- [ ] 用户确认绑定到明确的订单、报价和版本；
- [ ] 锁定前会刷新报价、广告、余额、KYC 和风控事实；
- [ ] 规则引擎先执行硬约束；
- [ ] 订单状态机限制了合法状态迁移；
- [ ] Tool 具备幂等键；
- [ ] 订单版本或条件更新能防止并发覆盖；
- [ ] Tool 服务端会再次校验权限和关键业务规则；
- [ ] 超时场景可以通过幂等键查询最终状态；
- [ ] `Reserved` 只有在领域服务确认后才能对用户展示；
- [ ] 高风险场景有人工审核路径；
- [ ] 决策快照记录了规则版本、事实时间戳和拒绝原因；
- [ ] 失败后不会自动把未知状态当作失败或成功；
- [ ] Session 用于恢复和审计，实时领域服务用于确认当前事实。

## 最后总结

`reserve_match` 不能只靠 LLM 决定是否调用，不是因为 LLM 完全不能做决定，而是因为交易系统里的“决定”有不同含义：

- LLM 可以决定“从对话语义看，用户可能想锁定”；
- Planner 可以决定“下一步应该申请锁定”；
- 规则引擎可以决定“当前事实满足哪些政策条件”；
- 订单状态机可以决定“当前状态是否允许迁移”；
- 锁定服务可以决定“在并发和原子约束下，是否真的锁定成功”。

最终可以把它压缩成一句工程原则：

> LLM 负责提出动作，Policy 负责授予资格，状态机负责约束状态，领域服务负责执行事实，用户和人工审核负责提供必要授权。

只有这样，Agent 才能既保持自然语言交互的灵活性，又满足 OTC 交易所需要的确定性、可恢复性、可审计性和安全性。
