// Video player configuration
import { VIDEO_QUALITIES, AUDIO_QUALITIES, PLAYBACK_SPEEDS, DEFAULT_SETTINGS } from './constants';

// Default player settings
export const PLAYER_DEFAULTS = {
  autoplay: DEFAULT_SETTINGS.AUTOPLAY,
  controls: true,
  responsive: true,
  fluid: false,
  playbackRates: PLAYBACK_SPEEDS,
  defaultPlaybackRate: DEFAULT_SETTINGS.SPEED,
  volume: DEFAULT_SETTINGS.VOLUME,
  muted: false,
  loop: false,
  preload: 'metadata',
  language: 'en',
  languages: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh'],
  poster: '',
  crossOrigin: 'anonymous',
};

// Video quality configuration
export const VIDEO_CONFIG = {
  qualities: VIDEO_QUALITIES,
  defaultQuality: 'auto',
  adaptive: true,
  bitrateSwitching: {
    enabled: true,
    strategy: 'bandwidth', // 'bandwidth', 'buffer', 'quality'
    switchThreshold: 0.8, // Switch quality when buffer is below 80%
  },
  drm: {
    enabled: false,
    widevine: {
      url: '',
      licenseUrl: '',
    },
    playready: {
      url: '',
      licenseUrl: '',
    },
  },
};

// Audio configuration
export const AUDIO_CONFIG = {
  qualities: AUDIO_QUALITIES,
  defaultQuality: 'MEDIUM',
  normalize: true,
  enhancement: {
    bassBoost: false,
    trebleBoost: false,
    vocalEnhancement: false,
  },
  visualization: {
    enabled: false,
    type: 'bars', // 'bars', 'wave', 'circular'
    colors: ['#6366f1', '#ec4899', '#10b981'],
  },
};

// Subtitle configuration
export const SUBTITLE_CONFIG = {
  enabled: DEFAULT_SETTINGS.SUBTITLES,
  defaultLanguage: 'en',
  fontSize: 16,
  fontColor: '#ffffff',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  position: 'bottom', // 'top', 'center', 'bottom'
  alignment: 'center', // 'left', 'center', 'right'
  maxWidth: '80%',
  lineHeight: 1.2,
  fontFamily: 'Inter, sans-serif',
  styles: {
    '.vjs-text-track': {
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    },
  },
};

// UI configuration
export const UI_CONFIG = {
  theme: 'dark', // 'light', 'dark', 'neon'
  skin: 'default', // 'default', 'minimal', 'cinema'
  controls: {
    alwaysVisible: false,
    hideDelay: 3000, // Hide controls after 3 seconds
    showOnHover: true,
    showOnActivity: true,
    touchFriendly: true,
  },
  loading: {
    spinner: true,
    progressBar: true,
    message: 'Loading...',
  },
  error: {
    retryButton: true,
    retryText: 'Retry',
    defaultMessage: 'An error occurred. Please try again.',
  },
  watermark: {
    enabled: false,
    text: '',
    position: 'bottom-right', // 'top-left', 'top-right', 'bottom-left', 'bottom-right'
    opacity: 0.5,
    fontSize: 14,
  },
};

// Picture-in-Picture configuration
export const PIP_CONFIG = {
  enabled: true,
  fallback: true, // Use custom PiP if browser doesn't support it
  size: {
    width: 320,
    height: 180,
  },
  position: {
    x: 20,
    y: 20,
  },
  controls: {
    playPause: true,
    seek: true,
    volume: true,
    close: true,
  },
};

// Fullscreen configuration
export const FULLSCREEN_CONFIG = {
  enabled: true,
  fallback: true, // Use custom fullscreen if browser doesn't support it
  controls: {
    showOnHover: true,
    hideDelay: 2000,
  },
  orientation: {
    lock: false, // Lock orientation on mobile devices
    landscape: true, // Force landscape on mobile
  },
};

