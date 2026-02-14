'use client';

import type { Post } from '@/types';

import { TOCProvider } from '@/contexts/toc-context';

import { ArticleHeader } from './ArticleHeader';
import { ArticleFooter } from './ArticleFooter';
import { Paper } from '@components/common/paper';
import { GiscusComments } from '@components/giscus-comments';
import { PostImageModal } from '@components/post-image-modal';

import { useSpotlight } from '@hooks/useSpotlight';
import { useActiveHeading } from '@hooks/useActiveHeading';
import { useUIStore } from '@stores/ui-store';
import { usePostStore } from '@stores/post-store';
import { useEffect } from 'react';
import { cn } from '@/utils/cn';

type ArticleProps = {
  slug: string;
  post: Post;
  children: React.ReactNode;
};

const ArticleInner = ({ slug, post, children }: ArticleProps) => {
  const { headerRef, footerRef } = useSpotlight();
  const isSpotlighted = useUIStore(state => state.isSpotlighted);
  const setIsSpotlighted = useUIStore(state => state.setIsSpotlighted);
  const setPostTitle = usePostStore(state => state.setPostTitle);
  const setActiveHeading = usePostStore(state => state.setActiveHeading);
  const closeImageModal = usePostStore(state => state.closeImageModal);
  const activeHeading = useActiveHeading();

  useEffect(() => {
    setIsSpotlighted(false);

    return () => {
      setIsSpotlighted(false);
      setPostTitle('');
      setActiveHeading([]);
      closeImageModal();
    };
  }, [setIsSpotlighted, setPostTitle, setActiveHeading, closeImageModal]);

  useEffect(() => {
    setPostTitle(post.title);
    setActiveHeading(activeHeading);
  }, [activeHeading, post.title, setPostTitle, setActiveHeading]);

  return (
    <>
      <div
        className={cn(
          'relative mt-container-top mb-container-bottom flex w-full flex-col items-center transition-colors duration-350',
          isSpotlighted ? 'bg-black' : 'bg-background'
        )}
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

export const Article = (props: ArticleProps) => {
  return (
    <TOCProvider>
      <ArticleInner {...props} />
    </TOCProvider>
  );
};
