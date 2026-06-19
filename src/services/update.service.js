const CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour
const STORAGE_KEY = 'ultimate_player_version';
const RELEASES_API = 'https://api.github.com/repos/anomalyco/ultimate-player/releases/latest';

class UpdateService {
  constructor() {
    this._currentVersion = null;
    this._latestVersion = null;
    this._downloadUrl = null;
    this._releaseNotes = '';
    this._checking = false;
    this._listeners = new Set();
    this._timer = null;
  }

  get currentVersion() {
    if (!this._currentVersion) {
      this._currentVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';
    }
    return this._currentVersion;
  }

  get latestVersion() {
    return this._latestVersion;
  }

  get hasUpdate() {
    if (!this._latestVersion) return false;
    return this._compareVersions(this._latestVersion, this.currentVersion) > 0;
  }

  get downloadUrl() {
    return this._downloadUrl;
  }

  get releaseNotes() {
    return this._releaseNotes;
  }

  get checking() {
    return this._checking;
  }

  subscribe(cb) {
    this._listeners.add(cb);
    return () => this._listeners.delete(cb);
  }

  _notify() {
    this._listeners.forEach((cb) => cb(this));
  }

  startAutoCheck() {
    this.checkForUpdates();
    this._timer = setInterval(() => this.checkForUpdates(), CHECK_INTERVAL);
  }

  stopAutoCheck() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  async checkForUpdates() {
    if (this._checking) return;
    this._checking = true;
    this._notify();

    try {
      const res = await fetch(RELEASES_API, {
        signal: AbortSignal.timeout(15000),
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      const latest = data.tag_name?.replace(/^v/, '') || '';

      this._latestVersion = latest;
      this._downloadUrl = data.html_url || '';
      this._releaseNotes = data.body || '';

      // Cache the version check
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          version: latest,
          checkedAt: Date.now(),
          downloadUrl: this._downloadUrl,
        }));
      } catch { /* */ }
    } catch (error) {
      console.warn('Update check failed:', error.message);

      // Fall back to cached check
      try {
        const cached = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (cached) {
          this._latestVersion = cached.version;
          this._downloadUrl = cached.downloadUrl;
        }
      } catch { /* */ }
    }

    this._checking = false;
    this._notify();
  }

  async applyUpdate() {
    if (this._downloadUrl) {
      window.open(this._downloadUrl, '_blank');
    }

    // Trigger service worker update check
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      reg.update();
    }
  }

  _compareVersions(a, b) {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const na = pa[i] || 0;
      const nb = pb[i] || 0;
      if (na > nb) return 1;
      if (na < nb) return -1;
    }
    return 0;
  }
}

export const updateService = new UpdateService();
export default updateService;
