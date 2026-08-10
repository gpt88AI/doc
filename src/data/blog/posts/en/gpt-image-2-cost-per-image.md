---
title: GPT Image 2 API Pricing: Official Cost per Image, Calculation Method, and Real Bills
description: As of May 8, 2026, GPT Image 2 API pricing can't be reduced to a single per-image quote. This guide breaks down the official output examples, token price lines, the Batch route, and provider contracts, then gives the cost fields and budgeting convention you can take to production.
date: 2026-05-08
category: API开发
tags: [GPT Image 2, OpenAI API, Image Generation Pricing, API Cost, Batch API]
readTime: 11
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

As of May 8, 2026, the most reliable way to answer "what does GPT Image 2 API cost" starts with OpenAI's official output examples: a 1024x1024 image is $0.006 at low, $0.053 at medium, and $0.211 at high quality; a 1024x1536 or 1536x1024 image is $0.005, $0.041, and $0.165 at the same quality tiers. Note that these are output examples, not the final bill for every API request. Real bills can also include text input, image input, reference or edit images, partial images, retries, the Batch route, or a third-party provider's own billing contract.

## Start with the Official Per-Image Examples

Chinese-speaking readers often see three price claims at once: official API token prices, a provider's per-call quote, and ChatGPT subscription access. When doing real budgeting, put the official output examples on their own first layer.

| Output size | Low | Medium | High | Best used for |
| --- | --- | --- | --- | --- |
| 1024x1024 | $0.006 | $0.053 | $0.211 | official starting point for square-image budgets |
| 1024x1536 | $0.005 | $0.041 | $0.165 | official starting point for portrait-image budgets |
| 1536x1024 | $0.005 | $0.041 | $0.165 | official starting point for landscape-image budgets |

If you just want to estimate "how much does one 1024x1024 high image cost," $0.211 is an output example you can put in a spreadsheet. In procurement, quotes, or product budgets, cite this official example first, then annotate editing, reference-image input, retries, partial outputs, and route selection separately. If your product uploads reference images, does editing, lets users retry, or wants async batch jobs, this number is only a starting point, not the final cost.

## What the Official Price Lines Actually Charge

OpenAI's official pricing page writes GPT Image 2 as token price lines, not just "per image." The image-related lines are: image input $8.00 per 1M tokens, cached image input $2.00 per 1M tokens, and image output $30.00 per 1M tokens. Text input has its own pricing too: text input $5.00 per 1M tokens, cached text input $1.25 per 1M tokens.

These token lines are the billing basis behind the official examples. A general reader asking "how much per image" should see the dollar examples above first; an engineering team building a cost model must go back to the token lines and request structure. Keep both layers, or you'll hit two misjudgments: treating $0.211 as a universal price for every GPT Image 2 image, or treating a provider's fixed per-call price as OpenAI direct pricing.

Batch is another official pricing lever. OpenAI's Batch route suits tasks that can wait asynchronously and has lower price lines, e.g., image input $4.00 per 1M tokens, cached image input $1.00 per 1M tokens, and image output $15.00 per 1M tokens. It is not the default cost-saving button for interactive pages. If a user clicks and expects an image immediately, Batch's latency and job semantics may not fit.

## The Real API Bill Calculation Formula

Treating one GPT Image 2 request as a small formula is more reliable than memorizing an isolated price:

| Cost component | When it appears | How to handle in budgeting |
| --- | --- | --- |
| Text input | every prompt has text instructions | usually not the largest item, but can't be zero |
| Image input | uploaded reference images, masks, edit inputs | estimate editing and reference-image flows separately |
| Image output | the final image the model produces | the official per-image examples mostly map to this |
| Partial images | previews or partial outputs during a request | add extra output-token work |
| Retries | users regenerate or the system auto-reruns | count every accepted new output |
| Batch | async tasks that qualify for Batch | can lower official cost, but sacrifices immediacy |

So don't put only "number of images" in a cost table. The more robust fields are: `model`, `size`, `quality`, whether image input was present, the number of partial images, the retry count, whether the route is direct or Batch, and whether a provider was involved. That way, when you review a bill, you know whether the money went to high quality or to reference images, edit inputs, or repeated retries.

## Why Bigger Non-Square Images Can Be Cheaper

The easiest thing to get confused by in the official examples: 1024x1536 and 1536x1024 have more pixel area than 1024x1024, yet their example prices at the same quality tier are lower. Don't "fix" this into a pixel-area formula, and don't write it off as an OpenAI page error.

A budget table should respect the official size/quality combinations rather than extrapolating linearly by pixel count. If your product only generates 1024x1024 squares, use the square row for the first estimate. If your product mixes landscape, portrait, square, and multiple quality tiers, keep size and quality as two independent fields.

This matters especially for e-commerce images, social covers, and long-format posters. Business owners often assume "bigger image means more expensive," but the public GPT Image 2 examples tell you the budget driver is the official size tier and quality tier, not pixel area. Writing this boundary down reduces budget drift caused by a wrong unit price after launch.

## Separate OpenAI Direct, Batch, Providers, and ChatGPT

A common pricing confusion in the Chinese-language context is comparing four contract owners in one table:

