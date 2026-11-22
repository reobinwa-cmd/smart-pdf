import { Link } from 'react-router-dom'
import { strings } from '../lib/i18n'

const tools = [
  { to: '/tools/images', title: strings.toolImagesTitle, desc: strings.toolImagesDesc, enabled: true },
  { to: '/tools/pdf', title: strings.toolPdfTitle, desc: strings.toolPdfDesc, enabled: true },
]

export default function HomePage() {
  return (
    <main className="px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-teal-700">{strings.appTitle}</h1>
        <p className="mt-4 text-lg text-gray-600">{strings.appSubtitle}</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className={`rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md ${
                t.enabled ? '' : 'pointer-events-none opacity-50'
              }`}
            >
              <h2 className="text-2xl font-bold text-gray-800">{t.title}</h2>
              <p className="mt-3 text-gray-600">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
