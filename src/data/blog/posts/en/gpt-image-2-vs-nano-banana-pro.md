---
title: Nano Banana Pro vs GPT Image 2: How to Calculate Accepted-Output Cost per Image
description: Comparing Nano Banana Pro and GPT Image 2 is not about list prices alone. Normalize quality and resolution, fold failed attempts, human review, and fixes into accepted-output cost per image, and use the break-even worksheet to judge the cheaper route.
date: 2026-07-30
category: 模型对比
tags: [Nano Banana Pro, GPT Image 2, 通过验收成本, AI 图像模型对比, 成本计算]
readTime: 22
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

**Bottom line first: no route can be called "always the cheapest" apart from quality, size, billing mode, and pass rate.** As of July 30, 2026, official `gpt-image-2` output at 1024×1024 is estimated from $0.006 (low) to $0.211 (high); Google's official `gemini-3-pro-image` (Nano Banana Pro) standard lane is $0.134 per image at 1K/2K and $0.24 at 4K. The two sets of numbers are not the same quality tier, and neither is the finished, accepted-output cost.

The truly actionable judgment is: give both precise routes the same task, the same final delivery requirement, and the same retry budget; record every billed attempt, human review, fix, and rejection; then divide by the number of accepted outputs. When the denominator is zero, the conclusion is "no valid winner," not "expensive per image."

This article did not run the two official APIs for you, and has no account billing, failure-billing, or same-input-output ledger, so it will not declare a winner here. Below, it first delivers a fill-in price normalization matrix and break-even worksheet, then uses role consistency and real product background replacement to show what "accepted" should mean.

## Step 1: Pin down exactly which two routes you are comparing

"Nano Banana" can mean at least the original Nano Banana, Nano Banana 2, Nano Banana Pro, a Gemini App subscription experience, or a provider-customized route; "GPT Image 2" can also mean the official `gpt-image-2`, the ChatGPT product experience, or a same-named service route in a third-party workbench. Prices are comparable only when the model ID, account ownership, billing mode, price source, and check date are all written down.

| Display name | Precise identifier used here | Contract owner | Where to verify the price | What it must not be conflated with |
| --- | --- | --- | --- | --- |
| GPT Image 2 | `gpt-image-2`; the official snapshot `gpt-image-2-2026-04-21` is also listed | OpenAI official API | OpenAI image-generation cost calculator and API pricing page | The ChatGPT plan experience |
| Nano Banana Pro | `gemini-3-pro-image`, as listed on the current Google pricing page | Google Gemini API | Gemini Developer API pricing page | Nano Banana, Nano Banana 2, or the Gemini App subscription |
| A same-named service route in a third-party workbench | Whichever identifier the current page shows | That access provider's service route | That provider's current page and the actual account charges | The official `gpt-image-2` API or the same-named price contract of the official Google API |

Preview, stable, or provider aliases in Google docs may change over time. If your console still shows `gemini-3-pro-image-preview`, record that exact string separately in the test table and re-check availability and price on the day of generation; do not assume it is the same endpoint just because of the "Nano Banana Pro" marketing name.

## Price normalization matrix: align the output tier before talking about cheap

The table below was checked on **July 30, 2026 (China Standard Time)**. Dollar amounts are the output estimates or provider-page estimates listed at that time by the corresponding source, excluding taxes, exchange rates, text input, reference image input, search grounding, failure billing, human review, and fixes. More sizes of the official `gpt-image-2` must be recomputed with the calculator; do not copy the 1024×1024 numbers to every size.

