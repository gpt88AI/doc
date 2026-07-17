import { Link } from 'react-router-dom'
import { Callout } from '../../../components/ui/Callout'
import { DocPage } from '../../../components/layout/DocPage'
import { localizePath, useLocale } from '../../../lib/locale'
import KimiK3ReviewPageEn from '../../en/KimiK3ReviewPageEn'

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
            {headers.map(header => (
              <th key={header} className="px-4 py-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-t border-white/10 align-top${rowIndex % 2 === 1 ? ' bg-white/[0.02]' : ''}`}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-[13px] leading-6 text-ink-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function KimiK3ReviewPage() {
  const { locale } = useLocale()
  if (locale === 'en') return <KimiK3ReviewPageEn />

  return (
    <DocPage
      path="/docs/guides/kimi-k3-review"
      title="Kimi K3 实战评测与模型对比参考"
      description="整理程序员鱼皮对 Kimi K3 的公开实战评测：基准分数、7 个项目案例、编程能力、稳定性、成本观察和与 Claude Fable 5、GPT-5.6 Sol 的对比。"
      headings={[
        { id: 'source', text: '评测来源与阅读方式', level: 2 },
        { id: 'conclusion', text: '先看结论', level: 2 },
        { id: 'benchmarks', text: '公开基准对比', level: 2 },
        { id: 'projects', text: '7 个实战项目', level: 2 },
        { id: 'findings', text: '作者实测观察', level: 2 },
        { id: 'cost', text: '成本与上下文观察', level: 2 },
        { id: 'gpt88', text: '在 GPT88 中如何使用', level: 2 },
        { id: 'limitations', text: '局限与评测建议', level: 2 },
      ]}
    >
      <Callout tone="info" title="第三方评测参考，不是官方性能承诺">
        <p>
          本页根据程序员鱼皮于 2026-07-17 发布的文章《刚刚 Kimi K3 炸裂发布，号称 Claude 和 GPT 的国产平替，夯爆了！》整理。
          原文作者使用 Kimi Code 和 K3，对公开基准以及 7 个不同复杂度的项目进行了实测。
        </p>
        <p>
          <a href={SOURCE_URL} target="_blank" rel="noreferrer">
            查看微信公众号原文
          </a>{' '}
          · 文章中的分数、耗时、套餐和价格属于作者测试时的记录；模型能力、上游价格、服务套餐和 GPT88 线路会随时间变化。
        </p>
      </Callout>

      <h2 id="source">评测来源与阅读方式</h2>
      <p>
        这篇文章同时覆盖了“榜单 / 基准分数”和“真实项目交付”两个层面。前者适合观察模型在公开任务上的相对位置，后者更接近开发者真正关心的：能否启动项目、能否持续执行、能否自测修复，以及交付结果是否足够完整。
      </p>
      <p>
        文中使用的对比对象主要是 Claude Fable 5 和 GPT-5.6 Sol。这里保留作者原文中的模型名称和测试口径，不把第三方文章中的结论改写成 GPT88、Moonshot 或任何模型厂商的官方保证。
      </p>

      <h2 id="conclusion">先看结论</h2>
      <ul>
        <li><strong>前端生成是 K3 的突出方向</strong>：作者认为 K3 在交互动画、网页 PPT、视觉布局和前端创意方面表现很强，并记录了 Arena.ai 前端代码竞技场的领先表现。</li>
        <li><strong>稳定性是文章最积极的实测结论</strong>：7 个项目都能启动并跑通核心链路，作者特别强调依赖安装、前后端启动和多轮工具执行没有反复卡死。</li>
        <li><strong>长程 Agent 能力已经可用</strong>：K3 能在较长任务中进行联网检索、查询文档、运行浏览器测试、截图验证和自主修复。</li>
        <li><strong>复杂工程的精细度仍有差距</strong>：在更复杂的工程基准、游戏 AI、成熟产品级完成度和复杂任务细节上，文章认为 K3 仍落后于 Fable 5 和 Sol。</li>
      </ul>

      <h2 id="benchmarks">公开基准对比</h2>
      <p>
        下表只记录原文明确给出的数值或定性结论。没有公开具体分数的项目，不补猜数字；“文章解读”也应理解为作者的测试观察，而不是统一实验室复现结果。
      </p>
      <ComparisonTable
        headers={['基准 / 榜单', 'Kimi K3', '文中对比', '文章记录的解读']}
        rows={[
          ['Arena.ai 前端代码竞技场', '作者记录为第一', '超过 Claude Fable 5、GPT-5.6 Sol', '前端创意、视觉实现和交互页面生成是 K3 的强项。'],
          ['Terminal-Bench 2.1', '88.3%', 'GPT-5.6 Sol 88.8%；Fable 5 84.6%', '终端编程和 Agent 工作流能力接近 Sol，并高于 Fable 5。'],
          ['Program Bench', '77.8%', 'GPT-5.6 Sol 77.6%；Fable 5 76.8%', '多步骤编程任务完成度略高于文中两个对比模型。'],
          ['DeepSWE / FrontierSWE', '未给出具体分数', '作者表示仍落后于 Fable 5 和 Sol', '更复杂的工程任务仍是 K3 需要继续提升的方向。'],
        ]}
      />
      <Callout tone="warn" title="不要只按一组榜单决定生产模型">
        <p>
          基准测试会受到版本、提示词、工具权限、上下文、评测实现和抽样方式影响。真正上线前，应把你自己的代码库、工具调用、长文档和错误恢复样本加入评测集，并同时观察质量、延迟、成功率和实际扣费。
        </p>
      </Callout>

      <h2 id="projects">7 个实战项目</h2>
      <p>
        作者使用 Kimi Code 的 K3，从一次性前端任务逐步推进到全栈和长程 Agent 项目。下面是文章案例的结构化摘要：
      </p>
      <ComparisonTable
        headers={['项目', '测试重点', '文章记录的结果']}
        rows={[
          ['交互式动画知识网站', '用动画解释 K3 的注意力残差机制；结合联网检索和截图验证。', '动画结构、连线关系和交互效果完成度较好，作者认为前端表现优于此前使用 Claude 的体验。'],
          ['3D 动画知识讲解', '使用 3D 场景、Context7 文档查询和可交互视角。', '页面简洁，节点、连线和步骤控制能表达 Transformer 信息流。'],
          ['文章拆解为网页 PPT', '从技术文章识别结构、生成全屏演示页面和移动端布局。', '能自动提炼层次、标记重点、渲染代码高亮并提供翻页交互。'],
          ['网页 PPT 生成工具', '全栈实现文案输入、模型生成、主题切换和 HTML 导出。', '核心业务流程跑通，但功能较简化，缺少更完整的工具调用 Agent 能力。'],
          ['足球对战网页游戏', '与 Fable 5、Sol、Grok 4.5 使用相同提示词横评。', '物理和基本操作稳定可玩，但人机策略简单；整体低于 Sol，优于文中 Fable 5 和 Grok 4.5 的可玩性表现。'],
          ['以撒风格肉鸽游戏', '随机地牢、射击、道具、敌人、Boss 和三层通关流程。', '作者记录为核心玩法链路跑通，但美术、道具、怪物和关卡仍需要继续迭代。'],
          ['全栈 AI 编程工具', '参考 VS Code 和 Cursor，完成 Editor Window + Agents Window。', '能理解较大代码库并完成核心 IDE / Agent 双窗口，但距离成熟 Cursor 类产品还有明显差距。'],
        ]}
      />

      <h2 id="findings">作者实测观察</h2>
      <h3>1. 稳定性和持续执行</h3>
      <p>
        文章认为 K3 的最大惊喜是“能用”这一关通过得比较稳定：7 个项目都能运行，复杂项目也没有在长任务中卡死或明显跑偏。对于需要让模型自主执行命令、查询资料、启动服务、截图验收和修复问题的 Agent 工作流，这比一次漂亮的单轮回答更有价值。
      </p>
      <h3>2. 前端和视觉实现</h3>
      <p>
        交互式动画、3D 讲解和网页 PPT 是文章中评价最高的几个案例。作者重点肯定了布局、配色、动画过渡、信息拆解和移动端适配，认为 K3 适合快速产出网站原型、演示页面和可视化解释工具。
      </p>
      <h3>3. 复杂任务仍需要验收</h3>
      <p>
        足球游戏的人机策略、完整产品的功能深度和成熟度是文章明确指出的短板。也就是说，K3 能较快做出“可运行的初版”，但不能因此省略产品验收、边界测试、性能检查和多轮迭代。
      </p>

      <h2 id="cost">成本与上下文观察</h2>
      <p>
        原文引用了 Kimi 官方博客的上游价格进行横向观察，并记录了缓存命中、长上下文和 Kimi Code 套餐体验。文章给出的价格对比可以帮助理解“为什么 K3 适合高频编程尝试”，但不能直接当成 GPT88 的实时价格：GPT88 的实际扣费仍以当前分组倍率、模型价格和控制台配置为准。
      </p>
      <ComparisonTable
        headers={['文章引用的上游公开价格', '缓存命中输入', '缓存未命中输入', '输出']}
        rows={[
          ['Kimi K3', '$0.30 / 百万 token', '$3.00 / 百万 token', '$15.00 / 百万 token'],
          ['Claude Fable 5', '$2.50 / 百万 token', '$10.00 / 百万 token', '$50.00 / 百万 token'],
        ]}
      />
      <ul>
        <li>文章提到 Mooncake 分离式推理架构在编程场景下具有较高缓存命中率，但实际缓存命中率取决于请求前缀、工作流和服务端策略，不应直接套用到每个账号。</li>
        <li>文章还记录了 Kimi Code 会员套餐和作者个人用量体验；套餐价格、额度和权益属于 Kimi 官方产品信息，可能变化，不作为 GPT88 计费说明。</li>
        <li>1M 上下文是容量上限，不是每次请求都要填满。按任务拆分、复用稳定前缀、减少重复日志，通常更容易控制延迟和费用。</li>
      </ul>

      <h2 id="gpt88">在 GPT88 中如何使用</h2>
      <Callout tone="tip" title="先验证权限，再把 K3 放入真实工作流">
        <ol>
          <li>使用 GPT88 首页展示的统一 API Base URL：<code>https://api.gpt88.cc</code>。</li>
          <li>请求体中的模型 ID 使用 <code>kimi-k3</code>。</li>
          <li>先调用 <Link to="/docs/api/list-models/">GET /v1/models</Link>，确认当前 API Key 已开放 K3。</li>
          <li>使用 <Link to="/models/kimi-k3/">Kimi K3 模型详情页</Link>中的 OpenAI 兼容示例验证最小请求。</li>
          <li>再用自己的代码库、长文档、工具调用和前端项目做小流量评测，不要直接把第三方文章结论当成生产 SLA。</li>
        </ol>
      </Callout>
      <p>
        如果你要对比 K3、Claude、GPT 或其他模型，建议固定同一份提示词、同一批输入、同一套工具权限和同一验收标准，并记录成功率、耗时、人工返工量、上下文使用量和实际余额扣减。
      </p>

      <h2 id="limitations">局限与评测建议</h2>
      <ul>
        <li>这是一篇个人实战测评，不是受控实验室报告；样本数量、提示词、环境和人工判断标准都可能影响结果。</li>
        <li>文章的 Arena、Terminal-Bench 和 Program Bench 数据只代表文章引用或测试时点，模型版本变化后不应继续视为当前排名。</li>
        <li>“能跑通”不等于“适合上线”。全栈项目还需要补充鉴权、数据校验、并发、日志、测试、可观测性和安全检查。</li>
        <li>前端榜单表现突出，不代表 K3 在所有后端、数学、法律、研究或企业知识库任务上都同样领先。</li>
        <li>推荐把本文作为选型线索，再结合 GPT88 当前控制台可用性和你自己的业务样本做最终决定。</li>
      </ul>
      <p>
        继续了解 Kimi K3 的官方能力和 API 接入方式，可参考{' '}
        <a href="https://platform.kimi.ai/docs/guide/kimi-k3-quickstart" target="_blank" rel="noreferrer">
          Kimi K3 官方 API 快速开始
        </a>；返回站内推荐可查看 <Link to={localizePath('/docs/overview/', locale)}>产品概览</Link>。
      </p>
    </DocPage>
  )
}
