import type { DownloadPlatform } from '../types/chrome'

interface FilterPanelProps {
  query: string
  platform: DownloadPlatform
  limit: number
  platforms: DownloadPlatform[]
  limits: number[]
  onQueryChange: (value: string) => void
  onPlatformChange: (value: DownloadPlatform) => void
  onLimitChange: (value: number) => void
}

export const FilterPanel = ({
  query,
  platform,
  limit,
  platforms,
  limits,
  onQueryChange,
  onPlatformChange,
  onLimitChange,
}: FilterPanelProps) => {
  return (
    <section className="panel">
      <div className="d-flex flex-wrap gap-3 flex-items-end">
        <label className="form-group">
          <span className="form-group-label">Version search</span>
          <input
            className="form-control"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="e.g. 136.0"
          />
        </label>

        <label className="form-group">
          <span className="form-group-label">Platform</span>
          <select
            className="form-select"
            value={platform}
            onChange={(event) => onPlatformChange(event.target.value as DownloadPlatform)}
          >
            {platforms.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="form-group">
          <span className="form-group-label">Rows</span>
          <select className="form-select" value={limit} onChange={(event) => onLimitChange(Number(event.target.value))}>
            {limits.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}
