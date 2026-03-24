import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlay, FiPause, FiSkipBack, FiSkipForward, FiHeart,
  FiShare2, FiDownload, FiList, FiRepeat, FiShuffle, FiVolume2
} from 'react-icons/fi';
import Button from '@components/common/Button';
import styles from './MusicPlayer.module.scss';

const MusicPlayer = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(35); // Mock progress percentage
  const [currentTime, setCurrentTime] = useState('1:24');
  
  const tracks = [
    { 
      id: 1, 
      title: 'Midnight City', 
      artist: 'M83', 
      duration: '4:03',
      cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: 2, 
      title: 'Starboy', 
      artist: 'The Weeknd', 
      duration: '3:50',
      cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: 3, 
      title: 'Blinding Lights', 
      artist: 'The Weeknd', 
      duration: '3:20',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: 4, 
      title: 'Levitating', 
      artist: 'Dua Lipa', 
      duration: '3:23',
      cover: 'https://images.unsplash.com/photo-1459749411177-042180ceea72?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const currentTrack = tracks[currentTrackIndex];

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <div className={styles.musicPlayerPage}>
      <motion.div 
        className={styles.musicPlayerContainer}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className={styles.playerMain}>
          <div className={styles.albumArtWrapper}>
            <motion.div 
              className={`${styles.albumArt} ${isPlaying ? styles.playing : ''}`}
              key={currentTrack.id}
              initial={{ rotateY: -20, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src={currentTrack.cover} alt={currentTrack.title} />
              <div className={styles.glassOverlay}>
                {isPlaying ? <FiPause /> : <FiPlay />}
              </div>
            </motion.div>
          </div>

          <div className={styles.trackInfo}>
            <motion.h2
              key={`title-${currentTrack.id}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {currentTrack.title}
            </motion.h2>
            <motion.p
              key={`artist-${currentTrack.id}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {currentTrack.artist}
            </motion.p>
          </div>

          <div className={styles.controlsSection}>
            <div className={styles.progressContainer}>
              <div className={styles.timeBar}>
                <div 
                  className={styles.progress} 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className={styles.timeInfo}>
                <span>{currentTime}</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>

            <div className={styles.playbackControls}>
              <button className={styles.controlBtn}><FiShuffle /></button>
              <button className={styles.controlBtn} onClick={handlePrev}><FiSkipBack /></button>
              <button 
                className={`${styles.controlBtn} ${styles.playBtn}`}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <FiPause /> : <FiPlay />}
              </button>
              <button className={styles.controlBtn} onClick={handleNext}><FiSkipForward /></button>
              <button className={styles.controlBtn}><FiRepeat /></button>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="secondary" size="sm" icon={<FiHeart />}>Like</Button>
              <Button variant="secondary" size="sm" icon={<FiShare2 />}>Share</Button>
              <Button variant="secondary" size="sm" icon={<FiDownload />} />
            </div>
          </div>
        </div>

        <aside className={styles.playlistSection}>
          <h3><FiList /> Up Next</h3>
          <div className={styles.trackList}>
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                className={`${styles.trackItem} ${index === currentTrackIndex ? styles.active : ''}`}
                onClick={() => setCurrentTrackIndex(index)}
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className={styles.trackNumber}>
                  {index === currentTrackIndex && isPlaying ? (
                    <div className="flex gap-1 items-end h-3">
                      <div className="w-1 bg-primary animate-bounce h-full" style={{ animationDuration: '0.6s' }} />
                      <div className="w-1 bg-primary animate-bounce h-2/3" style={{ animationDuration: '0.8s' }} />
                      <div className="w-1 bg-primary animate-bounce h-full" style={{ animationDuration: '0.7s' }} />
                    </div>
                  ) : index + 1}
                </span>
                <div className={styles.details}>
                  <span className={styles.title}>{track.title}</span>
                  <span className={styles.artist}>{track.artist}</span>
                </div>
                <span className={styles.duration}>{track.duration}</span>
              </motion.div>
            ))}
          </div>
        </aside>
      </motion.div>
    </div>
  );
};

export default MusicPlayer;
