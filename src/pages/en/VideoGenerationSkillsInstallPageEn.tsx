import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const INSTALL = `# List available skills
npx skills add adoin/video-generation-skills --list

# Install the foundation and ecommerce module for Cursor
npx skills add adoin/video-generation-skills -s prompt-director -s ecommerce -g -a cursor -y

# Install everything
npx skills add adoin/video-generation-skills --all -g -a cursor -y`

export default function VideoGenerationSkillsInstallPageEn() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-install"
      title="Install and use video-generation-skills"
      description="Install adoin/video-generation-skills in Cursor, Claude Code, Codex and other Agents with selective installation, verification and local development."
      headings={[
        { id: 'prep', text: 'Before installation', level: 2 },
        { id: 'list', text: 'List available skills', level: 2 },
        { id: 'single', text: 'Install selected modules', level: 2 },
        { id: 'all', text: 'Install everything', level: 2 },
        { id: 'verify', text: 'Verify the installation', level: 2 },
        { id: 'use', text: 'Trigger a skill after installation', level: 2 },
        { id: 'scenes', text: 'Recommended combinations', level: 2 },
        { id: 'local', text: 'Local development and updates', level: 2 },
      ]}
    >
      <Callout tone="info" title="Use npx skills add instead of copying directories manually">
        <p>The repository&apos;s standard installation path is <code>npx skills add</code>. Manual symlinks are useful for debugging, not normal use.</p>
      </Callout>
      <h2 id="prep">Before installation</h2>
      <ul>
        <li>Node.js and <code>npx</code> are available.</li>
        <li>The target Agent supports the skills ecosystem.</li>
        <li>Use <code>-g</code> for global installation; omit it for the current project only.</li>
        <li>Choose one or two modules before installing instead of adding unnecessary context.</li>
      </ul>
      <h2 id="list">List available skills</h2>
      <CodeBlock lang="bash" filename="list-skills.sh" code="npx skills add adoin/video-generation-skills --list" />
      <h2 id="single">Install selected modules</h2>
      <p><code>prompt-director</code> is the foundation. Add <code>ecommerce</code>, <code>brand-ad-cg</code> or <code>ai-video-director</code> only when the task requires that domain.</p>
      <CodeBlock lang="bash" filename="install-selected.sh" code={INSTALL} />
      <ul>
        <li><code>prompt-director</code>: prompt foundation.</li>
        <li><code>ecommerce</code>: product and social-commerce assets.</li>
        <li><code>brand-ad-cg</code>: brand advertising and CG.</li>
        <li><code>ai-video-director</code>: narrative video and storyboards.</li>
      </ul>
      <h2 id="all">Install everything</h2>
      <p>Use <code>--all</code> for a studio, multi-business team or skill research. For one focused production scenario, selective installation usually keeps context easier to control.</p>
      <h2 id="verify">Verify the installation</h2>
      <CodeBlock lang="bash" filename="verify.sh" code="npx skills list -g -a cursor" />
      <p>Confirm the expected module names appear under the same Agent target and installation scope you used.</p>
      <h2 id="use">Trigger a skill after installation</h2>
      <p>Describe the goal, platform, assets and constraints. The Agent can route the request without a manual <code>@skill</code> command.</p>
      <ul>
        <li>Prompt writing: <Link to="/docs/guides/video-generation-skills-prompt-director/">prompt-director</Link>.</li>
        <li>Marketplace and social-commerce assets: <Link to="/docs/guides/video-generation-skills-ecommerce/">ecommerce</Link>.</li>
        <li>Brand advertising and TVC: <Link to="/docs/guides/video-generation-skills-brand-ad-cg/">brand-ad-cg</Link>.</li>
        <li>Narrative shorts and continuity: <Link to="/docs/guides/video-generation-skills-ai-video-director/">ai-video-director</Link>.</li>
      </ul>
      <h2 id="scenes">Recommended combinations</h2>
      <ul>
        <li>Prompt writing: <code>prompt-director</code>.</li>
        <li>Ecommerce: <code>prompt-director + ecommerce</code>.</li>
        <li>Brand advertising: <code>prompt-director + brand-ad-cg</code>.</li>
        <li>Short drama or animation: <code>prompt-director + ai-video-director</code>.</li>
      </ul>
      <h2 id="local">Local development and updates</h2>
      <CodeBlock lang="bash" filename="local-dev.sh" code={`git clone https://github.com/adoin/video-generation-skills.git\ncd video-generation-skills\nnpx skills add ./ --list\nnpx skills add ./ --skill prompt-director -g -a cursor -y`} />
      <p>After updating the repository, reinstall the selected modules and rerun the list command so the active Agent target is verified.</p>
    </DocPage>
  )
}
