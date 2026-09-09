---
title: Adobe Firefly තුළ GPT Image 2 නොමිලේද? Routes තුනක්, contract table එකක්
description: Firefly තුළ GPT Image 2 පෙනීමෙන් ඔබේ account එකට එය free හෝ unlimited බව තහවුරු නොවේ. Model, credits, plan, download සහ data boundary පරීක්ෂා කරන්න.
date: 2026-05-04
category: API සංවර්ධනය
tags: [GPT Image 2, Adobe Firefly, ChatGPT Images, OpenAI API, Free AI Image Generation]
readTime: 12
relatedPath: /docs/guides/billing-units/
relatedTitle: Billing Units
---

**ප්‍රධාන කරුණ: Adobe Firefly තුළ GPT Image 2 පෙනීම ඔබේ Adobe account එකට එය නොමිලේ බවට සාක්ෂියක් නොවේ.** Firefly Free සීමිත daily generations සහ models කිහිපයක් ලබා දෙයි; සෑම free account එකකටම GPT Image 2 ඇතුළත් බව තහවුරු නොවේ. Official `gpt-image-2` API එක API Free tier support නොකරයි.

## Route-Contract Table

| Route | Contract | මුලින් පරීක්ෂා කළ යුතු දේ |
| --- | --- | --- |
| Adobe Firefly | Adobe surface එකේ partner model; free plan සීමිත generation | model label, plan, credits, deduction, region, consent, download |
| ChatGPT app | වෙනම OpenAI app contract; chat generation API credit නොවේ | quota, data settings, download |
| Official API | developer contract; API Free tier නැත | billing, org permission, price, limits, logs, retries |
| GPT88 gateway | වෙනම provider contract; RMB balance සහ console quota | base URL, billing, availability, failure charge |

“Start for free” button එක පමණක් production capacity ලෙස නොසලකන්න. Product owner, payer, free boundary සහ failure support පැහැදිලි නොවේ නම් real assets upload නොකරන්න.

## Adobe සහ Account Verification

Adobe partner-model path එක Firefly තුළ entry එකක් ඇති බව පෙන්වයි; ඔබේ region/account එකේ model පෙනේද, Firefly Free තුළ ඇතුළත්ද, download සහ commercial terms සම්පූර්ණද යන්න වෙනම ප්‍රශ්න වේ. Help page එක low/medium/high resolution සඳහා 5/20/80 generative credits reference කරයි; region, plan සහ rate වෙනස් විය හැක. ඔබේ account UI එක current evidence ලෙස ගන්න.

Model selector, plan/credit balance, generation කිරීමට පෙර expected deduction, partner consent, upload සහ download පරීක්ෂා කරන්න. Model එක නොපෙනේ නම් “current account එකට unavailable” ලෙස ලියන්න. Shared account, region bypass හෝ unknown wrapper entitlement තහවුරු නොකරයි.

## Low-Risk Verification

1. Official Adobe domain එකෙන් Firefly විවෘත කර model label record කරන්න.
2. Generate කිරීමට පෙර plan, balance සහ expected deduction සටහන් කරන්න.
3. Public, non-sensitive prompt එකකින් low-cost image එකක් පමණක් සාදන්න.
4. Model result, credit difference සහ failure reason record කරන්න.
5. Download කර resolution, format, content සහ text පරීක්ෂා කරන්න.

Prompt/reference data යන්නේ කොතැනටද නොදැන client files upload නොකරන්න. Preview එක ලැබීම completion නොවේ; queue, timeout, safety block, region block සහ insufficient credits වෙන වෙනම failure branches වේ.

## Firefly, ChatGPT සහ API වෙනමයි

Firefly Adobe හි app-and-credits contract එකකි. ChatGPT app quota manual UI contract එකකි. `gpt-image-2` API OpenAI developer contract එකක් වන අතර API Free tier supported නැත. Adobe credits OpenAI API balance නොවේ; ChatGPT quota server requests බවට පත් නොවේ.

Model label, deduction, download, data handling, rights, region හෝ support පැහැදිලි නැත්නම් නවතින්න. Time-limited promo, single trial හෝ daily quota “free and unlimited” ලෙස නොකියන්න. Production සඳහා accepted output එකක සැබෑ cost, failed-call billing, latency, storage සහ support බලන්න.

## FAQ

### Firefly Free තුළ GPT Image 2 නිශ්චිතද?

නැත. ඔබේ model selector සහ credit prompt බලන්න.

### API Free tier තිබේද?

වත්මන් official boundary අනුව `gpt-image-2` API Free tier supported නැත.

### Successful verification යනු කුමක්ද?

ඔබේ account එකේ model/credit state, low-risk generation එකක්, actual deduction, downloadable file සහ පිළිගත හැකි data/rights boundary සියල්ල පැහැදිලි විය යුතුය.

## Further Reading

- [Billing Units](/docs/guides/billing-units/)
- [GPT Image 2 Cost per Image](/docs/blog/gpt-image-2-cost-per-image/)