// Keyboard shortcuts configuration
export const KEYBOARD_CONFIG = {
  enabled: true,
  shortcuts: {
    playPause: 'Space',
    seekForward: 'ArrowRight',
    seekBackward: 'ArrowLeft',
    seekForward10: 'l',
    seekBackward10: 'j',
    volumeUp: 'ArrowUp',
    volumeDown: 'ArrowDown',
    mute: 'm',
    fullscreen: 'f',
    pictureInPicture: 'p',
    subtitles: 'c',
    speedUp: '>',
    speedDown: '<',
    resetSpeed: '=',
    nextFrame: '.',
    previousFrame: ',',
  },
  seekAmount: 5, // seconds
  volumeStep: 0.1,
};

// Gesture configuration (for mobile)
export const GESTURE_CONFIG = {
  enabled: true,
  swipe: {
    horizontal: {
      enabled: true,
      threshold: 50, // pixels
      action: 'seek', // 'seek', 'volume', 'brightness'
    },
    vertical: {
      leftSide: {
        enabled: true,
        threshold: 50,
        action: 'brightness',
      },
      rightSide: {
        enabled: true,
        threshold: 50,
        action: 'volume',
      },
    },
  },
  pinch: {
    enabled: true,
    action: 'zoom', // 'zoom', 'aspect-ratio'
  },
  doubleTap: {
    enabled: true,
    action: 'playPause', // 'playPause', 'fullscreen'
  },
  longPress: {
    enabled: true,
    duration: 500, // milliseconds
    action: 'speedControl', // 'speedControl', 'qualityMenu'
  },
};

// Analytics configuration
export const ANALYTICS_CONFIG = {
  enabled: true,
  events: [
    'play',
    'pause',
    'seek',
    'ended',
    'error',
    'qualityChange',
    'subtitleToggle',
    'fullscreenToggle',
    'pictureInPictureToggle',
  ],
  tracking: {
    watchTime: true,
    engagement: true,
    qualityChanges: true,
    errors: true,
    buffering: true,
  },
  reporting: {
    interval: 30000, // Report every 30 seconds
    batchSize: 10, // Send events in batches of 10
  },
};

// Buffer configuration
export const BUFFER_CONFIG = {
  enabled: true,
  strategy: 'auto', // 'auto', 'conservative', 'aggressive'
  targetBufferLength: 30, // seconds
  bufferBehind: 10, // seconds
  maxBufferLength: 120, // seconds
  maxBufferSize: 60 * 1024 * 1024, // 60MB
  minBufferLength: 2, // seconds
  lowBufferLevel: 5, // seconds
  highBufferLevel: 15, // seconds
};

// Network configuration
export const NETWORK_CONFIG = {
  adaptiveBitrate: true,
  bandwidthEstimation: true,
  initialBitrate: 'auto',
  maxBitrate: Infinity,
  minBitrate: 0,
  retryAttempts: 3,
  retryDelay: 1000,
  timeout: 30000,
  chunkRetryAttempts: 3,
  chunkRetryDelay: 500,
};

// Accessibility configuration
export const ACCESSIBILITY_CONFIG = {
  enabled: true,
  screenReader: true,
  keyboardNavigation: true,
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  focusIndicators: true,
  ariaLabels: true,
  descriptions: true,
};

// Performance configuration
export const PERFORMANCE_CONFIG = {
  lazyLoad: true,
  progressive: true,
  hardwareAcceleration: true,
  webWorkers: true,
  memoryLimit: 512 * 1024 * 1024, // 512MB
  cpuLimit: 80, // 80% CPU usage
  frameRate: 60,
  resolutionScaling: true,
};

export default {
  PLAYER_DEFAULTS,
  VIDEO_CONFIG,
  AUDIO_CONFIG,
  SUBTITLE_CONFIG,
  UI_CONFIG,
  PIP_CONFIG,
  FULLSCREEN_CONFIG,
  KEYBOARD_CONFIG,
  GESTURE_CONFIG,
  ANALYTICS_CONFIG,
  BUFFER_CONFIG,
  NETWORK_CONFIG,
  ACCESSIBILITY_CONFIG,
  PERFORMANCE_CONFIG,
};
