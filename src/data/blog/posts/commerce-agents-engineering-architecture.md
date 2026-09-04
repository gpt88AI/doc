---
title: Commerce Agents 工程架构拆解：从 Prompt Demo 到可控的应用代理
description: 以 commerce-agents 参考项目为例，拆解应用代理的共享核心、Backend 契约、Tool Calling Loop、Skill 分层、数据 Fencing、Provenance、结构化 UI、人工审批、记忆、评测与生产化路径。
date: 2026-09-04
category: 技术教程
tags: [AI Agent, Commerce Agents, Agent Harness, Tool Calling, MCP, 安全工程, Evals, 应用代理]
readTime: 25
relatedPath: /docs/guides/agent-production/
relatedTitle: Agent 求职：评测与生产化
---

很多 Agent 教程从一句 Prompt 开始：把角色、规则和工具说明写进 System Prompt，然后把模型返回的工具调用转发到一个函数。

这个过程足够做出 Demo，却不等于做出了应用代理。真正的应用代理要面对另一组问题：用户身份从哪里来，实时事实由谁提供，模型生成的参数能不能执行，第三方数据里的隐藏指令怎么处理，写操作是否需要确认，流式中途断开后如何恢复，多个请求同时修改同一份状态怎么办，工具结果如何变成可信的 UI，以及换一条运行时路径后安全规则是否仍然成立。

本文以本地分析的 `Osub/commerce-agents` 参考项目为样本，基于 2026 年 8 月 31 日的 `fd4d592` 快照，系统拆解它背后的工程思想。这个项目把同一套商业代理分别运行在 Messages API、Claude Agent SDK 和 Managed Agents 三条路径上，并用购物代理与商家后台代理展示相同原则如何落到不同业务面。

先说明边界：仓库里的公司、商品、订单和人物都是虚构的 ACME 示例，项目不会真实下单、扣款或修改线上商品。它更像一份应用代理的架构参考实现，重点展示如何把模型放在业务系统的可控边界之内，而不是一套拿来就能接入生产支付系统的电商后端。

## 先看结论

如果只记住这篇文章的核心观点，可以记住下面这句话：

> 模型负责提出意图和下一步请求，执行器负责验证动作，Backend 负责提供事实和业务规则，宿主应用负责身份、会话和审批。

`commerce-agents` 的工程价值主要体现在以下几个选择上：

1. **Agent 被当成应用运行时，而不是一段 Prompt。** 它包含会话、工具循环、流式事件、内存、错误恢复、UI 和可观察性。
2. **共享机制只实现一次。** `commerce-common` 统一承载执行器、数据隔离、记忆、技能加载、展示工具和事件模型，三个运行时复用同一套核心。
3. **Backend 是事实与业务规则的边界。** 模型不能直接访问数据库、支付凭证或内部服务；它只能通过经过约束的工具请求动作。
4. **Tool、Skill、Prompt 和动态上下文各司其职。** 工具负责动作契约，Skill 负责任务方法，静态 Prompt 负责跨请求规则，动态上下文负责当前会话事实。
5. **所有写操作都要经过代码级门禁。** Provenance 限制模型只能写入当前会话见过的对象，数量和幅度有上限，高风险商家操作还要经过 `stage -> preview -> approve -> apply`。
6. **模型生成的 UI 不是事实来源。** 模型可以选择展示哪些对象以及排序方式，价格、指标、订单状态和链接由服务端根据真实记录补齐。
7. **安全规则必须落在共享执行路径上。** 如果一条规则只存在于某个 Prompt 或某个前端按钮里，换到 SDK、MCP 或另一个入口就可能失效。
8. **生产化的重点不是再加一个 Agent，而是补足部署边界。** 认证、限流、分布式锁、真实业务状态机、支付、审计、评测和人工接管都由部署方完成。

这组结论也适用于客服、金融运营、采购、内部 IT、内容审核和知识库助手。电商只是一个很好的压力测试场景，因为它同时包含搜索、实时事实、个性化、状态变化、用户确认和高风险写操作。

## 一、这个项目到底在解决什么问题？

项目不是只做一个“帮用户搜商品”的聊天窗口，而是定义了两个面向不同角色的 Agent。

| 角色 | 面向的人 | 主要工作 | 典型风险 |
| --- | --- | --- | --- |
| Shopping Agent | 顾客 | 搜索商品、比较、规划、查看订单、管理购物车、回答政策问题、展示结账入口 | 把错误商品加入购物车、误报价格、越权读取订单、把描述文字当成指令 |
| Merchant Agent | 商家运营人员 | 查看经营指标、管理商品、处理库存和订单提醒、调整价格、创建促销、分析数据 | 修改受保护字段、超额调价、误改活动预算、未经审批直接写入后台 |

两者共享底层机制，但不是共享一套模糊的业务 Prompt。购物代理有 `StorefrontBackend` 和购物车 Provenance，商家代理有 `MerchantBackend`、变更账本和审批门禁。角色自己的术语、工具和业务边界仍然在角色核心中保持清晰。

### 三条运行时路径

同一个角色可以通过三种方式运行：

```text
ShoppingAgent / MerchantAgent
        │
        ├── Messages API runtime
        │       自己管理模型调用、工具循环、流式事件和记忆抽取
        │
        ├── Agent SDK runtime
        │       把相同工具和 Prompt 交给 SDK，宿主保留必要的前置读取和审批接口
        │
        └── Managed Agents
                通过 manifest 与 MCP 发布，平台负责主要 Agent Loop
```

三条路径的最大价值不是“支持更多平台”，而是验证架构是否真的分层。如果业务规则只藏在 Messages API 的 orchestrator 里，切换到 SDK 或 Managed Agents 时就会丢失。如果所有安全规则都在 executor 和 Backend 里面，运行时只需要负责把工具调用送到同一个执行边界。

仓库用文档明确区分了这三条路径的职责：

| 路径 | 运行时拥有的能力 | 不应该被路径私有化的能力 |
| --- | --- | --- |
| Messages API | 工具循环、`tool_choice`、流式解析、轮次限制、历史压缩、记忆抽取 | 业务规则、权限、写入门禁、数据清洗 |
| Agent SDK | SDK Loop、SDK 工具集、宿主工具和平台环境 | 同上，尤其不能把审批只写在 CLI 里 |
| Managed Agents | 平台托管 Loop、MCP 工具、平台确认策略 | Backend 的真实事实与写入安全边界 |

## 二、最重要的结构：Role Once，Runtime Many

项目目录最值得学习的不是文件数量，而是依赖方向。它大致分成四层：

