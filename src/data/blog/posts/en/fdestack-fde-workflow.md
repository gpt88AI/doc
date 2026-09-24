---
title: FDEstack: Turn Customer Discovery, POCs, and Production Integration into a Reusable Workflow
description: How FDEstack's Claude Code Skill Pack connects customer context, discovery, scope, value framing, POCs, production integration, triage, and retrospectives.
date: 2026-09-09
category: Developer Tools
tags: [FDEstack, FDE, Claude Code, Agent Skill, POC, enterprise AI]
readTime: 11
relatedPath: /docs/blog/fdeops-client-delivery-governance/
relatedTitle: FDEOps: Manage Customer-Site AI Delivery, Acceptance, and Handoff
---

FDE repetition is often not coding. Every customer requires the team to reconstruct context, ask the same questions, rewrite scope, explain value, and decide how a POC should become production.

[FDEstack](https://github.com/Dan-Cleary/fdestack) is a Claude Code FDE Skill Pack that turns those actions into a reusable workflow.

## Eight Skills, One Delivery Chain

```text
customer-context
  → discovery
  → scope
  → value-frame
  → poc
  → integrate
  → triage
  → engagement-retro
```

### `customer-context`: Restore the Field Before Acting

Load blockers, unknowns, recent changes, historical learning, and suggested next steps. Restoring context is safer than starting an existing project with “what should we do today?”

### `discovery`: Turn Source Material into Business Facts

Inputs may include meeting notes, interviews, RFPs, sales briefs, handoff material, or raw notes. Extract the stack and constraints, stakeholders, stated problem, inferred problem, unresolved questions, and conflicts with existing records.

### `scope`: Turn Wishes into Binary Success Criteria

“Improve efficiency” cannot be delivered directly. Ask what can be built this week, who verifies it, what the expected result is, how long it should take, and what counts as pass or fail. Unanswerable questions belong in `unknowns.md` rather than disappearing under schedule pressure.

### `value-frame`: Make Efficiency Claims Explainable

The value frame is not a machine for manufacturing a beautiful ROI number. Choose a primary lever such as time, errors, money, scale, or risk, and mark each number as measured, customer-stated, or estimated. This lets customers debate assumptions instead of an untraceable total.

### `poc`: Move Quickly Without Calling It Production

A POC answers whether a direction is worth pursuing. Hard-coded values, temporary data, and incomplete error handling may be acceptable during exploration, but the POC must write back technical facts, design decisions, and learnings that can help future projects.

## The Critical Boundary: POC Does Not Enter Production Directly

FDEstack's `/integrate` does not read the customer POC directory. It reads structured write-back:

```text
POC discoveries
  → stack.md
  → decisions.md
  → learnings.jsonl
  → production integration rebuilt from facts
```

This Cleanroom Contract prevents production from inheriting hard-coded parameters, fake data, temporary permissions, incomplete error handling, or demo-only shortcuts. If production lacks information, the gap appears as incomplete POC write-back instead of being hidden by copied code.

## `integrate`: Rebuild from Facts

Recheck whether production data matches the POC, permissions and audit trails are complete, failures have a fallback, metrics remain observable, someone owns knowledge and configuration, and the customer can take over the system.

## `triage`: Prioritize Multiple Customers Explicitly

When several customers are active, the loudest recent message should not set the order. Triage should expose blockers, unknowns, and near-term milestones. It supports management judgment; it does not replace it with an automatic ranking.

## How to Adopt It

Start with:

```text
customer-context → discovery → scope
```

Add value framing, POC, and integration after the team consistently records facts and success criteria. Skills create value through continuous write-back, not installation alone.

## Summary

FDEstack's durable contribution is turning customer delivery from a sequence of one-off inventions into a repeatable method. The most transferable principles are that customer context must be recoverable, vague goals must become explicit unknowns, and POC learning must be structured before production work begins.

Commands and directories change with the repository. Read the [current FDEstack README](https://github.com/Dan-Cleary/fdestack) before use. This article does not represent GPT88 support or compatibility assurance.
