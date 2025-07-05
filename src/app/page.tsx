import type { Metadata } from 'next';

import styles from './styles.module.css';
import PostGrid from '@components/post-grid';
import Banner from '@components/banner';
import Button from '@components/button';
import { getPosts } from '@utils/get-posts';
import {
  generateCommonMetadata,
  generateBlogJsonLd,
} from '@utils/generate-metadata';

export const metadata: Metadata = generateCommonMetadata({
  title: '홈 ••• 푸들 블로그',
  description:
    '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
});

export default async function Page() {
  const posts = await getPosts();
  const jsonLd = generateBlogJsonLd({
    title: '홈 ••• 푸들 블로그',
    subUrl: `/`,
    posts,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className={styles.layout}>
        <div className={styles.container}>
          <Banner />
          <PostGrid posts={posts} />
          <div className={styles.row}>
            <Button href={`/posts`} label="더 보기" />
          </div>
        </div>
      </div>
    </>
  );
}
