---
title: ComfyUI میں GPT Image 2: Official Partner Node Setup اور Troubleshooting
description: ComfyUI میں official OpenAI Partner Node سے GPT Image 2 چلانے، account eligibility چیک کرنے اور custom nodes کا audit کرنے کا طریقہ۔
date: 2026-05-06
category: تکنیکی ٹیوٹوریل
tags: [GPT Image 2, ComfyUI, OpenAI API, Partner Nodes, AI Image Workflow]
readTime: 12
relatedPath: /docs/guides/agent-image-studio/
relatedTitle: Agent Image Studio
---

ComfyUI canvas میں GPT Image 2 official OpenAI Partner Node کے ذریعے استعمال ہو سکتا ہے، مگر یہ local GPU پر ڈاؤن لوڈ شدہ checkpoint نہیں ہے۔ ComfyUI graph اور post-processing سنبھالتا ہے؛ generation اور editing remote OpenAI API call رہتی ہے۔ Graph کے اندر image workflow کے لیے Partner Node، app یا script کے لیے Image API، اور assistant/agent کے multi-step flow کے لیے Responses API منتخب کریں۔

## پہلے Official Route چلائیں

ComfyUI یا Comfy Cloud کو update کریں، OpenAI GPT Image node تلاش کریں، model کو `gpt-image-2` رکھیں، API key، organization verification، billing اور account status چیک کریں، پھر ایک سادہ text-to-image request چلائیں۔ پہلے masks، reference images، batch jobs، upscaling یا غیر audited custom nodes شامل نہ کریں۔

## Layers کے مطابق Debug

ComfyUI layer میں version، template، node import اور workflow دیکھیں۔ OpenAI route میں key، organization، billing، model access اور network دیکھیں۔ Custom provider میں endpoint، key storage، data path، limits اور maintenance دیکھیں۔ Missing node عموماً version/import مسئلہ ہے؛ auth error account مسئلہ ہے؛ 4K یا background failure parameter-support boundary ہو سکتی ہے۔

## Account اور Minimal Test

پہلے دیکھیں node key پڑھ رہا ہے، organization eligible ہے، billing/usage اجازت دیتی ہے، network API تک پہنچتا ہے، اور node مطلوبہ size/background/edit options دیتا ہے۔ ComfyUI سے باہر اسی account کے ساتھ ایک direct Image API request چلائیں۔ Direct بھی fail ہو تو account درست کریں؛ direct کامیاب ہو تو Partner Node، template، environment اور wiring دیکھیں۔ پہلے سادہ text-to-image، پھر ایک input image کے ساتھ چھوٹا edit کریں، output path اور workflow reopen کر کے reproducibility چیک کریں۔

## Custom Node Audit

Third-party node کو official نہ سمجھیں۔ Maintainer، license، commit history، endpoint، `base_url`، model mapping، key location، logs، retry boundary، data terms، limits اور support چیک کریں۔ Key کو workflow JSON، URL، console یا shared graph میں نہیں ہونا چاہیے۔ اگر provider route واضح نہ ہو تو real material نہ بھیجیں۔

## عام Failures

Node نہ ملے تو version، template، cache اور startup logs دیکھیں۔ `gpt-image-2` option نہ ہو تو node update اور restart کریں۔ Auth error میں key، organization، billing، eligibility اور network چیک کریں۔ Text-to-image کامیاب مگر edit fail ہو تو چھوٹی image، سادہ mask اور کم nodes کے ساتھ آزمائیں۔ 4K یا transparent background failure میں API docs اور saved pixels verify کریں۔

GPT Image 2 official route میں local ComfyUI checkpoint نہیں؛ ComfyUI orchestration کرتا ہے اور model remote OpenAI route پر چلتا ہے۔ Graph چاہیے تو ComfyUI، app/script کے لیے Image API، اور multi-step assistant کے لیے Responses API استعمال کریں۔

## Further Reading

- [Agent Image Studio](/docs/guides/agent-image-studio/)
- [GPT Image 2 4K Generation](/docs/blog/gpt-image-2-4k-image-generation/)
