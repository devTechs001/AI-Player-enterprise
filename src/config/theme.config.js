// Theme configuration
import { THEMES } from './constants';

// Base theme configuration
export const THEME_CONFIG = {
  default: THEMES.DARK,
  system: true, // Follow system preference
  storage: 'localStorage', // 'localStorage', 'sessionStorage', 'cookie'
  transition: true, // Enable theme transitions
  duration: 300, // Theme transition duration in ms
};

// Light theme configuration
export const LIGHT_THEME = {
  name: 'light',
  colors: {
    // Primary colors
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    
    // Secondary colors
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    
    // Accent colors
    accent: {
      cyan: '#06b6d4',
      pink: '#ec4899',
      orange: '#f97316',
      green: '#10b981',
      red: '#ef4444',
      yellow: '#f59e0b',
    },
    
    // Semantic colors
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    
    // Background colors
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      inverse: '#0f172a',
    },
    
    // Text colors
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      inverse: '#f8fafc',
      muted: '#94a3b8',
    },
    
    // Border colors
    border: {
      primary: '#e2e8f0',
      secondary: '#cbd5e1',
      tertiary: '#f1f5f9',
      inverse: '#334155',
    },
    
    // Glass effects
    glass: {
      white: 'rgba(255, 255, 255, 0.8)',
      dark: 'rgba(0, 0, 0, 0.1)',
    },
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glow: '0 0 20px rgba(59, 130, 246, 0.3)',
    neon: '0 0 30px rgba(6, 182, 212, 0.4)',
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    secondary: 'linear-gradient(135deg, #06b6d4 0%, #ec4899 100%)',
    accent: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)',
    sunset: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
    ocean: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    forest: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  },
};

// Dark theme configuration
export const DARK_THEME = {
  name: 'dark',
  colors: {
    // Primary colors
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    
    // Secondary colors
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      995: '#020617',
    },
    
    // Accent colors
    accent: {
      cyan: '#06b6d4',
      pink: '#ec4899',
      orange: '#f97316',
      green: '#10b981',
      red: '#ef4444',
      yellow: '#f59e0b',
    },
    
    // Semantic colors
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    
    // Background colors
    background: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#334155',
      inverse: '#ffffff',
    },
    
    // Text colors
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      tertiary: '#94a3b8',
      inverse: '#0f172a',
      muted: '#64748b',
    },
    
    // Border colors
    border: {
      primary: '#334155',
      secondary: '#475569',
      tertiary: '#1e293b',
      inverse: '#e2e8f0',
    },
    
    // Glass effects
    glass: {
      white: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(0, 0, 0, 0.8)',
    },
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
    glow: '0 0 30px rgba(59, 130, 246, 0.5)',
    neon: '0 0 40px rgba(6, 182, 212, 0.6)',
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    secondary: 'linear-gradient(135deg, #06b6d4 0%, #ec4899 100%)',
    accent: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)',
    sunset: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
    ocean: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    forest: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  },
};

// Neon theme configuration
export const NEON_THEME = {
  name: 'neon',
  colors: {
    // Primary colors (neon variants)
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    
    // Secondary colors
    secondary: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
      950: '#4a044e',
    },
    
    // Neon accent colors
    accent: {
      cyan: '#00f5ff',
      pink: '#ff00f5',
      orange: '#ff9500',
      green: '#00ff87',
      red: '#ff0040',
      yellow: '#ffea00',
      purple: '#bf00ff',
    },
    
    // Semantic colors
    semantic: {
      success: '#00ff87',
      warning: '#ffea00',
      error: '#ff0040',
      info: '#00f5ff',
    },
    
    // Background colors
    background: {
      primary: '#0a0a0a',
      secondary: '#1a1a1a',
      tertiary: '#2a2a2a',
      inverse: '#ffffff',
    },
    
    // Text colors
    text: {
      primary: '#ffffff',
      secondary: '#e0e0e0',
      tertiary: '#b0b0b0',
      inverse: '#0a0a0a',
      muted: '#808080',
    },
    
    // Border colors
    border: {
      primary: '#333333',
      secondary: '#555555',
      tertiary: '#222222',
      inverse: '#cccccc',
    },
    
    // Glass effects
    glass: {
      white: 'rgba(255, 255, 255, 0.05)',
      dark: 'rgba(0, 0, 0, 0.9)',
    },
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 245, 255, 0.3)',
    md: '0 4px 6px -1px rgba(0, 245, 255, 0.4), 0 2px 4px -1px rgba(255, 0, 245, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 245, 255, 0.5), 0 4px 6px -2px rgba(255, 0, 245, 0.4)',
    xl: '0 20px 25px -5px rgba(0, 245, 255, 0.6), 0 10px 10px -5px rgba(255, 0, 245, 0.5)',
    glow: '0 0 40px rgba(0, 245, 255, 0.8)',
    neon: '0 0 60px rgba(255, 0, 245, 0.9)',
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #00f5ff 0%, #ff00f5 50%, #f5ff00 100%)',
    secondary: 'linear-gradient(135deg, #bf00ff 0%, #00ff87 100%)',
    accent: 'linear-gradient(135deg, #ff9500 0%, #ff0040 100%)',
    sunset: 'linear-gradient(135deg, #ff0040 0%, #ffea00 100%)',
    ocean: 'linear-gradient(135deg, #00f5ff 0%, #00ff87 100%)',
    forest: 'linear-gradient(135deg, #00ff87 0%, #bf00ff 100%)',
  },
};

// Theme utilities
export const THEME_UTILS = {
  // Get theme by name
  getTheme: (themeName) => {
    switch (themeName) {
      case THEMES.LIGHT:
        return LIGHT_THEME;
      case THEMES.DARK:
        return DARK_THEME;
      case THEMES.NEON:
        return NEON_THEME;
      default:
        return DARK_THEME;
    }
  },
  
  // Apply theme to document
  applyTheme: (theme) => {
    const root = document.documentElement;
    const themeConfig = THEME_UTILS.getTheme(theme);
    
    // Apply colors
    Object.entries(themeConfig.colors).forEach(([category, colors]) => {
      if (typeof colors === 'object') {
        Object.entries(colors).forEach(([shade, color]) => {
          root.style.setProperty(`--color-${category}-${shade}`, color);
        });
      } else {
        root.style.setProperty(`--color-${category}`, colors);
      }
    });
    
    // Apply shadows
    Object.entries(themeConfig.shadows).forEach(([name, shadow]) => {
      root.style.setProperty(`--shadow-${name}`, shadow);
    });
    
    // Apply gradients
    Object.entries(themeConfig.gradients).forEach(([name, gradient]) => {
      root.style.setProperty(`--gradient-${name}`, gradient);
    });
    
    // Set theme class
    root.className = theme;
  },
  
  // Get system theme preference
  getSystemTheme: () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
    return THEMES.LIGHT;
  },
  
  // Watch system theme changes
  watchSystemTheme: (callback) => {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addListener(callback);
      return () => mediaQuery.removeListener(callback);
    }
    return () => {};
  },
};

export default {
  THEME_CONFIG,
  LIGHT_THEME,
  DARK_THEME,
  NEON_THEME,
  THEME_UTILS,
};
