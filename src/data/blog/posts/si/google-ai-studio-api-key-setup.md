---
title: Google AI Studio හි API key එකක් සෑදෙන්නේ නැද්ද? මුලින් project සහ permissions 5ක් බලන්න
description: Permission denied වුවහොත් account, Cloud project, Workspace access, IAM permissions සහ ආරක්ෂිත key verification සඳහා guide එකක්.
date: 2026-04-27
category: තාක්ෂණික නිබන්ධනය
tags: [Google AI Studio, Gemini API, API Key, Permissions, Troubleshooting]
readTime: 14
relatedPath: /docs/guides/api-key-first-request-failed/
relatedTitle: First Request Fails After Creating an API Key
---

AI Studio හි “You do not have permission to create keys” හෝ “Failed to generate API key: Permission denied” පෙන්වන්නේ usable key එකක් සෑදී නැති බවයි. SDK, model හෝ request වෙනස් කිරීමට පෙර signed-in account සහ selected Cloud project boundary පරීක්ෂා කරන්න.

## Doors හතර

| Door | අවශ්‍ය දේ | පරීක්ෂා කරන කෙනා |
| --- | --- | --- |
| AI Studio access | Workspace, region සහ age eligibility | Workspace admin/account owner |
| Project visibility | account එකට target project පෙනීම/import කිරීම | project owner/org admin |
| Create permission | current flow හි permissions 5 | project IAM admin |
| First verification | key server-side, minimal request සාර්ථක | developer |

Key එක නොසෑදුණු තුරු SDK, quota, billing හෝ API 403/429 debug නොකරන්න. Adminගෙන් මේ operations පරීක්ෂා කරන්න: `resourcemanager.projects.get`, `apikeys.keys.create`, `serviceusage.services.enable`, `iam.serviceAccounts.create`, `iam.serviceAccountApiKeyBindings.create`। Owner role වෙනුවට least privilege භාවිතා කරන්න.

## Account සහ project

AI Studio API Keys page එකේ account email සහ exact project ID සටහන් කරන්න. Display name පමණක් ප්‍රමාණවත් නැත. Existing Cloud project නොපෙනේ නම් එකම නමක project එකක් නැවත සාදන්න එපා; මුලින් AI Studio වෙත import කරන්න. Incognito retry එක identity confusion පමණක් පෙන්වයි, permission ලබා නොදෙයි. Personal account එක සාර්ථක වීම work account එකේ එක් role එකක් අඩු බවට සාක්ෂියක් නොවේ.

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

Ticket එකට project ID, account, timestamp සහ full error පමණක් දමන්න; key, cookie, token හෝ secret යවන්න එපා. Admin එක authorized change එකක් කළ පසු එම account/project එකෙන් එකවරක් retry කරන්න.

## Key එකෙන් පසු ආරක්ෂිත verification

Current AI Studio docs අනුව නව keys authorized, service-account-backed path එකක් භාවිතා කළ හැක; migration dates නැවත verify කරන්න. Key එක server-side secret manager එකක තබන්න; frontend, `NEXT_PUBLIC_*`, mobile app, screenshot, chat හෝ repository තුළ නොතබන්න.

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
curl "https://generativelanguage.googleapis.com/v1beta/models" \
  -H "x-goog-api-key: $GEMINI_API_KEY"
```

එක් minimal private request එකක් credential path පමණක් තහවුරු කරයි; සියලු models හෝ quota නොවේ. Key එක expose වුවහොත් වහාම rotate කරන්න.

## Creation failure සහ පසුව API error

AI Studio creation failure එකකදී account, project visibility, permissions 5, Workspace සහ org policy බලන්න. Key සෑදී `403` නම් key/project match, restrictions, auth method, region සහ resource බලන්න. `429` නම් project limits, rate, tokens සහ retry strategy බලන්න. Keys නැවත නැවත සෑදීම පසුව ඇති API error විසඳන්නේ නැත.

## Close checklist

- නිවැරදි account සහ exact project ID recorded
- AI Studio, region සහ age eligibility pass
- target project visible/imported
- permissions 5 allowed
- authorized change එකකට පසු එක retry
- key server-side secret එකක
- minimal private request සාර්ථක
- support වෙත credentials යවා නැත

GPT88 gateway සඳහා මෙම Google Cloud IAM flow අවශ්‍ය නොවේ; මෙය official Google AI Studio key creation සඳහා පමණි.

## Further Reading

- [First Request Fails After Creating an API Key](/docs/guides/api-key-first-request-failed/)
