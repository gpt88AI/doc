export function toHeadings(entries: string[]) {
  return entries.map(entry => { const [id, text] = entry.split(':'); return { id, text, level: 2 as const } })
}

export const headings = {
  jobMap: ['scope:如何阅读 AI Agent JD', 'roles:岗位类型地图', 'matrix:能力矩阵', 'seniority:按职级拆解要求', 'keywords:关键词反推真实工作', 'resume:简历与作品集准备', 'check:岗位匹配检查表'],
  foundations: ['definition:Agent 到底是什么', 'architecture:参考架构', 'loop:执行循环与状态机', 'patterns:ReAct、规划与 Workflow', 'memory:上下文与记忆', 'selection:架构选型规则', 'practice:最小练习'],
  rag: ['pipeline:RAG 全链路', 'ingestion:文档处理与切分', 'retrieval:召回、过滤与重排', 'generation:上下文组装与生成', 'evaluation:RAG 评测与排障', 'production:企业级 RAG 设计', 'exercise:实战练习'],
  tools: ['contract:工具契约', 'flow:Tool Calling 流程', 'implementation:服务端实现', 'mcp:MCP 核心概念', 'security:权限、安全与审批', 'failure:失败恢复与幂等', 'check:工具设计清单'],
  production: ['quality:Agent 质量模型', 'dataset:评测集与指标', 'trace:Trace 与可观测性', 'performance:延迟、成本与容量', 'security:安全与人工接管', 'release:上线与回滚', 'runbook:生产检查表'],
  interview: ['answer:面试回答框架', 'questions:高频题与参考答案', 'project:实战项目设计', 'walkthrough:项目讲解模板', 'coding:现场手写与排障题', 'plan:30 天复习路线', 'acceptance:最终验收清单'],
}
