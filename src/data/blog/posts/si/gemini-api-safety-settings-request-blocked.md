---
title: Gemini API Safety Settings: Requests block වන්නේ ඇයි
description: Harm categories, BLOCK_NONE, PROHIBITED_CONTENT, model defaults සහ production safety debugging මාර්ගෝපදේශය.
date: 2026-01-22
category: API සංවර්ධනය
tags: [Gemini API, Safety Settings, API Development, Google AI, Error Handling]
readTime: 15
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Empty response හෝ `finishReason: SAFETY` හේතු තුනකින් පැමිණිය හැක: adjustable Harm Category filter, non-adjustable `PROHIBITED_CONTENT` හෝ Terms of Service violation. `BLOCK_NONE` built-in protection bypass නොකරයි.

## Architecture සහ categories

Adjustable `safety_settings` probability (NEGLIGIBLE, LOW, MEDIUM, HIGH) සහ threshold භාවිතා කරයි. Input block `promptFeedback.blockReason`, output block `candidates[0].finishReason` මඟින් වෙන් කරන්න; `safety_ratings` category, probability සහ blocked status දෙයි. Categories: `HARASSMENT`, `HATE_SPEECH`, `SEXUALLY_EXPLICIT`, `DANGEROUS_CONTENT`. Thresholds `OFF`, `BLOCK_NONE`, `BLOCK_ONLY_HIGH`, `BLOCK_MEDIUM_AND_ABOVE`, `BLOCK_LOW_AND_ABOVE` වේ. Production හි explicit settings සහ stable GA model භාවිතා කරන්න.

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

මෙය built-in protection එකකි: CSAM, sensitive PII, seriously illegal harm සහ core prohibited categories. Input review, non-sensitive rephrase හෝ segmentation කරන්න; සැබෑ false positive නම් official support භාවිතා කරන්න. Filter bypass හෝ encoding tricks නොකරන්න.

## Debugging සහ fallback

Input block, no candidates, `finishReason: SAFETY` සහ `safety_ratings` වෙන වෙනම log කරන්න. Model, settings, category probability, request ID සහ timestamp record කරන්න; secret නොකරන්න. Safe refusal, narrower rewrite, human review, cache හෝ alternate workflow fallback තබන්න; safety refusal එකක endless retry නොකරන්න.

## FAQ

`BLOCK_NONE` built-in protection ඉවත් නොකරයි. `blockReason` input සඳහාත් `finishReason` output සඳහාත් වේ. Model defaults වෙනස් විය හැක. සෑම block එකක්ම false positive නොවේ. Privacy-invasive, deceptive, dangerous හෝ child-safety request rephrase කර bypass නොකරන්න.

## Further Reading

- [Error Code Reference](/docs/api/errors/)
