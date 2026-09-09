---
title: GPT Image 2 से 4K image कैसे बनाएं: Size Rules, API Code और Acceptance
description: GPT Image 2 में 3840x2160 या 2160x3840 generation, चार size validation rules, Image API बनाम Responses API और saved-file verification।
date: 2026-07-22
category: तकनीकी ट्यूटोरियल
tags: [GPT Image 2, OpenAI API, Image API, 4K Image Generation, AI Image Workflow]
readTime: 13
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

GPT Image 2 API से `3840x2160` landscape या `2160x3840` portrait माँगा जा सकता है। लेकिन prompt में “4K” लिखना पर्याप्त नहीं। Request का `size`, decoded raw file के pixels और CDN/CMS द्वारा delivered file अलग-अलग सत्यापित करें। `4096x2160` 4K जैसा दिखता है, पर long edge 3840px सीमा से बड़ा है। `2560x1440` से ऊपर के sizes experimental हो सकते हैं।

## चार size rules

Custom `WIDTHxHEIGHT` को सभी शर्तें पूरी करनी होंगी:

1. Long edge `3840px` से अधिक नहीं।
2. Width और height दोनों 16 से divisible हों।
3. Long/short ratio `3:1` से अधिक नहीं।
4. Total pixels `655,360` से `8,294,400` के बीच।

| Size | Result |
| --- | --- |
| `3840x2160` | valid, experimental |
| `2160x3840` | valid, experimental |
| `4096x2160` | invalid, edge बड़ा |
| `3840x1200` | invalid, ratio 3.2:1 |
| `3840x1280` | valid, ratio 3:1 |
| `1920x1080` | invalid, 1080 divisible नहीं |
| `1024x640` | valid, minimum pixels |

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

## Native 4K और experimental सीमा

Valid parameter stability guarantee नहीं है। API ने final image लौटाई या नहीं, raw file में exact dimensions हैं या नहीं, text/edges/composition स्वीकार्य हैं या नहीं, और CMS/CDN version pixels बचाता है या नहीं—सब जाँचें। `quality: "high"` rendering effort नियंत्रित करता है; सही text या native 4K की guarantee नहीं। Draft के लिए 1K/2K और final के लिए valid 4K अधिक किफायती हो सकता है।

## Image API और Responses API

Direct text-to-image या edit के लिए Image API सबसे छोटा रास्ता है:

```js
const result = await openai.images.generate({
  model: "gpt-image-2",
  prompt: "Create a landscape hero visual; reserve space on the left; no text",
  size: "3840x2160",
  quality: "high",
  output_format: "png",
});
```

Base64 को decode करके save करें और file metadata पढ़ें। Responses API तब उपयोग करें जब मुख्य model conversation, agent या multi-tool flow में image tool बुलाए। Tool में image model को गलत तरीके से force न करें; main model और image tool contract अलग हैं।

## Save, decode और delivery verify

HTTP 200 पर्याप्त acceptance नहीं। Saved file का decoded width, height और format check करें। WebP, `srcset`, CDN crop, CMS derivative और download thumbnail को भी public URL से download करके मापें। Source सही और public file गलत हो तो समस्या prompt में नहीं, upload/CDN/frontend layer में है। Request ID, model, size, quality, format और raw/delivery dimensions रिकॉर्ड करें; keys और sensitive prompts नहीं।

## Native 4K बनाम upscale

Final file 4K होना और model का native 4K लौटाना अलग claims हैं। Creative तय न हो तो 1K/2K drafts बनाएं। Existing 2K asset को controlled upscale करना उचित हो सकता है, लेकिन asset record में साफ लिखें कि यह upscaled है।

## Pricing और access

GPT Image 2 का universal “price per 4K image” न मानें। Current official pricing, token usage, organization Limits और model access verify करें। ChatGPT Images plan access API free tokens या exact `3840x2160` contract सिद्ध नहीं करता। GPT88 route में actual billing और quota console से verify करें।

## Layered troubleshooting

1. Local size validation और actual request body देखें।
2. Smaller valid smoke test से organization/project access जाँचें।
3. Final base64 decode और source dimensions मापें।
4. Object storage, CDN, `srcset` और downloaded file compare करें।
5. Pixels सही हों पर quality खराब हो तो text, composition और acceptance criteria अलग review करें।

## Further Reading

- [Image Generation API](/docs/api/images/)
