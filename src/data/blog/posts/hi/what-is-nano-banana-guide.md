---
title: Nano Banana क्या है? Features, Pricing और Prompt Tips (2026 Guide)
description: Google Nano Banana की तकनीक, Gemini 2.5 Flash Image और Nano Banana Pro, free quotas, pricing और practical prompt tips की पूरी guide।
date: 2026-01-09
category: Gemini专题
tags: [Nano Banana, Gemini, AI Image Generation, Google AI, Prompt Tips]
readTime: 12
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

## Nano Banana क्या है?

Nano Banana Google DeepMind के Gemini परिवार की AI image generation और editing capabilities का codename है। यह अलग standalone model नहीं, बल्कि Gemini की multimodal architecture में image module है। इसलिए यह complex instructions, context और conversational iteration को अच्छी तरह संभालता है।

| Version | Official Name | Release | Positioning |
| --- | --- | --- | --- |
| Nano Banana | Gemini 2.5 Flash Image | Aug 26, 2025 | तेज, everyday use |
| Nano Banana Pro | Gemini 3 Pro Image Preview | Nov 20, 2025 | quality-first, professional work |

सरल भाषा में, Nano Banana Gemini की drawing capability है। आप chat की तरह scene बताते हैं और model image बनाता या edit करता है।

## History और Viral 3D Figurines

अगस्त 2025 में LMArena पर anonymous model ने consistent characters, complex scenes और realistic images दिखाईं। Community ने internal codename के कारण इसे Nano Banana कहा। 26 अगस्त को Google ने इसे Gemini 2.5 Flash Image के रूप में confirm किया। नवंबर में Nano Banana Pro आया, जिसमें 2K/4K output, बेहतर text rendering, 14 reference images और Google Search grounding शामिल हैं।

3D figurine trend में model ने acrylic base, collectible packaging और computer पर चल रहे 3D modelling process जैसी details वाली 2D images बनाईं। यह असली `.STL` या `.OBJ` 3D file नहीं है; printing के लिए अलग conversion चाहिए।

## Core Features

1. **Text-to-image:** natural language से scene, lighting और style बताएं। Keyword stacking से बेहतर पूरा वाक्य लिखें।
2. **Image editing:** elements जोड़ें या हटाएं, style बदलें और केवल sky या कपड़ों जैसे local हिस्से edit करें। Pro में masked editing मिलता है।
3. **Multi-image composition:** कई references को एक coherent scene में मिलाएं। Pro एक साथ 14 images और 5 characters तक consistency संभाल सकता है।
4. **Text rendering:** Pro posters, long text, calligraphy और Chinese, English, Japanese, Spanish, Hindi जैसी भाषाओं को बेहतर render करता है।
5. **Web Search grounding:** Pro current weather, recipes या sports scores जैसे live data पर आधारित visuals बना सकता है।

## Free Quotas और Pricing

| Channel | Quota/Benefit | Notes |
| --- | --- | --- |
| Gemini App free users | 2 images/day | सबसे आसान entry |
| Google AI Studio | 500 requests/day | development testing |
| Google Cloud new users | $300 / 90 days | card required, लगभग 2,240 images |

Quotas UTC midnight पर reset होते हैं। Successful, filtered और technical failures भी quota consume कर सकते हैं। Pro quota खत्म होने पर system plain Nano Banana पर fall back कर सकता है।

| Model | Resolution | Price per Image |
| --- | --- | --- |
| Gemini 2.5 Flash Image | 1024x1024 | $0.039 |
| Gemini 3 Pro Image | 1K-2K | $0.134 |
| Gemini 3 Pro Image | 4K | $0.24 |

Google Batch API में 24 घंटे तक delay के बदले 50% discount मिल सकता है। GPT88 unified gateway से OpenAI-compatible या native Google interface के जरिए उपयोग कर सकते हैं; exact model coverage, RMB pricing और failed-request billing को current console में verify करें।

```python
import requests

API_KEY = "YOUR_GPT88_API_KEY"
API_URL = "https://img.gpt88.cc/v1beta/models/gemini-3-pro-image-preview:generateContent"
payload = {"contents": [{"parts": [{"text": "an orange cat, cyberpunk style, 4K quality"}]}],
           "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"imageSize": "2K"}}}
response = requests.post(API_URL, headers={"Authorization": f"Bearer {API_KEY}"}, json=payload, timeout=180)
```

Official API completeness और stability के लिए first choice है। GPT88 budget control, multiple models और mainland-China connectivity के लिए उपयोगी हो सकता है। API key को source code में commit न करें।

## Prompt Tips

- Keyword list के बजाय natural language लिखें: “an orange cat sitting on a neon-lit street...”
- Context दें: “background को clean white में बदलें, subject पर natural lighting रखें।”
- पहले base image बनाएं, फिर details को कई rounds में सुधारें।
- सबसे महत्वपूर्ण reference image पहले रखें और लोगों के लिए clear frontal photo चुनें।
- Exact text को quotes में दें और position, font तथा size बताएं।
- Consistency के लिए वही reference reuse करें और “keep facial features exactly identical” लिखें।

Troubleshooting में blurry text के लिए Pro और explicit font size, warped faces के लिए clear frontal reference, inconsistent style के लिए concrete style description और filtered content के लिए safety settings/rephrasing आजमाएं।

## FAQ

**Nano Banana और Pro में फर्क?** Nano Banana speed और 1024 output पर केंद्रित है; Pro quality, 4K, बेहतर text और 14-image composition पर।

**Free users कितनी images बना सकते हैं?** Gemini App में 2 images/day और AI Studio में up to 500 requests/day; दोनों quotas independent हैं।

**क्या watermark होता है?** Images में invisible SynthID digital watermark होता है। Commercial use latest Google terms और content policies के अधीन है।

**Chinese prompts कैसे काम करते हैं?** Chinese अच्छी तरह समझता है; बहुत complex instructions English में अधिक accurate हो सकती हैं।

## Further Reading

- [Nano Banana Pro Multi-Reference Guide](/en/docs/blog/nano-banana-pro-multi-reference-guide/)
- [Nano Banana Pro Pricing & Quota Guide](/en/docs/blog/nano-banana-pro-pricing-quota-guide-2026/)
- [Google Image Generation API](/en/docs/api/images/)
