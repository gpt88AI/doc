---
title: Google AI Studio میں API key نہیں بن رہی؟ پہلے project اور 5 permissions چیک کریں
description: Permission denied کی صورت میں account، Cloud project، Workspace access، IAM permissions اور محفوظ key verification کی رہنمائی۔
date: 2026-04-27
category: تکنیکی ٹیوٹوریل
tags: [Google AI Studio, Gemini API, API Key, Permissions, Troubleshooting]
readTime: 14
relatedPath: /docs/guides/api-key-first-request-failed/
relatedTitle: First Request Fails After Creating an API Key
---

اگر AI Studio میں “You do not have permission to create keys” یا “Failed to generate API key: Permission denied” آئے تو usable key نہیں بنی۔ پہلے SDK، model یا request نہ بدلیں؛ signed-in account اور selected Cloud project کی boundary چیک کریں۔

## چار doors

| Door | شرط | ذمہ دار |
| --- | --- | --- |
| AI Studio access | Workspace، region اور age eligibility | Workspace admin/account owner |
| Project visibility | account target project دیکھ سکے | project owner/org admin |
| Create permission | current flow کی 5 permissions | project IAM admin |
| First verification | key server-side رہے اور minimal request چلے | developer |

Key بننے تک SDK، quota، billing یا API 403/429 debug نہ کریں۔ Admin سے یہ operations چیک کرائیں: `resourcemanager.projects.get`، `apikeys.keys.create`، `serviceusage.services.enable`، `iam.serviceAccounts.create`، `iam.serviceAccountApiKeyBindings.create`۔ Owner role مانگنے کے بجائے least privilege استعمال کریں۔

## Account اور project pin کریں

AI Studio API Keys page پر account email اور exact project ID نوٹ کریں۔ Display name کافی نہیں۔ Existing Cloud project نظر نہ آئے تو اسی نام کا نیا project نہ بنائیں؛ پہلے اسے AI Studio میں import کریں۔ Incognito میں target account کے ساتھ ایک retry صرف identity confusion دکھاتا ہے، permission نہیں دیتا۔ Personal account کا کام کرنا work account میں ایک خاص missing role ثابت نہیں کرتا؛ Workspace switch، membership یا org policy مختلف ہو سکتی ہے۔

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

Ticket میں project ID، account، timestamp اور error رکھیں؛ key، cookie، token یا secret نہ بھیجیں۔ Admin کے ایک authorized change کے بعد اسی account/project پر ایک بار retry کریں۔

## Key کے بعد محفوظ verification

Current AI Studio docs کے مطابق نئی keys authorized، service-account-backed path استعمال کر سکتی ہیں؛ migration dates دوبارہ verify کریں۔ Key کو server-side secret manager میں رکھیں، frontend، `NEXT_PUBLIC_*`، mobile app، screenshot، chat یا repository میں نہیں۔

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
curl "https://generativelanguage.googleapis.com/v1beta/models" \
  -H "x-goog-api-key: $GEMINI_API_KEY"
```

ایک minimal private request credential path ثابت کرتی ہے، ہر model یا quota نہیں۔ Key expose ہو تو فوراً rotate کریں۔

## Creation failure اور بعد کا API error

AI Studio creation failure میں account، project visibility، پانچ operations، Workspace اور org policy دیکھیں۔ Key بننے کے بعد `403` میں key/project match، restrictions، auth method، region اور resource چیک کریں۔ `429` میں project limits، rate، tokens اور retry strategy دیکھیں۔ بار بار key بنانا بعد کے API error کو حل نہیں کرتا۔

## Close checklist

- درست account اور exact project ID recorded
- AI Studio، region اور age eligibility pass
- target project visible/imported
- پانچ operations allowed
- ایک authorized change کے بعد ایک retry
- key server-side secret میں
- minimal private request کامیاب
- support کو credentials نہیں بھیجے گئے

GPT88 gateway کے لیے یہ Google Cloud IAM flow ضروری نہیں؛ یہ مضمون official Google AI Studio key creation کے لیے ہے۔

## Further Reading

- [First Request Fails After Creating an API Key](/docs/guides/api-key-first-request-failed/)
