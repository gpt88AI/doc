---
title: Using GPT Image 2 in OpenClaw: API Key vs Codex OAuth
description: Configure openai/gpt-image-2 in OpenClaw by first choosing between an API key and Codex OAuth based on billing, logs, and org ownership, then verify the provider route and debug 403, fallback takeover, and transparent background issues.
date: 2026-05-06
category: 技术教程
tags: [GPT Image 2, OpenClaw, OpenAI Codex OAuth, OpenAI API, 图像生成]
readTime: 10
relatedPath: /docs/guides/gpt-image-2-service-notice/
relatedTitle: GPT Image 2 Service Notes
---

In OpenClaw, the image model value should be written as `openai/gpt-image-2`. The real choice is not which model name to use, but which authentication route: when production, billing ownership, org control, and traceable logs matter, use `OPENAI_API_KEY`; consider Codex OAuth only when you want to verify capability in a personal OpenClaw environment where Codex is already signed in.

Do not treat your first successful image as a conclusion. OpenClaw may have a fallback provider, and an OAuth profile may point to the wrong account or an expired profile. The minimal acceptance step is: explicitly specify `openai/gpt-image-2`, disable or mark the fallback, inspect the provider output or logs, and confirm that the auth route, model name, and returned result all agree.

| Route | When it fits | How to accept | Signal to switch |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | Need production billing, org control, audit logs, and team support accountability | Logs show the OpenAI provider with `openai/gpt-image-2` | Cost strategy, quota, or org policy requires a change |
| Codex OAuth | Already use a Codex profile in OpenClaw and want to avoid a separate API key for personal verification | Current profile, account, workspace, provider output, and no-fallback tests all line up | HTTP 403, expired profile, unknown workspace, or logs not showing the OpenAI route |
| Fallback provider | As a backup image route after failures, not as evidence for verifying GPT Image 2 | Output is explicitly marked as a non-OpenAI route | You are debugging the OpenAI route itself |

If Codex OAuth returns HTTP 403, stop and do not keep changing the prompt. Check the OpenClaw version, the OAuth token, the current account, the workspace, provider output, and fallback config; when a production task is already waiting, switching to `OPENAI_API_KEY` usually makes the responsibility boundary easier to identify. If you need a transparent background, the current `gpt-image-2` is not the right tool — switch to a route that supports transparent output or post-processing.

## Configuring `openai/gpt-image-2`

The OpenAI model ID is `gpt-image-2`, and the OpenClaw provider form is `openai/gpt-image-2`. The `openai/` prefix is not decorative: it tells OpenClaw that this image request should go to the OpenAI provider, not to the text model, the Codex text route, or a backup image provider.

Start with a minimal default config. Do not change provider, model, fallback, and prompt all at once in the same edit. The smaller the config, the easier it is to tell later whether a failure belongs to auth, model reference, tool capability, or output parameters.

```json
{
  "agents": {
    "defaults": {
      "imageGenerationModel": {
        "primary": "openai/gpt-image-2"
      }
    }
  }
}
```

The API key route requires setting `OPENAI_API_KEY` in the environment OpenClaw runs in. The value of this route is not that it "looks more advanced," but that the account, billing, quota, project, org, and logs can all be checked on the OpenAI Platform side. When accessing through the GPT88 unified gateway, use an `sk-gpt88-...` key obtained from the gpt88.cc console and point the base URL at `https://gpt88.cc/v1`; the model reference stays unchanged:

```bash
export OPENAI_API_KEY="sk-gpt88-..."
export OPENAI_BASE_URL="https://gpt88.cc/v1"
```

For the Codex OAuth route, do not fake an API key. It should connect the current OpenAI/Codex account through OpenClaw's OAuth profile, then still use the same `openai/gpt-image-2` model reference. The risk here is that profile state is more hidden: an expired token, an account switch, an inconsistent workspace, or a mismatched OpenClaw version can all show up as image call failures.

| Question to answer | API Key route | Codex OAuth route |
| --- | --- | --- |
| Who owns the request | The OpenAI org or project bound to `OPENAI_API_KEY` | The OpenAI/Codex account behind OpenClaw's current OAuth profile |
| Where to check quota and billing | OpenAI Platform project, org, and billing pages | The OpenClaw profile plus the underlying account/workspace state |
| What counts as route evidence | Provider output or logs showing OpenAI with `openai/gpt-image-2` | Provider output showing OAuth-backed OpenAI with no fallback |

## Verify the route before trusting the image

