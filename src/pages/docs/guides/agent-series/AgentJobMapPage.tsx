import { Link } from 'react-router-dom'
import { Callout } from '../../../../components/ui/Callout'
import { DocPage } from '../../../../components/layout/DocPage'
import { GuideTable, Checklist, SeriesNav } from './AgentGuideShared'
import { headings, toHeadings } from './AgentGuideData'

export default function AgentJobMapPage() {
  return <DocPage path="/docs/guides/agent-job-map" title="AI Agent 求职专题（一）：从 BOSS 直聘 JD 反推岗位能力模型" description="把 AI Agent、智能体、大模型应用、RAG、MCP 和 AI 产品岗位拆成可执行的学习地图，帮助你读懂 JD、定位短板并准备作品集。" headings={toHeadings(headings.jobMap)}>
    <SeriesNav current="/docs/guides/agent-job-map/" />
    <Callout tone="info" title="样本边界"><p>招聘信息会随城市、登录状态、发布时间和企业招聘计划变化。本文不是某一天全站职位数量的统计，而是对公开可见 AI Agent 相关 JD 的职责、关键词和能力要求进行归纳。</p></Callout>
    <h2 id="scope">如何阅读 AI Agent JD</h2>
    <p>阅读 JD 的目标不是把关键词全部背下来，而是把它转换成三个问题：岗位交付什么业务结果，日常工作位于模型层、应用层还是平台层，以及面试官会用什么证据判断你真的做过。</p>
    <GuideTable headers={['JD 文字', '隐含工作', '需要准备的证据']} rows={[
      ['负责 Agent 规划与工具调用', '设计状态、工具契约、调用循环和失败分支', '状态图、工具 Demo、失败恢复案例'],
      ['负责企业知识库和 RAG', '处理文档、检索、重排、引用和知识更新', 'RAG 链路图、评测集、Badcase'],
      ['负责大模型应用落地', '把模型接到业务 API 和权限系统', '上线架构、监控、成本和权限方案'],
      ['熟悉 LangChain/LangGraph/Dify', '使用框架编排节点，但理解底层协议', '能脱离框架解释消息、状态和重试'],
      ['负责 Agent 平台建设', '提供工作流、工具、模型、租户和观测能力', '平台分层、容量估算和治理规则'],
    ]} />
    <h2 id="roles">岗位类型地图</h2>
    <p>同一家公司可能把相似工作命名为不同职位。最稳妥的分类方法是看交付物，而不是看标题。</p>
    <GuideTable headers={['方向', '主要交付物', '技术重心', '面试深度']} rows={[
      ['Agent 应用开发', '完成业务任务的智能助手', 'Python、API、Prompt、Tool、RAG', '可运行 Demo 和边界'],
      ['RAG/知识库工程', '可检索、可引用、可更新的知识系统', '解析、切分、Embedding、Hybrid、Rerank', '指标、Badcase、排障'],
      ['Agent 平台工程', '编排、工具、模型和租户基础设施', '状态机、调度、并发、高可用', '系统设计和容量'],
      ['模型应用/算法', '模型适配、微调、推理或评测', 'Transformer、SFT、LoRA、量化', '算法基础和实验'],
      ['AI 产品经理', '场景、流程、指标和迭代方案', '任务拆解、体验、评测、价值', '技术取舍和业务判断'],
      ['评测/质量工程', '测试集、评测流水线和质量报告', 'Trace、评分器、回归、人工抽检', '把质量变成指标'],
      ['解决方案/交付', '客户方案、集成和上线交付', '业务建模、私有化、运维', '沟通、架构、落地'],
    ]} />
    <h2 id="matrix">能力矩阵</h2>
    <GuideTable headers={['层级', '核心问题', '必须掌握', '常见短板']} rows={[
      ['模型层', '模型能理解和输出什么', 'Prompt、结构化输出、上下文、路由', '只会调用 API'],
      ['能力层', '如何获得知识和行动能力', 'RAG、Tool、Memory、MCP、Skills', '概念混淆'],
      ['编排层', '多步任务如何推进', '状态机、分支、循环、并行、审批', '没有停止条件'],
      ['工程层', '如何稳定上线', '鉴权、限流、超时、重试、幂等、监控', 'Demo 可用但生产不可控'],
      ['业务层', '为什么值得使用 Agent', '任务成功率、效率、成本、风险', '没有验收指标'],
    ]} />
    <h2 id="seniority">按职级拆解要求</h2>
    <h3>初级：能把能力接起来</h3><p>初级岗位通常要求完成模型接入、知识库问答、业务工具封装和结构化输出。重点是代码质量、接口理解和基本排错，不是堆叠框架。</p>
    <h3>中级：能把链路做稳定</h3><p>中级岗位会追问状态、并发、重试、评测、成本和权限。你要能判断错误来自模型、检索、工具还是基础设施，并提出验证步骤。</p>
    <h3>高级：能定义边界和平台能力</h3><p>高级岗位关注架构演进：哪些流程应固定编排，哪些判断交给模型；如何支持多租户、多模型、工具治理、灰度和跨团队复用。</p>
    <h2 id="keywords">关键词反推真实工作</h2>
    <GuideTable headers={['关键词组合', '大概率意味着', '面试准备']} rows={[
      ['LangGraph + 状态机 + Workflow', '需要显式控制节点、分支和恢复', '画状态转移图，解释 checkpoint'],
      ['RAG + Milvus/pgvector + Rerank', '需要优化企业知识库效果', '准备 Recall@K、MRR、引用准确率'],
      ['MCP + Tool + 权限', '需要接入外部工具生态', '解释发现、认证、隔离和审计'],
      ['vLLM + 量化 + GPU', '偏私有化部署和推理优化', '准备吞吐、显存和降级策略'],
      ['Agent 评测 + Trace + 质量', '需要对非确定性系统负责', '准备数据集、评分、回归和抽检'],
    ]} />
    <h2 id="resume">简历与作品集准备</h2>
    <p>不要只写“使用 LangChain 搭建 Agent”。更有说服力的描述包含场景、动作、指标和约束。</p>
    <pre className="not-prose overflow-x-auto rounded-lg border border-white/5 bg-ink-900/80 p-4 text-[13px] leading-6 text-ink-100"><code>{'场景：为谁解决什么任务\n架构：模型 + RAG + 工具 + 编排 + 存储\n动作：Agent 如何规划、调用和验证\n指标：成功率、延迟、成本、转人工率\n约束：权限、敏感数据、故障和回滚\n结果：上线规模或可复现的测试结果'}</code></pre>
    <p>作品集最好有可运行的最小版本和工程说明。说明要回答：为什么不用纯规则、为什么不用多 Agent、失败如何恢复、怎样证明效果提升。</p>
    <h2 id="check">岗位匹配检查表</h2>
    <Checklist items={[<>我能说清目标岗位交付的业务结果。</>, <>我能画出模型、状态、工具、数据和权限边界。</>, <>我至少有一个 RAG 或 Tool Calling 项目并能提供评测方法。</>, <>我能解释一次失败，而不是只展示成功截图。</>, <>我能根据 JD 判断它偏应用、平台、算法、产品还是交付。</>, <>我能把项目写成“问题—方案—指标—复盘”。</>]} />
    <p>下一篇阅读 <Link to="/docs/guides/agent-foundations/">Agent 基础与架构</Link>，把岗位要求映射到一个可执行的 Agent 内部模型。</p>
  </DocPage>
}
