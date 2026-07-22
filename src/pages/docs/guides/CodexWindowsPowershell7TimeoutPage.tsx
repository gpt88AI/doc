import { Link } from 'react-router-dom'
import { Callout } from '../../../components/ui/Callout'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { DocPage } from '../../../components/layout/DocPage'

const SCREEN_ERROR = `Reconnecting... 1/5 (1m 00s · esc to interrupt)
Unexpected status 524 <unknown status code>: responses stream finished without usable output
url: https://<upstream>/v1/responses`

const VERSION_CHECK = [
  '$PSVersionTable | Format-List PSVersion, PSEdition, OS',
  '$PSVersionTable.PSVersion.ToString()',
  '$PSVersionTable.PSEdition',
  '',
  '(Get-Command powershell -ErrorAction SilentlyContinue).Source',
  '(Get-Command pwsh -ErrorAction SilentlyContinue).Source',
].join('\n')

const UTF8_CHECK = [
  '$utf8 = [System.Text.UTF8Encoding]::new($false)',
  '[Console]::InputEncoding = $utf8',
  '[Console]::OutputEncoding = $utf8',
  '$OutputEncoding = $utf8',
  '',
  'Write-Output "中文编码测试 / tool-stream-ok"',
  '{ text = "中文"; ok = $true } | ConvertTo-Json -Compress',
].join('\n')

const INSTALL = [
  '# 在 Windows Terminal、PowerShell 5.1 或命令提示符中执行',
  'winget install --id Microsoft.PowerShell --source winget',
  '',
  '# 安装完成后打开 PowerShell 7',
  'pwsh',
].join('\n')

const LAUNCH_FROM_PWSH = [
  '# 先确认当前目录和工作区，再从 PowerShell 7 启动 Agent',
  'Set-Location C:\\path\\to\\your\\project',
  'git status --short',
  'pwsh',
  '',
  '# 已进入 PowerShell 7 后启动 Codex CLI（按实际命令替换）',
  'codex',
].join('\n')

const PROFILE_SETUP = [
  '$profileDir = Split-Path -Parent $PROFILE',
  'New-Item -ItemType Directory -Force -Path $profileDir | Out-Null',
  'New-Item -ItemType File -Force -Path $PROFILE | Out-Null',
  'notepad $PROFILE',
].join('\n')

const PROFILE_CONTENT = [
  '$utf8 = [System.Text.UTF8Encoding]::new($false)',
  '[Console]::InputEncoding = $utf8',
  '[Console]::OutputEncoding = $utf8',
  '$OutputEncoding = $utf8',
].join('\n')

const TOOL_DIAGNOSIS = [
  '# 当前 PowerShell 7 窗口中执行',
  'Get-Command codex -ErrorAction SilentlyContinue | Format-List Name,Source,CommandType',
  'where.exe codex',
  '$env:ComSpec',
  '$env:Path -split ";" | Where-Object { $_ -match "PowerShell" }',
].join('\n')

const HANDOFF = [
  'Windows 工具调用排查结果：',
  '- 当前 shell：PowerShell 7 / pwsh.exe',
  '- PSVersion：<填入版本>',
  '- 编码测试：中文文本和 JSON 均能完整输出 / 仍失败',
  '- Agent 启动方式：<命令或宿主设置>',
  '- 524 是否只发生在本项目：<是 / 否>',
  '- 工作区状态：<git status 摘要>',
  '- 下一步：先检查 <shell / hook / 上游线路 / 服务端日志>',
].join('\n')

