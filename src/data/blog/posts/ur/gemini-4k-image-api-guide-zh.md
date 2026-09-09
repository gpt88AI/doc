---
title: Gemini 4K Image API: موجودہ ماڈلز، کوڈ اور لاگت کی حدود
description: Gemini 4K image generation API کی عملی گائیڈ: موجودہ model ID، Interactions API، 1K/2K/4K tiers، Standard بمقابلہ Batch/Flex pricing، project quota اور 429 troubleshooting۔
date: 2026-01-20
category: API development
tags: [Gemini API, 4K Image Generation, Nano Banana Pro, Gemini 3 Pro Image, AI Image API]
readTime: 14
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Gemini 4K integration میں پرانے preview examples استعمال نہ کریں۔ موجودہ route `gemini-3-pro-image` ہے، اور نئے code میں Interactions API کے `response_format` سے image output کنٹرول کریں۔ Standard، Batch، Flex، Priority اور third-party gateway کی لاگت الگ رکھیں۔ 2026-07-08 کی mapping میں Nano Banana Pro کو Gemini 3 Pro Image اور model ID `gemini-3-pro-image` سے جوڑا گیا ہے۔ مثال کے طور پر 4K Standard تقریباً `$0.24/image` اور Batch/Flex تقریباً `$0.12/image` ہے؛ production سے پہلے official pricing دیکھیں۔

## موجودہ ماڈل کا انتخاب

| Model | شناخت | مناسب کام |
| --- | --- | --- |
| `gemini-3-pro-image` | Nano Banana Pro / Gemini 3 Pro Image | complex instructions، professional assets، 4K، strict text اور brand consistency |
| `gemini-3.1-flash-image` | Nano Banana 2 | عمومی generation، editing، iteration، کم لاگت اور رفتار |
| `gemini-3.1-flash-lite-image` | Nano Banana 2 Lite | بڑے volume، low-cost، low-latency tasks |
| `gemini-2.5-flash-image` | Legacy Nano Banana route | پرانے projects کی compatibility |

4K deliverable کے لیے پہلے `gemini-3-pro-image` evaluate کریں۔ صرف draft کے لیے 1K/2K یا سستا model زیادہ قابلِ کنٹرول ہے۔ نئے code کو پرانے preview names پر منحصر نہ کریں۔

## API key اور environment

API keys Google Cloud project سے وابستہ ہیں۔ Billing، quotas، logs اور rate limits کو project level پر triage کریں۔

```bash
export GEMINI_API_KEY="your_key_here"
```

Official libraries `GEMINI_API_KEY` یا `GOOGLE_API_KEY` پڑھتی ہیں؛ دونوں موجود ہوں تو `GOOGLE_API_KEY` ترجیح پا سکتی ہے۔ Production میں key کو frontend، mobile bundle، public repo یا logs میں نہ رکھیں۔

## Minimal 4K call

```python
from google import genai
import base64

client = genai.Client()
interaction = client.interactions.create(
    model="gemini-3-pro-image",
    input="Generate a 16:9 premium skincare product hero image",
    response_format={"type": "image", "aspect_ratio": "16:9", "image_size": "4K"},
)

if interaction.output_image:
    with open("gemini-4k-product-hero.png", "wb") as f:
        f.write(base64.b64decode(interaction.output_image.data))
```

`image_size` `1K`، `2K` یا `4K` tier منتخب کرتا ہے؛ اصل pixels aspect ratio پر منحصر ہیں۔ GPT88 Google-compatible surface کے لیے `https://img.gpt88.cc` اور console کا `YOUR_GPT88_API_KEY` استعمال کریں۔

## Reference images اور dimensions

Reference image سے composition rebuild، background swap یا branded asset بنایا جا سکتا ہے۔ Upload سے پہلے copyright اور usage rights دیکھیں۔ 4K ہمیشہ `4096x4096` نہیں: 1:1 = `4096 x 4096`، 16:9 = `5504 x 3072`، 9:16 = `3072 x 5504`، 4:5 = `3712 x 4608` ہو سکتا ہے۔ Web کے لیے 2K کافی ہو سکتا ہے؛ print، crop اور large display کے لیے 4K رکھیں۔

## Pricing، quota اور 429

مثالی Standard pricing: 1K/2K تقریباً `$0.134/image`، 4K تقریباً `$0.24/image`؛ Batch/Flex 4K تقریباً `$0.12/image`۔ Input text، reference images، thinking، Search grounding، retries اور failures بھی bill بدل سکتے ہیں۔ پہلے 1K/2K سے approval لیں، پھر final 4K بنائیں۔

Rate limits عموماً RPM، TPM، RPD اور IPM ہیں، اور project-level ہوتی ہیں؛ اضافی keys سے capacity خود بخود نہیں بڑھتی۔ 429 پر concurrency کم کریں، exponential backoff لگائیں، 4K queue کریں یا Batch/Flex استعمال کریں۔ Project ID، model ID، call type، size اور spend limit record کریں۔

## Gateway، prompts اور checklist

Third-party gateway payment اور compatible interface آسان کر سکتا ہے، مگر official Google API نہیں ہے۔ Current model name، `image_size`، حقیقی pixels، failure billing، logs، data boundary، refunds اور SLA verify کریں۔ GPT88 میں charge official usage × منتخب group multiplier سے دیکھیں۔ Prompt میں delivery purpose، subject constraints، frame، style، lighting، copy area اور post-processing لکھیں؛ صرف “8K” لکھنے سے API tier نہیں بدلتا۔

Launch سے پہلے `gemini-3-pro-image`، Interactions API، backend secret storage، current pricing، quota، 1K/2K/4K budget اور 429/403/empty-output handling verify کریں۔

## FAQ

Professional 4K کے لیے Pro کو پہلے evaluate کریں، drafts کے لیے Flash/Lite دیکھیں۔ پرانے preview model names نئے code میں نہ لائیں۔ Free Tier کو پرانے articles سے current نہ سمجھیں۔ `image_size="4K"` aspect ratio کے مطابق مختلف pixels دیتا ہے۔ SynthID کے بارے میں attribution اور AI usage شفاف رکھیں۔ 429 quota، spend limit یا temporary capacity کا مسئلہ ہو سکتا ہے۔

## Further Reading

- [Image Generation API](/docs/api/images/)
