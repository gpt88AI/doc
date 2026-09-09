---
title: Gemini Image Generation Prompt Guide: Chinese Structure, Templates, and API Boundaries
description: Chinese creator ও developer-দের জন্য Gemini image prompt, Nano Banana model নির্বাচন, seven-field structure, template, reference editing, API ও quota boundary।
date: 2026-01-21
category: প্রযুক্তি টিউটোরিয়াল
tags: [Gemini, 图片生成, 提示词, Nano Banana, API教程]
readTime: 15
relatedPath: /docs/api/images/
relatedTitle: Google 图片生成 API
---

Gemini image prompt-কে keyword stack করবেন না। Designer-কে দেওয়া creative brief-এর মতো লিখুন: use case, subject, composition, style, constraints, output size এবং acceptance criteria। এটি AI Studio ও API workflow দুটির জন্যই কার্যকর।

2026-07-08-এর প্রেক্ষিতে Google-এর Nano Banana route-এ Nano Banana 2, Pro, Lite এবং পুরনো Nano Banana আছে। নতুন code-এ Interactions API অগ্রাধিকার দিন; image output নিয়ন্ত্রণে `response_format`-এ `type: "image"`, `aspect_ratio` এবং `image_size` সেট করুন। Model, pricing, quota ও availability বদলাতে পারে, তাই production-এর আগে official docs যাচাই করুন।

| কাজ | প্রস্তাবিত route |
| --- | --- |
| দ্রুত sketch | Nano Banana 2 বা Lite |
| text, branding, complex composition | Nano Banana Pro / `gemini-3-pro-image` |
| 4K delivery | `image_size: "4K"` এবং cost verify করুন |
| reference editing | অধিকার আছে এমন image upload করুন |
| batch generation | fixed fields, queue এবং Batch/Flex ব্যবহার করুন |
| China-based developer | official route; gateway শুধু payment/compatibility/backup channel |

## Model আগে বাছুন

`gemini-3.1-flash-lite-image` low-cost sketch ও scale-এর জন্য, `gemini-3.1-flash-image` সাধারণ generation/editing-এর জন্য, এবং `gemini-3-pro-image` professional asset, complex instruction ও 4K-এর জন্য। `gemini-2.5-flash-image` legacy route। আগে low-cost model-এ 3–5 direction বানিয়ে ভালোটি Pro/4K-তে upgrade করুন।

## Chinese prompt-এর সাতটি field

1. **Use case:** ecommerce hero, web hero, poster, cover বা app icon।
2. **Subject:** frame-এর কেন্দ্রীয় object বা character।
3. **Composition:** centered, left copy space, top-down, rule of thirds।
4. **Style:** product photography, 3D icon, flat illustration, ink wash।
5. **Details:** logo position, packaging text, clothing color ও preserved feature।
6. **Output:** ratio, size ও whitespace, যেমন 16:9, 4:5, 1:1, 4K।
7. **Acceptance:** ভুল text, deformed hand বা অতিরিক্ত background failure।

```text
Generate a [ratio/size] image for [use case].
The subject is [subject], positioned [composition].
The scene includes [environment/elements], style is [visual style].
Must keep [constraints], and avoid [exclusions].
Fit [delivery context] and convey [mood/brand feel].
```

Product, scene, lighting, copy space এবং exclusions স্পষ্ট করুন। Poster বা infographic-এ ছোট final text model দিয়ে না লিখিয়ে whitespace রাখুন এবং পরে design tool-এ typeset করুন। Character consistency-তে face, hairstyle, clothing color ও accessories unchanged লিখুন। Local editing-এ একবারে একটি region বদলান।

## API ও reference image

নতুন code-এ Interactions API ব্যবহার করুন:

```python
interaction = client.interactions.create(
    model="gemini-3.1-flash-image",
    input=prompt,
    response_format={"type": "image", "aspect_ratio": "16:9", "image_size": "2K"},
)
```

4K professional asset-এর জন্য `gemini-3-pro-image` এবং `image_size: "4K"` ব্যবহার করুন; cost ও Batch/Flex boundary current official docs দিয়ে যাচাই করুন। Reference image-এ কী রাখতে এবং কী বদলাতে হবে স্পষ্ট লিখুন। Multi-round editing-এ প্রতি round-এ একটি প্রধান লক্ষ্য রাখুন: composition, তারপর lighting, তারপর text area।

## Cost, quota ও failure

Quota project অনুযায়ী প্রযোজ্য, API key অনুযায়ী নয়। Model ID, output size, call mode, RPM/TPM/RPD/IPM, spend limit এবং gateway billing/error log launch-এর আগে দেখুন। Gateway official source of truth নয়; sensitive material-এর জন্য official বা enterprise route পছন্দ করুন।

Subject-only prompt-এ delivery composition খারাপ হয়; use case যোগ করুন। বেশি text সরাসরি render না করিয়ে title area রাখুন। অস্পষ্ট reference constraint-এ subject deform হয়। অতিরিক্ত style word instability আনে। সব sketch 4K-তে করবেন না; 1K/2K দিয়ে শুরু করুন। Frequent `429`-এ queue, backoff, কম resolution বা Batch/Flex ব্যবহার করুন।

## FAQ ও শুরু করার ক্রম

Chinese prompt সরাসরি ব্যবহার করা যায়; professional দেখাতে জোর করে English-এ অনুবাদ করবেন না। Prompt-এ “4K” লেখা API output-এর 4K guarantee নয়; `image_size` তা নিয়ন্ত্রণ করে। Real people, portrait, brand ও copyrighted material-এ rights এবং safety boundary মানুন। Gateway official API পুরোপুরি replace করে না।

1. সাত field-এর Chinese prompt লিখুন।
2. Low-cost model-এ 3–5 direction তৈরি করুন।
3. একটি direction-এ 2–3 round, প্রতি round-এ একটি goal।
4. দরকার হলে Pro, 2K বা 4K-তে upgrade করুন।
5. Model, size, prompt, reference, cost ও failure record করুন।

স্পষ্ট use case, subject, composition, constraint ও acceptance criteria adjective stacking-এর চেয়ে নির্ভরযোগ্য।

## Further Reading

- [Google 图片生成 API](/docs/api/images/)
