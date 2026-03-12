import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiPlay, FiPause, FiVolume2, FiMaximize, FiSettings,
  FiSkipBack, FiSkipForward, FiHeart, FiShare2, FiDownload
} from 'react-icons/fi';
import Button from '@components/common/Button';
import '../Player.scss';

const VideoPlayer = () => {
  const { id } = useParams();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-player-page">
      <motion.div
        className="video-player-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="video-wrapper">
          <video
            ref={videoRef}
            src="/assets/videos/demo.mp4"
            poster="/assets/images/video-poster.jpg"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
          />
          
          <div className="video-controls">
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            
            <div className="controls-row">
              <div className="controls-left">
                <button className="control-btn" onClick={togglePlay}>
                  {isPlaying ? <FiPause /> : <FiPlay />}
                </button>
                <button className="control-btn">
                  <FiSkipBack />
                </button>
                <button className="control-btn">
                  <FiSkipForward />
                </button>
                <div className="volume-control">
                  <button
                    className="control-btn"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    <FiVolume2 />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="volume-slider"
                  />
                </div>
                <span className="time-display">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              
              <div className="controls-right">
                <button className="control-btn">
                  <FiSettings />
                </button>
                <button
                  className="control-btn"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  <FiMaximize />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="video-info">
          <h1>Video Title</h1>
          <div className="video-actions">
            <Button variant="ghost" icon={<FiHeart />}>Like</Button>
            <Button variant="ghost" icon={<FiShare2 />}>Share</Button>
            <Button variant="ghost" icon={<FiDownload />}>Download</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoPlayer;
