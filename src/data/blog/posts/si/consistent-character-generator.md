---
title: AI රූප කිහිපයක එකම චරිතය අඛණ්ඩව තබාගැනීමේ four-shot consistency ක්‍රමය
description: මුලින් මුහුණ, hairstyle, ශරීරය, ඇඳුම සහ art style lock කර පසුව neutral portrait, side/full-body, action සහ controlled scene shots හතරකින් consistency පරීක්ෂා කරන්න.
date: 2026-07-28
category: රූප නිර්මාණය
tags: [Character Consistency, Same Character, AI Image Generation, Character Reference, Character Sheet]
readTime: 10
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: agent.gpt88.cc Image Quality & Crop Guide
---

AI රූප කිහිපයක එකම character එක ලබාගැනීමට පළමු ලස්සන output එක පසුපස නොයන්න. කුමන ලක්ෂණ වෙනස් වුවහොත් නරඹන්නා එය වෙනත් පුද්ගලයෙකු ලෙස හඳුනාගන්නේද මුලින් තීරණය කරන්න. පසුව neutral portrait, side හෝ full-body, dynamic action සහ controlled scene යන shots හතරකින් පරීක්ෂා කරන්න.

## “එකම character” යන්නෙන් අදහස් කරන්නේ කුමක්ද

Face structure, hairstyle silhouette, body proportions, clothing/props සහ visual language වෙන වෙනම drift විය හැක. මුහුණ පමණක් ගැළපීම ප්‍රමාණවත් නොවේ; side profile nose bridge, full-body head-to-body ratio හෝ signature coat වර්ණය වෙනස් වුවහොත් character එක වෙනස් වී ඇත. “must not change” සහ “may change” ලැයිස්තු මුලින් ලියන්න.

## Reference images භාවිතය

පැහැදිලි, neutral, එකසේ ආලෝකමත් රූපයක් approved identity anchor ලෙස තෝරන්න. අමතර references භාවිත කළ යුත්තේ අහිමි angle පිරවීමට පමණි: side view නාසය සහ හිස පිටුපස contour, full-body අනුපාත සහ ඇඳුම, close-up කුඩා prop හෝ text පෙන්වයි. සෑම image එකකටම role එකක් දෙන්න. එකිනෙකට ගැටෙන references නිසා consistency වෙනුවට face swap සහ detail shuffle ඇති විය හැක. සංවේදී පුද්ගලයෙකු, unpublished IP හෝ client draft නම් visibility, retention, training සහ commercial terms පරීක්ෂා කරන්න.

## කෙටි Character Lock Block

දිගු adjectives වෙනුවට පෙනෙන සහ පරීක්ෂා කළ හැකි facts ලියන්න: oval face, wide-set eyes, වම් brow අසල mole, dark-brown chin-length bob, 7.5 heads පමණ උස, dark-green cloak, brass buttons, brown mail bag සහ soft picture-book style. Expression, pose, camera, background සහ weather වෙනස් විය හැකි බව වෙනම ලියන්න. Mole අතුරුදහන් වීම, bob දිග වීම, cloak නිල් වීම, buttons square වීම, bag අනෙක් පැත්තට යාම හෝ output photoreal වීම reject conditions වේ.

## Shots හතරකින් consistency පරීක්ෂා කරන්න

1. **Neutral portrait:** සරල background සහ පැහැදිලි ආලෝකයෙන් face, hairline, color සහ accessories පරීක්ෂා කරන්න.
2. **Side හෝ full-body:** project අවශ්‍යතාව අනුව තෝරා silhouette, shoulder, waist, hem සහ prop position බලන්න.
3. **Dynamic action:** running, bending, sword swing හෝ turning වැනි සැබෑ action යොදාගන්න; occlusion සහ perspective දෝෂ හෙළි කරයි.
4. **Controlled scene/style pressure:** එකවර එක් විශාල variable එකක් පමණක් වෙනස් කරන්න. text, logo, seal හෝ badge ඇත්නම් final display size එකේ කියවිය හැකිද බලන්න.

## Four-Shot Acceptance Record

Anchor file, reference version, locked features, allowed changes, hardest shot සහ unified check size සටහන් කරන්න. සෑම shot එකකටම face, body, hairstyle, clothing/props සහ visual language සඳහා pass/fail සහ symptom ලියන්න. Overall තීරණය `pass / fix / switch route` ලෙස තබන්න. Failed images “side-profile nose bridge දිග විය” වැනි symptom නාමයෙන් සුරකින්න.

## Failure පසු එක් minimal retry එකක් පමණි

Retry එකකදී එක් විශාල variable එකක් පමණක් වෙනස් කරන්න: side drift සඳහා clearer side reference, body drift සඳහා full-body reference, back-hair error සඳහා back contour reference. Garment text හෝ badge post-production typesetting වෙත තබන්න. චරිත දෙකක් ඇති frame එකට පෙර දෙදෙනාම තනිව shots හතරකින් pass කරවන්න. Retry එකකින් පසුවත් එම dimension එක fail නම් blind reroll නවතා dedicated character feature, filtered training, split post-production හෝ manual retouching තෝරන්න.

## References, character features සහ training routes

Plain prompt + reference කුඩා concept set සඳහා ගැළපේ, නමුත් සෑම generation එකකම identity නැවත අර්ථකථනය විය හැක. Dedicated character feature scenes සහ poses ගණනාවකට උපකාරී විය හැකි නමුත් නම පමණක් ප්‍රතිඵල සහතික නොකරයි. Training route high-volume serial සඳහා උපකාරී විය හැකි නමුත් data quality, cost, rights, privacy සහ baked-in errors අවදානම් ඇත. route එක තෝරන්න ලස්සන portrait එකෙන් නොව, වඩාත්ම දුෂ්කර required shot එකෙන්.

## FAQ

### Fixed seed එකෙන් සෑමවිටම එකම character ලැබේද?

නැත. Seed එක conditions නැවත ලබා දිය හැකි නමුත් සම්පූර්ණ identity නිරවද්‍යතාව ඔප්පු නොකරයි.

### එක character sheet එකක් ප්‍රමාණවත්ද?

නැත. Side, full-body සහ action shots වෙනම failure පෙන්විය හැක.

### LoRA සෑමවිටම reference image එකකට වඩා ස්ථාවරද?

නැත. Training material සහ configuration මත රඳා පවතී.

### චරිත දෙකක face swap නවත්වන්නේ කෙසේද?

දෙදෙනාම වෙන වෙනම shots හතරකින් pass කර distinct lock blocks තබා, පසුව two-person composition පරීක්ෂා කරන්න.

### Stills pass වුවහොත් video එකත් consistent වේද?

අනිවාර්යයෙන්ම නොවේ. Motion සහ frame-to-frame identity සඳහා වෙනම test එකක් අවශ්‍යය.

අවසාන ප්‍රශ්නය: project එකේ වඩාත්ම දුෂ්කර shot එක pass වූවාද, නැතිනම් frontal portrait එක පමණක් ලස්සනද?
