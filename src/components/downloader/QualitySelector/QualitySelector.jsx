import { FiCheck } from 'react-icons/fi';
import { formatBytes, formatDuration } from '@utils/format';
import styles from './QualitySelector.module.scss';

const qualityLabels = {
  '2160p': '4K',
  '1440p': '2K',
  '1080p': 'Full HD',
  '720p': 'HD',
  '480p': 'SD',
  '360p': 'Low',
};

const qualityResolutions = {
  '4320p': '7680x4320',
  '2160p': '3840x2160',
  '1440p': '2560x1440',
  '1080p': '1920x1080',
  '720p': '1280x720',
  '480p': '854x480',
  '360p': '640x360',
  '240p': '426x240',
};

const QualitySelector = ({ quality, qualities, onSelect, estimatedSizes, duration }) => {
  return (
    <div className={styles.qualitySelector}>
      {qualities.map((q) => {
        const size = estimatedSizes?.[q];
        return (
          <button
            key={q}
            className={quality === q ? styles.active : ''}
            onClick={() => onSelect(q)}
          >
            <div className={styles.qualityInfo}>
              <span className={styles.quality}>{q}</span>
              <span className={styles.label}>{qualityLabels[q] || q}</span>
              {qualityResolutions[q] && (
                <span className={styles.resolution}>{qualityResolutions[q]}</span>
              )}
            </div>
            <div className={styles.sizeInfo}>
              {size != null && (
                <span className={styles.qualitySize}>{formatBytes(size)}</span>
              )}
              {quality === q && <FiCheck />}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default QualitySelector;
