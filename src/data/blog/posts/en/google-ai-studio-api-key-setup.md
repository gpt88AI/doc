---
title: Can't Create an API Key in Google AI Studio: Check the Project and 5 Permissions First
description: When you hit "Failed to generate API key: Permission denied", verify your Google account and Cloud project first, then request the 5 permissions needed to create an authorized key, distinguish Workspace access, project IAM, and later API 403s, with a copy-paste request template for admins and a closure checklist.
date: 2026-04-27
category: 技术教程
tags: [Google AI Studio, Gemini API, API Key, Permissions, Troubleshooting]
readTime: 14
relatedPath: /docs/guides/api-key-first-request-failed/
relatedTitle: First Request Fails After Creating an API Key
---

If clicking Create in Google AI Studio shows "**You do not have permission to create keys in this project**" or **"Failed to generate API key: Permission denied"**, you currently have no usable key. Don't start changing the SDK, model names, or request parameters first; the first boundary is the signed-in Google account and the Cloud project selected in AI Studio.

Before switching accounts, projects, or roles, write down the current account and the exact project ID, then figure out which door you're stuck at:

| Door | Condition that must hold | Usually handled by |
| --- | --- | --- |
| AI Studio access | Account meets Workspace, region, and age requirements and can open AI Studio | Workspace admin or account owner |
| Project visibility | The same account can select or import the target Google Cloud project | Project owner or organization admin |
| Create permission | Account holds the 5 permissions the current authorized-key flow needs in the target project | Project IAM admin |
| First verification | Key is created, stored only server-side, and one minimal request succeeds | Developer, after the key exists |

**Stop rule**: as long as the key wasn't created, don't debug the SDK, model quotas, billing, or 403/429s in requests. Those all happen *after* you have a key.

If the third door fails, you can send the following 5 current permissions directly to the project admin: `resourcemanager.projects.get`, `apikeys.keys.create`, `serviceusage.services.enable`, `iam.serviceAccounts.create`, `iam.serviceAccountApiKeyBindings.create`. Ask the admin to grant these operations in the target project per organization policy; don't default to asking for Owner.

After the admin makes one authorized change, retry only once, on the same account and same project. The success criterion is not "the button stopped complaining" — it's that the key exists, never entered the frontend or chat history, and one minimal server-side request passes.

## Pin Down the Account and Project First; Don't Change Four Variables at Once

