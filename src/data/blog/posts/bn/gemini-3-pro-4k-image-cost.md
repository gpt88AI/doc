---
title: Nano Banana Pro 4K কি free? Nano Banana 2, API pricing ও credits আগে যাচাই করুন
description: Nano Banana Pro ও Nano Banana 2-এর official 4K API pricing, Gemini Apps-এর 1K/2K download limit এবং third-party credits-এর ownership বুঝুন।
date: 2026-06-13
category: Gemini专题
tags: [Nano Banana Pro, Nano Banana 2, 4K Image Generation, Gemini API, Free Credits]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

**সংক্ষিপ্ত উত্তর:** Official API-তে Nano Banana Pro 4K দিতে পারে, কিন্তু 20 জুলাই 2026-এর যাচাইয়ে 4K Standard output-এর Free Tier ছিল না; উদাহরণ মূল্য প্রায় `$0.24`/image। Nano Banana 2 (`gemini-3.1-flash-image`)ও 4K দিতে পারে, উদাহরণ মূল্য প্রায় `$0.151`। Gemini Apps-এর 1K/2K download specification API 4K contract নয়।

## আগে entry point চিনুন

Gemini Apps, AI Studio, Gemini Developer API, Cloud/Vertex এবং third-party generator-এর limits ও credits আলাদা। Consumer plan দেখে API free tier বা 4K price অনুমান করবেন না। Region, account eligibility ও payment নিজের account এবং official page-এ যাচাই করুন।

## 4K API pricing

| Standard output | Nano Banana 2 | Nano Banana Pro |
| --- | ---: | ---: |
| Model ID | `gemini-3.1-flash-image` | `gemini-3-pro-image` |
| 1K | প্রায় $0.067 | প্রায় $0.134 |
| 2K | প্রায় $0.101 | প্রায় $0.134 |
| 4K | প্রায় **$0.151** | প্রায় **$0.24** |
| Free Tier | নেই | নেই |

এগুলো image-output equivalent, স্থায়ী quote নয়। Input, text, retries ও execution channel total bill বদলাতে পারে। 100 successful 4K output-এর তালিকা-মূল্য Nano Banana 2-এ `$15.10`, Pro-তে `$24.00`; সঠিক metric হলো accepted image প্রতি প্রকৃত খরচ।

## Nano Banana 2 না Pro

দুটিই 4K পারে। একই prompt ও acceptance criteria দিয়ে 10–20 বাস্তব task test করুন। Routine product background ও social asset-এ Nano Banana 2 আগে দেখুন। Complex Chinese layout, multiple reference, infographic বা strict composition fail করলে Pro evaluate করুন। সুন্দর প্রথম image নয়, accepted-output cost ও rework হিসাব করুন।

## Gemini Apps 1K/2K API 4K নয়

Gemini Apps download size consumer feature। Google AI plan app-এর সুবিধা বদলাতে পারে, কিন্তু Developer API output free করে না। Dynamic limit account, region ও capacity অনুযায়ী বদলাতে পারে। AI Studio availability-ও permanent free access প্রমাণ করে না।

## “Free credits” কার?

100 credits-কে image count-এ বদলানোর আগে issuer, unit, model ID, প্রতি 4K deduction, failure/retry billing, expiry, refund, storage ও training terms দেখুন। Formula: `attemptable 4K count = available credits ÷ credits per 4K generation`। এটি deliverable count নয়।

## সত্যিকারের 4K যাচাই

`image_size`-এ uppercase `4K` পাঠান; lowercase `4k` reject হতে পারে। Model, aspect ratio ও size record করুন, original file download করে pixel dimensions দেখুন। 16:9 4K `5504 × 3072`, square `4096 × 4096` হতে পারে। Web preview বা বড় canvas যথেষ্ট প্রমাণ নয়।

## GPT88 Gateway

Mainland-China connectivity ও controllable billing দরকার হলে GPT88 unified gateway একটি option। 1 CNY top-up 1 CNY account balance; actual charge official usage × selected group multiplier। Exact pricing, model coverage, failure billing ও 4K parameter gpt88.cc console-এ যাচাই করুন। Gateway official API নয়; output dimensions আবার মাপুন।

## FAQ

### Nano Banana Pro official 4K API কি free?

না। 20 জুলাই 2026 যাচাইয়ে Free Tier ছিল না; উদাহরণ মূল্য প্রায় `$0.24/image`।

### Nano Banana 2 কি 4K দেয়?

হ্যাঁ। `gemini-3.1-flash-image` 4K support করে; উদাহরণ Standard price প্রায় `$0.151/image`।

### 4K-এর জন্য Pro দরকার?

না। কঠিন instruction ও professional asset হলে Pro evaluate করুন; শুধু 4K যথেষ্ট কারণ নয়।

### Prompt-এ 4K লিখলেই হবে?

না। API-তে uppercase `image_size: "4K"` পাঠিয়ে dimensions যাচাই করুন।
