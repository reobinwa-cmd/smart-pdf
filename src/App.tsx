import { Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ImagesToolPage from './pages/ImagesToolPage'
import PdfToolPage from './pages/PdfToolPage'
import { strings } from './lib/i18n'

export default function App() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-xl font-bold text-teal-700">
            {strings.appTitle}
          </Link>
          <nav className="flex gap-4 text-sm text-gray-600">
            <Link to="/" className="hover:text-teal-700">{strings.navHome}</Link>
            <Link to="/tools/images" className="hover:text-teal-700">{strings.navImages}</Link>
            <Link to="/tools/pdf" className="hover:text-teal-700">{strings.navPdf}</Link>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools/images" element={<ImagesToolPage />} />
        <Route path="/tools/pdf" element={<PdfToolPage />} />
      </Routes>
    </div>
  )
}
