---
title: Nano Banana کیا ہے؟ Features، Pricing اور Prompt Tips (2026 Guide)
description: Google Nano Banana، Gemini 2.5 Flash Image، Nano Banana Pro، free quotas، pricing اور عملی prompt tips کی مکمل guide۔
date: 2026-01-09
category: Gemini专题
tags: [Nano Banana, Gemini, AI Image Generation, Google AI, Prompt Tips]
readTime: 12
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

## Nano Banana کیا ہے؟

Nano Banana Google DeepMind کے Gemini خاندان کی AI image generation اور editing capability کا codename ہے۔ یہ الگ standalone model نہیں بلکہ Gemini multimodal architecture کے اندر image module ہے، اسی لیے complex instructions، context اور conversational iteration کو سمجھتا ہے۔

| Version | Official Name | Release | Positioning |
| --- | --- | --- | --- |
| Nano Banana | Gemini 2.5 Flash Image | Aug 26, 2025 | تیز، روزمرہ استعمال |
| Nano Banana Pro | Gemini 3 Pro Image Preview | Nov 20, 2025 | professional quality |

سادہ الفاظ میں، Nano Banana Gemini کی drawing capability ہے: آپ chat کی طرح scene بیان کرتے ہیں اور model image بناتا یا edit کرتا ہے۔

## History اور 3D Figurine Trend

اگست 2025 میں LMArena پر ایک anonymous model نے consistent characters، complex scenes اور realistic images بنائیں۔ 26 اگست کو Google نے اسے Gemini 2.5 Flash Image کے طور پر confirm کیا۔ نومبر میں Pro version آیا، جس میں 2K/4K output، بہتر text rendering، 14 reference images اور Google Search grounding شامل ہیں۔ Viral 3D figurine output دراصل realistic 2D image ہے؛ `.STL` یا `.OBJ` printable file کے لیے الگ conversion درکار ہے۔

## Core Features

- **Text-to-image:** scene، lighting اور style کو natural language میں بیان کریں؛ keyword stacking سے بچیں۔
- **Image editing:** elements شامل/حذف، style transfer اور local adjustments؛ Pro میں masked editing۔
- **Multi-image composition:** کئی references کو ایک scene میں ملائیں؛ Pro 14 images اور 5 characters تک consistency رکھتا ہے۔
- **Text rendering:** Pro long text، calligraphy اور متعدد زبانوں کو بہتر render کرتا ہے۔
- **Web Search grounding:** current weather، recipes یا sports scores جیسے live data استعمال کیے جا سکتے ہیں۔

## Free Quotas اور Pricing

Gemini App free users کو 2 images/day، Google AI Studio کو 500 requests/day اور نئے Google Cloud users کو $300/90 days credit مل سکتا ہے۔ Quotas UTC midnight پر reset ہوتے ہیں؛ successes، filtered requests اور technical failures بھی quota استعمال کر سکتے ہیں۔ Pro quota ختم ہونے پر plain Nano Banana پر fallback ہو سکتا ہے۔ API prices: Gemini 2.5 Flash Image $0.039/image، Gemini 3 Pro Image 1K-2K $0.134 اور 4K $0.24۔ Batch API میں 24-hour delay کے بدلے 50% discount ہو سکتا ہے۔

GPT88 unified gateway سے OpenAI-compatible یا native Google interface استعمال کیا جا سکتا ہے۔ Current console میں model coverage، RMB pricing اور failed-request billing verify کریں، اور API key source code میں نہ رکھیں۔

## Prompt Tips

Natural language استعمال کریں، مثلاً “an orange cat sitting on a neon-lit street...”۔ Background بدلتے وقت subject کی lighting برقرار رکھنے کا context دیں۔ پہلے base image بنائیں، پھر کئی rounds میں refine کریں۔ Multi-image composition میں اہم reference پہلے رکھیں۔ Text کے لیے exact words quotes میں، position، font اور size بتائیں۔ Consistency کے لیے وہی reference reuse کریں اور facial features identical رکھنے کی ہدایت دیں۔

Blurry text کے لیے Pro اور explicit font size، warped faces کے لیے clear frontal reference، inconsistent style کے لیے concrete style description اور filtered content کے لیے safety settings یا rephrasing آزمائیں۔

## FAQ

Nano Banana speed اور 1024 output کے لیے ہے؛ Pro quality، 4K، بہتر text اور 14-image composition کے لیے۔ Free Gemini App users کو 2 images/day اور AI Studio کو up to 500 requests/day ملتے ہیں۔ Images میں invisible SynthID watermark ہوتا ہے۔ Commercial use latest Google terms اور content policies کے تابع ہے۔ Chinese prompts اچھے کام کرتے ہیں، مگر complex instructions English میں زیادہ accurate ہو سکتی ہیں۔

## Further Reading

- [Nano Banana Pro Multi-Reference Guide](/en/docs/blog/nano-banana-pro-multi-reference-guide/)
- [Nano Banana Pro Pricing & Quota Guide](/en/docs/blog/nano-banana-pro-pricing-quota-guide-2026/)
- [Google Image Generation API](/en/docs/api/images/)
