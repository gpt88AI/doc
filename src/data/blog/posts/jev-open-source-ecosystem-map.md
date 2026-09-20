---
title: Jev 开源项目地图：从浏览器 Agent 到代码搜索和知识图谱
description: 根据 govin.eth 的 Jev 项目清单逐项核验公开 GitHub 仓库，整理 Jev 开源生态中的浏览器自动化、桌面控制、代码审查、模型路由、MCP、知识图谱、代码搜索和上下文过滤项目，并标注当前能力与使用风险。
date: 2026-09-20
category: 开发工具
tags: [Jev, 开源项目, Browser Agent, Codex, MCP, 代码审查, 知识图谱]
readTime: 17
relatedPath: /docs/blog/jev-real-world-applications/
relatedTitle: Jev 到底适合做什么：从客服分流到 AI 质检的真实落地清单
---

Jev 发布后，社区很快出现了一批“把快速决策模型嵌进现有软件”的项目。它们的共同点不是让 Jev 变成聊天机器人，而是把它放到一个已经存在的系统里，负责有限动作选择、分数判断、概率排序或上下文过滤。

本文以 govin.eth 发布的十项目清单为入口，对公开仓库进行逐项整理。项目状态会变化，本文只记录截至 **2026 年 9 月 20 日** 能从仓库 README、目录和公开说明中确认的能力。GitHub star、fork 和作者环境中的速度数字不是生产质量证明。

## 一、先看项目分层

这十个项目大致分成五层：

| 层级 | 项目 | Jev 负责什么 |
| --- | --- | --- |
| 浏览器与桌面 | `jev-ultrafast`、`jev-desktop` | 从受控动作集合中选择操作和目标 |
| 代码工作流 | `jev-review`、`jev-codex-router` | 选择审查路径、风险等级或模型配置 |
| 工具协议 | `jev-mcp`、`typesafe-mcp` | 将 Choice、Score、分类封装为 MCP 工具 |
| 搜索与上下文 | `blink`、`winnow` | 选择相关文件或过滤工具输出 |
| 图结构与市场 | `neo4jev`、`prism-liquidity-agent` | 对候选路径、市场状态或策略条件打分 |

从架构上看，它们都在尝试同一件事：把大模型的“自由生成”前移或后移成一个小而明确的判断节点。

## 二、`jev-ultrafast`：浏览器动作选择的代表案例

