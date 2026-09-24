---
title: Applied AI Field Guide: How FDE Moves from Real Work to Accepted Outcomes
description: An overview of the Applied AI Field Guide methodology: field research, value framing, mechanism selection, vertical slices, evaluation, acceptance, and production operations.
date: 2026-09-09
category: Technical Tutorial
tags: [Applied AI, FDE, enterprise AI, AI delivery, value engineering, production operations]
readTime: 12
relatedPath: /docs/blog/fde-open-source-toolbox-overview/
relatedTitle: FDE Open-Source Toolbox: Four Projects for Applied AI Delivery
---

Many AI projects begin with a model: choose a popular model, design an Agent, and then look for a business scenario. The [Applied AI Field Guide](https://github.com/davidahmann/applied-ai-field-guide) proposes the reverse: observe real work and acceptance criteria first, then choose the smallest mechanism that can complete the task safely.

## Ask About the Outcome, Not the Model

“We want an AI Agent” is not yet an implementable requirement. Ask:

- Which process is slowest or most error-prone?
- Who performs it, and what are the inputs and outputs?
- Which outcome is worth changing?
- Who decides whether it improved?
- Are the data, permissions, and responsibilities available?

```text
Vague goal: use AI to review invoices

Verifiable goal:
Generate cited anomaly candidates for low-risk, rule-defined invoices.
High-value payments must never be auto-approved.
An accounts-payable reviewer can approve or reject in the existing system.
```

The second version contains scope, boundaries, and acceptance.

## Field Research Is Not a Requirements Checklist

The real process is usually distributed across systems, spreadsheets, email, chat, and experienced employees. Observe a representative case from start to finish with the people who actually know the workflow.

Record who triggers the process, where inputs originate, which steps rely on judgment, which exceptions recur, where results are written back, who uses them next, and who handles recovery. A management process diagram is a starting point, not a substitute for field evidence.

## Value Framing: Not Every Automation Is Worth Building

Evaluate frequency, time per task, error cost, data availability, process stability, adoption difficulty, permission risk, compliance risk, and ownership. The goal is not to invent a precise ROI number. Separate measured numbers, customer statements, estimates, and the person who will confirm each assumption.

## Choose the Smallest Mechanism

Compare mechanisms instead of assuming every problem needs an Agent:

```text
Deterministic rules
  → database query
  → retrieval
  → traditional model
  → foundation-model call
  → constrained Agent workflow
  → human review
```

Stable, structured tasks may be more reliable in ordinary software. Unstructured documents may need retrieval and generation. Add Agent autonomy only when the task truly requires multi-step decisions and tools.

> Tokens are an input. Autonomy is a design choice. Accepted outcomes are the product.

## A Vertical Slice Beats a Grand Platform

The first phase should not be a company-wide AI platform. Select one end-to-end slice:

```text
One role
  + one real workflow
  + one controlled data set
  + one explicit outcome
  + one acceptance owner
```

The slice must cover input through result. That is how permissions, data quality, human takeover, and write-back problems become visible early.

## Engineering Validation and Business Acceptance

Technical tests show that code behaves as declared. They do not prove that customers will use it. A deliverable AI feature needs both:

**Engineering validation:** parsing, tool calls, errors, timeouts, permissions, logs, and rollback.

**Business validation:** task completion, reduced rework, business-rule compliance, continued use, and explicit approval from the acceptance owner.

A passing test does not finish the project, and a liked demo does not prove production readiness.

## Production Is Still FDE Work

After launch, identify who maintains knowledge and rules, handles exceptions, reruns evaluations, manages model or vendor changes, retires the system, and switches back to manual work when needed. An Agent without an operating owner becomes a system nobody trusts, changes, or decommissions.

## Summary

The Field Guide is a decision framework for FDE: start from the work, define the problem with evidence, validate value with a small slice, constrain implementation with acceptance criteria, and hand the system to someone responsible for operations. It is public methodology, not a certification of a production system. Use the [current repository](https://github.com/davidahmann/applied-ai-field-guide) for examples, code, and licensing.
