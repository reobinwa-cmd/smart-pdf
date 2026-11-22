import { Link } from 'react-router-dom'
import { useLang, type Lang } from '../lib/lang'

interface ToolCard {
  to: string
  title: Record<Lang, string>
  desc: Record<Lang, string>
  tags: string[]
  soon?: boolean
  gradient?: string
  shadow?: string
  icon?: string
}

const tools: ToolCard[] = [
  {
    to: '/tools/images',
    title: { ar: 'أداة الصور', fr: 'Outil Images', en: 'Image Tool' },
    desc: { ar: 'ضغط وتحويل الصور (JPG, PNG, WebP, HEIC) — محلياً بالكامل', fr: 'Compresser et convertir vos images (JPG, PNG, WebP, HEIC) — 100 % local', en: 'Compress and convert images (JPG, PNG, WebP, HEIC) — fully local' },
    tags: ['JPG', 'PNG', 'WebP', 'HEIC'],
    gradient: 'from-brand-500 to-purple-600',
    shadow: 'shadow-brand-500/20',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    to: '/tools/pdf',
    title: { ar: 'أدوات PDF', fr: 'Outils PDF', en: 'PDF Tools' },
    desc: { ar: 'تحويل الصور إلى PDF، دمج وتقسيم ملفات PDF', fr: 'Images vers PDF, fusion et division de PDF', en: 'Images to PDF, merge and split PDFs' },
    tags: ['PDF', 'JPG', 'PNG'],
    gradient: 'from-cyan-500 to-blue-600',
    shadow: 'shadow-cyan-500/20',
    icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  },
  {
    to: '',
    title: { ar: 'Word إلى PDF', fr: 'Word vers PDF', en: 'Word to PDF' },
    desc: { ar: 'تحويل مستندات Word إلى PDF مع الحفاظ على التنسيق', fr: 'Convertissez vos documents Word en PDF', en: 'Convert Word documents to PDF' },
    tags: [],
    soon: true,
  },
  {
    to: '',
    title: { ar: 'استخراج النص (OCR)', fr: 'Extraction de texte (OCR)', en: 'Text extraction (OCR)' },
    desc: { ar: 'استخراج النصوص من الصور والمستندات الممسوحة', fr: 'Extrayez le texte des images et documents scannés', en: 'Extract text from images and scanned docs' },
    tags: [],
    soon: true,
  },
]

export default function HomePage() {
  const { lang, t } = useLang()

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-grid">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="absolute top-40 -left-32 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />
        <div className="absolute -bottom-32 right-1/3 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              {t.homeBadge}
            </div>
            <h1 className="mb-6 font-display text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              {t.homeTitle1}{' '}
              <span className="text-gradient">{t.homeTitle2}</span>
              <br />
              {t.homeTitle3}
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-lg text-slate-600 lg:text-xl">{t.homeSubtitle}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/tools/images"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-brand-600 to-purple-600 px-7 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/30"
              >
                {t.homeCta}
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <a
                href="#tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
              >
                {t.homeCta2}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-600">Tools</span>
            <h2 className="mt-3 mb-4 font-display text-3xl font-bold lg:text-4xl">{t.toolsTitle}</h2>
            <p className="text-lg text-slate-600">{t.toolsSubtitle}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) =>
              tool.soon ? (
                <div key={tool.title[lang]} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 opacity-70">
                  <div className="absolute left-4 top-4 rounded-full bg-slate-200 px-2 py-1 text-[10px] font-bold text-slate-600">
                    {t.comingSoon}
                  </div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-200">
                    <svg className="h-6 w-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-bold text-lg text-slate-700">{tool.title[lang]}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{tool.desc[lang]}</p>
                </div>
              ) : (
                <Link
                  key={tool.title[lang]}
                  to={tool.to}
                  className="group relative rounded-2xl border border-slate-200 bg-white p-6 card-hover hover:border-brand-300"
                >
                  <div className={`absolute left-4 top-4 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700`}>
                    {t.available}
                  </div>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} shadow-lg ${tool.shadow}`}>
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-bold text-lg transition group-hover:text-brand-600">{tool.title[lang]}</h3>
                  <p className="mb-3 text-sm leading-relaxed text-slate-600">{tool.desc[lang]}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="rounded bg-slate-100 px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
