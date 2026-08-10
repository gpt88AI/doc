---
title: How to Generate 4K Images with GPT Image 2: Size Rules, API Code, and Acceptance
description: Request 3840x2160 or 2160x3840 images with GPT Image 2, understand the four size-validation rules, the experimental 4K above 2560x1440, and the difference between the Image API and Responses API, then verify the saved file and the CDN deliverable, with local validation, decode-and-measure, and per-layer troubleshooting code.
date: 2026-07-22
category: 技术教程
tags: [GPT Image 2, OpenAI API, Image API, 4K Image Generation, AI Image Workflow]
readTime: 13
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

GPT Image 2 can request `3840x2160` landscape or `2160x3840` portrait images directly through the API. But that doesn't mean "any 4K size works", nor does a single successful response mean you've reached production standard. There are two common traps: `4096x2160` is often called 4K too, yet it exceeds the model's `3840px` long-edge limit; and any output above `2560x1440` is currently treated as an **experimental size**.

The correct approach is to split "4K" into three verifiable things: whether the `size` in the request is valid, whether the decoded raw file really equals the target pixels, and whether the version delivered by your CMS or CDN was scaled, cropped, or recompressed. Words like "HD" or "4K quality" in the prompt only describe intent; they can't replace the `size` parameter.

If you only want to directly generate or edit an image, use the Image API; if image generation is one step of a conversation, agent, or multi-tool flow, use the Responses API. `gpt-image-2` is the API model ID, and the current snapshot is `gpt-image-2-2026-04-21`. It is a different product contract from ChatGPT's Images 2.0 — plan credits, UI aspect ratios, and API billing cannot be inferred from each other.

## Validate the Size with These Four Rules First

A custom GPT Image 2 `WIDTHxHEIGHT` must satisfy all of the following:

1. The longest edge must not exceed `3840px`;
2. Both width and height must be divisible by `16`;
3. The ratio of long edge to short edge must not exceed `3:1`;
4. Total pixels must fall between `655,360` and `8,294,400`.

All four are required. Common video resolutions aren't necessarily valid either: `1920x1080` has a height of 1080, which isn't divisible by 16, so it's not a valid custom size; you can change it to `1920x1088` for layout purposes, but that's no longer standard 16:9. Conversely, `1024x640` sits exactly at the minimum pixel boundary and both sides are multiples of 16, making it valid.

| Size | Verdict | Key reason |
| --- | --- | --- |
| `3840x2160` | Valid, experimental | Passes all four rules; total pixels exactly at the ceiling |
| `2160x3840` | Valid, experimental | Portrait 4K; still needs saved-file verification |
| `4096x2160` | Invalid | Long edge exceeds `3840px` |
| `3840x1200` | Invalid | Ratio is `3.2:1`, above the limit |
| `3840x1280` | Valid, experimental | Ratio is exactly `3:1`, pixels in range |
| `1920x1080` | Invalid | 1080 is not a multiple of 16 |
| `1024x640` | Valid | Total pixels exactly `655,360` |

You can validate locally before sending the request. This keeps a batch queue from resubmitting the same invalid size, and gives editors or designers a clear reason.

```js
function validateGptImage2Size(width, height) {
  const longEdge = Math.max(width, height);
  const shortEdge = Math.min(width, height);
  const pixels = width * height;

  const checks = {
    edge: longEdge <= 3840,
    multiplesOf16: width % 16 === 0 && height % 16 === 0,
    aspectRatio: longEdge / shortEdge <= 3,
    pixelCount: pixels >= 655_360 && pixels <= 8_294_400,
  };

  return { valid: Object.values(checks).every(Boolean), checks };
}
```

"Aspect ratio" and "pixel dimensions" are also not the same thing. `16:9` only describes the canvas shape; `3840x2160` is the concrete pixel contract. Upscaling a `1920x1080` file to `3840x2160` later yields an upscaled 4K file, not native 4K from a single API request. When delivering externally, state which route produced the final pixels.

## Why Valid 4K Must Still Be Marked Experimental

