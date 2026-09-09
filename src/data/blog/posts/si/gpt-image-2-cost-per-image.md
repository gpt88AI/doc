---
title: GPT Image 2 API Pricing: එක් image එකක cost සහ සැබෑ bill
description: Official output examples, token pricing, Batch සහ provider contract වෙන් කර GPT Image 2 production budget එකක් සාදන්න.
date: 2026-05-08
category: API සංවර්ධනය
tags: [GPT Image 2, OpenAI API, Image Generation Pricing, API Cost, Batch API]
readTime: 9
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

GPT Image 2 cost එක fixed per-image price එකක් නොවේ. 2026 මැයි 8 official examples අනුව 1024x1024 output එක low සඳහා $0.006, medium සඳහා $0.053 සහ high සඳහා $0.211 වේ. 1024x1536 හෝ 1536x1024 examples $0.005, $0.041 සහ $0.165 වේ. මේවා output examples පමණි; සැබෑ bill එකට text input, image input, editing, partial images සහ retries එකතු විය හැක.

## Official examples මුලින්

| Size | Low | Medium | High |
| --- | --- | --- | --- |
| 1024x1024 | $0.006 | $0.053 | $0.211 |
| 1024x1536 | $0.005 | $0.041 | $0.165 |
| 1536x1024 | $0.005 | $0.041 | $0.165 |

Budget එකේ මේවා starting point ලෙස ලියන්න, final quote ලෙස නොවේ. Reference image, edit input, retry සහ Batch සඳහා වෙනම fields තබන්න.

## Token pricing සහ Batch

Official pricing image input, cached input, image output සහ text input token lines මත පදනම් වේ. එබැවින් $0.211 සෑම image එකකටම universal price එකක් නොවේ. Qualifying asynchronous වැඩ සඳහා Batch cost අඩු කළ හැක; නමුත් interactive page එකක ක්ෂණික response අවශ්‍ය නම් එය නොගැළපේ.

## Real bill formula

`model`, `size`, `quality`, `has_image_input`, `partial_images`, `retry_count` සහ `route` (`direct`, `Batch`, `provider`) log කරන්න. “1000 images generated” පමණක් ප්‍රමාණවත් නොවේ; accepted output, retries සහ manual revision ද සටහන් කරන්න. Non-square image එකක් හැමවිටම මිල අධික නොවේ; pixel area මත linear estimate නොකර official size/quality row භාවිත කරන්න.

## Contracts වෙන් කරන්න

OpenAI direct official billing සහ project attribution ලබා දෙයි. Batch offline jobs සඳහාය. Provider හෝ GPT88 තමන්ගේ pricing, multiplier, quota සහ support contract තබා ගනී. ChatGPT membership consumer entitlement එකකි; එය free `gpt-image-2` API එකක් නොකරයි.

### $0.211 fixed price එකක්ද?

නැත. එය 1024x1024 high-quality output එකක official example එකක් පමණි.

### සැබෑ cost එක මැනන්නේ කෙසේද?

Size, quality, input, retries, route සහ accepted output එකට log කරන්න.

### Provider quote එක OpenAI price සමඟ සෘජුව compare කළ හැකිද?

නැත. මුලින් ownership සහ billing unit පැහැදිලි කරන්න; provider එක වෙනම contract එකකි.
