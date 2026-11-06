---
title: ChatGPT 提示 Selected model is at capacity 怎么办：先辨别容量、账号与工作区限制
description: 整理“Selected model is at capacity”报错的排查顺序，区分模型临时不可用、状态事故、工作区权限、用量限制和账号安全提醒，核对原文所称的“等 3 小时解除”与申诉模板是否有官方依据。
date: 2026-11-06
category: AI工具指南
tags: [ChatGPT, OpenAI, at capacity, 模型不可用, 故障排查, 账号安全]
readTime: 10
relatedPath: /docs/blog/chatgpt-free-image-generation-limit-complete-guide/
relatedTitle: ChatGPT 图片生成达到限制怎么办
---

使用 ChatGPT 时看到 **“Selected model is at capacity. Please try a different model.”**，通常表示当前选择的模型暂时不可用。第一步是按提示稍后再试或选择另一个当前可用模型，并查看 [OpenAI 状态页](https://status.openai.com/)。如果只有某个工作区或账号持续受限，再核对工作区权限、产品内显示的用量限制和账号安全提醒，必要时联系 OpenAI 支持。

本文整理自 [知乎 AI 文章《ChatGPT 提示 Selected model is at capacity？官方承认的限制问题，两招解决》](https://zhihuiai.app/blog/chatgpt-model-at-capacity-fix)。原文记录了用户反复遇到容量提示的现象，并提出改密码、启用双重认证、退出所有设备、等待 3 小时，以及联系支持提交一段申诉话术等做法。需要注意：原文中“OpenAI 对账号加了容量标记”“与充值渠道无关”“等 3 小时多数可解除”等说法，不能仅凭个案当作确定的官方原因或恢复承诺。OpenAI 的模型访问排查文档将容量提示描述为模型暂时不可用，建议稍后重试、切换模型并检查服务状态；它也列出工作区权限、用量限制和账号安全等其他可能因素。[OpenAI：Troubleshooting model feature access](https://help.openai.com/en/articles/10258669-troubleshooting-model-feature-access)

## 先按提示分流

| 现象 | 优先判断 | 建议动作 |
| --- | --- | --- |
| 只有一个模型显示 at capacity | 该模型暂时不可用或正在经历容量压力 | 先等待几分钟，或临时选择另一个可用模型 |
| 多个模型同时不可用，或多人同时复现 | 可能是服务侧问题，也可能是工作区或账号限制 | 查看状态页；记录时间、模型和错误提示 |
| 只在公司或团队工作区无法使用 | 工作区管理员设置、角色或模型权限 | 检查工作区设置，向管理员确认权限 |
| 模型显示但变灰，伴随用量提示 | 可能是具体模型或功能的使用限制 | 按产品提示查看限制和可用时间，不套用其他模型的额度 |
| 出现可疑登录或账号安全提醒 | 账号安全问题需要单独处理 | 查看安全历史和活动会话；有异常时保护账号并联系支持 |
| 程序请求返回 HTTP 429 | API 项目的速率、用量或账单限制 | 查看 API 错误正文、响应头、项目和 Limits 页面 |

同一个“不能继续使用”的体验，可能来自不同层面。浏览器界面的容量提示不是 API 429；API 项目限制也不由 ChatGPT 网页套餐自动决定。先确认错误发生在 ChatGPT、Codex、团队工作区还是 API，再采取对应动作。

## 推荐排查顺序

### 1. 先读完整错误并保存当前工作

记录错误原文、发生时间和时区、所选模型、使用的平台（网页、桌面端、Codex 或 API）以及是否只影响一个工作区。保存当前对话里尚未导出的重要内容，再进行切换或重试，避免排查过程中丢失工作。

不要连续点发送或同时更改多项设置。重复请求不会解释限制来自模型容量、工作区权限、用量规则还是账号安全，也会让复现时间线变得不清楚。

### 2. 做一次低干扰对照

若产品提供其他可用模型，可以临时选用一个模型发送简短、正常的请求；过几分钟后再单独测试原模型。记录每次结果：

- 其他模型可用、原模型仍不可用：更像是单个模型可用性或容量问题；
- 同一工作区里的模型都不可用：继续查工作区权限、用量提示和服务状态；
- 同账号在不同工作区表现不同：优先核对工作区配置与账号上下文。

这是定位线索，不是对后台原因的最终证明。不要仅凭一次对照就断言账号被标记或服务端有事故。

### 3. 查看 OpenAI 状态页

到 [OpenAI Status](https://status.openai.com/) 查看 ChatGPT、Codex 或相关服务是否有正在处理的事件。状态页没有列出事故，也不代表每个模型、地区或账号都完全正常；状态页有事件，则先等官方更新，再进行少量复测。

容量提示本身并不说明一定存在全站故障。反过来，即便状态页没有事故，也不能仅凭这一点认定是用户账号的问题。

### 4. 检查工作区与用量提示

在 Business、Enterprise、Edu 或其他受管理的工作区中，模型可用性可能受到管理员设置和角色权限影响。若模型对同事可用、对你不可用，或仅在某个工作区复现，请管理员核对模型访问权限和角色控制。

如果界面给出明确的使用限制或可用时间，以当前产品提示为准。不要把其他模型、旧文章、不同套餐或 API 项目的数字套到当前错误上。

### 5. 只有出现账号安全信号时，才执行账号安全操作

原文建议所有遇到 at capacity 的用户都改密码、开启双重认证、退出全部设备并等待 3 小时。这些操作的影响不一样，不能把它们作为无条件的“容量修复按钮”。OpenAI 的模型访问排查页确实把重新保护账号、重置密码、启用双重认证和稍后再试列为持续受限时的排查步骤之一；但这不等于官方确认所有 at capacity 提示都是账号标记，也没有给出固定等待 3 小时即可恢复的保证。

如果你发现陌生登录、密码泄露或共享账号等迹象，应按 OpenAI 的安全建议处理：使用密码登录的账号在凭证暴露或被复用时更改密码，检查安全历史，结束不认识的会话，并联系支持。启用 MFA 是加强账号保护的措施，不是模型容量恢复的保证；退出所有设备也会结束你自己的当前会话。具体步骤见 [Keeping your OpenAI account secure](https://help.openai.com/en/articles/8304786-keeping-your-openai-account-secure) 和 [Managing active sessions in ChatGPT](https://help.openai.com/en/articles/20001257-managing-active-sessions-in-chatgpt/)。

如果没有任何安全提醒或异常登录，单纯看到模型容量提示时，不要为了“触发重置”而更改密码或退出所有设备。官方帮助页面没有承诺这些动作后等待固定 3 小时就一定恢复。

## 关于“官方申诉话术”

如果按官方建议等待、切换可用模型、核对工作区和用量后，模型访问仍持续异常，可以通过 [OpenAI Help Center](https://help.openai.com/) 联系支持，提供可复现的事实。原文提供的英文话术要求客服按下一个所谓“back to normal effort/model”按钮，但没有证据表明这是 OpenAI 面向用户的标准处理选项。建议描述实际问题，不把未确认的后台机制写成既定事实，也不要把账号密码、验证码或 API Key 放进申诉内容。

可准备一份简短记录：

```text
问题提示：Selected model is at capacity. Please try a different model.
首次出现时间与时区：
平台与应用版本：
受影响模型：
其他可用模型及测试结果：
工作区类型及是否仅在某一工作区复现：
OpenAI Status 页面检查时间与结果：
截图或 request ID（如界面提供）：
```

通过官方支持入口提交即可。不要公开账号凭证、完整私密对话、客户数据或不必要的账单信息。

## 如果问题发生在 API

API 请求返回 429 时，要按开发者路线排查：保留状态码、错误正文和响应头，核对调用的模型、项目、组织、用量层级、计费状态、并发和请求频率，再根据返回的限制信号实现限流、队列和退避。不要将 ChatGPT Plus 或 Pro 订阅当成 API 项目额度的证明。

如果 API 不是 429，而是连接超时、服务错误或其他状态码，也不要把它统一归类为“模型容量”。应按实际响应类型和对应状态信息继续诊断。

## 结论

遇到 “Selected model is at capacity”，先稍后重试或切换另一个可用模型，同时查看 OpenAI 状态页。持续受限时，再核对工作区权限、具体用量提示和账号安全信号；如果问题仍可复现，通过 OpenAI 官方支持渠道提交时间、模型和测试结果。

把账号安全措施用于真实的安全风险，把容量问题交给可用性与状态排查。不要把个案中的“改密码、退出设备、等 3 小时”当成对所有用户都有效的恢复方案，也不要把未经证实的账号标记解释当成官方结论。

## 参考资料

- [知乎 AI：ChatGPT 提示 “Selected model is at capacity”？](https://zhihuiai.app/blog/chatgpt-model-at-capacity-fix)
- [OpenAI：Troubleshooting model feature access](https://help.openai.com/en/articles/10258669-troubleshooting-model-feature-access)
- [OpenAI：Keeping your OpenAI account secure](https://help.openai.com/en/articles/8304786-keeping-your-openai-account-secure)
- [OpenAI：Managing active sessions in ChatGPT](https://help.openai.com/en/articles/20001257-managing-active-sessions-in-chatgpt/)
- [OpenAI Status](https://status.openai.com/)
