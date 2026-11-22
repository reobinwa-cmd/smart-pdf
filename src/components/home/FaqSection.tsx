import { strings as s } from '../../lib/i18n'

const faqs = [
  { q: s.faq1Q, a: s.faq1A },
  { q: s.faq2Q, a: s.faq2A },
  { q: s.faq3Q, a: s.faq3A },
  { q: s.faq4Q, a: s.faq4A },
  { q: s.faq5Q, a: s.faq5A },
]

export default function FaqSection() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-600">{s.faqBadge}</span>
          <h2 className="mt-3 font-display text-3xl font-bold lg:text-4xl">{s.faqTitle}</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group overflow-hidden rounded-2xl border border-line bg-surface-2">
              <summary className="flex cursor-pointer items-center justify-between p-5 transition hover:bg-surface-3">
                <span className="font-bold text-ink-soft">{f.q}</span>
                <svg className="chevron h-5 w-5 flex-shrink-0 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5 leading-relaxed text-muted">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
