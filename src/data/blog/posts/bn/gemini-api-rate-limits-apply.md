---
title: Gemini API Quota Application Guide: Free থেকে Tier 3 upgrade
description: Gemini API quota upgrade, Free/Tier 1/2/3, RPM/TPM/RPD, 429 handling এবং production quota planning-এর step-by-step guide।
date: 2026-01-22
category: API উন্নয়ন
tags: [Gemini API, Rate Limits, API Quota, 429 Error, Google AI]
readTime: 14
relatedPath: /docs/api/errors/
relatedTitle: Error Code Reference
---

Gemini API limit project-এর উপর প্রযোজ্য, API key-এর উপর নয়। RPM requests/minute, TPM tokens/minute এবং RPD requests/day। Free tier learning ও prototype-এর জন্য; stable production throughput হলে paid tier এবং live project row যাচাই করুন। পুরনো public table-কে স্থায়ী promise ভাববেন না।

## Tier নির্বাচন

| Tier | ব্যবহার | মূল কথা |
| --- | --- | --- |
| Free | learning, prototype | কম/পরিবর্তনশীল limit |
| Tier 1 | small production | billing enabled project |
| Tier 2 | mid-size workload | spend/time eligibility |
| Tier 3 | enterprise | custom quota বা Provisioned Throughput |

Exact RPM/TPM/RPD model, tier ও project row-নির্ভর। AI Studio pricing/rate-limit page থেকে যাচাই করুন; static number code-এ hard-code করবেন না।

## Upgrade পথ

AI Studio-তে exact project বেছে billing enable করুন এবং payment/billing status যাচাই করুন। Tier 1 activation ও Tier 2/3 spend/time eligibility current Google docs থেকে দেখুন; পুরনো `$250`, `$1,000` বা fixed waiting period current contract ধরে নেবেন না। Vertex AI হলে Cloud Console-এর Quotas and System Limits-এ quota row থেকে Edit quota request করা যায়। Enterprise request-এ peak RPM, token profile, growth, SLA ও business impact দিন।

## 429 handling

429 `RESOURCE_EXHAUSTED` code bug নয়; quota protection। RPM হলে queue/pacing, TPM হলে summarization/chunking/context cache, RPD হলে mock/cache ও reset window ব্যবহার করুন।

```python
import time, random
from openai import OpenAI
client = OpenAI(api_key="YOUR_GPT88_API_KEY", base_url="https://gpt88.cc/v1")

def call_with_backoff(messages, max_retries=5):
    for attempt in range(max_retries):
        try:
            return client.chat.completions.create(
                model="gemini-2.0-flash", messages=messages)
        except Exception as exc:
            if "429" not in str(exc) and "RESOURCE_EXHAUSTED" not in str(exc):
                raise
            delay = 2 ** attempt
            time.sleep(delay + random.uniform(0, delay * 0.1))
    raise RuntimeError("max retries exceeded")
```

Exponential backoff, jitter, max attempts, total time budget ও stop condition রাখুন। High concurrency-তে token bucket বা Redis/Celery queue ব্যবহার করুন; retry storm তৈরি করবেন না।

## Production planning

Daily users, conversations/user, turns/conversation ও peak window দিয়ে request estimate করুন। কমপক্ষে 30% buffer রাখুন, traffic burst ও business risk অনুযায়ী বাড়ান। Redis cache, Context Caching, application limiter, RPM/TPM/RPD utilization, 429 rate ও latency monitor করুন। Fallback হিসেবে cheaper model, cached response, friendly busy message বা backup service রাখুন।

## GPT88 supplement

Official quota, regional connectivity, spend threshold বা enterprise approval বাধা হলে GPT88 unified gateway supplement হতে পারে। OpenAI-compatible integration-এ `base_url` ও `api_key` বদলান; current price, quota, failure billing ও SLA gpt88.cc console-এ verify করুন। এটি official API policy বা enterprise compliance-এর স্বয়ংক্রিয় replacement নয়।

## Checklist ও FAQ

Exact project/model row, billing/quota owner, RPM/TPM/RPD, exhausted dimension, reset evidence, upgrade-এর পর live values এবং multi-project-এর বাস্তব security/billing boundary record করুন। Paid tier unlimited নয়; Free থেকে Tier 1 billing activation দিয়ে শুরু হলেও Tier 2/3 current eligibility ও review-নির্ভর।

## Further Reading

- [Error Code Reference](/docs/api/errors/)
