---
title: Gemini API Quota Application Guide: Free سے Tier 3 upgrade
description: Gemini API quota upgrade، Free/Tier 1/2/3، RPM/TPM/RPD، 429 handling اور production planning کی عملی گائیڈ۔
date: 2026-01-22
category: API development
tags: [Gemini API, Rate Limits, API Quota, 429 Error, Google AI]
readTime: 14
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Gemini API limits project پر لگتی ہیں، API key پر نہیں۔ RPM requests/minute، TPM tokens/minute اور RPD requests/day ہیں۔ Free development کے لیے ہے؛ production میں paid tier اور live project values دیکھیں۔ پرانے tables کو مستقل وعدہ نہ سمجھیں۔

## Tiers اور upgrade

Free learning/prototype، Tier 1 small production، Tier 2 mid-size workload، Tier 3 enterprise/custom quota یا Provisioned Throughput کے لیے ہے۔ Exact RPM/TPM/RPD model، tier اور current project row پر منحصر ہیں؛ AI Studio pricing/rate-limit page سے verify کریں۔

AI Studio میں exact project منتخب کر کے billing enable کریں، payment اور billing status verify کریں۔ Tier 1 activation اور Tier 2/3 spend/time eligibility current Google docs سے چیک کریں؛ پرانے `$250`، `$1,000` یا fixed waiting periods کو current contract نہ سمجھیں۔ Vertex AI میں Cloud Console → Quotas and System Limits سے quota request کی جا سکتی ہے۔ Enterprise request میں peak RPM، token profile، growth اور SLA لکھیں۔

## 429 handling

429 `RESOURCE_EXHAUSTED` code bug نہیں، quota protection ہے۔ RPM پر queue/pacing، TPM پر summarization/chunking/context cache، RPD پر mock/cache اور reset window استعمال کریں۔

```python
import time, random
from openai import OpenAI
client = OpenAI(api_key="YOUR_GPT88_API_KEY", base_url="https://gpt88.cc/v1")

def call_with_backoff(messages, max_retries=5):
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(model="gemini-2.0-flash", messages=messages)
        except Exception as exc:
            if "429" not in str(exc) and "RESOURCE_EXHAUSTED" not in str(exc): raise
            delay = 2 ** attempt
            time.sleep(delay + random.uniform(0, delay * 0.1))
    raise RuntimeError("max retries exceeded")
```

Exponential backoff، jitter، max attempts، total budget اور stop condition رکھیں۔ High concurrency میں token bucket یا queue شامل کریں؛ retry storm نہ بنائیں۔

## Production planning

Daily users، conversations، turns اور peak window سے requests estimate کریں؛ کم از کم 30% buffer رکھیں۔ Redis/cache، Context Caching، application limiter، RPM/TPM/RPD، 429 rate اور latency monitor کریں۔ Cheaper model، cached response، busy message یا backup service fallback تیار رکھیں۔

GPT88 official quota، regional connectivity یا enterprise approval کے لیے supplement ہو سکتا ہے۔ `base_url` اور `api_key` بدلیں؛ current price، quota، failure billing اور SLA console میں verify کریں۔ یہ official compliance کا خودکار replacement نہیں۔ Paid tier unlimited نہیں۔

## Further Reading

- [Error Code Reference](/docs/api/errors/)
