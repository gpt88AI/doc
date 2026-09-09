---
title: Nano Banana என்றால் என்ன? Features, Pricing மற்றும் Prompt Tips (2026 Guide)
description: Google Nano Banana, Gemini 2.5 Flash Image, Nano Banana Pro, free quota, pricing மற்றும் நடைமுறை prompt tips பற்றிய முழுமையான guide.
date: 2026-01-09
category: Gemini专题
tags: [Nano Banana, Gemini, AI Image Generation, Google AI, Prompt Tips]
readTime: 12
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

## Nano Banana என்றால் என்ன?

Nano Banana என்பது Google DeepMind-ன் Gemini குடும்ப AI image generation மற்றும் editing capability-க்கான codename. இது தனி standalone model அல்ல; Gemini multimodal architecture-ன் image module. அதனால் complex instructions, context மற்றும் conversational iteration-ஐ நன்றாக கையாள்கிறது.

| Version | Official Name | Release | Positioning |
| --- | --- | --- | --- |
| Nano Banana | Gemini 2.5 Flash Image | Aug 26, 2025 | வேகம், everyday use |
| Nano Banana Pro | Gemini 3 Pro Image Preview | Nov 20, 2025 | professional quality |

சுருக்கமாக, Nano Banana என்பது Gemini-யின் drawing capability. Chat போல scene-ஐ விவரித்தால் model image உருவாக்கும் அல்லது edit செய்யும்.

## History மற்றும் 3D Figurine Trend

ஆகஸ்ட் 2025-ல் LMArena-வில் anonymous model consistent characters, complex scenes மற்றும் realistic images உருவாக்கியது. ஆகஸ்ட் 26 அன்று Google அதை Gemini 2.5 Flash Image என உறுதி செய்தது. நவம்பரில் Pro வந்தது: 2K/4K output, சிறந்த text rendering, 14 reference images மற்றும் Google Search grounding. Viral 3D figurine output உண்மையான 3D file அல்ல; அது realistic 2D image. `.STL` அல்லது `.OBJ` தேவைப்பட்டால் தனி conversion தேவை.

## Core Features

- **Text-to-image:** scene, lighting மற்றும் style-ஐ natural language-ல் எழுதுங்கள்; keyword stacking தவிர்க்கவும்.
- **Image editing:** elements சேர்க்க/நீக்க, style மாற்ற, sky அல்லது உடை போன்ற local பகுதிகளை மட்டும் மாற்றலாம். Pro-வில் masked editing உள்ளது.
- **Multi-image composition:** பல reference images-ஐ ஒரே scene-ல் இணைக்கலாம்; Pro 14 images மற்றும் 5 characters வரை consistency காக்கும்.
- **Text rendering:** Pro long text, calligraphy மற்றும் பல மொழிகளை நன்றாக render செய்கிறது.
- **Web Search grounding:** current weather, recipes அல்லது sports scores போன்ற live data பயன்படுத்தலாம்.

## Free Quota மற்றும் Pricing

Gemini App free users-க்கு 2 images/day, Google AI Studio-க்கு 500 requests/day, புதிய Google Cloud users-க்கு $300/90 days credit கிடைக்கலாம். Quota UTC midnight-ல் reset ஆகும்; success, filtered request மற்றும் technical failure கூட quota பயன்படுத்தலாம். Pro quota முடிந்தால் plain Nano Banana-க்கு fallback ஆகலாம். API prices: Gemini 2.5 Flash Image $0.039/image, Gemini 3 Pro Image 1K-2K $0.134, 4K $0.24. Batch API 24-hour delay-க்கு 50% discount வழங்கலாம்.

GPT88 unified gateway மூலம் OpenAI-compatible அல்லது native Google interface பயன்படுத்தலாம். Current console-ல் model coverage, RMB pricing மற்றும் failed-request billing verify செய்யவும். API key-ஐ source code-ல் வைக்க வேண்டாம்.

## Prompt Tips

Natural language பயன்படுத்துங்கள்: “an orange cat sitting on a neon-lit street...”। Background மாற்றும்போது subject lighting-ஐ காப்பாற்ற வேண்டும் என்று context கொடுக்கவும். முதலில் base image உருவாக்கி பல rounds-ல் refine செய்யவும். Multi-image composition-ல் முக்கிய reference-ஐ முதலில் வைக்கவும். Text-க்கு exact words-ஐ quotes-ல், position, font மற்றும் size-ஐ குறிப்பிடவும். Consistency-க்கு அதே reference-ஐ reuse செய்து facial features identical என்று சொல்லவும்.

Blurry text-க்கு Pro மற்றும் explicit font size, warped face-க்கு clear frontal reference, inconsistent style-க்கு concrete style description, filtered content-க்கு safety settings அல்லது rephrasing பயன்படுத்தவும்.

## FAQ

Nano Banana வேகம் மற்றும் 1024 output-க்கு; Pro quality, 4K, சிறந்த text மற்றும் 14-image composition-க்கு. Free Gemini App 2 images/day, AI Studio up to 500 requests/day வழங்கும். Images-ல் invisible SynthID watermark இருக்கும். Commercial use latest Google terms மற்றும் content policy-க்கு உட்பட்டது. Chinese prompts நன்றாக வேலை செய்யும்; complex instructions English-ல் அதிகம் accurate ஆகலாம்.

## Further Reading

- [Nano Banana Pro Multi-Reference Guide](/en/docs/blog/nano-banana-pro-multi-reference-guide/)
- [Nano Banana Pro Pricing & Quota Guide](/en/docs/blog/nano-banana-pro-pricing-quota-guide-2026/)
- [Google Image Generation API](/en/docs/api/images/)
