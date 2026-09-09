---
title: GPT Image 2 দিয়ে 4K image তৈরি: Size Rules, API Code ও Acceptance
description: GPT Image 2-তে 3840x2160 বা 2160x3840 generation, চারটি size validation rule, Image API বনাম Responses API এবং saved-file verification।
date: 2026-07-22
category: প্রযুক্তি টিউটোরিয়াল
tags: [GPT Image 2, OpenAI API, Image API, 4K Image Generation, AI Image Workflow]
readTime: 13
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

GPT Image 2 API-তে `3840x2160` landscape বা `2160x3840` portrait চাওয়া যায়। কিন্তু prompt-এ “4K” লেখা যথেষ্ট নয়। Request-এর `size`, decoded raw file-এর pixel এবং CMS/CDN-এর delivered file আলাদা করে যাচাই করুন। `4096x2160` 4K-এর মতো হলেও long edge 3840px সীমা ছাড়ায়। `2560x1440`-এর বেশি size experimental হতে পারে।

## চারটি size rule

1. Long edge `3840px`-এর বেশি নয়।
2. Width ও height দুটিই 16 দিয়ে divisible।
3. Long/short ratio `3:1`-এর বেশি নয়।
4. Total pixel `655,360` থেকে `8,294,400`-এর মধ্যে।

| Size | ফলাফল |
| --- | --- |
| `3840x2160` | valid, experimental |
| `2160x3840` | valid, experimental |
| `4096x2160` | invalid, edge বেশি |
| `3840x1200` | invalid, ratio 3.2:1 |
| `3840x1280` | valid, ratio 3:1 |
| `1920x1080` | invalid, 1080 divisible নয় |
| `1024x640` | valid, minimum pixel |

```js
function validateGptImage2Size(width, height) {
  const longEdge = Math.max(width, height);
  const shortEdge = Math.min(width, height);
  const pixels = width * height;
  const checks = {
    edge: longEdge <= 3840,
    multiplesOf16: width % 16 === 0 && height % 16 === 0,
    aspectRatio: longEdge / shortEdge <= 3,
    pixelCount: pixels >= 655_360 && pixels <= 8_294_400,
  };
  return { valid: Object.values(checks).every(Boolean), checks };
}
```

## Native 4K ও experimental boundary

Valid parameter মানেই stability guarantee নয়। API final image দিয়েছে কি না, raw file-এ exact dimension আছে কি না, text/edge/composition গ্রহণযোগ্য কি না এবং CMS/CDN version pixel বজায় রেখেছে কি না যাচাই করুন। `quality: "high"` rendering effort নিয়ন্ত্রণ করে, native 4K বা correct text নিশ্চিত করে না। Draft 1K/2K-তে করে final-এ valid 4K নেওয়া সাধারণত সাশ্রয়ী।

## Image API ও Responses API

Direct text-to-image বা edit-এর জন্য Image API:

```js
const result = await openai.images.generate({
  model: "gpt-image-2",
  prompt: "Create a landscape hero visual; reserve space on the left; no text",
  size: "3840x2160",
  quality: "high",
  output_format: "png",
});
```

Base64 decode করে save করুন এবং metadata পড়ুন। Conversation, agent বা multi-tool flow-এ image generation step হলে Responses API ব্যবহার করুন। Main model ও image tool-এর contract আলাদা; tool parameter দিয়ে ভুলভাবে image model force করবেন না।

## Save, decode ও delivery verify

HTTP 200 acceptance নয়। Saved file-এর decoded width, height ও format check করুন। WebP, `srcset`, CDN crop, CMS derivative ও download thumbnail-এর public file-ও মাপুন। Source ঠিক কিন্তু public file ভুল হলে সমস্যা prompt নয়, upload/CDN/frontend layer-এ। Request ID, model, size, quality, format এবং raw/delivery dimension record করুন; key বা sensitive prompt নয়।

## Native 4K বনাম upscale

Final file 4K এবং model-এর native 4K response আলাদা claim। Creative final না হলে 1K/2K draft করুন। 2K asset controlled upscale করা যায়, কিন্তু record-এ upscaled স্পষ্ট লিখুন।

## Pricing ও troubleshooting

Universal “price per 4K image” ধরে নেবেন না; current official pricing, token usage, organization Limits ও model access verify করুন। ChatGPT Images access API free tokens বা exact `3840x2160` contract নয়। GPT88 route-এর billing ও quota console থেকে দেখুন। প্রথমে local size validation, তারপর small smoke test, raw decode, CDN/public file comparison এবং শেষে visual quality review করুন।

## Further Reading

- [Image Generation API](/docs/api/images/)
