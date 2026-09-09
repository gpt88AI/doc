---
title: Gemini API Free Tier Limits (2026): Project quota, API keys සහ paid boundary
description: Gemini API free tier තේරුම් ගැනීමේ මාර්ගෝපදේශය: model Free Tier status, project quota, API key ownership, AI Studio RPM/TPM/RPD සහ paid project සීමාව.
date: 2026-04-25
category: API සංවර්ධනය
tags: [Gemini API, Free Tier, Rate Limits, AI Studio, Google AI]
readTime: 12
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

Gemini API free tier එක ස්ථිර public number එකක් නොවේ. සැබෑ capacity එක Google Cloud project, model, usage tier, region, billing status සහ current policy මත රඳා පවතී. 2026 ජූලි 16 දින නිවැරදි ක්‍රමය: official pricing page එකේ exact model/feature Free Tier බලන්න; පසුව AI Studio හි key එක සාදන exact project එකේ RPM, TPM, RPD, reset rules සහ usage බලන්න. එකම project එකේ keys ගණන වැඩි කළත් quota වැඩි නොවේ; key credential එකකි, quota/billing project එකේය.

## වෙනම ප්‍රශ්න තුන

Exact model/feature free ද යන්න pricing page එකෙන් බලන්න. Rate limits RPM, TPM, RPD සහ image lines සඳහා IPM විය හැක. Project එක දැන් කොපමණ භාවිතා කළ හැකිද යන්න AI Studio project view එකෙන් බලන්න. **Model free status, project live quota සහ billing status වෙන වෙනම surfaces වේ.**

## API key quota pool එකක් නොවේ

එකම project හි Key A/B/C එකම quota එක share කරයි. 429 විට same-project key එකක් අලුතින් සෑදීම සාමාන්‍යයෙන් විසඳුමක් නොවේ. Keys rotation/security සඳහා භාවිතා කරන්න, quota වැඩි කිරීමට නොවේ. Account, Cloud project, billing, exact model ID සහ AI Studio project context verify කරන්න. Auth migration quota වැඩි නොකරයි; නව keys auth key default කළ හැක.

## Free Tier භාවිතය

Learning, prompt validation, synthetic-data prototype සහ occasional internal tools සඳහා සුදුසුය. Real users, sensitive/commercial data, stable throughput, frequent 429 හෝ paid-only model සඳහා billed project භාවිතා කරන්න. Model family name එකෙන් free status අනුමාන නොකරන්න; text line free වුවත් image line paid විය හැක. Exact model ID සහ Standard/Batch/Flex/Priority line current pricing සහ project view මඟින් පරීක්ෂා කරන්න. Free-trial credits Gemini API සඳහා ස්වයංක්‍රීයව යෙදේ යැයි නොසිතන්න; billing පසු plan, balance, auto-recharge සහ alerts monitor කරන්න.

## Live quota පරීක්ෂාව

1. Key manager account එකෙන් AI Studio විවෘත කරන්න.
2. App භාවිතා කරන exact project තෝරන්න.
3. Usage/rate-limit view විවෘත කරන්න.
4. Model ID තහවුරු කරන්න.
5. RPM, TPM, RPD, reset, tier සහ billing status record කරන්න.
6. Release, demo, migration සහ traffic change පෙර නැවත පරීක්ෂා කරන්න.

Project/account, key type, model/execution line, live values/date, billing plan/balance owner සහ backoff/cache/fallback strategy release record එකේ ලියන්න.

## 429 හෝ `RESOURCE_EXHAUSTED`

Project සහ model/API surface verify කරන්න; RPM/TPM/RPD වෙන වෙනම බලන්න; concurrency අඩු කර exponential backoff භාවිතා කරන්න; prompt කෙටි කර repeated result cache කරන්න; normal traffic cap නම් paid project එකකට යන්න. Wrong project/model, region, billing, spend limit හෝ temporary capacity හේතුවක් විය හැක. Same-project keys මඟින් bypass නොකරන්න.

## අවසාන තීරණය සහ FAQ

Free tier එක promise එකක් නොව measurement surface එකක් ලෙස සලකන්න. Low-frequency, non-sensitive, retryable load live limits තුළ නම් තබාගන්න. Stable throughput, frequent 429, paid-only model, privacy/compliance හෝ user-facing failure තිබේ නම් paid project තෝරන්න. Exact quota AI Studio project view එකෙන් ගන්න; nickname එකෙන් “Gemini 3 free” කියන්න එපා. Key migration auth continuity සඳහාය, quota වැඩි කිරීමට නොවේ.

## Further Reading

- [Billing Units](/docs/guides/billing-units/)
