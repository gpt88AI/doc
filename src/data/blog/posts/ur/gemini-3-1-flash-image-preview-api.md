---
title: Gemini 3.1 Flash Image Free Tier: Official API paid ہے، AI Studio صرف test کے لیے
description: gemini-3.1-flash-image کے official API free tier، AI Studio testing، current model ID اور Standard، Batch اور Gemini Apps کے فرق کو سمجھیں۔
date: 2026-02-27
category: API ڈویلپمنٹ
tags: [Gemini API, Image Generation, API Pricing, AI Studio]
readTime: 12
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

13 جون 2026 کی جانچ کے مطابق `gemini-3.1-flash-image` کے official Gemini Developer API میں Free Tier row نہیں ہے۔ AI Studio میں Nano Banana 2 کو browser میں آزمایا جا سکتا ہے، مگر اس سے backend application کا free production API quota ثابت نہیں ہوتا۔ موجودہ model ID `gemini-3.1-flash-image` ہے؛ پرانے tutorials کا `gemini-3.1-flash-image-preview` نئے code contract کے بجائے migration یا historical context ہے۔

**Route answer:** browser test کے لیے AI Studio، synchronous backend کے لیے paid Developer API Standard، waitable batch کے لیے paid Batch۔ Gemini Apps کے consumer limits کو API quota نہ سمجھیں۔

## فیصلہ پہلے

| سوال | موجودہ جواب | کہاں چیک کریں |
| --- | --- | --- |
| Official API free ہے؟ | نہیں؛ Standard اور Batch image rows میں Free Tier نہیں | Google Gemini API pricing |
| AI Studio | Browser testing | AI Studio |
| Nano Banana 2 | `gemini-3.1-flash-image` سے map ہوتا ہے | Google image docs |
| Preview ID | نئے code کے لیے نہیں | Google changelog |

## Access route پہلے چنیں

AI Studio browser experiment کے لیے ہے؛ Developer API Standard paid synchronous backend؛ Batch paid asynchronous اور سستا ہے، free نہیں؛ Gemini Apps personal consumer route ہے؛ third-party gateway کا اپنا contract ہے۔ AI Studio میں image بن جانا backend free quota کا ثبوت نہیں۔

## Official API pricing paid row ہے

| Output | Standard API | Batch API |
| --- | ---: | ---: |
| 0.5K | $0.045 | $0.022 |
| 1K | $0.067 | $0.034 |
| 2K | $0.101 | $0.050 |
| 4K | $0.151 | $0.076 |

یہ budget starting points ہیں، مستقل وعدہ نہیں۔ Release سے پہلے model ID، price اور billing row دوبارہ چیک کریں۔

## Current model ID استعمال کریں

نئے code میں `gemini-3.1-flash-image` رکھیں۔ `gemini-3.1-flash-image-preview` صرف پرانے repositories، migration notes یا historical URLs میں رہنا چاہیے۔ Code، logs، allowlists، billing dashboard اور tickets میں ID یکساں رکھیں۔

## Go-live سے پہلے real-time quota

اسی account سے AI Studio کھولیں جو API key یا project کا مالک ہے، وہی project منتخب کریں، model ID کی تصدیق کریں، پھر tier، RPM، TPM، RPD اور billing notes درج کریں۔ Demo، launch، migration یا traffic change سے پہلے دوبارہ دیکھیں۔

## AI Studio کب کافی ہے

Prompt comparison، reference image test، Nano Banana 2 fit اور internal design samples کے لیے کافی ہے۔ User wait، retry، logging، billing، storage یا go-live commitment آتے ہی Developer API planning پر جائیں۔ Gemini Apps consumer surface ہے، اس کی limits API limits نہیں۔

## Engineering acceptance اور migration

Model ID، project، date، prompt set، output size اور samples کو acceptable، needs-retry اور unacceptable میں record کریں۔ Standard اور Batch config الگ رکھیں؛ logs میں project، model، tier، size اور error لکھیں۔ Preview migration میں “free API” کو AI Studio testing یا official API without Free Tier سے بدلیں۔ Batch سستا paid async route ہے، free نہیں۔

## FAQ

### کیا Gemini 3.1 Flash Image کا free API tier ہے؟

نہیں۔ 13 جون 2026 کی Google pricing جانچ میں Standard اور Batch دونوں image rows میں Free Tier نہیں تھا۔

### کیا AI Studio free testing کے لیے استعمال ہو سکتا ہے؟

ہاں، browser test route کے طور پر؛ free backend production API quota کے طور پر نہیں۔

### کیا Nano Banana 2 وہی model ہے؟

Google image docs کے مطابق current model ID `gemini-3.1-flash-image` ہے۔

### کیا preview ID استعمال کریں؟

نئے code میں نہیں؛ صرف پرانے examples اور migration context میں۔

### کیا سستا Batch free ہے؟

نہیں۔ یہ waitable tasks کے لیے lower-priced paid async route ہے۔

### Exact quota کہاں چیک کریں؟

Current project کے AI Studio view میں model، tier، RPM، TPM، RPD اور billing notes دیکھیں۔
