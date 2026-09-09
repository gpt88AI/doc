---
title: Nano Banana কী? Features, Pricing এবং Prompt Tips (2026 Guide)
description: Google Nano Banana প্রযুক্তি, Gemini 2.5 Flash Image, Nano Banana Pro, free quota, pricing এবং ব্যবহারিক prompt tips-এর সম্পূর্ণ guide।
date: 2026-01-09
category: Gemini专题
tags: [Nano Banana, Gemini, AI Image Generation, Google AI, Prompt Tips]
readTime: 12
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

## Nano Banana কী?

Nano Banana হলো Google DeepMind-এর Gemini পরিবারের AI image generation ও editing capability-এর codename। এটি standalone image model নয়; Gemini multimodal architecture-এর image module। তাই complex instruction, context এবং conversational iteration ভালোভাবে সামলায়।

| Version | Official Name | Release | Positioning |
| --- | --- | --- | --- |
| Nano Banana | Gemini 2.5 Flash Image | Aug 26, 2025 | দ্রুত everyday use |
| Nano Banana Pro | Gemini 3 Pro Image Preview | Nov 20, 2025 | quality-first professional work |

সহজভাবে, Nano Banana হলো Gemini-এর drawing capability। Chat-এর মতো করে scene বললে model image তৈরি বা edit করে।

## History এবং 3D Figurine Trend

আগস্ট 2025-এ LMArena-তে anonymous model consistent character, complex scene এবং realistic image তৈরি করে আলোচনায় আসে। 26 আগস্ট Google জানায় এটি Gemini 2.5 Flash Image, যার codename Nano Banana। নভেম্বরে Nano Banana Pro আসে: 2K/4K output, উন্নত text rendering, একসঙ্গে 14 reference image এবং Google Search grounding।

Viral 3D figurine আসলে realistic 2D image: acrylic base, collectible packaging এবং computer screen-এ 3D modelling process দেখা যায়। এটি `.STL` বা `.OBJ` printable file নয়; real 3D-এর জন্য আলাদা conversion দরকার।

## Core Features

- **Text-to-image:** natural language-এ scene, lighting এবং style লিখুন; keyword stacking এড়ান।
- **Image editing:** element যোগ/বাদ, style transfer এবং local adjustment করুন। Pro-তে masked editing আছে।
- **Multi-image composition:** একাধিক reference মিশিয়ে coherent scene তৈরি করুন; Pro 14 image এবং 5 character পর্যন্ত consistency ধরে।
- **Text rendering:** Pro long text, calligraphy এবং Chinese, English, Japanese, Spanish, Hindi ইত্যাদি ভালো render করে।
- **Web Search grounding:** current weather, recipes বা sports scores-এর মতো live data ব্যবহার করা যায়।

## Free Quota এবং Pricing

| Channel | Quota/Benefit | Notes |
| --- | --- | --- |
| Gemini App free users | 2 images/day | সহজ entry |
| Google AI Studio | 500 requests/day | development testing |
| Google Cloud new users | $300 / 90 days | card required |

Quota UTC midnight-এ reset হয়। Success, content-filtered request এবং technical failure-ও quota খরচ করতে পারে। Pro quota শেষ হলে plain Nano Banana-তে fallback হতে পারে। API price: Gemini 2.5 Flash Image 1024x1024-এ $0.039, Gemini 3 Pro Image 1K-2K-তে $0.134 এবং 4K-তে $0.24। Batch API-তে 24 ঘণ্টা delay-এর বিনিময়ে 50% discount থাকতে পারে।

GPT88 unified gateway দিয়ে OpenAI-compatible বা native Google interface ব্যবহার করা যায়। Current console-এ model coverage, RMB pricing এবং failed-request billing verify করুন। API key source code-এ রাখবেন না।

## Prompt Tips

Natural language ব্যবহার করুন: “an orange cat sitting on a neon-lit street...”। Background বদলালে subject-এর lighting রাখার মতো context দিন। প্রথমে base image বানিয়ে কয়েক round iterate করুন। Multi-image composition-এ গুরুত্বপূর্ণ reference আগে দিন। Text rendering-এর জন্য exact text quotes-এ, position, font এবং size উল্লেখ করুন। একই character রাখতে একই reference reuse করে facial features identical রাখার নির্দেশ দিন।

Blurry text হলে Pro ও explicit font size, warped face হলে clear frontal reference, inconsistent style হলে concrete style description এবং filtered content হলে safety settings বা rephrasing ব্যবহার করুন।

## FAQ

Nano Banana speed ও 1024 output-এর জন্য; Pro quality, 4K, উন্নত text এবং 14-image composition-এর জন্য। Free Gemini App users 2 images/day এবং AI Studio up to 500 requests/day পায়; quota independent। সব image-এ invisible SynthID watermark থাকে। Commercial use latest Google terms ও content policy-র অধীন। Chinese prompt ভালো কাজ করে, তবে complex instruction English-এ আরও accurate হতে পারে।

## Further Reading

- [Nano Banana Pro Multi-Reference Guide](/en/docs/blog/nano-banana-pro-multi-reference-guide/)
- [Nano Banana Pro Pricing & Quota Guide](/en/docs/blog/nano-banana-pro-pricing-quota-guide-2026/)
- [Google Image Generation API](/en/docs/api/images/)
