---
title: Complete Guide to Google Gemini API Free Tier Limits (Updated January 2026): Rate Limits, Quota Changes, and Best Practices
description: A full breakdown of the 2026 Gemini API free tier's RPM/TPM/RPD limits, an analysis of the December 2025 quota cuts, plus 429 error handling, multimodal token calculation, region access options, and upgrade decision guidance, with per-model free tier comparison tables and code examples.
date: 2026-01-20
category: API开发
tags: [Gemini API, Free Tier, API Limits, Google AI, Development Guide]
readTime: 18
relatedPath: /docs/api/list-models/
relatedTitle: Model List
---

The Google Gemini API is currently the only mainstream LLM API that offers a genuinely free tier. Unlike OpenAI and Anthropic, developers can get ongoing API access without binding a credit card, making it an ideal way to learn AI development and build prototypes. However, in December 2025 Google slashed free-tier quotas significantly, and many developers suddenly began hitting frequent 429 errors with no warning. This article details every current free-tier limit, the concrete impact of the December quota changes, and how to build applications efficiently within the constrained quota.

## Gemini API Free Tier Limits in January 2026

**The short answer:** the current Gemini API free tier provides 5-15 RPM (requests per minute), 250,000 TPM (tokens per minute), and 100-1,000 RPD (requests per day), depending on the model. All limits reset at Pacific midnight.

Per Google's [official rate limits documentation](https://ai.google.dev/gemini-api/docs/rate-limits), free-tier rate limits are enforced at the project level, not the API Key level. Creating multiple API Keys in the same Google Cloud project does not add usable quota — all Keys share one quota pool. Here are the current full limit figures per model:

| Model | RPM | TPM | RPD | Use case |
| --- | --- | --- | --- | --- |
| **Gemini 2.5 Pro** | 5 | 250,000 | 100 | Complex reasoning tasks |
| **Gemini 2.5 Flash** | 10 | 250,000 | 250 | Balanced performance and speed |
| **Gemini 2.5 Flash-Lite** | 15 | 250,000 | 1,000 | High-throughput scenarios |
| **Gemini 3 Flash Preview** | Has free tier | - | - | Latest features |
| **Gemini Embeddings** | 100 | - | 1,000 | Vector embeddings |

Understanding what these limits mean in practice matters. For Gemini 2.5 Pro, 5 RPM means you can only send one request every 12 seconds. If you send 6 requests within a minute, the 6th triggers a 429. The 100 RPD daily limit means the entire project can make at most 100 calls in 24 hours — far too little for any production-grade application.

The 250,000 TPM token limit counts input and output tokens together. Given Gemini's context window of up to 1 million tokens, a single request with lots of conversation history or a long document can consume a large share of quota at once. Developers need to balance request size and frequency.

## Free Tier Comparison and Model Selection

When choosing a model, weigh capability against limits. The Gemini 2.5 family currently offers three main options, each with a distinct positioning.

| Feature | Gemini 2.5 Pro | Gemini 2.5 Flash | Gemini 2.5 Flash-Lite |
| --- | --- | --- | --- |
| **Context window** | 1M tokens | 1M tokens | 1M tokens |
| **Response speed** | Slower | Fast (274 tokens/s) | Fastest |
| **Reasoning** | Strongest | Strong | Standard |
| **Free tier RPD** | 100 | 250 | 1,000 |
| **Best for** | Code generation, complex analysis | General chat, content creation | Batch processing, high-frequency calls |

Gemini 2.5 Pro has the strongest reasoning, scoring 18.8% on Humanity's Last Exam, ahead of other models. It's ideal for deep-thinking tasks like code debugging, legal document analysis, and complex multi-step reasoning. But the 5 RPM and 100 RPD limits make it suitable only for learning and small-scale testing on the free tier.

Gemini 2.5 Flash is most developers' best choice. It keeps strong capability with more relaxed quota (10 RPM, 250 RPD) and a 274 tokens/second response speed that supports real-time interactions. It ranks just behind Pro on LMArena's Hard Prompts tests.

Gemini 2.5 Flash-Lite is the most practical free-tier option. The 1,000 RPD daily quota comfortably supports basic prototype development and learning projects, and 15 RPM is more lenient. Reasoning is weaker than Pro and Flash, but it's enough for most routine tasks.

## The December 2025 Quota Cuts: What Happened?

