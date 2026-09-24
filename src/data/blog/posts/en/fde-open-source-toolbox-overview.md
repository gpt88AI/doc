---
title: FDE Open-Source Toolbox: Four Projects for Applied AI Delivery
description: A structured guide to four public FDE projects covering field research, value framing, delivery governance, reusable Skills, POC-to-production integration, memory, and Agent collaboration.
date: 2026-09-09
category: Technical Tutorial
tags: [Applied AI, FDE, enterprise AI, AI delivery, value engineering, production operations]
readTime: 13
relatedPath: /docs/blog/applied-ai-field-guide-fde-methodology/
relatedTitle: Applied AI Field Guide: From Real Work to Accepted Outcomes
---

FDE, or Forward Deployed Engineering, sits between product engineering, customer operations, and domain delivery. The work is not simply “bring an Agent to a customer.” It is turning an uncertain workflow into a controlled system that a customer can accept and operate.

This article organizes four public projects:

| Project | Main question |
| --- | --- |
| [Applied AI Field Guide](https://github.com/davidahmann/applied-ai-field-guide) | What should be built and how do we prove value? |
| [FDEOps](https://github.com/suboss87/FDEOps) | How do we record delivery, acceptance, and handoff? |
| [FDEstack](https://github.com/Dan-Cleary/fdestack) | How do we turn discovery and POC work into reusable Skills? |
| [OpenFDE](https://github.com/openfde/openfde) | How do memory, tasks, Agents, and evidence form a loop? |

## Start with the Work, Not the Model

An FDE should begin with the customer's actual workflow:

```text
Observe the work
  → define the accepted outcome
  → choose the smallest mechanism
  → build a vertical slice
  → evaluate with real examples
  → hand over with an operating owner
```

The first question is not “which model?” It is “which result should change, who accepts it, and what evidence proves the change?”

## Applied AI Field Guide

The Field Guide emphasizes field research, value framing, mechanism selection, vertical slices, evaluation, and production operations. It asks who triggers the process, where inputs come from, which steps rely on human judgment, which exceptions are common, where outputs are written back, and who owns recovery.

It recommends comparing deterministic software, optimization, traditional machine learning, retrieval, model calls, constrained Agents, and human review before choosing an implementation. A lifecycle can be summarized as:

```text
Inherit the brief
  → observe and reconstruct the work
  → define value and scope
  → make data decision-ready
  → choose the mechanism
  → build a vertical slice
  → prove it with cases and users
  → launch with an operating owner
```

## FDEOps: Make the Customer Site Hand-off Ready

FDEOps covers delivery context outside the code repository: the brief, success criteria, decision rights, risks, launch, acceptance, and handoff. Its six-stage model is:

```text
Land → Discover → Plan → Ship → Outcome → Close
```

Each stage should answer who decides, what evidence counts, what changed in the customer environment, who accepts the result, and whether the customer can operate the system without the original FDE.

## FDEstack: Turn Delivery Actions into Reusable Skills

FDEstack organizes Claude Code Skills around:

```text
customer-context → discovery → scope → value-frame → poc → integrate → triage → engagement-retro
```

Its important boundary is that a POC does not move directly into production. POC discoveries, decisions, and learnings are written back into structured files; production integration is rebuilt from those facts rather than copying hard-coded parameters, fake data, temporary permissions, or incomplete error handling.

## OpenFDE: Connect Memory, Tasks, and Agents

OpenFDE is a local-first workspace that connects source materials, structured business memory, contextual tasks, Agent execution, result write-back, and evaluation:

```text
Interviews and documents
  → sourced business memory
  → contextual task
  → Agent execution
  → results and discoveries written back
  → evaluation and acceptance
```

For customer-sensitive projects, local-first storage, source tracking, project isolation, and human approval remain independent engineering boundaries. A tool's capability is not permission to process real customer data.

## Recommended Learning Order

1. Read the Applied AI Field Guide for field research, value, vertical slices, and acceptance.
2. Use FDEOps for briefs, success criteria, risks, and handoff records.
3. Use FDEstack to standardize discovery, scope, POC, and retrospectives.
4. Consider an OpenFDE-style workspace when documents and tasks become numerous.

Start with an ordinary Markdown customer directory. Record the task, inputs, output, approver, and unresolved questions before installing a complete toolbox.

## Boundaries

These are public open-source projects. Names, commands, versions, licenses, and dependencies can change. An open-source Skill is not customer authorization; local storage is not a complete privacy program; an Agent that can read data is not automatically allowed to act; a passing test is not proof of customer value; and a working demo is not proof that a customer can operate the system.

## Summary

```text
Why build it?       Applied AI Field Guide
How to deliver?     FDEOps
How to standardize? FDEstack
How to remember?    OpenFDE
```

FDE is the discipline of connecting field facts, business judgment, technical choices, and acceptance evidence. Tools reduce repetition, but they do not replace judgment about workflow, ownership, and real outcomes. This is a structured review of public repositories and does not represent GPT88 endorsement or certification.
