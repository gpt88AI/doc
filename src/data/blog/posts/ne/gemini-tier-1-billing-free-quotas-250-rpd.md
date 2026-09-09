---
title: Gemini Tier 1 billing भए पनि free quota (250 RPD)? Complete Fix Guide 2026
description: Billing पछि पनि 250 RPD देखिए experimental model, API key project binding, billing sync, promo credits र preview limits जाँच गर्नुहोस्।
date: 2026-02-21
category: API विकास
tags: [Gemini API, API Troubleshooting, Rate Limit, Google AI]
readTime: 18
relatedPath: /docs/api/errors/
relatedTitle: OpenAI-Compatible API Error Troubleshooting
---

Google Cloud project मा billing enable गर्दा पनि Gemini API ले 250 RPD वा free-tier limit देखाउन सक्छ। Billing status, project tier र model-specific quota अलग layers हुन्। सामान्य समाधान `-exp`/`-experimental` model बाट stable वा paid-preview model मा जानु, billed project मा API key नयाँ बनाउनु र sync का लागि 24–48 घण्टा पर्खनु हो।

## छिटो checklist

1. Actual model ID हेर्नुहोस्; experimental variant free quota मा रहन सक्छ।
2. API key कुन billed Google Cloud project सँग जोडिएको छ AI Studio मा जाँच्नुहोस्।
3. Active payment method र pending verification हेर्नुहोस्।
4. Promo/free-trial credit active छ कि छैन जाँच्नुहोस्।
5. Preview model को stricter limit लाई stable model भन्दा अलग बुझ्नुहोस्।

## Tier र quota

Free, Tier 1, Tier 2 र Tier 3 अलग allocations हुन्। Free RPM/RPD model अनुसार बदलिन्छ; 250 RPD universal number होइन। Tier 1 ले higher limits दिन सक्छ, तर experimental र preview model अझै restrictive हुन सक्छन्। Tier 2 का लागि cumulative $250 र 30 दिन, Tier 3 का लागि $1,000 र 30 दिन जस्ता thresholds हुन सक्छन्; current official console/docs बाट verify गर्नुहोस्।

Quota project मा लागू हुन्छ, API key मा होइन। एउटै project मा नयाँ key बनाउँदा limit बढ्दैन। RPD midnight Pacific Time मा reset हुन सक्छ; official docs हेर्नुहोस्।

## पाँच कारण र fixes

**Model variant:** `gemini-2.5-pro-exp-03-25` वा `-experimental` free quota प्रयोग गर्न सक्छ। Stable `gemini-2.5-pro` वा उपलब्ध paid-preview variant प्रयोग गर्नुहोस्।

**गलत project key:** AI Studio मा billed project छानेर नयाँ key बनाउनुहोस् र application update गर्नुहोस्।

**Billing sync delay:** Stable paid model बाट सानो call गर्नुहोस्, dashboard हेर्नुहोस् र 24–48 घण्टा sync पर्खनुहोस्।

**Promo credits:** Free trial वा promotional balance ले paid tier ढिल्याउन सक्छ; billing support review माग्नुहोस्।

**Preview limits:** Preview/experimental model ले paid tier मा पनि stricter limit राख्न सक्छ; यसलाई सधैं bug नमान्नुहोस्।

## Tier verification

```bash
curl -s -D - "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' 2>&1 | grep -i "x-ratelimit"
```

`x-ratelimit-limit` र `x-ratelimit-remaining` हेर्नुहोस्। Secret commit वा share नगर्नुहोस्। AI Studio API Keys marker, Cloud Console quota र API response headers तीनै cross-check गर्नुहोस्। फरक भए model variant, key binding वा sync जाँच्नुहोस्।

Production मा batching, caching, queue, Batch API र multi-model fallback प्रयोग गर्नुहोस्। Vertex AI quota अलग हुन्छ; Gemini API tier स्वतः transfer हुँदैन। Gateway लाई billing/fallback route मान्नुहोस्, Google quota बढाउने उपाय होइन।

## FAQ

Stable model मा पनि free limit भए key-project binding र billing sync जाँच्नुहोस्। Promo credit सामान्यतः Tier 2/3 spend threshold मा गनिँदैन। Paid plan ले safety, capacity वा rate limit हटाउँदैन।

## Further Reading

- [OpenAI-Compatible API Error Troubleshooting](/docs/api/errors/)
