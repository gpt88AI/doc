---
title: Gemini Tier 1 billing இருந்தும் free quota (250 RPD)? முழு Fix Guide 2026
description: Billing enabled ஆன பிறகும் 250 RPD தெரிந்தால் experimental model, API key project binding, billing sync, promo credits மற்றும் preview limits சரிபார்க்கவும்.
date: 2026-02-21
category: API development
tags: [Gemini API, API Troubleshooting, Rate Limit, Google AI]
readTime: 18
relatedPath: /docs/api/errors/
relatedTitle: OpenAI-Compatible API Error Troubleshooting
---

Google Cloud project-ல் billing enable செய்தாலும் Gemini API 250 RPD அல்லது free-tier limit காட்டலாம். Billing status, project tier மற்றும் model-specific quota தனித்தனி layers. பொதுவான தீர்வு `-exp`/`-experimental` model-லிருந்து stable அல்லது paid-preview model-க்கு மாறுவது, billed project-ல் API key புதிதாக உருவாக்குவது, sync-க்கு 24–48 மணி காத்திருப்பது.

## விரைவு checklist

1. Actual model ID பார்க்கவும்; experimental variant free quota-வில் இருக்கலாம்.
2. API key எந்த billed project-க்கு இணைக்கப்பட்டுள்ளது என்பதை AI Studio-ல் பார்க்கவும்.
3. Active payment method மற்றும் pending verification சரிபார்க்கவும்.
4. Promo/free-trial credit active உள்ளதா பார்க்கவும்.
5. Preview model-ன் stricter limit-ஐ stable model-இலிருந்து வேறுபடுத்தவும்.

## Tier மற்றும் quota

Free, Tier 1, Tier 2, Tier 3 தனித்தனி allocations. Free RPM/RPD model-க்கு ஏற்ப மாறும்; 250 RPD universal number அல்ல. Tier 1 higher limits தரலாம், ஆனால் experimental மற்றும் preview models restrictive ஆக இருக்கலாம். Tier 2-க்கு cumulative $250 மற்றும் 30 நாட்கள், Tier 3-க்கு $1,000 மற்றும் 30 நாட்கள் போன்ற thresholds இருக்கலாம்; current official console/docs-ல் verify செய்யுங்கள்.

Quota project-க்கு பொருந்தும், API key-க்கு அல்ல. அதே project-ல் புதிய key உருவாக்கினாலும் limit அதிகரிக்காது. RPD midnight Pacific Time-ல் reset ஆகலாம்; official docs-ஐப் பார்த்து உறுதி செய்யுங்கள்.

## ஐந்து காரணங்கள் மற்றும் fixes

**Model variant:** `gemini-2.5-pro-exp-03-25` அல்லது `-experimental` free quota பயன்படுத்தலாம்; stable `gemini-2.5-pro` அல்லது available paid-preview variant முயற்சிக்கவும்.

**தவறான project key:** AI Studio-ல் billed project தேர்ந்தெடுத்து புதிய key உருவாக்கவும்.

**Billing sync delay:** Stable paid model மூலம் சிறிய call செய்து dashboard பார்க்கவும்; 24–48 மணி sync காத்திருக்கவும்.

**Promo credits:** Free trial அல்லது promotional balance paid tier-ஐ தாமதப்படுத்தலாம்; billing support review பெறவும்.

**Preview limits:** Preview/experimental models paid tier-ல்கூட stricter limits வைத்திருக்கும்; இது அவசியம் bug அல்ல.

## Tier verification

```bash
curl -s -D - "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' 2>&1 | grep -i "x-ratelimit"
```

`x-ratelimit-limit` மற்றும் `x-ratelimit-remaining` பார்க்கவும். Secret-ஐ commit அல்லது share செய்ய வேண்டாம். AI Studio API Keys marker, Cloud Console quota மற்றும் API response headers ஆகிய மூன்றையும் cross-check செய்யுங்கள். வேறுபாடு இருந்தால் model variant, key binding அல்லது sync சரிபார்க்கவும்.

Production-ல் batching, caching, queue, Batch API மற்றும் multi-model fallback பயன்படுத்துங்கள். Vertex AI quota தனித்தது; Gemini API tier தானாக transfer ஆகாது. Gateway-ஐ billing/fallback route ஆகப் பாருங்கள், Google quota அதிகரிக்கும் வழியாக அல்ல.

## FAQ

Stable model-லும் free limit இருந்தால் key-project binding மற்றும் billing sync பார்க்கவும். Promo credit பொதுவாக Tier 2/3 spend threshold-ல் சேராது. Paid plan safety, capacity அல்லது rate limit-ஐ நீக்காது.

## Further Reading

- [OpenAI-Compatible API Error Troubleshooting](/docs/api/errors/)
