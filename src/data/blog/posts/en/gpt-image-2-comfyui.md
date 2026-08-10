---
title: Using GPT Image 2 in ComfyUI: Official Partner Node Setup and Custom Node Troubleshooting
description: A complete flow for connecting GPT Image 2 through ComfyUI's official OpenAI Partner Node — confirm the API key, organization verification, and account status first, then run a minimal text-to-image and editing test, and only then audit third-party custom nodes for endpoints, keys, and maintenance boundaries.
date: 2026-05-06
category: 技术教程
tags: [GPT Image 2, ComfyUI, OpenAI API, Partner Nodes, AI Image Workflow]
readTime: 12
relatedPath: /docs/guides/agent-image-studio/
relatedTitle: Agent Image Studio
---

GPT Image 2 can enter the ComfyUI canvas through the official OpenAI Partner Node, but it is still a remote OpenAI image API call, not a checkpoint downloaded to your local GPU. What you really need to separate is the route: when the generation step must stay inside the ComfyUI graph, start with the Partner Node; when you only need to generate an image in an app or script, call the OpenAI Image API directly; when image generation is one step in an assistant, multi-tool, or agent flow, put the Responses API in application code; and when you see a custom node from GitHub or a third party, audit its endpoint, key handling, and maintenance boundary first.

| What you need to do | Route to start with | Checkpoint to stop at |
| --- | --- | --- |
| Call GPT Image 2 inside a ComfyUI graph | Official OpenAI Partner Node | Node visible, `gpt-image-2` selectable, one request succeeds on your account |
| Generate or edit one image in a backend or script | OpenAI Image API | Save the returned file and confirm size, format, and error logs |
| Need an image tool inside a multi-step assistant | Responses API | Confirm tool calls, context, returned files, and user instructions are traceable |
| Need a third-party provider or GitHub node | Audit first, then test narrowly | Endpoint, key storage, data path, limits, maintainer, and failure info are all explainable |

Don't pile up complex workflows, batch jobs, upscaling, masks, reference images, and third-party nodes from the start. The minimal validation order is: update ComfyUI or enter Comfy Cloud, find the OpenAI GPT Image node, set the model to `gpt-image-2`, confirm the OpenAI API key, organization verification, and account status, and then run only one text-to-image or one simple edit. If the official node is missing, the account isn't eligible, or a custom node requires a service key you can't audit, stop and fix the route before adding more image nodes.

## What the Official ComfyUI Route Actually Means

The official ComfyUI documentation puts GPT-Image-2 on the OpenAI Partner Node route. That phrasing matters: a Partner Node lets a ComfyUI workflow call an external model service from the graph, but it does not turn GPT Image 2 into a local model file. ComfyUI owns the canvas, node connections, inputs/outputs, and post-processing; OpenAI owns model execution, account eligibility, policy limits, billing, and the remote request.

In practice, split it into three layers. Layer one is the ComfyUI environment: version, Cloud/Desktop timing, node library, template imports, and workflow JSON. Layer two is the OpenAI API route: key, organization verification, billing status, model availability, network, and supported options. Layer three is the custom node or provider: who maintains it, where requests go, how keys are stored, whether the model label is real, and whether data passes through extra services. Only after you know which layer failed will troubleshooting stop being an endless prompt shuffle.

| Layer | Who owns it | Check first |
| --- | --- | --- |
| ComfyUI graph and nodes | Local environment or Comfy Cloud | Version, node imports, template loading, connected inputs/outputs |
| OpenAI model call | OpenAI API account | API key, org verification, billing status, permissions, network, supported parameters |
| Custom node route | Node maintainer or third-party provider | Endpoint, key handling, data terms, limits, support, failure info |

If the OpenAI GPT Image node doesn't show up in the node library, the problem is usually the ComfyUI version, Cloud/Desktop release cadence, or node import. If the node exists but requests fail with auth or permission errors, look at the OpenAI account first. If a third-party node works while the official one fails, that doesn't prove the official route is broken; it only means another provider route is available and the contract has changed.

## Get the Official Partner Node Working First

