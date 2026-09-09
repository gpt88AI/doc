---
title: Gemini 4K Image API: தற்போதைய மாடல்கள், code மற்றும் செலவு வரம்புகள்
description: Gemini 4K image generation API-க்கான நடைமுறை வழிகாட்டி: தற்போதைய model ID, Interactions API, 1K/2K/4K tiers, Standard மற்றும் Batch/Flex pricing, project quota மற்றும் 429 troubleshooting.
date: 2026-01-20
category: API மேம்பாடு
tags: [Gemini API, 4K Image Generation, Nano Banana Pro, Gemini 3 Pro Image, AI Image API]
readTime: 14
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Gemini 4K integration-க்கு பழைய preview examples-ஐ நம்ப வேண்டாம். தற்போதைய route `gemini-3-pro-image`; புதிய code-ல் Interactions API-யின் `response_format` மூலம் image output-ஐ கட்டுப்படுத்தவும். Standard, Batch, Flex, Priority மற்றும் third-party gateway செலவுகளை தனித்தனியாக கணக்கிடவும். 2026-07-08 mapping-ல் Nano Banana Pro, Gemini 3 Pro Image மற்றும் `gemini-3-pro-image` model ID உடன் இணைக்கப்பட்டுள்ளது. உதாரணமாக 4K Standard சுமார் `$0.24/image`, Batch/Flex சுமார் `$0.12/image`; production-க்கு முன் official pricing சரிபார்க்கவும்.

## தற்போதைய மாடல் தேர்வு

| Model | அடையாளம் | ஏற்ற வேலை |
| --- | --- | --- |
| `gemini-3-pro-image` | Nano Banana Pro / Gemini 3 Pro Image | complex instructions, professional assets, 4K, strict text, brand consistency |
| `gemini-3.1-flash-image` | Nano Banana 2 | பொதுவான generation, editing, iteration, குறைந்த செலவு/வேகம் |
| `gemini-3.1-flash-lite-image` | Nano Banana 2 Lite | பெரிய volume, low-cost, low-latency tasks |
| `gemini-2.5-flash-image` | Legacy Nano Banana route | பழைய project compatibility |

4K deliverable-க்கு `gemini-3-pro-image`-ஐ முதலில் evaluate செய்யவும். Draft-க்கு 1K/2K அல்லது மலிவு model அதிகம் controllable. புதிய code-ஐ பழைய preview names மீது அமைக்க வேண்டாம்.

## API key மற்றும் environment

Keys Google Cloud project-க்கு இணைக்கப்பட்டவை. Billing, quotas, logs மற்றும் rate limits-ஐ project level-ல் triage செய்யவும்.

```bash
export GEMINI_API_KEY="your_key_here"
```

Official libraries `GEMINI_API_KEY` அல்லது `GOOGLE_API_KEY` படிக்கும்; இரண்டும் இருந்தால் `GOOGLE_API_KEY` முன்னுரிமை பெறலாம். Production-ல் key-ஐ frontend, mobile bundle, public repo அல்லது logs-ல் வைக்க வேண்டாம்.

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

`image_size` `1K`, `2K`, `4K` tier-ஐத் தேர்வு செய்கிறது; உண்மையான pixels aspect ratio-ஐ சார்ந்தவை. GPT88 Google-compatible surface-க்கு `https://img.gpt88.cc` மற்றும் console-ன் `YOUR_GPT88_API_KEY` பயன்படுத்தவும்.

## Reference images மற்றும் 4K dimensions

Reference image மூலம் composition rebuild, background swap அல்லது branded asset உருவாக்கலாம். Upload முன் copyright மற்றும் usage rights சரிபார்க்கவும். 4K எப்போதும் `4096x4096` அல்ல: 1:1 = `4096 x 4096`, 16:9 = `5504 x 3072`, 9:16 = `3072 x 5504`, 4:5 = `3712 x 4608` ஆகலாம். Web-க்கு 2K போதுமானதாக இருக்கலாம்; print, crop மற்றும் large display-க்கு 4K வைத்துக்கொள்ளவும்.

## Pricing, quota மற்றும் 429

உதாரண Standard pricing: 1K/2K சுமார் `$0.134/image`, 4K சுமார் `$0.24/image`; Batch/Flex 4K சுமார் `$0.12/image`। Input text, references, thinking, Search grounding, retries மற்றும் failures bill-ஐ மாற்றலாம். முதலில் 1K/2K approval பெற்று, இறுதியில் 4K உருவாக்கவும்.

Rate limits RPM, TPM, RPD மற்றும் IPM ஆக இருக்கலாம்; இவை project-level, கூடுதல் keys மூலம் capacity தானாக அதிகரிக்காது. 429 வந்தால் concurrency குறைத்து, exponential backoff, queue அல்லது Batch/Flex பயன்படுத்தவும். Project ID, model ID, call type, size மற்றும் spend limit பதிவு செய்யவும்.

## Gateway, prompt மற்றும் checklist

Third-party gateway payment மற்றும் compatible interface-ஐ எளிதாக்கலாம்; அது official Google API அல்ல. Current model name, `image_size`, உண்மையான pixels, failure billing, logs, data boundary, refunds மற்றும் SLA-ஐ சரிபார்க்கவும். GPT88 charge official usage × selected group multiplier அடிப்படையில் பார்க்கவும். Prompt-ல் delivery purpose, subject constraints, frame, style, lighting மற்றும் post-processing எழுதவும்; “8K” என்று மட்டும் எழுதுவது API tier-ஐ மாற்றாது.

Launch முன் current model ID, Interactions API, backend secret storage, pricing, quota, 1K/2K/4K budget மற்றும் 429/403/empty-output handling verify செய்யவும்.

## FAQ

Professional 4K-க்கு Pro-ஐ முதலில் evaluate செய்யவும்; draft-க்கு Flash/Lite பார்க்கவும். பழைய preview names புதிய code-ல் பயன்படுத்த வேண்டாம். பழைய articles-ன் Free Tier-ஐ current fact எனக் கொள்ள வேண்டாம். `image_size="4K"` aspect ratio-க்கு ஏற்ப pixels மாற்றும். SynthID இருந்தால் attribution மற்றும் AI usage வெளிப்படையாக தெரிவிக்கவும். 429 quota, spend limit அல்லது temporary capacity காரணமாக இருக்கலாம்.

## Further Reading

- [Image Generation API](/docs/api/images/)
