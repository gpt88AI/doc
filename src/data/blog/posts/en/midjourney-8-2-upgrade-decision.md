---
title: Should You Upgrade to Midjourney V8.2? Run This 8-Cell Acceptance Board First
description: V8.2 became the default version on 2026-07-24, but existing projects should not migrate on a single pretty sample. Use 8 real work prompts, frozen control settings, and a two-retry budget to reach a keep, re-test, or roll-back decision.
date: 2026-07-29
category: 模型对比
tags: [Midjourney V8.2, Midjourney V8.1, Workflow Migration, Image Acceptance, Personalization]
readTime: 14
relatedPath: /docs/guides/agent-image-quality-crop-guide/
relatedTitle: Agent Image Quality & Crop Guide
---

Midjourney V8.2 became the default version on July 24, 2026. For brand-new exploration projects, you can start directly on V8.2; for posters, product shots, character series, or brand visuals that are already shipping steadily, do not batch-migrate just because one sample looks prettier. The safest first step is to extract 8 prompts from your own accepted work, freeze aspect ratio, Raw, stylize, a usable seed, Personalization configuration, and SD/HD mode, then record the deliverable-level differences between V8.1 and V8.2 row by row.

This is not a finished Midjourney benchmark. This article does not access your account, has not generated these 8 sets of images, and has not observed retry counts, so every evidence cell below stays at "not run/unknown." What it provides is a migration acceptance pack you can actually execute: at most two retries per row, ending in one of four states — "keep V8.2," "re-test a single variable," "roll back to the old version," or "unknown/not run."

## A 30-Second Check: Do You Need to Upgrade, or to Accept?

| Your situation | What to do now | Why |
| --- | --- | --- |
| New project, no old-version baseline | Start with default V8.2 for v1, and save full parameters | No old deliverables to protect, but still keep a reproducible record |
| Old project shipping steadily | Run this article's 8 prompts first; do not swap the default version | Aesthetic changes may improve or may break styles clients already accept |
| Rely on Personalization | Test both old and new profiles, not just one | Midjourney officially recommends trying both old and new Personalization profiles on V8.2 |
| Rely on Omni Reference | Stop and verify along the V7 path | The current official docs place Omni Reference on the V7 path; do not label results as native V8.2 |
| Comparing GPT Image 2 vs. Midjourney | Split "version migration" and "cross-model selection" into two tests | The controls, input capabilities, and failure costs differ; mixing them yields no credible winner |

If a task has no historical baseline, V8.2 output only tells you "can this work," not "did the upgrade get better." If you do have a baseline but change the prompt, aspect ratio, profile, or execution mode during comparison, the result can only be labeled "needs re-test," not a V8.2 win or loss.

## Official Notes Describe Direction, Not Your Migration Decision

