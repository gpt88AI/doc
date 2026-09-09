---
title: வடிவமைப்பை மாற்றாமல் AI படத்தின் தவறான உரையை மாற்றுவது எப்படி
description: தவறான உரைக்காக prompt மூலம் முழுப் படத்தையும் மீண்டும் உருவாக்க வேண்டாம். முதலில் source file, பின்னர் editable text layer, இறுதியில் கட்டுப்படுத்தப்பட்ட AI edit பயன்படுத்தவும்.
date: 2026-07-27
category: பட உருவாக்கம்
tags: [AI பட உரை, படத் திருத்தம், வடிவமைப்பு]
readTime: 9
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: Agent படத் தரம் மற்றும் crop வழிகாட்டி
---

AI poster, product card அல்லது cover அழகாக இருந்தாலும் அதிலுள்ள சொற்கள் தவறாக இருக்கலாம். “உரையை மட்டும் மாற்றி, மற்ற அனைத்தையும் அப்படியே வைக்கவும்” என்ற prompt கூட முழுப் படத்தை மீண்டும் உருவாக்கச் செய்யலாம்; முகம், ஒளி, texture மற்றும் காலியிடம் மாறலாம்.

## முதலில் பாதையைத் தேர்வு செய்யுங்கள்

பாதுகாப்பான வரிசை: **source file-ஐத் தேடுங்கள்; இல்லையெனில் editable text layer உருவாக்குங்கள்; பழைய உரையை அழித்து உண்மையான font-ல் layout செய்யுங்கள்; குறைந்த ஆபத்துள்ள decorative text-க்கு மட்டும் local AI edit முயற்சிக்கவும்.** பெயர், விலை, தேதி மற்றும் unit-ஐ வார்த்தை வார்த்தையாகச் சரிபார்க்கவும்.

| நிலை | சிறந்த வழி |
| --- | --- |
| Figma, Canva, PSD அல்லது PPT உள்ளது | உண்மையான text layer-ஐ மாற்றி export செய்யவும் |
| source இல்லை, ஆனால் poster ஒழுங்காக உள்ளது | OCR மற்றும் layout-ஐ editable layers-ஆக மீண்டும் உருவாக்கவும் |
| background எளிமையானது | mask மூலம் பழைய உரையை நீக்கி புதிய உரையை இடவும் |
| சிறிய decorative text | மிகச் சிறிய mask உடன் AI edit சோதிக்கவும் |

“வடிவமைப்பை மாற்றாதே” என்பது மந்திர prompt அல்ல. canvas size, crop, subject, texture, நிறம், font, size, spacing, line-height, shadow மற்றும் perspective அனைத்தும் சரிபார்க்கப்பட வேண்டும்.

## Source file இருந்தால் அதையே பயன்படுத்தவும்

மூல Figma, Canva, Photoshop, Illustrator அல்லது PowerPoint file-ஐத் திறக்கவும். font மற்றும் license-ஐ உறுதிசெய்து copy-ஐ மட்டும் மாற்றவும். புதிய உரை நீளமாக இருந்தால் font-ஐ மட்டும் சுருக்க வேண்டாம்; line break, spacing மற்றும் safe margin-ஐயும் சரிபார்க்கவும். பழைய மற்றும் புதிய export-ஐ overlay செய்து, உரை தவிர வேறு pixels மாறவில்லையா என்று பாருங்கள்.

## Source இல்லாதபோது

மிகத் தெளிவான படத்தை upload செய்து OCR-ஐ கண்மூடித்தனமாக நம்ப வேண்டாம். உரை, font weight, size, alignment, spacing, color மற்றும் line-height-ஐச் சரிபார்க்கவும். முதலில் ஒரு முக்கிய line-ஐ மாற்றி சிறிய export எடுக்கவும். OCR எழுத்துகளைப் பிரித்தால் அல்லது decorative text-ஐ background எனக் கருதினால் manual rebuild செய்யவும்.

## AI local edit எப்போது

Low-risk decorative text அல்லது draft-க்கு மட்டும் பயன்படுத்தவும். ஒரு பகுதியைத் தேர்ந்தெடுத்து, “தேர்ந்தெடுத்த பகுதியில் உள்ள பழைய உரையை ‘Summer Market’ ஆக மாற்றவும்; canvas, crop, subject, background, lighting மற்றும் மற்ற உரைகளை மாற்ற வேண்டாம்” என்று எழுதவும். இரண்டு முயற்சிகளில் non-target மாற்றம் ஏற்பட்டால் text layer அல்லது manual layout-க்கு திரும்பவும்.

## ஐந்து நிமிட சரிபார்ப்பு

1. பெயர், விலை, தேதி, phone, unit மற்றும் punctuation-ஐ வாசிக்கவும்.
2. மூல resolution-ல் edge, ghosting மற்றும் வளைந்த strokes-ஐப் பார்க்கவும்.
3. உண்மையான web, social அல்லது print size-ல் readability சோதிக்கவும்.
4. Overlay செய்து தேவையற்ற movement உள்ளதா பார்க்கவும்.
5. Original, editable file மற்றும் final export-ஐ தனித்தனியாக வைத்திருக்கவும்.

அடையாள அட்டை, contract, invoice, medical அல்லது financial record, private customer asset, evidence screenshot ஆகியவற்றை அறியாத public tool-ல் upload செய்ய வேண்டாம். முக்கியமான உரைக்கு உண்மையான text layer தான் நம்பகமானது; AI background repair மற்றும் draft-க்கு ஏற்றது, final proof-க்கு அல்ல.
