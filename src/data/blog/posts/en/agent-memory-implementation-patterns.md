---
title: Agent Memory Implementation with JSONL, SQLite, YAML, and a Complete Execution Loop
description: Minimal implementation patterns for episodic JSONL, semantic SQLite, procedural YAML, configuration, and a Memory-Aware Agent Loop.
date: 2026-09-15
category: Technical Tutorial
tags: [Agent Memory, JSONL, SQLite, YAML, Agent Loop, AI Agent, Skill]
readTime: 17
relatedPath: /docs/blog/agent-memory-5-layer-architecture/
relatedTitle: The Five-Layer Agent Memory Architecture: Help Agents Remember and Learn Continuously
---

A memory system does not need to start with a vector database or knowledge graph. For many single-Agent and internal tools, JSONL event logs, a SQLite fact table, YAML Skill files, and an explicit execution loop are enough to test the core assumptions.

This article adapts the implementation section of *Agent Memory: The 5-Layer Playbook*. The examples are illustrative, not repository commands or official framework APIs. Production still needs authentication, encryption, concurrency control, audit, backup, and tests.

## Define Configuration and Boundaries

Keep lifecycle rules in configuration instead of hiding them in a Prompt:

```yaml
memory:
  working:
    max_tokens: 12000
    keep_recent_turns: 8
  episodic:
    backend: jsonl
    ttl_days: 90
  semantic:
    backend: sqlite
    require_source: true
    require_confidence: true
  procedural:
    backend: yaml
    promotion_min_successes: 3
  forgetting:
    run_every_hours: 24
```

Configuration should define owner, permissions, TTL, archival, and failure handling for each layer. `max_tokens` is a budget, not a guarantee that the model understands that much context.

## Episodic Memory: Start with JSONL

JSONL is appendable, inspectable, and easy to audit in a prototype. Each line should be one complete event with ID, time, task, outcome, tools, errors, resolution, tags, and source.

```json
{"id":"evt_20260915_001","timestamp":"2026-09-15T09:00:00Z","task":"fix image build failure","outcome":"success","tools":["npm","git"],"errors":["missing asset"],"resolution":"restored static asset and rebuilt","tags":["build","frontend"],"source":"conversation:abc"}
```

Store summaries and source pointers, not large PDFs, raw chats, or secrets. Production additions include file locking, corrupt-line handling, concurrent append, pagination, redaction, compression, and rotation. JSONL is a good event source or small store, not a complex relational query engine.

## Semantic Memory: A SQLite Fact Table

```sql
CREATE TABLE facts (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  predicate TEXT NOT NULL,
  object TEXT NOT NULL,
  source TEXT NOT NULL,
  observed_at TEXT NOT NULL,
  confidence REAL NOT NULL DEFAULT 0.5,
  valid_until TEXT,
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE INDEX facts_lookup ON facts(subject, predicate, status);
```

Validate subject, predicate, object, source, and time before writing. Confidence is not a magic truth score; consider a separate verification status, verifier, or evidence link.

Filter expired facts when reading:

```sql
SELECT subject, predicate, object, source, confidence
FROM facts
WHERE subject = ?
  AND predicate = ?
  AND status = 'active'
  AND (valid_until IS NULL OR valid_until > CURRENT_TIMESTAMP)
ORDER BY confidence DESC, observed_at DESC;
```

Do not equate “latest” with “correct.” Return evidence and status when facts conflict so the application can request review.

## Use an Ontology to Constrain Facts

```yaml
entities:
  - user
  - project
  - service
  - deployment
relations:
  - name: owns
    from: user
    to: project
  - name: contains
    from: project
    to: service
  - name: deployed_as
    from: service
    to: deployment
```

An ontology stabilizes vocabulary, direction, entity types, and query behavior. Start with concepts that actually affect retrieval and decisions; expand only after conflicts and queries become clear.

## Procedural Memory: Skills Must Be Executable

```yaml
name: diagnose_frontend_build
description: diagnose a frontend build failure and preserve minimal evidence
trigger:
  - build failed
  - missing asset
preconditions:
  - repository is available
  - package manager is known
tools:
  - git
  - package-manager
steps:
  - capture the exact error and current commit
  - inspect the referenced file and import path
  - run the narrowest relevant check
  - apply the smallest fix
  - rerun lint and build
success:
  - targeted check passes
  - build passes
failure:
  - preserve error output
  - stop before release
version: 1
```

Steps should name real tools and observable outputs. “Make sure everything works” is not a test. Define the exact file state, command, route, or deployment check.

## Promote Episodes into Skills Deliberately

Require repeated similar tasks, at least three successful runs, reproducibility by another executor, clear tool and input boundaries, and recorded failure and rollback behavior. Preserve source event IDs and calculate success by task type, version, and time window.

## The Memory-Aware Agent Loop

```text
user goal
  → build Working Memory
  → retrieve Episodic / Semantic / Procedural memory
  → check permission and freshness
  → plan and execute tools
  → write event and fact candidates
  → validate, approve, persist, or reject
  → run forgetting and record metrics
```

Separate model proposals from durable writes. This lets the system inspect a candidate, reject sensitive or stale content, and keep an audit trail before it can influence future work.

## Summary

Small, explicit storage patterns are often enough to validate memory semantics before adding complex infrastructure. Start with traceability and write boundaries; add vector search or a graph only when the workload proves it is needed.
