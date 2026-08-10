---
title: What Is Nano Banana? Features, Pricing, and Prompt Tips Explained (2026 Complete Guide)
description: A complete guide to Google's Nano Banana image generation technology — from the Gemini 2.5 Flash Image and Nano Banana Pro history, core features, free and paid quotas, the viral 3D figurine phenomenon, to the best prompt tips.
date: 2026-01-09
category: Gemini专题
tags: [Nano Banana, Gemini, AI Image Generation, Google AI, Prompt Tips]
readTime: 12
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

"Nano Banana" suddenly swept the internet in the second half of 2025 — from the 3D figurine craze on social media to developer community discussions, almost everyone who follows AI image generation is talking about it. But for most Chinese-speaking users, the fundamentals are still rarely explained systematically: what Nano Banana actually is, what it can do, how to use it, and whether you need to pay.

This article starts from the technical essence, walks through Nano Banana's development history, core features, quota and pricing, the viral phenomenon, and practical prompt tips — so you can truly understand the technology in about five minutes.

## What Is Nano Banana?

**Nano Banana** is the codename for a family of AI image generation and editing models developed by Google DeepMind, part of the Gemini model family's vision capabilities. The name was originally an internal Google codename that stuck because of how widely users adopted it.

There are currently two versions in the Nano Banana family:

| Version | Official Name | Release Date | Positioning |
| --- | --- | --- | --- |
| Nano Banana | Gemini 2.5 Flash Image | Aug 26, 2025 | Speed-first, for everyday use |
| Nano Banana Pro | Gemini 3 Pro Image Preview | Nov 20, 2025 | Quality-first, for professional creation |

In short, **Nano Banana is Gemini's "drawing capability"**, much like DALL-E is to ChatGPT. Unlike other AI image tools, Nano Banana's core strength is **conversational image creation** — you describe what you want like a chat, and the model understands context and iterates on the output.

> **Technical essence**: Nano Banana is not a standalone image model but the image-generation module inside Gemini's multimodal architecture. It inherits Gemini's reasoning and world knowledge, which is why it excels at complex instructions and accurate text rendering.

## History: From a Mystery Model to a Global Hit

The origin story of Nano Banana is itself a legend in the AI community.

### August 2025: The Mystery on LMArena

On August 12, 2025, an anonymous model appeared on the AI benchmark platform LMArena and performed impressively in image generation. Community users found it could:

- Keep a person consistent across multiple images
- Understand complex scene descriptions
- Produce highly realistic images

Because it was anonymous, users called it "Nano Banana" after its internal codename. Within two weeks, it reached the top of LMArena's blind ranking.

### August 26, 2025: Google Confirms

On August 26, Google announced that the top mystery model on LMArena was its upcoming **Gemini 2.5 Flash Image**, codenamed Nano Banana.

The "blind test" strategy built huge momentum before launch, and the announcement went viral. According to Google's data:

- **Within two weeks**: Gemini App gained over 23 million new users
- **Images generated**: more than 500 million
- **TikTok challenge**: #NanoBananaChallenge accumulated 2.3 billion views

### November 20, 2025: Pro Launch

After the first generation's success, Google released the upgraded **Nano Banana Pro** (officially Gemini 3 Pro Image Preview) on November 20.

Based on Gemini 3 Pro, key upgrades include:

- 2K/4K high-resolution output
- Significantly better text rendering
- Up to 14 reference images at once
- Consistency across 5 characters
- Grounding with Google Search for real-time information

## Core Features

### 1. Text-to-Image

The most basic function — describe the scene in text and Nano Banana turns it into an image.

**Basic example**:

```text
Prompt: an orange cat sitting on a windowsill watching the rain, Tokyo neon night backdrop, cyberpunk style
```

**Advanced tip**: Nano Banana understands scene detail, lighting, and art style well, but prefers **natural language descriptions** over keyword stacking.

### 2. Image Editing

Upload an existing image and describe the changes you want in natural language:

- **Add/remove elements**: add a hat to a person, remove a stranger in the background
- **Style transfer**: turn a photo into a watercolor painting or oil texture
- **Local adjustments**: change only the sky color or only a person's clothes

**Pro-only**: masked region editing lets you precisely target what changes while protecting the rest.

### 3. Multi-Image Composition

One of Nano Banana's killer features — upload multiple images and let the AI compose them into a coherent new image.

**Typical scenarios**:

- Composite your own photo with a favorite background
- Merge several people into one scene
- From sketch to finished product workflows

