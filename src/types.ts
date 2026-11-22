export type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp'

export type ItemStatus = 'pending' | 'processing' | 'done' | 'error'

export interface ImageItem {
  id: string
  file: File
  previewUrl: string
  status: ItemStatus
  resultUrl?: string
  resultSize?: number
  resultName?: string
  error?: string
}
