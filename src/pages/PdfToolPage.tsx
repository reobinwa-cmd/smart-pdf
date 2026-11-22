import { useState } from 'react'
import { ImagesToPdfPanel, MergePanel, SplitPanel, PdfToImagesPanel } from '../components/pdf/Panels'
import { strings } from '../lib/i18n'

type Tab = 'toimages' | 'images' | 'merge' | 'split'

const TABS: { id: Tab; label: string }[] = [
  { id: 'toimages', label: strings.pdfTabToImages },
  { id: 'images', label: strings.pdfTabImages },
  { id: 'merge', label: strings.pdfTabMerge },
  { id: 'split', label: strings.pdfTabSplit },
]

export default function PdfToolPage() {
  const [tab, setTab] = useState<Tab>('toimages')

  return (
    <main className="px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-ink-soft">{strings.toolPdfTitle}</h1>
          <p className="mt-2 text-muted">{strings.toolPdfDesc}</p>
        </header>

        <div className="flex rounded-xl border border-line-strong bg-surface p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                tab === t.id ? 'bg-teal-600 text-white' : 'text-muted hover:bg-surface-3'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'toimages' && <PdfToImagesPanel />}
        {tab === 'images' && <ImagesToPdfPanel />}
        {tab === 'merge' && <MergePanel />}
        {tab === 'split' && <SplitPanel />}
      </div>
    </main>
  )
}
