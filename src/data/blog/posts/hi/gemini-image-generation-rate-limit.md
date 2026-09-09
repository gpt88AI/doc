---
title: AI Studio में Nano Banana quota कैसे पढ़ें: 5 entry points पहले अलग करें
description: Gemini app, AI Studio workspace, Developer API project, Vertex AI और third-party credits के quota को अलग पहचानें और RPM, TPM, RPD, IPM के आधार पर 429 समझें।
date: 2026-05-03
category: API विकास
tags: [Nano Banana, AI Studio, Gemini API, Image Generation Quota, Rate Limit]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

हर AI Studio user के लिए Nano Banana का एक fixed image count नहीं होता। पहले entry point पहचानें: Gemini app, AI Studio browser workspace, Gemini Developer API project, Vertex AI या third-party wrapper। इनके plans, projects, models, billing और limits अलग हैं। API code में logged-in [AI Studio rate-limit page](https://aistudio.google.com/rate-limit) पर current project, model और usage tier देखें। केवल “limit reached” देखकर online quota table न मानें।

## Quota किसके नियंत्रण में है

Gemini app की सीमा account और subscription plan से आती है। AI Studio browser सीमा selected project से अलग हो सकती है। Developer API quota project, model, tier और metric पर लागू होता है। Vertex AI में Cloud project, region, IAM, billing और quota आते हैं। Third-party credits provider के balance, queue, alias और contract हैं; इन्हें Google quota न समझें। एक ही Google account एक ही quota pool नहीं है और एक ही product name समान limit का प्रमाण नहीं।

## UI hint और API 429 अलग करें

पूरा UI/error text, selected project, API key का project, model ID, समय/timezone और dashboard record करें। API response हो तो status, error body, quota metric और `retryDelay` भी बचाएँ। केवल browser hint हो तो state refresh, एक controlled retry और official troubleshooting करें। `429 RESOURCE_EXHAUSTED` स्पष्ट मिले तभी API rate-limit branch अपनाएँ।

## चार मुख्य metrics

| Metric | अर्थ | पहला कदम |
| --- | --- | --- |
| RPM | प्रति मिनट requests | concurrency घटाएँ, queue और jitter backoff |
| Input TPM | प्रति मिनट input tokens | prompt/context छोटा करें |
| RPD | API day में requests | daily budget, reset का इंतज़ार या limit request |
| IPM | प्रति मिनट images | image queue अलग करें, concurrency घटाएँ |

Gemini Developer API limits project पर लागू होते हैं, API key पर नहीं। उसी project में नई key बनाने से quota नहीं बढ़ता। 20 July 2026 के official docs के अनुसार API RPD midnight Pacific Time पर reset होता है; इसे Gemini app, Vertex AI या third-party credits पर लागू न करें और Beijing time में स्थायी रूपांतरण न मानें।

429 record में entry point, project, full model ID, metric, failure time/timezone, status/body, `retryDelay`, request ID, tier, current limit, volume, concurrency और failure rate रखें। RPM पर peak घटाएँ; RPD पर लगातार retry न करें; IPM पर image tasks अलग queue करें।

## App, pricing और Vertex AI

Gemini app में fixed daily table पर भरोसा न करें। Settings के “usage limits”, refresh hint और current Google Help देखें। Free/paid, model availability और project quota तीन अलग प्रश्न हैं। Billing eligibility या tier बदल सकता है, लेकिन capacity, spend, safety और rate limits समाप्त नहीं करता। Vertex AI unlimited bypass नहीं है; project, region, IAM, costs और quota अलग से verify करें। Region बदलना scaling strategy नहीं।

Third-party credits को Google RPM/IPM/RPD में convert नहीं कर सकते। Provider से alias, charging, failed-output refund, expiry, concurrency, queue और upstream 429 पूछें। API keys, project IDs, billing details और account identifiers support ticket में न भेजें।

## FAQ

सबके लिए fixed image count नहीं है। नई API key quota नहीं बढ़ाती। Billing के बाद भी 429 metric-specific हो सकता है। सही क्रम है: **entry point → account/project → model → metric → dashboard → matching action**।

## Further Reading

- [Image Generation API](/docs/api/images/)
