---
title: Gemini 4K Image API: हालका मोडेल, कोड र लागतका सीमाहरू
description: Gemini 4K image generation API को व्यावहारिक गाइड: हालको model ID, Interactions API, 1K/2K/4K tiers, Standard बनाम Batch/Flex pricing, project quota र 429 troubleshooting।
date: 2026-01-20
category: API विकास
tags: [Gemini API, 4K Image Generation, Nano Banana Pro, Gemini 3 Pro Image, AI Image API]
readTime: 14
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Gemini 4K integration मा पुराना preview examples प्रयोग नगर्नुहोस्। हालको route `gemini-3-pro-image` हो; नयाँ code मा Interactions API को `response_format` बाट image output नियन्त्रण गर्नुहोस्। Standard, Batch, Flex, Priority र third-party gateway को लागत छुट्टाछुट्टै राख्नुहोस्। 2026-07-08 को mapping मा Nano Banana Pro लाई Gemini 3 Pro Image र `gemini-3-pro-image` model ID सँग जोडिएको छ। उदाहरणका लागि 4K Standard करिब `$0.24/image`, Batch/Flex करिब `$0.12/image`; production अघि official pricing जाँच्नुहोस्।

## हालको मोडेल चयन

| Model | पहिचान | उपयुक्त काम |
| --- | --- | --- |
| `gemini-3-pro-image` | Nano Banana Pro / Gemini 3 Pro Image | complex instruction, professional assets, 4K, strict text र brand consistency |
| `gemini-3.1-flash-image` | Nano Banana 2 | सामान्य generation, editing, iteration, कम लागत र गति |
| `gemini-3.1-flash-lite-image` | Nano Banana 2 Lite | ठूलो volume, low-cost, low-latency task |
| `gemini-2.5-flash-image` | Legacy Nano Banana route | पुराना project compatibility |

4K deliverable का लागि `gemini-3-pro-image` पहिले evaluate गर्नुहोस्। Draft का लागि 1K/2K वा सस्तो model बढी controllable हुन्छ। नयाँ code लाई पुराना preview names मा निर्भर नगराउनुहोस्।

## API key र environment

API keys Google Cloud project सँग जोडिएका हुन्छन्। Billing, quota, logs र rate limits project स्तरमा triage गर्नुहोस्।

```bash
export GEMINI_API_KEY="your_key_here"
```

Official libraries ले `GEMINI_API_KEY` वा `GOOGLE_API_KEY` पढ्छन्; दुवै भए `GOOGLE_API_KEY` प्राथमिक हुन सक्छ। Production मा key frontend, mobile bundle, public repo वा logs मा नराख्नुहोस्।

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

`image_size` ले `1K`, `2K` वा `4K` tier रोज्छ; वास्तविक pixels aspect ratio मा निर्भर हुन्छन्। GPT88 Google-compatible surface का लागि `https://img.gpt88.cc` र console को `YOUR_GPT88_API_KEY` प्रयोग गर्नुहोस्।

## Reference image र dimensions

Reference image बाट composition rebuild, background swap वा branded asset बनाउन सकिन्छ। Upload अघि copyright र usage rights जाँच्नुहोस्। 4K सधैं `4096x4096` हुँदैन: 1:1 = `4096 x 4096`, 16:9 = `5504 x 3072`, 9:16 = `3072 x 5504`, 4:5 = `3712 x 4608` हुन सक्छ। Web का लागि 2K पर्याप्त हुन सक्छ; print, crop र large display का लागि 4K राख्नुहोस्।

## Pricing, quota र 429

उदाहरण Standard pricing: 1K/2K करिब `$0.134/image`, 4K करिब `$0.24/image`; Batch/Flex 4K करिब `$0.12/image`। Input text, reference images, thinking, Search grounding, retries र failures ले bill बदल्न सक्छन्। पहिले 1K/2K मा approval लिएर final मा 4K बनाउनुहोस्।

Rate limits RPM, TPM, RPD र IPM हुन सक्छन्; यी project-level हुन्, थप keys बनाएर capacity स्वतः बढ्दैन। 429 मा concurrency घटाउनुहोस्, exponential backoff लगाउनुहोस्, 4K queue गर्नुहोस् वा Batch/Flex प्रयोग गर्नुहोस्। Project ID, model ID, call type, size र spend limit लेखेर राख्नुहोस्।

## Gateway, prompt र checklist

Third-party gateway ले payment र compatible interface सजिलो बनाउन सक्छ, तर यो official Google API होइन। Current model name, `image_size`, वास्तविक pixels, failure billing, logs, data boundary, refunds र SLA verify गर्नुहोस्। GPT88 मा charge official usage × selected group multiplier अनुसार हेर्नुहोस्। Prompt मा delivery purpose, subject constraints, frame, style, lighting र post-processing लेख्नुहोस्; “8K” लेख्दैमा API tier बदलिँदैन।

Launch अघि current model ID, Interactions API, backend secret storage, pricing, quota, 1K/2K/4K budget र 429/403/empty-output handling verify गर्नुहोस्।

## FAQ

Professional 4K का लागि Pro पहिले evaluate गर्नुहोस्; draft का लागि Flash/Lite हेर्नुहोस्। नयाँ code मा पुराना preview names नचलाउनुहोस्। पुराना articles को Free Tier लाई current तथ्य नमान्नुहोस्। `image_size="4K"` ले aspect ratio अनुसार फरक pixels दिन्छ। SynthID भए attribution र AI usage पारदर्शी राख्नुहोस्। 429 quota, spend limit वा temporary capacity को कारण हुन सक्छ।

## Further Reading

- [Image Generation API](/docs/api/images/)
