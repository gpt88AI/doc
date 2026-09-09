import { Link } from 'react-router-dom'
import { DocPage } from '../../../components/layout/DocPage'
import { Callout } from '../../../components/ui/Callout'
import { useLocale } from '../../../lib/locale'
import { getIntegrationCopy, getIntegrationSections } from '../../../lib/integrationLocaleCopy'
import IntegrationsHubPageEn from '../../en/IntegrationsHubPageEn'

const CHAT_APPS = [
  {
    title: 'ChatBox',
    href: '/docs/integrations/chat/chatbox/',
    desc: '最适合普通聊天用户的 OpenAI 兼容接入指南。',
  },
  {
    title: 'Cherry Studio',
    href: '/docs/integrations/chat/cherry-studio/',
    desc: '适合多模型管理、提示词模板和知识库工作流。',
  },
  {
    title: 'AnythingLLM',
    href: '/docs/integrations/chat/anythingllm/',
    desc: '适合团队知识库、文档问答和 Agent 工作流。',
  },
]

const DEV_TOOLS = [
  {
    title: 'Claude Code',
    href: '/docs/integrations/dev/claude-code/',
    desc: 'Claude 风格工具接入、OAuth、插件与账号切换教程。',
  },
  {
    title: 'Cursor',
    href: '/docs/integrations/dev/cursor/',
    desc: '编辑器里的 OpenAI 兼容模型接入与常见配置。',
  },
  {
    title: 'Cline',
    href: '/docs/integrations/dev/cline/',
    desc: 'VS Code Agent 工具接入与模型切换指南。',
  },
  {
    title: 'Gemini CLI',
    href: '/docs/integrations/dev/gemini-cli/',
    desc: 'Google 风格 CLI 和图片模型接入说明。',
  },
  {
    title: 'Codex CLI',
    href: '/docs/integrations/dev/codex-cli/',
    desc: 'Codex CLI 通过 gpt88.cc 连接模型和工具的完整流程。',
  },
  {
    title: 'CC-Switch',
    href: '/docs/integrations/dev/cc-switch/',
    desc: '中转站路由切换、OAuth 与插件能力的使用说明。',
  },
]

const PLATFORMS = [
  {
    title: 'Dify',
    href: '/docs/integrations/platforms/dify/',
    desc: '把 gpt88.cc 接入 Dify 工作流、应用和知识库。',
  },
  {
    title: '沉浸式翻译',
    href: '/docs/integrations/platforms/immersive-translate/',
    desc: '浏览器翻译扩展接入与模型配置指南。',
  },
]

