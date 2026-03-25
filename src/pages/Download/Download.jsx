import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiLink, FiCheck, FiAlertCircle } from 'react-icons/fi';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import DownloadModal from '@components/downloader/DownloadModal/DownloadModal';
import { useDownload } from '@hooks/useDownload';
import './Download.scss';

const Download = () => {
  const [url, setUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { download } = useDownload();

  const qualities = [
    { value: '2160', label: '4K (2160p)' },
    { value: '1440', label: '2K (1440p)' },
    { value: '1080', label: 'Full HD (1080p)' },
    { value: '720', label: 'HD (720p)' },
    { value: '480', label: 'SD (480p)' },
  ];

  const handleStartDownload = () => {
    if (url) {
      setShowModal(true);
    }
  };

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

        <Button
          variant="primary"
          size="large"
          icon={<FiDownload />}
          onClick={handleStartDownload}
        >
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

      {/* Download Modal */}
      <DownloadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        url={url}
      />
    </div>
  );
};

export default Download;
