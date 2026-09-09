---
title: Gemini API Free Tier Limits (2026): Project quota، API keys اور paid boundary
description: Gemini API free tier کو سمجھنے کی گائیڈ: model Free Tier status، project quota، API key ownership، AI Studio RPM/TPM/RPD اور paid project کی حد۔
date: 2026-04-25
category: API development
tags: [Gemini API, Free Tier, Rate Limits, AI Studio, Google AI]
readTime: 12
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

Gemini API free tier کوئی ایک مستقل public number نہیں۔ اصل capacity Google Cloud project، model، usage tier، region، billing status اور current policy پر منحصر ہے۔ 16 جولائی 2026 کو درست طریقہ یہ ہے: official pricing page پر exact model/feature کا Free Tier دیکھیں، پھر AI Studio میں اسی project کا live RPM، TPM، RPD، reset rules اور usage دیکھیں۔ ایک project میں کئی keys بنانے سے quota نہیں بڑھتا؛ key credential ہے، project quota اور billing کا owner ہے۔

## تین الگ سوال

کیا exact model/feature free ہے؟ current pricing page بتاتا ہے۔ Rate limits کیسے ہیں؟ RPM، TPM، RPD اور بعض image lines میں IPM دیکھیں۔ یہ project ابھی کتنا استعمال کر سکتا ہے؟ AI Studio project view بتاتا ہے۔ **Model free status، project live quota اور billing status الگ surfaces ہیں۔**

## Key quota pool نہیں

API key authentication credential ہے، independent free bucket نہیں۔ ایک ہی project کی Key A/B/C ایک quota share کرتی ہیں۔ 429 پر نئی same-project key بنانا عموماً حل نہیں۔ Key rotation کے لیے key رکھیں، quota کے لیے نہیں۔ Account، Cloud project، billing، exact model ID اور AI Studio کا project context verify کریں۔ Auth migration quota نہیں بڑھاتی؛ نئے keys auth keys default کر سکتے ہیں اور standard keys کے لیے 2026 میں migration ضروری ہو سکتی ہے۔

## Free Tier کہاں مناسب ہے؟

Learning، prompt validation، synthetic-data prototype اور occasional internal tools کے لیے۔ Real users، sensitive/commercial data، stable throughput، frequent 429 یا paid-only model کے لیے billed project استعمال کریں۔ Model family نام سے free status نہ نکالیں؛ text line free اور image line paid ہو سکتی ہے۔ Exact model ID اور Standard/Batch/Flex/Priority line current pricing سے verify کریں۔ Cloud free-trial credits کو Gemini API پر خودکار نہ سمجھیں۔ Billing کے بعد balance، plan، auto-recharge اور alerts monitor کریں۔

## Live quota check

1. Key manager account سے AI Studio کھولیں۔
2. App والا exact project منتخب کریں۔
3. Usage/rate-limit view کھولیں۔
4. Model ID confirm کریں۔
5. RPM، TPM، RPD، reset، tier اور billing status record کریں۔
6. Release، demo، migration اور traffic change سے پہلے دوبارہ چیک کریں۔

Release record میں project/account، key type، model/execution line، live values اور check date، billing plan/balance owner اور backoff/cache/fallback strategy لکھیں۔

## 429 یا `RESOURCE_EXHAUSTED`

Project verify کریں؛ model/API surface verify کریں؛ RPM/TPM/RPD الگ دیکھیں؛ concurrency کم اور exponential backoff کریں؛ prompt مختصر اور repeated result cache کریں؛ normal traffic cap ہو تو paid project لیں۔ Wrong project/model، region، billing، spend limit یا temporary capacity بھی وجہ ہو سکتی ہے۔ Same-project keys سے bypass نہ کریں۔

## فیصلہ اور FAQ

Free tier کو promise نہیں، measurement surface سمجھیں۔ Low-frequency، non-sensitive، retryable load live limits کے اندر ہو تو جاری رکھیں۔ Stable throughput، frequent 429، paid-only model، privacy/compliance یا user-facing failures ہوں تو paid project منتخب کریں۔ Exact quota AI Studio project view سے لیں، nickname سے “Gemini 3 free” نہ کہیں۔ Identical keys quota share کرتی ہیں، migration auth continuity ہے، capacity increase نہیں۔

## Further Reading

- [Billing Units](/docs/guides/billing-units/)
