import{n as e}from"./ui-BNsvkuFE.js";import{n as t}from"./router-UMsBxeLW.js";import{t as n}from"./CodeBlock-6HZkGMv-.js";import{c as r,s as i}from"./index-ivPh6OuT.js";var a=e(),o=`先判断你要哪种安装路径：

1. Claude Code 用户优先：使用 /plugin marketplace add + /plugin install
2. 只想要低上下文规则和基础能力：使用 minimal 手动安装
3. 想精细控制模块、hooks、rules、MCP：使用 ECC CLI / 手动安装
4. 已经安装过插件：不要再叠加 full installer
5. 已经重复安装：先 reset / uninstall，再选择一种路径重装`,s=`# 在 Claude Code 中执行，不是在终端中执行
/plugin marketplace add https://github.com/affaan-m/ECC

# 安装 ECC 插件
/plugin install ecc@ecc

# 查看插件是否安装
/plugin list ecc@ecc`,c=`# 插件路径不会自动分发 rules，需要你按需复制
git clone https://github.com/affaan-m/ECC.git
cd ECC
npm install

# 推荐只复制 common + 当前项目语言规则
mkdir -p ~/.claude/rules/ecc
cp -R rules/common ~/.claude/rules/ecc/
cp -R rules/typescript ~/.claude/rules/ecc/

# 如果是 Python 项目，可以再复制：
# cp -R rules/python ~/.claude/rules/ecc/

# 不建议无脑复制全部 rules，除非你明确需要所有上下文。`,l=`# macOS / Linux
git clone https://github.com/affaan-m/ECC.git
cd ECC
npm install

# 低上下文、无 hooks 路径
./install.sh --profile minimal --target claude

# 或使用 npm 包入口
npx ecc-install --profile minimal --target claude`,u=`# 想要 core profile，但先不要 hooks runtime
./install.sh --profile core --without baseline:hooks --target claude

# 后续确认稳定后，再单独补 hooks
./install.sh --target claude --modules hooks-runtime`,d=`# 不确定安装哪些组件时，先让 ECC 给建议
npx ecc consult "security reviews" --target claude

# MLOps / 训练 / 部署类项目示例
npx ecc consult "mlops training model deployment" --target claude

# 安装建议组件前，优先预览 install plan，再执行安装。`,f=`Codex 配合 ECC 的推荐方式：

1. 用 gpt88.cc API Key profile 处理模型调用、代码生成、重构
2. 用 ChatGPT OAuth profile 处理 Codex 插件和官方账号能力
3. 在 Claude Code 中安装 ECC 插件，作为 agent 工作流参考层
4. 对 Codex 项目，优先借鉴 ECC 的 rules / skills / verification loop
5. 不要把 Claude Code 插件文件强行复制进 Codex 配置目录，避免 harness 结构不兼容`,p=`如果你已经重复安装：

1. 先停止继续 reinstall
2. 在 Claude Code 中移除 ECC 插件
3. 删除手动复制的 ~/.claude/rules/ecc/ 中不需要的目录
4. 在 ECC 仓库根目录执行 dry-run
5. 确认无误后再卸载 install-state 记录的文件

命令：

node scripts/uninstall.js --dry-run
node scripts/uninstall.js

# 或生命周期工具
node scripts/ecc.js list-installed
node scripts/ecc.js doctor
node scripts/ecc.js repair
node scripts/ecc.js uninstall --dry-run`,m=`推荐日常使用顺序：

1. 先用 /ecc:plan 或 plan 类命令拆任务
2. 再让 agent 按 verification loop 执行
3. 每个阶段保留可验证产物：diff、测试、日志、截图、benchmark
4. 对安全敏感任务启用 security / AgentShield 类流程
5. 对大任务使用 worktree / parallelization，但要控制上下文污染
6. 结束后把高价值经验沉淀成规则、skill 或项目文档`;function h({step:e,title:t,children:n}){return(0,a.jsx)(`section`,{className:`not-prose my-5 rounded-xl border border-white/10 bg-white/[0.035] p-5`,children:(0,a.jsxs)(`div`,{className:`flex items-start gap-3`,children:[(0,a.jsx)(`div`,{className:`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/10 font-mono text-sm font-semibold text-violet-200`,children:e}),(0,a.jsxs)(`div`,{className:`min-w-0`,children:[(0,a.jsx)(`h3`,{className:`m-0 text-base font-semibold text-ink-50`,children:t}),(0,a.jsx)(`div`,{className:`mt-2 space-y-2 text-sm leading-6 text-ink-200`,children:n})]})]})})}function g(){return(0,a.jsxs)(r,{path:`/docs/guides/ecc-agent-harness`,title:`ECC 教程：把 Claude Code / Codex 变成可复用的 Agent 工作流系统`,description:`基于 affaan-m/ECC 的详细教程，讲清 ECC 是什么、如何选择插件或手动安装路径、如何避免重复安装，以及如何和 gpt88.cc、Codex、Claude Code 工作流配合。`,headings:[{id:`what-is-ecc`,text:`ECC 是什么`,level:2},{id:`when-to-use`,text:`适用场景`,level:2},{id:`install-path`,text:`安装路径选择`,level:2},{id:`claude-plugin`,text:`Claude 插件安装`,level:2},{id:`rules`,text:`Rules 复制方式`,level:2},{id:`manual`,text:`手动安装`,level:2},{id:`codex`,text:`配合 Codex 使用`,level:2},{id:`workflow`,text:`日常工作流`,level:2},{id:`troubleshooting`,text:`排障与卸载`,level:2},{id:`references`,text:`参考资料`,level:2}],children:[(0,a.jsx)(i,{tone:`info`,title:`先说结论`,children:(0,a.jsx)(`p`,{children:`ECC 不只是一个 Claude Code 配置包。它更像一套跨 agent harness 的操作系统： 用 skills、rules、hooks、MCP 配置、命令和安全扫描，把一次性的提示词变成可复用、 可验证、可迁移的工程工作流。`})}),(0,a.jsx)(`h2`,{id:`what-is-ecc`,children:`ECC 是什么`}),(0,a.jsxs)(`p`,{children:[(0,a.jsx)(`a`,{href:`https://github.com/affaan-m/ECC`,target:`_blank`,rel:`noreferrer`,children:`affaan-m/ECC`}),` `,`的 README 把它定义为面向 agentic work 的 harness-native operator system。 它覆盖 Claude Code、Codex、Cursor、OpenCode、Gemini、Zed、GitHub Copilot 等工具， 目标不是“多给几个提示词”，而是把 agent 使用中的规划、记忆、学习、安全、验证和并行执行沉淀成体系。`]}),(0,a.jsx)(`p`,{children:`对 gpt88.cc 用户来说，ECC 的价值主要在三点：第一，给 Claude Code / Codex 这类工具补上稳定工作流； 第二，把常用任务沉淀为 skills 和 rules，减少每次重新解释上下文；第三，通过安全和验证流程， 降低 agent 自动改代码时的不可控风险。`}),(0,a.jsx)(`h2`,{id:`when-to-use`,children:`适用场景`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsx)(`li`,{children:`你经常用 Claude Code、Codex、Cursor 或 OpenCode 执行复杂开发任务。`}),(0,a.jsx)(`li`,{children:`你希望 agent 不只是聊天，而是能按计划、验证、复盘、沉淀的流程工作。`}),(0,a.jsx)(`li`,{children:`你需要 rules、skills、hooks、MCP 配置和 slash commands 统一管理。`}),(0,a.jsx)(`li`,{children:`你希望在 gpt88.cc 中转站模型调用之外，补上更标准的工程执行方法。`}),(0,a.jsx)(`li`,{children:`你已经遇到过重复提示、上下文污染、任务中断、工具误用或安全边界不清的问题。`})]}),(0,a.jsx)(n,{lang:`text`,filename:`decision`,code:o}),(0,a.jsx)(`h2`,{id:`install-path`,children:`安装路径选择`}),(0,a.jsxs)(`p`,{children:[`ECC README 反复强调一件事：选择一种安装路径，不要叠加安装。最容易出问题的情况是： 先在 Claude Code 里安装插件，又执行 `,(0,a.jsx)(`code`,{children:`install.sh --profile full`}),` 或`,(0,a.jsx)(`code`,{children:`npx ecc-install --profile full`}),`。这样会把同一批 skills、commands、hooks 复制到用户目录，导致重复加载和重复行为。`]}),(0,a.jsx)(`div`,{className:`not-prose overflow-hidden rounded-xl border border-white/10`,children:(0,a.jsxs)(`table`,{className:`w-full text-left text-sm`,children:[(0,a.jsx)(`thead`,{className:`bg-white/[0.04] text-ink-300`,children:(0,a.jsxs)(`tr`,{children:[(0,a.jsx)(`th`,{className:`px-4 py-3 font-semibold`,children:`路径`}),(0,a.jsx)(`th`,{className:`px-4 py-3 font-semibold`,children:`适合谁`}),(0,a.jsx)(`th`,{className:`px-4 py-3 font-semibold`,children:`注意点`})]})}),(0,a.jsxs)(`tbody`,{className:`divide-y divide-white/5 text-ink-200`,children:[(0,a.jsxs)(`tr`,{children:[(0,a.jsx)(`td`,{className:`px-4 py-3 font-mono text-violet-200`,children:`Claude 插件`}),(0,a.jsx)(`td`,{className:`px-4 py-3`,children:`大多数 Claude Code 用户`}),(0,a.jsx)(`td`,{className:`px-4 py-3`,children:`插件不会自动分发 rules，需要按需手动复制`})]}),(0,a.jsxs)(`tr`,{children:[(0,a.jsx)(`td`,{className:`px-4 py-3 font-mono text-violet-200`,children:`minimal 手动安装`}),(0,a.jsx)(`td`,{className:`px-4 py-3`,children:`只想要低上下文、无 hooks 的基础能力`}),(0,a.jsx)(`td`,{className:`px-4 py-3`,children:`适合先试用，避免 hooks 影响全局行为`})]}),(0,a.jsxs)(`tr`,{children:[(0,a.jsx)(`td`,{className:`px-4 py-3 font-mono text-violet-200`,children:`core without hooks`}),(0,a.jsx)(`td`,{className:`px-4 py-3`,children:`想要核心能力，但暂时关闭运行时 hooks`}),(0,a.jsx)(`td`,{className:`px-4 py-3`,children:`确认稳定后再单独补 hooks-runtime`})]}),(0,a.jsxs)(`tr`,{children:[(0,a.jsx)(`td`,{className:`px-4 py-3 font-mono text-violet-200`,children:`full 手动安装`}),(0,a.jsx)(`td`,{className:`px-4 py-3`,children:`明确跳过插件、希望完全手动管理的人`}),(0,a.jsx)(`td`,{className:`px-4 py-3`,children:`不要和插件安装叠加`})]})]})]})}),(0,a.jsx)(`h2`,{id:`claude-plugin`,children:`Claude 插件安装`}),(0,a.jsx)(`p`,{children:`如果你主要使用 Claude Code，优先走插件路径。注意下面命令是在 Claude Code 会话里执行， 不是在系统终端里执行。`}),(0,a.jsx)(n,{lang:`bash`,filename:`claude-plugin`,code:s}),(0,a.jsx)(h,{step:`1`,title:`安装 marketplace`,children:(0,a.jsxs)(`p`,{children:[`先添加 ECC 自托管 marketplace。仓库当前的 Claude 插件标识符是 `,(0,a.jsx)(`code`,{children:`ecc@ecc`}),`， GitHub 源仓库仍然是 `,(0,a.jsx)(`code`,{children:`affaan-m/ECC`}),`，npm 包名则是 `,(0,a.jsx)(`code`,{children:`ecc-universal`}),`。 这三个名字不要混用。`]})}),(0,a.jsx)(h,{step:`2`,title:`安装插件`,children:(0,a.jsxs)(`p`,{children:[`执行 `,(0,a.jsx)(`code`,{children:`/plugin install ecc@ecc`}),` 后，Claude Code 会加载 ECC 的插件能力。 如果你的 Claude Code 版本无法解析自托管 marketplace，再考虑使用手动安装路径。`]})}),(0,a.jsx)(h,{step:`3`,title:`不要叠加 full installer`,children:(0,a.jsxs)(`p`,{children:[`插件安装后不要再运行 `,(0,a.jsx)(`code`,{children:`./install.sh --profile full`}),` 或`,(0,a.jsx)(`code`,{children:`npx ecc-install --profile full`}),`。如果需要 rules，只复制 rules 目录。`]})}),(0,a.jsx)(`h2`,{id:`rules`,children:`Rules 复制方式`}),(0,a.jsxs)(`p`,{children:[`ECC 明确说明：Claude Code 插件无法自动分发 `,(0,a.jsx)(`code`,{children:`rules`}),`。所以插件安装完成后， 如果你需要 rules，需要从仓库里按需复制到 `,(0,a.jsx)(`code`,{children:`~/.claude/rules/ecc/`}),`。`]}),(0,a.jsx)(n,{lang:`bash`,filename:`copy-rules`,code:c}),(0,a.jsx)(i,{tone:`warn`,title:`不要无脑复制全部 rules`,children:(0,a.jsxs)(`p`,{children:[`rules 会进入 agent 的行为约束和上下文。复制越多，不一定越好。建议从`,(0,a.jsx)(`code`,{children:`rules/common`}),` 加当前项目语言规则开始，例如 TypeScript 项目复制`,(0,a.jsx)(`code`,{children:`rules/typescript`}),`，Python 项目复制 `,(0,a.jsx)(`code`,{children:`rules/python`}),`。`]})}),(0,a.jsx)(`h2`,{id:`manual`,children:`手动安装`}),(0,a.jsx)(`p`,{children:`如果你不想走插件，或者你的 Claude Code 版本无法安装自托管 marketplace，可以使用手动安装。 推荐先从 minimal 或 core-without-hooks 开始，而不是直接 full。`}),(0,a.jsx)(n,{lang:`bash`,filename:`minimal-install`,code:l}),(0,a.jsx)(n,{lang:`bash`,filename:`core-without-hooks`,code:u}),(0,a.jsx)(`p`,{children:`不确定安装哪些组件时，先用 ECC 的 consult 能力让它给出组件建议，再预览安装计划。`}),(0,a.jsx)(n,{lang:`bash`,filename:`ecc-consult`,code:d}),(0,a.jsx)(`h2`,{id:`codex`,children:`配合 Codex 使用`}),(0,a.jsx)(`p`,{children:`ECC 的仓库目标是跨 harness，但不同工具的配置目录和插件机制并不相同。对 Codex 用户， 更稳妥的方式是借鉴 ECC 的工作流思想和 rules/skills 结构，而不是把 Claude Code 插件文件 直接复制到 Codex 配置目录。`}),(0,a.jsx)(n,{lang:`text`,filename:`codex-usage`,code:f}),(0,a.jsxs)(`p`,{children:[`如果你的 Codex 通过 gpt88.cc 中转站调用模型，可以继续保留 gpt88.cc API Key profile； 如果需要插件能力，再切到 ChatGPT OAuth profile。详细切换方式见`,` `,(0,a.jsx)(t,{to:`/docs/guides/codex-plugins-oauth/`,children:`Codex 插件 OAuth 登录`}),`。`]}),(0,a.jsx)(`h2`,{id:`workflow`,children:`日常工作流`}),(0,a.jsx)(`p`,{children:`ECC 最值得学习的是“把 agent 使用标准化”。不要把它只当命令集合，而要把它当成一套 plan → execute → verify → learn 的工程闭环。`}),(0,a.jsx)(n,{lang:`text`,filename:`daily-workflow`,code:m}),(0,a.jsx)(`h2`,{id:`troubleshooting`,children:`排障与卸载`}),(0,a.jsx)(`p`,{children:`如果你已经把插件、full installer、手动复制 rules 叠加到一起，表现通常是： 命令重复、skills 重复、hooks 重复执行、agent 行为变得啰嗦或冲突。此时不要继续 reinstall， 先清理重复安装。`}),(0,a.jsx)(n,{lang:`text`,filename:`duplicate-fix`,code:p}),(0,a.jsx)(`h2`,{id:`references`,children:`参考资料`}),(0,a.jsxs)(`ul`,{children:[(0,a.jsx)(`li`,{children:(0,a.jsx)(`a`,{href:`https://github.com/affaan-m/ECC`,target:`_blank`,rel:`noreferrer`,children:`affaan-m/ECC GitHub 仓库`})}),(0,a.jsx)(`li`,{children:(0,a.jsx)(`a`,{href:`https://github.com/affaan-m/ECC#quick-start`,target:`_blank`,rel:`noreferrer`,children:`ECC Quick Start`})}),(0,a.jsx)(`li`,{children:(0,a.jsx)(`a`,{href:`https://github.com/affaan-m/ECC#reset--uninstall-ecc`,target:`_blank`,rel:`noreferrer`,children:`ECC Reset / Uninstall`})}),(0,a.jsx)(`li`,{children:(0,a.jsx)(t,{to:`/docs/guides/codex-plugins-oauth/`,children:`Codex 插件 OAuth 登录教程`})}),(0,a.jsx)(`li`,{children:(0,a.jsx)(t,{to:`/docs/guides/codex-tool-recovery/`,children:`Codex 工具恢复教程`})})]})]})}export{g as default};