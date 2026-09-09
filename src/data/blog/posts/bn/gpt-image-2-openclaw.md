---
title: OpenClaw-তে GPT Image 2: API Key বনাম Codex OAuth
description: OpenClaw-তে openai/gpt-image-2 সেট করার সময় billing, logs, org ownership এবং route evidence দেখে API key বা Codex OAuth বেছে নিন।
date: 2026-05-06
category: প্রযুক্তিগত টিউটোরিয়াল
tags: [GPT Image 2, OpenClaw, OpenAI Codex OAuth, OpenAI API, Image Generation]
readTime: 10
relatedPath: /docs/guides/gpt-image-2-service-notice/
relatedTitle: GPT Image 2 Service Notes
---

OpenClaw-তে model value লিখুন `openai/gpt-image-2`। আসল সিদ্ধান্ত model name নয়, authentication route। Production billing, organization control এবং traceable logs দরকার হলে `OPENAI_API_KEY` নিন। Codex OAuth কেবল verified personal OpenClaw profile থাকলে ব্যবহার করুন।

প্রথম সফল image-কে প্রমাণ ভাববেন না। OpenClaw fallback provider ব্যবহার করতে পারে, OAuth profile ভুল account বা expired token-এ থাকতে পারে। Model স্পষ্ট করে সেট করুন, fallback disable/mark করুন, provider output বা logs পড়ুন এবং auth route, model name ও result মিলিয়ে নিন।

## Route নির্বাচন ও Config

| Route | উপযোগী যখন | Acceptance evidence |
| --- | --- | --- |
| `OPENAI_API_KEY` | production billing, org control, audit logs | OpenAI এবং `openai/gpt-image-2` দেখা যায় |
| Codex OAuth | verified Codex profile দিয়ে personal test | account, workspace, provider output, no-fallback test |
| Fallback provider | ব্যর্থতার পরে backup | output-কে non-OpenAI হিসেবে mark করুন |

```json
{
  "agents": { "defaults": { "imageGenerationModel": { "primary": "openai/gpt-image-2" } } }
}
```

Runtime environment-এ `OPENAI_API_KEY` রাখুন। GPT88 gateway হলে console-এর key এবং `https://gpt88.cc/v1` base URL ব্যবহার করুন; model reference বদলাবে না। OAuth-এ fake API key বানাবেন না; current OpenAI/Codex profile যাচাই করুন।

## Route Verify ও Debug

প্রথমে provider list করে ছোট test চালান:

```text
image_generate action=list
image_generate model=openai/gpt-image-2 prompt="A simple product icon on a white desk, no text"
```

Image সফল হলেও provider OpenAI না হলে fallback কাজ করেছে। OAuth 403 হলে profile, account, workspace, token, OpenClaw version ও fallback config দেখুন। Unsupported model হলে provider prefix এবং access state যাচাই করুন। Transparent background failure unsupported parameter; prompt বদলাতে থাকবেন না।

Production-এ API key-এর billing project/org, logs, quota, retry policy ও support owner স্পষ্ট থাকে। Codex OAuth personal low-risk testing-এ সুবিধাজনক, কিন্তু official free API key নয়। 403 হলে re-authenticate, পুরনো profile পরিষ্কার, fallback বন্ধ এবং প্রয়োজন হলে API key ব্যবহার করুন।

Common failures: node/tool না পাওয়া হলে provider setup; model unsupported হলে `openai/` prefix/version/access; image তৈরি হলেও OpenAI না হলে fallback; slow output হলে আগে route, quota, size ও fallback প্রমাণ। Transparent background-এর জন্য অন্য model বা post-processing নিন। 4K verification-কে route verification থেকে আলাদা রাখুন এবং saved pixel dimensions যাচাই করুন।

## FAQ

### Model name কী?

`openai/gpt-image-2`। Provider prefix routing-এর জন্য প্রয়োজন।

### Codex OAuth কি free API?

না। এটি auth route, official free entitlement নয়।

### Production-এ কোন route?

সাধারণত `OPENAI_API_KEY`; OAuth verified personal testing-এর জন্য।

### Fallback কীভাবে বাদ দেব?

Fallback disable করে explicit model সেট করুন এবং provider logs দেখুন।

## Further Reading

- [GPT Image 2 Service Notes](/docs/guides/gpt-image-2-service-notice/)
- [GPT Image 2 4K Generation](/docs/blog/gpt-image-2-4k-image-generation/)
