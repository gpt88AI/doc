import { cn } from '../../lib/cn'

/**
 * 请求 / 响应字段说明表
 *
 * 设计意图：
 * - 文档型表格，固定 4 列：name / type / required / description
 * - 行间留呼吸空间但又紧凑，便于快速扫描
 * - 在移动端转为卡片式：每个字段一张小卡，避免横向滚动
 *
 * 注意：description 支持 React 节点（可嵌链接和 inline code），
 *      调用方在传入时使用 JSX 即可，不需要任何 markdown 解析依赖。
 */

export type FieldRow = {
  name: string
  type: string
  required?: boolean
  /** 可选默认值，写入小字 */
  default?: string
  /** 描述允许任意 JSX */
  description: React.ReactNode
}

export function FieldTable({
  rows,
  className,
}: {
  rows: FieldRow[]
  className?: string
}) {
  return (
    <div
      className={cn(
        'not-prose my-6 overflow-hidden rounded-lg border border-white/5',
        className,
      )}
    >
      {/* 桌面端：表格布局 */}
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            <th className="px-4 py-2.5 font-medium">字段</th>
            <th className="px-4 py-2.5 font-medium">类型</th>
            <th className="px-4 py-2.5 font-medium">必填</th>
            <th className="px-4 py-2.5 font-medium">说明</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.name}
              className={cn(
                'border-t border-white/5 align-top',
                i % 2 === 1 ? 'bg-white/[0.012]' : '',
              )}
            >
              <td className="px-4 py-3">
                <code className="rounded bg-violet-500/10 px-1.5 py-0.5 font-mono text-[12.5px] text-violet-200">
                  {r.name}
                </code>
              </td>
              <td className="px-4 py-3 font-mono text-[12.5px] text-ink-300">
                {r.type}
              </td>
              <td className="px-4 py-3">
                {r.required ? (
                  <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-[11px] font-medium text-red-300 ring-1 ring-red-400/30">
                    必填
                  </span>
                ) : (
                  <span className="text-[11px] text-ink-500">可选</span>
                )}
              </td>
              <td className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">
                {r.description}
                {r.default ? (
                  <div className="mt-1 text-[11.5px] text-ink-400">
                    默认值：
                    <code className="rounded bg-white/5 px-1 py-0.5 font-mono">
                      {r.default}
                    </code>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 移动端：卡片布局 */}
      <ul className="divide-y divide-white/5 md:hidden">
        {rows.map(r => (
          <li key={r.name} className="space-y-2 px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <code className="rounded bg-violet-500/10 px-1.5 py-0.5 font-mono text-[12.5px] text-violet-200">
                {r.name}
              </code>
              <span className="font-mono text-[11.5px] text-ink-400">
                {r.type}
              </span>
              {r.required ? (
                <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-[10px] font-medium text-red-300 ring-1 ring-red-400/30">
                  必填
                </span>
              ) : null}
            </div>
            <div className="text-[13px] leading-relaxed text-ink-200">
              {r.description}
            </div>
            {r.default ? (
              <div className="text-[11.5px] text-ink-400">
                默认值：
                <code className="rounded bg-white/5 px-1 py-0.5 font-mono">
                  {r.default}
                </code>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
