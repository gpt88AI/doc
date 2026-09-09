---
title: GPT Image 2 භාවිතයෙන් 4K images සාදන්නේ කෙසේද: Size Rules, API Code සහ Acceptance
description: GPT Image 2 තුළ 3840x2160 හෝ 2160x3840, size rules හතර, Image API සහ Responses API සහ saved-file verification.
date: 2026-07-22
category: තාක්ෂණික නිබන්ධනය
tags: [GPT Image 2, OpenAI API, Image API, 4K Image Generation, AI Image Workflow]
readTime: 13
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

GPT Image 2 API මඟින් `3840x2160` landscape හෝ `2160x3840` portrait ඉල්ලිය හැක, නමුත් prompt එකේ “4K” ලිවීම පමණක් ප්‍රමාණවත් නැත. Request `size`, decoded raw file pixels සහ CMS/CDN delivery වෙන වෙනම verify කරන්න. `4096x2160` long edge `3840px` සීමාව ඉක්මවයි; `2560x1440` ඉක්මවන sizes experimental විය හැක.

## Size rules හතර

1. Long edge `3840px` ඉක්මවිය නොහැක.
2. Width සහ height දෙකම 16 මඟින් divisible විය යුතුය.
3. Long/short ratio `3:1` ඉක්මවිය නොහැක.
4. Pixels `655,360` සිට `8,294,400` අතර විය යුතුය.

`3840x2160` සහ `2160x3840` valid experimental වේ; `4096x2160` edge නිසා invalid; `3840x1200` ratio නිසා invalid; `3840x1280` valid 3:1; `1920x1080` invalid; `1024x640` minimum boundary එකේ valid වේ.

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

## Image API, Responses API සහ verification

Direct image generation/edit සඳහා Image API භාවිතා කරන්න; `model: "gpt-image-2"`, valid `size`, `quality` සහ `output_format` පැහැදිලිව සකසන්න. Base64 decode කර raw file save කරන්න. Conversation, agent හෝ multi-tool flow එකකදී Responses API භාවිතා කළ හැක; main model සහ image tool contract වෙනස් වේ. `quality: "high"` rendering effort පමණක් පාලනය කරයි; native 4K හෝ නිවැරදි text guarantee නොකරයි.

HTTP 200 පමණක් acceptance නොවේ. Saved file decoded width, height සහ format පරීක්ෂා කරන්න; WebP, `srcset`, CDN crop, CMS derivative සහ public download ද මැන බලන්න. Source එක නිවැරදි නමුත් public file එක වැරදි නම් ගැටලුව upload/CDN/frontend layer එකේය. Request ID, model, size, quality, format සහ raw/delivery dimensions record කරන්න; keys හෝ sensitive prompts නොවේ.

Native 4K සහ පසුව කළ upscale වෙනස් claims වේ. Creative final නැත්නම් 1K/2K draft සාදන්න; upscale කළේ නම් record එකේ පැහැදිලිව සඳහන් කරන්න. Pricing, organization Limits, model access සහ GPT88 billing current docs/console මඟින් verify කරන්න.

## Further Reading

- [Image Generation API](/docs/api/images/)
