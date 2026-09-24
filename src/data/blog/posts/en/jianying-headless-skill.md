---
title: Jianying Headless: Generate, Modify, and Export Editable Jianying Projects with an Agent Skill
description: A practical guide to Jianying Headless on Apple Silicon macOS, covering editable drafts, the yichen-jianying-edit Skill, plan validation, media tracks, isolated edits, and verified export.
date: 2026-09-19
category: AI Tools Guide
tags: [Jianying, Agent Skill, video editing, headless, macOS, Apple Silicon, editable project]
readTime: 18
relatedPath: /docs/blog/codex-hyperframes-video-content-workflow/
relatedTitle: Automate Video Production with Codex and HyperFrames
---

Most AI video workflows end with an MP4. That is useful for publishing, but it is not the same as handing over a project that another editor can open, adjust, and export again. Jianying Headless is aimed at the second outcome: generating and editing native, editable Jianying Professional projects through scripts and an Agent Skill.

The project discussed here is [mcncarl/jianying-headless](https://github.com/mcncarl/jianying-headless), used with the `yichen-jianying-edit` Skill. The repository, supported Jianying versions, macOS requirements, and export behavior can change; check the current README before installing. The workflow below describes an engineering boundary, not a guarantee that every machine or account will behave identically.

## The Deliverable Is an Editable Project

The useful distinction is:

```text
source media + structured plan
  → native Jianying project
  → human or Agent edits
  → verified export
```

An exported MP4 is a delivery artifact. The Jianying project is the working artifact. Keeping both makes it possible to revise timing, captions, clips, transitions, and audio without rebuilding the whole video from scratch.

## Project Versus Skill

The headless project provides the file-format and automation capabilities. The Skill gives an Agent an operating procedure: where to find inputs, how to build a plan, which commands to run, what to verify, and when to stop for human review.

The Skill should not be treated as a magic “make a video” button. It is a repeatable interface around a real editing tool, with explicit inputs and observable intermediate files.

## What the Skill Can Coordinate

A practical workflow can cover:

- creating a new project from a structured plan;
- importing local video, image, audio, and subtitle assets;
- placing clips on multiple tracks;
- updating an existing project in an isolated copy;
- validating media and timing before opening Jianying;
- exporting a native, editable project; and
- rendering a final H.264/AAC MP4 for delivery.

The Agent should report paths, durations, skipped assets, and validation failures rather than silently substituting media or pretending that an incomplete project is ready.

## Prerequisites Are Part of the Contract

The source project describes a macOS Apple Silicon environment with requirements such as:

| Requirement | Why it matters |
| --- | --- |
| Apple Silicon Mac | Matches the tested desktop environment |
| Supported macOS version | Native Jianying and automation compatibility |
| Supported Jianying Professional version | Project schema and export behavior |
| Python 3.9+ | Runs the automation scripts |
| `ffmpeg` and `ffprobe` | Media conversion and factual inspection |
| Xcode Command Line Tools | Native build and command-line dependencies |

Do not infer compatibility from a successful script invocation alone. Check the installed Jianying version, the actual media stream, and the generated project contents.

## Install and Run the Shortest Path

Start with a two-second test project. It should contain one known-good clip and one audio track, then be opened in Jianying before any larger batch is attempted.

```text
plan.json
  → create project
  → inspect project structure
  → open in Jianying
  → export a short snapshot
  → inspect the exported file with ffprobe
```

The shortest successful path is deliberately small. It proves that the machine can create a valid project, that Jianying can read it, and that the export path works.

## Use a Structured Plan

The source project uses a `jy14-headless-plan/v1` style plan. A plan should state the project name, canvas and frame settings, source files, track placement, timing, captions, and output location. Keep the plan reviewable and versioned instead of embedding all decisions inside a one-off shell command.

Example shape:

```json
{
  "schema": "jy14-headless-plan/v1",
  "project": { "name": "demo", "width": 1080, "height": 1920, "fps": 30 },
  "tracks": [
    {
      "type": "video",
      "items": [{ "path": "assets/intro.mp4", "startMs": 0, "durationMs": 2000 }]
    }
  ]
}
```

The exact schema belongs to the current repository. Treat this snippet as an illustration, not a promise that every version accepts these fields unchanged.

## Tracks, Media, and Timing

Before creating a project, inspect each asset:

- confirm the file exists and its signature matches its extension;
- read duration, frame rate, dimensions, and audio streams with `ffprobe`;
- normalize incompatible formats before project generation; and
- keep source and generated assets in separate directories.

Timing should be explicit. A clip's start, duration, trim, speed, and track should be represented in the plan so a reviewer can explain why a frame appears at a given point.

## Modify an Existing Draft in an Isolated Copy

Never use the only copy of a customer or production project as an experiment. Copy the draft, record the source path and revision, apply one change set, and compare the resulting project and export.

This also makes rollback straightforward. If an Agent produces a bad caption layout or moves an audio track, the original draft remains available for comparison.

## Verify the Exported Snapshot

An export command returning successfully is not enough. Verify at least:

1. Jianying can open the generated project without a repair prompt.
2. The expected tracks, clips, captions, and audio are present.
3. The exported file exists and has the intended duration and dimensions.
4. `ffprobe` reports the expected video and audio codecs.
5. The first and last seconds render correctly, with no missing media or clipped captions.

For a production workflow, keep the plan, generated project, validation report, and exported snapshot together. The report should record what was checked and what remains a human decision.

## Summary

Jianying Headless is most valuable when the deliverable is an editable project, not just a rendered file. The Agent Skill helps turn that capability into a repeatable process, but the process still needs version checks, media inspection, isolated edits, and visual acceptance.

Start with a tiny project, prove the full path, and only then add multiple tracks, complex transitions, or batch generation. Read the [current Jianying Headless repository](https://github.com/mcncarl/jianying-headless) and the Skill's current instructions before use.
