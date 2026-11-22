import { useCallback, useState } from 'react'
import DropZone from '../components/DropZone'
import { isSupportedImage, toDecodableBlob } from '../lib/image'
import { recognizeText, downloadText, type OcrLang, type OcrProgress } from '../lib/ocr'
import { strings as s } from '../lib/i18n'

const LANGS: { id: OcrLang; label: string }[] = [
  { id: 'ara', label: s.ocrLangAra },
  { id: 'eng', label: s.ocrLangEng },
  { id: 'fra', label: s.ocrLangFra },
]

const STATUS_KEYS: Record<string, string> = {
  'loading tesseract core': s.ocrStatusLoading,
  'initializing tesseract': s.ocrStatusLoading,
}

function statusText(p: OcrProgress): string {
  if (p.status.includes('traineddata') || p.status.includes('language')) return s.ocrStatusLang
  if (p.status.includes('recognizing') || p.progress > 0 && p.status !== 'loading tesseract core') return s.ocrStatusRecognizing
  return STATUS_KEYS[p.status] ?? s.ocrProcessing
}

export default function OcrToolPage() {
  const [image, setImage] = useState<Blob | null>(null)
  const [imageName, setImageName] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [lang, setLang] = useState<OcrLang>('ara')
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState<OcrProgress>({ status: '', progress: 0 })
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const onFiles = useCallback(async (files: File[]) => {
    const f = files[0]
    if (!f) return
    setError(null)
    setResult(null)
    if (!isSupportedImage(f)) {
      setError(s.errUnsupported)
      return
    }
    try {
      const blob = await toDecodableBlob(f)
      setImage(blob)
      setImageName(f.name)
      setPreviewUrl(URL.createObjectURL(blob))
    } catch {
      setError(s.errDecode)
    }
  }, [])

  const run = async () => {
    if (!image) return
    setBusy(true)
    setError(null)
    setResult(null)
    setCopied(false)
    setProgress({ status: '', progress: 0 })
    try {
      const { text } = await recognizeText(image, lang, setProgress)
      setResult(text.trim())
    } catch {
      setError(s.pdfErrGeneric)
    } finally {
      setBusy(false)
    }
  }

  const reset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setImage(null)
    setPreviewUrl(null)
    setImageName('')
    setResult(null)
    setError(null)
    setProgress({ status: '', progress: 0 })
  }

  const copy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const pct = Math.round(progress.progress * 100)

  return (
    <main className="px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-ink">{s.ocrTitle}</h1>
          <p className="mt-2 text-muted">{s.ocrSubtitle}</p>
        </header>

        {!image && <DropZone onFiles={onFiles} title={s.ocrDropTitle} hint={s.ocrDropHint} />}
        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        {image && (
          <div className="space-y-4">
            {previewUrl && (
              <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                <img src={previewUrl} alt={imageName} className="mx-auto max-h-72 object-contain" />
                <p className="truncate px-4 py-2 text-xs text-muted">{imageName}</p>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-ink-soft">{s.ocrLangLabel}</span>
              <div className="flex rounded-lg border border-line-strong p-0.5">
                {LANGS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    disabled={busy}
                    onClick={() => setLang(l.id)}
                    className={`rounded-md px-4 py-1.5 text-sm transition ${
                      lang === l.id ? 'bg-brand-600 text-white' : 'text-muted hover:bg-surface-3'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {!result && (
              <button
                type="button"
                onClick={run}
                disabled={busy}
                className="w-full rounded-2xl bg-brand-600 py-3.5 text-lg font-bold text-white shadow hover:bg-brand-700 disabled:opacity-50"
              >
                {busy ? statusText(progress) : s.ocrStart}
              </button>
            )}

            {busy && (
              <div className="rounded-2xl bg-surface p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between text-sm text-muted">
                  <span>{statusText(progress)}</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-3">
                  <div className="h-full rounded-full bg-brand-600 transition-all duration-300" style={{ width: `${Math.max(pct, 3)}%` }} />
                </div>
              </div>
            )}
          </div>
        )}

        {result !== null && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
              <h2 className="mb-3 font-bold text-ink">{s.ocrResultTitle}</h2>
              {result ? (
                <p className="whitespace-pre-wrap leading-relaxed text-ink" dir="auto">{result}</p>
              ) : (
                <p className="text-sm text-muted">{s.ocrEmpty}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {result && (
                <>
                  <button
                    type="button"
                    onClick={copy}
                    className="rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
                  >
                    {copied ? s.ocrCopied : s.ocrCopy}
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadText(result, `${imageName.replace(/\.[^.]+$/, '')}.txt`)}
                    className="rounded-xl border border-brand-600 px-5 py-2.5 font-semibold text-brand-600 hover:bg-brand-50"
                  >
                    {s.ocrDownload}
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={reset}
                className="rounded-xl border border-line-strong px-5 py-2.5 font-semibold text-ink-soft hover:bg-surface-3"
              >
                {s.ocrNewImage}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
