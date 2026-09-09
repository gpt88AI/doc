---
title: Gemini API Free Tier Limits (2026): Project quota, API keys மற்றும் paid boundary
description: Gemini API free tier-ஐ புரிந்து கொள்ளும் வழிகாட்டி: model Free Tier status, project quota, API key ownership, AI Studio RPM/TPM/RPD மற்றும் paid project எல்லை.
date: 2026-04-25
category: API மேம்பாடு
tags: [Gemini API, Free Tier, Rate Limits, AI Studio, Google AI]
readTime: 12
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

Gemini API free tier ஒரு நிலையான public number அல்ல. உண்மையான capacity Google Cloud project, model, usage tier, region, billing status மற்றும் current policy-ஐ சார்ந்தது. 16 ஜூலை 2026-ல் சரியான நடைமுறை: official pricing page-ல் exact model/feature Free Tier பார்க்கவும்; பின்னர் AI Studio-யில் அதே project-ன் RPM, TPM, RPD, reset rules மற்றும் usage பார்க்கவும். ஒரே project-ல் பல keys உருவாக்கினாலும் quota அதிகரிக்காது; key credential, project quota/billing owner.

## மூன்று வேறு கேள்விகள்

Exact model/feature free-ஆ? pricing page பதில். Rate limits என்ன? RPM, TPM, RPD; சில image lines-ல் IPM. இந்த project இப்போது எவ்வளவு பயன்படுத்தலாம்? AI Studio project view. **Model free status, project live quota, billing status தனித்தனி surfaces.**

## API key quota pool அல்ல

API key authentication credential மட்டுமே; தனி free bucket அல்ல. ஒரே project-ன் Key A/B/C ஒரே quota-வைப் பகிரும். 429 வந்தால் புதிய same-project key உருவாக்குவது தீர்வு அல்ல. Key rotation/security-க்கு keys பயன்படுத்தவும். Account, Cloud project, billing, exact model ID மற்றும் AI Studio project context சரிபார்க்கவும். Auth migration quota அதிகரிக்காது; புதிய keys auth keys default செய்யலாம்.

## Free Tier பயன்பாடு

Learning, prompt validation, synthetic-data prototype மற்றும் occasional internal tools-க்கு பொருத்தமானது. Real users, sensitive/commercial data, stable throughput, frequent 429 அல்லது paid-only model-க்கு billed project பயன்படுத்தவும். Model family name பார்த்து free status ஊகிக்க வேண்டாம்; text line free, image line paid ஆகலாம். Exact model ID மற்றும் Standard/Batch/Flex/Priority current pricing மூலம் verify செய்யவும். Cloud free-trial credits Gemini API-க்கு தானாக பொருந்தும் என நினைக்க வேண்டாம்; billing பின் plan, balance, auto-recharge, alerts கண்காணிக்கவும்.

## Live quota check

1. Key manager account மூலம் AI Studio திறக்கவும்.
2. App பயன்படுத்தும் exact project தேர்வு செய்யவும்.
3. Usage/rate-limit view திறக்கவும்.
4. Model ID உறுதி செய்யவும்.
5. RPM, TPM, RPD, reset, tier, billing status பதிவு செய்யவும்.
6. Release/demo/migration/traffic change முன் மீண்டும் சரிபார்க்கவும்.

Record-ல் project/account, key type, model/execution line, live values/date, billing plan/balance owner மற்றும் backoff/cache/fallback strategy எழுதவும்.

## 429 அல்லது `RESOURCE_EXHAUSTED`

Project, model/API surface மற்றும் RPM/TPM/RPD தனித்தனியாகச் சரிபார்க்கவும்; concurrency குறைத்து exponential backoff பயன்படுத்தவும்; prompt சுருக்கி repeated result cache செய்யவும்; normal traffic cap என்றால் paid project-க்கு செல்லவும். Wrong project/model, region, billing, spend limit அல்லது temporary capacity காரணமாக இருக்கலாம். Same-project keys மூலம் bypass செய்ய வேண்டாம்.

## முடிவு மற்றும் FAQ

Free tier-ஐ promise அல்ல, measurement surface எனப் பாருங்கள். Low-frequency, non-sensitive, retryable load live limits-ல் இருந்தால் தொடரலாம். Stable throughput, frequent 429, paid-only model, privacy/compliance அல்லது user-facing failure இருந்தால் paid project தேர்வு செய்யவும். Exact quota AI Studio project view-ல்; model nickname மூலம் “Gemini 3 free” என்று சொல்ல வேண்டாம். Key migration auth continuity; quota increase அல்ல.

## Further Reading

- [Billing Units](/docs/guides/billing-units/)
