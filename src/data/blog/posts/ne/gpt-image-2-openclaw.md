---
title: OpenClaw मा GPT Image 2: API Key बनाम Codex OAuth
description: OpenClaw मा openai/gpt-image-2 सेट गर्दा billing, logs, org ownership र route evidence हेरेर API key वा Codex OAuth छान्ने तरिका।
date: 2026-05-06
category: प्राविधिक ट्युटोरियल
tags: [GPT Image 2, OpenClaw, OpenAI Codex OAuth, OpenAI API, Image Generation]
readTime: 10
relatedPath: /docs/guides/gpt-image-2-service-notice/
relatedTitle: GPT Image 2 Service Notes
---

OpenClaw मा model value `openai/gpt-image-2` लेख्नुहोस्। वास्तविक निर्णय model name होइन, authentication route हो। Production billing, organization control र traceable logs चाहिँदा `OPENAI_API_KEY` प्रयोग गर्नुहोस्। Codex OAuth verified personal OpenClaw profile हुँदा मात्र प्रयोग गर्नुहोस्।

पहिलो सफल image लाई प्रमाण नमान्नुहोस्। OpenClaw ले fallback provider प्रयोग गर्न सक्छ, OAuth profile गलत account वा expired token मा हुन सक्छ। Model explicit सेट गर्नुहोस्, fallback disable/mark गर्नुहोस्, provider output वा logs हेर्नुहोस् र auth route, model name तथा result मिलाउनुहोस्।

## Route र Config

| Route | कहिले उपयुक्त | Evidence |
| --- | --- | --- |
| `OPENAI_API_KEY` | production billing, org control, audit logs | OpenAI र `openai/gpt-image-2` logs |
| Codex OAuth | verified profile सहित personal test | account, workspace, provider output, no-fallback test |
| Fallback provider | failure पछि backup | output लाई non-OpenAI mark गर्नुहोस् |

```json
{
  "agents": { "defaults": { "imageGenerationModel": { "primary": "openai/gpt-image-2" } } }
}
```

Runtime environment मा `OPENAI_API_KEY` राख्नुहोस्। GPT88 gateway मा console key र `https://gpt88.cc/v1` base URL प्रयोग गर्नुहोस्; model reference उही रहन्छ। OAuth route मा fake API key नबनाउनुहोस्; current OpenAI/Codex profile verify गर्नुहोस्।

## Route Verify र Debug

Provider list गरेर सानो test चलाउनुहोस्:

```text
image_generate action=list
image_generate model=openai/gpt-image-2 prompt="A simple product icon on a white desk, no text"
```

Image सफल भए पनि provider OpenAI नभए fallback ले बनाएको हो। OAuth 403 मा profile, account, workspace, token, OpenClaw version र fallback config जाँच्नुहोस्। Unsupported model मा provider prefix र access state हेर्नुहोस्। Transparent background failure unsupported parameter हो; prompt मात्र बदलिरहनु व्यर्थ हुन्छ।

Production मा API key route ले billing project/org, logs, quota, retry policy र support owner स्पष्ट बनाउँछ। Codex OAuth personal low-risk testing का लागि सजिलो छ, तर official free API key होइन। 403 जारी रहे re-authenticate, पुरानो profile सफा, fallback बन्द र आवश्यक परे API key प्रयोग गर्नुहोस्। 4K verification लाई route verification बाट अलग राखेर saved pixel dimensions जाँच्नुहोस्।

## Common Failures र FAQ

Tool/provider नपाइए setup पूरा गर्नुहोस्; model unsupported भए `openai/` prefix, version र access जाँच्नुहोस्; image बने पनि OpenAI नभए fallback isolate गर्नुहोस्; slow output मा पहिले route, quota, size र fallback प्रमाणित गर्नुहोस्। Transparent asset का लागि अर्को model वा post-processing प्रयोग गर्नुहोस्।

### Model name के हो?

`openai/gpt-image-2`; provider prefix routing का लागि आवश्यक छ।

### Codex OAuth free API हो?

होइन; यो authentication route हो, official free entitlement होइन।

### Production मा के रोज्ने?

सामान्यतया `OPENAI_API_KEY`; OAuth verified personal testing का लागि मात्र।

### Fallback कसरी हटाउने?

Fallback disable गरी model explicit सेट गर्नुहोस् र provider logs हेर्नुहोस्।

## Further Reading

- [GPT Image 2 Service Notes](/docs/guides/gpt-image-2-service-notice/)
- [GPT Image 2 4K Generation](/docs/blog/gpt-image-2-4k-image-generation/)
