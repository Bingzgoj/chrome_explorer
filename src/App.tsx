import { useEffect, useMemo, useRef, useState } from 'react'
import { FilterPanel } from './components/FilterPanel'
import { InfoStrip } from './components/InfoStrip'
import { PageHeader } from './components/PageHeader'
import { StatCards } from './components/StatCards'
import { ThemeToggle } from './components/ThemeToggle'
import { VersionTable } from './components/VersionTable'
import { useChromeData } from './hooks/useChromeData'
import { useTheme } from './hooks/useTheme'
import type { BinaryType, DownloadPlatform } from './types/chrome'
import { formatTimestamp } from './utils/date'
import { detectPlatform, detectPlatformSync } from './utils/platform'
import { compareVersionAsc } from './utils/version'

const platforms: DownloadPlatform[] = ['linux64', 'mac-arm64', 'mac-x64', 'win32', 'win64']
const binaryTypes: BinaryType[] = ['chrome', 'chromedriver', 'chrome-headless-shell']
const rowLimits = [25, 50, 100, 200]

function App() {
  const { theme, toggleTheme } = useTheme()
  const { data, loading, error, reload } = useChromeData()
  const [query, setQuery] = useState('')
  // Default to the OS of whoever is viewing the page.
  const [platform, setPlatform] = useState<DownloadPlatform>(() => detectPlatformSync())
  const [limit, setLimit] = useState(25)
  const platformTouched = useRef(false)

  useEffect(() => {
    let cancelled = false
    void detectPlatform().then((detected) => {
      if (!cancelled && !platformTouched.current) {
        setPlatform(detected)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const handlePlatformChange = (value: DownloadPlatform) => {
    platformTouched.current = true
    setPlatform(value)
  }

  const filtered = useMemo(() => {
    const rows = data?.versions ?? []
    const q = query.trim().toLowerCase()
    const result = q
      ? rows.filter((item) => item.version.toLowerCase().includes(q) || item.revision.toLowerCase().includes(q))
      : rows

    return [...result]
      .sort((a, b) => compareVersionAsc(b.version, a.version) || Number(b.revision) - Number(a.revision))
      .slice(0, limit)
  }, [data, query, limit])

  return (
    <div className="app-shell">
      <PageHeader
        total={data?.versions.length ?? 0}
        updatedAt={data ? formatTimestamp(data.timestamp) : undefined}
        onSync={() => void reload()}
        actions={<ThemeToggle theme={theme} onToggle={toggleTheme} />}
      />

      <InfoStrip
        items={[
          { label: 'Visible versions', value: filtered.length },
          { label: 'Selected platform', value: platform },
          { label: 'Artifact types', value: binaryTypes.length },
        ]}
      />

      <StatCards
        items={[
          { tone: 'success', label: 'Newest version on page', value: filtered[0]?.version ?? 'N/A' },
          { tone: 'accent-emphasis', label: 'Visible rows', value: filtered.length },
          { tone: 'attention', label: 'Selected platform', value: platform },
        ]}
      />

      <FilterPanel
        query={query}
        platform={platform}
        limit={limit}
        platforms={platforms}
        limits={rowLimits}
        onQueryChange={setQuery}
        onPlatformChange={handlePlatformChange}
        onLimitChange={setLimit}
      />

      {error ? <div className="error">Failed to load data: {error}</div> : null}

      <VersionTable loading={loading} rows={filtered} binaryTypes={binaryTypes} platform={platform} />
    </div>
  )
}

export default App