The most stable setup order is to clear the workflow and keep only the required nodes. Update ComfyUI to the current version, or open the official template directly in Comfy Cloud; then find the OpenAI GPT Image node in the node library and set the model field to `gpt-image-2`. If the docs say it's available but your environment doesn't show it, don't install random plugins — check version, templates, node cache, Cloud/Desktop differences, and startup logs first.

The setup steps can stay short: update the environment, confirm the Partner Node is available, add the OpenAI GPT Image node, set `gpt-image-2`, write a low-risk prompt, save the output, and reopen the workflow to confirm it still reproduces. This order looks conservative, but it prevents errors from being hidden behind multiple reference images, masks, upscaling, batch queues, or post-processing nodes.

| Step | Goal | What not to do on failure |
| --- | --- | --- |
| Update ComfyUI or use Comfy Cloud | Keep official nodes and templates in the same generation | Don't judge node existence from an old-version screenshot |
| Add the OpenAI GPT Image node | Confirm the official route is visible | Don't install unaudited plugins first |
| Set `gpt-image-2` | Confirm you're calling the target model | Don't mix old GPT Image nodes and the new model into one guess |
| Run one text-to-image | Validate the shortest remote call | Don't immediately add a complex graph |
| Save and reopen the workflow | Verify reproducibility | Don't judge from a single preview |

Editing should be the second test, not the first. The official ComfyUI documentation gives a GPT-Image-2 editing workflow and states the editing path can handle up to 2K. That's enough to run a real editing test, but it doesn't mean the ComfyUI node exposes all API-level size, background, or format controls. If you need an exact 4K size, use a dedicated high-resolution image guide and verify pixels with API requests and saved files.

## Prove the Account Works Before Debugging Images

GPT Image 2 in ComfyUI still depends on the OpenAI API account. The OpenAI image docs split the Image API, the edit endpoint, and the Responses API image tool into different routes, and also warn that GPT Image models may require organization verification. In other words, even if the ComfyUI graph has no wiring errors, account or organization state can still fail the request.

Check five base conditions first: whether the API key exists and is readable by the node, whether the organization is eligible to call GPT Image models, whether billing or usage state allows image requests, whether local network or a proxy can reach the remote API, and whether the parameters the node exposes actually support the size, background, or editing behavior you want. Don't compress all of these into "the node is broken."

| Check | Why it matters | Common failure meaning |
| --- | --- | --- |
| API key | Partner Node needs a remote OpenAI route | key missing, expired, wrong permissions, or not read by the node |
| Organization verification | GPT Image models may require a prepared org | can authenticate but not call the target model |
| Billing and usage | Image generation is an account-level API operation | quota, billing, policy, or account state blocks it |
| Network access | Generation doesn't run locally | firewall, proxy, container, or desktop network blocks it |
| Parameter support | Nodes don't always expose every API option | the requested size, background, or edit behavior is not in the node's capability |

The fastest isolation is to run one direct OpenAI image request outside ComfyUI with the same account. If the direct API also fails, fix the account first; if the direct API succeeds but ComfyUI fails, then check the Partner Node, template, model field, environment variables, and workflow wiring. Don't frame this as a free-quota problem; whether the official API has a free tier, or whether free/unlimited routes are reliable, belongs in a separate topic.

## Run One Minimal Text-to-Image and One Minimal Edit

Make the first text-to-image deliberately simple. The prompt only needs to describe a visible, low-risk, easy-to-judge result — for example, "a clean technical flow board with three labeled blocks: ComfyUI graph, OpenAI remote API, saved output." Don't use dense text, brand logos, complex masks, multiple reference images, or batch queues for the first validation round. You are validating the route, not the final artwork quality.

After the first success, check three things: whether the node actually called `gpt-image-2`, whether the output saved to the expected path, and whether reopening the workflow still reproduces. Only when these three are stable should you add reference images, masks, upscaling, local retouching, or post-processing. If the save path isn't stable, even a complex image later will put delivery at risk.

