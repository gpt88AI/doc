---
title: Gemini AI Photo Prompts: copy-paste کے لیے 10 Chinese templates اور edit-acceptance طریقہ
description: Portrait، single-element edit، background swap، product shot، Chinese poster، multi-image composition اور targeted fix کے لیے 10 acceptance-ready Gemini templates۔
date: 2026-07-22
category: تکنیکی ٹیوٹوریل
tags: [Gemini, AI Photo Prompts, Image Editing, Chinese Prompt, AI Portraits]
readTime: 18
relatedPath: /docs/guides/agent-image-studio/
relatedTitle: Agent Image Studio
---

صرف “realistic, HD, cinematic” لکھنا کافی نہیں۔ بہتر prompt میں چار کالم ہوں: اس بار کیا کرنا ہے، کیا بدلنا ہے، کیا freeze رہے گا، اور کس visible result کو pass کہیں گے۔ `[fields]` اپنی معلومات سے بدلیں اور صرف authorized workflow میں استعمال کریں۔ Existing image edit میں input، single change، frozen scope اور acceptance criteria واضح کریں۔ Real photos کے لیے consent اور usage rights ضروری ہیں؛ prompt identity کو absolute guarantee نہیں دیتا۔

## Mainland China entry اور چار steps

2026-07-22 کی support information میں بعض Gemini Web contexts کے لیے Mainland China Workspace-only ہے۔ Chinese language support کا مطلب یہ نہیں کہ ہر personal account کو image feature ملے گا۔ VPN، borrowed account، proxy payment یا bypass اس guide کا حصہ نہیں؛ app، API، Cloud اور third-party routes الگ ہیں۔

Copy سے پہلے: (1) ایک primary operation چنیں: generate/edit/background swap/composite/fix؛ (2) ہر `[field]` بھریں؛ (3) face، product، composition، text، lighting اور brand elements freeze کریں؛ (4) قابلِ مشاہدہ acceptance لکھیں۔ Brackets Gemini syntax نہیں ہیں، اور prompt میں “4K” لکھنا pixel dimensions ثابت نہیں کرتا۔

## 10 copy-paste templates

### 1. Professional headshot

`[subject]`, `[temperament]`, `[background]`, `[clothing]`, `[frame]` بدلیں۔ صرف ایک adult، no text/logo/badge۔ Pass: head-and-shoulders مکمل، دونوں آنکھیں صاف، natural proportions اور clean background۔

```text
Operation: generate a natural professional headshot from scratch.
Subject: an adult [subject], with [temperament], wearing [clothing].
Scene: clean [background], head-and-shoulders, eyes to camera, [frame].
Protection: one adult only; no text, logo, badge, extra accessory or real-person imitation.
Pass: head and shoulders are not cropped, eyes and hairline are natural, no extra people or text.
```

### 2. Authorized photo portrait

Input، purpose، clothing اور background بدلیں؛ recognizable appearance، face shape، hair، pose، crop اور skin tone رکھیں۔ Full-size original سے item-by-item compare کریں؛ identity drift، extra jewelry یا background residue fail ہیں۔

### 3. صرف ایک element بدلیں

`[target]` کو `[old]` سے `[new]` کریں۔ Person، camera، crop، background، text، lighting، texture اور count freeze رکھیں۔ صرف target بدلے، edges پر bleed نہ ہو۔

### 4. Background swap

Subject outline، proportion، material، placement، crop، perspective اور contact shadow محفوظ رکھیں۔ New background کی light direction، vanishing point اور color temperature match ہوں۔ Halo، white border، leftover scene یا نئی occlusion fail ہے۔

### 5. E-commerce product hero

Staging بدلیں، product design نہیں۔ Geometry، connector/cap، part count، packaging colors، logo اور approved label text freeze کریں۔ Unreadable text، certifications، awards یا claims invent نہ کریں؛ side-by-side verify کریں۔

### 6. Chinese event poster

Main title، subtitle اور CTA approved copy کے طور پر الگ دیں۔ Word-for-word check کریں؛ dates، prices، URLs، QR، logo یا pseudo-text نہ بنائیں۔ ایک character کی غلطی پر fail کریں اور text-free visual + layout tool استعمال کریں۔

```text
Only these three lines may appear:
Main title: "[main title]"
Subtitle: "[subtitle]"
CTA: "[call-to-action]"
No other text, number, QR code or logo. Pass only on word-for-word match.
```

### 7. Text-free social cover

Platform ratio، theme، main visual اور whitespace position بھریں۔ Title safe area low-detail، face/hand/high-contrast texture سے خالی ہو؛ thumbnail میں subject واضح اور pseudo-text صفر ہو۔

### 8. Multiple reference roles

Image 1 صرف subject/product geometry اور label؛ Image 2 environment اور light؛ Image 3 material اور palette۔ Logos، text، people یا unrelated objects cross-over نہ ہوں۔ ہر input کا contribution traceable ہو۔

### 9. Authorized photo سے illustration

Line، palette، paper grain، material اور light جیسے observable attributes لکھیں؛ living artist کی exact style copy نہ مانگیں۔ Pose، outline، clothing، crop اور people count رکھیں؛ نئے people، text، logo یا sensitive symbols نہ جوڑیں۔

### 10. Previous version کا ایک failed field

Previous image، single failed item، correct target اور passed items دیں۔ Passed fields freeze رکھیں؛ redesign، نیا text، color shift یا crop change نہیں۔ Fix کے بعد zero drift چاہیے۔

## Failure fix، safety اور checklist

Head crop ہو تو صرف “8% safe margin” بدلیں؛ floating feet کے لیے contact shadow؛ connector کے لیے count/shape/position؛ poster typo کے لیے approved copy، دوبارہ fail ہو تو post-layout؛ confused references کے لیے single role۔ دو بار fail ہونے پر prompt adjectives نہ بڑھائیں، manual retouch یا clearer source اختیار کریں۔

Consent/rights نہ ہوں، private/sexualized/humiliating real-person image ہو، minor sexualization، impersonation، fake endorsement، fabricated news، identity deception، watermark removal یا safety bypass ہو تو فوراً رکیں۔

Delivery سے پہلے full-size compare، people/fingers/face/pose/age، product structure/labels/logo، Chinese copy word-for-word، ratio/crop/whitespace، unwanted objects، usage rights اور manual approval چیک کریں۔

## FAQ

جس زبان کو accurately review کر سکیں وہ استعمال کریں۔ Template کے تمام fields بھریں اور actual entry capabilities verify کریں۔ لمبا prompt drift ختم نہیں کرتا؛ ایک primary action اور frozen items بہتر ہیں۔ Identical face کی biometric guarantee نہیں۔ Poster میں zero typo کی guarantee نہیں؛ text کم رکھیں اور word-by-word check کریں۔ Daily limits account/plan/capacity کے مطابق بدلتے ہیں۔ Watermark ہٹانے کی کوشش نہ کریں اور refusal کو synonyms سے bypass نہ کریں۔

## Official References

- [Gemini Web app supported languages and countries/regions](https://support.google.com/gemini/answer/13575153?hl=en)
- [Generate and edit images with the Gemini app](https://support.google.com/gemini/answer/14286560?hl=en)
- [Gemini API image generation and editing docs](https://ai.google.dev/gemini-api/docs/image-generation)
