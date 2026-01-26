import CryptoJS from 'crypto-js';

// Encryption utilities
export const generateKey = (length = 256) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    key += charset[randomIndex];
  }
  return key;
};

export const encrypt = (data, secretKey) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return ciphertext;
  } catch (error) {
    console.error('Encryption failed:', error);
    throw error;
  }
};

export const decrypt = (ciphertext, secretKey) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(plaintext);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw error;
  }
};

export const hash = (data) => {
  try {
    return CryptoJS.SHA256(JSON.stringify(data)).toString();
  } catch (error) {
    console.error('Hashing failed:', error);
    throw error;
  }
};

export const generateHMAC = (data, secretKey) => {
  try {
    return CryptoJS.HmacSHA256(JSON.stringify(data), secretKey).toString();
  } catch (error) {
    console.error('HMAC generation failed:', error);
    throw error;
  }
};

export const verifyHMAC = (data, hmac, secretKey) => {
  try {
    const expectedHMAC = generateHMAC(data, secretKey);
    return hmac === expectedHMAC;
  } catch (error) {
    console.error('HMAC verification failed:', error);
    return false;
  }
};

export const encryptWithPassword = (data, password) => {
  try {
    // Generate a random salt
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    
    // Derive key using PBKDF2
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 1000
    });
    
    // Encrypt the data
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    // Combine salt and encrypted data
    const combined = salt.toString() + encrypted.toString();
    
    return combined;
  } catch (error) {
    console.error('Password-based encryption failed:', error);
    throw error;
  }
};

export const decryptWithPassword = (combined, password) => {
  try {
    // Extract salt (first 256 bits/32 chars)
    const salt = CryptoJS.enc.Hex.parse(combined.substr(0, 32));
    
    // Extract encrypted data
    const encrypted = combined.substring(32);
    
    // Derive the same key using the extracted salt
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 1000
    });
    
    // Decrypt the data
    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Password-based decryption failed:', error);
    throw error;
  }
};

export const base64Encode = (str) => {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch (error) {
    console.error('Base64 encoding failed:', error);
    throw error;
  }
};

export const base64Decode = (str) => {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch (error) {
    console.error('Base64 decoding failed:', error);
    throw error;
  }
};

export const obfuscateEmail = (email) => {
  if (!email) return '';
  
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) {
    return '*'.repeat(localPart.length) + '@' + domain;
  }
  
  const visibleChars = Math.max(1, Math.floor(localPart.length / 3));
  const hiddenPart = '*'.repeat(localPart.length - visibleChars * 2);
  
  return localPart.substring(0, visibleChars) + hiddenPart + 
         localPart.substring(localPart.length - visibleChars) + '@' + domain;
};

export const maskString = (str, visibleStart = 2, visibleEnd = 2, maskChar = '*') => {
  if (!str || str.length <= visibleStart + visibleEnd) {
    return maskChar.repeat(str.length);
  }
  
  const start = str.substring(0, visibleStart);
  const middle = maskChar.repeat(str.length - visibleStart - visibleEnd);
  const end = str.substring(str.length - visibleEnd);
  
  return start + middle + end;
};

export const generateSecureRandom = (length = 32) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const validateJWT = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }
    
    // Decode payload (second part)
    const payload = JSON.parse(base64Decode(parts[1]));
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return false;
    }
    
    return payload;
  } catch (error) {
    console.error('JWT validation failed:', error);
    return false;
  }
};

export default {
  generateKey,
  encrypt,
  decrypt,
  hash,
  generateHMAC,
  verifyHMAC,
  encryptWithPassword,
  decryptWithPassword,
  base64Encode,
  base64Decode,
  obfuscateEmail,
  maskString,
  generateSecureRandom,
  sanitizeInput,
  validateJWT,
};