import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'

const ERROR = "Error during compaction: API Error: 400 Input exceeds the model's context window."

const TERMINAL_RESUME = [
  '# 在当前项目目录启动 Claude Code',
  'cd /path/to/your/project',
  '',
  '# 打开历史会话选择器，选择出问题的会话',
  'claude --resume',
].join('\n')

const IN_SESSION_RESUME = '/resume'

const HANDOFF = [
  '任务：继续处理某个具体功能',
  '',
  '已经完成：',
  '- 修改了哪些文件',
  '- 已经通过哪些检查',
  '',
  '当前状态：',
  '- 现在正在处理什么',
  '- 哪个问题还没有解决',
  '',
  '下一步：',
  '- 只列出接下来最重要的 1 到 3 个动作',
  '',
  '约束：',
  '- 不要改动哪些文件',
  '- 必须运行哪些验证命令',
].join('\n')

const DIAGNOSIS = [
  '1. 查看上下文占用',
  '   /context',
  '',
  '2. 如果已经接近上限，不要继续粘贴大段日志或完整文件',
  '',
  '3. 在历史会话中选择更早的安全位置',
  '   /resume -> 选择会话 -> Fork / Branch',
  '',
  '4. 在新分支中重新压缩',
  '   /compact',
  '',
  '5. 压缩成功后，再恢复当前任务，并优先读取文件状态而不是重复读取全部历史',
].join('\n')

