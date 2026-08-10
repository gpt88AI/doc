---
title: GPT Image 2 Usage Limits: ChatGPT Caps, API Rate Limits, and Handling 429
description: GPT Image 2's limits are not a single number. Distinguish ChatGPT image caps, OpenAI API TPM/IPM and monthly usage, Azure quotas, and gateway credits, then identify which owner blocked you before waiting, throttling, raising limits, or switching routes.
date: 2026-05-05
category: API开发
tags: [GPT Image 2, ChatGPT 图片, OpenAI API, 速率限制, 429]
readTime: 14
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

GPT Image 2's limits are not a single number. ChatGPT image counts, OpenAI API TPM/IPM, monthly usage, Azure quotas, and third-party credits are each controlled by a different entry point.

There is no one universal usage limit for GPT Image 2. The image count you see in ChatGPT, the TPM/IPM you hit in the OpenAI API, the monthly usage you run into in billing, the quota you see in Azure, and the credits a third-party platform gives you are each owned by different parties. As of the 2026-05-05 verification, the official gpt-image-2 model table for the direct OpenAI API showed: Free is not supported, Tier 1 is 100,000 TPM / 5 IPM, Tier 2 is 250,000 TPM / 20 IPM, Tier 3 is 800,000 TPM / 50 IPM, Tier 4 is 3,000,000 TPM / 150 IPM, and Tier 5 is 8,000,000 TPM / 250 IPM; but your organization, project dashboard, and response headers can still report tighter real-time limits.

| Entry point you are using | Limit owner | Look at first | Minimum responsible action |
| --- | --- | --- | --- |
| ChatGPT image generation | ChatGPT app, plan, account state, and current system conditions | The app prompt when it stops, the plan page, Help Center | Wait for reset or lower demand; do not use the API tier table to explain app limits |
| Calling gpt-image-2 via the OpenAI API | OpenAI API org, project, and model limits table | Model page, limits dashboard, response headers, monthly usage | Lower concurrency, honor reset headers, or request a higher tier |
| Monthly API usage stopped | OpenAI billing and usage ceiling | Usage dashboard, billing state, project owner | Raise the monthly limit or pause; retrying will not create budget |
| Azure OpenAI | Microsoft subscription, region, deployment, and quota | Azure portal and Microsoft Learn quota docs | Handle it per Azure quota, not per direct OpenAI API |
| Third-party provider or gateway | That provider's balance, dashboard, terms, and routes | Provider dashboard, pricing, retry policy, model routes | Verify the owner's own limits first, then migrate production traffic |

Before retrying, upgrading, or switching routes, answer three questions: which owner blocked you, which bucket was exhausted, and whether the live source asks you to wait, throttle, raise a limit, fix billing, or move to another contract.

## Official OpenAI API limits

API users should look at OpenAI's gpt-image-2 model page first, not ChatGPT plan rumors, community daily-count tables, or provider marketing pages. The model page controls the developer model ID, supported image-generation routes, Free tier boundaries, and the public TPM/IPM numbers. These numbers only answer throughput for the direct OpenAI API; they do not answer ChatGPT app caps, Azure deployment quotas, or third-party credits.

| OpenAI API tier for gpt-image-2 | TPM | IPM | What this means |
| --- | --- | --- | --- |
| Free | Not supported | Not supported | No supported official Free API lane for this model |
| Tier 1 | 100,000 | 5 | Low-throughput projects can still hit the per-minute image count first |
| Tier 2 | 250,000 | 20 | Higher token space and request counts, but still bounded by whichever bucket runs out first |
| Tier 3 | 800,000 | 50 | Better suited to queue-backed product testing and internal tools |
| Tier 4 | 3,000,000 | 150 | Handles higher sustained throughput, but still an org/project-level limit |
| Tier 5 | 8,000,000 | 250 | Highest value in the public table; not every request shape is allowed through |

OpenAI's rate-limit guidance also notes that limits apply at the organization and project scope. Two scripts in the same project drain the same pool; moving requests from one file to another does not create new capacity. The model table gives public ceilings, while the dashboard, response headers, and billing state tell you whether your current project can keep running.

Also check access boundaries separately. GPT Image models may require organization verification. A verification block is not a rate limit: if the request is rejected before any real generation, adding sleep, lowering concurrency, or retrying is pointless. Fix organization verification, billing, model access, project permissions, or endpoint config first.

## Rate limit, usage limit, and app cap are not the same thing

