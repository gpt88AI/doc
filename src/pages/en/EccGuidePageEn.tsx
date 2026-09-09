import { Link } from 'react-router-dom'
import { DocPage } from '../../components/layout/DocPage'
import { Callout } from '../../components/ui/Callout'
import { CodeBlock } from '../../components/ui/CodeBlock'

const DECISION = `Choose one installation path:
1. Claude Code users: /plugin marketplace add + /plugin install
2. Low-context rules only: minimal manual installation
3. Fine-grained modules, hooks, rules, and MCP: ECC CLI or manual install
4. Already installed: do not stack a full installer
5. Duplicate install: reset or uninstall first, then choose one path`

const PLUGIN = `# Run inside Claude Code, not in your shell
/plugin marketplace add https://github.com/affaan-m/ECC
/plugin install ecc@ecc
/plugin list ecc@ecc`

const RULES = `git clone https://github.com/affaan-m/ECC.git
cd ECC
npm install

mkdir -p ~/.claude/rules/ecc
cp -R rules/common ~/.claude/rules/ecc/
cp -R rules/typescript ~/.claude/rules/ecc/

# For a Python project, add:
# cp -R rules/python ~/.claude/rules/ecc/`

const INSTALL = `# macOS / Linux
git clone https://github.com/affaan-m/ECC.git
cd ECC
npm install

# Low-context path without hooks
./install.sh --profile minimal --target claude

# Core profile without the hooks runtime
./install.sh --profile core --without baseline:hooks --target claude`

const CODEX = `1. Use a GPT88 API-key profile for model calls, code generation, and refactoring
2. Use a ChatGPT OAuth profile for Codex plugins and official account capabilities
3. Install ECC in Claude Code as an agent-workflow reference layer
4. Borrow ECC rules, skills, and verification loops for Codex projects
5. Do not copy Claude Code plugin files into Codex configuration directories`

const DAILY = `1. Plan the task first
2. Execute through a verification loop
3. Preserve diff, tests, logs, screenshots, or benchmarks
4. Use security review flows for sensitive work
5. Use worktrees and parallelisation while controlling context pollution
6. Turn valuable lessons into rules, skills, or project documentation`

const RESET = `Stop reinstalling.
Remove the Claude Code plugin and unnecessary ~/.claude/rules/ecc/ directories.
Preview the cleanup:
node scripts/uninstall.js --dry-run

Then inspect the installation state:
node scripts/ecc.js list-installed
node scripts/ecc.js doctor
node scripts/ecc.js repair`

export default function EccGuidePageEn() {
  return (
    <DocPage
      path="/docs/guides/ecc-agent-harness"
      title="ECC Guide: A Reusable Agent Workflow System"
      description="Learn what ECC is, how to install it without duplication, how to copy rules safely, and how to combine its workflow ideas with Claude Code and Codex."
      headings={[
        { id: 'what-is-ecc', text: 'What ECC is', level: 2 },
        { id: 'when-to-use', text: 'When to use it', level: 2 },
        { id: 'install-path', text: 'Choose an install path', level: 2 },
        { id: 'claude-plugin', text: 'Install the Claude plugin', level: 2 },
        { id: 'rules', text: 'Copy rules selectively', level: 2 },
        { id: 'manual', text: 'Manual installation', level: 2 },
        { id: 'codex', text: 'Use the ideas with Codex', level: 2 },
        { id: 'workflow', text: 'Daily workflow', level: 2 },
        { id: 'troubleshooting', text: 'Troubleshooting and uninstall', level: 2 },
      ]}
    >
      <Callout tone="info" title="ECC is more than a configuration bundle">
        <p>
          ECC is a harness-oriented operating system for agent work. It combines skills, rules, hooks,
          MCP configuration, commands, security checks, and verification loops so a one-off prompt becomes
          a repeatable engineering workflow.
        </p>
      </Callout>

      <h2 id="what-is-ecc">What ECC is</h2>
      <p>
        ECC targets Claude Code, Codex, Cursor, OpenCode, Gemini, Zed, and GitHub Copilot workflows. Its
        purpose is not to add more prompt text, but to standardise planning, memory, learning, safety,
        validation, and parallel execution around an agent harness.
      </p>

      <h2 id="when-to-use">When to use it</h2>
      <ul>
        <li>You regularly use Claude Code, Codex, Cursor, or OpenCode for complex development tasks.</li>
        <li>You want agents to plan, verify, review, and retain useful project knowledge.</li>
        <li>You need shared rules, skills, hooks, MCP settings, and slash commands.</li>
        <li>You have seen context pollution, duplicate prompts, interrupted tasks, or unclear safety boundaries.</li>
      </ul>

      <h2 id="install-path">Choose an install path</h2>
      <CodeBlock lang="text" filename="decision" code={DECISION} />
      <p>
        The most common failure is installing the Claude plugin and then running a full installer over the
        same files. Select one path and inspect the plan before applying it.
      </p>

      <h2 id="claude-plugin">Install the Claude plugin</h2>
      <CodeBlock lang="text" filename="claude-plugin" code={PLUGIN} />

      <h2 id="rules">Copy rules selectively</h2>
      <p>
        The plugin does not automatically distribute every rule. Copy the shared rules and the language
        rules that match the current project. Do not copy every rule just because it exists; rules consume
        context and change agent behaviour.
      </p>
      <CodeBlock lang="bash" filename="copy-rules" code={RULES} />

      <h2 id="manual">Manual installation</h2>
      <p>
        Use a manual install when the marketplace is unavailable or when you need tighter control. Start
        with minimal or core-without-hooks instead of the full profile.
      </p>
      <CodeBlock lang="bash" filename="install" code={INSTALL} />

      <h2 id="codex">Use the ideas with Codex</h2>
      <p>
        ECC is cross-harness in concept, but configuration directories and plugin mechanisms differ. Borrow
        the workflow patterns; do not copy Claude Code plugin files into Codex directories.
      </p>
      <CodeBlock lang="text" filename="codex-usage" code={CODEX} />
      <p>
        For profile separation and plugin access, see the <Link to="/docs/guides/codex-plugins-oauth/">Codex OAuth guide</Link>.
      </p>

      <h2 id="workflow">Daily workflow</h2>
      <p>
        The most useful ECC idea is the plan - execute - verify - learn loop. Treat commands as part of an
        observable engineering process, not as a collection of shortcuts.
      </p>
      <CodeBlock lang="text" filename="daily-workflow" code={DAILY} />

      <h2 id="troubleshooting">Troubleshooting and uninstall</h2>
      <p>
        Duplicate plugin, full-installer, and manual-rule installs can create repeated commands, hooks, and
        conflicting behaviour. Stop reinstalling and preview cleanup first.
      </p>
      <CodeBlock lang="bash" filename="duplicate-fix" code={RESET} />
      <p>
        Refer to the <a href="https://github.com/affaan-m/ECC" target="_blank" rel="noreferrer">ECC repository</a>{' '}
        for the current installer and reset details.
      </p>
    </DocPage>
  )
}
