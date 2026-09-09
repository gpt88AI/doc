---
title: Gemini API Rate Limits: अपनी वास्तविक quota खोजें और 429 errors ठीक करें
description: पुराने RPM tables कॉपी करने के बजाय current project और model quota, RPM/TPM/RPD/IPM, safe throughput और 429 बनाम 503 troubleshooting समझें।
date: 2026-01-22
category: API विकास
tags: [Gemini API, Rate Limits, Google AI, API Stability, Error Troubleshooting]
readTime: 17
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

“Gemini कितने requests per minute चला सकता है?” से पहले पूछें: कौन-सा entry point, project, model, counter और reset window request को सीमित कर रहा है? Developer API, Gemini app, Firebase AI Logic और Vertex AI की limits एक जैसी नहीं हैं। Developer API के लिए current evidence [AI Studio rate limits](https://aistudio.google.com/rate-limit) में exact project और model row है।

पहले ये पाँच बातें लिखें: entry point; owner (Cloud project, consumer account या Firebase project); exact model/feature; limit lane (RPM, input TPM, RPD, IPM, TPD, spend, Priority, Batch); और reset evidence। `429 RESOURCE_EXHAUSTED` पहले quota/frequency/daily/spend eligibility के विरुद्ध जाँचें; `503 UNAVAILABLE` temporary overload/capacity के विरुद्ध। API keys rotate करके या forever retry करके समस्या न छिपाएँ।

## Current project row ही उत्तर है

Official rate-limit docs rules समझाते हैं, पर logged-in AI Studio row ही current project/model/tier के live values देती है। Static table production budget नहीं है। RPM calls गिनता है; input TPM prompt/context tokens; RPD लागू होने पर daily requests और सामान्यतः Pacific-time midnight पर reset; कुछ lines में IPM/TPD भी हो सकते हैं। Preview model का exact ID incident record में लिखें।

### Quota project की होती है, key की नहीं

एक project की अनेक keys एक ही RPM/TPM/RPD pool share करती हैं। Key rotation permission/security के लिए है, quota बढ़ाने के लिए नहीं। अलग projects केवल वास्तविक environment, billing, security या organizational boundary होने पर रखें और routing/cost/failure isolation record करें।

### Paid tier भी limits हटाता नहीं

Billing account tier eligibility बदलता है, लेकिन RPM, input TPM, RPD, spend window, Batch या Priority limits फिर भी लग सकती हैं। Tier, model row और spend rules current account पर verify करें; पुराने numbers स्थायी वादा नहीं हैं।

## Load test से पहले windows और lanes अलग करें

Standard, Priority और Batch अलग processing lanes हैं। RPM burst control करता है; input TPM request size; RPD daily total; spend window rolling eligibility; Priority का अपना returned service tier; Batch async quota pool। Priority को unlimited capacity न मानें। Batch को urgent interactive work में न भरें। Load record में model/project, input-token p50/p95, burst multiplier, lane, p95 latency, daily total, spend risk और retry ratio रखें।

## Quota से runnable capacity निकालें

```text
Request cap = min(current RPM, current input TPM ÷ average input tokens per request)
```

यह starting calculation है, production target नहीं। उदाहरण: 60 RPM और 120,000 input TPM, average 4,000 tokens ⇒ RPM cap 60, TPM cap 30, इसलिए pre-margin cap 30 requests/minute। Team यदि 20% margin चुने तो target 24/minute (0.4 RPS) होगा। Margin Google recommendation नहीं; burst, latency, retries और business risk के आधार पर चुनें। Daily RPD और spend window अलग जाँचें।

## 429 पर पहले exhausted dimension खोजें

| Status | पहला अर्थ | कार्रवाई |
| --- | --- | --- |
| `429 RESOURCE_EXHAUSTED` | quota, frequency, daily, spend या eligibility limit | queue, slow down, input छोटा, सही window का इंतज़ार, billed/quota path |
| `503 UNAVAILABLE` | temporary overload/capacity | bounded backoff, traffic smoothing, endpoint/capacity जांच |

Retry policy में retryable codes, idempotency, max attempts, total time budget, exponential backoff+jitter, `Retry-After`, queue/circuit breaker, original बनाम retry traffic और escalation evidence तय करें। Key rotation इसका विकल्प नहीं।

## जिस limit ने रोका, उसी को ठीक करें

RPM पर burst smooth और concurrency cap; input TPM पर context छोटा/cache; RPD पर unnecessary calls हटाकर reset/forecast; spend पर admission और cost alerts; Priority पर returned tier देखें; Batch पर async scheduling; 503 पर bounded backoff और उपयुक्त capacity path। Model बदलना तभी जब नया model उपलब्ध हो और bottleneck वास्तव में दूर करे।

## Gemini app, Firebase और Vertex limits न मिलाएँ

Gemini app consumer-account usage है; subscription Developer API quota नहीं बढ़ाती। Firebase में per-user gateway limit और upstream Gemini project quota दोनों लागू हो सकते हैं; lower layer पहले throttle करती है। Vertex PayGo Dynamic Shared Quota/Provisioned Throughput पर चलता है; Developer API RPM table वहाँ लागू न करें।

## Launch runbook

Entry point, owner project/billing, exact model, applicable counter, reset window, input p50/p95, latency, burst, daily total, retry ratio, admission controls, 429/503 stop lines, Standard/Priority/Batch lanes और credential-safe escalation evidence लिखें। Near-production input lengths पर burst और duration दोनों test करें।

## FAQ

Rate limits सामान्यतः API key नहीं, Cloud project पर होती हैं। Daily cap universal नहीं; exact row में RPD/TPD देखें। Paid project में भी 429 संभव है। Wait time exhausted window पर निर्भर है और `Retry-After` मानें। Batch का अलग quota pool है। Gemini app subscription API quota नहीं बढ़ाती। Vertex limits Developer API जैसी नहीं। Multiple projects को केवल वास्तविक ownership/security boundaries में रखें, limit bypass के लिए नहीं।

## Further Reading

- [Error Code Reference](/docs/api/errors/)
