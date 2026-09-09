---
title: Gemini Tier 1 billing enabled তবুও free quota (250 RPD)? Complete Fix Guide 2026
description: Billing চালু থাকার পরও 250 RPD দেখালে experimental model, API key project binding, billing sync, promo credit এবং preview limit যাচাই করুন।
date: 2026-02-21
category: API ডেভেলপমেন্ট
tags: [Gemini API, API Troubleshooting, Rate Limit, Google AI]
readTime: 18
relatedPath: /docs/api/errors/
relatedTitle: OpenAI-Compatible API Error Troubleshooting
---

Google Cloud project-এ billing চালু করেও Gemini API 250 RPD বা free-tier limit দেখাতে পারে। Billing status, project tier এবং model-specific quota আলাদা layer। সাধারণ সমাধান হলো `-exp`/`-experimental` model থেকে stable বা paid-preview model-এ যাওয়া, billed project-এ API key নতুন করে তৈরি করা এবং sync-এর জন্য 24–48 ঘণ্টা অপেক্ষা করা।

## দ্রুত checklist

1. Actual model ID দেখুন; experimental variant free quota-তে থাকতে পারে।
2. API key কোন Google Cloud project-এর সঙ্গে যুক্ত তা AI Studio-তে দেখুন।
3. Billing account-এ active payment method ও pending verification যাচাই করুন।
4. Promo/free-trial credit active কি না দেখুন।
5. Preview model-এর stricter limit-কে stable model থেকে আলাদা ধরুন।

## Tier এবং quota

Free, Tier 1, Tier 2 ও Tier 3 আলাদা allocation। Free limit model অনুযায়ী RPM/RPD-তে বদলায়; 250 RPD universal number নয়। Tier 1 paid billing-এ higher limit দিতে পারে, কিন্তু experimental ও preview model আরও restrictive হতে পারে। Tier 2-এর জন্য cumulative $250 ও 30 দিন, Tier 3-এর জন্য $1,000 ও 30 দিনের মতো threshold থাকতে পারে; current official console/docs দিয়ে যাচাই করুন।

Quota project-এ প্রযোজ্য, API key-তে নয়। একই project-এ নতুন key তৈরি করলে limit বাড়ে না। RPD midnight Pacific Time-এ reset হতে পারে; current official docs দেখে নিন, Beijing time-এ fixed conversion ধরে নেবেন না।

## পাঁচটি root cause

**1. Model variant:** `gemini-2.5-pro-exp-03-25` বা `-experimental` free quota ব্যবহার করতে পারে। Stable `gemini-2.5-pro` বা available paid-preview variant পরীক্ষা করুন।

**2. ভুল API key project:** Key unbilled project থেকে তৈরি হতে পারে। AI Studio-তে billed project বেছে নতুন key তৈরি করুন।

**3. Billing sync delay:** Billing চালুর পর quota system-এ sync হতে কয়েক মিনিট থেকে 48 ঘণ্টা লাগতে পারে। Stable paid model দিয়ে ছোট call করে dashboard ও headers দেখুন।

**4. Promo credit:** Free trial বা promotional balance থাকলে account paid tier হিসেবে ধরা নাও হতে পারে। Billing support review নিন।

**5. Preview limit:** Preview/experimental model paid tier-এও stricter limit রাখে। একে bug না ধরে model-specific quota দেখুন।

## Step-by-step fix

```bash
curl -s -D - "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' 2>&1 | grep -i "x-ratelimit"
```

`x-ratelimit-limit` ও `x-ratelimit-remaining` দেখুন। Actual secret commit বা share করবেন না। Stable model ব্যবহার করুন, billed project-এ নতুন key তৈরি করুন, billing activation যাচাই করুন এবং 24–48 ঘণ্টা sync দিন। Promo credit থাকলে support review নিন। সমস্যা থাকলে project ID, model variant, key identifier (key নয়), billing screenshot এবং sanitized headers দিয়ে Google Cloud support-এ লিখুন।

## Tier যাচাইয়ের তিন পদ্ধতি

1. **AI Studio API Keys:** Free অথবা Pay-as-you-go marker দেখুন।
2. **Cloud Console quotas:** Project-এর Gemini/Generative Language quota দেখুন; sync চলাকালে secondary evidence হিসেবে নিন।
3. **API response headers:** `x-ratelimit-limit` ও `x-ratelimit-remaining` বাস্তব আচরণ দেখায়। Dashboard ও headers আলাদা হলে model variant, project binding ও sync যাচাই করুন।

## Production planning

Tier 1 যথেষ্ট না হলে batching, caching, queue, Batch API এবং multi-model fallback ব্যবহার করুন। আলাদা project capacity বাড়াতে পারে, কিন্তু complexity ও billing governance বাড়ায়। Vertex AI-এর quota আলাদা; Gemini API tier নিজে থেকে Vertex AI-তে যায় না। Gateway-কে billing বা fallback route হিসেবে দেখুন, Google quota বাড়ানোর উপায় হিসেবে নয়।

## FAQ

Stable model-এও free limit থাকলে key-project binding ও billing sync দেখুন। Promo credit সাধারণত Tier 2/3 spend threshold-এ গণনা হয় না। Paid plan safety, model capacity বা quota সরায় না। RPD ও RPM reset আলাদা।

## Further Reading

- [OpenAI-Compatible API Error Troubleshooting](/docs/api/errors/)
