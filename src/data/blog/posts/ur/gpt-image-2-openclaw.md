---
title: OpenClaw میں GPT Image 2: API Key بمقابلہ Codex OAuth
description: OpenClaw میں openai/gpt-image-2 کے لیے billing، logs، org ownership اور route evidence دیکھ کر API key یا Codex OAuth منتخب کریں۔
date: 2026-05-06
category: تکنیکی ٹیوٹوریل
tags: [GPT Image 2, OpenClaw, OpenAI Codex OAuth, OpenAI API, Image Generation]
readTime: 10
relatedPath: /docs/guides/gpt-image-2-service-notice/
relatedTitle: GPT Image 2 Service Notes
---

OpenClaw میں model value `openai/gpt-image-2` لکھیں۔ اصل فیصلہ model name نہیں بلکہ authentication route ہے۔ Production billing، organization control اور traceable logs کے لیے `OPENAI_API_KEY` بہتر ہے۔ Codex OAuth صرف verified personal OpenClaw profile کے ساتھ استعمال کریں۔

پہلی کامیاب image کو ثبوت نہ سمجھیں۔ OpenClaw fallback provider استعمال کر سکتا ہے، OAuth profile غلط account یا expired token پر ہو سکتا ہے۔ Model explicitly set کریں، fallback disable/mark کریں، provider output یا logs دیکھیں، اور auth route، model name اور result ملائیں۔

## Route اور Config

| Route | مناسب کب | Evidence |
| --- | --- | --- |
| `OPENAI_API_KEY` | production billing، org control، audit logs | logs میں OpenAI اور `openai/gpt-image-2` |
| Codex OAuth | verified profile کے ساتھ personal test | account، workspace، provider output، no-fallback test |
| Fallback provider | failure کے بعد backup | output کو non-OpenAI mark کریں |

```json
{
  "agents": { "defaults": { "imageGenerationModel": { "primary": "openai/gpt-image-2" } } }
}
```

Runtime environment میں `OPENAI_API_KEY` رکھیں۔ GPT88 gateway کے لیے console key اور `https://gpt88.cc/v1` base URL استعمال کریں؛ model reference وہی رہے گا۔ OAuth route میں fake API key نہ بنائیں؛ current OpenAI/Codex profile verify کریں۔

## Route Verify اور Debug

Provider list کر کے چھوٹا test چلائیں:

```text
image_generate action=list
image_generate model=openai/gpt-image-2 prompt="A simple product icon on a white desk, no text"
```

Image کامیاب ہو مگر provider OpenAI نہ ہو تو fallback نے کام کیا۔ OAuth 403 میں profile، account، workspace، token، OpenClaw version اور fallback config دیکھیں۔ Unsupported model میں provider prefix اور access state چیک کریں۔ Transparent background failure unsupported parameter ہے؛ prompt بدلتے رہنا حل نہیں۔

Production میں API key route کا billing project/org، logs، quota، retry policy اور support owner واضح ہوتا ہے۔ Codex OAuth personal low-risk testing کے لیے آسان ہے مگر official free API key نہیں۔ 403 جاری رہے تو re-authenticate، پرانا profile صاف، fallback بند اور ضرورت پر API key استعمال کریں۔ 4K verification کو route verification سے الگ رکھیں اور saved pixel dimensions چیک کریں۔

## Common Failures اور FAQ

Tool/provider نہ ملے تو setup مکمل کریں؛ model unsupported ہو تو `openai/` prefix، version اور access دیکھیں؛ image بنے مگر OpenAI نہ ہو تو fallback isolate کریں؛ slow output میں پہلے route، quota، size اور fallback ثابت کریں۔ Transparent asset کے لیے دوسرا model یا post-processing استعمال کریں۔

### Model name کیا ہے؟

`openai/gpt-image-2`۔ Provider prefix ضروری ہے۔

### Codex OAuth کیا free API ہے؟

نہیں، یہ authentication route ہے، official free entitlement نہیں۔

### Production میں کیا منتخب کریں؟

عام طور پر `OPENAI_API_KEY`؛ OAuth صرف verified personal testing کے لیے۔

### Fallback کیسے ختم کریں؟

Fallback disable کریں، model explicit رکھیں اور provider logs inspect کریں۔

## Further Reading

- [GPT Image 2 Service Notes](/docs/guides/gpt-image-2-service-notice/)
- [GPT Image 2 4K Generation](/docs/blog/gpt-image-2-4k-image-generation/)
