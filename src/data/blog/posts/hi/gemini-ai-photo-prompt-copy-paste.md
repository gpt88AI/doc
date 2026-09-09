---
title: Gemini AI Photo Prompts: कॉपी-पेस्ट के लिए 10 Chinese templates और edit-acceptance method
description: Portrait, single-element edit, background swap, product shot, Chinese poster, multi-image composition और targeted fix के लिए 10 acceptance-ready Gemini prompt templates।
date: 2026-07-22
category: तकनीकी ट्यूटोरियल
tags: [Gemini, AI Photo Prompts, Image Editing, Chinese Prompt, AI Portraits]
readTime: 18
relatedPath: /docs/guides/agent-image-studio/
relatedTitle: Agent Image Studio
---

सिर्फ “realistic, HD, cinematic” जोड़ना अच्छा prompt नहीं बनाता। अधिक reproducible तरीका है चार बातें अलग लिखना: इस बार क्या करना है, क्या बदलना है, क्या freeze रखना है और किस visible result को pass मानना है। नीचे के सभी templates में `[bracketed fields]` बदलें और केवल उस workflow में उपयोग करें जिसके लिए आपको अधिकार है। Generation और editing अलग हैं: existing image edit में input, single change, frozen scope और acceptance criteria स्पष्ट होने चाहिए। Real photo से पहले consent और usage rights की पुष्टि करें; prompt identity को absolute guarantee नहीं कर सकता।

## Mainland China में entry पहले जाँचें

2026-07-22 की official support information में Mainland China को कुछ Gemini Web contexts में Workspace-only बताया गया है। Language support का अर्थ personal account को वही image feature उपलब्ध होना नहीं है। यह लेख VPN, borrowed account, proxy payment या safety bypass नहीं देता और app, API, Cloud तथा third-party entry को एक नहीं मानता। Feature उपलब्ध न हो तो नीचे के templates को authorized image tool या design workflow के creative brief की तरह उपयोग करें।

## Copy करने से पहले चार कदम

1. एक primary operation चुनें: generate, edit, background swap, multi-image compose या previous fix।
2. हर `[field]` को subject, scene, ratio, copy और target से भरें।
3. Freeze items स्पष्ट करें: face, product structure, composition, text, lighting और brand elements।
4. Visible acceptance लिखें: people count, word-for-word text, crop, edges और shadows।

Brackets Gemini syntax नहीं हैं। UI में size और export अलग सेट करें; prompt में “4K” लिखना pixel dimensions का प्रमाण नहीं।

## 10 copy-paste templates

### 1. Natural professional headshot

**Replace**: `[subject]`, `[temperament]`, `[background]`, `[clothing]`, `[frame]`। **Protect**: केवल एक adult, no text/logo/badge। **Accept**: head-and-shoulders complete, दोनों eyes clear, natural proportions, clean background।

```text
Operation: generate a natural professional headshot from scratch.
Subject: an adult [subject], with [temperament], wearing [clothing].
Scene: clean [background], head-and-shoulders, eyes to camera, [frame].
Protection: one adult only; no text, logo, badge, extra accessory or real-person imitation.
Pass: head and shoulders are not cropped, eyes and hairline are natural, no extra people or text.
```

### 2. Authorized photo को professional portrait बनाना

**Replace**: input image, purpose, clothing adjustment, background। **Protect**: recognizable appearance, face shape, hair, pose, crop और skin tone। **Accept**: original से item-by-item तुलना; no identity drift, jewelry या background residue।

```text
Edit my authorized [input image] for [purpose]. Replace only the background with [background] and clothing with [clothing adjustment]. Keep face shape, eye spacing, nose-lip relation, hairstyle, age, skin tone, expression, pose and crop. No jewelry, glasses, tattoos, badges or body reshaping. Pass only if identity, pose and edges match the original at full size.
```

### 3. केवल एक element बदलें

Target `[element]` को `[old state]` से `[new state]` करें। बाकी व्यक्ति, camera, crop, background, text, lighting, texture और object count freeze रखें। Pass तभी जब केवल target बदले और edges पर color bleed न हो।

### 4. Background swap

Subject की outline, proportion, material, placement, crop, perspective और contact shadow रखें। `[new background]` लगाएँ; light direction, focal-length feel, vanishing point और color temperature match करें। Halos, white border, leftover scene या new occlusion fail हैं।

### 5. E-commerce product hero

