---
title: ChatGPT Plus image upload limit: දිනපතා count එක අනුමාන නොකරන්න
description: 20MB file cap, rolling upload window, per-message combination, Projects, Library සහ custom GPT limits වෙන් කර diagnose කරන්න.
date: 2026-07-05
category: AI tools guide
tags: [ChatGPT, Image Upload, File Upload, ChatGPT Plus, OpenAI, Upload Limits]
readTime: 9
---

සියලු Plus accounts සඳහා එකම daily image-upload count එකක් හෝ fixed midnight reset එකක් OpenAI විසින් ප්‍රකාශ කර නැත. තහවුරු කළ හැකි සීමා වෙන වෙනම වේ: image එකකට 20MB, files සඳහා පැය 3ක rolling window එකක්, message එකක image count එක image size සහ එකතු කළ text මත රඳා පවතී, සහ Projects, Library සහ custom GPT knowledge සඳහා වෙනම capacity ඇත. එබැවින් “අද images කීයක්ද?” යන්නට පෙර error එක තිබෙන්නේ කුමන layer එකේද බලන්න.

| Symptom | හැකි layer එක | පළමු action |
| --- | --- | --- |
| එක image එකක් වහාම reject වේ | size/format | 20MBට අඩු static PNG/JPEG භාවිත කරන්න |
| මෑතකදී files බොහෝ upload කළා | rolling file cap | retry නවත්වා window එක අවසන් වීමට ඉඩ දෙන්න |
| images බොහෝ + දිගු text fail වේ | message combination | count, size හෝ text අතරින් එක variable එකක් පමණක් අඩු කරන්න |
| normal chat works, Project fails | Project capacity/state | Project interface සහ file count බලන්න |
| Library/storage message | saved storage | Library/Storage usage බලන්න |
| GPT builder knowledge fail වේ | GPT knowledge capacity | builder හි current prompt බලන්න |

## Upload, generation සහ API වෙනම දේවල්

දැනට ඇති image එකක් upload කිරීම, අලුත් image එකක් generate කිරීම සහ API image request එකක් යැවීම contracts තුනකි. Generation cooldown එකෙන් upload quota එක තහවුරු නොවේ; failed upload එකෙන් generation count එක හෙළි නොවේ; ChatGPT Plus API credits ලබා නොදේ.

## Minimal A/B test

Exact error, time, timezone, plan, surface සහ recent uploads සටහන් කරන්න. Private content නැති static PNG/JPEG එකක් 20MBට අඩුවෙන් තබා එක variable එකක් පමණක් වෙනස් කර එක් වරක් retry කරන්න: multiple images වෙනුවට one image, හෝ එම image එක කුඩා කරන්න. Failed attempts quota එකට ගණන් විය හැක; blind clicking නොකරන්න. Success එකෙන් ඒ මොහොතේ path එක වැඩ කළ බව පමණක් පෙන්වයි, ඉතිරි quota එක නොවේ.

## 20MB, rolling window සහ fixed count එකක් නොමැති බව

20MB යනු single-image rule එකකි. File upload FAQ එකේ පැය 3ක rolling limit එකක up to 80 files ලෙස සඳහන් වන අතර peak time වලදී එය අඩු විය හැක; PDFs, spreadsheets සහ වෙනත් files ද මෙයට ඇතුළත් වේ. මෙය image-only daily quota එකක් නොවන අතර fixed midnight reset එකක් ද නොවේ. Free plan file limits වෙනස් විය හැක.

## Plan, Projects සහ storage

Free, Plus, Pro plan volume එක වෙනස් කළ හැකි නමුත් bad file, full storage, Project capacity හෝ service incident එකක් ස්වයංක්‍රීයව නිවැරදි නොකරයි. Official help pages වල Plus Project capacity සඳහා 20 සහ 25, custom GPT knowledge සඳහා 10 සහ 20 ලෙස conflicting numbers තිබිය හැක. ඒවා universal rule ලෙස නොලියන්න; login වූ පසු current interface එක authoritative evidence ලෙස ගන්න.

Library storage සහ per-user/shared storage වෙනම lines විය හැක. Chat එක delete කළත් Library හි saved file එක අනිවාර්යයෙන් මැකෙන්නේ නැත; ඉඩ නිදහස් කිරීමට Library තුළ file එක delete කරන්න.

## Support evidence

20MBට අඩු supported static file එකක් clean comparison එකකට පසුවත් fail වේ නම්, normal chat සහ Project දෙකම fail වේ නම්, හෝ docs සහ interface අතර conflict තිබේ නම් support packet එකක් සකස් කරන්න: exact error, screenshot, timestamp, plan/account type, platform/version, file format/size, attachment count, recent successful upload, recent failures සහ Status result. API keys, passwords සහ private document content ticket එකට ඇතුළත් නොකරන්න.

### Plus දිනකට images කීයක් upload කළ හැකිද?

එකම official daily image count එකක් නැත. 20MB cap, rolling file window සහ message limits වෙන වෙනම බලන්න.

### Limit එක reset වන්නේ කවදාද?

Officially rolling window එකක් ඇත; unified midnight reset එකක් නැත. Recent upload time එක සටහන් කර blind retry නවත්වන්න.

### Project 20 ද 25 files ද?

Official pages conflict විය හැක; current logged-in Project interface එක අනුගමනය කරන්න.
