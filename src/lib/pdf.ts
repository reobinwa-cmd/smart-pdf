import { toDecodableBlob } from './image'

export const MAX_PDF_SIZE = 50 * 1024 * 1024 // 50MB

export function isPdfFile(file: File): boolean {
  return file.type === 'application/pdf' || /\.pdf$/i.test(file.name)
}

// A4 at 72dpi, with margins
const PAGE_W = 595.28
const PAGE_H = 841.89
const MARGIN = 36

async function fileToBytes(file: File): Promise<Uint8Array> {
  return new Uint8Array(await file.arrayBuffer())
}

/** Convert any browser-decodable image to PNG bytes (for pdf-lib embed). */
async function imageToPngBytes(file: File): Promise<{ bytes: Uint8Array; width: number; height: number }> {
  const bitmap = await createImageBitmap(await toDecodableBlob(file))
  try {
    const canvas = document.createElement('canvas')
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('canvas-2d-unavailable')
    ctx.drawImage(bitmap, 0, 0)
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!blob) throw new Error('encode-failed')
    return { bytes: new Uint8Array(await blob.arrayBuffer()), width: bitmap.width, height: bitmap.height }
  } finally {
    bitmap.close()
  }
}

async function imageToJpegBytes(file: File): Promise<Uint8Array> {
  const bitmap = await createImageBitmap(await toDecodableBlob(file))
  try {
    const canvas = document.createElement('canvas')
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('canvas-2d-unavailable')
    ctx.drawImage(bitmap, 0, 0)
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92))
    if (!blob) throw new Error('encode-failed')
    return new Uint8Array(await blob.arrayBuffer())
  } finally {
    bitmap.close()
  }
}

/** images → single PDF, each image fitted centered on an A4 page. */
export async function imagesToPdf(files: File[]): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib')
  const pdf = await PDFDocument.create()
  for (const file of files) {
    const isJpeg = file.type === 'image/jpeg' || /\.jpe?g$/i.test(file.name)
    const png = isJpeg ? null : await imageToPngBytes(file)
    const jpeg = isJpeg ? await imageToJpegBytes(file) : null

    const img = png
      ? await pdf.embedPng(png.bytes)
      : jpeg
        ? await pdf.embedJpg(jpeg)
        : null
    if (!img) throw new Error('embed-failed')

    const page = pdf.addPage([PAGE_W, PAGE_H])
    const maxW = PAGE_W - MARGIN * 2
    const maxH = PAGE_H - MARGIN * 2
    const scale = Math.min(maxW / img.width, maxH / img.height, 1)
    const w = img.width * scale
    const h = img.height * scale
    page.drawImage(img, {
      x: (PAGE_W - w) / 2,
      y: (PAGE_H - h) / 2,
      width: w,
      height: h,
    })
  }
  return pdf.save()
}

/** merge multiple PDFs into one, preserving page order. */
export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib')
  const merged = await PDFDocument.create()
  for (const file of files) {
    const src = await PDFDocument.load(await fileToBytes(file), { ignoreEncryption: true })
    const pages = await merged.copyPages(src, src.getPageIndices())
    pages.forEach((p) => merged.addPage(p))
  }
  return merged.save()
}

/** extract pages from a PDF. ranges like "1-3,5,8-10" (1-based). */
export async function extractPdfPages(file: File, ranges: string): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib')
  const src = await PDFDocument.load(await fileToBytes(file), { ignoreEncryption: true })
  const total = src.getPageCount()
  const indices = parseRanges(ranges, total)
  const out = await PDFDocument.create()
  const pages = await out.copyPages(src, indices)
  pages.forEach((p) => out.addPage(p))
  return out.save()
}

export async function getPdfPageCount(file: File): Promise<number> {
  const { PDFDocument } = await import('pdf-lib')
  const doc = await PDFDocument.load(await fileToBytes(file), { ignoreEncryption: true })
  return doc.getPageCount()
}

export function parseRanges(input: string, total: number): number[] {
  const indices = new Set<number>()
  for (const part of input.split(',')) {
    const trimmed = part.trim()
    if (!trimmed) continue
    const m = trimmed.match(/^(\d+)\s*-\s*(\d+)$/)
    if (m) {
      const a = Math.max(1, Number(m[1]))
      const b = Math.min(total, Number(m[2]))
      for (let i = a; i <= b; i++) indices.add(i - 1)
    } else if (/^\d+$/.test(trimmed)) {
      const n = Number(trimmed)
      if (n >= 1 && n <= total) indices.add(n - 1)
    } else {
      throw new Error('bad-range')
    }
  }
  const sorted = [...indices].sort((a, b) => a - b)
  if (sorted.length === 0) throw new Error('empty-range')
  return sorted
}

export function downloadBytes(bytes: Uint8Array, filename: string, mime = 'application/pdf') {
  const blob = new Blob([bytes as BlobPart], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}
