---
title: Gemini 4K Image API: वर्तमान मॉडल, कोड और लागत सीमाएँ
description: Gemini 4K image generation API की व्यावहारिक गाइड: वर्तमान model ID, Interactions API, 1K/2K/4K tiers, Standard बनाम Batch/Flex pricing, project quotas और 429 troubleshooting।
date: 2026-01-20
category: API विकास
tags: [Gemini API, 4K Image Generation, Nano Banana Pro, Gemini 3 Pro Image, AI Image API]
readTime: 14
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

Gemini 4K integration के लिए पुराने preview examples पर निर्भर न करें। वर्तमान route `gemini-3-pro-image` है। नए examples में Interactions API के `response_format` से image output नियंत्रित करें और Standard, Batch, Flex, Priority तथा third-party gateway की लागत अलग रखें। 2026-07-08 के official mapping में Nano Banana Pro को Gemini 3 Pro Image और इसी model ID से जोड़ा गया है। उदाहरण के लिए 4K Standard लगभग `$0.24/image` और Batch/Flex equivalent लगभग `$0.12/image` है; production से पहले official pricing जाँचें।

## वर्तमान मॉडल चुनना

| Model | पहचान | उपयुक्त काम |
| --- | --- | --- |
| `gemini-3-pro-image` | Nano Banana Pro / Gemini 3 Pro Image | complex निर्देश, professional assets, 4K, strict text और brand consistency |
| `gemini-3.1-flash-image` | Nano Banana 2 | सामान्य generation, editing, iteration, कम लागत और तेज गति |
| `gemini-3.1-flash-lite-image` | Nano Banana 2 Lite | बड़े volume, low-cost, low-latency tasks |
| `gemini-2.5-flash-image` | Legacy Nano Banana route | पुराने projects की compatibility |

4K deliverable के लिए पहले `gemini-3-pro-image` evaluate करें। केवल quick draft चाहिए तो 1K/2K या सस्ता model अधिक controllable है। पुराने preview names को नए code का आधार न बनाएं।

## API key और environment

Keys Google Cloud project से जुड़ी होती हैं। Billing, quota, logs और rate limits को project स्तर पर देखें, key string से नहीं।

```bash
export GEMINI_API_KEY="your_key_here"
```

Official libraries `GEMINI_API_KEY` या `GOOGLE_API_KEY` पढ़ती हैं; दोनों हों तो `GOOGLE_API_KEY` को प्राथमिकता मिल सकती है। Production में key frontend, mobile bundle, public repo, screenshot या logs में न रखें।

## Minimal 4K call

```python
from google import genai
import base64

client = genai.Client()
interaction = client.interactions.create(
    model="gemini-3-pro-image",
    input="Generate a 16:9 premium skincare product hero image",
    response_format={
        "type": "image",
        "aspect_ratio": "16:9",
        "image_size": "4K",
    },
)

if interaction.output_image:
    with open("gemini-4k-product-hero.png", "wb") as f:
        f.write(base64.b64decode(interaction.output_image.data))
```

`image_size` केवल `1K`, `2K` या `4K` tier चुनता है; वास्तविक pixels aspect ratio पर निर्भर हैं। GPT88 Google-compatible surface से call करते समय base URL `https://img.gpt88.cc` और console का `YOUR_GPT88_API_KEY` इस्तेमाल करें।

## Reference image और image-to-image

Existing image से composition rebuild, background swap या branded asset बनाया जा सकता है। Reference upload करने से पहले copyright और usage rights जाँचें। Safety और prohibited-use policies फिर भी लागू रहती हैं।

```python
interaction = client.interactions.create(
    model="gemini-3-pro-image",
    input=[
        {"type": "text", "text": "Keep the bottle and label, change the scene to a premium bathroom counter."},
        {"type": "image", "mime_type": "image/png", "data": reference},
    ],
    response_format={"type": "image", "aspect_ratio": "16:9", "image_size": "4K"},
)
```

## 4K dimensions

