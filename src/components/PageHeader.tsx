import type { ReactNode } from 'react'

interface PageHeaderProps {
  total: number
  updatedAt?: string
  onSync: () => void
  actions: ReactNode
}

export const PageHeader = ({ total, updatedAt, onSync, actions }: PageHeaderProps) => {
  return (
    <header className="panel">
      <div className="Subhead">
        <div className="Subhead-heading">Release Browser</div>
        <div className="Subhead-description">Known good versions and direct platform downloads</div>
      </div>

      <div className="d-flex flex-wrap flex-items-center flex-justify-between gap-3">
        <div>
          <h1 className="h2 mb-1">
            Chrome for Testing Explorer <span className="Counter">{total}</span>
          </h1>
          <p className="color-fg-muted mb-0">
            Source: known-good-versions-with-downloads.json
            {updatedAt ? ` · Updated ${updatedAt}` : ''}
          </p>
        </div>

        <div className="BtnGroup">
          <button type="button" className="btn btn-sm" onClick={onSync}>
            Sync
          </button>
          {actions}
        </div>
      </div>
    </header>
  )
}
