---
title: රූපයක් 100KB හෝ 200KB දක්වා සම්පීඩනය කරන ආකාරය: ආකෘතිය, ප්‍රමාණය සහ ගුණාත්මකභාවය
description: Upload form හි නීති අනුව රූපය 100KB හෝ 200KB දක්වා සම්පීඩනය කරන්න. මුලින් ආකෘතිය, pixel dimensions සහ aspect ratio පරීක්ෂා කර JPG, PNG හෝ WebP තෝරන්න.
date: 2026-06-15
category: තාක්ෂණික මාර්ගෝපදේශය
tags: [Image Compression, Compress to 100KB, Compress to 200KB, JPG Compression, Upload Forms]
readTime: 11
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: Agent Image Quality & Crop Guide
---

Form එකේ “උපරිම 100KB” යනුවෙන් පමණක් සඳහන් නම් හරියටම 100KB කිරීමට උත්සාහ නොකරන්න; 95–98KB පමණ ආරක්ෂිත ඉලක්කයකි. 200KB සීමාවකට 190–195KB තබන්න. Rounding, KB/KiB වෙනස සහ නැවත save කිරීම සඳහා ඉඩ ඉතිරි වේ. Form එක JPG, නියමිත pixel size හෝ 50–100KB පරාසයක් ඉල්ලන්නේ නම් එම නීතියට ප්‍රමුඛතාව දෙන්න.

## සම්පීඩනයට පෙර සියලුම upload නීති කියවන්න

Upload අසාර්ථක වන්නේ file size එක නිසා පමණක් නොවේ. හැඳුනුම්පත්, විභාග, වීසා, avatars සහ රජයේ portals size සමඟ format, dimensions, aspect ratio, background, transparency සහ filename ද පරීක්ෂා කළ හැක. උපරිම size, අවම සීමාව, පිළිගන්නා format, width/height, ratio සහ transparency මුලින් සටහන් කරගන්න.

“JPG පමණයි” හෝ “295 × 413 pixels” වැනි දේ අනිවාර්ය නීති වේ. Crop, width, JPG quality සහ metadata තබාගැනීම වෙනස් කළ හැකි විකල්ප වේ. පළමුව අනිවාර්ය නීති සපුරා, පසුව compression සකස් කරන්න.

## 100KB සහ 200KB සඳහා ආරක්ෂිත ඉලක්ක

100KB සීමාවකට 95–98KB ද, 200KB සීමාවකට 190–195KB ද ලෙස ආරම්භ කරන්න. 3MB phone photo එකක් 40KB කළහොත් upload විය හැකි නමුත් මුහුණ, අකුරු හෝ මුද්‍රාව විනාශ විය හැක. ඉතා දැඩි පද්ධතියක 90KB හෝ 180KB උත්සාහ කළ හැකි නමුත් එය සාමාන්‍ය quality ඉලක්කයක් නොවේ.

## පළමුව pixel dimensions අඩු කර පසුව quality වෙනස් කරන්න

4000px පළල රූපයක් ඉතා අඩු JPG quality එකකින් save කරනවාට වඩා මුලින් අවශ්‍ය ප්‍රමාණයට resize කිරීම හොඳය. Original එකේ copy එකක් තබා crop/resize කර, නිවැරදි format එක තෝරා, quality ටිකෙන් ටික වෙනස් කර, download කළ සැබෑ file එක පරීක්ෂා කරන්න. සෑම export එකකටම පසු මුහුණ, කුඩා අකුරු, දාර සහ පසුබිම zoom කර බලන්න. Auto-crop සහ EXIF rotation නිසා composition වෙනස් වී ඇත්ද බලන්න.

## JPG, PNG, WebP හෝ HEIC

