---
title: Gemini Image Generation Prompt Guide: Chinese Structure, Templates, and API Boundaries
description: چینی creators اور developers کے لیے Gemini image prompts، Nano Banana model selection، سات-field structure، templates، reference editing، API اور quota boundaries۔
date: 2026-01-21
category: تکنیکی ٹیوٹوریل
tags: [Gemini, 图片生成, 提示词, Nano Banana, API教程]
readTime: 15
relatedPath: /docs/api/images/
relatedTitle: Google 图片生成 API
---

Gemini image prompt کو keyword stack نہ بنائیں۔ اسے designer کے creative brief کی طرح لکھیں: use case، subject، composition، style، constraints، output size اور acceptance criteria۔ یہ AI Studio اور API دونوں میں کام کرتا ہے۔

2026-07-08 کے context میں Nano Banana routes میں Nano Banana 2، Pro، Lite اور پرانا Nano Banana شامل ہیں۔ نئے code میں Interactions API استعمال کریں؛ `response_format` میں `type: "image"`، `aspect_ratio` اور `image_size` سے output control کریں۔ Model، pricing، quota اور availability بدل سکتے ہیں، اس لیے production سے پہلے official docs دیکھیں۔

| کام | تجویز |
| --- | --- |
| تیز sketches | Nano Banana 2 یا Lite |
| text، branding، complex composition | Nano Banana Pro / `gemini-3-pro-image` |
| 4K delivery | `image_size: "4K"` اور cost verify کریں |
| reference editing | صرف rights والی images upload کریں |
| batch generation | fixed fields، queues اور Batch/Flex |

## Model پہلے منتخب کریں

`gemini-3.1-flash-lite-image` کم cost sketches کے لیے، `gemini-3.1-flash-image` عام generation/editing کے لیے، اور `gemini-3-pro-image` professional assets، complex instructions اور 4K کے لیے ہے۔ `gemini-2.5-flash-image` legacy route ہے۔ پہلے low-cost model میں 3–5 directions بنائیں، پھر بہترین کو Pro یا 4K میں upgrade کریں۔

## Chinese prompt کے سات fields

1. **Use case:** ecommerce hero، web hero، poster، cover یا app icon۔
2. **Subject:** frame کا مرکزی object یا character۔
3. **Composition:** centered، left copy space، top-down یا rule of thirds۔
4. **Style:** product photography، 3D icon، flat illustration یا ink wash۔
5. **Details:** logo position، packaging text، clothing colors اور محفوظ features۔
6. **Output:** ratio، size اور whitespace، جیسے 16:9، 4:5، 1:1، 4K۔
7. **Acceptance:** غلط text، deformed hands یا overwhelming background failure ہیں۔

```text
Generate a [ratio/size] image for [use case].
The subject is [subject], positioned [composition].
The scene includes [environment/elements], style is [visual style].
Must keep [constraints], and avoid [exclusions].
Fit [delivery context] and convey [mood/brand feel].
```

Poster یا infographic میں چھوٹا final text model سے render نہ کرائیں؛ whitespace چھوڑ کر design tool میں typeset کریں۔ Character consistency میں face، hairstyle، clothing color اور accessories unchanged لکھیں۔ Local editing میں ایک وقت میں صرف ایک region بدلیں۔

## API اور reference images

نئے code میں Interactions API استعمال کریں:

```python
interaction = client.interactions.create(
    model="gemini-3.1-flash-image",
    input=prompt,
    response_format={"type": "image", "aspect_ratio": "16:9", "image_size": "2K"},
)
```

4K asset کے لیے `gemini-3-pro-image` اور `image_size: "4K"` منتخب کریں؛ cost اور Batch/Flex حدود current official docs سے verify کریں۔ Reference image میں صاف لکھیں کہ کیا رکھنا اور کیا بدلنا ہے۔ ہر editing round میں ایک بنیادی مقصد رکھیں: composition، پھر lighting، پھر text area۔

## Cost، quota اور failures

Quota project پر لاگو ہوتا ہے، API key پر نہیں۔ Model ID، output size، call mode، RPM/TPM/RPD/IPM، spend limit اور gateway logs launch سے پہلے دیکھیں۔ Gateway کو official source of truth نہ سمجھیں؛ حساس material کے لیے official یا enterprise route بہتر ہے۔

Subject-only prompt سے composition خراب ہوتی ہے؛ use case شامل کریں۔ بہت سا text براہ راست render نہ کرائیں۔ غیر واضح reference constraints سے subject deform ہوتا ہے۔ بہت سے style words instability لاتے ہیں۔ پہلے 1K/2K پر iterate کریں؛ frequent `429` میں queue، backoff، کم resolution یا Batch/Flex استعمال کریں۔

## FAQ اور آغاز

Chinese prompts براہ راست استعمال کر سکتے ہیں۔ Prompt میں “4K” لکھنا API میں 4K کی ضمانت نہیں؛ `image_size` output کو control کرتا ہے۔ Real people، portraits، brands اور copyrighted material کے لیے rights اور safety boundaries رکھیں۔ Gateway official API کو مکمل replace نہیں کرتا۔

1. سات fields والا prompt لکھیں۔
2. Low-cost model میں 3–5 directions بنائیں۔
3. ایک direction پر 2–3 rounds کریں، ہر round میں ایک goal۔
4. ضرورت پر Pro، 2K یا 4K upgrade کریں۔
5. Model، size، prompt، references، cost اور failures record کریں۔

## Further Reading

- [Google 图片生成 API](/docs/api/images/)
