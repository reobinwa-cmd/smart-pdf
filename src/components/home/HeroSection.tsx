import { Link } from 'react-router-dom'
import { useLang } from '../../lib/lang'
import { strings as s } from '../../lib/i18n'

export default function HeroSection() {
  const { t } = useLang()

  return (
    <section className="relative overflow-hidden bg-grid">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="absolute top-40 -left-32 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />
      <div className="absolute -bottom-32 right-1/3 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        {/* Text */}
        <div className="text-center lg:text-right">
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

          <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0 lg:text-xl">
            {t.homeSubtitle}
          </p>

          <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
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

          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 lg:justify-start">
            {[s.heroCheck1, s.heroCheck2, s.heroCheck3].map((label) => (
              <div key={label} className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Mockup */}
        <div className="relative animate-float">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-500 to-purple-600 opacity-20 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-brand-500/10">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs font-medium text-slate-500">{s.toolImagesTitle}</span>
            </div>
            <div className="space-y-4 p-5">
              <div className="rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50/50 p-6 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 shadow-lg shadow-brand-500/30">
                  <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.9 5 5 0 019.9-1.1A4.5 4.5 0 1115.5 16H7z" />
                  </svg>
                </div>
                <p className="mb-1 text-sm font-bold text-slate-800">{s.dropTitle}</p>
                <p className="text-xs text-slate-500">HEIC · JPG · PNG · WebP</p>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">صورة-العائلة.HEIC</p>
                  <p className="text-xs text-slate-500">4.2 MB</p>
                </div>
                <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500">{s.format}</label>
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800">
                    JPG
                    <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500">{s.quality}</label>
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800">
                    85%
                  </div>
                </div>
              </div>

              <button className="w-full rounded-xl bg-gradient-to-l from-brand-600 to-purple-600 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/30">
                {s.process}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
