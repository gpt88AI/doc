---
title: GPT Image 2 மூலம் 4K images உருவாக்குவது எப்படி: Size Rules, API Code மற்றும் Acceptance
description: GPT Image 2-ல் 3840x2160 அல்லது 2160x3840, நான்கு size rules, Image API மற்றும் Responses API, saved-file verification.
date: 2026-07-22
category: தொழில்நுட்ப வழிகாட்டி
tags: [GPT Image 2, OpenAI API, Image API, 4K Image Generation, AI Image Workflow]
readTime: 13
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

GPT Image 2 API மூலம் `3840x2160` landscape அல்லது `2160x3840` portrait கேட்கலாம்; prompt-ல் “4K” எழுதுவது மட்டும் போதாது. Request `size`, decoded raw file pixels மற்றும் CMS/CDN delivery-ஐ தனித்தனியாக verify செய்யுங்கள். `4096x2160` long-edge `3840px` வரம்பை மீறும்; `2560x1440`-க்கு மேல் sizes experimental ஆக இருக்கலாம்.

## நான்கு size rules

1. Long edge `3840px`-ஐ மீறக்கூடாது.
2. Width மற்றும் height இரண்டும் 16-ஆல் divisible ஆக வேண்டும்.
3. Long/short ratio `3:1`-ஐ மீறக்கூடாது.
4. Pixels `655,360` முதல் `8,294,400` வரை இருக்க வேண்டும்.

`3840x2160`, `2160x3840` valid experimental; `4096x2160` edge காரணமாக invalid; `3840x1200` ratio காரணமாக invalid; `3840x1280` valid 3:1; `1920x1080` invalid; `1024x640` minimum boundary-ல் valid.

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

## Image API, Responses API மற்றும் verification

Direct image generation/edit-க்கு Image API பயன்படுத்தவும்; `model: "gpt-image-2"`, valid `size`, `quality`, `output_format` தெளிவாக அமைக்கவும். Base64 decode செய்து raw file save செய்யுங்கள். Conversation, agent அல்லது multi-tool flow-ல் Responses API பயன்படுத்தலாம்; main model மற்றும் image tool contract வேறுபடும். `quality: "high"` rendering effort-ஐ மட்டும் கட்டுப்படுத்தும், native 4K அல்லது சரியான text-ஐ உறுதி செய்யாது.

HTTP 200 மட்டும் acceptance அல்ல. Saved file decoded width, height, format-ஐ சரிபார்த்து WebP, `srcset`, CDN crop, CMS derivative மற்றும் public download-ஐயும் அளவிடுங்கள். Source சரி, public file தவறு என்றால் பிரச்சினை upload/CDN/frontend layer-ல் உள்ளது. Request ID, model, size, quality, format மற்றும் raw/delivery dimensions பதிவு செய்யுங்கள்; keys அல்லது sensitive prompts வேண்டாம்.

Native 4K மற்றும் பின்னர் upscale வேறு claims. Creative final ஆகாதபோது 1K/2K draft செய்யுங்கள்; upscale செய்தால் record-ல் தெளிவாக எழுதுங்கள். Pricing, organization Limits, model access மற்றும் GPT88 billing-ஐ current docs/console மூலம் verify செய்யுங்கள்.

## Further Reading

- [Image Generation API](/docs/api/images/)
