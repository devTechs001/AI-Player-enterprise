import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';
import { useRefresh } from '@context/RefreshContext';
import styles from './RefreshButton.module.scss';

const RefreshButton = ({ size = 'md', onRefresh }) => {
  const { refresh } = useRefresh();
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = () => {
    setSpinning(true);
    if (onRefresh) onRefresh();
    refresh();
    setTimeout(() => setSpinning(false), 800);
  };

  return (
    <motion.button
      className={`${styles.refreshBtn} ${styles[size]}`}
      onClick={handleRefresh}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Refresh"
    >
      <FiRefreshCw className={spinning ? styles.spinning : ''} />
    </motion.button>
  );
};

export default RefreshButton;
