import { strings as s } from '../../lib/i18n'

const CheckIcon = () => (
  <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const points = [
  { title: s.privacyPoint1Title, desc: s.privacyPoint1Desc },
  { title: s.privacyPoint2Title, desc: s.privacyPoint2Desc },
  { title: s.privacyPoint3Title, desc: s.privacyPoint3Desc },
]

const rows = [
  { label: s.privacyRow1, value: s.privacyNone },
  { label: s.privacyRow2, value: s.privacyNone },
  { label: s.privacyRow3, value: s.privacyNone },
  { label: s.privacyRow4, value: s.privacyRow4Value },
]

export default function PrivacySection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 py-20 text-white lg:py-28">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur">
            <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            {s.privacyBadge}
          </div>

          <h2 className="mb-6 font-display text-3xl font-bold leading-tight lg:text-5xl">
            {s.privacyTitle1} <span className="text-gradient">{s.privacyTitle2}</span>
            <br />
            {s.privacyTitle3}
          </h2>

          <p className="mb-8 text-lg leading-relaxed text-slate-300">{s.privacySubtitle}</p>

          <div className="space-y-4">
            {points.map((p) => (
              <div key={p.title} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/20">
                  <CheckIcon />
                </div>
                <div>
                  <p className="mb-1 font-semibold">{p.title}</p>
                  <p className="text-sm text-slate-400">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-400/20 blur-2xl" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-2xl shadow-emerald-500/30">
                <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="mb-6 text-center">
                <p className="mb-1 text-sm text-slate-400">{s.privacyLevel}</p>
                <p className="text-3xl font-bold">{s.privacyLevelValue}</p>
              </div>
              <div className="space-y-3">
                {rows.map((r) => (
                  <div key={r.label} className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{r.label}</span>
                    <span className="font-semibold text-emerald-400">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
