---
title: Gemini 3.1 Flash Image Free Tier: Official API paid, AI Studio শুধু test-এর জন্য
description: gemini-3.1-flash-image-এর official API free tier, AI Studio testing, current model ID এবং Standard, Batch ও Gemini Apps-এর পার্থক্য বুঝুন।
date: 2026-02-27
category: API ডেভেলপমেন্ট
tags: [Gemini API, Image Generation, API Pricing, AI Studio]
readTime: 12
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

13 জুন 2026-এর যাচাই অনুযায়ী `gemini-3.1-flash-image`-এর official Gemini Developer API-তে Free Tier row নেই। AI Studio-তে Nano Banana 2 browser-এ পরীক্ষা করা যায়, কিন্তু এতে backend application-এর free production API quota প্রমাণ হয় না। বর্তমান model ID `gemini-3.1-flash-image`; পুরোনো tutorial-এর `gemini-3.1-flash-image-preview` নতুন code contract নয়, migration/history reference।

**Route answer:** browser test-এর জন্য AI Studio, synchronous backend-এর জন্য paid Developer API Standard, অপেক্ষা করা যায় এমন কাজের জন্য paid Batch। Gemini Apps consumer limit-কে API quota ভাববেন না।

## প্রথমে সিদ্ধান্ত

| প্রশ্ন | বর্তমান উত্তর | যাচাইয়ের স্থান |
| --- | --- | --- |
| Official API free? | না; Standard ও Batch image row-তে Free Tier নেই | Google Gemini API pricing |
| AI Studio | Browser testing | AI Studio |
| Nano Banana 2 | `gemini-3.1-flash-image`-এ map করে | Google image docs |
| Preview ID | নতুন code-এর জন্য নয় | Google changelog |

## আগে access route বাছুন

AI Studio browser experiment-এর জন্য; Developer API Standard paid synchronous backend; Batch paid asynchronous ও সস্তা, free নয়; Gemini Apps personal consumer route; third-party gateway-এর নিজস্ব contract। AI Studio-তে ছবি তৈরি হওয়া backend free quota-এর প্রমাণ নয়।

## Official API pricing paid

| Output | Standard API | Batch API |
| --- | ---: | ---: |
| 0.5K | $0.045 | $0.022 |
| 1K | $0.067 | $0.034 |
| 2K | $0.101 | $0.050 |
| 4K | $0.151 | $0.076 |

এগুলো budget starting point, স্থায়ী promise নয়। Release-এর আগে model ID, price ও billing row আবার দেখুন।

## Current model ID ব্যবহার করুন

নতুন code-এ `gemini-3.1-flash-image` রাখুন। `gemini-3.1-flash-image-preview` শুধু পুরোনো repository, migration notes বা historical URL-এ রাখুন। Code, logs, allowlist, billing dashboard ও tickets-এ একই ID ব্যবহার করুন।

## Go-live-এর আগে real-time quota

API key বা project-এর account দিয়ে AI Studio খুলুন, একই project বাছুন, `gemini-3.1-flash-image` model নিশ্চিত করুন এবং tier, RPM, TPM, RPD ও billing notes লিখে রাখুন। Demo, launch, migration বা traffic পরিবর্তনের আগে আবার যাচাই করুন।

## AI Studio কখন যথেষ্ট

Prompt comparison, reference image test, Nano Banana 2 fit এবং internal design sample-এর জন্য যথেষ্ট। User wait, retry, logging, billing, storage বা go-live commitment এলে Developer API planning-এ যান। Gemini Apps consumer surface; তার limits API limits নয়।

## Engineering acceptance ও migration

Model ID, project, date, prompt set, output size এবং sample-কে acceptable/needs-retry/unacceptable হিসেবে record করুন। Standard ও Batch config আলাদা রাখুন; logs-এ project, model, tier, size ও error রাখুন। Preview থেকে migrate করার সময় “free API” wording বদলে AI Studio testing বা official API without Free Tier লিখুন।

## FAQ

### Gemini 3.1 Flash Image-এর free API tier আছে?

না। 13 জুন 2026-এর Google pricing যাচাইয়ে Standard ও Batch image row-তে Free Tier ছিল না।

### AI Studio কি free testing-এর জন্য?

হ্যাঁ, browser test route হিসেবে; free backend production API quota হিসেবে নয়।

### Nano Banana 2 কি একই model?

Google image docs অনুযায়ী current ID `gemini-3.1-flash-image`।

### Preview ID ব্যবহার করা উচিত?

নতুন code-এ নয়; পুরোনো example ও migration context-এ।

### সস্তা Batch কি free?

না। এটি waitable task-এর lower-priced paid async route।

### Exact quota কোথায় দেখব?

Current project-এর AI Studio view-এ model, tier, RPM, TPM, RPD ও billing notes দেখুন।
