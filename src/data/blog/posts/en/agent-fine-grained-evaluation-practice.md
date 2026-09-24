---
title: Fine-Grained Evaluation for AI Agents: From End-to-End Results to Module-Level Defects
description: A practical evaluation framework for separating task completion from perception, planning, memory, tool calling, retrieval-source correctness, and output faithfulness.
date: 2026-09-19
category: Developer Tools
tags: [Agent evaluation, end-to-end evaluation, perception, planning, memory, tool calling, GPT88]
readTime: 10
relatedPath: /docs/blog/agent-business-effect-evaluation/
relatedTitle: Make Agents Evaluatable, Controllable, and Iterative with Business-Outcome Evaluation
---

Agent evaluation cannot ask only “did it finish?” End-to-end results show whether the user task was achieved, but they do not explain whether failure came from perception, planning, memory, tool calling, or source data. Fine-grained evaluation turns one outcome into signals that can be located, fixed, and regression-tested.

This article is adapted from the public summary of Alibaba Technology's [“Fine-Grained Evaluation for AI Agent Applications”](https://mp.weixin.qq.com/s?__biz=Mzg4NTczNzg2OA==&mid=2247511370&idx=1&sn=c9f4ff1d054cb229ac2f8c1462fcb05e&scene=21#wechat_redirect). The summary describes two tracks: end-to-end metrics for task completion and module metrics for defect localization. It also separates answer faithfulness from retrieval-source correctness.

## End-to-End and Module Metrics Are Complementary

| Layer | Main question | Typical use |
| --- | --- | --- |
| End-to-end | Was the user task completed and usable? | Release gates, version comparison, business results |
| Perception | Was the input understood correctly? | Image, text, voice, and page-state parsing |
| Planning | Were steps and dependencies correct? | Long tasks, branches, retries, stop conditions |
| Memory | Was the right history and context retrieved? | Personalization, multi-turn work, project facts |
| Tool calling | Were parameters, permissions, and results handled correctly? | APIs, databases, browsers, code execution |
| Output | Is the result factual, formatted, and usable? | Delivery, structured consumers, audit |

An end-to-end pass with abnormal module metrics means the test misses a risk. Modules that pass while the task fails points to a composition contract or orchestration problem.

## Define Evaluation Scope First

Scope should match the product promise. A knowledge Agent may need retrieval, citations, and answer quality. A Coding Agent also needs file changes, commands, tests, permissions, and rollback. A business-strategy Agent needs online experiments and risk indicators.

Use a scope map:

```text
scenario → user goal → Agent capability → tool → data → metric → trace → owner
```

Without this map, teams accumulate metrics without knowing which ones affect delivery.

## Datasets Must Cover Failure Modes

Include normal flows, missing and boundary inputs, multi-turn context, tool failures and timeouts, insufficient permissions, malicious prompts, real production bad cases, new business conditions, new versions, and distribution shifts.

Keep tuning, test, and final-validation sets separate. If the Agent, Judge, and dataset change together while the same examples are reused, the apparent improvement may only be adaptation to the evaluation set.

## Instrument the Step That Failed

Runtime events should include input versions, retrieval requests, candidate documents, planning steps, tool parameters, tool responses, retries, final output, and human corrections. Every event needs `trace_id`, `run_id`, version, and timestamp.

“The answer was wrong” is not enough. Continue through the chain:

1. Did retrieval miss the correct source?
2. Was the retrieved source itself wrong or stale?
3. Did the Agent understand the source correctly?
4. Did generation remain faithful, or add unsupported content?

## Separate Faithfulness from Source Correctness

Answer faithfulness asks whether the answer stayed within the material. Source correctness asks whether the retrieved material actually supports the question.

| Retrieval source | Answer | Interpretation |
| --- | --- | --- |
| Correct | Unfaithful | Generation or citation failure |
| Incorrect | Faithful | Retrieval or knowledge-base failure |
| Correct | Faithful | Chain passes |
| Incorrect | Unfaithful | Record both root causes |

Combining both into one score can make a knowledge-base defect look like a Prompt defect.

## Route Metrics to Fixes

- Perception failure: add parsing examples or repair the perception module.
- Planning failure: inspect decomposition, dependencies, stopping, and retries.
- Memory failure: inspect retrieval, write thresholds, freshness, and conflicts.
- Tool failure: inspect schema, permission, timeout, and idempotency.
- Faithfulness failure: inspect citation constraints, context window, and generation.
- End-to-end failure: inspect composition, business goal, and acceptance criteria.

## Release Gate Checklist

- [ ] End-to-end and module metrics are defined separately.
- [ ] Every metric maps to a dataset and runtime trace.
- [ ] Source correctness and answer faithfulness are evaluated separately.
- [ ] Real bad cases flow back into test and regression sets.
- [ ] Results route to a clear repair owner.
- [ ] Model, Prompt, tools, data, and Judge have version records.

## Source and Boundary

Source: [Alibaba Technology: Fine-Grained Evaluation for AI Agent Applications](https://mp.weixin.qq.com/s?__biz=Mzg4NTczNzg2OA==&mid=2247511370&idx=1&sn=c9f4ff1d054cb229ac2f8c1462fcb05e&scene=21#wechat_redirect). This article is based on a public Qiku Weekly summary and does not infer unpublished formulas, experiment numbers, or source implementation details.
