import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import api from './api.service';

class DownloadService {
  constructor() {
    this.ffmpeg = null;
    this.loaded = false;
  }

  async loadFFmpeg() {
    if (this.loaded) return;

    this.ffmpeg = new FFmpeg();

    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd';
    await this.ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });

    this.loaded = true;
  }

  async analyzeURL(url) {
    const response = await api.post('/download/analyze', { url });
    return response.data;
  }

  async download(url, options = {}, callbacks = {}) {
    const { format = 'mp4', quality = '1080p', filename } = options;
    const { signal, onProgress } = callbacks;

    // Get download URL from backend
    const response = await api.post('/download/start', {
      url,
      format,
      quality,
    });

    const downloadUrl = response.data.downloadUrl;
    const totalSize = response.data.fileSize;

    // Download with progress tracking
    const downloadResponse = await fetch(downloadUrl, { signal });
    const reader = downloadResponse.body.getReader();
    const chunks = [];
    let receivedLength = 0;

    while (true) { // eslint-disable-line no-constant-condition
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);
      receivedLength += value.length;

      if (onProgress) {
        onProgress({
          percent: (receivedLength / totalSize) * 100,
          downloaded: receivedLength,
          total: totalSize,
          speed: 0, // Calculate based on time
          eta: 0, // Calculate based on speed
        });
      }
    }

    // Combine chunks
    const blob = new Blob(chunks);

    // Convert format if needed
    if (options.convertTo && options.convertTo !== format) {
      return await this.convertFormat(blob, options.convertTo);
    }

    // Trigger download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename || `download.${format}`;
    downloadLink.click();

    URL.revokeObjectURL(downloadLink.href);

    return { success: true };
  }

  async convertFormat(file, targetFormat, options = {}) {
    await this.loadFFmpeg();

    const inputName = 'input.' + (file.type.split('/')[1] || 'mp4');
    const outputName = 'output.' + targetFormat;

    // Write input file
    await this.ffmpeg.writeFile(inputName, await fetchFile(file));

    // Run conversion
    const ffmpegArgs = this.getFFmpegArgs(inputName, outputName, options);
    await this.ffmpeg.exec(ffmpegArgs);

    // Read output file
    const data = await this.ffmpeg.readFile(outputName);
    const blob = new Blob([data.buffer], { type: `video/${targetFormat}` });

    return blob;
  }

  getFFmpegArgs(input, output, options = {}) {
    const args = ['-i', input];

    // Video codec
    if (options.videoCodec) {
      args.push('-c:v', options.videoCodec);
    }

    // Audio codec
    if (options.audioCodec) {
      args.push('-c:a', options.audioCodec);
    }

    // Bitrate
    if (options.videoBitrate) {
      args.push('-b:v', options.videoBitrate);
    }

    if (options.audioBitrate) {
      args.push('-b:a', options.audioBitrate);
    }

    // Resolution
    if (options.resolution) {
      args.push('-s', options.resolution);
    }

    // Output
    args.push(output);

    return args;
  }

  getSupportedFormats() {
    return {
      video: [
        { id: 'mp4', label: 'MP4', mimeType: 'video/mp4' },
        { id: 'mkv', label: 'MKV', mimeType: 'video/x-matroska' },
        { id: 'webm', label: 'WebM', mimeType: 'video/webm' },
        { id: 'avi', label: 'AVI', mimeType: 'video/x-msvideo' },
        { id: 'mov', label: 'MOV', mimeType: 'video/quicktime' },
        { id: 'flv', label: 'FLV', mimeType: 'video/x-flv' },
        { id: 'wmv', label: 'WMV', mimeType: 'video/x-ms-wmv' },
        { id: '3gp', label: '3GP', mimeType: 'video/3gpp' },
      ],
      audio: [
        { id: 'mp3', label: 'MP3', mimeType: 'audio/mpeg' },
        { id: 'aac', label: 'AAC', mimeType: 'audio/aac' },
        { id: 'wav', label: 'WAV', mimeType: 'audio/wav' },
        { id: 'flac', label: 'FLAC', mimeType: 'audio/flac' },
        { id: 'ogg', label: 'OGG', mimeType: 'audio/ogg' },
        { id: 'm4a', label: 'M4A', mimeType: 'audio/mp4' },
        { id: 'wma', label: 'WMA', mimeType: 'audio/x-ms-wma' },
      ],
    };
  }

  getQualityOptions() {
    return [
      { id: '4320p', label: '8K', resolution: '7680x4320' },
      { id: '2160p', label: '4K', resolution: '3840x2160' },
      { id: '1440p', label: '2K', resolution: '2560x1440' },
      { id: '1080p', label: 'Full HD', resolution: '1920x1080' },
      { id: '720p', label: 'HD', resolution: '1280x720' },
      { id: '480p', label: 'SD', resolution: '854x480' },
      { id: '360p', label: 'Low', resolution: '640x360' },
      { id: '240p', label: 'Very Low', resolution: '426x240' },
    ];
  }
}

export const downloadService = new DownloadService();
export default downloadService;