Open [Google AI Studio API Keys](https://aistudio.google.com/app/apikey) and confirm the account in the top-right is the identity that should own this integration. Record two values:

1. The email shown in the account picker;
2. The target project's project ID, not just an easily duplicated display name.

Gemini API keys belong to a Google Cloud project. The project carries IAM, service enabling, the service account behind an authorized key, key restrictions, usage records, and the recovery path later. Looking "signed into Google" in the browser doesn't mean the current tab uses the account and project your team expects.

If the project already exists in Google Cloud but isn't visible in the AI Studio list, don't create a same-named project. Per Google's [current API key docs](https://ai.google.dev/gemini-api/docs/generate-content/api-key?hl=zh-cn), import the existing Cloud project into AI Studio first, then manage the key in the right project.

A clean session can help rule out identity confusion: sign out of unrelated accounts, or open an incognito window signed in only with the target account, select the same project, and try once. This only proves whether you previously picked the wrong account/project — it doesn't grant IAM, and it doesn't bypass organization policy.

### Why a Personal Account Works but the Work Account Doesn't

This difference is informative but doesn't directly prove "a specific role is missing". A personal account may use a personally-controlled project; a work account may be governed by Workspace service switches, project membership, IAM, service-account operations, age/region conditions, or organization policy.

Don't migrate production integration to a personal project just because personal projects can create keys. Keep the intended work identity and target project, and route the blocker to the right admin.

| Observed | Can imply | Cannot imply |
| --- | --- | --- |
| Personal account works | Another account/project path passes | The work account is missing only one fixed role |
| Work account can't see the project | Project visibility, membership, or org access may be blocked | The Gemini API service is entirely down |
| Sees the project but creation fails | Create permission, service enabling, service account, binding, or policy may be blocked | Clearing the cache will definitely fix IAM |
| Multiple accounts fail in the same compliant environment | Project, eligibility, or org policy need review | Creating new projects endlessly is the safe fix |

## Request the Current 5 Create Operations from the Admin

Google currently lists 5 permissions for AI Studio's new authorized-key flow, not just the `apikeys.keys.create` that older answers mention alone:

| Permission | Work it performs during creation |
| --- | --- |
| `resourcemanager.projects.get` | Read and confirm the target project |
| `apikeys.keys.create` | Create the API key resource |
| `serviceusage.services.enable` | Enable required services when needed |
| `iam.serviceAccounts.create` | Create the service account behind the authorized key |
| `iam.serviceAccountApiKeyBindings.create` | Bind the API key to that service account |

Source: [Gemini API key official docs](https://ai.google.dev/gemini-api/docs/generate-content/api-key?hl=zh-cn), verified 2026-07-15.

The [Cloud IAM API Keys role reference](https://docs.cloud.google.com/iam/docs/roles-permissions/apikeys) shows that API Keys Admin includes `apikeys.keys.create` and other API-key operations. But that doesn't fully cover the current AI Studio flow: service enabling, service-account creation, and binding belong to other permission families.

So the least-privilege request shouldn't be "give me Owner". Hand the 5 operation names, the exact project ID, and the failure timestamp to the admin, and let them pick a predefined role combination or custom role that fits org policy.

### A Request You Can Copy Straight to the Admin

> I sign into Google AI Studio as **ACCOUNT_EMAIL** and, while creating an authorized key in project **PROJECT_ID**, the page shows "Failed to generate API key: Permission denied / You do not have permission to create keys in this project" at **TIMESTAMP_WITH_TIME_ZONE**.
>
> Please first confirm this account can access AI Studio and see the target project, then check whether the project allows these current create operations: `resourcemanager.projects.get` `apikeys.keys.create` `serviceusage.services.enable` `iam.serviceAccounts.create` `iam.serviceAccountApiKeyBindings.create`
>
> No key was created, and no credentials were included in the message.

Put only the project ID, account, timestamp with timezone, and the full error in the ticket. Don't attach keys, browser cookies, access tokens, or other secrets.

## Separate Workspace Access from Cloud Project IAM

Workspace admins and Cloud project IAM admins control two different doors.

Workspace service access decides whether a managed account can use AI Studio; project IAM decides what that identity can do inside a given Cloud project. Passing one door doesn't mean the other passes.

Google's [Workspace and AI Studio access docs](https://ai.google.dev/gemini-api/docs/workspace?hl=zh-cn) say admins can control managed users' AI Studio access and list extra restrictions for some education accounts under 18. The [available regions docs](https://ai.google.dev/gemini-api/docs/available-regions?hl=zh-cn) separately define region and age conditions. These are account-access conditions, not replacements for project roles.

| What you can currently do | More likely handler | What to ask them to check |
| --- | --- | --- |
| Work account can't open AI Studio | Workspace admin | Service switches, org unit, age or education-account restrictions |
| Can open AI Studio but can't see the target project | Project owner or org admin | Project membership, project import, account identity |
| Can see the project but can't create keys | Project IAM admin | The 5 current operations and org policy |
| Key created, but API later returns 403 | Developer and project owner | Key/project match, restrictions, routing, region, request auth |

If the failure point belongs to an admin, stop at that layer. Repeatedly switching browsers, creating new projects, or requesting large roles only adds audit noise; it doesn't change who owns the blocker.

## Retry Once, In a Controlled Way, on the Same Project

After an admin completes one explicit access or IAM change, return to the same account and same project. Refresh AI Studio, or use a clean session signed in only with that account, confirm the project ID again, and click Create once.

Don't switch account, project, browser, and role simultaneously. Change one authorized boundary at a time so you can tell which change actually took effect. If it still fails, save the new timestamp and full error for the next escalation.

In a team environment, keep a short retry log: original account, original project ID, the change the admin approved, when the change was completed, the retry time, and the result. Don't just write "it worked later". If two admins changed different boundaries in sequence, each change should have its own retry; otherwise you can't tell whether a Workspace service switch, project membership, or some IAM operation actually unblocked you. This record contains no keys but prevents the next developer from re-requesting oversized permissions.

After creation succeeds, confirm the key type. Google's current docs say newly created AI Studio keys are **authorized keys** backed by a Google Cloud service account, restricted to the Gemini API by default. The [Cloud API key authentication docs](https://docs.cloud.google.com/docs/authentication/api-keys) explain how authorized keys bind to service accounts.

Older tutorials may describe standard API keys. Google also currently states that the Gemini API will start rejecting standard API keys in **September 2026**. This is a moving migration point; re-read the official key docs before any long-term deployment rather than treating today's date as a permanent promise.

Copy the new key into trusted server-side secret storage. Don't put it in screenshots, frontend bundles, mobile apps, public repos, issues, or chats. If calls must originate from a browser UI, proxy Gemini requests through your own backend instead of exposing the key to the client.

## After the Key Exists, Do One Minimal Private Verification

Creation success only proves the key resource exists — not that your runtime reads the right secret, nor that all models, quotas, or billing conditions are fine.

First set an environment variable in a private server-side shell or secret manager:

```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

Then send one minimal authenticated request from that same private environment:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models" \
  -H "x-goog-api-key: $GEMINI_API_KEY"
```

A successful response means the credential reaches the Gemini API. It doesn't guarantee every model works, nor that quota, billing, or the next business request succeeds. After the minimal check passes, test a real call with the current model.

Always follow four security lines:

- Copy the key only to approved secret locations;
- Don't put it in client-side env vars like `NEXT_PUBLIC_*`;
- Don't paste the key into tickets, screenshots, or chats;
- Rotate it the moment it's exposed, even if current requests still succeed.

## Still Denied? Escalate the Boundary Instead of Guessing

Good escalation material lets an admin reproduce the failure without touching your secrets. Provide:

- The exact Cloud project ID;
- The signed-in Google account;
- The full error shown on the page;
- The failure time with timezone;
- The action attempted: create an AI Studio authorized key;
- Whether AI Studio opens and the project is visible;
- Whether a clean single-account session changed the result.

In this failed state you shouldn't have a key, so don't send any key. If a later attempt actually succeeds, just report "creation succeeded" — credentials still belong in a secret channel.

These stop conditions should be handled by an admin:

- The managed Workspace account's AI Studio service is turned off;
- The target project is hidden by org or membership;
- Org policy forbids service-account, key, or binding operations;
- The account doesn't meet region, age, verification, or education-account conditions;
- Security policy requires a different approved credential method.

Under these conditions, "try another account" isn't a production fix. The admin needs to approve the target route or specify the organization-supported credential scheme.

## Don't Mix Up Creation Failure with Later API 403s

Both error classes can contain "permission denied", but they sit on opposite sides of the key lifecycle.

| State | What you have | Where the error appears | First checks |
| --- | --- | --- | --- |
| AI Studio says it can't generate a key | No usable key | AI Studio create operation | Account, project visibility, the 5 permissions, Workspace/org policy |
| API returns `403 PERMISSION_DENIED` | A key already exists | HTTP API response | Key/project match, restrictions, auth method, region, resource permission |
| API returns `429 RESOURCE_EXHAUSTED` | Key exists, auth may have passed | HTTP response after the request entered | Project limits, rates, tokens, retry strategy |

Don't fix the first row by editing application code, and don't fix the second row by creating keys repeatedly. Keep the state transition clear: create first, store privately, make one small request, then continue debugging against real responses.

Once a key works, if the problem shifts to Free Tier capacity, see [Gemini API Free Tier Limits](/en/docs/blog/gemini-api-free-tier/). This branch shouldn't slow down fixing the create permission.

## Close the Incident With This Checklist

The incident is only closed when every answer is specific:

| Question | Pass criterion |
| --- | --- |
| Which account is signed in? | Target work or personal identity recorded |
| Which project owns the key? | Exact project ID confirmed in AI Studio |
| Can the account use AI Studio? | Workspace, region, and age conditions pass |
| Can the account see the project? | Existing target project selected or imported |
| Can it create an authorized key? | All 5 current operations allowed |
| What changed before retrying? | Exactly one authorized access/IAM change recorded |
| Where does the key live? | Server-side secret or environment variable |
| How was it verified? | One minimal private request succeeded |
| What was sent to support? | Only project/error evidence, no credentials |

If creation still fails, hand the evidence pack to the owner of that door. If creation succeeds but requests fail, move to the request stage — don't re-report later problems as "creation failure".

## FAQ

### Why can my personal Google account create keys but the work account can't?

The two accounts usually traverse different identity and project boundaries. The work account may be governed by Workspace service access, project membership, IAM, service-account operations, or org policy. A personal-account success only proves another path works; it doesn't show which specific permission is missing, and it doesn't authorize a production workaround.

### What does `apikeys.keys.create` do?

It allows creating API key resources. The current AI Studio authorized-key flow also lists project reads, service enabling, service-account creation, and API-key binding, so this single permission may not complete the whole flow.

### Why might API Keys Admin still be insufficient?

API Keys Admin covers API-key operations, but the current flow may also enable services, create a service account, and complete the binding. Handing the 5 operations to the admin for verification is more accurate than guessing a broad role.

### Does clearing the browser cache fix permission denials?

A clean single-account session can fix or expose an account-selection problem, but it can't grant project IAM, turn on a Workspace service, or override org policy. Treat it as a diagnostic, not a permission fix.

### Can I just create the key in Google Cloud Console?

AI Studio is the documented create/manage entry for Gemini API keys, and existing Cloud projects can be imported. Cloud Console still handles IAM, key restrictions, service accounts, and organization controls. If your org requires a different credential flow, follow the approved route instead of using Console as a bypass.

### What if the key is created but requests return 403?

That's the request stage. Confirm the runtime reads the new key, the key belongs to the target project, restrictions allow Gemini API, the endpoint and auth method are correct, and the requested resource applies to your route.

### Should the admin create the key and send it to me?

Prefer granting an approved developer or service identity least-privilege and storing the key through the team's secret-management process. If the admin must create it, deliver it only through an approved secret channel — never in plaintext via email, chat, screenshots, or tickets.

### What info should I send if creation still fails?

Send the project ID, signed-in account, full error, time with timezone, attempted action, project visibility, and the clean-session result. Don't send keys, access tokens, cookies, or other credentials.

### Will standard Gemini API keys keep working?

Google currently says the Gemini API will start rejecting standard API keys in September 2026; new AI Studio keys use the service-account-backed authorized-key path. Migration dates and operations can change, so re-check the official docs near the milestone.

### Do I need this Google permission setup to use Gemini API via GPT88?

No. If you use the GPT88 unified gateway (https://gpt88.cc), you just get an `sk-gpt88-...` API key from the console and call the OpenAI-compatible or native Google interface — no Google Cloud project or IAM involved. This article's flow only applies when you create an official key yourself in Google AI Studio.
