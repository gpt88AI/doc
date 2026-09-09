---
title: Gemini App Nano Banana Tutorial: Beginner سے Expert Guide
description: Gemini app میں Nano Banana image generation کا مکمل guide — base اور Pro، login، UI، six-element prompts، templates، editing، errors اور API integration۔
date: 2026-01-09
category: تکنیکی ٹیوٹوریل
tags: [Nano Banana, Gemini, AI Image Generation, Prompt Templates, Image Generation Tutorial]
readTime: 16
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Gemini app میں “draw me a cyberpunk cat” لکھنے سے چند seconds میں image بن جاتی ہے، مگر بہتر نتیجے کے لیے model، prompt، reference image اور iteration سمجھنا ضروری ہے۔

## Nano Banana اور Pro

Base Nano Banana Gemini 2.5 Flash Image پر مبنی تیز 1K generation ہے۔ Pro Gemini 3 Pro Image Preview پر مبنی ہے اور complex instructions، بہتر text rendering اور 1K/2K/4K resolution دیتا ہے۔ عام quick creation کے لیے base کافی ہے؛ poster، infographic، text، high resolution یا precise control کے لیے Pro منتخب کریں۔ Free Pro limits account اور وقت کے ساتھ بدل سکتی ہیں، اس لیے current UI کو source of truth سمجھیں۔

## شروع کرنا

`gemini.google.com` کھولیں یا official mobile app استعمال کریں۔ Google account، age eligibility اور supported region درکار ہو سکتے ہیں۔ Input box کے `+` سے “Create image” منتخب کریں، یا `draw`، `generate`، `create` سے request شروع کریں۔ Fast عموماً base اور Thinking عموماً Pro model ہے، مگر labels اور availability account کے مطابق بدل سکتے ہیں۔ Chinese، English، Japanese سمیت کئی زبانیں چلتی ہیں؛ complex scene کمزور ہو تو English phrasing آزمائیں۔

## پہلی image کا workflow

1. Subject اور scene واضح کریں؛ صرف “a cat” بہت vague ہے۔
2. Prompt لکھیں: orange cat، wooden windowsill، afternoon light، blurred plants، cozy photo style۔
3. Send کریں اور عموماً 5–30 seconds انتظار کریں۔
4. Result review، download یا اسی conversation میں edit کریں۔
5. ایک وقت میں ایک تبدیلی دیں، مثلاً “cat کا رنگ gray کرو” یا “light softer کرو”۔

Preview اکثر 1K ہوتا ہے؛ download اور Pro resolution current UI پر منحصر ہیں۔ Gemini images میں invisible SynthID watermark ہو سکتا ہے۔

## Prompt کے چھ elements

1. **Subject:** کیا یا کون، مثلاً glowing blue eyes والا steampunk copper robot۔
2. **Composition:** close-up، medium shot، wide shot، low angle، bird’s-eye view، 85mm lens۔
3. **Action:** subject کیا کر رہا ہے، مثلاً barista latte بنا رہا ہے اور steam اٹھ رہی ہے۔
4. **Location:** retro-industrial coffee shop، brick wall، warm yellow light۔
5. **Style:** photorealistic، 3D، watercolor، anime، cyberpunk، minimalist یا vintage۔
6. **Editing:** background بدلیں، object ہٹائیں، fog شامل کریں۔

Keyword list کے بجائے مکمل جملے لکھیں۔ “nice lighting” کے بجائے “golden afternoon sunlight” کہیں۔ پہلا result imperfect ہو تو conversation میں آہستہ iterate کریں۔

## Reusable templates

```text
Professional product photography of [product]. Clean background, three-point lighting,
soft reflections, visible texture and detail, commercial quality for ecommerce.
```

```text
Generate [scene] in [style]. Use [composition], [lighting], and [color palette].
Keep [must-preserve details] unchanged and avoid [exclusions].
```

Portrait، product، food، skyline، landscape، poster، app icon اور character consistency میں subject، framing، action، environment، style اور constraints واضح رکھیں۔

## Multi-turn editing اور API

ہر round میں ایک بنیادی تبدیلی رکھیں: composition، پھر lighting، پھر color یا text area۔ Reference image میں صرف rights والی image upload کریں اور بتائیں کیا preserve کرنا ہے۔ API میں current model ID، output size، pricing اور quota verify کریں؛ image output کے لیے `type: "image"`، `aspect_ratio` اور `image_size` والی API settings استعمال کریں۔ 429 پر محدود backoff اور queue رکھیں؛ 400/403 کو blind retry نہ کریں۔

Region، age، account اور model availability الگ eligibility ہیں۔ Real people، brands، copyrighted images اور uploaded photos کے rights رکھیں۔ Final text کے لیے whitespace چھوڑ کر design tool میں typeset کرنا زیادہ قابل اعتماد ہے۔

## Further Reading

- [Image Generation API](/docs/api/images/)
