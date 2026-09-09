---
title: Gemini App Nano Banana Tutorial: Beginner සිට Expert Guide
description: Gemini app තුළ Nano Banana image generation සඳහා සම්පූර්ණ guide — base සහ Pro, login, UI, six-element prompt framework, templates, editing, errors සහ API integration.
date: 2026-01-09
category: තාක්ෂණික නිබන්ධනය
tags: [Nano Banana, Gemini, AI Image Generation, Prompt Templates, Image Generation Tutorial]
readTime: 16
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Gemini app තුළ “draw me a cyberpunk cat” ලිවූ විට seconds කිහිපයකින් image එකක් ලැබේ. හොඳ ප්‍රතිඵල සඳහා model, prompt, reference image සහ iteration තේරුම් ගන්න.

## Nano Banana සහ Pro

Base Nano Banana Gemini 2.5 Flash Image මත පදනම් වූ වේගවත් 1K generation එකකි. Pro Gemini 3 Pro Image Preview මත පදනම් වන අතර complex instructions, හොඳ text rendering සහ 1K/2K/4K resolution ලබා දෙයි. සාමාන්‍ය quick creation සඳහා base ප්‍රමාණවත්ය; poster, infographic, text, high resolution හෝ precise control සඳහා Pro තෝරන්න. Free Pro limit account සහ වේලාව අනුව වෙනස් විය හැකි නිසා current UI එක විශ්වාස කරන්න.

## ආරම්භ කිරීම

`gemini.google.com` විවෘත කරන්න හෝ official mobile app භාවිතා කරන්න। Google account, age eligibility සහ supported region අවශ්‍ය විය හැක. Input box හි `+` මඟින් “Create image” තෝරන්න, නැතිනම් `draw`, `generate`, `create` වලින් request ආරම්භ කරන්න. Fast සාමාන්‍යයෙන් base සහ Thinking සාමාන්‍යයෙන් Pro වේ; labels account අනුව වෙනස් විය හැක. Chinese, English, Japanese වැනි භාෂා භාවිත කළ හැක; complex scene දුර්වල නම් English phrasing උත්සාහ කරන්න.

## පළමු image workflow

1. Subject සහ scene පැහැදිලි කරන්න; “a cat” පමණක් ඉතා vague ය.
2. Prompt ලියන්න: orange cat, wooden windowsill, afternoon light, blurred plants, cozy photo style.
3. Send කර 5–30 seconds බලා සිටින්න.
4. Result review, download හෝ එම conversation එකේ edit කරන්න.
5. එකවර එක් වෙනසක් දෙන්න, උදාහරණයක් ලෙස “catගේ වර්ණය gray කරන්න”.

Preview සාමාන්‍යයෙන් 1K වේ; download සහ Pro resolution current UI මත රඳා පවතී. Gemini images තුළ invisible SynthID watermark තිබිය හැක.

## Prompt හි elements හය

1. **Subject:** ප්‍රධාන object හෝ character.
2. **Composition:** close-up, medium shot, wide shot, low angle, bird’s-eye view, 85mm lens.
3. **Action:** subject කරන ක්‍රියාව — barista latte සාදමින්, steam ඉහළ යමින්.
4. **Location:** retro-industrial coffee shop, brick wall, warm yellow light.
5. **Style:** photorealistic, 3D, watercolor, anime, cyberpunk, minimalist හෝ vintage.
6. **Editing:** background වෙනස් කරන්න, object ඉවත් කරන්න, fog එකතු කරන්න.

Keyword list එකකට වඩා සම්පූර්ණ වාක්‍ය භාවිතා කරන්න. “nice lighting” වෙනුවට “golden afternoon sunlight” කියන්න. පළමු result එක imperfect වීම සාමාන්‍යය; conversation එක තුළ iterate කරන්න.

## Reusable templates

```text
Professional product photography of [product]. Clean background, three-point lighting,
soft reflections, visible texture and detail, commercial quality for ecommerce.
```

```text
Generate [scene] in [style]. Use [composition], [lighting], and [color palette].
Keep [must-preserve details] unchanged and avoid [exclusions].
```

Portrait, product, food, skyline, landscape, poster, app icon සහ character consistency සඳහා subject, framing, action, environment, style සහ constraints පැහැදිලි කරන්න.

## Multi-turn editing සහ API

Round එකකට එක් ප්‍රධාන වෙනසක් තබන්න: composition, පසුව lighting, color හෝ text area. අයිතිය ඇති reference image පමණක් upload කර preserve කළ යුතු දේ කියන්න. API තුළ current model ID, output size, pricing සහ quota verify කරන්න; `type: "image"`, `aspect_ratio` සහ `image_size` settings භාවිතා කරන්න. 429 සඳහා limited backoff සහ queue තබන්න; 400/403 blind retry නොකරන්න.

Region, age, account සහ model availability වෙන වෙනම eligibility වේ. Real people, brands, copyrighted images සහ uploaded photos සඳහා rights පිළිපදින්න. Final text design tool එකක typeset කිරීම වඩා විශ්වාසදායකය.

## Further Reading

- [Image Generation API](/docs/api/images/)
