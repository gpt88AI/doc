---
title: Gemini App Nano Banana Tutorial: A Complete Beginner-to-Expert Guide (with Prompt Templates)
description: A complete Nano Banana image generation tutorial inside the Gemini app — base vs Pro differences, login and UI walkthrough, the six-element prompt framework, 20+ reusable prompt templates, multi-turn editing, common error fixes, and API integration.
date: 2026-01-09
category: 技术教程
tags: [Nano Banana, Gemini, AI Image Generation, Prompt Templates, Image Generation Tutorial]
readTime: 16
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Type "draw me a cyberpunk cat" into the Gemini app and within seconds a polished image appears on screen — that's the AI image generation experience Nano Banana delivers. As Google's image generation feature natively built into Gemini, Nano Banana makes text-to-image conversion unprecedentedly simple.

But simplicity hides many details. Why do some generations end up far from what you expected? Why do the same prompts produce cinematic results for some people and mediocre ones for others? The answer lies in how you use the tool. This tutorial starts from zero, walks you through the complete Nano Banana workflow in the Gemini app, and provides 20+ verified prompt templates you can use directly.

Whether you want AI-generated social media graphics, product concept images, or are just exploring AI creation out of interest, this guide will help you get started quickly and keep improving generation quality.

## Nano Banana vs Nano Banana Pro: Core Differences

Before you begin, you need to know that the Gemini app contains two image generation models. Their differences directly affect the image quality and features you get.

**Nano Banana (base)**

Based on the Gemini 2.5 Flash Image model, this is the version available to all users. It's designed for speed and efficiency, suited to everyday quick generation. Generation typically takes 5-10 seconds, with 1K resolution (about 1024×1024 pixels). All Gemini users can use it for free with no daily limit.

**Nano Banana Pro**

Based on the Gemini 3 Pro Image Preview model, this is Gemini's advanced image generation engine. It uses an advanced "thinking" reasoning mechanism that handles more complex instructions and renders high-fidelity text. Pro supports higher resolutions (1K, 2K, 4K) with significant improvements in image quality, precise control, and text rendering.

**Feature comparison**

| Feature | Nano Banana | Nano Banana Pro |
| --- | --- | --- |
| Underlying model | Gemini 2.5 Flash Image | Gemini 3 Pro Image |
| Output resolution | 1K | 1K / 2K / 4K |
| Generation speed | 5-10 seconds | 10-30 seconds |
| Text rendering | Basic | High-fidelity, multilingual |
| Reasoning | Standard | Advanced "thinking" mode |
| Reference images | Up to 3 | Up to 14 |
| Free quota | Unlimited | 2 per day |
| Paid quota | - | 1,000 per day on Pro subscription |

**How to choose?**

If you occasionally generate a few images for social sharing, base Nano Banana is more than enough. But if you need images with text (posters, infographics), higher resolution output, or more control over image details, Pro is the better choice. Note that free users only get 2 Pro generations per day; after that, it automatically falls back to the base version.

## Getting Started: Login Steps and UI Walkthrough

Using Nano Banana requires visiting the Gemini app and signing in. Here's the full startup flow.

**Access methods**

1. **Web**: open a browser and go to gemini.google.com
2. **Mobile**: download the Gemini app from the App Store or Google Play
3. **Via search**: enter AI Mode from Google Search and pick a model with image capabilities

**Login requirements**

- A Google account is required to use image generation
- Age limit: users under 18 currently cannot use this feature
- Some regions may be restricted; confirm your region is supported

**Understanding the UI**

After signing in, you'll see Gemini's main chat interface. There are two entry points for image generation:

1. **Tools menu**: click the "+" to the left of the input box and select "🍌 Create image"
2. **Direct input**: type a request starting with "draw", "generate", or "create"

**Model switching**

In the model selector above or beside the input box:

- Select "Fast" or "快速": uses base Nano Banana
- Select "Thinking" or "思考": uses Nano Banana Pro

On first use, the system may default to the base version. To try Pro, manually switch to "Thinking" mode.

**Language settings**

Nano Banana accepts prompts in many languages, including Chinese, English, Japanese, Korean, and more. Based on testing, English prompts are slightly more accurate on complex scenes, but Chinese works perfectly fine for everyday use. If Chinese prompts give poor results, try rephrasing in English.

## Basic Image Generation: The Full Flow for Your First Image

Let's walk through the entire process from prompt to image with a concrete example.

**Step 1: Know what you want**

