import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'
import { localizePath } from '../../lib/locale'

const SETUP = `BASE_URL=https://img.gpt88.cc
API_KEY=your-gpt88-api-key
MODEL=gemini-3-pro-image-preview

Image generation uses the native Gemini generateContent endpoint.`

const IMAGE_TEST = `curl -s -X POST \\
  "https://img.gpt88.cc/v1beta/models/gemini-3-pro-image-preview:generateContent" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contents": [{"parts": [{"text": "Generate a 1:1 tech-style icon with no text"}]}],
    "generationConfig": {
      "responseModalities": ["TEXT", "IMAGE"],
      "imageConfig": {
        "aspectRatio": "1:1",
        "imageSize": "1K"
      }
    }
  }'`

export default function GeminiCliPageEn() {
  return (
    <DocPage
      path="/docs/integrations/dev/gemini-cli"
      title="Gemini CLI with gpt88.cc"
      description="Use Gemini CLI and Google image models through gpt88.cc."
      headings={[
        { id: 'setup', text: 'Configuration', level: 2 },
        { id: 'image', text: 'Image endpoint test', level: 2 },
        { id: 'notes', text: 'Notes', level: 2 },
        { id: 'next', text: 'Next steps', level: 2 },
      ]}
    >
      <Callout tone="info" title="Gemini image models use native generateContent">
        <p>
          Gemini image generation does not use the standard <code>/v1/chat/completions</code> path. It uses
          the native <code>/v1beta/models/:generateContent</code> endpoint.
        </p>
      </Callout>

      <h2 id="setup">Configuration</h2>
      <CodeBlock lang="text" filename="setup" code={SETUP} />

      <h2 id="image">Image endpoint test</h2>
      <CodeBlock lang="bash" filename="gemini-image-test.sh" code={IMAGE_TEST} />

      <h2 id="notes">Notes</h2>
      <ul>
        <li>For image generation, use the media Base URL <code>https://img.gpt88.cc</code>.</li>
        <li>Aspect ratios must use Gemini-supported values such as <code>1:1</code>, <code>16:9</code>, or <code>9:16</code>.</li>
        <li>Image sizes use uppercase values such as <code>1K</code>, <code>2K</code>, and <code>4K</code>.</li>
      </ul>

      <h2 id="next">Next steps</h2>
      <ul>
        <li><Link to={localizePath('/docs/api/images/', 'en')}>Read the image API guide</Link>.</li>
        <li><Link to={localizePath('/docs/integrations/', 'en')}>Return to the integrations hub</Link>.</li>
      </ul>
    </DocPage>
  )
}
