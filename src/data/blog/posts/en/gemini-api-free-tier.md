---
title: "Gemini API Free Tier Limits (2026): Project Quotas, API Keys, and the Paid Boundary"
description: How to read Gemini API free tier limits today — which model lines still have a Free Tier, why an API key does not own quota on its own, how to check real-time project RPM/TPM/RPD in AI Studio, when to move to a paid project, and the correct 429/RESOURCE_EXHAUSTED troubleshooting order.
date: 2026-04-25
category: API开发
tags: [Gemini API, Free Tier, Rate Limits, AI Studio, Google AI]
readTime: 12
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

The Gemini API still has free tier support on some model and feature lines, but "Gemini API free tier limits" can no longer be read as a single number frozen in a public table. What actually determines whether your app can keep calling the API is the Google Cloud project behind the API key, the model being called, the usage tier, the region, the billing status, and Google's current product strategy.

As of July 16, 2026, the safest way to judge is: first open Google's [Gemini API pricing page](https://ai.google.dev/gemini-api/docs/pricing) to check whether the target model or feature line still shows a Free Tier; then open AI Studio, switch to the project that created this API key, and look at that project's current RPM, TPM, RPD, reset rules, and usage. Creating several API keys in the same project doesn't multiply the free quota; the key is only a credential, the project is the unit that owns quotas and billing.

If you're just learning the API, validating prompts, or building a small prototype, the free tier still has value. But if your service faces real users, handles sensitive or commercial data, needs stable throughput, hits 429 frequently, or uses a model line that isn't free anyway, move the workload to a billing-enabled project instead of making production promises around free quota.

| What you really want to know | Current answer | Where to check |
| --- | --- | --- |
| Is the Gemini API still free? | Some model and feature lines still have a Free Tier. | Google Gemini API pricing page |
| What exactly is my free quota? | Depends on project, model, tier, region, and billing status. | Usage / rate-limit view of the corresponding project in AI Studio |
| Does each API key have its own quota? | No. The key authenticates; the project owns the quota and billing boundary. | API key docs, project and billing settings |
| What happens when I exceed it? | Usually 429 or `RESOURCE_EXHAUSTED`. | Rate limits and troubleshooting docs |
| Can production rely on the free tier? | Only low-risk, low-traffic, failure-tolerant scenarios. | Billing, data-processing, and usage-tier docs |

## Saying "Gemini API Free Tier Limits" Today Means Three Things

First, whether the model or feature itself still allows free use. This answer should not come from old blogs, screenshots, or forum tables — it should come from Google's current pricing page. A model may have a free tier on one API path but not on another feature, preview capability, image, or batch path; different model lines under the same Gemini brand can also be in different availability states.

Second, how rate limits are defined. Google's [rate limits documentation](https://ai.google.dev/gemini-api/docs/rate-limits) still uses RPM, TPM, and RPD as the core dimensions: requests per minute, tokens per minute, requests per day. It explains how to understand the limits, but it doesn't promise every project will always see the same numbers.

Third, how much your project can actually use right now. That number lives in the AI Studio project view, because project, model, region, usage tier, billing status, or Google policy changes can all change the real available quota. In other words: the pricing page answers "is this model line free," AI Studio answers "how much can this project use right now," and the API key itself doesn't hand you a new bucket of quota.

Old RPM/RPD tables are only historical clues. If some material tells you "the Gemini API free tier is just a fixed set of RPM/RPD numbers" without pointing you to the AI Studio project view, don't treat it as a current production contract.

## Which Source Owns Which Answer

Free-tier questions go wrong when people mix several sources together. The safest approach is to assign each kind of judgment to its proper source.

