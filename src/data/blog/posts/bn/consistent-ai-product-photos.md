---
title: AI পণ্য ছবিতে একই পণ্য ঠিক রাখার বাস্তব QC পদ্ধতি
description: আগে আসল SKU লক করুন, পরে শুধু দৃশ্য বদলান। reference package, lock/allow-change matrix, six-frame stress test এবং per-image QC দিয়ে ভুল আকৃতি, রং, লেখা ও variant কমান।
date: 2026-07-28
category: ইমেজ জেনারেশন
tags: [AI Product Photos, Product Consistency, Ecommerce Photography, Reference Images, Product Image QC]
readTime: 12
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: Agent Image Quality & Crop Guide
---

একই পণ্য নিয়ে বহু AI product photo বানানোর প্রথম কাজ prompt বারবার বদলানো নয়; বাস্তব SKU-এর একটি reference package বানানো। দুটি তালিকা লিখুন: “কখনও বদলাবে না” এবং “বদলাতে পারে”। প্রতিটি ছবিকে বাস্তব ছবির পাশে মিলিয়ে দেখুন। shape, parts, packaging text, Logo, color বা specification ভুল হলে সেটি aesthetic সমস্যা নয়, product-fact সমস্যা।

বাস্তব ক্রম: অনুমতিপ্রাপ্ত বর্তমান ছবি দিয়ে ground truth তৈরি করুন; product identity লক করুন; শুধু scene, props, light ও crop বদলান; আগে ছয়-ফ্রেম stress test চালান; তারপর একই QC table-এ প্রতিটি ছবি দেখুন। Reference image সহায়তা করে, auto-replication নিশ্চিত করে না। fixed prompt বা seed-ও SKU-এর নির্ভুলতা প্রমাণ করে না।

## Product identity ও visual style আলাদা করুন

| বিষয় | যা লক থাকবে | যা বদলাতে পারে | সাধারণ ভুল |
| --- | --- | --- | --- |
| Product identity | silhouette, parts, label, color, material, variant | বাস্তব data সমর্থন করলে angle | cap/port বদলানো, ভুল color/capacity |
| Visual style | campaign-এর সামগ্রিক দিক | background, props, light, composition | shadow ও product scale-এর অমিল |

একটি set style-এ একরকম হলেও ভুল পণ্য দেখাতে পারে। আগে পণ্যটি সত্যি কি না দেখুন, পরে সৌন্দর্য ও campaign cohesion দেখুন।

## বাস্তব reference package বানান

প্রতি SKU-তে রাখুন: পরিষ্কার hero image, side/back/top/bottom angle, Logo ও label close-up, SKU fact card এবং channel delivery table। একটি front photo শুধু front প্রমাণ করে; back বা open state-এর তথ্য না থাকলে AI অনুমান করবে। পুরোনো packaging, অন্য color/capacity, bundle ও single item আলাদা রাখুন। অজানা উৎস বা অধিকারহীন asset সরান।

## Lock / Allow-change matrix

যেমন frosted-white 50 mL serum bottle-এ silhouette, silver pump, clear cap, label, color, material ও 50 mL specification লক থাকবে। background, props, lighting ও crop বদলাতে পারে। Acceptance method লিখুন: same-angle photo দিয়ে silhouette overlay, parts গোনা, label অক্ষর ধরে পড়া এবং material reflection মিলানো।

## Universal prompt নয়, modular prompt

Prompt-কে product lock, allowed changes, scene task, camera/lighting, forbidden changes এবং acceptance conditions-এ ভাগ করুন। বাস্তব reference অনুযায়ী silhouette, pump, cap, label, material ও 50 mL অপরিবর্তিত রাখুন; শুধু background, surface, props, light ও crop বদলান; নতুন part, text, color, material বা অদেখা back structure বানাবেন না। এতে ব্যর্থতা বোঝা যায়, সাফল্যের গ্যারান্টি হয় না।

## GPT88-এ ছোট controlled test

একটি current SKU, প্রয়োজনীয় angles ও modular prompt দিয়ে অল্প candidate তৈরি করুন। বাস্তব ছবির পাশে মিলিয়ে pass, hard error, local fix এবং uncertain item লিখুন। hard product error থাকলে পুরো batch শুরু করবেন না। শুধু background বদলাতে হলে এবং real product pixels রাখা গেলে full regeneration-এর বদলে local editing বেছে নিন।

## ছয়-ফ্রেম stress test

Clean hero, same-angle scene, label close crop, high-contrast scene, mobile tight crop এবং ad whitespace version তৈরি করুন। এতে silhouette, parts, text, material, crop safety ও decoration drift ধরা পড়ে। কোনো angle-এর বাস্তব reference না থাকলে AI-কে অনুমান করতে দেবেন না; reshoot বা trusted 3D ব্যবহার করুন।

## Per-image QC: আগে hard error

| পরীক্ষা | Pass condition |
| --- | --- |
| Geometry | silhouette ও proportion reference-এর সঙ্গে মেলে |
| Parts | count, position ও connection ঠিক |
| Text/Logo | প্রতিটি অক্ষর ও unit পড়া যায় |
| Variant | color, capacity ও bundle সঠিক SKU-এর |
| Material | metal, glass, frost ও transparency বাস্তবসম্মত |
| Context | props/হাত/স্থানের সঙ্গে scale যুক্তিসঙ্গত |
| Export | channel ratio, crop ও mobile clarity ঠিক |

মিশ্র ভাষার packaging-এ number, unit, `0/O`, `1/I`, অক্ষরের রূপ এবং regulatory text মানুষ দিয়ে পড়ান। OCR সন্দেহের জায়গা খুঁজতে পারে, human review-এর বিকল্প নয়।

## Pass / Fix / Change Route সিদ্ধান্ত

**Pass**: product facts বাস্তব reference-এর সঙ্গে মেলে এবং channel export ঠিক। **Fix**: crop, background, shadow বা whitespace-এর মতো স্থানীয় ও যাচাইযোগ্য সমস্যা ঠিক করুন; product identity পুনর্গঠন করবেন না। **Change Route**: angle data না থাকা, text বারবার নষ্ট হওয়া বা geometry drift হলে real pixels, compositing, 3D বা professional retouching বেছে নিন।

## FAQ

### একই prompt ও seed কি product স্থির রাখে?

না। এগুলো generation condition পুনরাবৃত্তি করতে পারে, কিন্তু shape, label, material বা parts-এর সত্যতা নিশ্চিত করে না।

### একটি front photo দিয়ে back ও side বানানো যায়?

বিশ্বস্ত product evidence হিসেবে নয়। missing angle reshoot বা trusted 3D থেকে নিন।

### Style consistency কি product consistency?

না। একই background থাকলেও SKU ভুল হতে পারে।

### Packaging text ভুল হলে বারবার regenerate করব?

না। readable text দরকার হলে real label pixels, compositing বা retouching ব্যবহার করুন।

### ছয়টি frame pass হলে batch শুরু করা যাবে?

এটি diagnostic gate, guarantee নয়। channel rules ও per-image QC চালিয়ে যেতে হবে।
