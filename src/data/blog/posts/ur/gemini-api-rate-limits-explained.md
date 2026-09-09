---
title: Gemini API Rate Limits: اپنی حقیقی quota تلاش کریں اور 429 errors ٹھیک کریں
description: پرانے RPM tables کے بجائے current project/model quota، RPM/TPM/RPD/IPM، safe throughput اور 429 بمقابلہ 503 troubleshooting سمجھیں۔
date: 2026-01-22
category: API development
tags: [Gemini API, Rate Limits, Google AI, API Stability, Error Troubleshooting]
readTime: 17
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

“Gemini کتنی requests per minute چلاتا ہے؟” سے پہلے پوچھیں: کون سا entry point، project، model، counter اور reset window request کو محدود کر رہا ہے؟ Developer API، Gemini app، Firebase AI Logic اور Vertex AI کی limits مختلف ہیں۔ Developer API کے لیے [AI Studio rate limits](https://aistudio.google.com/rate-limit) میں exact project/model row اصل evidence ہے۔ Entry point، owner، exact model، lane (RPM، input TPM، RPD، IPM، TPD، spend، Priority، Batch) اور reset evidence لکھیں۔ `429 RESOURCE_EXHAUSTED` کو quota/frequency/daily/spend سے، `503 UNAVAILABLE` کو temporary capacity سے الگ دیکھیں۔

## Project row، key نہیں، جواب ہے

Official docs قواعد بتاتے ہیں؛ logged-in AI Studio row current values دیتی ہے۔ RPM calls، input TPM prompt/context tokens، RPD daily requests اور بعض image lines IPM/TPD گنتی ہیں۔ Static tables production budget نہیں۔ ایک project کی تمام keys ایک ہی pool share کرتی ہیں؛ key rotation security کے لیے ہے، quota کے لیے نہیں۔ Paid billing eligibility بدلتی ہے مگر RPM، TPM، RPD، spend، Batch اور Priority limits ختم نہیں کرتی۔

## Load test اور capacity

Standard، Priority اور Batch الگ lanes ہیں۔ Priority unlimited نہیں، Batch urgent interactive کام کے لیے نہیں۔

```text
Request cap = min(current RPM, current input TPM ÷ average input tokens per request)
```

مثلاً 60 RPM، 120,000 input TPM اور 4,000 tokens/request میں TPM cap 30/minute پہلے لگے گا۔ Safety margin کو burst، latency، retries اور business risk سے طے کریں؛ RPD اور spend window الگ چیک کریں۔

## 429/503 troubleshooting

429 پر project/model row، full error، headers، `Retry-After` اور recent usage دیکھیں؛ queue، slow down، input مختصر، wait یا billed path اختیار کریں۔ 503 پر request ID، time، endpoint/region اور service status دیکھیں؛ bounded backoff اور traffic smoothing کریں۔ Retry policy میں codes، idempotency، max attempts، time budget، jitter، queue/circuit breaker اور escalation record لکھیں۔ Keys rotate کرنا حل نہیں۔

RPM پر burst smooth/concurrency cap، input TPM پر context/cache، RPD پر unnecessary calls/reset forecast، spend پر admission/alerts، Priority پر returned tier، Batch پر async scheduling اور 503 پر capacity path درست کریں۔ Gemini app subscription Developer API quota نہیں بڑھاتی؛ Firebase میں gateway اور upstream quota دونوں؛ Vertex PayGo Developer API table جیسا نہیں۔

## Runbook اور FAQ

Launch سے پہلے entry point، owner، model، counter، reset window، input p50/p95، latency، burst، daily total، retries، admission، 429/503 stop lines اور Standard/Priority/Batch record کریں۔ Rate limit عموماً project پر ہے، key پر نہیں۔ Paid project بھی 429 دے سکتا ہے۔ Batch کا الگ pool ہے۔ Multiple projects صرف حقیقی ownership/security boundary کے لیے رکھیں۔

## Further Reading

- [Error Code Reference](/docs/api/errors/)
