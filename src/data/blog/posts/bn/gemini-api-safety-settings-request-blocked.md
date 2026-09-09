---
title: Gemini API Safety Settings: Request কেন block হয়
description: Harm category, BLOCK_NONE, PROHIBITED_CONTENT, model default এবং production safety debugging-এর সম্পূর্ণ গাইড।
date: 2026-01-22
category: API উন্নয়ন
tags: [Gemini API, Safety Settings, API Development, Google AI, Error Handling]
readTime: 15
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Empty response বা `finishReason: SAFETY` তিন কারণে হতে পারে: adjustable Harm Category filter, non-adjustable `PROHIBITED_CONTENT`, অথবা Terms of Service violation। `BLOCK_NONE` built-in protection bypass করে না।

## Safety architecture ও categories

Adjustable `safety_settings` harm probability (NEGLIGIBLE, LOW, MEDIUM, HIGH) ও threshold ব্যবহার করে। Built-in protection গুরুতর child-safety, PII এবং illegal-harm content-এ প্রযোজ্য। Input block `promptFeedback.blockReason`, output block `candidates[0].finishReason` দিয়ে আলাদা করুন; `safety_ratings`-এ category, probability ও blocked status দেখুন।

| Category | Detect করে | সাধারণ trigger |
| --- | --- | --- |
| `HARASSMENT` | identity/protected attribute targeting | quote, role-play, history |
| `HATE_SPEECH` | rude/offensive language | profanity |
| `SEXUALLY_EXPLICIT` | sexual/obscene content | medical education |
| `DANGEROUS_CONTENT` | harmful guidance | security research, weapons |

Threshold: `OFF`, `BLOCK_NONE`, `BLOCK_ONLY_HIGH`, `BLOCK_MEDIUM_AND_ABOVE`, `BLOCK_LOW_AND_ABOVE`। `BLOCK_NONE` ratings metadata রাখে। Production-এ settings explicit লিখুন এবং legitimate business-এ আগে narrower threshold পরীক্ষা করুন।

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

Model version-এর default বদলাতে পারে; explicit settings রাখুন এবং stable GA model ব্যবহার করুন।

## `PROHIBITED_CONTENT`

`block_reason: PROHIBITED_CONTENT` built-in protection। CSAM, sensitive PII, seriously illegal harm এবং core prohibited category এতে থাকতে পারে। Input review, non-sensitive rephrase, segment করে trigger খোঁজা এবং genuine false positive হলে official support ব্যবহার করুন। Filter bypass বা encoding trick করবেন না।

## Debugging ও production fallback

`promptFeedback` block, candidates না থাকা, `finishReason: SAFETY` এবং `safety_ratings` আলাদা log করুন। Model, settings, category probability, request ID ও timestamp record করুন; secret নয়। Fallback হিসেবে safe refusal, narrower rewrite, human review, cache বা alternate workflow রাখুন। Safety refusal-এ endless retry করবেন না।

```python
def safety_summary(response):
    feedback = getattr(response, "prompt_feedback", None)
    if feedback and getattr(feedback, "block_reason", None):
        return {"input_block": str(feedback.block_reason)}
    if not response.candidates:
        return {"status": "no_candidates"}
    c = response.candidates[0]
    return {"finish_reason": c.finish_reason.name,
            "ratings": [(r.category.name, r.probability.name, r.blocked)
                         for r in (c.safety_ratings or [])]}
```

## FAQ

`BLOCK_NONE` built-in protection সরায় না। `blockReason` input এবং `finishReason` output-এর জন্য। Model defaults পরিবর্তনশীল। সব block false positive নয়। Privacy-invasive, deceptive, dangerous বা child-safety request rephrase করে bypass করা যাবে না।

## Further Reading

- [Error Code Reference](/docs/api/errors/)
