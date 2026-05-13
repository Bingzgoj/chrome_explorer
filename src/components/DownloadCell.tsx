import type { DownloadItem } from '../types/chrome'

interface DownloadCellProps {
  items?: DownloadItem[]
  platform: string
}

export const DownloadCell = ({ items, platform }: DownloadCellProps) => {
  const match = items?.find((item) => item.platform === platform)

  if (!match) {
    return <span className="color-fg-muted">—</span>
  }

  return (
    <a
      href={match.url}
      target="_blank"
      rel="noreferrer"
      className="download-icon-btn"
      title={`Download for ${platform}`}
      aria-label={`Download for ${platform}`}
    >
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7.25 1.75a.75.75 0 0 1 1.5 0v6.69l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22zM2.5 12.5a.75.75 0 0 1 .75-.75h9.5a.75.75 0 0 1 0 1.5h-9.5a.75.75 0 0 1-.75-.75"
        />
      </svg>
    </a>
  )
}
