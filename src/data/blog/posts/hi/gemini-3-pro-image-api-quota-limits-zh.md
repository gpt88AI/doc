---
title: Gemini 3 Pro Image API Quota Limits: Tier तुलना, 429 समाधान और लागत优化
description: Gemini 3 Pro Image API के RPM/TPM/RPD/IPM quota, Tier तुलना, 429 RESOURCE_EXHAUSTED diagnosis, exponential backoff, Tier upgrade और Batch/high-concurrency architecture समझें।
date: 2026-01-14
category: API विकास
tags: [Gemini API, API Quota Management, Image Generation, Rate Limits, Google AI]
readTime: 18
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

Gemini 3 Pro Image में quota limits production की मुख्य बाधा हैं। दिसंबर 2025 के बदलाव के बाद free-tier limits और कुछ daily limits घटे, इसलिए पुराने सफल प्रयोग अचानक 429 दे सकते हैं। यह मॉडल Nano Banana Pro नाम से भी जाना जाता है और 4K output देता है, लेकिन official API में free quota नहीं मानना चाहिए; testing के लिए भी paid account की आवश्यकता हो सकती है। Quota Google की dynamic जानकारी है—budget तय करने से पहले official rate-limits page फिर जाँचें।

## चार quota dimensions

- **RPM (Requests Per Minute):** प्रति minute requests। 1K और 4K call दोनों एक request गिने जाते हैं; sliding 60-second window लागू होती है।
- **TPM (Tokens Per Minute):** prompt, reference images और output resolution से compute खपत। 1K/2K output लगभग 1,120 tokens और 4K लगभग 2,000 tokens consume कर सकता है।
- **RPD (Requests Per Day):** daily request limit, जो Pacific midnight पर reset हो सकती है। Beijing time में reset दोपहर/शाम के बीच पड़ सकता है।
- **IPM (Images Per Minute):** image models की अलग limit; RPM खाली होने पर भी IPM खत्म हो तो 429 आएगा।

Quota project level पर लागू होती है, API key level पर नहीं। उसी Google Cloud project में कई keys बनाने से pool नहीं बढ़ता। Tier upgrade या नया project ही वास्तविक quota वृद्धि के रास्ते हैं।

## Tier तुलना

दिसंबर 2025 adjustment ने free tier को सबसे अधिक प्रभावित किया। Gemini 3 Pro Image Preview के लिए free API access, IPM और RPD शून्य हो सकते हैं; consumer Gemini app की 2 images/day सीमा API quota नहीं है।

| Tier | सामान्य शर्त | Gemini 3 Pro Image उदाहरण |
| --- | --- | --- |
| Free | Free testing, model-specific limits | इस image model के लिए API Free Tier नहीं मानें |
| Tier 1 | Cloud Billing enable | 100 RPM, 1,000 RPD, 10 IPM |
| Tier 2 | लगभग $250 cumulative spend और 30 दिन | 500 RPM, 5,000 RPD, 20 IPM |
| Tier 3 | लगभग $1,000 spend और 30 दिन | 1,000 RPM, unlimited RPD, 100 IPM |

ये historical/example values हैं; current project, model और tier के लिए official table देखें।

## मॉडल और pricing

Gemini 3 Pro Image 1K, 2K और 4K output दे सकता है। उदाहरण official pricing: 1K/2K लगभग `$0.134` प्रति image और 4K लगभग `$0.240`; Batch लगभग 50% कम हो सकता है। Input, retries और channel अलग bill बदल सकते हैं। Thumbnail के लिए Flash model अधिक किफायती हो सकता है।

## 429 RESOURCE_EXHAUSTED diagnosis

- RPM: burst के बाद लगभग 60 seconds में recovery; response में requests-per-minute संकेत।
- TPM: लंबे prompt, reference images या high resolution पर अधिक failure।
- RPD: दिन बढ़ने के साथ errors; reset के बाद अचानक recovery।
- IPM: केवल image requests fail, text requests ठीक; image frequency घटाएँ।

## Production exponential backoff

429 पर exponential backoff और jitter अपनाएँ: पहली delay छोटी रखें, हर retry में delay बढ़ाएँ, random jitter जोड़ें और maximum delay cap करें। 5 retries के बाद queue, lower resolution, Batch या fallback route चुनें। Blind retry quota और bill दोनों बढ़ा सकता है।

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

## Tier upgrade और cost optimization

Cloud Billing bind करना Tier 1 का सामान्य प्रवेश है। Tier 2/3 cumulative spend और account age पर निर्भर हो सकते हैं। Resolution घटाएँ, prompt/reference input छोटा करें, duplicate requests cache करें, idempotency रखें और asynchronous jobs के लिए Batch API अपनाएँ। Cost per accepted image को track करें, केवल call count नहीं।

## High-concurrency architecture

Request queue, token-bucket rate limiter, per-project quota monitor, retry queue और dead-letter queue रखें। अलग Google projects quota pool अलग कर सकते हैं, लेकिन policy और billing जिम्मेदारी भी बढ़ाते हैं। Official API और unified gateway को dual-channel की तरह रखें; दोनों的 model ID、cost、error और fallback अलग record करें।

## Gateway सीमा

Gateway access, local payment, logs और support आसान कर सकता है, लेकिन Google official quota या pricing का स्रोत नहीं है। Current route, billing unit, concurrency, failure charge और no-image response को console/logs से verify करें। “Unlimited” या “always stable” को evidence के बिना न लिखें।

## FAQ

### Quota reset कब होती है?

Dimension के अनुसार अलग होती है; RPD Pacific midnight पर reset हो सकती है। Current console और official docs देखें।

### कई API keys बनाने से quota बढ़ेगी?

नहीं, एक ही project की keys quota pool साझा करती हैं।

### 429 आने पर केवल retry करें?

नहीं। पहले RPM/TPM/RPD/IPM पहचानें, फिर backoff, queue, resolution या route बदलें।

### Consumer app की free images API में मिलती हैं?

नहीं। Consumer और Developer API quotas अलग हैं।

### Batch सस्ता है?

Async स्वीकार्य हो तो Batch लागत घटा सकता है, लेकिन realtime response का replacement नहीं।

### Production से पहले क्या verify करें?

Current model ID, pricing, project tier, RPM/TPM/RPD/IPM, retry cost, logs, fallback और accepted-output rate।
