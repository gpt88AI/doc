---
title: Google AI Studio मा API key बन्ने छैन? पहिले project र ५ permissions जाँच्नुहोस्
description: Permission denied हुँदा account, Cloud project, Workspace access, IAM permissions र सुरक्षित key verification को step-by-step guide।
date: 2026-04-27
category: प्राविधिक ट्युटोरियल
tags: [Google AI Studio, Gemini API, API Key, Permissions, Troubleshooting]
readTime: 14
relatedPath: /docs/guides/api-key-first-request-failed/
relatedTitle: First Request Fails After Creating an API Key
---

AI Studio मा “You do not have permission to create keys” वा “Failed to generate API key: Permission denied” आए usable key बनेको छैन। पहिले SDK, model वा request बदल्नु अघि signed-in account र selected Cloud project को boundary जाँच्नुहोस्।

## चार doors

| Door | आवश्यक कुरा | जिम्मेवार |
| --- | --- | --- |
| AI Studio access | Workspace, region र age eligibility | Workspace admin/account owner |
| Project visibility | account ले target project देख्न/import गर्न सक्ने | project owner/org admin |
| Create permission | current flow का ५ permissions | project IAM admin |
| First verification | key server-side र minimal request सफल | developer |

Key नबनेसम्म SDK, quota, billing वा API 403/429 debug नगर्नुहोस्। Admin सँग यी operations जाँच्न लगाउनुहोस्: `resourcemanager.projects.get`, `apikeys.keys.create`, `serviceusage.services.enable`, `iam.serviceAccounts.create`, `iam.serviceAccountApiKeyBindings.create`। Owner role माग्नुको सट्टा least privilege प्रयोग गर्नुहोस्।

## Account र project

AI Studio API Keys page मा account email र exact project ID लेख्नुहोस्। Display name मात्र पर्याप्त छैन। Existing Cloud project नदेखिए उही नामको नयाँ project नबनाउनुहोस्; पहिले AI Studio मा import गर्नुहोस्। Incognito retry ले identity confusion मात्र जाँच्दछ, permission दिँदैन। Personal account सफल हुनु work account मा एउटा निश्चित role missing भएको प्रमाण होइन।

## Admin request

```text
Account: ACCOUNT_EMAIL
Project: PROJECT_ID
Time and timezone: TIMESTAMP
Error: full visible message
Operations:
resourcemanager.projects.get
apikeys.keys.create
serviceusage.services.enable
iam.serviceAccounts.create
iam.serviceAccountApiKeyBindings.create
```

Ticket मा project ID, account, timestamp र full error मात्र राख्नुहोस्; key, cookie, token वा secret नपठाउनुहोस्। Admin को एक authorized change पछि उही account/project मा एकपटक retry गर्नुहोस्।

## Key बनेपछि सुरक्षित verification

Current AI Studio docs अनुसार नयाँ key authorized, service-account-backed path हुन सक्छ; migration dates फेरि verify गर्नुहोस्। Key server-side secret manager मा राख्नुहोस्, frontend, `NEXT_PUBLIC_*`, mobile app, screenshot, chat वा repository मा होइन।

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
curl "https://generativelanguage.googleapis.com/v1beta/models" \
  -H "x-goog-api-key: $GEMINI_API_KEY"
```

एउटा minimal private request ले credential path प्रमाणित गर्छ, सबै model वा quota होइन। Key expose भए तुरुन्त rotate गर्नुहोस्।

## Creation failure र पछि आउने API error

AI Studio creation failure मा account, project visibility, ५ operations, Workspace र org policy हेर्नुहोस्। Key बनेर `403` आए key/project match, restrictions, auth method, region र resource जाँच्नुहोस्। `429` मा project limits, rate, tokens र retry strategy हेर्नुहोस्। बारम्बार key बनाउनु पछिको API error को समाधान होइन।

## Close checklist

- सही account र exact project ID recorded
- AI Studio, region र age eligibility pass
- target project visible/imported
- पाँच operations allowed
- एक authorized change पछि एक retry
- key server-side secret मा
- minimal private request सफल
- support लाई credentials पठाइएको छैन

GPT88 gateway का लागि यो Google Cloud IAM flow आवश्यक छैन; यो official Google AI Studio key creation का लागि मात्र हो।

## Further Reading

- [First Request Fails After Creating an API Key](/docs/guides/api-key-first-request-failed/)
