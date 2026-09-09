---
title: Gemini Image Generation Prompt Guide: Chinese Structure, Templates, and API Boundaries
description: Chinese creators සහ developers සඳහා Gemini image prompt, Nano Banana model තේරීම, seven-field structure, templates, reference editing, API සහ quota boundaries.
date: 2026-01-21
category: තාක්ෂණික නිබන්ධනය
tags: [Gemini, 图片生成, 提示词, Nano Banana, API教程]
readTime: 15
relatedPath: /docs/api/images/
relatedTitle: Google 图片生成 API
---

Gemini image prompt එක keyword stack එකක් ලෙස නොලියන්න. Designer කෙනෙකුට දෙන creative brief එකක් ලෙස use case, subject, composition, style, constraints, output size සහ acceptance criteria සඳහන් කරන්න. මෙය AI Studio සහ API workflow දෙකටම ගැළපේ.

2026-07-08 සන්දර්භය තුළ Nano Banana 2, Pro, Lite සහ පැරණි Nano Banana routes තිබේ. නව code සඳහා Interactions API තෝරන්න; `response_format` තුළ `type: "image"`, `aspect_ratio` සහ `image_size` යොදන්න. Model, pricing, quota සහ availability වෙනස් විය හැකි නිසා production පෙර official docs පරීක්ෂා කරන්න.

| කාර්යය | යෝජනාව |
| --- | --- |
| වේගවත් sketches | Nano Banana 2 හෝ Lite |
| text, branding, complex composition | Nano Banana Pro / `gemini-3-pro-image` |
| 4K delivery | `image_size: "4K"` සහ cost verify කරන්න |
| reference editing | අයිතිය ඇති images පමණක් upload කරන්න |
| batch generation | fixed fields, queues, Batch/Flex |

## Model එක මුලින් තෝරන්න

`gemini-3.1-flash-lite-image` අඩු වියදම් sketches සඳහා, `gemini-3.1-flash-image` සාමාන්‍ය generation/editing සඳහා, සහ `gemini-3-pro-image` professional assets, complex instructions සහ 4K සඳහා වේ. `gemini-2.5-flash-image` legacy route එකකි. මුලින් low-cost model එකක directions 3–5ක් සාදා, හොඳම එක Pro හෝ 4K වෙත upgrade කරන්න.

## Chinese prompt හි fields හත

1. **Use case:** ecommerce hero, web hero, poster, cover හෝ app icon.
2. **Subject:** frame එකේ මධ්‍ය object හෝ character.
3. **Composition:** centered, left copy space, top-down, rule of thirds.
4. **Style:** product photography, 3D icon, flat illustration, ink wash.
5. **Details:** logo position, packaging text, clothing colors සහ වෙනස් නොකළ යුතු features.
6. **Output:** ratio, size සහ whitespace; 16:9, 4:5, 1:1, 4K වැනි දේ.
7. **Acceptance:** වැරදි text, deformed hands හෝ subject වසන background failure වේ.

```text
Generate a [ratio/size] image for [use case].
The subject is [subject], positioned [composition].
The scene includes [environment/elements], style is [visual style].
Must keep [constraints], and avoid [exclusions].
Fit [delivery context] and convey [mood/brand feel].
```

Poster හෝ infographic එකක කුඩා final text model එකෙන් render නොකර whitespace තබා design tool එකක typeset කරන්න. Character consistency සඳහා face, hairstyle, clothing color සහ accessories unchanged ලෙස සඳහන් කරන්න. Local editing එකකදී round එකකට එක region එකක් පමණක් වෙනස් කරන්න.

## API සහ reference images

නව code සඳහා Interactions API භාවිතා කරන්න:

```python
interaction = client.interactions.create(
    model="gemini-3.1-flash-image",
    input=prompt,
    response_format={"type": "image", "aspect_ratio": "16:9", "image_size": "2K"},
)
```

4K asset සඳහා `gemini-3-pro-image` සහ `image_size: "4K"` යොදන්න; cost සහ Batch/Flex boundaries current official docs මඟින් verify කරන්න. Reference image එකේ තබාගත යුතු දේ සහ වෙනස් කළ යුතු දේ පැහැදිලිව ලියන්න. Editing round එකකට composition, lighting හෝ text area වැනි ප්‍රධාන අරමුණක් පමණක් තබන්න.

## Cost, quota සහ failures

Quota project එකකට අදාළ වේ, API key එකකට නොවේ. Model ID, output size, call mode, RPM/TPM/RPD/IPM, spend limit සහ gateway logs launch පෙර පරීක්ෂා කරන්න. Gateway එක official source of truth නොවේ; sensitive material සඳහා official හෝ enterprise route තෝරන්න.

Subject එක පමණක් විස්තර කළහොත් delivery composition අසාර්ථක විය හැක; use case එකතු කරන්න. බොහෝ text image තුළ render නොකර title area තබන්න. නොපැහැදිලි reference constraints subject deformation ඇති කරයි. බොහෝ style words instability ඇති කරයි. සියලු sketches 4K දී නොකර 1K/2K සිට ආරම්භ කරන්න. Frequent `429` සඳහා queue, backoff, අඩු resolution හෝ Batch/Flex භාවිතා කරන්න.

## FAQ සහ ආරම්භක අනුපිළිවෙල

Chinese prompt සෘජුව භාවිතා කළ හැක. Prompt එකේ “4K” යන්න API 4K output සහතිකයක් නොවේ; `image_size` output එක පාලනය කරයි. Real people, portraits, brands සහ copyrighted material සඳහා rights සහ safety boundaries පිළිපදින්න. Gateway එක official API සම්පූර්ණයෙන් replace නොකරයි.

1. Fields හත සහිත prompt එකක් ලියන්න.
2. Low-cost model එකක directions 3–5ක් සාදන්න.
3. Direction එකක් මත rounds 2–3ක් කරන්න; round එකකට එක goal එකක්.
4. අවශ්‍ය විට Pro, 2K හෝ 4K වෙත upgrade කරන්න.
5. Model, size, prompt, references, cost සහ failures සටහන් කරන්න.

## Further Reading

- [Google 图片生成 API](/docs/api/images/)
