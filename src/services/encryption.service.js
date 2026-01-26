import CryptoJS from 'crypto-js';

export const encryptionService = {
  // Encrypt data with AES
  encrypt(data, secretKey) {
    try {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption failed:', error);
      throw error;
    }
  },

  // Decrypt data with AES
  decrypt(encryptedData, secretKey) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Decryption failed:', error);
      throw error;
    }
  },

  // Hash data with SHA-256
  hash(data) {
    try {
      return CryptoJS.SHA256(JSON.stringify(data)).toString();
    } catch (error) {
      console.error('Hashing failed:', error);
      throw error;
    }
  },

  // Generate a random key
  generateKey(length = 256) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      key += charset[randomIndex];
    }
    return key;
  },

  // Encrypt file (browser-based)
  async encryptFile(file, secretKey) {
    try {
      // Read file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Convert ArrayBuffer to WordArray
      const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
      
      // Encrypt the WordArray
      const encrypted = CryptoJS.AES.encrypt(wordArray, secretKey).toString();
      
      // Convert encrypted string back to Blob
      const blob = new Blob([encrypted], { type: 'application/octet-stream' });
      
      return blob;
    } catch (error) {
      console.error('File encryption failed:', error);
      throw error;
    }
  },

  // Decrypt file (browser-based)
  async decryptFile(encryptedFile, secretKey) {
    try {
      // Read encrypted file as text
      const encryptedText = await encryptedFile.text();
      
      // Decrypt the text
      const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey);
      
      // Convert to ArrayBuffer
      const uint8Array = decrypted.toArrayBuffer();
      
      // Create a new Blob with the decrypted data
      const blob = new Blob([uint8Array], { type: encryptedFile.type });
      
      return blob;
    } catch (error) {
      console.error('File decryption failed:', error);
      throw error;
    }
  },

  // Generate HMAC for data integrity
  generateHMAC(data, secretKey) {
    try {
      const hmac = CryptoJS.HmacSHA256(JSON.stringify(data), secretKey);
      return hmac.toString();
    } catch (error) {
      console.error('HMAC generation failed:', error);
      throw error;
    }
  },

  // Verify HMAC
  verifyHMAC(data, hmac, secretKey) {
    try {
      const expectedHMAC = this.generateHMAC(data, secretKey);
      return hmac === expectedHMAC;
    } catch (error) {
      console.error('HMAC verification failed:', error);
      return false;
    }
  },

  // Encrypt with password-based key derivation
  encryptWithPassword(data, password) {
    try {
      // Derive key from password using PBKDF2
      const salt = CryptoJS.lib.WordArray.random(128 / 8);
      const key = CryptoJS.PBKDF2(password, salt, {
        keySize: 256 / 32,
        iterations: 1000,
      });
      
      // Encrypt the data
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
        iv: CryptoJS.lib.WordArray.random(128 / 8),
      }).toString();
      
      // Combine salt + IV + encrypted data
      const combined = salt.toString() + ':' + encrypted;
      
      return combined;
    } catch (error) {
      console.error('Password-based encryption failed:', error);
      throw error;
    }
  },

  // Decrypt with password-based key derivation
  decryptWithPassword(combined, password) {
    try {
      // Split the combined string
      const parts = combined.split(':');
      const salt = CryptoJS.enc.Hex.parse(parts[0]);
      const encrypted = parts.slice(1).join(':');
      
      // Derive the same key
      const key = CryptoJS.PBKDF2(password, salt, {
        keySize: 256 / 32,
        iterations: 1000,
      });
      
      // Decrypt the data
      const decrypted = CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);
      
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Password-based decryption failed:', error);
      throw error;
    }
  },

  // Base64 encode
  base64Encode(str) {
    try {
      return btoa(unescape(encodeURIComponent(str)));
    } catch (error) {
      console.error('Base64 encoding failed:', error);
      throw error;
    }
  },

  // Base64 decode
  base64Decode(str) {
    try {
      return decodeURIComponent(escape(atob(str)));
    } catch (error) {
      console.error('Base64 decoding failed:', error);
      throw error;
    }
  },
};