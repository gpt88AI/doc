import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const FLOW = `# Step 1: upload to the media CDN
workrally upload ./character.png -o json

# Step 2: create the project asset (required)
workrally asset create --url <cdn_url> --project-id <project_id> -o json

# Step 3: attach it to the material tree (optional)
workrally material add --json-list '[{
  "material_id": "<asset_id>",
  "material_name": "character_state",
  "material_type": 2,
  "parent_id": "<parent_id>",
  "material_detail": <asset_details>
}]' --project-ids <project_id>`

const CANVAS = `workrally upload ./file.png -o json
workrally asset create --url <cdn_url> --project-id <project_id> -o json
workrally canvas build-draft <canvas_id> --nodes '[
  {
    "id":"node1","type":"image",
    "position":{"x":0,"y":0},
    "data":{"asset":{"id":"<asset_id>"}},
    "style":{"width":512,"height":512}
  }
]'`

export default function WorkrallyUploadAssetsPageEn() {
  return (
    <DocPage
      path="/docs/guides/workrally-upload-assets"
      title="WorkRally uploads and asset management"
      description="Understand the upload, asset and material layers, including project ingestion, character/prop/scene organization and canvas placement."
      headings={[
        { id: 'systems', text: 'Two asset systems', level: 2 },
        { id: 'flow', text: 'The standard three-step upload flow', level: 2 },
        { id: 'when', text: 'How many steps do you need?', level: 2 },
        { id: 'canvas', text: 'Upload an asset to a canvas', level: 2 },
      ]}
    >
      <Callout tone="danger" title="Upload does not mean usable">
        <p><code>upload</code> sends a file to the CDN. The system only recognizes it as a project asset after <code>asset create</code>.</p>
      </Callout>
      <h2 id="systems">Two asset systems</h2>
      <ul>
        <li><strong>Asset library:</strong> the project-level file pool; every usable file must enter here.</li>
        <li><strong>Material library:</strong> the tree view for characters, props, scenes and folders.</li>
      </ul>
      <p>In short, assets answer “can the system use this file?” and materials answer “how do people organize and find it?”</p>
      <h2 id="flow">The standard three-step upload flow</h2>
      <CodeBlock lang="bash" filename="upload-flow.sh" code={FLOW} />
      <ul>
        <li>Step 1 returns a CDN URL.</li>
        <li>Step 2 returns <code>asset_id</code> and complete <code>asset_details</code>.</li>
        <li>Step 3 is needed when the file belongs under a character, prop, scene or folder.</li>
      </ul>
      <p><code>material add</code> needs both <code>material_id = asset_id</code> and the complete <code>material_detail = asset_details</code>. Omitting either can make the material invisible.</p>
      <h2 id="when">How many steps do you need?</h2>
      <ul>
        <li>Upload a file or image: <code>upload -&gt; asset create</code>.</li>
        <li>Attach it to a character, prop or scene: run all three steps.</li>
        <li>Attach an existing asset to the material tree: run only <code>material add</code>.</li>
        <li>Place an asset on a canvas: ingest it first, then use <code>canvas build-draft</code>.</li>
      </ul>
      <h2 id="canvas">Upload an asset to a canvas</h2>
      <CodeBlock lang="bash" filename="canvas-upload.sh" code={CANVAS} />
      <p><code>project_id</code> identifies asset ownership and <code>canvas_id</code> identifies the placement surface. Both IDs are required for this workflow.</p>
    </DocPage>
  )
}
