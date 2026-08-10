---
title: Google AI Studio 无法创建 API 密钥：先查项目与 5 项权限
description: 遇到 Failed to generate API key: Permission denied 时，先确认 Google 账号与 Cloud 项目，再申请创建授权密钥所需的 5 项权限，分清 Workspace 访问、项目 IAM 与后续 API 403，并提供可直接复制给管理员的请求模板与验收清单。
date: 2026-04-27
category: 技术教程
tags: [Google AI Studio, Gemini API, API Key, 权限排查, Troubleshooting]
readTime: 14
relatedPath: /docs/guides/api-key-first-request-failed/
relatedTitle: API Key 创建后第一次请求失败怎么办
---

如果在 Google AI Studio 点击创建后看到"**您无权在此项目中创建密钥**"或 **"Failed to generate API key: Permission denied"**，当前没有可用密钥。先别改 SDK、模型名或请求参数；第一道边界是登录的 Google 账号和 AI Studio 里选中的 Cloud 项目。

在切换账号、项目或角色前，先记下当前账号和准确的项目 ID，然后判断卡在哪一道门：

| 门 | 必须成立的条件 | 通常由谁处理 |
| --- | --- | --- |
| AI Studio 访问 | 账号符合 Workspace、地区和年龄要求，并能打开 AI Studio | Workspace 管理员或账号所有者 |
| 项目可见 | 同一账号能选择或导入目标 Google Cloud 项目 | 项目所有者或组织管理员 |
| 创建权限 | 账号在目标项目中拥有当前授权密钥流程需要的 5 项权限 | 项目 IAM 管理员 |
| 首次验证 | 密钥已创建、只保存在服务端，并能完成一次最小请求 | 开发者，在密钥存在之后 |

**停止规则**：只要密钥没有创建成功，就不要先排查 SDK、模型配额、计费、请求中的 403 或 429。那些问题都发生在"已经有密钥"之后。

如果第三道门失败，可以把下面 5 项当前权限直接发给项目管理员：`resourcemanager.projects.get`、`apikeys.keys.create`、`serviceusage.services.enable`、`iam.serviceAccounts.create`、`iam.serviceAccountApiKeyBindings.create`。让管理员在目标项目中按组织策略实现这些操作，不要默认索要 Owner。

管理员完成一项经过授权的修改后，只在同一账号、同一项目重试一次。成功的标准不是"按钮不报错"，而是密钥已经存在、没有进入前端或聊天记录，并且一次最小的服务端请求通过。

## 先固定账号和项目，不要同时改四个变量

