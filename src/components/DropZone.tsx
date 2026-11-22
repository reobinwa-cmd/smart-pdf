import { useRef, useState } from 'react'
import { strings } from '../lib/i18n'

interface Props {
  onFiles: (files: File[]) => void
  compact?: boolean
}

export default function DropZone({ onFiles, compact }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    onFiles(Array.from(e.dataTransfer.files))
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
        dragging ? 'border-teal-500 bg-teal-50' : 'border-gray-300 bg-white hover:border-teal-400'
      } ${compact ? 'py-6' : ''}`}
    >
      <p className="text-lg font-semibold text-gray-800">{strings.dropTitle}</p>
      <p className="mt-2 text-sm text-gray-500">{strings.dropHint}</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) onFiles(Array.from(e.target.files))
          e.target.value = ''
        }}
      />
    </div>
  )
}
