import { Link } from 'react-router-dom'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { DocPage } from '../../components/layout/DocPage'

const STACK = `Knowledge / tutorial video:
Excalidraw + Screen Studio + MD Publish

Product demo / tech short:
Screen Studio + Rotato + Jacky Motion

Talking-head / opinion content:
Jacky Illustration + Jacky Motion + MD Publish

AI video / storyboard:
Excalidraw + Jacky Motion + video-generation-skills`

const FLOW = `1. Write the Markdown script in Obsidian
2. Draw concepts, flows, or structures in Excalidraw
3. Turn the narration into illustration directions
4. Split the narration into beats and HTML motion
5. Record product, web, or phone demonstrations in Screen Studio
6. Add device animation from Rotato when useful
7. Adapt the Markdown for newsletters, social posts, and community channels`

const TEMPLATE = `Topic:
What problem does the video solve?

Audience:
Beginner, developer, operator, ecommerce seller, or AI creator?

Structure:
3-second hook / context / method / demo / warning / next action

Assets:
Sketch / screen recording / device animation / illustration / HTML motion / platform variants`

export default function VideoCreatorToolsWorkflowPageEn() {
  return (
    <DocPage
      path="/docs/guides/video-creator-tools-workflow"
      title="Six Video-Creation Tools and a Reusable Workflow"
      description="Combine Excalidraw, Screen Studio, Rotato, Jacky Illustration, Jacky Motion, and MD Publish into a repeatable video-production workflow."
      headings={[
        { id: 'overview', text: 'The core idea', level: 2 },
        { id: 'tools', text: 'What each tool solves', level: 2 },
        { id: 'workflow', text: 'Recommended workflow', level: 2 },
        { id: 'combinations', text: 'Combinations', level: 2 },
        { id: 'script', text: 'Script template', level: 2 },
        { id: 'related', text: 'Related guides', level: 2 },
      ]}
    >
      <Callout tone="info" title="Connect the tools into a production line">
        <p>
          These tools solve different problems: scripting, sketching, screen recording, device animation,
          illustration, motion design, and multi-platform publishing. A fixed stack is more reliable than
          rebuilding the editing process for every video.
        </p>
      </Callout>

      <h2 id="overview">The core idea</h2>
      <p>
        Choose tools by content type. Excalidraw explains structure, Screen Studio captures real interaction,
        Rotato packages product screens, Jacky Illustration visualises narration, Jacky Motion adds beats and
        motion, and MD Publish carries the finished idea to other platforms.
      </p>

      <h2 id="tools">What each tool solves</h2>
      <ul>
        <li><strong>Excalidraw:</strong> quick diagrams, hand-drawn explanations, and low-friction teaching visuals.</li>
        <li><strong>Screen Studio:</strong> polished recordings of apps, websites, and product workflows.</li>
        <li><strong>Rotato:</strong> phone, laptop, and tablet mockups with simple product animation.</li>
        <li><strong>Jacky Illustration:</strong> turns a structured narration into visual explanation assets.</li>
        <li><strong>Jacky Motion:</strong> turns narration into scene beats and HTML animation directions.</li>
        <li><strong>MD Publish:</strong> adapts one Markdown source to newsletters, social content, and community posts.</li>
      </ul>

      <h2 id="workflow">Recommended workflow</h2>
      <CodeBlock lang="text" filename="production-flow" code={FLOW} />
      <p>
        The script should define the audience, hook, problem, method, demonstration, warning, and next action
        before asset production begins.
      </p>

      <h2 id="combinations">Combinations</h2>
      <CodeBlock lang="text" filename="quick-stack" code={STACK} />
      <p>
        Do not force every tool into one video. Pick two or three core tools, keep a consistent visual language,
        and reuse that stack until the content type changes.
      </p>

      <h2 id="script">Script template</h2>
      <CodeBlock lang="text" filename="creator-script-template" code={TEMPLATE} />
      <p>
        A structured script is the shared input for the whole workflow. Separate narration, shot direction,
        and asset requirements so each tool can process only the information it needs.
      </p>

      <h2 id="related">Related guides</h2>
      <ul>
        <li><Link to="/docs/guides/ai-video-storyboard-guide/">AI video storyboard and prompt guide</Link></li>
        <li><Link to="/docs/guides/video-generation-skills-overview/">video-generation-skills overview</Link></li>
        <li><Link to="/docs/guides/video-generation-skills-prompt-director/">prompt-director guide</Link></li>
        <li><Link to="/docs/guides/codex-frontend-taste-skill/">Codex frontend design Skill</Link></li>
      </ul>
    </DocPage>
  )
}