First list or inspect the image provider. OpenClaw's image generation capability is provider-aware, so do not just check whether a final file was produced — check which provider handled the generation.

```bash
image_generate action=list
```

Then run a very small explicit model test. Keep the test prompt simple, avoiding variables such as text rendering, transparent backgrounds, complex editing, and very large sizes that would interfere with the diagnosis.

```bash
image_generate model=openai/gpt-image-2 prompt="A simple product icon on a white desk, no text"
```

Read the logs from an operational standpoint: success but a non-OpenAI provider means the fallback generated the image; a 403 on the OAuth route means check profile, account, workspace, and token first; an unsupported model means re-check the provider prefix, OpenClaw version, or model access; a transparent background failure means the parameter is unsupported, so stop changing the prompt.

| Result | Meaning | Next step |
| --- | --- | --- |
| Image succeeds and logs show `openai/gpt-image-2` | Target route works | Save the config, then restore a marked fallback as needed |
| Image succeeds but provider is not OpenAI | Fallback took over | Mark it as non-OpenAI output and isolate the OpenAI route |
| Codex OAuth returns 403 | OAuth profile or account route is blocked | Re-authenticate, verify workspace, upgrade OpenClaw, switch to an API key if needed |
| Model unsupported or not found | Current provider does not expose that model | Check provider prefix, OpenClaw docs version, and model access |
| Transparent background fails | Request used an unsupported option | Drop transparency or use another model/post-processing |

## Prefer the API key for production tasks

`OPENAI_API_KEY` fits scenarios with customers, batch jobs, retrospective records, or team responsibility boundaries. On failure, you can line up the OpenClaw logs and the OpenAI API response together; on success, you can write cost, quota, and account ownership into the delivery record.

An API key does not automatically mean cheaper, nor does it mean every account is ready. It means a clearer control plane: who pays, who reads logs, who has permission, and who can explain a failure. Once an image task goes to production, these questions matter more than saving one key.

| Production requirement | Why the API key is clearer |
| --- | --- |
| Billing ownership | Usage returns to an OpenAI API project or org |
| Support and debugging | API responses, OpenClaw logs, and retry records align more easily |
| Batch generation | Quota, cost, and retry policy have a stable owner |
| Multi-person collaboration | Central API control is easier to audit than per-person OAuth profiles |
| Compliance records | Account, data, and provider boundaries are easier to write down |

Cost questions belong on a dedicated cost page, not crammed into the OpenClaw route config. When you need to compare cheaper API routes, look at GPT Image 2 cost and quota materials; here the job is only to prove whether OpenClaw used the route you intended.

## Use Codex OAuth only when the profile evidence is sufficient

Codex OAuth is attractive because it is lightweight: users already signed into Codex in OpenClaw may not want to maintain a separate API key. For personal verification, low-risk experiments, and temporary flows, this route is convenient.

But OAuth is not an official free API key, nor a guarantee that every account supports the image route. It is a login profile. Which account sits behind the profile, which workspace it maps to, whether the token refreshes, and whether OpenClaw wires the image route to this profile all need verification.

| Check | What to see |
| --- | --- |
| Current profile | OpenClaw points at the expected OpenAI/Codex account |
| Token state | OAuth storage and refresh work, old credentials are cleaned up |
| Workspace/account | Image requests are not landing in another workspace |
| Provider output | Requests resolve to OpenAI with `openai/gpt-image-2` |
| No-fallback test | The backup provider cannot mask an OAuth failure |

Treat HTTP 403 as an auth and route problem. Re-authenticate first, clear the old profile, confirm the OpenClaw version, verify model access, then retry with fallback disabled. If the same 403 persists and you need stable delivery, switching to `OPENAI_API_KEY` is the more pragmatic move.

## Handling 403, fallback, and unsupported parameters

Most failures fall into four buckets: auth, provider selection, unsupported parameters, and environment not ready. Do not change many settings at once, or the next success will not prove which step actually fixed the problem.

| Symptom | First branch | Primary check | Better action |
| --- | --- | --- | --- |
| Codex OAuth 403 | Auth/profile | Account, workspace, token, OpenClaw version | Re-authenticate and retry without fallback |
| Image produced but not OpenAI | Provider selection | Fallback note and provider output | Disable fallback, force `model=openai/gpt-image-2` |
| `image_generate` not found | Tool/environment | Whether an image provider is configured | Complete the provider setup first |
| `openai/gpt-image-2` not accepted | Model reference | Provider prefix and docs version | Re-check the model name and access state |
| Transparent background fails | Unsupported parameter | The background option in the request | Drop the transparency requirement or change the workflow |
| Slow or unstable output | Route/capacity | Quota, fallback, size, and quality | Prove the route first, then judge retries |

