import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCopy, FiCheck, FiTerminal, FiShield, FiVideo, FiActivity, FiUser } from 'react-icons/fi';
import styles from './API.module.scss';

const API = () => {
  const [activeSection, setActiveSection] = useState('authentication');
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      id: 'authentication',
      name: 'Authentication',
      icon: <FiShield />,
      methods: [
        {
          method: 'post',
          path: '/api/v1/auth/login',
          description: 'Authenticate user and return access token',
          params: [
            { name: 'email', type: 'string', required: true, description: 'User email address' },
            { name: 'password', type: 'string', required: true, description: 'User password' }
          ],
          response: `{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "123",
      "email": "user@example.com",
      "role": "user"
    }
  }
}`
        },
        {
          method: 'post',
          path: '/api/v1/auth/register',
          description: 'Register a new user account',
          params: [
            { name: 'email', type: 'string', required: true, description: 'User email address' },
            { name: 'password', type: 'string', required: true, description: 'User password' },
            { name: 'name', type: 'string', required: true, description: 'User display name' }
          ],
          response: `{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}`
        }
      ]
    },
    {
      id: 'videos',
      name: 'Videos',
      icon: <FiVideo />,
      methods: [
        {
          method: 'get',
          path: '/api/v1/videos',
          description: 'Get list of videos with pagination and filters',
          params: [
            { name: 'page', type: 'number', required: false, description: 'Page number (default: 1)' },
            { name: 'limit', type: 'number', required: false, description: 'Items per page (default: 20)' },
            { name: 'category', type: 'string', required: false, description: 'Filter by category' }
          ],
          response: `{
  "success": true,
  "data": {
    "videos": [
      {
        "id": "123",
        "title": "Sample Video",
        "thumbnail": "https://example.com/thumb.jpg",
        "duration": "12:34",
        "views": 1234
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100
    }
  }
}`
        },
        {
          method: 'post',
          path: '/api/v1/videos/upload',
          description: 'Upload a new video file',
          params: [
            { name: 'file', type: 'file', required: true, description: 'Video file to upload' },
            { name: 'title', type: 'string', required: true, description: 'Video title' },
            { name: 'description', type: 'string', required: false, description: 'Video description' }
          ],
          response: `{
  "success": true,
  "data": {
    "video": {
      "id": "123",
      "title": "Uploaded Video",
      "status": "processing"
    }
  }
}`
        }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: <FiActivity />,
      methods: [
        {
          method: 'get',
          path: '/api/v1/analytics/overview',
          description: 'Get analytics overview for user or organization',
          params: [
            { name: 'period', type: 'string', required: false, description: 'Time period (7d, 30d, 90d)' },
            { name: 'metric', type: 'string', required: false, description: 'Specific metric to retrieve' }
          ],
          response: `{
  "success": true,
  "data": {
    "views": 12345,
    "watchTime": 1234567,
    "engagement": 85.5,
    "growth": 12.3
  }
}`
        }
      ]
    },
    {
      id: 'users',
      name: 'Users',
      icon: <FiUser />,
      methods: [
        {
          method: 'get',
          path: '/api/v1/users/profile',
          description: 'Get current user profile information',
          params: [],
          response: `{
  "success": true,
  "data": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://example.com/avatar.jpg",
    "subscription": "premium"
  }
}`
        }
      ]
    }
  ];

  const currentEndpoint = endpoints.find(ep => ep.id === activeSection);

  return (
    <div className={styles.apiPage}>
      <header className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          API Reference
        </motion.h1>
        <motion.p className={styles.subtitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Complete API reference and endpoint documentation for Enterprise AI Player
        </motion.p>
      </header>

      <div className={styles.apiGrid}>
        <aside className={styles.sidebar}>
          <h3>Endpoints</h3>
          <nav className={styles.navList}>
            {endpoints.map((endpoint) => (
              <button
                key={endpoint.id}
                className={`${styles.navItem} ${activeSection === endpoint.id ? styles.active : ''}`}
                onClick={() => setActiveSection(endpoint.id)}
              >
                {endpoint.icon} {endpoint.name}
              </button>
            ))}
          </nav>
        </aside>

        <main className={styles.content}>
          {currentEndpoint.methods.map((method, index) => (
            <motion.div
              key={index}
              className={styles.endpointCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.endpointHeader}>
                <span className={`${styles.method} ${styles[method.method]}`}>
                  {method.method.toUpperCase()}
                </span>
                <code className={styles.path}>{method.path}</code>
              </div>

              <p className={styles.description}>{method.description}</p>

              {method.params.length > 0 && (
                <>
                  <h4>Parameters</h4>
                  <table className={styles.paramsTable}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Required</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {method.params.map((param, i) => (
                        <tr key={i}>
                          <td className={styles.paramName}>{param.name}</td>
                          <td className={styles.paramType}>{param.type}</td>
                          <td>{param.required ? 'Yes' : 'No'}</td>
                          <td>{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              <h4>Response Example</h4>
              <div className={styles.codeBlock}>
                <button
                  className="absolute top-2 right-2 p-1 hover:bg-dark-700 rounded"
                  onClick={() => handleCopyCode(method.response)}
                >
                  {copiedCode === method.response ? <FiCheck /> : <FiCopy />}
                </button>
                <pre>{method.response}</pre>
              </div>
            </motion.div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default API;
