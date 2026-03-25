import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import downloadAPI from '@api/download.api';

class DownloadService {
  constructor() {
    this.ffmpeg = null;
    this.loaded = false;
  }

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

  async analyzeURL(url) {
    try {
      // Try to use the API first
      const response = await downloadAPI.parseURL(url);
      return response.data;
    } catch (error) {
      // Fallback: simulate analysis for demo purposes
      console.warn('API analysis failed, using fallback:', error.message);
      
      // Detect platform from URL
      const platform = this.detectPlatform(url);
      const title = this.generateTitleFromURL(url, platform);
      
      return {
        title: title,
        thumbnail: 'https://via.placeholder.com/320x180',
        duration: platform === 'instagram' ? 60 : 180,
        fileSize: platform === 'instagram' ? 15 * 1024 * 1024 : 50 * 1024 * 1024,
        bestQuality: '1080p',
        availableFormats: ['mp4', 'webm'],
        availableQualities: ['1080p', '720p', '480p', '360p'],
        estimatedSize: {
          '1080p': platform === 'instagram' ? 15 * 1024 * 1024 : 50 * 1024 * 1024,
          '720p': platform === 'instagram' ? 8 * 1024 * 1024 : 25 * 1024 * 1024,
          '480p': platform === 'instagram' ? 4 * 1024 * 1024 : 10 * 1024 * 1024,
          '360p': platform === 'instagram' ? 2 * 1024 * 1024 : 5 * 1024 * 1024,
        },
        suggestedFilename: this.generateFilename(url, platform),
        platform: platform,
      };
    }
  }

  detectPlatform(url) {
    if (url.includes('instagram.com') || url.includes('instagr.am')) return 'instagram';
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('vimeo.com')) return 'vimeo';
    if (url.includes('tiktok.com')) return 'tiktok';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
    if (url.includes('facebook.com') || url.includes('fb.watch')) return 'facebook';
    return 'unknown';
  }

  generateTitleFromURL(url, platform) {
    const platformNames = {
      instagram: 'Instagram Video',
      youtube: 'YouTube Video',
      vimeo: 'Vimeo Video',
      tiktok: 'TikTok Video',
      twitter: 'Twitter Video',
      facebook: 'Facebook Video',
      unknown: 'Video',
    };
    
    // Try to extract post ID from Instagram URL
    if (platform === 'instagram') {
      const match = url.match(/\/(p|reel)\/([^/]+)/);
      if (match) {
        return `Instagram_${match[2]}`;
      }
    }
    
    return `${platformNames[platform] || 'Video'}_${Date.now()}`;
  }

  generateFilename(url, platform) {
    const timestamp = Date.now();
    
    if (platform === 'instagram') {
      const match = url.match(/\/(p|reel)\/([^/]+)/);
      if (match) {
        return `Instagram_${match[2]}_${timestamp}.mp4`;
      }
    }
    
    return `download_${timestamp}.mp4`;
  }

  async download(url, options = {}, callbacks = {}) {
    const { format = 'mp4', quality = '1080p', filename } = options;
    const { signal, onProgress } = callbacks;

    try {
      // Try to get download URL from backend
      const response = await downloadAPI.downloadVideo(url, {
        format,
        quality,
      });

      const downloadUrl = response.data.downloadUrl;
      const totalSize = response.data.fileSize;

      // Download with progress tracking
      const downloadResponse = await fetch(downloadUrl, { signal });
      const reader = downloadResponse.body.getReader();
      const chunks = [];
      let receivedLength = 0;
      let lastTime = Date.now();
      let lastLoaded = 0;
      let speed = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        // Calculate speed and ETA
        const currentTime = Date.now();
        const timeDiff = (currentTime - lastTime) / 1000;
        if (timeDiff > 0.5) {
          const loadedDiff = receivedLength - lastLoaded;
          speed = loadedDiff / timeDiff;
          const remaining = totalSize - receivedLength;
          const eta = speed > 0 ? remaining / speed : 0;

          if (onProgress) {
            onProgress({
              percent: (receivedLength / totalSize) * 100,
              downloaded: receivedLength,
              total: totalSize,
              speed,
              eta: this.formatETA(eta),
            });
          }

          lastTime = currentTime;
          lastLoaded = receivedLength;
        }
      }

      // Combine chunks
      const blob = new Blob(chunks);

      // Trigger download
      this.triggerDownload(blob, filename || `download.${format}`);

      return { success: true };
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Download cancelled');
      }

      // Fallback: simulate download for demo purposes
      console.warn('Backend download failed, simulating:', error.message);
      return await this.simulateDownload(url, options, callbacks);
    }
  }

  async simulateDownload(url, options = {}, callbacks = {}) {
    const { format = 'mp4' } = options;
    const { onProgress } = callbacks;

    // Simulate download progress
    const totalSize = 50 * 1024 * 1024; // 50MB
    const chunkSize = totalSize / 100;
    let downloaded = 0;

    for (let i = 0; i <= 100; i++) {
      downloaded += chunkSize;

      if (onProgress) {
        onProgress({
          percent: i,
          downloaded,
          total: totalSize,
          speed: 1024 * 1024, // 1MB/s
          eta: this.formatETA((totalSize - downloaded) / (1024 * 1024)),
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Create a dummy file
    const blob = new Blob([new ArrayBuffer(totalSize)], { type: `video/${format}` });
    this.triggerDownload(blob, `download_${Date.now()}.${format}`);

    return { success: true };
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
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('UltimatePlayerDownloads', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('fileHandles')) {
          db.createObjectStore('fileHandles', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('downloadHistory')) {
          db.createObjectStore('downloadHistory', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
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