---
title: Nano Banana 2، Pro یا 2 Lite: ڈیلیوری کے خطرے کے مطابق ماڈل منتخب کریں
description: ایک جیسے input، size اور acceptance criteria کے ساتھ Nano Banana 2 Lite، Nano Banana 2 اور Nano Banana Pro کے درمیان API route منتخب کریں۔
date: 2026-05-30
category: ماڈل موازنہ
tags: [Nano Banana 2 Lite, Nano Banana 2, Nano Banana Pro, ماڈل موازنہ, Image API]
readTime: 7
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

اگر کام کے لیے صرف تیز 1K direction screening چاہیے تو Nano Banana 2 Lite سے شروع کریں۔ 2K یا 4K، زیادہ variants یا عام generation اور editing چاہیے تو Nano Banana 2 بہتر آغاز ہے۔ Dense text، سخت brand rules، اہم product mockup یا مہنگا rework ہو تو ہی اسی input کے ساتھ Nano Banana Pro کا موازنہ کریں۔ یہ API routing کا فیصلہ ہے، Gemini App، AI Studio، Vertex یا third-party platform کی pricing کا دعویٰ نہیں۔

تین model IDs یہ ہیں: `gemini-3.1-flash-lite-image`، `gemini-3.1-flash-image` اور `gemini-3-pro-image`۔ کوئی ایک ماڈل ہر صورت میں بہترین نہیں۔ یکساں input اور acceptance criteria میں pass rate، retry count اور manual-revision time دیکھیں۔

## پہلے delivery risk کے مطابق route منتخب کریں

| ضرورت | آغاز | کب تبدیل کریں |
| --- | --- | --- |
| 1K preview، direction draft یا background variant | **Nano Banana 2 Lite** | 2K/4K درکار ہو یا 1K کافی نہ رہے |
| عام generation/editing، زیادہ sizes اور حقیقی deliverable | **Nano Banana 2** | text، structure، reference consistency یا rework بار بار ناکام ہو |
| high-risk brand asset، dense text یا complex mockup | **Nano Banana Pro** | logo، چھوٹا text، exact color یا regulated copy پھر بھی غیر مستحکم ہو |

Delivery size، reference assets، image text، retry budget اور final reviewer پہلے لکھیں۔ Lite کی official حد 1K ہے؛ size کی وجہ سے وہ خارج ہو تو صرف unit price کا موازنہ بے فائدہ ہے۔

## یکساں input کے ساتھ accepted-output cost test

Prompt، reference image، aspect ratio، size اور safety requirements یکساں رکھیں، صرف model ID بدلیں۔ اگر Lite مطلوبہ size نہیں دیتا تو `N/A` لکھیں۔ ہر sample کے لیے pass/fail، generation fee، retries، manual revision minutes اور review wait نوٹ کریں۔ Accepted-output cost = (model cost + manual revision cost) ÷ accepted count۔

ایک خوب صورت sample سے نتیجہ نہ نکالیں۔ Text poster، packaging، reference editing اور 4K key visual جیسے حقیقی deliverables پر test کریں۔

## کب upgrade کریں اور کب رک جائیں

اگر Lite صرف size limit کی وجہ سے ناکام ہو تو Nano Banana 2 یا Pro پر جائیں۔ اگر Nano Banana 2 یکساں input پر text accuracy، complex layout یا reference consistency میں بار بار ناکام ہو اور Pro retries یا manual edits کم کرے تو upgrade کا ثبوت ہے۔ Pro بھی logo، barcode، price، date اور regulated copy کی manual verification کا بدل نہیں۔

4K کے لیے Pro لازمی نہیں؛ Nano Banana 2 بھی 4K candidate ہے۔ Lite کا مطلب low-quality نہیں، اس کی بنیادی حد 1K ہے۔ API price ہر entry point کی حقیقی cost نہیں بتاتی کیونکہ region، quota، billing unit اور terms مختلف ہو سکتے ہیں۔
