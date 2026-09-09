---
title: Gemini 3 Pro Image API Quota Limits: Tier তুলনা, 429 সমাধান ও খরচ অপ্টিমাইজেশন
description: Gemini 3 Pro Image API-এর RPM/TPM/RPD/IPM quota, Tier তুলনা, 429 RESOURCE_EXHAUSTED diagnosis, exponential backoff, Tier upgrade এবং Batch/high-concurrency architecture বুঝুন।
date: 2026-01-14
category: API ডেভেলপমেন্ট
tags: [Gemini API, API Quota Management, Image Generation, Rate Limits, Google AI]
readTime: 18
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

Gemini 3 Pro Image-এ quota limit production-এর প্রধান বাধা। ডিসেম্বর 2025-এর পরিবর্তনের পরে পুরোনো free-tier ধারণা দিয়ে চলা app হঠাৎ 429 দিতে পারে। Nano Banana Pro নামেও পরিচিত এই model 4K output দেয়, কিন্তু official API-তে free quota ধরে নেবেন না। Quota dynamic; budget বা launch-এর আগে official rate-limits page আবার দেখুন।

## চারটি quota dimension

- **RPM:** প্রতি minute request; 1K ও 4K দুটোই এক request।
- **TPM:** prompt, reference image ও output resolution-এর compute; 1K/2K প্রায় 1,120 tokens, 4K প্রায় 2,000 tokens হতে পারে।
- **RPD:** প্রতি দিনের request limit; Pacific midnight-এ reset হতে পারে।
- **IPM:** প্রতি minute image limit; RPM খালি থাকলেও IPM শেষ হলে 429 হবে।

Quota project level-এ প্রয়োগ হয়, API key level-এ নয়। একই project-এ বহু key তৈরি করলেই pool বাড়ে না। Tier upgrade বা নতুন project-ই বাস্তব পথ।

## Tier তুলনা

Gemini 3 Pro Image-এর API Free Tier ধরে নেবেন না; consumer Gemini app-এর 2 images/day সীমাও API quota নয়।

| Tier | সাধারণ শর্ত | Gemini 3 Pro Image উদাহরণ |
| --- | --- | --- |
| Free | model-specific free limits | এই image model-এর API Free Tier নেই ধরে পরিকল্পনা করুন |
| Tier 1 | Cloud Billing enable | 100 RPM, 1,000 RPD, 10 IPM |
| Tier 2 | প্রায় $250 spend ও 30 দিন | 500 RPM, 5,000 RPD, 20 IPM |
| Tier 3 | প্রায় $1,000 spend ও 30 দিন | 1,000 RPM, unlimited RPD, 100 IPM |

এগুলো historical/example value; current project, model ও tier-এর official table দেখুন।

## Model ও pricing

1K/2K/4K output সম্ভব। উদাহরণ official price: 1K/2K প্রায় `$0.134`/image, 4K প্রায় `$0.240`; Batch প্রায় 50% কম হতে পারে। Input, retry ও channel মোট bill বদলাতে পারে। Thumbnail-এ Flash model সাশ্রয়ী হতে পারে।

## 429 RESOURCE_EXHAUSTED diagnosis

RPM-এ burst-এর পরে recovery, TPM-এ দীর্ঘ prompt/high resolution correlation, RPD-তে দিনের শেষে error, IPM-এ শুধু image request failure দেখা যায়। Dimension শনাক্ত না করে retry করবেন না।

## Exponential backoff

429-এর জন্য exponential backoff ও jitter ব্যবহার করুন। Delay ধীরে বাড়ান, maximum cap রাখুন এবং সীমিত retry করুন। পাঁচবার ব্যর্থ হলে queue, কম resolution, Batch বা fallback route নিন। Blind retry quota ও cost বাড়ায়।

```python
delay = 1.0
for attempt in range(5):
    try:
        return generate_image()
    except ResourceExhausted:
        sleep(min(delay + random.random(), 60))
        delay *= 2
raise RuntimeError("quota exhausted")
```

## Upgrade ও cost optimization

Cloud Billing bind করা Tier 1-এর সাধারণ প্রবেশ। Tier 2/3 spend ও account age-এর উপর নির্ভর করতে পারে। Resolution, prompt ও reference input কমান; duplicate request cache করুন; idempotency রাখুন; async কাজ Batch-এ পাঠান। Cost per accepted image record করুন।

## High-concurrency architecture

Request queue, token-bucket limiter, per-project quota monitor, retry queue ও dead-letter queue রাখুন। একাধিক project quota আলাদা করতে পারে, কিন্তু billing/policy দায়িত্বও বাড়ে। Official API ও Gateway-কে dual channel হিসেবে রাখলে model ID, cost, error ও fallback আলাদা log করুন।

## Gateway-এর সীমা

Gateway access, local payment, logs ও support সহজ করতে পারে; Google official quota বা pricing-এর source নয়। Console/logs থেকে route, billing unit, concurrency, failure charge ও no-image response যাচাই করুন। Evidence ছাড়া “unlimited” বা “always stable” লিখবেন না।

## FAQ

### Quota কখন reset হয়?

Dimension অনুযায়ী আলাদা; RPD Pacific midnight-এ reset হতে পারে। Current console ও official docs দেখুন।

### বহু API key কি quota বাড়ায়?

না, একই project-এর key একই quota pool ভাগ করে।

### 429 এ শুধু retry করব?

না। RPM/TPM/RPD/IPM শনাক্ত করে backoff, queue, resolution বা route ঠিক করুন।

### Consumer app-এর free image API-তে ব্যবহার করা যায়?

না। Consumer ও Developer API quota আলাদা।

### Batch কি সস্তা?

Async গ্রহণযোগ্য হলে খরচ কমতে পারে, কিন্তু realtime response-এর বিকল্প নয়।

### Production-এর আগে কী দেখব?

Current model ID, pricing, tier, RPM/TPM/RPD/IPM, retry cost, logs, fallback ও accepted-output rate।
