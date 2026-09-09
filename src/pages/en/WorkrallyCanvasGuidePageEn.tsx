import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const NODES = `[
  {
    "id": "board_001", "type": "artboard",
    "position": { "x": 0, "y": 0 }, "data": {},
    "style": { "width": 600, "height": 800 }
  },
  {
    "id": "img_in_board", "type": "image",
    "position": { "x": 20, "y": 20 },
    "data": { "asset": { "id": "asset_abc123" } },
    "style": { "width": 256, "height": 256 },
    "parentId": "board_001"
  }
]`

const DRAFT = `# Incremental merge
workrally canvas build-draft <canvas_id> --nodes '[...]'

# Delete nodes
workrally canvas build-draft <canvas_id> --delete-node-ids "id1,id2"

# Delete and add in one operation
workrally canvas build-draft <canvas_id> --nodes '[...]' --delete-node-ids "old1"

# Replace the entire canvas
workrally canvas build-draft <canvas_id> --nodes '[...]' --mode overwrite`

export default function WorkrallyCanvasGuidePageEn() {
  return (
    <DocPage
      path="/docs/guides/workrally-canvas-guide"
      title="WorkRally infinite canvas guide"
      description="Understand WorkRally canvas nodes, artboard rules, build-draft merge and overwrite modes, and project/canvas boundaries."
      headings={[
        { id: 'concepts', text: 'Project and canvas boundaries', level: 2 },
        { id: 'nodes', text: 'Eight node types', level: 2 },
        { id: 'artboard', text: 'Artboard rules', level: 2 },
        { id: 'build-draft', text: 'build-draft modes', level: 2 },
      ]}
    >
      <Callout tone="warn" title="The most common mistake">
        <p><code>project</code> and <code>canvas</code> are different. A project owns assets; a canvas is a layout surface. Never interchange their IDs.</p>
      </Callout>
      <h2 id="concepts">Project and canvas boundaries</h2>
      <ul>
        <li><code>workrally project list</code> returns project IDs for <code>asset create --project-id</code>.</li>
        <li><code>workrally canvas list</code> returns canvas IDs for <code>canvas build-draft</code> and canvas generation.</li>
        <li>A canvas asset usually belongs to a project and also needs a node on the canvas.</li>
      </ul>
      <h2 id="nodes">Eight node types</h2>
      <ul>
        <li><code>image</code>, <code>video</code>, <code>audio</code>: actual media nodes backed by assets or tasks.</li>
        <li><code>imageGenerator</code>, <code>videoGenerator</code>: generation controls, normally created by the system.</li>
        <li><code>artboard</code>: a container for image, video and audio children.</li>
        <li><code>text</code>, <code>freehand</code>: labels and annotations, not artboard children.</li>
      </ul>
      <h2 id="artboard">Artboard rules</h2>
      <ul>
        <li>Artboards can contain only <code>image</code>, <code>video</code> and <code>audio</code> nodes.</li>
        <li>Artboards cannot be nested.</li>
        <li>Do not set <code>extent: "parent"</code> on artboard children or dragging can become locked.</li>
        <li>If dimensions are omitted, the system supplies default artboard dimensions.</li>
      </ul>
      <CodeBlock lang="json" filename="artboard-example.json" code={NODES} />
      <h2 id="build-draft">build-draft modes</h2>
      <CodeBlock lang="bash" filename="build-draft.sh" code={DRAFT} />
      <p>The default is incremental merge:</p>
      <ul>
        <li>An existing ID is updated.</li>
        <li>A new ID is appended.</li>
        <li>An omitted node remains unchanged.</li>
      </ul>
      <p>Use <code>overwrite</code> only when intentionally rebuilding the entire canvas. In collaborative work, prefer incremental updates and explicit node deletion.</p>
    </DocPage>
  )
}
