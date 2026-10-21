---
title: WorkBuddy 接入 GPT88 报错排查：401、404、模型不可用与工具调用失败
description: 排查 WorkBuddy 自定义 GPT88 API 常见问题：Base URL 路径重复、API Key 错误、模型 ID 不可用、工具调用失败与额度不足，并用最小请求定位故障层。
date: 2026-10-21
category: AI工具
tags: [WorkBuddy报错, GPT88接入问题, WorkBuddy自定义模型, API排错, 401, 404, 工具调用]
readTime: 7
relatedPath: /docs/blog/workbuddy-connect-gpt88-guide/
relatedTitle: WorkBuddy 接入 GPT88 完整教程
---

WorkBuddy 接入 GPT88 后出现“请求失败”，原因通常不是模型本身，而是 API 地址拼接、Key、模型 ID、账户余额或能力兼容性其中一项没有对上。排查时先缩小变量：用同一个模型 ID 和 API Key 发出一条最小文本请求，再逐层检查 WorkBuddy 设置。

本文适用于通过 **WorkBuddy 自定义 API / Custom** 配置 GPT88 的场景。GPT88 API 提供 OpenAI 兼容的 Chat Completions 接口；WorkBuddy 的标准自定义协议会自动补全 `/chat/completions`。界面字段或版本不同，可能需要按实际 endpoint 规则调整。

## 按错误现象快速定位

| 现象 | 优先检查 |
| --- | --- |
| 401 / Unauthorized | 是否使用 GPT88 API Key；Key 是否粘贴完整、仍有效 |
| 404 / Not Found | Base URL 是否重复包含 `/v1` 或 `/chat/completions`；是否误开自定义协议 |
| model not found / 模型不可用 | 模型 ID 是否从当前 Key 的模型列表复制；该模型是否有权限 |
| 余额或额度错误 | 查看 GPT88 控制台余额、Key 所属分组和调用记录 |
| 普通聊天可以，Agent 工具失败 | 确认该模型是否支持工具调用，并检查 WorkBuddy 的能力标记 |
| 图片任务失败 | 单独核对模型和接口是否支持图片输入，不能只看文本请求结果 |

状态码和错误文本会因客户端与服务端返回格式有所区别。保留完整错误体、时间、模型 ID 和请求 ID（若有），再对应下方步骤检查。

## 1. 401：确认密钥类型和内容

WorkBuddy 的 API Key 字段应填写在 GPT88 控制台创建的推理 API Key。GPT88 登录密码、浏览器 Cookie、登录态令牌和设备授权码都不是 API Key。

重新粘贴前，先检查是否带入多余空格或换行。不要把密钥附在公开的日志、截图、issue 或聊天内容中。如果怀疑密钥已经泄露，应在控制台撤销旧 Key 并创建新 Key。

## 2. 404：检查 endpoint 有没有被重复拼接

标准 OpenAI 兼容 Base URL 通常填写：

```text
https://api.gpt88.cc/v1
```

WorkBuddy 默认标准协议会补充：

```text
/chat/completions
```

因此，避免把完整的 `https://api.gpt88.cc/v1/chat/completions` 填入 Base URL 后又让客户端自动补全一次。若错误 URL 出现 `/v1/v1/` 或 `/chat/completions/chat/completions`，回到 WorkBuddy 设置移除重复路径。

只有接入端点确实使用非标准路径时才启用 WorkBuddy 的自定义协议选项。它会改变路径校验和补全方式；启用后必须填写服务端要求的完整 URL。

## 3. 模型不可用：重新从当前列表发现 ID

旧教程中的模型名、界面展示名和 API 的 `model` ID 可能不一样。用同一把 Key 查询 GPT88 当前模型列表，并复制返回中的 `data[].id`：

```bash
export GPT88_API_KEY="YOUR_GPT88_API_KEY"
curl --fail-with-body \
  "https://api.gpt88.cc/v1/models" \
  -H "Authorization: Bearer $GPT88_API_KEY"
```

如果目标模型不在返回列表中，先确认 Key、账号权限和模型分组，不要靠猜测给模型名前缀。列表可见也不代表目标模型一定支持工具调用、视觉输入或其他高级能力。

## 4. 用最小请求区分网关问题和客户端问题

用从模型列表复制的真实 ID 发出最小请求：

```bash
curl --fail-with-body \
  "https://api.gpt88.cc/v1/chat/completions" \
  -H "Authorization: Bearer $GPT88_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "REPLACE_WITH_MODEL_ID",
    "messages": [{"role": "user", "content": "请只回复：OK"}]
  }'
```

如果这条请求失败，先依据返回的 HTTP 状态码、错误体和控制台用量排查 API Key、模型、分组、额度或网络。如果终端请求成功但 WorkBuddy 失败，重点检查 WorkBuddy 的 URL 拼接方式、自定义协议开关、模型记录和本地应用版本。

如果测试产生了扣费，避免重复发送长上下文请求。先核对 GPT88 账户用量及该模型当前计费规则。

## 5. 普通对话成功但工具调用失败

普通文字回复只验证了基础请求链路。WorkBuddy 的 Agent 任务可能需要模型返回兼容的工具调用结构；并不是所有模型或线路都支持这项能力。建议：

1. 在 WorkBuddy 模型设置中查看或开启正确的工具调用能力标记（如果界面提供此选项）。
2. 查看 GPT88 对应模型说明，确认它支持 Chat Completions 的 tool/function calling。
3. 用一个风险低、结果清楚的工具任务单独验证。
4. 若仍失败，改用已验证支持工具调用的模型，并保留失败请求的错误信息。

不要只根据模型名称、厂商或某次文本回复来推断 Agent 兼容性。

## 6. 图片输入或其他多模态请求失败

先确认模型本身和当前接入端点支持相应模态，再检查 WorkBuddy 选择的模型及图片输入标记。即使模型在文本对话可用，也不代表对应 GPT88 路由、账号权限和 WorkBuddy 配置支持图片、音频或视频。每种能力都应该用单独的最小样例验证。

## 建议收集的排障信息

提交服务支持请求前，可以准备：发生时间及时区、WorkBuddy 版本、模型 ID、HTTP 状态码、脱敏后的错误体、请求 ID、重现步骤，以及 GPT88 控制台是否出现相应请求记录。不要提供 API Key、完整敏感提示词或包含个人信息的文件。

## 官方资料

- [腾讯云 WorkBuddy 模型配置说明](https://cloud.tencent.cn/document/product/1831/134445)：标准路径、自定义协议与第三方模型数据流说明。
- [GPT88 聊天补全 API](/docs/api/chat-completions/)和[模型列表 API](/docs/api/list-models/)：检查路径、请求格式和当前模型 ID。
- [WorkBuddy 接入 GPT88 完整教程](/docs/blog/workbuddy-connect-gpt88-guide/)：从创建 API Key 到首条对话的配置步骤。
