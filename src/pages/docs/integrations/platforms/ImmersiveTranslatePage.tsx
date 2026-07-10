import { Link } from 'react-router-dom'
import { DocPage } from '../../../../components/layout/DocPage'
import { CodeBlock } from '../../../../components/ui/CodeBlock'
import { Callout } from '../../../../components/ui/Callout'
import { useLocale } from '../../../../lib/locale'
import ImmersiveTranslatePageEn from '../../../en/ImmersiveTranslatePageEn'

const PREPARE = `1. 已安装沉浸式翻译浏览器扩展
2. 已准备 gpt88.cc API Key
3. 已确认要使用的聊天模型
4. 浏览器可以访问目标网页
5. 先准备一个短网页或短段落测试`

const SETUP = `服务类型: OpenAI Compatible / 自定义 OpenAI
API Key: sk-你的-gpt88-api-key
API URL / Base URL: https://gpt88.cc/v1
Model: gpt-5-2-chat-latest
Temperature: 0.2 - 0.5`

const FLOW = `1. 打开浏览器扩展管理页
2. 进入沉浸式翻译设置
3. 找到 AI 翻译服务 / OpenAI 设置
4. 选择 OpenAI Compatible 或自定义 OpenAI
5. 填入 API Key
6. Base URL 填 https://gpt88.cc/v1
7. 模型名填 gpt-5-2-chat-latest
8. 保存配置
9. 打开一篇短网页测试翻译`

const PROMPT = `你是专业翻译助手。
请把用户提供的文本翻译成简体中文。
要求：
1. 保留原文段落结构
2. 技术术语保持准确
3. 不要添加解释
4. 不要输出与翻译无关的内容`

const VERIFY = `测试文本：
The model supports streaming responses and tool calls.

预期结果：
模型应翻译为自然中文，并保留 streaming responses、tool calls 等技术含义。`

const TROUBLESHOOTING = `1. 翻译按钮没反应
   - 检查扩展是否启用
   - 检查当前网页是否允许扩展运行

2. API 报 401
   - 检查 API Key 是否完整
   - 确认 Key 没有复制多余空格

3. API 报 404
   - Base URL 应为 https://gpt88.cc/v1
   - 模型 ID 必须是真实可用模型

4. 翻译太慢
   - 换更轻的模型
   - 减小单次翻译段落长度

5. 翻译风格不稳定
   - 降低 Temperature
   - 使用固定系统提示词`

export default function ImmersiveTranslateIntegrationPage() {
  const { locale } = useLocale()

  if (locale === 'en') return <ImmersiveTranslatePageEn />

  return (
    <DocPage
      path="/docs/integrations/platforms/immersive-translate"
      title="沉浸式翻译接入 gpt88.cc"
      description="浏览器沉浸式翻译扩展通过 OpenAI 兼容接口接入 gpt88.cc 的逐步教程。"
      headings={[
        { id: 'overview', text: '适用场景', level: 2 },
        { id: 'prepare', text: '准备工作', level: 2 },
        { id: 'configure', text: '第一步：填写服务配置', level: 2 },
        { id: 'flow', text: '第二步：逐步操作', level: 2 },
        { id: 'prompt', text: '第三步：优化翻译提示词', level: 2 },
        { id: 'verify', text: '第四步：验证翻译效果', level: 2 },
        { id: 'troubleshoot', text: '排障清单', level: 2 },
        { id: 'next', text: '下一步', level: 2 },
      ]}
    >
      <Callout tone="info" title="推荐用法">
        <p>
          沉浸式翻译按 OpenAI Compatible 接入即可。翻译任务更看重稳定和成本，
          建议先用轻量聊天模型测试，再根据网页长度调整模型。
        </p>
      </Callout>

      <h2 id="overview">适用场景</h2>
      <ul>
        <li>网页全文翻译。</li>
        <li>技术文档中英互译。</li>
        <li>论文、博客、产品文档的分段翻译。</li>
        <li>需要比普通机器翻译更自然的表达。</li>
      </ul>

      <h2 id="prepare">准备工作</h2>
      <CodeBlock lang="text" filename="checklist" code={PREPARE} />

      <h2 id="configure">第一步：填写服务配置</h2>
      <p>在沉浸式翻译的 AI 服务配置里选择 OpenAI 兼容服务，然后按下面填写。</p>
      <CodeBlock lang="text" filename="setup" code={SETUP} />

      <h2 id="flow">第二步：逐步操作</h2>
      <CodeBlock lang="text" filename="flow" code={FLOW} />

      <h2 id="prompt">第三步：优化翻译提示词</h2>
      <p>
        如果扩展支持自定义系统提示词，可以使用更稳定的翻译约束。技术文档建议保留术语，不要让模型自由发挥。
      </p>
      <CodeBlock lang="text" filename="translation-prompt" code={PROMPT} />

      <h2 id="verify">第四步：验证翻译效果</h2>
      <CodeBlock lang="text" filename="verify" code={VERIFY} />
      <ol>
        <li>先用一段短英文测试。</li>
        <li>确认翻译不会添加额外解释。</li>
        <li>再打开长网页测试分段翻译。</li>
        <li>如果成本较高，降低单次段落长度或切换轻量模型。</li>
      </ol>

      <h2 id="troubleshoot">排障清单</h2>
      <CodeBlock lang="text" filename="troubleshooting" code={TROUBLESHOOTING} />

      <h2 id="next">下一步</h2>
      <ul>
        <li><Link to="/docs/integrations/chat/chatbox/">查看 ChatBox 接入教程</Link></li>
        <li><Link to="/docs/guides/gpt88-tutorial/">查看 gpt88.cc 通用教程</Link></li>
        <li><Link to="/docs/integrations/">返回集成总览</Link></li>
      </ul>
    </DocPage>
  )
}
