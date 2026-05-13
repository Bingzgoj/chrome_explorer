export type DownloadPlatform = 'linux64' | 'mac-arm64' | 'mac-x64' | 'win32' | 'win64'

export interface DownloadItem {
  platform: DownloadPlatform
  url: string
}

export interface VersionDownloads {
  chrome?: DownloadItem[]
  chromedriver?: DownloadItem[]
  'chrome-headless-shell'?: DownloadItem[]
}

export interface VersionItem {
  version: string
  revision: string
  downloads: VersionDownloads
}

export interface KnownGoodVersionsResponse {
  timestamp: string
  versions: VersionItem[]
}

export type BinaryType = keyof VersionDownloads
