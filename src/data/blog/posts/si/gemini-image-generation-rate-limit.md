---
title: AI Studio හි Nano Banana quota කියවන්නේ කෙසේද: මුලින් entry points 5ක් වෙන් කරන්න
description: Gemini app, AI Studio workspace, Developer API project, Vertex AI සහ third-party credits quota වෙන් කර RPM, TPM, RPD සහ IPM මඟින් 429 තේරුම් ගන්න.
date: 2026-05-03
category: API සංවර්ධනය
tags: [Nano Banana, AI Studio, Gemini API, Image Generation Quota, Rate Limit]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

සියලු AI Studio users සඳහා Nano Banana එකම fixed image count එකක් ලබා නොදේ. මුලින් entry point හඳුනාගන්න: Gemini app, AI Studio browser workspace, Gemini Developer API project, Vertex AI හෝ third-party wrapper. ඒවායේ plans, projects, models, billing සහ limits වෙනස් වේ. API code භාවිතා කරන විට logged-in [AI Studio rate-limit page](https://aistudio.google.com/rate-limit) තුළ project, model සහ usage tier පරීක්ෂා කරන්න; “limit reached” පමණක් මත online table විශ්වාස නොකරන්න.

## Quota කළමනාකරණය කරන්නේ කවුද

Gemini app limit එක account සහ subscription plan මත රඳා පවතී. Developer API quota එක project, model, tier සහ metric මත වේ. Vertex AI තුළ Cloud project, region, IAM, billing සහ quota ඇත. Third-party credits යනු providerගේ balance, queue සහ contract වන අතර Google quota නොවේ. එකම account එක එකම quota pool එකක් නොවේ.

## UI hint සහ API 429

සම්පූර්ණ UI/error text, selected project, key එකේ project, model ID, වේලාව/timezone සහ dashboard record කරන්න. API response එකක් නම් status, error body, quota metric සහ `retryDelay` ද සුරකින්න. UI hint එකක් පමණක් නම් state refresh, එක් controlled retry එකක් සහ official troubleshooting කරන්න. `429 RESOURCE_EXHAUSTED` පැහැදිලිව ලැබුණු පසු පමණක් API branch එකට යන්න.

| Metric | අර්ථය | පළමු පියවර |
| --- | --- | --- |
| RPM | මිනිත්තුවකට requests | concurrency අඩු කර queue සහ jitter backoff |
| Input TPM | මිනිත්තුවකට input tokens | prompt/context කෙටි කරන්න |
| RPD | API day එකේ requests | daily budget, reset හෝ limit request |
| IPM | මිනිත්තුවකට images | image queue වෙන් කර concurrency අඩු කරන්න |

Developer API limit project එකට අදාළ වේ, API key එකට නොවේ. එම project එකේ නව key එකක් සෑදීමෙන් quota වැඩි නොවේ. 20 July 2026 official docs අනුව API RPD midnight Pacific Time දී reset වේ; මෙය Gemini app, Vertex AI හෝ third-party credits සඳහා භාවිතා නොකරන්න.

429 record එකේ entry point, project, full model ID, metric, failure time/timezone, status/body, `retryDelay`, request ID, tier, limit, volume, concurrency සහ failure rate තබන්න. RPM නම් peak අඩු කරන්න, RPD නම් tight retry නවත්වන්න, IPM නම් image tasks වෙනම queue කරන්න.

## App, pricing සහ Vertex AI

Gemini app සඳහා පැරණි fixed daily tables මත රඳා නොසිට Settings හි “usage limits”, refresh hint සහ current Google Help බලන්න. Model availability, free/paid tier සහ project quota වෙනම කරුණු වේ. Billing මඟින් tier වෙනස් විය හැකි නමුත් capacity, spend, safety සහ rate limits ඉවත් නොවේ. Vertex AI unlimited bypass එකක් නොවේ; project, region, IAM, cost සහ quota වෙන වෙනම verify කරන්න.

Third-party credits Google RPM/IPM/RPD වෙත convert කළ නොහැක. Providerගෙන් alias, charging, failed-output refund, expiry, concurrency, queue සහ upstream 429 ගැන විමසන්න. API key, project ID, billing හෝ account identifier support ticket එකට නොයවන්න.

## FAQ

සියලු දෙනාට fixed image count එකක් නැත. නව API key එකක් quota වැඩි නොකරයි. Billing enabled වුවත් metric-specific 429 ලැබිය හැක. නිවැරදි අනුපිළිවෙල: **entry point → account/project → model → metric → dashboard → matching action**.

## Further Reading

- [Image Generation API](/docs/api/images/)
