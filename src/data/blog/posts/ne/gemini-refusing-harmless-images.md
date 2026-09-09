---
title: Gemini ले harmless-looking image अस्वीकार गरेमा पहिले blocking layer पहिचान गर्नुहोस्
description: Gemini app, API prompt filtering, output image safety, quota र policy boundary छुट्याएर image rejection troubleshoot गर्नुहोस्।
date: 2026-06-15
category: Gemini专题
tags: [Gemini, Image Generation, Safety Filtering, AI Studio, Troubleshooting]
readTime: 10
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

सामान्य देखिने image prompt, upload वा edit पनि Gemini ले अस्वीकार गर्न सक्छ। शब्द बदल्दै filter bypass गर्नु अघि “no” कुन layer ले भनेको हो पहिचान गर्नुहोस्: Gemini app, API prompt filter, model refusal, output image safety, unsupported route, account/quota वा policy र rights boundary।

| संकेत | सम्भावित layer | पहिले जाँच | सुरक्षित कदम |
| --- | --- | --- | --- |
| App ले image generate/edit गर्दैन | app-side rejection | prompt, upload, face/real person, account, age, plan | permitted use स्पष्ट गरी fresh session मा एक retry |
| API `promptFeedback` वा `SAFETY` | prompt/model safety | `blockReason`, `finishReason`, `safetyRatings`, model, project | fields पढेर request/settings जाँच |
| Prompt accepted तर image छैन | output safety/request shape | `IMAGE_SAFETY`, `IMAGE_PROHIBITED_CONTENT`, parts, capability | request सरल; prohibited target भए stop |
| count, busy वा `429` | quota/account/rate | plan, project quota, body, retry delay | limits branch; policy rejection नमान्नुहोस् |
| real people, children, sexual/violent, IP, privacy, deception | hard boundary | consent, rights, category | रोक्नुहोस्; शब्द बदलेर लुकाउनु हुँदैन |

Safe retry भनेको permitted use स्पष्ट गर्नु हो: authorized product shot, non-deceptive edit, identity नबदल्ने र lighting/background मात्र बदल्ने। “filter ले नचिनोस्” वा public-figure lookalike बनाउनु bypass हो।

## Entry point र App

App message consumer signal, API response developer object, AI Studio project/model context र Vertex route अलग हुन्छन्। `429`, count cap वा busy message सामान्यतः quota/account state हो, content policy होइन। Uploaded image मा face, child, private/medical/intimate scene, brand mark वा public-figure signal भए system conservative हुन सक्छ। Account age, work/school control, region, plan र load जाँचेर original refusal राख्नुहोस्; fresh session मा एकपटक मात्र retry गर्नुहोस्।

## API fields

`promptFeedback.blockReason` input block, `finishReason: SAFETY` candidate block, `safetyRatings` category estimate, `IMAGE_SAFETY` output filtering र `IMAGE_PROHIBITED_CONTENT` prohibited target को संकेत हुन्। `BlockedReason.OTHER` unsupported route, terms वा request shape हुन सक्छ। Image part नभए model capability, SDK parameters र response parts जाँच्नुहोस्। `BLOCK_NONE` universal switch होइन; core protection र output filtering कायम रहन सक्छ।

## Safe retry र bypass

Product layout, lighting, background र authorized person image को स्पष्ट non-deceptive edit सामान्यतः retry गर्न सकिन्छ। Public figure, children, private/intimate context, sexual content, violence, self-harm, privacy invasion, impersonation र safety bypass मा रोक्नुहोस्। Brand, logo, character र protected style मा rights risk जाँच्नुहोस्।

## Evidence packet

```text
Entry point and route:
Time and timezone:
Model or app version:
Account/project route:
Prompt and uploaded-image context:
Visible refusal or API fields:
Quota/429 signal:
Minimal reproduction:
Action taken:
```

Public report मा private images, client assets, children, ID, medical images वा private photos नहाल्नुहोस्। API keys, project IDs र billing identifiers हटाउनुहोस्। त्यसपछि clarify once, quota पर्खने, fields पढ्ने, report वा stop मध्ये एक निर्णय गर्नुहोस्।

## FAQ

आफ्नै photo पनि identity, privacy, age, medical/intimate context वा deception risk का कारण अस्वीकार हुन सक्छ। Paid plan ले safety boundary हटाउँदैन। `BLOCK_NONE` ले output image safety बन्द गर्दैन। Text-only response भए model capability र response structure पहिले हेर्नुहोस्।

## Further Reading

- [Image Generation API](/docs/api/images/)
