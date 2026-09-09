---
title: Google AI Studio-তে API key তৈরি হচ্ছে না? আগে project ও ৫টি permission দেখুন
description: Permission denied হলে account, Cloud project, Workspace access, IAM permission এবং নিরাপদ key verification-এর step-by-step guide।
date: 2026-04-27
category: প্রযুক্তি টিউটোরিয়াল
tags: [Google AI Studio, Gemini API, API Key, Permissions, Troubleshooting]
readTime: 14
relatedPath: /docs/guides/api-key-first-request-failed/
relatedTitle: First Request Fails After Creating an API Key
---

AI Studio-তে “You do not have permission to create keys” বা “Failed to generate API key: Permission denied” দেখালে usable key তৈরি হয়নি। আগে SDK, model বা request বদলাবেন না; signed-in account এবং selected Cloud project-এর boundary দেখুন।

## চারটি door

| Door | কী দরকার | কে দেখবে |
| --- | --- | --- |
| AI Studio access | Workspace, region ও age eligibility | Workspace admin/account owner |
| Project visibility | account target project দেখতে/import করতে পারে | project owner/org admin |
| Create permission | current flow-এর ৫টি permission | project IAM admin |
| First verification | key server-side ও minimal request সফল | developer |

Key তৈরি না হওয়া পর্যন্ত SDK, quota, billing বা API 403/429 debug করবেন না। Admin-কে এই operations যাচাই করতে বলুন: `resourcemanager.projects.get`, `apikeys.keys.create`, `serviceusage.services.enable`, `iam.serviceAccounts.create`, `iam.serviceAccountApiKeyBindings.create`। সরাসরি Owner role চাইবেন না; organization policy অনুযায়ী least privilege নিন।

## Account ও project নির্দিষ্ট করুন

AI Studio API Keys page-এ top-right account email এবং exact project ID লিখে রাখুন। Display name যথেষ্ট নয়। Gemini key Cloud project-এর সঙ্গে যুক্ত; project IAM, enabled service, service account, restriction ও usage record গুরুত্বপূর্ণ। Existing Cloud project না দেখালে একই নামের নতুন project বানাবেন না; আগে AI Studio-তে import করুন। Incognito-তে target account দিয়ে controlled retry শুধু identity confusion ধরতে সাহায্য করে, permission দেয় না।

Personal account কাজ করলেই work account-এ একটি নির্দিষ্ট role missing প্রমাণ হয় না। Workspace switch, membership, service-account operation বা org policy আলাদা হতে পারে। Production integration personal project-এ সরাবেন না।

## Admin request template

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

Ticket-এ project ID, account, timestamp ও error রাখুন। API key, cookie, access token বা secret পাঠাবেন না। Admin একটি authorized change করার পর একই account ও project-এ একবার retry করুন।

## Key তৈরি হলে নিরাপদ verification

নতুন AI Studio key authorized, service-account-backed path ব্যবহার করতে পারে; current official docs এবং migration date আবার যাচাই করুন। Key server-side secret manager-এ রাখুন, frontend bundle, `NEXT_PUBLIC_*`, mobile app, screenshot, chat বা repository-তে নয়।

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
curl "https://generativelanguage.googleapis.com/v1beta/models" \
  -H "x-goog-api-key: $GEMINI_API_KEY"
```

একটি minimal private request credential path প্রমাণ করে; সব model, quota বা billing নয়। Key প্রকাশ পেলে সঙ্গে সঙ্গে rotate করুন।

## Creation failure বনাম পরে API error

AI Studio create failure হলে account, project visibility, পাঁচটি operation, Workspace ও org policy দেখুন। Key তৈরি হয়ে `403` এলে key/project match, restriction, auth method, region ও resource দেখুন। `429` এ project limit, rate, token ও retry strategy দেখুন। বারবার key তৈরি করা পরে আসা API error-এর সমাধান নয়।

## Close checklist

- সঠিক account ও exact project ID recorded
- AI Studio, region ও age eligibility pass
- target project visible/imported
- পাঁচটি operation allowed
- এক authorized change-এর পর এক retry
- key server-side secret-এ
- এক minimal private request সফল
- support-এ credential পাঠানো হয়নি

GPT88 gateway ব্যবহার করলে এই Google Cloud IAM flow প্রযোজ্য নয়; এটি official Google AI Studio key creation-এর জন্য।

## Further Reading

- [First Request Fails After Creating an API Key](/docs/guides/api-key-first-request-failed/)
