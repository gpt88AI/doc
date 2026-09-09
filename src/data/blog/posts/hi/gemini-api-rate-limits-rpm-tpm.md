---
title: Gemini API Rate Limits Complete Guide: RPM, TPM, 429 और Tier Upgrade
description: RPM, TPM, RPD और IPM limits, Free बनाम Paid tier, production-grade 429 handling और quota-aware architecture की गाइड।
date: 2026-01-22
category: API विकास
tags: [Gemini API, Rate Limits, RPM TPM, 429 Error, API Quota]
readTime: 18
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Gemini API में 429 अक्सर code bug नहीं, multi-dimensional rate limit का परिणाम है। RPM requests/minute, TPM tokens/minute, RPD requests/day और IPM images/minute हैं। ये सभी साथ लागू होते हैं; किसी एक dimension की सीमा पार होने पर request reject हो सकती है। Exact values model, tier, project और current official row पर निर्भर हैं—static January 2026 table को permanent contract न मानें।

## चार limits

- **RPM**: हर API call एक request; burst या बहुत छोटे calls से पहले समाप्त हो सकता है।
- **TPM**: prompt/context/output tokens; बड़े documents में RPM से पहले लग सकता है।
- **RPD**: daily request total; development में repeated tests इसे जल्दी भर सकते हैं।
- **IPM**: image-generation calls के लिए अलग image limit।

सभी limits Google Cloud project पर लागू होती हैं, API key पर नहीं। एक project की कई keys एक pool share करती हैं। Exact model row और current AI Studio rate-limit page देखें।

## Free और Paid tier

Free learning/prototype के लिए है। Tier 1 small production, Tier 2 mid-size और Tier 3 enterprise/custom quota के लिए हो सकते हैं। पुराने RPM/RPD figures को current न मानें; billing enable करने, tier eligibility और model availability को current Google docs से verify करें। अलग model lines की limits अलग हो सकती हैं।

## 429 response और exponential backoff

Response में `429`, `RESOURCE_EXHAUSTED` और कभी `retryDelay` मिल सकता है। Retry केवल 429 के लिए करें; non-429 errors तुरंत surface करें।

```python
import time, random
import google.generativeai as genai

def call_with_retry(prompt, max_retries=5):
    genai.configure(api_key="YOUR_GPT88_API_KEY")
    model = genai.GenerativeModel("gemini-2.5-flash")
    for attempt in range(max_retries):
        try:
            return model.generate_content(prompt).text
        except Exception as exc:
            if "429" not in str(exc) and "RESOURCE_EXHAUSTED" not in str(exc):
                raise
            if attempt == max_retries - 1:
                raise
            delay = min(2 ** attempt, 32)
            time.sleep(delay + random.uniform(0, delay * 0.1))
```

Backoff 1, 2, 4 seconds की तरह बढ़े; jitter synchronized retry storm रोकता है। Max attempts और total time budget अनिवार्य हैं।

## Quota monitoring और optimization

Response headers में उपलब्ध remaining requests/tokens और reset time parse करें, लेकिन production में console metrics से भी cross-check करें। Client-side token bucket या queue रखें और 20–30% margin छोड़ें। Google Cloud Console → APIs & Services → Quotas में utilization देखें; 80% पर alert लगाएँ। Long context छोटा करें, system prompt trim करें, `max_output_tokens` उचित रखें, repeated responses cache करें और जरूरत पर model/tier बदलें।

```python
from collections import deque
import time

class RateLimiter:
    def __init__(self, max_rpm):
        self.max_rpm, self.times = max_rpm, deque()
    def wait(self):
        now = time.time()
        while self.times and now - self.times[0] > 60:
            self.times.popleft()
        if len(self.times) >= self.max_rpm:
            time.sleep(60 - (now - self.times[0]) + 0.1)
        self.times.append(time.time())
```

## Production rules

RPM केवल request frequency नहीं; TPM token volume और RPD daily planning भी करें। High concurrency में queue, cache, Context Caching और admission control जोड़ें। Quota exhausted होने पर cheaper model, cached response, friendly busy message या backup route रखें।

## FAQ

429 का सही कारण RPM, TPM, RPD या IPM में खोजें। API key बदलने से same project quota नहीं बढ़ती। Paid tier limits हटाता नहीं। Exact quota current project/model row से लें।

## Further Reading

- [Error Code Reference](/docs/api/errors/)
