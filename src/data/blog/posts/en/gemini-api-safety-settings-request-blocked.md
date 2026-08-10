---
title: Gemini API Safety Settings: A Complete Guide to Why Your Requests Are Blocked
description: A deep dive into why Gemini API safety settings block requests — the four Harm Categories, BLOCK_NONE configuration, PROHIBITED_CONTENT handling, default safety thresholds across model versions, and production debugging and fallback best practices.
date: 2026-01-22
category: API开发
tags: [Gemini API, Safety Settings, API开发, Google AI, 错误处理]
readTime: 15
relatedPath: /docs/api/errors/
relatedTitle: 错误码参考
---

When your Gemini API call suddenly returns an empty response, or you hit a `finishReason: SAFETY` error, you may feel confused: a perfectly normal business request is being blocked by the safety filter. More frustratingly, some requests still fail even after you set `BLOCK_NONE`.

This problem plagues many developers. Based on Google developer forum discussions, there were hundreds of support threads about safety settings in 2025 alone, and many production services were interrupted unexpectedly. The root cause: the Gemini API uses a complex multi-layer safety mechanism, and the official docs don't explain it clearly enough.

**A Gemini API request is blocked for three main reasons: an adjustable safety filter triggered (Harm Category detection), a non-adjustable built-in protection triggered (PROHIBITED\_CONTENT), or the request violates the terms of service.** Understanding the difference between the three is the key to solving the problem.

This article systematically dissects the Gemini API's safety filtering mechanism, helping you understand the real reason something got blocked, configure it correctly, and handle these situations gracefully in production. Whether you use Python, JavaScript, or the REST API, you'll find ready-to-use code examples.

## How Gemini's Safety Filtering Works

To solve safety-filter issues, you first need to understand the Gemini API's safety architecture. It has two layers: adjustable safety filters and non-adjustable built-in protections.

**Adjustable safety filters** are the part you control via the `safety_settings` parameter. Gemini analyzes every request and response, estimates the probability of harm in four categories (NEGLIGIBLE, LOW, MEDIUM, HIGH), then blocks based on the threshold you set. How strict this filter is, is entirely up to you.

**Non-adjustable built-in protections** are Google's floor for responsible AI. They target the most severe harm types, such as child-safety content (CSAM) and personally identifiable information (PII). No matter how you configure `safety_settings`, you can't get past them. When triggered, you'll see `block_reason: PROHIBITED_CONTENT`.

When a request is blocked, the API response carries key diagnostic info. `promptFeedback.blockReason` tells you whether the input prompt was blocked and why, while `candidates[0].finishReason` shows the state of response generation. If `finishReason` is `SAFETY`, the generated content tripped the safety filter; if it's `STOP`, generation completed normally.

**Understanding the difference between finishReason and blockReason is critical: blockReason is about input, finishReason is about output.** A request can have fine input but blocked output, and vice versa.

The `safety_ratings` array in the response lists the assessment for each harm category, including the category name, probability, and whether it was blocked. It's the most important data source for debugging safety issues, covered in detail later.

## The Four Harm Categories Explained

The Gemini API's adjustable safety filters cover four harm categories, each detecting a specific type of harmful content. Knowing their definitions helps you understand why seemingly harmless content gets intercepted.

**HARM\_CATEGORY\_HARASSMENT** detects negative or harmful comments targeting a person's identity or protected attributes. This includes derogatory remarks based on race, gender, religion, nationality, personal attacks, and content that could cause psychological harm. Notably, even quoting historical literature or academic discussion can trigger the filter if it contains such content.

**HARM\_CATEGORY\_HATE\_SPEECH** detects rude, disrespectful, or profane content. It's broader than harassment, covering generally offensive language that doesn't necessarily target a specific group. Many developers find that user input containing profanity frequently triggers this category, even in legitimate contexts (like content moderation systems).

**HARM\_CATEGORY\_SEXUALLY\_EXPLICIT** detects material involving sexual acts or other obscene content. Detection is relatively strict, and some medical or educational discussions may also trigger it. If your app handles health, biology, or similar topics, you may need to adjust this category's threshold.

**HARM\_CATEGORY\_DANGEROUS\_CONTENT** detects content that promotes, enables, or encourages harmful behavior. This includes instructions for making weapons, tutorials for illegal activities, and dangerous-behavior advice that could cause physical harm. Legitimate use cases like security research and red-team testing often hit walls here.

