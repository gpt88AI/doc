---
title: Gemini 3 Pro Image Preview ආකෘති සංසන්දනය සහ සමාලෝචනය: 2026 සම්පූර්ණ මාර්ගෝපදේශය
description: Gemini 3 Pro Image Preview (Nano Banana Pro) Imagen 3, Gemini 2.5 Flash සහ AuraFlow සමඟ සංසන්දනය කරන්න; architecture, resolution, text rendering, pricing සහ API integration ඇතුළත් වේ.
date: 2026-01-14
category: ආකෘති සංසන්දනය
tags: [Gemini 3 Pro Image, Nano Banana Pro, AI image generation, ආකෘති සංසන්දනය, API review]
readTime: 15
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

2025 අවසානයේ Google නිකුත් කළ Gemini 3 Pro Image Preview community තුළ “Nano Banana Pro” ලෙස හැඳින්වේ. එය language reasoning සහ image generation ඒකාබද්ධ කර 1K/2K/4K output, multilingual text, Google Search grounding සහ multi-turn editing ලබා දෙයි. නමුත් සෑම කාර්යයකටම මෙය හොඳම තේරීම නොවේ: realistic photo සඳහා Imagen 3, realtime වේගය සඳහා Gemini 2.5 Flash, privacy සහ self-hosting සඳහා AuraFlow වඩා සුදුසු විය හැක.

## Architecture සහ ප්‍රධාන හැකියාවන්

Traditional diffusion models prompt එක pixels බවට පත් කරයි. Gemini 3 Pro Image යනු multimodal Transformer එකක් වන අතර image generation, language understanding හි දිගුවක් ලෙස හසුරුවයි. **Thinking Mode** සංකීර්ණ scene එකක composition සහ element placement පළමුව සැලසුම් කරයි. **Search Grounding** generation කිරීමට පෙර Google Search වෙතින් live තොරතුරු ලබා ගත හැක.

| Dimension | Specification | Practical impact |
| --- | --- | --- |
| Model ID | `gemini-3-pro-image-preview` | API route; official docs වෙනස් නම් current page බලන්න |
| Codename | Nano Banana Pro | Community name |
| Output | 1K/2K/4K | 4K බොහෝ විට 4096×4096 |
| Aspect ratios | 10 standard ratios | 1:1 සිට 21:9 දක්වා |
| References | Up to 14 | object, identity සහ style references |
| Text | Multilingual | Chinese, English, Japanese, Korean, Arabic ආදිය |
| Speed | 10–20 s | Thinking Mode සමඟ තත්පර 30ක් පමණ |

## ආකෘති හතරේ කෙටි සංසන්දනය

| Dimension | Gemini 3 Pro | Imagen 3 | Gemini 2.5 Flash | AuraFlow v0.3 |
| --- | --- | --- | --- | --- |
| Architecture | Multimodal Transformer | Diffusion Transformer | Lightweight multimodal | Rectified Flow |
| Open source | නැත | නැත | නැත | Apache 2.0 |
| Max resolution | 4096×4096 | 1536×1536 | 1024×1024 | 1536×1536 |
| Speed | 10–20 s | 5–10 s | ~3 s | 8–15 s |
| Text accuracy | 95%+ | 75–80% | 65–75% | 60–70% |
| Standard price | $0.134/image (2K) | $0.03/image | $0.039/image | Cloud $0.10–0.15/image |
| 4K price | $0.24/image | නැත | නැත | Native 4K නැත |

මිල වෙනස් විය හැක; budget කිරීමට පෙර official pricing පරීක්ෂා කරන්න. Readable text හෝ 4K සඳහා Pro, realistic photo සඳහා Imagen 3, realtime preview සඳහා Flash, local privacy සඳහා AuraFlow සලකා බලන්න.

## Imagen 3 සමඟ සංසන්දනය

