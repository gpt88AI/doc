---
title: Nano Banana 2, Pro, or 2 Lite: Route by Delivery Risk
description: Use the current official model IDs, size boundaries, and a same-input acceptance card to make a reviewable choice among Nano Banana 2 Lite (gemini-3.1-flash-lite-image), Nano Banana 2 (gemini-3.1-flash-image), and Nano Banana Pro (gemini-3-pro-image), and decide when to move up or down tiers based on accepted-output cost.
date: 2026-05-30
category: 模型对比
tags: [Nano Banana 2 Lite, Nano Banana 2, Nano Banana Pro, 模型对比, 图像接口]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

If a task only needs fast 1K direction screening, start with Nano Banana 2 Lite; if you need 2K or 4K, more variants, or more general image generation and editing, start with Nano Banana 2; only for dense text, complex brand rules, critical product mockups, or deliverables where rework is expensive should Nano Banana Pro enter the same-input comparison. The conclusion here is an API routing decision, not the pricing or availability of Gemini App, AI Studio, Vertex, regional plans, or third-party platforms.

The three current model IDs are `gemini-3.1-flash-lite-image`, `gemini-3.1-flash-image`, and `gemini-3-pro-image`. None of them is the champion for every scenario; what really matters is: under the same input and acceptance criteria, which route's pass rate, retry count, and manual-revision time fit your deliverable.

## Route by Delivery Risk First

Put each project into one of the three routes below. They are starting points, not a "model ranking table". If your actual acceptance records differ from expectations, move up or down based on the failure cause.

| Ask first | Start with | When to stop using this route |
| --- | --- | --- |
| Do you only need 1K previews, direction drafts, background variants, or realtime interaction candidates? | **Nano Banana 2 Lite**: gemini-3.1-flash-lite-image | When the deliverable explicitly needs 2K/4K, or 1K no longer meets it. |
| Do you need general image generation/editing, more size options, batch iteration, or a real deliverable? | **Nano Banana 2**: gemini-3.1-flash-image | When the same task keeps crossing the acceptance line on text, structure, reference consistency, or manual rework. |
| Is this a high-risk brand asset, dense-text image, complex mockup, or a deliverable needing finer control? | **Nano Banana Pro**: gemini-3-pro-image | If it still cannot stably meet logo, small text, exact color codes, packaging structure, or regulated copy, stop moving up and switch to manual layout, proofreading, or local editing. |

The first step is not whether the name contains "Pro", but to write down the delivery size, reference assets, in-image text, allowed retry count, and who owns final review. Lite's official docs explicitly limit it to 1K; when size has already ruled out Lite, comparing its unit price is pointless. Both Nano Banana 2 and Pro can be 2K/4K candidates, but whether to upgrade should be decided by actual failure cost.

## The Official Facts for the Three Tiers: Model ID, Size, and API Price

The table below only collects model facts and standard image example prices from the current Google Gemini API pages, in USD. It does not represent regional pricing, consumer-app offers, free quotas, provider credits, or plans; those entries must be verified separately before use.

| Route | Current API model ID | Official positioning and size boundary | Standard image example price |
| --- | --- | --- | --- |
| Nano Banana 2 Lite | gemini-3.1-flash-lite-image | Low-latency, high-throughput image generation and editing; 1K only, 2K and 4K not supported. | 1K about $0.0336. |
| Nano Banana 2 | gemini-3.1-flash-image | Built for speed and high volume; offers 0.5K, 1K, 2K, 4K. | 0.5K about $0.045, 1K $0.067, 2K $0.101, 4K $0.151. |
| Nano Banana Pro | gemini-3-pro-image | Professional image editing and generation, complex graphic design, high-fidelity product mockups, and tasks needing accurate text. | 1K/2K about $0.134, 4K about $0.24. |

Google's [Nano Banana 2 Lite model page](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-lite-image) also states that SynthID and C2PA watermarks are always on; do not write Lite as a cheap way to bypass those markers. The [Nano Banana 2 model page](https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-image) lists image generation, Search grounding, and Batch support; the [Pro model page](https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-image) lists image generation, Search grounding, Batch, Flex, and Priority options. Capability existing does not mean it is necessarily available for your region, project, platform, or plan.