**Pro capability**: up to 14 reference images at once, maintaining facial consistency for up to 5 people.

### 4. Text Rendering

Accurate text rendering has always been hard for AI image models. Nano Banana Pro made a breakthrough:

- Clear rendering of long paragraph text
- Multiple font and calligraphy styles
- **Multilingual support**: Chinese, English, Japanese, Spanish, Hindi, and more

**In practice**: posters with Chinese slogans render text noticeably more clearly than comparable products.

### 5. Web Search Grounding

Nano Banana Pro can connect to Google Search and fold real-time data into image generation:

- Generate scenes based on current weather
- Create food images from the latest recipes
- Build infographics using live sports scores

This means charts and infographics can contain **current data** rather than stale training data.

## Free Quotas and Paid Pricing

Understanding Nano Banana's pricing is key to planning your usage strategy.

### Free Channels

| Channel | Daily Quota | Notes |
| --- | --- | --- |
| Gemini App (free users) | 2 images | Simplest entry, no technical background needed |
| Google AI Studio | 500 requests | No credit card required, for development testing |
| Google Cloud new users | $300 credit (90 days) | Roughly 2,240 images, requires a card on file |

**Important**: Gemini App and AI Studio quotas are independent, so you can use free credits from both.

### Quota Rules

1. **Daily reset**: quotas reset at UTC midnight
2. **Failures count too**: successes, content-filtered requests, and technical failures all consume quota
3. **Downgrade**: once Nano Banana Pro quota is exhausted, the system falls back to plain Nano Banana until that runs out too

### API Pricing

| Model | Resolution | Token Cost | Price per Image |
| --- | --- | --- | --- |
| Gemini 2.5 Flash Image | 1024×1024 | 1,290 tokens | $0.039 |
| Gemini 3 Pro Image | 1K-2K | 1,120 tokens | $0.134 |
| Gemini 3 Pro Image | 4K | 2,000 tokens | $0.24 |

**Batch discount**: Google's Batch API has a 24-hour delay but a 50% price reduction.

### Accessing via the GPT88 Unified Gateway

For high-frequency usage, you can access Nano Banana through the GPT88 unified gateway via the OpenAI-compatible or native Google interface, billed against your real RMB balance with predictable costs. One API key covers text-to-image, image-to-image, batch jobs, and production workloads.

```python
# gpt88.cc Nano Banana Pro image endpoint example
import requests

API_KEY = "YOUR_GPT88_API_KEY"  # Get it from the https://gpt88.cc console
API_URL = "https://img.gpt88.cc/v1beta/models/gemini-3-pro-image-preview:generateContent"

payload = {
    "contents": [{
        "parts": [{"text": "an orange cat, cyberpunk style, 4K quality"}]
    }],
    "generationConfig": {
        "responseModalities": ["IMAGE"],
        "imageConfig": {"imageSize": "2K"}
    }
}

response = requests.post(
    API_URL,
    headers={"Authorization": f"Bearer {API_KEY}"},
    json=payload,
    timeout=180
)
```

> **Transparency**: the official API remains the first choice for completeness and stability. GPT88 as a unified gateway suits teams on a budget, aggregating multiple models, or needing mainland-China direct connectivity. Exact pricing, model coverage, and failure billing must be verified against the current gpt88.cc console.

## The Viral 3D Figurine Phenomenon

Nano Banana's rapid rise owes a lot to the **3D figurine generation** use case.

### Origin

In late August 2025, users found that specific prompts could make Nano Banana produce strikingly realistic 3D figurine renders. The images looked like professionally photographed collector-grade figurines, including:

- Clear acrylic bases
- Bandai-style packaging boxes
- 3D modeling in progress on a computer screen

### Going Viral

The idea exploded across social media:

- **TikTok**: #NanoBananaChallenge, 2.3 billion total views
- **Instagram**: #GeminiFigurine, 45 million posts
- **Twitter/X**: hub for AI image fans and digital artists

In the first week of September 2025, AI-generated figurine content grew **450%**.

### The Classic Prompt

The standard prompt that sparked the wave:

```text
Create a 1/7 scale commercialized figurine of the characters in the picture,
in a realistic style, in a real environment. The figurine is placed on a
computer desk. The figurine has a round transparent acrylic base, with no
text on the base. The content on the computer screen is a 3D modeling
process of this figurine. Next to the computer screen is a toy packaging
box, designed in a style reminiscent of high-quality collectible figures,
printed with original artwork.
```

