---
title: GPT-6.1 Sol 到底能不能打？官方评测、成本与适用场景
description: 根据 OpenAI 的 GPT-6.1 Sol 发布资料，梳理编程、专业工作、计算机使用、科学研究、事实准确性与安全评测，并说明五分之一标价和单任务成本的区别。
date: 2026-09-30
category: 模型评测
tags: [GPT-6.1 Sol, GPT-6 Astra, OpenAI, 模型评测, API 成本, Agent]
readTime: 12
relatedPath: /models/gpt-6-1-sol/
relatedTitle: GPT-6.1 Sol 模型 API 文档
---

> 来源：[池建强在墨问发布的整理](https://note.mowen.cn/detail/NzNV6d0nsNnuQHk4e2KFF)。笔记正文包含 OpenAI 对 GPT-6.1 Sol 的发布介绍和评测图表。本文对其内容重新编排并补充成本解读；benchmark 数字、模型安全评估和任务成本均是 OpenAI 报告的数据，不是独立复测，也不代表所有工作负载的实际结果。

![GPT-6 Astra、GPT-6.1 Sol 与 GPT-6 Luna 的官方定位及 token 价格对比](/docs/blog/zh/gpt-6-1-sol-benchmarks-and-cost/img/01.png)

## 先说结论

OpenAI 将 GPT-6.1 Sol 定位为复杂编程、计算机使用和专业工作的模型：它比 GPT-6 Sol 更强，并以更低的 token 单价接近 GPT-6 Astra。按照官方标准 API 单价，Sol 输入和输出分别为每百万 token 2 美元和 10 美元，约为 Astra 对应单价的五分之一。

但“价格是五分之一”说的是 token 单价，不等于每个任务的实际账单固定只有五分之一。推理强度、上下文长度、工具调用次数、任务完成率和重试都会影响总成本。更准确的判断是：**Sol 把接近高端模型的能力带到更低的标价区间，是否更省钱仍要按自己的任务测。**

## 官方报告了哪些结果

以下数字来自 OpenAI 的发布材料。不同评测有各自的任务集合、推理设置和成本计算方式，表格适合看官方主张的方向，不应当作跨 benchmark 的统一排行榜。

| 任务类型 | OpenAI 报告的 GPT-6.1 Sol 表现 | 成本或比较口径 |
| --- | --- | --- |
| 编程：DeepSWE v1.1 | 比 GPT-6 Sol 最高分高 6.4 个百分点 | 以约五分之一成本达到接近 GPT-6 Astra 的水平 |
| 专业工作：GDP.pdf | 各档受测推理设置下得分高于带回退机制的 Opus 5.5 | 单任务成本不到其一半；以约五分之一 Astra 成本接近其表现 |
| 业务流程：AutomationBench | 中等推理强度下比 Opus 5.5 高 2.2 个百分点，比同设置的 GPT-6 Sol 高 4.8 个百分点 | OpenAI 报告成本约为 Opus 5.5 的三分之一；对 Claude Fable 5.1 的成本未计入约 40% 任务发生的回退 |
| 计算机使用：OSWorld 2.0 | 最高推理强度下比 GPT-6 Sol 高 7 个百分点；与 Astra 的分差缩至 2.1 个百分点以内 | 不到 GPT-6 Sol 成本的一半，约为 Astra 单任务成本的七分之一 |
| 科学研究：Terminal-Bench Science 0.1 | 最高推理强度下得分超过 GPT-6 Sol 的两倍 | 平均单任务成本：Sol 5.47 美元、Opus 5.5 23.21 美元、Astra 23.80 美元 |
| 事实准确性 | 超高推理强度下事实错误率 4.1%，GPT-6 Sol 为 4.5%，Astra 为 4.0% | Sol 单任务成本比 Astra 低约 83%；评测特意选取用户曾指出早期模型错误的高难度对话 |

这组数据指向的不是“所有任务都达到 Astra”，而是 Sol 在若干高难度任务中缩小了与 Astra 的差距，同时比 Astra 便宜。不同项目之间的成本倍数也并不相同，不能把某个 benchmark 的七分之一外推到日常 API 请求。

### 编程：提升明显，但要看任务成功率

![DeepSWE v1.1 编程评测：模型得分与单任务成本](/docs/blog/zh/gpt-6-1-sol-benchmarks-and-cost/img/02.png)

DeepSWE v1.1 面向真实代码库中的长程软件工程任务。OpenAI 报告称，GPT-6.1 Sol 比 GPT-6 Sol 的最高得分高 6.4 个百分点，并以约五分之一的 Astra 成本达到相当水平。对工程团队而言，更有用的复测方式是让模型处理自己仓库里的 issue，统计一次通过率、人工返工时间、测试结果和每个已验收改动的总成本。

### 专业工作与业务自动化

![GDP.pdf 专业文档评测：准确率与单任务成本](/docs/blog/zh/gpt-6-1-sol-benchmarks-and-cost/img/03.png)

GDP.pdf 使用包含表格、图表、示意图和细节文字的复杂文档，模拟金融、医疗、法律等专业领域的问题。官方表示 Sol 在各档受测推理设置下得分高于带回退机制的 Opus 5.5，且单任务成本不到其一半。实际部署还要检查来源引用、数字抄录、表格解析和拒答质量，单看最终答案正确率不够。

![AutomationBench 多步骤业务流程评测：模型得分与任务成本](/docs/blog/zh/gpt-6-1-sol-benchmarks-and-cost/img/04.png)

AutomationBench 测试销售、营销、运营、支持、财务和人力资源等流程。OpenAI 报告 Sol 在中等推理强度下比 Opus 5.5 高 2.2 个百分点，成本约为其三分之一。原材料特别说明，Claude Fable 5.1 的成本没有计入回退，而约 40% 的任务发生过回退。比较 Agent 系统时，回退、人工确认和失败重试都应纳入总账，否则低估某一方成本会扭曲结论。

### 计算机使用与科学研究

![OSWorld 2.0 计算机使用评测：部分奖励得分与单任务成本](/docs/blog/zh/gpt-6-1-sol-benchmarks-and-cost/img/05.png)

OSWorld 2.0 的离线集关注长程计算机操作。OpenAI 报告 Sol 在最高推理强度下比 GPT-6 Sol 高 7 个百分点，与 Astra 的差距在 2.1 个百分点以内，单任务成本约为 Astra 的七分之一。原文注明该结果基于 v2026.08.08 离线集上的部分奖励得分，不能直接等同于真实桌面环境中的端到端成功率。

![Terminal-Bench Science 0.1 科学工作流评测：得分与平均任务成本](/docs/blog/zh/gpt-6-1-sol-benchmarks-and-cost/img/06.png)

Terminal-Bench Science 0.1 覆盖数据分析、模拟和定理证明等科学工作流。发布材料称 Sol 在最高推理强度下得分超过 GPT-6 Sol 的两倍，平均任务成本为 5.47 美元。科学任务的成本仍会随实验次数、代码执行时长、数据规模和人工审查变化，团队应在自己的计算环境复测。

## 事实准确性与安全评估怎么看

![事实准确性评测：高难度提示中的事实错误率与单任务成本](/docs/blog/zh/gpt-6-1-sol-benchmarks-and-cost/img/07.png)

OpenAI 报告的事实错误率在超高推理强度下为 Sol 4.1%、GPT-6 Sol 4.5%、Astra 4.0%。这项测试使用的是用户曾指出早期模型有事实错误的去标识化对话，属于刻意挑选的高难度提示，不代表普通请求中的错误率。因此，这组数据更适合用于观察特定压力测试下模型间的相对变化，而不是预测真实用户每 100 次请求会遇到几次错误。

![安全评估：搜索工具故障时模型未向用户披露的比例](/docs/blog/zh/gpt-6-1-sol-benchmarks-and-cost/img/08.png)

安全评估也采用了刻意构造的困难场景。例如，在搜索工具故障时，测试模型是否会告知用户而不是猜测答案；OpenAI 报告 Sol 未披露故障的比例为 2.1%，GPT-6 Sol 为 4.9%，Astra 为 1.5%，Luna 为 28.7%。这些数字衡量的是特定评测中出现的行为，不应解读为一般使用时的失误概率或安全保证。调用外部工具的产品仍需监测工具失败、保留来源状态，并在关键信息缺失时停止给出确定答案。

## 定价、Ultrafast 与适用场景

OpenAI 公布的 GPT-6.1 Sol 标准 API 价格为每百万输入 token 2 美元、缓存输入 0.10 美元、输出 10 美元。GPT-6 Astra 对应标准价格为 10 美元、50 美元和 1 美元缓存输入；GPT-6 Luna 为 0.10 美元、0.50 美元和 0.01 美元缓存输入。实际账单还要结合输入输出比例、缓存命中、推理 token 和工具费用核算。

发布材料还介绍了 Astra Ultrafast 和 Sol Ultrafast，并称 Astra Ultrafast 最高可达标准 Astra 的 8 倍速度。速度、模型档位和 Pro 订阅权益有各自的适用范围；开发前应确认 API 文档和账号控制台显示的实时可用性，不要把订阅额度与 API 单价混为一谈。

粗略选择可以从这里开始：

- **优先测 GPT-6.1 Sol：**复杂编码、文档处理、计算机操作或多步骤流程，同时希望控制调用成本。
- **考虑 GPT-6 Astra：**任务失败代价高、难度处于能力前沿，或经自己的样本确认 Astra 的质量提升值得额外成本。
- **考虑 GPT-6 Luna：**日常、规模化且任务难度较低的工作；先确认准确率满足业务门槛。

这只是基于官方定位的起测建议，不是性能保证。GPT88 当前线路的模型可见性、价格、协议支持和限额以账号实际返回为准，见 [GPT-6.1 Sol 模型 API 文档](/models/gpt-6-1-sol/)；OpenAI 官方资料可查[模型页](https://developers.openai.com/api/docs/models/gpt-6.1-sol)、[模型选择指南](https://developers.openai.com/api/docs/guides/latest-model)和[API 更新日志](https://developers.openai.com/api/docs/changelog)。

## 怎样做一次有用的成本对比

选择一批真实、去标识化的任务，固定输入、工具和验收标准，并同时记录：

1. **成功率：**最终结果是否通过同一套测试或业务检查。
2. **返工成本：**人工审阅、修正、重试和回退次数。
3. **端到端耗时：**包括工具执行与等待，而不是只看模型首 token。
4. **完整费用：**输入、缓存、输出、推理和外部工具成本。
5. **失败边界：**工具故障、资料缺失和越权请求时，模型是否能停止或说明限制。

最后用“每个通过验收的任务成本”比较模型，而不是只用每百万 token 价格。这样才能判断 Sol 是否真的让你的工作流更划算。
