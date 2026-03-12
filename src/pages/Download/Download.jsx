import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiLink, FiCheck, FiAlertCircle } from 'react-icons/fi';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import './Download.scss';

const Download = () => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp4');
  const [quality, setQuality] = useState('1080');

  const formats = ['mp4', 'mkv', 'avi', 'webm', 'mp3', 'aac'];
  const qualities = [
    { value: '2160', label: '4K (2160p)' },
    { value: '1440', label: '2K (1440p)' },
    { value: '1080', label: 'Full HD (1080p)' },
    { value: '720', label: 'HD (720p)' },
    { value: '480', label: 'SD (480p)' },
  ];

  return (
    <div className="download-page">
      <div className="download-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Download Video</h1>
          <p>Paste a URL to download from any supported platform</p>
        </motion.div>
      </div>

      <motion.div
        className="download-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="url-input-group">
          <FiLink />
          <input
            type="url"
            placeholder="Paste video URL here (YouTube, Vimeo, etc.)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="download-options">
          <div className="option-group">
            <label>Format</label>
            <div className="format-selector">
              {formats.map((f) => (
                <button
                  key={f}
                  className={format === f ? 'active' : ''}
                  onClick={() => setFormat(f)}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <label>Quality</label>
            <select value={quality} onChange={(e) => setQuality(e.target.value)}>
              {qualities.map((q) => (
                <option key={q.value} value={q.value}>
                  {q.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button variant="primary" size="large" icon={<FiDownload />}>
          Start Download
        </Button>

        <div className="download-info">
          <div className="info-item">
            <FiCheck />
            <span>No registration required for basic downloads</span>
          </div>
          <div className="info-item">
            <FiCheck />
            <span>Support for 1000+ platforms</span>
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
          {['YouTube', 'Vimeo', 'Dailymotion', 'Twitch', 'Facebook', 'Instagram', 'TikTok', 'Twitter'].map((platform) => (
            <div key={platform} className="platform-badge">
              {platform}
            </div>
          ))}
          <div className="platform-badge more">+1000 more</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Download;
