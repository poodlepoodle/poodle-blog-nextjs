import type { Metadata } from 'next';

import { PostGrid } from '@components/post-grid';
import { Banner } from '@components/banner';
import { Button } from '@components/common/button';
import JsonLd from '@components/json-ld';
import { getBlogPosts } from '@utils/get-posts';
import { blogStructuredData } from '@constants/json-ld';
import { METADATA_PRESET, PAGE_DESCRIPTIONS } from '@constants/metadata';

export const metadata: Metadata = {
  ...METADATA_PRESET,
  description: PAGE_DESCRIPTIONS.home,
  alternates: {
    canonical: '/',
  },
  title: '홈 ••• 푸들 블로그',
};

export default async function Page() {
  const posts = await getBlogPosts();
  const jsonLd = blogStructuredData(posts);
  const postsMeta = posts.map(({ content: _content, ...meta }) => meta);

  const hasMoreThanFivePosts = posts && posts.length >= 5;

  return (
    <>
      <JsonLd structuredData={jsonLd} />
      <div className="flex w-full flex-col items-center">
        <div className="flex h-full w-full max-w-container flex-col gap-items pt-container-top pb-container-bottom">
          <Banner />
          <PostGrid posts={postsMeta} />
          {hasMoreThanFivePosts && (
            <div className="flex w-full justify-center">
              <Button href={`/posts`} label="더 보기" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
