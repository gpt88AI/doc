---
title: Gemini AI Photo Prompts: কপি-পেস্টের জন্য ১০টি Chinese template ও edit-acceptance পদ্ধতি
description: Portrait, single-element edit, background swap, product shot, Chinese poster, multi-image composition ও targeted fix-এর জন্য ১০টি acceptance-ready Gemini prompt template।
date: 2026-07-22
category: প্রযুক্তি টিউটোরিয়াল
tags: [Gemini, AI Photo Prompts, Image Editing, Chinese Prompt, AI Portraits]
readTime: 18
relatedPath: /docs/guides/agent-image-studio/
relatedTitle: Agent Image Studio
---

শুধু “realistic, HD, cinematic” লিখলে ভালো prompt হয় না। Rework কমাতে চারটি বিষয় আলাদা লিখুন: এখন কী করবেন, কী বদলাবেন, কী স্থির থাকবে এবং কোন দৃশ্যমান ফল pass হবে। নিচের template-এ `[bracketed field]` বদলান এবং কেবল অনুমোদিত workflow-এ ব্যবহার করুন। Existing image edit-এ input, single change, frozen scope ও acceptance criteria অবশ্যই স্পষ্ট করুন। Real photo ব্যবহারের আগে consent ও usage rights যাচাই করুন; prompt identity অপরিবর্তিত থাকার absolute guarantee দেয় না।

## Mainland China entry যাচাই করুন

2026-07-22-এর official support তথ্য অনুযায়ী কিছু Gemini Web context-এ Mainland China Workspace-only। Simplified Chinese support মানেই personal account-এ একই image feature পাওয়া নয়। এই গাইড VPN, borrowed account, proxy payment বা safety bypass শেখায় না এবং app, API, Cloud ও third-party entry আলাদা রাখে। Feature না থাকলে template-কে authorized tool বা design workflow-এর creative brief হিসেবে ব্যবহার করুন।

## Copy করার আগে চার ধাপ

1. একটি primary operation বাছুন: generate, edit, background swap, multi-image compose বা fix।
2. প্রতিটি `[field]` subject, scene, ratio, copy ও target দিয়ে পূরণ করুন।
3. Face, product structure, composition, text, lighting ও brand element freeze করুন।
4. দৃশ্যমান acceptance লিখুন: people count, word-for-word text, crop, edge ও shadow।

## ১০টি copy-paste template

### 1. Natural professional headshot

`[subject]`, `[temperament]`, `[background]`, `[clothing]`, `[frame]` বদলান। এক adult, no text/logo/badge protect করুন। Head-and-shoulders, clear eyes, natural proportions ও clean background pass।

```text
Operation: generate a natural professional headshot from scratch.
Subject: an adult [subject], with [temperament], wearing [clothing].
Scene: clean [background], head-and-shoulders, eyes to camera, [frame].
Protection: one adult only; no text, logo, badge, extra accessory or real-person imitation.
Pass: head and shoulders are not cropped, eyes and hairline are natural, no extra people or text.
```

### 2. Authorized photo থেকে professional portrait

Input image, purpose, clothing adjustment ও background বদলান। Recognizable appearance, face shape, hair, pose, crop ও skin tone রাখুন। Original-এর সঙ্গে full-size item-by-item compare করুন; identity drift, extra jewelry বা background residue fail।

```text
Edit my authorized [input image] for [purpose]. Replace only the background with [background] and clothing with [clothing adjustment]. Keep face shape, eye spacing, nose-lip relation, hairstyle, age, skin tone, expression, pose and crop. No jewelry, glasses, tattoos, badges or body reshaping. Pass only if identity, pose and edges match the original.
```

### 3. কেবল একটি element পরিবর্তন

`[target element]`-কে `[old state]` থেকে `[new state]` করুন। Person, camera, crop, background, text, lighting, texture ও object count freeze রাখুন। কেবল target বদলালে pass।

### 4. Background swap

Subject outline, proportion, material, placement, crop, perspective ও contact shadow রাখুন। New background-এ light direction, vanishing point ও color temperature match করুন। Halo, white border, leftover scene বা new occlusion fail।

### 5. E-commerce product hero

Product design নয়, শুধু staging বদলান। Geometry, connector/cap, part count, packaging color, logo shape ও approved label text freeze করুন। Unreadable text, certification, award, specification বা claim invent করবেন না। Side-by-side verify করুন।

