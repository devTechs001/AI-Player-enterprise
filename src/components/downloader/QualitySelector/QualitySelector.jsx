import { FiCheck } from 'react-icons/fi';
import styles from './QualitySelector.module.scss';

const QualitySelector = ({ quality, qualities, onSelect }) => {
  const getQualityLabel = (q) => {
    const labels = {
      '2160p': '4K',
      '1440p': '2K',
      '1080p': 'Full HD',
      '720p': 'HD',
      '480p': 'SD',
      '360p': 'Low',
    };
    return labels[q] || q;
  };

  return (
    <div className={styles.qualitySelector}>
      {qualities.map((q) => (
        <button
          key={q}
          className={quality === q ? styles.active : ''}
          onClick={() => onSelect(q)}
        >
          <div className={styles.qualityInfo}>
            <span className={styles.quality}>{q}</span>
            <span className={styles.label}>{getQualityLabel(q)}</span>
          </div>
          {quality === q && <FiCheck />}
        </button>
      ))}
    </div>
  );
};

export default QualitySelector;
