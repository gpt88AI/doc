---
title: GPT Image 2 API மெதுவாக அல்லது timeout ஆனால் முதலில் தோல்வியடைந்த layer-ஐ கண்டறியுங்கள்
description: first byte, final image, timeout layer, route மற்றும் retries-ஐ தனித்தனியாக அளந்து GPT Image 2 அழைப்புகளை debug செய்வது.
date: 2026-05-12
category: தொழில்நுட்ப வழிகாட்டி
tags: [GPT Image 2, OpenAI API, Image Generation, API Troubleshooting, Latency]
readTime: 12
relatedPath: /docs/api/errors/
relatedTitle: API Error Codes
---

GPT Image 2 மெதுவாகத் தோன்றினால் model-ஐ உடனே குறை கூற வேண்டாம். சிக்கலான prompt, பல reference images, பெரிய output அல்லது high quality நேரம் எடுக்கலாம்; அதே நேரத்தில் browser, serverless function, reverse proxy அல்லது gateway முதலில் timeout ஆகலாம். ஒவ்வொரு முயற்சியிலும் `connect_ms`, `first_byte_ms`, `first_partial_image_ms`, `final_image_ms`, `download_ms`, `render_ms`, `retry_count`, `http_status`, `request_id`, `model`, `quality`, `size`, `format`, `route_owner` ஆகியவற்றை பதிவு செய்யுங்கள்.

## Normal Wait மற்றும் False Timeout

Generation தாமதமாக வெற்றி பெறுகிறதா, upstream வேலை செய்தாலும் browser/proxy முன்பே மூடுகிறதா, அல்லது local timeout பிறகு retry ஒரே வேலையை பலமுறை தொடங்குகிறதா என்பதைப் பிரிக்கவும். ஒரே `gpt-image-2` பெயர் direct OpenAI, Azure, gateway அல்லது reverse route-ல் ஒரே பாதையை குறிக்காது. Base URL, timeout policy, retry policy, log owner ஆகியவற்றை தனியாகப் பதிவு செய்யுங்கள்.

## Timeout Budget மற்றும் Baseline

Browser-ல் முழு synchronous generation-ஐ காத்திருக்காமல் job ID, progress அல்லது async status திருப்புங்கள். Edge, proxy, backend worker ஆகியவற்றின் timeout-ஐ தனித்தனியாகப் பாருங்கள். முதலில் ஒரே request-ஐ மூன்று முறை baseline ஆக இயக்கி, பின்னர் sync/async, format, quality அல்லது route-ல் ஒரு variable மட்டும் மாற்றுங்கள். Draft-க்கு low quality, square output அல்லது JPEG சோதிக்கலாம்; diagnosis இல்லாமல் production quality-ஐ குறைக்க வேண்டாம்.

## Streaming, Async மற்றும் Retries

Streaming partial image-ஐ முன்கூட்டியே காட்டலாம்; final computation வேகமாகும் என்று உறுதி இல்லை. Async task browser timeout மற்றும் duplicate clicks-ஐ குறைக்கும். Local timeout பிறகு புதிய request உருவாக்குவதற்கு முன் பழைய task இன்னும் ஓடுகிறதா என்று சரிபார்க்கவும். 429-க்கு reset header மற்றும் exponential backoff, 5xx-க்கு capped retry மற்றும் jitter பயன்படுத்தி, ஒரே pending job-ஐ deduplicate செய்யுங்கள்.

## Evidence மற்றும் Reproduction

Direct route-க்கு model ID, endpoint, request ID, limit headers; Azure-க்கு deployment, region, quota; gateway-க்கு base URL, upstream status, timeout, internal retries பதிவு செய்யுங்கள். Browser sync path மட்டும் தோல்வியடைந்தால் “OpenAI மெதுவாக உள்ளது” என்று எழுத வேண்டாம்; ஒரு gateway மட்டும் மெதுவாக இருந்தால் அதை official model behavior என்று கருத வேண்டாம். API keys, tokens, private images அல்லது முழுமையான customer logs பகிர வேண்டாம்.

## Production Guardrails

Generate button-ல் pending state, backend-ல் idempotency/deduplication, error-ல் local timeout, gateway timeout, upstream error, API error ஆகியவற்றைத் தெளிவாக வைத்திருங்கள். Dashboard-ல் route owner அடிப்படையில் latency-ஐ பிரிக்கவும். Draft-க்கு bounded queue அல்லது low-quality fallback இருக்கலாம்; production asset-ஐ காரணம் அறியாமல் தரம் குறைக்க வேண்டாம்.

## FAQ

### Slow generation இயல்பானதா?

சிக்கலான prompt மெதுவாக இருக்கலாம்; முதலில் `first_byte_ms` மற்றும் `final_image_ms` பாருங்கள்.

### Streaming final image-ஐ வேகமாக்குமா?

இல்லை. அது progress-ஐ முன்கூட்டியே காட்டி duplicate clicks-ஐ குறைக்கும்.

### Gateway காரணமா?

ஒரே parameters-ல் direct மற்றும் gateway-ஐ like-for-like comparison செய்யுங்கள்.

## Further Reading

- [API Error Codes](/docs/api/errors/)
- [GPT Image 2 Noise and Texture Artifacts](/docs/blog/gpt-image-2-low-quality/)
