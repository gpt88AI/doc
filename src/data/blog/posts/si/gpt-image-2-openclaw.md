---
title: OpenClaw තුළ GPT Image 2: API Key එදිරිව Codex OAuth
description: OpenClaw තුළ openai/gpt-image-2 සකසන විට billing, logs, org ownership සහ route evidence අනුව API key හෝ Codex OAuth තෝරන ආකාරය.
date: 2026-05-06
category: තාක්ෂණික නිබන්ධනය
tags: [GPT Image 2, OpenClaw, OpenAI Codex OAuth, OpenAI API, Image Generation]
readTime: 10
relatedPath: /docs/guides/gpt-image-2-service-notice/
relatedTitle: GPT Image 2 Service Notes
---

OpenClaw තුළ model value `openai/gpt-image-2` ලෙස ලියන්න. සැබෑ තේරීම model name එක නොව authentication route එකයි. Production billing, organization control සහ traceable logs අවශ්‍ය නම් `OPENAI_API_KEY` භාවිත කරන්න. Codex OAuth භාවිත කරන්න verified personal OpenClaw profile එකක් ඇති විට පමණි.

පළමු සාර්ථක image එක සාක්ෂියක් ලෙස නොසලකන්න. OpenClaw fallback provider එකක් භාවිත කළ හැකි අතර OAuth profile එක වැරදි account එකකට හෝ expired token එකකට සම්බන්ධ විය හැක. Model එක explicit ලෙස සකසා, fallback disable/mark කර, provider output හෝ logs තුළ auth route, model name සහ result එකට ගැලපේද බලන්න।

## Route සහ Config

| Route | සුදුසු අවස්ථාව | Evidence |
| --- | --- | --- |
| `OPENAI_API_KEY` | production billing, org control, audit logs | OpenAI සහ `openai/gpt-image-2` logs |
| Codex OAuth | verified profile සමඟ personal test | account, workspace, provider output, no-fallback test |
| Fallback provider | failure පසු backup | output එක non-OpenAI ලෙස mark කරන්න |

```json
{
  "agents": { "defaults": { "imageGenerationModel": { "primary": "openai/gpt-image-2" } } }
}
```

Runtime environment එකේ `OPENAI_API_KEY` තබන්න. GPT88 gateway සඳහා console key සහ `https://gpt88.cc/v1` base URL භාවිත කරන්න; model reference එක වෙනස් නොවේ. OAuth route එකේ fake API key සාදන්න එපා; current OpenAI/Codex profile එක verify කරන්න.

## Route Verify සහ Debug

Provider list කර කුඩා test එකක් ධාවනය කරන්න:

```text
image_generate action=list
image_generate model=openai/gpt-image-2 prompt="A simple product icon on a white desk, no text"
```

Image සාර්ථක වුවත් provider එක OpenAI නොවේ නම් fallback එක ක්‍රියා කර ඇත. OAuth 403 එකකදී profile, account, workspace, token, OpenClaw version සහ fallback config පරීක්ෂා කරන්න. Unsupported model එකකදී provider prefix සහ access state බලන්න. Transparent background failure එක unsupported parameter එකකි; prompt වෙනස් කරමින් සිටීමෙන් විසඳුමක් නොලැබේ.

Production එකේ API key route එක billing project/org, logs, quota, retry policy සහ support owner පැහැදිලි කරයි. Codex OAuth personal low-risk testing සඳහා පහසු නමුත් official free API key එකක් නොවේ. 403 පවතින්නේ නම් re-authenticate කර, පැරණි profile ඉවත් කර, fallback නවතා, අවශ්‍ය නම් API key වෙත මාරු වන්න. 4K verification එක route verification එකෙන් වෙන් කර saved pixel dimensions පරීක්ෂා කරන්න.

## Common Failures සහ FAQ

Tool/provider නොපෙනේ නම් setup අවසන් කරන්න; model unsupported නම් `openai/` prefix, version සහ access බලන්න; image එක ලැබුණත් OpenAI නොවේ නම් fallback isolate කරන්න; slow output එකේ මුලින් route, quota, size සහ fallback සනාථ කරන්න. Transparent asset සඳහා වෙනත් model එකක් හෝ post-processing භාවිත කරන්න.

### Model name එක කුමක්ද?

`openai/gpt-image-2`; provider prefix routing සඳහා අවශ්‍යය.

### Codex OAuth free API එකක්ද?

නැත; එය authentication route එකක් මිස official free entitlement එකක් නොවේ.

### Production සඳහා කුමක් තෝරන්නද?

සාමාන්‍යයෙන් `OPENAI_API_KEY`; OAuth verified personal testing සඳහා පමණි.

### Fallback ඉවත් කරන්නේ කෙසේද?

Fallback disable කර model එක explicit ලෙස සකසා provider logs පරීක්ෂා කරන්න.

## Further Reading

- [GPT Image 2 Service Notes](/docs/guides/gpt-image-2-service-notice/)
- [GPT Image 2 4K Generation](/docs/blog/gpt-image-2-4k-image-generation/)
