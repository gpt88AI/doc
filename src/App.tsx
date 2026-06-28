import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteShell } from './components/layout/SiteShell'
import { DocsLayout } from './components/layout/DocsLayout'
import LandingPage from './pages/LandingPage'
import OverviewPage from './pages/docs/OverviewPage'
import QuickstartPage from './pages/docs/QuickstartPage'
import AuthPage from './pages/docs/AuthPage'
import FaqPage from './pages/docs/FaqPage'
import ChatCompletionsPage from './pages/docs/api/ChatCompletionsPage'
import ListModelsPage from './pages/docs/api/ListModelsPage'
import ImagesPage from './pages/docs/api/ImagesPage'
import ErrorsPage from './pages/docs/api/ErrorsPage'
import CurlSdkPage from './pages/docs/sdk/CurlPage'
import PythonSdkPage from './pages/docs/sdk/PythonPage'
import NodejsSdkPage from './pages/docs/sdk/NodejsPage'
import ConfigExportPage from './pages/docs/guides/ConfigExportPage'
import Gpt88AiProxyPage from './pages/docs/guides/Gpt88AiProxyPage'
import Gpt88TutorialPage from './pages/docs/guides/Gpt88TutorialPage'
import CompleteIntegrationGuidePage from './pages/docs/guides/CompleteIntegrationGuidePage'
import CodexPluginsOauthPage from './pages/docs/guides/CodexPluginsOauthPage'
import CodexChatgptPhoneVerificationPage from './pages/docs/guides/CodexChatgptPhoneVerificationPage'
import EccGuidePage from './pages/docs/guides/EccGuidePage'
import CodexGptImage2SkillPage from './pages/docs/guides/CodexGptImage2SkillPage'
import CodexFrontendTasteSkillPage from './pages/docs/guides/CodexFrontendTasteSkillPage'
import CodexGpt55SystemOverviewPage from './pages/docs/guides/CodexGpt55SystemOverviewPage'
import CodexSkillsContextEngineeringPage from './pages/docs/guides/CodexSkillsContextEngineeringPage'
import CodexPluginsResearchWorkflowPage from './pages/docs/guides/CodexPluginsResearchWorkflowPage'
import CodexParallelAutomationWorkflowPage from './pages/docs/guides/CodexParallelAutomationWorkflowPage'
import CodexProjectFactoryDeliveryPage from './pages/docs/guides/CodexProjectFactoryDeliveryPage'
import AgentImageStudioGuidePage from './pages/docs/guides/AgentImageStudioGuidePage'
import GptImage2ServiceNoticePage from './pages/docs/guides/GptImage2ServiceNoticePage'
import AgentImageQualityCropGuidePage from './pages/docs/guides/AgentImageQualityCropGuidePage'
import CodexToolRecoveryPage from './pages/docs/guides/CodexToolRecoveryPage'
import LoopEngineeringGuidePage from './pages/docs/guides/LoopEngineeringGuidePage'
import ZeroDowntimeReleasePage from './pages/docs/guides/ZeroDowntimeReleasePage'
import GiffgaffGuidePage from './pages/docs/guides/GiffgaffGuidePage'
import UsVirtualCardGuidePage from './pages/docs/guides/UsVirtualCardGuidePage'
import AiVideoStoryboardGuidePage from './pages/docs/guides/AiVideoStoryboardGuidePage'
import VideoCreatorToolsWorkflowPage from './pages/docs/guides/VideoCreatorToolsWorkflowPage'
import VideoGenerationSkillsOverviewPage from './pages/docs/guides/VideoGenerationSkillsOverviewPage'
import VideoGenerationSkillsInstallPage from './pages/docs/guides/VideoGenerationSkillsInstallPage'
import VideoGenerationSkillsPromptDirectorPage from './pages/docs/guides/VideoGenerationSkillsPromptDirectorPage'
import VideoGenerationSkillsEcommercePage from './pages/docs/guides/VideoGenerationSkillsEcommercePage'
import VideoGenerationSkillsBrandAdCgPage from './pages/docs/guides/VideoGenerationSkillsBrandAdCgPage'
import VideoGenerationSkillsAiVideoDirectorPage from './pages/docs/guides/VideoGenerationSkillsAiVideoDirectorPage'
import VideoGenerationSkillsI2vPromptPage from './pages/docs/guides/VideoGenerationSkillsI2vPromptPage'
import VideoGenerationSkillsWhiteBackgroundPage from './pages/docs/guides/VideoGenerationSkillsWhiteBackgroundPage'
import VideoGenerationSkillsProductCgPage from './pages/docs/guides/VideoGenerationSkillsProductCgPage'
import VideoGenerationSkillsTvcPage from './pages/docs/guides/VideoGenerationSkillsTvcPage'
import VideoGenerationSkillsSceneConsistencyPage from './pages/docs/guides/VideoGenerationSkillsSceneConsistencyPage'
import VideoGenerationSkillsComplexActionPage from './pages/docs/guides/VideoGenerationSkillsComplexActionPage'
import IntegrationsHubPage from './pages/docs/integrations/IntegrationsHubPage'
import ChatboxPage from './pages/docs/integrations/chat/ChatboxPage'
import CherryStudioPage from './pages/docs/integrations/chat/CherryStudioPage'
import AnythingLlmPage from './pages/docs/integrations/chat/AnythingLlmPage'
import ClaudeCodeIntegrationPage from './pages/docs/integrations/dev/ClaudeCodePage'
import CursorIntegrationPage from './pages/docs/integrations/dev/CursorPage'
import ClineIntegrationPage from './pages/docs/integrations/dev/ClinePage'
import GeminiCliIntegrationPage from './pages/docs/integrations/dev/GeminiCliPage'
import CodexCliIntegrationPage from './pages/docs/integrations/dev/CodexCliPage'
import CcSwitchIntegrationPage from './pages/docs/integrations/dev/CcSwitchPage'
import DifyIntegrationPage from './pages/docs/integrations/platforms/DifyPage'
import ImmersiveTranslateIntegrationPage from './pages/docs/integrations/platforms/ImmersiveTranslatePage'
import ModelsPage from './pages/ModelsPage'
import ModelDetailPage from './pages/ModelDetailPage'
import NotFoundPage from './pages/NotFoundPage'

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
  return (
    <Routes>
      <Route element={<SiteShell />}>
        {/* 首页 */}
        <Route index element={<LandingPage />} />

        {/* 文档区 */}
        <Route path="docs" element={<DocsLayout />}>
          <Route index element={<Navigate to="/docs/overview/" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="quickstart" element={<QuickstartPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="integrations" element={<IntegrationsHubPage />} />
        <Route path="integrations/chat/chatbox" element={<ChatboxPage />} />
        <Route path="integrations/chat/cherry-studio" element={<CherryStudioPage />} />
        <Route path="integrations/chat/anythingllm" element={<AnythingLlmPage />} />
        <Route path="integrations/dev/claude-code" element={<ClaudeCodeIntegrationPage />} />
        <Route path="integrations/dev/cursor" element={<CursorIntegrationPage />} />
        <Route path="integrations/dev/cline" element={<ClineIntegrationPage />} />
        <Route path="integrations/dev/gemini-cli" element={<GeminiCliIntegrationPage />} />
        <Route path="integrations/dev/codex-cli" element={<CodexCliIntegrationPage />} />
        <Route path="integrations/dev/cc-switch" element={<CcSwitchIntegrationPage />} />
        <Route path="integrations/platforms/dify" element={<DifyIntegrationPage />} />
        <Route path="integrations/platforms/immersive-translate" element={<ImmersiveTranslateIntegrationPage />} />

          {/* API Reference */}
          <Route path="api/chat-completions" element={<ChatCompletionsPage />} />
          <Route path="api/images" element={<ImagesPage />} />
          <Route path="api/list-models" element={<ListModelsPage />} />
          <Route path="api/errors" element={<ErrorsPage />} />

          {/* SDK */}
          <Route path="sdk/curl" element={<CurlSdkPage />} />
          <Route path="sdk/python" element={<PythonSdkPage />} />
          <Route path="sdk/nodejs" element={<NodejsSdkPage />} />

          {/* 指南：how-to 类教程 */}
          <Route path="guides/config-export" element={<ConfigExportPage />} />
          <Route path="guides/gpt88-ai-proxy" element={<Gpt88AiProxyPage />} />
          <Route path="guides/gpt88-tutorial" element={<Gpt88TutorialPage />} />
          <Route path="guides/complete-integration" element={<CompleteIntegrationGuidePage />} />
          <Route path="guides/agent-image-studio" element={<AgentImageStudioGuidePage />} />
          <Route path="guides/gpt-image-2-service-notice" element={<GptImage2ServiceNoticePage />} />
          <Route path="guides/agent-image-quality-crop-guide" element={<AgentImageQualityCropGuidePage />} />
          <Route path="guides/codex-plugins-oauth" element={<CodexPluginsOauthPage />} />
          <Route path="guides/codex-chatgpt-phone-verification" element={<CodexChatgptPhoneVerificationPage />} />
          <Route path="guides/ecc-agent-harness" element={<EccGuidePage />} />
          <Route path="guides/codex-gpt-image-2-skill" element={<CodexGptImage2SkillPage />} />
          <Route path="guides/codex-frontend-taste-skill" element={<CodexFrontendTasteSkillPage />} />
          <Route path="guides/codex-gpt55-system-overview" element={<CodexGpt55SystemOverviewPage />} />
          <Route path="guides/codex-skills-context-engineering" element={<CodexSkillsContextEngineeringPage />} />
          <Route path="guides/codex-plugins-research-workflow" element={<CodexPluginsResearchWorkflowPage />} />
          <Route path="guides/codex-parallel-automation-workflow" element={<CodexParallelAutomationWorkflowPage />} />
          <Route path="guides/codex-project-factory-delivery" element={<CodexProjectFactoryDeliveryPage />} />
          <Route path="guides/loop-engineering-harness" element={<LoopEngineeringGuidePage />} />
          <Route path="guides/codex-tool-recovery" element={<CodexToolRecoveryPage />} />
          <Route path="guides/zero-downtime-release" element={<ZeroDowntimeReleasePage />} />
          <Route path="guides/giffgaff-sim-guide" element={<GiffgaffGuidePage />} />
          <Route path="guides/us-virtual-card-guide" element={<UsVirtualCardGuidePage />} />
          <Route path="guides/ai-video-storyboard-guide" element={<AiVideoStoryboardGuidePage />} />
          <Route path="guides/video-creator-tools-workflow" element={<VideoCreatorToolsWorkflowPage />} />
          <Route path="guides/video-generation-skills-overview" element={<VideoGenerationSkillsOverviewPage />} />
          <Route path="guides/video-generation-skills-install" element={<VideoGenerationSkillsInstallPage />} />
          <Route path="guides/video-generation-skills-prompt-director" element={<VideoGenerationSkillsPromptDirectorPage />} />
          <Route path="guides/video-generation-skills-ecommerce" element={<VideoGenerationSkillsEcommercePage />} />
          <Route path="guides/video-generation-skills-brand-ad-cg" element={<VideoGenerationSkillsBrandAdCgPage />} />
          <Route path="guides/video-generation-skills-ai-video-director" element={<VideoGenerationSkillsAiVideoDirectorPage />} />
          <Route path="guides/video-generation-skills-i2v-prompt" element={<VideoGenerationSkillsI2vPromptPage />} />
          <Route path="guides/video-generation-skills-white-background-scaling" element={<VideoGenerationSkillsWhiteBackgroundPage />} />
          <Route path="guides/video-generation-skills-product-cg" element={<VideoGenerationSkillsProductCgPage />} />
          <Route path="guides/video-generation-skills-tvc-playbook" element={<VideoGenerationSkillsTvcPage />} />
          <Route path="guides/video-generation-skills-scene-consistency" element={<VideoGenerationSkillsSceneConsistencyPage />} />
          <Route path="guides/video-generation-skills-complex-action-storyboard" element={<VideoGenerationSkillsComplexActionPage />} />
        </Route>

        {/* 模型导航（M3）：列表 + 详情 */}
        <Route path="models" element={<ModelsPage />} />
        <Route path="models/:slug" element={<ModelDetailPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
