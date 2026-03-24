import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiMinimize, FiSettings,
  FiSkipBack, FiSkipForward, FiHeart, FiShare2, FiDownload, FiChevronDown,
  FiMonitor, FiHeadphones, FiType, FiRepeat,
  FiShuffle, FiList, FiThumbsUp, FiThumbsDown, FiMoreHorizontal
} from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { videoService } from '@services/video.service';
import { useAuth } from '@hooks/useAuth';
import Button from '@components/common/Button';
import Dropdown from '@components/common/Dropdown';
import Tooltip from '@components/common/Tooltip';
import Alert from '@components/common/Alert';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, subscription } = useAuth();
  
  // Video refs and state
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('1080p');
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [theaterMode, setTheaterMode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [buffered, setBuffered] = useState(0);

  // Fetch video data
  const { data: video, isLoading, error } = useQuery(
    ['video', id],
    () => videoService.getVideoById(id),
    { enabled: !!id }
  );

  // Auto-hide controls timer
  useEffect(() => {
    let timeout;
    if (isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, currentTime, showControls]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          seek(-10);
          break;
        case 'ArrowRight':
          seek(10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          adjustVolume(0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          adjustVolume(-0.1);
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'm':
          toggleMute();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, volume, isMuted, isFullscreen]);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const seek = useCallback((seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    }
  }, [currentTime, duration]);

  const adjustVolume = useCallback((delta) => {
    const newVolume = Math.max(0, Math.min(1, volume + delta));
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  }, [volume]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, [isFullscreen]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      // Calculate buffered progress
      if (videoRef.current.buffered.length > 0) {
        const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
        setBuffered((bufferedEnd / duration) * 100);
      }
    }
  }, [duration]);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const handleProgressClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, [duration]);

  const formatTime = useCallback((time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const qualities = ['2160p', '1440p', '1080p', '720p', '480p', '360p'];
  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Alert variant="error" message="Failed to load video. Please try again." />
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`${styles.videoPlayerPage} ${theaterMode ? styles.theaterMode : ''}`}
      onMouseMove={() => setShowControls(true)}
    >
      <motion.div
        className={styles.videoPlayerContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Video Wrapper */}
        <div className={styles.videoWrapper}>
          <video
            ref={videoRef}
            src={video?.url}
            poster={video?.thumbnail}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          
          {/* AI Enhancement Overlay */}
          <div className={styles.aiOverlay}>
            <div className={styles.aiIndicator}>
              <FiMonitor />
              <span>AI Enhanced</span>
            </div>
          </div>
          
          {/* Video Controls */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                className={styles.videoControls}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                {/* Progress Bar */}
                <div className={styles.progressBar} onClick={handleProgressClick}>
                  <div className={styles.progressBuffered} style={{ width: `${buffered}%` }} />
                  <div 
                    className={styles.progressPlayed} 
                    style={{ width: `${(currentTime / duration) * 100}%` }} 
                  />
                  <div 
                    className={styles.progressHandle} 
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                
                {/* Controls Row */}
                <div className={styles.controlsRow}>
                  {/* Left Controls */}
                  <div className={styles.controlsLeft}>
                    <Tooltip content="Play/Pause (Space)">
                      <button className={styles.controlBtn} onClick={togglePlay}>
                        {isPlaying ? <FiPause /> : <FiPlay />}
                      </button>
                    </Tooltip>
                    
                    <Tooltip content="Skip Back 10s (←)">
                      <button className={styles.controlBtn} onClick={() => seek(-10)}>
                        <FiSkipBack />
                      </button>
                    </Tooltip>
                    
                    <Tooltip content="Skip Forward 10s (→)">
                      <button className={styles.controlBtn} onClick={() => seek(10)}>
                        <FiSkipForward />
                      </button>
                    </Tooltip>
                    
                    <Tooltip content="Volume">
                      <div className={styles.volumeControl}>
                        <button 
                          className={styles.controlBtn}
                          onClick={toggleMute}
                        >
                          {isMuted || volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => {
                            const newVolume = parseFloat(e.target.value);
                            setVolume(newVolume);
                            if (videoRef.current) {
                              videoRef.current.volume = newVolume;
                              videoRef.current.muted = false;
                              setIsMuted(false);
                            }
                          }}
                          className={styles.volumeSlider}
                        />
                      </div>
                    </Tooltip>
                    
                    <span className={styles.timeDisplay}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  
                  {/* Right Controls */}
                  <div className={styles.controlsRight}>
                    <Dropdown
                      trigger={
                        <button className={styles.controlBtn}>
                          {playbackRate}x
                        </button>
                      }
                      items={playbackRates.map(rate => ({
                        label: `${rate}x`,
                        onClick: () => {
                          setPlaybackRate(rate);
                          if (videoRef.current) {
                            videoRef.current.playbackRate = rate;
                          }
                        },
                        active: rate === playbackRate
                      }))}
                    />
                    
                    <Dropdown
                      trigger={
                        <button className={styles.controlBtn}>
                          {quality}
                        </button>
                      }
                      items={qualities.map(q => ({
                        label: q,
                        onClick: () => setQuality(q),
                        active: q === quality
                      }))}
                    />
                    
                    <Tooltip content="Subtitles">
                      <button 
                        className={`${styles.controlBtn} ${subtitlesEnabled ? styles.active : ''}`}
                        onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                      >
                        <FiType />
                      </button>
                    </Tooltip>
                    
                    <Tooltip content="Picture in Picture">
                      <button className={styles.controlBtn}>
                        <FiMonitor />
                      </button>
                    </Tooltip>
                    
                    <Tooltip content="Theater Mode">
                      <button 
                        className={`${styles.controlBtn} ${theaterMode ? styles.active : ''}`}
                        onClick={() => setTheaterMode(!theaterMode)}
                      >
                        <FiMonitor />
                      </button>
                    </Tooltip>
                    
                    <Tooltip content={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}>
                      <button className={styles.controlBtn} onClick={toggleFullscreen}>
                        {isFullscreen ? <FiMinimize /> : <FiMaximize />}
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Video Info */}
        <div className={styles.videoInfo}>
          <div className={styles.videoHeader}>
            <h1>{video?.title || 'Video Title'}</h1>
            <div className={styles.videoStats}>
              <span>{video?.views || '0'} views</span>
              <span>{video?.uploadedAt || 'Unknown date'}</span>
            </div>
          </div>
          
          <div className={styles.videoActions}>
            <Button 
              variant={isLiked ? "primary" : "ghost"} 
              icon={<FiThumbsUp />}
              onClick={() => setIsLiked(!isLiked)}
            >
              {video?.likes || 'Like'}
            </Button>
            
            <Button 
              variant={isDisliked ? "danger" : "ghost"} 
              icon={<FiThumbsDown />}
              onClick={() => setIsDisliked(!isDisliked)}
            >
              Dislike
            </Button>
            
            <Button variant="ghost" icon={<FiHeart />}>
              Favorite
            </Button>
            
            <Button variant="ghost" icon={<FiShare2 />}>
              Share
            </Button>
            
            {subscription?.plan !== 'free' && (
              <Button variant="ghost" icon={<FiDownload />}>
                Download
              </Button>
            )}
            
            <Dropdown
              trigger={
                <Button variant="ghost" icon={<FiMoreHorizontal />} />
              }
              items={[
                { label: 'Add to Playlist', icon: <FiList /> },
                { label: 'Report', icon: <FiMoreHorizontal /> }
              ]}
            />
          </div>
          
          <div className={styles.videoDescription}>
            <p>{video?.description || 'No description available.'}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoPlayer;
