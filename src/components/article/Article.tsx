'use client';

import type { Post } from '@/types';

import { ArticleHeader } from './ArticleHeader';
import { ArticleFooter } from './ArticleFooter';
import { Paper } from '@components/common/paper';
import { GiscusComments } from '@components/giscus-comments';
import { PostImageModal } from '@components/post-image-modal';

import { useSpotlight } from '@hooks/useSpotlight';
import { useUIStore } from '@stores/ui-store';
import { usePostStore } from '@stores/post-store';
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
  const closeImageModal = usePostStore(state => state.closeImageModal);

  useEffect(() => {
    setIsSpotlighted(false);
    setHeaderText(post.title);

    return () => {
      setIsSpotlighted(false);
      setHeaderText('');
      closeImageModal();
    };
  }, []);

  return (
    <>
      <div
        className={`relative mt-container-top mb-container-bottom flex w-full flex-col items-center transition-colors duration-350 ${
          !!isSpotlighted ? 'bg-black' : 'bg-background'
        }`}
      >
        <Paper className="flex flex-col gap-items py-[4rem]">
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
      <PostImageModal />
    </>
  );
};