Before typing anything, form a clear picture in your head. "A cat" is too vague. "An orange cat sitting on a windowsill with sunlight streaming in, a cozy indoor scene" is much more specific.

**Step 2: Build the prompt**

Based on the idea above, build a complete prompt:

```
Generate an image: an orange cat sitting on a wooden windowsill, afternoon sunlight streaming through the window forming warm light spots. Background is a blurred indoor scene with some green plants. Photo style, cozy and comfortable atmosphere.
```

**Step 3: Send the request**

Paste the prompt into the Gemini chat box and press Enter or tap send.

**Step 4: Wait for generation**

Depending on the model and server load, wait time is usually 5-30 seconds. You'll see a progress indicator during generation.

**Step 5: Review the result**

Once generated, the image appears directly in the conversation. If multiple images are produced (some cases generate 2-4), pick the one you like best.

**Step 6: Save or iterate**

- **Happy**: click the image and download it
- **Not happy**: keep typing edits in the conversation, such as "change the cat's color to gray" or "make the light softer"

**About resolution**

By default, images preview at 1K. If you're a paid user, you can choose 2K on download. Pro supports up to 4K, suited to printing or large screens.

**About watermarks**

All images generated by Gemini carry the SynthID digital watermark — an invisible watermark that doesn't affect the visual result but can be detected by detection tools as AI-generated content.

## Prompt Writing Tips: The Six-Element Framework

Prompt quality directly determines generation quality. Google officially recommends a six-element framework for building effective prompts.

**Element 1: Subject**

State clearly who or what the image centers on. The more specific, the better.

```
❌ A robot
✅ A steampunk copper robot with glowing blue eyes and intricate gear structures
```

**Element 2: Composition**

Describe the camera framing, which directly shapes the visual result.

Common composition terms:

- Close-up: emphasizes detail
- Medium shot: shows a person's upper body
- Wide shot: shows the full scene
- Low angle: looking up, feels grand
- Bird's eye view: god's-eye perspective
- 85mm portrait lens: professional portrait look

**Element 3: Action**

Describe what the subject is doing to give the scene a story.

```
❌ A barista
✅ A barista making a latte with an espresso machine, steam rising
```

**Element 4: Location**

Set the background environment of the scene.

```
❌ At a coffee shop
✅ In a retro-industrial style coffee shop, brick wall background, warm yellow lighting, wooden counter
```

**Element 5: Style**

Specify the overall visual style or art direction.

Common style words:

- Photorealistic
- 3D rendering
- Watercolor painting
- Oil painting
- Anime style
- Cyberpunk
- Minimalist
- Vintage, retro

**Element 6: Editing Instructions**

For iterative editing, give specific adjustment requests.

```
✅ Change the background color to a deeper blue
✅ Remove the object in the bottom-right corner
✅ Add some fog effect
```

**Combined example**

Combine all six elements into one prompt:

```
[Composition] A medium shot with an 85mm portrait lens,
[Subject] a young business professional in a dark blue suit,
[Action] focused on the tablet in their hands,
[Location] standing before the floor-to-ceiling windows of a modern office building, city skyline outside,
[Style] commercial photography, soft natural light, high-end magazine quality.
```

**Key principles**

1. **Describe the scene rather than stacking keywords**: full sentences beat loose word lists
2. **Specific beats abstract**: use "golden sunlight" instead of "nice lighting"
3. **Iterate**: first attempts failing is normal; keep adjusting through conversation

## Prompt Template Library: 20+ Reusable Templates

These are verified prompt templates grouped by use case. Copy them directly or modify as needed.

### Portrait Photography

**Cinematic portrait**

```
A hyperrealistic cinematic portrait photo. The subject is centered, backlit by golden-hour sunlight with a warm halo around their hair. Shallow depth of field produces a soft background blur, Kodak Portra 400 film simulation, slight lens flare. 8K resolution, ultra-high detail.
```

**Black and white moody portrait**

```
High-contrast black-and-white cinematic portrait. The subject stands on a rainy city street late at night, a single streetlamp creating strong rim light. Film-noir aesthetic, deep shadows, visible film grain, shot on a 50mm lens, low-key lighting.
```

**Minimalist studio portrait**

```
Minimalist studio portrait. The subject is placed against a seamless off-white background with soft, even gallery lighting and no visible shadows. Clean fine-art gallery photography style, high-key exposure.
```

### Product & Commercial

**Product showcase**

