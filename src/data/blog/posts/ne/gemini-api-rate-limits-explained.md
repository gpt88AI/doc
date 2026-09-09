---
title: Gemini API Rate Limits: वास्तविक quota खोज्नुहोस् र 429 errors ठीक गर्नुहोस्
description: पुराना RPM tables नक्कल नगरी current project/model quota, RPM/TPM/RPD/IPM, safe throughput र 429 बनाम 503 troubleshooting बुझ्नुहोस्।
date: 2026-01-22
category: API विकास
tags: [Gemini API, Rate Limits, Google AI, API Stability, Error Troubleshooting]
readTime: 17
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

“Gemini ले प्रति मिनेट कति requests चलाउँछ?” भन्दा पहिले कुन entry point, project, model, counter र reset window ले request सीमित गरिरहेको छ पत्ता लगाउनुहोस्। Developer API, Gemini app, Firebase AI Logic र Vertex AI का limits एउटै छैनन्। Developer API का लागि [AI Studio rate limits](https://aistudio.google.com/rate-limit) को exact project/model row evidence हो। Entry point, owner, exact model, lane (RPM, input TPM, RPD, IPM, TPD, spend, Priority, Batch) र reset evidence लेख्नुहोस्। `429 RESOURCE_EXHAUSTED` quota/frequency/daily/spend, `503 UNAVAILABLE` temporary capacity हो।

## Project row र key

Official docs ले नियम बताउँछन्, logged-in AI Studio row ले current values दिन्छ। RPM calls, input TPM prompt/context tokens, RPD daily requests; image line मा IPM/TPD हुन सक्छ। Static table production budget होइन। एउटै project का keys एउटै quota pool share गर्छन्; key rotation security का लागि हो, quota बढाउन होइन। Paid billing ले eligibility बदल्छ, तर RPM/TPM/RPD/spend/Batch/Priority limits हटाउँदैन।

## Load test र capacity

Standard, Priority र Batch अलग lanes हुन्; Priority unlimited होइन, Batch urgent interactive कामका लागि होइन।

```text
Request cap = min(current RPM, current input TPM ÷ average input tokens per request)
```

60 RPM, 120,000 input TPM र 4,000 tokens/request भए input TPM cap 30/minute हुन्छ। Margin burst, latency, retry र business risk अनुसार छान्नुहोस्; RPD र spend window अलग जाँच्नुहोस्।

## 429/503 troubleshooting

429 मा project/model row, error body, headers, `Retry-After` र usage हेर्नुहोस्; queue, slow down, input छोटो, wait वा paid path प्रयोग गर्नुहोस्। 503 मा request ID, समय, endpoint/region र service status हेर्नुहोस्; bounded backoff र traffic smoothing गर्नुहोस्। Retry policy मा codes, idempotency, max attempts, time budget, jitter, queue/circuit breaker र escalation evidence लेख्नुहोस्। Keys rotate गर्नु समाधान होइन।

RPM मा burst/concurrency, input TPM मा context/cache, RPD मा unnecessary calls/reset, spend मा admission/alerts, Priority मा returned tier, Batch मा async scheduling र 503 मा capacity path ठीक गर्नुहोस्। Gemini app subscription ले Developer API quota बढाउँदैन; Firebase मा gateway र upstream दुवै; Vertex PayGo limits Developer API जस्तै होइन।

## Runbook र FAQ

Entry point, owner, model, counter, reset window, input p50/p95, latency, burst, daily total, retries, admission, 429/503 stop lines र lanes record गर्नुहोस्। Rate limit project मा हुन्छ, key मा होइन। Paid project मा पनि 429 आउन सक्छ। Batch को छुट्टै pool छ। Multiple projects वास्तविक ownership/security boundary का लागि मात्र राख्नुहोस्।

## Further Reading

- [Error Code Reference](/docs/api/errors/)
