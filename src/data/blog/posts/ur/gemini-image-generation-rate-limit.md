---
title: AI Studio میں Nano Banana quota کیسے پڑھیں: پہلے 5 entry points الگ کریں
description: Gemini app، AI Studio workspace، Developer API project، Vertex AI اور third-party credits کے quota الگ پہچانیں اور RPM، TPM، RPD، IPM سے 429 سمجھیں۔
date: 2026-05-03
category: API development
tags: [Nano Banana, AI Studio, Gemini API, Image Generation Quota, Rate Limit]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

ہر AI Studio user کے لیے Nano Banana کا ایک fixed image count نہیں۔ پہلے entry point پہچانیں: Gemini app، AI Studio browser workspace، Gemini Developer API project، Vertex AI یا third-party wrapper۔ ہر ایک کے plans، projects، models، billing اور limits الگ ہیں۔ API code میں logged-in [AI Studio rate-limit page](https://aistudio.google.com/rate-limit) پر project، model اور usage tier دیکھیں؛ صرف “limit reached” کو online table سے نہ ملائیں۔

## Quota کس کے پاس ہے

Gemini app کا limit account اور subscription plan کا ہے۔ Developer API quota project، model، tier اور metric کا ہے۔ Vertex AI میں Cloud project، region، IAM، billing اور quota شامل ہیں۔ Third-party credits provider کے balance، queue اور contract ہیں، Google quota نہیں۔ ایک ہی account ایک ہی quota pool نہیں ہوتا۔

## UI hint اور API 429

Full UI/error text، selected project، key کا project، model ID، وقت/timezone اور dashboard record کریں۔ API response میں status، error body، quota metric اور `retryDelay` بھی رکھیں۔ صرف UI hint ہو تو state refresh، ایک controlled retry اور official troubleshooting کریں۔ `429 RESOURCE_EXHAUSTED` ملنے پر ہی API branch استعمال کریں۔

| Metric | مطلب | پہلا قدم |
| --- | --- | --- |
| RPM | فی منٹ requests | concurrency کم، queue اور jitter backoff |
| Input TPM | فی منٹ input tokens | prompt/context مختصر کریں |
| RPD | API day کے requests | daily budget، reset یا limit request |
| IPM | فی منٹ images | image queue الگ، concurrency کم |

Developer API limits project پر لاگو ہوتے ہیں، API key پر نہیں۔ اسی project میں نئی key quota نہیں بڑھاتی۔ 20 July 2026 کے official docs کے مطابق API RPD midnight Pacific Time پر reset ہوتا ہے؛ اسے Gemini app، Vertex AI یا third-party credits پر لاگو نہ کریں۔

429 record میں entry point، project، full model ID، metric، failure time/timezone، status/body، `retryDelay`، request ID، tier، limit، volume، concurrency اور failure rate رکھیں۔ RPM میں peak کم کریں، RPD میں tight retries بند کریں، IPM میں image tasks الگ queue کریں۔

## App، pricing اور Vertex AI

Gemini app کے لیے پرانی fixed daily tables پر بھروسا نہ کریں؛ Settings کے “usage limits”، refresh hint اور current Google Help دیکھیں۔ Model availability، free/paid tier اور project quota الگ چیزیں ہیں۔ Billing tier بدل سکتی ہے مگر capacity، spend، safety اور rate limits ختم نہیں کرتی۔ Vertex AI unlimited bypass نہیں؛ project، region، IAM، cost اور quota الگ verify کریں۔

Third-party credits کو Google RPM/IPM/RPD میں convert نہیں کیا جا سکتا۔ Provider سے alias، charging، failed-output refund، expiry، concurrency، queue اور upstream 429 پوچھیں۔ API key، project ID، billing یا account identifier support ticket میں شامل نہ کریں۔

## FAQ

سب کے لیے fixed image count نہیں۔ نئی API key quota نہیں بڑھاتی۔ Billing کے بعد بھی metric-specific 429 آ سکتا ہے۔ درست ترتیب ہے: **entry point → account/project → model → metric → dashboard → matching action**۔

## Further Reading

- [Image Generation API](/docs/api/images/)
