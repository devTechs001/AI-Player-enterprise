// URL utilities
export const getUrlParameter = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

export const setUrlParameter = (name, value) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(name, value);
  const newUrl = window.location.pathname + '?' + urlParams.toString();
  window.history.replaceState({}, '', newUrl);
};

export const removeUrlParameter = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete(name);
  const newUrl = window.location.pathname + '?' + urlParams.toString();
  window.history.replaceState({}, '', newUrl);
};

export const getAllUrlParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const params = {};
  for (const [key, value] of urlParams.entries()) {
    params[key] = value;
  }
  return params;
};

export const buildUrl = (baseUrl, params = {}) => {
  const url = new URL(baseUrl);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
};

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const getDomain = (url) => {
  try {
    return new URL(url).hostname;
  } catch (_) {
    return null;
  }
};

export const getPathname = (url) => {
  try {
    return new URL(url).pathname;
  } catch (_) {
    return null;
  }
};

export const getProtocol = (url) => {
  try {
    return new URL(url).protocol;
  } catch (_) {
    return null;
  }
};

export const getPort = (url) => {
  try {
    return new URL(url).port;
  } catch (_) {
    return null;
  }
};

export const stripProtocol = (url) => {
  return url.replace(/^https?:\/\//, '');
};

export const addTrailingSlash = (url) => {
  return url.endsWith('/') ? url : url + '/';
};

export const removeTrailingSlash = (url) => {
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

export const normalizeUrl = (url) => {
  if (!url) return '';
  
  // Add protocol if missing
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
  
  // Remove trailing slash
  url = removeTrailingSlash(url);
  
  return url;
};

export const isExternalUrl = (url) => {
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.hostname !== window.location.hostname;
  } catch (_) {
    return false;
  }
};

export const isRelativeUrl = (url) => {
  return !/^(?:f|ht)tps?:\/\//i.test(url);
};

export const isAbsoluteUrl = (url) => {
  return /^(?:f|ht)tps?:\/\//i.test(url);
};

export const joinPaths = (...paths) => {
  return paths
    .join('/')
    .replace(/\/+/g, '/')
    .replace(':/', '://');
};

export const getFileNameFromUrl = (url) => {
  try {
    const pathname = new URL(url).pathname;
    return pathname.split('/').pop();
  } catch (_) {
    return null;
  }
};

export const getFileExtensionFromUrl = (url) => {
  const fileName = getFileNameFromUrl(url);
  if (!fileName) return null;
  
  const parts = fileName.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : null;
};

export const addUrlParameters = (url, params = {}) => {
  const urlObj = new URL(url);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      urlObj.searchParams.append(key, params[key]);
    }
  });
  return urlObj.toString();
};

export const removeUrlParameters = (url, paramNames = []) => {
  const urlObj = new URL(url);
  paramNames.forEach(name => {
    urlObj.searchParams.delete(name);
  });
  return urlObj.toString();
};

export const encodeQueryString = (params) => {
  return Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};

export const decodeQueryString = (queryString) => {
  if (!queryString) return {};
  
  const params = {};
  const pairs = queryString.replace(/^\?/, '').split('&');
  
  pairs.forEach(pair => {
    if (pair) {
      const [key, value] = pair.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  });
  
  return params;
};

export const isSameOrigin = (url1, url2) => {
  try {
    const origin1 = new URL(url1).origin;
    const origin2 = new URL(url2).origin;
    return origin1 === origin2;
  } catch (_) {
    return false;
  }
};

export const getBaseUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.host}`;
  } catch (_) {
    return null;
  }
};

export const appendQueryParams = (url, queryParams) => {
  const urlObj = new URL(url);
  Object.keys(queryParams).forEach(key => {
    if (queryParams[key] !== undefined && queryParams[key] !== null) {
      urlObj.searchParams.append(key, queryParams[key]);
    }
  });
  return urlObj.toString();
};

export const removeQueryParams = (url, keysToRemove) => {
  const urlObj = new URL(url);
  keysToRemove.forEach(key => {
    urlObj.searchParams.delete(key);
  });
  return urlObj.toString();
};

export const hasQueryParams = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.toString() !== '';
  } catch (_) {
    return false;
  }
};

export const getFragment = (url) => {
  try {
    return new URL(url).hash;
  } catch (_) {
    return null;
  }
};

export const setFragment = (url, fragment) => {
  try {
    const urlObj = new URL(url);
    urlObj.hash = fragment;
    return urlObj.toString();
  } catch (_) {
    return url;
  }
};

export default {
  getUrlParameter,
  setUrlParameter,
  removeUrlParameter,
  getAllUrlParameters,
  buildUrl,
  isValidUrl,
  getDomain,
  getPathname,
  getProtocol,
  getPort,
  stripProtocol,
  addTrailingSlash,
  removeTrailingSlash,
  normalizeUrl,
  isExternalUrl,
  isRelativeUrl,
  isAbsoluteUrl,
  joinPaths,
  getFileNameFromUrl,
  getFileExtensionFromUrl,
  addUrlParameters,
  removeUrlParameters,
  encodeQueryString,
  decodeQueryString,
  isSameOrigin,
  getBaseUrl,
  appendQueryParams,
  removeQueryParams,
  hasQueryParams,
  getFragment,
  setFragment,
};