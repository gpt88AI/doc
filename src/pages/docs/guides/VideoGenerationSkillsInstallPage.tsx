import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'

const LIST_CMD = `npx skills add adoin/video-generation-skills --list`

const INSTALL_SINGLE = `# 只装提示词方法论
npx skills add adoin/video-generation-skills --skill prompt-director -g -a cursor -y

# 只装电商
npx skills add adoin/video-generation-skills --skill ecommerce -g -a cursor -y

# 同时装两个
npx skills add adoin/video-generation-skills -s prompt-director -s ai-video-director -g -a cursor -y`

const INSTALL_ALL = `npx skills add adoin/video-generation-skills --all -g -a cursor -y`

const VERIFY_CMD = `npx skills list -g -a cursor`

const LOCAL_DEV = `git clone https://github.com/adoin/video-generation-skills.git
cd video-generation-skills
npx skills add ./ --list
npx skills add ./ --skill prompt-director -g -a cursor -y`

const PRECHECK = `安装前确认：
- 已安装 Node.js，npx 可用
- 目标 Agent 支持 skills 生态
- 想全局安装就用 -g
- 只想当前项目可用就不要加 -g
- 先想清楚自己需要哪 1 到 2 个模块`

const RECOMMENDED_SETUPS = `常见安装组合：

只写提示词
npx skills add adoin/video-generation-skills --skill prompt-director -g -a cursor -y

做电商素材
npx skills add adoin/video-generation-skills -s prompt-director -s ecommerce -g -a cursor -y

做品牌广告 / TVC
npx skills add adoin/video-generation-skills -s prompt-director -s brand-ad-cg -g -a cursor -y

做短剧 / 漫剧
npx skills add adoin/video-generation-skills -s prompt-director -s ai-video-director -g -a cursor -y`

const AFTER_INSTALL = `装好后的调用习惯：
1. 不要一上来贴“请调用哪个 skill”
2. 直接描述任务目标、平台、素材和限制
3. 让 Agent 先判断属于哪个模块
4. 如果输出跑偏，再补“这是电商主图 / 这是短剧分镜 / 这是品牌广告 KV”`

