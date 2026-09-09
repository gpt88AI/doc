---
title: Google AI Studio Rate Limits: Gemini limit দেখলে আগে কী করবেন
description: AI Studio UI limit, Gemini API 429, project quota, billing ও service status আলাদা করে নিরাপদ recovery করুন।
date: 2026-05-07
category: API ডেভেলপমেন্ট
tags: [Google AI Studio, Gemini, Rate Limits, API Errors, Troubleshooting]
readTime: 12
relatedPath: /docs/api/errors/
relatedTitle: OpenAI-Compatible Error Codes
---

AI Studio-তে “You've reached your rate limit” দেখলে এটিকে universal quota number ভাববেন না। Current prompt, last usable answer, model, attachment, project clue, সময় ও timezone আগে সংরক্ষণ করুন। এরপর দেখুন limit browser UI, Gemini API 429, Cloud project quota, billing, long session নাকি service state-এর।

| সংকেত | সম্ভাব্য owner | প্রথম পদক্ষেপ |
| --- | --- | --- |
| Chat box limit message | UI cooldown/session/model pressure | chat save করে same UI-তে short prompt test |
| Code `429 RESOURCE_EXHAUSTED` | API project throttling | error body, RPM/TPM/RPD ও project দেখুন |
| Paid key blocked | wrong project/tier/billing | key-এর project ও billing মিলিয়ে দেখুন |
| Dashboard low, UI blocked | lag, wrong project বা cooldown | small test ও evidence record |

## প্রথমে chat রক্ষা করুন

Prompt, usable answer, full error, model, attachment, account/project, সময় ও timezone copy করুন। একই surface-এ খুব ছোট prompt পাঠান। সফল হলে long context, attachment, output length বা model pressure সমস্যা হতে পারে; history ছোট করুন, task split করুন এবং output কমান। Short test-ও fail হলে send loop বন্ধ করে status, project ও billing যাচাই করুন।

## Limit owner আলাদা করুন

AI Studio browser chat এবং Gemini API আলাদা surface। API quota project-এ প্রযোজ্য, API key-তে নয়; নতুন key বানিয়ে নতুন quota pool পাওয়া যায় না। Gemini App subscription API project quota-এর প্রমাণ নয়।

API 429-এ project, model, endpoint, input length, output cap, concurrency, RPM/TPM/RPD, status, error body ও সময় log করুন। Concurrency কমান, queue, deduplication, cache ও exponential backoff with jitter দিন। পুরনো screenshot দেখে fixed wait time বানাবেন না।

## Paid key ও dashboard mismatch

Key কোন project-এর, dashboard একই project দেখছে কি না, billing active কি না, prepaid/credit/tier/org policy কী—যাচাই করুন। Consumer Pro/Ultra plan স্বয়ংক্রিয়ভাবে AI Studio বা API quota বাড়ায় না। Dashboard low usage limit না থাকার প্রমাণ নয়; wrong project, lag, UI cooldown, model capacity বা service status হতে পারে।

## Offload order

1. Original work save করুন।
2. New chat-এ short prompt test করুন।
3. সফল হলে minimal context দিন।
4. History summarize ও attachment সরান।
5. Output এক section/table/checkpoint-এ ভাগ করুন।
6. শেষে lighter model বা cooldown বিবেচনা করুন।

Production কাজের জন্য logs, queue, backoff, usage alert ও budget control-সহ observable API route ব্যবহার করুন। Multiple key quota বাড়ায় না।

## Support evidence

```text
Surface: AI Studio UI / Gemini API / Gemini App
Account and project:
Model:
Time and timezone:
Full message or 429 body:
Short-prompt result:
Billing/status evidence:
Actions taken:
```

API key, private prompt বা billing secret পাঠাবেন না। GPT88 gateway আলাদা contractual surface; তার limit Google AI Studio UI limit-এর সঙ্গে স্বয়ংক্রিয়ভাবে এক নয়।

## FAQ

Fixed wait time নেই; আগে short test করুন। Paid API key AI Studio UI limit সরাবেই এমন নয়। Multiple key quota বাড়ায় না। Dashboard low usage হলেও UI blocked হতে পারে। Logs, queue, retry, alert ও stable project ownership দরকার হলে API route নিন।

## Further Reading

- [OpenAI-Compatible Error Codes](/docs/api/errors/)