const HUB_CARD_COPY: Record<string, { chat: string[]; dev: string[]; platforms: string[]; view: string; intro: string; start: string; refsTitle: string; refs: string; next: string[] }> = {
  zh: { chat: CHAT_APPS.map(x => x.desc), dev: DEV_TOOLS.map(x => x.desc), platforms: PLATFORMS.map(x => x.desc), view: '查看教程', intro: '这一页是集成指南总入口。每篇教程都按“准备工作、逐步配置、验证方式、常见问题、排障清单”组织，适合直接照着配置，也适合把链接发给团队成员。', start: '如果你不确定该从哪里开始：普通聊天先看 ChatBox，开发工具先看 Codex CLI 或 Claude Code，平台应用先看 Dify。OpenAI 兼容工具和 Claude 风格工具统一使用 https://api.gpt88.cc。', refsTitle: 'Codex 外部实践指南', refs: '如果你在做 Codex 接入、CLI 使用、工作流配置或团队协作，可以额外参考 CodexGuide。它是外部实践资料，不是 gpt88.cc 官方文档。', next: ['先看 ChatBox 集成。', '再看完整接入手册。', '如果使用开发工具，查看对应的 CLI / IDE 教程。'] },
  hi: { chat: ['सामान्य chat users के लिए OpenAI-compatible guide।', 'Multi-model management, prompt templates और knowledge workflow।', 'Team knowledge base, document Q&A और Agent workflow।'], dev: ['Claude-style tool, OAuth, plugins और account switching।', 'Editor में OpenAI-compatible models और config।', 'VS Code Agent tool और model switching।', 'Google-style CLI और image model setup।', 'Codex CLI से models और tools जोड़ने की पूरी flow।', 'Proxy route switching, OAuth और plugin capabilities।'], platforms: ['gpt88.cc को Dify workflow, app और knowledge base से जोड़ना।', 'Browser translation extension और model configuration।'], view: 'Tutorial देखें', intro: 'यह integrations hub है। हर tutorial में preparation, step-by-step setup, verification, FAQ और troubleshooting है।', start: 'शुरुआत में सामान्य chat के लिए ChatBox, development tools के लिए Codex CLI या Claude Code, और platform apps के लिए Dify देखें। OpenAI-compatible और Claude-style tools https://api.gpt88.cc उपयोग करते हैं।', refsTitle: 'Codex external practice guide', refs: 'Codex integration, CLI, workflow या team collaboration के लिए CodexGuide देखें। यह external material है, official gpt88.cc docs नहीं।', next: ['पहले ChatBox integration देखें।', 'फिर Complete integration guide देखें।', 'Development tool के लिए संबंधित CLI / IDE tutorial देखें।'] },
  bn: { chat: ['সাধারণ chat user-এর OpenAI-compatible guide।', 'Multi-model management, prompt template ও knowledge workflow।', 'Team knowledge base, document Q&A ও Agent workflow।'], dev: ['Claude-style tool, OAuth, plugin ও account switching।', 'Editor-এ OpenAI-compatible model ও config।', 'VS Code Agent tool ও model switching।', 'Google-style CLI ও image model setup।', 'Codex CLI দিয়ে model ও tool যোগ করার সম্পূর্ণ flow।', 'Proxy route switching, OAuth ও plugin capability।'], platforms: ['Dify workflow, app ও knowledge base-এ gpt88.cc যুক্ত করা।', 'Browser translation extension ও model configuration।'], view: 'Tutorial দেখুন', intro: 'এটি integrations hub। প্রতিটি tutorial-এ preparation, step-by-step setup, verification, FAQ ও troubleshooting আছে।', start: 'শুরুতে সাধারণ chat-এর জন্য ChatBox, development tools-এর জন্য Codex CLI বা Claude Code, এবং platform app-এর জন্য Dify দেখুন। OpenAI-compatible ও Claude-style tool https://api.gpt88.cc ব্যবহার করে।', refsTitle: 'Codex external practice guide', refs: 'Codex integration, CLI, workflow বা team collaboration-এর জন্য CodexGuide দেখুন। এটি external material, official gpt88.cc docs নয়।', next: ['প্রথমে ChatBox integration দেখুন।', 'তারপর Complete integration guide দেখুন।', 'Development tool হলে সংশ্লিষ্ট CLI / IDE tutorial দেখুন।'] },
  ur: { chat: ['عام chat users کے لیے OpenAI-compatible guide۔', 'Multi-model management، prompt templates اور knowledge workflow۔', 'Team knowledge base، document Q&A اور Agent workflow۔'], dev: ['Claude-style tool، OAuth، plugins اور account switching۔', 'Editor میں OpenAI-compatible models اور config۔', 'VS Code Agent tool اور model switching۔', 'Google-style CLI اور image model setup۔', 'Codex CLI سے models اور tools جوڑنے کی مکمل flow۔', 'Proxy route switching، OAuth اور plugin capabilities۔'], platforms: ['gpt88.cc کو Dify workflow، app اور knowledge base سے جوڑنا۔', 'Browser translation extension اور model configuration۔'], view: 'Tutorial دیکھیں', intro: 'یہ integrations hub ہے۔ ہر tutorial میں preparation، step-by-step setup، verification، FAQ اور troubleshooting شامل ہیں۔', start: 'عام chat کے لیے ChatBox، development tools کے لیے Codex CLI یا Claude Code، اور platform apps کے لیے Dify سے شروع کریں۔ OpenAI-compatible اور Claude-style tools https://api.gpt88.cc استعمال کرتے ہیں۔', refsTitle: 'Codex external practice guide', refs: 'Codex integration، CLI، workflow یا team collaboration کے لیے CodexGuide دیکھیں۔ یہ external material ہے، official gpt88.cc docs نہیں۔', next: ['پہلے ChatBox integration دیکھیں۔', 'پھر Complete integration guide دیکھیں۔', 'Development tool کے لیے متعلقہ CLI / IDE tutorial دیکھیں۔'] },
  ta: { chat: ['பொதுவான chat users-க்கான OpenAI-compatible guide.', 'Multi-model management, prompt templates மற்றும் knowledge workflow.', 'Team knowledge base, document Q&A மற்றும் Agent workflow.'], dev: ['Claude-style tool, OAuth, plugins மற்றும் account switching.', 'Editor-ல் OpenAI-compatible models மற்றும் config.', 'VS Code Agent tool மற்றும் model switching.', 'Google-style CLI மற்றும் image model setup.', 'Codex CLI மூலம் models மற்றும் tools இணைக்கும் முழு flow.', 'Proxy route switching, OAuth மற்றும் plugin capabilities.'], platforms: ['gpt88.cc-ஐ Dify workflow, app மற்றும் knowledge base-க்கு இணைத்தல்.', 'Browser translation extension மற்றும் model configuration.'], view: 'Tutorial பார்க்கவும்', intro: 'இது integrations hub. ஒவ்வொரு tutorial-லும் preparation, step-by-step setup, verification, FAQ மற்றும் troubleshooting உள்ளன.', start: 'பொதுவான chat-க்கு ChatBox, development tools-க்கு Codex CLI அல்லது Claude Code, platform apps-க்கு Dify மூலம் தொடங்கவும். OpenAI-compatible மற்றும் Claude-style tools https://api.gpt88.cc பயன்படுத்துகின்றன.', refsTitle: 'Codex external practice guide', refs: 'Codex integration, CLI, workflow அல்லது team collaboration-க்கு CodexGuide பார்க்கவும். இது external material; official gpt88.cc docs அல்ல.', next: ['முதலில் ChatBox integration பார்க்கவும்.', 'பின்னர் Complete integration guide பார்க்கவும்.', 'Development tool என்றால் தொடர்புடைய CLI / IDE tutorial பார்க்கவும்.'] },
  ne: { chat: ['सामान्य chat users का OpenAI-compatible guide।', 'Multi-model management, prompt templates र knowledge workflow।', 'Team knowledge base, document Q&A र Agent workflow।'], dev: ['Claude-style tool, OAuth, plugins र account switching।', 'Editor मा OpenAI-compatible models र config।', 'VS Code Agent tool र model switching।', 'Google-style CLI र image model setup।', 'Codex CLI बाट models र tools जोड्ने पूरा flow।', 'Proxy route switching, OAuth र plugin capabilities।'], platforms: ['gpt88.cc लाई Dify workflow, app र knowledge base मा जोड्ने।', 'Browser translation extension र model configuration।'], view: 'Tutorial हेर्नुहोस्', intro: 'यो integrations hub हो। प्रत्येक tutorial मा preparation, step-by-step setup, verification, FAQ र troubleshooting छन्।', start: 'सामान्य chat का लागि ChatBox, development tools का लागि Codex CLI वा Claude Code, र platform app का लागि Dify बाट सुरु गर्नुहोस्। OpenAI-compatible र Claude-style tools ले https://api.gpt88.cc प्रयोग गर्छन्।', refsTitle: 'Codex external practice guide', refs: 'Codex integration, CLI, workflow वा team collaboration का लागि CodexGuide हेर्नुहोस्। यो external material हो, official gpt88.cc docs होइन।', next: ['पहिले ChatBox integration हेर्नुहोस्।', 'त्यसपछि Complete integration guide हेर्नुहोस्।', 'Development tool भए सम्बन्धित CLI / IDE tutorial हेर्नुहोस्।'] },
  si: { chat: ['සාමාන්‍ය chat users සඳහා OpenAI-compatible guide.', 'Multi-model management, prompt templates සහ knowledge workflow.', 'Team knowledge base, document Q&A සහ Agent workflow.'], dev: ['Claude-style tool, OAuth, plugins සහ account switching.', 'Editor තුළ OpenAI-compatible models සහ config.', 'VS Code Agent tool සහ model switching.', 'Google-style CLI සහ image model setup.', 'Codex CLI මඟින් models සහ tools සම්බන්ධ කිරීමේ සම්පූර්ණ flow.', 'Proxy route switching, OAuth සහ plugin capabilities.'], platforms: ['gpt88.cc Dify workflow, app සහ knowledge base සමඟ සම්බන්ධ කිරීම.', 'Browser translation extension සහ model configuration.'], view: 'Tutorial බලන්න', intro: 'මෙය integrations hub එකයි. සෑම tutorial එකකම preparation, step-by-step setup, verification, FAQ සහ troubleshooting ඇත.', start: 'සාමාන්‍ය chat සඳහා ChatBox, development tools සඳහා Codex CLI හෝ Claude Code, platform apps සඳහා Dify තෝරන්න. OpenAI-compatible සහ Claude-style tools https://api.gpt88.cc භාවිතා කරයි.', refsTitle: 'Codex external practice guide', refs: 'Codex integration, CLI, workflow හෝ team collaboration සඳහා CodexGuide බලන්න. මෙය external material එකක් වන අතර official gpt88.cc docs නොවේ.', next: ['පළමුව ChatBox integration බලන්න.', 'ඉන්පසු Complete integration guide බලන්න.', 'Development tool එකක් නම් අදාළ CLI / IDE tutorial බලන්න.'] },
}

