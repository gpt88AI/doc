---
title: डिजाइन नबदली AI तस्बिरको गलत लेखाइ कसरी सच्याउने
description: गलत लेखाइका लागि prompt बाट पूरै तस्बिर फेरि नबनाउनुहोस्। पहिले source file, त्यसपछि editable text layer, र अन्त्यमा सीमित AI edit प्रयोग गर्नुहोस्।
date: 2026-07-27
category: तस्बिर निर्माण
tags: [AI तस्बिर लेखाइ, तस्बिर सम्पादन, डिजाइन]
readTime: 9
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: Agent तस्बिर गुणस्तर र crop guide
---

AI poster, product card वा cover राम्रो देखिए पनि लेखाइ गलत हुन सक्छ। “लेखाइ मात्र बदल, अरू सबै उस्तै राख” भन्ने prompt ले पनि पूरै तस्बिर फेरि बनाउन सक्छ; व्यक्ति, प्रकाश, texture र खाली ठाउँ सर्न सक्छ।

## पहिले सही बाटो छान्नुहोस्

सुरक्षित क्रम यस्तो हो: **पहिले source file खोज्नुहोस्; नभए editable text layer बनाउनुहोस्; पुरानो लेखाइ हटाएर वास्तविक font मा layout गर्नुहोस्; कम जोखिमको decorative text मा मात्र local AI edit प्रयोग गर्नुहोस्।** नाम, मूल्य, मिति र unit शब्दशः जाँच गर्नुहोस्।

| अवस्था | राम्रो बाटो |
| --- | --- |
| Figma, Canva, PSD वा PPT छ | वास्तविक text layer बदलेर export गर्नुहोस् |
| source छैन तर poster व्यवस्थित छ | OCR र layout लाई editable layers मा पुनर्निर्माण गर्नुहोस् |
| background सरल छ | mask ले पुरानो लेखाइ हटाएर नयाँ text राख्नुहोस् |
| सानो decorative text हो | सानो mask सहित AI edit परीक्षण गर्नुहोस् |

“डिजाइन नबदल” कुनै जादुई prompt होइन। canvas size, crop, subject, texture, रंग, font, size, spacing, line-height, shadow र perspective सबै जाँच्नुपर्छ।

## Source file भए त्यही प्रयोग गर्नुहोस्

मूल Figma, Canva, Photoshop, Illustrator वा PowerPoint file खोल्नुहोस्। font र license जाँचेर copy मात्र बदल्नुहोस्। नयाँ लेखाइ लामो भए font मात्र सानो नबनाउनुहोस्; line break, spacing र safe margin पनि हेर्नुहोस्। पुरानो र नयाँ export overlay गरेर लेखाइबाहेकका pixels नबदलेको पुष्टि गर्नुहोस्।

## Source नभए editable layer बनाउनुहोस्

सबैभन्दा स्पष्ट image upload गर्नुहोस् र OCR लाई स्वतः सही नमान्नुहोस्। लेखाइ, font weight, size, alignment, spacing, color र line-height जाँच्नुहोस्। पहिले एउटा महत्त्वपूर्ण line बदलेर सानो export लिनुहोस्। OCR ले अक्षर फुटाए वा decorative text लाई background माने manual rebuild गर्नुहोस्।

## AI local edit कहिले गर्ने

यो low-risk decorative text वा draft का लागि मात्र उपयुक्त छ। एक पटकमा एउटा क्षेत्र छानेर लेख्नुहोस्: “छानिएको क्षेत्रमा पुरानो text लाई ‘Summer Market’ बनाउनुहोस्; canvas, crop, subject, background, lighting र अरू text नबदल्नुहोस्।” दुई प्रयासमा non-target परिवर्तन भए मूल image मा फर्केर text layer वा manual layout प्रयोग गर्नुहोस्।

## पाँच मिनेटको जाँच सूची

1. नाम, मूल्य, मिति, फोन, unit र punctuation शब्दशः पढ्नुहोस्।
2. मूल resolution मा edge, ghosting र बिग्रेका strokes हेर्नुहोस्।
3. वास्तविक web, social वा print size मा readability जाँच्नुहोस्।
4. Overlay गरेर अनावश्यक movement पत्ता लगाउनुहोस्।
5. original, editable file र final export अलग राख्नुहोस्।

ID card, contract, invoice, medical वा financial record, private customer asset र evidence screenshot अज्ञात public tool मा upload नगर्नुहोस्। महत्त्वपूर्ण text का लागि वास्तविक text layer भरपर्दो हुन्छ; AI background repair र draft का लागि राम्रो हो, final proof का लागि होइन।
