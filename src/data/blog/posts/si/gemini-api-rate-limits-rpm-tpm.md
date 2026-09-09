---
title: Gemini API Rate Limits Complete Guide: RPM, TPM, 429 සහ Tier Upgrade
description: RPM, TPM, RPD සහ IPM limits, Free vs Paid tier, production 429 handling සහ quota-aware architecture මාර්ගෝපදේශය.
date: 2026-01-22
category: API සංවර්ධනය
tags: [Gemini API, Rate Limits, RPM TPM, 429 Error, API Quota]
readTime: 18
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Gemini API හි 429 බොහෝවිට code bug එකක් නොව multi-dimensional rate limit එකකි. RPM requests/minute, TPM tokens/minute, RPD requests/day සහ IPM images/minute වේ. ඕනෑම dimension එකක් ඉක්මවා ගියහොත් request reject විය හැක. Exact values model, tier, project සහ current official row මත රඳා පවතී; static table ස්ථිර contract එකක් නොවේ.

## Limits හතර

- **RPM**: සෑම API call එකක්ම request එකක්; burst එකකදී මුලින්ම අවසන් විය හැක.
- **TPM**: prompt/context/output tokens; විශාල document එකක RPM ට පෙර සීමා විය හැක.
- **RPD**: daily total; repeated tests වලදී ඉක්මනින් පිරෙයි.
- **IPM**: image generation සඳහා වෙනම limit එකක්.

Limits Google Cloud project එකට අදාළය, key එකට නොවේ; එකම project හි keys එකම pool එක share කරයි. Exact model row සහ AI Studio rate-limit page බලන්න. Free learning/prototype සඳහාය; Tier 1/2/3 production scale සඳහා current billing/eligibility verify කරන්න.

## 429 සහ backoff

Response එකේ `429`, `RESOURCE_EXHAUSTED` සහ සමහරවිට `retryDelay` තිබිය හැක. 429 පමණක් retry කරන්න; අනෙක් errors surface කරන්න.

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

Exponential backoff, jitter, max attempts සහ total time budget තබන්න. Headers හි remaining requests/tokens/reset time කියවා console metrics සමඟ cross-check කරන්න. Token bucket/queue එකක 20–30% margin, 80% alert, cache, Context Caching, admission control සහ fallback තබන්න. නව key එකක් same-project quota වැඩි නොකරයි; paid tier සියලු limits ඉවත් නොකරයි.

## Further Reading

- [Error Code Reference](/docs/api/errors/)
