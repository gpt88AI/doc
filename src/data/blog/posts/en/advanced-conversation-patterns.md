---
title: "Keep Long Tasks on Track: Sessions, Handoffs, and Checkpoints in Claude Code"
description: "A practical workflow for splitting exploration, implementation, and verification across clean Claude Code sessions without losing acceptance criteria."
date: 2026-07-11
category: Developer Tools
tags: [LearnPrompt, Claude Code]
readTime: 15
---

> Source: [LearnPrompt: Keep Long Tasks on Track with Session Segmentation, Handoffs, and Checkpoints](https://www.learnprompt.pro/claude-code/advanced-conversation-patterns/). This adapted edition preserves the original structure, code examples, and public teaching visuals after migration and path conversion. The source repository uses [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/); product details follow the verification date stated by the source.

Long Claude Code tasks become unstable when exploration, planning, implementation, and acceptance are forced into one endless conversation. The remedy is not simply a better prompt. Treat session operations as engineering boundaries and decide which state must survive each transition.

## What This Workflow Gives You

You should be able to:

1. Distinguish what `continue`, `compact`, `clear`, `resume`, `fork`, and checkpoints preserve.
2. Split a real bug fix into read-only exploration and clean implementation.
3. Reject a handoff that does not contain executable acceptance commands.

This is not a claim that `resume`, `compact`, or checkpoints guarantee quality. They only manage state; verification still has to be explicit.

## Why Long Conversations Drift

The context window contains messages, files, command output, rules, and memory. As it fills, old output is summarized or compressed, and important boundaries can become weaker. Claude Code's agentic loop is effectively:

```text
gather context -> take action -> verify results
```

If these phases are not separated, failed experiments and noisy logs flow into verification. The real question is therefore: do you need the complete history, a compressed history, or only a frozen handoff?

## Session, Context, and Checkpoint

### Session

A session is the continuing workstream. `claude --continue` continues the latest session in the current directory, `claude --resume` selects an older one, and `--fork-session` or `/branch` creates a new session from existing history.

### Context

Context is what the current reasoning step can see. `/compact` keeps the same session but replaces accumulated history with a summary.

### Checkpoint and rewind

Checkpoints can restore code, conversation, or both, and can summarize a local part of a conversation. They do not track file changes caused by arbitrary Bash commands, so they are not a replacement for Git.

## Choose by the State You Want to Keep

| What you want to preserve | Use | Reason |
| --- | --- | --- |
| The complete workflow after an interruption | `continue` / `resume` | You want continuity |
| The same workflow with less history | `compact` | You want compression, not a new task |
| Conclusions from a polluted session | `clear` plus a handoff | Keep conclusions, discard noise |
| The investigation while trying another implementation | `fork` | Create an independent branch of the session |
| A risky edit that just happened | checkpoint / rewind | Roll back the attempt |

## Explore, Freeze, Implement, Verify

Stage A should be read-only. Read the relevant files, run the baseline test, and write a handoff containing:

```json
{
  "symptom": "what currently fails",
  "evidence": ["commands and files that prove it"],
  "allowed_files": ["the files implementation may change"],
  "acceptance": {"commands": ["the command that must pass"]},
  "risks": ["remaining boundaries"]
}
```

Stage B starts in a clean process with only the repository and frozen handoff. It must replay the failure, change only allowed files, and run the acceptance command. A handoff without `acceptance.commands` is incomplete because it gives the second stage no mechanical stop condition.

The practical rule is simple: continue when the workstream is healthy, compact when history is merely long, and clear into a new process when the history is polluted but the conclusions are stable. Use a handoff to carry conclusions without carrying noise.
