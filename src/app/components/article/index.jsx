'use client';
import styles from './article.module.css';

import ArticleHeader from '@components/article-header';
import ArticleFooter from '@components/article-footer';
import Giscus from '@components/giscus';

import useSpotlight from '@hooks/useSpotlight';

export default function Article({ slug, post, children }) {
  const { headerRef, footerRef, spotlighted } = useSpotlight();

  return (
    <div
      className={`${styles.layout} ${spotlighted ? styles.spotlighted : ''}`}
    >
      <div className={styles.container}>
        <ArticleHeader
          observerRef={headerRef}
          title={post.title}
          slug={slug}
          tags={post.tags}
          date={post.date}
          updated={post.updated}
        />
        {children}
        <ArticleFooter observerRef={footerRef}>
          <Giscus />
        </ArticleFooter>
      </div>
    </div>
  );
}
