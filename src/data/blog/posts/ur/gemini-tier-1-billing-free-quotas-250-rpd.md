---
title: Gemini Tier 1 billing کے باوجود free quota (250 RPD)؟ مکمل Fix Guide 2026
description: Billing کے بعد بھی 250 RPD دکھے تو experimental model، API key project binding، billing sync، promo credits اور preview limits چیک کریں۔
date: 2026-02-21
category: API development
tags: [Gemini API, API Troubleshooting, Rate Limit, Google AI]
readTime: 18
relatedPath: /docs/api/errors/
relatedTitle: OpenAI-Compatible API Error Troubleshooting
---

Google Cloud project میں billing enable ہونے کے باوجود Gemini API 250 RPD یا free-tier limit دکھا سکتا ہے۔ Billing status، project tier اور model-specific quota الگ layers ہیں۔ عام حل یہ ہے کہ `-exp`/`-experimental` model سے stable یا paid-preview model پر جائیں، billed project میں API key دوبارہ بنائیں اور sync کے لیے 24–48 گھنٹے دیں۔

## فوری checklist

1. Actual model ID دیکھیں؛ experimental variant free quota پر رہ سکتا ہے۔
2. AI Studio میں دیکھیں کہ API key کس billed project سے وابستہ ہے۔
3. Billing account کا active payment method اور pending verification چیک کریں۔
4. Promo یا free-trial credit active ہے یا نہیں دیکھیں۔
5. Preview model کی stricter limit کو stable model سے الگ سمجھیں۔

## Tier اور quota

Free، Tier 1، Tier 2 اور Tier 3 الگ allocations ہیں۔ Free RPM/RPD model کے مطابق بدلتے ہیں؛ 250 RPD universal number نہیں۔ Tier 1 higher limits دے سکتا ہے مگر experimental اور preview models پھر بھی restrictive ہو سکتے ہیں۔ Tier 2 کے لیے cumulative $250 اور 30 دن، Tier 3 کے لیے $1,000 اور 30 دن جیسے thresholds ہو سکتے ہیں؛ current official console/docs سے verify کریں۔

Quota project پر لاگو ہوتا ہے، API key پر نہیں۔ اسی project میں نئی key بنانے سے limit نہیں بڑھتی۔ RPD midnight Pacific Time پر reset ہو سکتا ہے؛ current official docs دیکھیں، Beijing time کا fixed conversion نہ مانیں۔

## پانچ root causes اور fixes

**Model variant:** `gemini-2.5-pro-exp-03-25` یا `-experimental` free quota استعمال کر سکتا ہے؛ stable `gemini-2.5-pro` یا available paid-preview variant آزمائیں۔

**غلط project key:** AI Studio میں billed project منتخب کر کے نئی key بنائیں اور application update کریں۔

**Billing sync delay:** Stable paid model سے ایک چھوٹا call کریں، billing dashboard دیکھیں اور 24–48 گھنٹے sync دیں۔

**Promo credits:** Free trial یا promotional balance paid tier کو delay کر سکتا ہے؛ billing support review لیں۔

**Preview limits:** Preview/experimental models paid tier پر بھی stricter limits رکھتے ہیں؛ اسے bug نہ سمجھیں۔

## Tier verification

```bash
curl -s -D - "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' 2>&1 | grep -i "x-ratelimit"
```

`x-ratelimit-limit` اور `x-ratelimit-remaining` دیکھیں۔ API secret commit یا share نہ کریں۔ AI Studio API Keys میں Free/Pay-as-you-go marker، Cloud Console quotas میں project limit، اور response headers میں real behavior cross-check کریں۔ Dashboard اور headers مختلف ہوں تو model variant، key binding یا sync دیکھیں۔

Production میں batching، caching، queue، Batch API اور multi-model fallback استعمال کریں۔ Vertex AI کا quota الگ ہے اور Gemini API tier خودکار طور پر منتقل نہیں ہوتا۔ Gateway کو billing/fallback route سمجھیں، Google quota بڑھانے کا طریقہ نہیں۔

## FAQ

Stable model پر بھی free limit ہو تو key-project binding اور billing sync چیک کریں۔ Promo credit عموماً Tier 2/3 spend threshold میں نہیں گنا جاتا۔ Paid plan safety، capacity یا rate limits ختم نہیں کرتا۔

## Further Reading

- [OpenAI-Compatible API Error Troubleshooting](/docs/api/errors/)
