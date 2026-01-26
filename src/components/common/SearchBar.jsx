import { forwardRef, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import styles from './SearchBar.module.scss';

const SearchBar = forwardRef(({ 
  value, 
  onChange, 
  placeholder = 'Search...', 
  onClear,
  onSearch,
  className = '',
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    } else if (e.key === 'Escape') {
      handleClear();
    }
  };

  const searchClass = [
    styles.searchBar,
    isFocused && styles.focused,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={searchClass} {...props}>
      <div className={styles.inputWrapper}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={styles.input}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearBtn}
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;