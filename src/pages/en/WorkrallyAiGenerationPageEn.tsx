import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const IMAGE = `workrally generate image-models -o json
workrally generate image \
  --prompt "an orange cat under a cherry tree" \
  --model <model_id> --aspect-ratio 16:9 --poll

# Reference-image generation
workrally generate image \
  --prompt "place the first image on the road in the second image" \
  --model <model_id> --input-images "https://image1,https://image2" --poll`

const VIDEO = `workrally generate video-models -o json
workrally generate video --prompt "waves on a beach at sunset" --model <provider_id> --poll
workrally generate video --mode FirstLastFrame --prompt "the character walks left to right" \
  --model <provider_id> --first-frame-url "https://start.png" --last-frame-url "https://end.png" --poll
workrally generate video --mode SubjectToVideo --prompt "the character walks through the scene" \
  --model <provider_id> --reference-assets '[{"type":"image","url":"https://character.png"}]' --poll`

export default function WorkrallyAiGenerationPageEn() {
  return (
    <DocPage
      path="/docs/guides/workrally-ai-generation"
      title="WorkRally AI generation guide"
      description="Generate images and videos with dynamic model discovery, three video modes, canvas placeholders and task polling."
      headings={[
        { id: 'rules', text: 'Core rules', level: 2 },
        { id: 'image', text: 'Image generation', level: 2 },
        { id: 'video', text: 'Video generation', level: 2 },
        { id: 'canvas', text: 'Canvas placeholders', level: 2 },
        { id: 'tasks', text: 'Task polling', level: 2 },
      ]}
    >
      <Callout tone="danger" title="Two rules matter most">
        <p>Discover model IDs at runtime. URL parameters must point to WorkRally-managed media; upload local or third-party files before using them.</p>
      </Callout>
      <h2 id="rules">Core rules</h2>
      <ul>
        <li>Run <code>workrally generate image-models -o json</code> before image generation.</li>
        <li>Run <code>workrally generate video-models -o json</code> before video generation.</li>
        <li>Do not hard-code <code>model_id</code> or <code>provider_id</code>; availability varies by environment.</li>
        <li>Upload files and use the returned managed asset URL rather than passing local paths.</li>
      </ul>
      <h2 id="image">Image generation</h2>
      <p>Start with a single prompt and a small output. Add reference images only after the basic generation path works.</p>
      <CodeBlock lang="bash" filename="image-flow.sh" code={IMAGE} />
      <h2 id="video">Video generation</h2>
      <p>WorkRally exposes text, FirstLastFrame and SubjectToVideo drivers. Choose the mode according to the available anchor assets.</p>
      <CodeBlock lang="bash" filename="video-flow.sh" code={VIDEO} />
      <ul>
        <li><strong>Text:</strong> the model creates the scene from the prompt.</li>
        <li><strong>FirstLastFrame:</strong> the motion is constrained by start and end frames.</li>
        <li><strong>SubjectToVideo:</strong> a reference subject is placed into a generated motion scene.</li>
      </ul>
      <h2 id="canvas">Canvas placeholders</h2>
      <p>Generation can create a placeholder node in the canvas so the output remains connected to the project layout. Treat the canvas update as a separate state change from the generation task.</p>
      <ul>
        <li>Keep the project and canvas IDs explicit.</li>
        <li>Do not assume a failed generation created a valid node.</li>
        <li>Use incremental build or delete/overwrite behavior according to the operation.</li>
      </ul>
      <h2 id="tasks">Task polling</h2>
      <CodeBlock lang="bash" filename="task-flow.sh" code={`# Automatic polling\nworkrally generate image --prompt "..." --model <id> --poll\n\n# Manual lookup\nworkrally generate task <task_id> -o json\nworkrally generate task <task_id> --poll`} />
      <p>Keep the task ID, request parameters and raw response. Poll with a limit, classify queued, running, succeeded and failed states, and do not create duplicate work after a client timeout until the original task is checked.</p>
      <p>For uploads, canvas composition and troubleshooting, continue with the <Link to="/docs/guides/workrally-overview/">WorkRally overview</Link>.</p>
    </DocPage>
  )
}
