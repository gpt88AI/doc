---
title: Nano Banana Pro API තෝරාගන්නේ කෙසේද: Cheap, Stable සහ High-Concurrency Route එක මුලින් පරීක්ෂා කරන්න
description: Google direct, Batch/Flex, verifiable gateway සහ dual-route verification වෙන් කර price ownership, logs, billing සහ concurrency tests මත production route එක තෝරන්න.
date: 2026-01-21
category: API开发
tags: [Nano Banana Pro, Gemini API, AI Image API, API Gateway, Production Validation]
readTime: 14
relatedPath: /docs/api/images/
relatedTitle: Google Image Generation API
---

“අඩුම මිල” Nano Banana Pro API එක vendor slogan එකක් නොව access choice එකකි. Official model, Google quota, Cloud billing සහ first-party support අවශ්‍ය නම් Google direct baseline එකක් තබන්න; බලා සිටිය හැකි batch වැඩ සඳහා Batch/Flex සසඳන්න; OpenAI-compatible SDK, local payments, logs, orders, POC හෝ backup line අවශ්‍ය නම් gpt88.cc වෙනම gateway test එකක් ලෙස පරීක්ෂා කරන්න. පැරණි fixed price, latency හෝ unlimited concurrency claims production budget එකක් ලෙස භාවිත නොකරන්න.

| Route | සුදුසු | Production පෙර verify කරන්න |
| --- | --- | --- |
| Google Standard | Real-time official generation | current model price, quota, region, billing, errors |
| Google Batch/Flex | බලා සිටිය හැකි batch tasks | queue window, retry, delivery monitoring, latency tolerance |
| Verifiable gateway | OpenAI-compatible calls, local payment, logs, POC | current console route, price, charges, records, support |
| Dual-route verification | Google baseline + gateway backup | same prompts, acceptance, usable-image cost, fault ownership |

## Nano Banana Pro සහ official model එක වෙන් කරන්න

Market එකේ Nano Banana Pro සාමාන්‍ය නාමයකි; official price, quota සහ parameters සඳහා Google current model ID `gemini-3-pro-image` බලන්න. Gateway එකකට තමන්ගේ route string එකක් තිබිය හැක. Base URL, key, model/route, timeout, retry සහ logs configurable තබන්න; business logic එකේ hardcode නොකරන්න.

## Price එකේ owner කවුද?

Google official price සහ gateway price වෙන වෙනම responsibility surfaces වේ. Gateway current price, balance, order status සහ call logs ඔබේ account එක තුළ verify කරන්න; පැරණි articles හෝ forums වල numbers current budget සඳහා සාක්ෂි නොවේ. නිවැරදි metric එක “cost per usable image” වන අතර same prompts, acceptance, retries සහ human support ඇතුළත් කරන්න.

## Gateway එක test කළ යුත්තේ කවදාද

Existing OpenAI SDK, local payment, balance/order verification, Chinese support, POC logs හෝ backup channel අවශ්‍ය නම් gateway test එක ප්‍රයෝජනවත් විය හැක. Google first-party contract, Cloud audit, official quota, compliance හෝ Batch/Flex responsibility අවශ්‍ය නම් Google direct baseline එක තබන්න. Gateway එක සෑම විටම primary ලෙස නොසලකන්න.

## Stability සහ high concurrency මැන බලන්න

20–50 near-production prompts වලින් ආරම්භ කරන්න. Resolution, reference images, timeout, retry count සහ acceptance criteria fix කරන්න. සෑම call එකකම route, model, request ID, status, image returned, usable result, latency, retries සහ charge record සටහන් කරන්න. Success rate, P50/P95 latency, 429/quota, 5xx/timeout සහ billing trail වෙන වෙනම බලන්න. Errors හෝ charges පැහැදිලි කළ නොහැකි නම් scaling නවත්වන්න.

## No-image, failure සහ billing එකට බලන්න

HTTP success යනු usable image එකක් ලැබුණා යන්නට සහතිකයක් නොවේ. Safety block, timeout හෝ blind retry එකක් දෙවන charge එකක් ඇති කළ හැක. සෑම failure එකකටම request ID, response, order ID, balance change, retry count සහ image returned record කරන්න. Charge mismatch නම් පළමුව reconcile කරන්න. OpenAI-compatible request shape එක සමාන විය හැක; quota, price, logs, model IDs සහ support contract සමාන නොවේ.

## Production closed loop

පළමුව Google official baseline, පසුව same prompts සමඟ gateway test, ඉන්පසු usable-image cost, failure categories, billing traceability සහ support response සසඳන්න. POC, bounded load test, dual-route trial, production scaling සහ backup review සඳහා වෙන වෙනම pass criteria තබන්න. Gateway එක primary, backup හෝ POC-only ද යන්න එවිට තීරණය කරන්න.

### අඩුම මිල සහ stable route එක කුමක්ද?

Google direct හරහා official model/price/quota verify කර Batch/Flex බලන්න. Compatibility, payment, logs හෝ backup අවශ්‍ය නම් gateway test කරන්න. සැබෑ load එකේ cost per usable image සහ explainable failures තීරණාත්මකය.

### Gateway එක සෑම විටම Google direct එකට වඩා ලාභදායකද?

නැත. එකම task එකේ current console charges, retries, queue සහ usable output සසඳන්න.
