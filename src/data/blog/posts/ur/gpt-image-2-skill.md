---
title: GPT Image 2 Skill: پہلے code audit کریں، پھر install یا official API منتخب کریں
description: GPT Image 2 Skill ایک third-party image-generation skill اور CLI ہے۔ Install سے پہلے source، scripts، dependencies اور credentials کی جانچ کریں۔
date: 2026-05-06
category: تکنیکی رہنما
tags: [GPT Image 2, Codex, Claude Code, OpenAI API, Third-party Skill]
readTime: 8
relatedPath: /docs/guides/gpt-image-2-service-notice/
relatedTitle: GPT Image 2 Service Notes
---

GPT Image 2 Skill، OpenAI کے `gpt-image-2` model کے گرد بنا ہوا community skill اور CLI ہے۔ اگر آپ Codex یا Claude Code جیسے local agent میں prompt library، generation commands اور output workflow بار بار استعمال کرتے ہیں تو یہ مفید ہو سکتا ہے۔ یہ OpenAI کی official product نہیں ہے۔

Install command نقل کرنے سے پہلے README، `SKILL.md`، scripts، dependencies، credential reads، output path، license اور update method دیکھیں۔ Model کی capabilities اور API limits official documentation سے، جبکہ install اور script behavior اصل repository سے verify ہوتے ہیں۔

| کام | پہلا route | کب رکیں |
| --- | --- | --- |
| Agent میں prompts اور image actions reuse کرنا | Source audit کے بعد skill install | code یا output path سمجھ نہ آئے |
| ایک command آزمانا | CLI | credentials یا dependencies قابل قبول نہ ہوں |
| Product feature بنانا | Official Image API | logs، billing، storage اور validation درکار ہوں |
| Multi-step app یا agent | Responses API image tool | image بڑے flow کا ایک حصہ ہو |
| ایک manual image | ChatGPT/browser route | local files یا automation درکار نہ ہو |

## Install سے پہلے checklist

Repository origin، history، issues اور license؛ `SKILL.md` کے triggers اور commands؛ scripts کے network requests اور file writes؛ dependency installer؛ `OPENAI_API_KEY` یا `.env` reads؛ output path؛ اور version pin، update، removal اور rollback method چیک کریں۔ کچھ غیر واضح ہو تو install نہ کریں۔ “Open source”، “free” یا “unlimited” کا دعویٰ safety کا ثبوت نہیں۔

## Skill، Image API اور Responses API

Skill ایک local workflow wrapper ہے۔ Product backend کے لیے Image API زیادہ واضح رہتی ہے کیونکہ requests، errors، storage، security audit اور billing attribution آپ کے قابو میں رہتے ہیں۔ جب image generation text، tools، state اور follow-up reasoning کے بڑے flow کا حصہ ہو تو Responses API بہتر ہے۔

Customer data کے بغیر empty directory میں پہلے تین tests کریں: plain generation، reference-image editing اور failing input۔ تصدیق کریں کہ key log نہیں ہوتی اور files صرف متوقع directory میں لکھی جاتی ہیں۔

## FAQ

### کیا یہ official OpenAI product ہے؟

نہیں۔ یہ third-party skill، prompt library یا CLI wrapper ہے۔

### کیا install کرنے سے GPT Image 2 free ہو جاتا ہے؟

نہیں۔ Install صرف local calling method بدلتا ہے؛ account permission، billing اور terms نہیں۔

### پہلے کون سی files پڑھیں؟

README، `SKILL.md`، scripts، dependency files، examples، license اور output path۔
