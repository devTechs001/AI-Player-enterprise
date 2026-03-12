import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiPlay, FiPause, FiSkipBack, FiSkipForward, FiHeart,
  FiShare2, FiDownload, FiList
} from 'react-icons/fi';
import Button from '@components/common/Button';
import '../Player.scss';

const MusicPlayer = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const tracks = [
    { title: 'Track One', artist: 'Artist Name', duration: '3:45' },
    { title: 'Track Two', artist: 'Artist Name', duration: '4:12' },
    { title: 'Track Three', artist: 'Artist Name', duration: '3:28' },
  ];

  return (
    <div className="music-player-page">
      <motion.div
        className="music-player-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="album-art">
          <div className="album-art-placeholder">
            <span>🎵</span>
          </div>
        </div>

        <div className="track-info">
          <h2>{tracks[currentTrack].title}</h2>
          <p>{tracks[currentTrack].artist}</p>
        </div>

        <div className="music-controls">
          <div className="playback-controls">
            <button className="control-btn">
              <FiSkipBack />
            </button>
            <button
              className="control-btn play-btn"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <FiPause /> : <FiPlay />}
            </button>
            <button className="control-btn">
              <FiSkipForward />
            </button>
          </div>

          <div className="track-actions">
            <Button variant="ghost" icon={<FiHeart />} />
            <Button variant="ghost" icon={<FiShare2 />} />
            <Button variant="ghost" icon={<FiDownload />} />
            <Button variant="ghost" icon={<FiList />} />
          </div>
        </div>

        <div className="playlist-preview">
          <h3>Up Next</h3>
          {tracks.map((track, index) => (
            <div
              key={index}
              className={`playlist-item ${index === currentTrack ? 'active' : ''}`}
              onClick={() => setCurrentTrack(index)}
            >
              <span className="track-number">{index + 1}</span>
              <div className="track-details">
                <span className="track-title">{track.title}</span>
                <span className="track-artist">{track.artist}</span>
              </div>
              <span className="track-duration">{track.duration}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MusicPlayer;
