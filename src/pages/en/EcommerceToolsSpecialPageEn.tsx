import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const PATH = `Beginner
1. Understand the platform and workspace
2. Generate the first product image
3. Choose the right workspace and scene

Intermediate
4. Write controlled prompts
5. Use image-to-image and references
6. Reuse templates and scenes
7. Organize assets and prompt libraries

Advanced
8. Use the toolbox
9. Run repeatable batch workflows
10. Control usage, billing and failed jobs`

const CHECKLIST = `Before delivery:
1. The product is complete and edges are clean
2. The image matches the channel and campaign context
3. Detail images are split around clear selling points
4. Product shape, color and material remain consistent
5. Every channel uses the correct aspect ratio
6. Prompts, templates, references and failed examples are retained`

export default function EcommerceToolsSpecialPageEn() {
  return (
    <DocPage
      path="/docs/guides/ecommerce-tools-special"
      title="Ecommerce AI image production guide"
      description="A structured ecommerce workflow covering first images, prompts, references, templates, assets, batch production, delivery checks and cost control."
      headings={[
        { id: 'overview', text: 'How the guide is structured', level: 2 },
        { id: 'beginner', text: 'Beginner stage', level: 2 },
        { id: 'intermediate', text: 'Intermediate stage', level: 2 },
        { id: 'advanced', text: 'Advanced stage', level: 2 },
        { id: 'path', text: 'Recommended learning order', level: 2 },
        { id: 'delivery', text: 'Delivery checklist', level: 2 },
        { id: 'related', text: 'Related docs', level: 2 },
      ]}
    >
      <Callout tone="info" title="The goal is a repeatable production workflow">
        <p>Use this guide for ecommerce, cross-border, social commerce and marketplace assets. The goal is not simply attractive images; it is consistent, reviewable and reusable output.</p>
      </Callout>
      <h2 id="overview">How the guide is structured</h2>
      <p>Start with one reliable image, then improve control and reuse before scaling to batches and cost management.</p>
      <CodeBlock lang="text" filename="ecommerce-learning-path" code={PATH} />
      <h2 id="beginner">Beginner stage</h2>
      <ul>
        <li>Understand the platform, model access and image workspace.</li>
        <li>Generate one product image and verify the account, model and export flow.</li>
        <li>Choose a scene that supports the product instead of distracting from it.</li>
      </ul>
      <h2 id="intermediate">Intermediate stage</h2>
      <ul>
        <li>Describe subject, composition, lighting, materials and constraints explicitly.</li>
        <li>Use reference images while protecting product shape, colors and packaging.</li>
        <li>Save successful prompts, templates, scenes and reusable assets.</li>
      </ul>
      <h2 id="advanced">Advanced stage</h2>
      <ul>
        <li>Turn a standard product image into scene, detail, campaign and social assets.</li>
        <li>Use a representative SKU as the template before running a batch.</li>
        <li>Track retries, resolution, model choice, usage and failed jobs separately.</li>
      </ul>
      <h2 id="path">Recommended learning order</h2>
      <p>Do not begin with a full batch. Validate one small sample, lock the visual rules, and then increase resolution or volume.</p>
      <h2 id="delivery">Delivery checklist</h2>
      <p>“Looks good” is not enough. The asset must be complete, channel-compatible and reusable.</p>
      <CodeBlock lang="text" filename="ecommerce-delivery-checklist" code={CHECKLIST} />
      <h2 id="related">Related docs</h2>
      <ul>
        <li><Link to="/docs/guides/agent-image-studio/">Agent Image Studio</Link></li>
        <li><Link to="/docs/guides/agent-image-quality-crop-guide/">Image quality and crop prevention</Link></li>
        <li><Link to="/docs/guides/gpt-image-2-service-notice/">GPT-Image-2 service notice</Link></li>
        <li><Link to="/docs/guides/video-generation-skills-white-background-scaling/">White-background product image scaling</Link></li>
      </ul>
    </DocPage>
  )
}
