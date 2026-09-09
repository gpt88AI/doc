import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  getBlogMetaLocalized,
} from '../../data/blog'
import { Seo } from '../../components/seo/Seo'
import { websiteStructuredData } from '../../components/seo/structuredData'
import { localizedContentPath, useLocale } from '../../lib/locale'

const RELATED_GUIDES = [
  { path: '/docs/guides/gpt88-ai-proxy/', title: 'gpt88 AI 中转站' },
  { path: '/docs/guides/agent-image-studio/', title: 'Agent 图片工作台教程' },
  { path: '/docs/guides/async-image-generation-guide/', title: '异步生图 API 详细教程' },
  { path: '/docs/guides/gpt-image-2-service-notice/', title: 'GPT-Image-2 生图服务通知与选型指南' },
  { path: '/docs/guides/model-price-comparison/', title: 'GPT、Claude、Gemini API 价格对比' },
  { path: '/docs/guides/billing-units/', title: '人民币余额与 USD 充值结算' },
  { path: '/docs/guides/ai-video-storyboard-guide/', title: 'AI 视频分镜与提示词教程' },
  { path: '/docs/guides/gpt88-docs-map/', title: 'gpt88 产品与文档地图' },
]

const CATEGORY_EN: Record<string, string> = {
  图像生成: 'Image Generation',
  AI工具指南: 'AI Tool Guides',
  API开发: 'API Development',
  Gemini专题: 'Gemini Special',
  模型对比: 'Model Comparison',
  技术教程: 'Technical Tutorials',
  开发工具: 'Developer Tools',
}

const BLOG_INDEX_COPY: Record<string, { title: string; description: string; search: string; all: string; related: string; empty: string }> = {
  zh: { title: 'GPT88 技术博客', description: '围绕模型接入、图片生成、API 集成与工程实践的实用文章，由 gpt88.cc 维护。', search: '搜索文章…', all: '全部', related: '相关指南', empty: '没有符合筛选条件的文章。' },
  en: { title: 'GPT88 Technical Blog', description: 'Practical guides on AI model access, image generation, API integration, and engineering practice — maintained by gpt88.cc.', search: 'Search articles…', all: 'All', related: 'Related Guides', empty: 'No articles match your filters.' },
  hi: { title: 'GPT88 तकनीकी ब्लॉग', description: 'AI मॉडल एक्सेस, इमेज जनरेशन, API इंटीग्रेशन और इंजीनियरिंग पर व्यावहारिक गाइड।', search: 'लेख खोजें…', all: 'सभी', related: 'संबंधित गाइड', empty: 'आपके फ़िल्टर से कोई लेख नहीं मिला।' },
  bn: { title: 'GPT88 প্রযুক্তি ব্লগ', description: 'AI মডেল, ছবি তৈরি, API ইন্টিগ্রেশন এবং ইঞ্জিনিয়ারিং নিয়ে ব্যবহারিক গাইড।', search: 'নিবন্ধ খুঁজুন…', all: 'সব', related: 'সম্পর্কিত গাইড', empty: 'আপনার ফিল্টারের সঙ্গে কোনো নিবন্ধ মেলেনি।' },
  ur: { title: 'GPT88 تکنیکی بلاگ', description: 'AI ماڈل، امیج جنریشن، API انٹیگریشن اور انجینئرنگ کے عملی رہنما۔', search: 'مضامین تلاش کریں…', all: 'سب', related: 'متعلقہ رہنما', empty: 'آپ کے فلٹر سے کوئی مضمون نہیں ملا۔' },
  ta: { title: 'GPT88 தொழில்நுட்ப வலைப்பதிவு', description: 'AI மாதிரிகள், பட உருவாக்கம், API ஒருங்கிணைப்பு மற்றும் பொறியியல் குறித்த நடைமுறை வழிகாட்டிகள்.', search: 'கட்டுரைகளைத் தேடுங்கள்…', all: 'அனைத்தும்', related: 'தொடர்புடைய வழிகாட்டிகள்', empty: 'உங்கள் வடிகட்டிகளுக்கு கட்டுரைகள் இல்லை.' },
  ne: { title: 'GPT88 प्राविधिक ब्लग', description: 'AI मोडेल, छवि निर्माण, API एकीकरण र इन्जिनियरिङका व्यावहारिक गाइडहरू।', search: 'लेख खोज्नुहोस्…', all: 'सबै', related: 'सम्बन्धित गाइड', empty: 'तपाईंका फिल्टरसँग कुनै लेख मिलेन्।' },
  si: { title: 'GPT88 තාක්ෂණික බ්ලොගය', description: 'AI මාදිලි, රූප නිර්මාණය, API ඒකාබද්ධ කිරීම සහ ඉංජිනේරුකරණය පිළිබඳ ප්‍රායෝගික මාර්ගෝපදේශ.', search: 'ලිපි සොයන්න…', all: 'සියල්ල', related: 'අදාළ මාර්ගෝපදේශ', empty: 'ඔබේ පෙරහන්වලට ගැළපෙන ලිපි නැත.' },
}

