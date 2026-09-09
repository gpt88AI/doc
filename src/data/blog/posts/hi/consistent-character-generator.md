---
title: कई AI तस्वीरों में एक ही कैरेक्टर बनाए रखने की चार-शॉट consistency विधि
description: पहले चेहरे, हेयरस्टाइल, शरीर, कपड़े और art style को lock करें, फिर neutral portrait, side/full-body, action और controlled scene के चार shots से consistency जाँचें।
date: 2026-07-28
category: इमेज जनरेशन
tags: [Character Consistency, Same Character, AI Image Generation, Character Reference, Character Sheet]
readTime: 10
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: agent.gpt88.cc Image Quality & Crop Guide
---

एक ही character की कई AI तस्वीरें बनाने के लिए सबसे सुंदर पहला परिणाम खोजने के बजाय पहले तय करें कि कौन-सी विशेषताएँ बदलने पर दर्शक उसे अलग व्यक्ति समझेंगे। फिर बढ़ती कठिनाई वाले चार shots में वही पहचान जाँचें: neutral portrait, side या full-body, dynamic action और controlled scene।

## “वही character” का अर्थ पहले तय करें

कम-से-कम पाँच चीज़ें अलग-अलग drift कर सकती हैं: face structure, hairstyle silhouette, body proportions, clothing/props और visual language। केवल चेहरा समान होना पर्याप्त नहीं है। side profile में nose bridge, full-body में head-to-body ratio या signature coat का रंग बदल जाए तो character बदल चुका है। “must not change” और “may change” की सूची पहले लिखें।

## Reference images की भूमिका तय करें

एक साफ़, neutral, evenly lit image को approved identity anchor बनाइए। अतिरिक्त references केवल missing angles भरें: side view नाक और सिर के पीछे का contour दिखाए, full-body अनुपात और कपड़े दिखाए, close-up छोटे props या text दिखाए। हर image को role दें। आपस में conflict करती references जोड़ने से consistency बढ़ने के बजाय face swap और detail shuffle हो सकता है। संवेदनशील व्यक्ति, unpublished IP या client draft के लिए visibility, retention, training और commercial terms पहले जाँचें।

## छोटा Character Lock Block लिखें

लंबे adjectives के बजाय दृश्य और जाँचने योग्य facts लिखें। उदाहरण: oval face, wide-set eyes, left brow के पास mole; dark-brown chin-length bob; लगभग 7.5 heads tall; dark-green cloak, brass buttons, brown mail bag; soft picture-book style। फिर अलग से लिखें कि expression, pose, camera, background और weather बदल सकते हैं। Reject conditions भी लिखें: mole गायब, bob लंबा, cloak नीला, buttons square, bag दूसरी ओर या output photoreal हो जाए। यह memory की guarantee नहीं, साझा acceptance boundary है।

## चार shots से consistency जाँचें

1. **Neutral portrait:** simple background और clear light में face, hairline, color और accessories जाँचें। यह fail हो तो action पर न जाएँ।
2. **Side या full-body:** project की जरूरत चुनें। silhouette, shoulders, waist, hem और prop position भी देखें, केवल face नहीं।
3. **Dynamic action:** running, bending, sword swing या turning जैसे वास्तविक actions लें। occlusion और perspective body तथा outfit को दबाव में डालते हैं।
4. **Controlled scene/style pressure:** केवल एक बड़ा variable बदलें, जैसे day/night या indoor/outdoor। text, logo, seal या badge हो तो final display size पर readability जाँचें।

## Four-Shot Acceptance Record रखें

हर project में anchor file, reference version, locked features, allowed changes, hardest required shot और unified check size लिखें। हर shot के लिए face, body, hairstyle, clothing/props और visual language को pass/fail तथा symptom के साथ दर्ज करें। overall निर्णय `pass / fix / switch route` रखें और failed images को symptom के नाम से बचाएँ, जैसे “side-profile nose bridge लंबा”।

## Failure के बाद केवल एक minimal retry

एक retry में एक ही बड़ा variable बदलें: side drift पर clearer side reference, body drift पर full-body reference, back-hair error पर केवल back contour reference। garment text या badge के लिए पहले बिना text frame बनाएँ और deterministic typesetting को post-production में रखें। दो लोगों के scene में पहले दोनों characters को अलग-अलग चार shots पास कराएँ। एक retry के बाद भी वही dimension fail हो तो blind reroll बंद करें। dedicated character feature, filtered training route, split post-production या manual retouching चुनें।

## References, character features और training routes

Plain prompt + reference छोटे concept set के लिए ठीक है, पर हर generation identity को reinterpret कर सकती है। Dedicated character reference अधिक scenes और poses के लिए उपयोगी हो सकती है, लेकिन feature name परिणाम की guarantee नहीं है। Training route high-volume serials में मदद कर सकता है, पर data quality, cost, rights, privacy और baked-in errors का जोखिम रखता है। route का निर्णय सबसे कठिन required shot से करें, सबसे सुंदर portrait से नहीं।

## आम गलत धारणाएँ

### क्या fixed seed हमेशा वही character देगा?

नहीं। seed conditions दोहरा सकता है, पर face, शरीर, कपड़े और props की पूर्ण पहचान सिद्ध नहीं करता।

### क्या एक character sheet पर्याप्त है?

नहीं। sheet उपयोगी anchor है, लेकिन side, full-body और action shots में अलग failure सामने आ सकते हैं।

### क्या LoRA हमेशा reference image से स्थिर है?

नहीं। training material, configuration और maintenance quality पर निर्भर करती है।

### दो characters में face swap कैसे रोकें?

दोनों को अलग-अलग चार shots में पास कराएँ, distinct lock blocks रखें, फिर two-person composition जाँचें।

### Stills पास हों तो video भी consistent होगा?

ज़रूरी नहीं। motion, frame-to-frame identity और occlusion के लिए अलग acceptance test चाहिए।

अंतिम प्रश्न हमेशा यही रखें: project का सबसे कठिन shot पास हुआ या केवल frontal portrait सुंदर दिख रहा है?
