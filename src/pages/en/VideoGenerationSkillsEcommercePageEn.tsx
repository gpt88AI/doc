import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const FLOW = `1. Read cheatsheet.md
2. Read confirmation-gates.md
3. Confirm the product category, platform, and input assets
4. Draft the production workflow
5. Open the reference for the selected vertical
6. Produce prompts, operating steps, and batch-variation rules`

const ROUTING = `Fashion
  Read: references/fashion.md

Consumer electronics
  Read: references/3c-digital.md

Beauty / home / pets / wellness
  Read: references/verticals.md

Shared production patterns
  Read: references/workflows.md`

const OUTPUT = `## Product category and platform
## Input assets
## Workflow steps
## Tool and prompt notes for each step
## Batch variation strategy`

export default function VideoGenerationSkillsEcommercePageEn() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-ecommerce"
      title="Ecommerce Content Production Guide"
      description="A practical guide to using video-generation-skills for product images, detail pages, UGC, short videos, and scalable ecommerce assets."
      headings={[
        { id: 'position', text: 'What it solves', level: 2 },
        { id: 'flow', text: 'Standard workflow', level: 2 },
        { id: 'verticals', text: 'Vertical routing', level: 2 },
        { id: 'product', text: 'Consumer electronics', level: 2 },
        { id: 'fashion', text: 'Fashion', level: 2 },
        { id: 'vertical-details', text: 'Other verticals', level: 2 },
        { id: 'scaling', text: 'Scaling one product into an asset set', level: 2 },
        { id: 'output', text: 'Recommended output', level: 2 },
      ]}
    >
      <Callout tone="info" title="Ecommerce is a production system, not a single prompt">
        <p>
          This module covers fashion, consumer electronics, beauty, home, pets, and wellness. Its
          value is platform-aware production: product pages, hero images, lookbooks, UGC, short
          videos, and reusable batches follow different rules.
        </p>
      </Callout>

      <h2 id="position">What it solves</h2>
      <p>
        Ecommerce assets need to communicate a product benefit while fitting a specific platform and
        audience. A marketplace listing, a TikTok Shop clip, an Instagram post, and a lifestyle ad
        should not share one undifferentiated prompt. Start by identifying the SKU, channel, and
        source material.
      </p>

      <h2 id="flow">Standard workflow</h2>
      <CodeBlock lang="text" filename="ecommerce-flow" code={FLOW} />
      <p>
        Ask before generating when the category, platform, or source assets are unclear. A prompt for
        a fashion lookbook is structurally different from one for headphones or a skincare product.
      </p>

      <h2 id="verticals">Vertical routing</h2>
      <CodeBlock lang="text" filename="vertical-routing" code={ROUTING} />

      <h2 id="product">Consumer electronics</h2>
      <p>
        Lock the product geometry before styling the scene. Separate hero product views, material
        details, feature visualisation, and real-world usage into different shot types. For complex
        perspective posters or exploded views, use a sketch or reference image to anchor the hardware
        structure before image-to-image generation.
      </p>
      <ul>
        <li>Keep product proportions and key controls stable across the asset set.</li>
        <li>Reserve clean space for copy instead of asking the image model to render dense text.</li>
        <li>Use a visual hook and pacing for reversal ads or fan and speaker campaigns, not only glossy rendering.</li>
      </ul>

      <h2 id="fashion">Fashion</h2>
      <p>
        Fashion production works best when the person, garment, and setting are managed as one system.
        Separate flat lays, hanging shots, model images, and turnarounds. Detail pages prioritise fit,
        fabric, and use context; UGC prioritises phone-camera realism, believable gestures, and a clear
        action chain.
      </p>
      <ul>
        <li>Build a stable garment and model reference before creating a lookbook.</li>
        <li>Create a lifestyle first frame before expanding a white-background product image into a short clip.</li>
        <li>For mirror selfies and buyer-style content, authentic framing matters more than cinematic lighting.</li>
      </ul>

      <h2 id="vertical-details">Other verticals</h2>
      <p>
        Wellness content benefits from benefit visualisation, spoken explanation, and time-based change.
        Home products need credible scale and contact with the room. Beauty usually splits into texture
        close-ups, model use, seasonal key visuals, and short-form video. Pet commerce works better with
        a light narrative and an anthropomorphic situation than with a product placed beside an animal.
      </p>

      <h2 id="scaling">Scaling one product into an asset set</h2>
      <p>
        Treat each SKU as an asset pool. Start with a consistent scene language, then derive the hero
        image, detail-page panels, video first frame, and advertising variations. Keep the palette,
        camera language, model type, and product scale stable so a batch still reads as one brand.
      </p>
      <p>
        For a deeper workflow from a white-background image, continue with{' '}
        <Link to="/docs/guides/video-generation-skills-white-background-scaling/">the white-background scaling guide</Link>.
        For premium advertising, see <Link to="/docs/guides/video-generation-skills-brand-ad-cg/">brand-ad-cg</Link>;
        for narrative video, see <Link to="/docs/guides/video-generation-skills-ai-video-director/">ai-video-director</Link>.
      </p>

      <h2 id="output">Recommended output</h2>
      <CodeBlock lang="text" filename="ecommerce-output" code={OUTPUT} />
    </DocPage>
  )
}
