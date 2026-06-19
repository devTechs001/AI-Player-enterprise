import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX, FiDownload, FiVideo, FiMusic, FiSettings, FiCheck,
  FiLoader, FiAlertCircle, FiClock, FiHardDrive, FiScissors,
  FiPauseCircle, FiPlayCircle, FiXCircle, FiRefreshCw, FiFolder,
  FiWifiOff,
} from 'react-icons/fi';
import { useDownload } from '@hooks/useDownload';
import Button from '@components/common/Button';
import FormatSelector from '../FormatSelector/FormatSelector';
import QualitySelector from '../QualitySelector/QualitySelector';
import styles from './DownloadModal.module.scss';

const formatLabels = {
  mp4: 'MP4', webm: 'WebM', avi: 'AVI', mov: 'MOV', mkv: 'MKV',
  flv: 'FLV', wmv: 'WMV', '3gp': '3GP',
  mp3: 'MP3', aac: 'AAC', wav: 'WAV', flac: 'FLAC', ogg: 'OGG',
  m4a: 'M4A', wma: 'WMA',
};

const DownloadModal = ({ isOpen, onClose, url, initialFormat = 'mp4' }) => {
  const [step, setStep] = useState('analyzing');
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
  const [savedFilename, setSavedFilename] = useState('');
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [analyzeStep, setAnalyzeStep] = useState(0);

  const {
    analyzeURL, download, downloads, pauseDownload, resumeDownload, cancelDownload, retryDownload,
  } = useDownload();

  const currentDownload = downloads.find((d) => d.url === url);

  // Watch for download completion
  useEffect(() => {
    if (step === 'downloading' && !currentDownload) {
      setStep('complete');
    }
  }, [step, currentDownload]);

  // Watch for download failure
  useEffect(() => {
    if (step === 'downloading' && currentDownload?.status === 'failed') {
      const isNetworkError = currentDownload.error?.toLowerCase().includes('network') ||
        currentDownload.error?.toLowerCase().includes('fetch') ||
        currentDownload.error?.toLowerCase().includes('abort');
      setError({
        message: currentDownload.error || 'Download failed',
        isNetworkError,
        retries: currentDownload.retries || 0,
      });
      setStep('error');
    }
  }, [step, currentDownload]);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('analyzing');
      setError(null);
      setSavedFilename('');
      setSelectedFormat(initialFormat || 'mp4');
      setSelectedQuality('1080p');
      setDownloadAudioOnly(false);
      setIncludeSubtitles(false);
      setTrimStart(0);
      setTrimEnd(0);
      setSelectedAudioTrack('original');
      setShowAdvanced(false);
    }
  }, [isOpen, initialFormat]);

  const analyzeMedia = useCallback(async () => {
    if (!url) return;
    setStep('analyzing');
    setError(null);
    setAnalyzeProgress(0);
    setAnalyzeStep(0);

    const stages = [
      'Contacting server',
      'Fetching video metadata',
      'Extracting formats',
      'Resolving titles',
    ];

    // Update progress in real-time while backend call runs
    const startTime = Date.now();
    const progressTimer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      // Simulate progress: ~30% in first 3s, then slow to ~60% by 15s, then plateau
      let pct;
      if (elapsed < 3) pct = elapsed / 3 * 30;
      else if (elapsed < 15) pct = 30 + (elapsed - 3) / 12 * 30;
      else pct = Math.min(60 + Math.min(elapsed - 15, 30) / 30 * 30, 95);
      setAnalyzeProgress(Math.round(pct));

      const stageIdx = Math.min(Math.floor(elapsed / 3), 3);
      setAnalyzeStep(stageIdx);
    }, 250);

    const result = await analyzeURL(url);
    clearInterval(progressTimer);
    setAnalyzeProgress(100);

    if (result.success) {
      setMediaInfo({
        ...result.data,
        thumbnail: result.data.thumbnail || `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"%3E%3Crect fill="%231a1a2e" width="320" height="180"/%3E%3Ctext fill="%236366f1" font-family="Arial" font-size="16" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Preview Available%3C/text%3E%3C/svg%3E`,
      });
      setSelectedQuality(result.data.bestQuality || '1080p');
      setStep('options');
    } else {
      setError({ message: result.error, isNetworkError: false, retries: 0 });
      setStep('error');
    }
  }, [url, analyzeURL]);

  useEffect(() => {
    if (isOpen && url) {
      analyzeMedia();
    }
  }, [isOpen, url, analyzeMedia]);

  const getPlatformIcon = (platform) => {
    const icons = { instagram: '📸', youtube: '▶️', vimeo: '🎬', tiktok: '🎵', twitter: '🐦', facebook: '👍' };
    return icons[platform] || '🎥';
  };

  const handleDownload = async () => {
    setStep('downloading');
    const result = await download(url, {
      format: downloadAudioOnly ? 'mp3' : selectedFormat,
      quality: selectedQuality,
      includeSubtitles,
      filename: mediaInfo?.suggestedFilename,
    });
    if (!result.success) {
      setError({ message: result.error, isNetworkError: false, retries: 0 });
      setStep('error');
    }
  };

  const handlePause = () => {
    if (currentDownload) pauseDownload(currentDownload.id);
  };

  const handleResume = () => {
    if (currentDownload) resumeDownload(currentDownload.id);
  };

  const handleCancel = () => {
    if (currentDownload) cancelDownload(currentDownload.id);
    setStep('options');
  };

  const handleRetry = () => {
    if (currentDownload) {
      retryDownload(currentDownload.id);
    } else {
      analyzeMedia();
    }
  };

  const handleDismissError = () => {
    setStep('options');
    setError(null);
  };

  const handleOpenFile = async () => {
    try {
      const handle = await window.showDirectoryPicker?.({ startIn: 'downloads' });
      if (handle) {
        // Just open the downloads folder — user sees their file
      }
    } catch { /* user cancelled */ }
  };

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return h > 0
      ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m}:${s.toString().padStart(2, '0')}`;
  };

  const formatSpeed = (bytesPerSec) => {
    if (!bytesPerSec) return '0 B/s';
    return formatBytes(bytesPerSec) + '/s';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (step !== 'downloading') onClose();
        }}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <h2><FiDownload /> {step === 'downloading' ? 'Downloading...' : step === 'complete' ? 'Complete!' : 'Download Video'}</h2>
            <button onClick={step === 'downloading' ? handlePause : onClose} className={styles.closeBtn}>
              <FiX />
            </button>
          </div>

          <div className={styles.content}>
            {/* Analyzing */}
            {step === 'analyzing' && (
              <div className={styles.analyzing}>
                <div className={styles.spinner}><FiLoader /></div>
                <p>Analyzing video...</p>
                <span className={styles.url}>{url}</span>
                <div className={styles.analyzeProgressContainer}>
                  <div className={styles.analyzeProgressBar}>
                    <div className={styles.analyzeProgressFill} style={{ width: `${analyzeProgress}%` }} />
                  </div>
                  <span className={styles.analyzeProgressText}>{Math.round(analyzeProgress)}%</span>
                </div>
                <div className={styles.processingSteps}>
                  {['Contacting server', 'Fetching metadata', 'Extracting formats', 'Resolving titles'].map((label, i) => (
                    <span
                      key={label}
                      className={
                        i < analyzeStep ? styles.stepDone :
                        i === analyzeStep ? styles.stepActive :
                        styles.stepPending
                      }
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Error */}
            {step === 'error' && (
              <div className={styles.error}>
                {error?.isNetworkError ? <FiWifiOff className={styles.errorIcon} /> : <FiAlertCircle className={styles.errorIcon} />}
                <h3>{error?.isNetworkError ? 'Network Error' : 'Download Failed'}</h3>
                <p>{error?.message || 'An unexpected error occurred'}</p>
                {error?.isNetworkError && (
                  <p className={styles.errorHint}>
                    Check your internet connection and try again. Your progress has been saved.
                  </p>
                )}
                {currentDownload?.status === 'failed' ? (
                  <div className={styles.errorActions}>
                    <Button variant="primary" onClick={handleRetry} icon={<FiRefreshCw />}>
                      Retry Download
                    </Button>
                    <Button variant="secondary" onClick={handleDismissError}>
                      Change Options
                    </Button>
                  </div>
                ) : (
                  <div className={styles.errorActions}>
                    <Button variant="primary" onClick={analyzeMedia} icon={<FiRefreshCw />}>
                      Try Again
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Options */}
            {step === 'options' && mediaInfo && (
              <div className={styles.options}>
                <div className={styles.preview}>
                  <img src={mediaInfo.thumbnail} alt={mediaInfo.title} />
                  <div className={styles.info}>
                    <div className={styles.platformBadge}>
                      <span>{getPlatformIcon(mediaInfo.platform)}</span>
                      <span>{mediaInfo.platform?.toUpperCase() || 'VIDEO'}</span>
                    </div>
                    <h3>{mediaInfo.title}</h3>
                    {mediaInfo.author && (
                      <span className={styles.author}>by {mediaInfo.author}</span>
                    )}
                    <div className={styles.meta}>
                      <span><FiClock />{formatDuration(mediaInfo.duration)}</span>
                      <span><FiHardDrive />{formatBytes(mediaInfo.fileSize)}</span>
                    </div>
                    {mediaInfo.resolution && (
                      <div className={styles.meta}>
                        <span><FiVideo />{mediaInfo.resolution}</span>
                        {mediaInfo.fps && <span>{mediaInfo.fps} fps</span>}
                        {mediaInfo.codec && <span>{mediaInfo.codec}</span>}
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.downloadType}>
                  <button
                    className={`${styles.typeBtn} ${!downloadAudioOnly ? styles.active : ''}`}
                    onClick={() => setDownloadAudioOnly(false)}
                  >
                    <FiVideo /> Video
                  </button>
                  <button
                    className={`${styles.typeBtn} ${downloadAudioOnly ? styles.active : ''}`}
                    onClick={() => setDownloadAudioOnly(true)}
                  >
                    <FiMusic /> Audio Only
                  </button>
                </div>

                {!downloadAudioOnly && (
                  <>
                    <div className={styles.optionGroup}>
                      <label>Format</label>
                      <FormatSelector
                        format={selectedFormat}
                        formats={mediaInfo.availableFormats}
                        onSelect={setSelectedFormat}
                        estimatedSizes={mediaInfo.estimatedFormatSizes?.[selectedQuality]}
                      />
                    </div>
                    <div className={styles.optionGroup}>
                      <label>Quality</label>
                      <QualitySelector
                        quality={selectedQuality}
                        qualities={mediaInfo.availableQualities}
                        onSelect={setSelectedQuality}
                        estimatedSizes={mediaInfo.estimatedSize}
                        duration={mediaInfo.duration}
                      />
                    </div>
                  </>
                )}

                {downloadAudioOnly && (
                  <div className={styles.optionGroup}>
                    <label>Audio Quality</label>
                    <div className={styles.audioQualities}>
                      {['320kbps', '256kbps', '192kbps', '128kbps'].map((q) => (
                        <button key={q} className={selectedQuality === q ? styles.active : ''} onClick={() => setSelectedQuality(q)}>{q}</button>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.additionalOptions}>
                  <label className={styles.checkbox}>
                    <input type="checkbox" checked={includeSubtitles} onChange={(e) => setIncludeSubtitles(e.target.checked)} />
                    <span>Include subtitles (if available)</span>
                  </label>
                </div>

                <button className={styles.advancedToggle} onClick={() => setShowAdvanced(!showAdvanced)}>
                  <FiSettings />
                  <span>Advanced Options</span>
                  <span className={`${styles.toggleArrow} ${showAdvanced ? styles.open : ''}`}>&#9660;</span>
                </button>

                {showAdvanced && (
                  <div className={styles.advancedOptions}>
                    <div className={styles.trimSection}>
                      <label><FiScissors /> Trim Video</label>
                      <div className={styles.trimInputs}>
                        <div className={styles.trimField}>
                          <span>Start:</span>
                          <input type="number" min={0} max={mediaInfo.duration} value={trimStart} onChange={(e) => setTrimStart(Number(e.target.value))} />
                          <span>s</span>
                        </div>
                        <div className={styles.trimField}>
                          <span>End:</span>
                          <input type="number" min={0} max={mediaInfo.duration} value={trimEnd} onChange={(e) => setTrimEnd(Number(e.target.value))} />
                          <span>s</span>
                        </div>
                      </div>
                    </div>
                    {!downloadAudioOnly && (
                      <div className={styles.audioTrackSection}>
                        <label><FiMusic /> Audio Track</label>
                        <select value={selectedAudioTrack} onChange={(e) => setSelectedAudioTrack(e.target.value)}>
                          <option value="original">Original</option>
                          <option value="track1">Track 1</option>
                          <option value="track2">Track 2</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}

                <div className={styles.estimatedSize}>
                  <span>Estimated size:</span>
                  <strong>{formatBytes(mediaInfo.estimatedSize?.[selectedQuality] || mediaInfo.fileSize)}</strong>
                </div>
              </div>
            )}

            {/* Downloading with real-time progress */}
            {step === 'downloading' && (
              <div className={styles.downloading}>
                <div className={styles.progressCircle}>
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border-primary)" strokeWidth="6" />
                    <circle
                      cx="50" cy="50" r="45" fill="none" stroke="var(--primary-500)" strokeWidth="6"
                      strokeDasharray={`${Math.min((currentDownload?.progress || 0) * 2.83, 283)} 283`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <span>{currentDownload ? Math.round(currentDownload.progress || 0) : 0}%</span>
                </div>

                <div className={styles.downloadInfo}>
                  <h4>{mediaInfo?.title || 'Downloading...'}</h4>
                  {currentDownload && (
                    <div className={styles.progressStats}>
                      <div className={styles.statRow}>
                        <span className={styles.statLabel}>Size</span>
                        <span className={styles.statValue}>
                          {formatBytes(currentDownload.downloaded || 0)}
                          {currentDownload.total > 0 && (
                            <> / {formatBytes(currentDownload.total)}</>
                          )}
                        </span>
                      </div>
                      <div className={styles.statRow}>
                        <span className={styles.statLabel}>Speed</span>
                        <span className={styles.statValue}>
                          {currentDownload.speed > 0
                            ? `${currentDownload.speed} Mbps`
                            : 'Calculating...'}
                        </span>
                      </div>
                      <div className={styles.statRow}>
                        <span className={styles.statLabel}>ETA</span>
                        <span className={styles.statValue}>
                          {currentDownload.eta || 'Calculating...'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: `${currentDownload?.progress || 0}%` }} />
                </div>
              </div>
            )}

            {/* Complete */}
            {step === 'complete' && (
              <div className={styles.complete}>
                <div className={styles.successIcon}><FiCheck /></div>
                <h3>Download Started!</h3>
                <p>The video is being downloaded in your browser. Check your downloads folder.</p>
                {mediaInfo && (
                  <div className={styles.completeInfo}>
                    <span className={styles.completeTitle}>{mediaInfo.title}</span>
                    {mediaInfo.author && <span className={styles.completeAuthor}>by {mediaInfo.author}</span>}
                    <span className={styles.completeMeta}>
                      {mediaInfo.platform?.toUpperCase()} · {formatDuration(mediaInfo.duration)} · {formatBytes(mediaInfo.fileSize)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            {step === 'options' && (
              <>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={handleDownload} icon={<FiDownload />}>Download</Button>
              </>
            )}
            {step === 'downloading' && currentDownload && (
              <div className={styles.downloadActions}>
                {currentDownload.status === 'downloading' ? (
                  <button className={styles.actionBtn} onClick={handlePause} title="Pause">
                    <FiPauseCircle />
                  </button>
                ) : (
                  <button className={styles.actionBtn} onClick={handleResume} title="Resume">
                    <FiPlayCircle />
                  </button>
                )}
                <button className={styles.actionBtn} onClick={handleCancel} title="Cancel">
                  <FiXCircle />
                </button>
              </div>
            )}
            {step === 'downloading' && !currentDownload && (
              <Button variant="primary" onClick={onClose} icon={<FiCheck />}>Done</Button>
            )}
            {step === 'complete' && (
              <Button variant="primary" onClick={onClose}>Done</Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DownloadModal;
