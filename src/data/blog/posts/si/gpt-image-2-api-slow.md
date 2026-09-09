---
title: GPT Image 2 API මන්දගාමී හෝ timeout වූ විට පළමුව අසමත් layer එක සොයන්න
description: first byte, final image, timeout layer, route සහ retries වෙන වෙනම මැන GPT Image 2 calls debug කරන ක්‍රමය.
date: 2026-05-12
category: තාක්ෂණික නිබන්ධනය
tags: [GPT Image 2, OpenAI API, Image Generation, API Troubleshooting, Latency]
readTime: 12
relatedPath: /docs/api/errors/
relatedTitle: API Error Codes
---

GPT Image 2 call එක මන්දගාමී වූ විට model එකට වහාම දොස් නොදෙන්න. සංකීර්ණ prompt, reference images බොහෝ ගණනක්, විශාල output හෝ high quality සඳහා කාලය ගත විය හැක; browser, serverless function, reverse proxy හෝ gateway එක පෙර timeout විය හැක. සෑම උත්සාහයකම `connect_ms`, `first_byte_ms`, `first_partial_image_ms`, `final_image_ms`, `download_ms`, `render_ms`, `retry_count`, `http_status`, `request_id`, `model`, `quality`, `size`, `format` සහ `route_owner` සටහන් කරන්න.

## Normal Wait සහ False Timeout

Generation එක ප්‍රමාද වී සාර්ථක වූවාද, upstream ක්‍රියාත්මක වෙද්දී browser/proxy එක පෙර වැසුණාද, නැත්නම් local timeout පසු retry මඟින් එකම කාර්යය කිහිපවරක් ආරම්භ කළාද වෙන්කර බලන්න. එකම `gpt-image-2` නාමය direct OpenAI, Azure, gateway හෝ reverse route එකම path එකක් බව නොපෙන්වයි. Base URL, timeout policy, retry policy සහ log owner වෙන වෙනම සටහන් කරන්න.

## Timeout Budget සහ Baseline

Browser එකේ සම්පූර්ණ synchronous generation එක රඳවා නොගෙන job ID, progress හෝ async status ආපසු දෙන්න. Edge, proxy සහ backend worker timeout වෙන වෙනම පරීක්ෂා කරන්න. පළමුව එකම request එක තුන්වරක් baseline ලෙස ධාවනය කර, පසුව sync/async, format, quality හෝ route එකෙන් එක variable එකක් පමණක් වෙනස් කරන්න. Draft සඳහා low quality, square output හෝ JPEG පරීක්ෂා කළ හැක.

## Streaming, Async සහ Retries

Streaming මඟින් partial image කලින් පෙන්විය හැකි නමුත් final computation අනිවාර්යයෙන් වේගවත් නොවේ. Async task browser timeout සහ duplicate clicks අඩු කරයි. Local timeout පසු නව request එකක් කිරීමට පෙර පැරණි task එක තවම ක්‍රියාත්මකද බලන්න. 429 සඳහා reset header සහ exponential backoff, 5xx සඳහා capped retry සහ jitter භාවිත කරන්න; එකම pending job එක deduplicate කරන්න.

## Evidence සහ Reproduction

Direct route සඳහා model ID, endpoint, request ID සහ limit headers; Azure සඳහා deployment, region සහ quota; gateway සඳහා base URL, upstream status, timeout සහ internal retries තබාගන්න. Browser sync path එක පමණක් අසමත් නම් “OpenAI මන්දගාමීයි” නොකියන්න; gateway එකක් පමණක් මන්දගාමී නම් එය official model behavior ලෙස නොසලකන්න. API keys, tokens, private images හෝ අමු customer logs බෙදා නොගන්න.

## Production Guardrails

Generate button එකට pending state, backend එකට idempotency/deduplication, සහ errors සඳහා local timeout, gateway timeout, upstream error හෝ API error පැහැදිලි කරන්න. Dashboard එකේ route owner අනුව latency වෙන්කර මැනීම කරන්න. හේතුව නොදැන production asset quality අඩු නොකරන්න.

## FAQ

### Slow generation සාමාන්‍යද?

සංකීර්ණ prompt මන්දගාමී විය හැකි නමුත් පළමුව `first_byte_ms` සහ `final_image_ms` බලන්න.

### Streaming final image වේගවත් කරයිද?

නැත. එය progress කලින් පෙන්වා duplicate clicks අඩු කරයි.

### Gateway එකම හේතුවද?

එකම parameters යටතේ direct සහ gateway like-for-like ලෙස සසඳන්න.

## Further Reading

- [API Error Codes](/docs/api/errors/)
- [GPT Image 2 Noise and Texture Artifacts](/docs/blog/gpt-image-2-low-quality/)
