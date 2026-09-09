---
title: Google Gemini API Free Tier Limits 2026: Rate Limits, Quota மற்றும் Best Practices
description: Gemini API free tier-ன் RPM, TPM, RPD, 429 handling, multimodal tokens மற்றும் upgrade decision guide.
date: 2026-01-20
category: API development
tags: [Gemini API, Free Tier, API Limits, Google AI, Development Guide]
readTime: 18
relatedPath: /docs/api/list-models/
relatedTitle: Model List
---

Gemini API free tier learning மற்றும் prototypes-க்கு பயனுள்ளது; limits model மற்றும் project-ஐப் பொறுத்து மாறும். Current official docs-ஐ source of truth ஆகப் பயன்படுத்துங்கள்; பழைய tables-ஐ நிரந்தர guarantee எனக் கருத வேண்டாம்.

## முக்கிய limits

Free tier-ல் பொதுவாக 5–15 RPM, சுமார் 250,000 TPM மற்றும் 100–1,000 RPD இருக்கலாம். Exact limit model, region, account மற்றும் policy-ஐப் பொறுத்தது. Quota project level-ல் அமலும், API key level-ல் அல்ல; ஒரே project-ல் புதிய keys quota அதிகரிக்காது. RPD Pacific midnight-ல் reset ஆகலாம்.

| Model | Use case |
| --- | --- |
| Gemini 2.5 Pro | complex reasoning, குறைந்த RPD |
| Gemini 2.5 Flash | general chat மற்றும் content |
| Gemini 2.5 Flash-Lite | batch, high frequency |
| Gemini 3 Flash Preview | current availability verify |
| Gemini Embeddings | vector embeddings |

Exact numbers-ஐ logged-in AI Studio project rate-limit page மற்றும் official docs மூலம் பாருங்கள்.

## 429 மற்றும் optimization

RPM burst-ல், TPM பெரிய prompt/output-ல், RPD நாளின் calls முடிந்தபின் trigger ஆகும். `429 RESOURCE_EXHAUSTED` வந்தால் metric-ஐ அடையாளம் கண்டு exponential backoff with jitter, குறைந்த concurrency, queue, cache, deduplication மற்றும் குறுகிய prompt பயன்படுத்துங்கள். பழைய screenshot மூலம் reset time ஊகிக்க வேண்டாம்.

```python
from google import genai
from tenacity import retry, stop_after_attempt, wait_exponential

client = genai.Client()

@retry(stop=stop_after_attempt(5), wait=wait_exponential(min=1, max=60))
def call(prompt: str) -> str:
    return client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    ).text
```

`GEMINI_API_KEY`-ஐ environment variable-ல் வையுங்கள்; source, frontend அல்லது chat-ல் வைக்க வேண்டாம்.

## Multimodal tokens மற்றும் paid tier

Input மற்றும் output tokens TPM-ல் சேரும். Image resolution, video sampling, audio/video input quota-ஐ மாற்றலாம். Images compress செய்யவும், video keyframes எடுக்கவும், பெரிய documents-ஐ summary/chunks-ஆகப் பிரிக்கவும். Higher quota மற்றும் production stability-க்கு paid tier, budget alert மற்றும் usage monitoring பார்க்கவும். GPT88 gateway billing மற்றும் quota தனி contract; exact values console-ல் verify செய்யுங்கள்.

Region, age, account, data residency மற்றும் policy தனித்தனி conditions. Random VPN, unknown proxy அல்லது credential sharing மூலம் restriction bypass செய்ய வேண்டாம்.

## FAQ

Universal fixed call count இல்லை. புதிய API key quota அதிகரிக்காது. 429-ல் RPM/TPM/RPD முதலில் கண்டறியுங்கள். Production-ல் logs, queue, cache, backoff மற்றும் usage alerts வைத்திருங்கள்.

## Further Reading

- [Model List](/docs/api/list-models/)
