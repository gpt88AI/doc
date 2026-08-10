---
title: Gemini Tier 1 Billing Enabled but Still on Free Quotas (250 RPD)? Complete Fix Guide 2026
description: Fix the Gemini API tier mismatch where billing shows Tier 1 but quotas stay at free levels (250 RPD). Covers 5 root causes — experimental model variants, API key project binding, billing sync delay, promo credits, and preview model limits — plus step-by-step fixes and three tier-verification methods.
date: 2026-02-21
category: API开发
tags: [Gemini API, API Troubleshooting, Rate Limit, Google AI]
readTime: 18
relatedPath: /docs/api/errors/
relatedTitle: OpenAI-Compatible API Error Troubleshooting
---

Many developers enable billing on their Google Cloud project expecting Gemini API rate limits to jump from the free tier to Tier 1, only to find quotas stuck at 250 RPD or lower free-tier numbers. This is a known problem with multiple root causes. The most common fix is switching experimental model variants (e.g. `gemini-2.5-pro-exp`) to a stable or paid-preview version, then regenerating the API key in Google AI Studio. This guide systematically covers each root cause with verified solutions, based on Google AI developer forum reports and official documentation as of February 2026.

## Quick Summary

If your Gemini API is billed yet still shows free-tier limits, start with this quick checklist before reading the full guide. The most common cause is an experimental model variant, which only uses free-tier quotas regardless of your billing status. Switch the model to a stable version (e.g. `gemini-2.5-pro`) or a paid-preview version, regenerate the API key in a billed project, and wait up to 48 hours for the billing system to sync. If these steps don't fix it, check whether a promo credit is covering the paid tier, and finally contact Google Cloud support as a fallback. The following sections explain each scenario and community-verified fix in detail.

## Why Your Tier 1 Billing Still Shows Free Quotas

A billing dashboard clearly showing "Tier 1" while the API returns free-tier rate limits is one of the most frustrating developer experiences in the Gemini ecosystem. The Google AI developer forum is full of posts describing exactly this: developers enable billing following the official steps, see the project confirmed at Tier 1, yet keep hitting 429 "Resource Exhausted" at request rates far below what the paid tier should allow. To understand why, you need to look at how Google's billing and quota systems actually interact, because they are far less coupled than most developers assume.

The root issue is that Google's Gemini API uses a multi-layer system where billing status, project tier assignment, and per-model rate limits are fairly independent. When you enable billing on a Google Cloud project, the system does correctly register the project as Tier 1 eligible. But the rate limits actually applied to API requests depend on several additional factors: which specific model variant you call, whether your API key was created in the correct project, and whether billing-to-quota sync has completed. This layered architecture means a failure at any point in the chain can produce your symptom even when the billing dashboard looks perfectly correct.

To make things more confusing, Google's official rate-limits documentation page (last updated February 19, 2026) no longer publishes specific RPM and RPD numbers per tier, instead directing developers to check actual limits in Google AI Studio. This removed the convenient reference point developers used to verify tier status, adding more uncertainty. The good news is that the problem is well documented and the root causes are identifiable. The following sections list each root cause and its fix, ordered by how often they appear in community reports. Most developers resolve the issue within the first two steps.

## Understanding the Gemini API Tier System and Rate Limits (2026)

Google splits Gemini API access into four distinct tiers, each with its own entry requirements and rate limit allocation. Understanding what each tier provides is the foundation for diagnosing quota mismatches. The tier system determines your maximum requests per minute (RPM), requests per day (RPD), and tokens per minute (TPM) across different model families.

**Free tier** only requires being in an eligible country or region and provides clearly limited baseline access. Cross-validated from SERP sources and actual AI Studio observations, the free tier offers roughly 5 RPM and 100 RPD for Gemini 2.5 Pro, and about 10 RPM and 250 RPD for Gemini 2.5 Flash. 250 RPD is exactly the number most developers hit when silently stuck on the free tier. Gemini 2.5 Flash-Lite has slightly more generous free limits, around 15 RPM and 1,000 RPD. Notably, Google cut free-tier quotas sharply in December 2025 by roughly 50-80%, which suddenly made the problem severe for developers who had been running fine within free limits.

**Tier 1** unlocks when you attach a full paid billing account to a Google Cloud project. This tier substantially raises rate limits; sources indicate roughly 150-300 RPM and 1,500+ RPD for models like Gemini 2.5 Pro and Flash. The jump from free to Tier 1 represents a 6-15x increase in daily request capacity, which is why developers feel the mismatch so strongly. One key detail the official docs emphasize: "experimental and preview models have more restrictive rate limits" even on paid tiers, meaning not every model benefits equally from a Tier 1 upgrade.

