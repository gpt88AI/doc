---
title: Gemini 3.1 Flash Image Free Tier: Official API paid ය, AI Studio test සඳහා පමණි
description: gemini-3.1-flash-image හි official API free tier, AI Studio testing, current model ID සහ Standard, Batch, Gemini Apps අතර වෙනස තේරුම් ගන්න.
date: 2026-02-27
category: API සංවර්ධනය
tags: [Gemini API, Image Generation, API Pricing, AI Studio]
readTime: 12
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

2026 ජූනි 13 වන දින පරීක්ෂාව අනුව `gemini-3.1-flash-image` සඳහා official Gemini Developer API හි Free Tier row එකක් නැත. AI Studio තුළ Nano Banana 2 browser එකෙන් පරීක්ෂා කළ හැකි නමුත් එයින් backend application එකකට free production API quota එකක් සනාථ නොවේ. වත්මන් model ID එක `gemini-3.1-flash-image` ය. පැරණි tutorials වල `gemini-3.1-flash-image-preview` නව code contract එකක් නොව migration හෝ historical context එකක් පමණි.

**Route answer:** browser test සඳහා AI Studio, synchronous backend සඳහා paid Developer API Standard, බලා සිටිය හැකි batch සඳහා paid Batch. Gemini Apps consumer limits API quota ලෙස නොසලකන්න.

## නිගමනය මුලින්

| ප්‍රශ්නය | වත්මන් පිළිතුර | පරීක්ෂා කරන ස්ථානය |
| --- | --- | --- |
| Official API free ද? | නැත; Standard සහ Batch image rows වල Free Tier නැත | Google Gemini API pricing |
| AI Studio | Browser testing | AI Studio |
| Nano Banana 2 | `gemini-3.1-flash-image` වෙත map වේ | Google image docs |
| Preview ID | නව code සඳහා නොවේ | Google changelog |

## Access route එක මුලින් තෝරන්න

AI Studio browser experiment සඳහාය; Developer API Standard paid synchronous backend සඳහාය; Batch paid asynchronous සහ අඩු මිල route එකක් නමුත් free නොවේ; Gemini Apps personal consumer route එකකි; third-party gateway එකට තමන්ගේ contract එකක් ඇත. AI Studio තුළ image එකක් සෑදීම backend free quota එකක් බවට සාක්ෂියක් නොවේ.

## Official API pricing paid row එකකි

| Output | Standard API | Batch API |
| --- | ---: | ---: |
| 0.5K | $0.045 | $0.022 |
| 1K | $0.067 | $0.034 |
| 2K | $0.101 | $0.050 |
| 4K | $0.151 | $0.076 |

මේවා budget ආරම්භක අගයන් මිස ස්ථිර පොරොන්දු නොවේ. Release, demo හෝ migration කිරීමට පෙර model ID, price සහ billing row නැවත පරීක්ෂා කරන්න.

## Current model ID භාවිත කරන්න

නව code තුළ `gemini-3.1-flash-image` භාවිත කරන්න. `gemini-3.1-flash-image-preview` පැරණි repository, migration notes හෝ historical URL සඳහා පමණක් තබන්න. Code, logs, allowlists, billing dashboard සහ tickets තුළ එකම ID භාවිත කරන්න.

## Go-live පෙර real-time quota පරීක්ෂා කරන්න

API key හෝ project එක අයිති account එකෙන් AI Studio විවෘත කර code භාවිත කරන project එකම තෝරන්න. Model ID තහවුරු කර tier, RPM, TPM, RPD සහ billing notes සටහන් කරන්න. Demo, launch, migration හෝ traffic වෙනස්කමකට පෙර නැවත බලන්න.

## AI Studio ප්‍රමාණවත් වන්නේ කවදාද

Prompt comparison, reference image test, Nano Banana 2 fit සහ internal design samples සඳහා එය ප්‍රමාණවත්ය. User wait, retry, logging, billing, storage හෝ go-live commitment ඇතුළත් වූ විට Developer API planning වෙත මාරු වන්න. Gemini Apps consumer surface එකකි; එහි limits API limits නොවේ.

## Engineering acceptance සහ migration

Model ID, project, date, prompt set සහ output size record කරන්න. Samples acceptable, needs-retry සහ unacceptable ලෙස වෙන් කරන්න. Standard සහ Batch config වෙන්ව තබා logs තුළ project, model, tier, size සහ error සටහන් කරන්න. Preview migration විට “free API” වෙනුවට AI Studio testing හෝ official API without Free Tier ලෙස ලියන්න. Batch යනු අඩු මිල paid async route එකකි, free නොවේ.

## FAQ

### Gemini 3.1 Flash Image සඳහා free API tier එකක් තිබේද?

නැත. 2026 ජූනි 13 Google pricing පරීක්ෂාවේ Standard සහ Batch image rows දෙකෙහිම Free Tier නොතිබුණි.

### AI Studio free testing සඳහා භාවිත කළ හැකිද?

ඔව්, browser test route එකක් ලෙස; free backend production API quota එකක් ලෙස නොවේ.

### Nano Banana 2 එකම model එකද?

Google image docs අනුව current model ID එක `gemini-3.1-flash-image` ය.

### Preview model ID භාවිත කළ යුතුද?

නව code තුළ නොවේ; පැරණි examples සහ migration context සඳහා පමණි.

### අඩු මිල Batch එක free ද?

නැත. එය waitable tasks සඳහා lower-priced paid async route එකකි.

### Exact quota බලන්නේ කොහේද?

Current project එකේ AI Studio view තුළ model, tier, RPM, TPM, RPD සහ billing notes බලන්න.
