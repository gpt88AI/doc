---
title: Google Gemini API Free Tier Limits 2026: Rate Limits, Quota ও Best Practices
description: Gemini API free tier-এর RPM, TPM, RPD, quota পরিবর্তন, 429 handling, multimodal token এবং upgrade decision guide।
date: 2026-01-20
category: API ডেভেলপমেন্ট
tags: [Gemini API, Free Tier, API Limits, Google AI, Development Guide]
readTime: 18
relatedPath: /docs/api/list-models/
relatedTitle: Model List
---

Gemini API free tier prototype ও learning-এর জন্য উপযোগী, কিন্তু limit model ও project অনুযায়ী বদলায়। Current official docs-কে source of truth ধরুন; পুরনো table-কে স্থায়ী guarantee ভাববেন না।

## প্রধান free-tier limit

Free tier-এ সাধারণত 5–15 RPM, প্রায় 250,000 TPM এবং 100–1,000 RPD থাকতে পারে। Exact limit model, region, account ও policy-র উপর নির্ভর করে। Quota project level-এ প্রযোজ্য, API key level-এ নয়; একই project-এ একাধিক key বানিয়ে pool বাড়ে না। RPD Pacific midnight-এ reset হতে পারে।

| Model | সাধারণ ব্যবহার | Use case |
| --- | --- | --- |
| Gemini 2.5 Pro | কম RPM/RPD | complex reasoning |
| Gemini 2.5 Flash | balanced speed/limit | chat ও content |
| Gemini 2.5 Flash-Lite | বেশি RPD | batch/high frequency |
| Gemini 3 Flash Preview | current availability verify | latest features |
| Gemini Embeddings | আলাদা quota | vector embeddings |

Exact number logged-in AI Studio project rate-limit page ও official docs থেকে দেখুন।

## Model নির্বাচন

Pro reasoning-এ শক্তিশালী, তবে free tier-এ ছোট learning workload-এ রাখুন। Flash general chat ও real-time interaction-এর ভালো balance। Flash-Lite routine batch processing ও বেশি daily call-এর জন্য practical। Free tier production SLA নয়।

## Quota change ও 429

হঠাৎ 429 হলে RPM, TPM ও RPD আলাদা করুন। RPM burst-এ, TPM দীর্ঘ prompt/output-এ, RPD দিনের call শেষ হলে trigger হয়। Exponential backoff with jitter, কম concurrency, queue, cache, deduplication ও ছোট prompt ব্যবহার করুন। পুরনো screenshot দেখে reset time অনুমান করবেন না।

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

`GEMINI_API_KEY` environment variable-এ রাখুন। Key source, frontend বা chat-এ দেবেন না।

## Multimodal token planning

Input ও output token TPM-এ যোগ হয়। Image resolution বাড়লে token বাড়তে পারে; video sampling rate অনুযায়ী token নেয়; audio ও video আলাদা count হতে পারে। Image compress করুন, video-তে keyframe নিন এবং বড় document summary/chunk-এ ভাগ করুন। অনেক সময় RPM আগে bottleneck হয়।

## Paid tier ও alternatives

Higher quota, production traffic, budget alert ও support দরকার হলে paid tier দেখুন। Free quota, billing ও model availability আলাদা যাচাই করুন। GPT88 unified gateway-এর billing ও quota আলাদা contract; exact model, price ও limit console থেকে দেখুন।

Region restriction, age, account, data residency ও policy আলাদা শর্ত। Random VPN, unknown proxy বা credential sharing দিয়ে access bypass করবেন না।

## FAQ

Free tier-এ universal fixed call count নেই। নতুন API key quota বাড়ায় না। 429-এ আগে metric শনাক্ত করুন। Multimodal input দ্রুত quota খরচ করতে পারে। Production-এ logs, queue, cache, backoff ও usage alert রাখুন।

## Further Reading

- [Model List](/docs/api/list-models/)
