---
title: AI தயாரிப்பு படங்களில் ஒரே தயாரிப்பைத் தொடர்ந்து சரியாக வைத்திருக்கும் QC முறை
description: முதலில் உண்மையான SKU-வை lock செய்து, பின்னர் scene-ஐ மட்டும் மாற்றுங்கள். reference package, lock/allow-change matrix, six-frame stress test மற்றும் per-image QC மூலம் வடிவம், நிறம், text மற்றும் variant பிழைகளை குறைக்கலாம்.
date: 2026-07-28
category: பட உருவாக்கம்
tags: [AI Product Photos, Product Consistency, Ecommerce Photography, Reference Images, Product Image QC]
readTime: 12
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: Agent Image Quality & Crop Guide
---

பல AI product photos-ல் ஒரே தயாரிப்பைத் தொடர்ந்து வைத்திருக்க, prompt-ஐ மீண்டும் மீண்டும் மாற்றுவது முதல் படி அல்ல. உண்மையான SKU-க்கான reference package-ஐ உருவாக்குங்கள். “மாறக்கூடாது” மற்றும் “மாறலாம்” என்று இரண்டு பட்டியல்கள் எழுதுங்கள். ஒவ்வொரு படத்தையும் உண்மையான புகைப்படத்துடன் ஒப்பிடுங்கள். வடிவம், parts, packaging text, Logo, நிறம் அல்லது specification தவறு aesthetic பிரச்சினை அல்ல; அது product-fact பிழை.

நடைமுறை வரிசை: உரிமையுள்ள தற்போதைய புகைப்படங்களால் ground truth உருவாக்குங்கள்; product identity-ஐ lock செய்யுங்கள்; scene, props, lighting, crop மட்டும் மாற்றுங்கள்; முதலில் six-frame stress test செய்யுங்கள்; பின்னர் ஒரே QC table-ல் ஒவ்வொரு படத்தையும் மதிப்பிடுங்கள். Reference images உதவும், ஆனால் auto-replication உத்தரவாதம் அல்ல. fixed prompt அல்லது seed SKU துல்லியத்தை நிரூபிக்காது.

## Product identity மற்றும் visual style-ஐ பிரிக்கவும்

| பகுதி | Lock செய்ய வேண்டியது | மாறக்கூடியது | பொதுவான பிழை |
| --- | --- | --- | --- |
| Product identity | silhouette, parts, label, color, material, variant | உண்மையான data ஆதரிக்கும் angle | cap/port மாற்றம், தவறான நிறம் அல்லது capacity |
| Visual style | campaign-ன் மொத்த திசை | background, props, light, composition | shadow மற்றும் product scale ஒத்தாமை |

Style ஒரே மாதிரியாக இருந்தாலும் set தவறான தயாரிப்பைக் காட்டலாம். முதலில் தயாரிப்பு உண்மையானதா என்பதைச் சரிபார்த்து, பிறகு அழகையும் campaign cohesion-ஐயும் பாருங்கள்.

## உண்மையான reference package உருவாக்குங்கள்

ஒவ்வொரு SKU-க்கும் தெளிவான hero image, side/back/top/bottom angles, Logo மற்றும் label close-ups, SKU fact card, channel delivery table ஆகியவற்றைச் சேர்க்கவும். Front photo front பகுதியை மட்டும் நிரூபிக்கும்; back அல்லது open state பற்றிய data இல்லையெனில் AI ஊகிக்கும். பழைய packaging, வேறு நிறம்/capacity, bundle மற்றும் single item-களைப் பிரிக்கவும். தெரியாத மூலமுள்ள அல்லது உரிமையில்லாத assets-ஐ நீக்கவும்.

## Lock / Allow-change matrix எழுதுங்கள்

உதாரணமாக frosted-white 50 mL serum bottle-ல் silhouette, silver pump, clear cap, label, color, material, 50 mL specification lock ஆக வேண்டும். background, props, lighting, frame crop மாறலாம். Acceptance method-ஐயும் எழுதுங்கள்: same-angle photo-வுடன் silhouette overlay, parts எண்ணிக்கை, label-ஐ எழுத்து எழுத்தாகப் படித்தல், material reflection ஒப்பீடு.

## ஒரு universal prompt-க்கு பதிலாக modular prompt

