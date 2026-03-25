import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiDroplet } from 'react-icons/fi';
import { useTheme } from '@hooks/useTheme';
import Tooltip from '@components/common/Tooltip';
import styles from './ThemeSwitcher.module.scss';

const themes = [
  { id: 'dark', name: 'Dark', icon: '🌙', color: '#0a0a0f' },
  { id: 'light', name: 'Light', icon: '☀️', color: '#ffffff' },
  { id: 'neon', name: 'Neon', icon: '⚡', color: '#0d0d1a' },
  { id: 'dark-purple', name: 'Dark Purple', icon: '🟣', color: '#0f0518' },
  { id: 'purple-blue', name: 'Purple Blue', icon: '💜', color: '#0a0a1f' },
  { id: 'ocean-blue', name: 'Ocean Blue', icon: '🌊', color: '#081018' },
  { id: 'sunset-orange', name: 'Sunset Orange', icon: '🌅', color: '#1a0f0a' },
  { id: 'forest-green', name: 'Forest Green', icon: '🌲', color: '#0a1a0f' },
  { id: 'cyberpunk', name: 'Cyberpunk', icon: '🤖', color: '#1a1a2e' },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentTheme = themes.find(t => t.id === theme);

  return (
    <div className={styles.themeSwitcher}>
      <Tooltip content="Change Theme">
        <button
          className={styles.themeButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiDroplet />
          {currentTheme && (
            <span className={styles.currentTheme}>
              {currentTheme.icon}
            </span>
          )}
        </button>
      </Tooltip>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className={styles.backdrop}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className={styles.dropdown}
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
            >
              <div className={styles.dropdownHeader}>
                <h3>Choose Theme</h3>
                <p>Select your preferred color scheme</p>
              </div>

              <div className={styles.themeGrid}>
                {themes.map((t) => (
                  <motion.button
                    key={t.id}
                    className={`${styles.themeOption} ${theme === t.id ? styles.active : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                  >
                    <div
                      className={styles.themePreview}
                      style={{ backgroundColor: t.color }}
                    />
                    <span className={styles.themeIcon}>{t.icon}</span>
                    <span className={styles.themeName}>{t.name}</span>
                    {theme === t.id && (
                      <div className={styles.checkmark}>
                        <FiCheck />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
