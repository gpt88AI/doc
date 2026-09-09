import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const WORKFLOW = `PROJECT_ID=$(workrally project create "My series" -o json | jq -r '.project_id')
SERIES_ID=$(workrally series create --project-id $PROJECT_ID --name "Episode 1" -o json | jq -r '.series_id')
workrally shot create --series-id $SERIES_ID --json-list '[
  {"image_prompt":"wide ancient courtyard","animation_prompt":"slow push-in"},
  {"image_prompt":"two heroes facing each other","animation_prompt":"push to close-up"}
]'
workrally shot recognize --project-id $PROJECT_ID --series-id $SERIES_ID
workrally shot image-models -o json
workrally shot video-models -o json
workrally shot set-model --series-id $SERIES_ID --video-provider <provider> --duration 5 --aspect-ratio 16:9
STORY_IDS=$(workrally shot list --series-id $SERIES_ID -o json | jq -r '[.story_list[].story_id] | join(",")')
workrally shot generate-image --story-ids "$STORY_IDS"
workrally shot generate-video --story-ids "$STORY_IDS"
workrally shot get-result --story-id <story_id> --type image --watch`

export default function WorkrallyShotWorkflowPageEn() {
  return (
    <DocPage
      path="/docs/guides/workrally-shot-workflow"
      title="WorkRally series and shot workflow"
      description="Create projects, series and shots, recognize characters, configure models, generate batches and query results."
      headings={[
        { id: 'structure', text: 'Structure', level: 2 },
        { id: 'workflow', text: 'Standard workflow', level: 2 },
        { id: 'models', text: 'Shot-specific model configuration', level: 2 },
        { id: 'recognize', text: 'Character recognition', level: 2 },
        { id: 'results', text: 'Result queries', level: 2 },
      ]}
    >
      <Callout tone="info" title="The shot workflow is WorkRally's core production loop">
        <p>The durable <code>project -&gt; series -&gt; shot</code> structure is what turns individual generations into a repeatable production line.</p>
      </Callout>
      <h2 id="structure">Structure</h2>
      <ul>
        <li><code>project</code> is the top-level container.</li>
        <li><code>series</code> belongs to a project.</li>
        <li><code>shot</code> or <code>story</code> belongs to a series and carries image and animation prompts.</li>
        <li><code>image_prompt</code> defines the keyframe; <code>animation_prompt</code> defines motion and camera movement.</li>
      </ul>
      <h2 id="workflow">Standard workflow</h2>
      <CodeBlock lang="bash" filename="shot-workflow.sh" code={WORKFLOW} />
      <p>When starting from a novel, script or storyboard, split the story into scene paragraphs first, then write them in batches with <code>shot create --json-list</code>.</p>
      <h2 id="models">Shot-specific model configuration</h2>
      <Callout tone="warn" title="Do not mix canvas and shot model endpoints">
        <p>Use <code>workrally shot image-models</code> and <code>workrally shot video-models</code> for shots. The generate endpoints return different fields and downstream behavior.</p>
      </Callout>
      <ul>
        <li>Use <code>--video-provider</code>; the CLI derives the required mode and provider configuration.</li>
        <li>Select image models from the runtime <code>models[].en_name</code> values.</li>
        <li>Aspect ratio, duration and audio support come from the current model response.</li>
      </ul>
      <h2 id="recognize">Character recognition</h2>
      <p><code>shot recognize</code> reads <code>image_prompt</code> and <code>animation_prompt</code> and writes recognition results back to their corresponding fields. If only one prompt exists, only that path is recognized.</p>
      <h2 id="results">Result queries</h2>
      <p><code>generate-image</code> and <code>generate-video</code> indicate submission, not completion. Query with <code>shot get-result --story-id &lt;id&gt; --type image|video</code>.</p>
      <ul>
        <li><code>state = all_done</code> means no task of that type remains in progress.</li>
        <li><code>doing_count</code>, <code>done_count</code> and <code>failed_count</code> show progress.</li>
        <li><code>--watch</code> polls at intervals until the task reaches a terminal state.</li>
      </ul>
    </DocPage>
  )
}
