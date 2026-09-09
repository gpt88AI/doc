---
title: Gemini 3 Pro Image API Quota Limits: Tier ஒப்பீடு, 429 தீர்வு மற்றும் cost optimization
description: Gemini 3 Pro Image API-ன் RPM/TPM/RPD/IPM quota, Tier comparison, 429 RESOURCE_EXHAUSTED diagnosis, exponential backoff மற்றும் Batch/high-concurrency architecture-ஐப் புரிந்துகொள்ளுங்கள்.
date: 2026-01-14
category: API மேம்பாடு
tags: [Gemini API, API Quota Management, Image Generation, Rate Limits, Google AI]
readTime: 18
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

Gemini 3 Pro Image-ல் quota limits production-ன் முக்கிய சவால். டிசம்பர் 2025 மாற்றங்களுக்குப் பிறகு பழைய free-tier assumptions-ஐ நம்பிய apps திடீரென 429 பெறலாம். Nano Banana Pro என்றும் அழைக்கப்படும் இந்த model 4K output தருகிறது; ஆனால் official API free quota உள்ளது என்று கருத வேண்டாம். Quota dynamic தகவல்; budget அல்லது launch முன் official rate-limits page-ஐ மீண்டும் சரிபார்க்கவும்.

## நான்கு quota dimensions

- **RPM:** நிமிடத்திற்கான requests; 1K, 4K இரண்டும் ஒரு request.
- **TPM:** prompt, reference images, resolution சார்ந்த compute; 1K/2K சுமார் 1,120 tokens, 4K சுமார் 2,000 tokens ஆகலாம்.
- **RPD:** தினசரி requests; Pacific midnight-ல் reset ஆகலாம்.
- **IPM:** நிமிடத்திற்கான images; RPM மீதம் இருந்தாலும் IPM முடிந்தால் 429 வரும்.

Quota project level-ல் அமலும், API key level-ல் அல்ல. ஒரே project-ல் பல keys உருவாக்கினால் pool அதிகரிக்காது. Tier upgrade அல்லது புதிய project தேவை.

## Tier comparison

Gemini 3 Pro Image-க்கு API Free Tier இருப்பதாகக் கருத வேண்டாம்; consumer Gemini app-ன் 2 images/day limit API quota அல்ல.

| Tier | பொதுவான நிபந்தனை | Gemini 3 Pro Image உதாரணம் |
| --- | --- | --- |
| Free | model-specific limits | இந்த image model-க்கு API Free Tier இல்லை எனத் திட்டமிடுங்கள் |
| Tier 1 | Cloud Billing enable | 100 RPM, 1,000 RPD, 10 IPM |
| Tier 2 | சுமார் $250 spend மற்றும் 30 நாட்கள் | 500 RPM, 5,000 RPD, 20 IPM |
| Tier 3 | சுமார் $1,000 spend மற்றும் 30 நாட்கள் | 1,000 RPM, unlimited RPD, 100 IPM |

இவை historical/example values; current project, model, tier official table-ஐப் பாருங்கள்.

## Model மற்றும் pricing

1K, 2K, 4K output ஆதரிக்கிறது. உதாரண official price: 1K/2K சுமார் `$0.134`/image, 4K சுமார் `$0.240`; Batch சுமார் 50% குறையலாம். Input, retries, channel முழு bill-ஐ மாற்றலாம்.

## 429 RESOURCE_EXHAUSTED diagnosis

RPM-ல் burst பின் recovery, TPM-ல் நீளமான prompt/high resolution தொடர்பு, RPD-ல் நாளின் பிற்பகுதியில் errors, IPM-ல் image requests மட்டும் fail ஆகும். Dimension கண்டறியாமல் retry செய்ய வேண்டாம்.

## Exponential backoff

429-க்கு exponential backoff மற்றும் jitter பயன்படுத்துங்கள். Delay உயர்த்தி maximum cap வையுங்கள்; retries வரம்பில் இருக்கட்டும். ஐந்து retries பின்பும் fail என்றால் queue, குறைந்த resolution, Batch அல்லது fallback route தேர்வு செய்யுங்கள். Blind retry quota மற்றும் cost அதிகரிக்கும்.

## Tier upgrade மற்றும் cost optimization

Cloud Billing bind செய்வது Tier 1-ன் பொதுவான நுழைவு. Tier 2/3 spend மற்றும் account age-ஐப் பொறுத்தது. Resolution, prompt, reference input குறைக்கவும்; duplicate request cache, idempotency, async Batch பயன்படுத்தவும். Cost per accepted image பதிவு செய்யுங்கள்.

## High-concurrency architecture

Request queue, token-bucket limiter, per-project quota monitor, retry queue, dead-letter queue அமைக்கவும். பல projects quota பிரிக்கலாம், ஆனால் billing/policy பொறுப்பு கூடும். Official API மற்றும் Gateway-ஐ dual channel போல வைத்து model ID, cost, errors, fallback தனித்தனியாக log செய்யுங்கள்.

## Gateway வரம்பு

Gateway access, local payment, logs, support எளிதாக்கலாம்; Google official quota அல்லது pricing-ன் source அல்ல. Console/logs-ல் route, billing unit, concurrency, failure charge, no-image response சரிபார்க்கவும். Evidence இல்லாமல் “unlimited” அல்லது “always stable” எழுத வேண்டாம்.

## FAQ

### Quota எப்போது reset ஆகும்?

Dimension அடிப்படையில் மாறும்; RPD Pacific midnight-ல் reset ஆகலாம். Current console மற்றும் official docs பார்க்கவும்.

### பல API keys quota அதிகரிக்குமா?

இல்லை. ஒரே project-ன் keys ஒரே quota pool பகிரும்.

### 429 வந்தால் retry மட்டும் போதுமா?

இல்லை. RPM/TPM/RPD/IPM கண்டறிந்து backoff, queue, resolution அல்லது route மாற்றவும்.

### Consumer app free images API-ல் பயன்படுத்தலாமா?

இல்லை. Consumer மற்றும் Developer API quotas வேறுபடும்.

### Batch குறைந்த விலையா?

Async ஏற்றுக்கொள்ளப்பட்டால் cost குறையலாம்; realtime response-க்கு replacement அல்ல.

### Production முன் என்ன பார்க்க வேண்டும்?

Current model ID, pricing, tier, RPM/TPM/RPD/IPM, retry cost, logs, fallback மற்றும் accepted-output rate.
