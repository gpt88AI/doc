---
title: AI प्रोडक्ट फ़ोटो में एक ही उत्पाद को लगातार सही रखने की QC विधि
description: पहले वास्तविक SKU को लॉक करें और केवल दृश्य बदलें। reference package, lock/allow-change matrix, six-frame stress test और per-image QC से गलत आकार, रंग, टेक्स्ट और variants घटाएँ।
date: 2026-07-28
category: इमेज जनरेशन
tags: [AI Product Photos, Product Consistency, Ecommerce Photography, Reference Images, Product Image QC]
readTime: 12
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: Agent Image Quality & Crop Guide
---

कई AI product photos में एक ही उत्पाद बनाए रखने का पहला कदम prompt को बार-बार बदलना नहीं, बल्कि वास्तविक SKU का reference package बनाना है। दो सूचियाँ लिखें: “कभी न बदले” और “बदल सकता है”। हर परिणाम को वास्तविक फ़ोटो से मिलाएँ। आकार, भाग, पैकेजिंग टेक्स्ट, Logo, रंग या specification की गलती aesthetic समस्या नहीं, product-fact समस्या है।

व्यावहारिक क्रम यह है: अधिकारयुक्त और वर्तमान फ़ोटो से ground truth बनाएँ; उत्पाद की पहचान लॉक करें; केवल scene, props, light और crop बदलें; पहले छह-फ़्रेम stress test चलाएँ; फिर हर फ़ोटो पर एक ही QC तालिका लगाएँ। संदर्भ फ़ोटो मॉडल को संकेत देती हैं, पर वे auto-replication की गारंटी नहीं हैं। fixed prompt या seed भी वास्तविक SKU की शुद्धता सिद्ध नहीं करते।

## Product identity और visual style को अलग रखें

| आयाम | लॉक रहने वाली चीज़ | बदल सकने वाली चीज़ | सामान्य गलती |
| --- | --- | --- | --- |
| Product identity | silhouette, parts, label, color, material, variant | angle, केवल जहाँ वास्तविक data हो | cap/port बदलना, गलत रंग या capacity |
| Visual style | brand campaign की समग्र दिशा | background, props, light, composition | हर फ़ोटो में अलग shadow या product scale |

एक set style में consistent हो सकता है, फिर भी गलत उत्पाद दिखा सकता है। पहले उत्पाद को वास्तविक रखें, फिर सुंदरता और campaign cohesion जाँचें।

## वास्तविक reference package बनाएँ

हर SKU के लिए कम से कम ये रखें: साफ़ hero image, side/back/top/bottom angles, Logo और labels के close-ups, SKU fact card, और channel delivery table। एक front photo केवल front को सिद्ध करती है; back या खुली अवस्था के लिए data न हो तो मॉडल अनुमान लगाएगा।

पुरानी packaging, दूसरे रंग, अलग capacity और bundle को अलग करें। अज्ञात स्रोत या अधिकारहीन assets हटाएँ और हर image पर लिखें कि वह क्या सिद्ध कर सकती है। confidential या regulated product को test के लिए upload करने से पहले data-processing और rights terms जाँचें।

## Lock / Allow-change matrix लिखें

उदाहरण के लिए frosted-white 50 mL serum bottle में silhouette, silver pump, clear cap, label, color, material और 50 mL specification लॉक हों। background, props, lighting और frame crop बदल सकते हैं। Acceptance method भी लिखें: same-angle photo से silhouette overlay, parts की गिनती, label को अक्षर-दर-अक्षर पढ़ना और material reflections की तुलना। इससे product owner, design और operations की जिम्मेदारी स्पष्ट रहती है।

## एक universal prompt के बजाय modular prompt

Prompt को अलग blocks में रखें: product lock, allowed changes, scene task, camera/lighting, forbidden changes और acceptance conditions। उदाहरण: वास्तविक reference के अनुसार bottle silhouette, pump, cap, label, material और 50 mL बनाए रखें; केवल background, surface, props, light और crop बदलें; नया part, text, color, material या अनदेखा back structure न गढ़ें। यह सफलता की guarantee नहीं, पर failure को debug करने योग्य बनाता है।

## GPT88 में पहले छोटा controlled test

एक current SKU, आवश्यक reference angles और modular prompt से कुछ candidates बनाएँ। प्रत्येक को वास्तविक फ़ोटो के साथ side-by-side देखें और pass, hard error, local fix तथा uncertain items लिखें। hard product errors रहते हुए पूरी batch शुरू न करें। केवल background हटाना हो और product pixels बच सकते हों, तो full regeneration के बजाय local editing route चुनें।

## छह-फ़्रेम stress test

छह diagnostic frames लें: clean hero, same-angle scene, label close crop, high-contrast scene, mobile tight crop और ad whitespace version। इनसे silhouette, parts, text, material, crop safety और decoration drift सामने आते हैं। किसी angle की वास्तविक reference न हो तो उसे AI से अनुमानित न कराएँ; reshoot या trusted 3D asset बनाएँ।

## हर image की QC: पहले hard errors

| जाँच | Pass condition |
| --- | --- |
| Geometry | silhouette और proportions reference से मिलें |
| Parts | count, position और connections सही हों |
| Text/Logo | हर अक्षर और unit पढ़ने योग्य हो |
| Variant | color, capacity और bundle सही SKU के हों |
| Material | metal, glass, frost और transparency वास्तविक लगें |
| Context | props और हाथ/स्थान के साथ scale plausible हो |
| Export | channel का ratio, crop और mobile clarity सही हो |

चीनी/अंग्रेज़ी मिश्रित packaging में numbers, units, `0/O`, `1/I`, Simplified/Traditional characters और regulatory text को manually पढ़ें। OCR केवल suspicious जगहें खोज सकता है; human review का विकल्प नहीं है।

## निर्णय को Pass / Fix / Change Route में लिखें

**Pass** तब जब product facts real reference से मिलें, बदलाव scene के अनुरूप हों, recognition points न ढकें और channel export पास हो। **Fix** केवल स्थानीय, सत्यापन योग्य समस्या पर करें, जैसे crop, background, shadow या whitespace; product identity को फिर से न गढ़ें। **Change Route** तब चुनें जब angle data missing हो, text बार-बार बिगड़े, geometry drift करे या वास्तविक pixel preservation, compositing, 3D या retouching अधिक भरोसेमंद हो।

## FAQ

### क्या वही prompt और seed product को स्थिर रखेंगे?

नहीं। वे conditions दोहरा सकते हैं, पर shape, label, material और parts की शुद्धता सिद्ध नहीं करते।

### क्या एक front photo से back और sides बनाए जा सकते हैं?

विश्वसनीय product evidence के रूप में नहीं। जिन angles का data नहीं है, उन्हें reshoot या trusted 3D से दें।

### क्या style consistency product consistency के बराबर है?

नहीं। समान background और lighting के बावजूद SKU गलत हो सकता है।

### Packaging text बिगड़े तो regenerate करते रहें?

नहीं। readable text अनिवार्य हो तो real label pixels, compositing या retouching route अपनाएँ।

### छह frames पास हों तो batch शुरू कर दें?

यह छोटा diagnostic gate है, guarantee नहीं। batch के channel rules और per-image QC फिर भी लागू होंगे।
