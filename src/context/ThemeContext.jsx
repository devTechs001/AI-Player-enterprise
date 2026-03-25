import { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const THEMES = {
  dark: {
    name: 'Dark',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      bg: '#0f172a',
    },
  },
  light: {
    name: 'Light',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      bg: '#ffffff',
    },
  },
  neon: {
    name: 'Neon',
    colors: {
      primary: '#00f5ff',
      secondary: '#ff00f5',
      bg: '#0a0a0a',
    },
  },
  'dark-purple': {
    name: 'Dark Purple',
    colors: {
      primary: '#a855f7',
      secondary: '#ec4899',
      bg: '#1a0a2e',
    },
  },
  'purple-blue': {
    name: 'Purple Blue',
    colors: {
      primary: '#7c3aed',
      secondary: '#0ea5e9',
      bg: '#0f172a',
    },
  },
  'ocean-blue': {
    name: 'Ocean Blue',
    colors: {
      primary: '#0ea5e9',
      secondary: '#14b8a6',
      bg: '#0c1929',
    },
  },
  'sunset-orange': {
    name: 'Sunset Orange',
    colors: {
      primary: '#f97316',
      secondary: '#ec4899',
      bg: '#1a0f0a',
    },
  },
  'forest-green': {
    name: 'Forest Green',
    colors: {
      primary: '#22c55e',
      secondary: '#10b981',
      bg: '#0a1a0f',
    },
  },
  'cyberpunk': {
    name: 'Cyberpunk',
    colors: {
      primary: '#fbbf24',
      secondary: '#f43f5e',
      bg: '#1a1a2e',
    },
  },
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Load theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme && THEMES[savedTheme]) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const themeKeys = Object.keys(THEMES);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  const setThemeByName = (themeName) => {
    if (THEMES[themeName]) {
      setTheme(themeName);
    }
  };

  const value = {
    theme,
    themeName: THEMES[theme]?.name || theme,
    themes: THEMES,
    initialized,
    setTheme: setThemeByName,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };