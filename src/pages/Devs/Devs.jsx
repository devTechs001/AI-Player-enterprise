import { motion } from 'framer-motion';
import { FiCode, FiBook, FiBox, FiGitBranch, FiTerminal, FiCpu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '@components/common/Button';
import './Devs.scss';

const Devs = () => {
  const devTools = [
    {
      icon: FiBook,
      title: 'Documentation',
      description: 'Comprehensive API documentation and guides',
      link: '/devs/documentation',
    },
    {
      icon: FiCode,
      title: 'API Reference',
      description: 'Explore our REST and WebSocket APIs',
      link: '/devs/api',
    },
    {
      icon: FiBox,
      title: 'SDKs',
      description: 'Download SDKs for various platforms',
      link: '/devs/sdks',
    },
    {
      icon: FiTerminal,
      title: 'Sandbox',
      description: 'Test API calls in a safe environment',
      link: '/devs/sandbox',
    },
    {
      icon: FiGitBranch,
      title: 'Changelog',
      description: 'Stay updated with latest changes',
      link: '/devs/changelog',
    },
    {
      icon: FiCpu,
      title: 'Examples',
      description: 'Code examples and tutorials',
      link: '/devs/examples',
    },
  ];

  return (
    <div className="devs-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Developer Resources</h1>
        <p>Everything you need to build with AI Video Player</p>
      </motion.div>

      <motion.div
        className="tools-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {devTools.map((tool, index) => (
          <Link key={tool.title} to={tool.link} className="tool-card">
            <div className="tool-icon">
              <tool.icon />
            </div>
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
            <span className="tool-link">
              Explore <FiCode />
            </span>
          </Link>
        ))}
      </motion.div>

      <motion.div
        className="api-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2>API Overview</h2>
        <p>
          Our RESTful API provides programmatic access to AI Video Player features.
          Integrate video processing, downloads, and AI capabilities into your applications.
        </p>
        <div className="api-actions">
          <Link to="/devs/documentation">
            <Button variant="primary" icon={<FiBook />}>
              Read Docs
            </Button>
          </Link>
          <Link to="/devs/sandbox">
            <Button variant="outline" icon={<FiTerminal />}>
              Try Sandbox
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Devs;
