---
title: මුහුණ වෙනස් නොකර ඡායාරූපය upscale කිරීම: මුලින් route, පසුව face checklist
description: Upscaling, AI super-resolution සහ generative redraw වෙන් කර identity-safe workflow සහ face acceptance checklist ලබා දෙන මාර්ගෝපදේශය.
date: 2026-07-28
category: තාක්ෂණික මාර්ගෝපදේශය
tags: [Photo Upscaling, Face Identity, Image Super-Resolution, 4K Images, Portrait Restoration]
readTime: 12
relatedPath: /docs/guides/agent-image-studio/
relatedTitle: Agent Image Studio
---

“එකම පුද්ගලයා විය යුතුය” යන්න hard requirement නම් මුලින් route එක තෝරන්න. Original එක සුරක්ෂිත කර bicubic හෝ Lanczos වැනි deterministic interpolation මඟින් අවශ්‍ය pixel dimensions පමණක් සාදන්න. එය pixel grid එක විශාල කරයි; නැති eyelashes, skin texture හෝ teeth detail නැවත ගෙන එන්නේ නැත. Missing detail AI විසින් අනුමාන කිරීමට ඉඩ තිබේ නම් පමණක් dedicated AI upscaler හෝ reference-image redraw භාවිතා කරන්න. Sharper යන්න face unchanged යන්න නොවේ.

## Upscaling, Super-Resolution සහ Restoration වෙන් කරන්න

- **Upscaling/resampling**: mathematical interpolation මඟින් width/height වෙනස් කරයි; identity නොදනී.
- **AI super-resolution**: learned patterns මත texture නැවත සාදයි; වැරදි අනුමාන කළ හැක.
- **Portrait restoration**: facial detail, exposure, noise හෝ skin වැඩිදියුණු කරයි; identity වෙනස් විය හැක.
- **Reference redraw**: original එක reference කර නව image එකක් සාදයි; ඉලක්කය similar ය, pixel fidelity නොවේ.
- **Native high-resolution generation**: පැරණි photo එක විශාල නොකර නව 2K/4K image එකක් සාදයි.

## Routes හතර

| Route | භාවිතය | Face-change risk | Delivery පෙර සාක්ෂි |
| --- | --- | --- | --- |
| Deterministic interpolation | ID, archive, family photo, AI guessing තහනම් | අඩුම | dimensions, ratio, crop, format, same-scale face check |
| Dedicated AI upscaler | texture reconstruction කිහිපයක් පිළිගත හැක | model/mode මත | sample, mode/scale, identity sheet, downloaded file |
| Generative redraw | poster/cover එකකට “looks like” ප්‍රමාණවත් | වැඩිම | invariants item-by-item compare |
| Native generation | නව high-resolution image | original preserve අදාළ නැත | size, composition, subject targets |

Detail එකතු කළ නොහැකි නම් interpolation; සුළු reconstruction පිළිගත හැකි නම් sample-based AI upscaler; similar පමණක් ප්‍රමාණවත් නම් redraw; නව image එකක් නම් native generation.

## Reproducible workflow

“4K” පමණක් නොව, සැබෑ width × height, aspect ratio, crop/padding, print size, PPI, format, transparency, color space සහ size limit සටහන් කරන්න.

```text
required pixels = finished inches × target PPI
finished inches = finished cm ÷ 2.54
```

10 × 15 cm, 300 PPI print එකකට ආසන්න වශයෙන් 1181 × 1772 pixels අවශ්‍යය; print shop specification අවසාන authority වේ। Original overwrite නොකර size, ratio, format, crop, target සහ allowed/must-not-change fields සටහන් කරන්න.

AI guessing තහනම් නම් aspect ratio තබා Bicubic/Lanczos භාවිතා කරන්න. Reconstruction පිළිගත හැකි නම් non-sensitive sample එකක dedicated upscaler test කරන්න; denoise, face restoration, colorization සහ sharpening එකවර enable නොකරන්න. Redraw එකේ expression, gaze, hairstyle, age, clothing, background, text සහ crop invariants ලෙස ලියන්න.

