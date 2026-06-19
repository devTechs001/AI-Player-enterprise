import { FiCheck } from 'react-icons/fi';
import { formatBytes } from '@utils/format';
import styles from './FormatSelector.module.scss';

const formatLabels = {
  mp4: 'MP4', webm: 'WebM', avi: 'AVI', mov: 'MOV', mkv: 'MKV',
  flv: 'FLV', wmv: 'WMV', '3gp': '3GP',
  mp3: 'MP3', aac: 'AAC', wav: 'WAV', flac: 'FLAC', ogg: 'OGG',
  m4a: 'M4A', wma: 'WMA',
};

const FormatSelector = ({ format, formats, onSelect, estimatedSizes }) => {
  return (
    <div className={styles.formatSelector}>
      {formats.map((f) => {
        const size = estimatedSizes?.[f];
        return (
          <button
            key={f}
            className={format === f ? styles.active : ''}
            onClick={() => onSelect(f)}
          >
            <div className={styles.formatInfo}>
              <span className={styles.formatLabel}>{formatLabels[f] || f.toUpperCase()}</span>
              {size != null && (
                <span className={styles.formatSize}>{formatBytes(size)}</span>
              )}
            </div>
            {format === f && <FiCheck />}
          </button>
        );
      })}
    </div>
  );
};

export default FormatSelector;
