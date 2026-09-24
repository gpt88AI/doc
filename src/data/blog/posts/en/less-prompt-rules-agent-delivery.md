---
title: Agent Delivery Gets More Reliable After Removing 80% of Prompt Rules: Put Constraints Back into the System
description: An engineering guide to slimming Agent Prompts by moving context indexes, trusted facts, tool capabilities, and validation gates into deterministic system layers.
date: 2026-09-19
category: Developer Tools
tags: [Prompt engineering, Agent, Context Engineering, tool calling, quality gates, GPT88]
readTime: 10
relatedPath: /docs/blog/rethinking-skills-prompts-gpt-6-astra/
relatedTitle: How to Rework Skills, AGENTS.md, and Prompts in the GPT-6 Astra Era
---

Putting every lesson into a Prompt looks like adding constraints, but it can make priority harder to judge. The central idea in the Tencent Cloud Developer article is to remove low-value rules and assign deterministic requirements to context indexes, trusted sources, tools, and validation gates.

This article is based on a summary of Qiku Weekly issue 597. “Remove 80%” is the source article's framing, not a number that every project should apply mechanically. The real task is to decide who should own each rule.

## Four Constraint Types Should Not All Live in the Prompt

| Constraint | Better owner |
| --- | --- |
| Where material lives and when to load it | Context index and progressive disclosure |
| Which fact is trusted | Data source, version, and provenance registry |
| Which actions are allowed | Tool schema, permissions, and runtime policy |
| Whether the work is complete | Tests, acceptance, and release gates |
| Preferences that need model judgment | Prompt, Skill, and task context |

The Prompt should state the objective, priority, and boundaries. It should not replace an authorization system, type checker, test suite, or fact database.

## Why Long Prompts Can Reduce Delivery Success

As the number of rules grows, the Agent has a harder time separating current requirements from historical context, already-enforced rules, conflicting instructions, and task-specific details.

The result can be higher context cost, diluted critical instructions, obsolete procedures, or a model that satisfies the prose while ignoring the actual repository state.

## Turn Rules into System Capabilities

### Context Index

Use README files, AGENTS files, Skill entry points, and directory indexes to tell the Agent where to look. Load detail for the current task instead of injecting the whole project every time.

### Trusted Facts

Give rules, configuration, database schemas, model lists, and product status one maintained source of truth. Other documents should link to changing facts instead of copying them.

### Tools

The tool layer can enforce parameter types, permissions, budgets, paths, and approvals. An Agent may express an out-of-bounds intention, but the tool should refuse to execute it.

### Validation Gates

Use lint, type checks, tests, screenshot review, API validation, route audits, and release probes as executable completion conditions. Replace “check carefully” with a failure condition that can be observed.

## What Should Remain in the Prompt

Keep the goal, scope, priority, irreversible risks, user preferences, output format, evidence requirements, and completion condition. Remove duplication, stale instructions, rules already enforced by tools, and step-by-step detail that does not apply to the current task.

## A Slimming Workflow

1. Split the existing Prompt into individual rules.
2. Assign each rule to its owner: model, data, tool, test, or human.
3. Remove duplicates and rules already executed automatically.
4. Move permissions, schemas, budgets, and validation into the system layer.
5. Compare the old and new versions on real tasks: success rate, rework, tokens, latency, and boundary violations.
6. Feed failure cases back into the right layer instead of automatically adding more Prompt text.

## Source and Boundary

Source: [Tencent Cloud Developer: “After Removing 80% of Prompt Rules, Agent Delivery Success Actually Improved”](https://mp.weixin.qq.com/s?__biz=MzI2NDU4OTExOQ==&mid=2247697286&idx=1&sn=65d6dbb523f04f06b83088e7a2ba978c&scene=21#wechat_redirect). This article is based on the weekly summary and current GPT88 Agent engineering practice. The full source text, experiment data, and original images were not independently obtained, so the headline conclusion is not presented as a universal guarantee.
