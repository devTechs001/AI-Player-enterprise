import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import downloadAPI from '@api/download.api';

class DownloadService {
  constructor() {
    this.ffmpeg = null;
    this.loaded = false;
    this._dbPromise = this._openDB();
  }

  // ── IndexedDB for download persistence ──────────────────
  async _openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('UltimatePlayerDownloads', 2);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('fileHandles'))
          db.createObjectStore('fileHandles', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('downloadHistory'))
          db.createObjectStore('downloadHistory', { keyPath: 'id', autoIncrement: true });
        if (!db.objectStoreNames.contains('partialDownloads'))
          db.createObjectStore('partialDownloads', { keyPath: 'id' });
      };
    });
  }

  async _getStore(name, mode = 'readonly') {
    const db = await this._dbPromise;
    return db.transaction([name], mode).objectStore(name);
  }

  async savePartialDownload(id, data) {
    try {
      const store = await this._getStore('partialDownloads', 'readwrite');
      await store.put({ id, ...data, updatedAt: Date.now() });
    } catch (e) { /* silently fail */ }
  }

  async getPartialDownload(id) {
    try {
      const store = await this._getStore('partialDownloads');
      return new Promise((resolve) => {
        const req = store.get(id);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
    } catch { return null; }
  }

  async removePartialDownload(id) {
    try {
      const store = await this._getStore('partialDownloads', 'readwrite');
      store.delete(id);
    } catch { /* */ }
  }

  async getAllPartialDownloads() {
    try {
      const store = await this._getStore('partialDownloads');
      return new Promise((resolve) => {
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
    } catch { return []; }
  }

  // ── FFmpeg ──────────────────────────────────────────────
  async loadFFmpeg() {
    if (this.loaded) return;
    this.ffmpeg = new FFmpeg();
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd';
    await this.ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    this.loaded = true;
  }

  // ── oEmbed-based Real Metadata Fetching ────────────────
  async _fetchOEmbed(url) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
      if (!res.ok) return null;
      return await res.json();
    } catch { return null; }
  }

  _extractYouTubeID(url) {
    try {
      const u = new URL(url);
      if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('/')[0];
      const v = u.searchParams.get('v');
      if (v) return v;
      const match = u.pathname.match(/\/(embed|v)\/([^/?&]+)/);
      if (match) return match[2];
    } catch { /* */ }
    return null;
  }

  async _fetchOGImage(url) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UltimatePlayer/1.0)' },
      });
      if (!res.ok) return null;
      const html = await res.text();
      const ogImg = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
      if (ogImg) return this._decodeHtml(ogImg[1]);
      const twImg = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
      if (twImg) return this._decodeHtml(twImg[1]);
    } catch { /* */ }
    return null;
  }

  _fallbackThumbnail(platform) {
    const colors = {
      instagram: '1a1a2e,e94560', youtube: '0f0f0f,ff0000', vimeo: '1a1a2e,00adef',
      tiktok: '1a1a2e,ff0050', twitter: '1a1a2e,1da1f2', facebook: '1a1a2e,4267b2',
      unknown: '1a1a2e,6366f1',
    };
    const c = (colors[platform] || colors.unknown).split(',');
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="180"%3E%3Cdefs%3E%3ClinearGradient id="g"%3E%3Cstop offset="0%25" style="stop-color:%23${c[0]}" /%3E%3Cstop offset="100%25" style="stop-color:%23${c[1]}" /%3E%3C/defs%3E%3Crect fill="url(%23g)" width="320" height="180"/%3E%3Ctext fill="white" font-family="Arial" font-size="20" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E${(platform || 'VIDEO').toUpperCase()}%3C/text%3E%3C/svg%3E`;
  }

  // ── Real Metadata from YouTube oEmbed API ──────────────
  async _fetchYouTubeMeta(url) {
    const vid = this._extractYouTubeID(url);
    if (!vid) return null;
    try {
      const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) return null;
      const data = await res.json();
      return {
        ...data,
        videoId: vid,
        thumbnail_url: `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`,
        duration: null, // oEmbed doesn't give duration for YouTube
      };
    } catch { return null; }
  }

  // ── URL Analysis (Backend-first, oEmbed fallback) ─────
  async analyzeURL(url) {
    // Try local backend first for real YouTube API data
    const backend = await this._analyzeViaBackend(url);
    if (backend && backend.formats && backend.formats.length > 0) {
      const format = backend.formats[0];
      return {
        title: backend.title,
        thumbnail: backend.thumbnail,
        duration: backend.duration,
        fileSize: backend.formats.find(f => f.height === 1080)?.contentLength || backend.formats[0]?.contentLength || 0,
        author: backend.author,
        bestQuality: '1080p',
        availableFormats: [...new Set(backend.formats.map(f => f.container).filter(Boolean))],
        availableQualities: [...new Set(backend.formats.filter(f => f.hasVideo).map(f => f.qualityLabel).filter(Boolean))],
        resolution: '1920x1080',
        fps: backend.formats.find(f => f.hasVideo)?.fps || 30,
        codec: format?.codecs || 'H.264',
        audioCodec: 'AAC',
        audioBitrate: format?.audioBitrate ? `${format.audioBitrate}kbps` : '192kbps',
        formats: backend.formats.map(f => ({
          itag: f.itag,
          qualityLabel: f.qualityLabel,
          container: f.container,
          hasVideo: f.hasVideo,
          hasAudio: f.hasAudio,
          contentLength: f.contentLength,
          fps: f.fps,
          height: f.height,
        })),
        estimatedSize: Object.fromEntries(
          backend.formats.filter(f => f.contentLength).map(f => [f.qualityLabel, f.contentLength])
        ),
        suggestedFilename: this.generateFilename(url, backend.platform || 'youtube', backend.title),
        platform: backend.platform || 'youtube',
        videoId: backend.videoId,
      };
    }

    // Fallback: oEmbed + page scraping
    try {
      const response = await downloadAPI.parseURL(url);
      return response.data;
    } catch (error) {
      console.warn('API analysis failed, using oEmbed fallback:', error.message);
      const platform = this.detectPlatform(url);
      const vid = this._extractYouTubeID(url);

      let title = null;
      let thumbnail = null;
      let author = '';
      let duration = 180;

      if (platform === 'youtube') {
        const oembed = await this._fetchYouTubeMeta(url);
        if (oembed) {
          title = oembed.title;
          thumbnail = oembed.thumbnail_url;
          author = oembed.author_name;
        }
        duration = await this._fetchYouTubeDuration(url) || 420;
      } else if (platform === 'vimeo') {
        const oembed = await this._fetchOEmbed(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`);
        if (oembed) {
          title = oembed.title;
          thumbnail = oembed.thumbnail_url;
          duration = oembed.duration || 300;
          author = oembed.author_name;
        }
      } else if (platform === 'soundcloud') {
        const oembed = await this._fetchOEmbed(`https://soundcloud.com/oembed?url=${encodeURIComponent(url)}&format=json`);
        if (oembed) {
          title = oembed.title;
          thumbnail = oembed.thumbnail_url;
          author = oembed.author_name;
        }
      }

      if (!title) {
        const realTitle = await this.fetchPageTitle(url, platform);
        title = realTitle || this.generateTitleFromURL(url, platform);
      }
      if (!thumbnail && platform === 'youtube' && vid) {
        thumbnail = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
      } else if (!thumbnail) {
        thumbnail = await this._fetchOGImage(url);
      }

      const bitrates = {
        '2160p': 25, '1440p': 12, '1080p': 6, '720p': 3, '480p': 1.5, '360p': 0.8,
      };
      const estimatedSize = {};
      let fileSize = 0;
      for (const [quality, mbps] of Object.entries(bitrates)) {
        const bytes = Math.round(duration * mbps * 1024 * 1024 / 8);
        estimatedSize[quality] = bytes;
        if (!fileSize || quality === '1080p') fileSize = bytes;
      }

      return {
        title,
        thumbnail: thumbnail || this._fallbackThumbnail(platform),
        duration,
        fileSize,
        author,
        bestQuality: '1080p',
        availableFormats: ['mp4', 'webm', 'mkv', 'avi', 'mov'],
        availableQualities: ['2160p', '1440p', '1080p', '720p', '480p', '360p'],
        resolution: '1920x1080',
        fps: 30,
        codec: 'H.264',
        audioCodec: 'AAC',
        audioBitrate: '192kbps',
        estimatedSize,
        suggestedFilename: this.generateFilename(url, platform, title),
        platform,
        videoId: vid,
      };
    }
  }

  async _fetchYouTubeDuration(url) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(6000),
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UltimatePlayer/1.0)' },
      });
      if (!res.ok) return null;
      const html = await res.text();
      // Try to extract duration from YouTube page metadata
      const match = html.match(/"approxDurationMs":"(\d+)"/);
      if (match) return Math.round(parseInt(match[1]) / 1000);
      // Fallback: try lengthSeconds in ytInitialPlayerResponse
      const lenMatch = html.match(/"lengthSeconds":"(\d+)"/);
      if (lenMatch) return parseInt(lenMatch[1]);
      const lenMatch2 = html.match(/"lengthSeconds":(\d+)/);
      if (lenMatch2) return parseInt(lenMatch2[1]);
    } catch { /* */ }
    return null;
  }

  detectPlatform(url) {
    if (url.includes('instagram.com') || url.includes('instagr.am')) return 'instagram';
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('vimeo.com')) return 'vimeo';
    if (url.includes('tiktok.com')) return 'tiktok';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
    if (url.includes('facebook.com') || url.includes('fb.watch')) return 'facebook';
    if (url.includes('dailymotion.com') || url.includes('dai.ly')) return 'dailymotion';
    if (url.includes('twitch.tv')) return 'twitch';
    if (url.includes('soundcloud.com')) return 'soundcloud';
    if (url.includes('bandcamp.com')) return 'bandcamp';
    if (url.includes('vimeo.com')) return 'vimeo';
    return 'unknown';
  }

  // ── Real name extraction via page fetch ──────────────────
  async fetchPageTitle(url, platform) {
    try {
      const res = await fetch(url, {
        method: 'GET',
        signal: AbortSignal.timeout(8000),
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UltimatePlayer/1.0)' },
      });
      const html = await res.text();

      // Try og:title first
      const ogMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
      if (ogMatch) return this._decodeHtml(ogMatch[1]);

      // Try twitter:title
      const twMatch = html.match(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']+)["']/i);
      if (twMatch) return this._decodeHtml(twMatch[1]);

      // Try <title> tag
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (titleMatch) {
        // Strip site name suffix like " - YouTube"
        let title = this._decodeHtml(titleMatch[1]);
        title = title.replace(/\s*[-–|]\s*(YouTube|Vimeo|Instagram|TikTok|Facebook|Twitter|Dailymotion|Twitch|SoundCloud|Bandcamp).*$/i, '').trim();
        if (title) return title;
      }

      // Try og:video:url or og:url for fallback
      const urlMatch = html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i);
      if (urlMatch) {
        return this._slugToTitle(new URL(urlMatch[1]).pathname);
      }
    } catch { /* fall through to smart URL parsing */ }

    return this._smartTitleFromURL(url, platform);
  }

  _decodeHtml(str) {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }

  _slugToTitle(slug) {
    return slug
      .replace(/^\//, '')
      .replace(/\.[^.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim()
      || 'Untitled';
  }

  // ── Smart title extraction from URL patterns ────────────
  _smartTitleFromURL(url, platform) {
    try {
      const u = new URL(url);
      const path = u.pathname;

      // YouTube: extract video ID, fetch title via oEmbed (no API key)
      if (platform === 'youtube') {
        const vid = path.match(/\/(watch|embed|v)\/([^/?&]+)/)?.[2] || u.searchParams.get('v');
        if (vid) return `YouTube Video (${vid})`;
      }

      // YouTube short link
      if (platform === 'youtube' && u.hostname === 'youtu.be') {
        const vid = path.slice(1).split('/')[0];
        if (vid) return `YouTube Video (${vid})`;
      }

      // Instagram
      if (platform === 'instagram') {
        const match = path.match(/\/(p|reel|tv)\/([^/]+)/);
        if (match) return `Instagram Post (${match[2].slice(0, 10)})`;
      }

      // TikTok
      if (platform === 'tiktok') {
        const match = path.match(/\/@?([^/]+)\/video\/(\d+)/) || path.match(/\/video\/(\d+)/);
        if (match) return `TikTok Video (${match[match.length - 1].slice(0, 8)})`;
      }

      // Twitter/X
      if (platform === 'twitter') {
        const match = path.match(/\/(\w+)\/status\/(\d+)/);
        if (match) return `Tweet by @${match[1]}`;
      }

      // Facebook
      if (platform === 'facebook') {
        const match = path.match(/\/watch\/?\?v=(\d+)/) || path.match(/\/[^/]+\/videos\/(\d+)/);
        if (match) return `Facebook Video (${match[1].slice(0, 8)})`;
      }

      // SoundCloud
      if (platform === 'soundcloud') {
        const parts = path.split('/').filter(Boolean);
        if (parts.length >= 2) return parts.slice(1).join(' - ').replace(/[-_]/g, ' ');
      }

      // Generic: use last path segment as title
      const segments = path.split('/').filter(Boolean);
      if (segments.length > 0) {
        const last = segments[segments.length - 1].replace(/\.[a-z0-9]+$/i, '').replace(/[-_]/g, ' ');
        if (last && last.length > 2) return last.replace(/\b\w/g, (c) => c.toUpperCase());
      }

      // Fall back to domain-based name
      return `${platform.charAt(0).toUpperCase() + platform.slice(1)} Video (${new Date().toLocaleDateString()})`;
    } catch {
      return `Download from ${platform}`;
    }
  }

  generateTitleFromURL(url, platform) {
    // Sync — returns a best-guess instantly; the real title comes from fetchPageTitle
    return this._smartTitleFromURL(url, platform);
  }

  generateFilename(url, platform, title = null, format = 'mp4') {
    const base = (title || this.generateTitleFromURL(url, platform))
      .replace(/[<>:"/\\|?*\x00-\x1f]/g, '')  // strip illegal filesystem chars
      .trim()
      .slice(0, 120);
    return `${base}.${format}`;
  }

  // ── Local Backend API ──────────────────────────────────
  async _analyzeViaBackend(url) {
    try {
      const res = await fetch('/api/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch { return null; }
  }

  // Highest-to-lowest preference for videos with audio
  _preferredItagsWithAudio() {
    return [22, 18, 36]; // 720p+audio, 360p+audio, 240p+audio
  }

  // Highest-to-lowest preference for video-only
  _preferredItagsVideo() {
    return [137, 136, 135, 134, 133, 160]; // 1080p, 720p, 480p, 360p, 240p, 144p
  }

  _pickItag(availableFormats, preferredQuality = '1080p') {
    if (!availableFormats || availableFormats.length === 0) return 18;

    const qualityToHeight = {
      '2160p': 2160, '1440p': 1440, '1080p': 1080, '720p': 720,
      '480p': 480, '360p': 360, '240p': 240, '144p': 144,
    };
    const targetHeight = qualityToHeight[preferredQuality] || 1080;

    // Prefer formats with both audio and video
    const combined = availableFormats.filter(f => f.hasVideo && f.hasAudio && f.contentLength);
    if (combined.length > 0) {
      const sorted = combined.sort((a, b) => (b.height || 0) - (a.height || 0));
      const best = sorted.find(f => (f.height || 0) <= targetHeight) || sorted[sorted.length - 1];
      if (best) return best.itag;
    }

    // Fall back to video-only + audio
    const video = availableFormats.filter(f => f.hasVideo && !f.hasAudio && f.contentLength);
    if (video.length > 0) {
      const sorted = video.sort((a, b) => (b.height || 0) - (a.height || 0));
      const best = sorted.find(f => (f.height || 0) <= targetHeight) || sorted[sorted.length - 1];
      return best.itag;
    }

    return 18;
  }

  _pickFormat(availableFormats, preferredQuality = '1080p') {
    if (!availableFormats || availableFormats.length === 0) return null;

    const qualityToHeight = {
      '2160p': 2160, '1440p': 1440, '1080p': 1080, '720p': 720,
      '480p': 480, '360p': 360, '240p': 240, '144p': 144,
    };
    const targetHeight = qualityToHeight[preferredQuality] || 1080;

    const combined = availableFormats.filter(f => f.hasVideo && f.hasAudio && f.url);
    if (combined.length > 0) {
      const sorted = combined.sort((a, b) => (b.height || 0) - (a.height || 0));
      return sorted.find(f => (f.height || 0) <= targetHeight) || sorted[sorted.length - 1];
    }

    const video = availableFormats.filter(f => f.hasVideo && f.url);
    if (video.length > 0) {
      const sorted = video.sort((a, b) => (b.height || 0) - (a.height || 0));
      return sorted.find(f => (f.height || 0) <= targetHeight) || sorted[sorted.length - 1];
    }

    return availableFormats.find(f => f.url) || null;
  }

  async download(url, options = {}, callbacks = {}) {
    const { format = 'mp4', quality = '1080p', signal } = options;
    const { onProgress } = callbacks;

    if (onProgress) {
      onProgress({ percent: 0, downloaded: 0, total: 0, speed: 0, eta: 'Connecting...' });
    }

    // Get real format info with CDN URL from backend
    const info = await this._analyzeViaBackend(url);
    if (!info || !info.formats) {
      throw new Error('Could not fetch video info from backend');
    }

    const formatInfo = this._pickFormat(info.formats, quality);
    if (!formatInfo || !formatInfo.url) {
      throw new Error('No suitable format found');
    }

    const cdnUrl = formatInfo.url;
    const filename = `${info.title.slice(0, 120).replace(/[<>:"/\\|?*\x00-\x1f]/g, '').trim() || 'video'}.${formatInfo.container || 'mp4'}`;
    const mime = formatInfo.mimeType || 'video/mp4';
    const size = formatInfo.contentLength || 0;

    // Stream through our proxy which adds proper browser headers
    const proxyUrl = `/api/download?url=${encodeURIComponent(cdnUrl)}&filename=${encodeURIComponent(filename)}&mime=${encodeURIComponent(mime)}&size=${size}`;
    const response = await fetch(proxyUrl, { signal });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(err.error || 'Download failed');
    }

    const contentLength = size || 0;
    const reader = response.body.getReader();
    const chunks = [];
    let received = 0;
    let startTime = Date.now();
    let lastReport = startTime;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      received += value.length;
      const now = Date.now();

      if (onProgress && (now - lastReport > 200)) {
        lastReport = now;
        const elapsed = (now - startTime) / 1000;
        const percent = contentLength ? Math.min(100, Math.round((received / contentLength) * 100)) : 0;
        const speed = elapsed > 0 ? Math.round(received / (1024 * 1024) / elapsed * 8) : 0;
        const remaining = contentLength ? (contentLength - received) / (received / elapsed) : 0;

        onProgress({
          percent,
          downloaded: received,
          total: contentLength || received,
          speed,
          eta: this.formatETA(Math.round(remaining)),
        });
      }
    }

    const blob = new Blob(chunks, { type: mime });
    const result = await this.triggerDownload(blob, filename);

    if (onProgress) {
      onProgress({ percent: 100, downloaded: received, total: received, speed: 0, eta: 'Complete' });
    }

    return { success: true, method: 'stream', ...result };
  }

  async resumeDownload(downloadId, url, options = {}, callbacks = {}) {
    return this.download(url, { ...options, downloadId }, callbacks);
  }

  formatETA(seconds) {
    if (!seconds || seconds <= 0) return '0s';
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.round(seconds % 60);
      return `${mins}m ${secs}s`;
    }
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  }

  async triggerDownload(blob, filename) {
    // Try to use File System Access API for Downloads folder
    if ('showSaveFilePicker' in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: filename,
          types: [{
            description: 'Video File',
            accept: { 'video/mp4': ['.mp4'], 'video/webm': ['.webm'], 'audio/mpeg': ['.mp3'] },
          }],
          startIn: 'downloads',
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        
        // Store file handle for future access
        await this.storeFileHandle(handle, filename);
        
        return { success: true, path: handle.name };
      } catch (err) {
        // User cancelled or API not fully supported, fall back to traditional download
        console.log('File System Access API failed, using fallback:', err.message);
      }
    }

    // Fallback: traditional download to default Downloads folder
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
    
    return { success: true, path: filename };
  }

  async storeFileHandle(handle, filename) {
    try {
      // Store file handle in IndexedDB for future access
      const db = await this.openDB();
      const transaction = db.transaction(['fileHandles'], 'readwrite');
      const store = transaction.objectStore('fileHandles');
      
      await store.put({
        id: filename,
        name: filename,
        handle: handle,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error('Failed to store file handle:', err);
    }
  }

  async openDB() {
    // Use the shared connection to avoid version conflicts
    const db = await this._dbPromise;
    return db;
  }

  async getStoredFileHandles() {
    try {
      const db = await this.openDB();
      const transaction = db.transaction(['fileHandles'], 'readonly');
      const store = transaction.objectStore('fileHandles');
      
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (err) {
      console.error('Failed to get file handles:', err);
      return [];
    }
  }

  async addToDownloadHistory(download) {
    try {
      const db = await this.openDB();
      const transaction = db.transaction(['downloadHistory'], 'readwrite');
      const store = transaction.objectStore('downloadHistory');
      
      await store.add({
        ...download,
        timestamp: Date.now(),
        platform: this.detectPlatform(download.url),
      });
    } catch (err) {
      console.error('Failed to add to history:', err);
    }
  }

  async getDownloadHistory() {
    try {
      const db = await this.openDB();
      const transaction = db.transaction(['downloadHistory'], 'readonly');
      const store = transaction.objectStore('downloadHistory');
      
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result.reverse());
        request.onerror = () => reject(request.error);
      });
    } catch (err) {
      console.error('Failed to get download history:', err);
      return [];
    }
  }

  async convertFormat(file, targetFormat, options = {}) {
    await this.loadFFmpeg();

    const inputName = 'input.' + (file.type.split('/')[1] || 'mp4');
    const outputName = 'output.' + targetFormat;

    // Write input file
    await this.ffmpeg.writeFile(inputName, await fetchFile(file));

    // Run conversion
    const ffmpegArgs = this.getFFmpegArgs(inputName, outputName, options);
    await this.ffmpeg.exec(ffmpegArgs);

    // Read output file
    const data = await this.ffmpeg.readFile(outputName);
    const blob = new Blob([data.buffer], { type: `video/${targetFormat}` });

    return blob;
  }

  getFFmpegArgs(input, output, options = {}) {
    const args = ['-i', input];

    // Video codec
    if (options.videoCodec) {
      args.push('-c:v', options.videoCodec);
    }

    // Audio codec
    if (options.audioCodec) {
      args.push('-c:a', options.audioCodec);
    }

    // Bitrate
    if (options.videoBitrate) {
      args.push('-b:v', options.videoBitrate);
    }

    if (options.audioBitrate) {
      args.push('-b:a', options.audioBitrate);
    }

    // Resolution
    if (options.resolution) {
      args.push('-s', options.resolution);
    }

    // Output
    args.push(output);

    return args;
  }

  getSupportedFormats() {
    return {
      video: [
        { id: 'mp4', label: 'MP4', mimeType: 'video/mp4' },
        { id: 'mkv', label: 'MKV', mimeType: 'video/x-matroska' },
        { id: 'webm', label: 'WebM', mimeType: 'video/webm' },
        { id: 'avi', label: 'AVI', mimeType: 'video/x-msvideo' },
        { id: 'mov', label: 'MOV', mimeType: 'video/quicktime' },
        { id: 'flv', label: 'FLV', mimeType: 'video/x-flv' },
        { id: 'wmv', label: 'WMV', mimeType: 'video/x-ms-wmv' },
        { id: '3gp', label: '3GP', mimeType: 'video/3gpp' },
      ],
      audio: [
        { id: 'mp3', label: 'MP3', mimeType: 'audio/mpeg' },
        { id: 'aac', label: 'AAC', mimeType: 'audio/aac' },
        { id: 'wav', label: 'WAV', mimeType: 'audio/wav' },
        { id: 'flac', label: 'FLAC', mimeType: 'audio/flac' },
        { id: 'ogg', label: 'OGG', mimeType: 'audio/ogg' },
        { id: 'm4a', label: 'M4A', mimeType: 'audio/mp4' },
        { id: 'wma', label: 'WMA', mimeType: 'audio/x-ms-wma' },
      ],
    };
  }

  getQualityOptions() {
    return [
      { id: '4320p', label: '8K', resolution: '7680x4320' },
      { id: '2160p', label: '4K', resolution: '3840x2160' },
      { id: '1440p', label: '2K', resolution: '2560x1440' },
      { id: '1080p', label: 'Full HD', resolution: '1920x1080' },
      { id: '720p', label: 'HD', resolution: '1280x720' },
      { id: '480p', label: 'SD', resolution: '854x480' },
      { id: '360p', label: 'Low', resolution: '640x360' },
      { id: '240p', label: 'Very Low', resolution: '426x240' },
    ];
  }
}

export const downloadService = new DownloadService();
export default downloadService;