```text
commerce-common/
    共享类型、事件、执行器、Fencing、Memory、Skill、Presentation

shopping-agent/core/       merchant-agent/core/
    角色 Backend、Prompt、工具注册表、业务门禁、Enrichment

shopping-agent/runtime-*   merchant-agent/runtime-*
    Messages API、Agent SDK、Managed Agents 的适配层

examples/
    FastAPI 宿主、会话存储、虚构 Backend、Web UI、演示数据
```

### 共享层到底共享什么？

`commerce-common/commerce_common/` 中的共享机制包括：

- `execution.py`：统一工具分发、参数解析、错误降级、Presentation 和 Delegate 调用。
- `turn.py`：流式轮次、工具调用收集、Eager Dispatch、历史压缩、未完成调用清理和调用日志。
- `fencing.py`：把第三方数据清洗并包裹成受控数据。
- `prompt_assembly.py`：静态 Prompt、动态上下文、工具缓存断点和请求消息组装。
- `memory.py`：结构化记忆、写入过滤、保留策略、清除与抽取。
- `presentation.py`：结构化 UI 的 Schema 校验、服务端补全和 UI 事件。
- `skills.py`：从目录加载 `SKILL.md`，按需把任务方法暴露给模型。
- `delegation.py`：把受限的分析任务封装成独立 Delegate。
- `streaming.py`：文本、工具、UI、购物车和变更等统一事件类型。

这里的设计准则不是“公共代码越多越好”，而是：**相同的机制只能有一个权威实现**。例如，如果 Messages API、Agent SDK 和 MCP 各自实现一遍参数校验，就会产生三套行为；如果 `fencing` 只在购物页面里做，商家分析和 MCP 入口就会成为漏洞。

### 角色层保留业务差异

购物代理和商家代理并没有强行抽象成一个“通用电商 Agent”。角色层分别拥有：

```text
Shopping:
    StorefrontBackend
    shopping_agent.gates
    shopping_agent.enrichment
    shopping_agent.tools.registry
    shopping-agent/skills/

Merchant:
    MerchantBackend
    merchant_agent.gates
    merchant_agent.changes
    merchant_agent.enrichment
    merchant_agent.tools.registry
    merchant-agent/skills/
```

这种结构避免了两个常见问题：第一，把不同业务的安全规则抽象成一个条件复杂的“万能门禁”；第二，为了复用代码，把商家操作和顾客购物混进同一个上下文，导致权限与术语都变得模糊。

## 三、Backend Contract：先定义系统能保证什么

应用代理最容易犯的错误，是先设计 Prompt，再临时拼几个 API。`commerce-agents` 的方向相反：先定义 Backend 契约，再让 Agent 只看见契约提供的事实。

### `StorefrontBackend` 的意义

购物 Backend 不是数据库 DAO 的简单包装，它是代理可用的领域边界。它提供的能力包括：

```text
search_products
get_product_details
get_cart
add_to_cart
update_cart_item
remove_from_cart
get_preferences
get_orders
get_order
search_policies
get_fulfillment_options
checkout_handoff
```

每个方法都明确了几件事：

- 以当前 session 代表的顾客身份调用后端。
- 凭证由宿主或 Backend 持有，模型永远不接触 Token。
- 结果是结构化领域记录，而不是任意拼接的长文本。
- Backend 仍然负责库存、资格、限额和业务状态的原子校验。
- 结账只返回宿主需要的 handoff，不在模型内处理支付。

例如，模型可以提出：

```json
{
  "name": "add_to_cart",
  "input": {
    "product_id": "sku-123",
    "quantity": 2
  }
}
```

但这个请求并不等于“系统必须添加”。它还要经过：

```text
当前 session 是否见过 sku-123
sku-123 是否还有未选择的规格
数量是否超过当前行上限
购物车是否已满
当前用户是否有资格购买
后端库存和价格是否仍然有效
```

工具层和 Backend 层各自做必要检查。前者保护 Agent 的调用边界，后者保护真实业务的一致性。因为 executor 的锁只能覆盖单个进程，不能代替数据库事务或跨进程锁。

### `MerchantBackend` 的意义

商家 Backend 把分析、商品、库存、价格和活动系统映射给 Agent。它可以让模型读取：

```text
经营上下文
Listing 和变体
订单与库存告警
销售、转化、退货等指标
活动与预算
待处理变更
```

但它不会把“修改数据库”暴露成一个没有语义的 `execute_sql`。变更要经过领域化的 `stage_*` 工具，产生一条带有目标、前后值、风险说明和创建者的 `StagedChange`，之后才进入审批和应用阶段。

这体现了一个通用原则：

> Backend Contract 不是把所有系统 API 转发给模型，而是定义业务可以让代理理解和请求的最小能力面。

### 事实、知识和动作要分开

一个健壮的 Agent 系统至少要区分三类数据：

| 数据类型 | 例子 | 正确来源 |
| --- | --- | --- |
| 实时事实 | 当前库存、订单状态、账户资格、活动预算 | 领域 Backend、数据库、账本或服务 API |
| 稳定知识 | 退货政策、术语、流程说明、产品使用规则 | 文档系统、RAG、Skill |
| 动作结果 | 购物车已更新、变更已暂存、审批被拒绝 | 工具执行结果、状态机、事件日志 |

把实时订单状态写进知识库，会产生过期答案；把政策文档当成写权限，会产生越权动作；把模型自己说出的“已完成”当成动作结果，会产生事实幻觉。分层的第一步就是把这三类数据分开。

## 四、Tool Registry：工具不是函数列表，而是执行契约

工具描述需要回答的不只是“参数叫什么”，还要让模型和运行时知道：什么时候可以用、结果代表什么、是否有副作用、失败后怎么办。

一个工具契约至少包含：

```text
name                稳定的工具名称
description         什么时候使用，以及不要在什么时候使用
input_schema        Pydantic / JSON Schema 可校验的输入
output semantics    结果是事实、提示、阻断还是错误
permission          所需权限和角色
risk level          read / low write / high write
idempotency         是否需要幂等键或重复调用保护
timeout / retry     超时与重试策略
audit               是否需要审计记录
confirmation        是否需要用户或宿主确认
```

项目中的工具注册表会根据配置生成最终工具面。一个系统没有库存、购物车或营销模块时，不只是把函数实现成“暂不可用”，而是可以通过 `enable_*` 配置把工具、相关 Prompt 和 grounding 规则一起移除。

这比始终暴露一个大工具列表更可靠，因为模型不会被告知系统拥有一个实际上不存在的能力，测试也能验证“关闭开关后工具真的不存在”。

