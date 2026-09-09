---
title: Gemini API Rate Limits Complete Guide: RPM, TPM, 429 এবং Tier Upgrade
description: RPM, TPM, RPD ও IPM limits, Free বনাম Paid tier, production 429 handling এবং quota-aware architecture-এর গাইড।
date: 2026-01-22
category: API উন্নয়ন
tags: [Gemini API, Rate Limits, RPM TPM, 429 Error, API Quota]
readTime: 18
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Gemini API-তে 429 সাধারণত code bug নয়; multi-dimensional rate limit। RPM requests/minute, TPM tokens/minute, RPD requests/day এবং IPM images/minute। যেকোনো একটি limit পার হলে request reject হতে পারে। Exact value model, tier, project ও current official row-নির্ভর; static table স্থায়ী contract নয়।

## চার limit

- **RPM**: প্রতি API call একটি request; burst-এ আগে শেষ হতে পারে।
- **TPM**: prompt/context/output token; বড় document-এ RPM-এর আগে লাগতে পারে।
- **RPD**: daily total; repeated development test-এ দ্রুত শেষ হয়।
- **IPM**: image-generation-এর আলাদা image limit।

সব limit Google Cloud project-এ প্রযোজ্য, API key-তে নয়। একই project-এর বহু key একই pool share করে। Exact model row ও AI Studio rate-limit page দেখুন।

## Free ও Paid tier

Free learning/prototype-এর জন্য; Tier 1 small production, Tier 2 mid-size, Tier 3 enterprise/custom quota-এর জন্য হতে পারে। পুরনো RPM/RPD figure current ধরে নেবেন না। Billing, tier eligibility ও model availability current docs থেকে verify করুন; একই family-এর model line-এ limit আলাদা হতে পারে।

## 429 ও exponential backoff

Response-এ `429`, `RESOURCE_EXHAUSTED` এবং কখনও `retryDelay` থাকতে পারে। কেবল 429 retry করুন; অন্য error surface করুন।

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

Backoff 1, 2, 4 seconds করে বাড়ান; jitter retry storm কমায়। Max attempts ও total time budget রাখুন।

## Monitoring ও optimization

Response headers-এর remaining requests/tokens/reset time parse করুন এবং console metrics দিয়ে cross-check করুন। Client-side token bucket বা queue-তে 20–30% margin রাখুন। Google Cloud Console → APIs & Services → Quotas-এ utilization দেখুন; 80%-এ alert দিন। Long context ছোট করুন, system prompt trim করুন, `max_output_tokens` সীমিত করুন এবং repeated response cache করুন।

```python
from collections import deque
import time
class RateLimiter:
    def __init__(self, max_rpm): self.max_rpm, self.times = max_rpm, deque()
    def wait(self):
        now = time.time()
        while self.times and now - self.times[0] > 60: self.times.popleft()
        if len(self.times) >= self.max_rpm: time.sleep(60 - (now-self.times[0]) + .1)
        self.times.append(time.time())
```

Production-এ RPM-এর সঙ্গে TPM ও RPD plan করুন। Queue, cache, Context Caching, admission control এবং fallback model/response/busy message রাখুন। API key বদলালে same-project quota বাড়ে না; paid tier সব limit দূর করে না।

## Further Reading

- [Error Code Reference](/docs/api/errors/)
