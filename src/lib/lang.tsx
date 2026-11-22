import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'ar' | 'fr' | 'en'

export interface ChromeStrings {
  navHome: string
  navImages: string
  navPdf: string
  install: string
  menu: string
  homeBadge: string
  homeTitle1: string
  homeTitle2: string
  homeTitle3: string
  homeSubtitle: string
  homeCta: string
  homeCta2: string
  toolsTitle: string
  toolsSubtitle: string
  available: string
  comingSoon: string
  footerTagline: string
  footerTools: string
  footerResources: string
  footerContact: string
  footerRights: string
  langName: Record<Lang, string>
}

const chrome: Record<Lang, ChromeStrings> = {
  ar: {
    navHome: 'الرئيسية',
    navImages: 'الصور',
    navPdf: 'PDF',
    install: 'تثبيت التطبيق',
    menu: 'القائمة',
    homeBadge: 'الإصدار التجريبي الأول متاح الآن',
    homeTitle1: 'حوّل ملفاتك',
    homeTitle2: 'بأمان تام',
    homeTitle3: 'داخل متصفحك فقط',
    homeSubtitle: 'منصة عربية لتحويل وضغط الصور ومعالجة ملفات PDF — ملفاتك لا تترك جهازك أبداً.',
    homeCta: 'ابدأ الآن مجاناً',
    homeCta2: 'استكشف الأدوات',
    toolsTitle: 'كل ما تحتاجه في مكان واحد',
    toolsSubtitle: 'أدوات بسيطة وقوية لتحويل ومعالجة ملفاتك — محلياً بالكامل.',
    available: 'متاح الآن',
    comingSoon: 'قريباً',
    footerTagline: 'منصة عربية لتحويل ومعالجة الملفات — آمنة، سريعة، ومحلية بالكامل.',
    footerTools: 'الأدوات',
    footerResources: 'المصادر',
    footerContact: 'تواصل',
    footerRights: 'صُنع للمستخدم العربي',
    langName: { ar: 'ع', fr: 'FR', en: 'EN' },
  },
  fr: {
    navHome: 'Accueil',
    navImages: 'Images',
    navPdf: 'PDF',
    install: 'Installer l’app',
    menu: 'Menu',
    homeBadge: 'Première version bêta disponible',
    homeTitle1: 'Convertissez vos fichiers',
    homeTitle2: 'en toute sécurité',
    homeTitle3: 'dans votre navigateur',
    homeSubtitle: 'Une plateforme pour convertir et compresser images et PDF — vos fichiers ne quittent jamais votre appareil.',
    homeCta: 'Commencer gratuitement',
    homeCta2: 'Explorer les outils',
    toolsTitle: 'Tout ce qu’il vous faut au même endroit',
    toolsSubtitle: 'Des outils simples et puissants pour convertir vos fichiers — entièrement en local.',
    available: 'Disponible',
    comingSoon: 'Bientôt',
    footerTagline: 'Plateforme de conversion de fichiers — sûre, rapide et 100 % locale.',
    footerTools: 'Outils',
    footerResources: 'Ressources',
    footerContact: 'Contact',
    footerRights: 'Fait pour l’utilisateur arabe',
    langName: { ar: 'ع', fr: 'FR', en: 'EN' },
  },
  en: {
    navHome: 'Home',
    navImages: 'Images',
    navPdf: 'PDF',
    install: 'Install App',
    menu: 'Menu',
    homeBadge: 'First beta version available now',
    homeTitle1: 'Convert your files',
    homeTitle2: 'safely',
    homeTitle3: 'right in your browser',
    homeSubtitle: 'A platform to convert and compress images and PDFs — your files never leave your device.',
    homeCta: 'Start for free',
    homeCta2: 'Explore tools',
    toolsTitle: 'Everything you need in one place',
    toolsSubtitle: 'Simple, powerful tools to convert your files — fully local.',
    available: 'Available',
    comingSoon: 'Soon',
    footerTagline: 'A file conversion platform — safe, fast and fully local.',
    footerTools: 'Tools',
    footerResources: 'Resources',
    footerContact: 'Contact',
    footerRights: 'Made for the Arabic user',
    langName: { ar: 'ع', fr: 'FR', en: 'EN' },
  },
}

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: ChromeStrings
}

const Ctx = createContext<LangCtx>({ lang: 'ar', setLang: () => {}, t: chrome.ar })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('dt-lang')
    return saved === 'fr' || saved === 'en' ? saved : 'ar'
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('dt-lang', l)
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  return <Ctx.Provider value={{ lang, setLang, t: chrome[lang] }}>{children}</Ctx.Provider>
}

export function useLang() {
  return useContext(Ctx)
}
