---
title: Gemini harmless-looking image-ஐ மறுத்தால் முதலில் blocking layer-ஐ கண்டறியவும்
description: Gemini app, API prompt filtering, output image safety, quota மற்றும் policy boundary-களைப் பிரித்து image rejection-ஐ troubleshoot செய்யுங்கள்.
date: 2026-06-15
category: Gemini专题
tags: [Gemini, Image Generation, Safety Filtering, AI Studio, Troubleshooting]
readTime: 10
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

சாதாரணமாகத் தோன்றும் image prompt, upload அல்லது edit-ஐ Gemini மறுக்கலாம். வார்த்தைகளை மாற்றி filter bypass செய்ய முயல்வதற்கு முன் “no” என்று எந்த layer சொன்னது என்பதை அறியுங்கள்: Gemini app, API prompt filter, model refusal, output image safety, unsupported route, account/quota அல்லது உண்மையான policy/rights boundary.

| அறிகுறி | சாத்தியமான layer | முதலில் பார்க்க வேண்டியது | பாதுகாப்பான அடுத்த படி |
| --- | --- | --- | --- |
| App image generate/edit செய்யாது | app-side rejection | prompt, upload, face/real person, account, age, plan | permitted use தெளிவாக்கி fresh session-ல் ஒருமுறை retry |
| API `promptFeedback` அல்லது `SAFETY` | prompt/model safety | `blockReason`, `finishReason`, `safetyRatings`, model, project | fields படித்து request/settings பார்க்கவும் |
| Prompt accepted, image இல்லை | output safety/request shape | `IMAGE_SAFETY`, `IMAGE_PROHIBITED_CONTENT`, parts, capability | request எளிமைப்படுத்தவும்; prohibited target என்றால் நிறுத்தவும் |
| count, busy அல்லது `429` | quota/account/rate | plan, project quota, body, retry delay | limits branch; policy rejection என நினைக்க வேண்டாம் |
| real people, children, sexual/violent, IP, privacy, deception | hard boundary | consent, rights, category | நிறுத்தவும்; வார்த்தை மாற்றி மறைக்க வேண்டாம் |

Safe retry என்பது permitted use-ஐ தெளிவாகச் சொல்வது: authorized product shot, non-deceptive edit, identity மாற்றாமல் lighting/background மட்டும் மாற்றுவது. “filter அறியாதபடி” அல்லது public-figure lookalike உருவாக்குவது bypass ஆகும்.

## Entry point மற்றும் App

App message consumer signal; API response developer object; AI Studio project/model context; Vertex route தனி. `429`, count cap, busy message பெரும்பாலும் quota/account state, content policy அல்ல. Uploaded image-ல் face, child, private/medical/intimate scene, brand mark அல்லது public-figure signal இருந்தால் system conservative ஆகலாம். Account age, work/school control, region, plan மற்றும் load-ஐச் சரிபார்த்து original refusal-ஐ வைத்துக்கொள்ளுங்கள்; fresh session-ல் ஒருமுறை மட்டும் retry செய்யுங்கள்.

## API fields

`promptFeedback.blockReason` input block-ஐ, `finishReason: SAFETY` candidate block-ஐ, `safetyRatings` category estimate-ஐ, `IMAGE_SAFETY` output filtering-ஐ, `IMAGE_PROHIBITED_CONTENT` prohibited target-ஐக் குறிக்கும். `BlockedReason.OTHER` unsupported route, terms அல்லது request shape ஆகலாம். Image part இல்லையெனில் model capability, SDK parameters மற்றும் response parts பார்க்கவும். `BLOCK_NONE` universal switch அல்ல; core protection மற்றும் output filtering தொடரலாம்.

## Safe retry மற்றும் bypass

Product layout, lighting, background மற்றும் authorized person image-ன் non-deceptive edit பொதுவாக retry செய்யலாம். Public figure, children, private/intimate context, sexual content, violence, self-harm, privacy invasion, impersonation அல்லது safety bypass-ல் நிறுத்துங்கள். Brand, logo, character மற்றும் protected style-க்கு rights risk சரிபார்க்கவும்.

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

Public report-ல் private images, client assets, குழந்தைகள், ID, medical images அல்லது private photos சேர்க்க வேண்டாம். API keys, project IDs மற்றும் billing identifiers நீக்கவும். பிறகு clarify once, quota காத்திருத்தல், fields படித்தல், report அல்லது stop என ஒரே முடிவு எடுக்கவும்.

## FAQ

உங்கள் சொந்த photo கூட identity, privacy, age, medical/intimate context அல்லது deception risk காரணமாக மறுக்கப்படலாம். Paid plan safety boundary-ஐ அகற்றாது. `BLOCK_NONE` output image safety-ஐ முடக்காது. Text-only response என்றால் model capability மற்றும் response structure முதலில் சரிபார்க்கவும்.

## Further Reading

- [Image Generation API](/docs/api/images/)
