---
title: OpenViking: Keep Development Context Online Across Agents and Tools
description: An introduction to OpenViking's unified context filesystem for resources, memory, and Skills, including L0/L1/L2 loading, session memory, and retrieval traces.
date: 2026-09-19
category: Developer Tools
tags: [OpenViking, Agent Memory, Context Engineering, Skills, developer productivity, GPT88]
readTime: 10
relatedPath: /docs/blog/agent-memory-5-layer-architecture/
relatedTitle: The Five-Layer Agent Memory Architecture: Help Agents Remember and Learn Continuously
---

When a team changes tools, models, or Agents, the easiest thing to lose is not code but context: project background, prior decisions, tool capabilities, failure experience, and working preferences. OpenViking's public introduction places resources, memory, and Skills in a unified context filesystem so they can be reused across tools instead of remaining in one chat window.

This article is adapted from the ByteDance technical team's summary, [“Change Tools and Agents, Not Context: OpenViking Keeps Development Context Online”](https://mp.weixin.qq.com/s?__biz=MzI1MzYzMjE0MQ==&mid=2247522116&idx=1&sn=12549be2892dea3b03f75bb06b9d61c8&scene=21#wechat_redirect). The summary mentions L0/L1/L2 loading, long-term memory extraction after a session, and retrieval traces. The Context Engineering explanation below is general guidance, not a complete reproduction of OpenViking's internals.

## Organize Three Kinds of Context

| Type | Question | Typical content |
| --- | --- | --- |
| Resource | Where are projects and external materials? | Docs, code, web pages, data, images |
| Memory | What has the Agent learned before? | Decisions, preferences, events, experience, failures |
| Skill | How should the Agent perform the work? | Workflows, scripts, rules, validation methods |

The distinction matters. Resources are read, memory is selected for long-term use, and Skills are executable methods. Treating everything as chat history mixes retrieval, permissions, updates, and expiration.

## Why L0, L1, and L2 Reduce Context Waste

Do not put a complete document into the model context before knowing whether it matters:

```text
L0: very short abstract; decide relevance
  → L1: directory or topic overview; choose what to read
    → L2: complete details; load only when needed
```

This is more than summarization. It moves the “is this worth reading?” decision to a cheaper layer. Loading a large codebase, long design document, or full Skill directory on every run increases both cost and noise.

## Requirements for Cross-Agent Reuse

Reusable context needs:

- stable URIs, paths, or resource IDs;
- resource type and source;
- content version and update time;
- access permissions and sensitivity;
- a traceable path from abstract to detail; and
- the reason for retrieval and a record of reads.

Without these, “unified context” becomes another opaque search box.

## Extract Long-Term Memory at Session End

Not every conversation deserves durable storage. Prefer:

1. confirmed decisions;
2. reusable solutions;
3. recurring project facts;
4. failures that can affect future work; and
5. preferences or constraints the user explicitly asks to preserve.

Temporary guesses, unverified suggestions, one-off output, and secrets in logs should not enter long-term memory automatically. Memory writes need source, time, confidence, and revocation.

## Retrieval Traces Matter More Than Hits

When an Agent reaches a conclusion, the team should know why it saw a piece of context: the query, matched resources, expansion from abstract to detail, and rules that affected the result.

Retrieval traces help distinguish missing knowledge from retrieval errors, shallow loading from excessive context, stale memory from unresolved conflicts, and a wrong Skill trigger from an unclear task scope.

## Applying the Pattern to GPT88 Agent Workflows

An integration can be staged as resource registration, abstract indexing, on-demand expansion, and session archiving. The model handles understanding and selection; deterministic services own permissions, versioning, redaction, deletion, and audit.

## Source and Boundary

Source: [ByteDance Technical Team: Change Tools and Agents, Not Context](https://mp.weixin.qq.com/s?__biz=MzI1MzYzMjE0MQ==&mid=2247522116&idx=1&sn=12549be2892dea3b03f75bb06b9d61c8&scene=21#wechat_redirect). The article is based on a Qiku Weekly summary and does not reproduce the full source text or original images. Check OpenViking's official materials for current APIs, protocols, and deployment details.