### 小工具组合优于万能工具

不要把整个业务流程塞进一个 `commerce()` 或 `manage_store()` 函数。一个大工具可能同时做搜索、写入、通知、支付和状态变更，初期看起来很省事，但会牺牲：

- 权限粒度。
- 用户确认点。
- 失败恢复能力。
- 幂等和重试策略。
- 审计可读性。
- 行为评测的定位能力。

更合理的形态是：

```text
Skill：描述完整任务流程
Tool：执行一个有明确输入输出的动作
Backend：决定动作是否符合业务规则
State machine：决定状态能否迁移
Host：承载身份、确认和 UI
```

例如购物流程可以拆成搜索、详情、查看购物车、添加商品、更新数量、删除商品和结账 handoff。商家流程可以拆成读取指标、读取商品、暂存价格变更、查看变更、审批变更、应用变更和撤销变更。

## 五、Executor：所有工具调用的共同政策入口

`commerce-common/commerce_common/execution.py` 是整个项目最关键的架构点之一。它把一个模型工具调用变成一个受控的 `ToolOutcome`，而不是直接把 Python 异常或数据库结果丢回模型。

一个简化后的执行流程如下：

```text
模型产生 tool_use
      │
      ▼
拆出只给宿主看的 status
      │
      ▼
检查工具是否被配置禁用
      │
      ▼
Presentation / Delegate / Skill / Domain Handler 分流
      │
      ▼
Pydantic 校验输入参数
      │
      ▼
执行角色门禁：Provenance、数量、状态、审批
      │
      ▼
调用 Backend，执行后端自己的业务校验
      │
      ▼
返回 ToolOutcome 和宿主事件
```

### 为什么 `execute` 不应该抛出未处理异常？

在一个多轮 Tool Calling Loop 中，工具失败不一定意味着整轮对话失败。用户可能还需要知道库存暂时不可用，模型也可能需要根据错误结果改用另一个工具。

因此项目的 executor 把失败分成可解释的结果：

```text
invalid arguments  输入 Schema 不合法，告诉模型哪些字段需要修正
blocked            被门禁阻止，返回 gate 名称和下一步提示
error              Backend 或工具暂时不可用，不泄露内部异常
success            返回模型可读结果，并附带宿主事件
```

工具异常被记录并转成错误结果，不能直接把 turn loop 打断。流式输入如果一直无法拼成合法 JSON，也不会执行这个调用，而是返回“请重新发送调用”的结果。

这条错误阶梯有两个工程收益：

1. 模型能够在上下文中看到一个结构化失败并自我修正。
2. 宿主可以区分“用户无权做”“业务不允许做”和“系统暂时不可用”，而不是只拿到一个 500。

### 但不要把所有规则都塞进 Executor

Executor 负责执行策略，不能替代领域 Backend。它可以检查：

- 当前会话是否见过对象。
- 输入数量是否在配置上限内。
- 变更 ID 是否来自当前会话。
- 当前工具是否启用。
- 是否需要人工确认。

它不能单独决定：

- 用户是否通过了真实风控。
- 当前库存是否在另一个服务中被占用。
- 价格是否符合商家的税务和合规规则。
- 订单状态是否允许取消。

这些必须由 Backend 或真正的业务状态机做最终判断。工程上可以把 Executor 看成“代理侧的第一道门”，而不是“业务系统的唯一门”。

## 六、Prompt、Skill、动态上下文：四种知识不要混写

项目的一个重要设计规则，是按照规则的适用频率和变化方式决定放置位置。

| 层次 | 适合放什么 | 变化频率 | 是否应承担硬约束 |
| --- | --- | --- | --- |
| Tool description | 工具用途、参数语义、调用时机 | 低 | 否，最终仍由代码校验 |
| Static system prompt | 角色身份、通用表达、安全原则、工具使用纪律 | 低 | 只能承担模型行为约束 |
| `SKILL.md` | 某类任务的步骤、术语、判断方法和交互流程 | 中 | 不作为权限系统 |
| Dynamic context | 当前用户、页面、购物车、时间、账号和少量记忆 | 高 | 只提供本次请求事实 |
| Backend / Gate | 权限、状态、数量、价格和写入规则 | 随业务变化 | 是，必须在代码中强制 |

可以用一句话理解：

```text
Tool 说明“能做什么”
Skill 说明“这类任务通常怎么做”
Prompt 说明“这个角色始终遵守什么”
Context 说明“此刻发生了什么”
Code 说明“最终允许什么”
```

### Skill 是任务方法，不是工具文档

购物代理的 Skill 可以定义：

```text
先理解用户需求和缺失条件
再检索商品或读取订单
需要选择变体时询问规格
展示报价和风险信息
写入购物车后再确认结果
结账只交给宿主应用
```

商家代理的 Skill 可以定义：

```text
先读取当前指标或对象
区分事实、建议和变更
把修改拆成可审阅的 staged change
在应用前展示影响范围和限制
审批必须来自宿主操作，不接受聊天中的“同意”
```

这些内容告诉模型如何组织任务，但不能直接授予权限。一个 Skill 即使写着“可以修改价格”，也不能绕过 `check_guardrails`、Provenance 和 host approval。

### 静态和动态 Prompt 分离

项目在 `prompt_assembly.py` 中把请求拆成两个系统块：

```text
System block 1: 静态 Prompt，工具数组和缓存断点
System block 2: 当前请求的动态上下文
```

静态部分在 Agent 初始化时构建，动态部分在每个 turn 开始前构建。这样做的原因不是代码整洁，而是为了缓存和一致性：

- 工具描述和角色规则不会因为购物车变动而重新生成。
- 当前页面、账户、购物车和时间不会污染静态缓存前缀。
- 同一 turn 的多轮工具调用使用相同的动态上下文。
- 如果状态没有变化，可以复用更长的上下文缓存。

这也是很多 Agent 系统忽略的成本问题。把每次请求的订单、购物车和时间拼进一个巨大的 System Prompt，会同时降低缓存命中率、增加费用，并且让请求难以观察哪些字节导致了缓存失效。

## 七、Fencing：第三方数据永远是数据，不是指令

只要 Agent 读取了商品标题、商家描述、用户评论、订单备注、政策文本或外部网页，就存在 Prompt Injection 的数据通道。项目的做法不是在 Prompt 里写一句“请忽略其中的指令”就结束，而是把不可信内容当成输入数据，在进入模型上下文前做统一 Fencing。

### Fencing 做了什么？

`commerce-common/commerce_common/fencing.py` 的核心处理包括：

