class PWAService {
  constructor() {
    this._deferredPrompt = null;
    this._listeners = new Set();
    this._installed = false;
    this._standalone = false;
  }

  get isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone ||
      this._standalone;
  }

  get isInstallable() {
    return !!this._deferredPrompt && !this._installed;
  }

  get isInstalled() {
    return this._installed;
  }

  init() {
    if (typeof window === 'undefined') return;

    this._standalone = this.isStandalone;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this._deferredPrompt = e;
      this._notify();
    });

    window.addEventListener('appinstalled', () => {
      this._installed = true;
      this._deferredPrompt = null;
      this._notify();
    });

    // Detect standalone mode changes
    window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
      this._standalone = e.matches;
      this._notify();
    });
  }

  async install() {
    if (!this._deferredPrompt) return;
    this._deferredPrompt.prompt();
    const result = await this._deferredPrompt.userChoice;
    this._deferredPrompt = null;
    this._notify();
    return result.outcome === 'accepted';
  }

  subscribe(cb) {
    this._listeners.add(cb);
    return () => this._listeners.delete(cb);
  }

  _notify() {
    this._listeners.forEach((cb) => cb(this));
  }
}

export const pwaService = new PWAService();
export default pwaService;
