import { Link } from 'react-router-dom'
import { Callout } from '../../components/ui/Callout'
import { DocPage } from '../../components/layout/DocPage'

const SOURCE_URL = 'https://mp.weixin.qq.com/s/wsYtXWkl-2WYPSHVhYjZMQ'

function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[42rem] text-left text-sm">
        <thead className="bg-white/[0.04] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(header => <th key={header} className="px-4 py-3 font-medium">{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={`border-t border-white/10 align-top${rowIndex % 2 === 1 ? ' bg-white/[0.02]' : ''}`}>
              {row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 text-[13px] leading-6 text-ink-200">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function KimiK3ReviewPageEn() {
  return (
    <DocPage
      path="/docs/guides/kimi-k3-review"
      title="Kimi K3 practical review and model comparison"
      description="A structured summary of a public Kimi K3 review covering benchmark comparisons, seven real projects, coding strengths, stability, cost observations, and limitations."
      headings={[
        { id: 'source', text: 'Source and reading notes', level: 2 },
        { id: 'conclusion', text: 'Key takeaways', level: 2 },
        { id: 'benchmarks', text: 'Benchmark comparison', level: 2 },
        { id: 'projects', text: 'Seven practical projects', level: 2 },
        { id: 'findings', text: 'Author observations', level: 2 },
        { id: 'cost', text: 'Cost and context notes', level: 2 },
        { id: 'gpt88', text: 'Using Kimi K3 with GPT88', level: 2 },
        { id: 'limitations', text: 'Limitations and evaluation advice', level: 2 },
      ]}
    >
      <Callout tone="info" title="Third-party review, not an official performance guarantee">
        <p>
          This page summarizes a public review by the Chinese developer and creator 程序员鱼皮, published on 2026-07-17. The author used Kimi Code and Kimi K3 to test public benchmarks and seven projects of increasing complexity.
        </p>
        <p><a href={SOURCE_URL} target="_blank" rel="noreferrer">Open the original WeChat article</a>. The scores, timings, plans, and prices are time-bound observations and should not be treated as GPT88 pricing or SLA.</p>
      </Callout>

      <h2 id="source">Source and reading notes</h2>
      <p>
        The review combines public benchmark signals with real project delivery. The second part is especially useful for engineering teams because it checks whether the model can start a project, use tools, inspect its own output, recover from issues, and deliver a working first version.
      </p>
      <p>
        The article compares Kimi K3 mainly with Claude Fable 5 and GPT-5.6 Sol. The numbers and conclusions below are attributed to that review and are not rewritten as official vendor claims.
      </p>

      <h2 id="conclusion">Key takeaways</h2>
      <ul>
        <li><strong>Frontend generation is the clearest strength</strong>: The author reports strong results for interactive animations, web presentations, visual layout, and frontend creativity.</li>
        <li><strong>Stability is the strongest practical conclusion</strong>: All seven projects reportedly started and completed their core flows without repeated setup failures or a long task getting stuck.</li>
        <li><strong>Long-running agents are usable</strong>: The projects used web research, documentation lookup, browser tests, screenshots, and autonomous fixes.</li>
        <li><strong>Complex engineering still needs supervision</strong>: The review reports gaps in harder engineering benchmarks, game AI, product depth, and fine-grained completion quality.</li>
      </ul>

      <h2 id="benchmarks">Benchmark comparison</h2>
      <p>The table records only values explicitly stated in the article. No missing scores are inferred.</p>
      <ComparisonTable
        headers={['Benchmark / ranking', 'Kimi K3', 'Comparison in the article', 'Reported interpretation']}
        rows={[
          ['Arena.ai frontend coding arena', 'Reported as first', 'Ahead of Claude Fable 5 and GPT-5.6 Sol', 'Frontend creativity and visual implementation are highlighted as K3 strengths.'],
          ['Terminal-Bench 2.1', '88.3%', 'GPT-5.6 Sol 88.8%; Fable 5 84.6%', 'Close to Sol and ahead of Fable 5 for terminal coding and agent workflows.'],
          ['Program Bench', '77.8%', 'GPT-5.6 Sol 77.6%; Fable 5 76.8%', 'Slightly ahead of both comparison models in the reported multi-step coding score.'],
          ['DeepSWE / FrontierSWE', 'No score stated', 'The author reports a gap to Fable 5 and Sol', 'More complex engineering tasks remain an area for improvement.'],
        ]}
      />
      <Callout tone="warn" title="Do not choose a production model from one benchmark">
        <p>Benchmark results depend on versions, prompts, tools, context, evaluation code, and sampling. Re-test your own codebase, tool calls, long documents, and recovery paths while tracking quality, latency, success rate, and actual deductions.</p>
      </Callout>

      <h2 id="projects">Seven practical projects</h2>
      <ComparisonTable
        headers={['Project', 'What it tested', 'Reported result']}
        rows={[
          ['Interactive animation explainer', 'An animated explanation of K3 attention residuals with web research and screenshot checks.', 'Good structure, connections, and interaction quality; the author preferred it to an earlier Claude attempt.'],
          ['3D animation explainer', '3D scene, documentation lookup, interactive viewpoint, and step controls.', 'A focused interface with clear nodes, links, and Transformer information flow.'],
          ['Article-to-web presentation', 'Structure extraction, full-screen presentation, code highlighting, and responsive layout.', 'Automatically identified sections and produced usable navigation and mobile layout.'],
          ['Web presentation generator', 'Full-stack input, model generation, themes, preview, and HTML export.', 'The core flow worked, but the first version was simple and lacked deeper agent tooling.'],
          ['Football game', 'The same prompt used to compare K3 with Fable 5, Sol, and Grok 4.5.', 'Stable physics and basic playability, but simple opponent strategy and behind Sol in game quality.'],
          ['Isaac-style roguelike', 'Random dungeons, combat, items, enemies, bosses, and a three-floor run.', 'The core loop reportedly worked, while art, item variety, enemies, and levels needed iteration.'],
          ['Full-stack AI coding tool', 'A VS Code / Cursor-like product with editor and agent windows.', 'The core editor-agent workflow worked, but it remained far from a mature Cursor-like product.'],
        ]}
      />

      <h2 id="findings">Author observations</h2>
      <h3>Stability and sustained execution</h3>
      <p>The author describes K3 as passing the practical “it works” threshold: all seven projects ran, and long tasks did not obviously freeze or drift. That matters for agents that must run commands, look up information, start services, inspect screenshots, and fix issues.</p>
      <h3>Frontend and visual implementation</h3>
      <p>The interactive animation, 3D explainer, and web presentation cases received the strongest feedback. The review emphasizes layout, color, motion, information decomposition, and mobile behavior.</p>
      <h3>Complex tasks still require acceptance testing</h3>
      <p>The football AI, product depth, and mature-product quality were explicit weak points. K3 can produce a runnable first version quickly, but that does not remove the need for product acceptance, boundary tests, performance checks, and iteration.</p>

      <h2 id="cost">Cost and context notes</h2>
      <p>The article cites upstream public pricing to explain why K3 is attractive for frequent coding experiments. Those figures are not GPT88 live prices; GPT88 deductions depend on the current model price, group multiplier, and console configuration.</p>
      <ComparisonTable
        headers={['Upstream figures cited by the article', 'Cache-hit input', 'Cache-miss input', 'Output']}
        rows={[
          ['Kimi K3', '$0.30 / 1M tokens', '$3.00 / 1M tokens', '$15.00 / 1M tokens'],
          ['Claude Fable 5', '$2.50 / 1M tokens', '$10.00 / 1M tokens', '$50.00 / 1M tokens'],
        ]}
      />
      <ul>
        <li>The article links high coding cache-hit rates to Mooncake, but actual hit rates depend on request prefixes, workflow, and server policy.</li>
        <li>Kimi Code plans and the author’s personal usage are product-specific and may change; they are not GPT88 billing guidance.</li>
        <li>A 1M context window is capacity, not a target. Split tasks, reuse stable prefixes, and avoid repeatedly sending large logs.</li>
      </ul>

      <h2 id="gpt88">Using Kimi K3 with GPT88</h2>
      <Callout tone="tip" title="Verify access before putting K3 into a real workflow">
        <ol>
          <li>Use GPT88’s unified API Base URL: <code>https://api.gpt88.cc</code>.</li>
          <li>Set the request model to <code>kimi-k3</code>.</li>
          <li>Call <Link to="/en/docs/api/list-models/">GET /v1/models</Link> to confirm that the API key can access K3.</li>
          <li>Use the <Link to="/en/models/kimi-k3/">Kimi K3 model page</Link> to validate a minimal OpenAI-compatible request.</li>
          <li>Benchmark your own codebase, documents, tools, and recovery paths before production adoption.</li>
        </ol>
      </Callout>

      <h2 id="limitations">Limitations and evaluation advice</h2>
      <ul>
        <li>This is a personal practical review, not a controlled laboratory report.</li>
        <li>The Arena, Terminal-Bench, and Program Bench values are time-bound observations and may change with model versions.</li>
        <li>“Runs successfully” is not the same as “production-ready”. Add authentication, validation, concurrency, logging, tests, observability, and security checks.</li>
        <li>Strong frontend results do not imply that K3 leads on every backend, mathematical, legal, research, or enterprise knowledge task.</li>
        <li>Use the article as a selection signal, then verify availability and pricing in GPT88 and test your own workload.</li>
      </ul>
      <p>
        For official API details, see the <a href="https://platform.kimi.ai/docs/guide/kimi-k3-quickstart" target="_blank" rel="noreferrer">Kimi K3 quickstart</a>. For the GPT88 recommendation, see <Link to="/en/docs/overview/">Overview</Link>.
      </p>
    </DocPage>
  )
}
