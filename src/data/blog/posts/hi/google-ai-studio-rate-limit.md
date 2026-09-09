---
title: Google AI Studio Rate Limits: Gemini limit दिखे तो पहले क्या करें
description: AI Studio UI limit, Gemini API 429, project quota, billing और service status को अलग पहचानकर सुरक्षित recovery करें।
date: 2026-05-07
category: API विकास
tags: [Google AI Studio, Gemini, Rate Limits, API Errors, Troubleshooting]
readTime: 12
relatedPath: /docs/api/errors/
relatedTitle: OpenAI-Compatible Error Codes
---

AI Studio में “You've reached your rate limit” दिखे तो इसे एक universal quota number न मानें। पहले current prompt, last usable answer, model, attachments, project clues, समय और timezone सुरक्षित करें। फिर पहचानें कि limit browser UI, Gemini API 429, Cloud project quota, billing, long session या service state से जुड़ी है।

| संकेत | संभावित owner | पहला कदम |
| --- | --- | --- |
| Chat box limit message | UI cooldown/session/model pressure | chat save करें, same UI में short prompt test |
| Code `429 RESOURCE_EXHAUSTED` | API project throttling | error body, RPM/TPM/RPD और project देखें |
| Paid key blocked | wrong project/tier/billing | key का project और billing मिलाएं |
| Dashboard low, UI blocked | lag, wrong project या cooldown | small test और evidence record |

## पहले chat बचाएँ

Prompt, usable answer, exact error, model, attachments, account/project, समय और timezone copy करें। फिर उसी surface पर एक बहुत छोटा prompt भेजें। यदि वह सफल है तो long context, attachments, output length या model pressure समस्या हो सकती है: history छोटा करें, task split करें और output घटाएं। यदि short test भी fail हो तो send loop रोकें, status/project/billing जाँचें और evidence बनाएं।

## Limit owner अलग करें

AI Studio browser chat और Gemini API अलग surfaces हैं। API route में quota project पर लागू होता है, API key पर नहीं; नई keys बनाकर नया quota pool नहीं मिलता। Gemini App subscription भी API project quota का प्रमाण नहीं।

API 429 में project, model, endpoint, input length, output cap, concurrency, RPM/TPM/RPD, status, error body और समय log करें। Concurrency कम करें, queue, deduplication, cache और exponential backoff with jitter लगाएं। पुराने screenshot से fixed wait time न गढ़ें।

## Paid key और dashboard mismatch

Key किस project से जुड़ी है, वही project dashboard खुला है या नहीं, billing active है या नहीं, prepaid/credit/tier/org policy क्या है—जाँचें। Consumer Pro/Ultra plan अपने-आप AI Studio या API quota नहीं बढ़ाता। Dashboard low usage limit न होने का प्रमाण नहीं; wrong project, lag, UI cooldown, model capacity या service status हो सकता है।

## Offload order

1. Original work save करें।
2. New chat में short prompt test करें।
3. सफल हो तो केवल minimal context paste करें।
4. History summarize और attachments हटाएं।
5. Output को एक section/table/checkpoint में बाँटें।
6. अंत में lighter model या cooldown पर विचार करें।

Production workflow में repeated work को observable API route पर ले जाएँ: logs, queue, backoff, usage alerts और budget controls रखें। Multiple keys quota विस्तार नहीं हैं।

## Support evidence

```text
Surface: AI Studio UI / Gemini API / Gemini App
Account and project:
Model:
Time and timezone:
Full message or 429 body:
Short-prompt result:
Billing/status evidence:
Actions taken:
```

API keys, private prompts और billing secrets न भेजें। GPT88 gateway अलग contractual surface है; उसकी limits Google AI Studio UI limits से स्वतः समान नहीं हैं।

## FAQ

Fixed wait time नहीं है; पहले short test करें। Paid API key AI Studio UI limit हटाएगी ही ऐसा नहीं। Multiple keys quota नहीं बढ़ातीं। Dashboard low usage और blocked UI साथ हो सकते हैं। API तब चुनें जब काम को logs, queueing, retries, alerts और stable project ownership चाहिए।

## Further Reading

- [OpenAI-Compatible Error Codes](/docs/api/errors/)
