---
title: Gemini App Nano Banana Tutorial: Beginner से Expert Guide
description: Gemini app में Nano Banana image generation का पूरा guide — base और Pro का अंतर, login, UI, छह-element prompt framework, templates, multi-turn editing, errors और API integration।
date: 2026-01-09
category: तकनीकी ट्यूटोरियल
tags: [Nano Banana, Gemini, AI Image Generation, Prompt Templates, Image Generation Tutorial]
readTime: 16
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Gemini app में “draw me a cyberpunk cat” लिखकर कुछ सेकंड में image बन जाती है। Nano Banana की सरलता उपयोगी है, लेकिन अच्छे परिणाम के लिए model, prompt, reference image और iteration समझना जरूरी है।

## Nano Banana और Nano Banana Pro

Base Nano Banana Gemini 2.5 Flash Image पर आधारित तेज़ 1K generation है। Pro Gemini 3 Pro Image Preview पर आधारित है और जटिल instructions, बेहतर text rendering तथा 1K/2K/4K resolution देता है। Base सामान्य quick creation के लिए पर्याप्त है; poster, infographic, text, high resolution या precise control के लिए Pro चुनें। Free users के Pro limits account और समय के अनुसार बदल सकते हैं; current UI में दिखे limit को ही मानें।

| Feature | Base | Pro |
| --- | --- | --- |
| Speed | लगभग 5–10 seconds | लगभग 10–30 seconds |
| Resolution | 1K | 1K / 2K / 4K |
| Text | basic | अधिक accurate, multilingual |
| Reference images | कम | अधिक, current product limit पर निर्भर |
| Reasoning | standard | advanced thinking |

## शुरू करना और UI

Web पर `gemini.google.com` खोलें या official mobile app उपयोग करें। Google account, age eligibility और supported region आवश्यक हो सकते हैं। Input box के पास `+` से “Create image” चुनें या `draw`, `generate`, `create` से शुरू होने वाला request लिखें। Model selector में Fast base model और Thinking Pro model हो सकता है; labels और availability account के अनुसार बदल सकते हैं। Chinese, English, Japanese और अन्य भाषाओं में prompts चल सकते हैं; complex scene खराब हो तो English phrasing आज़माएं।

## पहली image का workflow

1. Subject और scene स्पष्ट तय करें; केवल “a cat” बहुत vague है।
2. Complete prompt लिखें: orange cat, wooden windowsill, afternoon light, blurred plants, cozy photo style।
3. Send दबाएं और 5–30 seconds प्रतीक्षा करें।
4. Result review करें, download करें या उसी conversation में edit दें।
5. “Cat का रंग gray करो” या “light softer करो” जैसे एक-एक बदलाव करें।

Preview अक्सर 1K होता है; download options और Pro resolution current UI पर निर्भर हैं। Gemini images में SynthID invisible watermark हो सकता है।

## Prompt के छह elements

1. **Subject:** क्या या कौन — “glowing blue eyes वाला steampunk copper robot”।
2. **Composition:** close-up, medium shot, wide shot, low angle, bird’s-eye view, 85mm portrait lens।
3. **Action:** subject क्या कर रहा है — barista latte बना रहा है, steam उठ रही है।
4. **Location:** retro-industrial coffee shop, brick wall, warm yellow light।
5. **Style:** photorealistic, 3D, watercolor, anime, cyberpunk, minimalist या vintage।
6. **Editing instructions:** background बदलें, object हटाएं, fog जोड़ें।

पूरे वाक्य keyword list से बेहतर होते हैं। “nice lighting” के बजाय “golden afternoon sunlight” लिखें। पहला result imperfect हो तो conversation में धीरे-धीरे iterate करें।

## Reusable templates

```text
Professional product photography of [product]. Clean background, three-point lighting,
soft reflections, visible texture and detail, commercial quality for ecommerce.
```

```text
Hyperrealistic cinematic portrait of [subject], golden-hour backlight, warm hair halo,
shallow depth of field, soft background blur, film photography, high detail.
```

```text
Generate [scene] in [style]. Use [composition], [lighting], and [color palette].
Keep [must-preserve details] unchanged and avoid [exclusions].
```

Product, food, city skyline, landscape, poster, app icon और character consistency में यही structure रखें: subject, framing, action, environment, style और constraints।

## Multi-turn editing और API

एक round में एक मुख्य बदलाव रखें: पहले composition, फिर lighting, फिर color या text area। एक ही request में background, style, text, hands और colors बदलने से control घटता है। Reference image upload करते समय केवल अधिकार वाली image उपयोग करें और स्पष्ट करें कि क्या रखना है।

API workflow में current official model ID, output size, pricing और quota verify करें। Image output के लिए `response_format` में `type: "image"`, `aspect_ratio` और `image_size` सेट करने वाली API का उपयोग करें। 429 पर limited backoff और queue रखें; 400/403 को blind retry न करें।

## Common errors और safety

Region, age, account या model availability अलग-अलग eligibility हैं। App में option न दिखे तो बार-बार account/region बदलना समाधान नहीं। Real people, brands, copyrighted images और uploaded photos के rights रखें; deceptive, harassing या safety-bypassing content न बनाएं। Final text के लिए image model पर निर्भर न रहें; whitespace छोड़कर design tool में typeset करना अधिक reliable है।

## Further Reading

- [Image Generation API](/docs/api/images/)
