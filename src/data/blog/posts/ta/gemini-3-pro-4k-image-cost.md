---
title: Nano Banana Pro 4K இலவசமா? Nano Banana 2, API pricing மற்றும் credits முதலில் சரிபார்க்கவும்
description: Nano Banana Pro மற்றும் Nano Banana 2 official 4K API pricing, Gemini Apps 1K/2K download limits மற்றும் third-party credits ownership ஆகியவற்றைத் தெளிவுபடுத்துங்கள்.
date: 2026-06-13
category: Gemini专题
tags: [Nano Banana Pro, Nano Banana 2, 4K Image Generation, Gemini API, Free Credits]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

**சுருக்கமான பதில்:** Official API-யில் Nano Banana Pro 4K output தரும்; ஆனால் 20 ஜூலை 2026 சரிபார்ப்பில் 4K Standard output-க்கு Free Tier இல்லை, உதாரண விலை சுமார் `$0.24`/image. Nano Banana 2 (`gemini-3.1-flash-image`) 4K தரும்; உதாரண விலை சுமார் `$0.151`। Gemini Apps 1K/2K download வசதி API 4K contract அல்ல.

## முதலில் entry point-ஐ அடையாளம் காணுங்கள்

Gemini Apps, AI Studio, Gemini Developer API, Cloud/Vertex மற்றும் third-party platforms-ன் limits, credits வேறுபடும். Consumer plan மூலம் API free tier அல்லது 4K விலையை ஊகிக்க வேண்டாம். Region, account eligibility, payment conditions ஆகியவற்றை உங்கள் account மற்றும் official pages-ல் சரிபார்க்கவும்.

## 4K API pricing

| Standard output | Nano Banana 2 | Nano Banana Pro |
| --- | ---: | ---: |
| Model ID | `gemini-3.1-flash-image` | `gemini-3-pro-image` |
| 1K | சுமார் $0.067 | சுமார் $0.134 |
| 2K | சுமார் $0.101 | சுமார் $0.134 |
| 4K | சுமார் **$0.151** | சுமார் **$0.24** |
| Free Tier | இல்லை | இல்லை |

இவை image-output equivalents, நிரந்தர quote அல்ல. Input images, text, retries, execution channel ஆகியவை மொத்த bill-ஐ மாற்றலாம். 100 successful 4K outputs-க்கு பட்டியல் மதிப்பு Nano Banana 2-ல் `$15.10`, Pro-வில் `$24.00`; accepted image ஒன்றுக்கான உண்மையான cost-ஐப் பாருங்கள்.

## Nano Banana 2 அல்லது Pro

இரண்டும் 4K output தரும். ஒரே prompt மற்றும் acceptance criteria-யுடன் 10–20 உண்மையான tasks சோதிக்கவும். Routine product backgrounds, social assets, simple edits-க்கு Nano Banana 2 முதலில் சோதிக்கலாம். Complex Chinese layout, multiple references, infographics அல்லது strict composition தொடர்ந்து தோல்வியடைந்தால் Pro-ஐ மதிப்பிடுங்கள். Rework மற்றும் accepted-output cost அடிப்படையில் முடிவு செய்யுங்கள்.

## Gemini Apps 1K/2K, API 4K அல்ல

Gemini Apps download size consumer feature. Google AI plan app benefits-ஐ மாற்றலாம்; Developer API image output-ஐ free ஆக்காது. Dynamic limits account, region, capacity அடிப்படையில் மாறலாம். AI Studio availability நிரந்தர free access-க்கு சான்றல்ல.

## “Free credits” யாருடையது?

100 credits-ஐ image count ஆக மாற்றும் முன் issuer, unit, model ID, 4K deduction, failure/retry billing, expiry, refund, storage, training terms பார்க்கவும். Formula: `attemptable 4K count = available credits ÷ credits per 4K generation`। இது deliverable count அல்ல.

## உண்மையான 4K-ஐ உறுதி செய்வது

`image_size`-ல் uppercase `4K` அனுப்புங்கள்; lowercase `4k` reject ஆகலாம். Model, aspect ratio, size பதிவு செய்து original file download செய்து pixel dimensions பார்க்கவும். 16:9 4K `5504 × 3072`, square `4096 × 4096` ஆக இருக்கலாம். Web preview அல்லது பெரிய canvas மட்டும் போதாது.

## GPT88 Unified Gateway

Mainland-China connectivity மற்றும் controllable billing தேவைப்பட்டால் GPT88 gateway ஒரு option. 1 CNY top-up = 1 CNY account balance; actual charge official usage × selected group multiplier. Exact pricing, model coverage, failure billing, 4K parameters gpt88.cc console-ல் பார்க்கவும். Gateway official API-க்கு மாற்றல்ல; pixel dimensions மீண்டும் verify செய்யுங்கள்.

## FAQ

### Nano Banana Pro official 4K API இலவசமா?

இல்லை. 20 ஜூலை 2026 சரிபார்ப்பில் Free Tier இல்லை; உதாரண விலை சுமார் `$0.24/image`.

### Nano Banana 2 4K உருவாக்குமா?

ஆம். `gemini-3.1-flash-image` 4K support செய்கிறது; Standard உதாரண விலை சுமார் `$0.151/image`.

### 4K-க்கு Pro அவசியமா?

இல்லை. கடினமான instructions அல்லது professional assets-க்கு Pro-ஐ மதிப்பிடுங்கள்; 4K மட்டும் போதுமான காரணமல்ல.

### Prompt-ல் “4K” எழுதினால் போதுமா?

இல்லை. API request-ல் uppercase `image_size: "4K"` அனுப்பி output dimensions சரிபார்க்கவும்.
