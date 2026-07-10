import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const ENTRY_POINTS = `Recommended entry points
  Image studio: https://agent.gpt88.cc/
  Console / API keys: https://gpt88.cc

Common related areas
  Image Studio: /image-studio
  Prompt case library: /xsct-cases
  Usage / balance: console dashboard
  API keys: console keys`

const WORKFLOW = `1. Sign in and confirm usable balance
2. Open https://agent.gpt88.cc/
3. Choose the task mode: main image, scene image, model image, detail asset, background removal, inpaint, extend, or upscale
4. Upload the product image or reference image
5. Choose model, ratio, resolution, format, and quality
6. Generate one small draft first
7. Lock the direction, then move to 2K / 4K or batch generation
8. Download results and verify usage in the console`

const PROMPT_TEMPLATE = `Subject: one luxury skincare serum bottle, glass body, silver pump
Scene: minimal white bathroom counter, soft natural light, clean premium look
Composition: centered product, keep top headline area free, suitable for ecommerce hero image
Style: commercial photography, realistic materials, premium detail
Limits: no text, no watermark, no logo, do not change bottle structure`

const BATCH_CHECKLIST = `Before batch generation:

1. One sample image has already confirmed style, composition, and product consistency
2. The prompt explicitly locks non-changeable elements such as bottle shape, color, and package structure
3. Target ratios are listed clearly: 1:1, 3:4, 4:3, 16:9, 9:16
4. Validate in 1K first, then move to 2K / 4K
5. Batch task names are clear enough for download, filtering, and reuse`

export default function AgentImageStudioGuidePageEn() {
  return (
    <DocPage
      path="/docs/guides/agent-image-studio"
      title="GPT88 Agent Image Studio Guide"
      description="Use agent.gpt88.cc to generate ecommerce hero images, scene images, model images, detail assets, reusable prompt cases, and batch image outputs."
      headings={[
        { id: 'overview', text: 'Entry points and positioning', level: 2 },
        { id: 'scenarios', text: 'Best-fit scenarios', level: 2 },
        { id: 'prepare', text: 'Preparation', level: 2 },
        { id: 'workflow', text: 'Recommended workflow', level: 2 },
        { id: 'modes', text: 'Mode overview', level: 2 },
        { id: 'models', text: 'Models and specs', level: 2 },
        { id: 'batch', text: 'Batch generation advice', level: 2 },
        { id: 'api-skill', text: 'Relation to API and Codex skill flows', level: 2 },
        { id: 'cost', text: 'Cost and quality advice', level: 2 },
      ]}
    >
      <Callout tone="info" title="Good for non-code production and for API users doing visual drafts first">
        <p>
          <a href="https://agent.gpt88.cc/" target="_blank" rel="noreferrer" className="text-violet-300 hover:text-violet-200">
            agent.gpt88.cc
          </a>{' '}
          is the GPT88 image workstation. It combines <code>gpt-image-2</code>, Gemini image models, ecommerce
          image templates, and batch workflows in one visual interface.
        </p>
      </Callout>

      <h2 id="overview">Entry points and positioning</h2>
      <p>
        This is not a chat-first product. It is a task-oriented image workstation for uploading reference
        assets, selecting generation modes, shaping prompts, and exporting finished visuals.
      </p>
      <CodeBlock lang="text" filename="entry-points" code={ENTRY_POINTS} />

      <h2 id="scenarios">Best-fit scenarios</h2>
      <ul>
        <li>Ecommerce hero images and marketplace cover images.</li>
        <li>Scene images for product lifestyle presentation.</li>
        <li>Model images for fashion, beauty, accessories, and product trials.</li>
        <li>Detail-page assets, material closeups, and sales-point graphics.</li>
        <li>Background replacement, inpainting, outpainting, and upscaling.</li>
      </ul>

      <h2 id="prepare">Preparation</h2>
      <ul>
        <li>Sign in and confirm balance.</li>
        <li>Create an API key if you want to reuse results in automation later.</li>
        <li>Prepare product photos, reference images, brand color direction, and fixed product constraints.</li>
        <li>Confirm image-model access such as <code>gpt-image-2</code> or Gemini image models.</li>
      </ul>

      <h2 id="workflow">Recommended workflow</h2>
      <p>
        The most stable path is draft first, scale later. Do not start with expensive large-size batch jobs.
      </p>
      <CodeBlock lang="text" filename="agent-image-workflow" code={WORKFLOW} />
      <p>Example prompt skeleton for an ecommerce hero image:</p>
      <CodeBlock lang="text" filename="prompt-template" code={PROMPT_TEMPLATE} />

      <h2 id="modes">Mode overview</h2>
      <ul>
        <li><code>main</code>: ecommerce hero and key product image</li>
        <li><code>scene</code>: lifestyle or environment scene image</li>
        <li><code>model</code>: model-worn or person-centered presentation</li>
        <li><code>detail</code>: detail-page material or selling-point asset</li>
        <li><code>remove-background</code>: clean cutout or simplified background</li>
        <li><code>background</code>: replace or standardize the background system</li>
        <li><code>inpaint</code>: local repair or partial image replacement</li>
        <li><code>extend</code>: outpainting and ratio adaptation</li>
        <li><code>upscale</code>: final resolution enhancement</li>
      </ul>

      <h2 id="models">Models and specs</h2>
      <p>
        The workstation exposes image models according to account permission. In practice, use
        <code>gpt-image-2</code> when you want a stable API-oriented flow, and use the visual workstation when
        you want manual drafting and fast directional validation.
      </p>
      <ul>
        <li>Common resolutions: <code>1K</code>, <code>2K</code>, <code>4K</code>.</li>
        <li>Common ratios: <code>1:1</code>, <code>3:4</code>, <code>4:3</code>, <code>2:3</code>, <code>3:2</code>, <code>9:16</code>, <code>16:9</code>.</li>
        <li>Common formats: <code>png</code>, <code>webp</code>, <code>jpeg</code>.</li>
      </ul>

      <h2 id="batch">Batch generation advice</h2>
      <CodeBlock lang="text" filename="batch-checklist" code={BATCH_CHECKLIST} />

      <h2 id="api-skill">Relation to API and Codex skill flows</h2>
      <ul>
        <li><a href="https://agent.gpt88.cc/" target="_blank" rel="noreferrer">agent.gpt88.cc</a> for manual drafting and visual review.</li>
        <li><Link to={localizePath('/docs/api/images/', 'en')}>Image Generation API</Link> for direct programmatic use.</li>
        <li><Link to={localizePath('/docs/guides/codex-gpt-image-2-skill/', 'en')}>Codex gpt-image-2 Skill</Link> for file-producing Codex automation.</li>
        <li><Link to={localizePath('/models/', 'en')}>Models</Link> for model IDs and protocol references.</li>
      </ul>

      <h2 id="cost">Cost and quality advice</h2>
      <ul>
        <li>Use low resolution and single-image drafts to confirm direction before moving to 2K / 4K.</li>
        <li>Do not mix text layout and base image generation into one request when quality matters.</li>
        <li>For ecommerce, product consistency matters more than style experimentation.</li>
        <li>Review prompt lists before batch runs so you do not multiply the wrong direction.</li>
      </ul>
    </DocPage>
  )
}
