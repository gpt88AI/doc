---
title: Gemini Image Generation Prompt Guide: Chinese Structure, Templates, and API Boundaries
description: Chinese creators மற்றும் developers-க்கான Gemini image prompt, Nano Banana model தேர்வு, ஏழு-field structure, templates, reference editing, API மற்றும் quota boundaries.
date: 2026-01-21
category: தொழில்நுட்ப வழிகாட்டி
tags: [Gemini, 图片生成, 提示词, Nano Banana, API教程]
readTime: 15
relatedPath: /docs/api/images/
relatedTitle: Google 图片生成 API
---

Gemini image prompt-ஐ keyword stack ஆக எழுத வேண்டாம். Designer-க்கு வழங்கும் creative brief போல use case, subject, composition, style, constraints, output size மற்றும் acceptance criteria-ஐ குறிப்பிடுங்கள். இது AI Studio மற்றும் API workflow இரண்டிலும் பயன்படும்.

2026-07-08 நிலவரத்தில் Nano Banana 2, Pro, Lite மற்றும் பழைய Nano Banana routes உள்ளன. புதிய code-ல் Interactions API-ஐப் பயன்படுத்துங்கள்; `response_format`-ல் `type: "image"`, `aspect_ratio`, `image_size` மூலம் output-ஐ கட்டுப்படுத்துங்கள். Model, pricing, quota, availability மாறலாம்; production முன் official docs சரிபார்க்கவும்.

| பணி | பரிந்துரை |
| --- | --- |
| வேகமான sketches | Nano Banana 2 அல்லது Lite |
| text, branding, complex composition | Nano Banana Pro / `gemini-3-pro-image` |
| 4K delivery | `image_size: "4K"`, cost verify செய்யவும் |
| reference editing | உரிமையுள்ள images மட்டும் upload செய்யவும் |
| batch generation | fixed fields, queues, Batch/Flex |

## Model-ஐ முதலில் தேர்ந்தெடுக்கவும்

`gemini-3.1-flash-lite-image` low-cost sketches-க்கு, `gemini-3.1-flash-image` பொதுவான generation/editing-க்கு, `gemini-3-pro-image` professional assets, complex instructions மற்றும் 4K-க்கு ஏற்றது. `gemini-2.5-flash-image` legacy route. முதலில் low-cost model-ல் 3–5 directions உருவாக்கி, சிறந்ததை Pro அல்லது 4K-க்கு upgrade செய்யுங்கள்.

## Chinese prompt-ன் ஏழு fields

1. **Use case:** ecommerce hero, web hero, poster, cover அல்லது app icon.
2. **Subject:** frame-ன் மைய object அல்லது character.
3. **Composition:** centered, left copy space, top-down, rule of thirds.
4. **Style:** product photography, 3D icon, flat illustration, ink wash.
5. **Details:** logo position, packaging text, clothing colors மற்றும் மாறாத features.
6. **Output:** ratio, size, whitespace; 16:9, 4:5, 1:1, 4K போன்றவை.
7. **Acceptance:** தவறான text, deformed hands, subject-ஐ மறைக்கும் background ஆகியவை failure.

```text
Generate a [ratio/size] image for [use case].
The subject is [subject], positioned [composition].
The scene includes [environment/elements], style is [visual style].
Must keep [constraints], and avoid [exclusions].
Fit [delivery context] and convey [mood/brand feel].
```

Poster அல்லது infographic-ல் சிறிய final text-ஐ model மூலம் render செய்யாமல் whitespace விட்டு design tool-ல் typeset செய்யுங்கள். Character consistency-க்கு face, hairstyle, clothing color, accessories ஆகியவற்றை unchanged என்று குறிப்பிடுங்கள். Local editing-ல் ஒவ்வொரு round-லும் ஒரு region மட்டும் மாற்றுங்கள்.

## API மற்றும் reference images

புதிய code-ல் Interactions API:

```python
interaction = client.interactions.create(
    model="gemini-3.1-flash-image",
    input=prompt,
    response_format={"type": "image", "aspect_ratio": "16:9", "image_size": "2K"},
)
```

4K asset-க்கு `gemini-3-pro-image` மற்றும் `image_size: "4K"` அமைக்கவும்; cost மற்றும் Batch/Flex boundaries-ஐ official docs-ல் verify செய்யுங்கள். Reference image-ல் எதை வைத்திருக்க வேண்டும், எதை மாற்ற வேண்டும் என்று தெளிவாக எழுதுங்கள். ஒவ்வொரு editing round-லும் composition, lighting, text area போன்ற ஒரு முக்கிய இலக்கு மட்டும் வைத்திருங்கள்.

## Cost, quota மற்றும் failures

Quota project அடிப்படையில் அமலும், API key அடிப்படையில் அல்ல. Model ID, output size, call mode, RPM/TPM/RPD/IPM, spend limit மற்றும் gateway logs-ஐ launch முன் சரிபார்க்கவும். Gateway official source of truth அல்ல; sensitive material-க்கு official அல்லது enterprise route பயன்படுத்துங்கள்.

Subject மட்டும் விவரித்தால் delivery composition தவறலாம்; use case சேர்க்கவும். அதிக text-ஐ image-ல் நேரடியாக வைக்காமல் title area விடுங்கள். தெளிவற்ற reference constraints subject deformation-ஐ ஏற்படுத்தும். பல style words instability தரும். முதலில் 1K/2K-ல் iterate செய்யுங்கள்; frequent `429`-க்கு queue, backoff, குறைந்த resolution அல்லது Batch/Flex பயன்படுத்துங்கள்.

## FAQ மற்றும் தொடக்க வரிசை

Chinese prompt-ஐ நேரடியாகப் பயன்படுத்தலாம். Prompt-ல் “4K” எழுதுவது API 4K output-க்கு guarantee அல்ல; `image_size` அதை கட்டுப்படுத்தும். Real people, portraits, brands, copyrighted material ஆகியவற்றுக்கு rights மற்றும் safety boundaries பின்பற்றுங்கள். Gateway official API-ஐ முழுமையாக replace செய்யாது.

1. ஏழு fields கொண்ட prompt எழுதுங்கள்.
2. Low-cost model-ல் 3–5 directions உருவாக்குங்கள்.
3. ஒரு direction-ல் 2–3 rounds; ஒவ்வொரு round-லும் ஒரு goal.
4. தேவையானபோது Pro, 2K அல்லது 4K-க்கு upgrade செய்யுங்கள்.
5. Model, size, prompt, references, cost, failures பதிவு செய்யுங்கள்.

## Further Reading

- [Google 图片生成 API](/docs/api/images/)
