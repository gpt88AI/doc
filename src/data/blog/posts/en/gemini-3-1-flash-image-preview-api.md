---
title: Gemini 3.1 Flash Image Free Tier: Official API Is Paid, AI Studio Is Test-Only
description: Confirm whether gemini-3.1-flash-image has an official API free tier, what AI Studio can do, how to write the current model ID, and the differences between Standard, Batch, Gemini Apps, and real-time quota checks. Includes a pricing table and pre-launch quota-check steps.
date: 2026-02-27
category: API开发
tags: [Gemini API, Image Generation, API Pricing, AI Studio]
readTime: 12
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

As of June 13, 2026, `gemini-3.1-flash-image` has no official Gemini Developer API Free Tier row.

Google AI Studio is still suitable for trying Nano Banana 2 in the browser, but that doesn't mean it creates a free production API quota for your backend application. As long as an application, service, or internal system calls the API, you should plan against the paid Developer API row on Google's pricing page — unless Google later changes that pricing row.

The current model ID is `gemini-3.1-flash-image`. The `gemini-3.1-flash-image-preview` from older tutorials should be treated as historical code, a migration audit, or old-URL context, not as a new code contract.

**Route answer:** use AI Studio for browser testing only; use the paid Developer API Standard for synchronous backend calls; consider paid Batch when tasks can wait asynchronously; don't treat Gemini Apps consumer limits as API quota.

**Stop rule:** don't push production traffic because a snippet says "free." Check the Google pricing row first, then check the actual limits for your current project, model, and tier in AI Studio.

## Conclusion First

| Question | Current answer | Where to verify |
| --- | --- | --- |
| Is the official API free for `gemini-3.1-flash-image`? | No. The Standard and Batch image rows have no Free Tier. | Google Gemini API pricing |
| AI Studio | Usable for browser testing, not a backend free quota. | AI Studio |
| Nano Banana 2 | Maps to the current model ID `gemini-3.1-flash-image`. | Google image generation docs |
| Preview ID | Not for new code; only for migrating old examples. | Google changelog |

"Free" in this question is not one unified entitlement — it's a route word. It can mean AI Studio browser testing, consumer features inside Gemini Apps, a free row for a different Gemini model, or some third-party page's own promotion. For the Gemini 3.1 Flash Image backend API, the controlling fact is the model row on Google's pricing page.

## Choose an Access Route First

The most stable way to plan is to pick the route before writing code. Pick the wrong route and your later quota, cost, and support judgments all go wrong. AI Studio proves you can try the model in a browser environment; the Developer API pricing row decides whether your backend calls are free; the Apps help page only explains consumer limits.

| Route | Cost status | Best for | Main boundary |
| --- | --- | --- | --- |
| AI Studio | Browser test route | Prompts, reference images, one-off experiments | Look at current project/account limits |
| Developer API Standard | Paid synchronous backend | Applications, services, internal tools | No official Free Tier for this model |
| Batch API | Paid async, lower price | Large waitable batch tasks | Cheap isn't free |
| Gemini Apps | Consumer features | Personal use | Can't be used as API quota |
| Third-party gateway | Its own contract | Evaluate only with sufficient evidence | Can't replace the Google pricing row |

This branching table separates "you can try it" from "you can run a free production API." Many misjudgments happen after AI Studio can already generate images — teams assume the server also has a free quota; you actually need to return to project, model, tier, and pricing-row checks.

## The Official API Pricing Is a Paid Row

The Google pricing page is the source of truth for Developer API free-tier questions. In the current check, the `gemini-3.1-flash-image` Standard row has no Free Tier, and image output is billed per million image tokens. The Batch row isn't free either; it's just a cheaper async option.

| Output size | Standard API | Batch API |
| --- | --- | --- |
| 0.5K | $0.045 | $0.022 |
| 1K | $0.067 | $0.034 |
| 2K | $0.101 | $0.050 |
| 4K | $0.151 | $0.076 |

These numbers work as a budget starting point, not a permanent commitment. Price, model ID, preview status, and billing rows are all high-volatility facts. Before a release, demo, migration, or traffic surge, reopen the Google pricing page and confirm the current row for `gemini-3.1-flash-image`.

