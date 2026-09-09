---
title: Gemini API Quota Application Guide: Free முதல் Tier 3 upgrade
description: Gemini API quota upgrade, Free/Tier 1/2/3, RPM/TPM/RPD, 429 handling மற்றும் production planning வழிகாட்டி.
date: 2026-01-22
category: API மேம்பாடு
tags: [Gemini API, Rate Limits, API Quota, 429 Error, Google AI]
readTime: 14
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Gemini API limits project-க்கு பொருந்தும், API key-க்கு அல்ல. RPM requests/minute, TPM tokens/minute, RPD requests/day. Free development-க்கு; production-ல் paid tier மற்றும் live project values verify செய்யவும். பழைய tables-ஐ நிரந்தர வாக்குறுதியாகக் கொள்ள வேண்டாம்.

## Tier மற்றும் upgrade

Free learning/prototype, Tier 1 small production, Tier 2 mid-size, Tier 3 enterprise/custom quota அல்லது Provisioned Throughput. Exact RPM/TPM/RPD model, tier, project row சார்ந்தவை; AI Studio pricing/rate-limit page மூலம் சரிபார்க்கவும். AI Studio-யில் exact project தேர்வு செய்து billing enable செய்யவும்; Tier eligibility-ஐ current docs மூலம் பார்க்கவும். Vertex AI-ல் Cloud Console quota request செய்யலாம். Enterprise request-ல் peak RPM, token profile, growth, SLA அளிக்கவும்.

## 429 handling

429 `RESOURCE_EXHAUSTED` quota protection. RPM-க்கு queue/pacing, TPM-க்கு summarization/chunking/context cache, RPD-க்கு mock/cache/reset window பயன்படுத்தவும்.

```python
import time, random
from openai import OpenAI
client = OpenAI(api_key="YOUR_GPT88_API_KEY", base_url="https://gpt88.cc/v1")
def call_with_backoff(messages, max_retries=5):
    for attempt in range(max_retries):
        try: return client.chat.completions.create(model="gemini-2.0-flash", messages=messages)
        except Exception as exc:
            if "429" not in str(exc) and "RESOURCE_EXHAUSTED" not in str(exc): raise
            delay = 2 ** attempt; time.sleep(delay + random.uniform(0, delay * .1))
    raise RuntimeError("max retries exceeded")
```

Exponential backoff, jitter, max attempts, total budget மற்றும் stop condition வைத்திருங்கள். High concurrency-க்கு token bucket அல்லது queue பயன்படுத்தவும்.

## Production planning

Daily users, conversations, turns, peak window மூலம் requests கணக்கிடவும்; குறைந்தது 30% buffer வைக்கவும். Cache, Context Caching, limiter, RPM/TPM/RPD, 429 rate மற்றும் latency monitor செய்யவும். Cheaper model, cached response, busy message அல்லது backup service fallback வைத்திருக்கவும். GPT88-ல் `base_url`/`api_key` மாற்றலாம்; current price, quota, failure billing, SLA console-ல் verify செய்யவும். Paid tier unlimited அல்ல.

## Further Reading

- [Error Code Reference](/docs/api/errors/)
