import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ImagesToolPage from './pages/ImagesToolPage'
import PdfToolPage from './pages/PdfToolPage'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools/images" element={<ImagesToolPage />} />
          <Route path="/tools/pdf" element={<PdfToolPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