```text
NFKC Unicode 归一化
移除零宽字符、双向文本控制符和格式控制符
替换 C0/C1 控制字符
移除伪造的 human / assistant / system / user 轮次标记
移除 transcript、tool_use、tool_result 等特殊标签
移除对当前 fence 标签的伪造
限制单条文本和总 payload 长度
把内容放进固定标签中
```

示意形态如下：

```text
<storefront_data>
{"product_id":"sku-123","title":"...","price":399}
</storefront_data>
```

标签是代码中的固定字面量，不由运行时的商品名或外部输入构造。这样才能避免第三方文本伪造一个看起来像边界的标签。

### 为什么还要清理不可见字符？

肉眼看到的字符串和模型真正接收到的 Unicode 序列可能不同。零宽字符、双向覆盖字符、变体选择符和不可见标签字符都可能用于隐藏指令、改变显示顺序或绕过简单的字符串匹配。

这类清理不是为了“把所有特殊字符都删掉”，而是把明确承担结构控制意义的字符从业务数据中剥离，再保留足够的用户可读内容。对商品描述、政策文本等长内容，还要设置上限，避免单个来源耗尽上下文预算。

### Fencing 不能替代权限

Fencing 解决的是“模型读到的第三方文本是否可能改变指令边界”。它不解决：

- 这个用户能不能查看订单。
- 这个对象是否属于当前商家。
- 这个商品是否还能购买。
- 这个变更是否需要审批。

所以需要和身份、Provenance、Backend 规则同时使用。数据被清洗后仍然可能是真实但不适用的数据，不能因为“被 fence 过”就自动获得执行权限。

## 八、Provenance：把模型看见过的对象变成会话级能力集合

应用代理的一个关键安全问题是：用户或模型可以随意在工具参数里写一个 ID，但这个 ID 可能来自别的会话、模型记忆、恶意文本或猜测。项目因此维护会话级 Provenance。

### 购物代理的 Provenance

购物车写入只接受以下对象：

```text
本次会话的搜索结果返回过的 product_id
本次会话的商品详情返回过的 product_id
本次会话的订单历史返回过的商品
已经存在于当前购物车的行
```

如果模型直接调用：

```json
{"product_id":"sku-secret-internal","quantity":1}
```

而这个 ID 没有被当前会话的读取工具返回，门禁会阻止调用，并要求先用详情、搜索或订单历史解析它。这个设计把“模型提出了一个 ID”与“系统承认这个 ID 可用于写入”分开。

对于有规格的商品，父级商品记录不能直接加入购物车，系统会要求模型先选择变体。这避免了“模型猜了一个颜色和尺码”后写入不可验证的组合。

### 商家代理的 Provenance

商家变更同样需要：

```text
listing_id 或 campaign_id 必须来自当前会话的读取结果
编辑商品内容前必须先读取完整 listing
apply_change / discard_change 只能使用当前会话见过的 change_id
```

这样做的本质是把模型的可写对象集合限制在：

```text
session_seen_objects ∩ backend_authorized_objects
```

前半部分由 Agent 会话控制，后半部分由 Backend 和真实权限控制。Provenance 不是认证，也不是授权的替代品，它只是防止模型绕过“先读取、再写入”的因果链。

### 为什么不能只用 Prompt 要求“先查询”？

因为 Prompt 是概率性约束，而 Provenance 是确定性约束。模型可能忘记、误解、重复调用或在长上下文里混淆对象。代码级门禁会把这些情况变成可解释的 `blocked` 结果，并让 Agent 继续修正，而不是把越权参数送进后端。

## 九、商家写操作：`stage -> preview -> approve -> apply`

商家代理最值得迁移到其他领域的模式，是把写操作拆成可审阅的两阶段甚至多阶段流程。

```text
模型读取当前事实
      │
      ▼
stage_price_update / stage_restock / stage_campaign
      │
      ▼
ChangeLedger 保存 StagedChange
      │
      ▼
preview 卡片展示目标、前后值、影响和 guardrail notes
      │
      ▼
宿主应用或审批界面明确批准
      │
      ▼
apply_change
      │
      ▼
再次检查门禁和 guardrails，写入真实 Backend，并保留审计记录
```

### 为什么暂存后还要在 apply 阶段再检查？

因为暂存和应用之间可能经过很长时间：

- 配置中的价格幅度限制被收紧。
- 商品当前价格已经被其他操作修改。
- 活动状态发生变化。
- 目标对象不再存在或不再属于该商家。
- 审批人权限发生变化。

项目的 `check_guardrails` 在 stage 时运行，在 apply 时还会运行一次，并且以 apply 时的配置为准。这个原则可以推广到任何高风险 Agent：**预览不是承诺，执行前必须重新验证。**

### 聊天里的“确认”为什么不算审批？

如果模型收到用户一句“可以”，它可以把这句话理解成上下文，但不能让聊天文本本身成为权限凭证。项目默认要求 host 在自己的审批界面或 SDK 工具集里写入批准标记，`apply_change` 只接受这个标记。

这样可以区分：

```text
模型说“我建议应用这个变更”
用户在聊天里说“好”
宿主审批接口把 change_id 标记为 approved
```

第三个才是可以被执行器作为授权依据的动作。生产系统还应该把审批人、审批时间、权限快照、原始预览和最终实际写入记录全部写入审计账本。

### 购物代理为什么没有真实支付？

购物代理的 `checkout` 只渲染购物车并把用户交给宿主的结账流程。Hosted checkout URL 在模型调用完成后由 Backend 或宿主补到 UI payload 中，不经过模型工具参数，也不让模型处理支付凭证。

这是一个非常实用的边界：代理可以帮助发现、比较、准备和解释，但支付和订单创建仍由已有的认证、风控、幂等和支付系统负责。

## 十、结构化 UI：模型选择结构，服务端提供事实

如果 Agent 只返回 Markdown，前端往往要从自然语言中猜商品、价格、订单和按钮。项目选择把 UI 也建模成 Presentation Tool。

典型工具包括：

```text
present_product_list
present_product_details
present_cart
present_order_status
present_metrics
present_change_preview
present_suggestions
```

调用过程不是直接相信模型的 JSON，而是：

```text
模型生成 component + ids + 顺序 + 少量解释
      │
      ▼
PresentationPayload 进行 Schema 校验
      │
      ▼
EnrichmentContext 根据 Backend 和 session 状态补齐真实字段
      │
      ▼
无 Provenance 的 id 被丢弃或让卡片拒绝渲染
      │
      ▼
宿主收到 ui 事件并渲染可信组件
```

