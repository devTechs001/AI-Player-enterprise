import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiDownload,
  FiVideo,
  FiMusic,
  FiSettings,
  FiCheck,
  FiLoader,
  FiAlertCircle,
  FiClock,
  FiHardDrive,
  FiScissors,
  FiType,
} from 'react-icons/fi';
import { useDownload } from '@hooks/useDownload';
import Button from '@components/common/Button';
import FormatSelector from '../FormatSelector/FormatSelector';
import QualitySelector from '../QualitySelector/QualitySelector';
import styles from './DownloadModal.module.scss';

const formatLabels = {
  mp4: 'MP4',
  webm: 'WebM',
  avi: 'AVI',
  mov: 'MOV',
  mkv: 'MKV',
  flv: 'FLV',
  wmv: 'WMV',
  '3gp': '3GP',
  mp3: 'MP3',
  aac: 'AAC',
  wav: 'WAV',
  flac: 'FLAC',
  ogg: 'OGG',
  m4a: 'M4A',
  wma: 'WMA',
};

const DownloadModal = ({ isOpen, onClose, url }) => {
  const [step, setStep] = useState('analyzing'); // analyzing, options, downloading, complete
  const [mediaInfo, setMediaInfo] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('mp4');
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [downloadAudioOnly, setDownloadAudioOnly] = useState(false);
  const [includeSubtitles, setIncludeSubtitles] = useState(false);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [selectedAudioTrack, setSelectedAudioTrack] = useState('original');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState(null);

  const { analyzeURL, download, downloads } = useDownload();

  // Current download progress
  const currentDownload = downloads.find((d) => d.url === url);

  // Watch for download completion (item removed from active downloads)
  useEffect(() => {
    if (step === 'downloading' && !currentDownload) {
      setStep('complete');
    }
  }, [step, currentDownload]);

  // Watch for download failure
  useEffect(() => {
    if (step === 'downloading' && currentDownload?.status === 'failed') {
      setError(currentDownload.error || 'Download failed');
      setStep('error');
    }
  }, [step, currentDownload]);

  const analyzeMedia = useCallback(async () => {
    if (!url) return;
    
    setStep('analyzing');
    setError(null);

    const result = await analyzeURL(url);
    if (result.success) {
      setMediaInfo({
        ...result.data,
        thumbnail: result.data.thumbnail || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"%3E%3Crect fill="%231a1a2e" width="320" height="180"/%3E%3Ctext fill="%236366f1" font-family="Arial" font-size="16" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Preview Available%3C/text%3E%3C/svg%3E',
      });
      setSelectedQuality(result.data.bestQuality || '1080p');
      setStep('options');
    } else {
      setError(result.error);
      setStep('error');
    }
  }, [url, analyzeURL]);

  useEffect(() => {
    if (isOpen && url) {
      analyzeMedia();
    }
  }, [isOpen, url, analyzeMedia]);

  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: '📸',
      youtube: '▶️',
      vimeo: '🎬',
      tiktok: '🎵',
      twitter: '🐦',
      facebook: '👍',
    };
    return icons[platform] || '🎥';
  };

  const handleDownload = async () => {
    setStep('downloading');

    const result = await download(url, {
      format: downloadAudioOnly ? 'mp3' : selectedFormat,
      quality: selectedQuality,
      includeSubtitles,
    });

    if (result.success) {
      // Will be updated via context
    } else {
      setError(result.error);
      setStep('error');
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` : `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={styles.header}>
            <h2>
              <FiDownload />
              Download Video
            </h2>
            <button onClick={onClose} className={styles.closeBtn}>
              <FiX />
            </button>
          </div>

          {/* Content */}
          <div className={styles.content}>
            {/* Analyzing Step */}
            {step === 'analyzing' && (
              <div className={styles.analyzing}>
                <div className={styles.spinner}>
                  <FiLoader />
                </div>
                <p>Analyzing video...</p>
                <span className={styles.url}>{url}</span>
                <div className={styles.processingLine}>
                  <div className={styles.processingBar} />
                </div>
                <div className={styles.processingSteps}>
                  <span className={styles.stepActive}>Parsing URL</span>
                  <span className={styles.stepPending}>Extracting metadata</span>
                  <span className={styles.stepPending}>Detecting formats</span>
                </div>
              </div>
            )}

            {/* Error Step */}
            {step === 'error' && (
              <div className={styles.error}>
                <FiAlertCircle />
                <h3>Error</h3>
                <p>{error}</p>
                <Button onClick={analyzeMedia}>Try Again</Button>
              </div>
            )}

            {/* Options Step */}
            {step === 'options' && mediaInfo && (
              <div className={styles.options}>
                {/* Media Preview */}
                <div className={styles.preview}>
                  <img src={mediaInfo.thumbnail} alt={mediaInfo.title} />
                  <div className={styles.info}>
                    <div className={styles.platformBadge}>
                      <span>{getPlatformIcon(mediaInfo.platform)}</span>
                      <span>{mediaInfo.platform?.toUpperCase() || 'VIDEO'}</span>
                    </div>
                    <h3>{mediaInfo.title}</h3>
                    <div className={styles.meta}>
                      <span>
                        <FiClock />
                        {formatDuration(mediaInfo.duration)}
                      </span>
                      <span>
                        <FiHardDrive />
                        {formatBytes(mediaInfo.fileSize)}
                      </span>
                    </div>
                    {mediaInfo.resolution && (
                      <div className={styles.meta}>
                        <span>
                          <FiVideo />
                          {mediaInfo.resolution}
                        </span>
                        {mediaInfo.fps && <span>{mediaInfo.fps} fps</span>}
                        {mediaInfo.codec && <span>{mediaInfo.codec}</span>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Download Type */}
                <div className={styles.downloadType}>
                  <button
                    className={`${styles.typeBtn} ${!downloadAudioOnly ? styles.active : ''}`}
                    onClick={() => setDownloadAudioOnly(false)}
                  >
                    <FiVideo />
                    Video
                  </button>
                  <button
                    className={`${styles.typeBtn} ${downloadAudioOnly ? styles.active : ''}`}
                    onClick={() => setDownloadAudioOnly(true)}
                  >
                    <FiMusic />
                    Audio Only
                  </button>
                </div>

                {/* Format & Quality */}
                {!downloadAudioOnly && (
                  <>
                    <div className={styles.optionGroup}>
                      <label>Format</label>
                      <FormatSelector
                        format={selectedFormat}
                        formats={mediaInfo.availableFormats}
                        onSelect={setSelectedFormat}
                      />
                    </div>

                    <div className={styles.optionGroup}>
                      <label>Quality</label>
                      <QualitySelector
                        quality={selectedQuality}
                        qualities={mediaInfo.availableQualities}
                        onSelect={setSelectedQuality}
                      />
                    </div>
                  </>
                )}

                {downloadAudioOnly && (
                  <div className={styles.optionGroup}>
                    <label>Audio Quality</label>
                    <div className={styles.audioQualities}>
                      {['320kbps', '256kbps', '192kbps', '128kbps'].map((q) => (
                        <button
                          key={q}
                          className={selectedQuality === q ? styles.active : ''}
                          onClick={() => setSelectedQuality(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Options */}
                <div className={styles.additionalOptions}>
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={includeSubtitles}
                      onChange={(e) => setIncludeSubtitles(e.target.checked)}
                    />
                    <span>Include subtitles (if available)</span>
                  </label>
                </div>

                {/* Advanced Options Toggle */}
                <button
                  className={styles.advancedToggle}
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <FiSettings />
                  <span>Advanced Options</span>
                  <span className={`${styles.toggleArrow} ${showAdvanced ? styles.open : ''}`}>
                    &#9660;
                  </span>
                </button>

                {showAdvanced && (
                  <div className={styles.advancedOptions}>
                    {/* Trim Controls */}
                    <div className={styles.trimSection}>
                      <label>
                        <FiScissors />
                        Trim Video
                      </label>
                      <div className={styles.trimInputs}>
                        <div className={styles.trimField}>
                          <span>Start:</span>
                          <input
                            type="number"
                            min={0}
                            max={mediaInfo.duration}
                            value={trimStart}
                            onChange={(e) => setTrimStart(Number(e.target.value))}
                          />
                          <span>s</span>
                        </div>
                        <div className={styles.trimField}>
                          <span>End:</span>
                          <input
                            type="number"
                            min={0}
                            max={mediaInfo.duration}
                            value={trimEnd}
                            onChange={(e) => setTrimEnd(Number(e.target.value))}
                          />
                          <span>s</span>
                        </div>
                      </div>
                    </div>

                    {/* Audio Track Selection */}
                    {!downloadAudioOnly && (
                      <div className={styles.audioTrackSection}>
                        <label>
                          <FiMusic />
                          Audio Track
                        </label>
                        <select
                          value={selectedAudioTrack}
                          onChange={(e) => setSelectedAudioTrack(e.target.value)}
                        >
                          <option value="original">Original</option>
                          <option value="track1">Track 1</option>
                          <option value="track2">Track 2</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {/* Estimated Size */}
                <div className={styles.estimatedSize}>
                  <span>Estimated size:</span>
                  <strong>{formatBytes(mediaInfo.estimatedSize?.[selectedQuality] || mediaInfo.fileSize)}</strong>
                </div>
              </div>
            )}

            {/* Downloading Step */}
            {step === 'downloading' && currentDownload && (
              <div className={styles.downloading}>
                <div className={styles.progressCircle}>
                  <svg viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="var(--border-primary)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="var(--primary-500)"
                      strokeWidth="6"
                      strokeDasharray={`${currentDownload.progress * 2.83} 283`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <span>{Math.round(currentDownload.progress)}%</span>
                </div>

                <div className={styles.downloadInfo}>
                  <h4>Downloading...</h4>
                  <p>{mediaInfo.title}</p>
                  <div className={styles.stats}>
                    <span>Speed: {formatBytes(currentDownload.speed)}/s</span>
                    <span>ETA: {currentDownload.eta}</span>
                  </div>
                </div>

                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{ width: `${currentDownload.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Complete Step */}
            {step === 'complete' && (
              <div className={styles.complete}>
                <div className={styles.successIcon}>
                  <FiCheck />
                </div>
                <h3>Download Complete!</h3>
                <p>Your file has been saved successfully.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            {step === 'options' && (
              <>
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleDownload} icon={<FiDownload />}>
                  Download
                </Button>
              </>
            )}

            {step === 'downloading' && (
              <Button variant="secondary" onClick={onClose}>
                Download in Background
              </Button>
            )}

            {step === 'complete' && (
              <Button variant="primary" onClick={onClose}>
                Done
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DownloadModal;