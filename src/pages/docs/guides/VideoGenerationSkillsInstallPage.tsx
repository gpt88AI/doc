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
      <ul>
        <li>本机已安装 Node.js，能运行 <code>npx</code>。</li>
        <li>你使用的 Agent 支持 skills 生态，例如 Cursor。</li>
        <li>如果你想全局可用，使用 <code>-g</code>；如果只想当前项目可用，就去掉 <code>-g</code>。</li>
      </ul>

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

      <h2 id="all">一次装全部</h2>
      <p>如果你确实既做电商，又做广告，又做剧情视频，那就直接全装：</p>
      <CodeBlock lang="bash" filename="install-all.sh" code={INSTALL_ALL} />

      <h2 id="verify">验证是否安装成功</h2>
      <CodeBlock lang="bash" filename="verify.sh" code={VERIFY_CMD} />
      <p>
        正常情况下，你应该能看到 <code>prompt-director</code>、<code>ecommerce</code>、
        <code>brand-ad-cg</code>、<code>ai-video-director</code> 这些名称。
      </p>

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

      <h2 id="local">本地开发与更新</h2>
      <p>如果你想自己改 skill 内容，仓库本身也支持本地路径安装：</p>
      <CodeBlock lang="bash" filename="local-dev.sh" code={LOCAL_DEV} />
      <p>
        改完 <code>skills/*/SKILL.md</code> 后，重新执行一次 <code>npx skills add</code> 就能更新。
        这一点在仓库 README 和 INSTALL 文档里都写得很明确。
      </p>
    </DocPage>
  )
}
