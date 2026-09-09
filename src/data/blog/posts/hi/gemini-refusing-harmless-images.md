---
title: Gemini harmless-looking image को reject करे तो पहले blocking layer पहचानें
description: Gemini app, API prompt filtering, output image safety, quota और policy boundary को अलग करके image rejection troubleshoot करें।
date: 2026-06-15
category: Gemini专题
tags: [Gemini, Image Generation, Safety Filtering, AI Studio, Troubleshooting]
readTime: 10
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

किसी normal दिखने वाले image prompt, upload या edit को Gemini reject कर सकता है। शब्दों को बार-बार बदलकर filter bypass करने से पहले पहचानें कि “no” किस layer ने कहा: Gemini app, API prompt filter, model refusal, output image safety, unsupported route, account/quota या वास्तविक policy और rights boundary।

| संकेत | संभावित layer | पहला check | सुरक्षित अगला कदम |
| --- | --- | --- | --- |
| App image generate/edit नहीं करता | app-side rejection | prompt, upload, face/real person, account, age, plan | permitted use स्पष्ट करें, fresh session में एक बार retry |
| API `promptFeedback` या `SAFETY` | prompt/model safety | `blockReason`, `finishReason`, `safetyRatings`, model, project | fields पढ़ें, फिर request या settings जाँचें |
| Prompt accepted पर image नहीं | output safety/request shape | `IMAGE_SAFETY`, `IMAGE_PROHIBITED_CONTENT`, parts, model capability | request सरल करें; prohibited target हो तो रुकें |
| counts, busy या `429` | quota/account/rate | plan, project quota, body, retry delay | limits branch अपनाएं, policy rejection न मानें |
| real people, child safety, sexual/violent, IP, privacy, deception | hard boundary | consent, rights, category | रुकें; शब्द बदलकर छिपाने की कोशिश न करें |

Safe retry का अर्थ permitted use को स्पष्ट करना है: authorized product shot, non-deceptive edit, identity न बदलना, केवल lighting/background बदलना। “filter को पता न चले” या public figure lookalike बनाना bypass है।

## Entry point पहले पहचानें

Gemini app का संदेश consumer product signal है; API response developer object है; AI Studio project/model fields दिखा सकता है; Vertex/Cloud route अलग output fields दे सकता है। `429`, count cap या busy message सामान्यतः quota/account state है, content policy नहीं। App rejection को API safety-settings bug न मानें और output block को केवल trigger-word समस्या न समझें।

## App troubleshooting

Uploaded image में face, child, private/medical/intimate scene, brand mark या public-figure संकेत हों तो system अधिक conservative हो सकता है। Account age, work/school management, region, language, plan, daily cap और load भी असर डालते हैं। एक fresh session में एक controlled retry करें और original refusal message रखें। Consent और rights स्पष्ट किए बिना real-person edit जारी न रखें।

## API fields पढ़ें

`promptFeedback.blockReason` input block को, `finishReason: SAFETY` candidate output block को, `safetyRatings` category estimates को, `IMAGE_SAFETY` output image filtering को और `IMAGE_PROHIBITED_CONTENT` prohibited target को संकेत करता है। `BlockedReason.OTHER` में unsupported route, terms या request shape हो सकती है। Image part न हो तो model capability, SDK parameters और response parts जाँचें। `BLOCK_NONE` universal switch नहीं है; core protections और output filtering फिर भी लागू रह सकते हैं।

## Safe retry बनाम bypass

Product layout, lighting, background और authorized person image पर स्पष्ट, non-deceptive edit आम तौर पर retry योग्य है। Public figures, children, private/intimate context, sexual content, violence, self-harm, privacy invasion, impersonation और safety bypass पर रुकें। Brands, logos, characters और protected styles में rights risk जाँचें।

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

Public report में private images, client assets, children, ID, medical images या private photos न डालें। API keys, project IDs और billing identifiers भी हटाएँ। एक बार classify करने के बाद केवल एक निर्णय लें: clarify once, quota का इंतज़ार, fields पढ़ना, report करना या stop।

## FAQ

अपनी photo भी identity, privacy, age, medical/intimate context या deception risk के कारण reject हो सकती है। Paid plan safety boundary हटाता नहीं। `BLOCK_NONE` output image safety को बंद नहीं करता। कल काम करने वाला prompt आज route, model, account, quota या policy बदलाव से अलग व्यवहार कर सकता है। Text-only response में model capability और response structure पहले जाँचें।

## Further Reading

- [Image Generation API](/docs/api/images/)
