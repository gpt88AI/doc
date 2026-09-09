---
title: Google AI Studio සහ Vertex AI: Developer API එකෙන් ආරම්භ කර Enterprise control අවශ්‍ය විට පමණක් migrate කරන්න
description: Gemini developers සඳහා route guide: AI Studio සහ Gemini Developer API තුළ රැඳෙන්නේ කවදාද, paid Developer API ගන්නේ කවදාද සහ enterprise control සඳහා migrate කරන්නේ කවදාද.
date: 2026-06-29
category: Gemini专题
tags: [Google AI Studio, Gemini API, Vertex AI, Gemini Enterprise, API Guide]
readTime: 13
relatedPath: /docs/overview/
relatedTitle: GPT88 Product Overview
---

බොහෝ Gemini apps සඳහා default route එක Google AI Studio සහ Gemini Developer API ය. Quota, billing, project ownership, paid models හෝ paid data usage මුලින් paid Developer API project එකකින් විසඳන්න. IAM, org policies, regional/data controls, reserved throughput, Model Garden, MLOps, private networking, security review, enterprise support හෝ compliance hard gate වුවහොත් Gemini Enterprise Agent Platform/Google Cloud route තෝරන්න. “AI Studio prototype, Vertex production” යනු ඉතා සරල framing එකකි; සැබෑ routes තුන Developer API, paid Developer API සහ enterprise platform ය.

## Routes තුන මුලින් තීරණය කරන්න

| බාධාව | පළමු route | හේතුව |
| --- | --- | --- |
| Prompt, model behavior, function calling, structured output හෝ prototype test | AI Studio + Developer API | ඉක්මන් build/test |
| Prototype ක්‍රියා කරයි; quota, billing, owner, collaborator හෝ paid model අවශ්‍යය | Paid Developer API project | වහාම enterprise migration අවශ්‍ය නැත |
| IAM, org policy, regional/data control, reserved throughput, MLOps, VPC, security හෝ compliance අනිවාර්යය | Enterprise Agent Platform | Platform governance අවශ්‍යය |

AI Studio key ලබා ගැනීම production readiness සඳහා සාක්ෂියක් නොවේ. Billing status, live limits, model availability, data policy, endpoint, logs, rollback සහ security approval වෙන වෙනම verify කරන්න.

## Surfaces වෙන් කර හඳුනාගන්න

| Name | සැබෑවටම කුමක්ද | භාවිතය | මෙය ලෙස නොසිතන්න |
| --- | --- | --- | --- |
| Google AI Studio | Browser experimentation, prompt debugging, key creation සහ project view | model පරීක්ෂා කිරීම සහ first request | සියලු production policies approved |
| Gemini Developer API | `ai.google.dev` direct route | බොහෝ apps, SDK, ordinary backend | automatic enterprise IAM/residency/MLOps |
| Paid Developer API | Paid project තුළ එම API එක | quota, billing, paid model, ownership | company compliance architecture |
| Vertex AI / enterprise platform | Cloud enterprise route | IAM, regional control, Model Garden, MLOps, support | සෑම production app එකකම default |
| Gemini Enterprise app | Enterprise user experience | company knowledge සහ internal workflow | Developer API synonym |

පැරණි tutorials enterprise side එක Vertex AI ලෙස හඳුන්වයි; සැබෑ control requirements අනුව තීරණය කරන්න.

## Developer API තුළ රැඳෙන්නේ කවදාද?

Prompt, structured output, function calling tests, small/medium backend, unified SDK, multimodal input, file processing, internal prototype සහ low-risk service Developer API තුළ ක්‍රියාත්මක කළ හැක. Quota, retry, billing, model availability සහ project owner වැනි ගැටලු එම route එක තුළ විසඳිය යුතුය.

## Paid Developer API කවදාද?

| පීඩනය | Paid API ප්‍රමාණවත් විය හැකි තැන | Enterprise අවශ්‍ය තැන |
| --- | --- | --- |
| Billing | Paid project සහ budget owner | Procurement, contract, committed capacity |
| Quota | Higher RPM/TPM/RPD/project tier | Reserved throughput සහ Cloud governance |
| Data usage | Paid terms review pass | Residency, retention, audit හෝ contract |
| Ownership | Project, collaborators, billing, key policy | IAM, service accounts, network, security review |
| Model access | අවශ්‍ය model Developer API මත ඇත | Model Garden, partner model හෝ MLOps |

“Going live” යන එකම හේතුවෙන් migrate නොකරන්න. Free, Paid සහ Enterprise static price table ලෙස නොව usage/control boundary ලෙස තේරුම් ගන්න.

## Enterprise migration trigger

Hard requirement පැහැදිලි විය යුතුය: IAM/org policy, regional endpoint architecture, data residency/retention/audit, reserved capacity, Model Garden/MLOps, VPC/private connectivity, centralized logs, enterprise support, compliance හෝ procurement। Regional endpoint එක පමණක් data residency guarantee නොවේ. Migration record එකේ control, owner doc, service/setting සහ review evidence ලියන්න.

## API keys සහ project ownership

සෑම key එකක්ම Google Cloud project එකකට බැඳී ඇත. Standard සහ authorization keys තිබිය හැක; නව AI Studio keys auth keys default කළ හැක. Google docs අනුව unrestricted standard keys 2026 ජූනි 19 පසු reject විය හැකි අතර 2026 සැප්තැම්බර්ට පෙර migrate කළ යුතුය. Frontend තුළ key තැබීම තවමත් ආරක්ෂිත නොවේ.

## Migration checklist

1. Current route ලියන්න: AI Studio, free Developer API, paid Developer API හෝ Cloud route.
2. Blockers ලියන්න: quota, billing, data use, region, IAM, support, throughput, MLOps, compliance.
3. Key, pricing, billing, limits, locations, residency සහ retention docs කියවන්න.
4. Paid API ප්‍රමාණවත්ද enterprise control අවශ්‍යද තීරණය කරන්න.
5. එම model, request, latency, retry සහ logging සමඟ කුඩා pilot එකක් කරන්න.
6. Cost, quota, data සහ support owners තීරණය කරන්න.
7. Rollback සඳහා පැරණි route callable තබන්න.

## FAQ

බොහෝ production apps Developer API එකෙන් ආරම්භ කළ හැක. AI Studio prototype පමණක් නොවේ; එය experimentation surface එකකි, API route වෙනමය. Gemini සඳහා Vertex AI අනිවාර්ය නොවේ. Usage, billing, project ownership හෝ paid model blocker නම් paid Developer API මුලින් evaluate කරන්න. Regional endpoint data residency නොවේ. Developer සහ enterprise routes දෙකම තබා staged migration කළ හැක.

## Further Reading

- [GPT88 Product Overview](/docs/overview/)
