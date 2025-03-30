import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme preference or use OS preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme; // 'dark', 'light', or 'system'
      } else {
        return 'system'; // Default to system preference
      }
    }
    return 'light'; // Fallback for SSR
  });

  const isDarkMode = (() => {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    // For 'system', check OS preference
    return typeof window !== 'undefined' && 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  })();

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference
    localStorage.theme = theme;
  }, [theme, isDarkMode]);

  useEffect(() => {
    // Listen for OS theme changes when in system mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        // Force a re-render
        setTheme('system');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  const setThemeMode = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme, 
      theme, 
      setTheme: setThemeMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
