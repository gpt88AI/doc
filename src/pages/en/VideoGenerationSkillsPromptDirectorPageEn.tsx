import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const MODES = `Mode A: Creative
- Input: a novel, script, scene, or creative brief
- Flow: confirm gates -> storyboard draft -> prompts only for approved shots

Mode B: Diagnosis
- Input: an existing prompt that produces weak results
- Flow: inspect the debug-prompt workflow -> identify the failure -> rewrite the prompt`

const FLOW = `1. Read cheatsheet.md
2. Read confirmation-gates.md
3. Ask for aspect ratio, tool, style, shot density, and other missing inputs
4. Return a storyboard draft
5. Wait for the user to confirm shot numbers
6. Generate prompts only for confirmed shots
7. Open at most one or two references when needed`

const GATES = `Required confirmations:
- output_type: image or video
- aspect_ratio: 16:9 / 9:16 / 1:1
- target_tool: Midjourney / GPT Image / Gemini / Seedance / Kling
- visual_style: realistic / anime / Chinese-inspired / commercial / documentary
- camera_tone: candid / cinematic / emotional / product still life
- shot_granularity: direct prompts or storyboard first`

const PROMPT_SKELETON = `1. Camera position, shot size, and focal length
2. Light direction and time of day
3. Environment plus foreground, middle ground, and background
4. Subject action or state change
5. Small but important visual details
6. Negative constraints and exclusions`

const VIDEO_RULES = `For image-to-video, write only:
- the main action
- the camera movement
- changes over time

Do not repeat:
- 8K / cinematic / hyper-realistic claims
- lighting and style that already exist in the first frame
- conflicting camera instructions`

const DEBUG = [
  'Fake expression: replace broad emotions with a small emotional cue and a physical action chain.',
  'Fake camera move: keep one dominant movement instead of mixing a smooth push-in with aggressive handheld motion.',
  'Drifting scene: build a spatial master first, then split it into shots.',
  'Broken product: redraw keyframes and send the keyframe sequence back to the video model.',
  'Dirty lighting: preserve a well-composed failed take and repair the action instead of regenerating the whole frame.',
]

export default function VideoGenerationSkillsPromptDirectorPageEn() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-prompt-director"
      title="Prompt Director: A Practical Guide"
      description="Learn how prompt-director turns stories, scripts, scenes, and creative briefs into storyboards and executable image or video prompts."
      headings={[
        { id: 'position', text: 'What it does', level: 2 },
        { id: 'modes', text: 'Two operating modes', level: 2 },
        { id: 'flow', text: 'Standard workflow', level: 2 },
        { id: 'gates', text: 'Why confirmation gates matter', level: 2 },
        { id: 'references', text: 'How to layer references', level: 2 },
        { id: 'precision', text: 'Prompt precision rules', level: 2 },
        { id: 'video', text: 'Writing image-to-video prompts', level: 2 },
        { id: 'debug', text: 'Debugging and recovery', level: 2 },
      ]}
    >
      <Callout tone="info" title="The foundation layer of video-generation-skills">
        <p>
          The other skills focus on vertical scenarios. <code>prompt-director</code> provides the
          shared structure that turns narrative intent into controllable prompts.
        </p>
      </Callout>

      <h2 id="position">What it does</h2>
      <p>
        Prompt-director converts a novel, script, scene description, or creative brief into an
        executable prompt. When essential settings are missing, it asks questions first instead of
        guessing. This prevents a polished prompt from being built on the wrong aspect ratio, tool,
        output type, or shot density.
      </p>

      <h2 id="modes">Two operating modes</h2>
      <CodeBlock lang="text" filename="modes" code={MODES} />

      <h2 id="flow">Standard workflow</h2>
      <CodeBlock lang="text" filename="flow" code={FLOW} />
      <p>
        The important sequence is confirm, draft, approve, and then generate. It avoids producing
        twenty prompts when the user only wanted to test two shots.
      </p>

      <h2 id="gates">Why confirmation gates matter</h2>
      <p>
        A short plot summary does not contain enough information for a final prompt. Confirm the
        output form, aspect ratio, target tool, visual style, camera tone, and shot granularity first.
      </p>
      <CodeBlock lang="text" filename="confirmation-gates" code={GATES} />
      <ul>
        <li>Ask first when the user did not say whether the result is an image or video.</li>
        <li>Ask first when landscape or portrait output is unclear.</li>
        <li>Recommend a storyboard draft when the plot has no camera direction.</li>
      </ul>

      <h2 id="references">How to layer references</h2>
      <p>
        Do not load every reference into the context at once. Read the cheatsheet for frequent
        rules, use workflows for task-specific procedures, and open references for focused topics
        such as composition, lighting, camera movement, consistency, or color.
      </p>

      <h2 id="precision">Prompt precision rules</h2>
      <p>
        Replace abstract adjectives with visible constraints. Specify camera language, light direction,
        color temperature, composition, depth of field, and exclusions. Write the subject and base
        lighting before adding atmosphere words; negative prompts should target a concrete failure
        such as plastic skin, dirty light, or unwanted framing.
      </p>
      <ul>
        <li>Pair camera angle with focal length so the visual intent is testable.</li>
        <li>Use small physical actions to make expressions and performances feel alive.</li>
        <li>Manage character, scene, position, and scale consistency as separate constraints.</li>
        <li>Build a color palette or visual DNA before generating a series.</li>
      </ul>

      <h2 id="video">Writing image-to-video prompts</h2>
      <p>
        An image-to-video prompt should describe what changes after the first frame, not rewrite the
        first frame. Keep it focused on action, camera movement, and timeline changes.
      </p>
      <CodeBlock lang="text" filename="video-rules" code={VIDEO_RULES} />
      <p>For still-image prompts, use this six-part skeleton:</p>
      <CodeBlock lang="text" filename="prompt-skeleton" code={PROMPT_SKELETON} />

      <h2 id="debug">Debugging and recovery</h2>
      <p>
        A failed take is not always a reason to restart. Keep the composition, lighting, or color
        that already works, then repair the specific failure.
      </p>
      <ul>
        {DEBUG.map(item => <li key={item}>{item}</li>)}
      </ul>
      <p>
        For a focused image-to-video prompt workflow, continue with{' '}
        <Link to="/docs/guides/video-generation-skills-i2v-prompt/">the I2V prompt guide</Link>.
        For narrative production, see <Link to="/docs/guides/video-generation-skills-ai-video-director/">ai-video-director</Link>;
        for ecommerce and advertising, see <Link to="/docs/guides/video-generation-skills-ecommerce/">ecommerce</Link>.
      </p>
    </DocPage>
  )
}