| Precise route | Contract lane | Quality / resolution | Current list-price baseline | Costs that must be added when normalizing | Source and boundary |
| --- | --- | --- | --- | --- | --- |
| Official `gpt-image-2` | Standard | Low, 1024×1024 | Output estimate **$0.006/image** | Text input; high-fidelity image input for edits; failures and retries | The official OpenAI calculator, not finished cost |
| Official `gpt-image-2` | Standard | Medium, 1024×1024 | Output estimate **$0.053/image** | Same as above | Same official calculator |
| Official `gpt-image-2` | Standard | High, 1024×1024 | Output estimate **$0.211/image** | Same as above | Same official calculator |
| Official `gpt-image-2` | Standard | Low / Medium / High, 1024×1536 or 1536×1024 | Output estimates **$0.005 / $0.041 / $0.165** respectively | Same as above; a non-square image being cheaper does not mean the task quality is the same | Same official calculator |
| Official `gpt-image-2` | Batch | Same size and quality as a confirmed Standard request | Official Batch image-output token price is half of Standard; compute from the actual token bill, do not invent a fixed per-image price here | Batch latency and job contract; all input tokens; failures and retries | OpenAI API pricing page; cannot be mixed with unlabeled instant Standard |
| Official Nano Banana Pro `gemini-3-pro-image` | Standard | 1K or 2K | Image output **$0.134/image** | Image input ~$0.0011/image, text/thinking, failures and retries | Official Google pricing page |
| Official Nano Banana Pro `gemini-3-pro-image` | Standard | 4K | Image output **$0.24/image** | Same as above | Same official Google pricing page |
| Official Nano Banana Pro `gemini-3-pro-image` | Batch or Flex | 1K or 2K | Image output **$0.067/image** | Batch/Flex execution conditions, inputs, failures and retries | Same official Google pricing page; not an instant substitute for Standard |
| Official Nano Banana Pro `gemini-3-pro-image` | Batch or Flex | 4K | Image output **$0.12/image** | Same as above | Same official Google pricing page |
| GPT88 `gpt-image-2` / `gemini-3-pro-image` (unified gateway) | Service-route estimate | Whatever the current workbench controls offer | Copy the current gpt88.cc console estimate on the test day | Actual size, pass rate, whether failures are billed, account and support contract | The current gpt88.cc console page; not an official OpenAI/Google price and not the lowest price anywhere |

This table answers "where the current list price comes from," but it cannot by itself answer "which finished product is cheaper." For example, dividing `gpt-image-2` Low's $0.006 by Nano Banana Pro 4K's $0.24 only shows that two non-equivalent tiers differ by 40x; it does not show that the former can complete a 4K delivery on the same acceptance line.

## Accepted-output cost and break-even worksheet

First fix one batch of workloads, for example "deliver 10 product posters with accurate Chinese titles, 1024×1024, ready to publish." The two routes may use their own supported parameters, but final pixels, text accuracy, brand protection, style, and the fix cap must be identical. Then copy this table:

| Field | Route A | Route B |
| --- | --- | --- |
| Precise model / service route / account | Standard, Batch, Flex, or a provider contract |  |
| Price source and check time |  |  |
| Target quality, pixels, and format |  |  |
| Fixed prompt / reference image version |  |  |
| Per-output baseline `c` |  |  |
| Input token or reference image cost |  |  |
| First-round attempts |  |  |
| Retries |  |  |
| Total billed attempts `n` |  |  |
| Whether failures are billed / evidence |  |  |
| Total route bill `G` |  |  |
| Review time × internal rate `R` |  |  |
| Fix time or outsourced cost `F` |  |  |
| Accepted output count `K` |  |  |
| Accepted total cost per image `(G + R + F) ÷ K` |  |  |
| Conclusion | Cheaper / tie / no valid winner | Cheaper / tie / no valid winner |

Where:

> Total route bill `G` = sum of all billed generation and edit attempts, including outputs that were eventually rejected
>
> Total delivery cost = `G + R + F`
>
> Accepted total cost per image = `(G + R + F) ÷ K`

If `K = 0`, do not divide; write "no valid winner." If the two sides pass different counts, first check whether both reached the same minimum delivery quantity; the side that did not fulfill the requirement cannot win on a low list price alone.

### A worked example where the "low list-price winner" flips

The following only shows how the worksheet computes and **is not a model benchmark run in this article**. Assume both routes need to deliver 10 images, with unified internal dollar labor rates:

| Worked field | Route A: $0.053 each | Route B: $0.134 each |
| --- | --- | --- |
| Total billed attempts | 20 | 11 |
| Route bill `G` | $1.06 | $1.474 |
| Review cost `R` | $3.00 | $1.20 |
| Fix cost `F` | $1.50 | $0.40 |
| Accepted output `K` | 10 | 10 |
| Accepted total cost per image | **$0.556** | **$0.3074** |

