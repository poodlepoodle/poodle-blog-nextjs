'use client';

import styles from './articlebackground.module.css';

import { useState, useEffect } from 'react';

export default function ArticleBackground({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <section className={isScrolled ? styles.layout__focused : styles.layout}>
      {children}
    </section>
  );
}
