---
title: Google AI Studio-ல் API key உருவாகவில்லையா? முதலில் project மற்றும் 5 permissions சரிபார்க்கவும்
description: Permission denied ஏற்பட்டால் account, Cloud project, Workspace access, IAM permissions மற்றும் பாதுகாப்பான key verification வழிகாட்டி.
date: 2026-04-27
category: தொழில்நுட்ப வழிகாட்டி
tags: [Google AI Studio, Gemini API, API Key, Permissions, Troubleshooting]
readTime: 14
relatedPath: /docs/guides/api-key-first-request-failed/
relatedTitle: First Request Fails After Creating an API Key
---

AI Studio-ல் “You do not have permission to create keys” அல்லது “Failed to generate API key: Permission denied” என்றால் usable key உருவாகவில்லை. SDK, model அல்லது request மாற்றுவதற்கு முன் signed-in account மற்றும் selected Cloud project boundary-ஐச் சரிபார்க்கவும்.

## நான்கு doors

| Door | தேவை | யார் பார்க்க வேண்டும் |
| --- | --- | --- |
| AI Studio access | Workspace, region, age eligibility | Workspace admin/account owner |
| Project visibility | target project-ஐ account பார்க்க வேண்டும் | project owner/org admin |
| Create permission | current flow-ன் 5 permissions | project IAM admin |
| First verification | key server-side, minimal request வெற்றி | developer |

Key உருவாகும் வரை SDK, quota, billing அல்லது API 403/429 debug செய்ய வேண்டாம். Admin-ிடம் `resourcemanager.projects.get`, `apikeys.keys.create`, `serviceusage.services.enable`, `iam.serviceAccounts.create`, `iam.serviceAccountApiKeyBindings.create` ஆகிய operations சரிபார்க்கச் சொல்லுங்கள். Owner role கேட்காமல் least privilege பயன்படுத்துங்கள்.

## Account மற்றும் project

AI Studio API Keys page-ல் account email மற்றும் exact project ID பதிவு செய்யுங்கள். Display name மட்டும் போதாது. Existing Cloud project தெரியவில்லை என்றால் அதே பெயரில் புதிய project உருவாக்க வேண்டாம்; முதலில் AI Studio-ல் import செய்யுங்கள். Incognito retry identity confusion-ஐ மட்டும் கண்டறியும்; permission வழங்காது. Personal account வேலை செய்வது work account-ல் ஒரு குறிப்பிட்ட role missing என்பதை நிரூபிக்காது.

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

Project ID, account, timestamp மற்றும் full error மட்டும் ticket-ல் அனுப்புங்கள்; key, cookie, token அல்லது secret அனுப்ப வேண்டாம். Admin ஒரு authorized change செய்த பிறகு அதே account/project-ல் ஒருமுறை retry செய்யுங்கள்.

## Key உருவான பிறகு verification

Current AI Studio docs படி புதிய keys authorized, service-account-backed path பயன்படுத்தலாம்; migration dates-ஐ மீண்டும் verify செய்யுங்கள். Key-ஐ server-side secret manager-ல் வையுங்கள்; frontend, `NEXT_PUBLIC_*`, mobile app, screenshot, chat அல்லது repository-ல் வைக்க வேண்டாம்.

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
curl "https://generativelanguage.googleapis.com/v1beta/models" \
  -H "x-goog-api-key: $GEMINI_API_KEY"
```

ஒரு minimal private request credential path-ஐ மட்டும் நிரூபிக்கும்; எல்லா models அல்லது quota-ஐ அல்ல. Key வெளிப்பட்டால் உடனே rotate செய்யுங்கள்.

## Creation failure மற்றும் பின்னர் API error

AI Studio creation failure-ல் account, project visibility, 5 operations, Workspace மற்றும் org policy பார்க்கவும். Key உருவாகி `403` வந்தால் key/project match, restrictions, auth method, region மற்றும் resource பார்க்கவும். `429` என்றால் project limits, rate, tokens மற்றும் retry strategy பார்க்கவும். மீண்டும் மீண்டும் key உருவாக்குவது பின்னர் வரும் API error-ஐ தீர்க்காது.

## Close checklist

- சரியான account மற்றும் exact project ID பதிவு
- AI Studio, region, age eligibility pass
- target project visible/imported
- 5 operations allowed
- ஒரு authorized change பின் ஒரு retry
- key server-side secret-ல்
- minimal private request வெற்றி
- support-க்கு credentials அனுப்பப்படவில்லை

GPT88 gateway-க்கு இந்த Google Cloud IAM flow தேவையில்லை; இது official Google AI Studio key creation-க்கு மட்டும்.

## Further Reading

- [First Request Fails After Creating an API Key](/docs/guides/api-key-first-request-failed/)
