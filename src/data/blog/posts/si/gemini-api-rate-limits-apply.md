---
title: Gemini API Quota Application Guide: Free සිට Tier 3 upgrade
description: Gemini API quota upgrade, Free/Tier 1/2/3, RPM/TPM/RPD, 429 handling සහ production planning මාර්ගෝපදේශය.
date: 2026-01-22
category: API සංවර්ධනය
tags: [Gemini API, Rate Limits, API Quota, 429 Error, Google AI]
readTime: 14
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Gemini API limits project එකට අදාළය, API key එකට නොවේ. RPM requests/minute, TPM tokens/minute සහ RPD requests/day වේ. Free development/prototype සඳහාය; production සඳහා paid tier සහ live project values verify කරන්න. පැරණි tables ස්ථිර promise ලෙස නොගන්න.

## Tier සහ upgrade

Free learning/prototype, Tier 1 small production, Tier 2 mid-size, Tier 3 enterprise/custom quota හෝ Provisioned Throughput සඳහාය. Exact RPM/TPM/RPD model, tier සහ project row මත රඳා පවතී. AI Studio හි exact project තෝරා billing enable කරන්න; Tier eligibility current docs මඟින් බලන්න. Vertex AI හි Cloud Console quota request කළ හැක. Enterprise request එකේ peak RPM, token profile, growth සහ SLA සඳහන් කරන්න.

## 429 handling

429 `RESOURCE_EXHAUSTED` quota protection වේ. RPM සඳහා queue/pacing, TPM සඳහා summarization/chunking/context cache, RPD සඳහා mock/cache/reset window භාවිතා කරන්න. Exponential backoff, jitter, max attempts, total budget සහ stop condition තබන්න. High concurrency සඳහා token bucket හෝ queue භාවිතා කරන්න.

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

## Production planning

Daily users, conversations, turns සහ peak window මඟින් requests estimate කරන්න; අවම වශයෙන් 30% buffer තබන්න. Cache, Context Caching, limiter, RPM/TPM/RPD, 429 rate සහ latency monitor කරන්න. Cheaper model, cached response, busy message හෝ backup service fallback තබන්න. GPT88 හි `base_url`/`api_key` වෙනස් කළ හැක; current price, quota, failure billing සහ SLA console එකෙන් verify කරන්න. Paid tier unlimited නොවේ.

## Further Reading

- [Error Code Reference](/docs/api/errors/)