| Claim to verify | Most appropriate source | How to use it |
| --- | --- | --- |
| Whether a model or feature has a Free Tier | [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) | Find the current model line, API surface, and free/paid status. |
| How RPM, TPM, RPD are defined | [Gemini API rate limits](https://ai.google.dev/gemini-api/docs/rate-limits) | Confirm rate dimensions, usage tiers, and reset logic. |
| Which project a key belongs to | [Gemini API key documentation](https://ai.google.dev/gemini-api/docs/api-key) | Confirm the project context behind the calling credential. |
| What enabling billing changes | [Gemini API billing documentation](https://ai.google.dev/gemini-api/docs/billing/) | Understand paid projects, usage tiers, data processing, and Cloud credit boundaries. |
| Why a request fails | [Gemini API troubleshooting](https://ai.google.dev/gemini-api/docs/troubleshooting) | Separate 429, quota exhaustion, region, billing, and model unavailability. |

This source split matters more than static numbers. The pricing page can tell you whether a model is free, but it can't replace the project's live dashboard. Rate-limit docs can explain RPM, TPM, RPD, but they can't say your API key owns its own bucket of quota. Billing docs explain the upgrade boundary, but that doesn't mean a free project is right for real user data.

If you remember one rule, remember this: model free status, project live quota, and billing status are three different surfaces.

## The API Key Is Not a Quota Pool; the Project Owns the Quota

An API key is a credential. It lets a request be recognized and authenticated, but it doesn't create an independent free quota pool. Whether you put Key A, Key B, and Key C from the same project into development, testing, and production, they all consume the same project's quota.

This directly changes how you troubleshoot. When one key starts 429ing, many people create a new key to keep going. If the new key is still from the same project, the problem usually doesn't go away. New keys are for rotation, environment isolation, and security management — not for expanding free quota.

What you should actually inspect is the project: who created it, which Google account manages it, whether billing is enabled, whether the model ID being called is correct, and whether AI Studio is showing the same project. In team collaboration especially, a key a colleague sends you may belong to their project, not necessarily your budget, quota, or compliance boundary.

| Check item | Why it matters |
| --- | --- |
| Which Google account created the key | Determines whether you can enter the right management surface. |
| Which Google Cloud project the key is behind | Quota, billing, and usage records all attach to the project. |
| Is billing enabled on this project | Usage tier, data processing, and available models can change. |
| What model ID is the code calling | Different model lines have different free status and limits. |
| Is AI Studio showing the same project | The wrong project gives a completely wrong quota judgment. |

Also separate "quota problems" from "auth migration." Google's current [API key docs](https://ai.google.dev/gemini-api/docs/api-key) state that new AI Studio keys default to auth keys and that standard key requests will be rejected in September 2026. Existing integrations should confirm key types before the deadline and migrate per the official guidance; migration fixes auth continuity, it doesn't add independent quota to a key.

Don't bypass quota by creating more keys. The right moves are reducing requests, checking the model and project, optimizing retries, or moving apps that need stable capacity to a billed project.

## What the Free Tier Is For and What It Is Not

The free tier is best for development, learning, and low-traffic testing. You can use it to learn the Gemini API, compare prompts, validate small prototypes, and run occasional internal tools. It's not for promising customer throughput with no fallback, and not for content that the free-tier data policy can't cover.

Don't just read the "Gemini 3.x" family name. On July 16 the official pricing page split same-generation models into different execution lines with different free status:

| Current pricing page example | Does the standard line show a free tier | What this example shows |
| --- | --- | --- |
| Gemini 3.5 Flash | Yes | Standard text/multimodal lines can still show free input/output, subject to real-time project limits. |
| Gemini 3.1 Flash-Lite | Yes | The standard line for high-volume lightweight tasks still has a Free Tier. |
| Gemini 3.1 Pro Preview | No | A family name containing "3.1" doesn't mean the line is free. |
| Gemini 3.1 Flash Image / Flash Lite Image | No | Image-generation lines can be paid-only even when the same family's text lines are free. |

This is a dated example of how to read the page, not a permanent entitlement table. Before deploying, verify the exact model ID, execution lines like Standard/Batch/Flex/Priority, and the same project's real-time limits in AI Studio.

| Workload | Free tier suitable? | Paid project suitable? |
| --- | --- | --- |
| Learning API calls | Suitable | Usually unnecessary |
| Small prototype with synthetic data | Suitable, but keep it low-frequency | Better when testing near-real throughput |
| Internal demos | Possible, but accept failures | Better for meetings, client demos, stable experience |
| Features facing real users | Higher risk | Usually the right path |
| Sensitive, compliance, or commercial data | Not recommended by default | Verify paid data-processing terms |
| High-volume batch processing | Not suitable | Use paid tier or batch-suitable paths |
| Models or features only open to paid tiers | Unavailable | Must pay |

Also watch your budget assumptions. Google's current billing docs state that new Google Cloud free trial credits created after March 2026 do not apply to the Gemini API or AI Studio. So don't write "Cloud has free trial credits" into a Gemini API cost plan unless the current billing docs explicitly support it.

When enabling billing, AI Studio assigns the account a prepaid or postpaid plan. New prepaid accounts currently have a minimum purchase of $10, and when the balance hits zero, Gemini API projects under the associated billing account stop serving — they don't automatically fall back to the free tier. So "billing is on" isn't enough; on-call production staff must also monitor plan type, balance, auto-recharge, and budget alerts.

Upgrading isn't a failure; it's the boundary becoming clear. Use the free tier while it's enough; once normal use keeps hitting 429, the model line requires payment, users can't accept failures, or data-processing demands rise, enable billing and set up budget monitoring.

## How to Check Your Real-Time Free Quota

The actual steps aren't complicated, but you must target the right project.

1. Open AI Studio with the Google account that manages the API key.
2. Switch to the project the app is actually using.
3. Open that project's usage or rate-limit view.
4. Confirm the model ID the code calls.
5. Record RPM, TPM, RPD, reset rules, usage tier, and billing status.
6. Re-check before release, demos, migrations, and traffic changes.

### Write the Check Results into a Reviewable Release Record

Don't just leave "tested, it works." A reviewable check should record at least the fields below, so the next on-call engineer can tell whether Google's rules changed or the app switched to the wrong project or model.

| Record field | Example | What misjudgment it rules out |
| --- | --- | --- |
| Project ID and managing account | `demo-project`, managed by platform team | Prevents checking quota in the wrong project. |
| Key type and migration status | auth key; standard key migrated | Prevents mistaking September auth failures for quota exhaustion. |
| Exact model ID and execution line | `gemini-3.5-flash` / Standard | Prevents inferring free status from family name. |
| AI Studio live values and check time | RPM, TPM, RPD; 2026-07-16 | Prevents treating old blog numbers as current caps. |
| Billing plan and balance owner | Prepay; balance alerts to platform team | Prevents assuming auto-fallback to free tier after balance hits zero. |
| Failure strategy | backoff, cache, model fallback, stop conditions | Prevents unbounded retries after 429. |

For example, an internal text prototype using `gemini-3.5-flash` Standard with enough real-time project quota, non-sensitive input, and retryable failures can keep validating for free. But if the same team switches to `gemini-3.1-flash-image` for a customer-facing image feature, it can't keep the old conclusion just because "both are called Gemini 3." That pricing line is paid-only; you must re-confirm billing, balance, data terms, and failure strategy.

If you compare multiple keys, compare by project, not by key. Two keys in the same project count as one quota ownership. Two projects calling the same model can see different results due to billing, region, account history, or current tier.

The core decision here: RPM controls request frequency, TPM controls token throughput, and RPD controls the daily total. When any one dimension is exhausted, requests can fail.

## What to Do First After 429 or RESOURCE_EXHAUSTED

429 doesn't mean the free tier disappeared. More often it means: some rate dimension ran out, you looked at the wrong project, you called the wrong model, the model line requires billing, the region or account state mismatches, or the app's retry pattern amplified the throttling.

Troubleshoot in this order:

| Step | Action | Why first |
| --- | --- | --- |
| 1 | Check the project behind the key in AI Studio | Confirm real quota ownership first. |
| 2 | Verify the model ID and API surface | Paid models, preview models, or different feature lines change the result. |
| 3 | Look at RPM, TPM, RPD separately | Only knowing which dimension is exhausted decides the fix. |
| 4 | Reduce concurrency and add backoff retries | Retrying too fast makes throttling worse. |
| 5 | Shorten prompts, cache repeated results | Immediately cuts token and request consumption. |
| 6 | Move to a billed project if normal traffic still caps | Production capacity shouldn't depend on fragile free quota. |

If the error is `RESOURCE_EXHAUSTED`, treat it as a quota event first. If the message mentions billing, region, unsupported model, or failed precondition, don't just wait for a reset. Paid projects can also trigger spend-based rate limits evaluated over 10-minute windows that return 429; then you lower high-cost request rates, wait out the short window, or request a limit increase rather than only watching RPM/RPD. Go back to the troubleshooting docs and separate quota, spend, billing, region, and model eligibility.

The stop line is also clear: don't create more same-project keys to dodge limits. Either optimize the load, confirm the project, or upgrade the project.

## Designing So Free-Tier Changes Don't Interrupt You

The free tier changes, so the system shouldn't depend on a hard-coded number.

Use the free tier for measurement, not promises. During development, record real request counts, prompt lengths, token consumption, failure rates, and retry counts. That tells you whether your actual load fits the free tier, instead of only whether some number on an old table looks big enough.

Keep model routing. Simple classification, entity extraction, and short replies can use faster, cheaper models; complex reasoning, long context, and code analysis go to stronger models. This isn't dodging quota — it's spending limited quota where it actually matters.

Cache repeatable results. FAQ, classifiers, routing assistants, and internal knowledge Q&A frequently repeat similar requests. Caching cuts both request count and token count without lowering model quality.

Record errors by dimension. A daily-quota problem, a per-minute concurrency problem, and a token-throughput problem have different fixes. Writing only "Gemini failed" in logs isn't enough; at minimum record the model ID, project, error code, request size, retry count, and usage tier at the time.

Plan the paid path early. A small project can start free, but the production plan should already know which project will enable billing, who owns the budget, what the alert thresholds are, what data is allowed to be sent, and when the switch must happen.

## Common Misconceptions

Don't say "free API key quota." The key isn't the quota owner. Team docs, code comments, and troubleshooting runbooks should say "project quota."

Don't copy old RPM/RPD tables into requirements docs. Tables help understand magnitude, but current available values belong to the AI Studio project view.

Don't treat Gemini App usage limits as Gemini API facts. The consumer app, AI Studio, the Gemini API, and Vertex AI can be different contracts.

Don't assume Google Cloud free trial credits cover the Gemini API. Check the current billing page before budgeting.

Don't assume free means safer. The free tier's data-processing boundaries may differ from the paid tier. If prompts contain customer data, trade secrets, compliance material, or content users wouldn't expect to be used for product improvement, confirm the data terms first.

## Final Decision Rules

When the workload is low-frequency, non-sensitive, retryable, and still within the AI Studio real-time limits of the project behind the key, keep using the free tier.

When normal traffic keeps 429ing, the app needs stable throughput, the target model or feature isn't on the free tier, privacy/compliance matters, or users will face real failures from quota changes, move to a paid project.

The free tier still has value, but it's not a production entitlement. Treat it as a project limit that needs live checking, continuous measurement, and periodic review — not an always-valid public number.

## FAQ

### Does the Gemini API free tier still exist?

Yes, some Gemini API model and feature lines still have a Free Tier. The exact status must come from Google's current pricing page; don't assume every model, preview capability, image, batch, or special feature is free.

### Where do I check my exact Gemini API free tier limit?

In AI Studio, check the project behind the API key. The project view is the operational source for real-time RPM, TPM, RPD, reset rules, and usage. Public tables can't replace the project view.

### Does each Gemini API key have its own free quota?

No. An API key is only a credential. The Google Cloud project behind the key owns the quota and billing boundary. Multiple keys in the same project share the same project limits.

### Does creating more keys raise the free quota?

No. New keys in the same project suit rotation and environment isolation but don't add quota. When you need more capacity, reduce the load, change architecture, or move to a paid project.

### Do I need to migrate Gemini API keys in 2026?

Possibly. Google currently creates auth keys by default and plans to reject standard key requests in September 2026. Confirm your existing key types in AI Studio and migrate per the official instructions. Auth migration doesn't increase project quota.

### What does 429 or RESOURCE_EXHAUSTED mean?

Usually some rate-limit dimension is exhausted. First check the same project's AI Studio usage, confirm the model ID, then decide between waiting, lowering concurrency, shortening prompts, caching responses, or enabling billing.

### Is the Gemini 3 or Gemini 3.1 API free?

Don't answer from the model nickname or old material. Check the exact model line and API surface on the current Gemini API pricing page. Some new models or preview capabilities can be paid-only even when other Gemini lines still have free tiers.

### Can the free tier be used in production?

Only for low-risk, low-traffic, failure-tolerant, non-sensitive production scenarios. Customer-facing apps, sensitive-data handling, high traffic, or stability-critical apps should use billing-enabled projects.

### Do Google Cloud free trial credits cover the Gemini API?

Per the current billing page, new Google Cloud free trial credits created after March 2026 don't apply to the Gemini API or AI Studio. Re-check the billing page before budgeting.

### Do free and paid tiers differ in model quality?

The more important differences are usually quota, features, data processing, and predictability — not model quality. For exact models and tiers, follow the current pricing page and billing docs.

### What should I record before relying on the free tier?

Record the project ID, model ID, usage tier, RPM/TPM/RPD shown in AI Studio, reset rules, billing status, and the check date. Re-verify before releases, demos, migrations, and traffic changes.
