import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const CAPABILITIES = `AI images: Kontext, multi-reference input and canvas placeholders
AI video: text, first/last frame, subject-to-video, polling and batches
Projects: project, series, shot CRUD, character recognition and model config
Assets: upload -> asset create -> material add
Canvas: Yjs collaboration, eight node types and incremental build-draft updates`

export default function WorkrallyOverviewPageEn() {
  return (
    <DocPage
      path="/docs/guides/workrally-overview"
      title="WorkRally Skills overview"
      description="An overview of WorkRally CLI capabilities, installation, scenario routing and focused tutorials based on the official Tencent/workrally materials."
      headings={[
        { id: 'what', text: 'What this Skill package is', level: 2 },
        { id: 'capabilities', text: 'Core capabilities', level: 2 },
        { id: 'install', text: 'Installation and access', level: 2 },
        { id: 'concepts', text: 'Four concepts to understand first', level: 2 },
        { id: 'pages', text: 'Tutorial map', level: 2 },
        { id: 'routing', text: 'Choose the right tutorial', level: 2 },
      ]}
    >
      <Callout tone="info" title="Source and scope">
        <p>This page reorganizes the official <a href="https://github.com/Tencent/workrally" target="_blank" rel="noreferrer">Tencent/workrally</a> Skill, README and reference materials into task-oriented documentation.</p>
      </Callout>
      <h2 id="what">What this Skill package is</h2>
      <p>WorkRally CLI is an Agent-oriented production toolchain for animated stories and video creation. It connects projects, series, shots, uploads, assets, canvas layout, AI image generation and AI video generation.</p>
      <p>The workflow starts with story and character assets, then moves through keyframes, animation, asset management and canvas composition instead of stopping at a single image or video API call.</p>
      <h2 id="capabilities">Core capabilities</h2>
      <CodeBlock lang="text" filename="workrally-capabilities" code={CAPABILITIES} />
      <h2 id="install">Installation and access</h2>
      <CodeBlock lang="bash" filename="quickstart.sh" code={`npm install -g workrally\nworkrally auth login\nworkrally auth status`} />
      <p>After authentication, use the <code>workrally</code> CLI as the stable entry point instead of manually composing many backend requests.</p>
      <h2 id="concepts">Four concepts to understand first</h2>
      <ul>
        <li><strong>Project:</strong> the top-level container for assets. Assets must belong to a project to appear in the web interface.</li>
        <li><strong>Canvas:</strong> the infinite layout space for nodes, boards, text, media and sketches.</li>
        <li><strong>Asset:</strong> the project-level file record created after upload.</li>
        <li><strong>Material:</strong> the tree view that organizes characters, props, scenes and folders.</li>
      </ul>
      <h2 id="pages">Tutorial map</h2>
      <ul>
        <li><Link to="/docs/guides/workrally-ai-generation/">AI generation</Link>: images, video, placeholders, polling and model discovery.</li>
        <li><Link to="/docs/guides/workrally-upload-assets/">Uploads and assets</Link>: upload, asset creation and material organization.</li>
        <li><Link to="/docs/guides/workrally-shot-workflow/">Series and shot workflow</Link>: series, shots, character recognition and batch generation.</li>
        <li><Link to="/docs/guides/workrally-canvas-guide/">Infinite canvas</Link>: node types, boards, incremental merge and overwrite modes.</li>
        <li><Link to="/docs/guides/workrally-common-pitfalls/">Common pitfalls</Link>: project/canvas confusion, expired URLs, hard-coded models and invalid nodes.</li>
      </ul>
      <h2 id="routing">Choose the right tutorial</h2>
      <ul>
        <li>Generating images or videos: start with AI generation.</li>
        <li>Uploading files or building an asset tree: read uploads and assets.</li>
        <li>Building episodes, shots or batch scenes: read the series workflow.</li>
        <li>Arranging media on a board: read the infinite canvas guide.</li>
        <li>Seeing an error or unexpected result: start with common pitfalls.</li>
      </ul>
    </DocPage>
  )
}