```
Professional product photography of [product name]. The product sits on a clean white background with a three-point lighting setup and soft reflective surfaces that bring out texture and detail. Commercial advertising quality, suitable for e-commerce.
```

**Food photography**

```
Food photography of [food name]. Top-down angle, food styled on a textured wooden board with related ingredients around it, natural side lighting creating warm shadows. Instagram food blogger style, saturated colors.
```

**Tech product concept**

```
Futuristic tech product concept design. [Product type] with streamlined design, combining metal texture with frosted glass, floating over a dark gradient background. Apple keynote style, dramatic spotlight effect.
```

### Scenes & Landscapes

**City skyline**

```
City skyline of [city name] during the golden hour at dusk. Glass skyscraper facades reflect the sunset, the sky gradating from orange-red to deep blue. Long-exposure effect, silky cloud movement. 16:9 widescreen.
```

**Natural landscape**

```
A spectacular [natural landscape type] wrapped in early-morning mist. Foreground is [specific element], the midground the main vista, and the distance rolling mountains. National Geographic style, realistic colors with a slight enhancement.
```

**Interior space**

```
Modern [space type] interior design render. Scandinavian minimalism, lots of white and natural wood, floor-to-ceiling windows letting in natural light. Plant accents, a cozy and warm atmosphere. Architectural photography angle, accurate perspective.
```

### Creative & Art

**Style transfer**

```
Convert this photo into the style of [artist name]'s [work name]. Keep the architecture and objects from the original composition, but render all elements with swirling, impasto brushstrokes and the dramatic color palette of [color 1] and [color 2].
```

**Retro game style**

```
Recreate [subject] as a 16-bit video game character, placed inside a 2D side-scrolling game level scene. Pixel art style, retro color palette.
```

**Concept art**

```
Concept art design of [scene description]. Epic fantasy style, grand composition, cinematic storyboard feel. Reference the visual style of [movie/game name], highly detailed.
```

### Infographics & Text

**Infographic**

```
Create an infographic about [topic]. Use a [primary color] palette and a modern flat design. Include these data points: [data 1], [data 2], [data 3]. Clear hierarchy and easy-to-read typography.
```

**Social media image**

```
Instagram post image: [topic]. Square 1:1 ratio, clean background, [subject description] centered. Include the text "[slogan]" in an elegant sans-serif font. Modern minimalist style.
```

**Poster design**

```
Promotional poster for [event/product]. 2:3 portrait ratio, [visual subject] centered, space at the top for the title text "[title]". [Style description], high-contrast palette, eye-catching.
```

### Editing & Modification

**Element addition**

```
Add [element description] to this image. Place it at [position] and ensure lighting, shadows, and perspective match the original.
```

**Style adjustment**

```
Adjust the overall mood of this image to [target mood]. Shift color temperature warmer/cooler, increase/decrease contrast, and apply [filter effect].
```

**Background replacement**

```
Keep [subject] unchanged and replace the background with [new background description]. Mind the edge blending and lighting direction consistency.
```

## Image Editing and Iteration: Multi-Turn Conversation Tips

One of Nano Banana's strongest features is editing and iterating through conversation. Master this and you can fine-tune details without regenerating from scratch.

**Basic iteration flow**

```
User: Generate a photo of a sunset beach
[Gemini generates image]

User: The sea color is too dark, make it a brighter blue-green
[Gemini edits based on the original]

User: Add a few lounge chairs on the sand
[Gemini keeps editing]

User: Make the clouds in the sky more dramatic
[final result]
```

**How to write precise edit instructions**

1. **Name the location clearly**

   ```
   ✅ Turn the cloud in the top-left corner pink
   ❌ Turn the clouds pink (if the image has multiple clouds)
   ```

2. **Describe the desired end state**

   ```
   ✅ Change the person's expression from serious to smiling
   ❌ Change the person's expression (too vague)
   ```

3. **One change at a time**

   ```
   ✅ Send "remove the car in the background" first, wait, then send "add some pedestrians"
   ❌ Send "remove car, add pedestrians, change weather, adjust lighting" all at once
   ```

**Character consistency**

Nano Banana Pro maintains a character's appearance across a conversation. This is useful for series (picture books, product showcases).

```
User: Create a cartoon little girl character with short red hair, a blue dress, and big eyes

User: Have the little girl play on a swing in the park

User: Now have her help her mom bake a cake in the kitchen

User: Finally, have her read a storybook in bed before sleep
```

