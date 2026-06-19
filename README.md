# AI Ultimate Player

Enterprise-grade AI-powered video player and universal downloader built with React 18 + Vite.

## Quick Start

```bash
npm install && npm run dev
```

## ✅ Progress Made

### Real Download Engine (No Simulation)
- **YouTube oEmbed metadata**: Fetches real title, author, thumbnail via `youtube.com/oembed` (no API key)
- **Real download via redirect**: Opens `api.vevioz.com/api/button/videos/VIDEO_ID` — browser handles actual download natively
- **Smart fallback chain**: oEmbed → page scrape → URL parsing (never fake 50MB)
- **Dynamic file size calculation**: Estimated from duration × bitrate per quality level
- **Format/Quality sizes**: Shows realistic file size per option
- **Screen Wake Lock**: `useWakeLock` hook keeps screen awake during processing

### UI & UX
- **Side drawer** (replaces dropdown): Spring animation, overlay backdrop blur, close button, touch-friendly
- **Device storage scanning**: `scanGallery()`, `scanMusic()`, `scanPictures()`, `scanDownloads()` using `showDirectoryPicker` with well-known dirs
- **Drag-and-drop**: DropZone component for dropping files into library
- **Platform badge icons**: Real YouTube/Instagram/TikTok/Twitter/Facebook/SoundCloud/Vimeo/Twitch icons on media cards
- **PWA**: Manifest, service worker, beforeinstallprompt hook (`usePWA`), install banner
- **Auto-update service**: Hourly GitHub release check with semver comparison
- **Network status hook**: `useNetworkStatus` reports online/offline, connection type, downlink
- **Permissions system**: Reusable `usePermissions` hook matching Flutter's `permission_handler` API
- **Mobile responsive**: Drawer 100% width on <480px, stat grid, format chips, side drawer with overlay tap dismiss

### Deployment Configs
- `render.yaml` — Render.com static site with SPA rewrite
- `netlify.toml` — Netlify deploy with caching headers and SPA redirect
- `.github/workflows/deploy.yml` — GitHub Actions → GitHub Pages

### Infrastructure
- Vite 8 with `@vitejs/plugin-react` v6
- `:global` cleanup in non-module SCSS files
- IndexedDB version conflict fix (reuse `_dbPromise`)

## 📋 Remaining Work

### High Priority
- [ ] **Production PWA icons**: Replace placeholder 1×1 PNGs with real 192×192 and 512×512 maskable icons
- [ ] **Service worker**: Register and cache strategy for offline support
- [ ] **End-to-end tests**: Playwright tests (`npm run test:e2e`)
- [ ] **CI pipeline**: Add lint + typecheck + test steps to GitHub Actions
- [ ] **Custom backend API**: Deploy a Node.js/yt-dlp backend for real direct downloads with progress

### Medium Priority
- [ ] **Video player page**: Wire up `/player/video/:id` and `/player/music/:id` routes
- [ ] **Media preview**: Full-screen gallery component
- [ ] **Auth pages**: Wire forms to real API
- [ ] **Keyboard shortcuts**: Play/pause, volume, fullscreen

### Low Priority
- [ ] **Music player**: Howler.js playback for `/music/*` routes
- [ ] **Collaboration**: Socket.io watch parties
- [ ] **Admin dashboard**: User management, content moderation
- [ ] **i18n translations**: Complete locale files
- [ ] **Dark/Neon themes**: Polish remaining theme overrides

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 18, Vite 8 |
| State | Redux Toolkit, React Query, Zustand |
| Routing | React Router v6 (lazy routes) |
| Styling | SCSS Modules, CSS custom properties |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| Video | React Player, Video.js |
| Audio | Howler.js, WaveSurfer.js |
| AI | TensorFlow.js, Tesseract.js |
| Media | FFmpeg.wasm |
| Real-time | Socket.io |
| Icons | react-icons (Feather, FontAwesome, SimpleIcons) |
| Charts | Recharts |
| Testing | Vitest, Playwright |