### 模型和服务端分别控制什么？

| 内容 | 谁决定 |
| --- | --- |
| 是否展示商品列表还是详情 | 模型，根据任务流程选择 |
| 展示哪些已经见过的 ID | 模型提出，服务端过滤 |
| 列表顺序和推荐理由 | 模型提出，服务端可限制排序范围 |
| 商品标题、价格、库存 | Backend / 服务端记录 |
| 订单金额和状态 | 订单系统 / Backend |
| 结账 URL | 宿主或 Backend，在模型调用后补齐 |
| 建议按钮文本 | 模型提出，服务端清洗、限长、限数量 |

因此模型可以做“选择和编排”，但不能通过 UI payload 伪造价格、指标或跳转地址。

### 为什么要支持部分流式 UI？

长列表或复杂卡片不必等模型整轮结束才展示。项目对特定 Presentation Tool 开启 eager input streaming，在输入 JSON 的结构逐步闭合后生成 `ui_partial` 事件，让宿主提前渲染已经可信的部分。

这里有三个重要限制：

1. 部分解析只能使用已到达且可验证的数据。
2. 部分 enrichment 必须是快速、无副作用、只读的同步逻辑。
3. 最终完整 payload 到达后仍然要重新做完整校验和服务端补全。

这是一种很好的通用思路：流式不等于降低校验标准，只是把校验后的中间状态提前发给前端。

## 十一、Tool Calling Loop：性能和恢复能力来自细节

一个最小 Agent Loop 通常是：

```python
while not done:
    response = await model(messages, tools)
    messages.append(response.assistant_message)

    if not response.tool_calls:
        done = True
        continue

    outcomes = await gather(
        executor.execute(call.name, call.arguments)
        for call in response.tool_calls
    )
    messages.append(tool_results(outcomes))
```

`commerce-agents` 在这个基础上处理了多个生产级细节。

### Eager Dispatch：工具执行和模型生成重叠

`EagerDispatcher` 会在流式响应中的一个 `tool_use` block 完整闭合、参数已经解析为 JSON 时，立即启动工具执行，而不是等整个模型响应结束。

```text
模型生成：tool A 参数闭合 ─────── 继续生成文字 / tool B ─────── 结束
工具执行：                 └──── A 开始执行 ───────────────┘
```

如果 Backend 读取要 200 毫秒，而模型还要 150 毫秒才能结束本轮，重叠执行就能降低用户等待时间。但要注意：

- 工具输入必须已经完整解析。
- 每个 `tool_use_id` 只能执行一次。
- 流式结束时要 join 所有已启动任务。
- 用户断开连接时要取消仍在运行的任务。
- 并行只适用于不互相依赖或由后端正确串行化的调用。

### 并发锁只保护本地临界区

购物车的 add、update、remove 可能在同一个 turn 里并行到达。项目用 session 级 asyncio lock 保护“读取购物车、计算变化、写回购物车”的本地临界区，避免一个进程内的两个工具调用互相覆盖。

但它明确没有把这把锁当作分布式一致性方案。真实部署需要把库存、余额、购物车或变更账本的最终写入放进数据库事务、行锁、分布式锁或带版本号的条件更新中。

### 中断、坏 JSON 和悬挂工具调用

流式系统不能只测试成功路径。项目专门处理：

```text
模型流在工具参数中途断开
工具输入永远没有形成合法 JSON
宿主在 yield 后关闭连接
工具已经启动但模型流报错
一个 round 结束时还有未配对的 tool_use
```

`StreamedRound` 会尽可能保留已经收到的内容，无法解析的调用返回错误结果而不执行，`finally` 中会取消不能继续存活的任务，`close_open_tool_uses` 会给存储中的未完成调用补上结果，避免下一次请求携带一个没有对应 `tool_result` 的非法历史。

这背后的原则是：

> 对话历史是一个需要满足协议不变量的持久化状态，不是随便 append 的日志。

### 轮次和历史都要有上限

项目在 Messages API 路径中：

- 达到最大工具轮次后强制使用 `tool_choice = none`，要求模型收束成文本。
- 对模型请求的列表数量做 clamp。
- 当历史超过阈值时清理旧的工具结果，但保留 Provenance 等会话状态。
- 对状态行、fenced payload 和展示文本设置长度上限。

无限工具循环和无限上下文都会变成成本、延迟和可靠性问题。限制不是对模型不信任，而是为任何异常策略保留一个可预测的终点。

## 十二、Memory 不是完整 Transcript

项目把记忆做成一组结构化、可过滤、可删除的事实，而不是把整段聊天记录再次塞回模型。

### 记忆事实的最小模型

一条记忆至少包含：

```text
key         稳定的主题键
value       用户明确表达的短事实
category    preference / constraint / context
updated_at  更新时间
source      写入会话的不可逆摘要，而不是原始 session id
```

每个字段有长度上限，写入还会经过 `MemoryWriteFilter`。默认会拒绝类似银行卡、账号、手机号、邮箱和其他标识符的内容，部署方可以添加更多过滤规则。

### 为什么不记住工具结果？

工具结果通常是时效性数据：今天的库存、当前订单状态、一次搜索出来的价格都可能很快失效。记忆抽取只读取最近一轮用户和助手的自然语言，不读取工具结果，并把稳定且下次仍有用的用户事实写入记忆。

```text
“我不喜欢黑色”            可以是 preference
“我只能接受无乳糖产品”      可以是 constraint
“我在为两个人准备露营”      可能是短期 context
“订单 #123 正在配送”        不应该作为长期事实
```

### 记忆的生命周期和并发

项目还考虑了几个容易被忽略的边界：

- 记忆开关关闭时，工具和上下文行为保持一致。
- 读取时优先注入所有约束，再注入最近更新的少量事实。
- 更旧的内容通过 `recall_memories` 按需查找。
- 用户清除记忆时提升 purge generation。
- 如果抽取模型运行期间用户已经清除记忆，抽取结果会被丢弃，避免删除后又复活旧事实。
- 事实可以逐条删除，宿主可以提供查看和管理入口。

这说明“加一个 memory tool”远远不够。只要记忆涉及个人数据，就必须同时设计写入规则、检索范围、保留期限、删除语义和并发竞态。

## 十三、Delegate：把分析任务隔离成受限子调用

商家代理提供分析能力，但没有让分析子模型获得整个 Agent 的能力。`DelegateExtension` 的契约要求：

```text
输入是一个结构化 brief
只能拿到明确提供的 Backend 和读取工具
不能写入、不能展示 UI、不能再调用 Delegate
返回一个 Schema 校验后的结果
调用次数、行数、字符数和时间有上限
结果不会扩大当前会话的可写 Provenance
```

