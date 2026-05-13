# Chrome for Testing Explorer

A production-ready React + TypeScript frontend for browsing Chrome for Testing known-good versions and platform downloads.

## Features

- Live data from GoogleChromeLabs JSON endpoint
- Search by version or revision
- Platform selector for direct download links
- Row limit controls for fast browsing
- Refresh action for manual re-fetch
- Primer-style UI with clear light and dark modes

## Tech Stack

- React 19
- TypeScript
- Vite
- Primer CSS

## Project Structure

```
src/
  components/
    DownloadCell.tsx
    ThemeToggle.tsx
  constants/
    chrome.ts
  hooks/
    useChromeData.ts
    useTheme.ts
  services/
    chromeService.ts
  types/
    chrome.ts
  utils/
    date.ts
  App.tsx
  index.css
  main.tsx
```

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Data Source

- https://googlechromelabs.github.io/chrome-for-testing/known-good-versions-with-downloads.json

## License

MIT
