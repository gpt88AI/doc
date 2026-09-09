---
title: Google Gemini API Free Tier Limits 2026: Rate Limits, Quota සහ Best Practices
description: Gemini API free tier හි RPM, TPM, RPD, 429 handling, multimodal tokens සහ upgrade decision guide.
date: 2026-01-20
category: API සංවර්ධනය
tags: [Gemini API, Free Tier, API Limits, Google AI, Development Guide]
readTime: 18
relatedPath: /docs/api/list-models/
relatedTitle: Model List
---

Gemini API free tier එක learning සහ prototypes සඳහා ප්‍රයෝජනවත්ය, නමුත් limits model සහ project අනුව වෙනස් වේ. Current official docs source of truth ලෙස ගන්න; පැරණි tables ස්ථිර guarantee ලෙස නොසලකන්න.

## ප්‍රධාන limits

Free tier තුළ සාමාන්‍යයෙන් 5–15 RPM, ආසන්න 250,000 TPM සහ 100–1,000 RPD තිබිය හැක. Exact limit model, region, account සහ policy මත රඳා පවතී. Quota project level එකට අදාළය, API key level එකට නොවේ; එකම project එකේ නව keys quota වැඩි නොකරයි. RPD Pacific midnight දී reset විය හැක.

| Model | Use case |
| --- | --- |
| Gemini 2.5 Pro | complex reasoning, අඩු RPD |
| Gemini 2.5 Flash | general chat සහ content |
| Gemini 2.5 Flash-Lite | batch, high frequency |
| Gemini 3 Flash Preview | current availability verify |
| Gemini Embeddings | vector embeddings |

Exact numbers logged-in AI Studio project rate-limit page සහ official docs මඟින් බලන්න.

## 429 සහ optimization

RPM burst තුළ, TPM විශාල prompt/output තුළ, RPD දවසේ calls අවසන් වූ පසු trigger වේ. `429 RESOURCE_EXHAUSTED` ලැබුණොත් metric හඳුනාගෙන exponential backoff with jitter, අඩු concurrency, queue, cache, deduplication සහ කෙටි prompts භාවිතා කරන්න. පැරණි screenshot වලින් reset time අනුමාන නොකරන්න.

```python
from google import genai
from tenacity import retry, stop_after_attempt, wait_exponential

client = genai.Client()

@retry(stop=stop_after_attempt(5), wait=wait_exponential(min=1, max=60))
def call(prompt: str) -> str:
    return client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    ).text
```

`GEMINI_API_KEY` environment variable එකක තබන්න; source, frontend හෝ chat එකක නොතබන්න.

## Multimodal tokens සහ paid tier

Input සහ output tokens TPM තුළ ගණන් වේ. Image resolution, video sampling සහ audio/video input quota වෙනස් කළ හැක. Images compress කරන්න, video keyframes ගන්න සහ විශාල documents summary/chunks වලට බෙදන්න. Higher quota සහ production stability සඳහා paid tier, budget alerts සහ usage monitoring බලන්න. GPT88 gateway billing සහ quota වෙනම contract එකකි; exact values console එකෙන් verify කරන්න.

Region, age, account, data residency සහ policy වෙන වෙනම conditions වේ. Random VPN, unknown proxy හෝ credential sharing මඟින් restrictions bypass නොකරන්න.

## FAQ

Universal fixed call count එකක් නැත. නව API key එකක් quota වැඩි නොකරයි. 429 දී මුලින් RPM/TPM/RPD හඳුනාගන්න. Production තුළ logs, queue, cache, backoff සහ usage alerts තබන්න.

## Further Reading

- [Model List](/docs/api/list-models/)
