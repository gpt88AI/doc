import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteShell } from './components/layout/SiteShell'
import { DocsLayout } from './components/layout/DocsLayout'
import LandingPage from './pages/LandingPage'
import OverviewPage from './pages/docs/OverviewPage'
import QuickstartPage from './pages/docs/QuickstartPage'
import AuthPage from './pages/docs/AuthPage'
import FaqPage from './pages/docs/FaqPage'
import ChangelogPage from './pages/docs/ChangelogPage'
import ChatCompletionsPage from './pages/docs/api/ChatCompletionsPage'
import ListModelsPage from './pages/docs/api/ListModelsPage'
import ImagesPage from './pages/docs/api/ImagesPage'
import ErrorsPage from './pages/docs/api/ErrorsPage'
import CurlSdkPage from './pages/docs/sdk/CurlPage'
import PythonSdkPage from './pages/docs/sdk/PythonPage'
import NodejsSdkPage from './pages/docs/sdk/NodejsPage'
import ClaudeCodeCompactionErrorPage from './pages/docs/guides/ClaudeCodeCompactionErrorPage'
import KimiK3ReviewPage from './pages/docs/guides/KimiK3ReviewPage'
import NotFoundPage from './pages/NotFoundPage'
import { LocaleProvider } from './lib/locale'

