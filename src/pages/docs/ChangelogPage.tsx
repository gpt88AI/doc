import type { ReactNode } from 'react'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const UPDATE_SOURCE = `更新来源：
- 项目目录：/Users/nft/sub2api
- 当前分支：feat/gpt88-1panel
- 记录方式：按 sub2api Git 提交与实际功能主题整理
- 更新原则：只记录用户可感知功能、重要修复、部署能力、计费和 API 行为变化

维护建议：
1. 每次 sub2api 发布或完成一组功能后，在本页新增日期分组
2. 先写用户能看懂的变化，再补技术细节
3. 不把纯内部临时提交、无用户影响的中间提交写进正式 changelog
4. 涉及计费、模型、图片生成、支付、部署的变化优先记录`

type ChangeItem = {
  type: '新增' | '优化' | '修复' | '调整'
  title: string
  detail: ReactNode
  commits?: string[]
}

type ChangeGroup = {
  date: string
  summary: string
  items: ChangeItem[]
}

const CHANGELOG: ChangeGroup[] = [
  {
    date: '2026-06-28',
    summary: '首页、价格文案、模型广场和图片工作台安全画幅继续优化。',
    items: [
      {
        type: '优化',
        title: '首页价格促销文案更新',
        detail: '调整首页价格与促销表达，让用户更容易理解当前套餐、优惠和入口信息。',
        commits: ['1635a31fb'],
      },
      {
        type: '优化',
        title: '首页与模型广场 UI 打磨',
        detail: '优化首页和模型广场的展示细节，提高模型浏览、筛选和落地页转化体验。',
        commits: ['d59e9f933'],
      },
      {
        type: '修复',
        title: '模型广场公共分组兜底',
        detail: '当模型广场缺少专属分组数据时，自动回退到公共分组，减少空白或加载失败情况。',
        commits: ['4fe459d49'],
      },
      {
        type: '修复',
        title: '图片工作台输出安全框',
        detail: '为图片工作台结果增加安全画幅处理，降低人物、商品、文字和关键边缘被裁切的概率。',
        commits: ['da862a254'],
      },
    ],
  },
  {
    date: '2026-06-27',
    summary: '图片工作台围绕安全构图、输出适配和首页 CTA 做了一轮集中修复。',
    items: [
      {
        type: '调整',
        title: '移除首页社区入口 CTA',
        detail: '减少首页干扰项，让用户更聚焦核心产品入口和主要转化路径。',
        commits: ['de21c66a4'],
      },
      {
        type: '修复',
        title: '图片工作台安全框提示词强化',
        detail: '在图片生成提示词中强化安全留白和主体完整性约束，提升批量出图的一致性。',
        commits: ['981c0f08f'],
      },
      {
        type: '修复',
        title: '图片工作台适配裁剪优化',
        detail: '改进图片工作台的输出适配策略，减少不同尺寸、不同平台预览时的裁剪问题。',
        commits: ['bbe8f81a0'],
      },
    ],
  },
  {
    date: '2026-06-22',
    summary: '新增 OpenAI 图片异步任务配置，并同步 infinite canvas 指针。',
    items: [
      {
        type: '新增',
        title: '可配置 OpenAI 图片异步任务',
        detail: '新增 OpenAI 图片异步任务配置能力，为长耗时图片生成、任务状态追踪和后台处理提供基础。',
        commits: ['619f3376c'],
      },
      {
        type: '调整',
        title: 'infinite canvas 指针更新',
        detail: '同步 infinite canvas 子项目指针，保持画布相关能力与主项目集成一致。',
        commits: ['b8c9de7b0'],
      },
      {
        type: '调整',
        title: '提交剩余工作区变更',
        detail: '整理并提交阶段性工作区变更，便于后续发布和回滚追踪。',
        commits: ['ba27655c2'],
      },
    ],
  },
  {
    date: '2026-06-20',
    summary: '图片工作台返回结果 URL 和 Responses 生成链路完成多次修复。',
    items: [
      {
        type: '修复',
        title: '图片工作台结果 URL 修复',
        detail: '修复图片生成结果 URL 返回问题，提升前端展示、下载和后续复用的稳定性。',
        commits: ['11b545e7c'],
      },
      {
        type: '修复',
        title: '返回图片工作台 S3 结果 URL',
        detail: '让图片工作台结果返回 S3 可访问地址，方便用户查看、保存和对接后续流程。',
        commits: ['7f6c59ba9'],
      },
      {
        type: '调整',
        title: '移除 Commerce Studio Responses 选项',
        detail: '收敛 Commerce Studio 的生成路径，减少不必要选项带来的误用和不一致。',
        commits: ['b1cbfccb0'],
      },
    ],
  },
  {
    date: '2026-06-19',
    summary: '图片工作台 Responses 生成链路修复。',
    items: [
      {
        type: '修复',
        title: '图片工作台 Responses 生成修复',
        detail: '修复图片工作台在 Responses 生成链路中的异常，提升特定图片模型调用稳定性。',
        commits: ['4a8aa3e62'],
      },
    ],
  },
  {
    date: '2026-06-18',
    summary: '批量图片任务、默认 API 端点和首页案例路由修复。',
    items: [
      {
        type: '修复',
        title: '批量图片任务单个失败不再中断全批次',
        detail: '批量生图时单个任务失败后继续处理剩余任务，降低大批量生产的失败成本。',
        commits: ['ca03e1ce7'],
      },
      {
        type: '新增',
        title: '隐藏默认 API 端点设置',
        detail: '新增隐藏默认 API 端点配置能力，便于部署方在不同环境中统一默认请求入口。',
        commits: ['4ae25720e'],
      },
      {
        type: '修复',
        title: '首页案例路由到 xsct 工作台',
        detail: '修复首页案例跳转目标，让案例入口正确进入对应工作台页面。',
        commits: ['6a8c4135b'],
      },
    ],
  },
  {
    date: '2026-06-17',
    summary: '图片尺寸、默认渠道 Key、案例库和计费边界完成集中更新。',
    items: [
      {
        type: '新增',
        title: '绘图尺寸对齐控制',
        detail: '新增绘图尺寸对齐能力，让图片生成结果更接近目标比例和目标输出尺寸。',
        commits: ['8c6ac0193'],
      },
      {
        type: '修复',
        title: '优先使用原生目标图片尺寸',
        detail: '图片生成时优先使用模型或平台支持的原生目标尺寸，减少后期缩放和裁剪带来的质量损失。',
        commits: ['3aeb304a4'],
      },
      {
        type: '新增',
        title: '图片工作台默认渠道 Key 配置',
        detail: '支持配置图片工作台默认渠道 Key，降低用户首次使用和管理员配置成本。',
        commits: ['e0c1f0314'],
      },
      {
        type: '新增',
        title: 'GPT 图片案例库扩充',
        detail: '新增 awesome gpt image cases 与 aiistudio prompt cases，为用户提供更多可复用图片生成案例。',
        commits: ['0e417d345', 'f588daeb4'],
      },
      {
        type: '修复',
        title: '图片聊天 Token 计费下限',
        detail: '修复图片聊天计费边界，避免零用量或异常用量造成计费口径不一致。',
        commits: ['a70d0afd5'],
      },
    ],
  },
  {
    date: '2026-06-16',
    summary: '图片模型接入聊天端点和计费口径完成多项修复。',
    items: [
      {
        type: '修复',
        title: '下拉选项展示分组倍率',
        detail: '在模型或分组下拉选项中展示分组倍率，帮助用户更清楚地理解调用成本。',
        commits: ['bbb8f6fcd'],
      },
      {
        type: '修复',
        title: '零用量图片聊天按图片计费',
        detail: '图片聊天即使返回零 token 用量，也按图片任务计费口径处理，避免漏计。',
        commits: ['71bd548db'],
      },
      {
        type: '修复',
        title: '允许图片模型进入聊天计费链路',
        detail: '修复图片模型在聊天兼容入口中的计费识别，让多模态调用保持统一账单口径。',
        commits: ['b439e00fc'],
      },
      {
        type: '修复',
        title: '阻止图片模型误走聊天端点',
        detail: '对不应进入聊天端点的图片模型进行拦截，减少错误调用和异常计费。',
        commits: ['46e44605d'],
      },
      {
        type: '调整',
        title: '记录图片用量结构',
        detail: '增加图片用量结构日志，便于排查计费、统计和模型返回差异。',
        commits: ['b86cf4896'],
      },
    ],
  },
]

