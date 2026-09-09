---
title: GPT Image 2 API ধীর বা টাইমআউট হলে প্রথমে ব্যর্থ স্তরটি খুঁজুন
description: first byte, final image, timeout layer, route এবং retry আলাদা মেপে GPT Image 2-এর ধীর call নির্ণয়ের পদ্ধতি।
date: 2026-05-12
category: প্রযুক্তিগত টিউটোরিয়াল
tags: [GPT Image 2, OpenAI API, Image Generation, API Troubleshooting, Latency]
readTime: 12
relatedPath: /docs/api/errors/
relatedTitle: API Error Codes
---

ধীর GPT Image 2 call-কে সঙ্গে সঙ্গে model-এর সমস্যা বলবেন না। জটিল prompt, বেশি reference image, বড় size বা high quality-তে generation দীর্ঘ হতে পারে; আবার browser, serverless function, reverse proxy বা gateway আগে timeout করতে পারে। প্রতিটি attempt-এ `connect_ms`, `first_byte_ms`, `first_partial_image_ms`, `final_image_ms`, `download_ms`, `render_ms`, `retry_count`, `http_status`, `request_id`, `model`, `quality`, `size`, `format` এবং `route_owner` লিখুন।

## Normal Wait বনাম False Timeout

তিনটি অবস্থা আলাদা করুন: generation দেরিতে সফল হয়; upstream কাজ করলেও browser বা proxy আগে বন্ধ হয়; অথবা local timeout-এর পর retry একই কাজ বহুবার শুরু করে। একই `gpt-image-2` নাম direct OpenAI, Azure, gateway বা reverse route-এ একই পথ বোঝায় না। Base URL, timeout policy, retry policy এবং log owner আলাদা করে নথিবদ্ধ করুন।

## Timeout Budget

Browser-এ পুরো synchronous generation আটকে না রেখে job ID, progress বা async status ফেরত দিন। Edge function, reverse proxy এবং backend worker-এর সীমা আলাদা মাপুন। UI-তে `queued`, `generating`, `finalizing`, `saved` এবং `failed` state রাখুন।

## Baseline ও Parameter Tuning

একবারে একটি variable বদলান। Draft-এর জন্য `quality: low`, square output বা JPEG পরীক্ষা করা যায়; transparency বা post-processing-এর জন্য PNG/WebP দরকার হতে পারে। একই request তিনবার চালিয়ে baseline নিন, তারপর শুধু sync/async, format, quality এবং route তুলনা করুন।

## Streaming, Async ও Retry

Streaming partial image আগে দেখাতে পারে, কিন্তু final compute দ্রুত করার নিশ্চয়তা দেয় না। Async task browser timeout ও duplicate click কমায়। Local timeout-এর পর মূল task চলছে কি না না দেখে নতুন request করবেন না। 429-তে reset header ও exponential backoff, 5xx-এ capped retry ও jitter ব্যবহার করুন; একই pending job deduplicate করুন।

## Evidence ও Reproduction

Direct OpenAI-তে model ID, endpoint, request ID ও limit headers; Azure-তে deployment, region ও quota; gateway-তে base URL, upstream status, timeout ও internal retry রাখুন। একই prompt ও parameters-এ তিনটি baseline run করুন, তারপর একটিমাত্র variable বদলান। কেবল browser sync path ব্যর্থ হলে “OpenAI ধীর” লিখবেন না; কেবল একটি gateway ধীর হলে সেটিকে official model behavior বলবেন না। API key, token, private image বা অসংশোধিত customer log শেয়ার করবেন না।

## Production Guardrails

Generate button-এ pending state, backend-এ idempotency/deduplication এবং error-এ local timeout, gateway timeout, upstream error বা API error আলাদা পরিচয় দিন। Dashboard-এ route owner অনুযায়ী latency মাপুন। Draft-এর জন্য bounded low-quality বা queue fallback রাখা যায়, কিন্তু production asset-এর মান না কমিয়ে কারণটি যাচাই করুন।

## FAQ

### Slow generation কি স্বাভাবিক?

জটিল prompt ধীর হতে পারে, কিন্তু আগে `first_byte_ms` ও `final_image_ms` দেখুন। মাঝের কোনো layer আগে fail করলে সেটি false timeout।

### Streaming কি final image দ্রুত করে?

না। এটি progress আগে দেখায় এবং duplicate click কমায়।

### Gateway-ই কি কারণ?

সমান parameters-এ direct ও gateway তুলনা করে base URL, route owner, upstream status এবং HTTP status দেখুন।

## Further Reading

- [API Error Codes](/docs/api/errors/)
- [GPT Image 2 Noise and Texture Artifacts](/docs/blog/gpt-image-2-low-quality/)
