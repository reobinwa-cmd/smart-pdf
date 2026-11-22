import { strings as s } from '../../lib/i18n'

const features = [
  {
    title: s.feature1Title,
    desc: s.feature1Desc,
    gradient: 'from-emerald-400 to-teal-500',
    shadow: 'shadow-emerald-500/20',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  },
  {
    title: s.feature2Title,
    desc: s.feature2Desc,
    gradient: 'from-amber-400 to-orange-500',
    shadow: 'shadow-amber-500/20',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: s.feature3Title,
    desc: s.feature3Desc,
    gradient: 'from-brand-500 to-purple-600',
    shadow: 'shadow-brand-500/20',
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  },
  {
    title: s.feature4Title,
    desc: s.feature4Desc,
    gradient: 'from-pink-500 to-rose-600',
    shadow: 'shadow-pink-500/20',
    icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
  },
]

export default function FeaturesSection() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-600">{s.featuresBadge}</span>
          <h2 className="mt-3 mb-4 font-display text-3xl font-bold lg:text-4xl">{s.featuresTitle}</h2>
          <p className="text-lg text-muted">{s.featuresSubtitle}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="card-hover rounded-2xl border border-line bg-surface-2 p-6">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} shadow-lg ${f.shadow}`}>
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                </svg>
              </div>
              <h3 className="mb-2 font-bold text-lg">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