**Tier 2** requires cumulative spending of at least $250 and 30 days since first payment; **Tier 3** raises the bar to $1,000 cumulative spend and 30 days. Higher tiers progressively raise rate limits and unlock additional features.

Understanding the paid-tier pricing structure also helps with diagnosing this issue. Per the Google official pricing page verified on February 21, 2026, Gemini 2.5 Pro input is $1.25-$2.50 per million tokens and output is $10.00-$15.00 per million tokens depending on context length. Gemini 2.5 Flash is more budget-friendly at $0.30-$1.00 input and $2.50 output per million tokens, making it the go-to for high-traffic apps. The newer Gemini 3.1 Pro Preview is pricier at $2.00-$4.00 input and $12.00-$18.00 output per million tokens, but is currently preview-only with stricter rate limits. Knowing these pricing tiers helps you estimate costs once Tier 1 billing is correctly active, so you're not surprised by the bill when the free-tier limits are finally lifted.

One important detail that often catches developers off guard: rate limits are calculated per project, not per API key. Creating multiple API keys in the same project does not double your quota. It also means that if you have keys in different projects with different billing setups, the rate limits you experience differ depending on which key you use — directly connected to one of the root causes below. Additionally, RPD quotas reset at midnight Pacific Time, and the rate limit values you see on the Cloud Console quota page may differ from what the API actually enforces, due to the difference between configured quotas and dynamic tier limits.

## The 5 Root Causes Behind This Problem

There are five distinct root causes for billing/quota mismatch, each requiring a different fix. Based on analysis of dozens of Google AI developer forum threads and community reports, here they are in order of frequency. Correctly identifying which root cause applies to you is the fastest path to resolution.

**Root Cause 1: Model variant confusion (most common, ~60% of cases)**

This is the most overlooked cause of tier mismatch and the one most troubleshooting guides fail to explain clearly. Google maintains multiple variants of each model, and the naming directly decides whether your request uses paid-tier limits or stays on the free tier — independent of your billing status. Model names ending in `-exp` or `-experimental` are explicitly designated as free-tier models. For example, `gemini-2.5-pro-exp-03-25` always runs under free-tier quotas no matter what billing configuration you set. By contrast, the stable variant `gemini-2.5-pro` and the paid-preview variant `gemini-2.5-pro-preview-03-25` respect your Tier 1 billing status and apply higher rate limits. This distinction is buried deep in official docs and almost never appears in the error messages developers receive, making it easy to fall into — especially when following tutorials or sample code that happen to use an experimental variant.

**Root Cause 2: API key not tied to the billing project (~20% of cases)**

Google AI Studio lets you create API keys associated with different Google Cloud projects. If you create a key in a project without billing, or you have multiple projects and accidentally select the wrong one, your API calls use the unbilled project's free-tier limits. This is especially common when developers have both personal and work projects, or when an initial key was created during a free trial and never regenerated after enabling billing. The fix is straightforward: open AI Studio, check which project your API key belongs to, and if necessary create a new key in the specific project that has billing configured.

**Root Cause 3: Billing sync delay (~10% of cases)**

When you first enable billing or change billing configuration, there's a sync period before new tier limits take effect across all Google systems. Forum reports consistently indicate this delay ranges from a few minutes up to 48 hours, with most syncs completing within 24 hours. During this window your billing dashboard correctly shows Tier 1, but the rate limit system may still enforce free-tier quotas. Making a small paid API call with a non-free model can sometimes help trigger the sync faster, because it forces the billing system to register an actual billing event.

**Root Cause 4: Free promo credit coverage (~5% of cases)**

If your Google Cloud account has active promo credits, such as the $300 free-trial credit or other promotional offers, the system may treat your account as a free-tier user even with a payment method attached. That's because, from the tier system's perspective, promo credits are technically different from a paid billing account. Developers who signed up through a Google Cloud free trial and then added a payment method sometimes find their account stays on free-tier limits until the promo credit is fully consumed or expires. The key distinction: tier upgrades require a "full paid billing account", which Google interprets as an account incurring charges against a real payment method, not one consuming promotional balance.

**Root Cause 5: Preview model limits (~5% of cases)**

