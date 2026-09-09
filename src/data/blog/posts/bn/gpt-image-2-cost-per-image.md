---
title: GPT Image 2 API Pricing: প্রতি image cost এবং বাস্তব bill
description: Official output example, token pricing, Batch এবং provider contract আলাদা করে GPT Image 2-এর production budget তৈরি করুন।
date: 2026-05-08
category: API উন্নয়ন
tags: [GPT Image 2, OpenAI API, Image Generation Pricing, API Cost, Batch API]
readTime: 9
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

GPT Image 2-এর cost fixed per-image price নয়। ৮ মে ২০২৬-এর official example-এ 1024x1024 output low-এ $0.006, medium-এ $0.053 এবং high-এ $0.211। 1024x1536 বা 1536x1024-এর example $0.005, $0.041 এবং $0.165। এগুলি output example; বাস্তব bill-এ text input, image input, editing, partial image এবং retry যোগ হতে পারে।

## Official example আগে রাখুন

| Size | Low | Medium | High |
| --- | --- | --- | --- |
| 1024x1024 | $0.006 | $0.053 | $0.211 |
| 1024x1536 | $0.005 | $0.041 | $0.165 |
| 1536x1024 | $0.005 | $0.041 | $0.165 |

Budget-এ এগুলিকে starting point লিখুন, final quote নয়। Reference image, edit input, retry এবং Batch আলাদা field রাখুন।

## Token pricing ও Batch

Official pricing token line-এ ভাগ করা: image input, cached image input, image output এবং text input। তাই $0.211 সব image-এর universal price নয়। Batch qualifying asynchronous কাজের cost কমাতে পারে, কিন্তু interactive page-এর immediacy কমে যায়।

## Real bill formula

`model`, `size`, `quality`, `has_image_input`, `partial_images`, `retry_count` এবং `route` (`direct`, `Batch`, `provider`) log করুন। শুধু “1000 images generated” যথেষ্ট নয়; accepted output, retry এবং manual revision-ও লিখুন। বড় non-square image সবসময় বেশি খরচের হবে না; official size/quality row ব্যবহার করুন, pixel area দিয়ে অনুমান করবেন না।

## Contract আলাদা রাখুন

OpenAI direct official billing ও project attribution দেয়। Batch offline কাজের জন্য। Provider বা GPT88 নিজস্ব pricing, multiplier, quota এবং support contract রাখে। ChatGPT membership consumer entitlement; এটি free `gpt-image-2` API নয়।

### $0.211 কি fixed price?

না। এটি 1024x1024 high-quality output-এর একটি official example।

### বাস্তব cost কীভাবে মাপব?

Size, quality, input, retries, route এবং accepted output একসঙ্গে log করুন।

### Provider quote কি সরাসরি OpenAI price-এর সঙ্গে তুলনা করা যায়?

না। আগে ownership এবং billing unit label করুন; provider আলাদা contract।
