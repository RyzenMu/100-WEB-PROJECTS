// src/App.tsx
import React, { useEffect, useState } from 'react';
import { AppRouter } from './navigation/AppRouter';
import { ThemeProvider } from './providers/ThemeProvider';
import { DataProvider } from './providers/DataProvider';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeProvider isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
      <DataProvider>
        <div className="app">
          <AppRouter />
        </div>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;