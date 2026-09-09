import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const PIPELINE = `1. Use a product photo, sketch or white model as the anchor
2. Create keyframe stills first
3. Produce separate Hero, material, feature and scene shots
4. Select the most stable frame for each shot
5. Generate a short motion clip for each frame
6. Edit the clips into a 15-30 second film`

const PROMPT = `Five prompt dimensions:
1. Subject: the product and no more than three supporting props
2. Scene: one primary environment
3. Composition: choose Hero, low angle, top view or macro
4. Color: primary, secondary and accent colors
5. Material: name visible metal, glass, plastic, leather or fabric behavior`

export default function VideoGenerationSkillsProductCgPageEn() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-product-cg"
      title="Product CG workflow"
      description="A practical product-CG workflow for turning stable keyframes into commercial stills and short videos."
      headings={[
        { id: 'position', text: 'When to use product CG', level: 2 },
        { id: 'pipeline', text: 'Standard pipeline', level: 2 },
        { id: 'shots', text: 'How to split shots', level: 2 },
        { id: 'prompt', text: 'Five prompt dimensions', level: 2 },
        { id: 'case', text: 'Example structure', level: 2 },
        { id: 'delivery', text: 'Recommended delivery package', level: 2 },
        { id: 'mistakes', text: 'Common commercial mistakes', level: 2 },
      ]}
    >
      <Callout tone="info" title="Do not rely on one-shot generation for complex products">
        <p>For cars, shoes, headphones, speakers and phones, lock the still image first. Video models are better at motion than redesigning product structure while moving.</p>
      </Callout>
      <h2 id="position">When to use product CG</h2>
      <p>Use the product-CG approach for product films, brand visuals, launch teasers, feature breakdowns and premium campaign stills rather than ordinary marketplace images.</p>
      <h2 id="pipeline">Standard pipeline</h2>
      <CodeBlock lang="text" filename="product-cg-pipeline" code={PIPELINE} />
      <ul>
        <li>Lock the logo, edges, materials and structure during the still-image stage.</li>
        <li>Let the video stage add motion instead of redesigning the object.</li>
        <li>Make multiple keyframe variants for difficult rotations, macro views and exploded shots.</li>
      </ul>
      <h2 id="shots">How to split shots</h2>
      <ul>
        <li><strong>Hero:</strong> establish product identity and brand tone.</li>
        <li><strong>Material close-up:</strong> show edges, texture and reflections.</li>
        <li><strong>Feature shot:</strong> explain the selling point or internal structure.</li>
        <li><strong>Scene shot:</strong> place the product in a believable lifestyle context.</li>
        <li><strong>Motion shot:</strong> animate a stable frame without rebuilding the product.</li>
      </ul>
      <h2 id="prompt">Five prompt dimensions</h2>
      <CodeBlock lang="text" filename="product-cg-five-dimensions" code={PROMPT} />
      <p>Start with the subject and make the other dimensions serve it. Avoid combining macro and wide-scene requirements in one prompt.</p>
      <h2 id="case">Example structure</h2>
      <ol>
        <li>Create one front Hero frame and lock shape, buttons, logo and proportions.</li>
        <li>Create material close-ups for metal, mesh, glass or leather details.</li>
        <li>Create separate lifestyle scenes for desktop and living-room use.</li>
        <li>Create one feature breakdown frame for ports, drivers or internal parts.</li>
        <li>Generate a short motion clip from each stable frame.</li>
        <li>Edit the result as setup, feature, atmosphere and end card.</li>
      </ol>
      <h2 id="delivery">Recommended delivery package</h2>
      <ul>
        <li>Original keyframes and their prompt/parameter records.</li>
        <li>Short clips named by shot and aspect ratio.</li>
        <li>A contact sheet for visual consistency review.</li>
        <li>A final edit plus the source assets needed for revision.</li>
      </ul>
      <h2 id="mistakes">Common commercial mistakes</h2>
      <ul>
        <li>Failing to lock product structure before generating multiple shots.</li>
        <li>Trying to communicate every selling point in one long clip.</li>
        <li>Using vague words such as “premium” without describing material behavior.</li>
        <li>Changing scenes and lighting so often that the film feels like unrelated brands.</li>
      </ul>
      <p>For campaign structure and edit rhythm, continue with the <Link to="/docs/guides/video-generation-skills-tvc-playbook/">TVC workflow</Link>.</p>
    </DocPage>
  )
}
