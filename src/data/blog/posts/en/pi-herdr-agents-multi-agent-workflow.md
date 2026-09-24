---
title: Pi Agent Multi-Agent Practice: Build a Supervised AI Team with pi-herdr-agents
description: A practical guide to Pi Agent, pi-herdr-agents, subagents, workflows, Herdr surfaces, parallel execution, Git worktrees, roles, and review boundaries.
date: 2026-09-20
category: Developer Tools
tags: [Pi Agent, pi-herdr-agents, Herdr, multi-Agent, subagent, workflow, Git worktree, Agent engineering]
readTime: 18
relatedPath: /docs/blog/jev-full-tutorial-three-demos/
relatedTitle: Jev Tutorial: Drive Browsers, Memory, and Prediction with a Fast Decision Model
---

Putting several Agents in one project does not automatically create a reliable team. The hard parts are task ownership, write boundaries, parallel dependencies, result return, Git isolation, and recovery.

This article adapts the Pi Agent and `pi-herdr-agents` tutorial from Chang's Technology Workshop and cross-checks the public [repository](https://github.com/giuseppecrj/pi-herdr-agents). It is not a transcript; repository commands and capabilities may change.

## The Core Boundary

`pi-herdr-agents` runs Pi subagents in independent Herdr surfaces and coordinates dispatch, supervision, recovery, and optional worktrees:

```text
main Agent decomposes goal
  → scout gathers facts and paths
  → worker implements in a limited scope
  → reviewer checks behavior and risk
  → main Agent verifies evidence and decides delivery
```

The important boundary is that five Agents should not casually modify one checkout at once. A worktree isolates the Git checkout, not databases, ports, caches, cloud resources, or permissions.

## Pi, Herdr, and the Plugin

| Component | Responsibility | Not the same as |
| --- | --- | --- |
| Pi | Agent runtime, model calls, tools, sessions | Automatic team management |
| Herdr | Terminal surfaces, panes, tabs, processes | Git isolation |
| `pi-herdr-agents` | Dispatch, supervision, result return, optional worktrees | An automatic project manager |

The child process inherits the current user's permissions. Review package source, dependencies, and local access before installation.

## Installation and Lifecycle

The public package can be installed with:

```bash
pi install npm:pi-herdr-agents
```

Local or one-run variants:

```bash
pi install -l npm:pi-herdr-agents
pi -e npm:pi-herdr-agents
```

Start Herdr before Pi, then reload or restart Pi after installation. A `started` response is not completion. The lifecycle is start, observe, wait for completion, read bounded results, and let the parent continue.

## Roles: Scout, Worker, Reviewer

**Scout** reads only: call paths, configuration, tests, risks, and evidence. **Worker** receives an approved goal, allowed files, verification command, and stop condition. **Reviewer** checks regressions, edge cases, security, tests, and evidence quality with file and line references.

Planner and coordinator roles can organize phases, but they do not authorize every child to write to the same checkout.

## Parallelize Only Independent Work

```text
scout authentication flow
scout session schema
scout test coverage
        ↓
main Agent consolidates
        ↓
worker implements approved slice
        ↓
reviewer checks the diff
```

Good parallel tasks have stable inputs, no write conflict, and independent output. Dependent changes should remain sequential.

## Supervision and Recovery

Every child task should expose scope, status, files changed, commands run, failures, and remaining uncertainty. The parent should not poll indefinitely or announce success from a process-start event.

Keep write tasks in a named worktree, run focused checks there, and review the diff before merging. External side effects need separate approval and idempotency; a worktree cannot undo a sent message, database mutation, or cloud deployment.

## Summary

Multi-Agent reliability comes from scheduling and authority boundaries: read-only investigation, isolated implementation, independent review, explicit result return, and final verification by the parent. The plugin can coordinate processes, but it cannot replace engineering judgment about dependencies, permissions, or release evidence.
