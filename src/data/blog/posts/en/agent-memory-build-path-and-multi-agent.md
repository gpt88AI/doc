---
title: A Seven-Day Agent Memory Path from One Agent to Shared Multi-Agent Memory
description: A seven-day build path for Agent memory, covering event logs, retrieval, facts, ontology, Skills, forgetting, production decisions, and multi-Agent memory boundaries.
date: 2026-09-15
category: Developer Tools
tags: [Agent Memory, AI Agent, Multi-Agent, shared memory, production checklist, ontology]
readTime: 14
relatedPath: /docs/blog/agent-memory-testing-and-production/
relatedTitle: Agent Memory in Production: Forgetting, Tiered Storage, and Testing
---

The easiest way to fail at memory is to buy a complete infrastructure stack before deciding what is worth keeping. A safer path is to make events traceable first, then add facts, Skills, and forgetting, and only afterward expand to shared multi-Agent memory.

## The Seven-Day Minimal Path

### Day 1: Record Episodes

Create an append-only event log containing task, result, tools, errors, resolution, time, and source. The first acceptance test is that every run has a unique ID, failures are recorded, logs contain no hidden reasoning or raw secrets, and data can be exported by time.

### Day 2: Add Retrieval

Start with structured filters for tags, entities, task type, and time. Add vector similarity later. Results need source, time, status, and confidence. Many hits without freshness information is not finished retrieval.

### Day 3: Build Semantic Memory

Separate stable facts from events: project tools, user preferences, and relationships between services. Require source, observation time, and status. SQLite or schema-checked JSON is enough for a first version.

### Day 4: Define an Ontology

List the entities and relationships that actually affect decisions. Keep the first version small and stable: users, projects, services, files, deployments, and tasks are often enough.

### Day 5: Extract Procedural Memory

Turn repeated successful events into Skills with triggers, prerequisites, tools, steps, success criteria, failure paths, and version. One success is not a reusable method.

### Day 6: Implement Forgetting

Add TTL for temporary events, preferences, and environment state; supersession and conflicts for facts; version and rollback for Skills. The question is how old information stops affecting decisions.

### Day 7: Connect the Loop

Wire Working Memory, retrieval, execution, event writes, fact candidates, Skill candidates, approval, and forgetting. Run one real but low-risk workflow end to end and record tokens, latency, tool calls, and recovery.

## Production Decision Framework

For every memory candidate, ask what it is, who will use it, how long it is valid, how it is verified, and what happens if it is wrong. Low-risk search tags may be automatic; facts that change deployment, billing, or permissions need stronger sources and approval.

## Multi-Agent Memory Scopes

1. **Private Memory:** one Agent or user; temporary plans and role preferences.
2. **Shared Memory:** a project or team; approved facts, task state, and operating rules.
3. **Global Memory:** an organization or product; stable definitions and cross-project entities.

The wider the scope, the higher the write threshold. A private error may affect one task; a global error can pollute every retrieval result.

## Shared-Write Conflicts

Record version, source, operator, time, and reason. For core entities, use a single-writer-per-entity rule where other Agents submit proposals. A versioned update can move `v1` to `v2`; if the entity is already at `v2`, return a conflict and let a coordinator merge evidence or request review.

This is safer than asking a model to guess which of two text snippets is true. Time series, deployment state, and inventory should also use domain database transactions and constraints.

## Manager Bot and Shared Ledger

A Manager Bot or coordinator can maintain task ownership, blockers, verified results, approvals, and which memory may propagate. It should route, aggregate state, queue conflicts, and check permissions rather than become a universal decision-maker.

Shared Semantic and validated Procedural Memory are usually more useful than broadcasting every private conversation. Sharing everything increases privacy risk, retrieval noise, and token cost.

## What Should Not Be Shared Automatically

Do not propagate hidden reasoning, unconfirmed customer facts, one-time tokens, temporary machine state, unreviewed Skill drafts, private full conversations, or conclusions supported by one sample into Shared or Global Memory.

When cross-Agent use is necessary, redact, summarize, add source and validity, and enforce access at the storage or retrieval layer instead of relying on a Prompt.

## Summary

The seven-day path builds an evidence chain: first know what happened, then know which facts are stable, then let Agents reuse methods within explicit scopes. Multi-Agent memory is not about sharing more; it is about making scope, writers, validators, and revocation paths clear.
