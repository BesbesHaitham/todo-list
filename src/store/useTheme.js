import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('focus-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      /* Theme still works with blocked storage. */
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('focus-theme', theme);
    } catch {
      /* In-memory preference. */
    }
  }, [theme]);
  return {
    theme,
    toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
  };
}
