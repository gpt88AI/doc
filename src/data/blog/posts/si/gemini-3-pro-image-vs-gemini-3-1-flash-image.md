---
title: Nano Banana 2, Pro හෝ 2 Lite: බෙදාහැරීමේ අවදානම අනුව තෝරන්න
description: එකම input, size සහ acceptance criteria භාවිතයෙන් Nano Banana 2 Lite, Nano Banana 2 සහ Nano Banana Pro අතර API route එක තෝරන්න.
date: 2026-05-30
category: ආකෘති සැසඳීම
tags: [Nano Banana 2 Lite, Nano Banana 2, Nano Banana Pro, ආකෘති සැසඳීම, Image API]
readTime: 7
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

වේගවත් 1K direction screening පමණක් අවශ්‍ය නම් Nano Banana 2 Lite එකෙන් ආරම්භ කරන්න. 2K හෝ 4K, වැඩි variants, හෝ සාමාන්‍ය generation සහ editing අවශ්‍ය නම් Nano Banana 2 භාවිත කරන්න. dense text, දැඩි brand නීති, වැදගත් product mockup හෝ අධික rework වියදමක් ඇති විට පමණක් එකම input එකෙන් Nano Banana Pro සසඳන්න. මෙය API routing තීරණයකි; Gemini App, AI Studio, Vertex හෝ third-party platform pricing පිළිබඳ සහතිකයක් නොවේ.

Model IDs තුන වන්නේ `gemini-3.1-flash-lite-image`, `gemini-3.1-flash-image` සහ `gemini-3-pro-image` ය. සෑම තත්ත්වයකම එකම model එක ජයග්‍රාහකයා නොවේ. එකම input සහ acceptance criteria යටතේ pass rate, retry count සහ manual-revision time බලන්න.

## මුලින් delivery risk අනුව route තෝරන්න

| අවශ්‍යතාව | ආරම්භය | වෙනස් කළ යුතු අවස්ථාව |
| --- | --- | --- |
| 1K preview, direction draft හෝ background variant | **Nano Banana 2 Lite** | 2K/4K අවශ්‍ය වූ විට හෝ 1K ප්‍රමාණවත් නොවූ විට |
| සාමාන්‍ය generation/editing, වැඩි sizes සහ සැබෑ deliverable | **Nano Banana 2** | text, structure, reference consistency හෝ rework නැවත නැවත අසමත් වූ විට |
| high-risk brand asset, dense text හෝ complex mockup | **Nano Banana Pro** | logo, කුඩා text, exact color හෝ regulated copy ස්ථාවර නොවූ විට |

Delivery size, reference assets, image text, retry budget සහ final reviewer මුලින් ලියා තබන්න. Lite හි official සීමාව 1K ය; size අවශ්‍යතාව නිසා එය නොගැළපේ නම් unit price පමණක් සසඳා ප්‍රයෝජනයක් නැත.

## එකම input සමඟ accepted-output cost test

Prompt, reference image, aspect ratio, size සහ safety requirements එකම ලෙස තබා model ID පමණක් වෙනස් කරන්න. Lite ඉලක්ක size එක සහාය නොදක්වන්නේ නම් `N/A` ලෙස සටහන් කරන්න. සෑම sample එකකටම pass/fail, generation fee, retry count, manual revision minutes සහ review wait සටහන් කරන්න. Accepted-output cost = (model cost + manual revision cost) ÷ accepted count.

එක් හොඳ sample එකකින් තීරණය නොකරන්න. text poster, packaging, reference editing සහ 4K key visual වැනි සැබෑ deliverables මත පරීක්ෂා කරන්න.

## Upgrade කළ යුත්තේ කවදාද, නවතින්නේ කවදාද

Lite size සීමාව නිසා පමණක් අසමත් නම් Nano Banana 2 හෝ Pro වෙත යන්න. Nano Banana 2 එකම input යටතේ text accuracy, complex layout හෝ reference consistency පිළිබඳ නැවත නැවත අසමත් වී, Pro retries හෝ manual edits අඩු කරන්නේ නම් පමණක් upgrade කිරීමට සාක්ෂියක් ඇත. Pro ද logo, barcode, price, date සහ regulated copy සඳහා manual verification වෙනුවට භාවිත කළ නොහැක.

4K සඳහා Pro අනිවාර්ය නොවේ; Nano Banana 2 ද 4K candidate එකකි. Lite යනු low-quality යන්න නොවේ; එහි ප්‍රධාන සීමාව 1K ය. API price සෑම entry point එකකම සැබෑ මුළු වියදම නොපෙන්වයි, මන්ද region, quota, billing unit සහ terms වෙනස් විය හැකි බැවිනි.
