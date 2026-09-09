---
title: AI Studio-তে Nano Banana quota কীভাবে পড়বেন: আগে ৫টি entry point আলাদা করুন
description: Gemini app, AI Studio workspace, Developer API project, Vertex AI এবং third-party credit-এর quota আলাদা করে RPM, TPM, RPD ও IPM দিয়ে 429 বুঝুন।
date: 2026-05-03
category: API ডেভেলপমেন্ট
tags: [Nano Banana, AI Studio, Gemini API, Image Generation Quota, Rate Limit]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

সব AI Studio user-এর জন্য Nano Banana-র এক fixed image count নেই। আগে entry point চিহ্নিত করুন: Gemini app, AI Studio browser workspace, Gemini Developer API project, Vertex AI অথবা third-party wrapper। প্রতিটির plan, project, model, billing ও limit আলাদা। API code হলে logged-in [AI Studio rate-limit page](https://aistudio.google.com/rate-limit)-এ project, model ও usage tier দেখুন। শুধু “limit reached” দেখে অনলাইন quota table বিশ্বাস করবেন না।

## Quota কে নিয়ন্ত্রণ করে

Gemini app-এর limit account ও subscription plan-এর; AI Studio browser hint selected project-এর quota নয়। Developer API quota project, model, tier ও metric-ভিত্তিক। Vertex AI-তে Cloud project, region, IAM, billing ও quota থাকে। Third-party credit provider-এর balance, queue ও contract; এটি Google quota নয়। একই Google account একই quota pool নয়।

## UI hint বনাম API 429

সম্পূর্ণ UI/error text, selected project, key-এর project, model ID, সময়/timezone এবং dashboard record করুন। API response হলে status, error body, quota metric ও `retryDelay` রাখুন। শুধু UI hint হলে state refresh, একটি controlled retry এবং official troubleshooting করুন। `429 RESOURCE_EXHAUSTED` স্পষ্ট হলে তবেই API branch-এ যান।

| Metric | অর্থ | প্রথম পদক্ষেপ |
| --- | --- | --- |
| RPM | প্রতি মিনিটে request | concurrency কমান, queue ও jitter backoff |
| Input TPM | প্রতি মিনিটে input token | prompt/context ছোট করুন |
| RPD | API day-এ মোট request | daily budget, reset অপেক্ষা বা limit request |
| IPM | প্রতি মিনিটে image | image queue আলাদা, concurrency কমান |

Developer API limit project-এ প্রযোজ্য, API key-তে নয়। একই project-এ নতুন key বানালে quota বাড়ে না। 20 July 2026-এর official docs অনুযায়ী API RPD midnight Pacific Time-এ reset হয়; এটি Gemini app, Vertex AI বা third-party credit-এর ক্ষেত্রে প্রয়োগ করবেন না এবং Beijing time-এ স্থায়ী রূপান্তর করবেন না।

429 record-এ entry point, project, full model ID, metric, failure time/timezone, status/body, `retryDelay`, request ID, tier, limit, volume, concurrency ও failure rate রাখুন। RPM হলে peak কমান; RPD হলে tight retry বন্ধ করুন; IPM হলে image task আলাদা queue করুন।

## App, pricing ও Vertex AI

Gemini app-এর জন্য পুরনো fixed daily table ব্যবহার করবেন না। Settings-এর “usage limits”, refresh hint ও current Google Help দেখুন। Model availability, free/paid tier এবং project quota আলাদা বিষয়। Billing eligibility বা tier বদলাতে পারে, কিন্তু capacity, spend, safety ও rate limit সরায় না। Vertex AI unlimited bypass নয়; project, region, IAM, cost ও quota আলাদা যাচাই করুন।

Third-party credit-কে Google RPM/IPM/RPD-তে রূপান্তর করা যায় না। Provider-এর alias, charging, failed-output refund, expiry, concurrency, queue ও upstream 429 জিজ্ঞেস করুন। API key, project ID, billing বা account identifier support ticket-এ দেবেন না।

## FAQ

সবার জন্য fixed image count নেই। নতুন API key quota বাড়ায় না। Billing চালু থাকলেও metric-specific 429 হতে পারে। সঠিক ক্রম: **entry point → account/project → model → metric → dashboard → matching action**।

## Further Reading

- [Image Generation API](/docs/api/images/)
