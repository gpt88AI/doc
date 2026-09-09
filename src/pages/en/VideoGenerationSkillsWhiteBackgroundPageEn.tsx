import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const FLOW = `1. Start with a clean white-background product image
2. Lock product proportions, material, and main angle
3. Expand it into 3-5 lifestyle scene images
4. Derive detail-page panels, posters, and video first frames
5. Turn selected frames into 3-5 second clips
6. Batch-vary scenes, props, and copy directions last`

const PLATFORMS = `Taobao / Tmall: clear hero image, strong benefit, restrained background
Amazon: structured layout, modular benefits, more comparison panels
Xiaohongshu / Douyin: lifestyle, identification, and human context
TikTok Shop: a strong first-frame hook and direct action`

const PROMPT = `Keep the original product proportions, material, and control layout unchanged.
Place it on a warm wooden sideboard in a sunlit living room.
Use afternoon side light, a slightly blurred plant in the foreground,
and leave clean copy space on the right.`

const ASSETS = `1. Hero image
2. Lifestyle scene image
3. Detail-page module
4. Advertising poster
5. Short-video first frame`

const QC = `- Product proportions remain unchanged
- Edges are not melted
- Material and color stay consistent
- Copy space is large enough
- The scene supports the product instead of competing with it
- Color temperature and composition language match across the batch`

export default function VideoGenerationSkillsWhiteBackgroundPageEn() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-white-background-scaling"
      title="White-Background Product Image Scaling"
      description="Learn how to turn a clean product image into lifestyle scenes, detail-page assets, video first frames, and scalable advertising variations."
      headings={[
        { id: 'why', text: 'Why white-background images scale well', level: 2 },
        { id: 'flow', text: 'Standard flow', level: 2 },
        { id: 'platform', text: 'Adapt assets to each platform', level: 2 },
        { id: 'prompt', text: 'Scene-generation prompt structure', level: 2 },
        { id: 'assets', text: 'Recommended asset set', level: 2 },
        { id: 'steps', text: 'Step-by-step execution', level: 2 },
        { id: 'mistakes', text: 'Common failure points', level: 2 },
      ]}
    >
      <Callout tone="info" title="The white-background image is an asset starting point">
        <p>
          A clean product image has little background noise, so proportions, structure, material, and
          color can become stable anchors for the rest of the SKU asset pool.
        </p>
      </Callout>

      <h2 id="why">Why white-background images scale well</h2>
      <p>
        The product is already isolated from competing visual information. That makes it easier to
        preserve geometry while changing the scene, light, props, and copy space for different channels.
      </p>

      <h2 id="flow">Standard flow</h2>
      <CodeBlock lang="text" filename="white-bg-flow" code={FLOW} />
      <p>
        Do not jump directly from a white-background image to a full advertisement. Validate a small set
        of lifestyle stills first, then expand the approved visual language into video and batch variants.
      </p>

      <h2 id="platform">Adapt assets to each platform</h2>
      <CodeBlock lang="text" filename="platform-split" code={PLATFORMS} />
      <ul>
        <li>One product should not use one identical image set across every channel.</li>
        <li>Conversion-focused channels prioritise clarity; content channels prioritise atmosphere and identification.</li>
        <li>For TikTok Shop, the first-frame hook and direct action often matter more than static layout.</li>
      </ul>

      <h2 id="prompt">Scene-generation prompt structure</h2>
      <CodeBlock lang="text" filename="white-bg-prompt" code={PROMPT} />
      <p>
        Repeat the constraint that the product structure stays unchanged. Scene, light, and copy space
        may change; the SKU should not look redrawn in every variation.
      </p>
      <ul>
        <li>State the preservation constraint before describing the new scene.</li>
        <li>Name a concrete setting such as a sideboard, desk, or bedside table.</li>
        <li>Specify where copy space should remain.</li>
        <li>Avoid stacking conflicting style directions in one prompt.</li>
      </ul>

      <h2 id="assets">Recommended asset set</h2>
      <CodeBlock lang="text" filename="white-bg-assets" code={ASSETS} />

      <h2 id="steps">Step-by-step execution</h2>
      <ol>
        <li>Inspect the source image for contour, color, material, and sharpness.</li>
        <li>Generate three scene images before attempting thirty.</li>
        <li>Choose the most stable visual direction.</li>
        <li>Expand that direction into detail-page panels and posters.</li>
        <li>Turn two or three approved frames into short-video first frames.</li>
        <li>Batch-vary scenes only after the visual system is stable.</li>
      </ol>
      <CodeBlock lang="text" filename="white-bg-qc" code={QC} />

      <h2 id="mistakes">Common failure points</h2>
      <ul>
        <li>The scene competes with the product and the hero image becomes unclear.</li>
        <li>Product scale drifts and it looks pasted into the room.</li>
        <li>Lighting, color temperature, and composition vary across the batch.</li>
        <li>The team skips still-image validation and starts with a long advertisement.</li>
      </ul>
      <p>
        For premium product visuals, continue with{' '}
        <Link to="/docs/guides/video-generation-skills-product-cg/">the product CG guide</Link>.
      </p>
    </DocPage>
  )
}
