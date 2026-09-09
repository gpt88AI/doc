import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const WORKFLOW = `1. Define the theme: the story is about an emotional change, not just an image
2. Define the characters and their life stages
3. Define the locations and their visual roles
4. Give each shot one core action and one short line
5. Lock aspect ratio, lighting, realism, pacing, and color
6. Create still keyframes before motion prompts
7. Confirm character consistency before batch generation
8. Add voice, music, subtitles, and transitions last`

const FORMULA = `Scene: time, place, spatial structure, light, color, era, environment
Character: age, hair, clothing, facial features, expression, identity state
Action: standing, sitting, walking, looking up, driving, packing, talking
Dialogue: one short line that moves the emotion
Parameters: realism, cinematic light, 9:16, depth of field, palette, pace`

const CONSISTENCY = `Character rules:
1. Create one reference image for the younger protagonist
2. Change age, hair, and clothing without changing facial structure
3. Repeat the same facial identity across scenes
4. Say “the adult version of the same character”, not “another woman”
5. Verify still-image consistency before video generation

Shot rules:
1. Keep one aspect ratio for the story segment
2. Keep color temperature and camera language consistent
3. Keep one main action per shot
4. Keep dialogue short
5. Use emotional contrast instead of complex transition effects`

const EDITING = `1. Generate a still keyframe for every shot
2. Select the most stable character set
3. Generate motion clips from the approved keyframes
4. Export school, adult-life, and night-market sections separately
5. Add subtitles, music, and ambient sound in the editor
6. Build a dream -> reality -> renewed understanding structure
7. Apply final color and end-card treatment`

export default function AiVideoStoryboardGuidePageEn() {
  return (
    <DocPage
      path="/docs/guides/ai-video-storyboard-guide"
      title="AI Video Storyboard and Prompt Guide"
      description="A practical workflow for turning an emotional story into consistent AI video shots, keyframes, motion prompts, and an edited short film."
      headings={[
        { id: 'position', text: 'Start with emotional change', level: 2 },
        { id: 'workflow', text: 'Core workflow', level: 2 },
        { id: 'formula', text: 'Prompt formula', level: 2 },
        { id: 'storyboard', text: 'How to split shots', level: 2 },
        { id: 'case', text: 'A three-stage story structure', level: 2 },
        { id: 'consistency', text: 'Character and shot consistency', level: 2 },
        { id: 'editing', text: 'From shots to a finished film', level: 2 },
        { id: 'mistakes', text: 'Common failure modes', level: 2 },
      ]}
    >
      <Callout tone="info" title="Storyboard the feeling before the frame">
        <p>
          A reliable AI short film starts with an emotional arc. Define what changes between the
          beginning and the end, then choose locations, characters, and shots that make that change visible.
        </p>
      </Callout>

      <h2 id="position">Start with emotional change</h2>
      <p>
        A useful structure may move from a young person&apos;s ambition to adult routine and then to a new
        understanding of life. School, office, taxi, market, and kitchen scenes can be independent enough
        for generation while still serving one emotional progression.
      </p>

      <h2 id="workflow">Core workflow</h2>
      <CodeBlock lang="text" filename="ai-video-workflow" code={WORKFLOW} />

      <h2 id="formula">Prompt formula</h2>
      <p>
        A prompt that only says “a girl talks in a classroom” leaves the model to invent space, identity,
        and pacing. Use five layers so each shot has a visible job.
      </p>
      <CodeBlock lang="text" filename="prompt-formula" code={FORMULA} />

      <h2 id="storyboard">How to split shots</h2>
      <ul>
        <li>Scene: specify location, light, era, and spatial structure instead of “an indoor scene”.</li>
        <li>Character: specify age, clothing, hair, identity state, and small expressions.</li>
        <li>Action: choose one visible action such as looking up, driving, packing, or answering a call.</li>
        <li>Dialogue: use one short line that changes the emotional direction.</li>
        <li>Parameters: keep realism, lens language, ratio, depth, and color compatible.</li>
      </ul>

      <h2 id="case">A three-stage story structure</h2>
      <p>
        Use three sections when the story moves through time: the dream of youth, the pressure of adult
        reality, and a renewed interpretation of that reality. Each section can have its own locations,
        but the protagonist and the emotional thread must remain recognisable.
      </p>
      <CodeBlock lang="text" filename="shot-template" code={`Shot 01\nScene: old classroom, warm afternoon light\nCharacter: young protagonist, school uniform\nAction: looks outside and speaks slowly\nDialogue: one short line about the future\nParameters: realistic, cinematic, 9:16\n\nShot 02\nScene: cool office light\nCharacter: adult version of the same protagonist\nAction: answers a call and pauses\nDialogue: one short line about returning home\nParameters: documentary realism, restrained movement`} />

      <h2 id="consistency">Character and shot consistency</h2>
      <CodeBlock lang="text" filename="consistency-rules" code={CONSISTENCY} />
      <p>
        Verify keyframes before generating motion. A stable still reference is usually more valuable than
        a longer video prompt that tries to repair identity drift after the fact.
      </p>

      <h2 id="editing">From shots to a finished film</h2>
      <p>
        Let image, video, and editing tools do different jobs. Generate and approve keyframes first, make
        short motion clips second, then assemble sections and add sound and typography in the editor.
      </p>
      <CodeBlock lang="text" filename="editing-flow" code={EDITING} />

      <h2 id="mistakes">Common failure modes</h2>
      <ul>
        <li>The character changes because every shot describes a new person.</li>
        <li>Actions look artificial because one shot contains too many verbs.</li>
        <li>The emotional arc breaks because dialogue and scene contrast were not planned together.</li>
        <li>Beautiful frames do not become a film because there is no shot order.</li>
        <li>Costs rise because high-resolution batches are generated before keyframe validation.</li>
      </ul>
      <p>
        For lower-level prompt construction, continue with{' '}
        <Link to="/docs/guides/video-generation-skills-prompt-director/">prompt-director</Link>.
      </p>
    </DocPage>
  )
}