例如，运营人员问“哪些商品的转化率下降最多”，分析 Delegate 可以读取一个受限 SQL 视图，返回：

```json
{
  "period": "last_7_days",
  "rows": [
    {"listing_id": "listing-01", "metric": "conversion_rate", "change_pct": -12.4}
  ],
  "caveats": ["sample size is below the preferred threshold"]
}
```

它不能因为看见了 `listing-01` 就获得修改这个 listing 的权限。分析结果可以帮助主 Agent 建议下一步读取或暂存变更，但写入仍需要主执行器重新通过 Provenance、Guardrail 和审批门禁。

### 为什么不直接做一个多 Agent 系统？

多 Agent 很容易变成多个不可控的 Prompt 互相传递结果。这里的 Delegate 更像一个受限函数：有明确输入、明确输出和能力边界，主 Agent 仍然拥有会话控制权。

只有当任务在上下文、权限、失败策略和预算上确实需要隔离时，才值得引入 Delegate。为了“看起来更智能”而拆分多个 Agent，通常只会增加状态同步、追踪和安全审计的复杂度。

## 十四、三条运行时路径不能假设完全等价

项目把角色核心复用到三个路径，但也明确承认它们的能力不同。

| 能力 | Messages API | Agent SDK | Managed Agents |
| --- | --- | --- | --- |
| 谁管理主 Loop | 项目自己的 orchestrator | SDK | 平台 |
| 工具执行边界 | 共享 executor | SDK toolset 仍调用共享逻辑 | MCP server / 平台工具配置 |
| Grounding | 可用 `tool_choice` 强制首个读取 | 通常由 host prefetch 或 SDK hook 参与 | 由平台能力决定，不能假定等价 |
| 记忆抽取 | turn 结束后显式调用 | 宿主负责触发 | 主要通过 `save_memory` 工具 |
| Host approval | 宿主路由或批准接口 | SDK 工具集 | 平台的确认策略 |
| 流式 UI | 自己发布统一事件 | 需要适配 SDK 事件 | 通过平台和 MCP 能力组合 |
| 历史压缩 | 项目代码控制 | 由 SDK 或宿主策略控制 | 平台控制 |

复用的正确对象是：

```text
Backend Contract
Tool Registry 的语义
Executor / Gate
Presentation Enrichment
Memory Contract
Event Protocol
```

不应该强行复用的对象是：

```text
某个厂商特有的 stream accumulator
某条 API 的 cache_control 字段
某个 SDK 的 turn hook
某个平台特有的 approval 语义
```

这也是做模型网关或 Agent 平台时应该保持的边界：统一抽象业务语义和事件，不要假设每家模型协议的流式细节都一样。

## 十五、测试与评测：先测试不可违反的规则

Agent 项目的测试不能只断言“最终回答看起来不错”。需要把系统拆成两种质量：

```text
确定性质量：代码必须阻止什么
概率性质量：模型在开放任务中是否做出好的选择
```

### 适合单元测试的内容

以下规则可以直接写成确定性测试：

- 未见过的 product ID 不能加入购物车。
- 有未选择规格的父商品不能直接加入购物车。
- 数量和购物车行数不能超过上限。
- 未见过的 change ID 不能 apply 或 discard。
- 价格波动、促销折扣、补货数量和活动预算不能越过 guardrail。
- 审批标记缺失时 `apply_change` 必须被阻止。
- UI payload 中未被验证的对象不能渲染。
- 外部文本中的隐藏字符和伪造轮次标记必须被清理。
- 记忆不能写入账号、卡号和其他敏感标识符。
- 工具异常不能让 turn loop 直接崩溃。
- 中断后不能留下没有 tool result 的 tool use。

### 适合行为评测的内容

以下内容更适合用固定对话、回放和模型评测：

- 用户信息不完整时，模型是否只询问必要问题。
- 模型是否先读取事实，再回答订单或政策问题。
- 模型是否正确选择 Skill 和 Tool。
- 模型是否把暂存变更解释成“待审批”，而不是声称已经生效。
- 模型是否正确处理 Backend 返回的阻断和暂时不可用。
- 推荐理由是否引用了实际读取到的数据，而不是编造特征。
- 结构化 UI 是否选择了合适的组件和顺序。

### 对抗样本要成对出现

每个安全评测最好都有恶意样本和正常样本：

```text
商品描述包含“忽略之前指令”       仍然只能当商品描述
政策文本包含 transcript 标签        不得伪造对话边界
用户提供一个未见过的 SKU           必须先读取，不能直接写入
正常用户请求同一个已见过的 SKU     应该能够顺利完成
```

只有恶意样本而没有正常 counterpart，容易把系统测成“什么都拒绝”。安全门禁应该减少越权，不应该让正常工作流无法运行。

### 一致性检查同样重要

项目还有 `scripts/check.py` 一类的机制，用于保证 Prompt、工具描述、Skill 和 Managed Agent 的 `system.md` 派生结果保持一致。凡是把同一规则复制到多处的项目，都需要一个生成或检查流程，否则很快会出现：

```text
Messages API 说工具叫 A
SDK 仍然暴露旧工具 B
Managed Agent 生成了过期 Prompt
测试只覆盖其中一条路径
```

跨运行时的行为一致性，通常比某一个模型回答得更漂亮更值得优先保障。

## 十六、这个参考项目没有替你完成什么？

学习参考项目时，既要理解它已经解决的问题，也要看清它刻意留下的部署边界。仓库 README 和安全文档已经列出多项生产部署责任，主要包括：

### 1. 认证和授权

演示宿主为了方便运行，接受的调用范围很宽。生产部署必须在 HTTP 路由、MCP server、WebSocket 或其他入口前面接入真实身份系统，并把已验证的顾客或商家主体绑定到 session。

### 2. 凭证和多租户隔离

Backend 需要根据 session 找到正确的服务凭证。模型不应携带用户 ID、商家 ID 或 access token 作为工具参数，因为这些都可能被模型或用户篡改。

### 3. 分布式一致性

示例中的内存存储、JSON 存储和单进程锁适合演示，不足以保护多副本部署中的库存、购物车、审批或账本。真实系统要使用共享状态存储、版本检查、条件更新、幂等键和可重试事务。

### 4. 真实支付与订单状态机

示例明确不下单、不扣款。接入真实交易时，支付、订单创建、库存占用、退款、争议和幂等必须由已有领域服务负责，Agent 只能调用经过严格封装的业务动作。

### 5. 生产级可观察性

