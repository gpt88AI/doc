---
title: Gemini AI Photo Prompts: copy-paste का लागि १० Chinese template र edit-acceptance विधि
description: Portrait, single-element edit, background swap, product shot, Chinese poster, multi-image composition र targeted fix का लागि १० acceptance-ready Gemini template।
date: 2026-07-22
category: प्राविधिक ट्यूटोरियल
tags: [Gemini, AI Photo Prompts, Image Editing, Chinese Prompt, AI Portraits]
readTime: 18
relatedPath: /docs/guides/agent-image-studio/
relatedTitle: Agent Image Studio
---

“realistic, HD, cinematic” मात्र लेख्नु पर्याप्त छैन। राम्रो prompt मा चार कुरा छुट्टाउनुहोस्: अहिलेको operation, बदलिने कुरा, freeze रहने कुरा र pass हुने visible result। `[fields]` भर्नुहोस् र अधिकार भएको workflow मा मात्र प्रयोग गर्नुहोस्। Existing image edit मा input, single change, frozen scope र acceptance criteria स्पष्ट हुनुपर्छ। Real photo अघि consent र usage rights जाँच्नुहोस्; prompt ले identity को absolute guarantee दिँदैन।

## Entry र copy अघि चार चरण

2026-07-22 को support जानकारीमा केही Gemini Web context का लागि Mainland China Workspace-only छ। Chinese support हुनु personal account मा उही image feature पक्का हुनु होइन। VPN, borrowed account वा safety bypass यसमा छैन; app, API, Cloud र third-party route अलग छन्। पहिले generate/edit/background swap/composite/fix मध्ये एउटा primary operation छान्नुहोस्; `[field]` भर्नुहोस्; face, product, text, lighting र brand items freeze गर्नुहोस्; दृश्यात्मक acceptance लेख्नुहोस्। Prompt मा “4K” लेख्दैमा pixel dimensions प्रमाणित हुँदैन।

## १० copy-paste template

### 1. Professional headshot

`[subject]`, `[temperament]`, `[background]`, `[clothing]`, `[frame]` बदल्नुहोस्। एक adult मात्र, no text/logo/badge। Head-and-shoulders complete, clear eyes, natural proportions र clean background pass।

```text
Operation: generate a natural professional headshot from scratch.
Subject: an adult [subject], with [temperament], wearing [clothing].
Scene: clean [background], head-and-shoulders, eyes to camera, [frame].
Protection: one adult only; no text, logo, badge, extra accessory or real-person imitation.
Pass: head and shoulders are not cropped, eyes and hairline are natural, no extra people or text.
```

### 2. Authorized photo portrait

Input, purpose, clothing र background बदल्नुहोस्; appearance, face shape, hair, pose, crop र skin tone सुरक्षित राख्नुहोस्। Original सँग full-size item-by-item compare गर्नुहोस्; identity drift, extra jewelry वा background residue fail हुन्।

### 3. केवल एउटा element बदल्नुहोस्

`[target]` लाई `[old]` बाट `[new]` बनाउनुहोस्। Person, camera, crop, background, text, lighting, texture र count freeze राख्नुहोस्। Target मात्र बदलिए pass।

### 4. Background swap

Subject outline, proportion, material, placement, crop, perspective र contact shadow राख्नुहोस्। New background को light direction, vanishing point र color temperature मिलाउनुहोस्। Halo, white border, पुरानो scene वा नयाँ occlusion fail।

### 5. E-commerce product hero

Staging बदल्नुहोस्, product design होइन। Geometry, connector/cap, part count, packaging color, logo र approved label text freeze गर्नुहोस्। Unreadable text, certification, award वा claim invent नगर्नुहोस्; side-by-side verify गर्नुहोस्।

### 6. Chinese event poster

Main title, subtitle र CTA approved copy का रूपमा छुट्टै दिनुहोस्। Word-for-word जाँच्नुहोस्; date, price, URL, QR, logo वा pseudo-text नबनाउनुहोस्। एउटा character पनि गलत भए fail गरेर text-free visual + layout tool प्रयोग गर्नुहोस्।

```text
Only these three lines may appear:
Main title: "[main title]"
Subtitle: "[subtitle]"
CTA: "[call-to-action]"
No other text, number, QR code or logo. Pass only on word-for-word match.
```

### 7. Text-free social cover

Platform ratio, theme, main visual र whitespace position भर्नुहोस्। Title safe area low-detail, face/hand/high-contrast texture बिना हुनुपर्छ; thumbnail मा subject स्पष्ट र pseudo-text शून्य।

### 8. Multiple reference roles

Image 1 केवल subject/product geometry र label; Image 2 environment/light; Image 3 material/palette। Logo, text, people वा unrelated objects cross-over नहोस्। प्रत्येक input को contribution traceable हुनुपर्छ।

### 9. Authorized photo illustration

Line, palette, paper grain, material र light जस्ता observable attributes लेख्नुहोस्; living artist को exact style copy नमाग्नुहोस्। Pose, outline, clothing, crop र people count राख्नुहोस्; नयाँ people, text, logo वा sensitive symbols नथप्नुहोस्।

### 10. Previous version को एउटा failed field

Previous image, single failed item, correct target र passed items दिनुहोस्। Passed items freeze; redesign, नयाँ text, color shift वा crop change नगर्नुहोस्। Fix पछि zero drift चाहिन्छ।

## Failure fix र safety

Head crop भए 8% safe margin मात्र बदल्नुहोस्; floating feet भए contact shadow; connector भए count/shape/position; poster typo भए approved copy, फेरि fail भए post-layout; confused references भए प्रत्येक image लाई एउटै role दिनुहोस्। एउटै detail दुईपटक fail भए adjectives थपिरहनु भन्दा manual retouch वा clearer source रोज्नुहोस्।

Consent/rights बिना real-person private, sexualized वा humiliating image; minor sexualization; impersonation; fake endorsement; fabricated news; identity deception; watermark removal वा safety bypass भए तुरुन्त रोक्नुहोस्।

Delivery अघि full-size comparison, people/fingers/face/pose/age, product structure/labels/logo, Chinese copy word-for-word, ratio/crop/whitespace, unwanted objects, rights र approval जाँच्नुहोस्।

## FAQ

तपाईंले accurately review गर्न सक्ने भाषा प्रयोग गर्नुहोस्। Template का सबै fields भर्नुहोस् र actual entry capabilities verify गर्नुहोस्। लामो prompt ले drift समाप्त गर्दैन; एउटै primary action र frozen items राम्रो हुन्छन्। Identical face को biometric guarantee छैन। Chinese poster मा zero typo guarantee छैन; text घटाएर word-by-word जाँच्नुहोस्। Daily limit account/plan/capacity मा निर्भर हुन्छ। Watermark हटाउने prompt नदिनुहोस् र refusal लाई synonyms बाट bypass नगर्नुहोस्।

## Official References

- [Gemini Web app supported languages and countries/regions](https://support.google.com/gemini/answer/13575153?hl=en)
- [Generate and edit images with the Gemini app](https://support.google.com/gemini/answer/14286560?hl=en)
- [Gemini API image generation and editing docs](https://ai.google.dev/gemini-api/docs/image-generation)
