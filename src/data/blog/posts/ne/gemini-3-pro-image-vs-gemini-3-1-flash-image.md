---
title: Nano Banana 2, Pro वा 2 Lite: डेलिभरी जोखिमअनुसार मोडेल छान्नुहोस्
description: एउटै input, size र acceptance criteria प्रयोग गरेर Nano Banana 2 Lite, Nano Banana 2 र Nano Banana Pro को API route छान्नुहोस्।
date: 2026-05-30
category: मोडेल तुलना
tags: [Nano Banana 2 Lite, Nano Banana 2, Nano Banana Pro, मोडेल तुलना, Image API]
readTime: 7
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

छिटो 1K direction screening मात्र चाहिन्छ भने Nano Banana 2 Lite बाट सुरु गर्नुहोस्। 2K वा 4K, धेरै variants, वा सामान्य generation र editing चाहिन्छ भने Nano Banana 2 प्रयोग गर्नुहोस्। dense text, कडा brand नियम, महत्वपूर्ण product mockup वा महँगो rework छ भने मात्र उही input मा Nano Banana Pro तुलना गर्नुहोस्। यो API routing निर्णय हो; Gemini App, AI Studio, Vertex वा third-party platform को मूल्य र availability को दाबी होइन।

तीन model ID हुन्: `gemini-3.1-flash-lite-image`, `gemini-3.1-flash-image` र `gemini-3-pro-image`। कुनै एउटै मोडेल हरेक अवस्थामा उत्कृष्ट हुँदैन। उही input र acceptance criteria मा pass rate, retry count र manual-revision time हेर्नुहोस्।

## पहिले delivery risk अनुसार route छान्नुहोस्

| आवश्यकता | सुरु गर्ने route | कहिले बदल्ने |
| --- | --- | --- |
| 1K preview, direction draft वा background variant | **Nano Banana 2 Lite** | 2K/4K चाहिँदा वा 1K पर्याप्त नहुँदा |
| सामान्य generation/editing, धेरै sizes र वास्तविक deliverable | **Nano Banana 2** | text, structure, reference consistency वा rework बारम्बार असफल हुँदा |
| high-risk brand asset, dense text वा complex mockup | **Nano Banana Pro** | logo, सानो text, exact color वा regulated copy स्थिर नहुँदा |

Delivery size, reference assets, image text, retry budget र final reviewer पहिले लेख्नुहोस्। Lite को official सीमा 1K हो; size ले त्यसलाई हटाइसकेपछि unit price मात्र तुलना गर्नु उपयोगी हुँदैन।

## एउटै input मा accepted-output cost test

Prompt, reference image, aspect ratio, size र safety requirements समान राखेर model ID मात्र बदल्नुहोस्। Lite ले लक्ष्य size नसमर्थन गरे `N/A` लेख्नुहोस्। प्रत्येक sample का लागि pass/fail, generation fee, retry count, manual revision minutes र review wait राख्नुहोस्। Accepted-output cost = (model cost + manual revision cost) ÷ accepted count।

एउटा राम्रो sample बाट निष्कर्ष ननिकाल्नुहोस्। text poster, packaging, reference editing र 4K key visual जस्ता वास्तविक deliverable मा परीक्षण गर्नुहोस्।

## कहिले upgrade र कहिले रोक्ने

Lite size सीमाका कारण मात्र असफल भए Nano Banana 2 वा Pro मा जानुहोस्। Nano Banana 2 उही input मा text accuracy, complex layout वा reference consistency मा बारम्बार असफल भयो र Pro ले retries वा manual edits घटायो भने मात्र upgrade को प्रमाण हुन्छ। Pro ले logo, barcode, price, date र regulated copy को manual verification हटाउँदैन।

4K का लागि Pro अनिवार्य छैन; Nano Banana 2 पनि 4K candidate हो। Lite भनेको low-quality होइन, यसको मुख्य सीमा 1K हो। API price हरेक entry point को वास्तविक कुल cost होइन, किनकि region, quota, billing unit र terms फरक हुन सक्छन्।
