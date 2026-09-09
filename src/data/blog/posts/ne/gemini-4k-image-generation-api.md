---
title: अनुहार नबदली फोटो upscale गर्ने: पहिले route, त्यसपछि face checklist
description: Upscaling, AI super-resolution र generative redraw अलग गरेर identity-safe workflow र face acceptance checklist।
date: 2026-07-28
category: प्राविधिक ट्यूटोरियल
tags: [Photo Upscaling, Face Identity, Image Super-Resolution, 4K Images, Portrait Restoration]
readTime: 12
relatedPath: /docs/guides/agent-image-studio/
relatedTitle: Agent Image Studio
---

“व्यक्ति उही हुनुपर्छ” hard requirement हो भने पहिले route रोज्नुहोस्। Original सुरक्षित राखेर bicubic वा Lanczos जस्तो deterministic interpolation बाट चाहिएको pixel dimensions मात्र बनाउनुहोस्। यसले grid ठूलो बनाउँछ, तर नभएको eyelashes, skin texture वा teeth detail फर्काउँदैन। AI ले missing detail अनुमान गर्न पाउने हो भने मात्र dedicated AI upscaler वा reference-image redraw प्रयोग गर्नुहोस्। Sharper हुनु भनेको face unchanged हुनु होइन।

## Upscaling, Super-Resolution र Restoration छुट्याउनुहोस्

- **Upscaling/resampling**: mathematical interpolation बाट width/height बदल्छ; identity बुझ्दैन।
- **AI super-resolution**: learned pattern बाट texture बनाउँछ र गलत अनुमान गर्न सक्छ।
- **Portrait restoration**: facial detail, exposure, noise वा skin सुधार्छ; identity बदल्न सक्छ।
- **Reference redraw**: original लाई reference बनाएर नयाँ image बनाउँछ; लक्ष्य similar हो, pixel fidelity होइन।
- **Native high-resolution generation**: पुरानो photo ठूलो बनाउँदैन; नयाँ 2K/4K image बनाउँछ।

## चार route

| Route | प्रयोग | Face-change risk | Delivery अघि जाँच |
| --- | --- | --- | --- |
| Deterministic interpolation | ID, archive, family photo, AI guessing निषेध | सबैभन्दा कम | dimensions, ratio, crop, format, same-scale face check |
| Dedicated AI upscaler | केही texture reconstruction स्वीकार्य | model/mode मा निर्भर | sample, mode/scale, identity sheet, downloaded file |
| Generative redraw | poster/cover मा “looks like” पर्याप्त | सबैभन्दा बढी | invariants item-by-item compare |
| Native generation | नयाँ high-resolution image | original preserve लागू हुँदैन | size, composition, subject targets |

Detail थप्न नपाइने हो भने interpolation; थोरै reconstruction स्वीकार्य भए sample-based AI upscaler; similar मात्र पर्याप्त भए redraw; नयाँ image भए native generation।

## Reproducible workflow

“4K” मात्र होइन, वास्तविक width × height, aspect ratio, crop/padding, print size, PPI, format, transparency, color space र size limit लेख्नुहोस्। Print formula:

```text
required pixels = finished inches × target PPI
finished inches = finished cm ÷ 2.54
```

10 × 15 cm लाई 300 PPI मा करिब 1181 × 1772 pixels चाहिन्छ; print shop specification अन्तिम authority हो। Phone original, scan वा client source overwrite नगर्नुहोस्। Size, ratio, format, crop, target र allowed/must-not-change fields record गर्नुहोस्।

AI guessing निषेध भए aspect ratio जोगाएर Bicubic/Lanczos प्रयोग गर्नुहोस्। Reconstruction स्वीकार्य भए non-sensitive sample मा dedicated upscaler test गर्नुहोस्; denoise, face restoration, colorization र sharpening एकैपटक नचलाउनुहोस्। Redraw मा expression, gaze, hairstyle, age, clothing, background, text र crop लाई invariants बनाउनुहोस्।

पहिले 2× output बनाउनुहोस्; method वा AI mode एकपटकमा एउटा मात्र बदल्नुहोस्; denoise, face enhancement र sharpening अलग toggle गर्नुहोस्; route, tool, mode, scale र output size record गर्नुहोस्। पहिले file का dimensions, ratio, crop, compression artifacts र वास्तविक downloaded file जाँच्नुहोस्, त्यसपछि original र output को एउटै face crop तथा display size मा तुलना गर्नुहोस्।

## Face-identity checklist

```text
[Task record]
Original: ________________   Output: ________________
Route: interpolation / AI upscale / reference redraw / native generation
Tool/model: __________  Mode/scale: __________
Original size: ____ × ____ px   Output size: ____ × ____ px
Aspect ratio and crop: pass / fail

[Same-scale face check]
[ ] आँखाको shape, size, spacing, height र gaze उस्तै
[ ] eyelids, brows, nose, nostrils, mouth, lips र teeth उस्तै
[ ] jawline, face width, ears, hairline, expression र apparent age उस्तै
[ ] mole, scar, wrinkle थपिएको वा हटाइएको छैन
[ ] glasses, earrings, hat र accessories उस्तै
[ ] people count, pose, hands, body, clothing, Logo र text उस्तै
[ ] background, lighting, halos, plastic skin र over-sharpening जाँच

Conclusion: pass / rework / more faithful route
```

Identity-critical item बदलिए image ठूलो र sharp भए पनि fail गर्नुहोस्। Similarity score supporting signal मात्र हो।

## 800 × 1200 बाट 1600 × 2400 उदाहरण

Aspect ratio मिल्छ भने 2× deterministic interpolation गर्नुहोस्, face restoration बन्द राख्नुहोस्, 1600 × 2400 verify गर्नुहोस् र एउटै brow-to-chin crop compare गर्नुहोस्। Face उस्तै तर पुरानो blur मात्र देखिए faithful upscaling को सीमा पूरा भयो। Sharp eyelashes वा skin texture चाहियो भने त्यो अलग AI reconstruction task हो।

माथिल्लो भाग वा shoulders crop भए clarity होइन, ratio/canvas policy समस्या हो। Text, Logo वा clothing pattern बदलियो भने deterministic route वा controlled layers प्रयोग गर्नुहोस्। Print blur मा PPI metadata होइन, वास्तविक pixels हेर्नुहोस्; severe blur मा rescan/reshoot बढी भरपर्दो हुन्छ।

## GPT88 को भूमिका

GPT88 Agent Image Studio reference-image upload र generative redraw का लागि उपयोगी हुन सक्छ, जब recognizably consistent पर्याप्त हुन्छ। यो pixel-only upscaler होइन र face unchanged guarantee दिँदैन। Precise identity चाहिँदा local deterministic interpolation वा separately verified upscaler पहिले रोज्नुहोस्।

## FAQ र acceptance lines

AI upscaling ले अनुहार कहिल्यै बदल्दैन भन्ने guarantee छैन। “Keep the original face” prompt acceptance evidence होइन। 4K ले नयाँ detail वास्तविक छ भन्ने प्रमाण दिँदैन। Bicubic smoother र Lanczos sharper हुन सक्छ, तर halo बढाउन सक्छ; एउटै input/size मा A/B गर्नुहोस्। Restoration र upscaling reversible अलग steps मा गर्नुहोस्। Face-recognition score एक्लै पर्याप्त छैन। Online portrait अघि storage, deletion, training, processing location, sharing र compliance जाँच्नुहोस्।

**File line**: width/height, ratio, crop, format र compression pass।

**Identity line**: eyes, brows, nose, mouth, face shape, hairline, expression, age, identity markers र non-face invariants pass।
