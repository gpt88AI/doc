---
title: Gemini 3 Pro Image API Quota Limits: Tier موازنہ، 429 حل اور cost optimization
description: Gemini 3 Pro Image API کے RPM/TPM/RPD/IPM quota، Tier comparison، 429 RESOURCE_EXHAUSTED diagnosis، exponential backoff اور Batch/high-concurrency architecture سمجھیں۔
date: 2026-01-14
category: API ڈویلپمنٹ
tags: [Gemini API, API Quota Management, Image Generation, Rate Limits, Google AI]
readTime: 18
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

Gemini 3 Pro Image میں quota limits production کی بنیادی رکاوٹ ہیں۔ دسمبر 2025 کی تبدیلیوں کے بعد پرانے free-tier مفروضوں پر چلنے والی apps اچانک 429 دے سکتی ہیں۔ Nano Banana Pro کے نام سے بھی معروف یہ model 4K output دیتا ہے، مگر official API میں free quota فرض نہ کریں۔ Quota dynamic ہے؛ budget یا launch سے پہلے official rate-limits page دوبارہ چیک کریں۔

## چار quota dimensions

- **RPM:** فی minute requests؛ 1K اور 4K دونوں ایک request گنے جاتے ہیں۔
- **TPM:** prompt، reference images اور resolution کی compute کھپت؛ 1K/2K تقریباً 1,120 tokens اور 4K تقریباً 2,000 tokens ہو سکتا ہے۔
- **RPD:** روزانہ requests؛ Pacific midnight پر reset ہو سکتی ہے۔
- **IPM:** فی minute images؛ RPM باقی ہونے کے باوجود IPM ختم ہو تو 429 آتا ہے۔

Quota project level پر ہے، API key level پر نہیں۔ ایک ہی project میں کئی keys بنانے سے pool نہیں بڑھتا۔ Tier upgrade یا نیا project ہی عملی راستہ ہے۔

## Tier comparison

Gemini 3 Pro Image کے لیے API Free Tier فرض نہ کریں؛ consumer Gemini app کی 2 images/day حد بھی API quota نہیں ہے۔

| Tier | عام شرط | Gemini 3 Pro Image مثال |
| --- | --- | --- |
| Free | model-specific limits | اس image model کے لیے API Free Tier نہیں سمجھیں |
| Tier 1 | Cloud Billing enable | 100 RPM، 1,000 RPD، 10 IPM |
| Tier 2 | تقریباً $250 spend اور 30 دن | 500 RPM، 5,000 RPD، 20 IPM |
| Tier 3 | تقریباً $1,000 spend اور 30 دن | 1,000 RPM، unlimited RPD، 100 IPM |

یہ historical/example values ہیں؛ current project، model اور tier کی official table دیکھیں۔

## Model اور pricing

Model 1K، 2K اور 4K output دیتا ہے۔ مثال official price: 1K/2K تقریباً `$0.134` فی image، 4K تقریباً `$0.240`؛ Batch تقریباً 50% کم ہو سکتا ہے۔ Input، retries اور channel مکمل bill بدل سکتے ہیں۔

## 429 RESOURCE_EXHAUSTED diagnosis

RPM میں burst کے بعد recovery، TPM میں لمبے prompt یا high resolution کا تعلق، RPD میں دن کے آخر میں errors، اور IPM میں صرف image requests کا fail ہونا عام patterns ہیں۔ Dimension پہچانے بغیر retry نہ کریں۔

## Exponential backoff

429 کے لیے exponential backoff اور jitter استعمال کریں۔ Delay بڑھائیں، maximum cap رکھیں اور retries محدود رکھیں۔ پانچ retries کے بعد queue، کم resolution، Batch یا fallback route استعمال کریں۔ Blind retry quota اور cost دونوں بڑھاتا ہے۔

## Tier upgrade اور cost optimization

Cloud Billing bind کرنا Tier 1 کا عام داخلہ ہے؛ Tier 2/3 spend اور account age پر منحصر ہو سکتے ہیں۔ Resolution، prompt اور reference input کم کریں، duplicate requests cache کریں، idempotency رکھیں اور async jobs Batch میں بھیجیں۔ Cost per accepted image record کریں۔

## High-concurrency architecture

Request queue، token-bucket limiter، per-project quota monitor، retry queue اور dead-letter queue رکھیں۔ متعدد projects quota الگ کر سکتے ہیں، مگر billing اور policy ذمہ داری بھی بڑھتی ہے۔ Official API اور Gateway کو dual channel رکھیں اور model ID، cost، errors، fallback الگ log کریں۔

## Gateway کی حد

Gateway access، local payment، logs اور support آسان بنا سکتا ہے، مگر Google official quota یا pricing کا source نہیں۔ Console/logs سے route، billing unit، concurrency، failure charge اور no-image response verify کریں۔ Evidence کے بغیر “unlimited” یا “always stable” نہ لکھیں۔

## FAQ

### Quota کب reset ہوتی ہے؟

Dimension کے مطابق مختلف؛ RPD Pacific midnight پر reset ہو سکتی ہے۔ Current console اور official docs دیکھیں۔

### کیا کئی API keys quota بڑھاتی ہیں؟

نہیں، ایک project کی keys ایک ہی quota pool شیئر کرتی ہیں۔

### 429 پر صرف retry کریں؟

نہیں۔ RPM/TPM/RPD/IPM پہچان کر backoff، queue، resolution یا route بدلیں۔

### Consumer app کی free images API میں استعمال ہو سکتی ہیں؟

نہیں۔ Consumer اور Developer API quotas الگ ہیں۔

### کیا Batch سستا ہے؟

Async قابلِ قبول ہو تو cost کم ہو سکتی ہے، مگر realtime response کا بدل نہیں۔

### Production سے پہلے کیا verify کریں؟

Current model ID، pricing، tier، RPM/TPM/RPD/IPM، retry cost، logs، fallback اور accepted-output rate۔