const ConfigExportPage = lazy(() => import('./pages/docs/guides/ConfigExportPage'))
const GrokVideoPage = lazy(() => import('./pages/docs/api/GrokVideoPage'))
const Gpt88AiProxyPage = lazy(() => import('./pages/docs/guides/Gpt88AiProxyPage'))
const Gpt88DocsMapPage = lazy(() => import('./pages/docs/guides/Gpt88DocsMapPage'))
const Gpt88TutorialPage = lazy(() => import('./pages/docs/guides/Gpt88TutorialPage'))
const CompleteIntegrationGuidePage = lazy(() => import('./pages/docs/guides/CompleteIntegrationGuidePage'))
const WorkrallyOverviewPage = lazy(() => import('./pages/docs/guides/WorkrallyOverviewPage'))
const WorkrallyAiGenerationPage = lazy(() => import('./pages/docs/guides/WorkrallyAiGenerationPage'))
const WorkrallyCanvasGuidePage = lazy(() => import('./pages/docs/guides/WorkrallyCanvasGuidePage'))
const WorkrallyUploadAssetsPage = lazy(() => import('./pages/docs/guides/WorkrallyUploadAssetsPage'))
const WorkrallyShotWorkflowPage = lazy(() => import('./pages/docs/guides/WorkrallyShotWorkflowPage'))
const WorkrallyCommonPitfallsPage = lazy(() => import('./pages/docs/guides/WorkrallyCommonPitfallsPage'))
const CodexPluginsOauthPage = lazy(() => import('./pages/docs/guides/CodexPluginsOauthPage'))
const CodexChatgptPhoneVerificationPage = lazy(() => import('./pages/docs/guides/CodexChatgptPhoneVerificationPage'))
const EccGuidePage = lazy(() => import('./pages/docs/guides/EccGuidePage'))
const CodexGptImage2SkillPage = lazy(() => import('./pages/docs/guides/CodexGptImage2SkillPage'))
const CodexFrontendTasteSkillPage = lazy(() => import('./pages/docs/guides/CodexFrontendTasteSkillPage'))
const CodexGpt55SystemOverviewPage = lazy(() => import('./pages/docs/guides/CodexGpt55SystemOverviewPage'))
const CodexSkillsContextEngineeringPage = lazy(() => import('./pages/docs/guides/CodexSkillsContextEngineeringPage'))
const CodexPluginsResearchWorkflowPage = lazy(() => import('./pages/docs/guides/CodexPluginsResearchWorkflowPage'))
const CodexParallelAutomationWorkflowPage = lazy(() => import('./pages/docs/guides/CodexParallelAutomationWorkflowPage'))
const CodexProjectFactoryDeliveryPage = lazy(() => import('./pages/docs/guides/CodexProjectFactoryDeliveryPage'))
const AgentImageStudioGuidePage = lazy(() => import('./pages/docs/guides/AgentImageStudioGuidePage'))
const EcommerceToolsSpecialPage = lazy(() => import('./pages/docs/guides/EcommerceToolsSpecialPage'))
const GptImage2ServiceNoticePage = lazy(() => import('./pages/docs/guides/GptImage2ServiceNoticePage'))
const AgentImageQualityCropGuidePage = lazy(() => import('./pages/docs/guides/AgentImageQualityCropGuidePage'))
const CodexToolRecoveryPage = lazy(() => import('./pages/docs/guides/CodexToolRecoveryPage'))
const LoopEngineeringGuidePage = lazy(() => import('./pages/docs/guides/LoopEngineeringGuidePage'))
const ZeroDowntimeReleasePage = lazy(() => import('./pages/docs/guides/ZeroDowntimeReleasePage'))
const GiffgaffGuidePage = lazy(() => import('./pages/docs/guides/GiffgaffGuidePage'))
const UsVirtualCardGuidePage = lazy(() => import('./pages/docs/guides/UsVirtualCardGuidePage'))
const AiVideoStoryboardGuidePage = lazy(() => import('./pages/docs/guides/AiVideoStoryboardGuidePage'))
const VideoCreatorToolsWorkflowPage = lazy(() => import('./pages/docs/guides/VideoCreatorToolsWorkflowPage'))
const VideoGenerationSkillsOverviewPage = lazy(() => import('./pages/docs/guides/VideoGenerationSkillsOverviewPage'))
const VideoGenerationSkillsInstallPage = lazy(() => import('./pages/docs/guides/VideoGenerationSkillsInstallPage'))
const VideoGenerationSkillsPromptDirectorPage = lazy(() => import('./pages/docs/guides/VideoGenerationSkillsPromptDirectorPage'))
const VideoGenerationSkillsEcommercePage = lazy(() => import('./pages/docs/guides/VideoGenerationSkillsEcommercePage'))
const VideoGenerationSkillsBrandAdCgPage = lazy(() => import('./pages/docs/guides/VideoGenerationSkillsBrandAdCgPage'))
const VideoGenerationSkillsAiVideoDirectorPage = lazy(() => import('./pages/docs/guides/VideoGenerationSkillsAiVideoDirectorPage'))
const VideoGenerationSkillsI2vPromptPage = lazy(() => import('./pages/docs/guides/VideoGenerationSkillsI2vPromptPage'))
const VideoGenerationSkillsWhiteBackgroundPage = lazy(() => import('./pages/docs/guides/VideoGenerationSkillsWhiteBackgroundPage'))
const VideoGenerationSkillsProductCgPage = lazy(() => import('./pages/docs/guides/VideoGenerationSkillsProductCgPage'))
const VideoGenerationSkillsTvcPage = lazy(() => import('./pages/docs/guides/VideoGenerationSkillsTvcPage'))
const VideoGenerationSkillsSceneConsistencyPage = lazy(() => import('./pages/docs/guides/VideoGenerationSkillsSceneConsistencyPage'))
const VideoGenerationSkillsComplexActionPage = lazy(() => import('./pages/docs/guides/VideoGenerationSkillsComplexActionPage'))
const IntegrationsHubPage = lazy(() => import('./pages/docs/integrations/IntegrationsHubPage'))
const ChatboxPage = lazy(() => import('./pages/docs/integrations/chat/ChatboxPage'))
const CherryStudioPage = lazy(() => import('./pages/docs/integrations/chat/CherryStudioPage'))
const AnythingLlmPage = lazy(() => import('./pages/docs/integrations/chat/AnythingLlmPage'))
const ClaudeCodeIntegrationPage = lazy(() => import('./pages/docs/integrations/dev/ClaudeCodePage'))
const CursorIntegrationPage = lazy(() => import('./pages/docs/integrations/dev/CursorPage'))
const ClineIntegrationPage = lazy(() => import('./pages/docs/integrations/dev/ClinePage'))
const GeminiCliIntegrationPage = lazy(() => import('./pages/docs/integrations/dev/GeminiCliPage'))
const CodexCliIntegrationPage = lazy(() => import('./pages/docs/integrations/dev/CodexCliPage'))
const CcSwitchIntegrationPage = lazy(() => import('./pages/docs/integrations/dev/CcSwitchPage'))
const DifyIntegrationPage = lazy(() => import('./pages/docs/integrations/platforms/DifyPage'))
const ImmersiveTranslateIntegrationPage = lazy(() => import('./pages/docs/integrations/platforms/ImmersiveTranslatePage'))
const ModelsPage = lazy(() => import('./pages/ModelsPage'))
const ModelDetailPage = lazy(() => import('./pages/ModelDetailPage'))

