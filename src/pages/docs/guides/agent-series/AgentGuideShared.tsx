import { Link } from 'react-router-dom'

export function GuideTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5"><table className="w-full min-w-[44rem] text-left text-sm"><thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400"><tr>{headers.map(header => <th key={header} className="px-4 py-2.5 font-medium">{header}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex} className={`border-t border-white/5 align-top${rowIndex % 2 ? ' bg-white/[0.012]' : ''}`}>{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">{cell}</td>)}</tr>)}</tbody></table></div>
}

export function Checklist({ items }: { items: React.ReactNode[] }) {
  return <ul className="not-prose my-5 space-y-2 rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm text-ink-200">{items.map((item, index) => <li key={index} className="flex gap-2 leading-6"><span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border border-emerald-400/40 text-[10px] text-emerald-300">✓</span><span>{item}</span></li>)}</ul>
}

export function SeriesNav({ current }: { current: string }) {
  const items = [['岗位地图与能力模型', '/docs/guides/agent-job-map/'], ['Agent 基础与架构', '/docs/guides/agent-foundations/'], ['RAG 知识库工程', '/docs/guides/agent-rag/'], ['工具调用与 MCP', '/docs/guides/agent-tools-mcp/'], ['评测与生产化', '/docs/guides/agent-production/'], ['面试题与项目实战', '/docs/guides/agent-interview-project/']]
  return <nav className="not-prose my-8 grid gap-2 sm:grid-cols-2 xl:grid-cols-3" aria-label="AI Agent 专题导航">{items.map(([title, href]) => href === current ? <div key={href} className="rounded-lg border border-violet-400/30 bg-violet-500/[0.08] px-3 py-2.5 text-sm text-violet-200">{title}</div> : <Link key={href} to={href} className="rounded-lg border border-white/5 px-3 py-2.5 text-sm text-ink-300 transition-colors hover:border-violet-400/30 hover:bg-violet-500/[0.05] hover:text-violet-200">{title}</Link>)}</nav>
}
