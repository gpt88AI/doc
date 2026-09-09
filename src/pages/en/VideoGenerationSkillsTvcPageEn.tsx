import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const FLOW = `1. Define the core emotion and selling point for 15-30 seconds
2. Split the film into five to eight shots
3. Create a still frame for each shot before motion
4. Keep tone and brand language consistent across keyframes
5. Generate a short clip for each shot
6. Edit, score, design sound and add the end card`

const STRUCTURE = `1. Establishing shot: space and atmosphere
2. Hero shot: product or character entrance
3. Feature shot: function, material, action or emotion
4. Memory shot: the most memorable visual beat
5. End card: brand, slogan, package or product lock-up`

export default function VideoGenerationSkillsTvcPageEn() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-tvc-playbook"
      title="TVC advertising workflow"
      description="A practical workflow for TVC scripts, storyboards, keyframes, short clips and post-production assembly."
      headings={[
        { id: 'why', text: 'Why a TVC is not one long generation', level: 2 },
        { id: 'flow', text: 'Recommended workflow', level: 2 },
        { id: 'structure', text: 'Shot structure', level: 2 },
        { id: 'script', text: 'Script template', level: 2 },
        { id: 'case', text: 'A 20-second structure', level: 2 },
        { id: 'avoid', text: 'What to avoid', level: 2 },
      ]}
    >
      <Callout tone="info" title="A TVC is a production problem, not a single-shot problem">
        <p>The challenge is to build emotion, rhythm, selling points and brand memory within a few seconds, not merely to make one attractive frame.</p>
      </Callout>
      <h2 id="why">Why a TVC is not one long generation</h2>
      <p>One long generation forces the model to handle story, product, action, camera and spatial continuity at once. A more reliable process is script, storyboard, keyframe, shot generation and edit.</p>
      <h2 id="flow">Recommended workflow</h2>
      <CodeBlock lang="text" filename="tvc-flow" code={FLOW} />
      <ul>
        <li>The establishing shot creates the atmosphere; it does not explain every feature.</li>
        <li>The feature shot explains the product or character and should not also carry the end card.</li>
        <li>The memory shot deserves separate iteration instead of being diluted across every shot.</li>
      </ul>
      <h2 id="structure">Shot structure</h2>
      <CodeBlock lang="text" filename="tvc-shot-structure" code={STRUCTURE} />
      <p>Give every shot one primary job. Mixing product explanation, emotional climax and brand lock-up in one frame usually reduces stability.</p>
      <h2 id="script">Script template</h2>
      <p>Before generating, write a short script that states what the audience sees, feels and learns in each shot.</p>
      <ul>
        <li>Describe visible details such as reflections, water, hand movement and spatial layers.</li>
        <li>Write actions that can be filmed rather than abstract emotional labels.</li>
        <li>Choose one dominant camera movement per shot.</li>
        <li>Record sound and transition intent so editing can preserve the advertising rhythm.</li>
      </ul>
      <h2 id="case">A 20-second structure</h2>
      <ol>
        <li>0-3s: establish space, tone and visual question.</li>
        <li>3-8s: introduce the product or character with a stable Hero frame.</li>
        <li>8-14s: reveal one feature or material benefit.</li>
        <li>14-18s: deliver the memorable visual beat.</li>
        <li>18-20s: resolve with the brand and product end card.</li>
      </ol>
      <h2 id="avoid">What to avoid</h2>
      <ul>
        <li>Asking one prompt to generate a complete 20-second advertisement.</li>
        <li>Putting product, character, narration, feature and environment into one shot.</li>
        <li>Using the same camera movement for the entire film.</li>
        <li>Skipping the script and asking the model to invent the story during generation.</li>
      </ul>
      <p>When the still-image system is not stable yet, return to the <Link to="/docs/guides/video-generation-skills-product-cg/">product CG workflow</Link> before scaling to a TVC.</p>
    </DocPage>
  )
}
