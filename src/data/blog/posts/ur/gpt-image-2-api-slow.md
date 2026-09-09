---
title: GPT Image 2 API سست یا ٹائم آؤٹ ہو تو پہلے ناکام layer تلاش کریں
description: first byte، final image، timeout layer، route اور retries کو الگ ناپ کر GPT Image 2 کی سست calls کی تشخیص کا طریقہ۔
date: 2026-05-12
category: تکنیکی ٹیوٹوریل
tags: [GPT Image 2, OpenAI API, Image Generation, API Troubleshooting, Latency]
readTime: 12
relatedPath: /docs/api/errors/
relatedTitle: API Error Codes
---

سست GPT Image 2 call کو فوراً model کی خرابی نہ سمجھیں۔ پیچیدہ prompt، زیادہ reference images، بڑا output یا high quality واقعی وقت لے سکتے ہیں؛ مگر browser، serverless function، reverse proxy یا gateway پہلے timeout بھی کر سکتے ہیں۔ ہر کوشش میں `connect_ms`، `first_byte_ms`، `first_partial_image_ms`، `final_image_ms`، `download_ms`، `render_ms`، `retry_count`، `http_status`، `request_id`، `model`، `quality`، `size`، `format` اور `route_owner` ریکارڈ کریں۔

## Normal Wait اور False Timeout

یہ الگ کریں کہ generation دیر سے کامیاب ہوئی، upstream کام کر رہا تھا مگر browser یا proxy پہلے بند ہوا، یا local timeout کے بعد retries نے ایک کام کئی بار شروع کر دیا۔ ایک ہی `gpt-image-2` نام direct OpenAI، Azure، gateway یا reverse route کو ایک جیسا path نہیں بناتا۔ Base URL، timeout policy، retry policy اور log owner الگ لکھیں۔

## Timeout Budget اور Baseline

Browser میں پوری synchronous generation نہ روکیں؛ job ID، progress یا async status واپس کریں۔ Edge، proxy اور backend worker کے timeouts الگ دیکھیں۔ پہلے ایک ہی request کے تین baseline runs کریں، پھر صرف sync/async، format، quality یا route میں سے ایک variable بدلیں۔ Draft کے لیے low quality، square output یا JPEG آزمایا جا سکتا ہے، مگر production quality کو تشخیص کے بغیر کم نہ کریں۔

## Streaming اور Retries

Streaming partial image جلد دکھا سکتی ہے، final computation لازماً تیز نہیں کرتی۔ Async task browser timeout اور duplicate clicks کم کرتا ہے۔ Local timeout کے بعد نیا request بنانے سے پہلے دیکھیں کہ اصل task چل رہا ہے یا نہیں۔ 429 کے لیے reset header اور exponential backoff، 5xx کے لیے capped retry اور jitter استعمال کریں، اور ایک ہی pending job کو deduplicate کریں۔

## Evidence اور Reproduction

Direct route کے لیے model ID، endpoint، request ID اور limit headers؛ Azure کے لیے deployment، region اور quota؛ gateway کے لیے base URL، upstream status، timeout اور internal retries رکھیں۔ اگر صرف browser sync path fail ہو تو اسے OpenAI کی رفتار نہ کہیں؛ اگر صرف ایک gateway سست ہو تو اسے official model behavior نہ سمجھیں۔ API keys، tokens، private images، مکمل prompts یا غیر صاف logs شیئر نہ کریں۔

## Production Guardrails

Generate button میں pending state رکھیں، backend میں idempotency/deduplication لگائیں، اور errors کو local timeout، gateway timeout، upstream error یا API error کے طور پر واضح کریں۔ Dashboard میں route owner کے حساب سے latency الگ دکھائیں۔

## FAQ

### کیا slow generation معمول ہے؟

پیچیدہ prompt سست ہو سکتا ہے، مگر پہلے `first_byte_ms` اور `final_image_ms` دیکھیں۔

### کیا streaming final image تیز کرتی ہے؟

نہیں؛ یہ progress جلد دکھاتی اور duplicate clicks کم کرتی ہے۔

### کیا gateway وجہ ہے؟

برابر parameters کے ساتھ direct اور gateway کا like-for-like comparison کریں۔

## Further Reading

- [API Error Codes](/docs/api/errors/)
- [GPT Image 2 Noise and Texture Artifacts](/docs/blog/gpt-image-2-low-quality/)
