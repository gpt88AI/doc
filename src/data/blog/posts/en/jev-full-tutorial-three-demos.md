---
title: Jev Tutorial: Drive Browsers, Memory, and Prediction with a Fast Decision Model
description: A structured tutorial based on three Jev demos covering voice-controlled browsing, memory filtering, probability prediction, typed decisions, calibration, and production boundaries.
date: 2026-09-20
category: Technical Tutorial
tags: [Jev, browser Agent, Agent memory, probability prediction, Choice, Score, structured output]
readTime: 16
relatedPath: /docs/blog/jev-system-one-model-practical-guide/
relatedTitle: Jev / System One Model in Practice: Turn a Language Model into a Decision Function
---

This tutorial organizes three Jev demos: voice-controlled browser actions, “dehydrating” long-term memory, and a YouTube probability predictor. The reported timings and prices belong to the original demonstration and are not independent benchmarks.

## Jev Is Not a Better Chat Model

A general model produces a token sequence even when the application needs only one option. Jev declares the answer space first and returns a typed decision:

- `Choice`: select one option, such as a DOM element;
- `Score`: rate content or a candidate; and
- `Boolean` or a probability judgment: determine whether a proposition holds.

```text
state / event
  → declare questions and legal outputs
  → Jev returns Choice / Score / Boolean
  → code checks result and confidence
  → execute, fall back, or ask a human
```

The model does not replace a general Agent, and probability is not fact. Jev is a fast decision layer between structured state and application code.

## Demo 1: Voice-Controlled Browsing

The first demo combines voice input, browser state, and Jev Choice. Speech recognition segments the user's request; the browser exposes DOM or accessibility state; Jev chooses the next action.

```text
voice stream
  → speech recognition and segmentation
  → current task and page state
  → dynamic action space
  → Jev selects an action
  → browser executes and returns new state
```

The action space should contain finite choices such as selecting origin, selecting destination, opening the date picker, or submitting a search. The model should not freely invent an action over the entire webpage.

### DOM First, but Not DOM Only

Standard forms, buttons, links, and selects work well with DOM or an Accessibility Tree. Canvas-heavy layouts, maps, overlays, visual sorting, and pages where DOM and pixels disagree still need screenshots or a vision model.

```text
structured form → DOM / Accessibility Tree
visual layout → screenshot / vision model
conflict → pause and confirm state
```

Voice changes how intent is expressed; it does not reduce the risk of browser actions. Read-only searches may run automatically, while submission, messages, purchases, and account changes require confirmation.

## Demo 2: Dehydrating Long-Term Memory

Long context increases cost and retrieval burden, while aggressive summarization can remove exact preferences, constraints, and technical details. The demo uses Jev to score whether a new message deserves long-term storage and what type of memory it represents.

```text
new message
  → Jev judges importance and type
  → temporary context continues in the current task
  → low-value content stays out of durable memory
  → valuable content keeps its source and enters the next write stage
```

### A Score Is Not Deletion Authorization

Use explicit states:

| State | Handling |
| --- | --- |
| `candidate` | Keep the source and wait for policy or human review |
| `accepted` | Store with source and timestamp |
| `rejected` | Keep in short-term context but omit from durable memory |
| `expired` | Remove under an explicit retention policy |

Security rules, payment information, identity data, and content the user explicitly asks to remember must not be governed only by a model score. Keep the original wording where exact constraints matter.

## Demo 3: A YouTube Probability Predictor

The third demo uses video metadata, titles, descriptions, channel information, or other structured features to estimate which candidates deserve deeper analysis.

```text
video metadata
  → uniform batch inputs
  → concurrent decisions
  → probabilities / Score / Choice
  → threshold bands
  → deeper analysis for a small candidate set
```

This is a two-stage architecture: a low-latency decision layer handles the large candidate pool, while a general model handles high-potential, borderline, or explanation-heavy cases.

Probability is useful for ranking and triage, not a promise of virality. Use labeled data, time-based splits, calibration curves, precision, recall, and slices by channel and content type.

## The Shared Architecture

| Scenario | State | Jev output | Next system |
| --- | --- | --- | --- |
| Browser control | DOM, task, allowed elements | `Choice` | Browser executor |
| Memory filtering | New message and memory rules | `Score` / label | Memory lifecycle |
| YouTube prediction | Video features and target | Probability / `Score` | Ranking and analysis |

```text
user goal / business rules
  → normalize state
  → fast decision layer
  → threshold, policy, permission, and idempotency checks
  → general model or deterministic executor
  → record result, cost, latency, and human takeover
```

## Do Not Copy Only the API Example

Before implementation, confirm the current SDK or gateway model ID, authentication, request shape, response types, errors, and billing. A useful internal contract should record the state, question, output type, options, threshold, model, latency, request ID, and fallback path.

Production telemetry should include model ID, input and state versions, latency, retries, estimated cost, fallback, and human result. Without it, a bad click, memory write, or prediction cannot be traced to state extraction, model judgment, threshold, or execution.

## Which Numbers Can Be Promised

Video chapters prove what was discussed. A single demo proves that one run occurred. An author's report preserves attribution. A production benchmark needs a public or reproducible script, fixed data, repeated trials, failure definitions, and complete cost accounting.

Measure P50/P95, action failure, page-change recovery, memory false-accept and false-reject rates, calibration error, and review volume instead of repeating an isolated headline number.

## Checklist

- [ ] Every decision has legal outputs and an `unknown` or human-review path.
- [ ] Browser actions include a target, parameters, state version, and risk level.
- [ ] Memory scoring cannot directly authorize irreversible deletion.
- [ ] Prediction thresholds are calibrated on labeled data.
- [ ] Side effects have confirmation, idempotency, and audit.
- [ ] Model, input, cost, latency, fallback, and human outcome are logged.

## Summary

The three demos share one engineering lesson: put general language generation where language is needed, and use a typed decision layer where the system needs many fast, bounded, auditable choices.
