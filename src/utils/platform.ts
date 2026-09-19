import type { DownloadPlatform } from '../types/chrome'

interface HighEntropyValues {
  platform?: string
  architecture?: string
  bitness?: string
}

interface UserAgentDataLike {
  platform?: string
  getHighEntropyValues?: (hints: string[]) => Promise<HighEntropyValues>
}

const getNavigator = () =>
  (typeof navigator === 'undefined' ? undefined : navigator) as
    | (Navigator & { userAgentData?: UserAgentDataLike })
    | undefined

const isWindows64 = (userAgent: string) => /win64|wow64|x64|amd64|arm64/.test(userAgent)

const fromHighEntropyValues = ({ platform = '', architecture = '', bitness = '' }: HighEntropyValues) => {
  const name = platform.toLowerCase()
  const arch = architecture.toLowerCase()

  if (name.includes('windows')) {
    return bitness === '32' || arch === 'x86' ? 'win32' : 'win64'
  }
  if (name.includes('mac') || name.includes('darwin')) {
    return arch === 'arm' ? 'mac-arm64' : 'mac-x64'
  }
  if (name.includes('chrome os') || name.includes('linux')) {
    return 'linux64'
  }
  return undefined
}

/**
 * Best-effort synchronous guess of the platform the page is being viewed on.
 * Apple Silicon cannot be told apart from Intel synchronously, so it falls back
 * to `mac-arm64` (the common case) and is corrected by `detectPlatform`.
 */
export const detectPlatformSync = (): DownloadPlatform => {
  const nav = getNavigator()
  if (!nav) {
    return 'linux64'
  }

  const userAgent = nav.userAgent.toLowerCase()
  const fromUaData = fromHighEntropyValues({ platform: nav.userAgentData?.platform })
  if (fromUaData) {
    return fromUaData
  }

  const hinted = (nav.userAgentData?.platform ?? nav.platform ?? '').toLowerCase()
  if (hinted.includes('win') || userAgent.includes('windows')) {
    return isWindows64(userAgent) ? 'win64' : 'win32'
  }
  if (hinted.includes('mac') || userAgent.includes('mac os') || userAgent.includes('macintosh')) {
    return 'mac-arm64'
  }
  return 'linux64'
}

/**
 * Refines {@link detectPlatformSync} using the User-Agent Client Hints API when
 * available (lets us distinguish arm64 vs x64 on macOS and 32 vs 64-bit Windows).
 */
export const detectPlatform = async (): Promise<DownloadPlatform> => {
  const fallback = detectPlatformSync()
  const nav = getNavigator()
  if (!nav?.userAgentData?.getHighEntropyValues) {
    return fallback
  }

  try {
    const values = await nav.userAgentData.getHighEntropyValues(['platform', 'architecture', 'bitness'])
    return fromHighEntropyValues(values) ?? fallback
  } catch {
    return fallback
  }
}
