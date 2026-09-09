---
title: Google Gemini API Free Tier Limits 2026: Rate Limits, Quota और Best Practices
description: Gemini API free tier के RPM, TPM, RPD, quota बदलाव, 429 handling, multimodal tokens और upgrade decisions की guide।
date: 2026-01-20
category: API विकास
tags: [Gemini API, Free Tier, API Limits, Google AI, Development Guide]
readTime: 18
relatedPath: /docs/api/list-models/
relatedTitle: Model List
---

Gemini API का free tier prototype और learning के लिए उपयोगी है, लेकिन limits model और project के अनुसार बदलती हैं। Current official docs को source of truth मानें; historical tables को स्थायी guarantee न समझें।

## मुख्य free-tier limits

Free tier में सामान्यतः 5–15 RPM, लगभग 250,000 TPM और 100–1,000 RPD हो सकते हैं। Exact limit model, region, account और current policy पर निर्भर है। Quota project level पर लागू होता है, API key level पर नहीं; उसी project में कई keys बनाने से pool नहीं बढ़ता। RPD Pacific midnight पर reset हो सकता है।

| Model | सामान्य स्थिति | Use case |
| --- | --- | --- |
| Gemini 2.5 Pro | कम RPM/RPD | complex reasoning |
| Gemini 2.5 Flash | balanced limits/speed | chat और content |
| Gemini 2.5 Flash-Lite | अधिक RPD | batch/high frequency |
| Gemini 3 Flash Preview | current availability verify करें | latest features |
| Gemini Embeddings | अलग quota | vector embeddings |

Exact numbers के लिए logged-in AI Studio project rate-limit page और official docs देखें।

## Model selection

Pro reasoning में मजबूत है लेकिन free tier पर छोटे learning workloads के लिए रखें। Flash general chat और real-time interaction का अच्छा संतुलन है। Flash-Lite routine batch processing और अधिक daily calls के लिए practical है। Free tier production SLA नहीं है।

## Quota changes और 429

यदि quotas बदले या अचानक 429 आने लगे तो RPM, TPM और RPD अलग करें। RPM burst में fail होता है; TPM long prompt/output से; RPD दिन भर के calls के बाद। 429 पर exponential backoff with jitter, कम concurrency, queue, cache, deduplication और छोटा prompt उपयोग करें। पुराने blog या screenshot से reset time न गढ़ें।

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

`GEMINI_API_KEY` को environment variable में रखें। Key को source, frontend या chat में न डालें।

## Multimodal token planning

Text और output tokens TPM में जुड़ते हैं। Image resolution बढ़ने पर tokens बढ़ सकते हैं; video sampling rate के अनुसार tokens लेता है; audio और video अलग count हो सकते हैं। Images compress करें, video में keyframes निकालें और लंबे documents को summary/chunks में बाँटें। RPM अक्सर TPM से पहले bottleneck बन सकता है।

## Paid tier और alternatives

Higher quota, stable production traffic, budget alerts और support चाहिए तो paid project tier evaluate करें। Free quota, billing और model availability को अलग जाँचें। GPT88 जैसे unified gateway में अलग billing और quota contract होता है; exact models, prices और limits console से verify करें।

Region restrictions, age, account, data residency और current Google policy अलग conditions हैं। Restricted access को random VPN, unknown proxy या credential sharing से bypass न करें।

## FAQ

Free tier में fixed universal image/call count नहीं। नई API key quota नहीं बढ़ाती। 429 में पहले metric पहचानें। Multimodal input quota जल्दी consume कर सकता है। Production में logs, queue, cache, backoff और usage alerts रखें।

## Further Reading

- [Model List](/docs/api/list-models/)
