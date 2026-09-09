import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const METHODS = `Four ways to lock a space:
1. Nine-panel scene grid
2. Top-down plan with multiple camera positions
3. 360-degree orbit screenshots
4. 720 panorama with perspective correction`

const RULES = `Scene continuity rules:
1. Build the space before shooting the story
2. Establish one spatial master before splitting shots
3. Submit character and environment references separately
4. Add bridge shots when moving from exterior to interior
5. Correct panorama perspective before using it as a reference`

const FLOW = `1. Find one ideal environment reference
2. Reverse-engineer the full spatial description
3. Generate a spatial master: grid, plan, or panorama
4. Extract several camera positions from that master
5. Place the character into those positions
6. Generate final motion shots last`

const FIXES = `Background proportions look wrong: correct perspective with image-to-image first
Character position drifts: mark the position on the base image
Light direction changes: return to the spatial master and unify the source
Exterior-to-interior cut feels abrupt: add a doorway, corridor, or push-through bridge shot`

export default function VideoGenerationSkillsSceneConsistencyPageEn() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-scene-consistency"
      title="Scene Consistency Guide"
      description="Learn how to lock spatial layout, camera positions, lighting, and transitions for narrative AI video."
      headings={[
        { id: 'why', text: 'Why scenes drift', level: 2 },
        { id: 'methods', text: 'Four spatial locking methods', level: 2 },
        { id: 'rules', text: 'Continuity rules', level: 2 },
        { id: 'flow', text: 'Recommended sequence', level: 2 },
        { id: 'fix', text: 'Common fixes', level: 2 },
        { id: 'check', text: 'Pre-generation checklist', level: 2 },
      ]}
    >
      <Callout tone="info" title="Build the location before directing the action">
        <p>
          A scene can look convincing in isolation and still fail as soon as the camera cuts. The
          layout, light direction, scale, and character positions need a shared spatial source.
        </p>
      </Callout>

      <h2 id="why">Why scenes drift</h2>
      <p>
        Text alone is a weak representation of a complex room or street. If every shot regenerates the
        environment from scratch, doors, windows, furniture, horizon lines, and light sources will move.
        A spatial master gives each shot the same physical reference.
      </p>

      <h2 id="methods">Four spatial locking methods</h2>
      <CodeBlock lang="text" filename="spatial-methods" code={METHODS} />
      <p>
        Use a grid for dialogue scenes, a top-down plan for complex interiors, orbit screenshots when
        you need quick angle coverage, and a corrected panorama when the camera needs broad freedom.
      </p>

      <h2 id="rules">Continuity rules</h2>
      <CodeBlock lang="text" filename="continuity-rules" code={RULES} />

      <h2 id="flow">Recommended sequence</h2>
      <CodeBlock lang="text" filename="scene-flow" code={FLOW} />
      <p>
        Keep environment and character references separate when possible. The environment controls
        geometry and light; the character reference controls appearance, clothing, and scale.
      </p>

      <h2 id="fix">Common fixes</h2>
      <CodeBlock lang="text" filename="scene-fixes" code={FIXES} />
      <p>
        Preserve good composition or lighting from a failed take when possible. Repair the specific
        spatial or action problem instead of regenerating the entire sequence.
      </p>

      <h2 id="check">Pre-generation checklist</h2>
      <ul>
        <li>Is there a spatial master?</li>
        <li>Is the light direction shared across shots?</li>
        <li>Are character positions explicit?</li>
        <li>Do all shots obey the same physical layout?</li>
        <li>Do exterior-to-interior or doorway transitions need bridge shots?</li>
      </ul>
      <p>
        Combine this guide with <Link to="/docs/guides/video-generation-skills-ai-video-director/">ai-video-director</Link>{' '}
        for production planning and <Link to="/docs/guides/video-generation-skills-prompt-director/">prompt-director</Link>{' '}
        for prompt construction.
      </p>
    </DocPage>
  )
}