Original product image से staging बदलें, design नहीं। Geometry, ratio, connector/cap position, part count, packaging color, logo shape और approved label text freeze करें। Unreadable text, certification, award, specification या claim invent न करें। Side-by-side verify करें; no missing/extra parts और no promotional text।

### 6. Chinese event poster

तीन approved lines अलग दें: main title, subtitle, CTA। Text छोटा रखें और word-for-word जाँचें। Dates, prices, URL, QR, logo, English translation या pseudo-text generate न करें। एक character भी mismatch हो तो fail करें और text-free visual + layout tool अपनाएँ।

```text
Only these three lines may appear:
Main title: "[main title]"
Subtitle: "[subtitle]"
CTA: "[call-to-action]"
No other text, number, QR code or logo. Pass only on word-for-word match.
```

### 7. Text-free social cover

`[platform ratio]`, `[theme]`, `[main visual]` और `[whitespace position]` भरें। Title safe area low-detail, continuous और face/hand/high-contrast texture से खाली हो। Thumbnail पर subject पहचानने योग्य हो और pseudo-text बिल्कुल न हो।

### 8. Multiple reference images को roles दें

Image 1 केवल subject/product geometry और label संभाले; Image 2 केवल environment और light relationships; Image 3 केवल material और palette। Logos, text, people या unrelated objects cross-over न हों। Acceptance में लिखें कि कौन-सा output किस input से आया।

### 9. Authorized photo को original illustration language में बदलें

Observable attributes लिखें: line, palette, paper grain, material और light। किसी living artist की exact style copy न माँगें। Pose, outline, clothing structure, crop, people count और meaning रखें; नए people, text, logos, political/religious symbols न जोड़ें।

### 10. Previous version का केवल एक failed field ठीक करें

`[previous image]`, `[single failed item]`, `[correct target]` और `[already-passed items]` भरें। Passed items frozen रखें; layout redesign, new text, color shift या crop change न होने दें। Fix के बाद सभी passed items में zero drift चाहिए।

## Failure fix: एक समय में एक variable

Head crop हो तो केवल “head के ऊपर 8% safe margin” बदलें। Floating feet हों तो contact shadow और light direction जोड़ें। Product connector बिगड़े तो count, shape और position फिर से दें। Poster typo हो तो approved copy फिर दें; दोबारा fail हो तो post-layout करें। Reference roles confused हों तो हर image को single role दें। दो बार वही detail fail हो और नई hypothesis न हो तो prompt adjectives जोड़ते न रहें; manual retouching, layout या clearer source चुनें।

## तुरंत रुकने वाली स्थितियाँ

Consent/usage rights न हों; real person की private, sexualized, humiliating या retaliatory image हो; minors sexualized हों; impersonation, fake endorsement, fabricated news, identity-verification deception, watermark/provenance removal या safety bypass का उद्देश्य हो; या system refusal के बाद केवल wording छिपानी हो—तो रुकें। Legitimate request में authorization, non-deceptive purpose और narrow edit स्पष्ट करें; refusal रहे तो manual/clearer source अपनाएँ, evasion नहीं।

## 60-second pre-delivery checklist

- Original और output full-size side-by-side compare किए?
- People count, fingers, face, pose और age drift नहीं?
- Product structure, connectors, labels, logo, colors और count match?
- Chinese text, numbers, dates और brand copy word-for-word match?
- Ratio, crop, safe margins और whitespace सही?
- Unrequested people, text, QR, marks या objects नहीं?
- Generation, editing, publication और commercial rights मौजूद?
- Manual retouching, layout, fact-check या approval अभी बाकी तो नहीं?

## FAQ

Chinese या English में वही लिखें जिसे आप accurately review कर सकें। Whole block copy करते समय सभी fields भरें, irrelevant conditions हटाएँ और entry की capabilities verify करें। लंबा prompt drift रोकता नहीं; एक primary action और frozen items बेहतर हैं। Identical face की biometric guarantee नहीं है। Chinese poster में zero typo की guarantee नहीं; text कम रखें और word-by-word check करें। Daily image limit account, plan, feature और capacity पर निर्भर है। Watermark हटाने का prompt न लिखें। Refusal के बाद synonyms से bypass न करें; legitimate scope स्पष्ट करें या रुकें।

## Official References

- [Gemini Web app supported languages and countries/regions](https://support.google.com/gemini/answer/13575153?hl=en)
- [Generate and edit images with the Gemini app](https://support.google.com/gemini/answer/14286560?hl=en)
- [Gemini API image generation and editing docs](https://ai.google.dev/gemini-api/docs/image-generation)