项目已经记录模型、轮次、停止原因、Token 和耗时的摘要，但部署方仍需补充 trace、工具级指标、拒绝原因、审批审计、用户反馈、成本归因和敏感日志治理。

### 6. 完整评测基础设施

参考项目有单元测试、跨包测试和脚本化验证，但真实组织还需要版本化评测集、线上回放、模型变更门禁、人工抽检、数据脱敏和故障复盘流程。

理解这些缺口很重要，因为“参考实现没有做”不一定是遗漏，很多时候是为了清晰地把生产责任留给接入方。

## 十七、要做类似 Agent，需要学习哪些知识？

下面按优先级给出学习地图。建议先掌握能让一个单 Agent 稳定执行的基础，再学习多 Agent、MCP 和平台化，不要从“多 Agent 编排”开始。

### P0：必须先掌握

| 知识点 | 需要理解的内容 | 建议练习 |
| --- | --- | --- |
| Python 异步编程 | `asyncio`、Task、取消、超时、`gather`、生成器和资源清理 | 写一个可取消的并发工具执行器，并保证任务不会泄漏 |
| FastAPI 与 SSE | session 路由、依赖注入、流式响应、断开处理、错误码 | 做一个能实时推送文本、工具调用和工具结果的聊天后端 |
| Tool Calling | 工具 Schema、tool call ID、多轮消息、并行调用、工具结果 | 从 3 个只读工具开始，完成一个可回放的 Loop |
| Pydantic / JSON Schema | 输入校验、枚举、嵌套模型、额外字段、错误可读性 | 为每个工具写输入和输出模型，不让字典无约束穿透系统 |
| 领域建模 | Entity、Value Object、聚合、状态机、领域异常和不变量 | 建模商品变体、购物车、订单或 staged change |
| 安全边界 | Prompt Injection、Unicode 欺骗、越权、最小权限、敏感数据 | 对商品描述和政策文本做 Fencing，写恶意与正常成对测试 |
| 会话与并发 | 身份绑定、会话状态、乐观锁、幂等、竞态和恢复 | 实现带版本号的 session store，模拟两个请求同时写入 |
| 测试工程 | 单元测试、契约测试、回放、属性测试、行为评测 | 给 gate、executor、stream salvage 和关键对话各写一组测试 |

这些知识决定的是“这个 Agent 能不能安全运行”，不是“模型能不能说得像人”。如果 P0 没有掌握，直接学习多 Agent 框架只会把问题隐藏得更深。

### P1：完成基本 Agent 后学习

| 知识点 | 重点 |
| --- | --- |
| MCP | 工具发现、Schema、传输、鉴权、连接级状态和服务端隔离 |
| Agent SDK | SDK Loop、工具注册、权限模式、平台环境、生命周期 Hook |
| 流式协议设计 | 增量 JSON、部分 UI、背压、断开重连、事件排序和去重 |
| Prompt Cache | 静态前缀、动态上下文、cache breakpoint、缓存失效原因和成本统计 |
| 结构化 UI | Presentation Tool、服务端 Enrichment、可信字段和渐进渲染 |
| Memory 工程 | 事实抽取、过滤、保留、删除、召回和个人数据生命周期 |
| 观测与成本 | trace、Token、延迟、工具成功率、拒绝率、模型版本和预算 |

这些内容对应项目中 `prompt_assembly.py`、`presentation.py`、`memory.py`、`turn.py` 和 MCP 适配层的工程问题。

### P2：面向平台和生产规模

| 知识点 | 重点 |
| --- | --- |
| 分布式系统 | 共享 session、分布式锁、事件总线、重试、幂等和最终一致性 |
| 审批与审计 | Human-in-the-loop、四眼原则、权限快照、审批证据和回滚 |
| 评测平台 | 数据集版本、离线回放、线上采样、评分器、人工复核和回归门禁 |
| 多模型适配 | 不同协议的工具流、结构化输出、停止原因、缓存和错误映射 |
| 业务安全 | 支付、退款、库存、合规、隐私、风控和账号删除 |
| 容量与成本 | 并发模型、上下文预算、缓存命中、队列、限流和降级 |
| Agent 平台设计 | Backend Adapter、Tool Registry、Policy Engine、Event Protocol 和插件生命周期 |

## 十八、推荐的实战学习顺序

可以用下面的顺序做一个缩小版项目，每一步都有明确的验收标准。

### 第 1 步：只做一个只读领域

先选择商品目录、知识库或内部资产，完成：

```text
search
get_detail
answer_from_result
```

暂时不要做支付、写数据库和多 Agent。目标是理解模型消息、工具 Schema、工具结果和轮次循环。

### 第 2 步：抽象 Backend Contract

把真实系统调用放进接口或抽象类，不让 Prompt 层直接导入数据库客户端。为每个方法写返回类型、异常类型、身份来源和数据新鲜度说明。

### 第 3 步：建立统一 Executor

所有工具都经过同一个执行入口，至少完成：

```text
Pydantic 校验
禁用工具检查
超时
错误结果
日志摘要
工具调用事件
```

### 第 4 步：加入 Fencing 和 Provenance

先对外部文本做清理和固定标签包裹，再对所有写工具加入“当前 session 是否见过此对象”的门禁。此时就开始写恶意数据测试，不要等上线前才补。

### 第 5 步：把会话变成可持久化状态

分开存储：

```text
transcript：模型协议需要的消息
state：Provenance、购物车摘要、审批标记、版本号
events：宿主 UI 和审计需要的事件
```

实现版本冲突和断开恢复，不要只把所有内容塞进一个 JSON blob。

### 第 6 步：接入 SSE 和结构化 UI

定义稳定的事件协议，例如：

```text
text_delta
tool_call
tool_status
tool_result
ui_partial
ui
state_update
turn_complete
```

UI 数据由服务端 Enrichment，模型只传递 ID、顺序和少量展示意图。

### 第 7 步：再做 staged write

先实现 `stage` 和 `preview`，确认能展示前后值和影响范围，再加入 `approve` 与 `apply`。在 stage 和 apply 各执行一次 guardrail，并记录审计事件。

### 第 8 步：补齐评测和运行时适配

先让 Messages API 路径稳定，再把 Backend、Executor 和事件模型适配到 SDK 或 MCP。每增加一条路径，都运行相同的安全回归集，确认行为没有漂移。

### 第 9 步：最后再加入 Delegate 或多 Agent

只有当某个分析任务需要独立模型、独立预算或独立工具集合时，才把它做成 Delegate。Delegate 的结果必须 Schema 化，并且不能自动扩大主 Agent 的写权限。

