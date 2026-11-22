import { MAX_PDF_SIZE, isPdfFile } from './pdf'
import type { OutputFormat } from '../types'

export interface PdfRenderDoc {
  numPages: number
  renderPage: (pageIndex: number, format: OutputFormat, quality: number) => Promise<Blob>
  close: () => Promise<void>
}

let pdfjsPromise: Promise<typeof import('pdfjs-dist')> | null = null

function loadPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = (async () => {
      const pdfjs = await import('pdfjs-dist')
      const { default: PdfWorker } = await import('pdfjs-dist/build/pdf.worker.min.mjs?worker')
      pdfjs.GlobalWorkerOptions.workerPort = new PdfWorker()
      return pdfjs
    })()
  }
  return pdfjsPromise
}

export function validatePdfForRender(file: File): string | null {
  if (!isPdfFile(file)) return 'unsupported'
  if (file.size > MAX_PDF_SIZE) return 'too-large'
  return null
}

const RENDER_SCALE = 2 // ~144 dpi

export async function openPdfForRender(file: File): Promise<PdfRenderDoc> {
  const pdfjs = await loadPdfjs()
  const data = new Uint8Array(await file.arrayBuffer())
  const loadingTask = pdfjs.getDocument({ data })
  const doc = await loadingTask.promise

  return {
    numPages: doc.numPages,
    async renderPage(pageIndex, format, quality) {
      const page = await doc.getPage(pageIndex + 1)
      const viewport = page.getViewport({ scale: RENDER_SCALE })
      const canvas = document.createElement('canvas')
      canvas.width = Math.floor(viewport.width)
      canvas.height = Math.floor(viewport.height)
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('canvas-2d-unavailable')
      await page.render({ canvas, canvasContext: ctx, viewport }).promise
      const mime = format === 'image/png' ? 'image/png' : 'image/jpeg'
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, mime, format === 'image/png' ? undefined : quality),
      )
      if (!blob) throw new Error('encode-failed')
      return blob
    },
    async close() {
      await loadingTask.destroy()
    },
  }
}
