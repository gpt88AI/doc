---
title: Gemini 3 Pro Image API Quota Limits: Tier සංසන්දනය, 429 විසඳුම් සහ cost optimization
description: Gemini 3 Pro Image API හි RPM/TPM/RPD/IPM quota, Tier සංසන්දනය, 429 RESOURCE_EXHAUSTED diagnosis, exponential backoff සහ Batch/high-concurrency architecture තේරුම් ගන්න.
date: 2026-01-14
category: API සංවර්ධනය
tags: [Gemini API, API Quota Management, Image Generation, Rate Limits, Google AI]
readTime: 18
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

Gemini 3 Pro Image හි quota limits production හි ප්‍රධාන අභියෝගයකි. 2025 දෙසැම්බර් වෙනස්කම්වලින් පසු පැරණි free-tier assumptions මත ධාවනය වූ apps හදිසියේ 429 ලබාගත හැක. Nano Banana Pro ලෙසද හැඳින්වෙන මෙම model එක 4K output ලබා දෙන නමුත් official API free quota ඇතැයි නොසිතන්න. Quota dynamic තොරතුරුය; budget හෝ launch කිරීමට පෙර official rate-limits page නැවත බලන්න.

## Quota dimensions හතර

- **RPM:** මිනිත්තුවකට requests; 1K සහ 4K දෙකම එක් request එකකි.
- **TPM:** prompt, reference images සහ resolution අනුව compute; 1K/2K ආසන්න වශයෙන් 1,120 tokens, 4K 2,000 tokens විය හැක.
- **RPD:** දිනකට requests; Pacific midnight හි reset විය හැක.
- **IPM:** මිනිත්තුවකට images; RPM ඉතිරි වුවත් IPM අවසන් නම් 429 ලැබේ।

Quota project level එකේ ක්‍රියාත්මක වේ, API key level එකේ නොවේ. එකම project එකේ keys ගණනාවක් සෑදීමෙන් pool එක වැඩි නොවේ. Tier upgrade හෝ නව project එකක් අවශ්‍යය.

## Tier සංසන්දනය

Gemini 3 Pro Image සඳහා API Free Tier ඇතැයි නොසිතන්න; consumer Gemini app හි 2 images/day සීමාව API quota එකක් නොවේ.

| Tier | සාමාන්‍ය කොන්දේසිය | Gemini 3 Pro Image උදාහරණය |
| --- | --- | --- |
| Free | model-specific limits | මෙම image model සඳහා API Free Tier නැතැයි සැලසුම් කරන්න |
| Tier 1 | Cloud Billing enable | 100 RPM, 1,000 RPD, 10 IPM |
| Tier 2 | සுமார் $250 spend සහ දින 30 | 500 RPM, 5,000 RPD, 20 IPM |
| Tier 3 | සுமார் $1,000 spend සහ දින 30 | 1,000 RPM, unlimited RPD, 100 IPM |

මේවා historical/example values වේ; current project, model සහ tier හි official table බලන්න.

## Model සහ pricing

1K, 2K සහ 4K output support කරයි. උදාහරණ official price: 1K/2K image එකකට ආසන්න වශයෙන් `$0.134`, 4K `$0.240`; Batch 50% පමණ අඩු විය හැක. Input, retries සහ channel සම්පූර්ණ bill එක වෙනස් කළ හැක.

## 429 RESOURCE_EXHAUSTED diagnosis

RPM හි burst පසු recovery, TPM හි දිගු prompt/high resolution සම්බන්ධතාව, RPD හි දවස ගතවෙද්දී errors වැඩිවීම, IPM හි image requests පමණක් fail වීම සාමාන්‍ය patterns වේ. Dimension හඳුනා නොගෙන retry නොකරන්න.

## Exponential backoff

429 සඳහා exponential backoff සහ jitter භාවිත කරන්න. Delay වැඩි කර maximum cap එකක් තබා retries සීමා කරන්න. Retry පහකට පසු queue, අඩු resolution, Batch හෝ fallback route තෝරන්න. Blind retry quota සහ cost වැඩි කරයි.

## Tier upgrade සහ cost optimization

Cloud Billing bind කිරීම Tier 1 හි සාමාන්‍ය ආරම්භයයි. Tier 2/3 spend සහ account age මත රඳා පවතී. Resolution, prompt, reference input අඩු කරන්න; duplicate requests cache, idempotency සහ async Batch භාවිත කරන්න. Cost per accepted image record කරන්න.

## High-concurrency architecture

Request queue, token-bucket limiter, per-project quota monitor, retry queue සහ dead-letter queue තබන්න. Projects කිහිපයකින් quota වෙන් කළ හැකි නමුත් billing සහ policy වගකීම වැඩි වේ. Official API සහ Gateway dual channel ලෙස තබා model ID, cost, errors සහ fallback වෙන්ව log කරන්න.

## Gateway සීමාව

Gateway access, local payment, logs සහ support පහසු කළ හැකි නමුත් Google official quota හෝ pricing හි source නොවේ. Console/logs තුළ route, billing unit, concurrency, failure charge සහ no-image response පරීක්ෂා කරන්න. Evidence නොමැතිව “unlimited” හෝ “always stable” නොලියන්න.

## FAQ

### Quota reset වන්නේ කවදාද?

Dimension අනුව වෙනස් වේ; RPD Pacific midnight හි reset විය හැක. Current console සහ official docs බලන්න.

### API keys ගණනාවක් quota වැඩි කරයිද?

නැත. එකම project හි keys එකම quota pool එක බෙදා ගනී.

### 429 පසු retry පමණක් ප්‍රමාණවත්ද?

නැත. RPM/TPM/RPD/IPM හඳුනාගෙන backoff, queue, resolution හෝ route වෙනස් කරන්න.

### Consumer app free images API තුළ භාවිත කළ හැකිද?

නැත. Consumer සහ Developer API quotas වෙනස්ය.

### Batch අඩු මිලද?

Async පිළිගත හැකි නම් cost අඩු විය හැක; realtime response සඳහා replacement නොවේ.

### Production පෙර පරීක්ෂා කළ යුත්තේ?

Current model ID, pricing, tier, RPM/TPM/RPD/IPM, retry cost, logs, fallback සහ accepted-output rate.
