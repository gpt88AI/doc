---
title: Google AI Studio में API key नहीं बन रही? पहले project और 5 permissions जाँचें
description: Permission denied होने पर account, Cloud project, Workspace access, IAM permissions और सुरक्षित key verification की step-by-step guide।
date: 2026-04-27
category: तकनीकी ट्यूटोरियल
tags: [Google AI Studio, Gemini API, API Key, Permissions, Troubleshooting]
readTime: 14
relatedPath: /docs/guides/api-key-first-request-failed/
relatedTitle: First Request Fails After Creating an API Key
---

यदि AI Studio में “You do not have permission to create keys” या “Failed to generate API key: Permission denied” दिखे, तो अभी usable key नहीं बनी है। पहले SDK, model या request बदलने के बजाय signed-in Google account और selected Cloud project की सीमा जाँचें।

## चार doors

| Door | क्या आवश्यक है | कौन संभालता है |
| --- | --- | --- |
| AI Studio access | Workspace, region और age eligibility | Workspace admin/account owner |
| Project visibility | account target project देख/ import कर सके | project owner/org admin |
| Create permission | current flow की 5 permissions | project IAM admin |
| First verification | key server-side रहे और minimal request चले | developer |

Key बनने तक SDK, quota, billing या API 403/429 debug न करें। Current authorized-key flow में admin से ये operations जाँचने को कहें: `resourcemanager.projects.get`, `apikeys.keys.create`, `serviceusage.services.enable`, `iam.serviceAccounts.create`, `iam.serviceAccountApiKeyBindings.create`। सीधे Owner role न माँगें; organization policy के अनुसार least privilege लें।

## Account और project pin करें

AI Studio API Keys page पर top-right account email और exact project ID लिखें। Display name पर भरोसा न करें। Gemini key Cloud project से जुड़ी होती है; project IAM, enabled services, service account, restrictions और usage record रखता है। Existing Cloud project list में न दिखे तो same-name project न बनाएं; पहले उसे AI Studio में import करें। Incognito में target account के साथ एक controlled retry केवल identity confusion जाँचता है, permission नहीं देता।

Personal account का काम करना work account के लिए किसी एक missing role का प्रमाण नहीं। Work account पर Workspace service switch, project membership, service-account operation या org policy अलग हो सकती है। Production integration को personal project में migrate न करें।

## Admin को भेजने योग्य request

```text
Account: ACCOUNT_EMAIL
Project: PROJECT_ID
Time and timezone: TIMESTAMP
Error: full visible message
Requested operations:
resourcemanager.projects.get
apikeys.keys.create
serviceusage.services.enable
iam.serviceAccounts.create
iam.serviceAccountApiKeyBindings.create
```

Ticket में project ID, account, timestamp और error रखें। API key, cookie, access token या secret न भेजें। Admin एक authorized change करने के बाद उसी account और project पर केवल एक बार retry करें।

## Key बनने के बाद सुरक्षित verification

नई AI Studio keys authorized, service-account-backed path पर हो सकती हैं; current official docs और migration dates दोबारा जाँचें। Key को server-side secret manager में रखें, frontend bundle, `NEXT_PUBLIC_*`, mobile app, screenshot, chat या repository में नहीं।

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
curl "https://generativelanguage.googleapis.com/v1beta/models" \
  -H "x-goog-api-key: $GEMINI_API_KEY"
```

एक minimal private request सफल होना केवल credential path सिद्ध करता है; हर model, quota या billing नहीं। Key expose हो तो तुरंत rotate करें।

## Creation failure बनाम बाद का API error

AI Studio में key create fail: account, project visibility, 5 operations, Workspace और org policy देखें। Key बनने के बाद `403`: key/project match, restrictions, auth method, region और resource देखें। `429`: project limit, rate, tokens और retry strategy देखें। बार-बार key बनाना किसी बाद के API error का समाधान नहीं।

## Close checklist

- सही account और exact project ID रिकॉर्ड है
- AI Studio, region और age eligibility पास है
- target project visible/imported है
- पाँच operations allowed हैं
- केवल एक authorized change के बाद retry किया गया
- key server-side secret में है
- एक minimal private request सफल है
- support को credentials नहीं भेजे गए

GPT88 gateway उपयोग करने पर यह Google Cloud IAM flow लागू नहीं होता; यह लेख official Google AI Studio key creation के लिए है।

## Further Reading

- [First Request Fails After Creating an API Key](/docs/guides/api-key-first-request-failed/)
