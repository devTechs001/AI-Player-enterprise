// Application constants
export const APP_NAME = 'AI Video Player Enterprise';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Advanced AI-powered video streaming and collaboration platform';

// API endpoints
export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  WEBSOCKET_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:3001',
  CDN_URL: import.meta.env.VITE_CDN_URL || 'http://localhost:3001/cdn',
};

// File size limits (in bytes)
export const FILE_LIMITS = {
  VIDEO_MAX_SIZE: 5 * 1024 * 1024 * 1024, // 5GB
  AUDIO_MAX_SIZE: 500 * 1024 * 1024,      // 500MB
  IMAGE_MAX_SIZE: 10 * 1024 * 1024,       // 10MB
  SUBTITLE_MAX_SIZE: 5 * 1024 * 1024,      // 5MB
};

// Supported file formats
export const SUPPORTED_FORMATS = {
  VIDEO: ['mp4', 'webm', 'ogg', 'avi', 'mov', 'mkv', 'flv', 'wmv'],
  AUDIO: ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'],
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
  SUBTITLE: ['srt', 'vtt', 'ass', 'ssa'],
};

// Video quality presets
export const VIDEO_QUALITIES = {
  AUTO: 'auto',
  '4K': { width: 3840, height: 2160, bitrate: 15000 },
  '1080p': { width: 1920, height: 1080, bitrate: 5000 },
  '720p': { width: 1280, height: 720, bitrate: 2500 },
  '480p': { width: 854, height: 480, bitrate: 1000 },
  '360p': { width: 640, height: 360, bitrate: 500 },
  '240p': { width: 426, height: 240, bitrate: 250 },
};

// Audio quality presets
export const AUDIO_QUALITIES = {
  HIGH: { bitrate: 320, sampleRate: 48000 },
  MEDIUM: { bitrate: 192, sampleRate: 44100 },
  LOW: { bitrate: 128, sampleRate: 44100 },
};

// Playback speeds
export const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  NEON: 'neon',
};

// User roles
export const USER_ROLES = {
  GUEST: 'guest',
  USER: 'user',
  PREMIUM: 'premium',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
};

// Subscription tiers
export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  BASIC: 'basic',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
};

// Content types
export const CONTENT_TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  LIVE: 'live',
  PLAYLIST: 'playlist',
  ALBUM: 'album',
};

// Notification types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
};

// Cache durations (in seconds)
export const CACHE_DURATIONS = {
  SHORT: 60,      // 1 minute
  MEDIUM: 300,    // 5 minutes
  LONG: 3600,      // 1 hour
  DAY: 86400,      // 24 hours
};

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
};

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  PLAY_PAUSE: 'Space',
  SEEK_FORWARD: 'ArrowRight',
  SEEK_BACKWARD: 'ArrowLeft',
  VOLUME_UP: 'ArrowUp',
  VOLUME_DOWN: 'ArrowDown',
  FULLSCREEN: 'f',
  MUTE: 'm',
  SUBTITLES: 'c',
  PICTURE_IN_PICTURE: 'p',
};

// Default settings
export const DEFAULT_SETTINGS = {
  AUTOPLAY: false,
  QUALITY: 'auto',
  SPEED: 1,
  VOLUME: 1,
  SUBTITLES: true,
  FULLSCREEN: false,
  PICTURE_IN_PICTURE: false,
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed limit.',
  UNSUPPORTED_FORMAT: 'This file format is not supported.',
  AUTHENTICATION_REQUIRED: 'You must be logged in to perform this action.',
  PERMISSION_DENIED: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  UPLOAD_COMPLETE: 'File uploaded successfully.',
  SAVED: 'Changes saved successfully.',
  DELETED: 'Item deleted successfully.',
  COPIED: 'Copied to clipboard.',
  UPDATED: 'Updated successfully.',
};

export default {
  APP_NAME,
  APP_VERSION,
  APP_DESCRIPTION,
  API_ENDPOINTS,
  FILE_LIMITS,
  SUPPORTED_FORMATS,
  VIDEO_QUALITIES,
  AUDIO_QUALITIES,
  PLAYBACK_SPEEDS,
  THEMES,
  USER_ROLES,
  SUBSCRIPTION_TIERS,
  CONTENT_TYPES,
  NOTIFICATION_TYPES,
  PAGINATION,
  CACHE_DURATIONS,
  ANIMATION_DURATIONS,
  BREAKPOINTS,
  KEYBOARD_SHORTCUTS,
  DEFAULT_SETTINGS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
