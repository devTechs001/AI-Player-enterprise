import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiLink, FiCheck, FiAlertCircle, FiSearch, FiTrash2 } from 'react-icons/fi';
import { FaYoutube, FaInstagram, FaTiktok, FaTwitter, FaFacebook } from 'react-icons/fa';
import Button from '@components/common/Button';
import DownloadModal from '@components/downloader/DownloadModal/DownloadModal';
import { useDownload } from '@hooks/useDownload';
import { downloadService } from '@services/download.service';
import './Download.scss';

const platformColors = {
  youtube: '#FF0000',
  vimeo: '#00ADEF',
  instagram: '#E4405F',
  tiktok: '#FF0050',
  twitter: '#1DA1F2',
  facebook: '#4267B2',
  dailymotion: '#00D2F3',
  twitch: '#9146FF',
};

const platformIcons = {
  youtube: <FaYoutube />,
  instagram: <FaInstagram />,
  tiktok: <FaTiktok />,
  twitter: <FaTwitter />,
  facebook: <FaFacebook />,
};

const formatOptions = [
  { value: 'mp4', label: 'MP4', desc: 'Best compatibility' },
  { value: 'webm', label: 'WebM', desc: 'Smaller size' },
  { value: 'mkv', label: 'MKV', desc: 'High quality' },
  { value: 'mp3', label: 'MP3', desc: 'Audio only' },
  { value: 'aac', label: 'AAC', desc: 'Audio high quality' },
];

const Download = () => {
  const [url, setUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [detectedPlatform, setDetectedPlatform] = useState(null);
  const [urlError, setUrlError] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('mp4');
  const { download } = useDownload();

  const detectPlatform = useCallback((inputUrl) => {
    if (!inputUrl) { setDetectedPlatform(null); return; }
    const platform = downloadService.detectPlatform(inputUrl);
    setDetectedPlatform(platform === 'unknown' ? null : platform);
    setUrlError('');
  }, []);

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);
    detectPlatform(val);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      detectPlatform(text);
    } catch {}
  };

  const handleClear = () => {
    setUrl('');
    setDetectedPlatform(null);
    setUrlError('');
  };

  const validateUrl = (inputUrl) => {
    if (!inputUrl.trim()) { setUrlError('Please enter a URL'); return false; }
    try {
      new URL(inputUrl);
      setUrlError('');
      return true;
    } catch {
      setUrlError('Invalid URL format');
      return false;
    }
  };

  const handleStartDownload = () => {
    if (validateUrl(url)) {
      setShowModal(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleStartDownload();
  };

  return (
    <div className="download-page">
      <div className="download-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Download Video & Audio</h1>
          <p>Paste any URL to download from 1000+ supported platforms</p>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        className="download-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <div className="stat-item">
          <span className="stat-value">1000+</span>
          <span className="stat-label">Platforms</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">4K/8K</span>
          <span className="stat-label">Max Quality</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">MP3/MP4</span>
          <span className="stat-label">Formats</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">Free</span>
          <span className="stat-label">No Registration</span>
        </div>
      </motion.div>

      <motion.div
        className="download-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className={`url-input-group ${urlError ? 'has-error' : ''} ${detectedPlatform ? 'has-platform' : ''}`}>
          {detectedPlatform ? (
            <span className="platform-indicator" style={{ '--platform-color': platformColors[detectedPlatform] || '#6366f1' }}>
              {platformIcons[detectedPlatform] || <FiLink />}
            </span>
          ) : (
            <FiLink className="input-icon" />
          )}
          <input
            type="url"
            placeholder="Paste video URL here (YouTube, Vimeo, Instagram, TikTok...)"
            value={url}
            onChange={handleUrlChange}
            onKeyDown={handleKeyDown}
          />
          {url && (
            <button className="clear-btn" onClick={handleClear} title="Clear">
              <FiTrash2 />
            </button>
          )}
          <button className="paste-btn" onClick={handlePaste} title="Paste from clipboard">
            <FiSearch />
          </button>
        </div>
        {urlError && <p className="url-error">{urlError}</p>}
        {detectedPlatform && (
          <p className="platform-detected">
            <span className="detect-dot" style={{ background: platformColors[detectedPlatform] || '#6366f1' }} />
            Detected: <strong>{detectedPlatform.charAt(0).toUpperCase() + detectedPlatform.slice(1)}</strong>
          </p>
        )}

        {/* Format selector */}
        <div className="format-quick-select">
          <label>Format:</label>
          <div className="format-chips">
            {formatOptions.map((fmt) => (
              <button
                key={fmt.value}
                className={`format-chip ${selectedFormat === fmt.value ? 'active' : ''}`}
                onClick={() => setSelectedFormat(fmt.value)}
              >
                <span className="chip-label">{fmt.label}</span>
                <span className="chip-desc">{fmt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="glow"
          size="xl"
          icon={<FiDownload />}
          onClick={handleStartDownload}
          className="download-cta"
        >
          {detectedPlatform ? `Download from ${detectedPlatform.charAt(0).toUpperCase() + detectedPlatform.slice(1)}` : 'Start Download'}
        </Button>

        <div className="download-info">
          <div className="info-item">
            <FiCheck />
            <span>No registration required for basic downloads</span>
          </div>
          <div className="info-item">
            <FiCheck />
            <span>High-speed downloads with resume support</span>
          </div>
          <div className="info-item">
            <FiAlertCircle />
            <span>Respect copyright and terms of service</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="supported-platforms"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2>Supported Platforms</h2>
        <div className="platforms-grid">
          {[
            { name: 'YouTube', icon: '▶️' },
            { name: 'Vimeo', icon: '🎬' },
            { name: 'Dailymotion', icon: '🎥' },
            { name: 'Twitch', icon: '📺' },
            { name: 'Facebook', icon: '👍' },
            { name: 'Instagram', icon: '📸' },
            { name: 'TikTok', icon: '🎵' },
            { name: 'Twitter/X', icon: '🐦' },
          ].map((p) => (
            <div key={p.name} className="platform-badge">
              <span className="platform-icon">{p.icon}</span>
              <span>{p.name}</span>
            </div>
          ))}
          <div className="platform-badge more">+1000 more</div>
        </div>
      </motion.div>

      <DownloadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        url={url}
        initialFormat={selectedFormat}
      />
    </div>
  );
};

export default Download;
