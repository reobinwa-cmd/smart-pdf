import { useCallback, useEffect, useState } from 'react'
import DropZone from '../DropZone'
import ProgressBar from '../ProgressBar'
import { MAX_FILE_SIZE, isSupportedImage, formatBytes } from '../../lib/image'
import { isPdfFile, MAX_PDF_SIZE, imagesToPdf, mergePdfs, extractPdfPages, getPdfPageCount, parseRanges, downloadBytes } from '../../lib/pdf'
import { openPdfForRender, validatePdfForRender, type PdfRenderDoc } from '../../lib/pdfToImages'
import type { OutputFormat } from '../../types'
import { strings } from '../../lib/i18n'

interface FileEntry {
  file: File
  id: string
  previewUrl?: string
}

let idCounter = 0
const nextId = () => `f-${++idCounter}-${Date.now()}`

function useFileList(validator: (f: File) => string | null) {
  const [entries, setEntries] = useState<FileEntry[]>([])
  const [error, setError] = useState<string | null>(null)

  const add = useCallback(
    (files: File[]) => {
      setError(null)
      const accepted: FileEntry[] = []
      const rejected: string[] = []
      for (const file of files) {
        const err = validator(file)
        if (err) rejected.push(`${file.name}: ${err}`)
        else {
          accepted.push({
            file,
            id: nextId(),
            previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
          })
        }
      }
      if (accepted.length) setEntries((p) => [...p, ...accepted])
      if (rejected.length) setError(rejected.join(' — '))
    },
    [validator],
  )

  const remove = useCallback((id: string) => {
    setEntries((p) => {
      const target = p.find((e) => e.id === id)
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl)
      return p.filter((e) => e.id !== id)
    })
  }, [])

  const clear = useCallback(() => {
    setEntries((p) => {
      p.forEach((e) => e.previewUrl && URL.revokeObjectURL(e.previewUrl))
      return []
    })
  }, [])
  return { entries, error, add, remove, clear, setError }
}

function usePdfPageCounts(entries: FileEntry[]) {
  const [counts, setCounts] = useState<Record<string, number>>({})
  useEffect(() => {
    let cancelled = false
    for (const e of entries) {
      if (counts[e.id] !== undefined || !isPdfFile(e.file)) continue
      getPdfPageCount(e.file)
        .then((n) => {
          if (!cancelled) setCounts((p) => ({ ...p, [e.id]: n }))
        })
        .catch(() => {})
    }
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries])
  return counts
}

const validateImage = (f: File) =>
  !isSupportedImage(f) ? strings.errUnsupported : f.size > MAX_FILE_SIZE ? strings.errTooLarge : null

const validatePdf = (f: File) =>
  !isPdfFile(f) ? strings.errUnsupported : f.size > MAX_PDF_SIZE ? strings.pdfErrTooLarge : null

interface DoneResult {
  name: string
  size: number
  bytes: Uint8Array
}

