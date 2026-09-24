---
title: OpenFDE: Connect Customer Interviews, Business Memory, and Agent Tasks into One Evidence Chain
description: An introduction to OpenFDE's local-first FDE workspace, covering source citations, business ontology, task state, Agent context, evaluation, acceptance, and execution reports.
date: 2026-09-09
category: Developer Tools
tags: [OpenFDE, FDE, Agent, enterprise knowledge, local-first, business memory, evaluation]
readTime: 11
relatedPath: /docs/blog/fdestack-fde-workflow/
relatedTitle: FDEstack: Turn Customer Discovery, POCs, and Production Integration into a Reusable Workflow
---

FDE work often has three disconnected layers: knowledge lives in meetings and chats, tasks live in people's heads, and acceptance is reduced to “looks good.” OpenFDE tries to bring them into one local-first workspace.

[OpenFDE](https://github.com/memovai/openfde) is built around this loop:

```text
Import material
  → structured business memory
  → traceable task
  → Agent execution
  → write-back
  → evaluation and acceptance
```

## Why a Normal Knowledge Base Is Not Enough

Useful enterprise AI knowledge is not a pile of documents that can be joined arbitrarily. It includes:

- what a department is trying to achieve;
- the steps in the current workflow;
- which data sources are trusted by whom;
- which constraints cannot be violated;
- why a decision was made;
- which pain points have been validated; and
- who owns acceptance for a task.

A vector database may help an Agent find similar text, but it does not by itself explain which business object the text represents, whether it is current, or which decision it supports.

## Provenance Is a Write Condition

OpenFDE emphasizes provenance: content without a source URI should not enter the formal fact record directly. When a fact is retrieved, the original citation should still be reachable.

That matters in enterprise Agent work. When someone asks why a customer rejected a proposal, the system should be able to return to the relevant interview excerpt instead of producing an untraceable summary.

Possible sources include:

- interview records;
- meeting notes;
- customer files;
- system pages;
- research findings; and
- discoveries made during Agent execution.

Citations do not prove that a fact is correct. They make it possible to see where the fact came from, when it was recorded, and whether it needs review.

## Business Ontology: Organize Memory Around the Work

OpenFDE organizes information around FDE concepts such as goals, workflows, decisions, constraints, data sources, and pain points.

That is closer to how delivery work is discussed than a document-title hierarchy. Management asks which constraints affect a business goal; an Agent asks which context is required to complete a task.

A customer fact might look like this:

```text
Business goal: reduce invoice exception handling time
Workflow: invoice review
Pain point: exception rules depend on senior employee experience
Data sources: ERP, supplier email, historical review records
Constraint: high-value payments require human approval
Acceptance owner: finance operations lead
Source: interview record and review samples
```

## From Memory to Tasks

OpenFDE does more than retrieve material. It turns business memory into assignable work. A task should include:

- an objective;
- success criteria;
- sources;
- relevant constraints;
- an owner or Agent;
- current status; and
- an acceptance method.

Before execution, the `context` command assembles related facts and constraints into a context package. The Agent receives the smallest relevant, source-backed set of information instead of the entire customer repository.

## Agent Execution Must Write Back

If an Agent only reads, the system returns to the state where experience exists only inside a session. The OpenFDE loop requires the Agent to write newly discovered facts, results, and problems back to the ledger.

```text
memory → task → context → execute → finding → memory
```

Write-back should distinguish:

- original customer facts;
- Agent observations;
- unverified inferences; and
- conclusions accepted by a human.

An Agent's guess must not be promoted automatically into a customer fact.

## Evaluation Is Better Than Subjective Confidence

OpenFDE places task standards and evaluation results in the same audit chain. An enterprise project should prepare at least:

- representative inputs;
- acceptable outputs;
- errors that must not occur;
- human review rules; and
- pass, return, and reprocess states.

For example, an information-retrieval task could require:

```text
Across 20 anonymized real questions:
- 18 cite the correct version of the source material;
- questions without evidence receive an explicit refusal;
- payment-related actions are escalated to a human; and
- every result keeps a traceable citation.
```

This is easier to discuss and regression-test after a model, prompt, or source change than “the answer looks accurate.”

## The Boundary of Local-First

Local-first is useful when a customer does not want the complete work memory in an external SaaS, but it still requires explicit handling of:

- local file permissions;
- backups and device loss;
- customer-data redaction;
- content sent to external model services;
- isolation between customer projects; and
- access scope when sharing reports.

“Stored locally” does not mean every operation runs locally, and it does not automatically satisfy a customer's compliance requirements. During extraction and generation, document exactly what is sent to model providers.

## Good Fits

- interview material is extensive but the delivery team needs durable citations;
- customer projects need tasks assigned to multiple Agents;
- delivery results must retain sources and an audit trail;
- management needs a current view of project progress; or
- one engagement's learning should support later tasks.

## Summary

OpenFDE is not mainly about making a larger knowledge base. It turns source-backed material into business memory, then uses that memory to support traceable tasks and evaluable execution.

It is better understood as an FDE workbench than as a chat application detached from delivery. Commands, dependencies, and features change over time, so read the [current OpenFDE README](https://github.com/memovai/openfde) before use. This article is a structured interpretation and does not represent official GPT88 endorsement.
