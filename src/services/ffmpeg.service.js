import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

class FFmpegService {
  constructor() {
    this.ffmpeg = null;
    this.isLoaded = false;
    this.progressCallback = null;
  }

  async load(onProgress = null) {
    if (this.isLoaded) {
      return;
    }

    this.progressCallback = onProgress;

    this.ffmpeg = createFFmpeg({
      log: true,
      progress: (p) => {
        if (this.progressCallback) {
          this.progressCallback(p);
        }
      },
    });

    await this.ffmpeg.load();
    this.isLoaded = true;
  }

  async convert(inputFile, outputOptions) {
    if (!this.isLoaded) {
      throw new Error('FFmpeg not loaded. Call load() first.');
    }

    try {
      // Write the input file to FFmpeg's virtual file system
      this.ffmpeg.FS('writeFile', 'input', await fetchFile(inputFile));

      // Prepare the output filename
      const outputFileName = outputOptions.outputFileName || 'output.mp4';

      // Prepare the FFmpeg command
      const args = ['-i', 'input', ...outputOptions.args, outputFileName];

      // Execute the conversion
      await this.ffmpeg.run(...args);

      // Read the output file
      const data = this.ffmpeg.FS('readFile', outputFileName);

      // Clean up input file
      this.ffmpeg.FS('unlink', 'input');
      this.ffmpeg.FS('unlink', outputFileName);

      return new Blob([data.buffer], { type: outputOptions.outputType || 'video/mp4' });
    } catch (error) {
      console.error('FFmpeg conversion failed:', error);
      throw error;
    }
  }

  async extractThumbnail(videoFile, time = '00:00:01', size = '128x128') {
    if (!this.isLoaded) {
      throw new Error('FFmpeg not loaded. Call load() first.');
    }

    try {
      // Write the input file to FFmpeg's virtual file system
      this.ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));

      // Extract thumbnail
      await this.ffmpeg.run(
        '-i', 'input.mp4',
        '-ss', time,
        '-vframes', '1',
        '-s', size,
        'thumbnail.jpg'
      );

      // Read the output file
      const data = this.ffmpeg.FS('readFile', 'thumbnail.jpg');

      // Clean up
      this.ffmpeg.FS('unlink', 'input.mp4');
      this.ffmpeg.FS('unlink', 'thumbnail.jpg');

      return new Blob([data.buffer], { type: 'image/jpeg' });
    } catch (error) {
      console.error('Thumbnail extraction failed:', error);
      throw error;
    }
  }

  async trimVideo(videoFile, startTime, endTime) {
    if (!this.isLoaded) {
      throw new Error('FFmpeg not loaded. Call load() first.');
    }

    try {
      // Write the input file to FFmpeg's virtual file system
      this.ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));

      // Trim the video
      await this.ffmpeg.run(
        '-i', 'input.mp4',
        '-ss', startTime,
        '-to', endTime,
        '-c', 'copy',
        'trimmed.mp4'
      );

      // Read the output file
      const data = this.ffmpeg.FS('readFile', 'trimmed.mp4');

      // Clean up
      this.ffmpeg.FS('unlink', 'input.mp4');
      this.ffmpeg.FS('unlink', 'trimmed.mp4');

      return new Blob([data.buffer], { type: 'video/mp4' });
    } catch (error) {
      console.error('Video trimming failed:', error);
      throw error;
    }
  }

  async mergeVideos(videoFiles) {
    if (!this.isLoaded) {
      throw new Error('FFmpeg not loaded. Call load() first.');
    }

    try {
      // Write all input files to FFmpeg's virtual file system
      for (let i = 0; i < videoFiles.length; i++) {
        this.ffmpeg.FS('writeFile', `input${i}.mp4`, await fetchFile(videoFiles[i]));
      }

      // Create a text file listing all inputs
      let concatList = '';
      for (let i = 0; i < videoFiles.length; i++) {
        concatList += `file 'input${i}.mp4'\n`;
      }
      this.ffmpeg.FS('writeFile', 'concat_list.txt', concatList);

      // Merge videos
      await this.ffmpeg.run(
        '-f', 'concat',
        '-safe', '0',
        '-i', 'concat_list.txt',
        '-c', 'copy',
        'merged.mp4'
      );

      // Read the output file
      const data = this.ffmpeg.FS('readFile', 'merged.mp4');

      // Clean up
      for (let i = 0; i < videoFiles.length; i++) {
        this.ffmpeg.FS('unlink', `input${i}.mp4`);
      }
      this.ffmpeg.FS('unlink', 'concat_list.txt');
      this.ffmpeg.FS('unlink', 'merged.mp4');

      return new Blob([data.buffer], { type: 'video/mp4' });
    } catch (error) {
      console.error('Video merging failed:', error);
      throw error;
    }
  }

  async convertToGif(videoFile, startTime = '00:00:01', duration = 3, fps = 10, scale = '320:-1') {
    if (!this.isLoaded) {
      throw new Error('FFmpeg not loaded. Call load() first.');
    }

    try {
      // Write the input file to FFmpeg's virtual file system
      this.ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));

      // Convert to GIF
      await this.ffmpeg.run(
        '-i', 'input.mp4',
        '-ss', startTime,
        '-t', duration.toString(),
        '-vf', `fps=${fps},scale=${scale}:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`,
        'output.gif'
      );

      // Read the output file
      const data = this.ffmpeg.FS('readFile', 'output.gif');

      // Clean up
      this.ffmpeg.FS('unlink', 'input.mp4');
      this.ffmpeg.FS('unlink', 'output.gif');

      return new Blob([data.buffer], { type: 'image/gif' });
    } catch (error) {
      console.error('GIF conversion failed:', error);
      throw error;
    }
  }

  async getVideoInfo(videoFile) {
    if (!this.isLoaded) {
      throw new Error('FFmpeg not loaded. Call load() first.');
    }

    try {
      // Write the input file to FFmpeg's virtual file system
      this.ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));

      // Get video info using ffprobe-like approach
      await this.ffmpeg.run('-i', 'input.mp4', '-f', 'ffmetadata', 'metadata.txt');

      // Read the metadata
      const metadata = this.ffmpeg.FS('readString', 'metadata.txt');

      // Clean up
      this.ffmpeg.FS('unlink', 'input.mp4');
      this.ffmpeg.FS('unlink', 'metadata.txt');

      // Parse basic info (in a real app, you'd want to parse this more thoroughly)
      return {
        duration: this.extractDuration(metadata),
        bitrate: this.extractBitrate(metadata),
        resolution: this.extractResolution(metadata),
      };
    } catch (error) {
      console.error('Getting video info failed:', error);
      throw error;
    }
  }

  // Helper methods to extract info from metadata
  extractDuration(metadata) {
    // Simplified extraction - in reality, you'd parse the metadata properly
    const durationMatch = metadata.match(/Duration: (\d{2}:\d{2}:\d{2}\.\d{2})/);
    return durationMatch ? durationMatch[1] : 'Unknown';
  }

  extractBitrate(metadata) {
    const bitrateMatch = metadata.match(/bitrate: (\d+) kb\/s/);
    return bitrateMatch ? `${bitrateMatch[1]} kb/s` : 'Unknown';
  }

  extractResolution(metadata) {
    const resolutionMatch = metadata.match(/(\d+x\d+)/);
    return resolutionMatch ? resolutionMatch[1] : 'Unknown';
  }

  // Unload FFmpeg and free memory
  unload() {
    if (this.ffmpeg) {
      this.ffmpeg.exit();
      this.ffmpeg = null;
      this.isLoaded = false;
    }
  }
}

export default new FFmpegService();