## Use the Current Model ID

New code should call `gemini-3.1-flash-image`. The old `gemini-3.1-flash-image-preview` should only appear when migrating old repositories, explaining old screenshots, or preserving old page paths. Google's changelog lists the GA date as May 28, 2026, and sets a deprecation date of June 25, 2026 for the preview version.

```txt
gemini-3.1-flash-image
```

Don't let new code start from this old string:

```txt
gemini-3.1-flash-image-preview
```

Unify the model ID across code, logs, allowlists, billing dashboards, and tickets. Otherwise support sees "preview," finance sees the GA row, engineering sees the Nano Banana 2 display name, and the problem gets split across three vocabularies.

## Check Real-Time Quota Before Going Live

Quota questions can't be answered with old tables. Google's rate-limit documentation describes limits with RPM, TPM, and RPD, and the limits depend on project, model, and tier. The current-project view inside AI Studio is the operational surface developers should look at before going live.

1. Open AI Studio with the account that owns the API key or project.
2. Select the same project the code actually uses.
3. Confirm the model ID is `gemini-3.1-flash-image`.
4. Record project tier, RPM, TPM, RPD, and any billing notes.
5. Re-check before demos, launches, migrations, or traffic changes.

## When AI Studio Is Enough

AI Studio suits early visual judgment: comparing prompts, testing reference images, seeing whether Nano Banana 2 fits a certain editing task, and collecting samples for internal design review. As soon as you involve user waiting, retries, logging, billing, storage, data retention, or go-live commitments, switch to Developer API planning.

## Gemini Apps Is a Consumer Route

Gemini Apps can offer image generation on the consumer side, but it doesn't answer the Developer API free-tier question. The app's compute limits, plan capabilities, regional availability, and UI behavior can't directly become backend RPM, TPM, RPD, or free entitlements.

| Surface | Can prove | Cannot prove |
| --- | --- | --- |
| AI Studio | Can test model behavior in a browser | Backend API free or unlimited |
| Developer API pricing | Whether the model's API row is free or paid | Real-time per-project limits |
| Gemini Apps | Consumer side may support image generation | Developer API quota |

## Developer Decision Rules

The actual decision can be simple: one-off experiments use AI Studio; interactive product features use paid Standard; waitable batch tasks use paid Batch; personal consumer use stays in Gemini Apps; third-party gateways are only evaluated when you can verify their own costs, coverage, failure handling, data terms, and support path. Without that evidence, the default answer remains the official route.

## If You Just Want a Free Tryout First

Many teams aren't really asking "is there a forever-free API" but "can we judge whether the model fits this feature before committing a production budget." That task can be handed to AI Studio. Run a few rounds of manual comparison with the same prompts, reference images, and output sizes, recording which scenarios are stable, which need human selection, and which should never enter a product route.

But don't extend this browser validation into an API cost commitment. AI Studio's value is screening out product assumptions — for example whether text-image consistency is enough, whether reference images are preserved reasonably, whether the composition users need is too random, and whether failure samples are easy to explain. It answers "is it worth continuing to design the backend call," not "is the backend call free."

A more stable practice is to write the tryout phase into three acceptance records. First, keep the model ID, project, date, and prompt set, so a later review doesn't only have the Nano Banana 2 display name. Second, sort each sample group into acceptable, needs-retry, and unacceptable — don't look only at the best one. Third, record what's still missing before moving to an API plan, such as whether batch tasks can wait, whether users need synchronous responses, whether input images must be saved, and who bears retry costs on failure.

After those records, even if the conclusion is only "this model might fit," you still shouldn't build production logic on the free-tier assumption. The next step is returning to the Developer API pricing row and AI Studio project limits to confirm budget, quota, logs, and fallback behavior. That way, even if prices or quotas change later, the team knows it validated the model's capability, not mistakenly validated a cost entitlement.

Also watch multi-person collaboration. The product manager may only see AI Studio samples, the engineer sees model ID and call methods, finance sees the pricing row, and support sees user questions. If these records aren't on one launch checklist, the team easily cites one layer of evidence each. Merging the evidence layers into one acceptance sheet separates "free testing" and "paid API" at the start of the discussion.

