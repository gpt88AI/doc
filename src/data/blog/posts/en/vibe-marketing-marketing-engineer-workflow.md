---
title: Vibe Marketing: How a Solo Founder Can Become a Marketing Engineer
description: A structured guide to Shann³'s Marketing Engineer ideas, covering Vibe Marketing, the Agent Development Environment, marketing knowledge and data layers, workflows, review loops, and autonomous agents.
date: 2026-09-15
category: Developer Tools
tags: [Vibe Marketing, Marketing Engineer, AI Agent, Agent Harness, ADE, marketing workflow, Solo Founder]
readTime: 16
relatedPath: /docs/blog/pi-coding-harness-efficiency-guide/
relatedTitle: Pi Coding Harness in Practice: Rebuilding a Controlled Coding Agent with AGENTS.md, Skills, and Packages
---

People talk about Vibe Coding as a way to let AI write code, build products, and fix bugs. For a Solo Founder or Vibe Coder, shipping the product is only the beginning. Without research, positioning, content, distribution, conversion, and review, code can become a product nobody knows or wants to use.

Shann³'s [“How to Become a Marketing Engineer”](https://x.com/shannholmberg/status/2098004743536750869) argues that **Vibe Marketing is not asking an Agent to generate a few marketing posts. It is connecting knowledge, data, tools, workflows, and human judgment into a marketing system that can keep running.** This article is adapted from [Su's repost with a Chinese translation](https://x.com/Sukiea1008/status/2099448521237950868). The original post was published on September 14, 2026. References to Orca, Hermes, Typefully, Paper, Figma, Slack, and other tools describe the author's practice; the GPT88 integration notes and acceptance boundaries below are general engineering guidance.

## Conclusion First: Marketing Needs a Harness

```text
Shared knowledge + external research + campaign data
          ↓
      campaign brief
          ↓
   workflows and specialist Agents
          ↓
       drafts and assets
          ↓
     automated checks + human review
          ↓
        approved publishing
          ↓
     results written back for learning
```

The important questions are not how many Agents you have, but what each Agent can read, which sources are trusted, where outputs are saved, who approves them, which actions may run automatically, and how failures or stale data stop the workflow.

## What Is a Marketing Engineer?

A Marketing Engineer uses Agents, connected data, and business context to build systems that perform real marketing work. The role combines product marketing, content and creative judgment, growth experimentation, marketing operations, analytics, and engineering.

You do not need to cover every function on day one. Start with work you understand well enough to judge: content production, SEO research and briefs, or historical campaign review and creative planning.

Professional experience is not incidental background. It becomes the system's standard for what counts as relevant, credible, publishable, and effective.

## Model, Harness, and ADE

The source article places marketing work inside an Agent Development Environment, or ADE. Distinguish the layers:

| Layer | Responsibility |
| --- | --- |
| Model | Understand context, make a plan, draft analysis and content |
| Harness | Provide files, tools, code, permissions, and execution control |
| ADE | Run tasks, inspect progress, review actions, and preserve outputs |

A model does not know whether positioning has been approved or whether a customer claim is current. The Harness supplies a controlled environment; the ADE provides a space where work can be observed, edited, and resumed.

That is why a chat window is not a complete marketing system. Conversation context is easy to lose, temporary instructions are hard to reuse, and feedback rarely reaches the next run. Keep briefs, research, drafts, review decisions, publishing records, and performance data as durable artifacts.

## Build the Knowledge Layer Before Generating Content

Marketing workflows need internal and external context:

| Internal knowledge | External knowledge |
| --- | --- |
| Product details, offer, and positioning | Competitors, offers, and campaigns |
| Interviews, CRM records, and support conversations | Public discussions, reviews, and customer questions |
| Expertise, examples, and planning inputs | Industry research, market changes, and search demand |
| Historical campaigns and results | Keywords, content trends, and channel changes |

Internal knowledge tells an Agent who the company serves and what it can promise. External knowledge shows what the market is doing and how people describe the problem.

A minimal structure could be:

```text
marketing/
├── shared-knowledge/
│   ├── audience.md
│   ├── product-and-offer.md
│   └── positioning.md
└── content/
    ├── knowledge/
    ├── work/
    ├── workflows/
    ├── skills/
    ├── agents/
    ├── outputs/
    └── results-and-learnings/
```

Do not fill every directory before starting. Add the context that the first workflow actually needs, then document where sources live, which source wins, where discoveries are saved, which claims are hypotheses, and when the Agent must stop and ask.

### Give Knowledge a Source and Status

```text
Finding: target users value fast deployment.
Source: September 10, 2026 customer interview, linked transcript.
Scope: early-stage SaaS teams; not validated for enterprise buyers.
Status: reviewed for content briefs; not approved as an absolute ad claim.
```

This lets an Agent distinguish approved positioning, a temporary meeting opinion, an external inference, and an unverified hypothesis.

## The Data Layer: Do Not Let an Agent Guess the Retrospective

When planning the next campaign, an Agent should know which assets brought visitors, which visitors converted, and which leads became customers. Data may come from ad platforms, web analytics, CRM, and experiment records.

Start with a small database or structured CSV if necessary, but keep stable identifiers such as `Campaign ID`, `Ad ID`, tracking parameters, CRM source fields, and experiment records. API access alone does not keep data fresh. Scheduled refreshes need explicit errors, and a failed update must not quietly produce confident conclusions from last week's data.

Also retain incomplete attribution. Missing parameters, cross-device gaps, or missing CRM outcomes should be marked as unknown rather than confidently attributed to one ad.

## The First Workflow: One Concrete Job

Start with a task that you perform often and can evaluate:

> Turn customer research, the product brief, and historical campaign results into a creative brief for the next paid campaign.

It has clear inputs, an output, and review points, without directly changing budget or publishing ads.

Use a goal that states the context, deliverable, checks, and stop condition:

```text
/goal Prepare a creative brief for the next paid campaign.

Use audience.md, approved-claims.md, campaign-book/
and previous-test-results.md as context.

Research and propose three creative angles. Explain who each angle is for,
its evidence, and how it differs from historical tests. Link supporting
sources and mark assumptions.

Save the brief as creative-brief.md. Stop when it is ready for my review.
Do not create or publish ads. Ask if required context is missing.
```

Run the first version with a human in the loop. Fix broad research filters, missing customer objections, stale-data checks, or unclear acceptance criteria before trying to make it autonomous.

## Make Campaigns Traceable

```text
campaign/
├── brief.md
├── campaign-book/
├── research/
├── tickets/
├── landing-page/
├── paid/
├── email/
└── results/
```

Tickets should expose dependencies, owners, deliverables, checks, and links. A coordinator can then see what is ready, what is waiting for input, and what needs another review instead of operating inside one giant context window.

## Review Loops and Human Approval

Once steps and checks are explicit, an Agent can iterate within a bounded budget:

```text
claim ready ticket
      ↓
produce or modify
      ↓
run checks
  ├── fail → record fixes → retry within budget
  ├── blocked or budget exhausted → ask for human input
  └── pass → submit for approval
```

Publishing, budget changes, external messages, and claims with legal or reputational impact should remain explicit approval points unless the organization has separately authorized and audited automation.

## Summary

Vibe Marketing is best understood as a durable production system: source-backed knowledge, current data, bounded tools, reusable workflows, review gates, and write-back from results. The model generates drafts, but the Harness and ADE decide what it can access and do.

The original article's tools and workflow are a personal practice. Recheck their current availability and terms, and treat GPT88 integration as an implementation option rather than a compatibility guarantee.
