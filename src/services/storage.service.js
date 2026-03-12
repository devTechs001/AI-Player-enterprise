class StorageService {
  // Local Storage Methods
  set(key, value) {
    try {
      if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Error setting ${key} to localStorage:`, error);
    }
  }

  get(key) {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return null;
      
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  }

  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // Session Storage Methods
  setSession(key, value) {
    try {
      if (typeof value === 'object') {
        sessionStorage.setItem(key, JSON.stringify(value));
      } else {
        sessionStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Error setting ${key} to sessionStorage:`, error);
    }
  }

  getSession(key) {
    try {
      const value = sessionStorage.getItem(key);
      if (value === null) return null;
      
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      console.error(`Error getting ${key} from sessionStorage:`, error);
      return null;
    }
  }

  removeSession(key) {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from sessionStorage:`, error);
    }
  }

  // Cookie Methods
  setCookie(name, value, days = 7) {
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    } catch (error) {
      console.error(`Error setting cookie ${name}:`, error);
    }
  }

  getCookie(name) {
    try {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    } catch (error) {
      console.error(`Error getting cookie ${name}:`, error);
      return null;
    }
  }

  removeCookie(name) {
    try {
      document.cookie = `${name}=; Max-Age=-99999999;`;
    } catch (error) {
      console.error(`Error removing cookie ${name}:`, error);
    }
  }

  // IndexedDB Methods (for larger data)
  async setIndexedDB(key, value) {
    try {
      const db = await this.openDB();
      const transaction = db.transaction(['storage'], 'readwrite');
      const store = transaction.objectStore('storage');
      
      await store.put({ key, value, timestamp: Date.now() });
    } catch (error) {
      console.error(`Error setting ${key} to IndexedDB:`, error);
    }
  }

  async getIndexedDB(key) {
    try {
      const db = await this.openDB();
      const transaction = db.transaction(['storage'], 'readonly');
      const store = transaction.objectStore('storage');
      
      const result = await store.get(key);
      return result ? result.value : null;
    } catch (error) {
      console.error(`Error getting ${key} from IndexedDB:`, error);
      return null;
    }
  }

  async removeIndexedDB(key) {
    try {
      const db = await this.openDB();
      const transaction = db.transaction(['storage'], 'readwrite');
      const store = transaction.objectStore('storage');
      
      await store.delete(key);
    } catch (error) {
      console.error(`Error removing ${key} from IndexedDB:`, error);
    }
  }

  async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('AIPlayerDB', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('storage')) {
          db.createObjectStore('storage', { keyPath: 'key' });
        }
      };
    });
  }

  // Utility Methods
  has(key) {
    return this.get(key) !== null;
  }

  hasSession(key) {
    return this.getSession(key) !== null;
  }

  // Clear all storage types
  clearAll() {
    this.clear();
    this.clearSession();
    this.clearIndexedDB();
  }

  clearSession() {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  }

  async clearIndexedDB() {
    try {
      const db = await this.openDB();
      const transaction = db.transaction(['storage'], 'readwrite');
      const store = transaction.objectStore('storage');
      
      await store.clear();
    } catch (error) {
      console.error('Error clearing IndexedDB:', error);
    }
  }

  // Get storage usage
  getUsage() {
    let total = 0;
    for (let key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return {
      used: total,
      limit: 5 * 1024 * 1024, // 5MB estimate
      percentage: (total / (5 * 1024 * 1024)) * 100,
    };
  }
}

export const storageService = new StorageService();
export default storageService;