---
title: Gemini 3.1 Flash Image Free Tier: Official API paid; AI Studio test-க்கு மட்டும்
description: gemini-3.1-flash-image official API free tier, AI Studio testing, current model ID மற்றும் Standard, Batch, Gemini Apps வேறுபாட்டைப் புரிந்துகொள்ளுங்கள்.
date: 2026-02-27
category: API மேம்பாடு
tags: [Gemini API, Image Generation, API Pricing, AI Studio]
readTime: 12
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

13 ஜூன் 2026 நிலவரப்படி `gemini-3.1-flash-image`-க்கு official Gemini Developer API-யில் Free Tier row இல்லை. AI Studio-வில் Nano Banana 2-ஐ browser-ல் சோதிக்கலாம்; ஆனால் அதனால் backend application-க்கு free production API quota நிரூபிக்கப்படாது. தற்போதைய model ID `gemini-3.1-flash-image`; பழைய tutorial-களின் `gemini-3.1-flash-image-preview` புதிய code contract அல்ல, migration அல்லது historical context மட்டுமே.

**Route answer:** browser test-க்கு AI Studio, synchronous backend-க்கு paid Developer API Standard, காத்திருக்கக்கூடிய batch-க்கு paid Batch. Gemini Apps consumer limits-ஐ API quota எனக் கருத வேண்டாம்.

## முடிவு முதலில்

| கேள்வி | தற்போதைய பதில் | சரிபார்க்கும் இடம் |
| --- | --- | --- |
| Official API free-ஆ? | இல்லை; Standard, Batch image rows-ல் Free Tier இல்லை | Google Gemini API pricing |
| AI Studio | Browser testing | AI Studio |
| Nano Banana 2 | `gemini-3.1-flash-image`-க்கு map ஆகிறது | Google image docs |
| Preview ID | புதிய code-க்கு வேண்டாம் | Google changelog |

## Access route முதலில் தேர்வு செய்யுங்கள்

AI Studio browser experiment-க்கு; Developer API Standard paid synchronous backend-க்கு; Batch paid asynchronous, குறைந்த விலை, ஆனால் free அல்ல; Gemini Apps personal consumer route; third-party gateway தனி contract. AI Studio-வில் image உருவாகிறது என்பதால் backend free quota என்று அர்த்தமில்லை.

## Official API pricing paid row

| Output | Standard API | Batch API |
| --- | ---: | ---: |
| 0.5K | $0.045 | $0.022 |
| 1K | $0.067 | $0.034 |
| 2K | $0.101 | $0.050 |
| 4K | $0.151 | $0.076 |

இவை budget தொடக்க மதிப்புகள்; நிரந்தர உறுதி அல்ல. Release அல்லது migration முன் model ID, price, billing row மீண்டும் சரிபார்க்கவும்.

## Current model ID பயன்படுத்துங்கள்

புதிய code-ல் `gemini-3.1-flash-image` பயன்படுத்துங்கள். `gemini-3.1-flash-image-preview` பழைய repository, migration notes அல்லது historical URL-களில் மட்டுமே இருக்கட்டும். Code, logs, allowlist, billing dashboard, tickets அனைத்திலும் ஒரே ID வைத்திருங்கள்.

## Go-live முன் real-time quota

API key/project வைத்த account-ல் AI Studio திறந்து அதே project-ஐத் தேர்வு செய்யுங்கள். Model ID உறுதி செய்து tier, RPM, TPM, RPD மற்றும் billing notes பதிவு செய்யுங்கள். Demo, launch, migration அல்லது traffic மாற்றத்திற்கு முன் மீண்டும் பாருங்கள்.

## AI Studio எப்போது போதுமானது

Prompt comparison, reference image test, Nano Banana 2 fit, internal design samples ஆகியவற்றுக்கு போதுமானது. User wait, retry, logging, billing, storage அல்லது go-live commitment வந்தவுடன் Developer API planning-க்கு மாறுங்கள். Gemini Apps consumer surface; அதன் limits API limits அல்ல.

## Engineering acceptance மற்றும் migration

Model ID, project, date, prompt set, output size ஆகியவற்றை record செய்யுங்கள். Samples-ஐ acceptable, needs-retry, unacceptable எனப் பிரிக்கவும். Standard மற்றும் Batch config-ஐப் பிரித்து logs-ல் project, model, tier, size, error பதிவு செய்யுங்கள். Preview migration-ல் “free API” என்பதற்கு பதில் AI Studio testing அல்லது official API without Free Tier என்று எழுதுங்கள். Batch சுலபமான paid async route; free அல்ல.

## FAQ

### Gemini 3.1 Flash Image-க்கு free API tier உள்ளதா?

இல்லை. 13 ஜூன் 2026 Google pricing சரிபார்ப்பில் Standard மற்றும் Batch image rows இரண்டிலும் Free Tier இல்லை.

### AI Studio free testing-க்கு பயன்படுமா?

ஆம், browser test route ஆக; free backend production API quota ஆக அல்ல.

### Nano Banana 2 அதே model-ஆ?

Google image docs படி current model ID `gemini-3.1-flash-image`.

### Preview model ID பயன்படுத்தலாமா?

புதிய code-ல் வேண்டாம்; பழைய examples மற்றும் migration context-க்கு மட்டும்.

### மலிவான Batch free-ஆ?

இல்லை. Waitable tasks-க்கு குறைந்த விலை paid async route.

### Exact quota எங்கே பார்க்கலாம்?

Current project-ன் AI Studio view-ல் model, tier, RPM, TPM, RPD மற்றும் billing notes பார்க்கவும்.