仓库：[browser-use/jev-ultrafast](https://github.com/browser-use/jev-ultrafast)

Browser Use 的项目 README 将它定义为带动态、索引动作空间的浏览器 Agent。系统把当前页面中的可操作元素编号，让 Jev 一次选择操作和元素；只有在操作是 `TYPE_TEXT` 时，才让小语言模型生成要输入的文字。

公开示例是从 Zürich 搜索到 London 的 Google Flights，README 报告约 7.1 秒，且包括自然语言目标、真实文字生成和等待页面加载。这个案例的可复核程度相对较高，因为仓库包含 examples、scripts、tests 和 measurements 说明。

它真正值得借鉴的不是“7.1 秒”这个数字，而是状态和动作的划分：

```text
网页状态
  → 动态生成当前动作空间
  → Jev 选择操作与元素
  → 浏览器执行
  → 只有文本输入才调用语言模型
```

限制也很清楚：复杂视觉页面、Canvas、验证码、登录和外部副作用不能因为动作模型很快就自动放行。

## 三、`jev-desktop`：把 Jev 放进 Codex Computer Use

仓库：[yikangy873-gif/jev-desktop](https://github.com/yikangy873-gif/jev-desktop)

这个项目不是另起炉灶做一个桌面 Agent，而是把 Jev 接进现有 Codex Computer Use 运行时。README 中的职责划分是：

- Codex 理解目标、准备文本、定义允许动作并验证结果；
- Jev 选择操作以及兼容的目标元素；
- Computer Use 执行点击、填写、滚动或快捷键。

它还明确列出数据边界和安全约束：敏感或有后果的控件返回给 Codex，不由快速循环直接执行；发送、发布、付款、删除、上传、登录、安装和权限修改都不在 Jev 快速循环中。

这比“给 Computer Use 加一个快模型”更重要。桌面自动化的主要风险不是多等一秒，而是模型在错误状态上执行不可逆动作。项目的状态版本、允许列表、局部目标校验和独立验证，才是它的工程核心。

## 四、`jev-review`：结构化代码审查，而不是让 Jev 看完整仓库

仓库：[devagrawal09/jev-review](https://github.com/devagrawal09/jev-review)

`jev-review` 是一个带本地 dashboard 的代码审查工作流。它把 Jev 放在多个有界判断节点：风险矩阵、文件画像、证据选择、机制分类、严重程度评分和审查路径路由。

公开架构显示，代码负责编排，Jev 负责 bounded judgments。它支持当前 Git diff 审查和完整代码库扫描，并把相关测试作为判断测试缺口的上下文。

项目的 README 有一个值得保留的边界声明：它尚未整合编译器诊断、静态分析器、仓库索引或自动解释生成，输出是审查提示，不是缺陷证明。

这是一种合理的 AI 代码审查方式：

```text
确定性工具发现事实
  → Jev 选择风险和证据范围
  → 强模型或人工解释具体问题
  → 测试、编译和安全工具决定是否可信
```

## 五、`jev-codex-router`：按 turn 选择模型和推理深度

仓库：[0xNatoshi/jev-codex-router](https://github.com/0xNatoshi/jev-codex-router)

这个项目让 Jev 为每个 Codex turn 选择模型、思考深度和速度模式。仓库强调 API key 从环境变量读取，服务只绑定 `127.0.0.1`，本地决策日志和 replay 数据默认忽略提交，并把真实使用日志用于后续校准。

它的价值在于把“模型路由”变成显式策略，而不是让主 Agent 临场决定：

```text
任务摘要
  → Jev 预测难度 / 风险 / 速度模式
  → 选择便宜模型、强模型或人工路径
  → 记录决策、结果和回放数据
```

但路由器必须证明全链路收益。额外调用可能增加延迟，代理层可能破坏缓存，错误路由还可能让任务失败。作者环境中的“成本下降”只能作为待验证假设。

## 六、`prism-liquidity-agent`：金融场景要把 Jev 当信号层

仓库：[irfndi/prism-liquidity-agent](https://github.com/irfndi/prism-liquidity-agent)

这个项目的公开描述是自动化流动性管理 Agent，当前支持 Meteora DLMM，并包含再平衡与回测方向。原始 Jev 清单将其描述为使用 Jev 判断 Toxic Flow、市场压力、均值回归和流动性分布。

金融场景的正确边界是：Jev 可以作为结构化信号或状态分类器，不能直接替代风控、仓位限制、行情校验、杀开关和订单回执。

```text
市场状态
  → Jev 判断市场条件
  → 确定性风险规则和仓位上限
  → 策略计算
  → 模拟 / 回测 / 人工批准
  → 受控执行与事后对账
```

任何“模型判断后直接交易”的文章，都必须补充数据延迟、滑点、失败重试、资金隔离和回滚机制。速度和概率不能代替执行安全。

## 七、`jev-mcp` 与 `typesafe-mcp`：让 Agent 直接调用结构化判断

仓库：[jkudish/jev-mcp](https://github.com/jkudish/jev-mcp)、[itsmostafa/typesafe-mcp](https://github.com/itsmostafa/typesafe-mcp)

这类项目把 Jev 封装成 MCP 工具，让 Codex、Claude Code 或其他 Agent 可以请求 Choice、Score、分类和路由判断。它们适合以下任务：

- 检查一段文本是否包含 Prompt Injection；
- 判断某个事实是否被输入材料支持；
- 给搜索结果或候选文件排序；
- 判断下一步应该使用哪个工具；
- 将开放式输出交给后置质量门禁。

MCP 只是工具协议，不会自动解决权限、上下文泄露和错误处理。接入前至少要明确：哪些输入可以发送给远端模型、哪些结果允许自动执行、工具失败时是否 fail closed、以及调用日志是否包含敏感内容。

## 八、`neo4jev`：在知识图谱邻接关系中做概率导航

仓库：[jexp/neo4jev](https://github.com/jexp/neo4jev)

`neo4jev` 的 README 提供了比“把 Jev 接到知识图谱”更具体的实现：每一跳把邻接关系作为 `Choice`，同时用 `Noul` 判断目标是否已经到达；返回的概率分布用于 top-k、cutoff 和 beam search。

项目还使用路径概率的对数分数，避免浮点下溢和路径长度偏差，并提供 Jupyter notebook 与 Streamlit 可视化。默认目标是公开的 Neo4j Companies KG，代码通过 schema introspection 发现标签、关系和索引，而不是把图结构硬编码。

这是 Jev 很典型的用法：模型不需要生成“下一段解释”，只需要在当前邻居集合中做选择。图搜索、推荐、工作流导航和知识库问答都可能复用这种模式。

但候选集合的截断会决定上限。仓库 README 也说明了每个节点的关系数量有上限，未被采样的边不可能被模型选择。概率搜索的工程质量，取决于候选召回和模型判断两层，而不是只看模型概率。

## 九、`blink`：先判断该搜索哪个目录和文件

仓库：[ellipsis-dev/blink](https://github.com/ellipsis-dev/blink)

`blink` 用 Jev 给文件和目录名称打分，多个 walkers 根据概率更频繁地走向相关路径，最后返回最可能的文件。用户只需提供自然语言查询和目录，工具就可以递归搜索并输出候选路径及比例。

它解决的是代码搜索的第一阶段：缩小搜索空间，而不是读取并解释全部源代码。

```text
自然语言查询
  → Jev 给路径候选评分
  → 多个 walker 探索高概率分支
  → 返回候选文件
  → grep / AST / 强模型做精确分析
```

这种设计能减少无效扫描，但也会受到命名质量、目录结构和同义词影响。文件名评分不能证明文件内部就是答案，因此它应当作为召回层，不能取代精确检索和语义分析。

## 十、`winnow`：在工具结果进入上下文前做过滤

仓库：[GhalebDweikat/winnow](https://github.com/GhalebDweikat/winnow)

`winnow` 面向 Claude Code 的工具输出，使用 System One 模型判断 Read、Bash、Grep 等结果哪些值得进入当前上下文，并提供 shadow 模式、回放、抽样人工标注、agreement、ECE 和 ROC AUC 等评测工具。

这个项目比“把长输出摘要一下”更值得研究，因为它保留了过滤决策的证据和校准路径：

- `active` 模式实际改写工具结果；
- `shadow` 模式只判断和记录，不影响 Agent；
- 可以从回放中抽样，人工标记 needed / not needed / unsure；
- 通过校准和排序指标评估过滤器，而不是只看主观感觉；
- 没有 Jev key 时可以使用 adapter 验证整条管线，但 adapter 的概率不应当冒充 Jev 的校准结果。

上下文过滤是高风险用途。一次错误过滤可能让 Agent 永远看不到关键错误或配置。生产接入必须从 shadow 模式开始，并设置“宁可多给，不要漏掉”的保守策略。

## 十一、项目地图之后，如何判断一个仓库值不值得用

不要只看项目名称、star 数或视频演示。建议按下面的证据顺序检查：

1. 是否有可读 README、安装步骤和明确许可证。
2. 是否有测试、示例、测量脚本或回放数据。
3. Jev 输入的状态是否真实完整，还是只有手工构造的小例子。
4. 是否区分了模型判断、确定性规则和最终执行。
5. 是否有低置信度、超时、错误响应和人工接管路径。
6. 是否明确哪些敏感动作永远不会进入快速循环。
7. 项目是否只在作者本机运行，还是有可重复的最小路径。

截至本文核验的十个方向里，`jev-ultrafast`、`jev-review`、`jev-desktop`、`winnow` 和 `neo4jev` 的公开 README 对内部流程、限制或测试边界描述得相对具体；这不等于它们已适合生产，而是它们提供了更好的审查入口。

## 来源与边界

项目清单来源：[govin.eth｜Jev 项目整理](https://x.com/goan999999/status/2101284406359179732)。

官方定义：[TypeSafe AI｜Introducing System One Models & Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev)。

本文项目状态均以 2026 年 9 月 20 日公开 GitHub README、目录和仓库元数据为依据。star、fork、作者自测和演示视频只能说明项目存在或曾经运行过，不能证明长期维护、生产可靠性或普遍性能。使用任何仓库前，应自行审查代码、许可证、依赖、密钥边界和副作用控制。
