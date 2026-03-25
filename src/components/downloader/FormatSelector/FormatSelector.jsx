import { FiCheck } from 'react-icons/fi';
import styles from './FormatSelector.module.scss';

const FormatSelector = ({ format, formats, onSelect }) => {
  return (
    <div className={styles.formatSelector}>
      {formats.map((f) => (
        <button
          key={f}
          className={format === f ? styles.active : ''}
          onClick={() => onSelect(f)}
        >
          <span>{f.toUpperCase()}</span>
          {format === f && <FiCheck />}
        </button>
      ))}
    </div>
  );
};

export default FormatSelector;
