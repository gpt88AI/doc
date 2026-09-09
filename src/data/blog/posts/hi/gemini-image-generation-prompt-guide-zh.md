---
title: Gemini Image Generation Prompt Guide: Chinese Structure, Templates, and API Boundaries
description: Chinese creators और developers के लिए Gemini image prompts, Nano Banana model selection, seven-field structure, templates, reference editing, API और quota boundaries।
date: 2026-01-21
category: तकनीकी ट्यूटोरियल
tags: [Gemini, 图片生成, 提示词, Nano Banana, API教程]
readTime: 15
relatedPath: /docs/api/images/
relatedTitle: Google 图片生成 API
---

Gemini image prompt को keyword stack न बनाएं। इसे designer को दिए creative brief की तरह लिखें: use case, subject, composition, style, constraints, output size और acceptance criteria। यह AI Studio और API दोनों workflows में उपयोगी है।

2026-07-08 के संदर्भ में Google की Nano Banana routes में Nano Banana 2, Pro, Lite और पुराना Nano Banana शामिल हैं। नए code में Interactions API को प्राथमिकता दें; image output के लिए `response_format` में `type: "image"`, `aspect_ratio` और `image_size` सेट करें। Model, pricing, quota और availability बदल सकते हैं; production से पहले official docs सत्यापित करें।

| काम | सुझाया route |
| --- | --- |
| तेज sketches | Nano Banana 2 या Lite |
| text, branding, complex composition | Nano Banana Pro / `gemini-3-pro-image` |
| 4K delivery | `image_size: "4K"` और cost verify करें |
| reference editing | केवल अधिकार वाली images upload करें |
| batch generation | fixed fields, queue और Batch/Flex उपयोग करें |
| China-based developers | official route; gateway केवल payment/compatibility/backup channel |

## Model पहले चुनें

`gemini-3.1-flash-lite-image` low-cost sketches और scale के लिए, `gemini-3.1-flash-image` सामान्य generation/editing के लिए, `gemini-3-pro-image` professional assets, complex instructions और 4K के लिए है। `gemini-2.5-flash-image` legacy route है। पहले low-cost model में 3–5 directions बनाएं, फिर अच्छे विकल्प को Pro/4K में upgrade करें।

## Chinese prompt के सात fields

1. **Use case:** ecommerce hero, web hero, poster, cover या app icon।
2. **Subject:** frame का मुख्य object या character।
3. **Composition:** centered, left copy space, top-down, rule of thirds।
4. **Style:** product photography, 3D icon, flat illustration, ink wash।
5. **Details:** logo position, packaging text, clothing colors और preserved features।
6. **Output:** ratio, size और whitespace, जैसे 16:9, 4:5, 1:1, 4K।
7. **Acceptance:** गलत text, deformed hands या overwhelming background failure हैं।

```text
Generate a [ratio/size] image for [use case].
The subject is [subject], positioned [composition].
The scene includes [environment/elements], style is [visual style].
Must keep [constraints], and avoid [exclusions].
Fit [delivery context] and convey [mood/brand feel].
```

Prompt में product, scene, lighting, copy space और exclusions स्पष्ट रखें। Poster/infographic में final छोटे text को model से render कराने के बजाय whitespace छोड़कर बाद में design tool में typeset करें। Character consistency में face, hairstyle, clothing color और accessories को unchanged लिखें। Local editing में केवल एक region बदलें।

## API और reference images

नए code में Interactions API का उपयोग करें:

```python
interaction = client.interactions.create(
    model="gemini-3.1-flash-image",
    input=prompt,
    response_format={"type": "image", "aspect_ratio": "16:9", "image_size": "2K"},
)
```

4K professional asset के लिए `gemini-3-pro-image` और `image_size: "4K"` चुनें; वास्तविक cost और Batch/Flex सीमा current official docs से verify करें। Reference image में स्पष्ट लिखें कि क्या रखना और क्या बदलना है। Multi-round editing में हर round का एक मुख्य लक्ष्य रखें: composition, फिर lighting, फिर text area।

## Cost, quota और failures

Quota project पर लागू होता है, API key पर नहीं। Model ID, output size, call mode, RPM/TPM/RPD/IPM, spend limit और gateway billing/error logs launch से पहले जाँचें। Gateway को official source of truth न मानें; sensitive material के लिए official या enterprise route प्राथमिक है।

Subject-only prompt से delivery composition खराब होती है; use case जोड़ें। बहुत text image में डालने के बजाय title area रखें। अस्पष्ट reference constraints से subject deform होता है। बहुत style words instability लाते हैं। 4K पर सभी sketches न चलाएं; 1K/2K से शुरू करें। Frequent `429` में queue, backoff, कम resolution या Batch/Flex अपनाएं।

## FAQ और शुरू करने का क्रम

Chinese prompts सीधे उपयोग कर सकते हैं; उन्हें केवल professional दिखने के लिए translate न करें। Prompt में “4K” लिखना API में 4K output की गारंटी नहीं; `image_size` नियंत्रित करता है। Real people, portraits, brands और copyrighted material के लिए rights और safety boundaries रखें। Gateway official API को पूरी तरह replace नहीं करता।

1. सात fields वाला Chinese prompt लिखें।
2. Low-cost model में 3–5 directions बनाएं।
3. एक direction पर 2–3 rounds, हर round में एक goal।
4. आवश्यकता होने पर Pro, 2K या 4K पर upgrade करें।
5. Model, size, prompt, references, cost और failures record करें।

स्पष्ट use case, subject, composition, constraints और acceptance criteria adjective stacking से अधिक reliable हैं।

## Further Reading

- [Google 图片生成 API](/docs/api/images/)
