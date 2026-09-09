---
title: Gemini API Rate Limits: සැබෑ quota සොයා 429 errors විසඳන්න
description: පැරණි RPM tables පිටපත් නොකර current project/model quota, RPM/TPM/RPD/IPM, safe throughput සහ 429 vs 503 troubleshooting තේරුම් ගන්න.
date: 2026-01-22
category: API සංවර්ධනය
tags: [Gemini API, Rate Limits, Google AI, API Stability, Error Troubleshooting]
readTime: 17
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

“Gemini විනාඩියකට requests කීයක් කරයිද?” යන්නට පෙර කුමන entry point, project, model, counter සහ reset window එක request එක සීමා කරන්නේද හඳුනා ගන්න. Developer API, Gemini app, Firebase AI Logic සහ Vertex AI limits එක සමාන නොවේ. Developer API සඳහා [AI Studio rate limits](https://aistudio.google.com/rate-limit) හි exact project/model row එක current evidence වේ. Entry point, owner, exact model, lane (RPM, input TPM, RPD, IPM, TPD, spend, Priority, Batch) සහ reset evidence සටහන් කරන්න. `429 RESOURCE_EXHAUSTED` quota/frequency/daily/spend; `503 UNAVAILABLE` temporary capacity ලෙස වෙන් කරන්න.

## Project row සහ key

Official docs නීති කියයි; logged-in AI Studio row current values දෙයි. RPM calls, input TPM prompt/context tokens, RPD daily requests ගණනය කරයි; image lines හි IPM/TPD තිබිය හැක. Static tables production budget නොවේ. එකම project හි keys එකම quota pool share කරයි; key rotation security සඳහාය, quota වැඩි කිරීමට නොවේ. Paid billing eligibility වෙනස් කරයි, RPM/TPM/RPD/spend/Batch/Priority limits ඉවත් නොකරයි.

## Load test සහ capacity

Standard, Priority සහ Batch වෙනම lanes වේ; Priority unlimited නොවේ, Batch urgent interactive වැඩ සඳහා නොවේ.

```text
Request cap = min(current RPM, current input TPM ÷ average input tokens per request)
```

60 RPM, 120,000 input TPM සහ 4,000 tokens/request නම් input TPM cap 30/minute වේ. Margin burst, latency, retries සහ business risk අනුව තෝරන්න; RPD සහ spend window වෙන වෙනම පරීක්ෂා කරන්න.

## 429/503 troubleshooting

429 දී project/model row, error body, headers, `Retry-After` සහ usage බලන්න; queue, slow down, input කෙටි කිරීම, wait හෝ paid path භාවිතා කරන්න। 503 දී request ID, වේලාව, endpoint/region සහ service status බලන්න; bounded backoff සහ traffic smoothing කරන්න. Retry policy එකේ codes, idempotency, max attempts, time budget, jitter, queue/circuit breaker සහ escalation evidence ලියන්න. Keys rotate කිරීම විසඳුමක් නොවේ.

RPM සඳහා burst/concurrency, input TPM සඳහා context/cache, RPD සඳහා unnecessary calls/reset, spend සඳහා admission/alerts, Priority සඳහා returned tier, Batch සඳහා async scheduling සහ 503 සඳහා capacity path නිවැරදි කරන්න. Gemini app subscription Developer API quota වැඩි නොකරයි; Firebase හි gateway සහ upstream දෙකම; Vertex PayGo limits Developer API වගේ නොවේ.

## Runbook සහ FAQ

Entry point, owner, model, counter, reset window, input p50/p95, latency, burst, daily total, retries, admission, 429/503 stop lines සහ lanes record කරන්න. Rate limit project එකටය, key එකට නොවේ. Paid project එකකටත් 429 ලැබිය හැක. Batch එකට වෙනම pool එකක් ඇත. Multiple projects සැබෑ ownership/security boundary සඳහා පමණක් භාවිතා කරන්න.

## Further Reading

- [Error Code Reference](/docs/api/errors/)