function CardGrid({
  items,
  descriptions,
  viewLabel,
}: {
  items: { title: string; href: string; desc: string }[]
  descriptions: string[]
  viewLabel: string
}) {
  return (
    <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map(item => (
        <Link
          key={item.href}
          to={item.href}
          className="tech-card tech-card-hover group flex flex-col rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-violet-500/40 hover:bg-violet-500/[0.06]"
        >
          <h3 className="text-base font-semibold text-ink-50 group-hover:text-violet-200">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-ink-300">{descriptions[items.indexOf(item)] ?? item.desc}</p>
          <span className="mt-4 text-sm font-medium text-violet-300">{viewLabel}</span>
        </Link>
      ))}
    </div>
  )
}

export default function IntegrationsHubPage() {
  const { locale } = useLocale()
  if (locale === 'en') return <IntegrationsHubPageEn />
  const copy = getIntegrationCopy(locale, 'hub', { title: '集成指南', description: '按聊天应用、开发工具、应用平台分类的接入教程总入口。', intro: '选择你的工具，再按照 Base URL、API Key 和模型配置完成最短接入流程。' })
  const sections = getIntegrationSections(locale, 'hub', { chatApps: '聊天应用', devTools: '开发工具', platforms: '应用平台', references: '扩展阅读', next: '下一步' })
  const body = HUB_CARD_COPY[locale] ?? HUB_CARD_COPY.zh

  return (
    <DocPage
      path="/docs/integrations"
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'chat-apps', text: sections.chatApps, level: 2 }, { id: 'dev-tools', text: sections.devTools, level: 2 }, { id: 'platforms', text: sections.platforms, level: 2 }, { id: 'references', text: sections.references, level: 2 }, { id: 'next', text: sections.next, level: 2 },
      ]}
    >
      <p>{copy.intro}</p>
      <p>
        {body.intro}
      </p>
      <p>
        {body.start}
      </p>

      <h2 id="chat-apps">{sections.chatApps}</h2>
      <CardGrid items={CHAT_APPS} descriptions={body.chat} viewLabel={body.view} />

      <h2 id="dev-tools">{sections.devTools}</h2>
      <CardGrid items={DEV_TOOLS} descriptions={body.dev} viewLabel={body.view} />

      <h2 id="platforms">{sections.platforms}</h2>
      <CardGrid items={PLATFORMS} descriptions={body.platforms} viewLabel={body.view} />

      <h2 id="references">{sections.references}</h2>
      <Callout tone="tip" title={body.refsTitle}>
        <p>
          {body.refs}{' '}
          <a href="https://github.com/freestylefly/CodexGuide" target="_blank" rel="noreferrer">
            freestylefly/CodexGuide
          </a>
        </p>
      </Callout>

      <h2 id="next">{sections.next}</h2>
      <ul>
        <li>
          <Link to="/docs/integrations/chat/chatbox/">{body.next[0]}</Link>
        </li>
        <li>
          <Link to="/docs/guides/complete-integration/">{body.next[1]}</Link>
        </li>
        <li>
          {body.next[2]}
        </li>
      </ul>
    </DocPage>
  )
}