In Chinese, "usage limit" tends to bundle several different controls together: images per minute, tokens per minute, requests per day, monthly billing, organization verification, ChatGPT cooldown, and provider balance. They are not different names for the same counter.

The OpenAI API rate limit is a time-window throughput control. TPM measures token pressure, IPM measures image-request pressure, and RPM, RPD, and TPD can also appear on certain API surfaces. The more useful question is not "how many images can GPT Image 2 generate in total," but "under which owner scope did this request exhaust which bucket."

Monthly usage is another layer. A monthly spend ceiling can block requests that otherwise satisfy the per-minute rate. When billing or monthly usage is exhausted, continuous retrying is the wrong move: failed requests can still add pressure without adding budget. Check usage, billing, the project owner, and the monthly cap instead.

The ChatGPT app cap is a consumer-side contract. It depends on the ChatGPT app, account, plan, current system conditions, and product rules. OpenAI's ChatGPT Images FAQ and pricing pages can say which plans are available and which capabilities are subject to guardrails or temporary restrictions, but they will not turn every account into a permanent image/day table. The "N images per day" you see on Chinese web pages is only a demand signal, not an official answer.

## ChatGPT image counts need live app evidence

If ChatGPT stops generating images, do not copy the API TPM/IPM table onto the app scenario. ChatGPT users have no directly exposed gpt-image-2 organization/project pool. The app is a consumer-facing product surface affected by the plan, account state, current load, safety systems, and temporary restrictions all at once.

First, look at the stop prompt ChatGPT gives. It usually says whether to wait, lower the request, modify the prompt, or try later. Second, check the current plan page and Help Center. For ChatGPT image availability, the official page is the first-party source; but if the page only says available, limited, subject to restrictions, or higher limits, do not invent a fixed daily count for it.

"Unlimited" also needs a stop rule. Even if some paid or enterprise routes use looser wording, they can still be affected by abuse guardrails, temporary restrictions, system conditions, or account rules. If the app says wait, wait; if the message is a safety or prompt problem, switching accounts or retrying aggressively will not solve it. Only when you need automation, logs, batching, customer-facing output, or persistent storage should you move to the API route and accept the API's own billing, permissions, and rate-limit contract.

## Recovery flow after a GPT Image 2 limit

Start recovery from the block you actually hit, not from "finding a higher count."

| Symptom | More likely owner | What to check | What not to do |
| --- | --- | --- | --- |
| ChatGPT says the image limit is reached | ChatGPT app | App prompt, plan copy, account state | Do not apply the API tier table or treat a wrapper as a bypass route |
| API returns 429 rate-limit wording | OpenAI API project/org | Response body, headers, model, project, org, retry-after/reset, request shape | Do not retry in a tight loop; failed retries can still count against the limit |
| API says quota, billing, or usage exhausted | OpenAI billing/project | Usage dashboard, billing, monthly limit, project owner | Do not treat it as a per-minute cooldown |
| Model unavailable before generation | OpenAI account/model access | Model ID, org verification, endpoint, project permission | Do not raise throughput before access is proven |
| Azure deployment stopped | Azure OpenAI | Azure portal, subscription, region, deployment quota | Do not file a Microsoft quota issue as a direct OpenAI API ticket |
| Provider playground stopped | Provider/gateway | Provider dashboard, credits, route, status, retry policy, terms | Do not call it an official OpenAI cap |

For an API 429, keep a small incident packet: route, model ID, organization, project, request size, quality settings, endpoint, response body, response headers, reset time, retry count, and whether monthly usage is near the cap. The packet tells you whether to lower concurrency, queue, reduce request pressure, wait for reset, request a higher tier, or fix billing. It also lets support reproduce the problem.

A ChatGPT app limit is more like a manual workflow. Save the app message, and observe whether the same account can generate a smaller or simpler image later; do not jump routes before distinguishing plan quota, temporary load, policy, and prompt complexity. If you need batching, monitoring, stable storage, or customer-facing automation, evaluate the API instead of hunting for a consumer-side bypass.

For monthly usage, stop retrying and fix the budget owner. OpenAI usage tiers and monthly limits are budget controls. If a project has hit its spend ceiling, no amount of clever backoff will produce images. The next step is a billing or usage-limit decision, not a 429 retry decision.

## Azure, providers, and gateways each have their own quota owner

