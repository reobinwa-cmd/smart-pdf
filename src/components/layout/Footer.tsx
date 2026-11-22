import { Link } from 'react-router-dom'
import { useLang } from '../../lib/lang'
import { LangSwitcher } from './Navbar'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-slate-900 pt-16 pb-8 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-purple-600">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              </div>
              <span className="font-display text-xl font-bold text-white">
                Darija<span className="text-brand-400">Tools</span>
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed">{t.footerTagline}</p>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">{t.footerTools}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tools/images" className="hover:text-white transition">{t.navImages}</Link></li>
              <li><Link to="/tools/pdf" className="hover:text-white transition">{t.navPdf}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">{t.footerResources}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com/reobinwa-cmd/smart-pdf" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">{t.footerContact}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:aaaaaayobi@gmail.com" className="hover:text-white transition">Email</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm sm:flex-row">
          <p>© {YEAR} DarijaTools. {t.footerRights}.</p>
          <LangSwitcher dark />
        </div>
      </div>
    </footer>
  )
}
