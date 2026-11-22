import { useState } from 'react'
import type { ImageItem, OutputFormat } from '../types'
import { formatBytes } from '../lib/image'
import { strings } from '../lib/i18n'

interface Props {
  items: ImageItem[]
  format: OutputFormat
  onAddMore: () => void
}

export default function ResultsPanel({ items, format, onAddMore }: Props) {
  const results = items.filter((i) => i.status === 'done' && i.resultUrl)
  const [downloading, setDownloading] = useState(false)

  if (results.length === 0) {
    return <p className="py-8 text-center text-sm text-gray-400">{strings.emptyResults}</p>
  }

  const downloadOne = (item: ImageItem) => {
    const a = document.createElement('a')
    a.href = item.resultUrl!
    a.download = item.resultName!
    a.click()
  }

  const downloadAll = async () => {
    setDownloading(true)
    for (const item of results) {
      downloadOne(item)
      await new Promise((r) => setTimeout(r, 350)) // stagger for multi-download
    }
    setDownloading(false)
  }

  const ext = { 'image/jpeg': 'JPG', 'image/png': 'PNG', 'image/webp': 'WebP' }[format]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={downloadAll}
          disabled={downloading}
          className="rounded-xl bg-teal-600 px-5 py-2.5 font-semibold text-white shadow hover:bg-teal-700 disabled:opacity-50"
        >
          {strings.downloadAll} ({results.length})
        </button>
        <button
          type="button"
          onClick={onAddMore}
          className="rounded-xl border border-teal-600 px-5 py-2.5 font-semibold text-teal-700 hover:bg-teal-50"
        >
          {strings.addMore}
        </button>
        <span className="text-sm text-gray-500">
          {results.reduce((acc, i) => acc + (i.resultSize ?? 0), 0) > 0 &&
            formatBytes(results.reduce((acc, i) => acc + (i.resultSize ?? 0), 0))}{' '}
          {ext}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {results.map((item) => (
          <figure key={item.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <img src={item.resultUrl} alt={item.resultName} className="h-28 w-full object-cover" />
            <figcaption className="flex items-center justify-between gap-1 px-2 py-1.5">
              <span className="truncate text-xs text-gray-600" title={item.resultName}>
                {item.resultName}
              </span>
              <button
                type="button"
                onClick={() => downloadOne(item)}
                className="shrink-0 rounded-lg bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700 hover:bg-teal-100"
              >
                {strings.download}
              </button>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
