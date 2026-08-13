import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  CircleGauge,
  Code2,
  ExternalLink,
  Globe2,
  KeyRound,
  Layers3,
  Network,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { ActivationQuickStarts } from '../components/activation/ActivationQuickStarts'
import { Seo } from '../components/seo/Seo'
import { websiteStructuredData } from '../components/seo/structuredData'
import { FEATURED_SLUGS, findModel } from '../data/models'
import { buildAgentActivationUrl } from '../lib/activationLinks'
import {
  LOCALE_CONFIG,
  localizedContentPath,
  localizePath,
  type Locale,
  useLocale,
} from '../lib/locale'
import { getLocaleCopy } from '../lib/localeCopy'

const CURL_EXAMPLE = `curl https://api.gpt88.cc/v1/chat/completions \\
  -H "Authorization: Bearer $GPT88_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "grok-4.6",
    "messages": [{"role": "user", "content": "Hello GPT88"}]
  }'`

type HomeLabels = {
  live: string
  routeReady: string
  endpointTitle: string
  endpointBody: string
  standardApi: string
  mediaApi: string
  workflowTitle: string
  workflowBody: string
  modelsTitle: string
  modelsBody: string
  reliabilityTitle: string
  reliabilityBody: string
  requestTrace: string
  startTitle: string
  startBody: string
  textModels: string
  mediaModels: string
  routeLabel: string
  latencyLabel: string
  statusLabel: string
}

