---
title: Gemini API Rate Limits: Find Your Real Quota and Fix 429 Errors
description: Stop copying outdated RPM tables. This article shows how to find the true quota for your current project and model in Google AI Studio, separate the entry point, owner, model, limit, and reset window, compute safe throughput, and distinguish 429 quota errors from 503 capacity errors.
date: 2026-01-22
category: API开发
tags: [Gemini API, 速率限制, Google AI, API稳定性, 错误排查]
readTime: 17
relatedPath: /docs/api/errors/
relatedTitle: 错误码参考
---

When checking Gemini API rate limits, don't start by asking "how many requests per minute can Gemini do?" The more useful question is: **which entry point, which project, which model, which counter, and which reset window is limiting this request?** No single fixed number can answer that for Gemini Developer API, the Gemini app, Firebase AI Logic, and Vertex AI at the same time.

For the Developer API, the values that actually apply to you live in the [Google AI Studio rate limits page](https://aistudio.google.com/rate-limit), and you must look at the exact Google Cloud project and model row. Write these five things down first to know what you're dealing with:

1.  **Entry point**: Developer API, Gemini app, Firebase AI Logic, or Vertex AI;
2.  **Owner**: Google Cloud project, consumer account, or Firebase project;
3.  **Exact model or feature**: don't just write "Flash" or "Pro";
4.  **Limit or processing lane**: RPM, input TPM, RPD, IPM, TPD, spend window, Priority, or Batch;
5.  **Reset method or on-site evidence**: minute window, Pacific-time midnight, rolling window, response headers, or console status.

| Entry point you're actually using | Where to see current evidence | First action |
| --- | --- | --- |
| Gemini Developer API | Rate-limit row for the exact project and model in AI Studio | Find which of RPM, input TPM, RPD, spend, Priority, or Batch runs out first |
| Gemini app | In-app "Settings → Usage limits" | Check the current feature limit and the displayed recovery time |
| Firebase AI Logic | Firebase per-user settings plus upstream model-provider quotas | Check both layers; the lower one throttles first |
| Vertex AI | Google Cloud shared capacity or Provisioned Throughput pages | Treat shared-capacity contention and fixed project quota separately |

**Stop line**: don't start rotating API keys, and don't let the program retry forever. `429 RESOURCE_EXHAUSTED` should first be checked against quota, frequency, daily counters, or spend eligibility; `503 UNAVAILABLE` should first be checked against temporary overload and service capacity. Both statuses may recover briefly, but the evidence and the long-term fix are not the same thing.

## The Current Project Row Is the Answer, Not a Copied Model Table

The [official Gemini API rate limits docs](https://ai.google.dev/gemini-api/docs/rate-limits?hl=zh-cn) explain the rules; [AI Studio](https://aistudio.google.com/rate-limit) shows the values that currently apply to a specific project, model, and tier. Static tables on public pages at best help you understand terms — they cannot replace a logged-in project page.

The reason is simple: two developers may use the same model name but differ in project tier, billing-account status, whether the model is a preview, account reputation, processing lane, and current available capacity. Old articles may also keep model rows that have been adjusted or retired. Treating an old table as your production budget turns one lucky test into a wrong capacity commitment.

The three counters most common on the Developer API are independent of each other:

-   **RPM (requests per minute)** counts calls. Many short requests may hit RPM first;
-   **Input TPM (input tokens per minute)** counts prompts and context. A few very long requests may exhaust it first;
-   **RPD (requests per day)** applies only when it's listed on your current project row. Under current official rules it resets at Pacific-time midnight.

Some models or features also list IPM (images per minute) or TPD (tokens per day). If any applicable dimension hits its cap first, the request can be rejected. Preview or experimental models are usually stricter, so incident records should note the exact model ID, not just the model family.

### Quota Is Shared Per Project, Not Issued Per Key

Google's current docs state clearly that Developer API rate limits apply per Google Cloud project, not per API key. Creating two keys in the same project just gives you two credentials; RPM, TPM, and RPD still draw from the same pool.

So rotating keys suits credential rotation, permission isolation, or service separation — not "increasing quota." Using multiple projects to dodge limits isn't normal capacity scaling either; split projects only when they genuinely represent different environments, billing, security boundaries, or organizational ownership, and record your routing, cost, and failure-isolation rules.

If what you're seeing is a specific message in the AI Studio chat UI rather than an API status returned by code, follow the UI guidance — don't apply the API project-quota playbook. UI cooldowns and API project quotas can't be resolved with the same conclusion.

### Paid Tiers and Spend Conditions Change

As of **July 15, 2026**, the eligibility conditions listed on Google's public pages are as follows. They reflect only that date's status, not a permanent promise:

| Tier | Current public eligibility condition | What to still confirm in your account |
| --- | --- | --- |
| Free | Valid project or free-trial status | Which models your current project opens and the actual row values |
| Tier 1 | A linked valid billing account | The tier and model rows your project shows once billing is active |
| Tier 2 | At least $100 paid, and at least 3 days since the first successful payment | Account status and the tier Google actually displays |
| Tier 3 | At least $1,000 paid, and at least 30 days since the first successful payment | Account status and the tier Google actually displays |

The same page currently also describes spend limits evaluated on a rolling 10-minute window: $10 for Tier 1, $200 for Tier 2 and Tier 3. Re-check the official page and your current project before launching or load testing, because amounts, eligibility, and scope can all change.

Attaching a billing account only changes tier eligibility; it doesn't eliminate all limits. Paid projects can still exhaust RPM, input TPM, RPD, the spend window, Batch, or other eligibility conditions. Whether a model is still free is a free-tier question — don't infer it here from an old quota table.

## Separate Time Windows and Processing Lanes Before Load Testing

Not hitting a limit in one minute doesn't mean the whole day or the spend window is safe. Standard, Priority, and Batch are not three names for the same quota — they're processing modes that must be observed separately.

| Counter or lane | What it controls | Evidence to save on-site | Common misjudgment |
| --- | --- | --- | --- |
| RPM | Online calls per minute | Request time distribution and the current RPM row | Looking only at average RPS, ignoring instantaneous bursts |
| Input TPM | Input tokens per minute | Input-length percentiles, not just request counts | Assuming all requests are the same size |
| RPD | Daily request count when this limit applies | The current RPD row and the Pacific-time reset point | Thinking a few seconds of backoff fixes a daily cap |
| Spend window | Spend eligibility within a given rolling window | Billing tier and current official rules | Mistaking it for a monthly budget |
| Priority | Separate priority-processing limits | The request's service tier and the returned `x-gemini-service-tier` | Believing Priority is unlimited extra capacity |
| Batch | Separate async quota pool | Concurrent tasks, file sizes, and queued tokens | Stuffing urgent interactive requests into Batch |

The [Priority inference docs](https://ai.google.dev/gemini-api/docs/priority-inference) currently set the default Priority limit to 0.3x the corresponding Standard model-and-tier limit. When Priority capacity runs out, requests may fall back to Standard processing instead of failing outright. If latency or price depends on the lane, record the returned `x-gemini-service-tier`, not just the lane you wanted.

Batch suits non-urgent work because it uses a quota pool separate from online calls. As of July 15, 2026, the [Batch API docs](https://ai.google.dev/gemini-api/docs/batch-api) list 100 concurrent batch requests, 2 GB per input file, 20 GB total file storage, and queued-token caps that vary by model and tier. Re-verify these numbers by date too.

A usable load-test record shouldn't just contain a target RPS. It should also include the exact model and project, input-token p50/p95, burst multiplier, request lane, p95 latency, daily total, spend risk, retry ratio, and whether the task allows async.

## Convert Your Current Quota into Runnable Capacity

Once you find your project row, first compute which per-minute cap trips earlier:

> **Request cap = min (current RPM, current input TPM ÷ average input tokens per request)**

This result is a starting point for calculation, not a production target. Input sizes fluctuate, traffic bursts, failed retries amplify requests, and service capacity can run below what the page shows. Your safety margin should follow real fluctuation and business risk — Google doesn't give all apps one universal margin percentage.

### A Worked Example with Assumptions

Suppose your project row shows **60 RPM** and **120,000 input TPM**, and monitoring shows an average of **4,000 input tokens** per request:

1.  RPM allows 60 requests/minute;
2.  Input TPM allows 120,000 ÷ 4,000 = 30 requests/minute;
3.  The smaller number limits first, so the pre-margin cap is 30 requests/minute;
4.  If this team chooses a 20% margin, the initial running target is 24 requests/minute, i.e., 0.4 RPS;
5.  With a measured p95 latency of 2 seconds, steady-state concurrency estimates to 0.4 × 2 = 0.8, so start with concurrency 1 and then watch queues, bursts, and retries.

That 20% is a demo engineering assumption, not a Google recommendation. A consumer product with pronounced traffic spikes may need more margin; offline tasks with stable input sizes that can queue may need a different margin.

You're not done yet. Running 24 requests/minute all day would theoretically attempt 34,560 requests/day. Compare that against your current RPD row, and check the spend window separately. A minute-level budget that survives ten minutes doesn't mean it survives 24 hours.

When input sizes vary significantly, don't use only averages. Look at the average, p95, and the maximum allowed input at the same time:

| Observation | What it helps you discover |
| --- | --- |
| Average input tokens | Initial steady-state capacity estimate |
| p95 input tokens | Whether normal peaks exhaust TPM first |
| Maximum allowed input | Whether one oversized request can eat a whole minute's budget |
| p95 latency | Converting safe RPS into an initial concurrency cap |
| Retry rate | Traffic amplification during partial failures |
| Cache hit rate | Whether stable repeated context can leave the hot path |

Recompute after any change to model, prompt template, context length, tool calls, traffic mix, tier, or processing lane. Capacity planning is a set of ongoing measurements, not a one-time division.

## On a 429, Find What Ran Out Before Deciding Whether to Retry

The [official troubleshooting page](https://ai.google.dev/gemini-api/docs/troubleshooting?hl=zh-cn) gives different meanings to `429 RESOURCE_EXHAUSTED` and `503 UNAVAILABLE`. Both may recover temporarily, and both may allow exponential backoff with random jitter — but don't treat them as the same kind of failure.

| Returned status | First judgment | Evidence to examine | Appropriate action | Stop condition |
| --- | --- | --- | --- | --- |
| `429 RESOURCE_EXHAUSTED` | Quota, frequency, daily counter, spend, or other eligibility limit | Full error body, response headers, `Retry-After`, project/model rows, and recent usage | Queue, slow down, shorten input, wait for the right window, or take the official quota path | Stop blind retrying before you know the exhausted dimension and its reset method |
| `503 UNAVAILABLE` | Temporary overload, capacity, or service unavailability | Request ID, time, endpoint or region, model, and service status | Bounded backoff, smooth traffic, supported global routing, then escalate with evidence | Stop when the retry budget is exceeded or impact persists |

A minute-level 429 from a burst may clear as the window moves; an exhausted RPD won't recover from retrying every few seconds; a spend window needs the right rolling window or billing conditions to pass. Persistent 503 may require checking service status or a capacity path, even if the project quota page looks healthy.

### A Retry Policy Must Spell Out Its Boundaries

A production retry policy should at minimum define:

-   Which status codes are retryable and which must stop immediately;
-   Whether the operation is idempotent and whether re-running produces repeated side effects;
-   Max attempts and a total time budget;
-   Exponential backoff and random jitter;
-   How to honor `Retry-After` when the response provides it;
-   How queues or circuit breakers stop synchronized retry storms;
-   How original calls and retry traffic are counted separately;
-   How the final escalation package records the request ID, exact model, endpoint, timestamp, response details, and impact without leaking the key.

Rotating keys doesn't replace any of these actions. Quota belongs to the project; changing keys usually keeps the same limit while making the scene harder to trace. Don't use cross-project sharding to dodge limits either; a legitimate multi-project architecture must first have real billing, security, environment, or organizational boundaries.

## Fix the Limit Actually Blocking You, Don't Just Suppress the Error

The fastest and safest action depends on which item reached its cap first:

| Blocked limit | Short-term control | Long-term design | Wrong shortcut |
| --- | --- | --- | --- |
| RPM | Smooth bursts, cap concurrency, queue | Set admission and budgets per workload | Creating more keys in the same project |
| Input TPM | Shorten context, remove duplicate instructions, shrink per-batch input | Cache stable prefixes, split out oversized tasks | Counting only requests, not tokens |
| RPD | Remove unnecessary calls, wait for Pacific-time reset when applicable | Forecast daily totals, evaluate qualifying tiers | Tight-loop retrying |
| Spend window | Lower admission and wait for the applicable rolling window | Cost alerts and cost-aware admission | Believing paid means no spend limits |
| Priority | Check the actual returned lane, decide whether to accept Standard fallback | Use only for latency-sensitive tasks and monitor separately | Treating Priority as general headroom |
| Batch queued tokens or task count | Submit off-peak, split tasks smaller | Build async scheduling on current Batch rules | Sending real-time interactive tasks to Batch |
| 503 capacity | Bounded backoff, smooth traffic | Use global endpoints, capacity planning, or Provisioned Throughput when appropriate | Chasing project caps with no quota evidence |

Caching fits large amounts of repeated, stable context; queues fit demand that can wait; Batch fits tasks that don't need instant responses. Switching models only makes sense if the new model is currently available, its quality meets the task, and its row actually relieves the bottleneck. Model names from an old quota table are not a fallback plan.

When applying for a higher tier or quota, bring measurements: current project and model, traffic distribution, the dimension that ran out first, growth expectations, mitigations already in place, and business impact. "We need more RPM" is far less useful than that evidence.

## Don't Cross-Apply Limits from the Gemini App, Firebase, and Vertex

"Gemini" appears across the consumer app, Developer API, Firebase, and Vertex AI, but they count different things.

### The Gemini App Is a Consumer-Account Usage Limit

The Gemini app's limits can depend on the selected model, feature, prompt complexity, files, and session length. As of July 15, 2026, the [Gemini app help](https://support.google.com/gemini/answer/16275805?hl=zh-Hans) says usage is refreshed every five hours until the weekly limit is reached; exact values may shift with capacity, and the current recovery time is what "Settings → Usage limits" shows.

Consumer-app limits won't raise your Developer API project's RPM, TPM, or RPD. Google AI subscriptions and billed API projects solve two different things — don't copy app prompt counts into an API capacity table.

### Firebase AI Logic Stacks Two Layers of Limits

Firebase AI Logic can add per-user gateway limits ahead of upstream model quotas. As of July 15, 2026, Firebase docs list a [default per-user limit of 100 RPM](https://firebase.google.com/docs/ai-logic/quotas?hl=zh-cn), and upstream Gemini project-and-model quotas still apply.

The effective ceiling is the lower layer. If only a single user is blocked while overall project usage is fine, check the Firebase gateway first; if many users fail at once and the Gemini project row is exhausted, changing the gateway value alone won't fix the upstream limit.

### Vertex AI Operates on Capacity Paths

For newer Gemini models on Vertex AI PayGo, Google Cloud docs describe [Dynamic Shared Quota](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/resources/throughput-quota), not a copyable predefined project RPM. A 429 from Vertex can mean shared-pool contention, so traffic smoothing, applicable global endpoints, bounded retries, and Provisioned Throughput are the Vertex-specific capacity options.

Don't paste Developer API RPM/RPD straight into a Vertex plan. If the business needs predictable enterprise throughput, compare real PayGo behavior against Provisioned Throughput rather than treating shared capacity as a guarantee.

Image generation may also add IPM, consumed image counts, or Vertex image capacity. When your task falls in those branches, follow the image-generation-specific rules — don't let the general API page swallow image-specific problems.

## Write the Limit Rationale into the Runbook Before Launch

Before scaling up, make sure the runbook can answer:

-   **Entry point**: does traffic actually go through Developer API, the Gemini app, Firebase, or Vertex AI?
-   **Ownership**: which project, billing account, consumer account, or Firebase project is responsible?
-   **Model**: what exact model ID does the request carry, and what is its current status?
-   **Limit**: does RPM, input TPM, RPD, IPM, TPD, spend, Batch, or Priority apply?
-   **Window**: when does the counter reset or roll, and where is the value re-checked?
-   **Traffic shape**: what are the input-token p50/p95, p95 latency, burst multiplier, daily total, and retry ratio?
-   **Admission control**: how do queues, concurrency caps, token budgets, and drop rules keep traffic inside the running target?
-   **Error branches**: are 429 and 503 counted separately, each with its own retry cap and stop line?
-   **Lanes**: are Standard, Priority, and Batch observed separately?
-   **Escalation evidence**: can on-call staff save request IDs, timestamps, models, projects, responses, and impact without exposing credentials?

Load test with near-production input lengths, not just "hello". Test both bursts and duration; confirm retries add traffic to your monitoring; set alert thresholds before the team's chosen running target, not when the public cap is about to sound.

A truly useful dashboard isn't a wall of model numbers — it's a small runbook: when something breaks, it can say which entry point was responsible, which counter filled first, what changed recently, and which next action is safe.

## Gemini API Rate Limit FAQ

### Are Gemini API rate limits calculated per API key?

No. The Developer API is currently limited per Google Cloud project; multiple keys in the same project share one quota pool.

### Does the Gemini API have a daily cap?

Some project and model rows list RPD or TPD, but there's no universal daily number across all models. Where RPD applies, current rules reset at Pacific-time midnight — still check the exact AI Studio row.

### Why does a paid project still return 429?

Paying changes tier eligibility; it doesn't clear RPM, input TPM, RPD, spend windows, Batch, or other eligibility limits. A 429 is evidence of a bottleneck, not proof your billing failed.

### How long should I wait after a 429?

It depends on the exhausted window. Honor `Retry-After` when present, then combine the error body and your current project row to decide whether it's minute pressure, a daily cap, or a spend window. A short wait that suits RPM won't reset RPD.

### Is Batch API quota independent?

Yes. Batch uses a quota pool separate from interactive requests, with its own concurrent-task, file, storage, and queued-token limits. Re-check the latest Batch docs before scheduling production.

### Will a Gemini app subscription raise API quota?

Don't assume so. The Gemini app's limits belong to the consumer account and feature; Developer API quota belongs to the Cloud project, model, tier, and the current AI Studio row.

### Are Vertex AI Gemini limits the same as the Developer API?

No. Newer Vertex AI PayGo Gemini traffic uses Dynamic Shared Quota, while Provisioned Throughput is the capacity-purchasing path. Troubleshoot Vertex with Google Cloud evidence, not Developer API tables.

### Can multiple Google Cloud projects increase capacity?

Projects can have independent ownership and limits, but split them only for real environment, billing, security, or organizational boundaries — never to dodge quota. Multi-project architectures also need explicit routing, data policy, cost, and failure isolation.

### What should I submit to support?

Submit the entry point, a safely shareable project identifier, exact model, endpoint or region, timestamp, request ID, full error code and details, current limit rows, recent traffic and token distribution, retry behavior, and business impact. Never submit API keys or other credentials.
