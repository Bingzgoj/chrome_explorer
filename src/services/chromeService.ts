import { DATA_URL } from '../constants/chrome'
import type { KnownGoodVersionsResponse } from '../types/chrome'

export const fetchKnownGoodVersions = async () => {
  const response = await fetch(DATA_URL)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  const payload = (await response.json()) as KnownGoodVersionsResponse
  return payload
}
