import { Link } from 'react-router-dom'
import { Callout } from '../../../../components/ui/Callout'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { DocPage } from '../../../../components/layout/DocPage'
import { GuideTable, Checklist, SeriesNav } from './AgentGuideShared'
import { headings, toHeadings } from './AgentGuideData'

const TOOL_SCHEMA = '{\n  "name": "get_order_status",\n  "description": "读取当前用户有权访问的订单状态",\n  "parameters": {\n    "type": "object",\n    "properties": { "order_id": { "type": "string" } },\n    "required": ["order_id"],\n    "additionalProperties": false\n  }\n}'

export default function AgentToolsMcpPage() {
  return <DocPage path="/docs/guides/agent-tools-mcp" title="AI Agent 求职专题（四）：Tool Calling、MCP 与安全执行" description="从工具契约和函数调用流程出发，掌握 Agent 如何执行外部动作，以及如何用权限、幂等、审批和审计控制风险。" headings={toHeadings(headings.tools)}>
    <SeriesNav current="/docs/guides/agent-tools-mcp/" />
    <Callout tone="danger" title="关键边界"><p>模型只能提出工具调用，不能直接执行工具。真正的执行者是你的应用、服务端或受控运行时；应用必须校验工具名、参数、身份、权限和副作用。</p></Callout>
    <h2 id="contract">工具契约</h2>
    <p>一个好的工具描述要让模型知道什么时候用、需要哪些参数、返回什么结构和哪些情况不应该调用。描述越宽泛，模型越容易选错工具或生成含糊参数。</p>
    <CodeBlock code={TOOL_SCHEMA} lang="json" filename="tool_schema.json" />
    <GuideTable headers={['字段', '作用', '设计建议']} rows={[
      ['name', '工具稳定标识', '短、明确、使用动词加对象'],
      ['description', '帮助模型选择工具', '说明适用场景、限制和副作用'],
      ['parameters', '约束输入结构', 'required 明确，禁止未知参数'],
      ['返回值', '帮助模型理解结果', '固定字段，包含 success/error/code'],
      ['权限', '限制谁能调用', '服务端根据用户身份二次判断'],
    ]} />
    <h2 id="flow">Tool Calling 流程</h2>
    <p>标准流程是：应用声明工具，模型返回工具名和参数，服务端验证并执行，服务端把结果回传，模型继续决定是否需要下一步。模型返回工具调用不等于工具调用成功。</p>
    <pre className="not-prose overflow-x-auto rounded-lg border border-white/5 bg-ink-900/80 p-4 text-[13px] leading-6 text-ink-100"><code>{'用户目标\n  -> 模型：选择工具 + 生成参数\n  -> 服务端：Schema 校验 + 身份校验 + 权限校验\n  -> 工具：执行查询或动作\n  -> 服务端：结构化结果 + trace\n  -> 模型：继续调用 / 解释失败 / 生成最终答案'}</code></pre>
    <p>可以并行执行互不依赖的只读工具，但涉及写操作、事务关系或共享状态时应保持顺序。并行不代表无限开并发，必须有并发上限和取消策略。</p>
    <h2 id="implementation">服务端实现</h2>
    <p>服务端要把“模型输出”当作不可信输入。一个最小实现至少包含白名单、参数校验、超时、错误归一化和 Trace。</p>
    <pre className="not-prose overflow-x-auto rounded-lg border border-white/5 bg-ink-900/80 p-4 text-[13px] leading-6 text-ink-100"><code>{'async def execute_call(call, user):\n    if call.name not in ALLOWED_TOOLS:\n        return error("tool_not_allowed")\n    args = validate_schema(call.arguments)\n    authorize(user, call.name, args)\n    try:\n        result = await with_timeout(run_tool(call.name, args), 3)\n        return {"ok": True, "data": result}\n    except TimeoutError:\n        return {"ok": False, "code": "timeout", "retryable": True}\n    except Exception:\n        return {"ok": False, "code": "tool_failed", "retryable": False}'}</code></pre>
    <p>写工具还需要幂等键，例如 <code>user_id + operation + client_request_id</code>。重试时必须保证同一个业务动作不会重复扣款、下单、发消息或删除数据。</p>
    <h2 id="mcp">MCP 核心概念</h2>
    <p>MCP 是一种让 Agent 应用以统一方式发现和使用外部能力的协议。面试时应能说清 Host、Client 和 Server 的关系：Host 承载 Agent，Client 负责连接，Server 暴露工具、资源或 Prompt。</p>
    <GuideTable headers={['概念', '职责', '面试表述']} rows={[
      ['Host', '用户使用的 Agent 应用', '负责会话、模型和整体安全策略'],
      ['Client', '连接某个 MCP Server', '管理能力发现、调用和传输'],
      ['Server', '提供工具、资源、Prompt', '封装外部系统并暴露受控能力'],
      ['Transport', '传递协议消息', '本地常见 STDIO，远程常见 HTTP 类传输'],
      ['授权', '确定用户是否能访问能力', '认证和授权不能交给模型决定'],
    ]} />
    <p>MCP 和普通 Function Calling 的区别在于抽象层次：Function Calling 通常是一次模型调用中的工具契约；MCP 更关注跨应用、跨工具服务器的能力发现、连接、资源和权限管理。实际系统可以把 MCP Server 当作工具适配层，但不能因此跳过内部鉴权。</p>
    <h2 id="security">权限、安全与审批</h2>
    <GuideTable headers={['风险', '例子', '控制方式']} rows={[
      ['越权读取', '用户读取其他租户订单', '服务端从会话身份推导租户，不信任参数'],
      ['危险写操作', '删除数据、发通知、付款', '人工审批、二次确认、最小权限'],
      ['Prompt Injection', '网页内容诱导 Agent 执行命令', '不可信内容隔离，工具层再次校验'],
      ['敏感泄露', '把身份证、密钥放进上下文', '脱敏、最小化、访问审计、过期删除'],
      ['供应链风险', '不可信 MCP Server 暴露危险工具', '来源审核、工具白名单、沙箱和版本锁定'],
    ]} />
    <p>审批不应只看模型生成的自然语言，而应展示结构化摘要：谁发起、将调用哪个工具、参数是什么、影响哪些资源、是否可撤销、失败后如何恢复。</p>
    <h2 id="failure">失败恢复与幂等</h2>
    <p>工具失败要先分类：参数错误通常不应重试；网络超时可能重试；业务冲突需要重新读取状态；权限错误应停止并提示用户。所有重试都应有次数、退避和总时限。</p>
    <GuideTable headers={['失败类型', '处理策略', '是否重试']} rows={[
      ['Schema 错误', '修正参数或回到模型重新规划', '通常不直接重试'],
      ['网络超时', '指数退避，保持同一幂等键', '有限重试'],
      ['限流', '等待、降级或排队', '按 Retry-After 处理'],
      ['权限失败', '停止并说明需要授权', '不重试'],
      ['业务冲突', '重新读取状态后决策', '有条件重试'],
      ['未知异常', '记录 Trace，交给人工或降级', '谨慎重试'],
    ]} />
    <h2 id="check">工具设计清单</h2>
    <Checklist items={[<>工具有清晰名称、描述、参数 Schema 和返回结构。</>, <>工具白名单、用户权限和租户隔离由服务端强制执行。</>, <>所有副作用操作都有幂等键、审计记录和撤销/补偿方案。</>, <>模型、工具和整条任务分别设置超时与重试策略。</>, <>高风险动作要求结构化人工审批，而不是只看一句自然语言。</>, <>MCP Server、第三方 API 和文档内容都被视为不可信输入。</>]} />
    <p>下一篇阅读 <Link to="/docs/guides/agent-production/">评测与生产化</Link>，学习如何证明 Agent 的质量，并把它稳定地交付上线。</p>
  </DocPage>
}