Even on a paid tier, preview models have more restrictive rate limits than their stable counterparts. Official docs state that "experimental and preview models have more restrictive rate limits" but don't publish specific numbers for preview models, directing developers to AI Studio instead. If you're using models like Gemini 3.1 Pro Preview or Gemini 3 Pro Preview, the limits you experience may be far below stable models on the same tier. This is not a bug but an intentional design for managing capacity on models still being optimized and evaluated. It particularly affects developers fixing Gemini image generation 429 errors, because for new features like native image generation, preview models are often the only option.

There's also a particularly maddening variant some developers call the "dead loop" scenario. Billing is correctly enabled, the project shows Tier 1, the correct model variant is used, and the API key is in the right project — but the billing dashboard shows zero usage and zero charges. The rate limit system can't detect any billed API activity, which prevents full tier activation. This circular dependency — you need a paid API call to trigger tier activation, but tier limits block the call from being treated as paid — has been reported in several forum threads with no clear official solution. The workaround developers report as most successful: explicitly call a small prompt with a stable, non-experimental model, wait 24-48 hours, then check whether the billing dashboard starts recording charges. If nothing changes, this special scenario requires escalating to Google Cloud support for manual tier activation.

## Step-by-Step Fix Guide

Now that you understand the root causes, here's how to systematically fix the tier mismatch. Follow these steps in order, since they're arranged from highest to lowest probability of solving the problem, so you can get it fixed as fast as possible.

**Fix 1: Check and switch the model variant**

First confirm the actual model identifier you're sending in API requests. Open your application code or API call configuration and look at the model parameter. If it contains `-exp`, `-experimental`, or points to a model only available as a free variant, you've almost certainly found the problem. The fix is to switch to the corresponding stable or paid-preview variant. Here's a quick reference of the most easily confused model names:

- `gemini-2.5-pro-exp-03-25` (free) → switch to `gemini-2.5-pro` (paid Tier 1+)
- `gemini-2.5-flash-exp` (free) → switch to `gemini-2.5-flash` (paid Tier 1+)
- Any model with an `-exp` suffix → find the matching version without `-exp`

You can view available model variants and their tier eligibility directly in the Google AI Studio model picker. Models supporting paid-tier limits are marked in the interface. After switching, make a test API call and check whether the rate-limit headers in the response reflect your Tier 1 allocation. Here's a curl command to quickly verify actual limits:

```bash
curl -s -D - "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=YOUR_GPT88_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' 2>&1 | grep -i "x-ratelimit"
```

The response headers will show your actual rate limit allocation. If you see something like `x-ratelimit-limit-requests-per-day: 250`, you're still on the free tier. A Tier 1 value should show a clearly higher number, RPD of at least 1500 or more. This quick test definitively confirms whether your model variant and API key configuration are correctly using paid-tier limits.

**Fix 2: Regenerate the API key in the correct project**

If switching the model variant didn't help, the next step is to check and possibly regenerate the API key. Open Google AI Studio, click "Get API Key" in the left sidebar, and look at the project column next to your existing keys. If the listed project isn't billed, you need to create a new key. Click "Create API key in existing project" and select the specific project that has billing configured. After generating the new key, update your application to use it and retest. If the old key is no longer needed, revoke it to keep things secure.

**Fix 3: Complete paid activation and wait for sync**

If the model variant is correct and the API key is in the right project, the issue may be billing sync delay. First verify via the Google Cloud Console billing page that your billing account is fully activated, with an active payment method that has no pending verification. Then intentionally make a paid API call with a stable, non-free model to trigger the billing system. Wait at least 24 hours before retesting, since some syncs take up to 48 hours. While waiting, monitor the billing dashboard in Google Cloud Console to see whether API usage charges start appearing — that confirms billing linkage is active even if rate limits haven't updated yet.

**Fix 4: Handle free promo credits**

Check whether your Google Cloud billing account has active promo credits. Go to the Billing section in Google Cloud Console and look for any credit balance or promotional offers. If you have active credits from a free trial or promotion, you may need to wait for them to be consumed, or contact Google Cloud support to request that your account be treated as paid for tier purposes. Some developers report success by explicitly asking Google support for a billing account review, which can accelerate the transition from promotional to fully paid status.

**Fix 5: Escalate to Google Cloud support**

If none of the above works, it's time to contact Google Cloud support directly. When submitting the request, include the following to speed things up: your Google Cloud project ID, the specific model variant used, the API key identifier (not the key itself), a screenshot of the billing page showing Tier 1 activation, and the specific error message or rate-limit headers you received. Reference the numerous forum threads about this issue to show it's a known problem. Google support can manually verify and fix the tier assignment in the backend, resolving cases where automatic sync fails.

