---
title: Gemini API Quota Application Guide: Free देखि Tier 3 upgrade
description: Gemini API quota upgrade, Free/Tier 1/2/3, RPM/TPM/RPD, 429 handling र production planning guide।
date: 2026-01-22
category: API विकास
tags: [Gemini API, Rate Limits, API Quota, 429 Error, Google AI]
readTime: 14
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Gemini API limits project मा लागू हुन्छन्, API key मा होइन। RPM requests/minute, TPM tokens/minute र RPD requests/day हुन्। Free development/prototype का लागि, production का लागि paid tier र live project values verify गर्नुहोस्। पुराना tables लाई स्थायी promise नमान्नुहोस्।

## Tier र upgrade

Free learning/prototype, Tier 1 small production, Tier 2 mid-size, Tier 3 enterprise/custom quota वा Provisioned Throughput का लागि हो। Exact RPM/TPM/RPD model, tier र project row मा निर्भर हुन्छन्। AI Studio मा exact project छानेर billing enable गर्नुहोस्; Tier eligibility current docs बाट जाँच्नुहोस्। Vertex AI मा Cloud Console quota request गर्न सकिन्छ। Enterprise request मा peak RPM, token profile, growth र SLA लेख्नुहोस्।

## 429 handling

429 `RESOURCE_EXHAUSTED` quota protection हो। RPM मा queue/pacing, TPM मा summarization/chunking/context cache, RPD मा mock/cache/reset window प्रयोग गर्नुहोस्। Exponential backoff, jitter, max attempts, total budget र stop condition राख्नुहोस्। High concurrency मा token bucket वा queue प्रयोग गर्नुहोस्।

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

Daily users, conversations, turns र peak window बाट requests अनुमान गर्नुहोस्; कम्तीमा 30% buffer राख्नुहोस्। Cache, Context Caching, limiter, RPM/TPM/RPD, 429 rate र latency monitor गर्नुहोस्। Cheaper model, cached response, busy message वा backup service fallback राख्नुहोस्। GPT88 मा `base_url`/`api_key` बदल्न सकिन्छ; current price, quota, failure billing र SLA console बाट verify गर्नुहोस्। Paid tier unlimited होइन।

## Further Reading

- [Error Code Reference](/docs/api/errors/)
