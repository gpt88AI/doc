---
title: Gemini API Safety Settings: Requests ஏன் block ஆகின்றன
description: Harm categories, BLOCK_NONE, PROHIBITED_CONTENT, model defaults மற்றும் production safety debugging வழிகாட்டி.
date: 2026-01-22
category: API மேம்பாடு
tags: [Gemini API, Safety Settings, API Development, Google AI, Error Handling]
readTime: 15
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Empty response அல்லது `finishReason: SAFETY` மூன்று காரணங்களால் வரலாம்: adjustable Harm Category filter, non-adjustable `PROHIBITED_CONTENT` அல்லது Terms of Service violation. `BLOCK_NONE` built-in protection-ஐ bypass செய்யாது.

## Architecture மற்றும் categories

Adjustable `safety_settings` probability (NEGLIGIBLE, LOW, MEDIUM, HIGH) மற்றும் threshold பயன்படுத்துகிறது. Input block-ஐ `promptFeedback.blockReason`, output block-ஐ `candidates[0].finishReason` மூலம் பிரிக்கவும்; `safety_ratings` category, probability, blocked status தரும். Categories: `HARASSMENT`, `HATE_SPEECH`, `SEXUALLY_EXPLICIT`, `DANGEROUS_CONTENT`.

Thresholds `OFF`, `BLOCK_NONE`, `BLOCK_ONLY_HIGH`, `BLOCK_MEDIUM_AND_ABOVE`, `BLOCK_LOW_AND_ABOVE`. Production-ல் settings explicit ஆக வைத்து stable GA model பயன்படுத்தவும்.

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

இது built-in protection: CSAM, sensitive PII, seriously illegal harm மற்றும் core prohibited categories. Input review, non-sensitive rephrase அல்லது segmentation செய்யவும்; உண்மையான false positive என்றால் official support-ஐ அணுகவும். Filter bypass அல்லது encoding tricks வேண்டாம்.

## Debugging மற்றும் fallback

Input block, no candidates, `finishReason: SAFETY`, `safety_ratings` தனித்தனியாக log செய்யவும். Model, settings, category probability, request ID மற்றும் timestamp பதிவு செய்யவும்; secrets வேண்டாம். Safe refusal, narrower rewrite, human review, cache அல்லது alternate workflow fallback வைக்கவும்; safety refusal-ல் endless retry வேண்டாம்.

## FAQ

`BLOCK_NONE` built-in protection-ஐ அகற்றாது. `blockReason` input-க்கும் `finishReason` output-க்கும். Model defaults மாறலாம். ஒவ்வொரு block-மும் false positive அல்ல. Privacy-invasive, deceptive, dangerous அல்லது child-safety request-ஐ rephrase செய்து bypass செய்ய வேண்டாம்.

## Further Reading

- [Error Code Reference](/docs/api/errors/)
