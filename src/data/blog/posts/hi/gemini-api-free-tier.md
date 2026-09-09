---
title: Gemini API Free Tier Limits (2026): Project quota, API keys और paid boundary
description: Gemini API free tier को आज कैसे पढ़ें: model lines की Free Tier स्थिति, project quota, API key ownership, AI Studio में RPM/TPM/RPD और paid project पर जाने का सही समय।
date: 2026-04-25
category: API विकास
tags: [Gemini API, Free Tier, Rate Limits, AI Studio, Google AI]
readTime: 12
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

Gemini API free tier कोई एक स्थिर public number नहीं है। वास्तविक क्षमता Google Cloud project, model, usage tier, region, billing status और current Google policy पर निर्भर करती है। 16 जुलाई 2026 को सुरक्षित जाँच का क्रम है: पहले official pricing page पर exact model/feature की Free Tier स्थिति देखें; फिर AI Studio में उस project पर जाएँ जिसने key बनाई और current RPM, TPM, RPD, reset rules और usage देखें। एक project में कई keys बनाने से quota नहीं बढ़ती; key credential है, project quota और billing का owner है।

## Free Tier का अर्थ तीन अलग सवाल

1. क्या exact model या feature अभी free है? इसका उत्तर current pricing page से लें, पुराने blog/table से नहीं।
2. Rate limit कैसे मापी जाती है? RPM, TPM और RPD core dimensions हैं; image lines में IPM भी हो सकता है।
3. अभी यह project कितना उपयोग कर सकता है? इसका operational उत्तर AI Studio project view देता है। Pricing page “model free है?” बताता है; AI Studio “यह project अभी कितना कर सकता है?” बताता है।

| प्रश्न | वर्तमान उत्तर | कहाँ जाँचें |
| --- | --- | --- |
| Gemini API free है? | कुछ model/feature lines में Free Tier है | Official pricing |
| मेरी exact quota? | Project, model, tier, region, billing पर निर्भर | AI Studio project usage |
| हर key की अलग quota? | नहीं; project quota own करता है | Key/project settings |
| सीमा पार होने पर? | सामान्यतः 429 या `RESOURCE_EXHAUSTED` | Rate-limit/troubleshooting docs |
| Production free tier पर? | केवल low-risk, low-traffic, failure-tolerant काम | Billing/data-usage docs |

## कौन-सा source किस उत्तर का owner है?

Pricing page Free Tier status बताती है; rate-limit docs RPM/TPM/RPD definitions और reset logic; API-key docs key के पीछे project; billing docs paid tier, data processing और credits; troubleshooting docs 429, region, billing और unavailable model अलग करती हैं। याद रखें: **model free status, project live quota और billing status तीन अलग surfaces हैं।**

## API key quota pool नहीं है

Key authentication credential है, independent free bucket नहीं। Key A/B/C एक ही project की हों तो सभी उसी project quota को consume करती हैं। 429 पर नई same-project key बनाना सामान्यतः समस्या हल नहीं करता। Key rotation और environment isolation के लिए keys उपयोगी हैं, quota बढ़ाने के लिए नहीं।

जाँचें: key किस Google account ने बनाई, पीछे कौन-सा Cloud project है, billing enabled है या नहीं, code exact model ID बुला रहा है या नहीं, और AI Studio में वही project खुला है या नहीं। Auth migration को quota समस्या से अलग रखें। नए AI Studio keys auth keys default कर सकते हैं और standard-key requests सितंबर 2026 में reject होने की योजना है; migration auth continuity ठीक करती है, quota नहीं बढ़ाती।

## Free Tier किसके लिए है?

Learning, prompt validation, synthetic-data prototype और occasional internal tools के लिए उपयुक्त है। Real users, sensitive/commercial data, stable throughput, frequent 429 या paid-only model line के लिए billing-enabled project अपनाएँ। Model family नाम देखकर free status न मानें: एक text line free हो सकती है जबकि image या preview line paid-only हो। Exact model ID और execution line Standard/Batch/Flex/Priority current pricing page और project view से जाँचें।

Google Cloud free-trial credits को Gemini API पर स्वतः लागू न मानें। Billing enable होने पर prepaid/postpaid plan, balance, auto-recharge और budget alerts monitor करें; balance zero होने पर project free tier पर स्वतः fallback करे, ऐसा मानना गलत है।

## Real-time quota कैसे जाँचें?

1. Key manage करने वाले account से AI Studio खोलें।
2. App वाला exact project चुनें।
3. Usage/rate-limit view खोलें।
4. Exact model ID confirm करें।
5. RPM, TPM, RPD, reset rules, tier और billing status record करें।
6. Release, demo, migration और traffic change से पहले दोबारा जाँचें।

Release record में project ID/account, key type/migration status, model ID/execution line, AI Studio values और check date, billing plan/balance owner, तथा failure strategy (backoff, cache, fallback, stop conditions) लिखें।

## 429 या `RESOURCE_EXHAUSTED` के बाद क्रम

| क्रम | कार्रवाई |
| --- | --- |
| 1 | AI Studio में key के पीछे project verify करें |
| 2 | Model ID और API surface verify करें |
| 3 | RPM, TPM और RPD अलग-अलग देखें |
| 4 | Concurrency घटाएँ और exponential backoff लगाएँ |
| 5 | Prompt छोटा करें और repeat results cache करें |
| 6 | Normal traffic फिर भी cap हो तो billed project पर जाएँ |

429 का अर्थ हमेशा Free Tier गायब होना नहीं है। Wrong project/model, region, billing, spend-based limit या temporary capacity भी कारण हो सकते हैं। Same-project keys से limit bypass न करें।

## Free-tier बदलाव से resilient design

Free tier को promise नहीं, measurement surface मानें। Request count, prompt length, token use, failures और retries record करें। Model routing, response caching और dimension-specific error logging रखें। Production plan में पहले से billing project, budget owner, alerts, allowed data और migration trigger तय करें।

## अंतिम नियम

Low-frequency, non-sensitive, retryable load और project की live limits के भीतर हो तो Free Tier जारी रखें। Stable throughput, लगातार 429, paid-only model, privacy/compliance या real-user failure हो तो paid project चुनें। Free Tier production entitlement नहीं, live project limit है।

## FAQ

कुछ model/feature lines में Free Tier अभी भी हो सकती है; exact status current pricing page से लें। Exact quota AI Studio में key के पीछे वाले project पर देखें। हर key की अलग quota नहीं। Same-project नई keys capacity नहीं बढ़ातीं। 2026 में key migration आवश्यक हो सकती है, लेकिन इससे quota नहीं बढ़ती। 429 पर project, model, limits, concurrency और billing क्रम से जाँचें। “Gemini 3/3.1 free” nickname से तय न करें। Production में केवल low-risk, low-traffic, failure-tolerant scenarios free tier पर रखें।

## Further Reading

- [Billing Units](/docs/guides/billing-units/)
