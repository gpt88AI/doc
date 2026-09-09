---
title: Google AI Studio Rate Limits: Gemini limit آئے تو پہلے کیا کریں
description: AI Studio UI limit، Gemini API 429، project quota، billing اور service status کو الگ کر کے recovery کریں۔
date: 2026-05-07
category: API development
tags: [Google AI Studio, Gemini, Rate Limits, API Errors, Troubleshooting]
readTime: 12
relatedPath: /docs/api/errors/
relatedTitle: OpenAI-Compatible Error Codes
---

AI Studio میں “You've reached your rate limit” کو universal quota نہ سمجھیں۔ پہلے prompt، آخری usable answer، model، attachments، project clues، وقت اور timezone محفوظ کریں۔ پھر معلوم کریں کہ limit UI، Gemini API 429، Cloud project quota، billing، long session یا service state سے متعلق ہے۔

| اشارہ | ممکنہ owner | پہلا قدم |
| --- | --- | --- |
| Chat box limit | UI cooldown/session/model pressure | chat save، same UI میں short prompt test |
| Code `429 RESOURCE_EXHAUSTED` | API throttling | error body، RPM/TPM/RPD، project دیکھیں |
| Paid key blocked | project/tier/billing mismatch | key کا project اور billing ملائیں |
| Dashboard low، UI blocked | lag، wrong project یا cooldown | small test اور evidence record |

## پہلے chat محفوظ کریں

Full prompt، usable answer، error، model، attachments، account/project، وقت اور timezone copy کریں۔ اسی surface پر ایک مختصر prompt آزمائیں۔ اگر کامیاب ہو تو long context، attachments، output length یا model pressure کم کریں؛ history summarize، task split اور output shrink کریں۔ اگر short test بھی fail ہو تو send loop روکیں، status/project/billing چیک کریں۔

## Limit owner الگ کریں

AI Studio browser chat اور Gemini API الگ surfaces ہیں۔ API quota project پر لاگو ہوتا ہے، API key پر نہیں؛ نئی keys نیا quota pool نہیں بناتیں۔ Gemini App subscription API quota کا ثبوت نہیں۔ API 429 میں project، model، endpoint، input/output size، concurrency، RPM/TPM/RPD، status، body اور وقت log کریں۔ Queue، cache، deduplication اور exponential backoff with jitter لگائیں۔

Paid key کا project، dashboard کا project، billing state، tier، credit اور org policy الگ verify کریں۔ Consumer Pro/Ultra plan خودکار طور پر AI Studio یا API quota نہیں بڑھاتا۔ Dashboard کم usage limit نہ ہونے کا ثبوت نہیں؛ lag، UI cooldown، model capacity یا service status بھی ہو سکتے ہیں۔

## Recovery order

1. Original work save کریں۔
2. New chat میں short test کریں۔
3. کامیاب ہو تو minimal context دیں۔
4. History اور attachments کم کریں۔
5. Output کو چھوٹے checkpoints میں بانٹیں۔
6. آخر میں lighter model یا cooldown دیکھیں۔

Production کے لیے logs، queue، backoff، usage alerts اور budget controls والا API route رکھیں۔ API keys quota expansion نہیں ہیں۔

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

Keys، private prompts یا billing secrets share نہ کریں۔ GPT88 gateway الگ contractual surface ہے۔

## Further Reading

- [OpenAI-Compatible Error Codes](/docs/api/errors/)
