import { useEffect } from 'react';
import styles from './StoryFrame.module.css';

export default function StoryFrame({ theme = 'light', size, children }) {
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return <div className={[styles.base, styles[size]].filter(Boolean).join(' ')}>{children}</div>;
}