Imagen 3 dedicated diffusion model එකක් බැවින් portrait, product සහ landscape වල realistic detail සඳහා ශක්තිමත්ය. Gemini 3 Pro infographic, marketing poster, character consistency සහ complex composition සඳහා ඉදිරියෙන් සිටී. Text රහිත realistic output සඳහා Imagen 3 ආසන්න වශයෙන් `$0.03/image` බැවින් හොඳ value එකකි; readable text හෝ multi-turn editing අවශ්‍ය නම් Pro තෝරන්න.

## Gemini 2.5 Flash සමඟ සංසන්දනය

Pro 4K, වඩා හොඳ text accuracy සහ Thinking Mode ලබා දෙයි. Flash තත්පර 3ක් පමණකින් 1K output අඩු මිලකට ලබා දෙයි. Avatar, preview සහ bulk A/B variants සඳහා Flash; print poster, precise text සහ final deliverable සඳහා Pro. Pro තුළ 1K සහ 2K token cost එක සමාන නම් file-size සීමාවක් නැති විට 2K තෝරන්න.

## AuraFlow සමඟ සංසන්දනය

AuraFlow open-source, self-hosted සහ Apache 2.0 licensed වේ. Prompt සහ output ඔබේම infrastructure තුළ තබා LoRA fine-tuning කළ හැක. එහෙත් GPU, CUDA/PyTorch, deployment සහ maintenance අවශ්‍යය; fp16 සඳහා අවම වශයෙන් 12GB VRAM සලකා බලන්න. 4K, search grounding සහ විශ්වාසදායක text සඳහා එය Pro හි සම්පූර්ණ විකල්පයක් නොවේ.

## Pricing සහ cost strategy

උදාහරණයක් ලෙස Gemini 3 Pro 1K/2K ආසන්න වශයෙන් `$0.134/image`, 4K `$0.24/image` වේ; Batch API මඟින් non-realtime වැඩවල මිල 50%ක් පමණ අඩු කළ හැක. Imagen 3 ආසන්න වශයෙන් `$0.03/image`, Flash `$0.039/image` වේ. AuraFlow self-hosting සඳහා GPU, විදුලිය සහ operations වියදම් එකතු කරන්න।

1. Text-free realistic images සඳහා Imagen 3.
2. Realtime preview සඳහා Flash.
3. Text, 4K සහ complex composition සඳහා Pro.
4. High volume නම් AuraFlow total cost model එකක් සාදන්න.
5. GPT88 gateway මත කුඩා sample එකකින් current route, pricing, logs සහ failure billing verify කරන්න; strict SLA හෝ compliance නම් official API භාවිතා කරන්න.

## API integration

```python
from openai import OpenAI
client = OpenAI(api_key="sk-gpt88-...", base_url="https://gpt88.cc/v1")
response = client.chat.completions.create(
    model="gemini-3-pro-image-preview",
    messages=[{"role": "user", "content": "an orange cat watching Tokyo at night"}],
)
```

Launch කිරීමට පෙර route, response format, retry, failure billing සහ output dimensions වත්මන් console/docs මඟින් verify කරන්න.

## FAQ සහ අවසාන තේරීම

Nano Banana Pro සහ Gemini 3 Pro Image එකම model එකේ නම් දෙකකි. Imagen 3 අඩු මිලක් වන්නේ architecture සහ feature scope වෙනස් නිසාය. Flash සම්පූර්ණයෙන් unusable නොවුණත් client-facing text සඳහා ප්‍රමාණවත් reliable නොවේ. Text, 4K, editing හෝ search grounding අවශ්‍ය නොවන විට AuraFlow විකල්පයකි. 1K thumbnail/avatar, 2K සාමාන්‍ය web/social, 4K print සහ large display සඳහා භාවිතා කරන්න. Complex scene, spatial relation, infographic සහ series සඳහා Thinking Mode on; simple/realtime වැඩ සඳහා off කරන්න.

**Text/4K → Pro; realism → Imagen 3; speed → Flash; privacy → AuraFlow.**

## Further Reading

- [Google Image Generation API](/docs/api/images/)