| Harm Category | What It Detects | Common Trigger Scenarios |
| --- | --- | --- |
| HARASSMENT | Negative comments about identity | Historical references, role-playing |
| HATE\_SPEECH | Rude or offensive language | User input containing profanity |
| SEXUALLY\_EXPLICIT | Sexually-related content | Medical discussions, health education |
| DANGEROUS\_CONTENT | Guidance for harmful behavior | Security research, red-team testing |

Each category's probability is graded in four levels: **NEGLIGIBLE**, **LOW**, **MEDIUM**, and **HIGH**. You set a blocking threshold based on these levels, deciding at what risk level content gets blocked.

## Safety Threshold Settings: From BLOCK_NONE to BLOCK_LOW_AND_ABOVE

Once you understand the harm categories, the next step is configuring safety thresholds. The Gemini API offers five threshold options, from loosest to strictest:

| Threshold Setting | API Value | Behavior |
| --- | --- | --- |
| Turn off filtering | `OFF` | Completely disables filtering for that category |
| Don't block | `BLOCK_NONE` | Always show, never block |
| Block only high risk | `BLOCK_ONLY_HIGH` | Block only HIGH-probability content |
| Block medium and above | `BLOCK_MEDIUM_AND_ABOVE` | Block MEDIUM and HIGH probability content |
| Block all risk | `BLOCK_LOW_AND_ABOVE` | Block LOW, MEDIUM, and HIGH probability content |

**When configuring safety settings, `BLOCK_NONE` is a safer choice than `OFF`.** Although they behave similarly, `BLOCK_NONE` keeps returning safety-rating metadata, which helps with analysis and logging later.

Full Python example for configuring safety settings:

```python
from google import genai
from google.genai import types
import os

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Define safety settings: set all categories to the loosest level
safety_settings = [
    types.SafetySetting(
        category=types.HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold=types.HarmBlockThreshold.BLOCK_NONE,
    ),
    types.SafetySetting(
        category=types.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold=types.HarmBlockThreshold.BLOCK_NONE,
    ),
    types.SafetySetting(
        category=types.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold=types.HarmBlockThreshold.BLOCK_NONE,
    ),
    types.SafetySetting(
        category=types.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold=types.HarmBlockThreshold.BLOCK_NONE,
    ),
]

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="your prompt content",
    config=types.GenerateContentConfig(safety_settings=safety_settings),
)

print(response.text)
```

JavaScript/Node.js is similar:

```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const safetySettings = [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
    threshold: "BLOCK_NONE",
  },
];

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  safetySettings,
});

const result = await model.generateContent("your prompt content");
console.log(result.response.text());
```

**Practical experience shows `BLOCK_ONLY_HIGH` solves most false positives for legitimate business scenarios.** Completely disabling the filter (`BLOCK_NONE`) is possible, but Google may review apps using loose settings — use it with care.

## Default Safety Settings Across Gemini Model Versions

A common pitfall: different Gemini model versions have different default safety settings. If your code doesn't explicitly set `safety_settings`, the model uses its defaults — which vary by version.

**Key fact: Gemini 2.5 and 3.0 default to `OFF` (disabled).** If you use these newer versions without specifying safety settings, the model won't proactively filter content. This is Google's design decision based on the idea that "advanced models are already trained to be safe."

Older model versions may be stricter by default. The table below summarizes default behavior by version:

| Model Version | Default Safety Threshold | Notes |
| --- | --- | --- |
| Gemini 3.0 series | OFF | No filtering by default |
| Gemini 2.5 series | OFF | No filtering by default |
| Gemini 2.0 series | BLOCK\_MEDIUM\_AND\_ABOVE | Moderate filtering by default |
| Gemini 1.5 series | BLOCK\_MEDIUM\_AND\_ABOVE | Moderate filtering by default |

This difference creates a common problem: migrating from an old version to a new one, if your code relies on default filtering to block inappropriate content, content governance can silently stop working. Conversely, downgrading from new to old can suddenly block requests that previously worked.

**Recommendation: always specify `safety_settings` explicitly, regardless of model version.** This ensures consistent behavior and avoids surprises from model upgrades or downgrades.

Another thing to watch: experimental models (with the `-exp` suffix). Their safety behavior can be unstable — multiple forum reports note that `BLOCK_NONE` on `gemini-2.0-flash-exp` failed to work during certain periods. For production, use stable (GA) models.

## PROHIBITED_CONTENT: The Built-In Protection You Can't Bypass

Even with all safety settings at `BLOCK_NONE`, some content still gets blocked. When you see `block_reason: PROHIBITED_CONTENT`, the request triggered Google's built-in protection, which no configuration can bypass.

