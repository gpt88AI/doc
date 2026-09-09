---
title: Gemini API Rate Limits: உண்மையான quota-வை கண்டுபிடித்து 429 errors சரிசெய்யவும்
description: பழைய RPM tables-ஐ நம்பாமல் current project/model quota, RPM/TPM/RPD/IPM, safe throughput மற்றும் 429 vs 503 troubleshooting அறியவும்.
date: 2026-01-22
category: API மேம்பாடு
tags: [Gemini API, Rate Limits, Google AI, API Stability, Error Troubleshooting]
readTime: 17
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

“Gemini ஒரு நிமிடத்தில் எத்தனை requests?” என்பதற்கு முன் எந்த entry point, project, model, counter, reset window request-ஐ கட்டுப்படுத்துகிறது என்று கண்டறியவும். Developer API, Gemini app, Firebase AI Logic, Vertex AI limits ஒன்றல்ல. Developer API-க்கு [AI Studio rate limits](https://aistudio.google.com/rate-limit) exact project/model row-ஐ evidence ஆகப் பயன்படுத்தவும். Entry point, owner, exact model, lane (RPM, input TPM, RPD, IPM, TPD, spend, Priority, Batch), reset evidence பதிவு செய்யவும். `429 RESOURCE_EXHAUSTED` quota/frequency/daily/spend; `503 UNAVAILABLE` temporary capacity எனப் பிரிக்கவும்.

## Project row மற்றும் key

Official docs விதிகளை விளக்கும்; logged-in AI Studio row current values தரும். RPM calls, input TPM prompt/context tokens, RPD daily requests; image lines IPM/TPD இருக்கலாம். Static tables production budget அல்ல. ஒரே project keys ஒரே quota pool-ஐப் பகிரும்; key rotation security-க்கு, quota-க்கு அல்ல. Paid billing eligibility மாற்றும், ஆனால் RPM/TPM/RPD/spend/Batch/Priority limits நீங்காது.

## Load test மற்றும் capacity

Standard, Priority, Batch தனித்தனி lanes; Priority unlimited அல்ல, Batch urgent interactive வேலைக்கு அல்ல.

```text
Request cap = min(current RPM, current input TPM ÷ average input tokens per request)
```

60 RPM, 120,000 input TPM, 4,000 tokens/request என்றால் TPM cap 30/minute. Margin-ஐ burst, latency, retries, business risk அடிப்படையில் தேர்வு செய்து RPD மற்றும் spend window தனியாகச் சரிபார்க்கவும்.

## 429/503 மற்றும் சரியான fix

429-ல் project/model row, error body, headers, `Retry-After`, usage பார்க்கவும்; queue, slow down, input குறைப்பு, wait அல்லது paid path. 503-ல் request ID, time, endpoint/region, service status; bounded backoff மற்றும் traffic smoothing. Retry policy-ல் codes, idempotency, max attempts, time budget, jitter, queue/circuit breaker மற்றும் escalation evidence இருக்க வேண்டும். Keys rotate செய்வது தீர்வு அல்ல.

RPM-க்கு burst/concurrency, input TPM-க்கு context/cache, RPD-க்கு unnecessary calls/reset, spend-க்கு admission/alerts, Priority-க்கு returned tier, Batch-க்கு async scheduling, 503-க்கு capacity path சரிசெய்யவும். Gemini app subscription Developer API quota உயர்த்தாது; Firebase-ல் gateway மற்றும் upstream இரண்டும்; Vertex PayGo limits Developer API போல அல்ல.

## Runbook மற்றும் FAQ

Entry point, owner, model, counter, reset window, input p50/p95, latency, burst, daily total, retries, admission, 429/503 stop lines மற்றும் lanes பதிவு செய்யவும். Rate limit project-க்கு, key-க்கு அல்ல. Paid project-லும் 429 வரலாம். Batch தனி pool. Multiple projects உண்மையான ownership/security boundary-க்கு மட்டும்.

## Further Reading

- [Error Code Reference](/docs/api/errors/)
