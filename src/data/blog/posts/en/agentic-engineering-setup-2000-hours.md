---
title: "Agentic Engineering Setup: Lessons from 2,000 Hours of AI Coding"
description: "A practical system for interfaces, model routing, cloud agents, harnesses, skills, worktrees, permissions, and production measurement."
date: 2026-09-02
category: Tutorials
tags: [Agentic Engineering, AI Coding, Agent Harness, Cloud Agent, Skills, Worktrees, Codex, Claude Code, GPT88]
readTime: 15
relatedPath: /docs/blog/ai-native-sdlc-four-reports/
relatedTitle: "AI-Native SDLC: From Vibe Coding to Agentic Engineering"
---

This article adapts David Ondrej's “Agentic Engineering Setup (after 2,000+ hours).” The source describes a personal setup as of the third quarter of 2026. Software, prices, model names, and service capabilities change quickly, so the reusable methods matter more than any fixed recommendation.

## The Goal Is a System, Not More Tools

A mature setup should support this loop:

```text
unified entry point -> model selection -> isolated environment -> agent execution
                    -> automated verification -> independent review -> measurement
```

The core principles are to coordinate several agents, keep long tasks running away from a laptop, control permissions and recovery, and turn repeated actions into aliases, snippets, skills, and automation.

## Interface and Agent State

A unified interface can place Codex, Claude Code, Pi, Cursor CLI, OpenCode, and other agents behind one workflow. Its value is reduced context switching, not loyalty to a particular application. Useful capabilities include visible session state, queued messages, worktrees, and exportable configuration.

Terminal multiplexers and embedded browsers work well for a small number of parallel tasks. At larger scale, the problem changes from window management to scheduling. Each agent needs a priority, state, owner, and next action. States such as `running`, `idle`, `done`, and `blocked` make unfinished review work visible.

## Model Routing Is a Budget Decision

Choose models by capability, speed, cost, and task risk. Planning and architecture can use a model with strong idea generation; deep debugging and risky migrations deserve a larger reasoning budget; routine edits can use a fast model; visual work may need a model with stronger frontend feedback.

```text
task risk x complexity x feedback cost x acceptable latency = model budget
```

Do not treat API price as the entire cost. Compliance, concurrency, observability, data isolation, and vendor lock-in matter for teams and products. Build a task-to-model routing table, then compare it with real usage.

## Cloud Agents and Self-Hosted VPSs

Local agents are limited by device resources, sleep, network interruptions, and workspace management. Cloud environments provide persistence, isolation, remote access, and parallel capacity, but hosted systems can lock in credentials, history, and runtime configuration.

A VPS can preserve persistence while reducing product lock-in:

```text
VPS -> SSH -> Agent runtime -> Node.js / Python / Git
                  -> Pi, Codex, Claude Code
                  -> isolated workspaces and sessions
```

The tradeoff is operational responsibility. Use a dedicated system user, least privilege, protected secrets, reviewed installation scripts, and logs of commands and file changes. “The agent can execute it” is not a reason to grant root access.

## Harnesses and Skills

The harness controls what the model can read, which tools it can call, how commands run, and how sessions persist. Minimal harnesses are transparent and easy to customize; self-improving harnesses can explore unfamiliar work but require review, version control, and rollback.

Aliases such as `cc`, `cx`, `review`, and `ship` reduce repetitive input, but dangerous commands should still show their targets and retain confirmation or an audit record. Skills are most valuable when they encode repeated workflows: multi-model review, environment setup, release checks, or domain-specific investigation.

## Worktrees, Permissions, and Measurement

Worktrees isolate parallel tasks and reduce accidental file overlap. Permissions should be explicit: read-only exploration, bounded write scopes, and human approval for production writes, deletion, credential changes, and deployment.

Measure more than lines of code or tokens. Track time to first useful result, rework, review findings, failed runs, recovery time, and the share of tasks that pass reproducible gates. The objective is a dependable operating system for engineering, not a larger collection of agent windows.
