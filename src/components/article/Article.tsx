'use client';

import type { Post } from '@/types';

import { ArticleHeader } from './ArticleHeader';
import { ArticleFooter } from './ArticleFooter';
import { Paper } from '@components/common/paper';
import { GiscusComments } from '@components/giscus-comments';

import useSpotlight from '@hooks/useSpotlight';
import { useUIStore } from '@stores/ui-store';
import { useEffect } from 'react';

type ArticleProps = {
  slug: string;
  post: Post;
  children: React.ReactNode;
};

export const Article = ({ slug, post, children }: ArticleProps) => {
  const { headerRef, footerRef } = useSpotlight();
  const isSpotlighted = useUIStore(state => state.isSpotlighted);
  const setIsSpotlighted = useUIStore(state => state.setIsSpotlighted);
  const setHeaderText = useUIStore(state => state.setHeaderText);

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
      className={`relative mt-container-top mb-container-bottom flex w-full flex-col items-center transition-colors duration-350 ${
        !!isSpotlighted ? 'bg-black' : 'bg-background'
      }`}
    >
      {/* <div className="bg-yellow-100"> */}
      <Paper className="flex flex-col gap-[7.5rem] py-[4rem]">
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
      </Paper>
    </div>
  );
};
