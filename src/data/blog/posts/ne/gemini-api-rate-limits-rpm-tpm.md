---
title: Gemini API Rate Limits Complete Guide: RPM, TPM, 429 र Tier Upgrade
description: RPM, TPM, RPD र IPM limits, Free बनाम Paid tier, production 429 handling र quota-aware architecture को गाइड।
date: 2026-01-22
category: API विकास
tags: [Gemini API, Rate Limits, RPM TPM, 429 Error, API Quota]
readTime: 18
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Gemini API मा 429 प्रायः code bug होइन, multi-dimensional rate limit हो। RPM requests/minute, TPM tokens/minute, RPD requests/day र IPM images/minute हुन्। कुनै dimension limit नाघे request reject हुन सक्छ। Exact values model, tier, project र current official row मा निर्भर हुन्छन्; static table स्थायी contract होइन।

## चार limits

- **RPM**: हरेक API call एक request; burst मा पहिले सकिन सक्छ।
- **TPM**: prompt/context/output tokens; ठूलो document मा RPM भन्दा पहिले लाग्न सक्छ।
- **RPD**: daily total; repeated test ले छिटो भरिन सक्छ।
- **IPM**: image generation को छुट्टै limit।

Limits Google Cloud project मा हुन्, key मा होइन; एउटै project का keys एउटै pool share गर्छन्। Exact model row र AI Studio rate-limit page हेर्नुहोस्। Free learning/prototype का लागि, Tier 1/2/3 production scale का लागि हो; current billing/eligibility verify गर्नुहोस्।

## 429 र backoff

Response मा `429`, `RESOURCE_EXHAUSTED` र कहिलेकाहीँ `retryDelay` आउन सक्छ। 429 मात्र retry गर्नुहोस्; अरू errors surface गर्नुहोस्।

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
            delay = min(2 ** attempt, 32); time.sleep(delay + random.uniform(0, delay * .1))
```

Exponential backoff, jitter, max attempts र total time budget राख्नुहोस्। Headers बाट remaining requests/tokens/reset time पढेर console metrics सँग cross-check गर्नुहोस्। Token bucket/queue मा 20–30% margin, 80% alert, cache, Context Caching, admission control र fallback राख्नुहोस्। नयाँ key ले same-project quota बढाउँदैन; paid tier ले सबै limit हटाउँदैन।

## Further Reading

- [Error Code Reference](/docs/api/errors/)
