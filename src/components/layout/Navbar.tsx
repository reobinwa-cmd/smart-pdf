import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLang, type Lang } from '../../lib/lang'

const LANGS: Lang[] = ['ar', 'fr', 'en']

function LangSwitcher({ dark = false }: { dark?: boolean }) {
  const { lang, setLang, t } = useLang()
  return (
    <div className={`flex items-center rounded-lg p-0.5 text-xs font-semibold ${dark ? 'bg-slate-800' : 'bg-slate-100'}`}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`px-2.5 py-1.5 rounded-md transition ${
            lang === l
              ? dark ? 'bg-slate-700 text-white' : 'bg-white text-brand-600 shadow-sm'
              : dark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {t.langName[l]}
        </button>
      ))}
    </div>
  )
}

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition ${isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`

export default function Navbar() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 shadow-lg shadow-brand-500/30 lg:h-10 lg:w-10">
              <svg className="h-5 w-5 text-white lg:h-6 lg:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            </div>
            <span className="font-display text-xl font-bold tracking-tight lg:text-2xl">
              Darija<span className="text-brand-600">Tools</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <NavLink to="/tools/images" className={linkCls}>{t.navImages}</NavLink>
            <NavLink to="/tools/pdf" className={linkCls}>{t.navPdf}</NavLink>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LangSwitcher />
            </div>
            <button
              type="button"
              className="hidden cursor-default items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm md:inline-flex"
              title="PWA"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
              </svg>
              {t.install}
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
              aria-label={t.menu}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-1 px-4 py-4">
            <NavLink to="/" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-50">
              {t.navHome}
            </NavLink>
            <NavLink to="/tools/images" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-50">
              {t.navImages}
            </NavLink>
            <NavLink to="/tools/pdf" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-50">
              {t.navPdf}
            </NavLink>
            <div className="mt-2 flex justify-center border-t border-slate-200 pt-3">
              <LangSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export { LangSwitcher }
