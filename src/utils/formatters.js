// Number formatters
export const formatNumber = (num, decimals = 2) => {
  if (num == null || isNaN(num)) return 'N/A';
  
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ];
  
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  
  return item ? 
    (num / item.value).toFixed(decimals).replace(rx, '$1') + item.symbol : 
    '0';
};

export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (amount == null || isNaN(amount)) return 'N/A';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatPercentage = (value, decimals = 2) => {
  if (value == null || isNaN(value)) return 'N/A';
  
  return (value * 100).toFixed(decimals) + '%';
};

// Date formatters
export const formatRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
};

export const formatDuration = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// Text formatters
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export const camelCase = (str) => {
  if (!str) return '';
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
};

export const kebabCase = (str) => {
  if (!str) return '';
  return str.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
};

export const snakeCase = (str) => {
  if (!str) return '';
  return str.replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/\s+/g, '_')
    .toLowerCase();
};

export const titleCase = (str) => {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

// URL formatters
export const sanitizeUrl = (url) => {
  if (!url) return '';
  
  // Add protocol if missing
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  
  try {
    return new URL(url).href;
  } catch (e) {
    return '';
  }
};

export const getDomainFromUrl = (url) => {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch (e) {
    return '';
  }
};

// File formatters
export const formatFileName = (fileName, maxLength = 30) => {
  if (!fileName) return '';
  
  const parts = fileName.split('.');
  const extension = parts.pop();
  let name = parts.join('.');
  
  if (name.length > maxLength) {
    name = name.substring(0, maxLength - 3) + '...';
  }
  
  return `${name}.${extension}`;
};

export const getFileExtension = (fileName) => {
  if (!fileName) return '';
  return fileName.split('.').pop().toLowerCase();
};

export const getFileNameWithoutExtension = (fileName) => {
  if (!fileName) return '';
  return fileName.substring(0, fileName.lastIndexOf('.'));
};

// Color formatters
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const lightenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
};

export const darkenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  
  return '#' + (
    0x1000000 +
    (R > 255 ? 255 : (R < 0 ? 0 : R)) * 0x10000 +
    (G > 255 ? 255 : (G < 0 ? 0 : G)) * 0x100 +
    (B > 255 ? 255 : (B < 0 ? 0 : B))
  ).toString(16).slice(1);
};

// Data formatters
export const formatLargeNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const formatRating = (rating, max = 5) => {
  if (rating == null || isNaN(rating)) return 'N/A';
  
  return rating.toFixed(1) + '/' + max;
};

export default {
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatRelativeDate,
  formatDuration,
  capitalize,
  capitalizeWords,
  camelCase,
  kebabCase,
  snakeCase,
  titleCase,
  sanitizeUrl,
  getDomainFromUrl,
  formatFileName,
  getFileExtension,
  getFileNameWithoutExtension,
  hexToRgb,
  rgbToHex,
  lightenColor,
  darkenColor,
  formatLargeNumber,
  formatBytes,
  formatRating,
};