import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const RULES = `Three hard rules for image-to-video:
1. The first frame already defines the style; describe motion and change only
2. Keep one dominant movement per prompt
3. Turn multiple actions into a timeline instead of one long sentence`

const EXAMPLE = `0-2s: The girl remains in the snow, shoulders moving slightly, eyes looking into the distance
2-4s: She slowly turns, her gaze settles naturally on the camera, wind lifts her hair and coat
4-5s: The camera moves in slightly and stops at a medium close-up`

const ACTION = `Anchor: torso or center-of-mass action
Satellite: secondary changes in hands, head, clothing, and expression

Example:
Anchor: the subject steps forward and turns
Satellite: hair moves in the wind, fingers tighten slightly, gaze follows the turn`

const TEMPLATE = `## First-frame responsibility
- Lock the character, scene, lighting, and color

## Video prompt
- Dominant action:
- Camera movement:
- Timeline:

## Constraints
- Do not change the first-frame style
- Do not add extra people
- Do not rebuild the background structure`

const WORKFLOW = `1. Stabilize the first frame
2. Write one primary action before adding emotion
3. Convert two or more actions into a timeline
4. Use an anchor action for full-body movement
5. Generate only 3-5 seconds per shot
6. If unstable, repair the first frame instead of adding more prompt text`

export default function VideoGenerationSkillsI2vPromptPageEn() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-i2v-prompt"
      title="Image-to-Video Prompt Guide"
      description="Learn how to write stable image-to-video prompts with one dominant action, timeline control, and anchor-based motion."
      headings={[
        { id: 'principle', text: 'The core principle', level: 2 },
        { id: 'rules', text: 'Three hard rules', level: 2 },
        { id: 'timeline', text: 'Use a timeline for multiple actions', level: 2 },
        { id: 'anchor', text: 'The anchor-action method', level: 2 },
        { id: 'template', text: 'Single-shot template', level: 2 },
        { id: 'mistakes', text: 'Common mistakes', level: 2 },
        { id: 'workflow', text: 'Recommended workflow', level: 2 },
      ]}
    >
      <Callout tone="info" title="Animate the first frame; do not rewrite it">
        <p>
          Image-to-video prompts are most stable when they describe what changes after the first
          frame. Repeating style, quality, and lighting instructions can make the model rebuild the
          image instead of animating it.
        </p>
      </Callout>

      <h2 id="principle">The core principle</h2>
      <p>
        First lock the character, scene, lighting, and color in a still image. Then add only visible
        motion: a body action, a camera move, and changes over time. This keeps the video model from
        trying to solve composition, style, and movement at the same time.
      </p>

      <h2 id="rules">Three hard rules</h2>
      <CodeBlock lang="text" filename="i2v-rules" code={RULES} />
      <p>For example, this timeline is more stable than a long sentence with conflicting actions:</p>
      <CodeBlock lang="text" filename="i2v-example" code={EXAMPLE} />

      <h2 id="timeline">Use a timeline for multiple actions</h2>
      <p>
        When a shot contains a subject action, a camera change, and a secondary effect such as wind or
        a gaze shift, write explicit time ranges. The timeline tells the model the order of states and
        prevents every action from happening at once.
      </p>
      <ul>
        <li>Small head turns, hand movements, or breathing changes usually fit in 3-5 seconds.</li>
        <li>Running, turning, stopping, and opening a door are often better as two shots.</li>
        <li>Describe visible changes instead of abstract emotion labels.</li>
      </ul>

      <h2 id="anchor">The anchor-action method</h2>
      <p>
        Choose one main action for the torso or center of mass. Let hair, clothing, hands, eyes, and
        facial expression follow as satellite changes. Without this hierarchy, each body part may move
        independently and the result feels disconnected.
      </p>
      <CodeBlock lang="text" filename="anchor-action" code={ACTION} />

      <h2 id="template">Single-shot template</h2>
      <CodeBlock lang="text" filename="i2v-shot-template" code={TEMPLATE} />

      <h2 id="mistakes">Common mistakes</h2>
      <ul>
        <li>Repeating “8K”, “cinematic”, “hyper-realistic”, and “dreamy” in the video prompt.</li>
        <li>Combining handheld motion, a smooth push-in, and a 360-degree orbit.</li>
        <li>Asking one shot to run, jump, fall, look up, speak, and turn.</li>
        <li>Changing a natural-light first frame into a high-contrast cyberpunk scene.</li>
      </ul>

      <h2 id="workflow">Recommended workflow</h2>
      <CodeBlock lang="text" filename="i2v-workflow" code={WORKFLOW} />
      <p>
        For the full prompt design system, continue with{' '}
        <Link to="/docs/guides/video-generation-skills-prompt-director/">prompt-director</Link>.
        For spatial continuity, see <Link to="/docs/guides/video-generation-skills-scene-consistency/">the scene consistency guide</Link>.
      </p>
    </DocPage>
  )
}
