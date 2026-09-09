---
title: Google Gemini API Free Tier Limits 2026: Rate Limits, Quota र Best Practices
description: Gemini API free tier का RPM, TPM, RPD, 429 handling, multimodal tokens र upgrade decision guide।
date: 2026-01-20
category: API विकास
tags: [Gemini API, Free Tier, API Limits, Google AI, Development Guide]
readTime: 18
relatedPath: /docs/api/list-models/
relatedTitle: Model List
---

Gemini API free tier learning र prototypes का लागि उपयोगी छ, तर limits model र project अनुसार बदलिन्छन्। Current official docs लाई source of truth मान्नुहोस्; पुराना tables लाई स्थायी guarantee नमान्नुहोस्।

## मुख्य limits

Free tier मा सामान्यतः 5–15 RPM, करिब 250,000 TPM र 100–1,000 RPD हुन सक्छ। Exact limit model, region, account र policy मा निर्भर हुन्छ। Quota project level मा लागू हुन्छ, API key level मा होइन; एउटै project मा नयाँ keys ले quota बढाउँदैनन्। RPD Pacific midnight मा reset हुन सक्छ।

| Model | Use case |
| --- | --- |
| Gemini 2.5 Pro | complex reasoning, कम RPD |
| Gemini 2.5 Flash | general chat र content |
| Gemini 2.5 Flash-Lite | batch, high frequency |
| Gemini 3 Flash Preview | current availability verify |
| Gemini Embeddings | vector embeddings |

Exact number logged-in AI Studio project rate-limit page र official docs बाट हेर्नुहोस्।

## 429 र optimization

RPM burst मा, TPM ठूलो prompt/output मा, RPD दिनका calls सकिएपछि trigger हुन्छ। `429 RESOURCE_EXHAUSTED` आए metric पहिचान गर्नुहोस्; exponential backoff with jitter, कम concurrency, queue, cache, deduplication र छोटो prompt प्रयोग गर्नुहोस्। पुरानो screenshot बाट reset time अनुमान नगर्नुहोस्।

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

`GEMINI_API_KEY` environment variable मा राख्नुहोस्; source, frontend वा chat मा नराख्नुहोस्।

## Multimodal tokens र paid tier

Input र output tokens TPM मा गनिन्छन्। Image resolution, video sampling र audio/video input ले quota बदल्न सक्छ। Images compress गर्नुहोस्, video का keyframes निकाल्नुहोस् र ठूला documents summary/chunks मा बाँड्नुहोस्। Higher quota र production stability का लागि paid tier, budget alert र usage monitoring हेर्नुहोस्। GPT88 gateway को billing र quota अलग contract हो; exact values console बाट verify गर्नुहोस्।

Region, age, account, data residency र policy अलग conditions हुन्। Random VPN, unknown proxy वा credential sharing बाट restriction bypass नगर्नुहोस्।

## FAQ

Universal fixed call count छैन। नयाँ API key ले quota बढाउँदैन। 429 मा पहिले RPM/TPM/RPD पहिचान गर्नुहोस्। Production मा logs, queue, cache, backoff र usage alerts राख्नुहोस्।

## Further Reading

- [Model List](/docs/api/list-models/)