Stop hard on transparent backgrounds. The current `gpt-image-2` does not support transparent background output, and adjusting the prompt further is pointless. When you need transparent assets, generate the image on a working route first, then use a model or post-processing flow that supports transparency.

Also keep 4K separate from route verification. OpenClaw route verification answers "who generated the image," while high-resolution verification answers "whether the returned file meets the target dimensions." Size, saved pixel dimensions, and high-resolution parameters belong in the GPT Image 2 4K image-generation materials.

## Route acceptance record

Route acceptance must split "can generate an image" from "generated by OpenAI GPT Image 2" into two conclusions. The first only means some provider returned an image; the second requires seeing the model reference, provider name, auth owner, and fallback state together.

The Chinese developer community often shortens Codex OAuth to "no API key," but published text should not draw that conclusion. More precisely: OAuth can be one auth route, and whether it can run the image route depends on the OpenClaw version, account state, workspace, and provider implementation.

If someone on the team only saved the image file without logs or provider output, that result cannot enter the acceptance record. When re-testing, use a small prompt, disable fallback, and keep the request time and profile name, so a visual-quality review is not mistaken for route proof.

The API key route also needs acceptance. Setting an environment variable does not mean OpenClaw will use it; if OpenClaw's default model or provider config still points elsewhere, image requests may never reach the OpenAI provider.

The Codex OAuth troubleshooting order should be fixed: confirm the current profile first, then the account and workspace, then token refresh, and finally whether the OpenClaw image provider wires `openai/gpt-image-2` to that OAuth route.

## Production checklist

Before handing off to a colleague or an automated flow, write the route contract clearly. The contract must include at least the model reference, auth owner, provider evidence, fallback strategy, failure branch, and switch condition.

| Item | API Key route | Codex OAuth route |
| --- | --- | --- |
| Model reference | `openai/gpt-image-2` | `openai/gpt-image-2` |
| Auth owner | The OpenAI project/org behind `OPENAI_API_KEY` | An OpenAI Codex OAuth profile |
| Route proof | Provider output or logs showing OpenAI | Provider output showing OAuth-backed OpenAI |
| Fallback strategy | Disabled for verification, explicitly marked in production | Disabled for verification, explicitly marked in production |
| Failure branch | OpenAI API response + OpenClaw logs | OAuth profile/account + OpenClaw logs |
| Switch condition | Cost, quota, org policy, or provider policy | 403, unstable profile, unclear workspace, or audit needs |

Keep a small smoke test. It does not chase quality; it only verifies route health: no text, no transparent background, no oversized output, no complex editing. Once the smoke test passes, run real image prompts with the same model reference and log settings.

## FAQ

### What model name should I write in OpenClaw?

Write `openai/gpt-image-2`. The OpenAI model ID is `gpt-image-2`, and OpenClaw needs the provider prefix to route to the OpenAI image provider.

### Does Codex OAuth mean GPT Image 2 API is free?

No. Codex OAuth is an auth route, not an official free API entitlement. Free-tier boundaries follow OpenAI's official materials; do not infer free quota from the auth method.

### Which should I choose, API Key or Codex OAuth?

For production tasks, prefer `OPENAI_API_KEY` because billing, logs, org control, and support accountability are clearer. Codex OAuth suits individuals or lightweight testing where the profile is already verified.

### Why does Codex OAuth return HTTP 403?

Treat 403 as an auth/profile branch: check the OpenClaw version, OAuth token, current account, workspace, model access, and fallback config. Switch to an API key if it keeps failing.

### How do I confirm the image was not generated by a fallback?

Disable fallback, explicitly set `model=openai/gpt-image-2`, and inspect the provider output or logs. If the logs show another provider, the image cannot count as an OpenAI route success.

### Can GPT Image 2 generate transparent backgrounds directly?

Do not rely on `gpt-image-2` for transparent backgrounds right now. When you need transparent assets, generate the subject first, then use a model or post-processing step that supports transparency.

### Can OpenClaw do 4K GPT Image 2 output?

First prove OpenClaw is using `openai/gpt-image-2`, then verify the size parameters and saved pixel dimensions. Parameter and file verification for 4K belongs to a dedicated high-resolution flow.