Route A has the lower per-call list price, but in this worked example it needed more attempts, review, and fixes, so Route B's qualified output is cheaper. The reverse is entirely possible. The real break-even condition is:

> B is cheaper than A only when `G_B + R_B + F_B < G_A + R_A + F_A`, with both sides reaching the same delivery quantity and acceptance line.

If you ignore inputs and labor and only look at the $0.053 vs $0.134 per-output baseline, then B's pass rate must be roughly `0.134 ÷ 0.053 ≈ 2.53` times higher than A's to offset the list-price gap. That ratio is only a diagnostic lead; once you add reference image input, failure billing, review, and fixes, you must return to the full ledger.

## Write down "what counts as accepted" first, or the cost denominator is meaningless

| Your main task | First asset to bring | What to check first | Branch after failure |
| --- | --- | --- | --- |
| Serial illustrations, picture books, or original character storyboards | Approved character anchor image, locked features, allowed variations | Beyond a neutral portrait, are profile/full-body, dynamic action, and controlled scenes still the same character? | Allow only one variable-reduction fix; if it still fails, switch routes or budget human repair |
| Real product background replacement | Unedited product photo, target background, SKU protection list | Are labels, numbers, colors, materials, outlines, and accessories unchanged item by item? | Switch to masking, cutout compositing, manual edge repair, or reshoot |
| Text, UI, infographic, or other image tasks | Representative prompt, target language, final size | Does the downloaded file clear the most important delivery hard gate? | Keep the current baseline and open a same-condition test for that workload |

This page compares two named routes and how to do a fair first test; it does not maintain character assets for every project. For character reference prep, drift diagnosis, shot-by-shot repair, and asset library governance, keep using the [complete consistent character workflow](/en/docs/blog/consistent-character-generator/); when a product needs transparent PNGs, masks, or edge repair, go straight to the [product background replacement and cutout compositing flow](/en/docs/blog/ai-product-background-remover/).

## Model capability determines how you accept, but it does not mean automatic acceptance

When comparing, separate at least three names: Google's Nano Banana Pro, OpenAI's official GPT Image 2, and same-named service routes in third-party workbenches. Similar names do not mean the same endpoint, parameters, cost, failure handling, or support contract.

| Name you see | Current identifier | What can be confirmed | What the name alone cannot conclude |
| --- | --- | --- | --- |
| Nano Banana Pro | `gemini-3-pro-image` | Google lists it as the Gemini image route for complex professional visual assets; current official docs say it can take multiple reference images, with up to 5 character images for character-style consistency | Five character images is not five guaranteed identity-preserving outputs, and is not proof your hardest shot passed |
| Official GPT Image 2 | `gpt-image-2` | OpenAI's Image API supports generating and editing existing images; official prompting guides show explicit preservation lists, multi-image input, and "character anchor" continuity examples | Examples are workflow evidence, not persistent character memory, a four-shot pass record, or a model win |
| A same-named service route in a third-party workbench | Whatever the current page shows | It is a service route currently shown by that access provider, testable with reference images, prompts, size, or ratio controls | It is not an official API contract; pricing, parameters, limits, logs, support, and failure billing must be checked against that service route |

OpenAI's [image generation and editing guide](https://developers.openai.com/api/docs/guides/image-generation) clearly separates generating from scratch and modifying existing images; the official [image-model prompting guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide) recommends restating "what changed, what stays" in every edit round and shows a workflow that extends a multi-page children's book with character anchors. These materials support test design; they do not support "GPT Image 2 already accepted your character."

Google's [Nano Banana image generation docs](https://ai.google.dev/gemini-api/docs/image-generation?hl=zh-cn) map Nano Banana Pro to `gemini-3-pro-image` and list the current input boundaries for reference images, character images, and style references. Input capacity only says how you may structure an experiment; it does not prove that faces, hairstyles, body shapes, clothing, or props in the output will stay stable.

## What "character consistency" must actually verify in Chinese contexts

"Character consistency" fits whether an original fictional character's identity and visual settings stay continuous across multiple images; "person consistency" more easily evokes real people; "face consistency" only covers the face and cannot speak for body, clothing, props, and art style; "character reference" is an input method, not a result; "persistent character" implies cross-task memory, which cannot be claimed just by uploading a reference image or one nice output.