Pricing only answers the API bill of one generation, not the final delivery cost. Google's [pricing page](https://ai.google.dev/gemini-api/docs/pricing) marks Free Tier as unavailable for all three image API routes; consumer-side grants, regional policy, and third-party charges cannot be back-derived from this table. For access routes such as the GPT88 unified gateway, pricing and quotas are per the gpt88.cc console.

## Run an Accepted-Output Cost Test with the Same Input

Do not run simple prompts on Lite and complex prompts on Pro, then treat the two results as comparable. Use one fixed test card where the three routes differ only in model ID; mark size-incompatible routes as "not applicable" instead of forcing them into the same round.

| Test card field | Fixed content | Result to record |
| --- | --- | --- |
| Input | Same prompt, same reference image, same aspect ratio, same output size, same safety requirements | Whether the input is exactly identical; if Lite does not support the target size, mark N/A. |
| Acceptance | Text, subject structure, key materials, reference consistency, size, review requirements | Pass/fail per item, plus the specific failure reason. |
| Cost | Per-generation fee, retry count, manual-revision minutes, review wait | Do not record only the one image you kept. |
| Decision | Accepted-output cost = (model cost + manual-revision cost) ÷ accepted count | Only switch when Pro lowers total cost or clearly reduces unacceptable risk. |

Prepare the failure samples you actually meet most: text posters, product packaging, reference-image editing, multi-region infographics, or final 4K key visuals. Keep the input identical per sample type and record each tier's pass count and rework reasons. This gives you evidence from your own workflow instead of treating someone else's single sample as a general quality conclusion.

## When to Move Up and When to Stop

If Lite fails because of a size boundary, switch directly to Nano Banana 2 or Pro; if an internal direction draft just needs more candidates, staying on Lite is actually reasonable. Nano Banana 2 already covers general efficient image work; do not move all traffic to Pro just because its name sounds more advanced.

There is upgrade evidence only when, under the same input, Nano Banana 2 repeatedly fails on text accuracy, complex layout, key reference consistency, or high-risk delivery, and Pro reduces retries, manual edits, or review risk. Conversely, if Nano Banana 2 passes consistently within the allowed retry budget, keep it.

Pro is not a free pass either. Logos, barcodes, small text, prices, dates, regulated copy (medical/financial/legal), exact color codes, and product structure must still be verified by the responsible person or a defined process. If these items are continuously unstable, switching models does not replace manual production and compliance review.

## Common Misconceptions

### Do I have to use Pro for 4K?

Not necessarily. Nano Banana 2's official material also lists 4K. 4K is one candidate condition; whether to pick Pro depends on your text, structure, brand constraints, and accepted-output cost — not the size label itself.

### Is Lite only for low-quality images?

No. Lite's key constraint is 1K, and its official positioning is low-latency, high-throughput image generation and editing. For sketches, direction screening, and realtime candidates, 1K may be exactly right; for final deliverables needing 2K/4K, it does not match.

### Can the API price represent my actual cost at any entry point?

No. The official API, Gemini App, AI Studio, Vertex, enterprise projects, and third-party wrappers may have different regions, quotas, billing units, failure billing, data terms, and support paths. Use this article to choose the model route first, then verify the contract of the entry you plan to use separately. If connecting through the GPT88 unified gateway, pricing and quotas are per the gpt88.cc console.

### Does one nicer-looking generation decide the long-term default model?

No. A single sample cannot prove general quality. Compare at least one set of samples close to your real deliverables with identical inputs, and fold retries, manual revisions, and review responsibility into the accepted-output cost. High-risk assets should keep stop conditions and human verification on any route.

When you only need to compare the three official API image routes, complete the test card above first; when the question is plans, regions, quotas, or provider fees, treat it as a separate question to verify, rather than mixing unequal contracts into the model-choice conclusion.

## Further Reading

- [Google Image Generation API](/docs/api/images/)