**Built-in protections cover:**

-   **Child sexual abuse material (CSAM)**: any inappropriate content involving minors
-   **Personally identifiable information (PII)**: sensitive data that could leak an individual's privacy
-   **Seriously illegal content**: direct guidance on manufacturing large-scale harmful weapons, etc.
-   **Other core harms**: categories explicitly prohibited by Google's AI principles

These protections are Google's responsible-AI floor and can't be tuned via API parameters. If your scenario genuinely requires handling such content (security research, content moderation), you need to request special access through other channels — typically contacting the Google account team or switching to a monthly-invoice enterprise account.

**Important: not every safety block is a "false positive."** Sometimes a seemingly normal request contains an implicit sensitive pattern that trips built-in protection. Certain number combinations, encodings, or language patterns may match known violation patterns.

When you hit `PROHIBITED_CONTENT`, try:

1.  **Review the input**: check for patterns that might be misidentified as sensitive
2.  **Rephrase the request**: express the same intent differently
3.  **Split into segments**: break long text apart to locate the triggering passage
4.  **Contact support**: if you're confident it's a false positive, report it via the Google developer forum

## Debugging: Checking safety_ratings and prompt_feedback

When a request is blocked, the API response carries rich diagnostic information. Learning to read it is key to locating the problem. Here's a complete debugging method with code.

**Basic method for checking whether a request was blocked:**

```python
def check_response_safety(response):
    """Check response safety status and return detailed diagnostics"""

    # Check whether the prompt was blocked
    if hasattr(response, 'prompt_feedback') and response.prompt_feedback:
        pf = response.prompt_feedback
        if hasattr(pf, 'block_reason') and pf.block_reason:
            print(f"Prompt blocked, reason: {pf.block_reason}")
            return False

    # Check whether there are any candidates
    if not response.candidates:
        print("No response candidates, request may have been fully blocked")
        return False

    candidate = response.candidates[0]

    # Check the finish reason
    if candidate.finish_reason.name == "SAFETY":
        print("Response generation terminated for safety reasons")

        # Print detailed safety ratings
        if candidate.safety_ratings:
            print("\nSafety rating details:")
            for rating in candidate.safety_ratings:
                blocked_status = "BLOCKED" if rating.blocked else "PASSED"
                print(f"  {rating.category.name}: {rating.probability.name} {blocked_status}")

        return False

    elif candidate.finish_reason.name == "STOP":
        print("Request completed normally")
        return True

    else:
        print(f"Other finish reason: {candidate.finish_reason.name}")
        return True
```

**Identifying which harm categories were triggered:**

```python
def identify_triggered_categories(response):
    """Identify which safety categories were triggered"""
    triggered = []

    if not response.candidates:
        return triggered

    candidate = response.candidates[0]
    if not candidate.safety_ratings:
        return triggered

    for rating in candidate.safety_ratings:
        # Check whether blocked or high probability
        if rating.blocked or rating.probability.name in ["MEDIUM", "HIGH"]:
            triggered.append({
                "category": rating.category.name,
                "probability": rating.probability.name,
                "blocked": rating.blocked
            })

    return triggered
```

**The full debugging flow should be:**

1.  First check `prompt_feedback.block_reason` to determine whether it's an input or output problem
2.  For output problems, check `candidates[0].finish_reason`
3.  When `finish_reason` is `SAFETY`, walk `safety_ratings` to find the specific triggered category
4.  Based on the category, decide whether to adjust the safety threshold or modify the input
5.  Log everything for later false-positive analysis

## Production Best Practices

During development and testing, safety-filter issues can be solved by adjusting settings or editing input. In production, you need a complete strategy to handle these situations gracefully, keeping the service stable and user experience intact.

**Handling safety interruptions in streaming output**

In streaming scenarios, the safety filter can trigger mid-generation, cutting output short. Google's three recommended strategies:

1.  **Clear and explain**: on `finish_reason: SAFETY`, clear the emitted content and show a friendly error
2.  **Keep and mark**: keep the partial content but clearly mark the response as incomplete
3.  **Silent retry**: re-request with a different prompt to try for a complete response