export default function CodexWindowsPowershell7TimeoutPage() {
  return (
    <DocPage
      path="/docs/guides/codex-windows-powershell7-timeout"
      title="Windows Codex 工具调用 524：切换 PowerShell 7 解决中文编码异常"
      description="Windows 上 Codex 调用工具时出现 Reconnecting、HTTP 524 或 responses stream finished without usable output 的排查与修复教程，重点说明 PowerShell 5.1、PowerShell 7、中文编码和流式输出之间的关系。"
      headings={[
        { id: 'conclusion', text: '先给结论', level: 2 },
        { id: 'symptom', text: '你看到的报错意味着什么', level: 2 },
        { id: 'root-cause', text: '为什么 PowerShell 5.1 可能触发问题', level: 2 },
        { id: 'prerequisites', text: '准备工作与定义完成', level: 2 },
        { id: 'shortest-path', text: '最快修复路径', level: 2 },
        { id: 'verify-shell', text: '确认当前到底是哪个 PowerShell', level: 2 },
        { id: 'install', text: '安装并进入 PowerShell 7', level: 2 },
        { id: 'encoding', text: '设置并验证 UTF-8 编码', level: 2 },
        { id: 'launch', text: '确保 Agent 真正从 pwsh.exe 启动', level: 2 },
        { id: 'diagnose', text: '如果仍然 524：分层排查', level: 2 },
        { id: 'recovery', text: '失败时的恢复策略', level: 2 },
        { id: 'mistakes', text: '常见误区', level: 2 },
        { id: 'checklist', text: '验收清单', level: 2 },
        { id: 'handoff', text: '可复用的故障交接模板', level: 2 },
        { id: 'references', text: '参考资料', level: 2 },
      ]}
    >
      <Callout tone="danger" title="先做这件事：不要继续在 PowerShell 5.1 中反复重试">
        <p>
          关闭当前卡在 <code>Reconnecting... 1/5</code> 的任务，打开 PowerShell 7，确认终端编码正常，再从这个新窗口启动 Codex。PowerShell 7 的命令名是 <code>pwsh.exe</code>，不是 Windows PowerShell 5.1 的 <code>powershell.exe</code>。
        </p>
      </Callout>

      <h2 id="conclusion">先给结论</h2>
      <p>
        在 Windows 上，如果 Codex 调用文件工具、命令工具或其他 Agent 工具时出现中文乱码、工具输出无法解析、持续重连，最后显示 HTTP 524，优先检查底层 shell 是否仍然是 PowerShell 5.1。一个实用的修复顺序是：
      </p>
      <ol>
        <li>停止当前重连循环，不要继续堆日志和重复请求。</li>
        <li>用 <code>$PSVersionTable</code> 确认当前 shell；看到 <code>powershell.exe</code> 或 <code>5.1</code> 时，切换到 <code>pwsh.exe</code>。</li>
        <li>在 PowerShell 7 中把输入、输出和原生命令编码统一为 UTF-8。</li>
        <li>用中文字符串和 JSON 做本地验证，确认输出没有被截断或改码。</li>
        <li>从这个 PowerShell 7 窗口重新启动 Codex，再做一次最小工具调用。</li>
      </ol>
      <p>
        这是一条基于 Windows shell、中文输出和流式工具调用现象的排查路径，不是“所有 524 都由 PowerShell 造成”的定论。若在全新、极短的 PowerShell 7 会话中仍然失败，需要继续检查 Agent hook、代理线路、上游服务和服务端日志。
      </p>

      <h2 id="symptom">你看到的报错意味着什么</h2>
      <CodeBlock lang="text" filename="terminal-output" code={SCREEN_ERROR} />
      <p>
        这里同时出现了三个信号：<code>Reconnecting</code> 表示客户端正在尝试恢复连接；<code>524</code> 表示请求经过的网关或边缘层没有在预期时间内获得可用的上游响应；<code>responses stream finished without usable output</code> 表示流式响应结束时，客户端没有拿到可以继续处理的有效输出。
      </p>
      <p>
        所以 524 只是最外层的网络错误表象，不能单凭状态码断定是网络、API Key 或模型本身。对 Agent 工具调用来说，底层命令只要没有按预期退出，或者 JSON / SSE 文本在 shell 与代理之间被截断、改码、混入额外输出，都可能让上游迟迟得不到可解析结果，最后在网关层显示超时或无可用输出。
      </p>
      <Callout tone="info" title="截图中的 URL 是重要线索">
        <p>
          如果错误信息同时打印了具体的 <code>url</code> 和 request id，请把它们保留下来。它们能帮助服务端区分“本地命令没有输出”“代理没有转发完整流”“上游模型没有返回”三种不同故障。公开反馈或提交工单时，先脱敏 API Key、项目路径和用户内容。
        </p>
      </Callout>

      <h2 id="root-cause">为什么 PowerShell 5.1 可能触发问题</h2>
      <p>
        Windows PowerShell 5.1 是 Windows 自带的旧版 PowerShell，常见启动命令是 <code>powershell.exe</code>；PowerShell 7 是单独安装的跨平台版本，启动命令是 <code>pwsh.exe</code>。两者不是同一个程序，也不会因为你安装了 PowerShell 7 就自动让所有宿主切换过去。
      </p>
      <p>
        旧 shell 与现代 Agent 工具之间容易出现兼容边界，尤其是以下输出同时存在时：
      </p>
      <ul>
        <li>中文文件名、中文错误信息或中文命令参数；</li>
        <li>工具通过标准输入输出传递 JSON、NDJSON 或 SSE 流；</li>
        <li>脚本调用原生程序，原生程序的编码与 PowerShell 的编码设置不一致；</li>
        <li>profile、代理脚本或 hook 在标准输出中额外打印欢迎语、调试信息或乱码；</li>
        <li>进程没有正常结束，客户端只能等待、重连，最后被网关判定为无可用响应。</li>
      </ul>
      <p>
        PowerShell 7 通常更适合作为这类工具链的默认 shell，但“安装完成”不等于“Codex 已经使用它”。必须分别验证版本、编码、启动入口和实际子进程。这个区分是本问题最容易被忽略的地方。
      </p>
      <Callout tone="warn" title="把事实、推断和建议分开">
        <p>
          可以确认的事实是：<code>powershell.exe</code> 通常代表 Windows PowerShell 5.1，<code>pwsh.exe</code> 代表 PowerShell 7；截图显示请求最后收到 524 且流没有可用输出。把两者连接成“PowerShell 5.1 的编码不兼容导致本次 524”，需要结合本机复现、切换 <code>pwsh.exe</code> 后恢复、以及服务端 request id 日志来验证。因此本文把 PowerShell 7 作为优先修复和隔离变量，而不是对每一个 524 做绝对归因。
        </p>
      </Callout>

      <h2 id="prerequisites">准备工作与定义完成</h2>
      <p>开始前准备以下信息：</p>
      <ul>
        <li>Windows Terminal 或可打开 PowerShell 的终端；</li>
        <li>项目目录和可运行的 <code>git</code>；</li>
        <li>PowerShell 7 安装权限，或能够使用用户级安装方式；</li>
        <li>出错时的时间、request id、模型名和脱敏后的终端截图。</li>
      </ul>
      <p>满足下面四项，就可以认为本次修复完成：</p>
      <ol>
        <li><code>pwsh --version</code> 返回 PowerShell 7.x。</li>
        <li>中文文本和包含中文的 JSON 能在当前窗口完整输出。</li>
        <li>Codex 是从 PowerShell 7 窗口启动，或宿主明确配置了 <code>C:\Program Files\PowerShell\7\pwsh.exe</code>。</li>
        <li>最小工具调用能够返回完整结果，不再出现乱码、无输出或持续重连。</li>
      </ol>

      <h2 id="shortest-path">最快修复路径</h2>
      <p>
        如果你只想先恢复工作，按下面的最短路径执行；后面的章节再解释每一步为什么有效。
      </p>
      <ol>
        <li>关闭卡在重连的 Agent 进程，保留现有工作区，不要删除项目目录。</li>
        <li>安装 PowerShell 7，并在新窗口执行 <code>pwsh</code>。</li>
        <li>在 PowerShell 7 中运行版本和 UTF-8 检查。</li>
        <li>进入项目目录，先执行 <code>git status --short</code>，再启动 Codex。</li>
        <li>让 Codex 先做一个最小的“列出当前目录 / 读取一个小文件”工具调用。</li>
        <li>最小调用成功后，再恢复原任务；不要一开始就重放完整长日志。</li>
      </ol>
      <p>
        如果第 3 步就失败，问题还在 shell 或编码层；如果第 5 步失败但本地编码测试成功，问题更可能在 Agent 的启动方式、hook、代理或上游线路。
      </p>

      <h2 id="verify-shell">确认当前到底是哪个 PowerShell</h2>
      <p>
        在出问题的同一个终端窗口运行下面的命令。不要只看窗口标题，也不要只凭“我已经安装过 PowerShell 7”来判断。
      </p>
      <CodeBlock lang="powershell" filename="check-shell.ps1" code={VERSION_CHECK} />
      <p>重点看以下结果：</p>
      <ul>
        <li><code>PSEdition</code> 为 <code>Core</code>、版本为 7.x，说明当前是 PowerShell 7。</li>
        <li><code>PSEdition</code> 为 <code>Desktop</code>、版本为 5.1，说明当前仍是 Windows PowerShell。</li>
        <li>命令路径中出现 <code>powershell.exe</code>，不要把它当成 PowerShell 7。</li>
        <li>命令路径中出现 <code>pwsh.exe</code>，才说明该命令入口是 PowerShell 7。</li>
      </ul>
      <p>
        也可以直接执行 <code>$PSHOME</code> 查看当前 PowerShell 的安装目录。PowerShell 7 通常位于 <code>C:\Program Files\PowerShell\7</code>，但实际路径可能因安装方式、版本或用户权限不同而变化，最终以 <code>(Get-Command pwsh).Source</code> 为准。
      </p>

      <h2 id="install">安装并进入 PowerShell 7</h2>
      <p>
        官方推荐的安装方式可以使用 Windows 包管理器。下面的命令只负责安装，不会删除 Windows PowerShell 5.1；两者可以并存。
      </p>
      <CodeBlock lang="powershell" filename="install-powershell-7.ps1" code={INSTALL} />
      <p>
        安装后必须新开一个终端窗口，或者在当前窗口执行 <code>pwsh</code> 进入 PowerShell 7。然后再次运行 <code>$PSVersionTable.PSVersion</code> 和 <code>$PSVersionTable.PSEdition</code>，确认已经切换成功。
      </p>
      <p>
        如果系统没有 <code>winget</code>，可以从{' '}
        <a href="https://learn.microsoft.com/powershell/scripting/install/install-powershell-on-windows" target="_blank" rel="noreferrer">
          Microsoft Learn 的 Windows 安装说明
        </a>{' '}
        选择 MSI 或其他官方安装方式。安装方式可以不同，但最终需要能够执行 <code>pwsh.exe</code>。
      </p>

      <h2 id="encoding">设置并验证 UTF-8 编码</h2>
      <p>
        在 PowerShell 7 窗口里先执行一次下面的设置，再做中文和 JSON 输出测试。它只影响当前会话，适合先隔离问题。
      </p>
      <CodeBlock lang="powershell" filename="check-utf8.ps1" code={UTF8_CHECK} />
      <p>
        验证时不要只看屏幕上“看起来正常”。如果 Agent 或代理消费的是标准输出，还要确认输出中没有额外的 profile 欢迎语、调试行或颜色控制字符。对于 JSON，应该能拿到一整行可解析的对象，而不是半截内容或乱码。
      </p>
      <p>
        如果每次打开 PowerShell 7 都需要设置，可以把四行编码配置写进当前用户的 PowerShell 7 profile。先创建 profile 文件：
      </p>
      <CodeBlock lang="powershell" filename="create-profile.ps1" code={PROFILE_SETUP} />
      <p>然后把下面内容放入打开的 profile 文件：</p>
      <CodeBlock lang="powershell" filename="$PROFILE" code={PROFILE_CONTENT} />
      <Callout tone="warn" title="不要让 profile 污染工具协议">
        <p>
          profile 适合设置编码、别名和环境变量，不要在里面默认执行 <code>Write-Host</code>、打印欢迎语或输出 JSON 之外的调试文本。如果某个工具依赖标准输出传输协议，额外的一行文字就可能破坏解析。必要时可以用 <code>pwsh -NoProfile</code> 做对照测试。
        </p>
      </Callout>
      <p>
        更完整的编码背景可参考{' '}
        <a href="https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_character_encoding" target="_blank" rel="noreferrer">
          Microsoft Learn：about_Character_Encoding
        </a>。不同版本、原生命令和宿主对编码的处理存在差异，所以要以实际的中文和 JSON 测试结果为准。
      </p>

      <h2 id="launch">确保 Agent 真正从 pwsh.exe 启动</h2>
      <p>
        仅仅在系统里安装 PowerShell 7，不能保证 Codex 使用它。最容易验证的方式是：在一个已经确认 <code>PSEdition=Core</code> 的 PowerShell 7 窗口中进入项目目录，再启动 Agent。
      </p>
      <CodeBlock lang="powershell" filename="launch-from-pwsh.ps1" code={LAUNCH_FROM_PWSH} />
      <p>
        如果你使用的是桌面宿主、IDE 插件或其他启动器，不要根据界面名称猜测 shell。检查它是否提供 shell executable、terminal profile 或 command runner 配置；如果支持，明确填写 <code>pwsh.exe</code> 的绝对路径。不同宿主的设置名称和位置可能不同，本文不假设一个统一的 UI。
      </p>
      <p>
        在启动 Agent 后，还可以从 PowerShell 7 检查命令解析和 PATH：
      </p>
      <CodeBlock lang="powershell" filename="check-agent-path.ps1" code={TOOL_DIAGNOSIS} />
      <p>
        这里的目标是确认两件事：Agent 命令来自你预期的安装位置，以及启动它的窗口确实是 <code>pwsh.exe</code>。如果 Codex Desktop 自己管理子进程，外部窗口启动方式可能无法改变它的内部 shell，这时应以该宿主支持的配置为准。
      </p>

      <h2 id="diagnose">如果仍然 524：分层排查</h2>
      <p>PowerShell 7 仍失败时，按下面的顺序隔离变量，不要同时修改多个配置：</p>
      <div className="not-prose my-6 overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead className="bg-white/[0.04] text-[11px] uppercase tracking-wider text-ink-400">
            <tr>
              <th className="px-4 py-3 font-medium">现象</th>
              <th className="px-4 py-3 font-medium">优先检查</th>
              <th className="px-4 py-3 font-medium">下一步</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-white/10 align-top">
              <td className="px-4 py-3 text-ink-200">中文测试就乱码或 JSON 不完整</td>
              <td className="px-4 py-3 text-ink-200">当前 shell、profile、Console 编码</td>
              <td className="px-4 py-3 text-ink-200">使用 <code>pwsh -NoProfile</code> 重测，修复编码后再启动 Agent</td>
            </tr>
            <tr className="border-t border-white/10 bg-white/[0.02] align-top">
              <td className="px-4 py-3 text-ink-200">中文测试正常，最小工具调用失败</td>
              <td className="px-4 py-3 text-ink-200">Agent 启动器、hook、MCP 或插件子进程</td>
              <td className="px-4 py-3 text-ink-200">关闭非必要 hook，用最小工具调用逐个恢复</td>
            </tr>
            <tr className="border-t border-white/10 align-top">
              <td className="px-4 py-3 text-ink-200">只有一个项目失败</td>
              <td className="px-4 py-3 text-ink-200">项目脚本、环境变量、路径和依赖</td>
              <td className="px-4 py-3 text-ink-200">换空目录或最小项目做对照，再比较项目配置</td>
            </tr>
            <tr className="border-t border-white/10 bg-white/[0.02] align-top">
              <td className="px-4 py-3 text-ink-200">所有项目都失败，且短请求也 524</td>
              <td className="px-4 py-3 text-ink-200">代理线路、上游服务、模型可用性</td>
              <td className="px-4 py-3 text-ink-200">记录时间、request id、URL、模型和脱敏日志，联系服务端排查</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        如果可以执行普通 HTTP 请求，建议先验证最小请求，再验证流式请求，最后再验证工具调用。三者不要混在一次长任务里：普通请求失败说明线路或认证还没通；普通请求成功而流式失败，重点检查流代理和输出处理；流式成功而工具失败，重点检查 shell、hook、MCP 和子进程。
      </p>
      <Callout tone="info" title="524 的服务端排查信息">
        <p>
          提交问题时提供 request id、发生时间、请求 URL、模型 ID、是否流式、是否启用工具调用，以及“PowerShell 5.1 失败 / PowerShell 7 成功或仍失败”的对照结果。不要提交完整 API Key、Authorization header、用户代码或未脱敏的环境变量。
        </p>
      </Callout>

      <h2 id="recovery">失败时的恢复策略</h2>
      <h3>1. 先保存工作区状态</h3>
      <p>
        Agent 卡住不代表已经回滚了文件。先停止重连，再在 PowerShell 7 中确认代码是否已经落盘：
      </p>
      <CodeBlock
        lang="powershell"
        filename="check-worktree.ps1"
        code={['Set-Location C:\\path\\to\\your\\project', 'git status --short', 'git diff --stat', 'git diff --name-only'].join('\n')}
      />
      <p>
        会话恢复、shell 切换和 Git 回滚是三个不同动作。不要因为工具调用失败，就直接删除工作区或执行破坏性 Git 命令。
      </p>
      <h3>2. 从最小任务重新验证</h3>
      <p>不要立刻重放原来的大任务。先让 Agent 完成以下一个动作：</p>
      <ul>
        <li>列出当前目录一级文件；</li>
        <li>读取一个不超过几十行的文本文件；</li>
        <li>执行一个不产生大段输出的版本命令；</li>
        <li>写入一个临时文件，再读取并删除它。</li>
      </ul>
      <p>每一步都要确认“命令退出、输出完整、中文可读、文件状态正确”后再进入下一步。</p>
      <h3>3. 仍失败时切换到无 profile 对照</h3>
      <p>
        如果你怀疑 profile、别名或自动加载脚本，打开一个干净的 PowerShell 7 进程：
      </p>
      <CodeBlock lang="powershell" filename="clean-pwsh.ps1" code="pwsh -NoLogo -NoProfile" />
      <p>
        在这个干净窗口再次设置 UTF-8、进入项目并启动 Agent。若无 profile 成功，说明问题在 profile、启动脚本或环境变量；若仍失败，继续检查 Agent、代理和上游。
      </p>

      <h2 id="mistakes">常见误区</h2>
      <ol>
        <li>
          <strong>只执行 <code>chcp 65001</code> 就认为问题解决。</strong>代码页只是一个变量，PowerShell、原生命令、Console 编码、标准输入输出和 Agent 协议仍可能不一致；必须用真实中文和 JSON 输出验证。
        </li>
        <li>
          <strong>装了 PowerShell 7，却仍从 <code>powershell.exe</code> 启动。</strong>安装不会替换 Windows PowerShell 5.1，命令入口必须确认是 <code>pwsh.exe</code>。
        </li>
        <li>
          <strong>把 524 直接当成 API Key 错误。</strong>认证问题更常见于 401 / 403；524 更像网关未获得及时的可用上游响应，但仍需结合完整错误和 request id 判断。
        </li>
        <li>
          <strong>不断按重连或重复执行同一个工具。</strong>如果进程被编码、hook 或协议输出卡住，重复重试只会增加请求和日志，不会修复根因。
        </li>
        <li>
          <strong>profile 中打印调试信息。</strong>Agent 如果解析标准输出，欢迎语、调试日志和颜色控制字符都可能污染工具协议。
        </li>
        <li>
          <strong>把切换 shell 当成回滚代码。</strong>shell 只改变命令执行环境；已修改的代码仍然以文件和 <code>git status</code> 为准。
        </li>
      </ol>

      <h2 id="checklist">验收清单</h2>
      <p>完成修复后，逐项确认：</p>
      <ul>
        <li><code>$PSVersionTable.PSEdition</code> 返回 <code>Core</code>。</li>
        <li><code>$PSVersionTable.PSVersion</code> 返回 7.x，而不是 5.1。</li>
        <li><code>(Get-Command pwsh).Source</code> 能解析到实际的 <code>pwsh.exe</code>。</li>
        <li>中文字符串在终端中完整显示，没有问号、乱码或截断。</li>
        <li>包含中文的 JSON 能作为一条完整输出被读取。</li>
        <li>profile 没有向标准输出写入无关文本；必要时已用 <code>-NoProfile</code> 对照。</li>
        <li>Codex 的实际启动方式已经确认，不只是系统 PATH 看起来正确。</li>
        <li>最小工具调用成功后，才恢复原来的长任务。</li>
        <li>如果仍然 524，已记录 request id、时间、URL、模型和对照结果，并提交给线路或服务端维护者。</li>
      </ul>

      <h2 id="handoff">可复用的故障交接模板</h2>
      <p>
        需要在新会话、工单或团队群里继续排查时，使用短交接信息，不要粘贴完整历史：
      </p>
      <CodeBlock lang="text" filename="windows-tool-timeout-handoff.txt" code={HANDOFF} />
      <p>
        这个模板的重点是保留可比较的事实：失败时的 shell、成功或失败的 UTF-8 测试、Agent 的真实启动方式，以及问题是否只发生在一个项目。它比“Windows 调工具报 524”更容易让下一位维护者快速定位边界。
      </p>

      <h2 id="references">参考资料</h2>
      <ul>
        <li>
          <a href="https://learn.microsoft.com/powershell/scripting/install/install-powershell-on-windows" target="_blank" rel="noreferrer">
            Microsoft Learn：在 Windows 上安装 PowerShell
          </a>
        </li>
        <li>
          <a href="https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_character_encoding" target="_blank" rel="noreferrer">
            Microsoft Learn：about_Character_Encoding
          </a>
        </li>
        <li>
          <Link to="/docs/guides/codex-tool-recovery/">站内：Codex 工具不可调用时的恢复教程</Link>
        </li>
        <li>
          <Link to="/docs/integrations/dev/codex-cli/">站内：Codex CLI 集成</Link>
        </li>
      </ul>
      <Callout tone="tip" title="推荐的长期做法">
        <p>
          把 PowerShell 7、UTF-8 输出、最小工具调用和 <code>git status</code> 检查固定成 Windows Agent 的启动前检查。遇到 524 时先复现最小任务，再决定是修 shell、修项目 hook，还是联系上游，不要让重连循环代替诊断。
        </p>
      </Callout>
    </DocPage>
  )
}