The [OpenAI image generation guide](https://developers.openai.com/api/docs/guides/image-generation) marks GPT Image 2 resolutions above `2560x1440` as experimental. This doesn't mean `3840x2160` can't be requested; it means you shouldn't treat parameter-validation passing as a stability guarantee.

Production acceptance still needs at least four checks:

- Whether the API actually returned the final image, not just intermediate events or retried errors;
- Whether the saved raw file keeps the requested width/height and expected format;
- Whether text, edges, character features, and composition meet business requirements;
- Whether the version users actually access after uploading to a CMS, object storage, or CDN still meets the size contract.

So `quality: "high"` and 4K are not synonyms either. `quality` accepts `low`, `medium`, `high`, `auto` (default `auto`); it controls rendering effort, not guaranteeing correct text, consistent subjects, or preserved pixels. During exploration, lock composition at a smaller size with `medium`, then switch to valid 4K for final delivery — usually cheaper in bills and rework than running every draft at 4K.

## Image API: The Shortest Route to Direct 4K

For single text-to-image or image editing, prefer the Image API. Model, size, quality, and output format are all explicit in one request, and the returned image data is decoded and saved by your application.

```js
import OpenAI from "openai";
import { writeFile } from "node:fs/promises";

const openai = new OpenAI();

const result = await openai.images.generate({
  model: "gpt-image-2",
  prompt: [
    "Create a landscape hero visual for a Chinese developer conference",
    "Dark blue background with a glowing abstract chip at the center",
    "Reserve a title area on the left; do not generate any text",
  ].join(". "),
  size: "3840x2160",
  quality: "high",
  output_format: "png",
});

const base64 = result.data?.[0]?.b64_json;
if (!base64) throw new Error("No final image data in the response");

await writeFile("conference-hero.png", Buffer.from(base64, "base64"));
```

GPT Image models return base64-encoded data via the Image API, not a long-lived image URL. PNG is the default format; JPEG and WebP are also available. `output_compression` applies only to JPEG and WebP, ranging `0-100`. If you switch to a compressed format, still check the real format and dimensions after decoding — don't trust the file extension alone.

Editing requests can include one or more reference images, and a mask. For multi-image editing, the mask applies to the first input image; the image and mask must share the same format and size, and the mask needs an alpha channel. The mask shape is a guide, not a guarantee of pixel-perfect edges. Don't add `input_fidelity` for `gpt-image-2` — its image inputs are automatically handled via the high-fidelity path.

> To call through the GPT88 unified gateway, set the OpenAI SDK `baseURL` to `https://gpt88.cc/v1` and use `YOUR_GPT88_API_KEY` created in the https://gpt88.cc console. The model ID `gpt-image-2` and request parameters stay the same.

## Responses API: Use It When Image Generation Is Part of a Multi-Step Flow

The Responses API fits applications where a user first provides product information, the main model summarizes selling points and decides whether an image is needed, then calls the image tool, and finally outputs copy and disclaimers. Here, `model` is the **main model** that supports image tools; the image tool manages GPT Image model selection itself.

```js
import OpenAI from "openai";
import { writeFile } from "node:fs/promises";

const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-5.6",
  input: "Generate a 3840x2160 new-product launch banner with no text in the image, and give three placement cautions.",
  tools: [{
    type: "image_generation",
    size: "3840x2160",
    quality: "high",
  }],
});

const call = response.output.find(
  (item) => item.type === "image_generation_call"
);
if (!call?.result) throw new Error("No final image tool result received");

await writeFile("launch-banner.png", Buffer.from(call.result, "base64"));
```

Don't write `tools: [{ type: "image_generation", model: "gpt-image-2" }]`. The current official contract clearly separates the main model from the image tool's model selection; this tool parameter is not for forcing `gpt-image-2`. The Responses API also incurs text-token usage from the main model, so it's not an "Image API substitute with identical pricing".

For simple prompt-to-image, the Responses API just adds logging and debugging layers: the main model may not call the tool, the tool may fail, the base64 may not be saved, and the frontend may render only a thumbnail. Only bring it in when multi-turn editing, conversational context, or multi-tool orchestration genuinely reduces user steps.

## Save, Decode, Verify Size: Turn API Success into a Deliverable File

Minimal acceptance shouldn't stop at HTTP 200. Below, `sharp` reads the saved file and checks format and pixels; if your stack doesn't use `sharp`, substitute your existing image-metadata tool — the point is checking the decoded result, not the filename.

```js
import sharp from "sharp";

async function assertImage(path, expected) {
  const meta = await sharp(path).metadata();

  if (!meta.width || !meta.height || !meta.format) {
    throw new Error(`Cannot decode image metadata: ${path}`);
  }
  if (meta.width !== expected.width || meta.height !== expected.height) {
    throw new Error(
      `Size mismatch: expected ${expected.width}x${expected.height}, ` +
      `got ${meta.width}x${meta.height}`
    );
  }
  if (meta.format !== expected.format) {
    throw new Error(`Format mismatch: expected ${expected.format}, got ${meta.format}`);
  }

  return meta;
}

await assertImage("conference-hero.png", {
  width: 3840,
  height: 2160,
  format: "png",
});
```

If the site also generates WebP, `srcset`, or social-share crops, download the final public URL once and run the same check. If the source image is fine but the user-visible version isn't, the problem is usually in upload conversion, responsive image selection, CDN parameters, or frontend container cropping — not something to fix by rewriting the prompt.

For each production task, record: request ID, time, model ID, `size`, `quality`, output format, raw file path, raw file dimensions, delivery URL, and delivery file dimensions. Don't log API keys, and don't write full user assets or sensitive prompts into ordinary logs.

## Native 4K vs Upscaling 2K Later

"The final file is 4K" and "the model generated native 4K in one shot" are two different delivery claims. Which route you pick depends on rework cost, not which sounds more impressive.

| Situation | Better starting point | Acceptance focus |
| --- | --- | --- |
| Ad slots or large screens explicitly require a `3840x2160` source file | Request 4K directly via Image API | Decoded pixels must match exactly |
| Creative not settled; need quick comparisons across compositions | 1K/2K drafts, then generate 4K once finalized | Don't upscale drafts and claim native requests |
| Image full of small text, UI, or fine labels | Reduce text in the image and lock the layout first | Manually check text even when size is correct |
| Already have a passable 2K asset, only delivery pixels missing | Use a controlled upscaling flow | Mark as upscaled; re-check edges and text |
| 4K requests unstable or budget unclear | Smoke test at a small size before scaling up | Confirm access rights and billing evidence first |

Upscaling is not an automatic downgrade path. Sometimes a 2K master has more stable subjects and text, and a controlled upscale beats repeatedly re-rolling 4K; but you must keep the "generated first, upscaled later" fact in the asset record — don't write that the model directly returned those final pixels.

## Pricing, Free Tier, and Account Limits Can't Be Inferred from ChatGPT Plans

The official GPT Image 2 API is not a fixed "price per 4K image" contract. Per the [official pricing page](https://developers.openai.com/api/docs/pricing#image-generation) verified 2026-07-22, standard pricing is per million tokens: image input `$8.00`, cached image input `$2.00`, image output `$30.00`, text input `$5.00`, cached text input `$1.25`. Batch rates are lower; editing requests also count input images, and the Responses API also counts main-model usage.

The guide's per-image examples center on specified size/quality combos like `1024x1024`, `1024x1536`, and `1536x1024`; you can't extrapolate a universal 4K unit price. For a real `3840x2160` budget, use the current official calculator and calibrate against organization billing records.

Access rights are also an account contract. The API Free usage tier currently doesn't support `gpt-image-2`; the [models page](https://developers.openai.com/api/docs/models/gpt-image-2) lists Tier 1-5 rates of `5 / 20 / 50 / 150 / 250 IPM` plus model-specific TPM limits. Organization verification may be a prerequisite. What actually controls whether you can call and how fast is your current organization, project, and Limits page — not the numbers in an article.

On the other hand, [ChatGPT Images 2.0](https://help.openai.com/zh-hans-cn/articles/11084440-chatgpt-images-faq) currently rolls out to all ChatGPT plans and works on Web, iOS, and Android. That only shows consumer access; it doesn't prove you have free API tokens, can specify `3840x2160` exactly in the UI, have API IPM, or are subject to API token billing.

Chinese articles often collapse the early "GPT-4o image generation", the ChatGPT image feature, and `gpt-image-2` into one entry point. For developers, the safest way to identify it is the request itself: the explicit model ID in the Image API is `gpt-image-2`; choosing an aspect ratio, asking for "4K", or downloading images in the ChatGPT UI doesn't automatically become API size or billing evidence. When accessing through GPT88, actual charges follow official usage × your selected group multiplier; exact pricing and quotas are subject to the gpt88.cc console.

## When a 4K Request Fails, Debug Layer by Layer

### 1. The request never went out, or returned a parameter error

Print the four local validation results first — don't just log "4K failed". Check whether you wrote `4096x2160`, whether one side isn't divisible by 16, whether the ratio exceeds 3:1, and whether total pixels are out of range. Then confirm the `size` in the actual request body, not whether the prompt contains "4K".

### 2. Parameters valid, but the account has no access

Run a smoke test with a smaller valid size and check model access, verification status, and the Limits page for the same organization and project. Don't conclude an API key has access because ChatGPT can generate images, and don't start a batch 4K queue while permissions are unclear.

### 3. API returned success, but the saved file has the wrong size

Confirm you read the final base64, not a partial image from streaming; check that decoding completed and the file wasn't overwritten by a same-named file. Then measure the source file. Stop delivery if the source file already fails to match the requested size, and keep the request ID for debugging.

### 4. Source file correct, but the web or download version is wrong

Compare the object-storage original, the CDN URL, the resource actually matched by the HTML `srcset`, and the downloaded file. The most common causes are CMS auto-generating derivatives, the CDN appending a width parameter, or the frontend download button pointing at a thumbnail.

### 5. Pixels correct, but visual quality fails

This is content acceptance, not a size fault. Reduce the amount of text in the image, make the subject and whitespace clear, fix the reference elements you need to keep, then decide whether to raise `quality`, re-edit, or return to the 2K master route. Don't let "size is correct" replace manual preview.

## FAQ

### Does GPT Image 2 support native 4K?

You can request `3840x2160` or `2160x3840` via the Image API and get a source file matching that pixel contract. But sizes above `2560x1440` are currently experimental, so you must decode, measure, and manually inspect. If the final pixels come from upscaling, mark it as upscaled rather than a native request.

### Why can't I use `4096x2160` directly?

Because GPT Image 2's longest edge can't exceed `3840px`. "4K" has several common size names in the industry, but the API only recognizes concrete numbers and the current validation rules.

### Does writing "4K HD" in the prompt help?

It can steer visual intent and detail description, but it can't control file pixels. For exact dimensions you must set `size`, then read the real width/height after saving.

### Why does `1920x1080` also fail as a size?

Custom width and height must both be multiples of 16, and 1080 isn't divisible by 16. A common display resolution isn't automatically a valid API size.

### Image API or Responses API?

Use the Image API for single generation or editing — the chain is short and easy to accept. Use the Responses API for multi-turn conversation, agents, or multi-tool orchestration. In Responses, pick a main model that supports image tools; don't force `model: "gpt-image-2"` onto the image tool.

### Is there a fixed official price per 4K image for GPT Image 2?

No single price covers all 4K sizes, qualities, and request shapes. Estimate from current image input, image output, text input, quality, edit input, and main-model usage, then calibrate with actual bills.

### Does a free ChatGPT user being able to generate images mean the GPT Image 2 API is free?

No. ChatGPT Images is a consumer benefit; the API has its own access tiers, organization verification, rate limits, and token billing. Both may use related image capabilities, but the contracts aren't interchangeable.

### What else should I check after the API returns 200?

At minimum: whether the base64 decodes fully, the raw file's width/height and format, manual visual quality, and the final CMS/CDN delivery version. If any layer fails, the asset can't be marked as accepted 4K.
