---
title: একাধিক AI ছবিতে একই চরিত্র রাখার চার-শট consistency পদ্ধতি
description: আগে মুখ, hairstyle, body type, পোশাক ও art style lock করুন, তারপর neutral portrait, side/full-body, action এবং controlled scene দিয়ে consistency পরীক্ষা করুন।
date: 2026-07-28
category: ইমেজ জেনারেশন
tags: [Character Consistency, Same Character, AI Image Generation, Character Reference, Character Sheet]
readTime: 10
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: agent.gpt88.cc Image Quality & Crop Guide
---

একই character-এর বহু AI ছবি বানাতে প্রথম সুন্দর output-এর পেছনে ছুটবেন না। আগে ঠিক করুন কোন বৈশিষ্ট্য বদলালে দর্শক তাকে অন্য ব্যক্তি ভাববে। তারপর চারটি ক্রমশ কঠিন shot-এ পরীক্ষা করুন: neutral portrait, side বা full-body, dynamic action এবং controlled scene।

## “একই character” বলতে কী বোঝায়

Face structure, hairstyle silhouette, body proportions, clothing/props এবং visual language আলাদা আলাদাভাবে drift করতে পারে। শুধু মুখ মেলা যথেষ্ট নয়; side profile-এ nose bridge, full-body-তে head-to-body ratio বা signature coat-এর রং বদলালেও character বদলে যায়। আগে “must not change” ও “may change” লিখুন।

## Reference image-এর ভূমিকা

একটি পরিষ্কার, neutral, evenly lit ছবিকে approved identity anchor করুন। অতিরিক্ত reference কেবল missing angle পূরণ করবে: side view নাক ও মাথার পেছন দেখাবে, full-body অনুপাত ও পোশাক দেখাবে, close-up ছোট prop বা text দেখাবে। প্রতিটি ছবির role নির্ধারণ করুন। পরস্পরবিরোধী ছবি যোগ করলে consistency না বেড়ে face swap বা detail shuffle হতে পারে। sensitive person, unpublished IP বা client draft হলে visibility, retention, training ও commercial terms পরীক্ষা করুন।

## ছোট Character Lock Block

দীর্ঘ adjective নয়, দেখা ও যাচাই করা যায় এমন facts লিখুন। যেমন oval face, wide-set eyes, left brow-এর কাছে mole, dark-brown chin-length bob, প্রায় 7.5 heads tall, dark-green cloak, brass buttons, brown mail bag এবং soft picture-book style। আলাদা করে লিখুন expression, pose, camera, background ও weather বদলাতে পারে। Reject conditions লিখুন: mole হারানো, bob লম্বা হওয়া, cloak নীল হওয়া, button square হওয়া, bag অন্য পাশে যাওয়া বা output photoreal হওয়া।

## চার shot-এ consistency পরীক্ষা

1. **Neutral portrait:** simple background ও পরিষ্কার আলোতে face, hairline, color এবং accessories দেখুন। এটি fail হলে action-এ যাবেন না।
2. **Side বা full-body:** project-এর প্রয়োজন অনুযায়ী বেছে নিন। silhouette, shoulder, waist, hem ও prop position-ও দেখুন।
3. **Dynamic action:** running, bending, sword swing বা turning-এর মতো বাস্তব action নিন। occlusion ও perspective আসল চাপ তৈরি করে।
4. **Controlled scene/style pressure:** একবারে একটি বড় variable বদলান। text, logo, seal বা badge থাকলে final display size-এ পড়া যায় কি না দেখুন।

## Four-Shot Acceptance Record

Project-এ anchor file, reference version, locked features, allowed changes, hardest shot এবং unified check size লিখুন। প্রতিটি shot-এ face, body, hairstyle, clothing/props ও visual language-এর pass/fail এবং symptom নথিভুক্ত করুন। Overall সিদ্ধান্ত `pass / fix / switch route` রাখুন। failed image-কে symptom দিয়ে নাম দিন, যেমন “side-profile nose bridge দীর্ঘ হয়েছে”।

## Failure-এর পর একটি minimal retry

একবারে একটি বড় variable বদলান: side drift হলে clearer side reference, body drift হলে full-body reference, back-hair error হলে back contour reference। garment text বা badge-এর জন্য আগে text ছাড়া frame বানিয়ে deterministic typesetting post-production-এ করুন। দুই চরিত্রের scene-এ আগে আলাদাভাবে চার shot pass করান। এক retry-এর পরও একই dimension fail হলে blind reroll বন্ধ করে dedicated character feature, filtered training, split post-production বা manual retouching বেছে নিন।

## Reference, character feature ও training route

Plain prompt + reference ছোট concept set-এ কার্যকর, কিন্তু প্রতিটি generation identity নতুন করে interpret করতে পারে। Dedicated character feature বেশি scene ও pose-এ সাহায্য করে, তবে feature-এর নাম ফলের guarantee নয়। Training route high-volume serial-এ কাজে লাগতে পারে, কিন্তু data quality, cost, rights, privacy ও baked-in error-এর ঝুঁকি থাকে। route বাছুন hardest required shot দেখে, showcase portrait দেখে নয়।

## FAQ

### Fixed seed কি সবসময় একই character দেয়?

না। seed conditions পুনরাবৃত্তি করতে পারে, সম্পূর্ণ identity নয়।

### একটি character sheet কি যথেষ্ট?

না। side, full-body ও action shot আলাদা failure দেখাতে পারে।

### LoRA কি সবসময় reference image-এর চেয়ে স্থির?

না। training data ও configuration-এর উপর নির্ভর করে।

### দুই character-এর face swap কীভাবে আটকাব?

দুজনকে আলাদাভাবে চার shot-এ pass করিয়ে distinct lock block ব্যবহার করুন, তারপর দুইজনের composition পরীক্ষা করুন।

### Stills pass করলে video-ও consistent হবে?

অবশ্যই নয়। motion ও frame-to-frame identity-এর আলাদা test দরকার।

শেষ প্রশ্ন: project-এর সবচেয়ে কঠিন shot কি pass করেছে, নাকি শুধু frontal portrait সুন্দর?
