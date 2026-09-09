---
title: মুখ না বদলে ছবি upscale করুন: আগে route বাছুন, পরে face checklist-এ গ্রহণ করুন
description: Upscaling, AI super-resolution এবং generative redraw আলাদা করে identity-safe workflow ও face acceptance checklist।
date: 2026-07-28
category: প্রযুক্তি টিউটোরিয়াল
tags: [Photo Upscaling, Face Identity, Image Super-Resolution, 4K Images, Portrait Restoration]
readTime: 12
relatedPath: /docs/guides/agent-image-studio/
relatedTitle: Agent Image Studio
---

“একই ব্যক্তি থাকতে হবে” hard requirement হলে শক্তিশালী AI খোঁজার আগে route ঠিক করুন। Original রেখে bicubic বা Lanczos-এর মতো deterministic interpolation দিয়ে শুধু প্রয়োজনীয় pixel dimensions তৈরি করুন। এতে grid বড় হয়, কিন্তু না থাকা eyelashes, skin texture বা tooth detail ফিরে আসে না। Missing detail অনুমান করতে অনুমতি থাকলেই dedicated AI upscaler বা reference-image redraw ব্যবহার করুন। Sharper মানেই face unchanged নয়।

## Upscaling, Super-Resolution ও Restoration আলাদা করুন

- **Upscaling/resampling**: mathematical interpolation-এ width/height বদলায়; identity বোঝে না।
- **AI super-resolution**: learned pattern থেকে texture তৈরি করে এবং ভুল অনুমান করতে পারে।
- **Portrait restoration**: face detail, exposure, noise বা skin উন্নত করে; identity বদলাতে পারে।
- **Reference redraw**: original reference ধরে নতুন image বানায়; লক্ষ্য similar, pixel fidelity নয়।
- **Native high-resolution generation**: পুরনো ছবি বড় করে না, নতুন 2K/4K image তৈরি করে।

## চারটি route

| Route | উপযুক্ত ব্যবহার | Face-change risk | Delivery-এর আগে প্রমাণ |
| --- | --- | --- | --- |
| Deterministic interpolation | ID, archive, family photo, AI guessing নিষিদ্ধ | সর্বনিম্ন | dimensions, ratio, crop, format, same-scale face check |
| Dedicated AI upscaler | কিছু texture reconstruction গ্রহণযোগ্য | model/mode নির্ভর | sample, mode/scale, identity sheet, downloaded file |
| Generative redraw | poster/cover-এ “দেখতে একই” যথেষ্ট | সর্বোচ্চ | invariant item-by-item compare |
| Native generation | নতুন high-resolution image | original preserve প্রযোজ্য নয় | size, composition, subject target |

Detail যোগ করা নিষিদ্ধ হলে interpolation; সামান্য reconstruction চললে sample-based AI upscaler; শুধু similar ও সুন্দর হলে redraw; নতুন image হলে native generation।

## Reproducible workflow

### 1. “4K” নয়, বাস্তব dimensions লিখুন

Screen/platform width × height, aspect ratio, crop/padding, print size, PPI, format, transparency, color space এবং size limit নথিবদ্ধ করুন।

```text
required pixels = finished inches × target PPI
finished inches = finished cm ÷ 2.54
```

10 × 15 cm-এর 300 PPI print-এর জন্য প্রায় 1181 × 1772 pixels লাগে; print shop-এর specification-ই final authority।

### 2. Original রাখুন

Phone original, scan বা client source overwrite করবেন না। Original size, ratio, format, crop, target এবং allowed/must-not-change fields লিখুন। Real people, children, documents বা unpublished asset হলে processing location ও retention policy আগে যাচাই করুন।

### 3. AI guessing কতটা গ্রহণযোগ্য ঠিক করুন

একেবারেই না হলে aspect ratio রেখে Bicubic/Lanczos ব্যবহার করুন। সামান্য reconstruction হলে non-sensitive sample দিয়ে dedicated upscaler test করুন; denoise, face restoration, colorization ও sharpening একসঙ্গে চালু করবেন না। Redraw হলে expression, gaze, hairstyle, age, clothing, background, text ও crop invariant হিসেবে লিখুন।

