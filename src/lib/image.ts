import type { OutputFormat } from '../types'

export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB per file

const FORMAT_EXT: Record<OutputFormat, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}

export function isHeic(file: File): boolean {
  return (
    file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    /\.(heic|heif)$/i.test(file.name)
  )
}

export function isSupportedImage(file: File): boolean {
  if (isHeic(file)) return true
  return file.type.startsWith('image/') && file.type !== 'image/svg+xml'
}

export function baseName(filename: string): string {
  const i = filename.lastIndexOf('.')
  return i > 0 ? filename.slice(0, i) : filename
}

export function outputName(filename: string, format: OutputFormat): string {
  return `${baseName(filename)}.${FORMAT_EXT[format]}`
}

/** Returns a browser-decodable Blob (HEIC → JPEG via lazy heic2any). */
export async function toDecodableBlob(file: File): Promise<Blob> {
  if (!isHeic(file)) return file
  const { default: heic2any } = await import('heic2any')
  const converted = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 })
  return Array.isArray(converted) ? converted[0] : converted
}

async function loadBitmap(file: File): Promise<ImageBitmap> {
  return createImageBitmap(await toDecodableBlob(file))
}

/**
 * Decode + re-encode an image through canvas.
 * Quality (0-1) applies to jpeg/webp; png ignores it.
 */
export async function processImage(file: File, format: OutputFormat, quality: number): Promise<Blob> {
  const bitmap = await loadBitmap(file)
  try {
    const canvas = document.createElement('canvas')
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('canvas-2d-unavailable')
    ctx.drawImage(bitmap, 0, 0)
    const q = format === 'image/png' ? undefined : quality
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, format, q),
    )
    if (!blob) throw new Error('encode-failed')
    return blob
  } finally {
    bitmap.close()
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}
