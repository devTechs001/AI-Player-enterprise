import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiPlay, FiGithub, FiExternalLink, FiCopy, FiCheck } from 'react-icons/fi';
import Button from '@components/common/Button';
import './Examples.scss';

const examples = [
  {
    id: 1,
    title: 'Basic Video Player',
    description: 'Simple video player integration with play/pause controls',
    difficulty: 'beginner',
    tags: ['react', 'video', 'basic'],
    code: `import { VideoPlayer } from '@ai-video/player';

function App() {
  return (
    <VideoPlayer
      src="https://example.com/video.mp4"
      poster="https://example.com/poster.jpg"
      controls
    />
  );
}`,
  },
  {
    id: 2,
    title: 'AI-Powered Recommendations',
    description: 'Implement AI-driven video recommendations',
    difficulty: 'intermediate',
    tags: ['ai', 'recommendations', 'api'],
    code: `import { useAI } from '@ai-video/hooks';

function Recommendations() {
  const { recommendations } = useAI({ userId: '123' });
  
  return (
    <div>
      {recommendations.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}`,
  },
  {
    id: 3,
    title: 'Watch Party Room',
    description: 'Create synchronized viewing experience for multiple users',
    difficulty: 'advanced',
    tags: ['collaboration', 'websocket', 'sync'],
    code: `import { useWatchParty } from '@ai-video/hooks';

function WatchParty({ roomId }) {
  const { connect, sync, chat } = useWatchParty(roomId);
  
  useEffect(() => {
    connect();
  }, [roomId]);
  
  return (
    <div>
      <VideoPlayer onSeek={sync} onPlay={sync} />
      <Chat messages={chat} />
    </div>
  );
}`,
  },
  {
    id: 4,
    title: 'Video Download Manager',
    description: 'Handle video downloads with progress tracking',
    difficulty: 'intermediate',
    tags: ['download', 'progress', 'queue'],
    code: `import { useDownload } from '@ai-video/hooks';

function DownloadManager({ videoId }) {
  const { download, progress, status } = useDownload();
  
  const handleDownload = async () => {
    await download({
      videoId,
      quality: '1080p',
      format: 'mp4'
    });
  };
  
  return (
    <Button onClick={handleDownload}>
      {status === 'downloading' ? \`\${progress}%\` : 'Download'}
    </Button>
  );
}`,
  },
  {
    id: 5,
    title: 'Custom Video Filters',
    description: 'Apply real-time AI filters to video content',
    difficulty: 'advanced',
    tags: ['ai', 'filters', 'canvas'],
    code: `import { VideoProcessor } from '@ai-video/core';

function FilteredVideo({ videoSrc, filter }) {
  const processor = new VideoProcessor({
    filters: [filter],
    quality: 'high'
  });
  
  return (
    <canvas ref={processor.canvasRef}>
      <video src={videoSrc} hidden />
    </canvas>
  );
}`,
  },
  {
    id: 6,
    title: 'Analytics Dashboard',
    description: 'Track video performance with detailed analytics',
    difficulty: 'intermediate',
    tags: ['analytics', 'charts', 'dashboard'],
    code: `import { useAnalytics } from '@ai-video/hooks';

function AnalyticsDashboard({ videoId }) {
  const { views, watchTime, engagement } = useAnalytics(videoId);
  
  return (
    <div>
      <StatCard title="Views" value={views} />
      <StatCard title="Watch Time" value={watchTime} />
      <EngagementChart data={engagement} />
    </div>
  );
}`,
  },
];

const Examples = () => {
  const [selectedExample, setSelectedExample] = useState(null);
  const [copied, setCopied] = useState(false);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: '#10b981',
      intermediate: '#f59e0b',
      advanced: '#ef4444',
    };
    return colors[difficulty] || '#64748b';
  };

  return (
    <div className="examples-page">
      <div className="examples-header">
        <div>
          <h1>Code Examples</h1>
          <p>Learn how to integrate AI Video Player into your projects</p>
        </div>
        <div className="examples-actions">
          <Button variant="outline" icon={<FiGithub />}>
            View on GitHub
          </Button>
          <Button variant="primary" icon={<FiCode />}>
            Submit Example
          </Button>
        </div>
      </div>

      {/* Examples Grid */}
      <div className="examples-grid">
        {examples.map((example, index) => (
          <motion.div
            key={example.id}
            className="example-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedExample(example)}
          >
            <div className="example-header">
              <div className="example-icon">
                <FiCode />
              </div>
              <span
                className="example-difficulty"
                style={{ color: getDifficultyColor(example.difficulty) }}
              >
                {example.difficulty}
              </span>
            </div>
            <h3>{example.title}</h3>
            <p>{example.description}</p>
            <div className="example-tags">
              {example.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="example-footer">
              <Button variant="ghost" size="small" icon={<FiPlay />}>
                View Code
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Code Modal */}
      {selectedExample && (
        <motion.div
          className="code-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedExample(null)}
        >
          <motion.div
            className="code-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>{selectedExample.title}</h2>
                <p>{selectedExample.description}</p>
              </div>
              <button
                className="modal-close"
                onClick={() => setSelectedExample(null)}
              >
                <FiExternalLink />
              </button>
            </div>
            <div className="modal-body">
              <div className="code-viewer">
                <button
                  className="copy-code"
                  onClick={() => copyCode(selectedExample.code)}
                >
                  {copied ? <FiCheck /> : <FiCopy />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <pre>
                  <code>{selectedExample.code}</code>
                </pre>
              </div>
            </div>
            <div className="modal-footer">
              <Button variant="secondary" onClick={() => setSelectedExample(null)}>
                Close
              </Button>
              <Button variant="primary" icon={<FiExternalLink />}>
                Open in Sandbox
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Examples;
