---
title: Gemini 3 Pro Image API Quota Limits: Tier तुलना, 429 समाधान र cost optimization
description: Gemini 3 Pro Image API का RPM/TPM/RPD/IPM quota, Tier तुलना, 429 RESOURCE_EXHAUSTED diagnosis, exponential backoff तथा Batch/high-concurrency architecture बुझ्नुहोस्।
date: 2026-01-14
category: API विकास
tags: [Gemini API, API Quota Management, Image Generation, Rate Limits, Google AI]
readTime: 18
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

Gemini 3 Pro Image मा quota limits production को मुख्य चुनौती हो। डिसेम्बर 2025 पछि पुराना free-tier assumptions मा चलिरहेका apps ले अचानक 429 दिन सक्छन्। Nano Banana Pro भनेर चिनिने यो model ले 4K output दिन्छ, तर official API free quota छ भनेर नमान्नुहोस्। Quota dynamic जानकारी हो; budget वा launch अघि official rate-limits page फेरि जाँच्नुहोस्।

## चार quota dimensions

- **RPM:** प्रति minute requests; 1K र 4K दुवै एक request।
- **TPM:** prompt, reference image र resolution को compute; 1K/2K करिब 1,120 tokens, 4K करिब 2,000 tokens हुन सक्छ।
- **RPD:** दैनिक requests; Pacific midnight मा reset हुन सक्छ।
- **IPM:** प्रति minute images; RPM बाँकी भए पनि IPM सकिए 429 आउँछ।

Quota project level मा लागू हुन्छ, API key level मा होइन। एउटै project मा धेरै key बनाउँदा pool बढ्दैन। Tier upgrade वा नयाँ project नै वास्तविक उपाय हो।

## Tier तुलना

Gemini 3 Pro Image का लागि API Free Tier नमान्नुहोस्; consumer Gemini app को 2 images/day सीमा API quota होइन।

| Tier | सामान्य शर्त | Gemini 3 Pro Image उदाहरण |
| --- | --- | --- |
| Free | model-specific limits | यस image model का लागि API Free Tier छैन भनेर योजना बनाउनुहोस् |
| Tier 1 | Cloud Billing enable | 100 RPM, 1,000 RPD, 10 IPM |
| Tier 2 | करिब $250 spend र 30 दिन | 500 RPM, 5,000 RPD, 20 IPM |
| Tier 3 | करिब $1,000 spend र 30 दिन | 1,000 RPM, unlimited RPD, 100 IPM |

यी historical/example values हुन्; current project, model र tier को official table हेर्नुहोस्।

## Model र pricing

Model ले 1K, 2K र 4K output support गर्छ। उदाहरण official price: 1K/2K करिब `$0.134` प्रति image, 4K करिब `$0.240`; Batch करिब 50% सस्तो हुन सक्छ। Input, retries र channel ले कुल bill बदल्न सक्छ।

## 429 RESOURCE_EXHAUSTED diagnosis

RPM मा burst पछि recovery, TPM मा लामो prompt/high resolution को सम्बन्ध, RPD मा दिन बढ्दै जाँदा errors, र IPM मा image request मात्र fail हुनु सामान्य pattern हुन्। Dimension नचिनी retry नगर्नुहोस्।

## Exponential backoff

429 का लागि exponential backoff र jitter प्रयोग गर्नुहोस्। Delay बढाउनुहोस्, maximum cap राख्नुहोस् र retry सीमित गर्नुहोस्। पाँच retry पछि queue, कम resolution, Batch वा fallback route रोज्नुहोस्। Blind retry ले quota र cost दुवै बढाउँछ।

## Tier upgrade र cost optimization

Cloud Billing bind गर्नु Tier 1 को सामान्य प्रवेश हो। Tier 2/3 spend र account age मा निर्भर हुन सक्छ। Resolution, prompt र reference input घटाउनुहोस्; duplicate request cache, idempotency र async Batch प्रयोग गर्नुहोस्। Cost per accepted image record गर्नुहोस्।

## High-concurrency architecture

Request queue, token-bucket limiter, per-project quota monitor, retry queue र dead-letter queue राख्नुहोस्। धेरै project ले quota छुट्याउन सक्छन्, तर billing र policy जिम्मेवारी पनि बढ्छ। Official API र Gateway लाई dual channel जस्तो राखेर model ID, cost, errors र fallback अलग log गर्नुहोस्।

## Gateway को सीमा

Gateway ले access, local payment, logs र support सजिलो बनाउन सक्छ, तर Google official quota वा pricing को source होइन। Console/logs मा route, billing unit, concurrency, failure charge र no-image response verify गर्नुहोस्। Evidence बिना “unlimited” वा “always stable” नलेख्नुहोस्।

## FAQ

### Quota कहिले reset हुन्छ?

Dimension अनुसार फरक हुन्छ; RPD Pacific midnight मा reset हुन सक्छ। Current console र official docs हेर्नुहोस्।

### धेरै API key ले quota बढाउँछ?

बढाउँदैन। एउटै project का keys ले एउटै quota pool साझा गर्छन्।

### 429 आएपछि केवल retry गर्ने?

होइन। RPM/TPM/RPD/IPM पहिचान गरेर backoff, queue, resolution वा route बदल्नुहोस्।

### Consumer app का free images API मा प्रयोग गर्न मिल्छ?

मिल्दैन। Consumer र Developer API quota अलग हुन्छन्।

### Batch सस्तो हुन्छ?

Async स्वीकार्य भए cost घट्न सक्छ, तर realtime response को replacement होइन।

### Production अघि के जाँच्ने?

Current model ID, pricing, tier, RPM/TPM/RPD/IPM, retry cost, logs, fallback र accepted-output rate।