Throughout this conversation, the girl's appearance stays consistent while the scene and action change.

**Style-transfer editing**

You can keep a photo's content while completely changing its art style:

```
User: [Upload a photo of a modern city street]
      Convert this photo into the style of Van Gogh's "Starry Night"

User: Keep this art style, but shift the palette from blue to warm tones
```

**Local repair**

If only a small region bothers you, point it out precisely:

```
User: The shadow in the bottom-right corner looks unnatural, please soften it
User: The person's right hand looks proportionally off, please fix it
```

**Session limits**

Nano Banana's conversation context has limits. If a conversation gets too long, earlier images may not be referenced accurately. Start a new conversation after finishing a related batch of images.

## Exploring Advanced Features

Beyond basic text-to-image, Nano Banana offers advanced features for more complex creative needs.

**Multi-image composition**

Upload multiple images and have Nano Banana fuse them into one new image:

```
User: [Upload astronaut photo] [Upload basketball court photo]
      Have this astronaut dunk on this basketball court
```

Pro supports up to 14 reference images, but 5 or fewer is recommended for best results.

**Combined text-and-image generation**

This is Nano Banana's unique ability — write content first, then generate matching imagery from it:

```
User: Write a short story about a bunny's adventure, then generate an illustration for it
```

Gemini creates the text first, then generates a matching image from the storyline.

**Search-enhanced generation (Pro)**

Nano Banana Pro supports real-time Google Search grounding to generate images with current information:

```
User: Generate a product image of [latest iPhone model], referencing its official design
```

The system automatically searches for the latest product info to guide generation.

**Aspect ratio control**

You can specify the output aspect ratio:

```
User: Generate a 16:9 widescreen mountain landscape
User: Create a 9:16 vertical phone wallpaper
User: Make a 1:1 square social media image
```

Supported ratios: 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

**Resolution selection (Pro)**

Pro users can specify output resolution:

```
User: Generate a 4K desktop wallpaper
```

Available: 1K (base), 2K (web), 4K (print and large screens)

## Common Errors and Solutions

Here are the most common Nano Banana problems and their fixes.

### Error 1: "Content blocked" or "violates content policy"

**Symptoms**: after entering a prompt, the system says the content violates policy and refuses to generate.

**Causes**:

- Prompt contains sensitive words
- Request involves copyrighted characters (e.g. Disney characters)
- Content misclassified as inappropriate

**Fixes**:

1. Check and remove possible sensitive words
2. Avoid directly naming brands, celebrities, or copyrighted characters
3. Rephrase with more neutral descriptions
4. If you're sure the content is fine, slightly adjust wording and retry

### Error 2: Daily limit exhausted

**Symptoms**: Pro features that worked before are suddenly unavailable, or generated quality visibly drops.

**Cause**: free users get only 2 Pro generations per day, then it automatically falls back to the base version.

**Fixes**:

1. Wait for the daily reset (midnight Pacific Time)
2. Upgrade to a Google AI Pro subscription for higher limits
3. Use the API with your own quota (detailed below)

### Error 3: Blank output / silent failure

**Symptoms**: no response after sending, neither image nor error.

**Causes**:

- Session timeout (30-60 minutes of inactivity)
- Network disconnection
- Prompt too complex, processing timed out

**Fixes**:

1. Refresh the page and start a new session
2. Check network stability
3. Simplify the prompt and break complex requests into steps

### Error 4: 502 Bad Gateway

**Symptoms**: a 502 error page appears.

**Cause**: Google servers overloaded or under maintenance.

**Fixes**:

1. Wait a few minutes and retry
2. Test in incognito mode
3. Clear browser cache and cookies
4. Check the Google Workspace status page

### Error 5: Result drastically different from expectation

**Symptoms**: the generated image is nothing like what you wanted.

**Causes**:

- Prompt not specific enough
- Used terms the model doesn't understand
- Request too abstract

**Fixes**:

1. Rebuild the prompt with the six-element framework
2. Add more concrete details
3. Use a style reference (e.g. "like Apple's official ad style")
4. Iterate step by step toward the goal

### Error 6: Regional access restrictions

**Symptoms**: can't access Gemini image features, or they always show as unavailable.

**Causes**: some regions and account types are restricted.

**Fixes**:

1. Confirm your account age settings qualify
2. Switch to a personal Google account (work accounts may be limited)
3. Check the account's region setting
4. Consider calling the API directly (bypasses client restrictions)

