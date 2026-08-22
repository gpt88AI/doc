---
title: 从零实现一个最小的 otc-trading Skill：识别“买入 OTC 资产”
description: 通过一个可运行的最小示例，设计 otc-trading Skill 的 manifest、输入输出契约和意图识别器，让 Agent 能识别用户想买入 OTC 资产，并为后续撮合流程留下清晰边界。
date: 2026-08-22
category: 技术教程
tags: [AI Agent, Agent Harness, Skill, OTC 撮合, Intent Recognition, TypeScript, P2P]
readTime: 10
relatedPath: /docs/blog/why-reserve-match-cannot-be-llm-only/
relatedTitle: 为什么 reserve_match 不能只靠 LLM 决定是否调用？
---

在构建 OTC Agent 时，最适合入门的练习不是一开始就实现完整的广告撮合、余额锁定和支付托管，而是先做一个边界清晰的最小 Skill：

> 能识别用户是否在表达“买入 OTC 资产”的请求，并把自然语言转换成结构化 Intent。

例如，用户说：

```text
我要用 5 万人民币买 USDT，优先支付宝。
```

最小的 `otc-trading` Skill 不需要马上查广告，也不应该直接锁单。它只需要完成第一步：识别用户想做什么，并返回后续 Planner 可以消费的结构化结果。

这篇文章会从零设计一个最小版本，包括：

- Skill 的职责边界；
- manifest 和输入输出契约；
- “买入 OTC 资产”的识别规则；
- TypeScript 最小实现；
- 与 Agent Harness 的接入方式；
- 测试用例和验收清单；
- 从最小版本扩展到真实撮合系统的路径。

## 一、这次练习的 Definition of Done

完成后，Skill 应该满足以下条件：

| 能力 | 要求 |
| --- | --- |
| 输入 | 一段用户自然语言 |
| 输出 | 结构化的 OTC Intent |
| 能识别 | 买入、资产、法币、金额、支付方式等字段 |
| 能澄清 | 资产或金额缺失时，不要猜测，返回缺失字段 |
| 不负责 | 查 Maker、查余额、KYC、报价、锁单 |
| 可验证 | 至少覆盖明确请求、同义表达、否定表达和歧义表达 |

这个 Definition of Done 很重要。最小 Skill 的目标是完成一个可测试的闭环，而不是提前实现整个平台。

## 二、Skill 到底是什么？

在 Agent Harness 中，Skill 可以理解为一项有输入、有输出、有边界的可复用能力。

一个 Skill 通常包含：

- 名称和版本；
- 能力描述；
- 输入契约；
- 输出契约；
- 触发条件；
- 执行入口；
- 可以调用的 Tool；
- 风险和副作用声明。

对于当前练习，`otc-trading` Skill 的职责可以画成：

```text
用户消息
   │
   ▼
otc-trading Skill
   │
   ├─ 识别是否是 OTC 交易请求
   ├─ 识别买入方向
   ├─ 提取资产、金额、法币和支付方式
   └─ 返回结构化 Intent 或缺失字段
```

它暂时不连接真实交易系统，因此没有副作用。这让我们可以先把意图识别和业务动作分开。

## 三、最小 Skill 的边界

### 它应该负责什么？

最小版本负责把用户表达转换成这样的结果：

```json
{
  "skill": "otc-trading",
  "intent": "buy_otc_asset",
  "direction": "buy",
  "asset": "USDT",
  "fiat_currency": "CNY",
  "fiat_amount": 50000,
  "payment_method": "alipay",
  "missing": [],
  "confidence": 0.96
}
```

### 它不应该负责什么？

以下动作要交给后续 Skill 或 Tool：

- 查找 Maker 广告；
- 查询 Maker 实时余额；
- 查询用户 KYC；
- 计算实时汇率和报价；
- 判断是否允许交易；
- 创建订单；
- 调用 `reserve_match` 锁定交易。

可以把边界总结为：

> `otc-trading` 的最小版本负责“理解请求”，不负责“执行交易”。

这和前面文章里讨论的原则一致：LLM 或 Intent Parser 可以提出结构化意图，但真实业务事实和副作用动作必须由领域 Tool 和状态机负责。

## 四、先定义 Intent 数据结构

如果没有稳定的数据结构，Skill 很快会退化成“返回一段模型描述”。因此先定义 TypeScript 类型。

