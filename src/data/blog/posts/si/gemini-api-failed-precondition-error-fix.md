---
title: Gemini API FAILED_PRECONDITION Error: diagnosis සිට විසඳුම දක්වා
description: FAILED_PRECONDITION region restriction, billing සහ CLI environment conflict ලෙස වෙන් කර නිවැරදි විසඳුම තෝරන්න.
date: 2026-01-23
category: API සංවර්ධනය
tags: [Gemini API, FAILED_PRECONDITION, API Error Fix, Region Restriction, Google AI]
readTime: 12
relatedPath: /docs/api/errors/
relatedTitle: API Error Codes
---

`FAILED_PRECONDITION` යනු HTTP 400-family error එකකි. Request එක නිවැරදි වුවත් account, project, region හෝ environment precondition එක සපුරා නැති විය හැක. සාමාන්‍ය හේතු unsupported region/free tier, billing disabled සහ Gemini CLI environment conflict වේ. මෙය 429 rate limit හෝ 403 permission error නොවේ.

## 30-second diagnosis

1. Full `error.message` බලන්න.
2. “User location is not supported” ⇒ region; “enable billing” ⇒ billing; CLI හි “Precondition check failed” ⇒ environment conflict.
3. Egress IP/region, exact model ID, project billing සහ key context verify කරන්න. [Supported regions](https://ai.google.dev/gemini-api/docs/available-regions) බලන්න.

## Region restriction සඳහා routes පහක්

1. **Unified gateway**: OpenAI-compatible gateway එකේ `base_url` සහ key වෙනස් කරන්න.
2. **VPN**: supported egress region, DNS-over-VPN සහ actual geolocation පරීක්ෂා කරන්න.
3. **Cloud server**: supported AWS/GCP/Azure region එකක deploy කර source IP verify කරන්න.
4. **Cloudflare Workers**: edge proxy, secret, data boundary, latency සහ billing පරීක්ෂා කරන්න.
5. **Vertex AI**: GCP project, Vertex API සහ service account සහිත official enterprise route; සැබෑ Cloud governance අවශ්‍ය විට පමණක්.

```python
from openai import OpenAI
client = OpenAI(api_key="YOUR_GPT88_API_KEY", base_url="https://gpt88.cc/v1")
response = client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=[{"role": "user", "content": "Hello, Gemini!"}],
)
```

GPT88 charge official usage × selected group multiplier අනුව වේ; current price/quota console එකෙන් බලන්න. එය development candidate එකක් මිස official enterprise replacement එකක් නොවේ.

## Billing සහ CLI fix

AI Studio Dashboard → Usage and Billing → Set up Billing විවෘත කර key එකට සම්බන්ධ account/project තහවුරු කරන්න. Payment, balance, plan සහ limits account/region මත වෙනස් වේ; billing පමණක් unsupported region සෑමවිටම විසඳන්නේ නැත. පැරණි RPM numbers hard-code නොකරන්න.

```bash
unset GOOGLE_CLOUD_PROJECT
unset GOOGLE_APPLICATION_CREDENTIALS
unset CLOUDSDK_CORE_PROJECT
gemini
```

අවශ්‍ය නම් personal OAuth නැවත කරන්න; production credentials අහඹු ලෙස unset නොකරන්න.

## Prevention සහ FAQ

Error message, request ID, entry point, project, model සහ egress region log කරන්න; key නොකරන්න. 400, 403 සහ 429 වෙන වෙනම handle කරන්න. Precondition error එකකට blind retry නොකරන්න. නව key එකක් region හෝ same-project quota වෙනස් නොකරයි.

## Further Reading

- [API Error Codes](/docs/api/errors/)
