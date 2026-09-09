---
title: GPT Image 2 Skill: আগে code audit, তারপর install নাকি official API
description: GPT Image 2 Skill একটি third-party image-generation skill ও CLI। Install করার আগে source, scripts, dependencies এবং credential handling পরীক্ষা করুন।
date: 2026-05-06
category: প্রযুক্তি টিউটোরিয়াল
tags: [GPT Image 2, Codex, Claude Code, OpenAI API, Third-party Skill]
readTime: 8
relatedPath: /docs/guides/gpt-image-2-service-notice/
relatedTitle: GPT Image 2 Service Notes
---

GPT Image 2 Skill হল OpenAI-এর `gpt-image-2` model ঘিরে তৈরি একটি community skill ও CLI। Codex বা Claude Code-এর মতো local agent-এ prompt library, generation command এবং output workflow বারবার ব্যবহার করতে হলে এটি কাজে লাগতে পারে। এটি OpenAI-এর official product নয়।

Install command কপি করার আগে README, `SKILL.md`, scripts, dependencies, credential reads, output path, license এবং update method দেখুন। Model-এর আচরণ ও API সীমা official documentation থেকে, আর install ও script behavior সংশ্লিষ্ট repository থেকে যাচাই করতে হবে।

| কাজ | প্রথম route | কখন থামবেন |
| --- | --- | --- |
| Agent-এ prompt ও image action reuse | Source audit-এর পরে skill install | code বা output path বোঝা না গেলে |
| একটি command পরীক্ষা | CLI | credentials বা dependencies গ্রহণযোগ্য না হলে |
| Product feature | Official Image API | logs, billing, storage ও validation দরকার হলে |
| Multi-step app বা agent | Responses API image tool | image বড় flow-এর একটি ধাপ হলে |
| একবারের manual image | ChatGPT/browser route | local file বা automation দরকার না হলে |

## Install-এর আগে checklist

Repository origin, history, issue ও license; `SKILL.md`-এর trigger ও command; scripts-এর network request ও file write; dependency installer; `OPENAI_API_KEY` বা `.env` পড়া হয় কি না; output path; এবং version pin, update, remove ও rollback পদ্ধতি পরীক্ষা করুন। কিছু অস্পষ্ট হলে install করবেন না। “Open source”, “free” বা “unlimited” লেখা নিরাপত্তার প্রমাণ নয়।

## Skill, Image API এবং Responses API

Skill একটি local workflow wrapper। Product backend-এ Image API সাধারণত পরিষ্কার, কারণ request log, error, storage, security audit এবং billing আপনার নিয়ন্ত্রণে থাকে। Image generation যদি text, tools, state এবং follow-up reasoning-এর বড় flow-এর অংশ হয়, Responses API বেশি উপযুক্ত।

প্রথমে customer data ছাড়া empty directory-তে তিনটি test চালান: সাধারণ generation, reference-image editing এবং failing input। Confirm করুন যে API key log হয় না এবং file কেবল নির্দিষ্ট directory-তে লেখা হয়।

## FAQ

### এটি কি official OpenAI product?

না। এটি third-party skill, prompt library বা CLI wrapper।

### Install করলে কি GPT Image 2 free হয়?

না। Install শুধু local calling method বদলায়; account permission, billing বা terms বদলায় না।

### কোন file আগে দেখব?

README, `SKILL.md`, scripts, dependency files, examples, license এবং output path।
