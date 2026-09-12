---
title: GPT-6 Astra 时代如何重写 Skills、AGENTS.md 与提示词：从堆指令到清晰边界
description: 结合 OpenAI 官方文章，详细拆解 GPT-6 Astra 时代 Skills、AGENTS.md 和任务提示词的变化：为什么描述要更短、如何使用渐进式披露、哪些旧式流程应该删掉，以及如何在 GPT88 项目中建立更高效的 Agent 指令体系。
date: 2026-09-12
category: 开发工具
tags: [GPT-6 Astra, Skills, AGENTS.md, Prompt Engineering, Coding Agent, Codex, GPT88]
readTime: 16
relatedPath: /models/gpt-6-astra/
relatedTitle: gpt-6-astra 模型 API 文档
---

随着 Coding Agent 越来越强，很多团队正在遇到一个看似矛盾的问题：模型能力提升了，项目里的 `SKILL.md`、`AGENTS.md` 和任务提示词却越来越长，Agent 反而更容易迷路。

OpenAI 在官方文章 [Rethinking skills and prompts for GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra) 中给出的方向很明确：GPT-6 Astra 时代，不应该继续把所有经验都堆进提示词，而应该重新审查这些指令，删除已经不必要的手把手引导，缩短 Skill 描述，采用渐进式披露，并把真正重要的安全边界和完成条件说清楚。

本文将这篇文章整理成一套适合 GPT88 用户、开发团队和 Agent 工程师直接执行的实践指南。

> 本文分为两层：前半部分总结 OpenAI 官方文章的核心观点；后半部分给出 GPT88 文档与项目接入时的落地方法。GPT-6 Astra 的实际可用模型、价格、上下文、限速、工具权限和 API 兼容性，仍应以 GPT88 控制台与当前 API Key 的 `GET /v1/models` 返回结果为准。

## 一、先看结论：不要再用“更长的提示词”解决所有问题

可以先把 Agent 项目里的三类指令分开：

| 指令层 | 主要作用 | 最适合放什么 |
| --- | --- | --- |
| Skill | 某类工作流的可复用方法 | 工作流路由、专用脚本、必要参考资料 |
| `AGENTS.md` | 仓库或目录范围内的长期约定 | 架构边界、验证方式、目录规则、明确的安全权限 |
| 任务提示词 | 当前这一次要完成的目标 | 目标、范围、验收标准、需要特别注意的上下文 |

常见的失败方式，是把三者写成同一份“超长操作手册”：

```text
每次都先读完整项目地图
每次都读完所有架构文档
每次修改一个文件都运行全部测试
每次遇到数据库相关代码都加载数据库 Skill
每一步都等待人工确认
```

这些规则可能是在旧模型经常遗漏步骤时逐步加上的。但当模型已经能够理解上下文、判断风险、运行验证并自己发现下一步时，它们可能会变成噪音，甚至直接降低任务完成率。

更好的目标是：

```text
让模型知道什么时候使用某份指导，
让模型知道哪些边界不能越过，
让模型知道什么时候算完成，
其余细节按需读取和判断。
```

## 二、为什么 GPT-6 Astra 需要重新审查旧指令

### 1. 从“需要手把手引导”转向“能够理解意图和上下文”

过去，项目维护者经常需要把每一个步骤写得非常具体：先打开哪个文件，再执行哪个命令，然后检查哪个字符串，最后按照固定顺序运行一长串测试。

这种方式的优点是可预测，缺点是容易把 Agent 限制在一条预设路径上。只要仓库结构、任务目标或错误类型发生变化，模型就可能继续执行不再适用的步骤。

OpenAI 官方文章的核心判断是：随着模型更擅长处理模糊目标、理解代码关系和判断下一步，过度细化的说明不一定更安全，也不一定更可靠。很多以前有帮助的“操作食谱”，现在可能会阻碍模型根据实际情况调整策略。

这并不意味着所有细节都应该删除，而是要把细节放到它真正需要出现的位置：

