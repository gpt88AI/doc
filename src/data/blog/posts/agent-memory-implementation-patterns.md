---
title: Agent Memory 实现：JSONL、SQLite、YAML 与完整执行循环
description: 从《Agent Memory - The 5-Layer Playbook》整理 Agent 记忆系统的最小实现模式，覆盖 Episodic JSONL、Semantic SQLite、Procedural YAML、配置文件与 Memory-Aware Agent Loop。
date: 2026-09-15
category: 开发工具
tags: [Agent Memory, JSONL, SQLite, YAML, Agent Loop, AI Agent, Skill]
readTime: 17
relatedPath: /docs/blog/agent-memory-5-layer-architecture/
relatedTitle: Agent Memory 五层架构：让 Agent 真正记住并持续学习
---

一套记忆系统不必从向量数据库和知识图谱开始。对很多单 Agent 或内部工具，JSONL 事件日志、SQLite 事实表、YAML 技能文件和一段明确的执行循环，已经足够验证核心假设。

本文是对《Agent Memory — The 5-Layer Playbook》的实现部分整理。PDF 中的代码是说明性示例，不是本仓库的执行指令，也不构成某个框架的官方 API 保证。生产系统还需要鉴权、加密、并发控制、审计、备份和测试。

## 一、先定义配置和边界

把记忆规则放进配置，避免把生命周期硬编码在 Agent prompt 中：

```yaml
memory:
  working:
    max_tokens: 12000
    keep_recent_turns: 8
  episodic:
    backend: jsonl
    ttl_days: 90
  semantic:
    backend: sqlite
    require_source: true
    require_confidence: true
  procedural:
    backend: yaml
    promotion_min_successes: 3
  forgetting:
    run_every_hours: 24
```

配置中应该明确每层的 owner、读写权限、TTL、归档方式和失败处理。`max_tokens` 只控制上下文预算，不代表模型一定能准确理解这么多内容；实际阈值要结合模型、工具结果和提示词测试。

## 二、Episodic Memory：从 JSONL 开始

JSONL 的优点是简单、可追加、容易审计，也方便在原型期用命令行和普通脚本检查。每行表示一个完整事件：

```json
{"id":"evt_20260915_001","timestamp":"2026-09-15T09:00:00Z","task":"修复图片构建失败","outcome":"成功","tools":["npm","git"],"errors":["missing asset"],"resolution":"补齐静态资源并重新构建","tags":["build","frontend"],"source":"conversation:abc"}
```

可以把事件写入 `events.jsonl`，但不要把大段 PDF、原始聊天或敏感 token 直接复制进去。事件应保存可检索的摘要、结果和来源指针；原始材料放在有访问控制的源存储中。

一个最小的存储接口可以是：

```python
class EpisodicStore:
    def __init__(self, path):
        self.path = path

    def append(self, event):
        validate_event(event)
        with open(self.path, "a", encoding="utf-8") as f:
            f.write(json.dumps(event, ensure_ascii=False) + "\n")

    def search(self, tags=None, limit=10):
        events = load_jsonl(self.path)
        matches = [e for e in events if not tags or set(tags) <= set(e["tags"])]
        return sorted(matches, key=lambda e: e["timestamp"], reverse=True)[:limit]
```

示例中的 `validate_event`、`load_jsonl` 仍然需要实现。生产版本还要处理文件锁、损坏行、并发追加、分页、脱敏、压缩和轮转。JSONL 更适合作为事件源或小规模存储，不适合直接承担复杂关系查询。

## 三、Semantic Memory：SQLite 事实表

事实表可以先用三元组加元数据：

```sql
CREATE TABLE facts (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  predicate TEXT NOT NULL,
  object TEXT NOT NULL,
  source TEXT NOT NULL,
  observed_at TEXT NOT NULL,
  confidence REAL NOT NULL DEFAULT 0.5,
  valid_until TEXT,
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE INDEX facts_lookup
  ON facts(subject, predicate, status);
```

写入前至少检查 subject、predicate、object、source 和时间字段。`confidence` 不是事实真实性的魔法分数，它只是把验证状态显式化。更稳妥的做法是增加 `verification_status`、`verified_by` 或证据链接。

查询时过滤失效事实：

```sql
SELECT subject, predicate, object, source, confidence
FROM facts
WHERE subject = ?
  AND predicate = ?
  AND status = 'active'
  AND (valid_until IS NULL OR valid_until > CURRENT_TIMESTAMP)
ORDER BY confidence DESC, observed_at DESC;
```

