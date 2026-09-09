---
title: Gemini 3.1 Flash Image Free Tier: Official API paid छ, AI Studio test का लागि मात्र
description: gemini-3.1-flash-image को official API free tier, AI Studio testing, current model ID र Standard, Batch तथा Gemini Apps बीचको फरक बुझ्नुहोस्।
date: 2026-02-27
category: API विकास
tags: [Gemini API, Image Generation, API Pricing, AI Studio]
readTime: 12
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

13 जुन 2026 को जाँचअनुसार `gemini-3.1-flash-image` का लागि official Gemini Developer API मा Free Tier row छैन। AI Studio मा Nano Banana 2 browser बाट परीक्षण गर्न सकिन्छ, तर त्यसले backend application को free production API quota प्रमाणित गर्दैन। हालको model ID `gemini-3.1-flash-image` हो; पुरानो tutorial को `gemini-3.1-flash-image-preview` नयाँ code contract होइन, migration वा historical context मात्र हो।

**Route answer:** browser test का लागि AI Studio, synchronous backend का लागि paid Developer API Standard, पर्खन मिल्ने batch का लागि paid Batch। Gemini Apps को consumer limit लाई API quota नमान्नुहोस्।

## निष्कर्ष पहिले

| प्रश्न | हालको उत्तर | कहाँ जाँच्ने |
| --- | --- | --- |
| Official API free छ? | छैन; Standard र Batch image rows मा Free Tier छैन | Google Gemini API pricing |
| AI Studio | Browser testing | AI Studio |
| Nano Banana 2 | `gemini-3.1-flash-image` मा map हुन्छ | Google image docs |
| Preview ID | नयाँ code का लागि होइन | Google changelog |

## Access route पहिले छान्नुहोस्

AI Studio browser experiment का लागि; Developer API Standard paid synchronous backend; Batch paid asynchronous र सस्तो, free होइन; Gemini Apps personal consumer route; third-party gateway को आफ्नै contract हुन्छ। AI Studio मा image बन्नु backend free quota को प्रमाण होइन।

## Official API pricing paid row हो

| Output | Standard API | Batch API |
| --- | ---: | ---: |
| 0.5K | $0.045 | $0.022 |
| 1K | $0.067 | $0.034 |
| 2K | $0.101 | $0.050 |
| 4K | $0.151 | $0.076 |

यी budget का सुरुवाती मूल्य हुन्, स्थायी प्रतिज्ञा होइनन्। Release, demo वा migration अघि model ID, price र billing row फेरि जाँच्नुहोस्।

## Current model ID प्रयोग गर्नुहोस्

नयाँ code मा `gemini-3.1-flash-image` राख्नुहोस्। `gemini-3.1-flash-image-preview` पुरानो repository, migration note वा historical URL मा मात्र राख्नुहोस्। Code, logs, allowlist, billing dashboard र ticket मा एउटै ID प्रयोग गर्नुहोस्।

## Go-live अघि real-time quota

API key वा project को account बाट AI Studio खोल्नुहोस्, code ले प्रयोग गर्ने उही project छान्नुहोस्, model ID सुनिश्चित गर्नुहोस् र tier, RPM, TPM, RPD तथा billing notes लेख्नुहोस्। Demo, launch, migration वा traffic परिवर्तनअघि फेरि जाँच्नुहोस्।

## AI Studio कहिले पर्याप्त छ

Prompt तुलना, reference image test, Nano Banana 2 fit र internal design sample का लागि पर्याप्त छ। User wait, retry, logging, billing, storage वा go-live commitment आएपछि Developer API planning मा जानुहोस्। Gemini Apps consumer surface हो; त्यसका limits API limits होइनन्।

## Engineering acceptance र migration

Model ID, project, date, prompt set र output size record गर्नुहोस्। Samples लाई acceptable, needs-retry र unacceptable मा बाँड्नुहोस्। Standard र Batch config अलग राख्नुहोस्; logs मा project, model, tier, size र error लेख्नुहोस्। Preview migration मा “free API” लाई AI Studio testing वा official API without Free Tier भनेर बदल्नुहोस्। Batch सस्तो paid async route हो, free होइन।

## FAQ

### Gemini 3.1 Flash Image को free API tier छ?

छैन। 13 जुन 2026 को Google pricing जाँचमा Standard र Batch दुवै image row मा Free Tier थिएन।

### AI Studio free testing का लागि प्रयोग गर्न मिल्छ?

हो, browser test route का रूपमा; free backend production API quota का रूपमा होइन।

### Nano Banana 2 उही model हो?

Google image docs अनुसार current model ID `gemini-3.1-flash-image` हो।

### Preview model ID प्रयोग गर्ने?

नयाँ code मा होइन; पुरानो example र migration context मा मात्र।

### सस्तो Batch free हो?

होइन। यो waitable task का लागि lower-priced paid async route हो।

### Exact quota कहाँ हेर्ने?

Current project को AI Studio view मा model, tier, RPM, TPM, RPD र billing notes हेर्नुहोस्।
