---
title: "Gemini AI Photo Prompts: 10 Copy-Paste Chinese Templates and an Edit-Acceptance Method"
description: 10 copy-paste, acceptance-ready Chinese Gemini AI photo prompt templates covering portraits, single-element edits, background swaps, product shots, Chinese posters, multi-image composition, and single-variable fixes — each with replacement fields, protected items, and acceptance criteria, plus how to change only one variable at a time after a failure.
date: 2026-07-22
category: 技术教程
tags: [Gemini, AI Photo Prompts, Image Editing, Chinese Prompt, AI Portraits]
readTime: 18
relatedPath: /docs/guides/agent-image-studio/
relatedTitle: Agent Image Studio
---

When copying Gemini AI photo prompts, don't just paste a string of "realistic, HD, cinematic." A way of writing that genuinely reduces rework is to split one sentence into four columns: **what you're doing this time, which content to replace, which details must not move, and what visible result counts as a pass**. All 10 Chinese templates below follow that structure; you only need to replace the bracketed fields and paste them into a workflow you may legally use and that supports the corresponding image operations.

First, remember the difference between generation and editing: generating from scratch lets the model create within the brief; editing an existing image must name the input image, the single change, the frozen scope, and the acceptance conditions. Before uploading real photos, also confirm the subject's informed consent, material usage rights, and the actual purpose. A prompt can request preserving appearance, but it cannot guarantee identity stays absolutely unchanged.

## Before Using in Mainland China, Confirm Which Entry You Actually Have

