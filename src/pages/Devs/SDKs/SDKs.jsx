import { motion } from 'framer-motion';
import { FiPackage } from 'react-icons/fi';
import '../Devs.scss';

const SDKs = () => {
  const sdks = [
    { name: 'JavaScript SDK', version: '2.1.0', downloads: '10K+' },
    { name: 'Python SDK', version: '1.8.0', downloads: '5K+' },
    { name: 'React Native', version: '1.2.0', downloads: '3K+' },
    { name: 'iOS SDK', version: '2.0.0', downloads: '2K+' },
    { name: 'Android SDK', version: '2.0.0', downloads: '2K+' },
  ];

  return (
    <div className="devs-page">
      <div className="page-header">
        <h1>SDKs</h1>
        <p>Official SDKs for various platforms</p>
      </div>
      <motion.div
        className="sdks-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {sdks.map((sdk, index) => (
          <div key={sdk.name} className="sdk-card">
            <div className="sdk-icon">
              <FiPackage />
            </div>
            <h3>{sdk.name}</h3>
            <div className="sdk-info">
              <span>v{sdk.version}</span>
              <span>{sdk.downloads} downloads</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SDKs;
