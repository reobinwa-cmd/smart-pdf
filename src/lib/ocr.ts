export type OcrLang = 'ara' | 'eng' | 'fra'

export interface OcrProgress {
  status: string
  progress: number // 0..1
}

export interface OcrResult {
  text: string
  confidence?: number
}

interface OcrWorker {
  recognize: (image: Blob | string) => Promise<{ data: { text: string; confidence?: number } }>
  terminate: () => Promise<void>
}

const base = () => import.meta.env.BASE_URL

let workerPromise: Promise<OcrWorker> | null = null
let currentLang: OcrLang | null = null

/** Returns a worker for the requested language, reusing if same lang. */
export async function getOcrWorker(lang: OcrLang, onProgress?: (p: OcrProgress) => void): Promise<OcrWorker> {
  if (workerPromise && currentLang === lang) return workerPromise
  // terminate previous worker if language changed
  if (workerPromise) {
    workerPromise.then((w) => w.terminate()).catch(() => {})
    workerPromise = null
    currentLang = null
  }
  const { createWorker } = await import('tesseract.js')
  workerPromise = createWorker(lang, 1, {
    workerPath: `${base()}tesseract/worker.min.js`,
    corePath: `${base()}tesseract-core`,
    langPath: `${base()}tessdata`,
    gzip: true,
    logger: (m: { status?: string; progress?: number }) => {
      onProgress?.({ status: m.status ?? '', progress: m.progress ?? 0 })
    },
  }) as unknown as Promise<OcrWorker>
  currentLang = lang
  return workerPromise
}

export async function recognizeText(image: Blob, lang: OcrLang, onProgress?: (p: OcrProgress) => void): Promise<OcrResult> {
  const worker = await getOcrWorker(lang, onProgress)
  const { data } = await worker.recognize(image)
  return { text: data.text, confidence: data.confidence }
}

export function downloadText(text: string, filename: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}