```ts
export type OtcDirection = 'buy' | 'sell'

export type OtcAsset = 'USDT' | 'USDC' | 'BTC' | 'ETH' | string

export type OtcPaymentMethod =
  | 'alipay'
  | 'wechat_pay'
  | 'bank_transfer'
  | string

export type OtcIntent = {
  skill: 'otc-trading'
  intent: 'buy_otc_asset' | 'sell_otc_asset' | 'unknown'
  direction: OtcDirection | null
  asset: OtcAsset | null
  fiat_currency: string | null
  fiat_amount: number | null
  payment_method: OtcPaymentMethod | null
  original_text: string
  missing: Array<'asset' | 'fiat_currency' | 'fiat_amount'>
  confidence: number
  next_action: 'search_maker_ads' | 'ask_clarification' | 'unsupported'
}
```

这里有几个值得注意的设计：

1. `asset`、`fiat_currency` 和 `fiat_amount` 可以为空，因为用户可能只说“我想买币”。
2. `missing` 明确告诉 Planner 还缺什么，不让模型自己猜。
3. `next_action` 只表示建议的下一步，不代表已经执行了 Tool。
4. `original_text` 保留原始输入，便于审计和后续重新解析。
5. `confidence` 只用于决定是否澄清，不能替代交易资格判断。

## 五、定义最小 Skill Manifest

Manifest 是 Harness 发现和加载 Skill 的入口。最小版本可以使用 JSON：

```json
{
  "name": "otc-trading",
  "version": "0.1.0",
  "description": "识别用户买入或卖出 OTC 资产的自然语言请求",
  "entry": "./src/otc-trading.ts",
  "input": {
    "type": "object",
    "required": ["message"],
    "properties": {
      "message": { "type": "string" }
    }
  },
  "output": {
    "type": "OtcIntent"
  },
  "tools": [],
  "side_effects": false
}
```

`tools` 为空、`side_effects` 为 `false`，表示当前 Skill 只是解析请求。

后续接入广告查询时，可以增加只读 Tool；接入锁单时，则应把高风险动作拆到独立命令 Skill 或经过额外授权的执行阶段，而不是直接把 `reserve_match` 塞进这个最小解析器。

## 六、实现最小识别器

下面的实现不依赖外部模型，使用确定性的关键词、正则和映射表完成第一版识别。这样做的目的不是替代 LLM，而是先建立一个可测试的领域边界。

### 1. 词典和工具函数

```ts
const ASSET_ALIASES: Record<string, string> = {
  usdt: 'USDT',
  泰达币: 'USDT',
  稳定币: 'USDT',
  usdc: 'USDC',
  btc: 'BTC',
  比特币: 'BTC',
  eth: 'ETH',
  以太坊: 'ETH',
}

const FIAT_ALIASES: Record<string, string> = {
  人民币: 'CNY',
  元: 'CNY',
  rmb: 'CNY',
  cny: 'CNY',
  美元: 'USD',
  usd: 'USD',
}

const PAYMENT_ALIASES: Record<string, string> = {
  支付宝: 'alipay',
  花呗: 'alipay',
  alipay: 'alipay',
  微信: 'wechat_pay',
  微信支付: 'wechat_pay',
  wechat: 'wechat_pay',
  银行卡: 'bank_transfer',
  银行转账: 'bank_transfer',
}

function normalizeText(input: string) {
  return input.trim().toLowerCase().replace(/[，。！？、]/g, ' ')
}

function findAlias(text: string, aliases: Record<string, string>) {
  const match = Object.keys(aliases).find(alias => text.includes(alias))
  return match ? aliases[match] : null
}
```

词典是领域知识的一部分，应该版本化并可测试。它不应该散落在 Planner 的 Prompt 里，否则改一个支付方式同义词就要重新修改整个 Agent。

### 2. 解析中文金额

最小版本先覆盖常用的“5 万”“50000”“5,0000”和“5w”表达：

```ts
function parseAmount(text: string): number | null {
  const arabic = text.match(/(?:¥|￥)?\s*([\d,]+(?:\.\d+)?)\s*(万|w)?/i)
  if (!arabic) return null

  const raw = Number(arabic[1].replace(/,/g, ''))
  if (!Number.isFinite(raw)) return null

  const unit = arabic[2]?.toLowerCase()
  if (unit === '万' || unit === 'w') return raw * 10_000
  return raw
}
```