Keep the edit test small too. Use a single input image and request one clear, small change — for example, changing the background color, adding one simple object, or replacing part of the material. The goal is to verify that the input image path, edit node, output path, and account permissions work together. If a simple edit fails, a complex one won't add truth; it will only add noise.

This step also exposes the local-vs-remote boundary. A ComfyUI graph can have local nodes and can prepare inputs or do post-processing around the OpenAI Partner Node; but GPT Image 2 generation or editing itself is still a remote model call. Projects with privacy, latency, retry, cost-tracking, or failure-recovery requirements must write this boundary into their workflow decision.

## Choose ComfyUI, Image API, or Responses API by Task

The official Partner Node's use case is clear: the generation step must stay inside the ComfyUI graph. For example, reference image preparation, masks, local editing, composite images, multi-step visual systems, upscaling, style consistency, or teams that need to collaborate in the same node canvas. In these cases, keeping GPT Image 2 in the graph reduces the friction of manual import/export.

The direct Image API suits apps and scripts. A web tool generating a product image, an internal script batch-testing prompts, or a backend editing a piece of material — these tasks usually need logging, retries, cost control, file saving, and error classification. When there's no graph-orchestration value, adding ComfyUI is just another dependency.

The Responses API suits larger assistant flows: the app first understands the user brief, then generates the image, then explains the changes, records context, or calls other tools. It's application logic, not a node canvas. If the team needs visual node operations, stay in ComfyUI; if it needs conversation, tool chains, and state management, put it in application code.

| Route | Best for | Avoid for |
| --- | --- | --- |
| ComfyUI official OpenAI Partner Node | workflows with nodes before and after, operators need a visual canvas | generating a single backend image |
| OpenAI Image API | direct generation or editing in apps, services, scripts | results that must continue into ComfyUI nodes |
| Responses API image tool | multi-step assistants, agents, and tool chains | human operators who need a node graph |
| Third-party custom node | a specific provider or team routing that's clearly required | endpoints, keys, data, and maintenance boundaries that can't be explained |

## Audit Before Installing Custom Nodes

A custom node isn't necessarily a problem, but it isn't the official default route either. As long as the node forwards requests through a third-party provider, gateway, or its own endpoint, the calling contract differs from the OpenAI Partner Node. Who bills, who stores requests, who handles failures, who updates model mappings, and who provides support all need to be re-evaluated.

When auditing, don't look only at screenshots or demo videos. First look at the repo maintainer, license, commit history, issue status, and install instructions. Then look at the code for endpoint, base_url, model fields, key read locations, and log output. Finally check whether error handling preserves upstream status codes, request reasons, and retry boundaries. A plugin that writes every failure as "node broken" is not suitable as a production route.

| Audit question | Signal to continue | Signal to stop |
| --- | --- | --- |
| Who is the maintainer | maintainer, license, release history, and issues visible | anonymous, unmaintained for a long time, only a sales page |
| Where do requests go | endpoint and provider disclosed | routing hidden or bypassing an unknown service |
| How are keys stored | key in the expected config location, not in workflow JSON or logs | key appears in examples, URLs, the console, or shared graphs |
| Is the model real | `gpt-image-2` mapping is testable | UI says GPT Image 2 but the actual model can't be verified |
| How do failures surface | keeps auth, limit, parameter, network reasons | only generic errors |
| Limits and data terms | usage, retention, rights, and support documented | only promises of convenience, free, or unlimited |

Only bring custom nodes into testing when the official route can't solve a clearly defined need — for example, the team must use a signed provider, must reuse a corporate gateway, or must connect an existing ComfyUI pipeline to a specific account. Even then, validate with one low-risk test image first; don't hand real material to an unknown route.

## Classify Common Failures by Layer First

Most failures fit into a few buckets. A missing node is an environment problem; a missing model field is a version or template problem; an auth error is an account problem; an edit failure may be an input-image, mask, or edit-route problem; a 4K or transparent-background failure is usually a parameter-support boundary; and a custom node anomaly requires looking at the third-party route. Classify first, then act.

