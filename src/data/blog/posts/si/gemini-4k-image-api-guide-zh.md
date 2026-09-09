---
title: Gemini 4K Image API: වත්මන් ආකෘති, code සහ වියදම් සීමා
description: Gemini 4K image generation API සඳහා ප්‍රායෝගික මාර්ගෝපදේශය: වත්මන් model ID, Interactions API, 1K/2K/4K tiers, Standard සහ Batch/Flex pricing, project quota සහ 429 troubleshooting.
date: 2026-01-20
category: API සංවර්ධනය
tags: [Gemini API, 4K Image Generation, Nano Banana Pro, Gemini 3 Pro Image, AI Image API]
readTime: 14
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Gemini 4K integration සඳහා පැරණි preview examples භාවිතා නොකරන්න. වත්මන් route එක `gemini-3-pro-image` ය; නව code තුළ Interactions API හි `response_format` මඟින් image output පාලනය කරන්න. Standard, Batch, Flex, Priority සහ third-party gateway වියදම් වෙන වෙනම තබන්න. 2026-07-08 mapping අනුව Nano Banana Pro, Gemini 3 Pro Image සහ `gemini-3-pro-image` model ID සමඟ සම්බන්ධ වේ. උදාහරණයක් ලෙස 4K Standard ආසන්න වශයෙන් `$0.24/image`, Batch/Flex ආසන්න වශයෙන් `$0.12/image`; production පෙර official pricing පරීක්ෂා කරන්න.

## වත්මන් ආකෘතිය තෝරා ගැනීම

| Model | අනන්‍යතාව | සුදුසු කාර්යය |
| --- | --- | --- |
| `gemini-3-pro-image` | Nano Banana Pro / Gemini 3 Pro Image | complex instructions, professional assets, 4K, strict text සහ brand consistency |
| `gemini-3.1-flash-image` | Nano Banana 2 | සාමාන්‍ය generation, editing, iteration, අඩු වියදම සහ වේගය |
| `gemini-3.1-flash-lite-image` | Nano Banana 2 Lite | විශාල volume, low-cost, low-latency tasks |
| `gemini-2.5-flash-image` | Legacy Nano Banana route | පැරණි project compatibility |

4K deliverable සඳහා `gemini-3-pro-image` මුලින් evaluate කරන්න. Draft සඳහා 1K/2K හෝ අඩු වියදම් model එක වඩා controllable ය. නව code එක පැරණි preview names මත පදනම් නොකරන්න.

## API key සහ environment

API keys Google Cloud project එකකට බැඳී ඇත. Billing, quota, logs සහ rate limits project level එකේ triage කරන්න.

```bash
export GEMINI_API_KEY="your_key_here"
```

Official libraries `GEMINI_API_KEY` හෝ `GOOGLE_API_KEY` කියවයි; දෙකම තිබේ නම් `GOOGLE_API_KEY` ප්‍රමුඛ විය හැක. Production තුළ key frontend, mobile bundle, public repo හෝ logs වල නොතබන්න.

## Minimal 4K call

```python
from google import genai
import base64

client = genai.Client()
interaction = client.interactions.create(
    model="gemini-3-pro-image",
    input="Generate a 16:9 premium skincare product hero image",
    response_format={"type": "image", "aspect_ratio": "16:9", "image_size": "4K"},
)

if interaction.output_image:
    with open("gemini-4k-product-hero.png", "wb") as f:
        f.write(base64.b64decode(interaction.output_image.data))
```

`image_size` මඟින් `1K`, `2K`, `4K` tier එක තෝරයි; සැබෑ pixels aspect ratio එක මත රඳා පවතී. GPT88 Google-compatible surface සඳහා `https://img.gpt88.cc` සහ console හි `YOUR_GPT88_API_KEY` භාවිතා කරන්න.

## Reference images සහ 4K dimensions

Reference image එකකින් composition rebuild, background swap හෝ branded asset සෑදිය හැක. Upload කිරීමට පෙර copyright සහ usage rights පරීක්ෂා කරන්න. 4K සෑම විටම `4096x4096` නොවේ: 1:1 = `4096 x 4096`, 16:9 = `5504 x 3072`, 9:16 = `3072 x 5504`, 4:5 = `3712 x 4608` විය හැක. Web සඳහා 2K ප්‍රමාණවත් විය හැක; print, crop සහ large display සඳහා 4K තබන්න.

## Pricing, quota සහ 429

උදාහරණ Standard pricing: 1K/2K ආසන්න වශයෙන් `$0.134/image`, 4K `$0.24/image`; Batch/Flex 4K ආසන්න වශයෙන් `$0.12/image`। Input text, reference images, thinking, Search grounding, retries සහ failures bill වෙනස් කළ හැක. මුලින් 1K/2K approval ලබාගෙන අවසානයේ 4K generate කරන්න.

Rate limits RPM, TPM, RPD සහ IPM විය හැකි අතර ඒවා project-level වේ; අමතර keys මඟින් capacity ස්වයංක්‍රීයව වැඩි නොවේ. 429 පැමිණි විට concurrency අඩු කර exponential backoff, queue හෝ Batch/Flex භාවිතා කරන්න. Project ID, model ID, call type, size සහ spend limit සටහන් කරන්න.

## Gateway, prompt සහ checklist

Third-party gateway payment සහ compatible interface පහසු කළ හැකි නමුත් එය official Google API නොවේ. Current model name, `image_size`, සැබෑ pixels, failure billing, logs, data boundary, refunds සහ SLA verify කරන්න. GPT88 charge official usage × selected group multiplier ලෙස පරීක්ෂා කරන්න. Prompt තුළ delivery purpose, subject constraints, frame, style, lighting සහ post-processing ලියන්න; “8K” යන වචනය පමණක් API tier එක වෙනස් නොකරයි.

Launch පෙර current model ID, Interactions API, backend secret storage, pricing, quota, 1K/2K/4K budget සහ 429/403/empty-output handling verify කරන්න.

## FAQ

Professional 4K සඳහා Pro මුලින් evaluate කරන්න; draft සඳහා Flash/Lite බලන්න. නව code තුළ පැරණි preview names භාවිතා නොකරන්න. පැරණි articles හි Free Tier current fact එකක් ලෙස නොගන්න. `image_size="4K"` aspect ratio අනුව වෙනස් pixels ලබා දෙයි. SynthID තිබේ නම් attribution සහ AI usage විවෘතව සඳහන් කරන්න. 429 quota, spend limit හෝ temporary capacity නිසා විය හැක.

## Further Reading

- [Image Generation API](/docs/api/images/)
