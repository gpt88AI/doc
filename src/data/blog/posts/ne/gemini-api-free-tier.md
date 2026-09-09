---
title: Gemini API Free Tier Limits (2026): Project quota, API keys र paid boundary
description: Gemini API free tier बुझ्ने गाइड: model Free Tier status, project quota, API key ownership, AI Studio RPM/TPM/RPD र paid project सीमा।
date: 2026-04-25
category: API विकास
tags: [Gemini API, Free Tier, Rate Limits, AI Studio, Google AI]
readTime: 12
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

Gemini API free tier एउटा स्थिर public number होइन। वास्तविक capacity Google Cloud project, model, usage tier, region, billing status र current policy मा निर्भर हुन्छ। 16 जुलाई 2026 मा सुरक्षित प्रक्रिया: official pricing page मा exact model/feature को Free Tier हेर्नुहोस्; त्यसपछि AI Studio मा key बनाउने exact project खोलेर RPM, TPM, RPD, reset rules र usage हेर्नुहोस्। एउटै project मा धेरै keys बनाएर quota बढ्दैन; key credential हो, quota र billing project को हो।

## तीन अलग प्रश्न

Exact model/feature free छ कि छैन pricing page ले बताउँछ। Rate limits RPM, TPM, RPD र image line मा IPM हुन सक्छ। Project अहिले कति चल्न सक्छ भन्ने operational उत्तर AI Studio project view मा हुन्छ। **Model free status, project live quota र billing status अलग surfaces हुन्।**

## API key quota pool होइन

एउटै project का Key A/B/C ले एउटै quota share गर्छन्। 429 आएर नयाँ same-project key बनाउनु सामान्यतः समाधान होइन। Key rotation/security का लागि key उपयोगी छ, quota बढाउन होइन। Account, Cloud project, billing, exact model ID र AI Studio project context verify गर्नुहोस्। Auth migration ले quota बढाउँदैन; नयाँ keys auth key default गर्न सक्छन्।

## Free Tier र live quota

Learning, prompt validation, synthetic-data prototype र occasional internal tools का लागि Free Tier ठीक छ। Real users, sensitive/commercial data, stable throughput, frequent 429 वा paid-only model भए billed project प्रयोग गर्नुहोस्। Model family name बाट free status ननिष्कर्ष निकाल्नुहोस्; text line free तर image line paid हुन सक्छ। Exact model ID र Standard/Batch/Flex/Priority line current pricing र project view बाट जाँच्नुहोस्। Free-trial credits Gemini API मा स्वतः लाग्छन् भनेर नमान्नुहोस्; billing पछि balance, plan, auto-recharge र alerts monitor गर्नुहोस्।

## Quota जाँच्ने चरण

1. Key manager account बाट AI Studio खोल्नुहोस्।
2. App ले प्रयोग गर्ने exact project छान्नुहोस्।
3. Usage/rate-limit view खोल्नुहोस्।
4. Model ID confirm गर्नुहोस्।
5. RPM, TPM, RPD, reset, tier र billing status record गर्नुहोस्।
6. Release, demo, migration र traffic change अघि पुनः जाँच्नुहोस्।

Project/account, key type, model/execution line, live values/date, billing plan/balance owner र backoff/cache/fallback strategy release record मा लेख्नुहोस्।

## 429 वा `RESOURCE_EXHAUSTED`

Project र model/API surface verify गर्नुहोस्; RPM/TPM/RPD छुट्टाछुट्टै हेर्नुहोस्; concurrency घटाएर exponential backoff लगाउनुहोस्; prompt छोटो र repeated result cache गर्नुहोस्; normal traffic cap भए paid project रोज्नुहोस्। Wrong project/model, region, billing, spend limit वा temporary capacity पनि कारण हुन सक्छ। Same-project keys ले bypass नगर्नुहोस्।

## निर्णय र FAQ

Free tier लाई promise होइन measurement surface मान्नुहोस्। Low-frequency, non-sensitive, retryable load live limits भित्र भए जारी राख्न सकिन्छ। Stable throughput, frequent 429, paid-only model, privacy/compliance वा user-facing failure भए paid project मा जानुहोस्। Exact quota AI Studio project view मा हेर्नुहोस्; nickname बाट “Gemini 3 free” नमान्नुहोस्। Key migration auth continuity हो, quota वृद्धि होइन।

## Further Reading

- [Billing Units](/docs/guides/billing-units/)
