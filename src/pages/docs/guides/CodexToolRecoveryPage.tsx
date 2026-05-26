import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { CodeBlock } from '../../../components/ui/CodeBlock'
import { Callout } from '../../../components/ui/Callout'

const SYMPTOM = `你正在让 Codex 落代码，过程中突然出现这些现象：

1. 文件工具、写文件工具、apply patch、编辑工具不可调用
2. Codex 还在回答，但不能真正把代码写进仓库
3. 之前已经规划好的改动被迫中断
4. 重新发指令后，工具状态仍然异常
5. 你怀疑是模型坏了，但实际上大概率不是模型问题`

const FIRST_CHECK = `先让 Codex 做一个明确检查：

1. 确认当前会话是否还能调用文件工具
2. 让 Codex 复述它此刻可用的工具列表
3. 如果文件工具不可用，先停止继续设计新方案
4. 不要继续堆新的需求，不要让模型“口头完成”代码
5. 等工具恢复后，直接回到第一步，从头落代码`

const RECOVERY_PROMPT = `Codex，现在先检查你当前会话里文件工具是否可用。

如果文件工具可用：
1. 直接从第 1 步开始重新落代码
2. 不要跳过已有的修改步骤
3. 不要假设之前的草稿已经写进仓库
4. 按当前任务重新执行编辑、验证、保存

如果文件工具不可用：
1. 明确告诉我当前哪些工具不可用
2. 暂停继续推理新的实现
3. 等工具恢复后，再从第 1 步重做

注意：这不是模型能力问题，而是工具链状态问题。`

const WORKFLOW = `推荐恢复流程：

1. 先确认工具状态，而不是先改需求
2. 如果文件工具可用，立刻回到最初的编辑步骤
3. 如果文件工具暂时失效，停止输出新的代码方案
4. 工具恢复后，不要接着上一次的中间步骤继续猜
5. 直接从第一步开始重新落代码、重新验证、重新保存`

const CHECKLIST = `排查清单：

1. 有没有文件写入能力
2. 有没有 apply patch / 编辑能力
3. 当前会话是否卡在只读状态
4. 之前的修改有没有真正保存到文件
5. 工具恢复后是否需要重跑完整流程
6. 是否已经把问题误判成模型故障`

export default function CodexToolRecoveryPage() {
  return (
    <DocPage
      path="/docs/guides/codex-tool-recovery"
      title="Codex 工具不可调用时的恢复教程"
      description="当 Codex 执行过程中突然出现工具不可调用、代码不能落地时，先检查文件工具是否可用；工具恢复后，直接从第一步重新落代码。"
      headings={[
        { id: 'symptom', text: '问题现象', level: 2 },
        { id: 'first-check', text: '先检查什么', level: 2 },
        { id: 'prompt', text: '可直接复制给 Codex 的提示词', level: 2 },
        { id: 'workflow', text: '恢复后的执行流程', level: 2 },
        { id: 'checklist', text: '排查清单', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="warn" title="先把问题定性清楚">
        <p>
          这类故障通常不是模型能力下降，而是 <strong>工具链状态异常</strong>：
          文件工具、编辑工具、补丁工具或会话权限失效，导致 Codex 只能说，不能写。
        </p>
      </Callout>

      <h2 id="symptom">问题现象</h2>
      <p>
        Codex 在执行过程中突然无法调用工具时，最常见的表象就是“回答正常，但代码落不下去”。
        这意味着模型还在输出文本，但本地文件层已经断了。
      </p>
      <CodeBlock lang="text" filename="symptom" code={SYMPTOM} />

      <h2 id="first-check">先检查什么</h2>
      <p>
        不要一上来就怀疑模型。第一步应该是确认当前会话里的文件工具是否还能用，
        以及它还能识别哪些操作。
      </p>
      <CodeBlock lang="text" filename="first-check" code={FIRST_CHECK} />
      <p>
        如果工具链已经失效，继续让 Codex 规划细节没有意义。先停下来，等工具恢复，
        再重新开始。
      </p>

      <h2 id="prompt">可直接复制给 Codex 的提示词</h2>
      <p>
        下面这段话的目标很明确：先做工具检查，再决定是否继续。工具恢复后，
        让 Codex 从第一步开始重新落代码，不要接着上一次的残缺状态往下写。
      </p>
      <CodeBlock lang="text" filename="prompt" code={RECOVERY_PROMPT} />

      <h2 id="workflow">恢复后的执行流程</h2>
      <ul>
        <li>先确认文件工具可用，再继续任务。</li>
        <li>工具恢复后，直接从第一步重新执行，不要跳过编辑步骤。</li>
        <li>不要假设中断前的草稿已经生效，必须重新落盘、重新验证。</li>
        <li>如果仍然不稳定，先暂停新增需求，只保留恢复与重试动作。</li>
        <li>不要把这个问题解释成模型不行，优先判断工具链。</li>
      </ul>
      <CodeBlock lang="text" filename="recovery-flow" code={WORKFLOW} />

      <h2 id="checklist">排查清单</h2>
      <CodeBlock lang="text" filename="checklist" code={CHECKLIST} />

      <h2 id="next">下一步</h2>
      <ul>
        <li>
          如果你正在处理 Codex 登录或插件问题，可以看{' '}
          <Link to="/docs/guides/codex-plugins-oauth">Codex 插件 OAuth 登录</Link>。
        </li>
        <li>
          如果你需要让 Codex 生成真实图片文件，可以看{' '}
          <Link to="/docs/guides/codex-gpt-image-2-skill">Codex gpt-image-2 Skill</Link>。
        </li>
      </ul>
    </DocPage>
  )
}
