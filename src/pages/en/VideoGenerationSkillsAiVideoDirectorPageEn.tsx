import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const MODES = `Narrative track
- Short drama, anime drama, trailer, short film
- Focus: story, characters, world, and pacing

Production track
- Continuity, storyboard, shot breakdown, complex action
- Focus: camera control, spatial continuity, and stable characters`

const FLOW = `1. Read cheatsheet.md
2. Read confirmation-gates.md
3. Choose the Narrative or Production track
4. Draft the storyboard before final prompts
5. Wait for shot-number approval
6. Open only the references needed for the project
7. Return to prompt-director for prompt-level technique`

const ROUTING = `Narrative
  short drama / anime drama / film style / scene consistency

Production
  storyboard / shot breakdown / character consistency / scene continuity`

const RULES = `1. A finished film comes from a coherent system, not isolated beautiful shots
2. Storyboard first
3. Give each shot one control point
4. Manage continuity as a separate production task
5. Recovery and pickups are part of the workflow, not a failure`

export default function VideoGenerationSkillsAiVideoDirectorPageEn() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-ai-video-director"
      title="AI Video Director: Production Guide"
      description="Learn how ai-video-director handles narrative video, storyboards, shot breakdowns, scene continuity, character consistency, and complex actions."
      headings={[
        { id: 'position', text: 'It solves a production problem', level: 2 },
        { id: 'modes', text: 'Two production tracks', level: 2 },
        { id: 'flow', text: 'Standard workflow', level: 2 },
        { id: 'routing', text: 'Content routing', level: 2 },
        { id: 'assets', text: 'Build assets before performance', level: 2 },
        { id: 'continuity', text: 'Spatial and character continuity', level: 2 },
        { id: 'shots', text: 'Storyboard and complex action', level: 2 },
        { id: 'rules', text: 'Production rules', level: 2 },
      ]}
    >
      <Callout tone="info" title="Think at the finished-film level">
        <p>
          Many AI video failures are not isolated image failures. Characters change, locations drift,
          shots lose causal rhythm, and actions do not connect. This module manages those problems as
          a production system.
        </p>
      </Callout>

      <h2 id="position">It solves a production problem</h2>
      <p>
        The director workflow coordinates character assets, environment assets, storyboards, shot
        logic, and pickups. It is designed for short drama, anime drama, trailers, product stories,
        and other sequences where the final result matters more than one attractive frame.
      </p>

      <h2 id="modes">Two production tracks</h2>
      <CodeBlock lang="text" filename="modes" code={MODES} />

      <h2 id="flow">Standard workflow</h2>
      <CodeBlock lang="text" filename="flow" code={FLOW} />
      <p>
        First decide whether the request is narrative or production work. Confirm source material,
        aspect ratio, tool, and the main failure mode before selecting references. Prompt-director then
        supplies the lower-level prompt method.
      </p>

      <h2 id="routing">Content routing</h2>
      <CodeBlock lang="text" filename="routing" code={ROUTING} />
      <p>
        Narrative references focus on story and style. Production references focus on camera engineering,
        spatial logic, and continuity. Keeping the two tracks separate prevents a prompt from carrying
        too much unrelated instruction.
      </p>

      <h2 id="assets">Build assets before performance</h2>
      <p>
        Do not define a recurring character with one portrait and a sentence. Build a small reference
        pack with face, hair, clothing, accessories, and full-body views. For 3D or anime work, anchor
        the character with a strong 2D reference before asking the model to place the character in scenes.
      </p>
      <ul>
        <li>Keep face, hairstyle, clothing folds, and accessories stable across views.</li>
        <li>Create a location master before splitting the story into camera positions.</li>
        <li>Treat important props as reference assets when they drive the plot.</li>
      </ul>

      <h2 id="continuity">Spatial and character continuity</h2>
      <p>
        Build a spatial master with a grid, top-down view, orbit screenshots, or a panorama. Then place
        characters into that same space. Submit character and environment references separately when
        possible: the character reference controls appearance, while the environment reference controls
        geometry, scale, and lighting.
      </p>
      <p>
        Exterior-to-interior transitions, entrances, corridors, and other location changes need bridge
        shots. A missing connection shot often looks like a continuity error even when both individual
        frames are good.
      </p>

      <h2 id="shots">Storyboard and complex action</h2>
      <p>
        A storyboard should answer why the subject moves, where it goes, what blocks the action, and why
        the result follows. For complex movement, use a multi-panel storyboard or a reference video to
        lock timing before generating motion.
      </p>
      <ul>
        <li>Keep one dominant action per clip.</li>
        <li>Prefer short clips with clear starts and ends.</li>
        <li>When a shot fails, add a close-up, insert, or empty establishing shot before extending a long take.</li>
      </ul>

      <h2 id="rules">Production rules</h2>
      <CodeBlock lang="text" filename="rules" code={RULES} />
      <p>
        Continue with <Link to="/docs/guides/video-generation-skills-scene-consistency/">scene consistency</Link>{' '}
        for spatial locking, <Link to="/docs/guides/video-generation-skills-complex-action-storyboard/">complex action and storyboards</Link>{' '}
        for shot engineering, and <Link to="/docs/guides/video-generation-skills-prompt-director/">prompt-director</Link>{' '}
        for prompt construction.
      </p>
    </DocPage>
  )
}