To keep tests away from impersonating real people and to avoid substituting famous copyrighted characters for "the model remembers many training images" as "consistency ability," this article uses the original fictional character "Lanzhou":

- Approved anchors: short silver-gray hair, amber eyes, a small mole at the end of the left eyebrow, a narrow face, a short dark-blue scarf;
- Fixed clothing: an asymmetric gray-green short coat, a brown cross-body tool bag, a brass compass;
- Fixed art style: low-saturation hand-drawn adventure picture book, clean ink lines, soft paper texture;
- Allowed to vary: expression, action, camera angle, weather, and scene lighting;
- Not allowed to vary: face shape, mole position, hair outline, body proportions, scarf color, tool bag, and compass.

The most important thing here is not how long the prompt is, but that the team first decides "what must not change" and "what the hardest shot is." If the final delivery requires a full-body running shot, four close-up frontal portraits cannot serve as passing evidence.

## The four-shot character consistency acceptance card

Copy one blank card for Nano Banana Pro and one for GPT Image 2. Both sides use the same approved anchor version, the same locked features, the same allowed variations, the same final display size, a fixed retry budget, and the same reviewer. Interface parameters do not have to pretend to match item by item, but every functional difference, extra reference image, and manual treatment must be recorded.

### Card header

| Field | What to fill in |
| --- | --- |
| Character / project identifier | e.g., Lanzhou / Picture Book Ch. 03 |
| Approved anchor version | File name, version, and location of the non-overwritable original |
| Locked identity features | Face shape, identifying marks, body proportions, hair, clothing, fixed props, colors, and visual language |
| Allowed variations | Expressions, actions, camera positions, scenes, weather, or clothing layers allowed this round |
| Route / model ID / evidence owner | `gemini-3-pro-image`, official `gpt-image-2`, or an explicitly written service route |
| Reference pack and route settings | Files actually uploaded, order, size, ratio, quality, and any route-specific settings |
| Fixed retry budget | First round plus how many fixes per route; forbidding adding attempts to a favorite route later |
| Hardest required shot | Pick from real delivery, not the easiest frontal portrait |
| Reviewer / evidence date | Same reviewer; record local date and final files |
| Delivery size check | Pixels, ratio, format, and real display size of the downloaded file |

### Per-shot determination for the four shots

Fill each cell with "pass / fail + one observable sentence," not just a total score. When choosing between profile and full body, pick whichever is harder in the real delivery.

| Shot | Change required | Face & identifying marks | Body & proportions | Hair | Clothing & props | Visual language | Delivery size | Rejection symptom | Minimal fix | Conclusion |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1. Neutral portrait | Front-facing, natural expression, clean background |  |  |  |  |  |  |  |  | Pass / fix / switch |
| 2. Profile or full body | Choose the harder one for the real project |  |  |  |  |  |  |  |  | Pass / fix / switch |
| 3. Dynamic action | e.g., running across a rope bridge and looking back |  |  |  |  |  |  |  |  | Pass / fix / switch |
| 4. Controlled scene / style stress | Change only night-rain lighting, keep the art style |  |  |  |  |  |  |  |  | Pass / fix / switch |

### Pass, fix, and switch rules

A route passes only when both the locked features and the "hardest required shot" meet the pre-written threshold. Four images assembled into a nice grid, a platform returning success, a downloadable file, or a very similar first portrait cannot replace per-shot acceptance.

When a necessary dimension fails, allow only one "variable-reduction fix": keep the same anchor and acceptance line, reduce scene clutter, action range, or the number of simultaneously changing items, and explicitly require fixing only the failed item. If it still fails after the fix, switch routes, or list manual redraw, compositing, and face repair time as explicit budget; do not hide consecutive attempts, and do not submit only the best image in the report.

At the bottom of the card, record:

| Cost and stop field | What to fill in |
| --- | --- |
| Total billed attempts | First round, fix rounds, and failed attempts all count |
| Accepted output count | Only images that fully meet the delivery line |
| Total billed route cost | Actual cost of first round, fix rounds, and failed attempts combined; listed separately from the attempt count |
| Human review cost | Recorded separately by reviewer, hours, and internal rate |
| Human fix cost | Estimated per accepted image still needing fix time, at the internal rate |
| Accepted route cost per image | Total billed route cost ÷ accepted output count |
| Accepted total cost per image | (Total billed route cost + human review cost + human fix cost) ÷ accepted output count |
| Overall conclusion | Pass / fix once more / switch route / no winner on either side |
| Stop rule | Stop at the fixed budget, a second failure of the hardest shot, or when evidence cannot be saved |

When the denominator is zero, write "no accepted output" directly; do not disguise it as a very high but still comparable unit price. Which route wins right now remains unknown; only a same-condition test that keeps inputs, settings, all attempts, rejection reasons, downloaded files, and acceptance records can answer it.

This four-shot card only serves this page's two-route choice. How to build a character sheet, pick reference images, handle drift, fix failed shots, and maintain a reusable character library is handled by the [complete consistent character workflow](/en/docs/blog/consistent-character-generator/), so a model comparison page does not have to duplicate an incomplete method.

## Product background branch: generating a product image is not replacing a real product's background

Many "product photography comparisons" actually let the model generate a new cup, a new pair of shoes, or an ad image from text. They can compare composition, lighting, texture, and text rendering, but they cannot prove the model can preserve the SKU you actually have.

The input to product background replacement is an existing, real product photo. The task is not to reimagine the product; it is to change only the area outside the product. Acceptance must be able to answer:

- Is the outline of the bottle, shoe upper, bag shape, or part identical to the original?
- Do the logo, model, capacity, unit, warnings, and variant names stay word-for-word unchanged?
- Do color, texture, transparency, reflection, and material still represent the actual product?
- Do the new background's contact point, shadow, light direction, proportion, and perspective hold up?
- Do the downloaded file's pixels, format, transparency behavior, and final display size meet the delivery requirement?

If what you actually need is background removal, transparent PNG, masks, edge repair, or compositing the original product layer into a new scene, do not force the task into a model showdown. Go straight to the [product background replacement and cutout compositing flow](/en/docs/blog/ai-product-background-remover/) and pick the more controllable route by product risk.

## Write an A/B test card before starting product background replacement

The test card exists to stop the team from moving the acceptance line after seeing a pretty background. Pick just one representative original image, but not the easiest one: round one should choose an item from the real catalog with harder edges, labels, reflections, or transparency.

### Fixed inputs

1. One licensed, non-sensitive product original that is not over-compressed;
2. One clear publishing purpose, e.g., storefront first image, ad scene, or catalog white-background image;
3. One target background, including color, scene, tabletop, light direction, and canvas ratio;
4. One SKU protection list;
5. One list that only allows background changes;
6. Equal output intent and a fixed retry budget;
7. A record of the current route ID, settings, time, account owner, and final files.

Platform rules should be re-confirmed against the corresponding seller backend or official help page before publishing. Taobao, JD, Douyin, Xiaohongshu shops, and independent sites do not share one permanent "e-commerce white-background spec"; this article does not extrapolate the requirements of one platform, category, or placement to all Chinese e-commerce channels.

### Product protection list

Replace "keep the product unchanged" with observable descriptions:

- Outline, geometry, holes, handles, straps, thin chains, and included accessories;
- Brand, labels, spelling, numbers, units, marketing copy, and variant identifiers;
- Color, material, texture, transparency, reflection, highlights, and surface detail;
- Camera angle, crop, product proportion, and the parts actually present in the frame.

### Only allowed to change

- The original background and its clutter;
- The tabletop, wall, or solid color of the new scene;
- Background lighting that matches the new environment;
- Contact shadow and cast shadow, but not by altering product structure;
- Canvas ratio and whitespace explicitly required by the target placement.

## A directly editable test task

Assume the input is a real 300 mL amber pump bottle. The following is an example task contract, not something this article has run or verified on this product:

> Replace the original background with a light-gray seamless studio tabletop, with the key light entering from the upper left. Keep the bottle's width-to-height ratio, pump structure, amber transparency, right-side highlight, brand text, label layout, and "300 mL" completely unchanged. Allow a subtle contact shadow to be rebuilt to match the new tabletop. Do not add water drops, plants, towels, efficacy text, decorative accessories, or unsold combinations. If any label, number, color, reflection, outline, or accessory changes, the result should be rejected.