## How to Verify Your Actual Tier Status

Before concluding there's a tier mismatch, verify your actual tier status through multiple independent methods. Relying on a single metric can mislead you, because different parts of Google's systems may show different information during sync or after config changes.

**Method 1: Google AI Studio API Keys page**

The most direct tier check is through Google AI Studio. Go to the API Keys section and look at the plan column next to your API key. If it shows "Free" where you expect "Pay-as-you-go" or "Tier 1", the mismatch is confirmed. Note that the exact label may vary because Google has changed the naming multiple times. The key is whether the indicator shows a free or paid marker. If you see "Pay-as-you-go", your project is correctly recognized as Tier 1 and the problem is elsewhere in the chain, such as model variant selection.

**Method 2: Google Cloud Console quota page**

Go to Google Cloud Console, select your project, and open the Quotas and System Limits page. Search for Gemini API or Generative Language API quotas. The displayed limits should reflect your tier level. However, this page can sometimes show outdated or incorrect info, especially during the sync period after enabling billing. Treat it as a secondary check rather than the sole verification, and cross-check against AI Studio info from Method 1.

**Method 3: API response headers**

The most reliable real-time verification is checking the rate-limit headers returned in API responses. When you make a Gemini API request, the response includes headers indicating the current rate limit and remaining quota. Look for `x-ratelimit-limit` and `x-ratelimit-remaining`. If the limit matches free-tier numbers (e.g. 15 RPM or 250 RPD) rather than Tier 1 numbers, the API is confirming it's treating your requests as free tier no matter what the dashboard shows. This method shows the real behavior of the system processing your requests, cutting through any dashboard display inconsistency.

For Python developers, you can programmatically confirm tier status by checking response headers after any API call. The `x-ratelimit-limit-requests-per-day` header is the most telling metric: the free tier shows 100 or 250 (depending on model), while Tier 1 shows 1,500 or higher. You can also check `x-ratelimit-limit-requests-per-minute` for the RPM allocation. Building this check into your app startup flow gives you an automatic early-warning system that catches tier mismatch before it affects users. Some developers implement a simple health-check endpoint that fires a minimal API call at startup, logs the rate-limit headers, and alerts if the values don't match the expected tier. This proactive approach is far better than only discovering the mismatch when users start hitting failures.

Using all three verification methods together gives you a full picture of your actual tier status. If AI Studio shows "Pay-as-you-go" but API response headers show free-tier limits, the problem is almost certainly model variant. If AI Studio shows "Free" despite billing being enabled, the issue is project-key binding or billing sync. When all three methods confirm you're on the paid tier but you still hit rate limits, the issue may be that your actual request volume exceeds Tier 1 limits at peak — in which case the solution is optimizing request patterns or working toward Tier 2 eligibility. Record verification results and timestamps; this data is valuable if you need to escalate to Google Cloud support, and helps you track whether your changes are having the expected effect on quota allocation.

## Beyond Tier 1: Higher Limits and Alternatives

After resolving the mismatch and confirming Tier 1 access, you may find that even Tier 1 limits aren't enough for your production workload. Understanding the path to higher tiers and alternatives helps you plan capacity and avoid unexpected bottlenecks.

Upgrading from Tier 1 to Tier 2 requires cumulative spending of $250 on the Gemini API and maintaining an active billing account for at least 30 days since first payment. This means the upgrade isn't instant even if you're willing to spend money immediately. Google uses the cumulative spend threshold as a trust signal, gradually unlocking higher limits for accounts showing sustained usage patterns. Tier 3 follows the same principle at a $1,000 threshold. If your project needs immediate high throughput, this ramp-up period can be a significant planning constraint.

Several strategies can maximize effective throughput within your current tier. Client-side request batching reduces the number of separate API calls while processing the same amount of data. Aggressive caching of responses for identical or similar prompts can eliminate redundant API usage entirely. When available, the asynchronous Batch API lets you submit large volumes of requests at lower priority with more lenient rate limits. Additionally, distributing workloads across multiple Google Cloud projects, each with its own independent billing and tier status, can effectively multiply your total capacity — at the cost of added operational complexity.

For developers who need stable high-throughput API access without dealing with tier limits and waiting periods, services like the GPT88 unified gateway aggregate multiple AI models and offer transparent per-request billing without managing rate-limit tiers. This is especially useful while waiting for Tier 2 or Tier 3 eligibility to ramp up, or for apps that need burst capacity beyond what any single tier provides. Per-request billing removes the uncertainty of tier management, offering predictable cost scaling regardless of usage patterns. Exact pricing and quotas are set by the gpt88.cc console.

