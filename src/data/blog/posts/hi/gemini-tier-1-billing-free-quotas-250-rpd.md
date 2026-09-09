---
title: Gemini Tier 1 billing enabled फिर भी free quota (250 RPD)? Complete Fix Guide 2026
description: Billing के बाद भी 250 RPD दिखने पर experimental model, API key project binding, billing sync, promo credits और preview limits की जाँच करें।
date: 2026-02-21
category: API विकास
tags: [Gemini API, API Troubleshooting, Rate Limit, Google AI]
readTime: 18
relatedPath: /docs/api/errors/
relatedTitle: OpenAI-Compatible API Error Troubleshooting
---

Google Cloud project में billing enable करने के बाद भी Gemini API 250 RPD या free-tier limit दिखा सकता है। Billing status, project tier और model-specific quota अलग layers हैं। सबसे सामान्य समाधान `-exp`/`-experimental` model से stable या paid-preview model पर जाना, billed project में API key फिर बनाना और sync के लिए 24–48 घंटे प्रतीक्षा करना है।

## पहले यह checklist चलाएँ

1. Actual model ID देखें; experimental variant free quota पर रह सकता है।
2. API key किस Google Cloud project से जुड़ी है, AI Studio में जाँचें।
3. Billing account में active payment method और pending verification देखें।
4. Promo/free-trial credit active है या नहीं जाँचें।
5. Preview model की stricter limit को stable model से अलग समझें।

## Tier और quota का अर्थ

Free, Tier 1, Tier 2 और Tier 3 अलग allocation हैं। Free tier में model के अनुसार RPM/RPD सीमाएँ बदलती हैं; 250 RPD अक्सर Flash जैसी free allocation का संकेत है, universal number नहीं। Tier 1 paid billing से higher limits दे सकता है, लेकिन experimental और preview models अधिक restrictive रह सकते हैं। Tier 2 के लिए cumulative $250 और 30 दिन, Tier 3 के लिए $1,000 और 30 दिन जैसे thresholds लागू हो सकते हैं; current official console/docs से verify करें।

Quota project पर लागू होता है, API key पर नहीं। एक ही project में कई keys बनाने से limit नहीं बढ़ती। RPD reset midnight Pacific Time पर हो सकता है; इसे current official docs से जाँचें और Beijing time का fixed conversion न मानें।

## पाँच root causes

**1. Model variant:** `gemini-2.5-pro-exp-03-25` या `-experimental` free quota पर रह सकता है। Stable `gemini-2.5-pro` या उपलब्ध paid-preview variant आज़माएँ।

**2. गलत API key project:** Key unbilled project से बनी हो सकती है। AI Studio में billed project चुनकर नई key बनाएं और application update करें।

**3. Billing sync delay:** Billing enable होने के बाद quota system को कुछ मिनट से 48 घंटे लग सकते हैं। Stable paid model से छोटा call करें, फिर dashboard और headers देखें।

**4. Promo credits:** Free-trial या promotional balance active होने पर account paid tier की तरह treat न हो सकता है। Billing support से review माँगें।

**5. Preview limits:** Preview/experimental models paid tier पर भी stricter limits रखते हैं। इसे bug न मानें; stable model या current model-specific quota जाँचें।

## Step-by-step fix

```bash
curl -s -D - "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' 2>&1 | grep -i "x-ratelimit"
```

Headers में `x-ratelimit-limit` और `x-ratelimit-remaining` देखें। API key source में कभी actual secret commit या share न करें। Stable model पर switch करें, billed project में नई key बनाएं, billing activation verify करें और 24–48 घंटे sync दें। Promo credit हो तो support review लें। फिर भी mismatch रहे तो project ID, model variant, key identifier (key नहीं), billing screenshot और sanitized error headers के साथ Google Cloud support को contact करें।

## Tier verification के तीन तरीके

1. **AI Studio API Keys:** Plan marker Free या Pay-as-you-go देखें।
2. **Cloud Console quotas:** Project में Gemini/Generative Language quota देखें; sync के दौरान इसे secondary evidence मानें।
3. **API response headers:** `x-ratelimit-limit` और `x-ratelimit-remaining` real behavior दिखाते हैं। Dashboard और headers अलग हों तो model variant, project binding या sync जाँचें।

## Production planning

Tier 1 पर्याप्त न हो तो request batching, caching, queue, Batch API और multi-model fallback उपयोग करें। अलग projects capacity बढ़ा सकते हैं लेकिन operational complexity और billing governance बढ़ाते हैं। Vertex AI का quota अलग है; Gemini API tier अपने-आप Vertex AI में transfer नहीं होता। Gateway को transparent billing या fallback route की तरह देखें, Google project quota बढ़ाने के तरीके की तरह नहीं।

## FAQ

Stable model पर भी free limit हो तो key-project binding और billing sync जाँचें। Promo credit Tier 2/3 spend threshold में सामान्यतः नहीं गिना जाता। Paid plan safety, model capacity या quota limits हटाता नहीं। RPD और RPM reset अलग होते हैं।

## Further Reading

- [OpenAI-Compatible API Error Troubleshooting](/docs/api/errors/)
