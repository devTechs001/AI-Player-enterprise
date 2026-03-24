import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import './Dropdown.scss';

const Dropdown = ({
  children,
  items = [],
  value,
  onChange,
  placeholder = 'Select an option',
  variant = 'default',
  size = 'md',
  disabled = false,
  searchable = false,
  multiSelect = false,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };

    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev < filteredItems.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredItems.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0) {
            handleSelectItem(filteredItems[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          setHighlightedIndex(-1);
          break;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, highlightedIndex, filteredItems]);

  const filteredItems = items.filter(item =>
    item.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectItem = (item) => {
    if (multiSelect) {
      const currentValue = Array.isArray(value) ? value : [];
      const newValue = currentValue.includes(item.value)
        ? currentValue.filter(v => v !== item.value)
        : [...currentValue, item.value];
      onChange(newValue);
    } else {
      onChange(item.value);
      setIsOpen(false);
    }
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  const getDisplayValue = () => {
    if (multiSelect) {
      if (!Array.isArray(value) || value.length === 0) return placeholder;
      if (value.length === 1) {
        const item = items.find(i => i.value === value[0]);
        return item?.label || placeholder;
      }
      return `${value.length} items selected`;
    } else {
      const item = items.find(i => i.value === value);
      return item?.label || placeholder;
    }
  };

  const isSelected = (itemValue) => {
    if (multiSelect) {
      return Array.isArray(value) && value.includes(itemValue);
    }
    return value === itemValue;
  };

  return (
    <div
      ref={dropdownRef}
      className={`dropdown dropdown-${variant} dropdown-${size} ${disabled ? 'disabled' : ''} ${className}`}
      {...props}
    >
      <button
        type="button"
        className="dropdown-trigger"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="dropdown-value">{getDisplayValue()}</span>
        <FiChevronDown className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {searchable && (
            <div className="dropdown-search">
              <input
                ref={inputRef}
                type="text"
                className="dropdown-search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          )}

          <div className="dropdown-options" role="listbox">
            {filteredItems.length === 0 ? (
              <div className="dropdown-empty">No options available</div>
            ) : (
              filteredItems.map((item, index) => (
                <button
                  key={item.value}
                  type="button"
                  className={`dropdown-option ${isSelected(item.value) ? 'selected' : ''} ${highlightedIndex === index ? 'highlighted' : ''}`}
                  onClick={() => handleSelectItem(item)}
                  role="option"
                  aria-selected={isSelected(item.value)}
                >
                  <span className="dropdown-option-label">{item.label}</span>
                  {item.description && (
                    <span className="dropdown-option-description">{item.description}</span>
                  )}
                  {isSelected(item.value) && (
                    <FiCheck className="dropdown-option-check" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
