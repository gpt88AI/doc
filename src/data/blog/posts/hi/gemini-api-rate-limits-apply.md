---
title: Gemini API Quota Application Guide: Free से Tier 3 तक upgrade
description: Gemini API quota upgrade, Free/Tier 1/2/3, RPM/TPM/RPD, 429 handling और production quota planning की step-by-step गाइड।
date: 2026-01-22
category: API विकास
tags: [Gemini API, Rate Limits, API Quota, 429 Error, Google AI]
readTime: 14
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Gemini API limits project के आधार पर लागू होती हैं, API key के आधार पर नहीं। RPM requests/minute, TPM tokens/minute और RPD requests/day हैं। Free tier development के लिए है; production में stable throughput चाहिए तो paid tier और live project values देखें। पुराने public tables को permanent promise न मानें।

## Tier चुनना

| Tier | सामान्य उपयोग | मुख्य बात |
| --- | --- | --- |
| Free | learning और prototype | कम और बदलने वाली limits |
| Tier 1 | small production | billing enabled project |
| Tier 2 | mid-size workload | account spend/time eligibility |
| Tier 3 | enterprise | custom quota या Provisioned Throughput |

Exact RPM/TPM/RPD model, tier और current project row पर निर्भर हैं। AI Studio pricing/rate-limit pages से exact values verify करें; static numbers code में hard-code न करें।

## Upgrade के रास्ते

AI Studio में project चुनकर billing enable करें; payment method और billing status verify करें। Tier 1 activation और Tier 2/3 spend/time eligibility current Google docs से जाँचें—पुराने `$250`, `$1,000` या fixed waiting periods को बिना वर्तमान confirmation contract न मानें। Vertex AI users Cloud Console के Quotas and System Limits में संबंधित quota row पर Edit quota request कर सकते हैं। Enterprise Tier 3 या Provisioned Throughput के लिए expected peak RPM, token distribution, growth, SLA और business impact दें।

## 429 handling

429 `RESOURCE_EXHAUSTED` code bug नहीं, quota protection है। पहले पहचानें: RPM, TPM या RPD में कौन-सा dimension खत्म हुआ। RPM के लिए queue और pacing; TPM के लिए summarization/chunking/context cache; RPD के लिए mock/cache और reset window।

```python
import time
import random
from openai import OpenAI

client = OpenAI(api_key="YOUR_GPT88_API_KEY", base_url="https://gpt88.cc/v1")

def call_with_backoff(messages, max_retries=5):
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(
                model="gemini-2.0-flash", messages=messages
            )
        except Exception as exc:
            if "429" not in str(exc) and "RESOURCE_EXHAUSTED" not in str(exc):
                raise
            delay = 2 ** attempt
            time.sleep(delay + random.uniform(0, delay * 0.1))
    raise RuntimeError("max retries exceeded")
```

Retry में exponential backoff, random jitter, max attempts, total time budget और stop condition रखें। High concurrency में token bucket या Redis/Celery queue जोड़ें। Blind retry storm न बनाएं।

## Production quota planning

Daily active users, conversations/user, turns/conversation और peak window से requests estimate करें। कम-से-कम 30% safety buffer रखें, लेकिन business risk और traffic burst के अनुसार अधिक margin चाहिए हो सकता है। Redis response cache, Context Caching, application rate limiter, RPM/TPM/RPD utilization, 429 rate और latency monitor करें। Fallback में cheaper model, cached response, friendly busy message या backup service रखें।

## GPT88 gateway का supplement

Official quota, regional connectivity, spend thresholds या enterprise approval बाधा हों तो GPT88 unified gateway candidate supplement हो सकता है। OpenAI-compatible integration में `base_url` और `api_key` बदलें; exact pricing, quotas, failure billing और SLA gpt88.cc console में verify करें। यह official API policies या enterprise compliance का स्वतः replacement नहीं है।

## Checklist और FAQ

- Exact project/model row record करें।
- Billing owner और quota owner अलग न छोड़ें।
- RPM/TPM/RPD को अलग monitor करें।
- 429 का dimension और reset evidence save करें।
- Tier upgrade के बाद भी current limits re-check करें।
- Multi-project routing केवल वास्तविक billing/security/environment boundary पर करें।

Free से Tier 1 का रास्ता सामान्यतः billing activation से शुरू होता है; Tier 2/3 और enterprise throughput current eligibility और review पर निर्भर हैं। Paid tier unlimited नहीं।

## Further Reading

- [Error Code Reference](/docs/api/errors/)
