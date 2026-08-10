---
title: Gemini Image Generation Prompt Guide: Chinese Structure, Templates, and API Boundaries
description: A Gemini image generation prompt guide for Chinese creators and developers — current Nano Banana model selection, a seven-field Chinese prompt structure, reusable templates, reference-image editing, an Interactions API example, cost and quota boundaries, and a common-failure fix list.
date: 2026-01-21
category: 技术教程
tags: [Gemini, 图片生成, 提示词, Nano Banana, API教程]
readTime: 15
relatedPath: /docs/api/images/
relatedTitle: Google 图片生成 API
---

Gemini image generation prompts don't need to be keyword stacks. A more reliable approach is to treat the prompt like a creative brief to a designer: state the use case, subject, composition, style, constraints, output size, and acceptance criteria. This works for manual creation in AI Studio and for developers who put prompts into API workflows.

As of 2026-07-08, Google's Nano Banana image generation docs split image generation into several model routes: Nano Banana 2, Nano Banana Pro, Lite, and the old Nano Banana. New code should prefer the Interactions API; to control image output, set `type: "image"`, `aspect_ratio`, and `image_size` in `response_format`. Models, pricing, quotas, and availability change — verify Google's [image generation](https://ai.google.dev/gemini-api/docs/image-generation), [pricing](https://ai.google.dev/gemini-api/docs/pricing), and [rate limits](https://ai.google.dev/gemini-api/docs/rate-limits) docs before production.

| What you're making | Suggested route |
| --- | --- |
| Fast creative sketches | Start with Nano Banana 2 or Lite, cheap multi-round iteration |
| Text, branding, complex composition | Evaluate Nano Banana Pro / `gemini-3-pro-image` |
| 4K delivery images | Set `image_size: "4K"` explicitly and verify cost against project budget |
| Reference-image editing | Upload images you have rights to, describe what to keep and change in natural language |
| Batch generation | Use fixed prompt fields, queues, and Batch/Flex instead of copying templates by hand |
| China-based developers | Prefer the official route; use a gateway only as a payment, compatibility, or backup channel |

## Pick the Model First, Then Write the Prompt

Even a great prompt needs the right model and output tier. Break "what image do I want" into "how fast, how expensive, how precise, and how high-resolution."

| Model | Current positioning | Prompt focus |
| --- | --- | --- |
| `gemini-3.1-flash-lite-image` | Low cost, low latency, large-scale sketches | Short and clear, batch consistency, few reference images |
| `gemini-3.1-flash-image` | General image generation and editing | Composition, reference images, multi-round edits |
| `gemini-3-pro-image` | Professional assets, complex instructions, 4K, brand consistency | Delivery use, text content, layout, constraints, acceptance criteria |
| `gemini-2.5-flash-image` | Old Nano Banana route | Legacy compatibility; new projects should evaluate migration |

If you're just exploring directions, don't start with heavy 4K professional prompts. Generate 3 to 5 directions with a low-cost model first, then upgrade the most promising one to Pro or 4K — it usually saves money and keeps quality easier to control.

## The 7 Fields of a Chinese Prompt

A reusable Chinese prompt is best written with fixed fields rather than one improvised sentence each time.

| Field | Question it answers | Example |
| --- | --- | --- |
| Use case | Where will this image finally live | Ecommerce hero, web hero, poster, cover, app icon |
| Subject | What's the central object of the frame | A glass skincare serum bottle, a fictional character, a concept car |
| Composition | How subject and environment are organized | Centered, text area on the left, 45-degree top-down, rule of thirds |
| Style | What visual system it should resemble | Product photography, 3D icon, flat illustration, ink wash, movie poster |
| Details | What must appear or stay unchanged | Logo position, packaging text, clothing colors, reference character features |
| Output | Aspect ratio, size, whether whitespace is needed | 16:9, 4:5, 1:1, 4K, title space at top |
| Acceptance | What counts as failure | Text can't be wrong, hands can't be deformed, background can't overwhelm the subject |

You can write directly in this template:

```text
Generate a [ratio/size] image for [use case].
The subject is [subject description], positioned [composition].
The scene includes [environment and required elements], overall style is [visual style].
Must keep [key constraints], and avoid [explicit exclusions].
The image should convey [mood/brand feel] and fit [delivery context].
```

Example:

```text
Generate a 16:9 landscape product hero for a skincare brand's website.
The subject is a clear glass serum bottle, positioned on the right third.
The scene is a clean white bathroom counter, with enough copy space on the left and soft lighting.
Must keep the clear edge of the bottle label, and no other brand text.
The overall feel is premium, restrained, quiet — suitable for an ecommerce landing hero.
```

## Template Library

These templates aren't for stacking keywords; they're for locking down the image task quickly. Replace the bracketed content with your own material.

### Product Photography

```text
Generate a [ratio] ecommerce hero image for [product type].
The product is [material/color/key selling point], placed in [scene].
Use [lighting], with a background that is [clean/lifestyle/premium], highlighting [selling point].
Leave [copy space position] in the frame, and don't add unrelated brands or extra text.
```

### Web Hero

```text
Generate a website hero background image for [product/service].
Show [subject] on the right side, leaving title and button space on the left.
Overall style is [industry temperament], colors should not be oversaturated.
The image should crop well to desktop and mobile, and the subject must not touch the edges.
```

### App Icon

```text
Generate an App icon for [function/brand].
Use [main shape] to express [core concept], with [primary color] and [accent color].
The icon must stay clear at small sizes and contain no tiny text.
Keep the background simple with safe margins on the edges.
```

### Social Media Portrait

```text
Generate a 4:5 vertical image for [platform].
The subject is [person/product/scene], positioned slightly above center.
Leave short-title space at the bottom, with colors suited to fast mobile scrolling.
Avoid dense text, and don't let the background steal attention from the subject.
```

### Poster and Event Image

```text
Generate a poster key visual for [event theme].
Include [core person/product/symbol], with a title area at top and time/place info space at bottom.
Style is [cinematic/techy/minimal/retro].
Don't render body text directly in the text area; keep clean whitespace and hierarchy.
```

### Infographic Draft

```text
Generate an infographic draft explaining [concept].
Divide the frame into [number] steps, each expressed with a simple icon.
Keep the layout clear, suitable for adding official text in a design tool later.
Avoid lots of small text; focus on structure and visual hierarchy.
```

### Character Consistency

```text
Based on the fictional character in the reference image, generate [new scene/pose].
Keep the character's face shape, hairstyle, main clothing color, and core accessories unchanged.
Change [expression/action/background] while keeping the same visual style.
Don't change the character's age, identity, or main visual features.
```

### Local Editing

```text
Edit this image, modifying only [specific region].
Change [original element] to [target element], keeping subject, lighting, composition, and background unchanged.
Don't change [region that must be preserved].
The output should look like a naturally shot version of the original, not a pasted image.
```

### Style Transfer

```text
Convert this image to [target style].
Keep the subject outline, composition, and key colors; don't change the person's identity or product structure.
Only change materials, brushwork, lighting and shadow, and the overall visual language.
The result should fit [delivery use].
```

### Reference Image Composition

```text
Using [subject] from the first image and [scene/lighting/material] from the second, generate a new [ratio] image.
The subject should blend naturally into the scene with consistent perspective, shadows, and color temperature.
Don't copy unrelated background elements from the reference images.
```

## How to Write Prompts in the API

New code should use the Interactions API. Below is a minimal Python example, focusing on separating the natural-language prompt from output control.

```python
from google import genai
import base64

client = genai.Client()

prompt = """
Generate a 16:9 website hero image for a smart notes app.
On the right side is a tablet showing a clean notes interface.
Leave title and button space on the left; the overall style is restrained, professional, bright.
No real brand logos, and no dense small text.
"""

interaction = client.interactions.create(
    model="gemini-3.1-flash-image",
    input=prompt,
    response_format={
        "type": "image",
        "aspect_ratio": "16:9",
        "image_size": "2K",
    },
)

if interaction.output_image:
    with open("hero.png", "wb") as f:
        f.write(base64.b64decode(interaction.output_image.data))
```

For 4K professional assets, switch the model to `gemini-3-pro-image` and set `image_size` to `4K`. The actual 4K cost, pixel table, and Batch/Flex boundaries must be verified against the current official docs.

## Reference Images and Multi-Round Editing

The core of a reference-image prompt isn't "imitate this image" — it's specifying what to keep and what to change.

A more reliable version:

```text
Keep the product's bottle shape, label position, and clear glass material from the reference image.
Change the background to a light gray photo studio, adding soft reflections and a right-side rim light.
Don't change the bottle proportions, don't replace the label text, and don't add other products.
Output as a 1:1 square, suitable for ecommerce listing pages.
```

In multi-round editing, change only one main goal per round. For example, round one sets composition, round two adjusts lighting, round three handles the text area. Asking the model to "change the background, switch style, add text, fix hands, and change colors" in one go increases the chance of losing control and makes failures much harder to debug.

## Cost and Quota Boundaries

A prompt guide shouldn't promise fixed free quotas, fixed speeds, or fixed success rates. Gemini API quota applies per project, not per API key; image models may also be affected by image-specific limits, spend limits, and model capacity.

Before launch, at minimum verify:

| Item | How to verify |
| --- | --- |
| Model ID | Use current official docs and the models actually available to your project |
| Output size | 1K, 2K, and 4K differ in tokens and price |
| Call mode | Standard, Batch, Flex, and Priority differ in price and latency |
| 429 | Check project-level RPM/TPM/RPD/IPM and spend limit |
| Gateway | Check the current console's models, sizes, billing, error logs, and terms of service |
| Data | Whether user images, brand assets, and people photos are suitable for a third-party route |

If you're evaluating a third-party gateway, verify it as a "payment, compatibility, or backup channel" — not as an official source of truth.

## Common Failures and Fixes

| Problem | Common cause | Fix |
| --- | --- | --- |
| Image isn't composed for the use | Prompt only describes the subject, no delivery context | Add use cases like web hero, poster, or ecommerce hero |
| Text area is messy | Asking the model to lay out lots of text directly | Have the model keep a title area; typeset real text later |
| Subject deformed | Reference-image constraints unclear | Specify exactly which features must be preserved |
| Style unstable | Too many style words in one prompt | Keep one main style plus one or two supporting constraints |
| Cost too high | All sketches at 4K | Iterate at 1K/2K first, upgrade to 4K after finalizing |
| Frequent 429 | Concurrency and size uncontrolled | Add queues, backoff, lower resolution, or use Batch/Flex |

## FAQ

### Can I use Chinese prompts directly?

Yes. Google's docs list zh-CN among the languages where image generation performs well. Don't force-translate to English to "look more professional"; if your business context, brand terms, and delivery audience are Chinese, a Chinese prompt often expresses details better.

### Will writing "4K" in the prompt generate 4K?

Not necessarily. "4K" in the prompt is just a natural-language request; API output size is controlled by `response_format.image_size`. In manual products, check the output tiers the current UI supports.

### How many images should I generate at once?

In the dev flow, prefer a few images over many rounds, not one big batch. Confirm composition and style first, then scale up. API batch jobs are constrained by quota, cost, and failure-retry strategy.

### Can I generate real people or celebrities?

Be careful. User uploads, real people, portraits, brands, and copyrighted material all involve rights and safety boundaries. Only upload images you have the right to use; don't generate deceptive, harassing, infringing, or safety-bypassing content.

### Why is text in images unstable?

Image models can handle text, but lots of small text and complex typography still go wrong easily. A more reliable approach: generate a visual draft with whitespace and hierarchy first, then typeset the final text in a design tool or the frontend.

### Can a gateway route fully replace the official API?

No. A gateway can reduce payment and integration friction, but model coverage, price, failed-request billing, latency, and data boundaries must be verified against your current account. For sensitive material or enterprise compliance, prefer the official or enterprise route. Exact pricing and quotas are confirmed in the [gpt88.cc console](https://gpt88.cc).

## Getting Started Order

1.  Write a Chinese prompt using the 7 fields.
2.  Generate 3 to 5 directions with a low-cost model.
3.  Pick one direction and do two or three rounds of edits, one main goal per round.
4.  Upgrade to Pro, 2K, or 4K only when you need professional delivery.
5.  Record model, size, prompt, reference images, cost, and failure reasons for reproducibility.

A good Gemini image prompt isn't about stacking adjectives like "HD, cinematic, commercial-grade" — it's about describing the creative task clearly. The clearer the use case, subject, composition, constraints, and acceptance criteria, the more the model behaves like it's executing a design brief instead of guessing what you want.
