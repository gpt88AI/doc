---
title: "Gemini 4K Image API: Current Models, Code, and Cost Boundaries"
description: A practical guide to the Gemini 4K image generation API — the current gemini-3-pro-image model ID, Interactions API response_format configuration, 1K/2K/4K output tiers, Standard vs Batch/Flex cost boundaries, project-level quotas, and a 429 troubleshooting checklist.
date: 2026-01-20
category: API开发
tags: [Gemini API, 4K Image Generation, Nano Banana Pro, Gemini 3 Pro Image, AI Image API]
readTime: 14
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Gemini 4K image generation should no longer be integrated using the old preview examples. For developers, three things matter right now: use `gemini-3-pro-image`, control image output through the `response_format` of the Interactions API, and separate standard calls, Batch, Flex, Priority, and third-party gateways in your budget.

As of 2026-07-08, Google's Gemini image generation docs map Nano Banana Pro to Gemini 3 Pro Image, with the model ID `gemini-3-pro-image`. The official docs also give the token tier for 4K output: a 4K image output consumes 2000 image tokens; the equivalent standard API price is `$0.24` per image, and the Batch/Flex equivalent is `$0.12` per image. These prices and availability remain volatile facts. Before production, verify against Google's [image generation](https://ai.google.dev/gemini-api/docs/image-generation), [pricing](https://ai.google.dev/gemini-api/docs/pricing), [rate limits](https://ai.google.dev/gemini-api/docs/rate-limits), and [API key](https://ai.google.dev/gemini-api/docs/api-key) pages.

| What you need to decide | Current recommendation |
| --- | --- |
| 4K production assets | Prioritize `gemini-3-pro-image`; confirm project billing and model availability |
| Fast iteration or batch drafts | Start with a cheaper model or 1K/2K previews, then upgrade to 4K for finals |
| API surface | Prefer the Interactions API in new examples; don't copy legacy image parameters |
| Output size | Set `type: "image"`, `aspect_ratio`, and `image_size` in `response_format` |
| Cost control | Distinguish Standard, Batch, Flex, and Priority; don't treat third-party quotes as official prices |
| Quota triage | Look at project-level RPM/TPM/RPD/IPM and spend limits, not extra API keys |

## Choosing the Current Model

Google's docs now split the Nano Banana family into multiple routes rather than a single model.

| Model | Current identity | Best suited for |
| --- | --- | --- |
| `gemini-3-pro-image` | Nano Banana Pro / Gemini 3 Pro Image | Complex instructions, professional assets, 4K, tasks with strict text and brand consistency requirements |
| `gemini-3.1-flash-image` | Nano Banana 2 / Gemini 3.1 Flash Image | General image generation, editing, multi-round iteration, cost- and speed-sensitive tasks |
| `gemini-3.1-flash-lite-image` | Nano Banana 2 Lite | Large-scale, low-cost, low-latency tasks |
| `gemini-2.5-flash-image` | Legacy Nano Banana route | Legacy project compatibility; new projects should evaluate migrating |

If this article's goal is "produce 4K deliverables," the core route is `gemini-3-pro-image`. If the goal is just to show users a direction quickly, using a cheaper model or lower resolution for previews is usually more controllable than going full 4K from the start.

Don't rely on old preview model names as the basis for new code. Old names may still linger in historical articles, tutorials, or gateway aliases, but formal integrations should follow the current official model ID.

## API Key and Environment Variables

Gemini API keys are tied to a Google Cloud project. Billing, quotas, logs, permissions, and rate limits should be triaged at the project level, not by looking at the key string alone.

For development environments, use environment variables:

```bash
export GEMINI_API_KEY="your_key_here"
```

Google client libraries read `GEMINI_API_KEY` or `GOOGLE_API_KEY`. If both exist, the official docs state `GOOGLE_API_KEY` takes priority. In production, never put keys in frontend code, mobile app bundles, public repositories, screenshots, or logs; use backend proxies, environment variables, Secret Manager, or the platform's secret management.

If you haven't organized key types, migration, and security boundaries yet, review the official [API key](https://ai.google.dev/gemini-api/docs/api-key) docs first, then come back to wire up 4K calls.

## Minimal 4K Call Example

The example below shows the current Interactions API shape. It only illustrates the parameter structure — it does not promise that your project has access, free quota, or immediate 4K availability.

```python
from google import genai
import base64

client = genai.Client()

prompt = (
    "Generate a 16:9 e-commerce hero visual for a premium skincare serum: "
    "a clear glass bottle, clean white background, soft product lighting, suitable for a website hero."
)

interaction = client.interactions.create(
    model="gemini-3-pro-image",
    input=prompt,
    response_format={
        "type": "image",
        "aspect_ratio": "16:9",
        "image_size": "4K",
    },
)

if interaction.output_image:
    with open("gemini-4k-product-hero.png", "wb") as f:
        f.write(base64.b64decode(interaction.output_image.data))
```

Key points:

- `model` uses the current `gemini-3-pro-image`.
- `response_format.type` is set to `image`.
- `image_size` accepts `1K`, `2K`, or `4K`; exact support depends on the current docs and model behavior.
- `aspect_ratio` affects the actual pixel dimensions and composition; it doesn't force arbitrary pixel widths/heights you hand-write.
- For mixed text-and-image responses you can pass `response_format` as an array, but always inspect the actual output blocks when saving images in production.

When calling through the GPT88 unified gateway's Google-compatible surface, use base URL `https://img.gpt88.cc`, authenticate with your `YOUR_GPT88_API_KEY` from the gpt88.cc console, and keep the model IDs identical to the official ones above.

## Image-to-Image and Reference Images

4K generation isn't only for text-to-image; it also suits using an existing image as a reference to rebuild composition, swap backgrounds, or produce branded assets.

```python
from google import genai
import base64

client = genai.Client()

with open("reference.png", "rb") as f:
    reference = base64.b64encode(f.read()).decode("utf-8")

interaction = client.interactions.create(
    model="gemini-3-pro-image",
    input=[
        {
            "type": "text",
            "text": "Keep the product bottle shape and label, change the scene to a premium bathroom counter, generate a 4K landscape ad. ",
        },
        {
            "type": "image",
            "mime_type": "image/png",
            "data": reference,
        },
    ],
    response_format={
        "type": "image",
        "aspect_ratio": "16:9",
        "image_size": "4K",
    },
)
```

Confirm copyright and usage rights before uploading reference images. Gemini image generation remains subject to Google's safety and prohibited-uses policies; don't use it to generate deceptive, harassing, infringing, or safety-evasion content.

## Understanding 4K Output Dimensions

"4K" in the Gemini API is closer to an output tier than a fixed `4096x4096` size you can fill in arbitrarily. The official table lists actual pixels and token tiers for different aspect ratios.

| Aspect ratio | 4K output example | Best suited for |
| --- | --- | --- |
| 1:1 | 4096 x 4096 | Square posters, e-commerce hero images, cover assets |
| 16:9 | 5504 x 3072 | Website heroes, video covers, large displays |
| 9:16 | 3072 x 5504 | Portrait posters, short-video covers |
| 4:5 | 3712 x 4608 | Social vertical images, e-commerce detail images |
| 21:9 | 6336 x 2688 | Ultra-wide banners, immersive web headers |

Choose based on the delivery context. Web display doesn't always need a native 4K image; in many cases 2K is sufficient, and 4K is better for tasks requiring cropping, print, large displays, or post-processing headroom.

## Cost Boundaries

Per the Google pricing page, in the Gemini 3 Pro Image standard API, image output is billed in image tokens. 1K/2K output is equivalent to `$0.134` per image, and 4K output to `$0.24` per image. The Batch and Flex 4K equivalent is `$0.12` per image. Priority pricing is higher and fits production workloads with priority requirements.

When budgeting, don't count only the output image:

| Cost item | Why it matters |
| --- | --- |
| Input text and reference images | Text and image inputs also count toward request cost |
| Image output size | 4K consumes more image tokens than 1K/2K |
| Thinking / text output | Pro image models may return text and reasoning output; check actual bills |
| Google Search grounding | A request may trigger one or more search queries billed separately per official rules |
| Retries and failures | 429s, timeouts, content blocks, and empty outputs must be reconciled against billing records |
| Batch/Flex/Priority | Different scheduling means different price, latency, and availability |

A conservative production flow: use 1K or 2K for creative confirmation, then generate 4K for finals; push large non-real-time batches into Batch or Flex; only evaluate Priority when you truly need prioritized returns.

> When accessing through the GPT88 unified gateway, you are billed by official usage × your selected group multiplier; exact prices and quotas are subject to the gpt88.cc console.

## Quotas and 429 Troubleshooting

Gemini API rate limits are usually expressed as RPM, TPM, and RPD; image models may also have image-specific limits such as IPM. The key point is that these limits apply per project, not per API key. Creating more keys doesn't naturally increase capacity.

Before launch, record at least the following:

| Item | What to record |
| --- | --- |
| Project ID | Quotas, billing, and logs are all queried per project |
| Model ID | `gemini-3-pro-image`, `gemini-3.1-flash-image`, etc., written explicitly |
| Call type | Standard, Batch, Flex, Priority |
| Output size | 1K, 2K, 4K affect tokens and cost |
| Active throttling | Queue, concurrency cap, retry interval, fallback strategy |
| Spend limit | Spend-based rate limits can trigger 429 |

When you hit 429, first reduce concurrency, apply exponential backoff, queue 4K tasks, or move non-real-time tasks to Batch/Flex. For the fuller path, see [Gemini API Free Tier Limits](/docs/blog/gemini-api-free-tier/) and the [Image Generation 429 troubleshooting guide](/docs/blog/gemini-image-generation-rate-limit/).

## Evaluating a Gateway

A third-party gateway can solve local payments, compatible interfaces, multi-model routing, backup channels, or log aggregation. But it is not Google's official API, and it can't replace the model, pricing, quota, and safety policies in Google's docs.

Verify each item before integrating:

| Check item | Criterion |
| --- | --- |
| Current model names | Does it really support `gemini-3-pro-image`, or only legacy preview aliases? |
| 4K parameters | Does it support `image_size` / output size control, and what pixels does it actually return? |
| Failure billing | Are timeouts, 429s, content blocks, and empty outputs charged? |
| Bill details | Can you see per-request model, size, charge, and error? |
| Data boundary | Is it appropriate to route user images, brand assets, or sensitive material through the gateway? |
| Refunds and SLA | Only trust the current console, terms of service, and ticket records |

If a gateway genuinely lowers your payment and integration friction, test it with a small sample. Don't promise absolute low prices, absolute stability, unlimited capacity, or fixed failure-handling policies on article or product pages without auditable evidence that day. GPT88 as a unified gateway is no exception: its prices and quotas are subject to the gpt88.cc console, and the charge for any given image follows official usage × the selected group multiplier.

## Prompts and Delivery Flow

The value of 4K output isn't about enlarging a short prompt; it's about giving the model clear delivery context.

More stable prompts usually include:

- Delivery purpose: web hero, e-commerce hero, print poster, brand key visual, app icon.
- Subject and constraints: product shape, pose, Logo position, text that must be preserved.
- Frame specs: landscape/portrait, close-up/wide, whether a copy area must be left.
- Style constraints: photography, illustration, 3D, infographic, material, and lighting.
- Post-processing needs: cropping, transparent background, series consistency.

Don't write "8K commercial-grade detail" in the prompt to replace a real `image_size` setting. "4K/8K" in the prompt is just style language; the API's output tier is controlled through `response_format`.

If you're producing a series of images, fix systematic fields first: purpose, size, aspect ratio, reference images, brand prohibitions, output naming, and acceptance criteria. That's far more reproducible than writing a one-off prompt for each image.

## FAQ

### Does Gemini 4K require Nano Banana Pro?

If you need complex professional assets and 4K output, `gemini-3-pro-image` should be evaluated first. For quick drafts, low-cost batch images, or multi-round editing, evaluate `gemini-3.1-flash-image` or the Lite route first, then upgrade by quality requirements.

### Can I still use the old preview model name?

New articles and new code shouldn't depend on it. It may appear in historical tutorials or gateway aliases, but formal integrations should use the current official model ID and actually test it in your project.

### Can the free tier generate 4K?

Don't treat fixed free quotas from old articles as current facts. The Gemini 3 Pro Image pricing page lists the Free Tier as Not available. Whether you can call it, how much, and whether billing is required depends on your project, model, and current AI Studio limits.

### Does `image_size="4K"` always mean 4096 x 4096?

No. The 1:1 4K tier is 4096 x 4096; 16:9, 9:16, 4:5, and other aspect ratios map to different actual pixels. Choose from the official output table and your delivery scenario rather than hard-coding arbitrary pixels.

### Can the SynthID watermark be removed?

Google's docs state generated images include a SynthID watermark. Don't treat "removing the watermark" as a normal development goal; if users care about attribution, licensing, or compliance, transparently disclose AI generation and scope of use in your product description.

### Why am I getting 429?

429 can come from RPM, TPM, RPD, image-related limits, spend-based limits, or temporary model capacity. It's a project-level problem, not a key-string problem. Check AI Studio's active rate limits and billing first, then decide on throttling, queuing, Batch/Flex, or a quota increase.

## Pre-Launch Checklist

- Model ID switched to `gemini-3-pro-image`.
- New code uses the Interactions API and `response_format`, without copying legacy image config examples.
- API keys stored in backend environment variables or a secret system.
- Project ID, billing, rate limits, and spend limit recorded.
- 1K/2K/4K budget checked against the current pricing page.
- 429, 403, model unavailability, and empty outputs each have a user-comprehensible handling strategy.
- Third-party gateways treated only as candidate routes, with current model, 4K output, billing, failure charges, and data boundary verified.

The right way to use the Gemini 4K image API is not to stack "HD," "latest," and "cheap" keywords, but to spell out the model, output tiers, budget, quotas, and safety boundaries clearly. That keeps the page aligned with real developer tasks and avoids indexing and trust risks from over-SEO or stale promises.
