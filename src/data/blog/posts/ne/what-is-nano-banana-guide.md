---
title: Nano Banana के हो? Features, Pricing र Prompt Tips (2026 Guide)
description: Google Nano Banana, Gemini 2.5 Flash Image, Nano Banana Pro, free quota, pricing र practical prompt tips को पूर्ण guide।
date: 2026-01-09
category: Gemini专题
tags: [Nano Banana, Gemini, AI Image Generation, Google AI, Prompt Tips]
readTime: 12
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

## Nano Banana के हो?

Nano Banana Google DeepMind को Gemini परिवारको AI image generation र editing capability को codename हो। यो छुट्टै standalone model होइन; Gemini multimodal architecture भित्रको image module हो। त्यसैले यसले complex instructions, context र conversational iteration राम्रोसँग सम्हाल्छ।

| Version | Official Name | Release | Positioning |
| --- | --- | --- | --- |
| Nano Banana | Gemini 2.5 Flash Image | Aug 26, 2025 | छिटो, everyday use |
| Nano Banana Pro | Gemini 3 Pro Image Preview | Nov 20, 2025 | professional quality |

सरल रूपमा, Nano Banana Gemini को drawing capability हो। Chat जस्तै scene वर्णन गर्दा model ले image बनाउँछ वा edit गर्छ।

## History र 3D Figurine Trend

अगस्ट 2025 मा LMArena मा anonymous model ले consistent characters, complex scenes र realistic images बनाएर चर्चा पायो। अगस्ट 26 मा Google ले यसलाई Gemini 2.5 Flash Image भनेर पुष्टि गर्‍यो। नोभेम्बरमा Pro आयो, जसमा 2K/4K output, राम्रो text rendering, 14 reference images र Google Search grounding छन्। Viral 3D figurine वास्तवमा realistic 2D image हो; `.STL` वा `.OBJ` printable file का लागि अलग conversion चाहिन्छ।

## Core Features

- **Text-to-image:** scene, lighting र style natural language मा लेख्नुहोस्; keyword stacking नगर्नुहोस्।
- **Image editing:** elements थप्ने/हटाउने, style transfer र local adjustment गर्न सकिन्छ। Pro मा masked editing छ।
- **Multi-image composition:** धेरै reference लाई एउटै scene मा मिलाउन सकिन्छ; Pro ले 14 images र 5 characters सम्म consistency राख्छ।
- **Text rendering:** Pro ले long text, calligraphy र धेरै भाषाहरू राम्रोसँग render गर्छ।
- **Web Search grounding:** current weather, recipes वा sports scores जस्ता live data प्रयोग गर्न सकिन्छ।

## Free Quota र Pricing

Gemini App free users लाई 2 images/day, Google AI Studio लाई 500 requests/day र नयाँ Google Cloud users लाई $300/90 days credit उपलब्ध हुन सक्छ। Quota UTC midnight मा reset हुन्छ। Success, filtered request र technical failure ले पनि quota खर्च गर्न सक्छन्। Pro quota सकिएपछि plain Nano Banana मा fallback हुन सक्छ। API price: Gemini 2.5 Flash Image $0.039/image, Gemini 3 Pro Image 1K-2K $0.134 र 4K $0.24। Batch API ले 24-hour delay को बदलामा 50% discount दिन सक्छ।

GPT88 unified gateway बाट OpenAI-compatible वा native Google interface प्रयोग गर्न सकिन्छ। Current console मा model coverage, RMB pricing र failed-request billing verify गर्नुहोस्। API key source code मा नराख्नुहोस्।

## Prompt Tips

Natural language प्रयोग गर्नुहोस्: “an orange cat sitting on a neon-lit street...”। Background बदल्दा subject को lighting कायम राख्ने context दिनुहोस्। पहिले base image बनाउनुहोस् र धेरै rounds मा refine गर्नुहोस्। Multi-image composition मा महत्वपूर्ण reference पहिले राख्नुहोस्। Text का लागि exact words quotes मा, position, font र size लेख्नुहोस्। Consistency का लागि उही reference reuse गरी facial features identical राख्न भन्नुहोस्।

Blurry text का लागि Pro र explicit font size, warped face का लागि clear frontal reference, inconsistent style का लागि concrete style description र filtered content का लागि safety settings वा rephrasing प्रयोग गर्नुहोस्।

## FAQ

Nano Banana speed र 1024 output का लागि हो; Pro quality, 4K, राम्रो text र 14-image composition का लागि। Free Gemini App ले 2 images/day र AI Studio ले up to 500 requests/day दिन्छ। Images मा invisible SynthID watermark हुन्छ। Commercial use latest Google terms र content policies को अधीनमा हुन्छ। Chinese prompts राम्रो काम गर्छन्, तर complex instructions English मा अझ accurate हुन सक्छन्।

## Further Reading

- [Nano Banana Pro Multi-Reference Guide](/en/docs/blog/nano-banana-pro-multi-reference-guide/)
- [Nano Banana Pro Pricing & Quota Guide](/en/docs/blog/nano-banana-pro-pricing-quota-guide-2026/)
- [Google Image Generation API](/en/docs/api/images/)
