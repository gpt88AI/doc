---
title: OpenAI DevDay 2026：Dots、GPT-6.1 Sol 与面向 Agent 的产品栈
description: 根据数字生命卡兹克的现场长文，梳理 OpenAI DevDay 2026 的个人 Agent、ChatGPT Space、GPT-6.1 Sol、Decisions API、Codex Cloud、Pro 订阅与应用生态更新，并区分官方定位和作者报告。
date: 2026-09-30
category: OpenAI 产品观察
tags: [OpenAI DevDay 2026, Dots, GPT-6.1 Sol, ChatGPT Space, Codex Cloud, Decisions API, Agent]
readTime: 16
relatedPath: /models/gpt-6-1-sol/
relatedTitle: GPT-6.1 Sol 模型 API 文档
---

> 来源：[数字生命卡兹克的 X 原帖](https://x.com/Khazix0918/status/2105085705496195252)及其[DevDay 2026 长文](https://x.com/i/article/2105083431558488064)，发布于 2026 年 9 月 30 日。本文是结构化整理和编辑分析，不是 OpenAI 官方发布稿，也不是逐字稿。涉及价格、订阅额度、跑分和现场演示的数据均保留原作者的报告口径；除了 GPT-6.1 Sol 的产品定位外，本文不把这些数字描述为独立验证结果。

![数字生命卡兹克发布的 OpenAI DevDay 2026 长文封面](/docs/blog/zh/openai-devday-2026-summary/img/cover.jpg)

OpenAI DevDay 2026 的发布内容并不只是一款新模型。数字生命卡兹克的现场整理涉及个人 Agent、协作工作空间、GPT-6.1 Sol、结构化决策、Codex 云端开发、ChatGPT 订阅和应用分发。把这些项目放在一起看，主线是把模型嵌进持续运行的工作环境，再延伸到开发者工具和企业软件采购。

## 发布内容速览

| 主题 | 作者整理的发布内容 | 对开发者的意义 |
| --- | --- | --- |
| 个人 Agent | Dots 与企业版 Specialist Dots | Agent 从对话框走向持续运行、使用浏览器与执行环境的个人或组织代理 |
| 协作空间 | ChatGPT Space | 人和 Agent 在同一份文档、数据、原型和工作流中协作 |
| 模型与决策 | GPT-6.1 Sol、Decisions API | 一条面向复杂工作的模型路线，以及面向有限候选项的结构化决策接口 |
| 开发者工具 | Codex Cloud、Codex Security、Agents API、Codex CLI | 云端环境复用、安全扫描和 Computer Use 等能力进入已有工作流 |
| 订阅与分发 | Pro 订阅方案、ChatGPT 登录、嵌入式 Apps、Marketplace | OpenAI 正把身份、套餐和分发渠道扩展到第三方软件 |

这张表概括的是原作者对发布会的整理。不同地区、账号和产品版本的开放范围可能不同，实际功能、订阅权益和接口支持应以 OpenAI 当前产品界面与官方文档为准。

## Dots：持续运行的个人 Agent

原文把 Dots 概括为 OpenAI 的个人 Agent：它可以在云端持续工作，使用自己的浏览器和执行环境，操作网页或代码工具，并连接 ChatGPT 中已经授权的应用。作者还提到，用户可选择连接自己的电脑，让 Agent 在本地工作环境中协作；短信和电话则被描述为后续入口。

这个产品方向的变化，在于从“用户发一句话，模型回一段话”转为一个能保存工作状态、在需要时继续执行任务的 Agent。真正的工程难题也随之改变：开发者不仅要关心模型质量，还要处理长时间运行、授权范围、可中断性、任务记录和错误恢复。

![原文配图 01](/docs/blog/zh/openai-devday-2026-summary/img/01.jpg)

作者将 Dots 与 OpenClaw、Grok Bot、Muse 等个人 Agent 放在一起比较，并特别强调每个 Dot 有独立云电脑、浏览器和执行环境。这个类比便于理解产品形态，但不代表这些产品在权限模型、运行隔离或执行能力上相同。

![原文配图 02](/docs/blog/zh/openai-devday-2026-summary/img/02.jpg)

![原文配图 03](/docs/blog/zh/openai-devday-2026-summary/img/03.jpg)

原文还提到企业版 Specialist Dots：企业可围绕财务、营销或法务等职能配置 Agent，并向其提供目标、上下文和反馈。若这类能力进入实际工作流，企业需要先明确可访问的数据、可执行的操作以及哪些决策必须由员工确认。

![原文配图 04](/docs/blog/zh/openai-devday-2026-summary/img/04.jpg)

![原文配图 05](/docs/blog/zh/openai-devday-2026-summary/img/05.jpg)

作者记录的首批开放对象包括 ChatGPT Pro、Business Premium 和 Enterprise 用户；套餐包含一个 Dot，更多 Agent 或更高工作量可能采用额外付费方案。具体资格、地域和权益需要在当前账号中核验。

![原文配图 06](/docs/blog/zh/openai-devday-2026-summary/img/06.jpg)

原文还以 dot.com 域名的归属作了轻松的现场观察。这是作者对发布会的评论，并不影响 Dots 的技术能力判断。

![原文配图 07](/docs/blog/zh/openai-devday-2026-summary/img/07.jpg)

## ChatGPT Space：人和 Agent 共用工作空间

作者把 ChatGPT Space 描述为面向人和 Agent 的协作工作区：在同一个空间里写文档、做计划和研究、生成图片、分析数据、制作图表与原型，并让同事和 Agent 共同参与。演示中的例子包括把用户反馈转成图表，以及定期读取 Slack 频道并更新页面。

![原文配图 08](/docs/blog/zh/openai-devday-2026-summary/img/08.jpg)

如果 Agent 能直接读写工作空间中的文件和页面，产品边界就从“聊天记录”转向可持续更新的项目状态。对应用开发者来说，关键问题会变成：哪些内容是共享的、修改如何追踪、Agent 的写入能否撤销，以及人和 Agent 同时编辑时如何处理冲突。

作者称演示还展示了按小时更新的动态图表，并预告把演示文稿加入 Space，让 Slides 更容易被 Agent 读取和修改。后续能力是否上线、是否适用于所有计划，仍应以 OpenAI 的正式说明为准。

## GPT-6.1 Sol：能力与成本的权衡

原文把 GPT-6.1 Sol 视作 GPT-6 Sol 发布后快速推出的迭代，并强调它试图在接近 Astra 的能力水平下降低成本。OpenAI 的[官方模型页](https://developers.openai.com/api/docs/models/gpt-6.1-sol)将其定位为面向复杂工作的模型，描述为在更低成本下提供接近 Astra 的表现。官方文档支持这一总体定位，但不能据此推导 GPT88 每条线路的实际费用或任务表现。

作者报告了几组对比数据：DeepSWE v1.1 上比 GPT-6 Sol 高 6.4 个百分点，OSWorld 2.0 上高 7 个百分点；与 Astra 的差距约为 2.1 个百分点，并估算任务成本约为 Astra 的七分之一。原文没有给出足以复现这些对比的样本、提示词、计分细节或成本计算边界，因此这些数字应视为作者的发布会整理口径，而不是独立基准结论。

![原文配图 09](/docs/blog/zh/openai-devday-2026-summary/img/09.jpg)

官方模型文档指出，缓存输入 token 的定价为未缓存输入 token 价格的 5%，而缓存写入按未缓存输入价格的 1.25 倍计费。缓存能否降低真实账单，取决于提示前缀复用、缓存命中率、请求长度和实际价格；比较时应使用自己的工作负载，而不是只看模型名称或单一 benchmark。

如果通过 GPT88 接入，应先调用 `GET /v1/models` 确认当前 API Key 是否开放 `gpt-6.1-sol`，再用固定样本比较成功率、质量、延迟和实际费用。GPT88 的模型页见：[GPT-6.1 Sol API 文档](/models/gpt-6-1-sol/)。

## Pro 订阅：倍率不等于可用工作量

原文称发布了每月 500 美元的 Pro 方案，并重新开放 200 美元 Pro；作者将 200 美元方案描述为 10 倍额度、500 美元方案为 25 倍额度，并提到 Ultra Fast 可显著提高速度，同时消耗更多额度。这些数字是作者对发布会和套餐的整理，不应被理解为 API 预算、固定 token 数或每位用户都可获得的相同任务量。

作者也分享了自己同时使用 Claude 与 Codex 完成 AIHOT 重构的额度体验。这个案例说明订阅成本与 API 单价并不能直接互换：任务拆分方式、上下文长度、工具调用、缓存命中和个人使用强度都会改变消耗。做采购决策时，应记录真实任务量和消耗，并以账号页面展示的权益为准。

![原文配图 10](/docs/blog/zh/openai-devday-2026-summary/img/10.jpg)

![原文配图 11](/docs/blog/zh/openai-devday-2026-summary/img/11.jpg)

![原文配图 12](/docs/blog/zh/openai-devday-2026-summary/img/12.jpg)

## Decisions API：让模型在候选项中做选择

作者将 Decisions API 描述为面向有限选项的决策接口：调用方先给出候选项，模型负责选择、分类或路由，而不是生成长篇自由文本。文中举例包括内容审核、Agent 分流和选择下一步动作，并提到底层使用 GPT-6 Luna、响应可达亚秒级。

这类接口适用于结果空间有限、输出需要直接进入后续自动化的任务。设计时仍应提供明确的候选集合、拒绝或不确定分支、置信度门槛和人工升级路径。原文把它与 TypeSafeAI 的 Jev 作比较，这是作者对产品类别的观察；两者的协议、模型结构和适用边界不能仅凭发布会描述视为相同。

![原文配图 13](/docs/blog/zh/openai-devday-2026-summary/img/13.jpg)

![原文配图 14](/docs/blog/zh/openai-devday-2026-summary/img/14.jpg)

## Codex：从一次性云任务走向可复用环境

原文把 Codex Cloud 的更新重点放在 Reusable Environment：可以预先准备代码仓库、依赖、工具和环境变量，后续任务在独立 Workspace 中复用这套开发环境。作者还提到任务恢复窗口、不同订阅档位的机器配置，以及云端任务使用 Plugins 和 Computer Use 的变化。

可复用环境能减少重复安装和初始化，但并不自动解决环境漂移和凭据安全。团队仍应明确密钥如何注入、任务之间共享什么、运行结果如何审查，并把恢复时间和临时改动保留策略写入开发流程。文中的“最长恢复 7 天”属于作者依据当时文档的整理，具体期限以最新官方说明为准。

![原文配图 15](/docs/blog/zh/openai-devday-2026-summary/img/15.jpg)

Codex Security 本身并非原文所说的全新产品。作者指出它此前已进入预览；这次列出的变化包括自动去重、定时扫描和新的管理界面。也就是说，发布重点从一次性扫描转向持续监测与后续处理。安全 Agent 可以帮助发现问题，但修复仍应经过代码审查、测试和权限控制。

![原文配图 16](/docs/blog/zh/openai-devday-2026-summary/img/16.jpg)

![原文配图 17](/docs/blog/zh/openai-devday-2026-summary/img/17.jpg)

作者还提到 Agents API 增加 Computer Use，以及 Codex CLI 开放双向语音对话。若把 Computer Use 接进产品，应同时定义允许操作的页面、可访问的数据、确认步骤和失败后的恢复方式。

![原文配图 18](/docs/blog/zh/openai-devday-2026-summary/img/18.jpg)

## ChatGPT 生态：身份、Apps 与企业分发

### 把 ChatGPT 订阅带到合作应用

原文提到 Bring your ChatGPT subscription：参与合作的第三方应用可让用户使用 ChatGPT 账号登录，并在符合条件的情形下使用已有套餐权益。对开发者而言，这可能减少用户单独配置模型 API 的步骤；同时需要仔细核对授权范围、订阅资格、扣费责任和数据处理边界。不能把“可以登录”直接等同于“所有 API 调用都由订阅覆盖”。

![原文配图 19](/docs/blog/zh/openai-devday-2026-summary/img/19.jpg)

### Apps 开始承载完整界面

作者称 ChatGPT 与 Codex 中的 Apps 可以嵌入编辑器、Dashboard、表单和 Workspace 等交互界面，并以 Figma、Adobe 的演示作为例子。原文还描述了对话中的应用自动发现、审核进度查看和更新后沿用既有审核信息等开发者流程改进。

![原文配图 20](/docs/blog/zh/openai-devday-2026-summary/img/20.jpg)

![原文配图 21](/docs/blog/zh/openai-devday-2026-summary/img/21.jpg)

这使第三方应用不再只是模型背后的一个工具调用，而可能成为 ChatGPT 交互中的工作界面。应用团队需要让用户看清何时调用了应用、传入了哪些数据、结果会写到哪里，以及用户如何撤回授权或修改。

### OpenAI Marketplace

原文把 OpenAI Marketplace 描述为面向企业采购的 Beta 市场，首批有 30 多家合作伙伴。其设想是让企业把一部分既有采购承诺用于 Marketplace 中的第三方软件。若这一模式落地，OpenAI 不只是模型和工具平台，也在成为企业软件的分发渠道。

![原文配图 22](/docs/blog/zh/openai-devday-2026-summary/img/22.jpg)

## 作者的整体判断

文章最后的判断是：OpenAI 依然有很强的工程、产品和分发能力，但这场发布会呈现出更多跟随既有产品类别、扩展商业生态的气质。作者把 Dots、GPT-6.1 Sol、Marketplace 放在个人 Agent、模型竞赛和企业软件市场的背景下观察，并将其与 2023 年“定义新产品形态”的 OpenAI 作对比。

这属于作者的主观解读。另一种观察方式是把发布内容看作一组互相补位的产品层：模型负责推理，Dots 承担持续任务，Space 提供共享工作状态，Codex 提供开发执行环境，Apps 和 Marketplace 负责接入与分发。发布会是否真正改变了开发者工作流，还要看开放范围、接口稳定性、价格和实际使用效果。

![原文配图 23](/docs/blog/zh/openai-devday-2026-summary/img/23.jpg)

![原文配图 24](/docs/blog/zh/openai-devday-2026-summary/img/24.jpg)

![原文配图 25](/docs/blog/zh/openai-devday-2026-summary/img/25.jpg)

## 开发者可以先验证什么

1. **Agent 执行边界：**验证持久任务如何暂停、恢复和取消，并限制其可访问的文件、账户与外部工具。
2. **工作空间写入：**检查修改记录、冲突处理、版本恢复和人工审批能否满足团队流程。
3. **模型成本：**用固定样本分别测未缓存与缓存请求，统计质量、延迟、token 和工具调用总成本。
4. **订阅权益：**确认实际账号计划、额度刷新周期、快速模式消耗和可用地区，不依据媒体整理推导团队预算。
5. **应用集成：**核对登录授权、可传递的订阅权益、数据范围和撤销机制。
6. **持续安全扫描：**把告警去重、修复建议、自动修改与合并权限分开设计，并在合并前运行测试和人工复核。

## 来源与核验边界

- 原帖：[X 上的数字生命卡兹克](https://x.com/Khazix0918/status/2105085705496195252)
- 原文：[OpenAI DevDay 2026 长文](https://x.com/i/article/2105083431558488064)
- 官方资料：[GPT-6.1 Sol 模型文档](https://developers.openai.com/api/docs/models/gpt-6.1-sol)

除 GPT-6.1 Sol 的总体定位外，本文对 Dots、Space、Decisions API、订阅、Codex 和 Marketplace 的功能与上线状态主要依据原作者现场整理。它们不应替代 OpenAI 官方文档、产品页面或当前账号界面的核验；原文中的具体 benchmark、价格与额度数字也不是本文独立复测的结果。