const HOME_LABELS: Record<Locale, HomeLabels> = {
  zh: {
    live: '实时路由', routeReady: '网关运行中', endpointTitle: '一套集成，两类端点',
    endpointBody: '标准模型走统一 OpenAI 兼容入口；图片和视频任务使用独立媒体入口。',
    standardApi: '文本、多模态与标准 API', mediaApi: '图片与视频直连任务',
    workflowTitle: '围绕真实工作流设计', workflowBody: '从第一次请求到生产排障，首页直接给出可执行入口。',
    modelsTitle: '换模型，不换接入方式', modelsBody: '使用同一份鉴权和请求结构，在模型目录中选择更合适的能力。',
    reliabilityTitle: '每一次调用都可追踪', reliabilityBody: '请求状态、路由结果、时延和用量保持在同一条记录中。',
    requestTrace: '请求追踪', startTitle: '准备发送第一次请求？',
    startBody: '创建 API Key，复制端点，然后用现有 OpenAI 兼容 SDK 发起调用。',
    textModels: '文本与 Agent', mediaModels: '图片与视频', routeLabel: '路由', latencyLabel: '时延', statusLabel: '状态',
  },
  en: {
    live: 'Live routing', routeReady: 'Gateway online', endpointTitle: 'One integration, two endpoints',
    endpointBody: 'Use the unified OpenAI-compatible endpoint for standard models and the media endpoint for image and video workloads.',
    standardApi: 'Text, multimodal, and standard APIs', mediaApi: 'Direct image and video workloads',
    workflowTitle: 'Built around real workflows', workflowBody: 'Move from the first request to production troubleshooting with direct, usable entry points.',
    modelsTitle: 'Change models, not integrations', modelsBody: 'Keep one authentication and request format while choosing the right capability from the model catalog.',
    reliabilityTitle: 'Every request stays observable', reliabilityBody: 'Status, routing result, latency, and usage remain attached to the same request record.',
    requestTrace: 'Request trace', startTitle: 'Ready to send your first request?',
    startBody: 'Create an API key, copy the endpoint, and call it from your existing OpenAI-compatible SDK.',
    textModels: 'Text & agents', mediaModels: 'Image & video', routeLabel: 'Route', latencyLabel: 'Latency', statusLabel: 'Status',
  },
  'zh-TW': {
    live: '即時路由', routeReady: '閘道運行中', endpointTitle: '一套整合，兩類端點',
    endpointBody: '標準模型使用統一 OpenAI 相容入口；圖片與影片任務使用獨立媒體入口。',
    standardApi: '文字、多模態與標準 API', mediaApi: '圖片與影片直連任務',
    workflowTitle: '為真實工作流程設計', workflowBody: '從第一次請求到正式環境排錯，都有可直接使用的入口。',
    modelsTitle: '換模型，不換整合方式', modelsBody: '沿用同一套驗證與請求格式，從模型目錄選擇需要的能力。',
    reliabilityTitle: '每次呼叫都可追蹤', reliabilityBody: '狀態、路由結果、延遲與用量保留在同一筆請求紀錄。',
    requestTrace: '請求追蹤', startTitle: '準備送出第一次請求？', startBody: '建立 API Key、複製端點，再用現有 OpenAI 相容 SDK 呼叫。',
    textModels: '文字與 Agent', mediaModels: '圖片與影片', routeLabel: '路由', latencyLabel: '延遲', statusLabel: '狀態',
  },
  es: {
    live: 'Enrutamiento en vivo', routeReady: 'Gateway activo', endpointTitle: 'Una integración, dos endpoints',
    endpointBody: 'Usa el endpoint compatible con OpenAI para modelos estándar y el endpoint multimedia para imagen y vídeo.',
    standardApi: 'Texto, multimodal y APIs estándar', mediaApi: 'Tareas directas de imagen y vídeo',
    workflowTitle: 'Diseñado para flujos reales', workflowBody: 'Pasa de la primera solicitud al diagnóstico de producción con accesos directos.',
    modelsTitle: 'Cambia de modelo, no de integración', modelsBody: 'Mantén la autenticación y el formato mientras eliges capacidades del catálogo.',
    reliabilityTitle: 'Cada solicitud es observable', reliabilityBody: 'Estado, ruta, latencia y uso permanecen en el mismo registro.',
    requestTrace: 'Traza de solicitud', startTitle: '¿Listo para tu primera solicitud?', startBody: 'Crea una API Key, copia el endpoint y usa tu SDK compatible con OpenAI.',
    textModels: 'Texto y agentes', mediaModels: 'Imagen y vídeo', routeLabel: 'Ruta', latencyLabel: 'Latencia', statusLabel: 'Estado',
  },
  'pt-BR': {
    live: 'Roteamento ao vivo', routeReady: 'Gateway online', endpointTitle: 'Uma integração, dois endpoints',
    endpointBody: 'Use o endpoint compatível com OpenAI para modelos padrão e o endpoint de mídia para imagem e vídeo.',
    standardApi: 'Texto, multimodal e APIs padrão', mediaApi: 'Tarefas diretas de imagem e vídeo',
    workflowTitle: 'Feito para fluxos reais', workflowBody: 'Da primeira requisição ao diagnóstico de produção com entradas práticas.',
    modelsTitle: 'Troque o modelo, não a integração', modelsBody: 'Mantenha autenticação e formato enquanto escolhe recursos no catálogo.',
    reliabilityTitle: 'Cada requisição é observável', reliabilityBody: 'Status, rota, latência e uso ficam no mesmo registro.',
    requestTrace: 'Rastreamento', startTitle: 'Pronto para a primeira requisição?', startBody: 'Crie uma API Key, copie o endpoint e use seu SDK compatível com OpenAI.',
    textModels: 'Texto e agentes', mediaModels: 'Imagem e vídeo', routeLabel: 'Rota', latencyLabel: 'Latência', statusLabel: 'Status',
  },
  fr: {
    live: 'Routage en direct', routeReady: 'Passerelle active', endpointTitle: 'Une intégration, deux endpoints',
    endpointBody: 'Utilisez le point compatible OpenAI pour les modèles standard et le point média pour image et vidéo.',
    standardApi: 'Texte, multimodal et APIs standard', mediaApi: 'Tâches image et vidéo directes',
    workflowTitle: 'Pensé pour les usages réels', workflowBody: 'De la première requête au diagnostic en production avec des accès concrets.',
    modelsTitle: 'Changez de modèle, pas d’intégration', modelsBody: 'Gardez l’authentification et le format en choisissant les capacités du catalogue.',
    reliabilityTitle: 'Chaque requête reste observable', reliabilityBody: 'État, routage, latence et usage restent liés au même enregistrement.',
    requestTrace: 'Trace de requête', startTitle: 'Prêt pour votre première requête ?', startBody: 'Créez une clé API, copiez le endpoint et utilisez votre SDK compatible OpenAI.',
    textModels: 'Texte et agents', mediaModels: 'Image et vidéo', routeLabel: 'Route', latencyLabel: 'Latence', statusLabel: 'État',
  },
  de: {
    live: 'Live-Routing', routeReady: 'Gateway online', endpointTitle: 'Eine Integration, zwei Endpunkte',
    endpointBody: 'Standardmodelle nutzen den OpenAI-kompatiblen Endpunkt, Bild und Video den Medien-Endpunkt.',
    standardApi: 'Text, multimodal und Standard-APIs', mediaApi: 'Direkte Bild- und Videoaufgaben',
    workflowTitle: 'Für echte Workflows gebaut', workflowBody: 'Vom ersten Request bis zur Produktionsanalyse mit direkten Einstiegen.',
    modelsTitle: 'Modelle wechseln, Integration behalten', modelsBody: 'Authentifizierung und Format bleiben gleich, während Sie Fähigkeiten auswählen.',
    reliabilityTitle: 'Jeder Request bleibt beobachtbar', reliabilityBody: 'Status, Route, Latenz und Nutzung bleiben in einem Datensatz.',
    requestTrace: 'Request-Trace', startTitle: 'Bereit für den ersten Request?', startBody: 'API-Key erstellen, Endpunkt kopieren und das bestehende OpenAI-kompatible SDK nutzen.',
    textModels: 'Text und Agents', mediaModels: 'Bild und Video', routeLabel: 'Route', latencyLabel: 'Latenz', statusLabel: 'Status',
  },
  ar: {
    live: 'توجيه مباشر', routeReady: 'البوابة متاحة', endpointTitle: 'تكامل واحد ونقطتا وصول',
    endpointBody: 'استخدم نقطة OpenAI المتوافقة للنماذج القياسية ونقطة الوسائط للصور والفيديو.',
    standardApi: 'النص والوسائط وواجهات API القياسية', mediaApi: 'مهام الصور والفيديو المباشرة',
    workflowTitle: 'مصمم لسير العمل الحقيقي', workflowBody: 'من الطلب الأول إلى تشخيص الإنتاج عبر مداخل عملية.',
    modelsTitle: 'غيّر النموذج لا التكامل', modelsBody: 'احتفظ بالمصادقة وبنية الطلب واختر القدرة المناسبة من الدليل.',
    reliabilityTitle: 'كل طلب قابل للمراقبة', reliabilityBody: 'تبقى الحالة والمسار وزمن الاستجابة والاستخدام في سجل واحد.',
    requestTrace: 'تتبع الطلب', startTitle: 'جاهز لإرسال أول طلب؟', startBody: 'أنشئ مفتاح API وانسخ نقطة الوصول واستخدم SDK متوافقاً مع OpenAI.',
    textModels: 'النص والوكلاء', mediaModels: 'الصور والفيديو', routeLabel: 'المسار', latencyLabel: 'الزمن', statusLabel: 'الحالة',
  },
  ja: {
    live: 'ライブ・ルーティング', routeReady: 'ゲートウェイ稼働中', endpointTitle: '1つの統合、2つのエンドポイント',
    endpointBody: '標準モデルは OpenAI 互換入口、画像・動画はメディア専用入口を使用します。',
    standardApi: 'テキスト・マルチモーダル・標準 API', mediaApi: '画像・動画の直接タスク',
    workflowTitle: '実際のワークフロー向け', workflowBody: '最初のリクエストから本番トラブルシュートまで直接進めます。',
    modelsTitle: '統合を変えずにモデルを変更', modelsBody: '認証とリクエスト形式を維持し、カタログから能力を選択します。',
    reliabilityTitle: 'すべてのリクエストを追跡', reliabilityBody: '状態、ルート、レイテンシ、使用量を同じ記録で確認できます。',
    requestTrace: 'リクエスト追跡', startTitle: '最初のリクエストを送りますか？', startBody: 'API Key を作成し、エンドポイントをコピーして既存 SDK から呼び出します。',
    textModels: 'テキストと Agent', mediaModels: '画像と動画', routeLabel: 'ルート', latencyLabel: '遅延', statusLabel: '状態',
  },
  id: {
    live: 'Routing langsung', routeReady: 'Gateway aktif', endpointTitle: 'Satu integrasi, dua endpoint',
    endpointBody: 'Gunakan endpoint kompatibel OpenAI untuk model standar dan endpoint media untuk gambar serta video.',
    standardApi: 'Teks, multimodal, dan API standar', mediaApi: 'Tugas gambar dan video langsung',
    workflowTitle: 'Dibuat untuk alur kerja nyata', workflowBody: 'Dari request pertama hingga diagnosis produksi melalui jalur yang langsung digunakan.',
    modelsTitle: 'Ganti model, bukan integrasi', modelsBody: 'Pertahankan autentikasi dan format request saat memilih kemampuan dari katalog.',
    reliabilityTitle: 'Setiap request dapat dipantau', reliabilityBody: 'Status, routing, latensi, dan penggunaan tetap dalam satu catatan.',
    requestTrace: 'Jejak request', startTitle: 'Siap mengirim request pertama?', startBody: 'Buat API Key, salin endpoint, lalu gunakan SDK yang kompatibel dengan OpenAI.',
    textModels: 'Teks dan agen', mediaModels: 'Gambar dan video', routeLabel: 'Rute', latencyLabel: 'Latensi', statusLabel: 'Status',
  },
  ru: {
    live: 'Маршрутизация онлайн', routeReady: 'Шлюз работает', endpointTitle: 'Одна интеграция, две точки входа',
    endpointBody: 'Стандартные модели используют OpenAI-совместимый endpoint, изображения и видео — медиа endpoint.',
    standardApi: 'Текст, мультимодальность и стандартные API', mediaApi: 'Прямые задачи изображений и видео',
    workflowTitle: 'Для реальных рабочих процессов', workflowBody: 'От первого запроса до диагностики production через практичные точки входа.',
    modelsTitle: 'Меняйте модель, не интеграцию', modelsBody: 'Сохраняйте авторизацию и формат запроса, выбирая возможности из каталога.',
    reliabilityTitle: 'Каждый запрос наблюдаем', reliabilityBody: 'Статус, маршрут, задержка и использование остаются в одной записи.',
    requestTrace: 'Трассировка запроса', startTitle: 'Готовы отправить первый запрос?', startBody: 'Создайте API-ключ, скопируйте endpoint и используйте существующий OpenAI-совместимый SDK.',
    textModels: 'Текст и агенты', mediaModels: 'Изображения и видео', routeLabel: 'Маршрут', latencyLabel: 'Задержка', statusLabel: 'Статус',
  },
  ko: {
    live: '실시간 라우팅', routeReady: '게이트웨이 정상', endpointTitle: '하나의 통합, 두 개의 엔드포인트',
    endpointBody: '표준 모델은 OpenAI 호환 엔드포인트를, 이미지와 비디오는 미디어 엔드포인트를 사용합니다.',
    standardApi: '텍스트, 멀티모달 및 표준 API', mediaApi: '이미지 및 비디오 직접 작업',
    workflowTitle: '실제 워크플로우 중심', workflowBody: '첫 요청부터 프로덕션 문제 해결까지 바로 실행할 수 있습니다.',
    modelsTitle: '통합은 유지하고 모델만 변경', modelsBody: '동일한 인증과 요청 형식으로 카탈로그에서 필요한 기능을 선택합니다.',
    reliabilityTitle: '모든 요청을 관찰 가능하게', reliabilityBody: '상태, 라우팅 결과, 지연 시간과 사용량을 한 기록에서 확인합니다.',
    requestTrace: '요청 추적', startTitle: '첫 요청을 보낼 준비가 되었나요?', startBody: 'API Key를 만들고 엔드포인트를 복사한 뒤 기존 OpenAI 호환 SDK를 사용하세요.',
    textModels: '텍스트와 Agent', mediaModels: '이미지와 비디오', routeLabel: '경로', latencyLabel: '지연', statusLabel: '상태',
  },
  vi: {
    live: 'Định tuyến trực tiếp', routeReady: 'Gateway đang hoạt động', endpointTitle: 'Một tích hợp, hai endpoint',
    endpointBody: 'Dùng endpoint tương thích OpenAI cho mô hình chuẩn và endpoint media cho ảnh, video.',
    standardApi: 'Văn bản, đa phương thức và API chuẩn', mediaApi: 'Tác vụ ảnh và video trực tiếp',
    workflowTitle: 'Xây dựng cho quy trình thực tế', workflowBody: 'Đi từ request đầu tiên đến xử lý sự cố production bằng các lối vào rõ ràng.',
    modelsTitle: 'Đổi mô hình, không đổi tích hợp', modelsBody: 'Giữ nguyên xác thực và định dạng request khi chọn khả năng từ danh mục.',
    reliabilityTitle: 'Mọi request đều quan sát được', reliabilityBody: 'Trạng thái, định tuyến, độ trễ và mức dùng nằm trong cùng một bản ghi.',
    requestTrace: 'Theo dõi request', startTitle: 'Sẵn sàng gửi request đầu tiên?', startBody: 'Tạo API Key, sao chép endpoint và dùng SDK tương thích OpenAI hiện có.',
    textModels: 'Văn bản và agent', mediaModels: 'Ảnh và video', routeLabel: 'Tuyến', latencyLabel: 'Độ trễ', statusLabel: 'Trạng thái',
  },
}

