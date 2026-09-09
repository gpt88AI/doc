import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const FLOW = `1. Read cheatsheet.md
2. Read confirmation-gates.md
3. Create a visual strategy and storyboard/keyframe draft
4. Wait for direction approval
5. Open one or two references for the selected format
6. Return to prompt-director for prompt technique`

const ROUTING = `Product CG
  Read: references/product-cg.md

TVC / brand film
  Read: references/tvc-ads.md

Visual aesthetics
  Read: references/brand-aesthetics.md

Brand system
  Read: references/brand-system.md

Creative MV / non-standard advertising
  Read: references/creative-ads.md`

const GATES = `Before production, confirm:
- project_type: product_cg / tvc / brand_film / creative_mv / logo_motion
- brand_tone: tech / luxury / youth / traditional / playful / minimal
- reference: a concrete brand reference or only a moodboard
- product: automotive / consumer electronics / beauty / fashion / food
- format: 16:9, 9:16, banner, or keyframes only
- look: pure CG / realistic / live-action feel`

const PLAYBOOK = `1. Define visual strategy before writing a long prompt
2. Lock keyframes before expanding into shot segments
3. Keep one visual control point per shot
4. Treat product continuity as its own check
5. Build brand and ecommerce assets as separate downstream outputs`

export default function VideoGenerationSkillsBrandAdCgPageEn() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-brand-ad-cg"
      title="Brand Advertising and Product CG Guide"
      description="Learn how brand-ad-cg turns product ideas, moodboards, and brand systems into premium keyframes, TVC shots, and creative advertising assets."
      headings={[
        { id: 'position', text: 'What this skill is for', level: 2 },
        { id: 'flow', text: 'Production flow', level: 2 },
        { id: 'routing', text: 'Reference routing', level: 2 },
        { id: 'aesthetics', text: 'Brand aesthetics', level: 2 },
        { id: 'system', text: 'Brand system', level: 2 },
        { id: 'product', text: 'Product CG', level: 2 },
        { id: 'tvc', text: 'TVC and brand film', level: 2 },
        { id: 'creative', text: 'Creative advertising', level: 2 },
        { id: 'boundary', text: 'Brand versus ecommerce', level: 2 },
      ]}
    >
      <Callout tone="info" title="Build brand presence before listing details">
        <p>
          Brand advertising is not simply ecommerce with more polish. It establishes tone, visual
          memory, and desire first, then turns the approved direction into keyframes and moving shots.
        </p>
      </Callout>

      <h2 id="position">What this skill is for</h2>
      <p>
        Use this module for product CG, TVCs, brand films, logo motion, moodboard-led campaigns, and
        creative MVs. It is a better fit when the brief sounds like a premium fragrance, automotive,
        headphone, beauty, or fashion campaign rather than a marketplace listing.
      </p>

      <h2 id="flow">Production flow</h2>
      <CodeBlock lang="text" filename="brand-flow" code={FLOW} />
      <CodeBlock lang="text" filename="brand-gates" code={GATES} />
      <CodeBlock lang="text" filename="brand-playbook" code={PLAYBOOK} />
      <p>
        Visual strategy and storyboard come before the final prompt. This keeps the campaign coherent
        when the output expands from one keyframe into multiple shots and aspect ratios.
      </p>

      <h2 id="routing">Reference routing</h2>
      <CodeBlock lang="text" filename="brand-routing" code={ROUTING} />

      <h2 id="aesthetics">Brand aesthetics</h2>
      <p>
        Translate style into production methods instead of stacking abstract adjectives. Riso print,
        collage, embroidery, rotoscope, Y2K, surreal photography, and a controlled palette each imply
        different texture, lighting, and motion rules. A moodboard is usually more stable than a paragraph
        of style words.
      </p>

      <h2 id="system">Brand system</h2>
      <p>
        Logo motion, packaging, and brand stories are separate lines of work. Lock symbols and layout
        before asking a model for a polished hero frame. Packaging needs credible paper, embossing,
        foil, whitespace, and information hierarchy. A short brand story benefits from a simple three-act
        structure and a shared keyframe language.
      </p>

      <h2 id="product">Product CG</h2>
      <p>
        Let still images define material and geometry; let video define movement. Use product images,
        sketches, white models, or keyframes as anchors. For cars, shoes, speakers, headphones, mice, and
        other complex objects, build a small still-image set before generating 3-5 second motion shots.
      </p>
      <ul>
        <li>Use keyframe redraws for flips, exploded views, and extreme perspective.</li>
        <li>Track logos, edges, controls, and material transitions independently.</li>
        <li>Reserve clean negative space when the campaign needs copy or a packshot.</li>
      </ul>

      <h2 id="tvc">TVC and brand film</h2>
      <p>
        Script and emotional rhythm come before isolated camera spectacle. A functional product film can
        move from environment setup to feature reveal, visualisation, and brand lockup. A youth or beverage
        film may prioritise character energy and edit rhythm. Automotive work should manage locations and
        terrain by acts so the sequence does not become a random gallery of car images.
      </p>

      <h2 id="creative">Creative advertising</h2>
      <p>
        Non-standard advertising includes music videos, city films, dance, pets, stunts, and narrative
        campaigns. These projects still need a beat structure, emotional turns, and a sound plan. Split
        complex actions into shots or use a reference video to anchor timing instead of relying on one long
        prompt.
      </p>

      <h2 id="boundary">Brand versus ecommerce</h2>
      <ul>
        <li><strong>brand-ad-cg:</strong> brand energy, cinematic space, premium texture, and visual memory.</li>
        <li><strong>ecommerce:</strong> product clarity, detail pages, UGC, platform fit, and conversion assets.</li>
      </ul>
      <p>
        For campaigns that need both, define the visual direction with{' '}
        <Link to="/docs/guides/video-generation-skills-brand-ad-cg/">brand-ad-cg</Link>, then expand it into conversion assets with{' '}
        <Link to="/docs/guides/video-generation-skills-ecommerce/">ecommerce</Link>.
      </p>
    </DocPage>
  )
}
