import { FiDownload, FiX, FiSmartphone } from 'react-icons/fi';
import { usePWA } from '@hooks/usePWA';
import styles from './PwaInstall.module.scss';

const PwaInstall = () => {
  const { isInstallable, isStandalone, install } = usePWA();

  if (!isInstallable || isStandalone) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <FiSmartphone className={styles.icon} />
        <div className={styles.text}>
          <strong>Install Ultimate Player</strong>
          <span>Add to home screen for the best experience</span>
        </div>
        <div className={styles.actions}>
          <button className={styles.installBtn} onClick={install}>
            <FiDownload /> Install
          </button>
          <button className={styles.dismissBtn} onClick={() => {}}>
            <FiX />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PwaInstall;
