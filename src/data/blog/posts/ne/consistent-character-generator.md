---
title: धेरै AI तस्बिरमा एउटै पात्र कायम राख्ने चार-शट consistency विधि
description: पहिले अनुहार, hairstyle, शरीर, पोसाक र art style lock गर्नुहोस्, त्यसपछि neutral portrait, side/full-body, action र controlled scene का चार shots बाट consistency जाँच्नुहोस्।
date: 2026-07-28
category: इमेज जेनेरेसन
tags: [Character Consistency, Same Character, AI Image Generation, Character Reference, Character Sheet]
readTime: 10
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: agent.gpt88.cc Image Quality & Crop Guide
---

धेरै AI तस्बिरमा एउटै character बनाउन पहिलो सुन्दर परिणामको पछि नलाग्नुहोस्। कुन विशेषता बदलिए दर्शकले उसलाई अर्को व्यक्ति ठान्छन् भन्ने पहिले तय गर्नुहोस्। त्यसपछि बढ्दो कठिनाइका चार shots जाँच्नुहोस्: neutral portrait, side वा full-body, dynamic action र controlled scene।

## “उही character” को अर्थ

Face structure, hairstyle silhouette, body proportions, clothing/props र visual language अलग-अलग drift हुन सक्छन्। अनुहार मात्र मिल्नु पर्याप्त छैन; side profile को nose bridge, full-body को head-to-body ratio वा signature coat को रंग बदलिए character drift भएको हो। पहिले “must not change” र “may change” सूची लेख्नुहोस्।

## Reference images को भूमिका

सफा, neutral र समान प्रकाश भएको फोटो approved identity anchor बनाउनुहोस्। थप references ले missing angle मात्र पूरा गर्नुपर्छ: side view ले नाक र टाउकोको पछाडिको contour, full-body ले अनुपात र पोसाक, close-up ले सानो prop वा text देखाओस्। प्रत्येक image को role तोक्नुहोस्। विरोधाभासी references ले consistency बढाउनुको सट्टा face swap र detail shuffle गराउन सक्छन्। संवेदनशील व्यक्ति, unpublished IP वा client draft भए visibility, retention, training र commercial terms जाँच्नुहोस्।

## छोटो Character Lock Block

लामो adjective होइन, देख्न र जाँच्न मिल्ने facts लेख्नुहोस्: oval face, wide-set eyes, बायाँ brow नजिक mole, dark-brown chin-length bob, करिब 7.5 heads tall, dark-green cloak, brass buttons, brown mail bag र soft picture-book style। expression, pose, camera, background र weather बदलिन सक्छ भनेर अलग लेख्नुहोस्। mole हराउनु, bob लामो हुनु, cloak निलो हुनु, buttons square हुनु, bag अर्को तर्फ जानु वा output photoreal हुनु reject conditions हुन्।

## चार shots बाट consistency जाँच्नुहोस्

1. **Neutral portrait:** simple background र स्पष्ट प्रकाशमा face, hairline, color र accessories जाँच्नुहोस्।
2. **Side वा full-body:** project को आवश्यकताअनुसार छान्नुहोस्; silhouette, shoulder, waist, hem र prop position पनि हेर्नुहोस्।
3. **Dynamic action:** running, bending, sword swing वा turning जस्ता वास्तविक action प्रयोग गर्नुहोस्; occlusion र perspective ले कमजोर route देखाउँछन्।
4. **Controlled scene/style pressure:** एकपटकमा एउटा ठूलो variable बदल्नुहोस्। text, logo, seal वा badge भए final display size मा readability जाँच्नुहोस्।

## Four-Shot Acceptance Record

Anchor file, reference version, locked features, allowed changes, hardest shot र unified check size लेख्नुहोस्। प्रत्येक shot मा face, body, hairstyle, clothing/props र visual language को pass/fail तथा symptom राख्नुहोस्। Overall निर्णय `pass / fix / switch route` बनाउनुहोस्। Failed image लाई “side-profile nose bridge लामो भयो” जस्ता symptom नामले सुरक्षित गर्नुहोस्।

## Failure पछि एक minimal retry मात्र

एक retry मा एउटा ठूलो variable मात्र बदल्नुहोस्: side drift मा clearer side reference, body drift मा full-body reference, back-hair error मा back contour reference। Garment text वा badge लाई post-production typesetting मा राख्नुहोस्। दुई पात्रको frame अघि दुवैलाई छुट्टाछुट्टै चार shots मा pass गराउनुहोस्। एक retry पछि पनि उही dimension fail भए blind reroll रोक्नुहोस् र dedicated character feature, filtered training, split post-production वा manual retouching रोज्नुहोस्।

## References, character features र training routes

Plain prompt + reference सानो concept set का लागि ठीक छ, तर प्रत्येक generation ले identity फेरि interpret गर्न सक्छ। Dedicated character feature धेरै scene र pose मा उपयोगी हुन सक्छ, तर नामले परिणामको guarantee गर्दैन। Training route high-volume serial का लागि उपयोगी भए पनि data quality, cost, rights, privacy र baked-in errors को जोखिम हुन्छ। route सुन्दर portrait होइन, सबैभन्दा कठिन required shot का आधारमा छान्नुहोस्।

## FAQ

### Fixed seed ले सधैं उही character दिन्छ?

दिँदैन। Seed ले conditions दोहोर्याउन सक्छ, पूर्ण identity प्रमाणित गर्दैन।

### एउटा character sheet पर्याप्त हुन्छ?

हुँदैन। Side, full-body र action shots ले अलग failure देखाउन सक्छन्।

### LoRA सधैं reference image भन्दा स्थिर हुन्छ?

हुँदैन। Training material र configuration मा निर्भर हुन्छ।

### दुई पात्रमा face swap कसरी रोक्ने?

दुवैलाई अलग-अलग चार shots मा pass गराएर छुट्टाछुट्टै lock blocks राख्नुहोस्, त्यसपछि two-person composition जाँच्नुहोस्।

### Stills pass भए video पनि consistent हुन्छ?

जरुरी छैन। Motion र frame-to-frame identity का लागि छुट्टै test चाहिन्छ।

अन्तिम प्रश्न: project को सबैभन्दा कठिन shot पास भयो, कि frontal portrait मात्र सुन्दर देखियो?
