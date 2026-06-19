class DownloadIntegrations {
  constructor() {
    this.integrations = new Map();
    this._init();
  }

  _init() {
    this.register('youtube-dl', {
      name: 'YouTube-DL',
      description: 'Download from 1000+ sites via youtube-dl',
      docs: 'https://github.com/ytdl-org/youtube-dl',
      platforms: ['youtube', 'vimeo', 'dailymotion', 'twitch', 'facebook', 'instagram', 'tiktok', 'twitter'],
    });

    this.register('aria2', {
      name: 'Aria2',
      description: 'Multi-threaded download accelerator',
      docs: 'https://aria2.github.io/',
      features: ['multi-thread', 'resume', 'batch'],
    });

    this.register('ffmpeg', {
      name: 'FFmpeg',
      description: 'Convert and process downloaded media',
      docs: 'https://ffmpeg.org/',
      features: ['convert', 'trim', 'merge', 'extract-audio'],
    });

    this.register('youtube-api', {
      name: 'YouTube Data API',
      description: 'Official YouTube API for metadata',
      platforms: ['youtube'],
      requiresKey: true,
    });

    this.register('vimeo-api', {
      name: 'Vimeo API',
      description: 'Official Vimeo API integration',
      platforms: ['vimeo'],
      requiresKey: true,
    });

    this.register('instagram-api', {
      name: 'Instagram Graph API',
      description: 'Official Instagram API',
      platforms: ['instagram'],
      requiresKey: true,
    });
  }

  register(id, config) {
    this.integrations.set(id, { id, ...config, enabled: false });
  }

  get(id) {
    return this.integrations.get(id);
  }

  getAll() {
    return Array.from(this.integrations.values());
  }

  getForPlatform(platform) {
    return Array.from(this.integrations.values()).filter(
      (i) => i.platforms?.includes(platform)
    );
  }

  enable(id) {
    const integration = this.integrations.get(id);
    if (integration) {
      integration.enabled = true;
      localStorage.setItem(`integration_${id}`, 'true');
      return true;
    }
    return false;
  }

  disable(id) {
    const integration = this.integrations.get(id);
    if (integration) {
      integration.enabled = false;
      localStorage.setItem(`integration_${id}`, 'false');
      return true;
    }
    return false;
  }

  isEnabled(id) {
    return localStorage.getItem(`integration_${id}`) === 'true';
  }

  getEnabled() {
    return this.getAll().filter((i) => this.isEnabled(i.id));
  }
}

export const downloadIntegrations = new DownloadIntegrations();
export default DownloadIntegrations;