### Quick troubleshooting table

| Symptom | First check | Fix |
| --- | --- | --- |
| "Content blocked" | Prompt sensitive words | Remove or replace sensitive words |
| Quality drop | Daily quota | Wait for reset or upgrade |
| No response | Session state | Refresh the page |
| 502 error | Server status | Wait and retry |
| Wrong result | Prompt quality | Rebuild with six elements |
| Can't access | Account/region | Check account settings |

## API Alternative: Breaking Through Limits

For users with higher needs — large-volume generation, integration into your own app, or bypassing client restrictions — calling the API directly is the better choice.

**Official API access**

Google provides the Gemini API for calling Nano Banana image generation directly:

```python
from google import genai
from google.genai import types

client = genai.Client(api_key="YOUR_GPT88_API_KEY")

response = client.models.generate_content(
    model="gemini-2.5-flash-image",  # or gemini-3-pro-image-preview
    contents="an adorable cat sitting on a windowsill, sunlight streaming through",
    config=types.GenerateContentConfig(
        response_modalities=['IMAGE'],
        image_config=types.ImageConfig(
            aspect_ratio="16:9",
            image_size="2K"
        )
    )
)

# Save the generated image
for part in response.parts:
    if image := part.as_image():
        image.save("output.png")
```

**Advantages of the API**

1. **No UI restrictions**: not affected by client feature toggles
2. **Higher quotas**: different per-minute limits by account tier
3. **Programmable**: batch generation and automation
4. **More parameters**: precise control over resolution, aspect ratio, etc.

**Mainland China access**

For users in China, direct connections to Google API can be unstable. In that case you can use the GPT88 unified gateway, which exposes Nano Banana through an OpenAI-compatible or native Google interface with direct connectivity:

```python
import requests
import base64

API_KEY = "YOUR_GPT88_API_KEY"  # Get it from the gpt88.cc console
API_URL = "https://img.gpt88.cc/v1beta/models/gemini-3-pro-image-preview:generateContent"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "contents": [{
        "parts": [{"text": "cyberpunk city night scene, neon lights, 4K HD"}]
    }],
    "generationConfig": {
        "responseModalities": ["IMAGE"],
        "imageConfig": {
            "aspectRatio": "16:9",
            "imageSize": "4K"
        }
    }
}

response = requests.post(API_URL, headers=headers, json=payload, timeout=180)
result = response.json()

# Extract and save the image
image_data = result["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]
with open("cyberpunk_city.png", "wb") as f:
    f.write(base64.b64decode(image_data))
```

Advantages of this route:

- **Easy to integrate**: just swap the endpoint, key, and model name to start testing
- **Cost verification**: confirm against the current console, orders, and failure-billing rules; exact pricing and quotas are set by the gpt88.cc console
- **Feature verification**: use your own prompts to confirm native Gemini format, 4K output, and reference-image capability
- **Log traceability**: verify that success, failure, timeout, and content-blocking are all locatable in the backend

You can test the effect in the [Agent image workbench](https://agent.gpt88.cc) first, then integrate once it meets your needs. For production with strict SLA requirements, prefer the official API as primary with a gateway service as backup.

## Summary and Quick Reference

By now you should have mastered using Nano Banana in the Gemini app. Let's recap the key points.

**Core concepts**

- **Nano Banana**: base version, fast, unlimited use
- **Nano Banana Pro**: pro version, high quality, 2 free per day

**Six-element prompt framework**

1. Subject: describe the main character specifically
2. Composition: camera framing
3. Action: what's happening
4. Location: background environment
5. Style: visual aesthetics
6. Editing instructions: iterative modification

**Quick-start template**

```
A [style] image: [subject] [action], [scene description]. [Composition] framing, [other effects].
```

**Practical example**

```
A cinematic photo: a young woman walking in the rain holding an umbrella, Tokyo's busy street night scene in the background. Close-up composition, shallow depth of field, neon reflections on the wet ground.
```

**Quick fixes**

| Problem | Fix |
| --- | --- |
| Content blocked | Modify sensitive words and retry |
| Quota exhausted | Wait for reset or upgrade |
| No response | Refresh the page |
| Poor results | Add more detail |

**Advanced path**

1. Practice starting from simple prompts
2. Learn and apply the six-element framework
3. Collect and organize your own effective templates
4. Try multi-turn conversational iteration
5. Explore API integration for automation

Now open the Gemini app and start creating with your first prompt!
