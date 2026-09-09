---
title: AI उत्पादनका फोटोमा एउटै उत्पादनलाई सुसंगत राख्ने व्यावहारिक QC विधि
description: पहिले वास्तविक SKU लक गर्नुहोस् र त्यसपछि दृश्य मात्र बदल्नुहोस्। reference package, lock/allow-change matrix, six-frame stress test र per-image QC ले आकार, रंग, अक्षर र variant का गल्ती घटाउँछ।
date: 2026-07-28
category: इमेज जेनेरेसन
tags: [AI Product Photos, Product Consistency, Ecommerce Photography, Reference Images, Product Image QC]
readTime: 12
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: Agent Image Quality & Crop Guide
---

धेरै AI product photos मा एउटै उत्पादन कायम राख्न prompt बारम्बार बदल्नु पहिलो कदम होइन। वास्तविक SKU को reference package बनाउनुहोस्। “कहिल्यै नबदलिने” र “बदलिन सक्ने” दुई सूची लेख्नुहोस्। हरेक परिणामलाई वास्तविक फोटोसँग तुलना गर्नुहोस्। आकार, parts, packaging text, Logo, रंग वा specification को गल्ती aesthetic होइन, product-fact गल्ती हो।

व्यावहारिक क्रम: अधिकार भएको हालको फोटोबाट ground truth बनाउनुहोस्; product identity lock गर्नुहोस्; scene, props, lighting र crop मात्र बदल्नुहोस्; पहिले six-frame stress test चलाउनुहोस्; अनि एउटै QC table ले हरेक फोटो जाँच्नुहोस्। Reference images ले संकेत दिन्छन्, auto-replication को ग्यारेन्टी गर्दैनन्। fixed prompt वा seed ले SKU को शुद्धता प्रमाणित गर्दैन।

## Product identity र visual style अलग गर्नुहोस्

| पक्ष | Lock गर्नुपर्ने कुरा | बदलिन सक्ने कुरा | सामान्य गल्ती |
| --- | --- | --- | --- |
| Product identity | silhouette, parts, label, color, material, variant | वास्तविक data ले समर्थन गरेको angle | cap/port बदलिनु, गलत रंग वा capacity |
| Visual style | campaign को समग्र दिशा | background, props, light, composition | shadow र product scale नमिल्नु |

Style एउटै भए पनि set ले गलत उत्पादन देखाउन सक्छ। पहिले product facts सही छन् कि छैनन् जाँच्नुहोस्, त्यसपछि सुन्दरता र campaign cohesion हेर्नुहोस्।

## वास्तविक reference package बनाउनुहोस्

हरेक SKU का लागि स्पष्ट hero image, side/back/top/bottom angles, Logo र label का close-ups, SKU fact card र channel delivery table राख्नुहोस्। एउटा front photo ले front मात्र प्रमाणित गर्छ; back वा open state को data नभए AI ले अनुमान गर्छ। पुरानो packaging, फरक color/capacity, bundle र single item छुट्याउनुहोस्। अज्ञात स्रोत वा अधिकार नभएका assets हटाउनुहोस्।

## Lock / Allow-change matrix लेख्नुहोस्

जस्तै frosted-white 50 mL serum bottle मा silhouette, silver pump, clear cap, label, color, material र 50 mL specification lock हुन्छ। background, props, lighting र frame crop बदलिन सक्छन्। Acceptance method पनि लेख्नुहोस्: same-angle photo सँग silhouette overlay, parts गन्ने, label अक्षर-अक्षर पढ्ने र material reflection तुलना गर्ने।

## एउटा universal prompt होइन, modular prompt

Prompt लाई product lock, allowed changes, scene task, camera/lighting, forbidden changes र acceptance conditions मा विभाजन गर्नुहोस्। वास्तविक reference को silhouette, pump, cap, label, material र 50 mL नबदल्नुहोस्; background, surface, props, light र crop मात्र बदल्नुहोस्; नयाँ part, text, color, material वा reference मा नदेखिएको back structure नबनाउनुहोस्। यसले सफलता ग्यारेन्टी गर्दैन, तर failure debug गर्न सजिलो बनाउँछ।

## GPT88 मा पहिले सानो controlled test

एक current SKU, आवश्यक angles र modular prompt बाट केही candidates बनाउनुहोस्। वास्तविक फोटोसँग side-by-side हेरेर pass, hard error, local fix र uncertain items लेख्नुहोस्। hard product error बाँकी हुँदा पूरै batch सुरु नगर्नुहोस्। Background मात्र बदल्नु हो र real product pixels जोगाउन सकिन्छ भने full regeneration भन्दा local editing route रोज्नुहोस्।

## छ-फ्रेम stress test

Clean hero, same-angle scene, label close crop, high-contrast scene, mobile tight crop र ad whitespace version जाँच्नुहोस्। यसले silhouette, parts, text, material, crop safety र decoration drift देखाउँछ। वास्तविक reference नभएको angle AI बाट अनुमान नगराउनुहोस्; reshoot वा trusted 3D asset प्रयोग गर्नुहोस्।

## Per-image QC: पहिले hard errors

| जाँच | Pass condition |
| --- | --- |
| Geometry | silhouette र proportions reference सँग मिल्ने |
| Parts | count, position र connections सही हुने |
| Text/Logo | हरेक अक्षर र unit पढ्न मिल्ने |
| Variant | color, capacity र bundle सही SKU का हुने |
| Material | metal, glass, frost र transparency वास्तविक देखिने |
| Context | props/हात/स्थानसँग scale स्वाभाविक हुने |
| Export | channel ratio, crop र mobile clarity सही हुने |

मिश्रित भाषाको packaging मा numbers, units, `0/O`, `1/I` र regulatory text मानिसले पढेर जाँच्नुपर्छ। OCR ले शंकास्पद ठाउँ देखाउन सक्छ, human review को विकल्प होइन।

## निर्णयलाई Pass / Fix / Change Route मा लेख्नुहोस्

**Pass**: product facts वास्तविक reference सँग मिल्छन् र channel export ठीक छ। **Fix**: crop, background, shadow वा whitespace जस्ता स्थानीय र जाँच्न मिल्ने समस्या मात्र सुधार्नुहोस्; product identity फेरि नबनाउनुहोस्। **Change Route**: angle data नभए, text बारम्बार बिग्रिए वा geometry drift भए real pixels, compositing, 3D वा professional retouching रोज्नुहोस्।

## FAQ

### एउटै prompt र seed ले product स्थिर राख्छ?

राख्दैन। तिनले generation conditions दोहोर्याउन सक्छन्, तर shape, label, material वा parts को शुद्धता प्रमाणित गर्दैनन्।

### एउटा front photo बाट back र sides बनाउन सकिन्छ?

विश्वसनीय product evidence का रूपमा सकिँदैन। Missing angles reshoot वा trusted 3D बाट दिनुहोस्।

### Style consistency भनेकै product consistency हो?

होइन। एउटै background भए पनि SKU गलत हुन सक्छ।

### Packaging text बिग्रिए बारम्बार regenerate गर्ने?

नगर्नुहोस्। readable text चाहिन्छ भने real label pixels, compositing वा retouching route प्रयोग गर्नुहोस्।

### छवटा frame pass भए batch सुरु गर्ने?

यो diagnostic gate हो, guarantee होइन। channel rules र per-image QC अझै आवश्यक छन्।
