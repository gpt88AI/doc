---
title: Google AI Studio Rate Limits: Gemini limit வந்தால் முதலில் என்ன செய்ய வேண்டும்
description: AI Studio UI limit, Gemini API 429, project quota, billing மற்றும் service status-ஐப் பிரித்து recovery செய்யுங்கள்.
date: 2026-05-07
category: API development
tags: [Google AI Studio, Gemini, Rate Limits, API Errors, Troubleshooting]
readTime: 12
relatedPath: /docs/api/errors/
relatedTitle: OpenAI-Compatible Error Codes
---

AI Studio-ல் “You've reached your rate limit” என்பதை ஒரே quota number எனக் கருத வேண்டாம். Prompt, கடைசி usable answer, model, attachments, project clues, நேரம் மற்றும் timezone-ஐ முதலில் சேமிக்கவும். Limit UI, Gemini API 429, Cloud project quota, billing, long session அல்லது service state-ஐச் சேர்ந்ததா கண்டறியவும்.

| அறிகுறி | சாத்தியமான owner | முதல் நடவடிக்கை |
| --- | --- | --- |
| Chat box limit | UI cooldown/session/model pressure | chat save செய்து short prompt test |
| Code `429 RESOURCE_EXHAUSTED` | API throttling | error body, RPM/TPM/RPD, project |
| Paid key blocked | project/tier/billing mismatch | key project மற்றும் billing match |
| Dashboard low, UI blocked | lag, wrong project, cooldown | small test மற்றும் evidence |

## Chat-ஐ முதலில் பாதுகாக்கவும்

Prompt, usable answer, error, model, attachments, account/project, நேரம் மற்றும் timezone copy செய்யுங்கள். அதே surface-ல் குறுகிய prompt முயற்சிக்கவும். அது வெற்றி பெற்றால் long context, attachments, output length அல்லது model pressure குறைக்கவும்; history summarize, task split, output shrink செய்யுங்கள். Short test-லும் fail என்றால் send loop நிறுத்தி status/project/billing பாருங்கள்.

## Limit owner-ஐப் பிரிக்கவும்

AI Studio browser chat மற்றும் Gemini API வேறு surfaces. API quota project-க்கு பொருந்தும், API key-க்கு அல்ல; புதிய keys புதிய quota pool உருவாக்காது. Gemini App subscription API quota ஆதாரம் அல்ல. API 429-ல் project, model, endpoint, input/output size, concurrency, RPM/TPM/RPD, status, body மற்றும் நேரம் log செய்யுங்கள். Queue, cache, deduplication மற்றும் exponential backoff with jitter பயன்படுத்துங்கள்.

Paid key project, dashboard project, billing state, tier, credit மற்றும் org policy தனித்தனியாக verify செய்யுங்கள். Consumer Pro/Ultra plan தானாக AI Studio அல்லது API quota உயர்த்தாது. Dashboard low usage limit இல்லை என்பதற்கான proof அல்ல; lag, UI cooldown, model capacity அல்லது service status இருக்கலாம்.

## Recovery order

1. Original work save செய்யுங்கள்.
2. New chat-ல் short test செய்யுங்கள்.
3. வெற்றி என்றால் minimal context மட்டும் கொடுங்கள்.
4. History மற்றும் attachments குறைக்கவும்.
5. Output-ஐ சிறிய checkpoints-ஆகப் பிரிக்கவும்.
6. பின்னர் lighter model அல்லது cooldown பரிசீலிக்கவும்.

Production-க்கு logs, queue, backoff, usage alerts மற்றும் budget controls உள்ள API route பயன்படுத்துங்கள். API keys quota expansion அல்ல.

```text
Surface:
Account and project:
Model:
Time and timezone:
Full message or 429 body:
Short-prompt result:
Billing/status evidence:
Actions taken:
```

Keys, private prompts அல்லது billing secrets பகிர வேண்டாம். GPT88 gateway வேறு contractual surface.

## Further Reading

- [OpenAI-Compatible Error Codes](/docs/api/errors/)
