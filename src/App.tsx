import { useCallback, useState } from 'react'
import DropZone from './components/DropZone'
import ImagePreview from './components/ImagePreview'
import CompressControls from './components/CompressControls'
import ProgressBar from './components/ProgressBar'
import ResultsPanel from './components/ResultsPanel'
import { MAX_FILE_SIZE, isSupportedImage, outputName, processImage } from './lib/image'
import { strings } from './lib/i18n'
import type { ImageItem, OutputFormat } from './types'

let idCounter = 0
const nextId = () => `img-${++idCounter}-${Date.now()}`

export default function App() {
  const [items, setItems] = useState<ImageItem[]>([])
  const [quality, setQuality] = useState(80)
  const [format, setFormat] = useState<OutputFormat>('image/jpeg')
  const [processing, setProcessing] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  const patchItem = useCallback((id: string, patch: Partial<ImageItem>) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  }, [])

  const revokeResults = useCallback((list: ImageItem[]) => {
    list.forEach((i) => i.resultUrl && URL.revokeObjectURL(i.resultUrl))
  }, [])

  const addFiles = useCallback(
    (files: File[]) => {
      setNotice(null)
      const accepted: ImageItem[] = []
      const rejected: string[] = []
      for (const file of files) {
        if (!isSupportedImage(file)) {
          rejected.push(`${file.name}: ${strings.errUnsupported}`)
          continue
        }
        if (file.size > MAX_FILE_SIZE) {
          rejected.push(`${file.name}: ${strings.errTooLarge}`)
          continue
        }
        accepted.push({
          id: nextId(),
          file,
          previewUrl: URL.createObjectURL(file),
          status: 'pending',
        })
      }
      if (accepted.length) setItems((prev) => [...prev, ...accepted])
      if (rejected.length) setNotice(rejected.join(' — '))
    },
    [],
  )

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => {
        const target = prev.find((i) => i.id === id)
        if (target?.resultUrl) URL.revokeObjectURL(target.resultUrl)
        URL.revokeObjectURL(target?.previewUrl ?? '')
        return prev.filter((i) => i.id !== id)
      })
    },
    [],
  )

  const process = useCallback(async () => {
    const pending = items.filter((i) => i.status !== 'done')
    if (pending.length === 0 || processing) return
    setProcessing(true)
    setNotice(null)
    for (const item of pending) {
      patchItem(item.id, { status: 'processing', error: undefined })
      try {
        const blob = await processImage(item.file, format, quality / 100)
        patchItem(item.id, {
          status: 'done',
          resultUrl: URL.createObjectURL(blob),
          resultSize: blob.size,
          resultName: outputName(item.file.name, format),
        })
      } catch {
        patchItem(item.id, { status: 'error', error: strings.errDecode })
      }
    }
    setProcessing(false)
  }, [items, processing, format, quality, patchItem])

  const resetForNewBatch = useCallback(() => {
    setItems((prev) => {
      revokeResults(prev)
      prev.forEach((i) => URL.revokeObjectURL(i.previewUrl))
      return []
    })
    setNotice(null)
  }, [revokeResults])

  const doneCount = items.filter((i) => i.status === 'done').length
  const hasResults = doneCount > 0

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-teal-700">{strings.appTitle}</h1>
          <p className="mt-3 text-gray-600">{strings.appSubtitle}</p>
        </header>

        {!hasResults ? (
          <>
            <DropZone onFiles={addFiles} />
            {notice && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{notice}</p>}
            {items.length > 0 && (
              <>
                <ImagePreview items={items} onRemove={removeItem} />
                <CompressControls
                  quality={quality}
                  format={format}
                  onQuality={setQuality}
                  onFormat={setFormat}
                  disabled={processing}
                />
                <button
                  type="button"
                  onClick={process}
                  disabled={processing || items.length === 0}
                  className="w-full rounded-2xl bg-teal-600 py-3.5 text-lg font-bold text-white shadow hover:bg-teal-700 disabled:opacity-50"
                >
                  {processing ? strings.processing : `${strings.process} (${items.length})`}
                </button>
                {processing && <ProgressBar done={items.filter((i) => i.status === 'done').length} total={items.length} />}
                {items.some((i) => i.error) && (
                  <ul className="space-y-1 text-sm text-red-600">
                    {items.filter((i) => i.error).map((i) => (
                      <li key={i.id}>{i.file.name}: {i.error}</li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <ResultsPanel
              items={items}
              format={format}
              onAddMore={resetForNewBatch}
            />
          </>
        )}

        <p className="text-center text-xs text-gray-400">
          {items.filter((i) => i.status === 'done').length > 0 && strings.done(doneCount)}
        </p>
      </div>
    </main>
  )
}
