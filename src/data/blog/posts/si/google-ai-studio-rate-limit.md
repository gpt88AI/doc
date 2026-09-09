---
title: Google AI Studio Rate Limits: Gemini limit පෙන්වූ විට මුලින් කුමක් කළ යුතුද
description: AI Studio UI limit, Gemini API 429, project quota, billing සහ service status වෙන් කර recovery කරන්න.
date: 2026-05-07
category: API සංවර්ධනය
tags: [Google AI Studio, Gemini, Rate Limits, API Errors, Troubleshooting]
readTime: 12
relatedPath: /docs/api/errors/
relatedTitle: OpenAI-Compatible Error Codes
---

AI Studio හි “You've reached your rate limit” යන්න universal quota number එකක් ලෙස නොසලකන්න. Prompt, අවසන් usable answer, model, attachments, project clues, වේලාව සහ timezone මුලින් සුරකින්න. පසුව limit එක UI, Gemini API 429, Cloud project quota, billing, long session හෝ service state එකකට අදාළද හඳුනාගන්න.

| ලකුණ | හැකි owner | පළමු පියවර |
| --- | --- | --- |
| Chat box limit | UI cooldown/session/model pressure | chat save කර same UI short prompt test |
| Code `429 RESOURCE_EXHAUSTED` | API throttling | error body, RPM/TPM/RPD, project |
| Paid key blocked | project/tier/billing mismatch | key project සහ billing match |
| Dashboard low, UI blocked | lag, wrong project, cooldown | small test සහ evidence |

## Chat එක මුලින් ආරක්ෂා කරන්න

Prompt, usable answer, error, model, attachments, account/project, වේලාව සහ timezone copy කරන්න. එම surface එකේ කෙටි prompt එකක් test කරන්න. සාර්ථක නම් long context, attachments, output length හෝ model pressure අඩු කරන්න; history summarize සහ task split කරන්න. Short test එකත් fail නම් send loop නවතා status/project/billing බලන්න.

## Limit owner වෙන් කරන්න

AI Studio browser chat සහ Gemini API වෙනස් surfaces වේ. API quota project එකට අදාළය, API key එකට නොවේ; නව key එකක් නව quota pool එකක් නොකරයි. Gemini App subscription එක API quota සඳහා සාක්ෂියක් නොවේ. API 429 එකකදී project, model, endpoint, input/output size, concurrency, RPM/TPM/RPD, status, body සහ වේලාව log කරන්න. Queue, cache, deduplication සහ exponential backoff with jitter යොදන්න.

Paid key project, dashboard project, billing state, tier, credit සහ org policy verify කරන්න. Consumer Pro/Ultra plan එක AI Studio හෝ API quota ස්වයංක්‍රීයව වැඩි නොකරයි. Dashboard low usage limit නොමැති බවට proof එකක් නොවේ; lag, UI cooldown, model capacity හෝ service status විය හැක.

## Recovery order

1. Original work save කරන්න.
2. New chat එකක short test කරන්න.
3. සාර්ථක නම් minimal context පමණක් යවන්න.
4. History සහ attachments අඩු කරන්න.
5. Output එක කුඩා checkpoints වලට බෙදන්න.
6. අවසානයේ lighter model හෝ cooldown බලන්න.

Production සඳහා logs, queue, backoff, usage alerts සහ budget controls සහිත API route භාවිතා කරන්න. API keys quota expansion නොවේ.

```text
Surface:
Account and project:
Model:
Time and timezone:
Full message or 429 body:
Short-prompt result:
Billing/status evidence:
Actions taken:
```

Keys, private prompts හෝ billing secrets share නොකරන්න. GPT88 gateway වෙනම contractual surface එකකි.

## Further Reading

- [OpenAI-Compatible Error Codes](/docs/api/errors/)