- 通用规则放在根级 `AGENTS.md` 或 Skill 入口中。
- 只有某一类任务需要的细节放在专项参考文件中。
- 只有需要重复执行、容易出错或必须确定性完成的动作，才封装成脚本。
- 当前任务独有的约束直接写进任务提示词。

### 2. 指令越多，模型越难判断“什么最重要”

Skills 的描述会参与模型判断“这项 Skill 是否适用于当前任务”。如果每个 Skill 的描述都很长，并且大量 Skill 都使用类似的宽泛触发条件，例如“处理数据库、查询、模型或持久化时使用”，就会出现两个问题：

1. 不相关的 Skill 也可能被加载。
2. Skill 太多时，系统会压缩描述，模型看到的信息反而更少。

官方文章给出的示例非常值得借鉴。与其写成：

```text
创建并验证 Postgres schema migration。适用于数据库、查询、模型或持久化相关工作。
```

不如收窄成：

```text
创建并验证 Postgres schema migration。仅在新增、修改或审查 migration 时使用。
```

第二种写法的关键不是字数少，而是触发边界明确。它告诉 Agent：什么时候应该加载，什么时候不应该加载。

## 三、Skill 应该怎样重写：短描述 + 渐进式披露

### 1. 根文件只负责路由，不负责承载全部知识

一个好的 Skill 入口不应该是一篇几十页的总手册。它更像一个路由器，帮助 Agent 快速回答三个问题：

- 这项能力什么时候适用？
- 这项能力有哪些工作流分支？
- 当前任务应该继续读取哪个参考文件或运行哪个脚本？

推荐结构：

```text
skills/
└── gpt88/
    ├── SKILL.md              # 触发条件、边界、最短路由
    ├── references/
    │   ├── api.md            # API 与客户端接入
    │   ├── models.md         # 实时模型发现与选择
    │   └── troubleshooting.md # 错误分类与恢复
    └── scripts/
        └── verify-access.mjs # 可重复的确定性检查
```

入口 `SKILL.md` 可以只保留以下信息：

```markdown
---
name: gpt88
description: Configure GPT88 clients and verify current model access. Use for API setup, model discovery, pricing checks, or safe key handling.
---

# GPT88

1. Determine whether the task is account control-plane work or model inference.
2. Use the matching credential and endpoint.
3. Discover the current model ID before hardcoding a route.
4. Read only the reference file needed for the current workflow.
5. Run the smallest verification request before enabling advanced features.
```

这样，模型先得到足够的方向感；只有任务确实进入 API 配置、模型发现或排障分支时，才读取更长的资料。

### 2. 把“知识”与“动作”分开

参考文档适合解释概念、参数和决策；脚本适合执行确定性动作。例如：

- 解释 GPT88 的账号 Token 与推理 API Key 区别，放在 `references/auth.md`。
- 查询当前模型列表并检查目标 ID 是否存在，放在 `scripts/verify-model.mjs`。
- 判断一个请求是否应该走 Chat Completions 或 Responses API，放在路由说明里。
- 需要修改代码、提交或发布的流程，不要只依赖脚本，也要在任务中明确验收边界。

这能减少模型为了完成一个简单查询而读取大量无关材料，也能避免把安全判断隐藏在一个不透明的脚本里。

### 3. Skill 描述应该写“什么时候用”，而不是写“所有相关领域”

可以使用这个模板：

```text
做什么。仅在什么具体变化或任务发生时使用。
```

例如：

```text
审查并修复 API 路由。仅在修改 endpoint、请求协议或响应结构时使用。
```

尽量避免：

```text
处理 API、后端、服务、接口、请求、数据、模型、部署或任何相关代码时使用。
```

后者几乎没有真正的选择边界，会让 Skill 变成“只要碰到后端就加载”的通用说明书。

## 四、`AGENTS.md` 应该保留什么，应该删除什么

### 应该保留的内容

`AGENTS.md` 是仓库级长期规则，适合保留这些信息：

- 项目的关键目录和模块边界。
- 哪些命令是安全的本地验证命令。
- 哪些文件由生成器维护，不能手工修改。
- 哪些路径包含敏感信息，不能输出或提交。
- 哪些操作需要明确授权，例如生产写入、发布、推送和删除。
- 代码完成的最低验收标准。