That also lowers future migration cost: when Google updates models, prices, or limits, the team only needs to recheck the pricing row and project limits instead of re-arguing what an AI Studio screenshot proved.

If support or sales needs to explain externally, they should cite this acceptance sheet rather than a single browser test result or an outdated tutorial.

That makes answers more verifiable and less likely to turn testing permissions into production promises.

It's also the minimal risk isolation before launch.

## Bake the Free-Tier Judgment into Engineering Acceptance

If this model enters a real application, the free-tier judgment should be part of engineering acceptance, not a doc note. The minimum acceptance items: only the current model ID appears in code; the config distinguishes Standard from Batch; logs keep project, model, output size, error type, and request source; the cost dashboard can split by image task; and support answers can't describe AI Studio tests as API free quota.

Launch review should also separate synchronous and async routes. Interactive features usually care about time-to-first-byte, user wait, and failure retries, so they're closer to the synchronous cost of Standard API. Offline generation, marketing-asset batches, or queueable tasks can evaluate Batch, but Batch's lower price comes from async processing, not a free entitlement. Mixing both task types in one "image generation" budget makes it easy to misjudge one-time test costs as long-term production costs.

The support team also needs one unified script. When users ask "why can AI Studio try it but the API still charges," the answer should land on route differences: AI Studio is the browser test surface, Developer API is the project-level backend call surface, and Gemini Apps is the consumer product surface. All three can generate images, but their quotas, billing, limits, and support paths differ. Explaining that difference clearly usually resolves more than arguing over the word "free."

Related adjacent questions can be split off: [Gemini API Free Tier](/en/docs/blog/gemini-api-free-tier/) covers the whole Gemini API free-tier map, [Gemini image generation rate limits](/en/docs/blog/gemini-image-generation-rate-limit/) covers image 429 and quota recovery, and [Gemini 3 Pro Image vs Gemini 3.1 Flash Image](/en/docs/blog/gemini-3-pro-image-vs-gemini-3-1-flash-image/) covers model selection.

## Migrating from Preview Old Examples

Migrating old preview examples isn't just replacing a string. You also need to recheck pricing assumptions, free-tier wording, project quotas, log fields, doc screenshots, and user-support answers. Keeping the old model name in production code amplifies deprecation risk, billing risk, and troubleshooting language all at once.

| Check item | Action |
| --- | --- |
| Model ID | Change active calls to `gemini-3.1-flash-image`. |
| Free Tier wording | Change "free API" to AI Studio testing, or official API without Free Tier. |
| Quota notes | Remove static limits that don't belong to the current project. |
| Support logs | Record project, model, tier, image size, and error dimensions. |

## FAQ

### Does Gemini 3.1 Flash Image have a free API tier?

No. Per the Google pricing page as of June 13, 2026, neither the Standard nor the Batch image row for `gemini-3.1-flash-image` has a Free Tier.

### Can AI Studio be used free for testing?

It can be used as a browser test route, but it's not a free backend production API quota. Actual limits depend on your current account, project, model, and tier.

### Is Nano Banana 2 the same model?

Yes. Google's image generation docs map Nano Banana 2 to `gemini-3.1-flash-image`.

### Should I still use the preview model ID?

New code shouldn't. `gemini-3.1-flash-image-preview` is only for old examples, migration notes, or historical URL contexts.

### Does cheaper Batch equal free?

No. Batch is a lower-priced paid async route for waitable tasks, not a Free Tier.

### Do Gemini Apps limits equal API limits?

No. Gemini Apps is a consumer product; Developer API quota belongs to a project, model, and tier.

### Where do I check exact quota?

In AI Studio, look at the model, tier, RPM, TPM, RPD, and any visible account or billing notes behind the current project.

### Where should broader Gemini free-tier questions go?

Model-family and project-quota questions go to /en/docs/blog/gemini-api-free-tier/; image 429 and quota recovery go to /en/docs/blog/gemini-image-generation-rate-limit/.
