---
title: AI Studio मा Nano Banana quota कसरी पढ्ने: पहिले ५ entry points छुट्याउनुहोस्
description: Gemini app, AI Studio workspace, Developer API project, Vertex AI र third-party credits का quota छुट्याएर RPM, TPM, RPD र IPM बाट 429 बुझ्नुहोस्।
date: 2026-05-03
category: API विकास
tags: [Nano Banana, AI Studio, Gemini API, Image Generation Quota, Rate Limit]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

सबै AI Studio user का लागि Nano Banana को एउटै fixed image count हुँदैन। पहिले entry point पहिचान गर्नुहोस्: Gemini app, AI Studio browser workspace, Gemini Developer API project, Vertex AI वा third-party wrapper। यी सबैका plan, project, model, billing र limit फरक हुन्छन्। API code मा logged-in [AI Studio rate-limit page](https://aistudio.google.com/rate-limit) मा project, model र usage tier हेर्नुहोस्; “limit reached” मात्र देखेर online table नमान्नुहोस्।

## Quota कसले व्यवस्थापन गर्छ

Gemini app को limit account र subscription plan को हुन्छ। Developer API quota project, model, tier र metric मा लागू हुन्छ। Vertex AI मा Cloud project, region, IAM, billing र quota हुन्छन्। Third-party credits provider को balance, queue र contract हुन्; ती Google quota होइनन्। एउटै account एउटै quota pool होइन।

## UI hint र API 429

पूरा UI/error text, selected project, key को project, model ID, समय/timezone र dashboard record गर्नुहोस्। API response भए status, error body, quota metric र `retryDelay` पनि राख्नुहोस्। UI hint मात्र भए state refresh, एउटा controlled retry र official troubleshooting गर्नुहोस्। `429 RESOURCE_EXHAUSTED` आएपछि मात्र API branch मा जानुहोस्।

| Metric | अर्थ | पहिलो कदम |
| --- | --- | --- |
| RPM | प्रति मिनेट requests | concurrency घटाउने, queue र jitter backoff |
| Input TPM | प्रति मिनेट input tokens | prompt/context छोटो बनाउने |
| RPD | API day का requests | daily budget, reset वा limit request |
| IPM | प्रति मिनेट images | image queue अलग, concurrency घटाउने |

Developer API limit project मा लागू हुन्छ, API key मा होइन। उही project मा नयाँ key बनाएर quota बढ्दैन। 20 July 2026 का official docs अनुसार API RPD midnight Pacific Time मा reset हुन्छ; यसलाई Gemini app, Vertex AI वा third-party credits मा लागू नगर्नुहोस्।

429 record मा entry point, project, full model ID, metric, failure time/timezone, status/body, `retryDelay`, request ID, tier, limit, volume, concurrency र failure rate राख्नुहोस्। RPM भए peak घटाउनुहोस्, RPD भए tight retry रोक्नुहोस्, IPM भए image task अलग queue मा राख्नुहोस्।

## App, pricing र Vertex AI

Gemini app का पुराना fixed daily tables नमान्नुहोस्; Settings को “usage limits”, refresh hint र current Google Help हेर्नुहोस्। Model availability, free/paid tier र project quota अलग प्रश्न हुन्। Billing ले tier बदल्न सक्छ तर capacity, spend, safety र rate limit हटाउँदैन। Vertex AI unlimited bypass होइन; project, region, IAM, cost र quota अलग verify गर्नुहोस्।

Third-party credits लाई Google RPM/IPM/RPD मा बदल्न सकिँदैन। Provider सँग alias, charging, failed-output refund, expiry, concurrency, queue र upstream 429 सोध्नुहोस्। API key, project ID, billing वा account identifier support ticket मा नपठाउनुहोस्।

## FAQ

सबैका लागि fixed image count छैन। नयाँ API key ले quota बढाउँदैन। Billing enabled भए पनि metric-specific 429 आउन सक्छ। सही क्रम: **entry point → account/project → model → metric → dashboard → matching action**।

## Further Reading

- [Image Generation API](/docs/api/images/)
