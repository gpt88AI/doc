---
title: GPT Image 2 बाट 4K images कसरी बनाउने: Size Rules, API Code र Acceptance
description: GPT Image 2 मा 3840x2160 वा 2160x3840, चार size rules, Image API र Responses API तथा saved-file verification।
date: 2026-07-22
category: प्राविधिक ट्युटोरियल
tags: [GPT Image 2, OpenAI API, Image API, 4K Image Generation, AI Image Workflow]
readTime: 13
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

GPT Image 2 API बाट `3840x2160` landscape वा `2160x3840` portrait माग्न सकिन्छ, तर prompt मा “4K” लेख्नु पर्याप्त छैन। Request `size`, decoded raw file pixels र CMS/CDN delivery अलग-अलग verify गर्नुहोस्। `4096x2160` को long edge `3840px` सीमा भन्दा ठूलो छ; `2560x1440` भन्दा माथिका sizes experimental हुन सक्छन्।

## चार size rules

1. Long edge `3840px` भन्दा ठूलो नहोस्।
2. Width र height दुवै 16 ले divisible हुन्।
3. Long/short ratio `3:1` भन्दा ठूलो नहोस्।
4. Pixels `655,360` देखि `8,294,400` बीचमा हुन्।

`3840x2160` र `2160x3840` valid experimental हुन्; `4096x2160` edge कारण invalid; `3840x1200` ratio कारण invalid; `3840x1280` valid 3:1; `1920x1080` invalid; `1024x640` minimum boundary मा valid छ।

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

## Image API, Responses API र verification

Direct image generation/edit का लागि Image API प्रयोग गर्नुहोस्; `model: "gpt-image-2"`, valid `size`, `quality` र `output_format` स्पष्ट राख्नुहोस्। Base64 decode गरेर raw file save गर्नुहोस्। Conversation, agent वा multi-tool flow मा Responses API प्रयोग गर्न सकिन्छ; main model र image tool contract अलग हुन्छ। `quality: "high"` rendering effort हो, native 4K वा सही text guarantee होइन।

HTTP 200 मात्र acceptance होइन। Saved file को decoded width, height र format जाँच्नुहोस्; WebP, `srcset`, CDN crop, CMS derivative र public download पनि मापन गर्नुहोस्। Source सही तर public file गलत भए समस्या upload/CDN/frontend layer मा हुन्छ। Request ID, model, size, quality, format र raw/delivery dimensions record गर्नुहोस्; keys वा sensitive prompts होइन।

Native 4K र पछि गरिएको upscale अलग claims हुन्। Creative final नभए 1K/2K draft बनाउनुहोस्; upscale गरे record मा स्पष्ट लेख्नुहोस्। Pricing, organization Limits, model access र GPT88 billing current docs/console बाट verify गर्नुहोस्।

## Further Reading

- [Image Generation API](/docs/api/images/)
