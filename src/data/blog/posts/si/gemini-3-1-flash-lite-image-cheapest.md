---
title: Gemini 3.1 Flash Lite Image API: අඩුම මිල route එක — Google pricing සහ GPT88 Gateway
description: gemini-3.1-flash-lite-image හි Google Standard සහ Batch pricing, GPT88 Nano Banana Standard route සහ text-only gemini-3.1-flash-lite හි සීමාව වෙන වෙනම තේරුම් ගන්න.
date: 2026-07-01
category: මොඩල් සංසන්දනය
tags: [Gemini 3.1 Flash Lite Image, Nano Banana Lite, API Pricing, GPT88, Image Generation]
readTime: 14
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

“අඩුම මිල කුමක්ද?” යන ප්‍රශ්නයට පිළිතුර route එක මත රඳා පවතී. 2026 ජූලි 10 පරීක්ෂාවේ Google official අඩුම unit price එක Batch සඳහා විය: 1K output image එකකට ආසන්න වශයෙන් `$0.0168`; official realtime Standard ආසන්න වශයෙන් `$0.0336` විය. GPT88 Gateway හි Nano Banana Standard route එක official Standard එකට වඩා අඩු විය හැකි නමුත් එය Google Flash Lite Image price එක නොවන අතර `gemini-2.5-flash-image` වෙත map වේ.

Billing owners තුනක් වෙනස්ය: Google realtime, Google async සහ GPT88 gateway. Model ID, billing owner සහ delivery mode එකට මිශ්‍ර කළහොත් budget සහ code documentation වැරදි වේ. `gemini-3.1-flash-lite` හි `image` suffix එකක් නැත; එය text-output model එකක් බැවින් image budget සඳහා භාවිත නොකරන්න.

| Route | ඇත්තටම ලැබෙන්නේ | භාවිත කළ යුතු විට |
| --- | --- | --- |
| Google Standard | `gemini-3.1-flash-lite-image` paid sync call, 1K සඳහා ~$0.0336 | User ක්ෂණික ප්‍රතිඵලයක් බලා සිටින විට |
| Google Batch | එම model එකේ paid async call, 1K සඳහා ~$0.0168 | Queueable, offline හෝ nightly batch |
| GPT88 Gateway | Gateway-owned Nano Banana Standard / `gemini-2.5-flash-image` | Gateway billing සහ වෙනස් model ID පිළිගත හැකි විට |

## මිල තුන එකම bill එකක් නොවේ

Official async route තුළ Google Batch අඩුය; official realtime සඳහා Google Standard; gateway low-price route සඳහා GPT88 Nano Banana Standard. Free Tier, quota සහ rates launch කිරීමට පෙර අදාළ pricing page හෝ console එකේ නැවත බලන්න.

## Google official අඩුම route එක Batch ය

`gemini-3.1-flash-lite-image` Nano Banana Lite image model එකකි. එය text/image input, image/text output, generation/editing සහ 1K output සඳහා optimized වේ. පරීක්ෂා කළ අගයන් අනුව Standard ආසන්න වශයෙන් `$0.0336` සහ Batch `$0.0168` per 1K output image විය. Batch අඩු වන්නේ async delivery නිසාය. Prompt tokens, reference images සහ retries සම්පූර්ණ bill එක වෙනස් කළ හැක.

## GPT88 Gateway low-price route හි සීමාව

GPT88 route එක Google official Flash Lite Image price ලෙස නොලියන්න. එය `gemini-2.5-flash-image` මත පදනම් වූ Nano Banana Standard route එකකි; actual charge gpt88.cc console, group multiplier සහ call logs තුළ පරීක්ෂා කරන්න. Standard 1K generation/editing සහ gateway billing පිළිගත හැකි නම් test කරන්න. Exact Google model හෝ first-party procurement අවශ්‍ය නම් මෙය සුදුසු නොවේ.

## Flash-Lite, Flash Lite Image සහ Nano Banana Standard මිශ්‍ර නොකරන්න

`gemini-3.1-flash-lite-image` official image model එකකි; `gemini-3.1-flash-lite` text-only ය; Nano Banana Standard gateway route එකකි; Nano Banana 2 වෙනම සහ වැඩි මිල image tier එකකි. Logs තුළ text-only ID එකක් පෙනේ නම් image budget එක නවත්වන්න.

## Lowest number නොව workload අනුව තෝරන්න

Interactive feature සඳහා Google Standard, batch variants සඳහා Google Batch, low-cost gateway evaluation සඳහා GPT88 Nano Banana Standard සහ strict official procurement සඳහා Google route පළමුව test කරන්න. Visual quality සඳහා වෙනම same-prompt matrix එකක් තබන්න.

## Launch පෙර same-prompt test

Production වැනි prompt සහ reference image එකක් භාවිත කර Google Standard, async හැකි නම් Google Batch සහ gateway පිළිගත හැකි නම් GPT88 route සමානව test කරන්න. Generated/accepted images, latency, retries සහ actual charges සටහන් කරන්න. Attempted call එකකට නොව accepted image එකකට cost සසඳන්න.

## කරුණු හයක නැවත-පරීක්ෂාව

Official model ID, Google price row, Free Tier status, gateway model ID, gateway console price සහ accepted-image rate පරීක්ෂා කරන්න. එක row එකක්වත් නොගැළපේ නම් internal docs තුළ prices මිශ්‍ර නොකරන්න.

## GPT88 Gateway නිර්දේශ කරන විට

Standard 1K ප්‍රමාණවත්, gateway billing/logs පිළිගත හැකි, console rate budget එකට ගැළපෙන සහ Google Standard realtime route සමඟ සංසන්දනය කරන විට භාවිත කළ හැක. Exact model ID, first-party billing/support, official Batch, privacy හෝ compliance අවශ්‍ය නම් Google official route තෝරන්න.

## FAQ

### GPT88 route එක Google official price එකද?

නැත. එය Nano Banana Standard / `gemini-2.5-flash-image` gateway route එකකි.

### Official අඩුම price එක කුමක්ද?

2026 ජූලි 10 පරීක්ෂාවේ Google Batch per 1K output image ආසන්න වශයෙන් `$0.0168` විය.

### Official realtime price එක කුමක්ද?

Google Standard per 1K output image ආසන්න වශයෙන් `$0.0336` විය.

### `gemini-3.1-flash-lite` image සාදයිද?

නැත. එය text-output model එකකි.

### Google Batch ද GPT88 gateway ද?

Official billing සහ async පිළිගත හැකි නම් Google Batch; Nano Banana Standard සහ gateway billing පිළිගත හැකි නම් console verify කර GPT88 test කරන්න.

### Nano Banana 2 low-price route එකද?

නැත. එය වෙනම higher-priced tier එකකි; low-price tier එක Nano Banana Standard ය.
