import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Callout } from '../../components/ui/Callout'

const INSTALL = `# Full Taste Skill package for Codex
npx skills add Leonxlnx/taste-skill -a codex

# Default frontend design skill
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"

# Strict GPT / Codex-oriented variant
npx skills add https://github.com/Leonxlnx/taste-skill --skill "gpt-tasteskill"`

const VERIFY = `1. Can Codex read the new SKILL.md?
2. Does the project already have a design system or component library?
3. Are page type, audience, visual direction, references, and interaction complexity clear?
4. Did Codex write a design read before implementation?
5. Did the final response include an anti-slop pre-flight check?`

const PROMPT = `Use the Taste Skill frontend design rules for this page.

Context:
- Product: AI API documentation site
- Audience: developers, AI-tool users, and team administrators
- Direction: dark technical documentation, restrained contrast, no generic purple AI template
- Constraint: preserve the current GPT88 navigation and layout

Requirements:
1. Read the existing page and components before editing
2. Start with one design read describing page type, density, motion, and layout
3. Reuse existing components and CSS variables
4. Avoid three equal feature cards, decorative gradient blobs, fake dashboards, and placeholder copy
5. Run a build or focused validation and report the changes`

const WORKFLOW = `1. Read the current page, components, CSS, and navigation
2. Produce a design read before writing code
3. Define information architecture: first view, steps, examples, FAQ, and next action
4. Implement one coherent direction
5. Run a build, preview, or screenshot check
6. Iterate on concrete findings instead of rewriting the whole page`

const CHECKLIST = `1. Does the first view explain the page value?
2. Is the copy grounded in the actual product and audience?
3. Are repeated equal-width feature cards avoided?
4. Are decorative gradients, grids, and glowing blobs justified?
5. Is the existing design system and navigation preserved?
6. Are commands, steps, and configuration examples real?
7. Is the mobile layout readable?
8. Does the code build?
9. Are heading hierarchy, internal links, and SEO metadata present?
10. Are there no placeholders, TODOs, fake data, or unfinished blocks?`

export default function CodexFrontendTasteSkillPageEn() {
  return (
    <DocPage
      path="/docs/guides/codex-frontend-taste-skill"
      title="Use Taste Skill with Codex for Frontend Design"
      description="Install Taste Skill, give Codex stronger frontend design constraints, preserve an existing design system, and verify the result without generic AI UI patterns."
      headings={[
        { id: 'why', text: 'What Taste Skill changes', level: 2 },
        { id: 'install', text: 'Install it in Codex', level: 2 },
        { id: 'workflow', text: 'Recommended workflow', level: 2 },
        { id: 'prompt', text: 'Reusable prompt', level: 2 },
        { id: 'rules', text: 'Applying the design rules', level: 2 },
        { id: 'checklist', text: 'Anti-slop checklist', level: 2 },
        { id: 'troubleshooting', text: 'Troubleshooting', level: 2 },
      ]}
    >
      <Callout tone="info" title="Use a design skill as a process constraint">
        <p>
          Taste Skill is not a reason to replace an existing brand or component system. It gives Codex a
          stronger process for inferring the page type, choosing density and motion, and checking the result
          before delivery.
        </p>
      </Callout>

      <h2 id="why">What Taste Skill changes</h2>
      <p>
        A design skill helps Codex avoid generic layouts by making the design read explicit. The agent must
        understand audience, product context, information hierarchy, interaction complexity, and existing
        tokens before it writes frontend code.
      </p>

      <h2 id="install">Install it in Codex</h2>
      <CodeBlock lang="bash" filename="install-taste-skill.sh" code={INSTALL} />
      <Callout tone="warn" title="Do not overwrite an existing design system blindly">
        <p>
          Preserve Tailwind tokens, component libraries, shadcn, Radix, Material, Polaris, Carbon, or
          internal design systems when the project already uses them.
        </p>
      </Callout>
      <CodeBlock lang="text" filename="verify" code={VERIFY} />

      <h2 id="workflow">Recommended workflow</h2>
      <CodeBlock lang="text" filename="workflow" code={WORKFLOW} />
      <p>
        For an existing project, audit first. Ask Codex what looks generic, what must remain, and what can
        be modernised before allowing it to edit the page.
      </p>

      <h2 id="prompt">Reusable prompt</h2>
      <CodeBlock lang="text" filename="codex-prompt" code={PROMPT} />

      <h2 id="rules">Applying the design rules</h2>
      <ul>
        <li>For a new page, define type, audience, mood, density, and references before implementation.</li>
        <li>For a redesign, run a visual audit and separate preserved elements from changes.</li>
        <li>For a component project, inspect tokens, themes, and existing primitives before adding new ones.</li>
        <li>For motion, use stable patterns and avoid fragile scroll listeners.</li>
        <li>For documentation, prioritise readability, anchors, code blocks, tables, links, and mobile reading.</li>
      </ul>

      <h2 id="checklist">Anti-slop checklist</h2>
      <CodeBlock lang="text" filename="anti-slop-checklist" code={CHECKLIST} />

      <h2 id="troubleshooting">Troubleshooting</h2>
      <ul>
        <li>If Codex ignores the skill, name it explicitly and confirm the SKILL.md location.</li>
        <li>If the page still feels templated, require a design read and specify audience, industry, density, references, and forbidden patterns.</li>
        <li>If it conflicts with the site, ask Codex to read the current components and CSS first.</li>
        <li>If the change is too broad, limit the scope to one page or section and preserve routes and shared APIs.</li>
        <li>If the build fails, fix TypeScript and JSX errors before iterating on visual details.</li>
      </ul>
      <p>
        Continue with <Link to="/docs/integrations/dev/codex-cli/">Codex CLI integration</Link>,{' '}
        <Link to="/docs/guides/codex-tool-recovery/">tool recovery</Link>, or{' '}
        <Link to="/docs/guides/codex-gpt-image-2-skill/">the GPT-Image-2 Skill</Link>.
      </p>
    </DocPage>
  )
}
