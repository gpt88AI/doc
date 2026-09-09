---
title: AI නිෂ්පාදන ඡායාරූපවල එකම නිෂ්පාදනය අඛණ්ඩව නිවැරදිව තබාගැනීමේ QC ක්‍රමය
description: පළමුව සැබෑ SKU එක lock කර පසුව scene එක පමණක් වෙනස් කරන්න. reference package, lock/allow-change matrix, six-frame stress test සහ per-image QC මඟින් හැඩය, වර්ණය, text සහ variant දෝෂ අඩු කරන්න.
date: 2026-07-28
category: රූප නිර්මාණය
tags: [AI Product Photos, Product Consistency, Ecommerce Photography, Reference Images, Product Image QC]
readTime: 12
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: Agent Image Quality & Crop Guide
---

AI product photos කිහිපයක එකම නිෂ්පාදනය තබාගැනීමට පළමු පියවර prompt එක නැවත නැවත වෙනස් කිරීම නොවේ. සැබෑ SKU එක සඳහා reference package එකක් සාදන්න. “කිසිදා වෙනස් නොවිය යුතු” සහ “වෙනස් කළ හැකි” ලෙස ලැයිස්තු දෙකක් ලියන්න. සෑම output එකක්ම සැබෑ ඡායාරූප සමඟ සසඳන්න. හැඩය, parts, packaging text, Logo, වර්ණය හෝ specification වැරදීම aesthetic ගැටලුවක් නොව product-fact දෝෂයකි.

ප්‍රායෝගික අනුපිළිවෙළ: අයිතිය ඇති වත්මන් ඡායාරූපවලින් ground truth සාදන්න; product identity lock කරන්න; scene, props, lighting සහ crop පමණක් වෙනස් කරන්න; මුලින් six-frame stress test කරන්න; පසුව එකම QC table එකෙන් සෑම image එකක්ම පරීක්ෂා කරන්න. Reference images උපකාරී නමුත් auto-replication සහතික නොකරයි. fixed prompt හෝ seed එකකින් SKU නිරවද්‍යතාව ඔප්පු නොවේ.

## Product identity සහ visual style වෙන් කරන්න

| කොටස | Lock කළ යුතු දේ | වෙනස් කළ හැකි දේ | සාමාන්‍ය දෝෂය |
| --- | --- | --- | --- |
| Product identity | silhouette, parts, label, color, material, variant | සැබෑ data සහාය දෙන angle | cap/port වෙනස් වීම, වැරදි වර්ණය හෝ capacity |
| Visual style | campaign එකේ සමස්ත දිශාව | background, props, light, composition | shadow සහ product scale නොගැළපීම |

Style එක සමාන වුවත් set එකෙන් වැරදි නිෂ්පාදනයක් පෙන්විය හැක. මුලින් product facts නිවැරදිද බලන්න; පසුව අලංකාරය සහ campaign cohesion පරීක්ෂා කරන්න.

## සැබෑ reference package එකක් සාදන්න

සෑම SKU එකකටම පැහැදිලි hero image, side/back/top/bottom angles, Logo සහ label close-ups, SKU fact card සහ channel delivery table තබන්න. Front photo එකක් front එක පමණක් ඔප්පු කරයි; back හෝ open state ගැන data නැතිනම් AI අනුමාන කරයි. පැරණි packaging, වෙනස් color/capacity, bundle සහ single item වෙන් කරන්න. මූලාශ්‍රය නොදන්නා හෝ අයිතිය නැති assets ඉවත් කරන්න.

## Lock / Allow-change matrix ලියන්න

උදාහරණයක් ලෙස frosted-white 50 mL serum bottle එකක silhouette, silver pump, clear cap, label, color, material සහ 50 mL specification lock විය යුතුය. background, props, lighting සහ frame crop වෙනස් කළ හැක. Acceptance method ද ලියන්න: same-angle photo සමඟ silhouette overlay, parts ගණන, label එක අකුරෙන් අකුර කියවීම සහ material reflections සසඳීම.

## එක් universal prompt එකකට වඩා modular prompt

