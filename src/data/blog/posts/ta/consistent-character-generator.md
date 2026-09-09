---
title: பல AI படங்களில் ஒரே கதாபாத்திரத்தைத் தொடர்ந்து வைத்திருக்கும் நான்கு-shot consistency முறை
description: முதலில் முகம், hairstyle, body type, உடை மற்றும் art style-ஐ lock செய்து, neutral portrait, side/full-body, action, controlled scene ஆகிய நான்கு shots மூலம் consistency-ஐச் சரிபார்க்கவும்.
date: 2026-07-28
category: பட உருவாக்கம்
tags: [Character Consistency, Same Character, AI Image Generation, Character Reference, Character Sheet]
readTime: 10
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: agent.gpt88.cc Image Quality & Crop Guide
---

ஒரே character-ஐக் கொண்ட பல AI படங்களை உருவாக்கும்போது முதலில் அழகான output-ஐத் தேட வேண்டாம். எந்த அம்சங்கள் மாறினால் பார்வையாளர் வேறு நபர் என்று நினைப்பார் என்பதை முதலில் தீர்மானிக்கவும். பின்னர் neutral portrait, side/full-body, dynamic action, controlled scene என்ற நான்கு shots-ல் சோதிக்கவும்.

## “அதே character” என்பதன் பொருள்

Face structure, hairstyle silhouette, body proportions, clothing/props, visual language ஆகியவை தனித்தனியாக drift ஆகலாம். முகம் மட்டும் பொருந்துவது போதாது; side profile nose bridge, full-body head-to-body ratio அல்லது signature coat நிறம் மாறினாலும் character மாறிவிட்டது. முதலில் “must not change” மற்றும் “may change” பட்டியலை எழுதுங்கள்.

## Reference images-ன் பங்கு

தெளிவான, neutral, evenly lit படத்தை approved identity anchor ஆகத் தேர்வு செய்யுங்கள். கூடுதல் references missing angles-ஐ மட்டும் நிரப்பட்டும்: side view மூக்கு மற்றும் தலைப்பின்புற contour-க்கு, full-body proportions மற்றும் உடைக்கு, close-up சிறிய prop அல்லது text-க்கு. ஒவ்வொரு படத்திற்கும் role கொடுக்கவும். முரண்படும் references consistency-ஐ அதிகரிக்காமல் face swap மற்றும் detail shuffle ஏற்படுத்தலாம். Sensitive person, unpublished IP அல்லது client draft என்றால் visibility, retention, training மற்றும் commercial terms சரிபார்க்கவும்.

## குறுகிய Character Lock Block

நீண்ட adjectives-க்கு பதிலாக பார்க்கவும் சரிபார்க்கவும் கூடிய facts எழுதுங்கள்: oval face, wide-set eyes, இடது brow அருகே mole, dark-brown chin-length bob, சுமார் 7.5 heads tall, dark-green cloak, brass buttons, brown mail bag, soft picture-book style. Expression, pose, camera, background, weather மாறலாம் என்று தனியாக எழுதுங்கள். Mole மறைதல், bob நீளமாதல், cloak நீலமாகுதல், buttons square ஆகுதல், bag மறுபக்கம் செல்வது அல்லது output photoreal ஆகுதல் ஆகியவற்றை reject conditions ஆகக் குறிப்பிடுங்கள்.

## நான்கு shots மூலம் consistency சோதனை

1. **Neutral portrait:** simple background மற்றும் தெளிவான ஒளியில் face, hairline, color, accessories பார்க்கவும்.
2. **Side அல்லது full-body:** project தேவைக்கேற்ப தேர்வு செய்து silhouette, shoulder, waist, hem, prop position பார்க்கவும்.
3. **Dynamic action:** running, bending, sword swing, turning போன்ற உண்மையான action பயன்படுத்தவும்; occlusion மற்றும் perspective முக்கிய அழுத்தங்கள்.
4. **Controlled scene/style pressure:** ஒரே நேரத்தில் ஒரு பெரிய variable மட்டும் மாற்றவும். Text, logo, seal, badge இருந்தால் final display size-ல் வாசிக்கப்படுகிறதா பார்க்கவும்.

## Four-Shot Acceptance Record

Anchor file, reference version, locked features, allowed changes, hardest shot மற்றும் unified check size ஆகியவற்றைப் பதிவு செய்யுங்கள். ஒவ்வொரு shot-க்கும் face, body, hairstyle, clothing/props, visual language ஆகியவற்றை pass/fail மற்றும் symptom-உடன் எழுதுங்கள். Overall முடிவு `pass / fix / switch route` ஆக இருக்கட்டும். Failed images-ஐ “side-profile nose bridge நீண்டது” போன்ற symptom பெயரில் சேமிக்கவும்.

## Failure பிறகு ஒரு minimal retry மட்டும்

ஒரே retry-ல் ஒரு பெரிய variable மட்டும் மாற்றுங்கள்: side drift-க்கு clearer side reference, body drift-க்கு full-body reference, back-hair error-க்கு back contour reference. Garment text அல்லது badge-ஐ post-production typesetting-க்கு விடுங்கள். இரண்டு characters உள்ள frame-க்கு முன் இருவரையும் தனித்தனியாக நான்கு shots-ல் pass செய்யுங்கள். ஒரு retry-க்குப் பிறகும் அதே dimension தோல்வியடைந்தால் blind reroll நிறுத்தி dedicated character feature, filtered training, split post-production அல்லது manual retouching தேர்வு செய்யுங்கள்.

## References, character features, training routes

Plain prompt + reference சிறிய concept set-க்கு பொருத்தமானது, ஆனால் ஒவ்வொரு generation-மும் identity-ஐ மறுபரிசீலிக்கலாம். Dedicated character feature பல scenes/poses-க்கு உதவும்; பெயர் மட்டும் முடிவுக்கான உத்தரவாதமல்ல. Training route high-volume serials-க்கு உதவலாம், ஆனால் data quality, cost, rights, privacy, baked-in errors அபாயம் உண்டு. அழகான portrait அல்ல, மிகக் கடினமான required shot அடிப்படையில் route தேர்வு செய்யுங்கள்.

## FAQ

### Fixed seed எப்போதும் அதே character-ஐ தருமா?

இல்லை. Conditions-ஐ மீண்டும் உருவாக்கலாம்; முழு identity-ஐ நிரூபிக்காது.

### ஒரு character sheet போதுமா?

இல்லை. Side, full-body, action shots வேறு failure-களை காட்டலாம்.

### LoRA எப்போதும் reference image-ஐவிட நிலையானதா?

இல்லை. Training material மற்றும் configuration மீது சார்ந்தது.

### இரண்டு characters-ல் face swap-ஐத் தடுப்பது எப்படி?

இருவரையும் தனித்தனியாக நான்கு shots-ல் pass செய்து, தனித்த lock blocks வைத்துப் பின்னர் two-person composition சோதிக்கவும்.

### Stills pass ஆனால் video-வும் consistent ஆகுமா?

அவசியமில்லை. Motion மற்றும் frame-to-frame identity-க்கு தனி acceptance test தேவை.

இறுதி கேள்வி: project-ன் மிகக் கடினமான shot pass ஆனதா, அல்லது frontal portrait மட்டும் அழகாக உள்ளதா?