中文数字的完整解析会更复杂。生产环境应使用经过测试的数字解析模块，并明确金额是法币金额还是资产数量。这个最小版本只用来演示 Skill 的结构，不应该直接作为金融生产系统的金额解析实现。

### 3. 判断交易方向

```ts
function detectDirection(text: string): OtcDirection | null {
  const buyWords = ['买', '购买', '买入', '换入', '入金买币']
  const sellWords = ['卖', '出售', '卖出', '换出', '卖币']

  if (sellWords.some(word => text.includes(word))) return 'sell'
  if (buyWords.some(word => text.includes(word))) return 'buy'
  return null
}
```

这里特意先识别 `sell`，是为了处理“不要卖出，我要买入 USDT”这类包含相反关键词的句子。更严谨的版本还需要识别否定词和句法范围，避免简单的 `includes` 产生误判。

### 4. 组装 Intent

```ts
export function detectOtcIntent(message: string): OtcIntent {
  const text = normalizeText(message)
  const direction = detectDirection(text)
  const asset = findAlias(text, ASSET_ALIASES)
  const fiatCurrency = findAlias(text, FIAT_ALIASES)
  const paymentMethod = findAlias(text, PAYMENT_ALIASES)
  const fiatAmount = parseAmount(text)

  const isOtcSignal =
    direction !== null ||
    text.includes('otc') ||
    text.includes('场外') ||
    text.includes('商家') ||
    text.includes('maker')

  if (!isOtcSignal) {
    return {
      skill: 'otc-trading',
      intent: 'unknown',
      direction: null,
      asset: null,
      fiat_currency: null,
      fiat_amount: null,
      payment_method: null,
      original_text: message,
      missing: [],
      confidence: 0.05,
      next_action: 'unsupported',
    }
  }

  const missing = [
    asset ? null : 'asset',
    fiatCurrency ? null : 'fiat_currency',
    fiatAmount === null ? 'fiat_amount' : null,
  ].filter(Boolean) as OtcIntent['missing']

  const isBuy = direction === 'buy'
  const confidence = isBuy && asset ? 0.96 : direction ? 0.72 : 0.35

  return {
    skill: 'otc-trading',
    intent: isBuy ? 'buy_otc_asset' : direction === 'sell' ? 'sell_otc_asset' : 'unknown',
    direction,
    asset,
    fiat_currency: fiatCurrency,
    fiat_amount: fiatAmount,
    payment_method: paymentMethod,
    original_text: message,
    missing,
    confidence,
    next_action: isBuy && missing.length === 0
      ? 'search_maker_ads'
      : missing.length > 0
        ? 'ask_clarification'
        : 'unsupported',
  }
}
```

## 七、用例：识别“买入 OTC 资产”

```ts
const result = detectOtcIntent(
  '我要用 5 万人民币买 USDT，优先支付宝，找响应最快的商家。',
)

console.log(result)
```

预期输出：

```json
{
  "skill": "otc-trading",
  "intent": "buy_otc_asset",
  "direction": "buy",
  "asset": "USDT",
  "fiat_currency": "CNY",
  "fiat_amount": 50000,
  "payment_method": "alipay",
  "original_text": "我要用 5 万人民币买 USDT，优先支付宝，找响应最快的商家。",
  "missing": [],
  "confidence": 0.96,
  "next_action": "search_maker_ads"
}
```

注意 `next_action` 只是告诉 Planner 下一步可以进入广告召回，它没有调用任何 Tool，更没有锁定订单。

## 八、把 Skill 接入 Agent Harness

一个最小 Harness 可以按下面的方式工作：

```ts
type SkillResult = OtcIntent

function runSkill(skillName: string, input: { message: string }): SkillResult {
  if (skillName !== 'otc-trading') {
    throw new Error(`Unknown skill: ${skillName}`)
  }

  return detectOtcIntent(input.message)
}

function planFromIntent(intent: OtcIntent) {
  if (intent.intent === 'unknown') {
    return { action: 'ignore_or_route_to_other_skill' }
  }

  if (intent.next_action === 'ask_clarification') {
    return {
      action: 'ask_clarification',
      missing: intent.missing,
    }
  }

  if (intent.intent === 'buy_otc_asset') {
    return {
      action: 'search_maker_ads',
      filters: {
        asset: intent.asset,
        fiat_currency: intent.fiat_currency,
        fiat_amount: intent.fiat_amount,
        payment_method: intent.payment_method,
      },
    }
  }

  return { action: 'unsupported_otc_flow' }
}
```

