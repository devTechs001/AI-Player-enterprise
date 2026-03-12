import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlay,
  FiPause,
  FiSkipForward,
  FiSkipBack,
  FiVolume2,
  FiVolumeX,
  FiMaximize,
  FiMinimize,
  FiHeart,
  FiShare2,
  FiMoreHorizontal,
  FiDownload,
  FiRepeat,
  FiShuffle,
  FiList,
  FiX,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import { useMusic } from '@hooks/useMusic';
import Visualizer from '@components/music/Visualizer';
import styles from './NowPlaying.module.scss';

const NowPlaying = () => {
  const [showQueue, setShowQueue] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  
  const {
    currentTrack,
    isPlaying,
    volume,
    repeatMode,
    shuffle,
    queue,
    currentIndex,
    playTrack,
    pauseTrack,
    nextTrack,
    previousTrack,
    setVolume,
    toggleShuffle,
    setRepeatMode,
    toggleLike,
    isLiked,
  } = useMusic();

  const volumeRef = useRef(null);

  // Handle volume control click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (volumeRef.current && !volumeRef.current.contains(event.target)) {
        setShowVolume(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, pos));
    setVolume(newVolume);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) {
    return (
      <div className={styles.nowPlaying}>
        <div className={styles.placeholder}>
          <div className={styles.placeholderIcon}>
            <FiHeart />
          </div>
          <p>No track playing</p>
          <span>Select a song to start listening</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.nowPlaying}>
      {/* Track Info */}
      <div className={styles.trackInfo}>
        <div className={styles.albumArt}>
          <img src={currentTrack.cover} alt={currentTrack.title} />
          <div className={styles.visualizer}>
            <Visualizer isActive={isPlaying} />
          </div>
        </div>

        <div className={styles.trackDetails}>
          <h3 className={styles.title}>{currentTrack.title}</h3>
          <p className={styles.artist}>{currentTrack.artist}</p>
          <p className={styles.album}>{currentTrack.album}</p>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.mainControls}>
          <button
            className={styles.controlBtn}
            onClick={toggleShuffle}
            title="Shuffle"
          >
            <FiShuffle className={shuffle ? styles.active : ''} />
          </button>

          <button
            className={styles.controlBtn}
            onClick={previousTrack}
            title="Previous"
          >
            <FiSkipBack />
          </button>

          <button
            className={`${styles.playBtn} ${isPlaying ? styles.playing : ''}`}
            onClick={isPlaying ? pauseTrack : playTrack}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FiPause /> : <FiPlay />}
          </button>

          <button
            className={styles.controlBtn}
            onClick={nextTrack}
            title="Next"
          >
            <FiSkipForward />
          </button>

          <button
            className={styles.controlBtn}
            onClick={() => setRepeatMode(
              repeatMode === 'none' ? 'one' : 
              repeatMode === 'one' ? 'all' : 'none'
            )}
            title="Repeat"
          >
            <FiRepeat className={
              repeatMode === 'all' ? styles.active : 
              repeatMode === 'one' ? styles.activeOne : ''
            } />
          </button>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressSection}>
          <span className={styles.currentTime}>
            {formatTime(currentTrack.currentTime || 0)}
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{
                width: `${((currentTrack.currentTime || 0) / (currentTrack.duration || 1)) * 100}%`
              }}
            />
          </div>
          <span className={styles.duration}>
            {formatTime(currentTrack.duration || 0)}
          </span>
        </div>
      </div>

      {/* Additional Controls */}
      <div className={styles.additionalControls}>
        <button
          className={styles.controlBtn}
          onClick={() => toggleLike(currentTrack.id)}
          title={isLiked(currentTrack.id) ? 'Unlike' : 'Like'}
        >
          <FiHeart className={isLiked(currentTrack.id) ? styles.active : ''} />
        </button>

        <button
          className={styles.controlBtn}
          onClick={() => setShowVolume(!showVolume)}
          title="Volume"
        >
          {volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
        </button>

        {/* Volume Slider */}
        <AnimatePresence>
          {showVolume && (
            <motion.div
              className={styles.volumeSlider}
              ref={volumeRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={handleVolumeChange}
            >
              <div className={styles.volumeBar}>
                <div
                  className={styles.volumeLevel}
                  style={{ width: `${volume * 100}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className={styles.controlBtn}
          onClick={() => setShowLyrics(!showLyrics)}
          title="Lyrics"
        >
          <FiList />
        </button>

        <button
          className={styles.controlBtn}
          onClick={() => setShowQueue(!showQueue)}
          title="Queue"
        >
          <FiList />
        </button>

        <button className={styles.controlBtn} title="Download">
          <FiDownload />
        </button>

        <button className={styles.controlBtn} title="Share">
          <FiShare2 />
        </button>

        <button className={styles.controlBtn} title="More">
          <FiMoreHorizontal />
        </button>
      </div>

      {/* Lyrics Panel */}
      <AnimatePresence>
        {showLyrics && currentTrack.lyrics && (
          <motion.div
            className={styles.lyricsPanel}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className={styles.lyricsHeader}>
              <h4>Lyrics</h4>
              <button onClick={() => setShowLyrics(false)}>
                <FiX />
              </button>
            </div>
            <div className={styles.lyricsContent}>
              {currentTrack.lyrics.map((line, index) => (
                <p
                  key={index}
                  className={
                    currentTrack.currentTime >= line.startTime &&
                    currentTrack.currentTime <= line.endTime
                      ? styles.active
                      : ''
                  }
                >
                  {line.text}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Queue Panel */}
      <AnimatePresence>
        {showQueue && (
          <motion.div
            className={styles.queuePanel}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className={styles.queueHeader}>
              <h4>Queue</h4>
              <button onClick={() => setShowQueue(false)}>
                <FiX />
              </button>
            </div>
            <div className={styles.queueList}>
              {queue.map((track, index) => (
                <div
                  key={track.id}
                  className={`${styles.queueItem} ${
                    index === currentIndex ? styles.current : ''
                  }`}
                  onClick={() => playTrack(index)}
                >
                  <img src={track.cover} alt={track.title} />
                  <div className={styles.queueInfo}>
                    <span className={styles.queueTitle}>{track.title}</span>
                    <span className={styles.queueArtist}>{track.artist}</span>
                  </div>
                  {index === currentIndex && isPlaying && (
                    <div className={styles.queueVisualizer}>
                      <Visualizer small />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NowPlaying;