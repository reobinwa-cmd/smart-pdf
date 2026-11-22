import { strings as s } from '../../lib/i18n'

const steps = [
  { n: '1', title: s.howStep1Title, desc: s.howStep1Desc, gradient: 'from-brand-500 to-purple-600', shadow: 'shadow-brand-500/30' },
  { n: '2', title: s.howStep2Title, desc: s.howStep2Desc, gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/30' },
  { n: '3', title: s.howStep3Title, desc: s.howStep3Desc, gradient: 'from-cyan-500 to-blue-600', shadow: 'shadow-cyan-500/30' },
]

export default function HowItWorksSection() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-600">{s.howBadge}</span>
          <h2 className="mt-3 mb-4 font-display text-3xl font-bold lg:text-4xl">{s.howTitle}</h2>
          <p className="text-lg text-slate-600">{s.howSubtitle}</p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="absolute inset-x-[16%] top-16 hidden h-0.5 bg-gradient-to-l from-brand-500 via-purple-500 to-cyan-500 md:block" />
          {steps.map((step) => (
            <div key={step.n} className="relative text-center">
              <div className={`relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-2xl font-bold text-white shadow-xl ${step.shadow}`}>
                {step.n}
              </div>
              <h3 className="mb-2 font-bold text-lg">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
