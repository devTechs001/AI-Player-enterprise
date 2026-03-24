// Download configuration
import { FILE_LIMITS, SUPPORTED_FORMATS, CACHE_DURATIONS } from './constants';

// Download settings
export const DOWNLOAD_CONFIG = {
  // Default download settings
  defaults: {
    quality: '720p',
    format: 'mp4',
    subtitles: true,
    audioOnly: false,
    concurrent: 3,
    retryAttempts: 3,
    chunkSize: 1024 * 1024, // 1MB chunks
    timeout: 300000, // 5 minutes
  },
  
  // Download paths
  paths: {
    temp: '/downloads/temp',
    completed: '/downloads/completed',
    failed: '/downloads/failed',
    queue: '/downloads/queue',
  },
  
  // File size limits
  limits: {
    maxFileSize: FILE_LIMITS.VIDEO_MAX_SIZE,
    maxConcurrentDownloads: 5,
    maxQueueSize: 100,
    maxRetryAttempts: 5,
  },
  
  // Supported formats and quality options
  formats: {
    video: SUPPORTED_FORMATS.VIDEO,
    audio: SUPPORTED_FORMATS.AUDIO,
    subtitle: SUPPORTED_FORMATS.SUBTITLE,
  },
  
  // Quality presets
  qualities: {
    '4K': { resolution: '3840x2160', bitrate: 15000, fps: 30 },
    '1080p': { resolution: '1920x1080', bitrate: 5000, fps: 30 },
    '720p': { resolution: '1280x720', bitrate: 2500, fps: 30 },
    '480p': { resolution: '854x480', bitrate: 1000, fps: 30 },
    '360p': { resolution: '640x360', bitrate: 500, fps: 30 },
    '240p': { resolution: '426x240', bitrate: 250, fps: 30 },
  },
  
  // Audio quality presets
  audioQualities: {
    '320kbps': { bitrate: 320, sampleRate: 48000, channels: 2 },
    '256kbps': { bitrate: 256, sampleRate: 48000, channels: 2 },
    '192kbps': { bitrate: 192, sampleRate: 44100, channels: 2 },
    '128kbps': { bitrate: 128, sampleRate: 44100, channels: 2 },
    '96kbps': { bitrate: 96, sampleRate: 44100, channels: 2 },
    '64kbps': { bitrate: 64, sampleRate: 22050, channels: 1 },
  },
  
  // Download strategies
  strategies: {
    // Progressive download (streaming)
    progressive: {
      enabled: true,
      bufferSize: 1024 * 1024, // 1MB buffer
      seekable: true,
    },
    
    // Chunked download (for large files)
    chunked: {
      enabled: true,
      chunkSize: 1024 * 1024, // 1MB chunks
      maxConcurrentChunks: 4,
      verifyIntegrity: true,
    },
    
    // Parallel download (multiple connections)
    parallel: {
      enabled: true,
      connections: 4,
      loadBalancing: true,
    },
  },
  
  // Conversion settings
  conversion: {
    // Video conversion
    video: {
      enabled: true,
      formats: ['mp4', 'webm', 'avi', 'mov'],
      codecs: {
        video: ['h264', 'h265', 'vp9', 'av1'],
        audio: ['aac', 'mp3', 'opus', 'vorbis'],
      },
      presets: {
        ultrafast: { speed: 'ultrafast', quality: 'low' },
        fast: { speed: 'fast', quality: 'medium' },
        medium: { speed: 'medium', quality: 'high' },
        slow: { speed: 'slow', quality: 'very_high' },
      },
    },
    
    // Audio conversion
    audio: {
      enabled: true,
      formats: ['mp3', 'wav', 'flac', 'aac', 'ogg'],
      normalization: true,
      enhancement: {
        bassBoost: false,
        trebleBoost: false,
        noiseReduction: true,
      },
    },
    
    // Subtitle conversion
    subtitles: {
      enabled: true,
      formats: ['srt', 'vtt', 'ass', 'ssa'],
      encoding: 'utf-8',
      sync: true,
    },
  },
  
  // Metadata extraction
  metadata: {
    enabled: true,
    extract: {
      title: true,
      description: true,
      duration: true,
      bitrate: true,
      resolution: true,
      codec: true,
      fileSize: true,
      thumbnail: true,
    },
    save: {
      embedded: true,
      separate: true,
      format: 'json',
    },
  },
  
  // Queue management
  queue: {
    maxItems: 100,
    priorityLevels: ['low', 'normal', 'high', 'urgent'],
    autoRetry: true,
    retryDelay: 5000, // 5 seconds
    maxRetries: 3,
    persistence: true, // Save queue to storage
  },
  
  // Progress tracking
  progress: {
    updateInterval: 1000, // Update every second
    precision: 2, // Decimal places for percentage
    showETA: true,
    showSpeed: true,
    showTimeRemaining: true,
  },
  
  // Notifications
  notifications: {
    enabled: true,
    events: [
      'started',
      'progress',
      'paused',
      'resumed',
      'completed',
      'failed',
      'cancelled',
    ],
    desktop: true,
    sound: true,
    persistent: false,
  },
  
  // Storage management
  storage: {
    autoCleanup: true,
    cleanupInterval: 86400000, // 24 hours
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxStorage: 10 * 1024 * 1024 * 1024, // 10GB
    compression: true,
  },
  
  // Security settings
  security: {
    verifyChecksum: true,
    scanForMalware: true,
    allowedDomains: [], // Empty list allows all domains
    blockedDomains: [],
    userAgent: 'AI Video Player Enterprise/1.0',
  },
  
  // Network settings
  network: {
    timeout: 30000, // 30 seconds
    keepAlive: true,
    maxRedirects: 5,
    retryOnTimeout: true,
    retryOnNetworkError: true,
    bandwidthLimit: 0, // 0 = no limit
  },
  
  // User preferences
  preferences: {
    defaultQuality: '720p',
    defaultFormat: 'mp4',
    autoDownloadSubtitles: true,
    preferAudioOnly: false,
    downloadLocation: 'default',
    createSubfolders: true,
    overwriteExisting: false,
    generateThumbnails: true,
  },
  
  // Batch download settings
  batch: {
    maxItems: 50,
    delayBetweenItems: 1000, // 1 second
    continueOnError: true,
    generatePlaylist: true,
    compressDownloads: false,
  },
  
  // Scheduled downloads
  schedule: {
    enabled: true,
    offPeakHours: {
      start: '02:00',
      end: '06:00',
    },
    maxConcurrentScheduled: 2,
    autoStart: true,
    notifications: true,
  },
  
  // Integration settings
  integrations: {
    // YouTube
    youtube: {
      enabled: true,
      apiKey: '',
      formats: ['mp4', 'webm'],
      quality: '720p',
    },
    
    // Vimeo
    vimeo: {
      enabled: true,
      accessToken: '',
      formats: ['mp4'],
      quality: '720p',
    },
    
    // Twitch
    twitch: {
      enabled: true,
      clientId: '',
      formats: ['mp4'],
      quality: '720p',
    },
  },
  
  // Analytics and logging
  analytics: {
    enabled: true,
    trackDownloads: true,
    trackErrors: true,
    trackPerformance: true,
    logLevel: 'info', // 'debug', 'info', 'warn', 'error'
    retention: 30, // days
  },
};

// Download utilities
export const DOWNLOAD_UTILS = {
  // Format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  
  // Format download speed
  formatSpeed: (bytesPerSecond) => {
    return DOWNLOAD_UTILS.formatFileSize(bytesPerSecond) + '/s';
  },
  
  // Format duration
  formatDuration: (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  },
  
  // Calculate ETA
  calculateETA: (downloaded, total, speed) => {
    if (speed === 0) return null;
    const remaining = total - downloaded;
    const seconds = remaining / speed;
    return DOWNLOAD_UTILS.formatDuration(seconds);
  },
  
  // Validate URL
  validateURL: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  // Extract video ID from URL
  extractVideoID: (url) => {
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeMatch) return { platform: 'youtube', id: youtubeMatch[1] };
    
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return { platform: 'vimeo', id: vimeoMatch[1] };
    
    // Twitch
    const twitchMatch = url.match(/twitch\.tv\/videos\/(\d+)/);
    if (twitchMatch) return { platform: 'twitch', id: twitchMatch[1] };
    
    return null;
  },
};

export default {
  DOWNLOAD_CONFIG,
  DOWNLOAD_UTILS,
};
