---
title: Gemini App Nano Banana Tutorial: Beginner থেকে Expert Guide
description: Gemini app-এ Nano Banana image generation-এর পূর্ণ guide — base ও Pro পার্থক্য, login, UI, six-element prompt framework, template, multi-turn editing, error ও API integration।
date: 2026-01-09
category: প্রযুক্তি টিউটোরিয়াল
tags: [Nano Banana, Gemini, AI Image Generation, Prompt Templates, Image Generation Tutorial]
readTime: 16
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Gemini app-এ “draw me a cyberpunk cat” লিখলেই কয়েক সেকেন্ডে image তৈরি হয়। কিন্তু ভালো ফলের জন্য model, prompt, reference image এবং iteration বুঝতে হয়।

## Nano Banana বনাম Nano Banana Pro

Base Nano Banana Gemini 2.5 Flash Image-ভিত্তিক দ্রুত 1K generation। Pro Gemini 3 Pro Image Preview-ভিত্তিক এবং complex instruction, উন্নত text rendering ও 1K/2K/4K resolution দেয়। সাধারণ quick creation-এ base যথেষ্ট; poster, infographic, text, high resolution বা precise control চাইলে Pro নিন। Free Pro limit account ও সময় অনুযায়ী বদলাতে পারে, তাই current UI-র limit অনুসরণ করুন।

| Feature | Base | Pro |
| --- | --- | --- |
| Speed | প্রায় 5–10 seconds | প্রায় 10–30 seconds |
| Resolution | 1K | 1K / 2K / 4K |
| Text | basic | বেশি accurate, multilingual |
| Reference image | কম | বেশি, current limit নির্ভর |
| Reasoning | standard | advanced thinking |

## শুরু ও UI

Web-এ `gemini.google.com` খুলুন বা official mobile app ব্যবহার করুন। Google account, age eligibility এবং supported region প্রয়োজন হতে পারে। Input box-এর `+` থেকে “Create image” বাছুন, অথবা `draw`, `generate`, `create` দিয়ে request শুরু করুন। Model selector-এ Fast base এবং Thinking Pro থাকতে পারে; label ও availability account অনুযায়ী বদলায়। Chinese, English, Japanese সহ বহু ভাষা চলে; complex scene দুর্বল হলে English phrasing চেষ্টা করুন।

## প্রথম image workflow

1. Subject ও scene পরিষ্কারভাবে ঠিক করুন; শুধু “a cat” খুব vague।
2. Complete prompt লিখুন: orange cat, wooden windowsill, afternoon light, blurred plants, cozy photo style।
3. Send চাপুন এবং 5–30 seconds অপেক্ষা করুন।
4. Result review করে download করুন বা একই conversation-এ edit দিন।
5. “Cat-এর রং gray করো” বা “light softer করো”—একবারে একটি পরিবর্তন দিন।

Preview সাধারণত 1K; download option ও Pro resolution current UI-র উপর নির্ভর করে। Gemini image-এ SynthID invisible watermark থাকতে পারে।

## Prompt-এর ছয়টি element

1. **Subject:** কী বা কে — glowing blue eyes-সহ steampunk copper robot।
2. **Composition:** close-up, medium shot, wide shot, low angle, bird’s-eye view, 85mm lens।
3. **Action:** subject কী করছে — barista latte বানাচ্ছে, steam উঠছে।
4. **Location:** retro-industrial coffee shop, brick wall, warm yellow light।
5. **Style:** photorealistic, 3D, watercolor, anime, cyberpunk, minimalist বা vintage।
6. **Editing instructions:** background বদলান, object সরান, fog যোগ করুন।

Keyword list-এর চেয়ে পূর্ণ বাক্য ভালো। “nice lighting”-এর বদলে “golden afternoon sunlight” লিখুন। প্রথম ফল imperfect হলে conversation-এ ধীরে iterate করুন।

## Reusable template

```text
Professional product photography of [product]. Clean background, three-point lighting,
soft reflections, visible texture and detail, commercial quality for ecommerce.
```

```text
Generate [scene] in [style]. Use [composition], [lighting], and [color palette].
Keep [must-preserve details] unchanged and avoid [exclusions].
```

Product, food, city skyline, landscape, poster, app icon এবং character consistency-তে subject, framing, action, environment, style ও constraint রাখুন।

## Multi-turn editing ও API

প্রতি round-এ একটি প্রধান পরিবর্তন রাখুন: composition, তারপর lighting, তারপর color বা text area। এক request-এ সব বদলালে control কমে। Reference image upload-এ শুধু অধিকার থাকা image ব্যবহার করুন এবং কী রাখতে হবে স্পষ্ট করুন। API-তে current model ID, output size, pricing ও quota যাচাই করুন; image output-এ `type: "image"`, `aspect_ratio`, `image_size` ব্যবহার করুন। 429-এ সীমিত backoff ও queue রাখুন; 400/403 blind retry করবেন না।

## Error ও safety

Region, age, account এবং model availability আলাদা eligibility। Option না দেখালে বারবার account/region বদলাবেন না। Real people, brands, copyrighted image ও uploaded photo-র rights মানুন। Final text-এর জন্য whitespace রেখে design tool-এ typeset করা বেশি নির্ভরযোগ্য।

## Further Reading

- [Image Generation API](/docs/api/images/)