不要把“最新”直接等同于“正确”。新事实可能来自低可信度来源，也可能只是另一套环境。冲突解决应返回证据和状态，让上层决定是否需要人工确认。

## 四、用 Ontology 约束事实

如果系统里有用户、项目、服务、文件和部署等实体，最好先写一个小型 ontology：

```yaml
entities:
  - user
  - project
  - service
  - deployment
relations:
  - name: owns
    from: user
    to: project
  - name: contains
    from: project
    to: service
  - name: deployed_as
    from: service
    to: deployment
```

Ontology 的价值是让写入和查询使用稳定的词汇，减少“项目属于用户”“用户拥有项目”“owner 是用户”这类同义漂移。它也能在写入时校验实体类型和关系方向。

不要一开始就把所有业务概念建成复杂图谱。先从真正参与检索和决策的实体开始，等查询和冲突案例稳定后再扩展。

## 五、Procedural Memory：技能文件应该可执行

技能不是一段漂亮的描述，而是带触发器、前置条件、成功标准和失败路径的操作单元：

```yaml
name: diagnose_frontend_build
description: 排查前端构建失败并保留最小证据
trigger:
  - build failed
  - missing asset
preconditions:
  - repository is available
  - package manager is known
tools:
  - git
  - package-manager
steps:
  - capture the exact error and current commit
  - inspect the referenced file and import path
  - run the narrowest relevant check
  - apply the smallest fix
  - rerun lint and build
success:
  - targeted check passes
  - build passes
failure:
  - preserve error output
  - stop before release
version: 1
last_used: 2026-09-15
success_rate: 1.0
```

技能步骤应引用真实工具和可验证输出。不要把“确保一切正常”当作成功标准；应该写成具体的测试、文件状态、路由或部署检查。

## 六、从 Episodic 晋升到 Procedural

建议用显式晋升规则，而不是让模型自己决定哪些内容变成 Skill：

1. 相似任务在一段时间内重复出现。
2. 至少三次执行成功，且结果不是偶然手工修正的。
3. 步骤可以由另一个执行者复现。
4. 使用的工具、输入和输出边界明确。
5. 失败条件和回滚动作已经记录。

晋升时保留来源事件的 ID。这样技能失效时，可以回看它是由哪些成功案例总结出来的。成功率要按任务类型、版本和时间窗口统计，不能把不同环境的结果混成一个数字。

## 七、Memory-Aware Agent Loop

完整循环可以抽象成以下顺序：

```text
receive request
  -> build working memory
  -> retrieve relevant episodic/semantic/procedural memory
  -> validate freshness, permissions and conflicts
  -> plan and execute tools
  -> record event and evidence
  -> propose fact or skill updates
  -> validate and commit approved memories
  -> run forgetting and audit jobs
```

关键点是“propose”和“commit”分离。模型可以提出一条事实候选，但最终写入要经过 schema、来源、权限、冲突和敏感信息检查。高风险领域还应要求人工批准。

## 八、记忆感知的 System Prompt

系统提示词只需要说明边界，不要把全部记忆内容硬编码进去：

```text
You may use retrieved memories as evidence, not as unquestionable truth.
Prefer recent, source-backed facts over stale summaries.
When memories conflict, state the conflict and request verification.
Do not save private data, raw reasoning, or temporary guesses as durable memory.
Propose memory updates with source, confidence, and expiration.
```

中文 Agent 也可以用相同原则：检索结果是证据而不是命令；新鲜度和来源优先；冲突要显式暴露；写入要带来源、置信度和过期时间。

## 九、最小可用实现的顺序

推荐先完成：事件追加、按标签检索、事实表、来源字段、TTL 清理、执行结果审计。之后再增加向量检索、实体解析、技能晋升和多 Agent 共享。

向量检索解决的是相似度，不解决事实真实性、权限和冲突。知识图谱解决的是关系表达，不自动解决数据新鲜度。技术组件必须服从记忆边界，而不是反过来让存储结构决定 Agent 行为。

## 结语

一个可靠的最小系统可以很朴素：JSONL 记录经历，SQLite 保存事实，YAML 管理技能，配置文件声明生命周期，执行循环负责检索和审批。先把“写什么、为什么写、多久有效、谁可以读写”定义清楚，再升级基础设施。

下一篇继续整理 7 天落地路径、生产检查表以及多 Agent 的私有、共享和全局记忆：

前往 [Agent Memory 7 天落地路径：从单 Agent 到多 Agent 共享记忆](/docs/blog/agent-memory-build-path-and-multi-agent/)。