### 4. একবারে একটি variable বদলান

প্রথমে 2× output; তারপর method বা AI mode এক-এক করে বদলান। Denoise, face enhancement ও sharpening আলাদা toggle করুন এবং route, tool, mode, scale ও output size record করুন। Social platform-এর recompressed preview-তে final সিদ্ধান্ত নেবেন না।

### 5. আগে file, পরে face

Width/height, ratio, crop, compression artifact এবং সত্যিই downloaded file যাচাই করুন। Original ও output-এর একই face crop ও একই display size-এ তুলনা করুন।

## Copyable face checklist

```text
[Task record]
Original: ________________   Output: ________________
Route: interpolation / AI upscale / reference redraw / native generation
Tool/model: __________  Mode/scale: __________
Original size: ____ × ____ px   Output size: ____ × ____ px
Aspect ratio and crop: pass / fail

[Same-scale face check]
[ ] চোখের shape, size, spacing, height এবং gaze অপরিবর্তিত
[ ] eyelids, brows, nose, nostrils, mouth, lips এবং teeth অপরিবর্তিত
[ ] jawline, face width, ears, hairline, expression ও apparent age অপরিবর্তিত
[ ] mole, scar, wrinkle যোগ/মুছে যায়নি
[ ] glasses, earrings, hat এবং accessories অপরিবর্তিত
[ ] people count, pose, hands, body, clothing, Logo ও text অপরিবর্তিত
[ ] background, lighting, halo, plastic skin ও over-sharpening পরীক্ষা

Conclusion: pass / rework / more faithful route
```

Identity-critical item বদলালে image বড় ও sharp হলেও fail করুন। Similarity score কেবল supporting signal।

## 800 × 1200 থেকে 1600 × 2400 উদাহরণ

Aspect ratio একই হলে 2× deterministic interpolation করুন, face restoration বন্ধ রাখুন, 1600 × 2400 যাচাই করুন এবং একই size-এর brow-to-chin crop তুলনা করুন। Face অপরিবর্তিত কিন্তু পুরনো blur দেখা গেলে faithful upscaling-এর সীমা এসেছে। Sharp eyelashes বা skin texture চাইলে সেটি আলাদা AI reconstruction task।

## কেন “Sharper” তবু fail হতে পারে?

Face সুন্দর কিন্তু আলাদা: generative overreach, interpolation-এ ফিরুন। Skin plastic: denoise/smoothing/sharpening আলাদা করে বন্ধ করুন। Head/shoulder crop: ratio/canvas policy ঠিক করুন। Text, Logo বা clothing বদলালে deterministic route বা controlled layers ব্যবহার করুন। Print blur হলে বাস্তব pixels যাচাই করুন; severe blur-এ rescan/reshoot বেশি নির্ভরযোগ্য।

## GPT88-এর ভূমিকা

GPT88 Agent Image Studio reference-image upload ও generative redraw-এ ব্যবহারযোগ্য, যখন recognizably consistent গ্রহণযোগ্য। এটি pixel-only upscaler নয় এবং face unchanged guarantee দেয় না। Precise identity requirement হলে local deterministic interpolation বা separately verified upscaler আগে বেছে নিন।

## FAQ ও acceptance lines

AI upscaling face কখনও বদলাবে না—এমন guarantee নেই। “Keep the original face” prompt acceptance evidence নয়। 4K মানেই real detail নয়। Bicubic smoother, Lanczos sharper হলেও halo বাড়াতে পারে; একই input/size-এ A/B করুন। Restoration ও upscaling reversible আলাদা ধাপে করুন। Face-recognition score একা যথেষ্ট নয়। Online portrait-এর আগে storage, deletion, training, processing location, sharing এবং compliance যাচাই করুন।

**File line**: width/height, ratio, crop, format ও compression pass।

**Identity line**: eyes, brows, nose, mouth, face shape, hairline, expression, age, identity markers ও non-face invariants pass।
