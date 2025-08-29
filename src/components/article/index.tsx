'use client';

import type { Post } from '@/types';
import type { BlogContextType } from '@contexts/types';

import styles from './article.module.css';
import ArticleHeader from '@components/article-header';
import ArticleFooter from '@components/article-footer';
import GiscusComments from '@components/giscus-comments';

import useSpotlight from '@hooks/useSpotlight';
import { useBlogContext } from '@contexts/BlogContext';
import { useEffect } from 'react';

interface ArticleProps {
  slug: string;
  post: Post;
  children: React.ReactNode;
}

export default function Article({ slug, post, children }: ArticleProps) {
  const { headerRef, footerRef } = useSpotlight();
  const { isSpotlighted, setIsSpotlighted, setHeaderText } =
    useBlogContext() as BlogContextType;

  useEffect(() => {
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
          description={'description' in post ? post.description : undefined}
          slug={slug}
          tags={'tags' in post ? post.tags : undefined}
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
