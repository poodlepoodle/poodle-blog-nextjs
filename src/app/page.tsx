import type { Metadata } from 'next';

import { PostGrid } from '@components/post-grid';
import { Banner } from '@components/banner';
import { Button } from '@components/common/button';
import JsonLd from '@components/json-ld';
import { getAllPosts, getBlogPosts } from '@utils/get-posts';
import { blogStructuredData } from '@constants/json-ld';
import { METADATA_PRESET } from '@constants/metadata';

export const metadata: Metadata = {
  ...METADATA_PRESET,
  title: '홈 ••• 푸들 블로그',
};

export default async function Page() {
  const posts = await getAllPosts();
  const blogPosts = await getBlogPosts();
  const jsonLd = blogStructuredData(blogPosts);

  return (
    <>
      <JsonLd structuredData={jsonLd} />
      <div className="flex w-full flex-col items-center">
        <div className="flex h-full w-full max-w-container flex-col gap-items pt-container-top pb-container-bottom">
          <Banner />
          <PostGrid posts={posts} />
          <div className="flex w-full justify-center">
            <Button href={`/posts`} label="더 보기" />
          </div>
        </div>
      </div>
    </>
  );
}