As of July 22, 2026, Google's [Gemini Web app support page](https://support.google.com/gemini/answer/13575153?hl=en) lists "Mainland China" as "Workspace only." Google's [image generation and editing explanation](https://support.google.com/gemini/answer/14286560?hl=en) also stresses that feature availability depends on the specific app's supported languages and countries/regions; personal, work, or school accounts, plus age and licensing, can bring different restrictions.

That means "supports Simplified Chinese" does not equal "a personal account in mainland China can definitely enter the same image features." This article does not provide VPN, region-switching, borrowed overseas accounts, proxy payments, or any other workaround, nor does it conflate the availability of the API, Cloud, third-party web pages, and the Gemini app. If your account has no officially available image entry, you can still treat the templates below as a route-neutral creative brief to hand to an image tool you're entitled to use or to a team design workflow.

## Four Steps Before Copying

1. **Pick the operation**: generate from scratch, edit an existing image, swap the background, compose multiple images, or fix a previous version — choose only one primary action.
2. **Fill in the replacements**: replace every `[bracketed field]` with your own subject, scene, ratio, copy, or edit target.
3. **Lock the protections**: state explicitly which character features, product structures, composition, text, lighting, or brand elements must not change.
4. **Write the acceptance criteria**: use standards you can see, compare, and judge — for example "only 1 person appears," "packaging text matches word for word," "original crop unchanged."

Brackets are just a reminder to fill in variables; they aren't special Gemini syntax. If the interface has its own frame, size, or export settings, set those there first and also record the requirements in the project brief; don't expect writing "4K" in the prompt to automatically produce a file at the specified pixel dimensions.

## 10 Copy-Paste Gemini AI Photo Prompts

### 1. Generate a Natural Professional Headshot from Scratch

Suitable for a fictional adult or an authorized person's personal-page headshot direction; not suitable for ID documents, identity verification, or impersonation.

- **Replace**: `[subject]`, `[professional temperament]`, `[background color]`, `[clothing]`, `[frame]`
- **Protect**: only one adult appears; no text, badges, brand logos, or extra accessories
- **Accept**: head-and-shoulders complete, both eyes clear, natural facial proportions, clean background, no extra people or text

```text
Operation: generate a natural, credible professional headshot photo from scratch.

Subject: an adult [subject, e.g., "fictional female product designer around 30 years old"], expressing [professional temperament, e.g., "focused, approachable, not overly posed"]. Wearing [clothing]; do not use a recognizable company uniform or badge.

Scene and composition: a clean [background color] studio background, head-and-shoulders composition, eyes looking at the camera, camera level with the eyes, frame of [frame, e.g., "1:1"]. Use soft key light and a slight rim light, keep real skin texture, no plastic smoothing.

Protection: only one clearly adult person appears; no text, logo, ID badge, headphones, handheld items, or background decoration; do not mimic a specific real person or a living public figure.

Output intent: a personal-page headshot draft for non-official identity use.

Pass criteria: the top of the head and both shoulders are not accidentally cropped; both eyes are clear; facial features, hands, ears, and hairline look natural; the background color is uniform; no extra people, text, or brand elements in the frame.
```

### 2. Make a Professional Portrait Photo from an Authorized Photo

Only upload when the subject has given informed consent and you hold the rights to edit and use it. For photos of clients, colleagues, or family, "they sent it to me" does not automatically mean you may publish, run ads, or train other systems with it.

- **Replace**: `[input image number]`, `[purpose]`, `[clothing adjustment]`, `[background]`
- **Protect**: recognizable appearance, face shape, hairstyle, pose, crop, and natural skin tone
- **Accept**: item-by-item comparison against the original; no identity drift, no extra jewelry, no background continuity errors

```text
Operation: edit my uploaded, personally authorized [input image number, e.g., "image 1"] into a professional portrait photo for [purpose, e.g., "an internal company instructor intro page"].

Single goal: replace the original background with [background, e.g., "a light-gray seamless studio background"] and adjust the clothing to [clothing adjustment, e.g., "a dark blue casual blazer with no brand marks"].

Must keep: the person's recognizable appearance, face shape, eye spacing, nose-lip relationship, hairstyle, apparent age, natural skin tone, expression, head angle, shoulder pose, and original crop. Do not change body shape, and do not add jewelry, glasses, tattoos, makeup, or company badges.

Lighting: keep the new background's light direction consistent with the person's original lighting; only do necessary edge and shadow blending; do not reshape the face.

Output intent: a natural professional portrait candidate, not for ID documents, attendance, face recognition, or false endorsement.

Pass criteria: when compared at full size against the original, identity features and pose stay stable; hair edges are clean; the background has no leftover old-scene residue; clothing has no logo; no new people or text appear. Failing any item means failure.
```

### 3. Modify Only One Element in a Photo

When you only want to change a clothing color, remove a table object, or adjust one decoration, the most important thing is not "make it prettier" but to write the single change narrowly.

- **Replace**: `[input image]`, `[target element]`, `[original state]`, `[new state]`
- **Protect**: everything except the target element — pixel relationships, the person, camera position, crop, background, text, and lighting
- **Accept**: only the target element changes; everything else stays visually stable against the original

```text
Operation: edit the uploaded [input image], modifying only one specified element.

Single change: change the [target element, e.g., "the person's coat"] from [original state, e.g., "off-white"] to [new state, e.g., "low-saturation dark green"]. Keep the existing material texture, fold direction, button count, collar shape, and light response.

Must keep: the person's appearance, expression, hairstyle, gesture, body proportions, other clothing, background, table objects, camera position, perspective, depth of field, crop, lighting, and any existing text in the frame. Do not auto-beautify the face; do not add accessories.

Output intent: an edit result where only the specified element changes.

Pass criteria: at full size against the original, only the [target element]'s [original state] becomes [new state]; no color bleed at edges; the position, shape, count, text, and lighting of all other objects show no visible drift.
```

### 4. Swap the Background While Preserving Edges, Shadows, and Perspective

Suitable for background replacement of a person, pet, or single object. If the original subject's edges are blurry, occluded, or semi-transparent, acknowledge the material limitation first; don't ask the model to fabricate real detail that is hidden.

- **Replace**: `[input image]`, `[subject]`, `[new background]`, `[scene purpose]`
- **Protect**: subject outline, pose, size, camera angle, and original crop
- **Accept**: no halos at edges; contact shadows, vanishing point, light direction, and color temperature consistent

```text
Operation: replace the background of the uploaded [input image].

Subject: fully keep the [subject, e.g., "the wooden side table and the lamp on it"]. Do not redesign the subject; do not change its outline, proportions, material, texture, wear marks, placement angle, or size in the frame.

New background: replace with [new background, e.g., "a softly lit modern apartment living room with light walls and gray concrete floors"], used for [scene purpose, e.g., "a furniture catalog scene shot"].

Blending requirements: match the original camera height, focal-length feel, and perspective; let contact shadows fall in the correct direction; keep subject edges, cutouts, and fine structures clean; make the background light direction match the subject's existing highlights.

Must keep: original crop, subject position, foreground occlusion relationships, and all text or marks on the subject. Do not add people, pets, plants, decorative text, or brand logos.

Pass criteria: subject geometry and texture stay stable against the original; edges have no white borders, halos, or leftover old background; contact shadows look natural; ground and subject share the same perspective; no new objects occlude the subject.
```

### 5. Generate an Acceptance-Ready E-commerce Product Image

Product images are most likely to quietly break packaging, connectors, labels, or proportions while "looking premium." Brand text and real product structure should follow the original assets; AI results must be manually compared and must not be treated as unverified product facts.

- **Replace**: `[product input image]`, `[background]`, `[selling atmosphere]`, `[frame]`
- **Protect**: product geometry, packaging colors, label text, logo shape, connectors, and count
- **Accept**: outline and labels match item by item; no fabricated accessories or claim text

```text
Operation: use the uploaded [product input image] to create an e-commerce hero-image candidate; change only the staging, not the product design.

Subject: keep the product centered, fully visible, occupying about [ratio, e.g., "70%"] of the frame height. Background of [background, e.g., "a warm-gray seamless countertop"], add [selling atmosphere, e.g., "soft side light and a very light natural shadow"], frame of [frame, e.g., "4:5"].

Must keep: the product's length-to-width ratio, corner radii, cap or connector position, part count, packaging colors, material reflections, existing logo shape, and the approved text on the label. Do not fill in unreadable text; do not invent certifications, specs, awards, gifts, or claims.

Output intent: a product visual candidate for e-commerce layout review; manual verification is still required before listing.

Pass criteria: when compared side by side with the product input image, geometry, connectors, logo, colors, and original label text match item by item; the product has no missing or extra parts; the background is clean; shadows contact the product; no promotional text is added.
```

### 6. Generate a Chinese Event Poster with Accurate Text

Even if image models have improved text rendering, it doesn't equal word-perfect output. List the approved copy separately, use only short text, and check word by word at acceptance. Long descriptions, prices, date details, and legal copy belong in post-layout instead.

- **Replace**: `[main title]`, `[subtitle]`, `[call-to-action text]`, `[visual theme]`, `[ratio]`
- **Protect**: approved copy word for word; no extra text, numbers, QR codes, or logos generated
- **Accept**: three lines of text match word for word, hierarchy correct, no gibberish or repeated characters

```text
Operation: generate a Chinese event poster visual from scratch, using [visual theme, e.g., "fresh summer plants with glass water ripples"], ratio of [ratio, e.g., "4:5"].

Only the following three approved text lines may appear; render them word for word:
Main title: "[main title]"
Subtitle: "[subtitle]"
Call to action: "[call-to-action text]"

Layout: the main title at the top as the first visual tier; the theme graphic in the middle; the subtitle below the main visual; the call-to-action text in the bottom whitespace. Fonts clear, modern, and sufficiently contrasted; no handwritten ligatures; don't let graphics cover the text.

Protection: do not add dates, prices, URLs, QR codes, logos, English translations, decorative pseudo-text, or a fourth text line. Quotation marks must not appear in the final image.

Output intent: a short-copy poster candidate for design review.

Pass criteria: the main title, subtitle, and call-to-action match the approved text above word for word; no typos, missing characters, repeated characters, or gibberish; the three tiers are in the correct order; no text is cropped; no extra text exists in the frame. If any single character mismatches, mark it as failed and use a layout tool for the text.
```

### 7. Make a Social Cover with Reserved Layout Space

If you plan to add titles in Canva, Figma, or another layout tool, letting the generative model produce only a text-free background is usually far easier to accept.

- **Replace**: `[theme]`, `[main visual]`, `[whitespace position]`, `[platform ratio]`
- **Protect**: the designated whitespace has no people, no high-contrast detail, and no text
- **Accept**: the subject is recognizable in thumbnail; the title safe area is complete; no pseudo-text

```text
Operation: generate a text-free background image for [platform ratio, e.g., "a 16:9 video cover"].

Theme: [theme, e.g., "how to organize travel photos"]. Main visual of [main visual, e.g., "a stack of scattered photos being filed into three neat album boxes"], placed in the [subject position, e.g., "right two-thirds of the frame"].

Composition: keep a continuous, low-detail, high-readability title safe area in the [whitespace position, e.g., "roughly the left 35%"]. The subject must still be identifiable at small thumbnail sizes; use clear foreground/background layering; don't clutter with decoration.

Protection: no text, letters, numbers, logos, watermark-like marks, buttons, UI, or QR codes anywhere in the image; the title safe area must contain no faces, hands, sharp outlines, or high-contrast textures.

Output intent: produce it for a layout tool to add a human-reviewed title.

Pass criteria: the main visual remains identifiable when shrunk to [check size, e.g., "a 320x180 pixel preview"]; the [whitespace position] forms a complete title area; no pseudo-text anywhere; the subject doesn't intrude into the title safe area.
```

### 8. Assign Explicit Roles to Multiple Reference Images

"Reference these images" is too vague. Each input must take one clear responsibility: one controls the subject, one the scene, one the material or palette; don't let different images fight over the same person's identity.

- **Replace**: `[image 1]`, `[image 2]`, `[image 3]`, `[final scene]`
- **Protect**: each image's role boundary; don't blend logos, text, people, or unrelated objects
- **Accept**: you can state what each input contributed; no role crossover or structural fusion

```text
Operation: combine three authorized reference images into a new [final scene, e.g., "a desk fragrance product scene"].

Input roles:
- Image 1 handles only the subject product: keep its geometry, packaging, label, and colors.
- Image 2 handles only the environment layout: reference the desk, wall, and window-light relationships, without copying its products, people, or text.
- Image 3 handles only material and palette: reference fabric texture and a combined color board, without copying specific objects, patterns, or logos.

Composition: place image 1's subject at the [position] in the frame, use image 2's spatial relationships, and use image 3's [specified color] as a secondary accent. Frame of [frame].

Protection: don't fuse brand marks from different images; don't graft objects from image 2 or 3 onto the subject; don't add people, text, gifts, or product features.

Output intent: a multi-reference composite candidate with traceable roles.

Pass criteria: subject geometry and labels come from image 1; space and light direction follow image 2; only material and palette are borrowed from image 3; no extra logos, text, people, fused parts, or count changes.
```

If your actual entry has limits on reference-image count, format, or total size, follow that entry's current interface and official docs. The reference-image contract of the Gemini app and the Developer API are not interchangeable; don't infer that an app supports the same count because some API model allows it.

### 9. Convert an Authorized Photo into Original Illustration Language

Style conversion should describe observable artistic attributes — line, palette, material, and light — rather than demanding a full copy of some living artist's personal style. Real-person photos still need rights and consent; "preserve identity" is just an editing requirement, not a biometric guarantee.

- **Replace**: `[input image]`, `[illustration language]`, `[detail to keep]`, `[purpose]`
- **Protect**: the authorized subject's pose, outline, clothing structure, and original crop
- **Accept**: style changes but key structure stays stable; no new people, text, or sensitive meaning

```text
Operation: convert the [input image] I have the right to edit into an original illustration visual, for [purpose].

Illustration language: [illustration language, e.g., "soft opaque gouache blocks, a slight paper grain, clean outlines, low-saturation teal-and-warm-orange palette"]. Do not imitate or credit a specific artist, photographer, studio, or living creator.

Must keep: [detail to keep, e.g., "number of people, recognizable appearance, hairstyle outline, head angle, pose, clothing structure, foreground/background occlusion, and original crop"]. Keep an adult apparent age; don't change body, skin tone, or the meaning of the expression.

Protection: don't add other people, text, logos, tattoos, jewelry, political, or religious symbols; don't disguise a real photo as news, an ID, or someone else's endorsement.

Output intent: an authorized-person visual candidate that clearly reads as illustration.

Pass criteria: the illustration material and palette have changed; the number of people, pose, clothing structure, and crop stay stable; the face doesn't visibly turn into someone of a different age or identity; no new text, marks, or sensitive context appears.
```

### 10. Fix Only One Failed Field from the Previous Version

This isn't rewriting the whole prompt; it's locking in the parts that already passed and issuing a single, reasoned fix instruction.

- **Replace**: `[previous version image]`, `[single failed item]`, `[correct target]`, `[already-passed items]`
- **Protect**: all already-passed fields of the previous version
- **Accept**: the failed item is fixed; the passed items show zero new drift

```text
Operation: do a controlled fix based on [previous version image], changing only one failed field.

Single failed item: [single failed item, e.g., "the second character of the main title was written wrong"].
Correct target: [correct target, e.g., "the main title must display exactly 'Weekend Flower Market'"].

Must-frozen passed items: [already-passed items, e.g., "the background flowers, green arched border, main title position and font size, subtitle, bottom whitespace, 4:5 crop"]. Do not redesign the layout; do not add or remove any other element.

Output intent: fix the single failed item while preserving the visual results that already passed in the previous version.

Pass criteria: the [single failed item] becomes [correct target]; item by item, all [already-passed items] stay stable; no new typos, element shifts, color changes, or crop changes appear.
```

## How to Fix a Failure: Change One Explainable Variable at a Time

When the first version fails, attribute the problem to a single field rather than appending adjectives like "more professional, ultra-HD, perfect, top-tier."

| Visible failure | Only change this | Keep everything else | How to accept |
| --- | --- | --- | --- |
| Head top cropped | Change composition to "8% safe margin above the head" | Person, clothing, background, lighting | Head top and both shoulders inside the frame |
| Floating feet after background swap | Add "contact shadow hugging the soles and matching the light direction" | Pose, background content, crop | Soles contact the ground naturally |
| Product connector distorted | Restate the connector count, shape, and position | Background, camera position, tones | Verify the connector side by side with the original |
| Typo in the poster | Re-supply only the approved copy; if still wrong, switch to post-layout | Main visual, hierarchy, ratio | Check all copy word by word |
| Multi-image roles confused | Narrow each image's single role | Subject size, final composition | You can trace what each input contributed |

If the same protected detail fails twice in a row and you can't articulate a new fix hypothesis, stop stacking prompt words. Switching to traditional retouching, manual layout, a clearer source, or redefining the task usually saves more time than blindly generating more versions.

## When to Stop Immediately

Google's image help pages remind users not to infringe on others' copyright or privacy and to judge for themselves whether to trust, publish, or use generated content; the Generative AI Prohibited Use Policy also draws boundaries around harmful, deceptive, privacy-invasive, and safety-evasion uses.

In the following situations, don't hunt for "more euphemistic" wording:

- No informed consent or photo usage rights from the real subject;
- The goal is private, sexualized, humiliating, or retaliatory imagery of real people;
- Sexualized content involving minors or people of unknown age;
- Attempts to impersonate someone, forge endorsements, fabricate news scenes, or deceive identity verification;
- Wanting to remove source marks, fake image provenance, or bypass safety filters;
- The system has already explicitly refused, and your next step is only to hide the real purpose.

If a legitimate request is misjudged, you can remove unnecessary identity information, state authorization and non-deceptive use, narrow the task to one visible change, and keep the refusal message. If it still cannot be completed, stop and switch to clearer source material or manual processing instead of turning troubleshooting into evasion.

## The 60-Second Pre-Delivery Checklist

- Were the original and the result compared side by side at full size, not just chat-thumbnail previews?
- Did the number of people, fingers, facial features, pose, or apparent age drift?
- Do product structure, connectors, labels, logo, colors, and count match the real assets?
- Do Chinese, numbers, dates, and brand copy match word for word?
- Do frame, crop, safe margins, and whitespace satisfy the real destination?
- Did any unrequested people, text, QR codes, marks, or objects appear?
- Does the input material have the corresponding generation, editing, publication, and commercial-use rights?
- Does the image still need manual retouching, layout, fact-checking, or approval?

## FAQ

### Should Gemini AI photo prompts be in Chinese or English?

Use the language you can accurately review. Chinese fully expresses subject, composition, lighting, protections, and acceptance criteria. Only when a specialized term is hard to disambiguate, append a common English term after the Chinese; don't machine-translate a whole block into English you can't review.

### Can I copy and use a whole block directly?

You can copy the structure, but you must replace all bracketed fields, delete conditions irrelevant to your task, and confirm your actual entry supports generation, upload-edit, or multi-image input. An unreplaced template is just an example, not a magic phrase.

### Why does a long prompt still drift?

Length doesn't eliminate conflict. The most common problem is simultaneously asking to "only change the clothes" and "make an entirely new scene, pose, and camera," or letting multiple reference images fight over one subject. Reduce the operation to one primary action, list frozen items, and accept with visible standards — that works better than adding more quality words.

### Can it guarantee identical faces and identity?

No. You can explicitly request to keep recognizable appearance, face shape, hairstyle, pose, clothing, and crop, and reject obvious drift by comparing against the original, but a prompt can't provide biometric-grade, perfect, or guaranteed identity preservation. Real-person photos also require proper rights and consent.

### Can Gemini guarantee a Chinese poster has zero typos?

No. List the approved copy separately, limit the amount of text, and verify word by word. If typos remain after one targeted fix, have the image model generate a text-free visual and add accurate text with a layout tool.

### How many images per day, and when does it reset?

There is no single number that applies to every Gemini Apps account, plan, feature, and capacity state. Follow your current account interface and Google's current official statements; don't project API rate limits, some third-party site's quota, or someone else's account experience onto your own app.

### Will there be a visible watermark? Can a prompt remove it?

Don't treat "free always has a corner logo, paid removes it" as a general fact, and don't request removing source marks. Google's statements about source-identification mechanisms like SynthID for AI content belong to specific products and detection flows; the prompt's job is to define the image, not to evade source information.

### After a refusal, can I retry with synonyms?

First decide whether the goal is legitimate, whether you have rights to the material, and whether the request is ambiguous. Legitimate tasks can be clarified by removing identity information, stating authorized use, or narrowing the edit scope; if the goal itself involves privacy invasion, deception, editing real people without consent, or another prohibited use, stop rather than rephrasing to bypass.

## Official References

- [Gemini Web app supported languages and countries/regions](https://support.google.com/gemini/answer/13575153?hl=en)
- [Generate and edit images with the Gemini app](https://support.google.com/gemini/answer/14286560?hl=en)
- [Gemini API image generation and editing docs](https://ai.google.dev/gemini-api/docs/image-generation)
- Google Generative AI Prohibited Use Policy