Give this text and the same original image to both routes. Both sides may use whatever interface or controls they currently support, but do not give one side extra reference images, extra manual retouching, or more retries to make it win. Numeric parameters do not have to map one-to-one, so fix the business intent, final display size, quality threshold, and budget — not force the parameter names of different vendors to be identical.

## Run the A/B test in these six steps

### 1. Save a non-overwritable original

Make a read-only copy of the original and record the SKU, shoot time, file size, color space, target channel, and usage license. Do not use chat screenshots, platform thumbnails, or already heavily compressed downloads for fidelity tests.

### 2. Anonymize the two routes

Temporarily rename output files to A and B so the reviewer cannot see the model name first. This does not remove all subjective bias, but it reduces the influence of "I already like a certain brand." Restore route IDs and settings after review.

### 3. Fix the first-round and retry budget

Give each route one first-round output, then reserve the same number of retries for fixable background issues. When product facts change, do not treat it as ordinary art feedback and keep re-rolling indefinitely; record the rejection reason first, then decide whether the remaining budget is worth using.

### 4. Pass the hard gates first, then judge aesthetics

Check in the following order:

| Acceptance gate | Pass standard | Typical rejection |
| --- | --- | --- |
| Product identity | Outline, angle, crop, and accessories match the original | Missing parts, deformation, changed angle, fabricated accessories |
| Labels and text | Logo, model, numbers, units, and claims word-for-word correct | Changed glyphs, rewritten capacity, rearranged labels |
| Color and material | Still match the actual variant and real material | Black turned navy, glass turned plastic, texture lost |
| Edges | No white edge, rough edge, jaggies, broken edge, or color contamination | Transparent edges filled in, thin chains cut off |
| Light and shadow | Contact point, shadow direction, and softness match the new scene | Floating product, two conflicting shadows, wrong reflection |
| Delivered file | Pixels, format, transparency behavior, and display size pass | Only checked the preview, download size mismatched, transparent bottom failed |

Any hard product-fact gate failing means the whole thing fails. Do not pass a wrong product by averaging "background 9, label 3, average 6."

### 5. Side-by-side, overlay, and thumbnail checks

- View labels, edges, and materials side by side at 100% display scale;
- Align the product body and do a semi-transparent overlay or quick A/B switch to find outline and angle jumps;
- Shrink to the list size a buyer actually sees and confirm the model, variant, and product identity are still clear;
- Finally check the downloaded file, not just the web preview or a "4K" label.

### 6. Write it into the decision ledger

Record at least the following for every attempt:

| Field | Route A | Route B |
| --- | --- | --- |
| Route and model ID |  |  |
| Input file and target background | Same | Same |
| Parameters, ratio, quality, or resolution |  |  |
| First-round result | Pass / reject | Pass / reject |
| Rejection reason |  |  |
| Billed attempt count |  |  |
| Actual cost of all billed attempts |  |  |
| Whether the final file was downloaded and verified |  |  |
| Latency and errors |  |  |
| Actual charges and whether failures are billed |  |  |
| Human review cost |  |  |
| Human fix cost |  |  |
| Accepted total cost per image |  |  |

"Accepted total cost per image" is computed as:

> (actual cost of all billed attempts on that route + human review cost + human fix cost) ÷ number of accepted images

The billed attempt count is only for reviewing retry efficiency and cannot be added to currency costs. When the denominator is zero, do not pretend to have a very high per-image cost; record "no accepted output" directly.

## All five conclusions are valid

### Nano Banana Pro wins this test

Write this only when it passes every hard gate on this original image, this background target, these settings, and the current account route, while the other route did not. The conclusion must be limited to this test; it cannot be expanded to "Nano Banana Pro is always better for e-commerce."

### GPT Image 2 wins this test

Same rules. If the actual test used the official `gpt-image-2`, record the official account, endpoint, and charges; if it used a GPT Image 2 service route in a third-party workbench, the conclusion can only belong to that service route and cannot be borrowed as an official API result.

### Tie

