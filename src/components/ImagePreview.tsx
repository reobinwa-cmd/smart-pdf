import type { ImageItem } from '../types'
import { formatBytes, isHeic } from '../lib/image'
import { strings } from '../lib/i18n'

interface Props {
  items: ImageItem[]
  onRemove: (id: string) => void
}

export default function ImagePreview({ items, onRemove }: Props) {
  if (items.length === 0) return null
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {items.map((item) => (
        <figure key={item.id} className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
          {isHeic(item.file) ? (
            <div className="flex h-28 w-full items-center justify-center bg-teal-50 text-2xl" title="HEIC">
              📷
            </div>
          ) : (
            <img src={item.previewUrl} alt={item.file.name} className="h-28 w-full object-cover" />
          )}
          <figcaption className="truncate px-2 py-1 text-xs text-gray-600" title={item.file.name}>
            {item.file.name}
          </figcaption>
          <span className="absolute bottom-7 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
            {formatBytes(item.file.size)}
          </span>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="absolute top-1 left-1 rounded-full bg-white/90 px-2 py-0.5 text-xs text-red-600 shadow hover:bg-red-50"
            aria-label={strings.remove}
          >
            ✕
          </button>
        </figure>
      ))}
    </div>
  )
}
