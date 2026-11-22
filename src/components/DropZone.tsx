import { useRef, useState } from 'react'
import { strings } from '../lib/i18n'

interface Props {
  onFiles: (files: File[]) => void
  accept?: string
  multiple?: boolean
  title?: string
  hint?: string
}

export default function DropZone({ onFiles, accept = 'image/*', multiple = true, title, hint }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files)
    onFiles(multiple ? files : files.slice(0, 1))
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`w-full cursor-pointer rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
        dragging ? 'border-teal-500 bg-teal-50' : 'border-line-strong bg-surface hover:border-teal-400'
      }`}
    >
      <p className="text-lg font-semibold text-ink-soft">{title ?? strings.dropTitle}</p>
      <p className="mt-2 text-sm text-muted">{hint ?? strings.dropHint}</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) {
            const files = Array.from(e.target.files)
            onFiles(multiple ? files : files.slice(0, 1))
          }
          e.target.value = ''
        }}
      />
    </div>
  )
}
