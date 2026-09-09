---
title: GPT Image 2 API Pricing: प्रति image cost और वास्तविक bill
description: Official output examples, token pricing, Batch और provider contract को अलग करके GPT Image 2 का production budget बनाएं।
date: 2026-05-08
category: API विकास
tags: [GPT Image 2, OpenAI API, Image Generation Pricing, API Cost, Batch API]
readTime: 9
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

GPT Image 2 की cost एक fixed per-image price नहीं है। 8 मई 2026 के official examples में 1024x1024 output low पर $0.006, medium पर $0.053 और high पर $0.211 है। 1024x1536 या 1536x1024 के examples $0.005, $0.041 और $0.165 हैं। ये output examples हैं; वास्तविक bill में text input, image input, editing, partial images और retries जुड़ सकते हैं।

## Official examples पहले रखें

| Size | Low | Medium | High |
| --- | --- | --- | --- |
| 1024x1024 | $0.006 | $0.053 | $0.211 |
| 1024x1536 | $0.005 | $0.041 | $0.165 |
| 1536x1024 | $0.005 | $0.041 | $0.165 |

Budget में इन numbers को starting point की तरह लिखें, final quote की तरह नहीं। Reference image, edit input, retry और Batch अलग fields रखें।

## Token pricing और Batch

Official pricing token lines पर आधारित है: image input, cached image input, image output और text input के अलग rates हैं। इसलिए $0.211 हर image का universal price नहीं। Batch qualifying asynchronous काम में cost घटा सकता है, पर interactive page की immediacy खो जाती है।

## Real bill formula

Budget table में `model`, `size`, `quality`, `has_image_input`, `partial_images`, `retry_count` और `route` (`direct`, `Batch`, `provider`) रखें। केवल “1000 images generated” पर्याप्त नहीं; हर accepted output, retry और manual revision का record रखें।

बड़ी non-square image हमेशा महँगी होगी, यह भी सही नहीं। Official examples में portrait और landscape के rates square से कम हो सकते हैं। Pixel area से linear extrapolation न करें; official size/quality row इस्तेमाल करें।

## Direct, Batch, provider और ChatGPT अलग contracts

OpenAI direct official identity, billing और project attribution देता है। Batch offline jobs के लिए है। Provider या GPT88 अपनी pricing, multiplier, quota और support contract रखते हैं। ChatGPT membership consumer entitlement है; यह free `gpt-image-2` API नहीं बनता।

## Launch से पहले calculator

हर request में model, size, quality, image input, partial output, retries और route log करें। इससे पता चलेगा कि cost high quality से बढ़ रही है या reference/edit input से। Team convention रखें: external copy में “official output examples”, internal review में “full API workload” लिखें।

### एक image की वास्तविक cost कितनी है?

Official example के अनुसार size और quality पर निर्भर है; वास्तविक bill में input और retries भी जुड़ते हैं।

### क्या $0.211 fixed price है?

नहीं। यह केवल 1024x1024 high-quality output example है।

### क्या provider quote OpenAI price से सीधे compare हो सकता है?

नहीं। पहले ownership और billing unit label करें; provider एक अलग contract है।
