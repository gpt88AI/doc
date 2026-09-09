---
title: GPT Image 2 سے 4K images کیسے بنائیں: Size Rules، API Code اور Acceptance
description: GPT Image 2 میں 3840x2160 یا 2160x3840، چار size rules، Image API اور Responses API، اور saved-file verification۔
date: 2026-07-22
category: تکنیکی ٹیوٹوریل
tags: [GPT Image 2, OpenAI API, Image API, 4K Image Generation, AI Image Workflow]
readTime: 13
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

GPT Image 2 API سے `3840x2160` landscape یا `2160x3840` portrait مانگا جا سکتا ہے، مگر prompt میں “4K” لکھنا کافی نہیں۔ Request کا `size`، decoded raw file کے pixels اور CMS/CDN delivery الگ verify کریں۔ `4096x2160` long-edge `3840px` حد سے بڑا ہے، اور `2560x1440` سے اوپر کے sizes experimental ہو سکتے ہیں۔

## چار size rules

1. Long edge `3840px` سے زیادہ نہیں۔
2. Width اور height دونوں 16 سے divisible ہوں۔
3. Long/short ratio `3:1` سے زیادہ نہ ہو۔
4. Pixels `655,360` سے `8,294,400` کے درمیان ہوں۔

`3840x2160` اور `2160x3840` valid experimental ہیں؛ `4096x2160` edge کی وجہ سے invalid، `3840x1200` ratio کی وجہ سے invalid، `3840x1280` valid 3:1، `1920x1080` invalid کیونکہ 1080 divisible by 16 نہیں، اور `1024x640` minimum boundary پر valid ہے۔

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

## Image API، Responses API اور verification

Direct image کے لیے Image API استعمال کریں، `model: "gpt-image-2"`، valid `size`، `quality` اور `output_format` واضح رکھیں۔ Base64 decode کر کے raw file save کریں۔ Conversation، agent یا multi-tool flow میں Responses API موزوں ہے؛ main model اور image tool کا contract الگ ہے۔ `quality: "high"` rendering effort ہے، native 4K یا درست text کی ضمانت نہیں۔

HTTP 200 کافی acceptance نہیں۔ Saved file کے decoded width، height اور format چیک کریں، پھر WebP، `srcset`، CDN crop، CMS derivative اور public download بھی ناپیں۔ Source درست اور public file غلط ہو تو مسئلہ upload/CDN/frontend layer میں ہے۔ Request ID، model، size، quality، format اور raw/delivery dimensions record کریں؛ keys یا sensitive prompts نہیں۔

Native 4K اور بعد میں upscale الگ claims ہیں۔ Creative final نہ ہو تو 1K/2K draft بنائیں؛ 2K asset upscale ہو سکتا ہے، مگر record میں اسے upscaled لکھیں۔ Pricing، organization Limits، model access اور GPT88 billing current console/docs سے verify کریں۔ Layered order: local validation، small smoke test، raw decode، CDN comparison، پھر visual quality review۔

## Further Reading

- [Image Generation API](/docs/api/images/)
