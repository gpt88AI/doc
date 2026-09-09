---
title: Gemini API Safety Settings: Requests क्यों block होती हैं
description: Harm categories, BLOCK_NONE, PROHIBITED_CONTENT, model defaults और production safety-debugging की पूरी गाइड।
date: 2026-01-22
category: API विकास
tags: [Gemini API, Safety Settings, API Development, Google AI, Error Handling]
readTime: 15
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Gemini API में empty response या `finishReason: SAFETY` आने पर तीन अलग कारण हो सकते हैं: adjustable Harm Category filter, non-adjustable `PROHIBITED_CONTENT` protection, या Terms of Service violation। `BLOCK_NONE` भी built-in protection को bypass नहीं करता।

## Safety architecture

Adjustable `safety_settings` चार categories की harm probability (NEGLIGIBLE, LOW, MEDIUM, HIGH) और threshold पर काम करता है। Built-in protection गंभीर child-safety, PII और illegal-harm content पर लागू होती है और configuration से बंद नहीं होती। Input block को `promptFeedback.blockReason` और output block को `candidates[0].finishReason` से अलग करें: `SAFETY` output generation block है; `STOP` normal completion है। `safety_ratings` में category, probability और blocked status देखें।

## चार Harm Categories

| Category | क्या detect करती है | सामान्य trigger |
| --- | --- | --- |
| `HARASSMENT` | identity/protected attribute पर harmful targeting | quotes, role-play, historical text |
| `HATE_SPEECH` | rude/offensive language | profanity वाले legitimate inputs |
| `SEXUALLY_EXPLICIT` | sexual/obscene content | medical/health discussion |
| `DANGEROUS_CONTENT` | harmful behavior guidance | security research, red-team, weapons instructions |

## Thresholds

`OFF` filtering disable करता है; `BLOCK_NONE` block नहीं करता लेकिन ratings metadata रखता है; `BLOCK_ONLY_HIGH` केवल HIGH; `BLOCK_MEDIUM_AND_ABOVE` MEDIUM/HIGH; `BLOCK_LOW_AND_ABOVE` LOW/MEDIUM/HIGH। Production में explicit settings लिखें और legitimate business के लिए पहले `BLOCK_ONLY_HIGH` जैसे narrower adjustment का test करें।

```python
from google import genai
from google.genai import types
import os

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
settings = [
    types.SafetySetting(category=c, threshold=types.HarmBlockThreshold.BLOCK_NONE)
    for c in [
        types.HarmCategory.HARM_CATEGORY_HARASSMENT,
        types.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        types.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        types.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    ]
]
response = client.models.generate_content(
    model="gemini-2.5-flash", contents="your prompt",
    config=types.GenerateContentConfig(safety_settings=settings),
)
```

Model versions के defaults बदल सकते हैं; इसलिए हर model पर explicit settings रखें। Stable GA models को experimental aliases पर प्राथमिकता दें।

## `PROHIBITED_CONTENT` bypass नहीं होता

`block_reason: PROHIBITED_CONTENT` built-in protection है। CSAM, sensitive PII, seriously illegal harm और core prohibited categories इसमें आ सकती हैं। Input review करें, intent को non-sensitive तरीके से rephrase करें, लंबे input को segments में बाँटकर trigger खोजें और genuine false positive होने पर official support/forum में report करें। Filter bypass, euphemism या encoding tricks न अपनाएँ।

## Debugging flow

```python
def check_response_safety(response):
    feedback = getattr(response, "prompt_feedback", None)
    if feedback and getattr(feedback, "block_reason", None):
        return False, f"prompt blocked: {feedback.block_reason}"
    if not response.candidates:
        return False, "no candidates"
    candidate = response.candidates[0]
    reason = candidate.finish_reason.name
    ratings = [
        (r.category.name, r.probability.name, r.blocked)
        for r in (candidate.safety_ratings or [])
    ]
    return reason == "STOP", {"finish_reason": reason, "ratings": ratings}
```

Input block और output block अलग log करें; prompt content, model, settings, category probabilities, request ID और timestamp record करें, secrets नहीं। Production fallback में safe refusal, narrower rewrite, human review, cached result या alternate workflow रखें। Safety refusal पर endless retry न करें।

## FAQ

`BLOCK_NONE` built-in protection नहीं हटाता। `finishReason` output और `blockReason` input के बारे में है। Model defaults version के अनुसार बदलते हैं। हर safety block false positive नहीं। CSAM, privacy-invasive, deceptive या dangerous request को rephrase करके bypass नहीं करना चाहिए।

## Further Reading

- [Error Code Reference](/docs/api/errors/)
