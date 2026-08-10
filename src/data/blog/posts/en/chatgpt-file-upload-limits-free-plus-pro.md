---
title: Hitting the ChatGPT Plus Image Upload Limit? Don't Guess Daily Counts — Check These 6 Kinds of Limits
description: As of mid-2026, OpenAI has not published a unified daily image upload count for Plus. This guide walks through six limit layers — the 20MB per-image cap, the 80-files-per-3-hours rolling window, per-message combinations, Projects, the Library, and custom GPT knowledge files — with minimal A/B testing and evidence collection.
date: 2026-07-05
category: AI工具指南
tags: [ChatGPT, Image Upload, File Upload, ChatGPT Plus, OpenAI, Upload Limits]
readTime: 9
---

If you only want to know "how many images can ChatGPT Plus upload per day," the current official answer is: **OpenAI has not published a daily image count that applies to all Plus accounts, nor a unified midnight reset time.**

As of July 19, 2026, three other rules can be confirmed: each image is capped at 20MB; file uploads are capped at 80 per 3 hours, possibly reduced during peak times; and how many images one message can hold depends on image size and accompanying text. The 80 count is a shared rolling cap across images, PDFs, spreadsheets, and other files — not a Plus-specific "daily image pack."

So when you see "upload limit reached," don't start by counting today's uploads. First look at where the error occurs and what its unit is, then judge whether you hit a single file, recent uploads, message combination, Project, Library, or a custom GPT's knowledge file boundary.

| What you see | More likely layer | Most useful action now |
| --- | --- | --- |
| One image rejected right after selection | Size or format | Switch to a static PNG/JPEG under 20MB; retry only once |
| Many images, PDFs, and spreadsheets uploaded recently | Rolling file upload | Stop continuous retries; let recent uploads age out of the 3-hour window |
| Multiple images plus long text fail; single image works | Current message combination | Reduce only one of: image count, image size, or text length |
| Normal chats work, a specific Project doesn't | Project file capacity or project state | Check that Project's file count and the logged-in interface |
| Error explicitly mentions Library, 资料库, or storage | Saved space | Check usage at the corresponding storage entry; don't just delete chats |
| The custom GPT editor stops accepting knowledge files | GPT knowledge file capacity | Follow the current GPT builder display and keep the error text |

## First Confirm You're "Uploading an Image," Not "Generating One"

Chinese-speaking users often call three different actions "image limits," but they can't share the same quota conclusion.

- **Uploading an image**: adding a phone photo, screenshot, or design file to the conversation. OpenAI's help center calls it "image input"; the entry copy is "add photos and files."
- **Generating an image**: entering a prompt so ChatGPT creates a new image. It's an image generation tool and may have its own availability and usage limits.
- **API image requests**: developers process or generate images with API projects, models, and request formats. API billing is separate; ChatGPT Plus does not include API credits.

An image-generation cooldown prompt doesn't prove attachment uploads are exhausted; failing to upload an existing image doesn't imply how many images you can still generate. An API being able to process the same image likewise can't "refill" the ChatGPT app's attachment quota.

If the problem is a missing attachment button, a file picker that won't open, different behavior across clients, or images that fail after upload, the better guide is [ChatGPT Can't Upload Images](/en/docs/blog/chatgpt-image-upload-not-working/). If the prompt explicitly targets message counts or model usage, move to [ChatGPT Message Limit Troubleshooting](/en/docs/blog/chatgpt-free-image-generation-limit-complete-guide/).

## After an Error, Run Only One Minimal A/B Test

The file upload FAQ explicitly warns: **failed upload attempts can sometimes count toward upload rate limits.** So the safest troubleshooting isn't clicking repeatedly — it's keeping evidence, then running one comparison that can change your judgment.

1. Copy the exact error text and record the time, timezone, plan, web or app, normal chat or Project, and whether you recently uploaded other files.
2. Prepare a static PNG or JPEG under 20MB. Don't test with private files, and don't change account, browser, and conversation at the same time.
3. Change only one variable and retry once. For example, go from multiple images to one image; or keep one image and only shrink the file.
4. Branch on the result. Same error means stop; success only proves that control path was available at that moment — it can't be used to calculate remaining quota.