例如：

```markdown
## Verification

For documentation changes, run the affected build and route audit before reporting completion.

## Generated files

Run `npm run seo` after adding a blog post. Do not hand-edit generated sitemap files.

## Secrets

Never print or commit API keys, cookies, access tokens, or production credentials.
```

### 应该谨慎删除或收窄的内容

以下规则通常值得重新审查：

- “每次任务都必须先读完整项目地图”。
- “每次修改都必须运行整个测试套件”。
- “任何涉及数据库的词都必须加载某个 Skill”。
- “每一步都必须向用户询问是否继续”。
- “只能按照下面固定的十几个步骤执行”。

如果这些要求的确对应不可逆风险、生产权限或合规审计，就应该保留，但要说明触发条件。不要把所有任务都当成高风险任务。

OpenAI 官方文章还特别提醒：如果某条规则原本是为了约束旧模型，而现在项目已经切换到 GPT-6 Astra，就应该重新判断它是否仍然必要。模型不同，合适的指令强度也可能不同。

## 五、决策边界：少一点阻拦，多一点清晰授权

安全规则和执行规则不是一回事。

安全规则回答：

- 哪些事情不能做？
- 哪些数据不能泄露？
- 哪些操作必须获得授权？
- 哪些生产动作不可自动执行？

执行规则回答：

- 先读哪个文件？
- 先运行哪个命令？
- 是否必须按固定顺序做？
- 什么时候停止并返回？

很多团队为了防止模型越权，把执行规则写得非常保守，结果模型遇到一个安全但未被明确列出的动作也会停下来。更好的写法是把安全边界说清楚，同时明确一段可自动完成的授权范围。

例如：

```markdown
## Safe local workflow

You may inspect files, edit the requested source files, run the local test suite, fix failures caused by the change, and rerun the affected checks without asking for approval at each step.

## Requires confirmation

Ask before production writes, credential changes, destructive deletion, deployment, or pushing commits unless the user explicitly requests that action.
```

这样既不会放开生产权限，也不会让 Agent 在每次本地测试前停下来等待确认。

## 六、完成条件比“继续努力”更重要

官方文章指出，GPT-6 Astra 可能比一些更倾向持续执行的模型更早判断“第一阶段已经完成”。因此，任务提示词里最好明确 completion contract，而不是只写“帮我处理一下”。

一个完整的任务目标至少包含：

1. 目标：要新增、修改或修复什么。
2. 范围：允许改哪些目录，不要碰哪些文件。
3. 验证：需要运行哪些测试、构建或路由检查。
4. 交付：需要给出哪些文件、链接、结果和剩余风险。
5. 停止条件：什么情况下算完成，什么情况下必须停下来请求输入。

例如，文档站新增一篇文章时，可以这样写：

```text
新增一篇中文博客，基于给定的官方来源整理，不要编造来源没有支持的性能数字。

范围：只修改 web/src/data/blog/posts/ 和由 npm run seo 生成的资产。
验证：运行 npm run build，确认中文、英文回退、sitemap 和 prerender 路由都包含新文章。
完成条件：文章可通过博客路由访问，构建与静态路由审计通过，并报告改动文件和结果。
不要执行：不要推送提交，除非我另行要求。
```

这比把“先读十个文件、再按二十步操作”写进任务更有用，因为它把模型的注意力放在结果和边界上。

## 七、给 GPT88 项目的落地建议

### 1. 为模型文档保留“动态信息边界”

在 GPT88 项目中，模型 ID、价格、限速、可用线路和账号权限都可能变化。无论是 Skill 还是博客文章，都不应把一次查询结果写成永久事实。

建议统一使用以下表达：

```text
调用前先使用 GET /v1/models 确认当前 API Key 可见的真实模型 ID。
价格、额度、限速、上下文与工具能力以控制台和实际响应为准。
```

这既适用于 GPT-6 Astra，也适用于 DeepSeek、Claude、Gemini 和其它模型。