Another common approach in production teams is a multi-model fallback strategy. Instead of depending entirely on a single Gemini model at one tier, configure your application to cascade across models based on availability and rate-limit status. For example, the primary path might use Gemini 2.5 Pro for complex reasoning tasks, automatically falling back to Gemini 2.5 Flash when Pro's rate limits approach exhaustion. Flash consistently offers higher rate limits at lower cost, making it an excellent fallback for maintaining availability during high-traffic periods. Some teams go further, mixing models from different providers and using an API gateway solution to route between multiple AI providers, keeping the app responsive even when any single provider's rate limits are hit. This graceful-degradation architecture across models and providers has become best practice for production AI applications that can't afford downtime from rate limits.

## FAQ

**How long does it take for Tier 1 limits to take effect after enabling billing?**

Most developers report Tier 1 limits taking effect within minutes to 24 hours after correctly enabling billing and attaching it to the project. But some cases take up to 48 hours, especially for new Google Cloud accounts or accounts transitioning from promo credits to paid billing. If limits still haven't updated after 48 hours and you've verified all root causes discussed here, contact Google Cloud support for manual troubleshooting.

**Do free promo credits count toward the Tier 2/Tier 3 upgrade thresholds?**

No. Free promo credits don't count toward the cumulative spend required for Tier 2 ($250) and Tier 3 ($1,000) upgrades. The tier system explicitly requires spending from a real payment method. This is an important distinction for developers who obtained Google Cloud credits through education programs, startup programs, or promotions. Only charges against your actual credit card or billing account accumulate toward tier upgrade requirements.

**Why do experimental models still use free-tier limits on a paid account?**

Experimental models are intentionally designated as free-tier only because they're not production-ready; Google wants to limit usage while gathering feedback and monitoring stability. The `-exp` suffix in a model name indicates the variant is offered free and applies free-tier rate limits regardless of billing status. This is by design, not a bug. Switching to the corresponding stable or paid-preview variant is the officially intended solution.

**Can Gemini API rate limits be raised above Tier 3?**

For enterprise needs beyond Tier 3 limits, Google offers custom quota increase requests via Google Cloud Console or through Google Cloud sales. You can also access Gemini models through Vertex AI, which provides independent quotas and enterprise features. Custom quota requests are evaluated case by case and may require additional agreements or commitments.

**When does the RPD quota reset?**

RPD quota resets daily at midnight Pacific Time. So if you exhaust your daily quota, you wait until 12:00 AM Pacific for the counter to reset. Planning API usage around this reset helps optimize throughput for batch workloads. Note that RPM limits reset on a rolling per-minute basis, so they recover much faster than daily limits.

**Is there a way to check current rate limit usage in real time?**

Yes. The most reliable method is checking the rate-limit headers in API responses, specifically `x-ratelimit-remaining` and `x-ratelimit-reset`. You can also monitor usage through the Quotas page in Google Cloud Console, though it may have a slight delay. For programmatic monitoring, build a simple middleware that logs these response headers so you can see quota consumption in real time and do proactive rate control before hitting hard limits.

**I switched to a stable model but limits still show free tier — what else should I check?**

If you've confirmed the model variant is correct (no `-exp` suffix), the most likely remaining cause is API key binding. Even experienced developers sometimes overlook this: the API key itself carries an association with a specific Google Cloud project, and that project's billing status determines your tier. Create a brand-new API key in Google AI Studio, making sure to select the billed project when prompted. Test immediately with the new key. If the rate-limit headers still show free-tier values, the problem is almost certainly billing sync delay or promo credit coverage, and you should follow Fix 3 and Fix 4 from the step-by-step guide above.

**Does switching between Gemini API and Vertex AI affect tiers and rate limits?**

Yes. The Gemini API (accessed via `generativelanguage.googleapis.com`) and Vertex AI (accessed via `aiplatform.googleapis.com`) run on separate quota systems with different rate limit configurations. Your Gemini API tier status doesn't automatically transfer to Vertex AI or vice versa. Vertex AI uses its own quota management tied to your Google Cloud project and region. If you hit rate limits on one endpoint, switching to the other may offer additional capacity, but you need to configure auth and billing separately for each. Many production apps strategically use both endpoints, combining the Gemini API's simple setup with Vertex AI's enterprise features like VPC Service Controls and customer-managed encryption keys.
