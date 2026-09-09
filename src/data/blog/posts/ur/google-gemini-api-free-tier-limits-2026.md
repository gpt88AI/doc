---
title: Google Gemini API Free Tier Limits 2026: Rate Limits، Quota اور Best Practices
description: Gemini API free tier کے RPM، TPM، RPD، 429 handling، multimodal tokens اور upgrade decision کی رہنمائی۔
date: 2026-01-20
category: API development
tags: [Gemini API, Free Tier, API Limits, Google AI, Development Guide]
readTime: 18
relatedPath: /docs/api/list-models/
relatedTitle: Model List
---

Gemini API free tier learning اور prototypes کے لیے مفید ہے، مگر limits model اور project کے مطابق بدلتی ہیں۔ Current official docs کو source of truth سمجھیں؛ پرانی tables کو مستقل guarantee نہ مانیں۔

## بنیادی limits

Free tier میں عموماً 5–15 RPM، تقریباً 250,000 TPM اور 100–1,000 RPD ہو سکتے ہیں۔ Exact limit model، region، account اور policy پر منحصر ہے۔ Quota project level پر ہے، API key level پر نہیں؛ ایک project میں نئی keys quota نہیں بڑھاتیں۔ RPD Pacific midnight پر reset ہو سکتا ہے۔

| Model | استعمال |
| --- | --- |
| Gemini 2.5 Pro | complex reasoning، کم RPD |
| Gemini 2.5 Flash | general chat اور content |
| Gemini 2.5 Flash-Lite | batch اور high frequency |
| Gemini 3 Flash Preview | current availability verify کریں |
| Gemini Embeddings | vector embeddings |

Exact numbers logged-in AI Studio project rate-limit page اور official docs سے دیکھیں۔

## 429 اور optimization

RPM burst میں، TPM بڑے prompt/output میں، اور RPD دن بھر کے calls کے بعد trigger ہوتا ہے۔ `429 RESOURCE_EXHAUSTED` پر metric پہچانیں، exponential backoff with jitter، کم concurrency، queue، cache، deduplication اور مختصر prompts استعمال کریں۔ پرانے screenshots سے reset time نہ گھڑیں۔

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

`GEMINI_API_KEY` environment variable میں رکھیں؛ source، frontend یا chat میں نہ ڈالیں۔

## Multimodal tokens اور paid tier

Input اور output tokens TPM میں شامل ہیں۔ Image resolution، video sampling اور audio/video input quota بدل سکتے ہیں۔ Images compress کریں، video کے keyframes نکالیں اور بڑے documents کو summary/chunks میں بانٹیں۔ Higher quota اور production stability کے لیے paid tier، budget alerts اور usage monitoring دیکھیں۔ GPT88 gateway کی billing اور quota الگ contract ہے؛ exact values console سے verify کریں۔

Region، age، account، data residency اور Google policy الگ conditions ہیں۔ Random VPN، unknown proxy یا credential sharing سے restriction bypass نہ کریں۔

## FAQ

Universal fixed call count نہیں۔ نئی API key quota نہیں بڑھاتی۔ 429 میں پہلے RPM/TPM/RPD شناخت کریں۔ Production میں logs، queue، cache، backoff اور usage alerts رکھیں۔

## Further Reading

- [Model List](/docs/api/list-models/)