### 2. 把 GPT-6 Astra 的能力用于“减少样板指令”

如果你已经通过 GPT88 接入 GPT-6 Astra，可以用它审查现有项目指令。推荐让它完成一次“指令审计”，而不是让它直接重写所有文件：

```text
审查当前仓库的 AGENTS.md、Skills 和相关任务模板。

请按以下维度输出：
1. 重复规则；
2. 触发范围过宽的 Skill 描述；
3. 可以改成渐进式披露的长文档；
4. 仍然必要的安全边界；
5. 会影响任务完成率的过度流程化规则。

先只输出审计结果，不要修改文件。
```

等团队确认哪些规则应该删掉或收窄后，再让 Agent 进行第二阶段实施。把审计和改写分开，能减少一次性大范围改变项目行为的风险。

### 3. 用固定任务集验证“删规则后是否变好”

不能只凭感觉判断新的 Skill 更好。可以准备一组固定任务：

- 新增一个 API 文档页面。
- 修复一个可复现的前端 Bug。
- 修改一个数据库 migration，但不执行生产写入。
- 运行测试并修复由本次改动引起的失败。
- 查询模型列表并配置一个客户端。

对比精简前后的：

- 是否选择了正确的 Skill。
- 是否读取了必要文件而没有大范围浏览无关内容。
- 首次实现是否完整。
- 是否运行了正确的验证命令。
- 是否在真正需要授权的地方停下。
- 总耗时、返工次数和上下文消耗。

这样，Skills 优化就从“文案偏好”变成了可以复现的工程改进。

## 八、一份可直接复用的检查清单

### Skill 检查

- [ ] 描述是否只说明明确的触发场景？
- [ ] 是否避免把整个领域都写成触发条件？
- [ ] 根文件是否足够短，能承担路由作用？
- [ ] 详细资料是否按工作流拆到了 `references/`？
- [ ] 重复、确定性的动作是否适合封装成脚本？
- [ ] 是否存在与其它 Skill 冲突的规则？

### `AGENTS.md` 检查

- [ ] 是否只保留长期有效的仓库规则？
- [ ] 是否区分本地安全动作和生产高风险动作？
- [ ] 是否明确生成文件、敏感文件和验证命令？
- [ ] 是否存在“每次任务都必须做”的过度流程？
- [ ] 是否仍然需要这些规则，还是只是在约束旧模型？

### 任务提示词检查

- [ ] 是否给出了目标、范围和完成条件？
- [ ] 是否说明需要验证哪些结果？
- [ ] 是否说明是否允许提交、推送、部署或外部写入？
- [ ] 是否把当前任务的特殊上下文直接写出来？
- [ ] 是否避免把无关的项目背景全部复制进来？

## 九、最终理解：好的指令系统不是越厚越安全

GPT-6 Astra 时代的 Prompt Engineering，重点不再是把所有经验都塞进上下文，而是建立一套更容易选择、更容易维护、更容易验证的指令系统：

```text
短描述负责选择
入口文档负责路由
参考文件负责按需展开
脚本负责确定性动作
AGENTS.md 负责长期边界
任务提示词负责当前目标
验证与完成条件负责收口
```

如果一个 Agent 项目越来越依赖冗长的“操作食谱”，不一定说明它更成熟，也可能说明旧规则还没有随着模型能力升级而清理。

最值得先做的事情不是重新写一份更长的系统提示词，而是拿出当前的 Skills 和 `AGENTS.md`，问 GPT-6 Astra：哪些规则仍然必要、哪些触发条件过宽、哪些内容应该延迟到真正需要时再读取，以及哪些安全边界必须明确保留。

然后，用固定任务集验证结果，直到指令更短，但完成率、可审查性和安全性都没有下降。

## 来源与延伸阅读

- [OpenAI Developers：Rethinking skills and prompts for GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra)
- [GPT88：gpt-6-astra 模型 API 文档](/models/gpt-6-astra/)
- [GPT88：GPT88 Skill 完整指南](/docs/blog/gpt88-skill-agent-onboarding-guide/)
- [GPT88：快速开始](/docs/quickstart/)