Azure OpenAI is not the same owner as the direct OpenAI API. Microsoft manages quota by Azure subscription, region, deployment, and model route. It can be the right entry point for enterprise scenarios, but its limits must be explained with the Azure portal and Microsoft Learn, not crammed into OpenAI's gpt-image-2 table.

Third-party providers and gateways also own their quota contracts. A provider may have daily credits, trial balances, routing labels, queues, retry policies, quality defaults, data rules, failure billing, and support paths. They can be used for evaluation or multi-route access, but these limits belong to the provider and cannot be rewritten as official OpenAI limits.

When comparing providers, keep the route label first. If the question is official API entitlement, use direct OpenAI evidence; if the question is cost, region, payment, or multi-model access, that is a provider comparison that requires verifying price, credits, model coverage, speed, failure billing, refunds, uptime, and service scope item by item. Without current evidence, do not publish these volatile claims.

When accessing gpt-image-2 through the GPT88 unified gateway, quota, group multipliers, whether failures are billed, and the support path follow the current gpt88.cc console pages. GPT88 is an access provider; the official model ID and OpenAI's rate-limit semantics stay unchanged. Account balance billing follows the 1 yuan = 1 balance basis, charging official usage × the selected group multiplier.

## Adjacent questions should be separated

This usage-limit page only answers three things: which owner controls the cap, which bucket was exhausted, and what the minimal recovery action is. Nearby GPT Image 2 questions should be split because the readers' tasks differ.

If the question is only whether the official API is free, look at the API free-tier boundary. To compare free trials, browser tests, providers, and unlimited claims, look at the free-and-unlimited verification. Cost comparisons go to the cost materials; image size and output workflows go to the 4K image-generation guide; product routes and naming maps go to the ChatGPT Images 2.0 entry materials.

With that split, this page can keep returning to owner, bucket, live sources, and recovery.

## FAQ

### What are the official usage limits for the GPT Image 2 API?

As of the 2026-05-05 verification, the direct OpenAI API gpt-image-2 table showed: Free is not supported, Tier 1 is 100,000 TPM / 5 IPM, Tier 2 is 250,000 TPM / 20 IPM, Tier 3 is 800,000 TPM / 50 IPM, Tier 4 is 3,000,000 TPM / 150 IPM, and Tier 5 is 8,000,000 TPM / 250 IPM. Your org/project dashboard and response headers can still be tighter.

### How many images can GPT Image 2 generate per day in ChatGPT?

Look at the current ChatGPT app message and official plan wording. OpenAI Help and pricing describe image availability, but the exact app-side count depends on account, features, region, system conditions, and temporary restrictions. Do not write third-party exact counts as official promises.

### Do the API limits reset daily?

There is no universal daily image count. API rate limits work through buckets such as TPM, IPM, RPM, RPD, TPD, and project/org scope. Reset behavior depends on which bucket was exhausted and the response headers. Monthly usage is a billing ceiling, not a daily image reset.

### Why do I still get 429 when my monthly quota is not used up?

Because monthly usage and per-window throughput are different controls. You can still have monthly budget while already exceeding IPM, TPM, RPM, or another real-time bucket. Read the error body and headers first, then decide whether to change billing or the route.

### RPM looks normal — why does it say quota or billing?

What may be exhausted is monthly usage, project billing, organization verification, or model access, not requests per minute. Stop retrying and check Usage, Billing, Limits, the project owner, and model access.

### Can I use the API to bypass ChatGPT's image limits?

You should not treat the API as a way to bypass app caps. The API is a separate developer contract with billing, limits, verification, logging, and support responsibilities. Use it only when you actually need a product API route.

### Are Azure GPT Image 2 limits the same as the OpenAI API?

No. Azure OpenAI quota is controlled by Microsoft and depends on the Azure subscription, region, deployment, and quota settings. For Azure, use the Azure portal and Microsoft Learn; for the direct OpenAI API, use OpenAI docs.

### Does provider credit raise my OpenAI API tier?

No. Provider credit belongs to the provider route. It can help with evaluation or routing, but it does not change your OpenAI direct organization/project tier unless the traffic is itself handled by the provider under a clearly stated separate contract.

### When I access gpt-image-2 through GPT88, what do the usage limits follow?

GPT88 is a unified gateway; the official model's rate and billing semantics stay unchanged. Your GPT88 account balance, group multiplier, and failure-billing rules follow the current gpt88.cc console pages, and specific pricing and quotas are subject to the gpt88.cc console.
