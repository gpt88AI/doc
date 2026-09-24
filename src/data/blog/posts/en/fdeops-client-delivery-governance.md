---
title: FDEOps: Manage Customer-Site AI Delivery, Acceptance, and Handoff
description: A structured guide to FDEOps delivery governance, including briefs, success criteria, decision rights, risks, launch, acceptance, handoff, and local customer records.
date: 2026-09-09
category: Technical Tutorial
tags: [FDEOps, FDE, enterprise AI, customer delivery, project acceptance, AI project management]
readTime: 10
relatedPath: /docs/blog/fde-open-source-toolbox-overview/
relatedTitle: FDE Open-Source Toolbox: Four Projects for Applied AI Delivery
---

Enterprise AI projects often fail in delivery rather than implementation: the customer goal is unclear, the acceptance owner was never confirmed, and nobody recorded who is responsible after launch.

[FDEOps](https://github.com/suboss87/FDEOps) has a clear boundary: an AI coding Agent handles development in the customer repository; FDEOps records the customer delivery work outside the code.

## It Records More Than Ordinary Project Management

In addition to tasks, owners, and dates, customer delivery needs to capture whether the stated desire matches the real problem, who has decision and acceptance rights, what counts as complete, which data is allowed, which actions require approval, whether the customer can operate after launch, and how to roll back or escalate.

## The Six-Stage Delivery Model

```text
Land → Discover → Plan → Ship → Outcome → Close
```

### Land: Confirm the Brief and Decision Makers

Before development, identify who raised the problem, who is affected, who can approve data and access, and who will sign off. Without an acceptance owner, “done” becomes an internal team judgment.

### Discover: Verify the Brief Against Real Work

Observe where inputs come from, which systems are used, which unwritten rules matter, and who handles exceptions. Keep customer statements separate from observed facts so unverified assumptions do not silently become requirements.

### Plan: Work Backward from Evidence

Write what would prove success before listing engineering tasks:

```text
Goal: support agents answer common product questions with a knowledge assistant
Evidence: 18 of 20 sanitized real questions cite the correct document version;
2 uncertain questions clearly route to a human; the owner accepts the result.
```

### Ship: Prove It in the Customer Environment

Record test-environment results, production changes, pre-launch checks, rollback steps, approval, and post-launch observation. Deployment is not the same as delivery.

### Outcome: Record the Promise, Measure, and Sign-off

Ask what was promised, what was measured, and who accepted the result. Prefer task completion, manual edits, processing time, error type, usage frequency, and uncovered boundaries over “the customer liked it.”

### Close: Leave the Customer Able to Operate

Handoff should include a runbook, account and permission ownership, data-update process, monitoring, incident handling, rollback, contacts, known limits, and unfinished work. If the system depends on the original FDE's memory, the handoff is incomplete.

## Local Records and Permission Boundaries

FDEOps emphasizes local customer records and confirmation before writing. That helps prevent accidental capture, but it is not a complete compliance program. Define what may enter the directory, what must be redacted, which files cannot be read by a model, how data is backed up and deleted, how customers are isolated, and how team access is minimized.

Local-first is a storage strategy, not a complete security solution.

## Good Fits and Non-Goals

FDEOps fits parallel customer projects, handoffs between sales, FDE, and engineering, mixed-up POC and production phases, changing customer contacts, and post-project review. It does not replace ticketing, identity, production monitoring, or contracts. It manages delivery context and evidence.

## Summary

FDEOps turns delivery from personal memory into a staged process with records, acceptance, and handoff. Commands and project structure change with the repository; use the [current FDEOps README](https://github.com/suboss87/FDEOps). This article is a structured interpretation, not official GPT88 endorsement.
