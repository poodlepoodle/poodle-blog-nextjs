'use client';

import styles from './articlebackground.module.css';

import { useEffect } from 'react';
import useSpotlight from '@hooks/useSpotlight';

export default function ArticleBackground({ children }) {
  const spotlight = useSpotlight();

  const addSpotlight = () => document.body.classList.add('spotlighted');
  const removeSpotlight = () => document.body.classList.remove('spotlighted');

  useEffect(() => {
    if (spotlight) {
      addSpotlight();
    } else {
      removeSpotlight();
    }

    return () => {
      removeSpotlight();
    };
  }, [spotlight]);

  return <section className={styles.layout}>{children}</section>;
}