此时系统的调用关系是：

```text
用户消息
   → Skill Registry 找到 otc-trading
   → detectOtcIntent
   → Planner 读取 next_action
   → search_maker_ads Tool
```

Skill Registry 负责发现能力，Skill 负责解析请求，Planner 负责选择下一步，Tool Router 负责连接实时服务。每一层都有单一职责。

## 九、为什么不直接让 LLM 返回所有字段？

可以让 LLM 参与复杂自然语言的初步结构化，但仍然需要 Schema 和确定性校验。

例如模型可能返回：

```json
{
  "intent": "buy_otc_asset",
  "asset": "USDT",
  "fiat_amount": "大概五万",
  "fiat_currency": "可能是人民币"
}
```

这个结果还不能直接进入撮合流程，因为：

- 金额不是规范数值；
- 法币仍然不确定；
- “大概”可能意味着用户还未明确授权；
- 没有支付方式和交易限制信息。

更稳妥的组合是：

```text
LLM：理解复杂表达、识别候选字段、发现用户可能的意图
Schema Validator：验证字段类型和必填项
Normalizer：统一币种、金额、支付方式和资产别名
Rule Engine：判断是否允许进入下一步
Planner：根据结果安排澄清或调用 Tool
```

LLM 是识别链路中的一个组件，而不是整个交易意图系统。

## 十、测试用例

最小 Skill 至少应该覆盖以下输入。

### 明确买入

```ts
expect(detectOtcIntent('我要用 5 万人民币买 USDT')).toMatchObject({
  intent: 'buy_otc_asset',
  direction: 'buy',
  asset: 'USDT',
  fiat_currency: 'CNY',
  fiat_amount: 50000,
  next_action: 'search_maker_ads',
})
```

### 同义表达

```ts
expect(detectOtcIntent('帮我换入 1000 元泰达币')).toMatchObject({
  intent: 'buy_otc_asset',
  direction: 'buy',
  asset: 'USDT',
  fiat_currency: 'CNY',
  fiat_amount: 1000,
})
```

### 缺少金额

```ts
expect(detectOtcIntent('我想买 USDT')).toMatchObject({
  intent: 'buy_otc_asset',
  missing: ['fiat_currency', 'fiat_amount'],
  next_action: 'ask_clarification',
})
```

### 只说方向，没有资产

```ts
expect(detectOtcIntent('我想买币，用支付宝')).toMatchObject({
  intent: 'buy_otc_asset',
  direction: 'buy',
  asset: null,
  payment_method: 'alipay',
  next_action: 'ask_clarification',
})
```

### 卖出请求不能误判为买入

```ts
expect(detectOtcIntent('我要卖出 1000 USDT')).toMatchObject({
  intent: 'sell_otc_asset',
  direction: 'sell',
})
```

### 非 OTC 请求

```ts
expect(detectOtcIntent('帮我写一封邮件')).toMatchObject({
  intent: 'unknown',
  next_action: 'unsupported',
})
```

真实工程中还需要加入：否定句、混合币种、英文表达、金额小数、支付方式冲突、上下文补全和恶意提示注入测试。

## 十一、处理“识别到了，但信息不完整”

Skill 不应该为了让流程继续而猜测缺失字段。

例如用户说：

```text
我想买 USDT。
```

合理输出是：

```json
{
  "intent": "buy_otc_asset",
  "asset": "USDT",
  "fiat_currency": null,
  "fiat_amount": null,
  "missing": ["fiat_currency", "fiat_amount"],
  "next_action": "ask_clarification"
}
```

Planner 可以继续问：

> 你计划使用哪种法币、购买金额是多少？例如“用 5 万人民币买 USDT”。

如果用户说：

```text
我想买 5 万的币。
```

系统也不能直接假定“5 万”是 CNY，更不能假定用户要买 USDT。应该列出缺失项：

```text
缺少：资产、法币类型。
```

澄清是 Agent 的正常路径，不是识别失败。

## 十二、从最小 Skill 扩展到 OTC 撮合

完成意图识别后，可以按下面的阶段扩展。

### Stage 1：只识别 Intent

```text
用户消息 → otc-trading → OtcIntent
```

目标是让字段稳定、测试通过、缺失信息可解释。

### Stage 2：加入广告查询

```text
OtcIntent
   → search_maker_ads
   → 候选广告列表
```

