import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const LOGIC = `Four storyboard questions:
1. Why does the character act?
2. Where are they going?
3. What blocks the action?
4. Why does the result make sense?`

const METHODS = `Two main methods for complex action:
Method A: 12-panel storyboard
- Best for original action design

Method B: Reference-video replacement
- Best for quickly getting a stable movement rhythm`

const WORKFLOW = `1. Define the character and environment
2. Break down shots before writing a long action sentence
3. Choose the dominant action anchor
4. Lock the sequence with a 12-panel board or reference video
5. Keep one dominant action per shot
6. Generate short segments and edit them together`

const GRID = `12-panel method:
1. Lock the character and environment
2. Split the complex action into 12 continuous states
3. Give each panel one intermediate pose
4. Group the panels into 3-4 video segments
5. Keep one main action chain per segment`

const REFERENCE = `Reference-video method:
1. Find a reference with the right movement rhythm
2. Extract its key shots and action beats
3. Replace the subject with your character, scene, and style
4. Preserve the movement structure instead of rewriting it completely
5. Repair local issues and edit the segments together`

const TROUBLESHOOT = `Action looks convulsive -> too many main actions; keep one
Character drifts -> missing character or scene anchor
Causal break -> missing reason, destination, obstacle, or result
Action is correct but unattractive -> repair shot logic before aesthetics
Reference replacement fails -> the movement structure was changed, not just the subject`

const OUTPUT = `## Story goal
## Answers to the four storyboard questions
## Character and environment references
## 12-panel or reference-video plan
## Segmented video prompts
## Editing order`

export default function VideoGenerationSkillsComplexActionPageEn() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-complex-action-storyboard"
      title="Complex Action and Storyboard Guide"
      description="Learn how to plan complex AI video actions with causal storyboards, 12-panel breakdowns, reference videos, and short editable segments."
      headings={[
        { id: 'why', text: 'Why complex action breaks', level: 2 },
        { id: 'logic', text: 'Fix the storyboard logic first', level: 2 },
        { id: 'methods', text: 'Two action methods', level: 2 },
        { id: 'case', text: 'Case structure', level: 2 },
        { id: 'template', text: 'Output template', level: 2 },
        { id: 'workflow', text: 'Recommended workflow', level: 2 },
      ]}
    >
      <Callout tone="info" title="Complex action is about order before beauty">
        <p>
          A model may know how to render running, jumping, turning, or waving. It still fails when too
          many actions arrive without a causal chain or a clear hierarchy.
        </p>
      </Callout>

      <h2 id="why">Why complex action breaks</h2>
      <p>
        When one shot asks a character to run, jump, turn, wave, look back, and speak, the model often
        blends the actions into one unstable movement. The fix is to split the sequence before adding
        more descriptive words.
      </p>

      <h2 id="logic">Fix the storyboard logic first</h2>
      <CodeBlock lang="text" filename="shot-logic" code={LOGIC} />
      <p>
        These questions solve causality, not visual style. Once the reason and destination are clear,
        camera and prompt decisions become easier to evaluate.
      </p>

      <h2 id="methods">Two action methods</h2>
      <CodeBlock lang="text" filename="action-methods" code={METHODS} />
      <CodeBlock lang="text" filename="twelve-grid-method" code={GRID} />
      <CodeBlock lang="text" filename="reference-video-method" code={REFERENCE} />
      <ul>
        <li>Use the 12-panel method for original action, parkour, fights, dance, and emotional chains.</li>
        <li>Use a reference video for fast rhythm matching, while respecting rights and publishing boundaries.</li>
      </ul>

      <h2 id="case">Case structure</h2>
      <p>
        A character rushing to meet someone at a cafe is a useful example: message received, late arrival
        noticed, rush outside, blocked by a red light, pause at the entrance, then enter and face the
        waiting person. The intermediate obstacles make the final tension believable.
      </p>
      <p>
        Split this into three or four clips: reaction and departure, street obstacle, entrance and pause,
        then the final encounter. Keep each clip around 3-5 seconds and connect them in the edit.
      </p>

      <h2 id="template">Output template</h2>
      <CodeBlock lang="text" filename="complex-action-output" code={OUTPUT} />
      <CodeBlock lang="text" filename="complex-action-troubleshoot" code={TROUBLESHOOT} />

      <h2 id="workflow">Recommended workflow</h2>
      <CodeBlock lang="text" filename="complex-action-workflow" code={WORKFLOW} />
      <p>
        If the real problem is character or spatial drift, repair those anchors first with the{' '}
        <a href="/docs/guides/video-generation-skills-scene-consistency/">scene consistency guide</a>{' '}
        and the <a href="/docs/guides/video-generation-skills-ai-video-director/">AI video director guide</a>.
      </p>
    </DocPage>
  )
}