## 十九、常见但代价很高的错误

### 错误一：把所有规则都放在 System Prompt

这样做会让 Prompt 越来越长，规则不可测试，换运行时容易丢失，模型还可能在上下文很长时忽略关键内容。硬规则必须落在 Schema、Gate、Backend 和状态机中。

### 错误二：让模型直接传 user_id、merchant_id 或 token

身份应该从已认证的 session 或连接上下文推导。工具参数中的主体 ID 只能作为展示或筛选字段，不能成为授权依据。

### 错误三：把搜索结果的标题当成可信指令

商品标题、评论和外部网页都是不可信数据。它们需要 Fencing、长度限制和固定标签，不应该直接拼进 System Prompt。

### 错误四：把预览卡片当成已执行

预览只是模型和用户共同查看的计划。真正执行时仍需重新读取事实、重新执行 guardrail，并确认审批主体和权限。

### 错误五：用记忆存储所有工具结果

这会把临时价格、库存和订单状态变成过期事实，也会增加个人数据风险。记忆应该存稳定的用户事实，实时业务状态应每次从 Backend 读取。

### 错误六：只测试最终文本，不测试执行链

“模型回答听起来合理”不能证明没有越权写入。必须直接测试 tool input、gate、Backend 调用、状态变化和事件输出。

### 错误七：先上多 Agent，后补权限

多个模型之间传递的文本同样是不可信边界。先把单 Agent 的执行器、会话、工具和评测做好，再基于隔离需求引入 Delegate。

## 二十、如果把这套思想迁移到 Sub2API

如果你正在做的是模型网关、AI API 中转或 Agent 平台，而不是电商应用，不需要照搬商品和订单类型，但可以保留它的骨架。

### 建议保留的四个核心

```text
Backend Contract
    将账号、配额、模型目录、线路和业务状态与模型适配器分开

Tool Registry
    统一描述工具、参数、权限、风险和可用开关

Executor / Gate
    在模型请求到达真实服务前做 Schema、身份、配额、策略和审计检查

Event Protocol
    用统一事件承载文本、工具调用、状态、错误、用量和完成信号
```

### 模型协议适配器不要污染业务层

可以定义一个内部的模型客户端协议：

```python
class ModelClient(Protocol):
    async def stream_turn(
        self,
        *,
        messages: list[dict[str, object]],
        tools: list[dict[str, object]],
        system: list[dict[str, object]],
    ) -> AsyncIterator[ModelEvent]: ...
```

然后分别实现：

```text
Anthropic Messages Adapter
OpenAI-compatible Chat Completions Adapter
Responses API Adapter
Managed Provider Adapter
```

这些 Adapter 负责处理工具调用增量、停止原因、Token 用量、错误格式和缓存字段的差异；它们不应该决定用户是否有余额、某个模型是否能被调用或某个工具是否需要审批。

### OpenAI 兼容网关需要特别注意的差异

从 Anthropic 风格的参考实现迁移到 OpenAI 兼容接口时，至少要单独设计：

- 流式 tool call 参数可能是增量字符串，需要增量 JSON 拼接和坏流恢复。
- 不同上游的 tool call ID、finish reason 和 usage 字段不完全一致。
- Prompt cache 可能不是 `cache_control` 语义，不能把缓存命中逻辑写死在业务 Prompt 中。
- 有些模型支持严格结构化输出，有些只支持普通 JSON，需要在能力目录中显式标记。
- 多模态、推理 token、隐藏 reasoning 和服务端工具的事件形状可能不同。
- 上游错误、重试和限流必须映射成稳定的内部错误模型。

对 Sub2API 这类网关来说，真正可复用的不是某一家模型的字段，而是内部的：

```text
统一模型目录
统一身份与配额
统一工具 Schema
统一流式事件
统一审计和用量
统一重试与降级
```

同时，认证、余额、倍率、路由、供应商密钥、模型权限和计费都必须在模型适配器之外完成。模型返回“调用成功”不能直接等于扣费完成，扣费和用量结算要有自己的幂等与账本语义。

## 二十一、最终检查清单

在你认为“类似 Agent 已经可以上线”之前，可以逐条检查：

```text
[ ] 模型是否只能通过 Backend Contract 读取业务事实？
[ ] 工具是否有稳定的 JSON Schema 和明确的副作用说明？
[ ] 所有工具是否经过统一 Executor？
[ ] 第三方文本是否经过 Unicode 清理、Fencing 和长度限制？
[ ] 写入对象是否受当前 session Provenance 限制？
[ ] 身份是否从服务端 session 推导，而不是由模型参数决定？
[ ] 高风险写入是否经过 stage、preview、approval、apply？
[ ] apply 是否会重新执行最新 guardrail？
[ ] UI 的价格、状态、指标和链接是否由服务端补齐？
[ ] 工具失败、坏 JSON、断开和取消是否可恢复？
[ ] 会话 Transcript、State、Events 是否分离？
[ ] Memory 是否有过滤、删除、保留和并发语义？
[ ] Delegate 是否只读、限时、限预算且不扩大写权限？
[ ] 每条运行时路径是否共享同一套硬规则？
[ ] 是否同时有确定性单测和模型行为评测？
[ ] 是否明确了认证、限流、分布式锁、支付、审计和回滚由谁负责？
```

如果这些问题无法回答，继续堆 Prompt 或增加工具数量通常不会让系统更可靠。

## 结语：应用代理的核心是边界设计

`commerce-agents` 最值得学习的地方，不是它有多少个 Tool，也不是它用了哪一个模型，而是它把 Agent 拆成了一组可以检查的边界：

```text
Skill              组织任务方法
Prompt             传递稳定行为规则
Dynamic Context    提供当前会话事实
Tool               暴露最小动作契约
Executor           统一分发和错误处理
Gate               阻止越权、超限和非法状态
Backend            负责真实事实和业务规则
State              保存会话级 Provenance 和流程状态
Presentation       用服务端事实生成结构化 UI
Memory             保存经过过滤的长期用户事实
Delegate           隔离受限的分析任务
Host               持有身份、审批、支付和最终交互
```

一旦这些边界清晰，模型就不再是整个系统的控制面，而是系统中的一个概率性决策组件。它可以理解自然语言、选择工具、组织流程和生成解释，但不能凭一句话改变权限、伪造事实、绕过审批或直接控制资金。

这也是从 Prompt Demo 走向可用应用代理的分水岭：不是让模型承担更多职责，而是让每一项职责都有正确的承载位置，并且让错误在进入真实业务之前被捕获、解释和恢复。