4K एक output tier है, हमेशा `4096x4096` नहीं। उदाहरण: 1:1 = `4096 x 4096`, 16:9 = `5504 x 3072`, 9:16 = `3072 x 5504`, 4:5 = `3712 x 4608`, 21:9 = `6336 x 2688`। Web display के लिए 2K पर्याप्त हो सकता है; 4K cropping, print, large display और post-processing headroom के लिए रखें।

## Cost boundaries

उदाहरण Standard pricing: 1K/2K लगभग `$0.134/image`, 4K लगभग `$0.24/image`; Batch/Flex 4K equivalent लगभग `$0.12/image`। Input text, reference images, thinking/text output, Search grounding, retries और failures भी bill को प्रभावित कर सकते हैं। Conservative flow: पहले 1K/2K से creative approval लें, फिर final 4K बनाएं; non-realtime batch को Batch/Flex में भेजें। GPT88 gateway में official usage × selected group multiplier के आधार पर charge देखें।

## Quota और 429 troubleshooting

Rate limits सामान्यतः RPM, TPM, RPD और image models के लिए IPM होती हैं। ये project-level limits हैं; अतिरिक्त API keys से capacity स्वतः नहीं बढ़ती। Project ID, model ID, call type, output size, concurrency, retry interval और spend limit रिकॉर्ड करें। 429 पर concurrency घटाएँ, exponential backoff लगाएँ, 4K jobs queue करें या Batch/Flex अपनाएँ।

## Gateway का मूल्यांकन

Third-party gateway payment, compatible interface और routing में मदद कर सकता है, पर वह official Google API नहीं है। Current model name, `image_size` support, वास्तविक pixels, failure billing, per-request logs, data boundary, refund और SLA जाँचें। बिना audit evidence के unlimited capacity, fixed pricing या zero-failure billing का दावा न करें।

## Prompt और delivery flow

Prompt में delivery purpose, subject constraints, frame specification, style, lighting, copy area और post-processing needs लिखें। Prompt में “8K” लिखना API output tier नहीं बदलता; वास्तविक tier `response_format` के `image_size` से नियंत्रित होता है। Series के लिए size, aspect ratio, references, brand prohibitions, filename और acceptance criteria स्थिर रखें।

## FAQ

### क्या 4K के लिए Nano Banana Pro आवश्यक है?

Professional 4K assets के लिए `gemini-3-pro-image` पहले evaluate करें। Draft और low-cost iteration के लिए Flash या Lite देखें।

### क्या पुराना preview model name इस्तेमाल कर सकते हैं?

Historical tutorials या aliases में दिख सकता है, लेकिन नए formal integration में current official model ID इस्तेमाल करें।

### क्या Free Tier 4K बना सकता है?

पुराने articles की fixed free quota को current न मानें। Project, model और current AI Studio limits पर निर्भर करें; official pricing में Free Tier उपलब्ध न भी हो सकता है।

### क्या `image_size="4K"` हमेशा 4096 x 4096 है?

नहीं। Aspect ratio के अनुसार वास्तविक dimensions बदलते हैं।

### क्या SynthID हटाया जा सकता है?

Generated images में SynthID watermark हो सकता है। Attribution और compliance के लिए AI generation और usage scope पारदर्शी रखें।

### 429 क्यों आता है?

RPM, TPM, RPD, IPM, spend limit या temporary capacity कारण हो सकते हैं। यह project-level issue है; quota, billing और active limits जाँचें।

## Pre-launch checklist

- Model ID `gemini-3-pro-image` पर बदला गया है।
- नया code Interactions API और `response_format` इस्तेमाल करता है।
- Keys backend environment या secret system में हैं।
- Project, billing, rate limits और spend limit दर्ज हैं।
- 1K/2K/4K budget current pricing से verify है।
- 429, 403, unavailable model और empty output के handling paths हैं।
- Gateway को candidate route मानकर model, output, billing, failures और data boundary verify किए गए हैं।

सही 4K integration “HD”, “latest” और “cheap” जैसे keywords जोड़ना नहीं है; model, output tier, budget, quota और safety boundary स्पष्ट करना है।

## Further Reading

- [Image Generation API](/docs/api/images/)
