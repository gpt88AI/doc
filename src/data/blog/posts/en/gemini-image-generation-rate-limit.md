---
title: How to Read Your Nano Banana Quota in AI Studio: Distinguish the 5 Entry Points First
description: Explains why Nano Banana has no fixed quota for all AI Studio users — separate the Gemini app, AI Studio browser workspace, Gemini Developer API project, Vertex AI, and third-party credits. Debug 429s and quota resets with RPM, TPM, RPD, and IPM.
date: 2026-05-03
category: API开发
tags: [Nano Banana, AI Studio, Gemini API, Image Generation Quota, Rate Limit]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

There is no single Nano Banana image count that applies to every AI Studio user. The real number depends on which entry point you use: the Gemini app, the AI Studio browser workspace, a Gemini Developer API project, Vertex AI, or a third-party wrapper. Each has its own plans, projects, models, billing, and limits.

If you call the Gemini API from code, the most reliable number comes from the logged-in [AI Studio project rate-limit page](https://aistudio.google.com/rate-limit): confirm the current project, the actual model, and the usage tier, then check whether the limit is RPM, TPM, RPD, or IPM. If the page only says "limit reached" without project, model, or quota metric, don't apply some quota table circulating online.

## Confirm in 30 Seconds: Who Manages Your Quota

Chinese-speaking users often treat "quota", "rate limit", and "image generation cap" as the same thing. When troubleshooting, work backwards: first identify the entry point, then the page that manages it.

| Where you generate images | Who manages the quota | Where to check current numbers | Don't mistake it for |
| --- | --- | --- | --- |
| Gemini web or mobile app | Gemini app account and subscription plan | In-product prompts, "usage limits" in settings, Gemini app help | Gemini API project quota |
| AI Studio browser workspace | Browser feature status, and limits of the currently selected API project | Read the UI text first, then check the selected project's rate-limit page | A fixed count shared by all AI Studio users |
| Gemini Developer API | Project, model, usage tier, and specific quota metric | AI Studio project rate-limit page and API error details | A separate quota per API key |
| Vertex AI | Google Cloud project, region, quota, IAM, and billing | Cloud Console and Vertex AI quota pages | An "unlimited channel" to bypass AI Studio limits |
| Third-party tool or wrapper API | Provider balance, subscription, queue, model alias, and upstream contract | The service's billing, usage records, and support channel | The original quota of a Google project |

The key takeaway from this table: **the same Google account is not the same quota pool, and the same product name is not the same set of limits.** Just because the Gemini app stops generating images doesn't mean the Gemini API project is exhausted. And a credits balance shown by a third-party interface doesn't let you infer the Google project's IPM or RPD.

## Why AI Studio Browser Hints Are Not API Quota

AI Studio is both an experimental browser workspace and the entry point for viewing Gemini Developer API projects and rate limits. So "I see a limit in AI Studio" can mean two different things: the browser feature gave a product-level hint, or an actual request hit a project-level API limit.

The shortest way to tell them apart:

1. Keep the full UI or error response text, not just the words "rate limit".
2. Confirm the currently selected project and whether the API key belongs to it.
3. Record the actual model ID, failure time, and timezone.
4. Open the project's rate-limit page and see whether any dimension has reached its current value.
5. If it's an API response, also save the status code, error body, quota metric, and `retryDelay`.

If there's only a UI hint with no project evidence, treat it as a browser problem first: refresh the state, reduce to one controlled retry, and check AI Studio's official "reached rate limit" troubleshooting notes. Only when code clearly returns `429 RESOURCE_EXHAUSTED` should you enter the API rate-limit branch.

## API Projects: Look at Four Metrics, Not "How Many Per Day"

Google's current [Gemini API rate-limits documentation](https://ai.google.dev/gemini-api/docs/rate-limits?hl=en) splits common limits into RPM, input TPM, and RPD; Nano Banana models that generate images may also use IPM. Hitting any one dimension can fail your request.

| Metric | What it answers | Common symptom | First action |
| --- | --- | --- | --- |
| RPM | How many requests per minute | Concentrated failures during bursts | Lower concurrency, queue, exponential backoff with jitter |
| Input TPM | How many input tokens per minute | Long prompts, multi-image input, or large context fail more often | Shorten input, split tasks, reuse cacheable content |
| RPD | Total requests per API day | Used up during a long-running day | Set a daily budget, wait for the API day reset, request a higher limit if needed |
| IPM | How many images per minute | Text requests fine, image tasks limited at peak | Queue images separately, lower concurrency, avoid retry amplification |

Gemini Developer API limits are computed per **project**, not per API key. Creating another key in the same project doesn't duplicate the quota. For stable business volume, the correct approach is to record load, queuing, and failure rates, then optimize calls within the current project or request a limit increase — not rotate keys.

As of July 20, 2026, the official documentation states that the API's RPD resets at **midnight Pacific Time**. This rule belongs only to the Gemini Developer API's daily request dimension and cannot be extended to the Gemini app, Vertex AI, or third-party credits. Pacific time also involves seasonal shifts, so don't permanently convert it into a fixed Beijing time.

## A 429 Example: Identify the Metric First, Then Decide Whether to Wait

Say an image queue fails continuously at 14:06 with `429 RESOURCE_EXHAUSTED`. Knowing only "I generated a few hundred images today" is not enough to diagnose it.

Collect this set of evidence first:

- Entry point: Gemini Developer API, not the Gemini app;
- Project: the actual project the API key belongs to;
- Model: the full model ID in the request body;
- Metric: the quota metric in the error details;
- Time: failure time, timezone, and whether it clustered within one minute;
- Response: status code, error body, `retryDelay`, and request ID;
- Dashboard: the project tier and current limit shown in AI Studio at the same moment.

If the metric is RPM, waiting until "tomorrow" is slow and unnecessary — you should shave the peak and back off. If it's RPD, tight worker retries only create more failures. If it's IPM, split image tasks out of text requests and queue them separately. For code-level retry, idempotency, and logging, refer to Gemini image generation 429 fix materials.

## The Gemini App Can't Be Answered with a Fixed Daily Table Anymore

The Gemini app is a consumer product. Its limits are determined by the account, subscription plan, feature availability, and current capacity — not by the RPM or IPM of an AI Studio project.

In the [Gemini app usage-limits help page](https://support.google.com/gemini/answer/16275805?hl=en) checked on July 20, 2026, Nano Banana 2 image generation and Nano Banana Pro image editing appear in the feature availability list; the page also notes that usage limits may change with testing, experiments, availability, and system load. The current page does not provide a safely reusable "fixed images per day per plan" table.

So to know your remaining quota, trust the in-product state: open the Gemini app's settings and "usage limits", and read the refresh hint shown after hitting a limit. Don't treat historical screenshots, forum numbers, or old articles as a guarantee for your current account; a page not publishing a fixed number also doesn't mean unlimited use.

Consumer subscriptions and API project billing are two separate things. Buying a Google AI plan may change features or priority inside the Gemini app, but it won't automatically raise another Gemini API project's quota.

## Check Free, Pricing, and Quota Separately

"Is Nano Banana free" can't replace "how many more times can my project call it". At minimum, do three steps:

1. **Is the model available**: check the current model docs and the account/project entry.
2. **Is a free tier or paid tier supported**: check the same-day official pricing page row for that model.
3. **How much quota does the current project have**: check the logged-in AI Studio project rate-limit page.

As of July 20, 2026, on the official [Gemini Developer API pricing page](https://ai.google.dev/gemini-api/docs/pricing?hl=en), the standard API rows for `gemini-3.1-flash-image`, `gemini-3.1-flash-lite-image`, `gemini-3-pro-image`, and `gemini-2.5-flash-image` all mark the free tier as unavailable. This is a **dated pricing-page snapshot**, not a conclusion that the Gemini app or third-party tools are "all paid", nor does it state the real-time RPM, RPD, or IPM of a logged-out project.

Billing also isn't unlimited. A paid status can change model eligibility and usage tier, but project, model, spend, safety, and actual capacity limits still exist. Google also states explicitly that published rate limits don't guarantee actual capacity, and preview or experimental models are often stricter. If your core question is API free-tier eligibility, see the Gemini API free tier and project boundaries materials.

## When Vertex AI Is the Right Entry

Vertex AI's value is bringing generative AI into Google Cloud's project, region, IAM, logging, billing, governance, and quota-request workflows. It suits teams that already need these production controls, but it's not a way to "generate unlimited images by switching entry points".

Before migrating, re-verify the target model's availability on Vertex AI, the project and region, identity permissions, quota names, costs, and support process. Don't copy AI Studio project numbers as Vertex AI promises, and don't blindly add Cloud complexity to dodge consumer app usage hints. For comparing the two official development routes, see the AI Studio vs Vertex AI selection notes.

Regional availability is an independent check item; trust Google's current official pages and your actual account status. This article doesn't claim a specific region is definitely available, nor treats changing region, account location, or project region as a scaling method.

## Why Third-Party Credits Can't Be Converted to Google Quota

Third-party tools may use "credits", "points", "images", or subscription balance. These units are defined by the provider's own pricing, queues, model aliases, failure refunds, and upstream contracts. Even if the interface says Nano Banana, you can't infer the Google AI Studio project's RPM, IPM, or RPD from it.

When debugging a third-party limit, confirm with the service: the actual model alias, how a successful output is charged, whether failures are charged, whether balance expires, concurrency and queue rules, and whether upstream 429s are passed through. Don't treat third-party credits as Google quota, and don't describe buying more credits as raising a Google project limit.

## Prepare This Record Before Submitting a Quota Request or Support Ticket

A reproducible record is much more likely to get effective handling than "I roughly generated a lot today":

- Entry point and page or API;
- Account plan, or project and usage tier;
- Full model ID;
- RPM, TPM, RPD, IPM, or another explicit quota metric;
- Failure time and timezone;
- Status code, error body, `retryDelay`, and request ID;
- Current values shown in AI Studio or Cloud Console;
- Real request volume, concurrency, and failure rate over a minute and a day;
- Rate-limiting, queuing, caching, and backoff measures already taken.

Don't include API keys, project IDs, billing info, or account identifiers in the record. When asking for help externally, share sanitized structured data only.

## FAQ

### How many images can Nano Banana generate per day in AI Studio?

There's no fixed count for all users. First confirm whether it's an AI Studio browser hint or a Gemini API project limit; API numbers should be read from the logged-in AI Studio by current project, model, and usage tier. Without checking your logged-in project, don't give a guaranteed number.

### What's the Nano Banana image cap in the Gemini app?

Trust the "usage limits" inside the Gemini app, the refresh hint after hitting a limit, and the current Google Help. The current help page says limits change with testing, availability, and capacity, so don't keep using old fixed daily cap tables.

### Can creating a new API key increase image quota?

No. Gemini Developer API rate limits apply per project, not per key. Adding or rotating keys in the same project doesn't create a new quota pool.

### When does RPD reset?

The current Gemini Developer API docs say midnight Pacific Time. This applies only to the API's RPD and can't be used to infer refresh times for the Gemini app, Vertex AI, or third-party credits.

### Why do I still get 429 after enabling billing?

Because billing only affects some eligibility, tiers, or spend paths — it doesn't remove RPM, TPM, RPD, IPM, model capacity, or safety controls. Check the quota metric in the error and the AI Studio current project page to find which one is exhausted.

### Can I bypass limits with Vertex AI, changing region, or third-party tools?

That's the wrong framing. Vertex AI has its own Cloud project and quota contracts; regional availability is an independent condition; third-party tools have their own credits and queues. None of them expands or bypasses the original Google project quota.

### What's the fastest troubleshooting order?

Follow "entry point → account or project → model → metric → current dashboard → matching action". If any item is unclear, gather evidence first — don't guess image counts, reset times, or billing status.
