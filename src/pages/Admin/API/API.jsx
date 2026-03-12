import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiKey, FiShield, FiWebhook, FiBook, FiDownload, FiCopy, FiCheck } from 'react-icons/fi';
import Button from '@components/common/Button';
import './API.scss';

const endpoints = [
  { method: 'GET', path: '/api/v1/videos', description: 'List all videos', auth: true },
  { method: 'GET', path: '/api/v1/videos/:id', description: 'Get video details', auth: false },
  { method: 'POST', path: '/api/v1/videos', description: 'Upload new video', auth: true },
  { method: 'DELETE', path: '/api/v1/videos/:id', description: 'Delete video', auth: true },
  { method: 'GET', path: '/api/v1/users/me', description: 'Get current user', auth: true },
  { method: 'PUT', path: '/api/v1/users/me', description: 'Update user profile', auth: true },
];

const codeExamples = {
  javascript: `// Initialize API client
const api = new AIVideoAPI('your-api-key');

// Get videos
const videos = await api.videos.list({ limit: 10 });

// Upload video
const upload = await api.videos.upload({
  file: videoFile,
  title: 'My Video',
  description: 'Video description'
});

// Download video
const download = await api.videos.download(videoId, {
  quality: '1080p',
  format: 'mp4'
});`,
  python: `# Initialize API client
from ai_video import AIVideoAPI

api = AIVideoAPI('your-api-key')

# Get videos
videos = api.videos.list(limit=10)

# Upload video
upload = api.videos.upload(
    file=video_file,
    title='My Video',
    description='Video description'
)

# Download video
download = api.videos.download(
    video_id,
    quality='1080p',
    format='mp4'
)`,
  curl: `# List videos
curl -X GET "https://api.aivideo.com/v1/videos" \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Get video details
curl -X GET "https://api.aivideo.com/v1/videos/{id}" \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Upload video
curl -X POST "https://api.aivideo.com/v1/videos" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@video.mp4" \\
  -F "title=My Video"`,
};

const API = () => {
  const [activeTab, setActiveTab] = useState('javascript');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMethodColor = (method) => {
    const colors = {
      GET: '#10b981',
      POST: '#3b82f6',
      PUT: '#f59e0b',
      DELETE: '#ef4444',
    };
    return colors[method] || '#64748b';
  };

  return (
    <div className="api-page">
      <div className="api-header">
        <div>
          <h1>API Documentation</h1>
          <p>Integrate AI Video Player into your applications</p>
        </div>
        <div className="api-actions">
          <Button variant="outline" icon={<FiBook />}>
            Full Documentation
          </Button>
          <Button variant="primary" icon={<FiKey />}>
            Get API Key
          </Button>
        </div>
      </div>

      {/* API Stats */}
      <div className="api-stats">
        <div className="stat-card">
          <FiCode className="stat-icon" />
          <span className="stat-value">50+</span>
          <span className="stat-label">Endpoints</span>
        </div>
        <div className="stat-card">
          <FiShield className="stat-icon" />
          <span className="stat-value">99.9%</span>
          <span className="stat-label">Uptime</span>
        </div>
        <div className="stat-card">
          <FiWebhook className="stat-icon" />
          <span className="stat-value">Webhooks</span>
          <span className="stat-label">Real-time Events</span>
        </div>
        <div className="stat-card">
          <FiDownload className="stat-icon" />
          <span className="stat-value">SDKs</span>
          <span className="stat-label">Multiple Languages</span>
        </div>
      </div>

      {/* API Keys */}
      <motion.section
        className="api-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>API Keys</h2>
        <div className="api-key-card">
          <div className="key-info">
            <FiKey className="key-icon" />
            <div>
              <span className="key-name">Production Key</span>
              <span className="key-value">sk_live_••••••••••••1234</span>
            </div>
          </div>
          <div className="key-actions">
            <Button variant="ghost" size="small">Regenerate</Button>
            <Button variant="ghost" size="small" danger>Revoke</Button>
          </div>
        </div>
      </motion.section>

      {/* Endpoints */}
      <motion.section
        className="api-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2>API Endpoints</h2>
        <div className="endpoints-list">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="endpoint-item">
              <span
                className="endpoint-method"
                style={{ color: getMethodColor(endpoint.method) }}
              >
                {endpoint.method}
              </span>
              <code className="endpoint-path">{endpoint.path}</code>
              <span className="endpoint-description">{endpoint.description}</span>
              {endpoint.auth && <span className="endpoint-auth">Auth Required</span>}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Code Examples */}
      <motion.section
        className="api-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="section-header">
          <h2>Code Examples</h2>
          <div className="code-tabs">
            {Object.keys(codeExamples).map((lang) => (
              <button
                key={lang}
                className={activeTab === lang ? 'active' : ''}
                onClick={() => setActiveTab(lang)}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="code-block">
          <button className="copy-button" onClick={copyCode}>
            {copied ? <FiCheck /> : <FiCopy />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <pre>
            <code>{codeExamples[activeTab]}</code>
          </pre>
        </div>
      </motion.section>

      {/* Rate Limits */}
      <motion.section
        className="api-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2>Rate Limits</h2>
        <div className="rate-limits">
          <div className="rate-card">
            <span className="rate-plan">Free</span>
            <span className="rate-value">100 req/hour</span>
          </div>
          <div className="rate-card">
            <span className="rate-plan">Pro</span>
            <span className="rate-value">1,000 req/hour</span>
          </div>
          <div className="rate-card">
            <span className="rate-plan">Enterprise</span>
            <span className="rate-value">Unlimited</span>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default API;
