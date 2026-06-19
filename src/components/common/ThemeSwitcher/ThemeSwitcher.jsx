import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiMoon, FiSun, FiZap, FiDroplet } from 'react-icons/fi';
import { useTheme } from '@hooks/useTheme';
import Tooltip from '@components/common/Tooltip';
import styles from './ThemeSwitcher.module.scss';

const THEME_ICONS = {
  'dark': FiMoon,
  'light': FiSun,
  'neon': FiZap,
  'dark-purple': FiDroplet,
  'purple-blue': FiDroplet,
  'ocean-blue': FiDroplet,
  'sunset-orange': FiDroplet,
  'forest-green': FiDroplet,
  'cyberpunk': FiZap,
};

const themes = [
  { id: 'dark', name: 'Dark', colors: ['#0f172a', '#6366f1'] },
  { id: 'light', name: 'Light', colors: ['#ffffff', '#6366f1'] },
  { id: 'neon', name: 'Neon', colors: ['#0a0a0a', '#00f5ff'] },
  { id: 'dark-purple', name: 'Dark Purple', colors: ['#1a0a2e', '#a855f7'] },
  { id: 'purple-blue', name: 'Purple Blue', colors: ['#0f172a', '#7c3aed'] },
  { id: 'ocean-blue', name: 'Ocean Blue', colors: ['#0c1929', '#0ea5e9'] },
  { id: 'sunset-orange', name: 'Sunset Orange', colors: ['#1a0f0a', '#f97316'] },
  { id: 'forest-green', name: 'Forest Green', colors: ['#0a1a0f', '#22c55e'] },
  { id: 'cyberpunk', name: 'Cyberpunk', colors: ['#1a1a2e', '#fbbf24'] },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentTheme = themes.find(t => t.id === theme);
  const CurrentIcon = currentTheme ? THEME_ICONS[currentTheme.id] : FiMoon;

  return (
    <div className={styles.themeSwitcher}>
      <Tooltip content={currentTheme?.name || 'Change Theme'}>
        <button
          className={styles.themeButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Change theme"
        >
          <CurrentIcon />
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
                  {themes.map((t) => {
                    const Icon = THEME_ICONS[t.id];
                    return (
                      <motion.button
                        key={t.id}
                        className={`${styles.themeOption} ${theme === t.id ? styles.active : ''}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setTheme(t.id);
                          setIsOpen(false);
                        }}
                      >
                        <div className={styles.themePreview}>
                          <span className={styles.swatchPrimary} style={{ background: t.colors[0] }} />
                          <span className={styles.swatchAccent} style={{ background: t.colors[1] }} />
                        </div>
                        <Icon className={styles.themeIcon} />
                        <span className={styles.themeName}>{t.name}</span>
                        {theme === t.id && (
                          <div className={styles.checkmark}>
                            <FiCheck />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
