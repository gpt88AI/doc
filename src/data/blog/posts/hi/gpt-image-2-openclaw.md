---
title: OpenClaw में GPT Image 2: API Key बनाम Codex OAuth
description: OpenClaw में openai/gpt-image-2 सेट करते समय API key और Codex OAuth का चुनाव billing, logs, org ownership और route evidence के आधार पर करें।
date: 2026-05-06
category: तकनीकी ट्यूटोरियल
tags: [GPT Image 2, OpenClaw, OpenAI Codex OAuth, OpenAI API, Image Generation]
readTime: 10
relatedPath: /docs/guides/gpt-image-2-service-notice/
relatedTitle: GPT Image 2 Service Notes
---

OpenClaw में model value `openai/gpt-image-2` लिखें। असली निर्णय model name नहीं, authentication route है। Production billing, organization control और traceable logs चाहिए तो `OPENAI_API_KEY` चुनें। Codex OAuth केवल तब उपयोग करें जब personal OpenClaw environment में Codex profile पहले से signed in और verified हो।

पहली सफल image को निष्कर्ष न मानें। OpenClaw fallback provider से image बना सकता है, OAuth profile गलत account या expired token पर हो सकता है। Acceptance के लिए model स्पष्ट सेट करें, fallback disable/mark करें, provider output या logs पढ़ें और auth route, model name तथा result का मिलान करें।

## API Key बनाम Codex OAuth

| Route | कब उपयोगी | Acceptance evidence |
| --- | --- | --- |
| `OPENAI_API_KEY` | production billing, org control, audit logs और team support | logs में OpenAI और `openai/gpt-image-2` |
| Codex OAuth | personal verification और पहले से verified Codex profile | account, workspace, provider output और no-fallback test |
| Fallback provider | failure के बाद backup route | output को non-OpenAI के रूप में स्पष्ट mark करें |

Minimal config:

```json
{
  "agents": { "defaults": { "imageGenerationModel": { "primary": "openai/gpt-image-2" } } }
}
```

API key route में OpenClaw के runtime environment में `OPENAI_API_KEY` रखें। GPT88 gateway हो तो console से प्राप्त key और `https://gpt88.cc/v1` base URL उपयोग करें; model reference वही रहता है। API key chat में या source में न लिखें। OAuth route में fake API key न बनाएं; current OpenAI/Codex profile verify करें।

## Route Verify करें

पहले provider list करें, फिर छोटा test चलाएं:

```text
image_generate action=list
image_generate model=openai/gpt-image-2 prompt="A simple product icon on a white desk, no text"
```

Image सफल हो और logs OpenAI route दिखाएं तो target route काम कर रहा है। Image सफल हो लेकिन provider अलग हो तो fallback ने काम किया। OAuth में HTTP 403 आए तो profile, account, workspace, token, OpenClaw version और fallback config जाँचें। Unsupported model में provider prefix और access state देखें। Transparent background failure prompt की नहीं, unsupported parameter की समस्या है; `gpt-image-2` पर इसे force न करें।

## Production के लिए API Key

Customers, batch jobs, audit records और team responsibility वाले काम में `OPENAI_API_KEY` अधिक स्पष्ट है: billing project/org से जुड़ती है, API response और OpenClaw logs मिलाए जा सकते हैं, quota तथा retry policy का owner स्पष्ट रहता है। API key अपने-आप सस्ती या हर account के लिए enabled नहीं होती; इसका लाभ control plane की स्पष्टता है।

Codex OAuth personal, low-risk testing के लिए सुविधाजनक है, लेकिन यह official free API key नहीं है। Profile के पीछे account, workspace mapping, token refresh और provider wiring प्रमाणित करें। HTTP 403 को auth/profile समस्या मानकर re-authenticate करें, पुराना profile साफ करें, fallback बंद करें और आवश्यकता हो तो API key पर जाएं।

## Common Failures

- OAuth 403: account, workspace, token और OpenClaw version जाँचें।
- Image बनी पर OpenAI provider नहीं: fallback बंद करके route isolate करें।
- `image_generate` नहीं मिला: image provider configuration पूरी करें।
- Model unsupported: `openai/` prefix, version और model access जाँचें।
- Transparent background fail: requirement हटाएं या post-processing route लें।
- Slow output: पहले provider, quota, size और fallback साबित करें; फिर retries tune करें।

4K verification को route verification से अलग रखें। पहले साबित करें कि image किस provider ने बनाई, फिर returned file के size और saved pixel dimensions जाँचें। Acceptance record में model reference, auth owner, provider evidence, fallback state और failure branch लिखें।

## FAQ

### OpenClaw में model name क्या है?

`openai/gpt-image-2`। Provider prefix routing के लिए आवश्यक है।

### क्या Codex OAuth का अर्थ free API है?

नहीं। OAuth authentication route है, official free API entitlement नहीं।

### Production में क्या चुनें?

सामान्यतः `OPENAI_API_KEY`; Codex OAuth केवल verified personal testing में।

### Fallback ने image नहीं बनाई, यह कैसे साबित करें?

Fallback disable करें, model explicitly सेट करें और provider logs देखें।

### क्या transparent background सीधे मिलेगा?

इस route पर भरोसा न करें। Subject generate करके transparency समर्थित model या post-processing उपयोग करें।

## Further Reading

- [GPT Image 2 Service Notes](/docs/guides/gpt-image-2-service-notice/)
- [GPT Image 2 4K Generation](/docs/blog/gpt-image-2-4k-image-generation/)
