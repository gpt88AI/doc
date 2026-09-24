---
title: My Complete AI Programming Workflow: From Agent Selection to High-Quality Product Delivery
description: A practical AI development workflow covering coding-Agent selection, environment setup, product and technical planning, implementation, verification, rollback, and review.
date: 2026-09-23
category: Developer Tools
tags: [AI programming, coding Agent, Codex, Claude Code, OpenCode, Vibe Coding, product delivery]
readTime: 16
relatedPath: /docs/blog/minimum-agentic-coding-workflow/
relatedTitle: The Minimal Agentic Coding Workflow: Plan, Patch, Verify, Learn
---

AI programming is not “send a requirement to a model and wait for code.” A product becomes deliverable only when a vague idea is turned into a clear plan, implemented in a recoverable environment, and verified with reproducible evidence.

This article is adapted from the YouTube video [My Complete AI Programming Workflow](https://www.youtube.com/watch?v=KJybu1Y2tyY), published by Mark's Technical Workshop on August 29, 2026. The public title and chapter structure were available, but not a stable full transcript. The workflow below is a structured interpretation, not a word-for-word transcript.

## The Delivery Chain

```text
idea
  → choose the right coding Agent
  → prepare a recoverable environment
  → freeze product goals and acceptance
  → design technical boundaries
  → implement and verify in stages
  → review, correct, and deliver
```

| Stage | Uncertainty to reduce | Minimum artifact |
| --- | --- | --- |
| Agent selection | Who should do what? | Tool choice and task boundary |
| Environment | Where is the code and how does it run? | Startable project baseline |
| Product plan | What counts as done? | Flow, scope, acceptance |
| Technical plan | How can it work reliably? | Modules, data flow, failure handling |
| Implementation | Did the change work? | Running feature and evidence |
| Review | How can the next run be safer? | Lessons and reusable rules |

## Choose an Agent by Task, Not Brand

Reading an unfamiliar repository needs search and context understanding. Cross-file work needs planning and dependency tracking. Long jobs need resumability and readable logs. Reviews need boundary and test awareness. Prototypes need low-friction feedback.

Evaluate execution surface, context access, modification and rollback support, and verification capabilities. “Can write code” is not the same as “can deliver a product.” The useful loop is:

```text
understand → plan → modify → verify → report evidence
```

Record which tasks are stable, which operations need approval, how failures recover, and which dependencies the tool requires.

## Prepare a Recoverable Environment

Before implementation, confirm the repository, branch, package manager, startup and test commands, safe environment-variable examples, passing baseline, and existing uncommitted changes.

```text
install dependencies
  → start the project
  → open the core page or run the core test
  → record the baseline
```

Project instructions should state editable paths, generated or external paths, validation commands, approval boundaries, and the evidence required at completion. A recoverable workspace also needs a way to inspect partial edits and return to a known-good Git state.

## Define the Product Before the Implementation

Write who uses the feature, entry point, inputs, outputs, failure behavior, human approval points, and completion conditions. “Build an AI content tool” is too broad. A useful flow is:

```text
user enters a topic
  → system proposes three structures
  → user selects one
  → system drafts and flags facts to verify
  → user approves and exports Markdown
```

Freeze the smallest version: required path, manual parts, explicit non-goals, fixed samples, and the first value hypothesis. A vague scope invites an Agent to add unrelated code.

## Technical Plan and Staged Implementation

The technical plan should identify modules, data flow, external services, permissions, failure states, observability, and rollback. Implement vertical slices rather than generating the entire product in one pass.

Each slice should end with a check: type checking, focused tests, a route audit, a screenshot, or an API probe. Keep the diff small enough that a reviewer can explain why every changed file is needed.

## Review and Delivery

The final pass should answer:

- Does the implemented flow match the product plan?
- Does the baseline still work?
- Are errors visible and recoverable?
- Were generated files and unrelated changes left untouched?
- Can another person reproduce the validation?
- Are external side effects gated and logged?

AI programming becomes reliable when the Agent participates in a delivery loop rather than only a code-generation step.

## Summary

High-quality AI delivery is a sequence of reduced uncertainties: choose a bounded Agent, establish a runnable baseline, freeze the product contract, implement in small slices, verify each change, and preserve evidence for the next iteration.