### 6. Chinese event poster

Main title, subtitle ও CTA আলাদা approved copy হিসেবে দিন। Text ছোট রাখুন এবং word-for-word check করুন। Date, price, URL, QR, logo বা pseudo-text generate করবেন না। একটি character ভুল হলেও fail; text-free visual + layout tool ব্যবহার করুন।

```text
Only these three lines may appear:
Main title: "[main title]"
Subtitle: "[subtitle]"
CTA: "[call-to-action]"
No other text, number, QR code or logo. Pass only on word-for-word match.
```

### 7. Text-free social cover

Platform ratio, theme, main visual ও whitespace position পূরণ করুন। Title safe area low-detail, face/hand/high-contrast texture-মুক্ত রাখুন। Thumbnail-এ subject চেনা যাবে এবং pseudo-text থাকবে না।

### 8. Multiple reference image-এর role

Image 1 শুধু subject/product geometry ও label; Image 2 শুধু environment ও light; Image 3 শুধু material ও palette। Logo, text, people বা unrelated object cross-over নয়। Acceptance-এ কোন input কী দিয়েছে লিখুন।

### 9. Authorized photo থেকে original illustration

Line, palette, paper grain, material ও light-এর মতো observable attributes লিখুন; living artist-এর exact style কপি চাইবেন না। Pose, outline, clothing, crop ও people count রাখুন। New people, text, logo বা sensitive symbol যোগ করবেন না।

### 10. Previous version-এর একটি failed field fix

Previous image, single failed item, correct target ও already-passed items দিন। Passed items freeze রাখুন; layout redesign, নতুন text, color shift বা crop change নয়। Fix-এর পর passed items-এ zero drift চাই।

## Failure fix

Head crop হলে শুধু “head-এর ওপর 8% safe margin” বদলান। Floating feet হলে contact shadow ও light direction দিন। Product connector ভুল হলে count, shape ও position পুনরায় লিখুন। Poster typo হলে approved copy পুনরায় দিন; আবার ভুল হলে post-layout। Reference roles confused হলে প্রতিটি image-কে একটি role দিন। একই detail দুইবার fail হলে adjectives যোগ না করে manual retouching, layout বা clearer source বেছে নিন।

## কখন সঙ্গে সঙ্গে থামবেন

Consent বা usage rights না থাকলে; real person-এর private, sexualized, humiliating বা retaliatory image হলে; minor sexualization, impersonation, fake endorsement, fabricated news, identity deception, watermark/provenance removal বা safety bypass হলে থামুন। Legitimate request-এ authorization ও non-deceptive use পরিষ্কার করুন; refusal bypass করবেন না।

## 60-second checklist

- Full-size side-by-side comparison হয়েছে?
- People count, fingers, face, pose ও age drift নেই?
- Product structure, connector, label, logo, color ও count মেলে?
- Chinese copy, number, date ও brand text word-for-word মেলে?
- Ratio, crop, safe margin ও whitespace ঠিক?
- Unrequested people, text, QR, marks বা object নেই?
- Generation, editing, publication ও commercial rights আছে?
- Manual retouch, layout, fact-check বা approval বাকি নেই?

## FAQ

যে ভাষা আপনি accurately review করতে পারেন সেটিই ব্যবহার করুন; Chinese যথেষ্ট হলে অযথা English-এ machine-translate করবেন না। Whole block copy করলে সব field পূরণ করুন এবং entry-এর capabilities যাচাই করুন। দীর্ঘ prompt drift দূর করে না; one primary action ও frozen items ভালো। Identical face-এর biometric guarantee নেই। Chinese poster zero typo guarantee করে না; text কমিয়ে word-by-word check করুন। Daily limit account, plan ও capacity নির্ভর। Watermark সরানোর prompt দেবেন না। Refusal-এর পর synonym দিয়ে bypass না করে legitimate scope পরিষ্কার করুন বা থামুন।

## Official References

- [Gemini Web app supported languages and countries/regions](https://support.google.com/gemini/answer/13575153?hl=en)
- [Generate and edit images with the Gemini app](https://support.google.com/gemini/answer/14286560?hl=en)
- [Gemini API image generation and editing docs](https://ai.google.dev/gemini-api/docs/image-generation)