The key to this method is "the result decides the next step." If normal chats succeed but a Project fails, waiting on the rolling window is less useful; if small images and PDFs both fail after a dense upload round, the rolling cap is more suspect; if multiple entry points fail at once, check [OpenAI Status](https://status.openai.com/) first.

## What 20MB, 80, and "No Fixed Count" Each Govern

The [ChatGPT image input FAQ](https://help.openai.com/zh-hans-cn/articles/8400551-chatgpt-%E5%9B%BE%E7%89%87%E8%BE%93%E5%85%A5%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98) lists static image formats as PNG, JPEG/JPG, and non-animated GIF, each capped at 20MB. Video isn't supported by this image-input entry. OpenAI gives no "fixed max images per message," stating instead that the count depends on image size and accompanying text.

This means three common misconceptions should be separated:

- A 21MB image is blocked by the single-image rule even with plenty of rolling quota;
- Five small images plus a long paragraph failing doesn't mean today's image count is exhausted;
- One small image uploading successfully only proves that one upload worked — it doesn't prove 79 remain.

The [file uploads FAQ](https://help.openai.com/en/articles/8555545-file-uploads-faq) states up to 80 files per 3 hours, noting it may drop during peak times. That window includes many file types uploaded recently, not just images. ChatGPT currently doesn't show how much rolling upload quota is used or remaining, so a user's own timestamps can only schedule the next comparison — not serve as an official countdown.

"Rolling 3 hours" also isn't a full reset every 3 hours. The more reasonable reading is that recent uploads age out of the window one by one over time. OpenAI makes no promise of recovery at Beijing midnight, UTC midnight, or any fixed hour.

## Free, Plus, Pro: Plan Names Only Answer Part of It

The plan affects available volume, but can't override file size, Project capacity, storage, or service status.

| Plan | Currently confirmable upload info | What you can't infer |
| --- | --- | --- |
| Free | File upload FAQ states 3 files per day | 3 images of any size per day for sure |
| Plus | File upload FAQ gives up to 80 files per 3 hours; peak times may reduce it | A fixed daily image count, an image-only 80, or a fixed midnight reset |
| Pro | No unified daily image upload count on these pages | All file, Project, storage, and safety boundaries disappear |

The [What Is ChatGPT Plus](https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus) page confirms Plus includes file upload and analysis, and notes usage limits may change with system conditions. It also states API usage is billed separately. So "Plus is 50 images a day," "Pro is unlimited image uploads," or "buying Plus gives API balance" should never be written as official entitlements.

If a Free user's compliant small files, Projects, and storage are all fine but they're consistently interrupted by the 3-files-per-day limit, upgrading may relate to the problem. If the first image already exceeds 20MB, a Project is full, Library space is low, or the service is having an incident, upgrading is not the corresponding fix.

## Why Project Limits Are Both 20 and 25

Two of OpenAI's official help docs currently conflict:

- The file upload FAQ says **Plus is limited to 20 files per Project**;
- [Using Projects in ChatGPT](https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt) says **Go and Plus get 25 files per Project**, and additionally notes up to 10 files per upload.

20 and 25 can't be merged into one "correct number," and uploading 10 at once isn't a Project's total capacity. For immediate action on your account, the current Project interface after login is the closest evidence. If the interface disagrees with either help page, keep the plan, file count, time, and screenshots, then contact OpenAI support.

Also avoid a wrong move: when one Project reports full, don't immediately clear multiple projects to verify. First confirm whether normal chats can still upload the same compliant small image. If normal chats work and the Project doesn't, Project capacity or project state is the stronger signal.

## "Library 20GB" and "User 25GB" Aren't the Same Line

[File storage and Library in ChatGPT](https://help.openai.com/zh-hans-cn/articles/20001052-file-storage-and-library-in-chatgpt) lists Plus Library storage as **20GB**. The file upload FAQ separately lists a shared storage cap of **25GB per end user and 100GB per organization**, covering chats, Projects, and custom GPT knowledge files.

The two numbers have different names and scopes; they can't be added into 45GB, nor can 25GB replace the 20GB shown in the Library interface. If the error explicitly mentions "Library" (资料库), check the corresponding usage in the Library or "Settings > Storage"; if the error only says the vaguer "storage," keep the original text and let support decide the scope.

The Library page also notes: deleting a chat that contains a file does not delete the file already saved to the Library. To free Library space, delete the target file in the Library itself. Whether space is available is the current state of the logged-in account; this article has not read any personal account, private chat, or workspace data, and can't confirm your remaining capacity for you.

## Custom GPT Knowledge Files Have Their Own 10 vs 20 Conflict

Ordinary chat attachments, Project reference files, and a custom GPT's "knowledge" aren't the same container. If the error happens in the GPT builder, the current official docs hold another conflict that must be preserved:

- The file upload FAQ's question asks "how many can be uploaded at once," but the answer says **a GPT can have at most 10 files over its lifetime**;
- [Creating and editing GPTs](https://help.openai.com/en/articles/8554397-creating-and-editing-gpts) says **a GPT can attach at most 20 knowledge files**, each up to 512MB.

So you can't simply write the custom GPT cap as 10 or 20, and you can't use either number to explain how many images a normal conversation can hold. For a GPT being edited, use the capacity and error prompt visible in the current builder as the immediate basis; if support gets involved, keep the GPT's existing knowledge file count and the original prompt — don't upload test files containing keys or private material.

## Three Hypothetical Scenarios: Use Results to Rule Out Explanations

These are diagnostic examples, not real measurements of any account, and don't represent fixed quotas.

**Scenario one:** Adding 6 screenshots plus a long note fails; changing to 1 of the same screenshot succeeds. The result first points to message-combination volume; it doesn't prove a Plus account is capped at 5 images a day, nor that the rolling quota fully recovered.

**Scenario two:** An 8MB JPEG succeeds in a normal chat but fails in a specific Project. If the error also mentions project files, Project capacity deserves priority over single-image size. Blindly waiting three hours here may not change the result.

**Scenario three:** A user uploaded multiple PDFs and spreadsheets recently, then small images also hit an upload cap. Since the 80/3-hours cap is a full-file rolling limit, don't count only images. Stop failed retries, record recent upload times, and run one compliant small-image comparison after the window shifts.

## When to Contact OpenAI Support

End self-service retries and compile evidence when: a supported-format static image under 20MB still fails after one comparison; the official status page shows no known incident; the error persists across normal chats and Projects; or the account's Project, Library, and GPT knowledge file numbers conflict with the help docs.

The evidence pack doesn't need the original private files. At minimum include:

- The exact error text and screenshots;
- Time, timezone, plan, and login account identifier;
- Web, iOS, Android, or desktop and its version;
- Whether it was a normal chat, Project, Library, or GPT builder;
- File format, exact size, attachment count, and accompanying text length;
- Most recent successful upload, failed attempt count, and other recent file uploads;
- The OpenAI Status at the time, and any request ID visible in the interface.

Don't put API keys, passwords, payment info, or unrelated document content into a ticket. Support needs metadata to locate which limit layer failed.

## FAQ

### How many images can ChatGPT Plus upload per day?

OpenAI has not published a unified Plus daily image count. What's currently confirmable is the 20MB single-image cap, up to 80 files per 3 hours with possible peak-time reduction, and per-message image counts depending on image size and text. The 80 isn't an image-only daily quota.

### When does it recover after hitting the upload limit?

What's officially public is the rolling 3-hour file upload window, not a unified midnight reset. ChatGPT also doesn't show the rolling quota balance. Record your recent uploads and the time of the first error, stop continuous retries, then run one compliant small-image comparison.

### How many images can one message hold?

There's no official fixed number. OpenAI states it depends on image size and accompanying text. When multiple images fail, first reduce just one variable: image count, file size, or text length.

### Why did I hit the limit after only a few uploads?

It may be counting other recent files like PDFs and spreadsheets; failed attempts can also count; or it could be a single-image, message-combination, Project, or storage boundary. "How many today" alone can't confirm the cause.

### Is a Plus Project 20 or 25 files?

As of July 19, 2026, two official OpenAI pages still conflict: the file upload FAQ says 20, the Projects page says 25, with an additional 10-per-upload limit. Don't resolve the conflict; go by the Project prompt shown after login.

### Can a custom GPT hold 10 or 20 knowledge files?

The official pages conflict the same way: the file upload FAQ says at most 10 files over a GPT's lifetime, while the GPT creation notes say up to 20 knowledge files attached. The current GPT builder holds your account's live state; don't write either number as an unconditional rule.

### Does deleting a chat free up Library space?

Not necessarily. OpenAI's Library page states that deleting a chat containing a file doesn't delete the file already saved to the Library. Manage and delete the file in the Library itself.

### Are image-generation limits the same as image-upload limits?

No. Generation creates a new image; upload adds an existing static image as image input. A limit on one entry doesn't prove how much quota remains on the other.

### Can the OpenAI API bypass the ChatGPT Plus upload limit?

Don't treat the API as a supplement to the ChatGPT subscription. The API is a separate developer product with its own projects, billing, request formats, and limits; Plus doesn't include API credits.