export default function BlogIndexPage() {
  const { locale } = useLocale()
  const copy = BLOG_INDEX_COPY[locale] ?? BLOG_INDEX_COPY.en
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') ?? ''
  const activeCategory = searchParams.get('category') ?? '全部'

  const setFilter = (next: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(next)) {
      if (value == null || value === '') params.delete(key)
      else params.set(key, value)
    }
    setSearchParams(params, { replace: true })
  }

  const posts = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return BLOG_POSTS.filter(post => {
      if (activeCategory !== '全部' && post.category !== activeCategory) return false
      if (!keyword) return true
      const meta = getBlogMetaLocalized(post.slug, locale)
      const haystack = [meta?.title, post.title, post.description, ...post.tags].join(' ').toLowerCase()
      return haystack.includes(keyword)
    })
  }, [query, activeCategory, locale])

  const title = copy.title
  const description = copy.description

  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/docs/blog/"
        type="website"
        structuredData={websiteStructuredData(locale, '/docs/blog/')}
      />
      <div className="min-w-0 flex-1">
        <header className="mb-8 border-b border-white/5 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-ink-50">{title}</h1>
          <p className="mt-3 max-w-2xl text-base text-ink-300">{description}</p>
        </header>

        {/* 搜索 + 分类过滤 */}
        <div className="mb-6 flex flex-col gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <input
              type="search"
              name="query"
              value={query}
              onChange={event => setFilter({ query: event.target.value })}
              placeholder={copy.search}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-ink-100 outline-none transition-colors placeholder:text-ink-500 focus:border-violet-500/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter({ category: null })}
              className={
                'rounded-full border px-3 py-1 text-xs transition-colors ' +
                (activeCategory === '全部'
                  ? 'border-violet-500/50 bg-violet-500/15 text-violet-200'
                  : 'border-white/10 bg-white/[0.02] text-ink-300 hover:border-violet-500/30')
              }
            >
              {copy.all}
            </button>
            {BLOG_CATEGORIES.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter({ category })}
                className={
                  'rounded-full border px-3 py-1 text-xs transition-colors ' +
                  (activeCategory === category
                    ? 'border-violet-500/50 bg-violet-500/15 text-violet-200'
                    : 'border-white/10 bg-white/[0.02] text-ink-300 hover:border-violet-500/30')
                }
              >
              {locale === 'en' ? CATEGORY_EN[category] ?? category : category}
              </button>
            ))}
          </div>
        </div>

        {/* 文章卡片网格 */}
        {posts.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {posts.map(post => {
              const meta = getBlogMetaLocalized(post.slug, locale) ?? post
              return (
                <Link
                  key={post.slug}
                  to={localizedContentPath(`/docs/blog/${post.slug}`, locale)}
                  className="group flex flex-col rounded-lg border border-white/5 p-4 transition-colors hover:border-violet-500/40 hover:bg-violet-500/5"
                >
                  <div className="flex items-center gap-2 text-[11px] text-ink-400">
                    <span className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5">
                      {locale === 'en' ? CATEGORY_EN[meta.category] ?? meta.category : meta.category}
                    </span>
                    <span>{meta.date}</span>
                  </div>
                  <h2 className="mt-2 text-[15px] font-semibold leading-snug text-ink-100 group-hover:text-violet-200">
                    {meta.title}
                  </h2>
                  <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink-300">
                    {meta.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {meta.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[11px] text-ink-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-white/5 p-8 text-center text-sm text-ink-400">
            {copy.empty}
          </div>
        )}

        {/* 相关指南 */}
        <section className="mt-12 border-t border-white/5 pt-8">
          <h2 className="text-lg font-semibold text-ink-100">
            {copy.related}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {RELATED_GUIDES.map(guide => (
              <Link
                key={guide.path}
                to={localizedContentPath(guide.path, locale)}
                className="rounded-lg border border-white/5 p-3.5 text-sm text-ink-300 transition-colors hover:border-violet-500/40 hover:bg-violet-500/5 hover:text-violet-200"
              >
                {guide.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
