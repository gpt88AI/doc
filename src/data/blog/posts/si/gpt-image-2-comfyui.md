---
title: ComfyUI තුළ GPT Image 2: Official Partner Node Setup සහ Troubleshooting
description: ComfyUI තුළ official OpenAI Partner Node මඟින් GPT Image 2 භාවිත කිරීම, account eligibility පරීක්ෂා කිරීම සහ custom nodes audit කිරීම.
date: 2026-05-06
category: තාක්ෂණික නිබන්ධනය
tags: [GPT Image 2, ComfyUI, OpenAI API, Partner Nodes, AI Image Workflow]
readTime: 12
relatedPath: /docs/guides/agent-image-studio/
relatedTitle: Agent Image Studio
---

ComfyUI canvas තුළ GPT Image 2 official OpenAI Partner Node හරහා භාවිත කළ හැක, නමුත් එය local GPU එකට බාගත කළ checkpoint එකක් නොවේ. ComfyUI graph සහ post-processing පාලනය කරයි; generation සහ editing remote OpenAI API call වේ. Graph workflow සඳහා Partner Node, app/script සඳහා Image API, සහ multi-step assistant සඳහා Responses API තෝරන්න.

## Official Route පළමුව

ComfyUI හෝ Comfy Cloud update කර OpenAI GPT Image node සොයන්න, model එක `gpt-image-2` ලෙස තබන්න, API key, organization verification, billing සහ account status පරීක්ෂා කර සරල text-to-image request එකක් පමණක් ධාවනය කරන්න. මුලින් masks, reference images, batch, upscale හෝ audit නොකළ custom nodes එක් නොකරන්න.

## Layer අනුව Debug කරන්න

ComfyUI layer එකේ version, template, node import සහ workflow බලන්න. OpenAI route එකේ key, organization, billing, model access සහ network බලන්න. Custom provider එකේ endpoint, key storage, data path, limits සහ maintenance බලන්න. Node නොපෙනේ නම් version/import ගැටලුවක් විය හැක; auth error account ගැටලුවකි; 4K හෝ background failure parameter-support සීමාවක් විය හැක.

## Account සහ Minimal Test

Node එක key කියවනවාද, organization eligible ද, billing/usage අවසර දෙන්නේද, network API වෙත ළඟා වන්නේද, සහ node එකට අවශ්‍ය size/background/edit options තිබේද පරීක්ෂා කරන්න. ComfyUI පිටත එම account එකෙන් direct Image API request එකක් ධාවනය කරන්න. Direct එකත් fail නම් account එක සකසන්න; direct සාර්ථක නම් Partner Node, template, environment සහ wiring බලන්න. පළමුව සරල text-to-image එකක්, පසුව එක input image එකක කුඩා edit එකක් පරීක්ෂා කර output path සහ workflow reopen reproducibility තහවුරු කරන්න.

## Custom Node Audit

Third-party node එක official ලෙස නොසලකන්න. Maintainer, license, endpoint, `base_url`, model mapping, key location, logs, retry boundary, data terms, limits සහ support පරීක්ෂා කරන්න. Key එක workflow JSON, URL, console හෝ shared graph එකක නොතිබිය යුතුය. Route එක පැහැදිලිව විස්තර කළ නොහැකි නම් real material යවන්න එපා.

## Common Failures

Node නොපෙනේ නම් version, template, cache සහ startup logs බලන්න. `gpt-image-2` option නැත්නම් update සහ restart කරන්න. Auth error එකේ key, organization, billing, eligibility සහ network පරීක්ෂා කරන්න. Text-to-image සාර්ථක නමුත් edit fail නම් කුඩා image, සරල mask සහ අඩු nodes භාවිත කරන්න. 4K/background failure එකේ API docs සහ saved pixels verify කරන්න.

GPT Image 2 official route local ComfyUI checkpoint එකක් නොවේ; ComfyUI orchestration කරන අතර model එක remote OpenAI route එකේ ධාවනය වේ. Graph එකක් අවශ්‍ය නම් ComfyUI, app/script සඳහා Image API, සහ multi-step assistant සඳහා Responses API භාවිත කරන්න.

## Further Reading

- [Agent Image Studio](/docs/guides/agent-image-studio/)
- [GPT Image 2 4K Generation](/docs/blog/gpt-image-2-4k-image-generation/)
