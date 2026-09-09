import { Callout } from '../../components/ui/Callout'
import { DocPage } from '../../components/layout/DocPage'

const SOURCE = 'https://note.mowen.cn/detail/dc8O65jTVGq0SBGNqSvb5'

const METRICS = [
  ['Artificial Analysis Intelligence Index', '61; the source note described parity with GPT-5.6 Sol Max.', 'One external signal, not proof of equal performance on every task.'],
  ['Terminal-Bench v2.1', '88.4%', 'Closer to terminal and agent execution, but test version and tool permissions matter.'],
  ['GDPval-AA v2 Elo', '1753', 'A ranking within that benchmark, not a direct business success rate.'],
]

export default function Grok46ReviewPageEn() {
  return (
    <DocPage
      path="/docs/guides/grok-4-6-review"
      title="Grok 4.6 Review: Coding Agents and DeepSeek V4 Pro"
      description="A source-bounded summary of a public comparison between Grok 4.6 and DeepSeek V4 Pro, including benchmarks, long-running agents, price boundaries, and model-selection advice."
      headings={[
        { id: 'source', text: 'Source and scope', level: 2 },
        { id: 'conclusion', text: 'Key conclusions', level: 2 },
        { id: 'scores', text: 'Reported Grok 4.6 metrics', level: 2 },
        { id: 'comparison', text: 'Different strengths', level: 2 },
        { id: 'choose', text: 'How to choose', level: 2 },
        { id: 'limitations', text: 'Limitations and retesting', level: 2 },
      ]}
    >
      <Callout tone="info" title="Third-party review, not an official performance or price promise">
        <p>
          This page summarises a public note published on August 13, 2026. It reports an AskCat comparison
          rather than an independent reproduction by GPT88. Model versions, test setup, routing, and prices can change.
        </p>
        <p><a href={SOURCE} target="_blank" rel="noreferrer">Read the original note</a>.</p>
      </Callout>

      <h2 id="source">Source and scope</h2>
      <p>
        The source note presents Grok 4.6 as a candidate for coding, bug investigation, and long-running agent
        workloads. It presents DeepSeek V4 Pro as a lower-cost, large-context, more deployment-flexible option.
        Treat this as a candidate-set signal, not a substitute for your own release validation.
      </p>

      <h2 id="conclusion">Key conclusions</h2>
      <ul>
        <li><strong>Grok 4.6:</strong> the note favours it for long-running coding agents, debugging, interaction, and visual tasks.</li>
        <li><strong>DeepSeek V4 Pro:</strong> the note emphasises price, one-million-token context, reasoning modes, open source, and local deployment.</li>
        <li><strong>No benchmark is a production verdict:</strong> repository size, tools, latency, retries, compliance, and actual cost still decide the outcome.</li>
      </ul>

      <h2 id="scores">Reported Grok 4.6 metrics</h2>
      <div className="not-prose overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full min-w-[42rem] text-left text-sm">
          <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-ink-400">
            <tr><th className="px-4 py-3">Metric</th><th className="px-4 py-3">Source note</th><th className="px-4 py-3">How to read it</th></tr>
          </thead>
          <tbody>{METRICS.map(([metric, value, meaning]) => (
            <tr key={metric} className="border-t border-white/5 align-top">
              <td className="px-4 py-3 font-medium text-ink-100">{metric}</td>
              <td className="px-4 py-3 text-ink-300">{value}</td>
              <td className="px-4 py-3 text-ink-300">{meaning}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <Callout tone="warn" title="Read scores with the snapshot and setup">
        <p>
          Model snapshot, prompt, sampling, tool permissions, timeouts, dependencies, and scoring scripts can
          change the result. Equal scores can still hide large differences in first-token latency, completion time,
          recovery, and output stability.
        </p>
      </Callout>

      <h2 id="comparison">Different strengths</h2>
      <ul>
        <li><strong>Long-running code agents:</strong> test Grok 4.6 with real issues, multi-file changes, terminal tools, and recovery tasks.</li>
        <li><strong>Context and cost:</strong> test DeepSeek V4 Pro&apos;s large-context and deployment claims with the same dataset and acceptance checks.</li>
        <li><strong>Price:</strong> use the current provider or GPT88 console price, input/output multipliers, and model ID; do not copy an old relative-price claim into a budget.</li>
      </ul>

      <h2 id="choose">How to choose</h2>
      <ol>
        <li>Build a fixed task set: code fix, multi-file change, terminal task, long-document retrieval, and failure recovery.</li>
        <li>Keep prompts, context, tools, turn limits, timeouts, and acceptance rules identical.</li>
        <li>Record success rate, end-to-end time, human rework, and actual token or balance usage.</li>
        <li>Run a low-risk canary over several days before making a model the default.</li>
      </ol>
      <p>
        A task router is often more useful than one universal champion: use different defaults for coding agents,
        quick answers, long-document work, visual prototypes, and low-cost batches.
      </p>

      <h2 id="limitations">Limitations and retesting</h2>
      <ul>
        <li>This page does not independently reproduce Artificial Analysis, Terminal-Bench v2.1, or GDPval-AA v2.</li>
        <li>The source note does not provide every exact model version, prompt, tool setup, sample count, or confidence interval.</li>
        <li>Relative price statements without a complete accounting method should not drive procurement decisions.</li>
        <li>If the model is available in GPT88, confirm it through <code>GET /v1/models</code> and use the live model ID, group, and charge shown by the console.</li>
      </ul>
    </DocPage>
  )
}
