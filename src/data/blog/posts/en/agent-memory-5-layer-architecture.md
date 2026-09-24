---
title: The Five-Layer Agent Memory Architecture: Help Agents Remember and Learn Continuously
description: A structured explanation of Working, Episodic, Semantic, Procedural, and Forgetting layers and why memory is an engineering bottleneck for Agents.
date: 2026-09-15
category: Developer Tools
tags: [Agent Memory, AI Agent, CoALA, Episodic Memory, Semantic Memory, Procedural Memory, Forgetting]
readTime: 15
relatedPath: /docs/blog/agent-memory-implementation-patterns/
relatedTitle: Agent Memory Implementation with JSONL, SQLite, YAML, and a Complete Execution Loop
---

An Agent does not remember simply by putting the entire chat history back into context. A usable memory system must decide what belongs in the current task, what should be saved as an episode, what should become a fact, what can become a reusable method, and when old information should expire or be revoked.

This article is adapted from *Agent Memory: The 5-Layer Playbook*. It is an independent technical playbook, not an official position of Anthropic, Mem0, Snowflake, LangChain, or any mentioned project. Reported numbers remain source claims rather than universal guarantees.

![Five-layer Agent Memory architecture](/docs/blog/zh/agent-memory-5-layer-architecture/img/architecture.png)

## The Complete Architecture

User input enters Working Memory. Tasks, tool calls, errors, and results become Episodic Memory. Verified stable facts become Semantic Memory. Repeated and validated methods become Procedural Memory. A Forgetting Engine handles expiry, eviction, conflicts, and rollback, while retrieval brings only relevant memory back into Working Memory.

The point is not to create five databases. Each information type needs its own lifecycle, write threshold, retrieval method, and permission boundary.

## Why Long Context Is Not Memory

Putting all history into every request increases cost, dilutes the current task, mixes old decisions with guesses, and leaves the Agent unsure which information is trusted or stale. Long context controls how much can be seen temporarily; memory controls what deserves to remain, how it is found, and when it is no longer trusted.

## Layer 1: Working Memory

Working Memory is the current task workspace. Keep the user's goal and constraints, still-valid recent facts, the current plan, completed and pending steps, necessary tool results, and a small amount of relevant long-term memory.

When the token budget is tight, retain recent user constraints, unfinished work, and final decisions. Before truncation, write confirmed preferences, project facts, tool results, decisions with evidence, and follow-up items to a suitable store. Do not preserve hidden reasoning drafts as durable memory.

## Layer 2: Episodic Memory

Episodic Memory records what happened: task goal and outcome, tools and parameters, errors and fixes, user feedback, and the context and result of a decision. Each event should include an ID, timestamp, task, outcome, tools, errors, tags, and source.

Do not store hidden reasoning, source text that can be reread, unverified guesses, transient state, or uncontrolled sensitive copies. Events help find similar work; they do not prove that an old solution still applies. Add TTL to temporary errors, environment state, and short-lived preferences.

## Layer 3: Semantic Memory

Semantic Memory stores what the system currently believes: stable preferences, entities, relationships, configurations, rules, and definitions. Start with JSON or SQLite if that is enough. The data model and write validation matter more than the storage brand.

Facts should include `subject`, `predicate`, `object`, `source`, `observed_at`, `confidence`, and optional `valid_until`. When facts conflict, preserve both pieces of evidence and determine whether the difference is an environment, time, migration, or source-quality issue. Never let last-write-wins silently decide truth.

## Layer 4: Procedural Memory

Procedural Memory stores how to do something: Skills, runbooks, tool orchestration, and reusable methods. One successful event is an episode. Repeated, stable success with clear steps may qualify as a Skill.

A Skill needs a name, trigger, prerequisites, inputs, ordered steps, tools, success and failure conditions, version, scope, recent use, and success rate. Validate new versions on low-risk tasks and keep rollback available. A generated Skill file is not automatically a reliable Skill.

## Layer 5: Forgetting Engine

Forgetting handles expiration, supersession, contradiction, and rollback. Forgetting need not always mean physical deletion: audit data can move to cold storage with reason, operator, and timestamp. Sensitive data requires a stricter deletion policy.

## How the Layers Work Together

1. Create a task and Working Memory.
2. Retrieve relevant Episodic, Semantic, and Procedural memory.
3. Check permissions and freshness before injecting it.
4. Execute tools and produce new event and fact candidates.
5. Persist only candidates that meet the write policy.
6. Let the Forgetting Engine expire data, flag conflicts, and measure Skill performance.

The main control point is the write threshold. Reading old information can improve efficiency; writing one wrong long-term fact can contaminate every later task.

## How to Read Performance Claims

Token, latency, accuracy, and tool-call improvements depend on dataset, model, retriever, baseline, cache, tool design, and evaluation method. Treat playbook percentages as hypotheses and run controlled comparisons with your own metrics.

## Summary

Working Memory handles the current task, Episodic Memory handles experience, Semantic Memory handles facts, Procedural Memory handles methods, and the Forgetting Engine handles lifecycle. Reliable Agents do not remember everything; they see the right information at the right time and know when to stop trusting old information.
