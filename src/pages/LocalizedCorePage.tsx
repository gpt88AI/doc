import { DocPage } from '../components/layout/DocPage'
import { CodeBlock } from '../components/ui/CodeBlock'
import { buildAgentActivationUrl } from '../lib/activationLinks'
import { useLocale, type Locale } from '../lib/locale'
import { getLocaleCopy } from '../lib/localeCopy'

type CoreKind = 'overview' | 'auth' | 'faq'

type CoreExtraCopy = {
  authHeading: string
  faqBody: string
}

const CORE_EXTRA_COPY: Record<Locale, CoreExtraCopy> = {
  zh: {
    authHeading: 'Authorization 请求头',
    faqBody: '在发送生产流量前，先调用模型列表接口，确认 API Key 可以访问所需模型。',
  },
  en: {
    authHeading: 'Authorization header',
    faqBody: 'Use the model list endpoint to confirm that your API key can access the requested model before sending production traffic.',
  },
  'zh-TW': {
    authHeading: 'Authorization 請求標頭',
    faqBody: '傳送正式流量前，先呼叫模型清單端點，確認 API Key 可以存取所需模型。',
  },
  es: {
    authHeading: 'Encabezado Authorization',
    faqBody: 'Antes de enviar tráfico de producción, usa el endpoint de modelos para confirmar que tu API Key puede acceder al modelo solicitado.',
  },
  'pt-BR': {
    authHeading: 'Cabeçalho Authorization',
    faqBody: 'Antes de enviar tráfego de produção, use o endpoint de modelos para confirmar que sua API Key pode acessar o modelo solicitado.',
  },
  fr: {
    authHeading: 'En-tête Authorization',
    faqBody: 'Avant tout trafic de production, utilisez l’endpoint des modèles pour confirmer que votre clé API peut accéder au modèle demandé.',
  },
  de: {
    authHeading: 'Authorization-Header',
    faqBody: 'Prüfe vor dem Produktionsbetrieb über den Modell-Endpunkt, ob dein API-Key auf das gewünschte Modell zugreifen kann.',
  },
  ar: {
    authHeading: 'ترويسة Authorization',
    faqBody: 'استخدم نقطة نهاية قائمة النماذج للتأكد من أن مفتاح API يستطيع الوصول إلى النموذج المطلوب قبل إرسال حركة الإنتاج.',
  },
  ja: {
    authHeading: 'Authorization ヘッダー',
    faqBody: '本番トラフィックを送る前にモデル一覧エンドポイントを呼び出し、API Key で対象モデルにアクセスできることを確認してください。',
  },
  id: {
    authHeading: 'Header Authorization',
    faqBody: 'Sebelum mengirim traffic produksi, gunakan endpoint daftar model untuk memastikan API Key dapat mengakses model yang diminta.',
  },
  ru: {
    authHeading: 'Заголовок Authorization',
    faqBody: 'Перед отправкой production-трафика вызовите список моделей и убедитесь, что API Key имеет доступ к нужной модели.',
  },
  ko: {
    authHeading: 'Authorization 헤더',
    faqBody: '운영 트래픽을 보내기 전에 모델 목록 엔드포인트를 호출하여 API Key가 필요한 모델에 접근할 수 있는지 확인하세요.',
  },
  vi: {
    authHeading: 'Header Authorization',
    faqBody: 'Trước khi gửi lưu lượng production, hãy gọi endpoint danh sách mô hình để xác nhận API Key có quyền truy cập mô hình cần dùng.',
  },
}

export default function LocalizedCorePage({ kind }: { kind: CoreKind }) {
  const { locale } = useLocale()
  const copy = getLocaleCopy(locale).core[kind]
  const extra = CORE_EXTRA_COPY[locale]
  const path = `/docs/${kind === 'overview' ? 'overview' : kind}`
  const secondaryHeading = kind === 'auth' ? extra.authHeading : kind === 'faq' ? 'GET /v1/models' : null
  const faqKeyUrl = buildAgentActivationUrl({
    locale,
    surface: 'faq_get_key',
    intent: 'api_access',
    destination: 'keys',
  })

  return (
    <DocPage
      path={path}
      title={copy.title}
      description={copy.description}
      headings={[
        { id: 'main', text: copy.heading, level: 2 },
        ...(secondaryHeading
          ? [{ id: kind === 'auth' ? 'headers' : 'verification', text: secondaryHeading, level: 2 as const }]
          : []),
      ]}
    >
      <h2 id="main">{copy.heading}</h2>
      <p>{copy.body}</p>
      <ul>{copy.bullets.map(item => <li key={item}>{item}</li>)}</ul>
      {kind === 'auth' ? (
        <>
          <h2 id="headers">{extra.authHeading}</h2>
          <CodeBlock lang="http" code={'Authorization: Bearer $GPT88_API_KEY\nContent-Type: application/json'} />
        </>
      ) : null}
      {kind === 'faq' ? (
        <>
          <p>
            <a href={faqKeyUrl} target="_blank" rel="noreferrer">
              {getLocaleCopy(locale).home.getKey}
            </a>
          </p>
          <h2 id="verification">GET /v1/models</h2>
          <p>{extra.faqBody}</p>
        </>
      ) : null}
    </DocPage>
  )
}
