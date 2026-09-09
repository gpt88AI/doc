import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'

const SKILL = `---
name: gpt-image-2
description: Generate images, posters, illustrations, UI visuals, and avatars with GPT88.
tools: Bash
---

# GPT Image 2 Generator

Use the GPT88 Images API when the user needs a real image file. Do not pretend that a text model or an
SVG/HTML response is an image-generation result.

Default configuration:
- Model: gpt-image-2
- Base URL: https://img.gpt88.cc
- Endpoint: /v1/images/generations
- size: 1024x1024
- quality: high
- n: 1

Execution:
1. Expand a short prompt into a concrete visual brief
2. Read GPT88_API_KEY from the environment
3. Call the Images API
4. Decode b64_json
5. Save to output/imagegen/
6. Return the final file path`

const ENV = `export GPT88_API_KEY="your-gpt88-api-key"
export OPENAI_API_KEY="$GPT88_API_KEY"
export OPENAI_BASE_URL="https://img.gpt88.cc"`

const CURL = `mkdir -p output/imagegen

curl -s https://img.gpt88.cc/v1/images/generations \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-image-2",
    "prompt": "A dark technology cover for an API documentation site, no text",
    "size": "1024x1024",
    "quality": "high",
    "n": 1
  }' > output/imagegen/response.json

jq -r '.data[0].b64_json' output/imagegen/response.json | base64 -d > output/imagegen/doc-cover.png`

const TROUBLESHOOTING = `jq: command not found
  Install jq or parse JSON with Node/Python.

base64: invalid option -- d
  On macOS, use base64 -D.

401 Unauthorized
  Check that GPT88_API_KEY exists, is complete, and has available balance.

Empty image
  Inspect response.json for an error body before decoding b64_json.`

export default function CodexGptImage2SkillPageEn() {
  return (
    <DocPage
      path="/docs/guides/codex-gpt-image-2-skill"
      title="Create a GPT-Image-2 Skill for Codex"
      description="Create a small Codex skill that routes real image-generation requests to the GPT88 Images API and saves the resulting files locally."
      headings={[
        { id: 'why', text: 'Why use a skill', level: 2 },
        { id: 'prepare', text: 'Prepare the API key', level: 2 },
        { id: 'create-skill', text: 'Create the skill', level: 2 },
        { id: 'test', text: 'Test with cURL', level: 2 },
        { id: 'use-in-codex', text: 'Use it in Codex', level: 2 },
        { id: 'best-practices', text: 'Prompt and cost practices', level: 2 },
        { id: 'troubleshooting', text: 'Troubleshooting', level: 2 },
      ]}
    >
      <Callout tone="info" title="A skill turns image generation into a repeatable tool flow">
        <p>
          Codex is strong at code, files, and commands, but it will not automatically route every request
          for a real image file to an image model. A skill makes prompt completion, API calls, file saving,
          and output reporting explicit.
        </p>
      </Callout>

      <h2 id="why">Why use a skill</h2>
      <p>
        Asking a text model to “generate an image” may produce a prompt, SVG, or HTML instead of a real
        image. A dedicated skill keeps the text model responsible for planning and uses the Images API for
        the actual bitmap output.
      </p>

      <h2 id="prepare">Prepare the API key</h2>
      <p>
        Create an API key in the <a href="https://gpt88.cc" target="_blank" rel="noreferrer">GPT88 Console</a>
        and keep it in a local environment variable or secret manager. Never commit it or put it in frontend code.
      </p>
      <CodeBlock lang="bash" filename="env" code={ENV} />
      <Callout tone="warn" title="Keep credentials out of the repository">
        <p>Use local environment variables, a secret manager, or CI secrets. Do not place the key in SKILL.md.</p>
      </Callout>

      <h2 id="create-skill">Create the skill</h2>
      <p>
        Create <code>~/.codex/skills/gpt-image-2/SKILL.md</code>. A single SKILL.md is enough for the basic
        workflow.
      </p>
      <CodeBlock lang="markdown" filename="SKILL.md" code={SKILL} />

      <h2 id="test">Test with cURL</h2>
      <p>
        Run one minimal request before asking Codex to call the skill automatically. This verifies the key,
        balance, network route, JSON parser, and base64 utility independently.
      </p>
      <CodeBlock lang="bash" filename="test-gpt-image-2.sh" code={CURL} />

      <h2 id="use-in-codex">Use it in Codex</h2>
      <p>
        Start a new Codex session after creating the skill. Ask Codex to use <code>gpt-image-2</code>, specify
        the subject, style, size, and output directory, and ask it to preserve older files instead of overwriting them.
      </p>
      <CodeBlock lang="text" filename="prompt examples" code={`Use the gpt-image-2 skill to create a dark technology cover for the GPT88 API docs, with no text.\n\nUse the gpt-image-2 skill to create three social-media background images about AI token usage. Save them under output/imagegen/ and do not overwrite existing files.`} />

      <h2 id="best-practices">Prompt and cost practices</h2>
      <ul>
        <li>Start with 1024x1024 and n=1 to validate direction before batch generation.</li>
        <li>Describe subject, scene, composition, light, material, and exclusions instead of stacking quality adjectives.</li>
        <li>For posters and UI visuals, reserve clean space for later copy.</li>
        <li>Use a text model for prompt refinement; call gpt-image-2 only when a real image is needed.</li>
        <li>Review a prompt list before starting a costly batch.</li>
      </ul>

      <h2 id="troubleshooting">Troubleshooting</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />
      <p>
        For the underlying API contract, see the <Link to="/docs/api/images/">image generation API guide</Link>.
        For model capabilities, open the <Link to="/models/gpt-image-2/">gpt-image-2 model page</Link>.
      </p>
    </DocPage>
  )
}
