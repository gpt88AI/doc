import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const PITFALLS = `1. Using a project ID as a canvas ID
2. Hard-coding a model ID or provider
3. Constructing frontend URLs by hand
4. Calling build-draft again after canvas generation already created a node
5. Skipping asset create after upload
6. Omitting material_id or material_detail from material add
7. Putting text, freehand or generator nodes inside an artboard
8. Setting extent: "parent" on artboard children
9. Using material_id with role get
10. Using original_url for audio/video operations`

export default function WorkrallyCommonPitfallsPageEn() {
  return (
    <DocPage
      path="/docs/guides/workrally-common-pitfalls"
      title="WorkRally common pitfalls and troubleshooting"
      description="Diagnose the most common WorkRally CLI failures involving projects, canvases, uploads, URLs, models, materials and node structure."
      headings={[
        { id: 'list', text: 'Ten frequent pitfalls', level: 2 },
        { id: 'common', text: 'Four recurring mistakes', level: 2 },
        { id: 'checks', text: 'Troubleshooting order', level: 2 },
      ]}
    >
      <Callout tone="danger" title="Check identifiers and ownership before blaming the model">
        <p>Most WorkRally failures come from IDs, URLs, asset ownership, node types or step order rather than from the model.</p>
      </Callout>
      <h2 id="list">Ten frequent pitfalls</h2>
      <CodeBlock lang="text" filename="pitfalls" code={PITFALLS} />
      <h2 id="common">Four recurring mistakes</h2>
      <ul>
        <li>Using an ID from <code>project list</code> where a canvas ID is required.</li>
        <li>Assuming upload is enough and skipping <code>asset create</code>.</li>
        <li>Hard-coding a model because it worked in one environment.</li>
        <li>Adding a second <code>build-draft</code> after automatic generation already created the node.</li>
      </ul>
      <CodeBlock lang="bash" filename="fix-upload.sh" code={`# Wrong: stop after upload\nworkrally upload ./file.png -o json\n\n# Correct: ingest the returned URL as a project asset\nworkrally upload ./file.png -o json\nworkrally asset create --url <cdn_url> --project-id <project_id> -o json`} />
      <h2 id="checks">Troubleshooting order</h2>
      <ol>
        <li>Identify whether the operation is for a project, canvas, asset, material or shot.</li>
        <li>Confirm that every ID came from the matching list or get command.</li>
        <li>Confirm the URL is a current WorkRally-managed media URL.</li>
        <li>Only then inspect model, aspect ratio, duration, count and prompt.</li>
      </ol>
      <p>When uncertain, run <code>workrally tools describe &lt;tool_name&gt;</code> to inspect the current schema, then compare the request with the relevant focused guide.</p>
    </DocPage>
  )
}
