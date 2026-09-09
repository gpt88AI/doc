import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const MODULES = `prompt-director
- Prompt methodology: composition, light, camera movement, consistency and character control

ecommerce
- Ecommerce assets: product pages, hero images, UGC and social commerce video

brand-ad-cg
- Brand advertising, TVC and product-CG commercial visuals

ai-video-director
- Narrative production: shorts, storyboards, shot planning and continuity`

const ROUTING = `Prompt writing              -> prompt-director
Ecommerce assets           -> prompt-director + ecommerce
Brand advertising / CG     -> prompt-director + brand-ad-cg
Narrative video production -> prompt-director + ai-video-director
Everything                 -> --all`

export default function VideoGenerationSkillsOverviewPageEn() {
  return (
    <DocPage
      path="/docs/guides/video-generation-skills-overview"
      title="Video generation skills overview"
      description="An overview of four AI video-generation skills, their boundaries, combinations and recommended use cases."
      headings={[
        { id: 'what', text: 'What this repository is', level: 2 },
        { id: 'modules', text: 'What each skill does', level: 2 },
        { id: 'routing', text: 'How to choose a combination', level: 2 },
        { id: 'principles', text: 'How the system is organized', level: 2 },
        { id: 'next', text: 'What to read next', level: 2 },
      ]}
    >
      <Callout tone="info" title="This is a multi-skill package, not one prompt template">
        <p>
          The <a href="https://github.com/adoin/video-generation-skills" target="_blank" rel="noreferrer">video-generation-skills repository</a> can be installed through the skills ecosystem.
          It separates foundational prompt methods from ecommerce, brand and narrative production modules.
        </p>
      </Callout>
      <h2 id="what">What this repository is</h2>
      <p>Use the package as a routing layer: start with a shared visual language, then add the business module that matches the deliverable.</p>
      <h2 id="modules">What each skill does</h2>
      <CodeBlock lang="text" filename="modules" code={MODULES} />
      <ul>
        <li><Link to="/docs/guides/video-generation-skills-prompt-director/">prompt-director</Link></li>
        <li><Link to="/docs/guides/video-generation-skills-ecommerce/">ecommerce</Link></li>
        <li><Link to="/docs/guides/video-generation-skills-brand-ad-cg/">brand-ad-cg</Link></li>
        <li><Link to="/docs/guides/video-generation-skills-ai-video-director/">ai-video-director</Link></li>
      </ul>
      <h2 id="routing">How to choose a combination</h2>
      <p><code>prompt-director</code> is the foundation. The other three modules specialize the workflow for a business or narrative outcome.</p>
      <CodeBlock lang="text" filename="routing" code={ROUTING} />
      <h2 id="principles">How the system is organized</h2>
      <ul>
        <li>Use the foundation for camera, lighting, action, consistency and character rules.</li>
        <li>Add ecommerce when conversion, product variants and channel ratios matter.</li>
        <li>Add brand-ad-cg when visual identity, premium material and campaign structure matter.</li>
        <li>Add ai-video-director when continuity, assets, storyboards and reshoots matter.</li>
        <li>Install only the modules needed for the current task to keep context and maintenance manageable.</li>
      </ul>
      <h2 id="next">What to read next</h2>
      <ol>
        <li>If you need installation, read <Link to="/docs/guides/video-generation-skills-install/">the installation guide</Link>.</li>
        <li>If you write prompts, start with <Link to="/docs/guides/video-generation-skills-prompt-director/">prompt-director</Link>.</li>
        <li>If you make product assets, read <Link to="/docs/guides/video-generation-skills-ecommerce/">ecommerce</Link>.</li>
        <li>If you make campaigns, read <Link to="/docs/guides/video-generation-skills-brand-ad-cg/">brand-ad-cg</Link>.</li>
        <li>If you make narrative videos, read <Link to="/docs/guides/video-generation-skills-ai-video-director/">ai-video-director</Link>.</li>
      </ol>
    </DocPage>
  )
}