Prompt-ஐ product lock, allowed changes, scene task, camera/lighting, forbidden changes, acceptance conditions என்று பிரிக்கவும். உண்மையான reference-இன் silhouette, pump, cap, label, material, 50 mL ஆகியவற்றை மாற்றாமல் வைத்து, background, surface, props, light, crop மட்டும் மாற்றுங்கள். புதிய part, text, color, material அல்லது reference-ல் தெரியாத back structure உருவாக்க வேண்டாம். இது வெற்றிக்கான உத்தரவாதம் அல்ல; failure-ஐ debug செய்ய உதவும்.

## GPT88-ல் முதலில் சிறிய controlled test

ஒரு current SKU, தேவையான angles மற்றும் modular prompt கொண்டு சில candidates உருவாக்குங்கள். உண்மையான புகைப்படத்துடன் side-by-side ஒப்பிட்டு pass, hard error, local fix, uncertain items ஆகியவற்றை எழுதுங்கள். Hard product errors இருந்தால் முழு batch-ஐ தொடங்க வேண்டாம். Background மட்டும் மாற்ற வேண்டுமெனில் real product pixels காக்கும் local editing route-ஐ முன்னுரிமை கொடுக்கவும்.

## ஆறு-frame stress test

Clean hero, same-angle scene, label close crop, high-contrast scene, mobile tight crop, ad whitespace version ஆகிய ஆறு frames-ஐ முயற்சிக்கவும். இவை silhouette, parts, text, material, crop safety, decoration drift ஆகியவற்றை வெளிப்படுத்தும். உண்மையான reference இல்லாத angle-ஐ AI-யால் ஊகிக்க விடாதீர்கள்; reshoot அல்லது trusted 3D asset பயன்படுத்துங்கள்.

## Per-image QC: முதலில் hard errors

| சோதனை | Pass condition |
| --- | --- |
| Geometry | silhouette மற்றும் proportions reference-ுடன் பொருந்த வேண்டும் |
| Parts | count, position, connections சரியாக இருக்க வேண்டும் |
| Text/Logo | ஒவ்வொரு எழுத்தும் unit-மும் படிக்கக்கூடியதாக இருக்க வேண்டும் |
| Variant | color, capacity, bundle சரியான SKU-வாக இருக்க வேண்டும் |
| Material | metal, glass, frost, transparency உண்மையாகத் தோன்ற வேண்டும் |
| Context | props/கை/இடத்துடன் scale நியாயமாக இருக்க வேண்டும் |
| Export | channel ratio, crop, mobile clarity சரியாக இருக்க வேண்டும் |

கலப்பு மொழி packaging-ல் numbers, units, `0/O`, `1/I` மற்றும் regulatory text-ஐ மனிதர் மூலம் படிக்கச் செய்யுங்கள். OCR சந்தேகமான இடங்களை மட்டும் காட்டும்; human review-க்கு மாற்றல்ல.

## முடிவை Pass / Fix / Change Route என எழுதுங்கள்

**Pass**: product facts உண்மையான reference-ுடன் பொருந்தும், channel export சரியாக இருக்கும். **Fix**: crop, background, shadow, whitespace போன்ற உள்ளூர் மற்றும் சரிபார்க்கக்கூடிய பிழைகளை மட்டும் சரிசெய்யுங்கள்; product identity-ஐ மறுபடியும் உருவாக்க வேண்டாம். **Change Route**: angle data இல்லாமை, text தொடர்ந்து கெடுதல் அல்லது geometry drift இருந்தால் real pixels, compositing, 3D அல்லது professional retouching தேர்வு செய்யுங்கள்.

## FAQ

### ஒரே prompt மற்றும் seed product-ஐ நிலையாக வைத்திருக்குமா?

இல்லை. அவை generation conditions-ஐ மீண்டும் உருவாக்கலாம்; shape, label, material அல்லது parts துல்லியத்தை நிரூபிக்காது.

### ஒரு front photo-வில் இருந்து back மற்றும் sides உருவாக்கலாமா?

நம்பகமான product evidence ஆகாது. Missing angle-களை reshoot அல்லது trusted 3D மூலம் வழங்குங்கள்.

### Style consistency என்பது product consistency தானா?

இல்லை. ஒரே background இருந்தாலும் SKU தவறாக இருக்கலாம்.

### Packaging text தவறாக வந்தால் தொடர்ந்து regenerate செய்யலாமா?

இல்லை. readable text தேவைப்பட்டால் real label pixels, compositing அல்லது retouching route பயன்படுத்துங்கள்.

### ஆறு frames pass ஆனால் batch தொடங்கலாமா?

இது diagnostic gate மட்டுமே; guarantee அல்ல. channel rules மற்றும் per-image QC தொடர்ந்து தேவை.