function FileList({ entries, onRemove, pageCounts }: { entries: FileEntry[]; onRemove: (id: string) => void; pageCounts?: Record<string, number> }) {
  if (entries.length === 0) return null
  return (
    <ul className="space-y-2">
      {entries.map((e) => (
        <li key={e.id} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2">
          {e.previewUrl && (
            <img src={e.previewUrl} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-gray-700">{e.file.name}</p>
            <p className="text-xs text-gray-500">
              {formatBytes(e.file.size)}
              {pageCounts?.[e.id] !== undefined && ` • ${strings.pdfPageCountShort(pageCounts[e.id])}`}
            </p>
          </div>
          <button type="button" onClick={() => onRemove(e.id)} className="shrink-0 text-xs text-red-500 hover:underline">
            {strings.remove}
          </button>
        </li>
      ))}
    </ul>
  )
}

function ActionButton({ label, disabled, onClick, busy }: { label: string; disabled?: boolean; onClick: () => void; busy?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || busy}
      className="w-full rounded-2xl bg-teal-600 py-3.5 text-lg font-bold text-white shadow hover:bg-teal-700 disabled:opacity-50"
    >
      {busy ? strings.pdfProcessing : label}
    </button>
  )
}

function DoneActions({ result, onReset }: { result: DoneResult; onReset: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-teal-50 p-5">
      <span className="text-sm text-teal-800">
        {strings.pdfDone}: <b>{result.name}</b> ({formatBytes(result.size)})
      </span>
      <button
        type="button"
        onClick={() => downloadBytes(result.bytes, result.name)}
        className="rounded-xl bg-teal-600 px-5 py-2 font-semibold text-white hover:bg-teal-700"
      >
        {strings.pdfDownload}
      </button>
      <button type="button" onClick={onReset} className="rounded-xl border border-teal-600 px-5 py-2 font-semibold text-teal-700 hover:bg-teal-100">
        {strings.pdfReset}
      </button>
    </div>
  )
}

export function ImagesToPdfPanel() {
  const { entries, error, add, remove, clear, setError } = useFileList(validateImage)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState<DoneResult | null>(null)

  const run = async () => {
    setBusy(true)
    setError(null)
    try {
      const bytes = await imagesToPdf(entries.map((e) => e.file))
      setDone({ name: 'images.pdf', size: bytes.length, bytes })
    } catch {
      setError(strings.pdfErrGeneric)
    } finally {
      setBusy(false)
    }
  }

  if (done) return <DoneActions result={done} onReset={() => { clear(); setDone(null) }} />
  return (
    <div className="space-y-4">
      <DropZone onFiles={add} title={strings.pdfDropImages} hint={strings.pdfDropImagesHint} />
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <FileList entries={entries} onRemove={remove} />
      {entries.length > 0 && <ActionButton label={`${strings.pdfCreate} (${entries.length})`} disabled={busy} busy={busy} onClick={run} />}
    </div>
  )
}

export function MergePanel() {
  const { entries, error, add, remove, clear, setError } = useFileList(validatePdf)
  const pageCounts = usePdfPageCounts(entries)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState<DoneResult | null>(null)

  const run = async () => {
    setBusy(true)
    setError(null)
    try {
      const bytes = await mergePdfs(entries.map((e) => e.file))
      setDone({ name: 'merged.pdf', size: bytes.length, bytes })
    } catch {
      setError(strings.pdfErrLoad)
    } finally {
      setBusy(false)
    }
  }

  if (done) return <DoneActions result={done} onReset={() => { clear(); setDone(null) }} />
  return (
    <div className="space-y-4">
      <DropZone onFiles={add} accept="application/pdf,.pdf" title={strings.pdfDropPdfs} hint={strings.pdfDropPdfsHint} />
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <FileList entries={entries} onRemove={remove} pageCounts={pageCounts} />
      {entries.length > 1 && <ActionButton label={`${strings.pdfMerge} (${entries.length})`} disabled={busy} busy={busy} onClick={run} />}
    </div>
  )
}

export function PdfToImagesPanel() {
  const [file, setFile] = useState<File | null>(null)
  const [doc, setDoc] = useState<PdfRenderDoc | null>(null)
  const [ranges, setRanges] = useState('')
  const [format, setFormat] = useState<OutputFormat>('image/jpeg')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<{ url: string; name: string; page: number }[] | null>(null)
  const [progress, setProgress] = useState({ done: 0, total: 0 })

  const reset = useCallback(() => {
    doc?.close().catch(() => {})
    results?.forEach((r) => URL.revokeObjectURL(r.url))
    setFile(null)
    setDoc(null)
    setResults(null)
    setRanges('')
    setError(null)
  }, [doc, results])

  const onFiles = useCallback(async (files: File[]) => {
    const f = files[0]
    if (!f) return
    setError(null)
    const v = validatePdfForRender(f)
    if (v === 'unsupported') { setError(strings.errUnsupported); return }
    if (v === 'too-large') { setError(strings.pdfErrTooLarge); return }
    try {
      const d = await openPdfForRender(f)
      setFile(f)
      setDoc(d)
      setResults(null)
    } catch {
      setError(strings.pdfErrLoad)
    }
  }, [])

  const run = async () => {
    if (!doc || !file) return
    setBusy(true)
    setError(null)
    try {
      const indices = ranges.trim()
        ? parseRanges(ranges, doc.numPages)
        : Array.from({ length: doc.numPages }, (_, i) => i)
      setProgress({ done: 0, total: indices.length })
      const out: { url: string; name: string; page: number }[] = []
      const ext = format === 'image/png' ? 'png' : 'jpg'
      for (let i = 0; i < indices.length; i++) {
        const blob = await doc.renderPage(indices[i], format, 0.92)
        out.push({
          url: URL.createObjectURL(blob),
          name: `${file.name.replace(/\.pdf$/i, '')}-p${indices[i] + 1}.${ext}`,
          page: indices[i] + 1,
        })
        setProgress({ done: i + 1, total: indices.length })
      }
      setResults(out)
    } catch {
      setError(strings.pdfErrGeneric)
    } finally {
      setBusy(false)
    }
  }

  const downloadOne = (r: { url: string; name: string }) => {
    const a = document.createElement('a')
    a.href = r.url
    a.download = r.name
    a.click()
  }

  const downloadAll = async () => {
    if (!results) return
    for (const r of results) {
      downloadOne(r)
      await new Promise((res) => setTimeout(res, 350))
    }
  }

  if (results) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={downloadAll} className="rounded-xl bg-teal-600 px-5 py-2.5 font-semibold text-white hover:bg-teal-700">
            {strings.downloadAll} ({results.length})
          </button>
          <button type="button" onClick={reset} className="rounded-xl border border-teal-600 px-5 py-2.5 font-semibold text-teal-700 hover:bg-teal-50">
            {strings.pdfReset}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {results.map((r) => (
            <figure key={r.page} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <img src={r.url} alt={r.name} className="h-32 w-full object-cover" />
              <figcaption className="flex items-center justify-between gap-1 px-2 py-1.5">
                <span className="truncate text-xs text-gray-600">{strings.pdfPageImage(r.page)}</span>
                <button type="button" onClick={() => downloadOne(r)} className="shrink-0 rounded-lg bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700 hover:bg-teal-100">
                  {strings.download}
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <DropZone onFiles={onFiles} accept="application/pdf,.pdf" multiple={false} title={strings.pdfDropSingle} hint={strings.pdfToImagesHint} />
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {file && doc && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            {file.name} — {strings.pdfPageCount(doc.numPages)}
          </p>
          <label className="block text-sm font-medium text-gray-700">
            {strings.pdfPagesLabel} (اختياري)
            <input
              type="text"
              value={ranges}
              onChange={(e) => setRanges(e.target.value)}
              placeholder="1-3,5 — فارغ = الكل"
              dir="ltr"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-left"
            />
          </label>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">{strings.format}</span>
            <div className="flex rounded-lg border border-gray-300 p-0.5">
              {(['image/jpeg', 'image/png'] as OutputFormat[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  className={`rounded-md px-3 py-1 text-sm ${format === f ? 'bg-teal-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {f === 'image/png' ? 'PNG' : 'JPG'}
                </button>
              ))}
            </div>
          </div>
          {busy && <ProgressBar done={progress.done} total={progress.total} />}
          <ActionButton
            label={ranges.trim() ? strings.pdfRenderRange : strings.pdfRenderAll}
            disabled={busy}
            busy={busy}
            onClick={run}
          />
        </div>
      )}
    </div>
  )
}

export function SplitPanel() {
  const { entries, error, add, remove, setError } = useFileList(validatePdf)
  const pageCounts = usePdfPageCounts(entries)
  const [ranges, setRanges] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState<DoneResult | null>(null)

  const file = entries[0]?.file

  const run = async () => {
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      const bytes = await extractPdfPages(file, ranges)
      const safe = ranges.replace(/[^\d,-]/g, '') || 'all'
      setDone({ name: `extract-${safe}.pdf`, size: bytes.length, bytes })
    } catch (e) {
      const msg = e instanceof Error && (e.message === 'bad-range' || e.message === 'empty-range')
        ? strings.pdfErrRange
        : strings.pdfErrLoad
      setError(msg)
    } finally {
      setBusy(false)
    }
  }

  const reset = () => {
    if (file) remove(entries[0].id)
    setDone(null)
    setRanges('')
  }

  if (done) return <DoneActions result={done} onReset={reset} />
  return (
    <div className="space-y-4">
      <DropZone onFiles={add} accept="application/pdf,.pdf" multiple={false} title={strings.pdfDropSingle} hint={strings.pdfDropSingleHint} />
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <FileList entries={entries} onRemove={remove} pageCounts={pageCounts} />
      {file && (
        <div className="space-y-3">
          {pageCounts[entries[0].id] !== undefined && (
            <p className="text-sm text-gray-600">{strings.pdfPageCount(pageCounts[entries[0].id])}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">
            {strings.pdfPagesLabel}
            <input
              type="text"
              value={ranges}
              onChange={(e) => setRanges(e.target.value)}
              placeholder="1-3,5"
              dir="ltr"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-left"
            />
          </label>
          <ActionButton label={strings.pdfExtract} disabled={busy || !ranges.trim()} busy={busy} onClick={run} />
        </div>
      )}
    </div>
  )
}