这时 Skill 可以增加只读 Tool，但不能把广告列表写进长期记忆后永久复用。广告、价格和可用额度都是动态事实。

### Stage 3：加入资格检查和排序

```text
候选广告
   → KYC / 风控 / 余额查询
   → 硬规则过滤
   → 响应速度、价格、完成率排序
```

这里需要规则引擎和决策快照，不要让 LLM 直接凭印象推荐 Maker。

### Stage 4：加入用户确认和报价

```text
候选 Maker
   → create_quote
   → 展示订单摘要
   → 用户明确确认
```

这一步开始出现用户授权，但仍然不等于锁单成功。

### Stage 5：加入 `reserve_match`

```text
用户确认
   → Policy 授权
   → 订单状态机校验
   → reserve_match
   → 查询最终锁定状态
```

`reserve_match` 必须具备幂等键、并发控制、服务端规则校验和超时恢复机制。

## 十三、最小 Skill 的故障恢复

即使只是意图识别，也要定义错误行为。

### 无法识别资产

不要返回一个猜测的资产；返回 `asset` 缺失，并进入澄清。

### 金额解析失败

保留原始文本，告诉用户需要一个明确金额，例如 `50000 CNY`。

### 买卖方向冲突

如果同一句话同时出现“买入”和“卖出”，返回低置信度并请求澄清，不要以关键词出现顺序做最终判断。

### Skill 版本不兼容

Harness 应记录 Skill 版本。旧 Session 恢复时，如果输出契约发生变化，应通过兼容层迁移，而不是静默解释成新字段。

### LLM 结构化输出不符合 Schema

可以重试一次结构化输出，或者回退到确定性规则；不能把未验证的 JSON 直接传给广告或订单 Tool。

## 十四、一个可复用的 Skill 开发模板

以后实现其他 Agent Skill 时，可以复制下面的模板：

```text
Skill Name：
Skill Version：

Purpose：这项能力解决什么问题？

Input Contract：
- 必填字段
- 可选字段
- 字段类型

Output Contract：
- 成功结果
- 缺失信息
- 错误结果

Trigger Conditions：
- 什么请求应该触发？
- 什么请求不应该触发？

Allowed Tools：
- 查询 Tool
- 写入 Tool
- 高风险 Tool

Side Effects：
- 是否产生副作用？
- 是否需要用户确认？
- 是否需要人工审核？

Validation：
- Schema 校验
- 领域规则
- 权限校验

Recovery：
- 失败如何恢复？
- 超时如何查询？
- 版本变化如何兼容？

Acceptance Tests：
- 明确请求
- 缺失字段
- 同义表达
- 否定表达
- 边界输入
```

## 十五、最终验收清单

这个最小 `otc-trading` Skill 完成后，可以用下面的清单验收：

- [ ] 能识别“买入 OTC 资产”的请求；
- [ ] 能输出 `buy_otc_asset`；
- [ ] 能区分买入和卖出；
- [ ] 能识别 USDT、USDC、BTC 等资产别名；
- [ ] 能把“5 万人民币”转换成 `50000 CNY`；
- [ ] 能识别支付宝、微信支付和银行转账；
- [ ] 信息缺失时返回 `missing`；
- [ ] 非 OTC 请求不会误触发；
- [ ] 识别结果有稳定的 JSON Schema；
- [ ] `next_action` 只表示流程建议，不直接执行交易；
- [ ] 当前版本不调用 `reserve_match`；
- [ ] 所有关键输入都有测试用例；
- [ ] 原始用户文本被保留，便于调试和审计；
- [ ] Skill 版本记录在 Session 或运行上下文中。

## 最后总结

一个最小但合格的 `otc-trading` Skill，不需要一开始就连接所有交易系统。它只要做到三件事：

1. 正确识别用户是否在表达 OTC 买入意图；
2. 把资产、金额、法币和支付方式转换成结构化数据；
3. 在信息不完整或语义冲突时主动澄清，而不是猜测。

它在 Harness 中的位置可以概括为：

```text
自然语言
   → otc-trading Skill
   → OtcIntent
   → Planner
   → search_maker_ads
```

等这个最小闭环稳定之后，再逐步增加广告召回、余额校验、KYC、风控、报价和 `reserve_match`。这样构建出来的 Agent，既容易学习和测试，也更容易在真实 OTC 系统中扩展成可审计、可恢复的生产能力。