**The short answer:** on December 7, 2025, Google cut free-tier quotas by 50-80% without prior announcement, and many normally-running applications suddenly started erroring out.

The impact exceeded many expectations. According to developer-community feedback and How-To Geek's report, the most dramatic change hit Gemini 2.5 Flash:

| Model | RPD before | RPD after | Cut |
| --- | --- | --- | --- |
| Gemini 2.5 Flash | ~250 | 20-50 | 80-92% |
| Gemini 2.5 Pro | ~500 | 100 | 80% |
| Overall free tier | - | - | 50-80% |

The hardest-hit were small apps and automation tools running on the free tier. AI integrations on smart-home platforms like Home Assistant and personal chatbot projects suddenly began returning 429s in early December. Because Google gave no notice, developers only realized the policy change after their apps broke.

From Google's perspective, this likely aims to control free-tier resource consumption and push developers toward paid tiers. The free tier is meant for testing and learning, not production. Still, the sudden change frustrated the community. For developers needing stable API access, upgrading to the paid tier or using a unified API gateway is the more reliable route.

## The Gemini 3 Family's Free Tier Situation

Google released the Gemini 3 family in early 2026 with significant performance gains and new features.

**Gemini 3 Flash Preview** is the newest model available on the free tier. It offers Pro-level reasoning while keeping Flash-series speed. On SWE-bench Verified, Gemini 3 Flash scored 78% on code, even surpassing Gemini 3 Pro. It supports a 1M-token context window and handles text, images, audio, video, and PDF input.

**Gemini 3 Pro Preview** has no free API quota — it can only be tried for free in the Google AI Studio chat interface. API access is paid: $2.00/M input tokens and $12.00/M output tokens. This clearly positions Pro as a production-grade solution rather than a free experiment tool.

The Gemini 3 family introduces an important new parameter: **thinking_level**. You can set minimal, low, medium, or high to control internal reasoning depth, balancing response quality, latency, and cost. This replaces the old thinking_budget with a more intuitive control.

| Model | Free tier | Input price | Output price | Highlights |
| --- | --- | --- | --- | --- |
| Gemini 3 Flash | ✅ Yes | $0.50/M | $3.00/M | Strong code, thinking_level control |
| Gemini 3 Pro | ❌ No | $2.00/M | $12.00/M | Strongest reasoning, price doubles past 200K |

## 5-Minute Quick Start: Get an API Key and Run Your First Request

Using the Gemini API takes three steps: sign up for Google AI Studio, get an API Key, install the SDK, and run code. The whole process usually takes under 5 minutes.

**Step 1: Open Google AI Studio**

