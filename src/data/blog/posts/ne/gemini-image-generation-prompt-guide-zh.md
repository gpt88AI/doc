---
title: Gemini Image Generation Prompt Guide: Chinese Structure, Templates, and API Boundaries
description: Chinese creators र developers का लागि Gemini image prompt, Nano Banana model चयन, सात-field structure, templates, reference editing, API र quota boundaries।
date: 2026-01-21
category: प्राविधिक ट्युटोरियल
tags: [Gemini, 图片生成, 提示词, Nano Banana, API教程]
readTime: 15
relatedPath: /docs/api/images/
relatedTitle: Google 图片生成 API
---

Gemini image prompt लाई keyword stack नबनाउनुहोस्। Designer लाई दिने creative brief जस्तै use case, subject, composition, style, constraints, output size र acceptance criteria लेख्नुहोस्। यसले AI Studio र API workflow दुवैमा काम गर्छ।

2026-07-08 को सन्दर्भमा Nano Banana 2, Pro, Lite र पुरानो Nano Banana routes छन्। नयाँ code मा Interactions API रोज्नुहोस्; `response_format` मा `type: "image"`, `aspect_ratio` र `image_size` सेट गर्नुहोस्। Model, pricing, quota र availability बदलिन्छन्, त्यसैले production अघि official docs verify गर्नुहोस्।

| काम | सुझाव |
| --- | --- |
| छिटो sketches | Nano Banana 2 वा Lite |
| text, branding, complex composition | Nano Banana Pro / `gemini-3-pro-image` |
| 4K delivery | `image_size: "4K"` र cost verify |
| reference editing | अधिकार भएका images मात्र upload |
| batch generation | fixed fields, queues, Batch/Flex |

## Model पहिले छान्नुहोस्

`gemini-3.1-flash-lite-image` low-cost sketches का लागि, `gemini-3.1-flash-image` सामान्य generation/editing का लागि, र `gemini-3-pro-image` professional assets, complex instructions तथा 4K का लागि हो। `gemini-2.5-flash-image` legacy route हो। पहिले low-cost model मा 3–5 directions बनाउनुहोस्, अनि राम्रो विकल्पलाई Pro वा 4K मा upgrade गर्नुहोस्।

## Chinese prompt का सात fields

1. **Use case:** ecommerce hero, web hero, poster, cover वा app icon।
2. **Subject:** frame को मुख्य object वा character।
3. **Composition:** centered, left copy space, top-down, rule of thirds।
4. **Style:** product photography, 3D icon, flat illustration, ink wash।
5. **Details:** logo position, packaging text, clothing colors र कायम राख्ने features।
6. **Output:** ratio, size र whitespace; 16:9, 4:5, 1:1, 4K।
7. **Acceptance:** गलत text, deformed hands वा subject ढाक्ने background failure हुन्।

```text
Generate a [ratio/size] image for [use case].
The subject is [subject], positioned [composition].
The scene includes [environment/elements], style is [visual style].
Must keep [constraints], and avoid [exclusions].
Fit [delivery context] and convey [mood/brand feel].
```

Poster वा infographic मा सानो final text model बाट render नगराउनुहोस्; whitespace राखेर design tool मा typeset गर्नुहोस्। Character consistency का लागि face, hairstyle, clothing color र accessories unchanged लेख्नुहोस्। Local editing मा हरेक round मा एउटा region मात्र बदल्नुहोस्।

## API र reference images

नयाँ code मा Interactions API प्रयोग गर्नुहोस्:

```python
interaction = client.interactions.create(
    model="gemini-3.1-flash-image",
    input=prompt,
    response_format={"type": "image", "aspect_ratio": "16:9", "image_size": "2K"},
)
```

4K asset का लागि `gemini-3-pro-image` र `image_size: "4K"` राख्नुहोस्; cost र Batch/Flex सीमा official docs बाट verify गर्नुहोस्। Reference image मा के राख्ने र के बदल्ने स्पष्ट लेख्नुहोस्। Editing round मा composition, lighting, text area मध्ये एक मुख्य goal मात्र राख्नुहोस्।

## Cost, quota र failures

Quota project मा लागू हुन्छ, API key मा होइन। Model ID, output size, call mode, RPM/TPM/RPD/IPM, spend limit र gateway logs launch अघि जाँच्नुहोस्। Gateway official source of truth होइन; sensitive material का लागि official वा enterprise route रोज्नुहोस्।

Subject मात्र वर्णन गर्दा delivery composition बिग्रन्छ; use case थप्नुहोस्। धेरै text image मा render नगरी title area राख्नुहोस्। अस्पष्ट reference constraints ले subject deform गर्छ। धेरै style words ले instability ल्याउँछन्। सबै sketch 4K मा नचलाउनुहोस्; 1K/2K बाट सुरु गर्नुहोस्। Frequent `429` मा queue, backoff, कम resolution वा Batch/Flex प्रयोग गर्नुहोस्।

## FAQ र सुरु गर्ने क्रम

Chinese prompt सिधै प्रयोग गर्न सकिन्छ। Prompt मा “4K” लेख्नु API मा 4K output को guarantee होइन; `image_size` ले output नियन्त्रण गर्छ। Real people, portraits, brands र copyrighted material का लागि rights र safety boundaries पालना गर्नुहोस्। Gateway ले official API लाई पूर्ण रूपमा replace गर्दैन।

1. सात fields भएको prompt लेख्नुहोस्।
2. Low-cost model मा 3–5 directions बनाउनुहोस्।
3. एउटा direction मा 2–3 rounds; हरेक round मा एउटा goal।
4. आवश्यकताअनुसार Pro, 2K वा 4K मा upgrade गर्नुहोस्।
5. Model, size, prompt, references, cost र failures record गर्नुहोस्।

## Further Reading

- [Google 图片生成 API](/docs/api/images/)
