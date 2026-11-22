import type { OutputFormat } from '../types'
import { strings } from '../lib/i18n'

interface Props {
  quality: number
  format: OutputFormat
  onQuality: (q: number) => void
  onFormat: (f: OutputFormat) => void
  disabled: boolean
}

const FORMATS: { value: OutputFormat; label: string }[] = [
  { value: 'image/jpeg', label: strings.formatJpeg },
  { value: 'image/png', label: strings.formatPng },
  { value: 'image/webp', label: strings.formatWebp },
]

export default function CompressControls({ quality, format, onQuality, onFormat, disabled }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:gap-8">
      <label className="flex flex-1 items-center gap-3">
        <span className="w-16 shrink-0 text-sm font-medium text-ink-soft">
          {strings.quality}: <span className="text-teal-700">{quality}%</span>
        </span>
        <input
          type="range"
          min={10}
          max={100}
          value={quality}
          disabled={disabled || format === 'image/png'}
          onChange={(e) => onQuality(Number(e.target.value))}
          className="h-2 flex-1 cursor-pointer accent-teal-600"
        />
      </label>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-ink-soft">{strings.format}</span>
        <div className="flex rounded-lg border border-line-strong p-0.5">
          {FORMATS.map((f) => (
            <button
              key={f.value}
              type="button"
              disabled={disabled}
              onClick={() => onFormat(f.value)}
              className={`rounded-md px-3 py-1 text-sm transition-colors ${
                format === f.value ? 'bg-teal-600 text-white' : 'text-muted hover:bg-surface-3'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