Open [Google AI Studio](https://aistudio.google.com/) and sign in with a Google account. If you've never used the service, it walks you through initial setup. In the left sidebar, find "Get API Key" and click "Create API Key" to generate a key. Save the API Key somewhere safe — it's only shown once.

**Step 2: Install the Google Gen AI SDK**

Google released the new Gen AI SDK in late 2025; it's the officially recommended library. The old SDK was deprecated on November 30, 2025. The new one supports the latest features like the Live API and Veo.

```bash
pip install google-genai
```

**Step 3: Run your first request**

Setting the API Key as an environment variable is the safest approach. The SDK automatically reads an environment variable named `GEMINI_API_KEY`.

```python
from google import genai

# Method 1: auto-read the GEMINI_API_KEY environment variable
client = genai.Client()

# Method 2: pass the key manually (testing only)
# client = genai.Client(api_key="YOUR_GEMINI_API_KEY")

# Send a request
response = client.models.generate_content(
    model="gemini-2.5-flash",  # Flash is recommended for the free tier
    contents="Explain what API rate limiting is in simple language"
)

print(response.text)
```

On success you should see the model's explanation of API rate limiting. The most common errors are a misconfigured API Key or region restrictions.

For multi-turn conversations, use a chat session:

```python
chat = client.chats.create(model="gemini-2.5-flash")
response = chat.send_message("Hi, tell me about the Gemini API free tier")
print(response.text)

# Continue the conversation, keeping context
response = chat.send_message("What are the free tier limits?")
print(response.text)
```

## 429 Errors: Causes, Diagnosis, and Solutions

**The short answer:** a 429 error means your project exceeded a rate limit. The most common cause is hitting RPM, and the fix is exponential backoff retry logic or switching to a model with looser limits.

When you get HTTP 429 RESOURCE_EXHAUSTED, first determine which limit fired. The three limits behave differently:

- **RPM exceeded**: errors appear in bursts, concentrate over a window, then recover
- **TPM exceeded**: errors correlate with request size; long prompts or long responses trigger it more
- **RPD exceeded**: errors accumulate through the day, then recover after Pacific midnight

Per [Google Cloud's official blog](https://cloud.google.com/blog/products/ai-machine-learning/learn-how-to-handle-429-resource-exhaustion-errors-in-your-llms), the standard way to handle 429 is exponential backoff with retries. Here's a recommended implementation using the tenacity library:

```python
from tenacity import retry, stop_after_attempt, wait_exponential
from google import genai

client = genai.Client()

@retry(
    stop=stop_after_attempt(5),           # retry up to 5 times
    wait=wait_exponential(min=1, max=60)  # exponential backoff: 1s, 2s, 4s, 8s, 16s...
)
def call_gemini_with_retry(prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return response.text

# Usage
try:
    result = call_gemini_with_retry("Explain the basics of quantum computing")
    print(result)
except Exception as e:
    print(f"Still failing after multiple retries: {e}")
```

Beyond retry logic, a few practical optimization strategies:

1. **Switch models**: if Gemini 2.5 Pro limits fire constantly, switch to Flash-Lite, which has 1,000 RPD
2. **Token management**: shorten input prompts and use leaner system prompts
3. **Batch requests**: merge several small requests into one batch
4. **Cache responses**: for identical or similar queries, cache previous responses to avoid repeat calls

For production scenarios needing higher quotas, consider the paid tier (Tier 1 immediately gives 300 RPM and 1,000 RPD), or use a unified gateway like GPT88 (https://gpt88.cc) to call with a predictable RMB balance. Exact quotas and prices are subject to the console.

## Multimodal Input Token Calculation and Quota Consumption

The Gemini API accepts text, image, audio, and video input, but different input types consume very different token counts. Understanding these rules is essential for planning quota usage.

**Image input** token consumption scales with resolution. A standard 1024×1024 image consumes about 1,290 tokens. Higher-resolution images consume more, but Gemini automatically downsizes large images. Under the 250,000 TPM free-tier limit, you could theoretically process ~190 standard images per minute, but the RPM limit will fire first in practice.

**Video input** is calculated by sample rate. At the default 1 FPS sampling, each second of video consumes 258 tokens. One minute of video is about 15,480 tokens. If the video has audio, video and audio tokens are counted separately. Free-tier users can upload up to 8 hours of YouTube video per day; paid users have no such limit.

**Audio input** is priced at $1.00/M tokens on Gemini 2.5 Flash (roughly 10 hours of audio), 10x cheaper than GPT-4o's $10.00/M tokens. This gives Gemini a clear cost advantage in audio processing.

Practical token optimization tips:

- Images: compress before sending, remove unnecessary detail
- Video: extract keyframes rather than processing the full video
- Long documents: use summaries or chunking instead of one giant input

## Gemini vs OpenAI vs Claude: Free Tier Comparison

Free-tier availability is a major consideration when choosing an AI API. Here's a side-by-side comparison of the three major platforms:

| Feature | Google Gemini | OpenAI | Anthropic Claude |
| --- | --- | --- | --- |
| **Genuine free API** | ✅ Yes | ❌ No (one-time credit only) | ❌ No |
| **Context window** | 1M tokens | 128K tokens | 200K tokens |
| **Credit card required** | Not for free tier | API requires card | API requires card |
| **Data usage** | Free tier data may be used for training | Paid not used for training | Paid not used for training |
| **China access** | Needs to bypass restrictions | Needs to bypass restrictions | Needs to bypass restrictions |

Gemini's unique advantage is being the only mainstream service with ongoing free API access. OpenAI provides a one-time credit for new accounts (usually $5-18, 90-day validity), but that's essentially a trial, not a free tier. Claude has no real free API tier either.

Capability-wise, each excels somewhere: Gemini leads in multimodal processing and context length, GPT-4 in general capability and ecosystem maturity, and Claude in long-document handling and coding. For budget-constrained developers, Gemini's free tier is the most practical entry point.

For scenarios needing multiple models at once, unified gateways like GPT88 provide a single interface — one API Key to call Gemini, GPT, Claude, and more, simplifying multi-model integration. Exact model coverage and pricing are subject to the gpt88.cc console.

## Region Restrictions and Access Options for Chinese Developers

The Gemini API free tier works in over 180 countries and regions, but with explicit region restrictions. Per Google policy, users in mainland China, Russia, and parts of the Middle East cannot use the free tier. Additionally, apps serving users in the EU, UK, and Switzerland must use the paid tier to meet data compliance requirements.

Chinese developers face layered technical obstacles. DNS filtering blocks resolution of generativelanguage.googleapis.com, deep packet inspection blocks HTTPS to Google IP ranges, and connections from restricted IPs are terminated immediately. Direct Gemini API access from mainland China is effectively impossible.

**VPN** is technically possible but risky. Using a VPN to access Gemini violates Google's ToS and can get your account banned. VPN stability and latency also hurt API reliability — typical latency is 280-680ms, often unacceptable for real-time apps.

**API gateway** is the more reliable alternative. These services deploy edge nodes in supported regions to provide compliant access for restricted regions. For example, GPT88 (https://gpt88.cc) offers direct connectivity in China, RMB billing, and one Key for Gemini, GPT, Claude, and more, solving the international-payment obstacle. Note these services suit scenarios needing stability and convenience; if you need official technical support or strict data compliance, use official channels compliantly. Exact quotas and prices are subject to the gpt88.cc console.

## Google AI Studio vs Vertex AI: Selection Guide

Google offers two ways to access Gemini models: Google AI Studio and Vertex AI. Both use the same underlying models but differ clearly in positioning, features, and use cases.

| Feature | Google AI Studio | Vertex AI |
| --- | --- | --- |
| **Positioning** | Developer / prototype | Enterprise / production |
| **Free tier** | ✅ Yes | ❌ No (billing required) |
| **Credit card required** | Not for basic use | Must enable Cloud Billing |
| **Enterprise security** | Basic | Advanced (VPC, audit logs, etc.) |
| **SLA** | None | Yes |
| **Data compliance** | Free tier data may be used for improvement | Paid data not used for training |
| **Migration cost** | - | Easy, unified SDK |

**Choose AI Studio for**: learning and experimentation, prototypes, personal projects, and cost-sensitive small apps. AI Studio offers an intuitive web UI for testing prompts, and the free tier covers development-stage needs.

**Choose Vertex AI for**: production deployments, enterprise security controls (VPC Service Controls, Access Transparency), data-residency requirements, and deep integration with other Google Cloud services.

Good news: Google recently unified the SDK for both platforms. The new Google Gen AI SDK supports both AI Studio and Vertex AI backends — migrating just requires changing initialization:

```python
# AI Studio (default)
client = genai.Client()

# Vertex AI
client = genai.Client(
    vertexai=True,
    project='your-project-id',
    location='us-central1'
)
```

## Free vs Paid: When to Upgrade?

**The short answer:** when you frequently hit 429, need to deploy production apps, or need higher concurrency, it's time to upgrade to the paid tier.

The free tier suits: learning the Gemini API and AI development, building proof-of-concept prototypes, low-frequency personal apps, and projects with low latency/reliability requirements. Within those, free-tier limits are usually acceptable.

Signals you should upgrade:

1. **Frequent 429 errors**: if your app often trips quota limits, user experience suffers badly
2. **Need higher RPM**: free tier caps at 15 RPM; paid Tier 1 immediately raises it to 300
3. **Production deployment**: any app serving real users should use the paid tier
4. **Data privacy requirements**: free tier data may be used for model improvement; paid tier won't
5. **SLA requirements**: Vertex AI offers enterprise SLAs; the free tier has none

**Upgrade ROI calculation example**:

Assume your app needs 500 API calls/day, each averaging 1,000 tokens:

- Free tier: only supports 100-250 calls (depends on model); the rest simply can't run
- Tier 1 paid (Gemini 2.5 Flash):
  - Input cost: 500 × 500 tokens × $0.30/M = $0.075/day
  - Output cost: 500 × 500 tokens × $2.50/M = $0.625/day
  - Monthly cost ≈ $21

For an app with 500 calls/day, ~$21/month buys stable service. By comparison, a unified gateway like GPT88 bills against a visible RMB balance, typically making budgets easier to control and removing free-tier quota anxiety. Which you choose depends on your need for official support and data compliance; exact pricing and quotas are subject to the gpt88.cc console.

## Quota Planning for Common Application Scenarios

Different app types have very different quota needs. Here's a planning reference for several common scenarios:

**Chatbots** are the most common case. A typical turn includes user input (~100 tokens), system prompt (~500 tokens), conversation history (variable), and model response (~500 tokens). Assuming ~1,500 tokens per turn:

| Usage intensity | Daily turns | Model choice | Free tier viability |
| --- | --- | --- | --- |
| Personal | 50-100 | Flash-Lite | ✅ Feasible |
| Small team | 200-500 | Flash | ⚠️ Marginal |
| Production | 1,000+ | Paid tier needed | ❌ Not feasible |

**RAG applications** usually need a bigger token budget because they include retrieved context. A typical RAG query may carry 5,000-20,000 tokens of context. The free tier's 250,000 TPM theoretically supports 12-50 RAG queries/minute, but RPM fires first. Use Flash-Lite for RAG to get the highest RPD.

**Batch processing** (document analysis, content generation) should use Google's Batch API, which cuts cost 50% and has dedicated queue management. The free tier supports Batch API too, but with separate queued-token limits.

**Quota formula**:

```text
daily_available_requests = min(RPD, 24*60*RPM, 24*60*TPM / avg_tokens_per_request)
```

Using Gemini 2.5 Flash:

- RPD = 250
- 24×60×10 RPM = 14,400
- 24×60×250,000/2,000 = 1,800,000 (assuming 2,000 tokens/request)

The real bottleneck is the RPD limit of 250.

## FAQ

### Does the Gemini API free tier require a credit card?

No. That's Gemini's key advantage over OpenAI and Claude. You can create an API Key in Google AI Studio and start using it without any payment info. You only enable Cloud Billing when upgrading to the paid tier. Note that free-tier data may be used by Google to improve services — choose the paid tier if that's a privacy concern.

### When do free-tier quotas reset?

Daily quota (RPD) resets at Pacific midnight (4:00 PM Beijing time; 3:00 PM during DST). Per-minute quota (RPM/TPM) is a rolling window — usage from the past minute from the current moment. If you trip RPM at 3:55 PM, waiting about a minute usually restores it.

### Do multiple API Keys add quota?

No. Rate limits are enforced at the Google Cloud project level, not per API Key. Multiple Keys in one project share the same quota pool. To get more quota, the only way is upgrading to the paid tier or creating separate Google Cloud projects.

### Does Gemini 3 Pro have a free tier?

No. Gemini 3 Pro Preview is paid API only: $2.00/M input and $12.00/M output. You can try Gemini 3 Pro free in the Google AI Studio chat UI, but that's not API access. For the newest free model, Gemini 3 Flash Preview is the better pick.

### How can Chinese developers use the Gemini API?

Due to region restrictions, developers in mainland China can't access the Gemini API directly. Workable options include: VPN (with account-ban risk), a unified gateway service (e.g., GPT88, https://gpt88.cc), or deploying an app on an overseas server that then calls the API. Each has trade-offs; choose based on your needs and compliance requirements.

### Do free and paid tiers differ in model capability?

No. Both tiers access the identical models with identical quality. The only differences are quota limits and data-use policy. The paid tier offers higher RPM/TPM/RPD and guarantees data won't be used for training.

## Summary and Next Steps

The Gemini API free tier gives developers a zero-cost way into AI development — a unique advantage in today's LLM market. Even though the December 2025 cuts reduced its practical value, it's still enough for learning, prototypes, and personal projects.

**Core recommendations**:

1. **Model choice**: prefer Flash-Lite on the free tier (1,000 RPD); switch to Flash when you need more capability
2. **Error handling**: always implement exponential backoff retry — the best practice for 429s
3. **Quota planning**: know your app's needs; if daily calls exceed ~250, upgrade or use an alternative
4. **When to upgrade**: production apps should use the paid tier; the free tier can't sustain real users

If you're looking for stable AI API access, check out [GPT88](https://gpt88.cc). It aggregates Gemini, GPT, Claude, and other mainstream models, bills against an RMB balance, and integrates easily (OpenAI SDK compatible — just swap the base_url), suiting developers who need stable access and cost optimization. Exact pricing is in the [GPT88 docs](https://doc.gpt88.cc).

**Useful links**:

- [Google official rate limits documentation](https://ai.google.dev/gemini-api/docs/rate-limits)
- [Google official pricing page](https://ai.google.dev/gemini-api/docs/pricing)
- Google Gen AI SDK documentation
- [Google AI Studio](https://aistudio.google.com/)
