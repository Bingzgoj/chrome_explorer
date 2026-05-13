import { useCallback, useEffect, useState } from 'react'
import { fetchKnownGoodVersions } from '../services/chromeService'
import type { KnownGoodVersionsResponse } from '../types/chrome'

export const useChromeData = () => {
  const [data, setData] = useState<KnownGoodVersionsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const next = await fetchKnownGoodVersions()
      setData(next)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown request error'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return { data, loading, error, reload: load }
}
