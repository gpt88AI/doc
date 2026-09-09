---
title: Gemini API Rate Limits Complete Guide: RPM، TPM، 429 اور Tier Upgrade
description: RPM، TPM، RPD اور IPM limits، Free بمقابلہ Paid tier، production 429 handling اور quota-aware architecture کی گائیڈ۔
date: 2026-01-22
category: API development
tags: [Gemini API, Rate Limits, RPM TPM, 429 Error, API Quota]
readTime: 18
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Gemini API میں 429 عموماً code bug نہیں بلکہ multi-dimensional rate limit ہے۔ RPM requests/minute، TPM tokens/minute، RPD requests/day اور IPM images/minute ہیں۔ کوئی بھی dimension limit سے گزرے تو request reject ہو سکتی ہے۔ Exact values model، tier، project اور current official row پر منحصر ہیں؛ static table مستقل contract نہیں۔

## چار limits

- **RPM**: ہر API call ایک request؛ burst میں پہلے ختم ہو سکتا ہے۔
- **TPM**: prompt/context/output tokens؛ بڑے document میں RPM سے پہلے لگ سکتا ہے۔
- **RPD**: daily total؛ repeated tests اسے جلد ختم کر سکتے ہیں۔
- **IPM**: image generation کی الگ limit۔

Limits Google Cloud project پر ہیں، key پر نہیں؛ اسی project کی کئی keys ایک pool share کرتی ہیں۔ Exact model row اور AI Studio rate-limit page دیکھیں۔ Free learning/prototype کے لیے ہے؛ Tier 1/2/3 production scale کے لیے current billing اور eligibility verify کریں۔

## 429 اور backoff

Response میں `429`، `RESOURCE_EXHAUSTED` اور کبھی `retryDelay` آتا ہے۔ صرف 429 retry کریں، باقی errors surface کریں۔

```python
import time, random
import google.generativeai as genai
def call_with_retry(prompt, max_retries=5):
    genai.configure(api_key="YOUR_GPT88_API_KEY")
    model = genai.GenerativeModel("gemini-2.5-flash")
    for attempt in range(max_retries):
        try: return model.generate_content(prompt).text
        except Exception as exc:
            if "429" not in str(exc) and "RESOURCE_EXHAUSTED" not in str(exc): raise
            if attempt == max_retries - 1: raise
            delay = min(2 ** attempt, 32)
            time.sleep(delay + random.uniform(0, delay * .1))
```

Exponential backoff، jitter، max attempts اور total time budget رکھیں؛ retry storm نہ بنائیں۔

## Monitoring اور optimization

Response headers سے remaining requests/tokens/reset time پڑھیں اور console metrics سے cross-check کریں۔ Token bucket یا queue میں 20–30% margin رکھیں۔ Google Cloud Console → APIs & Services → Quotas میں utilization دیکھیں اور 80% پر alert لگائیں۔ Long context کم، system prompt مختصر، `max_output_tokens` مناسب اور repeated responses cache کریں۔ Production میں RPM کے ساتھ TPM/RPD، queue، Context Caching، admission control اور fallback model/response/busy message رکھیں۔ API key بدلنے سے same-project quota نہیں بڑھتی اور paid tier تمام limits ختم نہیں کرتا۔

## Further Reading

- [Error Code Reference](/docs/api/errors/)
