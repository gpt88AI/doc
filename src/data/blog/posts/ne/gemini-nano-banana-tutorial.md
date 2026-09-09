---
title: Gemini App Nano Banana Tutorial: Beginner देखि Expert Guide
description: Gemini app मा Nano Banana image generation को पूर्ण guide — base र Pro, login, UI, six-element prompt framework, templates, editing, errors र API integration।
date: 2026-01-09
category: प्राविधिक ट्युटोरियल
tags: [Nano Banana, Gemini, AI Image Generation, Prompt Templates, Image Generation Tutorial]
readTime: 16
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Gemini app मा “draw me a cyberpunk cat” लेख्दा केही seconds मा image बन्छ। राम्रो परिणामका लागि model, prompt, reference image र iteration बुझ्नुहोस्।

## Nano Banana र Pro

Base Nano Banana Gemini 2.5 Flash Image मा आधारित छ र छिटो 1K generation दिन्छ। Pro Gemini 3 Pro Image Preview मा आधारित छ; complex instructions, राम्रो text rendering र 1K/2K/4K resolution दिन्छ। सामान्य quick creation का लागि base पर्याप्त छ; poster, infographic, text, high resolution वा precise control का लागि Pro छान्नुहोस्। Free Pro limit account र समयअनुसार बदलिन सक्छ; current UI लाई मान्नुहोस्।

## सुरु गर्ने तरिका

`gemini.google.com` खोल्नुहोस् वा official mobile app प्रयोग गर्नुहोस्। Google account, age eligibility र supported region आवश्यक हुन सक्छ। Input box को `+` बाट “Create image” छान्नुहोस्, वा `draw`, `generate`, `create` बाट request सुरु गर्नुहोस्। Fast प्रायः base र Thinking प्रायः Pro हो, तर labels account अनुसार बदलिन सक्छन्। Chinese, English, Japanese लगायतका भाषा चल्छन्; complex scene कमजोर भए English phrasing प्रयोग गर्नुहोस्।

## पहिलो image workflow

1. Subject र scene स्पष्ट गर्नुहोस्; “a cat” मात्र धेरै vague हुन्छ।
2. Prompt लेख्नुहोस्: orange cat, wooden windowsill, afternoon light, blurred plants, cozy photo style।
3. Send गरेर 5–30 seconds पर्खनुहोस्।
4. Result review, download वा त्यही conversation मा edit गर्नुहोस्।
5. एक पटकमा एउटा परिवर्तन दिनुहोस्, जस्तै “cat को रंग gray बनाऊ”।

Preview प्रायः 1K हुन्छ; download र Pro resolution current UI मा निर्भर हुन्छ। Gemini image मा invisible SynthID watermark हुन सक्छ।

## Prompt का छ elements

1. **Subject:** मुख्य object वा character।
2. **Composition:** close-up, medium shot, wide shot, low angle, bird’s-eye view, 85mm lens।
3. **Action:** subject ले के गरिरहेको छ — barista ले latte बनाउँदै, steam उठ्दै।
4. **Location:** retro-industrial coffee shop, brick wall, warm yellow light।
5. **Style:** photorealistic, 3D, watercolor, anime, cyberpunk, minimalist वा vintage।
6. **Editing:** background बदल्नुहोस्, object हटाउनुहोस्, fog थप्नुहोस्।

Keyword list भन्दा पूरा वाक्य राम्रो हुन्छ। “nice lighting” को सट्टा “golden afternoon sunlight” लेख्नुहोस्। पहिलो result imperfect हुनु सामान्य हो; conversation मा iterate गर्नुहोस्।

## Reusable templates

```text
Professional product photography of [product]. Clean background, three-point lighting,
soft reflections, visible texture and detail, commercial quality for ecommerce.
```

```text
Generate [scene] in [style]. Use [composition], [lighting], and [color palette].
Keep [must-preserve details] unchanged and avoid [exclusions].
```

Portrait, product, food, skyline, landscape, poster, app icon र character consistency मा subject, framing, action, environment, style र constraints स्पष्ट राख्नुहोस्।

## Multi-turn editing र API

हरेक round मा एउटा मुख्य परिवर्तन राख्नुहोस्: composition, त्यसपछि lighting, color वा text area। Reference image मा अधिकार भएको image मात्र upload गर्नुहोस् र के preserve गर्ने हो बताउनुहोस्। API मा current model ID, output size, pricing र quota verify गर्नुहोस्; `type: "image"`, `aspect_ratio` र `image_size` settings प्रयोग गर्नुहोस्। 429 मा limited backoff र queue राख्नुहोस्; 400/403 लाई blind retry नगर्नुहोस्।

Region, age, account र model availability छुट्टाछुट्टै eligibility हुन्। Real people, brands, copyrighted images र uploaded photos का rights पालना गर्नुहोस्। Final text लाई design tool मा typeset गर्नु अधिक भरपर्दो हुन्छ।

## Further Reading

- [Image Generation API](/docs/api/images/)
