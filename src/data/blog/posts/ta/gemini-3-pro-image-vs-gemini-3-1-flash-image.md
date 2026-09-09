---
title: Nano Banana 2, Pro அல்லது 2 Lite: வெளியீட்டு ஆபத்தின் அடிப்படையில் தேர்வு
description: ஒரே input, size மற்றும் acceptance criteria மூலம் Nano Banana 2 Lite, Nano Banana 2, Nano Banana Pro ஆகியவற்றின் API route-ஐத் தேர்வு செய்யுங்கள்.
date: 2026-05-30
category: மாதிரி ஒப்பீடு
tags: [Nano Banana 2 Lite, Nano Banana 2, Nano Banana Pro, மாதிரி ஒப்பீடு, Image API]
readTime: 7
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

வேகமான 1K direction screening மட்டும் தேவைப்பட்டால் Nano Banana 2 Lite-ல் தொடங்குங்கள். 2K அல்லது 4K, அதிக variants, பொதுவான generation மற்றும் editing தேவைப்பட்டால் Nano Banana 2-ஐப் பயன்படுத்துங்கள். dense text, கடுமையான brand விதிகள், முக்கிய product mockup அல்லது அதிக rework செலவு இருந்தால் மட்டுமே அதே input-ல் Nano Banana Pro-ஐ ஒப்பிடுங்கள். இது API routing முடிவு; Gemini App, AI Studio, Vertex அல்லது third-party platform pricing பற்றிய உறுதி அல்ல.

மூன்று model IDs: `gemini-3.1-flash-lite-image`, `gemini-3.1-flash-image`, `gemini-3-pro-image`. எல்லா சூழல்களுக்கும் ஒரே model சிறந்தது இல்லை. ஒரே input மற்றும் acceptance criteria-ல் pass rate, retry count, manual-revision time ஆகியவற்றை வைத்து முடிவு செய்யுங்கள்.

## முதலில் delivery risk அடிப்படையில் route தேர்வு

| தேவை | தொடக்கம் | எப்போது மாற்ற வேண்டும் |
| --- | --- | --- |
| 1K preview, direction draft அல்லது background variant | **Nano Banana 2 Lite** | 2K/4K தேவைப்பட்டால் அல்லது 1K போதாவிட்டால் |
| பொதுவான generation/editing, அதிக sizes, உண்மையான deliverable | **Nano Banana 2** | text, structure, reference consistency அல்லது rework தொடர்ந்து தோல்வியுற்றால் |
| high-risk brand asset, dense text அல்லது complex mockup | **Nano Banana Pro** | logo, சிறிய text, exact color அல்லது regulated copy நிலையாக இல்லாவிட்டால் |

Delivery size, reference assets, image text, retry budget மற்றும் final reviewer-ஐ முதலில் பதிவு செய்யுங்கள். Lite-ன் official வரம்பு 1K; size காரணமாக அது பொருந்தவில்லை என்றால் unit price மட்டும் ஒப்பிடுவது பயனற்றது.

## ஒரே input-ல் accepted-output cost test

Prompt, reference image, aspect ratio, size மற்றும் safety requirements-ஐ ஒரேபடி வைத்துக் கொண்டு model ID-ஐ மட்டும் மாற்றுங்கள். Lite இலக்கு size-ஐ ஆதரிக்காவிட்டால் `N/A` எனக் குறிக்கவும். ஒவ்வொரு sample-க்கும் pass/fail, generation fee, retry count, manual revision minutes மற்றும் review wait-ஐப் பதிவு செய்யுங்கள். Accepted-output cost = (model cost + manual revision cost) ÷ accepted count.

ஒரு நல்ல sample மட்டும் வைத்து முடிவு செய்ய வேண்டாம். text poster, packaging, reference editing மற்றும் 4K key visual போன்ற உண்மையான deliverables-ல் சோதிக்கவும்.

## எப்போது upgrade, எப்போது நிறுத்த வேண்டும்

Lite size வரம்பால் மட்டும் தோல்வியுற்றால் Nano Banana 2 அல்லது Pro-க்கு மாறுங்கள். Nano Banana 2 ஒரே input-ல் text accuracy, complex layout அல்லது reference consistency-யில் தொடர்ந்து தோல்வியுற்று, Pro retries அல்லது manual edits-ஐக் குறைத்தால் மட்டுமே upgrade-க்கு ஆதாரம் உள்ளது. Pro கூட logo, barcode, price, date மற்றும் regulated copy-யின் manual verification-ஐ மாற்றாது.

4K-க்கு Pro கட்டாயமில்லை; Nano Banana 2-வும் 4K candidate. Lite என்பது low-quality என்று பொருள் அல்ல; அதன் முக்கிய வரம்பு 1K. API price ஒவ்வொரு entry point-ன் முழு உண்மையான cost அல்ல, ஏனெனில் region, quota, billing unit மற்றும் terms மாறலாம்.
