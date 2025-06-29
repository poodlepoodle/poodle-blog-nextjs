'use client';

import styles from './article.module.css';
import ArticleHeader from '@components/article-header';
import ArticleFooter from '@components/article-footer';
import GiscusComments from '@components/giscus-comments';

import useSpotlight from '@hooks/useSpotlight';
import { useBlogContext } from '@contexts/BlogContext';
import { useEffect } from 'react';

export default function Article({ slug, post, children }) {
  const { headerRef, footerRef } = useSpotlight();
  const { isSpotlighted, setIsSpotlighted, setHeaderText } = useBlogContext();

  useEffect(() => {
    // 초기 마운트 시 명시적으로 false로 설정
    setIsSpotlighted(false);
    setHeaderText(post.title);

    return () => {
      setIsSpotlighted(false);
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
          description={post.description}
          slug={slug}
          tags={post.tags}
          publishedAt={post.publishedAt}
        />
        {children}
        <ArticleFooter observerRef={footerRef}>
          <GiscusComments />
        </ArticleFooter>
      </div>
    </div>
  );
}
