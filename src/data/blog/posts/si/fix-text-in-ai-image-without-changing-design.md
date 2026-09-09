---
title: සැලසුම වෙනස් නොකර AI රූපයක වැරදි පෙළ වෙනස් කරන්නේ කෙසේද
description: වැරදි පෙළකට prompt එකකින් සම්පූර්ණ රූපය නැවත සාදන්න එපා. මුලින් source file, පසුව editable text layer, අවසානයේ සීමිත AI edit භාවිතා කරන්න.
date: 2026-07-27
category: රූප නිර්මාණය
tags: [AI රූප පෙළ, රූප සංස්කරණය, සැලසුම්]
readTime: 9
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: Agent රූප ගුණාත්මකභාවය සහ crop guide
---

AI poster, product card හෝ cover එකක් ලස්සන වුවත් එහි පෙළ වැරදි විය හැක. “පෙළ පමණක් වෙනස් කර අනෙක් සියල්ල එසේම තබන්න” යන prompt එකෙන්ද සම්පූර්ණ රූපය නැවත නිර්මාණය විය හැක; පුද්ගලයා, ආලෝකය, texture සහ හිස් අවකාශය වෙනස් විය හැක.

## පළමුව නිවැරදි මාර්ගය තෝරන්න

ආරක්ෂිත අනුපිළිවෙල මෙයයි: **මුලින් source file සොයන්න; නැතිනම් editable text layer සාදන්න; පැරණි පෙළ මකා සැබෑ font එකෙන් layout කරන්න; අඩු අවදානම් decorative text සඳහා පමණක් local AI edit උත්සාහ කරන්න।** නම, මිල, දිනය සහ unit වචනයෙන් වචනය පරීක්ෂා කරන්න.

| තත්ත්වය | හොඳම මාර්ගය |
| --- | --- |
| Figma, Canva, PSD හෝ PPT ඇත | සැබෑ text layer වෙනස් කර export කරන්න |
| source නැත, නමුත් poster පැහැදිලිය | OCR සහ layout editable layers ලෙස නැවත සාදන්න |
| background සරලය | mask එකකින් පැරණි පෙළ ඉවත් කර අලුත් පෙළ දමන්න |
| කුඩා decorative text එකකි | කුඩා mask එකකින් AI edit පරීක්ෂා කරන්න |

“සැලසුම වෙනස් නොකරන්න” යනු මැජික් prompt එකක් නොවේ. canvas size, crop, subject, texture, වර්ණ, font, size, spacing, line-height, shadow සහ perspective සියල්ල පරීක්ෂා කළ යුතුය.

## Source file තිබේ නම් එයම භාවිතා කරන්න

මුල් Figma, Canva, Photoshop, Illustrator හෝ PowerPoint file එක විවෘත කරන්න. font සහ license පරීක්ෂා කර copy එක පමණක් වෙනස් කරන්න. අලුත් පෙළ දිගු නම් font එක පමණක් කුඩා නොකර line break, spacing සහ safe margin ද බලන්න. පැරණි සහ අලුත් export overlay කර පෙළෙන් පිටත pixels වෙනස් වී නැති බව තහවුරු කරන්න.

## Source නැති විට editable layer

පැහැදිලිම රූපය upload කර OCR නිවැරදි යැයි අන්ධව නොසිතන්න. පෙළ, font weight, size, alignment, spacing, color සහ line-height පරීක්ෂා කරන්න. මුලින් වැදගත් line එකක් වෙනස් කර කුඩා export එකක් ගන්න. OCR අකුරු කැබලි කළහොත් හෝ decorative text එක background ලෙස ගත්තොත් manual rebuild කරන්න.

## AI local edit භාවිතා කළ යුත්තේ කවදාද

එය low-risk decorative text හෝ draft සඳහා පමණක් සුදුසුය. එක් ප්‍රදේශයක් තෝරා මෙසේ ලියන්න: “තෝරාගත් ප්‍රදේශයේ පැරණි පෙළ ‘Summer Market’ කරන්න; canvas, crop, subject, background, lighting සහ අනෙක් පෙළ වෙනස් නොකරන්න.” උත්සාහ දෙකකදී non-target වෙනස්කම් ඇති වුවහොත් text layer හෝ manual layout වෙත ආපසු යන්න.

## මිනිත්තු පහක අවසන් පරීක්ෂාව

1. නම, මිල, දිනය, දුරකථන අංකය, unit සහ punctuation කියවන්න.
2. මුල් resolution එකේ edge, ghosting සහ විකෘති strokes බලන්න.
3. සැබෑ web, social හෝ print size එකේ readability පරීක්ෂා කරන්න.
4. Overlay කර අනවශ්‍ය movement තිබේද බලන්න.
5. original, editable file සහ final export වෙන වෙනම තබන්න.

ID card, contract, invoice, medical හෝ financial record, private customer asset සහ evidence screenshot නොදන්නා public tool එකකට upload නොකරන්න. වැදගත් පෙළ සඳහා සැබෑ text layer විශ්වාසදායකය; AI background repair සහ draft සඳහා හොඳය, final proof සඳහා නොවේ.
