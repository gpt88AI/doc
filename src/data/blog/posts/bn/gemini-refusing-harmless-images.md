---
title: Gemini harmless-looking image reject করলে আগে blocking layer শনাক্ত করুন
description: Gemini app, API prompt filtering, output image safety, quota এবং policy boundary আলাদা করে image rejection troubleshoot করুন।
date: 2026-06-15
category: Gemini专题
tags: [Gemini, Image Generation, Safety Filtering, AI Studio, Troubleshooting]
readTime: 10
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

স্বাভাবিক দেখতে image prompt, upload বা edit-ও Gemini reject করতে পারে। শব্দ বারবার বদলে filter bypass করার আগে দেখুন “no” কোন layer বলেছে: Gemini app, API prompt filter, model refusal, output image safety, unsupported route, account/quota অথবা policy ও rights boundary।

| সংকেত | সম্ভাব্য layer | প্রথম check | নিরাপদ পদক্ষেপ |
| --- | --- | --- | --- |
| App image generate/edit করে না | app-side rejection | prompt, upload, face/real person, account, age, plan | permitted use স্পষ্ট করুন, fresh session-এ একবার retry |
| API `promptFeedback` বা `SAFETY` | prompt/model safety | `blockReason`, `finishReason`, `safetyRatings`, model, project | fields পড়ে request/settings দেখুন |
| Prompt accepted কিন্তু image নেই | output safety/request shape | `IMAGE_SAFETY`, `IMAGE_PROHIBITED_CONTENT`, parts, model capability | request সহজ করুন; prohibited target হলে থামুন |
| count, busy বা `429` | quota/account/rate | plan, project quota, body, retry delay | limits branch; policy rejection ভাববেন না |
| real people, child safety, sexual/violent, IP, privacy, deception | hard boundary | consent, rights, category | থামুন; শব্দ বদলে লুকাবেন না |

Safe retry মানে permitted use পরিষ্কার করা: authorized product shot, non-deceptive edit, identity না বদলানো, শুধু lighting/background পরিবর্তন। “filter যেন বুঝতে না পারে” বা public figure lookalike তৈরি bypass, তাই বন্ধ করতে হবে।

## Entry point আগে দেখুন

Gemini app message consumer signal, API response developer object, AI Studio project/model context এবং Vertex/Cloud route আলাদা। `429`, count cap বা busy message সাধারণত quota/account state, content policy নয়। App rejection-কে API safety-settings সমস্যা এবং output block-কে শুধু trigger-word সমস্যা ভাববেন না।

## App troubleshooting

Uploaded image-এ face, child, private/medical/intimate scene, brand mark বা public-figure signal থাকলে system conservative হতে পারে। Account age, work/school management, region, language, plan, daily cap ও load-ও প্রভাব ফেলে। Fresh session-এ এক controlled retry করুন এবং original refusal রাখুন। Consent ও rights পরিষ্কার না হলে real-person edit চালিয়ে যাবেন না।

## API fields

`promptFeedback.blockReason` input block, `finishReason: SAFETY` candidate block, `safetyRatings` category estimate, `IMAGE_SAFETY` output image filtering এবং `IMAGE_PROHIBITED_CONTENT` prohibited target নির্দেশ করে। `BlockedReason.OTHER` unsupported route, terms বা request shape হতে পারে। Image part না থাকলে model capability, SDK parameter এবং response parts দেখুন। `BLOCK_NONE` universal switch নয়; core protection ও output filtering থাকে।

## Safe retry বনাম bypass

Product layout, lighting, background এবং authorized person image-এর পরিষ্কার non-deceptive edit সাধারণত retry করা যায়। Public figure, child, private/intimate context, sexual content, violence, self-harm, privacy invasion, impersonation ও safety bypass-এ থামুন। Brand, logo, character ও protected style-এ rights risk যাচাই করুন।

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

Public report-এ private image, client asset, child, ID, medical image বা private photo দেবেন না। API key, project ID ও billing identifier মুছে দিন। Branch classify করার পর একটি সিদ্ধান্ত নিন: clarify once, quota অপেক্ষা, fields পড়া, report বা stop।

## FAQ

নিজের photo-ও identity, privacy, age, medical/intimate context বা deception risk-এ reject হতে পারে। Paid plan safety boundary সরায় না। `BLOCK_NONE` output image safety বন্ধ করে না। Text-only response হলে model capability ও response structure আগে দেখুন।

## Further Reading

- [Image Generation API](/docs/api/images/)