| Route | Price owner | Who it suits | What it must not be conflated with |
| --- | --- | --- | --- |
| OpenAI direct API | official OpenAI API prices | teams that need first-party model identity, official bills, and project attribution | a provider's fixed per-call price |
| OpenAI Batch | official OpenAI Batch prices | batch jobs that can accept async processing | real-time interactive generation |
| Provider or gateway | the provider's own contract | local payment, access routing, unified gateway, specific workflows | official OpenAI direct pricing |
| ChatGPT plan | ChatGPT consumer entitlements | generating images inside the ChatGPT product | `gpt-image-2` API bills |

If your question is "how does the official OpenAI API actually bill," provider prices can only be a next-step purchasing route, not the answer on the first screen. For comparing low-cost gateways, study a separate low-price access guide. These are two different questions: one is official cost calculation, the other is provider selection.

The same applies to ChatGPT. A ChatGPT membership may include image generation, but that's a consumer product entitlement — it isn't a free API, and it doesn't automatically convert a subscription fee into `gpt-image-2` API bills. Budget for the API based on the model page, pricing page, and project bills, not just the ChatGPT plan.

## How to Estimate Five Workloads

This table works as a first-pass budgeting convention before a product launches:

| Workload | First-pass estimate | Factors that change the bill | Operating rule |
| --- | --- | --- | --- |
| Draft testing | low or medium official output examples | many prompt trials, many accepted outputs | log every accepted output, not just the final image |
| Normal production | medium example for the matching size | volume, quality tier, occasional retries | keep size and quality in the logs |
| High-quality delivery | high official output example | reference images, edit inputs, rejection rate | give high a separate budget line |
| Edit-dense flows | output example plus image input | masks, reference images, local edits, partial images | don't mix with pure text-to-image |
| Async batch | Batch lines when qualifying | job latency, batching, failed re-runs | only tasks that can wait should use Batch |

A provider route may offer a simpler per-call price, but that belongs to the provider's contract. It can have purchasing value, especially for payment, access, and unified routing; but when explaining GPT Image 2's official cost, it must come after OpenAI direct and Batch. Accessing the GPT88 unified gateway is likewise a separate provider contract: actual deduction follows official usage multiplied by the selected group multiplier, and specific pricing and quotas are governed by the gpt88.cc console.

## Build a Small Calculator Before Launch

A practical GPT Image 2 cost calculator doesn't need to be complex, but it must keep the variables that change the bill.

| Field | Example | Why keep it |
| --- | --- | --- |
| `model` | `gpt-image-2` | prevents mixing prices from different models |
| `size` | `1024x1024`, `1024x1536`, `1536x1024` | maps to the official example rows |
| `quality` | low, medium, high | maps to the quality-tier examples |
| `has_image_input` | true / false | distinguishes pure generation from editing/reference |
| `partial_images` | 0, 1, 2 | records extra output-token work |
| `retry_count` | 0, 1, 2 | records extra output from retries |
| `route` | direct, Batch, provider | preserves contract ownership |

With these fields you can answer the real operational questions: is high quality driving the cost, or too many edit inputs? Does Batch actually fit? Is a provider route only worthwhile for specific workloads? If the logs only say "generated 1000 images," none of these can be answered.

Also agree on a convention with your team: say "official output examples" externally, and "full API workload" internally when reviewing. These two words remove a lot of budget confusion. The first answers the per-image number a procurement person or PM asks first; the second reminds engineering to put input, output, retries, and routes into the same bill table. As long as the convention is clear, comparing direct, Batch, and provider routes later won't average different contracts' prices into one number.

## FAQ

### How much does one GPT Image 2 image actually cost?

Per the official output examples of May 8, 2026: a 1024x1024 image is $0.006 low, $0.053 medium, $0.211 high; a 1024x1536 or 1536x1024 image is $0.005 low, $0.041 medium, $0.165 high. A real API bill may also include text input, image input, editing, partial images, and retries.

### Is $0.211 a fixed per-image price for GPT Image 2?

No. It's only the official example for a 1024x1024 high-quality output. Low and medium tiers are cheaper, landscape and portrait examples differ, and editing or reference-image flows add other billing items.

### Does the GPT Image 2 API have an official free route?

Don't budget for it as a free API model. Whether specific account entitlements exist depends on OpenAI's current model page, pricing page, and project status. Image access inside the ChatGPT product is not an API bill.

### Does Batch always make GPT Image 2 cheaper?

Batch can lower official prices for qualifying async tasks, but it changes the processing model. Products that need real-time image returns shouldn't force interactive requests into Batch just to save money.

### Can a provider's quote be compared directly with OpenAI official pricing?

Only after labeling ownership and billing units. A provider's fixed per-call price is another contract; it may solve payment or access, but it can't be written as OpenAI direct pricing. GPT88 access pricing and quotas are likewise governed by the gpt88.cc console.

### Which official pages should I check before budgeting?

Check the OpenAI API pricing page for the token lines and Batch lines, the image generation cost guide for per-image examples and the formula, and the GPT Image 2 model page to confirm the `gpt-image-2` model identity and API routes.
