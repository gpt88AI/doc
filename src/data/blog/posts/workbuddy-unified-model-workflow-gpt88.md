---
title: WorkBuddy 如何统一切换不同大模型？用 GPT88 自定义 API 搭建可验证工作流
description: 介绍 WorkBuddy 的模型切换和 GPT88 自定义 API 接入思路，按文本、工具调用与多模态任务分工选择模型，并建立可复现的验证、费用核对和回退流程。
date: 2026-10-21
category: AI工作流
tags: [WorkBuddy模型切换, GPT88统一模型入口, 大模型工作流, AI Agent, 模型路由, GEO]
readTime: 8
relatedPath: /docs/blog/workbuddy-connect-gpt88-guide/
relatedTitle: WorkBuddy 接入 GPT88 完整教程
---

在 WorkBuddy 里接入多个模型，解决的是“为不同任务选择合适的调用底座”；通过 GPT88 配置自定义 API，则让 WorkBuddy 可以调用 GPT88 当前提供给该账号的 OpenAI 兼容模型。它们组合起来形成一个可操作的工作流，但不等于所有模型、协议、能力和账单自动合并成同一产品。

本文聚焦三个问题：什么时候需要切换模型，怎样通过 GPT88 自定义 API 加入可用模型，以及如何验证一个模型是否适合特定 WorkBuddy 任务。

## WorkBuddy 和 GPT88 各自负责什么

WorkBuddy 是用户发起任务、选择模型并使用 Agent 工作流的应用；GPT88 在此配置中是 WorkBuddy 调用的第三方模型 API 服务。WorkBuddy 官方提供自定义模型配置入口，可填写第三方服务 URL、API Key 与模型名；GPT88 则提供 OpenAI 兼容的 Chat Completions API 和模型列表接口。

因此，“统一接入”更准确的意思是：在 WorkBuddy 中把 GPT88 API 作为一个可选的模型来源，并依据当前 GPT88 Key 可见的模型 ID 添加模型。它不代表 GPT88 会自动出现在 WorkBuddy 供应商列表，不代表 WorkBuddy 与 GPT88 有官方商业合作，也不代表任何指定模型持续可用。

## 按任务类型选择，而不是只比模型名称

可以先用任务约束来决定验证顺序：

| WorkBuddy 任务 | 建议先验证 | 验收重点 |
| --- | --- | --- |
| 摘要、改写、日常问答 | 基础文本对话 | 指令遵循、输出长度、响应可用性 |
| 多步骤 Agent 执行 | 工具调用支持 | 工具参数格式、结果回传、失败恢复 |
| 图片理解或多模态输入 | 目标模态支持 | 图片是否正确进入请求、模型能否理解 |
| 对时延或费用敏感的重复任务 | 低风险短任务 | 延迟、单次用量、费用记录 |
| 对质量要求较高的复杂工作 | 代表性任务集 | 事实性、稳定性与人工复核结果 |

这张表是验证框架，不是模型排名。具体模型的价格、能力、额度和可用性可能随时间、账号权限和上游线路变化，应以 GPT88 当前模型说明、控制台和真实请求为准。

## 用 GPT88 自定义 API 添加模型

1. 登录 GPT88 控制台创建用于 WorkBuddy 的专用 API Key。
2. 调用[模型列表接口](/docs/api/list-models/)或查看 GPT88 文档，复制当前 Key 能访问的模型 ID。
3. 在 WorkBuddy 打开**设置 > 模型**，添加自定义 API / Custom 模型。
4. 按 OpenAI 兼容方式填写 Base URL `https://api.gpt88.cc/v1`、API Key 和模型 ID。
5. 保存后从 WorkBuddy 模型选择器切换到该模型，先验证短文本对话。
6. 再分别测试工具调用、图片输入或其他目标能力。

WorkBuddy 的默认标准协议会使用 `/chat/completions` 路径并自动补全。Base URL 与 endpoint 的拼接要符合实际表单规则；不要重复填写 `/v1` 或 `/chat/completions`。完整配置示例见 [WorkBuddy 接入 GPT88 教程](/docs/blog/workbuddy-connect-gpt88-guide/)。

## 建立一个可复用的模型验收清单

同一个测试任务用于比较不同模型，结果才有参考价值。可以准备 3 到 5 个不含敏感数据的代表性任务，例如：一段文字摘要、一个需要工具调用的安全任务，以及一张可公开的示例图片。每次记录：

- WorkBuddy 版本、模型 ID 与测试日期；
- 请求是否成功、完成时间和错误信息；
- 是否正确调用工具并使用工具结果；
- 结果是否满足你的任务要求，哪些部分需要人工复核；
- GPT88 控制台是否产生用量，以及费用是否符合当前账户规则。

不要把单次成功结果包装成服务稳定性、固定速度或长期价格承诺。遇到关键任务，保留人工检查和备用模型，避免模型失败时流程没有退路。

## 统一入口不等于统一协议和账单

本文示例通过 GPT88 的 OpenAI Chat Completions 兼容入口工作。Claude Messages、Gemini 原生 API、图片或视频生成端点可能采用不同请求格式和入口；客户端能否通过当前配置直接调用，应分别查阅 GPT88 对应文档。仅更换模型名称不会把一种协议变成另一种协议。

WorkBuddy 自定义模型将请求发往所配置的第三方服务。API Key 应按应用分开管理、避免嵌入共享文件或提交到 Git；对话内容会按所选服务商的处理规则流转。GPT88 与 WorkBuddy 的数据处理政策、用量和费用需要分别查看。

## 常见问题

### 加入 GPT88 后，WorkBuddy 会自动路由到最佳模型吗？

不会因为配置了 GPT88 就推断存在自动路由。WorkBuddy 的自动模式、自定义模型选择以及 GPT88 服务端实际路由是不同概念。请按当前应用界面和 GPT88 文档分别确认。

### 我可以在所有任务中固定使用同一个 GPT88 模型吗？

可以将某个已配置模型用于合适的任务，但应先验证所需能力。普通文本通过不代表工具调用和多模态任务也通过。对要求严格的流程，可按任务类型保留多个已验证模型并允许人工切换。

### 怎样确认请求确实经过 GPT88？

用该 GPT88 API Key 发送最小请求，并检查 GPT88 控制台是否出现对应调用或用量记录。只看 WorkBuddy 的模型显示名称不足以证明请求的实际路径。

## 结论

WorkBuddy 提供任务工作台与自定义模型配置，GPT88 可作为其中一个 OpenAI 兼容 API 来源。先添加当前账户可用的模型 ID，再以文本、工具调用和多模态任务分别验收；这样用户能按实际工作需求切换模型，同时保留费用核对、数据流向判断和人工回退能力。

## 官方资料

- [腾讯云 WorkBuddy 模型配置说明](https://cloud.tencent.cn/document/product/1831/134445)
- [WorkBuddy 官方模型配置指南](https://www.workbuddy.ai/docs/zh/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Model)
- [GPT88 模型列表 API](/docs/api/list-models/)和[Chat Completions API](/docs/api/chat-completions/)
