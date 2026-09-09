---
title: Gemini harmless-looking image එකක් ප්‍රතික්ෂේප කළොත් මුලින් blocking layer හඳුනාගන්න
description: Gemini app, API prompt filtering, output image safety, quota සහ policy boundary වෙන් කර image rejection troubleshoot කරන්න.
date: 2026-06-15
category: Gemini专题
tags: [Gemini, Image Generation, Safety Filtering, AI Studio, Troubleshooting]
readTime: 10
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

සාමාන්‍ය ලෙස පෙනෙන image prompt, upload හෝ edit එකක් Gemini ප්‍රතික්ෂේප කළ හැක. වචන නැවත නැවත වෙනස් කර filter bypass කිරීමට පෙර “no” කීවේ කුමන layer එකද බලන්න: Gemini app, API prompt filter, model refusal, output image safety, unsupported route, account/quota හෝ සැබෑ policy සහ rights boundary.

| ලකුණ | හැකි layer | මුලින් බලන්න | ආරක්ෂිත පියවර |
| --- | --- | --- | --- |
| App එක image generate/edit නොකරයි | app-side rejection | prompt, upload, face/real person, account, age, plan | permitted use පැහැදිලි කර fresh session එකක එක retry |
| API `promptFeedback` හෝ `SAFETY` | prompt/model safety | `blockReason`, `finishReason`, `safetyRatings`, model, project | fields කියවා request/settings බලන්න |
| Prompt accepted නමුත් image නැත | output safety/request shape | `IMAGE_SAFETY`, `IMAGE_PROHIBITED_CONTENT`, parts, capability | request සරල කරන්න; prohibited target නම් නවතන්න |
| count, busy හෝ `429` | quota/account/rate | plan, project quota, body, retry delay | limits branch; policy rejection ලෙස නොසලකන්න |
| real people, children, sexual/violent, IP, privacy, deception | hard boundary | consent, rights, category | නවතන්න; වචන වෙනස් කර සඟවන්න එපා |

Safe retry යනු permitted use පැහැදිලි කිරීමයි: authorized product shot, non-deceptive edit, identity නොවෙනස් කිරීම සහ lighting/background පමණක් වෙනස් කිරීම। “filter එකට හඳුනාගත නොහැකි ලෙස” හෝ public-figure lookalike නිර්මාණය කිරීම bypass වේ.

## Entry point සහ App

App message එක consumer signal එකකි; API response developer object එකකි; AI Studio project/model context සහ Vertex route වෙනස්ය. `429`, count cap හෝ busy message සාමාන්‍යයෙන් quota/account state එකක් වන අතර content policy එකක් නොවේ. Uploaded image එකේ face, child, private/medical/intimate scene, brand mark හෝ public-figure signal තිබේ නම් system conservative විය හැක. Account age, work/school control, region, plan සහ load පරීක්ෂා කර original refusal තබා fresh session එකක එකවරක් පමණක් retry කරන්න.

## API fields

`promptFeedback.blockReason` input block, `finishReason: SAFETY` candidate block, `safetyRatings` category estimate, `IMAGE_SAFETY` output filtering සහ `IMAGE_PROHIBITED_CONTENT` prohibited target දක්වයි. `BlockedReason.OTHER` unsupported route, terms හෝ request shape විය හැක. Image part නැත්නම් model capability, SDK parameters සහ response parts පරීක්ෂා කරන්න. `BLOCK_NONE` universal switch එකක් නොවේ; core protection සහ output filtering තවමත් ක්‍රියාත්මක විය හැක.

## Safe retry සහ bypass

Product layout, lighting, background සහ authorized person image එකක පැහැදිලි non-deceptive edit සාමාන්‍යයෙන් retry කළ හැක. Public figures, children, private/intimate context, sexual content, violence, self-harm, privacy invasion, impersonation සහ safety bypass සඳහා නවතන්න. Brands, logos, characters සහ protected styles සඳහා rights risk බලන්න.

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

Public report එකකට private images, client assets, children, ID, medical images හෝ private photos එකතු නොකරන්න. API keys, project IDs සහ billing identifiers ඉවත් කරන්න. ඉන්පසු clarify once, quota බලා සිටීම, fields කියවීම, report හෝ stop යන එක් තීරණයක් ගන්න.

## FAQ

ඔබගේම photo එකක් වුවත් identity, privacy, age, medical/intimate context හෝ deception risk නිසා ප්‍රතික්ෂේප විය හැක. Paid plan එක safety boundary ඉවත් නොකරයි. `BLOCK_NONE` output image safety අක්‍රිය නොකරයි. Text-only response එකක් නම් model capability සහ response structure මුලින් බලන්න.

## Further Reading

- [Image Generation API](/docs/api/images/)