function typeClass(type: ChangeItem['type']): string {
  switch (type) {
    case '新增':
      return 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
    case '优化':
      return 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200'
    case '修复':
      return 'border-amber-400/30 bg-amber-400/10 text-amber-200'
    case '调整':
    default:
      return 'border-violet-400/30 bg-violet-400/10 text-violet-200'
  }
}

function ChangelogItem({ item }: { item: ChangeItem }) {
  return (
    <li className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${typeClass(item.type)}`}>
          {item.type}
        </span>
        <h3 className="m-0 text-base font-semibold text-ink-50">{item.title}</h3>
      </div>
      <p className="mt-2 text-sm leading-6 text-ink-300">{item.detail}</p>
      {item.commits?.length ? (
        <p className="mt-2 text-xs text-ink-500">
          commits:{' '}
          {item.commits.map((commit, index) => (
            <span key={commit}>
              <code>{commit}</code>
              {index < item.commits!.length - 1 ? ' / ' : ''}
            </span>
          ))}
        </p>
      ) : null}
    </li>
  )
}

export default function ChangelogPage() {
  return (
    <DocPage
      path="/docs/changelog"
      title="Sub2API 更新日志"
      description="持续记录 /Users/nft/sub2api 项目的产品更新、重要修复、图片工作台、模型广场、计费、部署和 API 行为变化。"
      headings={[
        { id: 'source', text: '更新来源', level: 2 },
        { id: 'latest', text: '最新更新', level: 2 },
        { id: 'history', text: '历史记录', level: 2 },
        { id: 'maintain', text: '维护规则', level: 2 },
      ]}
    >
      <Callout tone="info" title="页面用途">
        <p>
          这个页面用于持续记录 <code>/Users/nft/sub2api</code> 项目的对外可感知更新。
          以后每次完成一组功能或发布前，都可以把 Git 提交整理成用户能看懂的 changelog 条目。
        </p>
      </Callout>

      <h2 id="source">更新来源</h2>
      <CodeBlock lang="text" filename="sub2api-changelog-source" code={UPDATE_SOURCE} />

      <h2 id="latest">最新更新</h2>
      <div className="not-prose my-6 rounded-xl border border-white/8 bg-white/[0.025] p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
          {CHANGELOG[0].date}
        </div>
        <p className="mt-2 text-sm leading-6 text-ink-300">{CHANGELOG[0].summary}</p>
        <ul className="mt-4 grid gap-3">
          {CHANGELOG[0].items.map(item => (
            <ChangelogItem key={item.title} item={item} />
          ))}
        </ul>
      </div>

      <h2 id="history">历史记录</h2>
      <div className="not-prose grid gap-5">
        {CHANGELOG.slice(1).map(group => (
          <section key={group.date} className="rounded-xl border border-white/8 bg-white/[0.018] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
              {group.date}
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-300">{group.summary}</p>
            <ul className="mt-4 grid gap-3">
              {group.items.map(item => (
                <ChangelogItem key={item.title} item={item} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <h2 id="maintain">维护规则</h2>
      <ul>
        <li>新增功能、重要修复、计费变化、模型变化、支付变化、部署变化必须记录。</li>
        <li>纯内部重构、临时提交、无用户影响的格式化变更可以不写。</li>
        <li>每条更新都要用用户能理解的语言说明影响，不只贴 commit message。</li>
        <li>如果更新对应文档教程或 API 页面，后续可以在 changelog 条目里补链接。</li>
      </ul>
    </DocPage>
  )
}
