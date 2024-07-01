'use client';

import styles from './articlebackground.module.css';

import { useState, useEffect } from 'react';

export default function ArticleBackground({ children }) {
  const [isFocused, setIsScrolled] = useState(false);

  useEffect(() => {
    // Root font size
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const scrollThreshold = rootFontSize * 25; // 18.875 -> 25

    const onScroll = () => {
      const scrolled =
        window.scrollY > scrollThreshold &&
        document.documentElement.scrollHeight -
          window.innerHeight -
          window.scrollY >=
          scrollThreshold;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = isFocused ? '#131926' : '#f9fbfc';

    return () => {
      document.body.style.backgroundColor = '#f9fbfc';
    };
  }, [isFocused]);

  return <section className={styles.layout}>{children}</section>;
}
