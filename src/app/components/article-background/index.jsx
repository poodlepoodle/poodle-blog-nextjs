'use client';
import styles from './article-background.module.css';

import useSpotlight from '@hooks/useSpotlight';

export default function ArticleBackground({ children }) {
  const isSpotlighted = useSpotlight();

  return (
    <div
      className={`${styles.layout} ${isSpotlighted ? styles.spotlighted : ''}`}
    >
      {children}
    </div>
  );
}