### Caveats

The "3D figurine" output is actually a 2D image. If you need real 3D-printable files (.STL, .OBJ), extra conversion work is required. But for social sharing and creative display, the effect is already impressive.

## Prompt Tips and Best Practices

### Basic Principles

1. **Use natural language, not keyword stacks**

   - ❌ "cat, cyberpunk, neon, 4K, masterpiece"
   - ✅ "an orange cat sitting on a neon-lit street surrounded by cyberpunk buildings, cinematic quality"

2. **Provide context, not isolated commands**

   - ❌ "remove the background"
   - ✅ "replace the background with a clean solid white, keep natural lighting on the subject"

3. **Iterate rather than nail it in one shot**

   - Generate a base version first
   - Adjust details based on results
   - Refine over multiple rounds

### Advanced Tips

**1. Reference image strategy**

For multi-image composition:

- Put the most important reference first (higher weight)
- Use clear frontal photos for people
- Pick distinctive samples for style references

**2. Text rendering**

To render text accurately:

- Specify the exact text content in quotes
- Describe position and style
- For Chinese, add a style description too

```text
Place the title "2026 Happy New Year" centered at the top of the poster, in a gold calligraphy font, sized to about 1/3 of the poster width
```

**3. Consistency**

To keep a person consistent across images:

- Reuse the same reference image
- Emphasize "keep the facial features exactly identical to the reference"
- Pro supports Identity Locking

### Troubleshooting

| Problem | Solution |
| --- | --- |
| Blurry text | Use Pro, specify font size explicitly |
| Warped faces | Provide a clearer frontal reference |
| Inconsistent style | Add concrete style descriptions |
| Content filtered | Check safety settings, rephrase the prompt |

## FAQ

### What's the difference between Nano Banana and Nano Banana Pro?

**Nano Banana** (Gemini 2.5 Flash Image) optimizes for speed and efficiency, up to 1024×1024, for everyday use. **Nano Banana Pro** (Gemini 3 Pro Image Preview) optimizes for quality and complexity with 4K output, stronger text rendering, and 14-image composition — for professional work.

### How many images can free users generate daily?

Gemini App free users get 2 images/day; Google AI Studio offers up to 500 requests/day. The two channels have independent quotas.

### Do generated images have watermarks?

All Nano Banana images carry a **SynthID** digital watermark — an invisible marker identifying AI-generated content. It doesn't affect usage but can be detected by dedicated tools.

### Can I use the images commercially?

Per Google's terms, images generated through the API can be used commercially, subject to content policies. Review the latest terms.

### How well does it work with Chinese prompts?

Nano Banana handles Chinese well, but complex instructions are more accurate in English. Text rendering for Chinese improved significantly in Pro.

### How do I detect whether an image is Nano Banana-generated?

Use Google's SynthID detector or a third-party AI image detection service. All Nano Banana images embed an invisible watermark.

## Comparison with Other AI Image Tools

| Feature | Nano Banana Pro | DALL-E 3 | Midjourney v6 |
| --- | --- | --- | --- |
| Max resolution | 4096×4096 | 1024×1024 | 2048×2048 |
| Text rendering | Excellent | Good | Average |
| Multi-image composition | 14 images | No | Limited |
| Real-time grounding | Yes | No | No |
| Conversational editing | Native | Limited | No |
| Chinese support | Good | Average | Average |
| Free quota | AI Studio 500/day | None | None |

**Recommendations**:

- Need text rendering or 4K: choose Nano Banana Pro
- Need artistic style variety: consider Midjourney
- Already in the OpenAI ecosystem: DALL-E 3 integrates more easily

## Looking Ahead

Nano Banana's success marks a new phase in AI image generation — **multimodal conversational creation**. Users no longer need complex prompt engineering; they describe requirements naturally, like briefing a designer.

Likely directions include:

- Integration of video generation
- Stronger 3D asset generation
- Deeper integration with the Google ecosystem (Ads, Workspace)
- Real-time collaborative editing

For developers and creators, now is a great time to explore Nano Banana — whether experimenting with free AI Studio quotas or scaling production through the GPT88 unified gateway.

## Further Reading

- [Nano Banana Pro Multi-Reference Guide](/en/docs/blog/nano-banana-pro-multi-reference-guide/)
- [Nano Banana Pro Pricing & Quota Guide](/en/docs/blog/nano-banana-pro-pricing-quota-guide-2026/)
- [Google Image Generation API](/en/docs/api/images/)