| රූප වර්ගය | සාමාන්‍ය තේරීම | අවධානය |
| --- | --- | --- |
| හැඳුනුම් ඡායාරූප, avatars, සාමාන්‍ය ඡායාරූප | JPG/JPEG | dimensions මුලින් පාලනය කරන්න |
| screenshots, වගු, අකුරු සහිත රූප | PNG හෝ උසස් quality JPG | කුඩා අකුරුවල දාර පරීක්ෂා කරන්න |
| transparency සහිත logos, icons, stickers | PNG | JPG කළහොත් transparency නැති වේ |
| iPhone HEIC | පළමුව JPG ලෙස export කරන්න | extension වෙනස් කිරීම conversion එකක් නොවේ |
| scans සහ ලේඛන | Portal එක පිළිගන්නා format | අකුරු කියවිය හැකිව තබන්න |

WebP කුඩා විය හැකි නමුත් පැරණි registration හෝ රජයේ portals එය නොපිළිගත හැක. අවසාන තීරණය upload form එකේ නීතියයි.

## සැබෑ file size එක පරීක්ෂා කරන්න

Editor estimate එක හෝ browser preview එක ප්‍රමාණවත් නොවේ. Save/download කළ file එකේ සැබෑ KB file manager එකෙන් බලන්න. ZIP එකක් නම් ඇතුළත සෑම රූපයකම size එක පරීක්ෂා කරන්න. 98KB වුවත් format, dimensions හෝ ratio වැරදි නම් upload අසාර්ථක විය හැක. Original එක ආරක්ෂිතද, target එක නිවැරදිද, format/dimensions ගැළපේද සහ වැදගත් විස්තර පැහැදිලිද යන්න බලන්න.

## සංවේදී රූප නොදන්නා sites වෙත upload නොකරන්න

හැඳුනුම්පත්, passport, medical records, contracts, invoices, customer data හෝ නිකුත් නොකළ product images සඳහා local editor, system tool හෝ ආයතනය අනුමත කළ workflow භාවිත කරන්න. “Free”, “unlimited” හෝ “auto-delete” යන්න privacy සහතිකයක් නොවේ.

## සීමාවට අඩු වුවත් reject වන්නේ නම්

පළමුව extension සහ සැබෑ format, පසුව pixel dimensions, ratio, background, transparency සහ filename පරීක්ෂා කරන්න. HEIC නම JPG ලෙස වෙනස් කිරීම conversion එකක් නොවේ. Size තව අඩු කිරීමට පෙර නීති එකින් එක පරීක්ෂා කරන්න. Boundary ගැටලුවක් නම් 2–5KB අමතර ඉඩක් තබා නව file එක upload වන්නේද බලන්න.

## FAQ

### හරියටම 100KB විය යුතුද?

“exactly 100KB” ලෙස පැහැදිලිව ඉල්ලා සිටින විට පමණි. “max 100KB” නම් 95–98KB සාමාන්‍යයෙන් ආරක්ෂිතය.

### 200KB සෑමවිටම පැහැදිලිද?

සාමාන්‍යයෙන් වැඩි detail තබාගත හැකි නමුත් original image, dimensions සහ format ද වැදගත්ය.

### JPG හෝ PNG තෝරන්නේ කුමක්ද?

ඡායාරූප සඳහා JPG; අකුරු, screenshots සහ transparency සඳහා PNG. මුලින් form එකේ නීතිය බලන්න.

### දුරකථනයෙන් කරන්නේ කෙසේද?

අවශ්‍ය ratio අනුව crop කර dimensions අඩු කර JPG export කරන්න; Files තුළ සැබෑ size එක බලන්න.

### ID ඡායාරූප online compressor එකකට දිය හැකිද?

නොදන්නා site එකකට නොදෙන්න; local හෝ trusted workflow එකක් භාවිත කරන්න.

### metadata ඉවත් කළහොත් රූපය වෙනස් වේද?

සාමාන්‍යයෙන් දෘශ්‍ය රූපය වෙනස් නොවේ, නමුත් compliance ලේඛන සඳහා අවශ්‍ය නීති පරීක්ෂා කරන්න.

### quality loss අඩු කරන්නේ කෙසේද?

අතිරික්ත pixels මුලින් අඩු කර, නිවැරදි format තෝරා, පසුව quality ටිකෙන් ටික වෙනස් කරන්න. සෑම export එකකටම පසු වැදගත් විස්තර පරීක්ෂා කරන්න.
