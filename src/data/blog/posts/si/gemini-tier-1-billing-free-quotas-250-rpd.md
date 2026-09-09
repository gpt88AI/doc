---
title: Gemini Tier 1 billing තිබුණත් free quota (250 RPD)? Complete Fix Guide 2026
description: Billing සක්‍රීය කළ පසුවත් 250 RPD පෙන්වන්නේ නම් experimental model, API key project binding, billing sync, promo credits සහ preview limits පරීක්ෂා කරන්න.
date: 2026-02-21
category: API සංවර්ධනය
tags: [Gemini API, API Troubleshooting, Rate Limit, Google AI]
readTime: 18
relatedPath: /docs/api/errors/
relatedTitle: OpenAI-Compatible API Error Troubleshooting
---

Google Cloud project එකක billing සක්‍රීය කළත් Gemini API 250 RPD හෝ free-tier limit පෙන්විය හැක. Billing status, project tier සහ model-specific quota වෙන වෙනම layers වේ. සාමාන්‍ය විසඳුම `-exp`/`-experimental` model එකකින් stable හෝ paid-preview model එකකට මාරුවීම, billed project එකක API key නැවත සෑදීම සහ sync සඳහා පැය 24–48ක් බලා සිටීමයි.

## වේගවත් checklist

1. Actual model ID බලන්න; experimental variant එක free quota භාවිතා කළ හැක.
2. API key එක බැඳී ඇති billed Google Cloud project එක AI Studio හි පරීක්ෂා කරන්න.
3. Active payment method සහ pending verification බලන්න.
4. Promo/free-trial credit සක්‍රීයද පරීක්ෂා කරන්න.
5. Preview model හි stricter limit එක stable model එකෙන් වෙන් කර බලන්න.

## Tier සහ quota

Free, Tier 1, Tier 2 සහ Tier 3 වෙන වෙනම allocations වේ. Free RPM/RPD model අනුව වෙනස් වේ; 250 RPD universal number එකක් නොවේ. Tier 1 higher limits ලබා දිය හැකි නමුත් experimental සහ preview models තවම restrictive විය හැක. Tier 2 සඳහා cumulative $250 සහ දින 30ක්, Tier 3 සඳහා $1,000 සහ දින 30ක් වැනි thresholds තිබිය හැක; current official console/docs මඟින් verify කරන්න.

Quota project එකට අදාළ වේ, API key එකට නොවේ. එකම project එකේ නව key එකක් සෑදීමෙන් limit වැඩි නොවේ. RPD midnight Pacific Time දී reset විය හැකි බැවින් official docs බලන්න.

## හේතු පහක් සහ fixes

**Model variant:** `gemini-2.5-pro-exp-03-25` හෝ `-experimental` free quota භාවිතා කළ හැක. Stable `gemini-2.5-pro` හෝ available paid-preview variant භාවිතා කරන්න.

**වැරදි project key:** AI Studio හි billed project තෝරා නව key එකක් සෑදීමෙන් application update කරන්න.

**Billing sync delay:** Stable paid model එකකින් කුඩා call එකක් කර dashboard බලන්න; පැය 24–48ක් sync බලා සිටින්න.

**Promo credits:** Free trial හෝ promotional balance paid tier transition එක ප්‍රමාද කළ හැක; billing support review ඉල්ලන්න.

**Preview limits:** Preview/experimental models paid tier එකේදීත් stricter limits තබාගත හැක; මෙය සෑමවිටම bug එකක් නොවේ.

## Tier verification

```bash
curl -s -D - "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' 2>&1 | grep -i "x-ratelimit"
```

`x-ratelimit-limit` සහ `x-ratelimit-remaining` බලන්න. Secret commit හෝ share නොකරන්න. AI Studio API Keys marker, Cloud Console quota සහ API response headers තුනම cross-check කරන්න. වෙනස් නම් model variant, key binding හෝ sync පරීක්ෂා කරන්න.

Production සඳහා batching, caching, queue, Batch API සහ multi-model fallback යොදාගන්න. Vertex AI quota වෙනමය; Gemini API tier ස්වයංක්‍රීයව transfer නොවේ. Gateway එක billing/fallback route එකක් ලෙස බලන්න, Google quota වැඩි කරන ක්‍රමයක් ලෙස නොවේ.

## FAQ

Stable model එකකත් free limit තිබේ නම් key-project binding සහ billing sync බලන්න. Promo credit සාමාන්‍යයෙන් Tier 2/3 spend threshold එකට ගණන් නොගනී. Paid plan එක safety, capacity හෝ rate limits ඉවත් නොකරයි.

## Further Reading

- [OpenAI-Compatible API Error Troubleshooting](/docs/api/errors/)
