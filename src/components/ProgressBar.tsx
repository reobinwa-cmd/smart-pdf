import { strings } from '../lib/i18n'

interface Props {
  done: number
  total: number
}

export default function ProgressBar({ done, total }: Props) {
  if (total === 0) return null
  const pct = Math.round((done / total) * 100)
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
        <span>{strings.processing}</span>
        <span>{done}/{total} — {pct}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-teal-600 transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
