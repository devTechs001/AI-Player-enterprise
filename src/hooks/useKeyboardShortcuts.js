import { useEffect, useCallback } from 'react';

export const useKeyboardShortcuts = (shortcuts, options = {}) => {
  const { enabled = true, preventDefault = true } = options;

  const handleKeyDown = useCallback(
    (event) => {
      if (!enabled) return;

      // Ignore if typing in input/textarea
      if (
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA' ||
        event.target.isContentEditable
      ) {
        return;
      }

      const key = event.key;
      const shortcut = shortcuts[key];

      if (shortcut) {
        if (preventDefault) {
          event.preventDefault();
        }
        shortcut(event);
      }

      // Handle key combinations
      const combo = [];
      if (event.ctrlKey || event.metaKey) combo.push('ctrl');
      if (event.shiftKey) combo.push('shift');
      if (event.altKey) combo.push('alt');
      combo.push(key.toLowerCase());

      const comboKey = combo.join('+');
      const comboShortcut = shortcuts[comboKey];

      if (comboShortcut) {
        if (preventDefault) {
          event.preventDefault();
        }
        comboShortcut(event);
      }
    },
    [shortcuts, enabled, preventDefault]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

export default useKeyboardShortcuts;