Prompt එක product lock, allowed changes, scene task, camera/lighting, forbidden changes සහ acceptance conditions ලෙස කොටස් කරන්න. සැබෑ reference හි silhouette, pump, cap, label, material සහ 50 mL නොවෙනස්ව තබා background, surface, props, light සහ crop පමණක් වෙනස් කරන්න. නව part, text, color, material හෝ reference හි නොපෙන්වන back structure එකක් නිර්මාණය නොකරන්න. මෙය සාර්ථකත්වය සහතික නොකරයි; failure debug කිරීම පහසු කරයි.

## GPT88 තුළ මුලින් කුඩා controlled test එකක්

එක් current SKU එකක්, අවශ්‍ය angles සහ modular prompt එකකින් candidates කිහිපයක් සාදන්න. සැබෑ ඡායාරූපය සමඟ side-by-side බලමින් pass, hard error, local fix සහ uncertain items ලියාගන්න. hard product errors තිබියදී සම්පූර්ණ batch එක අරඹන්න එපා. Background පමණක් වෙනස් කළ යුතු නම් සහ real product pixels තබාගත හැකි නම් full regeneration වෙනුවට local editing route තෝරන්න.

## Frame හයක stress test

Clean hero, same-angle scene, label close crop, high-contrast scene, mobile tight crop සහ ad whitespace version පරීක්ෂා කරන්න. එයින් silhouette, parts, text, material, crop safety සහ decoration drift හෙළි වේ. සැබෑ reference නැති angle එකක් AI ලවා අනුමාන නොකරන්න; reshoot හෝ trusted 3D asset භාවිත කරන්න.

## Per-image QC: මුලින් hard errors

| පරීක්ෂාව | Pass condition |
| --- | --- |
| Geometry | silhouette සහ proportions reference සමඟ ගැළපීම |
| Parts | count, position සහ connections නිවැරදි වීම |
| Text/Logo | සෑම අකුරක් සහ unit එකක්ම කියවිය හැකි වීම |
| Variant | color, capacity සහ bundle නිවැරදි SKU වීම |
| Material | metal, glass, frost සහ transparency සැබෑ ලෙස පෙනීම |
| Context | props/අත/ස්ථානය සමඟ scale සාධාරණ වීම |
| Export | channel ratio, crop සහ mobile clarity නිවැරදි වීම |

මිශ්‍ර භාෂා packaging එකක numbers, units, `0/O`, `1/I` සහ regulatory text මිනිසෙකු විසින් කියවා බලන්න. OCR සැක සහිත ස්ථාන පෙන්වයි; human review වෙනුවට එය භාවිත කළ නොහැක.

## තීරණය Pass / Fix / Change Route ලෙස ලියන්න

**Pass**: product facts සැබෑ reference සමඟ ගැළපෙන අතර channel export නිවැරදිය. **Fix**: crop, background, shadow හෝ whitespace වැනි local සහ verify කළ හැකි ගැටලු පමණක් සකස් කරන්න; product identity නැවත නිර්මාණය නොකරන්න. **Change Route**: angle data නැතිවිට, text නැවත නැවත විකෘති වනවිට හෝ geometry drift වනවිට real pixels, compositing, 3D හෝ professional retouching තෝරන්න.

## FAQ

### එකම prompt සහ seed එක product එක ස්ථාවර කරයිද?

නැත. ඒවා generation conditions නැවත ලබා දිය හැකි නමුත් shape, label, material හෝ parts නිවැරදි බව ඔප්පු නොකරයි.

### Front photo එකකින් back සහ sides නිර්මාණය කළ හැකිද?

විශ්වාසදායක product evidence ලෙස නොහැක. Missing angles reshoot හෝ trusted 3D මඟින් ලබා දෙන්න.

### Style consistency යනු product consistency ද?

නැත. එකම background තිබුණත් SKU එක වැරදි විය හැක.

### Packaging text වැරදි නම් නැවත නැවත regenerate කළ යුතුද?

නැත. කියවිය හැකි text අවශ්‍ය නම් real label pixels, compositing හෝ retouching route භාවිත කරන්න.

### Frames හයම pass නම් batch ආරම්භ කළ හැකිද?

මෙය diagnostic gate එකක් පමණි, guarantee එකක් නොවේ. channel rules සහ per-image QC තවමත් අවශ්‍යය.
