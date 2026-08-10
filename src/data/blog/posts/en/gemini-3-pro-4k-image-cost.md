---
title: Is Nano Banana Pro 4K Free? Check Nano Banana 2, API Pricing, and Credit Ownership First
description: Check the official 4K API pricing and Free Tier for Nano Banana Pro (gemini-3-pro-image) and Nano Banana 2 (gemini-3.1-flash-image), and clarify the 1K/2K download limits of Gemini Apps, the ownership of free credits and third-party points, and how to confirm true 4K output with an uppercase image_size=4K parameter.
date: 2026-06-13
category: Gemini专题
tags: [Nano Banana Pro, Nano Banana 2, 4K 图像生成, Gemini API, 免费额度]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

**Bottom line first: Nano Banana Pro can output 4K through the official API, but per the Standard pricing row verified on July 20, 2026, 4K image output has no Free Tier, with an example price of about $0.24 per image.** Also, Pro is no longer the only choice for official 4K output: Nano Banana 2 (`gemini-3.1-flash-image`) supports 4K too, with a Standard 4K example price of about $0.151 per image.

If you only want to generate and download images in the Gemini web app, the answer is different. The current Gemini Apps help page states: download at 1K without a Google AI plan, and at 2K with a plan. That is not the API's 4K output contract. As for the "free credits" shown on web pages, first determine whether the credits come from Google, your API project, or a third-party platform before calculating how many images they buy.

## Spend 30 Seconds Recognizing Which Entry You Are Using

Chinese-language search results often mix up "free quota", "credits", "free attempts", and "API Free Tier". They are not the same thing. Answer by the actual entry point:

| Entry you are using | What to look at | What you cannot infer from it |
| --- | --- | --- |
| Gemini Apps web/app | Account plan, current feature limits, download file size | Cannot infer API free tier or 4K API pricing |
| Google AI Studio | Models, limits, and billing status shown for your account/project | Cannot infer permanent free access, or replace production billing checks |
| Gemini Developer API | Model ID, `image_size`, execution channels like Standard/Batch, project billing | Cannot infer that a consumer subscription includes API calls |
| Google Cloud / Vertex AI | Region, project, quotas, IAM, model status, Cloud pricing | Cannot infer Gemini Apps benefits |
| Third-party generators or APIs | The platform's own credits, model routes, resolution, failure billing, privacy, support | Cannot write platform credits as Google official free quota |

This article only answers three questions: is 4K free, how to choose between Nano Banana 2 and Pro, and how to convert free credits. It does not assume any entry is available in mainland China, and it does not offer region switching, proxy payment, or other workarounds. Availability, account eligibility, and payment conditions must be confirmed against the official pages and your own account status.

## 4K API Pricing: Nano Banana 2 at $0.151, Pro at $0.24

