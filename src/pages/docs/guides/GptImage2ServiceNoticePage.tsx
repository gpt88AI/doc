import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { useLocale } from '../../../lib/locale'
import GptImage2ServiceNoticePageEn from '../../en/GptImage2ServiceNoticePageEn'

const RECOMMENDED_LINES = `图片加速专线
  https://img.gpt88.cc

图片工作台
  https://agent.gpt88.cc

OpenAI 兼容图片 API
  https://img.gpt88.cc/v1/images/generations
  https://img.gpt88.cc/v1/images/edits`

const DIRECT_CURL = `curl https://img.gpt88.cc/v1/images/generations \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-image-2",
    "prompt": "高级电商护肤品海报，玻璃瓶身，银色泵头，柔和自然光，极简高级感，无文字，无水印",
    "size": "1024x1024",
    "quality": "high",
    "n": 1
  }'`

const COMPARISON = `原生 4K
  模型直接按 4K 质量生成，第一次出图就是高分辨率成品
  重点提升：纹理、文字边缘、人物五官、材质真实性、后期裁切空间

超分 4K
  先生成较低分辨率，再通过 AI 放大到 4K
  重点提升：尺寸和出图效率，不等于原生高质量细节
  风险：小字发糊、局部假细节、复杂纹理被 AI 补猜`

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full min-w-[42rem] text-left text-sm">
        <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            {headers.map(header => (
              <th key={header} className="px-4 py-2.5 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                'border-t border-white/5 align-top' +
                (rowIndex % 2 === 1 ? ' bg-white/[0.012]' : '')
              }
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-[13px] leading-relaxed text-ink-200"
                >
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

export default function GptImage2ServiceNoticePage() {
  const { locale } = useLocale()

  if (locale === 'en') return <GptImage2ServiceNoticePageEn />

  return (
    <DocPage
      path="/docs/guides/gpt-image-2-service-notice"
      title="GPT-Image-2 生图服务通知与选型指南"
      description="详细说明 agent.gpt88.cc 的 GPT-Image-2 生图工作台、https://img.gpt88.cc 图片 API、原生 4K 与超分 4K 区别、价格策略和适用场景。"
      headings={[
        { id: 'overview', text: '推荐入口', level: 2 },
        { id: 'line', text: '为什么单独用图片专线', level: 2 },
        { id: 'account', text: '账号体系说明', level: 2 },
        { id: 'pricing', text: '价格与分辨率策略', level: 2 },
        { id: 'native-vs-upscale', text: '原生 4K 与超分 4K', level: 2 },
        { id: 'scenes', text: '不同客户怎么选', level: 2 },
        { id: 'api', text: 'API 对接建议', level: 2 },
        { id: 'workflow', text: '推荐工作流', level: 2 },
        { id: 'faq', text: '常见问题', level: 2 },
      ]}
    >
      <Callout tone="tip" title="结论先看">
        <p>
          如果你主要做图片生成，优先使用 <code>https://agent.gpt88.cc</code>。
          这篇文档只讲图片工作台与图片专线，不包含文本大模型站点。
        </p>
      </Callout>

      <h2 id="overview">推荐入口</h2>
      <p>
        这套文档只覆盖图片体系。<code>agent.gpt88.cc</code> 是图片工作台，
        <code>https://img.gpt88.cc</code> 是图片与多媒体 API 入口；标准文本 API 使用
        <code>https://api.gpt88.cc</code>，本文只聚焦图片能力。
      </p>
      <CodeBlock lang="text" filename="recommended-lines" code={RECOMMENDED_LINES} />
      <ul>
        <li>
          <code>agent.gpt88.cc</code>：图片工作台，适合手动生成海报、电商图、场景图、模特图和批量素材。
        </li>
        <li>
          <code>https://img.gpt88.cc</code>：统一 API Base URL，适合程序调用 <code>gpt-image-2</code> 图片接口。
        </li>
      </ul>

      <h2 id="account">账号体系说明</h2>
      <Callout tone="warn" title="不要混用账号">
        <p>
          <code>agent.gpt88.cc</code> 和文本大模型站是两个独立网站，账号体系也独立。
          不要把两边当成同一个控制台，也不要用文本站的使用习惯来理解图片站。
          如果你是在图片站里申请、登录或开通图片能力，就只按图片站的账号和权限流程操作。
        </p>
      </Callout>
      <ul>
        <li>图片站的登录、权限、额度和生成历史，只在图片站内查看。</li>
        <li>图片站的手动打样、批量生图和 API 对接，都围绕图片工作流展开。</li>
        <li>如果团队里同时有文本站和图片站，建议分别记录入口、账号和用途，避免误操作。</li>
      </ul>

      <h2 id="line">为什么单独用图片专线</h2>
      <p>
        图片生成和文本对话不是同一类请求。图片任务更依赖上行素材、图片体积、响应时间和输出稳定性，
        所以单独提供图片专线更合理。
      </p>
      <DocTable
        headers={['能力', '图片专线的意义', '适合谁']}
        rows={[
          [
            '更低延迟',
            '图片生成链路单独优化，减少通用网关混跑造成的等待时间。',
            '需要频繁出图的运营、电商和自动化脚本。',
          ],
          [
            '更稳的素材上传',
            '图生图、局部重绘、批量生成时，请求体更大，专线更适合处理这类任务。',
            '要上传商品图、模特图、设计稿的用户。',
          ],
          [
            '更适合批量任务',
            '批量生图和高频请求更容易观察成功率、时延和实际单图成本。',
            '工作室、素材团队、广告公司。',
          ],
          [
            '和工作台一致',
            '手动在图片工作台打样后，可以直接把同类 prompt 迁移到 API 脚本。',
            '先人工确认风格、再程序化批量执行的团队。',
          ],
        ]}
      />
      <Callout tone="info" title="定位区别">
        <p>
          <code>agent.gpt88.cc</code> 负责“图片工作台”，<code>https://img.gpt88.cc</code> 负责统一 API 调用。
          文本大模型网站和图片站是两套独立产品，不要混在一篇教程里理解。
        </p>
      </Callout>

      <h2 id="pricing">价格与分辨率策略</h2>
      <p>
        当前这条图片服务说明的核心卖点是：<strong>1K / 2K / 4K 同价</strong>，并且
        <strong>单张低至 4 分钱</strong>。这意味着你在多数常见使用场景里，不需要再为分辨率切换做复杂预算换算。
      </p>
      <ul>
        <li>适合先按需求选质量，不必先被分辨率价格阶梯绑住。</li>
        <li>适合电商、漫剧、短剧、广告设计等高频出图业务。</li>
        <li>适合把“测试草图”和“正式成图”放到同一套接口里管理。</li>
      </ul>
      <Callout tone="warn" title="价格说明">
        <p>
          文档中的 “每张 4 分钱” 代表当前对外说明口径。实际价格、账号权限和活动策略仍以
          <code>agent.gpt88.cc</code> 图片站展示为准。
        </p>
      </Callout>

      <h2 id="native-vs-upscale">原生 4K 与超分 4K</h2>
      <p>
        很多用户在选图时只看“是不是 4K”，但真正影响最终可用性的，不只是尺寸，还有细节来源。
        原生 4K 和超分 4K 解决的是两件不同的事。
      </p>
      <CodeBlock lang="text" filename="native-vs-upscale" code={COMPARISON} />
      <DocTable
        headers={['维度', '原生 4K', '超分 4K']}
        rows={[
          ['本质', '模型直接生成高质量 4K 成品。', '先生成低分辨率，再做 AI 放大。'],
          ['细节来源', '细节来自模型原始生成。', '细节部分来自后处理推断。'],
          ['小文字表现', '更清晰，边缘更稳。', '容易糊字、变形或出现假笔画。'],
          ['材质纹理', '更适合电商产品和广告物料。', '适合看整体，不适合极致放大检查。'],
          ['速度与成本', '通常更偏质量优先。', '通常更偏效率优先。'],
          ['推荐使用', '主图、海报、印刷、封面。', '批量素材、日更配图、草图扩量。'],
        ]}
      />
      <p>
        可以把这件事理解成一句话：<strong>超分 4K 解决的是尺寸问题，原生 4K 解决的是质量问题。</strong>
      </p>

      <h2 id="scenes">不同客户怎么选</h2>
      <DocTable
        headers={['客户类型', '更推荐', '原因']}
        rows={[
          [
            '电商客户',
            '原生 4K',
            '商品细节、品牌文字、包装边缘、材质纹理更重要，放大后也更稳。',
          ],
          [
            '漫剧 / 短剧批量素材',
            '超分 4K',
            '出图速度和成本控制更重要，大批量生产时性价比更高。',
          ],
          [
            '封面图 / 付费章节',
            '原生 4K',
            '点击率更依赖第一眼质感，封面图值得用更高质量方案。',
          ],
          [
            '广告公司 / 设计团队',
            '按项目分层',
            '提案图、探索稿可用超分，最终交付图、印刷稿、主 KV 更适合原生 4K。',
          ],
          [
            '运营日更内容',
            '超分 4K',
            '社媒配图、小说推文、短内容更新需要高频产出，优先看效率。',
          ],
        ]}
      />
      <p>
        对电商用户，可以直接用一个更容易理解的类比：原生 4K 像单反直拍，超分 4K 更像手机照片后期放大。
        普通浏览差异不一定大，但一旦放大检查商品边缘、品牌字样和材质细节，区别会非常明显。
      </p>

      <h2 id="api">API 对接建议</h2>
      <p>
        如果你的目标是把图片生成接入程序、自动化脚本或工作流，优先把 Base URL 指向
        <code>https://img.gpt88.cc</code>，并使用 <code>gpt-image-2</code> 官方图片接口。
      </p>
      <CodeBlock lang="bash" filename="gpt-image-2-generate.sh" code={DIRECT_CURL} />
      <ul>
        <li>
          文生图优先看 <Link to="/docs/api/images/">图片 API 文档</Link>。
        </li>
        <li>
          如果要手动做海报、电商图和批量素材，优先看{' '}
          <Link to="/docs/guides/agent-image-studio/">Agent 图片工作台教程</Link>。
        </li>
        <li>
          如果要让 Codex 自动生成封面或配图，优先看{' '}
          <Link to="/docs/guides/codex-gpt-image-2-skill/">Codex gpt-image-2 Skill 教程</Link>。
        </li>
      </ul>

      <h2 id="workflow">推荐工作流</h2>
      <ol>
        <li>先在 <code>agent.gpt88.cc</code> 手动打样，验证 prompt、构图、风格和商品一致性。</li>
        <li>确认方向后，再把稳定的 prompt 模板迁移到 `https://img.gpt88.cc` 的 API 流程。</li>
        <li>批量素材优先用高性价比方案，封面图、主图、广告图优先用高质量方案。</li>
        <li>需要后期排版的图，先生成无文字底图，再交给设计工具或前端模板加文案。</li>
        <li>生成完成后，到控制台核对实际用量，形成自己的单图成本基线。</li>
      </ol>

      <h2 id="faq">常见问题</h2>
      <DocTable
        headers={['问题', '说明']}
        rows={[
          [
            '是不是所有场景都该选原生 4K？',
            '不是。高频批量内容更应该优先考虑效率；真正需要细节和后期空间的图，再用原生 4K。',
          ],
          [
            '为什么图片 API 使用独立的媒体 Base URL？',
            '因为图片生成和文本调用的链路特征不同，单独优化更利于时延、稳定性和批量任务表现。',
          ],
          [
            '1K / 2K / 4K 同价是否代表质量完全一样？',
            '不是。同价只代表计费口径友好，不代表不同生成策略没有质量差异。',
          ],
          [
            '手动工作台和 API 该怎么分工？',
            '工作台适合打样和人工筛图，API 适合自动化、批量化和系统集成。',
          ],
        ]}
      />
    </DocPage>
  )
}
