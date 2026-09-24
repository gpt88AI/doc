---
title: "Let AI Maintain a Knowledge Base Without Editing It Directly"
description: "Turn duplicate, stale, conflicting, and orphaned notes into evidence-backed approval proposals using Obsidian signals and deterministic gates."
date: 2026-07-12
category: Developer Tools
tags: [LearnPrompt, Obsidian AI]
readTime: 16
---

> Source: [LearnPrompt: Let AI Maintain a Knowledge Base Without Editing It Directly](https://www.learnprompt.pro/obsidian-ai/ai-maintains-knowledge-base/). This adapted edition preserves the source structure, code examples, and public visuals after migration. The source repository uses [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/); product details follow the source's verification date.

As an Obsidian vault grows, the difficult problem is often not finding information but deciding which of several similar notes to trust. AI can help detect signals, but it should not silently rewrite, delete, or merge source notes. A safer boundary is an approval queue:

> AI finds signals, gathers evidence, and drafts maintenance proposals. A person decides whether to merge, mark stale, add a source, create a link, preserve a conflict, or defer the item.

## Search Signals Are Not Editing Decisions

Search, properties, backlinks, and internal links expose useful signals such as missing fields, old verification dates, incoming-link counts, and competing references. They do not decide what the note means.

| Outcome | Acceptable evidence | Boundary |
| --- | --- | --- |
| `merge-candidate` | Shared frozen `canonical_key`, complementary content | Propose only; delete nothing |
| `stale-flag` | Current source contradicts the note | Old date alone is insufficient |
| `source-needed` | Missing `source_path` and no verifiable citation | Never invent a URL |
| `orphan-review` | Frozen graph has zero in-degree and out-degree | Orphan does not mean delete |
| `conflict-review` | Two source paths make competing claims | Preserve both sources |
| `no-op` | No reliable maintenance evidence | The system must be able to do nothing |

Excluded files can affect Search and backlink results. “Not visible in the current UI” is not proof that a note is absent from the vault.

## Proposal Schema

The maintenance phase should write a proposal, not a patch:

```json
{
  "action": "stale-flag",
  "note_paths": ["notes/payment-policy.md"],
  "evidence_paths": ["notes/payment-policy.md", "current-sources.json"],
  "observed_fact": "The note and current source state different payment terms.",
  "proposed_change": "Flag for human review; do not rewrite the note.",
  "confidence": "high",
  "requires_human_approval": true,
  "source_preservation_rule": "Do not rewrite the source note automatically."
}
```

`evidence_paths` must point to inspectable evidence. `observed_fact` should describe what was seen, not inflate a conclusion. The proposal can be stored as Markdown for review, but JSON makes missing fields, unsupported actions, and path violations easy to reject.

## Deterministic Gates Before Apply

Use a synthetic fixture before a real vault. Freeze notes, a maintenance manifest, a link graph, current sources, protected paths, and hashes. Let the validator reject missing provenance, destructive mutation, unsupported merges, stale flags without contradiction, and orphan claims without zero-degree evidence. The only writable paths in the proposal phase should be reports.

The important invariant is that source notes and manifests remain byte-identical until a person approves a separate apply operation. A model producing six plausible proposal types is still a failure if it omits the top-level fixture contract or evidence fields.

## Human Review and Limits

For merges, inspect canonical keys and complementary versus duplicate content. For stale flags, distinguish a contradiction from an old timestamp. For missing sources, ask the owner instead of accepting a plausible-looking link. For orphan reviews, remember that a seed note or private record can intentionally have no links. For conflicts, preserve both sources because they may apply to different times, audiences, contracts, or product layers.

Do not use this workflow for automatic changes to public, legal, medical, financial, or contractual knowledge. If the task is bulk migration or rollback, use version control and backups. Evidence-backed proposals are useful precisely because they keep uncertainty visible and approval explicit.
