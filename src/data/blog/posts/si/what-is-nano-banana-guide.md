---
title: Nano Banana යනු කුමක්ද? Features, Pricing සහ Prompt Tips (2026 Guide)
description: Google Nano Banana, Gemini 2.5 Flash Image, Nano Banana Pro, free quota, pricing සහ ප්‍රායෝගික prompt tips පිළිබඳ සම්පූර්ණ guide.
date: 2026-01-09
category: Gemini专题
tags: [Nano Banana, Gemini, AI Image Generation, Google AI, Prompt Tips]
readTime: 12
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

## Nano Banana යනු කුමක්ද?

Nano Banana යනු Google DeepMind හි Gemini පවුලේ AI image generation සහ editing capability සඳහා භාවිතා වන codename එකකි. මෙය වෙනම standalone model එකක් නොව Gemini multimodal architecture හි image module එකකි. එම නිසා complex instructions, context සහ conversational iteration හොඳින් හසුරුවයි.

| Version | Official Name | Release | Positioning |
| --- | --- | --- | --- |
| Nano Banana | Gemini 2.5 Flash Image | Aug 26, 2025 | වේගවත් everyday use |
| Nano Banana Pro | Gemini 3 Pro Image Preview | Nov 20, 2025 | professional quality |

සරලව කියනවා නම් Nano Banana යනු Gemini හි drawing capability එකයි. Chat එකක් මෙන් scene එක විස්තර කළ විට model එක image එකක් සාදයි හෝ edit කරයි.

## History සහ 3D Figurine Trend

2025 අගෝස්තු මාසයේ LMArena හි anonymous model එකක් consistent characters, complex scenes සහ realistic images නිසා ජනප්‍රිය විය. අගෝස්තු 26 දින Google එය Gemini 2.5 Flash Image බව තහවුරු කළේය. නොවැම්බර් මාසයේ Pro version එක පැමිණි අතර 2K/4K output, වඩා හොඳ text rendering, reference images 14ක් සහ Google Search grounding ඇතුළත් විය. Viral 3D figurine result එක ඇත්ත වශයෙන් realistic 2D image එකකි; `.STL` හෝ `.OBJ` printable file සඳහා අමතර conversion අවශ්‍යය.

## Core Features

- **Text-to-image:** scene, lighting සහ style natural language වලින් ලියන්න; keyword stacking වළකින්න.
- **Image editing:** elements එකතු/ඉවත් කිරීම, style transfer සහ local adjustment කළ හැක. Pro හි masked editing ඇත.
- **Multi-image composition:** reference images කිහිපයක් එක scene එකකට එකතු කළ හැක; Pro images 14ක් සහ characters 5ක් දක්වා consistency රඳවයි.
- **Text rendering:** Pro long text, calligraphy සහ බොහෝ භාෂා හොඳින් render කරයි.
- **Web Search grounding:** current weather, recipes හෝ sports scores වැනි live data භාවිත කළ හැක.

## Free Quota සහ Pricing

Gemini App free users සඳහා images 2/day, Google AI Studio සඳහා requests 500/day සහ අලුත් Google Cloud users සඳහා $300/90 days credit ලැබිය හැක. Quota UTC midnight හි reset වේ. Success, filtered request සහ technical failure ද quota භාවිත කරයි. Pro quota අවසන් වූ විට plain Nano Banana වෙත fallback විය හැක. API prices: Gemini 2.5 Flash Image $0.039/image, Gemini 3 Pro Image 1K-2K $0.134 සහ 4K $0.24. Batch API හි 24-hour delay එකකට 50% discount ලැබිය හැක.

GPT88 unified gateway හරහා OpenAI-compatible හෝ native Google interface භාවිත කළ හැක. Current console එකේ model coverage, RMB pricing සහ failed-request billing verify කරන්න. API key source code තුළ නොතබන්න.

## Prompt Tips

Natural language භාවිත කරන්න: “an orange cat sitting on a neon-lit street...”। Background වෙනස් කරන විට subject lighting රඳවා ගන්නා context ලබා දෙන්න. පළමුව base image එක සාදා rounds කිහිපයකින් refine කරන්න. Multi-image composition හි වැදගත් reference එක පළමුව තබන්න. Text සඳහා exact words quotes තුළ, position, font සහ size සඳහන් කරන්න. Consistency සඳහා එකම reference නැවත භාවිත කර facial features identical ලෙස තබන්නැයි කියන්න.

Blurry text සඳහා Pro සහ explicit font size, warped face සඳහා clear frontal reference, inconsistent style සඳහා concrete style description සහ filtered content සඳහා safety settings හෝ rephrasing භාවිත කරන්න.

## FAQ

Nano Banana speed සහ 1024 output සඳහාය; Pro quality, 4K, හොඳ text සහ 14-image composition සඳහාය. Free Gemini App වෙතින් 2 images/day සහ AI Studio වෙතින් up to 500 requests/day ලැබේ. Images තුළ invisible SynthID watermark එකක් ඇත. Commercial use latest Google terms සහ content policies යටතේය. Chinese prompts හොඳින් ක්‍රියා කරයි, නමුත් complex instructions English වලින් වඩා accurate විය හැක.

## Further Reading

- [Nano Banana Pro Multi-Reference Guide](/en/docs/blog/nano-banana-pro-multi-reference-guide/)
- [Nano Banana Pro Pricing & Quota Guide](/en/docs/blog/nano-banana-pro-pricing-quota-guide-2026/)
- [Google Image Generation API](/en/docs/api/images/)
