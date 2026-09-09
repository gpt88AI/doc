---
title: GPT Image 2 Skill: මුලින් code audit, පසුව install හෝ official API
description: GPT Image 2 Skill යනු third-party image-generation skill සහ CLI එකකි. Install කිරීමට පෙර source, scripts, dependencies සහ credential handling පරීක්ෂා කරන්න.
date: 2026-05-06
category: තාක්ෂණික මාර්ගෝපදේශය
tags: [GPT Image 2, Codex, Claude Code, OpenAI API, Third-party Skill]
readTime: 8
relatedPath: /docs/guides/gpt-image-2-service-notice/
relatedTitle: GPT Image 2 Service Notes
---

GPT Image 2 Skill යනු OpenAI හි `gpt-image-2` model වටා සාදා ඇති community skill සහ CLI එකකි. Codex හෝ Claude Code වැනි local agent එකක prompt library, generation commands සහ output workflow නැවත නැවත භාවිත කළ යුතු විට එය ප්‍රයෝජනවත් විය හැක. මෙය OpenAI හි official product එකක් නොවේ.

Install command එක copy කිරීමට පෙර README, `SKILL.md`, scripts, dependencies, credential reads, output path, license සහ update method බලන්න. Model capabilities සහ API limits official documentation මගින්ද, install සහ script behavior සැබෑ repository මගින්ද verify කළ යුතුය.

| කාර්යය | මුලින් තෝරන්න | නවත්වන අවස්ථාව |
| --- | --- | --- |
| Agent තුළ prompts සහ image actions reuse කිරීම | Source audit පසු skill install | code හෝ output path නොතේරේ නම් |
| එක් command එකක් පරීක්ෂා කිරීම | CLI | credentials හෝ dependencies පිළිගත නොහැකි නම් |
| Product feature එකක් | Official Image API | logs, billing, storage සහ validation අවශ්‍ය නම් |
| Multi-step app හෝ agent එකක් | Responses API image tool | image එක විශාල flow එකක එක් පියවරක් නම් |
| එක් වරක් manual image එකක් | ChatGPT/browser route | local files හෝ automation අවශ්‍ය නැත්නම් |

## Install කිරීමට පෙර checklist

Repository origin, history, issues සහ license; `SKILL.md` triggers සහ commands; scripts හි network requests සහ file writes; dependency installer; `OPENAI_API_KEY` හෝ `.env` reads; output path; version pin, update, removal සහ rollback ක්‍රමය පරීක්ෂා කරන්න. යමක් පැහැදිලි නැත්නම් install නොකරන්න. “Open source”, “free” හෝ “unlimited” යන වචන safety සඳහා සාක්ෂියක් නොවේ.

## Skill, Image API සහ Responses API

Skill එක local workflow wrapper එකකි. Product backend එකකට Image API වඩා පැහැදිලි ය; requests, errors, storage, security audit සහ billing attribution ඔබේ පාලනයේ පවතී. Image generation text, tools, state සහ follow-up reasoning ඇතුළත් විශාල flow එකක කොටසක් නම් Responses API වඩා ගැළපේ.

Customer data නැති empty directory එකක tests තුනක් කරන්න: plain generation, reference-image editing සහ failing input. API key log නොවන බවත් files අපේක්ෂිත directory එකේ පමණක් ලියන බවත් තහවුරු කරන්න.

## FAQ

### මෙය official OpenAI product එකක්ද?

නැත. මෙය third-party skill, prompt library හෝ CLI wrapper එකකි.

### Install කළාම GPT Image 2 free වෙනවාද?

නැත. Install කිරීම local calling method එක පමණක් වෙනස් කරයි; account permission, billing හෝ terms වෙනස් නොකරයි.

### මුලින් බලන්න ඕනෑ files මොනවාද?

README, `SKILL.md`, scripts, dependency files, examples, license සහ output path.