```python
async def handle_streaming_with_safety(client, prompt, safety_settings):
    """Streaming output with safety handling"""
    collected_text = ""
    was_blocked = False

    try:
        response = await client.models.generate_content_stream(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(safety_settings=safety_settings),
        )

        async for chunk in response:
            if chunk.candidates and chunk.candidates[0].content:
                collected_text += chunk.candidates[0].content.parts[0].text

            # Check whether terminated for safety reasons
            if chunk.candidates and chunk.candidates[0].finish_reason:
                if chunk.candidates[0].finish_reason.name == "SAFETY":
                    was_blocked = True
                    break

        if was_blocked:
            # Strategy choice: use "clear and explain" here
            return {
                "success": False,
                "text": None,
                "error": "Response terminated by content safety policy, please try rephrasing your question"
            }

        return {"success": True, "text": collected_text, "error": None}

    except Exception as e:
        return {"success": False, "text": None, "error": str(e)}
```

**Designing error retry logic**

For non-streaming requests, implement exponential backoff retry. But note: retrying the same request usually doesn't change the safety-filter outcome — retries are better suited to network issues or transient errors.

```python
import time
from functools import wraps

def retry_with_backoff(max_retries=3, base_delay=1):
    """Retry decorator with exponential backoff (excluding safety blocks)"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    result = func(*args, **kwargs)

                    # Safety blocks are not retried
                    if hasattr(result, 'candidates') and result.candidates:
                        if result.candidates[0].finish_reason.name == "SAFETY":
                            return result  # return directly, no retry

                    return result

                except Exception as e:
                    if attempt == max_retries - 1:
                        raise
                    delay = base_delay * (2 ** attempt)
                    time.sleep(delay)

            return None
        return wrapper
    return decorator
```

**Designing fallbacks**

When the Gemini API can't return results due to safety filtering, design a fallback. Options include preset generic replies, switching to another model, or prompting the user to modify input.

For high-availability production environments, an API gateway is a viable approach. Such services can automatically switch to a backup node when the primary API is unavailable, improving stability. For example, [GPT88](https://gpt88.cc) offers an OpenAI-SDK-compatible unified interface supporting multiple models including Gemini, with multi-node architecture for availability and optimized mainland-China latency. This fits apps that need multi-model support or run in regions with unstable networks.

## FAQ

**Q1: Why am I still blocked after setting BLOCK_NONE?**

Two reasons: (1) you triggered a non-adjustable built-in protection (returns `PROHIBITED_CONTENT`) that no API setting can lift; (2) you're using an experimental model (with the `-exp` suffix) whose safety behavior is unstable. Use stable models and check `block_reason` to determine the exact cause.

**Q2: How do I tell SAFETY and PROHIBITED_CONTENT apart?**

`SAFETY` means an adjustable safety filter triggered — you can lower filter strictness by modifying `safety_settings`. `PROHIBITED_CONTENT` means a non-adjustable built-in protection triggered — no configuration bypasses it. The way to tell: check `prompt_feedback.block_reason`. For `SAFETY`, adjust settings; for `PROHIBITED_CONTENT`, modify content or request special permission.

**Q3: Are safety settings shared across models?**

The parameter syntax is universal, but the **defaults differ**. Gemini 2.5/3.0 default to `OFF` (no filtering), while 1.5/2.0 default to `BLOCK_MEDIUM_AND_ABOVE`. Explicitly set `safety_settings` in code to keep behavior consistent across model versions.

**Q4: How do I recover after streaming output is interrupted?**

Once streaming output is cut off by `finish_reason: SAFETY`, transmitted content can't continue. Recommended: save the partial content received, show the user a clear message, and offer a re-request option. Automatic retry usually doesn't help, because the same input produces the same safety judgment.

**Q5: How can I access Gemini API stably from China?**

Due to network restrictions, mainland China direct access to the Gemini API may have high latency and unstable connections. Solutions include cloud-server relays, proxies, or an API gateway. Platforms like GPT88 have optimized mainland nodes and support calling multiple models with one API key, serving as a stable-access alternative. Exact pricing and quotas are confirmed in the [gpt88.cc console](https://gpt88.cc).

## Summary

The Gemini API's safety filtering is complex, but understanding how it works makes it manageable. Remember the core points:

1.  **Distinguish the two block types**: adjustable safety filters (SAFETY) and non-adjustable built-in protections (PROHIBITED\_CONTENT)
2.  **Configure explicitly**: don't rely on defaults; always set `safety_settings` in code
3.  **Choose the right threshold**: `BLOCK_ONLY_HIGH` fixes most false positives; fully disabling needs care
4.  **Use the debug info**: `safety_ratings` and `prompt_feedback` are key to locating problems
5.  **Design fallbacks**: production needs to handle safety blocks gracefully
