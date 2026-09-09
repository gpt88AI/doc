---
title: Gemini AI Photo Prompts: copy-paste සඳහා Chinese templates 10ක් සහ edit-acceptance ක්‍රමය
description: Portrait, single-element edit, background swap, product shot, Chinese poster, multi-image composition සහ targeted fix සඳහා acceptance-ready Gemini templates 10ක්.
date: 2026-07-22
category: තාක්ෂණික මාර්ගෝපදේශය
tags: [Gemini, AI Photo Prompts, Image Editing, Chinese Prompt, AI Portraits]
readTime: 18
relatedPath: /docs/guides/agent-image-studio/
relatedTitle: Agent Image Studio
---

“realistic, HD, cinematic” පමණක් ලිවීම හොඳ prompt එකක් නොවේ. කරුණු හතරක් වෙන් කරන්න: මේ වර කරන operation එක, වෙනස් කරන දේ, freeze කරන දේ සහ pass වන visible result එක. `[fields]` පුරවා හිමිකම් ඇති workflow එකක පමණක් භාවිතා කරන්න. Existing image edit එකක input, single change, frozen scope සහ acceptance criteria පැහැදිලි විය යුතුය. Real photo එකකට consent සහ usage rights පරීක්ෂා කරන්න; prompt එක identity එකේ absolute guarantee එකක් නොවේ.

## Entry සහ copy කිරීමට පෙර පියවර

2026-07-22 support තොරතුරු අනුව ඇතැම් Gemini Web contexts සඳහා Mainland China Workspace-only වේ. Chinese language support තිබීම personal account එකට image feature අනිවාර්යයෙන් ලැබෙන බව නොවේ. VPN, borrowed account හෝ safety bypass මෙහි නොමැත; app, API, Cloud සහ third-party routes වෙනමය. Generate/edit/background swap/composite/fix අතරින් එක primary operation එකක් තෝරන්න; `[field]` පුරවන්න; face, product, text, lighting සහ brand items freeze කරන්න; visible acceptance ලියන්න. Prompt එකේ “4K” ලියීම pixel dimensions සඳහා සාක්ෂියක් නොවේ.

## Templates 10ක්

### 1. Professional headshot

`[subject]`, `[temperament]`, `[background]`, `[clothing]`, `[frame]` වෙනස් කරන්න. එක් adult කෙනෙකු පමණක්, text/logo/badge නැත. Head-and-shoulders complete, clear eyes, natural proportions සහ clean background pass වේ.

```text
Operation: generate a natural professional headshot from scratch.
Subject: an adult [subject], with [temperament], wearing [clothing].
Scene: clean [background], head-and-shoulders, eyes to camera, [frame].
Protection: one adult only; no text, logo, badge, extra accessory or real-person imitation.
Pass: head and shoulders are not cropped, eyes and hairline are natural, no extra people or text.
```

### 2. Authorized photo portrait

Input, purpose, clothing සහ background වෙනස් කරන්න; appearance, face shape, hair, pose, crop සහ skin tone ආරක්ෂා කරන්න. Original සමඟ full-size item-by-item compare කරන්න; identity drift, extra jewelry සහ background residue fail වේ.

### 3. එක element එකක් පමණක් වෙනස් කරන්න

`[target]` `[old]` සිට `[new]` කරන්න. Person, camera, crop, background, text, lighting, texture සහ count freeze කරන්න. Target එක පමණක් වෙනස් නම් pass කරන්න.

### 4. Background swap

Subject outline, proportion, material, placement, crop, perspective සහ contact shadow තබන්න. New background හි light direction, vanishing point සහ color temperature match කරන්න. Halo, white border, old scene residue හෝ new occlusion fail වේ.

### 5. E-commerce product hero

Staging පමණක් වෙනස් කරන්න, product design නොවේ. Geometry, connector/cap, part count, packaging color, logo සහ approved label text freeze කරන්න. Unreadable text, certification, award හෝ claim invent නොකරන්න; side-by-side verify කරන්න.

### 6. Chinese event poster

Main title, subtitle සහ CTA approved copy ලෙස වෙනම දෙන්න. Word-for-word පරීක්ෂා කරන්න; date, price, URL, QR, logo හෝ pseudo-text නොසාදන්න. එක් character එකක් වැරදි නම් fail කර text-free visual + layout tool භාවිතා කරන්න.

```text
Only these three lines may appear:
Main title: "[main title]"
Subtitle: "[subtitle]"
CTA: "[call-to-action]"
No other text, number, QR code or logo. Pass only on word-for-word match.
```

### 7. Text-free social cover

Platform ratio, theme, main visual සහ whitespace position පුරවන්න. Title safe area low-detail, face/hand/high-contrast texture රහිත විය යුතුය; thumbnail එකේ subject පැහැදිලි, pseudo-text නැත.

### 8. Multiple reference roles

Image 1 subject/product geometry සහ label පමණක්; Image 2 environment/light; Image 3 material/palette. Logo, text, people හෝ unrelated objects cross-over නොවිය යුතුය. සෑම input එකක contribution එක traceable විය යුතුය.

### 9. Authorized photo illustration

Line, palette, paper grain, material සහ light වැනි observable attributes ලියන්න; living artist කෙනෙකුගේ exact style copy නොඉල්ලන්න. Pose, outline, clothing, crop සහ people count තබන්න; නව people, text, logo හෝ sensitive symbols නොඑකතු කරන්න.

### 10. Previous version එකේ failed field එකක්

Previous image, single failed item, correct target සහ passed items දෙන්න. Passed items freeze කරන්න; redesign, නව text, color shift හෝ crop change නොකරන්න. Fix එකෙන් පසු zero drift අවශ්‍යය.

## Failure fix සහ safety

Head crop නම් 8% safe margin පමණක් වෙනස් කරන්න; floating feet නම් contact shadow; connector නම් count/shape/position; poster typo නම් approved copy, නැවත fail නම් post-layout; confused references නම් සෑම image එකකටම එක role එකක් දෙන්න. එකම detail දෙවරක් fail නම් adjectives එකතු නොකර manual retouch හෝ clearer source තෝරන්න.

Consent/rights නැති real-person private, sexualized හෝ humiliating image; minor sexualization; impersonation; fake endorsement; fabricated news; identity deception; watermark removal හෝ safety bypass නම් වහාම නවත්වන්න.

Delivery පෙර full-size comparison, people/fingers/face/pose/age, product structure/labels/logo, Chinese copy word-for-word, ratio/crop/whitespace, unwanted objects, rights සහ approval පරීක්ෂා කරන්න.

## FAQ

ඔබට accurately review කළ හැකි භාෂාව භාවිතා කරන්න. Template fields සියල්ල පුරවා actual entry capabilities verify කරන්න. දිගු prompt එකක් drift ඉවත් නොකරයි; එක් primary action සහ frozen items වඩා හොඳය. Identical face සඳහා biometric guarantee නැත. Chinese poster zero typo guarantee නොවේ; text අඩු කර word-by-word check කරන්න. Daily limits account/plan/capacity මත රඳා පවතී. Watermark ඉවත් කිරීමට prompt නොදෙන්න; refusal synonyms මඟින් bypass නොකරන්න.

## Official References

- [Gemini Web app supported languages and countries/regions](https://support.google.com/gemini/answer/13575153?hl=en)
- [Generate and edit images with the Gemini app](https://support.google.com/gemini/answer/14286560?hl=en)
- [Gemini API image generation and editing docs](https://ai.google.dev/gemini-api/docs/image-generation)
