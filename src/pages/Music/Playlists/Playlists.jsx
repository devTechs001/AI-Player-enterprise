import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMusic, FiPlus, FiSearch, FiMoreHorizontal, FiHeart, FiPlay } from 'react-icons/fi';
import Button from '@components/common/Button';
import './Playlists.scss';

const playlists = [
  { id: 1, name: 'My Favorites', count: 128, cover: '🎵', updatedAt: '2 hours ago' },
  { id: 2, name: 'Workout Mix', count: 45, cover: '💪', updatedAt: '1 day ago' },
  { id: 3, name: 'Chill Vibes', count: 89, cover: '🌙', updatedAt: '3 days ago' },
  { id: 4, name: 'Focus Mode', count: 67, cover: '🎯', updatedAt: '1 week ago' },
  { id: 5, name: 'Party Hits', count: 156, cover: '🎉', updatedAt: '2 weeks ago' },
  { id: 6, name: 'Road Trip', count: 234, cover: '🚗', updatedAt: '1 month ago' },
];

const recentTracks = [
  { id: 1, title: 'Midnight Dreams', artist: 'Luna Wave', duration: '3:45', plays: '2.4M' },
  { id: 2, title: 'Electric Soul', artist: 'Neon Pulse', duration: '4:12', plays: '1.8M' },
  { id: 3, title: 'Ocean Breeze', artist: 'Coastal Sounds', duration: '3:28', plays: '3.1M' },
  { id: 4, title: 'Urban Jungle', artist: 'City Beats', duration: '3:56', plays: '987K' },
  { id: 5, title: 'Starlight', artist: 'Cosmic Dreams', duration: '4:33', plays: '4.2M' },
];

const Playlists = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="playlists-page">
      <div className="playlists-header">
        <div>
          <h1>My Playlists</h1>
          <p>Manage and organize your music collections</p>
        </div>
        <div className="playlists-actions">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="primary" icon={<FiPlus />}>
            New Playlist
          </Button>
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="playlists-grid">
        {/* Create New Playlist Card */}
        <motion.div
          className="playlist-card create-new"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <FiPlus />
          <span>Create New Playlist</span>
        </motion.div>

        {/* Playlist Cards */}
        {playlists.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            className="playlist-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="playlist-cover">
              <span className="cover-emoji">{playlist.cover}</span>
              <button className="play-button">
                <FiPlay />
              </button>
            </div>
            <div className="playlist-info">
              <h3>{playlist.name}</h3>
              <p>{playlist.count} tracks</p>
              <span className="updated">Updated {playlist.updatedAt}</span>
            </div>
            <button className="playlist-more">
              <FiMoreHorizontal />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Recent Tracks */}
      <motion.section
        className="recent-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="section-header">
          <h2>Recently Played</h2>
          <Button variant="ghost" size="small">View All</Button>
        </div>
        <div className="tracks-list">
          {recentTracks.map((track, index) => (
            <div key={track.id} className="track-row">
              <span className="track-number">{index + 1}</span>
              <div className="track-info">
                <FiMusic className="track-icon" />
                <div>
                  <span className="track-title">{track.title}</span>
                  <span className="track-artist">{track.artist}</span>
                </div>
              </div>
              <span className="track-plays">{track.plays}</span>
              <span className="track-duration">{track.duration}</span>
              <div className="track-actions">
                <button className="action-btn">
                  <FiHeart />
                </button>
                <button className="action-btn">
                  <FiMoreHorizontal />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Playlists;
