---
title: Mainland China සඳහා Gemini 3 Pro Image API route: Official pricing, Gateway සහ production verification
description: gemini-3-pro-image හි official model ID සහ Standard/Batch/Flex pricing GPT88 Gateway හි access, payment, logs සහ support route වලින් වෙන් කර තබන්න.
date: 2026-01-20
category: API සංවර්ධනය
tags: [Gemini 3 Pro Image, GPT88, API Channel Comparison, Cost Optimization, Production Verification]
readTime: 13
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

Production integration එකක කරුණු තුනක් වෙන් කර තබන්න: Google official `gemini-3-pro-image` model ID, pricing, Batch/Flex සහ project quotas පාලනය කරයි; GPT88 වැනි unified gateway එක Mainland-China developers සඳහා access, OpenAI-compatible calls, payment, billing, logs සහ support පහසු කළ හැක; stability සහ throughput docs, console, logs සහ load tests මඟින් පමණක් ඔප්පු වේ.

**සෘජු නිගමනය:** Google direct quota, company card, compliance සහ Batch/Flex තිබේ නම් official route එක baseline කරන්න. Access, local payment, request logs හෝ support friction තිබේ නම් Gateway එක test channel එකක් ලෙස තබන්න. පැරණි articles හි fixed low price, unlimited throughput, latency, success rate හෝ failure billing production facts ලෙස නොසලකන්න.

| Route | ගැළපෙන භාවිතය | Launch පෙර පරීක්ෂා කරන්න |
| --- | --- | --- |
| Google Standard | Official realtime, compliance | model pricing, quota, region, billing |
| Google Batch/Flex | Async හෝ elastic workload | latency, retry, delivery window |
| Gateway | OpenAI-compatible access, local payment, logs, support | callable route, price, success/error logs |
| Dual channel | Official සහ gateway වෙන වෙනම verification | model, cost, errors, fallback attribution |

## Facts වල owner වෙන් කරන්න

Google docs official model ID, pricing, Free Tier සහ quotas සඳහා source වේ. Gateway තමන්ගේ route string, billing unit, order logs, support සහ console behavior සඳහා පමණක් source වේ. ඔබේ team එක concurrency, acceptable error rate සහ fallback ඔප්පු කළ යුතුය. Official ID `gemini-3-pro-image` තබන්න; `gemini-3-pro-image-preview` පැරණි code හෝ platform route එකක migration clue විය හැක.

## Official route

Google Standard realtime, Batch queued async සහ Flex elastic processing සඳහාය. Batch/Flex අඩු වියදම් විය හැකි නමුත් realtime API එකේ සමාන replacement එකක් නොවේ. Current official pricing සහ project quota බලන්න; static numbers permanent quote ලෙස නොලියන්න.

## Gateway access friction විසඳයි, official facts නොවේ

OpenAI-compatible SDK, local top-up/payment, request logs, order reconciliation, Chinese support හෝ parallel POC අවශ්‍ය නම් GPT88 Gateway test කරන්න. එය Google official pricing, quota හෝ සෑමවිටම cheapest/most stable route එකක් ලෙස නොලියන්න. Docs සහ console තුළ current route, billing unit, failure handling සහ support response පරීක්ෂා කරන්න.

## High throughput evidence මඟින් පරීක්ෂා කරන්න

20–50 low-risk production-like prompts ගෙන resolution, timeout, retry සහ acceptance criteria එකසේ තබන්න. Google direct සහ gateway දෙකම ධාවනය කර status, latency, image return, errors, billing records සහ support response සටහන් කරන්න. Concurrency ක්‍රමයෙන් වැඩි කරන්න. 429, trace කළ නොහැකි charges, ඉහළ යන error rate හෝ uncontrolled retry තිබේ නම් නවත්වන්න.

## Code තුළ model ID සහ platform route වෙන් කරන්න

Official ID සහ gateway route string එකම constant එකක් නොකරන්න. Gateway හි exact `model` docs/console එකෙන් කියවා environment variable එකක තබන්න. Request ID, route, output status සහ billing record logs තුළ තබන්න.

## Accepted result එකකට cost මැනීම

Official baseline, platform billing unit, pass rate සහ retry/manual/support cost සටහන් කරන්න. `cost per accepted image = total actual bill ÷ accepted images`। එකම prompt, resolution සහ criteria මත සසඳන්න; same-round evidence නොමැතිව fixed savings percentage නොලියන්න.

## FAQ

### භාවිත කළ යුතු model ID කුමක්ද?

Google official route සඳහා `gemini-3-pro-image`; platform route string Google ID ලෙස නොලියන්න.

### Gateway සෑම ප්‍රශ්නයකටම recommend කළ හැකිද?

නැත. Access/payment/logging/support friction සහ පරීක්ෂා කළ හැකි evidence තිබේ නම් test route එකක් ලෙස පමණි.

### High concurrency verify කරන්නේ කෙසේද?

Gradual load test තුළ quota, status, latency, errors, retries, billing සහ fallback record කරන්න.

### Batch/Flex ද Gateway ද?

Official async cost අවශ්‍ය නම් Batch/Flex; access හෝ local support අවශ්‍ය නම් Gateway test කරන්න.

### Success වුවත් image එක නොලැබුණොත්?

No-image response එක වෙනම error class එකක් කර request/order logs මඟින් charge reconcile කරන්න.

### Gateway එක cheapest/most stable ලෙස ලියන්න පුළුවන්ද?

Same-round console, billing සහ load-test evidence නොමැති නම් නොහැක.
