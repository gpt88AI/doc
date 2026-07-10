import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const SAFE_PROMPT = `Composition requirements:
- the full subject must stay inside the frame
- no cropped head, hands, feet, props, or clothing edges
- centered subject
- subject occupies about 65%-75% of image height
- keep 10%-15% safe margin on all sides
- use a medium-wide or full-body framing, not close-up, not macro
- no text, no watermark, no UI, no border`

const SIZE_GUIDE = `gpt-image-2 anti-crop size examples:

Landscape poster / video cover
- size: 1536x1024
- prompt: wide shot, centered composition, full subject visible

Portrait poster / full-body character
- size: 1024x1536
- prompt: full body shot, ample negative space around the subject

Square ecommerce main image
- size: 1024x1024
- prompt: centered product shot, product occupies about 70% of image height`

const ENGLISH_PROMPT_EXAMPLE = `A premium ecommerce product photo of a luxury skincare serum bottle, full bottle and pump clearly visible, centered composition, medium distance product shot, the bottle occupies about 70% of the image height, with 12% safe margin on all sides. Clean white studio background, soft diffused lighting, realistic glass material, sharp product edges, premium commercial photography style. Do not crop the cap, pump, bottle bottom, label, or package edges. No text, no watermark, no UI elements.`

const API_SAFE_CURL = `curl https://img.gpt88.cc/v1/images/generations \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-image-2",
    "prompt": "full-body character sheet, centered character, hair, hands, feet, props, and clothing edges must remain fully visible, keep 12 percent safe margin on all sides, white background, premium 3D animation look, no text, no watermark",
    "size": "1024x1536",
    "quality": "high",
    "n": 1
  }'`

const BATCH_CHECKLIST = `Before batch image generation:

1. Validate composition with 1-3 small runs first
2. Lock the final target ratio
3. Explicitly write both full-subject visibility and safe margin rules
4. Avoid conflicts such as close-up plus full-body in the same prompt
5. Break complex tasks into multiple steps instead of overloading one image`

export default function AgentImageQualityCropGuidePageEn() {
  return (
    <DocPage
      path="/docs/guides/agent-image-quality-crop-guide"
      title="agent.gpt88.cc Image Quality and Cropping Guide"
      description="How to reduce cropping, weak detail, unstable character sheets, and poor batch results when generating images in agent.gpt88.cc and GPT-Image-2 workflows."
      headings={[
        { id: 'overview', text: 'Identify the problem type first', level: 2 },
        { id: 'crop-causes', text: 'Why cropping happens', level: 2 },
        { id: 'safe-area', text: 'Core anti-cropping prompt structure', level: 2 },
        { id: 'size-control', text: 'Use size to control the canvas', level: 2 },
        { id: 'prompt-optimization', text: 'Use a stronger model to refine prompts', level: 2 },
        { id: 'api', text: 'Batch API advice', level: 2 },
        { id: 'checklist', text: 'Delivery checklist', level: 2 },
      ]}
    >
      <Callout tone="tip" title="Core conclusion">
        <p>
          Cropping usually does not mean the model cannot draw the full subject. It usually means the canvas
          ratio, prompt composition, shot distance, and subject density are fighting each other.
        </p>
      </Callout>

      <h2 id="overview">Identify the problem type first</h2>
      <ul>
        <li>True generation cropping: the downloaded image already cuts off the subject.</li>
        <li>Preview cropping: the original image is fine, but a platform card or cover frame cuts it later.</li>
        <li>Quality failure: details, text edges, facial stability, or material fidelity are weak.</li>
      </ul>

      <h2 id="crop-causes">Why cropping happens</h2>
      <ul>
        <li>The prompt describes what to draw, but not how to fit it into the frame.</li>
        <li>The target canvas ratio does not fit the subject shape.</li>
        <li>The prompt mixes conflicting camera language such as <code>close-up</code> and <code>full body</code>.</li>
        <li>One image is overloaded with too many views, props, or detail requirements at once.</li>
      </ul>

      <h2 id="safe-area">Core anti-cropping prompt structure</h2>
      <CodeBlock lang="text" filename="safe-area-prompt" code={SAFE_PROMPT} />

      <h2 id="size-control">Use size to control the canvas</h2>
      <p>
        For GPT-Image-2-style workflows, <code>size</code> is the first-level cropping control. It defines the
        composition canvas from the start rather than forcing a later crop.
      </p>
      <CodeBlock lang="text" filename="size-guide" code={SIZE_GUIDE} />

      <h2 id="prompt-optimization">Use a stronger model to refine prompts</h2>
      <p>
        A practical workflow is to ask a stronger text model to rewrite a rough prompt into a cleaner English
        image prompt that includes subject scale, safe margins, camera distance, and conflict removal.
      </p>
      <CodeBlock lang="text" filename="english-prompt-example" code={ENGLISH_PROMPT_EXAMPLE} />

      <h2 id="api">Batch API advice</h2>
      <p>Do not start large batch runs before one safe composition is proven.</p>
      <CodeBlock lang="bash" filename="safe-curl-example.sh" code={API_SAFE_CURL} />

      <h2 id="checklist">Delivery checklist</h2>
      <CodeBlock lang="text" filename="batch-checklist" code={BATCH_CHECKLIST} />
    </DocPage>
  )
}
