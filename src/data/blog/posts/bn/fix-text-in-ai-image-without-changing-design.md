---
title: AI ছবির ভুল লেখা কীভাবে বদলাবেন, ডিজাইন না বদলে
description: ভুল লেখা ঠিক করতে শুধু prompt দিয়ে পুরো ছবি পুনরায় বানাবেন না। আগে source file, তারপর editable text layer, শেষে সীমিত AI edit ব্যবহার করুন।
date: 2026-07-27
category: ছবি তৈরি
tags: [AI ছবির লেখা, ছবি সম্পাদনা, ডিজাইন]
readTime: 9
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: Agent image quality ও crop guide
---

AI poster, product card বা cover দেখতে ভালো হলেও লেখায় ভুল থাকতে পারে। “শুধু লেখাটি বদলাও, বাকিটা একই রাখো” বললেও মডেল পুরো ছবি নতুন করে বানাতে পারে। মানুষ, আলো, texture ও ফাঁকা জায়গা বদলে যেতে পারে।

## আগে সিদ্ধান্ত নিন: লেখা বদলাবেন, নাকি দৃশ্য পুনর্নির্মাণ করবেন

নিরাপদ ক্রম: **প্রথমে source file খুঁজুন; না থাকলে editable text layer বানান; তারপর পুরোনো লেখা মুছে আসল font দিয়ে layout করুন; কেবল কম-ঝুঁকির decorative text-এ local AI edit ব্যবহার করুন।** নাম, দাম, তারিখ ও unit শব্দে শব্দে যাচাই করুন।

| অবস্থা | উপযুক্ত পথ |
| --- | --- |
| Figma, Canva, PSD বা PPT আছে | আসল text layer বদলে export করুন |
| source নেই, কিন্তু poster পরিষ্কার | OCR ও layout editable layer হিসেবে পুনর্গঠন করুন |
| background সরল | mask দিয়ে পুরোনো লেখা মুছে নতুন লেখা বসান |
| ছোট decorative লেখা | খুব ছোট mask-এ local AI edit পরীক্ষা করুন |

“ডিজাইন অপরিবর্তিত” কোনো জাদুকরী prompt নয়। canvas size, crop, subject, texture, রং, font, size, spacing, line-height, shadow ও perspective পরীক্ষা করতে হবে।

## Source file থাকলে সেটিই সেরা

মূল Figma, Canva, Photoshop, Illustrator বা PowerPoint file খুলুন। font ও license যাচাই করে শুধু copy বদলান। নতুন লেখা বড় হলে শুধু font ছোট করবেন না; line break, spacing ও safe margin-ও দেখুন। পুরোনো ও নতুন export overlay করে তুলনা করুন। লেখা ছাড়া অন্য pixel বা composition বদলানো উচিত নয়।

## Source না থাকলে editable layer বানান

সবচেয়ে পরিষ্কার ছবি upload করুন এবং OCR-কে অন্ধভাবে বিশ্বাস করবেন না। লেখা, font weight, size, alignment, spacing, color ও line-height যাচাই করুন। প্রথমে একটি গুরুত্বপূর্ণ line বদলে ছোট export নিন। OCR অক্ষর ভেঙে দিলে বা decorative লেখা background ধরে নিলে manual rebuild করুন।

## পুরোনো লেখা মুছে নতুন layout

মূল ছবির copy রাখুন। mask-এ glyph, outline, shadow ও glow পুরোটা ধরুন, কিন্তু আশেপাশের pattern নয়। সমতল wall বা sky সহজ; gradient, চুল, product edge ও reflection কঠিন। zoom করে ghosting, rectangular patch ও repeated texture দেখুন। তারপর font, weight, size, spacing, color, shadow, rotation ও perspective মিলিয়ে নিন।

## কখন AI local edit ব্যবহার করবেন

এটি low-risk decorative text বা draft-এর জন্য। একবারে এক অঞ্চল বাছুন এবং লিখুন: “নির্বাচিত অঞ্চলের পুরোনো লেখা ‘Summer Market’ করুন; canvas, crop, subject, background, lighting ও অন্য লেখা বদলাবেন না।” দুইবার non-target পরিবর্তন হলে মূল ছবিতে ফিরে text layer বা manual layout ব্যবহার করুন।

## পাঁচ মিনিটের delivery checklist

1. নাম, দাম, তারিখ, ফোন, unit ও punctuation শব্দে শব্দে পড়ুন।
2. মূল resolution-এ edge, ghosting ও বিকৃত stroke দেখুন।
3. বাস্তব web, social বা print size-এ readability যাচাই করুন।
4. overlay বা দ্রুত বদলে non-target movement দেখুন।
5. original, editable file ও final export আলাদা রাখুন।

অজানা public tool-এ ID card, contract, invoice, medical বা financial record, private customer asset কিংবা evidence screenshot upload করবেন না।

সবচেয়ে নির্ভরযোগ্য নিয়ম: **গুরুত্বপূর্ণ লেখা বাস্তব text layer-এ রাখুন; AI background repair ও draft-এর জন্য ভালো, final proof-এর জন্য নয়।**
