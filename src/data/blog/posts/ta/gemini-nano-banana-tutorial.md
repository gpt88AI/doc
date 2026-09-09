---
title: Gemini App Nano Banana Tutorial: Beginner முதல் Expert Guide
description: Gemini app-ல் Nano Banana image generation முழு guide — base மற்றும் Pro, login, UI, six-element prompt framework, templates, editing, errors மற்றும் API integration.
date: 2026-01-09
category: தொழில்நுட்ப வழிகாட்டி
tags: [Nano Banana, Gemini, AI Image Generation, Prompt Templates, Image Generation Tutorial]
readTime: 16
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Gemini app-ல் “draw me a cyberpunk cat” என எழுதினால் சில seconds-ல் image உருவாகும். நல்ல முடிவுக்கு model, prompt, reference image மற்றும் iteration-ஐப் புரிந்துகொள்ள வேண்டும்.

## Nano Banana மற்றும் Pro

Base Nano Banana என்பது Gemini 2.5 Flash Image அடிப்படையிலான வேகமான 1K generation. Pro என்பது Gemini 3 Pro Image Preview அடிப்படையிலானது; complex instructions, சிறந்த text rendering மற்றும் 1K/2K/4K resolution வழங்கும். சாதாரண quick creation-க்கு base போதும்; poster, infographic, text, high resolution அல்லது precise control-க்கு Pro தேர்வு செய்யுங்கள். Free Pro limit account மற்றும் நேரத்துக்கு ஏற்ப மாறலாம்; current UI-ஐ நம்புங்கள்.

## தொடக்கம் மற்றும் UI

`gemini.google.com` திறக்கவும் அல்லது official mobile app பயன்படுத்தவும். Google account, age eligibility மற்றும் supported region தேவைப்படலாம். Input box-ன் `+` மூலம் “Create image” தேர்வு செய்யவும்; அல்லது `draw`, `generate`, `create` என்று request தொடங்கவும். Fast பொதுவாக base, Thinking பொதுவாக Pro; labels account-ஐப் பொறுத்து மாறலாம். Chinese, English, Japanese உள்ளிட்ட மொழிகள் இயங்கும்; complex scene சரியாக இல்லையெனில் English phrasing முயற்சிக்கவும்.

## முதல் image workflow

1. Subject மற்றும் scene தெளிவாக முடிவு செய்யவும்; “a cat” மட்டும் vague.
2. Prompt எழுதவும்: orange cat, wooden windowsill, afternoon light, blurred plants, cozy photo style.
3. Send செய்து 5–30 seconds காத்திருக்கவும்.
4. Result-ஐ review செய்து download அல்லது அதே conversation-ல் edit செய்யவும்.
5. “cat நிறத்தை gray ஆக்கு” அல்லது “light softer ஆக்கு” என ஒவ்வொரு round-லும் ஒரு மாற்றம் மட்டும் தரவும்.

Preview பொதுவாக 1K; download மற்றும் Pro resolution current UI-ஐப் பொறுத்தது. Gemini images-ல் invisible SynthID watermark இருக்கலாம்.

## Prompt-ன் ஆறு elements

1. **Subject:** மைய object அல்லது character.
2. **Composition:** close-up, medium shot, wide shot, low angle, bird’s-eye view, 85mm lens.
3. **Action:** subject என்ன செய்கிறது — barista latte செய்கிறார், steam எழுகிறது.
4. **Location:** retro-industrial coffee shop, brick wall, warm yellow light.
5. **Style:** photorealistic, 3D, watercolor, anime, cyberpunk, minimalist, vintage.
6. **Editing:** background மாற்று, object நீக்கு, fog சேர்க்கவும்.

Keyword list-க்கு பதிலாக முழு sentences எழுதுங்கள். “nice lighting” என்பதற்கு “golden afternoon sunlight” என குறிப்பிடுங்கள். முதல் result imperfect ஆகலாம்; conversation-ல் iterate செய்யுங்கள்.

## Reusable templates

```text
Professional product photography of [product]. Clean background, three-point lighting,
soft reflections, visible texture and detail, commercial quality for ecommerce.
```

```text
Generate [scene] in [style]. Use [composition], [lighting], and [color palette].
Keep [must-preserve details] unchanged and avoid [exclusions].
```

Portrait, product, food, skyline, landscape, poster, app icon மற்றும் character consistency-ல் subject, framing, action, environment, style, constraints தெளிவாக இருக்கட்டும்.

## Multi-turn editing மற்றும் API

ஒவ்வொரு round-லும் ஒரு முக்கிய மாற்றம் மட்டும்: composition, பின்னர் lighting, பின்னர் color அல்லது text area. Reference image-க்கு உரிமையுள்ள image மட்டும் upload செய்து preserve செய்ய வேண்டியவற்றைச் சொல்லுங்கள். API-ல் current model ID, output size, pricing மற்றும் quota verify செய்யுங்கள்; `type: "image"`, `aspect_ratio`, `image_size` settings பயன்படுத்துங்கள். 429-க்கு limited backoff மற்றும் queue; 400/403-ஐ blind retry செய்ய வேண்டாம்.

Region, age, account மற்றும் model availability தனித்தனி eligibility. Real people, brands, copyrighted images மற்றும் uploaded photos-க்கு rights பாதுகாக்கவும். Final text-ஐ design tool-ல் typeset செய்வது நம்பகமானது.

## Further Reading

- [Image Generation API](/docs/api/images/)
