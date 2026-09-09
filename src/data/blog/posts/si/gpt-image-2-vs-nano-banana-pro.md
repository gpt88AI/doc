---
title: Nano Banana Pro එදිරිව GPT Image 2: Accepted-Output Cost ගණනය කරන්නේ කෙසේද
description: List price පමණක් සසඳන්න එපා. එකම quality, resolution, retries, human review සහ fixes සමඟ accepted-output cost per image ගණනය කරන්න.
date: 2026-07-30
category: ආකෘති සංසන්දනය
tags: [Nano Banana Pro, GPT Image 2, Cost, AI Image Model Comparison]
readTime: 22
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

**ප්‍රධාන කරුණ: quality, size, billing mode සහ pass rate නොදැන කිසිදු route එකක් සෑමවිටම ලාභදායී යැයි කිව නොහැක.** GPT Image 2 සහ Nano Banana Pro මිල ගණන් එකම quality/resolution lane එක නොවිය හැක. Live benchmark හෝ winner එකක් කියනවා වෙනුවට account, දිනය සහ official price source සමඟ test ledger එකක් තබන්න.

Routes දෙකටම එකම task, delivery requirement සහ retry budget දෙන්න. සෑම billed attempt, failure, human review, fix සහ rejection එකක්ම සටහන් කරන්න:

> `Total delivery cost = generation bill + review cost + fix cost`
>
> `Accepted cost per image = (G + R + F) ÷ K`

`K = 0` නම් නිගමනය “no valid winner” වේ.

## Route එක පැහැදිලි කරන්න

“Nano Banana” original, 2, Pro, Gemini App හෝ third-party route විය හැක. “GPT Image 2” official `gpt-image-2`, ChatGPT app හෝ gateway විය හැක. Model ID, account owner, billing mode, price source සහ check date නොමැති comparison එක විශ්වාසදායක නොවේ.

| Route | Owner | පරීක්ෂා කළ යුතු දේ |
| --- | --- | --- |
| `gpt-image-2` | OpenAI official API | calculator, API price, size/quality, billing |
| `gemini-3-pro-image` | Google Gemini API | current pricing, 1K/2K/4K lane |
| Third-party same-name route | provider | actual model ID, charge, limits, logs, support |

Standard, Batch සහ Flex label නැතිව මිශ්‍ර නොකරන්න. Input images, text, failures, retries, review සහ fixes list price එකෙන් පිටත විය හැක.

## Break-even Worksheet

දෙපසටම model/service/account, price source/time, target pixels/format, prompt/reference version, baseline `c`, input cost, attempts, retries, total billed `n`, failure evidence, route bill `G`, review `R`, fix `F`, accepted count `K` සහ `(G + R + F) ÷ K` ඇතුළත් කරන්න. එකම delivery quantity නොලැබුණහොත් අඩු list price එක ජයග්‍රහණයක් නොවේ.

## Character සහ Product Acceptance

Character test එකේ එකම anchor, locked features, allowed variations, final size, retry budget සහ reviewer තබන්න. Face, body, hair, clothing, props, colors සහ style වෙන වෙනම pass/fail කරන්න. ලස්සන පළමු portrait එක ප්‍රමාණවත් නොවේ; සැබෑ delivery එකේ hardest shot එක පරීක්ෂා කරන්න. එක් variable-reduction fix එකක් පමණක් දෙන්න; නැවත fail නම් route switch හෝ human repair cost සටහන් කරන්න.

Product background replacement යනු නව product එකක් generate කිරීම නොව සැබෑ SKU photo එකේ පිටත background එක පමණක් වෙනස් කිරීමයි. Logo, model, capacity, warning, color, material, outline, accessory, shadow, perspective, format සහ pixels item-by-item පරීක්ෂා කරන්න. Mask, transparent PNG හෝ compositing අවශ්‍ය නම් controllable workflow එකක් භාවිත කරන්න.

## A/B Test සහ FAQ

Licensed, non-sensitive input එකක්, target background, protection list, allowed changes සහ fixed retry budget මුලින් ලියන්න. Route ID, settings, වේලාව, account, files, rejection reasons සහ reviewer record කරන්න. Image එක නිපදවුණාද, නිවැරදි model එකෙන්ද, accepted ද, accepted output total cost එක කීයද යන්න වෙන වෙනම ලියන්න.

### කුමක් ලාභදායීද?

Same-condition ledger එකක් නැතිව universal winner කෙනෙක් නැත.

### List price පමණක් ප්‍රමාණවත්ද?

නැත; failure, retry, review, fix, input සහ accepted count එකතු කරන්න.

## Further Reading

- [Billing Units](/docs/guides/billing-units/)
- [GPT Image 2 Cost per Image](/docs/blog/gpt-image-2-cost-per-image/)