/**
 * gpt88.cc 文档站 - 路由树（M3 完成）
 *
 * 结构：
 *   外层 SiteShell -> 顶部导航 + 全局底部
 *   /docs/* 下挂 DocsLayout -> 加左侧 Sidebar
 *   /models 与 /models/:slug 是模型导航与模型详情，独立全宽布局，
 *     不挂 DocsLayout（无侧栏，避免和模型卡片网格视觉打架）。
 *
 * M2 已经把 quickstart、API Reference (chat/completions, models, errors)、
 * SDK (curl/python/nodejs)、auth、faq 全部实现成真实内容页。
 * M3 把模型导航与模型详情接上：默认突出 claude-fable-5（Human msg-20260610 新上模型决策），
 * 支持 Chat / Image / Video / Audio 分类切换与按名/能力/场景搜索。
 */
export default function App() {
  const route = (node: React.ReactNode) => (
    <Suspense fallback={<RouteLoading />}>{node}</Suspense>
  )

  const siteRoutes = (
    <>
      <Route index element={<LandingPage />} />

      <Route path="docs" element={<DocsLayout />}>
        <Route index element={<Navigate to="overview/" replace />} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="quickstart" element={<QuickstartPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="changelog" element={<ChangelogPage />} />
        <Route path="integrations" element={route(<IntegrationsHubPage />)} />
        <Route path="integrations/chat/chatbox" element={route(<ChatboxPage />)} />
        <Route path="integrations/chat/cherry-studio" element={route(<CherryStudioPage />)} />
        <Route path="integrations/chat/anythingllm" element={route(<AnythingLlmPage />)} />
        <Route path="integrations/dev/claude-code" element={route(<ClaudeCodeIntegrationPage />)} />
        <Route path="integrations/dev/cursor" element={route(<CursorIntegrationPage />)} />
        <Route path="integrations/dev/cline" element={route(<ClineIntegrationPage />)} />
        <Route path="integrations/dev/gemini-cli" element={route(<GeminiCliIntegrationPage />)} />
        <Route path="integrations/dev/codex-cli" element={route(<CodexCliIntegrationPage />)} />
        <Route path="integrations/dev/cc-switch" element={route(<CcSwitchIntegrationPage />)} />
        <Route path="integrations/platforms/dify" element={route(<DifyIntegrationPage />)} />
        <Route path="integrations/platforms/immersive-translate" element={route(<ImmersiveTranslateIntegrationPage />)} />

        <Route path="api/chat-completions" element={<ChatCompletionsPage />} />
        <Route path="api/images" element={<ImagesPage />} />
        <Route path="api/grok-video" element={route(<GrokVideoPage />)} />
        <Route path="api/list-models" element={<ListModelsPage />} />
        <Route path="api/errors" element={<ErrorsPage />} />

        <Route path="sdk/curl" element={<CurlSdkPage />} />
        <Route path="sdk/python" element={<PythonSdkPage />} />
        <Route path="sdk/nodejs" element={<NodejsSdkPage />} />

        <Route path="guides/config-export" element={route(<ConfigExportPage />)} />
        <Route path="guides/gpt88-ai-proxy" element={route(<Gpt88AiProxyPage />)} />
        <Route path="guides/gpt88-docs-map" element={route(<Gpt88DocsMapPage />)} />
        <Route path="guides/gpt88-tutorial" element={route(<Gpt88TutorialPage />)} />
        <Route path="guides/kimi-k3-review" element={<KimiK3ReviewPage />} />
        <Route path="guides/complete-integration" element={route(<CompleteIntegrationGuidePage />)} />
        <Route path="guides/workrally-overview" element={route(<WorkrallyOverviewPage />)} />
        <Route path="guides/workrally-ai-generation" element={route(<WorkrallyAiGenerationPage />)} />
        <Route path="guides/workrally-canvas-guide" element={route(<WorkrallyCanvasGuidePage />)} />
        <Route path="guides/workrally-upload-assets" element={route(<WorkrallyUploadAssetsPage />)} />
        <Route path="guides/workrally-shot-workflow" element={route(<WorkrallyShotWorkflowPage />)} />
        <Route path="guides/workrally-common-pitfalls" element={route(<WorkrallyCommonPitfallsPage />)} />
        <Route path="guides/agent-image-studio" element={route(<AgentImageStudioGuidePage />)} />
        <Route path="guides/ecommerce-tools-special" element={route(<EcommerceToolsSpecialPage />)} />
        <Route path="guides/gpt-image-2-service-notice" element={route(<GptImage2ServiceNoticePage />)} />
        <Route path="guides/agent-image-quality-crop-guide" element={route(<AgentImageQualityCropGuidePage />)} />
        <Route path="guides/codex-plugins-oauth" element={route(<CodexPluginsOauthPage />)} />
        <Route path="guides/codex-chatgpt-phone-verification" element={route(<CodexChatgptPhoneVerificationPage />)} />
        <Route path="guides/ecc-agent-harness" element={route(<EccGuidePage />)} />
        <Route path="guides/codex-gpt-image-2-skill" element={route(<CodexGptImage2SkillPage />)} />
        <Route path="guides/codex-frontend-taste-skill" element={route(<CodexFrontendTasteSkillPage />)} />
        <Route path="guides/codex-gpt55-system-overview" element={route(<CodexGpt55SystemOverviewPage />)} />
        <Route path="guides/codex-skills-context-engineering" element={route(<CodexSkillsContextEngineeringPage />)} />
        <Route path="guides/codex-plugins-research-workflow" element={route(<CodexPluginsResearchWorkflowPage />)} />
        <Route path="guides/codex-parallel-automation-workflow" element={route(<CodexParallelAutomationWorkflowPage />)} />
        <Route path="guides/codex-project-factory-delivery" element={route(<CodexProjectFactoryDeliveryPage />)} />
        <Route path="guides/loop-engineering-harness" element={route(<LoopEngineeringGuidePage />)} />
        <Route path="guides/codex-tool-recovery" element={route(<CodexToolRecoveryPage />)} />
        <Route path="guides/claude-code-compaction-error" element={<ClaudeCodeCompactionErrorPage />} />
        <Route path="guides/zero-downtime-release" element={route(<ZeroDowntimeReleasePage />)} />
        <Route path="guides/giffgaff-sim-guide" element={route(<GiffgaffGuidePage />)} />
        <Route path="guides/us-virtual-card-guide" element={route(<UsVirtualCardGuidePage />)} />
        <Route path="guides/ai-video-storyboard-guide" element={route(<AiVideoStoryboardGuidePage />)} />
        <Route path="guides/video-creator-tools-workflow" element={route(<VideoCreatorToolsWorkflowPage />)} />
        <Route path="guides/video-generation-skills-overview" element={route(<VideoGenerationSkillsOverviewPage />)} />
        <Route path="guides/video-generation-skills-install" element={route(<VideoGenerationSkillsInstallPage />)} />
        <Route path="guides/video-generation-skills-prompt-director" element={route(<VideoGenerationSkillsPromptDirectorPage />)} />
        <Route path="guides/video-generation-skills-ecommerce" element={route(<VideoGenerationSkillsEcommercePage />)} />
        <Route path="guides/video-generation-skills-brand-ad-cg" element={route(<VideoGenerationSkillsBrandAdCgPage />)} />
        <Route path="guides/video-generation-skills-ai-video-director" element={route(<VideoGenerationSkillsAiVideoDirectorPage />)} />
        <Route path="guides/video-generation-skills-i2v-prompt" element={route(<VideoGenerationSkillsI2vPromptPage />)} />
        <Route path="guides/video-generation-skills-white-background-scaling" element={route(<VideoGenerationSkillsWhiteBackgroundPage />)} />
        <Route path="guides/video-generation-skills-product-cg" element={route(<VideoGenerationSkillsProductCgPage />)} />
        <Route path="guides/video-generation-skills-tvc-playbook" element={route(<VideoGenerationSkillsTvcPage />)} />
        <Route path="guides/video-generation-skills-scene-consistency" element={route(<VideoGenerationSkillsSceneConsistencyPage />)} />
        <Route path="guides/video-generation-skills-complex-action-storyboard" element={route(<VideoGenerationSkillsComplexActionPage />)} />
      </Route>

      <Route path="models" element={route(<ModelsPage />)} />
      <Route path="models/:slug" element={route(<ModelDetailPage />)} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  )

  return (
    <Routes>
      <Route element={<LocaleProvider locale="zh"><SiteShell /></LocaleProvider>}>
        {siteRoutes}
      </Route>
      <Route path="en" element={<LocaleProvider locale="en"><SiteShell /></LocaleProvider>}>
        {siteRoutes}
      </Route>
    </Routes>
  )
}

function RouteLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 text-sm text-ink-400 sm:px-6 lg:px-8">
      Loading...
    </div>
  )
}