මුලින් 2× output සාදන්න; method හෝ AI mode එකවර එකක් පමණක් වෙනස් කරන්න; denoise, face enhancement සහ sharpening වෙන වෙනම toggle කරන්න; route, tool, mode, scale සහ output size record කරන්න. File dimensions, ratio, crop, compression artifacts සහ downloaded file මුලින් පරීක්ෂා කර, පසුව එකම face crop සහ display size මත original/output සසඳන්න.

## Face-identity checklist

```text
[Task record]
Original: ________________   Output: ________________
Route: interpolation / AI upscale / reference redraw / native generation
Tool/model: __________  Mode/scale: __________
Original size: ____ × ____ px   Output size: ____ × ____ px
Aspect ratio and crop: pass / fail

[Same-scale face check]
[ ] ඇස්වල shape, size, spacing, height සහ gaze වෙනස් වී නැත
[ ] eyelids, brows, nose, nostrils, mouth, lips සහ teeth වෙනස් වී නැත
[ ] jawline, face width, ears, hairline, expression සහ apparent age වෙනස් වී නැත
[ ] mole, scar, wrinkle එකතු හෝ ඉවත් කර නැත
[ ] glasses, earrings, hat සහ accessories වෙනස් වී නැත
[ ] people count, pose, hands, body, clothing, Logo සහ text වෙනස් වී නැත
[ ] background, lighting, halos, plastic skin සහ over-sharpening පරීක්ෂා කර ඇත

Conclusion: pass / rework / more faithful route
```

Identity-critical item එකක් වෙනස් නම් image එක විශාල හා sharp වුවත් fail කරන්න. Similarity score supporting signal එකක් පමණි.

## 800 × 1200 සිට 1600 × 2400 උදාහරණය

Aspect ratio එක සමාන නම් 2× deterministic interpolation කරන්න, face restoration off කරන්න, 1600 × 2400 verify කරන්න සහ එකම brow-to-chin crop compare කරන්න. මුහුණ නොවෙනස්ව පැරණි blur පමණක් පෙනේ නම් faithful upscaling සීමාවට පැමිණ ඇත. Sharp eyelashes හෝ skin texture අවශ්‍ය නම් එය වෙනම AI reconstruction task එකකි.

Head/shoulder crop වීම clarity ගැටලුවක් නොව ratio/canvas policy ගැටලුවකි. Text, Logo හෝ clothing pattern වෙනස් වුවහොත් deterministic route හෝ controlled layers භාවිතා කරන්න. Print blur සඳහා සැබෑ pixels පරීක්ෂා කරන්න; severe blur එකක rescan/reshoot වඩා විශ්වාසදායකය.

## GPT88 හි ස්ථානය

GPT88 Agent Image Studio reference-image upload සහ generative redraw සඳහා සුදුසු විය හැක, recognizably consistent ප්‍රමාණවත් විට. එය pixel-only upscaler එකක් නොවන අතර face unchanged guarantee නොදේ. Precise identity අවශ්‍ය විට local deterministic interpolation හෝ separately verified upscaler මුලින් භාවිතා කරන්න.

## FAQ සහ acceptance lines

AI upscaling මඟින් මුහුණ කිසිවිටෙක වෙනස් නොවන බවට guarantee නැත. “Keep the original face” prompt එක acceptance evidence නොවේ. 4K යනු added detail සැබෑ බවට සාක්ෂියක් නොවේ. Bicubic smoother, Lanczos sharper විය හැකි නමුත් halo වැඩි කළ හැක; එකම input/size මත A/B කරන්න. Restoration සහ upscaling reversible වෙනම steps කරන්න. Face-recognition score එක පමණක් ප්‍රමාණවත් නොවේ. Online portrait පෙර storage, deletion, training, processing location, sharing සහ compliance පරීක්ෂා කරන්න.

**File line**: width/height, ratio, crop, format සහ compression pass.

**Identity line**: eyes, brows, nose, mouth, face shape, hairline, expression, age, identity markers සහ non-face invariants pass.
