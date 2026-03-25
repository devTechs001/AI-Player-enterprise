import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiFolder,
  FiFile,
  FiVideo,
  FiMusic,
  FiImage,
  FiSearch,
  FiDownload,
  FiPlus,
  FiTrash2,
  FiPlay,
  FiGrid,
  FiList,
  FiFilter,
  FiClock,
  FiHardDrive,
  FiCalendar,
} from 'react-icons/fi';
import { useMediaLibrary } from '@hooks/useMediaLibrary';
import { useNavigate } from 'react-router-dom';
import Button from '@components/common/Button';
import Loader from '@components/common/Loader';
import './MediaLibrary.scss';

const MediaLibrary = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  
  const {
    files,
    isLoading,
    error,
    statistics,
    filters,
    searchQuery,
    downloadHistory,
    scanDirectory,
    importFiles,
    removeFile,
    setFilters,
    setSearchQuery,
    playFile,
  } = useMediaLibrary();

  const handleScanDirectory = async () => {
    await scanDirectory();
  };

  const handleImportFiles = async () => {
    await importFiles(true);
  };

  const handlePlayFile = (file) => {
    const { media } = playFile(file);
    navigate('/player', { state: { media } });
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds) => {
    if (!seconds || seconds <= 0) return '--:--';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return h > 0
      ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m}:${s.toString().padStart(2, '0')}`;
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'video':
        return <FiVideo />;
      case 'audio':
        return <FiMusic />;
      case 'image':
        return <FiImage />;
      default:
        return <FiFile />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video':
        return 'video';
      case 'audio':
        return 'audio';
      case 'image':
        return 'image';
      default:
        return '';
    }
  };

  return (
    <div className="media-library">
      {/* Header */}
      <div className="library-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header-content"
        >
          <h1>
            <FiFolder />
            Media Library
          </h1>
          <p>Your local media collection and downloads</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header-actions"
        >
          <Button
            variant="primary"
            icon={<FiPlus />}
            onClick={handleImportFiles}
          >
            Import Files
          </Button>
          <Button
            variant="secondary"
            icon={<FiFolder />}
            onClick={handleScanDirectory}
          >
            Scan Folder
          </Button>
        </motion.div>
      </div>

      {/* Statistics */}
      <motion.div
        className="library-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="stat-card">
          <FiVideo className="icon video" />
          <div className="stat-info">
            <span className="stat-value">{statistics.videos}</span>
            <span className="stat-label">Videos</span>
          </div>
        </div>
        <div className="stat-card">
          <FiMusic className="icon audio" />
          <div className="stat-info">
            <span className="stat-value">{statistics.audios}</span>
            <span className="stat-label">Audio</span>
          </div>
        </div>
        <div className="stat-card">
          <FiImage className="icon image" />
          <div className="stat-info">
            <span className="stat-value">{statistics.images}</span>
            <span className="stat-label">Images</span>
          </div>
        </div>
        <div className="stat-card">
          <FiHardDrive className="icon" />
          <div className="stat-info">
            <span className="stat-value">{formatBytes(statistics.totalSize)}</span>
            <span className="stat-label">Total Size</span>
          </div>
        </div>
        <div className="stat-card">
          <FiClock className="icon" />
          <div className="stat-info">
            <span className="stat-value">{formatDuration(statistics.totalDuration)}</span>
            <span className="stat-label">Total Duration</span>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <div className="library-toolbar">
        <div className="search-bar">
          <FiSearch />
          <input
            type="text"
            placeholder="Search your media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="toolbar-actions">
          <button
            className={`filter-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter />
            Filters
          </button>

          <div className="view-toggle">
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid />
            </button>
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          className="filters-panel"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="filter-group">
            <label>Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ type: e.target.value })}
            >
              <option value="all">All Types</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="image">Images</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ sortBy: e.target.value })}
            >
              <option value="date">Date Added</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
              <option value="duration">Duration</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Order</label>
            <select
              value={filters.sortOrder}
              onChange={(e) => setFilters({ sortOrder: e.target.value })}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="library-content">
        {isLoading ? (
          <div className="loading-state">
            <Loader />
            <p>Scanning media...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>{error}</p>
          </div>
        ) : files.length === 0 ? (
          <div className="empty-state">
            <FiFolder />
            <h3>No Media Files</h3>
            <p>Import files or scan a directory to get started</p>
            <Button variant="primary" icon={<FiPlus />} onClick={handleImportFiles}>
              Import Files
            </Button>
          </div>
        ) : (
          <div className={`media-grid ${viewMode}`}>
            {files.map((file, index) => (
              <motion.div
                key={file.id}
                className={`media-card ${getTypeColor(file.type)}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="media-thumbnail">
                  {file.thumbnail ? (
                    <img src={file.thumbnail} alt={file.title} />
                  ) : (
                    <div className="thumbnail-placeholder">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                  <div className="media-overlay">
                    <button
                      className="play-btn"
                      onClick={() => handlePlayFile(file)}
                    >
                      <FiPlay />
                    </button>
                  </div>
                  {file.duration && (
                    <span className="duration-badge">
                      {formatDuration(file.duration)}
                    </span>
                  )}
                </div>

                <div className="media-info">
                  <h3 title={file.title}>{file.title}</h3>
                  <div className="media-meta">
                    <span className="file-type">{file.extension.toUpperCase()}</span>
                    <span className="file-size">{formatBytes(file.size)}</span>
                  </div>
                  <div className="media-date">
                    <FiCalendar />
                    {new Date(file.lastModified).toLocaleDateString()}
                  </div>
                </div>

                <div className="media-actions">
                  <button
                    className="action-btn remove"
                    onClick={() => removeFile(file.id)}
                    title="Remove"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Download History */}
      {downloadHistory.length > 0 && (
        <div className="download-history">
          <h2>
            <FiDownload />
            Recent Downloads
          </h2>
          <div className="history-list">
            {downloadHistory.slice(0, 5).map((download, index) => (
              <div key={index} className="history-item">
                <div className="history-icon">
                  {getFileIcon(download.platform || 'video')}
                </div>
                <div className="history-info">
                  <span className="history-title">{download.title || download.filename}</span>
                  <span className="history-date">
                    {new Date(download.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="history-status">
                  <span className="status completed">Completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