Google currently maps Nano Banana 2 to `gemini-3.1-flash-image` and Nano Banana Pro to `gemini-3-pro-image`. In the Standard table of the [Gemini Developer API pricing page](https://ai.google.dev/gemini-api/docs/pricing), both image-output rows are paid and the Free Tier column is unavailable.

| Standard API image output | Nano Banana 2 | Nano Banana Pro |
| --- | --- | --- |
| Model ID | `gemini-3.1-flash-image` | `gemini-3-pro-image` |
| 0.5K | about $0.045/image | Not supported |
| 1K | about $0.067/image | about $0.134/image |
| 2K | about $0.101/image | about $0.134/image |
| 4K | **about $0.151/image** | **about $0.24/image** |
| Standard image output Free Tier | Not offered | Not offered |

These numbers are the image-output equivalents shown on the official page — not permanent quotes and not total project cost. Input images, text and thinking output, search grounding, retries, and execution channels (Standard, Batch, Flex, Priority) may be billed differently. Re-open the pricing page before budgeting, and confirm the model ID and channel you actually call.

### A Non-Inflated Budget for 100 4K Images

Counting only 100 successful Standard 4K image outputs, ignoring input and other fees:

- Nano Banana 2: `100 × $0.151 = $15.10`
- Nano Banana Pro: `100 × $0.24 = $24.00`
- Example difference for the same number of 4K outputs: `$8.90`

This is not the cost of "100 deliverable images". Results may need retries or rejection. The metric that fits a team best is:

`Cost per accepted image = total actual bill for the task ÷ number of images that passed acceptance`

For example, if only 70 of 100 returned images meet your text, character-consistency, or brand requirements, divide the full amount paid by 70 instead of comparing single list prices. This article did not benchmark the two models, so it will not claim one has a higher pass rate.

## Nano Banana 2 or Pro: Let the Cheaper Route Take the Same Test First

The [official image generation docs](https://ai.google.dev/gemini-api/docs/image-generation) position Nano Banana 2 as a general-purpose choice balancing performance, intelligence, cost, and latency, suited to speed and high-throughput tasks; Nano Banana Pro targets complex instructions and professional asset production. Both output 4K, so "I need 4K" alone is not enough reason to pick Pro.

A more robust approach: prepare 10–20 real tasks and run both models with identical inputs and acceptance criteria:

1. **Test Nano Banana 2 first.** For batch product backgrounds, social assets, simple posters, or routine edits, the lower 4K example price deserves verification first.
2. **Leave the hard cases for a Pro re-run.** If complex Chinese layout, brand consistency, multiple reference images, infographics, or strict composition repeatedly fails on the cheaper route, then evaluate whether Pro reduces rework.
3. **Choose by accepted-output cost, not by first impression.** Record actual bills, acceptable output counts, manual-revision time, and average wait, instead of bookmarking the single best image.
4. **Keep a fallback strategy.** Even if Pro fits the hard cases, not every image needs Pro; split traffic by task difficulty.

Official positioning only tells you what to evaluate first. It does not guarantee your Chinese text, character consistency, or brand templates will succeed.

## Gemini Apps 1K/2K Downloads Are Not a 4K API Free Quota

As of July 20, 2026, the [Gemini Apps image help page](https://support.google.com/gemini/answer/14286560) explicitly states: downloads at 1K without a Google AI plan and at 2K with a plan. It also notes the feature is limited by supported languages and regions. Only two safe conclusions follow:

- Gemini Apps download specs cannot prove you have official API 4K output;
- A Google AI plan raises benefits inside a specific consumer product; it does not automatically turn Standard API image output into a free tier.

The same help page distinguishes Nano Banana 2 from Nano Banana Pro: in the app, Nano Banana 2 is the regular generation route, while Pro is available as a redo option for plan users who need more detail. These "availability", "redo", and download specs still belong to Gemini Apps; they are not developer-API model calls, project quotas, or billing.

In addition, the [Gemini Apps limits note](https://support.google.com/gemini/answer/16275805) currently uses compute-based dynamic limits and warns that caps may adjust with capacity. Fixed daily counts copied from old pages, cached screenshots, or other-language pages should not be treated as promises that apply to every account. The most reliable number is the "usage limits" notice inside your current account — and it only describes that app account, not API projects.

## How Many 4K Images Do "Free Credits" Really Buy? Find the Owner First

"Register to get 100 credits" cannot be converted into a number of images on its own. The calculation only makes sense when all of the following are explicit:

1. Who issues the credits: Google product benefits, API project grants, or third-party platform points;
2. What the 100 credits are priced in: USD balance, on-site points, or a fixed number of tasks;
3. Which model ID is actually called, and whether requests may be dynamically routed to another model;
4. How many credits one 4K generation deducts, and whether the downloaded file truly reaches the stated pixel size;
5. Whether failures, content blocks, timeouts, and retries are charged;
6. When credits expire, whether they auto-renew, and who handles refunds and support;
7. How uploaded images are stored, whether they are used for training, whether they can be deleted, and the terms for generated content.

The conversion formula can be simple:

`Attemptable 4K count = available credits ÷ credits deducted per 4K generation`

But "attemptable count" is not "deliverable image count". If a platform has not published its model, resolution, failure-billing, and data terms, the honest answer is **cannot be calculated yet**. Do not back-derive "free 4K" on a third-party page into an official Google API free tier, and do not upload customer product images, real faces, or unreleased brand assets just for a few trials.

## How to Confirm You Really Got 4K

4K is an output-size contract, not a prompt adjective. Per the official API docs, Gemini 3 image models request 1K, 2K, or 4K via `image_size`, and the `K` must be uppercase; lowercase values like `4k` are rejected.

```json
{
  "model": "gemini-3.1-flash-image",
  "response_format": {
    "type": "image",
    "aspect_ratio": "16:9",
    "image_size": "4K"
  }
}
```

After saving, still check the actual pixel dimensions. 4K is not always `4096 × 4096`: different aspect ratios use different pixel combinations. For example, the official table currently lists 16:9 4K as `5504 × 3072`, while square is `4096 × 4096`. Verify in this order:

1. Record the call entry, model ID, aspect ratio, and `image_size`;
2. Download the original file; do not judge from the web preview;
3. Check pixel width and height in file info or an image tool;
4. Determine whether a third party merely upscaled a small image onto a bigger canvas;
5. Keep request records and bills to resolve size or charge disputes.

Google also states that images generated via the Gemini API include SynthID. Whether a visible watermark is shown depends on the entry and current rendering; "I don't see a watermark" does not imply there is no SynthID.

## Accessing 4K Through the GPT88 Unified Gateway

If you need to call these 4K capabilities with mainland-China direct connectivity and controllable billing, the GPT88 unified gateway is an option. On GPT88, a 1 CNY top-up equals 1 CNY of account balance; actual charges follow official usage × the selected group multiplier and the corresponding official billing for the chosen model and resolution. Failures and no-image returns are reconciled against call logs.

```python
import requests

API_KEY = "YOUR_GPT88_API_KEY"  # Get it from the https://gpt88.cc console
API_URL = "https://img.gpt88.cc/v1beta/models/gemini-3-pro-image:generateContent"

payload = {
    "contents": [{
        "parts": [{"text": "Generate a 16:9 infographic about this week's product sales"}]
    }],
    "generationConfig": {
        "responseModalities": ["IMAGE"],
        "imageConfig": {"imageSize": "4K", "aspectRatio": "16:9"}
    }
}

response = requests.post(
    API_URL,
    headers={"Authorization": f"Bearer {API_KEY}"},
    json=payload,
    timeout=180
)
```

> **Transparency**: the official API remains the first choice for completeness and stability. GPT88 as a unified gateway suits teams on a budget, aggregating multiple models, or needing mainland-China direct connectivity. Exact pricing, model coverage, failure billing, and 4K parameters are per the gpt88.cc console. After calling, still verify the true pixel dimensions using the steps above.

## A Decision Checklist: Which Route to Take Now

- **Only generate occasionally in the web app:** check whether Gemini Apps is available for your account, the limits notice, and the download size; do not assume 4K.
- **Batch-generate 4K via the API:** run real samples on Nano Banana 2 first, then re-test hard tasks on Pro; split traffic by accepted-output cost.
- **Must handle complex Chinese layout or professional assets:** Pro is worth evaluating, but set acceptance criteria first; official positioning is not a success guarantee.
- **See third-party free credits:** verify issuer, model, 4K deduction, failure rules, data terms, and support before uploading low-risk assets.
- **Mainland-China usage:** separately verify supported regions, account eligibility, and payment conditions. This article does not infer availability from search results and offers no region workaround. If direct connectivity is inconvenient, the GPT88 unified gateway is an option, subject to the gpt88.cc console.

## FAQ

### Is the official 4K API for Nano Banana Pro free?

Per the Standard pricing row verified on July 20, 2026, `gemini-3-pro-image` image output has no Free Tier, with a 4K example price of about $0.24/image. Pricing, model status, and execution channels change; re-check the official page before finalizing a budget.

### Can Nano Banana 2 also generate 4K?

Yes. The current official docs list `gemini-3.1-flash-image` with 0.5K, 1K, 2K, and 4K support. The Standard 4K example price is about $0.151/image, but the lower price does not guarantee that all complex tasks are equivalent to Pro.

### Why don't I need Pro for 4K?

Because both Nano Banana 2 and Pro have official 4K API output. The reason to pick Pro should come from complex instructions, professional assets, and your own same-input acceptance results — not the already-false premise that "only Pro has 4K".

### Can I download 4K after subscribing to Gemini Apps?

The current official help page says: download at 2K with a Google AI plan and at 1K without. It does not promise 4K for the app download flow. Do not project the API model's 4K capability onto Gemini Apps.

### Do Google AI Pro or Ultra include free API 4K?

Consumer subscription benefits and Gemini Developer API project billing are separate contracts. Unless current official terms explicitly say a benefit covers your API project and image route, do not infer Standard API free access from a subscription.

### Does AI Studio showing availability mean the API is permanently free?

No. AI Studio is an account- and project-scoped development entry; model visibility, a runnable UI, project grants, and the Standard API Free Tier are different facts. Rely on the current project billing state and the official pricing rows.

### How do I convert third-party "register-to-get-credits"?

Confirm the credits deducted per 4K generation, the actual model, whether failures deduct credits, and the expiry date, then divide available credits by the per-4K deduction. If any denominator is unknown, you cannot reliably calculate how many images you can generate.

### Do Batch or Flex make 4K free?

No. Different execution channels can change price, latency, or scheduling, but they are not free benefits. The $0.151 and $0.24 listed here are Standard examples; read the corresponding row when using other channels.

### Is writing "4K" in the prompt enough?

No. The official API requires the uppercase `4K` in the size field, and you must check the real pixels after download. On third-party pages, also rule out upscaling that is marketed as native 4K.

## Further Reading

- [Google Image Generation API](/docs/api/images/)