| Symptom | Most likely layer | First action |
| --- | --- | --- |
| Can't find the OpenAI GPT Image node | ComfyUI version, Cloud/Desktop timing, or node import | update, reload templates, check official docs and startup logs |
| Node exists but no `gpt-image-2` | node version or model list | update the node, restart, confirm the official template |
| Auth or permission errors | OpenAI account route | check key, org verification, billing, model eligibility, network |
| Text-to-image works but edit fails | input image or edit workflow | use a smaller image, simplify the mask, remove downstream nodes |
| Custom node works but official node fails | routes differ | judge provider success and OpenAI account success separately |
| 4K or transparent background fails | parameter support boundary | verify with API docs and a 4K topic; don't assume node support |
| Output slow or unstable | remote call, account state, or graph complexity | compare direct API, single-node workflow, and complex graphs |

Don't blame model quality for every failure. The ComfyUI graph can fail, the account can fail, the network can fail, and a third-party route can fail. Reproducible fixes come from layered logging: which node, which request, which account, which parameter, which returned status. Without that information, swapping nodes just trades one unknown error for another.

## Adjacent Problems Belong to Adjacent Routes

Separate "getting GPT Image 2 into ComfyUI" from other questions, and readers will make faster decisions. Exact 4K output, the `size` parameter, file saving, and pixel verification belong in a high-resolution image topic. A ComfyUI node may call GPT Image 2, but it isn't the best entry point for every API size-control problem.

Whether the official API is free, and whether various free, unlimited, browser tools, wrapper sites, or no-login wrappers are reliable, belongs in the [GPT Image 2 Free and Unlimited Routes Audit](/docs/blog/gpt-image-2-free-unlimited/). These questions shouldn't be mixed into a ComfyUI setup flow, or the first screen loses operational focus.

If your goal is to move off Nano Banana Pro, see [ComfyUI Nano Banana Pro Alternative](/docs/blog/comfyui-nano-banana-pro-alternative/). Choosing replacement models, open-source/hosted/API routes, costs, and deployment constraints is a different task from setting up the GPT Image 2 official Partner Node.

The whole operation can be summarized in one sentence: if GPT Image 2 must stay inside the ComfyUI graph, start with the official OpenAI Partner Node, validate the account and a minimal workflow first, and only then decide whether to switch to the direct API or audit a custom node.

## FAQ

### Is GPT Image 2 officially usable in ComfyUI?

Yes. The official ComfyUI documentation and announcements put GPT Image 2 on the OpenAI Partner Node route. When you need to call GPT Image 2 inside a node canvas, prefer this official route and confirm version, template, and model fields against the current docs.

### Is GPT Image 2 a local ComfyUI model?

No. In the official ComfyUI route, ComfyUI handles workflow orchestration while GPT Image 2 generation and editing run through OpenAI's remote model route. It is not a local checkpoint and should not be treated as offline GPU inference.

### Which ComfyUI node should I use?

Use the official OpenAI GPT Image Partner Node first, and set the model field to `gpt-image-2`. If the node or model option is missing, update ComfyUI, restart, and check official templates and logs before considering a custom node.

### Do I definitely need an OpenAI API key?

The official Partner Node route should be prepared like OpenAI API access: API key, organization verification, billing or account state, network access, and model eligibility all need to be confirmed first. If the account route fails, editing the ComfyUI graph usually won't fix it.

### Can I generate 4K directly in ComfyUI?

Don't assume the ComfyUI node exposes every API-level output option. If you need an exact 4K size, use a dedicated high-resolution image topic and verify with the API `size`, file saving, and pixel reads.

### Are GPT Image 2 custom nodes safe?

Safety depends on the node and the route. Before installing, check the maintainer, endpoint, key handling, model mapping, data terms, limits, support, and error messages. If those boundaries can't be explained, don't hand real material to a custom node.

### How do I choose between ComfyUI and the direct OpenAI API?

Choose ComfyUI when the image step must go into a node canvas. Choose the Image API when you only need to generate an image in an app or script. Choose the Responses API when image generation is part of a multi-step assistant, agent, or tool chain. The deciding factor is workflow ownership, not which entry point looks easier.