export default function ClaudeCodeCompactionErrorPage() {
  return (
    <DocPage
      path="/docs/guides/claude-code-compaction-error"
      title="Claude Code compaction 失败：Input exceeds the model's context window"
      description="Claude Code 执行 /compact 时遇到 400 上下文超限错误的原因、最快恢复方法，以及从历史会话较早位置 Fork / Branch 后重新压缩的完整流程。"
      headings={[
        { id: 'summary', text: '先给结论', level: 2 },
        { id: 'error', text: '报错是什么意思', level: 2 },
        { id: 'why', text: '为什么 /compact 也会失败', level: 2 },
        { id: 'recovery', text: '最快恢复流程', level: 2 },
        { id: 'fork-point', text: '为什么要从较早位置 Fork', level: 2 },
        { id: 'after-compact', text: '压缩成功后怎么继续', level: 2 },
        { id: 'fallback', text: 'Fork 后仍然失败怎么办', level: 2 },
        { id: 'prevention', text: '如何减少再次超限', level: 2 },
        { id: 'faq', text: '常见问题', level: 2 },
        { id: 'references', text: '官方参考', level: 2 },
      ]}
    >
      <Callout tone="danger" title="推荐先做这一件事">
        <p>
          不要在同一个已经超大的会话里反复执行 <code>/compact</code>。打开历史会话，回到上下文还没有膨胀的较早位置，创建一个新的 Fork / Branch，会话切换完成后再执行 <code>/compact</code>。
        </p>
      </Callout>

      <h2 id="summary">先给结论</h2>
      <p>
        这个错误的有效解决方案不是重新发送同一条指令，也通常不是重新登录 API。最稳妥的恢复路径是：
        <strong>从历史会话中找到一个更早的、上下文较小的节点，Fork 或 Branch 出一个新会话，再在新会话里执行 <code>/compact</code>。</strong>
      </p>
      <p>
        关键点在“较早的位置”。如果你从历史会话的最后一条消息创建分支，新分支很可能仍然继承那一大段超长历史，继续压缩时还会失败。真正起作用的是减少需要送入压缩请求的历史长度，而不是 Fork 这个词本身。
      </p>

      <h2 id="error">报错是什么意思</h2>
      <CodeBlock lang="text" filename="error" code={ERROR} />
      <p>
        这是一条 HTTP 400 请求错误。服务端收到了 Claude Code 发起的请求，但判断请求输入已经超过当前模型允许的上下文窗口。这里的 <code>Input</code> 指请求输入内容，不是 API Key，也不是你的某一行代码语法。
      </p>
      <p>
        <code>compaction</code> 的目标是把当前对话压缩成更短的摘要，从而为后续任务释放上下文空间。但如果原会话已经积累了大量对话、工具调用、文件内容、补丁、命令输出或错误日志，压缩请求本身仍然可能需要携带过多历史。于是就出现“正在压缩，但压缩请求先超限”的情况。
      </p>
      <Callout tone="info" title="把问题分成两层判断">
        <p>
          如果从较早位置 Fork 后 <code>/compact</code> 成功，说明主要问题是原会话历史太长。若在明显更早的位置仍然失败，再检查模型路由、代理的上下文限制、请求配置和 Claude Code 版本兼容性。
        </p>
      </Callout>

      <h2 id="why">为什么 <code>/compact</code> 也会失败</h2>
      <p>
        很多人会疑惑：<code>/compact</code> 明明是用来减少上下文的，为什么它自己还会触发上下文超限？可以把流程理解成下面这样：
      </p>
      <ol>
        <li>Claude Code 收集当前会话中需要保留的历史。</li>
        <li>它把这部分历史和压缩指令一起发送给模型。</li>
        <li>模型先要接收这次请求，才有机会生成摘要。</li>
        <li>如果发送前的输入已经超过模型窗口，模型根本无法开始生成摘要。</li>
      </ol>
      <p>
        因此，继续在原会话里执行 <code>/compact</code>，或在失败后马上粘贴更多日志，通常只会让输入更大。Fork 到较早节点相当于先在会话历史层面减负，再让压缩动作执行。
      </p>

      <h2 id="recovery">最快恢复流程</h2>
      <p>
        下面的流程适合“任务本身还要继续，但当前会话已经太长”的情况。先保存当前工作区状态，再操作会话；会话 Fork / Branch 通常只改变对话分支，不等于回滚 Git 工作区。
      </p>
      <h3>第 1 步：停止继续堆上下文</h3>
      <ul>
        <li>不要重复发送原问题。</li>
        <li>不要把完整日志、完整文件或同一份错误截图再次粘贴进去。</li>
        <li>不要在原会话里连续尝试很多次 <code>/compact</code>。</li>
      </ul>

      <h3>第 2 步：确认文件状态</h3>
      <p>
        如果 Claude Code 已经改过代码，先在终端检查当前工作区，避免把“对话分支”误解为“代码分支”：
      </p>
      <CodeBlock
        lang="shell"
        filename="check-worktree"
        code={['git status --short', 'git diff --stat', 'git diff --name-only'].join('\n')}
      />
      <p>
        这些命令只是确认修改是否已经落盘。是否提交、是否创建 Git branch，应按项目自己的发布流程决定，不要把它和 Claude Code 的会话 Branch 混为一谈。
      </p>

      <h3>第 3 步：从历史会话选择较早节点</h3>
      <p>
        在项目目录中重新打开历史会话选择器：
      </p>
      <CodeBlock lang="shell" filename="resume-from-terminal" code={TERMINAL_RESUME} />
      <p>
        如果 Claude Code 已经在运行，也可以直接在会话内输入：
      </p>
      <CodeBlock lang="text" filename="resume-in-session" code={IN_SESSION_RESUME} />
      <p>
        进入历史会话后，找到一个“任务背景已经明确，但大量工具输出还没有产生”的位置。常见的好位置包括：任务目标和文件范围已经确认之后、第一次大规模搜索之前，或某个阶段任务刚完成并且结果已经被确认之后。
      </p>

      <h3>第 4 步：创建 Fork / Branch</h3>
      <p>
        在这个较早位置选择界面中的 <strong>Fork</strong> 或 <strong>Branch</strong>。不同版本、终端集成和宿主界面的叫法可能不同，但判断标准只有一个：新会话应当从这个较早位置继承，而不是从超限会话的最后一条消息继续。
      </p>
      <Callout tone="warn" title="当前版本的命令名称可能不同">
        <p>
          Anthropic 当前命令文档把“复制当前对话并切换到新分支”写作 <code>/branch</code>；当前 <code>/fork &lt;directive&gt;</code> 主要用于启动一个继承完整对话的后台 forked subagent。较早版本曾把 <code>/fork</code> 作为 <code>/branch</code> 的别名。若你的界面直接显示 Fork，按界面操作即可；若使用命令行，优先查看当前版本的命令说明。
        </p>
      </Callout>

      <h3>第 5 步：在新会话执行压缩</h3>
      <p>
        确认提示符已经进入新分支后，再执行：
      </p>
      <CodeBlock lang="text" filename="new-branch" code="/compact" />
      <p>
        如果压缩成功，先让 Claude Code 用几句话确认任务目标、已完成修改、当前阻塞点和下一步，不要马上把整段历史重新补回来。这样可以验证新摘要是否保留了真正需要的上下文。
      </p>

      <h2 id="fork-point">为什么要从较早位置 Fork</h2>
      <p>
        Fork 的价值不是“换一个窗口”或“重试一次请求”，而是建立一条更短的会话历史。可以用下面的关系理解：
      </p>
      <ul>
        <li><strong>从最后位置 Fork：</strong>大部分超长历史仍然存在，压缩请求仍可能超限。</li>
        <li><strong>从较早位置 Fork：</strong>直接丢掉后面不断增长的工具输出和重复讨论，再在较短历史上生成摘要。</li>
        <li><strong>新建空会话：</strong>上下文最小，但需要你手动提供任务交接信息，适合原会话已经无法恢复的情况。</li>
      </ul>
      <p>
        选择节点时，不必追求“越早越好”。太早会丢失任务约束、已经确认的文件范围和关键决定；太晚又可能带着大量无关输出。通常选择“目标明确、关键决定已完成、长日志尚未出现”的位置最合适。
      </p>

      <h2 id="after-compact">压缩成功后怎么继续</h2>
      <p>
        压缩完成后，建议用一个短确认代替重新讲完整背景。可以直接发送：
      </p>
      <CodeBlock
        lang="text"
        filename="resume-prompt"
        code={[
          '请先用 5 条以内确认：',
          '1. 当前任务目标',
          '2. 已经完成的修改',
          '3. 当前工作区中最重要的文件',
          '4. 尚未解决的问题',
          '5. 下一步最小动作',
          '',
          '确认后再继续执行，不要重复读取已经确认过的全部历史。',
        ].join('\n')}
      />
      <p>
        如果摘要遗漏了某个关键决定，只补这一项，不要把整个原会话复制回来。需要恢复的内容可以来自代码、Git diff、测试结果、项目里的 worklog，或一段短的交接说明。
      </p>

      <h2 id="fallback">Fork 后仍然失败怎么办</h2>
      <p>
        按下面的顺序处理，先区分“历史仍然太长”和“模型或路由限制不匹配”：
      </p>
      <CodeBlock lang="text" filename="diagnosis" code={DIAGNOSIS} />
      <ol>
        <li><strong>再往前 Fork：</strong>如果只是新分支仍然太长，回到更早的节点重新分支。</li>
        <li><strong>使用 <code>/clear</code>：</strong>如果当前任务边界已经变化，或者原会话内容大部分都不再需要，可以开始一个空会话，再用短交接说明恢复工作。</li>
        <li><strong>检查上下文填充来源：</strong>用 <code>/context</code> 看哪些内容占用了窗口，重点关注超大的工具输出、MCP 返回值、完整日志、图片或重复读取的文件。</li>
        <li><strong>检查模型路由：</strong>如果在非常短的新会话中仍然报同样的错误，检查当前模型是否真的支持预期上下文长度，以及中转服务是否把模型路由到了更小窗口的后端。</li>
        <li><strong>检查版本和配置：</strong>确认 Claude Code、代理层和模型参数兼容；这一步不能靠重复压缩解决。</li>
      </ol>
      <p>
        必须注意：<code>/clear</code> 会开始一个空上下文，会话仍可以通过 <code>/resume</code> 找回，但它不会自动把原任务的所有背景搬到新会话。使用它之前，最好先写下一个短交接说明。
      </p>
      <CodeBlock lang="text" filename="handoff" code={HANDOFF} />

      <h2 id="prevention">如何减少再次超限</h2>
      <ul>
        <li><strong>按阶段切会话：</strong>探索、实现、测试、发布不必全部塞在一个会话里。</li>
        <li><strong>让输出变小：</strong>读取文件时优先指定范围，查看日志时优先使用 <code>tail</code>、过滤和摘要，不要反复输出完整文件。</li>
        <li><strong>在长任务中主动压缩：</strong>看到上下文明显增长时，在仍然可压缩的阶段执行 <code>/compact</code>，不要等到已经失败。</li>
        <li><strong>保存可恢复信息：</strong>把关键决定、已完成项、测试结果和下一步写进项目 worklog 或交接文件。</li>
        <li><strong>限制工具输出：</strong>对测试、构建、搜索和 MCP 查询设置合理范围，先看摘要，需要时再展开具体片段。</li>
        <li><strong>减少重复讨论：</strong>已经确认的路径、模型、约束和方案不需要每一轮重新粘贴。</li>
      </ul>
      <Callout tone="tip" title="推荐的长任务节奏">
        <p>
          一个实用节奏是：完成一个阶段后先保存工作区和交接信息，再压缩会话；如果压缩失败，就从最后一个已确认阶段的较早位置 Fork，而不是继续往失败会话里追加内容。
        </p>
      </Callout>

      <h2 id="faq">常见问题</h2>
      <h3>这是不是 API Key 无效？</h3>
      <p>
        通常不是。Key 无效更常见的是 401 或认证相关错误；这里的 400 明确指出输入超过模型上下文窗口。不过，如果在全新短会话里也持续出现同一错误，仍要检查代理和模型路由是否配置错误。
      </p>

      <h3>直接重启 Claude Code 可以吗？</h3>
      <p>
        可以重启，但单纯重启进程不一定减少已保存的会话历史。重启后如果继续原会话，仍可能携带同样的超长输入；应该配合 <code>--resume</code> / <code>/resume</code> 选择历史会话，再从较早位置 Fork / Branch。
      </p>

      <h3>Fork 会不会删除原会话？</h3>
      <p>
        正常的会话分支会保留原会话，新分支从选定位置继续。不要把它和删除历史、清空工作区或回滚 Git 修改混为一谈。涉及代码是否落盘，始终以 <code>git status</code> 和实际文件为准。
      </p>

      <h3>为什么我 Fork 了还是超限？</h3>
      <p>
        最常见原因是分支点太晚，仍然继承了绝大多数长历史；其次是 Fork 后又把完整日志和文件重新贴回去。再往前选择一个节点，或直接用 <code>/clear</code> 加短交接说明启动新会话。
      </p>

      <h2 id="references">官方参考</h2>
      <ul>
        <li>
          <a href="https://code.claude.com/docs/en/commands" target="_blank" rel="noreferrer">
            Claude Code Commands
          </a>
          {' '}— 查看 <code>/compact</code>、<code>/context</code>、<code>/resume</code>、<code>/branch</code> 和 <code>/fork</code> 的当前命令定义。
        </li>
        <li>
          <a href="https://code.claude.com/docs/en/sessions" target="_blank" rel="noreferrer">
            Manage sessions
          </a>
          {' '}— 了解会话恢复、命名、分支和历史记录管理。
        </li>
        <li>
          <a href="https://code.claude.com/docs/en/context-window" target="_blank" rel="noreferrer">
            Context window
          </a>
          {' '}— 了解上下文窗口、压缩后保留的内容和上下文占用来源。
        </li>
      </ul>

      <h2>延伸阅读</h2>
      <ul>
        <li>
          <Link to="/docs/integrations/dev/claude-code/">Claude Code 接入 gpt88.cc</Link>
          {' '}— 如果问题同时涉及 API Key、OAuth、模型路由或插件能力，可以从接入方式开始排查。
        </li>
        <li>
          <Link to="/docs/guides/codex-tool-recovery/">Codex 工具恢复</Link>
          {' '}— 如果实际问题是文件工具或编辑工具不可调用，而不是上下文超限，可以参考另一套恢复流程。
        </li>
      </ul>
    </DocPage>
  )
}
