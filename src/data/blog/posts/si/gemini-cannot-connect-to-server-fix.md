---
title: Gemini server එකට connect වෙන්නේ නැද්ද? Web, Browser, App සහ API වෙන් කර බලන්න
description: Gemini connection errors සඳහා surface, status, account, browser, region, mobile සහ API evidence මත නිවැරදි diagnosis සහ handoff කරන්න.
date: 2026-01-20
category: තාක්ෂණික නිබන්ධනය
tags: [Gemini, Cannot Connect to Server, Check Internet Connection, Google Workspace, Connection Error]
readTime: 11
relatedPath: /docs/guides/gpt88-ai-proxy/
relatedTitle: gpt88 AI Proxy
---

“Can’t connect to server” කියන පණිවිඩයෙන් පමණක් network, account, region හෝ Google outage එකක් තහවුරු නොවේ. මුලින් surface එක හඳුනාගන්න: Gemini Web, Chrome error page, Android/iOS App හෝ program/API. පසුව normal website එකක්, වෙනත් Google service එකක්, official status සහ අවසර ඇති browser/network comparison එකක් පරීක්ෂා කරන්න.

## මිනිත්තුවක triage

Gemini page එකේ retry message තිබේ නම් page එක විවෘත වී ඇති නමුත් request/session එක අවසන් වී නැත; status, account, Workspace සහ browser පරීක්ෂා කරන්න. Chrome `ERR_CONNECTION_RESET/CLOSED/TIMED_OUT/NAME_NOT_RESOLVED` නම් exact transport/DNS code එක අනුගමනය කරන්න. Mobile App නම් app/account/device/store/network branch එක බලන්න. Program HTTP/JSON/SDK error එකක් නම් API troubleshooting වෙත යන්න.

## Web, account සහ region

කාලය සහ timezone සටහන් කර official status බලන්න; green status එක එම මොහොතේ public incident එකක් නොපෙනුණු snapshot එකක් පමණි. Normal site, වෙනත් Google service, supported browser/private window සහ අවසර ඇති දෙවන network එකක සීමිත comparison එකක් කරන්න. Certificate/HSTS warning bypass නොකරන්න. Account type, age condition, Workspace permission සහ service eligibility connection issue එකෙන් වෙනම පරීක්ෂා කරන්න. “Workspace only” යන්න Mainland China personal consumer support සඳහා සහතිකයක් නොවේ; language support යනු region/account support සඳහා සාක්ෂියක් නොවේ. Web, App, AI Studio සහ API eligibility වෙනස් වේ.

## Chrome, Mobile සහ API

සම්පූර්ණ browser code එක copy කර, වෙනත් sites විවෘත වේද බලන්න; එක් වරක් reload/restart කර supported browser හෝ private window එකක comparison කරන්න. Incognito ක්‍රියා කළොත් extension/site-data scope එක පමණක් පෙන්වයි, root cause එකක් ඔප්පු නොකරයි. Certificate warning එකකදී unknown certificate install නොකරන්න. App එකේ country/store/account/language/device requirements, version සහ OS සටහන් කර update/reopen කරන්න; unknown APK භාවිතා නොකරන්න.

Real HTTP status හෝ structured SDK error එකක් ලැබුණු විට පමණක් API branch එකට යන්න. Key/token ඉවත් කළ status සහ full body, model, endpoint/version, project, time/timezone, minimal reproduction සහ SDK version සුරකින්න. `429`, `408` සහ `5xx` සඳහා සීමිත exponential backoff+jitter; `400/403` සඳහා request, permission, account, region හෝ billing නිවැරදි කරන්න.

```text
Surface: Web / Chrome / Android / iOS / API
Full message or code:
Time and timezone:
Account type: personal / work / school
Browser or app version:
Device and OS:
Network category:
Official status result:
One comparison result:
Minimal reproduction:
```

API key, cookie, token, private prompt, uploaded file, email හෝ public IP බෙදා නොගන්න. සීමිත comparison එකකින් පසුවත් වෙනසක් නැත්නම් admin, official support හෝ dev lead වෙත evidence දෙන්න; security හෝ region settings නැවත නැවත වෙනස් නොකරන්න.

## FAQ සහ Further Reading

වෙනත් sites විවෘත වීම Gemini-specific request හෝ account ගැටලුව ඉවත් නොකරයි. Green status network proof එකක් නොවේ. App සහ Web eligibility වෙනස් විය හැක. API 403 එකකට සාමාන්‍යයෙන් retry නොකර key/permission/project බලන්න.

- [gpt88 AI Proxy](/docs/guides/gpt88-ai-proxy/)
