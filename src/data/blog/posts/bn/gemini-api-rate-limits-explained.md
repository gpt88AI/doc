---
title: Gemini API Rate Limits: আপনার বাস্তব quota খুঁজে 429 error ঠিক করুন
description: পুরনো RPM table কপি না করে current project/model quota, RPM/TPM/RPD/IPM, safe throughput এবং 429 বনাম 503 troubleshooting বুঝুন।
date: 2026-01-22
category: API উন্নয়ন
tags: [Gemini API, Rate Limits, Google AI, API Stability, Error Troubleshooting]
readTime: 17
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

“Gemini কত request per minute চালায়?”-এর আগে জিজ্ঞেস করুন: কোন entry point, project, model, counter ও reset window request-কে সীমিত করছে? Developer API, Gemini app, Firebase AI Logic ও Vertex AI-এর limit এক নয়। Developer API-র current evidence exact project/model row-এ [AI Studio rate limits](https://aistudio.google.com/rate-limit)-এ থাকে। Entry point, owner, exact model, limit lane (RPM, input TPM, RPD, IPM, TPD, spend, Priority, Batch) এবং reset evidence record করুন। `429 RESOURCE_EXHAUSTED` quota/frequency/daily/spend হিসেবে আগে দেখুন; `503 UNAVAILABLE` temporary capacity হিসেবে।

## Current project row-ই উত্তর

Official docs নিয়ম ব্যাখ্যা করে, কিন্তু logged-in AI Studio row current project/model/tier-এর live value দেয়। RPM call গোনে; input TPM prompt/context token; RPD প্রযোজ্য হলে daily request; image line-এ IPM/TPD থাকতে পারে। Static table production budget নয়।

### Quota project-এর, key-এর নয়

এক project-এর সব API key একই RPM/TPM/RPD pool share করে। Key rotation security ও permission-এর জন্য, quota বাড়ানোর জন্য নয়। আলাদা project কেবল বাস্তব environment, billing, security বা organizational boundary থাকলে রাখুন।

### Paid tier limit মুছে দেয় না

Billing tier eligibility বদলায়, কিন্তু RPM, input TPM, RPD, spend window, Batch ও Priority limit চলতে পারে। Current account-এর tier/model row এবং spend rule যাচাই করুন।

## Load test-এর আগে windows/lane আলাদা করুন

Standard, Priority ও Batch আলাদা processing lane। RPM burst, input TPM request size, RPD daily total, spend rolling window, Priority service tier এবং Batch async pool নিয়ন্ত্রণ করে। Priority unlimited নয়; Batch-এ urgent interactive task দেবেন না। Model/project, input p50/p95, burst, lane, p95 latency, daily total, spend risk ও retry ratio record করুন।

## Runnable capacity

```text
Request cap = min(current RPM, current input TPM ÷ average input tokens per request)
```

উদাহরণ: 60 RPM, 120,000 input TPM, average 4,000 tokens হলে TPM cap 30/minute; সেটিই আগে বাধা। Team 20% margin নিলে 24/minute target। এটি engineering assumption, Google recommendation নয়। Daily RPD ও spend window আলাদাভাবে দেখুন।

## 429 এবং 503

`429 RESOURCE_EXHAUSTED`-এ full error, headers, `Retry-After`, project/model row ও recent usage দেখুন; queue, slow down, input ছোট, wait বা billed path নিন। `503 UNAVAILABLE`-এ request ID, time, endpoint/region ও status দেখুন; bounded backoff ও traffic smoothing করুন। Retry policy-তে retryable codes, idempotency, max attempts, total budget, jitter, queue/circuit breaker ও escalation record লিখুন। Key rotation সমাধান নয়।

## Actual blocker ঠিক করুন

RPM হলে burst smooth/concurrency cap; input TPM হলে context ছোট/cache; RPD হলে unnecessary call কমিয়ে reset/forecast; spend হলে admission/cost alert; Priority-তে returned tier; Batch-এ async scheduling; 503-এ capacity path। Model বদলাবেন কেবল নতুন model সত্যিই bottleneck কমালে।

## App, Firebase ও Vertex আলাদা

Gemini app consumer limit; subscription Developer API quota বাড়ায় না। Firebase-এ per-user gateway ও upstream Gemini project quota—lower layer আগে throttle করে। Vertex PayGo Dynamic Shared Quota/Provisioned Throughput ব্যবহার করে; Developer API table সেখানে সরাসরি প্রয়োগ করবেন না।

## Launch runbook ও FAQ

Entry point, owner, model, counter, reset window, input p50/p95, latency, burst, daily total, retries, admission, 429/503 stop line এবং Standard/Priority/Batch lane record করুন। Key quota নয়, project quota। Paid project-এও 429 হতে পারে। Batch-এর আলাদা pool আছে। Multiple project কেবল বাস্তব ownership/security boundary-তে ব্যবহার করুন, bypass হিসেবে নয়।

## Further Reading

- [Error Code Reference](/docs/api/errors/)
