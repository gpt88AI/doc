---
title: Gemini بظاہر harmless image رد کرے تو پہلے blocking layer پہچانیں
description: Gemini app، API prompt filtering، output image safety، quota اور policy boundaries الگ کر کے image rejection troubleshoot کریں۔
date: 2026-06-15
category: Gemini专题
tags: [Gemini, Image Generation, Safety Filtering, AI Studio, Troubleshooting]
readTime: 10
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Normal دکھائی دینے والا image prompt، upload یا edit بھی Gemini reject کر سکتا ہے۔ الفاظ بدل بدل کر filter bypass کرنے سے پہلے دیکھیں کہ “no” کس layer نے کہا: Gemini app، API prompt filter، model refusal، output image safety، unsupported route، account/quota یا حقیقی policy اور rights boundary۔

| اشارہ | ممکنہ layer | پہلے کیا دیکھیں | محفوظ قدم |
| --- | --- | --- | --- |
| App image generate/edit نہیں کرتا | app-side rejection | prompt، upload، face/real person، account، age، plan | permitted use واضح کریں، fresh session میں ایک retry |
| API `promptFeedback` یا `SAFETY` | prompt/model safety | `blockReason`، `finishReason`، `safetyRatings`، model، project | fields پڑھ کر request/settings دیکھیں |
| Prompt accepted مگر image نہیں | output safety/request shape | `IMAGE_SAFETY`، `IMAGE_PROHIBITED_CONTENT`، parts، capability | request آسان کریں؛ prohibited target ہو تو رکیں |
| count، busy یا `429` | quota/account/rate | plan، project quota، body، retry delay | limits branch؛ اسے policy rejection نہ سمجھیں |
| real people، children، sexual/violent، IP، privacy، deception | hard boundary | consent، rights، category | رکیں؛ الفاظ بدل کر نہ چھپائیں |

Safe retry کا مطلب permitted use واضح کرنا ہے: authorized product shot، non-deceptive edit، identity نہ بدلنا، صرف lighting/background تبدیل کرنا۔ “filter کو معلوم نہ ہو” یا public-figure lookalike بنانا bypass ہے۔

## Entry point اور App

App message consumer signal، API response developer object، AI Studio project/model context اور Vertex route الگ ہیں۔ `429`، count cap یا busy message عموماً quota/account state ہے، content policy نہیں۔ App rejection کو API settings bug نہ سمجھیں۔ Uploaded image میں face، child، private/medical/intimate scene، brand mark یا public-figure signal ہو تو system زیادہ محتاط ہو سکتا ہے۔ Account age، work/school controls، region، plan اور load بھی اثر انداز ہوتے ہیں۔ Original refusal محفوظ رکھیں اور صرف ایک fresh-session retry کریں۔

## API fields

`promptFeedback.blockReason` input block، `finishReason: SAFETY` candidate block، `safetyRatings` category estimate، `IMAGE_SAFETY` output filtering اور `IMAGE_PROHIBITED_CONTENT` prohibited target کی طرف اشارہ کرتا ہے۔ `BlockedReason.OTHER` unsupported route، terms یا request shape ہو سکتا ہے۔ Image part نہ ہو تو model capability، SDK parameters اور response parts دیکھیں۔ `BLOCK_NONE` universal switch نہیں؛ core protections اور output filtering پھر بھی رہ سکتے ہیں۔

## Safe retry بمقابلہ bypass

Product layout، lighting، background اور authorized person image کا واضح non-deceptive edit عموماً retry کے قابل ہے۔ Public figures، children، private/intimate context، sexual content، violence، self-harm، privacy invasion، impersonation اور safety bypass پر رکیں۔ Brands، logos، characters اور protected styles میں rights risk دیکھیں۔

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

Public report میں private images، client assets، بچوں کی تصاویر، ID، medical images یا private photos نہ ڈالیں۔ API keys، project IDs اور billing identifiers ہٹا دیں۔ Classification کے بعد ایک فیصلہ کریں: clarify once، quota کا انتظار، fields پڑھنا، report یا stop۔

## FAQ

اپنی photo بھی identity، privacy، age، medical/intimate context یا deception risk کی وجہ سے reject ہو سکتی ہے۔ Paid plan safety boundary ختم نہیں کرتا۔ `BLOCK_NONE` output image safety بند نہیں کرتا۔ Text-only response میں model capability اور response structure پہلے دیکھیں۔

## Further Reading

- [Image Generation API](/docs/api/images/)
