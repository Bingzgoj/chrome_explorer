import { DownloadCell } from './DownloadCell'
import type { BinaryType, DownloadPlatform, VersionItem } from '../types/chrome'

interface VersionTableProps {
  loading: boolean
  rows: VersionItem[]
  binaryTypes: BinaryType[]
  platform: DownloadPlatform
}

const columnLabels: Record<BinaryType, string> = {
  chrome: 'Chrome Browser',
  chromedriver: 'ChromeDriver',
  'chrome-headless-shell': 'Headless Shell',
}

export const VersionTable = ({ loading, rows, binaryTypes, platform }: VersionTableProps) => {
  return (
    <section className="panel overflow-auto table-wrap">
      <table className="width-full">
        <thead>
          <tr>
            <th className="p-2 border-bottom">Version</th>
            <th className="p-2 border-bottom">Revision</th>
            {binaryTypes.map((type) => (
              <th key={type} className="p-2 border-bottom">
                <span className="Label Label--secondary">{columnLabels[type]}</span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td className="p-3 color-fg-muted" colSpan={5}>
                Loading versions...
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td className="p-3 color-fg-muted" colSpan={5}>
                No matching versions found.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={`${row.version}-${row.revision}`}>
                <td className="p-2 border-bottom text-mono">{row.version}</td>
                <td className="p-2 border-bottom text-mono color-fg-muted">{row.revision}</td>
                {binaryTypes.map((type) => (
                  <td key={type} className="p-2 border-bottom">
                    <DownloadCell items={row.downloads[type]} platform={platform} />
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  )
}