const WORKFLOW_ICONS = [Code2, Network, CircleGauge] as const

export default function LocalizedLandingPage() {
  const { locale } = useLocale()
  const copy = getLocaleCopy(locale)
  const labels = HOME_LABELS[locale]
  const getKeyUrl = buildAgentActivationUrl({
    locale,
    surface: 'home_primary',
    intent: 'api_access',
    destination: 'keys',
  })
  const imageStudioUrl = buildAgentActivationUrl({
    locale,
    surface: 'home_media',
    intent: 'image_api',
    destination: 'image-studio',
  })
  const featuredModels = FEATURED_SLUGS.slice(0, 5)
    .map(findModel)
    .filter(model => model != null)

  return (
    <div className="home-surface" dir={LOCALE_CONFIG[locale].direction}>
      <Seo
        title={copy.siteName}
        description={copy.home.description}
        path="/"
        structuredData={websiteStructuredData(locale, '/')}
      />

      <section className="home-hero relative isolate overflow-hidden border-b border-white/8">
        <div aria-hidden className="home-noise pointer-events-none absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-[88rem] gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[minmax(0,0.92fr)_minmax(34rem,1.08fr)] lg:items-center lg:px-8 lg:pb-28 lg:pt-28">
          <div className="min-w-0 max-w-3xl">
            <div className="inline-flex items-center gap-2 border-l-2 border-[#9ee77d] pl-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b8f39d]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9ee77d] shadow-[0_0_14px_rgba(158,231,125,0.9)]" />
              {copy.home.eyebrow}
            </div>
            <h1 className="mt-7 max-w-[12ch] text-balance text-[clamp(3rem,7vw,6.8rem)] font-extrabold leading-[0.92] tracking-[-0.065em] text-white">
              {copy.home.title}
            </h1>
            <p className="mt-7 max-w-[62ch] text-pretty text-base leading-8 text-ink-300 sm:text-lg">
              {copy.home.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={getKeyUrl} className="home-button-primary inline-flex min-h-12 items-center gap-2 px-5 text-sm font-bold text-[#071006]">
                <KeyRound className="h-4 w-4" aria-hidden="true" />
                {copy.home.getKey}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link to={localizePath('/docs/quickstart/', locale)} className="home-button-secondary inline-flex min-h-12 items-center gap-2 px-5 text-sm font-semibold text-white">
                <Code2 className="h-4 w-4 text-[#9ee77d]" aria-hidden="true" />
                {copy.home.quickstart}
              </Link>
              <Link to={localizedContentPath('/docs/api/chat-completions/', locale)} className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold text-ink-300 transition-colors hover:text-white">
                {copy.home.apiReference}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/8 pt-5 text-xs text-ink-400">
              {[labels.textModels, labels.mediaModels, 'OpenAI Compatible'].map(item => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#9ee77d]" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="home-console relative min-w-0 lg:translate-x-4">
            <div className="home-console-bar flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2 font-mono text-[11px] text-ink-400">
                <span className="h-2 w-2 rounded-full bg-[#9ee77d] shadow-[0_0_12px_rgba(158,231,125,0.8)]" />
                gateway.gpt88.cc
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9ee77d]">{labels.routeReady}</span>
            </div>

            <div className="grid min-w-0 gap-px bg-white/8 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="min-w-0 bg-[#0b0f14] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">POST /v1/chat/completions</span>
                  <span className="border border-[#9ee77d]/30 bg-[#9ee77d]/8 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#b8f39d]">{labels.live}</span>
                </div>
                <pre className="mt-6 max-w-full overflow-x-auto font-mono text-[12px] leading-6 text-ink-300"><code>{CURL_EXAMPLE}</code></pre>
              </div>

              <aside className="min-w-0 bg-[#080b0f] p-5 sm:p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">{labels.requestTrace}</div>
                <div className="mt-5 space-y-5">
                  <div>
                    <div className="text-[11px] text-ink-500">{labels.routeLabel}</div>
                    <div className="mt-1 font-mono text-xs text-white">grok-4.6 → route-03</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-y border-white/8 py-4">
                    <div>
                      <div className="text-[11px] text-ink-500">{labels.latencyLabel}</div>
                      <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-white">842ms</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-ink-500">{labels.statusLabel}</div>
                      <div className="mt-1 font-mono text-lg font-semibold text-[#9ee77d]">200 OK</div>
                    </div>
                  </div>
                  <div className="space-y-2 font-mono text-[10px] text-ink-500">
                    <div className="flex justify-between gap-3"><span>request_id</span><span className="text-ink-300">req_88a4f2</span></div>
                    <div className="flex justify-between gap-3"><span>input</span><span className="text-ink-300">1,286 tok</span></div>
                    <div className="flex justify-between gap-3"><span>output</span><span className="text-ink-300">372 tok</span></div>
                  </div>
                </div>
              </aside>
            </div>

            <div className="grid gap-px bg-white/8 sm:grid-cols-3">
              {copy.home.cards.map((card, index) => (
                <div key={card.title} className="bg-[#0a0e12] p-4">
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#9ee77d]">0{index + 1}</div>
                  <div className="mt-2 text-xs font-semibold text-ink-100">{card.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8">
        <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
            <div>
              <div className="home-kicker">API architecture</div>
              <h2 className="mt-4 max-w-[13ch] text-balance text-3xl font-bold tracking-[-0.04em] text-white sm:text-5xl">{labels.endpointTitle}</h2>
            </div>
            <p className="max-w-2xl text-pretty text-base leading-7 text-ink-300 lg:justify-self-end">{labels.endpointBody}</p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-white/8 bg-white/8 lg:grid-cols-2">
            <EndpointPanel
              index="01"
              title="api.gpt88.cc/v1"
              description={labels.standardApi}
              icon={<Layers3 className="h-5 w-5" />}
              link={localizedContentPath('/docs/api/chat-completions/', locale)}
            />
            <EndpointPanel
              index="02"
              title="img.gpt88.cc"
              description={labels.mediaApi}
              icon={<Globe2 className="h-5 w-5" />}
              href={imageStudioUrl}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-white/8">
        <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="home-kicker">Developer workflow</div>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.04em] text-white sm:text-5xl">{labels.workflowTitle}</h2>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-ink-300">{labels.workflowBody}</p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            {copy.home.cards.map((card, index) => {
              const Icon = WORKFLOW_ICONS[index] ?? Zap
              const classes = index === 0 ? 'lg:col-span-5 lg:row-span-2' : index === 1 ? 'lg:col-span-7' : 'lg:col-span-7'
              return (
                <article key={card.title} className={`home-workflow-card ${classes}`}>
                  <div className="flex items-start justify-between gap-5">
                    <span className="home-icon-box"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-ink-600">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-white">{card.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-sm leading-7 text-ink-300">{card.body}</p>
                  {index === 0 ? (
                    <div className="mt-10 space-y-3 border-t border-white/8 pt-5 font-mono text-[11px] text-ink-400">
                      <div className="flex items-center justify-between gap-4"><span>base_url</span><span className="text-[#b8f39d]">api.gpt88.cc/v1</span></div>
                      <div className="flex items-center justify-between gap-4"><span>auth</span><span className="text-ink-200">Bearer sk-••••</span></div>
                      <div className="flex items-center justify-between gap-4"><span>format</span><span className="text-ink-200">OpenAI JSON</span></div>
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-white/8">
        <div className="mx-auto grid max-w-[88rem] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="home-kicker">Model catalog</div>
            <h2 className="mt-4 max-w-[12ch] text-balance text-3xl font-bold tracking-[-0.04em] text-white sm:text-5xl">{labels.modelsTitle}</h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-ink-300">{labels.modelsBody}</p>
            <Link to={localizedContentPath('/models/', locale)} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#b8f39d] hover:text-white">
              {copy.home.links.models}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="border-y border-white/8">
            {featuredModels.map((model, index) => (
              <Link key={model.slug} to={localizedContentPath(`/models/${model.slug}/`, locale)} className="group grid gap-4 border-b border-white/8 px-1 py-6 last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center">
                <span className="font-mono text-[10px] text-ink-600">0{index + 1}</span>
                <span>
                  <span className="block text-lg font-semibold tracking-[-0.02em] text-white transition-colors group-hover:text-[#b8f39d]">{model.name}</span>
                  <span className="mt-1 block font-mono text-[11px] text-ink-500">{model.provider} / {model.modelId}</span>
                </span>
                <ArrowRight className="hidden h-4 w-4 text-ink-600 transition-all group-hover:translate-x-1 group-hover:text-[#9ee77d] sm:block" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/8">
        <div className="mx-auto grid max-w-[88rem] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-24">
          <div className="home-observability-panel p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="home-kicker">Observability</div>
              <ShieldCheck className="h-5 w-5 text-[#9ee77d]" aria-hidden="true" />
            </div>
            <div className="mt-8 grid grid-cols-3 gap-px bg-white/8">
              {[
                [labels.statusLabel, '99.94%'],
                [labels.latencyLabel, '842ms'],
                [labels.routeLabel, '03 / 05'],
              ].map(([label, value]) => (
                <div key={label} className="bg-[#0b0f14] p-4">
                  <div className="text-[10px] text-ink-500">{label}</div>
                  <div className="mt-2 font-mono text-lg font-semibold tabular-nums text-white">{value}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-4">
              {[82, 64, 91, 47].map((width, index) => (
                <div key={width} className="grid grid-cols-[5rem_1fr_3rem] items-center gap-3 font-mono text-[10px] text-ink-500">
                  <span>route-0{index + 1}</span>
                  <span className="h-1 overflow-hidden bg-white/6"><span className="block h-full bg-[#9ee77d]" style={{ width: `${width}%` }} /></span>
                  <span className="text-right text-ink-300">{width}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="home-kicker">Request ledger</div>
            <h2 className="mt-4 max-w-[13ch] text-balance text-3xl font-bold tracking-[-0.04em] text-white sm:text-5xl">{labels.reliabilityTitle}</h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-ink-300">{labels.reliabilityBody}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[copy.home.links.billing, copy.home.links.overview].map((item, index) => (
                <Link key={item} to={index === 0 ? localizePath('/docs/auth/', locale) : localizePath('/docs/overview/', locale)} className="home-inline-link">
                  <span>{item}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8">
        <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <ActivationQuickStarts surface="home" />
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="home-final-cta relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
            <div aria-hidden className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(158,231,125,0.18),transparent_65%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="home-kicker">GPT88 / API</div>
                <h2 className="mt-4 max-w-[15ch] text-balance text-3xl font-bold tracking-[-0.04em] text-white sm:text-5xl">{labels.startTitle}</h2>
                <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-ink-300">{labels.startBody}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={getKeyUrl} className="home-button-primary inline-flex min-h-12 items-center gap-2 px-5 text-sm font-bold text-[#071006]">
                  {copy.home.getKey}<ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link to={localizePath('/docs/quickstart/', locale)} className="home-button-secondary inline-flex min-h-12 items-center gap-2 px-5 text-sm font-semibold text-white">
                  {copy.home.links.fiveMinutes}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function EndpointPanel({
  index,
  title,
  description,
  icon,
  link,
  href,
}: {
  index: string
  title: string
  description: string
  icon: React.ReactNode
  link?: string
  href?: string
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className="home-icon-box">{icon}</span>
        <span className="font-mono text-[10px] tracking-[0.18em] text-ink-600">{index}</span>
      </div>
      <h3 className="mt-10 break-all font-mono text-lg font-semibold text-white sm:text-xl">{title}</h3>
      <p className="mt-3 max-w-[52ch] text-sm leading-7 text-ink-300">{description}</p>
      <ArrowRight className="mt-8 h-4 w-4 text-[#9ee77d] transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </>
  )

  const className = 'group bg-[#0a0e12] p-6 transition-colors hover:bg-[#0d1317] sm:p-8'
  if (link) return <Link to={link} className={className}>{content}</Link>
  return <a href={href} className={className}>{content}</a>
}
