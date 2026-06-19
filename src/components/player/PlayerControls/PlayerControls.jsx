import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiMinimize,
  FiSettings, FiDownload, FiShare2, FiHeart, FiSkipBack, FiSkipForward,
  FiMonitor, FiZap, FiList, FiType,
} from 'react-icons/fi';
import Tooltip from '@components/common/Tooltip';
import './PlayerControls.scss';

const formatTime = (time) => {
  if (!time || isNaN(time)) return '0:00';
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const PlayerControls = forwardRef(({
  isPlaying, currentTime, duration, volume, isMuted, playbackRate,
  isFullscreen, isPiPSupported, showAI, showDownload, hasChapters, hasSubtitles,
  activeSubtitle, showAIPanel, showChapters, showSettings, settingsTab,
  onTogglePlay, onSeekRelative, onVolumeChange, onToggleMute,
  onToggleFullscreen, onTogglePiP, onToggleAI, onToggleChapters,
  onToggleSettings, onSettingsTabChange, onDownload,
  onSettingsClose, onTimelineChange,
}, ref) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (onTimelineChange && duration) {
      onTimelineChange(pos * duration);
    }
  };

  return (
    <div className="player-controls" ref={ref}>
      <div className="timeline-wrapper">
        <div className="timeline" onClick={handleTimelineClick}>
          <div className="timeline-track" />
          <div className="timeline-progress" style={{ width: `${progress}%` }} />
          <div className="timeline-thumb" style={{ left: `${progress}%` }} />
        </div>
      </div>

      <div className="controls-main">
        <div className="controls-left">
          <Tooltip content={isPlaying ? 'Pause (k)' : 'Play (k)'}>
            <button className="ctrl-btn ctrl-btn-play" onClick={onTogglePlay}>
              {isPlaying ? <FiPause /> : <FiPlay />}
            </button>
          </Tooltip>

          <Tooltip content="Rewind 10s">
            <button className="ctrl-btn" onClick={() => onSeekRelative?.(-10)}>
              <FiSkipBack />
            </button>
          </Tooltip>

          <Tooltip content="Forward 10s">
            <button className="ctrl-btn" onClick={() => onSeekRelative?.(10)}>
              <FiSkipForward />
            </button>
          </Tooltip>

          <div className="volume-wrapper">
            <Tooltip content={isMuted ? 'Unmute (m)' : 'Mute (m)'}>
              <button className="ctrl-btn" onClick={onToggleMute}>
                {isMuted || volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
              </button>
            </Tooltip>
            <input
              type="range"
              className="volume-slider"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange?.(parseFloat(e.target.value))}
            />
          </div>

          <span className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="controls-right">
          {showAI && (
            <Tooltip content="AI Features">
              <button
                className={`ctrl-btn ${showAIPanel ? 'active' : ''}`}
                onClick={onToggleAI}
              >
                <FiZap />
              </button>
            </Tooltip>
          )}

          {hasChapters && (
            <Tooltip content="Chapters">
              <button
                className={`ctrl-btn ${showChapters ? 'active' : ''}`}
                onClick={onToggleChapters}
              >
                <FiList />
              </button>
            </Tooltip>
          )}

          {hasSubtitles && (
            <Tooltip content="Subtitles">
              <button
                className={`ctrl-btn ${activeSubtitle ? 'active' : ''}`}
                onClick={() => onSettingsTabChange?.('subtitles')}
              >
                <FiType />
              </button>
            </Tooltip>
          )}

          <Tooltip content="Playback Speed">
            <button
              className="ctrl-btn speed-btn"
              onClick={() => onSettingsTabChange?.('speed')}
            >
              {playbackRate}x
            </button>
          </Tooltip>

          <Tooltip content="Settings">
            <button
              className={`ctrl-btn ${showSettings ? 'active' : ''}`}
              onClick={onToggleSettings}
            >
              <FiSettings />
            </button>
          </Tooltip>

          {isPiPSupported && (
            <Tooltip content="Picture in Picture">
              <button className="ctrl-btn" onClick={onTogglePiP}>
                <FiMonitor />
              </button>
            </Tooltip>
          )}

          {showDownload && (
            <Tooltip content="Download">
              <button className="ctrl-btn" onClick={onDownload}>
                <FiDownload />
              </button>
            </Tooltip>
          )}

          <Tooltip content={isFullscreen ? 'Exit Fullscreen (f)' : 'Fullscreen (f)'}>
            <button className="ctrl-btn" onClick={onToggleFullscreen}>
              {isFullscreen ? <FiMinimize /> : <FiMaximize />}
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
});

PlayerControls.displayName = 'PlayerControls';

export default PlayerControls;
