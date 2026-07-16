import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { localizePath } from '../../lib/locale'

const RECOMMENDED_LINES = `Image acceleration route
  https://img.gpt88.cc

Image workstation
  https://agent.gpt88.cc

OpenAI-compatible image API
  https://img.gpt88.cc/v1/images/generations
  https://img.gpt88.cc/v1/images/edits`

const DIRECT_CURL = `curl https://img.gpt88.cc/v1/images/generations \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-image-2",
    "prompt": "Premium ecommerce skincare poster, glass bottle, silver pump, soft natural light, minimal luxury look, no text, no watermark",
    "size": "1024x1024",
    "quality": "high",
    "n": 1
  }'`

const COMPARISON = `Native 4K
  The model generates at 4K quality directly
  Best for texture fidelity, edge clarity, facial stability, packaging details, and post-crop flexibility

Upscaled 4K
  The image starts smaller and is later enlarged by AI
  Best for output size and throughput efficiency
  Risk: soft small text, guessed details, weaker complex texture fidelity`

export default function GptImage2ServiceNoticePageEn() {
  return (
    <DocPage
      path="/docs/guides/gpt-image-2-service-notice"
      title="GPT-Image-2 Service Notice and Selection Guide"
      description="How to use the GPT88 image workstation and image acceleration route for GPT-Image-2 workflows, including 1K / 2K / 4K strategy and native 4K versus upscaled 4K."
      headings={[
        { id: 'overview', text: 'Recommended entry points', level: 2 },
        { id: 'line', text: 'Why use a dedicated image route', level: 2 },
        { id: 'account', text: 'Separate account system note', level: 2 },
        { id: 'pricing', text: 'Resolution and pricing strategy', level: 2 },
        { id: 'native-vs-upscale', text: 'Native 4K versus upscaled 4K', level: 2 },
        { id: 'api', text: 'API integration suggestion', level: 2 },
        { id: 'workflow', text: 'Recommended workflow', level: 2 },
      ]}
    >
      <Callout tone="tip" title="Short version first">
        <p>
          If your main goal is image generation, use <code>https://agent.gpt88.cc</code> for manual workflows
          and <code>https://img.gpt88.cc</code> for API-first image generation.
        </p>
      </Callout>

      <h2 id="overview">Recommended entry points</h2>
      <CodeBlock lang="text" filename="recommended-lines" code={RECOMMENDED_LINES} />
      <ul>
        <li><code>agent.gpt88.cc</code> is the visual image workstation.</li>
        <li><code>https://img.gpt88.cc</code> is the unified image API Base URL.</li>
      </ul>

      <h2 id="account">Separate account system note</h2>
      <Callout tone="warn" title="Do not mix the image workstation with the text-model site">
        <p>
          The image workstation and the text-model site are treated as separate products in operation. Do not
          assume the same console, usage view, or workflow expectations across both.
        </p>
      </Callout>

      <h2 id="line">Why use a dedicated image route</h2>
      <p>
        Image generation has different latency and payload characteristics from text chat. A separate image
        route is better for upload-heavy, batch-heavy, or latency-sensitive image workflows.
      </p>

      <h2 id="pricing">Resolution and pricing strategy</h2>
      <p>
        The current public message of this service is that 1K, 2K, and 4K sit under the same pricing tier for
        this workflow family, with practical single-image costs kept low. Exact pricing still follows the live
        platform display.
      </p>

      <h2 id="native-vs-upscale">Native 4K versus upscaled 4K</h2>
      <CodeBlock lang="text" filename="native-vs-upscale" code={COMPARISON} />
      <p>
        The shortest rule is: upscaled 4K solves output size; native 4K solves actual image quality.
      </p>

      <h2 id="api">API integration suggestion</h2>
      <p>
        For code-driven image generation, route OpenAI-compatible image requests to
        <code>https://img.gpt88.cc</code> and use the official <code>gpt-image-2</code> image endpoint family.
      </p>
      <CodeBlock lang="bash" filename="gpt-image-2-generate.sh" code={DIRECT_CURL} />
      <ul>
        <li><Link to={localizePath('/docs/api/images/', 'en')}>Image API</Link> for official endpoint structure.</li>
        <li><Link to={localizePath('/docs/guides/agent-image-studio/', 'en')}>Agent Image Studio</Link> for manual drafting workflows.</li>
      </ul>

      <h2 id="workflow">Recommended workflow</h2>
      <ol>
        <li>Draft manually in <code>agent.gpt88.cc</code>.</li>
        <li>Lock the prompt and composition direction.</li>
        <li>Move stable prompts into API scripts via <code>https://img.gpt88.cc</code>.</li>
        <li>Use cheaper / faster modes for batch support assets and higher-quality modes for covers, ads, and hero images.</li>
      </ol>
    </DocPage>
  )
}
