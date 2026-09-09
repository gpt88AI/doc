---
title: Gemini API Safety Settings: Requests کیوں block ہوتی ہیں
description: Harm categories، BLOCK_NONE، PROHIBITED_CONTENT، model defaults اور production safety debugging کی گائیڈ۔
date: 2026-01-22
category: API development
tags: [Gemini API, Safety Settings, API Development, Google AI, Error Handling]
readTime: 15
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Empty response یا `finishReason: SAFETY` کے تین سبب ہو سکتے ہیں: adjustable Harm Category filter، non-adjustable `PROHIBITED_CONTENT` یا Terms of Service violation۔ `BLOCK_NONE` built-in protection bypass نہیں کرتا۔

## Architecture اور categories

Adjustable `safety_settings` probability (NEGLIGIBLE، LOW، MEDIUM، HIGH) اور threshold استعمال کرتا ہے۔ Input block کو `promptFeedback.blockReason` اور output block کو `candidates[0].finishReason` سے الگ کریں؛ `safety_ratings` category، probability اور blocked status دیتی ہے۔ Categories: `HARASSMENT`، `HATE_SPEECH`، `SEXUALLY_EXPLICIT`، `DANGEROUS_CONTENT`۔

Thresholds `OFF`، `BLOCK_NONE`، `BLOCK_ONLY_HIGH`، `BLOCK_MEDIUM_AND_ABOVE` اور `BLOCK_LOW_AND_ABOVE` ہیں۔ Production میں explicit settings رکھیں، stable GA model استعمال کریں، اور legitimate business کے لیے پہلے narrower threshold test کریں۔

```python
from google import genai
from google.genai import types
import os
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
settings = [types.SafetySetting(category=c, threshold=types.HarmBlockThreshold.BLOCK_NONE)
            for c in [types.HarmCategory.HARM_CATEGORY_HARASSMENT,
                      types.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                      types.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                      types.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT]]
response = client.models.generate_content(
    model="gemini-2.5-flash", contents="your prompt",
    config=types.GenerateContentConfig(safety_settings=settings))
```

## `PROHIBITED_CONTENT`

یہ built-in protection ہے: CSAM، sensitive PII، seriously illegal harm اور core prohibited categories۔ Input review کریں، non-sensitive rephrase یا segmentation سے trigger سمجھیں، genuine false positive ہو تو official support استعمال کریں۔ Filter bypass یا encoding tricks نہ کریں۔

## Debugging اور fallback

Input block، no candidates، `finishReason: SAFETY` اور `safety_ratings` الگ log کریں۔ Model، settings، category probability، request ID اور timestamp record کریں، secret نہیں۔ Safe refusal، narrower rewrite، human review، cache یا alternate workflow fallback رکھیں؛ safety refusal پر endless retry نہ کریں۔

## FAQ

`BLOCK_NONE` built-in protection نہیں ہٹاتا۔ `blockReason` input اور `finishReason` output کے لیے ہے۔ Model defaults بدل سکتے ہیں۔ ہر block false positive نہیں۔ Privacy-invasive، deceptive، dangerous یا child-safety request کو rephrase کر کے bypass نہ کریں۔

## Further Reading

- [Error Code Reference](/docs/api/errors/)
