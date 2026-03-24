import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMusic,
  FiPlay,
  FiPause,
  FiHeart,
  FiMoreVertical,
  FiClock,
  FiPlus,
  FiSearch,
  FiGrid,
  FiList,
  FiShuffle,
} from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { musicService } from '@services/music.service';
import { useMusic } from '@hooks/useMusic';
import MusicCard from '@components/music/MusicCard';
import NowPlaying from '@components/music/NowPlaying';
import Visualizer from '@components/music/Visualizer';
import Button from '@components/common/Button';
import SearchBar from '@components/common/SearchBar';
import styles from './Library.module.scss';

const Library = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const {
    currentTrack,
    isPlaying,
    queue,
    playTrack,
    pauseTrack,
    shuffleQueue,
  } = useMusic();

  const { data: library } = useQuery(
    ['musicLibrary', searchQuery, activeFilter],
    () => musicService.getLibrary({ search: searchQuery, filter: activeFilter })
  );

  const { data: recentlyPlayed } = useQuery(
    'recentlyPlayed',
    () => musicService.getRecentlyPlayed(10)
  );

  const { data: playlists } = useQuery(
    'playlists',
    musicService.getPlaylists
  );

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'songs', label: 'Songs' },
    { id: 'albums', label: 'Albums' },
    { id: 'artists', label: 'Artists' },
    { id: 'podcasts', label: 'Podcasts' },
  ];

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.library}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Music Library</h1>
          <p>Your personal music collection</p>
        </div>

        <div className={styles.headerActions}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search music..."
          />

          <div className={styles.viewToggle}>
            <button
              className={viewMode === 'grid' ? styles.active : ''}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid />
            </button>
            <button
              className={viewMode === 'list' ? styles.active : ''}
              onClick={() => setViewMode('list')}
            >
              <FiList />
            </button>
          </div>

          <Button variant="primary" icon={<FiShuffle />} onClick={shuffleQueue}>
            Shuffle Play
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`${styles.filterBtn} ${activeFilter === filter.id ? styles.active : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Column - Library */}
        <div className={styles.librarySection}>
          {/* Recently Played */}
          {recentlyPlayed?.length > 0 && (
            <section className={styles.section}>
              <h2>Recently Played</h2>
              <div className={styles.horizontalScroll}>
                {recentlyPlayed.map((track) => (
                  <MusicCard
                    key={track.id}
                    track={track}
                    isPlaying={currentTrack?.id === track.id && isPlaying}
                    onPlay={() => playTrack(track)}
                    onPause={pauseTrack}
                    compact
                  />
                ))}
              </div>
            </section>
          )}

          {/* Playlists */}
          {playlists?.length > 0 && (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Your Playlists</h2>
                <Button variant="ghost" icon={<FiPlus />}>
                  Create Playlist
                </Button>
              </div>
              <div className={styles.playlistsGrid}>
                {playlists.map((playlist) => (
                  <div key={playlist.id} className={styles.playlistCard}>
                    <div className={styles.playlistCover}>
                      <img src={playlist.cover} alt={playlist.name} />
                      <button className={styles.playBtn}>
                        <FiPlay />
                      </button>
                    </div>
                    <h3>{playlist.name}</h3>
                    <p>{playlist.trackCount} tracks</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* All Music */}
          <section className={styles.section}>
            <h2>All Music</h2>
            
            {viewMode === 'grid' ? (
              <div className={styles.musicGrid}>
                {library?.map((track) => (
                  <MusicCard
                    key={track.id}
                    track={track}
                    isPlaying={currentTrack?.id === track.id && isPlaying}
                    onPlay={() => playTrack(track)}
                    onPause={pauseTrack}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.musicList}>
                <div className={styles.listHeader}>
                  <span className={styles.colNum}>#</span>
                  <span className={styles.colTitle}>Title</span>
                  <span className={styles.colAlbum}>Album</span>
                  <span className={styles.colAdded}>Date Added</span>
                  <span className={styles.colDuration}>
                    <FiClock />
                  </span>
                </div>

                {library?.map((track, index) => (
                  <motion.div
                    key={track.id}
                    className={`${styles.listItem} ${
                      currentTrack?.id === track.id ? styles.playing : ''
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => playTrack(track)}
                  >
                    <span className={styles.colNum}>
                      {currentTrack?.id === track.id && isPlaying ? (
                        <Visualizer small />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <div className={styles.colTitle}>
                      <img src={track.cover} alt={track.title} />
                      <div>
                        <span className={styles.trackTitle}>{track.title}</span>
                        <span className={styles.trackArtist}>{track.artist}</span>
                      </div>
                    </div>
                    <span className={styles.colAlbum}>{track.album}</span>
                    <span className={styles.colAdded}>
                      {new Date(track.addedAt).toLocaleDateString()}
                    </span>
                    <div className={styles.colActions}>
                      <button className={styles.likeBtn}>
                        <FiHeart />
                      </button>
                      <span className={styles.duration}>
                        {formatDuration(track.duration)}
                      </span>
                      <button className={styles.moreBtn}>
                        <FiMoreVertical />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Column - Now Playing */}
        <div className={styles.nowPlayingSection}>
          <NowPlaying />
          
          {/* Queue */}
          {queue.length > 0 && (
            <div className={styles.queue}>
              <h3>Up Next</h3>
              <div className={styles.queueList}>
                {queue.slice(0, 5).map((track) => (
                  <div key={track.id} className={styles.queueItem}>
                    <img src={track.cover} alt={track.title} />
                    <div className={styles.queueInfo}>
                      <span>{track.title}</span>
                      <span>{track.artist}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;