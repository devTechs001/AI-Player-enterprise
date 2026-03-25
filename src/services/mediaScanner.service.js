class LocalMediaScanner {
  constructor() {
    this.supportedFormats = {
      video: ['mp4', 'webm', 'mkv', 'avi', 'mov', 'flv', 'wmv', '3gp'],
      audio: ['mp3', 'aac', 'wav', 'flac', 'ogg', 'm4a', 'wma'],
      image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'],
    };
  }

  /**
   * Scan local files using File System Access API
   */
  async scanDirectory() {
    try {
      // Request directory handle
      const dirHandle = await window.showDirectoryPicker();
      const files = [];
      
      // Iterate through directory entries
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file') {
          const file = await entry.getFile();
          const fileInfo = await this.analyzeFile(file, entry);
          
          if (fileInfo) {
            files.push(fileInfo);
          }
        }
      }
      
      // Sort by date modified (newest first)
      files.sort((a, b) => b.lastModified - a.lastModified);
      
      return {
        success: true,
        files,
        directory: dirHandle.name,
        totalSize: files.reduce((sum, f) => sum + f.size, 0),
      };
    } catch (error) {
      console.error('Failed to scan directory:', error);
      return {
        success: false,
        error: error.message,
        files: [],
      };
    }
  }

  /**
   * Analyze individual file
   */
  async analyzeFile(file, handle) {
    const extension = file.name.split('.').pop().toLowerCase();
    const type = this.getFileType(extension);
    
    if (!type) return null;
    
    const fileInfo = {
      id: `${handle.kind}_${file.name}_${file.lastModified}`,
      name: file.name,
      title: this.extractTitle(file.name),
      type,
      extension,
      size: file.size,
      lastModified: file.lastModified,
      mimeType: file.type,
      handle: handle,
      file: file,
      duration: null,
      thumbnail: null,
      metadata: {},
    };
    
    // Extract metadata for media files
    if (type === 'video' || type === 'audio') {
      try {
        const metadata = await this.extractMediaMetadata(file);
        fileInfo.duration = metadata.duration;
        fileInfo.thumbnail = metadata.thumbnail;
        fileInfo.metadata = metadata;
      } catch (err) {
        console.warn('Failed to extract metadata:', err);
      }
    }
    
    return fileInfo;
  }

  /**
   * Get file type from extension
   */
  getFileType(extension) {
    if (this.supportedFormats.video.includes(extension)) return 'video';
    if (this.supportedFormats.audio.includes(extension)) return 'audio';
    if (this.supportedFormats.image.includes(extension)) return 'image';
    return null;
  }

  /**
   * Extract title from filename
   */
  extractTitle(filename) {
    // Remove extension
    let title = filename.replace(/\.[^/.]+$/, '');
    
    // Clean common patterns
    title = title
      .replace(/\[.*?\]/g, '') // Remove [brackets]
      .replace(/\(.*?\)/g, '') // Remove (parentheses)
      .replace(/\.\d{4}\./g, ' ') // Remove .year.
      .replace(/\.(1080p|720p|480p|4k|2k)/gi, '') // Remove quality tags
      .replace(/\.(x264|x265|hevc|aac|mp3)/gi, '') // Remove codec tags
      .replace(/_/g, ' ') // Replace underscores
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();
    
    return title || filename;
  }

  /**
   * Extract media metadata using HTML5 media element
   */
  async extractMediaMetadata(file) {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const media = document.createElement(file.type.startsWith('video') ? 'video' : 'audio');
      
      media.preload = 'metadata';
      media.src = url;
      
      const cleanup = () => {
        URL.revokeObjectURL(url);
        media.src = '';
      };
      
      media.onloadedmetadata = () => {
        const metadata = {
          duration: media.duration || 0,
          width: media.videoWidth || null,
          height: media.videoHeight || null,
          thumbnail: null,
        };
        
        // Generate thumbnail for videos
        if (file.type.startsWith('video')) {
          metadata.thumbnail = this.generateThumbnail(media);
        }
        
        cleanup();
        resolve(metadata);
      };
      
      media.onerror = () => {
        cleanup();
        resolve({ duration: 0, width: null, height: null, thumbnail: null });
      };
      
      // Timeout after 5 seconds
      setTimeout(() => {
        cleanup();
        resolve({ duration: 0, width: null, height: null, thumbnail: null });
      }, 5000);
    });
  }

  /**
   * Generate thumbnail from video
   */
  generateThumbnail(videoElement) {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size to video dimensions
      canvas.width = 320;
      canvas.height = 180;
      
      // Draw current frame
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      return canvas.toDataURL('image/jpeg', 0.7);
    } catch (err) {
      console.error('Failed to generate thumbnail:', err);
      return null;
    }
  }

  /**
   * Import single file
   */
  async importFile() {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'Media Files',
            accept: {
              'video/*': this.supportedFormats.video.map(ext => `.${ext}`),
              'audio/*': this.supportedFormats.audio.map(ext => `.${ext}`),
            },
          },
        ],
        multiple: false,
      });
      
      const file = await fileHandle.getFile();
      return await this.analyzeFile(file, fileHandle);
    } catch (error) {
      console.error('Failed to import file:', error);
      return null;
    }
  }

  /**
   * Import multiple files
   */
  async importFiles() {
    try {
      const fileHandles = await window.showOpenFilePicker({
        types: [
          {
            description: 'Media Files',
            accept: {
              'video/*': this.supportedFormats.video.map(ext => `.${ext}`),
              'audio/*': this.supportedFormats.audio.map(ext => `.${ext}`),
            },
          },
        ],
        multiple: true,
      });
      
      const files = [];
      for (const handle of fileHandles) {
        const file = await handle.getFile();
        const fileInfo = await this.analyzeFile(file, handle);
        if (fileInfo) {
          files.push(fileInfo);
        }
      }
      
      return files;
    } catch (error) {
      console.error('Failed to import files:', error);
      return [];
    }
  }

  /**
   * Get file statistics
   */
  getStatistics(files) {
    const stats = {
      total: files.length,
      videos: 0,
      audios: 0,
      images: 0,
      totalSize: 0,
      totalDuration: 0,
      byFormat: {},
      byDate: {},
    };
    
    files.forEach(file => {
      stats.totalSize += file.size;
      
      if (file.type === 'video') {
        stats.videos++;
        stats.totalDuration += file.duration || 0;
      } else if (file.type === 'audio') {
        stats.audios++;
        stats.totalDuration += file.duration || 0;
      } else if (file.type === 'image') {
        stats.images++;
      }
      
      // Count by format
      stats.byFormat[file.extension] = (stats.byFormat[file.extension] || 0) + 1;
      
      // Count by date
      const date = new Date(file.lastModified).toLocaleDateString();
      stats.byDate[date] = (stats.byDate[date] || 0) + 1;
    });
    
    return stats;
  }

  /**
   * Format file size
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Format duration
   */
  formatDuration(seconds) {
    if (!seconds || seconds <= 0) return '0:00';
    
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}

export const localMediaScanner = new LocalMediaScanner();
export default localMediaScanner;
