---
title: WorkBuddy 接入 GPT88 完整教程：自定义 API 配置与模型验证
description: 通过 WorkBuddy 自定义模型接入 GPT88 统一大模型入口，配置 API Base URL、API Key 与模型 ID，并用实际请求验证连通、工具调用和费用边界。
date: 2026-10-21
category: AI工具
tags: [WorkBuddy, GPT88, WorkBuddy接入GPT88, 自定义模型, OpenAI兼容API, 大模型统一接入]
readTime: 8
relatedPath: /docs/integrations/
relatedTitle: GPT88 集成指南
---

想在 WorkBuddy 里使用 GPT88 上可用的大模型，可以通过 WorkBuddy 的**自定义 API / Custom**选项配置 GPT88 的 OpenAI 兼容接口。整个过程需要三项信息：GPT88 API Key、API Base URL，以及当前账号可调用的模型 ID。

先说明边界：这是通过 WorkBuddy 的自定义模型能力接入第三方 API，不代表 WorkBuddy 内置了 GPT88 连接器，也不代表每个上游模型都支持 WorkBuddy 的全部 Agent 功能。模型是否支持工具调用、图片输入、推理参数和流式输出，需要逐项验证。

## 配置前准备

在 GPT88 控制台创建 API Key，并从 [GPT88 模型列表 API 文档](/docs/api/list-models/)确认当前账号可见的模型 ID。模型目录、账号权限和上游状态可能变化，避免照抄旧文章或截图中的模型名。

常用配置值如下：

| WorkBuddy 字段 | 填写内容 |
| --- | --- |
| Provider / 接入方式 | 自定义 API / Custom，或 OpenAI 兼容提供商 |
| Base URL / URL | `https://api.gpt88.cc/v1` |
| API Key | 在 GPT88 控制台创建的 API Key |
| Model / 模型名 | 从 `GET /v1/models` 返回结果中复制 `data[].id` |
| 协议 | OpenAI Chat Completions 兼容 |

WorkBuddy 的默认自定义协议使用标准 `/chat/completions` 路径并自动补全路径。因此 Base URL 填到 `/v1` 即可，不要把完整的 `/chat/completions` 再重复拼进 Base URL。只有服务商明确要求非标准 endpoint 时，才考虑 WorkBuddy 的自定义协议开关。

## 在 WorkBuddy 中添加 GPT88

1. 打开 WorkBuddy，进入头像菜单中的**设置 > 模型**。
2. 选择添加自定义模型，提供商选择 Custom 或 OpenAI 兼容方式。
3. 填入 `https://api.gpt88.cc/v1`、GPT88 API Key 和上一步确认的模型 ID。
4. 保存后回到对话界面，在模型选择器中切换到刚添加的模型。
5. 先发送一条短文本任务，确认能收到回复，再尝试工具调用等复杂任务。

WorkBuddy 的不同版本或账号可能显示略有差异的字段名称。若使用标准 OpenAI 兼容模式，不要开启自定义协议来绕过路径补全；如果客户端已经把 `/chat/completions` 包含在 URL 中，再同时自动补全则可能造成重复路径。

## 先验证模型 ID 和 API Key

如需先从终端检查模型目录，可以使用环境变量，避免把真实密钥写进命令正文：

```bash
export GPT88_API_KEY="YOUR_GPT88_API_KEY"
curl --fail-with-body \
  "https://api.gpt88.cc/v1/models" \
  -H "Authorization: Bearer $GPT88_API_KEY"
```

在返回 JSON 中选择一个 `data[].id`。列表中出现模型只说明当前 Key 能发现该模型，并不保证该模型支持 WorkBuddy 所需的工具调用或多模态能力。

如果 WorkBuddy 保存配置后仍无法完成对话，可以用最小请求区分 API 配置问题和 WorkBuddy 本地设置问题：

```bash
curl --fail-with-body \
  "https://api.gpt88.cc/v1/chat/completions" \
  -H "Authorization: Bearer $GPT88_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "REPLACE_WITH_MODEL_ID",
    "messages": [{"role": "user", "content": "请只回复：连接成功"}]
  }'
```

把 `REPLACE_WITH_MODEL_ID` 换成真实模型 ID。不要把真实 API Key 粘贴到工单、截图、共享配置或命令历史中。GPT88 API 的协议和请求格式可参考[聊天补全 API 文档](/docs/api/chat-completions/)。

## 配好后要验收什么

普通文本对话成功之后，再按真实使用场景验证：

- 让模型执行一个需要调用工具的简单任务，确认 WorkBuddy 能发起工具调用并继续处理工具结果。
- 如果需要图片输入，使用无敏感信息的图片单独检查视觉能力。
- 观察错误提示、响应时间和 GPT88 控制台的用量记录，确认测试调用符合预期。
- 在模型不可用或额度不足时确认 WorkBuddy 如何反馈，并准备切回另一个可用模型。

不要仅凭模型名称推断能力。不同上游模型、接口兼容层和 WorkBuddy 版本可能带来差异；涉及工具调用、图片、结构化输出等场景时，应在投入日常工作前做小范围验收。

## 常见问题

### Base URL 应该填 `https://api.gpt88.cc` 还是带 `/v1`？

对按 OpenAI SDK 约定填写 Base URL 的配置，使用 `https://api.gpt88.cc/v1`。WorkBuddy 自定义协议默认会按标准路径补全 `/chat/completions`。如果所选提供商预设已经自动生成 endpoint，则按该界面的字段提示配置并实际验证，避免重复添加 `/v1` 或 `/chat/completions`。

### GPT88 的 API Key 和网页登录密码是同一个东西吗？

不是。WorkBuddy 中应填写 GPT88 控制台创建的推理 API Key。不要填写网页登录密码、Cookie、登录令牌或其他账号凭据。

### 能不能说“所有 GPT88 模型都兼容 WorkBuddy”？

不能仅凭统一 API 地址作出这个结论。文本对话是否成功、工具调用是否可用、图片输入是否可用都需要分别验证；不支持的模型功能不会因更换 Base URL 自动获得。

## 费用和数据流向

通过自定义模型发出的请求会由 WorkBuddy 转发至所配置的第三方模型服务。WorkBuddy 官方文档说明，自定义 API 参数在本地保存；请求内容由所配置的第三方模型处理。请分别阅读 WorkBuddy 与 GPT88 的服务条款和隐私政策，并确认你的数据类型适合发送到该模型服务。GPT88 侧费用、可用模型和账户权限以控制台及对应模型说明为准。

## 官方资料

- [腾讯云 WorkBuddy 模型配置说明](https://cloud.tencent.cn/document/product/1831/134445)：自定义模型入口、标准 Chat Completions 路径和数据流向说明。
- [WorkBuddy 官方模型配置指南](https://www.workbuddy.ai/docs/zh/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Model)：图形界面自定义模型操作。
- [GPT88 模型列表 API](/docs/api/list-models/)与[聊天补全 API](/docs/api/chat-completions/)：确认模型 ID 和请求格式。