Midjourney's [release notes](https://updates.midjourney.com/version-8-2/) summarize V8.2's focus as aesthetics, image quality, and Personalization, and encourage trying old and new Personalization profiles. The official [version documentation](https://docs.midjourney.com/hc/en-us/articles/32199405667853-Version) also states that V8.2 became the default version on July 24, 2026.

These are the current product state and official intent, not your project's acceptance result. Third-party pages often write "more detail" or "better prompt adherence" as a verdict, but the same change can make product materials more believable or make surreal images that relied on serendipity too literal. The community simultaneously reports "more detail" and "less surprise"; that proves the migration question is real, not that one experience dominates.

So the unit of judgment should not be a homepage hero sample but a production task that already defines its failure conditions.

## Freeze 6 Categories of Controls Before Starting

Put the old-version accepted outputs beside you, then record these fields for each prompt. Without records, do not start scoring.

1. **Task-critical constraints**: subject count, required objects, text that cannot change, pose, camera, and composition.
2. **Aspect and style controls**: aspect ratio, Raw, stylize, style reference, or moodboard.
3. **Randomness controls**: keep a usable seed; if exact reproduction is impossible, write "closest reproducible control."
4. **Personalization pairing**: if your workflow uses Personalization, record old and new profiles separately.
5. **Execution mode**: state SD or HD explicitly, plus any other visible mode; do not merge different modes into one version conclusion.
6. **Delivery check method**: define final size and inspection zoom first, e.g., "ad deliverables: check text and hands at 100%, check visual hierarchy at 25%."

The official compatibility table describes V8.1 and V8.2 seeds as roughly 99% the same, not pixel-identical. A shared seed reduces random variation but does not turn two images into a scientific control where only one pixel-level variable changed. The current compatibility table also marks Quality and Draft Mode as unsupported; if these controls appear in the UI or old prompts, record the actual path instead of writing a single attempt as "V8.2 high-quality mode verified."

## The 8-Prompt Migration Acceptance Pack

Select 8 prompts from your real work over the past 30 days, not 8 showcase prompts that produce easy pretty images. The "prompt slots" below give selection logic; replace the brackets with your own full prompts and attach the old accepted output. When you first open this table, every status should be "not run/unknown."

| # | Prompt slot copied from real work | Constraints this row must hold | V8.1/old evidence | V8.2 evidence | Retries used | Current status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `[accepted single-subject hero prompt]` | face, key clothing pieces, camera distance, key light direction | not pasted/unknown | not run/unknown | 0/2 | not run/unknown |
| 2 | `[product prompt with labels or packaging]` | product outline, label position, color, material, part count | not pasted/unknown | not run/unknown | 0/2 | not run/unknown |
| 3 | `[multi-person or multi-subject narrative scene]` | person count, relative positions, action relationships, background layers | not pasted/unknown | not run/unknown | 0/2 | not run/unknown |
| 4 | `[prompt where hands touch tools/objects]` | finger count, contact points, grip direction, tool shape | not pasted/unknown | not run/unknown | 0/2 | not run/unknown |
| 5 | `[prompt relying on materials and complex light]` | metal/glass/fabric distinction, reflection direction, shadow continuity | not pasted/unknown | not run/unknown | 0/2 | not run/unknown |
| 6 | `[prompt deliberately seeking metaphor or surreal surprise]` | core metaphor stays readable without degrading into literal collage | not pasted/unknown | not run/unknown | 0/2 | not run/unknown |
| 7 | `[brand-series prompt relying on sref/moodboard]` | brand colors, compositional rhythm, brushstroke/grain, series consistency | not pasted/unknown | not run/unknown | 0/2 | not run/unknown |
| 8 | `[high-frequency prompt relying on Personalization]` | record old and new profiles separately; target aesthetic must not drift | not pasted/unknown | not run/unknown | 0/2 | not run/unknown |

These 8 rows are not eight fixed industries but eight risk slots. If your work has no product packaging but heavily depends on architectural perspective, replace row 2 with your hardest architecture task; if you never use Personalization, replace row 8 with a high-frequency delivery task and write "no Personalization used" in the config. Do not test irrelevant capabilities just to fill the template.

### Four Acceptance Checks Per Row

| Acceptance item | What passing looks like | How to record failure |
| --- | --- | --- |
| Subject and task constraints preserved | Required subjects, counts, actions, text, or product features all present, with nothing newly added that would cause rejection | Write the specific objects lost, replaced, or added; do not write "feels off" |
| Detail coherence at delivery zoom | Hands, edges, materials, perspective, and contact points still hold at the final delivery size | Note the zoom level and exact broken spots |
| Prompt adherence and composition | Visual hierarchy, camera, spatial relationships, and hard constraints in the prompt are recognizable | Distinguish "different aesthetic preference" from "explicit instruction not fulfilled" |
| Personalization fit | When a profile is used, output still matches the team's defined color, texture, and composition preferences | State whether you tested old or new profile; if unused, write "N/A" |

Do not mix aesthetic preference with production failure. "I prefer V8.1's serendipity" is an aesthetic judgment; "the three-person scene is missing one person" is prompt-adherence failure; "packaging text changed" is task-critical-constraint failure; "glass edge breaks at 100% zoom" is detail-coherence failure. Separating them tells the team whether to accept a new style, change one variable, or roll back.

## How to Run It: At Most Two Retries Per Row

For each row, execute in this order:

1. Open the accepted output on V8.1 or the current stable version and fill in the complete prompt and visible parameters of the time. If you cannot find the parameters, do not guess; write "baseline incomplete."
2. On V8.2, keep the prompt, aspect ratio, Raw, stylize, usable seed, profile, and SD/HD mode identical. Record any change beyond the version.
3. Check the four acceptance items at delivery size; do not first pick the prettiest cell in a 2x2 grid and then justify it.
4. On first failure, judge whether an isolatable variable exists. Only when you can name that variable clearly is the first retry allowed.
5. If it still fails after the second retry, stop that row. Do not hide migration cost behind infinite rerolls.

Two is the **retry cap per row**, not a quota you must spend. Stop when the first pass succeeds; if a retry happened only because you accidentally enabled a different profile, record it as a "test-configuration correction" rather than deleting the failure from the log.

## Keep, Re-Test, or Roll Back: Close with Hard Gates

### Keep V8.2

Only label this workflow "keep V8.2" when all of the following hold at once:

- All 8 rows preserve task-critical constraints;
- No critical row fails on detail coherence or prompt adherence;
- When Personalization is used, the new version maintains or improves the team's desired aesthetic;
- No row exceeds the two-retry budget.

This is not a "V8.2 is generally stronger" conclusion; it only means it passed the migration gate for this set of workloads.

### Re-Test a Single Variable

Enter "re-test a single variable" in these cases:

- Evidence is missing and a judgment cannot be made;
- A control accidentally changed during testing;
- A non-critical row failed and an explainable, isolatable variable exists.

The next round may only change one recorded variable, e.g., switching only between old/new Personalization profiles, or restoring the original stylize. Do not change prompt, aspect ratio, and profile together, or you still cannot know the cause.

### Roll Back to the Old Version

If any of these occur, label the current production workflow "roll back":

- A critical task still loses required content or structural coherence after two retries;
- Multiple rows exhaust the two-retry budget;
- The new default breaks a functional path the workflow depends on.

Rollback is risk control for the current project, not a permanent verdict on V8.2. After a new project, different subject matter, or official compatibility changes, you can open a fresh acceptance board.

### Not Run/Unknown

Empty evidence, inaccessible account outputs, or unsaved old parameters can only be recorded as "unknown/not run." Unknown counts as neither success nor failure, and must never be filled in as passing just to make 8 rows look complete.

## When Should GPT Image 2 Enter This Board?

If your original question is "Midjourney 8.2 vs. GPT Image 2, which is better," first confirm which decision you are actually making:

- **Migrating an existing Midjourney project**: first complete this article's V8.1/old-version vs. V8.2 acceptance. GPT Image 2 is not part of this version-migration question.
- **Selecting a generation route for a new task**: open a separate cross-model test giving both routes the same business goal, same input assets, same delivery size, same rejection conditions, and comparable retry budgets.
- **Editing existing images or continuing specific input assets**: first verify what inputs, editing, and reference capabilities each route actually supports, then design the comparison; do not assume that the same-sounding "image generation" means the same contract.

This article has no Midjourney V8.2 vs. GPT Image 2 outputs under identical inputs and acceptance criteria, so it will not declare a universal winner. In particular, do not directly compare one model's best 2x2-grid cell against another model's single result, and do not treat a best sample after infinite rerolls as a single pass.

The current GPT88 configuration also does not provide a Midjourney V8.2 execution route. To run the acceptance above, complete it in the official Midjourney interface; do not mistake a third-party workbench or this article's instructions for GPT88 generating Midjourney output. If you only want to quickly map the boundaries of free image tools without sensitive assets, see [Free AI Image Generators Without Sign-Up](/en/docs/blog/ai-image-generator-free-no-sign-up/); that is a different task and does not replace Midjourney migration acceptance.

## FAQ

### Is Midjourney V8.2 the default version now?

Yes. The current Midjourney version documentation states that V8.2 shipped as the default version on July 24, 2026. Default does not mean your old project has passed migration; production projects should still keep the old-version baseline and run acceptance.

### Does the same seed guarantee V8.1 and V8.2 are identical?

No. The current official compatibility table describes V8.1 and V8.2 seeds as roughly 99% the same, not pixel-identical. A seed is a control for reducing random variation, not absolute proof that "only the version changed."

### Can I validate V8.2 with Quality or Draft Mode?

Per the official compatibility table checked on July 29, 2026, the V8.1 and V8.2 rows mark Quality and Draft Mode as unsupported. The UI and docs may change; re-verify before running. Currently you cannot promote one attempt with those parameters as a verified V8.2 mode.

### Is Omni Reference a native V8.2 path?

No. The current official [Omni Reference documentation](https://docs.midjourney.com/hc/en-us/articles/36285124473997-Omni-Reference) places it on the V7 path. When you need that capability, record it under the V7 workflow and do not label the output as a native V8.2 result.

### Can I decide to upgrade if one of the 8 rows never ran?

You cannot label the whole workflow as passed. You can narrow the conclusion, e.g., "so far only two product-still-life tasks were validated," but unrun rows remain unknown. If an unrun row is a critical delivery type, keep the old baseline until evidence is complete.

### Does this board prove V8.2 is better than GPT Image 2?

No. It only handles Midjourney version migration. A cross-model conclusion needs reviewable outputs under the same business goal, identical inputs, and rejection conditions; this article did not run that test and kept no result files for review.

## Final Execution Order

Today, do only three things: copy 8 real work prompts, freeze the 6 control categories, and write each row's failure conditions before the generate button. After testing, enter keep, single-variable re-test, roll back, or unknown per the gates. What you get is not a "which looks better" vote but a migration decision the team can review, stop, and safely retract.

## Further Reading

- [Free Online Gemini Image Generation: Nano Banana 2 Official Entries and Third-Party Tool Checks](/en/docs/blog/nano-banana-2-online-free/)
- [Generating High-Quality Photos of Your Own Face: Choose the Route First, Then Compare Models](/en/docs/blog/best-ai-model-for-pictures-with-your-face/)
- [Free AI Image Generators Without Sign-Up](/en/docs/blog/ai-image-generator-free-no-sign-up/)
