import { Link } from 'react-router-dom'
import { strings as s } from '../../lib/i18n'

export default function CtaSection() {
  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-purple-600 to-pink-600 p-8 text-center text-white shadow-2xl lg:p-14">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <h2 className="mb-4 font-display text-3xl font-bold lg:text-5xl">{s.ctaTitle}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">{s.ctaSubtitle}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/tools/images"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-brand-600 shadow-xl transition hover:bg-slate-100"
              >
                {s.ctaButton}
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
