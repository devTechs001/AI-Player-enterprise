import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBox, 
  FiPlay, 
  FiCode, 
  FiDatabase, 
  FiShield, 
  FiActivity,
  FiRefreshCw,
  FiSave,
  FiTerminal
} from 'react-icons/fi';
import Button from '@components/common/Button';
import styles from './Sandbox.module.scss';

const Sandbox = () => {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/api/v1/videos');
  const [requestBody, setRequestBody] = useState('{\n  "title": "New Video",\n  "description": "Enterprise Video Content"\n}');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const endpoints = [
    { name: 'Get Videos', path: '/api/v1/videos', method: 'GET' },
    { name: 'Upload Video', path: '/api/v1/videos/upload', method: 'POST' },
    { name: 'Get Analytics', path: '/api/v1/analytics/overview', method: 'GET' },
    { name: 'User Profile', path: '/api/v1/user/profile', method: 'GET' },
  ];

  const handleSendRequest = () => {
    setIsLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setResponse({
        status: 200,
        time: '124ms',
        size: '1.2kb',
        data: {
          success: true,
          data: [
            { id: 1, title: 'Introduction to AI Player', duration: '12:45' },
            { id: 2, title: 'Enterprise Setup Guide', duration: '08:30' }
          ]
        }
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.sandboxPage}>
      <header className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          API Sandbox
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Test and experiment with Enterprise API endpoints in real-time.
        </motion.p>
      </header>

      <div className={styles.sandboxGrid}>
        <motion.div 
          className={styles.requestPanel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.panelHeader}>
            <h3><FiTerminal /> Request</h3>
            <div className="flex gap-2">
              <Button variant="secondary" size="xs" icon={<FiSave />}>Save</Button>
              <Button 
                variant="primary" 
                size="xs" 
                icon={isLoading ? <FiRefreshCw className="animate-spin" /> : <FiPlay />}
                onClick={handleSendRequest}
                disabled={isLoading}
              >
                Send
              </Button>
            </div>
          </div>
          <div className={styles.panelBody}>
            <div className={styles.inputGroup}>
              <label>Endpoint</label>
              <div className="flex gap-2">
                <select 
                  value={method} 
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-24"
                >
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>DELETE</option>
                </select>
                <input 
                  type="text" 
                  value={endpoint} 
                  onChange={(e) => setEndpoint(e.target.value)}
                  placeholder="/api/v1/..."
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Body (JSON)</label>
              <textarea 
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Quick Select</label>
              <div className="flex flex-wrap gap-2">
                {endpoints.map((ep) => (
                  <button
                    key={ep.name}
                    className="px-3 py-1 bg-dark-800 border border-dark-700 rounded-full text-xs hover:border-primary transition-colors"
                    onClick={() => {
                      setEndpoint(ep.path);
                      setMethod(ep.method);
                    }}
                  >
                    {ep.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.responsePanel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.panelHeader}>
            <h3><FiCode /> Response</h3>
            {response && (
              <div className="flex gap-4 text-xs text-secondary">
                <span>Time: {response.time}</span>
                <span>Size: {response.size}</span>
              </div>
            )}
          </div>
          <div className={styles.panelBody}>
            {!response && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-secondary opacity-50">
                <FiActivity className="text-4xl mb-4" />
                <p>Send a request to see the response</p>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-primary">
                <FiRefreshCw className="text-4xl mb-4 animate-spin" />
                <p>Awaiting response...</p>
              </div>
            )}

            {response && (
              <>
                <div className={styles.statusLine}>
                  <span className={`${styles.status} ${styles.success}`}>
                    {response.status} OK
                  </span>
                </div>
                <div className={styles.codeBlock}>
                  {JSON.stringify(response.data, null, 2)}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sandbox;
