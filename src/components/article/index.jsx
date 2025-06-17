'use client';
import styles from './article.module.css';

import ArticleHeader from '@components/article-header';
import ArticleFooter from '@components/article-footer';
import Giscus from '@components/giscus';

import { useBlogContext } from '@contexts/BlogContext';
import { useEffect } from 'react';
import useSpotlight from '@hooks/useSpotlight';

export default function Article({ slug, post, children }) {
  const { headerRef, footerRef } = useSpotlight();
  const { isSpotlighted, setIsSpotlighted, setHeaderText } = useBlogContext();

  useEffect(() => {
    setHeaderText(post.title);

    return () => {
      setTimeout(() => setIsSpotlighted(false), 0);
      setHeaderText('');
    };
  }, []);

  return (
    <div
      className={`${styles.layout} ${
        !!isSpotlighted ? styles.dark : styles.light
      }`}
    >
      <div className={styles.container}>
        <ArticleHeader
          observerRef={headerRef}
          title={post.title}
          slug={slug}
          tags={post.tags}
          date={post.date}
        />
        {children}
        <ArticleFooter observerRef={footerRef}>
          <Giscus />
        </ArticleFooter>
      </div>
    </div>
  );
}
