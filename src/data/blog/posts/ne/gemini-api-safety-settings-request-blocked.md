---
title: Gemini API Safety Settings: Requests किन block हुन्छन्
description: Harm categories, BLOCK_NONE, PROHIBITED_CONTENT, model defaults र production safety debugging guide।
date: 2026-01-22
category: API विकास
tags: [Gemini API, Safety Settings, API Development, Google AI, Error Handling]
readTime: 15
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Empty response वा `finishReason: SAFETY` तीन कारणले आउन सक्छ: adjustable Harm Category filter, non-adjustable `PROHIBITED_CONTENT` वा Terms of Service violation। `BLOCK_NONE` ले built-in protection bypass गर्दैन।

## Architecture र categories

Adjustable `safety_settings` ले probability (NEGLIGIBLE, LOW, MEDIUM, HIGH) र threshold प्रयोग गर्छ। Input block `promptFeedback.blockReason`, output block `candidates[0].finishReason` बाट छुट्याउनुहोस्; `safety_ratings` मा category, probability र blocked status हुन्छ। Categories: `HARASSMENT`, `HATE_SPEECH`, `SEXUALLY_EXPLICIT`, `DANGEROUS_CONTENT`। Thresholds `OFF`, `BLOCK_NONE`, `BLOCK_ONLY_HIGH`, `BLOCK_MEDIUM_AND_ABOVE`, `BLOCK_LOW_AND_ABOVE` हुन्। Production मा explicit settings र stable GA model प्रयोग गर्नुहोस्।

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

यो built-in protection हो: CSAM, sensitive PII, seriously illegal harm र core prohibited categories। Input review, non-sensitive rephrase वा segmentation गर्नुहोस्; वास्तविक false positive भए official support प्रयोग गर्नुहोस्। Filter bypass वा encoding tricks नगर्नुहोस्।

## Debugging र fallback

Input block, no candidates, `finishReason: SAFETY` र `safety_ratings` अलग log गर्नुहोस्। Model, settings, category probability, request ID र timestamp record गर्नुहोस्, secret होइन। Safe refusal, narrower rewrite, human review, cache वा alternate workflow fallback राख्नुहोस्; safety refusal मा endless retry नगर्नुहोस्।

## FAQ

`BLOCK_NONE` built-in protection हटाउँदैन। `blockReason` input र `finishReason` output का लागि हो। Model defaults बदलिन सक्छन्। सबै block false positive होइन। Privacy-invasive, deceptive, dangerous वा child-safety request लाई rephrase गरेर bypass नगर्नुहोस्।

## Further Reading

- [Error Code Reference](/docs/api/errors/)