function DetailBlock({
  title,
  intro,
  bullets,
}: {
  title: string
  intro: string
  bullets: readonly string[]
}) {
  return (
    <section className="not-prose my-6 rounded-xl border border-white/8 bg-white/[0.02] p-5">
      <h3 className="text-base font-semibold text-ink-50">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-300">{intro}</p>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-ink-200">
        {bullets.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export default function VideoGenerationSkillsInstallPage() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-install"
      title="video-generation-skills 安装与使用教程"
      description="把 adoin/video-generation-skills 安装到 Cursor、Claude Code、Codex 等 Agent 的详细步骤，包括按需安装、全量安装、验证和本地开发。"
      headings={[
        { id: 'prep', text: '安装前准备', level: 2 },
        { id: 'list', text: '先看有哪些 skill', level: 2 },
        { id: 'single', text: '按需安装', level: 2 },
        { id: 'all', text: '一次装全部', level: 2 },
        { id: 'verify', text: '验证是否安装成功', level: 2 },
        { id: 'use', text: '装好后怎么触发', level: 2 },
        { id: 'scenes', text: '推荐安装组合', level: 2 },
        { id: 'local', text: '本地开发与更新', level: 2 },
      ]}
    >
      <Callout tone="info" title="优先用 npx skills add，不要手动乱拷目录">
        <p>
          仓库作者在 <code>docs/INSTALL.md</code> 里已经说明了：标准安装方式是
          <code>npx skills add</code>。手动 symlink 只适合调试，不适合正式使用。
        </p>
      </Callout>

      <h2 id="prep">安装前准备</h2>
      <CodeBlock lang="text" filename="precheck" code={PRECHECK} />
      <ul>
        <li>本机已安装 Node.js，能运行 <code>npx</code>。</li>
        <li>你使用的 Agent 支持 skills 生态，例如 Cursor。</li>
        <li>如果你想全局可用，使用 <code>-g</code>；如果只想当前项目可用，就去掉 <code>-g</code>。</li>
      </ul>
      <DetailBlock
        title="为什么不建议一开始就全装"
        intro="这个技能包虽然不是特别大，但也不适合在不清楚目标时全部装上。"
        bullets={[
          '你只做电商时，先装 prompt-director + ecommerce 就够了。',
          '你只做短剧时，不需要同时把电商和品牌广告模块塞进上下文。',
          '模块越精简，Agent 越容易在正确的 reference 里工作，而不是到处乱跳。',
        ]}
      />

      <h2 id="list">先看有哪些 skill</h2>
      <p>第一步不要急着全装，先看这个仓库里有哪些模块：</p>
      <CodeBlock lang="bash" filename="list-skills.sh" code={LIST_CMD} />

      <h2 id="single">按需安装</h2>
      <p>
        仓库最适合按需装。比如你只做电商，不需要先把短剧模块也装上；你只做品牌广告，
        也没必要把电商工作流一起塞进上下文。
      </p>
      <CodeBlock lang="bash" filename="install-single.sh" code={INSTALL_SINGLE} />
      <ul>
        <li><code>prompt-director</code>：提示词底座。</li>
        <li><code>ecommerce</code>：电商素材。</li>
        <li><code>brand-ad-cg</code>：品牌广告 / CG。</li>
        <li><code>ai-video-director</code>：剧情视频 / 分镜制片。</li>
      </ul>
      <p>
        实际上，大多数人不应该单独只装 <code>ecommerce</code>、<code>brand-ad-cg</code> 或
        <code>ai-video-director</code>，而是应该把 <code>prompt-director</code> 一起装上。
        因为这 3 个模块经常要回到底层提示词方法论。
      </p>

      <h2 id="all">一次装全部</h2>
      <p>如果你确实既做电商，又做广告，又做剧情视频，那就直接全装：</p>
      <CodeBlock lang="bash" filename="install-all.sh" code={INSTALL_ALL} />
      <p>
        全装适合两类人：一类是内容工作室或多业务团队，另一类是你正在做技能研究和二次开发。
        如果你只是单一场景创作，全装通常不是最优解。
      </p>

      <h2 id="verify">验证是否安装成功</h2>
      <CodeBlock lang="bash" filename="verify.sh" code={VERIFY_CMD} />
      <p>
        正常情况下，你应该能看到 <code>prompt-director</code>、<code>ecommerce</code>、
        <code>brand-ad-cg</code>、<code>ai-video-director</code> 这些名称。
      </p>
      <DetailBlock
        title="如果列表里没看到 skill"
        intro="先排最常见的安装问题，不要直接怀疑仓库。"
        bullets={[
          '确认是不是装到了别的 Agent 目标上，例如用了 `-a cursor` 却在另一个工具里查看。',
          '确认全局和当前项目安装位置没有混淆，`-g` 和不带 `-g` 的结果不同。',
          '如果本地调试路径安装，确认当前目录就是仓库根目录，而不是 `docs/` 子目录。',
        ]}
      />

      <h2 id="use">装好后怎么触发</h2>
      <p>
        这个仓库的设计理念是不用你手动 <code>@skill</code>，而是让 Agent 根据描述自动匹配。
      </p>
      <ul>
        <li>你说“帮我写图生视频提示词”时，会更接近 <Link to="/docs/guides/video-generation-skills-prompt-director/">prompt-director</Link>。</li>
        <li>你说“做淘宝详情页 / TK 种草视频”时，会更接近 <Link to="/docs/guides/video-generation-skills-ecommerce/">ecommerce</Link>。</li>
        <li>你说“做耳机品牌广告 / TVC / CG 大片”时，会更接近 <Link to="/docs/guides/video-generation-skills-brand-ad-cg/">brand-ad-cg</Link>。</li>
        <li>你说“做古风短剧分镜 / 场景一致性”时，会更接近 <Link to="/docs/guides/video-generation-skills-ai-video-director/">ai-video-director</Link>。</li>
      </ul>
      <CodeBlock lang="text" filename="after-install" code={AFTER_INSTALL} />

      <h2 id="scenes">推荐安装组合</h2>
      <p>
        如果你不确定怎么装，直接照下面的组合来。这样比你自己凭感觉混装稳定得多。
      </p>
      <CodeBlock lang="bash" filename="recommended-setups.sh" code={RECOMMENDED_SETUPS} />

      <h2 id="local">本地开发与更新</h2>
      <p>如果你想自己改 skill 内容，仓库本身也支持本地路径安装：</p>
      <CodeBlock lang="bash" filename="local-dev.sh" code={LOCAL_DEV} />
      <p>
        改完 <code>skills/*/SKILL.md</code> 后，重新执行一次 <code>npx skills add</code> 就能更新。
        这一点在仓库 README 和 INSTALL 文档里都写得很明确。
      </p>
      <DetailBlock
        title="适合本地改造的场景"
        intro="如果你已经把这套技能融入自己的创作流，本地维护会更灵活。"
        bullets={[
          '你想删掉不需要的 reference，只保留与你团队业务相关的部分。',
          '你想把常用平台、模型、镜头模板改成自己的内部标准。',
          '你想把这套技能包继续扩成公司或团队自己的私有版本。',
        ]}
      />
    </DocPage>
  )
}
