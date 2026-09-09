---
title: Nano Banana Pro 4K free हो? Nano Banana 2, API pricing र credits पहिले जाँच्नुहोस्
description: Nano Banana Pro र Nano Banana 2 को official 4K API pricing, Gemini Apps को 1K/2K download limits र third-party credits को ownership बुझ्नुहोस्।
date: 2026-06-13
category: Gemini तुलना
tags: [Nano Banana Pro, Nano Banana 2, 4K Image Generation, Gemini API, Free Credits]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

**छोटो उत्तर:** Official API मा Nano Banana Pro ले 4K output दिन्छ, तर 20 जुलाई 2026 को जाँचमा 4K Standard output को Free Tier थिएन; उदाहरण मूल्य करिब `$0.24` प्रति image थियो। Nano Banana 2 (`gemini-3.1-flash-image`) ले पनि 4K दिन्छ र उदाहरण मूल्य करिब `$0.151` हो। Gemini Apps को 1K/2K download सुविधा API को 4K contract होइन।

## पहिले entry point चिन्ह लगाउनुहोस्

Gemini Apps, AI Studio, Gemini Developer API, Cloud/Vertex र third-party platforms का limits तथा credits अलग हुन्छन्। Consumer plan हेरेर API free tier वा 4K price अनुमान नगर्नुहोस्। Region, account eligibility र payment आफ्नो account तथा official pages बाट जाँच्नुहोस्।

## 4K API pricing

| Standard output | Nano Banana 2 | Nano Banana Pro |
| --- | ---: | ---: |
| Model ID | `gemini-3.1-flash-image` | `gemini-3-pro-image` |
| 1K | करिब $0.067 | करिब $0.134 |
| 2K | करिब $0.101 | करिब $0.134 |
| 4K | करिब **$0.151** | करिब **$0.24** |
| Free Tier | छैन | छैन |

यी image-output equivalents हुन्, स्थायी quote होइनन्। Input, text, retries र execution channel ले कुल bill बदल्न सक्छन्। 100 successful 4K outputs को सूची मूल्य Nano Banana 2 मा `$15.10` र Pro मा `$24.00` हुन्छ; वास्तविक निर्णय accepted image प्रति cost बाट गर्नुहोस्।

## Nano Banana 2 वा Pro

दुवैले 4K output दिन सक्छन्। उही prompt र acceptance criteria सहित 10–20 वास्तविक task test गर्नुहोस्। Routine product background, social asset र simple edit मा Nano Banana 2 पहिले जाँच्नुहोस्। Complex Chinese layout, multiple references, infographic वा strict composition बारम्बार fail भए Pro evaluate गर्नुहोस्। सुन्दर पहिलो image होइन, accepted-output cost र rework हेर्नुहोस्।

## Gemini Apps 1K/2K API 4K होइन

Gemini Apps को download size consumer सुविधा हो। Google AI plan ले app benefit बदल्न सक्छ, तर Developer API image output free बनाउँदैन। Dynamic limits account, region र capacity अनुसार बदलिन सक्छन्। AI Studio availability पनि permanent free access को प्रमाण होइन।

## “Free credits” कसका हुन्?

100 credits लाई image count मा बदल्नुअघि issuer, unit, actual model ID, प्रति 4K deduction, failure/retry billing, expiry, refund, storage र training terms जाँच्नुहोस्। Formula: `attemptable 4K count = available credits ÷ credits per 4K generation`। यो deliverable count होइन।

## साँचो 4K पुष्टि गर्नुहोस्

`image_size` मा uppercase `4K` पठाउनुहोस्; lowercase `4k` reject हुन सक्छ। Model, aspect ratio र size record गर्नुहोस्, original file download गरेर pixel dimensions जाँच्नुहोस्। 16:9 4K `5504 × 3072`, square `4096 × 4096` हुन सक्छ। Web preview वा ठूलो canvas मात्र पर्याप्त प्रमाण होइन।

## GPT88 Unified Gateway

Mainland-China connectivity र controllable billing चाहिएको हो भने GPT88 gateway option हुन सक्छ। 1 CNY top-up = 1 CNY account balance; actual charge official usage × selected group multiplier मा आधारित हुन्छ। Exact pricing, model coverage, failure billing र 4K parameters gpt88.cc console मा जाँच्नुहोस्। Gateway official API को विकल्प होइन; pixel dimensions फेरि verify गर्नुहोस्।

## निर्णय checklist

Web app मा account limits/download size हेर्नुहोस्; API batch मा Nano Banana 2 पहिले र कठिन काम Pro मा test गर्नुहोस्; third-party credits मा issuer, deduction, failure, data र support जाँच्नुहोस्; Mainland China मा region, eligibility र payment अलग verify गर्नुहोस्।

## FAQ

### Nano Banana Pro को official 4K API free हो?

होइन। 20 जुलाई 2026 को जाँचमा Free Tier थिएन; उदाहरण मूल्य करिब `$0.24/image` थियो।

### Nano Banana 2 ले 4K दिन्छ?

हो। `gemini-3.1-flash-image` ले 4K support गर्छ; उदाहरण Standard price करिब `$0.151/image` हो।

### 4K का लागि Pro चाहिन्छ?

चाहिँदैन। कठिन instruction र professional asset का लागि Pro evaluate गर्नुहोस्; 4K मात्र पर्याप्त कारण होइन।

### Prompt मा “4K” लेखे पुग्छ?

पुग्दैन। API request मा uppercase `image_size: "4K"` पठाएर output dimensions जाँच्नुहोस्।