打开 [Google AI Studio API Keys](https://aistudio.google.com/app/apikey)，确认页面右上角的账号就是应该拥有这次集成的身份。记录两个值：

1. 账号选择器中显示的邮箱；
2. 目标项目的项目 ID，而不只是容易重名的显示名称。

Gemini API 密钥属于 Google Cloud 项目。项目承载 IAM、服务启用、授权密钥背后的服务账号、密钥限制、使用记录以及之后的恢复路径。浏览器里看起来"登录了 Google"，并不代表当前标签页使用的是团队预期的账号和项目。

如果项目已经存在于 Google Cloud，但 AI Studio 列表里看不到，不要新建一个同名项目。按照 Google 的[当前 API 密钥说明](https://ai.google.dev/gemini-api/docs/generate-content/api-key?hl=zh-cn)，先把现有 Cloud 项目导入 AI Studio，再在正确项目中管理密钥。

一次干净会话可以用来排除身份混乱：退出无关账号，或在无痕窗口里只登录目标账号，再选择同一个项目并尝试一次。这个动作只能证明之前是否选错账号或项目，不能给你增加 IAM 权限，也不能绕过组织政策。

### 为什么个人账号能创建，工作账号却不行

这个差异很有价值，但它不能直接证明"缺少某个角色"。个人账号可能使用个人控制的项目；工作账号则可能受 Workspace 服务开关、项目成员关系、IAM、服务账号操作、年龄/地区条件或组织政策影响。

不要因为个人项目能创建密钥，就把生产集成迁到个人项目。保留应该使用的工作身份与目标项目，再把阻塞交给对应管理员处理。

| 观察到的现象 | 能说明什么 | 不能说明什么 |
| --- | --- | --- |
| 个人账号可以创建 | 另一条账号/项目路径可以通过 | 工作账号一定只缺某个固定角色 |
| 工作账号看不到项目 | 项目可见性、成员关系或组织访问可能被阻止 | Gemini API 服务整体故障 |
| 能看见项目但创建失败 | 创建权限、服务启用、服务账号、绑定或政策可能被阻止 | 清缓存一定能修好 IAM |
| 同一合规环境下多个账号都失败 | 需要检查项目、资格或组织政策 | 不断新建项目是安全解法 |

## 向管理员申请当前 5 项创建操作

Google 目前为 AI Studio 的新授权密钥流程列出 5 项权限，而不是旧回答里经常单独提到的 `apikeys.keys.create`：

| 权限 | 创建过程中承担的工作 |
| --- | --- |
| `resourcemanager.projects.get` | 读取并确认目标项目 |
| `apikeys.keys.create` | 创建 API key 资源 |
| `serviceusage.services.enable` | 在需要时启用所需服务 |
| `iam.serviceAccounts.create` | 创建授权密钥背后的服务账号 |
| `iam.serviceAccountApiKeyBindings.create` | 把 API key 绑定到该服务账号 |

来源：[Gemini API 密钥官方文档](https://ai.google.dev/gemini-api/docs/generate-content/api-key?hl=zh-cn)，核对日期为 2026 年 7 月 15 日。

[Cloud IAM 的 API Keys 角色说明](https://docs.cloud.google.com/iam/docs/roles-permissions/apikeys)显示，API Keys Admin 包含 `apikeys.keys.create` 等 API key 操作。但这不等于完整覆盖当前 AI Studio 流程：服务启用、服务账号创建与绑定属于其他权限族。

因此，最小权限请求不应该写成"请给我 Owner"。把 5 个操作名、准确项目 ID 和失败时间交给管理员，由管理员选择符合组织政策的预定义角色组合或自定义角色。

### 可直接复制给管理员的请求

> 我使用 **ACCOUNT_EMAIL** 登录 Google AI Studio，在项目 **PROJECT_ID** 中创建授权密钥时，页面于 **TIMESTAMP_WITH_TIME_ZONE** 显示"Failed to generate API key: Permission denied / 您无权在此项目中创建密钥"。
>
> 请先确认该账号可以访问 AI Studio 并看见目标项目，再检查项目中是否允许以下当前创建操作：`resourcemanager.projects.get` `apikeys.keys.create` `serviceusage.services.enable` `iam.serviceAccounts.create` `iam.serviceAccountApiKeyBindings.create`
>
> 本次没有创建出密钥，消息中也没有附带任何凭据。

工单里只放项目 ID、账号、带时区的时间和完整错误。不要附上密钥、浏览器 Cookie、访问令牌或其他秘密。

## 分清 Workspace 访问和 Cloud 项目 IAM

Workspace 管理员和 Cloud 项目 IAM 管理员控制的是两道不同的门。

Workspace 服务访问决定托管账号能否使用 AI Studio；项目 IAM 决定该身份在某个 Cloud 项目中能执行什么操作。通过其中一道门，并不代表另一道门也通过。

Google 的 [Workspace 与 AI Studio 访问说明](https://ai.google.dev/gemini-api/docs/workspace?hl=zh-cn)指出，管理员可以控制托管用户的 AI Studio 使用权限，并对部分未满 18 岁的教育账号列出额外限制。[可用地区说明](https://ai.google.dev/gemini-api/docs/available-regions?hl=zh-cn)又单独定义地区与年龄条件。这些是账号访问条件，不是项目角色的替代品。

| 你目前能做到什么 | 更可能的处理人 | 请对方检查什么 |
| --- | --- | --- |
| 工作账号无法打开 AI Studio | Workspace 管理员 | 服务开关、组织单位、年龄或教育账号限制 |
| 能打开 AI Studio，但看不到目标项目 | 项目所有者或组织管理员 | 项目成员关系、项目导入、账号身份 |
| 能看见项目，但无法创建密钥 | 项目 IAM 管理员 | 5 项当前操作与组织政策 |
| 密钥已创建，但 API 后来返回 403 | 开发者与项目所有者 | key/项目对应、限制、路由、地区与请求认证 |

如果失败点属于管理员，就停在那一层。反复切换浏览器、创建新项目或申请大角色只会增加审计噪音，不会改变阻塞的所有者。

## 只在同一项目受控重试一次

管理员完成一项明确的访问或 IAM 修改后，回到同一个账号和同一个项目。刷新 AI Studio，或用一个只登录该账号的干净会话，再次确认项目 ID，然后点击一次创建。

不要同时更换账号、项目、浏览器和角色。一次只改变一个已授权边界，才能知道到底是哪项修改起效。如果仍失败，保存新的时间和完整错误，用于下一次升级。

团队环境里还应保留一条简短的重试记录：原账号、原项目 ID、管理员批准的变更、变更完成时间、重试时间以及结果。不要只写"后来好了"。如果两名管理员先后修改了不同边界，每项变更都应对应自己的重试；否则你无法判断是 Workspace 服务开关、项目成员关系，还是某项 IAM 操作真正解除阻塞。这份记录不包含密钥，却能避免下一位开发者重复申请过大的权限。

创建成功后，先确认密钥类型。Google 当前文档称，新建的 AI Studio 密钥是由 Google Cloud 服务账号支撑的**授权密钥**，默认限制为 Gemini API。[Cloud API key 认证说明](https://docs.cloud.google.com/docs/authentication/api-keys)解释了授权密钥与服务账号的绑定关系。

旧教程可能讲的是标准 API 密钥。Google 当前还说明，Gemini API 将从 **2026 年 9 月**开始拒绝标准 API 密钥。这是会变化的迁移节点；长期部署前应重新查看官方密钥文档，而不是把当前日期当作永久承诺。

把新密钥复制到受信任的服务端秘密存储中。不要放进截图、前端 bundle、移动应用、公开仓库、Issue 或聊天。如果调用必须从浏览器界面发起，应由自己的后端代理 Gemini 请求，而不是把密钥暴露给客户端。

## 密钥存在后，再做一次最小私密验证

创建成功只能证明密钥资源存在，还不能证明运行环境读到了正确秘密，也不能证明所有模型、配额或计费条件都正常。

先在私密的服务端 shell 或 secret manager 中设置环境变量：

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

再从同一个私密环境发送最小认证请求：

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models" \
  -H "x-goog-api-key: $GEMINI_API_KEY"
```

成功响应说明凭据能到达 Gemini API。它不保证每个模型都可用，也不保证配额、计费和下一条业务请求一定成功。最小验证通过后，再选择当前模型测试真实调用。

始终遵守四条安全线：

- 只把密钥复制到批准的秘密位置；
- 不要放进 `NEXT_PUBLIC_*` 等客户端环境变量；
- 不要把密钥粘贴到工单、截图或聊天；
- 一旦暴露就轮换，即使当前请求仍然成功。

## 仍被拒绝时，升级边界而不是继续猜

一份好的升级材料让管理员可以复现失败，同时不接触你的秘密。请提供：

- 准确的 Cloud 项目 ID；
- 登录的 Google 账号；
- 页面显示的完整错误；
- 带时区的失败时间；
- 尝试执行的动作：创建 AI Studio 授权密钥；
- AI Studio 是否能打开、项目是否可见；
- 单账号干净会话是否改变结果。

在这个失败状态下本来就不该有密钥，所以不要发送任何密钥。如果后续尝试真的创建成功，也只需报告"创建已成功"，凭据仍应留在秘密通道中。

以下停止条件应由管理员继续处理：

- 托管 Workspace 账号的 AI Studio 服务被关闭；
- 目标项目被组织或成员关系隐藏；
- 组织政策禁止服务账号、密钥或绑定操作；
- 账号不符合地区、年龄、验证或教育账号条件；
- 安全政策要求使用另一种经批准的凭据方式。

遇到这些条件时，"换个人账号试试"不是生产修复。管理员需要批准目标路线，或者明确组织支持的凭据方案。

## 不要把创建失败和后续 API 403 混在一起

两类错误都可能包含 "permission denied"，但它们发生在密钥生命周期的两侧。

| 状态 | 现在有什么 | 错误出现在哪里 | 第一批检查 |
| --- | --- | --- | --- |
| AI Studio 提示无法生成密钥 | 没有可用密钥 | AI Studio 创建操作 | 账号、项目可见性、5 项权限、Workspace/组织政策 |
| API 返回 `403 PERMISSION_DENIED` | 已经有密钥 | HTTP API 响应 | key 与项目是否匹配、限制、认证方式、地区与资源权限 |
| API 返回 `429 RESOURCE_EXHAUSTED` | 密钥存在，认证可能已通过 | 请求进入后的 HTTP 响应 | 项目限额、速率、token、重试策略 |

不要通过修改应用代码解决第一行，也不要通过反复创建密钥解决第二行。保留清晰的状态转换：先创建，私密保存，做一次小请求，然后按真实响应继续排查。

密钥已经可用后，如果问题转为 Free Tier 容量，可查看 [Gemini API 免费层限制](/docs/blog/gemini-api-free-tier/)。这个分支不应拖慢创建权限的修复。

## 用这张清单关闭故障

只有每个答案都具体，故障才算关闭：

| 问题 | 通过标准 |
| --- | --- |
| 当前登录哪个账号？ | 已记录目标工作或个人身份 |
| 哪个项目拥有密钥？ | 已在 AI Studio 确认准确项目 ID |
| 账号能否使用 AI Studio？ | Workspace、地区与年龄条件通过 |
| 账号能否看见项目？ | 已选择或导入目标现有项目 |
| 能否创建授权密钥？ | 5 项当前操作得到允许 |
| 重试前改了什么？ | 只记录一项经授权的访问或 IAM 修改 |
| 密钥存在哪里？ | 服务端 secret 或环境变量 |
| 如何验证？ | 一次最小私密请求成功 |
| 给支持人员发了什么？ | 只有项目与错误证据，没有凭据 |

如果创建仍失败，把证据包交给那道门的所有者。如果创建成功但请求失败，就进入请求阶段，不要把后续问题重新说成"创建失败"。

## 常见问题

### 为什么个人 Google 账号能创建，工作账号却不行？

两个账号通常走的是不同身份和项目边界。工作账号可能受到 Workspace 服务访问、项目成员关系、IAM、服务账号操作或组织政策控制。个人账号成功只能说明另一条路径通过，不能证明具体缺哪个权限，也不能授权生产绕行。

### `apikeys.keys.create` 是做什么的？

它允许创建 API key 资源。当前 AI Studio 授权密钥流程还列出项目读取、服务启用、服务账号创建和 API key 绑定，所以只有这一项可能不足以完成全流程。

### 为什么 API Keys Admin 仍可能不够？

API Keys Admin 覆盖 API key 操作，但当前流程还可能启用服务、创建服务账号并完成绑定。把 5 项操作交给管理员核对，比猜一个大角色更准确。

### 清除浏览器缓存能修复权限被拒吗？

一次干净的单账号会话可以修复或暴露账号选择问题，但不能授予项目 IAM、打开 Workspace 服务或覆盖组织政策。把它当作一次诊断，而不是权限修复。

### 能不能直接在 Google Cloud Console 创建？

AI Studio 是 Gemini API 密钥的文档化创建与管理入口，现有 Cloud 项目也可导入。Cloud Console 仍用于 IAM、密钥限制、服务账号和组织控制。如果组织要求另一种凭据流程，应遵循批准路线，而不是把 Console 当作绕过手段。

### 如果已经创建密钥，但请求返回 403 呢？

这属于请求阶段。确认运行环境读取的是新密钥、密钥属于目标项目、限制允许 Gemini API、端点与认证方式正确，并检查所请求资源是否适用于当前路线。

### 管理员应该替我创建密钥再发给我吗？

优先让经批准的开发者或服务身份获得最小权限，并通过团队的秘密管理流程保存密钥。如果必须由管理员创建，也只能用批准的秘密通道交付，不能通过邮件、聊天、截图或工单明文发送。

### 创建仍失败时，应该发哪些信息？

发送项目 ID、登录账号、完整错误、带时区时间、尝试动作、项目可见性和一次干净会话结果。不要发送密钥、访问令牌、Cookie 或其他凭据。

### 标准 Gemini API 密钥会一直可用吗？

Google 当前称 Gemini API 将从 2026 年 9 月开始拒绝标准 API 密钥；AI Studio 新建密钥使用服务账号支撑的授权密钥路径。迁移日期和操作可能变化，接近节点时应重新查看官方说明。

### 通过 GPT88 使用 Gemini API 需要这份 Google 权限吗？

不需要。如果使用 GPT88 统一网关（https://gpt88.cc），只需要在控制台获取一把 `sk-gpt88-...` 格式的 API Key，走 OpenAI 兼容或 Google 原生接口即可，不涉及 Google Cloud 项目与 IAM。本页排查流程只针对你自行在 Google AI Studio 创建官方密钥的场景。
