export const mediaService = {
  // Get video duration
  async getVideoDuration(videoUrl) {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        resolve(video.duration);
        document.body.removeChild(video);
      };

      video.onerror = (e) => {
        reject(e);
        document.body.removeChild(video);
      };

      video.src = videoUrl;
      document.body.appendChild(video); // Required for Firefox
    });
  },

  // Get video dimensions
  async getVideoDimensions(videoUrl) {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        resolve({
          width: video.videoWidth,
          height: video.videoHeight,
        });
        document.body.removeChild(video);
      };

      video.onerror = (e) => {
        reject(e);
        document.body.removeChild(video);
      };

      video.src = videoUrl;
      document.body.appendChild(video);
    });
  },

  // Extract video thumbnail
  async extractThumbnail(videoUrl, timeInSeconds = 1) {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = videoUrl;

      video.onloadedmetadata = () => {
        video.currentTime = timeInSeconds;
      };

      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          resolve(blob);
          document.body.removeChild(video);
          document.body.removeChild(canvas);
        }, 'image/jpeg', 0.8);

        document.body.appendChild(canvas);
      };

      video.onerror = (e) => {
        reject(e);
        document.body.removeChild(video);
      };

      document.body.appendChild(video);
    });
  },

  // Convert seconds to time format (HH:MM:SS)
  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return hours > 0
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `${minutes}:${secs.toString().padStart(2, '0')}`;
  },

  // Convert file size to human readable format
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Validate video file
  validateVideoFile(file) {
    const validTypes = [
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/mkv',
      'video/avi',
      'video/mov',
      'video/wmv',
      'video/flv',
      'video/3gp',
      'video/mpeg',
    ];

    const maxSize = 1024 * 1024 * 500; // 500MB

    return {
      isValid: validTypes.includes(file.type) && file.size <= maxSize,
      errors: [
        ...(validTypes.includes(file.type) ? [] : ['Invalid file type']),
        ...(file.size <= maxSize ? [] : ['File too large (max 500MB)']),
      ],
    };
  },

  // Validate audio file
  validateAudioFile(file) {
    const validTypes = [
      'audio/mp3',
      'audio/wav',
      'audio/mpeg',
      'audio/ogg',
      'audio/aac',
      'audio/flac',
      'audio/wma',
      'audio/m4a',
    ];

    const maxSize = 1024 * 1024 * 100; // 100MB

    return {
      isValid: validTypes.includes(file.type) && file.size <= maxSize,
      errors: [
        ...(validTypes.includes(file.type) ? [] : ['Invalid file type']),
        ...(file.size <= maxSize ? [] : ['File too large (max 100MB)']),
      ],
    };
  },

  // Get media type from URL
  getMediaType(url) {
    const extension = url.split('.').pop().toLowerCase();
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mkv', 'avi', 'mov', 'wmv', 'flv', '3gp', 'mpeg'];
    const audioExtensions = ['mp3', 'wav', 'm4a', 'aac', 'flac', 'wma', 'ogg'];

    if (videoExtensions.includes(extension)) {
      return 'video';
    } else if (audioExtensions.includes(extension)) {
      return 'audio';
    }

    // If no extension, try to guess from URL
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'video';
    } else if (url.includes('soundcloud.com')) {
      return 'audio';
    }

    return 'unknown';
  },

  // Create object URL for media
  createObjectURL(file) {
    return URL.createObjectURL(file);
  },

  // Revoke object URL
  revokeObjectURL(url) {
    URL.revokeObjectURL(url);
  },

  // Get video metadata
  async getVideoMetadata(videoUrl) {
    try {
      const duration = await this.getVideoDuration(videoUrl);
      const dimensions = await this.getVideoDimensions(videoUrl);

      return {
        duration,
        durationFormatted: this.formatTime(duration),
        dimensions,
        aspectRatio: dimensions.width / dimensions.height,
        resolution: `${dimensions.width}x${dimensions.height}`,
      };
    } catch (error) {
      console.error('Error getting video metadata:', error);
      throw error;
    }
  },

  // Calculate aspect ratio
  calculateAspectRatio(width, height) {
    const gcd = (a, b) => (b ? gcd(b, a % b) : a);
    const divisor = gcd(width, height);
    return {
      width: width / divisor,
      height: height / divisor,
      ratio: width / height,
    };
  },

  // Resize video for preview
  async resizeVideoForPreview(videoFile, maxWidth = 1920, maxHeight = 1080) {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      video.onloadedmetadata = () => {
        // Calculate new dimensions maintaining aspect ratio
        let { width, height } = video;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(video, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(blob);
          document.body.removeChild(video);
          document.body.removeChild(canvas);
        }, 'video/mp4', 0.8);

        document.body.appendChild(canvas);
      };

      video.onerror = (e) => {
        reject(e);
        document.body.removeChild(video);
      };

      video.src = URL.createObjectURL(videoFile);
      document.body.appendChild(video);
    });
  },
};