---
title: Gemini API Free Tier Limits (2026): Project quota, API key এবং paid boundary
description: Gemini API free tier কীভাবে পড়বেন: model line-এর Free Tier status, project quota, API key ownership, AI Studio RPM/TPM/RPD এবং paid project-এ যাওয়ার সময়।
date: 2026-04-25
category: API উন্নয়ন
tags: [Gemini API, Free Tier, Rate Limits, AI Studio, Google AI]
readTime: 12
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

Gemini API free tier কোনো একক স্থির public number নয়। প্রকৃত capacity Google Cloud project, model, usage tier, region, billing status এবং current policy-এর উপর নির্ভর করে। 16 জুলাই 2026-এ সঠিক পদ্ধতি: official pricing page-এ exact model/feature-এর Free Tier দেখুন; তারপর key তৈরি করা AI Studio project-এ গিয়ে live RPM, TPM, RPD, reset rules ও usage দেখুন। একই project-এ বহু key বানালে quota বাড়ে না; key credential, project quota ও billing-এর owner।

## Free Tier-এর তিনটি আলাদা প্রশ্ন

1. Exact model/feature এখনও free কি না—current pricing page থেকে দেখুন।
2. Rate limit কীভাবে মাপা হয়—RPM, TPM, RPD; image line-এ IPM-ও থাকতে পারে।
3. এই project এখন কত ব্যবহার করতে পারে—AI Studio project view-এর operational answer।

| প্রশ্ন | উত্তর | কোথায় দেখবেন |
| --- | --- | --- |
| Gemini API free? | কিছু model/feature line-এ Free Tier আছে | Official pricing |
| Exact quota? | project, model, tier, region, billing নির্ভর | AI Studio usage |
| প্রতি key আলাদা quota? | না; project quota own করে | Key/project settings |
| সীমা পার হলে? | সাধারণত 429 বা `RESOURCE_EXHAUSTED` | Troubleshooting docs |
| Production-এ free tier? | কেবল low-risk, low-traffic, failure-tolerant কাজ | Billing/data docs |

## Source ownership

Pricing page Free Tier status, rate-limit docs RPM/TPM/RPD, key docs project context, billing docs paid boundary/data processing, এবং troubleshooting docs 429/region/billing/model failure ব্যাখ্যা করে। **Model free status, project live quota এবং billing status আলাদা surface।**

## API key quota pool নয়

API key authentication credential; independent free bucket নয়। একই project-এর Key A/B/C একই quota ভাগ করে। 429 হলে নতুন same-project key বানিয়ে সাধারণত লাভ নেই। Key rotation/security-এর জন্য key ব্যবহার করুন, quota বাড়ানোর জন্য নয়। Account, Cloud project, billing, exact model ID এবং AI Studio-তে একই project খোলা আছে কি না যাচাই করুন। Auth migration quota বাড়ায় না; নতুন AI Studio key auth key default করতে পারে এবং standard key 2026 সালের সেপ্টেম্বর থেকে reject হতে পারে।

## Free Tier-এর ব্যবহার

Learning, prompt validation, synthetic-data prototype এবং occasional internal tool-এর জন্য Free Tier উপযুক্ত। Real user, sensitive/commercial data, stable throughput, frequent 429 বা paid-only model হলে billed project ব্যবহার করুন। একই model family নাম দেখে free status অনুমান করবেন না; text line free হলেও image বা preview line paid হতে পারে। Exact model ID এবং Standard/Batch/Flex/Priority line current pricing ও project view থেকে যাচাই করুন।

Cloud free-trial credit Gemini API-তে স্বয়ংক্রিয়ভাবে প্রযোজ্য ধরে নেবেন না। Billing চালু করলে plan, balance, auto-recharge ও budget alert monitor করুন; balance zero হলে free tier-এ স্বয়ংক্রিয় fallback নাও হতে পারে।

## Real-time quota যাচাই

1. Key manager account দিয়ে AI Studio খুলুন।
2. App যে exact project ব্যবহার করে সেটি নির্বাচন করুন।
3. Usage/rate-limit view খুলুন।
4. Model ID নিশ্চিত করুন।
5. RPM, TPM, RPD, reset, tier ও billing status record করুন।
6. Release, demo, migration ও traffic change-এর আগে আবার দেখুন।

Release record-এ project/account, key type/migration status, model/execution line, live values ও check date, billing plan/balance owner এবং backoff/cache/fallback strategy লিখুন।

## 429 বা `RESOURCE_EXHAUSTED` হলে

Project verify করুন; model/API surface verify করুন; RPM/TPM/RPD আলাদা দেখুন; concurrency কমিয়ে exponential backoff দিন; prompt ছোট ও repeated result cache করুন; normal traffic cap হলে paid project-এ যান। Wrong project/model, region, billing, spend-based limit বা temporary capacity-ও 429-এর কারণ হতে পারে। Same-project key দিয়ে bypass করবেন না।

## Resilient design ও সিদ্ধান্ত

Free tier-কে promise নয়, measurement surface হিসেবে নিন। Request, prompt length, token, failure ও retry record করুন; routing, cache এবং dimension-specific logs রাখুন; paid path, budget owner, alerts, allowed data ও migration trigger আগে ঠিক করুন। Low-frequency, non-sensitive, retryable load live limits-এর মধ্যে থাকলে free tier চালান। Stable throughput, frequent 429, paid-only model, privacy/compliance বা user-facing failure হলে paid project নিন।

## FAQ

কিছু model/feature-এ Free Tier থাকতে পারে; exact status current pricing page-এ দেখুন। Exact quota AI Studio-তে key-এর project view-এ। একই project-এর keys quota ভাগ করে। 2026 key migration auth continuity-এর জন্য, quota বৃদ্ধির জন্য নয়। 429-এ project, model, limits, concurrency ও billing ক্রমে পরীক্ষা করুন। Model nickname দেখে “Gemini 3 free” বলবেন না।

## Further Reading

- [Billing Units](/docs/guides/billing-units/)