When both pass, choose by accepted total cost, processing time, existing account, logs, rollback, and support path. Different art styles do not have to be forced into a winner as long as both complete the same business task.

### No winner

If both sides changed product facts, exceeded the retry budget, or could not deliver a qualifying file, record no winner. This conclusion is not surprising for high-risk SKUs.

### Stop generating and switch to another production route

If product pixels must be preserved as much as possible, prioritize masking, cutout compositing, or manual edge repair; if the original itself is blurry, cropped, occluded, or has reflections that conflict with the target scene, a reshoot may be more reliable than continuing to generate.

## In GPT88, do only a limited smoke test

As of July 30, 2026, the [Agent image workbench](https://agent.gpt88.cc) public page of GPT88 lets you open prompt input and optional reference image upload, and offers controls for size, ratio, or resolution. Actual generation requires a currently valid API key; cost, quota, logs, failure rules, and support scope follow your account and the selected group rules. The exact route labels for Nano Banana Pro and GPT Image 2 in the workbench follow the page on the day of use. Specific pricing and quotas are subject to the gpt88.cc console.

Character consistency smoke test:

1. Upload only licensed original fictional character anchors, and record which files the current workbench actually accepts;
2. First select Nano Banana Pro, run the four shots separately, and save the route label, reference files, prompt, ratio, size, and time;
3. Switch to the GPT Image 2 service route, reusing the same anchors, locked features, four-shot task, final display size, and retry budget;
4. Download each final file and have the same reviewer fill in the four-shot card;
5. Record failed attempts, minimal fixes, errors, charges, and human time, then decide pass, fix, or switch.

Product background smoke test:

1. Upload the same licensed, non-sensitive product original;
2. First select Nano Banana Pro, paste the fixed task contract, and record model ID, ratio, resolution, and time;
3. Switch to the GPT Image 2 service route, reusing the same original, task contract, final display intent, and retry budget;
4. Download both final files and review them against the product A/B acceptance table;
5. Record rejections, errors, charges, and human time, then decide whether to continue.

The workbench opening, a model appearing in the list, a request returning success, or a preview showing does not prove that character consistency or product background replacement has reached production quality. This article also did not complete, download, and repeatedly verify four-shot character output or a product-background-replacement finished image while writing it, and it cannot be used to claim GPT88 has cross-task persistent character memory.

If your goal is to use OpenAI's official `gpt-image-2` API directly, you must rerun the test on an official account and official endpoints. Do not treat the parameters, prices, limits, logs, support, or failure billing of a third-party workbench service route as an official contract.

## When you should stop testing immediately

- The hardest required shot still changes the face shape, identifying marks, body proportions, hair, fixed clothing, or props after one variable-reduction fix;
- You can only maintain "looks consistent" by re-rolling repeatedly and cherry-picking the best result;
- Labels, numbers, units, logos, or variant identifiers are rewritten;
- The product outline, proportion, angle, accessories, or transparent areas change;
- The same failure repeats within the fixed retry budget;
- The downloaded file does not match the size, format, or transparency behavior promised by the interface;
- You cannot find out whether a failure is billed, or you cannot save the necessary review records;
- The publishing channel rules have not been confirmed;
- The original image itself cannot support a credible edit.

The stop rule is not over-conservatism; it prevents a pretty background from hiding a wrong product.

## FAQ

### Which is actually cheaper, Nano Banana Pro or GPT Image 2?

Looking only at the official output list prices on July 30, 2026, the answer depends on `gpt-image-2`'s quality and size, and whether Nano Banana Pro uses Standard, Batch, or Flex; these tiers are not naturally equivalent. Production decisions should compare accepted total cost per image under the same delivery requirement, and allow a tie or no valid winner.

### Why can't I directly compare a third-party gateway's service estimate with official OpenAI pricing?

Because a third-party gateway's visible estimate corresponds to its service route, not the official `gpt-image-2` API contract. Service prices, sizes, parameters, failure billing, logs, and support belong to that route; only when you mark each contract separately in the test table and verify the actual bill can you compare them as two procurement routes.

### Batch or Flex is cheaper — should I just pick it?

Not necessarily. Batch, Flex, and Standard differ in latency, submission method, and availability conditions. Only when asynchronous delivery also meets the business deadline, and quality, size, input cost, and failure handling stay comparable, should they enter the same candidate set; when you need instant images, a lower batch list price may not be a valid route.

### Why does the table use dollars instead of renminbi?

Official sources price in dollars, while exchange rates, taxes, payment channels, and account settlement can change. Keep the original dollar bill and add a "local currency cost" column at the exchange rate actually recorded by finance; do not substitute a single exchange rate from the article's publish date for real deductions.

### For character consistency, is Nano Banana Pro always better than GPT Image 2?

You cannot conclude that. Google's current docs let Nano Banana Pro use multiple character references, and OpenAI's official guide shows character anchors and explicit preservation lists; both are only a basis for designing tests, not evidence of a win. The same original character must pass the same four-shot card, then you judge by the hardest required shot and the accepted total cost.

### Does supporting up to 5 character images mean Nano Banana Pro is more stable?

No. Reference image capacity is an input contract, not an output guarantee. Five contradictory, angle-repeating, or version-mixed reference images can even make acceptance harder. Record the files actually uploaded and their order, and check face and identifying marks, body proportions, hair, clothing props, visual language, and delivery size in four separate shots.

### The face looks similar — why is character consistency still not accepted?

Character identity is not just a face. Full-body proportions, hair outline, fixed clothing, props, colors, and art style can drift in profile, dynamic action, or wide shots. If the real delivery needs a full-body running shot, four close-up frontal portraits cannot prove the route works.

### Do all four shots have to be generated at once?

No. To let each shot be rejected independently, generating and saving evidence separately is usually clearer. The key is that both routes use the same approved anchors, locked features, allowed variations, hardest shot, delivery size, and retry budget — not that different interfaces have identical parameter names.

### After passing one card, can I assume the model remembers it forever?

No. A four-shot pass only proves this task was completed with the current reference pack, current route, current settings, and current evidence date. New chapters, style switches, clothing versions, or new sessions without references all need re-verification. For versioning, fixing, and library maintenance of long-term character assets, use the [complete consistent character workflow](/en/docs/blog/consistent-character-generator/).

### For product background replacement, is Nano Banana Pro always better than GPT Image 2?

You cannot conclude that. Right now there is no universal winner bound to the same real product original, same background target, same protection list, same retry budget, and final file acceptance. Run a local A/B test first, and limit the conclusion to the current SKU, route, settings, and time.

### Is generating one image per side with the same prompt a fair test?

Not enough. You also need to fix the original image, target background, product protection items, final display size, quality threshold, and retry budget, and check the downloaded files. Different vendors' parameters do not fully correspond, so the core of fairness is the same business task and the same acceptance line.

### Why can't I just use online cup or shoe comparisons to pick a model?

Generating a "product-like thing" from text mainly tests composition and visual style. Real product background replacement must protect the labels, colors, materials, geometry, and accessories of an existing SKU — a stricter, different task.

### Is the GPT Image 2 in a third-party workbench the official GPT Image 2?

It is not the same contract. What a third-party gateway workbench shows is its service route; the official OpenAI model identifier is `gpt-image-2`. The two must be checked separately for pricing, parameters, limits, logs, support, and failure billing.

### Does supporting reference images guarantee the product stays unchanged?

No. Reference images and high-fidelity input help the model understand the original, but they do not constitute pixel locking or a commercial acceptance guarantee. The final output still has to be compared item by item against the unedited original.

### What if both sides fail?

Record "no winner" and do not keep re-rolling indefinitely. If the product must stay accurate, switch to cutout compositing or manual edge repair; if the original is missing key information, heavily compressed, or lit wrong for the target scene, look for the original file or reshoot first.

### How many SKUs should I test before switching to production?

Round one validates whether the test table catches problems using one hard, representative SKU. To switch to batch production, you still need samples covering different colors, materials, transparency, thin edges, and label density, plus a stop-line rule. Do not extrapolate the whole catalog from one passing image.

### After acceptance, which route is cheaper?

Compute from the actual charges on your current account rather than copying a permanent price table. Add failed attempts, retries, human review, and fix time, then divide by the number of accepted images. Without accepted images, the cheapest single call has no production value. Specific pricing and quotas are subject to the gpt88.cc console.
