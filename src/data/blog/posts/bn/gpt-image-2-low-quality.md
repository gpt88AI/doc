---
title: GPT Image 2 Noise ও Texture Artifacts: reproducible troubleshooting checklist
description: Low quality, repeating texture, reference-image inheritance এবং publish compression আলাদা করে single-variable test চালান।
date: 2026-05-06
category: প্রযুক্তি টিউটোরিয়াল
tags: [GPT Image 2, Image Noise, Texture Artifacts, Image Quality, Troubleshooting]
readTime: 8
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: Agent Image Quality & Crop Guide
---

GPT Image 2 output-এ specks, cracks, repeating pattern বা fake detail দেখা গেলে সবকিছুর দোষ `quality: "low"`-কে দেবেন না। Raw output সংরক্ষণ করুন এবং সমস্যা ভাগ করুন: overall detail কম, raw file-এই artifact, editing-এর পরে dirt, নাকি upload-এর পরে compression।

`quality`, `size`, format ও compression নিয়ন্ত্রণযোগ্য হলেও official docs dirty texture বা white specks-এর একক root cause বলে না। লক্ষ্য model-এর ভিতর অনুমান করা নয়; কম controlled comparison-এ problem layer ও পরের পদক্ষেপ খুঁজে বের করা।

## Low quality এবং artifact আলাদা

`quality: "low"` draft, thumbnail ও fast iteration-এর জন্য উপযুক্ত এবং overall detail কম ব্যাখ্যা করতে পারে। কিন্তু repeating texture, checkerboard, white specks বা বহু edit round-এর covered feel-এর একমাত্র ব্যাখ্যা নয়। Raw file, surface, model, quality, size ও reference image লিখে রাখুন; 100% zoom এবং final display size দুটোতেই দেখুন।

## Single-variable comparison

Prompt, input, surface, model ও size স্থির রেখে শুধু quality বদলান, যেমন `low` থেকে `medium`। একসঙ্গে prompt, reference, size ও API surface বদলালে উন্নতির কারণ জানা যাবে না। Raw file, format, dimension, shadow, edge, text ও repeating area record করুন।

Group B পরিষ্কার হলে শুধু এই sample-এর correlation প্রমাণিত হয়, universal fix নয়। দুই group-এ একই tiling হলে quality-কে একমাত্র কারণ ভাববেন না; পরের round-এ শুধু reference image সরান।

## Publish compression আগে বাদ দিন

Raw এবং final downloaded file একই zoom-এ compare করুন। Dimension, format, gradient, fine line ও text edge দেখুন। Raw পরিষ্কার কিন্তু published copy খারাপ হলে PNG-to-JPEG/WebP, CMS scaling বা browser interpolation ঠিক করুন; generation বারবার করবেন না।

Reference image, repeated edit এবং new chat যাচাই করার branch, confirmed root cause নয়। দুই controlled round ব্যর্থ হলে থামুন; prompt, input, model, quality, size, route, সময় ও request ID রেখে provider-কে জানান। High quality universal artifact fix নয়, 4K-ও artifact-এর প্রমাণ নয়।
