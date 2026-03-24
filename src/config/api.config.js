// API configuration
import { API_ENDPOINTS, CACHE_DURATIONS } from './constants';

// Base configuration
export const API_CONFIG = {
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Request interceptors configuration
export const REQUEST_INTERCEPTORS = {
  // Add authentication token
  auth: (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  
  // Add request timestamp
  timestamp: (config) => {
    config.metadata = { startTime: new Date() };
    return config;
  },
  
  // Add device info
  device: (config) => {
    config.headers['X-Device-ID'] = localStorage.getItem('deviceId') || 'unknown';
    config.headers['X-Platform'] = navigator.platform || 'unknown';
    return config;
  },
};

// Response interceptors configuration
export const RESPONSE_INTERCEPTORS = {
  // Handle authentication errors
  auth: (response) => {
    if (response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    return response;
  },
  
  // Log response time
  timing: (response) => {
    const endTime = new Date();
    const duration = endTime - response.config.metadata.startTime;
    console.log(`API call to ${response.config.url} took ${duration}ms`);
    return response;
  },
  
  // Handle rate limiting
  rateLimit: (error) => {
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      if (retryAfter) {
        console.log(`Rate limited. Retry after ${retryAfter} seconds`);
      }
    }
    return Promise.reject(error);
  },
};

// Cache configuration
export const CACHE_CONFIG = {
  // Default cache duration for different endpoint types
  durations: {
    user: CACHE_DURATIONS.MEDIUM,
    video: CACHE_DURATIONS.SHORT,
    playlist: CACHE_DURATIONS.MEDIUM,
    search: CACHE_DURATIONS.LONG,
    static: CACHE_DURATIONS.DAY,
  },
  
  // Cache size limits
  maxSize: 100, // Maximum number of cached responses
  maxAge: CACHE_DURATIONS.DAY, // Maximum age for cached items
  
  // Cache key generator
  generateKey: (config) => {
    const { method, url, params, data } = config;
    return `${method}:${url}:${JSON.stringify(params)}:${JSON.stringify(data)}`;
  },
};

// Retry configuration
export const RETRY_CONFIG = {
  // Number of retry attempts
  attempts: 3,
  
  // Retry delay (in milliseconds)
  delay: 1000,
  
  // Exponential backoff multiplier
  backoffMultiplier: 2,
  
  // Retry condition function
  shouldRetry: (error) => {
    const { code, response } = error;
    
    // Retry on network errors
    if (!response) return true;
    
    // Retry on 5xx server errors
    if (response.status >= 500) return true;
    
    // Retry on 429 rate limit errors
    if (response.status === 429) return true;
    
    // Don't retry on 4xx client errors (except 429)
    if (response.status >= 400 && response.status < 500) return false;
    
    return false;
  },
};

// WebSocket configuration
export const WEBSOCKET_CONFIG = {
  url: API_ENDPOINTS.WEBSOCKET_URL,
  
  // Connection options
  options: {
    transports: ['websocket', 'polling'],
    timeout: 20000,
    forceNew: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  },
  
  // Authentication
  auth: {
    token: () => localStorage.getItem('accessToken'),
  },
  
  // Event handlers
  events: {
    connect: () => console.log('WebSocket connected'),
    disconnect: () => console.log('WebSocket disconnected'),
    error: (error) => console.error('WebSocket error:', error),
  },
};

// File upload configuration
export const UPLOAD_CONFIG = {
  // Chunk size for large files (in bytes)
  chunkSize: 1024 * 1024, // 1MB
  
  // Maximum concurrent uploads
  maxConcurrent: 3,
  
  // Upload timeout (in milliseconds)
  timeout: 300000, // 5 minutes
  
  // Retry configuration for uploads
  retry: {
    attempts: 3,
    delay: 2000,
  },
  
  // Progress tracking
  onProgress: (progress) => {
    console.log(`Upload progress: ${progress}%`);
  },
  
  // Supported file types
  supportedTypes: {
    video: ['video/mp4', 'video/webm', 'video/ogg'],
    audio: ['audio/mp3', 'audio/wav', 'audio/ogg'],
    image: ['image/jpeg', 'image/png', 'image/gif'],
  },
};

// API endpoint groups
export const ENDPOINT_GROUPS = {
  AUTH: '/auth',
  USER: '/users',
  VIDEO: '/videos',
  AUDIO: '/audio',
  PLAYLIST: '/playlists',
  SEARCH: '/search',
  UPLOAD: '/upload',
  DOWNLOAD: '/download',
  ANALYTICS: '/analytics',
  ADMIN: '/admin',
  WEBSOCKET: '/ws',
};

// Request/response transformers
export const TRANSFORMERS = {
  // Request transformer
  request: (data, headers) => {
    // Convert camelCase to snake_case for API
    if (typeof data === 'object' && data !== null) {
      return JSON.stringify(toSnakeCase(data));
    }
    return data;
  },
  
  // Response transformer
  response: (data) => {
    // Convert snake_case to camelCase for frontend
    if (typeof data === 'object' && data !== null) {
      return toCamelCase(data);
    }
    return data;
  },
};

// Helper function to convert camelCase to snake_case
function toSnakeCase(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => toSnakeCase(item));
  }
  
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      result[snakeKey] = toSnakeCase(obj[key]);
    }
  }
  return result;
}

// Helper function to convert snake_case to camelCase
function toCamelCase(obj) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item));
  }
  
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = toCamelCase(obj[key]);
    }
  }
  return result;
}

export default {
  API_CONFIG,
  REQUEST_INTERCEPTORS,
  RESPONSE_INTERCEPTORS,
  CACHE_CONFIG,
  RETRY_CONFIG,
  WEBSOCKET_CONFIG,
  UPLOAD_CONFIG,
  ENDPOINT_GROUPS,
  TRANSFORMERS,
};
