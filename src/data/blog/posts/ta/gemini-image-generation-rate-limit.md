---
title: AI Studio-ல் Nano Banana quota-வை எப்படி படிப்பது: 5 entry points-ஐ முதலில் பிரிக்கவும்
description: Gemini app, AI Studio workspace, Developer API project, Vertex AI மற்றும் third-party credits quota-களைப் பிரித்து RPM, TPM, RPD, IPM மூலம் 429-ஐப் புரிந்துகொள்ளுங்கள்.
date: 2026-05-03
category: API development
tags: [Nano Banana, AI Studio, Gemini API, Image Generation Quota, Rate Limit]
readTime: 9
relatedPath: /docs/api/images/
relatedTitle: Image Generation API
---

அனைத்து AI Studio users-க்கும் Nano Banana-வின் ஒரே fixed image count இல்லை. முதலில் entry point-ஐ கண்டறியுங்கள்: Gemini app, AI Studio browser workspace, Gemini Developer API project, Vertex AI அல்லது third-party wrapper. ஒவ்வொன்றுக்கும் plans, projects, models, billing மற்றும் limits வேறுபடும். API code என்றால் logged-in [AI Studio rate-limit page](https://aistudio.google.com/rate-limit)-ல் project, model, usage tier பாருங்கள்; “limit reached” மட்டும் வைத்து online table-ஐ நம்ப வேண்டாம்.

## Quota யாரால் நிர்வகிக்கப்படுகிறது

Gemini app limit account மற்றும் subscription plan-ஐச் சார்ந்தது. Developer API quota project, model, tier மற்றும் metric-ஐச் சார்ந்தது. Vertex AI-ல் Cloud project, region, IAM, billing, quota உள்ளன. Third-party credits provider balance, queue, contract; அவை Google quota அல்ல. ஒரே account ஒரே quota pool அல்ல.

## UI hint மற்றும் API 429

முழு UI/error text, selected project, key-ன் project, model ID, நேரம்/timezone மற்றும் dashboard record செய்யுங்கள். API response-ல் status, error body, quota metric, `retryDelay` சேமிக்கவும். UI hint மட்டுமே என்றால் state refresh, ஒரு controlled retry மற்றும் official troubleshooting செய்யுங்கள். `429 RESOURCE_EXHAUSTED` தெளிவாக வந்தால் மட்டுமே API branch-க்கு செல்லுங்கள்.

| Metric | பொருள் | முதல் நடவடிக்கை |
| --- | --- | --- |
| RPM | நிமிடத்திற்கு requests | concurrency குறைத்து queue, jitter backoff |
| Input TPM | நிமிடத்திற்கு input tokens | prompt/context சுருக்கவும் |
| RPD | API day requests | daily budget, reset அல்லது limit request |
| IPM | நிமிடத்திற்கு images | image queue தனியாக, concurrency குறை |

Developer API limits project-க்கு பொருந்தும், API key-க்கு அல்ல. அதே project-ல் புதிய key உருவாக்கினாலும் quota அதிகரிக்காது. 20 July 2026 official docs படி API RPD midnight Pacific Time-ல் reset ஆகிறது; இதை Gemini app, Vertex AI அல்லது third-party credits-க்கு பயன்படுத்த வேண்டாம்.

429 record-ல் entry point, project, full model ID, metric, failure time/timezone, status/body, `retryDelay`, request ID, tier, limit, volume, concurrency மற்றும் failure rate வைத்திருங்கள். RPM என்றால் peak குறைக்கவும்; RPD என்றால் tight retry நிறுத்தவும்; IPM என்றால் image tasks-ஐ தனி queue-க்கு மாற்றவும்.

## App, pricing மற்றும் Vertex AI

Gemini app-க்கு பழைய fixed daily table-ஐ நம்ப வேண்டாம்; Settings-ன் “usage limits”, refresh hint மற்றும் current Google Help பாருங்கள். Model availability, free/paid tier, project quota வேறு கேள்விகள். Billing tier மாறலாம், ஆனால் capacity, spend, safety, rate limits நீங்காது. Vertex AI unlimited bypass அல்ல; project, region, IAM, cost, quota-ஐ தனியாக verify செய்யுங்கள்.

Third-party credits-ஐ Google RPM/IPM/RPD ஆக மாற்ற முடியாது. Provider-ன் alias, charging, failed-output refund, expiry, concurrency, queue மற்றும் upstream 429 பற்றி கேளுங்கள். API key, project ID, billing அல்லது account identifier support ticket-ல் சேர்க்க வேண்டாம்.

## FAQ

அனைவருக்கும் fixed image count இல்லை. புதிய API key quota அதிகரிக்காது. Billing enabled இருந்தாலும் metric-specific 429 வரலாம். சரியான வரிசை: **entry point → account/project → model → metric → dashboard → matching action**.

## Further Reading

- [Image Generation API](/docs/api/images/)
