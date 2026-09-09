---
title: Gemini AI Photo Prompts: copy-paste செய்ய 10 Chinese templates மற்றும் edit-acceptance முறை
description: Portrait, single-element edit, background swap, product shot, Chinese poster, multi-image composition மற்றும் targeted fix-க்கான 10 acceptance-ready Gemini templates.
date: 2026-07-22
category: தொழில்நுட்ப வழிகாட்டி
tags: [Gemini, AI Photo Prompts, Image Editing, Chinese Prompt, AI Portraits]
readTime: 18
relatedPath: /docs/guides/agent-image-studio/
relatedTitle: Agent Image Studio
---

“realistic, HD, cinematic” என்று மட்டும் எழுதுவது நல்ல prompt அல்ல. நான்கு பகுதிகளைத் தனியாக எழுதுங்கள்: இப்போது செய்யும் செயல், மாற்ற வேண்டியது, freeze செய்ய வேண்டியது, pass ஆகும் visible result. `[fields]` நிரப்பி, உரிமை உள்ள workflow-ல் மட்டும் பயன்படுத்தவும். Existing image edit-ல் input, single change, frozen scope, acceptance criteria தெளிவாக இருக்க வேண்டும். Real photos-க்கு consent மற்றும் usage rights தேவை; prompt identity-ஐ absolute guarantee செய்யாது.

## Entry மற்றும் copy முன் நான்கு படிகள்

2026-07-22 support தகவலில் சில Gemini Web contexts-க்கு Mainland China Workspace-only. Chinese support என்பது ஒவ்வொரு personal account-க்கும் image feature கிடைக்கும் என அர்த்தமல்ல. VPN, borrowed account அல்லது safety bypass இதில் இல்லை; app, API, Cloud, third-party routes வேறு. முதலில் generate/edit/background swap/composite/fix ஆகியவற்றில் ஒரு primary operation தேர்வு செய்யவும்; `[field]` நிரப்பவும்; face/product/text/lighting/brand items freeze செய்யவும்; பார்க்கக்கூடிய acceptance எழுதவும். Prompt-ல் “4K” எழுதுவது pixel dimensions-க்கு சான்றல்ல.

## 10 templates

### 1. Professional headshot

`[subject]`, `[temperament]`, `[background]`, `[clothing]`, `[frame]` மாற்றவும். ஒரு adult மட்டும், text/logo/badge இல்லை. Head-and-shoulders, தெளிவான கண்கள், natural proportions, clean background pass.

```text
Operation: generate a natural professional headshot from scratch.
Subject: an adult [subject], with [temperament], wearing [clothing].
Scene: clean [background], head-and-shoulders, eyes to camera, [frame].
Protection: one adult only; no text, logo, badge, extra accessory or real-person imitation.
Pass: head and shoulders are not cropped, eyes and hairline are natural, no extra people or text.
```

### 2. Authorized photo portrait

Input, purpose, clothing, background மாற்றவும்; appearance, face shape, hair, pose, crop, skin tone பாதுகாக்கவும். Original-ஐ full-size item-by-item compare செய்யவும்; identity drift, extra jewelry, background residue fail.

### 3. ஒரு element மட்டும் மாற்றவும்

`[target]`-ஐ `[old]` இருந்து `[new]` ஆக மாற்றவும். Person, camera, crop, background, text, lighting, texture, count freeze. Target மட்டும் மாறினால் pass.

### 4. Background swap

Subject outline, proportion, material, placement, crop, perspective, contact shadow பாதுகாக்கவும். New background-ன் light direction, vanishing point, color temperature match வேண்டும். Halo, white border, leftover scene, new occlusion fail.

### 5. E-commerce product hero

Staging மட்டும் மாற்றவும்; product design வேண்டாம். Geometry, connector/cap, part count, packaging color, logo, approved label text freeze. Unreadable text அல்லது claims invent செய்ய வேண்டாம்; side-by-side verify செய்யவும்.

### 6. Chinese event poster

Main title, subtitle, CTA-ஐ approved copy ஆகத் தனியாகக் கொடுக்கவும். Word-for-word check செய்யவும்; date, price, URL, QR, logo, pseudo-text வேண்டாம். ஒரு character தவறினாலும் fail செய்து text-free visual + layout tool பயன்படுத்தவும்.

```text
Only these three lines may appear:
Main title: "[main title]"
Subtitle: "[subtitle]"
CTA: "[call-to-action]"
No other text, number, QR code or logo. Pass only on word-for-word match.
```

### 7. Text-free social cover

Platform ratio, theme, main visual, whitespace position நிரப்பவும். Title safe area low-detail ஆகவும், face/hand/high-contrast texture இல்லாமலும் இருக்க வேண்டும்; thumbnail-ல் subject தெளிவு, pseudo-text இல்லை.

### 8. Multiple references-க்கு roles

Image 1 subject/product geometry மற்றும் label மட்டும்; Image 2 environment/light மட்டும்; Image 3 material/palette மட்டும். Logos, text, people, unrelated objects cross-over ஆகக்கூடாது. ஒவ்வொரு input contribution traceable ஆக இருக்க வேண்டும்.

### 9. Authorized photo illustration

Line, palette, paper grain, material, light போன்ற observable attributes எழுதவும்; living artist exact style copy கேட்க வேண்டாம். Pose, outline, clothing, crop, people count நிலைத்திருக்க வேண்டும்; புதிய people, text, logo, sensitive symbols வேண்டாம்.

### 10. Previous version-ன் ஒரு failed field

Previous image, single failed item, correct target, passed items கொடுக்கவும். Passed items freeze; redesign, புதிய text, color shift, crop change வேண்டாம். Fix பின் zero drift அவசியம்.

## Failure fix மற்றும் safety

Head crop என்றால் 8% safe margin மட்டும் மாற்றவும்; floating feet என்றால் contact shadow; connector என்றால் count/shape/position; poster typo என்றால் approved copy, மீண்டும் தவறினால் post-layout; confused references என்றால் ஒவ்வொரு image-க்கும் single role. ஒரே detail இருமுறை fail ஆனால் adjectives சேர்க்காமல் manual retouch அல்லது clearer source தேர்வு செய்யவும்.

Consent/rights இல்லாமல் real-person private/sexualized/humiliating image, minor sexualization, impersonation, fake endorsement, fabricated news, identity deception, watermark removal அல்லது safety bypass என்றால் உடனே நிறுத்தவும்.

Delivery முன் full-size comparison, people/fingers/face/pose/age, product structure/labels/logo, Chinese copy word-for-word, ratio/crop/whitespace, unwanted objects, rights மற்றும் approval சரிபார்க்கவும்.

## FAQ

நீங்கள் accurately review செய்யக்கூடிய மொழியைப் பயன்படுத்தவும். Template fields அனைத்தையும் நிரப்பி actual entry capabilities verify செய்யவும். நீளமான prompt drift-ஐ நீக்காது; ஒரு primary action மற்றும் frozen items சிறந்தவை. Identical face-க்கு biometric guarantee இல்லை. Chinese poster zero typo guarantee இல்லை; text குறைத்து word-by-word check செய்யவும். Daily limits account/plan/capacity சார்ந்தவை. Watermark அகற்ற வேண்டாம்; refusal-ஐ synonyms மூலம் bypass செய்ய வேண்டாம்.

## Official References

- [Gemini Web app supported languages and countries/regions](https://support.google.com/gemini/answer/13575153?hl=en)
- [Generate and edit images with the Gemini app](https://support.google.com/gemini/answer/14286560?hl=en)
- [Gemini API image generation and editing docs](https://ai.google.dev/gemini-api/docs/image-generation)
