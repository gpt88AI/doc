---
title: Google AI Studio Rate Limits: Gemini limit आएपछि पहिले के गर्ने
description: AI Studio UI limit, Gemini API 429, project quota, billing र service status छुट्याएर recovery गर्नुहोस्।
date: 2026-05-07
category: API विकास
tags: [Google AI Studio, Gemini, Rate Limits, API Errors, Troubleshooting]
readTime: 12
relatedPath: /docs/api/errors/
relatedTitle: OpenAI-Compatible Error Codes
---

AI Studio मा “You've reached your rate limit” लाई एउटै universal quota नमान्नुहोस्। पहिले prompt, अन्तिम usable answer, model, attachments, project clues, समय र timezone बचत गर्नुहोस्। त्यसपछि limit UI, Gemini API 429, Cloud project quota, billing, long session वा service state मध्ये कुन हो पहिचान गर्नुहोस्।

| संकेत | सम्भावित owner | पहिलो कदम |
| --- | --- | --- |
| Chat box limit | UI cooldown/session/model pressure | chat save, same UI मा short prompt test |
| Code `429 RESOURCE_EXHAUSTED` | API throttling | error body, RPM/TPM/RPD, project |
| Paid key blocked | project/tier/billing mismatch | key project र billing मिलाउनुहोस् |
| Dashboard low, UI blocked | lag, wrong project, cooldown | small test र evidence |

## Chat पहिले बचाउनुहोस्

Prompt, usable answer, error, model, attachments, account/project, समय र timezone copy गर्नुहोस्। त्यही surface मा छोटो prompt test गर्नुहोस्। सफल भए long context, attachments, output length वा model pressure घटाउनुहोस्; history summarize र task split गर्नुहोस्। Short test पनि fail भए send loop रोक्नुहोस् र status/project/billing जाँच्नुहोस्।

## Limit owner छुट्याउनुहोस्

AI Studio browser chat र Gemini API फरक surface हुन्। API quota project मा लागू हुन्छ, API key मा होइन; नयाँ key ले नयाँ quota pool बनाउँदैन। Gemini App subscription API quota को प्रमाण होइन। API 429 मा project, model, endpoint, input/output size, concurrency, RPM/TPM/RPD, status, body र समय log गर्नुहोस्। Queue, cache, deduplication र exponential backoff with jitter राख्नुहोस्।

Paid key को project, dashboard को project, billing state, tier, credit र org policy verify गर्नुहोस्। Consumer Pro/Ultra plan ले AI Studio वा API quota स्वतः बढाउँदैन। Dashboard low usage limit नहुँदाको प्रमाण होइन; lag, UI cooldown, model capacity वा service status हुन सक्छ।

## Recovery order

1. Original work save गर्नुहोस्।
2. New chat मा short test गर्नुहोस्।
3. सफल भए minimal context मात्र पठाउनुहोस्।
4. History र attachments घटाउनुहोस्।
5. Output लाई साना checkpoints मा बाँड्नुहोस्।
6. अन्तमा lighter model वा cooldown विचार गर्नुहोस्।

Production का लागि logs, queue, backoff, usage alerts र budget controls भएको API route प्रयोग गर्नुहोस्। API keys quota expansion होइनन्।

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

Keys, private prompts वा billing secrets share नगर्नुहोस्। GPT88 gateway अलग contractual surface हो।

## Further Reading

- [OpenAI-Compatible Error Codes](/docs/api/errors/)
