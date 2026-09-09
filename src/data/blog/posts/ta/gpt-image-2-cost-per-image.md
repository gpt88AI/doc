---
title: GPT Image 2 API Pricing: ஒவ்வொரு image cost மற்றும் உண்மையான bill
description: Official output examples, token pricing, Batch மற்றும் provider contract-ஐப் பிரித்து GPT Image 2 production budget உருவாக்குங்கள்.
date: 2026-05-08
category: API development
tags: [GPT Image 2, OpenAI API, Image Generation Pricing, API Cost, Batch API]
readTime: 9
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

GPT Image 2 cost fixed per-image price அல்ல. 8 மே 2026 official examples-ல் 1024x1024 output low-க்கு $0.006, medium-க்கு $0.053, high-க்கு $0.211. 1024x1536 அல்லது 1536x1024 examples $0.005, $0.041, $0.165. இவை output examples மட்டும்; உண்மையான bill-ல் text input, image input, editing, partial images மற்றும் retries சேரலாம்.

## Official examples முதலில்

| Size | Low | Medium | High |
| --- | --- | --- | --- |
| 1024x1024 | $0.006 | $0.053 | $0.211 |
| 1024x1536 | $0.005 | $0.041 | $0.165 |
| 1536x1024 | $0.005 | $0.041 | $0.165 |

Budget-ல் இவை starting point; final quote அல்ல. Reference image, edit input, retry மற்றும் Batch-க்கு தனி fields வைத்துக் கொள்ளுங்கள்.

## Token pricing மற்றும் Batch

Official pricing image input, cached input, image output மற்றும் text input token lines-ஆக உள்ளது. எனவே $0.211 எல்லா images-க்கும் universal price அல்ல. Qualifying asynchronous வேலைகளில் Batch cost-ஐக் குறைக்கலாம்; ஆனால் interactive page-ன் உடனடி response பொருந்தாது.

## Real bill formula

`model`, `size`, `quality`, `has_image_input`, `partial_images`, `retry_count` மற்றும் `route` (`direct`, `Batch`, `provider`) log செய்யுங்கள். “1000 images generated” மட்டும் போதாது; accepted output, retries மற்றும் manual revision-ஐயும் பதிவு செய்யுங்கள். Non-square image கட்டாயம் அதிக விலை அல்ல; pixel area-ஆல் கணக்கிடாமல் official size/quality row பயன்படுத்துங்கள்.

## Contracts-ஐப் பிரிக்கவும்

OpenAI direct official billing மற்றும் project attribution வழங்குகிறது. Batch offline jobs-க்கு. Provider அல்லது GPT88 தங்களின் pricing, multiplier, quota மற்றும் support contract வைத்துள்ளன. ChatGPT membership consumer entitlement; அது free `gpt-image-2` API அல்ல.

### $0.211 fixed price-ஆ?

இல்லை. இது 1024x1024 high-quality output-ன் ஒரு official example மட்டும்.

### உண்மையான cost எப்படி அளவிடுவது?

Size, quality, input, retries, route மற்றும் accepted output-ஐ ஒன்றாக log செய்யுங்கள்.

### Provider quote-ஐ OpenAI price-உடன் நேரடியாக ஒப்பிடலாமா?

இல்லை. Ownership மற்றும் billing unit முதலில் தெளிவாக வேண்டும்; provider தனி contract.
