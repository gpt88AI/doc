---
title: GPT Image 2 API Pricing: प्रति image cost र वास्तविक bill
description: Official output examples, token pricing, Batch र provider contract छुट्याएर GPT Image 2 को production budget बनाउनुहोस्।
date: 2026-05-08
category: API विकास
tags: [GPT Image 2, OpenAI API, Image Generation Pricing, API Cost, Batch API]
readTime: 9
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

GPT Image 2 को cost fixed per-image price होइन। 8 मे 2026 का official examples मा 1024x1024 output low मा $0.006, medium मा $0.053 र high मा $0.211 छ। 1024x1536 वा 1536x1024 का examples $0.005, $0.041 र $0.165 छन्। यी output examples मात्र हुन्; वास्तविक bill मा text input, image input, editing, partial images र retries थपिन सक्छन्।

## Official examples पहिले

| Size | Low | Medium | High |
| --- | --- | --- | --- |
| 1024x1024 | $0.006 | $0.053 | $0.211 |
| 1024x1536 | $0.005 | $0.041 | $0.165 |
| 1536x1024 | $0.005 | $0.041 | $0.165 |

Budget मा यी starting point हुन्, final quote होइनन्। Reference image, edit input, retry र Batch का लागि छुट्टै fields राख्नुहोस्।

## Token pricing र Batch

Official pricing image input, cached input, image output र text input token lines मा आधारित छ। त्यसैले $0.211 सबै image को universal price होइन। Qualifying asynchronous काममा Batch ले cost घटाउन सक्छ, तर interactive page को तुरुन्त response चाहिने भए मिल्दैन।

## Real bill formula

`model`, `size`, `quality`, `has_image_input`, `partial_images`, `retry_count` र `route` (`direct`, `Batch`, `provider`) log गर्नुहोस्। “1000 images generated” मात्र पर्याप्त छैन; accepted output, retries र manual revision पनि राख्नुहोस्। Non-square image सधैं महँगो हुँदैन; pixel area बाट अनुमान नगरी official size/quality row प्रयोग गर्नुहोस्।

## Contracts छुट्याउनुहोस्

OpenAI direct ले official billing र project attribution दिन्छ। Batch offline job का लागि हो। Provider वा GPT88 का आफ्नै pricing, multiplier, quota र support contract हुन्छन्। ChatGPT membership consumer entitlement हो; यसले free `gpt-image-2` API बनाउँदैन।

### $0.211 fixed price हो?

होइन। यो 1024x1024 high-quality output को official example मात्र हो।

### वास्तविक cost कसरी मापन गर्ने?

Size, quality, input, retries, route र accepted output सँगै log गर्नुहोस्।

### Provider quote OpenAI price सँग सीधै तुलना गर्न मिल्छ?

मिल्दैन। पहिले ownership र billing unit स्पष्ट गर्नुहोस्; provider अलग contract हो।
