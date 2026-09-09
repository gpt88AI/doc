---
title: Gemini 4K Image API: বর্তমান মডেল, কোড ও খরচের সীমা
description: Gemini 4K image generation API-এর ব্যবহারিক গাইড: বর্তমান model ID, Interactions API, 1K/2K/4K tiers, Standard বনাম Batch/Flex pricing, project quota এবং 429 troubleshooting।
date: 2026-01-20
category: API উন্নয়ন
tags: [Gemini API, 4K Image Generation, Nano Banana Pro, Gemini 3 Pro Image, AI Image API]
readTime: 14
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Gemini 4K integration-এ পুরনো preview example ব্যবহার করবেন না। বর্তমান route হলো `gemini-3-pro-image`; নতুন code-এ Interactions API-এর `response_format` দিয়ে image output নিয়ন্ত্রণ করুন। Standard, Batch, Flex, Priority এবং third-party gateway-এর খরচ আলাদা রাখুন। 2026-07-08-এর mapping-এ Nano Banana Pro-কে Gemini 3 Pro Image এবং model ID `gemini-3-pro-image` হিসেবে দেখানো হয়েছে। উদাহরণ হিসেবে 4K Standard প্রায় `$0.24/image`, Batch/Flex প্রায় `$0.12/image`; production-এর আগে official pricing দেখুন।

## বর্তমান মডেল নির্বাচন

| Model | পরিচয় | উপযুক্ত কাজ |
| --- | --- | --- |
| `gemini-3-pro-image` | Nano Banana Pro / Gemini 3 Pro Image | complex instruction, professional asset, 4K, strict text ও brand consistency |
| `gemini-3.1-flash-image` | Nano Banana 2 | সাধারণ generation, editing, iteration, কম খরচ ও দ্রুত কাজ |
| `gemini-3.1-flash-lite-image` | Nano Banana 2 Lite | বড় volume, low-cost, low-latency task |
| `gemini-2.5-flash-image` | Legacy Nano Banana route | পুরনো project compatibility |

4K deliverable-এর জন্য `gemini-3-pro-image` আগে পরীক্ষা করুন। শুধু draft হলে 1K/2K বা সস্তা model নিয়ন্ত্রণ করা সহজ। পুরনো preview name-কে নতুন integration-এর ভিত্তি করবেন না।

## API key ও environment

API key Google Cloud project-এর সঙ্গে যুক্ত। Billing, quota, logs এবং rate limit project স্তরে triage করুন।

```bash
export GEMINI_API_KEY="your_key_here"
```

Official library `GEMINI_API_KEY` বা `GOOGLE_API_KEY` পড়ে; দুটো থাকলে `GOOGLE_API_KEY` অগ্রাধিকার পেতে পারে। Production-এ key frontend, mobile bundle, public repo বা log-এ রাখবেন না।

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

`image_size` `1K`, `2K` বা `4K` tier বেছে নেয়; বাস্তব pixel aspect ratio-এর উপর নির্ভর করে। GPT88 Google-compatible surface-এ `https://img.gpt88.cc` ও console-এর `YOUR_GPT88_API_KEY` ব্যবহার করুন।

## Reference image ও 4K dimension

Reference image দিয়ে composition পুনর্গঠন, background বদলানো বা branded asset তৈরি করা যায়। Upload-এর আগে copyright ও usage rights যাচাই করুন। 4K সবসময় `4096x4096` নয়: 1:1 = `4096 x 4096`, 16:9 = `5504 x 3072`, 9:16 = `3072 x 5504`, 4:5 = `3712 x 4608` হতে পারে। Web-এর জন্য 2K যথেষ্ট হতে পারে; print, crop ও large display-এর জন্য 4K রাখুন।

## Pricing ও quota

উদাহরণ Standard pricing: 1K/2K প্রায় `$0.134/image`, 4K প্রায় `$0.24/image`; Batch/Flex 4K প্রায় `$0.12/image`। Input text, reference image, thinking, Search grounding, retry ও failure-ও bill বদলাতে পারে। আগে 1K/2K-তে approval নিয়ে final-এ 4K করুন।

Rate limit সাধারণত RPM, TPM, RPD এবং IPM। এগুলো project-level; নতুন key বানালে capacity স্বয়ংক্রিয়ভাবে বাড়ে না। 429 হলে concurrency কমান, exponential backoff দিন, 4K queue করুন বা Batch/Flex ব্যবহার করুন। Project ID, model ID, call type, size ও spend limit record করুন।

## Gateway যাচাই

Third-party gateway payment ও compatible interface সহজ করতে পারে, কিন্তু এটি official Google API নয়। Current model name, `image_size`, আসল pixel, failure billing, logs, data boundary, refund এবং SLA যাচাই না করে unlimited বা fixed-price দাবি করবেন না। GPT88-তে official usage × নির্বাচিত group multiplier অনুযায়ী charge দেখুন।

## Prompt ও delivery flow

Prompt-এ delivery purpose, subject constraints, frame, style, lighting, copy area ও post-processing লিখুন। Prompt-এ “8K” লিখলে API tier বদলায় না; `response_format.image_size` ব্যবহার করুন। Series-এর জন্য size, aspect ratio, references, brand rules, filename এবং acceptance criteria স্থির রাখুন।

## FAQ ও checklist

Professional 4K-এর জন্য `gemini-3-pro-image` আগে evaluate করুন; draft-এর জন্য Flash/Lite দেখুন। নতুন code-এ পুরনো preview model name ব্যবহার করবেন না। Free Tier-কে পুরনো article দেখে নিশ্চিত ধরে নেবেন না। `image_size="4K"` aspect ratio অনুযায়ী আলাদা pixel দেয়। SynthID থাকলে attribution ও AI usage স্বচ্ছ রাখুন। 429 project quota, spend limit বা temporary capacity থেকে আসতে পারে।

Launch-এর আগে current model ID, Interactions API, backend secret storage, billing/quota, 1K/2K/4K budget এবং 429/403/empty-output handling যাচাই করুন। Gateway-কে candidate route হিসেবে বর্তমান model, output, billing ও data boundary দিয়ে পরীক্ষা করুন।

## Further Reading

- [Image Generation API](/docs/api/images/)
