import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiMaximize,
  FiMinimize,
  FiSettings,
  FiDownload,
  FiShare2,
  FiHeart,
  FiMessageSquare,
  FiSkipBack,
  FiSkipForward,
  FiCast,
  FiPictureInPicture,
  FiZap,
  FiList,
  FiSubtitle,
} from 'react-icons/fi';
import { usePlayer } from '@hooks/usePlayer';
import { useFullscreen } from '@hooks/useFullscreen';
import { usePictureInPicture } from '@hooks/usePictureInPicture';
import { useKeyboardShortcuts } from '@hooks/useKeyboardShortcuts';
import VolumeControl from '../VolumeControl';
import PlaybackSpeed from '../PlaybackSpeed';
import QualitySelector from '../QualitySelector';
import Subtitles from '../Subtitles';
import Timeline from '../Timeline';
import Chapters from '../Chapters';
import AIFeatures from '../AIFeatures';
import Tooltip from '@components/common/Tooltip';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = ({ 
  media, 
  autoPlay = false, 
  showAI = true,
  showDownload = true,
  onEnded,
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [settingsTab, setSettingsTab] = useState('quality');
  
  const {
    isPlaying,
    isPaused,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    quality,
    availableQualities,
    subtitles,
    activeSubtitle,
    chapters,
    currentChapter,
    isBuffering,
    aiAnalysis,
    
    play,
    pause,
    togglePlay,
    seek,
    seekRelative,
    setVolume,
    toggleMute,
    setPlaybackRate,
    setQuality,
    setActiveSubtitle,
    onTimeUpdate,
    onDurationChange,
    onEnded: handleEnded,
  } = usePlayer();
  
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);
  const { isPiP, togglePiP, isSupported: isPiPSupported } = usePictureInPicture(videoRef);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    ' ': togglePlay,
    'k': togglePlay,
    'ArrowLeft': () => seekRelative(-10),
    'ArrowRight': () => seekRelative(10),
    'j': () => seekRelative(-10),
    'l': () => seekRelative(10),
    'ArrowUp': () => setVolume(volume + 0.1),
    'ArrowDown': () => setVolume(volume - 0.1),
    'm': toggleMute,
    'f': toggleFullscreen,
    'p': togglePiP,
    'c': () => setActiveSubtitle(activeSubtitle ? null : subtitles[0]),
    '0': () => seek(0),
    '1': () => seek(duration * 0.1),
    '2': () => seek(duration * 0.2),
    '3': () => seek(duration * 0.3),
    '4': () => seek(duration * 0.4),
    '5': () => seek(duration * 0.5),
    '6': () => seek(duration * 0.6),
    '7': () => seek(duration * 0.7),
    '8': () => seek(duration * 0.8),
    '9': () => seek(duration * 0.9),
  });

  // Auto-hide controls
  const hideControls = useCallback(() => {
    if (isPlaying && !showSettings) {
      setShowControls(false);
    }
  }, [isPlaying, showSettings]);

  const showControlsHandler = useCallback(() => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(hideControls, 3000);
  }, [hideControls]);

  useEffect(() => {
    return () => clearTimeout(controlsTimeoutRef.current);
  }, []);

  // Format time
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.player} ${isFullscreen ? styles.fullscreen : ''}`}
      onMouseMove={showControlsHandler}
      onMouseLeave={hideControls}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className={styles.video}
        src={media?.url}
        poster={media?.thumbnail}
        autoPlay={autoPlay}
        onClick={togglePlay}
        onTimeUpdate={(e) => onTimeUpdate(e.target.currentTime)}
        onDurationChange={(e) => onDurationChange(e.target.duration)}
        onEnded={() => {
          handleEnded();
          onEnded?.();
        }}
        onWaiting={() => {}}
        onPlaying={() => {}}
      />

      {/* Buffering Indicator */}
      <AnimatePresence>
        {isBuffering && (
          <motion.div
            className={styles.buffering}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.spinner} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Play Button */}
      <AnimatePresence>
        {!isPlaying && showControls && (
          <motion.button
            className={styles.centerPlay}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={togglePlay}
          >
            <FiPlay />
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI Analysis Overlay */}
      <AnimatePresence>
        {showAI && showAIPanel && aiAnalysis && (
          <motion.div
            className={styles.aiOverlay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <AIFeatures analysis={aiAnalysis} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapters Panel */}
      <AnimatePresence>
        {showChapters && chapters.length > 0 && (
          <Chapters
            chapters={chapters}
            currentTime={currentTime}
            onSeek={seek}
            onClose={() => setShowChapters(false)}
          />
        )}
      </AnimatePresence>

      {/* Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className={styles.controls}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Timeline */}
            <Timeline
              currentTime={currentTime}
              duration={duration}
              buffered={0}
              chapters={chapters}
              onSeek={seek}
            />

            <div className={styles.controlsRow}>
              {/* Left Controls */}
              <div className={styles.leftControls}>
                <Tooltip content="Play/Pause (K)">
                  <button onClick={togglePlay} className={styles.controlBtn}>
                    {isPlaying ? <FiPause /> : <FiPlay />}
                  </button>
                </Tooltip>

                <Tooltip content="Rewind 10s (J)">
                  <button onClick={() => seekRelative(-10)} className={styles.controlBtn}>
                    <FiSkipBack />
                  </button>
                </Tooltip>

                <Tooltip content="Forward 10s (L)">
                  <button onClick={() => seekRelative(10)} className={styles.controlBtn}>
                    <FiSkipForward />
                  </button>
                </Tooltip>

                <VolumeControl
                  volume={volume}
                  isMuted={isMuted}
                  onVolumeChange={setVolume}
                  onToggleMute={toggleMute}
                />

                <div className={styles.time}>
                  <span>{formatTime(currentTime)}</span>
                  <span>/</span>
                  <span>{formatTime(duration)}</span>
                </div>

                {currentChapter && (
                  <div className={styles.chapterName}>
                    {currentChapter.title}
                  </div>
                )}
              </div>

              {/* Right Controls */}
              <div className={styles.rightControls}>
                {showAI && aiAnalysis && (
                  <Tooltip content="AI Features">
                    <button
                      onClick={() => setShowAIPanel(!showAIPanel)}
                      className={`${styles.controlBtn} ${showAIPanel ? styles.active : ''}`}
                    >
                      <FiZap />
                    </button>
                  </Tooltip>
                )}

                {chapters.length > 0 && (
                  <Tooltip content="Chapters">
                    <button
                      onClick={() => setShowChapters(!showChapters)}
                      className={`${styles.controlBtn} ${showChapters ? styles.active : ''}`}
                    >
                      <FiList />
                    </button>
                  </Tooltip>
                )}

                {subtitles.length > 0 && (
                  <Tooltip content="Subtitles">
                    <button
                      onClick={() => setSettingsTab('subtitles')}
                      className={`${styles.controlBtn} ${activeSubtitle ? styles.active : ''}`}
                    >
                      <FiSubtitle />
                    </button>
                  </Tooltip>
                )}

                <Tooltip content="Settings">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`${styles.controlBtn} ${showSettings ? styles.active : ''}`}
                  >
                    <FiSettings />
                  </button>
                </Tooltip>

                {isPiPSupported && (
                  <Tooltip content="Picture in Picture (P)">
                    <button onClick={togglePiP} className={styles.controlBtn}>
                      <FiPictureInPicture />
                    </button>
                  </Tooltip>
                )}

                {showDownload && (
                  <Tooltip content="Download">
                    <button className={styles.controlBtn}>
                      <FiDownload />
                    </button>
                  </Tooltip>
                )}

                <Tooltip content="Fullscreen (F)">
                  <button onClick={toggleFullscreen} className={styles.controlBtn}>
                    {isFullscreen ? <FiMinimize /> : <FiMaximize />}
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  className={styles.settingsPanel}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <div className={styles.settingsTabs}>
                    <button
                      className={settingsTab === 'quality' ? styles.active : ''}
                      onClick={() => setSettingsTab('quality')}
                    >
                      Quality
                    </button>
                    <button
                      className={settingsTab === 'speed' ? styles.active : ''}
                      onClick={() => setSettingsTab('speed')}
                    >
                      Speed
                    </button>
                    <button
                      className={settingsTab === 'subtitles' ? styles.active : ''}
                      onClick={() => setSettingsTab('subtitles')}
                    >
                      Subtitles
                    </button>
                  </div>

                  <div className={styles.settingsContent}>
                    {settingsTab === 'quality' && (
                      <QualitySelector
                        quality={quality}
                        availableQualities={availableQualities}
                        onSelect={setQuality}
                      />
                    )}
                    {settingsTab === 'speed' && (
                      <PlaybackSpeed
                        speed={playbackRate}
                        onSelect={setPlaybackRate}
                      />
                    )}
                    {settingsTab === 'subtitles' && (
                      <Subtitles
                        subtitles={subtitles}
                        active={activeSubtitle}
                        onSelect={setActiveSubtitle}
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Subtitle Display */}
      {activeSubtitle && (
        <div className={styles.subtitleDisplay}>
          {/* Subtitle text would be rendered here based on currentTime */}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;