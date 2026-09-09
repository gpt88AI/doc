---
title: Gemini API Rate Limits Complete Guide: RPM, TPM, 429 மற்றும் Tier Upgrade
description: RPM, TPM, RPD, IPM limits, Free vs Paid tier, production 429 handling மற்றும் quota-aware architecture வழிகாட்டி.
date: 2026-01-22
category: API மேம்பாடு
tags: [Gemini API, Rate Limits, RPM TPM, 429 Error, API Quota]
readTime: 18
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Gemini API-யில் 429 பெரும்பாலும் code bug அல்ல; multi-dimensional rate limit. RPM requests/minute, TPM tokens/minute, RPD requests/day, IPM images/minute. எந்த dimension-ஐ கடந்தாலும் request reject ஆகலாம். Exact values model, tier, project, current official row சார்ந்தவை; static table நிரந்தர contract அல்ல.

## நான்கு limits

- **RPM**: ஒவ்வொரு API call ஒரு request; burst-ல் முதலில் முடியும்.
- **TPM**: prompt/context/output tokens; பெரிய document-ல் RPM-க்கு முன் முடியும்.
- **RPD**: daily total; repeated tests-ல் விரைவாக முடியும்.
- **IPM**: image generation-க்கான தனி limit.

Limits Google Cloud project-க்கு, key-க்கு அல்ல; ஒரே project keys ஒரே pool share செய்யும். Exact model row மற்றும் AI Studio rate-limit page பார்க்கவும். Free learning/prototype-க்கு; Tier 1/2/3 production scale-க்கு current billing/eligibility verify செய்யவும்.

## 429 மற்றும் backoff

Response-ல் `429`, `RESOURCE_EXHAUSTED`, சில நேரம் `retryDelay` இருக்கும். 429 மட்டும் retry செய்யவும்; பிற errors-ஐ surface செய்யவும்.

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

Exponential backoff, jitter, max attempts, total time budget வைத்திருங்கள்; retry storm தவிர்க்கவும். Headers-ல் remaining requests/tokens/reset time பார்க்கவும், console metrics-ஐ cross-check செய்யவும். Token bucket/queue-ல் 20–30% margin, 80% alert, cache, Context Caching, admission control மற்றும் fallback வைத்திருக்கவும். Key மாற்றுவது same-project quota உயர்த்தாது; paid tier எல்லா limits-ஐ நீக்காது.

## Further Reading

- [Error Code Reference](/docs/api/errors/)
