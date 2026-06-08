import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const MODULES = `prompt-director
- 提示词方法论：构图、光线、运镜、一致性、角色控制
- 适合：小说、剧本、情节转图像/视频 Prompt

ecommerce
- 电商素材工作流：详情页、主图、UGC、种草视频
- 适合：服装、3C、数码、美妆、家居、宠物等

brand-ad-cg
- 品牌广告 / TVC / 产品 CG / 大牌质感商业视觉
- 适合：品牌宣传片、产品大片、风格化广告

ai-video-director
- 叙事型视频制片：短剧、漫剧、故事板、分镜、一致性
- 适合：剧情短片、古风短剧、场景连续性控制`

const INSTALL_MATRIX = `日常写提示词
  推荐：prompt-director

电商素材 / 带货 / TK / Amazon
  推荐：prompt-director + ecommerce

品牌广告 / TVC / 产品 CG
  推荐：prompt-director + brand-ad-cg

短剧 / 漫剧 / AI 视频制片
  推荐：prompt-director + ai-video-director

想全都要
  推荐：--all`

const COVERAGE_TABLE = [
  ['prompt-director', '提示词方法论：构图、光线、运镜、一致性、角色控制', '~70 篇'],
  ['ecommerce', '电商素材：服装 / 3C / 美妆详情页、主图、UGC 种草', '~57 篇'],
  ['brand-ad-cg', '品牌广告 / TVC / 产品 CG 大片', '~74 篇'],
  ['ai-video-director', '叙事制片：短剧 / 漫剧 + 分镜 / 故事板 / 一致性', '~17 篇'],
] as const

function OverviewTable() {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            <th className="px-4 py-2.5 font-medium">Skill</th>
            <th className="px-4 py-2.5 font-medium">说明</th>
            <th className="px-4 py-2.5 font-medium">覆盖教程量级</th>
          </tr>
        </thead>
        <tbody>
          {COVERAGE_TABLE.map((row, i) => (
            <tr
              key={row[0]}
              className={
                'border-t border-white/5 align-top' +
                (i % 2 === 1 ? ' bg-white/[0.012]' : '')
              }
            >
              <td className="px-4 py-3 text-[13px] leading-relaxed text-ink-100">{row[0]}</td>
              <td className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">{row[1]}</td>
              <td className="px-4 py-3 text-[13px] leading-relaxed text-ink-200">{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function VideoGenerationSkillsOverviewPage() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-overview"
      title="video-generation-skills 总览"
      description="基于 adoin/video-generation-skills 仓库整理的系列文档总览，讲清 4 个 AI 视频生成 skill 的定位、边界、组合方式和适用场景。"
      headings={[
        { id: 'what', text: '这是什么', level: 2 },
        { id: 'modules', text: '4 个 skill 分别做什么', level: 2 },
        { id: 'coverage', text: '技能一览', level: 2 },
        { id: 'routing', text: '怎么选组合', level: 2 },
        { id: 'repo', text: '仓库结构怎么看', level: 2 },
        { id: 'next', text: '下一步读哪篇', level: 2 },
      ]}
    >
      <Callout tone="info" title="这不是单个 skill，而是一个多 skill 技能包">
        <p>
          <a href="https://github.com/adoin/video-generation-skills" target="_blank" rel="noreferrer">
            adoin/video-generation-skills
          </a>{' '}
          本身不是一个单独技能，而是一个可通过 <code>npx skills</code> 安装的技能包仓库。
          核心价值不是“多一个提示词模板”，而是把 AI 视频 / 生图工作流拆成了 4 个明确分工的模块。
        </p>
      </Callout>

      <h2 id="what">这是什么</h2>
      <p>
        这个仓库来自 AI 视频生成技能包思路，兼容 <code>skills.sh</code> / <code>npx skills</code> 生态。
        仓库 README 明确写了它提炼自大量 AI 视频与生图教程，并按任务类型拆成 4 个独立 skill：
        提示词方法论、电商素材、品牌广告 CG、叙事型视频制片。
      </p>

      <h2 id="modules">4 个 skill 分别做什么</h2>
      <CodeBlock lang="text" filename="modules" code={MODULES} />
      <ul>
        <li><Link to="/docs/guides/video-generation-skills-prompt-director/">prompt-director 详解</Link></li>
        <li><Link to="/docs/guides/video-generation-skills-ecommerce/">ecommerce 详解</Link></li>
        <li><Link to="/docs/guides/video-generation-skills-brand-ad-cg/">brand-ad-cg 详解</Link></li>
        <li><Link to="/docs/guides/video-generation-skills-ai-video-director/">ai-video-director 详解</Link></li>
      </ul>

      <h2 id="coverage">技能一览</h2>
      <OverviewTable />

      <h2 id="routing">怎么选组合</h2>
      <p>
        仓库作者的路由关系很明确：<code>prompt-director</code> 是基础层，其他 3 个 skill
        是垂直业务层。换句话说，电商、品牌、短剧这三类需求，最后都会回到提示词、分镜和一致性控制。
      </p>
      <CodeBlock lang="text" filename="install-matrix" code={INSTALL_MATRIX} />

      <h2 id="repo">仓库结构怎么看</h2>
      <ul>
        <li><code>catalog.json</code>：技能包清单和元数据。</li>
        <li><code>skills/</code>：4 个可被 CLI 发现和安装的独立 skill。</li>
        <li><code>docs/INSTALL.md</code>：安装与本地开发说明。</li>
        <li><code>docs/CONTRIBUTING.md</code>：如何维护 <code>SKILL.md</code> 与 references。</li>
        <li><code>sources/</code>：教程映射与维护用途，不直接打包进 skill。</li>
      </ul>
      <p>
        这套结构很适合我们做二次文档化，因为它把“面向用户安装”和“面向贡献者维护”分开了。
      </p>

      <h2 id="next">下一步读哪篇</h2>
      <ul>
        <li>如果你要安装到 Cursor、Claude Code、Codex：看 <Link to="/docs/guides/video-generation-skills-install/">安装与使用教程</Link>。</li>
        <li>如果你主要写提示词：看 <Link to="/docs/guides/video-generation-skills-prompt-director/">prompt-director</Link>。</li>
        <li>如果你主要做带货素材：看 <Link to="/docs/guides/video-generation-skills-ecommerce/">ecommerce</Link>。</li>
        <li>如果你主要做品牌广告大片：看 <Link to="/docs/guides/video-generation-skills-brand-ad-cg/">brand-ad-cg</Link>。</li>
        <li>如果你主要做剧情视频和分镜：看 <Link to="/docs/guides/video-generation-skills-ai-video-director/">ai-video-director</Link>。</li>
      </ul>
    </DocPage>
  )
}
