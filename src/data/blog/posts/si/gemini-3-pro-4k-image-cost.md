---
title: Nano Banana Pro 4K free ද? Nano Banana 2, API pricing සහ credits මුලින් පරීක්ෂා කරන්න
description: Nano Banana Pro සහ Nano Banana 2 හි official 4K API pricing, Gemini Apps 1K/2K download limits සහ third-party credits ownership තේරුම් ගන්න.
date: 2026-06-13
category: Gemini සංසන්දනය
tags: [Nano Banana Pro, Nano Banana 2, 4K Image Generation, Gemini API, Free Credits]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

**කෙටි පිළිතුර:** Official API තුළ Nano Banana Pro 4K output ලබා දිය හැකි නමුත් 2026 ජූලි 20 පරීක්ෂාවේ 4K Standard output සඳහා Free Tier නොතිබුණි; උදාහරණ මිල image එකකට ආසන්න වශයෙන් `$0.24` විය. Nano Banana 2 (`gemini-3.1-flash-image`) ද 4K ලබා දෙන අතර උදාහරණ මිල `$0.151` පමණය. Gemini Apps හි 1K/2K download පහසුකම API 4K contract එකක් නොවේ.

## පළමුව entry point හඳුනාගන්න

Gemini Apps, AI Studio, Gemini Developer API, Cloud/Vertex සහ third-party platforms හි limits සහ credits වෙනස්ය. Consumer plan එකක් මත API free tier හෝ 4K price අනුමාන නොකරන්න. Region, account eligibility සහ payment conditions ඔබේ account සහ official pages මඟින් පරීක්ෂා කරන්න.

## 4K API pricing

| Standard output | Nano Banana 2 | Nano Banana Pro |
| --- | ---: | ---: |
| Model ID | `gemini-3.1-flash-image` | `gemini-3-pro-image` |
| 1K | ආසන්න වශයෙන් $0.067 | ආසන්න වශයෙන් $0.134 |
| 2K | ආසන්න වශයෙන් $0.101 | ආසන්න වශයෙන් $0.134 |
| 4K | ආසන්න වශයෙන් **$0.151** | ආසන්න වශයෙන් **$0.24** |
| Free Tier | නැත | නැත |

මේවා image-output equivalents මිස ස්ථිර quotes නොවේ. Input images, text, retries සහ execution channels සම්පූර්ණ bill එක වෙනස් කළ හැක. Successful 4K outputs 100ක ලැයිස්තු මිල Nano Banana 2 සඳහා `$15.10`, Pro සඳහා `$24.00` වේ; accepted image එකකට සැබෑ cost බලන්න.

## Nano Banana 2 හෝ Pro

දෙකම 4K output ලබා දිය හැක. එකම prompt සහ acceptance criteria සමඟ සැබෑ tasks 10–20ක් පරීක්ෂා කරන්න. Routine product backgrounds, social assets සහ simple edits සඳහා Nano Banana 2 පළමුව බලන්න. Complex Chinese layout, multiple references, infographics හෝ strict composition නැවත නැවත fail නම් Pro evaluate කරන්න. පළමු ලස්සන image එක නොව accepted-output cost සහ rework මත තීරණය කරන්න.

## Gemini Apps 1K/2K, API 4K නොවේ

Gemini Apps download size එක consumer feature එකකි. Google AI plan එක app benefits වෙනස් කළ හැකි නමුත් Developer API output free නොකරයි. Dynamic limits account, region සහ capacity අනුව වෙනස් විය හැක. AI Studio availability ද ස්ථිර free access එකක් බවට සාක්ෂියක් නොවේ.

## “Free credits” කාගේද?

100 credits image count එකකට පරිවර්තනය කිරීමට පෙර issuer, unit, model ID, 4K deduction, failure/retry billing, expiry, refund, storage සහ training terms බලන්න. Formula: `attemptable 4K count = available credits ÷ credits per 4K generation`। එය deliverable count නොවේ.

## සැබෑ 4K තහවුරු කරන්න

`image_size` තුළ uppercase `4K` යවන්න; lowercase `4k` reject විය හැක. Model, aspect ratio සහ size record කර original file download කර pixel dimensions බලන්න. 16:9 4K `5504 × 3072`, square `4096 × 4096` විය හැක. Web preview හෝ විශාල canvas එක පමණක් සාක්ෂියක් නොවේ.

## GPT88 Unified Gateway

Mainland-China connectivity සහ controllable billing අවශ්‍ය නම් GPT88 gateway option එකකි. 1 CNY top-up = 1 CNY account balance; actual charge official usage × selected group multiplier මත රඳා පවතී. Exact pricing, model coverage, failure billing සහ 4K parameters gpt88.cc console තුළ බලන්න. Gateway official API එකේ replacement එකක් නොවේ; output pixel dimensions නැවත verify කරන්න.

## FAQ

### Nano Banana Pro official 4K API එක free ද?

නැත. 2026 ජූලි 20 පරීක්ෂාවේ Free Tier නොතිබුණි; උදාහරණ මිල `$0.24/image` පමණ විය.

### Nano Banana 2 4K ලබා දෙනවාද?

ඔව්. `gemini-3.1-flash-image` 4K support කරයි; උදාහරණ Standard price `$0.151/image` පමණය.

### 4K සඳහා Pro අවශ්‍යද?

නැත. දුෂ්කර instructions සහ professional assets සඳහා Pro evaluate කරන්න; 4K පමණක් ප්‍රමාණවත් හේතුවක් නොවේ.

### Prompt එකේ “4K” ලිවීම ප්‍රමාණවත්ද?

නැත. API request එකේ uppercase `image_size: "4K"` යවා output dimensions පරීක්ෂා කරන්න.
