// File utilities
export const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};

export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};

export const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsArrayBuffer(file);
  });
};

export const downloadFile = (data, filename, mimeType = 'application/octet-stream') => {
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadUrl = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const isImageFile = (file) => {
  return file && file.type.startsWith('image/');
};

export const isVideoFile = (file) => {
  return file && file.type.startsWith('video/');
};

export const isAudioFile = (file) => {
  return file && file.type.startsWith('audio/');
};

export const isTextFile = (file) => {
  return file && file.type.startsWith('text/');
};

export const isPdfFile = (file) => {
  return file && file.type === 'application/pdf';
};

export const isZipFile = (file) => {
  return file && file.type === 'application/zip';
};

export const getFileSize = (file) => {
  return file ? file.size : 0;
};

export const getFileSizeFormatted = (file) => {
  const size = getFileSize(file);
  return formatBytes(size);
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getFileExtension = (filename) => {
  if (!filename) return '';
  return filename.split('.').pop().toLowerCase();
};

export const getFileName = (filepath) => {
  if (!filepath) return '';
  return filepath.split('/').pop().split('\\').pop();
};

export const getFileNameWithoutExtension = (filename) => {
  if (!filename) return '';
  const parts = filename.split('.');
  parts.pop();
  return parts.join('.');
};

export const isValidImageFile = (file) => {
  const validTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'image/bmp',
    'image/tiff'
  ];
  return file && validTypes.includes(file.type);
};

export const isValidVideoFile = (file) => {
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
    'video/mpeg'
  ];
  return file && validTypes.includes(file.type);
};

export const isValidAudioFile = (file) => {
  const validTypes = [
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'audio/m4a',
    'audio/aac',
    'audio/flac',
    'audio/wma'
  ];
  return file && validTypes.includes(file.type);
};

export const createFileFromUrl = async (url, filename) => {
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], filename, { type: data.type });
};

export const createFileFromBase64 = (base64, filename, mimeType) => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });
  return new File([blob], filename, { type: mimeType });
};

export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          aspectRatio: img.width / img.height
        });
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Calculate new dimensions maintaining aspect ratio
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: file.type }));
        }, file.type, 0.8); // 80% quality
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const cropImage = (file, x, y, width, height) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas and crop image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: file.type }));
        }, file.type, 0.8); // 80% quality
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const validateFileSize = (file, maxSizeInMB) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

export const validateFileType = (file, allowedTypes) => {
  return allowedTypes.some(type => {
    if (typeof type === 'string') {
      return file.type === type || file.type.startsWith(type);
    }
    return false;
  });
};

export const getMimeTypeFromExtension = (extension) => {
  const extensionMap = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'bmp': 'image/bmp',
    'tiff': 'image/tiff',
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'mkv': 'video/x-matroska',
    'avi': 'video/x-msvideo',
    'mov': 'video/quicktime',
    'wmv': 'video/x-ms-wmv',
    'flv': 'video/x-flv',
    '3gp': 'video/3gpp',
    'mpeg': 'video/mpeg',
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'm4a': 'audio/mp4',
    'aac': 'audio/aac',
    'flac': 'audio/flac',
    'wma': 'audio/x-ms-wma',
    'pdf': 'application/pdf',
    'zip': 'application/zip',
    'txt': 'text/plain',
    'json': 'application/json',
    'xml': 'application/xml',
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
  };

  // Handle 'ogg' specially since it can be both audio and video
  if (extension.toLowerCase() === 'ogg') {
    // For now, default to video/ogg, but ideally you'd have more context to determine the type
    return 'video/ogg';
  }

  return extensionMap[extension.toLowerCase()] || 'application/octet-stream';
};

export const generateThumbnail = (file, maxWidth = 200, maxHeight = 200) => {
  return new Promise((resolve, reject) => {
    if (!isImageFile(file)) {
      reject(new Error('File is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Calculate new dimensions maintaining aspect ratio
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        // Create canvas and draw thumbnail
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        canvas.toBlob((blob) => {
          resolve(new File([blob], `thumb_${file.name}`, { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.8); // 80% quality JPEG
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default {
  readFileAsText,
  readFileAsDataURL,
  readFileAsArrayBuffer,
  downloadFile,
  downloadBlob,
  downloadUrl,
  isImageFile,
  isVideoFile,
  isAudioFile,
  isTextFile,
  isPdfFile,
  isZipFile,
  getFileSize,
  getFileSizeFormatted,
  formatBytes,
  getFileExtension,
  getFileName,
  getFileNameWithoutExtension,
  isValidImageFile,
  isValidVideoFile,
  isValidAudioFile,
  createFileFromUrl,
  createFileFromBase64,
  getImageDimensions,
  resizeImage,
  cropImage,
  validateFileSize,
  validateFileType,
  getMimeTypeFromExtension,
  generateThumbnail,
};