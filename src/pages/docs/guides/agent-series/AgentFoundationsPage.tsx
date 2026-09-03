import { Link } from 'react-router-dom'
import { Callout } from '../../../../components/ui/Callout'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { DocPage } from '../../../../components/layout/DocPage'
import { GuideTable, Checklist, SeriesNav } from './AgentGuideShared'
import { headings, toHeadings } from './AgentGuideData'

const LOOP = 'while not finished and steps < max_steps:\n    decision = model(messages, tools, state)\n    if decision requests a tool:\n        validate(decision.tool, decision.arguments)\n        result = execute(decision.tool, decision.arguments)\n        state = reduce(state, decision, result)\n        messages.append(tool_result(result))\n    else:\n        answer = validate_output(decision.content)\n        return deliver(answer)\nraise StepLimitExceeded()'

export default function AgentFoundationsPage() {
  return <DocPage path="/docs/guides/agent-foundations" title="AI Agent 求职专题（二）：Agent 基础、架构与工作流设计" description="从 LLM、上下文、工具、状态和验证出发，建立能够解释、实现和排错 Agent 的统一心智模型。" headings={toHeadings(headings.foundations)}>
    <SeriesNav current="/docs/guides/agent-foundations/" />
    <Callout tone="tip" title="面试中的高分定义"><p>Agent 是一个以模型为推理核心、以工具和外部系统为行动边界、以状态和工作流为控制结构、以验证和权限为安全约束的任务执行系统。</p></Callout>
    <h2 id="definition">Agent 到底是什么</h2>
    <p>普通 LLM 调用通常是输入上下文后得到输出。Agent 则把输出放进闭环：模型判断下一步、请求工具、读取结果、更新任务状态，并在达到停止条件后交付结果。</p>
    <GuideTable headers={['形态', '输入', '核心动作', '适合场景']} rows={[
      ['普通对话', '用户问题', '一次生成回复', '问答、写作、摘要'],
      ['RAG 应用', '问题 + 检索上下文', '检索后生成', '知识问答、文档助手'],
      ['固定 Workflow', '结构化任务', '按代码节点执行', '审批、报表、同步'],
      ['单 Agent', '自然语言目标', '动态选择工具并循环', '路径不完全确定'],
      ['多 Agent', '复杂目标', '多个专业角色协作', '分工、复核、并行'],
    ]} />
    <p>Agent 不是 Workflow 的替代品。流程越确定、风险越高、审计越强，就越应该由代码控制边界；模型负责模糊输入和局部判断。</p>
    <h2 id="architecture">参考架构</h2>
    <pre className="not-prose overflow-x-auto rounded-lg border border-white/5 bg-ink-900/80 p-4 text-[13px] leading-6 text-ink-100"><code>{'用户 / API\n  -> 会话层：鉴权、租户、限流、请求 ID\n  -> 编排层：状态、规划、分支、循环、审批\n  -> 模型层：路由、结构化输出、流式响应\n  -> 能力层：RAG、Memory、Tools、MCP\n  -> 数据层：业务库、向量库、缓存、对象存储\n  -> 治理层：Trace、评测、成本、审计、Guardrail\n  -> 交付层：答案、文件、业务动作、人工接管'}</code></pre>
    <p>讲架构时可以按请求生命周期展开：身份和权限判断，读取任务状态，模型决定下一步，工具在受限环境执行，结果写回状态和 Trace，最终经过输出校验和业务验收。</p>
    <h2 id="loop">执行循环与状态机</h2>
    <CodeBlock code={LOOP} lang="pseudo" filename="agent_loop" />
    <p>循环要显式设置步数、时间、权限和交付四类边界。需要暂停后继续的任务还要持久化任务 ID、当前节点、输入摘要、工具记录、待审批动作和失败原因，不能依赖进程内存。</p>
    <h2 id="patterns">ReAct、规划与 Workflow</h2>
    <GuideTable headers={['模式', '工作方式', '优点', '风险', '选择建议']} rows={[
      ['ReAct', '思考一步、行动一步', '灵活', '步骤多、成本高', '路径难以提前确定'],
      ['Plan-and-Execute', '先计划、再执行', '长任务容易检查', '计划可能过时', '阶段明确但细节动态'],
      ['Supervisor', '主 Agent 调度专业 Agent', '分工清晰', '路由和上下文复杂', '多个专业能力统一入口'],
      ['固定 Workflow', '代码控制节点和分支', '稳定、可审计', '灵活性较低', '流程明确或高风险'],
    ]} />
    <p>不要为了体现“智能”就引入多 Agent。先用单 Agent 或 Workflow 建立可测量基线，再用实验结果证明拆分带来收益。</p>
    <h2 id="memory">上下文与记忆</h2>
    <GuideTable headers={['类型', '内容示例', '生命周期', '注意事项']} rows={[
      ['短期上下文', '消息、工具结果、约束', '一次任务', '超长时摘要或裁剪'],
      ['工作记忆', '计划、中间变量、待处理项', '任务期间', '结构化并可恢复'],
      ['长期记忆', '偏好、稳定事实、历史结论', '跨会话', '来源、可信度、删除'],
      ['外部知识', '文档、数据库、业务记录', '数据系统管理', '通过检索和权限进入'],
    ]} />
    <p>历史消息不能无条件拼接。保留当前任务必需原文，把早期内容压缩成摘要，把长期事实写入带来源和更新时间的存储，并在读取时再次检查权限和相关性。</p>
    <h2 id="selection">架构选型规则</h2>
    <GuideTable headers={['问题特征', '优先方案', '原因']} rows={[
      ['流程固定且有审批', 'Workflow + 少量 LLM 节点', '边界清晰、便于审计'],
      ['需要企业知识', 'RAG + 结构化回答', '知识更新与模型解耦'],
      ['工具路径动态但风险低', '单 Agent + 受限工具', '保留灵活性，控制复杂度'],
      ['多个专业能力协作', 'Supervisor 或 Handoff', '职责和上下文边界可见'],
      ['写入、支付、删除', '确定性代码 + 人工审批', '避免模型直接决定高风险动作'],
    ]} />
    <h2 id="practice">最小练习</h2>
    <p>实现一个“项目状态助手”：Agent 可调用两个只读工具，并在证据不足时明确说明。</p>
    <Checklist items={[<>工具使用 JSON Schema，拒绝未知参数。</>, <>设置最大 4 步、单工具 3 秒、整条任务 10 秒超时。</>, <>保存模型请求、工具参数、工具结果和答案 Trace。</>, <>工具失败时返回结构化错误，禁止假装成功。</>, <>用成功、无权限、不存在、超时、冲突等问题回归测试。</>]} />
    <p>完成后继续阅读 <Link to="/docs/guides/agent-rag/">RAG 知识库工程</Link>。</p>
  </DocPage>
}
